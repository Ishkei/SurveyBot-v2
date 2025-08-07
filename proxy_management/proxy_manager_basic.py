import requests
import json
import time
import random
from typing import List, Dict, Optional
from itertools import cycle
import os

class ProxyManager:
    """Comprehensive proxy management for survey automation"""
    
    def __init__(self):
        self.proxies = []
        self.proxy_pool = None
        self.current_proxy = None
        self.proxy_stats = {}
        self.failed_proxies = set()
        
    def load_proxies_from_file(self, filename: str = "proxies.txt") -> bool:
        """Load proxies from a text file"""
        try:
            if os.path.exists(filename):
                with open(filename, 'r') as f:
                    self.proxies = [line.strip() for line in f if line.strip()]
                self.proxy_pool = cycle(self.proxies)
                print(f"Loaded {len(self.proxies)} proxies from {filename}")
                return True
            else:
                print(f"Proxy file {filename} not found.")
                return False
        except Exception as e:
            print(f"Error loading proxies from file: {e}")
            return False
    
    def load_free_proxies(self) -> bool:
        """Load free proxies from online sources"""
        try:
            # Try multiple free proxy sources
            proxy_sources = [
                'https://free-proxy-list.net/',
                'https://www.proxy-list.download/api/v1/get?type=https',
                'https://api.proxyscrape.com/v2/?request=get&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all'
            ]
            
            for source in proxy_sources:
                try:
                    response = requests.get(source, timeout=10)
                    if response.status_code == 200:
                        # Parse proxies from response
                        proxies = self.parse_proxies_from_response(response.text)
                        if proxies:
                            self.proxies.extend(proxies)
                            print(f"Loaded {len(proxies)} proxies from {source}")
                except Exception as e:
                    print(f"Failed to load from {source}: {e}")
                    continue
            
            if self.proxies:
                # Remove duplicates
                self.proxies = list(set(self.proxies))
                self.proxy_pool = cycle(self.proxies)
                print(f"Total unique proxies loaded: {len(self.proxies)}")
                return True
            else:
                print("No proxies loaded from online sources")
                return False
                
        except Exception as e:
            print(f"Error loading free proxies: {e}")
            return False
    
    def parse_proxies_from_response(self, response_text: str) -> List[str]:
        """Parse proxy list from various response formats"""
        proxies = []
        lines = response_text.split('\n')
        
        for line in lines:
            line = line.strip()
            # Look for IP:PORT patterns
            if ':' in line and line.count('.') == 3:
                # Basic validation
                parts = line.split(':')
                if len(parts) == 2:
                    ip = parts[0]
                    port = parts[1]
                    # Simple IP validation
                    if all(part.isdigit() and 0 <= int(part) <= 255 for part in ip.split('.')):
                        if port.isdigit() and 1 <= int(port) <= 65535:
                            proxies.append(line)
        
        return proxies
    
    def test_proxy(self, proxy: str, timeout: int = 10) -> bool:
        """Test if a proxy is working"""
        try:
            proxies = {
                'http': f'http://{proxy}',
                'https': f'http://{proxy}'
            }
            
            response = requests.get(
                'https://httpbin.org/ip',
                proxies=proxies,
                timeout=timeout
            )
            
            if response.status_code == 200:
                result = response.json()
                print(f"Proxy {proxy} working - IP: {result.get('origin', 'unknown')}")
                return True
            else:
                print(f"Proxy {proxy} failed - Status: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"Proxy {proxy} failed - Error: {e}")
            return False
    
    def test_all_proxies(self, max_workers: int = 5) -> List[str]:
        """Test all loaded proxies and return working ones"""
        working_proxies = []
        
        print(f"Testing {len(self.proxies)} proxies...")
        
        for i, proxy in enumerate(self.proxies):
            print(f"Testing proxy {i+1}/{len(self.proxies)}: {proxy}")
            if self.test_proxy(proxy):
                working_proxies.append(proxy)
                self.proxy_stats[proxy] = {'success': 1, 'failures': 0}
            else:
                self.failed_proxies.add(proxy)
                self.proxy_stats[proxy] = {'success': 0, 'failures': 1}
            
            # Small delay to avoid overwhelming
            time.sleep(0.5)
        
        print(f"Found {len(working_proxies)} working proxies out of {len(self.proxies)}")
        return working_proxies
    
    def get_next_proxy(self) -> Optional[str]:
        """Get the next working proxy from the pool"""
        if not self.proxy_pool:
            return None
        
        # Try to get a working proxy
        attempts = 0
        max_attempts = len(self.proxies) * 2  # Try twice through the list
        
        while attempts < max_attempts:
            proxy = next(self.proxy_pool)
            attempts += 1
            
            # Skip failed proxies
            if proxy in self.failed_proxies:
                continue
            
            # Check if proxy has too many failures
            if proxy in self.proxy_stats and self.proxy_stats[proxy]['failures'] > 3:
                continue
            
            self.current_proxy = proxy
            return proxy
        
        print("No working proxies available")
        return None
    
    def mark_proxy_failed(self, proxy: str):
        """Mark a proxy as failed"""
        if proxy in self.proxy_stats:
            self.proxy_stats[proxy]['failures'] += 1
            if self.proxy_stats[proxy]['failures'] >= 3:
                self.failed_proxies.add(proxy)
                print(f"Proxy {proxy} marked as failed after 3 failures")
        else:
            self.proxy_stats[proxy] = {'success': 0, 'failures': 1}
    
    def mark_proxy_success(self, proxy: str):
        """Mark a proxy as successful"""
        if proxy in self.proxy_stats:
            self.proxy_stats[proxy]['success'] += 1
        else:
            self.proxy_stats[proxy] = {'success': 1, 'failures': 0}
    
    def get_proxy_config(self) -> Dict[str, str]:
        """Get proxy configuration for browser automation"""
        proxy = self.get_next_proxy()
        if proxy:
            proxy_host, proxy_port = proxy.split(':')
            return {
                "proxy_host": proxy_host,
                "proxy_port": int(proxy_port),
                "proxy_user": os.getenv("PROXY_USER", ""),
                "proxy_pass": os.getenv("PROXY_PASS", "")
            }
        return {}
    
    def save_working_proxies(self, filename: str = "working_proxies.txt"):
        """Save working proxies to a file"""
        working_proxies = [p for p in self.proxies if p not in self.failed_proxies]
        try:
            with open(filename, 'w') as f:
                for proxy in working_proxies:
                    f.write(f"{proxy}\n")
            print(f"Saved {len(working_proxies)} working proxies to {filename}")
        except Exception as e:
            print(f"Error saving working proxies: {e}")
    
    def load_working_proxies(self, filename: str = "working_proxies.txt"):
        """Load previously tested working proxies"""
        try:
            if os.path.exists(filename):
                with open(filename, 'r') as f:
                    self.proxies = [line.strip() for line in f if line.strip()]
                self.proxy_pool = cycle(self.proxies)
                print(f"Loaded {len(self.proxies)} working proxies from {filename}")
                return True
        except Exception as e:
            print(f"Error loading working proxies: {e}")
        return False
    
    def get_proxy_stats(self) -> Dict[str, Dict]:
        """Get statistics about proxy performance"""
        return self.proxy_stats
    
    def rotate_proxy(self):
        """Force rotation to next proxy"""
        if self.proxy_pool:
            self.current_proxy = next(self.proxy_pool)
            return self.current_proxy
        return None

def main():
    """Test the proxy manager"""
    manager = ProxyManager()
    
    # Try to load from file first
    if not manager.load_proxies_from_file():
        # Load free proxies if file doesn't exist
        manager.load_free_proxies()
    
    if manager.proxies:
        # Test all proxies
        working_proxies = manager.test_all_proxies()
        
        # Save working proxies
        if working_proxies:
            manager.save_working_proxies()
        
        # Show stats
        stats = manager.get_proxy_stats()
        print("\nProxy Statistics:")
        for proxy, stat in stats.items():
            print(f"{proxy}: {stat['success']} successes, {stat['failures']} failures")
    else:
        print("No proxies available")

if __name__ == "__main__":
    main()
