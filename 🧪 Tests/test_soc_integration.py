#!/usr/bin/env python3
"""
Test script for Self-Operating Computer integration
Verifies that SOC framework works with our survey bot
"""

import asyncio
import sys
import os

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from bot_implementations.soc_survey_bot import SOCSurveyBot
from config import Config

async def test_soc_integration():
    """Test Self-Operating Computer integration."""
    print("🧪 Testing Self-Operating Computer Integration...")
    
    try:
        # Load configuration
        config = Config()
        
        # Create SOC Survey Bot
        bot = SOCSurveyBot({
            'USE_SELF_OPERATING_COMPUTER': config.USE_SELF_OPERATING_COMPUTER,
            'USE_VISION_MODEL': config.USE_VISION,
            'USE_MOUSE_CONTROL': config.USE_MOUSE_CONTROL,
            'VISION_MODEL': config.VISION_MODEL,
            'personality_settings': {'style': config.PERSONALITY_STYLE},
            'SURVEY_URL': config.SURVEY_URL,
            'MAX_SURVEYS': config.MAX_SURVEYS,
            'DELAY_BETWEEN_ACTIONS': config.DELAY_BETWEEN_ACTIONS
        })
        
        print("✅ SOC Survey Bot created successfully")
        print(f"   Self-Operating Computer: {'✅' if bot.use_soc else '❌'}")
        print(f"   Vision: {'✅' if bot.use_vision else '❌'}")
        print(f"   Mouse Control: {'✅' if bot.use_mouse_control else '❌'}")
        
        # Test SOC setup
        if bot.use_soc:
            print("\n🔧 Testing Self-Operating Computer setup...")
            setup_success = await bot.setup_self_operating_computer()
            
            if setup_success:
                print("✅ Self-Operating Computer setup successful!")
                
                # Test screenshot capability
                print("\n📸 Testing screenshot capability...")
                screenshot = await bot.take_screenshot()
                if screenshot:
                    print("✅ Screenshot capability working!")
                else:
                    print("❌ Screenshot capability failed")
                    
            else:
                print("❌ Self-Operating Computer setup failed")
        else:
            print("⚠️ Self-Operating Computer not available")
            
        print("\n✅ SOC Integration test completed!")
        
    except Exception as e:
        print(f"❌ SOC Integration test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_soc_integration())
