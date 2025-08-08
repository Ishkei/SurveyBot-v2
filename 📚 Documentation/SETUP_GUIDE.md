# 🚀 SurveyBot Setup Guide

> **Complete step-by-step guide to set up and run SurveyBot**

## 📋 Prerequisites

### **System Requirements**
- ✅ **Python 3.8+** installed
- ✅ **Chrome Browser** installed
- ✅ **Git** installed
- ✅ **Internet Connection** for downloads

### **Check Your System**
```bash
# Check Python version
python --version

# Check Chrome version
google-chrome --version

# Check Git version
git --version
```

## 🎯 Step 1: Clone Repository

### **1.1 Clone the Repository**
```bash
# Clone the repository
git clone https://github.com/yourusername/SurveyBot.git

# Navigate to the directory
cd SurveyBot
```

### **1.2 Verify Structure**
```bash
# Check the organized structure
ls -la

# You should see:
# 🎯 Main Files to Run/
# 📁 Project Structure/
# ⚙️ Configurations/
# 🔧 Tools and Scripts/
# 📚 Documentation/
# 📂 Examples & Demos/
# 🧪 Tests/
# 🖼️ Assets/
```

## 🔧 Step 2: Environment Setup

### **2.1 Create Virtual Environment**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate

# On Windows:
# venv\Scripts\activate
```

### **2.2 Install Dependencies**
```bash
# Install main requirements
pip install -r "⚙️ Configurations/requirements.txt"

# Install additional requirements (optional)
pip install -r "⚙️ Configurations/requirements_enhanced.txt"
```

### **2.3 Verify Installation**
```bash
# Check if all packages are installed
python "🔧 Tools and Scripts/check_requirements.py"
```

## ⚙️ Step 3: Configuration Setup

### **3.1 Create Environment File**
```bash
# Copy environment template
cp "⚙️ Configurations/env.example" .env

# Edit the environment file
nano .env
```

### **3.2 Configure API Keys**
```env
# Required: Google Gemini API Key
GOOGLE_API_KEY=your_gemini_api_key_here

# Optional: Survey platform credentials
QMEE_USERNAME=your_qmee_username
QMEE_PASSWORD=your_qmee_password

# Browser settings
BROWSER_TYPE=v2ray
SURVEY_PLATFORM=qmee
HEADLESS=false
```

### **3.3 Get Google Gemini API Key**
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## 🚀 Step 4: V2Ray Setup

### **4.1 Install V2Ray System**
```bash
# Install V2Ray and configure proxy servers
python "🔧 Tools and Scripts/scripts/setup_v2ray.py"
```

### **4.2 Configure Proxy Servers**
```bash
# Convert Telegram servers (optional)
python "🔧 Tools and Scripts/scripts/telegram_v2ray_servers.py"

# Test proxy configuration
python "🔧 Tools and Scripts/scripts/test_implementations.py"
```

### **4.3 Verify V2Ray Installation**
```bash
# Check V2Ray binary
ls -la "📁 Project Structure/v2ray/"

# Test proxy connection
curl -x socks5://127.0.0.1:1080 https://httpbin.org/ip
```

## 🧪 Step 5: Testing Setup

### **5.1 Run Setup Tests**
```bash
# Test all components
python "🧪 Tests/test_setup.py"

# Test specific implementations
python "🔧 Tools and Scripts/scripts/test_implementations.py"
```

### **5.2 Test Configuration**
```bash
# Show current configuration
python "🎯 Main Files to Run/run_bot.py" --config

# Test proxies
python "🎯 Main Files to Run/run_bot.py" --test-proxies
```

## 🎯 Step 6: Run the Bot

### **6.1 Basic Run**
```bash
# Run with V2Ray enhanced implementation (RECOMMENDED)
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray
```

### **6.2 Advanced Options**
```bash
# Run in headless mode
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray --headless

# Run with specific platform
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray --platform qmee

# Run with different implementation
python "🎯 Main Files to Run/run_bot.py" --implementation undetected
```

### **6.3 Alternative Entry Points**
```bash
# Self-Operating Computer mode
python "🎯 Main Files to Run/run_soc_bot.py"

# Vision AI mode
python "🎯 Main Files to Run/run_vision_bot.py"

