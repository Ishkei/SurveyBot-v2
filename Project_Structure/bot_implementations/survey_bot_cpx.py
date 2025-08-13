"""
CPX Research Survey Bot Implementation
Handles CPX Research surveys with their specific question types and API integration
"""

import asyncio
import json
import re
import time
import random
import base64
import cv2
import numpy as np
from datetime import datetime
from typing import Dict, Any, List, Optional, Tuple
from urllib.parse import urljoin, urlparse, parse_qs

from playwright.async_api import async_playwright, Page, BrowserContext
import requests

# Vision and OCR imports
try:
    import pytesseract
    from PIL import Image
    import io
    OCR_AVAILABLE = True
except ImportError:
    OCR_AVAILABLE = False
    print("⚠️ pytesseract not available, OCR features disabled")

# Vision model imports
try:
    import openai
    VISION_AVAILABLE = True
except ImportError:
    VISION_AVAILABLE = False
    print("⚠️ openai not available, vision features disabled")

# Import enhanced features
try:
    from enhanced_personality_system import EnhancedPersonalitySystem
    from typing_simulation import type_text_naturally, TYPING_PRESETS
    from free_captcha_solver import FreeCaptchaSolver
    ENHANCED_FEATURES_AVAILABLE = True
except ImportError:
    ENHANCED_FEATURES_AVAILABLE = False
    print("⚠️ Enhanced features not available for CPX bot")

from config import Config
from personality_responses import generate_personality_response, PersonalityResponseGenerator


