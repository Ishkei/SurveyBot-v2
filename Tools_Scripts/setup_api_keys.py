#!/usr/bin/env python3
"""
Setup script for API keys (Gemini, OpenAI, Google)
"""

import os
import getpass
from pathlib import Path

def setup_api_keys():
    """Setup API keys for AI services"""
    print("🔑 API Keys Setup for SurveyBot v2")
    print("=" * 50)
    
    # Check if .env file exists
    env_file = Path(".env")
    if not env_file.exists():
        print("Creating .env file...")
        with open(env_file, 'w') as f:
            f.write("# API Keys for AI features\n")
    
    print("\nPlease enter your API keys (press Enter to skip any you don't have):")
    
    # Get API keys from user
    google_key = input("Google API Key: ").strip()
    gemini_key = input("Gemini API Key: ").strip()
    openai_key = input("OpenAI API Key: ").strip()
    
    # Read existing .env file
    env_lines = []
    if env_file.exists():
        with open(env_file, 'r') as f:
            env_lines = f.readlines()
    
    # Update or add API keys
    keys_to_update = {
        "GOOGLE_API_KEY": google_key,
        "GEMINI_API_KEY": gemini_key,
        "OPENAI_API_KEY": openai_key
    }
    
    # Find and replace existing lines or add new ones
    for key_name, key_value in keys_to_update.items():
        if key_value:  # Only update if user provided a value
            key_line = f"{key_name}={key_value}\n"
            key_found = False
            
            for i, line in enumerate(env_lines):
                if line.startswith(f"{key_name}="):
                    env_lines[i] = key_line
                    key_found = True
                    break
            
            if not key_found:
                env_lines.append(key_line)
    
    # Write back to .env file
    with open(env_file, 'w') as f:
        f.writelines(env_lines)
    
    print(f"\n✅ API keys saved to {env_file}")
    
    # Show what was configured
    print("\n📋 Configuration Summary:")
    print(f"   Google API Key: {'✅ Set' if google_key else '❌ Not set'}")
    print(f"   Gemini API Key: {'✅ Set' if gemini_key else '❌ Not set'}")
    print(f"   OpenAI API Key: {'✅ Set' if openai_key else '❌ Not set'}")
    
    if not any([google_key, gemini_key, openai_key]):
        print("\n⚠️ No API keys were set. Some AI features may not work.")
        print("   You can run this script again later to add keys.")
    
    print("\n💡 Next steps:")
    print("1. Set up LifePoints credentials:")
    print("   python3 Tools_Scripts/setup_lifepoints_credentials.py")
    print("\n2. Save authentication session:")
    print("   python3 Tools_Scripts/save_lifepoints_auth.py")
    print("\n3. Run the LifePoints bot:")
    print("   python3 Main_Files_to_Run/run_bot.py --platform lifepoints")
    
    return True

def get_api_key_info():
    """Get information about where to get API keys"""
    print("\n🔍 Where to Get API Keys:")
    print("=" * 30)
    print("Google API Key:")
    print("  1. Go to https://console.cloud.google.com/")
    print("  2. Create a new project or select existing")
    print("  3. Enable the APIs you need")
    print("  4. Create credentials (API Key)")
    print("\nGemini API Key:")
    print("  1. Go to https://makersuite.google.com/app/apikey")
    print("  2. Sign in with your Google account")
    print("  3. Create a new API key")
    print("\nOpenAI API Key:")
    print("  1. Go to https://platform.openai.com/api-keys")
    print("  2. Sign in or create account")
    print("  3. Create a new secret key")
    
    print("\n💡 Note: You only need the keys for services you plan to use.")
    print("   The bot will work with basic features even without API keys.")

if __name__ == "__main__":
    setup_api_keys()
    get_api_key_info()
