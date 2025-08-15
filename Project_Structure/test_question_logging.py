#!/usr/bin/env python3
"""
Test script for the Question Logging System
Demonstrates how questions are cached and retrieved
"""

import asyncio
import json
import os
from datetime import datetime

# Import the QuestionLogger class
try:
    from bot_implementations.survey_bot_cpx import QuestionLogger
except ImportError:
    print("❌ Could not import QuestionLogger from survey_bot_cpx.py")
    exit(1)

async def test_question_logging():
    """Test the question logging functionality"""
    
    print("🧪 Testing Question Logging System")
    print("=" * 50)
    
    # Initialize question logger
    logger = QuestionLogger("test_question_log.json")
    
    # Test questions
    test_questions = [
        {
            "text": "What is your birth year? Please enter your 4-digit birth year.",
            "type": "open_ended",
            "answer": "1985",
            "context": "Demographic survey"
        },
        {
            "text": "What is your age?",
            "type": "int_open_ended", 
            "answer": 38,
            "context": "Age verification"
        },
        {
            "text": "Which of the following best describes your occupation?",
            "type": "single_punch",
            "answer": "Marketing",
            "context": "Professional survey"
        },
        {
            "text": "What is your zip code?",
            "type": "open_ended",
            "answer": "90210",
            "context": "Location survey"
        },
        {
            "text": "Select all that apply: What types of products do you purchase?",
            "type": "multi_punch",
            "answer": ["Electronics", "Clothing", "Books"],
            "context": "Shopping survey"
        }
    ]
    
    print("📝 Testing question caching...")
    for i, q_data in enumerate(test_questions, 1):
        print(f"\n{i}. Caching: {q_data['text'][:50]}...")
        logger.cache_question_answer(
            q_data['text'], 
            q_data['type'], 
            q_data['answer'], 
            q_data['context']
        )
    
    print("\n" + "=" * 50)
    print("🔍 Testing question retrieval...")
    
    # Test retrieving cached answers
    for i, q_data in enumerate(test_questions, 1):
        print(f"\n{i}. Retrieving: {q_data['text'][:50]}...")
        cached_answer = logger.get_cached_answer(q_data['text'], q_data['type'])
        if cached_answer:
            print(f"   ✅ Found: {cached_answer}")
        else:
            print(f"   ❌ Not found")
    
    print("\n" + "=" * 50)
    print("📊 Question Statistics:")
    
    # Display statistics
    stats = logger.get_question_stats()
    print(f"Total Questions: {stats['total_questions']}")
    
    if stats['by_type']:
        print("\nBy Type:")
        for q_type, count in stats['by_type'].items():
            print(f"  {q_type}: {count}")
    
    if stats['recent_questions']:
        print("\nRecent Questions:")
        for i, question in enumerate(stats['recent_questions'][:3], 1):
            print(f"  {i}. {question}")
    
    print("\n" + "=" * 50)
    print("🧹 Cleaning up test file...")
    
    # Clean up test file
    try:
        os.remove("test_question_log.json")
        print("✅ Test file cleaned up")
    except FileNotFoundError:
        print("⚠️ Test file not found")
    
    print("🎉 Question logging test completed!")

def test_similarity_detection():
    """Test question similarity detection"""
    
    print("\n🧪 Testing Question Similarity Detection")
    print("=" * 50)
    
    logger = QuestionLogger("test_similarity.json")
    
    # Test similar questions
    similar_questions = [
        "What is your birth year?",
        "What year were you born?",
        "Please enter your birth year",
        "Year of birth:",
        "When were you born? (year)"
    ]
    
    print("Testing birth year variations:")
    for i, question in enumerate(similar_questions, 1):
        print(f"{i}. {question}")
    
    # Cache the first question
    logger.cache_question_answer(similar_questions[0], "open_ended", "1985", "Test")
    
    print("\nTesting retrieval of similar questions:")
    for question in similar_questions[1:]:
        cached = logger.get_cached_answer(question, "open_ended")
        if cached:
            print(f"✅ '{question}' -> Found cached: {cached}")
        else:
            print(f"❌ '{question}' -> No match found")
    
    # Clean up
    try:
        os.remove("test_similarity.json")
    except FileNotFoundError:
        pass

if __name__ == "__main__":
    print("🚀 Starting Question Logging System Tests")
    print("=" * 60)
    
    # Run tests
    asyncio.run(test_question_logging())
    test_similarity_detection()
    
    print("\n" + "=" * 60)
    print("✅ All tests completed!")
