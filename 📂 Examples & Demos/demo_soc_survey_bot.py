#!/usr/bin/env python3
"""
Demo: Self-Operating Computer Survey Bot
Shows how to use SOC framework for advanced survey automation
Based on Blue Parker's vision-based approach from Discord
"""

import asyncio
import sys
import os
import subprocess
import time

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import Config
from personality_responses import generate_personality_response

class SOCSurveyDemo:
    """
    Demo class for Self-Operating Computer survey automation
    """
    
    def __init__(self):
        self.config = Config()
        self.personality_style = self.config.PERSONALITY_STYLE
        
    async def demo_personality_responses(self):
        """Demo Discord-style personality responses."""
        print("\n🎭 Demo: Discord-Style Personality Responses")
        print("=" * 50)
        
        sample_questions = [
            "What is your age?",
            "How often do you use social media?",
            "What is your favorite hobby?",
            "How would you rate your experience?",
            "What is your occupation?"
        ]
        
        for question in sample_questions:
            print(f"\n🤔 Question: {question}")
            response = await generate_personality_response(
                question, 
                context="survey question",
                style=self.personality_style
            )
            print(f"💬 Response: {response}")
            await asyncio.sleep(1)
    
    def demo_operate_command(self):
        """Demo operate command usage."""
        print("\n🤖 Demo: Self-Operating Computer Commands")
        print("=" * 50)
        
        commands = [
            "operate",
            "operate -m gpt-4-with-ocr",
            "operate -m gemini-pro-vision",
            "operate -m claude-3",
            "operate --voice"
        ]
        
        for cmd in commands:
            print(f"📋 Command: {cmd}")
            print(f"   Description: {self.get_command_description(cmd)}")
        
        print("\n💡 To run operate manually:")
        print("   1. Open terminal")
        print("   2. Run: operate")
        print("   3. Enter your objective when prompted")
        print("   4. Watch the AI control your computer!")
    
    def get_command_description(self, cmd):
        """Get description for operate command."""
        descriptions = {
            "operate": "Default GPT-4o model for vision-based automation",
            "operate -m gpt-4-with-ocr": "GPT-4 with OCR for better text recognition",
            "operate -m gemini-pro-vision": "Google's Gemini Pro Vision model",
            "operate -m claude-3": "Anthropic's Claude 3 Vision model",
            "operate --voice": "Voice input mode for hands-free operation"
        }
        return descriptions.get(cmd, "Unknown command")
    
    def demo_survey_automation(self):
        """Demo survey automation workflow."""
        print("\n📊 Demo: Survey Automation Workflow")
        print("=" * 50)
        
        workflow = [
            "1. Navigate to survey website",
            "2. Take screenshot of survey page",
            "3. Analyze page with vision model",
            "4. Identify questions and answer options",
            "5. Generate Discord-style responses",
            "6. Click on appropriate answers",
            "7. Navigate to next page",
            "8. Repeat until survey completion"
        ]
        
        for step in workflow:
            print(f"   {step}")
            time.sleep(0.5)
        
        print("\n🎯 Example Objectives for operate:")
        objectives = [
            "Go to https://www.qmee.com/en-us/surveys and start a survey",
            "Fill out the demographic questions with realistic answers",
            "Answer the survey questions naturally and consistently",
            "Click the Next button to continue to the next page",
            "Complete the survey and submit it"
        ]
        
        for i, objective in enumerate(objectives, 1):
            print(f"   {i}. {objective}")
    
    def demo_integration_features(self):
        """Demo integration features."""
        print("\n🔧 Demo: Integration Features")
        print("=" * 50)
        
        features = [
            "✅ Self-Operating Computer Framework",
            "✅ Vision-based page analysis",
            "✅ Discord-style personality responses",
            "✅ Human-like mouse movements",
            "✅ OCR text recognition",
            "✅ Multi-model support (GPT-4, Gemini, Claude)",
            "✅ Voice input capability",
            "✅ Survey completion detection",
            "✅ Error handling and retry logic",
            "✅ Random delays for humanization"
        ]
        
        for feature in features:
            print(f"   {feature}")
            time.sleep(0.3)
    
    async def run_full_demo(self):
        """Run the complete demo."""
        print("🚀 Self-Operating Computer Survey Bot Demo")
        print("=" * 60)
        print("Based on Blue Parker's vision-based approach from Discord")
        print("Combines SOC framework with Discord-style personality")
        print("=" * 60)
        
        # Demo personality responses
        await self.demo_personality_responses()
        
        # Demo operate commands
        self.demo_operate_command()
        
        # Demo survey automation
        self.demo_survey_automation()
        
        # Demo integration features
        self.demo_integration_features()
        
        print("\n🎉 Demo Complete!")
        print("\n📝 Next Steps:")
        print("   1. Set up your API keys in .env file")
        print("   2. Run: operate")
        print("   3. Try: 'Go to a survey website and fill out a form'")
        print("   4. Watch the magic happen! 🪄")

async def main():
    """Main demo function."""
    demo = SOCSurveyDemo()
    await demo.run_full_demo()

if __name__ == "__main__":
    asyncio.run(main())
