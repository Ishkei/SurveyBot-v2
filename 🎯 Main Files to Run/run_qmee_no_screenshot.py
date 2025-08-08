#!/usr/bin/env python3
"""
No-Screenshot Qmee Survey Bot
Bypasses problematic screenshot tools and uses direct browser automation
"""

import asyncio
import subprocess
import os
import sys
import time
from pathlib import Path

# Add parent directory to path for imports
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "📁 Project Structure"))
from config import Config

class NoScreenshotQmeeBot:
    """Qmee survey bot that doesn't rely on problematic screenshot tools."""
    
    def __init__(self):
        self.config = Config()
        
    async def test_operate_without_screenshot(self):
        """Test operate command without relying on screenshot tools."""
        print("🧪 Testing operate without screenshot tools...")
        
        # Models that work well without screenshot dependencies
        models = [
            "gpt-4o",            # Default OpenAI model
            "gpt-4-with-ocr",    # OCR mode
            "claude-3"           # Claude model
        ]
        
        working_models = []
        
        for model in models:
            try:
                print(f"   Testing {model}...")
                
                # Set environment without screenshot tools
                env = os.environ.copy()
                env.update({
                    'DISPLAY': ':0',
                    'WAYLAND_DISPLAY': 'wayland-0',
                    'XDG_SESSION_TYPE': 'wayland',
                    'XDG_CURRENT_DESKTOP': 'GNOME',
                    'PYAUTOGUI_USE_WAYLAND': '1',
                    # API keys
                    'GOOGLE_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
                    'GEMINI_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
                    'OPENAI_API_KEY': os.getenv('OPENAI_API_KEY', ''),
                    # Disable problematic screenshot tools
                    'FLAMESHOT_DISABLE': '1',
                    'GNOME_SCREENSHOT_DISABLE': '1'
                })
                
                cmd = ["operate", "-m", model]
                
                process = subprocess.run(
                    cmd,
                    input="Open a web browser\n",
                    capture_output=True,
                    text=True,
                    env=env,
                    timeout=15
                )
                
                if process.returncode == 0:
                    print(f"✅ {model} works without screenshot tools")
                    working_models.append(model)
                else:
                    print(f"❌ {model} failed: {process.stderr[:100]}...")
                    
            except subprocess.TimeoutExpired:
                print(f"⏰ {model} timed out")
            except Exception as e:
                print(f"❌ {model} error: {e}")
        
        return working_models
    
    async def run_qmee_direct(self, model: str):
        """Run Qmee survey with direct browser approach."""
        print(f"🚀 Starting Qmee survey with {model} (direct approach)")
        
        objective = """Navigate to https://qmee.com and complete the following steps:

1. Open a web browser (Chrome works best)
2. Navigate to https://qmee.com
3. Look for login/sign in button and click it
4. Use these credentials:
   - Email: faseofgaming@gmail.com
   - Password: v8lebwEpictAvO
5. Once logged in, look for available surveys
6. Click on surveys to start them
7. Complete surveys naturally and honestly
8. Take your time reading questions
9. Continue until no more surveys are available

Important: Use direct browser interaction, no screenshot tools needed."""
        
        # Environment without screenshot tools
        env = os.environ.copy()
        env.update({
            'DISPLAY': ':0',
            'WAYLAND_DISPLAY': 'wayland-0',
            'XDG_SESSION_TYPE': 'wayland',
            'XDG_CURRENT_DESKTOP': 'GNOME',
            'PYAUTOGUI_USE_WAYLAND': '1',
            # API keys
            'GOOGLE_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
            'GEMINI_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
            'OPENAI_API_KEY': os.getenv('OPENAI_API_KEY', ''),
            # Disable problematic tools
            'FLAMESHOT_DISABLE': '1',
            'GNOME_SCREENSHOT_DISABLE': '1'
        })
        
        try:
            cmd = ["operate", "-m", model]
            
            print(f"🎯 Running operate with {model}")
            print(f"   Approach: Direct browser interaction")
            print(f"   Screenshot tools: Disabled")
            
            process = subprocess.run(
                cmd,
                input=objective + '\n',
                capture_output=True,
                text=True,
                env=env,
                timeout=600  # 10 minutes timeout
            )
            
            if process.returncode == 0:
                print("✅ Qmee survey completed successfully!")
                print(f"   Output: {process.stdout[:200]}...")
                return True
            else:
                print(f"❌ Qmee survey failed: {process.stderr}")
                return False
                
        except subprocess.TimeoutExpired:
            print("⏰ Qmee survey timed out")
            return False
        except Exception as e:
            print(f"❌ Qmee survey error: {e}")
            return False
    
    async def run_browser_only(self):
        """Run with browser-only approach (no operate command)."""
        print("🌐 Starting browser-only automation...")
        
        try:
            from playwright.async_api import async_playwright
            
            async with async_playwright() as p:
                # Simple browser launch without Wayland complications
                browser = await p.chromium.launch(
                    headless=False,
                    args=[
                        '--no-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-web-security'
                    ]
                )
                
                page = await browser.new_page()
                await page.set_viewport_size({"width": 1280, "height": 720})
                
                print("🌐 Navigating to Qmee...")
                await page.goto("https://qmee.com", wait_until="networkidle")
                
                print("✅ Qmee page loaded successfully")
                print("💡 You can now manually complete the survey process")
                print("⏰ Browser will stay open for 10 minutes...")
                
                # Keep browser open for manual completion
                await asyncio.sleep(600)  # 10 minutes
                
                await browser.close()
                return True
                
        except ImportError:
            print("❌ Playwright not available. Install with: pip install playwright")
            return False
        except Exception as e:
            print(f"❌ Browser automation failed: {e}")
            return False
    
    async def run_manual_instructions(self):
        """Provide manual instructions for Qmee completion."""
        print("📋 Manual Qmee Survey Instructions")
        print("=" * 50)
        print("Since automated tools are having issues, here are manual steps:")
        print()
        print("1. Open Chrome browser")
        print("2. Go to https://qmee.com")
        print("3. Click 'Sign In' or 'Login'")
        print("4. Use these credentials:")
        print("   - Email: faseofgaming@gmail.com")
        print("   - Password: v8lebwEpictAvO")
        print("5. Once logged in, look for available surveys")
        print("6. Click on surveys to start them")
        print("7. Complete surveys naturally and honestly")
        print("8. Take your time reading questions")
        print("9. Continue until no more surveys are available")
        print()
        print("💡 Tips:")
        print("- Use Chrome browser for best compatibility")
        print("- Be patient with page loading")
        print("- Take breaks between surveys")
        print("- Be honest in your responses")
        print()
        print("✅ Manual approach is often more reliable than automated tools!")
    
    async def run(self):
        """Main execution method."""
        print("🤖 No-Screenshot Qmee Survey Bot")
        print("=" * 50)
        
        # Test operate without screenshot tools
        working_models = await self.test_operate_without_screenshot()
        
        if working_models:
            print(f"\n✅ Found {len(working_models)} working models: {working_models}")
            
            # Use the first working model
            best_model = working_models[0]
            success = await self.run_qmee_direct(best_model)
            
            if not success:
                print("\n🔄 Operate mode failed, trying browser-only approach...")
                await self.run_browser_only()
        else:
            print("\n❌ No working models found")
            print("🔄 Trying browser-only approach...")
            await self.run_browser_only()
            
            if not success:
                print("\n📋 Providing manual instructions...")
                await self.run_manual_instructions()

async def main():
    """Main function."""
    bot = NoScreenshotQmeeBot()
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
