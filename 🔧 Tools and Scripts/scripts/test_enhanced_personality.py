#!/usr/bin/env python3
"""
Enhanced test script for personality-driven responses
Tests all the new question patterns and response types
"""

import asyncio
import json
from personality_responses import generate_personality_response

async def test_enhanced_personality_responses():
    """Test the enhanced personality response system with various question types."""
    
    # Load persona data
    with open('persona.json', 'r') as f:
        persona_data = json.load(f)
    
    # Comprehensive test questions covering all categories
    test_questions = [
        # Survey participation
        "Why did you join this survey platform?",
        "What motivates you to participate in surveys?",
        
        # Life satisfaction
        "How satisfied are you with your current life?",
        "What makes you happy?",
        
        # Technology
        "What do you think about technology in your daily life?",
        "How do you use your smartphone?",
        
        # Shopping and consumer behavior
        "Tell us about your shopping habits.",
        "What brands do you prefer?",
        
        # Family and personal life
        "How do you spend time with your family?",
        "What's your family like?",
        
        # Hobbies and leisure
        "What do you do in your free time?",
        "Describe your ideal weekend.",
        
        # Privacy and security
        "How do you feel about data privacy?",
        "What security measures do you take?",
        
        # Career and work
        "Tell us about your job.",
        "What do you like about your career?",
        
        # Travel and experiences
        "What's your favorite travel destination?",
        "How often do you travel?",
        
        # Gaming and entertainment
        "Do you play video games?",
        "What kind of entertainment do you enjoy?",
        
        # Health and fitness
        "How do you stay healthy?",
        "What's your exercise routine?",
        
        # Food and dining
        "What kind of food do you like?",
        "Do you enjoy cooking?",
        
        # Reading and media
        "What do you read?",
        "How do you stay informed?",
        
        # Financial
        "How do you manage your money?",
        "What are your financial goals?",
        
        # Social media
        "How do you use social media?",
        "What's your online behavior like?",
        
        # Environmental
        "How environmentally conscious are you?",
        "What sustainable choices do you make?",
        
        # Customer service
        "What do you expect from customer service?",
        "How do you handle problems with products?",
        
        # Feedback and opinions
        "How do you feel about giving feedback?",
        "What makes you share your opinions?",
        
        # Time management
        "How do you manage your time?",
        "What's your typical day like?",
        
        # Learning and education
        "How do you stay current in your field?",
        "What skills are you developing?",
        
        # Community involvement
        "How involved are you in your community?",
        "What social causes matter to you?",
        
        # Future plans
        "What are your future goals?",
        "Where do you see yourself in 5 years?"
    ]
    
    print("Testing Enhanced Personality-Driven Responses...")
    print("=" * 60)
    print(f"Testing {len(test_questions)} different question types")
    print("=" * 60)
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n{i:2d}. Question: {question}")
        try:
            response = await generate_personality_response(question, persona_data)
            print(f"    Response: {response}")
        except Exception as e:
            print(f"    Error: {e}")
    
    print("\n" + "=" * 60)
    print("Enhanced test completed!")
    print(f"Tested {len(test_questions)} different question patterns")

if __name__ == "__main__":
    asyncio.run(test_enhanced_personality_responses()) 