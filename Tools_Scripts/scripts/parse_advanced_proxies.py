#!/usr/bin/env python3
"""
Parse advanced VLESS and VMess proxies with Reality protocol and advanced features.
This script handles complex proxy configurations from openproxylist.com.
"""

import re
import json
import urllib.parse
import base64
from typing import Dict, List, Optional
from dataclasses import dataclass
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

@dataclass
class ParsedAdvancedVLESS:
    """Parsed advanced VLESS configuration"""
    protocol: str = "vless"
    address: str = ""
    port: int = 443
    uuid: str = ""
    security: str = "tls"
    network: str = "tcp"
    path: str = ""
    host: str = ""
    sni: str = ""
    alpn: str = "h2,http/1.1"
    fp: str = "chrome"
    pbk: str = ""
    sid: str = ""
    flow: str = ""
    encryption: str = "none"
    name: str = ""

def parse_advanced_vless_url(url: str) -> Optional[ParsedAdvancedVLESS]:
    """Parse advanced VLESS URL format with Reality protocol support"""
    try:
        # Remove vless:// prefix
        if not url.startswith('vless://'):
            return None
        
        url = url[8:]  # Remove 'vless://'
        
        # Split by # to separate parameters from fragment
        if '#' in url:
            url_part, fragment = url.split('#', 1)
            name = urllib.parse.unquote(fragment)
        else:
            url_part = url
            name = ""
        
        # Split by @ to separate UUID from server info
        if '@' in url_part:
            uuid, server_part = url_part.split('@', 1)
        else:
            return None
        
        # Parse server part (address:port?params)
        if '?' in server_part:
            server_info, params_str = server_part.split('?', 1)
        else:
            server_info = server_part
            params_str = ""
        
        # Parse address and port
        if ':' in server_info:
            address, port_str = server_info.split(':', 1)
            try:
                port = int(port_str)
            except ValueError:
                port = 443
        else:
            address = server_info
            port = 443
        
        # Parse query parameters
        params = urllib.parse.parse_qs(params_str)
        
        # Extract parameters with defaults
        security = params.get('security', ['tls'])[0]
        network = params.get('type', ['tcp'])[0]
        path = params.get('path', ['/'])[0]
        host = params.get('host', [''])[0]
        sni = params.get('sni', [''])[0]
        alpn = params.get('alpn', ['h2,http/1.1'])[0]
        fp = params.get('fp', ['chrome'])[0]
        pbk = params.get('pbk', [''])[0]
        sid = params.get('sid', [''])[0]
        flow = params.get('flow', [''])[0]
        encryption = params.get('encryption', ['none'])[0]
        
        # Clean up the name
        if name:
            # Remove common prefixes and clean up
            name = name.replace('[openproxylist.com]', '').strip()
            name = name.replace('vless-', '').strip()
            if not name:
                name = f"vless_{address}_{port}"
        else:
            name = f"vless_{address}_{port}"
        
        return ParsedAdvancedVLESS(
            protocol="vless",
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
            pbk=pbk,
            sid=sid,
            flow=flow,
            encryption=encryption,
            name=name
        )
        
    except Exception as e:
        print(f"Error parsing advanced VLESS URL: {e}")
        return None

def parse_vmess_url(url: str) -> Optional[Dict]:
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
            name = name.replace('[openproxylist.com]', '').strip()
            name = name.replace('vmess-', '').strip()
            if not name:
                name = f"vmess_{address}_{port}"
        else:
            name = f"vmess_{address}_{port}"
        
        return {
            'name': name,
            'protocol': 'vmess',
            'address': address,
            'port': port,
            'uuid': uuid,
            'password': "",
            'security': security,
            'network': network,
            'path': path,
            'host': host,
            'sni': sni,
            'alpn': alpn,
            'fp': fp,
            'pbk': "",
            'sid': "",
            'spx': "",
            'flow': "",
            'encryption': "none",
            'plugin': "",
            'plugin_opts': ""
        }
        
    except Exception as e:
        print(f"Error parsing VMess URL: {e}")
        return None

def convert_advanced_vless_to_dict(parsed: ParsedAdvancedVLESS) -> Dict:
    """Convert parsed advanced VLESS to dictionary format"""
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
        'pbk': parsed.pbk,
        'sid': parsed.sid,
        'spx': "",
        'flow': parsed.flow,
        'encryption': parsed.encryption,
        'plugin': "",
        'plugin_opts': ""
    }

