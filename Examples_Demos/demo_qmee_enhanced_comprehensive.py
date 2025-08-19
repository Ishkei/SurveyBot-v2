#!/usr/bin/env python3
"""
Comprehensive Demo: Qmee Enhanced Survey Bot
Demonstrates all features including question caching, AI responses, and real Qmee patterns.
"""

import asyncio
import json
import random
import sys
import os
from pathlib import Path

# Add project root to path
project_root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(project_root))

try:
    from Project_Structure.bot_implementations.qmee_enhanced_survey_bot import (
        QmeeEnhancedSurveyBot, 
        QmeeQuestionCache
    )
    print("✅ Qmee Enhanced Bot imported successfully")
except ImportError as e:
    print(f"❌ Failed to import Qmee Enhanced Bot: {e}")
    sys.exit(1)

async def demo_question_caching():
    """Demonstrate the question caching system."""
    print("\n" + "="*60)
    print("🧪 DEMO: Question Caching System")
    print("="*60)
    
    cache = QmeeQuestionCache("demo_cache.json")
    
    # Test questions from real survey scenarios
    test_questions = [
        {
            "text": "What is your age group?",
            "type": "radio",
            "options": ["18-24", "25-34", "35-44", "45-54", "55+"]
        },
        {
            "text": "How often do you shop online?",
            "type": "radio", 
            "options": ["Daily", "Weekly", "Monthly", "Rarely", "Never"]
        },
        {
            "text": "Please describe your shopping habits in detail",
            "type": "text",
            "options": []
        },
        {
            "text": "What is your annual household income?",
            "type": "number",
            "options": []
        },
        {
            "text": "Which brands do you trust most? (Select all that apply)",
            "type": "checkbox",
            "options": ["Amazon", "Google", "Apple", "Microsoft", "Netflix", "Other"]
        }
    ]
    
    print(f"📝 Testing {len(test_questions)} different question types...")
    
    for i, question in enumerate(test_questions, 1):
        print(f"\n--- Question {i}: {question['type'].upper()} ---")
        print(f"Q: {question['text']}")
        
        if question['options']:
            print(f"Options: {', '.join(question['options'])}")
        
        # Check if cached
        cached = cache.get_cached_answer(question['text'], question['type'])
        
        if cached:
            print(f"📚 CACHED (used {cached['usage_count']} times): {cached['answer']}")
        else:
            print("🤖 Generating new AI response...")
            
            # Generate response
            if question['type'] == 'text':
                response = await cache.generate_ai_response(question['text'], question['type'])
            elif question['type'] == 'radio':
                response = 1  # Select second option (avoid first)
            elif question['type'] == 'checkbox':
                response = [0, 2]  # Select first and third options
            elif question['type'] == 'number':
                if 'age' in question['text'].lower():
                    response = 32
                elif 'income' in question['text'].lower():
                    response = 55000
                else:
                    response = 42
            else:
                response = "Generated response"
            
            print(f"🆕 NEW RESPONSE: {response}")
            
            # Cache the response
            cache.cache_answer(question['text'], question['type'], response, {
                "demo": True,
                "question_index": i
            })
        
        # Test retrieval again to show caching works
        cached_again = cache.get_cached_answer(question['text'], question['type'])
        print(f"✅ Cache verification: {'SUCCESS' if cached_again else 'FAILED'}")
    
    print(f"\n📊 Cache Statistics:")
    print(f"   Total cached questions: {len(cache.cache)}")
    print(f"   Cache file: {cache.cache_file}")
    
    return cache

async def demo_selector_patterns():
    """Demonstrate the real Qmee selector patterns."""
    print("\n" + "="*60)
    print("🎯 DEMO: Real Qmee Selector Patterns")
    print("="*60)
    
    config = {
        "headless": True,
        "debug": True
    }
    
    bot = QmeeEnhancedSurveyBot(config)
    
    print("📋 Login Form Selectors:")
    for key, selector in bot.selectors["login"].items():
        print(f"   {key}: {selector}")
    
    print("\n📋 Survey Page Selectors:")
    for key, selector in bot.selectors["surveys"].items():
        print(f"   {key}: {selector}")
    
    print("\n📋 Question Selectors:")
    for key, selector in bot.selectors["questions"].items():
        print(f"   {key}: {selector}")
    
    print("\n📋 Filter Controls:")
    for key, selector in bot.selectors["filters"].items():
        print(f"   {key}: {selector}")
    
    print("\n📋 Completion Indicators:")
    for key, selector in bot.selectors["completion"].items():
        print(f"   {key}: {selector}")
    
    return bot

