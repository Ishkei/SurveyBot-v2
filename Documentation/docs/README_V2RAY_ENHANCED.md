# V2Ray Enhanced Survey Bot

## 🚀 Overview

This enhanced survey bot integrates **V2Ray Core** for advanced proxy management, providing superior stealth and anti-detection capabilities compared to basic proxy solutions. V2Ray offers multiple protocols (VMess, VLESS, Trojan, Shadowsocks) with advanced obfuscation techniques.

## 🎯 Why V2Ray is Superior

### **Advantages over Basic Proxies:**

1. **Multiple Protocols**: VMess, VLESS, Trojan, Shadowsocks
2. **Advanced Obfuscation**: TLS, WebSocket, HTTP/2, QUIC, REALITY
3. **Fingerprint Spoofing**: Chrome, Firefox, Safari, iOS, Android
4. **Active Development**: 31.7k stars, 6,762 commits
5. **Cross-Platform**: Linux, Windows, macOS, Android
6. **High Performance**: Go-based, very fast
7. **Extensive Documentation**: Large community support

### **Perfect for Survey Automation:**

- **Undetectable**: Simulates real browser behavior
- **Reliable**: 9+ years of development
- **Scalable**: Easy proxy rotation and management
- **Cost-Effective**: Free and open-source

## 📋 Prerequisites

- Python 3.8+
- Chrome browser
- V2Ray proxy servers (or use sample configs)

## 🛠️ Installation

### 1. Setup V2Ray System

```bash
# Run the V2Ray setup script
python setup_v2ray.py
```

This will:
- Download V2Ray binary for your system
- Install Python dependencies
- Create configuration directories
- Generate sample proxy configurations

### 2. Install Dependencies

```bash
# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

### 3. Configure Environment

Create a `.env` file:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
BROWSER_TYPE=v2ray
SURVEY_PLATFORM=qmee
HEADLESS=false
```

## 🔧 Configuration

### V2Ray Proxy Configuration

Edit `v2ray_proxies.json` with your proxy server details:

```json
[
  {
    "name": "vmess_server_1",
    "protocol": "vmess",
    "address": "your-server.com",
    "port": 443,
    "uuid": "your-uuid-here",
    "security": "tls",
    "network": "ws",
    "path": "/path",
    "host": "your-server.com",
    "sni": "your-server.com",
    "fp": "chrome"
  },
  {
    "name": "vless_server_1",
    "protocol": "vless",
    "address": "your-server.com",
    "port": 443,
    "uuid": "your-uuid-here",
    "security": "reality",
    "network": "tcp",
    "sni": "your-server.com",
    "fp": "chrome",
    "pbk": "your-public-key",
    "sid": "your-short-id"
  }
]
```

### Supported Protocols

#### **VMess**
```json
{
  "protocol": "vmess",
  "security": "tls|none|auto",
  "network": "tcp|ws|h2|quic"
}
```

#### **VLESS**
```json
{
  "protocol": "vless",
  "security": "tls|reality",
  "network": "tcp|ws|h2|quic"
}
```

#### **Trojan**
```json
{
  "protocol": "trojan",
  "password": "your-password",
  "security": "tls",
  "network": "tcp"
}
```

#### **Shadowsocks**
```json
{
  "protocol": "shadowsocks",
  "password": "your-password",
  "encryption": "aes-256-gcm|chacha20-poly1305"
}
```

## 🚀 Usage

### Basic Usage

```bash
# Run with V2Ray enhanced bot
python run_bot.py --implementation v2ray

# Run in headless mode
python run_bot.py --implementation v2ray --headless

# Test V2Ray proxy manager
python v2ray_proxy_manager.py
```

### Advanced Usage

```bash
# Run with specific platform
python run_bot.py --implementation v2ray --platform qmee

# Test proxy configurations
python v2ray_proxy_manager.py

# Setup V2Ray system
python setup_v2ray.py
```

## 🔍 Features

### **V2Ray Proxy Management**

- **Automatic Proxy Rotation**: Switches proxies on failure
- **Performance Tracking**: Monitors success rates and response times
- **Multiple Protocols**: VMess, VLESS, Trojan, Shadowsocks
- **Advanced Obfuscation**: TLS, WebSocket, HTTP/2, QUIC, REALITY

### **Enhanced Stealth**

- **Undetected Chrome**: Bypasses bot detection
- **Fingerprint Spoofing**: Chrome, Firefox, Safari, iOS, Android
- **User-Agent Rotation**: Random user agents
- **Random Delays**: Human-like timing

### **AI-Powered Survey Solving**

- **Vision AI**: Screenshot analysis with Gemini
- **DOM Analysis**: Interactive element detection
- **Persona-Based Responses**: Consistent character answers
- **Fallback Logic**: Rule-based when AI unavailable

