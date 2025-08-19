#!/usr/bin/env python3
"""
Test script for Gemini API integration
"""

import os
import sys

def test_gemini_integration():
    """Test if Gemini API is properly configured and working"""
    
    print("🔍 Testing Gemini API Integration...")
    print("=" * 50)
    
    # Check if API key is set
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("❌ GEMINI_API_KEY not found in environment variables")
        print("\n📋 To set up Gemini API:")
        print("1. Get your API key from: https://aistudio.google.com/")
        print("2. Set environment variable: export GEMINI_API_KEY='your_key_here'")
        print("3. Or create a .env file with: GEMINI_API_KEY=your_key_here")
        return False
    
    print(f"✅ GEMINI_API_KEY found: {api_key[:10]}...")
    
    # Test Google GenAI import
    try:
        from google import genai
        print("✅ Google GenAI SDK imported successfully")
    except ImportError as e:
        print(f"❌ Failed to import Google GenAI SDK: {e}")
        print("💡 Try: pip install -q -U google-genai")
        return False
    
    # Test client initialization
    try:
        client = genai.Client()
        print("✅ Gemini client initialized successfully")
    except Exception as e:
        print(f"❌ Failed to initialize Gemini client: {e}")
        return False
    
    # Test basic API call
    try:
        print("\n🧪 Testing basic API call...")
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents="Say 'Hello from Gemini!' in exactly 5 words."
        )
        print(f"✅ API call successful!")
        print(f"📝 Response: {response.text}")
        return True
        
    except Exception as e:
        print(f"❌ API call failed: {e}")
        return False

def test_enhanced_features():
    """Test enhanced features that use Gemini"""
    
    print("\n🔍 Testing Enhanced Features Integration...")
    print("=" * 50)
    
    try:
        # Test importing enhanced features
        sys.path.insert(0, '.')
        from Main_Files_to_Run.run_bot import ENHANCED_FEATURES_AVAILABLE, ENHANCED_CURSOR_AVAILABLE
        
        print(f"✅ Enhanced Features Available: {ENHANCED_FEATURES_AVAILABLE}")
        print(f"✅ Enhanced Cursor Available: {ENHANCED_CURSOR_AVAILABLE}")
        
        if ENHANCED_FEATURES_AVAILABLE:
            print("🎉 All enhanced features are working!")
        else:
            print("⚠️ Some enhanced features are not available")
            
        return True
        
    except Exception as e:
        print(f"❌ Enhanced features test failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 SurveyBot Gemini Integration Test")
    print("=" * 50)
    
    # Test Gemini API
    gemini_working = test_gemini_integration()
    
    # Test enhanced features
    enhanced_working = test_enhanced_features()
    
    print("\n" + "=" * 50)
    if gemini_working and enhanced_working:
        print("🎉 All tests passed! Your SurveyBot is fully configured!")
    elif enhanced_working:
        print("✅ Enhanced cursor features working, but Gemini API needs setup")
    else:
        print("❌ Some features need attention")
    
    print("=" * 50)
