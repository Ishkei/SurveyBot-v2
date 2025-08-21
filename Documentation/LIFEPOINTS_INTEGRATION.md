# LifePoints Integration Guide

This document explains how to use the new LifePoints survey bot integration in the SurveyBot v2 system.

## Overview

The LifePoints Enhanced Bot is a new addition to the SurveyBot v2 platform that allows you to automate surveys on the LifePoints Panel platform. The bot includes advanced features like AI-powered responses, typing simulation, and intelligent survey handling.

## Features

- **Automated Login**: Secure login to your LifePoints account
- **Survey Discovery**: Automatically finds available surveys with points and duration
- **Intelligent Responses**: AI-powered responses for text questions
- **Human-like Behavior**: Typing simulation and natural delays
- **Multi-survey Support**: Can complete multiple surveys in a single session
- **Session Tracking**: Detailed statistics and progress monitoring

## Setup

### 1. Environment Configuration

Add your LifePoints credentials to your `.env` file:

```bash
# LifePoints Login Credentials
LIFEPOINTS_EMAIL=your_email@example.com
LIFEPOINTS_PASSWORD=your_password_here
```

**Quick Setup**: Run the automated setup script:
```bash
python3 Tools_Scripts/setup_lifepoints_credentials.py
```

### 2. Dependencies

Ensure you have the required dependencies installed:

**Automatic Installation** (Recommended):
```bash
python3 Tools_Scripts/install_lifepoints_deps.py
```

**Manual Installation**:
```bash
# Activate virtual environment
source venv/bin/activate

# Install Playwright
pip install playwright

# Install Playwright browsers
playwright install
```

### 2. Dependencies

Ensure you have the required dependencies installed:

```bash
# Activate virtual environment
source venv/bin/activate

# Install Playwright browsers (if not already installed)
playwright install
```

### 3. Save Authentication State (Optional but Recommended)

To avoid logging in every time, save your authentication session:

```bash
python3 Tools_Scripts/save_lifepoints_auth.py
```

This will:
- Open a browser window
- Navigate to LifePoints login page
- Wait for you to log in manually
- Save the session to `auth.json`
- Allow the bot to reuse your login session

## Usage

### Basic Usage

Run the LifePoints bot with default settings:

```bash
python3 Main_Files_to_Run/run_bot.py --platform lifepoints
```

**With Saved Authentication Session**:
If you've saved your authentication state using `save_lifepoints_auth.py`, the bot will automatically use it and won't require manual login.

**Without Saved Session**:
The bot will prompt for credentials and perform a fresh login each time.

### Advanced Options

```bash
# Run in headless mode
python3 Main_Files_to_Run/run_bot.py --platform lifepoints --headless

# Enable typing simulation
python3 Main_Files_to_Run/run_bot.py --platform lifepoints --typing-simulation

# Set maximum surveys to complete
python3 Main_Files_to_Run/run_bot.py --platform lifepoints --max-surveys 10

# Use specific typing style
python3 Main_Files_to_Run/run_bot.py --platform lifepoints --typing-simulation --typing-style careful_typer
```

### Available Typing Styles

- `fast_typer`: Quick typing with minimal delays
- `average_typer`: Moderate typing speed
- `slow_typer`: Deliberate, slower typing
- `careful_typer`: Accurate typing with natural pauses (default)

## How It Works

### 1. Authentication
The bot automatically logs into your LifePoints account using the credentials from your environment variables.

### 2. Survey Discovery
It scans the LifePoints dashboard to find available surveys, displaying:
- Survey titles
- Point rewards
- Estimated completion time
- Availability status

### 3. Survey Completion
For each survey, the bot:
- Handles multiple choice questions (random selection)
- Manages checkbox questions (intelligent selection)
- Generates appropriate text responses
- Navigates through survey pages
- Detects completion indicators

### 4. Session Management
The bot tracks:
- Surveys completed
- Points earned
- Session duration
- Error handling
- Performance metrics

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LIFEPOINTS_EMAIL` | Your LifePoints account email | Required |
| `LIFEPOINTS_PASSWORD` | Your LifePoints account password | Required |
| `LIFEPOINTS_BASE_URL` | LifePoints website URL | `https://app.lifepointspanel.com` |

### Bot Configuration

The bot automatically configures:
- Browser settings (Chrome/Chromium)
- User agent strings
- Viewport dimensions
- Network timeouts
- Element selectors

## Testing

Test the LifePoints bot before running it on surveys:

```bash
python3 Tools_Scripts/test_lifepoints_bot.py
```

This will verify:
- Bot import functionality
- Credential validation
- Browser startup
- Login process
- Survey discovery

## Troubleshooting

### Common Issues

1. **Import Errors**
   - Ensure you're running from the project root directory
   - Check that all dependencies are installed
   - Verify the virtual environment is activated

2. **Login Failures**
   - Verify your credentials are correct
   - Check if LifePoints requires additional verification
   - Ensure your account is not suspended

3. **Authentication State Issues**
   - If saved session isn't working, run `save_lifepoints_auth.py` again
   - Sessions may expire after some time
   - Ensure `auth.json` file exists in `Main_Files_to_Run/` directory

4. **Installation Issues**
   - If you get "ModuleNotFoundError: No module named 'playwright'", run the installer:
     ```bash
     python3 Tools_Scripts/install_lifepoints_deps.py
     ```
   - Ensure your virtual environment is activated: `source venv/bin/activate`
   - Try upgrading Playwright: `pip install --upgrade playwright`

3. **Survey Detection Issues**
   - The bot may need selector updates if LifePoints changes their interface
   - Check the console output for selector errors
   - Verify the survey page loads completely

4. **Browser Issues**
   - Ensure Playwright browsers are installed
   - Check for conflicting browser processes
   - Verify system resources are available

### Debug Mode

Enable detailed logging by setting the logging level:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Security Considerations

- **Credentials**: Never commit your `.env` file to version control
- **Session Management**: The bot creates temporary browser sessions
- **Data Privacy**: Survey responses are handled locally
- **Rate Limiting**: The bot includes natural delays to avoid detection

## Performance Tips

1. **Headless Mode**: Use `--headless` for faster execution
2. **Typing Simulation**: Enable for more human-like behavior
3. **Survey Limits**: Set reasonable `--max-surveys` values
4. **Network Stability**: Ensure stable internet connection

## Integration with Other Features

The LifePoints bot integrates with:
- **Enhanced Personality System**: AI-powered response generation
- **Typing Simulator**: Human-like typing behavior
- **Session Tracking**: Comprehensive statistics
- **Error Recovery**: Automatic retry mechanisms

## Support

For issues or questions:
1. Check the console output for error messages
2. Review the troubleshooting section above
3. Test with the provided test script
4. Check the main bot logs in the `logs/` directory

## Future Enhancements

Planned improvements include:
- Advanced survey routing
- Multi-account support
- Enhanced AI responses
- Better error recovery
- Performance optimizations

---

**Note**: This bot is designed for educational and research purposes. Please ensure compliance with LifePoints' terms of service and applicable laws when using automated tools.
