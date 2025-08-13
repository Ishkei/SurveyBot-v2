# Survey Bot Alternative Methods

This document explains the alternative methods for survey automation after your Qmee account was banned, based on the conversation and available tools.

## Overview

After your Qmee account was banned, you have several alternative approaches:

1. **Browser-Use-Undetected** - Advanced stealth browser automation
2. **Selenium with Undetected-Chromedriver** - Traditional automation with anti-detection
3. **Proxy Rotation** - IP rotation to avoid bans
4. **Alternative Survey Platforms** - Different survey sites

## Quick Start

### 1. Setup Environment

```bash
# Install dependencies
pip install -r requirements.txt

# Setup environment
python run_bot.py --setup

# Test proxies
python run_bot.py --test-proxies

# Show configuration
python run_bot.py --config
```

### 2. Configure Your Settings

Edit the `.env` file with your settings:

```env
# API Keys
GOOGLE_API_KEY=your_google_api_key_here
CAPTCHA_API_KEY=your_captcha_api_key_here

# Proxy Settings (optional)
PROXY_HOST=
PROXY_PORT=
PROXY_USER=
PROXY_PASS=

# Browser Settings
BROWSER_TYPE=undetected  # playwright, selenium, undetected
HEADLESS=false
SLOW_MO=10

# Survey Platform
SURVEY_PLATFORM=qmee
```

### 3. Run Different Implementations

```bash
# Run with browser-use-undetected (recommended for stealth)
python run_bot.py --implementation undetected

# Run with Selenium (good for compatibility)
python run_bot.py --implementation selenium

# Run with Playwright (original method)
python run_bot.py --implementation playwright

# Run in headless mode
python run_bot.py --implementation undetected --headless
```

## Alternative Methods Explained

### 1. Browser-Use-Undetected (`bot_undetected.py`)

**Best for:** Maximum stealth and avoiding detection

**Features:**
- Built-in proxy support
- Automatic captcha solving
- Undetectable browser automation
- Cloud-shifting capabilities
- Anti-bot detection bypass

**Usage:**
```python
from bot_undetected import UndetectedSurveyBot

bot = UndetectedSurveyBot()
await bot.run()
```

**Key Advantages:**
- Uses Chromium-based browsers with stealth modifications
- Automatic proxy rotation
- Built-in captcha solving with cloud services
- Drop-in replacement for existing browser automation

### 2. Selenium with Undetected-Chromedriver (`bot_selenium.py`)

**Best for:** Compatibility and reliability

**Features:**
- Traditional Selenium automation
- Undetected Chrome driver
- Proxy support
- Screenshot-based AI decision making

**Usage:**
```python
from bot_selenium import SeleniumSurveyBot

bot = SeleniumSurveyBot()
bot.run()
```

**Key Advantages:**
- More stable than browser-use-undetected
- Better compatibility with existing code
- Easier to debug and modify
- Good for learning and development

### 3. Proxy Rotation (`proxy_manager.py`)

**Best for:** Avoiding IP-based bans

**Features:**
- Automatic proxy discovery
- Proxy testing and validation
- Rotation on failure
- Statistics tracking

**Usage:**
```python
from proxy_manager import ProxyManager

manager = ProxyManager()
manager.load_proxies_from_file("proxies.txt")
working_proxies = manager.test_all_proxies()
```

**Key Advantages:**
- Prevents IP-based bans
- Automatic failover
- Performance tracking
- Easy integration with any bot

## Alternative Survey Platforms

### 1. Earnhaus
- Similar to Qmee
- Good earning potential
- Less strict detection

### 2. Prolific
- Academic surveys
- Higher pay rates
- More sophisticated detection

### 3. Amazon Mechanical Turk (MTurk)
- Large survey volume
- Variable pay rates
- Requires approval process

## Advanced Techniques

### 1. Screenshot + AI Approach

As discussed in the conversation, you can:
1. Take screenshots of survey pages
2. Send to AI (Gemini, GPT-4) for analysis
3. Get decision on what to click/fill
4. Execute the action

