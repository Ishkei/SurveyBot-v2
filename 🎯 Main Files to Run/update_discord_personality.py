#!/usr/bin/env python3
"""
Update the survey bot to use Discord personality responses
"""

import re

def update_discord_personality():
    """Update the survey bot to use Discord personality responses."""
    
    # Read the current file
    with open('../📁 Project Structure/bot_implementations/survey_bot_playwright.py', 'r') as f:
        content = f.read()
    
    # Replace the fallback response generation with Discord personality
    old_pattern = r"""# Use fallback response for speed and naturalness
                        from personality_responses import PersonalityResponseGenerator
                        generator = PersonalityResponseGenerator\(PERSONA\)
                        personality_response = generator\._generate_fallback_response\(question_context\)"""
    
    new_pattern = """# Use Discord-style personality response
                        personality_response = await generate_personality_response(question_context, style="discord_casual")"""
    
    # Replace all occurrences
    updated_content = re.sub(old_pattern, new_pattern, content)
    
    # Write the updated content back
    with open('../📁 Project Structure/bot_implementations/survey_bot_playwright.py', 'w') as f:
        f.write(updated_content)
    
    print("✅ Updated survey bot to use Discord personality responses!")

if __name__ == "__main__":
    update_discord_personality()
