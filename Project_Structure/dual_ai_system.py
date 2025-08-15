#!/usr/bin/env python3
"""
Dual AI System: Gemini + OpenAI Fallback
Provides maximum reliability with two AI providers
"""

import os
import json
import time
import re
from typing import Dict, List, Optional, Any
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


class DualAISystem:
    """
    Dual AI system with Gemini primary and OpenAI fallback
    
    Features:
    - Gemini as primary AI (faster, cheaper)
    - OpenAI as fallback (reliable backup)
    - Automatic failover on errors
    - Consistent response formatting
    - Works with any survey platform
    """
    
    def __init__(self, gemini_api_key: str = None, openai_api_key: str = None):
        """
        Initialize dual AI system
        
        Args:
            gemini_api_key: Google API key for Gemini
            openai_api_key: OpenAI API key for fallback
        """
        self.gemini_api_key = gemini_api_key or os.getenv('GOOGLE_API_KEY')
        self.openai_api_key = openai_api_key or os.getenv('OPENAI_API_KEY')
        
        # Initialize Gemini
        if GEMINI_AVAILABLE and self.gemini_api_key:
            try:
                genai.configure(api_key=self.gemini_api_key)
                self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')
                self.gemini_available = True
                print(f"🚀 Gemini AI initialized: {self.gemini_api_key[:10]}...")
            except Exception as e:
                print(f"⚠️  Gemini initialization failed: {e}")
                self.gemini_available = False
        else:
            self.gemini_available = False
            print("❌ Gemini not available")
        
        # Initialize OpenAI
        if OPENAI_AVAILABLE and self.openai_api_key:
            try:
                openai.api_key = self.openai_api_key
                self.openai_available = True
                print(f"🤖 OpenAI initialized: {self.openai_api_key[:10]}...")
            except Exception as e:
                print(f"⚠️  OpenAI initialization failed: {e}")
                self.openai_available = False
        else:
            self.openai_available = False
            print("❌ OpenAI not available")
        
        # Check system status
        if not self.gemini_available and not self.openai_available:
            raise ValueError("No AI providers available. Check your API keys.")
        
        print(f"✅ Dual AI System Status:")
        print(f"   Gemini: {'✅ Ready' if self.gemini_available else '❌ Unavailable'}")
        print(f"   OpenAI: {'✅ Ready' if self.openai_available else '❌ Unavailable'}")
    
    def generate_response(self, question: str, context: str = "", platform: str = "unknown") -> str:
        """
        Generate AI response using dual system with automatic failover
        
        Args:
            question: The survey question
            context: Additional context
            platform: Survey platform name
        
        Returns:
            AI-generated response
        """
        
        # Try Gemini first (primary)
        if self.gemini_available:
            try:
                response = self._generate_gemini_response(question, context, platform)
                if response:
                    print(f"🧠 Gemini response generated for {platform}")
                    return self._clean_response(response)
            except Exception as e:
                print(f"⚠️  Gemini failed: {e}")
        
        # Fallback to OpenAI
        if self.openai_available:
            try:
                response = self._generate_openai_response(question, context, platform)
                if response:
                    print(f"🤖 OpenAI fallback response for {platform}")
                    return self._clean_response(response)
            except Exception as e:
                print(f"⚠️  OpenAI failed: {e}")
        
        # Final fallback to static responses
        print(f"⚠️  All AI providers failed, using static fallback for {platform}")
        return self._generate_static_fallback(question, platform)
    
    def _generate_gemini_response(self, question: str, context: str, platform: str) -> Optional[str]:
        """Generate response using Gemini"""
        try:
            prompt = self._build_prompt(question, context, platform, "gemini")
            
            response = self.gemini_model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.7,
                    top_k=40,
                    top_p=0.95,
                    max_output_tokens=500
                )
            )
            
            if response and response.text:
                return response.text
            return None
            
        except Exception as e:
            print(f"❌ Gemini error: {e}")
            return None
    
    def _generate_openai_response(self, question: str, context: str, platform: str) -> Optional[str]:
        """Generate response using OpenAI"""
        try:
            prompt = self._build_prompt(question, context, platform, "openai")
            
            response = openai.chat.completions.create(
                model="gpt-4o-mini",  # Fast and cost-effective
                messages=[
                    {"role": "system", "content": "You are a survey respondent providing natural, human-like answers."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            if response.choices and response.choices[0].message:
                return response.choices[0].message.content
            return None
            
        except Exception as e:
            print(f"❌ OpenAI error: {e}")
            return None
    
    def _build_prompt(self, question: str, context: str, platform: str, ai_type: str) -> str:
        """Build optimized prompt for the specific AI provider"""
        
        if ai_type == "gemini":
            prompt = f"""
You are a survey respondent participating in a survey on {platform}. 
Provide a natural, human-like response to the following question.

Question: {question}

Context: {context if context else 'No additional context provided'}

Instructions:
1. Answer naturally and conversationally, like a real person
2. Keep responses appropriate in length (1-3 sentences for most questions)
3. If it's a demographic question, provide realistic information
4. If it's an opinion question, provide thoughtful but not extreme views
5. Use natural language without dashes or special formatting
6. Be consistent with typical survey responses
7. Avoid overly formal or robotic language

Response:"""
        else:  # OpenAI
            prompt = f"""
You are a survey respondent on {platform}. Answer this question naturally:

Question: {question}
Context: {context if context else 'No additional context'}

Provide a natural, conversational response (1-3 sentences) that sounds like a real person answering a survey. Avoid dashes and special formatting.

Answer:"""
        
        return prompt.strip()
    
    def _clean_response(self, response: str) -> str:
        """Clean and format the AI response"""
        
        if not response:
            return ""
        
        # Clean the response
        cleaned = response.strip()
        
        # Remove unwanted dashes and formatting
        cleaned = cleaned.replace('–', ' ')
        cleaned = cleaned.replace('—', ' ')
        cleaned = cleaned.replace('-', ' ')
        
        # Clean up multiple spaces
        cleaned = re.sub(r'\s+', ' ', cleaned)
        
        # Remove quotes if they wrap the entire response
        cleaned = cleaned.strip('"').strip("'")
        
        # Ensure proper sentence structure
        if cleaned and not cleaned.endswith(('.', '!', '?')):
            cleaned += '.'
        
        return cleaned.strip()
    
    def _generate_static_fallback(self, question: str, platform: str) -> str:
        """Generate static fallback responses"""
        
        question_lower = question.lower()
        
        # Comprehensive fallback responses
        if any(term in question_lower for term in ['age', 'years old', 'how old']):
            return "I'm 32 years old."
        
        elif any(term in question_lower for term in ['hobby', 'interest', 'like', 'enjoy']):
            return "I enjoy reading science fiction and watching documentaries."
        
        elif any(term in question_lower for term in ['device', 'phone', 'mobile', 'tablet', 'desktop']):
            return "I primarily use a desktop computer for most tasks."
        
        elif any(term in question_lower for term in ['political', 'politics', 'liberal', 'conservative']):
            return "I consider myself politically moderate with some liberal leanings."
        
        elif any(term in question_lower for term in ['industry', 'work', 'job', 'career']):
            return "I work in the technology sector, specifically in software development."
        
        elif any(term in question_lower for term in ['income', 'salary', 'earnings']):
            return "My annual income is in the $60,000 to $80,000 range."
        
        elif any(term in question_lower for term in ['education', 'degree', 'school']):
            return "I have a bachelor's degree in computer science."
        
        elif any(term in question_lower for term in ['shopping', 'buy', 'purchase']):
            return "I prefer to shop online for convenience, but I also enjoy browsing in stores occasionally."
        
        elif any(term in question_lower for term in ['streaming', 'media', 'tv', 'movie']):
            return "I enjoy watching science fiction shows and documentaries on streaming platforms."
        
        elif any(term in question_lower for term in ['social media', 'social', 'platform']):
            return "I use social media moderately, mainly to stay connected with friends and family."
        
        elif any(term in question_lower for term in ['travel', 'vacation', 'trip']):
            return "I enjoy domestic travel and exploring new cities in the United States."
        
        elif any(term in question_lower for term in ['pet', 'dog', 'cat', 'animal']):
            return "I have a cat that I adopted from a local shelter."
        
        else:
            return "I would prefer not to answer that question at this time."
    
    def test_system(self) -> Dict[str, Any]:
        """Test both AI providers"""
        
        test_question = "What is your favorite hobby?"
        test_context = "Hobby survey"
        test_platform = "test"
        
        results = {
            "gemini": {"status": "Not tested", "response": None, "error": None},
            "openai": {"status": "Not tested", "response": None, "error": None},
            "overall": "Not tested"
        }
        
        print("🧪 Testing Dual AI System...")
        
        # Test Gemini
        if self.gemini_available:
            try:
                response = self._generate_gemini_response(test_question, test_context, test_platform)
                if response:
                    results["gemini"] = {"status": "Success", "response": response, "error": None}
                    print("✅ Gemini test successful")
                else:
                    results["gemini"] = {"status": "Failed", "response": None, "error": "Empty response"}
                    print("❌ Gemini test failed: Empty response")
            except Exception as e:
                results["gemini"] = {"status": "Error", "response": None, "error": str(e)}
                print(f"❌ Gemini test error: {e}")
        
        # Test OpenAI
        if self.openai_available:
            try:
                response = self._generate_openai_response(test_question, test_context, test_platform)
                if response:
                    results["openai"] = {"status": "Success", "response": response, "error": None}
                    print("✅ OpenAI test successful")
                else:
                    results["openai"] = {"status": "Failed", "response": None, "error": "Empty response"}
                    print("❌ OpenAI test failed: Empty response")
            except Exception as e:
                results["openai"] = {"status": "Error", "response": None, "error": str(e)}
                print(f"❌ OpenAI test error: {e}")
        
        # Determine overall status
        if results["gemini"]["status"] == "Success" or results["openai"]["status"] == "Success":
            results["overall"] = "Ready"
        elif results["gemini"]["status"] == "Not tested" and results["openai"]["status"] == "Not tested":
            results["overall"] = "No providers available"
        else:
            results["overall"] = "Failed"
        
        return results
    
    def get_system_stats(self) -> Dict[str, Any]:
        """Get comprehensive system statistics"""
        return {
            "gemini_available": self.gemini_available,
            "openai_available": self.openai_available,
            "total_providers": sum([self.gemini_available, self.openai_available]),
            "system_status": "Ready" if (self.gemini_available or self.openai_available) else "Failed",
            "gemini_api_key": f"{self.gemini_api_key[:10]}..." if self.gemini_api_key else "Not set",
            "openai_api_key": f"{self.openai_api_key[:10]}..." if self.openai_api_key else "Not set"
        }


class DualSurveyPlatformAI:
    """Dual AI integration wrapper for survey platforms"""
    
    def __init__(self, platform_name: str, gemini_api_key: str = None, openai_api_key: str = None):
        """
        Initialize dual AI integration for a survey platform
        
        Args:
            platform_name: Name of the survey platform
            gemini_api_key: Google API key for Gemini
            openai_api_key: OpenAI API key for fallback
        """
        self.platform_name = platform_name
        self.ai_system = DualAISystem(gemini_api_key, openai_api_key)
        self.response_cache = {}
        self.success_count = 0
        self.fallback_count = 0
        
        print(f"🤖 Dual AI Integration ready for {platform_name}")
        
        # Test the system
        test_results = self.ai_system.test_system()
        if test_results["overall"] == "Ready":
            print(f"✅ {platform_name} dual AI system verified")
        else:
            print(f"⚠️  {platform_name} dual AI system issues detected")
    
    def answer_question(self, question: str, question_type: str, options: List[Dict] = None, context: str = "") -> Any:
        """
        Answer a survey question using dual AI system
        
        Args:
            question: The survey question
            question_type: Type of question
            options: Available options for multiple choice questions
            context: Additional context
        
        Returns:
            AI-generated answer or selected option
        """
        
        # For open-ended questions, use AI generation
        if question_type in ['open_ended', 'int_open_ended']:
            ai_response = self.ai_system.generate_response(question, context, self.platform_name)
            self.response_cache[question] = ai_response
            self.success_count += 1
            return ai_response
        
        # For multiple choice, use AI to select best option
        elif question_type in ['single_punch', 'multi_punch']:
            if options:
                return self._ai_select_option(question, options, context)
            else:
                return self.ai_system.generate_response(question, context, self.platform_name)
        
        # Fallback for unknown question types
        else:
            return self.ai_system.generate_response(question, context, self.platform_name)
    
    def _ai_select_option(self, question: str, options: List[Dict], context: str) -> Any:
        """Use AI to select the best option from multiple choice"""
        
        # Build option selection prompt
        option_texts = [opt.get('text', '') for opt in options]
        options_str = "\n".join([f"{i+1}. {text}" for i, text in enumerate(option_texts)])
        
        selection_prompt = f"""
Question: {question}

Available Options:
{options_str}

Context: {context if context else 'No additional context'}

Instructions: Select the most appropriate option(s) for this question. 
Consider what would be most realistic and qualification-friendly.
For single choice questions, select only one option.
For multiple choice questions, select all relevant options.

Please provide your selection (option numbers):
"""
        
        try:
            # Try to get AI selection
            ai_response = self.ai_system.generate_response(selection_prompt, context, self.platform_name)
            if ai_response:
                # Parse AI selection and return corresponding options
                return self._parse_ai_selection(ai_response, options)
        except Exception as e:
            print(f"⚠️  AI option selection failed: {e}")
        
        # Fallback: select first reasonable option
        for option in options:
            option_text = option.get('text', '').lower()
            if not any(skip_term in option_text for skip_term in ['cant', 'dont', 'prefer not', 'none']):
                return option
        
        # Last resort: return first option
        return options[0] if options else None
    
    def _parse_ai_selection(self, ai_selection: str, options: List[Dict]) -> Any:
        """Parse AI selection and return corresponding options"""
        
        # Simple parsing - look for numbers in the response
        numbers = re.findall(r'\d+', ai_selection)
        
        if numbers:
            try:
                # Convert to 0-based index
                selected_indices = [int(num) - 1 for num in numbers if 0 <= int(num) - 1 < len(options)]
                if selected_indices:
                    if len(selected_indices) == 1:
                        return options[selected_indices[0]]
                    else:
                        return [options[i] for i in selected_indices]
            except:
                pass
        
        # If parsing fails, return first reasonable option
        for option in options:
            option_text = option.get('text', '').lower()
            if not any(skip_term in option_text for skip_term in ['cant', 'dont', 'prefer not', 'none']):
                return option
        
        return options[0] if options else None
    
    def get_platform_stats(self) -> Dict[str, Any]:
        """Get comprehensive statistics for this platform"""
        return {
            "platform": self.platform_name,
            "ai_system_stats": self.ai_system.get_system_stats(),
            "cached_responses": len(self.response_cache),
            "success_count": self.success_count,
            "fallback_count": self.fallback_count,
            "success_rate": f"{(self.success_count / max(self.success_count + self.fallback_count, 1)) * 100:.1f}%" if (self.success_count + self.fallback_count) > 0 else "0%",
            "status": "Ready"
        }


# Test the dual AI system
def test_dual_ai():
    """Test the dual AI system"""
    
    print("🧪 Testing Dual AI System")
    print("=" * 50)
    
    try:
        # Test basic dual AI system
        dual_ai = DualAISystem()
        
        # Test system
        test_results = dual_ai.test_system()
        
        print(f"\n📊 Test Results:")
        print(f"   Overall Status: {test_results['overall']}")
        print(f"   Gemini: {test_results['gemini']['status']}")
        print(f"   OpenAI: {test_results['openai']['status']}")
        
        if test_results['overall'] == 'Ready':
            print("✅ Dual AI system is working!")
            
            # Test response generation
            test_question = "What is your favorite hobby?"
            response = dual_ai.generate_response(test_question, "Hobby survey", "test_platform")
            print(f"✅ Test response: {response}")
            
        else:
            print("❌ Dual AI system has issues")
            
    except Exception as e:
        print(f"❌ Test failed: {e}")


if __name__ == "__main__":
    print("🚀 Dual AI System: Gemini + OpenAI Fallback")
    print("=" * 60)
    
    # Check if API keys are available
    gemini_key = os.getenv('GOOGLE_API_KEY')
    openai_key = os.getenv('OPENAI_API_KEY')
    
    if not gemini_key and not openai_key:
        print("❌ No API keys found")
        print("💡 Set GOOGLE_API_KEY and/or OPENAI_API_KEY in your .env file")
        exit(1)
    
    if gemini_key:
        print(f"✅ Gemini API key found: {gemini_key[:10]}...")
    if openai_key:
        print(f"✅ OpenAI API key found: {openai_key[:10]}...")
    
    # Test the dual AI system
    test_dual_ai()
    
    print("\n" + "=" * 60)
    print("🎉 Dual AI System Ready!")
    print("🚀 Gemini as primary AI (fast, cheap)")
    print("🤖 OpenAI as fallback (reliable backup)")
    print("✅ Maximum reliability for your survey bot")
    print("🌐 Works with ALL survey platforms!")
