#!/usr/bin/env python3
"""
Helper script to run save_auth.py for Qmee authentication
This script will help you save your Qmee login session for the bot to use.
"""

import os
import sys
import subprocess
from pathlib import Path

def main():
    print("🔐 Qmee Authentication Setup")
    print("=" * 50)
    print("This script will help you save your Qmee login session.")
    print("The saved session will allow the bot to skip the login process.")
    print()
    
    # Find the save_auth.py script
    current_dir = Path(__file__).parent
    save_auth_path = current_dir.parent / "Tools_Scripts" / "scripts" / "save_auth.py"
    
    if not save_auth_path.exists():
        print(f"❌ Error: Could not find save_auth.py at {save_auth_path}")
        print("Please make sure the file exists in Tools_Scripts/scripts/")
        return
    
    print(f"📁 Found save_auth.py at: {save_auth_path}")
    print()
    print("🚀 Starting authentication setup...")
    print("   - A browser window will open to Qmee login page")
    print("   - Please log in to your Qmee account")
    print("   - After successful login, return here and press Enter")
    print()
    
    try:
        # Run the save_auth.py script
        result = subprocess.run([
            sys.executable, str(save_auth_path)
        ], check=True)
        
        print("✅ Authentication setup completed successfully!")
        print(f"🔐 Your login session has been saved to: {current_dir / 'auth.json'}")
        print()
        print("Now you can run the bot with:")
        print("  python3 run_bot.py --platform qmee --implementation enhanced_router")
        print()
        print("The bot will automatically use your saved session!")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running save_auth.py: {e}")
        print("Please make sure you have the required dependencies installed.")
    except KeyboardInterrupt:
        print("\n⚠️ Setup was interrupted by user")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()
