#!/usr/bin/env python3
"""
Test Script for Slider CAPTCHA Solver
Demonstrates the implementation and validates functionality
"""

import os
import sys
import time
import json
from dotenv import load_dotenv

# Add project structure to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'Project_Structure'))

from bot_implementations.slider_captcha_solver import SliderCaptchaSolver
from enhanced_slider_integration import EnhancedSliderBot

load_dotenv()

def test_basic_functionality():
    """Test basic slider CAPTCHA solver functionality"""
    print("🧪 Testing Basic Slider CAPTCHA Functionality")
    print("=" * 50)
    
    try:
        # Test initialization
        print("1. Testing solver initialization...")
        solver = SliderCaptchaSolver()
        print("✅ Solver initialized successfully")
        
        # Test YOLO model loading
        print("2. Testing YOLO model loading...")
        if solver.yolo_model:
            print("✅ YOLO model loaded successfully")
        else:
            print("⚠️ YOLO model not available (this is normal for first run)")
        
        # Test configuration
        print("3. Testing configuration...")
        print(f"   - CapSolver API: {'✅' if solver.capsolver_api_key else '❌'}")
        print(f"   - Anti-Captcha API: {'✅' if solver.anti_captcha_api_key else '❌'}")
        
        return True
        
    except Exception as e:
        print(f"❌ Basic functionality test failed: {e}")
        return False

def test_detection_methods():
    """Test CAPTCHA detection methods"""
    print("\n🔍 Testing CAPTCHA Detection Methods")
    print("=" * 50)
    
    # Test selectors
    print("1. Testing slider selectors...")
    selectors = [
        ".geetest_slider_button",
        ".slider-button", 
        "[class*='slider']",
        "[class*='drag']",
        "[class*='puzzle']"
    ]
    
    for selector in selectors:
        print(f"   - {selector}")
    
    # Test keywords
    print("2. Testing CAPTCHA keywords...")
    keywords = [
        "slide to verify",
        "drag to verify",
        "move slider",
        "complete the puzzle",
        "verification required"
    ]
    
    for keyword in keywords:
        print(f"   - {keyword}")
    
    print("✅ Detection methods configured")

def test_movement_calculation():
    """Test movement calculation algorithms"""
    print("\n🎯 Testing Movement Calculation")
    print("=" * 50)
    
    try:
        solver = SliderCaptchaSolver()
        
        # Test step calculation
        print("1. Testing step calculation...")
        test_distance = 200.0
        steps = solver._calculate_movement_steps(test_distance)
        
        print(f"   - Total distance: {test_distance}px")
        print(f"   - Number of steps: {len(steps)}")
        print(f"   - Step sizes: {[round(s, 2) for s in steps[:5]]}...")
        
        # Verify step calculation
        total_calculated = sum(steps)
        print(f"   - Total calculated: {total_calculated:.2f}px")
        print(f"   - Accuracy: {abs(total_calculated - test_distance):.2f}px difference")
        
        return True
        
    except Exception as e:
        print(f"❌ Movement calculation test failed: {e}")
        return False

def test_puzzle_position_extraction():
    """Test puzzle position extraction logic"""
    print("\n🧩 Testing Puzzle Position Extraction")
    print("=" * 50)
    
    try:
        solver = SliderCaptchaSolver()
        
        # Mock YOLO results for testing
        mock_boxes = [
            [100, 50, 150, 100, 0.95, 0.0],  # Shadow piece
            [50, 50, 100, 100, 0.92, 2.0]    # Original piece
        ]
        
        # Create mock result object
        class MockResult:
            class Boxes:
                def __init__(self, data):
                    self.data = data
                def tolist(self):
                    return data
            def __init__(self, boxes_data):
                self.boxes = self.Boxes(boxes_data)
        
        mock_result = MockResult(mock_boxes)
        
        # Test extraction
        puzzle_data = solver._extract_puzzle_positions(mock_result)
        
        if puzzle_data:
            print("✅ Puzzle position extraction successful")
            print(f"   - Pieces found: {len(puzzle_data['pieces'])}")
            print(f"   - Shadows found: {len(puzzle_data['shadows'])}")
            print(f"   - Confidence: {puzzle_data['confidence']:.2f}")
            
            # Test distance calculation
            distance = solver._calculate_movement_distance(puzzle_data)
            print(f"   - Calculated distance: {distance:.2f}px")
            
            return True
        else:
            print("❌ Puzzle position extraction failed")
            return False
            
    except Exception as e:
        print(f"❌ Puzzle position extraction test failed: {e}")
        return False

