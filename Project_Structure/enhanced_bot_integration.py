"""
Enhanced Bot Integration Module

This module integrates the advanced personality system with existing survey bot components,
providing enhanced AI capabilities and natural conversation abilities.
"""

import asyncio
import json
import logging
from typing import Optional, Dict, Any, List, Union
from pathlib import Path

# Import the enhanced personality system
try:
    from enhanced_personality_system import EnhancedPersonalitySystem, generate_enhanced_response
    ENHANCED_SYSTEM_AVAILABLE = True
except ImportError:
    ENHANCED_SYSTEM_AVAILABLE = False
    print("⚠️ Enhanced personality system not available. Using fallback responses.")

# Import existing bot components
try:
    from personality_responses import get_personality_response
    LEGACY_SYSTEM_AVAILABLE = True
except ImportError:
    LEGACY_SYSTEM_AVAILABLE = False
    print("⚠️ Legacy personality system not available.")

try:
    from config import Config
    CONFIG_AVAILABLE = True
except ImportError:
    CONFIG_AVAILABLE = False
    print("⚠️ Config module not available.")

class EnhancedBotIntegration:
    """
    Integrates enhanced personality system with existing survey bot components.
    Provides seamless enhancement while maintaining backward compatibility.
    """
    
    def __init__(self, config_file: str = "enhanced_ai_config.json"):
        self.config_file = config_file
        self.config = self._load_config()
        self.enhanced_system = None
        self.legacy_system = None
        self.current_mode = "natural_conversation"
        self.conversation_context = []
        
        # Initialize systems
        self._initialize_systems()
        
        # Setup logging
        self._setup_logging()
    
    def _load_config(self) -> Dict[str, Any]:
        """Load enhanced AI configuration."""
        try:
            config_path = Path(self.config_file)
            if config_path.exists():
                with open(config_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            else:
                print(f"⚠️ Config file {self.config_file} not found. Using default settings.")
                return self._get_default_config()
        except Exception as e:
            print(f"⚠️ Error loading config: {e}. Using default settings.")
            return self._get_default_config()
    
    def _get_default_config(self) -> Dict[str, Any]:
        """Get default configuration if file loading fails."""
        return {
            "enhanced_personality_system": {
                "enabled": True,
                "default_mode": "natural_conversation"
            },
            "ai_integration": {
                "gemini_api": {"enabled": False},
                "fallback_enabled": True
            }
        }
    
    def _initialize_systems(self):
        """Initialize both enhanced and legacy personality systems."""
        # Initialize enhanced system
        if ENHANCED_SYSTEM_AVAILABLE:
            try:
                self.enhanced_system = EnhancedPersonalitySystem()
                self.current_mode = self.config.get("enhanced_personality_system", {}).get("default_mode", "natural_conversation")
                print(f"✅ Enhanced personality system initialized with mode: {self.current_mode}")
            except Exception as e:
                print(f"⚠️ Failed to initialize enhanced system: {e}")
                self.enhanced_system = None
        
        # Initialize legacy system as fallback
        if LEGACY_SYSTEM_AVAILABLE:
            self.legacy_system = True
            print("✅ Legacy personality system available as fallback")
        
        if not self.enhanced_system and not self.legacy_system:
            print("⚠️ No personality systems available. Bot will use basic responses.")
    
    def _setup_logging(self):
        """Setup logging for the enhanced integration."""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger("EnhancedBotIntegration")
    
    async def get_enhanced_response(self, 
                                   question: str, 
                                   context: str = "", 
                                   mode: Optional[str] = None,
                                   user_style: str = "default") -> str:
        """
        Get enhanced response using the personality system.
        
        Args:
            question: User's question or input
            context: Additional context for the response
            mode: Personality mode to use (optional)
            user_style: User's preferred communication style
            
        Returns:
            Enhanced response string
        """
        # Use specified mode or current default
        response_mode = mode or self.current_mode
        
        # Update conversation context
        self._update_conversation_context(question, context)
        
        # Try enhanced system first
        if self.enhanced_system and self.config.get("enhanced_personality_system", {}).get("enabled", True):
            try:
                response = await self.enhanced_system.generate_enhanced_response(
                    question, context, response_mode, user_style
                )
                self.logger.info(f"Generated enhanced response using mode: {response_mode}")
                return response
            except Exception as e:
                self.logger.warning(f"Enhanced system failed: {e}. Falling back to legacy system.")
        
        # Fallback to legacy system
        if self.legacy_system:
            try:
                response = get_personality_response(question, context)
                self.logger.info("Generated response using legacy personality system")
                return response
            except Exception as e:
                self.logger.warning(f"Legacy system failed: {e}")
        
        # Final fallback
        return self._generate_basic_fallback(question, context)
    
    def _update_conversation_context(self, question: str, context: str):
        """Update conversation context for better continuity."""
        self.conversation_context.append({
            "question": question,
            "context": context,
            "timestamp": asyncio.get_event_loop().time()
        })
        
        # Keep only recent context
        max_context = self.config.get("conversation_enhancement", {}).get("context_memory", {}).get("max_history", 50)
        if len(self.conversation_context) > max_context:
            self.conversation_context = self.conversation_context[-max_context:]
    
    def _generate_basic_fallback(self, question: str, context: str) -> str:
        """Generate basic fallback response when all systems fail."""
        question_lower = question.lower()
        
        if "how" in question_lower and "work" in question_lower:
            return "The survey bot works by automating survey completion using various automation techniques. It can handle different survey platforms and adapt to various question types."
        
        elif "what" in question_lower and "can" in question_lower:
            return "The survey bot can automate survey completion, handle different question types, and work with various survey platforms. It's designed to be efficient and reliable."
        
        else:
            return "I'm here to help with survey automation. The bot can handle various types of surveys and questions, making the process more efficient and consistent."
    
    def switch_personality_mode(self, new_mode: str) -> bool:
        """
        Switch to a different personality mode.
        
        Args:
            new_mode: Name of the mode to switch to
            
        Returns:
            True if successful, False otherwise
        """
        if not self.enhanced_system:
            self.logger.warning("Enhanced system not available. Cannot switch modes.")
            return False
        
        available_modes = self.enhanced_system.list_available_modes()
        if new_mode in available_modes:
            success = self.enhanced_system.switch_mode(new_mode)
            if success:
                self.current_mode = new_mode
                self.logger.info(f"Switched to personality mode: {new_mode}")
                return True
        
        self.logger.warning(f"Mode '{new_mode}' not available. Available modes: {available_modes}")
        return False
    
    def get_available_modes(self) -> List[str]:
        """Get list of available personality modes."""
        if self.enhanced_system:
            return self.enhanced_system.list_available_modes()
        return []
    
    def get_current_mode(self) -> str:
        """Get current personality mode."""
        return self.current_mode
    
    def get_mode_description(self, mode: str) -> Optional[str]:
        """Get description of a specific personality mode."""
        mode_descriptions = self.config.get("enhanced_personality_system", {}).get("mode_descriptions", {})
        return mode_descriptions.get(mode)
    
    async def generate_survey_response(self, 
                                      survey_question: str, 
                                      question_type: str = "text",
                                      context: str = "",
                                      mode: Optional[str] = None) -> str:
        """
        Generate enhanced response specifically for survey questions.
        
        Args:
            survey_question: The survey question to respond to
            question_type: Type of question (text, multiple_choice, rating, etc.)
            context: Additional context about the survey
            mode: Personality mode to use
            
        Returns:
            Enhanced survey response
        """
        # Enhance the question with survey-specific context
        enhanced_context = f"Survey Question Type: {question_type}. Context: {context}"
        
        # Generate response using enhanced system
        response = await self.get_enhanced_response(
            survey_question, 
            enhanced_context, 
            mode
        )
        
        # Post-process for survey-specific requirements
        response = self._post_process_survey_response(response, question_type)
        
        return response
    
    def _post_process_survey_response(self, response: str, question_type: str) -> str:
        """Post-process response for survey-specific requirements."""
        if question_type == "multiple_choice":
            # Ensure response is appropriate for multiple choice
            if len(response) > 200:
                response = response[:200] + "..."
        elif question_type == "rating":
            # Ensure response is concise for rating questions
            if len(response) > 100:
                response = response[:100] + "..."
        
        return response.strip()
    
    def get_conversation_history(self) -> List[Dict[str, Any]]:
        """Get conversation history for analysis."""
        if self.enhanced_system:
            return self.enhanced_system.get_conversation_history()
        return self.conversation_context.copy()
    
    def get_system_status(self) -> Dict[str, Any]:
        """Get status of all personality systems."""
        return {
            "enhanced_system": {
                "available": self.enhanced_system is not None,
                "current_mode": self.current_mode,
                "available_modes": self.get_available_modes()
            },
            "legacy_system": {
                "available": self.legacy_system is not None
            },
            "config": {
                "loaded": bool(self.config),
                "enhanced_enabled": self.config.get("enhanced_personality_system", {}).get("enabled", False)
            }
        }

# Convenience functions for easy integration
async def get_enhanced_bot_response(question: str, 
                                   context: str = "", 
                                   mode: Optional[str] = None) -> str:
    """Get enhanced bot response using the integration system."""
    integration = EnhancedBotIntegration("enhanced_ai_config.json")
    return await integration.get_enhanced_response(question, context, mode)

def get_enhanced_bot_response_sync(question: str, 
                                  context: str = "", 
                                  mode: Optional[str] = None) -> str:
    """Synchronous wrapper for enhanced bot responses."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            # If we're already in an async context, create a new task
            task = asyncio.create_task(get_enhanced_bot_response(question, context, mode))
            return asyncio.run_coroutine_threadsafe(task, loop).result()
        else:
            return asyncio.run(get_enhanced_bot_response(question, context, mode))
    except RuntimeError:
        # Fallback to basic response
        integration = EnhancedBotIntegration("enhanced_ai_config.json")
        return integration._generate_basic_fallback(question, context)

# Integration with existing survey bot components
class SurveyBotEnhancer:
    """
    Enhances existing survey bot components with advanced personality capabilities.
    """
    
    def __init__(self, existing_bot_instance=None):
        self.existing_bot = existing_bot_instance
        self.enhanced_integration = EnhancedBotIntegration("enhanced_ai_config.json")
        self.enhancement_enabled = True
    
    def enhance_response_generation(self, original_response_func):
        """
        Decorator to enhance existing response generation functions.
        
        Args:
            original_response_func: The original response generation function
            
        Returns:
            Enhanced function that uses the personality system
        """
        async def enhanced_response_func(*args, **kwargs):
            if not self.enhancement_enabled:
                return await original_response_func(*args, **kwargs)
            
            try:
                # Extract question and context from arguments
                question = self._extract_question_from_args(args, kwargs)
                context = self._extract_context_from_args(args, kwargs)
                
                # Generate enhanced response
                enhanced_response = await self.enhanced_integration.get_enhanced_response(
                    question, context
                )
                
                return enhanced_response
                
            except Exception as e:
                # Fallback to original function
                logging.warning(f"Enhancement failed: {e}. Using original response.")
                return await original_response_func(*args, **kwargs)
        
        return enhanced_response_func
    
    def _extract_question_from_args(self, args, kwargs):
        """Extract question from function arguments."""
        # Try to find question in various argument positions
        if args and isinstance(args[0], str):
            return args[0]
        elif 'question' in kwargs:
            return kwargs['question']
        elif 'text' in kwargs:
            return kwargs['text']
        elif 'input' in kwargs:
            return kwargs['input']
        else:
            return "How can I help you?"
    
    def _extract_context_from_args(self, args, kwargs):
        """Extract context from function arguments."""
        if 'context' in kwargs:
            return kwargs['context']
        elif 'survey_context' in kwargs:
            return kwargs['survey_context']
        elif 'additional_info' in kwargs:
            return kwargs['additional_info']
        else:
            return ""
    
    def enable_enhancement(self):
        """Enable personality enhancement."""
        self.enhancement_enabled = True
    
    def disable_enhancement(self):
        """Disable personality enhancement."""
        self.enhancement_enabled = False
    
    def get_enhancement_status(self) -> bool:
        """Get current enhancement status."""
        return self.enhancement_enabled

# Example usage and integration
if __name__ == "__main__":
    async def demo_enhanced_system():
        """Demonstrate the enhanced personality system."""
        print("🚀 Enhanced Bot Integration Demo")
        print("=" * 50)
        
        # Initialize integration
        integration = EnhancedBotIntegration("enhanced_ai_config.json")
        
        # Test different modes
        modes = integration.get_available_modes()
        print(f"Available modes: {modes}")
        
        # Test questions
        test_questions = [
            "How does the survey bot work?",
            "What makes this automation different from others?",
            "Can you explain the technical architecture?",
            "What's your experience with survey platforms?"
        ]
        
        for i, question in enumerate(test_questions, 1):
            print(f"\n--- Question {i} ---")
            print(f"Q: {question}")
            
            # Test different modes
            for mode in ["natural_conversation", "human_writer", "discord_casual"]:
                if mode in modes:
                    response = await integration.get_enhanced_response(question, mode=mode)
                    print(f"\n{mode.upper()}: {response[:100]}...")
            
            print("-" * 30)
        
        # Show system status
        print("\n--- System Status ---")
        status = integration.get_system_status()
        print(json.dumps(status, indent=2))
    
    # Run demo
    try:
        asyncio.run(demo_enhanced_system())
    except KeyboardInterrupt:
        print("\nDemo interrupted by user.")
    except Exception as e:
        print(f"Demo failed: {e}")
