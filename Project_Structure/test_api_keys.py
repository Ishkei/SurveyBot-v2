#!/usr/bin/env python3
"""
API Key Test Script
Tests if your API keys are still working
"""

import os
import json
import requests
from datetime import datetime
import time
from pathlib import Path


def load_env_file():
    """Load environment variables from .env file"""
    env_file = Path(__file__).parent.parent / '.env'
    if env_file.exists():
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()
        print(f"   ✅ Loaded environment variables from {env_file}")
    else:
        print(f"   ❌ .env file not found at {env_file}")


def test_qmee_tokens():
    """Test if Qmee tokens are still valid"""
    print("🔑 Testing Qmee API Keys...")
    
    try:
        # Read auth.json
        with open('../auth.json', 'r') as f:
            auth_data = json.load(f)
        
        # Extract tokens from localStorage
        origins = auth_data.get('origins', [])
        qmee_tokens = None
        
        for origin in origins:
            if 'qmee.com' in origin.get('origin', ''):
                localStorage = origin.get('localStorage', [])
                for item in localStorage:
                    if item.get('name') == 'qmee.tokens':
                        qmee_tokens = json.loads(item.get('value', '{}'))
                        break
                if qmee_tokens:
                    break
        
        if qmee_tokens:
            access_token = qmee_tokens.get('accessToken', '')
            refresh_token = qmee_tokens.get('refreshToken', '')
            
            print(f"   Access Token: {'✅ Found' if access_token else '❌ Missing'}")
            print(f"   Refresh Token: {'✅ Found' if refresh_token else '❌ Missing'}")
            
            # Check expiration
            if access_token:
                try:
                    # Decode JWT token to check expiration
                    import jwt
                    decoded = jwt.decode(access_token, options={"verify_signature": False})
                    exp_timestamp = decoded.get('exp', 0)
                    exp_date = datetime.fromtimestamp(exp_timestamp)
                    now = datetime.now()
                    
                    if exp_date > now:
                        print(f"   Access Token Expires: {exp_date.strftime('%Y-%m-%d %H:%M:%S')} ✅ Valid")
                    else:
                        print(f"   Access Token Expired: {exp_date.strftime('%Y-%m-%d %H:%M:%S')} ❌ Expired")
                        
                except Exception as e:
                    print(f"   Access Token Status: Could not decode - {e}")
            
            # Test API call
            if access_token:
                headers = {
                    'Authorization': f'Bearer {access_token}',
                    'Content-Type': 'application/json'
                }
                
                try:
                    response = requests.get(
                        'https://www.qmee.com/api/v1/user/profile',
                        headers=headers,
                        timeout=10
                    )
                    
                    if response.status_code == 200:
                        print("   API Test: ✅ Working - Can access user profile")
                    elif response.status_code == 401:
                        print("   API Test: ❌ Unauthorized - Token expired or invalid")
                    else:
                        print(f"   API Test: ⚠️  Status {response.status_code} - {response.text[:100]}")
                        
                except Exception as e:
                    print(f"   API Test: ❌ Error - {e}")
        else:
            print("   ❌ No Qmee tokens found in localStorage")
            
    except Exception as e:
        print(f"   ❌ Error reading auth.json: {e}")


def test_google_api():
    """Test if Google API key is working"""
    print("\n🔑 Testing Google API Key...")
    
    # Load environment variables first
    load_env_file()
    
    google_api_key = os.getenv('GOOGLE_API_KEY')
    
    if not google_api_key:
        print("   ❌ GOOGLE_API_KEY not found in environment variables")
        print("   💡 Check if you have a .env file or set the environment variable")
        return
    
    print(f"   ✅ Google API Key found: {google_api_key[:10]}...")
    
    # Test with a simple Gemini API call
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={google_api_key}"
        
        data = {
            "contents": [{
                "parts": [{"text": "Hello, this is a test message."}]
            }]
        }
        
        response = requests.post(url, json=data, timeout=10)
        
        if response.status_code == 200:
            print("   API Test: ✅ Working - Can access Gemini API")
            result = response.json()
            if 'candidates' in result:
                print("   ✅ Gemini API response received successfully")
        elif response.status_code == 400:
            print("   API Test: ⚠️  Bad Request - Check API key format")
        elif response.status_code == 403:
            print("   API Test: ❌ Forbidden - API key invalid or quota exceeded")
        else:
            print(f"   API Test: ⚠️  Status {response.status_code} - {response.text[:100]}")
            
    except Exception as e:
        print(f"   API Test: ❌ Error - {e}")


