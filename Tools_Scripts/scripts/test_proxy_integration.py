#!/usr/bin/env python3
"""
Test script to verify proxy integration with SurveyBot.
This script tests that the proxy configurations can be loaded and used by the bot system.
"""

import sys
import os
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from proxy_management.proxy_manager_v2ray import V2RayProxyManager, ProxyConfig

def test_proxy_loading():
    """Test loading proxy configurations"""
    print("Testing proxy configuration loading...")
    
    # Test loading from the shadow proxy configs
    manager = V2RayProxyManager(v2ray_path="./v2ray/v2ray")
    
    config_files = [
        "configs/shadow_proxy_configs.json",
        "configs/v2ray_proxies.json"
    ]
    
    for config_file in config_files:
        if os.path.exists(config_file):
            print(f"\nLoading from {config_file}...")
            if manager.load_configs_from_file(config_file):
                print(f"✓ Successfully loaded {len(manager.proxy_configs)} proxy configurations")
                
                # Show some details about the loaded proxies
                for i, config in enumerate(manager.proxy_configs[:3]):  # Show first 3
                    print(f"  {i+1}. {config.name} ({config.protocol}://{config.address}:{config.port})")
                    print(f"     Security: {config.security}, Network: {config.network}")
                
                if len(manager.proxy_configs) > 3:
                    print(f"  ... and {len(manager.proxy_configs) - 3} more")
                
                return True
            else:
                print(f"✗ Failed to load from {config_file}")
        else:
            print(f"✗ Config file {config_file} not found")
    
    return False

def test_bot_integration():
    """Test that the bot can initialize with these proxies"""
    print("\nTesting bot integration...")
    
    try:
        from bot_implementations.survey_bot_v2ray import V2RayEnhancedSurveyBot
        
        # Create bot instance
        bot = V2RayEnhancedSurveyBot()
        print("✓ Bot instance created successfully")
        
        # Test proxy loading in bot
        config_files = [
            "configs/shadow_proxy_configs.json",
            "configs/v2ray_proxies.json"
        ]
        
        for config_file in config_files:
            if os.path.exists(config_file):
                print(f"\nTesting bot proxy loading from {config_file}...")
                if bot.v2ray_manager.load_configs_from_file(config_file):
                    print(f"✓ Bot successfully loaded {len(bot.v2ray_manager.proxy_configs)} proxies")
                    
                    # Test getting best proxy
                    best_proxy = bot.v2ray_manager.get_best_proxy()
                    if best_proxy:
                        print(f"✓ Best proxy selected: {best_proxy.name}")
                    else:
                        print("⚠ No best proxy available (this is normal if proxies haven't been tested)")
                    
                    return True
                else:
                    print(f"✗ Bot failed to load proxies from {config_file}")
        
        return False
        
    except ImportError as e:
        print(f"✗ Could not import bot implementation: {e}")
        return False
    except Exception as e:
        print(f"✗ Error testing bot integration: {e}")
        return False

def show_proxy_summary():
    """Show a summary of the available proxies"""
    print("\n" + "="*50)
    print("PROXY CONFIGURATION SUMMARY")
    print("="*50)
    
    config_files = [
        "configs/shadow_proxy_configs.json",
        "configs/v2ray_proxies.json"
    ]
    
    for config_file in config_files:
        if os.path.exists(config_file):
            print(f"\nConfiguration file: {config_file}")
            try:
                with open(config_file, 'r') as f:
                    configs = json.load(f)
                
                print(f"Total proxies: {len(configs)}")
                
                # Count by protocol
                protocols = {}
                countries = {}
                for config in configs:
                    protocol = config.get('protocol', 'unknown')
                    protocols[protocol] = protocols.get(protocol, 0) + 1
                    
                    country = config.get('name', 'unknown')
                    countries[country] = countries.get(country, 0) + 1
                
                print("By protocol:")
                for protocol, count in protocols.items():
                    print(f"  {protocol}: {count}")
                
                print("By country/region:")
                for country, count in countries.items():
                    print(f"  {country}: {count}")
                
            except Exception as e:
                print(f"Error reading {config_file}: {e}")

def main():
    """Main test function"""
    print("Testing proxy integration with SurveyBot...")
    print("="*50)
    
    # Test 1: Load proxy configurations
    if test_proxy_loading():
        print("\n✓ Proxy loading test passed")
    else:
        print("\n✗ Proxy loading test failed")
        return
    
    # Test 2: Bot integration
    if test_bot_integration():
        print("\n✓ Bot integration test passed")
    else:
        print("\n✗ Bot integration test failed")
        return
    
    # Show summary
    show_proxy_summary()
    
    print("\n" + "="*50)
    print("✓ ALL TESTS PASSED!")
    print("="*50)
    print("\nYour proxy configurations are ready to use!")
    print("\nTo run your bot with these proxies:")
    print("  python run_bot.py --bot v2ray")
    print("\nOr to test a specific bot implementation:")
    print("  python bot_implementations/survey_bot_v2ray.py")

if __name__ == "__main__":
    main()
