#!/usr/bin/env python3
"""
Hybrid Qmee Survey Bot
Combines Self-Operating Computer with browser automation for maximum reliability
"""

import asyncio
import subprocess
import os
import sys
import time
import random
from pathlib import Path

# Add parent directory to path for imports
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "📁 Project Structure"))
from config import Config

class HybridQmeeBot:
    """Hybrid Qmee survey bot combining multiple approaches."""
    
    def __init__(self):
        self.config = Config()
        self.browser = None
        self.page = None
        
    async def setup_browser(self):
        """Setup browser for automation."""
        try:
            from playwright.async_api import async_playwright
            
            self.playwright = await async_playwright().start()
            self.browser = await self.playwright.chromium.launch(
                headless=False,
                args=[
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor'
                ]
            )
            self.page = await self.browser.new_page()
            
            # Set viewport
            await self.page.set_viewport_size({"width": 1280, "height": 720})
            
            print("✅ Browser setup complete")
            return True
            
        except ImportError:
            print("❌ Playwright not available. Install with: pip install playwright")
            return False
        except Exception as e:
            print(f"❌ Browser setup failed: {e}")
            return False
    
    async def navigate_to_qmee(self):
        """Navigate to Qmee website."""
        try:
            print("🌐 Navigating to Qmee...")
            await self.page.goto("https://qmee.com", wait_until="networkidle")
            
            # Wait for page to load
            await asyncio.sleep(3)
            
            print("✅ Successfully navigated to Qmee")
            return True
            
        except Exception as e:
            print(f"❌ Navigation failed: {e}")
            return False
    
    async def try_login(self):
        """Attempt to login to Qmee."""
        try:
            print("🔐 Attempting to login...")
            
            # Look for login elements
            login_selectors = [
                'a[href*="login"]',
                'button:has-text("Login")',
                'button:has-text("Sign In")',
                '[data-testid*="login"]',
                '.login-button',
                '#login-button'
            ]
            
            for selector in login_selectors:
                try:
                    login_button = await self.page.wait_for_selector(selector, timeout=5000)
                    if login_button:
                        await login_button.click()
                        print("✅ Found and clicked login button")
                        
                        # Wait for login form
                        await asyncio.sleep(2)
                        
                        # Look for email/username field
                        email_selectors = [
                            'input[type="email"]',
                            'input[name="email"]',
                            'input[name="username"]',
                            '#email',
                            '#username'
                        ]
                        
                        for email_selector in email_selectors:
                            try:
                                email_field = await self.page.wait_for_selector(email_selector, timeout=3000)
                                if email_field:
                                    # Get credentials from environment
                                    email = os.getenv('QME_EMAIL', '')
                                    password = os.getenv('QME_PASSWORD', '')
                                    
                                    if email and password:
                                        await email_field.fill(email)
                                        print(f"✅ Filled email: {email[:10]}...")
                                        
                                        # Find password field
                                        password_selectors = [
                                            'input[type="password"]',
                                            'input[name="password"]',
                                            '#password'
                                        ]
                                        
                                        for pwd_selector in password_selectors:
                                            try:
                                                pwd_field = await self.page.wait_for_selector(pwd_selector, timeout=3000)
                                                if pwd_field:
                                                    await pwd_field.fill(password)
                                                    print("✅ Filled password")
                                                    
                                                    # Find submit button
                                                    submit_selectors = [
                                                        'button[type="submit"]',
                                                        'input[type="submit"]',
                                                        'button:has-text("Login")',
                                                        'button:has-text("Sign In")'
                                                    ]
                                                    
                                                    for submit_selector in submit_selectors:
                                                        try:
                                                            submit_button = await self.page.wait_for_selector(submit_selector, timeout=3000)
                                                            if submit_button:
                                                                await submit_button.click()
                                                                print("✅ Clicked submit button")
                                                                
                                                                # Wait for login to complete
                                                                await asyncio.sleep(5)
                                                                print("✅ Login process completed")
                                                                return True
                                                        except:
                                                            continue
                                            except:
                                                continue
                                    else:
                                        print("⚠️ Qmee credentials not found in environment")
                                        return False
                            except:
                                continue
                        break
                except:
                    continue
            
            print("⚠️ Could not complete login automatically")
            return False
            
        except Exception as e:
            print(f"❌ Login failed: {e}")
            return False
    
    async def find_surveys(self):
        """Look for available surveys."""
        try:
            print("🔍 Looking for available surveys...")
            
            # Common survey selectors
            survey_selectors = [
                '.survey-card',
                '.survey-item',
                '[data-testid*="survey"]',
                'a[href*="survey"]',
                '.available-survey',
                '.survey-link'
            ]
            
            for selector in survey_selectors:
                try:
                    surveys = await self.page.query_selector_all(selector)
                    if surveys:
                        print(f"✅ Found {len(surveys)} potential surveys")
                        return surveys
                except:
                    continue
            
            print("⚠️ No surveys found with common selectors")
            return []
            
        except Exception as e:
            print(f"❌ Survey search failed: {e}")
            return []
    
    async def run_manual_mode(self):
        """Run in manual mode with browser open."""
        try:
            print("🤖 Starting manual mode...")
            
            # Setup browser
            if not await self.setup_browser():
                return False
            
            # Navigate to Qmee
            if not await self.navigate_to_qmee():
                return False
            
            # Try login
            await self.try_login()
            
            # Look for surveys
            surveys = await self.find_surveys()
            
            if surveys:
                print(f"🎯 Found {len(surveys)} surveys available")
                print("💡 You can now manually complete the surveys")
            else:
                print("💡 No surveys found automatically, but you can browse manually")
            
            # Keep browser open for manual completion
            print("⏰ Browser will stay open for 5 minutes for manual completion...")
            await asyncio.sleep(300)
            
            return True
            
        except Exception as e:
            print(f"❌ Manual mode failed: {e}")
            return False
        finally:
            if self.browser:
                await self.browser.close()
            if hasattr(self, 'playwright'):
                await self.playwright.stop()
    
    async def run_operate_mode(self):
        """Run with operate command as backup."""
        try:
            print("🤖 Trying operate command mode...")
            
            objective = """Navigate to https://qmee.com and:
1. Look for login/sign in button and click it
2. If login form appears, use the credentials from environment variables
3. Once logged in, look for available surveys
4. Click on surveys to start them
5. Complete surveys naturally and honestly
6. Take your time reading questions
7. Continue until no more surveys are available

Be patient and thorough with each step."""
            
            cmd = ["operate", "-m", "gemini-pro-vision"]
            env = os.environ.copy()
            env.update({
                'DISPLAY': ':0',
                'WAYLAND_DISPLAY': 'wayland-0',
                'XDG_SESSION_TYPE': 'wayland',
                'PYAUTOGUI_USE_WAYLAND': '1'
            })
            
            process = subprocess.run(
                cmd,
                input=objective + '\n',
                capture_output=True,
                text=True,
                env=env,
                timeout=180  # 3 minutes timeout
            )
            
            if process.returncode == 0:
                print("✅ Operate command completed")
                return True
            else:
                print(f"❌ Operate command failed: {process.stderr}")
                return False
                
        except subprocess.TimeoutExpired:
            print("⏰ Operate command timed out")
            return False
        except Exception as e:
            print(f"❌ Operate mode failed: {e}")
            return False
    
    async def run(self):
        """Main execution method."""
        print("🤖 Hybrid Qmee Survey Bot")
        print("=" * 50)
        
        # Try operate mode first
        operate_success = await self.run_operate_mode()
        
        if not operate_success:
            print("\n🔄 Operate mode failed, trying manual mode...")
            await self.run_manual_mode()
        else:
            print("✅ Operate mode completed successfully!")

async def main():
    """Main function."""
    bot = HybridQmeeBot()
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
