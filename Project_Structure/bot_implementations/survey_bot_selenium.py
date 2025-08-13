import asyncio
import os
import json
import re
import time
from datetime import datetime
from typing import Optional, Dict, Any
import base64

from dotenv import load_dotenv
import google.generativeai as genai
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import requests
from itertools import cycle
import undetected_chromedriver as uc

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

class ProxyRotator:
    """Handles proxy rotation for avoiding IP bans"""
    
    def __init__(self):
        self.proxies = []
        self.proxy_pool = None
        self.current_proxy = None
        
    def load_proxies_from_file(self, filename: str = "proxies.txt"):
        """Load proxies from a text file"""
        try:
            with open(filename, 'r') as f:
                self.proxies = [line.strip() for line in f if line.strip()]
            self.proxy_pool = cycle(self.proxies)
            print(f"Loaded {len(self.proxies)} proxies from {filename}")
        except FileNotFoundError:
            print(f"Proxy file {filename} not found. Using free proxy list.")
            self.load_free_proxies()
    
    def load_free_proxies(self):
        """Load free proxies from online sources"""
        try:
            response = requests.get('https://free-proxy-list.net/')
            if response.status_code == 200:
                # Simple parsing - in production you'd want more robust parsing
                lines = response.text.split('\n')
                for line in lines:
                    if ':' in line and line.count('.') == 3:
                        self.proxies.append(line.strip())
                self.proxy_pool = cycle(self.proxies)
                print(f"Loaded {len(self.proxies)} free proxies")
        except Exception as e:
            print(f"Failed to load free proxies: {e}")
            # Fallback to some common free proxies
            self.proxies = [
                "121.129.127.209:80",
                "124.41.215.238:45169",
                "185.93.3.123:8080",
                "194.182.64.67:3128"
            ]
            self.proxy_pool = cycle(self.proxies)
    
    def get_next_proxy(self) -> Optional[str]:
        """Get the next proxy from the pool"""
        if self.proxy_pool:
            self.current_proxy = next(self.proxy_pool)
            return self.current_proxy
        return None

