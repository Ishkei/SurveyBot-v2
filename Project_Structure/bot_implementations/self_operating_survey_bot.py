#!/usr/bin/env python3
"""
Self-Operating Survey Bot
Integrates Self-Operating Computer Framework for advanced vision-based automation
Based on Discord community insights and Blue Parker's approach
"""

import asyncio
import time
import random
import json
import os
from typing import Optional, Dict, Any, List
from pathlib import Path

# Check if operate command is available
import subprocess
try:
    # Test if operate command is available
    result = subprocess.run(['operate', '--help'], capture_output=True, text=True)
    if result.returncode == 0:
    SOC_AVAILABLE = True
        print("✅ Self-Operating Computer framework available")
    else:
        SOC_AVAILABLE = False
        print("⚠️ Operate command not available")
except FileNotFoundError:
    SOC_AVAILABLE = False
    print("⚠️ Self-Operating Computer not available. Install: pip install self-operating-computer")

# Vision and OCR imports
try:
    import cv2
    import pytesseract
    from PIL import Image
    VISION_AVAILABLE = True
except ImportError:
    VISION_AVAILABLE = False
    print("⚠️ Vision libraries not available")

# Mouse control
try:
    import pyautogui
    MOUSE_AVAILABLE = True
except ImportError:
    MOUSE_AVAILABLE = False
    print("⚠️ PyAutoGUI not available")

from personality_responses import generate_personality_response

