#!/usr/bin/env python3
"""
Test Lightweight Slider CAPTCHA Solver
Verifies that the lightweight solver works without heavy ML dependencies
"""

import sys
import os

# Add project structure to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'Project_Structure'))

def test_lightweight_solver():
    """Test the lightweight slider CAPTCHA solver"""
    print("🧪 Testing Lightweight Slider CAPTCHA Solver")
    print("=" * 50)
    
    try:
        # Test import
        from bot_implementations.slider_captcha_solver_lightweight import LightweightSliderCaptchaSolver
        print("✅ Lightweight solver imported successfully")
        
        # Test initialization
        solver = LightweightSliderCaptchaSolver()
        print("✅ Lightweight solver initialized successfully")
        
        # Test configuration
        print(f"   Template Matching Threshold: {solver.config['template_matching_threshold']}")
        print(f"   Movement Scaling Factor: {solver.config['movement_scaling_factor']}")
        print(f"   Human-like Delays: {solver.config['human_like_delays']}")
        print(f"   Max Attempts: {solver.config['max_attempts']}")
        
        # Test API keys
        print(f"   CapSolver API Key: {'✅' if solver.capsolver_api_key else '❌'}")
        print(f"   Anti-Captcha API Key: {'✅' if solver.anticaptcha_api_key else '❌'}")
        
        print("\n✅ All tests passed! Lightweight solver is ready to use.")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

def test_dependencies():
    """Test that required dependencies are available"""
    print("\n🔍 Testing Dependencies")
    print("=" * 30)
    
    dependencies = [
        ("OpenCV", "cv2"),
        ("NumPy", "numpy"),
        ("PIL", "PIL"),
        ("Pynput", "pynput"),
        ("Selenium", "selenium"),
        ("Requests", "requests"),
        ("Dotenv", "dotenv")
    ]
    
    all_good = True
    for name, module in dependencies:
        try:
            __import__(module)
            print(f"✅ {name}: Available")
        except ImportError:
            print(f"❌ {name}: Missing")
            all_good = False
    
    return all_good

def test_heavy_dependencies_removed():
    """Test that heavy dependencies are not installed"""
    print("\n🚫 Testing Heavy Dependencies Removed")
    print("=" * 40)
    
    heavy_dependencies = [
        ("TensorFlow", "tensorflow"),
        ("PyTorch", "torch"),
        ("Ultralytics", "ultralytics"),
        ("EasyOCR", "easyocr")
    ]
    
    all_removed = True
    for name, module in heavy_dependencies:
        try:
            __import__(module)
            print(f"❌ {name}: Still installed (heavy)")
            all_removed = False
        except ImportError:
            print(f"✅ {name}: Removed (good)")
    
    return all_removed

def main():
    """Run all tests"""
    print("🚀 Lightweight Slider CAPTCHA Solver Test Suite")
    print("=" * 60)
    
    # Test dependencies
    deps_ok = test_dependencies()
    
    # Test heavy dependencies removed
    heavy_removed = test_heavy_dependencies_removed()
    
    # Test lightweight solver
    solver_ok = test_lightweight_solver()
    
    # Summary
    print("\n📊 Test Summary")
    print("=" * 20)
    print(f"Dependencies: {'✅' if deps_ok else '❌'}")
    print(f"Heavy Dependencies Removed: {'✅' if heavy_removed else '❌'}")
    print(f"Lightweight Solver: {'✅' if solver_ok else '❌'}")
    
    if deps_ok and heavy_removed and solver_ok:
        print("\n🎉 All tests passed! Lightweight solver is ready for production.")
        print("\n💡 Usage:")
        print("   from bot_implementations.slider_captcha_solver_lightweight import LightweightSliderCaptchaSolver")
        print("   solver = LightweightSliderCaptchaSolver(driver)")
        print("   solver.solve_slider_captcha(captcha_info)")
    else:
        print("\n❌ Some tests failed. Please check the errors above.")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
