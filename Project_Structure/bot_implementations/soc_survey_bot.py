#!/usr/bin/env python3
"""
Self-Operating Computer Survey Bot
Advanced survey automation using Self-Operating Computer framework
Combines vision-based automation with Discord-style personality responses
Based on Blue Parker's approach and Discord community insights
"""

import asyncio
import time
import random
import json
import os
import sys
from typing import Optional, Dict, Any, List
from pathlib import Path
import logging

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Try to import Self-Operating Computer framework
try:
    import operate
    from operate.operate import SelfOperatingComputer
    SOC_AVAILABLE = True
    print("✅ Self-Operating Computer framework available")
except ImportError:
    SOC_AVAILABLE = False
    print("⚠️ Self-Operating Computer not available. Install: pip install self-operating-computer")

# Vision and OCR imports
try:
    import cv2
    import pytesseract
    from PIL import Image
    VISION_AVAILABLE = True
    print("✅ Vision libraries available")
except ImportError:
    VISION_AVAILABLE = False
    print("⚠️ Vision libraries not available")

# Mouse control
try:
    import pyautogui
    MOUSE_AVAILABLE = True
    print("✅ PyAutoGUI available")
except ImportError:
    MOUSE_AVAILABLE = False
    print("⚠️ PyAutoGUI not available")

from personality_responses import generate_personality_response
from config import Config

