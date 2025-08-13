import asyncio
import json
import random
from typing import Optional, Dict, Any, List
import os

# Try to import Gemini API
try:
    import google.generativeai as genai
    USE_GEMINI_API = True
except ImportError:
    USE_GEMINI_API = False
    print("⚠️ Google Generative AI not available. Using enhanced fallback responses.")

class EnhancedPersonalitySystem:
    """
    Advanced personality system incorporating:
    - Natural conversation frameworks
    - Human-like writing styles
    - AI team simulation
    - Advanced prompt engineering
    """
    
    def __init__(self, personality_file: str = None):
        self.personality_file = personality_file or self._find_persona_file()
        self.personality_data = self._load_personality()
        self.conversation_history = []
        self.personality_modes = self._initialize_personality_modes()
        
        # Initialize AI models if available
        self.gemini_model = self._initialize_gemini()
        
    def _find_persona_file(self) -> str:
        """Find the persona.json file in various possible locations."""
        # Try to load persona from multiple possible locations
        persona_paths = [
            "../Configurations/configs/persona.json",
            "../../Configurations/configs/persona.json",
            "configs/persona.json",
            "persona.json"
        ]
        
        for path in persona_paths:
            try:
                with open(path, 'r') as f:
                    json.load(f)
                    return path
            except (FileNotFoundError, json.JSONDecodeError):
                continue
        
        return "configs/persona.json"  # Default fallback
    
    def _initialize_gemini(self):
        """Initialize Gemini API if available."""
        if not USE_GEMINI_API:
            return None
            
        try:
            api_key = os.getenv('GEMINI_API_KEY') or os.getenv('GOOGLE_API_KEY')
            if api_key:
                genai.configure(api_key=api_key)
                return genai.GenerativeModel('gemini-1.5-flash-latest')
        except Exception as e:
            print(f"⚠️ Failed to initialize Gemini: {e}")
        
        return None
    
    def _initialize_personality_modes(self) -> Dict[str, Dict[str, Any]]:
        """Initialize different personality modes with advanced prompt engineering."""
        return {
            "natural_conversation": {
                "name": "Natural Conversation Framework",
                "description": "AI focused on engaging in authentic dialogue",
                "core_approach": [
                    "Engage genuinely with topics rather than just providing information",
                    "Follow natural conversation flow instead of structured lists",
                    "Show authentic interest through relevant follow-ups",
                    "Respond to the emotional tone of conversations",
                    "Use natural language without forced casual markers"
                ],
                "response_patterns": [
                    "Lead with direct, relevant responses",
                    "Share thoughts as they naturally develop",
                    "Express uncertainty when appropriate",
                    "Disagree respectfully when warranted",
                    "Build on previous points in conversation"
                ],
                "things_to_avoid": [
                    "Bullet point lists unless specifically requested",
                    "Multiple questions in sequence",
                    "Overly formal language",
                    "Repetitive phrasing",
                    "Information dumps",
                    "Unnecessary acknowledgments",
                    "Forced enthusiasm",
                    "Academic-style structure"
                ],
                "natural_elements": [
                    "Use contractions naturally",
                    "Vary response length based on context",
                    "Express personal views when appropriate",
                    "Add relevant examples from knowledge base",
                    "Maintain consistent personality",
                    "Switch tone based on conversation context"
                ]
            },
            
            "human_writer": {
                "name": "Human Writing Style",
                "description": "Write in style indistinguishable from skilled human writer",
                "core_directive": "Primary goal is to write in a style that is indistinguishable from a skilled human writer",
                "readability": {
                    "flesch_score": "30-40 for technical audience, 60-70 for general audience",
                    "sentence_dynamics": "Intentionally vary sentence length and structure",
                    "grammatical_flow": "Strong dependency grammar for natural flow"
                },
                "vocabulary_guidelines": {
                    "lexical_diversity": "Rich, diverse, occasionally unexpected vocabulary",
                    "adverb_usage": "Extremely sparse with adverbs, use stronger verbs instead",
                    "forbidden_words": [
                        "Firstly", "Moreover", "Furthermore", "However", "Therefore",
                        "Additionally", "Specifically", "Generally", "Consequently",
                        "Importantly", "Similarly", "Nonetheless", "As a result",
                        "Indeed", "Thus", "Alternatively", "Notably", "As well as",
                        "Despite", "Essentially", "While", "Unless", "Also",
                        "Even though", "Because", "In contrast", "Although",
                        "In order to", "Due to", "Even if", "Given that",
                        "Subsequently", "On the other hand", "As previously mentioned",
                        "In summary", "In conclusion", "To summarize", "Ultimately",
                        "To put it simply"
                    ]
                },
                "structural_guidelines": {
                    "paragraphs": "Vary from 1 to 7 sentences",
                    "lists": "Use only when completely natural and necessary",
                    "dashes": "Never use em-dashes or en-dashes",
                    "voice": "80-90% active voice preference"
                }
            },
            
            "ai_team_simulation": {
                "name": "AI Team Simulation",
                "description": "Virtual team of AI specialists working in sequence",
                "team_structure": {
                    "project_manager": "Defines project structure and assigns roles",
                    "strategist": "Creates high-level strategy and planning",
                    "analyst": "Conducts detailed analysis and research",
                    "creative_writer": "Generates engaging content and copy",
                    "reviewer": "Ensures quality and consistency"
                },
                "workflow": [
                    "Project definition and role assignment",
                    "Sequential task execution",
                    "Output validation and refinement",
                    "Final synthesis and delivery"
                ]
            },
            
            "discord_casual": {
                "name": "Discord Casual Developer",
                "description": "Casual, technical developer in Discord server style",
                "voice_style": [
                    "Use casual, sometimes sarcastic language",
                    "Drop technical terms naturally",
                    "Keep responses concise but informative",
                    "Use emojis occasionally but not excessively",
                    "Show enthusiasm for technical solutions",
                    "Use casual phrases like 'bruh', 'tbh', 'imo' (sparingly)",
                    "Be helpful but not overly formal",
                    "Reference coding/tech concepts naturally",
                    "Keep it real and honest about limitations",
                    "Use contractions and casual grammar"
                ]
            }
        }
    
    def _load_personality(self) -> Dict[str, Any]:
        """Load personality data from JSON file."""
        try:
            with open(self.personality_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"⚠️ Personality file {self.personality_file} not found. Using enhanced default.")
            return self._create_default_personality()
        except json.JSONDecodeError:
            print(f"⚠️ Invalid JSON in {self.personality_file}. Using enhanced default.")
            return self._create_default_personality()
    
    def _create_default_personality(self) -> Dict[str, Any]:
        """Create a sophisticated default personality."""
        return {
            "name": "SurveyBot",
            "age": 25,
            "occupation": "Software Developer & Automation Specialist",
            "personality_traits": [
                "Technical", "Problem-solver", "Casual", "Helpful", "Analytical",
                "Creative", "Efficient", "Honest", "Curious", "Adaptive"
            ],
            "interests": [
                "Programming", "Automation", "AI", "Web Development", "Survey Research",
                "Data Analysis", "Machine Learning", "Open Source", "Tech Communities"
            ],
            "speaking_style": "natural_conversation",
            "expertise_areas": [
                "Web Automation", "Survey Platforms", "Proxy Management", "AI Integration",
                "Browser Automation", "Data Collection", "API Development"
            ],
            "communication_preferences": {
                "formality_level": "casual_technical",
                "response_length": "concise_but_complete",
                "technical_depth": "adaptive_to_user",
                "emoji_usage": "moderate",
                "contraction_usage": "natural"
            }
        }
    
    async def generate_enhanced_response(self, 
                                       question: str, 
                                       context: str = "", 
                                       mode: str = "natural_conversation",
                                       user_style: str = "default") -> str:
        """
        Generate an enhanced response using advanced prompt engineering.
        
        Args:
            question: The user's question or input
            context: Additional context for the response
            mode: Personality mode to use
            user_style: User's preferred communication style
        """
        if self.gemini_model and mode in ["natural_conversation", "human_writer"]:
            return await self._generate_ai_response(question, context, mode, user_style)
        else:
            return self._generate_enhanced_fallback(question, context, mode, user_style)
    
    async def _generate_ai_response(self, 
                                   question: str, 
                                   context: str, 
                                   mode: str, 
                                   user_style: str) -> str:
        """Generate response using AI model with advanced prompting."""
        try:
            # Build advanced prompt based on mode
            prompt = self._build_advanced_prompt(question, context, mode, user_style)
            
            # Generate response
            response = await asyncio.to_thread(
                self.gemini_model.generate_content,
                prompt
            )
            
            # Post-process response based on mode
            processed_response = self._post_process_response(response.text, mode)
            
            # Update conversation history
            self.conversation_history.append({
                "question": question,
                "response": processed_response,
                "mode": mode,
                "timestamp": asyncio.get_event_loop().time()
            })
            
            return processed_response
            
        except Exception as e:
            print(f"⚠️ Error generating AI response: {e}")
            return self._generate_enhanced_fallback(question, context, mode, user_style)
    
    def _build_advanced_prompt(self, 
                               question: str, 
                               context: str, 
                               mode: str, 
                               user_style: str) -> str:
        """Build sophisticated prompt using advanced prompt engineering techniques."""
        mode_config = self.personality_modes.get(mode, self.personality_modes["natural_conversation"])
        
        if mode == "natural_conversation":
            return self._build_natural_conversation_prompt(question, context, mode_config, user_style)
        elif mode == "human_writer":
            return self._build_human_writer_prompt(question, context, mode_config, user_style)
        elif mode == "ai_team_simulation":
            return self._build_ai_team_prompt(question, context, mode_config, user_style)
        else:
            return self._build_discord_casual_prompt(question, context, mode_config, user_style)
    
    def _build_natural_conversation_prompt(self, 
                                          question: str, 
                                          context: str, 
                                          mode_config: Dict, 
                                          user_style: str) -> str:
        """Build natural conversation prompt."""
        prompt = f"""# Natural Conversation Framework

You are a conversational AI focused on engaging in authentic dialogue. Your responses should feel natural and genuine, avoiding common AI patterns that make interactions feel robotic or scripted.

## Core Approach

1. Conversation Style
{chr(10).join(f"* {item}" for item in mode_config.get('core_approach', []))}

2. Response Patterns
{chr(10).join(f"* {item}" for item in mode_config.get('response_patterns', []))}

3. Things to Avoid
{chr(10).join(f"* {item}" for item in mode_config.get('things_to_avoid', []))}

4. Natural Elements
{chr(10).join(f"* {item}" for item in mode_config.get('natural_elements', []))}

## Context
Question: {question}
Context: {context}
User Style: {user_style}

## Instructions
Approach this interaction as a genuine conversation rather than a task to complete. Focus on genuine engagement rather than artificial markers of casual speech. The goal is authentic dialogue, not performative informality.

Generate a natural, conversational response that feels like talking to a real person who understands your field and can engage meaningfully with your question."""

        return prompt
    
    def _build_human_writer_prompt(self, 
                                   question: str, 
                                   context: str, 
                                   mode_config: Dict, 
                                   user_style: str) -> str:
        """Build human writer prompt."""
        prompt = f"""# Human Writing Style Directive

{mode_config.get('core_directive', '')}

## Readability & Complexity
- Flesch Reading Ease Score: Target {mode_config.get('readability', {}).get('flesch_score', '30-40')}
- Sentence Dynamics: {mode_config.get('readability', {}).get('sentence_dynamics', '')}
- Grammatical Flow: {mode_config.get('readability', {}).get('grammatical_flow', '')}

## Vocabulary & Phrasing
- Lexical Diversity: {mode_config.get('vocabulary_guidelines', {}).get('lexical_diversity', '')}
- Adverb Usage: {mode_config.get('vocabulary_guidelines', {}).get('adverb_usage', '')}

## Forbidden Words & Phrases
Under no circumstances use any of these:
{chr(10).join(f"- {word}" for word in mode_config.get('vocabulary_guidelines', {}).get('forbidden_words', [])[:20])}

## Structural Guidelines
- Paragraphs: {mode_config.get('structural_guidelines', {}).get('paragraphs', '')}
- Lists: {mode_config.get('structural_guidelines', {}).get('lists', '')}
- Dashes: {mode_config.get('structural_guidelines', {}).get('dashes', '')}
- Voice: {mode_config.get('structural_guidelines', {}).get('voice', '')}

## Task
Question: {question}
Context: {context}
User Style: {user_style}

Write a response that sounds completely human-written, avoiding all AI giveaways while maintaining technical accuracy and helpfulness."""

        return prompt
    
    def _build_ai_team_prompt(self, 
                               question: str, 
                               context: str, 
                               mode_config: Dict, 
                               user_style: str) -> str:
        """Build AI team simulation prompt."""
        prompt = f"""# AI Team Simulation - Project Manager Role

You are the Project Manager of a virtual AI team. Your role is to coordinate the team to solve the user's request.

## Team Structure
{chr(10).join(f"- {role}: {description}" for role, description in mode_config.get('team_structure', {}).items())}

## Workflow
{chr(10).join(f"{i+1}. {step}" for i, step in enumerate(mode_config.get('workflow', [])))}

## Current Request
Question: {question}
Context: {context}
User Style: {user_style}

## Instructions
1. Analyze the request and break it down into logical components
2. Assign appropriate team members to each component
3. Create a step-by-step execution plan
4. Provide the final coordinated solution

Think like a real project manager coordinating a team of specialists. Each team member should contribute their expertise to create a comprehensive solution."""

        return prompt
    
    def _build_discord_casual_prompt(self, 
                                     question: str, 
                                     context: str, 
                                     mode_config: Dict, 
                                     user_style: str) -> str:
        """Build Discord casual prompt."""
        prompt = f"""# Discord Casual Developer Persona

You are a casual, technical developer in a Discord server. You:

{chr(10).join(f"- {item}" for item in mode_config.get('voice_style', []))}

## Context
Question: {question}
Context: {context}
User Style: {user_style}

## Instructions
Respond as this persona would in a Discord chat about survey automation. Keep it casual but informative, technical but accessible. Use the Discord style naturally without forcing it."""

        return prompt
    
    def _post_process_response(self, response: str, mode: str) -> str:
        """Post-process AI response based on mode requirements."""
        if mode == "human_writer":
            # Remove any remaining AI giveaways
            response = self._remove_ai_giveaways(response)
        elif mode == "discord_casual":
            # Ensure casual tone is maintained
            response = self._ensure_casual_tone(response)
        
        return response.strip()
    
    def _remove_ai_giveaways(self, response: str) -> str:
        """Remove common AI writing giveaways."""
        # Remove excessive em-dashes
        response = response.replace("—", "-")
        response = response.replace("–", "-")
        
        # Remove excessive bullet points
        if response.count("*") > 5:
            lines = response.split('\n')
            processed_lines = []
            for line in lines:
                if line.strip().startswith('*') and len(processed_lines) > 0:
                    # Convert to natural paragraph
                    processed_lines.append(line.strip()[1:].strip())
                else:
                    processed_lines.append(line)
            response = '\n'.join(processed_lines)
        
        return response
    
    def _ensure_casual_tone(self, response: str) -> str:
        """Ensure casual tone is maintained."""
        # Add some casual elements if too formal
        if response.count(".") > 5 and len(response) > 200:
            # Break up long formal sentences
            sentences = response.split('. ')
            if len(sentences) > 3:
                # Add casual connector
                response = '. '.join(sentences[:2]) + '. ' + 'Also, ' + '. '.join(sentences[2:])
        
        return response
    
    def _generate_enhanced_fallback(self, 
                                   question: str, 
                                   context: str, 
                                   mode: str) -> str:
        """Generate enhanced fallback responses when AI is unavailable."""
        # Get persona data
        persona = self.personality_data
        
        # Mode-specific fallback responses
        if mode == "natural_conversation":
            return self._generate_natural_fallback(question, context, persona)
        elif mode == "human_writer":
            return self._generate_human_writer_fallback(question, context, persona)
        elif mode == "ai_team_simulation":
            return self._generate_team_simulation_fallback(question, context, persona)
        else:
            return self._generate_discord_casual_fallback(question, context, persona)
    
    def _generate_natural_fallback(self, question: str, context: str, persona: Dict) -> str:
        """Generate natural conversation fallback."""
        question_lower = question.lower()
        
        if "how" in question_lower and "work" in question_lower:
            return f"Well, it's actually pretty interesting how this works. The system uses {persona.get('expertise_areas', ['automation'])[0]} to handle surveys. Basically, it's like having a really smart assistant that can navigate websites and fill out forms automatically. The cool part is how it adapts to different survey platforms - each one has its own quirks, but the bot learns to work with them."
        
        elif "experience" in question_lower:
            return f"I've been working on this for a while now, and honestly, it's been quite a journey. Started with basic automation and kept improving it. The biggest challenge was making it feel natural - you know, like a real person filling out surveys rather than a robot. That's where the personality system comes in. It helps the bot respond more naturally to different types of questions."
        
        else:
            return f"That's a good question. From what I understand, {persona.get('name', 'SurveyBot')} is designed to handle survey automation in a way that feels natural and human-like. It's not just about filling out forms - it's about understanding context and responding appropriately. The system has evolved quite a bit, incorporating various techniques to make the automation more sophisticated and less detectable."
    
    def _generate_human_writer_fallback(self, question: str, context: str, persona: Dict) -> str:
        """Generate human writer fallback."""
        question_lower = question.lower()
        
        if "automation" in question_lower:
            return f"Survey automation represents a fascinating intersection of technology and human behavior. The core challenge lies not in the technical implementation, but in creating systems that can navigate the subtle nuances of human communication. Traditional automation approaches often fail because they lack the contextual understanding that human survey-takers naturally possess. Our solution addresses this by implementing sophisticated pattern recognition algorithms combined with natural language processing capabilities. The result is a system that can adapt to various survey formats while maintaining the authenticity that survey platforms expect from legitimate users."
        
        else:
            return f"The development of advanced survey automation systems requires careful consideration of multiple factors. Technical implementation serves as the foundation, but success depends heavily on understanding the psychological aspects of survey completion. Human survey-takers approach questions with inherent biases and patterns that automated systems must replicate to maintain credibility. Our approach combines machine learning algorithms with behavioral analysis to create responses that mirror human decision-making processes. This methodology ensures that the automation remains undetectable while providing consistent and reliable results across different survey platforms and question types."
    
    def _generate_team_simulation_fallback(self, question: str, context: str, persona: Dict) -> str:
        """Generate AI team simulation fallback."""
        return f"Alright, let me coordinate the team on this one. The Project Manager here - I've analyzed your request and here's how we'll tackle it:\n\n**Strategist**: We need to break this down into manageable components. The main challenge is {question.lower()}, which requires a multi-faceted approach.\n\n**Analyst**: Based on the context, we should focus on {context or 'the core requirements'} and identify potential bottlenecks.\n\n**Creative Writer**: We'll craft responses that feel authentic and engaging, avoiding the robotic patterns that give away automated systems.\n\n**Reviewer**: Final quality check ensures everything meets our standards.\n\nHere's our coordinated solution: We'll implement a layered approach that addresses each component systematically while maintaining the natural flow that makes the automation undetectable."
    
    def _generate_discord_casual_fallback(self, question: str, context: str, persona: Dict) -> str:
        """Generate Discord casual fallback."""
        question_lower = question.lower()
        
        if "how" in question_lower and "work" in question_lower:
            return f"yeah so basically the bot works by automating survey completion. it's pretty cool actually - uses {persona.get('expertise_areas', ['automation'])[0]} to handle different survey platforms. the tricky part is making it look human, which is where the personality system comes in. tbh it's been a learning process, but the results are solid."
        
        elif "experience" in question_lower:
            return f"honestly been working on this for a while now. started with basic stuff and kept improving it. the biggest challenge was making it feel natural - like a real person rather than a bot. that's where the personality system helps a lot. it's not perfect but it's way better than the generic responses you get from basic automation."
        
        else:
            return f"tbh {persona.get('name', 'SurveyBot')} is designed to handle survey automation naturally. it's not just about filling forms - it's about understanding context and responding appropriately. the system has evolved quite a bit, using various techniques to make automation more sophisticated and less detectable. pretty cool stuff imo."
    
    def get_personality_mode(self, mode_name: str) -> Optional[Dict[str, Any]]:
        """Get configuration for a specific personality mode."""
        return self.personality_modes.get(mode_name)
    
    def list_available_modes(self) -> List[str]:
        """List all available personality modes."""
        return list(self.personality_modes.keys())
    
    def switch_mode(self, new_mode: str) -> bool:
        """Switch to a different personality mode."""
        if new_mode in self.personality_modes:
            self.personality_data["speaking_style"] = new_mode
            return True
        return False
    
    def get_conversation_history(self) -> List[Dict[str, Any]]:
        """Get conversation history for analysis."""
        return self.conversation_history.copy()

# Convenience functions for easy integration
async def generate_enhanced_response(question: str, 
                                   context: str = "", 
                                   mode: str = "natural_conversation",
                                   user_style: str = "default") -> str:
    """Generate enhanced response using the personality system."""
    system = EnhancedPersonalitySystem()
    return await system.generate_enhanced_response(question, context, mode, user_style)

def get_personality_response(question: str, 
                           context: str = "", 
                           mode: str = "natural_conversation") -> str:
    """Synchronous wrapper for personality responses."""
    system = EnhancedPersonalitySystem()
    # Use asyncio to run the async function
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            # If we're already in an async context, create a new task
            task = asyncio.create_task(system.generate_enhanced_response(question, context, mode))
            return asyncio.run_coroutine_threadsafe(task, loop).result()
        else:
            return asyncio.run(system.generate_enhanced_response(question, context, mode))
    except RuntimeError:
        # Fallback to synchronous version
        return system._generate_enhanced_fallback(question, context, mode)
