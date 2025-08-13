#!/usr/bin/env python3
"""
Simple Self-Operating Computer Survey Bot
Uses operate command directly for vision-based automation
Combines with Discord-style personality responses
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

class SimpleSOCBot:
    """
    Simple Self-Operating Computer integration
    Uses operate command directly for survey automation
    """

    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.personality_style = config.get('personality_settings', {}).get('style', 'discord_casual')
        self.survey_url = config.get('SURVEY_URL', '')
        self.max_surveys = config.get('MAX_SURVEYS', 10)
        
        print(f"🤖 Simple SOC Bot initialized")
        print(f"   Survey URL: {self.survey_url}")
        print(f"   Personality Style: {self.personality_style}")

    async def run_operate_command(self, objective: str) -> bool:
        """
        Run operate command with given objective.
        Based on Blue Parker's approach.
        """
        try:
            print(f"🎯 Running operate with objective: {objective}")
            
            # Run operate command
            process = subprocess.Popen(
                ['operate'],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Send objective to operate
            stdout, stderr = process.communicate(input=objective + '\n')
            
            if process.returncode == 0:
                print("✅ Operate command completed successfully")
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
        Based on 18fg's approach.
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
        print("🤖 Starting Simple SOC survey automation...")

        # Example objectives for operate
        objectives = [
            f"Go to {self.survey_url} and start the survey",
            "Fill out the survey questions with realistic answers",
            "Click the Next button to continue",
            "Complete the survey and submit it"
        ]

        for i, objective in enumerate(objectives):
            print(f"\n📋 Step {i+1}: {objective}")
            
            # Process any questions in the objective
            if "question" in objective.lower():
                response = await self.process_survey_question(objective)
                print(f"💬 Response: {response}")
            
            # Run operate command
            success = await self.run_operate_command(objective)
            
            if not success:
                print(f"❌ Step {i+1} failed, stopping automation")
                break
            
            # Random delay between steps
            delay = random.uniform(2, 5)
            print(f"⏳ Waiting {delay:.1f} seconds...")
            await asyncio.sleep(delay)

        print("✅ Simple SOC survey automation completed!")

    async def run(self):
        """Main run method for Simple SOC Bot."""
        print("🚀 Starting Simple SOC Bot...")

        # Run survey automation
        await self.run_survey_automation()

        print("✅ Simple SOC Bot completed!")

async def main():
    """Main function to run Simple SOC Bot."""
    # Load configuration
    config = Config()
    
    # Create and run Simple SOC Bot
    bot = SimpleSOCBot({
        'SURVEY_URL': config.SURVEY_URL,
        'MAX_SURVEYS': config.MAX_SURVEYS,
        'personality_settings': {'style': config.PERSONALITY_STYLE}
    })
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
