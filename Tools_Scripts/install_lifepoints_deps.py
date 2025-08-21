#!/usr/bin/env python3
"""
Quick installation script for LifePoints dependencies
"""

import os
import sys
import subprocess
from pathlib import Path

def run_command(command, description):
    """Run a command and show progress"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"   Error: {e}")
        if e.stdout:
            print(f"   Output: {e.stdout}")
        if e.stderr:
            print(f"   Error: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8+ is required")
        print(f"   Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible")
    return True

def check_virtual_environment():
    """Check if virtual environment is activated"""
    if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("✅ Virtual environment is activated")
        return True
    else:
        print("⚠️ Virtual environment may not be activated")
        print("   Consider running: source venv/bin/activate")
        return False

def install_dependencies():
    """Install required dependencies"""
    print("\n📦 Installing LifePoints dependencies...")
    
    # Check if pip is available
    try:
        import pip
        print("✅ pip is available")
    except ImportError:
        print("❌ pip is not available")
        return False
    
    # Try to install playwright
    if not run_command("pip install playwright", "Installing Playwright"):
        return False
    
    # Try to install browsers
    if not run_command("playwright install", "Installing Playwright browsers"):
        return False
    
    return True

def verify_installation():
    """Verify that dependencies are properly installed"""
    print("\n🔍 Verifying installation...")
    
    try:
        import playwright
        print("✅ Playwright module imported successfully")
        
        # Check if browsers are installed
        from playwright.async_api import async_playwright
        print("✅ Playwright async API available")
        
        # Try to get browser path
        import subprocess
        result = subprocess.run(["playwright", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Playwright CLI available: {result.stdout.strip()}")
        else:
            print("⚠️ Playwright CLI may not be working properly")
        
        return True
        
    except ImportError as e:
        print(f"❌ Failed to import Playwright: {e}")
        return False

def main():
    """Main installation function"""
    print("🚀 LifePoints Dependencies Installer")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Check virtual environment
    check_virtual_environment()
    
    # Install dependencies
    if not install_dependencies():
        print("\n❌ Installation failed. Please check the errors above.")
        sys.exit(1)
    
    # Verify installation
    if not verify_installation():
        print("\n❌ Installation verification failed.")
        sys.exit(1)
    
    print("\n🎉 All dependencies installed successfully!")
    print("\n📋 Next steps:")
    print("1. Set up your LifePoints credentials:")
    print("   python3 Tools_Scripts/setup_lifepoints_credentials.py")
    print("\n2. Save your authentication session:")
    print("   python3 Tools_Scripts/save_lifepoints_auth.py")
    print("\n3. Run the LifePoints bot:")
    print("   python3 Main_Files_to_Run/run_bot.py --platform lifepoints")
    
    print("\n💡 If you encounter any issues, try:")
    print("   source venv/bin/activate")
    print("   pip install --upgrade playwright")
    print("   playwright install --force")

if __name__ == "__main__":
    main()
