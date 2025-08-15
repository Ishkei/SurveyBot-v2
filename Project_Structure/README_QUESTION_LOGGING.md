# Question Logging System

## Overview

The Question Logging System is a comprehensive solution that addresses two critical issues in the SurveyBot:

1. **Question Type Misclassification**: Fixes the bot's ability to properly identify text input questions (like birth year) vs. multiple choice questions
2. **Answer Caching**: Saves and reuses answers for recurring questions across different survey platforms

## Features

### 🎯 Smart Question Type Detection

The system now properly identifies text input questions by looking for:
- **Demographic patterns**: birth year, age, zip code, city, state, etc.
- **Text input indicators**: "enter", "type", "write", "describe", "explain"
- **Input field analysis**: text inputs, textareas, number inputs

### 💾 Intelligent Answer Caching

- **Persistent Storage**: Questions and answers are saved to JSON files
- **Fuzzy Matching**: Recognizes similar questions across different phrasings
- **Type-Specific Caching**: Different handling for single choice, multiple choice, text input, and number questions
- **Context Preservation**: Stores additional context about when and where questions were answered

### 🔄 Answer Reuse

- **Immediate Retrieval**: Cached answers are used instantly when the same question appears
- **Consistency**: Ensures the same persona information is used across surveys
- **Efficiency**: Reduces response generation time for common questions

## Implementation Details

### QuestionLogger Class

```python
class QuestionLogger:
    def __init__(self, log_file: str = "question_log.json")
    def load_question_log(self)
    def save_question_log(self)
    def get_cached_answer(self, question_text: str, question_type: str)
    def cache_question_answer(self, question_text: str, question_type: str, answer: Any, context: str)
    def get_question_stats(self)
```

### Question Type Detection

The system now properly identifies:

- **`single_punch`**: Radio button questions
- **`multi_punch`**: Checkbox questions  
- **`open_ended`**: Text input questions (including birth year, age, etc.)
- **`int_open_ended`**: Number input questions

### Enhanced Text Response Generation

Special handling for common demographic questions:

```python
# Birth year questions
if any(term in question_lower for term in ['birth year', 'year of birth', 'born', 'birthdate']):
    # Use persona data or calculate from age
    birth_year = current_year - age
    return str(birth_year)

# Age questions  
if 'age' in question_lower or 'years old' in question_lower:
    # Use persona age or generate realistic age
    return str(age)

# Location questions
if 'zip' in question_lower and 'code' in question_lower:
    # Use persona zip code
    return zipcode
```

## Usage

### Automatic Operation

The system works automatically - no configuration needed:

1. **First Encounter**: When a question is answered, it's automatically cached
2. **Subsequent Encounters**: The cached answer is automatically retrieved and used
3. **Statistics**: Question usage statistics are displayed after each session

### Manual Testing

Test the system with the provided test script:

```bash
cd Project_Structure
python test_question_logging.py
```

### File Structure

Question logs are stored in JSON format:

```json
{
  "birth year": {
    "original_question": "What is your birth year? Please enter your 4-digit birth year.",
    "type": "open_ended",
    "answer": "1985",
    "context": "Demographic survey",
    "timestamp": "2024-01-15T10:30:00",
    "usage_count": 1
  }
}
```

## Benefits

### For Survey Completion

- **Faster Responses**: Cached answers eliminate response generation time
- **Consistent Persona**: Same answers used across different surveys
- **Better Qualification**: Consistent demographic information improves survey qualification rates

### For Bot Development

- **Learning System**: Bot learns from previous survey interactions
- **Debugging**: Question logs provide insights into survey patterns
- **Optimization**: Identify most common questions for targeted improvements

### For Users

- **Reliability**: Bot remembers previous answers
- **Efficiency**: Faster survey completion
- **Consistency**: Maintains persona across different platforms

## Configuration

### Log File Location

By default, question logs are stored in:
- **CPX Bot**: `cpx_question_log.json`
- **Custom**: Can specify custom filename in constructor

### Log Retention

- **Automatic**: Logs are automatically saved after each question
- **Persistent**: Logs survive bot restarts
- **Manual**: Can manually manage log files

## Troubleshooting

### Common Issues

1. **Question Not Cached**: Check if question type detection is working
2. **Wrong Answer Retrieved**: Verify question similarity matching
3. **Log File Errors**: Check file permissions and disk space

### Debug Information

The system provides detailed logging:

```
🎯 Detected text input question: What is your birth year? Please enter your 4-digit birth year.
💾 Cached new question: What is your birth year? Please enter your 4-digit birth year. (Type: open_ended)
🎯 Found cached answer for: What is your birth year? Please enter your 4-digit birth year.
💬 Using cached response: 1985
```

## Future Enhancements

### Planned Features

- **Machine Learning**: Improve question similarity detection
- **Answer Validation**: Verify cached answers are still appropriate
- **Cross-Platform Sync**: Share question logs across different survey platforms
- **Analytics Dashboard**: Web interface for viewing question statistics

### Integration Opportunities

- **Persona System**: Better integration with enhanced personality features
- **Survey Platform Detection**: Platform-specific question handling
- **Answer Quality Metrics**: Track which answers lead to better survey completion

## Technical Notes

### Performance

- **Memory Efficient**: Only loads necessary question data
- **Fast Retrieval**: O(1) lookup for exact matches
- **Scalable**: Handles thousands of cached questions efficiently

### Compatibility

- **Python 3.7+**: Uses modern Python features
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Survey Platform Agnostic**: Can be used with any survey bot implementation

## Contributing

To improve the question logging system:

1. **Add Question Patterns**: Identify new demographic question types
2. **Improve Similarity Detection**: Enhance fuzzy matching algorithms
3. **Optimize Storage**: Better data structures for large question sets
4. **Add Tests**: Expand test coverage for edge cases

## Support

For issues or questions about the Question Logging System:

1. Check the logs for error messages
2. Run the test script to verify functionality
3. Review question type detection patterns
4. Check file permissions for log files