def parse_advanced_proxy_list(proxy_urls: List[str]) -> List[Dict]:
    """Parse a list of advanced proxy URLs"""
    advanced_configs = []
    
    for i, url in enumerate(proxy_urls):
        print(f"Parsing advanced proxy {i+1}/{len(proxy_urls)}: {url[:50]}...")
        
        # Try VLESS first
        if url.startswith('vless://'):
            parsed = parse_advanced_vless_url(url)
            if parsed:
                config = convert_advanced_vless_to_dict(parsed)
                advanced_configs.append(config)
                print(f"  ✓ Successfully parsed VLESS: {config['name']} ({config['protocol']}://{config['address']}:{config['port']})")
            else:
                print(f"  ✗ Failed to parse VLESS URL")
        
        # Try VMess
        elif url.startswith('vmess://'):
            config = parse_vmess_url(url)
            if config:
                advanced_configs.append(config)
                print(f"  ✓ Successfully parsed VMess: {config['name']} ({config['protocol']}://{config['address']}:{config['port']})")
            else:
                print(f"  ✗ Failed to parse VMess URL")
        
        # Skip other protocols for now
        else:
            print(f"  ⚠ Skipping unsupported protocol")
    
    return advanced_configs

def load_existing_configs(filename: str = "configs/shadow_proxy_configs.json") -> List[Dict]:
    """Load existing proxy configurations"""
    try:
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading existing configs: {e}")
    
    return []

def save_combined_configs(configs: List[Dict], filename: str = "configs/advanced_proxies.json"):
    """Save combined proxy configurations"""
    try:
        with open(filename, 'w') as f:
            json.dump(configs, f, indent=2)
        
        print(f"Saved {len(configs)} advanced proxy configurations to {filename}")
        return True
    except Exception as e:
        print(f"Error saving advanced configurations: {e}")
        return False

def main():
    """Main function to parse advanced proxies"""
    
    # Your advanced VLESS and VMess proxy URLs
    advanced_proxy_urls = [
        "vless://e999db7a-1b17-4da6-bc37-c9fa24af2e93@104.19.144.33:2096?path=%2F&security=tls&encryption=none&host=E4aRpUi7Xe.GiTi4.OrG&fp=chrome&type=ws&sni=E4aRpUi7Xe.GiTi4.OrG#🇫🇷[openproxylist.com] vless-FR",
        "vless://24a4aa9b-b341-4717-9d4a-00d74c2b84e0@188.34.181.192:2020?type=tcp&encryption=none&flow=#🇩🇪[openproxylist.com] vless-DE",
        "vless://4c26ebc3-7784-46d8-b52a-7b0ccae6f4b4@amazon-15.cristiano.name.ng:443?security=reality&sni=store.steampowered.com&fp=chrome&pbk=TGlPtfVzGIVpMauPRMGJj2Uu6GUiCpu5ZizIIjw-wx4&sid=f5&type=tcp&flow=xtls-rprx-vision&encryption=none#🇺🇸[openproxylist.com] vless-US",
        "vmess://eyJhZGQiOiIyMTYuMTczLjY5LjI1MCIsImFpZCI6MCwiaG9zdCI6IiIsImlkIjoiOTEzODIwOTItMjMzMC00NTViLThhMWMtOWMxMjljZmU2NjFhIiwibmV0Ijoid3MiLCJwYXRoIjoiXC8iLCJwb3J0Ijo4NDQzLCJwcyI6Ilx1ZDgzY1x1ZGRmMVx1ZDgzY1x1ZGRmYltvcGVucHJveHlsaXN0LmNvbV0gdm1lc3MtTFYiLCJ0bHMiOiIiLCJ0eXBlIjoiYXV0byIsInNlY3VyaXR5IjoiYXV0byIsInNraXAtY2VydC12ZXJpZnkiOnRydWUsInNuaSI6IiJ9",
        # Add more URLs here as needed
    ]
    
    print("Parsing advanced VLESS and VMess proxies...")
    advanced_configs = parse_advanced_proxy_list(advanced_proxy_urls)
    
    print(f"\nSuccessfully parsed {len(advanced_configs)} advanced proxy configurations")
    
    # Load existing configurations
    print("\nLoading existing proxy configurations...")
    existing_configs = load_existing_configs("configs/shadow_proxy_configs.json")
    print(f"Found {len(existing_configs)} existing proxy configurations")
    
    # Combine all configurations
    all_configs = existing_configs + advanced_configs
    print(f"Combined total: {len(all_configs)} proxy configurations")
    
    # Save combined configurations
    save_combined_configs(all_configs, "configs/advanced_proxies.json")
    save_combined_configs(all_configs, "configs/shadow_proxy_configs.json")
    
    print("\n" + "="*50)
    print("ADVANCED PROXY SUMMARY")
    print("="*50)
    
    # Count by protocol
    protocols = {}
    countries = {}
    for config in all_configs:
        protocol = config.get('protocol', 'unknown')
        protocols[protocol] = protocols.get(protocol, 0) + 1
        
        country = config.get('name', 'unknown')
        countries[country] = countries.get(country, 0) + 1
    
    print(f"\nBy protocol:")
    for protocol, count in protocols.items():
        print(f"  {protocol}: {count}")
    
    print(f"\nAdvanced proxies: {len(advanced_configs)}")
    print(f"Total all proxies: {len(all_configs)}")
    
    print("\nYour advanced proxy configurations have been updated!")
    print("Run 'python run_bot.py --test-proxies' to test the new configurations.")

if __name__ == "__main__":
    main()
