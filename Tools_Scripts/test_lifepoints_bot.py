#!/usr/bin/env python3
"""
Test script for LifePoints Enhanced Bot
"""

import asyncio
import os
import sys
from pathlib import Path

# Add project structure to path
project_root = Path(__file__).parent.parent
sys.path.append(str(project_root))
sys.path.append(str(project_root / "Project_Structure"))

async def test_lifepoints_bot():
    """Test the LifePoints bot functionality"""
    try:
        from Project_Structure.bot_implementations.lifepoints_enhanced_bot import LifePointsEnhancedBot
        
        print("✅ LifePoints bot imported successfully")
        
        # Check if credentials are available
        email = os.getenv("LIFEPOINTS_EMAIL")
        password = os.getenv("LIFEPOINTS_PASSWORD")
        
        if not email or not password:
            print("❌ LifePoints credentials not found")
            print("Please set LIFEPOINTS_EMAIL and LIFEPOINTS_PASSWORD environment variables")
            return False
        
        print(f"✅ Credentials found for: {email}")
        
        # Create bot instance
        bot = LifePointsEnhancedBot(headless=True)  # Use headless for testing
        
        print("🚀 Testing LifePoints bot...")
        
        # Test browser startup
        if not await bot.start_browser():
            print("❌ Failed to start browser")
            return False
        
        print("✅ Browser started successfully")
        
        # Test login
        print("🔐 Testing login...")
        if not await bot.login(email, password):
            print("❌ Login failed")
            await bot.close()
            return False
        
        print("✅ Login successful")
        
        # Test survey fetching
        print("📊 Testing survey fetching...")
        surveys = await bot.get_available_surveys()
        
        if surveys:
            print(f"✅ Found {len(surveys)} surveys")
            for i, survey in enumerate(surveys[:3]):  # Show first 3
                print(f"   {i}: {survey['title']} - {survey['points']} points")
        else:
            print("⚠️ No surveys found (this might be normal)")
        
        # Get session stats
        stats = await bot.get_session_stats()
        print(f"📈 Session stats: {stats}")
        
        # Cleanup
        await bot.close()
        print("✅ Test completed successfully")
        
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Main function"""
    print("🧪 Testing LifePoints Enhanced Bot")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not Path("Project_Structure").exists():
        print("❌ Please run this script from the project root directory")
        return
    
    # Run the test
    success = asyncio.run(test_lifepoints_bot())
    
    if success:
        print("\n🎉 All tests passed! LifePoints bot is working correctly.")
        print("\nTo use the bot, run:")
        print("python3 Main_Files_to_Run/run_bot.py --platform lifepoints")
    else:
        print("\n❌ Tests failed. Please check the errors above.")

if __name__ == "__main__":
    main()
