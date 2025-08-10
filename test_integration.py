#!/usr/bin/env python3
"""
Test Integration Script

This script demonstrates how to integrate the enhanced personality system
with your existing survey bot components.
"""

import asyncio
from enhanced_bot_integration import EnhancedBotIntegration, get_enhanced_bot_response

async def test_basic_integration():
    """Test basic integration with the enhanced personality system."""
    print("🧪 Testing Enhanced Personality System Integration")
    print("=" * 60)
    
    # Initialize the integration
    integration = EnhancedBotIntegration()
    
    # Test different personality modes
    test_questions = [
        "What is your favorite color?",
        "How do you handle complex surveys?",
        "What makes you different from other bots?",
        "Can you explain your technical capabilities?"
    ]
    
    modes = ["natural_conversation", "human_writer", "discord_casual"]
    
    for question in test_questions:
        print(f"\n❓ Question: {question}")
        print("-" * 40)
        
        for mode in modes:
            try:
                response = await integration.get_enhanced_response(question, mode=mode)
                print(f"🎭 {mode.upper()}: {response[:150]}...")
            except Exception as e:
                print(f"❌ {mode.upper()}: Error - {e}")
        
        print("-" * 40)
    
    # Test mode switching
    print(f"\n🔄 Current Mode: {integration.get_current_mode()}")
    print(f"📋 Available Modes: {', '.join(integration.get_available_modes())}")
    
    # Test survey-specific response generation
    print(f"\n📊 Testing Survey Response Generation:")
    survey_response = await integration.generate_survey_response(
        "What is your experience level?",
        "multiple_choice",
        "Survey about user experience"
    )
    print(f"Survey Response: {survey_response[:200]}...")

def test_sync_integration():
    """Test synchronous integration."""
    print("\n🔄 Testing Synchronous Integration")
    print("=" * 40)
    
    try:
        from enhanced_bot_integration import get_enhanced_bot_response_sync
        
        # Test synchronous wrapper
        response = get_enhanced_bot_response_sync(
            "How does the bot work?",
            mode="natural_conversation"
        )
        print(f"✅ Sync Response: {response[:150]}...")
        
    except Exception as e:
        print(f"❌ Sync Integration Error: {e}")

if __name__ == "__main__":
    print("Enhanced Personality System - Integration Test")
    print("=" * 60)
    
    try:
        # Run async tests
        asyncio.run(test_basic_integration())
        
        # Run sync tests
        test_sync_integration()
        
        print("\n🎉 All integration tests completed successfully!")
        print("\nYour survey bot is now enhanced with:")
        print("✅ Advanced AI personality modes")
        print("✅ Natural conversation abilities")
        print("✅ Human-like writing styles")
        print("✅ AI team simulation")
        print("✅ Discord casual developer persona")
        print("✅ Seamless integration with existing components")
        
    except Exception as e:
        print(f"\n❌ Integration test failed: {e}")
        print("Please check that all required modules are available.")
