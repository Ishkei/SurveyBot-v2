#!/usr/bin/env python3
"""
Improved Universal AI Integration for ALL Survey Sites
Uses the official Google Generative AI library for reliable, high-quality responses
"""

import os
import json
import google.generativeai as genai
from typing import Dict, List, Optional, Any
from pathlib import Path
from dotenv import load_dotenv
import time
import re

# Load environment variables from .env file
load_dotenv(Path(__file__).parent.parent / '.env')


class ImprovedAIIntegration:
    """
    Improved AI integration using official Google Generative AI library
    
    Features:
    - Reliable API connection with proper error handling
    - Clean response formatting (no unwanted dashes)
    - Retry mechanism for failed requests
    - Better response quality and consistency
    - Works with any survey platform
    """
    
    def __init__(self, api_key: str = None):
        """
        Initialize improved AI integration
        
        Args:
            api_key: Google API key (will auto-detect from .env if not provided)
        """
        self.api_key = api_key or os.getenv('GOOGLE_API_KEY')
        
        if not self.api_key:
            raise ValueError("Google API key not found. Set GOOGLE_API_KEY in .env file")
        
        # Configure the Google Generative AI library
        genai.configure(api_key=self.api_key)
        
        # Initialize the model
        try:
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            print(f"🚀 Improved AI Integration initialized")
            print(f"   Model: gemini-1.5-flash")
            print(f"   API Key: {self.api_key[:10]}...")
            print(f"   Status: Ready for ALL survey platforms! 🌐")
        except Exception as e:
            print(f"❌ Error initializing model: {e}")
            raise
    
    def generate_ai_response(self, question: str, context: str = "", platform: str = "unknown", max_retries: int = 3) -> str:
        """
        Generate AI-powered response with retry mechanism and clean formatting
        
        Args:
            question: The survey question
            context: Additional context about the question
            platform: Survey platform name
            max_retries: Maximum number of retry attempts
        
        Returns:
            Clean, AI-generated response
        """
        
        for attempt in range(max_retries):
            try:
                # Build the prompt
                prompt = self._build_improved_prompt(question, context, platform)
                
                # Generate response with safety settings
                response = self.model.generate_content(
                    prompt,
                    generation_config=genai.types.GenerationConfig(
                        temperature=0.7,
                        top_k=40,
                        top_p=0.95,
                        max_output_tokens=500,
                        candidate_count=1
                    ),
                    safety_settings=[
                        {
                            "category": "HARM_CATEGORY_HARASSMENT",
                            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            "category": "HARM_CATEGORY_HATE_SPEECH",
                            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                )
                
                if response and response.text:
                    # Clean the response
                    clean_response = self._clean_response(response.text)
                    print(f"🧠 AI Response generated for {platform}: {clean_response[:100]}...")
                    return clean_response
                else:
                    print(f"⚠️  Empty response from AI on attempt {attempt + 1}")
                    
            except Exception as e:
                print(f"⚠️  AI generation attempt {attempt + 1} failed: {e}")
                if attempt < max_retries - 1:
                    print(f"   Retrying in {2 ** attempt} seconds...")
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    print(f"   All retry attempts failed, using fallback")
        
        # If all attempts failed, use fallback
        return self._generate_improved_fallback(question, platform)
    
    def _build_improved_prompt(self, question: str, context: str, platform: str) -> str:
        """Build an improved prompt for better AI responses"""
        
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
        
        return prompt.strip()
    
    def _clean_response(self, response: str) -> str:
        """Clean the AI response to remove unwanted formatting"""
        
        # Remove unwanted dashes and clean up formatting
        cleaned = response.strip()
        
        # Remove em dashes and en dashes
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
    
    def _generate_improved_fallback(self, question: str, platform: str) -> str:
        """Generate improved fallback responses without dashes"""
        
        question_lower = question.lower()
        
        # Improved fallback responses (no dashes)
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
        
        else:
            return "I would prefer not to answer that question at this time."
    
    def test_connection(self) -> bool:
        """Test the API connection"""
        try:
            test_response = self.model.generate_content("Hello, this is a test message.")
            if test_response and test_response.text:
                print("✅ API connection test successful")
                return True
            else:
                print("❌ API connection test failed: Empty response")
                return False
        except Exception as e:
            print(f"❌ API connection test failed: {e}")
            return False
    
    def get_ai_stats(self) -> Dict[str, Any]:
        """Get statistics about AI usage"""
        return {
            "api_key": f"{self.api_key[:10]}..." if self.api_key else "Not set",
            "model": "gemini-1.5-flash",
            "library": "google-generativeai",
            "status": "Ready" if self.api_key else "Not configured"
        }


class ImprovedSurveyPlatformAI:
    """Improved AI integration wrapper for specific survey platforms"""
    
    def __init__(self, platform_name: str, api_key: str = None):
        """
        Initialize improved AI integration for a specific survey platform
        
        Args:
            platform_name: Name of the survey platform
            api_key: Google API key
        """
        self.platform_name = platform_name
        self.ai = ImprovedAIIntegration(api_key)
        self.response_cache = {}
        self.success_count = 0
        self.fallback_count = 0
        
        print(f"🤖 Improved AI Integration ready for {platform_name}")
        
        # Test connection
        if self.ai.test_connection():
            print(f"✅ {platform_name} AI connection verified")
        else:
            print(f"⚠️  {platform_name} AI connection issues detected")
    
    def answer_question(self, question: str, question_type: str, options: List[Dict] = None, context: str = "") -> Any:
        """
        Answer a survey question using improved AI
        
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
            ai_response = self.ai.generate_ai_response(question, context, self.platform_name)
            self.response_cache[question] = ai_response
            self.success_count += 1
            return ai_response
        
        # For multiple choice, use AI to select best option
        elif question_type in ['single_punch', 'multi_punch']:
            if options:
                return self._ai_select_option(question, options, context)
            else:
                return self.ai.generate_ai_response(question, context, self.platform_name)
        
        # Fallback for unknown question types
        else:
            return self.ai.generate_ai_response(question, context, self.platform_name)
    
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
            ai_selection = self.ai.model.generate_content(selection_prompt)
            if ai_selection and ai_selection.text:
                # Parse AI selection and return corresponding options
                return self._parse_ai_selection(ai_selection.text, options)
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
            "ai_status": self.ai.get_ai_stats(),
            "cached_responses": len(self.response_cache),
            "success_count": self.success_count,
            "fallback_count": self.fallback_count,
            "success_rate": f"{(self.success_count / max(self.success_count + self.fallback_count, 1)) * 100:.1f}%" if (self.success_count + self.fallback_count) > 0 else "0%",
            "status": "Ready"
        }


# Test the improved integration
def test_improved_ai():
    """Test the improved AI integration"""
    
    print("🧪 Testing Improved AI Integration")
    print("=" * 50)
    
    try:
        # Test basic AI integration
        ai = ImprovedAIIntegration()
        
        # Test connection
        if ai.test_connection():
            print("✅ API connection successful")
            
            # Test response generation
            test_question = "What is your favorite hobby?"
            response = ai.generate_ai_response(test_question, "Hobby survey", "test_platform")
            print(f"✅ Test response: {response}")
            
            # Test response cleaning
            print(f"✅ Response length: {len(response)} characters")
            print(f"✅ Contains dashes: {'–' in response or '—' in response or '-' in response}")
            
        else:
            print("❌ API connection failed")
            
    except Exception as e:
        print(f"❌ Test failed: {e}")


if __name__ == "__main__":
    print("🚀 Improved Universal AI Integration")
    print("=" * 50)
    
    # Check if API key is available
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        print("❌ GOOGLE_API_KEY not found in environment variables")
        print("💡 Set it in your .env file first")
        exit(1)
    
    print(f"✅ Google API key found: {api_key[:10]}...")
    
    # Test the improved integration
    test_improved_ai()
    
    print("\n" + "=" * 50)
    print("🎉 Improved AI Integration Ready!")
    print("🔧 Uses official Google Generative AI library")
    print("✅ Better error handling and retry mechanism")
    print("🧹 Clean response formatting (no unwanted dashes)")
    print("🌐 Works with ALL survey platforms!")
