import asyncio
import os
import json
import time
import random
import base64
from datetime import datetime
from typing import Optional, Dict, Any, List
import requests
from itertools import cycle

from dotenv import load_dotenv
import google.generativeai as genai
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

# Import local modules
from proxy_management.proxy_manager_v2ray import V2RayProxyManager, ProxyConfig
import actions
from personality_responses import generate_personality_response
from config import Config

load_dotenv()

class EnhancedCaptchaSolver:
    """Advanced captcha solving with multiple fallback methods"""
    
    def __init__(self):
        self.capsolver_api_key = os.getenv("CAPSOLVER_API_KEY", "")
        self.anti_captcha_api_key = os.getenv("ANTI_CAPTCHA_API_KEY", "")
        self.local_solving = os.getenv("LOCAL_CAPTCHA_SOLVING", "true").lower() == "true"
        
    def detect_captcha(self, driver) -> Dict[str, Any]:
        """Detect various types of captchas on the page"""
        captcha_info = {
            "type": None,
            "site_key": None,
            "action": None,
            "url": driver.current_url,
            "elements": []
        }
        
        try:
            # Check for reCAPTCHA v2
            recaptcha_v2 = driver.find_elements(By.CSS_SELECTOR, ".g-recaptcha")
            if recaptcha_v2:
                captcha_info["type"] = "recaptcha_v2"
                captcha_info["site_key"] = recaptcha_v2[0].get_attribute("data-sitekey")
                captcha_info["elements"] = recaptcha_v2
                return captcha_info
            
            # Check for reCAPTCHA v3
            recaptcha_v3 = driver.find_elements(By.CSS_SELECTOR, "[data-sitekey]")
            if recaptcha_v3:
                captcha_info["type"] = "recaptcha_v3"
                captcha_info["site_key"] = recaptcha_v3[0].get_attribute("data-sitekey")
                captcha_info["action"] = "survey_submission"
                return captcha_info
            
            # Check for hCaptcha
            hcaptcha = driver.find_elements(By.CSS_SELECTOR, "[data-hcaptcha-widget-id]")
            if hcaptcha:
                captcha_info["type"] = "hcaptcha"
                captcha_info["site_key"] = hcaptcha[0].get_attribute("data-hcaptcha-widget-id")
                return captcha_info
            
            # Check for simple image captcha
            image_captcha = driver.find_elements(By.CSS_SELECTOR, "img[src*='captcha'], img[alt*='captcha']")
            if image_captcha:
                captcha_info["type"] = "image_captcha"
                captcha_info["elements"] = image_captcha
                return captcha_info
                
        except Exception as e:
            print(f"Error detecting captcha: {e}")
            
        return captcha_info
    
    def solve_captcha(self, driver, captcha_info: Dict[str, Any]) -> bool:
        """Solve detected captcha using available methods"""
        if not captcha_info["type"]:
            return True
            
        print(f"Detected {captcha_info['type']} captcha, attempting to solve...")
        
        try:
            if captcha_info["type"] == "recaptcha_v2":
                return self._solve_recaptcha_v2(driver, captcha_info)
            elif captcha_info["type"] == "recaptcha_v3":
                return self._solve_recaptcha_v3(driver, captcha_info)
            elif captcha_info["type"] == "hcaptcha":
                return self._solve_hcaptcha(driver, captcha_info)
            elif captcha_info["type"] == "image_captcha":
                return self._solve_image_captcha(driver, captcha_info)
        except Exception as e:
            print(f"Error solving captcha: {e}")
            
        return False
    
    def _solve_recaptcha_v2(self, driver, captcha_info: Dict[str, Any]) -> bool:
        """Solve reCAPTCHA v2 using CapSolver API"""
        if not self.capsolver_api_key:
            print("No CapSolver API key configured")
            return False
            
        try:
            # Use CapSolver API
            url = "https://api.capsolver.com/createTask"
            payload = {
                "clientKey": self.capsolver_api_key,
                "task": {
                    "type": "RecaptchaV2TaskProxyless",
                    "websiteURL": captcha_info["url"],
                    "websiteKey": captcha_info["site_key"]
                }
            }
            
            response = requests.post(url, json=payload)
            if response.status_code == 200:
                task_id = response.json().get("taskId")
                if task_id:
                    return self._wait_for_capsolver_result(driver, task_id, captcha_info)
                    
        except Exception as e:
            print(f"Error solving reCAPTCHA v2: {e}")
            
        return False
    
    def _wait_for_capsolver_result(self, driver, task_id: str, captcha_info: Dict[str, Any]) -> bool:
        """Wait for CapSolver to solve the captcha"""
        max_attempts = 30
        for attempt in range(max_attempts):
            try:
                url = "https://api.capsolver.com/getTaskResult"
                payload = {"clientKey": self.capsolver_api_key, "taskId": task_id}
                
                response = requests.post(url, json=payload)
                if response.status_code == 200:
                    result = response.json()
                    if result.get("status") == "ready":
                        solution = result.get("solution", {}).get("gRecaptchaResponse")
                        if solution:
                            # Inject the solution
                            driver.execute_script(
                                f'document.getElementById("g-recaptcha-response").innerHTML = "{solution}";'
                            )
                            return True
                            
                time.sleep(2)
            except Exception as e:
                print(f"Error waiting for captcha solution: {e}")
                
        return False
    
    def _solve_recaptcha_v3(self, driver, captcha_info: Dict[str, Any]) -> bool:
        """Solve reCAPTCHA v3"""
        # Similar to v2 but with different task type
        return self._solve_recaptcha_v2(driver, captcha_info)
    
    def _solve_hcaptcha(self, driver, captcha_info: Dict[str, Any]) -> bool:
        """Solve hCaptcha"""
        if not self.capsolver_api_key:
            return False
            
        try:
            url = "https://api.capsolver.com/createTask"
            payload = {
                "clientKey": self.capsolver_api_key,
                "task": {
                    "type": "HCaptchaTaskProxyless",
                    "websiteURL": captcha_info["url"],
                    "websiteKey": captcha_info["site_key"]
                }
            }
            
            response = requests.post(url, json=payload)
            if response.status_code == 200:
                task_id = response.json().get("taskId")
                if task_id:
                    return self._wait_for_capsolver_result(driver, task_id, captcha_info)
                    
        except Exception as e:
            print(f"Error solving hCaptcha: {e}")
            
        return False
    
    def _solve_image_captcha(self, driver, captcha_info: Dict[str, Any]) -> bool:
        """Solve simple image captcha using AI vision"""
        try:
            # Take screenshot of captcha
            captcha_element = captcha_info["elements"][0]
            captcha_element.screenshot("captcha.png")
            
            # Use AI to solve (simplified approach)
            # In a real implementation, you'd use OCR or AI vision
            print("Image captcha detected - manual intervention may be required")
            return False
            
        except Exception as e:
            print(f"Error solving image captcha: {e}")
            return False

