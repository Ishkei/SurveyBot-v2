# Self-Operating Computer Modes Guide

## 🚀 **Complete Integration with All SOC Modes**

This guide covers all available Self-Operating Computer modes and how to use them with our survey bot.

## 🤖 **Available Models**

### **1. OpenAI Models**
```bash
# Default GPT-4o (recommended)
operate

# GPT-4 with OCR (best for surveys)
operate -m gpt-4-with-ocr

# OpenAI o1 with OCR
operate -m o1-with-ocr

# OpenAI GPT-4.1 with OCR
operate -m gpt-4.1-with-ocr
```

### **2. Multimodal Models**
```bash
# Google Gemini Pro Vision
operate -m gemini-pro-vision

# Anthropic Claude 3
operate -m claude-3

# Qwen Vision Language
operate -m qwen-vl

# LLaVa via Ollama (local)
operate -m llava
```

### **3. Special Modes**
```bash
# Voice Mode
operate --voice

# Set-of-Mark (SoM) Prompting
operate -m gpt-4-with-som
```

## 🎯 **Model Recommendations for Survey Automation**

### **Best for Surveys:**
1. **`gpt-4-with-ocr`** - Best text recognition and accuracy
2. **`gpt-4o`** - Default, good all-around performance
3. **`gemini-pro-vision`** - Good alternative, often faster

### **For Advanced Users:**
1. **`gpt-4-with-som`** - Enhanced visual grounding
2. **`claude-3`** - Good reasoning capabilities
3. **`llava`** - Local processing (no API costs)

## 🔧 **Setup Requirements**

### **1. API Keys**
```bash
# OpenAI (required for most modes)
OPENAI_API_KEY=your_openai_key

# Google Gemini
GOOGLE_API_KEY=your_gemini_key

# Anthropic Claude
ANTHROPIC_API_KEY=your_claude_key

# Qwen
QWEN_API_KEY=your_qwen_key
```

### **2. Voice Mode Setup**
```bash
# Install audio requirements
pip install -r requirements-audio.txt

# Linux
sudo apt install portaudio19-dev python3-pyaudio

# macOS
brew install portaudio
```

### **3. LLaVa Setup (Local)**
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull LLaVa model
ollama pull llava

# Start Ollama server
ollama serve
```

## 🚀 **Usage Examples**

### **Basic Survey Automation**
```python
from bot_implementations.advanced_operate_integration import AdvancedOperateIntegration

bot = AdvancedOperateIntegration(config)

# Use recommended OCR mode
await bot.run_survey_automation_with_model("gpt-4-with-ocr")

# Use Gemini for speed
await bot.run_survey_automation_with_model("gemini-pro-vision")

# Use Claude for complex reasoning
await bot.run_survey_automation_with_model("claude-3")
```

### **Voice Mode Survey**
```python
# Run with voice input
success = await bot.run_operate_with_model(
    "Fill out this survey naturally",
    "gpt-4o",
    voice_mode=True
)
```

### **Advanced Visual Recognition**
```python
# Use Set-of-Mark for better button detection
success = await bot.run_operate_with_model(
    "Click on the survey start button",
    "gpt-4-with-som"
)
```

## 📊 **Model Comparison**

| Model | Speed | Accuracy | Cost | Best For |
|-------|-------|----------|------|----------|
| `gpt-4o` | Medium | High | Medium | General automation |
| `gpt-4-with-ocr` | Medium | Very High | Medium | **Survey automation** |
| `gemini-pro-vision` | Fast | High | Low | Quick tasks |
| `claude-3` | Medium | High | Medium | Complex reasoning |
| `qwen-vl` | Fast | Medium | Low | Budget automation |
| `llava` | Slow | Medium | Free | Local processing |
| `gpt-4-with-som` | Medium | Very High | High | Visual tasks |

## 🎯 **Survey-Specific Recommendations**

### **For Different Survey Types:**

#### **1. Simple Forms (Demographics)**
```bash
operate -m gemini-pro-vision
```
- Fast processing
- Good for straightforward questions
- Lower cost

#### **2. Complex Surveys (Research Studies)**
```bash
operate -m gpt-4-with-ocr
```
- Best text recognition
- Handles complex layouts
- Most accurate responses

#### **3. Visual-Heavy Surveys**
```bash
operate -m gpt-4-with-som
```
- Enhanced visual grounding
- Better button detection
- Improved navigation

#### **4. Budget-Conscious Automation**
```bash
operate -m qwen-vl
# or
operate -m llava  # (local, no API costs)
```

## 🔧 **Advanced Integration**

### **Model Selection Based on Survey Type**
```python
async def select_best_model(survey_type: str) -> str:
    """Select the best SOC model based on survey type."""
    model_map = {
        "demographics": "gemini-pro-vision",  # Fast, simple
        "research": "gpt-4-with-ocr",        # Accurate, detailed
        "visual": "gpt-4-with-som",          # Visual recognition
        "budget": "qwen-vl",                 # Cost-effective
        "local": "llava"                     # No API costs
    }
    return model_map.get(survey_type, "gpt-4-with-ocr")
```

### **Multi-Model Fallback**
```python
async def run_with_fallback(objective: str) -> bool:
    """Run with fallback to different models if one fails."""
    models = ["gpt-4-with-ocr", "gemini-pro-vision", "claude-3"]
    
    for model in models:
        success = await bot.run_operate_with_model(objective, model)
        if success:
            return True
    
    return False
```

## 🚀 **Running the Advanced Integration**

### **1. Test All Models**
```bash
python bot_implementations/advanced_operate_integration.py
```

### **2. Test Specific Mode**
```python
# Test OCR mode
await bot.run_ocr_mode_demo()

# Test voice mode
await bot.run_voice_mode_demo()

# Test SoM mode
await bot.run_som_mode_demo()
```

### **3. Run Survey with Best Model**
```python
# Use recommended model for surveys
await bot.run_survey_automation_with_model("gpt-4-with-ocr")
```

## 🎉 **Benefits of Multi-Model Support**

### **1. Flexibility**
- Choose the best model for each task
- Fallback options if one model fails
- Cost optimization based on needs

### **2. Performance**
- OCR mode for better text recognition
- SoM mode for visual tasks
- Voice mode for hands-free operation

### **3. Reliability**
- Multiple API providers
- Local processing option (LLaVa)
- Redundancy and fallback systems

## 📝 **Next Steps**

1. **Set up API keys** for your preferred models
2. **Test different modes** to find what works best
3. **Use the advanced integration** for production automation
4. **Monitor performance** and costs across different models

The advanced integration gives you access to the full power of Self-Operating Computer with all available modes and models! 🚀
