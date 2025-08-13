#!/usr/bin/env python3
"""
Parse VMess proxy URLs and add them to existing proxy configurations.
This script handles VMess protocol which is different from VLESS/Trojan.
"""

import re
import json
import base64
import urllib.parse
from typing import Dict, List, Optional
from dataclasses import dataclass
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

@dataclass
class ParsedVMess:
    """Parsed VMess configuration"""
    protocol: str = "vmess"
    address: str = ""
    port: int = 443
    uuid: str = ""
    security: str = "auto"
    network: str = "tcp"
    path: str = ""
    host: str = ""
    sni: str = ""
    alpn: str = "h2,http/1.1"
    fp: str = "chrome"
    name: str = ""

def parse_vmess_url(url: str) -> Optional[ParsedVMess]:
    """Parse VMess URL format"""
    try:
        # Remove vmess:// prefix
        if not url.startswith('vmess://'):
            return None
        
        url = url[8:]  # Remove 'vmess://'
        
        # VMess URLs are base64 encoded
        try:
            decoded = base64.b64decode(url).decode('utf-8')
        except Exception as e:
            print(f"Error decoding base64: {e}")
            return None
        
        # Parse the JSON configuration
        try:
            config = json.loads(decoded)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            return None
        
        # Extract configuration
        address = config.get('add', '')
        port = int(config.get('port', 443))
        uuid = config.get('id', '')
        security = config.get('security', 'auto')
        network = config.get('net', 'tcp')
        path = config.get('path', '')
        host = config.get('host', '')
        sni = config.get('sni', '')
        alpn = config.get('alpn', 'h2,http/1.1')
        fp = config.get('fp', 'chrome')
        name = config.get('ps', '')  # VMess uses 'ps' for name
        
        # Clean up the name
        if name:
            name = name.replace('Channel id: ', '').replace('@ShadowProxy66 ', '').strip()
            if not name:
                name = f"vmess_{address}_{port}"
        else:
            name = f"vmess_{address}_{port}"
        
        return ParsedVMess(
            protocol="vmess",
            address=address,
            port=port,
            uuid=uuid,
            security=security,
            network=network,
            path=path,
            host=host,
            sni=sni,
            alpn=alpn,
            fp=fp,
            name=name
        )
        
    except Exception as e:
        print(f"Error parsing VMess URL: {e}")
        return None

def convert_vmess_to_dict(parsed: ParsedVMess) -> Dict:
    """Convert parsed VMess to dictionary format"""
    return {
        'name': parsed.name,
        'protocol': parsed.protocol,
        'address': parsed.address,
        'port': parsed.port,
        'uuid': parsed.uuid,
        'password': "",
        'security': parsed.security,
        'network': parsed.network,
        'path': parsed.path,
        'host': parsed.host,
        'sni': parsed.sni,
        'alpn': parsed.alpn,
        'fp': parsed.fp,
        'pbk': "",
        'sid': "",
        'spx': "",
        'flow': "",
        'encryption': "none",
        'plugin': "",
        'plugin_opts': ""
    }

def parse_vmess_list(vmess_urls: List[str]) -> List[Dict]:
    """Parse a list of VMess URLs and convert to dictionary objects"""
    configs = []
    
    for i, url in enumerate(vmess_urls):
        print(f"Parsing VMess proxy {i+1}/{len(vmess_urls)}: {url[:50]}...")
        
        parsed = parse_vmess_url(url)
        if parsed:
            config = convert_vmess_to_dict(parsed)
            configs.append(config)
            print(f"  ✓ Successfully parsed: {config['name']} ({config['protocol']}://{config['address']}:{config['port']})")
        else:
            print(f"  ✗ Failed to parse VMess URL")
    
    return configs

def load_existing_configs(filename: str = "configs/shadow_proxy_configs.json") -> List[Dict]:
    """Load existing proxy configurations"""
    try:
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading existing configs: {e}")
    
    return []

def save_combined_configs(configs: List[Dict], filename: str = "configs/combined_proxies.json"):
    """Save combined proxy configurations"""
    try:
        with open(filename, 'w') as f:
            json.dump(configs, f, indent=2)
        
        print(f"Saved {len(configs)} combined proxy configurations to {filename}")
        return True
    except Exception as e:
        print(f"Error saving combined configurations: {e}")
        return False

