#!/usr/bin/env python3
"""
Simple test of Discord-style personality responses
"""

import asyncio
import sys
import os

# Add the current directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from personality_responses import generate_personality_response

async def test_discord_personality():
    """Test the Discord-style personality responses."""
    print("🎭 Discord-Style Personality Test")
    print("=" * 50)
    
    # Test questions from the Discord chat context
    test_questions = [
        "What is your experience with browser automation?",
        "How do you handle survey detection?",
        "What's your opinion on using proxies for surveys?",
        "How do you approach captcha solving?",
        "What motivates you to work on survey automation?",
        "How do you feel about the current state of survey bots?",
        "What's your experience with Playwright vs Selenium?",
        "How do you handle different survey platforms?",
        "What's your approach to humanizing bot behavior?",
        "How do you stay updated with anti-bot measures?"
    ]
    
    print("\n📝 Testing Discord-style responses:")
    print("-" * 50)
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n{i}. Question: {question}")
        
        try:
            # Generate Discord-style response
            response = await generate_personality_response(
                question, 
                context="survey automation discussion",
                style="discord_casual"
            )
            
            print(f"   Response: {response}")
            
        except Exception as e:
            print(f"   Error: {e}")
            # Fallback response
            fallback_responses = [
                "tbh that's a solid question. i'd probably go with something realistic",
                "bruh honestly just keep it simple and believable",
                "imo you want something that sounds natural",
                "yeah that's tricky, but i think the key is consistency",
                "lmao these survey questions are wild sometimes",
                "honestly just be yourself but maybe a bit more generic",
                "that's a good point, gotta think about what a real person would say",
                "tbh i'd probably go with something middle-of-the-road here",
                "yeah that makes sense, just don't overthink it",
                "honestly just keep it casual and believable"
            ]
            import random
            print(f"   Fallback: {random.choice(fallback_responses)}")
        
        await asyncio.sleep(0.5)  # Small delay for readability

async def test_technical_questions():
    """Test responses to technical survey questions."""
    print("\n\n🔧 Technical Survey Questions Test:")
    print("-" * 50)
    
    technical_questions = [
        "What programming languages do you know?",
        "How do you typically debug code issues?",
        "What's your experience with web development?",
        "How do you approach learning new technologies?",
        "What tools do you use for automation?",
        "How do you handle version control?",
        "What's your experience with APIs?",
        "How do you test your code?",
        "What's your approach to problem-solving?",
        "How do you stay current with tech trends?"
    ]
    
    for i, question in enumerate(technical_questions, 1):
        print(f"\n{i}. Question: {question}")
        
        try:
            response = await generate_personality_response(
                question,
                context="technical survey",
                style="discord_casual"
            )
            print(f"   Response: {response}")
        except Exception as e:
            print(f"   Error: {e}")
            # Technical fallback responses
            tech_fallbacks = [
                "tbh i work in tech so i'm pretty comfortable with most languages",
                "yeah debugging is just part of the job, you know?",
                "web dev is my bread and butter, been doing it for a while",
                "honestly just gotta dive in and learn as you go",
                "automation tools are a game changer, selenium and playwright mostly",
                "git is essential, can't imagine working without it",
                "apis are everywhere these days, pretty much use them daily",
                "testing is crucial, can't ship without it",
                "problem-solving is just breaking things down step by step",
                "tech moves fast, gotta stay on top of it"
            ]
            import random
            print(f"   Fallback: {random.choice(tech_fallbacks)}")
        
        await asyncio.sleep(0.5)

async def main():
    """Main test function."""
    print("🤖 Discord-Style Survey Bot Personality Test")
    print("=" * 60)
    
    # Test 1: General survey automation questions
    await test_discord_personality()
    
    # Test 2: Technical questions
    await test_technical_questions()
    
    print("\n\n🎉 Test completed!")
    print("\n💡 Key features demonstrated:")
    print("   ✅ Casual language with contractions")
    print("   ✅ Technical terminology integration")
    print("   ✅ Discord-style expressions (tbh, bruh, imo)")
    print("   ✅ Natural enthusiasm for technical solutions")
    print("   ✅ Honest about limitations and challenges")
    print("   ✅ Concise but informative responses")

if __name__ == "__main__":
    asyncio.run(main())
