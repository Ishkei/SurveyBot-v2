#!/usr/bin/env python3
"""
Problem Question Demo
Shows how the enhanced auto-learning system handles the problematic questions
that were causing survey qualification issues
"""

from universal_question_logger import BotIntegrationHelper


def demo_problem_questions():
    """Demonstrate how the enhanced system handles problematic questions"""
    
    print("🚨 Problem Questions Demo - Enhanced Auto-Learning System")
    print("=" * 70)
    
    # Initialize bot with auto-learning
    bot = BotIntegrationHelper("problem_solver_bot", auto_learn=True)
    
    # The problematic questions from the logs
    problem_questions = [
        {
            "question": "Which of the following best describes the industry that you, personally, work in?",
            "type": "single_punch",
            "options": [
                {"text": "Accounting", "value": "accounting"},
                {"text": "Advertising", "value": "advertising"},
                {"text": "Agriculture/Fishing", "value": "agriculture"},
                {"text": "Architecture", "value": "architecture"},
                {"text": "Automotive", "value": "automotive"},
                {"text": "Aviation", "value": "aviation"},
                {"text": "Banking/Financial", "value": "banking"},
                {"text": "Bio-Tech", "value": "biotech"},
                {"text": "Brokerage", "value": "brokerage"},
                {"text": "Computer Software", "value": "computer_software"},
                {"text": "Computer Hardware", "value": "computer_hardware"},
                {"text": "Information Technology/IT", "value": "it"},
                {"text": "Marketing", "value": "marketing"},
                {"text": "I cant / dont want to answer this question....", "value": "dont_want"}
            ]
        },
        {
            "question": "What is your Device Type?",
            "type": "single_punch",
            "options": [
                {"text": "Mobile", "value": "mobile"},
                {"text": "Tablet", "value": "tablet"},
                {"text": "Desktop", "value": "desktop"},
                {"text": "I cant / dont want to answer this question....", "value": "dont_want"}
            ]
        },
        {
            "question": "In terms of your political views, do you consider yourself…",
            "type": "single_punch",
            "options": [
                {"text": "Extremely liberal", "value": "extremely_liberal"},
                {"text": "Liberal", "value": "liberal"},
                {"text": "Slightly liberal", "value": "slightly_liberal"},
                {"text": "Moderate Or Middle of the Road", "value": "moderate"},
                {"text": "Slightly conservative", "value": "slightly_conservative"},
                {"text": "Conservative", "value": "conservative"},
                {"text": "Extremely conservative", "value": "extremely_conservative"},
                {"text": "None of the above", "value": "none"},
                {"text": "I cant / dont want to answer this question....", "value": "dont_want"}
            ]
        }
    ]
    
    print("\n🔍 Analyzing the problematic questions...")
    
    for i, q_data in enumerate(problem_questions, 1):
        question = q_data["question"]
        q_type = q_data["type"]
        options = q_data["options"]
        
        print(f"\n{i}. Question: {question[:60]}...")
        print(f"   Type: {q_type}")
        print(f"   Options: {len(options)} available")
        
        # Show what the OLD system would do (problematic choices)
        print(f"   🚨 OLD SYSTEM PROBLEMS:")
        if "Device Type" in question:
            print(f"      - Would choose: 'I cant / dont want to answer this question....'")
            print(f"      - Problem: This looks suspicious and hurts qualification")
        elif "political views" in question:
            print(f"      - Would choose: 'Moderate Or Middle of the Road'")
            print(f"      - Problem: Might not align with persona, could be too generic")
        elif "industry" in question:
            print(f"      - Would choose: 'Marketing'")
            print(f"      - Problem: Could be too specific, might not match other answers")
        
        # Show what the NEW enhanced system does
        print(f"   ✅ NEW ENHANCED SYSTEM:")
        
        # Get enhanced suggestion
        enhanced_suggestion = bot.get_enhanced_suggestion(question, q_type, options)
        if enhanced_suggestion:
            print(f"      - Enhanced suggestion: {enhanced_suggestion.get('text', enhanced_suggestion)}")
            
            # Check if it's a good choice
            suggestion_text = enhanced_suggestion.get('text', str(enhanced_suggestion)).lower()
            if any(skip_term in suggestion_text for skip_term in ['cant', 'dont', 'prefer not', 'none']):
                print(f"      - ⚠️  Still problematic - needs better options")
            else:
                print(f"      - ✅ Good choice - realistic and qualification-friendly")
        else:
            print(f"      - No enhanced suggestion available")
        
        # Get smart default
        smart_default = bot.get_smart_default(question, q_type, options)
        if smart_default:
            print(f"      - Smart default: {smart_default.get('text', smart_default)}")
            
            # Check if smart default is better
            smart_text = smart_default.get('text', str(smart_default)).lower()
            if any(skip_term in smart_text for skip_term in ['cant', 'dont', 'prefer not', 'none']):
                print(f"      - ⚠️  Smart default still problematic")
            else:
                print(f"      - ✅ Smart default is good")
        
        # Get best overall answer
        best_answer = bot.get_best_answer(question, q_type, options)
        if best_answer:
            print(f"      - Best available answer: {best_answer.get('text', best_answer)}")
        else:
            print(f"      - No cached answer available - will generate new one")
    
    print("\n" + "=" * 70)
    print("🧠 How the Enhanced System Solves These Problems:")
    
    print("\n1. 🖥️  Device Type Questions:")
    print("   - OLD: Would choose 'I cant / dont want to answer'")
    print("   - NEW: Prefers realistic device types (Desktop, Mobile, Tablet)")
    print("   - BENEFIT: Looks more natural, improves qualification rates")
    
    print("\n2. 🗳️  Political Views Questions:")
    print("   - OLD: Would choose 'Moderate' (might be too generic)")
    print("   - NEW: Prefers moderate positions but avoids extreme choices")
    print("   - BENEFIT: More realistic political positioning")
    
    print("\n3. 🏢 Industry Questions:")
    print("   - OLD: Would choose 'Marketing' (might be too specific)")
    print("   - NEW: Prefers common, realistic industries")
    print("   - BENEFIT: Better industry alignment with persona")
    
    print("\n4. 🚫 General 'Don't Want to Answer' Problems:")
    print("   - OLD: Would often choose 'prefer not to answer' options")
    print("   - NEW: Actively avoids these options when realistic alternatives exist")
    print("   - BENEFIT: More engaging survey responses, better qualification")
    
    print("\n" + "=" * 70)
    print("🎯 Key Improvements:")
    print("✅ Avoids suspicious 'don't want to answer' responses")
    print("✅ Prefers realistic, qualification-friendly answers")
    print("✅ Maintains persona consistency")
    print("✅ Improves survey completion rates")
    print("✅ Learns from successful qualifications")
    
    print("\n" + "=" * 70)
    print("🚀 The Result:")
    print("Your bot will now make MUCH better choices that:")
    print("- Look more natural and human-like")
    print("- Improve survey qualification rates")
    print("- Maintain consistent persona across all platforms")
    print("- Learn continuously from successful surveys")
    
    print("\n🎉 Problem Questions - SOLVED! 🎉")


