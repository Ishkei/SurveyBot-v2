#!/usr/bin/env python3
"""
SurveyBot Setup Test
Tests all components to ensure everything is working
"""

import sys
import os
import importlib
import subprocess
from pathlib import Path

def test_import(module_name, description):
    """Test if a module can be imported"""
    try:
        importlib.import_module(module_name)
        print(f"✅ {description}")
        return True
    except ImportError as e:
        print(f"❌ {description}: {e}")
        return False

def test_file_exists(file_path, description):
    """Test if a file exists"""
    if os.path.exists(file_path):
        print(f"✅ {description}")
        return True
    else:
        print(f"❌ {description}: File not found")
        return False

def test_command(command, description):
    """Test if a command runs successfully"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            print(f"✅ {description}")
            return True
        else:
            print(f"❌ {description}: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ {description}: {e}")
        return False

def main():
    """Main test function"""
    print("🧪 SurveyBot Setup Test")
    print("=" * 40)
    
    tests_passed = 0
    total_tests = 0
    
    # Test Python version
    total_tests += 1
    if sys.version_info >= (3, 8):
        print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} (3.8+ required)")
        tests_passed += 1
    else:
        print(f"❌ Python {sys.version_info.major}.{sys.version_info.minor} (3.8+ required)")
    
    # Test core imports
    core_modules = [
        ("asyncio", "AsyncIO support"),
        ("playwright", "Playwright browser automation"),
        ("selenium", "Selenium browser automation"),
        ("undetected_chromedriver", "Undetected Chrome driver"),
        ("google.generativeai", "Google Gemini AI"),
        ("requests", "HTTP requests"),
        ("json", "JSON support"),
        ("os", "Operating system interface"),
        ("sys", "System-specific parameters"),
    ]
    
    for module, description in core_modules:
        total_tests += 1
        if test_import(module, description):
            tests_passed += 1
    
    # Test bot implementations
    bot_files = [
        ("bot_implementations/survey_bot_v2ray.py", "V2Ray Enhanced Bot"),
        ("bot_implementations/survey_bot_undetected.py", "Undetected Chrome Bot"),
        ("bot_implementations/survey_bot_selenium.py", "Selenium Bot"),
        ("bot_implementations/survey_bot_playwright.py", "Playwright Bot"),
    ]
    
    for file_path, description in bot_files:
        total_tests += 1
        if test_file_exists(file_path, description):
            tests_passed += 1
    
    # Test proxy management
    proxy_files = [
        ("proxy_management/proxy_manager_v2ray.py", "V2Ray Proxy Manager"),
        ("proxy_management/proxy_manager_basic.py", "Basic Proxy Manager"),
    ]
    
    for file_path, description in proxy_files:
        total_tests += 1
        if test_file_exists(file_path, description):
            tests_passed += 1
    
    # Test configuration files
    config_files = [
        ("configs/v2ray_proxies.json", "V2Ray Proxy Configuration"),
        ("configs/persona.json", "Personality Configuration"),
        ("configs/sample_v2ray_proxies.json", "Sample Proxy Configuration"),
    ]
    
    for file_path, description in config_files:
        total_tests += 1
        if test_file_exists(file_path, description):
            tests_passed += 1
    
    # Test scripts
    script_files = [
        ("scripts/setup_v2ray.py", "V2Ray Setup Script"),
        ("scripts/test_implementations.py", "Implementation Test Script"),
        ("scripts/telegram_v2ray_servers.py", "Telegram Server Converter"),
    ]
    
    for file_path, description in script_files:
        total_tests += 1
        if test_file_exists(file_path, description):
            tests_passed += 1
    
    # Test main files
    main_files = [
        ("run_bot.py", "Main Entry Point"),
        ("config.py", "Configuration Management"),
        ("actions.py", "Core Actions"),
        ("personality_responses.py", "Personality System"),
        ("requirements.txt", "Dependencies"),
        ("README.md", "Documentation"),
    ]
    
    for file_path, description in main_files:
        total_tests += 1
        if test_file_exists(file_path, description):
            tests_passed += 1
    
    # Test V2Ray binary (if exists)
    total_tests += 1
    if os.path.exists("v2ray/v2ray") or os.path.exists("v2ray/v2ray.exe"):
        print("✅ V2Ray binary found")
        tests_passed += 1
    else:
        print("⚠️ V2Ray binary not found (run: python scripts/setup_v2ray.py)")
    
    # Summary
    print("\n" + "=" * 40)
    print(f"📊 Test Results: {tests_passed}/{total_tests} tests passed")
    
    if tests_passed == total_tests:
        print("🎉 All tests passed! SurveyBot is ready to use.")
        print("\n📋 Next steps:")
        print("1. Configure your .env file with API keys")
        print("2. Run: python run_bot.py --implementation v2ray")
        print("3. Check docs/ for detailed guides")
    else:
        print("⚠️ Some tests failed. Please check the errors above.")
        print("\n🔧 Troubleshooting:")
        print("1. Run: python setup.py")
        print("2. Install missing dependencies")
        print("3. Check file permissions")

if __name__ == "__main__":
    main()
