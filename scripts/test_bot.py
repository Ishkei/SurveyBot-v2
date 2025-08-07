import asyncio
import os
import json
from datetime import datetime

from dotenv import load_dotenv
import google.generativeai as genai
from playwright.async_api import async_playwright

load_dotenv()

# --- CONFIGURATION & PERSONA ---
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "YOUR_GOOGLE_API_KEY")
if not GOOGLE_API_KEY or GOOGLE_API_KEY == "YOUR_GOOGLE_API_KEY":
    print("ERROR: GOOGLE_API_KEY not found in .env file. Please set it.")
    exit()
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash-latest', generation_config={"response_mime_type": "application/json"})

try:
    with open('persona.json', 'r') as f:
        PERSONA = json.load(f)
    PERSONA_PROMPT = f"""You are an AI assistant representing a person with these details: {json.dumps(PERSONA)}.
Your primary goal is to answer survey questions accurately based on this persona.
When presented with multiple choice options, select ONLY the single, specific button or radio option that directly corresponds to the answer.
You MUST provide the NUMERIC ID (e.g., 15) of the element to click or fill, NOT its text label.
Avoid clicking on general navigation links. Always prioritize progressing through the survey.
"""
except FileNotFoundError:
    print("Error: persona.json not found! Please create it.")
    exit()

async def test_signup_survey():
    """Test the signup survey completion"""
    print("Starting signup survey test...")
    
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        context = await browser.new_context(storage_state="auth.json")
        page = await context.new_page()

        print("Navigating to surveys...")
        await page.goto("https://www.qmee.com/en-us/surveys", timeout=30000)
        print(f"Current URL: {page.url}")

        try:
            print("Looking for survey to start...")
            
            # First check if there are any surveys available
            page_content = await page.inner_text('body')
            print(f"Page content preview: {page_content[:200]}...")
            
            if "nap" in page_content.lower() or "no surveys" in page_content.lower():
                print("❌ No surveys available at the moment.")
                print("The survey providers are currently not available.")
                print("This is normal during off-hours or when no surveys are available.")
                return
            
            await page.wait_for_selector('button:has-text("Start earning"), a.survey-card', state='visible', timeout=10000)
            print("Found survey elements")
            
            start_earning_button = page.get_by_role('button', name='Start earning')
            if await start_earning_button.is_visible():
                await start_earning_button.click()
                print("Clicked 'Start earning' button")
            else:
                survey_card = await page.locator('a.survey-card').first
                await survey_card.click()
                print("Clicked first survey card")
                
            await asyncio.sleep(3)
            print(f"After clicking survey, URL: {page.url}")
            
            # Check if we're on the signup survey
            if "signup-survey" in page.url:
                print("✅ Successfully started signup survey!")
                
                # Try to handle the first few pages
                for i in range(10):  # Increased to handle more pages
                    print(f"\n--- Testing Page {i+1} ---")
                    
                    try:
                        # Wait for iframe
                        iframe_locator = page.frame_locator('iframe[title="signup-survey"]')
                        await iframe_locator.locator('body').wait_for(timeout=5000)
                        
                        # Get page text
                        page_text = await iframe_locator.locator('body').inner_text()
                        print(f"Page content: {page_text[:100]}...")
                        
                        # Check for date of birth page
                        if "Date of birth" in page_text:
                            print("Found Date of Birth page - handling...")
                            # Handle DOB
                            dob_str = PERSONA['about_you']['date_of_birth']
                            dob_obj = datetime.strptime(dob_str, '%Y-%m-%d')
                            
                            await iframe_locator.get_by_placeholder("MM").type(str(dob_obj.month))
                            await iframe_locator.get_by_placeholder("DD").type(str(dob_obj.day))
                            await iframe_locator.get_by_placeholder("YYYY").type(str(dob_obj.year))
                            print("Filled date of birth")
                            
                            # Wait for age confirmation
                            await asyncio.sleep(2)
                            try:
                                yes_button = iframe_locator.get_by_role("button", name="Yes")
                                await yes_button.click()
                                print("Confirmed age")
                            except:
                                print("No age confirmation needed")
                            
                        elif "Gender" in page_text:
                            print("Found Gender page - selecting Male...")
                            male_label = iframe_locator.locator('label:has-text("Male")')
                            await male_label.click()
                            print("Selected Male")
                            
                        elif "Marital status" in page_text:
                            print("Found Marital Status page - selecting Married...")
                            married_label = iframe_locator.locator('label:has-text("Married")')
                            await married_label.click()
                            print("Selected Married")
                            
                        elif "Personal Income" in page_text:
                            print("Found Income page - selecting high income...")
                            income_label = iframe_locator.locator('label:has-text("$150,000")')
                            await income_label.click()
                            print("Selected income range")
                            
                        elif "Education level" in page_text:
                            print("Found Education page - selecting college...")
                            education_label = iframe_locator.locator('label:has-text("Graduated 4 year college")')
                            await education_label.click()
                            print("Selected education level")
                            
                        elif "Employment status" in page_text:
                            print("Found Employment page - selecting employed...")
                            employed_label = iframe_locator.locator('label:has-text("Employed")')
                            await employed_label.click()
                            print("Selected employment status")
                            
                        elif "Improve your rewards" in page_text:
                            print("Found consent page - selecting yes...")
                            consent_label = iframe_locator.locator('label:has-text("Match me to more surveys")')
                            await consent_label.click()
                            print("Selected consent option")
                            
                        elif "Employment contract" in page_text:
                            print("Found employment contract page - selecting full-time...")
                            fulltime_label = iframe_locator.locator('label:has-text("Employed full-time")')
                            await fulltime_label.click()
                            print("Selected employment contract")
                            
                        elif "Address" in page_text or "zipcode" in page_text.lower():
                            print("Found Address page - handling...")
                            # Handle address consent first
                            try:
                                yes_button = iframe_locator.locator('label:has-text("Yes"), button:has-text("Yes")')
                                await yes_button.click()
                                print("Consented to provide address")
                                await asyncio.sleep(2)
                            except:
                                print("No address consent needed")
                            
                            # Fill address fields
                            try:
                                zipcode_field = iframe_locator.locator('input[placeholder*="zip"], input[placeholder*="Zip"]')
                                await zipcode_field.fill(PERSONA['about_you']['zipcode'])
                                print("Filled zipcode")
                            except:
                                print("No zipcode field found")
                                
                        elif "Ethnicity" in page_text or "race" in page_text.lower():
                            print("Found Ethnicity page - selecting White/Caucasian...")
                            ethnicity_label = iframe_locator.locator('label:has-text("White"), label:has-text("Caucasian")')
                            await ethnicity_label.click()
                            print("Selected ethnicity")
                            
                        elif "thank" in page_text.lower() or "complete" in page_text.lower() or "finished" in page_text.lower():
                            print("🎉 Signup survey appears to be complete!")
                            break
                            
                        else:
                            print("Unknown page type - trying to find any clickable element...")
                            # Try to find any clickable element
                            buttons = iframe_locator.locator('button, label')
                            if await buttons.count() > 0:
                                await buttons.first.click()
                                print("Clicked first available element")
                            
                        await asyncio.sleep(2)
                        
                    except Exception as e:
                        print(f"Error on page {i+1}: {e}")
                        break
                        
                print("✅ Signup survey test completed!")
                
            else:
                print("❌ Failed to start signup survey")
                
        except Exception as e:
            print(f"Error during test: {e}")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_signup_survey())