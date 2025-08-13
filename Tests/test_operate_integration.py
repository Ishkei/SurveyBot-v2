#!/usr/bin/env python3
"""
Test Operate Integration
Verifies that we can use Self-Operating Computer via subprocess
"""

import asyncio
import subprocess
import sys
import os

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from bot_implementations.operate_integration import OperateIntegration
from config import Config

async def test_operate_integration():
    """Test operate command integration."""
    print("🧪 Testing Operate Integration...")
    
    try:
        # Load configuration
        config = Config()
        
        # Create Operate Integration
        bot = OperateIntegration({
            'SURVEY_URL': config.SURVEY_URL,
            'MAX_SURVEYS': config.MAX_SURVEYS,
            'personality_settings': {'style': config.PERSONALITY_STYLE}
        })
        
        print("✅ Operate Integration created successfully")
        
        # Test operate command availability
        print("\n🔧 Testing operate command availability...")
        try:
            result = subprocess.run(['operate', '--help'], 
                                  capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print("✅ Operate command is available!")
            else:
                print("❌ Operate command not found")
        except Exception as e:
            print(f"❌ Operate command test failed: {e}")
        
        # Test simple objective
        print("\n🎯 Testing simple objective...")
        test_objective = "Take a screenshot of the current screen"
        success = await bot.run_operate_objective(test_objective)
        
        if success:
            print("✅ Operate integration test successful!")
        else:
            print("❌ Operate integration test failed")
            
        print("\n✅ Operate Integration test completed!")
        
    except Exception as e:
        print(f"❌ Operate Integration test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_operate_integration())
