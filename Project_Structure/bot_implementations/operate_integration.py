#!/usr/bin/env python3
"""
Operate Integration for Survey Bot
Uses Self-Operating Computer framework via subprocess calls
This is the CORRECT way to integrate with SOC framework
"""

import asyncio
import subprocess
import time
import random
import json
import os
import sys
from typing import Optional, Dict, Any, List
from pathlib import Path

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from personality_responses import generate_personality_response
from config import Config

class OperateIntegration:
    """
    Proper integration with Self-Operating Computer framework
    Uses operate command via subprocess - the correct approach
    """

    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.personality_style = config.get('personality_settings', {}).get('style', 'discord_casual')
        self.survey_url = config.get('SURVEY_URL', '')
        self.max_surveys = config.get('MAX_SURVEYS', 10)
        
        print(f"🤖 Operate Integration initialized")
        print(f"   Survey URL: {self.survey_url}")
        print(f"   Personality Style: {self.personality_style}")

    async def run_operate_objective(self, objective: str, model: str = "gpt-4o") -> bool:
        """
        Run operate command with given objective.
        This is the CORRECT way to use Self-Operating Computer framework.
        """
        try:
            print(f"🎯 Running operate with objective: {objective}")
            print(f"   Model: {model}")
            
            # Build operate command
            cmd = ["operate"]
            if model != "gpt-4o":
                cmd.extend(["-m", model])
            
            # Run operate command
            process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Send objective to operate
            stdout, stderr = process.communicate(input=objective + '\n')
            
            if process.returncode == 0:
                print("✅ Operate command completed successfully")
                print(f"   Output: {stdout[:200]}...")
                return True
            else:
                print(f"❌ Operate command failed: {stderr}")
                return False
                
        except Exception as e:
            print(f"❌ Operate command error: {e}")
            return False

    async def process_survey_question(self, question_text: str) -> str:
        """
        Process survey question using Discord personality.
        Based on 18fg's approach from Discord.
        """
        try:
            # Generate Discord-style response
            response = await generate_personality_response(
                question_text,
                context="survey question",
                style=self.personality_style
            )

            return response

        except Exception as e:
            print(f"❌ Question processing failed: {e}")
            # Fallback responses
            fallbacks = [
                "tbh that's a solid question. i'd probably go with something realistic",
                "honestly just keep it simple and believable",
                "imo you want something that sounds natural",
                "yeah that's tricky, but i think the key is consistency"
            ]
            return random.choice(fallbacks)

    async def run_survey_automation(self):
        """
        Run survey automation using operate command.
        Based on Blue Parker's vision model approach.
        """
        print("🤖 Starting Operate survey automation...")

        # Survey automation objectives
        objectives = [
            f"Navigate to {self.survey_url} and wait for the page to load",
            "Look for survey cards or available surveys on the page",
            "Click on the first available survey to start it",
            "Fill out demographic questions with realistic answers",
            "Answer survey questions naturally and consistently",
            "Click the Next button to continue to the next page",
            "Continue answering questions until the survey is complete",
            "Submit the survey when finished"
        ]

        for i, objective in enumerate(objectives, 1):
            print(f"\n📋 Step {i}: {objective}")
            
            # Process any questions in the objective
            if "question" in objective.lower():
                response = await self.process_survey_question(objective)
                print(f"💬 Response: {response}")
            
            # Run operate command
            success = await self.run_operate_objective(objective)
            
            if not success:
                print(f"❌ Step {i} failed, stopping automation")
                break
            
            # Random delay between steps
            delay = random.uniform(3, 7)
            print(f"⏳ Waiting {delay:.1f} seconds...")
            await asyncio.sleep(delay)

        print("✅ Operate survey automation completed!")

    async def run_with_different_models(self):
        """
        Demo running operate with different AI models.
        """
        print("\n🤖 Testing different AI models with operate...")
        
        models = [
            ("gpt-4o", "OpenAI GPT-4o (default)"),
            ("gpt-4-with-ocr", "GPT-4 with OCR"),
            ("gemini-pro-vision", "Google Gemini Pro Vision"),
            ("claude-3", "Anthropic Claude 3")
        ]
        
        test_objective = "Take a screenshot of the current screen"
        
        for model, description in models:
            print(f"\n🧪 Testing {description}...")
            success = await self.run_operate_objective(test_objective, model)
            
            if success:
                print(f"✅ {description} works!")
            else:
                print(f"❌ {description} failed")
            
            await asyncio.sleep(2)

    async def run(self):
        """Main run method for Operate Integration."""
        print("🚀 Starting Operate Integration...")

        # Test different models first
        await self.run_with_different_models()
        
        # Run survey automation
        await self.run_survey_automation()

        print("✅ Operate Integration completed!")

async def main():
    """Main function to run Operate Integration."""
    # Load configuration
    config = Config()
    
    # Create and run Operate Integration
    bot = OperateIntegration({
        'SURVEY_URL': config.SURVEY_URL,
        'MAX_SURVEYS': config.MAX_SURVEYS,
        'personality_settings': {'style': config.PERSONALITY_STYLE}
    })
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
