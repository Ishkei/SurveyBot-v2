# 🔧 SurveyBot Troubleshooting Guide

> **Solve common issues and get your bot running smoothly**

## 🚨 Common Issues & Solutions

### **1. API Key Problems**

#### **Issue: "Google API key not found"**
```bash
# Solution: Set your API key
echo "GOOGLE_API_KEY=your_actual_api_key_here" >> .env

# Verify it's set correctly
cat .env | grep GOOGLE_API_KEY
```

#### **Issue: "API quota exceeded"**
- **Solution**: Get a new API key from [Google AI Studio](https://aistudio.google.com/)
- **Alternative**: Use the lightweight bot without AI features

### **2. V2Ray Connection Issues**

#### **Issue: "V2Ray binary not found"**
```bash
# Solution: Reinstall V2Ray
python "🔧 Tools and Scripts/scripts/setup_v2ray.py"

# Verify installation
ls -la "📁 Project Structure/v2ray/v2ray"
```

#### **Issue: "Proxy connection failed"**
```bash
# Test proxy connection
curl -x socks5://127.0.0.1:1080 https://httpbin.org/ip

# Check V2Ray status
ps aux | grep v2ray

# Restart V2Ray
pkill v2ray
python "🔧 Tools and Scripts/scripts/setup_v2ray.py"
```

#### **Issue: "No working proxies"**
```bash
# Update proxy list
python "🔧 Tools and Scripts/scripts/telegram_v2ray_servers.py"

# Test proxies
python "🔧 Tools and Scripts/scripts/test_implementations.py"
```

### **3. Browser Detection Issues**

#### **Issue: "Bot detected by website"**
```bash
# Enable additional stealth options
python "🎯 Main Files to Run/run_bot.py" --implementation undetected

# Or use headless mode
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray --headless
```

#### **Issue: "Chrome not found"**
```bash
# Install Chrome
sudo apt update
sudo apt install google-chrome-stable

# Or use system Chrome
which google-chrome
```

### **4. Dependencies Issues**

#### **Issue: "Module not found"**
```bash
# Reinstall all dependencies
pip install -r "⚙️ Configurations/requirements.txt"

# Check what's missing
python "🔧 Tools and Scripts/check_requirements.py"
```

#### **Issue: "Permission denied"**
```bash
# Fix permissions
chmod +x "🎯 Main Files to Run/run_bot.py"
chmod +x "🔧 Tools and Scripts/scripts/setup_v2ray.py"
```

### **5. Survey Platform Issues**

#### **Issue: "Login failed"**
```bash
# Check credentials
cat .env | grep -E "(USERNAME|PASSWORD)"

# Test login manually
python "🔧 Tools and Scripts/scripts/test_bot.py"
```

#### **Issue: "No surveys available"**
- **Solution**: Try different platforms (qmee, earnhaus, prolific)
- **Alternative**: Wait for new surveys or check platform status

### **6. Performance Issues**

#### **Issue: "Bot is slow"**
```bash
# Use lightweight version
python "🎯 Main Files to Run/run_lightweight_bot.py"

# Or optimize settings
python "🎯 Main Files to Run/run_bot.py" --headless
```

#### **Issue: "High CPU usage"**
```bash
# Reduce concurrent instances
# Edit config to limit parallel processes
nano "⚙️ Configurations/configs/self_operating_config.json"
```

## 🔍 Debug Mode

### **Enable Verbose Logging**
```bash
# Run with debug output
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray --debug

# Check logs
tail -f bot.log
```

### **Test Individual Components**
```bash
# Test V2Ray
python "🔧 Tools and Scripts/scripts/test_v2ray_manual.py"

# Test AI
python "🧪 Tests/test_vision_dependencies.py"

# Test proxies
python "🔧 Tools and Scripts/scripts/test_proxy_integration.py"
```

## 📊 Performance Monitoring

### **Check Bot Status**
```bash
# Monitor bot activity
tail -f bot.log | grep -E "(SUCCESS|ERROR|WARNING)"

# Check earnings
grep "earned" bot.log
```

### **System Resources**
```bash
# Check memory usage
htop

# Check disk space
df -h

# Check network
netstat -tulpn
```

## 🛠️ Advanced Troubleshooting

### **Reset Everything**
```bash
# Remove all generated files
rm -rf __pycache__/
rm -f bot.log
rm -f .env

# Reinstall from scratch
python "🔧 Tools and Scripts/setup.py"
```

### **Update to Latest Version**
```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
pip install -r "⚙️ Configurations/requirements.txt"
```

### **Check System Compatibility**
```bash
# Python version
python --version

# Chrome version
google-chrome --version

# System info
uname -a
```

## 📞 Getting Help

### **Before Asking for Help**
1. ✅ **Check this troubleshooting guide**
2. ✅ **Enable debug mode and check logs**
3. ✅ **Try the quick fixes above**
4. ✅ **Test individual components**

### **When Reporting Issues**
Include:
- **Error message** (exact text)
- **System information** (OS, Python version)
- **Steps to reproduce**
- **Debug logs** (if available)

### **Community Resources**
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check the [docs folder](docs/)
- **Examples**: Look at [examples folder](📂 Examples & Demos/)

## 🎯 Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| **API Key** | `echo "GOOGLE_API_KEY=your_key" >> .env` |
| **V2Ray** | `python "🔧 Tools and Scripts/scripts/setup_v2ray.py"` |
| **Dependencies** | `pip install -r "⚙️ Configurations/requirements.txt"` |
| **Permissions** | `chmod +x "🎯 Main Files to Run/run_bot.py"` |
| **Detection** | Use `--headless` or `--implementation undetected` |
| **Performance** | Use lightweight bot or reduce instances |

---

**🔧 Still having issues? Check the [Setup Guide](SETUP_GUIDE.md) or [Configuration Guide](CONFIGURATION.md)**