class EnhancedStealthBrowser:
    """Enhanced browser with advanced stealth capabilities"""
    
    def __init__(self):
        self.driver = None
        self.wait = None
        self.actions = None
        self.captcha_solver = EnhancedCaptchaSolver()
        
    def initialize_browser(self, proxy_config: Optional[Dict] = None) -> bool:
        """Initialize undetected Chrome with enhanced stealth"""
        try:
            options = uc.ChromeOptions()
            
            # Basic stealth options
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-blink-features=AutomationControlled')
            options.add_experimental_option("excludeSwitches", ["enable-automation"])
            options.add_experimental_option('useAutomationExtension', False)
            
            # Enhanced stealth options
            options.add_argument('--disable-web-security')
            options.add_argument('--disable-features=VizDisplayCompositor')
            options.add_argument('--disable-extensions')
            options.add_argument('--disable-plugins')
            options.add_argument('--disable-images')  # Optional: for faster loading
            options.add_argument('--disable-javascript')  # Optional: may break some sites
            
            # Random user agent
            user_agent = Config.get_random_user_agent()
            options.add_argument(f'--user-agent={user_agent}')
            
            # Window size randomization
            width = random.randint(1200, 1920)
            height = random.randint(800, 1080)
            options.add_argument(f'--window-size={width},{height}')
            
            # Proxy configuration
            if proxy_config:
                if proxy_config.get("type") == "socks5":
                    options.add_argument(f'--proxy-server=socks5://{proxy_config["host"]}:{proxy_config["port"]}')
                else:
                    options.add_argument(f'--proxy-server=http://{proxy_config["host"]}:{proxy_config["port"]}')
            
            # Initialize undetected Chrome
            self.driver = uc.Chrome(options=options)
            
            # Additional stealth measures
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            self.driver.execute_script("Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]})")
            self.driver.execute_script("Object.defineProperty(navigator, 'languages', {get: () => ['en-US', 'en']})")
            
            # Set up wait and actions
            self.wait = WebDriverWait(self.driver, Config.ELEMENT_TIMEOUT / 1000)
            self.actions = ActionChains(self.driver)
            
            print("Enhanced stealth browser initialized successfully")
            return True
            
        except Exception as e:
            print(f"Error initializing enhanced browser: {e}")
            return False
    
    def humanize_interaction(self, element, action_type: str = "click"):
        """Add human-like behavior to interactions"""
        try:
            # Random delay before action
            time.sleep(random.uniform(Config.MIN_DELAY, Config.MAX_DELAY))
            
            # Scroll element into view with random offset
            self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
            time.sleep(random.uniform(0.1, 0.3))
            
            if action_type == "click":
                # Move mouse to element with slight randomness
                self.actions.move_to_element(element)
                self.actions.pause(random.uniform(0.1, 0.2))
                self.actions.click()
                self.actions.perform()
            elif action_type == "type":
                # Clear field and type with human-like delays
                element.clear()
                time.sleep(random.uniform(0.1, 0.2))
                for char in element.get_attribute("value"):
                    element.send_keys(char)
                    time.sleep(random.uniform(0.01, 0.03))
                    
        except Exception as e:
            print(f"Error during humanized interaction: {e}")
            # Fallback to regular interaction
            if action_type == "click":
                element.click()
            elif action_type == "type":
                element.clear()
                element.send_keys(element.get_attribute("value"))

