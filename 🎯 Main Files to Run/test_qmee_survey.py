#!/usr/bin/env python3
"""
Test script for Qmee survey automation
Helps troubleshoot Self-Operating Computer issues
"""

import asyncio
import subprocess
import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "📁 Project Structure"))
from config import Config

async def test_qmee_survey():
    """Test Qmee survey automation with different approaches."""
    
    print("🧪 Testing Qmee Survey Automation")
    print("=" * 50)
    
    # Test 1: Simple operate command
    print("\n1️⃣ Testing basic operate command...")
    try:
        cmd = ["operate", "-m", "gpt-4-with-ocr"]
        env = os.environ.copy()
        env.update({
            'DISPLAY': ':0',
            'WAYLAND_DISPLAY': 'wayland-0',
            'XDG_SESSION_TYPE': 'wayland',
            'PYAUTOGUI_USE_WAYLAND': '1'
        })
        
        process = subprocess.run(
            cmd,
            input="Open a web browser and go to https://qmee.com\n",
            capture_output=True,
            text=True,
            env=env,
            timeout=30
        )
        
        if process.returncode == 0:
            print("✅ Basic operate command successful")
            print(f"   Output: {process.stdout[:100]}...")
        else:
            print(f"❌ Basic operate failed: {process.stderr}")
            
    except subprocess.TimeoutExpired:
        print("⏰ Basic operate command timed out")
    except Exception as e:
        print(f"❌ Basic operate error: {e}")
    
    # Test 2: Alternative model
    print("\n2️⃣ Testing with alternative model...")
    try:
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
            input="Navigate to https://qmee.com and check if the page loads\n",
            capture_output=True,
            text=True,
            env=env,
            timeout=30
        )
        
        if process.returncode == 0:
            print("✅ Alternative model successful")
            print(f"   Output: {process.stdout[:100]}...")
        else:
            print(f"❌ Alternative model failed: {process.stderr}")
            
    except subprocess.TimeoutExpired:
        print("⏰ Alternative model timed out")
    except Exception as e:
        print(f"❌ Alternative model error: {e}")
    
    # Test 3: Screen capture test
    print("\n3️⃣ Testing screen capture methods...")
    try:
        import pyautogui
        screenshot = pyautogui.screenshot()
        print("✅ PyAutoGUI screenshot successful")
        
        # Save test screenshot
        screenshot.save("test_screenshot.png")
        print("✅ Test screenshot saved as test_screenshot.png")
        
    except Exception as e:
        print(f"❌ Screen capture test failed: {e}")
    
    print("\n✅ Qmee survey test completed!")

if __name__ == "__main__":
    asyncio.run(test_qmee_survey())
