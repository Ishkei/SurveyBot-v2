#!/usr/bin/env python3
"""
Simple script to start the web interface for the survey bot.
This script imports the WebInterface class from run_bot.py and starts it.
"""

import sys
import os

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure"))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

def main():
    """Start the web interface"""
    try:
        # Import the WebInterface and EnhancedSurveyBotRunner from run_bot.py
        from run_bot import WebInterface, EnhancedSurveyBotRunner
        
        print("✅ Flask dependencies available")
        
        # Create the bot runner
        runner = EnhancedSurveyBotRunner()
        
        # Create and start the web interface
        print("🌐 Starting web interface...")
        web_interface = WebInterface(runner)
        web_interface.run(host='0.0.0.0', port=5000, debug=False)
        
    except ImportError as e:
        print(f"❌ Error importing required modules: {e}")
        print("Make sure you're in the correct directory and all dependencies are installed.")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error starting web interface: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
