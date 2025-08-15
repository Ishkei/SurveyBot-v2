# Universal Question Logging Integration Guide

## 🚀 **Quick Integration (3 Steps)**

### **Step 1: Import the Universal System**
```python
# Add this to the top of your bot file
from universal_question_logger import BotIntegrationHelper
```

### **Step 2: Initialize in Your Bot**
```python
class YourSurveyBot:
    def __init__(self):
        # Your existing initialization code...
        
        # Add this line:
        self.question_logger = BotIntegrationHelper("your_bot_name")
        
        print("✅ Question logging integrated!")
```

### **Step 3: Use in Your Question Handlers**
```python
async def handle_question(self, question_text: str, question_type: str):
    # Check for cached answer first
    cached_answer = self.question_logger.get_answer(question_text, question_type)
    
    if cached_answer:
        print(f"🎯 Using cached answer: {cached_answer}")
        return cached_answer
    else:
        # Generate new answer (your existing logic)
        new_answer = await self.generate_answer(question_text)
        
        # Cache it for future use
        self.question_logger.cache_answer(question_text, question_type, new_answer)
        
        return new_answer
```

## 🔧 **Advanced Integration Options**

### **Option A: Simple Integration (Recommended)**
```python
from universal_question_logger import BotIntegrationHelper

class YourBot:
    def __init__(self):
        self.question_logger = BotIntegrationHelper("your_bot_name")
    
    def get_answer(self, question, q_type):
        return self.question_logger.get_answer(question, q_type)
    
    def cache_answer(self, question, q_type, answer):
        self.question_logger.cache_answer(question, q_type, answer)
```

### **Option B: Direct Integration**
```python
from universal_question_logger import UniversalQuestionLogger

class YourBot:
    def __init__(self):
        self.question_logger = UniversalQuestionLogger(
            log_file="your_bot_questions.json",
            log_directory="question_logs"
        )
    
    def get_answer(self, question, q_type):
        return self.question_logger.get_cached_answer(question, q_type, "your_bot_name")
    
    def cache_answer(self, question, q_type, answer):
        self.question_logger.cache_question_answer(question, q_type, answer, "", "your_bot_name")
```

## 📱 **Platform Examples**

### **CPX Research Bot**
```python
# Already integrated in survey_bot_cpx.py
self.question_logger = QuestionLogger("cpx_question_log.json")
```

### **PureSpectrum Bot**
```python
from universal_question_logger import BotIntegrationHelper

class PureSpectrumBot:
    def __init__(self):
        self.question_logger = BotIntegrationHelper("purespectrum")
    
    async def handle_survey_question(self):
        # Your existing question handling code...
        
        # Add question logging
        cached = self.question_logger.get_answer(question_text, question_type)
        if cached:
            return cached
        
        # Generate and cache new answer
        answer = await self.generate_response(question_text)
        self.question_logger.cache_answer(question_text, question_type, answer)
        return answer
```

### **Qmee Bot**
```python
from universal_question_logger import BotIntegrationHelper

class QmeeBot:
    def __init__(self):
        self.question_logger = BotIntegrationHelper("qmee")
    
    def answer_demographic_question(self, question, q_type):
        # Check cache first
        cached = self.question_logger.get_answer(question, q_type)
        if cached:
            return cached
        
        # Generate answer and cache it
        answer = self.generate_demographic_answer(question)
        self.question_logger.cache_answer(question, q_type, answer)
        return answer
```

### **Any Other Survey Platform**
```python
from universal_question_logger import BotIntegrationHelper

class GenericSurveyBot:
    def __init__(self, platform_name: str):
        self.platform_name = platform_name
        self.question_logger = BotIntegrationHelper(platform_name)
    
    def handle_question(self, question, q_type):
        # Universal question handling
        cached = self.question_logger.get_answer(question, q_type)
        if cached:
            return cached
        
        # Your platform-specific logic here
        answer = self.platform_specific_answer_generation(question)
        self.question_logger.cache_answer(question, q_type, answer)
        return answer
```

## 🎯 **Question Type Mapping**

