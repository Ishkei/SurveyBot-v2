"""
Enhanced Qmee Survey Bot
Integrates enhanced survey router with improved platform detection
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
from enhanced_survey_router import EnhancedSurveyRouter

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

class EnhancedQmeeBot:
    """
    Enhanced Qmee survey bot with improved survey routing and platform detection
    """
    
    def __init__(self, headless: bool = False, personality_style: str = "natural_conversation"):
        self.headless = headless
        self.personality_style = personality_style
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
            
            # Navigate to login page
            await page.goto("https://www.qmee.com/en-us/login", timeout=30000)
            await page.wait_for_load_state('domcontentloaded')
            
            # Fill login form
            await page.fill('input[name="email"]', email)
            await page.fill('input[name="password"]', password)
            
            # Click login button
            await page.click('button[type="submit"]')
            
            # Wait for login to complete
            try:
                await page.wait_for_url("**/dashboard**", timeout=15000)
                print("✅ Login successful")
                return True
            except:
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
            await page.goto("https://www.qmee.com/en-us/surveys", timeout=30000)
            await page.wait_for_load_state('domcontentloaded')
            await asyncio.sleep(3)
            return True
        except Exception as e:
            print(f"❌ Error navigating to surveys: {e}")
            return False

    async def find_and_start_survey(self, page: Page) -> bool:
        """Find and start an available survey"""
        try:
            print("🔍 Looking for available surveys...")
            
            # Wait for survey elements to load
            await page.wait_for_selector('[data-testid="survey-card"], .survey-card, .survey-item', timeout=15000)
            
            # Look for survey start buttons
            start_selectors = [
                'button:has-text("Start")',
                'button:has-text("Take Survey")',
                'button:has-text("Begin")',
                'a:has-text("Start")',
                'a:has-text("Take Survey")',
                '[data-testid="start-survey-button"]',
                '.start-survey-btn'
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
            
            # Create context
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            )
            
            # Create page
            page = await context.new_page()
            
            try:
                # Login to Qmee
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
    print("🤖 Enhanced Qmee Survey Bot Starting...")
    
    # Create bot instance
    bot = EnhancedQmeeBot(headless=False, personality_style="natural_conversation")
    
    # Run survey session
    await bot.run_survey_session()

if __name__ == "__main__":
    asyncio.run(main())