### **Robust Error Handling**

- **Proxy Failure Recovery**: Automatic rotation
- **Session Management**: Cookie persistence
- **Retry Logic**: Multiple attempts with different strategies
- **Graceful Degradation**: Falls back to direct connection

## 📊 Monitoring & Statistics

### Proxy Performance Tracking

```python
# Get proxy statistics
stats = v2ray_manager.get_proxy_stats()
print(stats)
```

Example output:
```json
{
  "vmess_server_1": {
    "success": 15,
    "failures": 2,
    "last_used": 1640995200,
    "avg_response_time": 1.23
  }
}
```

### Survey Completion Tracking

- **Attempt Counter**: Tracks survey attempts
- **Success Rate**: Monitors completion rates
- **Error Logging**: Detailed error reporting
- **Performance Metrics**: Response times and reliability

## 🔧 Troubleshooting

### Common Issues

#### **V2Ray Binary Not Found**
```bash
# Reinstall V2Ray
python setup_v2ray.py
```

#### **Proxy Connection Failed**
```bash
# Test proxy configuration
python v2ray_proxy_manager.py

# Check proxy server status
curl -x socks5://127.0.0.1:1080 https://httpbin.org/ip
```

#### **Browser Detection**
```bash
# Enable additional stealth options
# Edit bot_v2ray_enhanced.py to add more stealth features
```

### Debug Mode

```bash
# Run with verbose logging
python bot_v2ray_enhanced.py --debug
```

## 📈 Performance Optimization

### **Proxy Selection Strategy**

1. **Best Performance**: Selects proxy with highest success rate
2. **Load Balancing**: Distributes load across multiple proxies
3. **Geographic Distribution**: Uses proxies from different locations
4. **Protocol Rotation**: Switches between different protocols

### **Resource Management**

- **Memory Optimization**: Efficient screenshot handling
- **CPU Usage**: Optimized AI processing
- **Network Efficiency**: Minimal proxy overhead
- **Storage**: Compact configuration files

## 🔒 Security Features

### **Anti-Detection**

- **Browser Fingerprinting**: Undetectable Chrome
- **Network Obfuscation**: Advanced V2Ray protocols
- **Behavior Simulation**: Human-like interactions
- **Session Persistence**: Maintains login states

### **Data Protection**

- **Local Processing**: No data sent to external services
- **Encrypted Communication**: TLS/SSL encryption
- **Secure Storage**: Local configuration files
- **Privacy Compliance**: No personal data collection

## 🆚 Comparison with Other Solutions

| Feature | Basic Proxies | V2Ray Enhanced |
|---------|---------------|----------------|
| **Protocols** | HTTP/SOCKS | VMess, VLESS, Trojan, SS |
| **Obfuscation** | Basic | Advanced (TLS, WS, H2, QUIC) |
| **Fingerprinting** | None | Chrome, Firefox, Safari, iOS |
| **Performance** | Variable | High (Go-based) |
| **Reliability** | Low | High (9+ years) |
| **Community** | Limited | Large (31.7k stars) |
| **Documentation** | Basic | Extensive |
| **Cost** | Variable | Free |

## 🎯 Best Practices

### **Proxy Management**

1. **Use Multiple Protocols**: VMess + VLESS + Trojan
2. **Geographic Distribution**: Different countries/regions
3. **Regular Testing**: Test proxies before use
4. **Performance Monitoring**: Track success rates

### **Survey Automation**

1. **Persona Consistency**: Maintain character details
2. **Natural Timing**: Add random delays
3. **Error Recovery**: Handle failures gracefully
4. **Session Management**: Preserve login states

### **Security**

1. **Regular Updates**: Keep V2Ray updated
2. **Configuration Security**: Secure proxy credentials
3. **Network Monitoring**: Monitor for detection
4. **Backup Strategies**: Multiple proxy sources

## 📚 Additional Resources

### **V2Ray Documentation**
- [V2Ray Official](https://www.v2fly.org/)
- [V2Ray Core GitHub](https://github.com/v2fly/v2ray-core)
- [Xray Core](https://github.com/XTLS/Xray-core)

### **Proxy Providers**
- **Free**: Public proxy lists
- **Paid**: Residential proxies, 4G/5G proxies
- **Self-Hosted**: VPS with V2Ray server

### **Survey Platforms**
- **Qmee**: Primary target
- **Earnhaus**: Alternative platform
- **Prolific**: Academic surveys
- **MTurk**: Amazon Mechanical Turk

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source. Please use responsibly and in compliance with platform terms of service.

## ⚠️ Disclaimer

This tool is for educational purposes. Users are responsible for complying with platform terms of service and applicable laws. The authors are not responsible for any misuse.

---

**Happy Surveying! 🎯**
