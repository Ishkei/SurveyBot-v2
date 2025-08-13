import asyncio
import os
import json
import time
import subprocess
from datetime import datetime
from typing import Optional, Dict, Any
import base64

from dotenv import load_dotenv
import google.generativeai as genai
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import requests
from itertools import cycle

from proxy_management.proxy_manager_v2ray import V2RayProxyManager, ProxyConfig
import actions
from personality_responses import generate_personality_response

load_dotenv()

# --- CONFIGURATION & PERSONA ---
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "YOUR_GOOGLE_API_KEY")
USE_GEMINI_API = GOOGLE_API_KEY and GOOGLE_API_KEY != "YOUR_GOOGLE_API_KEY"

if USE_GEMINI_API:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash-latest', generation_config={"response_mime_type": "application/json"})
else:
    print("Warning: GOOGLE_API_KEY not found in .env file. Some features may be limited.")
    model = None

try:
    # Try to load persona from multiple possible locations
    persona_paths = [
        '../Configurations/configs/persona.json',
        '../../Configurations/configs/persona.json',
        'configs/persona.json',
        'persona.json'
    ]
    
    PERSONA = None
    for path in persona_paths:
        try:
            with open(path, 'r') as f:
                PERSONA = json.load(f)
                print(f"Loaded persona from: {path}")
                break
        except FileNotFoundError:
            continue
    
    if PERSONA is None:
        print("Warning: No persona.json found. Using default persona.")
        PERSONA = {
            "name": "John Doe",
            "age": 30,
            "occupation": "Software Engineer",
            "location": "United States",
            "interests": ["technology", "gaming", "sports"],
            "demographics": {
                "gender": "male",
                "education": "bachelor's degree",
                "income": "middle class"
            }
        }
    
    PERSONA_PROMPT = f"""You are an AI assistant representing a person with these details: {json.dumps(PERSONA)}.
Your primary goal is to answer survey questions accurately based on this persona.
When presented with multiple choice options, select ONLY the single, specific button or radio option that directly corresponds to the answer.
You MUST provide the NUMERIC ID (e.g., 15) of the element to click or fill, NOT its text label.
Avoid clicking on general navigation links. Always prioritize progressing through the survey.
"""
except Exception as e:
    print(f"Error loading persona: {e}")
    print("Using default persona configuration.")
    PERSONA = {
        "name": "John Doe",
        "age": 30,
        "occupation": "Software Engineer",
        "location": "United States",
        "interests": ["technology", "gaming", "sports"],
        "demographics": {
            "gender": "male",
            "education": "bachelor's degree",
            "income": "middle class"
        }
    }
    PERSONA_PROMPT = f"""You are an AI assistant representing a person with these details: {json.dumps(PERSONA)}.
Your primary goal is to answer survey questions accurately based on this persona.
When presented with multiple choice options, select ONLY the single, specific button or radio option that directly corresponds to the answer.
You MUST provide the NUMERIC ID (e.g., 15) of the element to click or fill, NOT its text label.
Avoid clicking on general navigation links. Always prioritize progressing through the survey.
"""

