#!/usr/bin/env python3
"""
Test script to run the bot with working proxy configurations.
This script tests the bot with the proxies that were verified to work.
"""

import sys
import os
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def test_bot_with_working_proxies():
    """Test the bot with working proxy configurations"""
    print("Testing bot with working proxies...")
    
    # Check if working proxies exist
    working_proxy_file = "configs/working_proxies.json"
    if not os.path.exists(working_proxy_file):
        print("No working proxies found. Run 'python run_bot.py --test-proxies' first.")
        return False
    
    # Load working proxies
    try:
        with open(working_proxy_file, 'r') as f:
            working_proxies = json.load(f)
        
        print(f"Found {len(working_proxies)} working proxy configurations")
        
        # Show working proxy details
        for i, proxy in enumerate(working_proxies):
            print(f"\nWorking Proxy {i+1}:")
            print(f"  Name: {proxy['name']}")
            print(f"  Protocol: {proxy['protocol']}")
            print(f"  Address: {proxy['address']}:{proxy['port']}")
            print(f"  Security: {proxy['security']}")
            print(f"  Network: {proxy['network']}")
            if proxy.get('host'):
                print(f"  Host: {proxy['host']}")
            if proxy.get('sni'):
                print(f"  SNI: {proxy['sni']}")
        
        # Test bot initialization with working proxies
        print("\nTesting bot initialization with working proxies...")
        
        try:
            from bot_implementations.survey_bot_v2ray import V2RayEnhancedSurveyBot
            
            # Create bot instance
            bot = V2RayEnhancedSurveyBot()
            print("✓ Bot instance created successfully")
            
            # Load working proxies
            if bot.v2ray_manager.load_configs_from_file(working_proxy_file):
                print(f"✓ Bot loaded {len(bot.v2ray_manager.proxy_configs)} working proxies")
                
                # Test getting best proxy
                best_proxy = bot.v2ray_manager.get_best_proxy()
                if best_proxy:
                    print(f"✓ Best proxy selected: {best_proxy.name}")
                    print(f"  Address: {best_proxy.address}:{best_proxy.port}")
                    print(f"  Protocol: {best_proxy.protocol}")
                    print(f"  Security: {best_proxy.security}")
                    print(f"  Network: {best_proxy.network}")
                    
                    # Test starting the proxy
                    print("\nTesting proxy startup...")
                    if bot.v2ray_manager.start_proxy(best_proxy, 1080):
                        print("✓ Proxy started successfully")
                        
                        # Test browser initialization
                        print("\nTesting browser initialization...")
                        try:
                            bot.initialize_browser()
                            print("✓ Browser initialized successfully with proxy")
                            
                            # Clean up
                            bot.v2ray_manager.stop_proxy()
                            if bot.driver:
                                bot.driver.quit()
                            
                            return True
                            
                        except Exception as e:
                            print(f"✗ Browser initialization failed: {e}")
                            bot.v2ray_manager.stop_proxy()
                            return False
                    else:
                        print("✗ Failed to start proxy")
                        return False
                else:
                    print("✗ No best proxy available")
                    return False
            else:
                print("✗ Failed to load working proxies")
                return False
                
        except ImportError as e:
            print(f"✗ Could not import bot implementation: {e}")
            return False
        except Exception as e:
            print(f"✗ Error testing bot: {e}")
            import traceback
            traceback.print_exc()
            return False
            
    except Exception as e:
        print(f"Error loading working proxies: {e}")
        return False

def show_usage_instructions():
    """Show instructions for using the bot with proxies"""
    print("\n" + "="*60)
    print("USAGE INSTRUCTIONS")
    print("="*60)
    
    print("\n1. Run the bot with V2Ray proxy support:")
    print("   python run_bot.py --bot v2ray")
    
    print("\n2. Or test the V2Ray bot directly:")
    print("   python bot_implementations/survey_bot_v2ray.py")
    
    print("\n3. To test more proxies:")
    print("   python run_bot.py --test-proxies")
    
    print("\n4. To see all available options:")
    print("   python run_bot.py --help")
    
    print("\n" + "="*60)
    print("PROXY FEATURES")
    print("="*60)
    
    print("\n✅ Automatic proxy rotation")
    print("✅ Best proxy selection based on performance")
    print("✅ Fallback to working proxies if one fails")
    print("✅ Geographic diversity (multiple countries)")
    print("✅ Protocol diversity (VLESS and Trojan)")
    print("✅ Performance monitoring and statistics")

def main():
    """Main test function"""
    print("Testing bot with working proxy configurations...")
    print("="*60)
    
    if test_bot_with_working_proxies():
        print("\n" + "="*60)
        print("✅ BOT TEST PASSED!")
        print("="*60)
        print("\nYour bot is ready to run with working proxies!")
        
        show_usage_instructions()
        
    else:
        print("\n" + "="*60)
        print("❌ BOT TEST FAILED")
        print("="*60)
        print("\nThere were issues with the bot setup.")
        print("Check the error messages above for details.")
        
        show_usage_instructions()

if __name__ == "__main__":
    main()
