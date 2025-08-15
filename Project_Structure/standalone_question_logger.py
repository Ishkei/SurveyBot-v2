#!/usr/bin/env python3
"""
Standalone Question Logger System
No external dependencies required
"""

import json
import os
import re
from datetime import datetime
from typing import Any, Dict, List, Optional


class QuestionLogger:
    """System for logging and reusing survey question answers"""
    
    def __init__(self, log_file: str = "question_log.json"):
        self.log_file = log_file
        self.question_cache = {}
        self.load_question_log()
    
    def load_question_log(self):
        """Load existing question log from file"""
        try:
            if os.path.exists(self.log_file):
                with open(self.log_file, 'r', encoding='utf-8') as f:
                    self.question_cache = json.load(f)
                print(f"✅ Loaded {len(self.question_cache)} cached questions from {self.log_file}")
            else:
                print(f"📝 Creating new question log: {self.log_file}")
        except Exception as e:
            print(f"⚠️ Error loading question log: {e}")
            self.question_cache = {}
    
    def save_question_log(self):
        """Save question log to file"""
        try:
            with open(self.log_file, 'w', encoding='utf-8') as f:
                json.dump(self.question_cache, f, indent=2, ensure_ascii=False)
            print(f"💾 Saved question log with {len(self.question_cache)} questions")
        except Exception as e:
            print(f"❌ Error saving question log: {e}")
    
    def get_cached_answer(self, question_text: str, question_type: str) -> Optional[Any]:
        """Get cached answer for a question if it exists"""
        # Create a normalized key for the question
        normalized_question = self._normalize_question(question_text)
        
        # Check for exact matches first
        if normalized_question in self.question_cache:
            cached = self.question_cache[normalized_question]
            if cached.get('type') == question_type:
                print(f"🎯 Found cached answer for: {question_text[:50]}...")
                return cached.get('answer')
        
        # Check for similar questions using fuzzy matching
        for cached_q, cached_data in self.question_cache.items():
            if self._questions_are_similar(normalized_question, cached_q):
                if cached_data.get('type') == question_type:
                    print(f"🎯 Found similar cached answer for: {question_text[:50]}...")
                    return cached_data.get('answer')
        
        return None
    
    def cache_question_answer(self, question_text: str, question_type: str, answer: Any, context: str = ""):
        """Cache a question and its answer for future use"""
        normalized_question = self._normalize_question(question_text)
        
        self.question_cache[normalized_question] = {
            'original_question': question_text,
            'type': question_type,
            'answer': answer,
            'context': context,
            'timestamp': datetime.now().isoformat(),
            'usage_count': 1
        }
        
        print(f"💾 Cached new question: {question_text[:50]}... (Type: {question_type})")
        self.save_question_log()
    
    def _normalize_question(self, question: str) -> str:
        """Normalize question text for consistent caching"""
        # Remove common variations and normalize
        normalized = question.lower().strip()
        
        # Remove common prefixes/suffixes
        normalized = re.sub(r'^(what is|what\'s|please enter|enter your|select your|choose your|indicate your|specify your)\s+', '', normalized)
        normalized = re.sub(r'\s+(please|required|optional|\.+)$', '', normalized)
        
        # Normalize common variations
        normalized = re.sub(r'\b(age|years old|how old)\b', 'age', normalized)
        normalized = re.sub(r'\b(birth year|year of birth|born|birthdate|date of birth)\b', 'birth_year', normalized)
        normalized = re.sub(r'\b(zip code|postal code|zip)\b', 'zipcode', normalized)
        normalized = re.sub(r'\b(city|town|municipality)\b', 'city', normalized)
        normalized = re.sub(r'\b(state|province|region)\b', 'state', normalized)
        
        return normalized.strip()
    
    def _questions_are_similar(self, q1: str, q2: str) -> bool:
        """Check if two questions are similar enough to use the same answer"""
        # Simple similarity check - can be enhanced with more sophisticated NLP
        words1 = set(q1.split())
        words2 = set(q2.split())
        
        # Check for key demographic terms
        demographic_terms = ['age', 'birth_year', 'zipcode', 'city', 'state', 'income', 'education', 'occupation']
        
        for term in demographic_terms:
            if term in q1 and term in q2:
                return True
        
        # Check word overlap
        common_words = words1.intersection(words2)
        if len(common_words) >= 2:  # At least 2 common words
            return True
        
        return False
    
    def get_question_stats(self) -> Dict[str, Any]:
        """Get statistics about cached questions"""
        stats = {
            'total_questions': len(self.question_cache),
            'by_type': {},
            'recent_questions': [],
            'most_used': []
        }
        
        # Count by type
        for q_data in self.question_cache.values():
            q_type = q_data.get('type', 'unknown')
            stats['by_type'][q_type] = stats['by_type'].get(q_type, 0) + 1
        
        # Get recent questions
        recent = sorted(self.question_cache.items(), 
                       key=lambda x: x[1].get('timestamp', ''), 
                       reverse=True)[:10]
        stats['recent_questions'] = [q[1]['original_question'][:50] + '...' for q in recent]
        
        # Get most used questions
        most_used = sorted(self.question_cache.items(), 
                          key=lambda x: x[1].get('usage_count', 0), 
                          reverse=True)[:10]
        stats['most_used'] = [f"{q[1]['original_question'][:50]}... (used {q[1].get('usage_count', 0)} times)" for q in most_used]
        
        return stats


def test_question_logging():
    """Test the question logging functionality"""
    
    print("🧪 Testing Standalone Question Logging System")
    print("=" * 50)
    
    # Initialize question logger
    logger = QuestionLogger("test_standalone_log.json")
    
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
        os.remove("test_standalone_log.json")
        print("✅ Test file cleaned up")
    except FileNotFoundError:
        print("⚠️ Test file not found")
    
    print("🎉 Standalone question logging test completed!")


def test_similarity_detection():
    """Test question similarity detection"""
    
    print("\n🧪 Testing Question Similarity Detection")
    print("=" * 50)
    
    logger = QuestionLogger("test_similarity_standalone.json")
    
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
        os.remove("test_similarity_standalone.json")
    except FileNotFoundError:
        pass


if __name__ == "__main__":
    print("🚀 Starting Standalone Question Logging System Tests")
    print("=" * 60)
    
    # Run tests
    test_question_logging()
    test_similarity_detection()
    
    print("\n" + "=" * 60)
    print("✅ All tests completed!")
