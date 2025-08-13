#!/usr/bin/env python3
"""
Test script for Enhanced SurveyBot features
Demonstrates advanced stealth, captcha solving, and AI capabilities
"""

import os
import sys
import json
import time
from pathlib import Path

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent))

from bot_implementations.survey_bot_enhanced import (
    EnhancedSurveyBot, 
    EnhancedCaptchaSolver, 
    EnhancedStealthBrowser
)
from config import Config

def test_captcha_solver():
    """Test captcha solving capabilities"""
    print("🧪 Testing Captcha Solver...")
    
    solver = EnhancedCaptchaSolver()
    
    # Test configuration
    assert solver.capsolver_api_key == os.getenv("CAPSOLVER_API_KEY", "")
    assert solver.anti_captcha_api_key == os.getenv("ANTI_CAPTCHA_API_KEY", "")
    assert solver.local_solving == (os.getenv("LOCAL_CAPTCHA_SOLVING", "true").lower() == "true")
    
    print("✅ Captcha solver configuration validated")
    return True

def test_stealth_browser():
    """Test stealth browser initialization"""
    print("🧪 Testing Stealth Browser...")
    
    browser = EnhancedStealthBrowser()
    
    # Test browser initialization (without actually starting)
    try:
        # Test configuration loading
        config = Config.get_browser_config()
        assert "headless" in config
        assert "user_agent" in config
        
        print("✅ Stealth browser configuration validated")
        return True
    except Exception as e:
        print(f"❌ Stealth browser test failed: {e}")
        return False

def test_enhanced_bot_initialization():
    """Test enhanced bot initialization"""
    print("🧪 Testing Enhanced Bot Initialization...")
    
    try:
        bot = EnhancedSurveyBot()
        
        # Test AI model setup
        if bot.model:
            print("✅ AI model initialized")
        else:
            print("⚠️  AI model not available (check GOOGLE_API_KEY)")
        
        # Test persona loading
        assert hasattr(bot, 'persona')
        assert hasattr(bot, 'persona_prompt')
        print("✅ Persona configuration loaded")
        
        # Test V2Ray manager
        assert hasattr(bot, 'v2ray_manager')
        print("✅ V2Ray proxy manager initialized")
        
        print("✅ Enhanced bot initialization successful")
        return True
        
    except Exception as e:
        print(f"❌ Enhanced bot initialization failed: {e}")
        return False

def test_configuration_loading():
    """Test enhanced configuration loading"""
    print("🧪 Testing Configuration Loading...")
    
    try:
        # Test enhanced config
        config_path = "configs/enhanced_config.json"
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                enhanced_config = json.load(f)
            
            # Validate key sections
            assert "captcha_solving" in enhanced_config
            assert "stealth_settings" in enhanced_config
            assert "proxy_settings" in enhanced_config
            assert "ai_settings" in enhanced_config
            
            print("✅ Enhanced configuration loaded successfully")
            return True
        else:
            print("⚠️  Enhanced configuration file not found")
            return False
            
    except Exception as e:
        print(f"❌ Configuration loading failed: {e}")
        return False

def test_proxy_management():
    """Test V2Ray proxy management"""
    print("🧪 Testing Proxy Management...")
    
    try:
        from proxy_management.proxy_manager_v2ray import V2RayProxyManager
        
        manager = V2RayProxyManager(v2ray_path="./v2ray/v2ray")
        
        # Test config loading
        configs_loaded = manager.load_configs_from_file()
        if configs_loaded:
            print("✅ V2Ray proxy configurations loaded")
        else:
            print("⚠️  No V2Ray proxy configurations found")
        
        # Test proxy selection
        best_proxy = manager.get_best_proxy()
        if best_proxy:
            print(f"✅ Best proxy found: {best_proxy.name}")
        else:
            print("⚠️  No working proxies available")
        
        return True
        
    except Exception as e:
        print(f"❌ Proxy management test failed: {e}")
        return False

def test_ai_integration():
    """Test AI model integration"""
    print("🧪 Testing AI Integration...")
    
    try:
        import google.generativeai as genai
        
        api_key = os.getenv("GOOGLE_API_KEY", "")
        if api_key and api_key != "YOUR_GOOGLE_API_KEY":
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-1.5-flash-latest')
            print("✅ Google Gemini AI model initialized")
            return True
        else:
            print("⚠️  Google API key not configured")
            return False
            
    except Exception as e:
        print(f"❌ AI integration test failed: {e}")
        return False

