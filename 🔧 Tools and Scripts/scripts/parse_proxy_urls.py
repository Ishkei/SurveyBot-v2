#!/usr/bin/env python3
"""
Parse VLESS and Trojan proxy URLs and convert them to V2Ray configuration format.
This script takes proxy URLs and converts them to the format expected by the V2Ray proxy manager.
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
from proxy_management.proxy_manager_v2ray import ProxyConfig, V2RayProxyManager

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
        
        # Parse query parameters
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
        
        # Extract name from fragment
        name = ""
        if '#' in url:
            name = urllib.parse.unquote(url.split('#')[1])
        
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
        
        # Parse query parameters
        params = urllib.parse.parse_qs(params_str)
        
        # Extract parameters
        security = params.get('security', ['none'])[0]
        network = params.get('type', ['tcp'])[0]
        path = params.get('path', [''])[0]
        host = params.get('host', [''])[0]
        sni = params.get('sni', [''])[0]
        alpn = params.get('alpn', ['h2,http/1.1'])[0]
        fp = params.get('fp', ['chrome'])[0]
        
        # Extract name from fragment
        name = ""
        if '#' in url:
            name = urllib.parse.unquote(url.split('#')[1])
        
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

def convert_to_proxy_config(parsed: ParsedProxy) -> ProxyConfig:
    """Convert parsed proxy to ProxyConfig"""
    
    # Generate a name if not provided
    name = parsed.name if parsed.name else f"{parsed.protocol}_{parsed.address}_{parsed.port}"
    
    # For Trojan, password goes in password field
    password = ""
    uuid = parsed.uuid
    if parsed.protocol == "trojan":
        password = parsed.uuid
        uuid = ""
    
    return ProxyConfig(
        name=name,
        protocol=parsed.protocol,
        address=parsed.address,
        port=parsed.port,
        uuid=uuid,
        password=password,
        security=parsed.security,
        network=parsed.network,
        path=parsed.path,
        host=parsed.host,
        sni=parsed.sni,
        alpn=parsed.alpn,
        fp=parsed.fp,
        pbk=parsed.pbk,
        sid=parsed.sid,
        spx=parsed.spx,
        flow=parsed.flow,
        encryption=parsed.encryption
    )

def parse_proxy_list(proxy_urls: List[str]) -> List[ProxyConfig]:
    """Parse a list of proxy URLs and convert to ProxyConfig objects"""
    configs = []
    
    for i, url in enumerate(proxy_urls):
        print(f"Parsing proxy {i+1}/{len(proxy_urls)}: {url[:50]}...")
        
        parsed = parse_proxy_url(url)
        if parsed:
            config = convert_to_proxy_config(parsed)
            configs.append(config)
            print(f"  ✓ Successfully parsed: {config.name}")
        else:
            print(f"  ✗ Failed to parse proxy URL")
    
    return configs

def save_proxy_configs(configs: List[ProxyConfig], filename: str = "configs/shadow_proxy_configs.json"):
    """Save proxy configurations to file"""
    try:
        configs_data = []
        for config in configs:
            configs_data.append({
                'name': config.name,
                'protocol': config.protocol,
                'address': config.address,
                'port': config.port,
                'uuid': config.uuid,
                'password': config.password,
                'security': config.security,
                'network': config.network,
                'path': config.path,
                'host': config.host,
                'sni': config.sni,
                'alpn': config.alpn,
                'fp': config.fp,
                'pbk': config.pbk,
                'sid': config.sid,
                'spx': config.spx,
                'flow': config.flow,
                'encryption': config.encryption,
                'plugin': config.plugin,
                'plugin_opts': config.plugin_opts
            })
        
        with open(filename, 'w') as f:
            json.dump(configs_data, f, indent=2)
        
        print(f"Saved {len(configs_data)} proxy configurations to {filename}")
        return True
    except Exception as e:
        print(f"Error saving proxy configurations: {e}")
        return False

def test_proxy_configs(configs: List[ProxyConfig]):
    """Test proxy configurations"""
    manager = V2RayProxyManager(v2ray_path="./v2ray/v2ray")
    
    print(f"\nTesting {len(configs)} proxy configurations...")
    
    working_configs = []
    for i, config in enumerate(configs):
        print(f"\nTesting proxy {i+1}/{len(configs)}: {config.name}")
        print(f"  Protocol: {config.protocol}")
        print(f"  Address: {config.address}:{config.port}")
        print(f"  Security: {config.security}")
        print(f"  Network: {config.network}")
        
        success, response_time = manager.test_proxy(config, timeout=15)
        
        if success:
            print(f"  ✓ Working - Response time: {response_time:.2f}s")
            working_configs.append(config)
        else:
            print(f"  ✗ Failed")
    
    print(f"\nSummary: {len(working_configs)}/{len(configs)} proxies are working")
    return working_configs

def main():
    """Main function to parse and test proxy URLs"""
    
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
    
    # Test configurations (optional - can be commented out to skip testing)
    print("\n" + "="*50)
    print("TESTING PROXY CONFIGURATIONS")
    print("="*50)
    
    working_configs = test_proxy_configs(configs)
    
    if working_configs:
        # Save only working configurations
        save_proxy_configs(working_configs, "configs/working_shadow_proxies.json")
        print(f"\nSaved {len(working_configs)} working proxy configurations to configs/working_shadow_proxies.json")
    else:
        print("\nNo working proxies found. You may need to check your V2Ray installation or network connectivity.")

if __name__ == "__main__":
    main()
