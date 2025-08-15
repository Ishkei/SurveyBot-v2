#!/usr/bin/env python3
"""
Slider CAPTCHA Usage Examples
Demonstrates how to use the enhanced slider CAPTCHA solver with your existing bot infrastructure
"""

import asyncio
import sys
import os

# Add project structure to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'Project_Structure'))

from enhanced_slider_integration import (
    EnhancedSliderBot,
    CPXSliderBot,
    SeleniumSliderBot,
    UndetectedSliderBot,
    create_enhanced_bot,
    integrate_slider_solver_to_bot
)

def example_1_basic_usage():
    """Example 1: Basic usage with EnhancedSliderBot"""
    print("🧩 Example 1: Basic Slider CAPTCHA Usage")
    print("=" * 50)
    
    # Create enhanced bot with automatic CAPTCHA solving
    bot = EnhancedSliderBot()
    
    # Run survey with automatic CAPTCHA handling
    bot.run_survey_with_slider_support("https://your-survey-site.com")
    
    print("✅ Example 1 completed!")

async def example_2_cpx_platform():
    """Example 2: CPX Research platform with CAPTCHA support"""
    print("\n🧩 Example 2: CPX Platform with Slider CAPTCHA")
    print("=" * 50)
    
    # Create CPX bot with CAPTCHA support
    bot = CPXSliderBot()
    
    # Run CPX survey session with automatic CAPTCHA handling
    result = await bot.run_survey_session(max_surveys=3)
    
    print(f"✅ CPX session completed: {result}")
    print("✅ Example 2 completed!")

def example_3_selenium_bot():
    """Example 3: Selenium bot with CAPTCHA support"""
    print("\n🧩 Example 3: Selenium Bot with Slider CAPTCHA")
    print("=" * 50)
    
    # Create Selenium bot with CAPTCHA support
    bot = SeleniumSliderBot()
    
    # Run Selenium bot with automatic CAPTCHA handling
    bot.run()
    
    print("✅ Example 3 completed!")

def example_4_undetected_bot():
    """Example 4: Undetected bot with CAPTCHA support"""
    print("\n🧩 Example 4: Undetected Bot with Slider CAPTCHA")
    print("=" * 50)
    
    # Create Undetected bot with CAPTCHA support
    bot = UndetectedSliderBot()
    
    # Run Undetected bot with automatic CAPTCHA handling
    bot.run()
    
    print("✅ Example 4 completed!")

def example_5_create_enhanced_bot():
    """Example 5: Using create_enhanced_bot function"""
    print("\n🧩 Example 5: Using create_enhanced_bot Function")
    print("=" * 50)
    
    # Create any bot type with CAPTCHA support
    bot_types = ["enhanced", "selenium", "undetected"]
    
    for bot_type in bot_types:
        print(f"Creating {bot_type} bot with CAPTCHA support...")
        
        try:
            bot = create_enhanced_bot(bot_type)
            print(f"✅ {bot_type} bot created successfully")
        except Exception as e:
            print(f"❌ Failed to create {bot_type} bot: {e}")
    
    print("✅ Example 5 completed!")

def example_6_manual_integration():
    """Example 6: Manual integration with existing bot"""
    print("\n🧩 Example 6: Manual Integration")
    print("=" * 50)
    
    # Simulate an existing bot class
    class MyExistingBot:
        def __init__(self):
            from selenium import webdriver
            self.driver = webdriver.Chrome()
        
        def run(self):
            self.driver.get("https://survey-site.com")
            print("Running existing bot...")
            # Your existing bot logic here
            self.driver.quit()
    
    # Create existing bot
    bot = MyExistingBot()
    
    # Integrate slider CAPTCHA solver
    integrate_slider_solver_to_bot(bot)
    
    # Run normally - CAPTCHA solving is now automatic
    bot.run()
    
    print("✅ Example 6 completed!")

def example_7_command_line_usage():
    """Example 7: Command line usage examples"""
    print("\n🧩 Example 7: Command Line Usage")
    print("=" * 50)
    
    print("Command line examples:")
    print()
    print("1. Run with enhanced bot runner:")
    print("   python Main_Files_to_Run/run_bot_with_slider_captcha.py --implementation enhanced --url 'https://your-survey-site.com'")
    print()
    print("2. Test CAPTCHA solver:")
    print("   python Main_Files_to_Run/run_bot_with_slider_captcha.py --test-captcha")
    print()
    print("3. Run with existing run_bot.py:")
    print("   python Main_Files_to_Run/run_bot.py --slider-captcha --implementation enhanced --url 'https://your-survey-site.com'")
    print()
    print("4. Run CPX with CAPTCHA support:")
    print("   python Main_Files_to_Run/run_bot.py --slider-captcha --platform cpx --max-surveys 3")
    print()
    print("5. Run Selenium with CAPTCHA support:")
    print("   python Main_Files_to_Run/run_bot.py --slider-captcha --implementation selenium")
    print()
    print("✅ Example 7 completed!")

def example_8_test_captcha_solver():
    """Example 8: Test the CAPTCHA solver"""
    print("\n🧩 Example 8: Test CAPTCHA Solver")
    print("=" * 50)
    
    try:
        # Test basic functionality
        from enhanced_slider_integration import test_slider_captcha_solver
        test_slider_captcha_solver()
        print("✅ CAPTCHA solver test completed!")
    except Exception as e:
        print(f"❌ CAPTCHA solver test failed: {e}")

async def main():
    """Run all examples"""
    print("🚀 Slider CAPTCHA Usage Examples")
    print("This script demonstrates how to use the enhanced slider CAPTCHA solver")
    print("=" * 60)
    
    # Run examples
    examples = [
        ("Basic Usage", example_1_basic_usage),
        ("CPX Platform", example_2_cpx_platform),
        ("Selenium Bot", example_3_selenium_bot),
        ("Undetected Bot", example_4_undetected_bot),
        ("Create Enhanced Bot", example_5_create_enhanced_bot),
        ("Manual Integration", example_6_manual_integration),
        ("Command Line Usage", example_7_command_line_usage),
        ("Test CAPTCHA Solver", example_8_test_captcha_solver)
    ]
    
    for name, example_func in examples:
        print(f"\n📋 Running: {name}")
        try:
            if asyncio.iscoroutinefunction(example_func):
                await example_func()
            else:
                example_func()
        except Exception as e:
            print(f"❌ Example failed: {e}")
    
    print("\n🎉 All examples completed!")
    print("\n📋 Next Steps:")
    print("1. Test with your specific survey sites")
    print("2. Configure API keys in your .env file")
    print("3. Train custom YOLO models for better accuracy")
    print("4. Integrate with your existing bot implementation")

if __name__ == "__main__":
    asyncio.run(main())
