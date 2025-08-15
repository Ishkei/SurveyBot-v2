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

# Import enhanced features (decouple typing from other optional deps)
try:
    from enhanced_personality_system import EnhancedPersonalitySystem
    ENHANCED_FEATURES_AVAILABLE = True
except ImportError:
    ENHANCED_FEATURES_AVAILABLE = False
    print("⚠️ Enhanced personality not available for CPX bot")

try:
    from typing_simulation import type_text_naturally, TYPING_PRESETS
    TYPING_SIMULATION_AVAILABLE = True
except ImportError:
    TYPING_SIMULATION_AVAILABLE = False
    print("⚠️ Typing simulation module not available")

try:
    from Project_Structure.free_captcha_solver import FreeCaptchaSolver
    CAPTCHA_SOLVER_AVAILABLE = True
except ImportError:
    CAPTCHA_SOLVER_AVAILABLE = False
    print("⚠️ Free captcha solver not available")

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
                # Check if this is an age question (common in qualification surveys)
                page_text = await self.page.text_content('body') or ''
                if any(age_term in page_text.lower() for age_term in ['age', 'years old', 'how old']):
                    print("🎯 Detected age question with text input - treating as text input")
                    return 'open_ended'
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
                # Click selected checkboxes with robust fallbacks for hidden inputs (e.g., PureSpectrum Angular)
                try:
                    async def click_checkbox_option(option_dict):
                        try:
                            checkbox_id_local = option_dict.get('id')
                            checkbox_elem = option_dict.get('element')
                            option_text_local = option_dict.get('text') or ''

                            # 1) Prefer clicking associated <label for="id">
                            if checkbox_id_local:
                                label_selector_local = f'label[for="{checkbox_id_local}"]'
                                label_loc = self.page.locator(label_selector_local).first
                                if await label_loc.count() > 0:
                                    try:
                                        await label_loc.click()
                                        print(f"✅ Clicked checkbox label for: {option_text_local[:30]}...")
                                        return True
                                    except Exception:
                                        # JS click fallback on label
                                        try:
                                            handle = await label_loc.element_handle()
                                            if handle:
                                                await self.page.evaluate('(el) => { el.scrollIntoView({behavior: "smooth", block: "center"}); el.click(); }', handle)
                                                print(f"✅ JS-clicked checkbox label for: {option_text_local[:30]}...")
                                                return True
                                        except Exception:
                                            pass

                            # 2) Try Playwright's check(force=True) on the input
                            if checkbox_elem:
                                try:
                                    await checkbox_elem.check(force=True)
                                    print(f"✅ Checked checkbox input (force) for: {option_text_local[:30]}...")
                                    return True
                                except Exception:
                                    pass

                            # 3) Click input directly with force and scroll
                            if checkbox_elem:
                                try:
                                    handle = await checkbox_elem.element_handle()
                                    if handle:
                                        await self.page.evaluate('(el) => { el.scrollIntoView({behavior: "smooth", block: "center"}); }', handle)
                                    await checkbox_elem.click(force=True)
                                    print(f"✅ Clicked checkbox input directly (force) for: {option_text_local[:30]}...")
                                    return True
                                except Exception:
                                    pass

                            # 4) Click nearest clickable container (Angular wrappers)
                            if checkbox_elem:
                                try:
                                    handle = await checkbox_elem.element_handle()
                                    if handle:
                                        clicked_via_container = await self.page.evaluate(
                                            '(el) => {\n'
                                            '  const container = el.closest("label, .ng-scope, .ps-btn, .ps-option, .form-group, .c-answer, .answer, .option") || el.parentElement;\n'
                                            '  if (container) {\n'
                                            '    container.scrollIntoView({behavior: "smooth", block: "center"});\n'
                                            '    container.click();\n'
                                            '    return true;\n'
                                            '  }\n'
                                            '  return false;\n'
                                            '}', handle)
                                        if clicked_via_container:
                                            print(f"✅ Clicked checkbox via container for: {option_text_local[:30]}...")
                                            return True
                                except Exception:
                                    pass

                            # 5) As last resort, set checked via JS and dispatch events for Angular
                            if checkbox_elem:
                                try:
                                    handle = await checkbox_elem.element_handle()
                                    if handle:
                                        await self.page.evaluate(
                                            '(el) => {\n'
                                            '  el.scrollIntoView({behavior: "smooth", block: "center"});\n'
                                            '  el.checked = true;\n'
                                            '  el.dispatchEvent(new Event("input", { bubbles: true }));\n'
                                            '  el.dispatchEvent(new Event("change", { bubbles: true }));\n'
                                            '}', handle)
                                        print(f"✅ Set checkbox via JS+events for: {option_text_local[:30]}...")
                                        return True
                                except Exception:
                                    pass

                            return False
                        except Exception:
                            return False

                    if isinstance(selected_options, list):
                        for option in selected_options:
                            await click_checkbox_option(option)
                            await asyncio.sleep(random.uniform(0.4, 0.9))
                    else:
                        await click_checkbox_option(selected_options)
                        await asyncio.sleep(random.uniform(0.8, 1.6))
                    
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
            
            # First, try to find visible input fields in the main form
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
            
            # If no form inputs found, try any visible text input (including SampleEye style)
            if not text_input:
                # Try multiple selectors for SampleEye and other platforms
                input_selectors = [
                    'input[type="text"]',
                    'textarea',
                    'input:not([type])',  # Some inputs don't specify type
                    '.form-control',
                    '.input-field',
                    '[class*="input"]',
                    '[class*="form"]'
                ]
                
                for selector in input_selectors:
                    try:
                        all_text_inputs = await self.page.locator(selector).all()
                        for input_elem in all_text_inputs:
                            try:
                                is_visible = await input_elem.is_visible()
                                is_enabled = await input_elem.is_enabled()
                                input_type = await input_elem.get_attribute('type') or 'text'
                                
                                # Skip hidden inputs and non-text types
                                if (is_visible and is_enabled and 
                                    input_type in ['text', ''] and
                                    not await input_elem.get_attribute('readonly')):
                                    
                                    # Skip modal or hidden inputs
                                    input_id = await input_elem.get_attribute('id') or ''
                                    input_class = await input_elem.get_attribute('class') or ''
                                    if ('modal' not in input_id.lower() and 
                                        'report' not in input_id.lower() and
                                        'hidden' not in input_class.lower()):
                                        
                                        text_input = input_elem
                                        print(f"✅ Found visible text input with selector '{selector}': id='{input_id}', class='{input_class}'")
                                        break
                            except Exception:
                                continue
                        if text_input:
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
                
                # Type the response naturally if typing simulation available or requested
                if TYPING_SIMULATION_AVAILABLE:
                    try:
                        style = getattr(self, 'typing_style', 'careful_typer') if hasattr(self, 'typing_style') else 'careful_typer'
                        preset = TYPING_PRESETS.get(style, TYPING_PRESETS.get('careful_typer', {}))
                        success = await type_text_naturally(
                            response_text,
                            text_input,
                            use_pyautogui=False,
                            config=preset
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
                    has_children_raw = self.persona['home'].get('children', 0)
                    try:
                        has_children = int(has_children_raw)
                    except Exception:
                        # Interpret common string values
                        txt = str(has_children_raw).strip().lower()
                        has_children = 1 if txt in ['yes', 'y', 'true'] else 0
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
                try:
                    numbers = re.findall(r'\d+', response or '')
                except Exception:
                    numbers = []
                if numbers:
                    if selection_type == 'multiple':
                        safe_indices = []
                        for n in numbers:
                            try:
                                idx = int(n)
                                if 0 <= idx < len(options):
                                    safe_indices.append(idx)
                            except Exception:
                                continue
                        selected_indices = safe_indices
                        return [options[i] for i in selected_indices[:3]]  # Max 3 selections
                    else:
                        try:
                            selected_index = int(numbers[0])
                            if 0 <= selected_index < len(options):
                                return options[selected_index]
                        except Exception:
                            pass
            
            # Fallback to simple selection (avoid refusal options)
            non_refusal_options = [opt for opt in options if 'prefer not' not in opt['text'].lower() and 'cant' not in opt['text'].lower() and 'dont want' not in opt['text'].lower()]
            
            if selection_type == 'multiple':
                # Select 1-2 random options for multiple choice
                available_options = non_refusal_options if non_refusal_options else options
                count = len(available_options)
                if count == 0:
                    return []
                max_choices = 2 if count >= 2 else 1
                num_selections = random.randint(1, max_choices)
                selected_indices = random.sample(range(count), num_selections)
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
            
            # Handle age questions
            if 'age' in question_lower or 'years old' in question_lower or 'how old' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    age = self.persona['about_you'].get('age', 25)
                    print(f"🎂 Using persona age: {age}")
                    return str(age)
                else:
                    # Generate realistic age for surveys
                    age = random.randint(25, 45)
                    print(f"🎂 Generated realistic age: {age}")
                    return str(age)
            
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
                '.btn.btn-blue',
                # PureSpectrum patterns
                'button:has-text("Continue")',
                'button.ps-button',
                '.btn-primary',
                '.btn-success',
                'input[value*="Continue"]',
                'input[value*="Next"]',
                'input[value*="Submit"]',
                'a:has-text("Continue")',
                'a:has-text("Next")',
                'a:has-text("Submit")',
                'a.ps-button'
            ]
            
            for selector in submit_selectors:
                try:
                    btn = self.page.locator(selector).first
                    if await btn.count() == 0:
                        continue
                    try:
                        await btn.wait_for(state='visible', timeout=2500)
                        await btn.click()
                    except Exception:
                        # JS/force fallbacks
                        try:
                            handle = await btn.element_handle()
                            if handle:
                                await self.page.evaluate('(el) => { el.scrollIntoView({behavior: "smooth", block: "center"}); el.click(); }', handle)
                            else:
                                await btn.click(force=True)
                        except Exception:
                            continue
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
                # Check for CAPTCHAs before handling router question
                try:
                    if await self.detect_and_handle_captcha():
                        print("✅ CAPTCHA resolved in router, continuing...")
                        await asyncio.sleep(1)
                except Exception as captcha_err:
                    print(f"⚠️ Router CAPTCHA check error: {captcha_err}")
                
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

            # NEW: Check for CAPTCHAs before proceeding with survey
            try:
                if await self.detect_and_handle_captcha():
                    print("✅ CAPTCHA handled successfully, continuing with survey...")
                    await asyncio.sleep(2)  # Wait for CAPTCHA resolution
            except Exception as captcha_err:
                print(f"⚠️ CAPTCHA detection/handling error: {captcha_err}")

            # Special case: Samplicio.us DataDome verification (RespondentAuthentication.aspx)
            try:
                await self.handle_samplicio_verification()
            except Exception as dd_err:
                print(f"⚠️ Samplicio verification handler error: {dd_err}")

            # Special case: Dynata pre-survey page with "BEGIN SURVEY" button
            try:
                dynata_begin_selector = 'a#takesurveybtn, a:has-text("BEGIN SURVEY"), button:has-text("BEGIN SURVEY")'
                if "ssisurveys.com/projects/rex" in self.page.url or await self.page.locator(dynata_begin_selector).count() > 0:
                    print("🔎 Detected Dynata pre-survey page. Attempting to click 'BEGIN SURVEY'...")
                    begin_btn = self.page.locator(dynata_begin_selector).first
                    if await begin_btn.count() > 0:
                        target_attr = None
                        try:
                            target_attr = await begin_btn.get_attribute('target')
                        except Exception:
                            pass
                        new_page = None
                        if target_attr and target_attr.lower() == '_blank' and hasattr(self, 'context') and self.context:
                            try:
                                async with self.context.expect_page() as new_page_info:
                                    await begin_btn.click()
                                new_page = await new_page_info.value
                                await new_page.wait_for_load_state('domcontentloaded')
                                self.page = new_page
                                print("✅ Opened Dynata survey in a new tab")
                            except Exception as dynata_tab_err:
                                print(f"⚠️ Could not capture new Dynata tab: {dynata_tab_err}")
                        else:
                            try:
                                async with self.page.expect_navigation(wait_until='domcontentloaded', timeout=15000):
                                    await begin_btn.click()
                                print("✅ Navigated into Dynata survey")
                            except Exception as dynata_nav_err:
                                print(f"⚠️ Dynata navigation wait failed: {dynata_nav_err}; retrying click without wait")
                                try:
                                    await begin_btn.click()
                                    await asyncio.sleep(2)
                                except Exception as dynata_click_err:
                                    print(f"❌ Failed to click Dynata 'BEGIN SURVEY': {dynata_click_err}")
            except Exception as dynata_err:
                print(f"⚠️ Dynata pre-survey handler error: {dynata_err}")

            # Special case: SurveyGizmo/Alchemer (GetWizer) router pages
            try:
                page_text_lower = (await self.page.text_content('body') or '').lower()
                if (
                    'surveys.getwizer.com' in self.page.url.lower()
                    or 'alchemer' in page_text_lower
                    or 'surveygizmo' in page_text_lower
                ):
                    print("🔎 Detected SurveyGizmo/Alchemer (GetWizer) router. Attempting to proceed...")
                    await self.handle_getwizer_alchemer_router()
            except Exception as gizmo_err:
                print(f"⚠️ GetWizer/Alchemer handler error: {gizmo_err}")

            # Special case: MetrixMatrix survey platform
            try:
                platform = await self.detect_survey_platform()
                if platform == 'metrixmatrix':
                    print("🔎 Detected MetrixMatrix survey platform. Using specialized handler...")
                    return await self.handle_metrixmatrix_survey()
            except Exception as metrix_err:
                print(f"⚠️ MetrixMatrix handler error: {metrix_err}")
            
            # Special case: SampleEye survey platform
            try:
                current_url = self.page.url.lower()
                if 'sampleeye.com' in current_url:
                    print("🔎 Detected SampleEye survey platform. Using specialized handler...")
                    return await self.handle_sampleeye_survey()
            except Exception as sampleeye_err:
                print(f"⚠️ SampleEye handler error: {sampleeye_err}")
            
            # Special case: Sample-Cube survey platform
            try:
                current_url = self.page.url.lower()
                if 'sample-cube.com' in current_url:
                    print("🔎 Detected Sample-Cube survey platform. Using specialized handler...")
                    return await self.handle_samplecube_survey()
            except Exception as samplecube_err:
                print(f"⚠️ Sample-Cube handler error: {samplecube_err}")

            # Special case: Ipsos Interactive landing with "Accept and take the survey"
            try:
                if (
                    'enter.ipsosinteractive.com/landing' in self.page.url
                    or await self.page.locator('a#acceptAndTakeSurveyLink7, a[id^="acceptAndTakeSurveyLink"], a:has-text("Accept and take the survey"), button:has-text("Accept and take the survey")').count() > 0
                ):
                    print("🔎 Detected Ipsos landing. Clicking 'Accept and take the survey'...")
                    accept_loc = self.page.locator('a#acceptAndTakeSurveyLink7, a[id^="acceptAndTakeSurveyLink"], a:has-text("Accept and take the survey"), button:has-text("Accept and take the survey")').first
                    if await accept_loc.count() > 0:
                        # Ensure visible and try multiple click strategies
                        try:
                            handle = await accept_loc.element_handle()
                            if handle:
                                await self.page.evaluate('(el) => el.scrollIntoView({behavior: "smooth", block: "center"})', handle)
                        except Exception:
                            pass
                        current_url = self.page.url
                        try:
                            async with self.page.expect_navigation(wait_until='domcontentloaded', timeout=15000):
                                await accept_loc.click()
                            print("✅ Accepted Ipsos landing (navigation observed)")
                        except Exception as nav_err:
                            print(f"⚠️ Accept click without nav wait (will verify): {nav_err}")
                            try:
                                await accept_loc.click()
                                # Wait for either URL change or content change
                                try:
                                    await self.page.wait_for_function('(prev) => location.href !== prev', current_url, timeout=12000)
                                except Exception:
                                    await self.page.wait_for_load_state('networkidle', timeout=10000)
                            except Exception as click_f:
                                # JS fallback
                                try:
                                    handle = await accept_loc.element_handle()
                                    if handle:
                                        await self.page.evaluate('(el) => el.click()', handle)
                                        await asyncio.sleep(2)
                                except Exception as js_f:
                                    print(f"❌ Ipsos accept JS click failed: {js_f}")
            except Exception as ipsos_err:
                print(f"⚠️ Ipsos landing handler error: {ipsos_err}")

            # Special case: SaySo router (ZK framework) with Next button and radio options
            try:
                if 'survey.saysoforgood.com' in self.page.url.lower() or await self.page.locator('#next, button:has-text("Next Question")').count() > 0:
                    print("🔎 Detected SaySo router page. Attempting to answer and proceed...")
                    await self.handle_sayso_router()
            except Exception as sayso_err:
                print(f"⚠️ SaySo router handler error: {sayso_err}")

            # Special case: Samplicio.us consent screen with "Agree and Continue"
            try:
                if "rx.samplicio.us/consent" in self.page.url:
                    print("🔎 Detected Samplicio.us consent page. Handling consent...")
                    # Wait for loader to disappear
                    try:
                        await self.page.wait_for_selector('[aria-label="loader"]', state='detached', timeout=10000)
                    except Exception:
                        pass
                    consent_selectors = [
                        'button:has-text("Agree and Continue")',
                        '[data-testid="consent-continue"]',
                        'button.grx-bg-primary',
                        'button[type="submit"]:has-text("Agree")'
                    ]
                    clicked = False
                    for selector in consent_selectors:
                        try:
                            btn = self.page.locator(selector).first
                            if await btn.count() == 0:
                                continue
                            # Ensure enabled and visible
                            try:
                                await btn.wait_for(state='visible', timeout=5000)
                            except Exception:
                                pass
                            # Some frameworks disable the button briefly; wait until not disabled
                            try:
                                await self.page.wait_for_function(
                                    "el => !el.disabled", arg=await btn.element_handle(), timeout=5000
                                )
                            except Exception:
                                pass
                            try:
                                async with self.page.expect_navigation(wait_until='domcontentloaded', timeout=15000):
                                    await btn.click()
                                print(f"✅ Clicked consent button via selector: {selector}")
                                clicked = True
                                # After consent, Samplicio may immediately show DataDome verification
                                try:
                                    await asyncio.sleep(1.0)
                                    await self.handle_samplicio_verification()
                                except Exception:
                                    pass
                                break
                            except Exception as click_err:
                                print(f"⚠️ Click failed for {selector}: {click_err}")
                                # JS fallback
                                try:
                                    handle = await btn.element_handle()
                                    if handle:
                                        await self.page.evaluate('(b) => { b.click(); }', handle)
                                        await asyncio.sleep(2)
                                        clicked = True
                                        print(f"✅ JS-clicked consent button via selector: {selector}")
                                        # After consent, Samplicio may immediately show DataDome verification
                                        try:
                                            await asyncio.sleep(1.0)
                                            await self.handle_samplicio_verification()
                                        except Exception:
                                            pass
                                        break
                                except Exception as js_err:
                                    print(f"❌ JS click also failed for {selector}: {js_err}")
                        except Exception as inner_err:
                            print(f"⚠️ Selector error for {selector}: {inner_err}")
                    if not clicked:
                        # Try role-based locator as a robust fallback
                        try:
                            role_btn = self.page.get_by_role('button', name='Agree and Continue').first
                            if await role_btn.count() == 0:
                                role_btn = self.page.get_by_role('button', name='Agree').first
                            if await role_btn.count() > 0:
                                try:
                                    handle = await role_btn.element_handle()
                                    if handle:
                                        await self.page.evaluate('(el) => el.scrollIntoView({behavior: "smooth", block: "center"})', handle)
                                except Exception:
                                    pass
                                try:
                                    async with self.page.expect_navigation(wait_until='domcontentloaded', timeout=15000):
                                        await role_btn.click()
                                    print("✅ Clicked consent button via role locator")
                                    clicked = True
                                    try:
                                        await asyncio.sleep(1.0)
                                        await self.handle_samplicio_verification()
                                    except Exception:
                                        pass
                                except Exception as role_err:
                                    print(f"⚠️ Role click failed: {role_err}; trying keyboard submit")
                                    try:
                                        await role_btn.focus()
                                    except Exception:
                                        pass
                                    try:
                                        await self.page.keyboard.press('Enter')
                                        await asyncio.sleep(2)
                                        clicked = True
                                        print("✅ Submitted consent via keyboard Enter")
                                        try:
                                            await asyncio.sleep(1.0)
                                            await self.handle_samplicio_verification()
                                        except Exception:
                                            pass
                                    except Exception as key_err:
                                        print(f"❌ Keyboard submit failed: {key_err}")
                        except Exception as role_outer_err:
                            print(f"⚠️ Role locator error: {role_outer_err}")
                    if not clicked:
                        print("⚠️ Could not find or click Samplicio consent button")
            except Exception as samp_err:
                print(f"⚠️ Samplicio consent handler error: {samp_err}")

            # Special case: RD Secured text-entry gate (free-text + Submit)
            try:
                if "rdsecured.com/landing" in self.page.url:
                    print("🔎 Detected RD Secured router gate. Filling answer and submitting...")
                    # Wait for main container or textarea
                    try:
                        await self.page.wait_for_selector('#main, textarea#text_element, #submit_entry', timeout=15000)
                    except Exception:
                        pass
                    # Some pages hide main initially then show; give them a moment
                    await asyncio.sleep(1.5)
                    text_area = self.page.locator('textarea#text_element').first
                    submit_btn = self.page.locator('#submit_entry').first
                    if await text_area.count() > 0:
                        # Compose a natural answer (avoid flagged language). Use persona when available.
                        # Read the on-page prompt to tailor the response.
                        prompt = ""
                        try:
                            prompt = (await self.page.locator('#label_text_element').text_content() or '').strip()
                        except Exception:
                            prompt = ""
                        answer = ""
                        prompt_lower = (prompt or '').lower()
                        if 'beverage' in prompt_lower or 'drink' in prompt_lower:
                            answer = (
                                "I really enjoy iced coffee with a splash of oat milk. "
                                "It tastes smooth and balanced, and the chill makes it refreshing without being too sweet."
                            )
                        elif 'vacation' in prompt_lower or 'holiday' in prompt_lower:
                            answer = (
                                "My favorite vacation was a road trip down the Pacific Coast Highway. "
                                "The ocean views and small coastal towns made it relaxing and memorable."
                            )
                        else:
                            # General-purpose, neutral topic answer in 1–2 sentences
                            answer = (
                                "I like spending a quiet weekend hiking local trails. "
                                "It clears my head and I enjoy discovering small views I would otherwise miss."
                            )
                        try:
                            # Focus and type with human-like delay
                            await text_area.click()
                            # Small thinking pause before typing
                            await asyncio.sleep(random.uniform(0.6, 1.2))
                            for ch in answer:
                                await self.page.keyboard.type(ch, delay=random.randint(75, 120))
                                if ch in ['.', ',', ';']:
                                    await asyncio.sleep(random.uniform(0.12, 0.25))
                            # Additional pause to reduce typed-speed heuristics
                            await asyncio.sleep(random.uniform(1.0, 2.0))
                        except Exception as type_err:
                            print(f"⚠️ Typing failed: {type_err}; trying direct fill")
                            try:
                                await text_area.fill(answer)
                                # Ensure Angular or listeners see the change
                                try:
                                    handle = await text_area.element_handle()
                                    if handle:
                                        await self.page.evaluate(
                                            '(el) => { el.dispatchEvent(new Event("input", {bubbles: true})); el.dispatchEvent(new Event("change", {bubbles: true})); }',
                                            handle
                                        )
                                except Exception:
                                    pass
                                await asyncio.sleep(0.3)
                            except Exception as fill_err:
                                print(f"❌ Direct fill also failed: {fill_err}")
                    else:
                        print("⚠️ RD Secured textarea not found; continuing")
                    if await submit_btn.count() > 0:
                        # Wait until enabled and visible, then click
                        try:
                            await submit_btn.wait_for(state='visible', timeout=8000)
                        except Exception:
                            pass
                        try:
                            await self.page.wait_for_function(
                                "el => el && !el.disabled && getComputedStyle(el).display !== 'none'",
                                arg=await submit_btn.element_handle(),
                                timeout=15000
                            )
                        except Exception:
                            pass
                        try:
                            current_url = self.page.url
                            await submit_btn.click()
                            # Wait for either URL change, spinner, or content change
                            try:
                                await self.page.wait_for_function('(prev) => location.href !== prev', current_url, timeout=15000)
                            except Exception:
                                try:
                                    await self.page.wait_for_load_state('networkidle', timeout=8000)
                                except Exception:
                                    await asyncio.sleep(2)
                            print("✅ Submitted RD Secured gate")
                        except Exception as click_err:
                            print(f"⚠️ Submit click failed: {click_err}; trying JS and then keyboard")
                            try:
                                handle = await submit_btn.element_handle()
                                if handle:
                                    await self.page.evaluate('(b) => b.click()', handle)
                                    await asyncio.sleep(2)
                            except Exception:
                                try:
                                    await submit_btn.focus()
                                    await self.page.keyboard.press('Enter')
                                    await asyncio.sleep(2)
                                except Exception as key_err:
                                    print(f"❌ Submit via keyboard failed: {key_err}")
                    else:
                        print("⚠️ RD Secured submit button not found; continuing")
            except Exception as rd_err:
                print(f"⚠️ RD Secured handler error: {rd_err}")
            
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
                
                # Check for CAPTCHAs before handling the question
                try:
                    if await self.detect_and_handle_captcha():
                        print("✅ CAPTCHA resolved, continuing with question...")
                        await asyncio.sleep(1)
                except Exception as captcha_err:
                    print(f"⚠️ CAPTCHA check error: {captcha_err}")
                
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
                            
                            # Check for different survey platforms
                            current_url = self.page.url
                            platform = await self.detect_survey_platform()
                            
                            if platform == 'metrixmatrix':
                                print("🔄 Detected MetrixMatrix survey after router completion")
                                return await self.handle_metrixmatrix_survey()
                            elif 'spectrumsurveys.com' in current_url or 'purespectrum' in current_url.lower():
                                print("🔄 Detected PureSpectrum survey after router completion")
                                return await self.handle_purespectrum_survey()
                            else:
                                print(f"🔄 Detected {platform} survey, using generic handler")
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
    
    async def handle_getwizer_alchemer_router(self) -> None:
        """Handle simple SurveyGizmo/Alchemer (GetWizer) router screens.
        Strategy:
        - Select a reasonable default for radios/checkboxes/selects.
        - Fill short text inputs when required.
        - Click Next/Continue using robust selectors and fallbacks.
        """
        try:
            # Give the DOM a brief moment
            await asyncio.sleep(1.0)

            # If we encounter Samplicio/DataDome verification while on GetWizer
            try:
                await self.handle_samplicio_verification()
            except Exception:
                pass

            # Heuristics to answer visible required questions quickly
            question_containers = [
                '.sg-question',
                '[data-question-id]',
                'fieldset[class*="sg-"]',
                '.question-container'
            ]

            # Go over a limited number of containers to avoid over-clicking
            for selector in question_containers:
                try:
                    blocks = await self.page.locator(selector).all()
                except Exception:
                    blocks = []
                for block in blocks[:6]:
                    # Prefer visible blocks
                    try:
                        visible = await block.is_visible()
                    except Exception:
                        visible = True
                    if not visible:
                        continue

                    # Radios
                    try:
                        radios = await block.locator('input[type="radio"]').all()
                        if radios:
                            # Click the first non "prefer not/none" label if available
                            label_locator = block.locator('label')
                            clicked = False
                            count_labels = await label_locator.count()
                            for i in range(min(count_labels, 6)):
                                txt = (await label_locator.nth(i).text_content() or '').strip().lower()
                                if any(bad in txt for bad in ['prefer not', 'none of the above', 'none']):
                                    continue
                                try:
                                    await label_locator.nth(i).click()
                                    clicked = True
                                    break
                                except Exception:
                                    continue
                            if not clicked:
                                try:
                                    await radios[0].check()
                                except Exception:
                                    pass
                            continue
                    except Exception:
                        pass

                    # Checkboxes (select up to 2)
                    try:
                        checkboxes = await block.locator('input[type="checkbox"]').all()
                        if len(checkboxes) > 0:
                            selected = 0
                            label_locator = block.locator('label')
                            count_labels = await label_locator.count()
                            for i in range(min(count_labels, 8)):
                                if selected >= 2:
                                    break
                                txt = (await label_locator.nth(i).text_content() or '').strip().lower()
                                if any(bad in txt for bad in ['prefer not', 'none of the above', 'none']):
                                    continue
                                try:
                                    await label_locator.nth(i).click()
                                    selected += 1
                                except Exception:
                                    continue
                            if selected == 0:
                                try:
                                    await checkboxes[0].check()
                                except Exception:
                                    pass
                            continue
                    except Exception:
                        pass

                    # Select dropdowns
                    try:
                        selects = await block.locator('select').all()
                        for sel in selects[:3]:
                            try:
                                # Choose the first non-empty option
                                options = await sel.locator('option').all()
                                chosen_value = None
                                for opt in options:
                                    val = await opt.get_attribute('value')
                                    if val and val.strip():
                                        chosen_value = val
                                        break
                                if chosen_value:
                                    await sel.select_option(value=chosen_value)
                            except Exception:
                                continue
                    except Exception:
                        pass

                    # Short text inputs
                    try:
                        text_inputs = await block.locator('input[type="text"], textarea').all()
                        for ti in text_inputs[:2]:
                            try:
                                await ti.fill('N/A')
                            except Exception:
                                continue
                    except Exception:
                        pass

            # Try to click Next/Continue
            next_selectors = [
                'button.sg-button-next',
                'a.sg-next-button',
                'button:has-text("Next")',
                'button:has-text("Continue")',
                'input[type="submit"][value*="Next"]',
                'input[type="submit"][value*="Continue"]',
                'button[title="Next"]',
                '#sg_NextButton',
                '.action-bar button:has-text("Next")'
            ]
            clicked = False
            for sel in next_selectors:
                try:
                    btn = self.page.locator(sel).first
                    if await btn.count() == 0:
                        continue
                    try:
                        async with self.page.expect_navigation(wait_until='domcontentloaded', timeout=12000):
                            await btn.click()
                        clicked = True
                        print(f"✅ Clicked Next via selector: {sel}")
                        break
                    except Exception as click_err:
                        # Try JS click
                        try:
                            handle = await btn.element_handle()
                            if handle:
                                await self.page.evaluate('(b) => b.click()', handle)
                                await asyncio.sleep(2)
                                clicked = True
                                print(f"✅ JS-clicked Next via selector: {sel}")
                                break
                        except Exception:
                            print(f"⚠️ Next click failed for {sel}: {click_err}")
                            continue
                except Exception:
                    continue

            if not clicked:
                # Keyboard fallback
                try:
                    await self.page.keyboard.press('Enter')
                    await asyncio.sleep(1.5)
                except Exception:
                    pass

        except Exception as e:
            print(f"⚠️ GetWizer/Alchemer router processing warning: {e}")

    async def handle_samplicio_verification(self) -> None:
        """Handle Samplicio/DataDome RespondentAuthentication (captcha-delivery.com) step."""
        try:
            url = (self.page.url or '').lower()
            if (
                'respondentauthentication.aspx' not in url
                and 'captcha-delivery' not in url
                and 'captcha-delivery.com' not in url
            ):
                # Heuristic: proceed if DataDome artifacts are present even if URL hasn't switched yet
                try:
                    body_text = (await self.page.text_content('body') or '').lower()
                except Exception:
                    body_text = ''
                dd_artifacts_present = False
                try:
                    if await self.page.locator('button:has-text("Retry"), a:has-text("Submit feedback")').count() > 0:
                        dd_artifacts_present = True
                except Exception:
                    pass
                if 'verification required' not in body_text and not dd_artifacts_present:
                    return
            print("🔎 Detected Samplicio/DataDome verification. Trying to proceed...")
            try:
                await self.page.wait_for_load_state('domcontentloaded', timeout=10000)
            except Exception:
                pass

            # Try to locate the DataDome iframe
            dd_frame = None
            try:
                for f in self.page.frames:
                    if any(h in (f.url or '') for h in [
                        'captcha-delivery.com', 'geo.captcha-delivery.com', 'ct.captcha-delivery.com']):
                        dd_frame = f
                        break
            except Exception:
                dd_frame = None

            # NEW: Handle slider CAPTCHAs specifically
            if await self.handle_slider_captcha(dd_frame or self.page):
                print("✅ Slider CAPTCHA handled successfully")
                return

            # Attempt to interact with DataDome "Submit feedback" flow when present
            async def try_feedback(ctx) -> bool:
                try:
                    # Sometimes feedback trigger is a link/button with this text
                    feedback_triggers = [
                        'button:has-text("Submit feedback")',
                        'a:has-text("Submit feedback")',
                        'button:has-text("Need help?")',
                        'a:has-text("Need help?")',
                        'button.dd-feedback-button',
                        '[data-dd-action="open-feedback"]'
                    ]
                    trigger = None
                    for sel in feedback_triggers:
                        loc = ctx.locator(sel).first
                        if await loc.count() > 0:
                            trigger = loc
                            break
                    # If not immediately visible, also scan for visible text cues
                    if not trigger:
                        try:
                            page_text = (await ctx.locator('body').text_content() or '').lower()
                            if 'submit feedback' not in page_text and 'why are you seeing this page' not in page_text:
                                return False
                        except Exception:
                            return False

                    # Open feedback modal/panel
                    try:
                        if trigger:
                            await trigger.click()
                        else:
                            # Try pressing Enter on body to reveal focus controls (rare)
                            await self.page.keyboard.press('Tab')
                            await asyncio.sleep(0.2)
                    except Exception:
                        pass
                    await asyncio.sleep(0.6)

                    # Pick the reason: "No success after multiple attempts" preferred
                    reason_locators = [
                        'label:has-text("No success after multiple attempts")',
                        'label:has-text("multiple attempts")',
                        'label[for*="no_success" i]'
                    ]
                    clicked_reason = False
                    for sel in reason_locators:
                        try:
                            lab = ctx.locator(sel).first
                            if await lab.count() > 0:
                                await lab.click()
                                clicked_reason = True
                                break
                        except Exception:
                            continue
                    if not clicked_reason:
                        # Fallback: first visible radio
                        try:
                            radio = ctx.locator('input[type="radio"]').first
                            if await radio.count() > 0:
                                try:
                                    await radio.check()
                                except Exception:
                                    await radio.click(force=True)
                                clicked_reason = True
                        except Exception:
                            pass

                    # Fill the comment textarea if present
                    try:
                        textarea = ctx.locator('textarea, textarea[name="comment"], textarea[id*="feedback" i]').first
                        if await textarea.count() > 0:
                            message = "No success after multiple attempts. Please review."
                            try:
                                await textarea.fill("")
                            except Exception:
                                pass
                            await textarea.fill(message)
                            await asyncio.sleep(0.2)
                    except Exception:
                        pass

                    # Click Send/Submit inside the feedback UI
                    send_selectors = [
                        'button:has-text("Send")',
                        'button:has-text("Submit")',
                        'button[type="submit"]'
                    ]
                    for sel in send_selectors:
                        try:
                            btn = ctx.locator(sel).first
                            if await btn.count() == 0:
                                continue
                            try:
                                await btn.click()
                                await asyncio.sleep(1.0)
                                print(f"✅ Submitted DataDome feedback via {sel}")
                                return True
                            except Exception:
                                try:
                                    handle = await btn.element_handle()
                                    if handle:
                                        await self.page.evaluate('(b) => b.click()', handle)
                                        await asyncio.sleep(1.0)
                                        print(f"✅ Submitted DataDome feedback via JS {sel}")
                                        return True
                                except Exception:
                                    continue
                        except Exception:
                            continue
                    return False
                except Exception:
                    return False

            selectors = [
                'button:has-text("Retry")',
                'button:has-text("Verify")',
                'button:has-text("Continue")',
                'input[type="submit"]',
                'button.ddm-button'
            ]

            async def try_click(ctx) -> bool:
                for sel in selectors:
                    try:
                        loc = ctx.locator(sel).first
                        if await loc.count() == 0:
                            continue
                        try:
                            async with self.page.expect_navigation(wait_until='domcontentloaded', timeout=15000):
                                await loc.click()
                            print(f"✅ DataDome progressed via {sel}")
                            return True
                        except Exception:
                            try:
                                handle = await loc.element_handle()
                                if handle:
                                    await self.page.evaluate('(el) => el.click()', handle)
                                    await asyncio.sleep(1.5)
                                    print(f"✅ DataDome progressed via JS {sel}")
                                    return True
                            except Exception:
                                pass
                            try:
                                await loc.focus()
                                await self.page.keyboard.press('Enter')
                                await asyncio.sleep(1.0)
                                print(f"✅ DataDome progressed via keyboard on {sel}")
                                return True
                            except Exception:
                                pass
                    except Exception:
                        continue
                return False

            # Prefer handling feedback first (if present), then try progression buttons
            handled_feedback = False
            if dd_frame and await try_feedback(dd_frame):
                handled_feedback = True
            elif await try_feedback(self.page):
                handled_feedback = True

            # Try inside the DataDome iframe first, then main page for progression
            if dd_frame and await try_click(dd_frame):
                return
            progressed = await try_click(self.page)
            if not progressed and handled_feedback:
                # After feedback, sometimes a brief wait then another attempt helps
                await asyncio.sleep(1.0)
                if dd_frame and await try_click(dd_frame):
                    return
                await try_click(self.page)
        except Exception as e:
            print(f"⚠️ Samplicio verification handler error: {e}")
    
    async def handle_slider_captcha(self, context) -> bool:
        """Handle slider CAPTCHAs specifically for DataDome and similar systems"""
        try:
            print("🔍 Looking for slider CAPTCHA elements...")
            
            # Check for puzzle piece CAPTCHA first (more complex)
            if await self.handle_puzzle_piece_captcha(context):
                print("✅ Puzzle piece CAPTCHA handled successfully")
                return True
            
            # Common slider CAPTCHA selectors
            slider_selectors = [
                '[data-dd-slider]',
                '.dd-slider',
                '.slider-container',
                '[class*="slider"]',
                '[class*="captcha"]',
                'input[type="range"]',
                '.dd-range-slider',
                '[data-dd-action="slider"]'
            ]
            
            # Look for slider elements
            slider_found = False
            for selector in slider_selectors:
                try:
                    slider = context.locator(selector).first
                    if await slider.count() > 0:
                        slider_found = True
                        print(f"🎯 Found slider element: {selector}")
                        break
                except Exception:
                    continue
            
            if not slider_found:
                # Try to find by text content indicating slider CAPTCHA
                try:
                    page_text = (await context.locator('body').text_content() or '').lower()
                    if any(keyword in page_text for keyword in ['slide to verify', 'drag to verify', 'move slider', 'captcha verification']):
                        slider_found = True
                        print("🎯 Detected slider CAPTCHA by text content")
                except Exception:
                    pass
            
            if not slider_found:
                return False
            
            # Try multiple approaches to solve the slider
            print("🔄 Attempting to solve slider CAPTCHA...")
            
            # Approach 1: Direct slider interaction
            for selector in slider_selectors:
                try:
                    slider = context.locator(selector).first
                    if await slider.count() == 0:
                        continue
                    
                    # Get slider dimensions
                    try:
                        box = await slider.bounding_box()
                        if box:
                            # Calculate target position (usually right side)
                            start_x = box['x'] + box['width'] * 0.1  # Start at 10%
                            end_x = box['x'] + box['width'] * 0.9   # End at 90%
                            center_y = box['y'] + box['height'] * 0.5
                            
                            print(f"🎯 Slider dimensions: {box['width']}x{box['height']}")
                            print(f"🔄 Moving slider from {start_x:.1f} to {end_x:.1f}")
                            
                            # Move mouse to start position
                            await self.page.mouse.move(start_x, center_y)
                            await asyncio.sleep(0.2)
                            
                            # Click and drag to end position
                            await self.page.mouse.down()
                            await asyncio.sleep(0.1)
                            
                            # Move to end position with human-like motion
                            steps = 10
                            for i in range(1, steps + 1):
                                x = start_x + (end_x - start_x) * (i / steps)
                                # Add slight randomness to y position
                                y = center_y + random.uniform(-2, 2)
                                await self.page.mouse.move(x, y)
                                await asyncio.sleep(random.uniform(0.05, 0.15))
                            
                            await self.page.mouse.up()
                            print("✅ Slider moved successfully")
                            
                            # Wait for verification
                            await asyncio.sleep(2)
                            
                            # Check if verification succeeded
                            try:
                                success_indicators = [
                                    'button:has-text("Continue")',
                                    'button:has-text("Verify")',
                                        'button:has-text("Proceed")',
                                        '.dd-success',
                                        '[data-dd-status="success"]'
                                    ]
                                    
                                for indicator in success_indicators:
                                    success_elem = context.locator(indicator).first
                                    if await success_elem.count() > 0:
                                        print("✅ Slider CAPTCHA verification successful")
                                        return True
                            except Exception:
                                pass
                            
                            return True  # Assume success if no errors
                            
                    except Exception as e:
                        print(f"⚠️ Error with slider dimensions: {e}")
                        continue
                        
                except Exception as e:
                    print(f"⚠️ Error with slider selector {selector}: {e}")
                    continue
            
            # Approach 2: JavaScript-based slider manipulation
            try:
                js_code = """
                () => {
                    // Find slider elements
                    const sliders = document.querySelectorAll('[data-dd-slider], .dd-slider, .slider-container, input[type="range"]');
                    if (sliders.length === 0) return false;
                    
                    for (const slider of sliders) {
                        try {
                            // Try to set value directly
                            if (slider.type === 'range') {
                                slider.value = slider.max || 100;
                                slider.dispatchEvent(new Event('input', { bubbles: true }));
                                slider.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                            
                            // Try to trigger slider events
                            const event = new MouseEvent('mousedown', {
                                bubbles: true,
                                cancelable: true,
                                view: window
                            });
                            slider.dispatchEvent(event);
                            
                            // Simulate drag
                            const moveEvent = new MouseEvent('mousemove', {
                                bubbles: true,
                                cancelable: true,
                                view: window,
                                clientX: slider.offsetLeft + slider.offsetWidth
                            });
                            slider.dispatchEvent(moveEvent);
                            
                            // Release
                            const upEvent = new MouseEvent('mouseup', {
                                bubbles: true,
                                cancelable: true,
                                view: window
                            });
                            slider.dispatchEvent(upEvent);
                            
                            return true;
                        } catch (e) {
                            console.log('Slider manipulation error:', e);
                        }
                    }
                    return false;
                }
                """
                
                result = await context.evaluate(js_code)
                if result:
                    print("✅ JavaScript slider manipulation attempted")
                    await asyncio.sleep(2)
                    return True
                    
            except Exception as e:
                print(f"⚠️ JavaScript slider manipulation failed: {e}")
            
            # Approach 3: Try to find and click verification buttons
            try:
                verify_buttons = [
                    'button:has-text("Verify")',
                    'button:has-text("Continue")',
                    'button:has-text("Proceed")',
                    'button:has-text("Submit")',
                    '.dd-verify-btn',
                    '[data-dd-action="verify"]'
                ]
                
                for button_selector in verify_buttons:
                    try:
                        button = context.locator(button_selector).first
                        if await button.count() > 0:
                            await button.click()
                            print(f"✅ Clicked verification button: {button_selector}")
                            await asyncio.sleep(2)
                            return True
                    except Exception:
                        continue
                        
            except Exception as e:
                print(f"⚠️ Verification button click failed: {e}")
            
            print("⚠️ All slider CAPTCHA approaches failed")
            return False
            
        except Exception as e:
            print(f"⚠️ Slider CAPTCHA handler error: {e}")
            return False
    
    async def handle_puzzle_piece_captcha(self, context) -> bool:
        """Handle puzzle piece CAPTCHAs (drag and drop jigsaw puzzles)"""
        try:
            print("🧩 Looking for puzzle piece CAPTCHA...")
            
            # Check for puzzle piece CAPTCHA indicators
            puzzle_indicators = [
                'text:has("Slide right to complete the puzzle")',
                'text:has("Verification Required")',
                'text:has("complete the puzzle")',
                '[class*="puzzle"]',
                '[class*="jigsaw"]',
                '[class*="drag"]',
                '[class*="drop"]'
            ]
            
            puzzle_found = False
            for indicator in puzzle_indicators:
                try:
                    element = context.locator(indicator).first
                    if await element.count() > 0:
                        puzzle_found = True
                        print(f"🎯 Found puzzle piece CAPTCHA indicator: {indicator}")
                        break
                except Exception:
                    continue
            
            # Also check page text for puzzle indicators
            if not puzzle_found:
                try:
                    page_text = (await context.locator('body').text_content() or '').lower()
                    puzzle_keywords = [
                        'slide right to complete the puzzle',
                        'verification required',
                        'complete the puzzle',
                        'puzzle piece',
                        'drag and drop',
                        'jigsaw'
                    ]
                    if any(keyword in page_text for keyword in puzzle_keywords):
                        puzzle_found = True
                        print("🎯 Detected puzzle piece CAPTCHA by text content")
                except Exception:
                    pass
            
            if not puzzle_found:
                return False
            
            print("🧩 Attempting to solve puzzle piece CAPTCHA...")
            
            # Look for the puzzle piece (draggable element)
            puzzle_piece_selectors = [
                '[draggable="true"]',
                '[class*="piece"]',
                '[class*="puzzle"]',
                '[class*="draggable"]',
                'img[class*="piece"]',
                'div[class*="piece"]'
            ]
            
            puzzle_piece = None
            for selector in puzzle_piece_selectors:
                try:
                    piece = context.locator(selector).first
                    if await piece.count() > 0:
                        puzzle_piece = piece
                        print(f"🎯 Found puzzle piece: {selector}")
                        break
                except Exception:
                    continue
            
            if not puzzle_piece:
                # Try to find by looking for elements that might be draggable
                try:
                    # Look for elements with specific attributes or classes
                    potential_pieces = context.locator('*').all()
                    for i, element in enumerate(potential_pieces[:20]):  # Check first 20 elements
                        try:
                            tag_name = await element.evaluate('el => el.tagName')
                            class_name = await element.get_attribute('class') or ''
                            style = await element.get_attribute('style') or ''
                            
                            # Look for visual indicators of puzzle pieces
                            if (tag_name in ['IMG', 'DIV', 'SPAN'] and 
                                any(keyword in class_name.lower() for keyword in ['piece', 'puzzle', 'drag']) or
                                'position: absolute' in style or 'z-index' in style):
                                puzzle_piece = element
                                print(f"🎯 Found potential puzzle piece by attributes")
                                break
                        except Exception:
                            continue
                except Exception:
                    pass
            
            if not puzzle_piece:
                print("⚠️ Could not find puzzle piece element")
                return False
            
            # Look for the target area (where the piece should be dropped)
            target_area_selectors = [
                '[class*="target"]',
                '[class*="drop"]',
                '[class*="zone"]',
                '[class*="area"]',
                'div[style*="border"]',
                'div[style*="outline"]'
            ]
            
            target_area = None
            for selector in target_area_selectors:
                try:
                    area = context.locator(selector).first
                    if await area.count() > 0:
                        target_area = area
                        print(f"🎯 Found target area: {selector}")
                        break
                except Exception:
                    continue
            
            # If no specific target area found, try to estimate based on page layout
            if not target_area:
                try:
                    # Look for areas with yellow outline or border (common in puzzle CAPTCHAs)
                    yellow_elements = context.locator('*').all()
                    for i, element in enumerate(yellow_elements[:30]):  # Check first 30 elements
                        try:
                            style = await element.get_attribute('style') or ''
                            class_name = await element.get_attribute('class') or ''
                            
                            if ('border' in style and 'yellow' in style.lower()) or \
                               ('outline' in style and 'yellow' in style.lower()) or \
                               ('background' in style and 'yellow' in style.lower()):
                                target_area = element
                                print("🎯 Found target area by yellow styling")
                                break
                        except Exception:
                            continue
                except Exception:
                    pass
            
            # Get puzzle piece position
            try:
                piece_box = await puzzle_piece.bounding_box()
                if not piece_box:
                    print("⚠️ Could not get puzzle piece position")
                    return False
                
                piece_center_x = piece_box['x'] + piece_box['width'] / 2
                piece_center_y = piece_box['y'] + piece_box['height'] / 2
                
                print(f"🎯 Puzzle piece position: ({piece_center_x:.1f}, {piece_center_y:.1f})")
                
                # Calculate target position
                if target_area:
                    target_box = await target_area.bounding_box()
                    if target_box:
                        target_x = target_box['x'] + target_box['width'] / 2
                        target_y = target_box['y'] + target_box['height'] / 2
                        print(f"🎯 Target area position: ({target_x:.1f}, {target_y:.1f})")
                    else:
                        # Estimate target position (usually to the right)
                        target_x = piece_center_x + 200  # Move 200px to the right
                        target_y = piece_center_y
                        print(f"🎯 Estimated target position: ({target_x:.1f}, {target_y:.1f})")
                else:
                    # Default: move to the right
                    target_x = piece_center_x + 200
                    target_y = piece_center_y
                    print(f"🎯 Default target position: ({target_x:.1f}, {target_y:.1f})")
                
                # Perform the drag and drop
                print(f"🔄 Dragging puzzle piece from ({piece_center_x:.1f}, {piece_center_y:.1f}) to ({target_x:.1f}, {target_y:.1f})")
                
                # Move to puzzle piece
                await self.page.mouse.move(piece_center_x, piece_center_y)
                await asyncio.sleep(0.3)
                
                # Click and hold
                await self.page.mouse.down()
                await asyncio.sleep(0.2)
                
                # Drag to target with human-like motion
                steps = 15
                for i in range(1, steps + 1):
                    progress = i / steps
                    # Use easing function for more natural movement
                    eased_progress = 1 - (1 - progress) ** 3
                    
                    current_x = piece_center_x + (target_x - piece_center_x) * eased_progress
                    current_y = piece_center_y + (target_y - piece_center_y) * eased_progress
                    
                    # Add slight randomness for human-like movement
                    current_x += random.uniform(-3, 3)
                    current_y += random.uniform(-2, 2)
                    
                    await self.page.mouse.move(current_x, current_y)
                    await asyncio.sleep(random.uniform(0.05, 0.12))
                
                # Release at target
                await self.page.mouse.up()
                print("✅ Puzzle piece dragged successfully")
                
                # Wait for verification
                await asyncio.sleep(2)
                
                # Check if verification succeeded
                try:
                    success_indicators = [
                        'text:has("Verification successful")',
                        'text:has("Verification complete")',
                        'text:has("Success")',
                        'button:has-text("Continue")',
                        'button:has-text("Verify")',
                        'button:has-text("Proceed")',
                        '[class*="success"]',
                        '[class*="complete"]'
                    ]
                    
                    for indicator in success_indicators:
                        success_elem = context.locator(indicator).first
                        if await success_elem.count() > 0:
                            print("✅ Puzzle piece CAPTCHA verification successful")
                            return True
                except Exception:
                    pass
                
                # Also check if the puzzle piece disappeared or moved
                try:
                    new_piece_box = await puzzle_piece.bounding_box()
                    if not new_piece_box or new_piece_box['x'] != piece_box['x']:
                        print("✅ Puzzle piece moved successfully")
                        return True
                except Exception:
                    pass
                
                return True  # Assume success if no errors
                
            except Exception as e:
                print(f"⚠️ Error during puzzle piece drag: {e}")
                return False
            
        except Exception as e:
            print(f"⚠️ Puzzle piece CAPTCHA handler error: {e}")
            return False
    
    async def detect_and_handle_captcha(self) -> bool:
        """General CAPTCHA detection and handling method"""
        try:
            print("🔍 Scanning for CAPTCHA elements...")
            
            # Check for various CAPTCHA types
            captcha_indicators = [
                # Text-based CAPTCHAs
                'img[src*="captcha"]',
                'img[alt*="captcha"]',
                '.captcha-image',
                '#captcha',
                '[class*="captcha"]',
                
                # Slider CAPTCHAs
                '[data-dd-slider]',
                '.dd-slider',
                '.slider-container',
                'input[type="range"]',
                
                # Checkbox CAPTCHAs
                '.recaptcha-checkbox',
                '[class*="recaptcha"]',
                'iframe[src*="recaptcha"]',
                
                # DataDome specific
                'iframe[src*="captcha-delivery"]',
                '.dd-verification',
                '[data-dd-action]'
            ]
            
            captcha_found = False
            for selector in captcha_indicators:
                try:
                    element = self.page.locator(selector).first
                    if await element.count() > 0:
                        captcha_found = True
                        print(f"🎯 Found CAPTCHA element: {selector}")
                        break
                except Exception:
                    continue
            
            # Also check page text for CAPTCHA indicators
            if not captcha_found:
                try:
                    page_text = (await self.page.text_content('body') or '').lower()
                    captcha_keywords = [
                        'captcha', 'verification', 'verify', 'robot', 'human',
                        'slide to verify', 'drag to verify', 'move slider',
                        'i am not a robot', 'security check'
                    ]
                    if any(keyword in page_text for keyword in captcha_keywords):
                        captcha_found = True
                        print("🎯 Detected CAPTCHA by text content")
                except Exception:
                    pass
            
            if not captcha_found:
                return False
            
            print("🔄 CAPTCHA detected, attempting to solve...")
            
            # Try different CAPTCHA solving approaches based on type
            if await self.handle_slider_captcha(self.page):
                return True
            
            # Try OCR-based text CAPTCHA solving if available
            if hasattr(self, 'captcha_solver') and self.captcha_solver:
                try:
                    print("🔍 Attempting OCR-based CAPTCHA solving...")
                    # This would use the FreeCaptchaSolver for text CAPTCHAs
                    # Implementation depends on the specific CAPTCHA type
                    return True
                except Exception as e:
                    print(f"⚠️ OCR CAPTCHA solving failed: {e}")
            
            # Try to find and click common CAPTCHA completion buttons
            completion_buttons = [
                'button:has-text("Verify")',
                'button:has-text("Continue")',
                'button:has-text("Submit")',
                'button:has-text("Proceed")',
                '.captcha-submit',
                '[data-captcha-action="submit"]'
            ]
            
            for button_selector in completion_buttons:
                try:
                    button = self.page.locator(button_selector).first
                    if await button.count() > 0:
                        await button.click()
                        print(f"✅ Clicked CAPTCHA completion button: {button_selector}")
                        await asyncio.sleep(2)
                        return True
                except Exception:
                    continue
            
            print("⚠️ CAPTCHA solving attempts failed")
            return False
            
        except Exception as e:
            print(f"⚠️ CAPTCHA detection/handling error: {e}")
            return False
    
    async def detect_survey_platform(self) -> str:
        """Detect which survey platform we're on"""
        try:
            url = self.page.url.lower()
            
            # Check for MetrixMatrix
            if 'metrixmatrix.com' in url or 'survey.metrixmatrix.com' in url:
                return 'metrixmatrix'
            
            # Check for Samplicio
            if 'samplicio.us' in url or 'samplicio.com' in url:
                return 'samplicio'
            
            # Check for Dynata
            if 'ssisurveys.com' in url or 'dynata.com' in url:
                return 'dynata'
            
            # Check for PureSpectrum
            if 'spectrumsurveys.com' in url or 'purespectrum' in url:
                return 'purespectrum'
            
            # Check for GetWizer/SurveyGizmo
            if 'getwizer.com' in url or 'surveygizmo.com' in url or 'alchemer' in url:
                return 'getwizer'
            
            # Check for Ipsos
            if 'ipsosinteractive.com' in url:
                return 'ipsos'
            
            # Default to CPX
            return 'cpx'
            
        except Exception as e:
            print(f"⚠️ Error detecting survey platform: {e}")
            return 'unknown'
    
    async def handle_metrixmatrix_survey(self) -> Dict[str, Any]:
        """Handle MetrixMatrix survey platform specifically"""
        try:
            print("🎯 Detected MetrixMatrix survey platform")
            
            # Wait for the survey to load
            await asyncio.sleep(2)
            
            # Check for CAPTCHAs first
            if await self.detect_and_handle_captcha():
                print("✅ CAPTCHA resolved in MetrixMatrix survey")
                await asyncio.sleep(1)
            
            questions_answered = 0
            max_questions = 50  # Reasonable limit for router surveys
            
            while questions_answered < max_questions:
                # Check if survey is complete
                try:
                    # Look for completion indicators
                    completion_indicators = [
                        'input[value*="submit"]',
                        'button:has-text("Submit")',
                        'button:has-text("Finish")',
                        'button:has-text("Complete")',
                        '.survey-complete',
                        '[class*="complete"]'
                    ]
                    
                    for indicator in completion_indicators:
                        if await self.page.locator(indicator).count() > 0:
                            print("✅ MetrixMatrix survey completed")
                            return {'status': 'completed', 'platform': 'metrixmatrix'}
                    
                except Exception:
                    pass
                
                # Handle current MetrixMatrix question
                if not await self.handle_metrixmatrix_question():
                    print("❌ Failed to handle MetrixMatrix question")
                    break
                
                questions_answered += 1
                print(f"🎯 MetrixMatrix question {questions_answered} answered")
                
                # Wait for page update
                await asyncio.sleep(2)
            
            print(f"⚠️ MetrixMatrix survey stopped after {questions_answered} questions")
            return {'status': 'incomplete', 'questions_answered': questions_answered, 'platform': 'metrixmatrix'}
            
        except Exception as e:
            print(f"❌ Error handling MetrixMatrix survey: {e}")
            return {'status': 'error', 'reason': str(e), 'platform': 'metrixmatrix'}
    
    async def handle_sampleeye_survey(self) -> Dict[str, Any]:
        """Handle SampleEye survey platform specifically"""
        try:
            print("🎯 Detected SampleEye survey platform")
            
            # Wait for the survey to load
            await asyncio.sleep(2)
            
            # Check for CAPTCHAs first
            if await self.detect_and_handle_captcha():
                print("✅ CAPTCHA resolved in SampleEye survey")
                await asyncio.sleep(1)
            
            questions_answered = 0
            max_questions = 50  # Reasonable limit for qualification surveys
            
            while questions_answered < max_questions:
                # Check if survey is complete
                try:
                    # Look for completion indicators
                    completion_indicators = [
                        'button:has-text("Submit")',
                        'button:has-text("Finish")',
                        'button:has-text("Complete")',
                        '.survey-complete',
                        '[class*="complete"]',
                        'text:has("Thank you")',
                        'text:has("Survey complete")'
                    ]
                    
                    for indicator in completion_indicators:
                        if await self.page.locator(indicator).count() > 0:
                            print("✅ SampleEye survey completed")
                            return {'status': 'completed', 'platform': 'sampleeye'}
                    
                except Exception:
                    pass
                
                # Handle current SampleEye question
                if not await self.handle_sampleeye_question():
                    print("❌ Failed to handle SampleEye question")
                    break
                
                questions_answered += 1
                print(f"🎯 SampleEye question {questions_answered} answered")
                
                # Wait for page update
                await asyncio.sleep(2)
            
            print(f"⚠️ SampleEye survey stopped after {questions_answered} questions")
            return {'status': 'incomplete', 'questions_answered': questions_answered, 'platform': 'sampleeye'}
            
        except Exception as e:
            print(f"❌ Error handling SampleEye survey: {e}")
            return {'status': 'error', 'reason': str(e), 'platform': 'sampleeye'}
    
    async def handle_sampleeye_question(self) -> bool:
        """Handle a single SampleEye survey question"""
        try:
            # Wait for question to be visible - SampleEye might need more time
            await asyncio.sleep(3)
            
            # Look for question text with more comprehensive selectors
            question_selectors = [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                '.question-text',
                '.survey-question',
                '[class*="question"]',
                'p:contains("?")',
                'div:contains("?")',
                'label',
                'span',
                'div',
                'p'
            ]
            
            question_text = ""
            for selector in question_selectors:
                try:
                    question_elem = self.page.locator(selector).first
                    if await question_elem.count() > 0:
                        question_text = await question_elem.text_content() or ""
                        if question_text.strip():
                            print(f"📝 SampleEye Question: {question_text[:100]}...")
                            break
                except Exception:
                    continue
            
            # If no question found with selectors, try to find any text that looks like a question
            if not question_text.strip():
                try:
                    # Get all text content and look for question-like patterns
                    page_text = await self.page.text_content('body') or ""
                    lines = page_text.split('\n')
                    
                    for line in lines:
                        line = line.strip()
                        if (len(line) > 10 and 
                            any(qword in line.lower() for qword in ['age', 'years old', 'how old', 'what is', 'please', 'select', 'choose']) and
                            not any(skip in line.lower() for skip in ['loading', 'please wait', 'error', 'captcha'])):
                            question_text = line
                            print(f"📝 SampleEye Question (fallback): {question_text[:100]}...")
                            break
                except Exception as e:
                    print(f"⚠️ Fallback question detection failed: {e}")
            
            # Check for different question types
            if await self.page.locator('input[type="radio"]').count() > 0:
                print("🎯 SampleEye: Found radio button question")
                return await self.handle_radio_question_sampleeye(question_text)
            elif await self.page.locator('input[type="text"]').count() > 0:
                print("🎯 SampleEye: Found text input question")
                return await self.handle_text_question_sampleeye(question_text)
            elif await self.page.locator('input[type="checkbox"]').count() > 0:
                print("🎯 SampleEye: Found checkbox question")
                return await self.handle_checkbox_question_sampleeye(question_text)
            else:
                print("⚠️ Unknown SampleEye question type - debugging page content...")
                
                # Debug: List all input elements on the page
                try:
                    all_inputs = await self.page.locator('input, textarea, select').all()
                    print(f"🔍 SampleEye Debug: Found {len(all_inputs)} input elements")
                    
                    for i, inp in enumerate(all_inputs[:10]):  # Show first 10
                        try:
                            tag_name = await inp.evaluate('el => el.tagName')
                            input_type = await inp.get_attribute('type') or 'text'
                            input_id = await inp.get_attribute('id') or 'no-id'
                            input_name = await inp.get_attribute('name') or 'no-name'
                            is_visible = await inp.is_visible()
                            is_enabled = await inp.is_enabled()
                            
                            print(f"   {i}: {tag_name.lower()}[type={input_type}] id='{input_id}' name='{input_name}' visible={is_visible} enabled={is_enabled}")
                        except Exception as debug_e:
                            print(f"   {i}: Error getting input info: {debug_e}")
                    
                    # Also check for any text that might be a question
                    page_text = await self.page.text_content('body') or ""
                    print(f"🔍 SampleEye Debug: Page text preview: {page_text[:200]}...")
                    
                except Exception as debug_e:
                    print(f"🔍 SampleEye Debug error: {debug_e}")
                
                return False
                
        except Exception as e:
            print(f"❌ Error handling SampleEye question: {e}")
            return False
    
    async def handle_text_question_sampleeye(self, question: str) -> bool:
        """Handle SampleEye text input questions (like age)"""
        try:
            print(f"📝 Handling SampleEye text question: {question[:50]}...")
            
            # Find the text input field
            input_selectors = [
                'input[type="text"]',
                'input:not([type])',
                '.form-control',
                '[class*="input"]'
            ]
            
            text_input = None
            for selector in input_selectors:
                try:
                    input_elem = self.page.locator(selector).first
                    if await input_elem.count() > 0 and await input_elem.is_visible():
                        text_input = input_elem
                        print(f"✅ Found SampleEye text input: {selector}")
                        break
                except Exception:
                    continue
            
            if not text_input:
                print("❌ No text input found in SampleEye question")
                return False
            
            # Generate appropriate response based on question
            if 'age' in question.lower() or 'years old' in question.lower():
                if self.persona and 'about_you' in self.persona:
                    age = self.persona['about_you'].get('age', 25)
                    response = str(age)
                else:
                    response = str(random.randint(25, 45))
                print(f"🎂 SampleEye age response: {response}")
            else:
                # Generic text response
                response = await self.generate_text_response(question, "")
            
            # Fill the input field
            await text_input.fill(response)
            await asyncio.sleep(1)
            
            # Look for Next/Submit button
            button_selectors = [
                'button:has-text("Next")',
                'button:has-text("Submit")',
                'button:has-text("Continue")',
                'input[type="submit"]',
                '.btn-primary',
                '[class*="btn"]'
            ]
            
            for selector in button_selectors:
                try:
                    button = self.page.locator(selector).first
                    if await button.count() > 0 and await button.is_visible():
                        await button.click()
                        print(f"✅ Clicked SampleEye button: {selector}")
                        await asyncio.sleep(2)
                        return True
                except Exception:
                    continue
            
            print("⚠️ No Next/Submit button found in SampleEye question")
            return False
            
        except Exception as e:
            print(f"❌ Error handling SampleEye text question: {e}")
            return False
    
    async def handle_radio_question_sampleeye(self, question: str) -> bool:
        """Handle SampleEye radio button questions"""
        try:
            print(f"📝 Handling SampleEye radio question: {question[:50]}...")
            
            # Find radio buttons
            radio_elements = self.page.locator('input[type="radio"]')
            count = await radio_elements.count()
            
            if count == 0:
                print("❌ No radio buttons found in SampleEye question")
                return False
            
            print(f"🎯 Found {count} SampleEye radio options")
            
            # Get all options with their labels
            options = []
            for i in range(count):
                try:
                    radio = radio_elements.nth(i)
                    radio_id = await radio.get_attribute('id') or f"radio_{i}"
                    
                    # Try to find associated label
                    label = None
                    try:
                        label = self.page.locator(f'label[for="{radio_id}"]').first
                        label_text = await label.text_content() or "" if await label.count() > 0 else f"Option {i+1}"
                    except Exception:
                        label_text = f"Option {i+1}"
                    
                    options.append({
                        'id': radio_id,
                        'value': await radio.get_attribute('value') or str(i+1),
                        'text': label_text.strip(),
                        'element': radio
                    })
                except Exception as e:
                    print(f"⚠️ Error processing SampleEye radio option {i}: {e}")
                    continue
            
            # Select best option based on persona
            selected_option = await self.select_sampleeye_option(question, options)
            
            if selected_option:
                try:
                    await selected_option['element'].check()
                    print(f"✅ Selected SampleEye option: {selected_option['text']}")
                    
                    # Look for Next/Submit button
                    button_selectors = [
                        'button:has-text("Next")',
                        'button:has-text("Submit")',
                        'button:has-text("Continue")',
                        'input[type="submit"]',
                        '.btn-primary',
                        '[class*="btn"]'
                    ]
                    
                    for selector in button_selectors:
                        try:
                            button = self.page.locator(selector).first
                            if await button.count() > 0 and await button.is_visible():
                                await button.click()
                                print(f"✅ Clicked SampleEye button: {selector}")
                                await asyncio.sleep(2)
                                return True
                        except Exception:
                            continue
                    
                    print("⚠️ No Next/Submit button found in SampleEye question")
                    return False
                    
                except Exception as e:
                    print(f"❌ Error selecting SampleEye option: {e}")
                    return False
            else:
                print("⚠️ No option selected for SampleEye question")
                return False
                
        except Exception as e:
            print(f"❌ Error handling SampleEye radio question: {e}")
            return False
    
    async def handle_checkbox_question_sampleeye(self, question: str) -> bool:
        """Handle SampleEye checkbox questions"""
        try:
            print(f"📝 Handling SampleEye checkbox question: {question[:50]}...")
            
            # Find checkboxes
            checkbox_elements = self.page.locator('input[type="checkbox"]')
            count = await checkbox_elements.count()
            
            if count == 0:
                print("❌ No checkboxes found in SampleEye question")
                return False
            
            print(f"🎯 Found {count} SampleEye checkbox options")
            
            # Select first few options (common for qualification surveys)
            selected_count = min(2, count)
            for i in range(selected_count):
                try:
                    checkbox = checkbox_elements.nth(i)
                    await checkbox.check()
                    print(f"✅ Selected SampleEye checkbox {i+1}")
                except Exception as e:
                    print(f"⚠️ Error selecting checkbox {i+1}: {e}")
                    continue
            
            # Look for Next/Submit button
            button_selectors = [
                'button:has-text("Next")',
                'button:has-text("Submit")',
                'button:has-text("Continue")',
                'input[type="submit"]',
                '.btn-primary',
                '[class*="btn"]'
            ]
            
            for selector in button_selectors:
                try:
                    button = self.page.locator(selector).first
                    if await button.count() > 0 and await button.is_visible():
                        await button.click()
                        print(f"✅ Clicked SampleEye button: {selector}")
                        await asyncio.sleep(2)
                        return True
                except Exception:
                    continue
            
            print("⚠️ No Next/Submit button found in SampleEye question")
            return False
            
        except Exception as e:
            print(f"❌ Error handling SampleEye checkbox question: {e}")
            return False
    
    async def select_sampleeye_option(self, question: str, options: List[Dict]) -> Optional[Dict]:
        """Select the best option for a SampleEye question based on persona"""
        try:
            question_lower = question.lower()
            
            # Handle age questions
            if 'age' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    age = self.persona['about_you'].get('age', 25)
                    # Map age to age ranges
                    target_text = ('under 18' if age < 18 else '18-21' if 18 <= age <= 21 else '22-23' if 22 <= age <= 23 else '24-25' if 24 <= age <= 25 else '26-30' if 26 <= age <= 30 else '31-35' if 31 <= age <= 35 else '36-40' if 36 <= age <= 40 else '41-45' if 41 <= age <= 45 else '46-50' if 46 <= age <= 50 else '51-54' if 51 <= age <= 54 else '55-64' if 55 <= age <= 64 else '65-74' if 65 <= age <= 74 else '75+')
                    
                    for option in options:
                        if target_text.lower() in option['text'].lower():
                            print(f"🎯 SampleEye age-based selection: {option['text']} (persona age: {age})")
                            return option
                
                # Fallback to common age ranges
                for option in options:
                    if '26-30' in option['text'] or '25-30' in option['text']:
                        print("🎯 SampleEye fallback age selection: 26-30")
                        return option
                
            # Handle gender questions
            elif 'gender' in question_lower or 'sex' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    gender = self.persona['about_you'].get('gender', 'Male').lower()
                    for option in options:
                        option_text = option['text'].lower()
                        if gender in option_text or ('male' in gender and 'male' in option_text) or ('female' in gender and 'female' in option_text):
                            print(f"🎯 SampleEye gender-based selection: {option['text']} (persona: {gender})")
                            return option
            
            # Handle employment questions
            elif any(word in question_lower for word in ['employed', 'work', 'job', 'business']):
                for option in options:
                    if 'not' in option['text'].lower() and 'employed' in option['text'].lower():
                        print("🎯 SampleEye employment selection: Not employed")
                        return option
                for option in options:
                    if 'prefer not' not in option['text'].lower() and 'dont want' not in option['text'].lower():
                        print(f"🎯 SampleEye employment fallback: {option['text']}")
                        return option
            
            # Default selection (avoid refusal options)
            for option in options:
                if 'prefer not' not in option['text'].lower() and 'dont want' not in option['text'].lower() and 'cant' not in option['text'].lower():
                    print(f"🎯 SampleEye default selection: {option['text']}")
                    return option
            
            # Last resort
            if options:
                print(f"🎯 SampleEye last resort selection: {options[0]['text']}")
                return options[0]
            
            return None
            
        except Exception as e:
            print(f"❌ Error selecting SampleEye option: {e}")
            return None
    
    async def handle_samplecube_survey(self) -> Dict[str, Any]:
        """Handle Sample-Cube survey platform specifically"""
        try:
            print("🎯 Detected Sample-Cube survey platform")
            
            # Wait for the survey to load
            await asyncio.sleep(3)
            
            # Check for CAPTCHAs first
            if await self.detect_and_handle_captcha():
                print("✅ CAPTCHA resolved in Sample-Cube survey")
                await asyncio.sleep(1)
            
            questions_answered = 0
            max_questions = 50  # Reasonable limit for qualification surveys
            
            while questions_answered < max_questions:
                # Check if survey is complete
                try:
                    # Look for completion indicators
                    completion_indicators = [
                        'button:has-text("Submit")',
                        'button:has-text("Finish")',
                        'button:has-text("Complete")',
                        '.survey-complete',
                        '[class*="complete"]',
                        'text:has("Thank you")',
                        'text:has("Survey complete")'
                    ]
                    
                    for indicator in completion_indicators:
                        if await self.page.locator(indicator).count() > 0:
                            print("✅ Sample-Cube survey completed")
                            return {'status': 'completed', 'platform': 'samplecube'}
                    
                except Exception:
                    pass
                
                # Handle current Sample-Cube question
                if not await self.handle_samplecube_question():
                    print("❌ Failed to handle Sample-Cube question")
                    break
                
                questions_answered += 1
                print(f"🎯 Sample-Cube question {questions_answered} answered")
                
                # Wait for page update
                await asyncio.sleep(2)
            
            print(f"⚠️ Sample-Cube survey stopped after {questions_answered} questions")
            return {'status': 'incomplete', 'questions_answered': questions_answered, 'platform': 'samplecube'}
            
        except Exception as e:
            print(f"❌ Error handling Sample-Cube survey: {e}")
            return {'status': 'error', 'reason': str(e), 'platform': 'samplecube'}
    
    async def handle_samplecube_question(self) -> bool:
        """Handle a single Sample-Cube survey question"""
        try:
            # Wait for question to be visible - Sample-Cube might need more time
            await asyncio.sleep(3)
            
            # Look for question text with comprehensive selectors
            question_selectors = [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                '.question-text',
                '.survey-question',
                '[class*="question"]',
                'p:contains("?")',
                'div:contains("?")',
                'label',
                'span',
                'div',
                'p'
            ]
            
            question_text = ""
            for selector in question_selectors:
                try:
                    question_elem = self.page.locator(selector).first
                    if await question_elem.count() > 0:
                        question_text = await question_elem.text_content() or ""
                        if question_text.strip():
                            print(f"📝 Sample-Cube Question: {question_text[:100]}...")
                            break
                except Exception:
                    continue
            
            # If no question found with selectors, try to find any text that looks like a question
            if not question_text.strip():
                try:
                    # Get all text content and look for question-like patterns
                    page_text = await self.page.text_content('body') or ""
                    lines = page_text.split('\n')
                    
                    for line in lines:
                        line = line.strip()
                        if (len(line) > 10 and 
                            any(qword in line.lower() for qword in ['age', 'years old', 'how old', 'what is', 'please', 'select', 'choose']) and
                            not any(skip in line.lower() for skip in ['loading', 'please wait', 'error', 'captcha'])):
                            question_text = line
                            print(f"📝 Sample-Cube Question (fallback): {question_text[:100]}...")
                            break
                except Exception as e:
                    print(f"⚠️ Fallback question detection failed: {e}")
            
            # Check for different question types
            if await self.page.locator('input[type="radio"]').count() > 0:
                print("🎯 Sample-Cube: Found radio button question")
                return await self.handle_radio_question_samplecube(question_text)
            elif await self.page.locator('input[type="text"]').count() > 0:
                print("🎯 Sample-Cube: Found text input question")
                return await self.handle_text_question_samplecube(question_text)
            elif await self.page.locator('input[type="checkbox"]').count() > 0:
                print("🎯 Sample-Cube: Found checkbox question")
                return await self.handle_checkbox_question_samplecube(question_text)
            else:
                print("⚠️ Unknown Sample-Cube question type - debugging page content...")
                
                # Debug: List all input elements on the page
                try:
                    all_inputs = await self.page.locator('input, textarea, select').all()
                    print(f"🔍 Sample-Cube Debug: Found {len(all_inputs)} input elements")
                    
                    for i, inp in enumerate(all_inputs[:10]):  # Show first 10
                        try:
                            tag_name = await inp.evaluate('el => el.tagName')
                            input_type = await inp.get_attribute('type') or 'text'
                            input_id = await inp.get_attribute('id') or 'no-id'
                            input_name = await inp.get_attribute('name') or 'no-name'
                            is_visible = await inp.is_visible()
                            is_enabled = await inp.is_enabled()
                            
                            print(f"   {i}: {tag_name.lower()}[type={input_type}] id='{input_id}' name='{input_name}' visible={is_visible} enabled={is_enabled}")
                        except Exception as debug_e:
                            print(f"   {i}: Error getting input info: {debug_e}")
                    
                    # Also check for any text that might be a question
                    page_text = await self.page.text_content('body') or ""
                    print(f"🔍 Sample-Cube Debug: Page text preview: {page_text[:200]}...")
                    
                except Exception as debug_e:
                    print(f"🔍 Sample-Cube Debug error: {debug_e}")
                
                return False
                
        except Exception as e:
            print(f"❌ Error handling Sample-Cube question: {e}")
            return False
    
    async def handle_text_question_samplecube(self, question: str) -> bool:
        """Handle Sample-Cube text input questions (like age)"""
        try:
            print(f"📝 Handling Sample-Cube text question: {question[:50]}...")
            
            # Find the text input field
            input_selectors = [
                'input[type="text"]',
                'input:not([type])',
                '.form-control',
                '[class*="input"]'
            ]
            
            text_input = None
            for selector in input_selectors:
                try:
                    input_elem = self.page.locator(selector).first
                    if await input_elem.count() > 0 and await input_elem.is_visible():
                        text_input = input_elem
                        print(f"✅ Found Sample-Cube text input: {selector}")
                        break
                except Exception:
                    continue
            
            if not text_input:
                print("❌ No text input found in Sample-Cube question")
                return False
            
            # Generate appropriate response based on question
            if 'age' in question.lower() or 'years old' in question.lower():
                if self.persona and 'about_you' in self.persona:
                    age = self.persona['about_you'].get('age', 25)
                    response = str(age)
                else:
                    response = str(random.randint(25, 45))
                print(f"🎂 Sample-Cube age response: {response}")
            else:
                # Generic text response
                response = await self.generate_text_response(question, "")
            
            # Fill the input field
            await text_input.fill(response)
            await asyncio.sleep(1)
            
            # Look for Next/Submit button
            button_selectors = [
                'button:has-text("Next")',
                'button:has-text("Submit")',
                'button:has-text("Continue")',
                'input[type="submit"]',
                '.btn-primary',
                '[class*="btn"]'
            ]
            
            for selector in button_selectors:
                try:
                    button = self.page.locator(selector).first
                    if await button.count() > 0 and await button.is_visible():
                        await button.click()
                        print(f"✅ Clicked Sample-Cube button: {selector}")
                        await asyncio.sleep(2)
                        return True
                except Exception:
                    continue
            
            print("⚠️ No Next/Submit button found in Sample-Cube question")
            return False
            
        except Exception as e:
            print(f"❌ Error handling Sample-Cube text question: {e}")
            return False
    
    async def handle_metrixmatrix_question(self) -> bool:
        """Handle a single MetrixMatrix survey question"""
        try:
            # Wait for question to be visible
            await asyncio.sleep(1)
            
            # Look for question text
            question_selectors = [
                '.questionText',
                '.questionTextContainer .questionText',
                '[class*="question"]',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
            ]
            
            question_text = ""
            for selector in question_selectors:
                try:
                    question_elem = self.page.locator(selector).first
                    if await question_elem.count() > 0:
                        question_text = await question_elem.text_content() or ""
                        if question_text.strip():
                            print(f"📝 Question: {question_text[:100]}...")
                            break
                except Exception:
                    continue
            
            # Look for radio button options
            radio_selectors = [
                'input[type="radio"]',
                '.radioButton input[type="radio"]',
                '.choice input[type="radio"]'
            ]
            
            options = []
            for selector in radio_selectors:
                try:
                    radio_elements = self.page.locator(selector)
                    count = await radio_elements.count()
                    if count > 0:
                        print(f"🎯 Found {count} radio button options")
                        
                        # Get all options with their labels
                        for i in range(count):
                            try:
                                radio = radio_elements.nth(i)
                                radio_id = await radio.get_attribute('id') or f"radio_{i}"
                                radio_value = await radio.get_attribute('value') or str(i+1)
                                
                                # Find associated label
                                label = None
                                try:
                                    label = self.page.locator(f'label[for="{radio_id}"]').first
                                    if await label.count() > 0:
                                        label_text = await label.text_content() or ""
                                    else:
                                        label_text = f"Option {i+1}"
                                except Exception:
                                    label_text = f"Option {i+1}"
                                
                                options.append({
                                    'id': radio_id,
                                    'value': radio_value,
                                    'text': label_text.strip(),
                                    'element': radio
                                })
                                
                            except Exception as e:
                                print(f"⚠️ Error processing radio option {i}: {e}")
                                continue
                        
                        break
                        
                except Exception:
                    continue
            
            if not options:
                print("⚠️ No radio button options found")
                return False
            
            # Select an appropriate option based on persona
            selected_option = await self.select_metrixmatrix_option(question_text, options)
            
            if selected_option:
                try:
                    # Click the selected radio button
                    await selected_option['element'].check()
                    print(f"✅ Selected: {selected_option['text']}")
                    
                    # Look for and click the Next button
                    next_button_selectors = [
                        '#SurveyNavigationBottomControl_Next_ImageButton',
                        'input[title="Next"]',
                        'input[alt="Next"]',
                        '.nextButton',
                        'input[src*="next"]',
                        'button:has-text("Next")',
                        'input[type="image"][src*="next"]'
                    ]
                    
                    next_clicked = False
                    for selector in next_button_selectors:
                        try:
                            next_btn = self.page.locator(selector).first
                            if await next_btn.count() > 0:
                                await next_btn.click()
                                print("✅ Clicked Next button")
                                next_clicked = True
                                break
                        except Exception:
                            continue
                    
                    if not next_clicked:
                        # Try JavaScript click as fallback
                        try:
                            await self.page.evaluate("""
                                () => {
                                    const nextBtn = document.querySelector('#SurveyNavigationBottomControl_Next_ImageButton') || 
                                                   document.querySelector('input[title="Next"]') ||
                                                   document.querySelector('.nextButton');
                                    if (nextBtn) {
                                        nextBtn.click();
                                        return true;
                                    }
                                    return false;
                                }
                            """)
                            print("✅ Clicked Next button via JavaScript")
                            next_clicked = True
                        except Exception:
                            pass
                    
                    if next_clicked:
                        # Wait for navigation
                        await asyncio.sleep(2)
                        return True
                    else:
                        print("⚠️ Could not click Next button")
                        return False
                        
                except Exception as e:
                    print(f"❌ Error selecting option: {e}")
                    return False
            else:
                print("⚠️ No option selected")
                return False
                
        except Exception as e:
            print(f"❌ Error handling MetrixMatrix question: {e}")
            return False
    
    async def select_metrixmatrix_option(self, question: str, options: List[Dict]) -> Optional[Dict]:
        """Select the best option for a MetrixMatrix question based on persona"""
        try:
            question_lower = question.lower()
            
            # Handle age questions
            if 'age' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    age = self.persona['about_you'].get('age', 25)
                    
                    # Map age to appropriate range
                    if age < 18:
                        target_text = 'under 18'
                    elif 18 <= age <= 21:
                        target_text = '18-21'
                    elif 22 <= age <= 23:
                        target_text = '22-23'
                    elif 24 <= age <= 25:
                        target_text = '24-25'
                    elif 26 <= age <= 30:
                        target_text = '26-30'
                    elif 31 <= age <= 35:
                        target_text = '31-35'
                    elif 36 <= age <= 40:
                        target_text = '36-40'
                    elif 41 <= age <= 45:
                        target_text = '41-45'
                    elif 46 <= age <= 50:
                        target_text = '46-50'
                    elif 51 <= age <= 54:
                        target_text = '51-54'
                    elif 55 <= age <= 64:
                        target_text = '55-64'
                    elif 65 <= age <= 74:
                        target_text = '65-74'
                    else:
                        target_text = '75+'
                    
                    # Find matching option
                    for option in options:
                        if target_text.lower() in option['text'].lower():
                            print(f"🎯 Age-based selection: {option['text']} (persona age: {age})")
                            return option
                
                # Fallback: select middle age range (26-30)
                for option in options:
                    if '26-30' in option['text']:
                        print("🎯 Fallback age selection: 26-30")
                        return option
            
            # Handle gender questions
            elif 'gender' in question_lower or 'sex' in question_lower:
                if self.persona and 'about_you' in self.persona:
                    gender = self.persona['about_you'].get('gender', 'Male').lower()
                    
                    for option in options:
                        option_text = option['text'].lower()
                        if gender in option_text or ('male' in gender and 'male' in option_text) or ('female' in gender and 'female' in option_text):
                            print(f"🎯 Gender-based selection: {option['text']} (persona: {gender})")
                            return option
            
            # Handle employment questions
            elif any(word in question_lower for word in ['employed', 'work', 'job', 'business']):
                # Prefer "not employed" to avoid disqualification
                for option in options:
                    if 'not' in option['text'].lower() and 'employed' in option['text'].lower():
                        print("🎯 Employment selection: Not employed (avoiding disqualification)")
                        return option
                
                # Fallback: select first non-refusal option
                for option in options:
                    if 'prefer not' not in option['text'].lower() and 'dont want' not in option['text'].lower():
                        print(f"🎯 Employment fallback selection: {option['text']}")
                        return option
            
            # Handle region/location questions
            elif any(word in question_lower for word in ['region', 'location', 'area', 'state']):
                if self.persona and 'about_you' in self.persona:
                    state = self.persona['about_you'].get('state', 'California')
                    
                    for option in options:
                        if state.lower() in option['text'].lower():
                            print(f"🎯 Location-based selection: {option['text']} (persona: {state})")
                            return option
            
            # Default: select first non-refusal option
            for option in options:
                if 'prefer not' not in option['text'].lower() and 'dont want' not in option['text'].lower() and 'cant' not in option['text'].lower():
                    print(f"🎯 Default selection: {option['text']}")
                    return option
            
            # Last resort: select first option
            if options:
                print(f"🎯 Last resort selection: {options[0]['text']}")
                return options[0]
            
            return None
            
        except Exception as e:
            print(f"❌ Error selecting MetrixMatrix option: {e}")
            return None
    
    async def handle_purespectrum_survey(self) -> Dict[str, Any]:
        """Handle PureSpectrum survey in the same browser instance"""
        try:
            print("🎯 Handling PureSpectrum survey in current browser...")
            
            # Wait for the page to fully load
            await asyncio.sleep(3)
            
            # Check if we're on the pre-qualification page (more flexible match)
            page_content = await self.page.content()
            page_text_lower = page_content.lower() if page_content else ""
            is_prescreen = 'before you begin the survey' in page_text_lower
            if is_prescreen:
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
                        first_option_locator = self.page.locator('select option, input[type="radio"]').first
                        if await first_option_locator.count() > 0:
                            tag_name = await first_option_locator.evaluate('el => el.tagName')
                            if tag_name == 'OPTION':
                                await first_option_locator.click()
                            else:
                                await first_option_locator.check()
                            gender_selected = True
                    except Exception:
                        pass
                
                # Wait for any dynamic content to load
                await asyncio.sleep(2)
                
                # Handle the two pre-questions (gender and one more) using dropdowns/labels
                try:
                    # Gender dropdown or button list
                    # 1) Prefer persona mapping if available
                    preferred_gender = None
                    try:
                        if hasattr(self, 'persona') and isinstance(self.persona, dict):
                            val = (self.persona.get('gender') or '').strip().lower()
                            if 'female' in val:
                                preferred_gender = 'Female'
                            elif 'male' in val:
                                preferred_gender = 'Male'
                    except Exception:
                        preferred_gender = None
                    preferred_order = [g for g in [preferred_gender, 'Female', 'Male', 'Prefer not to say'] if g]

                    # 2) Try native <select> near the prompt
                    gender_trigger = self.page.locator("select:near(:text('I\\'m a'), 250), label:has-text('I\\'m a') ~ select, select[aria-label*='I\\'m a']").first
                    if await gender_trigger.count() > 0:
                        for label in preferred_order:
                            try:
                                await gender_trigger.select_option(label=label)
                                await asyncio.sleep(0.4)
                                break
                            except Exception:
                                continue
                        else:
                            try:
                                await gender_trigger.select_option(index=1)
                                await asyncio.sleep(0.4)
                            except Exception:
                                pass
                    else:
                        # 3) Handle Angular ui-select / ARIA combobox patterns near the gender prompt
                        container_candidates = [
                            # near the text
                            "label:has-text('I\\'m a') ~ [role='combobox']",
                            "label:has-text('I\\'m a') ~ div.ui-select-container",
                            ":text('I\\'m a') >> xpath=following::*[@role='combobox'][1]",
                            ":text('I\\'m a') >> xpath=following::*[contains(@class, 'ui-select-container')][1]",
                            # global fallback
                            "[role='combobox']",
                            "div.ui-select-container"
                        ]

                        combo = None
                        for sel in container_candidates:
                            try:
                                loc = self.page.locator(sel).first
                                if await loc.count() > 0:
                                    combo = loc
                                    break
                            except Exception:
                                continue

                        if combo is not None:
                            try:
                                await combo.click()
                                await asyncio.sleep(0.3)
                            except Exception:
                                # try focusing
                                try:
                                    await combo.focus()
                                    await self.page.keyboard.press('Enter')
                                    await asyncio.sleep(0.3)
                                except Exception:
                                    pass

                            # When open, options could be in ARIA listbox or ui-select choices
                            option_containers = [
                                '[role="listbox"]',
                                '.ui-select-choices',
                                '.select2-results',
                            ]

                            # Try picking using click
                            picked = False
                            for label in preferred_order:
                                if picked:
                                    break
                                try:
                                    # Try role-based option first
                                    opt = self.page.get_by_role('option', name=label).first
                                    if await opt.count() == 0:
                                        # Try ui-select rows
                                        opt = self.page.locator(f'.ui-select-choices-row:has-text("{label}")').first
                                    if await opt.count() == 0:
                                        # Try generic text within any option container
                                        for oc in option_containers:
                                            opt = self.page.locator(f'{oc} :text("{label}")').first
                                            if await opt.count() > 0:
                                                break
                                    if await opt.count() > 0:
                                        try:
                                            await opt.click()
                                            picked = True
                                            await asyncio.sleep(0.4)
                                            break
                                        except Exception:
                                            # try JS click
                                            handle = await opt.element_handle()
                                            if handle:
                                                try:
                                                    await self.page.evaluate('(el) => el.click()', handle)
                                                    picked = True
                                                    await asyncio.sleep(0.4)
                                                    break
                                                except Exception:
                                                    pass
                                except Exception:
                                    continue

                            # Last resort: typeahead + Enter
                            if not picked:
                                try:
                                    await self.page.keyboard.type(preferred_order[0])
                                    await asyncio.sleep(0.2)
                                    await self.page.keyboard.press('Enter')
                                    await asyncio.sleep(0.3)
                                except Exception:
                                    pass
                except Exception as gender_err:
                    print(f"⚠️ PureSpectrum gender pre-question fallback error: {gender_err}")

                # Click Continue/Next with robust selectors, including force if inputs are invisible
                continue_selectors = [
                    'button:has-text("Continue")',
                    'button:has-text("Next")',
                    'button:has-text("Submit")',
                    'input[value*="Continue"]',
                    'input[value*="Next"]',
                    'input[value*="Submit"]',
                    '.btn-primary',
                    '.btn-success',
                    'button.ps-button',
                ]
                
                clicked = False
                for selector in continue_selectors:
                    try:
                        btn = self.page.locator(selector).first
                        if await btn.count() == 0:
                            continue
                        try:
                            await btn.wait_for(state='visible', timeout=4000)
                            await btn.click()
                            clicked = True
                            break
                        except Exception:
                            handle = await btn.element_handle()
                            if handle:
                                try:
                                    await self.page.evaluate('(el) => el.click()', handle)
                                    await asyncio.sleep(1.5)
                                    clicked = True
                                    break
                                except Exception:
                                    pass
                    except Exception:
                        continue

                # Handle DOB pre-question: "I was born in Month • Year"
                try:
                    dob_present = await self.page.get_by_text('I was born in', exact=False).count() > 0
                    if dob_present:
                        # Resolve persona month/year or sensible defaults
                        month_text = 'January'
                        year_text = '1990'
                        try:
                            if hasattr(self, 'persona') and isinstance(self.persona, dict):
                                about = self.persona.get('about_you') or {}
                                m = (about.get('birth_month') or '').strip()
                                y = str(about.get('birth_year') or '').strip()
                                if m:
                                    month_text = m
                                if y and y.isdigit():
                                    year_text = y
                        except Exception:
                            pass

                        async def open_combo_by_text(label: str) -> Optional[any]:
                            try:
                                # Try clicking the visible label text directly
                                node = self.page.get_by_text(label, exact=False).first
                                if await node.count() > 0:
                                    try:
                                        await node.click()
                                        await asyncio.sleep(0.2)
                                        return node
                                    except Exception:
                                        h = await node.element_handle()
                                        if h:
                                            try:
                                                await self.page.evaluate('(el) => el.click()', h)
                                                await asyncio.sleep(0.2)
                                                return node
                                            except Exception:
                                                pass
                                # Try common combobox/select containers near the label text
                                candidates = [
                                    f"label:has-text('{label}') ~ select",
                                    f"label:has-text('{label}') ~ [role='combobox']",
                                    f":text('{label}') >> xpath=following::*[self::select or @role='combobox'][1]",
                                    "[role='combobox']",
                                    "select",
                                ]
                                for sel in candidates:
                                    try:
                                        loc = self.page.locator(sel).first
                                        if await loc.count() > 0:
                                            try:
                                                await loc.click()
                                            except Exception:
                                                try:
                                                    await loc.focus()
                                                except Exception:
                                                    pass
                                            await asyncio.sleep(0.2)
                                            return loc
                                    except Exception:
                                        continue
                            except Exception:
                                pass
                            return None

                        async def pick_option(option_text: str) -> bool:
                            # Try ARIA role option
                            try:
                                opt = self.page.get_by_role('option', name=option_text).first
                                if await opt.count() > 0:
                                    try:
                                        await opt.click()
                                        await asyncio.sleep(0.2)
                                        return True
                                    except Exception:
                                        h = await opt.element_handle()
                                        if h:
                                            try:
                                                await self.page.evaluate('(el) => el.click()', h)
                                                await asyncio.sleep(0.2)
                                                return True
                                            except Exception:
                                                pass
                            except Exception:
                                pass
                            # Try ui-select rows
                            try:
                                row = self.page.locator(f".ui-select-choices-row:has-text('{option_text}')").first
                                if await row.count() > 0:
                                    await row.click()
                                    await asyncio.sleep(0.2)
                                    return True
                            except Exception:
                                pass
                            # Try generic text within open dropdowns
                            try:
                                for oc in ['[role="listbox"]', '.ui-select-choices', '.select2-results']:
                                    t = self.page.locator(f"{oc} :text('{option_text}')").first
                                    if await t.count() > 0:
                                        try:
                                            await t.click()
                                        except Exception:
                                            th = await t.element_handle()
                                            if th:
                                                await self.page.evaluate('(el) => el.click()', th)
                                        await asyncio.sleep(0.2)
                                        return True
                            except Exception:
                                pass
                            # Typeahead fallback
                            try:
                                await self.page.keyboard.type(option_text)
                                await asyncio.sleep(0.2)
                                await self.page.keyboard.press('Enter')
                                await asyncio.sleep(0.2)
                                return True
                            except Exception:
                                return False

                        # Month
                        mbox = await open_combo_by_text('Month')
                        if mbox is not None:
                            await pick_option(month_text)
                        else:
                            # try clicking the inline Month text directly
                            try:
                                mtxt = self.page.get_by_text('Month', exact=False).first
                                if await mtxt.count() > 0:
                                    await mtxt.click()
                                    await asyncio.sleep(0.2)
                                    await pick_option(month_text)
                            except Exception:
                                pass

                        # Year
                        ybox = await open_combo_by_text('Year')
                        if ybox is not None:
                            await pick_option(year_text)
                        else:
                            try:
                                ytxt = self.page.get_by_text('Year', exact=False).first
                                if await ytxt.count() > 0:
                                    await ytxt.click()
                                    await asyncio.sleep(0.2)
                                    await pick_option(year_text)
                            except Exception:
                                pass

                        # After DOB selection, try continuing
                        for selector in continue_selectors:
                            try:
                                btn = self.page.locator(selector).first
                                if await btn.count() == 0:
                                    continue
                                await btn.click()
                                await asyncio.sleep(1.0)
                                break
                            except Exception:
                                continue
                except Exception as dob_err:
                    print(f"⚠️ PureSpectrum DOB handler error: {dob_err}")

                # If a pre-screen multipunch shows (e.g., social platforms), select via robust methods
                try:
                    multipunch_present = await self.page.get_by_text('Before you begin the survey', exact=False).count() > 0
                    if multipunch_present:
                        print('🔎 PureSpectrum pre-screen multipunch detected; selecting options...')
                        # Prefer safe, low-commitment options to reduce disqualification
                        # Pick up to 2 from this order
                        safe_labels_order = ['I dont use social media', 'Instagram', 'Facebook', 'Others']
                        picked = 0
                        for label in safe_labels_order:
                            if picked >= 2:
                                break
                            try:
                                text_node = self.page.get_by_text(label, exact=False).first
                                if await text_node.count() == 0:
                                    continue
                                # Try associated checkbox first
                                container = text_node.locator('xpath=ancestor::*[contains(@class, "ng-scope")][1]')
                                target_input = container.locator('input[type="checkbox"]').first
                                if await target_input.count() == 0:
                                    target_input = self.page.locator('input[type="checkbox"]').first
                                if await target_input.count() > 0:
                                    handle = await target_input.element_handle()
                                    if handle:
                                        await self.page.evaluate(
                                            '(el) => { el.scrollIntoView({behavior: "smooth", block: "center"}); el.click(); el.dispatchEvent(new Event("input", {bubbles: true})); el.dispatchEvent(new Event("change", {bubbles: true})); }',
                                            handle
                                        )
                                        await asyncio.sleep(0.25)
                                        picked += 1
                                        continue
                                # Fallback: click the text itself
                                tn_handle = await text_node.element_handle()
                                if tn_handle:
                                    await self.page.evaluate(
                                        '(el) => { el.scrollIntoView({behavior: "smooth", block: "center"}); el.click(); }',
                                        tn_handle
                                    )
                                    await asyncio.sleep(0.25)
                                    picked += 1
                            except Exception:
                                continue

                        # Try to continue after selections using broad selectors
                        continued = False
                        for selector in continue_selectors:
                            try:
                                btn = self.page.locator(selector).first
                                if await btn.count() == 0:
                                    continue
                                try:
                                    await btn.click()
                                    await asyncio.sleep(1.2)
                                    continued = True
                                    break
                                except Exception:
                                    handle = await btn.element_handle()
                                    if handle:
                                        try:
                                            await self.page.evaluate('(el) => el.click()', handle)
                                            await asyncio.sleep(1.2)
                                            continued = True
                                            break
                                        except Exception:
                                            pass
                            except Exception:
                                continue

                        # Fallbacks when no visible button is present
                        if not continued:
                            try:
                                # Scroll to bottom to reveal sticky footer actions
                                await self.page.evaluate('() => window.scrollTo(0, document.body.scrollHeight)')
                                await asyncio.sleep(0.4)
                            except Exception:
                                pass
                            sticky_selectors = [
                                'footer button:has-text("Continue")',
                                'footer button:has-text("Next")',
                                'footer .ps-button',
                                'footer a:has-text("Continue")',
                                'footer a:has-text("Next")'
                            ]
                            for sel in sticky_selectors:
                                try:
                                    btn = self.page.locator(sel).first
                                    if await btn.count() == 0:
                                        continue
                                    await btn.click()
                                    await asyncio.sleep(1.2)
                                    continued = True
                                    break
                                except Exception:
                                    continue
                            if not continued:
                                # Keyboard submit as last resort
                                try:
                                    await self.page.keyboard.press('Enter')
                                    await asyncio.sleep(1.0)
                                    continued = True
                                except Exception:
                                    pass
                            if not continued:
                                # Submit first form via JS
                                try:
                                    await self.page.evaluate('() => { const f = document.querySelector("form"); if (f) { f.requestSubmit ? f.requestSubmit() : f.submit(); } }')
                                    await asyncio.sleep(1.2)
                                except Exception:
                                    pass
                except Exception as pre_err:
                    print(f'⚠️ PureSpectrum pre-screen multipunch handler error: {pre_err}')
                
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

    async def handle_sayso_router(self) -> None:
        """Handle SaySo ZK-based router pages by selecting a safe answer and clicking Next."""
        try:
            # Prefer 'No' or neutral option to avoid disqualification traps
            option_locators = [
                "label:has-text(' No')",
                "label:has-text('No')",
                "//label[contains(normalize-space(.), 'No')]",
                "//span[contains(normalize-space(.), 'No')]/ancestor::label[1]",
            ]
            clicked = False
            for sel in option_locators:
                try:
                    loc = self.page.locator(sel).first
                    if await loc.count() > 0:
                        try:
                            await loc.click()
                            clicked = True
                            print("✅ Selected 'No' on SaySo router")
                            break
                        except Exception:
                            h = await loc.element_handle()
                            if h:
                                try:
                                    await self.page.evaluate('(el) => el.click()', h)
                                    clicked = True
                                    print("✅ JS-clicked 'No' on SaySo router")
                                    break
                                except Exception:
                                    pass
                except Exception:
                    continue
            if not clicked:
                # Try selecting the first radio input
                try:
                    radio = self.page.locator('input[type="radio"]').first
                    if await radio.count() > 0:
                        await radio.check()
                        clicked = True
                        print("✅ Checked first radio on SaySo router")
                except Exception:
                    pass

            # Click Next Question
            next_selectors = [
                '#next',
                "button:has-text('Next Question')",
                "//button[contains(., 'Next')]",
            ]
            for sel in next_selectors:
                try:
                    btn = self.page.locator(sel).first
                    if await btn.count() == 0:
                        continue
                    try:
                        await btn.click()
                        print("✅ Clicked SaySo 'Next Question'")
                        await asyncio.sleep(1.0)
                        break
                    except Exception:
                        h = await btn.element_handle()
                        if h:
                            try:
                                await self.page.evaluate('(el) => el.click()', h)
                                print("✅ JS-clicked SaySo 'Next Question'")
                                await asyncio.sleep(1.0)
                                break
                            except Exception:
                                pass
                except Exception:
                    continue
        except Exception as e:
            print(f"⚠️ SaySo router handler failed: {e}")
    
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
