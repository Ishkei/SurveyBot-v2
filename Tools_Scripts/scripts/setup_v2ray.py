#!/usr/bin/env python3
"""
V2Ray Setup Script for Survey Bot
This script installs V2Ray and sets up the enhanced proxy system.
"""

import os
import sys
import subprocess
import platform
import json
import requests
from pathlib import Path

def check_system():
    """Check system information"""
    system = platform.system().lower()
    machine = platform.machine().lower()
    
    print(f"System: {system}")
    print(f"Architecture: {machine}")
    
    return system, machine

def download_v2ray(system, machine):
    """Download V2Ray binary"""
    # V2Ray download URLs
    base_url = "https://github.com/v2fly/v2ray-core/releases/latest/download"
    
    if system == "linux":
        if "x86_64" in machine or "amd64" in machine:
            url = f"{base_url}/v2ray-linux-64.zip"
        elif "arm" in machine:
            url = f"{base_url}/v2ray-linux-arm64-v8a.zip"
        else:
            url = f"{base_url}/v2ray-linux-32.zip"
    elif system == "darwin":  # macOS
        if "arm" in machine:
            url = f"{base_url}/v2ray-darwin-arm64-v8a.zip"
        else:
            url = f"{base_url}/v2ray-darwin-64.zip"
    elif system == "windows":
        url = f"{base_url}/v2ray-windows-64.zip"
    else:
        print(f"Unsupported system: {system}")
        return False
    
    print(f"Downloading V2Ray from: {url}")
    
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Create v2ray directory
        v2ray_dir = Path("v2ray")
        v2ray_dir.mkdir(exist_ok=True)
        
        # Download and extract
        import zipfile
        import io
        
        with zipfile.ZipFile(io.BytesIO(response.content)) as zip_file:
            zip_file.extractall(v2ray_dir)
        
        # Make executable on Unix systems
        if system != "windows":
            v2ray_bin = v2ray_dir / "v2ray"
            if v2ray_bin.exists():
                v2ray_bin.chmod(0o755)
        
        print("V2Ray downloaded and extracted successfully")
        return True
        
    except Exception as e:
        print(f"Error downloading V2Ray: {e}")
        return False

def test_v2ray():
    """Test V2Ray installation"""
    try:
        v2ray_path = Path("v2ray/v2ray")
        if not v2ray_path.exists():
            v2ray_path = Path("v2ray/v2ray.exe")  # Windows
        
        if not v2ray_path.exists():
            print("V2Ray binary not found")
            return False
        
        # Test V2Ray version
        result = subprocess.run([str(v2ray_path), "version"], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"V2Ray installed successfully: {result.stdout.strip()}")
            return True
        else:
            print(f"V2Ray test failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"Error testing V2Ray: {e}")
        return False

def create_sample_proxy_configs():
    """Create sample proxy configurations"""
    sample_configs = [
        {
            "name": "vmess_sample_1",
            "protocol": "vmess",
            "address": "example1.com",
            "port": 443,
            "uuid": "12345678-1234-1234-1234-123456789012",
            "security": "tls",
            "network": "ws",
            "path": "/path1",
            "host": "example1.com",
            "sni": "example1.com",
            "fp": "chrome"
        },
        {
            "name": "vless_sample_1",
            "protocol": "vless",
            "address": "example2.com",
            "port": 443,
            "uuid": "87654321-4321-4321-4321-210987654321",
            "security": "tls",
            "network": "ws",
            "path": "/path2",
            "host": "example2.com",
            "sni": "example2.com",
            "fp": "chrome"
        },
        {
            "name": "trojan_sample_1",
            "protocol": "trojan",
            "address": "example3.com",
            "port": 443,
            "password": "your_password_here",
            "security": "tls",
            "network": "tcp",
            "sni": "example3.com",
            "fp": "chrome"
        }
    ]
    
    try:
        with open("v2ray_proxies.json", "w") as f:
            json.dump(sample_configs, f, indent=2)
        
        print("Created sample V2Ray proxy configurations in v2ray_proxies.json")
        print("Please edit this file with your actual proxy server details")
        return True
        
    except Exception as e:
        print(f"Error creating sample configs: {e}")
        return False

def create_v2ray_config():
    """Create V2Ray configuration directory"""
    try:
        config_dir = Path("v2ray_configs")
        config_dir.mkdir(exist_ok=True)
        
        print("Created V2Ray configuration directory")
        return True
        
    except Exception as e:
        print(f"Error creating config directory: {e}")
        return False

def install_dependencies():
    """Install Python dependencies"""
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", 
                       "requests", "google-generativeai", "python-dotenv"], 
                      check=True)
        print("Python dependencies installed")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"Error installing dependencies: {e}")
        return False

def main():
    """Main setup function"""
    print("=== V2Ray Setup for Survey Bot ===\n")
    
    # Check system
    system, machine = check_system()
    
    # Install Python dependencies
    print("\n1. Installing Python dependencies...")
    if not install_dependencies():
        print("Failed to install dependencies")
        return False
    
    # Download V2Ray
    print("\n2. Downloading V2Ray...")
    if not download_v2ray(system, machine):
        print("Failed to download V2Ray")
        return False
    
    # Test V2Ray
    print("\n3. Testing V2Ray installation...")
    if not test_v2ray():
        print("Failed to test V2Ray")
        return False
    
    # Create configuration directory
    print("\n4. Creating configuration directory...")
    if not create_v2ray_config():
        print("Failed to create config directory")
        return False
    
    # Create sample proxy configurations
    print("\n5. Creating sample proxy configurations...")
    if not create_sample_proxy_configs():
        print("Failed to create sample configs")
        return False
    
    print("\n=== Setup Complete! ===")
    print("\nNext steps:")
    print("1. Edit v2ray_proxies.json with your actual proxy server details")
    print("2. Test the V2Ray proxy manager: python v2ray_proxy_manager.py")
    print("3. Run the enhanced bot: python bot_v2ray_enhanced.py")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