# Lightweight mode
python "🎯 Main Files to Run/run_lightweight_bot.py"
```

## 🔍 Step 7: Troubleshooting

### **7.1 Common Issues**

#### **V2Ray Binary Not Found**
```bash
# Reinstall V2Ray
python "🔧 Tools and Scripts/scripts/setup_v2ray.py"

# Check if binary exists
ls -la "📁 Project Structure/v2ray/v2ray"
```

#### **Proxy Connection Failed**
```bash
# Test proxy configuration
python "📁 Project Structure/proxy_management/proxy_manager_v2ray.py"

# Check proxy server status
curl -x socks5://127.0.0.1:1080 https://httpbin.org/ip
```

#### **Browser Detection**
```bash
# Enable additional stealth options
# Edit survey_bot_v2ray.py to add more stealth features
```

#### **API Key Issues**
```bash
# Verify API key is set
cat .env | grep GOOGLE_API_KEY

# Test API connection
python "🧪 Tests/test_vision_dependencies.py"
```

### **7.2 Debug Mode**
```bash
# Run with verbose logging
python "📁 Project Structure/bot_implementations/survey_bot_v2ray.py" --debug

# Test all components
python "🔧 Tools and Scripts/scripts/test_implementations.py"
```

## 📊 Step 8: Monitor Performance

### **8.1 Check Logs**
```bash
# Monitor bot activity
tail -f bot.log

# Check error logs
grep "ERROR" bot.log
```

### **8.2 Performance Metrics**
- **Detection Rate**: Should be 90%+ reduction
- **Success Rate**: Should be 80%+ survey completion
- **Proxy Reliability**: Should be 95%+ uptime
- **Performance**: Should be 3x faster than basic proxies

## 🎯 Step 9: Advanced Configuration

### **9.1 Custom Proxy Configuration**
```bash
# Edit proxy configuration
nano "⚙️ Configurations/configs/v2ray_proxies.json"

# Add your own V2Ray servers
{
  "name": "your_server_name",
  "protocol": "vmess",
  "address": "your_server_ip",
  "port": 443,
  "uuid": "your_uuid",
  "security": "",
  "network": "ws",
  "path": "/",
  "fp": "chrome"
}
```

### **9.2 Custom Personality**
```bash
# Edit personality configuration
nano "⚙️ Configurations/configs/persona.json"

# Customize AI responses
{
  "name": "Your Persona",
  "age": 25,
  "location": "United States",
  "interests": ["technology", "music", "travel"],
  "responses": {
    "greeting": "Hi there! I'm excited to help with this survey."
  }
}
```

## 🚀 Step 10: Scaling Up

### **10.1 Multiple Instances**
```bash
# Run multiple bot instances
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray &
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray --platform earnhaus &
```

### **10.2 Automated Scheduling**
```bash
# Create cron job for automated running
crontab -e

# Add this line to run every hour
0 * * * * cd /path/to/SurveyBot && python "🎯 Main Files to Run/run_bot.py" --implementation v2ray
```

## ✅ Verification Checklist

- [ ] ✅ Python 3.8+ installed
- [ ] ✅ Chrome browser installed
- [ ] ✅ Repository cloned
- [ ] ✅ Virtual environment created
- [ ] ✅ Dependencies installed
- [ ] ✅ Environment file configured
- [ ] ✅ Google API key set
- [ ] ✅ V2Ray installed
- [ ] ✅ Proxy servers configured
- [ ] ✅ Tests passed
- [ ] ✅ Bot runs successfully
- [ ] ✅ Performance metrics met

## 🎉 Congratulations!

You have successfully set up SurveyBot! The bot is now ready to:

- 🔒 **Bypass detection** with advanced V2Ray proxies
- 🤖 **Solve surveys** with AI-powered responses
- 📊 **Earn money** from multiple survey platforms
- ⚡ **Scale efficiently** with enterprise-grade architecture

### **Next Steps:**
1. **Monitor performance** and adjust settings as needed
2. **Add more proxy servers** for better reliability
3. **Customize personality** for better survey responses
4. **Scale up** by running multiple instances
5. **Join the community** for tips and updates

---

**🚀 Ready to earn $2k+ monthly with automated survey completion! 🎯**

**Need help? Check the [Troubleshooting Guide](TROUBLESHOOTING.md) or [Documentation](docs/README_V2RAY_ENHANCED.md)**
