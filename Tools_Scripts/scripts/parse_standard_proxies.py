#!/usr/bin/env python3
"""
Parse standard HTTP/HTTPS/SOCKS proxies and new VLESS protocols.
This script handles both standard proxies and VLESS URLs.
"""

import re
import json
import urllib.parse
from typing import Dict, List, Optional
from dataclasses import dataclass
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

@dataclass
class ParsedVLESS:
    """Parsed VLESS configuration"""
    protocol: str = "vless"
    address: str = ""
    port: int = 443
    uuid: str = ""
    security: str = "tls"
    network: str = "ws"
    path: str = "/"
    host: str = ""
    sni: str = ""
    alpn: str = "h2,http/1.1"
    fp: str = "chrome"
    name: str = ""

def parse_vless_url(url: str) -> Optional[ParsedVLESS]:
    """Parse VLESS URL format"""
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
        
        # Extract parameters
        security = params.get('security', ['tls'])[0]
        network = params.get('type', ['ws'])[0]
        path = params.get('path', ['/'])[0]
        host = params.get('host', [''])[0]
        sni = params.get('sni', [''])[0]
        alpn = params.get('alpn', ['h2,http/1.1'])[0]
        fp = params.get('fp', ['chrome'])[0]
        
        # Clean up the name
        if name:
            name = name.replace('Channel id: ', '').replace('@ShadowProxy66 ', '').strip()
            if not name:
                name = f"vless_{address}_{port}"
        else:
            name = f"vless_{address}_{port}"
        
        return ParsedVLESS(
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
            name=name
        )
        
    except Exception as e:
        print(f"Error parsing VLESS URL: {e}")
        return None

def convert_vless_to_dict(parsed: ParsedVLESS) -> Dict:
    """Convert parsed VLESS to dictionary format"""
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

def parse_standard_proxy_list(proxy_strings: List[str]) -> List[Dict]:
    """Parse a list of standard proxy strings (IP:PORT format)"""
    standard_proxies = []
    
    for i, proxy_str in enumerate(proxy_strings):
        print(f"Parsing standard proxy {i+1}/{len(proxy_strings)}: {proxy_str}")
        
        # Parse IP:PORT format
        if ':' in proxy_str:
            ip, port_str = proxy_str.split(':', 1)
            try:
                port = int(port_str)
            except ValueError:
                print(f"  ✗ Invalid port: {port_str}")
                continue
            
            # Determine protocol based on port
            if port in [80, 8080, 3128]:
                protocol = "http"
            elif port in [443, 8443]:
                protocol = "https"
            elif port in [1080, 4145, 9050]:
                protocol = "socks5"
            elif port in [4145, 1080]:
                protocol = "socks4"
            else:
                protocol = "http"  # Default to HTTP
            
            proxy_data = {
                'name': f"{protocol.upper()}_{ip}_{port}",
                'ip': ip,
                'port': port,
                'protocol': protocol,
                'username': "",
                'password': "",
                'country': "United States"  # Default country
            }
            
            standard_proxies.append(proxy_data)
            print(f"  ✓ Successfully parsed: {proxy_data['name']} ({protocol}://{ip}:{port})")
        else:
            print(f"  ✗ Invalid format: {proxy_str}")
    
    return standard_proxies

def parse_vless_list(vless_urls: List[str]) -> List[Dict]:
    """Parse a list of VLESS URLs and convert to dictionary objects"""
    vless_configs = []
    
    for i, url in enumerate(vless_urls):
        print(f"Parsing VLESS proxy {i+1}/{len(vless_urls)}: {url[:50]}...")
        
        parsed = parse_vless_url(url)
        if parsed:
            config = convert_vless_to_dict(parsed)
            vless_configs.append(config)
            print(f"  ✓ Successfully parsed: {config['name']} ({config['protocol']}://{config['address']}:{config['port']})")
        else:
            print(f"  ✗ Failed to parse VLESS URL")
    
    return vless_configs

def load_existing_configs(filename: str = "configs/shadow_proxy_configs.json") -> List[Dict]:
    """Load existing proxy configurations"""
    try:
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading existing configs: {e}")
    
    return []

