#!/usr/bin/env python3
# This script should be run with the virtual environment activated
# Run: source ../venv/bin/activate && python3 run_bot.py
"""
Enhanced Main Runner Script for Survey Automation Bot.
Supports multiple implementations with advanced AI personality, typing simulation, and captcha solving.
"""

import sys
import os
import argparse
import asyncio
import json
import logging
from typing import Optional, Dict, Any, List
from pathlib import Path
import time
import traceback

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "📁 Project Structure"))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from config import Config, create_sample_env

# Enhanced features imports
try:
    from enhanced_personality_system import EnhancedPersonalitySystem, generate_enhanced_response
    from enhanced_bot_integration import EnhancedBotIntegration, SurveyBotEnhancer
    from typing_simulation import TypingSimulator, type_text_naturally
    from free_captcha_solver import FreeCaptchaSolver
    ENHANCED_FEATURES_AVAILABLE = True
    print("✅ Enhanced features loaded successfully")
except ImportError as e:
    ENHANCED_FEATURES_AVAILABLE = False
    print(f"⚠️ Some enhanced features not available: {e}")
    print("Basic functionality will still work")

class EnhancedSurveyBotRunner:
    """Enhanced survey bot runner with advanced features integration"""
    
    def __init__(self):
        self.enhanced_personality = None
        self.typing_simulator = None
        self.captcha_solver = None
        self.bot_enhancer = None
        self.enhanced_integration = None
        self.session_stats = {
            'start_time': None,
            'surveys_completed': 0,
            'captchas_solved': 0,
            'errors_encountered': 0,
            'personality_mode': 'natural_conversation'
        }
        
        # Initialize enhanced features
        self._initialize_enhanced_features()
        
        # Setup logging
        self._setup_logging()
    
    def _initialize_enhanced_features(self):
        """Initialize all enhanced features if available"""
        if not ENHANCED_FEATURES_AVAILABLE:
            return
            
        try:
            # Initialize enhanced personality system
            self.enhanced_personality = EnhancedPersonalitySystem()
            print(f"✅ Enhanced personality system initialized")
            
            # Initialize typing simulator
            self.typing_simulator = TypingSimulator()
            print(f"✅ Typing simulator initialized")
            
            # Initialize captcha solver
            self.captcha_solver = FreeCaptchaSolver()
            print(f"✅ Free captcha solver initialized")
            
            # Initialize enhanced bot integration
            self.enhanced_integration = EnhancedBotIntegration()
            print(f"✅ Enhanced bot integration initialized")
            
            # Initialize bot enhancer
            self.bot_enhancer = SurveyBotEnhancer()
            print(f"✅ Bot enhancer initialized")
            
        except Exception as e:
            print(f"⚠️ Error initializing enhanced features: {e}")
            traceback.print_exc()
    
    def _setup_logging(self):
        """Setup enhanced logging system"""
        log_dir = Path("logs")
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f"survey_bot_{time.strftime('%Y%m%d_%H%M%S')}.log"),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    async def run_enhanced_bot(self, args):
        """Run the bot with enhanced features"""
        self.session_stats['start_time'] = time.time()
        
        print(f"\n🚀 Starting Enhanced Survey Bot")
        print(f"Implementation: {args.implementation}")
        print(f"Platform: {args.platform}")
        print(f"Personality Mode: {self.session_stats['personality_mode']}")
        print(f"Enhanced Features: {'✅ Enabled' if ENHANCED_FEATURES_AVAILABLE else '❌ Disabled'}")
        print("-" * 50)
        
        try:
            # Run the appropriate bot implementation
            if args.implementation == "playwright":
                await self._run_playwright_bot(args)
            elif args.implementation == "selenium":
                await self._run_selenium_bot(args)
            elif args.implementation == "undetected":
                await self._run_undetected_bot(args)
            elif args.implementation == "v2ray":
                await self._run_v2ray_bot(args)
            elif args.implementation == "proxychains":
                await self._run_proxychains_bot(args)
            elif args.implementation == "hybrid":
                await self._run_hybrid_bot(args)
            else:
                print(f"❌ Unknown implementation: {args.implementation}")
                return
                
        except Exception as e:
            self.session_stats['errors_encountered'] += 1
            self.logger.error(f"Bot execution failed: {e}")
            traceback.print_exc()
        finally:
            self._print_session_summary()
    
    async def _run_playwright_bot(self, args):
        """Run Playwright bot with enhancements"""
        from bot_implementations.survey_bot_playwright import main as playwright_main
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enable_enhancement()
        
        await playwright_main()
    
    async def _run_selenium_bot(self, args):
        """Run Selenium bot with enhancements"""
        from bot_implementations.survey_bot_selenium import main as selenium_main
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enable_enhancement()
        
        # Run in thread since selenium_main is synchronous
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor() as executor:
            await asyncio.get_event_loop().run_in_executor(executor, selenium_main)
    
    async def _run_undetected_bot(self, args):
        """Run Undetected bot with enhancements"""
        from bot_implementations.survey_bot_undetected import main as undetected_main
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enable_enhancement()
        
        # Run in thread since undetected_main is synchronous
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor() as executor:
            await asyncio.get_event_loop().run_in_executor(executor, undetected_main)
    
    async def _run_v2ray_bot(self, args):
        """Run V2Ray bot with enhancements"""
        from bot_implementations.survey_bot_v2ray import V2RayEnhancedSurveyBot
        
        bot = V2RayEnhancedSurveyBot()
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enhance_response_generation(bot.run)
        
        bot.run()
    
    async def _run_proxychains_bot(self, args):
        """Run Proxychains bot with enhancements"""
        from bot_implementations.survey_bot_proxychains import ProxychainsSurveyBot
        
        bot = ProxychainsSurveyBot()
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enhance_response_generation(bot.run)
        
        bot.run()
    
    async def _run_hybrid_bot(self, args):
        """Run Hybrid bot with enhancements"""
        from bot_implementations.survey_bot_hybrid import main as hybrid_main
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enable_enhancement()
        
        await hybrid_main()
    
    def _print_session_summary(self):
        """Print session statistics and summary"""
        if self.session_stats['start_time']:
            duration = time.time() - self.session_stats['start_time']
            print("\n" + "=" * 50)
            print("📊 SESSION SUMMARY")
            print("=" * 50)
            print(f"Duration: {duration:.2f} seconds")
            print(f"Surveys Completed: {self.session_stats['surveys_completed']}")
            print(f"Captchas Solved: {self.session_stats['captchas_solved']}")
            print(f"Errors Encountered: {self.session_stats['errors_encountered']}")
            print(f"Personality Mode: {self.session_stats['personality_mode']}")
            print("=" * 50)
    
    async def demo_enhanced_features(self):
        """Demonstrate enhanced features"""
        if not ENHANCED_FEATURES_AVAILABLE:
            print("❌ Enhanced features not available")
            return
        
        print("\n🎭 Enhanced Features Demo")
        print("-" * 30)
        
        # Demo personality system
        if self.enhanced_personality:
            print("\n🧠 Personality System Demo:")
            question = "What do you think about online surveys?"
            response = await self.enhanced_personality.generate_enhanced_response(
                question, 
                context="User is asking about survey opinions",
                mode="natural_conversation"
            )
            print(f"Q: {question}")
            print(f"A: {response[:200]}...")
        
        # Demo typing simulation
        if self.typing_simulator:
            print("\n⌨️ Typing Simulation Demo:")
            config = self.typing_simulator.get_typing_config()
            print(f"Base typing interval: {config['base_typing_interval']}s")
            print(f"Variance range: {config['variance_range']}s")
            print(f"Pause probability: {config['pause_probability']}")
        
        # Demo captcha solver
        if self.captcha_solver:
            print("\n🔐 Captcha Solver Demo:")
            math_question = "What is 15 plus 23?"
            solution = self.captcha_solver.solve_text_captcha(math_question)
            print(f"Math captcha: {math_question} = {solution}")
        
        print("\n✅ Enhanced features demo completed!")

