import os
import json
import asyncio
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
USE_GEMINI_API = GOOGLE_API_KEY and GOOGLE_API_KEY != "YOUR_GOOGLE_API_KEY"

if USE_GEMINI_API:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
else:
    print("Warning: GOOGLE_API_KEY not found in .env file. Using fallback responses only.")
    model = None

class PersonalityResponseGenerator:
    def __init__(self, persona_data):
        self.persona = persona_data
        self.personality_prompt = self._build_personality_prompt()
    
    def _build_personality_prompt(self):
        """Build a comprehensive personality prompt from persona data."""
        p = self.persona
        
        prompt = f"""You are {p['about_you']['full_name']}, a {p['about_you']['age']}-year-old {p['about_you']['gender']} living in {p['about_you']['city']}, {p['about_you']['state']}.

CORE PERSONALITY TRAITS:
- You work as a {p['work']['job_title']} in the {p['work']['company_industry']} industry
- You're a {p['technology']['early_adopter_of_technology']} and tech-savvy person
- You're {p['home']['marital_status']} with {p['home']['children']} child(ren)
- You're {p['other_demographics']['political_affiliation']} politically
- You're {p['survey_behavior']['satisfaction_with_life']} with life overall

LIFESTYLE & INTERESTS:
- Hobbies: {', '.join(p['leisure']['hobbies_and_interests'])}
- Sports: {', '.join(p['leisure']['sports_participation'])}
- Gaming: {p['gaming']['plays_video_games']} - {p['gaming']['weekly_gaming_hours']} per week
- Reading: {', '.join(p['leisure']['publications_read'])}
- Exercise: {p['leisure']['weekly_exercise_hours']} per week

TECHNOLOGY & CONSUMER BEHAVIOR:
- You own: {', '.join(p['technology']['owned_electronic_products'])}
- You're {p['technology']['early_adopter_of_technology']}
- You prefer {p['survey_behavior']['preferred_shopping_method']}
- Favorite brands: {', '.join(p['survey_behavior']['favorite_brands'])}

COMMUNICATION STYLE:
- Be conversational and natural, not formal or robotic
- Use contractions (I'm, you're, don't, etc.)
- Show personality and opinions
- Be honest about likes/dislikes
- Use casual language appropriate for your age and background
- Avoid corporate speak or overly professional language
- Show enthusiasm for things you care about
- Be realistic about time constraints and preferences
- Use filler words occasionally (like, you know, actually, honestly)
- Show some personality quirks and preferences
- Be authentic about limitations or time constraints
- Use age-appropriate language and references

RESPONSE GUIDELINES:
- Keep responses concise but natural (1-3 sentences typically)
- Be authentic to your persona
- Don't be overly enthusiastic unless it matches your personality
- Show some personality quirks and preferences
- Be honest about limitations or preferences
- Use language that reflects your education level and background
- Avoid generic or scripted-sounding responses
- Vary your response style - sometimes be more casual, sometimes more thoughtful
- Include specific details from your life when relevant
- Show some vulnerability or honesty about challenges
- Use natural transitions and conversational flow

When answering survey questions, respond as this person would naturally speak, considering their background, interests, and personality traits."""

        return prompt
    
    async def generate_response(self, question, context=""):
        """Generate a natural response to an open-ended question."""
        # If Gemini API is not available, use fallback responses
        if not USE_GEMINI_API or model is None:
            return self._generate_fallback_response(question)
        
        try:
            full_prompt = f"""{self.personality_prompt}

QUESTION: {question}
{context if context else ""}

Respond naturally as {self.persona['about_you']['full_name']} would, keeping it conversational and authentic:"""

            response = await asyncio.to_thread(
                model.generate_content,
                full_prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.8,
                    top_p=0.9,
                    max_output_tokens=150
                )
            )
            
            return response.text.strip()
            
        except Exception as e:
            print(f"Error generating personality response: {e}")
            # Fallback to a basic response based on persona
            return self._generate_fallback_response(question)
    
    def _generate_fallback_response(self, question):
        """Generate a fallback response when API fails."""
        p = self.persona
        
        # Simple keyword-based responses
        question_lower = question.lower()
        
        # Survey participation and platform questions
        if any(word in question_lower for word in ['why', 'join', 'participate']):
            if 'qmee' in question_lower:
                return "I joined Qmee because I'm always looking for ways to earn a little extra money, especially since I work in tech and spend a lot of time online anyway. Plus, I like trying out new apps and services."
            else:
                return "I'm interested in sharing my opinions and experiences, especially about technology and consumer products since that's my background."
        
        # Life satisfaction and happiness questions
        elif any(word in question_lower for word in ['satisfaction', 'happy', 'content', 'satisfied', 'fulfilled']):
            return "I'm pretty satisfied with my life overall. I have a good job, nice family, and I'm able to pursue my interests in tech and travel."
        
        # Technology and digital questions
        elif any(word in question_lower for word in ['technology', 'tech', 'digital', 'app', 'device', 'smartphone']):
            return "I'm definitely a tech person - I work in IT and I'm usually one of the first to try new gadgets and apps. I love how technology makes life easier."
        
        # Shopping and consumer behavior
        elif any(word in question_lower for word in ['shopping', 'purchase', 'buy', 'brand', 'product']):
            return "I do most of my shopping online these days. I'm pretty brand-loyal to companies like Apple and Nike, but I also like discovering new products."
        
        # Family and personal life
        elif any(word in question_lower for word in ['family', 'children', 'kids', 'daughter', 'son']):
            return f"I'm {p['home']['marital_status']} with {p['home']['children']} child, and family is really important to me. We spend a lot of time together, especially on weekends."
        
        # Hobbies and leisure activities
        elif any(word in question_lower for word in ['hobby', 'interest', 'free time', 'weekend', 'leisure', 'activity']):
            hobbies = ', '.join(p['leisure']['hobbies_and_interests'][:3])
            return f"I enjoy {hobbies}. I also like to stay active with {', '.join(p['leisure']['sports_participation'])} when I can find the time."
        
        # Privacy and security concerns
        elif any(word in question_lower for word in ['privacy', 'data', 'security', 'password', 'authentication']):
            return "I'm pretty careful about data privacy. I use two-factor authentication and a password manager, and I'm cautious about sharing personal information online."
        
        # Motivation and goals
        elif any(word in question_lower for word in ['motivate', 'motivation', 'inspire', 'goal', 'aspiration']):
            return "I'm motivated by learning new things and staying current with technology trends. I also value financial security and providing for my family."
        
        # Career and work
        elif any(word in question_lower for word in ['job', 'work', 'career', 'profession', 'employment']):
            return f"I work as a {p['work']['job_title']} in the {p['work']['company_industry']} industry. I enjoy the challenges and the opportunity to work with cutting-edge technology."
        
        # Travel and experiences
        elif any(word in question_lower for word in ['travel', 'vacation', 'trip', 'experience', 'adventure']):
            return "I love traveling when I can find the time. I've been to the UK recently and I'm always looking for new places to explore with my family."
        
        # Gaming and entertainment
        elif any(word in question_lower for word in ['game', 'gaming', 'playstation', 'steam', 'entertainment']):
            return f"I do enjoy gaming - I play about {p['gaming']['weekly_gaming_hours']} per week, mostly on {', '.join(p['gaming']['gaming_devices_used'][:2])}. It's a nice way to unwind."
        
        # Health and fitness
        elif any(word in question_lower for word in ['health', 'fitness', 'exercise', 'workout', 'gym']):
            return f"I try to stay active - I exercise about {p['leisure']['weekly_exercise_hours']} per week. I enjoy {', '.join(p['leisure']['sports_participation'])} when I can find the time."
        
        # Food and dining
        elif any(word in question_lower for word in ['food', 'dining', 'restaurant', 'cooking', 'meal']):
            return "I enjoy cooking and trying new restaurants. I'm pretty adventurous with food, and I like both cooking at home and dining out with my family."
        
        # Reading and media consumption
        elif any(word in question_lower for word in ['read', 'reading', 'book', 'magazine', 'publication']):
            return f"I read {', '.join(p['leisure']['publications_read'][:2])} regularly to stay informed about tech trends and current events."
        
        # Financial and investment
        elif any(word in question_lower for word in ['money', 'finance', 'investment', 'savings', 'budget']):
            return "I'm pretty financially conscious. I have a good savings strategy and I'm always looking for ways to grow my investments for the future."
        
        # Social media and online behavior
        elif any(word in question_lower for word in ['social media', 'facebook', 'instagram', 'twitter', 'online']):
            return "I use social media moderately - I check it a few times a day but try not to let it consume too much of my time. I prefer quality over quantity."
        
        # Environmental and sustainability
        elif any(word in question_lower for word in ['environment', 'sustainability', 'green', 'eco-friendly']):
            return "I'm pretty environmentally conscious. I try to make sustainable choices when I can, especially with technology and transportation."
        
        # Customer service and support
        elif any(word in question_lower for word in ['customer service', 'support', 'help', 'assistance']):
            return "I appreciate good customer service. I expect companies to be responsive and knowledgeable when I need help with their products or services."
        
        # Product feedback and reviews
        elif any(word in question_lower for word in ['feedback', 'review', 'opinion', 'experience']):
            return "I'm happy to share my honest opinions about products and services. I think constructive feedback helps companies improve their offerings."
        
        # Time management and productivity
        elif any(word in question_lower for word in ['time', 'schedule', 'busy', 'productive', 'efficient']):
            return "I'm pretty busy with work and family, so I value efficiency and good time management. I try to make the most of my free time."
        
        # Learning and education
        elif any(word in question_lower for word in ['learn', 'education', 'skill', 'knowledge', 'study']):
            return "I'm always interested in learning new things, especially in technology. I believe in continuous learning to stay current in my field."
        
        # Community and social involvement
        elif any(word in question_lower for word in ['community', 'social', 'volunteer', 'involvement']):
            return f"I'm {p['survey_behavior']['community_involvement']} in my community. I think it's important to give back when you can."
        
        # Future plans and aspirations
        elif any(word in question_lower for word in ['future', 'plan', 'aspiration', 'goal', 'dream']):
            return "I'm focused on advancing my career and providing a good life for my family. I'd love to travel more and maybe start my own tech project someday."
        
        else:
            # Generic but personality-driven response
            return "I'm someone who values quality and convenience. I work in tech, so I appreciate well-designed products and services that make life easier."

# Cache for the generator instance
_response_generator = None

def get_response_generator(persona_data):
    """Get or create the response generator instance."""
    global _response_generator
    if _response_generator is None:
        _response_generator = PersonalityResponseGenerator(persona_data)
    return _response_generator

async def generate_personality_response(question, persona_data, context=""):
    """Generate a personality-driven response for an open-ended question."""
    generator = get_response_generator(persona_data)
    return await generator.generate_response(question, context) 