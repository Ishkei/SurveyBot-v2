#!/usr/bin/env python3
"""
Test script for CPX Research bot implementation
"""

import sys
import os
import asyncio

# Add project paths
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "📁 Project Structure"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from bot_implementations.survey_bot_cpx import CPXResearchBot
from config import Config


async def test_cpx_bot():
    """Test CPX Research bot functionality"""
    print("🧪 Testing CPX Research Bot")
    print("=" * 40)
    
    try:
        # Create bot instance
        bot = CPXResearchBot()
        
        print(f"✅ Bot created successfully")
        print(f"   App ID: {bot.app_id}")
        print(f"   User ID: {bot.ext_user_id}")
        print(f"   Base URL: {bot.base_url}")
        
        # Test browser initialization
        print("\n🌐 Testing browser initialization...")
        if await bot.initialize_browser():
            print("✅ Browser initialized successfully")
            
            # Test navigation
            print("\n🔗 Testing navigation to CPX Research...")
            if await bot.navigate_to_cpx():
                print("✅ Navigation successful")
                
                # Test getting surveys
                print("\n📋 Testing survey retrieval...")
                surveys = await bot.get_available_surveys()
                
                if surveys:
                    print(f"✅ Found {len(surveys)} surveys")
                    for i, survey in enumerate(surveys[:3]):
                        print(f"   {i+1}. ID: {survey.get('id', 'Unknown')}")
                        print(f"      Payout: {survey.get('payout', 'Unknown')}")
                        print(f"      Duration: ~{survey.get('loi', 'Unknown')} minutes")
                        print(f"      Rating: {survey.get('statistics_rating_avg', 'N/A')}/5")
                else:
                    print("⚠️ No surveys found")
                
                # Test question type detection (if we can access a survey)
                if surveys:
                    print(f"\n🎯 Testing survey start...")
                    survey_id = surveys[0].get('id')
                    if survey_id:
                        if await bot.start_survey(survey_id):
                            print("✅ Survey started successfully")
                            
                            # Test question type detection
                            question_type = await bot.detect_question_type()
                            print(f"   Detected question type: {question_type}")
                        else:
                            print("❌ Failed to start survey")
            else:
                print("❌ Navigation failed")
        else:
            print("❌ Browser initialization failed")
        
        # Cleanup
        await bot.cleanup()
        
        print("\n✅ CPX Research bot test completed")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()


async def test_cpx_api_only():
    """Test CPX Research API without browser"""
    print("\n🔌 Testing CPX Research API")
    print("=" * 40)
    
    try:
        import requests
        
        app_id = Config.CPX_APP_ID
        ext_user_id = Config.CPX_EXT_USER_ID
        api_base = "https://live-api.cpx-research.com/api"
        
        api_url = f"{api_base}/get-surveys.php"
        params = {
            'call': 'true',
            'output_method': 'jsscriptv1',
            'source': 'offers_page',
            'app_id': app_id,
            'ext_user_id': ext_user_id,
            'order_by': 'auto',
            'set_auto_web_view': 'true',
            'source_offer_page': 'pos11',
            'first_request': '1'
        }
        
        print(f"📡 Making API request to: {api_url}")
        print(f"   App ID: {app_id}")
        print(f"   User ID: {ext_user_id}")
        
        response = requests.get(api_url, params=params, timeout=30)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get('status') == 'success':
            surveys = data.get('surveys', [])
            print(f"✅ API call successful - {len(surveys)} surveys available")
            
            if surveys:
                print("\n📋 Available surveys:")
                for i, survey in enumerate(surveys[:5]):
                    print(f"   {i+1}. Survey ID: {survey.get('id', 'Unknown')}")
                    print(f"      Payout: {survey.get('payout', 'Unknown')}")
                    print(f"      Duration: ~{survey.get('loi', 'Unknown')} minutes")
                    print(f"      Type: {survey.get('type', 'Unknown')}")
                    print(f"      Rating: {survey.get('statistics_rating_avg', 'N/A')}/5 ({survey.get('statistics_rating_count', 0)} ratings)")
                    print()
            else:
                print("⚠️ No surveys available at this time")
        else:
            print(f"❌ API call failed: {data}")
            
    except Exception as e:
        print(f"❌ API test failed: {e}")


if __name__ == "__main__":
    print("🧪 CPX Research Bot Test Suite")
    print("=" * 50)
    
    # Test API only first
    asyncio.run(test_cpx_api_only())
    
    # Then test full bot if user confirms
    print("\n" + "=" * 50)
    user_input = input("Run full browser test? (y/N): ").strip().lower()
    
    if user_input in ['y', 'yes']:
        asyncio.run(test_cpx_bot())
    else:
        print("Skipping browser test")
    
    print("\n🎉 All tests completed!")