def main():
    """Main entry point for the enhanced survey bot"""
    parser = argparse.ArgumentParser(description="Enhanced Survey Automation Bot")
    parser.add_argument(
        "--implementation", 
        "-i",
        choices=["playwright", "selenium", "undetected", "v2ray", "proxychains", "hybrid"],
        default=Config.BROWSER_TYPE,
        help="Choose bot implementation"
    )
    parser.add_argument(
        "--platform",
        "-p", 
        choices=["qmee", "earnhaus", "prolific", "mturk"],
        default=Config.SURVEY_PLATFORM,
        help="Choose survey platform"
    )
    parser.add_argument(
        "--headless",
        action="store_true",
        help="Run in headless mode"
    )
    parser.add_argument(
        "--proxy",
        action="store_true", 
        help="Enable proxy rotation"
    )
    parser.add_argument(
        "--test-proxies",
        action="store_true",
        help="Test and save working proxies"
    )
    parser.add_argument(
        "--config",
        action="store_true",
        help="Show current configuration"
    )
    parser.add_argument(
        "--setup",
        action="store_true",
        help="Setup environment and dependencies"
    )
    parser.add_argument(
        "--demo-enhanced",
        action="store_true",
        help="Demo enhanced features"
    )
    parser.add_argument(
        "--personality-mode",
        "-m",
        choices=["natural_conversation", "human_writer", "ai_team_simulation", "discord_casual"],
        default="natural_conversation",
        help="Choose personality mode for enhanced responses"
    )
    parser.add_argument(
        "--typing-simulation",
        action="store_true",
        help="Enable human-like typing simulation"
    )
    parser.add_argument(
        "--captcha-solving",
        action="store_true",
        help="Enable automatic captcha solving"
    )
    parser.add_argument(
        "--enhanced-ai",
        action="store_true",
        help="Enable enhanced AI response generation"
    )
    
    args = parser.parse_args()
    
    # Update config based on arguments
    Config.BROWSER_TYPE = args.implementation
    Config.SURVEY_PLATFORM = args.platform
    Config.HEADLESS = args.headless
    
    if args.config:
        Config.print_config()
        return
    
    if args.setup:
        setup_environment()
        return
    
    if args.test_proxies:
        test_proxies()
        return
    
    if args.demo_enhanced:
        runner = EnhancedSurveyBotRunner()
        asyncio.run(runner.demo_enhanced_features())
        return
    
    # Validate configuration
    if not Config.validate_config():
        print("Configuration errors found. Please fix them before running.")
        return
    
    # Create and run enhanced bot runner
    runner = EnhancedSurveyBotRunner()
    
    # Update personality mode if specified
    if args.personality_mode and runner.enhanced_personality:
        runner.session_stats['personality_mode'] = args.personality_mode
        runner.enhanced_personality.switch_mode(args.personality_mode)
        print(f"✅ Switched to personality mode: {args.personality_mode}")
    
    # Run the enhanced bot
    asyncio.run(runner.run_enhanced_bot(args))

