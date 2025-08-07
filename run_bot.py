#!/usr/bin/env python3
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

from config import Config, create_sample_env

def main():
    """Main entry point for the survey bot"""
    parser = argparse.ArgumentParser(description="Survey Automation Bot")
    parser.add_argument(
        "--implementation", 
        "-i",
        choices=["playwright", "selenium", "undetected", "v2ray"],
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
    os.system("pip install -r requirements.txt")
    
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
        from proxy_manager import ProxyManager
        
        manager = ProxyManager()
        
        # Try to load from file first
        if not manager.load_proxies_from_file():
            # Load free proxies if file doesn't exist
            manager.load_free_proxies()
        
        if manager.proxies:
            # Test all proxies
            working_proxies = manager.test_all_proxies()
            
            # Save working proxies
            if working_proxies:
                manager.save_working_proxies()
                print(f"Saved {len(working_proxies)} working proxies to working_proxies.txt")
            else:
                print("No working proxies found")
        else:
            print("No proxies available for testing")
            
    except ImportError:
        print("Proxy manager not available")
    except Exception as e:
        print(f"Error testing proxies: {e}")

def run_bot(args):
    """Run the appropriate bot implementation"""
    print(f"Starting {args.implementation} bot for {args.platform}...")
    
    try:
        if args.implementation == "playwright":
            from survey_bot_playwright import main as playwright_main
            import asyncio
            asyncio.run(playwright_main())
            
        elif args.implementation == "selenium":
            from survey_bot_selenium import main as selenium_main
            selenium_main()
            
        elif args.implementation == "undetected":
            from survey_bot_undetected import main as undetected_main
            undetected_main()
            
        elif args.implementation == "v2ray":
            from survey_bot_v2ray import main as v2ray_main
            v2ray_main()
            
        else:
            print(f"Unknown implementation: {args.implementation}")
            return
            
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
        import undetected_chromedriver
    except ImportError:
        missing_deps.append("undetected-chromedriver")
    
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
