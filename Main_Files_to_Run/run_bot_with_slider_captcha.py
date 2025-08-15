#!/usr/bin/env python3
"""
Enhanced Bot Runner with Slider CAPTCHA Support
Integrates slider CAPTCHA solving with all existing bot implementations
"""

import os
import sys
import asyncio
import argparse
import logging
from dotenv import load_dotenv

# Add project structure to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'Project_Structure'))

from enhanced_slider_integration import (
    create_enhanced_bot, 
    integrate_slider_solver_to_bot,
    EnhancedSliderBot,
    CPXSliderBot,
    SeleniumSliderBot,
    UndetectedSliderBot
)
from bot_implementations.survey_bot_enhanced import EnhancedSurveyBot
from bot_implementations.survey_bot_cpx import CPXResearchBot
from bot_implementations.survey_bot_selenium import SeleniumSurveyBot
from bot_implementations.survey_bot_undetected import UndetectedSurveyBot
from bot_implementations.survey_bot_playwright import PlaywrightSurveyBot
from bot_implementations.survey_bot_hybrid import SurveyBotHybrid
from bot_implementations.survey_bot_v2ray import V2RayEnhancedSurveyBot
from bot_implementations.survey_bot_proxychains import ProxychainsSurveyBot
from bot_implementations.soc_survey_bot import SOCSurveyBot
from bot_implementations.self_operating_survey_bot import SelfOperatingSurveyBot
from bot_implementations.lightweight_vision_bot import LightweightVisionBot
from bot_implementations.simple_soc_bot import SimpleSOCBot

load_dotenv()

class SliderCaptchaBotRunner:
    """Enhanced bot runner with slider CAPTCHA support"""
    
    def __init__(self):
        self.session_stats = {
            'start_time': None,
            'surveys_completed': 0,
            'questions_answered': 0,
            'captchas_solved': 0,
            'errors_encountered': 0,
            'personality_mode': 'enhanced'
        }
        self.setup_logging()
    
    def setup_logging(self):
        """Setup logging configuration"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('slider_captcha_bot.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    async def run_enhanced_bot(self, args):
        """Run the bot with enhanced slider CAPTCHA features"""
        self.session_stats['start_time'] = asyncio.get_event_loop().time()
        
        print(f"\n🚀 Starting Enhanced Survey Bot with Slider CAPTCHA Support")
        print(f"Implementation: {args.implementation}")
        print(f"Platform: {getattr(args, 'platform', 'general')}")
        print(f"Slider CAPTCHA: ✅ Enabled")
        print("-" * 60)
        
        try:
            # Create enhanced bot with slider CAPTCHA support
            bot = await self._create_enhanced_bot(args)
            
            if not bot:
                print(f"❌ Failed to create bot for implementation: {args.implementation}")
                return
            
            # Run the bot
            await self._run_bot(bot, args)
                
        except Exception as e:
            self.session_stats['errors_encountered'] += 1
            self.logger.error(f"Bot execution failed: {e}")
            import traceback
            traceback.print_exc()
        finally:
            self._print_session_summary()
    
    async def _create_enhanced_bot(self, args):
        """Create an enhanced bot with slider CAPTCHA support"""
        try:
            # Use the enhanced bot creation function
            bot_type = args.implementation
            config_path = getattr(args, 'config', None)
            
            # Create enhanced bot
            bot = create_enhanced_bot(bot_type, config_path)
            
            print(f"✅ Created enhanced bot: {bot_type}")
            return bot
            
        except Exception as e:
            print(f"❌ Error creating enhanced bot: {e}")
            return None
    
    async def _run_bot(self, bot, args):
        """Run the bot with appropriate method"""
        try:
            # Determine how to run the bot based on its type
            if hasattr(bot, 'run_survey_with_slider_support'):
                # Use enhanced method if available
                survey_url = getattr(args, 'url', 'https://your-survey-site.com')
                bot.run_survey_with_slider_support(survey_url)
                
            elif hasattr(bot, 'run_survey_session'):
                # For CPX bots
                max_surveys = getattr(args, 'max_surveys', 5)
                result = await bot.run_survey_session(max_surveys=max_surveys)
                print(f"CPX session result: {result}")
                
            elif hasattr(bot, 'run'):
                # For bots with simple run method
                if asyncio.iscoroutinefunction(bot.run):
                    await bot.run()
                else:
                    bot.run()
                    
            elif hasattr(bot, 'run_survey_loop'):
                # For bots with survey loop
                if asyncio.iscoroutinefunction(bot.run_survey_loop):
                    await bot.run_survey_loop()
                else:
                    bot.run_survey_loop()
                    
            else:
                print("⚠️ Bot doesn't have a standard run method")
                print("Available methods:", [method for method in dir(bot) if not method.startswith('_')])
                
        except Exception as e:
            print(f"❌ Error running bot: {e}")
            raise
    
    def _print_session_summary(self):
        """Print session summary"""
        if self.session_stats['start_time']:
            duration = asyncio.get_event_loop().time() - self.session_stats['start_time']
            print(f"\n📊 Session Summary")
            print(f"Duration: {duration:.1f} seconds")
            print(f"Surveys Completed: {self.session_stats['surveys_completed']}")
            print(f"Questions Answered: {self.session_stats['questions_answered']}")
            print(f"CAPTCHAs Solved: {self.session_stats['captchas_solved']}")
            print(f"Errors Encountered: {self.session_stats['errors_encountered']}")

def create_parser():
    """Create command line argument parser"""
    parser = argparse.ArgumentParser(description='Enhanced Survey Bot with Slider CAPTCHA Support')
    
    parser.add_argument(
        '--implementation', 
        type=str, 
        default='enhanced',
        choices=[
            'enhanced', 'cpx', 'selenium', 'undetected', 'playwright', 
            'hybrid', 'v2ray', 'proxychains', 'soc', 'self_operating', 
            'lightweight', 'simple_soc'
        ],
        help='Bot implementation to use'
    )
    
    parser.add_argument(
        '--platform', 
        type=str, 
        default='general',
        choices=['cpx', 'qmee', 'purespectrum', 'general'],
        help='Survey platform (for platform-specific bots)'
    )
    
    parser.add_argument(
        '--config', 
        type=str, 
        help='Path to configuration file'
    )
    
    parser.add_argument(
        '--url', 
        type=str, 
        help='Survey URL to navigate to'
    )
    
    parser.add_argument(
        '--max-surveys', 
        type=int, 
        default=5,
        help='Maximum number of surveys to complete'
    )
    
    parser.add_argument(
        '--test-captcha', 
        action='store_true',
        help='Test slider CAPTCHA solver on demo site'
    )
    
    return parser

async def test_captcha_solver():
    """Test the slider CAPTCHA solver"""
    print("🧪 Testing Slider CAPTCHA Solver...")
    
    try:
        from enhanced_slider_integration import test_slider_captcha_solver
        test_slider_captcha_solver()
    except Exception as e:
        print(f"❌ Test failed: {e}")

async def main():
    """Main function"""
    parser = create_parser()
    args = parser.parse_args()
    
    # Test CAPTCHA solver if requested
    if args.test_captcha:
        await test_captcha_solver()
        return
    
    # Run enhanced bot
    runner = SliderCaptchaBotRunner()
    await runner.run_enhanced_bot(args)

if __name__ == "__main__":
    asyncio.run(main())
