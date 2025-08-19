#!/usr/bin/env python3
"""
Test Gemini API with .env file loading
"""

import os
from pathlib import Path
from dotenv import load_dotenv

def load_environment():
    """Load environment variables from .env file"""
    
    print("🔍 Loading Environment Variables...")
    print("=" * 50)
    
    # Load .env file
    env_file = Path('.env')
    if env_file.exists():
        load_dotenv(env_file)
        print(f"✅ Loaded environment from {env_file}")
    else:
        print(f"❌ {env_file} not found")
        return False
    
    # Check for API keys
    gemini_key = os.getenv('GEMINI_API_KEY')
    gemini_backup = os.getenv('GEMINI_API_KEY_BACKUP')
    openai_key = os.getenv('OPENAI_API_KEY')
    
    if gemini_key:
        print(f"✅ GEMINI_API_KEY found: {gemini_key[:20]}...")
    else:
        print("❌ GEMINI_API_KEY not found")
    
    if gemini_backup:
        print(f"✅ GEMINI_API_KEY_BACKUP found: {gemini_backup[:20]}...")
    else:
        print("❌ GEMINI_API_KEY_BACKUP not found")
    
    if openai_key:
        print(f"✅ OPENAI_API_KEY found: {openai_key[:20]}...")
    else:
        print("❌ OPENAI_API_KEY not found")
    
    return bool(gemini_key or gemini_backup or openai_key)

def test_gemini_api():
    """Test Gemini API with loaded keys"""
    
    print("\n🧪 Testing Gemini API...")
    print("=" * 50)
    
    try:
        from google import genai
        print("✅ Google GenAI SDK imported successfully")
        
        # Get API key
        api_key = os.getenv('GEMINI_API_KEY') or os.getenv('GEMINI_API_KEY_BACKUP')
        if not api_key:
            print("❌ No Gemini API key available")
            return False
        
        # Set API key as environment variable (newer versions don't use configure)
        os.environ['GEMINI_API_KEY'] = api_key
        print(f"✅ API key set: {api_key[:20]}...")
        
        # Test client
        client = genai.Client()
        print("✅ Gemini client initialized successfully")
        
        # Test API call
        print("📡 Making test API call...")
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents="Say 'Hello from Gemini!' in exactly 5 words."
        )
        
        print(f"✅ API call successful!")
        print(f"📝 Response: {response.text}")
        
        return True
        
    except ImportError as e:
        print(f"❌ Google GenAI SDK not available: {e}")
        print("💡 Install with: pip install -q -U google-genai")
        return False
    except Exception as e:
        print(f"❌ Gemini API test failed: {e}")
        return False

def test_openai_api():
    """Test OpenAPI with loaded keys"""
    
    print("\n🧪 Testing OpenAPI...")
    print("=" * 50)
    
    try:
        from openai import OpenAI
        print("✅ OpenAI SDK imported successfully")
        
        # Get API key
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            print("❌ No OpenAI API key available")
            return False
        
        # Configure OpenAI client
        client = OpenAI(api_key=api_key)
        print(f"✅ API key configured: {api_key[:20]}...")
        
        # Test API call
        print("📡 Making test API call...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "Say 'Hello from OpenAI!' in exactly 5 words."}
            ]
        )
        
        print(f"✅ API call successful!")
        print(f"📝 Response: {response.choices[0].message.content}")
        
        return True
        
    except ImportError as e:
        print(f"❌ OpenAI SDK not available: {e}")
        print("💡 Install with: pip install openai")
        return False
    except Exception as e:
        print(f"❌ OpenAI API test failed: {e}")
        return False

def main():
    """Main test function"""
    
    print("🚀 SurveyBot API Integration Test")
    print("=" * 50)
    
    # Load environment
    if not load_environment():
        print("❌ Failed to load environment variables")
        return
    
    # Test Gemini API
    gemini_working = test_gemini_api()
    
    # Test OpenAI API
    openai_working = test_openai_api()
    
    # Summary
    print("\n" + "=" * 50)
    if gemini_working and openai_working:
        print("🎉 Both AI APIs are working perfectly!")
    elif gemini_working:
        print("✅ Gemini API working, OpenAI needs attention")
    elif openai_working:
        print("✅ OpenAI working, Gemini needs attention")
    else:
        print("❌ Both AI APIs need attention")
    
    print("=" * 50)

if __name__ == "__main__":
    main()
