#!/usr/bin/env python3
"""
V2Ray Configuration Converter
Converts V2Ray configurations from Telegram groups to bot format
"""

import json
import base64
import re
from urllib.parse import urlparse, parse_qs
from typing import Dict, List, Optional

def decode_vmess_link(vmess_link: str) -> Optional[Dict]:
    """Decode VMess link to configuration"""
    try:
        # Remove vmess:// prefix
        if vmess_link.startswith('vmess://'):
            encoded = vmess_link[8:]
        else:
            encoded = vmess_link
            
        # Decode base64
        decoded = base64.b64decode(encoded).decode('utf-8')
        
        # Parse JSON
        config = json.loads(decoded)
        
        return {
            'name': f"vmess_{config.get('ps', 'server')}",
            'protocol': 'vmess',
            'address': config.get('add', ''),
            'port': int(config.get('port', 443)),
            'uuid': config.get('id', ''),
            'security': config.get('tls', 'none'),
            'network': config.get('net', 'tcp'),
            'path': config.get('path', ''),
            'host': config.get('host', ''),
            'sni': config.get('sni', ''),
            'fp': 'chrome'
        }
    except Exception as e:
        print(f"Error decoding VMess link: {e}")
        return None

def parse_v2ray_json(json_config: str) -> Optional[Dict]:
    """Parse V2Ray JSON configuration"""
    try:
        config = json.loads(json_config)
        
        # Extract outbound configuration
        outbounds = config.get('outbounds', [])
        for outbound in outbounds:
            if outbound.get('protocol') == 'vmess':
                servers = outbound.get('settings', {}).get('vnext', [])
                if servers:
                    server = servers[0]
                    users = server.get('users', [])
                    if users:
                        user = users[0]
                        
                        # Get stream settings
                        stream_settings = outbound.get('streamSettings', {})
                        
                        return {
                            'name': f"vmess_{server.get('address', 'server')}",
                            'protocol': 'vmess',
                            'address': server.get('address', ''),
                            'port': int(server.get('port', 443)),
                            'uuid': user.get('id', ''),
                            'security': stream_settings.get('security', 'none'),
                            'network': stream_settings.get('network', 'tcp'),
                            'path': stream_settings.get('wsSettings', {}).get('path', ''),
                            'host': stream_settings.get('wsSettings', {}).get('headers', {}).get('Host', ''),
                            'sni': stream_settings.get('tlsSettings', {}).get('serverName', ''),
                            'fp': 'chrome'
                        }
        return None
    except Exception as e:
        print(f"Error parsing V2Ray JSON: {e}")
        return None

def convert_telegram_config_to_bot_format(telegram_config: str) -> Optional[Dict]:
    """Convert Telegram V2Ray configuration to bot format"""
    
    # Try VMess link format
    if telegram_config.startswith('vmess://'):
        return decode_vmess_link(telegram_config)
    
    # Try JSON format
    if telegram_config.strip().startswith('{'):
        return parse_v2ray_json(telegram_config)
    
    # Try to extract VMess link from text
    vmess_match = re.search(r'vmess://[A-Za-z0-9+/=]+', telegram_config)
    if vmess_match:
        return decode_vmess_link(vmess_match.group())
    
    return None

def create_bot_proxy_config(telegram_configs: List[str]) -> List[Dict]:
    """Convert multiple Telegram configurations to bot format"""
    bot_configs = []
    
    for i, config in enumerate(telegram_configs):
        converted = convert_telegram_config_to_bot_format(config)
        if converted:
            # Ensure unique name
            converted['name'] = f"{converted['name']}_{i+1}"
            bot_configs.append(converted)
    
    return bot_configs

def save_bot_configs(configs: List[Dict], filename: str = "v2ray_proxies.json"):
    """Save bot configurations to file"""
    try:
        with open(filename, 'w') as f:
            json.dump(configs, f, indent=2)
        print(f"Saved {len(configs)} configurations to {filename}")
        return True
    except Exception as e:
        print(f"Error saving configurations: {e}")
        return False

def main():
    """Main function for testing"""
    print("=== V2Ray Configuration Converter ===\n")
    
    # Example configurations from Telegram groups
    example_configs = [
        # Example VMess link (replace with real ones from Telegram)
        "vmess://eyJhZGQiOiJleGFtcGxlLmNvbSIsImFpZCI6IjAiLCJpZCI6IjEyMzQ1Njc4LTEyMzQtMTIzNC0xMjM0LTEyMzQ1Njc4OTAxMiIsIm5ldCI6IndzIiwicG9ydCI6IjQ0MyIsInBzIjoiRXhhbXBsZSBWbWVzcyBTZXJ2ZXIiLCJ0bHMiOiJ0bHMiLCJ2IjoiMiIsInBhdGgiOiIvcGF0aCIsImhvc3QiOiJleGFtcGxlLmNvbSIsInNuaSI6ImV4YW1wbGUuY29tIn0=",
        
        # Example JSON config (replace with real ones from Telegram)
        '''{
            "outbounds": [{
                "protocol": "vmess",
                "settings": {
                    "vnext": [{
                        "address": "example.com",
                        "port": 443,
                        "users": [{
                            "id": "12345678-1234-1234-1234-123456789012",
                            "alterId": 0
                        }]
                    }]
                },
                "streamSettings": {
                    "network": "ws",
                    "security": "tls",
                    "wsSettings": {
                        "path": "/path",
                        "headers": {
                            "Host": "example.com"
                        }
                    },
                    "tlsSettings": {
                        "serverName": "example.com"
                    }
                }
            }]
        }'''
    ]
    
    print("Converting example configurations...")
    bot_configs = create_bot_proxy_config(example_configs)
    
    if bot_configs:
        print(f"\nConverted {len(bot_configs)} configurations:")
        for config in bot_configs:
            print(f"- {config['name']}: {config['address']}:{config['port']}")
        
        # Save to file
        save_bot_configs(bot_configs)
    else:
        print("No valid configurations found")

if __name__ == "__main__":
    main()
