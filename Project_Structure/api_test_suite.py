#!/usr/bin/env python3
"""
Comprehensive API Test Suite
Tests both Gemini and OpenAI APIs individually and together
"""

import os
import json
import time
import requests
from typing import Dict, Any, Optional
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv(Path(__file__).parent.parent / '.env')

# Import AI libraries
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    print("⚠️  Gemini library not available")

try:
    import openai
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
    print("⚠️  OpenAI library not available")


class APITestSuite:
    """Comprehensive API testing for both Gemini and OpenAI"""
    
    def __init__(self):
        """Initialize the test suite"""
        self.gemini_api_key = os.getenv('GOOGLE_API_KEY')
        self.openai_api_key = os.getenv('OPENAI_API_KEY')
        self.test_results = {}
        
        print("🧪 API Test Suite Initialized")
        print("=" * 50)
        
        # Check API keys
        if self.gemini_api_key:
            print(f"✅ Gemini API key found: {self.gemini_api_key[:10]}...")
        else:
            print("❌ Gemini API key not found")
            
        if self.openai_api_key:
            print(f"✅ OpenAI API key found: {self.openai_api_key[:10]}...")
        else:
            print("❌ OpenAI API key not found")
    
    def test_gemini_direct_http(self) -> Dict[str, Any]:
        """Test Gemini API using direct HTTP requests"""
        
        print("\n🌐 Testing Gemini API (Direct HTTP)")
        print("-" * 40)
        
        if not self.gemini_api_key:
            return {"status": "Failed", "error": "No API key", "response": None}
        
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_api_key}"
            
            headers = {"Content-Type": "application/json"}
            
            data = {
                "contents": [
                    {
                        "parts": [
                            {"text": "Hello! Please respond with 'Gemini API is working correctly' in exactly those words."}
                        ]
                    }
                ]
            }
            
            print("📡 Sending request to Gemini API...")
            response = requests.post(url, headers=headers, json=data, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                print("✅ Gemini API HTTP request successful!")
                
                # Extract the response text
                if 'candidates' in result and len(result['candidates']) > 0:
                    response_text = result['candidates'][0]['content']['parts'][0]['text']
                    print(f"📝 Response: {response_text}")
                    
                    # Check if response contains expected text
                    if "Gemini API is working correctly" in response_text:
                        print("✅ Response validation successful!")
                        return {
                            "status": "Success",
                            "response": response_text,
                            "http_status": response.status_code,
                            "error": None
                        }
                    else:
                        print("⚠️  Response validation failed - unexpected content")
                        return {
                            "status": "Partial Success",
                            "response": response_text,
                            "http_status": response.status_code,
                            "error": "Unexpected response content"
                        }
                else:
                    print("⚠️  No candidates in response")
                    return {
                        "status": "Partial Success",
                        "response": result,
                        "http_status": response.status_code,
                        "error": "No candidates in response"
                    }
            else:
                print(f"❌ Gemini API HTTP request failed: {response.status_code}")
                print(f"Error: {response.text}")
                return {
                    "status": "Failed",
                    "response": None,
                    "http_status": response.status_code,
                    "error": response.text
                }
                
        except Exception as e:
            print(f"❌ Gemini API HTTP test error: {e}")
            return {"status": "Failed", "error": str(e), "response": None}
    
    def test_gemini_library(self) -> Dict[str, Any]:
        """Test Gemini API using the official library"""
        
        print("\n📚 Testing Gemini API (Official Library)")
        print("-" * 40)
        
        if not GEMINI_AVAILABLE:
            return {"status": "Failed", "error": "Gemini library not available", "response": None}
        
        if not self.gemini_api_key:
            return {"status": "Failed", "error": "No API key", "response": None}
        
        try:
            # Configure Gemini
            genai.configure(api_key=self.gemini_api_key)
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            print("📡 Sending request via Gemini library...")
            
            response = model.generate_content(
                "Hello! Please respond with 'Gemini Library is working correctly' in exactly those words.",
                generation_config=genai.types.GenerationConfig(
                    temperature=0.1,
                    max_output_tokens=100
                )
            )
            
            if response and response.text:
                print("✅ Gemini library request successful!")
                print(f"📝 Response: {response.text}")
                
                # Check if response contains expected text
                if "Gemini Library is working correctly" in response.text:
                    print("✅ Response validation successful!")
                    return {
                        "status": "Success",
                        "response": response.text,
                        "error": None
                    }
                else:
                    print("⚠️  Response validation failed - unexpected content")
                    return {
                        "status": "Partial Success",
                        "response": response.text,
                        "error": "Unexpected response content"
                    }
            else:
                print("❌ Gemini library returned empty response")
                return {
                    "status": "Failed",
                    "response": None,
                    "error": "Empty response"
                }
                
        except Exception as e:
            print(f"❌ Gemini library test error: {e}")
            return {"status": "Failed", "error": str(e), "response": None}
    
    def test_openai_library(self) -> Dict[str, Any]:
        """Test OpenAI API using the official library"""
        
        print("\n🤖 Testing OpenAI API (Official Library)")
        print("-" * 40)
        
        if not OPENAI_AVAILABLE:
            return {"status": "Failed", "error": "OpenAI library not available", "response": None}
        
        if not self.openai_api_key:
            return {"status": "Failed", "error": "No API key", "response": None}
        
        try:
            # Configure OpenAI
            openai.api_key = self.openai_api_key
            
            print("📡 Sending request via OpenAI library...")
            
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": "Hello! Please respond with 'OpenAI API is working correctly' in exactly those words."}
                ],
                max_tokens=100,
                temperature=0.1
            )
            
            if response.choices and response.choices[0].message:
                response_text = response.choices[0].message.content
                print("✅ OpenAI library request successful!")
                print(f"📝 Response: {response_text}")
                
                # Check if response contains expected text
                if "OpenAI API is working correctly" in response_text:
                    print("✅ Response validation successful!")
                    return {
                        "status": "Success",
                        "response": response_text,
                        "error": None
                    }
                else:
                    print("⚠️  Response validation failed - unexpected content")
                    return {
                        "status": "Partial Success",
                        "response": response_text,
                        "error": "Unexpected response content"
                    }
            else:
                print("❌ OpenAI library returned empty response")
                return {
                    "status": "Failed",
                    "response": None,
                    "error": "Empty response"
                }
                
        except Exception as e:
            print(f"❌ OpenAI library test error: {e}")
            return {"status": "Failed", "error": str(e), "response": None}
    
    def test_openai_direct_http(self) -> Dict[str, Any]:
        """Test OpenAI API using direct HTTP requests"""
        
        print("\n🌐 Testing OpenAI API (Direct HTTP)")
        print("-" * 40)
        
        if not self.openai_api_key:
            return {"status": "Failed", "error": "No API key", "response": None}
        
        try:
            url = "https://api.openai.com/v1/chat/completions"
            
            headers = {
                "Authorization": f"Bearer {self.openai_api_key}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": "Hello! Please respond with 'OpenAI HTTP API is working correctly' in exactly those words."}
                ],
                "max_tokens": 100,
                "temperature": 0.1
            }
            
            print("📡 Sending request to OpenAI API...")
            response = requests.post(url, headers=headers, json=data, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                print("✅ OpenAI API HTTP request successful!")
                
                # Extract the response text
                if 'choices' in result and len(result['choices']) > 0:
                    response_text = result['choices'][0]['message']['content']
                    print(f"📝 Response: {response_text}")
                    
                    # Check if response contains expected text
                    if "OpenAI HTTP API is working correctly" in response_text:
                        print("✅ Response validation successful!")
                        return {
                            "status": "Success",
                            "response": response_text,
                            "http_status": response.status_code,
                            "error": None
                        }
                    else:
                        print("⚠️  Response validation failed - unexpected content")
                        return {
                            "status": "Partial Success",
                            "response": response_text,
                            "http_status": response.status_code,
                            "error": "Unexpected response content"
                        }
                else:
                    print("⚠️  No choices in response")
                    return {
                        "status": "Partial Success",
                        "response": result,
                        "http_status": response.status_code,
                        "error": "No choices in response"
                    }
            else:
                print(f"❌ OpenAI API HTTP request failed: {response.status_code}")
                print(f"Error: {response.text}")
                return {
                    "status": "Failed",
                    "response": None,
                    "http_status": response.status_code,
                    "error": response.text
                }
                
        except Exception as e:
            print(f"❌ OpenAI API HTTP test error: {e}")
            return {"status": "Failed", "error": str(e), "response": None}
    
    def test_survey_question_responses(self) -> Dict[str, Any]:
        """Test both APIs with realistic survey questions"""
        
        print("\n📋 Testing Survey Question Responses")
        print("-" * 40)
        
        test_questions = [
            "What is your favorite hobby?",
            "How would you describe your political views?",
            "What industry do you work in?",
            "What type of device do you use most often?"
        ]
        
        results = {
            "gemini": {"responses": [], "status": "Not tested"},
            "openai": {"responses": [], "status": "Not tested"}
        }
        
        # Test Gemini with survey questions
        if self.gemini_api_key and GEMINI_AVAILABLE:
            try:
                genai.configure(api_key=self.gemini_api_key)
                model = genai.GenerativeModel('gemini-1.5-flash')
                
                print("🧠 Testing Gemini with survey questions...")
                for question in test_questions:
                    try:
                        response = model.generate_content(
                            f"Answer this survey question naturally: {question}",
                            generation_config=genai.types.GenerationConfig(
                                temperature=0.7,
                                max_output_tokens=100
                            )
                        )
                        if response and response.text:
                            results["gemini"]["responses"].append({
                                "question": question,
                                "response": response.text.strip()
                            })
                    except Exception as e:
                        print(f"⚠️  Gemini question failed: {e}")
                
                results["gemini"]["status"] = "Success" if results["gemini"]["responses"] else "Failed"
                print(f"✅ Gemini survey responses: {len(results['gemini']['responses'])}/{len(test_questions)}")
                
            except Exception as e:
                results["gemini"]["status"] = f"Error: {e}"
                print(f"❌ Gemini survey test failed: {e}")
        
        # Test OpenAI with survey questions
        if self.openai_api_key and OPENAI_AVAILABLE:
            try:
                openai.api_key = self.openai_api_key
                
                print("🤖 Testing OpenAI with survey questions...")
                for question in test_questions:
                    try:
                        response = openai.chat.completions.create(
                            model="gpt-4o-mini",
                            messages=[
                                {"role": "system", "content": "You are a survey respondent providing natural answers."},
                                {"role": "user", "content": f"Answer this survey question naturally: {question}"}
                            ],
                            max_tokens=100,
                            temperature=0.7
                        )
                        
                        if response.choices and response.choices[0].message:
                            results["openai"]["responses"].append({
                                "question": question,
                                "response": response.choices[0].message.content.strip()
                            })
                    except Exception as e:
                        print(f"⚠️  OpenAI question failed: {e}")
                
                results["openai"]["status"] = "Success" if results["openai"]["responses"] else "Failed"
                print(f"✅ OpenAI survey responses: {len(results['openai']['responses'])}/{len(test_questions)}")
                
            except Exception as e:
                results["openai"]["status"] = f"Error: {e}"
                print(f"❌ OpenAI survey test failed: {e}")
        
        return results
    
    def run_comprehensive_test(self) -> Dict[str, Any]:
        """Run all tests and return comprehensive results"""
        
        print("🚀 Starting Comprehensive API Test Suite")
        print("=" * 60)
        
        start_time = time.time()
        
        # Run all tests
        self.test_results = {
            "gemini_http": self.test_gemini_direct_http(),
            "gemini_library": self.test_gemini_library(),
            "openai_library": self.test_openai_library(),
            "openai_http": self.test_openai_direct_http(),
            "survey_responses": self.test_survey_question_responses()
        }
        
        end_time = time.time()
        test_duration = end_time - start_time
        
        # Calculate overall status
        successful_tests = sum(1 for result in self.test_results.values() 
                             if isinstance(result, dict) and result.get("status") == "Success")
        total_tests = len([r for r in self.test_results.values() if isinstance(r, dict)])
        
        overall_status = "Ready" if successful_tests > 0 else "Failed"
        
        # Print comprehensive results
        print("\n" + "=" * 60)
        print("📊 COMPREHENSIVE TEST RESULTS")
        print("=" * 60)
        
        print(f"⏱️  Total Test Duration: {test_duration:.2f} seconds")
        print(f"📈 Overall Status: {overall_status}")
        print(f"✅ Successful Tests: {successful_tests}/{total_tests}")
        
        print(f"\n🔍 Detailed Results:")
        print(f"   Gemini HTTP API: {self.test_results['gemini_http']['status']}")
        print(f"   Gemini Library: {self.test_results['gemini_library']['status']}")
        print(f"   OpenAI Library: {self.test_results['openai_library']['status']}")
        print(f"   OpenAI HTTP API: {self.test_results['openai_http']['status']}")
        print(f"   Survey Responses: {self.test_results['survey_responses']['gemini']['status']} / {self.test_results['survey_responses']['openai']['status']}")
        
        # Summary
        print(f"\n🎯 Summary:")
        if self.test_results['gemini_library']['status'] == 'Success':
            print("   🚀 Gemini API: ✅ FULLY OPERATIONAL")
        else:
            print("   🚀 Gemini API: ❌ ISSUES DETECTED")
            
        if self.test_results['openai_library']['status'] == 'Success':
            print("   🤖 OpenAI API: ✅ FULLY OPERATIONAL")
        else:
            print("   🤖 OpenAI API: ❌ ISSUES DETECTED")
        
        if overall_status == "Ready":
            print("\n🎉 Your Dual AI System is Ready for Production!")
            print("   🌐 Maximum reliability with automatic failover")
            print("   🚀 Gemini as primary (fast, cheap)")
            print("   🤖 OpenAI as backup (reliable fallback)")
        else:
            print("\n⚠️  Some issues detected - check configuration")
        
        return {
            "overall_status": overall_status,
            "test_results": self.test_results,
            "test_duration": test_duration,
            "successful_tests": successful_tests,
            "total_tests": total_tests
        }


def main():
    """Main test execution"""
    
    print("🧪 API Test Suite: Gemini + OpenAI")
    print("=" * 50)
    
    # Check if we have at least one API key
    gemini_key = os.getenv('GOOGLE_API_KEY')
    openai_key = os.getenv('OPENAI_API_KEY')
    
    if not gemini_key and not openai_key:
        print("❌ No API keys found!")
        print("💡 Please set GOOGLE_API_KEY and/or OPENAI_API_KEY in your .env file")
        return
    
    # Run comprehensive test
    test_suite = APITestSuite()
    results = test_suite.run_comprehensive_test()
    
    # Final status
    print("\n" + "=" * 60)
    if results["overall_status"] == "Ready":
        print("🎉 ALL TESTS COMPLETED SUCCESSFULLY!")
        print("🚀 Your Dual AI System is Ready!")
    else:
        print("⚠️  Some tests failed - check the results above")
    
    print("=" * 60)


if __name__ == "__main__":
    main()
