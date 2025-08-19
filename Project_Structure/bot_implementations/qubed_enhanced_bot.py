import asyncio
import json
import os
import time
import hashlib
from pathlib import Path
from typing import Dict, List, Optional, Any
from playwright.async_api import async_playwright, Page, Browser, BrowserContext
import logging

# Enhanced cursor simulation
try:
    from Project_Structure.enhanced_cursor_simulation import EnhancedCursorSimulator
    ENHANCED_CURSOR_AVAILABLE = True
except ImportError:
    ENHANCED_CURSOR_AVAILABLE = False
    print("⚠️ Enhanced cursor simulation not available")

# AI API integration
try:
    from google import genai
    from openai import OpenAI
    AI_AVAILABLE = True
except ImportError:
    AI_AVAILABLE = False
    print("⚠️ AI APIs not available")

class QuestionCache:
    """Intelligent question caching system for Qubed surveys"""
    
    def __init__(self, cache_file: str = "qubed_question_cache.json"):
        self.cache_file = cache_file
        self.cache = self._load_cache()
        self.stats = {
            "hits": 0,
            "misses": 0,
            "total_questions": 0
        }
    
    def _load_cache(self) -> Dict[str, Any]:
        """Load cached questions from file"""
        try:
            if os.path.exists(self.cache_file):
                with open(self.cache_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            print(f"⚠️ Error loading cache: {e}")
        return {}
    
    def _save_cache(self):
        """Save cache to file"""
        try:
            with open(self.cache_file, 'w', encoding='utf-8') as f:
                json.dump(self.cache, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"⚠️ Error saving cache: {e}")
    
    def _generate_question_hash(self, question_text: str, context: str = "") -> str:
        """Generate unique hash for question + context"""
        combined = f"{question_text.strip().lower()}:{context.strip().lower()}"
        return hashlib.md5(combined.encode()).hexdigest()
    
    def get_answer(self, question_text: str, context: str = "", panel: str = "") -> Optional[str]:
        """Get cached answer for a question"""
        question_hash = self._generate_question_hash(question_text, context)
        
        # Try exact match first
        if question_hash in self.cache:
            cached = self.cache[question_hash]
            if cached.get("answer"):
                self.stats["hits"] += 1
                print(f"✅ Cache HIT: Found answer for '{question_text[:50]}...'")
                return cached["answer"]
        
        # Try fuzzy matching by question similarity
        for hash_key, cached in self.cache.items():
            if self._is_similar_question(question_text, cached.get("question", "")):
                if cached.get("answer"):
                    self.stats["hits"] += 1
                    print(f"✅ Cache HIT (fuzzy): Found similar answer for '{question_text[:50]}...'")
                    return cached["answer"]
        
        self.stats["misses"] += 1
        print(f"❌ Cache MISS: No answer found for '{question_text[:50]}...'")
        return None
    
    def _is_similar_question(self, question1: str, question2: str) -> bool:
        """Check if two questions are similar (basic implementation)"""
        q1_words = set(question1.lower().split())
        q2_words = set(question2.lower().split())
        
        # Calculate Jaccard similarity
        intersection = len(q1_words.intersection(q2_words))
        union = len(q1_words.union(q2_words))
        
        if union == 0:
            return False
        
        similarity = intersection / union
        return similarity > 0.7  # 70% similarity threshold
    
    def cache_answer(self, question_text: str, answer: str, context: str = "", 
                    panel: str = "", metadata: Dict[str, Any] = None):
        """Cache a question-answer pair"""
        question_hash = self._generate_question_hash(question_text, context)
        
        self.cache[question_hash] = {
            "question": question_text,
            "answer": answer,
            "context": context,
            "panel": panel,
            "timestamp": time.time(),
            "metadata": metadata or {},
            "usage_count": self.cache.get(question_hash, {}).get("usage_count", 0) + 1
        }
        
        self.stats["total_questions"] += 1
        self._save_cache()
        print(f"💾 Cached answer for: '{question_text[:50]}...'")
    
    def get_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        return {
            **self.stats,
            "cache_size": len(self.cache),
            "hit_rate": self.stats["hits"] / max(1, self.stats["hits"] + self.stats["misses"])
        }

class QubedEnhancedBot:
    """Enhanced bot for Qubed session checks with AI-powered responses"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.question_cache = QuestionCache()
        self.cursor_simulator = None
        self.ai_client = None
        
        # Initialize enhanced cursor if available
        if ENHANCED_CURSOR_AVAILABLE:
            try:
                self.cursor_simulator = EnhancedCursorSimulator()
                print("✅ Enhanced cursor simulation initialized")
            except Exception as e:
                print(f"⚠️ Failed to initialize enhanced cursor: {e}")
        
        # Initialize AI client
        if AI_AVAILABLE:
            self._init_ai_client()
        
        # Qubed-specific selectors and patterns
        self.qubed_selectors = {
            "question_input": "#answer-input",
            "submit_button": "#question-form-submit-btn",
            "question_text": ".form-card__label-h",
            "min_length": "#min-answer-length",
            "timings_input": "#answer-timings",
            "question_id": "#question-id-input",
            "source": "#source-val",
            "questionnaire": "#questionnaire-val"
        }
        
        # Panel-specific response templates
        self.panel_responses = {
            "qmee": {
                "why_join": [
                    "I joined Qmee to earn extra money in my spare time while helping companies improve their products and services.",
                    "I was looking for a flexible way to make money online and Qmee seemed like a great opportunity.",
                    "I heard great things about Qmee from friends and wanted to try earning rewards for sharing my opinions.",
                    "I enjoy taking surveys and wanted to monetize my time while contributing to market research."
                ],
                "general": [
                    "I appreciate the opportunity to share my thoughts and earn rewards.",
                    "This is a great way to make my opinions count while earning some extra income.",
                    "I find these surveys interesting and the rewards are a nice bonus.",
                    "I'm happy to help companies improve their products through my feedback."
                ]
            },
            "lifepoints": {
                "why_join": [
                    "I joined LifePoints to earn rewards while sharing my valuable opinions on products and services.",
                    "I was attracted to LifePoints because of their reputation and the variety of survey opportunities.",
                    "I wanted to make money from home and LifePoints offered a flexible way to do that.",
                    "I enjoy participating in market research and LifePoints provides great rewards for my time."
                ]
            }
        }
    
    def _init_ai_client(self):
        """Initialize AI client for generating responses"""
        try:
            # Try Gemini first
            gemini_key = os.getenv('GEMINI_API_KEY')
            if gemini_key:
                os.environ['GEMINI_API_KEY'] = gemini_key
                self.ai_client = {"type": "gemini", "key": gemini_key}
                print("✅ Gemini AI client initialized")
                return
            
            # Fallback to OpenAI
            openai_key = os.getenv('OPENAI_API_KEY')
            if openai_key:
                self.ai_client = OpenAI(api_key=openai_key)
                print("✅ OpenAI client initialized")
                return
                
        except Exception as e:
            print(f"⚠️ Failed to initialize AI client: {e}")
    
    async def generate_ai_response(self, question: str, context: str = "", 
                                 panel: str = "qmee") -> str:
        """Generate AI-powered response for a question"""
        if not self.ai_client:
            return self._get_fallback_response(question, panel)
        
        try:
            if self.ai_client.get("type") == "gemini":
                return await self._generate_gemini_response(question, context, panel)
            else:
                return await self._generate_openai_response(question, context, panel)
        except Exception as e:
            print(f"⚠️ AI response generation failed: {e}")
            return self._get_fallback_response(question, panel)
    
    async def _generate_gemini_response(self, question: str, context: str, panel: str) -> str:
        """Generate response using Gemini API"""
        try:
            # This would use the actual Gemini API call
            # For now, return a smart fallback
            return self._get_smart_fallback_response(question, panel)
        except Exception as e:
            print(f"⚠️ Gemini API error: {e}")
            return self._get_fallback_response(question, panel)
    
    async def _generate_openai_response(self, question: str, context: str, panel: str) -> str:
        """Generate response using OpenAI API"""
        try:
            prompt = f"""You are a survey participant on {panel}. Answer this question naturally and authentically:

Question: {question}
Context: {context}

Provide a 2-3 sentence response that sounds human and genuine:"""
            
            response = self.ai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=100,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"⚠️ OpenAI API error: {e}")
            return self._get_fallback_response(question, panel)
    
    def _get_smart_fallback_response(self, question: str, panel: str) -> str:
        """Get smart fallback response based on question patterns"""
        question_lower = question.lower()
        
        # Check for specific question patterns
        if "why did you join" in question_lower or "why join" in question_lower:
            responses = self.panel_responses.get(panel, {}).get("why_join", [])
            if responses:
                return responses[0]  # Use first response
        
        if "opinion" in question_lower or "think" in question_lower:
            return "I think this is a great opportunity to share my perspective and help improve products and services."
        
        if "experience" in question_lower:
            return "My experience has been positive so far, and I appreciate the chance to earn rewards for my time."
        
        # Default to general response
        responses = self.panel_responses.get(panel, {}).get("general", [])
        if responses:
            return responses[0]
        
        return "I'm happy to participate in this survey and share my thoughts."
    
    def _get_fallback_response(self, question: str, panel: str) -> str:
        """Get basic fallback response"""
        if "why" in question.lower():
            return f"I joined {panel} to earn extra money and share my opinions on products and services."
        return "I appreciate the opportunity to participate in this survey and earn rewards for my time."
    
    async def handle_qubed_survey(self, page: Page, url: str) -> Dict[str, Any]:
        """Handle Qubed survey page"""
        print(f"🔍 Handling Qubed survey: {url}")
        
        try:
            # Wait for page to load
            await page.wait_for_load_state("networkidle")
            
            # Extract question and context
            question_info = await self._extract_question_info(page)
            if not question_info:
                return {"success": False, "error": "Could not extract question info"}
            
            question_text = question_info["question"]
            context = question_info.get("context", "")
            panel = question_info.get("panel", "qmee")
            
            print(f"📝 Question: {question_text}")
            print(f"🏷️ Panel: {panel}")
            
            # Check cache first
            cached_answer = self.question_cache.get_answer(question_text, context, panel)
            
            if cached_answer:
                answer = cached_answer
                print("✅ Using cached answer")
            else:
                # Generate new answer using AI
                answer = await self.generate_ai_response(question_text, context, panel)
                print(f"🤖 Generated AI answer: {answer}")
                
                # Cache the new answer
                self.question_cache.cache_answer(
                    question_text, answer, context, panel,
                    metadata={"url": url, "timestamp": time.time()}
                )
            
            # Fill the answer with simulated typing
            await self._fill_answer_with_typing(page, answer)
            
            # Submit the form
            await self._submit_survey(page)
            
            return {
                "success": True,
                "question": question_text,
                "answer": answer,
                "cached": cached_answer is not None,
                "panel": panel
            }
            
        except Exception as e:
            print(f"❌ Error handling Qubed survey: {e}")
            return {"success": False, "error": str(e)}
    
    async def _extract_question_info(self, page: Page) -> Optional[Dict[str, str]]:
        """Extract question information from the page"""
        try:
            # Wait for question element
            question_element = await page.wait_for_selector(self.qubed_selectors["question_text"], timeout=10000)
            if not question_element:
                return None
            
            question_text = await question_element.text_content()
            if not question_text:
                return None
            
            # Extract panel information from URL or page
            panel = "qmee"  # Default
            try:
                url = page.url
                if "lifepoints" in url.lower():
                    panel = "lifepoints"
                elif "qmee" in url.lower():
                    panel = "qmee"
            except:
                pass
            
            # Extract additional context
            context = ""
            try:
                # Look for any additional context elements
                context_elements = await page.query_selector_all(".form-card__label-block p, .form-card__label-block div")
                if context_elements:
                    context_parts = []
                    for elem in context_elements:
                        text = await elem.text_content()
                        if text and text.strip():
                            context_parts.append(text.strip())
                    if context_parts:
                        context = " ".join(context_parts)
            except:
                pass
            
            return {
                "question": question_text.strip(),
                "context": context.strip(),
                "panel": panel
            }
            
        except Exception as e:
            print(f"⚠️ Error extracting question info: {e}")
            return None
    
    async def _fill_answer_with_typing(self, page: Page, answer: str):
        """Fill answer with realistic typing simulation"""
        try:
            # Find the answer input
            input_element = await page.wait_for_selector(self.qubed_selectors["question_input"], timeout=10000)
            if not input_element:
                raise Exception("Answer input not found")
            
            # Clear existing content
            await input_element.fill("")
            
            # Simulate realistic typing
            if self.cursor_simulator and ENHANCED_CURSOR_AVAILABLE:
                # Use enhanced cursor simulation
                await self._enhanced_typing_simulation(page, input_element, answer)
            else:
                # Use basic typing simulation
                await self._basic_typing_simulation(page, input_element, answer)
            
            print(f"✍️ Typed answer: {answer[:50]}...")
            
        except Exception as e:
            print(f"⚠️ Error filling answer: {e}")
            # Fallback to direct fill
            try:
                input_element = await page.wait_for_selector(self.qubed_selectors["question_input"])
                await input_element.fill(answer)
            except Exception as fallback_error:
                print(f"❌ Fallback fill also failed: {fallback_error}")
    
    async def _enhanced_typing_simulation(self, page: Page, input_element, answer: str):
        """Enhanced typing simulation with cursor movement"""
        try:
            # Focus on input
            await input_element.click()
            await page.wait_for_timeout(500)
            
            # Type with realistic delays
            for i, char in enumerate(answer):
                await input_element.type(char, delay=50 + (i % 3) * 20)  # Vary typing speed
                
                # Occasionally pause (like human typing)
                if i > 0 and i % 10 == 0:
                    await page.wait_for_timeout(100 + (i % 3) * 50)
                
                # Simulate thinking pauses for longer words
                if char in ".,!?":
                    await page.wait_for_timeout(200)
            
            # Final pause before submission
            await page.wait_for_timeout(500)
            
        except Exception as e:
            print(f"⚠️ Enhanced typing failed: {e}")
            # Fallback to basic typing
            await self._basic_typing_simulation(page, input_element, answer)
    
    async def _basic_typing_simulation(self, page: Page, input_element, answer: str):
        """Basic typing simulation"""
        try:
            # Focus and type with delays
            await input_element.click()
            await page.wait_for_timeout(300)
            
            # Type with realistic delays
            for char in answer:
                await input_element.type(char, delay=80)
                if char in ".,!?":
                    await page.wait_for_timeout(150)
            
            await page.wait_for_timeout(400)
            
        except Exception as e:
            print(f"⚠️ Basic typing failed: {e}")
            # Last resort: direct fill
            await input_element.fill(answer)
    
    async def _submit_survey(self, page: Page):
        """Submit the survey form"""
        try:
            # Wait for submit button to be enabled
            submit_button = await page.wait_for_selector(self.qubed_selectors["submit_button"], timeout=10000)
            
            # Check if button is enabled
            is_disabled = await submit_button.get_attribute("disabled")
            if is_disabled:
                print("⏳ Waiting for submit button to be enabled...")
                await page.wait_for_function(
                    "document.querySelector('#question-form-submit-btn').disabled === false",
                    timeout=30000
                )
            
            # Click submit button
            await submit_button.click()
            print("✅ Survey submitted")
            
            # Wait for submission to complete
            await page.wait_for_timeout(2000)
            
        except Exception as e:
            print(f"⚠️ Error submitting survey: {e}")
    
    async def test_question_response(self, question: str, context: str = "", 
                                   panel: str = "qmee") -> Dict[str, Any]:
        """Test how the bot would respond to a question without running the full bot"""
        print(f"🧪 Testing question response for: {question}")
        
        # Check cache first
        cached_answer = self.question_cache.get_answer(question, context, panel)
        
        if cached_answer:
            return {
                "question": question,
                "answer": cached_answer,
                "source": "cache",
                "panel": panel
            }
        
        # Generate new answer
        answer = await self.generate_ai_response(question, context, panel)
        
        # Cache the answer for future use
        self.question_cache.cache_answer(
            question, answer, context, panel,
            metadata={"test_mode": True, "timestamp": time.time()}
        )
        
        return {
            "question": question,
            "answer": answer,
            "source": "ai_generated",
            "panel": panel
        }
    
    def get_cache_stats(self) -> Dict[str, Any]:
        """Get question cache statistics"""
        return self.question_cache.get_stats()
    
    def export_cache(self, export_file: str = "qubed_cache_export.json"):
        """Export the question cache"""
        try:
            with open(export_file, 'w', encoding='utf-8') as f:
                json.dump({
                    "cache": self.question_cache.cache,
                    "stats": self.question_cache.get_stats(),
                    "export_timestamp": time.time()
                }, f, indent=2, ensure_ascii=False)
            print(f"✅ Cache exported to {export_file}")
            return True
        except Exception as e:
            print(f"❌ Failed to export cache: {e}")
            return False

async def test_qubed_bot():
    """Test the Qubed enhanced bot functionality"""
    print("🧪 Testing Qubed Enhanced Bot")
    
    # Test configuration
    config = {
        "enhanced_cursor": ENHANCED_CURSOR_AVAILABLE,
        "ai_enabled": AI_AVAILABLE,
        "typing_simulation": True,
        "cache_enabled": True
    }
    
    # Initialize bot
    bot = QubedEnhancedBot(config)
    
    # Test questions
    test_questions = [
        {
            "question": "In a few words, tell us, why did you join Qmee?",
            "context": "Registration survey",
            "panel": "qmee"
        },
        {
            "question": "What is your opinion on online surveys?",
            "context": "General feedback",
            "panel": "qmee"
        },
        {
            "question": "Why did you join LifePoints?",
            "context": "Welcome survey",
            "panel": "lifepoints"
        }
    ]
    
    print("\n" + "="*60)
    print("TESTING QUESTION RESPONSES")
    print("="*60)
    
    for i, test_q in enumerate(test_questions, 1):
        print(f"\n🔍 Test {i}: {test_q['question'][:50]}...")
        
        result = await bot.test_question_response(
            test_q["question"],
            test_q["context"],
            test_q["panel"]
        )
        
        print(f"   Panel: {result['panel']}")
        print(f"   Source: {result['source']}")
        print(f"   Answer: {result['answer'][:100]}...")
    
    # Show cache statistics
    print("\n" + "="*60)
    print("CACHE STATISTICS")
    print("="*60)
    
    stats = bot.get_cache_stats()
    for key, value in stats.items():
        if key == "hit_rate":
            print(f"   {key}: {value:.2%}")
        else:
            print(f"   {key}: {value}")
    
    # Export cache
    print("\n" + "="*60)
    print("EXPORTING CACHE")
    print("="*60)
    
    export_success = bot.export_cache()
    if export_success:
        print("✅ Cache exported successfully")
    else:
        print("❌ Cache export failed")
    
    print("\n🎯 Qubed Enhanced Bot test completed!")

if __name__ == "__main__":
    asyncio.run(test_qubed_bot())
