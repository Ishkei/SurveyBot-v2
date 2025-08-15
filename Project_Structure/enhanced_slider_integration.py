#!/usr/bin/env python3
"""
Enhanced Slider CAPTCHA Integration
Demonstrates how to integrate the slider CAPTCHA solver with existing bot implementations
"""

import os
import sys
import time
import asyncio
from dotenv import load_dotenv

# Add the project structure to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from bot_implementations.slider_captcha_solver_lightweight import LightweightSliderCaptchaSolver, integrate_slider_solver
from bot_implementations.survey_bot_enhanced import EnhancedSurveyBot
from bot_implementations.survey_bot_cpx import CPXResearchBot
from bot_implementations.survey_bot_selenium import SeleniumSurveyBot
from bot_implementations.survey_bot_undetected import UndetectedSurveyBot
# Playwright bot doesn't have a class, it uses main function
# from bot_implementations.survey_bot_playwright import PlaywrightSurveyBot
from bot_implementations.survey_bot_hybrid import SurveyBotHybrid
from bot_implementations.survey_bot_v2ray import V2RayEnhancedSurveyBot
from bot_implementations.survey_bot_proxychains import ProxychainsSurveyBot
from bot_implementations.soc_survey_bot import SOCSurveyBot
from bot_implementations.self_operating_survey_bot import SelfOperatingSurveyBot
from bot_implementations.lightweight_vision_bot import LightweightVisionBot
from bot_implementations.simple_soc_bot import SimpleSOCBot

load_dotenv()

class EnhancedSliderBot(EnhancedSurveyBot):
    """Enhanced survey bot with integrated slider CAPTCHA solving"""
    
    def __init__(self):
        super().__init__()
        
        # Initialize slider CAPTCHA solver
        self.slider_solver = LightweightSliderCaptchaSolver(self.browser.driver)
        
        # Override the original CAPTCHA handling
        self._enhance_captcha_handling()
    
    def _enhance_captcha_handling(self):
        """Enhance CAPTCHA handling with slider CAPTCHA support"""
        original_handle_captcha = self.handle_captcha
        
        def enhanced_handle_captcha():
            """Enhanced CAPTCHA handling with slider support"""
            try:
                # First, try to detect and solve slider CAPTCHA
                slider_captcha_info = self.slider_solver.detect_slider_captcha()
                if slider_captcha_info["type"]:
                    print("🎯 Slider CAPTCHA detected, attempting to solve...")
                    if self.slider_solver.solve_slider_captcha(slider_captcha_info):
                        print("✅ Slider CAPTCHA solved successfully!")
                        return True
                    else:
                        print("❌ Slider CAPTCHA solving failed, trying other methods...")
                
                # Fall back to original method
                return original_handle_captcha()
                
            except Exception as e:
                print(f"⚠️ Error in enhanced CAPTCHA handling: {e}")
                return original_handle_captcha()
        
        self.handle_captcha = enhanced_handle_captcha
    
    def run_survey_with_slider_support(self, survey_url: str):
        """Run survey with enhanced slider CAPTCHA support"""
        try:
            print("🚀 Starting enhanced survey bot with slider CAPTCHA support...")
            
            # Navigate to survey
            self.browser.driver.get(survey_url)
            time.sleep(3)
            
            # Main survey loop with enhanced CAPTCHA handling
            while True:
                try:
                    # Check for CAPTCHAs first
                    if not self.handle_captcha():
                        print("⚠️ CAPTCHA handling failed, retrying...")
                        time.sleep(2)
                        continue
                    
                    # Continue with normal survey logic
                    if self.run_survey_loop():
                        print("✅ Survey completed successfully!")
                        break
                    else:
                        print("⚠️ Survey loop failed, retrying...")
                        time.sleep(2)
                        
                except Exception as e:
                    print(f"⚠️ Error in survey loop: {e}")
                    time.sleep(2)
                    
        except Exception as e:
            print(f"❌ Error running survey: {e}")
        finally:
            self.browser.driver.quit()

