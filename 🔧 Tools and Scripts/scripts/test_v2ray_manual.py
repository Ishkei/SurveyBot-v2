#!/usr/bin/env python3
"""
Manual test for V2Ray proxy functionality
"""

import os
import sys
import time
import requests
from pathlib import Path

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent))

from proxy_management.proxy_manager_v2ray import V2RayProxyManager

def test_v2ray_proxy():
    """Test V2Ray proxy manually"""
    print("🧪 Testing V2Ray Proxy Manually")
    print("=" * 50)
    
    # Initialize V2Ray manager with correct path
    v2ray_path = os.path.abspath("./v2ray/v2ray")
    print(f"Using V2Ray path: {v2ray_path}")
    
    manager = V2RayProxyManager(v2ray_path=v2ray_path)
    
    # Load configurations
    config_file = "configs/v2ray_proxies.json"
    if not os.path.exists(config_file):
        print(f"❌ Config file not found: {config_file}")
        return False
    
    print(f"Loading configs from: {config_file}")
    if not manager.load_configs_from_file(config_file):
        print("❌ Failed to load configurations")
        return False
    
    print(f"✅ Loaded {len(manager.proxy_configs)} proxy configurations")
    
    # Get best proxy
    best_proxy = manager.get_best_proxy()
    if not best_proxy:
        print("❌ No working proxies available")
        return False
    
    print(f"✅ Selected proxy: {best_proxy.name}")
    print(f"   Protocol: {best_proxy.protocol}")
    print(f"   Address: {best_proxy.address}:{best_proxy.port}")
    
    # Start proxy
    print(f"🚀 Starting V2Ray proxy...")
    if not manager.start_proxy(best_proxy, 1080):
        print("❌ Failed to start V2Ray proxy")
        return False
    
    print("✅ V2Ray proxy started successfully")
    
    # Wait a moment
    time.sleep(3)
    
    # Test connection
    print("🌐 Testing proxy connection...")
    try:
        proxies = {
            'http': 'socks5://127.0.0.1:1080',
            'https': 'socks5://127.0.0.1:1080'
        }
        
        response = requests.get(
            'https://httpbin.org/ip',
            proxies=proxies,
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Proxy working! IP: {result.get('origin', 'unknown')}")
            
            # Test Qmee connection
            print("🔗 Testing Qmee connection...")
            try:
                qmee_response = requests.get(
                    'https://www.qmee.com',
                    proxies=proxies,
                    timeout=10
                )
                print(f"✅ Qmee connection: {qmee_response.status_code}")
            except Exception as e:
                print(f"⚠️  Qmee connection failed: {e}")
            
            return True
        else:
            print(f"❌ Proxy test failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Proxy test failed: {e}")
        return False
    finally:
        # Stop proxy
        print("🛑 Stopping V2Ray proxy...")
        manager.stop_proxy()

if __name__ == "__main__":
    success = test_v2ray_proxy()
    if success:
        print("\n🎉 V2Ray proxy test PASSED!")
    else:
        print("\n❌ V2Ray proxy test FAILED!")
