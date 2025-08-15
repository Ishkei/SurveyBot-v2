#!/usr/bin/env python3
"""
CPX Research Survey Bot with Universal Dual AI Integration
Enhanced with Gemini + OpenAI dual AI system for intelligent responses
"""

import asyncio
import json
import os
import random
import re
import time
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import urlparse
from pathlib import Path

try:
    from playwright.async_api import async_playwright, Page, Browser, BrowserContext
except ImportError:
    print("❌ Playwright not available")
    async_playwright = None

# Import the universal dual AI system
try:
    from universal_dual_ai_integration import CPXIntegration
    DUAL_AI_AVAILABLE = True
except ImportError:
    DUAL_AI_AVAILABLE = False
    CPXIntegration = None

try:
    from enhanced_personality_system import EnhancedPersonalitySystem
    ENHANCED_FEATURES_AVAILABLE = True
except ImportError:
    ENHANCED_FEATURES_AVAILABLE = False
    EnhancedPersonalitySystem = None

try:
    from free_captcha_solver import FreeCaptchaSolver
    CAPTCHA_SOLVER_AVAILABLE = True
except ImportError:
    CAPTCHA_SOLVER_AVAILABLE = False
    FreeCaptchaSolver = None

try:
    from typing_simulation import type_text_naturally, TYPING_PRESETS, TYPING_SIMULATION_AVAILABLE
except ImportError:
    TYPING_SIMULATION_AVAILABLE = False
    type_text_naturally = None
    TYPING_PRESETS = {}

try:
    from vision_utils import VISION_AVAILABLE, OCR_AVAILABLE
except ImportError:
    VISION_AVAILABLE = False
    OCR_AVAILABLE = False

from config import Config
from personality_responses import generate_personality_response, PersonalityResponseGenerator


