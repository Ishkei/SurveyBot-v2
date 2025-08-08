#!/usr/bin/env python3
"""
Final script to parse VLESS and Trojan proxy URLs and save them to JSON format.
This script properly handles URL parsing to avoid field corruption.
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
class ParsedProxy:
    """Parsed proxy configuration"""
    protocol: str
    uuid: str
    address: str
    port: int
    security: str = "none"
    encryption: str = "none"
    network: str = "tcp"
    path: str = ""
    host: str = ""
    sni: str = ""
    alpn: str = "h2,http/1.1"
    fp: str = "chrome"
    pbk: str = ""
    sid: str = ""
    spx: str = ""
    flow: str = ""
    name: str = ""

def parse_vless_url(url: str) -> Optional[ParsedProxy]:
    """Parse VLESS URL format"""
    try:
        # Remove vless:// prefix
        if not url.startswith('vless://'):
            return None
        
        url = url[8:]  # Remove 'vless://'
        
        # Split by @ to separate UUID from server info
        parts = url.split('@', 1)
        if len(parts) != 2:
            return None
        
        uuid = parts[0]
        server_part = parts[1]
        
        # Split server part by ? to separate address:port from parameters
        server_parts = server_part.split('?', 1)
        if len(server_parts) != 2:
            return None
        
        address_port = server_parts[0]
        params_str = server_parts[1]
        
        # Parse address and port
        if ':' in address_port:
            address, port_str = address_port.rsplit(':', 1)
            port = int(port_str)
        else:
            address = address_port
            port = 443  # Default port
        
        # Parse query parameters (before the fragment)
        if '#' in params_str:
            params_str = params_str.split('#')[0]
        
        params = urllib.parse.parse_qs(params_str)
        
        # Extract parameters
        security = params.get('security', ['none'])[0]
        encryption = params.get('encryption', ['none'])[0]
        network = params.get('type', ['tcp'])[0]
        path = params.get('path', [''])[0]
        host = params.get('host', [''])[0]
        sni = params.get('sni', [''])[0]
        alpn = params.get('alpn', ['h2,http/1.1'])[0]
        fp = params.get('fp', ['chrome'])[0]
        pbk = params.get('pbk', [''])[0]
        sid = params.get('sid', [''])[0]
        spx = params.get('spx', [''])[0]
        flow = params.get('flow', [''])[0]
        
        # Extract and clean up the name from fragment
        name = ""
        if '#' in url:
            name = urllib.parse.unquote(url.split('#')[1])
            name = name.replace('Channel id: ', '').replace('@ShadowProxy66 ', '').strip()
            if not name:
                name = f"vless_{address}_{port}"
        
        return ParsedProxy(
            protocol="vless",
            uuid=uuid,
            address=address,
            port=port,
            security=security,
            encryption=encryption,
            network=network,
            path=path,
            host=host,
            sni=sni,
            alpn=alpn,
            fp=fp,
            pbk=pbk,
            sid=sid,
            spx=spx,
            flow=flow,
            name=name
        )
        
    except Exception as e:
        print(f"Error parsing VLESS URL: {e}")
        return None

def parse_trojan_url(url: str) -> Optional[ParsedProxy]:
    """Parse Trojan URL format"""
    try:
        # Remove trojan:// prefix
        if not url.startswith('trojan://'):
            return None
        
        url = url[9:]  # Remove 'trojan://'
        
        # Split by @ to separate password from server info
        parts = url.split('@', 1)
        if len(parts) != 2:
            return None
        
        password = parts[0]
        server_part = parts[1]
        
        # Split server part by ? to separate address:port from parameters
        server_parts = server_part.split('?', 1)
        if len(server_parts) != 2:
            return None
        
        address_port = server_parts[0]
        params_str = server_parts[1]
        
        # Parse address and port
        if ':' in address_port:
            address, port_str = address_port.rsplit(':', 1)
            port = int(port_str)
        else:
            address = address_port
            port = 443  # Default port
        
        # Parse query parameters (before the fragment)
        if '#' in params_str:
            params_str = params_str.split('#')[0]
        
        params = urllib.parse.parse_qs(params_str)
        
        # Extract parameters
        security = params.get('security', ['none'])[0]
        network = params.get('type', ['tcp'])[0]
        path = params.get('path', [''])[0]
        host = params.get('host', [''])[0]
        sni = params.get('sni', [''])[0]
        alpn = params.get('alpn', ['h2,http/1.1'])[0]
        fp = params.get('fp', ['chrome'])[0]
        
        # Extract and clean up the name from fragment
        name = ""
        if '#' in url:
            name = urllib.parse.unquote(url.split('#')[1])
            name = name.replace('Channel id: ', '').replace('@ShadowProxy66 ', '').strip()
            if not name:
                name = f"trojan_{address}_{port}"
        
        return ParsedProxy(
            protocol="trojan",
            uuid=password,  # For Trojan, password is stored in uuid field
            address=address,
            port=port,
            security=security,
            encryption="none",  # Trojan doesn't use encryption parameter
            network=network,
            path=path,
            host=host,
            sni=sni,
            alpn=alpn,
            fp=fp,
            name=name
        )
        
    except Exception as e:
        print(f"Error parsing Trojan URL: {e}")
        return None

def parse_proxy_url(url: str) -> Optional[ParsedProxy]:
    """Parse proxy URL (VLESS or Trojan)"""
    url = url.strip()
    
    if url.startswith('vless://'):
        return parse_vless_url(url)
    elif url.startswith('trojan://'):
        return parse_trojan_url(url)
    else:
        print(f"Unsupported proxy protocol: {url[:10]}...")
        return None

def convert_to_dict(parsed: ParsedProxy) -> Dict:
    """Convert parsed proxy to dictionary format"""
    
    # For Trojan, password goes in password field
    password = ""
    uuid = parsed.uuid
    if parsed.protocol == "trojan":
        password = parsed.uuid
        uuid = ""
    
    return {
        'name': parsed.name,
        'protocol': parsed.protocol,
        'address': parsed.address,
        'port': parsed.port,
        'uuid': uuid,
        'password': password,
        'security': parsed.security,
        'network': parsed.network,
        'path': parsed.path,
        'host': parsed.host,
        'sni': parsed.sni,
        'alpn': parsed.alpn,
        'fp': parsed.fp,
        'pbk': parsed.pbk,
        'sid': parsed.sid,
        'spx': parsed.spx,
        'flow': parsed.flow,
        'encryption': parsed.encryption,
        'plugin': "",
        'plugin_opts': ""
    }

def parse_proxy_list(proxy_urls: List[str]) -> List[Dict]:
    """Parse a list of proxy URLs and convert to dictionary objects"""
    configs = []
    
    for i, url in enumerate(proxy_urls):
        print(f"Parsing proxy {i+1}/{len(proxy_urls)}: {url[:50]}...")
        
        parsed = parse_proxy_url(url)
        if parsed:
            config = convert_to_dict(parsed)
            configs.append(config)
            print(f"  ✓ Successfully parsed: {config['name']} ({config['protocol']}://{config['address']}:{config['port']})")
        else:
            print(f"  ✗ Failed to parse proxy URL")
    
    return configs

def save_proxy_configs(configs: List[Dict], filename: str = "configs/shadow_proxy_configs.json"):
    """Save proxy configurations to file"""
    try:
        with open(filename, 'w') as f:
            json.dump(configs, f, indent=2)
        
        print(f"Saved {len(configs)} proxy configurations to {filename}")
        return True
    except Exception as e:
        print(f"Error saving proxy configurations: {e}")
        return False

def main():
    """Main function to parse proxy URLs"""
    
    # Your proxy URLs
    proxy_urls = [
        "vless://784646e5-8e84-4672-8670-efc9cafcd2cc@212.95.34.14:443?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A9%F0%9F%87%AA",
        "vless://784646e5-8e84-4672-8670-efc9cafcd2cc@212.95.34.19:443?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A9%F0%9F%87%AA",
        "vless://a5e0c391-accd-45a7-8bb9-99ffb9b09b16@45.12.133.58:2096?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%AB%F0%9F%87%B7",
        "vless://a5e0c391-accd-45a7-8bb9-99ffb9b09b16@2.56.126.45:8443?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%AB%F0%9F%87%B7",
        "vless://337bf72e-bb79-4d5f-be3f-7822eb77100c@ipw.gfdv54cvghhgfhgj-njhgj64.info:8443?path=%2F&security=tls&alpn=h3%2Ch2&encryption=none&fp=chrome&type=ws&sni=SmL7g6VtS9.tOrSaNsPoRt16.OrG#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A8%F0%9F%87%A6",
        "vless://2a562107-43a6-40a4-a35e-e01e6f21684e@85.234.65.120:443?security=reality&encryption=none&pbk=ng4h6xKU-cqoC_T4U9_wGbYlFqpj9RJbsWVR4AJ_MSo&host=t.me%2Fv2Line&headerType=none&fp=firefox&spx=%2F&type=tcp&sni=www.speedtest.net&sid=e2#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%B3%F0%9F%87%B1",
        "vless://784646e5-8e84-4672-8670-efc9cafcd2cc@212.95.34.26:443?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A9%F0%9F%87%AA",
        "vless://a5e0c391-accd-45a7-8bb9-99ffb9b09b16@2.56.126.190:8443?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%AB%F0%9F%87%B7",
        "vless://a5e0c391-accd-45a7-8bb9-99ffb9b09b16@45.12.145.209:2096?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%B3%F0%9F%87%B1",
        "vless://e999db7a-1b17-4da6-bc37-c9fa24af2e93@104.19.144.33:8443?path=%2F&security=tls&encryption=none&host=Q4cPsPt6G5.gItI3.oRg&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A8%F0%9F%87%A6",
        "vless://ec7de7e0-3f09-4ef4-8a34-e441917d65fa@172.67.164.5:443?path=%2F&security=tls&alpn=http%2F1.1&encryption=none&host=verina.ccantarella.dns-dynamic.net&fp=chrome&type=ws&sni=verina.ccantarella.dns-dynamic.net#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A8%F0%9F%87%A6",
        "trojan://0F22D008-24D4-4DFE-947B-8D2FD64CD24C@www.visa.com.sg:2053?path=%2F%3Fed%3D2560&security=tls&host=t.hongkong6.qzz.io&fp=random&type=ws&sni=t.hongkong6.qzz.io#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A8%F0%9F%87%A6",
        "vless://784646e5-8e84-4672-8670-efc9cafcd2cc@212.95.34.20:443?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A9%F0%9F%87%AA",
        "vless://784646e5-8e84-4672-8670-efc9cafcd2cc@212.95.34.30:443?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A9%F0%9F%87%AA",
        "vless://784646e5-8e84-4672-8670-efc9cafcd2cc@212.95.34.31:443?path=%2F&security=tls&encryption=none&type=ws#Channel%20id%3A%20%40ShadowProxy66%20%F0%9F%87%A9%F0%9F%87%AA"
    ]
    
    print("Parsing proxy URLs...")
    configs = parse_proxy_list(proxy_urls)
    
    if not configs:
        print("No valid proxy configurations found!")
        return
    
    print(f"\nSuccessfully parsed {len(configs)} proxy configurations")
    
    # Save configurations
    save_proxy_configs(configs, "configs/shadow_proxy_configs.json")
    
    # Also save to the main v2ray_proxies.json file
    save_proxy_configs(configs, "configs/v2ray_proxies.json")
    
    print("\nProxy configurations have been saved and are ready to use with your SurveyBot!")
    print("You can now run your bot with these proxies using:")
    print("  python run_bot.py --bot v2ray")

if __name__ == "__main__":
    main()
