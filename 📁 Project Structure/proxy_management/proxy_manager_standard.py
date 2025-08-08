#!/usr/bin/env python3
"""
Standard Proxy Manager for HTTP/HTTPS/SOCKS proxies.
This manager handles standard proxies that don't require V2Ray.
"""

import requests
import json
import time
import random
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import threading
import os

@dataclass
class StandardProxy:
    """Standard proxy configuration"""
    name: str
    ip: str
    port: int
    protocol: str  # http, https, socks4, socks5
    username: str = ""
    password: str = ""
    country: str = ""
    last_used: Optional[float] = None
    success_count: int = 0
    failure_count: int = 0
    avg_response_time: float = 0.0

class StandardProxyManager:
    """Manager for standard HTTP/HTTPS/SOCKS proxies"""
    
    def __init__(self):
        self.proxies: List[StandardProxy] = []
        self.current_proxy: Optional[StandardProxy] = None
        self.session = requests.Session()
        self.lock = threading.Lock()
        
    def add_proxy(self, ip: str, port: int, protocol: str = "http", 
                  username: str = "", password: str = "", name: str = "", country: str = ""):
        """Add a new proxy to the manager"""
        if not name:
            name = f"{protocol}_{ip}_{port}"
        
        proxy = StandardProxy(
            name=name,
            ip=ip,
            port=port,
            protocol=protocol.lower(),
            username=username,
            password=password,
            country=country
        )
        
        self.proxies.append(proxy)
        return proxy
    
    def add_proxy_list(self, proxy_list: List[Dict]):
        """Add multiple proxies from a list"""
        for proxy_data in proxy_list:
            self.add_proxy(
                ip=proxy_data.get('ip', ''),
                port=proxy_data.get('port', 80),
                protocol=proxy_data.get('protocol', 'http'),
                username=proxy_data.get('username', ''),
                password=proxy_data.get('password', ''),
                name=proxy_data.get('name', ''),
                country=proxy_data.get('country', '')
            )
    
    def get_proxy_dict(self, proxy: StandardProxy) -> Dict:
        """Convert proxy to requests-compatible dictionary"""
        if proxy.protocol in ['socks4', 'socks5']:
            # For SOCKS proxies, we need to use the full URL format
            auth_part = ""
            if proxy.username and proxy.password:
                auth_part = f"{proxy.username}:{proxy.password}@"
            
            proxy_url = f"{proxy.protocol}://{auth_part}{proxy.ip}:{proxy.port}"
            return {
                'http': proxy_url,
                'https': proxy_url
            }
        else:
            # For HTTP/HTTPS proxies
            auth_part = ""
            if proxy.username and proxy.password:
                auth_part = f"{proxy.username}:{proxy.password}@"
            
            proxy_url = f"http://{auth_part}{proxy.ip}:{proxy.port}"
            return {
                'http': proxy_url,
                'https': proxy_url
            }
    
    def test_proxy(self, proxy: StandardProxy, timeout: int = 10) -> Tuple[bool, float]:
        """Test a single proxy"""
        try:
            proxy_dict = self.get_proxy_dict(proxy)
            
            start_time = time.time()
            response = requests.get(
                'https://httpbin.org/ip',
                proxies=proxy_dict,
                timeout=timeout,
                verify=False  # Disable SSL verification for testing
            )
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                # Update proxy stats
                with self.lock:
                    proxy.success_count += 1
                    proxy.last_used = time.time()
                    proxy.avg_response_time = (
                        (proxy.avg_response_time * (proxy.success_count - 1) + response_time) / 
                        proxy.success_count
                    )
                
                return True, response_time
            else:
                with self.lock:
                    proxy.failure_count += 1
                return False, 0
                
        except Exception as e:
            with self.lock:
                proxy.failure_count += 1
            return False, 0
    
    def test_all_proxies(self, timeout: int = 10) -> List[StandardProxy]:
        """Test all proxies and return working ones"""
        working_proxies = []
        
        print(f"Testing {len(self.proxies)} standard proxies...")
        
        for i, proxy in enumerate(self.proxies):
            print(f"Testing proxy {i+1}/{len(self.proxies)}: {proxy.name}")
            print(f"  Protocol: {proxy.protocol}")
            print(f"  Address: {proxy.ip}:{proxy.port}")
            
            success, response_time = self.test_proxy(proxy, timeout)
            
            if success:
                print(f"  ✓ Working - Response time: {response_time:.2f}s")
                working_proxies.append(proxy)
            else:
                print(f"  ✗ Failed")
        
        print(f"\nSummary: {len(working_proxies)}/{len(self.proxies)} standard proxies are working")
        return working_proxies
    
    def get_best_proxy(self) -> Optional[StandardProxy]:
        """Get the best performing proxy"""
        if not self.proxies:
            return None
        
        # Sort by success rate and response time
        sorted_proxies = sorted(
            self.proxies,
            key=lambda p: (p.success_count / max(p.success_count + p.failure_count, 1), -p.avg_response_time),
            reverse=True
        )
        
        return sorted_proxies[0] if sorted_proxies else None
    
    def rotate_proxy(self) -> Optional[StandardProxy]:
        """Rotate to the next best proxy"""
        self.current_proxy = self.get_best_proxy()
        return self.current_proxy
    
    def get_current_proxy_dict(self) -> Optional[Dict]:
        """Get the current proxy as a requests-compatible dictionary"""
        if not self.current_proxy:
            self.rotate_proxy()
        
        if self.current_proxy:
            return self.get_proxy_dict(self.current_proxy)
        return None
    
    def save_working_proxies(self, filename: str = "configs/working_standard_proxies.json"):
        """Save working proxies to file"""
        working_proxies = [p for p in self.proxies if p.success_count > 0]
        
        proxy_data = []
        for proxy in working_proxies:
            proxy_data.append({
                'name': proxy.name,
                'ip': proxy.ip,
                'port': proxy.port,
                'protocol': proxy.protocol,
                'username': proxy.username,
                'password': proxy.password,
                'country': proxy.country,
                'success_count': proxy.success_count,
                'failure_count': proxy.failure_count,
                'avg_response_time': proxy.avg_response_time
            })
        
        try:
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            with open(filename, 'w') as f:
                json.dump(proxy_data, f, indent=2)
            print(f"Saved {len(working_proxies)} working standard proxies to {filename}")
            return True
        except Exception as e:
            print(f"Error saving working proxies: {e}")
            return False
    
    def load_proxies_from_file(self, filename: str) -> bool:
        """Load proxies from file"""
        try:
            with open(filename, 'r') as f:
                proxy_data = json.load(f)
            
            self.proxies = []
            for data in proxy_data:
                proxy = StandardProxy(
                    name=data.get('name', ''),
                    ip=data.get('ip', ''),
                    port=data.get('port', 80),
                    protocol=data.get('protocol', 'http'),
                    username=data.get('username', ''),
                    password=data.get('password', ''),
                    country=data.get('country', ''),
                    success_count=data.get('success_count', 0),
                    failure_count=data.get('failure_count', 0),
                    avg_response_time=data.get('avg_response_time', 0.0)
                )
                self.proxies.append(proxy)
            
            print(f"Loaded {len(self.proxies)} standard proxies from {filename}")
            return True
        except Exception as e:
            print(f"Error loading proxies from {filename}: {e}")
            return False

