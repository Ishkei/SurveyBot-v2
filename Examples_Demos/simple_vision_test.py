#!/usr/bin/env python3
"""
Simple test for vision dependencies
"""

def test_basic_imports():
    """Test basic imports."""
    print("🔍 Testing Basic Imports...")
    
    try:
        import cv2
        print("✅ OpenCV - OK")
    except ImportError as e:
        print(f"❌ OpenCV - FAILED: {e}")
        return False
    
    try:
        import pytesseract
        print("✅ pytesseract - OK")
    except ImportError as e:
        print(f"❌ pytesseract - FAILED: {e}")
        return False
    
    try:
        from PIL import Image
        print("✅ Pillow - OK")
    except ImportError as e:
        print(f"❌ Pillow - FAILED: {e}")
        return False
    
    try:
        import numpy as np
        print("✅ numpy - OK")
    except ImportError as e:
        print(f"❌ numpy - FAILED: {e}")
        return False
    
    return True

def test_advanced_bot():
    """Test advanced bot import."""
    print("\n🔍 Testing Advanced Bot...")
    
    try:
        from bot_implementations.advanced_survey_bot import AdvancedSurveyBot
        print("✅ Advanced Survey Bot - OK")
        return True
    except Exception as e:
        print(f"❌ Advanced Bot - FAILED: {e}")
        return False

def test_personality():
    """Test personality system."""
    print("\n🔍 Testing Personality System...")
    
    try:
        from personality_responses import generate_personality_response
        print("✅ Personality System - OK")
        return True
    except Exception as e:
        print(f"❌ Personality System - FAILED: {e}")
        return False

def main():
    """Main test function."""
    print("🎮 Simple Vision Dependencies Test")
    print("=" * 50)
    
    tests = [
        ("Basic Imports", test_basic_imports),
        ("Advanced Bot", test_advanced_bot),
        ("Personality System", test_personality)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append(result)
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {e}")
            results.append(False)
    
    print("\n" + "=" * 50)
    print("📊 Test Results:")
    print("=" * 50)
    
    passed = sum(results)
    total = len(results)
    
    for i, (test_name, _) in enumerate(tests):
        status = "✅ PASS" if results[i] else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n🎯 Overall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Vision dependencies are ready.")
        print("\n🚀 Next steps:")
        print("   1. Set up API keys in configs/vision_advanced_config.json")
        print("   2. Configure survey site URL")
        print("   3. Run: python run_bot.py --config vision_advanced_config.json")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")

if __name__ == "__main__":
    main()
