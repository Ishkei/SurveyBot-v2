# Self-Operating Computer Integration Guide

## 🎯 **The Correct Approach**

**Self-Operating Computer is a command-line tool, NOT a Python library.** This is why direct imports don't work. Here's the proper way to integrate it:

## ✅ **How Self-Operating Computer Actually Works**

### **1. Command-Line Interface**
```bash
# Basic usage
operate

# With different models
operate -m gpt-4-with-ocr
operate -m gemini-pro-vision
operate -m claude-3
operate --voice
```

### **2. Subprocess Integration (The Right Way)**
```python
import subprocess

# Run operate command
process = subprocess.Popen(
    ['operate'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

# Send objective
stdout, stderr = process.communicate(input="Your objective here\n")
```

## 🤖 **Our Integration Strategy**

### **1. OperateIntegration Class**
- Uses `subprocess` to call `operate` command
- Sends objectives programmatically
- Handles responses and errors
- Integrates with Discord-style personality

### **2. Survey Automation Workflow**
```python
objectives = [
    "Navigate to survey website",
    "Fill out demographic questions",
    "Answer survey questions naturally",
    "Click Next button",
    "Complete and submit survey"
]

for objective in objectives:
    success = await bot.run_operate_objective(objective)
    if not success:
        break
```

## 🚀 **Available Integration Files**

### **1. `operate_integration.py`**
- **Main integration class**
- Handles operate command execution
- Integrates with personality responses
- Supports multiple AI models

### **2. `simple_soc_bot.py`**
- **Simplified integration**
- Basic operate command usage
- Good for testing and learning

### **3. `demo_soc_survey_bot.py`**
- **Comprehensive demo**
- Shows all features and capabilities
- Great for understanding the system

## 🎯 **Usage Examples**

### **Basic Survey Automation**
```python
from bot_implementations.operate_integration import OperateIntegration

bot = OperateIntegration(config)
await bot.run_survey_automation()
```

### **Test Different Models**
```python
await bot.run_with_different_models()
```

### **Custom Objectives**
```python
success = await bot.run_operate_objective(
    "Go to https://example.com and fill out the form",
    model="gpt-4-with-ocr"
)
```

## 🔧 **Configuration**

### **Environment Variables (.env)**
```bash
# API Keys
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_gemini_key

# Self-Operating Computer Settings
USE_SELF_OPERATING_COMPUTER=true
VISION_MODEL=gpt-4-vision-preview
USE_MOUSE_CONTROL=true

# Personality Settings
PERSONALITY_STYLE=discord_casual
MAX_SURVEYS=10
```

## 🎉 **Key Benefits of This Approach**

### **1. Proper Framework Usage**
- Uses Self-Operating Computer as intended
- Leverages all its capabilities
- Maintains compatibility with updates

### **2. Flexible Integration**
- Can switch between AI models
- Supports voice input
- Handles different survey types

### **3. Discord-Style Personality**
- Generates natural responses
- Maintains consistency
- Human-like behavior

### **4. Error Handling**
- Robust retry logic
- Graceful failure handling
- Detailed logging

## 🚀 **Running the Integration**

### **1. Test the Integration**
```bash
python test_operate_integration.py
```

### **2. Run Survey Automation**
```bash
python bot_implementations/operate_integration.py
```

### **3. View Demo**
```bash
python demo_soc_survey_bot.py
```

### **4. Manual Testing**
```bash
operate
# Enter: "Go to a website and take a screenshot"
```

## 🎯 **Why This Approach Works**

### **1. Framework Design**
- Self-Operating Computer is designed as a CLI tool
- It's not meant to be imported as a Python library
- Subprocess integration is the correct approach

### **2. Flexibility**
- Can use any AI model supported by operate
- Easy to extend with new objectives
- Maintains separation of concerns

### **3. Reliability**
- Uses the framework as intended
- Less likely to break with updates
- Better error handling

## 🎉 **Success!**

This integration approach:
- ✅ **Works correctly** with Self-Operating Computer
- ✅ **Maintains all features** of the framework
- ✅ **Integrates seamlessly** with our survey bot
- ✅ **Supports Discord-style personality**
- ✅ **Handles multiple AI models**

The key insight is that **Self-Operating Computer is a command-line automation framework**, not a Python library. Our subprocess integration is the proper way to use it programmatically! 🚀
