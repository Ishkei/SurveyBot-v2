#!/usr/bin/env python3
"""
Test script for personality-driven responses
"""

import asyncio
import json
from personality_responses import generate_personality_response

async def test_personality_responses():
    """Test the personality response system with various questions."""
    
    # Load persona data
    with open('persona.json', 'r') as f:
        persona_data = json.load(f)
    
    # Test questions
    test_questions = [
        "Why did you join Qmee?",
        "How satisfied are you with your current job?",
        "What do you think about technology in your daily life?",
        "Tell us about your shopping habits.",
        "Describe your ideal weekend.",
        "What motivates you to participate in surveys?",
        "How do you feel about data privacy?",
        "What are your main hobbies and interests?"
    ]
    
    print("Testing personality-driven responses...")
    print("=" * 50)
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n{i}. Question: {question}")
        try:
            response = await generate_personality_response(question, persona_data)
            print(f"   Response: {response}")
        except Exception as e:
            print(f"   Error: {e}")
    
    print("\n" + "=" * 50)
    print("Test completed!")

if __name__ == "__main__":
    asyncio.run(test_personality_responses()) 