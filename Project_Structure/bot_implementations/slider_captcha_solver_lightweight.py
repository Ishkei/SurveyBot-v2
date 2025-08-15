#!/usr/bin/env python3
"""
Lightweight Slider CAPTCHA Solver
Handles puzzle piece CAPTCHAs and traditional sliders
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
from PIL import Image
import io
import base64

class LightweightSliderCaptchaSolver:
    """Lightweight slider CAPTCHA solver using template matching"""

    def __init__(self, driver=None):
        self.driver = driver
        self.mouse = Controller()
        
        # Load configuration
        self.config = self._load_config()
        
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
            ".geetest_radar_btn",
            "[data-dd-slider]",
            ".dd-slider",
            ".slider-container",
            "input[type='range']",
            ".dd-range-slider",
            "[data-dd-action='slider']"
        ]
        
        self.captcha_containers = [
            ".geetest_fullpage_click_box",
            ".captcha-container",
            "[class*='captcha']",
            ".puzzle-container",
            ".slide-captcha-container",
            ".dd-captcha",
            "[data-dd-captcha]"
        ]
        
        # Puzzle piece specific selectors
        self.puzzle_selectors = [
            "[class*='puzzle']",
            "[class*='piece']",
            ".puzzle-piece",
            ".captcha-piece",
            "[data-puzzle-piece]",
            ".jigsaw-piece"
        ]

    def _load_config(self) -> dict:
        """Load configuration for the solver"""
        config_path = "Project_Structure/configs/slider_captcha_config.json"
        default_config = {
            "movement_scaling_factor": 1.0,
            "min_movement_distance": 50,
            "max_movement_distance": 400,
            "movement_duration": 2.0,
            "verification_wait_time": 3.0,
            "retry_attempts": 3,
            "api_timeout": 30,
            "debug_mode": False
        }
        
        try:
            if os.path.exists(config_path):
                with open(config_path, 'r') as f:
                    config = json.load(f)
                    default_config.update(config.get("slider_captcha", {}))
        except Exception as e:
            print(f"⚠️ Could not load config: {e}")
        
        return default_config

    def detect_slider_captcha(self) -> dict:
        """Detect slider CAPTCHA using multiple methods"""
        try:
            captcha_info = {
                "type": None,
                "slider_element": None,
                "captcha_image": None,
                "confidence": 0.0,
                "puzzle_piece": None,
                "target_position": None
            }
            
            # Method 1: Check for puzzle piece CAPTCHA first
            puzzle_info = self._detect_puzzle_piece_captcha()
            if puzzle_info["detected"]:
                captcha_info.update(puzzle_info)
                captcha_info["type"] = "puzzle_piece"
                captcha_info["confidence"] = 0.9
                print("🎯 Puzzle piece CAPTCHA detected")
                return captcha_info
            
            # Method 2: Check for traditional slider elements
            for selector in self.slider_selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        captcha_info["type"] = "slider"
                        captcha_info["slider_element"] = elements[0]
                        captcha_info["confidence"] = 0.8
                        print(f"🎯 Traditional slider CAPTCHA detected: {selector}")
                        return captcha_info
                except:
                    continue
            
            # Method 3: Check for CAPTCHA containers
            for selector in self.captcha_containers:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        captcha_info["type"] = "slider"
                        captcha_info["confidence"] = 0.6
                        print(f"🎯 CAPTCHA container detected: {selector}")
                        return captcha_info
                except:
                    continue
            
            # Method 4: Check iframes for CAPTCHA
            try:
                iframes = self.driver.find_elements(By.TAG_NAME, "iframe")
                for iframe in iframes:
                    try:
                        iframe_src = iframe.get_attribute("src")
                        if iframe_src and any(keyword in iframe_src.lower() for keyword in ["captcha", "geetest", "verify", "datadome"]):
                            captcha_info["type"] = "slider"
                            captcha_info["confidence"] = 0.7
                            print(f"🎯 Slider CAPTCHA detected in iframe: {iframe_src}")
                            return captcha_info
                    except:
                        continue
            except:
                pass
            
            # Method 5: Check page text for CAPTCHA indicators
            try:
                page_text = self.driver.page_source.lower()
                captcha_keywords = [
                    "slide to verify", "drag to verify", "move slider", 
                    "captcha verification", "complete the puzzle", "slide right",
                    "verification required", "puzzle piece", "jigsaw"
                ]
                
                for keyword in captcha_keywords:
                    if keyword in page_text:
                        captcha_info["type"] = "slider"
                        captcha_info["confidence"] = 0.5
                        print(f"🎯 CAPTCHA detected by keyword: {keyword}")
                        return captcha_info
            except:
                pass
            
            return captcha_info
            
        except Exception as e:
            print(f"❌ Error detecting slider CAPTCHA: {e}")
            return {"type": None, "slider_element": None, "captcha_image": None, "confidence": 0.0}

    def _detect_puzzle_piece_captcha(self) -> dict:
        """Detect puzzle piece CAPTCHA specifically"""
        try:
            puzzle_info = {
                "detected": False,
                "puzzle_piece": None,
                "target_position": None,
                "captcha_image": None
            }
            
            # Look for puzzle piece elements
            for selector in self.puzzle_selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        puzzle_info["puzzle_piece"] = elements[0]
                        puzzle_info["detected"] = True
                        print(f"🎯 Puzzle piece found: {selector}")
                        break
                except:
                    continue
            
            # Look for target position indicators
            target_selectors = [
                "[class*='target']",
                "[class*='destination']",
                "[class*='slot']",
                ".puzzle-target",
                ".target-area"
            ]
            
            for selector in target_selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        puzzle_info["target_position"] = elements[0]
                        print(f"🎯 Target position found: {selector}")
                        break
                except:
                    continue
            
            # Capture CAPTCHA image if puzzle detected
            if puzzle_info["detected"]:
                puzzle_info["captcha_image"] = self._capture_captcha_image()
            
            return puzzle_info
            
        except Exception as e:
            print(f"❌ Error detecting puzzle piece CAPTCHA: {e}")
            return {"detected": False, "puzzle_piece": None, "target_position": None, "captcha_image": None}

    def solve_slider_captcha(self, captcha_info: dict) -> bool:
        """Solve slider CAPTCHA using template matching"""
        try:
            if not captcha_info["type"]:
                print("❌ No slider CAPTCHA detected")
                return False
            
            print("🧩 Attempting to solve slider CAPTCHA...")
            
            # Try different solving methods in order of preference
            if captcha_info["type"] == "puzzle_piece":
                methods = [
                    self._solve_puzzle_piece_captcha,
                    self._solve_with_template_matching,
                    self._solve_with_api_service,
                    self._solve_manually
                ]
            else:
                methods = [
                    self._solve_with_template_matching,
                    self._solve_with_api_service,
                    self._solve_manually
                ]
            
            for method in methods:
                try:
                    if method(captcha_info):
                        return True
                except Exception as e:
                    print(f"⚠️ Method {method.__name__} failed: {e}")
                    continue
            
            print("❌ All solving methods failed")
            return False
            
        except Exception as e:
            print(f"❌ Error solving slider CAPTCHA: {e}")
            return False

    def _solve_puzzle_piece_captcha(self, captcha_info: dict) -> bool:
        """Solve puzzle piece CAPTCHA specifically"""
        try:
            print("🧩 Solving puzzle piece CAPTCHA...")
            
            puzzle_piece = captcha_info.get("puzzle_piece")
            target_position = captcha_info.get("target_position")
            
            if not puzzle_piece:
                print("❌ No puzzle piece element found")
                return False
            
            # Get puzzle piece location and size
            try:
                piece_location = puzzle_piece.location
                piece_size = puzzle_piece.size
                
                start_x = piece_location['x'] + piece_size['width'] / 2
                start_y = piece_location['y'] + piece_size['height'] / 2
                
                print(f"🎯 Puzzle piece at ({start_x}, {start_y})")
                
                # Calculate target position
                if target_position:
                    target_location = target_position.location
                    target_size = target_position.size
                    end_x = target_location['x'] + target_size['width'] / 2
                    end_y = target_location['y'] + target_size['height'] / 2
                else:
                    # Estimate target position (usually to the right)
                    end_x = start_x + random.uniform(200, 350)  # Typical puzzle piece distance
                    end_y = start_y + random.uniform(-10, 10)   # Slight vertical variation
                
                print(f"🎯 Target position at ({end_x}, {end_y})")
                
                # Execute puzzle piece movement
                return self._execute_puzzle_movement(start_x, start_y, end_x, end_y)
                
            except Exception as e:
                print(f"❌ Error getting puzzle piece position: {e}")
                return False
                
        except Exception as e:
            print(f"❌ Error solving puzzle piece CAPTCHA: {e}")
            return False

    def _execute_puzzle_movement(self, start_x: float, start_y: float, end_x: float, end_y: float) -> bool:
        """Execute human-like puzzle piece movement"""
        try:
            # Move mouse to puzzle piece
            self.mouse.position = (start_x, start_y)
            time.sleep(random.uniform(0.3, 0.7))
            
            # Click and hold
            self.mouse.press(Button.left)
            time.sleep(random.uniform(0.1, 0.3))
            
            # Calculate movement distance
            distance = math.sqrt((end_x - start_x) ** 2 + (end_y - start_y) ** 2)
            
            # Create human-like movement path
            steps = max(10, int(distance / 20))  # More steps for longer distances
            
            for i in range(1, steps + 1):
                # Use easing function for natural movement
                progress = i / steps
                ease_progress = self._ease_out_quad(progress)
                
                # Add slight randomness to path
                current_x = start_x + (end_x - start_x) * ease_progress + random.uniform(-2, 2)
                current_y = start_y + (end_y - start_y) * ease_progress + random.uniform(-1, 1)
                
                self.mouse.position = (current_x, current_y)
                time.sleep(random.uniform(0.05, 0.15))
            
            # Release mouse button
            self.mouse.release(Button.left)
            
            # Wait for verification
            time.sleep(self.config["verification_wait_time"])
            
            print("✅ Puzzle piece movement completed")
            return True
            
        except Exception as e:
            print(f"❌ Error executing puzzle movement: {e}")
            return False

    def _ease_out_quad(self, t: float) -> float:
        """Easing function for natural movement"""
        return t * (2 - t)

    def _solve_with_template_matching(self, captcha_info: dict) -> bool:
        """Solve using template matching and image processing"""
        try:
            print("🔍 Using template matching method...")
            
            # Capture the CAPTCHA area
            captcha_image = self._capture_captcha_image()
            if captcha_image is None:
                return False
            
            # Find puzzle pieces using edge detection
            puzzle_positions = self._find_puzzle_pieces(captcha_image)
            if not puzzle_positions:
                print("❌ Could not find puzzle pieces")
                return False
            
            # Calculate movement distance
            distance = self._calculate_movement_distance(puzzle_positions)
            if distance <= 0:
                print("❌ Invalid movement distance")
                return False
            
            # Execute the movement
            return self._execute_slider_movement(distance)
            
        except Exception as e:
            print(f"❌ Template matching failed: {e}")
            return False

    def _capture_captcha_image(self) -> np.ndarray:
        """Capture CAPTCHA image from the page"""
        try:
            # Look for CAPTCHA canvas or image elements
            captcha_selectors = [
                ".geetest_fullpage_click_box",
                ".captcha-canvas",
                "canvas",
                "[class*='captcha'] img",
                "[class*='puzzle'] img",
                ".puzzle-container",
                ".captcha-container"
            ]
            
            for selector in captcha_selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        element = elements[0]
                        # Take screenshot of the element
                        screenshot = element.screenshot_as_png
                        # Convert to numpy array
                        nparr = np.frombuffer(screenshot, np.uint8)
                        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                        print(f"✅ Captured CAPTCHA image using selector: {selector}")
                        return img
                except:
                    continue
            
            # Fallback: capture entire page
            screenshot = self.driver.get_screenshot_as_png()
            nparr = np.frombuffer(screenshot, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            print("✅ Captured full page screenshot")
            return img
            
        except Exception as e:
            print(f"❌ Error capturing CAPTCHA image: {e}")
            return None

    def _find_puzzle_pieces(self, image: np.ndarray) -> list:
        """Find puzzle pieces using edge detection and contour analysis"""
        try:
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Apply edge detection
            edges = cv2.Canny(gray, 50, 150)
            
            # Find contours
            contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            # Filter contours by size and shape
            puzzle_pieces = []
            for contour in contours:
                area = cv2.contourArea(contour)
                if 100 < area < 10000:  # Reasonable size for puzzle pieces
                    x, y, w, h = cv2.boundingRect(contour)
                    aspect_ratio = w / h
                    if 0.5 < aspect_ratio < 2.0:  # Reasonable aspect ratio
                        puzzle_pieces.append((x, y, w, h))
            
            # Sort by x-coordinate to get left and right pieces
            puzzle_pieces.sort(key=lambda x: x[0])
            
            if len(puzzle_pieces) >= 2:
                print(f"✅ Found {len(puzzle_pieces)} potential puzzle pieces")
                return puzzle_pieces[:2]  # Return first two pieces
            
            return []
            
        except Exception as e:
            print(f"❌ Error finding puzzle pieces: {e}")
            return []

    def _calculate_movement_distance(self, puzzle_positions: list) -> float:
        """Calculate the distance to move the slider"""
        try:
            if len(puzzle_positions) < 2:
                return 0.0
            
            # Get the leftmost and rightmost pieces
            left_piece = puzzle_positions[0]
            right_piece = puzzle_positions[-1]
            
            # Calculate horizontal distance
            distance = (right_piece[0] - left_piece[0]) * self.config["movement_scaling_factor"]
            
            print(f"✅ Calculated movement distance: {distance:.2f}px")
            return distance
            
        except Exception as e:
            print(f"❌ Error calculating movement distance: {e}")
            return 0.0

    def _execute_slider_movement(self, distance: float) -> bool:
        """Execute human-like slider movement"""
        try:
            # Find the slider button
            slider_selectors = [
                ".geetest_slider_button",
                ".slider-button",
                "[class*='slider']",
                "button[class*='captcha']"
            ]
            
            slider_element = None
            for selector in slider_selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        slider_element = elements[0]
                        break
                except:
                    continue
            
            if not slider_element:
                print("❌ Could not find slider button")
                return False
            
            # Get slider position
            location = slider_element.location
            size = slider_element.size
            
            # Calculate start position (center of slider)
            start_x = location['x'] + size['width'] / 2
            start_y = location['y'] + size['height'] / 2
            
            print(f"✅ Located slider at ({start_x}, {start_y})")
            
            # Move mouse to slider and click
            self.mouse.position = (start_x, start_y)
            time.sleep(random.uniform(0.5, 1.0))
            self.mouse.press(Button.left)
            
            # Calculate movement steps using geometric progression
            steps = self._calculate_movement_steps(distance)
            
            # Execute movement
            current_x = start_x
            for step in steps:
                current_x += step
                self.mouse.position = (current_x, start_y)
                time.sleep(random.uniform(0.05, 0.1))
            
            # Release mouse button
            self.mouse.release(Button.left)
            
            # Wait for verification
            time.sleep(random.uniform(3, 5))
            
            print("✅ Slider movement completed")
            return True
            
        except Exception as e:
            print(f"❌ Error executing slider movement: {e}")
            return False

    def _calculate_movement_steps(self, distance: float) -> list:
        """Calculate movement steps using geometric progression for human-like movement"""
        try:
            # Use geometric progression for natural movement
            # Faster at start, slower at end
            steps = []
            remaining = distance
            factor = 0.8  # Deceleration factor
            
            while remaining > 1:
                step = min(remaining, random.uniform(5, 15))
                steps.append(step)
                remaining -= step
                factor *= 0.95  # Gradually slow down
            
            # Add final small steps
            while remaining > 0:
                step = min(remaining, random.uniform(1, 3))
                steps.append(step)
                remaining -= step
            
            return steps
            
        except Exception as e:
            print(f"❌ Error calculating movement steps: {e}")
            return [distance]  # Fallback to single step

    def _solve_with_api_service(self, captcha_info: dict) -> bool:
        """Solve using external API service"""
        try:
            print("🌐 Using API service method...")
            
            # This would integrate with services like 2captcha, anti-captcha, etc.
            # For now, return False to try other methods
            print("⚠️ API service not configured")
            return False
            
        except Exception as e:
            print(f"❌ API service failed: {e}")
            return False

    def _solve_manually(self, captcha_info: dict) -> bool:
        """Manual fallback method"""
        try:
            print("👤 Using manual fallback method...")
            
            # Simple random movement as last resort
            distance = random.uniform(200, 350)
            return self._execute_slider_movement(distance)
            
        except Exception as e:
            print(f"❌ Manual method failed: {e}")
            return False
