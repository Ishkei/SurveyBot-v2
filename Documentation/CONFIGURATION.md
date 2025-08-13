# 🔧 SurveyBot Configuration Guide

## 📋 Overview

This guide will help you configure SurveyBot for optimal performance. The bot uses several configuration files and environment variables to customize its behavior.

## 🎯 Quick Configuration

### **1. Environment Variables (.env)**

Create a `.env` file in the root directory:

```env
# API Keys (REQUIRED)
GOOGLE_API_KEY=your_google_api_key_here

# Browser Settings
BROWSER_TYPE=v2ray
HEADLESS=false
SLOW_MO=10

# Survey Platform
SURVEY_PLATFORM=qmee

# Proxy Settings (optional)
PROXY_HOST=
PROXY_PORT=
PROXY_USER=
PROXY_PASS=

# AI Settings
AI_MODEL=gemini-1.5-flash-latest
USE_VISION=true
USE_FALLBACK=true

# Timing Settings
PAGE_TIMEOUT=30000
ELEMENT_TIMEOUT=10000
SURVEY_TIMEOUT=300000

# Retry Settings
MAX_RETRIES=3
RETRY_DELAY=5

# Stealth Settings
RANDOM_DELAYS=true
MIN_DELAY=1.0
MAX_DELAY=3.0
```

### **2. V2Ray Proxy Configuration**

Edit `configs/v2ray_proxies.json` with your proxy servers:

```json
[
  {
    "name": "vmess_Latvia Sia",
    "protocol": "vmess",
    "address": "216.173.69.250",
    "port": 8443,
    "uuid": "91382092-2330-455b-8a1c-9c129cfe661a",
    "security": "",
    "network": "ws",
    "path": "/",
    "fp": "chrome"
  }
]
```

### **3. Personality Configuration**

Edit `configs/persona.json` with your character details:

```json
{
  "about_you": {
    "full_name": "Your Name",
    "email": "your.email@example.com",
    "date_of_birth": "1990-01-01",
    "age": 33,
    "gender": "Male",
    "state": "California",
    "city": "Los Angeles"
  }
}
```

## 🔑 Getting API Keys

### **Google Gemini API**

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file:
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

### **Optional: Captcha API**

For advanced captcha solving:

1. Sign up for a captcha solving service
2. Add credentials to `.env`:
   ```
   CAPTCHA_API_KEY=your_captcha_api_key
   CAPTCHA_API_URL=https://api.captcha.com
   ```

## 🌐 Proxy Configuration

### **V2Ray Servers**

The bot comes with pre-configured V2Ray servers from Telegram groups:

| Server | Location | Protocol | Quality |
|--------|----------|----------|---------|
| Latvia Sia | Latvia | VMess/WS | ⭐⭐⭐⭐ |
| United States Vultr | USA | VMess/WS | ⭐⭐⭐⭐⭐ |
| Canada OVH | Canada | VMess/WS | ⭐⭐⭐⭐ |

### **Adding Your Own Servers**

1. Get V2Ray configurations from Telegram groups
2. Convert them using the converter script:
   ```bash
   python scripts/v2ray_config_converter.py
   ```
3. Add to `configs/v2ray_proxies.json`

### **Testing Proxies**

```bash
# Test all proxies
python proxy_management/proxy_manager_v2ray.py

# Test specific proxy
python scripts/test_implementations.py
```

## 🤖 Bot Implementations

### **V2Ray Enhanced (RECOMMENDED)**

Best for maximum stealth and reliability:

```bash
python run_bot.py --implementation v2ray
```

**Features:**
- Advanced proxy management
- Browser fingerprint spoofing
- Automatic proxy rotation
- AI-powered survey solving

### **Undetected Chrome**

Good for bypassing detection:

```bash
python run_bot.py --implementation undetected
```

**Features:**
- Undetected Chrome driver
- Built-in stealth features
- Proxy support
- Screenshot-based AI

### **Selenium**

Stable and reliable:

```bash
python run_bot.py --implementation selenium
```

**Features:**
- Traditional Selenium automation
- Good compatibility
- Easy debugging
- Proxy support

### **Playwright**

Modern browser automation:

```bash
python run_bot.py --implementation playwright
```

**Features:**
- Modern browser automation
- Good performance
- Cross-platform support

## 📊 Survey Platforms

### **Qmee (Default)**

```bash
python run_bot.py --platform qmee
```

**Configuration:**
- Platform: Qmee
- URL: https://www.qmee.com/en-us/surveys
- Detection: Medium
- Earnings: $0.10-$2.00 per survey

