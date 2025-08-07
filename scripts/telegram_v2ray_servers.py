#!/usr/bin/env python3
"""
Convert Telegram V2Ray servers to bot format
"""

import json
import base64
from typing import List, Dict

def decode_vmess_link(vmess_link: str) -> Dict:
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

def convert_telegram_servers():
    """Convert Telegram V2Ray servers to bot format"""
    
    # Telegram V2Ray servers from the user
    telegram_servers = [
        # Latvia
        "vmess://eyJhZGQiOiIyMTYuMTczLjY5LjI1MCIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoiIiwiaWQiOiI5MTM4MjA5Mi0yMzMwLTQ1NWItOGExYy05YzEyOWNmZTY2MWEiLCJuZXQiOiJ3cyIsInBhdGgiOiIvIiwicG9ydCI6Ijg0NDMiLCJwcyI6IkxhdHZpYSBTaWEiLCJzY3kiOiJhdXRvIiwic25pIjoiIiwidGxzIjoiIiwidHlwZSI6Ii0tLSIsInYiOiIyIn0=",
        
        # United States
        "vmess://eyJhZGQiOiIyMTYuMTI4LjE0OS4zMyIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoiIiwiaWQiOiI3M2ViNjQ1Mi0yMWU1LTQyMDUtYmQzNi01OWEyMGE1MjE3YmEiLCJuZXQiOiJ3cyIsInBhdGgiOiIvIiwicG9ydCI6Ijg0NDMiLCJwcyI6IlVuaXRlZCBTdGF0ZXMgVnVsdHIiLCJzY3kiOiJhdXRvIiwic25pIjoiIiwidGxzIjoiIiwidHlwZSI6Ii0tLSIsInYiOiIyIn0=",
        
        # Canada
        "vmess://eyJhZGQiOiI1MS43OS4xMDIuMjUzIiwiYWlkIjoiMCIsImFscG4iOiIiLCJmcCI6IiIsImhvc3QiOiI1MS43OS4xMDIuMjUzIiwiaWQiOiI1OGZlMTU0Mi01MjkwLTQwYWQtODE1YS03NzcwN2E4MWFmZTUiLCJuZXQiOiJ3cyIsInBhdGgiOiIvSU9lYmhMTWhsMUNUYkZIYkw5NW15ZlJYMiIsInBvcnQiOiI4MCIsInBzIjoiQ2FuYWRhIE9WSCIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoiLS0tIiwidiI6IjIifQ==",
        
        # Japan 1
        "vmess://eyJhZGQiOiI1LjI1My40MS4xNDciLCJhaWQiOiIwIiwiYWxwbiI6IiIsImZwIjoiIiwiaG9zdCI6IiIsImlkIjoiNGIxOTkyY2MtOGU3Yy00MDAzLWE0NWYtYTI4YzNlNmY2ZmE4IiwibmV0IjoidGNwIiwicGF0aCI6IiIsInBvcnQiOiIyNzc1MCIsInBzIjoiSmFwYW4gUFEgSG9zdGluZyIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoibm9uZSIsInYiOiIyIn0=",
        
        # Japan 2
        "vmess://eyJhZGQiOiI0Ny43OS44OC4xMTMiLCJhaWQiOiIwIiwiYWxwbiI6IiIsImZwIjoiIiwiaG9zdCI6IiIsImlkIjoiMWRiODM4ZDAtZWNkMi00YjczLWE3ZjgtNWFmNmI0MDFkODMzIiwibmV0IjoidGNwIiwicGF0aCI6IiIsInBvcnQiOiI1MzcxMCIsInBzIjoiSmFwYW4gQWxpYmFiYSBDbG91ZCIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoibm9uZSIsInYiOiIyIn0=",
        
        # Singapore 1
        "vmess://eyJhZGQiOiIxOTIuNTMuMTEzLjE1NiIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoiIiwiaWQiOiIwMzZhMjhjMy01YzhkLTRkZjMtYTc5Yi05ZGE2MjI2NDBmMmIiLCJuZXQiOiJ0Y3AiLCJwYXRoIjoiIiwicG9ydCI6IjEwMDAyIiwicHMiOiJTaW5nYXBvcmUgQWthbWFpIiwic2N5IjoiYXV0byIsInNuaSI6IiIsInRscyI6IiIsInR5cGUiOiJub25lIiwidiI6IjIifQ==",
        
        # Singapore 2
        "vmess://eyJhZGQiOiIxOTQuMjMzLjcyLjIyOCIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoiIiwiaWQiOiIxNjUwOTI2Mi1kYmUyLTQzYmEtOTljZS0wNzkxM2QyYTE4YjQiLCJuZXQiOiJ0Y3AiLCJwYXRoIjoiIiwicG9ydCI6IjI3NTc1IiwicHMiOiJTaW5nYXBvcmUgQ29udGFibyIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoibm9uZSIsInYiOiIyIn0=",
        
        # Germany
        "vmess://eyJhZGQiOiIxMDQuMTcuMTc2LjE3MSIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0Ijoia2U3aHozNmV3ei00NTE1MDE3NDczLm1hc2hhbGxhaGJldC5jb20iLCJpZCI6IjZjYmM5Yzc4LTFjYjEtNTdkNC1hOTk5LWUyZjRlMzRjMWUwMyIsIm5ldCI6IndzIiwicGF0aCI6Ii9uYXNuZXQvY2RuIiwicG9ydCI6IjgwODAiLCJwcyI6Ikdlcm1hbiBSZWxheSIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoiLS0tIiwidiI6IjIifQ==",
        
        # CloudFlare Relayed
        "vmess://eyJhZGQiOiJ1czAxLnNoLWNsb3VkZmxhcmUuc2JzIiwiYWlkIjoiMCIsImFscG4iOiIiLCJmcCI6IiIsImhvc3QiOiJ1czAxLnNoLWNsb3VkZmxhcmUuc2JzIiwiaWQiOiJmMTA1OThlMi1jNjA2LTQ5NDUtYmZkZS1lNTczMDc1NmEyZGQiLCJuZXQiOiJ3cyIsInBhdGgiOiIvIiwicG9ydCI6Ijg0NDMiLCJwcyI6IkNsb3VkRmxhcmUgUmVsYXllZCIsInNjeSI6ImF1dG8iLCJzbmkiOiJ1czAxLnNoLWNsb3VkZmxhcmUuc2JzIiwidGxzIjoidGxzIiwidHlwZSI6Ii0tLSIsInYiOiIyIn0=",
        
        # USA OVH
        "vmess://eyJhZGQiOiIxNzIuNjYuMTY4LjIwOSIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoibWFYTkV0VklQLXVzQS1WUDMubkVUS0gzLlNpVEUiLCJpZCI6IjU0MjhkY2MyLTk5NTAtNDQwNC1iOGE1LTlkYWM4MmFjYjIxMCIsIm5ldCI6IndzIiwicGF0aCI6Ii9saW5rd3MiLCJwb3J0IjoiNDQzIiwicHMiOiJVbml0ZWQgU3RhdGVzIE9WSCIsInNjeSI6ImF1dG8iLCJzbmkiOiJtYVhORXRWSVAtdXNBLVZQMy5uRVRLSDMuU2lURSIsInRscyI6InRscyIsInR5cGUiOiItLS0iLCJ2IjoiMiJ9"
    ]
    
    print("=== Converting Telegram V2Ray Servers ===\n")
    
    bot_configs = []
    
    for i, vmess_link in enumerate(telegram_servers):
        try:
            config = decode_vmess_link(vmess_link)
            if config:
                # Extract server name from the decoded config
                decoded = base64.b64decode(vmess_link[8:]).decode('utf-8')
                vmess_config = json.loads(decoded)
                server_name = vmess_config.get('ps', f'telegram_server_{i+1}')
                
                config['name'] = f"vmess_{server_name}"
                bot_configs.append(config)
                
                print(f"✅ Converted: {config['name']} ({config['address']}:{config['port']})")
            else:
                print(f"❌ Failed to convert server {i+1}")
        except Exception as e:
            print(f"❌ Error converting server {i+1}: {e}")
    
    # Save to file
    if bot_configs:
        with open('v2ray_proxies.json', 'w') as f:
            json.dump(bot_configs, f, indent=2)
        
        print(f"\n🎉 Successfully converted {len(bot_configs)} servers!")
        print("📁 Saved to: v2ray_proxies.json")
        
        # Show server details
        print("\n📊 Server Details:")
        for config in bot_configs:
            print(f"  • {config['name']}: {config['address']}:{config['port']} ({config['network']})")
        
        return True
    else:
        print("❌ No servers were converted successfully")
        return False

if __name__ == "__main__":
    convert_telegram_servers()