class CPXResearchBot:
    """
    CPX Research survey bot that handles their specific question types:
    - single_punch (radio buttons)
    - multi_punch (checkboxes) 
    - open_ended (text input)
    - int_open_ended (number input)
    """
    
    def __init__(self, app_id: str = None, ext_user_id: str = None):
        self.app_id = app_id or Config.CPX_APP_ID
        self.ext_user_id = ext_user_id or Config.CPX_EXT_USER_ID
        self.base_url = "https://offers.cpx-research.com"
        self.api_base = "https://live-api.cpx-research.com/api"
        
        # Try to load CPX-specific configuration
        config_files = [
            '../Configurations/configs/cpx_config.json',
            '../../Configurations/configs/cpx_config.json',
            'configs/cpx_config.json',
            'cpx_config.json'
        ]
        
        self.cpx_config = {}
        for path in config_files:
            try:
                with open(path, 'r') as f:
                    self.cpx_config = json.load(f)
                    print(f"✅ Loaded CPX config from: {path}")
                    break
            except FileNotFoundError:
                continue
        
        if not self.cpx_config:
            print("⚠️ CPX config file not found, using defaults")
        
        # Initialize personality system (always available)
        self.personality_generator = PersonalityResponseGenerator()
        print("✅ Persona system loaded")
        
        # Initialize hybrid vision/DOM capabilities
        self.vision_config = self.load_vision_config()
        self.use_hybrid_approach = self.vision_config.get('survey_automation', {}).get('HYBRID_HTML_VISION', True)
        self.use_vision_fallback = self.vision_config.get('error_handling', {}).get('FALLBACK_TO_HTML', True)
        
        print(f"🔍 Hybrid Vision/DOM: {'✅' if self.use_hybrid_approach else '❌'}")
        print(f"   Vision Fallback: {'✅' if self.use_vision_fallback else '❌'}")
        print(f"   OCR Available: {'✅' if OCR_AVAILABLE else '❌'}")
        print(f"   Vision API: {'✅' if VISION_AVAILABLE else '❌'}")
        
        # Initialize enhanced features if available
        self.personality_system = None
        self.captcha_solver = None
        if ENHANCED_FEATURES_AVAILABLE:
            try:
                self.personality_system = EnhancedPersonalitySystem()
                self.captcha_solver = FreeCaptchaSolver()
                print("✅ Enhanced features initialized for CPX bot")
            except Exception as e:
                print(f"⚠️ Error initializing enhanced features: {e}")
        
        # Load persona data
        self.persona = self.personality_generator._load_personality()
        if self.persona:
            print(f"✅ Loaded persona: {self.persona.get('about_you', {}).get('full_name', 'Unknown')}")
        else:
            print("⚠️ No persona data loaded, using defaults")
        
        # Session tracking
        self.session_stats = {
            'surveys_started': 0,
            'surveys_completed': 0,
            'questions_answered': 0,
            'earnings': 0.0
        }
        
        # Browser and page references
        self.browser = None
        self.context = None
        self.page = None
        
        print(f"🎯 CPX Research Bot initialized")
        print(f"   App ID: {self.app_id}")
        print(f"   User ID: {self.ext_user_id}")
    
    def load_vision_config(self) -> Dict[str, Any]:
        """Load vision configuration for hybrid approach"""
        try:
            # Try multiple possible paths for vision config
            vision_config_files = [
                '../Configurations/configs/vision_advanced_config.json',
                '../../Configurations/configs/vision_advanced_config.json',
                'configs/vision_advanced_config.json',
                'vision_advanced_config.json'
            ]
            
            for path in vision_config_files:
                try:
                    if os.path.exists(path):
                        with open(path, 'r', encoding='utf-8') as f:
                            config = json.load(f)
                            print(f"✅ Loaded vision config from: {path}")
                            return config
                except Exception as e:
                    continue
            
            # Return default vision config if none found
            print("⚠️ No vision config found, using defaults")
            return {
                'survey_automation': {
                    'HYBRID_HTML_VISION': True,
                    'VISION_BASED_APPROACH': False,
                    'AUTO_DETECT_QUESTIONS': True
                },
                'error_handling': {
                    'FALLBACK_TO_HTML': True,
                    'MAX_RETRIES': 3
                },
                'element_detection': {
                    'OCR_CONFIDENCE_THRESHOLD': 50,
                    'TEXT_MATCHING_THRESHOLD': 0.8
                }
            }
        except Exception as e:
            print(f"❌ Error loading vision config: {e}")
            return {}
    
    async def initialize_browser(self) -> bool:
        """Initialize Playwright browser"""
        try:
            playwright = await async_playwright().start()
            self.browser = await playwright.chromium.launch(
                headless=Config.HEADLESS,
                slow_mo=Config.SLOW_MO,
                args=[
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-blink-features=AutomationControlled',
                    '--disable-features=VizDisplayCompositor'
                ]
            )
            
            self.context = await self.browser.new_context(
                user_agent=Config.get_random_user_agent(),
                viewport={'width': 1920, 'height': 1080}
            )
            
            self.page = await self.context.new_page()
            
            # Add stealth scripts
            await self.page.add_init_script("""
                Object.defineProperty(navigator, 'webdriver', {
                    get: () => undefined,
                });
                
                window.chrome = {
                    runtime: {},
                };
            """)
            
            print("✅ Browser initialized successfully")
            return True
            
        except Exception as e:
            print(f"❌ Failed to initialize browser: {e}")
            return False
    
    def get_cpx_url(self) -> str:
        """Get the CPX Research URL with proper parameters"""
        return f"{self.base_url}/index.php?app_id={self.app_id}&ext_user_id={self.ext_user_id}"
    
    async def navigate_to_cpx(self) -> bool:
        """Navigate to CPX Research platform"""
        try:
            cpx_url = self.get_cpx_url()
            print(f"🌐 Navigating to CPX Research: {cpx_url}")
            
            await self.page.goto(cpx_url, wait_until='domcontentloaded')
            await asyncio.sleep(random.uniform(2, 4))
            
            # Wait for the main content to load - the page shows "We are looking for more surveys for you ..."
            try:
                # First wait for the main content div
                await self.page.wait_for_selector('#main-content', timeout=15000)
                
                # Wait a bit for the JavaScript to execute and load surveys
                await asyncio.sleep(5)
                
                # Check if surveys are loaded or if we're still in loading state
                loading_text = await self.page.text_content('.startscreen')
                if loading_text and "looking for more surveys" in loading_text.lower():
                    print("⏳ Page is still loading surveys, waiting longer...")
                    await asyncio.sleep(10)  # Wait for surveys to load via JavaScript
                
                print("✅ CPX Research page loaded")
                
            except Exception as e:
                print(f"⚠️ Selector timeout, but page may have loaded: {e}")
                # Continue anyway, the page might be functional
            
            # Debug: Print what's actually on the page
            try:
                page_title = await self.page.title()
                page_url = self.page.url
                print(f"🔍 Page debug info:")
                print(f"   Title: {page_title}")
                print(f"   URL: {page_url}")
                
                # Check for common elements
                main_content_exists = await self.page.locator('#main-content').count() > 0
                survey_cards_exist = await self.page.locator('.point-card').count() > 0
                loading_exists = await self.page.locator('.startscreen').count() > 0
                
                print(f"   Main content exists: {main_content_exists}")
                print(f"   Survey cards exist: {survey_cards_exist}")
                print(f"   Loading screen exists: {loading_exists}")
                
                if loading_exists:
                    loading_text = await self.page.text_content('.startscreen')
                    print(f"   Loading text: {loading_text}")
                
            except Exception as debug_e:
                print(f"⚠️ Debug info failed: {debug_e}")
            
            return True
            
        except Exception as e:
            print(f"❌ Failed to navigate to CPX Research: {e}")
            return False
    
    async def get_available_surveys(self) -> List[Dict[str, Any]]:
        """Get available surveys from the page or API"""
        try:
            # First try to get surveys from the page DOM (they're loaded via JavaScript)
            print("🔍 Looking for surveys on the page...")
            
            # Wait for survey cards to appear
            await asyncio.sleep(5)  # Give time for JavaScript to load surveys
            
            # Check for survey cards
            survey_cards = await self.page.locator('.point-card').all()
            
            # If no survey cards, try to trigger the survey loading via JavaScript
            if not survey_cards:
                print("🔄 No survey cards found, trying to trigger survey loading...")
                try:
                    # Call the JavaScript function that loads surveys
                    await self.page.evaluate("if (typeof update_survey_list === 'function') { update_survey_list('main'); }")
                    await asyncio.sleep(8)  # Wait for surveys to load
                    
                    # Check again for survey cards
                    survey_cards = await self.page.locator('.point-card').all()
                    print(f"🔄 After JS trigger: Found {len(survey_cards)} survey cards")
                except Exception as js_e:
                    print(f"⚠️ JavaScript trigger failed: {js_e}")
            
            if survey_cards:
                print(f"📋 Found {len(survey_cards)} survey cards on page")
                surveys = []
                
                for i, card in enumerate(survey_cards):
                    try:
                        # Extract survey ID from the card's onClick attribute
                        onclick_attr = await card.get_attribute('onclick')
                        survey_id = None
                        if onclick_attr:
                            # Extract survey ID from onclick="update_survey_details_clicked('survey_id')"
                            import re
                            match = re.search(r"update_survey_details_clicked\('([^']+)'\)", onclick_attr)
                            if match:
                                survey_id = match.group(1)
                        
                        if not survey_id:
                            # Try to get from id attribute
                            card_id = await card.get_attribute('id')
                            if card_id and card_id.startswith('survey_card_'):
                                survey_id = card_id.replace('survey_card_', '')
                        
                        if survey_id:
                            # Get payout and duration info
                            payout_element = card.locator('#payout_showed').first
                            payout = await payout_element.text_content() if await payout_element.count() > 0 else "Unknown"
                            
                            duration_element = card.locator('.time h5').first
                            duration = await duration_element.text_content() if await duration_element.count() > 0 else "Unknown"
                            
                            surveys.append({
                                'id': survey_id,
                                'payout': payout,
                                'loi': duration.replace('~', '').strip(),
                                'type': 'available'
                            })
                            
                            print(f"   Survey {i+1}: ID={survey_id}, Payout={payout}, Duration={duration}")
                    
                    except Exception as e:
                        print(f"⚠️ Error parsing survey card {i}: {e}")
                        continue
                
                if surveys:
                    return surveys
            
            # Fallback to API call if no surveys found on page
            print("📡 No surveys found on page, trying API...")
            return await self.get_surveys_from_api()
                
        except Exception as e:
            print(f"❌ Failed to get surveys: {e}")
            # Fallback to API
            return await self.get_surveys_from_api()
    
    async def get_surveys_from_api(self) -> List[Dict[str, Any]]:
        """Get available surveys from CPX Research API as fallback"""
        try:
            # Get timezone info for API call
            timezone_offset = await self.page.evaluate('new Date().getTimezoneOffset()/60')
            timezone_name = await self.page.evaluate('Intl.DateTimeFormat().resolvedOptions().timeZone')
            
            api_url = f"{self.api_base}/get-surveys.php"
            params = {
                'call': 'true',
                'output_method': 'jsscriptv1',
                'source': 'offers_page',
                'app_id': self.app_id,
                'ext_user_id': self.ext_user_id,
                'order_by': 'auto',
                'set_auto_web_view': 'true',
                'time_zone': timezone_offset,
                'time_name': timezone_name,
                'source_offer_page': 'pos11',
                'first_request': '1'
            }
            
            # Make API request to get surveys
            response = requests.get(api_url, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            if data.get('status') == 'success' and 'surveys' in data:
                surveys = data['surveys']
                print(f"📋 Found {len(surveys)} available surveys via API")
                return surveys
            else:
                print(f"⚠️ No surveys available or API error: {data}")
                return []
                
        except Exception as e:
            print(f"❌ Failed to get surveys from API: {e}")
            return []
    
    async def start_survey(self, survey_id: str) -> bool:
        """Start a specific survey by clicking on it"""
        try:
            print(f"🚀 Starting survey: {survey_id}")
            
            # Method 1: Try clicking the survey card directly
            survey_selector = f'#survey_card_{survey_id}'
            try:
                await self.page.click(survey_selector)
                await asyncio.sleep(random.uniform(2, 4))
                print(f"✅ Survey {survey_id} started via direct click")
                return True
            except Exception as click_e:
                print(f"⚠️ Direct click failed: {click_e}")
            
            # Method 2: Try calling the JavaScript function directly
            try:
                await self.page.evaluate(f"update_survey_details_clicked('{survey_id}')")
                await asyncio.sleep(random.uniform(3, 5))
                print(f"✅ Survey {survey_id} started via JavaScript")
                return True
            except Exception as js_e:
                print(f"⚠️ JavaScript call failed: {js_e}")
            
            # Method 3: Try finding and clicking the survey card with a different approach
            try:
                survey_card = self.page.locator(f'[onclick*="{survey_id}"]').first
                await survey_card.click()
                await asyncio.sleep(random.uniform(2, 4))
                print(f"✅ Survey {survey_id} started via onclick attribute")
                return True
            except Exception as attr_e:
                print(f"⚠️ Onclick attribute click failed: {attr_e}")
            
            print(f"❌ All methods failed to start survey {survey_id}")
            return False
            
        except Exception as e:
            print(f"❌ Failed to start survey {survey_id}: {e}")
            return False
    
    async def handle_cpx_question(self) -> bool:
        """Handle the current CPX question"""
        try:
            # Wait for question to load with more flexible timing
            await asyncio.sleep(2)
            
            # Special-case: Sawtooth/Sentient intro pages that use a custom div as Next button
            try:
                if await self.page.locator('#next_button, .navigation_button.graphical_next_button').count() > 0:
                    print("➡️ Detected Sawtooth/Sentient 'Next' control - advancing")
                    # Try native click first
                    btn = self.page.locator('#next_button, .navigation_button.graphical_next_button').first
                    try:
                        await btn.click()
                        await asyncio.sleep(1.5)
                    except Exception:
                        pass

                    # Trigger built-in JS submit if available
                    try:
                        submit_mode = await self.page.evaluate(
                            "() => { if (typeof SSI_SubmitMe === 'function') { SSI_SubmitMe(); return 'ssi'; }"
                            " else if (document.forms && document.forms.length) { document.forms[0].submit(); return 'form'; }"
                            " return 'none'; }"
                        )
                        print(f"🧠 Submit mode: {submit_mode}")
                    except Exception:
                        pass

                    # Give time for navigation or DOM change
                    try:
                        await self.page.wait_for_load_state('domcontentloaded', timeout=8000)
                    except Exception:
                        await asyncio.sleep(1.5)

            except Exception:
                # Non-fatal; continue with generic detection
                pass
            
            # Detect question type
            question_type = await self.detect_question_type()
            
            if question_type == 'unknown':
                print("⚠️ Unknown question type, might be loading or transition screen...")
                # Wait a bit more for content to load
                await asyncio.sleep(2)
                
                # Try to detect question type again after waiting
                question_type = await self.detect_question_type()
                if question_type != 'unknown':
                    print(f"✅ Question type detected after wait: {question_type}")
                else:
                    # Check for obvious completion indicators without full completion check
                    try:
                        if await self.page.locator('a#go_to_survey, button:has-text("Start the survey")').count() > 0:
                            print("🎯 Found 'Start the survey' button - router qualification successful!")
                            return True
                    except Exception:
                        pass
                    
                    print("⚠️ Still unknown question type, might be loading...")
                    return False
            
            # Get question text and info
            question_text = await self.get_question_text()
            info_text = await self.get_question_info()
            
            print(f"📝 Question: {question_text[:100]}...")
            print(f"   Info: {info_text}")
            print(f"   Type: {question_type}")
            
            # Handle different question types
            if question_type == 'single_punch':
                return await self.handle_single_choice_question(question_text, info_text)
            elif question_type == 'multi_punch':
                return await self.handle_multiple_choice_question(question_text, info_text)
            elif question_type == 'open_ended':
                return await self.handle_text_question(question_text, info_text)
            elif question_type == 'int_open_ended':
                return await self.handle_number_question(question_text, info_text)
            else:
                print(f"⚠️ Unsupported question type: {question_type}")
                return False
                
        except Exception as e:
            print(f"❌ Error handling CPX question: {e}")
            return False
    
    async def detect_question_type(self) -> str:
        """Detect the type of question currently displayed"""
        try:
            # Wait for question to appear with more flexible selectors
            question_selectors = [
                '#question_title',
                '.question-title',
                '[data-question]',
                '.survey-question',
                'h1:contains("Question")',
                'h2:contains("Question")',
                'h3:contains("Question")',
                'div:contains("Question")',
                'p:contains("Question")'
            ]
            
            question_found = False
            for selector in question_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        question_found = True
                        break
                except Exception:
                    continue
            
            if not question_found:
                # Check for any text that looks like a question
                page_text = await self.page.text_content('body')
                if any(term in page_text.lower() for term in ['question', 'select', 'choose', 'which', 'what', 'how', 'when', 'where']):
                    question_found = True
            
            if not question_found:
                print("⚠️ No question detected, might be loading or completed")
                # If a known Next control exists, treat as continue-only screen
                try:
                    if await self.page.locator('#next_button, .navigation_button.graphical_next_button').count() > 0:
                        return 'unknown'  # will be advanced by the special-case handler above
                except Exception:
                    pass
                return 'unknown'
            
            # Check for different question types
            if await self.page.locator('input[type="radio"]').count() > 0:
                return 'single_punch'
            elif await self.page.locator('input[type="checkbox"]').count() > 0:
                return 'multi_punch'
            elif await self.page.locator('input[type="text"]').count() > 0:
                return 'open_ended'
            elif await self.page.locator('input[type="number"]').count() > 0:
                return 'int_open_ended'
            else:
                # Fallback: check for any form elements
                if await self.page.locator('form').count() > 0:
                    # If only submit/next exists without inputs, mark unknown and advance via handler
                    return 'unknown'
                else:
                    return 'unknown'
                    
        except Exception as e:
            print(f"❌ Error detecting question type: {e}")
            return 'unknown'
    
    async def get_question_text(self) -> str:
        """Get the question text from various possible locations"""
        try:
            # Try multiple selectors for question text
            question_selectors = [
                '#question_title',
                '.question-title',
                '[data-question]',
                '.survey-question',
                'h1',
                'h2',
                'h3',
                '.question-text',
                '.survey-question-text'
            ]
            
            for selector in question_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        text = await self.page.locator(selector).first.text_content()
                        if text and len(text.strip()) > 10:  # Ensure it's substantial text
                            return text.strip()
                except Exception:
                    continue
            
            # Fallback: get any text that looks like a question
            page_text = await self.page.text_content('body')
            lines = page_text.split('\n')
            for line in lines:
                line = line.strip()
                if len(line) > 20 and any(term in line.lower() for term in ['question', 'select', 'choose', 'which', 'what', 'how', 'when', 'where']):
                    return line
            
            return "Question text not found"
            
        except Exception as e:
            print(f"⚠️ Error getting question text: {e}")
            return "Question text error"
    
    async def get_question_info(self) -> str:
        """Get additional question information"""
        try:
            # Look for info text near the question
            info_selectors = [
                '.question-info',
                '.survey-info',
                '.question-description',
                '.info-text',
                'p:contains("Info")',
                'span:contains("Info")'
            ]
            
            for selector in info_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        text = await self.page.locator(selector).first.text_content()
                        if text and len(text.strip()) > 0:
                            return text.strip()
                except Exception:
                    continue
            
            return "No additional info"
            
        except Exception as e:
            print(f"⚠️ Error getting question info: {e}")
            return "Info error"
    
    async def handle_single_choice_question(self, question: str, info: str) -> bool:
        """Handle single choice (radio button) questions"""
        try:
            # Get all radio button options
            radio_options = await self.page.locator('input[type="radio"]').all()
            
            if not radio_options:
                print("❌ No radio options found")
                return False
            
            # Get option texts
            options = []
            for i, radio in enumerate(radio_options):
                try:
                    label_id = await radio.get_attribute('id')
                    label_text = ""
                    
                    if label_id:
                        # Try to get text from associated label
                        label_element = self.page.locator(f'label[for="{label_id}"]')
                        if await label_element.count() > 0:
                            label_text = await label_element.text_content()
                    
                    # If no label text found, try to get from parent or nearby elements
                    if not label_text:
                        # Try getting text from parent div or nearby text
                        parent = radio.locator('..')
                        parent_text = await parent.text_content() if await parent.count() > 0 else ""
                        if parent_text:
                            label_text = parent_text.strip()
                    
                    if label_text:
                        options.append({
                            'index': i,
                            'text': label_text.strip(),
                            'element': radio,
                            'id': label_id
                        })
                        print(f"   Option {i}: {label_text.strip()[:50]}...")
                        
                except Exception as option_e:
                    print(f"⚠️ Error parsing radio option {i}: {option_e}")
                    continue
            
            if not options:
                print("❌ No option texts found")
                return False
            
            # Generate response using AI or personality system
            selected_option = await self.select_best_option(question, info, options, 'single')
            
            if selected_option is not None:
                # Click the label for the selected radio button (not the hidden input)
                try:
                    radio_element = selected_option['element']
                    radio_id = await radio_element.get_attribute('id')
                    
                    if radio_id:
                        # Click the label associated with this radio button
                        label_selector = f'label[for="{radio_id}"]'
                        await self.page.click(label_selector)
                        print(f"✅ Clicked radio label for option: {selected_option['text'][:50]}...")
                    else:
                        # Fallback: try clicking the radio input directly
                        await radio_element.click()
                        print(f"✅ Clicked radio input directly")
                    
                    await asyncio.sleep(random.uniform(1, 2))
                    
                    # Submit the form
                    return await self.submit_question_form()
                    
                except Exception as click_e:
                    print(f"❌ Failed to click radio option: {click_e}")
                    return False
            
            return False
            
        except Exception as e:
            print(f"❌ Error handling single choice question: {e}")
            return False
    
    async def handle_multiple_choice_question(self, question: str, info: str) -> bool:
        """Handle multiple choice (checkbox) questions"""
        try:
            # Get all checkbox options
            checkbox_options = await self.page.locator('input[type="checkbox"]').all()
            
            if not checkbox_options:
                print("❌ No checkbox options found")
                return False
            
            # Check if this is a router question (many options) - use fast mode
            is_router_question = len(checkbox_options) > 20
            max_options_to_parse = 10 if is_router_question else len(checkbox_options)
            
            if is_router_question:
                print(f"🚀 Router question detected ({len(checkbox_options)} options) - using fast mode (parsing {max_options_to_parse})")
            
            # Get option texts (limited for router questions)
            options = []
            for i, checkbox in enumerate(checkbox_options[:max_options_to_parse]):
                try:
                    label_id = await checkbox.get_attribute('id')
                    label_text = ""
                    
                    if label_id:
                        # Try to get text from associated label
                        label_element = self.page.locator(f'label[for="{label_id}"]')
                        if await label_element.count() > 0:
                            label_text = await label_element.text_content()
                    
                    # If no label text found, try to get from parent or nearby elements
                    if not label_text:
                        # Try getting text from parent div or nearby text
                        parent = checkbox.locator('..')
                        parent_text = await parent.text_content() if await parent.count() > 0 else ""
                        if parent_text:
                            label_text = parent_text.strip()
                    
                    if label_text:
                        options.append({
                            'index': i,
                            'text': label_text.strip(),
                            'element': checkbox,
                            'id': label_id
                        })
                        print(f"   Option {i}: {label_text.strip()[:50]}...")
                        
                except Exception as option_e:
                    print(f"⚠️ Error parsing checkbox option {i}: {option_e}")
                    continue
            
            if not options:
                print("❌ No option texts found")
                return False
            
            # Generate response using AI - select multiple options
            # For router questions, use fast selection to avoid delays
            if is_router_question:
                # Fast selection for router questions - pick first few reasonable options
                selected_options = []
                for option in options[:3]:  # Pick first 3 options
                    if 'prefer not' not in option['text'].lower() and 'cant' not in option['text'].lower() and 'dont want' not in option['text'].lower():
                        selected_options.append(option)
                        if len(selected_options) >= 2:  # Max 2 selections for router
                            break
                print(f"🚀 Fast router selection: {len(selected_options)} options")
            else:
                # Full AI analysis for regular survey questions
            selected_options = await self.select_best_option(question, info, options, 'multiple')
            
            if selected_options:
                # Click selected checkboxes (use labels, not hidden inputs)
                try:
                    if isinstance(selected_options, list):
                        for option in selected_options:
                            checkbox_id = option.get('id')
                            
                            if checkbox_id:
                                # Click the label associated with this checkbox
                                label_selector = f'label[for="{checkbox_id}"]'
                                await self.page.click(label_selector)
                                print(f"✅ Clicked checkbox label for: {option['text'][:30]}...")
                            else:
                                # Fallback: try clicking the checkbox directly
                                await option['element'].click()
                                print(f"✅ Clicked checkbox input directly")
                            
                            await asyncio.sleep(random.uniform(0.5, 1))
                    else:
                        # Single selection fallback
                        checkbox_id = selected_options.get('id')
                        
                        if checkbox_id:
                            label_selector = f'label[for="{checkbox_id}"]'
                            await self.page.click(label_selector)
                            print(f"✅ Clicked checkbox label for: {selected_options['text'][:30]}...")
                        else:
                            await selected_options['element'].click()
                            print(f"✅ Clicked checkbox input directly")
                        
                        await asyncio.sleep(random.uniform(1, 2))
                    
                    # Submit the form
                    return await self.submit_question_form()
                    
                except Exception as click_e:
                    print(f"❌ Failed to click checkbox options: {click_e}")
                    return False
            
            return False
            
        except Exception as e:
            print(f"❌ Error handling multiple choice question: {e}")
            return False
    
    async def handle_text_question(self, question: str, info: str) -> bool:
        """Handle open-ended text questions"""
        try:
            # Find visible text input or textarea in the main form
            text_input = None
            
            # First, try to find visible input fields in the survey form
            form_inputs = await self.page.locator('form input[type="text"], form textarea').all()
            
            # Filter for visible inputs
            for input_elem in form_inputs:
                try:
                    is_visible = await input_elem.is_visible()
                    if is_visible:
                        text_input = input_elem
                        input_name = await input_elem.get_attribute('name') or 'unknown'
                        input_placeholder = await input_elem.get_attribute('placeholder') or 'no placeholder'
                        print(f"✅ Found visible text input: name='{input_name}', placeholder='{input_placeholder}'")
                        break
                except Exception:
                    continue
            
            # If no form inputs found, try any visible text input
            if not text_input:
                all_text_inputs = await self.page.locator('input[type="text"], textarea').all()
                for input_elem in all_text_inputs:
                    try:
                        is_visible = await input_elem.is_visible()
                        is_enabled = await input_elem.is_enabled()
                        if is_visible and is_enabled:
                            # Skip modal or hidden inputs (like the report modal)
                            input_id = await input_elem.get_attribute('id') or ''
                            if 'modal' not in input_id.lower() and 'report' not in input_id.lower():
                                text_input = input_elem
                                print(f"✅ Found visible text input with id: {input_id}")
                                break
                    except Exception:
                        continue
            
            if not text_input:
                print("❌ No visible text input found")
                
                # Debug: List all text inputs on the page
                print("🔍 Debug - All text inputs on page:")
                all_inputs = await self.page.locator('input, textarea').all()
                for i, inp in enumerate(all_inputs):
                    try:
                        tag_name = await inp.evaluate('el => el.tagName')
                        input_type = await inp.get_attribute('type') or 'text'
                        input_id = await inp.get_attribute('id') or 'no-id'
                        input_name = await inp.get_attribute('name') or 'no-name'
                        input_placeholder = await inp.get_attribute('placeholder') or 'no-placeholder'
                        is_visible = await inp.is_visible()
                        is_enabled = await inp.is_enabled()
                        
                        print(f"   {i}: {tag_name.lower()}[type={input_type}] id='{input_id}' name='{input_name}' placeholder='{input_placeholder}' visible={is_visible} enabled={is_enabled}")
                    except Exception as debug_e:
                        print(f"   {i}: Error getting input info: {debug_e}")
                
                return False
            
            # Generate response
            response_text = await self.generate_text_response(question, info)
            
            if response_text:
                print(f"💬 Generated response: {response_text[:100]}...")
                
                # Type the response naturally if typing simulation available
                if ENHANCED_FEATURES_AVAILABLE:
                    try:
                        success = await type_text_naturally(
                            response_text,
                            text_input,
                            use_pyautogui=False,
                            config=TYPING_PRESETS.get('careful_typer', {})
                        )
                        if not success:
                            await text_input.fill(response_text)
                    except Exception as e:
                        print(f"⚠️ Typing simulation failed: {e}, using fallback")
                        await text_input.fill(response_text)
                else:
                    await text_input.fill(response_text)
                
                await asyncio.sleep(random.uniform(1, 3))
                
                # Submit the form
                return await self.submit_question_form()
            
            return False
            
        except Exception as e:
            print(f"❌ Error handling text question: {e}")
            return False
    
    async def handle_number_question(self, question: str, info: str) -> bool:
        """Handle number input questions"""
        try:
            # Find number input
            number_input = await self.page.locator('input[type="number"]').first
            
            if not number_input:
                print("❌ No number input found")
                return False
            
            # Generate numeric response
            number_response = await self.generate_number_response(question, info)
            
            if number_response is not None:
                print(f"🔢 Generated number: {number_response}")
                
                await number_input.fill(str(number_response))
                await asyncio.sleep(random.uniform(1, 2))
                
                # Submit the form
                return await self.submit_question_form()
            
            return False
            
        except Exception as e:
            print(f"❌ Error handling number question: {e}")
            return False
    
    async def select_best_option(self, question: str, info: str, options: List[Dict], selection_type: str) -> Any:
        """Select the best option(s) using AI or personality system"""
        try:
            options_text = "\n".join([f"{i}: {opt['text']}" for i, opt in enumerate(options)])
            print(f"🤔 Selecting from {len(options)} options for: {question[:50]}...")
            
            # Smart selection for common demographic questions
            question_lower = question.lower()
            
            # Handle Hispanic/Latino origin questions using persona
            if 'hispanic' in question_lower or 'latino' in question_lower or 'spanish origin' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    hispanic_origin = self.persona['about_you'].get('hispanic_origin', 'No').lower()
                    if 'yes' in hispanic_origin or 'hispanic' in hispanic_origin:
                        # Look for yes options
                        for option in options:
                            option_text = option['text'].lower()
                            if 'yes' in option_text and ('mexican' in option_text or 'hispanic' in option_text):
                                print(f"🎯 Selected Hispanic origin based on persona: {option['text']}")
                                return option
                    else:
                        # Look for no option
                        for option in options:
                            option_text = option['text'].lower()
                            if 'no' in option_text and 'not of hispanic' in option_text:
                                print(f"🎯 Selected non-Hispanic based on persona: {option['text']}")
                                return option
            
            # Handle race/ethnicity questions using persona
            if 'race' in question_lower or ('ethnicity' in question_lower and 'hispanic' not in question_lower):
                if self.persona and 'about_you' in self.persona:
                    ethnicity = self.persona['about_you'].get('ethnicity', 'White').lower()
                    for option in options:
                        option_text = option['text'].lower()
                        if ethnicity in option_text or ('white' in option_text and 'caucasian' in ethnicity):
                            print(f"🎯 Selected race/ethnicity based on persona: {option['text']}")
                            return option
            
            # Handle income questions using persona - check both personal and household income
            if 'income' in question_lower or 'salary' in question_lower:
                if self.persona:
                    # Try personal income first, then household income
                    personal_income = None
                    household_income = None
                    
                    if 'work' in self.persona:
                        personal_income = self.persona['work'].get('personal_income_before_taxes', '')
                    
                    if 'home' in self.persona:
                        household_income = self.persona['home'].get('household_income', '')
                    
                    # Use personal income if available, otherwise household
                    income_range = personal_income or household_income or '$60,000-$64,999'
                    
                    # Parse income range to find midpoint
                    if '-' in income_range:
                        try:
                            # Extract numbers from income range (remove $ and commas)
                            import re
                            numbers = re.findall(r'[\d,]+', income_range)
                            if len(numbers) >= 2:
                                low = int(numbers[0].replace(',', ''))
                                high = int(numbers[1].replace(',', ''))
                                midpoint = (low + high) / 2
                                
                                # Find the option that best matches this income
                                best_option = None
                                best_distance = float('inf')
                                
                                for option in options:
                                    option_text = option['text']
                                    # Extract income range from option text
                                    income_match = re.search(r'\$?([\d,]+)(?:\s*to\s*\$?([\d,]+))?', option_text)
                                    if income_match:
                                        opt_low = int(income_match.group(1).replace(',', ''))
                                        opt_high = int(income_match.group(2).replace(',', '')) if income_match.group(2) else opt_low
                                        opt_midpoint = (opt_low + opt_high) / 2
                                        distance = abs(midpoint - opt_midpoint)
                                        
                                        if distance < best_distance:
                                            best_distance = distance
                                            best_option = option
                                
                                if best_option:
                                    print(f"🎯 Selected income based on persona ({income_range}): {best_option['text']}")
                                    return best_option
                        except Exception as e:
                            print(f"⚠️ Error parsing income: {e}")
            
            # Handle device questions - prefer laptop/desktop for tech professionals
            if 'device' in question_lower and 'using' in question_lower:
                if self.persona and 'work' in self.persona:
                    job_title = self.persona['work'].get('job_title', '').lower()
                    if 'marketing' in job_title or 'manager' in job_title:
                        # Prefer laptop for marketing professionals
                        for option in options:
                            option_text = option['text'].lower()
                            if 'laptop' in option_text:
                                print(f"🎯 Selected device based on persona (marketing professional): {option['text']}")
                                return option
                            elif 'desktop' in option_text:
                                print(f"🎯 Selected device based on persona (marketing professional): {option['text']}")
                                return option
            
            # Handle business title/role questions using persona
            if 'business title' in question_lower or 'role' in question_lower or 'position' in question_lower:
                if self.persona and 'work' in self.persona:
                    job_title = self.persona['work'].get('job_title', '').lower()
                    company_industry = self.persona['work'].get('company_industry', '').lower()
                    
                    for option in options:
                        option_text = option['text'].lower()
                        # Match marketing manager to relevant roles
                        if 'marketing' in job_title:
                            if any(term in option_text for term in ['marketing', 'advertising', 'brand', 'communications', 'digital']):
                                print(f"🎯 Selected role based on persona (marketing): {option['text']}")
                                return option
                        # Generic job title matching
                        elif job_title in option_text:
                            print(f"🎯 Selected role based on persona: {option['text']}")
                            return option
                    
                    # If no direct match, select "None of the above" if available
                    for option in options:
                        option_text = option['text'].lower()
                        if 'none of the above' in option_text:
                            print(f"🎯 Selected 'None of the above' for unmatched role")
                            return option
            
            # Handle industry questions using persona
            if 'industry' in question_lower and 'work' in question_lower:
                if self.persona and 'work' in self.persona:
                    company_industry = self.persona['work'].get('company_industry', '').lower()
                    for option in options:
                        option_text = option['text'].lower()
                        if company_industry in option_text or 'marketing' in option_text:
                            print(f"🎯 Selected industry based on persona: {option['text']}")
                            return option
            
            # Handle state/location questions using persona
            if 'state' in question_lower and 'live' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    state = self.persona['about_you'].get('state', 'Colorado').lower()
                    for option in options:
                        option_text = option['text'].lower()
                        if state in option_text:
                            print(f"🎯 Selected state based on persona: {option['text']}")
                            return option
            
            # Handle marital status questions using persona
            if 'marital' in question_lower or 'married' in question_lower:
                if self.persona and 'home' in self.persona:
                    marital_status = self.persona['home'].get('marital_status', 'Married').lower()
                    for option in options:
                        option_text = option['text'].lower()
                        if marital_status in option_text:
                            print(f"🎯 Selected marital status based on persona: {option['text']}")
                            return option
            
            # Handle children questions using persona
            if 'children' in question_lower or 'child' in question_lower:
                if self.persona and 'home' in self.persona:
                    has_children = self.persona['home'].get('children', 0)
                    if has_children > 0:
                        # Look for options indicating having children
                        for option in options:
                            option_text = option['text'].lower()
                            if any(term in option_text for term in ['yes', 'have', 'children', 'kids']):
                                print(f"🎯 Selected children option based on persona: {option['text']}")
                                return option
                    else:
                        # Look for options indicating no children
                        for option in options:
                            option_text = option['text'].lower()
                            if any(term in option_text for term in ['no', 'none', 'no children']):
                                print(f"🎯 Selected no children option based on persona: {option['text']}")
                                return option
            
            # Handle political affiliation questions using persona
            if 'political' in question_lower or 'party' in question_lower:
                if self.persona and 'other_demographics' in self.persona:
                    political_affiliation = self.persona['other_demographics'].get('political_affiliation', 'Independent').lower()
                    for option in options:
                        option_text = option['text'].lower()
                        if political_affiliation in option_text:
                            print(f"🎯 Selected political affiliation based on persona: {option['text']}")
                            return option
            
            # Handle technology questions using persona
            if 'computer' in question_lower or 'operating system' in question_lower:
                if self.persona and 'technology' in self.persona:
                    # Check if they use Apple products
                    smartphone_brand = self.persona['technology'].get('smartphone_brand', '').lower()
                    if 'apple' in smartphone_brand:
                        # Prefer macOS/Apple options
                        for option in options:
                            option_text = option['text'].lower()
                            if 'mac' in option_text or 'apple' in option_text:
                                print(f"🎯 Selected OS based on persona (Apple user): {option['text']}")
                                return option
                    else:
                        # Prefer Windows for non-Apple users
                        for option in options:
                            option_text = option['text'].lower()
                            if 'windows' in option_text:
                                print(f"🎯 Selected OS based on persona (Windows user): {option['text']}")
                                return option
            
            # Handle webcam questions (always say yes to proceed)
            if 'webcam' in question_lower:
                for i, option in enumerate(options):
                    option_text = option['text'].lower()
                    if 'yes' in option_text or 'willing' in option_text:
                        print(f"🎯 Selected webcam option: {option['text']}")
                        return option
                # Fallback to first option
                return options[0] if options else None
            
            # Handle pet questions (select 1-2 common pets)
            if 'pet' in question_lower and selection_type == 'multiple':
                if self.persona and 'home' in self.persona:
                    pets = self.persona['home'].get('pets_in_household', [])
                    if pets:
                        # Use persona pets
                        selected = []
                        for option in options:
                            option_text = option['text'].lower()
                            for pet in pets:
                                if pet.lower() in option_text and len(selected) < 2:
                                    selected.append(option)
                                    print(f"🎯 Selected pet option based on persona: {option['text']}")
                                    break
                        if selected:
                            return selected
                    else:
                        # Default pet selection
                        pet_preferences = ['dog', 'cat', 'none', 'no pets']
                        selected = []
                        for option in options:
                            option_text = option['text'].lower()
                            if any(pet in option_text for pet in pet_preferences) and len(selected) < 2:
                                selected.append(option)
                                print(f"🎯 Selected pet option: {option['text']}")
                        if selected:
                            return selected
            
            # Handle gaming questions using persona
            if 'gaming' in question_lower or 'video games' in question_lower:
                if self.persona and 'gaming' in self.persona:
                    plays_games = self.persona['gaming'].get('plays_video_games', 'No').lower()
                    if 'yes' in plays_games:
                        # Look for yes options
                        for option in options:
                            option_text = option['text'].lower()
                            if 'yes' in option_text or 'play' in option_text:
                                print(f"🎯 Selected gaming option based on persona: {option['text']}")
                                return option
                    else:
                        # Look for no options
                        for option in options:
                            option_text = option['text'].lower()
                            if 'no' in option_text or 'not' in option_text:
                                print(f"🎯 Selected no gaming option based on persona: {option['text']}")
                                return option
            
            # Handle exercise/fitness questions using persona
            if 'exercise' in question_lower or 'fitness' in question_lower or 'workout' in question_lower:
                if self.persona and 'leisure' in self.persona:
                    exercise_hours = self.persona['leisure'].get('weekly_exercise_hours', '0')
                    try:
                        hours = int(exercise_hours.split('-')[0]) if '-' in exercise_hours else int(exercise_hours)
                        if hours > 0:
                            # Look for active options
                            for option in options:
                                option_text = option['text'].lower()
                                if any(term in option_text for term in ['yes', 'active', 'regular', 'often']):
                                    print(f"🎯 Selected exercise option based on persona: {option['text']}")
                                    return option
                        else:
                            # Look for inactive options
                            for option in options:
                                option_text = option['text'].lower()
                                if any(term in option_text for term in ['no', 'rarely', 'never', 'inactive']):
                                    print(f"🎯 Selected no exercise option based on persona: {option['text']}")
                                    return option
                    except:
                        pass
            
            # Handle shopping preferences using persona
            if 'shopping' in question_lower or 'purchase' in question_lower:
                if self.persona and 'survey_behavior' in self.persona:
                    preferred_method = self.persona['survey_behavior'].get('preferred_shopping_method', 'Online').lower()
                    for option in options:
                        option_text = option['text'].lower()
                        if preferred_method in option_text:
                            print(f"🎯 Selected shopping method based on persona: {option['text']}")
                            return option
            
            # Handle data privacy questions using persona
            if 'privacy' in question_lower or 'data' in question_lower:
                if self.persona and 'survey_behavior' in self.persona:
                    privacy_concern = self.persona['survey_behavior'].get('data_privacy_concern', 'High concern').lower()
                    if 'high' in privacy_concern:
                        # Look for privacy-conscious options
                        for option in options:
                            option_text = option['text'].lower()
                            if any(term in option_text for term in ['very concerned', 'high concern', 'important', 'careful']):
                                print(f"🎯 Selected privacy option based on persona: {option['text']}")
                                return option
            
            if self.personality_system and Config.USE_VISION:
                # Use enhanced personality system
                context = f"Question: {question}\nInfo: {info}\nOptions:\n{options_text}"
                
                if selection_type == 'multiple':
                    prompt = f"{context}\n\nSelect 1-3 options that best fit the persona. Return only the option numbers separated by commas (e.g., '0,2,4')."
                else:
                    prompt = f"{context}\n\nSelect the single best option that fits the persona. Return only the option number (e.g., '2')."
                
                response = await self.personality_system.generate_enhanced_response(
                    prompt,
                    context=context,
                    mode="natural_conversation"
                )
                
                # Parse the response to get option indices
                numbers = re.findall(r'\d+', response)
                if numbers:
                    if selection_type == 'multiple':
                        selected_indices = [int(n) for n in numbers if int(n) < len(options)]
                        return [options[i] for i in selected_indices[:3]]  # Max 3 selections
                    else:
                        selected_index = int(numbers[0])
                        if selected_index < len(options):
                            return options[selected_index]
            
            # Fallback to simple selection (avoid refusal options)
            non_refusal_options = [opt for opt in options if 'prefer not' not in opt['text'].lower() and 'cant' not in opt['text'].lower() and 'dont want' not in opt['text'].lower()]
            
            if selection_type == 'multiple':
                # Select 1-2 random options for multiple choice
                available_options = non_refusal_options if non_refusal_options else options
                num_selections = random.randint(1, min(2, len(available_options)))
                selected_indices = random.sample(range(len(available_options)), num_selections)
                selected = [available_options[i] for i in selected_indices]
                print(f"🎲 Selected {len(selected)} random options")
                return selected
            else:
                # Select random option for single choice (prefer non-refusal)
                available_options = non_refusal_options if non_refusal_options else options
                selected = random.choice(available_options)
                print(f"🎲 Selected random option: {selected['text']}")
                return selected
                
        except Exception as e:
            print(f"❌ Error selecting option: {e}")
            return None
    
    async def generate_text_response(self, question: str, info: str) -> Optional[str]:
        """Generate text response for open-ended questions"""
        try:
            # Check for specific question types
            question_lower = question.lower()
            
            # Handle zip code questions with persona data
            if 'zip' in question_lower and 'code' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    zipcode = self.persona['about_you'].get('zipcode', '90210')
                    print(f"🏠 Using persona zip code: {zipcode}")
                    return zipcode
                else:
                    return "90210"  # Default zip code
            
            # Handle city questions
            if 'city' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    city = self.persona['about_you'].get('city', 'Los Angeles')
                    print(f"🏙️ Using persona city: {city}")
                    return city
                else:
                    return "Los Angeles"
            
            # Handle state questions
            if 'state' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    state = self.persona['about_you'].get('state', 'California')
                    print(f"🗺️ Using persona state: {state}")
                    return state
                else:
                    return "California"
            
            # Handle "best experience" questions specially
            if 'best' in question_lower and ('experience' in question_lower or 'life' in question_lower):
                responses = self.cpx_config.get('personality_responses', {}).get('best_experience_responses', [])
                if responses:
                    return random.choice(responses)
            
            if self.personality_system and Config.USE_VISION:
                # Use enhanced personality system
                context = f"Survey question: {question}\nAdditional info: {info}"
                response = await self.personality_system.generate_enhanced_response(
                    question,
                    context=context,
                    mode="natural_conversation"
                )
                return response
            else:
                # Use basic personality response or config defaults
                default_responses = self.cpx_config.get('personality_responses', {}).get('default_text_responses', [])
                if default_responses:
                    return random.choice(default_responses)
                else:
                    return generate_personality_response(question, context=info)
                
        except Exception as e:
            print(f"❌ Error generating text response: {e}")
            # Fallback response
            return "I think this is interesting and I wanted to share my opinion on this topic."
    
    async def generate_number_response(self, question: str, info: str) -> Optional[int]:
        """Generate numeric response for number questions"""
        try:
            # Extract any numbers from the question for context
            numbers_in_question = re.findall(r'\d+', question + " " + info)
            
            # Common number question patterns
            if any(word in question.lower() for word in ['age', 'years old', 'how old']):
                return random.randint(18, 65)
            elif any(word in question.lower() for word in ['income', 'salary', 'earn', 'make']):
                return random.randint(30000, 80000)
            elif any(word in question.lower() for word in ['hours', 'time', 'minutes']):
                return random.randint(1, 40)
            elif any(word in question.lower() for word in ['people', 'family', 'household']):
                return random.randint(1, 6)
            else:
                # Generic number response
                if numbers_in_question:
                    # Use a number from the question as reference
                    base_num = int(numbers_in_question[0])
                    return random.randint(max(1, base_num - 10), base_num + 10)
                else:
                    return random.randint(1, 100)
                    
        except Exception as e:
            print(f"❌ Error generating number response: {e}")
            return random.randint(1, 10)
    
    async def submit_question_form(self) -> bool:
        """Submit the current question form"""
        try:
            # Look for submit button
            submit_selectors = [
                '#submitquestion1',
                'button[type="submit"]',
                'input[type="submit"]',
                'button:has-text("Next")',
                'button:has-text("Submit")',
                '.btn.btn-blue'
            ]
            
            for selector in submit_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        await self.page.click(selector)
                        print("✅ Question submitted")
                        await asyncio.sleep(random.uniform(2, 4))
                        self.session_stats['questions_answered'] += 1
                        return True
                except Exception:
                    continue
            
            print("❌ No submit button found")
            return False
            
        except Exception as e:
            print(f"❌ Error submitting question: {e}")
            return False
    
    async def check_survey_completion(self) -> Dict[str, Any]:
        """Check if survey is completed or if there's a next question"""
        try:
            await asyncio.sleep(2)  # Wait for page to update
            
            # Check for CPX-specific completion indicators
            completion_indicators = [
                '.message-box.success',
                '#gotosurvey',
                'a#go_to_survey',
                '.success-message',
                '.completion-message',
                'text="Congratulations, you can join this survey"',
                'text="Start the survey"',
                'button:has-text("Start the survey")'
            ]
            
            for indicator in completion_indicators:
                try:
                    if await self.page.locator(indicator).count() > 0:
                        # Survey completed successfully
                        try:
                            # Try to get earnings info
                            earnings_text = await self.page.text_content('.color-green')
                            if earnings_text and '$' in earnings_text:
                                earnings_match = re.search(r'\+(\d+\.?\d*)', earnings_text)
                                if earnings_match:
                                    earnings = float(earnings_match.group(1))
                                    self.session_stats['earnings'] += earnings
                                    print(f"💰 Earned: ${earnings}")
                        except Exception:
                            pass
                        
                        self.session_stats['surveys_completed'] += 1
                        return {'status': 'completed', 'earnings': earnings if 'earnings' in locals() else 0}
                except Exception:
                    continue
            
            # Check for error/not qualified messages - CPX specific patterns
            error_indicators = [
                '.message-box.warning',
                '.message-box.danger',
                '.error-message',
                '.qualification-error',
                '.not-qualified'
            ]
            
            for indicator in error_indicators:
                if await self.page.locator(indicator).count() > 0:
                    error_text = await self.page.text_content(indicator)
                    print(f"⚠️ Survey error: {error_text[:100]}...")
                    
                    # Check if this is a router qualification failure
                    if any(term in error_text.lower() for term in ['not qualify', 'different target', 'not eligible', 'screener']):
                        return {'status': 'router_not_qualified', 'reason': error_text}
                    else:
                        return {'status': 'not_qualified', 'reason': error_text}
            
            # Check for router-specific completion patterns
            router_completion_indicators = [
                'text="Thank you for your time"',
                'text="You do not qualify"',
                'text="Not eligible"',
                'text="Screener completed"',
                'text="Congratulations, you can join this survey"',
                'button:has-text("Start the survey")',
                'a:has-text("Start the survey")'
            ]
            
            for indicator in router_completion_indicators:
                try:
                    if await self.page.locator(indicator).count() > 0:
                        router_text = await self.page.text_content(indicator)
                        print(f"🔄 Router qualification completed: {router_text[:100]}...")
                        return {'status': 'router_completed', 'reason': router_text}
                except Exception:
                    continue
            
            # Check if there's another question with more flexible selectors
            question_selectors = [
                '#question_title',
                '.question-title',
                '[data-question]',
                '.survey-question',
                'h1:contains("Question")',
                'h2:contains("Question")',
                'h3:contains("Question")'
            ]
            
            for selector in question_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        return {'status': 'continue'}
                except Exception:
                    continue
            
            # Check if we're back to survey list (router completed)
            if await self.page.locator('#survey-list').count() > 0:
                print("🔄 Router completed, returned to survey list")
                return {'status': 'router_completed'}
            
            # Check for CPX-specific completion patterns
            if await self.page.locator('.router-complete').count() > 0:
                print("🔄 Router qualification completed")
                return {'status': 'router_completed'}
            
            # Check for "Continue" or "Next" buttons that might indicate router progression
            continue_buttons = await self.page.locator('button:has-text("Continue"), button:has-text("Next"), input[value*="Continue"], input[value*="Next"]').count()
            if continue_buttons > 0:
                return {'status': 'continue'}
            
            # Check for the specific CPX "Start the survey" button
            start_survey_buttons = await self.page.locator('button:has-text("Start the survey"), a:has-text("Start the survey")').count()
            if start_survey_buttons > 0:
                print("🎯 Found 'Start the survey' button - router qualification successful!")
                return {'status': 'router_completed', 'reason': 'Start survey button found'}
            
            return {'status': 'unknown'}
            
        except Exception as e:
            print(f"❌ Error checking survey completion: {e}")
            return {'status': 'error', 'reason': str(e)}
    
    async def handle_router_qualification(self) -> bool:
        """Handle CPX survey router qualification questions"""
        try:
            print("🔄 Handling survey router qualification...")
            
            # Router questions are typically demographic screeners
            # Use the enhanced persona system to answer consistently
            
            max_router_questions = 20  # Router questions are usually shorter
            questions_answered = 0
            
            while questions_answered < max_router_questions:
                # Handle current router question first
                question_result = await self.handle_cpx_question()
                
                if not question_result:
                    print("❌ Failed to handle router question")
                    # Only check completion if we can't handle the question
                status = await self.check_survey_completion()
                if status['status'] == 'router_completed':
                    print("✅ Router qualification completed successfully")
                    return True
                elif status['status'] == 'router_not_qualified':
                    print("❌ Router qualification failed")
                    return False
                    break
                
                questions_answered += 1
                print(f"🔄 Router question {questions_answered} answered")
                
                # Wait for page update
                await asyncio.sleep(2)
                
                # Only check for completion after a few questions or if we suspect it's done
                if questions_answered >= 3 or questions_answered % 5 == 0:
                    try:
                        # Quick check for obvious completion indicators
                        if await self.page.locator('a#go_to_survey, button:has-text("Start the survey")').count() > 0:
                            print("🎯 Found 'Start the survey' button - router qualification successful!")
                            return True
                    except Exception:
                        pass
            
            print(f"⚠️ Router stopped after {questions_answered} questions")
            return False
            
        except Exception as e:
            print(f"❌ Error handling router qualification: {e}")
            return False
    
    async def handle_actual_survey(self) -> Dict[str, Any]:
        """Handle the actual survey after router qualification"""
        try:
            print("🎯 Handling actual survey questions...")
            
            # Wait for survey to be fully ready (not just loading screen)
            print("⏳ Ensuring survey is fully loaded...")
            try:
                # Wait for loading elements to disappear or survey content to appear
                await self.page.wait_for_function(
                    "() => { return !document.querySelector('[aria-label=\"loader\"]') || document.querySelector('form') || document.querySelector('input') || document.querySelector('button') }",
                    timeout=15000
                )
                print("✅ Survey content appears ready")
            except Exception as wait_err:
                print(f"⚠️ Survey readiness check timed out: {wait_err}")
                # Continue anyway, might be ready
            
            # Additional wait for dynamic content
            await asyncio.sleep(2)
            
            max_questions = 50  # Actual surveys can have many questions
            questions_answered = 0
            
            while questions_answered < max_questions:
                # Check if survey is complete
                status = await self.check_survey_completion()
                if status['status'] == 'completed':
                    print("✅ Survey completed successfully")
                    return status
                elif status['status'] in ['not_qualified', 'router_not_qualified']:
                    print(f"❌ Survey failed: {status.get('reason', 'Unknown')}")
                    return status
                
                # Handle current survey question
                if not await self.handle_cpx_question():
                    print("❌ Failed to handle survey question")
                    break
                
                questions_answered += 1
                print(f"🎯 Survey question {questions_answered} answered")
                
                # Wait for page update
                await asyncio.sleep(2)
            
            print(f"⚠️ Survey stopped after {questions_answered} questions")
            return {'status': 'incomplete', 'questions_answered': questions_answered}
            
        except Exception as e:
            print(f"❌ Error handling actual survey: {e}")
            return {'status': 'error', 'reason': str(e)}
    
    async def complete_single_survey(self, survey_id: str) -> Dict[str, Any]:
        """Complete a single survey from start to finish"""
        try:
            print(f"\n🎯 Starting survey completion: {survey_id}")
            self.session_stats['surveys_started'] += 1
            
            # Start the survey
            if not await self.start_survey(survey_id):
                return {'status': 'failed', 'reason': 'Could not start survey'}
            
            # Check if this is a router qualification survey
            page_content = await self.page.content()
            is_router = any(term in page_content.lower() for term in [
                'qualification', 'screener', 'demographic', 'pre-survey', 'router'
            ])
            
            if is_router:
                print("🔄 Detected survey router - handling qualification...")
                router_success = await self.handle_router_qualification()
                if router_success:
                    # Check if router led to an actual survey
                    await asyncio.sleep(3)  # Wait for page to load
                    
                    # Look for the "Start the survey" button - this is the key fix
                    start_button_selectors = [
                        'a#go_to_survey',  # This is the main CPX button
                        'button:has-text("Start the survey")',
                        'a:has-text("Start the survey")',
                        '[href*="spectrumsurveys.com"]',
                        '.btn-green',
                        '.btn-success',
                        'a[href*="survey"]',
                        'a[href*="start"]'
                    ]
                    
                    start_button = None
                    for selector in start_button_selectors:
                        try:
                            start_button = self.page.locator(selector)
                    if await start_button.count() > 0:
                                print(f"🎯 Found start button with selector: {selector}")
                                break
                        except Exception:
                            continue
                    
                    if start_button and await start_button.count() > 0:
                        print("🎯 Router completed, found 'Start the survey' button - proceeding to actual survey")
                        try:
                            # Debug: Print button details
                            button_text = await start_button.text_content()
                            button_tag = await start_button.evaluate('el => el.tagName')
                            button_id = await start_button.get_attribute('id')
                            button_class = await start_button.get_attribute('class')
                            button_href = await start_button.get_attribute('href')
                            button_target = await start_button.get_attribute('target')
                            
                            print(f"🔍 Button details:")
                            print(f"   Tag: {button_tag}")
                            print(f"   ID: {button_id}")
                            print(f"   Class: {button_class}")
                            print(f"   Text: {button_text}")
                            print(f"   Href: {button_href}")
                            print(f"   Target: {button_target}")
                            
                            new_page = None
                            
                            # Case 1: Anchor with target opens a new tab. Prefer true user-click and capture the new page.
                            if button_target and button_target.lower() == '_blank':
                                print("🪟 Expecting a new tab due to target=_blank ...")
                                try:
                                    async with self.context.expect_page() as new_page_info:
                            await start_button.click()
                                    new_page = await new_page_info.value
                                    await new_page.wait_for_load_state('domcontentloaded')
                                    print(f"✅ New tab opened: {new_page.url}")
                                except Exception as popup_err:
                                    print(f"⚠️ New tab capture failed: {popup_err}")
                            
                            # Case 2: If no new page captured, try direct navigation
                            if not new_page:
                                if button_href:
                                    print(f"🔗 Navigating directly to survey link: {button_href}")
                                    await self.page.goto(button_href, wait_until='domcontentloaded')
                                else:
                                    print("🖱️ Clicking start button (same tab)...")
                                    try:
                                        await start_button.click()
                                    except Exception as click_error:
                                        print(f"⚠️ Normal click failed: {click_error}, trying JavaScript click...")
                                        try:
                                            # Try JavaScript click as fallback
                                            await self.page.evaluate('(element) => element.click()', start_button)
                                            print("✅ JavaScript click successful")
                                        except Exception as js_error:
                                            print(f"❌ JavaScript click also failed: {js_error}")
                                            raise click_error
                                
                                await asyncio.sleep(3)
                            else:
                                # Switch our active page to the new tab
                                self.page = new_page
                                await asyncio.sleep(2)
                            
                            # After attempting navigation/click, determine current page and URL
                            current_url = self.page.url
                            print(f"🌐 Current URL after starting survey: {current_url}")
                            
                            # If we land on CPX click redirector, wait for the partner page
                            if 'click.cpx-research.com' in current_url:
                                print("🔄 On CPX click redirector, waiting for partner page ...")
                                try:
                                    # Wait for either a navigation on the same page or a new page
                                    redirect_captured = False
                                    try:
                                        async with self.context.expect_page() as partner_page_info:
                                            # Some redirectors trigger a window.open; poll for a short time
                                            await asyncio.sleep(1.0)
                                        partner_page = await partner_page_info.value
                                        await partner_page.wait_for_load_state('domcontentloaded')
                                        self.page = partner_page
                                        redirect_captured = True
                                        print(f"✅ Partner page opened: {self.page.url}")
                                    except Exception:
                                        pass
                                    
                                    if not redirect_captured:
                                        # Fallback: wait for same-tab navigation
                                        await self.page.wait_for_load_state('load')
                                        print(f"✅ Redirect completed to: {self.page.url}")
                                except Exception as redirect_err:
                                    print(f"⚠️ Redirect handling warning: {redirect_err}")
                            
                            # Wait for the survey page to fully load (not just loading screen)
                            print("⏳ Waiting for survey page to fully load...")
                            try:
                                # Wait for loading spinner to disappear or content to appear
                                await self.page.wait_for_function(
                                    "() => { return !document.querySelector('[aria-label=\"loader\"]') || document.querySelector('[data-testid=\"layout-card\"]')?.textContent?.length > 100 }",
                                    timeout=30000
                                )
                                print("✅ Survey page loaded (loading spinner gone or content visible)")
                            except Exception as wait_err:
                                print(f"⚠️ Wait for survey load timed out: {wait_err}")
                                # Continue anyway, might be loaded
                            
                            # Additional wait for dynamic content
                            await asyncio.sleep(3)
                            
                            # Check for PureSpectrum
                            current_url = self.page.url
                            if 'spectrumsurveys.com' in current_url or 'purespectrum' in current_url.lower():
                                print("🔄 Detected PureSpectrum survey after router completion")
                                return await self.handle_purespectrum_survey()
                            
                            # Otherwise handle generic actual survey
                            return await self.handle_actual_survey()
                        except Exception as e:
                            print(f"❌ Error starting actual survey: {e}")
                            import traceback
                            traceback.print_exc()
                            return {'status': 'router_completed', 'reason': 'Router completed but survey start failed'}
                    else:
                        print("✅ Router qualification completed successfully")
                        return {'status': 'router_completed', 'reason': 'Router qualification successful'}
                else:
                    return {'status': 'router_not_qualified', 'reason': 'Router qualification failed'}
            else:
                # Direct survey, no router
                print("🎯 Direct survey detected - handling questions...")
            return await self.handle_actual_survey()
            
        except Exception as e:
            print(f"❌ Error completing survey: {e}")
            return {'status': 'error', 'reason': str(e)}
    
    async def handle_purespectrum_survey(self) -> Dict[str, Any]:
        """Handle PureSpectrum survey in the same browser instance"""
        try:
            print("🎯 Handling PureSpectrum survey in current browser...")
            
            # Wait for the page to fully load
            await asyncio.sleep(3)
            
            # Check if we're on the pre-qualification page
            page_content = await self.page.content()
            if "Before you begin the survey, please answer the 2 questions below" in page_content:
                print("🔄 Detected PureSpectrum pre-qualification questions")
                
                # Handle the gender question first
                gender_selectors = [
                    'select[name*="gender"]',
                    'select[id*="gender"]',
                    'select',
                    'input[type="radio"][name*="gender"]',
                    'input[type="radio"][id*="gender"]'
                ]
                
                gender_selected = False
                for selector in gender_selectors:
                    try:
                        gender_elem = await self.page.locator(selector).first
                        if await gender_elem.count() > 0:
                            # If it's a select dropdown
                            if await gender_elem.evaluate('el => el.tagName') == 'SELECT':
                                # Select based on persona
                                if self.persona and 'about_you' in self.persona:
                                    gender = self.persona['about_you'].get('gender', 'Male').lower()
                                    if 'female' in gender:
                                        await gender_elem.select_option(value='2')  # Usually 2 for female
                                    else:
                                        await gender_elem.select_option(value='1')  # Usually 1 for male
                                    gender_selected = True
                                    print(f"✅ Selected gender: {gender}")
                                    break
                            # If it's radio buttons
                            elif await gender_elem.evaluate('el => el.tagName') == 'INPUT':
                                if self.persona and 'about_you' in self.persona:
                                    gender = self.persona['about_you'].get('gender', 'Male').lower()
                                    if 'female' in gender:
                                        await self.page.locator('input[value="2"], input[value="female"]').first.check()
                                    else:
                                        await self.page.locator('input[value="1"], input[value="male"]').first.check()
                                    gender_selected = True
                                    print(f"✅ Selected gender: {gender}")
                                    break
                    except Exception:
                    continue
                
                if not gender_selected:
                    print("⚠️ Could not select gender, trying default selection")
                    # Try to select the first option
                    try:
                        first_option = self.page.locator('select option, input[type="radio"]')
                        if await first_option.count() > 0:
                            first_option = await first_option.first
                            if await first_option.evaluate('el => el.tagName') == 'OPTION':
                                await first_option.select_option()
                else:
                                await first_option.check()
                            gender_selected = True
                    except Exception:
                        pass
                
                # Wait for any dynamic content to load
                await asyncio.sleep(2)
                
                # Look for a continue/next button
                continue_selectors = [
                    'button:has-text("Continue")',
                    'button:has-text("Next")',
                    'button:has-text("Submit")',
                    'input[value*="Continue"]',
                    'input[value*="Next"]',
                    'input[value*="Submit"]',
                    '.btn-primary',
                    '.btn-success'
                ]
                
                for selector in continue_selectors:
                    try:
                        continue_btn = self.page.locator(selector)
                        if await continue_btn.count() > 0:
                            print(f"🎯 Found continue button: {selector}")
                            await continue_btn.first.click()
                            await asyncio.sleep(3)  # Wait for next page
                    break
                    except Exception:
                        continue
                
                # Now handle the actual survey questions
                return await self.handle_actual_survey()
            else:
                # Already on survey questions
                print("🎯 Already on PureSpectrum survey questions")
                return await self.handle_actual_survey()
            
        except Exception as e:
            print(f"❌ Error handling PureSpectrum survey: {e}")
            return {'status': 'error', 'reason': str(e)}
    
    async def run_survey_session(self, max_surveys: int = 5) -> Dict[str, Any]:
        """Run a complete survey session with multiple surveys"""
        try:
            print(f"🚀 Starting CPX Research survey session (max: {max_surveys})")
            
            # Initialize browser once
            if not await self.initialize_browser():
                return {'status': 'error', 'reason': 'Failed to initialize browser'}
            
            # Navigate to CPX Research
            if not await self.navigate_to_cpx():
                return {'status': 'error', 'reason': 'Failed to navigate to CPX Research'}
            
            # Load persona if available
            if hasattr(self, 'load_persona') and callable(getattr(self, 'load_persona')):
                self.load_persona()
            
            surveys_completed = 0
            routers_completed = 0
            total_attempts = 0
            
            # Try multiple survey attempts
            for attempt in range(max_surveys):
                total_attempts += 1
                print(f"\n🔄 Survey attempt {attempt + 1}/{max_surveys}")
                
                # Get available surveys
                surveys = await self.get_available_surveys()
                if not surveys:
                    print("❌ No surveys available")
                    break
                
                print(f"📋 Found {len(surveys)} available surveys")
                
                # Try each survey
                survey_completed = False
                for survey in surveys[:3]:  # Try first 3 surveys
                    survey_id = survey.get('id')
                    if not survey_id:
                        continue
                    
                    print(f"🎯 Trying survey: {survey_id}")
                    
                    try:
                    result = await self.complete_single_survey(survey_id)
                    
                    if result['status'] == 'completed':
                        surveys_completed += 1
                        survey_completed = True
                            print(f"✅ Survey {survey_id} completed successfully")
                        break
                    elif result['status'] == 'router_completed':
                        routers_completed += 1
                        survey_completed = True
                        print(f"🔄 Router qualification completed for survey {survey_id}")
                        # Router completion means we're now qualified for more surveys
                        break
                    elif result['status'] == 'router_not_qualified':
                        print(f"❌ Router qualification failed for survey {survey_id}")
                        continue
                    elif result['status'] == 'not_qualified':
                        print(f"❌ Not qualified for survey {survey_id}")
                        continue
                    else:
                        print(f"⚠️ Survey {survey_id} failed: {result.get('reason', 'Unknown')}")
                            continue
                        
                    except Exception as e:
                        print(f"❌ Error with survey {survey_id}: {e}")
                        continue
                
                if not survey_completed:
                    print("❌ No surveys could be completed in this round")
                    # If we've completed routers, we might have better qualification now
                    if routers_completed > 0:
                        print("🔄 Router qualifications completed - may have better survey access")
                        # Continue trying more surveys
                        continue
                    else:
                        break
                
                # Wait between surveys
                if attempt < max_surveys - 1:
                    wait_time = random.uniform(10, 30)
                    print(f"⏳ Waiting {wait_time:.1f}s before next survey...")
                    await asyncio.sleep(wait_time)
            
            return {
                'status': 'completed',
                'surveys_completed': surveys_completed,
                'routers_completed': routers_completed,
                'total_attempts': total_attempts,
                'questions_answered': self.session_stats['questions_answered'],
                'total_earnings': self.session_stats['earnings']
            }
            
        except Exception as e:
            print(f"❌ Session failed: {e}")
            return {'status': 'error', 'reason': str(e)}
        
        finally:
            await self.cleanup()
    
    async def cleanup(self):
        """Clean up browser resources"""
        try:
            if self.page:
                await self.page.close()
            if self.context:
                await self.context.close()
            if self.browser:
                await self.browser.close()
            print("🧹 Browser cleanup completed")
        except Exception as e:
            print(f"⚠️ Cleanup error: {e}")
    
    def print_session_summary(self):
        """Print session statistics"""
        print("\n" + "=" * 50)
        print("📊 CPX RESEARCH SESSION SUMMARY")
        print("=" * 50)
        print(f"Surveys Started: {self.session_stats['surveys_started']}")
        print(f"Surveys Completed: {self.session_stats['surveys_completed']}")
        print(f"Questions Answered: {self.session_stats['questions_answered']}")
        print(f"Total Earnings: ${self.session_stats['earnings']:.2f}")
        
        if self.session_stats['surveys_started'] > 0:
            completion_rate = (self.session_stats['surveys_completed'] / self.session_stats['surveys_started']) * 100
            print(f"Completion Rate: {completion_rate:.1f}%")
        
        print("=" * 50)
        
        # Additional router-specific information if available
        if hasattr(self, 'session_result') and self.session_result:
            if 'routers_completed' in self.session_result:
                print(f"🔄 Routers Completed: {self.session_result['routers_completed']}")
            if 'total_attempts' in self.session_result:
                print(f"🎯 Total Attempts: {self.session_result['total_attempts']}")
        
        print("=" * 50)


async def main():
    """Main function to run CPX Research bot"""
    try:
        # Create bot instance
        bot = CPXResearchBot()
        
        # Run survey session
        result = await bot.run_survey_session(max_surveys=Config.MAX_SURVEYS)
        
        # Print results
        bot.print_session_summary()
        
        if result['status'] == 'completed':
            print(f"\n🎉 Session completed successfully!")
            print(f"Completed {result['surveys_completed']} surveys")
            print(f"Total earnings: ${result['total_earnings']:.2f}")
        else:
            print(f"\n❌ Session failed: {result.get('reason', 'Unknown error')}")
    
    except Exception as e:
        print(f"❌ Main execution failed: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(main())
