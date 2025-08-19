import os
from typing import Dict, Any
from dotenv import load_dotenv

# Configuration will be loaded explicitly in the main runner script

class Config:
    """Configuration management for survey automation"""
    
    # API Keys
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
    # CAPTCHA handling disabled
    
    # Proxy Settings
    PROXY_HOST = os.getenv("PROXY_HOST", "")
    PROXY_PORT = os.getenv("PROXY_PORT", "")
    PROXY_USER = os.getenv("PROXY_USER", "")
    PROXY_PASS = os.getenv("PROXY_PASS", "")
    
    # Browser Settings
    BROWSER_TYPE = os.getenv("BROWSER_TYPE", "playwright")  # playwright, selenium, undetected, hybrid
    HEADLESS = os.getenv("HEADLESS", "false").lower() == "true"
    SLOW_MO = int(os.getenv("SLOW_MO", "10"))
    
    # Survey Platform Settings
    SURVEY_PLATFORM = os.getenv("SURVEY_PLATFORM", "qmee")  # qmee, earnhaus, prolific, etc.
    SURVEY_URL = os.getenv("SURVEY_URL", "https://www.qmee.com/en-us/surveys")

    # CPX Research Settings
    CPX_APP_ID = os.getenv("CPX_APP_ID", "")
    CPX_EXT_USER_ID = os.getenv("CPX_EXT_USER_ID", "")
    CPX_BASE_URL = os.getenv("CPX_BASE_URL", "https://offers.cpx-research.com")
    
    # AI Settings
    AI_MODEL = os.getenv("AI_MODEL", "gemini-1.5-flash-latest")
    USE_VISION = os.getenv("USE_VISION", "true").lower() == "true"
    USE_FALLBACK = os.getenv("USE_FALLBACK", "true").lower() == "true"
    
    # Self-Operating Computer Settings
    USE_SELF_OPERATING_COMPUTER = os.getenv("USE_SELF_OPERATING_COMPUTER", "true").lower() == "true"
    VISION_MODEL = os.getenv("VISION_MODEL", "gpt-4-vision-preview")
    USE_MOUSE_CONTROL = os.getenv("USE_MOUSE_CONTROL", "true").lower() == "true"
    SOC_HEADLESS = os.getenv("SOC_HEADLESS", "false").lower() == "true"
    SOC_DEBUG = os.getenv("SOC_DEBUG", "true").lower() == "true"
    
    # Personality Settings
    PERSONALITY_STYLE = os.getenv("PERSONALITY_STYLE", "discord_casual")
    MAX_SURVEYS = int(os.getenv("MAX_SURVEYS", "10"))
    DELAY_BETWEEN_ACTIONS = (float(os.getenv("MIN_DELAY", "1.0")), float(os.getenv("MAX_DELAY", "3.0")))
    
    # Timing Settings
    PAGE_TIMEOUT = int(os.getenv("PAGE_TIMEOUT", "30000"))
    ELEMENT_TIMEOUT = int(os.getenv("ELEMENT_TIMEOUT", "10000"))
    SURVEY_TIMEOUT = int(os.getenv("SURVEY_TIMEOUT", "300000"))  # 5 minutes
    
    # Retry Settings
    MAX_RETRIES = int(os.getenv("MAX_RETRIES", "3"))
    RETRY_DELAY = int(os.getenv("RETRY_DELAY", "5"))
    
    # Proxy Rotation Settings
    ROTATE_PROXY_ON_FAILURE = os.getenv("ROTATE_PROXY_ON_FAILURE", "true").lower() == "true"
    PROXY_ROTATION_INTERVAL = int(os.getenv("PROXY_ROTATION_INTERVAL", "10"))  # surveys
    
    # Stealth Settings
    RANDOM_DELAYS = os.getenv("RANDOM_DELAYS", "true").lower() == "true"
    MIN_DELAY = float(os.getenv("MIN_DELAY", "1.0"))
    MAX_DELAY = float(os.getenv("MAX_DELAY", "3.0"))
    
    # User Agent Settings
    USER_AGENTS = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/121.0"
    ]
    
    # Survey Completion Indicators
    COMPLETION_INDICATORS = [
        "survey complete", "thank you", "congratulations", 
        "survey finished", "completion", "success", "100%",
        "survey submission successful", "your responses have been recorded"
    ]
    
    # Common Survey Elements
    SURVEY_ELEMENTS = {
        "start_buttons": [
            'button:has-text("Start")',
            'a[href*="survey"]',
            '.survey-card',
            '[data-testid*="survey"]',
            'button:has-text("Start earning")'
        ],
        "next_buttons": [
            'button:has-text("Next")',
            'button:has-text("Continue")',
            'button:has-text("Submit")',
            'button:has-text("Proceed")',
            'input[type="submit"]'
        ],
        "agree_buttons": [
            'button:has-text("Agree")',
            'button:has-text("Consent")',
            'button:has-text("Yes")',
            'button:has-text("I agree")',
            'button:has-text("Accept")'
        ],
        "text_inputs": [
            'input[type="text"]',
            'textarea',
            'input[type="email"]',
            'input[type="number"]'
        ]
    }
    
    @classmethod
    def get_browser_config(cls) -> Dict[str, Any]:
        """Get browser configuration based on type"""
        config = {
            "headless": cls.HEADLESS,
            "slow_mo": cls.SLOW_MO,
            "timeout": cls.PAGE_TIMEOUT
        }
        
        if cls.BROWSER_TYPE == "selenium":
            config.update({
                "options": {
                    "--no-sandbox": True,
                    "--disable-dev-shm-usage": True,
                    "--disable-blink-features=AutomationControlled": True,
                    "--user-agent": cls.get_random_user_agent()
                }
            })
        elif cls.BROWSER_TYPE == "undetected":
            config.update({
                "undetectable_agent": True,
                # CAPTCHA handling disabled
                "proxy_config": cls.get_proxy_config()
            })
        
        return config
    
    @classmethod
    def get_proxy_config(cls) -> Dict[str, Any]:
        """Get proxy configuration"""
        if cls.PROXY_HOST and cls.PROXY_PORT:
            return {
                "proxy_host": cls.PROXY_HOST,
                "proxy_port": int(cls.PROXY_PORT),
                "proxy_user": cls.PROXY_USER,
                "proxy_pass": cls.PROXY_PASS
            }
        return {}
    
    @classmethod
    def get_random_user_agent(cls) -> str:
        """Get a random user agent"""
        import random
        return random.choice(cls.USER_AGENTS)
    
    @classmethod
    def get_random_delay(cls) -> float:
        """Get a random delay for stealth"""
        import random
        if cls.RANDOM_DELAYS:
            return random.uniform(cls.MIN_DELAY, cls.MAX_DELAY)
        return cls.MIN_DELAY
    
    @classmethod
    def reload(cls):
        """Reloads all configuration settings from environment variables."""
        cls.GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
        cls.PROXY_HOST = os.getenv("PROXY_HOST", "")
        cls.PROXY_PORT = os.getenv("PROXY_PORT", "")
        cls.PROXY_USER = os.getenv("PROXY_USER", "")
        cls.PROXY_PASS = os.getenv("PROXY_PASS", "")
        cls.BROWSER_TYPE = os.getenv("BROWSER_TYPE", "playwright")
        cls.HEADLESS = os.getenv("HEADLESS", "false").lower() == "true"
        cls.SLOW_MO = int(os.getenv("SLOW_MO", "10"))
        cls.SURVEY_PLATFORM = os.getenv("SURVEY_PLATFORM", "qmee")
        cls.SURVEY_URL = os.getenv("SURVEY_URL", "https://www.qmee.com/en-us/surveys")
        cls.CPX_APP_ID = os.getenv("CPX_APP_ID", "")
        cls.CPX_EXT_USER_ID = os.getenv("CPX_EXT_USER_ID", "")
        cls.CPX_BASE_URL = os.getenv("CPX_BASE_URL", "https://offers.cpx-research.com")
        cls.AI_MODEL = os.getenv("AI_MODEL", "gemini-1.5-flash-latest")
        cls.USE_VISION = os.getenv("USE_VISION", "true").lower() == "true"
        cls.USE_FALLBACK = os.getenv("USE_FALLBACK", "true").lower() == "true"
        cls.USE_SELF_OPERATING_COMPUTER = os.getenv("USE_SELF_OPERATING_COMPUTER", "true").lower() == "true"
        cls.VISION_MODEL = os.getenv("VISION_MODEL", "gpt-4-vision-preview")
        cls.USE_MOUSE_CONTROL = os.getenv("USE_MOUSE_CONTROL", "true").lower() == "true"
        cls.SOC_HEADLESS = os.getenv("SOC_HEADLESS", "false").lower() == "true"
        cls.SOC_DEBUG = os.getenv("SOC_DEBUG", "true").lower() == "true"
        cls.PERSONALITY_STYLE = os.getenv("PERSONALITY_STYLE", "discord_casual")
        cls.MAX_SURVEYS = int(os.getenv("MAX_SURVEYS", "10"))
        cls.DELAY_BETWEEN_ACTIONS = (float(os.getenv("MIN_DELAY", "1.0")), float(os.getenv("MAX_DELAY", "3.0")))
        cls.PAGE_TIMEOUT = int(os.getenv("PAGE_TIMEOUT", "30000"))
        cls.ELEMENT_TIMEOUT = int(os.getenv("ELEMENT_TIMEOUT", "10000"))
        cls.SURVEY_TIMEOUT = int(os.getenv("SURVEY_TIMEOUT", "300000"))
        cls.MAX_RETRIES = int(os.getenv("MAX_RETRIES", "3"))
        cls.RETRY_DELAY = int(os.getenv("RETRY_DELAY", "5"))
        cls.ROTATE_PROXY_ON_FAILURE = os.getenv("ROTATE_PROXY_ON_FAILURE", "true").lower() == "true"
        cls.PROXY_ROTATION_INTERVAL = int(os.getenv("PROXY_ROTATION_INTERVAL", "10"))
        cls.RANDOM_DELAYS = os.getenv("RANDOM_DELAYS", "true").lower() == "true"
        cls.MIN_DELAY = float(os.getenv("MIN_DELAY", "1.0"))
        cls.MAX_DELAY = float(os.getenv("MAX_DELAY", "3.0"))

    @classmethod
    def validate_config(cls) -> bool:
        """Validate the configuration"""
        errors = []
        
        if not cls.GOOGLE_API_KEY and cls.SURVEY_PLATFORM != "cpx" and cls.BROWSER_TYPE != "enhanced_cursor":
            errors.append("GOOGLE_API_KEY not set")
        
        if cls.BROWSER_TYPE not in ["playwright", "selenium", "undetected", "v2ray", "proxychains", "hybrid", "enhanced_cursor"]:
            errors.append(f"Invalid BROWSER_TYPE: {cls.BROWSER_TYPE}")
        
        if cls.SURVEY_PLATFORM not in ["qmee", "earnhaus", "prolific", "mturk", "cpx"]:
            errors.append(f"Invalid SURVEY_PLATFORM: {cls.SURVEY_PLATFORM}")
        
        if errors:
            print("Configuration errors:")
            for error in errors:
                print(f"  - {error}")
            return False
        
        return True
    
    @classmethod
    def print_config(cls):
        """Print current configuration"""
        print("Current Configuration:")
        print(f"  Browser Type: {cls.BROWSER_TYPE}")
        print(f"  Survey Platform: {cls.SURVEY_PLATFORM}")
        print(f"  Headless: {cls.HEADLESS}")
        print(f"  Use Vision: {cls.USE_VISION}")
        print(f"  Use Fallback: {cls.USE_FALLBACK}")
        print(f"  Proxy Rotation: {cls.ROTATE_PROXY_ON_FAILURE}")
        print(f"  Random Delays: {cls.RANDOM_DELAYS}")
        print(f"  API Key Set: {'Yes' if cls.GOOGLE_API_KEY else 'No'}")
    
    @classmethod
    def get(cls, key: str, default: Any = None) -> Any:
        """Get configuration value by key with fallback to default"""
        return getattr(cls, key, default)

