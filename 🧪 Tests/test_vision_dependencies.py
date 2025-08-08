#!/usr/bin/env python3
"""
Test script to verify vision dependencies are working
"""

import sys
import traceback

def test_imports():
    """Test if all vision dependencies can be imported."""
    print("🔍 Testing Vision Dependencies...")
    print("=" * 50)
    
    dependencies = [
        ("opencv-python", "cv2"),
        ("pytesseract", "pytesseract"),
        ("Pillow", "PIL"),
        ("pyautogui", "pyautogui"),
        ("numpy", "numpy")
    ]
    
    results = []
    
    for package_name, import_name in dependencies:
        try:
            __import__(import_name)
            print(f"✅ {package_name} - OK")
            results.append(True)
        except ImportError as e:
            print(f"❌ {package_name} - FAILED: {e}")
            results.append(False)
    
    return all(results)

def test_tesseract():
    """Test if tesseract OCR is working."""
    print("\n🔍 Testing Tesseract OCR...")
    print("-" * 30)
    
    try:
        import pytesseract
        from PIL import Image
        import numpy as np
        
        # Create a simple test image with text
        test_image = Image.new('RGB', (200, 50), color='white')
        # Note: This is just a test - real OCR would need actual text in the image
        
        # Test if pytesseract can be called
        try:
            # This should work even with a blank image
            text = pytesseract.image_to_string(test_image)
            print("✅ Tesseract OCR - OK")
            return True
        except Exception as e:
            print(f"❌ Tesseract OCR - FAILED: {e}")
            return False
            
    except Exception as e:
        print(f"❌ Tesseract test failed: {e}")
        return False

def test_opencv():
    """Test if OpenCV is working."""
    print("\n🔍 Testing OpenCV...")
    print("-" * 20)
    
    try:
        import cv2
        import numpy as np
        
        # Create a test image
        test_image = np.zeros((100, 100, 3), dtype=np.uint8)
        
        # Test basic OpenCV operations
        gray = cv2.cvtColor(test_image, cv2.COLOR_RGB2GRAY)
        _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
        
        print("✅ OpenCV - OK")
        return True
        
    except Exception as e:
        print(f"❌ OpenCV test failed: {e}")
        return False

def test_pyautogui():
    """Test if PyAutoGUI is working."""
    print("\n🔍 Testing PyAutoGUI...")
    print("-" * 25)
    
    try:
        import pyautogui
        
        # Test if we can get screen size
        screen_width, screen_height = pyautogui.size()
        print(f"✅ PyAutoGUI - OK (Screen: {screen_width}x{screen_height})")
        return True
        
    except Exception as e:
        print(f"❌ PyAutoGUI test failed: {e}")
        return False

def test_advanced_bot():
    """Test if the advanced bot can be imported."""
    print("\n🔍 Testing Advanced Bot Import...")
    print("-" * 35)
    
    try:
        sys.path.append('.')
        from bot_implementations.advanced_survey_bot import AdvancedSurveyBot
        
        # Test creating a bot instance
        config = {
            "USE_VISION_MODEL": True,
            "USE_OCR": True,
            "USE_MOUSE_CONTROL": True,
            "personality_settings": {"style": "discord_casual"}
        }
        
        bot = AdvancedSurveyBot(config)
        print("✅ Advanced Survey Bot - OK")
        return True
        
    except Exception as e:
        print(f"❌ Advanced Bot test failed: {e}")
        traceback.print_exc()
        return False

def main():
    """Main test function."""
    print("🎮 Vision Dependencies Test")
    print("=" * 50)
    
    tests = [
        ("Basic Imports", test_imports),
        ("Tesseract OCR", test_tesseract),
        ("OpenCV", test_opencv),
        ("PyAutoGUI", test_pyautogui),
        ("Advanced Bot", test_advanced_bot)
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
    print("📊 Test Results Summary:")
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
        print("\n💡 Troubleshooting:")
        print("   - Make sure all packages are installed: pip install opencv-python pytesseract pillow pyautogui numpy")
        print("   - Check if tesseract is installed: which tesseract")
        print("   - Verify Python environment and permissions")

if __name__ == "__main__":
    main()
