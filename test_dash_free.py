#!/usr/bin/env python3
"""
Test Dash-Free Responses

This script specifically tests that the enhanced personality system
generates responses without any dashes for survey site safety.
"""

import asyncio
from enhanced_personality_system import EnhancedPersonalitySystem

async def test_dash_free_responses():
    """Test that all responses are completely dash-free."""
    print("🧪 Testing Dash-Free Response Generation")
    print("=" * 50)
    
    # Initialize the system
    system = EnhancedPersonalitySystem()
    
    # Test questions that might typically generate dashes
    test_questions = [
        "What are the pros and cons of automation?",
        "How does this compare to other solutions?",
        "What challenges have you faced?",
        "Can you explain the technical details?",
        "What makes this different from alternatives?"
    ]
    
    modes = ["natural_conversation", "human_writer", "ai_team_simulation", "discord_casual"]
    
    dash_count = 0
    total_responses = 0
    
    for question in test_questions:
        print(f"\n❓ Question: {question}")
        print("-" * 40)
        
        for mode in modes:
            try:
                response = await system.generate_enhanced_response(question, mode=mode)
                
                # Count dashes in response
                dash_types = ["-", "—", "–"]
                response_dash_count = sum(response.count(dash) for dash in dash_types)
                
                if response_dash_count > 0:
                    print(f"❌ {mode.upper()}: Found {response_dash_count} dashes!")
                    print(f"   Response: {response[:100]}...")
                    dash_count += response_dash_count
                else:
                    print(f"✅ {mode.upper()}: No dashes found")
                
                total_responses += 1
                
            except Exception as e:
                print(f"❌ {mode.upper()}: Error - {e}")
    
    print("\n" + "=" * 50)
    print("📊 DASH-FREE TEST RESULTS")
    print("=" * 50)
    
    if dash_count == 0:
        print("🎉 SUCCESS: All responses are completely dash-free!")
        print("✅ Your survey bot is safe for survey sites")
    else:
        print(f"⚠️  WARNING: Found {dash_count} dashes in {total_responses} responses")
        print("❌ Some responses may still contain dashes")
    
    print(f"\nTotal responses tested: {total_responses}")
    print(f"Total dashes found: {dash_count}")
    
    return dash_count == 0

if __name__ == "__main__":
    print("Enhanced Personality System - Dash-Free Test")
    print("=" * 50)
    
    try:
        success = asyncio.run(test_dash_free_responses())
        
        if success:
            print("\n🎉 All tests passed! Your bot is survey-site safe.")
        else:
            print("\n❌ Some tests failed. Please review the results above.")
            
    except Exception as e:
        print(f"\n❌ Test execution failed: {e}")
        print("Please check that all required modules are available.")
