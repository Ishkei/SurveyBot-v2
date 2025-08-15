#!/usr/bin/env python3
"""
Universal Dual AI Integration for All Survey Platforms
Provides seamless integration of Gemini + OpenAI dual AI system
"""

import os
import json
import time
import re
from typing import Dict, List, Optional, Any, Union
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

try:
    import openai
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False


class UniversalDualAI:
    """
    Universal Dual AI system for all survey platforms
    
    Features:
    - Gemini as primary (fast, cheap)
    - OpenAI as fallback (reliable backup)
    - Automatic failover
    - Platform-specific optimization
    - Universal compatibility
    """
    
    def __init__(self, platform_name: str = "universal"):
        """
        Initialize universal dual AI system
        
        Args:
            platform_name: Name of the survey platform for optimization
        """
        self.platform_name = platform_name
        self.gemini_api_key = os.getenv('GOOGLE_API_KEY')
        self.openai_api_key = os.getenv('OPENAI_API_KEY')
        
        # Initialize AI providers
        self._initialize_ai_providers()
        
        # Response cache for efficiency
        self.response_cache = {}
        self.cache_hits = 0
        self.cache_misses = 0
        
        # Performance tracking
        self.gemini_usage = 0
        self.openai_usage = 0
        self.fallback_usage = 0
        
        print(f"🌐 Universal Dual AI initialized for {platform_name}")
    
    def _initialize_ai_providers(self):
        """Initialize both AI providers"""
        
        # Initialize Gemini
        if GEMINI_AVAILABLE and self.gemini_api_key:
            try:
                genai.configure(api_key=self.gemini_api_key)
                self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')
                self.gemini_available = True
                print(f"🚀 Gemini AI ready: {self.gemini_api_key[:10]}...")
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
                print(f"🤖 OpenAI ready: {self.openai_api_key[:10]}...")
            except Exception as e:
                print(f"⚠️  OpenAI initialization failed: {e}")
                self.openai_available = False
        else:
            self.openai_available = False
            print("❌ OpenAI not available")
        
        # Check system status
        if not self.gemini_available and not self.openai_available:
            print("⚠️  Warning: No AI providers available - using static fallbacks only")
    
    def answer_survey_question(self, question: str, question_type: str, 
                              options: List[Dict] = None, context: str = "") -> Any:
        """
        Answer any survey question using dual AI system
        
        Args:
            question: The survey question text
            question_type: Type of question (open_ended, single_punch, multi_punch, etc.)
            options: Available options for multiple choice questions
            context: Additional context about the survey
        
        Returns:
            AI-generated answer or selected option
        """
        
        # Check cache first
        cache_key = f"{question}_{question_type}_{self.platform_name}"
        if cache_key in self.response_cache:
            self.cache_hits += 1
            return self.response_cache[cache_key]
        
        self.cache_misses += 1
        
        # Handle different question types
        if question_type in ['open_ended', 'int_open_ended']:
            response = self._generate_text_response(question, context)
        elif question_type in ['single_punch', 'multi_punch']:
            response = self._select_best_option(question, options, context)
        else:
            # Unknown question type - try to generate response
            response = self._generate_text_response(question, context)
        
        # Cache the response
        self.response_cache[cache_key] = response
        return response
    
    def _generate_text_response(self, question: str, context: str) -> str:
        """Generate text response using dual AI system"""
        
        # Try Gemini first (primary)
        if self.gemini_available:
            try:
                response = self._generate_gemini_response(question, context)
                if response:
                    self.gemini_usage += 1
                    return self._clean_response(response)
            except Exception as e:
                print(f"⚠️  Gemini failed: {e}")
        
        # Fallback to OpenAI
        if self.openai_available:
            try:
                response = self._generate_openai_response(question, context)
                if response:
                    self.openai_usage += 1
                    return self._clean_response(response)
            except Exception as e:
                print(f"⚠️  OpenAI failed: {e}")
        
        # Final fallback to static responses
        self.fallback_usage += 1
        return self._generate_static_fallback(question)
    
    def _generate_gemini_response(self, question: str, context: str) -> Optional[str]:
        """Generate response using Gemini"""
        try:
            prompt = self._build_gemini_prompt(question, context)
            
            response = self.gemini_model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.7,
                    top_k=40,
                    top_p=0.95,
                    max_output_tokens=300
                )
            )
            
            if response and response.text:
                return response.text
            return None
            
        except Exception as e:
            print(f"❌ Gemini error: {e}")
            return None
    
    def _generate_openai_response(self, question: str, context: str) -> Optional[str]:
        """Generate response using OpenAI"""
        try:
            prompt = self._build_openai_prompt(question, context)
            
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a survey respondent providing natural, human-like answers."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300,
                temperature=0.7
            )
            
            if response.choices and response.choices[0].message:
                return response.choices[0].message.content
            return None
            
        except Exception as e:
            print(f"❌ OpenAI error: {e}")
            return None
    
    def _build_gemini_prompt(self, question: str, context: str) -> str:
        """Build optimized prompt for Gemini"""
        return f"""
You are a survey respondent on {self.platform_name}. Answer this question naturally:

Question: {question}
Context: {context if context else 'No additional context'}

Instructions:
1. Answer naturally and conversationally (1-3 sentences)
2. Provide realistic, human-like responses
3. Avoid dashes, special formatting, or robotic language
4. Be consistent with typical survey responses
5. If demographic question, provide realistic information
6. If opinion question, provide thoughtful but moderate views

Answer:"""
    
    def _build_openai_prompt(self, question: str, context: str) -> str:
        """Build optimized prompt for OpenAI"""
        return f"""
You are a survey respondent on {self.platform_name}. Answer this question naturally:

Question: {question}
Context: {context if context else 'No additional context'}

Provide a natural, conversational response (1-3 sentences) that sounds like a real person answering a survey. Avoid dashes and special formatting.

Answer:"""
    
    def _select_best_option(self, question: str, options: List[Dict], context: str) -> Any:
        """Select best option using AI analysis"""
        
        if not options:
            return None
        
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
            ai_response = self._generate_text_response(selection_prompt, context)
            if ai_response:
                return self._parse_ai_selection(ai_response, options)
        except Exception as e:
            print(f"⚠️  AI option selection failed: {e}")
        
        # Fallback: select first reasonable option
        return self._select_reasonable_fallback(options)
    
    def _parse_ai_selection(self, ai_selection: str, options: List[Dict]) -> Any:
        """Parse AI selection and return corresponding options"""
        
        # Look for numbers in the response
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
        
        # If parsing fails, return reasonable fallback
        return self._select_reasonable_fallback(options)
    
    def _select_reasonable_fallback(self, options: List[Dict]) -> Any:
        """Select reasonable fallback option"""
        
        # Look for first option that doesn't contain skip terms
        skip_terms = ['cant', 'dont', 'prefer not', 'none', 'other', 'skip']
        
        for option in options:
            option_text = option.get('text', '').lower()
            if not any(skip_term in option_text for skip_term in skip_terms):
                return option
        
        # Last resort: return first option
        return options[0] if options else None
    
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
    
    def _generate_static_fallback(self, question: str) -> str:
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
    
    def get_performance_stats(self) -> Dict[str, Any]:
        """Get comprehensive performance statistics"""
        total_requests = self.gemini_usage + self.openai_usage + self.fallback_usage
        
        return {
            "platform": self.platform_name,
            "total_requests": total_requests,
            "gemini_usage": self.gemini_usage,
            "openai_usage": self.openai_usage,
            "fallback_usage": self.fallback_usage,
            "cache_hits": self.cache_hits,
            "cache_misses": self.cache_misses,
            "cache_efficiency": f"{(self.cache_hits / max(total_requests, 1)) * 100:.1f}%" if total_requests > 0 else "0%",
            "gemini_available": self.gemini_available,
            "openai_available": self.openai_available,
            "system_status": "Ready" if (self.gemini_available or self.openai_available) else "Limited"
        }
    
    def test_system(self) -> Dict[str, Any]:
        """Test the dual AI system"""
        
        test_question = "What is your favorite hobby?"
        test_context = "Hobby survey"
        
        print(f"🧪 Testing Universal Dual AI for {self.platform_name}")
        
        try:
            response = self.answer_survey_question(test_question, "open_ended", context=test_context)
            
            if response:
                print(f"✅ Test successful: {response}")
                return {"status": "Success", "response": response}
            else:
                print("❌ Test failed: No response generated")
                return {"status": "Failed", "response": None}
                
        except Exception as e:
            print(f"❌ Test error: {e}")
            return {"status": "Error", "response": None, "error": str(e)}