class QuestionLogger:
    """Enhanced system for logging and reusing survey question answers with dual AI"""
    
    def __init__(self, log_file: str = "cpx_question_log.json"):
        self.log_file = log_file
        self.question_cache = {}
        self.load_question_log()
        
        # Initialize dual AI integration
        if DUAL_AI_AVAILABLE:
            self.dual_ai = CPXIntegration()
            print("🚀 Dual AI integration enabled for question logging")
        else:
            self.dual_ai = None
            print("⚠️  Dual AI not available - using basic logging only")
    
    def load_question_log(self):
        """Load existing question log from file"""
        try:
            if os.path.exists(self.log_file):
                with open(self.log_file, 'r', encoding='utf-8') as f:
                    self.question_cache = json.load(f)
                print(f"✅ Loaded {len(self.question_cache)} cached questions from {self.log_file}")
            else:
                print(f"📝 Creating new question log: {self.log_file}")
        except Exception as e:
            print(f"⚠️ Error loading question log: {e}")
            self.question_cache = {}
    
    def save_question_log(self):
        """Save question log to file"""
        try:
            with open(self.log_file, 'w', encoding='utf-8') as f:
                json.dump(self.question_cache, f, indent=2, ensure_ascii=False)
            print(f"💾 Saved question log with {len(self.question_cache)} questions")
        except Exception as e:
            print(f"❌ Error saving question log: {e}")
    
    def get_cached_answer(self, question_text: str, question_type: str) -> Optional[Any]:
        """Get cached answer for a question if it exists"""
        # Create a normalized key for the question
        normalized_question = self._normalize_question(question_text)
        
        # Check for exact matches first
        if normalized_question in self.question_cache:
            cached = self.question_cache[normalized_question]
            if cached.get('type') == question_type:
                print(f"🎯 Found cached answer for: {question_text[:50]}...")
                return cached.get('answer')
        
        # Check for similar questions using fuzzy matching
        for cached_q, cached_data in self.question_cache.items():
            if self._questions_are_similar(normalized_question, cached_q):
                if cached_data.get('type') == question_type:
                    print(f"🎯 Found similar cached answer for: {question_text[:50]}...")
                    return cached_data.get('answer')
        
        return None
    
    def cache_question_answer(self, question_text: str, question_type: str, answer: Any, context: str = ""):
        """Cache a question and its answer for future use"""
        normalized_question = self._normalize_question(question_text)
        
        self.question_cache[normalized_question] = {
            'original_question': question_text,
            'type': question_type,
            'answer': answer,
            'context': context,
            'timestamp': datetime.now().isoformat(),
            'usage_count': 1
        }
        
        print(f"💾 Cached new question: {question_text[:50]}... (Type: {question_type})")
        self.save_question_log()
    
    def _normalize_question(self, question: str) -> str:
        """Normalize question text for consistent caching"""
        # Remove common variations and normalize
        normalized = question.lower().strip()
        
        # Remove common prefixes/suffixes
        normalized = re.sub(r'^(what is|what\'s|please enter|enter your|select your|choose your|indicate your|specify your)\s+', '', normalized)
        normalized = re.sub(r'\s+(please|required|optional|\.+)$', '', normalized)
        
        # Normalize common variations
        normalized = re.sub(r'\b(age|years old|how old)\b', 'age', normalized)
        normalized = re.sub(r'\b(birth year|year of birth|born|birthdate|date of birth)\b', 'birth_year', normalized)
        normalized = re.sub(r'\b(zip code|postal code|zip)\b', 'zipcode', normalized)
        normalized = re.sub(r'\b(city|town|municipality)\b', 'city', normalized)
        normalized = re.sub(r'\b(state|province|region)\b', 'state', normalized)
        
        return normalized.strip()
    
    def _questions_are_similar(self, q1: str, q2: str) -> bool:
        """Check if two questions are similar enough to use the same answer"""
        # Simple similarity check - can be enhanced with more sophisticated NLP
        words1 = set(q1.split())
        words2 = set(q2.split())
        
        # Check for key demographic terms
        demographic_terms = ['age', 'birth_year', 'zipcode', 'city', 'state', 'income', 'education', 'occupation']
        
        for term in demographic_terms:
            if term in q1 and term in q2:
                return True
        
        # Check word overlap
        common_words = words1.intersection(words2)
        if len(common_words) >= 2:  # At least 2 common words
            return True
        
        return False
    
    def get_question_stats(self) -> Dict[str, Any]:
        """Get statistics about cached questions"""
        stats = {
            'total_questions': len(self.question_cache),
            'by_type': {},
            'recent_questions': [],
            'most_used': []
        }
        
        # Count by type
        for q_data in self.question_cache.values():
            q_type = q_data.get('type', 'unknown')
            stats['by_type'][q_type] = stats['by_type'].get(q_type, 0) + 1
        
        # Get recent questions
        recent = sorted(self.question_cache.items(), 
                       key=lambda x: x[1].get('timestamp', ''), 
                       reverse=True)[:10]
        stats['recent_questions'] = [q[1]['original_question'][:50] + '...' for q in recent]
        
        # Get most used questions
        most_used = sorted(self.question_cache.items(), 
                          key=lambda x: x[1].get('usage_count', 0), 
                          reverse=True)[:10]
        stats['most_used'] = [f"{q[1]['original_question'][:50]}... (used {q[1].get('usage_count', 0)} times)" for q in most_used]
        
        return stats


