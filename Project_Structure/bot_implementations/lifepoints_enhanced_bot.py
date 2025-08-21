"""
Enhanced LifePoints Survey Bot Implementation
Handles LifePoints surveys with advanced features and AI integration
"""

import asyncio
import re
import json
import logging
import os
from typing import Dict, List, Optional, Tuple, Any
from playwright.async_api import Page, Locator, FrameLocator, Browser, BrowserContext
import time
import random

# Import enhanced features if available
try:
    from enhanced_features.enhanced_personality import EnhancedPersonalitySystem
    from enhanced_features.typing_simulator import TypingSimulator
    ENHANCED_FEATURES_AVAILABLE = True
except ImportError:
    try:
        # Try alternative import path
        from Project_Structure.enhanced_features.enhanced_personality import EnhancedPersonalitySystem
        from Project_Structure.enhanced_features.typing_simulator import TypingSimulator
        ENHANCED_FEATURES_AVAILABLE = True
    except ImportError:
        ENHANCED_FEATURES_AVAILABLE = False

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LifePointsEnhancedBot:
    """
    Enhanced LifePoints survey bot with advanced features
    """
    
    def __init__(self, headless: bool = False, proxy: bool = False):
        self.headless = headless
        self.proxy = proxy
        self.browser = None
        self.context = None
        self.page = None
        
        # Enhanced features
        self.enhanced_personality = None
        self.typing_simulator = None
        
        # LifePoints specific configuration
        self.lifepoints_config = {
            'base_url': 'https://app.lifepointspanel.com',
            'login_url': 'https://app.lifepointspanel.com/en-US/login',
            'dashboard_url': 'https://app.lifepointspanel.com/en-US/dashboard',
            'surveys_url': 'https://app.lifepointspanel.com/en-US/surveys',
            'selectors': {
                'login': {
                    'email': 'input[name="email"]',
                    'password': 'input[name="password"]',
                    'login_button': 'button[type="submit"]',
                    'remember_me': 'input[name="remember"]'
                },
                'dashboard': {
                    'points_display': '.points-display, .lifepoints-balance',
                    'available_surveys': '.survey-card, .survey-item',
                    'survey_title': '.survey-title, .survey-name',
                    'survey_points': '.survey-points, .points-reward',
                    'survey_duration': '.survey-duration, .estimated-time',
                    'take_survey_button': 'button:has-text("TAKE SURVEY"), .take-survey-btn'
                },
                'survey': {
                    'next_button': 'button:has-text("Next"), button:has-text("Continue"), .btn-next',
                    'previous_button': 'button:has-text("Previous"), button:has-text("Back"), .btn-prev',
                    'submit_button': 'button:has-text("Submit"), button:has-text("Finish"), .btn-submit',
                    'question_text': '.question-text, .question-title, h1, h2, h3',
                    'answer_options': 'input[type="radio"], input[type="checkbox"], .answer-option',
                    'text_input': 'input[type="text"], textarea, .text-input'
                }
            }
        }
        
        # Initialize enhanced features
        self._initialize_enhanced_features()
        
        # Session tracking
        self.session_stats = {
            'start_time': time.time(),
            'surveys_completed': 0,
            'points_earned': 0,
            'errors_encountered': 0,
            'current_survey': None
        }
        
        # Log enhanced features status
        if ENHANCED_FEATURES_AVAILABLE:
            logger.info("Enhanced features available and initialized")
        else:
            logger.info("Enhanced features not available, using basic functionality")
    
    def _initialize_enhanced_features(self):
        """Initialize enhanced features if available"""
        if not ENHANCED_FEATURES_AVAILABLE:
            logger.info("Enhanced features not available")
            return
        
        try:
            self.enhanced_personality = EnhancedPersonalitySystem()
            self.typing_simulator = TypingSimulator()
            logger.info("Enhanced features initialized successfully")
        except Exception as e:
            logger.warning(f"Failed to initialize enhanced features: {e}")
            # Try to initialize with fallback
            try:
                from enhanced_personality_system import EnhancedPersonalitySystem as FallbackPersonality
                from typing_simulation import TypingSimulator as FallbackTyping
                self.enhanced_personality = FallbackPersonality()
                self.typing_simulator = FallbackTyping()
                logger.info("Enhanced features initialized with fallback imports")
            except Exception as e2:
                logger.warning(f"Fallback initialization also failed: {e2}")
    
    async def start_browser(self, auth_state_path: str = None):
        """Start the browser with appropriate configuration"""
        try:
            from playwright.async_api import async_playwright
            
            self.playwright = async_playwright()
            p = await self.playwright.__aenter__()
            
            # Launch browser
            browser_type = p.chromium
            launch_options = {
                'headless': self.headless,
                'args': [
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-blink-features=AutomationControlled',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor'
                ]
            }
            
            if self.proxy:
                # Add proxy configuration if needed
                pass
            
            self.browser = await browser_type.launch(**launch_options)
            
            # Create context with user agent
            context_options = {
                'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'viewport': {'width': 1920, 'height': 1080}
            }
            
            # Load authentication state if provided
            if auth_state_path and os.path.exists(auth_state_path):
                try:
                    logger.info(f"Loading authentication state from: {auth_state_path}")
                    self.context = await self.browser.new_context(**context_options, storage_state=auth_state_path)
                    logger.info("✅ Authentication state loaded successfully")
                    
                    # Verify the auth state was loaded by checking cookies
                    try:
                        cookies = await self.context.cookies()
                        logger.info(f"📊 Loaded {len(cookies)} cookies from authentication state")
                        
                        # Check for LifePoints-specific cookies
                        lifepoints_cookies = [c for c in cookies if 'lifepoints' in c['name'].lower() or 'lifepoints' in c['domain'].lower()]
                        if lifepoints_cookies:
                            logger.info(f"✅ Found {len(lifepoints_cookies)} LifePoints cookies")
                        else:
                            logger.warning("⚠️ No LifePoints-specific cookies found in auth state")
                            
                    except Exception as e:
                        logger.warning(f"Could not verify cookies: {e}")
                        
                except Exception as e:
                    logger.warning(f"Failed to load authentication state: {e}")
                    logger.info("Creating new context without authentication state")
                    self.context = await self.browser.new_context(**context_options)
            else:
                self.context = await self.browser.new_context(**context_options)
            
            self.page = await self.context.new_page()
            
            # Set extra headers
            await self.page.set_extra_http_headers({
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            })
            
            logger.info("Browser started successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to start browser: {e}")
            return False
    
    async def _handle_cookie_consent(self):
        """Handle cookie consent popup if it appears"""
        try:
            logger.info("Checking for cookie consent popup...")
            
            # Wait a moment for the popup to appear
            await self.page.wait_for_timeout(2000)
            
            # Try to find the cookie consent dialog
            cookie_selectors = [
                'text=We Use Cookies',
                'text=We use cookies',
                '[data-testid="cookie-consent"]',
                '.cookie-consent',
                '.cookie-dialog',
                'div:has-text("We Use Cookies")'
            ]
            
            cookie_dialog = None
            for selector in cookie_selectors:
                try:
                    cookie_dialog = self.page.locator(selector)
                    if await cookie_dialog.is_visible(timeout=3000):
                        logger.info(f"✅ Found cookie consent dialog with selector: {selector}")
                        break
                except:
                    continue
            
            if cookie_dialog:
                logger.info("Cookie consent popup detected, handling...")
                
                # Try to click "ACCEPT ALL COOKIES" button first (more permissive)
                accept_all_selectors = [
                    'button:has-text("ACCEPT ALL COOKIES")',
                    'button:has-text("Accept All Cookies")',
                    'button:has-text("Accept All")',
                    'text=ACCEPT ALL COOKIES',
                    '.accept-all-cookies',
                    'button[data-testid="accept-all"]'
                ]
                
                accept_button = None
                for selector in accept_all_selectors:
                    try:
                        accept_button = self.page.locator(selector)
                        if await accept_button.is_visible(timeout=2000):
                            logger.info(f"✅ Found accept all cookies button with selector: {selector}")
                            break
                    except:
                        continue
                
                if accept_button:
                    await accept_button.click()
                    logger.info("✅ Clicked 'Accept All Cookies' button")
                    # Wait for popup to disappear
                    await self.page.wait_for_timeout(2000)
                    return
                
                # If accept all not found, try "ONLY STRICTLY NECESSARY COOKIES"
                necessary_selectors = [
                    'button:has-text("ONLY STRICTLY NECESSARY COOKIES")',
                    'button:has-text("Only Strictly Necessary Cookies")',
                    'button:has-text("Necessary Only")',
                    'text=ONLY STRICTLY NECESSARY COOKIES',
                    '.necessary-cookies-only',
                    'button[data-testid="necessary-only"]'
                ]
                
                necessary_button = None
                for selector in necessary_selectors:
                    try:
                        necessary_button = self.page.locator(selector)
                        if await necessary_button.is_visible(timeout=2000):
                            logger.info(f"✅ Found necessary cookies button with selector: {selector}")
                            break
                    except:
                        continue
                
                if necessary_button:
                    await necessary_button.click()
                    logger.info("✅ Clicked 'Only Strictly Necessary Cookies' button")
                    # Wait for popup to disappear
                    await self.page.wait_for_timeout(2000)
                    return
                
                logger.warning("⚠️ Cookie consent dialog found but no buttons could be clicked")
                
            else:
                logger.info("No cookie consent popup detected")
                
        except Exception as e:
            logger.warning(f"Error handling cookie consent: {e}")
            # Continue with login process even if cookie handling fails
    
    async def _validate_auth_state(self, auth_state_path: str) -> bool:
        """Validate if the saved authentication state is still valid"""
        try:
            if not auth_state_path or not os.path.exists(auth_state_path):
                logger.info("No authentication state file found")
                return False
            
            # Check file size and modification time
            file_stat = os.stat(auth_state_path)
            file_size = file_stat.st_size
            file_age_hours = (time.time() - file_stat.st_mtime) / 3600
            
            logger.info(f"Auth state file: {file_size} bytes, {file_age_hours:.1f} hours old")
            
            # If file is too old (more than 24 hours), consider it expired
            if file_age_hours > 24:
                logger.info("Authentication state file is too old (>24 hours)")
                return False
            
            # If file is too small, it might be corrupted
            if file_size < 100:
                logger.info("Authentication state file is too small, may be corrupted")
                return False
            
            logger.info("✅ Authentication state file appears valid")
            return True
            
        except Exception as e:
            logger.warning(f"Error validating auth state: {e}")
            return False
    
    async def _check_login_status(self) -> bool:
        """Check if we're currently logged in by examining the page"""
        try:
            current_url = self.page.url
            logger.info(f"Current URL: {current_url}")
            
            # Check if we're on a logged-in page
            if any(keyword in current_url.lower() for keyword in ['dashboard', 'surveys', 'account', 'profile', 'points']):
                logger.info("✅ URL indicates logged-in state")
                return True
            
            # Check for logged-in indicators on the page
            logged_in_selectors = [
                'text=Sign Out',
                'text=Logout',
                'text=Log Out',
                'text=My Profile',
                'text=Account Settings',
                'text=Dashboard',
                'text=Surveys',
                'text=Points',
                'text=Rewards',
                '[href*="logout"]',
                '[href*="profile"]',
                '[href*="account"]',
                '.user-menu',
                '.account-info',
                '.points-display'
            ]
            
            for selector in logged_in_selectors:
                try:
                    element = self.page.locator(selector)
                    if await element.is_visible(timeout=2000):
                        logger.info(f"✅ Found logged-in indicator: {selector}")
                        return True
                except:
                    continue
            
            # Check for login page indicators (meaning we're NOT logged in)
            login_selectors = [
                'text=Sign In',
                'text=Login',
                'text=Email',
                'text=Password',
                'input[name="email"]',
                'input[name="password"]',
                'button[type="submit"]'
            ]
            
            for selector in login_selectors:
                try:
                    element = self.page.locator(selector)
                    if await element.is_visible(timeout=2000):
                        logger.info(f"❌ Found login page indicator: {selector}")
                        return False
                except:
                    continue
            
            logger.info("⚠️ Could not determine login status from page content")
            return False
            
        except Exception as e:
            logger.error(f"Error checking login status: {e}")
            return False
    
    async def _analyze_page_context(self, context) -> str:
        """Analyze page context to understand the current survey state"""
        try:
            # Get page text content
            page_text = await context.locator('body').inner_text()
            if not page_text:
                return "No page content available"
            
            # Analyze question types and context
            analysis = []
            
            # Check for question indicators
            question_indicators = {
                'demographic': ['age', 'gender', 'income', 'education', 'occupation', 'marital status', 'household size'],
                'consent': ['agree', 'consent', 'accept', 'yes/no', 'i agree', 'i consent'],
                'open_ended': ['why', 'how', 'what', 'tell', 'describe', 'explain', 'reason', 'opinion', 'thoughts'],
                'rating': ['rate', 'scale', '1-10', '1-5', 'satisfied', 'dissatisfied'],
                'multiple_choice': ['select', 'choose', 'option', 'radio', 'checkbox'],
                'contact': ['email', 'phone', 'address', 'zip code', 'postal code']
            }
            
            page_lower = page_text.lower()
            detected_types = []
            
            for question_type, keywords in question_indicators.items():
                if any(keyword in page_lower for keyword in keywords):
                    detected_types.append(question_type)
            
            if detected_types:
                analysis.append(f"Detected question types: {', '.join(detected_types)}")
            
            # Look for specific question text
            lines = page_text.split('\n')
            questions = []
            for line in lines:
                line_stripped = line.strip()
                if len(line_stripped) > 10 and any(char in line_stripped for char in '?.'):
                    # Likely a question
                    if any(word in line_stripped.lower() for word in ['what', 'how', 'why', 'when', 'where', 'which', 'who']):
                        questions.append(line_stripped[:200])  # Limit length
            
            if questions:
                analysis.append(f"Found {len(questions)} potential questions:")
                for i, q in enumerate(questions[:3]):  # Show first 3
                    analysis.append(f"  {i+1}. {q}")
            
            # Check for form structure
            try:
                forms = await context.locator('form').count()
                if forms > 0:
                    analysis.append(f"Page contains {forms} form(s)")
            except:
                pass
            
            # Check for required fields
            try:
                required_fields = await context.locator('[required]').count()
                if required_fields > 0:
                    analysis.append(f"Found {required_fields} required field(s)")
            except:
                pass
            
            # Check for validation messages
            try:
                validation_elements = await context.locator('[class*="error"], [class*="invalid"], [class*="required"]').count()
                if validation_elements > 0:
                    analysis.append(f"Found {validation_elements} validation/error element(s)")
            except:
                pass
            
            # Page structure analysis
            try:
                headings = await context.locator('h1, h2, h3, h4, h5, h6').count()
                if headings > 0:
                    analysis.append(f"Page has {headings} heading(s)")
            except:
                pass
            
            # Survey progress indicators
            try:
                progress_elements = await context.locator('[class*="progress"], [class*="step"], [class*="page"]').count()
                if progress_elements > 0:
                    analysis.append(f"Found {progress_elements} progress indicator(s)")
            except:
                pass
            
            if not analysis:
                analysis.append("Limited page context available")
            
            return "\n".join(analysis)
            
        except Exception as e:
            logger.warning(f"Error analyzing page context: {e}")
            return f"Page context analysis failed: {e}"
    
    async def solve_survey_page_with_dom(self, page_context=None) -> bool:
        """Solve the current survey page using enhanced DOM analysis and AI"""
        try:
            logger.info("🔍 Solving survey page with enhanced DOM analysis...")
            
            # Take screenshot for AI analysis
            screenshot = await self.page.screenshot(type="png", full_page=True)
            logger.info("📸 Screenshot captured for AI analysis")
            
            # Build comprehensive DOM tree
            dom_tree_text, dom_tree_structured, element_map = await self._build_enhanced_dom_tree()
            
            if not element_map:
                logger.warning("⚠️ No interactive elements found on page")
                return False
            
            logger.info(f"🔧 Built DOM tree with {len(element_map)} interactive elements")
            
            # Analyze page context
            page_analysis = await self._analyze_page_context(self.page)
            logger.info(f"📋 Page context analysis: {page_analysis[:100]}...")
            
            # Create AI prompt with enhanced context
            ai_prompt = self._create_ai_prompt(page_analysis, dom_tree_structured, dom_tree_text)
            
            # Get AI decision
            decision = await self._get_ai_decision(ai_prompt, screenshot)
            
            if decision:
                # Execute the AI decision
                success = await self._execute_ai_decision(decision, element_map)
                if success:
                    logger.info("✅ AI decision executed successfully")
                    return True
                else:
                    logger.warning("⚠️ AI decision execution failed")
            
            # Fallback to rule-based approach
            logger.info("🔄 Falling back to rule-based survey solving...")
            return await self._fallback_survey_solving()
            
        except Exception as e:
            logger.error(f"❌ Error in enhanced DOM survey solving: {e}")
            return await self._fallback_survey_solving()
    
    async def _build_enhanced_dom_tree(self):
        """Build an enhanced DOM tree with detailed element information"""
        try:
            # Get all interactive elements
            buttons = await self.page.locator('button').all()
            inputs = await self.page.locator('input').all()
            textareas = await self.page.locator('textarea').all()
            selects = await self.page.locator('select').all()
            links = await self.page.locator('a').all()
            labels = await self.page.locator('label').all()
            
            all_elements = buttons + inputs + textareas + selects + links + labels
            logger.info(f"Found {len(all_elements)} total interactive elements")
            
            # Build comprehensive DOM tree
            dom_tree_text = ""
            dom_tree_structured = []
            element_map = {}
            
            for i, element in enumerate(all_elements):
                try:
                    tag = await element.evaluate('node => node.tagName.toLowerCase()')
                    element_info = {"id": i, "tag": tag, "element": element}
                    
                    if tag == 'input':
                        input_type = await element.get_attribute('type') or 'text'
                        placeholder = await element.get_attribute('placeholder') or ''
                        value = await element.get_attribute('value') or ''
                        name = await element.get_attribute('name') or ''
                        id_attr = await element.get_attribute('id') or ''
                        aria_label = await element.get_attribute('aria-label') or ''
                        required = await element.get_attribute('required') or ''
                        
                        element_info.update({
                            "type": input_type,
                            "placeholder": placeholder,
                            "value": value,
                            "name": name,
                            "id_attr": id_attr,
                            "aria_label": aria_label,
                            "required": bool(required)
                        })
                        
                        text = f"Input (type: {input_type}, placeholder: {placeholder}, value: {value}, name: {name}, id: {id_attr}, required: {bool(required)})"
                        
                    elif tag == 'textarea':
                        placeholder = await element.get_attribute('placeholder') or ''
                        value = await element.get_attribute('value') or ''
                        name = await element.get_attribute('name') or ''
                        id_attr = await element.get_attribute('id') or ''
                        rows = await element.get_attribute('rows') or ''
                        cols = await element.get_attribute('cols') or ''
                        
                        element_info.update({
                            "placeholder": placeholder,
                            "value": value,
                            "name": name,
                            "id_attr": id_attr,
                            "rows": rows,
                            "cols": cols
                        })
                        
                        text = f"Textarea (placeholder: {placeholder}, value: {value}, name: {name}, id: {id_attr})"
                        
                    elif tag == 'button':
                        button_text = await element.inner_text() or await element.get_attribute('name') or 'Button'
                        button_type = await element.get_attribute('type') or 'button'
                        disabled = await element.get_attribute('disabled') or ''
                        
                        element_info.update({
                            "text": button_text,
                            "button_type": button_type,
                            "disabled": bool(disabled)
                        })
                        
                        text = f"Button (text: {button_text}, type: {button_type}, disabled: {bool(disabled)})"
                        
                    elif tag == 'select':
                        select_text = await element.inner_text() or 'Dropdown'
                        name = await element.get_attribute('name') or ''
                        id_attr = await element.get_attribute('id') or ''
                        
                        # Get options
                        options = []
                        try:
                            option_elements = await element.locator('option').all()
                            for opt in option_elements:
                                opt_value = await opt.get_attribute('value') or ''
                                opt_text = await opt.inner_text() or ''
                                options.append({"value": opt_value, "text": opt_text})
                        except:
                            pass
                        
                        element_info.update({
                            "text": select_text,
                            "name": name,
                            "id_attr": id_attr,
                            "options": options
                        })
                        
                        text = f"Select (text: {select_text}, name: {name}, options: {len(options)})"
                        
                    elif tag == 'a':
                        link_text = await element.inner_text() or await element.get_attribute('href') or 'Link'
                        href = await element.get_attribute('href') or ''
                        
                        element_info.update({
                            "text": link_text,
                            "href": href
                        })
                        
                        text = f"Link (text: {link_text}, href: {href})"
                        
                    elif tag == 'label':
                        label_text = await element.inner_text() or 'Label'
                        for_attr = await element.get_attribute('for') or ''
                        
                        element_info.update({
                            "text": label_text,
                            "for": for_attr
                        })
                        
                        text = f"Label (text: {label_text}, for: {for_attr})"
                    
                    else:
                        element_text = await element.inner_text() or tag
                        element_info.update({"text": element_text})
                        text = f"{tag.capitalize()} (text: {element_text})"
                    
                    # Clean up text
                    text = text.strip().split('\n')[0][:100]  # Limit length
                    
                    if text and len(text) > 1:
                        element_map[i] = element
                        dom_tree_text += f"[{i}] <{tag}> \"{text}\"\n"
                        dom_tree_structured.append(element_info)
                        
                except Exception as e:
                    logger.warning(f"Error processing element {i}: {e}")
                    continue
            
            return dom_tree_text, dom_tree_structured, element_map
            
        except Exception as e:
            logger.error(f"Error building enhanced DOM tree: {e}")
            return "", [], {}
    
    def _create_ai_prompt(self, page_analysis, dom_tree_structured, dom_tree_text):
        """Create an AI prompt with enhanced context"""
        tools_prompt = """
        You have these tools:
        1. `click_element(element_id)`: Use for buttons, links, radio buttons, or checkboxes.
        2. `fill_textbox(element_id, text_to_fill)`: Use for text fields (input type="text", "email", "password" or textarea).

        Based on the user's persona, the screenshot, page context, and DOM tree, decide the single best action to progress through the survey.
        When specifying 'element_id', you MUST use the NUMERIC ID (e.g., 15) provided in the DOM tree, NOT its text label.
        You MUST respond in a valid JSON format with "tool" and "args" keys.
        
        Example for clicking a "Next" button with ID 15: `{"tool": "click_element", "args": {"element_id": 15}}`
        Example for filling a zipcode field with ID 5: `{"tool": "fill_textbox", "args": {"element_id": 5, "text_to_fill": "90001"}}`
        If no action is clear, respond with: `{"tool": "no_action", "args": {}}`
        
        IMPORTANT: 
        - For radio buttons, prefer clicking the LABEL element (which is visible) rather than the hidden radio input
        - For checkboxes, prefer clicking the LABEL element rather than the hidden checkbox input
        - Only select elements that are clearly visible and interactive
        - If you're unsure about which element to select, choose "no_action" rather than guessing
        - When there are consent questions (Yes/No), always answer "Yes" to proceed with the survey
        - Fill text fields only after answering any consent questions
        - For open-ended questions (why, how, what, tell, describe, explain), use fill_textbox with any placeholder text
        - PRIORITY: If you see a text input field and a submit button, ALWAYS fill the text field first, then click the submit button
        - Consider the page context and question type when making decisions
        """
        
        prompt = f"""
        {tools_prompt}
        
        PAGE CONTEXT ANALYSIS:
        {page_analysis}
        
        STRUCTURED DOM TREE:
        {json.dumps(dom_tree_structured, indent=2, default=str)}
        
        TEXT DOM TREE:
        {dom_tree_text}
        
        Analyze the screenshot, page context, and both DOM representations to choose the best action.
        The structured DOM tree provides detailed element attributes, while the text tree gives a quick overview.
        Respond with only the JSON object.
        """
        
        return prompt
    
    async def _get_ai_decision(self, prompt, screenshot):
        """Get AI decision using available AI models"""
        try:
            # Debug: Show environment variables
            gemini_key = os.getenv("GEMINI_API_KEY")
            google_key = os.getenv("GOOGLE_API_KEY")
            openai_key = os.getenv("OPENAI_API_KEY")
            
            logger.info(f"🔍 Environment Variables Check:")
            logger.info(f"  GEMINI_API_KEY: {'✅ Set' if gemini_key and gemini_key not in ['YOUR_GEMINI_API_KEY', ''] else '❌ Not set'}")
            logger.info(f"  GOOGLE_API_KEY: {'✅ Set' if google_key and google_key not in ['YOUR_GOOGLE_API_KEY', ''] else '❌ Not set'}")
            logger.info(f"  OPENAI_API_KEY: {'✅ Set' if openai_key and openai_key not in ['YOUR_OPENAI_API_KEY', ''] else '❌ Not set'}")
            
            # Try to use enhanced personality system if available
            if hasattr(self, 'enhanced_personality') and self.enhanced_personality:
                logger.info("🤖 Using enhanced personality system for AI decision")
                # This would integrate with the enhanced personality system
                # For now, return None to use fallback
                return None
            
            # Try to use Gemini API if available
            try:
                import google.generativeai as genai
                # Try multiple possible API key names
                api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
                if api_key and api_key not in ["YOUR_GEMINI_API_KEY", "YOUR_GOOGLE_API_KEY"]:
                    genai.configure(api_key=api_key)
                    model = genai.GenerativeModel('gemini-1.5-flash-latest')
                    
                    # Convert screenshot to base64
                    import base64
                    screenshot_b64 = base64.b64encode(screenshot).decode('utf-8')
                    
                    response = await model.generate_content_async([prompt, {"mime_type": "image/png", "data": screenshot_b64}])
                    logger.info(f"🤖 Gemini AI response: {response.text}")
                    
                    # Parse JSON response
                    import json
                    decision = json.loads(response.text)
                    return decision
                    
            except Exception as e:
                logger.warning(f"Gemini API failed: {e}")
            
            # Try OpenAI if available
            try:
                import openai
                api_key = os.getenv("OPENAI_API_KEY")
                if api_key and api_key != "YOUR_OPENAI_API_KEY":
                    client = openai.AsyncOpenAI(api_key=api_key)
                    
                    response = await client.chat.completions.create(
                        model="gpt-4-vision-preview",
                        messages=[
                            {
                                "role": "user",
                                "content": [
                                    {"type": "text", "text": prompt},
                                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{base64.b64encode(screenshot).decode('utf-8')}"}}
                                ]
                            }
                        ],
                        max_tokens=500
                    )
                    
                    ai_response = response.choices[0].message.content
                    logger.info(f"🤖 OpenAI response: {ai_response}")
                    
                    # Parse JSON response
                    import json
                    decision = json.loads(ai_response)
                    return decision
                    
            except Exception as e:
                logger.warning(f"OpenAI API failed: {e}")
            
            logger.info("🤖 No AI models available, using fallback")
            return None
            
        except Exception as e:
            logger.error(f"Error getting AI decision: {e}")
            return None
    
    async def _execute_ai_decision(self, decision, element_map):
        """Execute the AI's decision"""
        try:
            if not decision or 'tool' not in decision:
                logger.warning("Invalid AI decision format")
                return False
            
            tool = decision['tool']
            args = decision.get('args', {})
            
            if tool == 'click_element':
                element_id = args.get('element_id')
                if element_id is not None and element_id in element_map:
                    element = element_map[element_id]
                    await element.click()
                    logger.info(f"✅ Clicked element {element_id}")
                    return True
                else:
                    logger.warning(f"Invalid element ID: {element_id}")
                    return False
                    
            elif tool == 'fill_textbox':
                element_id = args.get('element_id')
                text_to_fill = args.get('text_to_fill', '')
                
                if element_id is not None and element_id in element_map:
                    element = element_map[element_id]
                    
                    # Use typing simulation if available
                    if hasattr(self, 'typing_simulator') and self.typing_simulator:
                        await self.typing_simulator.type_text(element, text_to_fill)
                    else:
                        await element.fill(text_to_fill)
                    
                    logger.info(f"✅ Filled textbox {element_id} with: {text_to_fill[:50]}...")
                    return True
                else:
                    logger.warning(f"Invalid element ID: {element_id}")
                    return False
                    
            elif tool == 'no_action':
                logger.info("🤖 AI chose no action")
                return True
                
            else:
                logger.warning(f"Unknown tool: {tool}")
                return False
                
        except Exception as e:
            logger.error(f"Error executing AI decision: {e}")
            return False
    
    async def _fallback_survey_solving(self):
        """Fallback rule-based survey solving"""
        try:
            logger.info("🔄 Using fallback rule-based survey solving...")
            
            # Look for common survey patterns
            # 1. Text input fields
            text_inputs = await self.page.locator('input[type="text"], textarea').all()
            if text_inputs:
                logger.info(f"Found {len(text_inputs)} text input fields")
                text_input = text_inputs[0]
                
                # Generate appropriate response
                response = "I saw an ad for this and thought it sounded interesting."
                await text_input.fill(response)
                logger.info("✅ Filled text input with fallback response")
                
                # Look for submit button
                submit_buttons = await self.page.locator('button:has-text("Next"), button:has-text("Submit"), input[type="submit"]').all()
                if submit_buttons:
                    await submit_buttons[0].click()
                    logger.info("✅ Clicked submit button")
                    return True
            
            # 2. Radio buttons or checkboxes
            radio_inputs = await self.page.locator('input[type="radio"]').all()
            if radio_inputs:
                logger.info(f"Found {len(radio_inputs)} radio buttons")
                # Click the first radio button (usually "Yes" or first option)
                await radio_inputs[0].click()
                logger.info("✅ Clicked first radio button")
                return True
            
            # 3. Any clickable button
            buttons = await self.page.locator('button, a, input[type="submit"]').all()
            if buttons:
                logger.info(f"Found {len(buttons)} clickable elements")
                # Click the first available button
                await buttons[0].click()
                logger.info("✅ Clicked first available button")
                return True
            
            logger.warning("⚠️ No fallback actions available")
            return False
            
        except Exception as e:
            logger.error(f"Error in fallback survey solving: {e}")
            return False
    
    async def login(self, email: str, password: str, auth_state_path: str = None) -> bool:
        """Login to LifePoints account"""
        try:
            # Check if we're already logged in (when using auth state)
            if auth_state_path and os.path.exists(auth_state_path):
                logger.info("Checking if already logged in with saved session...")
                
                # First validate the auth state file
                if not await self._validate_auth_state(auth_state_path):
                    logger.info("Authentication state file is invalid or expired")
                    auth_state_path = None  # Don't use invalid auth state
                else:
                    logger.info("✅ Authentication state file is valid, attempting auto-login...")
                    
                    # Try to navigate directly to dashboard
                    await self.page.goto(self.lifepoints_config['dashboard_url'])
                    await self.page.wait_for_load_state('networkidle')
                    
                    # Wait a bit for the page to fully load
                    await self.page.wait_for_timeout(3000)
                    
                    # Check if we're on the dashboard
                    current_url = self.page.url
                    if 'dashboard' in current_url or 'surveys' in current_url:
                                            # Verify we're actually logged in by looking for dashboard elements
                        try:
                            # More comprehensive dashboard detection
                            dashboard_selectors = [
                                'text=LIFEPOINTS',
                                'text=Dashboard',
                                'text=Surveys',
                                'text=My Account',
                                'text=Points',
                                'text=Rewards',
                                '.points-display',
                                '.survey-card',
                                '.dashboard',
                                '.account-info',
                                '[data-testid*="dashboard"]',
                                '[class*="dashboard"]',
                                '[class*="survey"]',
                                '[class*="points"]'
                            ]
                            
                            # Also check for common logged-in indicators
                            logged_in_indicators = [
                                'text=Sign Out',
                                'text=Logout',
                                'text=Log Out',
                                'text=My Profile',
                                'text=Account Settings',
                                '[href*="logout"]',
                                '[href*="profile"]',
                                '[href*="account"]'
                            ]
                            
                            # Check dashboard elements
                            for selector in dashboard_selectors:
                                try:
                                    element = self.page.locator(selector)
                                    if await element.is_visible(timeout=2000):
                                        logger.info(f"✅ Found dashboard element: {selector}")
                                        logger.info("✅ Already logged in with saved session")
                                        return True
                                except:
                                    continue
                            
                            # Check logged-in indicators
                            for selector in logged_in_indicators:
                                try:
                                    element = self.page.locator(selector)
                                    if await element.is_visible(timeout=2000):
                                        logger.info(f"✅ Found logged-in indicator: {selector}")
                                        logger.info("✅ Already logged in with saved session")
                                        return True
                                except:
                                    continue
                            
                            # Check if we're redirected to a different logged-in page
                            current_url = self.page.url
                            if any(keyword in current_url.lower() for keyword in ['dashboard', 'surveys', 'account', 'profile', 'points']):
                                logger.info(f"✅ URL indicates logged-in state: {current_url}")
                                logger.info("✅ Already logged in with saved session")
                                return True
                            
                            logger.info("⚠️ Saved session may be expired, attempting fresh login")
                        except Exception as e:
                            logger.debug(f"Error checking dashboard elements: {e}")
                            logger.info("⚠️ Saved session may be expired, attempting fresh login")
                    
                    # Try refreshing the page to see if auth state loads properly
                    logger.info("🔄 Refreshing page to check if auth state loads...")
                    await self.page.reload()
                    await self.page.wait_for_load_state('networkidle')
                    await self.page.wait_for_timeout(2000)
                    
                    # Check login status again after refresh
                    if await self._check_login_status():
                        logger.info("✅ Successfully logged in after page refresh")
                        return True
                    
                    # If still not logged in, continue with normal login process
                    logger.info("Saved session expired or invalid, proceeding with fresh login")
            
            logger.info("Attempting to login to LifePoints...")
            
            # Navigate to login page
            await self.page.goto(self.lifepoints_config['login_url'])
            await self.page.wait_for_load_state('networkidle')
            
            # Handle cookie consent popup if it appears
            await self._handle_cookie_consent()
            
            # Debug: Print current page info
            logger.info(f"Current URL: {self.page.url}")
            logger.info(f"Page title: {await self.page.title()}")
            
            # Check for cookie popup again in case it appeared after page load
            await self._handle_cookie_consent()
            
            # Try multiple selector strategies for email field
            email_selectors = [
                'input[name="email"]',
                'input[type="email"]',
                'input[placeholder*="email" i]',
                'input[placeholder*="Email" i]',
                '#email',
                '.email-input',
                'input[autocomplete="email"]'
            ]
            
            email_field = None
            for selector in email_selectors:
                try:
                    email_field = self.page.locator(selector)
                    if await email_field.is_visible(timeout=5000):
                        logger.info(f"✅ Found email field with selector: {selector}")
                        break
                except:
                    continue
            
            if not email_field:
                # Take screenshot for debugging
                screenshot_path = "lifepoints_login_debug.png"
                await self.page.screenshot(path=screenshot_path)
                logger.error(f"❌ Email field not found. Screenshot saved to: {screenshot_path}")
                
                # Print page content for debugging
                page_content = await self.page.content()
                logger.error(f"Page content preview: {page_content[:1000]}...")
                return False
            
            # Fill in credentials
            await email_field.fill(email)
            
            # Find password field
            password_selectors = [
                'input[name="password"]',
                'input[type="password"]',
                'input[placeholder*="password" i]',
                'input[placeholder*="Password" i]',
                '#password',
                '.password-input'
            ]
            
            password_field = None
            for selector in password_selectors:
                try:
                    password_field = self.page.locator(selector)
                    if await password_field.is_visible(timeout=5000):
                        logger.info(f"✅ Found password field with selector: {selector}")
                        break
                except:
                    continue
            
            if not password_field:
                logger.error("❌ Password field not found")
                return False
            
            await password_field.fill(password)
            
            # Check remember me if available
            try:
                remember_checkbox = self.page.locator(self.lifepoints_config['selectors']['login']['remember_me'])
                if await remember_checkbox.is_visible():
                    await remember_checkbox.check()
            except:
                pass
            
            # Find and click login button
            login_button_selectors = [
                'button[type="submit"]',
                'button:has-text("Login")',
                'button:has-text("Sign In")',
                'input[type="submit"]',
                '.login-button',
                '.btn-login'
            ]
            
            login_button = None
            for selector in login_button_selectors:
                try:
                    login_button = self.page.locator(selector)
                    if await login_button.is_visible(timeout=5000):
                        logger.info(f"✅ Found login button with selector: {selector}")
                        break
                except:
                    continue
            
            if not login_button:
                logger.error("❌ Login button not found")
                return False
            
            # Click login button
            await login_button.click()
            
            # Wait for redirect to dashboard
            await self.page.wait_for_load_state('networkidle')
            
            # Check if login was successful
            current_url = self.page.url
            logger.info(f"After login attempt, current URL: {current_url}")
            
            if 'dashboard' in current_url or 'surveys' in current_url:
                logger.info("✅ Login successful")
                return True
            else:
                # Take screenshot for debugging
                screenshot_path = "lifepoints_login_failed.png"
                await self.page.screenshot(path=screenshot_path)
                logger.error(f"❌ Login failed - redirected to: {current_url}")
                logger.error(f"Screenshot saved to: {screenshot_path}")
                return False
                
        except Exception as e:
            logger.error(f"Login error: {e}")
            return False
    
    async def get_available_surveys(self) -> List[Dict[str, Any]]:
        """Get list of available surveys from dashboard"""
        try:
            logger.info("Fetching available surveys...")
            
            # Navigate to dashboard
            await self.page.goto(self.lifepoints_config['dashboard_url'])
            await self.page.wait_for_load_state('networkidle')
            
            # Wait for surveys to load
            await self.page.wait_for_selector(self.lifepoints_config['selectors']['dashboard']['available_surveys'], timeout=10000)
            
            # Extract survey information
            surveys = []
            survey_elements = self.page.locator(self.lifepoints_config['selectors']['dashboard']['available_surveys'])
            
            for i in range(await survey_elements.count()):
                try:
                    survey_element = survey_elements.nth(i)
                    
                    # Extract survey details
                    title = await survey_element.locator(self.lifepoints_config['selectors']['dashboard']['survey_title']).text_content() or f"Survey {i+1}"
                    points = await survey_element.locator(self.lifepoints_config['selectors']['dashboard']['survey_points']).text_content() or "0"
                    duration = await survey_element.locator(self.lifepoints_config['selectors']['dashboard']['survey_duration']).text_content() or "Unknown"
                    
                    # Check if survey button is available
                    take_button = survey_element.locator(self.lifepoints_config['selectors']['dashboard']['take_survey_button'])
                    is_available = await take_button.is_visible()
                    
                    surveys.append({
                        'index': i,
                        'title': title.strip(),
                        'points': points.strip(),
                        'duration': duration.strip(),
                        'available': is_available,
                        'element': survey_element
                    })
                    
                except Exception as e:
                    logger.debug(f"Error extracting survey {i}: {e}")
                    continue
            
            logger.info(f"Found {len(surveys)} surveys")
            return surveys
            
        except Exception as e:
            logger.error(f"Error fetching surveys: {e}")
            return []
    
    async def take_survey(self, survey_index: int) -> bool:
        """Take a specific survey by index"""
        try:
            surveys = await self.get_available_surveys()
            
            if survey_index >= len(surveys):
                logger.error(f"Survey index {survey_index} out of range")
                return False
            
            survey = surveys[survey_index]
            if not survey['available']:
                logger.error(f"Survey {survey_index} is not available")
                return False
            
            logger.info(f"Starting survey: {survey['title']} ({survey['points']} points, {survey['duration']})")
            
            # Click take survey button
            take_button = survey['element'].locator(self.lifepoints_config['selectors']['dashboard']['take_survey_button'])
            await take_button.click()
            
            # Wait for survey to load
            await self.page.wait_for_load_state('networkidle')
            
            # Track current survey
            self.session_stats['current_survey'] = survey['title']
            
            # Handle the survey
            success = await self._handle_survey_flow()
            
            if success:
                self.session_stats['surveys_completed'] += 1
                # Extract points from survey title or use default
                points_match = re.search(r'(\d+)', survey['points'])
                if points_match:
                    self.session_stats['points_earned'] += int(points_match.group(1))
                
                logger.info(f"Survey completed successfully! Earned {survey['points']} points")
            else:
                self.session_stats['errors_encountered'] += 1
                logger.error("Survey failed to complete")
            
            return success
            
        except Exception as e:
            logger.error(f"Error taking survey: {e}")
            self.session_stats['errors_encountered'] += 1
            return False
    
    async def _handle_survey_flow(self) -> bool:
        """Handle the actual survey flow and questions"""
        try:
            max_questions = 100  # Safety limit
            question_count = 0
            
            while question_count < max_questions:
                question_count += 1
                logger.info(f"Processing question {question_count}")
                
                # Wait for page to load
                await self.page.wait_for_load_state('networkidle')
                
                # Check if survey is complete
                if await self._is_survey_complete():
                    logger.info("Survey appears to be complete")
                    return True
                
                # Handle current question
                if not await self._handle_current_question():
                    logger.warning(f"Failed to handle question {question_count}")
                    # Continue anyway, might be a display issue
                
                # Look for next/submit button
                if await self._click_next_button():
                    # Wait for next question to load
                    await asyncio.sleep(2)
                else:
                    # No next button found, might be complete
                    logger.info("No next button found, survey may be complete")
                    break
            
            return True
            
        except Exception as e:
            logger.error(f"Error in survey flow: {e}")
            return False
    
    async def _is_survey_complete(self) -> bool:
        """Check if the survey is complete"""
        try:
            # Look for completion indicators
            completion_selectors = [
                'text=Thank you',
                'text=Survey Complete',
                'text=You have completed',
                '.completion-message',
                '.thank-you-message'
            ]
            
            for selector in completion_selectors:
                try:
                    element = self.page.locator(selector)
                    if await element.is_visible():
                        return True
                except:
                    continue
            
            return False
            
        except Exception as e:
            logger.debug(f"Error checking survey completion: {e}")
            return False
    
    async def _handle_current_question(self) -> bool:
        """Handle the current survey question"""
        try:
            # Get question text
            question_text = await self._get_question_text()
            if question_text:
                logger.info(f"Question: {question_text[:100]}...")
            
            # Handle different question types
            if await self._handle_multiple_choice():
                return True
            elif await self._handle_text_input():
                return True
            elif await self._handle_checkbox():
                return True
            else:
                logger.debug("No specific question type detected, continuing...")
                return True
                
        except Exception as e:
            logger.error(f"Error handling question: {e}")
            return False
    
    async def _get_question_text(self) -> Optional[str]:
        """Extract the current question text"""
        try:
            for selector in self.lifepoints_config['selectors']['survey']['question_text']:
                try:
                    element = self.page.locator(selector)
                    if await element.is_visible():
                        return await element.text_content()
                except:
                    continue
            return None
        except Exception as e:
            logger.debug(f"Error getting question text: {e}")
            return None
    
    async def _handle_multiple_choice(self) -> bool:
        """Handle multiple choice questions"""
        try:
            radio_buttons = self.page.locator('input[type="radio"]')
            count = await radio_buttons.count()
            
            if count > 0:
                # Select a random option
                random_index = random.randint(0, count - 1)
                await radio_buttons.nth(random_index).check()
                logger.debug(f"Selected radio option {random_index + 1}")
                return True
            
            return False
            
        except Exception as e:
            logger.debug(f"Error handling multiple choice: {e}")
            return False
    
    async def _handle_checkbox(self) -> bool:
        """Handle checkbox questions"""
        try:
            checkboxes = self.page.locator('input[type="checkbox"]')
            count = await checkboxes.count()
            
            if count > 0:
                # Check a random number of checkboxes (1 to min(3, count))
                max_check = min(3, count)
                num_to_check = random.randint(1, max_check)
                
                # Randomly select checkboxes
                indices = random.sample(range(count), num_to_check)
                for idx in indices:
                    await checkboxes.nth(idx).check()
                
                logger.debug(f"Checked {num_to_check} checkbox options")
                return True
            
            return False
            
        except Exception as e:
            logger.debug(f"Error handling checkboxes: {e}")
            return False
    
    async def _handle_text_input(self) -> bool:
        """Handle text input questions"""
        try:
            text_inputs = self.page.locator('input[type="text"], textarea')
            count = await text_inputs.count()
            
            if count > 0:
                for i in range(count):
                    try:
                        input_element = text_inputs.nth(i)
                        if await input_element.is_visible():
                            # Generate appropriate response based on question context
                            response = await self._generate_text_response()
                            
                            # Type response with simulation if available
                            if self.typing_simulator:
                                await self.typing_simulator.type_text(self.page, input_element, response)
                            else:
                                await input_element.fill(response)
                            
                            logger.debug(f"Filled text input {i + 1} with: {response[:50]}...")
                    except Exception as e:
                        logger.debug(f"Error filling text input {i}: {e}")
                        continue
                
                return True
            
            return False
            
        except Exception as e:
            logger.debug(f"Error handling text input: {e}")
            return False
    
    async def _generate_text_response(self) -> str:
        """Generate appropriate text response for questions"""
        try:
            if self.enhanced_personality:
                # Use enhanced personality for responses
                return await self.enhanced_personality.generate_response("survey_question")
            else:
                # Default responses
                default_responses = [
                    "I enjoy participating in surveys and sharing my opinions.",
                    "I find this topic interesting and would like to learn more.",
                    "My experience with this has been generally positive.",
                    "I think this could be improved in several ways.",
                    "I appreciate the opportunity to provide feedback."
                ]
                return random.choice(default_responses)
                
        except Exception as e:
            logger.debug(f"Error generating text response: {e}")
            return "Thank you for asking."
    
    async def _click_next_button(self) -> bool:
        """Click the next/continue button"""
        try:
            for selector in self.lifepoints_config['selectors']['survey']['next_button']:
                try:
                    button = self.page.locator(selector)
                    if await button.is_visible():
                        await button.click()
                        logger.debug("Clicked next button")
                        return True
                except:
                    continue
            
            return False
            
        except Exception as e:
            logger.debug(f"Error clicking next button: {e}")
            return False
    
    async def get_session_stats(self) -> Dict[str, Any]:
        """Get current session statistics"""
        current_time = time.time()
        duration = current_time - self.session_stats['start_time']
        
        return {
            **self.session_stats,
            'session_duration': f"{duration:.2f} seconds",
            'surveys_per_hour': (self.session_stats['surveys_completed'] / (duration / 3600)) if duration > 0 else 0
        }
    
    async def close(self):
        """Close browser and cleanup"""
        try:
            if self.page:
                await self.page.close()
            if self.context:
                await self.context.close()
            if self.browser:
                await self.browser.close()
            if hasattr(self, 'playwright'):
                await self.playwright.__aexit__(None, None, None)
            logger.info("Browser closed successfully")
        except Exception as e:
            logger.error(f"Error closing browser: {e}")

async def main():
    """Main function for testing"""
    bot = LifePointsEnhancedBot(headless=False)
    
    try:
        if not await bot.start_browser():
            print("Failed to start browser")
            return
        
        # Test login (you'll need to provide credentials)
        # success = await bot.login("your_email@example.com", "your_password")
        # if not success:
        #     print("Login failed")
        #     return
        
        # Get available surveys
        surveys = await bot.get_available_surveys()
        print(f"Found {len(surveys)} surveys")
        
        # Show survey info
        for i, survey in enumerate(surveys):
            print(f"{i}: {survey['title']} - {survey['points']} points ({survey['duration']})")
        
        # Take first available survey
        if surveys:
            await bot.take_survey(0)
        
        # Show stats
        stats = await bot.get_session_stats()
        print(f"Session stats: {stats}")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await bot.close()

if __name__ == "__main__":
    asyncio.run(main())
