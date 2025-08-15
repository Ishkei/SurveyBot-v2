#!/usr/bin/env python3
"""
Simple Integration Example
Shows how to add auto-learning question logging to ANY survey bot
"""

from universal_question_logger import BotIntegrationHelper


class ExampleSurveyBot:
    """Example survey bot showing how to integrate auto-learning question logging"""
    
    def __init__(self, bot_name: str = "example_bot"):
        # Your existing bot initialization code here...
        self.bot_name = bot_name
        
        # Add this ONE line to enable auto-learning question logging
        self.question_logger = BotIntegrationHelper(bot_name, auto_learn=True)
        
        print(f"✅ {bot_name} initialized with auto-learning question logging!")
    
    async def handle_survey_question(self, question_text: str, question_type: str):
        """
        Handle a survey question with automatic learning
        
        This is where you'd normally generate answers - now it's enhanced!
        """
        
        # STEP 1: Check for cached answer first (from any platform!)
        cached_answer = self.question_logger.get_answer(question_text, question_type)
        if cached_answer:
            print(f"🎯 Using cached answer: {cached_answer}")
            return cached_answer
        
        # STEP 2: Check for persona-based suggestions
        persona_suggestion = self.question_logger.get_persona_suggestion(question_text, question_type)
        if persona_suggestion:
            print(f"🧠 Using persona suggestion: {persona_suggestion}")
            # Cache this answer for future use
            self.question_logger.cache_answer(question_text, question_type, persona_suggestion, "Persona suggestion")
            return persona_suggestion
        
        # STEP 3: Generate new answer (your existing logic)
        print(f"💭 Generating new answer for: {question_text[:50]}...")
        new_answer = await self.generate_answer(question_text, question_type)
        
        # STEP 4: Cache the new answer (auto-learning happens automatically!)
        self.question_logger.cache_answer(question_text, question_type, new_answer, "Generated answer")
        
        return new_answer
    
    async def generate_answer(self, question: str, question_type: str):
        """Your existing answer generation logic"""
        # This is where you'd normally generate answers
        # For demo purposes, return a simple response
        if "hobby" in question.lower():
            return "Reading science fiction"
        elif "streaming" in question.lower():
            return 3
        elif "car" in question.lower():
            return "Hybrid SUV"
        elif "shopping" in question.lower():
            return "Online"
        elif "social media" in question.lower():
            return ["Instagram", "Twitter", "LinkedIn"]
        else:
            return "I prefer not to answer"
    
    def get_bot_stats(self):
        """Get comprehensive bot statistics"""
        return self.question_logger.get_stats()
    
    def get_learning_stats(self):
        """Get learning statistics"""
        return self.question_logger.get_learning_stats()
    
    def get_expanded_persona(self):
        """Get the expanded persona with learned attributes"""
        return self.question_logger.get_expanded_persona()


# Example usage
async def demo_auto_learning():
    """Demonstrate the auto-learning system in action"""
    
    print("🚀 Auto-Learning Question Logger Demo")
    print("=" * 50)
    
    # Create a bot with auto-learning enabled
    bot = ExampleSurveyBot("demo_bot")
    
    # Example questions (some new, some similar to what we've seen)
    questions = [
        ("What is your favorite hobby?", "open_ended"),
        ("What do you enjoy doing in your free time?", "open_ended"),  # Similar to hobby
        ("How many streaming services do you subscribe to?", "int_open_ended"),
        ("What's your preferred shopping method?", "single_punch"),  # Similar to shopping
        ("Which social media platforms do you use?", "multi_punch"),
        ("What type of vehicle do you drive?", "open_ended"),  # Similar to car
        ("What is your birth year?", "open_ended"),  # New demographic question
        ("What is your zip code?", "open_ended"),    # New demographic question
    ]
    
    print("\n📝 Processing questions with auto-learning...")
    
    for i, (question, q_type) in enumerate(questions, 1):
        print(f"\n{i}. Question: {question[:50]}...")
        
        # Handle the question (auto-learning happens automatically)
        answer = await bot.handle_survey_question(question, q_type)
        print(f"   Answer: {answer}")
    
    # Show what the bot learned
    print("\n" + "=" * 50)
    print("🧠 What the Bot Learned:")
    
    learning_stats = bot.get_learning_stats()
    print(f"Questions Learned: {learning_stats['questions_learned']}")
    print(f"Persona Expansions: {learning_stats['persona_expansions']}")
    print(f"Learning Success Rate: {learning_stats['successful_learns']}/{learning_stats['learning_attempts']}")
    
    # Show expanded persona
    print("\n👤 Expanded Persona:")
    expanded_persona = bot.get_expanded_persona()
    for category, data in expanded_persona.items():
        if isinstance(data, dict) and 'value' in data:
            print(f"  {category}: {data['value']}")
            if 'learned_from' in data:
                print(f"    Learned from: {data['learned_from'][:50]}...")
    
    # Show comprehensive statistics
    print("\n📊 Bot Statistics:")
    stats = bot.get_bot_stats()
    print(f"Total Questions Cached: {stats['total_questions']}")
    print(f"Learning Success Rate: {stats['learning_summary']['learning_success_rate']}%")
    
    print("\n" + "=" * 50)
    print("✅ Demo completed! The bot now has a rich, learned persona!")
    print("🎯 Key Benefits:")
    print("  • Automatically learns from every question")
    print("  • Expands persona with new attributes")
    print("  • Suggests answers based on learned data")
    print("  • Shares knowledge across all platforms")
    print("  • Improves survey qualification rates")


# Simple integration guide
def show_integration_steps():
    """Show the simple integration steps"""
    
    print("\n🔧 Simple Integration Steps")
    print("=" * 40)
    print("1. Copy universal_question_logger.py to your project")
    print("2. Add this ONE line to your bot:")
    print("   self.question_logger = BotIntegrationHelper('your_bot_name', auto_learn=True)")
    print("3. Replace your answer generation with:")
    print("   cached = self.question_logger.get_answer(question, q_type)")
    print("   if cached: return cached")
    print("   # Your existing logic here")
    print("   self.question_logger.cache_answer(question, q_type, answer)")
    print("4. Auto-learning happens automatically!")
    print("5. Questions and persona shared across all platforms!")


if __name__ == "__main__":
    import asyncio
    
    print("🚀 Auto-Learning Question Logger Integration Example")
    print("=" * 60)
    
    # Show integration steps
    show_integration_steps()
    
    # Run the demo
    print("\n" + "=" * 60)
    asyncio.run(demo_auto_learning())
    
    print("\n🎉 That's it! Your bot now has automatic learning capabilities!")
    print("📖 The system works with ANY survey platform and learns continuously!")
