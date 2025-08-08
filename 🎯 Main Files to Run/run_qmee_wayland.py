#!/usr/bin/env python3
"""
Wayland-Optimized Qmee Survey Bot
Uses Wayland-compatible screenshot tools and improved Self-Operating Computer integration
Based on GitHub issue #248 solution
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

class WaylandQmeeBot:
    """Wayland-optimized Qmee survey bot with improved screenshot handling."""
    
    def __init__(self):
        self.config = Config()
        self.screenshot_working = False
        self.operate_working = False
        
    async def test_wayland_screenshot(self):
        """Test Wayland-compatible screenshot methods."""
        print("🔍 Testing Wayland screenshot methods...")
        
        # Test the gnome-screenshot wrapper
        try:
            result = subprocess.run(['gnome-screenshot', '--help'], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print("✅ gnome-screenshot wrapper working")
                self.screenshot_working = True
            else:
                print("❌ gnome-screenshot wrapper failed")
        except Exception as e:
            print(f"❌ gnome-screenshot test failed: {e}")
        
        # Test flameshot directly
        try:
            result = subprocess.run(['flameshot', '--help'], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print("✅ flameshot working")
            else:
                print("❌ flameshot failed")
        except Exception as e:
            print(f"❌ flameshot test failed: {e}")
        
        # Test grim (Wayland native)
        try:
            result = subprocess.run(['grim', '--help'], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print("✅ grim (Wayland native) working")
            else:
                print("❌ grim failed")
        except Exception as e:
            print(f"❌ grim test failed: {e}")
    
    async def test_operate_wayland(self):
        """Test operate command with Wayland optimizations."""
        print("🧪 Testing operate with Wayland optimizations...")
        
        # Set Wayland-specific environment variables
        env = os.environ.copy()
        env.update({
            'DISPLAY': ':0',
            'WAYLAND_DISPLAY': 'wayland-0',
            'XDG_SESSION_TYPE': 'wayland',
            'PYAUTOGUI_USE_WAYLAND': '1',
            'GNOME_SCREENSHOT_PATH': '/usr/local/bin/gnome-screenshot',
            'FLAMESHOT_PATH': '/usr/bin/flameshot',
            'GRIM_PATH': '/usr/bin/grim'
        })
        
        models = ["gemini-pro-vision", "gpt-4-with-ocr", "claude-3"]
        
        for model in models:
            try:
                print(f"   Testing {model}...")
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
                    print(f"✅ {model} works with Wayland")
                    self.operate_working = True
                    return model
                else:
                    print(f"❌ {model} failed: {process.stderr[:100]}...")
                    
            except subprocess.TimeoutExpired:
                print(f"⏰ {model} timed out")
            except Exception as e:
                print(f"❌ {model} error: {e}")
        
        return None
    
    async def run_qmee_survey_wayland(self, model: str):
        """Run Qmee survey with Wayland-optimized approach."""
        print(f"🚀 Starting Qmee survey with {model} (Wayland optimized)")
        
        # Create Wayland-specific objective
        objective = """Navigate to https://qmee.com and complete the following steps:

1. Open a web browser (Chrome/Firefox)
2. Navigate to https://qmee.com
3. Look for login/sign in button and click it
4. If login form appears, use these credentials:
   - Email: faseofgaming@gmail.com
   - Password: v8lebwEpictAvO
5. Once logged in, look for available surveys
6. Click on surveys to start them
7. Complete surveys naturally and honestly
8. Take your time reading questions
9. Continue until no more surveys are available

Important: Take your time with each step and be patient. Use the screenshot tools available in this Wayland environment."""

        # Set comprehensive Wayland environment
        env = os.environ.copy()
        env.update({
            'DISPLAY': ':0',
            'WAYLAND_DISPLAY': 'wayland-0',
            'XDG_SESSION_TYPE': 'wayland',
            'PYAUTOGUI_USE_WAYLAND': '1',
            'GNOME_SCREENSHOT_PATH': '/usr/local/bin/gnome-screenshot',
            'FLAMESHOT_PATH': '/usr/bin/flameshot',
            'GRIM_PATH': '/usr/bin/grim',
            'QT_QPA_PLATFORM': 'wayland',
            'GDK_BACKEND': 'wayland',
            'MOZ_ENABLE_WAYLAND': '1',
            'CHROME_FLAGS': '--enable-features=UseOzonePlatform --ozone-platform=wayland'
        })
        
        try:
            cmd = ["operate", "-m", model]
            
            print(f"🎯 Running operate with {model}")
            print(f"   Environment: Wayland optimized")
            print(f"   Screenshot: {'✅' if self.screenshot_working else '❌'}")
            
            # Run with longer timeout for survey completion
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
    
    async def run_manual_wayland(self):
        """Run manual mode with Wayland-optimized browser."""
        print("🔄 Starting manual mode with Wayland browser...")
        
        try:
            from playwright.async_api import async_playwright
            
            async with async_playwright() as p:
                # Launch browser with Wayland optimizations
                browser = await p.chromium.launch(
                    headless=False,
                    args=[
                        '--no-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-web-security',
                        '--enable-features=UseOzonePlatform',
                        '--ozone-platform=wayland',
                        '--disable-features=VizDisplayCompositor'
                    ],
                    env={
                        'QT_QPA_PLATFORM': 'wayland',
                        'GDK_BACKEND': 'wayland',
                        'MOZ_ENABLE_WAYLAND': '1'
                    }
                )
                
                page = await browser.new_page()
                await page.set_viewport_size({"width": 1280, "height": 720})
                
                print("🌐 Navigating to Qmee with Wayland browser...")
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
            print(f"❌ Manual Wayland mode failed: {e}")
            return False
    
    async def run(self):
        """Main execution method."""
        print("🤖 Wayland-Optimized Qmee Survey Bot")
        print("=" * 50)
        
        # Test Wayland screenshot methods
        await self.test_wayland_screenshot()
        
        # Test operate with Wayland optimizations
        working_model = await self.test_operate_wayland()
        
        if working_model and self.operate_working:
            print(f"\n✅ Found working model: {working_model}")
            print("🚀 Starting Qmee survey with Wayland optimizations...")
            
            success = await self.run_qmee_survey_wayland(working_model)
            
            if not success:
                print("\n🔄 Operate mode failed, trying manual Wayland mode...")
                await self.run_manual_wayland()
        else:
            print("\n❌ No working operate models found")
            print("🔄 Trying manual Wayland mode...")
            await self.run_manual_wayland()

async def main():
    """Main function."""
    bot = WaylandQmeeBot()
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
