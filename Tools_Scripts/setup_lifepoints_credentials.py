#!/usr/bin/env python3
"""
Setup script for LifePoints login credentials
"""

import os
import getpass
from pathlib import Path

def setup_credentials():
    """Setup LifePoints login credentials"""
    print("="*50)
    print("LifePoints Login Credentials Setup")
    print("="*50)
    
    # Check if .env file exists
    env_file = Path("../.env")
    if not env_file.exists():
        print("Creating .env file...")
        with open(env_file, 'w') as f:
            f.write("# LifePoints Login Credentials\n")
    
    # Get credentials from user
    print("\nPlease enter your LifePoints login credentials:")
    email = input("Email: ").strip()
    password = getpass.getpass("Password: ").strip()
    
    if not email or not password:
        print("Error: Email and password are required!")
        return False
    
    # Read existing .env file
    env_lines = []
    if env_file.exists():
        with open(env_file, 'r') as f:
            env_lines = f.readlines()
    
    # Update or add credentials
    email_line = f"LIFEPOINTS_EMAIL={email}\n"
    password_line = f"LIFEPOINTS_PASSWORD={password}\n"
    
    # Find and replace existing lines or add new ones
    email_found = False
    password_found = False
    
    for i, line in enumerate(env_lines):
        if line.startswith("LIFEPOINTS_EMAIL="):
            env_lines[i] = email_line
            email_found = True
        elif line.startswith("LIFEPOINTS_PASSWORD="):
            env_lines[i] = password_line
            password_found = True
    
    # Add new lines if not found
    if not email_found:
        env_lines.append(email_line)
    if not password_found:
        env_lines.append(password_line)
    
    # Write back to .env file
    with open(env_file, 'w') as f:
        f.writelines(env_lines)
    
    print(f"\nCredentials saved to {env_file}")
    print("You can now run the LifePoints bot with automatic login!")
    print("\nNext steps:")
    print("1. Run 'python3 Tools_Scripts/save_lifepoints_auth.py' to save your login session")
    print("2. Run 'python3 Main_Files_to_Run/run_bot.py --platform lifepoints' to start the bot")
    return True

if __name__ == "__main__":
    setup_credentials()
