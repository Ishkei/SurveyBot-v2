#!/usr/bin/env python3
"""
Human-like typing simulation utility for survey bots.
Simulates realistic typing patterns to avoid detection.
"""

import asyncio
import random
import time
from typing import Optional, List, Tuple
import pyautogui


class TypingSimulator:
    """Simulates human-like typing behavior for survey text inputs."""
    
    def __init__(self, config: Optional[dict] = None):
        self.config = config or {}
        
        # Typing speed configuration
        self.base_typing_interval = self.config.get('base_typing_interval', 0.08)
        self.variance_range = self.config.get('variance_range', 0.04)
        self.pause_probability = self.config.get('pause_probability', 0.15)
        self.pause_duration_range = self.config.get('pause_duration_range', (0.5, 2.0))
        
        # Human-like typing patterns
        self.common_typos = {
            'the': 'teh',
            'and': 'adn',
            'for': 'fro',
            'with': 'wih',
            'that': 'taht',
            'this': 'thsi',
            'have': 'hvae',
            'from': 'form',
            'they': 'tehy',
            'said': 'saif'
        }
        
        # Words that might cause brief pauses
        self.thinking_words = [
            'um', 'uh', 'well', 'like', 'you know', 'i mean',
            'basically', 'actually', 'honestly', 'basically'
        ]
        
        # Initialize pyautogui settings
        pyautogui.FAILSAFE = True
        pyautogui.PAUSE = 0.01
    
    async def type_text_human_like(self, text: str, element=None, use_pyautogui: bool = True) -> bool:
        """
        Type text with human-like patterns and timing.
        
        Args:
            text: Text to type
            element: Playwright element (if not using pyautogui)
            use_pyautogui: Whether to use pyautogui or Playwright typing
        
        Returns:
            bool: Success status
        """
        try:
            if use_pyautogui and element is None:
                return await self._type_with_pyautogui(text)
            elif element is not None:
                return await self._type_with_playwright(text, element)
            else:
                print("⚠️ No typing method available")
                return False
                
        except Exception as e:
            print(f"❌ Typing simulation failed: {e}")
            return False
    
    async def _type_with_pyautogui(self, text: str) -> bool:
        """Type text using pyautogui with human-like patterns."""
        try:
            # Simulate human-like typing
            words = text.split()
            typed_text = ""
            
            for i, word in enumerate(words):
                # Add thinking pauses for certain words
                if word.lower() in self.thinking_words and random.random() < 0.3:
                    await asyncio.sleep(random.uniform(0.5, 1.5))
                
                # Type word character by character
                for char in word:
                    # Simulate typing speed variation
                    interval = self.base_typing_interval + random.uniform(-self.variance_range, self.variance_range)
                    
                    # Occasionally make typos
                    if random.random() < 0.02:  # 2% chance of typo
                        typo_char = self._get_random_typo_char(char)
                        pyautogui.typewrite(typo_char, interval=interval)
                        await asyncio.sleep(0.1)
                        pyautogui.press('backspace')
                        await asyncio.sleep(0.05)
                    
                    pyautogui.typewrite(char, interval=interval)
                    typed_text += char
                
                # Add space between words
                if i < len(words) - 1:
                    pyautogui.typewrite(' ', interval=0.05)
                    typed_text += ' '
                
                # Random pauses between words
                if random.random() < self.pause_probability:
                    pause_duration = random.uniform(*self.pause_duration_range)
                    await asyncio.sleep(pause_duration)
            
            print(f"✅ Typed text with human-like simulation: {text[:50]}...")
            return True
            
        except Exception as e:
            print(f"❌ PyAutoGUI typing failed: {e}")
            return False
    
    async def _type_with_playwright(self, text: str, element) -> bool:
        """Type text using Playwright with human-like simulation."""
        try:
            # Focus on the element first
            await element.click()
            await asyncio.sleep(0.2)
            
            # Clear existing content
            await element.fill("")
            await asyncio.sleep(0.1)
            
            # Type text with human-like timing
            words = text.split()
            typed_text = ""
            
            for i, word in enumerate(words):
                # Add thinking pauses for certain words
                if word.lower() in self.thinking_words and random.random() < 0.3:
                    await asyncio.sleep(random.uniform(0.5, 1.5))
                
                # Type word character by character
                for char in word:
                    # Simulate typing speed variation
                    interval = self.base_typing_interval + random.uniform(-self.variance_range, self.variance_range)
                    
                    # Occasionally make typos
                    if random.random() < 0.02:  # 2% chance of typo
                        typo_char = self._get_random_typo_char(char)
                        await element.type(typo_char, delay=int(interval * 1000))
                        await asyncio.sleep(0.1)
                        await element.press('Backspace')
                        await asyncio.sleep(0.05)
                    
                    await element.type(char, delay=int(interval * 1000))
                    typed_text += char
                
                # Add space between words
                if i < len(words) - 1:
                    await element.type(' ', delay=50)
                    typed_text += ' '
                
                # Random pauses between words
                if random.random() < self.pause_probability:
                    pause_duration = random.uniform(*self.pause_duration_range)
                    await asyncio.sleep(pause_duration)
            
            print(f"✅ Typed text with Playwright simulation: {text[:50]}...")
            return True
            
        except Exception as e:
            print(f"❌ Playwright typing failed: {e}")
            return False
    
    def _get_random_typo_char(self, char: str) -> str:
        """Generate a realistic typo character."""
        if char.isalpha():
            # Common keyboard typos (adjacent keys)
            typo_map = {
                'a': ['q', 's', 'z'],
                'b': ['v', 'g', 'n'],
                'c': ['x', 'v', 'f'],
                'd': ['s', 'e', 'r', 'f', 'x'],
                'e': ['w', 's', 'd', 'r'],
                'f': ['d', 'r', 't', 'g', 'v', 'c'],
                'g': ['f', 't', 'y', 'h', 'b', 'v'],
                'h': ['g', 'y', 'u', 'j', 'n', 'b'],
                'i': ['u', 'j', 'k', 'o'],
                'j': ['h', 'u', 'i', 'k', 'm', 'n'],
                'k': ['j', 'i', 'o', 'l', 'm'],
                'l': ['k', 'o', 'p'],
                'm': ['n', 'j', 'k'],
                'n': ['b', 'h', 'j', 'm'],
                'o': ['i', 'k', 'l', 'p'],
                'p': ['o', 'l'],
                'q': ['w', 'a'],
                'r': ['e', 'd', 'f', 't'],
                's': ['a', 'q', 'w', 'e', 'd', 'z', 'x'],
                't': ['r', 'f', 'g', 'y'],
                'u': ['y', 'h', 'j', 'i'],
                'v': ['c', 'f', 'g', 'b'],
                'w': ['q', 'a', 's', 'e'],
                'x': ['z', 'a', 's', 'd', 'c'],
                'y': ['t', 'g', 'h', 'u'],
                'z': ['a', 's', 'x']
            }
            
            char_lower = char.lower()
            if char_lower in typo_map:
                return random.choice(typo_map[char_lower])
        
        # For non-alphabetic characters, just return a random character
        return random.choice('abcdefghijklmnopqrstuvwxyz')
    
    async def type_with_backspacing(self, text: str, element=None, use_pyautogui: bool = True) -> bool:
        """
        Type text with occasional backspacing to correct "mistakes".
        Makes the typing look more human-like.
        """
        try:
            # Start typing
            success = await self.type_text_human_like(text, element, use_pyautogui)
            
            if success and random.random() < 0.3:  # 30% chance of "correction"
                await asyncio.sleep(random.uniform(0.5, 1.0))
                
                if use_pyautogui:
                    # Simulate backspacing and retyping
                    pyautogui.press('backspace', presses=random.randint(1, 3), interval=0.1)
                    await asyncio.sleep(0.2)
                    pyautogui.typewrite(text[-3:], interval=0.05)  # Retype last few characters
                else:
                    # Playwright backspacing
                    await element.press('Backspace', press_count=random.randint(1, 3))
                    await asyncio.sleep(0.2)
                    await element.type(text[-3:], delay=50)
                
                print("✅ Added realistic typing correction")
            
            return success
            
        except Exception as e:
            print(f"❌ Typing with backspacing failed: {e}")
            return False
    
    def get_typing_config(self) -> dict:
        """Get current typing configuration."""
        return {
            'base_typing_interval': self.base_typing_interval,
            'variance_range': self.variance_range,
            'pause_probability': self.pause_probability,
            'pause_duration_range': self.pause_duration_range
        }
    
    def update_typing_config(self, new_config: dict):
        """Update typing configuration."""
        for key, value in new_config.items():
            if hasattr(self, key):
                setattr(self, key, value)
                print(f"✅ Updated {key}: {value}")


