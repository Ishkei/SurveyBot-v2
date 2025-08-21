"""
Improved Survey Bot with Enhanced Router Integration
Incorporates patterns discovered from survey data analysis
"""

import asyncio
import os
import json
import re
import random
from datetime import datetime
from typing import Dict, List, Optional, Any

from dotenv import load_dotenv
import google.generativeai as genai
from playwright.async_api import async_playwright, Page, Browser, BrowserContext

# Import the enhanced survey router
try:
    # Prefer absolute import via package path
    from Project_Structure.bot_implementations.enhanced_survey_router import EnhancedSurveyRouter
except ImportError:
    # Fallback when running inside Project_Structure context
    from bot_implementations.enhanced_survey_router import EnhancedSurveyRouter

# Import typing simulation for human-like text input
try:
    from typing_simulation import type_text_naturally, TYPING_PRESETS
    TYPING_SIMULATION_AVAILABLE = True
except ImportError:
    TYPING_SIMULATION_AVAILABLE = False
    print("Warning: Typing simulation module not available. Using regular text input.")

load_dotenv()

# --- CONFIGURATION & PERSONA ---
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "YOUR_GOOGLE_API_KEY")
USE_GEMINI_API = GOOGLE_API_KEY and GOOGLE_API_KEY != "YOUR_GOOGLE_API_KEY"

if USE_GEMINI_API:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
else:
    print("Warning: GOOGLE_API_KEY not found in .env file. Some features may be limited.")
    model = None

