#!/usr/bin/env python3
"""
SurveyBot Requirements Checker
Checks if all required dependencies are installed
"""

import sys
import importlib
import subprocess

def check_package(package_name, pip_name=None):
    """Check if a package is installed"""
    if pip_name is None:
        pip_name = package_name
    
    try:
        importlib.import_module(package_name)
        print(f"✅ {package_name}")
        return True
    except ImportError:
        print(f"❌ {package_name} - Install with: pip install {pip_name}")
        return False

def main():
    """Main function"""
    print("📦 SurveyBot Requirements Check")
    print("=" * 40)
    
    # Core dependencies
    core_packages = [
        ("asyncio", None),  # Built-in
        ("json", None),     # Built-in
        ("os", None),       # Built-in
        ("sys", None),      # Built-in
        ("pathlib", None),  # Built-in
        ("subprocess", None), # Built-in
        ("time", None),     # Built-in
        ("random", None),   # Built-in
        ("requests", "requests"),
        ("playwright", "playwright"),
        ("selenium", "selenium"),
        ("undetected_chromedriver", "undetected-chromedriver"),
        ("google.generativeai", "google-generativeai"),
        ("dotenv", "python-dotenv"),
        ("dataclasses", None),  # Built-in (Python 3.7+)
    ]
    
    missing_packages = []
    
    for package, pip_name in core_packages:
        if not check_package(package, pip_name):
            if pip_name:
                missing_packages.append(pip_name)
    
    # Optional dependencies
    optional_packages = [
            # CAPTCHA dependencies removed
        ("numpy", "numpy"),  # For numerical operations
    ]
    
    print("\n📋 Optional Dependencies:")
    for package, pip_name in optional_packages:
        check_package(package, pip_name)
    
    # Summary
    print("\n" + "=" * 40)
    
    if missing_packages:
        print(f"❌ Missing {len(missing_packages)} required packages:")
        for package in missing_packages:
            print(f"   - {package}")
        print(f"\n🔧 Install with: pip install {' '.join(missing_packages)}")
        return False
    else:
        print("✅ All required packages are installed!")
        print("\n🎉 SurveyBot is ready to use!")
        return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