class SelfOperatingSurveyBot:
    """
    Advanced survey bot using Self-Operating Computer framework
    Based on Blue Parker's vision-based approach from Discord
    """
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.soc = None
        self.current_task = None
        
        # Vision settings
        self.use_soc = config.get('USE_SELF_OPERATING_COMPUTER', True) and SOC_AVAILABLE
        self.use_vision = config.get('USE_VISION_MODEL', True) and VISION_AVAILABLE
        self.use_mouse_control = config.get('USE_MOUSE_CONTROL', True) and MOUSE_AVAILABLE
        
        # AI settings
        self.vision_model = config.get('VISION_MODEL', 'gpt-4-vision-preview')
        self.personality_style = config.get('personality_settings', {}).get('style', 'discord_casual')
        
        # Survey state
        self.survey_progress = 0
        self.current_page_elements = []
        
        print(f"🤖 Self-Operating Survey Bot initialized")
        print(f"   Self-Operating Computer: {'✅' if self.use_soc else '❌'}")
        print(f"   Vision: {'✅' if self.use_vision else '❌'}")
        print(f"   Mouse Control: {'✅' if self.use_mouse_control else '❌'}")

    async def setup_self_operating_computer(self):
        """Setup Self-Operating Computer framework."""
        if not self.use_soc:
            print("❌ Self-Operating Computer not available")
            return False
            
        try:
            # Test operate command
            result = subprocess.run(['operate', '--help'], capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Self-Operating Computer setup complete")
                
                # Test screen capture capabilities
                await self.test_screen_capture()
                
            return True
            else:
                print(f"❌ Operate command test failed")
                return False
            
        except Exception as e:
            print(f"❌ Self-Operating Computer setup failed: {e}")
            return False

    async def test_screen_capture(self):
        """Test screen capture capabilities."""
        try:
            print("🔍 Testing screen capture capabilities...")
            
            # Test with mss
            try:
                import mss
                with mss.mss() as sct:
                    screenshot = sct.shot()
                    print("✅ mss screen capture working")
            except Exception as e:
                print(f"⚠️ mss screen capture failed: {e}")
            
            # Test with PIL
            try:
                from PIL import ImageGrab
                screenshot = ImageGrab.grab()
                print("✅ PIL screen capture working")
            except Exception as e:
                print(f"⚠️ PIL screen capture failed: {e}")
            
            # Test with pyautogui
            try:
                import pyautogui
                screenshot = pyautogui.screenshot()
                print("✅ PyAutoGUI screen capture working")
            except Exception as e:
                print(f"⚠️ PyAutoGUI screen capture failed: {e}")
                
        except Exception as e:
            print(f"⚠️ Screen capture test failed: {e}")

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
        Based on Blue Parker's vision-based approach.
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
                await asyncio.sleep(random.uniform(1, 3))
                
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
                # For text inputs
                if len(response) > 20:
                    await self.execute_action_with_soc("type", coordinates)
                # For multiple choice
                else:
                    await self.execute_action_with_soc("click", coordinates)
            
        except Exception as e:
            print(f"❌ Answer handling failed: {e}")

    async def navigate_next_page_soc(self, analysis: Dict[str, Any]):
        """Navigate to next page using Self-Operating Computer."""
        try:
            # Look for next/submit buttons in SOC analysis
            buttons = analysis.get('buttons', [])
            
            for button in buttons:
                button_text = button.get('text', '').lower()
                if any(word in button_text for word in ['next', 'continue', 'submit']):
                    coordinates = button.get('coordinates')
                    if coordinates:
                        await self.execute_action_with_soc("click", coordinates)
                        print("⏭️ Clicked next/submit button")
                        return
            
            print("⚠️ No next button found")
            
        except Exception as e:
            print(f"❌ Navigation failed: {e}")

    async def run_simple_task(self, task: str):
        """
        Run a simple task using Self-Operating Computer.
        Based on Blue Parker's demo approach.
        """
        try:
            if not self.soc:
                print("❌ Self-Operating Computer not available")
                return
            
            print(f"🤖 Executing task: {task}")
            
            # Use SOC to execute the task
            result = await self.soc.execute_task(task)
            
            print(f"✅ Task completed: {result}")
            
        except Exception as e:
            print(f"❌ Task execution failed: {e}")

    async def run(self):
        """Main execution method."""
        try:
            # Setup Self-Operating Computer
            if not await self.setup_self_operating_computer():
                print("❌ Self-Operating Computer setup failed")
                return
            
            # Get survey URL from config
            survey_url = self.config.get('bot_settings', {}).get('SURVEY_URL')
            
            if survey_url:
                # Run survey automation using operate command
                if "qmee.com" in survey_url.lower():
                    objective = "Navigate to https://qmee.com, sign in with the provided credentials, and complete available surveys naturally. Take your time and be thorough."
                else:
                    objective = f"Navigate to {survey_url} and complete the survey naturally"
                await self.run_operate_objective(objective)
            else:
                # Run demo task
                demo_task = "Open a web browser and go to a survey site"
                await self.run_operate_objective(demo_task)
            
        except Exception as e:
            print(f"❌ Bot execution failed: {e}")

    async def run_operate_objective(self, objective: str, model: str = "gpt-4o") -> bool:
        """
        Run operate command with given objective.
        This is the CORRECT way to use Self-Operating Computer framework.
        """
        try:
            print(f"🎯 Running operate with objective: {objective}")
            print(f"   Model: {model}")
            
            # Build operate command with additional options for better compatibility
            cmd = ["operate"]
            if model != "gpt-4o":
                cmd.extend(["-m", model])
            
            # Add environment variables for better Wayland compatibility
            env = os.environ.copy()
            env.update({
                'DISPLAY': ':0',
                'WAYLAND_DISPLAY': 'wayland-0',
                'XDG_SESSION_TYPE': 'wayland',
                'PYAUTOGUI_USE_WAYLAND': '1'  # Enable Wayland support for PyAutoGUI
            })
            
            # Run operate command with improved error handling
            process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env=env
            )
            
            # Send objective to operate
            stdout, stderr = process.communicate(input=objective + '\n')
            
            if process.returncode == 0:
                print("✅ Operate command completed successfully")
                print(f"   Output: {stdout[:200]}...")
                return True
            else:
                print(f"❌ Operate command failed: {stderr}")
                # Try alternative approach if first fails
                return await self.run_operate_alternative(objective, model)
                
        except Exception as e:
            print(f"❌ Operate command error: {e}")
            return await self.run_operate_alternative(objective, model)

    async def run_operate_alternative(self, objective: str, model: str = "gpt-4o") -> bool:
        """
        Alternative approach when main operate command fails.
        Uses different models or approaches.
        """
        try:
            print("🔄 Trying alternative approach...")
            
            # Try with different model (prioritize working ones)
            alternative_models = ["gemini-pro-vision", "gpt-4-with-ocr", "claude-3"]
            
            for alt_model in alternative_models:
                if alt_model == model:
                    continue
                    
                print(f"   Trying model: {alt_model}")
                
                cmd = ["operate", "-m", alt_model]
                
                # Run with timeout
                try:
                    process = subprocess.run(
                        cmd,
                        input=objective + '\n',
                        capture_output=True,
                        text=True,
                        timeout=60
                    )
                    
                    if process.returncode == 0:
                        print(f"✅ Alternative approach succeeded with {alt_model}")
                        print(f"   Output: {process.stdout[:200]}...")
                        return True
                    else:
                        print(f"   Failed with {alt_model}: {process.stderr}")
                        
                except subprocess.TimeoutExpired:
                    print(f"   Timeout with {alt_model}")
                    continue
                    
            print("❌ All alternative approaches failed")
            return False
            
        except Exception as e:
            print(f"❌ Alternative approach error: {e}")
            return False

    async def cleanup(self):
        """Cleanup resources."""
        print("✅ Bot cleanup completed")