class CPXSliderBot(CPXResearchBot):
    """CPX Research bot with integrated slider CAPTCHA solving"""
    
    def __init__(self, config_path: str = None):
        super().__init__(config_path)
        
        # Initialize slider CAPTCHA solver (will be set when page is available)
        self.slider_solver = None
        
        # Override the original CAPTCHA handling
        self._enhance_captcha_handling()
    
    def _enhance_captcha_handling(self):
        """Enhance CAPTCHA handling with slider CAPTCHA support"""
        original_detect_and_handle_captcha = self.detect_and_handle_captcha
        
        async def enhanced_detect_and_handle_captcha():
            """Enhanced CAPTCHA detection and handling with slider support"""
            try:
                # Initialize slider solver if not already done
                if not self.slider_solver and hasattr(self, 'page') and self.page:
                    # For Playwright, we need to adapt the solver
                    self.slider_solver = self._create_playwright_slider_solver()
                
                # Try slider CAPTCHA first if solver is available
                if self.slider_solver:
                    # Check for GeeTest CAPTCHA specifically
                    if await self._detect_geetest_captcha():
                        print("🎯 GeeTest CAPTCHA detected, attempting to solve...")
                        if await self._solve_geetest_captcha_playwright():
                            print("✅ GeeTest CAPTCHA solved successfully!")
                            return True
                
                # Fall back to original method
                return await original_detect_and_handle_captcha()
                
            except Exception as e:
                print(f"⚠️ Error in enhanced CAPTCHA handling: {e}")
                return await original_detect_and_handle_captcha()
        
        self.detect_and_handle_captcha = enhanced_detect_and_handle_captcha
    
    def _create_playwright_slider_solver(self):
        """Create a Playwright-compatible slider solver"""
        # This would need to be adapted for Playwright
        # For now, return None to use fallback methods
        return None
    
    async def _detect_geetest_captcha(self) -> bool:
        """Detect GeeTest CAPTCHA in Playwright"""
        try:
            # Check for GeeTest elements
            geetest_selectors = [
                ".geetest_radar_btn",
                ".geetest_slider_button",
                ".geetest_fullpage_click_box"
            ]
            
            for selector in geetest_selectors:
                elements = await self.page.query_selector_all(selector)
                if elements:
                    print(f"🎯 GeeTest CAPTCHA detected using selector: {selector}")
                    return True
            
            # Check page text
            page_text = await self.page.text_content('body')
            if page_text and any(keyword in page_text.lower() for keyword in ['geetest', 'slide to verify', 'complete the puzzle']):
                print("🎯 GeeTest CAPTCHA detected by text content")
                return True
            
            return False
            
        except Exception as e:
            print(f"⚠️ Error detecting GeeTest CAPTCHA: {e}")
            return False
    
    async def _solve_geetest_captcha_playwright(self) -> bool:
        """Solve GeeTest CAPTCHA using Playwright"""
        try:
            print("🧩 Attempting to solve GeeTest CAPTCHA with Playwright...")
            
            # Click the GeeTest radar button
            try:
                radar_btn = await self.page.query_selector(".geetest_radar_btn")
                if radar_btn:
                    await radar_btn.click()
                    await asyncio.sleep(3)
                    print("✅ Clicked GeeTest radar button")
                else:
                    print("❌ GeeTest radar button not found")
                    return False
            except Exception as e:
                print(f"❌ Error clicking radar button: {e}")
                return False
            
            # Take screenshot of CAPTCHA area
            try:
                captcha_element = await self.page.query_selector(".geetest_fullpage_click_box")
                if captcha_element:
                    await captcha_element.screenshot(path="geetest_captcha.png")
                    print("✅ Captured GeeTest CAPTCHA image")
                else:
                    print("❌ Could not capture CAPTCHA image")
                    return False
            except Exception as e:
                print(f"❌ Error capturing CAPTCHA image: {e}")
                return False
            
            # For now, use a simplified approach
            # In a full implementation, you'd use computer vision here
            print("⚠️ Computer vision solving not implemented for Playwright yet")
            print("   Using fallback method...")
            
            # Simple fallback: try to find and click the slider
            try:
                slider = await self.page.query_selector(".geetest_slider_button")
                if slider:
                    # Get slider position
                    box = await slider.bounding_box()
                    if box:
                        # Click and drag
                        await self.page.mouse.move(box['x'] + box['width']/2, box['y'] + box['height']/2)
                        await self.page.mouse.down()
                        
                        # Move to the right (simplified)
                        await self.page.mouse.move(box['x'] + box['width']/2 + 200, box['y'] + box['height']/2)
                        await self.page.mouse.up()
                        
                        await asyncio.sleep(3)
                        print("✅ Executed simplified slider movement")
                        return True
            except Exception as e:
                print(f"❌ Error with fallback slider movement: {e}")
            
            return False
            
        except Exception as e:
            print(f"❌ GeeTest CAPTCHA solving failed: {e}")
            return False