class SOCSurveyBot:
    """
    Advanced survey bot using Self-Operating Computer framework
    Based on Blue Parker's vision-based approach from Discord
    """

    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.soc = None
        self.current_task = None
        self.survey_progress = 0
        self.current_page_elements = []

        # Vision settings
        self.use_soc = config.get('USE_SELF_OPERATING_COMPUTER', True) and SOC_AVAILABLE
        self.use_vision = config.get('USE_VISION_MODEL', True) and VISION_AVAILABLE
        self.use_mouse_control = config.get('USE_MOUSE_CONTROL', True) and MOUSE_AVAILABLE

        # AI settings
        self.vision_model = config.get('VISION_MODEL', 'gpt-4-vision-preview')
        self.personality_style = config.get('personality_settings', {}).get('style', 'discord_casual')

        # Survey settings
        self.survey_url = config.get('SURVEY_URL', '')
        self.max_surveys = config.get('MAX_SURVEYS', 10)
        self.delay_between_actions = config.get('DELAY_BETWEEN_ACTIONS', (1, 3))

        print(f"🤖 SOC Survey Bot initialized")
        print(f"   Self-Operating Computer: {'✅' if self.use_soc else '❌'}")
        print(f"   Vision: {'✅' if self.use_vision else '❌'}")
        print(f"   Mouse Control: {'✅' if self.use_mouse_control else '❌'}")

    async def setup_self_operating_computer(self):
        """Setup Self-Operating Computer framework."""
        if not self.use_soc:
            print("❌ Self-Operating Computer not available")
            return False

        try:
            # Initialize Self-Operating Computer
            self.soc = SelfOperatingComputer(
                model=self.vision_model,
                headless=False,  # Show browser for debugging
                debug=True
            )

            print("✅ Self-Operating Computer setup complete")
            return True

        except Exception as e:
            print(f"❌ Self-Operating Computer setup failed: {e}")
            return False

    async def take_screenshot(self) -> Optional[bytes]:
        """Take screenshot using Self-Operating Computer."""
        try:
            if self.soc:
                screenshot = await self.soc.take_screenshot()
                return screenshot
            return None
        except Exception as e:
            print(f"❌ Screenshot failed: {e}")
            return None

    async def analyze_page_with_soc(self, screenshot: bytes) -> Dict[str, Any]:
        """
        Analyze page using Self-Operating Computer framework.
        Based on Blue Parker's vision model approach.
        """
        try:
            if not self.soc:
                return {}

            # Use Self-Operating Computer to analyze the screenshot
            analysis = await self.soc.analyze_screenshot(
                screenshot,
                prompt="Analyze this survey page and identify: 1) Questions 2) Answer options 3) Navigation buttons 4) Form fields. Return as JSON."
            )

            return analysis

        except Exception as e:
            print(f"❌ SOC analysis failed: {e}")
            return {}

    async def execute_action_with_soc(self, action: str, coordinates: Optional[tuple] = None):
        """
        Execute action using Self-Operating Computer.
        Based on Blue Parker's human-like control approach.
        """
        try:
            if not self.soc:
                return False

            if action == "click" and coordinates:
                x, y = coordinates
                await self.soc.click(x, y)
                print(f"✅ Clicked at ({x}, {y})")
                return True

            elif action == "type" and coordinates:
                x, y = coordinates
                await self.soc.type_at(x, y, self.current_task)
                print(f"✅ Typed at ({x}, {y})")
                return True

            elif action == "scroll":
                await self.soc.scroll(direction="down")
                print("✅ Scrolled down")
                return True

            return False

        except Exception as e:
            print(f"❌ Action execution failed: {e}")
            return False

    async def process_survey_question_soc(self, question_text: str) -> str:
        """
        Process survey question using Self-Operating Computer + Discord personality.
        Based on 18fg's Gemini API approach.
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

    async def run_self_operating_survey(self):
        """
        Run survey using Self-Operating Computer framework.
        Based on Blue Parker's vision model approach.
        """
        print("🤖 Starting Self-Operating Computer survey automation...")

        while True:
            try:
                # 1. Take screenshot using SOC
                screenshot = await self.take_screenshot()
                if not screenshot:
                    print("❌ Failed to take screenshot")
                    break

                # 2. Analyze page using SOC vision model
                analysis = await self.analyze_page_with_soc(screenshot)

                # 3. Check for completion
                if self.check_survey_completion(analysis):
                    print("✅ Survey completed!")
                    break

                # 4. Process questions using SOC
                questions = analysis.get('questions', [])

                for question in questions:
                    question_text = question.get('text', '')
                    if question_text:
                        print(f"🤔 Processing question: {question_text[:50]}...")

                        # Generate response using Discord personality
                        response = await self.process_survey_question_soc(question_text)

                        # Execute action using SOC
                        await self.handle_question_answer_soc(question, response)

                # 5. Navigate using SOC
                await self.navigate_next_page_soc(analysis)

                # 6. Random delay
                await asyncio.sleep(random.uniform(*self.delay_between_actions))

            except Exception as e:
                print(f"❌ Survey automation error: {e}")
                break

    def check_survey_completion(self, analysis: Dict[str, Any]) -> bool:
        """Check if survey is completed based on SOC analysis."""
        completion_indicators = [
            "thank you", "congratulations", "survey complete",
            "completion", "finished", "done"
        ]

        page_text = analysis.get('page_text', '').lower()
        return any(indicator in page_text for indicator in completion_indicators)

    async def handle_question_answer_soc(self, question: Dict[str, Any], response: str):
        """Handle answering a question using Self-Operating Computer."""
        try:
            # Get question coordinates from SOC analysis
            coordinates = question.get('coordinates')

            if coordinates:
                # Click on the question area
                await self.execute_action_with_soc("click", coordinates)

                # Type the response
                self.current_task = response
                await self.execute_action_with_soc("type", coordinates)

                print(f"✅ Answered: {response[:50]}...")

            else:
                print("⚠️ No coordinates found for question")

        except Exception as e:
            print(f"❌ Question handling failed: {e}")

    async def navigate_next_page_soc(self, analysis: Dict[str, Any]):
        """Navigate to next page using Self-Operating Computer."""
        try:
            # Look for navigation buttons
            buttons = analysis.get('buttons', [])
            
            for button in buttons:
                button_text = button.get('text', '').lower()
                if any(keyword in button_text for keyword in ['next', 'continue', 'submit']):
                    coordinates = button.get('coordinates')
                    if coordinates:
                        await self.execute_action_with_soc("click", coordinates)
                        print(f"✅ Clicked navigation button: {button_text}")
                        return True

            # If no navigation button found, try scrolling
            await self.execute_action_with_soc("scroll")
            print("✅ Scrolled down")

        except Exception as e:
            print(f"❌ Navigation failed: {e}")

    async def run(self):
        """Main run method for SOC Survey Bot."""
        print("🚀 Starting SOC Survey Bot...")

        # Setup Self-Operating Computer
        if not await self.setup_self_operating_computer():
            print("❌ Failed to setup Self-Operating Computer")
            return

        # Run survey automation
        await self.run_self_operating_survey()

        print("✅ SOC Survey Bot completed!")

async def main():
    """Main function to run SOC Survey Bot."""
    # Load configuration
    config = Config().get_config()
    
    # Create and run SOC Survey Bot
    bot = SOCSurveyBot(config)
    await bot.run()

if __name__ == "__main__":
    asyncio.run(main())
