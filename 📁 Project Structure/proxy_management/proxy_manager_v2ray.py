import os
import json
import subprocess
import requests
import time
import random
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass
import threading
import tempfile
import shutil

@dataclass
class ProxyConfig:
    """Configuration for a proxy server"""
    name: str
    protocol: str  # vmess, vless, trojan, shadowsocks
    address: str
    port: int
    uuid: str = ""
    password: str = ""
    security: str = "auto"  # tls, none, auto
    network: str = "tcp"  # tcp, ws, h2, quic
    path: str = ""
    host: str = ""
    sni: str = ""
    alpn: str = "h2,http/1.1"
    fp: str = "chrome"  # fingerprint
    pbk: str = ""
    sid: str = ""
    spx: str = ""
    flow: str = ""
    encryption: str = "none"
    plugin: str = ""
    plugin_opts: str = ""

class V2RayProxyManager:
    """Advanced proxy manager using V2Ray Core"""
    
    def __init__(self, v2ray_path: str = "v2ray", config_dir: str = "./v2ray_configs"):
        self.v2ray_path = v2ray_path
        self.config_dir = config_dir
        self.current_proxy = None
        self.proxy_process = None
        self.proxy_configs = []
        self.proxy_stats = {}
        
        # Create config directory
        os.makedirs(config_dir, exist_ok=True)
        
    def add_proxy_config(self, config: ProxyConfig):
        """Add a proxy configuration"""
        self.proxy_configs.append(config)
        self.proxy_stats[config.name] = {
            'success': 0,
            'failures': 0,
            'last_used': None,
            'avg_response_time': 0
        }
        
    def generate_v2ray_config(self, config: ProxyConfig, local_port: int = 1080) -> str:
        """Generate V2Ray configuration JSON"""
        
        if config.protocol == "vmess":
            return self._generate_vmess_config(config, local_port)
        elif config.protocol == "vless":
            return self._generate_vless_config(config, local_port)
        elif config.protocol == "trojan":
            return self._generate_trojan_config(config, local_port)
        elif config.protocol == "shadowsocks":
            return self._generate_shadowsocks_config(config, local_port)
        else:
            raise ValueError(f"Unsupported protocol: {config.protocol}")
    
    def _generate_vmess_config(self, config: ProxyConfig, local_port: int) -> str:
        """Generate VMess configuration"""
        
        # Create VMess user
        vmess_user = {
            "id": config.uuid,
            "alterId": 0,
            "security": config.security
        }
        
        # Create stream settings
        stream_settings = {
            "network": config.network,
            "security": config.security
        }
        
        if config.network == "ws":
            stream_settings["wsSettings"] = {
                "path": config.path,
                "headers": {
                    "Host": config.host
                }
            }
        elif config.network == "h2":
            stream_settings["httpSettings"] = {
                "path": config.path,
                "host": [config.host]
            }
        elif config.network == "quic":
            stream_settings["quicSettings"] = {
                "security": config.security,
                "key": config.path,
                "header": {
                    "type": "utp"
                }
            }
        
        if config.security == "tls":
            stream_settings["tlsSettings"] = {
                "serverName": config.sni,
                "alpn": config.alpn.split(","),
                "fingerprint": config.fp
            }
        
        # Create server configuration
        server_config = {
            "protocol": "vmess",
            "settings": {
                "vnext": [{
                    "address": config.address,
                    "port": config.port,
                    "users": [vmess_user]
                }]
            },
            "streamSettings": stream_settings
        }
        
        # Create full configuration
        v2ray_config = {
            "log": {
                "loglevel": "warning"
            },
            "inbounds": [{
                "port": local_port,
                "protocol": "socks",
                "settings": {
                    "auth": "noauth",
                    "udp": True
                }
            }],
            "outbounds": [{
                "protocol": "vmess",
                "settings": {
                    "vnext": [{
                        "address": config.address,
                        "port": config.port,
                        "users": [vmess_user]
                    }]
                },
                "streamSettings": stream_settings
            }]
        }
        
        return json.dumps(v2ray_config, indent=2)
    
    def _generate_vless_config(self, config: ProxyConfig, local_port: int) -> str:
        """Generate VLESS configuration"""
        
        # Create VLESS user
        vless_user = {
            "id": config.uuid,
            "encryption": config.encryption,
            "flow": config.flow
        }
        
        # Create stream settings
        stream_settings = {
            "network": config.network,
            "security": config.security
        }
        
        if config.network == "ws":
            stream_settings["wsSettings"] = {
                "path": config.path,
                "headers": {
                    "Host": config.host
                }
            }
        elif config.network == "h2":
            stream_settings["httpSettings"] = {
                "path": config.path,
                "host": [config.host]
            }
        
        if config.security == "tls":
            stream_settings["tlsSettings"] = {
                "serverName": config.sni,
                "alpn": config.alpn.split(","),
                "fingerprint": config.fp
            }
        elif config.security == "reality":
            stream_settings["realitySettings"] = {
                "serverName": config.sni,
                "fingerprint": config.fp,
                "publicKey": config.pbk,
                "shortId": config.sid,
                "spiderX": config.spx
            }
        
        # Create full configuration
        v2ray_config = {
            "log": {
                "loglevel": "warning"
            },
            "inbounds": [{
                "port": local_port,
                "protocol": "socks",
                "settings": {
                    "auth": "noauth",
                    "udp": True
                }
            }],
            "outbounds": [{
                "protocol": "vless",
                "settings": {
                    "vnext": [{
                        "address": config.address,
                        "port": config.port,
                        "users": [vless_user]
                    }]
                },
                "streamSettings": stream_settings
            }]
        }
        
        return json.dumps(v2ray_config, indent=2)
    
    def _generate_trojan_config(self, config: ProxyConfig, local_port: int) -> str:
        """Generate Trojan configuration"""
        
        # Create stream settings
        stream_settings = {
            "network": config.network,
            "security": config.security
        }
        
        if config.security == "tls":
            stream_settings["tlsSettings"] = {
                "serverName": config.sni,
                "alpn": config.alpn.split(","),
                "fingerprint": config.fp
            }
        
        # Create full configuration
        v2ray_config = {
            "log": {
                "loglevel": "warning"
            },
            "inbounds": [{
                "port": local_port,
                "protocol": "socks",
                "settings": {
                    "auth": "noauth",
                    "udp": True
                }
            }],
            "outbounds": [{
                "protocol": "trojan",
                "settings": {
                    "servers": [{
                        "address": config.address,
                        "port": config.port,
                        "password": config.password
                    }]
                },
                "streamSettings": stream_settings
            }]
        }
        
        return json.dumps(v2ray_config, indent=2)
    
    def _generate_shadowsocks_config(self, config: ProxyConfig, local_port: int) -> str:
        """Generate Shadowsocks configuration"""
        
        # Create full configuration
        v2ray_config = {
            "log": {
                "loglevel": "warning"
            },
            "inbounds": [{
                "port": local_port,
                "protocol": "socks",
                "settings": {
                    "auth": "noauth",
                    "udp": True
                }
            }],
            "outbounds": [{
                "protocol": "shadowsocks",
                "settings": {
                    "servers": [{
                        "address": config.address,
                        "port": config.port,
                        "method": config.encryption,
                        "password": config.password
                    }]
                }
            }]
        }
        
        return json.dumps(v2ray_config, indent=2)
    
    def start_proxy(self, config: ProxyConfig, local_port: int = 1080) -> bool:
        """Start V2Ray proxy with given configuration"""
        try:
            # Stop existing proxy
            self.stop_proxy()
            
            # Generate configuration
            config_json = self.generate_v2ray_config(config, local_port)
            
            # Save configuration to file
            config_file = os.path.join(self.config_dir, f"{config.name}.json")
            with open(config_file, 'w') as f:
                f.write(config_json)
            
            # Start V2Ray process
            cmd = [self.v2ray_path, "run", "-c", config_file]
            self.proxy_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            # Wait a moment for startup
            time.sleep(2)
            
            # Check if process is still running
            if self.proxy_process.poll() is None:
                self.current_proxy = config
                print(f"Started V2Ray proxy: {config.name} on port {local_port}")
                return True
            else:
                print(f"Failed to start V2Ray proxy: {config.name}")
                return False
                
        except Exception as e:
            print(f"Error starting proxy: {e}")
            return False
    
    def stop_proxy(self):
        """Stop current V2Ray proxy"""
        if self.proxy_process:
            try:
                self.proxy_process.terminate()
                self.proxy_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.proxy_process.kill()
            finally:
                self.proxy_process = None
                self.current_proxy = None
    
    def test_proxy(self, config: ProxyConfig, timeout: int = 10) -> Tuple[bool, float]:
        """Test proxy configuration"""
        try:
            # Initialize stats for this config if not exists
            if config.name not in self.proxy_stats:
                self.proxy_stats[config.name] = {
                    'success': 0,
                    'failures': 0,
                    'last_used': None,
                    'avg_response_time': 0
                }
            
            # Start proxy temporarily
            if not self.start_proxy(config, 1080):
                return False, 0
            
            # Test connection
            start_time = time.time()
            proxies = {
                'http': 'socks5://127.0.0.1:1080',
                'https': 'socks5://127.0.0.1:1080'
            }
            
            response = requests.get(
                'https://httpbin.org/ip',
                proxies=proxies,
                timeout=timeout
            )
            
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                result = response.json()
                print(f"Proxy {config.name} working - IP: {result.get('origin', 'unknown')} - Response time: {response_time:.2f}s")
                
                # Update stats
                self.proxy_stats[config.name]['success'] += 1
                self.proxy_stats[config.name]['last_used'] = time.time()
                self.proxy_stats[config.name]['avg_response_time'] = (
                    (self.proxy_stats[config.name]['avg_response_time'] * 
                     (self.proxy_stats[config.name]['success'] - 1) + response_time) / 
                    self.proxy_stats[config.name]['success']
                )
                
                return True, response_time
            else:
                print(f"Proxy {config.name} failed - Status: {response.status_code}")
                self.proxy_stats[config.name]['failures'] += 1
                return False, 0
                
        except Exception as e:
            print(f"Proxy {config.name} failed - Error: {e}")
            if config.name in self.proxy_stats:
                self.proxy_stats[config.name]['failures'] += 1
            return False, 0
        finally:
            self.stop_proxy()
    
    def get_best_proxy(self) -> Optional[ProxyConfig]:
        """Get the best performing proxy"""
        working_proxies = []
        
        for config in self.proxy_configs:
            if self.proxy_stats[config.name]['failures'] < 3:  # Skip failed proxies
                working_proxies.append(config)
        
        if not working_proxies:
            return None
        
        # Sort by success rate and response time
        working_proxies.sort(key=lambda x: (
            self.proxy_stats[x.name]['success'],
            -self.proxy_stats[x.name]['avg_response_time']
        ), reverse=True)
        
        return working_proxies[0]
    
    def rotate_proxy(self) -> Optional[ProxyConfig]:
        """Rotate to next available proxy"""
        available_proxies = [
            config for config in self.proxy_configs
            if self.proxy_stats[config.name]['failures'] < 3
        ]
        
        if not available_proxies:
            return None
        
        # Get random proxy from available ones
        return random.choice(available_proxies)
    
    def get_proxy_stats(self) -> Dict:
        """Get proxy performance statistics"""
        return self.proxy_stats
    
    def load_configs_from_file(self, filename: str = "v2ray_proxies.json"):
        """Load proxy configurations from file"""
        try:
            if os.path.exists(filename):
                with open(filename, 'r') as f:
                    configs_data = json.load(f)
                
                for config_data in configs_data:
                    config = ProxyConfig(**config_data)
                    self.add_proxy_config(config)
                
                print(f"Loaded {len(configs_data)} proxy configurations from {filename}")
                return True
        except Exception as e:
            print(f"Error loading proxy configurations: {e}")
        return False
    
    def save_configs_to_file(self, filename: str = "v2ray_proxies.json"):
        """Save proxy configurations to file"""
        try:
            configs_data = []
            for config in self.proxy_configs:
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

def create_sample_proxies():
    """Create sample proxy configurations"""
    manager = V2RayProxyManager()
    
    # Sample VMess proxy
    vmess_config = ProxyConfig(
        name="vmess_sample",
        protocol="vmess",
        address="example.com",
        port=443,
        uuid="12345678-1234-1234-1234-123456789012",
        security="tls",
        network="ws",
        path="/path",
        host="example.com",
        sni="example.com",
        fp="chrome"
    )
    manager.add_proxy_config(vmess_config)
    
    # Sample VLESS proxy
    vless_config = ProxyConfig(
        name="vless_sample",
        protocol="vless",
        address="example.com",
        port=443,
        uuid="12345678-1234-1234-1234-123456789012",
        security="tls",
        network="ws",
        path="/path",
        host="example.com",
        sni="example.com",
        fp="chrome"
    )
    manager.add_proxy_config(vless_config)
    
    # Save sample configurations
    manager.save_configs_to_file("sample_v2ray_proxies.json")
    print("Created sample V2Ray proxy configurations")

if __name__ == "__main__":
    create_sample_proxies()
