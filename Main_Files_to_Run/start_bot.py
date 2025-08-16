#!/usr/bin/env python3
"""
Quick Start Script for Survey Bot
This script makes it easy to start the bot with different configurations.
"""

import os
import sys
import subprocess
import argparse

def check_venv():
    """Check if virtual environment is activated"""
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️  Virtual environment not activated!")
        print("Please activate it first:")
        print("  source venv/bin/activate")
        return False
    return True

def start_web_interface():
    """Start the web interface"""
    print("🌐 Starting web interface...")
    print("The interface will be available at: http://localhost:5000")
    print("Press Ctrl+C to stop")
    
    try:
        subprocess.run([sys.executable, "run_bot.py", "--web-interface"])
    except KeyboardInterrupt:
        print("\n👋 Web interface stopped")

def start_basic_bot():
    """Start a basic bot"""
    print("🚀 Starting basic survey bot...")
    print("Using Playwright with Qmee platform")
    print("Press Ctrl+C to stop")
    
    try:
        subprocess.run([sys.executable, "run_bot.py", "--implementation", "playwright", "--platform", "qmee"])
    except KeyboardInterrupt:
        print("\n👋 Bot stopped")

def start_cpx_bot():
    """Start CPX Research bot"""
    print("🚀 Starting CPX Research bot...")
    print("Press Ctrl+C to stop")
    
    try:
        subprocess.run([sys.executable, "run_bot.py", "--platform", "cpx"])
    except KeyboardInterrupt:
        print("\n👋 Bot stopped")

def run_tests():
    """Run the test suite"""
    print("🧪 Running tests...")
    subprocess.run([sys.executable, "simple_test.py"])

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Survey Bot Quick Start")
    parser.add_argument(
        "action",
        nargs="?",
        default="menu",
        choices=["web", "basic", "cpx", "test", "menu"],
        help="Action to perform"
    )
    
    args = parser.parse_args()
    
    print("🤖 Survey Bot Quick Start")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists("run_bot.py"):
        print("❌ run_bot.py not found in current directory")
        print("Please run this script from the Main_Files_to_Run directory")
        sys.exit(1)
    
    # Check virtual environment
    if not check_venv():
        sys.exit(1)
    
    if args.action == "web":
        start_web_interface()
    elif args.action == "basic":
        start_basic_bot()
    elif args.action == "cpx":
        start_cpx_bot()
    elif args.action == "test":
        run_tests()
    else:
        # Show menu
        while True:
            print("\nChoose an option:")
            print("1. Start Web Interface")
            print("2. Start Basic Bot")
            print("3. Start CPX Research Bot")
            print("4. Run Tests")
            print("5. Exit")
            
            try:
                choice = input("\nEnter your choice (1-5): ").strip()
                
                if choice == "1":
                    start_web_interface()
                    break
                elif choice == "2":
                    start_basic_bot()
                    break
                elif choice == "3":
                    start_cpx_bot()
                    break
                elif choice == "4":
                    run_tests()
                    break
                elif choice == "5":
                    print("👋 Goodbye!")
                    break
                else:
                    print("❌ Invalid choice. Please enter 1-5.")
            except KeyboardInterrupt:
                print("\n👋 Goodbye!")
                break

if __name__ == "__main__":
    main()