class CPXResearchBotDualAI:
    """
    Enhanced CPX Research survey bot with Universal Dual AI Integration
    
    Features:
    - Gemini + OpenAI dual AI system
    - Intelligent question answering
    - Enhanced question logging and caching
    - Platform-specific optimization
    - Automatic failover and fallbacks
    """
    
    def __init__(self, app_id: str = None, ext_user_id: str = None):
        self.app_id = app_id or Config.CPX_APP_ID
        self.ext_user_id = ext_user_id or Config.CPX_EXT_USER_ID
        self.base_url = "https://offers.cpx-research.com"
        self.api_base = "https://live-api.cpx-research.com/api"
        
        # Initialize dual AI system
        if DUAL_AI_AVAILABLE:
            self.dual_ai = CPXIntegration()
            print("🚀 Dual AI system initialized for CPX Research")
        else:
            self.dual_ai = None
            print("⚠️  Dual AI not available - using basic responses")
        
        # Initialize question logger
        self.question_logger = QuestionLogger("cpx_question_log.json")
        
        # Load persona and configuration
        self.persona = self._load_persona()
        self.cpx_config = self._load_cpx_config()
        
        # Initialize other systems
        self._initialize_systems()
        
        print(f"🤖 CPX Research Bot with Dual AI initialized")
    
    def _load_persona(self) -> Dict[str, Any]:
        """Load persona data"""
        try:
            persona_file = "persona.json"
            if os.path.exists(persona_file):
                with open(persona_file, 'r', encoding='utf-8') as f:
                    persona = json.load(f)
                print(f"✅ Loaded persona: {persona.get('name', 'Unknown')}")
                return persona
            else:
                print("📝 No persona file found - using defaults")
                return {}
        except Exception as e:
            print(f"⚠️ Error loading persona: {e}")
            return {}
    
    def _load_cpx_config(self) -> Dict[str, Any]:
        """Load CPX-specific configuration"""
        try:
            config_file = "cpx_config.json"
            if os.path.exists(config_file):
                with open(config_file, 'r', encoding='utf-8') as f:
                    config = json.load(f)
                print("✅ Loaded CPX configuration")
                return config
            else:
                print("📝 No CPX config found - using defaults")
                return self._get_default_cpx_config()
        except Exception as e:
            print(f"⚠️ Error loading CPX config: {e}")
            return self._get_default_cpx_config()
    
    def _get_default_cpx_config(self) -> Dict[str, Any]:
        """Get default CPX configuration"""
        return {
            "personality_responses": {
                "default_text_responses": [
                    "I find this topic quite interesting and would like to share my perspective.",
                    "Based on my experience, I think this is an important consideration.",
                    "I have some thoughts on this that I'd like to express.",
                    "This is something I've thought about before and I have a few ideas.",
                    "I believe this is worth discussing and I'd like to contribute my viewpoint."
                ],
                "best_experience_responses": [
                    "One of the best experiences in my life was when I achieved a major goal I had been working toward.",
                    "I had an amazing experience traveling to a new place and learning about different cultures.",
                    "One of my best experiences was helping someone in need and seeing the positive impact.",
                    "I had a wonderful experience when I learned a new skill that I never thought I could master.",
                    "One of my best experiences was spending quality time with family and creating lasting memories."
                ]
            },
            "smart_defaults": {
                "device_type": "Desktop",
                "political_views": "Moderate",
                "industry": "Technology",
                "income_range": "$60,000-$79,999",
                "education_level": "Bachelor's degree"
            }
        }
    
    def _initialize_systems(self):
        """Initialize additional systems"""
        # Initialize enhanced personality system if available
        if ENHANCED_FEATURES_AVAILABLE:
            try:
                self.personality_system = EnhancedPersonalitySystem()
                print("✅ Enhanced personality system initialized")
            except Exception as e:
                print(f"⚠️ Enhanced personality system failed: {e}")
                self.personality_system = None
        else:
            self.personality_system = None
        
        # Initialize captcha solver if available
        if CAPTCHA_SOLVER_AVAILABLE:
            try:
                self.captcha_solver = FreeCaptchaSolver()
                print("✅ Captcha solver initialized")
            except Exception as e:
                print(f"⚠️ Captcha solver failed: {e}")
                self.captcha_solver = None
        else:
            self.captcha_solver = None
    
    async def handle_text_question(self, question: str, info: str) -> bool:
        """Handle open-ended text questions using dual AI system"""
        try:
            # Find visible text input or textarea
            text_input = await self._find_text_input()
            if not text_input:
                print("❌ No visible text input found")
                return False
            
            # Check for cached answer first
            cached_answer = self.question_logger.get_cached_answer(question, 'open_ended')
            if cached_answer:
                response_text = cached_answer
                print(f"💬 Using cached response: {response_text[:100]}...")
            else:
                # Generate new response using dual AI
                response_text = await self._generate_text_response_dual_ai(question, info)
                if response_text:
                    print(f"💬 Generated dual AI response: {response_text[:100]}...")
                    # Cache the question and answer
                    self.question_logger.cache_question_answer(question, 'open_ended', response_text, info)
                else:
                    print("❌ Failed to generate response")
                    return False
            
            # Type the response
            return await self._type_text_response(text_input, response_text)
            
        except Exception as e:
            print(f"❌ Error handling text question: {e}")
            return False
    
    async def _generate_text_response_dual_ai(self, question: str, info: str) -> Optional[str]:
        """Generate text response using dual AI system"""
        try:
            if self.dual_ai:
                # Use dual AI system
                context = f"CPX Research survey. Additional info: {info}" if info else "CPX Research survey"
                response = self.dual_ai.answer_question(question, "open_ended", context=context)
                
                if response:
                    print(f"🤖 Dual AI generated response: {response[:100]}...")
                    return response
                else:
                    print("⚠️  Dual AI failed - falling back to basic response")
            
            # Fallback to basic response generation
            return await self._generate_basic_text_response(question, info)
            
        except Exception as e:
            print(f"❌ Error in dual AI text generation: {e}")
            return await self._generate_basic_text_response(question, info)
    
    async def _generate_basic_text_response(self, question: str, info: str) -> Optional[str]:
        """Generate basic text response as fallback"""
        try:
            # Handle specific question types
            question_lower = question.lower()
            
            # Handle birth year questions
            if any(term in question_lower for term in ['birth year', 'year of birth', 'born', 'birthdate']):
                if self.persona and 'about_you' in self.persona:
                    birth_year = self.persona['about_you'].get('birth_year', None)
                    if birth_year:
                        return str(birth_year)
                    else:
                        age = self.persona['about_you'].get('age', 25)
                        current_year = datetime.now().year
                        birth_year = current_year - age
                        return str(birth_year)
                else:
                    current_year = datetime.now().year
                    birth_year = current_year - random.randint(25, 45)
                    return str(birth_year)
            
            # Handle other demographic questions
            if 'zip' in question_lower and 'code' in question_lower:
                return self.persona.get('about_you', {}).get('zipcode', '90210')
            
            if 'city' in question_lower:
                return self.persona.get('about_you', {}).get('city', 'Los Angeles')
            
            if 'state' in question_lower:
                return self.persona.get('about_you', {}).get('state', 'California')
            
            if 'age' in question_lower or 'years old' in question_lower:
                age = self.persona.get('about_you', {}).get('age', random.randint(25, 45))
                return str(age)
            
            # Use personality system if available
            if self.personality_system and Config.USE_VISION:
                context = f"Survey question: {question}\nAdditional info: {info}"
                response = await self.personality_system.generate_enhanced_response(
                    question, context=context, mode="natural_conversation"
                )
                return response
            
            # Use config defaults
            default_responses = self.cpx_config.get('personality_responses', {}).get('default_text_responses', [])
            if default_responses:
                return random.choice(default_responses)
            
            # Final fallback
            return "I think this is interesting and I wanted to share my opinion on this topic."
            
        except Exception as e:
            print(f"❌ Error generating basic text response: {e}")
            return "I would like to share my thoughts on this topic."
    
    async def handle_single_choice_question(self, question: str, info: str) -> bool:
        """Handle single choice (radio button) questions using dual AI"""
        try:
            # Get all radio button options
            radio_options = await self.page.locator('input[type="radio"]').all()
            
            if not radio_options:
                print("❌ No radio options found")
                return False
            
            # Get option texts
            options = []
            for i, radio in enumerate(radio_options):
                try:
                    label_id = await radio.get_attribute('id')
                    label_text = ""
                    
                    if label_id:
                        label_element = self.page.locator(f'label[for="{label_id}"]')
                        if await label_element.count() > 0:
                            label_text = await label_element.text_content()
                    
                    if not label_text:
                        parent = radio.locator('..')
                        parent_text = await parent.text_content() if await parent.count() > 0 else ""
                        if parent_text:
                            label_text = parent_text.strip()
                    
                    if label_text:
                        options.append({
                            'index': i,
                            'text': label_text.strip(),
                            'element': radio,
                            'id': label_id
                        })
                        print(f"   Option {i}: {label_text.strip()[:50]}...")
                        
                except Exception as option_e:
                    print(f"⚠️ Error parsing radio option {i}: {option_e}")
                    continue
            
            if not options:
                print("❌ No option texts found")
                return False
            
            # Use dual AI to select best option
            selected_option = await self._select_best_option_dual_ai(question, info, options, 'single')
            
            if selected_option is not None:
                # Cache the question and selected answer
                selected_text = selected_option.get('text', '')
                self.question_logger.cache_question_answer(question, 'single_punch', selected_text, info)
                print(f"💾 Cached single choice answer: {selected_text}")
                
                # Click the selected option
                return await self._click_selected_option(selected_option)
            
            return False
            
        except Exception as e:
            print(f"❌ Error handling single choice question: {e}")
            return False
    
    async def _select_best_option_dual_ai(self, question: str, info: str, options: List[Dict], selection_type: str) -> Any:
        """Select best option using dual AI system"""
        try:
            if self.dual_ai:
                # Convert options to format expected by dual AI
                ai_options = [{'text': opt['text']} for opt in options]
                context = f"CPX Research survey. Selection type: {selection_type}. Additional info: {info}" if info else f"CPX Research survey. Selection type: {selection_type}"
                
                # Use dual AI to select option
                selected = self.dual_ai.answer_question(question, "single_punch", ai_options, context)
                
                if selected:
                    # Find the corresponding option in our list
                    for option in options:
                        if option['text'] == selected.get('text', ''):
                            print(f"🤖 Dual AI selected: {selected.get('text', '')}")
                            return option
                
                print("⚠️  Dual AI selection failed - using smart fallback")
            
            # Fallback to smart selection
            return await self._select_best_option_smart(question, info, options, selection_type)
            
        except Exception as e:
            print(f"❌ Error in dual AI option selection: {e}")
            return await self._select_best_option_smart(question, info, options, selection_type)
    
    async def _select_best_option_smart(self, question: str, info: str, options: List[Dict], selection_type: str) -> Any:
        """Smart option selection as fallback"""
        try:
            options_text = "\n".join([f"{i}: {opt['text']}" for i, opt in enumerate(options)])
            print(f"🤔 Smart selection from {len(options)} options for: {question[:50]}...")
            
            question_lower = question.lower()
            
            # Handle common demographic questions
            if 'device' in question_lower and 'type' in question_lower:
                # Prefer desktop over "can't answer"
                for option in options:
                    option_text = option['text'].lower()
                    if 'desktop' in option_text and 'cant' not in option_text and 'dont' not in option_text:
                        print(f"🎯 Smart selected device: {option['text']}")
                        return option
            
            if 'political' in question_lower and 'views' in question_lower:
                # Prefer moderate over extremes
                for option in options:
                    option_text = option['text'].lower()
                    if 'moderate' in option_text and 'cant' not in option_text:
                        print(f"🎯 Smart selected political view: {option['text']}")
                        return option
            
            if 'industry' in question_lower and 'work' in question_lower:
                # Prefer realistic industries over "can't answer"
                for option in options:
                    option_text = option['text'].lower()
                    if any(term in option_text for term in ['technology', 'marketing', 'healthcare', 'education']) and 'cant' not in option_text:
                        print(f"🎯 Smart selected industry: {option['text']}")
                        return option
            
            # Look for first reasonable option (avoid skip/other options)
            skip_terms = ['cant', 'dont', 'prefer not', 'none', 'other', 'skip']
            for option in options:
                option_text = option['text'].lower()
                if not any(skip_term in option_text for skip_term in skip_terms):
                    print(f"🎯 Smart selected reasonable option: {option['text']}")
                    return option
            
            # Last resort: return first option
            print(f"🎯 Using first option as fallback: {options[0]['text']}")
            return options[0]
            
        except Exception as e:
            print(f"❌ Error in smart option selection: {e}")
            return options[0] if options else None
    
    async def handle_multiple_choice_question(self, question: str, info: str) -> bool:
        """Handle multiple choice (checkbox) questions using dual AI"""
        try:
            # Get all checkbox options
            checkbox_options = await self.page.locator('input[type="checkbox"]').all()
            
            if not checkbox_options:
                print("❌ No checkbox options found")
                return False
            
            # Check if this is a router question (many options) - use fast mode
            is_router_question = len(checkbox_options) > 20
            
            # Get option texts
            options = []
            for i, checkbox in enumerate(checkbox_options):
                try:
                    label_id = await checkbox.get_attribute('id')
                    label_text = ""
                    
                    if label_id:
                        label_element = self.page.locator(f'label[for="{label_id}"]')
                        if await label_element.count() > 0:
                            label_text = await label_element.text_content()
                    
                    if not label_text:
                        parent = checkbox.locator('..')
                        parent_text = await parent.text_content() if await parent.count() > 0 else ""
                        if parent_text:
                            label_text = parent_text.strip()
                    
                    if label_text:
                        options.append({
                            'index': i,
                            'text': label_text.strip(),
                            'element': checkbox,
                            'id': label_id
                        })
                        print(f"   Option {i}: {label_text.strip()[:50]}...")
                        
                except Exception as option_e:
                    print(f"⚠️ Error parsing checkbox option {i}: {option_e}")
                    continue
            
            if not options:
                print("❌ No option texts found")
                return False
            
            # Use dual AI to select best options
            selected_options = await self._select_best_options_dual_ai(question, info, options, 'multi')
            
            if selected_options:
                # Cache the question and selected answers
                if isinstance(selected_options, list):
                    selected_texts = [opt.get('text', '') for opt in selected_options]
                else:
                    selected_texts = [selected_options.get('text', '')]
                
                self.question_logger.cache_question_answer(question, 'multi_punch', selected_texts, info)
                print(f"💾 Cached multiple choice answers: {selected_texts}")
                
                # Click all selected options
                return await self._click_multiple_options(selected_options)
            
            return False
            
        except Exception as e:
            print(f"❌ Error handling multiple choice question: {e}")
            return False
    
    async def _select_best_options_dual_ai(self, question: str, info: str, options: List[Dict], selection_type: str) -> Any:
        """Select best options using dual AI system"""
        try:
            if self.dual_ai:
                # Convert options to format expected by dual AI
                ai_options = [{'text': opt['text']} for opt in options]
                context = f"CPX Research survey. Selection type: {selection_type}. Additional info: {info}" if info else f"CPX Research survey. Selection type: {selection_type}"
                
                # Use dual AI to select options
                selected = self.dual_ai.answer_question(question, "multi_punch", ai_options, context)
                
                if selected:
                    if isinstance(selected, list):
                        # Multiple options selected
                        selected_texts = [opt.get('text', '') for opt in selected]
                        selected_options = []
                        for option in options:
                            if option['text'] in selected_texts:
                                selected_options.append(option)
                        
                        if selected_options:
                            print(f"🤖 Dual AI selected multiple options: {selected_texts}")
                            return selected_options
                    else:
                        # Single option selected
                        for option in options:
                            if option['text'] == selected.get('text', ''):
                                print(f"🤖 Dual AI selected: {selected.get('text', '')}")
                                return [option]
                
                print("⚠️  Dual AI selection failed - using smart fallback")
            
            # Fallback to smart selection
            return await self._select_best_options_smart(question, info, options, selection_type)
            
        except Exception as e:
            print(f"❌ Error in dual AI multiple selection: {e}")
            return await self._select_best_options_smart(question, info, options, selection_type)
    
    async def _select_best_options_smart(self, question: str, info: str, options: List[Dict], selection_type: str) -> List[Dict]:
        """Smart multiple option selection as fallback"""
        try:
            question_lower = question.lower()
            selected_options = []
            
            # Handle common multiple choice questions
            if 'hobby' in question_lower or 'interest' in question_lower:
                # Select 2-3 reasonable hobbies
                reasonable_options = []
                for option in options:
                    option_text = option['text'].lower()
                    if not any(skip_term in option_text for skip_term in ['cant', 'dont', 'prefer not', 'none', 'other']):
                        reasonable_options.append(option)
                
                # Select 2-3 options
                num_to_select = min(3, len(reasonable_options))
                if num_to_select > 0:
                    selected_options = random.sample(reasonable_options, num_to_select)
                    print(f"🎯 Smart selected {len(selected_options)} hobbies")
                    return selected_options
            
            # Default: select first reasonable option
            for option in options:
                option_text = option['text'].lower()
                if not any(skip_term in option_text for skip_term in ['cant', 'dont', 'prefer not', 'none', 'other']):
                    selected_options.append(option)
                    break
            
            if selected_options:
                print(f"🎯 Smart selected option: {selected_options[0]['text']}")
                return selected_options
            
            # Last resort: return first option
            print(f"🎯 Using first option as fallback: {options[0]['text']}")
            return [options[0]]
            
        except Exception as e:
            print(f"❌ Error in smart multiple selection: {e}")
            return [options[0]] if options else []
    
    async def _find_text_input(self):
        """Find visible text input field"""
        try:
            # Try multiple selectors for different platforms
            input_selectors = [
                'form input[type="text"]',
                'form textarea',
                'input[type="text"]',
                'textarea',
                '.form-control',
                '.input-field'
            ]
            
            for selector in input_selectors:
                try:
                    inputs = await self.page.locator(selector).all()
                    for input_elem in inputs:
                        try:
                            is_visible = await input_elem.is_visible()
                            is_enabled = await input_elem.is_enabled()
                            
                            if is_visible and is_enabled:
                                print(f"✅ Found text input with selector '{selector}'")
                                return input_elem
                        except Exception:
                            continue
                except Exception:
                    continue
            
            return None
            
        except Exception as e:
            print(f"❌ Error finding text input: {e}")
            return None
    
    async def _type_text_response(self, text_input, response_text: str) -> bool:
        """Type text response into input field"""
        try:
            # Clear existing text
            await text_input.fill("")
            
            # Type the response
            if TYPING_SIMULATION_AVAILABLE:
                await type_text_naturally(text_input, response_text)
            else:
                await text_input.fill(response_text)
            
            print(f"✅ Typed response: {response_text[:100]}...")
            
            # Wait a bit for typing to complete
            await asyncio.sleep(random.uniform(1, 2))
            
            # Submit the form
            return await self._submit_question_form()
            
        except Exception as e:
            print(f"❌ Error typing text response: {e}")
            return False
    
    async def _click_selected_option(self, selected_option: Dict) -> bool:
        """Click the selected option"""
        try:
            radio_element = selected_option['element']
            radio_id = await radio_element.get_attribute('id')
            
            if radio_id:
                # Click the label associated with this radio button
                label_selector = f'label[for="{radio_id}"]'
                await self.page.click(label_selector)
                print(f"✅ Clicked radio label for option: {selected_option['text'][:50]}...")
            else:
                # Fallback: try clicking the radio input directly
                await radio_element.click()
                print(f"✅ Clicked radio input directly")
            
            await asyncio.sleep(random.uniform(1, 2))
            
            # Submit the form
            return await self._submit_question_form()
            
        except Exception as e:
            print(f"❌ Failed to click selected option: {e}")
            return False
    
    async def _click_multiple_options(self, selected_options: List[Dict]) -> bool:
        """Click multiple selected options"""
        try:
            for option in selected_options:
                checkbox_element = option['element']
                checkbox_id = await checkbox_element.get_attribute('id')
                
                if checkbox_id:
                    # Click the label associated with this checkbox
                    label_selector = f'label[for="{checkbox_id}"]'
                    await self.page.click(label_selector)
                    print(f"✅ Clicked checkbox label for option: {option['text'][:50]}...")
                else:
                    # Fallback: try clicking the checkbox input directly
                    await checkbox_element.click()
                    print(f"✅ Clicked checkbox input directly")
                
                # Small delay between clicks
                await asyncio.sleep(random.uniform(0.5, 1))
            
            await asyncio.sleep(random.uniform(1, 2))
            
            # Submit the form
            return await self._submit_question_form()
            
        except Exception as e:
            print(f"❌ Failed to click multiple options: {e}")
            return False
    
    async def _submit_question_form(self) -> bool:
        """Submit the question form"""
        try:
            # Look for submit button
            submit_selectors = [
                'button[type="submit"]',
                'input[type="submit"]',
                'button:has-text("Next")',
                'button:has-text("Continue")',
                'button:has-text("Submit")',
                '.next-button',
                '.continue-button',
                '.submit-button'
            ]
            
            for selector in submit_selectors:
                try:
                    submit_button = self.page.locator(selector).first
                    if await submit_button.count() > 0 and await submit_button.is_visible():
                        await submit_button.click()
                        print(f"✅ Submitted form with selector: {selector}")
                        await asyncio.sleep(random.uniform(2, 3))
                        return True
                except Exception:
                    continue
            
            print("⚠️  No submit button found - form may auto-submit")
            return True
            
        except Exception as e:
            print(f"❌ Error submitting form: {e}")
            return False
    
    def get_dual_ai_stats(self) -> Dict[str, Any]:
        """Get dual AI system statistics"""
        if self.dual_ai:
            return self.dual_ai.get_stats()
        else:
            return {"status": "Dual AI not available"}
    
    def display_question_stats(self):
        """Display comprehensive question and AI statistics"""
        print("\n" + "=" * 60)
        print("📊 QUESTION LOGGER & DUAL AI STATISTICS")
        print("=" * 60)
        
        # Question logger stats
        question_stats = self.question_logger.get_question_stats()
        print(f"📝 Total Cached Questions: {question_stats['total_questions']}")
        print(f"📊 Questions by Type:")
        for q_type, count in question_stats['by_type'].items():
            print(f"   {q_type}: {count}")
        
        # Dual AI stats
        if self.dual_ai:
            ai_stats = self.dual_ai.get_stats()
            print(f"\n🤖 DUAL AI SYSTEM STATISTICS:")
            print(f"   Platform: {ai_stats['platform']}")
            print(f"   Total Requests: {ai_stats['total_requests']}")
            print(f"   Gemini Usage: {ai_stats['gemini_usage']}")
            print(f"   OpenAI Usage: {ai_stats['openai_usage']}")
            print(f"   Fallback Usage: {ai_stats['fallback_usage']}")
            print(f"   Cache Efficiency: {ai_stats['cache_efficiency']}")
            print(f"   System Status: {ai_stats['system_status']}")
        else:
            print("\n⚠️  Dual AI system not available")
        
        print("=" * 60)