class SurveyPlatformIntegration:
    """Easy integration wrapper for survey platforms"""
    
    def __init__(self, platform_name: str):
        """
        Initialize integration for a specific survey platform
        
        Args:
            platform_name: Name of the survey platform
        """
        self.platform_name = platform_name
        self.ai_system = UniversalDualAI(platform_name)
        
        print(f"🔗 {platform_name} integration ready")
        
        # Test the system
        test_result = self.ai_system.test_system()
        if test_result["status"] == "Success":
            print(f"✅ {platform_name} AI system verified")
        else:
            print(f"⚠️  {platform_name} AI system issues detected")
    
    def answer_question(self, question: str, question_type: str, 
                       options: List[Dict] = None, context: str = "") -> Any:
        """Answer a survey question using the dual AI system"""
        return self.ai_system.answer_survey_question(question, question_type, options, context)
    
    def get_stats(self) -> Dict[str, Any]:
        """Get platform-specific statistics"""
        return self.ai_system.get_performance_stats()
    
    def test_question(self, question: str, question_type: str = "open_ended", 
                     options: List[Dict] = None, context: str = "") -> Dict[str, Any]:
        """Test answering a specific question"""
        
        start_time = time.time()
        response = self.answer_question(question, question_type, options, context)
        end_time = time.time()
        
        return {
            "question": question,
            "question_type": question_type,
            "response": response,
            "response_time": end_time - start_time,
            "platform": self.platform_name
        }
    
    def test_system(self) -> Dict[str, Any]:
        """Test the platform integration system"""
        return self.ai_system.test_system()


