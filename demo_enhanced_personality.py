#!/usr/bin/env python3
"""
Enhanced Personality System Demo

This script demonstrates the advanced personality system with different modes:
- Natural Conversation Framework
- Human Writing Style
- AI Team Simulation
- Discord Casual Developer

Run this script to see how the enhanced system works with various personality modes.
"""

# Suppress warnings during initialization for cleaner output
import warnings
warnings.filterwarnings('ignore')

import asyncio
import json
import time
from typing import List, Dict, Any

# Try to import the enhanced system
try:
    from enhanced_personality_system import EnhancedPersonalitySystem
    from enhanced_bot_integration import EnhancedBotIntegration
    ENHANCED_SYSTEM_AVAILABLE = True
except ImportError as e:
    print(f"⚠️ Enhanced system not available: {e}")
    ENHANCED_SYSTEM_AVAILABLE = False

class EnhancedPersonalityDemo:
    """Demonstrates the enhanced personality system capabilities."""
    
    def __init__(self):
        self.enhanced_system = None
        self.integration = None
        self.demo_questions = self._get_demo_questions()
        
        if ENHANCED_SYSTEM_AVAILABLE:
            self._initialize_systems()
    
    def _initialize_systems(self):
        """Initialize the enhanced personality systems."""
        try:
            self.enhanced_system = EnhancedPersonalitySystem()
            self.integration = EnhancedBotIntegration()
            print("✅ Enhanced personality systems initialized successfully!")
        except Exception as e:
            print(f"⚠️ Failed to initialize enhanced systems: {e}")
            self.enhanced_system = None
            self.integration = None
    
    def _get_demo_questions(self) -> List[Dict[str, str]]:
        """Get demo questions for testing different personality modes."""
        return [
            {
                "question": "How does the survey bot work?",
                "context": "User is asking about the technical implementation",
                "category": "technical_explanation"
            },
            {
                "question": "What makes this automation different from others?",
                "context": "User wants to understand unique features",
                "category": "feature_comparison"
            },
            {
                "question": "Can you explain the technical architecture?",
                "context": "User is a developer asking for technical details",
                "category": "technical_architecture"
            },
            {
                "question": "What's your experience with survey platforms?",
                "context": "User wants to know about platform expertise",
                "category": "experience_question"
            },
            {
                "question": "How do you handle different types of questions?",
                "context": "User is curious about question handling capabilities",
                "category": "capability_question"
            },
            {
                "question": "What challenges have you faced with automation?",
                "context": "User wants to understand real-world challenges",
                "category": "challenge_discussion"
            }
        ]
    
    async def demo_natural_conversation(self):
        """Demonstrate natural conversation framework."""
        print("\n" + "="*60)
        print("🌟 NATURAL CONVERSATION FRAMEWORK DEMO")
        print("="*60)
        
        if not self.enhanced_system:
            print("⚠️ Enhanced system not available for demo.")
            return
        
        print("This mode focuses on engaging in authentic dialogue, avoiding robotic patterns.")
        print("Key features:")
        print("- Genuine topic engagement")
        print("- Natural conversation flow")
        print("- Authentic interest and follow-ups")
        print("- Emotional tone responsiveness")
        
        for i, q_data in enumerate(self.demo_questions[:3], 1):
            print(f"\n--- Demo {i}: {q_data['category'].replace('_', ' ').title()} ---")
            print(f"Q: {q_data['question']}")
            print(f"Context: {q_data['context']}")
            
            try:
                response = await self.enhanced_system.generate_enhanced_response(
                    q_data['question'], 
                    q_data['context'], 
                    "natural_conversation"
                )
                print(f"\nResponse: {response}")
            except Exception as e:
                print(f"⚠️ Error generating response: {e}")
            
            print("-" * 40)
            await asyncio.sleep(1)  # Brief pause between demos
    
    async def demo_human_writer(self):
        """Demonstrate human writing style."""
        print("\n" + "="*60)
        print("✍️ HUMAN WRITING STYLE DEMO")
        print("="*60)
        
        if not self.enhanced_system:
            print("⚠️ Enhanced system not available for demo.")
            return
        
        print("This mode writes in a style indistinguishable from skilled human writers.")
        print("Key features:")
        print("- Rich, diverse vocabulary")
        print("- Natural sentence dynamics")
        print("- Avoids AI giveaways")
        print("- Professional yet engaging tone")
        
        for i, q_data in enumerate(self.demo_questions[1:4], 1):
            print(f"\n--- Demo {i}: {q_data['category'].replace('_', ' ').title()} ---")
            print(f"Q: {q_data['question']}")
            print(f"Context: {q_data['context']}")
            
            try:
                response = await self.enhanced_system.generate_enhanced_response(
                    q_data['question'], 
                    q_data['context'], 
                    "human_writer"
                )
                print(f"\nResponse: {response}")
            except Exception as e:
                print(f"⚠️ Error generating response: {e}")
            
            print("-" * 40)
            await asyncio.sleep(1)
    
    async def demo_ai_team_simulation(self):
        """Demonstrate AI team simulation."""
        print("\n" + "="*60)
        print("👥 AI TEAM SIMULATION DEMO")
        print("="*60)
        
        if not self.enhanced_system:
            print("⚠️ Enhanced system not available for demo.")
            return
        
        print("This mode simulates a virtual team of AI specialists working together.")
        print("Team structure:")
        print("- Project Manager: Coordinates and assigns roles")
        print("- Strategist: Creates high-level strategy")
        print("- Analyst: Conducts detailed analysis")
        print("- Creative Writer: Generates engaging content")
        print("- Reviewer: Ensures quality and consistency")
        
        for i, q_data in enumerate(self.demo_questions[2:5], 1):
            print(f"\n--- Demo {i}: {q_data['category'].replace('_', ' ').title()} ---")
            print(f"Q: {q_data['question']}")
            print(f"Context: {q_data['context']}")
            
            try:
                response = await self.enhanced_system.generate_enhanced_response(
                    q_data['question'], 
                    q_data['context'], 
                    "ai_team_simulation"
                )
                print(f"\nResponse: {response}")
            except Exception as e:
                print(f"⚠️ Error generating response: {e}")
            
            print("-" * 40)
            await asyncio.sleep(1)
    
    async def demo_discord_casual(self):
        """Demonstrate Discord casual developer style."""
        print("\n" + "="*60)
        print("💬 DISCORD CASUAL DEVELOPER DEMO")
        print("="*60)
        
        if not self.enhanced_system:
            print("⚠️ Enhanced system not available for demo.")
            return
        
        print("This mode mimics a casual, technical developer in a Discord server.")
        print("Key features:")
        print("- Casual, sometimes sarcastic language")
        print("- Technical terms dropped naturally")
        print("- Concise but informative responses")
        print("- Occasional emojis and casual phrases")
        
        for i, q_data in enumerate(self.demo_questions[3:6], 1):
            print(f"\n--- Demo {i}: {q_data['category'].replace('_', ' ').title()} ---")
            print(f"Q: {q_data['question']}")
            print(f"Context: {q_data['context']}")
            
            try:
                response = await self.enhanced_system.generate_enhanced_response(
                    q_data['question'], 
                    q_data['context'], 
                    "discord_casual"
                )
                print(f"\nResponse: {response}")
            except Exception as e:
                print(f"⚠️ Error generating response: {e}")
            
            print("-" * 40)
            await asyncio.sleep(1)
    
    async def demo_mode_switching(self):
        """Demonstrate dynamic mode switching."""
        print("\n" + "="*60)
        print("🔄 DYNAMIC MODE SWITCHING DEMO")
        print("="*60)
        
        if not self.integration:
            print("⚠️ Integration system not available for demo.")
            return
        
        print("This demo shows how the system can switch between personality modes dynamically.")
        
        # Get available modes
        available_modes = self.integration.get_available_modes()
        print(f"Available modes: {', '.join(available_modes)}")
        
        # Test mode switching
        test_question = "How do you handle complex survey scenarios?"
        test_context = "User is asking about advanced automation capabilities"
        
        print(f"\nTest Question: {test_question}")
        print(f"Context: {test_context}")
        
        for mode in available_modes[:3]:  # Test first 3 modes
            print(f"\n--- Testing Mode: {mode.upper()} ---")
            
            try:
                # Switch to the mode
                success = self.integration.switch_personality_mode(mode)
                if success:
                    print(f"✅ Switched to {mode} mode")
                    
                    # Generate response
                    response = await self.integration.get_enhanced_response(
                        test_question, 
                        test_context, 
                        mode
                    )
                    print(f"Response: {response[:150]}...")
                else:
                    print(f"❌ Failed to switch to {mode} mode")
                    
            except Exception as e:
                print(f"⚠️ Error with {mode} mode: {e}")
            
            print("-" * 30)
            await asyncio.sleep(1)
    
    async def demo_integration_features(self):
        """Demonstrate integration features."""
        print("\n" + "="*60)
        print("🔗 INTEGRATION FEATURES DEMO")
        print("="*60)
        
        if not self.integration:
            print("⚠️ Integration system not available for demo.")
            return
        
        print("This demo showcases the integration capabilities and system status.")
        
        # Show system status
        print("\n--- System Status ---")
        status = self.integration.get_system_status()
        print(json.dumps(status, indent=2))
        
        # Show conversation history
        print("\n--- Conversation History ---")
        history = self.integration.get_conversation_history()
        if history:
            for i, entry in enumerate(history[-3:], 1):  # Show last 3 entries
                print(f"{i}. {entry.get('question', 'N/A')[:50]}...")
        else:
            print("No conversation history yet.")
        
        # Test survey-specific response generation
        print("\n--- Survey Response Generation ---")
        survey_question = "What is your favorite programming language?"
        question_type = "text"
        context = "Survey about developer preferences"
        
        try:
            survey_response = await self.integration.generate_survey_response(
                survey_question, 
                question_type, 
                context
            )
            print(f"Survey Question: {survey_question}")
            print(f"Question Type: {question_type}")
            print(f"Context: {context}")
            print(f"Generated Response: {survey_response}")
        except Exception as e:
            print(f"⚠️ Error generating survey response: {e}")
    
    async def run_full_demo(self):
        """Run the complete enhanced personality system demo."""
        print("🚀 ENHANCED PERSONALITY SYSTEM - FULL DEMO")
        print("="*60)
        print("This demo showcases the advanced personality system with multiple modes.")
        print("Each mode demonstrates different aspects of AI personality and response generation.")
        
        if not ENHANCED_SYSTEM_AVAILABLE:
            print("\n⚠️ Enhanced system components not available.")
            print("Please ensure all required modules are installed and accessible.")
            return
        
        # Run all demo sections
        await self.demo_natural_conversation()
        await self.demo_human_writer()
        await self.demo_ai_team_simulation()
        await self.demo_discord_casual()
        await self.demo_mode_switching()
        await self.demo_integration_features()
        
        print("\n" + "="*60)
        print("🎉 DEMO COMPLETED SUCCESSFULLY!")
        print("="*60)
        print("The enhanced personality system provides:")
        print("✅ Natural conversation abilities")
        print("✅ Human-like writing styles")
        print("✅ AI team simulation")
        print("✅ Casual developer personas")
        print("✅ Dynamic mode switching")
        print("✅ Seamless integration")
        print("\nYour survey bot is now enhanced with advanced AI capabilities!")

def main():
    """Main function to run the demo."""
    print("Enhanced Personality System Demo")
    print("=" * 40)
    
    # Create demo instance
    demo = EnhancedPersonalityDemo()
    
    # Run the demo
    try:
        asyncio.run(demo.run_full_demo())
    except KeyboardInterrupt:
        print("\n\nDemo interrupted by user.")
    except Exception as e:
        print(f"\nDemo failed with error: {e}")
        print("Please check that all required modules are available.")

if __name__ == "__main__":
    main()
