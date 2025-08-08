#!/usr/bin/env python3
"""
Robust Qmee Survey Bot
Uses alternative approaches to bypass Self-Operating Computer screen capture issues
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

class RobustQmeeBot:
    """Robust Qmee survey bot with multiple fallback approaches."""
    
    def __init__(self):
        self.config = Config()
        self.working_models = []
        self.screen_capture_working = False
        
    async def test_screen_capture(self):
        """Test different screen capture methods."""
        print("🔍 Testing screen capture methods...")
        
        methods = [
            ("PyAutoGUI", self._test_pyautogui),
            ("mss", self._test_mss),
            ("PIL", self._test_pil)
        ]
        
        for name, test_func in methods:
            try:
                if await test_func():
                    print(f"✅ {name} screen capture working")
                    if name == "PyAutoGUI":
                        self.screen_capture_working = True
                else:
                    print(f"❌ {name} screen capture failed")
            except Exception as e:
                print(f"❌ {name} screen capture error: {e}")
    
    async def _test_pyautogui(self):
        """Test PyAutoGUI screen capture."""
        try:
            import pyautogui
            screenshot = pyautogui.screenshot()
            return True
        except:
            return False
    
    async def _test_mss(self):
        """Test mss screen capture."""
        try:
            import mss
            with mss.mss() as sct:
                screenshot = sct.shot()
                return True
        except:
            return False
    
    async def _test_pil(self):
        """Test PIL screen capture."""
        try:
            from PIL import ImageGrab
            screenshot = ImageGrab.grab()
            return True
        except:
            return False
    
    async def test_operate_models(self):
        """Test different operate models to find working ones."""
        print("🧪 Testing operate models...")
        
        models = [
            "gemini-pro-vision",
            "gpt-4-with-ocr", 
            "claude-3",
            "gpt-4o"
        ]
        
        for model in models:
            try:
                print(f"   Testing {model}...")
                success = await self._test_model(model)
                if success:
                    self.working_models.append(model)
                    print(f"✅ {model} works")
                else:
                    print(f"❌ {model} failed")
            except Exception as e:
                print(f"❌ {model} error: {e}")
    
    async def _test_model(self, model: str) -> bool:
        """Test a specific operate model."""
        try:
            cmd = ["operate", "-m", model]
            env = os.environ.copy()
            env.update({
                'DISPLAY': ':0',
                'WAYLAND_DISPLAY': 'wayland-0',
                'XDG_SESSION_TYPE': 'wayland',
                'PYAUTOGUI_USE_WAYLAND': '1'
            })
            
            process = subprocess.run(
                cmd,
                input="Open a web browser\n",
                capture_output=True,
                text=True,
                env=env,
                timeout=15
            )
            
            return process.returncode == 0
            
        except subprocess.TimeoutExpired:
            return False
        except Exception:
            return False
    
    async def run_qmee_survey(self, model: str = None):
        """Run Qmee survey with specified or best available model."""
        
        if not model:
            if self.working_models:
                model = self.working_models[0]
                print(f"🎯 Using best available model: {model}")
            else:
                print("❌ No working models found")
                return False
        
        print(f"🚀 Starting Qmee survey with {model}")
        
        # Create a more specific objective
        objective = """Navigate to https://qmee.com and:
1. Look for a sign in or login button
2. If login is required, use the credentials from the environment
3. Once logged in, look for available surveys
4. Complete surveys naturally, taking time to read questions
5. Be thorough and honest in responses
6. Continue until no more surveys are available

Take your time and be patient with each step."""
        
        try:
            cmd = ["operate", "-m", model]
            env = os.environ.copy()
            env.update({
                'DISPLAY': ':0',
                'WAYLAND_DISPLAY': 'wayland-0',
                'XDG_SESSION_TYPE': 'wayland',
                'PYAUTOGUI_USE_WAYLAND': '1'
            })
            
            print(f"🎯 Running operate with {model}")
            print(f"   Objective: {objective[:100]}...")
            
            # Run with longer timeout for survey completion
            process = subprocess.run(
                cmd,
                input=objective + '\n',
                capture_output=True,
                text=True,
                env=env,
                timeout=300  # 5 minutes timeout
            )
            
            if process.returncode == 0:
                print("✅ Qmee survey completed successfully")
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
    
    async def run_alternative_approach(self):
        """Run alternative approach using browser automation."""
        print("🔄 Trying alternative browser automation approach...")
        
        try:
            # Use playwright for browser automation
            import asyncio
            from playwright.async_api import async_playwright
            
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=False)
                page = await browser.new_page()
                
                print("🌐 Navigating to Qmee...")
                await page.goto("https://qmee.com")
                
                # Wait for page to load
                await page.wait_for_load_state("networkidle")
                
                print("✅ Qmee page loaded successfully")
                print("💡 You can now manually complete the survey process")
                
                # Keep browser open for manual completion
                await asyncio.sleep(30)
                
                await browser.close()
                return True
                
        except ImportError:
            print("❌ Playwright not available. Install with: pip install playwright")
            return False
        except Exception as e:
            print(f"❌ Alternative approach failed: {e}")
            return False
    
    async def run(self):
        """Main execution method."""
        print("🤖 Robust Qmee Survey Bot")
        print("=" * 50)
        
        # Test screen capture
        await self.test_screen_capture()
        
        # Test operate models
        await self.test_operate_models()
        
        if self.working_models:
            print(f"\n✅ Found {len(self.working_models)} working models: {self.working_models}")
            
            # Try Qmee survey with best model
            success = await self.run_qmee_survey()
            
            if not success:
                print("\n🔄 Trying alternative approach...")
                await self.run_alternative_approach()
        else:
            print("\n❌ No working models found, trying alternative approach...")
            await self.run_alternative_approach()

async def main():
    """Main function."""
    bot = RobustQmeeBot()
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