# Create a sample .env file if it doesn't exist
def create_sample_env():
    """Create a sample .env file with configuration options"""
    env_content = """# API Keys
GOOGLE_API_KEY=your_google_api_key_here
# CAPTCHA handling disabled

# Proxy Settings
PROXY_HOST=
PROXY_PORT=
PROXY_USER=
PROXY_PASS=

# Browser Settings
BROWSER_TYPE=playwright
HEADLESS=false
SLOW_MO=10

# Survey Platform Settings
SURVEY_PLATFORM=qmee
SURVEY_URL=https://www.qmee.com/en-us/surveys

# CPX Research Settings
CPX_APP_ID=27806
CPX_EXT_USER_ID=533055960609193994_1246050346233757798

# AI Settings
AI_MODEL=gemini-1.5-flash-latest
USE_VISION=true
USE_FALLBACK=true

# Timing Settings
PAGE_TIMEOUT=30000
ELEMENT_TIMEOUT=10000
SURVEY_TIMEOUT=300000

# Retry Settings
MAX_RETRIES=3
RETRY_DELAY=5

# Proxy Rotation Settings
ROTATE_PROXY_ON_FAILURE=true
PROXY_ROTATION_INTERVAL=10

# Stealth Settings
RANDOM_DELAYS=true
MIN_DELAY=1.0
MAX_DELAY=3.0
"""
    
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    if not os.path.exists(env_path):
        with open(env_path, 'w') as f:
            f.write(env_content)
        print(f"Created sample .env file at: {env_path}. Please update with your actual values.")

if __name__ == "__main__":
    create_sample_env()
    Config.print_config()
    if Config.validate_config():
        print("Configuration is valid!")
    else:
        print("Configuration has errors!")