class SeleniumSurveyBot:
    """Main bot class using Selenium with undetected-chromedriver for stealth"""
    
    def __init__(self):
        self.driver = None
        self.proxy_rotator = ProxyRotator()
        self.wait = None
        
    def initialize_browser(self):
        """Initialize the undetected Chrome browser"""
        try:
            # Load proxies
            self.proxy_rotator.load_proxies_from_file()
            proxy = self.proxy_rotator.get_next_proxy()
            
            # Configure Chrome options
            options = uc.ChromeOptions()
            
            # Add proxy if available (temporarily disabled for testing)
            # if proxy:
            #     proxy_host, proxy_port = proxy.split(':')
            #     options.add_argument(f'--proxy-server={proxy_host}:{proxy_port}')
            #     print(f"Using proxy: {proxy}")
            
            # Add stealth options
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-blink-features=AutomationControlled')
            options.add_argument('--disable-extensions')
            options.add_argument('--disable-plugins')
            
            # Add user agent
            options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
            
            # Initialize undetected Chrome
            self.driver = uc.Chrome(options=options)
            
            # Execute stealth script
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            # Set up wait
            self.wait = WebDriverWait(self.driver, 10)
            
            print("Browser initialized with stealth capabilities (no proxy)")
            return True
        except Exception as e:
            print(f"Failed to initialize browser: {e}")
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
            
            # Handle cookie popup if it appears
            try:
                # Wait for cookie popup and accept all cookies
                cookie_buttons = self.wait.until(EC.presence_of_all_elements_located((By.XPATH, "//button[contains(text(), 'Accept All') or contains(text(), 'Accept')]")))
                if cookie_buttons:
                    cookie_buttons[0].click()
                    print("✅ Accepted cookies")
                    time.sleep(2)
            except Exception as e:
                print(f"⚠️  No cookie popup found or already handled: {e}")
            
            print("Navigated to survey platform")
            return True
        except Exception as e:
            print(f"Failed to navigate to surveys: {e}")
            return False
    
    def find_and_start_survey(self):
        """Find and start a survey"""
        try:
            # Wait for page to load
            time.sleep(3)
            
            # Try multiple selectors to find survey elements
            selectors = [
                'button:contains("Start")',
                'a[href*="survey"]',
                '.survey-card',
                '[data-testid*="survey"]',
                'button:contains("Start earning")',
                'button:contains("Take Survey")',
                'button:contains("Begin")',
                '.survey-item',
                '[class*="survey"]',
                'button[class*="start"]'
            ]
            
            for selector in selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        print(f"Found {len(elements)} potential survey elements")
                        # Click the first available survey
                        elements[0].click()
                        print(f"✅ Started survey using selector: {selector}")
                        time.sleep(3)
                        return True
                except Exception as e:
                    print(f"Selector {selector} failed: {e}")
                    continue
            
            # If no surveys found, try to find any clickable elements
            try:
                clickable_elements = self.driver.find_elements(By.XPATH, "//button | //a[contains(@href, 'survey')] | //div[contains(@class, 'survey')]")
                if clickable_elements:
                    print(f"Found {len(clickable_elements)} clickable elements")
                    clickable_elements[0].click()
                    print("✅ Clicked on first available element")
                    time.sleep(3)
                    return True
            except Exception as e:
                print(f"Failed to click on elements: {e}")
            
            print("❌ No survey found automatically")
            return False
        except Exception as e:
            print(f"Error finding survey: {e}")
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
    
    def run_survey_loop(self):
        """Main survey completion loop"""
        max_attempts = 50
        attempts = 0
        
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
                
                if not success:
                    print("Failed to solve page, retrying...")
                
                # Wait before next attempt
                time.sleep(3)
                
            except Exception as e:
                print(f"Error in survey loop: {e}")
                time.sleep(5)
        
        print("Survey loop finished")
    
    def run(self):
        """Main bot execution"""
        try:
            # Initialize browser
            if not self.initialize_browser():
                return
            
            # Navigate to surveys
            if not self.navigate_to_surveys():
                return
            
            # Check if logged in
            if not self.check_login_status():
                print("Not logged in, attempting to login...")
                if not self.login_to_qmee():
                    print("❌ Login failed. Please check your credentials in .env file")
                    print("Add your Qmee credentials to .env file:")
                    print("QME_EMAIL=your_email@example.com")
                    print("QME_PASSWORD=your_password")
                    return
                
                # Navigate back to surveys after login
                self.navigate_to_surveys()
            
            # Find and start survey
            if not self.find_and_start_survey():
                print("Please manually navigate to a survey and press Enter")
                input("Press Enter when ready...")
            
            # Run survey completion loop
            self.run_survey_loop()
            
        except Exception as e:
            print(f"Error in main execution: {e}")
        finally:
            if self.driver:
                self.driver.quit()

    def login_to_qmee(self, email: str = None, password: str = None):
        """Login to Qmee account"""
        try:
            # Get credentials from environment or use defaults
            if not email:
                email = os.getenv("QME_EMAIL", "your_email@example.com")
            if not password:
                password = os.getenv("QME_PASSWORD", "your_password")
            
            print(f"Attempting to login with email: {email}")
            
            # Navigate to login page
            self.driver.get("https://www.qmee.com/en-us/login")
            time.sleep(3)
            
            # Handle cookie popup if it appears
            try:
                cookie_buttons = self.wait.until(EC.presence_of_all_elements_located((By.XPATH, "//button[contains(text(), 'Accept All') or contains(text(), 'Accept')]")))
                if cookie_buttons:
                    cookie_buttons[0].click()
                    print("✅ Accepted cookies on login page")
                    time.sleep(2)
            except Exception as e:
                print(f"⚠️  No cookie popup on login page: {e}")
            
            # Try multiple selectors for email field
            email_selectors = [
                (By.NAME, "email"),
                (By.ID, "email"),
                (By.CSS_SELECTOR, "input[type='email']"),
                (By.XPATH, "//input[@type='email']"),
                (By.XPATH, "//input[contains(@placeholder, 'email')]"),
                (By.XPATH, "//input[contains(@placeholder, 'Email')]")
            ]
            
            email_field = None
            for selector_type, selector in email_selectors:
                try:
                    email_field = self.wait.until(EC.presence_of_element_located((selector_type, selector)))
                    if email_field:
                        print(f"✅ Found email field using: {selector_type} = {selector}")
                        break
                except:
                    continue
            
            if not email_field:
                print("❌ Could not find email field")
                return False
            
            # Clear and fill email
            email_field.clear()
            email_field.send_keys(email)
            print("✅ Entered email")
            
            # Try multiple selectors for password field
            password_selectors = [
                (By.NAME, "password"),
                (By.ID, "password"),
                (By.CSS_SELECTOR, "input[type='password']"),
                (By.XPATH, "//input[@type='password']"),
                (By.XPATH, "//input[contains(@placeholder, 'password')]"),
                (By.XPATH, "//input[contains(@placeholder, 'Password')]")
            ]
            
            password_field = None
            for selector_type, selector in password_selectors:
                try:
                    password_field = self.driver.find_element(selector_type, selector)
                    if password_field:
                        print(f"✅ Found password field using: {selector_type} = {selector}")
                        break
                except:
                    continue
            
            if not password_field:
                print("❌ Could not find password field")
                return False
            
            # Clear and fill password
            password_field.clear()
            password_field.send_keys(password)
            print("✅ Entered password")
            
            # Try multiple selectors for login button
            login_button_selectors = [
                "//button[@type='submit']",
                "//button[contains(text(), 'Log In')]",
                "//button[contains(text(), 'Sign In')]",
                "//button[contains(text(), 'Login')]",
                "//input[@type='submit']",
                "//button[contains(@class, 'login')]",
                "//button[contains(@class, 'submit')]"
            ]
            
            login_button = None
            for selector in login_button_selectors:
                try:
                    login_button = self.driver.find_element(By.XPATH, selector)
                    if login_button:
                        print(f"✅ Found login button using: {selector}")
                        break
                except:
                    continue
            
            if not login_button:
                print("❌ Could not find login button")
                return False
            
            # Click login button
            login_button.click()
            print("✅ Clicked login button")
            time.sleep(3)
            
            # Check if login was successful
            if "dashboard" in self.driver.current_url or "surveys" in self.driver.current_url:
                print("✅ Login successful!")
                return True
            else:
                print("❌ Login failed - still on login page")
                return False
                
        except Exception as e:
            print(f"❌ Login error: {e}")
            return False
    
    def check_login_status(self):
        """Check if user is logged in"""
        try:
            # Check for login indicators
            login_indicators = [
                "//a[contains(text(), 'Log Out')]",
                "//a[contains(text(), 'Sign Out')]",
                "//span[contains(text(), 'Welcome')]",
                "//div[contains(@class, 'user-menu')]"
            ]
            
            for indicator in login_indicators:
                try:
                    element = self.driver.find_element(By.XPATH, indicator)
                    if element:
                        print("✅ User is logged in")
                        return True
                except:
                    continue
            
            print("❌ User is not logged in")
            return False
            
        except Exception as e:
            print(f"Error checking login status: {e}")
            return False

def main():
    bot = SeleniumSurveyBot()
    bot.run()


# Export list for explicit imports
__all__ = ["main"]


if __name__ == "__main__":
    main()