class ProxychainsSurveyBot:
    """Survey bot using proxychains4 for proxy support"""
    
    def __init__(self):
        self.driver = None
        self.v2ray_manager = V2RayProxyManager(v2ray_path="../v2ray/v2ray")
        self.wait = None
        self.current_proxy = None
        self.proxy_rotation_count = 0
        self.proxy_process = None
        
    def initialize_browser(self):
        """Initialize the undetected Chrome browser with proxychains4"""
        try:
            # Load V2Ray proxy configurations
            proxy_config_paths = [
                "../../Configurations/configs/v2ray_proxies.json",
                "../Configurations/configs/v2ray_proxies.json",
                "configs/v2ray_proxies.json",
                "v2ray_proxies.json"
            ]
            
            config_loaded = False
            for config_file in proxy_config_paths:
                if self.v2ray_manager.load_configs_from_file(config_file):
                    config_loaded = True
                    break
            
            if not config_loaded:
                print("No V2Ray proxy configurations found. Creating sample configurations...")
                from proxy_management.proxy_manager_v2ray import create_sample_proxies
                create_sample_proxies()
                self.v2ray_manager.load_configs_from_file("sample_v2ray_proxies.json")
            
            # Get best proxy
            best_proxy = self.v2ray_manager.get_best_proxy()
            if not best_proxy:
                print("No working V2Ray proxies available. Using direct connection.")
                return self._initialize_browser_direct()
            
            # Start V2Ray proxy
            if self.v2ray_manager.start_proxy(best_proxy, 1080):
                self.current_proxy = best_proxy
                print(f"Using V2Ray proxy: {best_proxy.name}")
            else:
                print("Failed to start V2Ray proxy. Using direct connection.")
                return self._initialize_browser_direct()
            
            # Configure Chrome options without proxy (proxychains4 will handle it)
            options = uc.ChromeOptions()
            
            # Add stealth options
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-blink-features=AutomationControlled')
            options.add_argument('--disable-extensions')
            options.add_argument('--disable-plugins')
            
            # Add user agent
            options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
            
            # Initialize undetected Chrome with proxychains4
            chrome_cmd = ["proxychains4", "google-chrome", "--remote-debugging-port=9222"]
            
            # Start Chrome with proxychains4
            self.proxy_process = subprocess.Popen(chrome_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            time.sleep(3)  # Wait for Chrome to start
            
            # Connect to the running Chrome instance
            options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
            self.driver = uc.Chrome(options=options)
            
            # Execute stealth script
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            # Set up wait
            self.wait = WebDriverWait(self.driver, 10)
            
            print("Browser initialized with proxychains4 and V2Ray proxy")
            return True
            
        except Exception as e:
            print(f"Failed to initialize browser with proxychains4: {e}")
            print("Falling back to direct connection...")
            return self._initialize_browser_direct()
    
    def _initialize_browser_direct(self):
        """Initialize browser without proxy (fallback)"""
        try:
            # Stop any running V2Ray proxy
            self.v2ray_manager.stop_proxy()
            
            options = uc.ChromeOptions()
            
            # Add stealth options
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-blink-features=AutomationControlled')
            options.add_argument('--disable-extensions')
            options.add_argument('--disable-plugins')
            
            # Add user agent
            options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
            
            # Initialize undetected Chrome with specific binary path
            self.driver = uc.Chrome(options=options, browser_executable_path="/usr/bin/google-chrome")
            
            # Execute stealth script
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            # Set up wait
            self.wait = WebDriverWait(self.driver, 10)
            
            print("Browser initialized without proxy (fallback)")
            return True
            
        except Exception as e:
            print(f"Failed to initialize browser: {e}")
            return False
    
    def rotate_proxy(self):
        """Rotate to next V2Ray proxy"""
        try:
            # Stop current proxy
            self.v2ray_manager.stop_proxy()
            
            # Get next proxy
            next_proxy = self.v2ray_manager.rotate_proxy()
            if not next_proxy:
                print("No more proxies available for rotation")
                return False
            
            # Start new proxy
            if self.v2ray_manager.start_proxy(next_proxy, 1080):
                self.current_proxy = next_proxy
                self.proxy_rotation_count += 1
                print(f"Rotated to V2Ray proxy: {next_proxy.name} (rotation #{self.proxy_rotation_count})")
                
                # Restart browser with new proxy
                self.driver.quit()
                if self.proxy_process:
                    self.proxy_process.terminate()
                time.sleep(2)
                return self.initialize_browser()
            else:
                print(f"Failed to start proxy: {next_proxy.name}")
                return False
                
        except Exception as e:
            print(f"Error rotating proxy: {e}")
            return False
    
    def load_session(self):
        """Load saved session data"""
        try:
            if os.path.exists('auth.json'):
                with open('auth.json', 'r') as f:
                    session_data = json.load(f)
                
                # Apply cookies if they exist
                if 'cookies' in session_data:
                    for cookie in session_data['cookies']:
                        self.driver.add_cookie(cookie)
                
                print("Session data loaded")
                return True
        except Exception as e:
            print(f"Failed to load session: {e}")
        return False
    
    def navigate_to_surveys(self):
        """Navigate to the survey platform"""
        try:
            # Navigate to Qmee or alternative platform
            self.driver.get("https://www.qmee.com/en-us/surveys")
            
            # Apply session data if available
            self.load_session()
            
            # Attempt login if not already logged in
            if not self.check_login_status():
                print("Not logged in, attempting to login...")
                email = os.getenv("QME_EMAIL")
                password = os.getenv("QME_PASSWORD")
                if email and password:
                    if self.login_to_qmee(email, password):
                        print("Login successful, continuing to surveys...")
                    else:
                        print("Login failed, but continuing anyway...")
                else:
                    print("QME_EMAIL or QME_PASSWORD not found in .env. Please check your configuration.")
                    return False
            else:
                print("Already logged in!")
            
            print("Navigated to survey platform")
            return True
        except Exception as e:
            print(f"Failed to navigate to surveys: {e}")
            return False
    
    def login_to_qmee(self, email: str = None, password: str = None):
        """Login to Qmee account"""
        try:
            print("Attempting to login to Qmee...")
            
            # Navigate to login page
            self.driver.get("https://www.qmee.com/en-us/login")
            
            # Wait for page to load
            self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            
            # Check if we need to complete signup first
            try:
                # Look for "start earning" button or signup elements
                start_earning_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Start Earning') or contains(text(), 'start earning')]")
                if start_earning_button:
                    print("Found 'Start Earning' button. Completing signup process automatically...")
                    start_earning_button.click()
                    
                    # Wait for signup form to load
                    self.wait.until(EC.presence_of_element_located((By.ID, "email")))
                    
                    # Automatically fill signup form
                    if email and password:
                        print("Automatically filling signup form...")
                        
                        # Fill email field
                        email_field = self.driver.find_element(By.ID, "email")
                        email_field.clear()
                        email_field.send_keys(email)
                        
                        # Look for password field (might be named differently)
                        try:
                            password_field = self.driver.find_element(By.ID, "password")
                        except:
                            try:
                                password_field = self.driver.find_element(By.NAME, "password")
                            except:
                                password_field = self.driver.find_element(By.CSS_SELECTOR, "input[type='password']")
                        
                        password_field.clear()
                        password_field.send_keys(password)
                        
                        # Look for submit button
                        try:
                            submit_button = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
                        except:
                            submit_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Sign Up') or contains(text(), 'Create Account') or contains(text(), 'Register')]")
                        
                        submit_button.click()
                        
                        # Wait for signup to complete
                        try:
                            self.wait.until(EC.url_contains("/en-us/dashboard"))
                            print("Signup completed successfully!")
                            return True
                        except TimeoutException:
                            print("Signup may have completed, checking current page...")
                            # Continue to login attempt
                    
                    # After signup, try to login
                    return self._attempt_login(email, password)
                    
            except NoSuchElementException:
                # No signup required, proceed with login
                pass
            
            # Attempt login
            return self._attempt_login(email, password)
                
        except Exception as e:
            print(f"Login error: {e}")
            return False
    
    def _attempt_login(self, email: str = None, password: str = None):
        """Attempt to login with provided credentials"""
        try:
            # Wait for login form to load
            self.wait.until(EC.presence_of_element_located((By.ID, "email")))
            
            # If credentials provided, attempt automatic login
            if email and password:
                print("Attempting automatic login...")
                
                # Find and fill email field
                try:
                    email_field = self.driver.find_element(By.ID, "email")
                except:
                    email_field = self.driver.find_element(By.NAME, "email")
                
                email_field.clear()
                email_field.send_keys(email)
                
                # Find and fill password field
                try:
                    password_field = self.driver.find_element(By.ID, "password")
                except:
                    try:
                        password_field = self.driver.find_element(By.NAME, "password")
                    except:
                        password_field = self.driver.find_element(By.CSS_SELECTOR, "input[type='password']")
                
                password_field.clear()
                password_field.send_keys(password)
                
                # Find and click login button
                try:
                    login_button = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
                except:
                    try:
                        login_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Sign In') or contains(text(), 'Login') or contains(text(), 'Log In')]")
                    except:
                        login_button = self.driver.find_element(By.CSS_SELECTOR, "button")
                
                login_button.click()
                
                # Wait for login to complete
                try:
                    self.wait.until(EC.url_contains("/en-us/dashboard"))
                    print("Login successful!")
                    return True
                except TimeoutException:
                    # Check if we're already on a logged-in page
                    current_url = self.driver.current_url
                    if "/en-us/dashboard" in current_url or "/en-us/surveys" in current_url:
                        print("Already logged in!")
                        return True
                    else:
                        print("Login failed - please check credentials")
                        return False
            
            else:
                # Manual login mode
                print("\n" + "="*50)
                print("MANUAL LOGIN REQUIRED:")
                print("Please log in to your Qmee account in the browser window.")
                print("After successful login, the bot will continue automatically.")
                print("="*50)
                
                # Wait for user to login manually
                self.wait.until(EC.url_contains("/en-us/dashboard"))
                print("Login detected! Continuing...")
                return True
                
        except Exception as e:
            print(f"Login attempt error: {e}")
            return False
    
    def check_login_status(self):
        """Check if user is logged in"""
        try:
            # Check if we're on dashboard or surveys page
            current_url = self.driver.current_url
            if "/en-us/dashboard" in current_url or "/en-us/surveys" in current_url:
                # Check for logout button or user menu
                logout_elements = self.driver.find_elements(By.CSS_SELECTOR, "[href*='logout'], .user-menu, .account-menu")
                if logout_elements:
                    return True
            return False
        except:
            return False
    
    def find_and_start_survey(self):
        """Find and start a survey"""
        try:
            # Wait for survey elements to load
            self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'button, a[href*="survey"], .survey-card')))
            
            # Look for available surveys
            survey_elements = self.driver.find_elements(By.CSS_SELECTOR, 'a[href*="survey"], .survey-card, button[onclick*="survey"]')
            
            if survey_elements:
                print(f"Found {len(survey_elements)} potential survey elements")
                
                # Click on the first available survey
                survey_elements[0].click()
                print("Clicked on survey element")
                
                # Wait for survey to load
                time.sleep(3)
                return True
            else:
                print("No surveys found")
                return False
                
        except Exception as e:
            print(f"Error finding survey: {e}")
            return False
    
    def take_screenshot(self):
        """Take a screenshot of the current page"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"screenshot_{timestamp}.png"
            self.driver.save_screenshot(filename)
            print(f"Screenshot saved: {filename}")
            return filename
        except Exception as e:
            print(f"Failed to take screenshot: {e}")
            return None
    
    def get_page_content(self):
        """Get the current page content"""
        try:
            return self.driver.page_source
        except Exception as e:
            print(f"Failed to get page content: {e}")
            return ""
    
    def build_dom_tree(self):
        """Build a simplified DOM tree for analysis"""
        try:
            elements = self.driver.find_elements(By.XPATH, "//*")
            dom_tree = []
            
            for i, element in enumerate(elements[:100]):  # Limit to first 100 elements
                try:
                    tag = element.tag_name
                    text = element.text[:50] if element.text else ""
                    classes = element.get_attribute("class") or ""
                    id_attr = element.get_attribute("id") or ""
                    
                    dom_tree.append({
                        "id": i,
                        "tag": tag,
                        "text": text,
                        "classes": classes,
                        "id_attr": id_attr
                    })
                except:
                    continue
            
            return dom_tree
        except Exception as e:
            print(f"Failed to build DOM tree: {e}")
            return []
    
    def solve_page_with_vision(self):
        """Solve the current page using vision AI"""
        try:
            if not model:
                print("No AI model available for vision analysis")
                return None
            
            # Take screenshot
            screenshot_path = self.take_screenshot()
            if not screenshot_path:
                return None
            
            # Get page content
            page_content = self.get_page_content()
            dom_tree = self.build_dom_tree()
            
            # Build prompt for AI
            prompt = f"""
            Analyze this survey page and determine the next action to take.
            
            Page Content: {page_content[:1000]}
            DOM Elements: {json.dumps(dom_tree[:20])}
            
            {PERSONA_PROMPT}
            
            Based on the page content and DOM structure, what should the bot do next?
            Return a JSON response with:
            - action: "click", "input", "wait", or "complete"
            - element_id: the numeric ID of the element to interact with
            - reason: brief explanation of the action
            """
            
            # Get AI response
            response = model.generate_content([prompt, screenshot_path])
            
            try:
                decision = json.loads(response.text)
                return decision
            except:
                print("Failed to parse AI response")
                return None
                
        except Exception as e:
            print(f"Vision analysis failed: {e}")
            return None
    
    def execute_decision(self, decision):
        """Execute the AI decision"""
        try:
            if not decision or 'action' not in decision:
                return False
            
            action = decision['action']
            element_id = decision.get('element_id')
            
            if action == "click" and element_id is not None:
                elements = self.driver.find_elements(By.XPATH, "//*")
                if 0 <= element_id < len(elements):
                    elements[element_id].click()
                    print(f"Clicked element {element_id}")
                    return True
                    
            elif action == "input" and element_id is not None:
                elements = self.driver.find_elements(By.XPATH, "//*")
                if 0 <= element_id < len(elements):
                    elements[element_id].send_keys(decision.get('text', ''))
                    print(f"Input text into element {element_id}")
                    return True
                    
            elif action == "wait":
                time.sleep(decision.get('duration', 2))
                print("Waited as requested")
                return True
                
            elif action == "complete":
                print("Survey completed!")
                return True
                
            return False
            
        except Exception as e:
            print(f"Error executing decision: {e}")
            return False
    
    def fallback_survey_logic(self):
        """Fallback logic when AI fails"""
        try:
            # Look for common survey elements
            buttons = self.driver.find_elements(By.TAG_NAME, "button")
            inputs = self.driver.find_elements(By.TAG_NAME, "input")
            
            # Click first button if available
            if buttons:
                buttons[0].click()
                print("Clicked first button (fallback)")
                return True
                
            # Fill first input if available
            elif inputs:
                inputs[0].send_keys("test")
                print("Filled first input (fallback)")
                return True
                
            return False
            
        except Exception as e:
            print(f"Fallback logic failed: {e}")
            return False
    
    def handle_survey_completion(self):
        """Handle survey completion"""
        try:
            # Look for completion indicators
            completion_indicators = [
                "Thank you",
                "Survey completed",
                "You've earned",
                "Completion"
            ]
            
            page_text = self.driver.page_source.lower()
            for indicator in completion_indicators:
                if indicator.lower() in page_text:
                    print(f"Survey completion detected: {indicator}")
                    return True
            
            return False
            
        except Exception as e:
            print(f"Error checking completion: {e}")
            return False
    
    def handle_proxy_failure(self):
        """Handle proxy failure"""
        print("Proxy failure detected, attempting to rotate...")
        return self.rotate_proxy()
    
    def run_survey_loop(self):
        """Main survey execution loop"""
        consecutive_failures = 0
        max_failures = 3
        
        while consecutive_failures < max_failures:
            try:
                print(f"\n--- Survey Attempt {consecutive_failures + 1} ---")
                
                # Try AI vision first
                decision = self.solve_page_with_vision()
                
                if decision:
                    if self.execute_decision(decision):
                        consecutive_failures = 0
                        print("Page handled successfully, continuing...")
                        time.sleep(2)
                        continue
                
                # Fallback to basic logic
                if self.fallback_survey_logic():
                    consecutive_failures = 0
                    print("Fallback logic succeeded")
                    time.sleep(2)
                    continue
                
                # Check for completion
                if self.handle_survey_completion():
                    print("Survey completed successfully!")
                    break
                
                consecutive_failures += 1
                print(f"Failed to solve page (consecutive failures: {consecutive_failures})")
                
                if consecutive_failures >= max_failures:
                    print("Max failures reached, stopping...")
                    break
                    
            except Exception as e:
                print(f"Error in survey loop: {e}")
                consecutive_failures += 1
    
    def run(self):
        """Main bot execution"""
        try:
            print("Starting Proxychains Survey Bot...")
            
            # Initialize browser
            if not self.initialize_browser():
                print("Failed to initialize browser")
                return
            
            # Navigate to surveys
            if not self.navigate_to_surveys():
                print("Failed to navigate to surveys")
                return
            
            # Find and start survey
            if not self.find_and_start_survey():
                print("No survey found automatically")
                print("Please manually navigate to a survey and press Enter")
                input()
            
            # Run survey loop
            self.run_survey_loop()
            
        except KeyboardInterrupt:
            print("\nBot stopped by user")
        except Exception as e:
            print(f"Bot error: {e}")
        finally:
            # Cleanup
            if self.driver:
                self.driver.quit()
            if self.proxy_process:
                self.proxy_process.terminate()
            self.v2ray_manager.stop_proxy()

def main():
    bot = ProxychainsSurveyBot()
    bot.run()

if __name__ == "__main__":
    main()