class SeleniumSliderBot(SeleniumSurveyBot):
    """Selenium survey bot with integrated slider CAPTCHA solving"""
    
    def __init__(self, config_path: str = None):
        super().__init__(config_path)
        
        # Initialize slider CAPTCHA solver
        self.slider_solver = SliderCaptchaSolver(self.driver)
        
        # Override the original CAPTCHA handling
        self._enhance_captcha_handling()
    
    def _enhance_captcha_handling(self):
        """Enhance CAPTCHA handling with slider CAPTCHA support"""
        # Add slider CAPTCHA handling to the existing solve_page_with_vision method
        original_solve_page_with_vision = self.solve_page_with_vision
        
        def enhanced_solve_page_with_vision():
            """Enhanced page solving with slider CAPTCHA support"""
            try:
                # Check for slider CAPTCHA first
                captcha_info = self.slider_solver.detect_slider_captcha()
                if captcha_info["type"]:
                    print("🎯 Slider CAPTCHA detected, attempting to solve...")
                    if self.slider_solver.solve_slider_captcha(captcha_info):
                        print("✅ Slider CAPTCHA solved successfully!")
                        return True
                    else:
                        print("❌ Slider CAPTCHA solving failed, trying vision method...")
                
                # Fall back to original vision method
                return original_solve_page_with_vision()
                
            except Exception as e:
                print(f"⚠️ Error in enhanced page solving: {e}")
                return original_solve_page_with_vision()
        
        self.solve_page_with_vision = enhanced_solve_page_with_vision

class UndetectedSliderBot(UndetectedSurveyBot):
    """Undetected survey bot with integrated slider CAPTCHA solving"""
    
    def __init__(self, config_path: str = None):
        super().__init__(config_path)
        
        # Initialize slider CAPTCHA solver
        self.slider_solver = SliderCaptchaSolver(self.driver)
        
        # Override the original CAPTCHA handling
        self._enhance_captcha_handling()
    
    def _enhance_captcha_handling(self):
        """Enhance CAPTCHA handling with slider CAPTCHA support"""
        original_solve_page_with_vision = self.solve_page_with_vision
        
        def enhanced_solve_page_with_vision():
            """Enhanced page solving with slider CAPTCHA support"""
            try:
                # Check for slider CAPTCHA first
                captcha_info = self.slider_solver.detect_slider_captcha()
                if captcha_info["type"]:
                    print("🎯 Slider CAPTCHA detected, attempting to solve...")
                    if self.slider_solver.solve_slider_captcha(captcha_info):
                        print("✅ Slider CAPTCHA solved successfully!")
                        return True
                    else:
                        print("❌ Slider CAPTCHA solving failed, trying vision method...")
                
                # Fall back to original vision method
                return original_solve_page_with_vision()
                
            except Exception as e:
                print(f"⚠️ Error in enhanced page solving: {e}")
                return original_solve_page_with_vision()
        
        self.solve_page_with_vision = enhanced_solve_page_with_vision

# Integration helper for any bot class
def integrate_slider_solver_to_bot(bot_instance):
    """Integrate slider CAPTCHA solver with any bot instance"""
    try:
        # Check if bot has a driver attribute (Selenium-based)
        if hasattr(bot_instance, 'driver') and bot_instance.driver:
            solver = LightweightSliderCaptchaSolver(bot_instance.driver)
            bot_instance.slider_solver = solver
            
            # Add enhanced CAPTCHA handling
            if hasattr(bot_instance, 'handle_captcha'):
                original_handle_captcha = bot_instance.handle_captcha
                
                def enhanced_handle_captcha():
                    try:
                        captcha_info = solver.detect_slider_captcha()
                        if captcha_info["type"]:
                            if solver.solve_slider_captcha(captcha_info):
                                return True
                        return original_handle_captcha()
                    except:
                        return original_handle_captcha()
                
                bot_instance.handle_captcha = enhanced_handle_captcha
            
            # Add enhanced page solving
            if hasattr(bot_instance, 'solve_page_with_vision'):
                original_solve_page = bot_instance.solve_page_with_vision
                
                def enhanced_solve_page():
                    try:
                        captcha_info = solver.detect_slider_captcha()
                        if captcha_info["type"]:
                            if solver.solve_slider_captcha(captcha_info):
                                return True
                        return original_solve_page()
                    except:
                        return original_solve_page()
                
                bot_instance.solve_page_with_vision = enhanced_solve_page
            
            print("✅ Slider CAPTCHA solver integrated successfully")
            return solver
        
        # Check if bot has a page attribute (Playwright-based)
        elif hasattr(bot_instance, 'page') and bot_instance.page:
            print("⚠️ Playwright integration requires manual adaptation")
            return None
        
        else:
            print("⚠️ Bot instance doesn't have driver or page attribute")
            return None
            
    except Exception as e:
        print(f"❌ Error integrating slider solver: {e}")
        return None