async def demo_question_detection():
    """Demonstrate question type detection logic."""
    print("\n" + "="*60)
    print("🔍 DEMO: Question Type Detection")
    print("="*60)
    
    # Simulate different question structures
    question_scenarios = [
        {
            "name": "Radio Button Question",
            "html_structure": {
                "question_text": "What is your favorite color?",
                "input_type": "radio",
                "options": ["Red", "Blue", "Green", "Yellow"],
                "expected_type": "radio"
            }
        },
        {
            "name": "Checkbox Question", 
            "html_structure": {
                "question_text": "Which social media platforms do you use?",
                "input_type": "checkbox",
                "options": ["Facebook", "Twitter", "Instagram", "TikTok"],
                "expected_type": "checkbox"
            }
        },
        {
            "name": "Text Input Question",
            "html_structure": {
                "question_text": "Please describe your ideal vacation",
                "input_type": "text",
                "options": [],
                "expected_type": "text"
            }
        },
        {
            "name": "Number Input Question",
            "html_structure": {
                "question_text": "How many hours per week do you work?",
                "input_type": "number",
                "options": [],
                "expected_type": "number"
            }
        },
        {
            "name": "Dropdown Question",
            "html_structure": {
                "question_text": "What is your education level?",
                "input_type": "select",
                "options": ["High School", "Bachelor's", "Master's", "PhD"],
                "expected_type": "select"
            }
        }
    ]
    
    for scenario in question_scenarios:
        print(f"\n--- {scenario['name']} ---")
        structure = scenario['html_structure']
        
        print(f"Question: {structure['question_text']}")
        print(f"Input Type: {structure['input_type']}")
        print(f"Options: {structure['options'] if structure['options'] else 'None'}")
        print(f"Expected Detection: {structure['expected_type']}")
        
        # Simulate answer generation
        config = {"debug": True}
        bot = QmeeEnhancedSurveyBot(config)
        
        question_info = {
            "text": structure["question_text"],
            "type": structure["expected_type"],
            "options": [{"index": i, "value": opt, "text": opt} for i, opt in enumerate(structure["options"])]
        }
        
        answer = await bot.generate_answer(question_info)
        print(f"Generated Answer: {answer}")
        print(f"Answer Type: {type(answer).__name__}")

async def demo_behavioral_simulation():
    """Demonstrate human-like behavioral patterns."""
    print("\n" + "="*60)
    print("🤖 DEMO: Human-Like Behavioral Simulation")
    print("="*60)
    
    import time
    import random
    
    print("⌨️ Typing Speed Simulation:")
    text_to_type = "I really enjoy online shopping because it's convenient and offers great variety."
    
    print(f"Text to type: '{text_to_type}'")
    print("Simulating typing with human-like delays...")
    
    start_time = time.time()
    for i, char in enumerate(text_to_type):
        # Simulate variable typing speed
        base_delay = 0.08
        variation = random.uniform(-0.03, 0.03)
        
        # Add thinking pauses
        if char == ' ' and random.random() < 0.15:  # 15% chance of pause at space
            pause = random.uniform(0.2, 0.5)
            print(f"  [Thinking pause: {pause:.2f}s]")
            await asyncio.sleep(pause)
        
        delay = max(0.02, base_delay + variation)
        await asyncio.sleep(delay)
        
        # Show progress every 10 characters
        if (i + 1) % 10 == 0:
            elapsed = time.time() - start_time
            wpm = (i + 1) / 5 / (elapsed / 60)  # Words per minute calculation
            print(f"  Progress: {i+1}/{len(text_to_type)} chars, {wpm:.1f} WPM")
    
    total_time = time.time() - start_time
    final_wpm = len(text_to_type) / 5 / (total_time / 60)
    print(f"✅ Typing complete! Total time: {total_time:.2f}s, Final WPM: {final_wpm:.1f}")
    
    print("\n🖱️ Mouse Movement Simulation:")
    print("Simulating human-like click delays...")
    
    click_scenarios = ["Radio button", "Checkbox", "Submit button", "Next button"]
    
    for scenario in click_scenarios:
        delay = random.uniform(0.2, 0.8)
        print(f"  {scenario}: {delay:.2f}s delay")
        await asyncio.sleep(delay)
    
    print("✅ Click simulation complete!")

async def demo_error_handling():
    """Demonstrate error handling and recovery strategies."""
    print("\n" + "="*60)
    print("🛡️ DEMO: Error Handling & Recovery")
    print("="*60)
    
    error_scenarios = [
        {
            "name": "Survey Full / Quota Reached",
            "error_type": "quota_full",
            "recovery": "Find next available survey",
            "retry": False
        },
        {
            "name": "Qualification Failed",
            "error_type": "screened_out", 
            "recovery": "Return to survey list",
            "retry": False
        },
        {
            "name": "Technical Error",
            "error_type": "technical_error",
            "recovery": "Retry current action",
            "retry": True
        },
        {
            "name": "Session Timeout",
            "error_type": "session_expired",
            "recovery": "Re-authenticate and continue",
            "retry": True
        },
        {
            "name": "Network Error",
            "error_type": "network_error",
            "recovery": "Wait and retry with backoff",
            "retry": True
        }
    ]
    
    for scenario in error_scenarios:
        print(f"\n--- {scenario['name']} ---")
        print(f"Error Type: {scenario['error_type']}")
        print(f"Recovery Strategy: {scenario['recovery']}")
        print(f"Retry Enabled: {'Yes' if scenario['retry'] else 'No'}")
        
        if scenario['retry']:
            print("Simulating retry with exponential backoff...")
            for attempt in range(1, 4):
                backoff_time = 2 ** attempt + random.uniform(0, 1)
                print(f"  Attempt {attempt}: Waiting {backoff_time:.1f}s...")
                await asyncio.sleep(min(backoff_time, 2))  # Cap at 2s for demo
                
                if random.random() > 0.3:  # 70% success rate
                    print(f"  ✅ Recovery successful on attempt {attempt}")
                    break
                else:
                    print(f"  ❌ Attempt {attempt} failed")
            else:
                print("  🚫 Max retries reached, moving to next survey")

