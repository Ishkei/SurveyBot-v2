#!/usr/bin/env python3
"""
Hybrid Survey Bot - Combines Playwright and Selenium for optimal performance
"""

import asyncio
import time
import random
from typing import Optional, Dict, Any, List
from playwright.async_api import async_playwright, Page, Browser
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

from proxy_management.proxy_manager_v2ray import V2RayProxyManager, ProxyConfig
from config import Config
from personality_responses import generate_personality_response

# Optional imports for enhanced features
try:
    import hrequests
    HREQUESTS_AVAILABLE = True
except ImportError:
    HREQUESTS_AVAILABLE = False
    print("⚠️ hrequests not available. Install with: pip install hrequests")

try:
    from browserforge import BrowserForge
    BROWSERFORGE_AVAILABLE = True
except ImportError:
    BROWSERFORGE_AVAILABLE = False
    print("⚠️ browserforge not available. Install with: pip install browserforge")

try:
    from fingerprint_generator import FingerprintGenerator
    FINGERPRINT_GENERATOR_AVAILABLE = True
except ImportError:
    FINGERPRINT_GENERATOR_AVAILABLE = False
    print("⚠️ fingerprint-generator not available. Install with: pip install fingerprint-generator")

class SurveyBotHybrid:
    def __init__(self, config: Config):
        self.config = config
        self.proxy_manager = V2RayProxyManager(config)
        self.browser = None
        self.page = None
        self.selenium_driver = None
        
        # Survey automation state
        self.current_survey_data = {}
        self.survey_progress = 0
        self.element_map = {}
        
        # Enhanced features
        self.use_hrequests = HREQUESTS_AVAILABLE and config.get('USE_HREQUESTS', False)
        self.use_browserforge = BROWSERFORGE_AVAILABLE and config.get('USE_BROWSERFORGE', False)
        self.use_fingerprint = FINGERPRINT_GENERATOR_AVAILABLE and config.get('USE_FINGERPRINT', False)

    async def setup_browser(self):
        """Setup browser with enhanced features."""
        if self.use_browserforge:
            # Use BrowserForge for enhanced browser automation
            self.browser_forge = BrowserForge()
            await self.browser_forge.start()
            self.browser = await self.browser_forge.get_browser()
        else:
            # Standard Playwright setup
            playwright = await async_playwright().start()
            self.browser = await playwright.chromium.launch(
                headless=not self.config.get('DEBUG_MODE', False),
                proxy=self.proxy_manager.get_proxy_config() if self.proxy_manager else None
            )

    async def setup_selenium(self):
        """Setup Selenium driver with enhanced features."""
        options = webdriver.ChromeOptions()
        
        if self.use_fingerprint:
            # Generate realistic browser fingerprint
            fingerprint_gen = FingerprintGenerator()
            fingerprint = fingerprint_gen.generate()
            options.add_argument(f'--user-agent={fingerprint["userAgent"]}')
            # Add other fingerprint parameters as needed
        
        if self.proxy_manager:
            proxy_config = self.proxy_manager.get_proxy_config()
            if proxy_config:
                options.add_argument(f'--proxy-server={proxy_config["server"]}')
        
        self.selenium_driver = webdriver.Chrome(options=options)

    async def run_hybrid_login(self) -> bool:
        """Hybrid login using both Playwright and Selenium."""
        try:
            # Try Playwright first
            if await self._playwright_login():
                print("✅ Playwright login successful")
                return True
            
            # Fallback to Selenium
            if await self._selenium_login():
                print("✅ Selenium login successful")
                return True
                
            return False
            
        except Exception as e:
            print(f"❌ Login failed: {e}")
            return False

    async def _playwright_login(self) -> bool:
        """Login using Playwright."""
        try:
            self.page = await self.browser.new_page()
            
            # Navigate to login page
            await self.page.goto(self.config.LOGIN_URL)
            
            # Fill credentials
            await self.page.fill(self.config.USERNAME_SELECTOR, self.config.USERNAME)
            await self.page.fill(self.config.PASSWORD_SELECTOR, self.config.PASSWORD)
            
            # Click login button
            await self.page.click(self.config.LOGIN_BUTTON_SELECTOR)
            
            # Wait for successful login
            await self.page.wait_for_selector(self.config.LOGIN_SUCCESS_INDICATOR, timeout=10000)
            
            return True
            
        except Exception as e:
            print(f"Playwright login failed: {e}")
            return False

    async def _selenium_login(self) -> bool:
        """Login using Selenium."""
        try:
            self.selenium_driver.get(self.config.LOGIN_URL)
            
            # Fill credentials
            username_field = WebDriverWait(self.selenium_driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, self.config.USERNAME_SELECTOR))
            )
            username_field.send_keys(self.config.USERNAME)
            
            password_field = self.selenium_driver.find_element(By.CSS_SELECTOR, self.config.PASSWORD_SELECTOR)
            password_field.send_keys(self.config.PASSWORD)
            
            # Click login button
            login_button = self.selenium_driver.find_element(By.CSS_SELECTOR, self.config.LOGIN_BUTTON_SELECTOR)
            login_button.click()
            
            # Wait for successful login
            WebDriverWait(self.selenium_driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, self.config.LOGIN_SUCCESS_INDICATOR))
            )
            
            return True
            
        except Exception as e:
            print(f"Selenium login failed: {e}")
            return False

    async def _run_survey_loop_playwright(self):
        """Enhanced survey automation loop using Playwright."""
        print("🤖 Starting enhanced survey automation...")
        
        while True:
            try:
                # Build element map for current page
                await self._build_element_map()
                
                # Extract survey questions
                questions = await self._extract_survey_questions()
                
                if not questions:
                    print("📝 No questions found, checking for completion...")
                    if await self._check_survey_completion():
                        print("✅ Survey completed!")
                        break
                    else:
                        print("⏭️ Moving to next page...")
                        await self._navigate_next()
                        continue
                
                # Process each question
                for question in questions:
                    await self._process_question(question)
                
                # Navigate to next page
                await self._navigate_next()
                
                # Random delay to appear human
                await asyncio.sleep(random.uniform(1, 3))
                
            except Exception as e:
                print(f"❌ Survey automation error: {e}")
                break

    async def _build_element_map(self):
        """Build a map of interactive elements on the current page."""
        self.element_map = {
            'inputs': [],
            'buttons': [],
            'checkboxes': [],
            'radio_buttons': [],
            'dropdowns': [],
            'text_areas': []
        }
        
        # Find all interactive elements
        elements = await self.page.query_selector_all('input, button, select, textarea')
        
        for element in elements:
            tag_name = await element.get_property('tagName')
            tag_name = await tag_name.json_value()
            
            element_type = await element.get_attribute('type')
            element_id = await element.get_attribute('id')
            element_class = await element.get_attribute('class')
            
            element_info = {
                'element': element,
                'type': element_type,
                'id': element_id,
                'class': element_class,
                'tag': tag_name.lower()
            }
            
            if tag_name.lower() == 'input':
                if element_type in ['text', 'email', 'tel', 'number']:
                    self.element_map['inputs'].append(element_info)
                elif element_type in ['checkbox']:
                    self.element_map['checkboxes'].append(element_info)
                elif element_type in ['radio']:
                    self.element_map['radio_buttons'].append(element_info)
            elif tag_name.lower() == 'button':
                self.element_map['buttons'].append(element_info)
            elif tag_name.lower() == 'select':
                self.element_map['dropdowns'].append(element_info)
            elif tag_name.lower() == 'textarea':
                self.element_map['text_areas'].append(element_info)

    async def _extract_survey_questions(self) -> List[Dict]:
        """Extract survey questions from the current page."""
        questions = []
        
        # Look for common question patterns
        question_selectors = [
            'h1, h2, h3, h4, h5, h6',  # Headers
            '.question, .survey-question',  # Common question classes
            '[data-question], [data-survey]',  # Data attributes
            'label',  # Labels (often contain questions)
            '.form-group label',  # Form group labels
            '.field-label, .input-label'  # Field labels
        ]
        
        for selector in question_selectors:
            elements = await self.page.query_selector_all(selector)
            
            for element in elements:
                text = await element.text_content()
                if text and len(text.strip()) > 10:  # Minimum question length
                    questions.append({
                        'text': text.strip(),
                        'element': element,
                        'selector': selector
                    })
        
        return questions

    async def _process_question(self, question: Dict):
        """Process a single survey question."""
        question_text = question['text']
        print(f"🤔 Processing question: {question_text[:50]}...")
        
        # Determine question type and generate appropriate response
        if await self._is_text_input_question(question):
            response = await generate_personality_response(
                question_text, 
                context="survey text input",
                style="discord_casual"
            )
            await self._fill_text_input(question, response)
            
        elif await self._is_multiple_choice_question(question):
            response = await self._generate_multiple_choice_response(question_text)
            await self._select_multiple_choice(question, response)
            
        elif await self._is_checkbox_question(question):
            response = await self._generate_checkbox_response(question_text)
            await self._select_checkboxes(question, response)
            
        else:
            print(f"⚠️ Unknown question type for: {question_text}")

    async def _is_text_input_question(self, question: Dict) -> bool:
        """Check if question requires text input."""
        # Look for associated input elements
        question_element = question['element']
        
        # Check for nearby input elements
        nearby_inputs = await question_element.query_selector_all('input[type="text"], input[type="email"], textarea')
        return len(nearby_inputs) > 0

    async def _is_multiple_choice_question(self, question: Dict) -> bool:
        """Check if question is multiple choice."""
        # Look for radio buttons or select dropdowns
        question_element = question['element']
        
        nearby_radios = await question_element.query_selector_all('input[type="radio"]')
        nearby_selects = await question_element.query_selector_all('select')
        
        return len(nearby_radios) > 0 or len(nearby_selects) > 0

    async def _is_checkbox_question(self, question: Dict) -> bool:
        """Check if question uses checkboxes."""
        question_element = question['element']
        nearby_checkboxes = await question_element.query_selector_all('input[type="checkbox"]')
        return len(nearby_checkboxes) > 0

    async def _generate_multiple_choice_response(self, question_text: str) -> str:
        """Generate response for multiple choice questions."""
        # Use Discord-style personality for responses
        response = await generate_personality_response(
            f"Multiple choice question: {question_text}",
            context="survey multiple choice",
            style="discord_casual"
        )
        
        # Extract choice from response (simplified)
        choices = ['option 1', 'option 2', 'option 3', 'option 4']
        return random.choice(choices)

    async def _generate_checkbox_response(self, question_text: str) -> List[str]:
        """Generate response for checkbox questions."""
        # Generate 1-3 random selections
        num_selections = random.randint(1, 3)
        all_choices = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5']
        return random.sample(all_choices, min(num_selections, len(all_choices)))

    async def _fill_text_input(self, question: Dict, response: str):
        """Fill text input with generated response."""
        try:
            # Find associated input element
            question_element = question['element']
            input_element = await question_element.query_selector('input[type="text"], input[type="email"], textarea')
            
            if input_element:
                await input_element.fill(response)
                print(f"✍️ Filled text input: {response[:30]}...")
            else:
                print("⚠️ No input element found for text question")
                
        except Exception as e:
            print(f"❌ Error filling text input: {e}")

    async def _select_multiple_choice(self, question: Dict, choice: str):
        """Select a multiple choice option."""
        try:
            question_element = question['element']
            
            # Look for radio buttons
            radio_buttons = await question_element.query_selector_all('input[type="radio"]')
            
            if radio_buttons:
                # Select random radio button
                selected_radio = random.choice(radio_buttons)
                await selected_radio.click()
                print(f"✅ Selected radio option")
            else:
                # Look for select dropdown
                select_element = await question_element.query_selector('select')
                if select_element:
                    options = await select_element.query_selector_all('option')
                    if options:
                        random_option = random.choice(options)
                        await random_option.click()
                        print(f"✅ Selected dropdown option")
                        
        except Exception as e:
            print(f"❌ Error selecting multiple choice: {e}")

    async def _select_checkboxes(self, question: Dict, choices: List[str]):
        """Select checkbox options."""
        try:
            question_element = question['element']
            checkboxes = await question_element.query_selector_all('input[type="checkbox"]')
            
            if checkboxes:
                # Select random checkboxes based on choices
                num_to_select = min(len(choices), len(checkboxes))
                selected_checkboxes = random.sample(checkboxes, num_to_select)
                
                for checkbox in selected_checkboxes:
                    await checkbox.click()
                
                print(f"✅ Selected {len(selected_checkboxes)} checkbox options")
                
        except Exception as e:
            print(f"❌ Error selecting checkboxes: {e}")

    async def _navigate_next(self):
        """Navigate to the next page or submit."""
        try:
            # Look for common next/submit buttons
            next_selectors = [
                'button[type="submit"]',
                'input[type="submit"]',
                '.next-button',
                '.continue-button',
                '.submit-button',
                'button:has-text("Next")',
                'button:has-text("Continue")',
                'button:has-text("Submit")'
            ]
            
            for selector in next_selectors:
                try:
                    button = await self.page.query_selector(selector)
                    if button:
                        await button.click()
                        print("⏭️ Clicked next/submit button")
                        return
                except:
                    continue
            
            print("⚠️ No next button found")
            
        except Exception as e:
            print(f"❌ Error navigating next: {e}")

    async def _check_survey_completion(self) -> bool:
        """Check if survey is completed."""
        try:
            # Look for completion indicators
            completion_selectors = [
                '.survey-complete',
                '.completion-message',
                '.thank-you',
                '.survey-finished',
                'h1:has-text("Thank")',
                'h1:has-text("Complete")'
            ]
            
            for selector in completion_selectors:
                element = await self.page.query_selector(selector)
                if element:
                    return True
            
            return False
            
        except Exception as e:
            print(f"❌ Error checking completion: {e}")
            return False

    async def run(self):
        """Main execution"""
        try:
            # Setup enhanced browser
            await self.setup_browser()
            await self.setup_selenium()
            
            # Try hybrid login
            if not await self.run_hybrid_login():
                print("❌ Login failed. Please check your credentials.")
                return
            
            print("✅ Login successful! Ready to start surveys.")
            
            # Start enhanced survey automation loop
            await self._run_survey_loop_playwright()
            
        except Exception as e:
            print(f"❌ Bot execution failed: {e}")
        finally:
            # Cleanup
            if self.browser:
                await self.browser.close()
            if self.selenium_driver:
                self.selenium_driver.quit()

    async def cleanup(self):
        """Cleanup resources."""
        if self.browser:
            await self.browser.close()
        if self.selenium_driver:
            self.selenium_driver.quit()
        if hasattr(self, 'browser_forge') and self.browser_forge:
            await self.browser_forge.stop()


async def main() -> None:
    """Main entry point for the hybrid survey bot"""
    config = Config()
    bot = SurveyBotHybrid(config)
    await bot.run()


# Export list for explicit imports
__all__ = ["SurveyBotHybrid", "main"]


if __name__ == "__main__":
    asyncio.run(main())
