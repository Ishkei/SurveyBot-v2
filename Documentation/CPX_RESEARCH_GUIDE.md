# CPX Research Integration Guide

## Overview

The SurveyBot now supports CPX Research surveys with full automation capabilities. The bot can handle all CPX Research question types and API interactions.

## Features

### Supported Question Types
- **Single Choice (single_punch)**: Radio button questions where you select one option
- **Multiple Choice (multi_punch)**: Checkbox questions where you can select multiple options  
- **Text Input (open_ended)**: Open-ended text questions requiring written responses
- **Number Input (int_open_ended)**: Numeric input questions

### Enhanced Features
- ✅ AI-powered response generation using personality system
- ✅ Human-like typing simulation for text responses
- ✅ Intelligent option selection based on persona
- ✅ Automatic survey detection and completion
- ✅ Session tracking and earnings reporting
- ✅ Error handling and retry logic

## Quick Start

### 1. Configure Environment

Update your `.env` file with CPX Research settings:

```bash
# Survey Platform Settings
SURVEY_PLATFORM=cpx

# CPX Research Settings
CPX_APP_ID=27806
CPX_EXT_USER_ID=533055960609193994_1246050346233757798

# AI Settings (required for smart responses)
GOOGLE_API_KEY=your_google_api_key_here
USE_VISION=true
```

### 2. Run CPX Research Bot

```bash
# Navigate to the main files directory
cd "🎯 Main Files to Run"

# Run with CPX Research platform
python run_bot.py --platform cpx

# Run with specific implementation
python run_bot.py --platform cpx --implementation playwright

# Run in headless mode
python run_bot.py --platform cpx --headless

# Run with enhanced AI features
python run_bot.py --platform cpx --enhanced-ai --personality-mode natural_conversation
```

### 3. Test the Integration

```bash
# Test CPX bot functionality
cd "🔧 Tools and Scripts"
python test_cpx_bot.py
```

## Configuration

### CPX Research Settings

The bot uses these configuration files:

1. **Environment Variables** (`.env`):
   - `CPX_APP_ID`: Your CPX Research app ID
   - `CPX_EXT_USER_ID`: Your CPX Research external user ID

2. **CPX Configuration** (`configs/cpx_config.json`):
   - Question type definitions
   - Selector mappings
   - Personality response templates
   - Timing configurations

### Customizing Responses

Edit `configs/cpx_config.json` to customize:

- **Default text responses**: Generic responses for open-ended questions
- **Best experience responses**: Specific responses for "best life experience" questions
- **Timing settings**: Delays between actions and surveys
- **Selection preferences**: How multiple choice questions are handled

## API Integration

The bot integrates with CPX Research APIs:

- **Survey Listing**: `/get-surveys.php` - Fetches available surveys
- **Survey Details**: `/get-survey-details.php` - Gets question details
- **Question Submission**: Form submissions via the web interface
- **Progress Tracking**: Monitors survey completion and earnings

## Question Handling

### Single Choice Questions
- Detects radio button options
- Uses AI to select the most appropriate option based on persona
- Submits selection automatically

### Multiple Choice Questions  
- Detects checkbox options
- Selects 1-3 relevant options intelligently
- Handles complex multi-selection scenarios

### Text Questions
- Generates contextual responses using personality system
- Special handling for "best experience" questions
- Human-like typing simulation for natural behavior

### Number Questions
- Intelligent numeric response generation
- Context-aware number selection (age, income, hours, etc.)
- Realistic value ranges based on question type

## Session Management

The bot tracks:
- Surveys started and completed
- Questions answered
- Total earnings
- Completion rates
- Error statistics

## Error Handling

The bot handles:
- Survey qualification failures
- Network timeouts
- Question parsing errors
- Browser crashes
- API rate limiting

## Example Usage

```python
from bot_implementations.survey_bot_cpx import CPXResearchBot

# Create bot instance
bot = CPXResearchBot()

# Run survey session
result = await bot.run_survey_session(max_surveys=5)

# Print results
bot.print_session_summary()
```

## Troubleshooting

### Common Issues

1. **No surveys available**: Check your CPX Research account status
2. **API errors**: Verify your app_id and ext_user_id are correct
3. **Browser issues**: Try running with `--headless` flag
4. **Question detection fails**: Check the CPX config selectors

### Debug Mode

Run with verbose logging:
```bash
python run_bot.py --platform cpx --enhanced-ai
```

### Testing Individual Components

```bash
# Test API only
python test_cpx_bot.py

# Test specific question types
python -c "from bot_implementations.survey_bot_cpx import CPXResearchBot; import asyncio; bot = CPXResearchBot(); asyncio.run(bot.detect_question_type())"
```

## Advanced Configuration

### Custom App ID and User ID

You can override the default CPX Research credentials:

```python
bot = CPXResearchBot(
    app_id="your_app_id",
    ext_user_id="your_user_id"
)
```

### Enhanced AI Responses

Enable advanced AI features for better response quality:

```bash
python run_bot.py --platform cpx --enhanced-ai --personality-mode discord_casual
```

## Security Notes

- The bot respects CPX Research's rate limiting
- All interactions simulate human behavior with realistic delays
- No sensitive data is logged or stored
- Browser sessions are properly cleaned up

## Support

For issues specific to CPX Research integration:
1. Check the CPX configuration file
2. Verify your credentials are correct
3. Test the API connection separately
4. Review the session logs for detailed error information
