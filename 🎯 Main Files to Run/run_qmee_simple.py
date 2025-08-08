#!/usr/bin/env python3
"""
Simple Qmee Survey Bot
Uses working screenshot tools and reliable browser automation
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

class SimpleQmeeBot:
    """Simple but effective Qmee survey bot."""
    
    def __init__(self):
        self.config = Config()
        
    async def test_screenshot_tools(self):
        """Test available screenshot tools."""
        print("🔍 Testing screenshot tools...")
        
        tools = [
            ("gnome-screenshot", ["gnome-screenshot", "--help"]),
            ("flameshot", ["flameshot", "--help"]),
            ("grim", ["grim", "--help"])
        ]
        
        working_tools = []
        
        for name, cmd in tools:
            try:
                # Set environment for flameshot
                env = os.environ.copy()
                if name == "flameshot":
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
    
    async def run_operate_simple(self):
        """Run operate command with simple approach."""
        print("🤖 Trying operate command...")
        
        objective = """Navigate to https://qmee.com and:
1. Open a web browser
2. Go to https://qmee.com
3. Look for login button and click it
4. Use these credentials:
   - Email: faseofgaming@gmail.com
   - Password: v8lebwEpictAvO
5. Once logged in, find and complete available surveys
6. Take your time and be thorough

Use the available screenshot tools to help with navigation."""
        
        # Set environment with working screenshot tools and API keys
        env = os.environ.copy()
        env.update({
            'DISPLAY': ':0',
            'WAYLAND_DISPLAY': 'wayland-0',
            'XDG_SESSION_TYPE': 'wayland',
            'XDG_CURRENT_DESKTOP': 'GNOME',
            'PYAUTOGUI_USE_WAYLAND': '1',
            # Handle both API key formats for compatibility
            'GOOGLE_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
            'GEMINI_API_KEY': os.getenv('GOOGLE_API_KEY', ''),
            'OPENAI_API_KEY': os.getenv('OPENAI_API_KEY', '')
        })
        
        try:
            cmd = ["operate", "-m", "gemini-1.5-flash"]
            
            print("🎯 Running operate with gemini-1.5-flash")
            
            process = subprocess.run(
                cmd,
                input=objective + '\n',
                capture_output=True,
                text=True,
                env=env,
                timeout=300  # 5 minutes
            )
            
            if process.returncode == 0:
                print("✅ Operate command completed successfully!")
                print(f"   Output: {process.stdout[:200]}...")
                return True
            else:
                print(f"❌ Operate command failed: {process.stderr}")
                return False
                
        except subprocess.TimeoutExpired:
            print("⏰ Operate command timed out")
            return False
        except Exception as e:
            print(f"❌ Operate command error: {e}")
            return False
    
    async def run_browser_simple(self):
        """Run with simple browser automation."""
        print("🌐 Starting simple browser automation...")
        
        try:
            from playwright.async_api import async_playwright
            
            async with async_playwright() as p:
                # Use simple browser launch without Wayland complications
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
    
    async def run(self):
        """Main execution method."""
        print("🤖 Simple Qmee Survey Bot")
        print("=" * 40)
        
        # Test screenshot tools
        working_tools = await self.test_screenshot_tools()
        
        if working_tools:
            print(f"✅ Found {len(working_tools)} working screenshot tools: {working_tools}")
        else:
            print("⚠️ No screenshot tools found")
        
        # Try operate command first
        operate_success = await self.run_operate_simple()
        
        if not operate_success:
            print("\n🔄 Operate failed, trying browser automation...")
            await self.run_browser_simple()
        else:
            print("✅ Operate mode completed successfully!")

async def main():
    """Main function."""
    bot = SimpleQmeeBot()
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
