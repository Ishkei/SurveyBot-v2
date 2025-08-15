#!/usr/bin/env python3
"""
Universal Question Logging System
Can be integrated into ANY survey bot implementation
Includes automatic question learning and persona expansion
"""

import json
import os
import re
from datetime import datetime
from typing import Any, Dict, List, Optional, Union
from pathlib import Path


class UniversalQuestionLogger:
    """
    Universal question logging system that can be integrated into any survey bot
    
    Features:
    - Platform-agnostic question caching
    - Smart similarity detection
    - Persistent storage
    - Statistics and analytics
    - Easy integration with any bot
    - Automatic question learning and persona expansion
    """
    
    def __init__(self, log_file: str = "universal_question_log.json", 
                 log_directory: str = "question_logs",
                 persona_file: str = "expanded_persona.json",
                 auto_learn: bool = True):
        """
        Initialize the universal question logger
        
        Args:
            log_file: Name of the log file
            log_directory: Directory to store log files (creates if doesn't exist)
            persona_file: File to store expanded persona data
            auto_learn: Whether to automatically learn new questions and expand persona
        """
        self.log_directory = Path(log_directory)
        self.log_directory.mkdir(exist_ok=True)
        
        self.log_file = self.log_directory / log_file
        self.persona_file = self.log_directory / persona_file
        self.auto_learn = auto_learn
        
        self.question_cache = {}
        self.platform_stats = {}  # Track questions by platform
        self.expanded_persona = {}  # Store learned persona data
        self.learning_stats = {
            'questions_learned': 0,
            'persona_expansions': 0,
            'learning_attempts': 0,
            'successful_learns': 0
        }
        
        self.load_question_log()
        self.load_expanded_persona()
        
        print(f"✅ Universal Question Logger initialized")
        print(f"   Log file: {self.log_file}")
        print(f"   Persona file: {self.persona_file}")
        print(f"   Log directory: {self.log_directory}")
        print(f"   Auto-learning: {'✅ Enabled' if auto_learn else '❌ Disabled'}")
    
    def load_question_log(self):
        """Load existing question log from file"""
        try:
            if self.log_file.exists():
                with open(self.log_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.question_cache = data.get('questions', {})
                    self.platform_stats = data.get('platform_stats', {})
                    self.learning_stats = data.get('learning_stats', self.learning_stats)
                print(f"✅ Loaded {len(self.question_cache)} cached questions from {self.log_file}")
            else:
                print(f"📝 Creating new universal question log: {self.log_file}")
        except Exception as e:
            print(f"⚠️ Error loading question log: {e}")
            self.question_cache = {}
            self.platform_stats = {}
    
    def load_expanded_persona(self):
        """Load expanded persona data from file"""
        try:
            if self.persona_file.exists():
                with open(self.persona_file, 'r', encoding='utf-8') as f:
                    self.expanded_persona = json.load(f)
                print(f"✅ Loaded expanded persona with {len(self.expanded_persona)} learned attributes")
            else:
                print(f"📝 Creating new expanded persona file: {self.persona_file}")
        except Exception as e:
            print(f"⚠️ Error loading expanded persona: {e}")
            self.expanded_persona = {}
    
    def save_question_log(self):
        """Save question log to file with platform statistics and learning stats"""
        try:
            data = {
                'questions': self.question_cache,
                'platform_stats': self.platform_stats,
                'learning_stats': self.learning_stats,
                'last_updated': datetime.now().isoformat(),
                'total_questions': len(self.question_cache)
            }
            
            with open(self.log_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            print(f"💾 Saved universal question log with {len(self.question_cache)} questions")
        except Exception as e:
            print(f"❌ Error saving question log: {e}")
    
    def save_expanded_persona(self):
        """Save expanded persona data to file"""
        try:
            with open(self.persona_file, 'w', encoding='utf-8') as f:
                json.dump(self.expanded_persona, f, indent=2, ensure_ascii=False)
            print(f"💾 Saved expanded persona with {len(self.expanded_persona)} learned attributes")
        except Exception as e:
            print(f"❌ Error saving expanded persona: {e}")
    
    def get_cached_answer(self, question_text: str, question_type: str, 
                         platform: str = "unknown") -> Optional[Any]:
        """
        Get cached answer for a question if it exists
        
        Args:
            question_text: The question text
            question_type: Type of question (single_punch, multi_punch, open_ended, int_open_ended)
            platform: Survey platform name (e.g., 'cpx', 'purespectrum', 'qmee')
        
        Returns:
            Cached answer if found, None otherwise
        """
        # Create a normalized key for the question
        normalized_question = self._normalize_question(question_text)
        
        # Check for exact matches first
        if normalized_question in self.question_cache:
            cached = self.question_cache[normalized_question]
            if cached.get('type') == question_type:
                # Update platform usage
                self._update_platform_stats(platform, 'cache_hit')
                print(f"🎯 Found cached answer for: {question_text[:50]}...")
                return cached.get('answer')
        
        # Check for similar questions using fuzzy matching
        for cached_q, cached_data in self.question_cache.items():
            if self._questions_are_similar(normalized_question, cached_q):
                if cached_data.get('type') == question_type:
                    # Update platform usage
                    self._update_platform_stats(platform, 'similarity_hit')
                    print(f"🎯 Found similar cached answer for: {question_text[:50]}...")
                    return cached_data.get('answer')
        
        # Update platform usage for cache miss
        self._update_platform_stats(platform, 'cache_miss')
        return None
    
    def cache_question_answer(self, question_text: str, question_type: str, 
                            answer: Any, context: str = "", platform: str = "unknown"):
        """
        Cache a question and its answer for future use
        
        Args:
            question_text: The question text
            question_type: Type of question
            answer: The answer given
            context: Additional context about the question
            platform: Survey platform name
        """
        normalized_question = self._normalize_question(question_text)
        
        # Check if question already exists
        if normalized_question in self.question_cache:
            # Update existing entry
            existing = self.question_cache[normalized_question]
            existing['usage_count'] = existing.get('usage_count', 0) + 1
            existing['last_used'] = datetime.now().isoformat()
            existing['platforms_used'].append(platform)
            existing['platforms_used'] = list(set(existing['platforms_used']))  # Remove duplicates
        else:
            # Create new entry
            self.question_cache[normalized_question] = {
                'original_question': question_text,
                'type': question_type,
                'answer': answer,
                'context': context,
                'platforms_used': [platform],
                'first_seen': datetime.now().isoformat(),
                'last_used': datetime.now().isoformat(),
                'usage_count': 1,
                'learned': True  # Mark as learned question
            }
        
        # Update platform statistics
        self._update_platform_stats(platform, 'question_cached')
        
        # Auto-learn new questions and expand persona
        if self.auto_learn:
            self._auto_learn_question(question_text, question_type, answer, context)
        
        print(f"💾 Cached question for {platform}: {question_text[:50]}... (Type: {question_type})")
        self.save_question_log()
    
    def _auto_learn_question(self, question_text: str, question_type: str, answer: Any, context: str):
        """
        Automatically learn from new questions and expand persona
        
        Args:
            question_text: The question text
            answer: The answer given
            question_type: Type of question
            context: Additional context
        """
        self.learning_stats['learning_attempts'] += 1
        
        try:
            question_lower = question_text.lower()
            
            # Learn demographic information
            learned_attribute = self._extract_demographic_attribute(question_lower, answer)
            if learned_attribute:
                self._add_to_expanded_persona(learned_attribute['category'], learned_attribute['value'], question_text)
                self.learning_stats['persona_expansions'] += 1
                print(f"🧠 Learned new persona attribute: {learned_attribute['category']} = {learned_attribute['value']}")
            
            # Learn question patterns for future reference
            self._learn_question_pattern(question_text, question_type, answer, context)
            self.learning_stats['questions_learned'] += 1
            
            self.learning_stats['successful_learns'] += 1
            
        except Exception as e:
            print(f"⚠️ Error in auto-learning: {e}")
    
    def _extract_demographic_attribute(self, question_lower: str, answer: Any) -> Optional[Dict[str, str]]:
        """
        Extract demographic attributes from questions and answers
        
        Args:
            question_lower: Lowercase question text
            answer: The answer given
        
        Returns:
            Dictionary with category and value if demographic attribute found
        """
        # Age-related questions
        if any(term in question_lower for term in ['age', 'years old', 'how old']):
            if isinstance(answer, (int, str)) and str(answer).isdigit():
                return {'category': 'age', 'value': int(answer)}
        
        # Birth year questions
        if any(term in question_lower for term in ['birth year', 'year of birth', 'born', 'birthdate']):
            if isinstance(answer, (int, str)) and str(answer).isdigit():
                return {'category': 'birth_year', 'value': int(answer)}
        
        # Location questions
        if 'zip' in question_lower and 'code' in question_lower:
            return {'category': 'zipcode', 'value': str(answer)}
        
        if 'city' in question_lower:
            return {'category': 'city', 'value': str(answer)}
        
        if 'state' in question_lower:
            return {'category': 'state', 'value': str(answer)}
        
        # Income questions
        if any(term in question_lower for term in ['income', 'salary', 'earnings', 'make', 'earn']):
            if isinstance(answer, (int, str)) and str(answer).isdigit():
                return {'category': 'income', 'value': int(answer)}
        
        # Education questions
        if any(term in question_lower for term in ['education', 'degree', 'school', 'university', 'college']):
            return {'category': 'education', 'value': str(answer)}
        
        # Occupation and Industry questions
        if any(term in question_lower for term in ['occupation', 'job', 'work', 'career', 'profession']):
            return {'category': 'occupation', 'value': str(answer)}
        
        if any(term in question_lower for term in ['industry', 'sector', 'field']):
            return {'category': 'industry', 'value': str(answer)}
        
        # Marital status
        if any(term in question_lower for term in ['marital status', 'married', 'single', 'divorced']):
            return {'category': 'marital_status', 'value': str(answer)}
        
        # Household size
        if any(term in question_lower for term in ['household', 'family', 'people', 'members']):
            if isinstance(answer, (int, str)) and str(answer).isdigit():
                return {'category': 'household_size', 'value': int(answer)}
        
        # Device and Technology questions
        if any(term in question_lower for term in ['device type', 'device', 'phone', 'mobile', 'tablet', 'desktop', 'computer']):
            return {'category': 'device_type', 'value': str(answer)}
        
        if any(term in question_lower for term in ['technology', 'tech', 'app', 'software', 'hardware']):
            return {'category': 'technology_usage', 'value': str(answer)}
        
        # Political views
        if any(term in question_lower for term in ['political', 'politics', 'liberal', 'conservative', 'moderate']):
            return {'category': 'political_views', 'value': str(answer)}
        
        # Hobbies and interests
        if any(term in question_lower for term in ['hobby', 'interest', 'like', 'enjoy', 'favorite']):
            return {'category': 'hobbies', 'value': str(answer)}
        
        # Shopping preferences
        if any(term in question_lower for term in ['shop', 'buy', 'purchase', 'brand', 'product']):
            return {'category': 'shopping_preferences', 'value': str(answer)}
        
        # Media and Entertainment
        if any(term in question_lower for term in ['streaming', 'media', 'entertainment', 'tv', 'movie', 'music']):
            return {'category': 'media_preferences', 'value': str(answer)}
        
        # Transportation
        if any(term in question_lower for term in ['car', 'vehicle', 'transportation', 'drive', 'commute']):
            return {'category': 'transportation', 'value': str(answer)}
        
        # Social Media
        if any(term in question_lower for term in ['social media', 'social', 'platform', 'instagram', 'twitter', 'facebook']):
            return {'category': 'social_media', 'value': str(answer)}
        
        # Health and Wellness
        if any(term in question_lower for term in ['health', 'wellness', 'fitness', 'exercise', 'diet']):
            return {'category': 'health_wellness', 'value': str(answer)}
        
        # Travel
        if any(term in question_lower for term in ['travel', 'vacation', 'trip', 'destination', 'abroad']):
            return {'category': 'travel_preferences', 'value': str(answer)}
        
        # Pets
        if any(term in question_lower for term in ['pet', 'dog', 'cat', 'animal']):
            return {'category': 'pets', 'value': str(answer)}
        
        # Home and Living
        if any(term in question_lower for term in ['home', 'house', 'apartment', 'rent', 'own', 'living']):
            return {'category': 'home_living', 'value': str(answer)}
        
        return None
    
    def _add_to_expanded_persona(self, category: str, value: Any, source_question: str):
        """
        Add learned attribute to expanded persona
        
        Args:
            category: Category of the learned attribute
            value: Value of the attribute
            source_question: Question that led to this learning
        """
        if category not in self.expanded_persona:
            self.expanded_persona[category] = {
                'value': value,
                'learned_from': source_question,
                'learned_date': datetime.now().isoformat(),
                'confidence': 1.0,
                'usage_count': 1
            }
        else:
            # Update existing attribute
            existing = self.expanded_persona[category]
            existing['usage_count'] += 1
            
            # If value is different, track both and use most common
            if existing['value'] != value:
                if 'alternative_values' not in existing:
                    existing['alternative_values'] = []
                existing['alternative_values'].append({
                    'value': value,
                    'learned_from': source_question,
                    'learned_date': datetime.now().isoformat()
                })
                
                # Use the most frequently used value
                if existing['usage_count'] > 1:
                    existing['value'] = value
                    existing['learned_from'] = source_question
                    existing['learned_date'] = datetime.now().isoformat()
        
        self.save_expanded_persona()
    
    def _learn_question_pattern(self, question_text: str, question_type: str, answer: Any, context: str):
        """
        Learn question patterns for future reference
        
        Args:
            question_text: The question text
            question_type: Type of question
            answer: The answer given
            context: Additional context
        """
        # Extract key words and patterns from the question
        words = re.findall(r'\b\w+\b', question_text.lower())
        
        # Store question patterns for future matching
        pattern_key = f"pattern_{question_type}_{len(words)}"
        
        if pattern_key not in self.expanded_persona:
            self.expanded_persona[pattern_key] = {
                'question_patterns': [],
                'common_answers': [],
                'learned_date': datetime.now().isoformat()
            }
        
        pattern_data = self.expanded_persona[pattern_key]
        
        # Add question pattern
        if question_text not in pattern_data['question_patterns']:
            pattern_data['question_patterns'].append(question_text)
        
        # Add common answer
        if answer not in pattern_data['common_answers']:
            pattern_data['common_answers'].append(answer)
    
    def get_expanded_persona(self) -> Dict[str, Any]:
        """
        Get the expanded persona with learned attributes
        
        Returns:
            Dictionary containing expanded persona data
        """
        return self.expanded_persona.copy()
    
    def get_persona_attribute(self, category: str) -> Optional[Any]:
        """
        Get a specific persona attribute
        
        Args:
            category: Category of the attribute to retrieve
        
        Returns:
            Value of the attribute if found, None otherwise
        """
        if category in self.expanded_persona:
            return self.expanded_persona[category]['value']
        return None
    
    def suggest_answer_from_persona(self, question_text: str, question_type: str) -> Optional[Any]:
        """
        Suggest an answer based on learned persona data
        
        Args:
            question_text: The question text
            question_type: Type of question
        
        Returns:
            Suggested answer if persona data available, None otherwise
        """
        question_lower = question_text.lower()
        
        # Check for demographic matches
        demographic_attribute = self._extract_demographic_attribute(question_lower, None)
        if demographic_attribute and demographic_attribute['category'] in self.expanded_persona:
            return self.expanded_persona[demographic_attribute['category']]['value']
        
        # Check for pattern matches
        for key, data in self.expanded_persona.items():
            if key.startswith('pattern_') and question_type in key:
                # Look for similar question patterns
                for pattern in data.get('question_patterns', []):
                    if self._questions_are_similar(question_text, pattern):
                        # Return most common answer for this pattern
                        common_answers = data.get('common_answers', [])
                        if common_answers:
                            return common_answers[0]  # Return first/most common answer
        
        return None
    
    def get_smart_default_answer(self, question_text: str, question_type: str, options: List[Dict] = None) -> Optional[Any]:
        """
        Get a smart default answer for common survey questions
        
        Args:
            question_text: The question text
            question_type: Type of question
            options: Available options for multiple choice questions
        
        Returns:
            Smart default answer if available, None otherwise
        """
        question_lower = question_text.lower()
        
        # Device Type questions - prefer realistic answers over "don't want to answer"
        if any(term in question_lower for term in ['device type', 'device', 'phone', 'mobile', 'tablet', 'desktop']):
            if options:
                # Prefer realistic device types in this order
                preferred_devices = ['Desktop', 'Mobile', 'Tablet']
                for device in preferred_devices:
                    for option in options:
                        if device.lower() in option.get('text', '').lower():
                            return option
                # If no preferred device found, return first realistic option
                for option in options:
                    if 'cant' not in option.get('text', '').lower() and 'dont' not in option.get('text', '').lower():
                        return option
        
        # Political Views - prefer moderate over extreme positions
        if any(term in question_lower for term in ['political', 'politics', 'liberal', 'conservative']):
            if options:
                # Prefer moderate positions
                preferred_positions = ['Moderate', 'Middle of the Road', 'Slightly liberal', 'Slightly conservative']
                for position in preferred_positions:
                    for option in options:
                        if position.lower() in option.get('text', '').lower():
                            return option
                # If no preferred position found, return first realistic option
                for option in options:
                    if 'cant' not in option.get('text', '').lower() and 'dont' not in option.get('text', '').lower():
                        return option
        
        # Industry questions - prefer common, realistic industries
        if any(term in question_lower for term in ['industry', 'sector', 'field', 'work in']):
            if options:
                # Prefer common, realistic industries
                preferred_industries = [
                    'Information Technology/IT', 'Computer Software', 'Computer Hardware',
                    'Marketing', 'Advertising', 'Consulting', 'Education', 'Healthcare',
                    'Finance', 'Banking', 'Retail', 'Manufacturing'
                ]
                for industry in preferred_industries:
                    for option in options:
                        if industry.lower() in option.get('text', '').lower():
                            return option
                # If no preferred industry found, return first realistic option
                for option in options:
                    if 'cant' not in option.get('text', '').lower() and 'dont' not in option.get('text', '').lower():
                        return option
        
        # General rule: avoid "don't want to answer" options when possible
        if options and question_type in ['single_punch', 'multi_punch']:
            # Look for the first option that's not a "don't want to answer" type
            for option in options:
                option_text = option.get('text', '').lower()
                if not any(skip_term in option_text for skip_term in [
                    'cant', 'dont', 'dont want', 'prefer not', 'none of the above', 'other'
                ]):
                    return option
        
        return None
    
    def get_enhanced_answer_suggestion(self, question_text: str, question_type: str, options: List[Dict] = None) -> Optional[Any]:
        """
        Get an enhanced answer suggestion combining persona data and smart defaults
        
        Args:
            question_text: The question text
            question_type: Type of question
            options: Available options for multiple choice questions
        
        Returns:
            Best available answer suggestion
        """
        # First try persona-based suggestion
        persona_suggestion = self.suggest_answer_from_persona(question_text, question_type)
        if persona_suggestion:
            return persona_suggestion
        
        # Then try smart default
        smart_default = self.get_smart_default_answer(question_text, question_type, options)
        if smart_default:
            return smart_default
        
        return None
    
    def get_learning_stats(self) -> Dict[str, Any]:
        """Get statistics about the learning system"""
        return self.learning_stats.copy()
    
    def export_learning_report(self, export_file: str = None) -> str:
        """
        Export a comprehensive learning report
        
        Args:
            export_file: Optional custom export filename
        
        Returns:
            Path to exported report
        """
        if not export_file:
            export_file = f"learning_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        export_path = self.log_directory / export_file
        
        report_data = {
            'report_date': datetime.now().isoformat(),
            'learning_stats': self.learning_stats,
            'expanded_persona': self.expanded_persona,
            'question_cache_summary': {
                'total_questions': len(self.question_cache),
                'learned_questions': len([q for q in self.question_cache.values() if q.get('learned', False)]),
                'platforms': list(self.platform_stats.keys())
            }
        }
        
        with open(export_path, 'w', encoding='utf-8') as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)
        
        print(f"📊 Exported learning report to {export_path}")
        return str(export_path)
    
    def _update_platform_stats(self, platform: str, action: str):
        """Update platform usage statistics"""
        if platform not in self.platform_stats:
            self.platform_stats[platform] = {
                'questions_cached': 0,
                'cache_hits': 0,
                'similarity_hits': 0,
                'cache_misses': 0,
                'first_seen': datetime.now().isoformat(),
                'last_used': datetime.now().isoformat()
            }
        
        stats = self.platform_stats[platform]
        stats['last_used'] = datetime.now().isoformat()
        
        if action == 'question_cached':
            stats['questions_cached'] += 1
        elif action == 'cache_hit':
            stats['cache_hits'] += 1
        elif action == 'similarity_hit':
            stats['similarity_hits'] += 1
        elif action == 'cache_miss':
            stats['cache_misses'] += 1
    
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
        normalized = re.sub(r'\b(income|salary|earnings|make|earn)\b', 'income', normalized)
        normalized = re.sub(r'\b(education|degree|school|university|college)\b', 'education', normalized)
        normalized = re.sub(r'\b(occupation|job|work|career|profession)\b', 'occupation', normalized)
        normalized = re.sub(r'\b(marital status|married|single|divorced)\b', 'marital_status', normalized)
        normalized = re.sub(r'\b(household|family|people|members)\b', 'household_size', normalized)
        
        return normalized.strip()
    
    def _questions_are_similar(self, q1: str, q2: str) -> bool:
        """Check if two questions are similar enough to use the same answer"""
        # Simple similarity check - can be enhanced with more sophisticated NLP
        words1 = set(q1.split())
        words2 = set(q2.split())
        
        # Check for key demographic terms
        demographic_terms = [
            'age', 'birth_year', 'zipcode', 'city', 'state', 'income', 
            'education', 'occupation', 'marital_status', 'household_size'
        ]
        
        for term in demographic_terms:
            if term in q1 and term in q2:
                return True
        
        # Check word overlap
        common_words = words1.intersection(words2)
        if len(common_words) >= 2:  # At least 2 common words
            return True
        
        return False
    
    def get_question_stats(self) -> Dict[str, Any]:
        """Get comprehensive statistics about cached questions"""
        stats = {
            'total_questions': len(self.question_cache),
            'by_type': {},
            'by_platform': {},
            'recent_questions': [],
            'most_used': [],
            'platform_performance': {},
            'learning_summary': {
                'total_learned': self.learning_stats['questions_learned'],
                'persona_expansions': self.learning_stats['persona_expansions'],
                'learning_success_rate': round((self.learning_stats['successful_learns'] / max(self.learning_stats['learning_attempts'], 1)) * 100, 2)
            }
        }
        
        # Count by type
        for q_data in self.question_cache.values():
            q_type = q_data.get('type', 'unknown')
            stats['by_type'][q_type] = stats['by_type'].get(q_type, 0) + 1
        
        # Count by platform
        for q_data in self.question_cache.values():
            platforms = q_data.get('platforms_used', [])
            for platform in platforms:
                stats['by_platform'][platform] = stats['by_platform'].get(platform, 0) + 1
        
        # Get recent questions
        recent = sorted(self.question_cache.items(), 
                       key=lambda x: x[1].get('last_used', ''), 
                       reverse=True)[:10]
        stats['recent_questions'] = [q[1]['original_question'][:50] + '...' for q in recent]
        
        # Get most used questions
        most_used = sorted(self.question_cache.items(), 
                          key=lambda x: x[1].get('usage_count', 0), 
                          reverse=True)[:10]
        stats['most_used'] = [f"{q[1]['original_question'][:50]}... (used {q[1].get('usage_count', 0)} times)" for q in most_used]
        
        # Platform performance metrics
        for platform, platform_data in self.platform_stats.items():
            total_requests = (platform_data.get('cache_hits', 0) + 
                            platform_data.get('similarity_hits', 0) + 
                            platform_data.get('cache_misses', 0))
            
            if total_requests > 0:
                hit_rate = ((platform_data.get('cache_hits', 0) + 
                           platform_data.get('similarity_hits', 0)) / total_requests) * 100
            else:
                hit_rate = 0
            
            stats['platform_performance'][platform] = {
                'questions_cached': platform_data.get('questions_cached', 0),
                'cache_hits': platform_data.get('cache_hits', 0),
                'similarity_hits': platform_data.get('similarity_hits', 0),
                'cache_misses': platform_data.get('cache_misses', 0),
                'hit_rate': round(hit_rate, 2),
                'first_seen': platform_data.get('first_seen', 'Unknown'),
                'last_used': platform_data.get('last_used', 'Unknown')
            }
        
        return stats
    
    def export_platform_log(self, platform: str, export_file: str = None) -> str:
        """
        Export questions for a specific platform
        
        Args:
            platform: Platform name to export
            export_file: Optional custom export filename
        
        Returns:
            Path to exported file
        """
        if not export_file:
            export_file = f"{platform}_questions_export.json"
        
        export_path = self.log_directory / export_file
        
        platform_questions = {}
        for q_key, q_data in self.question_cache.items():
            if platform in q_data.get('platforms_used', []):
                platform_questions[q_key] = q_data
        
        export_data = {
            'platform': platform,
            'export_date': datetime.now().isoformat(),
            'total_questions': len(platform_questions),
            'questions': platform_questions
        }
        
        with open(export_path, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, ensure_ascii=False)
        
        print(f"📤 Exported {len(platform_questions)} questions for {platform} to {export_path}")
        return str(export_path)
    
    def import_questions(self, import_file: str, platform: str = "imported"):
        """
        Import questions from another question log
        
        Args:
            import_file: Path to import file
            platform: Platform name for imported questions
        """
        try:
            with open(import_file, 'r', encoding='utf-8') as f:
                import_data = json.load(f)
            
            questions = import_data.get('questions', {})
            imported_count = 0
            
            for q_key, q_data in questions.items():
                if q_key not in self.question_cache:
                    # Add platform info to imported questions
                    q_data['platforms_used'] = [platform]
                    q_data['imported_from'] = import_file
                    q_data['import_date'] = datetime.now().isoformat()
                    
                    self.question_cache[q_key] = q_data
                    imported_count += 1
            
            print(f"📥 Imported {imported_count} questions from {import_file}")
            self.save_question_log()
            
        except Exception as e:
            print(f"❌ Error importing questions: {e}")
    
    def clear_platform_data(self, platform: str):
        """Clear all data for a specific platform"""
        try:
            # Remove platform from question data
            for q_data in self.question_cache.values():
                if 'platforms_used' in q_data:
                    q_data['platforms_used'] = [p for p in q_data['platforms_used'] if p != platform]
            
            # Remove platform stats
            if platform in self.platform_stats:
                del self.platform_stats[platform]
            
            # Clean up questions that no longer have any platforms
            self.question_cache = {
                k: v for k, v in self.question_cache.items() 
                if v.get('platforms_used', [])
            }
            
            print(f"🧹 Cleared all data for platform: {platform}")
            self.save_question_log()
            
        except Exception as e:
            print(f"❌ Error clearing platform data: {e}")
    
    def get_platform_questions(self, platform: str) -> Dict[str, Any]:
        """Get all questions for a specific platform"""
        platform_questions = {}
        for q_key, q_data in self.question_cache.items():
            if platform in q_data.get('platforms_used', []):
                platform_questions[q_key] = q_data
        
        return platform_questions
    
    def search_questions(self, search_term: str, platform: str = None) -> Dict[str, Any]:
        """
        Search for questions containing specific terms
        
        Args:
            search_term: Term to search for
            platform: Optional platform filter
        
        Returns:
            Dictionary of matching questions
        """
        search_term_lower = search_term.lower()
        matching_questions = {}
        
        for q_key, q_data in self.question_cache.items():
            # Check if platform filter applies
            if platform and platform not in q_data.get('platforms_used', []):
                continue
            
            # Search in question text
            if search_term_lower in q_data.get('original_question', '').lower():
                matching_questions[q_key] = q_data
                continue
            
            # Search in context
            if search_term_lower in q_data.get('context', '').lower():
                matching_questions[q_key] = q_data
                continue
        
        return matching_questions


# Enhanced integration helper with auto-learning
class BotIntegrationHelper:
    """Helper class to easily integrate question logging into any survey bot with auto-learning"""
    
    def __init__(self, bot_name: str, log_directory: str = "question_logs", auto_learn: bool = True):
        """
        Initialize integration helper for a specific bot
        
        Args:
            bot_name: Name of the bot (e.g., 'cpx', 'purespectrum', 'qmee')
            log_directory: Directory for question logs
            auto_learn: Whether to automatically learn new questions and expand persona
        """
        self.bot_name = bot_name
        self.logger = UniversalQuestionLogger(
            log_file=f"{bot_name}_questions.json",
            log_directory=log_directory,
            persona_file=f"{bot_name}_expanded_persona.json",
            auto_learn=auto_learn
        )
        
        print(f"🔗 Question logging integrated for {bot_name} bot")
        if auto_learn:
            print(f"🧠 Auto-learning enabled - bot will expand persona automatically")
    
    def get_answer(self, question: str, question_type: str) -> Optional[Any]:
        """Get cached answer for a question"""
        return self.logger.get_cached_answer(question, question_type, self.bot_name)
    
    def cache_answer(self, question: str, question_type: str, answer: Any, context: str = ""):
        """Cache a question and answer (auto-learning happens automatically)"""
        self.logger.cache_question_answer(question, question_type, answer, context, self.bot_name)
    
    def get_stats(self) -> Dict[str, Any]:
        """Get statistics for this bot"""
        return self.logger.get_question_stats()
    
    def export_questions(self) -> str:
        """Export questions for this bot"""
        return self.logger.export_platform_log(self.bot_name)
    
    def get_persona_suggestion(self, question: str, question_type: str) -> Optional[Any]:
        """Get persona-based answer suggestion for a question"""
        return self.logger.suggest_answer_from_persona(question, question_type)
    
    def get_smart_default(self, question: str, question_type: str, options: List[Dict] = None) -> Optional[Any]:
        """Get smart default answer for common survey questions"""
        return self.logger.get_smart_default_answer(question, question_type, options)
    
    def get_enhanced_suggestion(self, question: str, question_type: str, options: List[Dict] = None) -> Optional[Any]:
        """Get enhanced answer suggestion combining persona and smart defaults"""
        return self.logger.get_enhanced_answer_suggestion(question, question_type, options)
    
    def get_best_answer(self, question: str, question_type: str, options: List[Dict] = None) -> Optional[Any]:
        """
        Get the best available answer using all available methods
        
        Priority order:
        1. Cached answer (exact match)
        2. Similar cached answer
        3. Persona-based suggestion
        4. Smart default answer
        5. None (will need to generate new answer)
        """
        # First check cache
        cached_answer = self.logger.get_cached_answer(question, question_type, self.bot_name)
        if cached_answer:
            return cached_answer
        
        # Then try enhanced suggestion
        enhanced_suggestion = self.logger.get_enhanced_answer_suggestion(question, question_type, options)
        if enhanced_suggestion:
            return enhanced_suggestion
        
        return None
    
    def get_expanded_persona(self) -> Dict[str, Any]:
        """Get the expanded persona with learned attributes"""
        return self.logger.get_expanded_persona()
    
    def get_learning_stats(self) -> Dict[str, Any]:
        """Get learning statistics"""
        return self.logger.get_learning_stats()
    
    def export_learning_report(self) -> str:
        """Export comprehensive learning report"""
        return self.logger.export_learning_report()


# Example usage for different bots with auto-learning
def example_bot_integration_with_learning():
    """Example of how to integrate question logging with auto-learning into different bots"""
    
    print("🔧 Example Bot Integration with Auto-Learning")
    print("=" * 60)
    
    # Initialize question logging for different bots with auto-learning enabled
    cpx_bot = BotIntegrationHelper("cpx", auto_learn=True)
    purespectrum_bot = BotIntegrationHelper("purespectrum", auto_learn=True)
    qmee_bot = BotIntegrationHelper("qmee", auto_learn=True)
    
    # Example new questions that aren't in the persona
    new_questions = [
        ("What is your favorite hobby?", "open_ended", "Reading science fiction", "Hobby survey"),
        ("How many streaming services do you subscribe to?", "int_open_ended", 3, "Media survey"),
        ("What type of car do you drive?", "open_ended", "Hybrid SUV", "Automotive survey"),
        ("Do you prefer shopping online or in stores?", "single_punch", "Online", "Shopping survey"),
        ("Which social media platforms do you use?", "multi_punch", ["Instagram", "Twitter", "LinkedIn"], "Social media survey")
    ]
    
    # Cache questions for each bot (auto-learning happens automatically)
    print("\n📝 Caching new questions with auto-learning...")
    for question, q_type, answer, context in new_questions:
        cpx_bot.cache_answer(question, q_type, answer, context)
        purespectrum_bot.cache_answer(question, q_type, answer, context)
        qmee_bot.cache_answer(question, q_type, answer, context)
    
    # Test persona suggestions for new questions
    print("\n🧠 Testing persona-based answer suggestions...")
    test_questions = [
        "What is your favorite hobby?",
        "How many streaming services do you subscribe to?",
        "What type of car do you drive?",
        "Do you prefer shopping online or in stores?",
        "Which social media platforms do you use?"
    ]
    
    for question in test_questions:
        # Try to get persona suggestion
        suggestion = cpx_bot.get_persona_suggestion(question, "open_ended")
        if suggestion:
            print(f"✅ Persona suggestion for '{question}': {suggestion}")
        else:
            print(f"❌ No persona suggestion for '{question}'")
    
    # Show learning statistics
    print("\n📊 Learning Statistics:")
    learning_stats = cpx_bot.get_learning_stats()
    for key, value in learning_stats.items():
        print(f"  {key}: {value}")
    
    # Show expanded persona
    print("\n👤 Expanded Persona:")
    expanded_persona = cpx_bot.get_expanded_persona()
    for category, data in expanded_persona.items():
        if isinstance(data, dict) and 'value' in data:
            print(f"  {category}: {data['value']} (learned from: {data.get('learned_from', 'Unknown')})")
    
    # Export learning report
    print("\n📤 Exporting learning report...")
    report_path = cpx_bot.export_learning_report()
    print(f"Learning report exported to: {report_path}")
    
    # Show comprehensive statistics
    print("\n📊 Comprehensive Bot Statistics:")
    stats = cpx_bot.get_stats()
    print(f"Total Questions: {stats['total_questions']}")
    print(f"Platforms: {list(stats['by_platform'].keys())}")
    print(f"Learning Success Rate: {stats['learning_summary']['learning_success_rate']}%")
    
    # Export questions for each platform
    print("\n📤 Exporting platform-specific logs...")
    cpx_bot.export_questions()
    purespectrum_bot.export_questions()
    qmee_bot.export_questions()


if __name__ == "__main__":
    print("🚀 Universal Question Logging System with Auto-Learning")
    print("=" * 70)
    
    # Run example integration with auto-learning
    example_bot_integration_with_learning()
    
    print("\n" + "=" * 70)
    print("✅ Universal question logging system with auto-learning ready!")
    print("\n🧠 Auto-Learning Features:")
    print("1. Automatically learns new demographic questions")
    print("2. Expands persona with learned attributes")
    print("3. Suggests answers based on learned persona")
    print("4. Tracks learning success rates")
    print("5. Exports comprehensive learning reports")
    print("\n📖 To integrate with your bot:")
    print("1. Import BotIntegrationHelper")
    print("2. Initialize with auto_learn=True")
    print("3. Use get_answer() and cache_answer() methods")
    print("4. Auto-learning happens automatically!")
    print("5. Questions and persona are shared across all platforms!")