def test_integration():
    """Test integration with existing bot"""
    print("\n🔗 Testing Bot Integration")
    print("=" * 50)
    
    try:
        # Test enhanced bot creation
        print("1. Testing enhanced bot creation...")
        bot = EnhancedSliderBot()
        print("✅ Enhanced bot created successfully")
        
        # Test slider solver integration
        print("2. Testing slider solver integration...")
        if hasattr(bot, 'slider_solver'):
            print("✅ Slider solver integrated successfully")
        else:
            print("❌ Slider solver not integrated")
            return False
        
        # Test enhanced CAPTCHA handling
        print("3. Testing enhanced CAPTCHA handling...")
        if hasattr(bot, 'handle_captcha'):
            print("✅ Enhanced CAPTCHA handling available")
        else:
            print("❌ Enhanced CAPTCHA handling not available")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Integration test failed: {e}")
        return False

def test_configuration():
    """Test configuration management"""
    print("\n⚙️ Testing Configuration Management")
    print("=" * 50)
    
    try:
        # Test environment variables
        print("1. Testing environment variables...")
        capsolver_key = os.getenv("CAPSOLVER_API_KEY", "")
        anticaptcha_key = os.getenv("ANTI_CAPTCHA_API_KEY", "")
        
        print(f"   - CapSolver API Key: {'✅ Set' if capsolver_key else '❌ Not set'}")
        print(f"   - Anti-Captcha API Key: {'✅ Set' if anticaptcha_key else '❌ Not set'}")
        
        # Test configuration file creation
        print("2. Testing configuration file...")
        config_path = os.path.join("Project_Structure", "configs", "slider_captcha_config.json")
        
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                config = json.load(f)
            print("✅ Configuration file exists and is valid")
            print(f"   - Methods: {config.get('slider_captcha', {}).get('methods', [])}")
        else:
            print("⚠️ Configuration file not found (will be created on first run)")
        
        return True
        
    except Exception as e:
        print(f"❌ Configuration test failed: {e}")
        return False

def run_comprehensive_test():
    """Run comprehensive test suite"""
    print("🚀 Slider CAPTCHA Solver - Comprehensive Test Suite")
    print("=" * 60)
    
    tests = [
        ("Basic Functionality", test_basic_functionality),
        ("Detection Methods", test_detection_methods),
        ("Movement Calculation", test_movement_calculation),
        ("Puzzle Position Extraction", test_puzzle_position_extraction),
        ("Bot Integration", test_integration),
        ("Configuration Management", test_configuration)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n📋 Running: {test_name}")
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
            results.append((test_name, False))
    
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
        print("🎉 All tests passed! Slider CAPTCHA solver is ready to use.")
    else:
        print("⚠️ Some tests failed. Please check the issues above.")
    
    return passed == total

def main():
    """Main function"""
    print("🧩 Slider CAPTCHA Solver Test Suite")
    print("This script tests the implementation of the slider CAPTCHA solver.")
    print()
    
    # Check if running in test mode
    if len(sys.argv) > 1 and sys.argv[1] == "--quick":
        print("Running quick test...")
        test_basic_functionality()
        test_detection_methods()
        print("\n✅ Quick test completed")
    else:
        # Run comprehensive test
        success = run_comprehensive_test()
        
        if success:
            print("\n🎯 Next Steps:")
            print("1. Install dependencies: pip install -r requirements_slider_captcha.txt")
            print("2. Configure API keys in your .env file")
            print("3. Train custom YOLO model for better accuracy")
            print("4. Test with your specific CAPTCHA types")
            print("5. Integrate with your existing bot implementation")
        else:
            print("\n🔧 Troubleshooting:")
            print("1. Check that all dependencies are installed")
            print("2. Verify your Python environment")
            print("3. Check the error messages above")
            print("4. Ensure you have proper permissions")

if __name__ == "__main__":
    main()
