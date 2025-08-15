#!/usr/bin/env python3
"""
Universal AI Integration for ALL Survey Sites
Uses your Google API key to provide AI-powered responses on any survey platform
"""

import os
import json
import requests
from typing import Dict, List, Optional, Any
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(Path(__file__).parent.parent / '.env')


class UniversalAIIntegration:
    """
    Universal AI integration that works with ANY survey site
    
    Features:
    - AI-powered question answering using Gemini
    - Universal persona management
    - Cross-platform knowledge sharing
    - Automatic response generation
    - Works with any survey platform
    """
    
    def __init__(self, api_key: str = None):
        """
        Initialize universal AI integration
        
        Args:
            api_key: Google API key (will auto-detect from .env if not provided)
        """
        self.api_key = api_key or os.getenv('GOOGLE_API_KEY')
        self.model = os.getenv('AI_MODEL', 'gemini-1.5-flash-latest')
        self.base_url = "https://generativelanguage.googleapis.com/v1beta"
        
        if not self.api_key:
            raise ValueError("Google API key not found. Set GOOGLE_API_KEY in .env file")
        
        print(f"🚀 Universal AI Integration initialized")
        print(f"   Model: {self.model}")
        print(f"   API Key: {self.api_key[:10]}...")
        print(f"   Status: Ready for ALL survey platforms! 🌐")
    
    def generate_ai_response(self, question: str, context: str = "", platform: str = "unknown") -> str:
        """
        Generate AI-powered response for any survey question
        
        Args:
            question: The survey question
            context: Additional context about the question
            platform: Survey platform name (e.g., 'cpx', 'qmee', 'purespectrum')
        
        Returns:
            AI-generated response
        """
        try:
            # Build the prompt with context
            prompt = self._build_ai_prompt(question, context, platform)
            
            # Call Gemini API
            response = self._call_gemini_api(prompt)
            
            if response:
                print(f"🧠 AI Response generated for {platform}: {response[:100]}...")
                return response
            else:
                print(f"⚠️  AI generation failed, using fallback for {platform}")
                return self._generate_fallback_response(question, platform)
                
        except Exception as e:
            print(f"❌ AI generation error: {e}")
            return self._generate_fallback_response(question, platform)
    
    def _build_ai_prompt(self, question: str, context: str, platform: str) -> str:
        """Build an intelligent prompt for the AI"""
        
        base_prompt = f"""
You are a survey respondent participating in a survey on {platform}. 
Your task is to provide a natural, human-like response to the following question.

Question: {question}

Additional Context: {context if context else 'No additional context provided'}

Instructions:
1. Answer naturally and conversationally
2. Be consistent with typical survey responses
3. Avoid overly formal or robotic language
4. Keep responses appropriate in length (1-3 sentences for most questions)
5. If it's a demographic question, provide realistic information
6. If it's an opinion question, provide thoughtful but not extreme views

Please provide your response:
"""
        
        return base_prompt.strip()
    
    def _call_gemini_api(self, prompt: str) -> Optional[str]:
        """Call the Gemini API to generate a response"""
        
        url = f"{self.base_url}/models/{self.model}:generateContent?key={self.api_key}"
        
        data = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "temperature": 0.7,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 500
            }
        }
        
        try:
            response = requests.post(url, json=data, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                if 'candidates' in result and result['candidates']:
                    content = result['candidates'][0].get('content', {})
                    parts = content.get('parts', [])
                    if parts:
                        return parts[0].get('text', '').strip()
            
            print(f"⚠️  API response error: {response.status_code}")
            return None
            
        except Exception as e:
            print(f"❌ API call error: {e}")
            return None
    
    def _generate_fallback_response(self, question: str, platform: str) -> str:
        """Generate a fallback response if AI fails"""
        
        question_lower = question.lower()
        
        # Common fallback responses for different question types
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
        
        else:
            return "I would prefer not to answer that question at this time."
    
    def get_ai_stats(self) -> Dict[str, Any]:
        """Get statistics about AI usage"""
        return {
            "api_key": f"{self.api_key[:10]}..." if self.api_key else "Not set",
            "model": self.model,
            "base_url": self.base_url,
            "status": "Ready" if self.api_key else "Not configured"
        }


class SurveyPlatformAI:
    """AI integration wrapper for specific survey platforms"""
    
    def __init__(self, platform_name: str, api_key: str = None):
        """
        Initialize AI integration for a specific survey platform
        
        Args:
            platform_name: Name of the survey platform
            api_key: Google API key
        """
        self.platform_name = platform_name
        self.ai = UniversalAIIntegration(api_key)
        self.response_cache = {}
        
        print(f"🤖 AI Integration ready for {platform_name}")
    
    def answer_question(self, question: str, question_type: str, options: List[Dict] = None, context: str = "") -> Any:
        """
        Answer a survey question using AI
        
        Args:
            question: The survey question
            question_type: Type of question (single_punch, multi_punch, open_ended, etc.)
            options: Available options for multiple choice questions
            context: Additional context
        
        Returns:
            AI-generated answer or selected option
        """
        
        # For open-ended questions, use AI generation
        if question_type in ['open_ended', 'int_open_ended']:
            ai_response = self.ai.generate_ai_response(question, context, self.platform_name)
            self.response_cache[question] = ai_response
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
            ai_selection = self.ai._call_gemini_api(selection_prompt)
            if ai_selection:
                # Parse AI selection and return corresponding options
                return self._parse_ai_selection(ai_selection, options)
        except:
            pass
        
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
        import re
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
        """Get statistics for this platform"""
        return {
            "platform": self.platform_name,
            "ai_status": self.ai.get_ai_stats(),
            "cached_responses": len(self.response_cache),
            "status": "Ready"
        }


# Example usage for different survey platforms
def demo_universal_ai():
    """Demonstrate universal AI integration across different platforms"""
    
    print("🚀 Universal AI Integration Demo")
    print("=" * 50)
    
    # Test with different survey platforms
    platforms = ['cpx', 'qmee', 'purespectrum', 'prolific', 'surveyjunkie']
    
    for platform in platforms:
        print(f"\n🤖 Testing {platform.upper()} platform...")
        
        try:
            # Initialize AI integration for this platform
            platform_ai = SurveyPlatformAI(platform)
            
            # Test different question types
            test_questions = [
                ("What is your favorite hobby?", "open_ended", [], "Hobby survey"),
                ("How would you describe your political views?", "single_punch", [
                    {"text": "Very Liberal", "value": "very_liberal"},
                    {"text": "Liberal", "value": "liberal"},
                    {"text": "Moderate", "value": "moderate"},
                    {"text": "Conservative", "value": "conservative"},
                    {"text": "Very Conservative", "value": "very_conservative"}
                ], "Political survey"),
                ("What type of device do you use most?", "single_punch", [
                    {"text": "Desktop Computer", "value": "desktop"},
                    {"text": "Laptop", "value": "laptop"},
                    {"text": "Mobile Phone", "value": "mobile"},
                    {"text": "Tablet", "value": "tablet"}
                ], "Technology survey")
            ]
            
            for question, q_type, options, context in test_questions:
                print(f"  Question: {question[:40]}...")
                answer = platform_ai.answer_question(question, q_type, options, context)
                
                if isinstance(answer, dict):
                    print(f"    Answer: {answer.get('text', answer)}")
                elif isinstance(answer, list):
                    print(f"    Answer: {[opt.get('text', opt) for opt in answer]}")
                else:
                    print(f"    Answer: {answer}")
            
            # Show platform stats
            stats = platform_ai.get_platform_stats()
            print(f"  Status: {stats['status']}")
            print(f"  Cached Responses: {stats['cached_responses']}")
            
        except Exception as e:
            print(f"  ❌ Error with {platform}: {e}")
    
    print("\n" + "=" * 50)
    print("✅ Universal AI Integration working across all platforms!")
    print("🌐 Your Google API key now powers AI responses on ANY survey site!")


if __name__ == "__main__":
    print("🚀 Universal AI Integration for ALL Survey Sites")
    print("=" * 60)
    
    # Check if API key is available
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        print("❌ GOOGLE_API_KEY not found in environment variables")
        print("💡 Set it in your .env file first")
        exit(1)
    
    print(f"✅ Google API key found: {api_key[:10]}...")
    print("🚀 Ready to provide AI-powered responses on ANY survey platform!")
    
    # Run the demo
    demo_universal_ai()
    
    print("\n" + "=" * 60)
    print("🎉 Universal AI Integration Complete!")
    print("📱 Your bot now has AI superpowers on ALL survey sites!")
    print("🧠 Every question gets intelligent, human-like responses!")
    print("🌐 Works with: CPX, Qmee, PureSpectrum, Prolific, SurveyJunkie, and ANY new site!")
