#!/usr/bin/env python3
"""
ChromeOS Qmee Survey Bot
Optimized for ChromeOS with Linux environment
Handles ChromeOS-specific issues and model deprecation
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

class ChromeOSQmeeBot:
    """ChromeOS-optimized Qmee survey bot."""
    
    def __init__(self):
        self.config = Config()
        
    async def test_chromeos_environment(self):
        """Test ChromeOS-specific environment."""
        print("🔍 Testing ChromeOS environment...")
        
        # Check ChromeOS-specific variables
        chromeos_vars = {
            'CHROMEOS': os.getenv('CHROMEOS', ''),
            'CROS_ARC_VERSION': os.getenv('CROS_ARC_VERSION', ''),
            'XDG_CURRENT_DESKTOP': os.getenv('XDG_CURRENT_DESKTOP', ''),
            'WAYLAND_DISPLAY': os.getenv('WAYLAND_DISPLAY', ''),
            'DISPLAY': os.getenv('DISPLAY', '')
        }
        
        print(f"   ChromeOS: {chromeos_vars['CHROMEOS']}")
        print(f"   ARC Version: {chromeos_vars['CROS_ARC_VERSION']}")
        print(f"   Desktop: {chromeos_vars['XDG_CURRENT_DESKTOP']}")
        print(f"   Wayland: {chromeos_vars['WAYLAND_DISPLAY']}")
        print(f"   Display: {chromeos_vars['DISPLAY']}")
        
        # Test screenshot tools
        print("\n🔍 Testing screenshot tools...")
        tools = [
            ("flameshot", ["flameshot", "--help"]),
            ("gnome-screenshot", ["gnome-screenshot", "--help"])
        ]
        
        working_tools = []
        for name, cmd in tools:
            try:
                env = os.environ.copy()
                env['XDG_CURRENT_DESKTOP'] = 'GNOME'
                
                result = subprocess.run(cmd, capture_output=True, text=True, timeout=5, env=env)
                if result.returncode == 0:
                    print(f"✅ {name} working")
                    working_tools.append(name)
                else:
                    print(f"❌ {name} failed")
            except Exception as e:
                print(f"❌ {name} error: {e}")
        
        return working_tools
    
    async def test_operate_models(self):
        """Test operate models with ChromeOS optimizations."""
        print("🧪 Testing operate models for ChromeOS...")
        
        # Updated models (avoiding deprecated ones)
        models = [
            "gemini-1.5-flash",  # Updated from gemini-pro-vision
            "gpt-4o",            # Default OpenAI model
            "gpt-4-with-ocr",    # OCR mode
            "claude-3"           # Claude model
        ]
        
        working_models = []
        
        for model in models:
            try:
                print(f"   Testing {model}...")
                
                # Set ChromeOS-specific environment
                env = os.environ.copy()
                env.update({
                    'DISPLAY': ':0',
                    'WAYLAND_DISPLAY': 'wayland-0',
                    'XDG_SESSION_TYPE': 'wayland',
                    'XDG_CURRENT_DESKTOP': 'GNOME',
                    'PYAUTOGUI_USE_WAYLAND': '1',
                    # Handle API keys for ChromeOS
                    'GOOGLE_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
                    'GEMINI_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
                    'OPENAI_API_KEY': os.getenv('OPENAI_API_KEY', '')
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
                    print(f"✅ {model} works on ChromeOS")
                    working_models.append(model)
                else:
                    print(f"❌ {model} failed: {process.stderr[:100]}...")
                    
            except subprocess.TimeoutExpired:
                print(f"⏰ {model} timed out")
            except Exception as e:
                print(f"❌ {model} error: {e}")
        
        return working_models
    
    async def run_qmee_chromeos(self, model: str):
        """Run Qmee survey with ChromeOS optimizations."""
        print(f"🚀 Starting Qmee survey with {model} (ChromeOS optimized)")
        
        objective = """Navigate to https://qmee.com and complete the following steps:

1. Open a web browser (Chrome works best on ChromeOS)
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

Important: This is running on ChromeOS, so use Chrome browser and be patient with the Linux environment."""

        # ChromeOS-specific environment
        env = os.environ.copy()
        env.update({
            'DISPLAY': ':0',
            'WAYLAND_DISPLAY': 'wayland-0',
            'XDG_SESSION_TYPE': 'wayland',
            'XDG_CURRENT_DESKTOP': 'GNOME',
            'PYAUTOGUI_USE_WAYLAND': '1',
            # API keys for ChromeOS
            'GOOGLE_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
            'GEMINI_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
            'OPENAI_API_KEY': os.getenv('OPENAI_API_KEY', ''),
            # ChromeOS-specific
            'CHROME_FLAGS': '--enable-features=UseOzonePlatform --ozone-platform=wayland'
        })
        
        try:
            cmd = ["operate", "-m", model]
            
            print(f"🎯 Running operate with {model}")
            print(f"   Environment: ChromeOS optimized")
            
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
    
    async def run_chromeos_browser(self):
        """Run with ChromeOS-optimized browser."""
        print("🌐 Starting ChromeOS browser automation...")
        
        try:
            from playwright.async_api import async_playwright
            
            async with async_playwright() as p:
                # ChromeOS-optimized browser launch
                browser = await p.chromium.launch(
                    headless=False,
                    args=[
                        '--no-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-web-security',
                        '--enable-features=UseOzonePlatform',
                        '--ozone-platform=wayland'
                    ],
                    env={
                        'QT_QPA_PLATFORM': 'wayland',
                        'GDK_BACKEND': 'wayland',
                        'XDG_CURRENT_DESKTOP': 'GNOME'
                    }
                )
                
                page = await browser.new_page()
                await page.set_viewport_size({"width": 1280, "height": 720})
                
                print("🌐 Navigating to Qmee with ChromeOS browser...")
                await page.goto("https://qmee.com", wait_until="networkidle")
                
                print("✅ Qmee page loaded successfully")
                print("💡 You can now manually complete the survey process")
                print("⏰ Browser will stay open for 10 minutes...")
                
                await asyncio.sleep(600)  # 10 minutes
                
                await browser.close()
                return True
                
        except ImportError:
            print("❌ Playwright not available. Install with: pip install playwright")
            return False
        except Exception as e:
            print(f"❌ ChromeOS browser failed: {e}")
            return False
    
    async def run(self):
        """Main execution method."""
        print("🤖 ChromeOS Qmee Survey Bot")
        print("=" * 50)
        
        # Test ChromeOS environment
        working_tools = await self.test_chromeos_environment()
        
        # Test operate models
        working_models = await self.test_operate_models()
        
        if working_models:
            print(f"\n✅ Found {len(working_models)} working models: {working_models}")
            
            # Use the first working model
            best_model = working_models[0]
            success = await self.run_qmee_chromeos(best_model)
            
            if not success:
                print("\n🔄 Operate mode failed, trying ChromeOS browser...")
                await self.run_chromeos_browser()
        else:
            print("\n❌ No working models found")
            print("🔄 Trying ChromeOS browser...")
            await self.run_chromeos_browser()

async def main():
    """Main function."""
    bot = ChromeOSQmeeBot()
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
