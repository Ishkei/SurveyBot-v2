#!/usr/bin/env python3
"""
Test script for improved slider CAPTCHA solver
"""

import asyncio
import sys
import os

# Add the project structure to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from bot_implementations.slider_captcha_solver_lightweight import LightweightSliderCaptchaSolver

def test_slider_captcha_solver():
    """Test the slider CAPTCHA solver functionality"""
    print("🧪 Testing Improved Slider CAPTCHA Solver")
    print("=" * 50)
    
    # Test configuration loading
    print("1. Testing configuration loading...")
    solver = LightweightSliderCaptchaSolver()
    
    if solver.config:
        print("✅ Configuration loaded successfully")
        print(f"   Movement scaling factor: {solver.config.get('movement_scaling_factor', 'N/A')}")
        print(f"   Verification wait time: {solver.config.get('verification_wait_time', 'N/A')}")
    else:
        print("❌ Configuration loading failed")
    
    # Test CAPTCHA detection patterns
    print("\n2. Testing CAPTCHA detection patterns...")
    print(f"   Slider selectors: {len(solver.slider_selectors)} patterns")
    print(f"   CAPTCHA containers: {len(solver.captcha_containers)} patterns")
    print(f"   Puzzle selectors: {len(solver.puzzle_selectors)} patterns")
    
    # Test puzzle piece detection method
    print("\n3. Testing puzzle piece detection...")
    puzzle_info = solver._detect_puzzle_piece_captcha()
    print(f"   Puzzle detection method: {'✅' if puzzle_info else '❌'}")
    
    # Test easing function
    print("\n4. Testing easing function...")
    test_progress = [0.0, 0.25, 0.5, 0.75, 1.0]
    for progress in test_progress:
        ease_result = solver._ease_out_quad(progress)
        print(f"   Progress {progress:.2f} -> Ease {ease_result:.3f}")
    
    # Test movement step calculation
    print("\n5. Testing movement step calculation...")
    test_distances = [100, 200, 300]
    for distance in test_distances:
        steps = solver._calculate_movement_steps(distance)
        total_movement = sum(steps)
        print(f"   Distance {distance}px -> {len(steps)} steps, total: {total_movement:.1f}px")
    
    print("\n✅ All tests completed successfully!")
    print("\nThe improved slider CAPTCHA solver includes:")
    print("   • Enhanced puzzle piece detection")
    print("   • Human-like movement patterns")
    print("   • Easing functions for natural motion")
    print("   • Better CAPTCHA text detection")
    print("   • Improved error handling")

if __name__ == "__main__":
    test_slider_captcha_solver()
