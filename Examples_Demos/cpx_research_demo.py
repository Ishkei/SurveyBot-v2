#!/usr/bin/env python3
"""
CPX Research Bot Demo
Demonstrates how to use the CPX Research integration
"""

import sys
import os
import asyncio

# Add project paths
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "📁 Project Structure"))

def demo_cpx_configuration():
    """Demonstrate CPX Research configuration"""
    print("🎯 CPX Research Configuration Demo")
    print("=" * 50)
    
    print("1. Environment Setup:")
    print("   Add to your .env file:")
    print("   SURVEY_PLATFORM=cpx")
    print("   CPX_APP_ID=27806")
    print("   CPX_EXT_USER_ID=533055960609193994_1246050346233757798")
    print()
    
    print("2. Question Types Supported:")
    print("   ✅ Single Choice (radio buttons)")
    print("   ✅ Multiple Choice (checkboxes)")  
    print("   ✅ Text Input (open-ended)")
    print("   ✅ Number Input (numeric)")
    print()
    
    print("3. Features:")
    print("   ✅ AI-powered response generation")
    print("   ✅ Human-like typing simulation")
    print("   ✅ Intelligent option selection")
    print("   ✅ Automatic survey completion")
    print("   ✅ Session tracking and earnings")
    print()

def demo_usage_examples():
    """Show usage examples"""
    print("📖 Usage Examples")
    print("=" * 50)
    
    print("1. Basic CPX Research bot run:")
    print("   cd '🎯 Main Files to Run'")
    print("   python3 run_bot.py --platform cpx")
    print()
    
    print("2. CPX with specific browser:")
    print("   python3 run_bot.py --platform cpx --implementation playwright")
    print()
    
    print("3. CPX with enhanced AI:")
    print("   python3 run_bot.py --platform cpx --enhanced-ai --personality-mode natural_conversation")
    print()
    
    print("4. CPX in headless mode:")
    print("   python3 run_bot.py --platform cpx --headless")
    print()
    
    print("5. Test CPX integration:")
    print("   cd '🔧 Tools and Scripts'")
    print("   python3 test_cpx_bot.py")
    print()

def demo_cpx_features():
    """Demonstrate CPX-specific features"""
    print("🚀 CPX Research Features")
    print("=" * 50)
    
    print("📋 Survey Detection:")
    print("   - Automatically fetches available surveys from CPX API")
    print("   - Displays survey payouts, duration, and ratings")
    print("   - Prioritizes highest-paying and best-rated surveys")
    print()
    
    print("❓ Question Handling:")
    print("   - Single Choice: Intelligently selects best radio button option")
    print("   - Multiple Choice: Selects 1-3 relevant checkbox options")
    print("   - Text Questions: Generates contextual responses using AI")
    print("   - Number Questions: Provides realistic numeric answers")
    print()
    
    print("🧠 AI Response Generation:")
    print("   - Uses personality system for consistent responses")
    print("   - Special handling for 'best life experience' questions")
    print("   - Context-aware answer generation")
    print("   - Human-like response patterns")
    print()
    
    print("⌨️ Human-like Behavior:")
    print("   - Realistic typing speeds and patterns")
    print("   - Natural delays between actions")
    print("   - Mouse movement simulation")
    print("   - Anti-detection measures")
    print()

def demo_cpx_api_structure():
    """Show CPX Research API structure"""
    print("🔌 CPX Research API Structure")
    print("=" * 50)
    
    print("Base URL: https://offers.cpx-research.com")
    print("API Base: https://live-api.cpx-research.com/api")
    print()
    
    print("Key Endpoints:")
    print("   📋 /get-surveys.php - Get available surveys")
    print("   📝 /get-survey-details.php - Get question details")
    print("   📊 /rating.php - Submit survey ratings")
    print("   🚨 /report-question.php - Report problematic questions")
    print()
    
    print("Question Flow:")
    print("   1. Fetch surveys → 2. Start survey → 3. Answer questions → 4. Submit → 5. Complete")
    print()
    
    print("Sample Survey Data:")
    print("   {")
    print("     'id': 'survey_123',")
    print("     'payout': '+ 0.27 $',")
    print("     'loi': '6',  // Length of Interview in minutes")
    print("     'type': 'need_qualification',")
    print("     'statistics_rating_avg': 4,")
    print("     'statistics_rating_count': 168")
    print("   }")
    print()

async def demo_cpx_bot_code():
    """Show code example for using CPX bot"""
    print("💻 Code Example")
    print("=" * 50)
    
    print("Python code to run CPX Research bot:")
    print()
    print("```python")
    print("import asyncio")
    print("from bot_implementations.survey_bot_cpx import CPXResearchBot")
    print()
    print("async def run_cpx_surveys():")
    print("    # Create bot instance")
    print("    bot = CPXResearchBot()")
    print("    ")
    print("    # Run survey session (max 5 surveys)")
    print("    result = await bot.run_survey_session(max_surveys=5)")
    print("    ")
    print("    # Print session summary")
    print("    bot.print_session_summary()")
    print("    ")
    print("    # Check results")
    print("    if result['status'] == 'completed':")
    print("        print(f'Completed {result[\"surveys_completed\"]} surveys')")
    print("        print(f'Earned ${result[\"total_earnings\"]:.2f}')")
    print()
    print("# Run the bot")
    print("asyncio.run(run_cpx_surveys())")
    print("```")
    print()

def main():
    """Main demo function"""
    print("🎯 CPX Research Integration Demo")
    print("=" * 60)
    print()
    
    demo_cpx_configuration()
    print()
    
    demo_usage_examples()
    print()
    
    demo_cpx_features()
    print()
    
    demo_cpx_api_structure()
    print()
    
    asyncio.run(demo_cpx_bot_code())
    
    print("🎉 Demo completed!")
    print()
    print("Next steps:")
    print("1. Set up your .env file with CPX Research credentials")
    print("2. Install dependencies: pip install playwright requests")
    print("3. Run: python3 run_bot.py --platform cpx")
    print()
    print("For more information, see: 📚 Documentation/CPX_RESEARCH_GUIDE.md")

if __name__ == "__main__":
    main()