def create_sample_standard_proxies():
    """Create sample standard proxy configurations"""
    sample_proxies = [
        # HTTP proxies
        {"ip": "32.223.6.94", "port": 80, "protocol": "http", "name": "US HTTP 1", "country": "United States"},
        {"ip": "139.60.209.2", "port": 80, "protocol": "http", "name": "US HTTP 2", "country": "United States"},
        {"ip": "4.156.78.45", "port": 80, "protocol": "http", "name": "US HTTP 3", "country": "United States"},
        
        # SOCKS proxies
        {"ip": "173.242.95.158", "port": 60606, "protocol": "socks5", "name": "US SOCKS5 1", "country": "United States"},
        {"ip": "208.65.90.21", "port": 4145, "protocol": "socks5", "name": "US SOCKS5 2", "country": "United States"},
        {"ip": "192.111.137.37", "port": 18762, "protocol": "socks5", "name": "US SOCKS5 3", "country": "United States"},
    ]
    
    manager = StandardProxyManager()
    manager.add_proxy_list(sample_proxies)
    
    # Save to file
    proxy_data = []
    for proxy in manager.proxies:
        proxy_data.append({
            'name': proxy.name,
            'ip': proxy.ip,
            'port': proxy.port,
            'protocol': proxy.protocol,
            'username': proxy.username,
            'password': proxy.password,
            'country': proxy.country
        })
    
    try:
        with open("configs/sample_standard_proxies.json", 'w') as f:
            json.dump(proxy_data, f, indent=2)
        print("Created sample standard proxy configurations")
        return True
    except Exception as e:
        print(f"Error creating sample proxies: {e}")
        return False

if __name__ == "__main__":
    # Test the standard proxy manager
    manager = StandardProxyManager()
    
    # Add some test proxies
    manager.add_proxy("32.223.6.94", 80, "http", name="Test HTTP")
    manager.add_proxy("173.242.95.158", 60606, "socks5", name="Test SOCKS5")
    
    # Test them
    working = manager.test_all_proxies()
    print(f"Found {len(working)} working standard proxies")
