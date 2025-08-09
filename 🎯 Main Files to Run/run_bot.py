#!/usr/bin/env python3
# This script should be run with the virtual environment activated
# Run: source ../venv/bin/activate && python3 run_bot.py
"""
Main runner script for survey automation bot.
Supports multiple implementations and configurations.
"""

import sys
import os
import argparse
from typing import Optional

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "📁 Project Structure"))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from config import Config, create_sample_env

def main():
    """Main entry point for the survey bot"""
    parser = argparse.ArgumentParser(description="Survey Automation Bot")
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
    
    # Validate configuration
    if not Config.validate_config():
        print("Configuration errors found. Please fix them before running.")
        return
    
    # Run the appropriate bot implementation
    run_bot(args)

def setup_environment():
    """Setup the environment and dependencies"""
    print("Setting up environment...")
    
    # Create sample .env file
    create_sample_env()
    
    # Install dependencies
    print("Installing dependencies...")
    os.system("pip install -r ../⚙️ Configurations/requirements.txt")
    
    # Install browser drivers
    if Config.BROWSER_TYPE == "playwright":
        print("Installing Playwright browsers...")
        os.system("playwright install")
    elif Config.BROWSER_TYPE == "selenium":
        print("Note: For Selenium, you may need to install ChromeDriver manually")
        print("Download from: https://chromedriver.chromium.org/")
    
    print("Setup complete!")
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

def run_bot(args):
    """Run the appropriate bot implementation"""
    print(f"Starting {args.implementation} bot for {args.platform}...")
    
    try:
        if args.implementation == "playwright":
            from bot_implementations.survey_bot_playwright import main as playwright_main  # type: ignore
            import asyncio
            asyncio.run(playwright_main())
            
        elif args.implementation == "selenium":
            from bot_implementations.survey_bot_selenium import main as selenium_main  # type: ignore
            selenium_main()
            
        elif args.implementation == "undetected":
            from bot_implementations.survey_bot_undetected import main as undetected_main  # type: ignore
            undetected_main()
            
        elif args.implementation == "v2ray":
            from bot_implementations.survey_bot_v2ray import V2RayEnhancedSurveyBot
            bot = V2RayEnhancedSurveyBot()
            bot.run()
        elif args.implementation == "proxychains":
            from bot_implementations.survey_bot_proxychains import ProxychainsSurveyBot
            bot = ProxychainsSurveyBot()
            bot.run()

        elif args.implementation == "hybrid":
            # Import the main function from hybrid bot implementation
            from bot_implementations.survey_bot_hybrid import main as hybrid_main  # type: ignore
            import asyncio
            asyncio.run(hybrid_main())
            
    except ImportError as e:
        print(f"Error importing {args.implementation} implementation: {e}")
        print("Make sure all dependencies are installed.")
        return
    except Exception as e:
        print(f"Error running bot: {e}")
        return

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
    
    try:
        import playwright
    except ImportError:
        missing_deps.append("playwright")
    
    try:
        import selenium
    except ImportError:
        missing_deps.append("selenium")
    
    try:
        import undetected_chromedriver
    except ImportError:
        missing_deps.append("undetected-chromedriver")
    
    try:
        import dotenv
    except ImportError:
        missing_deps.append("python-dotenv")
    
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