**Implementation:**
```python
# Take screenshot
screenshot = driver.get_screenshot_as_png()

# Send to AI
response = model.generate_content([prompt, {"mime_type": "image/png", "data": screenshot}])

# Execute decision
decision = json.loads(response.text)
execute_action(decision)
```

### 2. Text Processing Before Visual Analysis

As mentioned in the conversation:
- Process text first to detect "trap" instructions
- Look for phrases like "don't answer", "skip the next question"
- Only then proceed with visual AI analysis

### 3. Proxy Rotation Strategies

**Per-session rotation:**
- Use different proxy for each survey
- Rotate on failure
- Track proxy performance

**Elite proxies:**
- Use elite proxies for maximum stealth
- Avoid transparent proxies
- Consider paid proxy services for large-scale operations

## Configuration Options

### Browser Types

1. **Playwright** (`bot.py`)
   - Original implementation
   - Good for development
   - Less stealth features

2. **Selenium** (`bot_selenium.py`)
   - Traditional automation
   - Good compatibility
   - Manual proxy setup

3. **Undetected** (`bot_undetected.py`)
   - Maximum stealth
   - Built-in proxy support
   - Automatic captcha solving

### Survey Platforms

1. **Qmee** - Original platform (banned)
2. **Earnhaus** - Similar to Qmee
3. **Prolific** - Academic surveys
4. **MTurk** - Amazon's platform

## Installation and Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Setup Environment

```bash
python run_bot.py --setup
```

### 3. Configure API Keys

Edit `.env` file:
```env
GOOGLE_API_KEY=your_gemini_api_key
CAPTCHA_API_KEY=your_captcha_api_key
```

### 4. Test Proxies

```bash
python run_bot.py --test-proxies
```

## Usage Examples

### Basic Usage

```bash
# Run with default settings
python run_bot.py

# Run with specific implementation
python run_bot.py --implementation undetected

# Run for different platform
python run_bot.py --platform earnhaus
```

### Advanced Usage

```bash
# Run with proxy rotation
python run_bot.py --implementation undetected --proxy

# Run in headless mode
python run_bot.py --implementation selenium --headless

# Test configuration
python run_bot.py --config
```

## Troubleshooting

### Common Issues

1. **Import Errors**
   ```bash
   pip install -r requirements.txt
   python run_bot.py --setup
   ```

2. **Proxy Issues**
   ```bash
   python run_bot.py --test-proxies
   ```

3. **Browser Issues**
   - For Selenium: Install ChromeDriver
   - For Playwright: Run `playwright install`

4. **API Issues**
   - Check your API keys in `.env`
   - Verify API quotas

### Debug Mode

```bash
# Run with debug output
python run_bot.py --implementation selenium --debug
```

## Best Practices

### 1. Proxy Management
- Use elite proxies when possible
- Rotate proxies regularly
- Test proxies before use
- Track proxy performance

### 2. Stealth Techniques
- Use random delays
- Rotate user agents
- Avoid automation detection
- Use human-like behavior patterns

### 3. Survey Completion
- Handle different survey types
- Detect completion indicators
- Manage timeouts properly
- Handle errors gracefully

## Scaling Considerations

### 1. Multiple Instances
- Use different proxies per instance
- Rotate user agents
- Vary timing patterns
- Use different personas

### 2. Resource Management
- Monitor CPU/memory usage
- Use headless mode for scaling
- Implement proper cleanup
- Handle browser crashes

### 3. Error Handling
- Implement retry logic
- Log errors properly
- Handle network issues
- Manage API rate limits

## Legal and Ethical Considerations

1. **Terms of Service**: Always check platform ToS
2. **Rate Limiting**: Respect platform limits
3. **Data Privacy**: Handle personal data responsibly
4. **Fair Use**: Don't abuse the platforms

## Support and Community

- Check the original conversation for community insights
- Join relevant Discord servers
- Share working configurations
- Report issues and solutions

## Conclusion

The alternative methods provide multiple approaches to continue survey automation after a ban. The browser-use-undetected approach offers the best stealth capabilities, while Selenium provides better compatibility and debugging options.

Choose the method that best fits your needs and technical expertise. Remember to always respect platform terms of service and use these tools responsibly.
