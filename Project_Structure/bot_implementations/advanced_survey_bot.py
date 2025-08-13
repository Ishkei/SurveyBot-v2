#!/usr/bin/env python3
"""
Advanced Survey Bot - Vision-based approach with hybrid HTML+vision strategy
Based on Discord community insights from AI Survey Club
"""

import asyncio
import time
import random
import numpy as np
from typing import Optional, Dict, Any, List, Tuple
from pathlib import Path
import json
import base64
from io import BytesIO

# Vision and OCR imports
try:
    import cv2
    import pytesseract
    from PIL import Image
    VISION_AVAILABLE = True
except ImportError:
    VISION_AVAILABLE = False
    print("⚠️ Vision libraries not available. Install: pip install opencv-python pytesseract pillow")

# Browser automation
try:
    from playwright.async_api import async_playwright, Page, Browser
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    BROWSER_AVAILABLE = True
except ImportError:
    BROWSER_AVAILABLE = False
    print("⚠️ Browser automation not available")

# Mouse control
try:
    import pyautogui
    MOUSE_AVAILABLE = True
except ImportError:
    MOUSE_AVAILABLE = False
    print("⚠️ PyAutoGUI not available")

from personality_responses import generate_personality_response

class AdvancedSurveyBot:
    """
    Advanced survey bot implementing vision-based approach with hybrid HTML+vision strategy
    Based on Discord community insights from AI Survey Club
    """
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.browser = None
        self.page = None
        self.selenium_driver = None
        
        # Vision settings
        self.use_vision = config.get('USE_VISION_MODEL', True) and VISION_AVAILABLE
        self.use_ocr = config.get('USE_OCR', True) and VISION_AVAILABLE
        self.use_mouse_control = config.get('USE_MOUSE_CONTROL', True) and MOUSE_AVAILABLE
        
        # AI settings
        self.vision_model = None  # Will be set up for GPT-4V or similar
        self.personality_style = config.get('personality_settings', {}).get('style', 'discord_casual')
        
        # Survey state
        self.current_page_elements = []
        self.survey_progress = 0
        self.last_screenshot = None
        
        # Scrolling state
        self.scroll_position = 0
        self.page_height = 0
        
        print(f"🤖 Advanced Survey Bot initialized")
        print(f"   Vision: {'✅' if self.use_vision else '❌'}")
        print(f"   OCR: {'✅' if self.use_ocr else '❌'}")
        print(f"   Mouse Control: {'✅' if self.use_mouse_control else '❌'}")

    async def setup_browser(self):
        """Setup browser with enhanced capabilities."""
        if not BROWSER_AVAILABLE:
            print("❌ Browser automation not available")
            return False
            
        try:
            playwright = await async_playwright().start()
            self.browser = await playwright.chromium.launch(
                headless=not self.config.get('DEBUG_MODE', False)
            )
            self.page = await self.browser.new_page()
            
            # Set viewport for consistent screenshots
            await self.page.set_viewport_size({"width": 1920, "height": 1080})
            
            print("✅ Browser setup complete")
            return True
            
        except Exception as e:
            print(f"❌ Browser setup failed: {e}")
            return False

    async def take_screenshot(self) -> Optional[bytes]:
        """Take screenshot of current page."""
        try:
            if self.page:
                screenshot = await self.page.screenshot(full_page=True)
                self.last_screenshot = screenshot
                return screenshot
            return None
        except Exception as e:
            print(f"❌ Screenshot failed: {e}")
            return None

    async def analyze_page_vision(self, screenshot: bytes) -> Dict[str, Any]:
        """
        Analyze page using vision model (GPT-4V or similar).
        Based on Blue Parker's vision model approach from Discord.
        """
        try:
            # Convert screenshot to base64 for API
            screenshot_b64 = base64.b64encode(screenshot).decode('utf-8')
            
            # This would integrate with GPT-4V or similar vision model
            # For now, we'll use OCR as fallback
            if self.use_ocr:
                return await self.analyze_page_ocr(screenshot)
            
            # Placeholder for vision model analysis
            analysis = {
                "page_type": "survey",
                "elements": {
                    "text_boxes": [],
                    "checkboxes": [],
                    "radio_buttons": [],
                    "dropdowns": [],
                    "buttons": [],
                    "questions": []
                },
                "layout": "standard_form",
                "has_video": False,
                "has_captcha": False,
                "needs_scrolling": False
            }
            
            return analysis
            
        except Exception as e:
            print(f"❌ Vision analysis failed: {e}")
            return {}

    async def analyze_page_ocr(self, screenshot: bytes) -> Dict[str, Any]:
        """
        Analyze page using OCR (pytesseract).
        Based on smewknox's OCR approach from Discord.
        """
        try:
            # Convert bytes to PIL Image
            image = Image.open(BytesIO(screenshot))
            
            # Extract text using OCR
            text = pytesseract.image_to_string(image)
            
            # Extract text with bounding boxes
            data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
            
            # Find interactive elements
            elements = {
                "text_boxes": [],
                "checkboxes": [],
                "radio_buttons": [],
                "dropdowns": [],
                "buttons": [],
                "questions": []
            }
            
            # Process OCR data to find elements
            for i, conf in enumerate(data['conf']):
                if int(conf) > 50:  # Confidence threshold
                    text = data['text'][i]
                    x = data['left'][i]
                    y = data['top'][i]
                    w = data['width'][i]
                    h = data['height'][i]
                    
                    # Classify elements based on text and position
                    if any(word in text.lower() for word in ['question', 'what', 'how', 'why']):
                        elements['questions'].append({
                            'text': text,
                            'position': (x, y, w, h)
                        })
                    elif any(word in text.lower() for word in ['submit', 'next', 'continue', 'button']):
                        elements['buttons'].append({
                            'text': text,
                            'position': (x, y, w, h)
                        })
            
            return {
                "page_type": "survey",
                "elements": elements,
                "full_text": text,
                "layout": "ocr_detected"
            }
            
        except Exception as e:
            print(f"❌ OCR analysis failed: {e}")
            return {}

    async def smart_scroll(self, direction: str = "down") -> bool:
        """
        Smart scrolling using scrollbar detection.
        Based on smewknox's scrollbar approach from Discord.
        """
        try:
            if not self.use_mouse_control:
                # Fallback to JavaScript scrolling
                if direction == "down":
                    await self.page.evaluate("window.scrollBy(0, 300)")
                else:
                    await self.page.evaluate("window.scrollBy(0, -300)")
                return True
            
            # Take screenshot for scrollbar detection
            screenshot = await self.take_screenshot()
            if not screenshot:
                return False
            
            # Convert to numpy array
            image = Image.open(BytesIO(screenshot))
            img_array = np.array(image)
            
            # Detect scrollbar (rightmost 20 pixels)
            screen_width = img_array.shape[1]
            scrollbar_area = img_array[:, screen_width-20:, :]
            
            # Find scrollbar thumb using color detection
            # This is a simplified version of smewknox's approach
            gray = cv2.cvtColor(scrollbar_area, cv2.COLOR_RGB2GRAY)
            _, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
            
            # Find contours (scrollbar thumb)
            contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            if contours:
                # Get the largest contour (scrollbar thumb)
                largest_contour = max(contours, key=cv2.contourArea)
                x, y, w, h = cv2.boundingRect(largest_contour)
                
                # Calculate scrollbar position
                scrollbar_x = screen_width - 20 + x + w//2
                scrollbar_y = y + h//2
                
                # Move mouse to scrollbar and drag
                if direction == "down":
                    target_y = scrollbar_y + h
                else:
                    target_y = scrollbar_y - h
                
                # Use pyautogui for mouse control
                pyautogui.moveTo(scrollbar_x, scrollbar_y, duration=0.5)
                pyautogui.mouseDown()
                pyautogui.moveTo(scrollbar_x, target_y, duration=1.0)
                pyautogui.mouseUp()
                
                print(f"✅ Scrolled {direction} using scrollbar")
                return True
            
            # Fallback to JavaScript
            if direction == "down":
                await self.page.evaluate("window.scrollBy(0, 300)")
            else:
                await self.page.evaluate("window.scrollBy(0, -300)")
            
            return True
            
        except Exception as e:
            print(f"❌ Smart scroll failed: {e}")
            return False

    async def detect_page_changes(self) -> bool:
        """
        Detect if page content has changed after scrolling.
        Based on smewknox's OCR change detection approach.
        """
        try:
            # Take current screenshot
            current_screenshot = await self.take_screenshot()
            if not current_screenshot or not self.last_screenshot:
                return False
            
            # Convert to PIL Images
            current_img = Image.open(BytesIO(current_screenshot))
            last_img = Image.open(BytesIO(self.last_screenshot))
            
            # Simple change detection using pixel difference
            current_array = np.array(current_img)
            last_array = np.array(last_img)
            
            # Calculate difference
            diff = np.mean(np.abs(current_array.astype(float) - last_array.astype(float)))
            
            # If significant change detected
            if diff > 10:  # Threshold for change detection
                print("✅ Page content changed")
                return True
            
            return False
            
        except Exception as e:
            print(f"❌ Page change detection failed: {e}")
            return False

    async def find_element_by_text(self, text: str) -> Optional[Tuple[int, int]]:
        """
        Find element by text using OCR.
        Based on smewknox's pytesseract approach.
        """
        try:
            screenshot = await self.take_screenshot()
            if not screenshot:
                return None
            
            image = Image.open(BytesIO(screenshot))
            
            # Use pytesseract to find text location
            data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
            
            for i, conf in enumerate(data['conf']):
                if int(conf) > 50:  # Confidence threshold
                    found_text = data['text'][i]
                    if text.lower() in found_text.lower():
                        x = data['left'][i]
                        y = data['top'][i]
                        w = data['width'][i]
                        h = data['height'][i]
                        
                        # Return center coordinates
                        center_x = x + w//2
                        center_y = y + h//2
                        
                        print(f"✅ Found '{text}' at ({center_x}, {center_y})")
                        return (center_x, center_y)
            
            return None
            
        except Exception as e:
            print(f"❌ Text element search failed: {e}")
            return None

    async def click_element_human_like(self, coordinates: Tuple[int, int]):
        """
        Click element with human-like mouse movement using Bézier curves.
        Based on erick's approach from Discord.
        """
        try:
            if not self.use_mouse_control:
                # Fallback to Playwright click
                await self.page.click(f"xpath=//*[contains(text(), '{coordinates}')]")
                return
            
            x, y = coordinates
            
            # Get current mouse position
            current_x, current_y = pyautogui.position()
            
            # Generate Bézier curve path for human-like movement
            # This is a simplified version - in practice you'd want more complex curves
            points = self.generate_bezier_curve(
                (current_x, current_y), 
                (x, y), 
                num_points=10
            )
            
            # Move mouse along the curve
            for point in points:
                pyautogui.moveTo(point[0], point[1], duration=0.1)
            
            # Click with slight delay
            time.sleep(random.uniform(0.1, 0.3))
            pyautogui.click()
            
            print(f"✅ Clicked element at ({x}, {y}) with human-like movement")
            
        except Exception as e:
            print(f"❌ Human-like click failed: {e}")

    def generate_bezier_curve(self, start: Tuple[int, int], end: Tuple[int, int], 
                             num_points: int = 10) -> List[Tuple[int, int]]:
        """
        Generate Bézier curve for human-like mouse movement.
        Based on erick's approach from Discord.
        """
        # Simple linear interpolation for now
        # In practice, you'd want more complex curves with random control points
        points = []
        for i in range(num_points):
            t = i / (num_points - 1)
            x = start[0] + t * (end[0] - start[0])
            y = start[1] + t * (end[1] - start[1])
            
            # Add some randomness for human-like movement
            x += random.uniform(-5, 5)
            y += random.uniform(-5, 5)
            
            points.append((int(x), int(y)))
        
        return points

    async def process_survey_question(self, question_text: str) -> str:
        """
        Process survey question using Discord-style personality.
        Based on 18fg's approach using Gemini API.
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

    async def run_vision_based_survey(self):
        """
        Run survey using vision-based approach.
        Based on Blue Parker's and Foopop's vision model approach.
        """
        print("🤖 Starting vision-based survey automation...")
        
        while True:
            try:
                # 1. Take screenshot
                screenshot = await self.take_screenshot()
                if not screenshot:
                    print("❌ Failed to take screenshot")
                    break
                
                # 2. Analyze page using vision/OCR
                analysis = await self.analyze_page_vision(screenshot)
                
                # 3. Check for completion
                if self.check_survey_completion(analysis):
                    print("✅ Survey completed!")
                    break
                
                # 4. Process questions on current page
                questions = analysis.get('elements', {}).get('questions', [])
                
                for question in questions:
                    question_text = question.get('text', '')
                    if question_text:
                        print(f"🤔 Processing question: {question_text[:50]}...")
                        
                        # Generate response
                        response = await self.process_survey_question(question_text)
                        
                        # Find and click appropriate answer
                        await self.handle_question_answer(question, response)
                
                # 5. Navigate to next page
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
        
        full_text = analysis.get('full_text', '').lower()
        return any(indicator in full_text for indicator in completion_indicators)

    async def handle_question_answer(self, question: Dict[str, Any], response: str):
        """Handle answering a specific question."""
        try:
            # Find answer options near the question
            question_pos = question.get('position', (0, 0, 0, 0))
            
            # Look for radio buttons, checkboxes, or text inputs
            # This is a simplified version - in practice you'd want more sophisticated detection
            
            # For text inputs
            if "text" in response.lower() or len(response) > 20:
                # Find text input field
                text_input_pos = await self.find_text_input_near(question_pos)
                if text_input_pos:
                    await self.click_element_human_like(text_input_pos)
                    # Type response
                    if self.use_mouse_control:
                        pyautogui.typewrite(response, interval=0.1)
                    else:
                        await self.page.fill("input[type='text']", response)
            
            # For multiple choice
            else:
                # Find and click appropriate option
                option_pos = await self.find_answer_option(response)
                if option_pos:
                    await self.click_element_human_like(option_pos)
            
        except Exception as e:
            print(f"❌ Answer handling failed: {e}")

    async def find_text_input_near(self, question_pos: Tuple[int, int, int, int]) -> Optional[Tuple[int, int]]:
        """Find text input field near question position."""
        # Simplified - in practice you'd use more sophisticated detection
        x, y, w, h = question_pos
        return (x + w//2, y + h + 50)  # Below the question

    async def find_answer_option(self, response: str) -> Optional[Tuple[int, int]]:
        """Find answer option based on response."""
        # Use OCR to find matching text
        return await self.find_element_by_text(response[:20])

    async def navigate_next_page(self, analysis: Dict[str, Any]):
        """Navigate to next page or submit."""
        try:
            # Look for next/submit buttons
            buttons = analysis.get('elements', {}).get('buttons', [])
            
            for button in buttons:
                button_text = button.get('text', '').lower()
                if any(word in button_text for word in ['next', 'continue', 'submit']):
                    button_pos = button.get('position', (0, 0, 0, 0))
                    center_x = button_pos[0] + button_pos[2]//2
                    center_y = button_pos[1] + button_pos[3]//2
                    
                    await self.click_element_human_like((center_x, center_y))
                    print("⏭️ Clicked next/submit button")
                    return
            
            print("⚠️ No next button found")
            
        except Exception as e:
            print(f"❌ Navigation failed: {e}")

    async def run(self):
        """Main execution method."""
        try:
            # Setup browser
            if not await self.setup_browser():
                print("❌ Browser setup failed")
                return
            
            # Navigate to survey site
            survey_url = self.config.get('SURVEY_URL')
            if survey_url:
                await self.page.goto(survey_url)
                print(f"✅ Navigated to {survey_url}")
            
            # Run vision-based survey
            await self.run_vision_based_survey()
            
        except Exception as e:
            print(f"❌ Bot execution failed: {e}")
        finally:
            if self.browser:
                await self.browser.close()

    async def cleanup(self):
        """Cleanup resources."""
        if self.browser:
            await self.browser.close()