class ImprovedSurveyBot:
    """
    Improved survey bot with enhanced router integration
    """
    
    def __init__(self, headless: bool = False, personality_style: str = "natural_conversation", auth_state_path: Optional[str] = None):
        self.headless = headless
        self.personality_style = personality_style
        self.auth_state_path = auth_state_path
        self.router = EnhancedSurveyRouter()
        
        # Load persona
        self.persona = self._load_persona()
        self.persona_prompt = self._build_persona_prompt()
        
        # Survey statistics
        self.surveys_completed = 0
        self.surveys_disqualified = 0
        self.total_attempts = 0
        self.session_start_time = datetime.now()
        
        # Configuration
        self.max_surveys_per_session = 5
        self.max_failures_per_page = 25
        self.max_total_attempts = 100
        self.delay_between_actions = (2, 5)
        
        # Load enhanced patterns
        self.enhanced_patterns = self._load_enhanced_patterns()
        
    def _load_persona(self) -> Dict[str, Any]:
        """Load persona configuration"""
        try:
            persona_paths = [
                '../Configurations/configs/persona.json',
                '../../Configurations/configs/persona.json',
                '../../configs/persona.json',
                '../configs/persona.json'
            ]
            
            for path in persona_paths:
                try:
                    with open(path, 'r') as f:
                        persona = json.load(f)
                        print(f"Loaded persona from: {path}")
                        return persona
                except FileNotFoundError:
                    continue
            
            # Default persona if none found
            print("Warning: No persona.json found. Using default persona.")
            return self._get_default_persona()
            
        except Exception as e:
            print(f"Error loading persona: {e}")
            return self._get_default_persona()
    
    def _get_default_persona(self) -> Dict[str, Any]:
        """Get default persona configuration"""
        return {
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
    
    def _load_enhanced_patterns(self) -> Dict[str, Any]:
        """Load enhanced survey patterns"""
        try:
            patterns_paths = [
                'configs/enhanced_survey_patterns.json',
                '../configs/enhanced_survey_patterns.json',
                '../../configs/enhanced_survey_patterns.json'
            ]
            
            for path in patterns_paths:
                try:
                    with open(path, 'r') as f:
                        patterns = json.load(f)
                        print(f"Loaded enhanced patterns from: {path}")
                        return patterns
                except FileNotFoundError:
                    continue
            
            print("Warning: No enhanced patterns found. Using default patterns.")
            return {}
            
        except Exception as e:
            print(f"Error loading enhanced patterns: {e}")
            return {}
    
    def _build_persona_prompt(self) -> str:
        """Build persona prompt for AI responses"""
        return f"""You are an AI assistant representing a person with these details: {json.dumps(self.persona)}.
Your primary goal is to answer survey questions accurately based on this persona.
When presented with multiple choice options, select ONLY the single, specific button or radio option that directly corresponds to the answer.
You MUST provide the NUMERIC ID (e.g., 15) of the element to click or fill, NOT its text label.
Avoid clicking on general navigation links. Always prioritize progressing through the survey.
"""

    async def login_to_qmee(self, page: Page) -> bool:
        """Login to Qmee using credentials from environment"""
        try:
            email = os.getenv("QMEE_EMAIL")
            password = os.getenv("QMEE_PASSWORD")
            
            if not email or not password:
                print("❌ QMEE_EMAIL and QMEE_PASSWORD not found in environment variables")
                return False
            
            print("🔐 Logging into Qmee...")
            
            # Helper: iterate main page + iframes (synchronous generator)
            def iter_contexts():
                try:
                    frames = page.frames
                except Exception:
                    frames = []
                # Yield page first, then frames
                yield page
                for fr in frames:
                    yield fr

            # Helper to find first matching locator across contexts
            async def find_first(selectors: list[str]):
                for ctx in iter_contexts():
                    for sel in selectors:
                        try:
                            loc = ctx.locator(sel)
                            if await loc.count() > 0:
                                return loc.first
                        except Exception:
                            continue
                return None

            # Helper to fill first matching selector across contexts
            async def fill_first(selectors: list[str], value: str) -> bool:
                loc = await find_first(selectors)
                if loc is not None:
                    try:
                        await loc.fill("")
                        await loc.fill(value)
                        return True
                    except Exception:
                        return False
                return False
            
            # Navigate to login page (try a couple URLs)
            for url in [
                "https://www.qmee.com/en-us/login",
                "https://www.qmee.com/login",
            ]:
                try:
                    await page.goto(url, timeout=45000)
                    await page.wait_for_load_state('domcontentloaded', timeout=45000)
                    break
                except Exception:
                    continue
            
            # Handle cookie banners if present
            cookie_selectors = [
                '#onetrust-accept-btn-handler',
                'button#onetrust-accept-btn-handler',
                'button:has-text("Accept All")',
                'button:has-text("Accept")',
                'button:has-text("I Agree")'
            ]
            # Try to accept cookies in page or frames
            accepted_cookies = False
            for ctx in iter_contexts():
                for sel in cookie_selectors:
                    try:
                        if await ctx.locator(sel).count() > 0:
                            await ctx.locator(sel).first.click()
                            await asyncio.sleep(1)
                            accepted_cookies = True
                            break
                    except Exception:
                        continue
                if accepted_cookies:
                    break
            
            # Sometimes a Sign in button opens the form
            try:
                if await page.locator('a:has-text("Sign in")').count() > 0:
                    await page.locator('a:has-text("Sign in")').first.click()
                    await asyncio.sleep(1.5)
            except Exception:
                pass
            
            # Robust field selectors
            email_selectors = [
                'input[name="email"]',
                'input[name="emailAddress"]',
                '#email',
                'input[type="email"]',
                'input[autocomplete="username"]',
                'input[placeholder*="email" i]',
                'input[aria-label*="email" i]',
                'input[placeholder*="Email" i]',
                'input[placeholder*="e-mail" i]',
                'input[id*="email" i]',
                'input[class*="email" i]'
            ]
            password_selectors = [
                'input[name="password"]',
                '#password',
                'input[type="password"]',
                'input[autocomplete="current-password"]',
                'input[aria-label*="password" i]',
                'input[placeholder*="Password" i]',
                'input[id*="password" i]',
                'input[class*="password" i]'
            ]
            submit_selectors = [
                'button[type="submit"]',
                'button:has-text("Sign in")',
                'button:has-text("Log in")',
                'button:has-text("Login")',
                'button:has-text("Sign In")'
            ]
            
            # Wait a bit for form to render
            await asyncio.sleep(1.5)
            
            # Fill form
            filled_email = await fill_first(email_selectors, email)
            filled_pass = await fill_first(password_selectors, password)
            
            if not filled_email:
                # Try to navigate again in case we didn't land on the form
                await page.goto("https://www.qmee.com/en-us/login", timeout=45000)
                await asyncio.sleep(2)
                filled_email = await fill_first(email_selectors, email)
                filled_pass = await fill_first(password_selectors, password)
            
            if not filled_email or not filled_pass:
                print("❌ Could not locate login fields on Qmee")
                print("🔍 Debugging: Checking page content...")
                
                # Try to find any input fields
                try:
                    all_inputs = await page.locator('input').all()
                    print(f"   Found {len(all_inputs)} input fields on page")
                    for i, inp in enumerate(all_inputs[:5]):  # Show first 5
                        try:
                            input_type = await inp.get_attribute('type') or 'text'
                            input_name = await inp.get_attribute('name') or 'no-name'
                            input_id = await inp.get_attribute('id') or 'no-id'
                            input_placeholder = await inp.get_attribute('placeholder') or 'no-placeholder'
                            print(f"   Input {i+1}: type={input_type}, name={input_name}, id={input_id}, placeholder={input_placeholder}")
                        except Exception:
                            print(f"   Input {i+1}: Could not read attributes")
                except Exception as e:
                    print(f"   Error reading inputs: {e}")
                
                # Check page title and URL
                try:
                    page_title = await page.title()
                    page_url = page.url
                    print(f"   Page title: {page_title}")
                    print(f"   Page URL: {page_url}")
                except Exception as e:
                    print(f"   Error reading page info: {e}")
                
                return False
            
            # Click submit across contexts
            clicked = False
            for ctx in iter_contexts():
                for sel in submit_selectors:
                    try:
                        if await ctx.locator(sel).count() > 0:
                            await ctx.locator(sel).first.click()
                            clicked = True
                            break
                    except Exception:
                        continue
                if clicked:
                    break
            if not clicked:
                # Press Enter in password field as fallback
                try:
                    await page.locator(password_selectors[0]).press('Enter')
                except Exception:
                    pass
            
            # Wait for login to complete
            try:
                await page.wait_for_url("**/dashboard**", timeout=25000)
                print("✅ Login successful")
                return True
            except Exception:
                # Check if we're already logged in
                if "dashboard" in page.url or "surveys" in page.url:
                    print("✅ Already logged in")
                    return True
                else:
                    print("❌ Login failed")
                    return False
                    
        except Exception as e:
            print(f"❌ Login error: {e}")
            return False

    async def navigate_to_surveys(self, page: Page) -> bool:
        """Navigate to the surveys page"""
        try:
            print("📋 Navigating to surveys page...")
            
            # Try multiple approaches to get to surveys
            survey_urls = [
                "https://www.qmee.com/en-us/surveys",
                "https://www.qmee.com/surveys",
                "https://www.qmee.com/en-us/dashboard",
                "https://www.qmee.com/dashboard"
            ]
            
            for url in survey_urls:
                try:
                    print(f"   Trying: {url}")
                    await page.goto(url, timeout=45000, wait_until='domcontentloaded')
                    
                    # Check if we're on a surveys page or can navigate to it
                    if "surveys" in url:
                        # We're already on surveys page
                        break
                    else:
                        # Try to click Surveys navigation
                        nav_selectors = [
                            'a[href*="/surveys"]',
                            'a:has-text("Surveys")',
                            'a:has-text("Take Surveys")',
                            'a:has-text("Earn Money")',
                            'a:has-text("Start Earning")'
                        ]
                        
                        for nav_sel in nav_selectors:
                            try:
                                if await page.locator(nav_sel).count() > 0:
                                    print(f"   Clicking navigation: {nav_sel}")
                                    await page.locator(nav_sel).first.click()
                                    await page.wait_for_load_state('domcontentloaded', timeout=30000)
                                    break
                            except Exception:
                                continue
                        break
                        
                except Exception as e:
                    print(f"   Failed to navigate to {url}: {e}")
                    continue
            
            # Give time for dynamic content
            await asyncio.sleep(4)
            
            # Verify we're on a surveys page
            current_url = page.url
            if "surveys" in current_url or "dashboard" in current_url:
                print(f"✅ Successfully navigated to: {current_url}")
                return True
            else:
                print(f"⚠️ Navigation may have failed. Current URL: {current_url}")
                return True  # Continue anyway, might still work
                
        except Exception as e:
            print(f"❌ Error navigating to surveys: {e}")
            return False

    async def find_and_start_survey(self, page: Page) -> bool:
        """Find and start an available survey"""
        try:
            print("🔍 Looking for available surveys...")
            
            # Wait for survey elements or container to load
            survey_container_selectors = [
                '[data-testid="survey-card"]', '.survey-card', '.survey-item',
                '[data-test="survey-card"]', '[class*="survey"]',
                '#surveys', '[data-testid*="surveys"]',
            ]
            # try multiple waits with small delays
            found_any = False
            for sel in survey_container_selectors:
                try:
                    await page.wait_for_selector(sel, timeout=6000, state='visible')
                    found_any = True
                    break
                except Exception:
                    continue
            if not found_any:
                # Try a soft reload once
                try:
                    await page.reload()
                    await page.wait_for_load_state('domcontentloaded')
                    await asyncio.sleep(3)
                except Exception:
                    pass
                for sel in survey_container_selectors:
                    try:
                        await page.wait_for_selector(sel, timeout=6000, state='visible')
                        found_any = True
                        break
                    except Exception:
                        continue
            if not found_any:
                raise Exception('No survey containers detected')
            
            # Look for survey start buttons
            start_selectors = [
                'button:has-text("Start")',
                'button:has-text("Take Survey")',
                'button:has-text("Begin")',
                'a:has-text("Start")',
                'a:has-text("Take Survey")',
                '[data-testid="start-survey-button"]',
                '.start-survey-btn',
                'a[href*="/survey/"]',
                'a[href*="/surveys/"]',
                'button:has-text("Start earning")'
            ]
            
            for selector in start_selectors:
                try:
                    if await page.locator(selector).count() > 0:
                        await page.locator(selector).first.click()
                        print(f"✅ Started survey using selector: {selector}")
                        await asyncio.sleep(3)
                        return True
                except Exception as e:
                    print(f"Selector {selector} failed: {e}")
                    continue
            
            # Fallback: look for any clickable survey element
            try:
                survey_elements = page.locator('button, a').filter(
                    has_text=re.compile(r'start|survey|earn|take', re.IGNORECASE)
                )
                if await survey_elements.count() > 0:
                    await survey_elements.first.click()
                    print("✅ Started survey using fallback selector")
                    await asyncio.sleep(3)
                    return True
            except Exception as e:
                print(f"Fallback selector failed: {e}")
            
            print("❌ No surveys found or could not start survey")
            return False
            
        except Exception as e:
            print(f"❌ Error finding/starting survey: {e}")
            return False

    async def handle_survey_page(self, page: Page) -> Dict[str, Any]:
        """Handle the current survey page using enhanced router"""
        try:
            # Check for iframe (Qmee's standard survey format)
            iframe_locator = page.frame_locator('iframe[title="signup-survey"]')
            
            try:
                # Wait for iframe to load
                await iframe_locator.locator('body').wait_for(timeout=10000)
                
                # Use enhanced router to handle the survey
                result = await self.router.route_survey(page, iframe_locator)
                
                if result['status'] == 'completed':
                    self.surveys_completed += 1
                    print(f"🎉 Survey completed! Total completed: {self.surveys_completed}")
                    return result
                    
                elif result['status'] == 'disqualified':
                    self.surveys_disqualified += 1
                    print(f"❌ Survey disqualified! Total disqualified: {self.surveys_disqualified}")
                    return result
                    
                elif result['status'] == 'routed':
                    print("🔄 Survey routed to next survey")
                    return result
                    
                elif result['status'] == 'handled':
                    print(f"✅ Survey page handled successfully by {result['platform']} handler")
                    return result
                    
                else:
                    print(f"⚠️ Survey status: {result['status']} - {result['message']}")
                    return result
                    
            except Exception as e:
                print(f"❌ Iframe not found or failed to load: {e}")
                
                # Try to handle on main page
                result = await self.router.route_survey(page)
                return result
                
        except Exception as e:
            print(f"❌ Error handling survey page: {e}")
            return {
                'status': 'error',
                'message': f'Error: {str(e)}'
            }

    async def run_survey_session(self):
        """Main survey session loop"""
        async with async_playwright() as p:
            # Launch browser
            browser = await p.chromium.launch(
                headless=self.headless,
                args=[
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-blink-features=AutomationControlled',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor'
                ]
            )
            
            # Create context with saved authentication state if available
            context_options = {
                'viewport': {'width': 1920, 'height': 1080},
                'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
            
            if self.auth_state_path and os.path.exists(self.auth_state_path):
                print(f"🔐 Loading saved authentication state from: {self.auth_state_path}")
                context_options['storage_state'] = self.auth_state_path
                context = await browser.new_context(**context_options)
                print("✅ Browser context created with saved authentication state")
            else:
                context = await browser.new_context(**context_options)
                print("✅ Browser context created (no saved authentication state)")
            
            # Create page
            page = await context.new_page()
            
            try:
                # Login to Qmee (skip if using saved authentication state)
                if self.auth_state_path and os.path.exists(self.auth_state_path):
                    print("🔐 Using saved authentication state - skipping login process")
                    
                    # Try to verify login status without navigation first
                    try:
                        # Check current page for login indicators
                        logged_in = False
                        login_indicators = [
                            'a[href*="/logout"]',
                            '.user-menu',
                            '[data-testid*="user"]',
                            '[data-testid*="profile"]',
                            '.user-profile',
                            '.account-menu',
                            'a:has-text("Account")',
                            'a:has-text("Profile")',
                            'a:has-text("Dashboard")'
                        ]
                        
                        for indicator in login_indicators:
                            try:
                                if await page.locator(indicator).count() > 0:
                                    print(f"✅ Successfully authenticated using saved session (found: {indicator})")
                                    logged_in = True
                                    break
                            except Exception:
                                continue
                        
                        if not logged_in:
                            print("⚠️ No login indicators found on current page, attempting navigation...")
                            # Try gentle navigation
                            try:
                                await page.goto("https://www.qmee.com/en-us/surveys", timeout=30000, wait_until='domcontentloaded')
                                await asyncio.sleep(3)
                                
                                # Check again after navigation
                                for indicator in login_indicators:
                                    try:
                                        if await page.locator(indicator).count() > 0:
                                            print(f"✅ Successfully authenticated after navigation (found: {indicator})")
                                            logged_in = True
                                            break
                                    except Exception:
                                        continue
                                        
                            except Exception as nav_error:
                                print(f"⚠️ Navigation failed: {nav_error}")
                                print("   Attempting to continue with current page...")
                        
                        if not logged_in:
                            print("⚠️ Saved session may have expired, attempting login...")
                            if not await self.login_to_qmee(page):
                                print("❌ Failed to login. Exiting.")
                                return
                                
                    except Exception as e:
                        print(f"⚠️ Error checking authentication status: {e}")
                        print("   Attempting normal login process...")
                        if not await self.login_to_qmee(page):
                            print("❌ Failed to login. Exiting.")
                            return
                else:
                    # Normal login process
                    if not await self.login_to_qmee(page):
                        print("❌ Failed to login. Exiting.")
                        return
                
                # Navigate to surveys
                if not await self.navigate_to_surveys(page):
                    print("❌ Failed to navigate to surveys. Exiting.")
                    return
                
                # Main survey loop
                while (self.total_attempts < self.max_total_attempts and 
                       self.surveys_completed < self.max_surveys_per_session):
                    
                    self.total_attempts += 1
                    print(f"\n--- Attempt {self.total_attempts} (Survey {self.surveys_completed + 1}) ---")
                    
                    try:
                        # Find and start survey
                        if not await self.find_and_start_survey(page):
                            print("No surveys available. Waiting...")
                            await asyncio.sleep(10)
                            continue
                        
                        # Handle survey pages
                        while True:
                            try:
                                await page.wait_for_load_state('domcontentloaded', timeout=10000)
                                
                                # Handle current page
                                result = await self.handle_survey_page(page)
                                
                                if result['status'] == 'completed':
                                    print("🎉 Survey completed successfully!")
                                    break
                                    
                                elif result['status'] == 'disqualified':
                                    print("❌ Survey disqualified, looking for next survey...")
                                    break
                                    
                                elif result['status'] == 'routed':
                                    print("🔄 Survey routed, continuing...")
                                    break
                                    
                                elif result['status'] == 'handled':
                                    print("✅ Page handled, continuing...")
                                    await asyncio.sleep(random.uniform(*self.delay_between_actions))
                                    continue
                                    
                                else:
                                    print(f"⚠️ Page handling result: {result['status']}")
                                    await asyncio.sleep(3)
                                    continue
                                    
                            except Exception as e:
                                print(f"❌ Error in survey page loop: {e}")
                                break
                        
                        # Random delay between surveys
                        await asyncio.sleep(random.uniform(5, 10))
                        
                    except Exception as e:
                        print(f"❌ Error in main survey loop: {e}")
                        await asyncio.sleep(5)
                        continue
                
                # Session summary
                await self._print_session_summary()
                
            except Exception as e:
                print(f"❌ Critical error in survey session: {e}")
                
            finally:
                await context.close()
                await browser.close()

    async def _print_session_summary(self):
        """Print session summary"""
        session_duration = datetime.now() - self.session_start_time
        
        print("\n" + "="*50)
        print("📊 SESSION SUMMARY")
        print("="*50)
        print(f"Duration: {session_duration.total_seconds():.2f} seconds")
        print(f"Surveys Completed: {self.surveys_completed}")
        print(f"Surveys Disqualified: {self.surveys_disqualified}")
        print(f"Total Attempts: {self.total_attempts}")
        print(f"Personality Mode: {self.personality_style}")
        print("="*50)

async def main():
    """Main entry point"""
    print("🤖 Improved Survey Bot with Enhanced Router Starting...")
    
    # Create bot instance
    bot = ImprovedSurveyBot(headless=False, personality_style="natural_conversation")
    
    # Run survey session
    await bot.run_survey_session()

if __name__ == "__main__":
    asyncio.run(main())
