#!/usr/bin/env python3
"""
Setup script for Gemini API integration
"""

import os
import sys
from pathlib import Path

def setup_gemini_api():
    """Interactive setup for Gemini API"""
    
    print("🚀 Gemini API Setup for SurveyBot")
    print("=" * 50)
    
    # Check current status
    api_key = os.getenv('GEMINI_API_KEY')
    if api_key:
        print(f"✅ GEMINI_API_KEY already set: {api_key[:10]}...")
        print("💡 To change it, unset the current one first:")
        print("   unset GEMINI_API_KEY")
        return True
    
    print("❌ GEMINI_API_KEY not found")
    print("\n📋 Setup Instructions:")
    print("1. Visit: https://aistudio.google.com/")
    print("2. Sign in with your Google account")
    print("3. Create a new API key (it's free)")
    print("4. Copy the API key")
    print("\n🔑 Enter your Gemini API key (or press Enter to skip):")
    
    try:
        user_input = input("API Key: ").strip()
        if not user_input:
            print("⏭️ Skipping Gemini API setup")
            return False
        
        # Validate the key format (basic check)
        if len(user_input) < 20:
            print("❌ API key seems too short. Please check and try again.")
            return False
        
        # Set environment variable for current session
        os.environ['GEMINI_API_KEY'] = user_input
        print(f"✅ API key set for current session: {user_input[:10]}...")
        
        # Offer to save to .env file
        print("\n💾 Save to .env file for future sessions? (y/n):")
        save_env = input().strip().lower()
        
        if save_env in ['y', 'yes']:
            env_file = Path('.env')
            if env_file.exists():
                # Check if GEMINI_API_KEY already exists
                with open(env_file, 'r') as f:
                    content = f.read()
                    if 'GEMINI_API_KEY' in content:
                        # Update existing key
                        lines = content.split('\n')
                        updated_lines = []
                        for line in lines:
                            if line.startswith('GEMINI_API_KEY='):
                                updated_lines.append(f'GEMINI_API_KEY={user_input}')
                            else:
                                updated_lines.append(line)
                        
                        with open(env_file, 'w') as f:
                            f.write('\n'.join(updated_lines))
                    else:
                        # Add new key
                        with open(env_file, 'a') as f:
                            f.write(f'\nGEMINI_API_KEY={user_input}')
            else:
                # Create new .env file
                with open(env_file, 'w') as f:
                    f.write(f'GEMINI_API_KEY={user_input}')
            
            print(f"✅ API key saved to {env_file}")
            print("💡 The .env file will be loaded automatically in future sessions")
        
        return True
        
    except KeyboardInterrupt:
        print("\n\n⏹️ Setup cancelled")
        return False
    except Exception as e:
        print(f"\n❌ Error during setup: {e}")
        return False

def test_gemini_connection():
    """Test the Gemini API connection"""
    
    print("\n🧪 Testing Gemini API Connection...")
    print("=" * 50)
    
    try:
        from google import genai
        print("✅ Google GenAI SDK imported successfully")
        
        # Test client initialization
        client = genai.Client()
        print("✅ Gemini client initialized successfully")
        
        # Test basic API call
        print("📡 Making test API call...")
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents="Respond with just 'Gemini is working!'"
        )
        
        print(f"✅ API call successful!")
        print(f"📝 Response: {response.text}")
        
        return True
        
    except ImportError as e:
        print(f"❌ Google GenAI SDK not available: {e}")
        print("💡 Install with: pip install -q -U google-genai")
        return False
    except Exception as e:
        print(f"❌ API test failed: {e}")
        return False

def show_usage_examples():
    """Show examples of how to use Gemini API in your bot"""
    
    print("\n📚 Gemini API Usage Examples")
    print("=" * 50)
    
    examples = """
🔹 **Basic Text Generation:**
   - Generate survey responses
   - Create personality variations
   - Generate human-like text

🔹 **Multimodal Capabilities:**
   - Process survey screenshots
   - Analyze form layouts
   - Extract text from images

🔹 **Advanced Features:**
   - Chat conversations
   - Structured output (JSON)
   - Streaming responses

🔹 **Integration Points:**
   - Enhanced personality system
   - AI-powered responses
   - Smart content generation
    """
    
    print(examples)

def main():
    """Main setup function"""
    
    print("🎯 SurveyBot Gemini API Integration Setup")
    print("=" * 50)
    
    # Setup API key
    if not setup_gemini_api():
        print("\n⚠️ Gemini API setup incomplete")
        print("💡 You can still use enhanced cursor features without Gemini")
        return
    
    # Test connection
    if test_gemini_connection():
        print("\n🎉 Gemini API is working perfectly!")
        show_usage_examples()
    else:
        print("\n❌ Gemini API test failed")
        print("💡 Check your API key and internet connection")
    
    print("\n" + "=" * 50)
    print("🚀 Setup complete! Your SurveyBot is ready to use Gemini AI!")

if __name__ == "__main__":
    main()
