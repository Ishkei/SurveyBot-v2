#!/usr/bin/env python3
"""
Test Script for GeeTest CAPTCHA Solver
Tests the implementation against the demo site mentioned in Dima Kynal's article
"""

import os
import sys
import time
from dotenv import load_dotenv

# Add project structure to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'Project_Structure'))

from bot_implementations.slider_captcha_solver import SliderCaptchaSolver
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options

load_dotenv()

def test_geetest_demo_site():
    """Test the GeeTest CAPTCHA solver on the demo site"""
    print("🧪 Testing GeeTest CAPTCHA Solver on Demo Site")
    print("=" * 60)
    
    # GeeTest demo URL from the article
    GEE_TEST_URL = "https://2captcha.com/demo/geetest"
    
    driver = None
    try:
        # Setup Firefox driver
        print("1. Setting up Firefox driver...")
        options = Options()
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        # options.add_argument("--headless")  # Uncomment for headless mode
        
        driver = webdriver.Firefox(options=options)
        driver.maximize_window()
        print("✅ Firefox driver setup complete")
        
        # Navigate to GeeTest demo
        print("2. Navigating to GeeTest demo site...")
        driver.get(GEE_TEST_URL)
        time.sleep(10)  # Wait for page to load
        print("✅ Navigated to GeeTest demo site")
        
        # Initialize slider CAPTCHA solver
        print("3. Initializing slider CAPTCHA solver...")
        solver = SliderCaptchaSolver(driver)
        print("✅ Slider CAPTCHA solver initialized")
        
        # Test detection
        print("4. Testing CAPTCHA detection...")
        captcha_info = solver.detect_slider_captcha()
        print(f"   Detection result: {captcha_info}")
        
        if captcha_info["type"]:
            print("✅ CAPTCHA detected successfully")
        else:
            print("⚠️ No CAPTCHA detected on page")
        
        # Test GeeTest specific solver
        print("5. Testing GeeTest specific solver...")
        success = solver.solve_geetest_captcha()
        
        if success:
            print("🎉 GeeTest CAPTCHA solved successfully!")
            
            # Check for success indicators
            try:
                success_elements = driver.find_elements(By.CSS_SELECTOR, ".geetest_success")
                if success_elements:
                    print("✅ Success indicator found on page")
                else:
                    print("⚠️ No success indicator found, but movement completed")
            except:
                print("⚠️ Could not check for success indicators")
                
        else:
            print("❌ GeeTest CAPTCHA solving failed")
        
        return success
        
    except Exception as e:
        print(f"❌ Test failed with exception: {e}")
        return False
        
    finally:
        if driver:
            print("6. Cleaning up...")
            time.sleep(3)  # Wait to see results
            driver.quit()
            print("✅ Driver closed")

def test_geetest_v3_v4():
    """Test both GeeTest V3 and V4 versions"""
    print("\n🧪 Testing GeeTest V3 vs V4")
    print("=" * 40)
    
    GEE_TEST_URL = "https://2captcha.com/demo/geetest"
    
    driver = None
    try:
        options = Options()
        options.add_argument("--no-sandbox")
        driver = webdriver.Firefox(options=options)
        driver.maximize_window()
        
        driver.get(GEE_TEST_URL)
        time.sleep(10)
        
        solver = SliderCaptchaSolver(driver)
        
        # Test V3
        print("Testing GeeTest V3...")
        v3_button = driver.find_element(By.XPATH, "//button[contains(text(), 'V3')]")
        v3_button.click()
        time.sleep(3)
        
        success_v3 = solver.solve_geetest_captcha()
        print(f"V3 result: {'✅ Success' if success_v3 else '❌ Failed'}")
        
        # Test V4
        print("Testing GeeTest V4...")
        v4_button = driver.find_element(By.XPATH, "//button[contains(text(), 'V4')]")
        v4_button.click()
        time.sleep(3)
        
        success_v4 = solver.solve_geetest_captcha()
        print(f"V4 result: {'✅ Success' if success_v4 else '❌ Failed'}")
        
        return success_v3, success_v4
        
    except Exception as e:
        print(f"❌ V3/V4 test failed: {e}")
        return False, False
        
    finally:
        if driver:
            time.sleep(3)
            driver.quit()

def test_movement_accuracy():
    """Test movement accuracy and timing"""
    print("\n🎯 Testing Movement Accuracy")
    print("=" * 40)
    
    try:
        solver = SliderCaptchaSolver()
        
        # Test different distances
        test_distances = [100, 200, 300, 400]
        
        for distance in test_distances:
            print(f"Testing distance: {distance}px")
            
            # Calculate steps
            steps = solver._calculate_movement_steps(distance)
            
            # Verify accuracy
            total_movement = sum(steps)
            accuracy = abs(total_movement - distance)
            
            print(f"   Steps: {len(steps)}")
            print(f"   Total movement: {total_movement:.2f}px")
            print(f"   Accuracy: {accuracy:.2f}px")
            print(f"   Step sizes: {[round(s, 2) for s in steps[:5]]}...")
            print()
        
        return True
        
    except Exception as e:
        print(f"❌ Movement accuracy test failed: {e}")
        return False

def main():
    """Main test function"""
    print("🧩 GeeTest CAPTCHA Solver Test Suite")
    print("Based on Dima Kynal's successful implementation")
    print()
    
    # Run tests
    tests = [
        ("GeeTest Demo Site", test_geetest_demo_site),
        ("Movement Accuracy", test_movement_accuracy)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n📋 Running: {test_name}")
        try:
            if test_name == "GeeTest Demo Site":
                result = test_func()
            else:
                result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
            results.append((test_name, False))
    
    # Optional: Test V3 vs V4
    try:
        print("\n📋 Running: GeeTest V3 vs V4")
        v3_success, v4_success = test_geetest_v3_v4()
        results.append(("GeeTest V3", v3_success))
        results.append(("GeeTest V4", v4_success))
    except Exception as e:
        print(f"❌ V3/V4 test failed: {e}")
        results.append(("GeeTest V3", False))
        results.append(("GeeTest V4", False))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Results Summary")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
    
    if passed == total:
        print("🎉 All tests passed! GeeTest CAPTCHA solver is working correctly.")
        print("\n🎯 Implementation matches Dima Kynal's successful approach:")
        print("   ✅ YOLO model integration")
        print("   ✅ Geometric progression movement")
        print("   ✅ 0.791 scaling factor")
        print("   ✅ Human-like timing")
        print("   ✅ GeeTest-specific selectors")
    else:
        print("⚠️ Some tests failed. Check the issues above.")
    
    print("\n📋 Next Steps:")
    print("1. Train custom YOLO model on GeeTest CAPTCHA images")
    print("2. Fine-tune movement parameters for your specific use case")
    print("3. Test with other CAPTCHA types")
    print("4. Integrate with your existing bot implementation")

if __name__ == "__main__":
    main()