def save_combined_configs(configs: List[Dict], filename: str = "configs/all_proxies.json"):
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
    """Main function to parse standard proxies and VLESS URLs"""
    
    # Your standard HTTP/HTTPS/SOCKS proxy list (original + new ones)
    standard_proxy_strings = [
        # Original proxies
        "32.223.6.94:80",
        "139.60.209.2:80",
        "159.65.230.46:8888",
        "4.156.78.45:80",
        "50.122.86.118:80",
        "50.238.47.86:32100",
        "154.16.146.41:80",
        "173.242.95.158:60606",
        "154.16.146.42:80",
        "20.127.221.223:80",
        "154.16.146.45:80",
        "173.225.192.5:1080",
        "154.16.146.46:80",
        "64.124.145.1:1080",
        "23.237.210.82:80",
        "154.16.146.48:80",
        "38.147.98.190:8080",
        "38.51.48.21:5678",
        "147.28.240.218:9443",
        "154.16.146.43:80",
        "147.28.240.214:9400",
        "208.65.90.21:4145",
        "192.104.242.158:4145",
        "147.28.240.215:80",
        "208.65.90.3:4145",
        "192.129.175.157:29080",
        "198.177.252.24:4145",
        "192.111.137.37:18762",
        "184.170.245.148:4145",
        "192.111.139.162:4145",
        "192.111.135.18:18301",
        "74.119.147.209:4145",
        "74.119.144.60:4145",
        "198.8.94.174:39078",
        "192.252.209.158:4145",
        
        # New additional proxies
        "154.19.184.154:80",
        "152.53.107.230:80",
        "147.28.240.217:9400",
        "174.77.111.196:4145",
        "147.28.240.216:80",
        "184.181.217.210:4145",
        "184.178.172.14:4145",
        "98.175.31.222:4145",
        "45.40.136.39:45741",
        "72.205.0.67:4145",
        "184.181.217.220:4145",
        "72.207.33.64:4145",
        "72.205.0.93:4145",
        "152.53.194.46:8029",
        "98.191.0.37:4145",
        "184.178.172.18:15280",
        "184.178.172.11:4145",
        "174.75.211.222:4145",
        "72.214.108.67:4145",
        "184.181.217.206:4145",
        "184.178.172.23:4145",
        "98.170.57.231:4145",
        "98.178.72.30:4145",
        "68.1.210.163:4145",
        "174.77.111.197:4145",
        "70.166.65.160:4145",
        "104.238.100.115:45314",
        "72.206.74.126:4145",
        "72.195.34.35:27360",
        "184.181.217.194:4145",
        "72.195.34.41:4145",
        "70.166.167.55:57745",
        "68.1.210.189:4145",
        "184.178.172.28:15294",
        "132.148.82.125:45605"
    ]
    
    # Your new VLESS URLs
    vless_urls = [
        "vless://4c26ebc3-7784-46d8-b52a-7b0ccae6f4b4@54.188.66.60:443#United States%20#25512%20/%20OutlineKeys.com",
        "vless://4c26ebc3-7784-46d8-b52a-7b0ccae6f4b4@18.117.86.160:443#United States%20#25511%20/%20OutlineKeys.com",
        "vless://ad0c943c-01ea-40d1-8f69-7f811f766da6@104.26.0.117:8080#United States%20#25506%20/%20OutlineKeys.com",
        "vless://ad0c943c-01ea-40d1-8f69-7f811f766da6@104.26.0.117:8080#United States%20#25506%20/%20OutlineKeys.com"
    ]
    
    print("Parsing standard HTTP/HTTPS/SOCKS proxies...")
    standard_proxies = parse_standard_proxy_list(standard_proxy_strings)
    
    print("\nParsing VLESS proxy URLs...")
    vless_configs = parse_vless_list(vless_urls)
    
    print(f"\nSuccessfully parsed {len(standard_proxies)} standard proxies")
    print(f"Successfully parsed {len(vless_configs)} VLESS proxy configurations")
    
    # Load existing configurations
    print("\nLoading existing proxy configurations...")
    existing_configs = load_existing_configs("configs/shadow_proxy_configs.json")
    print(f"Found {len(existing_configs)} existing proxy configurations")
    
    # Combine all configurations
    all_configs = existing_configs + vless_configs
    print(f"Combined total: {len(all_configs)} proxy configurations")
    
    # Save combined configurations
    save_combined_configs(all_configs, "configs/all_proxies.json")
    save_combined_configs(all_configs, "configs/shadow_proxy_configs.json")
    
    # Save standard proxies separately
    save_combined_configs(standard_proxies, "configs/standard_proxies.json")
    
    print("\n" + "="*50)
    print("PROXY SUMMARY")
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
    
    print(f"\nStandard proxies: {len(standard_proxies)}")
    print(f"VLESS proxies: {len(vless_configs)}")
    print(f"Total all proxies: {len(all_configs)}")
    
    print("\nYour proxy configurations have been updated!")
    print("Run 'python run_bot.py --test-proxies' to test the new configurations.")
    print("Run 'python scripts/test_standard_proxies.py' to test standard proxies.")

if __name__ == "__main__":
    main()
