import asyncio
import json
import random
from typing import Optional, Dict, Any
import os

# Try to import Gemini API
try:
    import google.generativeai as genai
    USE_GEMINI_API = True
except ImportError:
    USE_GEMINI_API = False
    print("⚠️ Google Generative AI not available. Using fallback responses.")

# Initialize Gemini if available
model = None
if USE_GEMINI_API:
    try:
        api_key = os.getenv('GEMINI_API_KEY') or os.getenv('GOOGLE_API_KEY')
        if api_key:
            genai.configure(api_key=api_key)
            # Use environment variable for model or default to gemini-1.5-flash-latest
            model_name = os.getenv('AI_MODEL', 'gemini-1.5-flash-latest')
            model = genai.GenerativeModel(model_name)
        else:
            print("⚠️ GEMINI_API_KEY not found in environment variables.")
    except Exception as e:
        print(f"⚠️ Failed to initialize Gemini: {e}")

class PersonalityResponseGenerator:
    def __init__(self, personality_file: str = None):
        if personality_file is None:
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
                        json.load(f)  # Test if file exists and is valid JSON
                        personality_file = path
                        break
                except (FileNotFoundError, json.JSONDecodeError):
                    continue
            
            if personality_file is None:
                personality_file = "../Configurations/configs/persona.json"  # Default fallback
        self.personality_file = personality_file
        self.personality_data = self._load_personality()
        
        # Discord-style personality prompt
        self.discord_personality_prompt = """You are a casual, technical developer in a Discord server. You:
- Use casual, sometimes sarcastic language
- Drop technical terms naturally
- Keep responses concise but informative  
- Use emojis occasionally but not excessively
- Show enthusiasm for technical solutions
- Sometimes use "bruh", "lmao", "tbh", "imo" etc.
- Be helpful but not overly formal
- Reference coding/tech concepts naturally
- Keep it real and honest about limitations
- Use contractions and casual grammar

Respond as this persona would in a Discord chat about survey automation."""

    def _load_personality(self) -> Dict[str, Any]:
        """Load personality data from JSON file."""
        try:
            with open(self.personality_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"⚠️ Personality file {self.personality_file} not found. Using default.")
            return {
                "name": "SurveyBot",
                "age": 25,
                "occupation": "Software Developer",
                "personality_traits": [
                    "Technical", "Problem-solver", "Casual", "Helpful"
                ],
                "interests": ["Programming", "Automation", "AI", "Web Development"],
                "speaking_style": "casual_technical"
            }
        except json.JSONDecodeError:
            print(f"⚠️ Invalid JSON in {self.personality_file}. Using default.")
            return {"name": "SurveyBot", "personality_traits": ["Technical"]}

    async def generate_response(self, question, context="", style: str = "default"):
        """Generate a natural response to an open-ended question."""
        # If Gemini API is not available, use fallback responses
        if not USE_GEMINI_API or model is None:
            return self._generate_fallback_response(question, style)
        
        try:
            style_rules = ""
            if style == "discord_casual":
                # Discord AI Survey Club style: concise, casual, technical when needed
                style_rules = (
                    "\nVOICE & STYLE (discord_casual):\n"
                    "- Use casual, technical language like a Discord dev\n"
                    "- Keep it concise but informative\n"
                    "- Use contractions (don't, can't, etc.)\n"
                    "- Drop technical terms naturally\n"
                    "- Be enthusiastic about solutions\n"
                    "- Use casual phrases like 'bruh', 'tbh', 'imo'\n"
                    "- Reference coding/automation naturally\n"
                    "- Keep it real about limitations\n"
                    "- Use emojis sparingly but appropriately\n"
                    "- Sound like you're chatting in a dev Discord server"
                )
            
            full_prompt = f"""{self.discord_personality_prompt if style == "discord_casual" else self.personality_data.get('speaking_style', 'casual')}

{style_rules}

IMPORTANT: Write like a real human, not a bot. Avoid:
- Multiple dashes or hyphens
- Excessive spaces between words
- Multiple exclamation marks or question marks
- Repetitive punctuation
- Overly formal or robotic language

Question: {question}
Context: {context}

Generate a natural, conversational response that fits the persona and style. Keep it under 100 words. Write like you're actually talking to someone, not like a survey bot."""

            response = await asyncio.to_thread(
                model.generate_content,
                full_prompt
            )
            
            # Clean the AI response to remove bot-like patterns
            cleaned_response = self._clean_response(response.text.strip())
            return cleaned_response
            
        except Exception as e:
            print(f"⚠️ Error generating response: {e}")
            return self._generate_fallback_response(question, style)

    def _generate_fallback_response(self, question, style="default"):
        """Generate fallback responses when AI API is unavailable."""
        question_lower = question.lower()
        
        # Get persona data for consistent responses
        persona = self.personality_data.get('about_you', {})
        
        if style == "discord_casual":
            # Discord-style casual responses using ACTUAL PERSONA DATA (natural, no excessive punctuation)
            if "age" in question_lower:
                age = persona.get('age', 25)
                responses = [
                    f"i'm {age}, been coding since i was like 16. pretty standard age for a developer, been in the industry for a few years now.",
                    f"yeah i'm {age}, right in that sweet spot for tech. been working as a dev for about 3 years, still learning new things every day.",
                    f"honestly {age}, old enough to know better, young enough to still mess up. been programming for a while but there's always more to learn.",
                    f"tbh {age}, been in the game for a while now. started coding early and been working professionally for a few years.",
                    f"mostly {age}, been doing this for a bit. started with web development and branched out into different areas."
                ]
            elif "join" in question_lower or "start" in question_lower or "why" in question_lower:
                responses = [
                    "honestly just looking for ways to make some extra money. i spend a lot of time online anyway, might as well get paid for it.",
                    "saw an ad and thought why not. always been interested in surveys and market research, plus the extra cash doesn't hurt.",
                    "friend recommended it to me. been doing surveys for a while now, it's a decent way to earn some side income.",
                    "just trying to diversify my income streams. i work in tech so i'm comfortable with online platforms and surveys.",
                    "honestly just curious about how these platforms work. plus earning money while sharing opinions seems like a win-win."
                ]
            elif "technology" in question_lower or "tech" in question_lower:
                responses = [
                    "tech is pretty much my life at this point. i work in software development so i'm constantly surrounded by it.",
                    "love technology honestly. been working with computers since i was a kid, it's just second nature now.",
                    "tech is awesome. i use it for work, entertainment, pretty much everything. can't imagine life without it.",
                    "really into technology. i work in the field so i'm always learning about new tools and platforms.",
                    "tech is great. been working with it professionally for years, always something new to discover."
                ]
            elif "hobbies" in question_lower or "interests" in question_lower:
                responses = [
                    "mostly coding and gaming. i like building things and solving problems, plus gaming helps me relax.",
                    "big into programming and automation. love finding ways to make repetitive tasks easier with code.",
                    "coding is my main hobby honestly. also into reading tech blogs and staying updated with new technologies.",
                    "programming and gaming mostly. i enjoy creating things and gaming is a good way to unwind.",
                    "love coding and learning new technologies. also into gaming and reading about tech trends."
                ]
            elif "work" in question_lower or "job" in question_lower:
                responses = [
                    "i work as a software developer. mostly web development and automation, pretty standard tech job.",
                    "software developer by day. i build web applications and automate processes, it's interesting work.",
                    "i'm a dev, work on web apps and automation tools. been doing it for a few years now, still learning.",
                    "work in software development. mostly web stuff and automation, it's challenging but rewarding.",
                    "i'm a developer, work on web applications and automation. been in the field for a while now."
                ]
            elif "income" in question_lower or "money" in question_lower or "earn" in question_lower:
                responses = [
                    "just looking for some extra cash honestly. every little bit helps, especially with current prices.",
                    "trying to build up some savings. surveys are a decent way to earn a bit extra without much effort.",
                    "extra income is always welcome. i work full time but surveys help with discretionary spending.",
                    "just trying to supplement my income. surveys are flexible and don't require much time investment.",
                    "looking to earn some extra money. surveys are convenient since i can do them whenever i have time."
                ]
            else:
                # Generic responses for other questions
                responses = [
                    "honestly just trying to be helpful and earn some money. surveys seem like a good way to do both.",
                    "just looking for ways to make some extra cash. surveys are flexible and don't take much time.",
                    "trying to diversify my income. surveys are convenient and i can do them on my own schedule.",
                    "just exploring different ways to earn money. surveys seem like a good option for extra income.",
                    "honestly just curious about these platforms. plus earning money while sharing opinions is appealing."
                ]
        else:
            # Default style responses (more formal but still natural)
            if "join" in question_lower or "start" in question_lower or "why" in question_lower:
                responses = [
                    "I joined this platform to earn some extra income. I spend a lot of time online and thought this would be a good way to make money while sharing my opinions.",
                    "I was looking for ways to supplement my income and this platform seemed like a good opportunity. I enjoy taking surveys and providing feedback.",
                    "A friend recommended this platform to me. I've been interested in market research and thought this would be a good way to participate while earning money.",
                    "I joined because I wanted to diversify my income streams. I work in technology and am comfortable with online platforms.",
                    "I was curious about how these platforms work and wanted to try earning money through surveys. It seemed like a good way to learn and earn."
                ]
            elif "technology" in question_lower or "tech" in question_lower:
                responses = [
                    "Technology is a big part of my life. I work in software development so I'm constantly surrounded by it and always learning new things.",
                    "I love technology and have been working with computers since I was young. It's become second nature to me.",
                    "Technology is fascinating to me. I work in the field and enjoy staying updated with new developments and tools.",
                    "I'm very comfortable with technology. I use it for work, entertainment, and daily tasks. It's an integral part of my life.",
                    "Technology is great. I've been working with it professionally for years and there's always something new to discover."
                ]
            elif "hobbies" in question_lower or "interests" in question_lower:
                responses = [
                    "My main hobbies are programming and gaming. I enjoy building things and solving problems, and gaming helps me relax.",
                    "I'm really into coding and automation. I love finding ways to make repetitive tasks easier and more efficient.",
                    "Programming is my primary hobby. I also enjoy reading about technology and staying updated with new developments.",
                    "I love coding and learning new technologies. Gaming is also a big interest of mine and helps me unwind.",
                    "My interests are mainly in programming and technology. I enjoy creating things and learning about new tools and platforms."
                ]
            else:
                responses = [
                    "I joined this platform to earn extra income while sharing my opinions. I find surveys interesting and appreciate the opportunity to provide feedback.",
                    "I was looking for ways to supplement my income and this platform seemed like a good fit. I enjoy participating in market research.",
                    "I joined because I wanted to explore different income opportunities. Surveys are convenient and I can do them on my own schedule.",
                    "I was curious about these platforms and wanted to try earning money through surveys. It seemed like a good way to learn and earn.",
                    "I joined to diversify my income streams. I work in technology and am comfortable with online platforms and surveys."
                ]
        
        # Return a random response and clean it up
        response = random.choice(responses)
        return self._clean_response(response)
    
    def _clean_response(self, response):
        """Clean up response to remove bot-like patterns."""
        # Remove excessive dashes
        response = response.replace(' - ', ' ')
        response = response.replace('--', '')
        response = response.replace(' -', '')
        response = response.replace('- ', '')
        
        # Remove excessive spaces
        response = ' '.join(response.split())
        
        # Remove excessive punctuation
        response = response.replace('!!!', '!')
        response = response.replace('??', '?')
        response = response.replace('...', '.')
        
        # Remove unnecessary question marks at the end of statements
        if response.endswith('?') and not any(word in response.lower() for word in ['what', 'how', 'why', 'when', 'where', 'who', 'which']):
            response = response.rstrip('?')
        
        # Remove excessive exclamation marks
        response = response.replace('!!', '!')
        
        # Clean up spacing around punctuation
        response = response.replace(' .', '.')
        response = response.replace(' ,', ',')
        response = response.replace(' !', '!')
        response = response.replace(' ?', '?')
        
        return response.strip()

# Global instance
personality_generator = PersonalityResponseGenerator()

async def generate_personality_response(question: str, context: str = "", style: str = "default") -> str:
    """Generate a personality-based response to a question."""
    return await personality_generator.generate_response(question, context, style)

# For backward compatibility
def get_personality_response(question: str, context: str = "") -> str:
    """Synchronous wrapper for personality response generation."""
    try:
        loop = asyncio.get_event_loop()
        return loop.run_until_complete(generate_personality_response(question, context))
    except RuntimeError:
        # If no event loop is running, create a new one
        return asyncio.run(generate_personality_response(question, context))