### **Earnhaus**

```bash
python run_bot.py --platform earnhaus
```

**Configuration:**
- Platform: Earnhaus
- URL: https://earnhaus.com
- Detection: Low
- Earnings: $0.05-$1.50 per survey

### **Prolific**

```bash
python run_bot.py --platform prolific
```

**Configuration:**
- Platform: Prolific
- URL: https://app.prolific.co
- Detection: High
- Earnings: $0.50-$10.00 per survey

## ⚙️ Advanced Configuration

### **Browser Settings**

```env
# Browser type
BROWSER_TYPE=v2ray  # v2ray, undetected, selenium, playwright

# Headless mode
HEADLESS=false  # true for background operation

# Slow motion (for debugging)
SLOW_MO=10  # milliseconds between actions
```

### **Timing Settings**

```env
# Page load timeout
PAGE_TIMEOUT=30000  # 30 seconds

# Element wait timeout
ELEMENT_TIMEOUT=10000  # 10 seconds

# Survey completion timeout
SURVEY_TIMEOUT=300000  # 5 minutes
```

### **Stealth Settings**

```env
# Random delays between actions
RANDOM_DELAYS=true

# Minimum delay
MIN_DELAY=1.0  # seconds

# Maximum delay
MAX_DELAY=3.0  # seconds
```

### **Retry Settings**

```env
# Maximum retry attempts
MAX_RETRIES=3

# Delay between retries
RETRY_DELAY=5  # seconds
```

## 🔍 Troubleshooting

### **Common Issues**

#### **API Key Errors**
```bash
# Check API key
echo $GOOGLE_API_KEY

# Test API connection
python check_requirements.py
```

#### **Proxy Connection Failed**
```bash
# Test proxy configuration
python proxy_management/proxy_manager_v2ray.py

# Check proxy server status
curl -x socks5://127.0.0.1:1080 https://httpbin.org/ip
```

#### **Browser Detection**
```bash
# Enable additional stealth
# Edit bot_implementations/survey_bot_v2ray.py

# Use undetected implementation
python run_bot.py --implementation undetected
```

#### **Survey Platform Issues**
```bash
# Test different platforms
python run_bot.py --platform earnhaus
python run_bot.py --platform prolific

# Check platform-specific settings
# Edit config.py for platform-specific configurations
```

### **Debug Mode**

```bash
# Run with verbose logging
python run_bot.py --implementation v2ray --debug

# Test all components
python test_setup.py

# Check requirements
python check_requirements.py
```

## 📈 Performance Optimization

### **For Maximum Earnings**

1. **Use V2Ray Enhanced Implementation**
   ```bash
   python run_bot.py --implementation v2ray
   ```

2. **Configure Multiple Proxies**
   - Add 10+ proxy servers to `configs/v2ray_proxies.json`
   - Enable automatic rotation

3. **Optimize Timing**
   ```env
   MIN_DELAY=0.5
   MAX_DELAY=1.5
   PAGE_TIMEOUT=15000
   ```

4. **Use Headless Mode**
   ```env
   HEADLESS=true
   ```

### **For Maximum Stealth**

1. **Use Undetected Chrome**
   ```bash
   python run_bot.py --implementation undetected
   ```

2. **Enable Random Delays**
   ```env
   RANDOM_DELAYS=true
   MIN_DELAY=2.0
   MAX_DELAY=5.0
   ```

3. **Use Multiple Personalities**
   - Create different `persona.json` files
   - Rotate between personalities

## 🎯 Best Practices

### **Security**
- Never share your API keys
- Use different proxies for different accounts
- Rotate user agents and fingerprints
- Monitor for detection patterns

### **Performance**
- Test proxies before using
- Monitor success rates
- Adjust timing based on platform
- Use appropriate browser implementation

### **Maintenance**
- Update dependencies regularly
- Monitor for platform changes
- Backup working configurations
- Test new features before production

## 📞 Getting Help

### **Documentation**
- [V2Ray Enhanced Guide](docs/README_V2RAY_ENHANCED.md)
- [Alternative Methods](docs/README_ALTERNATIVE_METHODS.md)
- [Free V2Ray Servers](docs/GET_FREE_V2RAY_SERVERS.md)

### **Testing**
```bash
# Test all components
python test_setup.py

# Test specific implementation
python scripts/test_implementations.py

# Check requirements
python check_requirements.py
```

### **Examples**
```bash
# Quick start example
python examples/quick_start.py

# Test personality system
python scripts/test_personality.py
```

---

**🎯 Ready to configure your SurveyBot for maximum performance! 🚀**
