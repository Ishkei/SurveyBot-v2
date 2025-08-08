#!/usr/bin/env python3
"""
Discord Style Survey Bot Demo
Demonstrates the enhanced bot with Discord-style casual responses
"""

import asyncio
import json
import os
from pathlib import Path

# Add the parent directory to the path so we can import our modules
import sys
sys.path.append(str(Path(__file__).parent.parent))

from bot_implementations.survey_bot_hybrid import SurveyBotHybrid
from config import Config
from personality_responses import generate_personality_response

async def demo_discord_style_responses():
    """Demo the Discord-style personality responses."""
    print("🤖 Discord Style Survey Bot Demo")
    print("=" * 50)
    
    # Test questions that might appear in surveys
    test_questions = [
        "What is your primary reason for participating in surveys?",
        "How do you typically spend your free time?",
        "What is your experience with technology products?",
        "How would you describe your shopping habits?",
        "What motivates you to complete surveys?",
        "How do you feel about data privacy and security?",
        "What is your opinion on online advertising?",
        "How do you prefer to receive customer service?",
        "What is your experience with mobile apps?",
        "How do you typically research products before purchasing?"
    ]
    
    print("\n📝 Testing Discord-style responses to survey questions:")
    print("-" * 50)
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n{i}. Question: {question}")
        
        # Generate Discord-style response
        response = await generate_personality_response(
            question, 
            context="survey question",
            style="discord_casual"
        )
        
        print(f"   Response: {response}")
        await asyncio.sleep(0.5)  # Small delay for readability

async def demo_enhanced_bot():
    """Demo the enhanced bot with survey automation."""
    print("\n\n🤖 Enhanced Survey Bot Demo")
    print("=" * 50)
    
    # Load enhanced configuration
    config_path = Path(__file__).parent.parent / "configs" / "enhanced_config.json"
    
    if not config_path.exists():
        print("❌ Enhanced config not found. Please create configs/enhanced_config.json")
        return
    
    with open(config_path, 'r') as f:
        config_data = json.load(f)
    
    # Create config object
    config = Config()
    config.update_from_dict(config_data)
    
    # Set required login credentials (you'll need to provide these)
    config.LOGIN_URL = "https://example-survey-site.com/login"
    config.USERNAME = "your_username"
    config.PASSWORD = "your_password"
    config.USERNAME_SELECTOR = "#username"
    config.PASSWORD_SELECTOR = "#password"
    config.LOGIN_BUTTON_SELECTOR = "button[type='submit']"
    config.LOGIN_SUCCESS_INDICATOR = ".dashboard"
    
    print("✅ Configuration loaded successfully")
    print(f"📋 Bot settings: {config_data['bot_settings']}")
    print(f"🎭 Personality style: {config_data['personality_settings']['style']}")
    print(f"🔧 Enhanced features: {list(config_data['enhanced_features'].keys())}")
    
    # Note: This would require actual survey site credentials
    print("\n⚠️  Note: To run the actual bot, you need:")
    print("   - Valid survey site credentials")
    print("   - API keys for AI services")
    print("   - Proxy configuration (optional)")
    
    print("\n🚀 Bot features available:")
    print("   ✅ Discord-style casual responses")
    print("   ✅ Enhanced survey automation")
    print("   ✅ Multiple browser support (Playwright + Selenium)")
    print("   ✅ Optional fingerprint generation")
    print("   ✅ Optional hrequests integration")
    print("   ✅ Smart element detection")
    print("   ✅ Human-like delays and interactions")

async def demo_technical_features():
    """Demo the technical features and integrations."""
    print("\n\n🔧 Technical Features Demo")
    print("=" * 50)
    
    # Check available integrations
    integrations = {
        "hrequests": "Enhanced HTTP requests with browser fingerprinting",
        "browserforge": "Advanced browser automation framework", 
        "fingerprint-generator": "Realistic browser fingerprint generation",
        "playwright": "Modern browser automation",
        "selenium": "Traditional browser automation"
    }
    
    print("📦 Available integrations:")
    for integration, description in integrations.items():
        try:
            __import__(integration.replace("-", "_"))
            status = "✅ Available"
        except ImportError:
            status = "❌ Not installed"
        
        print(f"   {integration}: {status}")
        print(f"      {description}")
    
    print("\n🎯 Discord-style features:")
    print("   ✅ Casual language with technical terms")
    print("   ✅ Natural contractions and slang")
    print("   ✅ Enthusiasm for technical solutions")
    print("   ✅ Honest about limitations")
    print("   ✅ Concise but informative responses")

async def main():
    """Main demo function."""
    print("🎮 Discord Style Survey Bot - Enhanced Demo")
    print("=" * 60)
    
    # Demo 1: Discord-style responses
    await demo_discord_style_responses()
    
    # Demo 2: Enhanced bot features
    await demo_enhanced_bot()
    
    # Demo 3: Technical features
    await demo_technical_features()
    
    print("\n\n🎉 Demo completed!")
    print("\n💡 To get started:")
    print("   1. Install required packages: pip install hrequests browserforge fingerprint-generator")
    print("   2. Set up your API keys in configs/enhanced_config.json")
    print("   3. Configure your survey site credentials")
    print("   4. Run: python run_bot.py --config enhanced_config.json")

if __name__ == "__main__":
    asyncio.run(main())