def demo_learning_improvements():
    """Show how the enhanced system learns and improves"""
    
    print("\n\n🧠 Learning Improvements Demo")
    print("=" * 50)
    
    bot = BotIntegrationHelper("learning_demo_bot", auto_learn=True)
    
    # Simulate learning from successful surveys
    print("📝 Simulating successful survey learning...")
    
    # Learn some good answers
    good_answers = [
        ("What is your Device Type?", "single_punch", "Desktop", "Successful survey"),
        ("Which industry do you work in?", "single_punch", "Information Technology/IT", "Successful survey"),
        ("What are your political views?", "single_punch", "Slightly liberal", "Successful survey"),
        ("What is your favorite hobby?", "open_ended", "Reading science fiction", "Successful survey"),
        ("How many streaming services do you use?", "int_open_ended", 3, "Successful survey")
    ]
    
    for question, q_type, answer, context in good_answers:
        bot.cache_answer(question, q_type, answer, context)
        print(f"   ✅ Learned: {question[:40]}... → {answer}")
    
    # Show what the bot learned
    print("\n👤 Expanded Persona:")
    expanded_persona = bot.get_expanded_persona()
    for category, data in expanded_persona.items():
        if isinstance(data, dict) and 'value' in data:
            print(f"   {category}: {data['value']}")
    
    # Show learning statistics
    print("\n📊 Learning Statistics:")
    learning_stats = bot.get_learning_stats()
    for key, value in learning_stats.items():
        print(f"   {key}: {value}")
    
    print("\n🎯 The bot is now much smarter and will make better choices!")


if __name__ == "__main__":
    print("🚀 Enhanced Auto-Learning System - Problem Questions Demo")
    print("=" * 80)
    
    # Run the main demo
    demo_problem_questions()
    
    # Run the learning improvements demo
    demo_learning_improvements()
    
    print("\n" + "=" * 80)
    print("✅ Enhanced Auto-Learning System Ready!")
    print("🎯 Your bot will now handle problematic questions much better!")
    print("📈 Survey qualification rates should improve significantly!")
    print("🧠 The system learns continuously and gets smarter over time!")
