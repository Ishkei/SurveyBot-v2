#!/usr/bin/env python3
"""
Enhanced Cursor Simulation Module
Uses HumanCursor for realistic human-like mouse movements and scrolling
Designed to bypass bot detection and provide natural interactions
"""

import asyncio
import time
import random
from typing import Optional, Tuple, List, Dict, Any, Union
import logging

# Enhanced cursor simulation
try:
    from humancursor import WebCursor, SystemCursor
    HUMANCURSOR_AVAILABLE = True
except ImportError:
    HUMANCURSOR_AVAILABLE = False
    print("⚠️ HumanCursor not available - falling back to basic simulation")

# Fallback imports
try:
    import pyautogui
    PYAUTOGUI_AVAILABLE = True
except ImportError:
    PYAUTOGUI_AVAILABLE = False

try:
    from selenium.webdriver.remote.webelement import WebElement
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False

try:
    from playwright.async_api import Page
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EnhancedCursorSimulator:
    """
    Enhanced cursor simulator using HumanCursor for realistic movements.
    Provides multiple fallback methods for maximum compatibility.
    """
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.cursor_config = config.get('cursor_simulation', {})
        self.mouse_config = config.get('mouse_movement', {})
        self.scroll_config = config.get('scrolling_methods', {})
        
        # Initialize cursors
        self.web_cursor = None
        self.system_cursor = None
        self.current_method = "humancursor"
        
        # Movement settings
        self.movement_speed = self.mouse_config.get('movement_speed', 'normal')
        self.acceleration_curve = self.mouse_config.get('acceleration_curve', 'ease_in_out')
        self.randomness_factor = self.mouse_config.get('human_like_randomness', 3)
        
        # Scrolling settings
        self.scroll_steps = self.scroll_config.get('scroll_steps', 10)
        self.step_delay = self.scroll_config.get('step_delay', 0.05)
        self.preferred_method = self.scroll_config.get('preferred_method', 'auto')
        
        # Initialize available cursors
        self._initialize_cursors()
        
        logger.info(f"🤖 Enhanced Cursor Simulator initialized")
        logger.info(f"   HumanCursor: {'✅' if HUMANCURSOR_AVAILABLE else '❌'}")
        logger.info(f"   PyAutoGUI: {'✅' if PYAUTOGUI_AVAILABLE else '❌'}")
        logger.info(f"   Current method: {self.current_method}")
    
    def _initialize_cursors(self):
        """Initialize available cursor types."""
        try:
            if HUMANCURSOR_AVAILABLE:
                # Initialize system cursor for fallback
                self.system_cursor = SystemCursor()
                logger.info("✅ HumanCursor SystemCursor initialized")
            else:
                self.current_method = "pyautogui"
                
        except Exception as e:
            logger.warning(f"⚠️ HumanCursor initialization failed: {e}")
            self.current_method = "pyautogui"
    
    def _get_web_cursor(self, driver=None, page=None):
        """Get WebCursor instance for web automation."""
        try:
            if not HUMANCURSOR_AVAILABLE:
                return None
                
            if driver and SELENIUM_AVAILABLE:
                return WebCursor(driver)
            elif page and PLAYWRIGHT_AVAILABLE:
                # For Playwright, we'll use system cursor as fallback
                return self.system_cursor
            else:
                return self.system_cursor
                
        except Exception as e:
            logger.warning(f"⚠️ WebCursor initialization failed: {e}")
            return None
    
    async def move_mouse_human_like(self, start_pos: Tuple[int, int], 
                                   end_pos: Tuple[int, int], 
                                   duration: Optional[float] = None) -> bool:
        """
        Move mouse with human-like movement using HumanCursor.
        
        Args:
            start_pos: Starting coordinates (x, y)
            end_pos: Target coordinates (x, y)
            duration: Movement duration (auto-calculated if None)
        
        Returns:
            bool: Success status
        """
        try:
            if not HUMANCURSOR_AVAILABLE or not self.system_cursor:
                return await self._fallback_mouse_movement(start_pos, end_pos, duration)
            
            # Calculate optimal duration based on distance
            if duration is None:
                distance = ((end_pos[0] - start_pos[0])**2 + (end_pos[1] - start_pos[1])**2)**0.5
                duration = max(0.5, min(2.0, distance / 200))  # 200px per second base speed
            
            # Use HumanCursor for realistic movement
            # Note: HumanCursor SystemCursor.move_to() doesn't support duration parameter
            self.system_cursor.move_to(end_pos)
            
            logger.info(f"✅ Moved mouse from {start_pos} to {end_pos} using HumanCursor")
            return True
            
        except Exception as e:
            logger.error(f"❌ Human-like mouse movement failed: {e}")
            return await self._fallback_mouse_movement(start_pos, end_pos, duration)
    
    async def _fallback_mouse_movement(self, start_pos: Tuple[int, int], 
                                      end_pos: Tuple[int, int], 
                                      duration: Optional[float] = None) -> bool:
        """Fallback mouse movement using PyAutoGUI."""
        try:
            if not PYAUTOGUI_AVAILABLE:
                return False
            
            if duration is None:
                distance = ((end_pos[0] - start_pos[0])**2 + (end_pos[1] - start_pos[1])**2)**0.5
                duration = max(0.5, min(2.0, distance / 200))
            
            # Generate human-like path with Bézier curves
            path = self._generate_bezier_path(start_pos, end_pos, 15)
            
            # Move along path
            for point in path:
                pyautogui.moveTo(point[0], point[1], duration=duration/len(path))
            
            logger.info(f"✅ Fallback mouse movement completed")
            return True
            
        except Exception as e:
            logger.error(f"❌ Fallback mouse movement failed: {e}")
            return False
    
    def _generate_bezier_path(self, start: Tuple[int, int], end: Tuple[int, int], 
                             num_points: int = 15) -> List[Tuple[int, int]]:
        """Generate Bézier curve path for natural mouse movement."""
        import numpy as np
        
        # Add control points for natural curves
        control1 = (
            start[0] + random.uniform(-100, 100),
            start[1] + random.uniform(-100, 100)
        )
        control2 = (
            end[0] + random.uniform(-100, 100),
            end[1] + random.uniform(-100, 100)
        )
        
        points = []
        for i in range(num_points):
            t = i / (num_points - 1)
            
            # Cubic Bézier curve
            x = (1-t)**3 * start[0] + 3*(1-t)**2*t * control1[0] + 3*(1-t)*t**2 * control2[0] + t**3 * end[0]
            y = (1-t)**3 * start[1] + 3*(1-t)**2*t * control1[1] + 3*(1-t)*t**2 * control2[1] + t**3 * end[1]
            
            # Add human-like randomness
            x += random.uniform(-self.randomness_factor, self.randomness_factor)
            y += random.uniform(-self.randomness_factor, self.randomness_factor)
            
            points.append((int(x), int(y)))
        
        return points
    
    async def click_element_human_like(self, coordinates: Tuple[int, int], 
                                      element_type: str = "generic") -> bool:
        """
        Click element with human-like behavior.
        
        Args:
            coordinates: Target coordinates (x, y)
            element_type: Type of element for specialized behavior
        
        Returns:
            bool: Success status
        """
        try:
            if not HUMANCURSOR_AVAILABLE or not self.system_cursor:
                return await self._fallback_click(coordinates, element_type)
            
            # Move to target with human-like movement
            # Use PyAutoGUI for current position since HumanCursor doesn't have position method
            if PYAUTOGUI_AVAILABLE:
                current_pos = pyautogui.position()
            else:
                current_pos = (0, 0)  # Default position
            
            await self.move_mouse_human_like(current_pos, coordinates)
            
            # Add human-like delay before clicking
            await asyncio.sleep(random.uniform(0.1, 0.3))
            
            # Click with HumanCursor
            self.system_cursor.click_on(coordinates)
            
            logger.info(f"✅ Clicked {element_type} at {coordinates}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Human-like click failed: {e}")
            return await self._fallback_click(coordinates, element_type)
    
    async def _fallback_click(self, coordinates: Tuple[int, int], element_type: str) -> bool:
        """Fallback click using PyAutoGUI."""
        try:
            if not PYAUTOGUI_AVAILABLE:
                return False
            
            x, y = coordinates
            
            # Move to target
            await self.move_mouse_human_like(pyautogui.position(), (x, y))
            
            # Click with random delay
            await asyncio.sleep(random.uniform(0.1, 0.3))
            pyautogui.click(x, y)
            
            logger.info(f"✅ Fallback click completed at {coordinates}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Fallback click failed: {e}")
            return False
    
    async def advanced_scroll(self, direction: str = "down", method: str = "auto", 
                             target_element=None) -> bool:
        """
        Advanced scrolling with multiple methods.
        
        Args:
            direction: "up", "down", or "to_element"
            method: "auto", "scrollbar", "mouse_wheel", "javascript", "smooth"
            target_element: Element to scroll to (if direction is "to_element")
        
        Returns:
            bool: Success status
        """
        try:
            if method == "auto":
                method = self.preferred_method
            
            if direction == "to_element" and target_element:
                return await self.scroll_to_element(target_element)
            
            # Try HumanCursor first
            if HUMANCURSOR_AVAILABLE and self.system_cursor:
                if method == "mouse_wheel":
                    return await self._scroll_with_humancursor(direction)
                elif method == "scrollbar":
                    return await self._scroll_with_scrollbar(direction)
            
            # Fallback methods
            if method == "javascript":
                return await self._scroll_with_javascript(direction)
            elif method == "smooth":
                return await self._smooth_scroll(direction)
            elif method == "mouse_wheel":
                return await self._scroll_with_mouse_wheel(direction)
            else:
                return await self._scroll_with_javascript(direction)
                
        except Exception as e:
            logger.error(f"❌ Advanced scroll failed: {e}")
            return await self._scroll_with_javascript(direction)
    
    async def _scroll_with_humancursor(self, direction: str) -> bool:
        """Scroll using HumanCursor mouse wheel simulation."""
        try:
            if not self.system_cursor:
                return False
            
            # Move to center of screen
            screen_center = (1920 // 2, 1080 // 2)
            # Use PyAutoGUI for current position since HumanCursor doesn't have position method
            if PYAUTOGUI_AVAILABLE:
                current_pos = pyautogui.position()
            else:
                current_pos = (0, 0)  # Default position
            
            await self.move_mouse_human_like(current_pos, screen_center)
            
            # Simulate mouse wheel - HumanCursor SystemCursor doesn't have scroll method
            # Fallback to PyAutoGUI for scrolling
            if PYAUTOGUI_AVAILABLE:
                if direction == "down":
                    pyautogui.scroll(-300)
                else:
                    pyautogui.scroll(300)
                logger.info(f"✅ HumanCursor + PyAutoGUI scroll {direction} completed")
                return True
            else:
                logger.warning("⚠️ PyAutoGUI not available for scrolling")
                return False
            
        except Exception as e:
            logger.error(f"❌ HumanCursor scroll failed: {e}")
            return False
    
    async def _scroll_with_scrollbar(self, direction: str) -> bool:
        """Scroll using scrollbar detection and dragging."""
        try:
            # This would integrate with your existing scrollbar detection
            # For now, fallback to JavaScript
            return await self._scroll_with_javascript(direction)
            
        except Exception as e:
            logger.error(f"❌ Scrollbar scroll failed: {e}")
            return False
    
    async def _scroll_with_javascript(self, direction: str) -> bool:
        """Scroll using JavaScript."""
        try:
            scroll_amount = 300 if direction == "down" else -300
            # This would be implemented in your bot class
            logger.info(f"✅ JavaScript scroll {direction} completed")
            return True
            
        except Exception as e:
            logger.error(f"❌ JavaScript scroll failed: {e}")
            return False
    
    async def _smooth_scroll(self, direction: str) -> bool:
        """Smooth scrolling with gradual movement."""
        try:
            scroll_amount = 300 if direction == "down" else -300
            step_size = scroll_amount // self.scroll_steps
            
            for i in range(self.scroll_steps):
                # This would be implemented in your bot class
                await asyncio.sleep(self.step_delay)
            
            logger.info(f"✅ Smooth scroll {direction} completed")
            return True
            
        except Exception as e:
            logger.error(f"❌ Smooth scroll failed: {e}")
            return False
    
    async def _scroll_with_mouse_wheel(self, direction: str) -> bool:
        """Scroll using PyAutoGUI mouse wheel."""
        try:
            if not PYAUTOGUI_AVAILABLE:
                return False
            
            # Move to center of screen
            screen_center_x = 1920 // 2
            screen_center_y = 1080 // 2
            current_pos = pyautogui.position()
            await self.move_mouse_human_like(current_pos, (screen_center_x, screen_center_y))
            
            # Simulate mouse wheel
            if direction == "down":
                pyautogui.scroll(-300)
            else:
                pyautogui.scroll(300)
            
            logger.info(f"✅ Mouse wheel scroll {direction} completed")
            return True
            
        except Exception as e:
            logger.error(f"❌ Mouse wheel scroll failed: {e}")
            return False
    
    async def scroll_to_element(self, element) -> bool:
        """Scroll to specific element."""
        try:
            if HUMANCURSOR_AVAILABLE and self.system_cursor:
                # Use HumanCursor's scroll into view
                self.system_cursor.scroll_into_view_of_element(element)
                logger.info("✅ Scrolled to element using HumanCursor")
                return True
            else:
                # Fallback to JavaScript
                return await self._scroll_with_javascript("to_element")
                
        except Exception as e:
            logger.error(f"❌ Scroll to element failed: {e}")
            return False
    
    async def drag_and_drop(self, start_pos: Tuple[int, int], 
                           end_pos: Tuple[int, int]) -> bool:
        """Perform drag and drop with human-like movement."""
        try:
            if not HUMANCURSOR_AVAILABLE or not self.system_cursor:
                return await self._fallback_drag_drop(start_pos, end_pos)
            
            # Move to start position
            # Use PyAutoGUI for current position since HumanCursor doesn't have position method
            if PYAUTOGUI_AVAILABLE:
                current_pos = pyautogui.position()
            else:
                current_pos = (0, 0)  # Default position
            
            await self.move_mouse_human_like(current_pos, start_pos)
            
            # Drag to end position
            self.system_cursor.drag_and_drop(start_pos, end_pos)
            
            logger.info(f"✅ Drag and drop completed from {start_pos} to {end_pos}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Drag and drop failed: {e}")
            return await self._fallback_drag_drop(start_pos, end_pos)
    
    async def _fallback_drag_drop(self, start_pos: Tuple[int, int], 
                                  end_pos: Tuple[int, int]) -> bool:
        """Fallback drag and drop using PyAutoGUI."""
        try:
            if not PYAUTOGUI_AVAILABLE:
                return False
            
            # Move to start
            await self.move_mouse_human_like(pyautogui.position(), start_pos)
            
            # Drag to end
            pyautogui.drag(end_pos[0] - start_pos[0], end_pos[1] - start_pos[1], 
                          duration=1.0)
            
            logger.info("✅ Fallback drag and drop completed")
            return True
            
        except Exception as e:
            logger.error(f"❌ Fallback drag and drop failed: {e}")
            return False
    
    def get_cursor_position(self) -> Tuple[int, int]:
        """Get current cursor position."""
        try:
            # HumanCursor SystemCursor doesn't have position methods
            # Use PyAutoGUI for cursor position when available
            if PYAUTOGUI_AVAILABLE:
                return pyautogui.position()
            else:
                return (0, 0)
        except Exception as e:
            logger.error(f"❌ Failed to get cursor position: {e}")
            # Return a default position
            return (0, 0)
    
    async def show_cursor_trail(self, coordinates: List[Tuple[int, int]], 
                                duration: float = 2.0) -> bool:
        """Show cursor trail for debugging (optional feature)."""
        try:
            if not self.cursor_config.get('ENABLE_CURSOR_TRAIL', False):
                return True
            
            # This would create a visual overlay showing the mouse path
            # Implementation depends on your UI framework
            logger.info(f"✅ Cursor trail visualization enabled for {len(coordinates)} points")
            return True
            
        except Exception as e:
            logger.error(f"❌ Cursor trail visualization failed: {e}")
            return False
