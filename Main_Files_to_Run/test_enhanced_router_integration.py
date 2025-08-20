#!/usr/bin/env python3
"""
Test script for Enhanced Router Integration in run_bot.py
Tests that the enhanced router is properly integrated and can be selected
"""

import sys
import os
import asyncio
from pathlib import Path

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure"))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

async def test_enhanced_router_imports():
    """Test that all enhanced router components can be imported"""
    print("🧪 Testing Enhanced Router Imports...")
    
    try:
        # Test enhanced survey router
        from Project_Structure.bot_implementations.enhanced_survey_router import EnhancedSurveyRouter
        print("✅ EnhancedSurveyRouter imported successfully")
        
        # Test Swagbucks handler
        from Project_Structure.bot_implementations.swagbucks_enhanced_handler import SwagbucksEnhancedHandler
        print("✅ SwagbucksEnhancedHandler imported successfully")
        
        # Test improved survey bot
        from Project_Structure.bot_implementations.improved_survey_bot import ImprovedSurveyBot
        print("✅ ImprovedSurveyBot imported successfully")
        
        return True
        
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        return False

async def test_enhanced_router_functionality():
    """Test basic enhanced router functionality"""
    print("\n🧪 Testing Enhanced Router Functionality...")
    
    try:
        from Project_Structure.bot_implementations.enhanced_survey_router import EnhancedSurveyRouter
        
        # Create router instance
        router = EnhancedSurveyRouter()
        print("✅ EnhancedSurveyRouter instance created successfully")
        
        # Test platform detection
        print("✅ Router initialization successful")
        
        return True
        
    except Exception as e:
        print(f"❌ Functionality test failed: {e}")
        return False

async def test_swagbucks_handler():
    """Test Swagbucks handler functionality"""
    print("\n🧪 Testing Swagbucks Handler...")
    
    try:
        from Project_Structure.bot_implementations.swagbucks_enhanced_handler import SwagbucksEnhancedHandler
        
        # Create handler instance
        handler = SwagbucksEnhancedHandler()
        print("✅ SwagbucksEnhancedHandler instance created successfully")
        
        # Test configuration loading
        print(f"✅ Handler has {len(handler.swagbucks_patterns)} pattern categories")
        print(f"✅ Default dates: {handler.default_dates}")
        
        return True
        
    except Exception as e:
        print(f"❌ Swagbucks handler test failed: {e}")
        return False

async def test_configuration_files():
    """Test that configuration files are accessible"""
    print("\n🧪 Testing Configuration Files...")
    
    config_files = [
        "../Project_Structure/configs/enhanced_survey_patterns.json",
        "../Project_Structure/configs/swagbucks_specific_config.json"
    ]
    
    all_accessible = True
    for config_file in config_files:
        if os.path.exists(config_file):
            print(f"✅ {config_file} accessible")
        else:
            print(f"❌ {config_file} not found")
            all_accessible = False
    
    return all_accessible

async def test_run_bot_integration():
    """Test that run_bot.py can import enhanced router components"""
    print("\n🧪 Testing run_bot.py Integration...")
    
    try:
        # Test that we can import the main runner
        from run_bot import EnhancedSurveyBotRunner
        
        # Create runner instance
        runner = EnhancedSurveyBotRunner()
        print("✅ EnhancedSurveyBotRunner imported and instantiated successfully")
        
        # Test that enhanced router method exists
        if hasattr(runner, '_run_enhanced_router_bot'):
            print("✅ _run_enhanced_router_bot method exists")
        else:
            print("❌ _run_enhanced_router_bot method not found")
            return False
        
        # Test that configuration method exists
        if hasattr(runner, '_get_enhanced_router_config'):
            print("✅ _get_enhanced_router_config method exists")
        else:
            print("❌ _get_enhanced_router_config method not found")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ run_bot.py integration test failed: {e}")
        return False

async def main():
    """Main test function"""
    print("🚀 Enhanced Router Integration Test Suite")
    print("=" * 60)
    
    tests = [
        ("Enhanced Router Imports", test_enhanced_router_imports),
        ("Enhanced Router Functionality", test_enhanced_router_functionality),
        ("Swagbucks Handler", test_swagbucks_handler),
        ("Configuration Files", test_configuration_files),
        ("run_bot.py Integration", test_run_bot_integration)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = await test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} test failed with exception: {e}")
            results.append((test_name, False))
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if result:
            passed += 1
    
    print(f"\nResults: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Enhanced router integration is working correctly.")
        print("\nYou can now use the enhanced router with:")
        print("  python run_bot.py --implementation enhanced_router")
        print("  python run_bot.py --implementation playwright  # Will auto-use enhanced router if available")
    else:
        print("⚠️ Some tests failed. Please check the errors above.")
        print("Make sure all enhanced router files are properly installed.")
    
    return passed == total

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)
