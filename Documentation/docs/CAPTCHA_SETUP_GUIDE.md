# Captcha Solving Setup Guide

This guide will help you set up captcha solving capabilities for the Enhanced SurveyBot.

## 🎯 Overview

The Enhanced SurveyBot supports multiple captcha solving methods:

1. **CapSolver API** - Primary service (recommended)
2. **Anti-Captcha API** - Secondary service (backup)
3. **Local OCR** - Fallback for simple image captchas
4. **AI Vision** - Advanced image analysis

## 🔑 API Setup

### **1. CapSolver Setup (Recommended)**

#### **Step 1: Create Account**
1. Visit [CapSolver.com](https://capsolver.com/)
2. Click "Sign Up" and create an account
3. Verify your email address

#### **Step 2: Add Funds**
1. Log into your CapSolver dashboard
2. Go to "Balance" section
3. Add funds (minimum $5 recommended)
4. Note: They offer pay-per-solve pricing

#### **Step 3: Get API Key**
1. Go to "API Key" section in dashboard
2. Copy your API key
3. Add to your `.env` file:
   ```bash
   CAPSOLVER_API_KEY=your_api_key_here
   ```

#### **Step 4: Test API Key**
```bash
# Test your CapSolver API key
python -c "
import requests
api_key = 'your_capsolver_api_key'
url = 'https://api.capsolver.com/getBalance'
payload = {'clientKey': api_key}
response = requests.post(url, json=payload)
print('Balance:', response.json().get('balance', 'Error'))
"
```

### **2. Anti-Captcha Setup (Backup)**

#### **Step 1: Create Account**
1. Visit [Anti-Captcha.com](https://anti-captcha.com/)
2. Click "Register" and create an account
3. Verify your email address

#### **Step 2: Add Funds**
1. Log into your Anti-Captcha dashboard
2. Go to "Add Funds" section
3. Add funds (minimum $3 recommended)

#### **Step 3: Get API Key**
1. Go to "API Key" section
2. Copy your API key
3. Add to your `.env` file:
   ```bash
   ANTI_CAPTCHA_API_KEY=your_api_key_here
   ```

## 🧪 Testing Captcha Solving

### **Test Script**

Create a test script to verify your captcha solving setup:

```python
#!/usr/bin/env python3
"""
Test captcha solving capabilities
"""

import os
import requests
from dotenv import load_dotenv

load_dotenv()

def test_capsolver():
    """Test CapSolver API connection"""
    api_key = os.getenv("CAPSOLVER_API_KEY")
    if not api_key:
        print("❌ CAPSOLVER_API_KEY not found in .env")
        return False
    
    try:
        url = "https://api.capsolver.com/getBalance"
        payload = {"clientKey": api_key}
        response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            if "balance" in result:
                print(f"✅ CapSolver API working - Balance: ${result['balance']}")
                return True
            else:
                print(f"❌ CapSolver API error: {result}")
                return False
        else:
            print(f"❌ CapSolver API request failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ CapSolver API test failed: {e}")
        return False

def test_anticaptcha():
    """Test Anti-Captcha API connection"""
    api_key = os.getenv("ANTI_CAPTCHA_API_KEY")
    if not api_key:
        print("❌ ANTI_CAPTCHA_API_KEY not found in .env")
        return False
    
    try:
        url = "https://api.anti-captcha.com/getBalance"
        payload = {"clientKey": api_key}
        response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            if "balance" in result:
                print(f"✅ Anti-Captcha API working - Balance: ${result['balance']}")
                return True
            else:
                print(f"❌ Anti-Captcha API error: {result}")
                return False
        else:
            print(f"❌ Anti-Captcha API request failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Anti-Captcha API test failed: {e}")
        return False

def test_local_ocr():
    """Test local OCR capabilities"""
    try:
        import pytesseract
        from PIL import Image
        
        # Create a simple test image
        img = Image.new('RGB', (100, 30), color='white')
        img.save('test_captcha.png')
        
        # Test OCR
        text = pytesseract.image_to_string(img)
        print("✅ Local OCR working")
        return True
        
    except ImportError:
        print("⚠️  pytesseract not installed. Install with: pip install pytesseract")
        return False
    except Exception as e:
        print(f"❌ Local OCR test failed: {e}")
        return False

def main():
    """Run all captcha tests"""
    print("🧪 Testing Captcha Solving Setup\n")
    
    tests = [
        ("CapSolver API", test_capsolver),
        ("Anti-Captcha API", test_anticaptcha),
        ("Local OCR", test_local_ocr),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n{'='*40}")
        print(f"Testing: {test_name}")
        print('='*40)
        
        if test_func():
            passed += 1
            print(f"✅ {test_name} PASSED")
        else:
            print(f"❌ {test_name} FAILED")
    
    print(f"\n{'='*40}")
    print(f"Results: {passed}/{total} tests passed")
    print('='*40)
    
    if passed == total:
        print("🎉 All captcha solving methods working!")
    elif passed > 0:
        print("⚠️  Some captcha methods working. Consider fixing failed ones.")
    else:
        print("❌ No captcha solving methods working. Please check setup.")

if __name__ == "__main__":
    main()
```

### **Run the Test**
```bash
# Save the test script and run it
python captcha_test.py
```

## 💰 Pricing Comparison

| Service | reCAPTCHA v2 | hCaptcha | Image Captcha | Success Rate |
|---------|-------------|----------|---------------|--------------|
| **CapSolver** | $0.8/1000 | $0.8/1000 | $0.3/1000 | ~95% |
| **Anti-Captcha** | $1.0/1000 | $1.0/1000 | $0.5/1000 | ~90% |
| **Local OCR** | N/A | N/A | Free | ~70% |

## 🔧 Configuration Options

### **Enhanced Config Settings**

```json
{
  "captcha_solving": {
    "enabled": true,
    "capsolver_api_key": "your_key",
    "anti_captcha_api_key": "your_key",
    "local_solving": true,
    "fallback_methods": ["capsolver", "anti_captcha", "manual"],
    "timeout": 60,
    "max_retries": 3
  }
}
```

### **Environment Variables**

```bash
# Primary captcha service
CAPSOLVER_API_KEY=your_capsolver_key

# Backup captcha service
ANTI_CAPTCHA_API_KEY=your_anticaptcha_key

# Local solving options
LOCAL_CAPTCHA_SOLVING=true

# Enhanced settings
HUMANIZE_INTERACTIONS=true
RANDOM_DELAYS=true
```

## 🚀 Usage Examples

### **Basic Setup**
```python
from bot_implementations.survey_bot_enhanced import EnhancedSurveyBot

# Initialize with captcha solving
bot = EnhancedSurveyBot()
bot.run()
```

### **Custom Captcha Configuration**
```python
# Custom captcha solver settings
bot = EnhancedSurveyBot()
bot.browser.captcha_solver.capsolver_api_key = "your_key"
bot.browser.captcha_solver.anti_captcha_api_key = "your_backup_key"
bot.browser.captcha_solver.local_solving = True
```

### **Test Specific Captcha Types**
```python
# Test reCAPTCHA solving
def test_recaptcha():
    solver = EnhancedCaptchaSolver()
    # Test with a known reCAPTCHA site
    # Implementation details...

# Test hCaptcha solving
def test_hcaptcha():
    solver = EnhancedCaptchaSolver()
    # Test with a known hCaptcha site
    # Implementation details...
```

## 🔍 Troubleshooting

### **Common Issues**

1. **API Key Not Working**
   ```bash
   # Check API key format
   echo $CAPSOLVER_API_KEY
   
   # Test API connection
   curl -X POST https://api.capsolver.com/getBalance \
     -H "Content-Type: application/json" \
     -d '{"clientKey":"your_key"}'
   ```

2. **Insufficient Balance**
   ```bash
   # Check balance
   python -c "
   import requests
   response = requests.post('https://api.capsolver.com/getBalance', 
                          json={'clientKey':'your_key'})
   print('Balance:', response.json())
   "
   ```

3. **Local OCR Not Working**
   ```bash
   # Install tesseract
   sudo apt-get install tesseract-ocr
   
   # Install Python package
   pip install pytesseract
   ```

4. **Captcha Detection Issues**
   ```python
   # Enable debug logging
   import logging
   logging.basicConfig(level=logging.DEBUG)
   
   # Test captcha detection
   solver = EnhancedCaptchaSolver()
   captcha_info = solver.detect_captcha(driver)
   print("Detected captcha:", captcha_info)
   ```

## 📊 Performance Monitoring

### **Success Rate Tracking**
```python
# Track captcha solving success rates
class CaptchaStats:
    def __init__(self):
        self.total_attempts = 0
        self.successful_solves = 0
        self.failed_solves = 0
    
    def record_attempt(self, success):
        self.total_attempts += 1
        if success:
            self.successful_solves += 1
        else:
            self.failed_solves += 1
    
    def get_success_rate(self):
        if self.total_attempts == 0:
            return 0
        return (self.successful_solves / self.total_attempts) * 100
```

### **Cost Monitoring**
```python
# Monitor captcha solving costs
def check_balance():
    capsolver_balance = get_capsolver_balance()
    anticaptcha_balance = get_anticaptcha_balance()
    
    print(f"CapSolver Balance: ${capsolver_balance}")
    print(f"Anti-Captcha Balance: ${anticaptcha_balance}")
    
    if capsolver_balance < 1.0:
        print("⚠️  Low CapSolver balance - consider adding funds")
```

## 🎯 Best Practices

1. **Use Multiple Services**: Have both CapSolver and Anti-Captcha as backup
2. **Monitor Costs**: Keep track of usage and balance
3. **Test Regularly**: Verify captcha solving works before running surveys
4. **Local Fallback**: Enable local OCR for simple captchas
5. **Error Handling**: Implement proper retry logic for failed solves

## 📞 Support

- **CapSolver Support**: [support@capsolver.com](mailto:support@capsolver.com)
- **Anti-Captcha Support**: [support@anti-captcha.com](mailto:support@anti-captcha.com)
- **Local OCR Issues**: Check tesseract installation

For more help with captcha solving setup, see the main documentation or create an issue in the repository.
