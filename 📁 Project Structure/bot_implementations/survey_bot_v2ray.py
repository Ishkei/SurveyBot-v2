import asyncio
import os
import json
import time
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
    with open('configs/persona.json', 'r') as f:
        PERSONA = json.load(f)
    PERSONA_PROMPT = f"""You are an AI assistant representing a person with these details: {json.dumps(PERSONA)}.
Your primary goal is to answer survey questions accurately based on this persona.
When presented with multiple choice options, select ONLY the single, specific button or radio option that directly corresponds to the answer.
You MUST provide the NUMERIC ID (e.g., 15) of the element to click or fill, NOT its text label.
Avoid clicking on general navigation links. Always prioritize progressing through the survey.
"""
except FileNotFoundError:
    print("Error: persona.json not found! Please create it.")
    exit()

class V2RayEnhancedSurveyBot:
    """Enhanced survey bot with V2Ray proxy integration"""
    
    def __init__(self):
        self.driver = None
        self.v2ray_manager = V2RayProxyManager(v2ray_path="./v2ray/v2ray")
        self.wait = None
        self.current_proxy = None
        self.proxy_rotation_count = 0
        
    def initialize_browser(self):
        """Initialize the undetected Chrome browser with V2Ray proxy"""
        try:
            # Load V2Ray proxy configurations from configs directory
            config_files = [
                "configs/v2ray_proxies.json",
                "v2ray_proxies.json",
                "configs/sample_v2ray_proxies.json"
            ]
            
            config_loaded = False
            for config_file in config_files:
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
            
            # Configure Chrome options with proxy
            options = uc.ChromeOptions()
            
            # Add proxy settings
            options.add_argument('--proxy-server=socks5://127.0.0.1:1080')
            
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
            
            print("Browser initialized with V2Ray proxy and stealth capabilities")
            return True
            
        except Exception as e:
            print(f"Failed to initialize browser with V2Ray: {e}")
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
                    self.login_to_qmee(email, password)
                else:
                    print("QME_EMAIL or QME_PASSWORD not found in .env. Please log in manually.")
                    print("Press Enter to continue after manual login...")
                    input() # Wait for user input
            
            print("Navigated to survey platform")
            return True
        except Exception as e:
            print(f"Failed to navigate to surveys: {e}")
            # If connection fails, try restarting browser without proxy
            if "ERR_CONNECTION_CLOSED" in str(e) or "ERR_PROXY_CONNECTION_FAILED" in str(e):
                print("Connection error detected. Retrying with direct connection...")
                try:
                    self.driver.quit()
                    time.sleep(2)
                    if self._initialize_browser_direct():
                        return self.navigate_to_surveys()
                except Exception as retry_e:
                    print(f"Retry failed: {retry_e}")
            return False
    
    def find_and_start_survey(self):
        """Find and start a survey"""
        try:
            # Wait for survey elements to load
            self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'button, a[href*="survey"], .survey-card')))
            
            # Try multiple selectors to find survey elements
            selectors = [
                'button:contains("Start")',
                'a[href*="survey"]',
                '.survey-card',
                '[data-testid*="survey"]',
                'button:contains("Start earning")'
            ]
            
            for selector in selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        elements[0].click()
                        print(f"Started survey using selector: {selector}")
                        return True
                except Exception:
                    continue
            
            print("No survey found automatically")
            return False
        except Exception as e:
            print(f"Failed to start survey: {e}")
            return False
    
    def take_screenshot(self):
        """Take a screenshot of the current page"""
        try:
            screenshot = self.driver.get_screenshot_as_png()
            return screenshot
        except Exception as e:
            print(f"Failed to take screenshot: {e}")
            return None
    
    def get_page_content(self):
        """Get the text content of the current page"""
        try:
            return self.driver.find_element(By.TAG_NAME, "body").text
        except Exception as e:
            print(f"Failed to get page content: {e}")
            return ""
    
    def build_dom_tree(self):
        """Build a DOM tree of interactive elements"""
        try:
            elements = self.driver.find_elements(By.CSS_SELECTOR, 'button, input, select, a, label')
            dom_tree = ""
            
            for i, element in enumerate(elements):
                try:
                    tag = element.tag_name
                    text = element.text
                    
                    if text and len(text.strip()) > 0:
                        dom_tree += f"[{i}] <{tag}> \"{text.strip()}\"\n"
                        
                except Exception:
                    continue
            
            return dom_tree
        except Exception as e:
            print(f"Error building DOM tree: {e}")
            return ""
    
    def solve_page_with_vision(self):
        """Solve the current page using vision AI"""
        try:
            # Take screenshot
            screenshot = self.take_screenshot()
            if not screenshot:
                return self.fallback_survey_logic()
            
            # Get page content
            page_content = self.get_page_content()
            
            # Build DOM tree
            dom_tree = self.build_dom_tree()
            
            # Create prompt for AI
            prompt = f"""
            {PERSONA_PROMPT}
            
            You have these tools:
            1. `click_element(element_id)`: Use for buttons, links, radio buttons, or checkboxes.
            2. `fill_textbox(element_id, text_to_fill)`: Use for text fields.
            
            Based on the user's persona, the screenshot, and the DOM tree, decide the single best action to progress through the survey.
            When specifying 'element_id', you MUST use the NUMERIC ID provided in the DOM tree.
            You MUST respond in a valid JSON format with "tool" and "args" keys.
            
            DOM Tree:
            {dom_tree}
            
            Page Content:
            {page_content}
            """
            
            if model:
                # Convert screenshot to base64 for API
                screenshot_b64 = base64.b64encode(screenshot).decode('utf-8')
                
                response = model.generate_content([prompt, {"mime_type": "image/png", "data": screenshot_b64}])
                decision = json.loads(response.text)
                
                # Execute the decision
                return self.execute_decision(decision)
            else:
                # Fallback to rule-based approach
                return self.fallback_survey_logic()
                
        except Exception as e:
            print(f"Error in vision-based solving: {e}")
            return self.fallback_survey_logic()
    
    def execute_decision(self, decision):
        """Execute the AI's decision"""
        try:
            tool = decision.get('tool')
            args = decision.get('args', {})
            
            if tool == 'click_element':
                element_id = args.get('element_id')
                elements = self.driver.find_elements(By.CSS_SELECTOR, 'button, input, select, a, label')
                if element_id < len(elements):
                    elements[element_id].click()
                    print(f"Clicked element {element_id}")
                    return True
                    
            elif tool == 'fill_textbox':
                element_id = args.get('element_id')
                text = args.get('text_to_fill')
                elements = self.driver.find_elements(By.CSS_SELECTOR, 'input[type="text"], textarea')
                if element_id < len(elements):
                    elements[element_id].send_keys(text)
                    print(f"Filled element {element_id} with '{text}'")
                    return True
            
            return False
        except Exception as e:
            print(f"Error executing decision: {e}")
            return False
    
    def fallback_survey_logic(self):
        """Fallback logic when AI is not available"""
        try:
            # Look for common survey elements
            elements = self.driver.find_elements(By.CSS_SELECTOR, 'button, input, a')
            
            for element in elements:
                try:
                    text = element.text
                    if text:
                        text_lower = text.lower()
                        
                        # Common survey progression buttons
                        if any(word in text_lower for word in ['next', 'continue', 'submit', 'agree', 'yes']):
                            element.click()
                            print(f"Clicked fallback element: {text}")
                            return True
                            
                except Exception:
                    continue
            
            return False
        except Exception as e:
            print(f"Error in fallback logic: {e}")
            return False
    
    def handle_survey_completion(self):
        """Handle survey completion detection"""
        try:
            page_content = self.get_page_content()
            page_content_lower = page_content.lower()
            
            completion_indicators = [
                'survey complete', 'thank you', 'congratulations', 
                'survey finished', 'completion', 'success'
            ]
            
            for indicator in completion_indicators:
                if indicator in page_content_lower:
                    print("Survey completed!")
                    return True
            
            return False
        except Exception as e:
            print(f"Error checking completion: {e}")
            return False
    
    def handle_proxy_failure(self):
        """Handle proxy failure by rotating to next proxy"""
        print("Detected proxy failure, rotating to next proxy...")
        return self.rotate_proxy()
    
    def run_survey_loop(self):
        """Main survey completion loop with proxy rotation"""
        max_attempts = 50
        attempts = 0
        consecutive_failures = 0
        max_consecutive_failures = 3
        
        while attempts < max_attempts:
            attempts += 1
            print(f"\n--- Survey Attempt {attempts} ---")
            
            try:
                # Check for survey completion
                if self.handle_survey_completion():
                    print("Survey completed successfully!")
                    break
                
                # Solve current page
                success = self.solve_page_with_vision()
                
                if success:
                    consecutive_failures = 0
                    print("Page handled successfully, continuing...")
                else:
                    consecutive_failures += 1
                    print(f"Failed to solve page (consecutive failures: {consecutive_failures})")
                    
                    # Rotate proxy if too many consecutive failures
                    if consecutive_failures >= max_consecutive_failures:
                        print("Too many consecutive failures, rotating proxy...")
                        if self.handle_proxy_failure():
                            consecutive_failures = 0
                        else:
                            print("Failed to rotate proxy, continuing with current setup...")
                
                # Wait before next attempt
                time.sleep(3)
                
            except Exception as e:
                print(f"Error in survey loop: {e}")
                consecutive_failures += 1
                
                # Try proxy rotation on error
                if consecutive_failures >= max_consecutive_failures:
                    if self.handle_proxy_failure():
                        consecutive_failures = 0
                
                time.sleep(5)
        
        print("Survey loop finished")
    
    def run(self):
        """Main bot execution"""
        try:
            # Initialize browser with V2Ray proxy
            if not self.initialize_browser():
                return
            
            # Navigate to surveys
            if not self.navigate_to_surveys():
                return
            
            # Find and start survey
            if not self.find_and_start_survey():
                print("Please manually navigate to a survey and press Enter")
                input("Press Enter when ready...")
            
            # Run survey completion loop
            self.run_survey_loop()
            
        except Exception as e:
            print(f"Error in main execution: {e}")
        finally:
            # Clean up
            if self.v2ray_manager:
                self.v2ray_manager.stop_proxy()
            if self.driver:
                self.driver.quit()

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
                    print("Found 'Start Earning' button. Completing signup process...")
                    start_earning_button.click()
                    
                    # Wait for signup form to load
                    self.wait.until(EC.presence_of_element_located((By.ID, "email")))
                    print("Signup form loaded. Please complete the signup process manually.")
                    print("Press Enter after completing signup...")
                    input()
                    
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
                email_field = self.driver.find_element(By.ID, "email")
                email_field.clear()
                email_field.send_keys(email)
                
                # Find and fill password field
                password_field = self.driver.find_element(By.ID, "password")
                password_field.clear()
                password_field.send_keys(password)
                
                # Find and click login button
                login_button = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
                login_button.click()
                
                # Wait for login to complete
                try:
                    self.wait.until(EC.url_contains("/en-us/dashboard"))
                    print("Login successful!")
                    return True
                except TimeoutException:
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

def main():
    bot = V2RayEnhancedSurveyBot()
    bot.run()

if __name__ == "__main__":
    main()