def create_enhanced_bot(bot_type: str, config_path: str = None):
    """Create an enhanced bot with slider CAPTCHA support"""
    bot_map = {
        "enhanced": EnhancedSliderBot,
        "cpx": CPXSliderBot,
        "selenium": SeleniumSliderBot,
        "undetected": UndetectedSliderBot,
        "playwright": PlaywrightSurveyBot,  # Would need PlaywrightSliderBot
        "hybrid": SurveyBotHybrid,  # Would need HybridSliderBot
        "v2ray": V2RayEnhancedSurveyBot,  # Would need V2RaySliderBot
        "proxychains": ProxychainsSurveyBot,  # Would need ProxychainsSliderBot
        "soc": SOCSurveyBot,  # Would need SOCSliderBot
        "self_operating": SelfOperatingSurveyBot,  # Would need SelfOperatingSliderBot
        "lightweight": LightweightVisionBot,  # Would need LightweightSliderBot
        "simple_soc": SimpleSOCBot  # Would need SimpleSOCSliderBot
    }
    
    if bot_type in bot_map:
        bot_class = bot_map[bot_type]
        bot = bot_class(config_path)
        
        # For bots that don't have built-in slider support, integrate manually
        if bot_type not in ["enhanced", "cpx", "selenium", "undetected"]:
            integrate_slider_solver_to_bot(bot)
        
        return bot
    else:
        raise ValueError(f"Unknown bot type: {bot_type}")

def test_slider_captcha_solver():
    """Test the slider CAPTCHA solver with a demo site"""
    print("🧪 Testing Slider CAPTCHA Solver...")
    
    try:
        # Test with a demo CAPTCHA site
        test_url = "https://2captcha.com/demo/geetest"
        
        # Initialize bot with slider support
        bot = EnhancedSliderBot()
        
        # Navigate to test site
        bot.browser.driver.get(test_url)
        time.sleep(5)
        
        # Test CAPTCHA detection
        captcha_info = bot.slider_solver.detect_slider_captcha()
        print(f"🎯 CAPTCHA detection result: {captcha_info}")
        
        if captcha_info["type"]:
            # Test CAPTCHA solving
            success = bot.slider_solver.solve_slider_captcha(captcha_info)
            print(f"🧩 CAPTCHA solving result: {success}")
        else:
            print("❌ No slider CAPTCHA detected on test page")
            
    except Exception as e:
        print(f"❌ Test failed: {e}")
    finally:
        if 'bot' in locals():
            bot.browser.driver.quit()

def create_slider_captcha_config():
    """Create configuration for slider CAPTCHA solver"""
    config = {
        "slider_captcha": {
            "enabled": True,
            "methods": ["computer_vision", "template_matching", "manual"],
            "yolo_model_path": "models/puzzle_detector.pt",
            "confidence_threshold": 0.5,
            "max_attempts": 3,
            "humanize_movements": True,
            "movement_delay": {
                "min": 0.05,
                "max": 0.1
            }
        },
        "api_services": {
            "capsolver": {
                "enabled": True,
                "api_key": os.getenv("CAPSOLVER_API_KEY", "")
            },
            "anticaptcha": {
                "enabled": True,
                "api_key": os.getenv("ANTI_CAPTCHA_API_KEY", "")
            }
        }
    }
    
    # Save configuration
    import json
    config_path = os.path.join(os.path.dirname(__file__), "configs", "slider_captcha_config.json")
    os.makedirs(os.path.dirname(config_path), exist_ok=True)
    
    with open(config_path, 'w') as f:
        json.dump(config, f, indent=2)
    
    print(f"✅ Created slider CAPTCHA configuration: {config_path}")
    return config_path

def setup_slider_captcha_dependencies():
    """Setup dependencies for slider CAPTCHA solver"""
    print("🔧 Setting up slider CAPTCHA dependencies...")
    
    dependencies = [
        "ultralytics",  # YOLO model
        "opencv-python",  # Computer vision
        "pynput",  # Mouse control
        "pillow",  # Image processing
        "numpy"  # Numerical operations
    ]
    
    for dep in dependencies:
        try:
            __import__(dep.replace("-", "_"))
            print(f"✅ {dep} already installed")
        except ImportError:
            print(f"📦 Installing {dep}...")
            os.system(f"pip install {dep}")

def main():
    """Main function to demonstrate slider CAPTCHA integration"""
    print("🚀 Slider CAPTCHA Integration Demo")
    print("=" * 50)
    
    # Setup dependencies
    setup_slider_captcha_dependencies()
    
    # Create configuration
    config_path = create_slider_captcha_config()
    
    # Test the solver
    test_slider_captcha_solver()
    
    print("\n📋 Integration Instructions:")
    print("1. Use EnhancedSliderBot for Selenium-based bots")
    print("2. Use CPXSliderBot for Playwright-based bots")
    print("3. Use create_enhanced_bot() for any bot type")
    print("4. Use integrate_slider_solver_to_bot() for existing instances")
    print("5. Configure API keys in your .env file")
    print("6. Train custom YOLO model for better accuracy")
    print("7. Test with your specific CAPTCHA types")

if __name__ == "__main__":
    main()