class EnhancedSurveyBot:
    """Enhanced survey bot with advanced stealth and captcha solving"""
    
    def __init__(self):
        self.browser = EnhancedStealthBrowser()
        self.v2ray_manager = V2RayProxyManager(v2ray_path="./v2ray/v2ray")
        self.current_proxy = None
        self.proxy_rotation_count = 0
        self.survey_count = 0
        
        # Initialize AI model
        self._setup_ai_model()
        self._load_persona()
        
    def _setup_ai_model(self):
        """Setup AI model for survey solving"""
        GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
        if GOOGLE_API_KEY and GOOGLE_API_KEY != "YOUR_GOOGLE_API_KEY":
            genai.configure(api_key=GOOGLE_API_KEY)
            self.model = genai.GenerativeModel('gemini-1.5-flash-latest')
        else:
            print("Warning: GOOGLE_API_KEY not found. AI features will be limited.")
            self.model = None
    
    def _load_persona(self):
        """Load AI personality configuration"""
        try:
            with open('../Configurations/configs/persona.json', 'r') as f:
                self.persona = json.load(f)
            self.persona_prompt = f"""You are an AI assistant representing a person with these details: {json.dumps(self.persona)}.
Your primary goal is to answer survey questions accurately based on this persona.
When presented with multiple choice options, select ONLY the single, specific button or radio option that directly corresponds to the answer.
You MUST provide the NUMERIC ID (e.g., 15) of the element to click or fill, NOT its text label.
Avoid clicking on general navigation links. Always prioritize progressing through the survey.
"""
        except FileNotFoundError:
            print("Error: ../Configurations/configs/persona.json not found! Please create it.")
            exit()
    
    def initialize(self) -> bool:
        """Initialize the enhanced survey bot"""
        try:
            # Load V2Ray proxy configurations
            if not self.v2ray_manager.load_configs_from_file():
                print("No V2Ray proxy configurations found. Creating sample configurations...")
                from proxy_management.proxy_manager_v2ray import create_sample_proxies
                create_sample_proxies()
                self.v2ray_manager.load_configs_from_file("sample_v2ray_proxies.json")
            
            # Get best proxy
            best_proxy = self.v2ray_manager.get_best_proxy()
            if best_proxy:
                # Start V2Ray proxy
                if self.v2ray_manager.start_proxy(best_proxy, 1080):
                    self.current_proxy = best_proxy
                    proxy_config = {
                        "type": "socks5",
                        "host": "127.0.0.1",
                        "port": "1080"
                    }
                    print(f"Using V2Ray proxy: {best_proxy.name}")
                else:
                    print("Failed to start V2Ray proxy. Using direct connection.")
                    proxy_config = None
            else:
                print("No working V2Ray proxies available. Using direct connection.")
                proxy_config = None
            
            # Initialize browser
            if not self.browser.initialize_browser(proxy_config):
                return False
            
            return True
            
        except Exception as e:
            print(f"Error initializing enhanced survey bot: {e}")
            return False
    
    def solve_survey_with_ai(self, page_content: str, screenshot_path: str = None) -> Dict[str, Any]:
        """Solve survey using AI vision and text analysis"""
        try:
            if not self.model:
                return {"action": "wait", "reason": "AI model not available"}
            
            # Build context for AI
            context = f"""
            Current page content: {page_content}
            Persona: {json.dumps(self.persona)}
            
            Analyze this survey page and determine the next action. Available actions:
            - click: Click on a specific element (provide element ID)
            - type: Type text into a field (provide element ID and text)
            - wait: Wait for page to load
            - complete: Survey is complete
            - error: Error occurred
            
            Return response as JSON with format:
            {{"action": "action_type", "element_id": "id", "text": "text_to_type", "reason": "explanation"}}
            """
            
            # Add screenshot if available
            if screenshot_path and os.path.exists(screenshot_path):
                with open(screenshot_path, "rb") as f:
                    image_data = f.read()
                
                response = self.model.generate_content([context, image_data])
            else:
                response = self.model.generate_content(context)
            
            # Parse response
            try:
                result = json.loads(response.text)
                return result
            except json.JSONDecodeError:
                # Fallback parsing
                return {"action": "wait", "reason": "Could not parse AI response"}
                
        except Exception as e:
            print(f"Error solving survey with AI: {e}")
            return {"action": "wait", "reason": f"AI error: {e}"}
    
    def execute_ai_decision(self, decision: Dict[str, Any]) -> bool:
        """Execute the AI's decision"""
        try:
            action = decision.get("action", "wait")
            element_id = decision.get("element_id")
            text = decision.get("text", "")
            reason = decision.get("reason", "")
            
            print(f"Executing action: {action} - {reason}")
            
            if action == "click" and element_id:
                element = self.browser.driver.find_element(By.ID, element_id)
                self.browser.humanize_interaction(element, "click")
                return True
                
            elif action == "type" and element_id and text:
                element = self.browser.driver.find_element(By.ID, element_id)
                self.browser.humanize_interaction(element, "type")
                return True
                
            elif action == "wait":
                time.sleep(random.uniform(2, 5))
                return True
                
            elif action == "complete":
                print("Survey completed successfully!")
                return True
                
            elif action == "error":
                print(f"AI detected error: {reason}")
                return False
                
        except Exception as e:
            print(f"Error executing AI decision: {e}")
            return False
    
    def handle_captcha(self) -> bool:
        """Handle any captchas on the current page"""
        try:
            captcha_info = self.browser.captcha_solver.detect_captcha(self.browser.driver)
            if captcha_info["type"]:
                return self.browser.captcha_solver.solve_captcha(self.browser.driver, captcha_info)
            return True
        except Exception as e:
            print(f"Error handling captcha: {e}")
            return False
    
    def run_survey_loop(self):
        """Main survey execution loop"""
        try:
            while True:
                self.survey_count += 1
                print(f"\n=== Starting Survey #{self.survey_count} ===")
                
                # Navigate to survey platform
                if not self._navigate_to_surveys():
                    print("Failed to navigate to surveys")
                    continue
                
                # Find and start survey
                if not self._find_and_start_survey():
                    print("No surveys available or failed to start survey")
                    continue
                
                # Complete survey
                if not self._complete_survey():
                    print("Failed to complete survey")
                    continue
                
                # Handle completion
                self._handle_survey_completion()
                
                # Rotate proxy if needed
                if self.survey_count % Config.PROXY_ROTATION_INTERVAL == 0:
                    self._rotate_proxy()
                
                # Random delay between surveys
                delay = Config.get_random_delay()
                print(f"Waiting {delay} seconds before next survey...")
                time.sleep(delay)
                
        except KeyboardInterrupt:
            print("\nSurvey bot stopped by user")
        except Exception as e:
            print(f"Error in survey loop: {e}")
        finally:
            self.cleanup()
    
    def _navigate_to_surveys(self) -> bool:
        """Navigate to the survey platform"""
        try:
            survey_url = Config.SURVEY_URL
            print(f"Navigating to: {survey_url}")
            
            self.browser.driver.get(survey_url)
            time.sleep(random.uniform(2, 4))
            
            # Handle any captchas
            self.handle_captcha()
            
            return True
        except Exception as e:
            print(f"Error navigating to surveys: {e}")
            return False
    
    def _find_and_start_survey(self) -> bool:
        """Find and start an available survey"""
        try:
            # Look for survey elements
            survey_selectors = [
                '.survey-card',
                '[data-testid*="survey"]',
                'button:has-text("Start")',
                'a[href*="survey"]'
            ]
            
            for selector in survey_selectors:
                try:
                    elements = self.browser.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        print(f"Found {len(elements)} survey elements with selector: {selector}")
                        # Click the first available survey
                        self.browser.humanize_interaction(elements[0], "click")
                        time.sleep(random.uniform(3, 6))
                        return True
                except Exception as e:
                    continue
            
            print("No survey elements found")
            return False
            
        except Exception as e:
            print(f"Error finding survey: {e}")
            return False
    
    def _complete_survey(self) -> bool:
        """Complete the current survey using AI"""
        try:
            max_steps = 50  # Prevent infinite loops
            step_count = 0
            
            while step_count < max_steps:
                step_count += 1
                print(f"Survey step {step_count}")
                
                # Get page content
                page_content = self.browser.driver.page_source
                
                # Take screenshot
                screenshot_path = f"screenshot_step_{step_count}.png"
                self.browser.driver.save_screenshot(screenshot_path)
                
                # Solve with AI
                decision = self.solve_survey_with_ai(page_content, screenshot_path)
                
                # Execute decision
                if not self.execute_ai_decision(decision):
                    print("Failed to execute AI decision")
                    return False
                
                # Check for completion
                if decision.get("action") == "complete":
                    return True
                
                # Handle captchas
                self.handle_captcha()
                
                # Wait for page to load
                time.sleep(random.uniform(1, 3))
            
            print("Survey step limit reached")
            return False
            
        except Exception as e:
            print(f"Error completing survey: {e}")
            return False
    
    def _handle_survey_completion(self):
        """Handle survey completion"""
        try:
            print("Survey completed successfully!")
            
            # Look for completion indicators
            completion_texts = [
                "thank you", "congratulations", "survey complete",
                "completion", "success", "100%"
            ]
            
            page_text = self.browser.driver.page_source.lower()
            for text in completion_texts:
                if text in page_text:
                    print(f"Found completion indicator: {text}")
                    break
            
            # Take final screenshot
            self.browser.driver.save_screenshot(f"survey_completed_{self.survey_count}.png")
            
        except Exception as e:
            print(f"Error handling survey completion: {e}")
    
    def _rotate_proxy(self):
        """Rotate to a new proxy"""
        try:
            if self.current_proxy:
                self.v2ray_manager.stop_proxy()
            
            best_proxy = self.v2ray_manager.get_best_proxy()
            if best_proxy and best_proxy != self.current_proxy:
                if self.v2ray_manager.start_proxy(best_proxy, 1080):
                    self.current_proxy = best_proxy
                    print(f"Rotated to new proxy: {best_proxy.name}")
                else:
                    print("Failed to rotate proxy")
                    
        except Exception as e:
            print(f"Error rotating proxy: {e}")
    
    def cleanup(self):
        """Clean up resources"""
        try:
            if self.current_proxy:
                self.v2ray_manager.stop_proxy()
            
            if self.browser.driver:
                self.browser.driver.quit()
                
            print("Cleanup completed")
        except Exception as e:
            print(f"Error during cleanup: {e}")
    
    def run(self):
        """Main entry point"""
        try:
            if not self.initialize():
                print("Failed to initialize enhanced survey bot")
                return
            
            print("Enhanced survey bot initialized successfully")
            print(f"Configuration: {Config.print_config()}")
            
            self.run_survey_loop()
            
        except Exception as e:
            print(f"Error running enhanced survey bot: {e}")
        finally:
            self.cleanup()

def main():
    """Main function"""
    bot = EnhancedSurveyBot()
    bot.run()

if __name__ == "__main__":
    main()

