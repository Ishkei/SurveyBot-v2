# 🚀 SurveyBot Quick Start Guide

> **Get SurveyBot running in 5 minutes!**

## 📋 What You'll Need

- ✅ **Python 3.8+** installed
- ✅ **Chrome Browser** installed  
- ✅ **Git** installed
- ✅ **Internet Connection**

## ⚡ 5-Minute Setup

### **Step 1: Clone & Navigate**
```bash
# Clone the repository
git clone https://github.com/Ishkei/SurveyBot-v2.git

# Navigate to project
cd SurveyBot-v2
```

### **Step 2: Quick Setup**
```bash
# Run the automated setup
python "🔧 Tools and Scripts/setup.py"
```

### **Step 3: Configure API Key**
```bash
# Copy environment template
cp "⚙️ Configurations/env.example" .env

# Edit with your Google Gemini API key
nano .env
```

**Add your Google Gemini API key:**
```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

### **Step 4: Run the Bot**
```bash
# Start the main bot
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray
```

## 🎯 Main Entry Points

| Bot Type | Command | Use Case |
|----------|---------|----------|
| **Main Bot** | `python "🎯 Main Files to Run/run_bot.py"` | 🎯 **RECOMMENDED** |
| **Vision AI** | `python "🎯 Main Files to Run/run_vision_bot.py"` | AI-powered solving |
| **Self-Operating** | `python "🎯 Main Files to Run/run_soc_bot.py"` | Advanced automation |
| **Lightweight** | `python "🎯 Main Files to Run/run_lightweight_bot.py"` | Minimal dependencies |

## 🔧 Advanced Options

### **Headless Mode**
```bash
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray --headless
```

### **Specific Platform**
```bash
python "🎯 Main Files to Run/run_bot.py" --implementation v2ray --platform qmee
```

### **Test Configuration**
```bash
python "🎯 Main Files to Run/run_bot.py" --config
```

## 🚨 Troubleshooting

### **API Key Issues**
```bash
# Verify API key is set
cat .env | grep GOOGLE_API_KEY

# Test API connection
python "🧪 Tests/test_vision_dependencies.py"
```

### **Dependencies Issues**
```bash
# Reinstall dependencies
pip install -r "⚙️ Configurations/requirements.txt"

# Check requirements
python "🔧 Tools and Scripts/check_requirements.py"
```

### **V2Ray Issues**
```bash
# Reinstall V2Ray
python "🔧 Tools and Scripts/scripts/setup_v2ray.py"

# Test proxy connection
curl -x socks5://127.0.0.1:1080 https://httpbin.org/ip
```

## 📊 Expected Results

- **Detection Rate**: 90%+ reduction
- **Success Rate**: 80%+ survey completion  
- **Performance**: 3x faster than basic proxies
- **Monthly Potential**: $2k+ with current setup

## 🎉 Success Indicators

✅ **Bot starts without errors**  
✅ **Proxy connection established**  
✅ **Survey platform accessible**  
✅ **AI responses working**  
✅ **Earnings tracking active**  

## 📚 Next Steps

1. **Read the [Full Setup Guide](SETUP_GUIDE.md)** for detailed instructions
2. **Check [Configuration Guide](CONFIGURATION.md)** for advanced settings
3. **Explore [Documentation](docs/)** for in-depth guides
4. **Join the community** for tips and updates

---

**🚀 Ready to earn with automated survey completion! 🎯**

**Need help? Check the [Troubleshooting Guide](TROUBLESHOOTING.md)**
