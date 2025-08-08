#!/usr/bin/env python3
"""
SurveyBot Setup Script
Automatically sets up the environment and dependencies
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ is required")
        return False
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    return True

def create_virtual_environment():
    """Create virtual environment if it doesn't exist"""
    if not os.path.exists("venv"):
        return run_command("python -m venv venv", "Creating virtual environment")
    else:
        print("✅ Virtual environment already exists")
        return True

def install_dependencies():
    """Install Python dependencies"""
    return run_command("pip install -r requirements.txt", "Installing dependencies")

def setup_v2ray():
    """Setup V2Ray system"""
    return run_command("python scripts/setup_v2ray.py", "Setting up V2Ray")

def create_env_file():
    """Create .env file if it doesn't exist"""
    if not os.path.exists(".env"):
        print("📝 Creating .env file...")
        env_content = """# API Keys
GOOGLE_API_KEY=your_google_api_key_here

# Browser Settings
BROWSER_TYPE=v2ray
HEADLESS=false

# Survey Platform
SURVEY_PLATFORM=qmee

# Proxy Settings (optional)
PROXY_HOST=
PROXY_PORT=
PROXY_USER=
PROXY_PASS=
"""
        with open(".env", "w") as f:
            f.write(env_content)
        print("✅ .env file created - please update with your API keys")
        return True
    else:
        print("✅ .env file already exists")
        return True

def test_setup():
    """Test the setup"""
    return run_command("python scripts/test_implementations.py", "Testing setup")

def main():
    """Main setup function"""
    print("🚀 SurveyBot Setup")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Create virtual environment
    if not create_virtual_environment():
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    # Setup V2Ray
    if not setup_v2ray():
        print("⚠️ V2Ray setup failed, but continuing...")
    
    # Create .env file
    if not create_env_file():
        sys.exit(1)
    
    # Test setup
    if not test_setup():
        print("⚠️ Setup test failed, but installation completed")
    
    print("\n🎉 Setup completed!")
    print("\n📋 Next steps:")
    print("1. Edit .env file with your API keys")
    print("2. Run: python run_bot.py --implementation v2ray")
    print("3. Check docs/ for detailed guides")

if __name__ == "__main__":
    main()
