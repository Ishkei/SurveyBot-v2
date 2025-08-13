# Self-Operating Computer Integration

## 🎯 Overview

This integration brings the [Self-Operating Computer Framework](https://github.com/OthersideAI/self-operating-computer) to our survey bot, implementing Blue Parker's vision-based approach from the Discord community. The framework enables AI models to control a computer using human-like inputs and outputs, exactly as demonstrated in [Blue Parker's YouTube video](https://www.youtube.com/watch?v=UKRti40U8IA).

## 🔍 Key Features

### **Vision-Based Element Detection**
- **Screenshot Analysis**: Takes pictures of the screen and sends to GPT-4V
- **Visual Decision Making**: AI analyzes what it sees and decides next actions
- **Human-like Control**: Uses mouse clicks and keyboard strokes like a human

### **Multi-Model Support**
- **GPT-4V**: Advanced vision model for element detection
- **GPT-4o**: Latest OpenAI model for complex reasoning
- **Local Models**: LLaVA, Gemini Pro Vision via Ollama
- **Claude 3**: Anthropic's vision model

### **Advanced Automation**
- **Screen Recording**: Captures desktop activity
- **Mouse Control**: Hardware-level mouse movement
- **Keyboard Input**: Natural typing simulation
- **OCR Integration**: Text extraction and coordinate mapping

## 🚀 Installation

### **1. Install Self-Operating Computer**
```bash
# Activate virtual environment
source venv/bin/activate

# Install Self-Operating Computer
pip install self-operating-computer

# Install additional dependencies
pip install -r requirements_self_operating.txt
```

### **2. Set Up API Keys**
```bash
# Set OpenAI API key
export OPENAI_API_KEY="your_openai_api_key"

# Set other API keys (optional)
export GEMINI_API_KEY="your_gemini_api_key"
export ANTHROPIC_API_KEY="your_anthropic_api_key"
```

### **3. Configure Permissions**
Based on [Blue Parker's setup](https://www.youtube.com/watch?v=UKRti40U8IA):

**macOS:**
- **Screen Recording**: System Preferences → Privacy & Security → Screen Recording → Add Terminal
- **Accessibility**: System Preferences → Privacy & Security → Accessibility → Add Terminal

**Linux:**
- Install required packages: `sudo apt-get install python3-tk python3-dev`
- Grant X11 permissions if needed

**Windows:**
- Run as administrator for full system access

## 🎮 Usage Examples

### **Basic Self-Operating Computer Bot**
```python
from bot_implementations.self_operating_survey_bot import SelfOperatingSurveyBot

# Load config
with open('configs/self_operating_config.json', 'r') as f:
    config = json.load(f)

# Create bot
bot = SelfOperatingSurveyBot(config)

# Run survey automation
await bot.run()
```

### **Simple Task Execution**
```python
# Run a simple task like Blue Parker's demo
task = "Open a web browser and go to a survey site"
await bot.run_simple_task(task)
```

### **Command Line Usage**
```bash
# Run with default config
python run_soc_bot.py

# Run with custom config
python run_soc_bot.py configs/self_operating_config.json
```

## 🔧 Configuration

### **Self-Operating Computer Settings**
```json
{
  "self_operating_computer": {
    "USE_SELF_OPERATING_COMPUTER": true,
    "VISION_MODEL": "gpt-4-vision-preview",
    "MODEL_PROVIDER": "openai",
    "HEADLESS": false,
    "DEBUG": true,
    "SCREENSHOT_QUALITY": "high"
  }
}
```

### **Vision Model Options**
- **GPT-4V**: `gpt-4-vision-preview` (recommended)
- **GPT-4o**: `gpt-4o` (latest model)
- **Local LLaVA**: `llava` (via Ollama)
- **Gemini Pro Vision**: `gemini-pro-vision`
- **Claude 3**: `claude-3-vision`

## 🎯 Discord Community Integration

### **Blue Parker's Vision Model Approach** ✅
```python
# Screenshot → Vision AI → Action
screenshot = await self.take_screenshot()
analysis = await self.analyze_page_with_soc(screenshot)
await self.execute_action_with_soc("click", coordinates)
```

### **erick's Hardware-Level Control** ✅
```python
# Human-like mouse movement
await self.soc.click(x, y)  # Direct OS-level control
await self.soc.type_at(x, y, text)  # Natural typing
```

### **18fg's Gemini API + Persona** ✅
```python
# Discord-style responses
response = await generate_personality_response(
    question_text,
    style="discord_casual"
)
```

### **smewknox's OCR + Vision** ✅
```python
# OCR integration for text extraction
analysis = await self.soc.analyze_screenshot(
    screenshot,
    prompt="Analyze this survey page and identify elements"
)
```

## 📊 Comparison with Previous Approaches

| Feature | Previous Bot | Self-Operating Computer |
|---------|-------------|------------------------|
| **Element Detection** | HTML parsing | Vision-based analysis |
| **Mouse Control** | Browser automation | OS-level control |
| **Text Extraction** | DOM scraping | OCR + Vision |
| **Human-like Movement** | Bézier curves | Natural patterns |
| **Model Support** | Single model | Multi-model |
| **Error Recovery** | Fallback strategies | Vision verification |

## 🎮 Demo Tasks

Based on [Blue Parker's video](https://www.youtube.com/watch?v=UKRti40U8IA):

### **1. Open Applications**
```python
task = "Open Sublime Text"
await bot.run_simple_task(task)
```

### **2. Web Navigation**
```python
task = "Do a YouTube search for Matthew Berman's YouTube channel"
await bot.run_simple_task(task)
```

### **3. Survey Automation**
```python
# Navigate to survey and complete it
survey_url = "https://www.surveymonkey.com/r/demo-survey"
await bot.run_survey_automation(survey_url)
```

## 🔍 Technical Implementation

### **Screenshot Analysis**
```python
async def analyze_page_with_soc(self, screenshot: bytes) -> Dict[str, Any]:
    """Analyze page using Self-Operating Computer framework."""
    analysis = await self.soc.analyze_screenshot(
        screenshot,
        prompt="Analyze this survey page and identify: 1) Questions 2) Answer options 3) Navigation buttons 4) Form fields. Return as JSON."
    )
    return analysis
```

### **Action Execution**
```python
async def execute_action_with_soc(self, action: str, coordinates: Optional[tuple] = None):
    """Execute action using Self-Operating Computer."""
    if action == "click" and coordinates:
        x, y = coordinates
        await self.soc.click(x, y)
    elif action == "type" and coordinates:
        x, y = coordinates
        await self.soc.type_at(x, y, self.current_task)
```

### **Survey Automation Loop**
```python
async def run_self_operating_survey(self):
    """Run survey using Self-Operating Computer framework."""
    while True:
        # 1. Take screenshot
        screenshot = await self.take_screenshot()
        
        # 2. Analyze with vision model
        analysis = await self.analyze_page_with_soc(screenshot)
        
        # 3. Process questions
        for question in analysis.get('questions', []):
            response = await self.process_survey_question_soc(question['text'])
            await self.handle_question_answer_soc(question, response)
        
        # 4. Navigate
        await self.navigate_next_page_soc(analysis)
```

## 🚀 Advanced Features

### **Voice Mode**
```bash
# Clone repo and install audio requirements
git clone https://github.com/OthersideAI/self-operating-computer
cd self-operating-computer
pip install -r requirements.txt

# Run with voice input
operate --voice
```

### **OCR Mode**
```python
# Enhanced OCR with coordinate mapping
ocr_data = await self.soc.extract_text_with_coordinates(screenshot)
for text, coords in ocr_data:
    if "survey question" in text.lower():
        await self.soc.click(coords)
```

### **Local Model Support**
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull LLaVA model
ollama pull llava

# Run with local model
operate -l llama
```

## 🎯 Benefits

### **1. Vision > HTML**
- **Blue Parker**: "If you go the webscraping route, its easier for them to find out in my opinion. They can put invisible text in the html that makes the AI give itself up."
- **Implementation**: Pure vision approach with OCR fallback

### **2. Human-like Interactions**
- **erick**: "You can add a layer of safety if you want by adding a fake sort of 'cursor' which simulates human mouse movements with Bézier curves."
- **Implementation**: OS-level mouse control with natural patterns

### **3. Multi-Model Flexibility**
- Support for GPT-4V, GPT-4o, LLaVA, Gemini, Claude 3
- Local model support via Ollama
- Fallback strategies for different models

### **4. Advanced Error Recovery**
- Vision-based verification of actions
- Multiple model fallbacks
- Natural error handling

## 🎉 Conclusion

The Self-Operating Computer integration represents the pinnacle of vision-based survey automation, combining:

1. **Blue Parker's vision model approach** for reliable element detection
2. **erick's hardware-level control** for human-like interactions
3. **18fg's AI-powered responses** with Discord personality
4. **smewknox's OCR integration** for text extraction
5. **Community error recovery** strategies

This creates a survey bot that operates exactly like a human user, with the same inputs and outputs, making it virtually undetectable while maintaining high accuracy and reliability.

---

**💡 Community-Driven Development**: This integration is a direct result of the collaborative knowledge sharing in the AI Survey Club Discord server and Blue Parker's groundbreaking work with the Self-Operating Computer framework.
