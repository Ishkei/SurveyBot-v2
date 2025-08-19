#!/usr/bin/env python3
"""
Enhanced Qmee Survey Bot with insights from qmee folder analysis
Incorporates real qmee patterns, API endpoints, and UI structures
"""

import asyncio
import json
import random
import time
from typing import Dict, List, Any, Optional
from urllib.parse import urlparse, parse_qs
import jwt
import requests
from playwright.async_api import Page, Browser, Locator


class QmeeEnhancedSurveyBot:
    """Enhanced Qmee Survey Bot based on real qmee application analysis"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.session = requests.Session()
        self.jwt_token = None
        self.user_context = {}
        self.api_base_url = None
        self.panel_provider = None
        
        # Real qmee API endpoints discovered from analysis
        self.api_endpoints = {
            'profile': '/user/profile',
            'prescreener': '/user/prescreener',
            'answer': '/question/{question_key}/answer/{answer}',
            'brand_settings': '/provider/brand-settings',
            'events': '/prescreen/events/{event}',
            'user_info': '/user/prescreener/info'
        }
        
        # Real CSS selectors from qmee application
        self.selectors = {
            'radio_answer': '.radio-answer',
            'radio_selected': '.radio-answer.selected',
            'confirm_button': '.confirm-button',
            'text_input': '.text-input',
            'dropdown': '.dropdown-selection',
            'loading': '.loading-animation',
            'survey_container': '.survey-content-container',
            'progress_loader': '.progress-loader',
            'next_button': '.confirm-button:not(.disabled)',
            'question_wrapper': '.survey-question-wrapper'
        }
        
        # Question types discovered from analysis
        self.question_types = {
            'selection': 'radio button selection',
            'multi_punch': 'multiple selection checkboxes',
            'input': 'text input field',
            'date': 'date of birth picker',
            'address': 'address with nested questions',
            'children': 'children information',
            'accept': 'terms/consent acceptance',
            'postcode': 'postal code input'
        }

    async def initialize_from_url(self, page: Page, survey_url: str) -> bool:
        """Initialize bot context from qmee survey URL"""
        try:
            # Navigate to survey URL
            await page.goto(survey_url, wait_until='networkidle')
            
            # Extract JWT token from URL parameters
            parsed_url = urlparse(survey_url)
            query_params = parse_qs(parsed_url.query)
            
            if 'token' in query_params:
                self.jwt_token = query_params['token'][0]
                await self._decode_jwt_context()
                
            # Extract encoded profile if present
            if 'encProfile' in query_params:
                self.user_context['encoded_profile'] = query_params['encProfile'][0]
                
            if 'profileiv' in query_params:
                self.user_context['profile_iv'] = query_params['profileiv'][0]
                
            # Determine API base URL (mimics real qmee logic)
            await self._determine_api_base()
            
            print(f"✅ Initialized qmee bot context:")
            print(f"   Panel Provider: {self.panel_provider}")
            print(f"   User GUID: {self.user_context.get('user_guid', 'N/A')}")
            print(f"   API Base: {self.api_base_url}")
            
            return True
            
        except Exception as e:
            print(f"❌ Failed to initialize from URL: {e}")
            return False

    async def _decode_jwt_context(self):
        """Decode JWT token to extract user context (mimics qmee DecodeToken service)"""
        try:
            if not self.jwt_token:
                return
                
            # Decode JWT without verification (for analysis)
            decoded = jwt.decode(self.jwt_token, options={"verify_signature": False})
            
            self.user_context.update({
                'user_guid': decoded.get('sub'),
                'destination_url': decoded.get('destinationUrl'),
                'country_code': decoded.get('countryCode'),
                'panel_provider': decoded.get('panelProvider'),
                'demographics_v2': decoded.get('demographics_v2', False),
                'endless_profiler': decoded.get('endless_profiler', False),
                'exp': decoded.get('exp', 0)
            })
            
            self.panel_provider = self.user_context.get('panel_provider')
            
        except Exception as e:
            print(f"⚠️ Could not decode JWT: {e}")

    async def _determine_api_base(self):
        """Determine API base URL using qmee's logic"""
        # Default URLs from qmee analysis
        heroku_url = "https://profiler-api.qurated.ai"
        aws_url = "https://profiler-api-aws.qurated.ai"
        
        # Mimic qmee's A/B testing logic
        if self.user_context.get('profiler_api_ab_test'):
            self.api_base_url = aws_url
        else:
            self.api_base_url = heroku_url

    async def detect_question_type(self, page: Page) -> Optional[str]:
        """Detect current question type using real qmee patterns"""
        try:
            # Wait for survey content to load
            await page.wait_for_selector(self.selectors['survey_container'], timeout=10000)
            
            # Check for different question types based on real qmee structure
            if await page.locator(self.selectors['radio_answer']).count() > 0:
                # Check if multi-select (multi_punch)
                checkboxes = await page.locator('input[type="checkbox"]').count()
                if checkboxes > 0:
                    return 'multi_punch'
                return 'selection'
                
            elif await page.locator(self.selectors['text_input']).count() > 0:
                # Check for specific input types
                date_inputs = await page.locator('input[type="date"], .date-input').count()
                if date_inputs > 0:
                    return 'date'
                return 'input'
                
            elif await page.locator(self.selectors['dropdown']).count() > 0:
                return 'selection'  # Dropdown selection
                
            elif await page.locator('.address-question, .nested-questions').count() > 0:
                return 'address'
                
            elif await page.locator('.children-question').count() > 0:
                return 'children'
                
            elif await page.locator('.accept-question, .consent-question').count() > 0:
                return 'accept'
                
            return 'unknown'
            
        except Exception as e:
            print(f"⚠️ Could not detect question type: {e}")
            return 'unknown'

    async def answer_selection_question(self, page: Page) -> bool:
        """Answer selection questions using real qmee patterns"""
        try:
            # Get all available radio answers
            radio_answers = page.locator(self.selectors['radio_answer'])
            count = await radio_answers.count()
            
            if count == 0:
                return False
                
            # Filter out hidden or invalid answers (mimics qmee isValidAnswer logic)
            valid_answers = []
            for i in range(count):
                answer = radio_answers.nth(i)
                is_hidden = await answer.get_attribute('hidden')
                is_disabled = await answer.get_attribute('disabled')
                
                if not is_hidden and not is_disabled:
                    valid_answers.append(i)
            
            if not valid_answers:
                return False
                
            # Select random valid answer with human-like timing
            selected_index = random.choice(valid_answers)
            answer_element = radio_answers.nth(selected_index)
            
            # Get answer text for logging
            answer_text = await answer_element.text_content()
            print(f"📝 Selecting answer: {answer_text}")
            
            # Human-like interaction
            await self._human_like_click(answer_element)
            
            # Wait for selection to register
            await page.wait_for_timeout(random.randint(300, 800))
            
            # Verify selection was applied
            is_selected = await answer_element.locator('..').get_attribute('class')
            if 'selected' in (is_selected or ''):
                print(f"✅ Answer selected successfully")
                return True
                
            return False
            
        except Exception as e:
            print(f"❌ Failed to answer selection question: {e}")
            return False

    async def answer_text_question(self, page: Page) -> bool:
        """Answer text input questions with realistic responses"""
        try:
            text_inputs = page.locator(self.selectors['text_input'])
            count = await text_inputs.count()
            
            if count == 0:
                return False
                
            for i in range(count):
                input_element = text_inputs.nth(i)
                
                # Get input type and placeholder for context
                input_type = await input_element.get_attribute('type') or 'text'
                placeholder = await input_element.get_attribute('placeholder') or ''
                
                # Generate appropriate response
                response = await self._generate_text_response(input_type, placeholder)
                
                if response:
                    print(f"📝 Entering text: {response}")
                    
                    # Human-like typing
                    await self._human_like_type(input_element, response)
                    
                    # Trigger validation (mimics qmee updateAnswer)
                    await input_element.blur()
                    await page.wait_for_timeout(random.randint(200, 500))
            
            return True
            
        except Exception as e:
            print(f"❌ Failed to answer text question: {e}")
            return False

    async def answer_multi_punch_question(self, page: Page) -> bool:
        """Answer multi-select questions (multi_punch type)"""
        try:
            checkboxes = page.locator('input[type="checkbox"]')
            count = await checkboxes.count()
            
            if count == 0:
                return False
                
            # Select 1-3 random options (realistic behavior)
            num_selections = random.randint(1, min(3, count))
            selected_indices = random.sample(range(count), num_selections)
            
            for index in selected_indices:
                checkbox = checkboxes.nth(index)
                label = page.locator(f'label[for="{await checkbox.get_attribute("id")}"]')
                
                if await label.count() > 0:
                    label_text = await label.text_content()
                    print(f"📝 Selecting: {label_text}")
                    
                    await self._human_like_click(label)
                    await page.wait_for_timeout(random.randint(200, 600))
            
            return True
            
        except Exception as e:
            print(f"❌ Failed to answer multi-punch question: {e}")
            return False

    async def submit_answer(self, page: Page) -> bool:
        """Submit current answer using qmee's confirm button pattern"""
        try:
            # Wait for confirm button to become available
            confirm_button = page.locator(self.selectors['next_button'])
            
            # Wait for button to be enabled (mimics qmee's validation state)
            await page.wait_for_function(
                f"document.querySelector('{self.selectors['next_button']}') !== null",
                timeout=10000
            )
            
            if await confirm_button.count() > 0:
                button_text = await confirm_button.text_content()
                print(f"🚀 Clicking button: {button_text}")
                
                # Human-like click on submit button
                await self._human_like_click(confirm_button)
                
                # Wait for page transition or loading
                await page.wait_for_timeout(random.randint(1000, 2000))
                
                # Check for loading state
                loading_present = await page.locator(self.selectors['loading']).count() > 0
                if loading_present:
                    print("⏳ Waiting for page to load...")
                    await page.wait_for_selector(self.selectors['loading'], state='detached', timeout=30000)
                
                return True
                
            return False
            
        except Exception as e:
            print(f"❌ Failed to submit answer: {e}")
            return False

    async def check_completion_status(self, page: Page) -> str:
        """Check if survey is complete using qmee patterns"""
        try:
            # Check for redirect page (survey found/complete)
            if await page.locator('.redirect-page, .finding-surveys').count() > 0:
                return 'redirecting'
                
            # Check for completion page
            if await page.locator('.survey-complete, .profiler-complete').count() > 0:
                return 'complete'
                
            # Check for error states
            if await page.locator('.error-page, .expired-link').count() > 0:
                return 'error'
                
            # Check if there are more questions
            if await page.locator(self.selectors['survey_container']).count() > 0:
                return 'continue'
                
            return 'unknown'
            
        except Exception as e:
            print(f"⚠️ Could not determine completion status: {e}")
            return 'unknown'

    async def _human_like_click(self, element: Locator):
        """Enhanced human-like clicking with qmee-specific patterns"""
        try:
            # Scroll element into view
            await element.scroll_into_view_if_needed()
            
            # Wait for element to be stable
            await element.wait_for_element_state('stable')
            
            # Human-like delay before click
            await asyncio.sleep(random.uniform(0.1, 0.3))
            
            # Click with human-like timing
            await element.click(
                timeout=5000,
                force=False  # Respect visibility/clickability
            )
            
        except Exception as e:
            print(f"⚠️ Human-like click failed: {e}")
            # Fallback to force click
            await element.click(force=True)

    async def _human_like_type(self, element: Locator, text: str):
        """Human-like typing with realistic delays"""
        try:
            await element.click()
            await element.clear()
            
            # Type with human-like delays between characters
            for char in text:
                await element.type(char)
                await asyncio.sleep(random.uniform(0.05, 0.15))
                
        except Exception as e:
            print(f"⚠️ Human-like typing failed: {e}")
            await element.fill(text)

    async def _generate_text_response(self, input_type: str, placeholder: str) -> str:
        """Generate realistic text responses based on input context"""
        placeholder_lower = placeholder.lower()
        
        # Email inputs
        if input_type == 'email' or 'email' in placeholder_lower:
            domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
            username = f"user{random.randint(100, 9999)}"
            return f"{username}@{random.choice(domains)}"
            
        # Phone numbers
        if input_type == 'tel' or 'phone' in placeholder_lower:
            return f"555-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
            
        # Names
        if 'name' in placeholder_lower:
            first_names = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa']
            last_names = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Taylor']
            if 'first' in placeholder_lower:
                return random.choice(first_names)
            elif 'last' in placeholder_lower:
                return random.choice(last_names)
            else:
                return f"{random.choice(first_names)} {random.choice(last_names)}"
                
        # Age
        if 'age' in placeholder_lower:
            return str(random.randint(18, 65))
            
        # Generic text
        return "Sample response"

    async def run_survey(self, page: Page, max_questions: int = 50) -> Dict[str, Any]:
        """Run complete survey with qmee-specific logic"""
        results = {
            'questions_answered': 0,
            'completion_status': 'unknown',
            'error_messages': [],
            'start_time': time.time()
        }
        
        try:
            print("🚀 Starting qmee survey automation...")
            
            for question_num in range(max_questions):
                print(f"\n📋 Processing question {question_num + 1}")
                
                # Check completion status
                status = await self.check_completion_status(page)
                if status in ['complete', 'redirecting', 'error']:
                    results['completion_status'] = status
                    break
                
                # Detect question type
                question_type = await self.detect_question_type(page)
                print(f"🔍 Detected question type: {question_type}")
                
                # Answer based on question type
                answered = False
                if question_type == 'selection':
                    answered = await self.answer_selection_question(page)
                elif question_type == 'multi_punch':
                    answered = await self.answer_multi_punch_question(page)
                elif question_type in ['input', 'date']:
                    answered = await self.answer_text_question(page)
                elif question_type == 'accept':
                    # For accept questions, typically select "yes/agree"
                    answered = await self.answer_selection_question(page)
                
                if answered:
                    results['questions_answered'] += 1
                    
                    # Submit answer
                    if await self.submit_answer(page):
                        print("✅ Answer submitted successfully")
                    else:
                        print("⚠️ Failed to submit answer")
                        
                    # Human-like delay between questions
                    await asyncio.sleep(random.uniform(1.0, 3.0))
                else:
                    print("❌ Failed to answer question")
                    break
            
            results['duration'] = time.time() - results['start_time']
            results['completion_status'] = results.get('completion_status', 'timeout')
            
            print(f"\n📊 Survey Results:")
            print(f"   Questions Answered: {results['questions_answered']}")
            print(f"   Completion Status: {results['completion_status']}")
            print(f"   Duration: {results['duration']:.2f} seconds")
            
            return results
            
        except Exception as e:
            print(f"❌ Survey automation failed: {e}")
            results['error_messages'].append(str(e))
            results['completion_status'] = 'error'
            return results