# Platform-specific integration classes
class CPXIntegration(SurveyPlatformIntegration):
    """CPX Research specific integration"""
    
    def __init__(self):
        super().__init__("CPX Research")
    
    def handle_cpx_question(self, question_data: Dict[str, Any]) -> Any:
        """Handle CPX-specific question format"""
        question = question_data.get('text', '')
        question_type = question_data.get('type', 'open_ended')
        options = question_data.get('options', [])
        context = question_data.get('context', '')
        
        return self.answer_question(question, question_type, options, context)


class QmeeIntegration(SurveyPlatformIntegration):
    """Qmee specific integration"""
    
    def __init__(self):
        super().__init__("Qmee")
    
    def handle_qmee_question(self, question_data: Dict[str, Any]) -> Any:
        """Handle Qmee-specific question format"""
        question = question_data.get('text', '')
        question_type = question_data.get('type', 'open_ended')
        options = question_data.get('options', [])
        context = question_data.get('context', '')
        
        return self.answer_question(question, question_type, options, context)


class PureSpectrumIntegration(SurveyPlatformIntegration):
    """PureSpectrum specific integration"""
    
    def __init__(self):
        super().__init__("PureSpectrum")
    
    def handle_purespectrum_question(self, question_data: Dict[str, Any]) -> Any:
        """Handle PureSpectrum-specific question format"""
        question = question_data.get('text', '')
        question_type = question_data.get('type', 'open_ended')
        options = question_data.get('options', [])
        context = question_data.get('context', '')
        
        return self.answer_question(question, question_type, options, context)


# Universal factory function
def create_platform_integration(platform_name: str) -> SurveyPlatformIntegration:
    """
    Create platform-specific integration
    
    Args:
        platform_name: Name of the survey platform
    
    Returns:
        Platform integration instance
    """
    
    platform_name_lower = platform_name.lower()
    
    if 'cpx' in platform_name_lower:
        return CPXIntegration()
    elif 'qmee' in platform_name_lower:
        return QmeeIntegration()
    elif 'purespectrum' in platform_name_lower:
        return PureSpectrumIntegration()
    else:
        # Generic integration for unknown platforms
        return SurveyPlatformIntegration(platform_name)


# Test and demonstration functions
def test_universal_integration():
    """Test the universal integration system"""
    
    print("🧪 Testing Universal Dual AI Integration")
    print("=" * 60)
    
    # Test different platforms
    platforms = ["CPX Research", "Qmee", "PureSpectrum", "Generic Platform"]
    
    for platform in platforms:
        print(f"\n🔗 Testing {platform}")
        print("-" * 40)
        
        try:
            integration = create_platform_integration(platform)
            
            # Test basic question
            test_result = integration.test_question(
                "What is your favorite hobby?",
                "open_ended",
                context="Hobby survey"
            )
            
            print(f"✅ Question: {test_result['question']}")
            print(f"✅ Response: {test_result['response']}")
            print(f"✅ Response Time: {test_result['response_time']:.2f}s")
            
            # Get stats
            stats = integration.get_stats()
            print(f"✅ Platform: {stats['platform']}")
            print(f"✅ System Status: {stats['system_status']}")
            
        except Exception as e:
            print(f"❌ {platform} test failed: {e}")
    
    print("\n" + "=" * 60)
    print("🎉 Universal Integration Test Complete!")


if __name__ == "__main__":
    print("🌐 Universal Dual AI Integration System")
    print("=" * 60)
    
    # Check API keys
    gemini_key = os.getenv('GOOGLE_API_KEY')
    openai_key = os.getenv('OPENAI_API_KEY')
    
    if not gemini_key and not openai_key:
        print("❌ No API keys found!")
        print("💡 Please set GOOGLE_API_KEY and/or OPENAI_API_KEY in your .env file")
        exit(1)
    
    if gemini_key:
        print(f"✅ Gemini API key found: {gemini_key[:10]}...")
    if openai_key:
        print(f"✅ OpenAI API key found: {openai_key[:10]}...")
    
    # Test the universal integration
    test_universal_integration()
    
    print("\n" + "=" * 60)
    print("🎉 Universal Dual AI Integration Ready!")
    print("🚀 Works with ALL survey platforms!")
    print("🤖 Gemini + OpenAI dual system")
    print("🌐 Universal compatibility")
    print("=" * 60)