### **Standard Question Types**
```python
QUESTION_TYPES = {
    'radio': 'single_punch',      # Single choice questions
    'checkbox': 'multi_punch',    # Multiple choice questions
    'text': 'open_ended',         # Text input questions
    'number': 'int_open_ended',   # Number input questions
    'email': 'open_ended',        # Email input questions
    'tel': 'open_ended',          # Phone input questions
    'select': 'single_punch',     # Dropdown questions
}
```

### **Platform-Specific Detection**
```python
def detect_question_type(self, page_elements):
    """Detect question type based on page elements"""
    if page_elements.get('radio_buttons'):
        return 'single_punch'
    elif page_elements.get('checkboxes'):
        return 'multi_punch'
    elif page_elements.get('text_inputs'):
        return 'open_ended'
    elif page_elements.get('number_inputs'):
        return 'int_open_ended'
    else:
        return 'unknown'
```

## 📊 **Statistics and Monitoring**

### **Get Bot Statistics**
```python
# Get comprehensive statistics
stats = self.question_logger.get_stats()
print(f"Total questions cached: {stats['total_questions']}")
print(f"Cache hit rate: {stats['platform_performance']['your_bot_name']['hit_rate']}%")
```

### **Export Questions**
```python
# Export questions for backup or analysis
export_path = self.question_logger.export_questions()
print(f"Questions exported to: {export_path}")
```

### **Search Questions**
```python
# Search for specific questions
birth_year_questions = self.question_logger.logger.search_questions("birth year")
print(f"Found {len(birth_year_questions)} birth year questions")
```

## 🔄 **Cross-Platform Benefits**

### **Automatic Answer Sharing**
- Questions answered on CPX are automatically available on PureSpectrum
- Birth year entered on Qmee is reused on any other platform
- Consistent persona across all survey sites

### **Learning from Experience**
- Bot learns which answers work best for qualification
- Identifies most common questions across platforms
- Improves survey completion rates over time

## 🛠️ **Troubleshooting**

### **Common Issues**

1. **Import Error**
   ```python
   # Make sure universal_question_logger.py is in your project
   from universal_question_logger import BotIntegrationHelper
   ```

2. **Permission Error**
   ```bash
   # Check file permissions
   chmod 755 question_logs/
   chmod 644 question_logs/*.json
   ```

3. **Question Not Cached**
   ```python
   # Verify question type detection
   print(f"Question type: {question_type}")
   print(f"Question text: {question_text}")
   ```

### **Debug Mode**
```python
# Enable detailed logging
import logging
logging.basicConfig(level=logging.DEBUG)

# Check what's happening
cached = self.question_logger.get_answer(question, q_type)
print(f"Cache result: {cached}")
```

## 📈 **Performance Tips**

### **Optimization Strategies**
1. **Batch Operations**: Cache multiple questions at once
2. **Lazy Loading**: Only load questions when needed
3. **Regular Cleanup**: Export and archive old question logs
4. **Platform Separation**: Use separate log files for different platforms

### **Memory Management**
```python
# For large question databases
def cleanup_old_questions(self, days_old: int = 30):
    """Remove questions older than specified days"""
    cutoff_date = datetime.now() - timedelta(days=days_old)
    # Implementation here
```

## 🎉 **Success Metrics**

### **What to Monitor**
- **Cache Hit Rate**: Should increase over time
- **Question Consistency**: Same answers across platforms
- **Survey Qualification**: Better completion rates
- **Response Time**: Faster answer generation

### **Expected Results**
- Week 1: 20-30% cache hit rate
- Week 4: 60-80% cache hit rate
- Month 3: 80-95% cache hit rate
- Consistent persona across all platforms

## 🚀 **Getting Started Checklist**

- [ ] Copy `universal_question_logger.py` to your project
- [ ] Import `BotIntegrationHelper` in your bot
- [ ] Initialize with your bot name
- [ ] Add `get_answer()` calls before generating responses
- [ ] Add `cache_answer()` calls after generating responses
- [ ] Test with a few questions
- [ ] Monitor cache hit rates
- [ ] Enjoy consistent persona across all platforms!

## 📞 **Need Help?**

1. **Check the logs**: Look for error messages in the console
2. **Test standalone**: Run `python3 universal_question_logger.py`
3. **Verify integration**: Make sure import paths are correct
4. **Check permissions**: Ensure log directory is writable

The universal question logging system is designed to work with **any survey platform** and will automatically share knowledge across all your bots!