# Test the enhanced bot
async def test_cpx_dual_ai_bot():
    """Test the enhanced CPX bot with dual AI"""
    print("🧪 Testing CPX Research Bot with Dual AI")
    print("=" * 60)
    
    try:
        # Create bot instance
        bot = CPXResearchBotDualAI()
        
        # Test question handling
        test_question = "What is your favorite hobby?"
        test_info = "Hobby survey"
        
        print(f"\n🔍 Testing text question: {test_question}")
        
        # Test text response generation
        response = await bot._generate_text_response_dual_ai(test_question, test_info)
        if response:
            print(f"✅ Generated response: {response}")
        else:
            print("❌ Failed to generate response")
        
        # Test option selection
        test_options = [
            {'text': 'Reading'},
            {'text': 'Gaming'},
            {'text': 'Sports'},
            {'text': 'I prefer not to answer'}
        ]
        
        print(f"\n🔍 Testing option selection for: {test_question}")
        selected = await bot._select_best_option_dual_ai(test_question, test_info, test_options, 'single')
        if selected:
            print(f"✅ Selected option: {selected.get('text', '')}")
        else:
            print("❌ Failed to select option")
        
        # Display statistics
        bot.display_question_stats()
        
        print("\n🎉 CPX Dual AI Bot Test Complete!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")


if __name__ == "__main__":
    print("🚀 CPX Research Bot with Universal Dual AI")
    print("=" * 60)
    
    # Check if dual AI is available
    if DUAL_AI_AVAILABLE:
        print("✅ Dual AI system available")
        print("🚀 Gemini + OpenAI integration ready")
    else:
        print("⚠️  Dual AI system not available")
        print("📝 Using basic response generation")
    
    # Run test
    asyncio.run(test_cpx_dual_ai_bot())
    
    print("\n" + "=" * 60)
    print("🎉 CPX Research Bot with Dual AI Ready!")
    print("🤖 Intelligent question answering")
    print("🌐 Universal AI integration")
    print("💾 Enhanced question logging")
    print("=" * 60)
