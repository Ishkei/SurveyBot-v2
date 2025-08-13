#!/usr/bin/env python3
"""
Advanced Operate Integration for Survey Bot
Supports all Self-Operating Computer modes and models
Based on the official SOC documentation
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

class AdvancedOperateIntegration:
    """
    Advanced integration with Self-Operating Computer framework
    Supports all modes: OpenAI, Gemini, Claude, Qwen, LLaVa, Voice, OCR, SoM
    """

    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.personality_style = config.get('personality_settings', {}).get('style', 'discord_casual')
        self.survey_url = config.get('SURVEY_URL', '')
        self.max_surveys = config.get('MAX_SURVEYS', 10)
        
        # Available models and modes
        self.available_models = {
            'gpt-4o': 'OpenAI GPT-4o (default)',
            'gpt-4-with-ocr': 'GPT-4 with OCR (recommended)',
            'o1-with-ocr': 'OpenAI o1 with OCR',
            'gpt-4.1-with-ocr': 'OpenAI GPT-4.1 with OCR',
            'gemini-pro-vision': 'Google Gemini Pro Vision',
            'claude-3': 'Anthropic Claude 3',
            'qwen-vl': 'Qwen Vision Language',
            'llava': 'LLaVa via Ollama (local)',
            'gpt-4-with-som': 'GPT-4 with Set-of-Mark'
        }
        
        print(f"🤖 Advanced Operate Integration initialized")
        print(f"   Survey URL: {self.survey_url}")
        print(f"   Personality Style: {self.personality_style}")
        print(f"   Available Models: {len(self.available_models)}")

    async def run_operate_with_model(self, objective: str, model: str = "gpt-4o", voice_mode: bool = False) -> bool:
        """
        Run operate command with specific model and mode.
        Supports all SOC modes and models.
        """
        try:
            print(f"🎯 Running operate with objective: {objective}")
            print(f"   Model: {self.available_models.get(model, model)}")
            print(f"   Voice Mode: {'Yes' if voice_mode else 'No'}")
            
            # Build operate command
            cmd = ["operate"]
            
            # Add model flag if not default
            if model != "gpt-4o":
                cmd.extend(["-m", model])
            
            # Add voice mode if requested
            if voice_mode:
                cmd.append("--voice")
            
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

    async def test_all_models(self):
        """
        Test all available Self-Operating Computer models.
        """
        print("\n🧪 Testing all available SOC models...")
        
        test_objective = "Take a screenshot of the current screen"
        
        for model, description in self.available_models.items():
            print(f"\n🔧 Testing {description}...")
            
            # Skip LLaVa for now as it requires Ollama setup
            if model == "llava":
                print("   ⚠️ Skipping LLaVa (requires Ollama setup)")
                continue
                
            success = await self.run_operate_with_model(test_objective, model)
            
            if success:
                print(f"   ✅ {description} works!")
            else:
                print(f"   ❌ {description} failed")
            
            await asyncio.sleep(2)

    async def run_voice_mode_demo(self):
        """
        Demo voice mode functionality.
        """
        print("\n🎤 Testing Voice Mode...")
        print("   Note: Voice mode requires additional setup")
        print("   - Install: pip install -r requirements-audio.txt")
        print("   - Linux: sudo apt install portaudio19-dev python3-pyaudio")
        print("   - macOS: brew install portaudio")
        
        test_objective = "Open a web browser and go to Google"
        
        success = await self.run_operate_with_model(test_objective, "gpt-4o", voice_mode=True)
        
        if success:
            print("   ✅ Voice mode works!")
        else:
            print("   ❌ Voice mode failed (may need setup)")

    async def run_ocr_mode_demo(self):
        """
        Demo OCR mode functionality.
        """
        print("\n👁️ Testing OCR Mode...")
        print("   OCR mode provides better text recognition")
        
        test_objective = "Find and click on any button with text"
        
        success = await self.run_operate_with_model(test_objective, "gpt-4-with-ocr")
        
        if success:
            print("   ✅ OCR mode works!")
        else:
            print("   ❌ OCR mode failed")

    async def run_som_mode_demo(self):
        """
        Demo Set-of-Mark (SoM) mode functionality.
        """
        print("\n🎯 Testing Set-of-Mark (SoM) Mode...")
        print("   SoM mode enhances visual grounding capabilities")
        
        test_objective = "Identify and click on the most prominent button"
        
        success = await self.run_operate_with_model(test_objective, "gpt-4-with-som")
        
        if success:
            print("   ✅ SoM mode works!")
        else:
            print("   ❌ SoM mode failed")

    async def run_survey_automation_with_model(self, model: str = "gpt-4-with-ocr"):
        """
        Run survey automation with specific model.
        """
        print(f"\n🤖 Starting survey automation with {self.available_models.get(model, model)}...")

        # Survey automation objectives optimized for different models
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
            
            # Run operate command with specific model
            success = await self.run_operate_with_model(objective, model)
            
            if not success:
                print(f"❌ Step {i} failed, stopping automation")
                break
            
            # Random delay between steps
            delay = random.uniform(3, 7)
            print(f"⏳ Waiting {delay:.1f} seconds...")
            await asyncio.sleep(delay)

        print("✅ Survey automation completed!")

    async def process_survey_question(self, question_text: str) -> str:
        """
        Process survey question using Discord personality.
        """
        try:
            response = await generate_personality_response(
                question_text,
                context="survey question",
                style=self.personality_style
            )
            return response
        except Exception as e:
            print(f"❌ Question processing failed: {e}")
            return "honestly just keeping it simple and believable"

    async def run_comprehensive_demo(self):
        """
        Run comprehensive demo of all SOC capabilities.
        """
        print("🚀 Advanced Self-Operating Computer Demo")
        print("=" * 60)
        
        # Test all models
        await self.test_all_models()
        
        # Test special modes
        await self.run_ocr_mode_demo()
        await self.run_som_mode_demo()
        await self.run_voice_mode_demo()
        
        # Run survey automation with best model
        await self.run_survey_automation_with_model("gpt-4-with-ocr")

    async def run(self):
        """Main run method for Advanced Operate Integration."""
        print("🚀 Starting Advanced Operate Integration...")

        # Run comprehensive demo
        await self.run_comprehensive_demo()

        print("✅ Advanced Operate Integration completed!")

async def main():
    """Main function to run Advanced Operate Integration."""
    # Load configuration
    config = Config()
    
    # Create and run Advanced Operate Integration
    bot = AdvancedOperateIntegration({
        'SURVEY_URL': config.SURVEY_URL,
        'MAX_SURVEYS': config.MAX_SURVEYS,
        'personality_settings': {'style': config.PERSONALITY_STYLE}
    })
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