# Convenience function for quick typing simulation
async def type_text_naturally(text: str, element=None, use_pyautogui: bool = True, config: Optional[dict] = None) -> bool:
    """
    Quick function to type text naturally.
    
    Args:
        text: Text to type
        element: Playwright element (optional)
        use_pyautogui: Whether to use pyautogui
        config: Typing configuration
    
    Returns:
        bool: Success status
    """
    simulator = TypingSimulator(config)
    return await simulator.type_text_human_like(text, element, use_pyautogui)


# Configuration presets
TYPING_PRESETS = {
    'fast_typer': {
        'base_typing_interval': 0.05,
        'variance_range': 0.02,
        'pause_probability': 0.1,
        'pause_duration_range': (0.3, 1.0)
    },
    'average_typer': {
        'base_typing_interval': 0.08,
        'variance_range': 0.04,
        'pause_probability': 0.15,
        'pause_duration_range': (0.5, 2.0)
    },
    'slow_typer': {
        'base_typing_interval': 0.12,
        'variance_range': 0.06,
        'pause_probability': 0.25,
        'pause_duration_range': (1.0, 3.0)
    },
    'careful_typer': {
        'base_typing_interval': 0.1,
        'variance_range': 0.03,
        'pause_probability': 0.2,
        'pause_duration_range': (0.8, 2.5)
    }
}