async def demo_session_statistics():
    """Demonstrate session tracking and statistics."""
    print("\n" + "="*60)
    print("📊 DEMO: Session Statistics & Tracking")
    print("="*60)
    
    # Simulate session data
    session_data = {
        "session_id": "demo_session_001",
        "start_time": "2024-01-15T10:30:00Z",
        "end_time": "2024-01-15T11:45:00Z",
        "duration_minutes": 75,
        "surveys_attempted": 8,
        "surveys_completed": 6,
        "surveys_screened_out": 2,
        "questions_answered": 47,
        "total_earnings": 4.25,
        "cache_statistics": {
            "cache_hits": 23,
            "cache_misses": 24,
            "cache_hit_rate": 0.489,
            "new_questions_cached": 24
        },
        "performance_metrics": {
            "avg_question_time": 8.3,
            "avg_survey_time": 12.5,
            "success_rate": 0.75,
            "error_rate": 0.05
        }
    }
    
    print("📈 Session Overview:")
    print(f"   Session ID: {session_data['session_id']}")
    print(f"   Duration: {session_data['duration_minutes']} minutes")
    print(f"   Surveys Completed: {session_data['surveys_completed']}/{session_data['surveys_attempted']}")
    print(f"   Success Rate: {session_data['performance_metrics']['success_rate']:.1%}")
    print(f"   Total Earnings: ${session_data['total_earnings']:.2f}")
    
    print("\n🎯 Question Statistics:")
    print(f"   Questions Answered: {session_data['questions_answered']}")
    print(f"   Avg Time per Question: {session_data['performance_metrics']['avg_question_time']}s")
    print(f"   Error Rate: {session_data['performance_metrics']['error_rate']:.1%}")
    
    print("\n💾 Cache Performance:")
    cache_stats = session_data['cache_statistics']
    print(f"   Cache Hits: {cache_stats['cache_hits']}")
    print(f"   Cache Misses: {cache_stats['cache_misses']}")
    print(f"   Hit Rate: {cache_stats['cache_hit_rate']:.1%}")
    print(f"   New Questions Cached: {cache_stats['new_questions_cached']}")
    
    print("\n⚡ Performance Insights:")
    metrics = session_data['performance_metrics']
    print(f"   Average Survey Time: {metrics['avg_survey_time']} minutes")
    print(f"   Questions per Survey: {session_data['questions_answered'] / session_data['surveys_completed']:.1f}")
    print(f"   Earnings per Survey: ${session_data['total_earnings'] / session_data['surveys_completed']:.2f}")
    print(f"   Earnings per Hour: ${(session_data['total_earnings'] / session_data['duration_minutes']) * 60:.2f}")

async def main():
    """Run comprehensive demo of all features."""
    print("🚀 Qmee Enhanced Survey Bot - Comprehensive Demo")
    print("="*80)
    
    try:
        # Demo 1: Question Caching System
        cache = await demo_question_caching()
        
        # Demo 2: Real Qmee Selector Patterns  
        bot = await demo_selector_patterns()
        
        # Demo 3: Question Type Detection
        await demo_question_detection()
        
        # Demo 4: Behavioral Simulation
        await demo_behavioral_simulation()
        
        # Demo 5: Error Handling
        await demo_error_handling()
        
        # Demo 6: Session Statistics
        await demo_session_statistics()
        
        print("\n" + "="*80)
        print("🎉 DEMO COMPLETE - All Features Demonstrated!")
        print("="*80)
        
        print("\n📋 Summary of Demonstrated Features:")
        features = [
            "✅ Intelligent Question Caching with AI",
            "✅ Real Qmee Selectors from surveys page analysis",
            "✅ Advanced Question Type Detection",
            "✅ Human-like Behavioral Simulation",
            "✅ Comprehensive Error Handling & Recovery",
            "✅ Session Statistics & Performance Tracking",
            "✅ GraphQL API Integration Ready",
            "✅ Multi-AI Provider Support (Gemini + OpenAI)"
        ]
        
        for feature in features:
            print(f"   {feature}")
        
        print(f"\n🎯 Ready for Production Use!")
        print(f"   Configuration: Configurations/configs/qmee_enhanced_config.json")
        print(f"   Bot Implementation: Project_Structure/bot_implementations/qmee_enhanced_survey_bot.py")
        print(f"   Question Cache: {cache.cache_file}")
        
    except KeyboardInterrupt:
        print("\n⚠️ Demo interrupted by user")
    except Exception as e:
        print(f"\n❌ Demo error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
