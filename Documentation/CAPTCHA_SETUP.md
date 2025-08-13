# 🚀 Quick Captcha Setup Guide

Based on the test results, here's how to set up captcha solving for your Enhanced SurveyBot:

## 📋 Current Status

- ❌ **CapSolver API**: Not configured
- ❌ **Anti-Captcha API**: Not configured  
- ❌ **Local OCR**: Not installed

## 🔧 Setup Instructions

### **1. CapSolver Setup (Recommended)**

1. **Visit [CapSolver.com](https://capsolver.com/)**
2. **Create an account** and verify your email
3. **Add funds** (minimum $5 recommended)
4. **Get your API key** from the dashboard
5. **Add to your `.env` file**:
   ```bash
   CAPSOLVER_API_KEY=your_actual_api_key_here
   ```

### **2. Anti-Captcha Setup (Backup)**

1. **Visit [Anti-Captcha.com](https://anti-captcha.com/)**
2. **Create an account** and verify your email
3. **Add funds** (minimum $3 recommended)
4. **Get your API key** from the dashboard
5. **Add to your `.env` file**:
   ```bash
   ANTI_CAPTCHA_API_KEY=your_actual_api_key_here
   ```

### **3. Local OCR Setup (Free Fallback)**

```bash
# Install tesseract OCR
sudo apt-get install tesseract-ocr

# Install Python package
pip install pytesseract
```

## 🧪 Test Your Setup

After configuring the APIs, run the test again:

```bash
# Activate virtual environment
source venv/bin/activate

# Test captcha APIs
python scripts/test_captcha_apis.py
```

## 💰 Pricing Information

| Service | reCAPTCHA v2 | hCaptcha | Image Captcha | Success Rate |
|---------|-------------|----------|---------------|--------------|
| **CapSolver** | $0.8/1000 | $0.8/1000 | $0.3/1000 | ~95% |
| **Anti-Captcha** | $1.0/1000 | $1.0/1000 | $0.5/1000 | ~90% |
| **Local OCR** | N/A | N/A | Free | ~70% |

## 🎯 Recommended Setup

1. **Primary**: CapSolver (best price/performance)
2. **Backup**: Anti-Captcha (redundancy)
3. **Fallback**: Local OCR (free for simple captchas)

## 📝 Example .env Configuration

```bash
# Captcha Solving APIs
CAPSOLVER_API_KEY=CAP-1234567890ABCDEF
ANTI_CAPTCHA_API_KEY=1234567890abcdef

# Enhanced Settings
LOCAL_CAPTCHA_SOLVING=true
HUMANIZE_INTERACTIONS=true
RANDOM_DELAYS=true

# Other settings...
GOOGLE_API_KEY=your_google_api_key
```

## 🚀 Next Steps

1. **Set up at least one captcha service** (CapSolver recommended)
2. **Test the APIs** using the test script
3. **Run the enhanced bot**:
   ```bash
   python bot_implementations/survey_bot_enhanced.py
   ```

## 🔍 Troubleshooting

### **API Key Issues**
- Make sure the API key is copied correctly
- Check that you have sufficient balance
- Verify the API key format

### **Local OCR Issues**
- Install tesseract: `sudo apt-get install tesseract-ocr`
- Install Python package: `pip install pytesseract`

### **Test Script Issues**
- Make sure virtual environment is activated
- Install required packages: `pip install requests python-dotenv`

## 📞 Support

- **CapSolver**: [support@capsolver.com](mailto:support@capsolver.com)
- **Anti-Captcha**: [support@anti-captcha.com](mailto:support@anti-captcha.com)
- **Local OCR**: Check tesseract installation

---

**Note**: You only need to set up **one** captcha solving service to get started. CapSolver is recommended for best results.
