#!/usr/bin/env python3
"""
Test script for different bot implementations.
"""

import sys
import os
import asyncio
import time
from typing import Dict, Any

# Add parent directory to path to import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import Config

def test_config():
    """Test configuration loading"""
    print("Testing configuration...")
    
    try:
        Config.print_config()
        if Config.validate_config():
            print("✓ Configuration is valid")
            return True
        else:
            print("✗ Configuration has errors")
            return False
    except Exception as e:
        print(f"✗ Configuration test failed: {e}")
        return False

def test_proxy_manager():
    """Test proxy manager functionality"""
    print("\nTesting proxy manager...")
    
    try:
        from proxy_management.proxy_manager_v2ray import ProxyManager
        
        manager = ProxyManager()
        
        # Test loading proxies
        if manager.load_proxies_from_file():
            print("✓ Loaded proxies from file")
        else:
            print("✓ Loaded proxies from online sources")
        
        # Test getting next proxy
        proxy = manager.get_next_proxy()
        if proxy:
            print(f"✓ Got proxy: {proxy}")
        else:
            print("✗ No proxy available")
        
        print("✓ Proxy manager test passed")
        return True
        
    except ImportError:
        print("✗ Proxy manager not available")
        return False
    except Exception as e:
        print(f"✗ Proxy manager test failed: {e}")
        return False

def test_selenium_import():
    """Test Selenium implementation imports"""
    print("\nTesting Selenium imports...")
    
    try:
        import selenium
        import undetected_chromedriver
        print("✓ Selenium imports successful")
        return True
    except ImportError as e:
        print(f"✗ Selenium imports failed: {e}")
        return False

def test_undetected_import():
    """Test undetected-chromedriver imports"""
    print("\nTesting undetected-chromedriver imports...")
    
    try:
        import undetected_chromedriver
        print("✓ Undetected-chromedriver imports successful")
        return True
    except ImportError as e:
        print(f"✗ Undetected-chromedriver imports failed: {e}")
        return False

def test_playwright_import():
    """Test Playwright implementation imports"""
    print("\nTesting Playwright imports...")
    
    try:
        from bot_implementations.survey_bot_playwright import main as playwright_main
        print("✓ Playwright imports successful")
        return True
    except ImportError as e:
        print(f"✗ Playwright imports failed: {e}")
        return False

def test_ai_model():
    """Test AI model functionality"""
    print("\nTesting AI model...")
    
    try:
        import google.generativeai as genai
        
        if not Config.GOOGLE_API_KEY:
            print("⚠ No Google API key set - AI features will be limited")
            return True
        
        genai.configure(api_key=Config.GOOGLE_API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        # Test simple generation
        response = model.generate_content("Hello")
        if response.text:
            print("✓ AI model test passed")
            return True
        else:
            print("✗ AI model test failed - no response")
            return False
            
    except Exception as e:
        print(f"✗ AI model test failed: {e}")
        return False

def test_persona():
    """Test persona loading"""
    print("\nTesting persona loading...")
    
    try:
        import json
        
        with open('persona.json', 'r') as f:
            persona = json.load(f)
        
        if persona and 'about_you' in persona:
            print("✓ Persona loaded successfully")
            return True
        else:
            print("✗ Persona file is invalid")
            return False
            
    except FileNotFoundError:
        print("✗ Persona file not found")
        return False
    except Exception as e:
        print(f"✗ Persona test failed: {e}")
        return False

def test_requirements():
    """Test that all required packages are installed"""
    print("\nTesting requirements...")
    
    required_packages = [
        'playwright',
        'selenium', 
        'undetected_chromedriver',
        'google.generativeai',
        'requests',
        'dotenv'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package}")
        except ImportError:
            print(f"✗ {package}")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\nMissing packages: {', '.join(missing_packages)}")
        print("Run: pip install -r requirements.txt")
        return False
    else:
        print("✓ All required packages installed")
        return True

def run_all_tests():
    """Run all tests"""
    print("Running implementation tests...\n")
    
    tests = [
        ("Configuration", test_config),
        ("Requirements", test_requirements),
        ("Persona", test_persona),
        ("Proxy Manager", test_proxy_manager),
        ("Playwright", test_playwright_import),
        ("Selenium", test_selenium_import),
        ("Undetected-Chromedriver", test_undetected_import),
        ("AI Model", test_ai_model)
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        try:
            results[test_name] = test_func()
        except Exception as e:
            print(f"✗ {test_name} test crashed: {e}")
            results[test_name] = False
    
    # Print summary
    print("\n" + "="*50)
    print("TEST SUMMARY")
    print("="*50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "PASS" if result else "FAIL"
        print(f"{test_name:25} {status}")
        if result:
            passed += 1
    
    print("="*50)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("✓ All tests passed! Your setup is ready.")
        return True
    else:
        print("✗ Some tests failed. Please fix the issues above.")
        return False

def main():
    """Main test function"""
    print("Survey Bot Implementation Tests")
    print("="*40)
    
    success = run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! You can now run the bot.")
        print("\nNext steps:")
        print("1. Configure your .env file with API keys")
        print("2. Test proxies: python run_bot.py --test-proxies")
        print("3. Run the bot: python run_bot.py --implementation undetected")
    else:
        print("\n❌ Some tests failed. Please fix the issues before running the bot.")
        print("\nCommon fixes:")
        print("1. Install dependencies: pip install -r requirements.txt")
        print("2. Setup environment: python run_bot.py --setup")
        print("3. Configure API keys in .env file")
    
    return success

if __name__ == "__main__":
    main()