def setup_environment():
    """Setup the environment and dependencies"""
    print("Setting up enhanced environment...")
    
    # Create sample .env file
    create_sample_env()
    
    # Install dependencies
    print("Installing dependencies...")
    os.system("pip install -r ../⚙️ Configurations/requirements.txt")
    
    # Install enhanced personality dependencies
    if os.path.exists("../📁 Project Structure/requirements_enhanced_personality.txt"):
        print("Installing enhanced personality dependencies...")
        os.system("pip install -r ../📁 Project Structure/requirements_enhanced_personality.txt")
    
    # Install browser drivers
    if Config.BROWSER_TYPE == "playwright":
        print("Installing Playwright browsers...")
        os.system("playwright install")
    elif Config.BROWSER_TYPE == "selenium":
        print("Note: For Selenium, you may need to install ChromeDriver manually")
        print("Download from: https://chromedriver.chromium.org/")
    
    # Install additional dependencies for enhanced features
    print("Installing enhanced features dependencies...")
    enhanced_deps = [
        "opencv-python",
        "pytesseract",
        "Pillow",
        "pyautogui",
        "google-generativeai"
    ]
    
    for dep in enhanced_deps:
        try:
            os.system(f"pip install {dep}")
        except:
            print(f"⚠️ Could not install {dep}")
    
    print("Enhanced setup complete!")
    print("Please update your .env file with your API keys and settings.")

