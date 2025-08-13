#!/usr/bin/env python3
"""
SurveyBot Quick Start Example
Shows how to run the bot with basic configuration
"""

import asyncio
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from bot_implementations.survey_bot_v2ray import V2RayEnhancedSurveyBot

async def quick_start_example():
    """Quick start example for SurveyBot"""
    print("🚀 SurveyBot Quick Start Example")
    print("=" * 40)
    
    # Create bot instance
    bot = V2RayEnhancedSurveyBot()
    
    try:
        # Initialize browser
        print("🔄 Initializing browser...")
        await bot.initialize_browser()
        
        # Load session
        print("🔄 Loading session...")
        await bot.load_session()
        
        # Navigate to surveys
        print("🔄 Navigating to surveys...")
        await bot.navigate_to_surveys()
        
        # Run survey loop
        print("🔄 Starting survey loop...")
        await bot.run_survey_loop()
        
    except KeyboardInterrupt:
        print("\n⏹️ Stopping bot...")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        # Cleanup
        if hasattr(bot, 'browser') and bot.browser:
            await bot.browser.close()

def main():
    """Main function"""
    print("📋 Quick Start Instructions:")
    print("1. Make sure you have set up your .env file")
    print("2. Ensure V2Ray is configured")
    print("3. Run this example to test the bot")
    print()
    
    # Run the example
    asyncio.run(quick_start_example())

if __name__ == "__main__":
    main()
