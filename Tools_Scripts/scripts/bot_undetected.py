import asyncio
import os
import json
import re
import time
from datetime import datetime
from typing import Optional, Dict, Any

from dotenv import load_dotenv
import google.generativeai as genai
from browser_use_undetected import StealthBrowserSession
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import requests
from itertools import cycle

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
    with open('persona.json', 'r') as f:
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
    
    def get_proxy_config(self) -> Dict[str, str]:
        """Get proxy configuration for browser-use-undetected"""
        proxy = self.get_next_proxy()
        if proxy:
            return {
                "proxy_host": proxy.split(':')[0],
                "proxy_port": int(proxy.split(':')[1]),
                "proxy_user": os.getenv("PROXY_USER", ""),
                "proxy_pass": os.getenv("PROXY_PASS", "")
            }
        return {}

class UndetectedSurveyBot:
    """Main bot class using browser-use-undetected for stealth"""
    
    def __init__(self):
        self.browser = None
        self.proxy_rotator = ProxyRotator()
        self.session_data = {}
        
    async def initialize_browser(self):
        """Initialize the undetected browser session"""
        try:
            # Load proxies
            self.proxy_rotator.load_proxies_from_file()
            proxy_config = self.proxy_rotator.get_proxy_config()
            
            # Initialize browser with stealth capabilities
            self.browser = StealthBrowserSession(
                proxy_config=proxy_config,
                undetectable_agent=True,
                captcha_api_key=os.getenv("CAPTCHA_API_KEY", ""),
                undetectable_browser_path=None  # Auto-detect
            )
            
            print("Browser initialized with stealth capabilities")
            return True
        except Exception as e:
            print(f"Failed to initialize browser: {e}")
            return False
    
    async def load_session(self):
        """Load saved session data"""
        try:
            if os.path.exists('auth.json'):
                with open('auth.json', 'r') as f:
                    self.session_data = json.load(f)
                print("Session data loaded")
                return True
        except Exception as e:
            print(f"Failed to load session: {e}")
        return False
    
    async def navigate_to_surveys(self):
        """Navigate to the survey platform"""
        try:
            # Navigate to Qmee or alternative platform
            await self.browser.open("https://www.qmee.com/en-us/surveys")
            
            # Apply session data if available
            if self.session_data:
                await self.apply_session_data()
            
            print("Navigated to survey platform")
            return True
        except Exception as e:
            print(f"Failed to navigate to surveys: {e}")
            return False
    
    async def apply_session_data(self):
        """Apply saved session data to maintain login state"""
        try:
            # This would need to be implemented based on the specific session format
            # For now, we'll just set cookies if they exist
            if 'cookies' in self.session_data:
                for cookie in self.session_data['cookies']:
                    await self.browser.set_cookie(cookie)
            print("Session data applied")
        except Exception as e:
            print(f"Failed to apply session data: {e}")
    
    async def find_and_start_survey(self):
        """Find and start a survey"""
        try:
            # Wait for survey elements to load
            await self.browser.wait_for_selector('button:has-text("Start"), a[href*="survey"], .survey-card', timeout=10000)
            
            # Try multiple selectors to find survey elements
            selectors = [
                'button:has-text("Start")',
                'a[href*="survey"]',
                '.survey-card',
                '[data-testid*="survey"]',
                'button:has-text("Start earning")'
            ]
            
            for selector in selectors:
                try:
                    elements = await self.browser.query_selector_all(selector)
                    if elements:
                        await elements[0].click()
                        print(f"Started survey using selector: {selector}")
                        return True
                except Exception:
                    continue
            
            print("No survey found automatically")
            return False
        except Exception as e:
            print(f"Failed to start survey: {e}")
            return False
    
    async def solve_page_with_vision(self):
        """Solve the current page using vision AI"""
        try:
            # Take screenshot
            screenshot = await self.browser.screenshot()
            
            # Get page content
            page_content = await self.browser.get_page_content()
            
            # Build DOM tree
            dom_tree = await self.build_dom_tree()
            
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
                response = await model.generate_content_async([prompt, {"mime_type": "image/png", "data": screenshot}])
                decision = json.loads(response.text)
                
                # Execute the decision
                return await self.execute_decision(decision)
            else:
                # Fallback to rule-based approach
                return await self.fallback_survey_logic()
                
        except Exception as e:
            print(f"Error in vision-based solving: {e}")
            return await self.fallback_survey_logic()
    
    async def build_dom_tree(self):
        """Build a DOM tree of interactive elements"""
        try:
            elements = await self.browser.query_selector_all('button, input, select, a, label')
            dom_tree = ""
            
            for i, element in enumerate(elements):
                try:
                    tag = await element.get_tag_name()
                    text = await element.get_text_content()
                    
                    if text and len(text.strip()) > 0:
                        dom_tree += f"[{i}] <{tag}> \"{text.strip()}\"\n"
                        
                except Exception:
                    continue
            
            return dom_tree
        except Exception as e:
            print(f"Error building DOM tree: {e}")
            return ""
    
    async def execute_decision(self, decision):
        """Execute the AI's decision"""
        try:
            tool = decision.get('tool')
            args = decision.get('args', {})
            
            if tool == 'click_element':
                element_id = args.get('element_id')
                elements = await self.browser.query_selector_all('button, input, select, a, label')
                if element_id < len(elements):
                    await elements[element_id].click()
                    print(f"Clicked element {element_id}")
                    return True
                    
            elif tool == 'fill_textbox':
                element_id = args.get('element_id')
                text = args.get('text_to_fill')
                elements = await self.browser.query_selector_all('input[type="text"], textarea')
                if element_id < len(elements):
                    await elements[element_id].fill(text)
                    print(f"Filled element {element_id} with '{text}'")
                    return True
            
            return False
        except Exception as e:
            print(f"Error executing decision: {e}")
            return False
    
    async def fallback_survey_logic(self):
        """Fallback logic when AI is not available"""
        try:
            # Look for common survey elements
            elements = await self.browser.query_selector_all('button, input, a')
            
            for element in elements:
                try:
                    text = await element.get_text_content()
                    if text:
                        text_lower = text.lower()
                        
                        # Common survey progression buttons
                        if any(word in text_lower for word in ['next', 'continue', 'submit', 'agree', 'yes']):
                            await element.click()
                            print(f"Clicked fallback element: {text}")
                            return True
                            
                except Exception:
                    continue
            
            return False
        except Exception as e:
            print(f"Error in fallback logic: {e}")
            return False
    
    async def handle_survey_completion(self):
        """Handle survey completion detection"""
        try:
            page_content = await self.browser.get_page_content()
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
    
    async def run_survey_loop(self):
        """Main survey completion loop"""
        max_attempts = 50
        attempts = 0
        
        while attempts < max_attempts:
            attempts += 1
            print(f"\n--- Survey Attempt {attempts} ---")
            
            try:
                # Check for survey completion
                if await self.handle_survey_completion():
                    print("Survey completed successfully!")
                    break
                
                # Solve current page
                success = await self.solve_page_with_vision()
                
                if not success:
                    print("Failed to solve page, retrying...")
                
                # Wait before next attempt
                await asyncio.sleep(3)
                
            except Exception as e:
                print(f"Error in survey loop: {e}")
                await asyncio.sleep(5)
        
        print("Survey loop finished")
    
    async def run(self):
        """Main bot execution"""
        try:
            # Initialize browser
            if not await self.initialize_browser():
                return
            
            # Load session
            await self.load_session()
            
            # Navigate to surveys
            if not await self.navigate_to_surveys():
                return
            
            # Find and start survey
            if not await self.find_and_start_survey():
                print("Please manually navigate to a survey and press Enter")
                input("Press Enter when ready...")
            
            # Run survey completion loop
            await self.run_survey_loop()
            
        except Exception as e:
            print(f"Error in main execution: {e}")
        finally:
            if self.browser:
                await self.browser.close()

async def main():
    bot = UndetectedSurveyBot()
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
