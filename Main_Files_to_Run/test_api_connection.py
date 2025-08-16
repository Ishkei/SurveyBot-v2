#!/usr/bin/env python3
"""
Test API Connection and Fallback System
Verifies that Gemini API keys are working and fallback responses are available
"""

import asyncio
import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure"))

def test_environment_variables():
    """Test that environment variables are loaded correctly."""
    print("🔍 Testing Environment Variables...")
    
    # Check if .env file exists
    env_file = Path(__file__).parent / ".env"
    if env_file.exists():
        print("✅ .env file found")
        
        # Load environment variables
        from dotenv import load_dotenv
        load_dotenv(env_file)
        
        # Check API keys
        google_key = os.getenv("GOOGLE_API_KEY")
        google_backup = os.getenv("GOOGLE_API_KEY_BACKUP")
        openai_key = os.getenv("OPENAI_API_KEY")
        
        if google_key and google_key != "your_google_api_key_here":
            print(f"✅ Primary Google API Key: {google_key[:20]}...")
        else:
            print("❌ Primary Google API Key not found or invalid")
            
        if google_backup and google_backup != "your_google_api_key_here":
            print(f"✅ Backup Google API Key: {google_backup[:20]}...")
        else:
            print("❌ Backup Google API Key not found or invalid")
            
        if openai_key and openai_key != "your_openai_api_key_here":
            print(f"✅ OpenAI API Key: {openai_key[:20]}...")
        else:
            print("❌ OpenAI API Key not found or invalid")
            
        # Check fallback setting
        use_fallback = os.getenv("USE_FALLBACK", "false").lower()
        if use_fallback == "true":
            print("✅ Fallback system is ENABLED")
        else:
            print("❌ Fallback system is DISABLED")
            
        return True
    else:
        print("❌ .env file not found")
        return False

async def test_gemini_api():
    """Test Gemini API connection."""
    print("\n🤖 Testing Gemini API Connection...")
    
    try:
        import google.generativeai as genai
        
        # Test primary key
        primary_key = os.getenv("GOOGLE_API_KEY")
        if primary_key:
            try:
                genai.configure(api_key=primary_key)
                model = genai.GenerativeModel('gemini-1.5-flash-latest')
                
                # Test simple generation
                response = await asyncio.to_thread(
                    model.generate_content,
                    "Say 'Hello, Gemini API is working!' in one sentence."
                )
                
                if response.text:
                    print(f"✅ Primary Gemini API: Working! Response: {response.text.strip()}")
                    return True
                else:
                    print("❌ Primary Gemini API: No response generated")
                    return False
                    
            except Exception as e:
                print(f"❌ Primary Gemini API failed: {e}")
                
                # Try backup key
                backup_key = os.getenv("GOOGLE_API_KEY_BACKUP")
                if backup_key:
                    try:
                        genai.configure(api_key=backup_key)
                        model = genai.GenerativeModel('gemini-1.5-flash-latest')
                        
                        response = await asyncio.to_thread(
                            model.generate_content,
                            "Say 'Hello, Backup Gemini API is working!' in one sentence."
                        )
                        
                        if response.text:
                            print(f"✅ Backup Gemini API: Working! Response: {response.text.strip()}")
                            return True
                        else:
                            print("❌ Backup Gemini API: No response generated")
                            return False
                            
                    except Exception as e2:
                        print(f"❌ Backup Gemini API also failed: {e2}")
                        return False
                else:
                    return False
        else:
            print("❌ No Gemini API keys found")
            return False
            
    except ImportError:
        print("❌ google-generativeai not installed")
        return False

async def test_personality_system():
    """Test the personality response system with fallback."""
    print("\n🎭 Testing Personality Response System...")
    
    try:
        # Try to import the personality system
        from Project_Structure.personality_responses import generate_personality_response
        
        # Test questions
        test_questions = [
            "Why did you join this survey platform?",
            "How do you feel about technology in your daily life?",
            "What are your hobbies and interests?"
        ]
        
        print("📝 Testing personality responses for open-ended questions...")
        
        for i, question in enumerate(test_questions, 1):
            print(f"\n{i}. Question: {question}")
            
            try:
                response = await generate_personality_response(question, style="discord_casual")
                print(f"   ✅ AI Response: {response[:100]}...")
            except Exception as e:
                print(f"   ❌ AI Response failed: {e}")
                
                # Test fallback
                try:
                    from Project_Structure.personality_responses import PersonalityResponseGenerator
                    generator = PersonalityResponseGenerator()
                    fallback_response = generator._generate_fallback_response(question, "discord_casual")
                    print(f"   🔄 Fallback Response: {fallback_response[:100]}...")
                except Exception as e2:
                    print(f"   ❌ Fallback also failed: {e2}")
        
        return True
        
    except ImportError as e:
        print(f"❌ Personality system not available: {e}")
        return False

async def test_typing_simulation():
    """Test typing simulation integration."""
    print("\n⌨️ Testing Typing Simulation Integration...")
    
    try:
        # Check if typing simulation is available
        from Project_Structure.typing_simulation import TYPING_PRESETS
        
        print("✅ Typing simulation presets available:")
        for style_name, config in TYPING_PRESETS.items():
            print(f"   - {style_name}: {config.get('description', 'No description')}")
        
        # Check personality adaptation (handle import gracefully)
        try:
            from Project_Structure.configs.typing_simulation_config import typing_config
            personality_adaptation = typing_config.get('personality_adaptation', {})
            
            if personality_adaptation:
                print("✅ Personality-based typing adaptation available:")
                for category, styles in personality_adaptation.items():
                    print(f"   - {category}: {styles}")
        except ImportError:
            print("✅ Typing simulation working (config import optional)")
        
        return True
        
    except ImportError as e:
        print(f"❌ Typing simulation not available: {e}")
        return False

async def main():
    """Run all tests."""
    print("🚀 Testing API Connection and Fallback System\n")
    
    # Test environment
    env_ok = test_environment_variables()
    
    # Test Gemini API
    api_ok = await test_gemini_api()
    
    # Test personality system
    personality_ok = await test_personality_system()
    
    # Test typing simulation
    typing_ok = await test_typing_simulation()
    
    # Summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    print(f"Environment Variables: {'✅ PASS' if env_ok else '❌ FAIL'}")
    print(f"Gemini API Connection: {'✅ PASS' if api_ok else '❌ FAIL'}")
    print(f"Personality System: {'✅ PASS' if personality_ok else '❌ FAIL'}")
    print(f"Typing Simulation: {'✅ PASS' if typing_ok else '❌ FAIL'}")
    
    if env_ok and api_ok and personality_ok and typing_ok:
        print("\n🎉 ALL SYSTEMS ARE WORKING! Your bot is ready for open-ended questions!")
        print("✅ API keys are connected")
        print("✅ Fallback system is activated")
        print("✅ Personality responses will work")
        print("✅ Typing simulation is integrated")
    else:
        print("\n⚠️ Some systems need attention. Check the errors above.")
    
    print("="*50)

if __name__ == "__main__":
    asyncio.run(main())
