#!/usr/bin/env python3
"""
Test script for text input handling in surveys
"""

import asyncio
import json
from personality_responses import generate_personality_response

# Load persona
with open('persona.json', 'r') as f:
    PERSONA = json.load(f)

async def test_personality_response():
    """Test the personality response generation for open-ended questions."""
    
    test_questions = [
        "In a few words, tell us, why did you join Qmee?",
        "What motivated you to participate in this survey?",
        "How do you typically spend your free time?",
        "Tell us about your shopping habits.",
        "What are your thoughts on technology?"
    ]
    
    print("Testing personality response generation...")
    print("=" * 50)
    
    for question in test_questions:
        print(f"\nQuestion: {question}")
        try:
            response = await generate_personality_response(question, PERSONA)
            print(f"Response: {response}")
        except Exception as e:
            print(f"Error: {e}")
    
    print("\n" + "=" * 50)
    print("Test completed!")

if __name__ == "__main__":
    asyncio.run(test_personality_response()) 