def test_captcha_apis():
    """Test if Captcha solving APIs are working"""
    print("\n🔑 Testing Captcha Solving APIs...")
    
    # Test Capsolver
    capsolver_key = os.getenv('CAPSOLVER_API_KEY')
    if capsolver_key:
        print(f"   ✅ Capsolver API Key found: {capsolver_key[:10]}...")
        
        try:
            url = "https://api.capsolver.com/getBalance"
            data = {"clientKey": capsolver_key}
            
            response = requests.post(url, json=data, timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                if result.get('status') == 'ready':
                    balance = result.get('balance', 0)
                    print(f"   API Test: ✅ Working - Balance: ${balance}")
                else:
                    print(f"   API Test: ⚠️  Error: {result.get('errorDescription', 'Unknown error')}")
            else:
                print(f"   API Test: ❌ Status {response.status_code}")
                
        except Exception as e:
            print(f"   API Test: ❌ Error - {e}")
    else:
        print("   ❌ CAPSOLVER_API_KEY not found")
    
    # Test AntiCaptcha
    anticaptcha_key = os.getenv('ANTI_CAPTCHA_API_KEY')
    if anticaptcha_key:
        print(f"   ✅ AntiCaptcha API Key found: {anticaptcha_key[:10]}...")
        
        try:
            url = "https://api.anti-captcha.com/getBalance"
            data = {"clientKey": anticaptcha_key}
            
            response = requests.post(url, json=data, timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                if result.get('errorId') == 0:
                    balance = result.get('balance', 0)
                    print(f"   API Test: ✅ Working - Balance: ${balance}")
                else:
                    print(f"   API Test: ⚠️  Error: {result.get('errorDescription', 'Unknown error')}")
            else:
                print(f"   API Test: ❌ Status {response.status_code}")
                
        except Exception as e:
            print(f"   API Test: ❌ Error - {e}")
    else:
        print("   ❌ ANTI_CAPTCHA_API_KEY not found")


def check_env_file():
    """Check if .env file exists and what's in it"""
    print("\n📁 Checking Environment Configuration...")
    
    env_file = Path(__file__).parent.parent / '.env'
    if env_file.exists():
        print("   ✅ .env file found")
        
        with open(env_file, 'r') as f:
            lines = f.readlines()
        
        # Count configured keys
        configured_keys = 0
        for line in lines:
            if line.strip() and not line.startswith('#') and '=' in line:
                key = line.split('=')[0].strip()
                if key in ['GOOGLE_API_KEY', 'CAPSOLVER_API_KEY', 'ANTI_CAPTCHA_API_KEY']:
                    configured_keys += 1
                    print(f"   ✅ {key} configured")
        
        print(f"   📊 Total API keys configured: {configured_keys}")
        
    else:
        print("   ❌ .env file not found")
        print("   💡 Create a .env file based on Configurations/env.example")


def main():
    """Main test function"""
    print("🚀 API Key Test Script")
    print("=" * 50)
    
    # Test Qmee tokens
    test_qmee_tokens()
    
    # Test Google API
    test_google_api()
    
    # Test Captcha APIs
    test_captcha_apis()
    
    # Check environment configuration
    check_env_file()
    
    print("\n" + "=" * 50)
    print("📊 Test Summary:")
    print("✅ Working: API keys that are valid and functional")
    print("⚠️  Warning: API keys that have issues but might work")
    print("❌ Error: API keys that are missing or completely broken")
    print("\n💡 Recommendations:")
    print("1. Check .env file for missing API keys")
    print("2. Renew expired tokens")
    print("3. Verify API quotas and billing")
    print("4. Test with a simple API call")


if __name__ == "__main__":
    main()