def test_proxies():
    """Test and save working proxies"""
    print("Testing proxies...")
    
    try:
        from proxy_management.proxy_manager_v2ray import V2RayProxyManager
        
        manager = V2RayProxyManager(v2ray_path="./v2ray/v2ray")
        
        # Try to load from different config files
        config_files = [
            "configs/shadow_proxy_configs.json",
            "configs/v2ray_proxies.json",
            "configs/sample_v2ray_proxies.json"
        ]
        
        config_loaded = False
        for config_file in config_files:
            if os.path.exists(config_file):
                print(f"Loading proxies from {config_file}...")
                if manager.load_configs_from_file(config_file):
                    config_loaded = True
                    print(f"✓ Loaded {len(manager.proxy_configs)} proxy configurations")
                    break
        
        if not config_loaded:
            print("No proxy configuration files found. Creating sample configurations...")
            from proxy_management.proxy_manager_v2ray import create_sample_proxies
            create_sample_proxies()
            manager.load_configs_from_file("sample_v2ray_proxies.json")
        
        if manager.proxy_configs:
            print(f"\nTesting {len(manager.proxy_configs)} proxy configurations...")
            
            working_configs = []
            for i, config in enumerate(manager.proxy_configs):
                print(f"\nTesting proxy {i+1}/{len(manager.proxy_configs)}: {config.name}")
                print(f"  Protocol: {config.protocol}")
                print(f"  Address: {config.address}:{config.port}")
                print(f"  Security: {config.security}")
                print(f"  Network: {config.network}")
                
                success, response_time = manager.test_proxy(config, timeout=15)
                
                if success:
                    print(f"  ✓ Working - Response time: {response_time:.2f}s")
                    working_configs.append(config)
                else:
                    print(f"  ✗ Failed")
            
            print(f"\nSummary: {len(working_configs)}/{len(manager.proxy_configs)} proxies are working")
            
            # Save working configurations
            if working_configs:
                manager.proxy_configs = working_configs
                manager.save_configs_to_file("configs/working_proxies.json")
                print(f"\nSaved {len(working_configs)} working proxy configurations to configs/working_proxies.json")
            else:
                print("\nNo working proxies found. You may need to check your V2Ray installation or network connectivity.")
        else:
            print("No proxies available for testing")
            
    except ImportError as e:
        print(f"Proxy manager not available: {e}")
        print("Make sure the proxy_management module is properly installed.")
    except Exception as e:
        print(f"Error testing proxies: {e}")
        import traceback
        traceback.print_exc()

def check_dependencies():
    """Check if all required dependencies are available"""
    missing_deps = []
    
    # Check if we're in a virtual environment
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️  Warning: Not running in a virtual environment")
        print("Please activate the virtual environment first:")
        print("  source ../venv/bin/activate")
        print("Then run this script again.")
        return False
    
    # Basic dependencies
    basic_deps = ["playwright", "selenium", "undetected_chromedriver", "dotenv"]
    for dep in basic_deps:
        try:
            __import__(dep.replace("-", "_"))
        except ImportError:
            missing_deps.append(dep)
    
    # Enhanced features dependencies
    if ENHANCED_FEATURES_AVAILABLE:
        enhanced_deps = ["opencv-python", "pytesseract", "Pillow", "pyautogui"]
        for dep in enhanced_deps:
            try:
                __import__(dep.replace("-", "_"))
            except ImportError:
                missing_deps.append(dep)
    
    if missing_deps:
        print(f"Missing dependencies: {', '.join(missing_deps)}")
        print("Run with --setup to install dependencies")
        return False
    
    return True

if __name__ == "__main__":
    # Check dependencies first
    if not check_dependencies():
        print("Dependencies missing. Run with --setup to install them.")
        sys.exit(1)
    
    main()
