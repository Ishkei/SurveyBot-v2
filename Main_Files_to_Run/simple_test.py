#!/usr/bin/env python3
"""
Simple Test Script for Survey Bot
This script tests basic functionality without complex imports.
"""

import sys
import os
import asyncio

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure"))

def test_basic_imports():
    """Test basic imports"""
    print("🧪 Testing basic imports...")
    
    try:
        import playwright
        print("✅ Playwright imported")
    except ImportError as e:
        print(f"❌ Playwright import failed: {e}")
    
    try:
        import selenium
        print("✅ Selenium imported")
    except ImportError as e:
        print(f"❌ Selenium import failed: {e}")
    
    try:
        import flask
        print("✅ Flask imported")
    except ImportError as e:
        print(f"❌ Flask import failed: {e}")
    
    try:
        import google.generativeai
        print("✅ Google Generative AI imported")
    except ImportError as e:
        print(f"❌ Google Generative AI import failed: {e}")

def test_config_loading():
    """Test configuration loading"""
    print("\n🔧 Testing configuration loading...")
    
    try:
        from Project_Structure.config import Config
        print("✅ Config module imported")
        print(f"   Browser Type: {Config.BROWSER_TYPE}")
        print(f"   Survey Platform: {Config.SURVEY_PLATFORM}")
        print(f"   Headless Mode: {Config.HEADLESS}")
        return True
    except Exception as e:
        print(f"❌ Configuration error: {e}")
        return False

def test_playwright_basic():
    """Test basic Playwright functionality"""
    print("\n🌐 Testing Playwright basic functionality...")
    
    try:
        from playwright.async_api import async_playwright
        
        async def test_playwright():
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                await page.goto("https://example.com")
                title = await page.title()
                await browser.close()
                return title
        
        # Run the test
        title = asyncio.run(test_playwright())
        print(f"✅ Playwright test successful - Page title: {title}")
        return True
        
    except Exception as e:
        print(f"❌ Playwright test failed: {e}")
        return False

def test_web_interface():
    """Test web interface creation"""
    print("\n🌐 Testing web interface...")
    
    try:
        from flask import Flask
        app = Flask(__name__)
        
        @app.route('/')
        def hello():
            return "Hello, Survey Bot!"
        
        print("✅ Flask app created successfully")
        return True
        
    except Exception as e:
        print(f"❌ Flask test failed: {e}")
        return False

def main():
    """Main test function"""
    print("🧪 Survey Bot Simple Test")
    print("=" * 50)
    
    # Test basic imports
    test_basic_imports()
    
    # Test configuration
    config_ok = test_config_loading()
    
    # Test Playwright
    playwright_ok = test_playwright_basic()
    
    # Test web interface
    web_ok = test_web_interface()
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    if config_ok:
        print("✅ Configuration loaded successfully")
    else:
        print("❌ Configuration issues")
    
    if playwright_ok:
        print("✅ Playwright working correctly")
    else:
        print("❌ Playwright issues")
    
    if web_ok:
        print("✅ Web interface working correctly")
    else:
        print("❌ Web interface issues")
    
    if all([config_ok, playwright_ok, web_ok]):
        print("\n🎉 All basic tests passed! Your setup is ready for basic functionality.")
        print("\nNext steps:")
        print("1. Update your .env file with your API keys and credentials")
        print("2. Test the web interface: python run_bot.py --web-interface")
        print("3. Run a simple bot: python run_bot.py --implementation playwright --platform qmee")
    else:
        print("\n⚠️ Some tests failed. Please check the errors above.")

if __name__ == "__main__":
    main()
