#!/usr/bin/env python3
"""
Test standard HTTP/HTTPS/SOCKS proxies using the StandardProxyManager.
This script tests the standard proxies that don't require V2Ray.
"""

import sys
import os
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from proxy_management.proxy_manager_standard import StandardProxyManager

def test_standard_proxies():
    """Test standard HTTP/HTTPS/SOCKS proxies"""
    print("Testing standard HTTP/HTTPS/SOCKS proxies...")
    print("="*60)
    
    # Create proxy manager
    manager = StandardProxyManager()
    
    # Load standard proxies from file
    config_files = [
        "configs/standard_proxies.json",
        "configs/sample_standard_proxies.json"
    ]
    
    config_loaded = False
    for config_file in config_files:
        if os.path.exists(config_file):
            print(f"Loading standard proxies from {config_file}...")
            if manager.load_proxies_from_file(config_file):
                config_loaded = True
                print(f"✓ Loaded {len(manager.proxies)} standard proxy configurations")
                break
    
    if not config_loaded:
        print("No standard proxy configuration files found. Creating sample configurations...")
        from proxy_management.proxy_manager_standard import create_sample_standard_proxies
        create_sample_standard_proxies()
        manager.load_proxies_from_file("configs/sample_standard_proxies.json")
    
    if not manager.proxies:
        print("No standard proxies available for testing")
        return
    
    print(f"\nTesting {len(manager.proxies)} standard proxy configurations...")
    
    # Test all proxies
    working_proxies = manager.test_all_proxies(timeout=10)
    
    if working_proxies:
        print(f"\nFound {len(working_proxies)} working standard proxies:")
        for i, proxy in enumerate(working_proxies):
            print(f"  {i+1}. {proxy.name}")
            print(f"     Protocol: {proxy.protocol}")
            print(f"     Address: {proxy.ip}:{proxy.port}")
            print(f"     Response time: {proxy.avg_response_time:.2f}s")
            print()
        
        # Save working proxies
        manager.save_working_proxies("configs/working_standard_proxies.json")
        
        # Show best proxy
        best_proxy = manager.get_best_proxy()
        if best_proxy:
            print(f"Best performing proxy: {best_proxy.name}")
            print(f"  Protocol: {best_proxy.protocol}")
            print(f"  Address: {best_proxy.ip}:{best_proxy.port}")
            print(f"  Success rate: {best_proxy.success_count}/{best_proxy.success_count + best_proxy.failure_count}")
            print(f"  Avg response time: {best_proxy.avg_response_time:.2f}s")
    else:
        print("\nNo working standard proxies found")
    
    return working_proxies

def show_proxy_summary():
    """Show a summary of available standard proxies"""
    print("\n" + "="*60)
    print("STANDARD PROXY SUMMARY")
    print("="*60)
    
    # Check for working standard proxies
    if os.path.exists("configs/working_standard_proxies.json"):
        with open("configs/working_standard_proxies.json", 'r') as f:
            working_proxies = json.load(f)
        
        print(f"\nWorking standard proxies: {len(working_proxies)}")
        for proxy in working_proxies:
            print(f"  • {proxy['name']} ({proxy['protocol']}://{proxy['ip']}:{proxy['port']})")
    else:
        print("\nNo working standard proxies found")
    
    # Check for all standard proxies
    if os.path.exists("configs/standard_proxies.json"):
        with open("configs/standard_proxies.json", 'r') as f:
            all_proxies = json.load(f)
        
        print(f"\nTotal standard proxies: {len(all_proxies)}")
        
        # Count by protocol
        protocols = {}
        for proxy in all_proxies:
            protocol = proxy.get('protocol', 'unknown')
            protocols[protocol] = protocols.get(protocol, 0) + 1
        
        print("\nBy protocol:")
        for protocol, count in protocols.items():
            print(f"  {protocol}: {count}")

def show_usage_instructions():
    """Show instructions for using standard proxies"""
    print("\n" + "="*60)
    print("USAGE INSTRUCTIONS")
    print("="*60)
    
    print("\n1. Test standard proxies:")
    print("   python scripts/test_standard_proxies.py")
    
    print("\n2. Use standard proxies in your bot:")
    print("   # Import the standard proxy manager")
    print("   from proxy_management.proxy_manager_standard import StandardProxyManager")
    print("   ")
    print("   # Create manager and load working proxies")
    print("   manager = StandardProxyManager()")
    print("   manager.load_proxies_from_file('configs/working_standard_proxies.json')")
    print("   ")
    print("   # Get proxy for requests")
    print("   proxy_dict = manager.get_current_proxy_dict()")
    print("   response = requests.get('https://example.com', proxies=proxy_dict)")
    
    print("\n3. Test all proxy types:")
    print("   python run_bot.py --test-proxies")

def main():
    """Main test function"""
    print("STANDARD PROXY TESTING")
    print("="*60)
    
    # Test standard proxies
    working_proxies = test_standard_proxies()
    
    # Show summary
    show_proxy_summary()
    
    # Show usage instructions
    show_usage_instructions()
    
    print("\n" + "="*60)
    if working_proxies:
        print("✅ STANDARD PROXY TEST COMPLETED SUCCESSFULLY!")
        print(f"Found {len(working_proxies)} working standard proxies")
    else:
        print("⚠️  STANDARD PROXY TEST COMPLETED")
        print("No working standard proxies found")
    print("="*60)

if __name__ == "__main__":
    main()