# Integration with existing enhanced cursor simulation
class QmeeIntegratedBot(QmeeEnhancedSurveyBot):
    """Integrated bot combining qmee insights with enhanced cursor simulation"""
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        
        # Try to integrate with enhanced cursor simulation
        try:
            from Project_Structure.enhanced_cursor_simulation import EnhancedCursorSimulator
            self.cursor_simulator = EnhancedCursorSimulator(config)
            self.use_enhanced_cursor = True
            print("✅ Enhanced cursor simulation integrated")
        except ImportError:
            self.cursor_simulator = None
            self.use_enhanced_cursor = False
            print("⚠️ Enhanced cursor simulation not available")

    async def _human_like_click(self, element: Locator):
        """Enhanced clicking with cursor simulation"""
        if self.use_enhanced_cursor and self.cursor_simulator:
            try:
                # Get element position
                box = await element.bounding_box()
                if box:
                    # Calculate click coordinates
                    x = box['x'] + box['width'] / 2
                    y = box['y'] + box['height'] / 2
                    
                    # Use enhanced cursor simulation
                    await self.cursor_simulator.click_element_human_like(
                        (int(x), int(y)), 
                        element_type="qmee_survey_element"
                    )
                    return
            except Exception as e:
                print(f"⚠️ Enhanced cursor click failed, using fallback: {e}")
        
        # Fallback to parent method
        await super()._human_like_click(element)


# Usage example
async def run_qmee_enhanced_bot(survey_url: str, config: Dict[str, Any]):
    """Run the enhanced qmee bot with real application insights"""
    from playwright.async_api import async_playwright
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        try:
            # Initialize bot with qmee insights
            bot = QmeeIntegratedBot(config)
            
            # Initialize from survey URL
            if await bot.initialize_from_url(page, survey_url):
                # Run the survey
                results = await bot.run_survey(page)
                return results
            else:
                print("❌ Failed to initialize bot from URL")
                return None
                
        finally:
            await browser.close()


if __name__ == "__main__":
    # Example usage
    config = {
        "enhanced_cursor": True,
        "debug_mode": True
    }
    
    survey_url = "https://user-profiler.prod.qurated.ai/prescreener?token=your_token_here"
    
    # Run the enhanced bot
    results = asyncio.run(run_qmee_enhanced_bot(survey_url, config))
    print(f"Final results: {results}")
