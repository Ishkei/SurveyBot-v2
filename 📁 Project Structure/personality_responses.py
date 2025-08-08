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
            model = genai.GenerativeModel('gemini-pro')
        else:
            print("⚠️ GEMINI_API_KEY not found in environment variables.")
    except Exception as e:
        print(f"⚠️ Failed to initialize Gemini: {e}")

class PersonalityResponseGenerator:
    def __init__(self, personality_file: str = None):
        if personality_file is None:
            # Try multiple possible paths for persona.json
            persona_paths = [
                "../⚙️ Configurations/configs/persona.json",
                "../../⚙️ Configurations/configs/persona.json",
                "../../configs/persona.json",
                "../configs/persona.json"
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
                personality_file = "../⚙️ Configurations/configs/persona.json"  # Default fallback
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

Question: {question}
Context: {context}

Generate a natural, conversational response that fits the persona and style. Keep it under 100 words."""

            response = await asyncio.to_thread(
                model.generate_content,
                full_prompt
            )
            
            return response.text.strip()
            
        except Exception as e:
            print(f"⚠️ Error generating response: {e}")
            return self._generate_fallback_response(question, style)

    def _generate_fallback_response(self, question, style="default"):
        """Generate fallback responses when AI API is unavailable."""
        question_lower = question.lower()
        
        # Get persona data for consistent responses
        persona = self.personality_data.get('about_you', {})
        
        if style == "discord_casual":
            # Discord-style casual responses using ACTUAL PERSONA DATA (detailed responses, reduced "imo")
            if "age" in question_lower:
                age = persona.get('age', 25)
                responses = [
                    f"i'm {age}, been coding since i was like 16. pretty standard age for a developer, been in the industry for a few years now.",
                    f"yeah i'm {age}, right in that sweet spot for tech. been working as a dev for about 3 years, still learning new things every day.",
                    f"honestly {age}, old enough to know better, young enough to still mess up. been programming for a while but there's always more to learn.",
                    f"tbh {age}, been in the game for a while now. started coding early and been working professionally for a few years.",
                    f"mostly {age}, been doing this for a bit. started with web development and branched out into different areas."
                ]
            elif "social media" in question_lower or "social" in question_lower:
                responses = [
                    "i use discord and reddit mostly, twitter sometimes. discord for dev communities and reddit for tech discussions, pretty standard for developers.",
                    "yeah discord for dev stuff, insta for memes, reddit for tech. mostly use social media for work-related networking and learning.",
                    "honestly discord like 24/7, reddit for programming, that's about it. not really into other platforms, prefer the tech-focused communities.",
                    "tbh discord and github are my main social media. github for code sharing and discord for developer communities, keeps me connected to the tech world.",
                    "mostly reddit for tech, discord for friends, insta for family. reddit has great programming communities and discord is perfect for real-time discussions."
                ]
            elif "hobby" in question_lower or "interest" in question_lower:
                hobbies = persona.get('hobbies', ['Programming', 'Gaming'])
                interests = persona.get('interests', ['Technology'])
                responses = [
                    f"tbh {', '.join(hobbies[:2]).lower()}, pretty basic dev stuff. also enjoy reading tech blogs and trying out new programming languages.",
                    f"yeah {', '.join(hobbies[:2]).lower()}, and trying new restaurants. love exploring different cuisines when i'm not coding.",
                    f"honestly {', '.join(hobbies[:2]).lower()}, reading tech blogs. always trying to stay updated with the latest in technology.",
                    f"mostly {', '.join(hobbies[:2]).lower()}, and learning new languages. both programming languages and natural languages, keeps the brain active.",
                    f"tbh {', '.join(hobbies[:2]).lower()}, and trying to stay fit. balance is important, especially when you sit at a computer all day."
                ]
            elif "experience" in question_lower or "rate" in question_lower:
                responses = [
                    "pretty good, 8/10 would recommend. been working in tech for a few years and learned a lot along the way.",
                    "yeah solid experience, nothing crazy but reliable. been coding professionally for about 3 years, still learning new things every day.",
                    "honestly 7/10, could be better but gets the job done. experience comes with time and practice, always room for improvement.",
                    "tbh pretty decent, 8.5/10. been fortunate to work on interesting projects and learn from great developers.",
                    "mostly good experience, 8/10, no complaints. every project teaches you something new, keeps things interesting."
                ]
            elif "occupation" in question_lower or "job" in question_lower or "work" in question_lower:
                occupation = persona.get('occupation', 'Software Developer')
                responses = [
                    f"tbh {occupation.lower()}, been doing it for like 3 years. mostly work on web applications and automation tools.",
                    f"yeah i'm a {occupation.lower()}, mostly frontend stuff. also do some backend work when needed, full-stack approach.",
                    f"honestly {occupation.lower()}, working on automation tools. love building things that make life easier for other developers.",
                    f"mostly {occupation.lower()}, jack of all trades. work on different types of projects, keeps things interesting.",
                    f"tbh {occupation.lower()}, python and java mostly. enjoy working with different technologies and learning new frameworks."
                ]
            elif "income" in question_lower or "salary" in question_lower or "money" in question_lower:
                income = persona.get('income', '50000-75000')
                responses = [
                    f"tbh {income}, comfortable, not rich but doing okay. can afford what i need and save a bit for the future.",
                    f"yeah {income}, middle class, can afford what i need. living in a tech hub so the cost of living is high but manageable.",
                    f"honestly {income}, decent salary, nothing crazy but stable. been working hard to improve my skills and increase my earning potential.",
                    f"mostly {income}, good income for my age and experience. been fortunate to work in a field that values technical skills.",
                    f"tbh {income}, comfortable, saving for a house. tech salaries are pretty good, especially with experience."
                ]
            elif "education" in question_lower or "degree" in question_lower or "school" in question_lower:
                education = persona.get('education', 'Bachelor\'s Degree')
                responses = [
                    f"tbh {education.lower()}, pretty standard. computer science degree, learned a lot but the real learning happened on the job.",
                    f"yeah {education.lower()}, learned more from side projects though. school gave me the foundation, but building real projects taught me the most.",
                    f"honestly {education.lower()}, some online courses too. the tech field moves fast, so continuous learning is essential.",
                    f"mostly {education.lower()}, but the real learning was on the job. school teaches theory, work teaches practical application.",
                    f"tbh {education.lower()}, computer science focus. the degree opened doors, but experience is what really matters in tech."
                ]
            elif "location" in question_lower or "city" in question_lower or "state" in question_lower:
                city = persona.get('city', 'Los Angeles')
                state = persona.get('state', 'California')
                responses = [
                    f"tbh {city}, {state}, pretty nice place. great weather and lots of tech opportunities, though it's expensive to live here.",
                    f"yeah {city}, {state}, good tech scene here. lots of startups and established companies, always something interesting happening.",
                    f"honestly {city}, {state}, expensive but worth it. the tech community here is amazing, and the opportunities are endless.",
                    f"mostly {city}, {state}, love the weather. been here for a few years now, great place for a developer to grow their career.",
                    f"tbh {city}, {state}, great for tech jobs. lots of networking opportunities and meetups, perfect for staying connected to the industry."
                ]
            elif "name" in question_lower or "full_name" in question_lower:
                name = persona.get('full_name', 'Alex Johnson')
                responses = [
                    f"tbh {name}, nice to meet you. been using this name professionally for a while now.",
                    f"yeah {name}, been around for a while. pretty standard name, easy to remember and pronounce.",
                    f"honestly {name}, that's me. been using it for work and personal stuff, keeps things simple.",
                    f"mostly {name}, pretty standard name. been using it professionally for a few years now.",
                    f"tbh {name}, easy to remember. been using this name for work and networking, works well."
                ]
            else:
                # Generic but still specific responses (detailed, reduced "imo")
                responses = [
                    "tbh that's a good question, probably something realistic. been thinking about this kind of stuff for a while now.",
                    "yeah honestly just keeping it simple and believable. learned that being authentic works best in most situations.",
                    "honestly i'd go with something that sounds natural. been doing this for a while, so i have a good sense of what works.",
                    "mostly just being myself, nothing too crazy. found that honesty and simplicity usually get the best results.",
                    "tbh keeping it real, not overthinking it. experience has taught me that natural responses work better than forced ones."
                ]
        else:
            # Default responses
            responses = [
                "I would approach this thoughtfully and consider the context carefully.",
                "That's an interesting question that requires careful consideration.",
                "I think the best approach would be to be honest but strategic.",
                "This seems like something that needs a balanced perspective.",
                "I'd probably go with something that feels natural and authentic.",
                "That's a good question that deserves a thoughtful response.",
                "I think the key is to be genuine while being practical.",
                "This calls for a response that's both honest and appropriate.",
                "I'd approach this with care and consideration.",
                "That's something that needs a measured, thoughtful answer."
            ]
        
        return random.choice(responses)

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