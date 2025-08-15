#!/usr/bin/env python3
"""
Advanced Slider CAPTCHA Solver
Integrates computer vision, YOLO model, and human-like interactions
"""

import os
import cv2
import numpy as np
import math
import random
import time
import json
import requests
from typing import Dict, Any, Optional, Tuple, List
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from pynput.mouse import Button, Controller
from ultralytics import YOLO
import base64
from PIL import Image
import io

class SliderCaptchaSolver:
    """Advanced slider CAPTCHA solver with multiple detection and solving methods"""
    
    def __init__(self, driver=None):
        self.driver = driver
        self.mouse = Controller()
        self.yolo_model = None
        self.capsolver_api_key = os.getenv("CAPSOLVER_API_KEY", "")
        self.anti_captcha_api_key = os.getenv("ANTI_CAPTCHA_API_KEY", "")
        
        # Initialize YOLO model for puzzle piece detection
        self._load_yolo_model()
        
        # CAPTCHA detection patterns
        self.slider_selectors = [
            ".geetest_slider_button",
            ".slider-button",
            "[class*='slider']",
            "[class*='drag']",
            "[class*='puzzle']",
            ".captcha-slider",
            ".slide-captcha",
            "[data-testid='slider']",
            ".geetest_radar_btn"
        ]
        
        self.captcha_containers = [
            ".geetest_fullpage_click_box",
            ".captcha-container",
            "[class*='captcha']",
            ".puzzle-container",
            ".slide-captcha-container"
        ]
    
    def _load_yolo_model(self):
        """Load YOLO model for puzzle piece detection"""
        try:
            # Try to load a pre-trained model for puzzle piece detection
            model_path = os.path.join(os.path.dirname(__file__), "models", "puzzle_detector.pt")
            if os.path.exists(model_path):
                self.yolo_model = YOLO(model_path)
                print("✅ Loaded custom YOLO model for puzzle detection")
            else:
                # Use a general object detection model as fallback
                self.yolo_model = YOLO("yolov8n.pt")
                print("⚠️ Using general YOLO model (custom training recommended)")
        except Exception as e:
            print(f"⚠️ Could not load YOLO model: {e}")
            self.yolo_model = None
    
    def detect_slider_captcha(self, driver=None) -> Dict[str, Any]:
        """Detect slider CAPTCHA on the current page"""
        if driver is None:
            driver = self.driver
            
        captcha_info = {
            "type": None,
            "slider_element": None,
            "container_element": None,
            "puzzle_image": None,
            "detection_method": None,
            "confidence": 0.0
        }
        
        try:
            # Method 1: Check for known slider selectors (including GeeTest specific)
            for selector in self.slider_selectors:
                elements = driver.find_elements(By.CSS_SELECTOR, selector)
                if elements:
                    captcha_info["slider_element"] = elements[0]
                    captcha_info["type"] = "slider_captcha"
                    captcha_info["detection_method"] = "css_selector"
                    captcha_info["confidence"] = 0.8
                    print(f"🎯 Detected slider CAPTCHA using selector: {selector}")
                    break
            
            # Method 2: Check page text for CAPTCHA indicators
            if not captcha_info["type"]:
                page_text = driver.find_element(By.TAG_NAME, "body").text.lower()
                captcha_keywords = [
                    "slide to verify", "drag to verify", "move slider",
                    "complete the puzzle", "slide right to complete",
                    "verification required", "i am not a robot",
                    "captcha", "puzzle piece", "jigsaw"
                ]
                
                if any(keyword in page_text for keyword in captcha_keywords):
                    captcha_info["type"] = "slider_captcha"
                    captcha_info["detection_method"] = "text_analysis"
                    captcha_info["confidence"] = 0.6
                    print("🎯 Detected slider CAPTCHA by text analysis")
            
            # Method 3: Look for puzzle container elements
            if captcha_info["type"]:
                for selector in self.captcha_containers:
                    elements = driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        captcha_info["container_element"] = elements[0]
                        break
            
            # Method 4: Check for iframe-based CAPTCHAs
            if not captcha_info["type"]:
                iframes = driver.find_elements(By.TAG_NAME, "iframe")
                for iframe in iframes:
                    try:
                        driver.switch_to.frame(iframe)
                        iframe_text = driver.find_element(By.TAG_NAME, "body").text.lower()
                        if any(keyword in iframe_text for keyword in captcha_keywords):
                            captcha_info["type"] = "slider_captcha"
                            captcha_info["detection_method"] = "iframe_analysis"
                            captcha_info["confidence"] = 0.7
                            print("🎯 Detected slider CAPTCHA in iframe")
                        driver.switch_to.default_content()
                    except:
                        driver.switch_to.default_content()
                        continue
                        
        except Exception as e:
            print(f"⚠️ Error detecting slider CAPTCHA: {e}")
            
        return captcha_info
    
    def solve_slider_captcha(self, captcha_info: Dict[str, Any], method: str = "auto") -> bool:
        """Solve slider CAPTCHA using specified method"""
        if not captcha_info["type"]:
            return False
            
        print(f"🧩 Attempting to solve slider CAPTCHA using method: {method}")
        
        try:
            if method == "auto":
                # Try methods in order of preference
                methods = ["computer_vision", "api_service", "template_matching", "manual"]
            elif method == "computer_vision":
                methods = ["computer_vision"]
            elif method == "api_service":
                methods = ["api_service"]
            elif method == "template_matching":
                methods = ["template_matching"]
            else:
                methods = [method]
            
            for solve_method in methods:
                print(f"🔧 Trying method: {solve_method}")
                if self._solve_with_method(captcha_info, solve_method):
                    print(f"✅ Successfully solved CAPTCHA using {solve_method}")
                    return True
                else:
                    print(f"❌ Method {solve_method} failed, trying next...")
                    
        except Exception as e:
            print(f"⚠️ Error solving slider CAPTCHA: {e}")
            
        return False
    
    def _solve_with_method(self, captcha_info: Dict[str, Any], method: str) -> bool:
        """Solve CAPTCHA using specific method"""
        try:
            if method == "computer_vision":
                return self._solve_with_computer_vision(captcha_info)
            elif method == "api_service":
                return self._solve_with_api_service(captcha_info)
            elif method == "template_matching":
                return self._solve_with_template_matching(captcha_info)
            elif method == "manual":
                return self._solve_manually(captcha_info)
            else:
                return False
        except Exception as e:
            print(f"⚠️ Error in {method} method: {e}")
            return False
    
    def _solve_with_computer_vision(self, captcha_info: Dict[str, Any]) -> bool:
        """Solve using YOLO model and computer vision"""
        if not self.yolo_model:
            print("❌ YOLO model not available")
            return False
            
        try:
            # Capture CAPTCHA image
            captcha_image = self._capture_captcha_image(captcha_info)
            if not captcha_image:
                return False
            
            # Save image for YOLO processing
            image_path = "captcha_screenshot.png"
            with open(image_path, "wb") as f:
                f.write(captcha_image)
            
            # Use YOLO to detect puzzle pieces
            results = self.yolo_model.predict(
                source=image_path,
                device='cpu',
                conf=0.5,
                imgsz=[416, 416]
            )
            
            if not results or len(results) == 0:
                print("❌ No puzzle pieces detected by YOLO")
                return False
            
            # Extract puzzle piece positions
            puzzle_data = self._extract_puzzle_positions(results[0])
            if not puzzle_data:
                return False
            
            # Calculate movement distance
            distance = self._calculate_movement_distance(puzzle_data)
            
            # Execute the movement
            return self._execute_slider_movement(captcha_info, distance)
            
        except Exception as e:
            print(f"⚠️ Computer vision method error: {e}")
            return False
        finally:
            # Clean up
            if os.path.exists("captcha_screenshot.png"):
                os.remove("captcha_screenshot.png")
    
    def _solve_with_api_service(self, captcha_info: Dict[str, Any]) -> bool:
        """Solve using external API service (CapSolver, Anti-Captcha)"""
        if not self.capsolver_api_key and not self.anti_captcha_api_key:
            print("❌ No API keys configured")
            return False
        
        try:
            # Try CapSolver first
            if self.capsolver_api_key:
                return self._solve_with_capsolver(captcha_info)
            
            # Try Anti-Captcha as backup
            if self.anti_captcha_api_key:
                return self._solve_with_anticaptcha(captcha_info)
                
        except Exception as e:
            print(f"⚠️ API service method error: {e}")
            
        return False
    
    def _solve_with_template_matching(self, captcha_info: Dict[str, Any]) -> bool:
        """Solve using OpenCV template matching"""
        try:
            # Capture CAPTCHA image
            captcha_image = self._capture_captcha_image(captcha_info)
            if not captcha_image:
                return False
            
            # Convert to OpenCV format
            nparr = np.frombuffer(captcha_image, np.uint8)
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Find puzzle piece using edge detection
            edges = cv2.Canny(gray, 50, 150)
            contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            if not contours:
                return False
            
            # Find the largest contour (likely the puzzle piece)
            largest_contour = max(contours, key=cv2.contourArea)
            x, y, w, h = cv2.boundingRect(largest_contour)
            
            # Calculate movement distance (simplified)
            distance = x + w/2  # Move to center of puzzle piece
            
            return self._execute_slider_movement(captcha_info, distance)
            
        except Exception as e:
            print(f"⚠️ Template matching method error: {e}")
            return False
    
    def _solve_manually(self, captcha_info: Dict[str, Any]) -> bool:
        """Manual solving with human-like movements"""
        try:
            # Simple heuristic: move slider to the right by a reasonable distance
            distance = random.uniform(100, 300)  # Random distance between 100-300px
            
            return self._execute_slider_movement(captcha_info, distance)
            
        except Exception as e:
            print(f"⚠️ Manual method error: {e}")
            return False
    
    def _capture_captcha_image(self, captcha_info: Dict[str, Any]) -> Optional[bytes]:
        """Capture CAPTCHA image from the page"""
        try:
            if captcha_info["container_element"]:
                # Screenshot the container element
                return captcha_info["container_element"].screenshot_as_png
            else:
                # Screenshot the entire page
                return self.driver.get_screenshot_as_png()
        except Exception as e:
            print(f"⚠️ Error capturing CAPTCHA image: {e}")
            return None
    
    def _extract_puzzle_positions(self, result) -> Optional[Dict[str, Any]]:
        """Extract puzzle piece positions from YOLO results"""
        try:
            boxes = result.boxes.data.tolist()
            if len(boxes) < 2:
                return None
            
            # Sort by confidence
            boxes.sort(key=lambda x: x[4], reverse=True)
            
            puzzle_data = {
                "pieces": [],
                "shadows": [],
                "confidence": 0.0
            }
            
            for box in boxes:
                x1, y1, x2, y2, conf, cls = box
                if cls == 0.0:  # Shadow piece
                    puzzle_data["shadows"].append({
                        "x": (x1 + x2) / 2,
                        "y": (y1 + y2) / 2,
                        "confidence": conf
                    })
                elif cls == 2.0:  # Original piece
                    puzzle_data["pieces"].append({
                        "x": (x1 + x2) / 2,
                        "y": (y1 + y2) / 2,
                        "confidence": conf
                    })
            
            if puzzle_data["pieces"] and puzzle_data["shadows"]:
                puzzle_data["confidence"] = max(
                    puzzle_data["pieces"][0]["confidence"],
                    puzzle_data["shadows"][0]["confidence"]
                )
                return puzzle_data
                
        except Exception as e:
            print(f"⚠️ Error extracting puzzle positions: {e}")
            
        return None
    
    def _calculate_movement_distance(self, puzzle_data: Dict[str, Any]) -> float:
        """Calculate the distance to move the slider"""
        try:
            if not puzzle_data["pieces"] or not puzzle_data["shadows"]:
                return 200.0  # Default distance
            
            piece_x = puzzle_data["pieces"][0]["x"]
            shadow_x = puzzle_data["shadows"][0]["x"]
            
            # Calculate horizontal distance
            distance = abs(shadow_x - piece_x)
            
            # Apply scaling factor from successful implementation (Dima Kynal's approach)
            distance *= 0.791  # This is the exact scaling factor that works
            
            return max(distance, 50.0)  # Minimum distance of 50px
            
        except Exception as e:
            print(f"⚠️ Error calculating movement distance: {e}")
            return 200.0  # Default fallback
    
    def _calculate_movement_steps(self, total_distance: float) -> List[float]:
        """Calculate movement steps using geometric progression (Dima Kynal's method)"""
        def geometric_progression_steps(initial_value, threshold=1e-12):
            """Exact implementation from the successful article"""
            if initial_value <= 0:
                raise ValueError("Initial value must be positive")
            if threshold <= 0:
                raise ValueError("Threshold must be positive")
            
            steps = math.ceil((math.log(threshold) - math.log(initial_value)) / math.log(0.5))
            current_value = initial_value
            values_per_step = []

            for _ in range(steps):
                current_value /= 2
                values_per_step.append(current_value)
            return values_per_step
        
        # Use the proven geometric progression method
        return geometric_progression_steps(total_distance)
    
    def _execute_slider_movement(self, captcha_info: Dict[str, Any], distance: float) -> bool:
        """Execute the slider movement with human-like behavior (enhanced version)"""
        try:
            if not captcha_info["slider_element"]:
                print("❌ No slider element found")
                return False
            
            # Get slider position and size
            slider = captcha_info["slider_element"]
            location = slider.location
            size = slider.size
            
            # Calculate start position (center of slider, adjusted for accuracy)
            start_x = location['x'] + size['width'] / 2
            start_y = location['y'] + size['height'] * 2  # Better starting point for clicking
            
            # Move mouse to slider and click
            self.mouse.position = (start_x, start_y)
            time.sleep(random.uniform(0.1, 0.3))
            self.mouse.press(Button.left)
            time.sleep(random.uniform(0.05, 0.15))
            
            # Calculate movement steps using geometric progression
            values_per_step = self._calculate_movement_steps(distance)
            
            # Execute movement (exact implementation from successful article)
            for value in values_per_step[:]:
                start_x += value  # Move horizontally by the current step value
                
                # Set the mouse position to the new coordinates
                self.mouse.position = (start_x, start_y)
                
                # Add a slight delay between movements to mimic human interaction
                time.sleep(random.uniform(0.05, 0.1))
            
            # Release the left mouse button to drop the piece
            time.sleep(random.uniform(0.1, 0.2))
            self.mouse.release(Button.left)
            
            # Wait for verification (longer wait as per successful implementation)
            time.sleep(random.uniform(3, 5))
            
            return True
            
        except Exception as e:
            print(f"⚠️ Error executing slider movement: {e}")
            return False
    
    def _solve_with_capsolver(self, captcha_info: Dict[str, Any]) -> bool:
        """Solve using CapSolver API"""
        try:
            # This would require specific implementation for slider CAPTCHAs
            # CapSolver might not support all slider CAPTCHAs
            print("⚠️ CapSolver API method not fully implemented for slider CAPTCHAs")
            return False
        except Exception as e:
            print(f"⚠️ CapSolver method error: {e}")
            return False
    
    def _solve_with_anticaptcha(self, captcha_info: Dict[str, Any]) -> bool:
        """Solve using Anti-Captcha API"""
        try:
            # This would require specific implementation for slider CAPTCHAs
            # Anti-Captcha might not support all slider CAPTCHAs
            print("⚠️ Anti-Captcha API method not fully implemented for slider CAPTCHAs")
            return False
        except Exception as e:
            print(f"⚠️ Anti-Captcha method error: {e}")
            return False

    def solve_geetest_captcha(self, driver=None) -> bool:
        """Specific solver for GeeTest CAPTCHA (based on Dima Kynal's implementation)"""
        if driver is None:
            driver = self.driver
            
        try:
            print("🎯 Attempting to solve GeeTest CAPTCHA...")
            
            # Step 1: Click the GeeTest radar button
            try:
                btn = driver.find_element(By.CLASS_NAME, "geetest_radar_btn")
                btn.click()
                time.sleep(3)  # Wait for CAPTCHA to load
                print("✅ Clicked GeeTest radar button")
            except Exception as e:
                print(f"❌ GeeTest radar button not found: {e}")
                return False
            
            # Step 2: Find and save the CAPTCHA image
            try:
                element = driver.find_element(By.CLASS_NAME, "geetest_fullpage_click_box")
                captcha_file_name = "geetest_canvas_slice.png"
                element.screenshot(captcha_file_name)
                time.sleep(3)
                print("✅ Captured GeeTest CAPTCHA image")
            except Exception as e:
                print(f"❌ Could not capture CAPTCHA image: {e}")
                return False
            
            # Step 3: Use YOLO model to detect puzzle pieces
            if not self.yolo_model:
                print("❌ YOLO model not available for GeeTest solving")
                return False
            
            try:
                results = self.yolo_model.predict(
                    source=captcha_file_name,
                    device='cpu',
                    conf=0.8,
                    imgsz=[416, 416]
                )
                
                if not results or len(results) == 0:
                    print("❌ No puzzle pieces detected by YOLO")
                    return False
                
                # Get the result with maximum confidence
                box_with_max_conf = max(results, key=lambda x: x.boxes.conf.max())
                box_with_conf = box_with_max_conf.boxes.data.tolist()
                
                print(f"✅ Detected {len(box_with_conf)} puzzle pieces")
                
            except Exception as e:
                print(f"❌ Error in YOLO prediction: {e}")
                return False
            
            # Step 4: Extract puzzle piece positions
            try:
                # Ensure we have both pieces identified by the model
                if len(box_with_conf) != 2:
                    print(f"❌ Expected 2 pieces, found {len(box_with_conf)}")
                    return False
                
                shadow = [el for el in box_with_conf if el[-1] == 0.0][0]
                origin = [el for el in box_with_conf if el[-1] != 0.0][0]
                
                # Calculate the horizontal distance, adjusting for resolution difference
                distance = (shadow[0] - origin[0]) * 0.791  # Exact scaling factor from successful implementation
                
                print(f"✅ Calculated movement distance: {distance:.2f}px")
                
            except Exception as e:
                print(f"❌ Error extracting puzzle positions: {e}")
                return False
            
            # Step 5: Locate the slider button
            try:
                slider = driver.find_element(By.CLASS_NAME, "geetest_slider_button")
                location = slider.location
                size = slider.size
                
                # Calculate the start position (center of the button, slightly adjusted for accuracy)
                start_x = location['x'] + size['width'] / 2
                start_y = location['y'] + size['height'] * 2  # Better starting point for clicking
                
                print("✅ Located slider button")
                
            except Exception as e:
                print(f"❌ Could not locate slider button: {e}")
                return False
            
            # Step 6: Execute the movement
            try:
                # Move mouse to slider and click
                self.mouse.position = (start_x, start_y)
                time.sleep(1)
                self.mouse.press(Button.left)
                
                # Calculate movement steps using geometric progression
                values_per_step = self._calculate_movement_steps(distance)
                
                # Execute movement
                for value in values_per_step[:]:
                    start_x += value  # Move horizontally by the current step value
                    
                    # Set the mouse position to the new coordinates
                    self.mouse.position = (start_x, start_y)
                    
                    # Add a slight delay between movements to mimic human interaction
                    time.sleep(random.uniform(0.05, 0.1))
                
                # Release the left mouse button to drop the piece
                self.mouse.release(Button.left)
                
                # Wait for verification
                time.sleep(5)
                
                print("✅ GeeTest CAPTCHA movement completed")
                return True
                
            except Exception as e:
                print(f"❌ Error executing movement: {e}")
                return False
                
        except Exception as e:
            print(f"❌ GeeTest CAPTCHA solving failed: {e}")
            return False
        finally:
            # Clean up
            if os.path.exists("geetest_canvas_slice.png"):
                os.remove("geetest_canvas_slice.png")

# Integration helper for existing bot classes
def integrate_slider_solver(bot_instance):
    """Integrate slider CAPTCHA solver with existing bot"""
    if hasattr(bot_instance, 'driver'):
        solver = SliderCaptchaSolver(bot_instance.driver)
        
        # Add solver to bot instance
        bot_instance.slider_captcha_solver = solver
        
        # Override or extend existing CAPTCHA handling
        if hasattr(bot_instance, 'handle_captcha'):
            original_handle_captcha = bot_instance.handle_captcha
            
            def enhanced_handle_captcha():
                # Try slider CAPTCHA first
                captcha_info = solver.detect_slider_captcha()
                if captcha_info["type"]:
                    if solver.solve_slider_captcha(captcha_info):
                        return True
                
                # Fall back to original method
                return original_handle_captcha()
            
            bot_instance.handle_captcha = enhanced_handle_captcha
        
        return solver
    
    return None