def main():
    """Main function to parse VMess URLs and combine with existing configs"""
    
    # Your new VMess proxy URLs
    vmess_urls = [
        "vmess://eyJhZGQiOiIyMTYuMTczLjY5LjI1MCIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoiIiwiaWQiOiI5MTM4MjA5Mi0yMzMwLTQ1NWItOGExYy05YzEyOWNmZTY2MWEiLCJuZXQiOiJ3cyIsInBhdGgiOiIvIiwicG9ydCI6Ijg0NDMiLCJwcyI6IkxhdHZpYSBTaWEiLCJzY3kiOiJhdXRvIiwic25pIjoiIiwidGxzIjoiIiwidHlwZSI6Ii0tLSIsInYiOiIyIn0=",
        "vmess://eyJhZGQiOiIyMTYuMTI4LjE0OS4zMyIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoiIiwiaWQiOiI3M2ViNjQ1Mi0yMWU1LTQyMDUtYmQzNi01OWEyMGE1MjE3YmEiLCJuZXQiOiJ3cyIsInBhdGgiOiIvIiwicG9ydCI6Ijg0NDMiLCJwcyI6IlVuaXRlZCBTdGF0ZXMgVnVsdHIiLCJzY3kiOiJhdXRvIiwic25pIjoiIiwidGxzIjoiIiwidHlwZSI6Ii0tLSIsInYiOiIyIn0=",
        "vmess://eyJhZGQiOiI1MS43OS4xMDIuMjUzIiwiYWlkIjoiMCIsImFscG4iOiIiLCJmcCI6IiIsImhvc3QiOiI1MS43OS4xMDIuMjUzIiwiaWQiOiI1OGZlMTU0Mi01MjkwLTQwYWQtODE1YS03NzcwN2E4MWFmZTUiLCJuZXQiOiJ3cyIsInBhdGgiOiIvSU9lYmhMTWhsMUNUYkZIYkw5NW15ZlJYMiIsInBvcnQiOiI4MCIsInBzIjoiQ2FuYWRhIE9WSCIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoiLS0tIiwidiI6IjIifQ==",
        "vmess://eyJhZGQiOiI1LjI1My40MS4xNDciLCJhaWQiOiIwIiwiYWxwbiI6IiIsImZwIjoiIiwiaG9zdCI6IiIsImlkIjoiNGIxOTkyY2MtOGU3Yy00MDAzLWE0NWYtYTI4YzNlNmY2ZmE4IiwibmV0IjoidGNwIiwicGF0aCI6IiIsInBvcnQiOiIyNzc1MCIsInBzIjoiSmFwYW4gUFEgSG9zdGluZyIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoibm9uZSIsInYiOiIyIn0=",
        "vmess://eyJhZGQiOiI0Ny43OS44OC4xMTMiLCJhaWQiOiIwIiwiYWxwbiI6IiIsImZwIjoiIiwiaG9zdCI6IiIsImlkIjoiMWRiODM4ZDAtZWNkMi00YjczLWE3ZjgtNWFmNmI0MDFkODMzIiwibmV0IjoidGNwIiwicGF0aCI6IiIsInBvcnQiOiI1MzcxMCIsInBzIjoiSmFwYW4gQWxpYmFiYSBDbG91ZCIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoibm9uZSIsInYiOiIyIn0=",
        "vmess://eyJhZGQiOiIxOTIuNTMuMTEzLjE1NiIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoiIiwiaWQiOiIwMzZhMjhjMy01YzhkLTRkZjMtYTc5Yi05ZGE2MjI2NDBmMmIiLCJuZXQiOiJ0Y3AiLCJwYXRoIjoiIiwicG9ydCI6IjEwMDAyIiwicHMiOiJTaW5nYXBvcmUgQWthbWFpIiwic2N5IjoiYXV0byIsInNuaSI6IiIsInRscyI6IiIsInR5cGUiOiJub25lIiwidiI6IjIifQ==",
        "vmess://eyJhZGQiOiIxOTQuMjMzLjcyLjIyOCIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoiIiwiaWQiOiIxNjUwOTI2Mi1kYmUyLTQzYmEtOTljZS0wNzkxM2QyYTE4YjQiLCJuZXQiOiJ0Y3AiLCJwYXRoIjoiIiwicG9ydCI6IjI3NTc1IiwicHMiOiJTaW5nYXBvcmUgQ29udGFibyIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoibm9uZSIsInYiOiIyIn0=",
        "vmess://eyJhZGQiOiIxMDQuMTcuMTc2LjE3MSIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0Ijoia2U3aHozNmV3ei00NTE1MDE3NDczLm1hc2hhbGxhaGJldC5jb20iLCJpZCI6IjZjYmM5Yzc4LTFjYjEtNTdkNC1hOTk5LWUyZjRlMzRjMWUwMyIsIm5ldCI6IndzIiwicGF0aCI6Ii9uYXNuZXQvY2RuIiwicG9ydCI6IjgwODAiLCJwcyI6Ikdlcm1hbiBSZWxheSIsInNjeSI6ImF1dG8iLCJzbmkiOiIiLCJ0bHMiOiIiLCJ0eXBlIjoiLS0tIiwidiI6IjIifQ==",
        "vmess://eyJhZGQiOiJ1czAxLnNoLWNsb3VkZmxhcmUuc2JzIiwiYWlkIjoiMCIsImFscG4iOiIiLCJmcCI6IiIsImhvc3QiOiJ1czAxLnNoLWNsb3VkZmxhcmUuc2JzIiwiaWQiOiJmMTA1OThlMi1jNjA2LTQ5NDUtYmZkZS1lNTczMDc1NmEyZGQiLCJuZXQiOiJ3cyIsInBhdGgiOiIvIiwicG9ydCI6Ijg0NDMiLCJwcyI6IkNsb3VkRmxhcmUgUmVsYXllZCIsInNjeSI6ImF1dG8iLCJzbmkiOiJ1czAxLnNoLWNsb3VkZmxhcmUuc2JzIiwidGxzIjoidGxzIiwidHlwZSI6Ii0tLSIsInYiOiIyIn0=",
        "vmess://eyJhZGQiOiIxNzIuNjYuMTY4LjIwOSIsImFpZCI6IjAiLCJhbHBuIjoiIiwiZnAiOiIiLCJob3N0IjoibWFYTkV0VklQLXVzQS1WUDMubkVUS0gzLlNpVEUiLCJpZCI6IjU0MjhkY2MyLTk5NTAtNDQwNC1iOGE1LTlkYWM4MmFjYjIxMCIsIm5ldCI6IndzIiwicGF0aCI6Ii9saW5rd3MiLCJwb3J0IjoiNDQzIiwicHMiOiJVbml0ZWQgU3RhdGVzIE9WSCIsInNjeSI6ImF1dG8iLCJzbmkiOiJtYVhORXRWSVAtdXNBLVZQMy5uRVRLSDMuU2lURSIsInRscyI6InRscyIsInR5cGUiOiItLS0iLCJ2IjoiMiJ9"
    ]
    
    print("Parsing VMess proxy URLs...")
    vmess_configs = parse_vmess_list(vmess_urls)
    
    if not vmess_configs:
        print("No valid VMess proxy configurations found!")
        return
    
    print(f"\nSuccessfully parsed {len(vmess_configs)} VMess proxy configurations")
    
    # Load existing configurations
    print("\nLoading existing proxy configurations...")
    existing_configs = load_existing_configs("configs/shadow_proxy_configs.json")
    print(f"Found {len(existing_configs)} existing proxy configurations")
    
    # Combine configurations
    combined_configs = existing_configs + vmess_configs
    print(f"Combined total: {len(combined_configs)} proxy configurations")
    
    # Save combined configurations
    save_combined_configs(combined_configs, "configs/combined_proxies.json")
    
    # Also update the main configuration files
    save_combined_configs(combined_configs, "configs/shadow_proxy_configs.json")
    save_combined_configs(combined_configs, "configs/v2ray_proxies.json")
    
    print("\n" + "="*50)
    print("PROXY SUMMARY")
    print("="*50)
    
    # Count by protocol
    protocols = {}
    countries = {}
    for config in combined_configs:
        protocol = config.get('protocol', 'unknown')
        protocols[protocol] = protocols.get(protocol, 0) + 1
        
        country = config.get('name', 'unknown')
        countries[country] = countries.get(country, 0) + 1
    
    print(f"\nBy protocol:")
    for protocol, count in protocols.items():
        print(f"  {protocol}: {count}")
    
    print(f"\nBy country/region:")
    for country, count in countries.items():
        print(f"  {country}: {count}")
    
    print(f"\nTotal proxies: {len(combined_configs)}")
    print("\nYour proxy configurations have been updated and are ready to use!")
    print("Run 'python run_bot.py --test-proxies' to test the new configurations.")

if __name__ == "__main__":
    main()