def test_environment_setup():
    """Test environment and dependencies"""
    print("🧪 Testing Environment Setup...")
    
    # Test required packages
    required_packages = [
        'undetected_chromedriver',
        'selenium',
        'google.generativeai',
        'requests',
        'dotenv'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print(f"❌ Missing packages: {missing_packages}")
        return False
    else:
        print("✅ All required packages installed")
    
    # Test environment variables
    env_vars = [
        "GOOGLE_API_KEY",
        "CAPSOLVER_API_KEY", 
        "ANTI_CAPTCHA_API_KEY"
    ]
    
    missing_env = []
    for var in env_vars:
        if not os.getenv(var):
            missing_env.append(var)
    
    if missing_env:
        print(f"⚠️  Missing environment variables: {missing_env}")
    else:
        print("✅ All environment variables configured")
    
    return True

def run_comprehensive_test():
    """Run all tests"""
    print("🚀 Starting Enhanced SurveyBot Tests\n")
    
    tests = [
        ("Environment Setup", test_environment_setup),
        ("Configuration Loading", test_configuration_loading),
        ("Captcha Solver", test_captcha_solver),
        ("Stealth Browser", test_stealth_browser),
        ("Proxy Management", test_proxy_management),
        ("AI Integration", test_ai_integration),
        ("Enhanced Bot Initialization", test_enhanced_bot_initialization),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n{'='*50}")
        print(f"Running: {test_name}")
        print('='*50)
        
        try:
            if test_func():
                passed += 1
                print(f"✅ {test_name} PASSED")
            else:
                print(f"❌ {test_name} FAILED")
        except Exception as e:
            print(f"❌ {test_name} ERROR: {e}")
    
    print(f"\n{'='*50}")
    print(f"Test Results: {passed}/{total} tests passed")
    print('='*50)
    
    if passed == total:
        print("🎉 All tests passed! Enhanced SurveyBot is ready to use.")
        return True
    else:
        print("⚠️  Some tests failed. Please check the configuration.")
        return False

def demo_enhanced_features():
    """Demonstrate enhanced features"""
    print("\n🎯 Enhanced Features Demo")
    print("="*50)
    
    # Load enhanced configuration
    try:
        with open('configs/enhanced_config.json', 'r') as f:
            config = json.load(f)
        
        print("📋 Enhanced Configuration:")
        print(f"  - Captcha Solving: {'✅' if config['captcha_solving']['enabled'] else '❌'}")
        print(f"  - Stealth Settings: {'✅' if config['stealth_settings']['humanize_interactions'] else '❌'}")
        print(f"  - Proxy Management: {'✅' if config['proxy_settings']['v2ray_enabled'] else '❌'}")
        print(f"  - AI Integration: {'✅' if config['ai_settings']['use_vision'] else '❌'}")
        
    except Exception as e:
        print(f"❌ Could not load enhanced configuration: {e}")
    
    # Show available survey platforms
    print("\n🌐 Supported Survey Platforms:")
    platforms = ["qmee", "earnhaus", "prolific"]
    for platform in platforms:
        print(f"  - {platform.capitalize()}")
    
    # Show stealth features
    print("\n🛡️ Stealth Features:")
    stealth_features = [
        "Humanized Interactions",
        "Random Delays", 
        "WebDriver Detection Prevention",
        "Random User Agents",
        "Window Size Randomization"
    ]
    for feature in stealth_features:
        print(f"  - {feature}")
    
    # Show captcha solving capabilities
    print("\n🤖 Captcha Solving:")
    captcha_types = [
        "reCAPTCHA v2/v3",
        "hCaptcha", 
        "Image Captcha",
        "Simple Text Captcha"
    ]
    for captcha_type in captcha_types:
        print(f"  - {captcha_type}")

if __name__ == "__main__":
    # Run comprehensive tests
    success = run_comprehensive_test()
    
    if success:
        # Show feature demo
        demo_enhanced_features()
        
        print("\n🚀 Enhanced SurveyBot is ready!")
        print("To start using it, run:")
        print("  python bot_implementations/survey_bot_enhanced.py")
    else:
        print("\n❌ Please fix the failed tests before using Enhanced SurveyBot")
        sys.exit(1)
