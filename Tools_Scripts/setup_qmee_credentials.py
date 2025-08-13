#!/usr/bin/env python3
"""
Setup script for Qmee login credentials
"""

import os
import getpass

def setup_qmee_credentials():
    """Setup Qmee login credentials"""
    print("="*50)
    print("Qmee Login Credentials Setup")
    print("="*50)
    
    # Check if .env file exists
    env_file = ".env"
    if not os.path.exists(env_file):
        print("Creating .env file...")
        with open(env_file, 'w') as f:
            f.write("# Qmee Login Credentials\n")
    
    # Get credentials from user
    print("\nPlease enter your Qmee login credentials:")
    email = input("Email: ").strip()
    password = getpass.getpass("Password: ").strip()
    
    if not email or not password:
        print("Error: Email and password are required!")
        return False
    
    # Read existing .env file
    env_lines = []
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            env_lines = f.readlines()
    
    # Update or add credentials
    email_line = f"QME_EMAIL={email}\n"
    password_line = f"QME_PASSWORD={password}\n"
    
    # Find and replace existing lines or add new ones
    email_found = False
    password_found = False
    
    for i, line in enumerate(env_lines):
        if line.startswith("QME_EMAIL="):
            env_lines[i] = email_line
            email_found = True
        elif line.startswith("QME_PASSWORD="):
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
    
    print(f"\n✅ Credentials saved to {env_file}")
    print("You can now run the bot with automatic login!")
    return True

if __name__ == "__main__":
    setup_qmee_credentials()
