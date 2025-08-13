#!/usr/bin/env python3
"""
Quick test script for captcha solving APIs
"""

import os
import requests
from dotenv import load_dotenv

load_dotenv()

def test_capsolver_api():
    """Test CapSolver API connection and balance"""
    api_key = os.getenv("CAPSOLVER_API_KEY")
    
    if not api_key or api_key == "your_capsolver_api_key_here":
        print("❌ CAPSOLVER_API_KEY not configured")
        return False
    
    try:
        url = "https://api.capsolver.com/getBalance"
        payload = {"clientKey": api_key}
        response = requests.post(url, json=payload, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if "balance" in result:
                balance = result["balance"]
                print(f"✅ CapSolver API working - Balance: ${balance}")
                if float(balance) < 1.0:
                    print("⚠️  Low balance - consider adding funds")
                return True
            else:
                print(f"❌ CapSolver API error: {result}")
                return False
        else:
            print(f"❌ CapSolver API request failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ CapSolver API test failed: {e}")
        return False

def test_anticaptcha_api():
    """Test Anti-Captcha API connection and balance"""
    api_key = os.getenv("ANTI_CAPTCHA_API_KEY")
    
    if not api_key or api_key == "your_anticaptcha_api_key_here":
        print("❌ ANTI_CAPTCHA_API_KEY not configured")
        return False
    
    try:
        url = "https://api.anti-captcha.com/getBalance"
        payload = {"clientKey": api_key}
        response = requests.post(url, json=payload, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if "balance" in result:
                balance = result["balance"]
                print(f"✅ Anti-Captcha API working - Balance: ${balance}")
                if float(balance) < 1.0:
                    print("⚠️  Low balance - consider adding funds")
                return True
            else:
                print(f"❌ Anti-Captcha API error: {result}")
                return False
        else:
            print(f"❌ Anti-Captcha API request failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Anti-Captcha API test failed: {e}")
        return False

def test_local_ocr():
    """Test local OCR capabilities"""
    try:
        import pytesseract
        from PIL import Image
        
        # Create a simple test image
        img = Image.new('RGB', (100, 30), color='white')
        img.save('test_captcha.png')
        
        # Test OCR
        text = pytesseract.image_to_string(img)
        print("✅ Local OCR working")
        
        # Clean up
        os.remove('test_captcha.png')
        return True
        
    except ImportError:
        print("⚠️  pytesseract not installed")
        print("   Install with: pip install pytesseract")
        print("   On Ubuntu/Debian: sudo apt-get install tesseract-ocr")
        return False
    except Exception as e:
        print(f"❌ Local OCR test failed: {e}")
        return False

def main():
    """Run all API tests"""
    print("🧪 Testing Captcha Solving APIs\n")
    
    tests = [
        ("CapSolver API", test_capsolver_api),
        ("Anti-Captcha API", test_anticaptcha_api),
        ("Local OCR", test_local_ocr),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n{'='*50}")
        print(f"Testing: {test_name}")
        print('='*50)
        
        if test_func():
            passed += 1
            print(f"✅ {test_name} PASSED")
        else:
            print(f"❌ {test_name} FAILED")
    
    print(f"\n{'='*50}")
    print(f"Results: {passed}/{total} APIs working")
    print('='*50)
    
    if passed == total:
        print("🎉 All captcha solving APIs working!")
        print("Your Enhanced SurveyBot is ready to handle captchas.")
    elif passed > 0:
        print("⚠️  Some APIs working. Consider setting up the failed ones.")
        print("At least one captcha solving method is recommended.")
    else:
        print("❌ No captcha solving APIs working.")
        print("Please set up at least one captcha solving service.")
        print("\nQuick setup:")
        print("1. Get CapSolver API key: https://capsolver.com/")
        print("2. Add to .env: CAPSOLVER_API_KEY=your_key")
        print("3. Add funds to your account")
    
    print(f"\n📋 Configuration Summary:")
    print(f"   CapSolver: {'✅' if test_capsolver_api() else '❌'}")
    print(f"   Anti-Captcha: {'✅' if test_anticaptcha_api() else '❌'}")
    print(f"   Local OCR: {'✅' if test_local_ocr() else '❌'}")

if __name__ == "__main__":
    main()
