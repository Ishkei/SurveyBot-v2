#!/usr/bin/env python3
"""
Lightweight Vision-Based Survey Bot
Implements Blue Parker's vision-based approach without heavy dependencies
Based on Discord community insights
"""

import asyncio
import time
import random
import json
import os
from typing import Optional, Dict, Any, List, Tuple
from pathlib import Path
import base64
from io import BytesIO

# Lightweight imports
try:
    import cv2
    import numpy as np
    from PIL import Image
    VISION_AVAILABLE = True
except ImportError:
    VISION_AVAILABLE = False
    print("⚠️ OpenCV/PIL not available")

try:
    import pytesseract
    OCR_AVAILABLE = True
except ImportError:
    OCR_AVAILABLE = False
    print("⚠️ Tesseract OCR not available")

try:
    import pyautogui
    MOUSE_AVAILABLE = True
except ImportError:
    MOUSE_AVAILABLE = False
    print("⚠️ PyAutoGUI not available")

try:
    import requests
    REQUESTS_AVAILABLE = True
except ImportError:
    REQUESTS_AVAILABLE = False
    print("⚠️ Requests not available")

from personality_responses import generate_personality_response

class LightweightVisionBot:
    """
    Lightweight vision-based survey bot
    Based on Blue Parker's approach without heavy dependencies
    """
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.current_screenshot = None
        self.last_screenshot = None
        
        # Vision settings
        self.use_vision = config.get('USE_VISION_MODEL', True) and VISION_AVAILABLE
        self.use_ocr = config.get('USE_OCR', True) and OCR_AVAILABLE
        self.use_mouse_control = config.get('USE_MOUSE_CONTROL', True) and MOUSE_AVAILABLE
        
        # AI settings
        self.openai_api_key = config.get('api_settings', {}).get('OPENAI_API_KEY')
        self.gemini_api_key = config.get('api_settings', {}).get('GEMINI_API_KEY')
        self.personality_style = config.get('personality_settings', {}).get('style', 'discord_casual')
        
        # Survey state
        self.survey_progress = 0
        self.current_page_elements = []
        
        print(f"🤖 Lightweight Vision Bot initialized")
        print(f"   Vision: {'✅' if self.use_vision else '❌'}")
        print(f"   OCR: {'✅' if self.use_ocr else '❌'}")
        print(f"   Mouse Control: {'✅' if self.use_mouse_control else '❌'}")

    async def take_screenshot(self) -> Optional[bytes]:
        """Take screenshot using PyAutoGUI."""
        try:
            if MOUSE_AVAILABLE:
                screenshot = pyautogui.screenshot()
                img_buffer = BytesIO()
                screenshot.save(img_buffer, format='PNG')
                return img_buffer.getvalue()
            return None
        except Exception as e:
            print(f"❌ Screenshot failed: {e}")
            return None

    async def analyze_page_ocr(self, screenshot: bytes) -> Dict[str, Any]:
        """
        Analyze page using OCR.
        Based on smewknox's OCR approach from Discord.
        """
        try:
            if not OCR_AVAILABLE:
                return {}
            
            # Convert bytes to PIL Image
            image = Image.open(BytesIO(screenshot))
            
            # Extract text using OCR
            text = pytesseract.image_to_string(image)
            
            # Get bounding boxes for text elements
            data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
            
            # Extract elements with coordinates
            elements = []
            for i in range(len(data['text'])):
                if data['conf'][i] > 50:  # Confidence threshold
                    elements.append({
                        'text': data['text'][i],
                        'x': data['left'][i],
                        'y': data['top'][i],
                        'width': data['width'][i],
                        'height': data['height'][i],
                        'confidence': data['conf'][i]
                    })
            
            return {
                'page_text': text,
                'elements': elements,
                'questions': self.extract_questions(text, elements),
                'buttons': self.extract_buttons(text, elements)
            }
            
        except Exception as e:
            print(f"❌ OCR analysis failed: {e}")
            return {}

    def extract_questions(self, text: str, elements: List[Dict]) -> List[Dict]:
        """Extract survey questions from OCR text."""
        questions = []
        question_keywords = [
            'question', 'what', 'how', 'why', 'when', 'where', 'which',
            'select', 'choose', 'pick', 'rate', 'scale'
        ]
        
        lines = text.split('\n')
        for i, line in enumerate(lines):
            line_lower = line.lower()
            if any(keyword in line_lower for keyword in question_keywords):
                # Find corresponding element
                for element in elements:
                    if element['text'].strip() in line:
                        questions.append({
                            'text': line.strip(),
                            'coordinates': (element['x'], element['y']),
                            'line_number': i
                        })
                        break
        
        return questions

    def extract_buttons(self, text: str, elements: List[Dict]) -> List[Dict]:
        """Extract clickable buttons from OCR text."""
        buttons = []
        button_keywords = [
            'next', 'continue', 'submit', 'button', 'proceed', 'done',
            'yes', 'no', 'agree', 'disagree', 'select', 'choose'
        ]
        
        for element in elements:
            element_text = element['text'].lower()
            if any(keyword in element_text for keyword in button_keywords):
                buttons.append({
                    'text': element['text'],
                    'coordinates': (element['x'], element['y']),
                    'width': element['width'],
                    'height': element['height']
                })
        
        return buttons

    async def analyze_page_vision_api(self, screenshot: bytes) -> Dict[str, Any]:
        """
        Analyze page using external vision API.
        Based on Blue Parker's GPT-4V approach.
        """
        try:
            if not self.openai_api_key or not REQUESTS_AVAILABLE:
                return {}
            
            # Convert screenshot to base64
            screenshot_b64 = base64.b64encode(screenshot).decode('utf-8')
            
            # Prepare API request
            headers = {
                'Authorization': f'Bearer {self.openai_api_key}',
                'Content-Type': 'application/json'
            }
            
            data = {
                'model': 'gpt-4-vision-preview',
                'messages': [
                    {
                        'role': 'user',
                        'content': [
                            {
                                'type': 'text',
                                'text': 'Analyze this survey page and identify: 1) Questions 2) Answer options 3) Navigation buttons 4) Form fields. Return as JSON.'
                            },
                            {
                                'type': 'image_url',
                                'image_url': {
                                    'url': f'data:image/png;base64,{screenshot_b64}'
                                }
                            }
                        ]
                    }
                ],
                'max_tokens': 1000
            }
            
            response = requests.post(
                'https://api.openai.com/v1/chat/completions',
                headers=headers,
                json=data,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                content = result['choices'][0]['message']['content']
                
                # Try to parse JSON response
                try:
                    return json.loads(content)
                except json.JSONDecodeError:
                    # Fallback to OCR
                    return await self.analyze_page_ocr(screenshot)
            
            return {}
            
        except Exception as e:
            print(f"❌ Vision API analysis failed: {e}")
            return await self.analyze_page_ocr(screenshot)

    async def execute_action(self, action: str, coordinates: Optional[Tuple[int, int]] = None):
        """
        Execute action using PyAutoGUI.
        Based on erick's hardware-level control approach.
        """
        try:
            if not MOUSE_AVAILABLE:
                return False
            
            if action == "click" and coordinates:
                x, y = coordinates
                # Add human-like delay
                time.sleep(random.uniform(0.5, 1.5))
                pyautogui.click(x, y)
                print(f"✅ Clicked at ({x}, {y})")
                return True
                
            elif action == "type" and coordinates:
                x, y = coordinates
                # Click first, then type
                pyautogui.click(x, y)
                time.sleep(random.uniform(0.2, 0.5))
                pyautogui.typewrite(self.current_task, interval=random.uniform(0.05, 0.1))
                print(f"✅ Typed at ({x}, {y})")
                return True
                
            elif action == "scroll":
                pyautogui.scroll(-300)  # Scroll down
                print("✅ Scrolled down")
                return True
                
            return False
            
        except Exception as e:
            print(f"❌ Action execution failed: {e}")
            return False

    async def process_survey_question(self, question_text: str) -> str:
        """
        Process survey question using Discord personality.
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

    async def run_vision_survey(self):
        """
        Run survey using vision-based approach.
        Based on Blue Parker's vision model approach.
        """
        print("🤖 Starting lightweight vision-based survey automation...")
        
        while True:
            try:
                # 1. Take screenshot
                screenshot = await self.take_screenshot()
                if not screenshot:
                    print("❌ Failed to take screenshot")
                    break
                
                # 2. Analyze page using vision API or OCR
                if self.openai_api_key:
                    analysis = await self.analyze_page_vision_api(screenshot)
                else:
                    analysis = await self.analyze_page_ocr(screenshot)
                
                # 3. Check for completion
                if self.check_survey_completion(analysis):
                    print("✅ Survey completed!")
                    break
                
                # 4. Process questions
                questions = analysis.get('questions', [])
                
                for question in questions:
                    question_text = question.get('text', '')
                    if question_text:
                        print(f"🤔 Processing question: {question_text[:50]}...")
                        
                        # Generate response using Discord personality
                        response = await self.process_survey_question(question_text)
                        
                        # Execute action
                        await self.handle_question_answer(question, response)
                
                # 5. Navigate
                await self.navigate_next_page(analysis)
                
                # 6. Random delay
                await asyncio.sleep(random.uniform(1, 3))
                
            except Exception as e:
                print(f"❌ Survey automation error: {e}")
                break

    def check_survey_completion(self, analysis: Dict[str, Any]) -> bool:
        """Check if survey is completed based on analysis."""
        completion_indicators = [
            "thank you", "congratulations", "survey complete", 
            "completion", "finished", "done"
        ]
        
        page_text = analysis.get('page_text', '').lower()
        return any(indicator in page_text for indicator in completion_indicators)

    async def handle_question_answer(self, question: Dict[str, Any], response: str):
        """Handle answering a question."""
        try:
            coordinates = question.get('coordinates')
            
            if coordinates:
                # For text inputs (long responses)
                if len(response) > 20:
                    self.current_task = response
                    await self.execute_action("type", coordinates)
                # For multiple choice (short responses)
                else:
                    await self.execute_action("click", coordinates)
            
        except Exception as e:
            print(f"❌ Answer handling failed: {e}")

    async def navigate_next_page(self, analysis: Dict[str, Any]):
        """Navigate to next page."""
        try:
            buttons = analysis.get('buttons', [])
            
            for button in buttons:
                button_text = button.get('text', '').lower()
                if any(word in button_text for word in ['next', 'continue', 'submit']):
                    coordinates = button.get('coordinates')
                    if coordinates:
                        await self.execute_action("click", coordinates)
                        print("⏭️ Clicked next/submit button")
                        return
            
            print("⚠️ No next button found")
            
        except Exception as e:
            print(f"❌ Navigation failed: {e}")

    async def run_simple_task(self, task: str):
        """
        Run a simple task using vision-based approach.
        Based on Blue Parker's demo approach.
        """
        try:
            print(f"🤖 Executing task: {task}")
            
            # Take screenshot
            screenshot = await self.take_screenshot()
            if not screenshot:
                print("❌ Failed to take screenshot")
                return
            
            # Analyze current state
            analysis = await self.analyze_page_ocr(screenshot)
            
            print(f"✅ Task analysis complete: {len(analysis.get('elements', []))} elements found")
            
        except Exception as e:
            print(f"❌ Task execution failed: {e}")

    async def run(self):
        """Main execution method."""
        try:
            # Get survey URL from config
            survey_url = self.config.get('bot_settings', {}).get('SURVEY_URL')
            
            if survey_url:
                print(f"🎯 Target survey: {survey_url}")
                print("💡 Note: This lightweight version focuses on vision analysis")
                print("   For full browser automation, use the advanced bot")
                
                # Run vision-based survey
                await self.run_vision_survey()
            else:
                # Run demo task
                demo_task = "Analyze current screen for survey elements"
                await self.run_simple_task(demo_task)
            
        except Exception as e:
            print(f"❌ Bot execution failed: {e}")

    async def cleanup(self):
        """Cleanup resources."""
        print("✅ Lightweight vision bot cleanup completed")
