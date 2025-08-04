import asyncio
import os
import json
from datetime import datetime

from dotenv import load_dotenv
import google.generativeai as genai
from playwright.async_api import async_playwright

import actions

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

# <<< FINAL FIX HERE: Fixed f-string syntax in build_dom_tree >>>
async def build_dom_tree(element, element_map, indent=""):
    try:
        tag = await element.evaluate('node => node.tagName.toLowerCase()')
        
        text = ""
        if tag == 'input':
            input_type = await element.get_attribute('type')
            if input_type in ['text', 'number', 'email', 'password']:
                text = f"Input (Placeholder: {await element.get_attribute('placeholder') or input_type})"
            elif input_type in ['radio', 'checkbox']:
                label_text = await element.evaluate('''
                    (node) => {
                        const id = node.id;
                        if (id) {
                            const label = document.querySelector(`label[for="${id}"]`);
                            if (label) return label.textContent.trim().split('\\n')[0];
                        }
                        return node.value || node.textContent.trim().split('\\n')[0];
                    }
                ''')
                text = f"{input_type.capitalize()} (Value: {label_text or await element.get_attribute('value') or ''})"
        elif tag == 'select':
            selected_option_full = await element.get_by_role('combobox').inner_text() or ""
            # <<< FIX HERE: Process string BEFORE putting into f-string >>>
            selected_option_first_line = selected_option_full.strip().split('\n')[0] 
            text = f"Dropdown Select (Current: \"{selected_option_first_line}\")"
        elif tag == 'button':
            text = (await element.inner_text() or await element.get_attribute('name') or "Button").strip().split('\n')[0]
        elif tag == 'a':
            text = (await element.inner_text() or await element.get_attribute('aria-label') or await element.get_attribute('href') or "Link").strip().split('\n')[0]
        elif tag == 'label':
             text = (await element.inner_text() or await element.get_attribute('aria-label') or "").strip().split('\n')[0]
        elif tag in ['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            text = await element.evaluate('node => node.textContent.trim().split("\\n")[0]')
        
        if not await element.is_visible() or tag in ['script', 'style', 'meta', 'link']:
            return ""

        if not text or len(text) < 1:
            return ""

        element_id = len(element_map)
        element_map[element_id] = element
        
        # Debug: Print what we're finding
        if tag in ['button', 'input', 'select', 'a']:
            print(f"Found interactive element [{element_id}]: <{tag}> '{text}'")
        
        # Add more context for interactive elements
        if tag in ['button', 'input', 'select', 'a']:
            additional_info = ""
            if tag == 'button':
                button_type = await element.get_attribute('type') or 'button'
                additional_info = f" (type: {button_type})"
            elif tag == 'input':
                input_type = await element.get_attribute('type') or 'text'
                additional_info = f" (type: {input_type})"
            
            tree_text = f'{indent}[{element_id}] <{tag}{additional_info}> "{text}"\n'
        else:
            tree_text = f'{indent}[{element_id}] <{tag}> "{text}"\n'

        if tag not in ['input', 'button', 'select', 'textarea', 'a', 'label']:
            children = await element.query_selector_all(':scope > *')
            for child in children:
                tree_text += await build_dom_tree(child, element_map, indent + "  ")
        
        return tree_text
    except Exception:
        return ""

async def solve_page_with_hybrid_vision_dom(context, main_page):
    print("Handling page with Hybrid Vision/DOM Model...")
    try:
        await asyncio.sleep(0.5) 
        screenshot = await main_page.screenshot(type="png", full_page=True)
        
        element_map = {}
        
        # Always try to get the iframe first
        iframe_locator = main_page.frame_locator('iframe[title="signup-survey"]')
        try:
            await iframe_locator.locator('body').wait_for(timeout=5000)
            # Wait a bit more for iframe content to fully load
            await asyncio.sleep(2)
            print("Found iframe, using iframe context")
            
            # Debug: Check what's actually in the iframe
            try:
                iframe_text = await iframe_locator.locator('body').inner_text()
                print(f"Iframe body text preview: {iframe_text[:200]}...")
            except Exception as e:
                print(f"Could not get iframe text: {e}")
            
            # Check for interactive elements in iframe
            try:
                buttons = await iframe_locator.locator('button').all()
                inputs = await iframe_locator.locator('input').all()
                links = await iframe_locator.locator('a').all()
                print(f"Found in iframe: {len(buttons)} buttons, {len(inputs)} inputs, {len(links)} links")
            except Exception as e:
                print(f"Could not count iframe elements: {e}")
            
            body = await iframe_locator.locator('body').element_handle()
            context = iframe_locator  # Use iframe as context for element interactions
        except Exception as e:
            print(f"Could not find iframe, using main page: {e}")
            body = await main_page.locator('body').element_handle()
        
        # Try a simpler approach - directly get interactive elements
        print("Building DOM tree with direct element selection...")
        
        # Get all interactive elements directly
        buttons = await context.locator('button').all()
        inputs = await context.locator('input').all()
        selects = await context.locator('select').all()
        links = await context.locator('a').all()
        labels = await context.locator('label').all()
        
        all_elements = buttons + inputs + selects + links + labels
        print(f"Found {len(all_elements)} total interactive elements")
        
        # Build a simple DOM tree from these elements
        dom_tree_text = ""
        for i, element in enumerate(all_elements):
            try:
                tag = await element.evaluate('node => node.tagName.toLowerCase()')
                
                if tag == 'input':
                    input_type = await element.get_attribute('type') or 'text'
                    placeholder = await element.get_attribute('placeholder') or ''
                    value = await element.get_attribute('value') or ''
                    text = f"Input (type: {input_type}, placeholder: {placeholder}, value: {value})"
                elif tag == 'button':
                    text = await element.inner_text() or await element.get_attribute('name') or 'Button'
                elif tag == 'select':
                    text = await element.inner_text() or 'Dropdown'
                elif tag == 'a':
                    text = await element.inner_text() or await element.get_attribute('href') or 'Link'
                elif tag == 'label':
                    text = await element.inner_text() or 'Label'
                else:
                    text = await element.inner_text() or tag
                
                # Clean up text
                text = text.strip().split('\n')[0][:100]  # Limit length
                
                if text and len(text) > 1:
                    element_map[i] = element
                    dom_tree_text += f"[{i}] <{tag}> \"{text}\"\n"
                    print(f"Added element [{i}]: <{tag}> '{text}'")
                    
            except Exception as e:
                print(f"Error processing element {i}: {e}")
                continue
        
        print(f"Built DOM tree with {len(element_map)} elements")
        
        tools_prompt = """
        You have these tools:
        1. `click_element(element_id)`: Use for buttons, links, radio buttons, or checkboxes.
        2. `fill_textbox(element_id, text_to_fill)`: Use for text fields (input type="text", "email", "password" or textarea).

        Based on the user's persona, the screenshot, and the DOM tree, decide the single best action to progress through the survey.
        When specifying 'element_id', you MUST use the NUMERIC ID (e.g., 15) provided in the DOM tree, NOT its text label.
        You MUST respond in a valid JSON format with "tool" and "args" keys.
        Example for clicking a "Next" button with ID 15: `{"tool": "click_element", "args": {"element_id": 15}}`
        Example for filling a zipcode field with ID 5: `{"tool": "fill_textbox", "args": {"element_id": 5, "text_to_fill": "90001"}}`
        If no action is clear, respond with: `{"tool": "no_action", "args": {}}`
        
        IMPORTANT GUIDELINES: 
        - For radio buttons, prefer clicking the LABEL element (which is visible) rather than the hidden radio input
        - For checkboxes, prefer clicking the LABEL element rather than the hidden checkbox input
        - Only select elements that are clearly visible and interactive
        - If you're unsure about which element to select, choose "no_action" rather than guessing
        - When there are consent questions (Yes/No), always answer "Yes" to proceed with the survey
        - Fill text fields only after answering any consent questions
        - Look for "Next", "Continue", "Submit", "Confirm" buttons to progress
        - For multiple choice questions, select the option that best matches the persona's characteristics
        - If you see a "Thank you" or completion message, respond with "no_action" as the survey is done
        - Prioritize progress over perfection - choose the most likely correct option if unsure
        """
        prompt = f"""
        {PERSONA_PROMPT}
        {tools_prompt}
        Here is the structured DOM tree of the webpage:
        ---
        {dom_tree_text}
        ---
        Analyze the screenshot AND the DOM tree, then choose the tool to use. Respond with only the JSON object.
        """
        
        response = await model.generate_content_async([prompt, {"mime_type": "image/png", "data": screenshot}])
        
        print(f"AI Response: {response.text}")
        
        try:
            decision_json = json.loads(response.text)
        except json.JSONDecodeError:
            print(f"Error: AI returned invalid JSON: {response.text}")
            return False

        tool_name = decision_json.get('tool')
        raw_element_id = decision_json.get('args', {}).get('element_id')
        text_to_fill = decision_json.get('args', {}).get('text_to_fill')

        if not tool_name:
            print(f"Error: AI response missing 'tool'. Response: {decision_json}")
            return False
            
        if tool_name == "no_action":
            print("AI decided no action was possible.")
            return False
            
        if raw_element_id is None:
            print(f"Error: AI response missing 'element_id'. Response: {decision_json}")
            return False

        element_to_interact = None
        try:
            element_id_int = int(raw_element_id)
            element_to_interact = element_map.get(element_id_int)
            if not element_to_interact:
                print(f"Element ID {element_id_int} not found in element map. Available IDs: {list(element_map.keys())}")
        except ValueError:
            print(f"AI returned non-numeric element_id '{raw_element_id}'. Attempting to find element by text as fallback.")
            try:
                element_to_interact = await context.locator(f'button:has-text("{raw_element_id}")').first.element_handle(timeout=2000)
                if not element_to_interact:
                     element_to_interact = await context.locator(f'a:has-text("{raw_element_id}")').first.element_handle(timeout=2000)
                if not element_to_interact:
                     element_to_interact = await context.locator(f'label:has-text("{raw_element_id}")').first.element_handle(timeout=2000)
                if not element_to_interact:
                     element_to_interact = await context.locator(f'input[value="{raw_element_id}"]').first.element_handle(timeout=2000)
            except Exception as find_e:
                print(f"Failed to find element by text '{raw_element_id}' fallback: {find_e}")
                element_to_interact = None
        
        if not element_to_interact:
            print(f"Error: Could not find element in map or by text for ID/Text: '{raw_element_id}'")
            print(f"Available elements in map: {list(element_map.keys())}")
            print(f"DOM tree preview: {dom_tree_text[:500]}...")
            
            # Fallback: Try to find any clickable button or link
            try:
                print("Attempting fallback: looking for any clickable element...")
                if hasattr(context, 'frame_locator'):
                    # We're in iframe context
                    fallback_elements = await context.locator('button, a, input[type="submit"], input[type="button"]').all()
                else:
                    # We're in main page context
                    fallback_elements = await main_page.locator('button, a, input[type="submit"], input[type="button"]').all()
                
                if fallback_elements:
                    first_clickable = fallback_elements[0]
                    action_text = await first_clickable.inner_text() or await first_clickable.get_attribute('value') or 'Unknown'
                    print(f"Fallback: Clicking first available element with text: '{action_text}'")
                    await first_clickable.click()
                    return True
            except Exception as fallback_e:
                print(f"Fallback also failed: {fallback_e}")
            
            return False

        print(f"AI chose tool: {tool_name} for element '{raw_element_id}'")

        if tool_name == "click_element":
            # Find the element_id for the element_to_interact
            element_id = None
            for eid, elem in element_map.items():
                if elem == element_to_interact:
                    element_id = eid
                    break
            
            if element_id is not None:
                await actions.click_element(context, element_id, element_map)
            else:
                print(f"Error: Could not find element_id for element in map")
                return False
        elif tool_name == "fill_textbox":
            # Find the element_id for the element_to_interact
            element_id = None
            for eid, elem in element_map.items():
                if elem == element_to_interact:
                    element_id = eid
                    break
            
            if element_id is not None:
                await actions.fill_textbox(context, element_id, text_to_fill, element_map)
            else:
                print(f"Error: Could not find element_id for element in map")
                return False
        elif tool_name == "no_action":
            print("AI decided no action was possible.")
            return False
        else:
            print(f"Error: AI chose an unknown tool: {tool_name}")
            return False

        return True

    except Exception as e:
        print(f"An error occurred in the Hybrid Vision/DOM model: {e}")
        return False

async def handle_date_of_birth_page(iframe, page, persona):
    print("Detected 'Date of birth' page. Handling the full sequence...")
    try:
        dob_str = persona['about_you']['date_of_birth']
        dob_obj = datetime.strptime(dob_str, '%Y-%m-%d')
        year = str(dob_obj.year)
        month = str(dob_obj.month)
        day = str(dob_obj.day)
        
        print(f"Persona DOB: {month}/{day}/{year}")

        await iframe.get_by_placeholder("MM").type(month, delay=100)
        print(f"Typed Month: {month}")

        await page.keyboard.press("Tab")
        await iframe.get_by_placeholder("DD").type(day, delay=100)
        print(f"Typed Day: {day}")

        await page.keyboard.press("Tab")
        await iframe.get_by_placeholder("YYYY").type(year, delay=100)
        print(f"Typed Year: {year}")
        
        print("Waiting for age confirmation question...")
        confirmation_button = iframe.get_by_role("button", name="Yes")
        await confirmation_button.wait_for(timeout=10000)
        
        print("Confirmation question found. Clicking 'Yes'.")
        await confirmation_button.click()
        
        print("Successfully submitted Date of Birth and confirmed age.")
        return True
    except Exception as e:
        print(f"An error occurred while handling Date of Birth page: {e}")
        return False

async def handle_address_page(iframe, page, persona):
    print("Detected 'Address' page. Handling the full sequence...")
    try:
        # First, click "Yes" to consent to providing full address
        print("Clicking 'Yes' to consent to providing full address...")
        
        # Try different ways to find the Yes button
        try:
            yes_button = iframe.get_by_role("button", name="Yes")
            await yes_button.wait_for(timeout=2000)
            await yes_button.click()
        except:
            try:
                yes_label = iframe.locator('label:has-text("Yes")')
                await yes_label.wait_for(timeout=2000)
                await yes_label.click()
            except:
                # Use the hybrid approach to find and click Yes
                print("Using hybrid approach to find Yes button...")
                return await solve_page_with_hybrid_vision_dom(iframe, page)
        
        # Wait for address fields to appear
        await asyncio.sleep(2)
        
        # Fill in the address fields
        zipcode = persona['about_you']['zipcode']
        city = persona['about_you']['city']
        state = persona['about_you']['state']
        
        # Create a street address based on persona data
        street_address = f"123 Main St, {city}, {state} {zipcode}"
        
        print(f"Filling address fields with: {street_address}")
        
        # Use comprehensive field detection to fill all form fields
        filled_fields = await detect_and_fill_form_fields(iframe, persona)
        
        # Also handle any specific fields that might not be caught by the general detection
        try:
            # Handle State dropdown specifically (since it might be a custom dropdown)
            state_dropdown = iframe.locator('select, input[placeholder*="State"], input[placeholder*="state"]')
            if await state_dropdown.is_visible(timeout=2000):
                print(f"Found state dropdown, selecting: {state}")
                await state_dropdown.click()
                await asyncio.sleep(1)
                
                # Try different approaches to select the state
                try:
                    # First try: look for a specific state option in dropdown
                    state_option = iframe.locator(f'[role="option"]:has-text("{state}"), option:has-text("{state}"), div[class*="option"]:has-text("{state}")')
                    await state_option.first.wait_for(timeout=3000)
                    await state_option.first.click()
                    print(f"Selected state: {state}")
                except:
                    try:
                        # Second try: type the state name
                        await state_dropdown.type(state)
                        await asyncio.sleep(1)
                        # Press Enter or Tab to confirm
                        await page.keyboard.press("Enter")
                        print(f"Typed and selected state: {state}")
                    except:
                        # Third try: use keyboard navigation
                        await state_dropdown.press("ArrowDown")
                        await asyncio.sleep(0.5)
                        # Press Enter to select
                        await page.keyboard.press("Enter")
                        print(f"Used keyboard navigation for state selection")
        except Exception as e:
            print(f"Could not handle state dropdown: {e}")
        
        # Look for a submit/continue button
        try:
            submit_button = iframe.locator('button:has-text("Submit"), button:has-text("Continue"), button:has-text("Next"), input[type="submit"]')
            if await submit_button.is_visible(timeout=2000):
                print("Found submit button, clicking...")
                await submit_button.click()
                print("Clicked submit button")
        except Exception as e:
            print(f"Could not find submit button: {e}")
        
        print("Successfully filled all address fields.")
        
        # Wait a bit for the form to process and see if we need to submit
        await asyncio.sleep(3)
        
        # Check if there are any submit buttons or if the page has changed
        try:
            submit_buttons = iframe.locator('button:has-text("Submit"), button:has-text("Continue"), button:has-text("Next"), button:has-text("Confirm"), input[type="submit"]')
            if await submit_buttons.count() > 0:
                print("Found submit button, clicking...")
                await submit_buttons.first.click()
                print("Clicked submit button")
                await asyncio.sleep(3)
            else:
                print("No submit button found - form may auto-submit")
        except Exception as e:
            print(f"No submit button found: {e}")
        
        # Wait a bit more for any page transitions
        await asyncio.sleep(2)
        print("Address form completed, waiting for next page...")
        
        return True
    except Exception as e:
        print(f"An error occurred while handling Address page: {e}")
        return False

async def handle_ethnicity_page(iframe, page, persona):
    """
    Handle the ethnicity selection page.
    """
    try:
        print("Detected 'Ethnicity' page. Handling ethnicity selection...")
        
        # Get ethnicity from persona
        ethnicity = persona.get("about_you", {}).get("ethnicity", "White / Caucasian")
        print(f"Persona ethnicity: {ethnicity}")
        
        # Map persona ethnicity to survey options
        ethnicity_mapping = {
            "White / Caucasian": "White/Caucasian",
            "Black or African-American": "Black or African-American", 
            "Asian American": "Asian American",
            "Native American or Alaskan Native": "Native American or Alaskan Native",
            "Pacific Islander": "Pacific Islander",
            "East Asian": "East Asian",
            "South Asian/Indian": "South Asian/Indian",
            "Filipino": "Filipino",
            "Other": "Other",
            "Don't know/prefer not to say": "Don't know/prefer not to say"
        }
        
        target_ethnicity = ethnicity_mapping.get(ethnicity, "White/Caucasian")
        print(f"Selecting ethnicity: {target_ethnicity}")
        
        # Look for the ethnicity option and click it
        try:
            # First, let's debug what ethnicity options are available
            print("Debugging: Looking for all ethnicity options...")
            
            # Look for all clickable elements that might be ethnicity options
            all_buttons = iframe.locator('button, label, div[role="button"], div[class*="button"]')
            button_count = await all_buttons.count()
            print(f"Found {button_count} potential ethnicity options")
            
            for i in range(min(button_count, 20)):  # Check first 20 buttons
                try:
                    button_text = await all_buttons.nth(i).inner_text()
                    print(f"Option {i}: '{button_text}'")
                except:
                    continue
            
            # Try multiple approaches to find the ethnicity option
            ethnicity_selectors = [
                f'button:has-text("{target_ethnicity}")',
                f'label:has-text("{target_ethnicity}")',
                f'div:has-text("{target_ethnicity}")',
                f'*:has-text("{target_ethnicity}")',
                # Also try with partial matches
                f'button:has-text("White")',
                f'label:has-text("White")',
                f'div:has-text("White")',
                f'*:has-text("White")',
                f'button:has-text("Caucasian")',
                f'label:has-text("Caucasian")',
                f'div:has-text("Caucasian")',
                f'*:has-text("Caucasian")'
            ]
            
            for selector in ethnicity_selectors:
                try:
                    ethnicity_option = iframe.locator(selector)
                    if await ethnicity_option.count() > 0:
                        await ethnicity_option.first.click()
                        print(f"Clicked ethnicity option using selector: {selector}")
                        
                        # Wait for any confirmation or next button
                        await asyncio.sleep(2)
                        
                        # Look for a next/continue button
                        next_button = iframe.locator('button:has-text("Next"), button:has-text("Continue"), button:has-text("Submit"), button:has-text("Confirm")')
                        if await next_button.count() > 0:
                            await next_button.first.click()
                            print("Clicked next button after ethnicity selection")
                            await asyncio.sleep(2)
                        
                        return True
                except Exception as e:
                    continue  # Try next selector
            
            print(f"Could not find ethnicity option: {target_ethnicity}")
            return False
        except Exception as e:
            print(f"Error selecting ethnicity: {e}")
            return False
            
    except Exception as e:
        print(f"An error occurred while handling Ethnicity page: {e}")
        return False

async def detect_and_fill_form_fields(iframe, persona):
    """
    Comprehensive form field detection and filling.
    Detects all form fields and fills them based on persona data.
    """
    print("Detecting all form fields...")
    
    # Common field patterns to look for
    field_patterns = [
        ("zipcode", "Zipcode", "zip", "postal"),
        ("city", "City", "town"),
        ("state", "State", "province"),
        ("address", "Address", "street", "mailing"),
        ("name", "Name", "full_name", "first_name", "last_name"),
        ("email", "Email", "e-mail"),
        ("phone", "Phone", "telephone", "mobile"),
        ("age", "Age", "birth_year"),
        ("gender", "Gender", "sex"),
        ("income", "Income", "salary", "earnings"),
        ("education", "Education", "school", "degree"),
        ("employment", "Employment", "job", "work")
    ]
    
    filled_fields = []
    
    for field_key, *patterns in field_patterns:
        for pattern in patterns:
            try:
                # Look for input fields with these patterns
                field = iframe.locator(f'input[placeholder*="{pattern}"], input[name*="{pattern}"], label:has-text("{pattern}") + input, input[aria-label*="{pattern}"]')
                
                if await field.count() > 0:
                    # Get the actual input element
                    input_element = field.first
                    
                    if await input_element.is_visible(timeout=1000):
                        # Determine if it's required (look for asterisk or required attribute)
                        is_required = await input_element.get_attribute("required") is not None
                        
                        # Fill based on field type and persona data
                        value = get_field_value_from_persona(field_key, persona)
                        if value:
                            await input_element.fill(value)
                            print(f"Filled {field_key}: {value} {'(required)' if is_required else '(optional)'}")
                            filled_fields.append(field_key)
                        elif is_required:
                            print(f"WARNING: Required field {field_key} not found in persona data")
                        
                        break  # Found this field, move to next
                        
            except Exception as e:
                continue  # Skip this pattern if it fails
    
    print(f"Detected and filled {len(filled_fields)} fields: {', '.join(filled_fields)}")
    return filled_fields

async def handle_consent_page(iframe, page, persona):
    """
    Handle consent/opt-in pages that ask for permission to collect additional data.
    """
    try:
        print("Detected consent/opt-in page. Handling consent...")
        
        # Look for consent options - typically "Yes" or "Agree" buttons
        consent_selectors = [
            'button:has-text("Yes")',
            'button:has-text("Agree")', 
            'button:has-text("I agree")',
            'button:has-text("Accept")',
            'button:has-text("Allow")',
            'label:has-text("Yes")',
            'label:has-text("Agree")',
            'input[value="yes"]',
            'input[value="agree"]'
        ]
        
        for selector in consent_selectors:
            try:
                consent_element = iframe.locator(selector)
                if await consent_element.count() > 0:
                    await consent_element.first.click()
                    print(f"Clicked consent option: {selector}")
                    
                    # Wait for any next/continue button
                    await asyncio.sleep(2)
                    
                    # Look for a next/continue button
                    next_button = iframe.locator('button:has-text("Next"), button:has-text("Continue"), button:has-text("Submit"), button:has-text("Confirm")')
                    if await next_button.count() > 0:
                        await next_button.first.click()
                        print("Clicked next button after consent")
                        await asyncio.sleep(2)
                    
                    return True
            except Exception as e:
                continue  # Try next selector
        
        print("Could not find consent option, using hybrid approach...")
        return await solve_page_with_hybrid_vision_dom(iframe, page)
        
    except Exception as e:
        print(f"Error handling consent page: {e}")
        return await solve_page_with_hybrid_vision_dom(iframe, page)

async def handle_general_form_page(iframe, page, persona):
    """
    Handle general form pages that may contain various types of questions.
    """
    try:
        print("Detected general form page. Attempting to fill all available fields...")
        
        # First, try to detect and fill any form fields
        filled_fields = await detect_and_fill_form_fields(iframe, persona)
        
        # Look for any radio buttons or checkboxes that need selection
        radio_buttons = iframe.locator('input[type="radio"]')
        checkbox_buttons = iframe.locator('input[type="checkbox"]')
        
        radio_count = await radio_buttons.count()
        checkbox_count = await checkbox_buttons.count()
        
        print(f"Found {radio_count} radio buttons and {checkbox_count} checkboxes")
        
        # For radio buttons, try to select appropriate options based on persona
        if radio_count > 0:
            await handle_radio_button_selection(iframe, persona)
        
        # For checkboxes, try to select appropriate options
        if checkbox_count > 0:
            await handle_checkbox_selection(iframe, persona)
        
        # Look for a submit/continue button
        submit_selectors = [
            'button:has-text("Next")',
            'button:has-text("Continue")', 
            'button:has-text("Submit")',
            'button:has-text("Confirm")',
            'input[type="submit"]',
            'button[type="submit"]'
        ]
        
        for selector in submit_selectors:
            try:
                submit_button = iframe.locator(selector)
                if await submit_button.count() > 0:
                    await submit_button.first.click()
                    print(f"Clicked submit button: {selector}")
                    await asyncio.sleep(2)
                    return True
            except Exception:
                continue
        
        # If no submit button found, try the hybrid approach
        print("No submit button found, using hybrid approach...")
        return await solve_page_with_hybrid_vision_dom(iframe, page)
        
    except Exception as e:
        print(f"Error handling general form page: {e}")
        return await solve_page_with_hybrid_vision_dom(iframe, page)

async def handle_radio_button_selection(iframe, persona):
    """
    Handle radio button selection based on persona data.
    """
    try:
        # Get all radio button labels
        radio_labels = iframe.locator('label')
        label_count = await radio_labels.count()
        
        print(f"Found {label_count} potential radio button labels")
        
        # Common question patterns and their persona mappings
        question_patterns = {
            "gender": ["male", "female"],
            "marital": ["married", "single", "divorced", "widowed"],
            "employment": ["employed", "unemployed", "student", "retired"],
            "income": ["income", "salary", "earnings"],
            "education": ["education", "school", "college", "university"],
            "technology": ["smartphone", "computer", "internet"],
            "health": ["health", "medical", "condition"],
            "shopping": ["shopping", "purchase", "buy"],
            "travel": ["travel", "vacation", "trip"],
            "automotive": ["car", "vehicle", "automotive"],
            "media": ["tv", "movie", "entertainment"],
            "food": ["food", "drink", "beverage", "alcohol"]
        }
        
        # Get page text to understand the question
        page_text = await iframe.locator('body').inner_text()
        page_text_lower = page_text.lower()
        
        # Determine what type of question this is
        question_type = None
        for pattern, keywords in question_patterns.items():
            if any(keyword in page_text_lower for keyword in keywords):
                question_type = pattern
                break
        
        if question_type:
            print(f"Detected question type: {question_type}")
            
            # Get appropriate answer from persona
            answer = get_radio_answer_from_persona(question_type, persona)
            if answer:
                print(f"Looking for radio option: {answer}")
                
                # Try to find and click the appropriate radio button
                for i in range(label_count):
                    try:
                        label_text = await radio_labels.nth(i).inner_text()
                        if answer.lower() in label_text.lower() or label_text.lower() in answer.lower():
                            await radio_labels.nth(i).click()
                            print(f"Selected radio option: {label_text}")
                            return True
                    except Exception:
                        continue
        
        # If we can't determine the question type, try to select the first available option
        print("Could not determine question type, selecting first available option...")
        try:
            await radio_labels.first.click()
            print("Selected first available radio option")
            return True
        except Exception as e:
            print(f"Could not select first radio option: {e}")
            return False
            
    except Exception as e:
        print(f"Error handling radio button selection: {e}")
        return False

async def handle_checkbox_selection(iframe, persona):
    """
    Handle checkbox selection based on persona data.
    """
    try:
        # Get all checkbox labels
        checkbox_labels = iframe.locator('label')
        label_count = await checkbox_labels.count()
        
        print(f"Found {label_count} potential checkbox labels")
        
        # For checkboxes, we typically want to select multiple options
        # Look for common checkbox question patterns
        page_text = await iframe.locator('body').inner_text()
        page_text_lower = page_text.lower()
        
        # Common checkbox question patterns
        if any(keyword in page_text_lower for keyword in ["select all", "choose all", "multiple"]):
            # Select all checkboxes
            for i in range(label_count):
                try:
                    await checkbox_labels.nth(i).click()
                    print(f"Selected checkbox {i}")
                except Exception:
                    continue
        else:
            # Select first few checkboxes (common pattern)
            for i in range(min(3, label_count)):
                try:
                    await checkbox_labels.nth(i).click()
                    print(f"Selected checkbox {i}")
                except Exception:
                    continue
        
        return True
        
    except Exception as e:
        print(f"Error handling checkbox selection: {e}")
        return False

def get_field_value_from_persona(field_key, persona):
    """
    Extract field value from persona data based on field key.
    """
    field_mapping = {
        "zipcode": persona.get("about_you", {}).get("zipcode"),
        "city": persona.get("about_you", {}).get("city"),
        "state": persona.get("about_you", {}).get("state"),
        "name": persona.get("about_you", {}).get("full_name"),
        "email": persona.get("about_you", {}).get("email"),
        "age": str(persona.get("about_you", {}).get("age", "")),
        "gender": persona.get("about_you", {}).get("gender"),
        "income": persona.get("work", {}).get("personal_income_before_taxes"),
        "education": "Graduated 4 year college/University",  # Default from persona
        "employment": persona.get("work", {}).get("employment_status"),
        "address": f"123 Main St, {persona.get('about_you', {}).get('city', 'Los Angeles')}, {persona.get('about_you', {}).get('state', 'California')} {persona.get('about_you', {}).get('zipcode', '90001')}"
    }
    
    return field_mapping.get(field_key)

def get_radio_answer_from_persona(question_type, persona):
    """
    Get appropriate radio button answer based on question type and persona data.
    """
    answer_mapping = {
        "gender": persona.get("about_you", {}).get("gender", "Male"),
        "marital": persona.get("home", {}).get("marital_status", "Married"),
        "employment": persona.get("work", {}).get("employment_status", "Employed full-time"),
        "income": persona.get("work", {}).get("personal_income_before_taxes", "$150,000 - $199,999"),
        "education": "Graduated 4 year college/University",  # Default from persona
        "technology": "Yes, I own a smartphone",  # From persona
        "health": "Good",  # Default health status
        "shopping": "Online shopping",  # From persona
        "travel": "Yes, 2-3 times",  # From persona
        "automotive": "Yes",  # From persona
        "media": "Several times a day",  # From persona
        "food": "1 to 3 drinks per week"  # From persona
    }
    
    return answer_mapping.get(question_type)

async def detect_survey_completion(page, iframe_locator):
    """
    Detect if the survey has been completed.
    """
    try:
        # Check main page for completion indicators
        main_page_text = await page.inner_text('body')
        if any(keyword in main_page_text.lower() for keyword in ["thank you", "survey complete", "completion", "finished", "100%", "congratulations"]):
            return True
        
        # Check iframe for completion indicators
        try:
            iframe_text = await iframe_locator.locator('body').inner_text()
            if any(keyword in iframe_text.lower() for keyword in ["thank you", "survey complete", "completion", "finished", "100%", "congratulations"]):
                return True
        except Exception:
            pass
        
        # Check for completion URLs
        current_url = page.url
        if any(keyword in current_url.lower() for keyword in ["complete", "finished", "thank", "success"]):
            return True
        
        return False
    except Exception as e:
        print(f"Error detecting survey completion: {e}")
        return False

async def handle_survey_completion(page, iframe_locator):
    """
    Handle the survey completion process.
    """
    try:
        print("🎉 Survey completed successfully! 🎉")
        
        # Wait a moment to see if there are any final actions needed
        await asyncio.sleep(2)
        
        # Check for any final buttons (like "Continue to Dashboard", "Get Rewards", etc.)
        try:
            final_buttons = page.locator('button:has-text("Continue"), button:has-text("Dashboard"), button:has-text("Rewards"), button:has-text("Finish")')
            if await final_buttons.count() > 0:
                await final_buttons.first.click()
                print("Clicked final completion button")
        except Exception:
            pass
        
        return True
    except Exception as e:
        print(f"Error handling survey completion: {e}")
        return True  # Still consider it complete even if there's an error

async def handle_remaining_survey_pages(iframe, page, persona):
    """
    Handle any remaining survey pages that don't fit into specific categories.
    This is a comprehensive fallback handler.
    """
    try:
        print("Handling remaining survey page with comprehensive approach...")
        
        # Get all interactive elements
        buttons = await iframe.locator('button').all()
        inputs = await iframe.locator('input').all()
        selects = await iframe.locator('select').all()
        links = await iframe.locator('a').all()
        labels = await iframe.locator('label').all()
        
        all_elements = buttons + inputs + selects + links + labels
        print(f"Found {len(all_elements)} total interactive elements")
        
        # First, try to fill any text inputs
        for element in inputs:
            try:
                input_type = await element.get_attribute('type')
                if input_type in ['text', 'email', 'password', 'number']:
                    placeholder = await element.get_attribute('placeholder') or ''
                    name = await element.get_attribute('name') or ''
                    
                    # Determine what to fill based on field characteristics
                    if any(keyword in (placeholder + name).lower() for keyword in ['name', 'full']):
                        await element.fill(persona.get('about_you', {}).get('full_name', 'John Doe'))
                    elif any(keyword in (placeholder + name).lower() for keyword in ['email', 'e-mail']):
                        await element.fill(persona.get('about_you', {}).get('email', 'test@example.com'))
                    elif any(keyword in (placeholder + name).lower() for keyword in ['phone', 'mobile']):
                        await element.fill('555-123-4567')
                    elif any(keyword in (placeholder + name).lower() for keyword in ['zip', 'postal']):
                        await element.fill(persona.get('about_you', {}).get('zipcode', '90001'))
                    elif any(keyword in (placeholder + name).lower() for keyword in ['city']):
                        await element.fill(persona.get('about_you', {}).get('city', 'Los Angeles'))
                    elif any(keyword in (placeholder + name).lower() for keyword in ['state']):
                        await element.fill(persona.get('about_you', {}).get('state', 'California'))
                    else:
                        # Generic text field - fill with a reasonable default
                        await element.fill('Test response')
                    
                    print(f"Filled text input: {placeholder or name}")
            except Exception as e:
                continue
        
        # Handle radio buttons
        radio_inputs = await iframe.locator('input[type="radio"]').all()
        if radio_inputs:
            print(f"Found {len(radio_inputs)} radio buttons")
            # Select the first radio button in each group
            selected_groups = set()
            for radio in radio_inputs:
                try:
                    name = await radio.get_attribute('name')
                    if name and name not in selected_groups:
                        await radio.click()
                        selected_groups.add(name)
                        print(f"Selected radio button in group: {name}")
                except Exception:
                    continue
        
        # Handle checkboxes
        checkbox_inputs = await iframe.locator('input[type="checkbox"]').all()
        if checkbox_inputs:
            print(f"Found {len(checkbox_inputs)} checkboxes")
            # Select first few checkboxes
            for i, checkbox in enumerate(checkbox_inputs[:3]):
                try:
                    await checkbox.click()
                    print(f"Selected checkbox {i+1}")
                except Exception:
                    continue
        
        # Look for submit/continue buttons
        submit_selectors = [
            'button:has-text("Next")',
            'button:has-text("Continue")', 
            'button:has-text("Submit")',
            'button:has-text("Confirm")',
            'button:has-text("Yes")',
            'button:has-text("Agree")',
            'input[type="submit"]',
            'button[type="submit"]'
        ]
        
        for selector in submit_selectors:
            try:
                submit_button = iframe.locator(selector)
                if await submit_button.count() > 0:
                    await submit_button.first.click()
                    print(f"Clicked submit button: {selector}")
                    await asyncio.sleep(2)
                    return True
            except Exception:
                continue
        
        # If no submit button found, try clicking any visible button
        try:
            visible_buttons = iframe.locator('button:visible')
            if await visible_buttons.count() > 0:
                await visible_buttons.first.click()
                print("Clicked first visible button")
                await asyncio.sleep(2)
                return True
        except Exception as e:
            print(f"Could not click any visible button: {e}")
        
        return False
        
    except Exception as e:
        print(f"Error in comprehensive survey handler: {e}")
        return False

async def page_router(page):
    print("Routing page...")
    iframe_locator = page.frame_locator('iframe[title="signup-survey"]')
    try:
        await iframe_locator.locator('body').wait_for(timeout=10000)
        
        # Check for survey completion first
        if await detect_survey_completion(page, iframe_locator):
            return await handle_survey_completion(page, iframe_locator)
        
        # Get page text for better detection
        page_text = await iframe_locator.locator('body').inner_text()
        page_text_lower = page_text.lower()
        
        print(f"Page content preview: {page_text[:200]}...")
        
        # Check for Date of Birth page
        if (await iframe_locator.get_by_placeholder("MM").is_visible(timeout=2000) and
            await iframe_locator.get_by_placeholder("DD").is_visible(timeout=2000) and
            await iframe_locator.get_by_placeholder("YYYY").is_visible(timeout=2000)):
            return await handle_date_of_birth_page(iframe_locator, page, PERSONA)
        
        # Check for Address page (either initial consent page or full address form)
        elif (await iframe_locator.get_by_placeholder("Zipcode").is_visible(timeout=2000) or
              "zipcode" in page_text_lower or "address" in page_text_lower):
            return await handle_address_page(iframe_locator, page, PERSONA)
        
        # Check for Ethnicity page (look for ethnicity-related text)
        elif any(keyword in page_text_lower for keyword in ["accurate matching", "ethnicity", "race", "background"]):
            return await handle_ethnicity_page(iframe_locator, page, PERSONA)
        
        # Check for consent/opt-in pages
        elif any(keyword in page_text_lower for keyword in ["consent", "agree", "opt-in", "permission", "allow"]):
            return await handle_consent_page(iframe_locator, page, PERSONA)
        
        # Check for any remaining form pages that need filling
        elif any(keyword in page_text_lower for keyword in ["form", "question", "survey", "input"]):
            return await handle_general_form_page(iframe_locator, page, PERSONA)
        
        else:
            return await handle_remaining_survey_pages(iframe_locator, page, PERSONA)
    except Exception as e:
        print(f"Error in page router: {e}")
        return await solve_page_with_hybrid_vision_dom(page, page)


async def main():
    if not os.path.exists('auth.json'):
        print("Authentication file (auth.json) not found. Run 'save_auth.py' first.")
        return

    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=False, slow_mo=10)
        context = await browser.new_context(storage_state="auth.json")
        page = await context.new_page()

        print("Session loaded. Navigating to surveys...")
        await page.goto("https://www.qmee.com/en-us/surveys", timeout=60000)

        try:
            print("Looking for a survey to start...")
            await page.wait_for_selector('button:has-text("Start earning"), a.survey-card', state='visible', timeout=20000)
            start_earning_button = page.get_by_role('button', name='Start earning')
            if await start_earning_button.is_visible():
                await start_earning_button.click()
                print("Clicked 'Start earning' button")
            else:
                survey_card = await page.locator('a.survey-card').first
                await survey_card.click()
                print("Clicked first survey card")
        except Exception as e:
            print(f"Could not auto-start a survey. Please navigate manually. Error: {e}")
            input("Press Enter once you are on a survey page.")

        failures_on_current_page = 0
        last_url = ""
        MAX_FAILURES = 20  # Increased to allow for longer surveys
        consecutive_no_progress = 0
        MAX_NO_PROGRESS = 8  # Increased tolerance
        pages_processed = 0

        print("\n" + "="*50)
        print("STARTING SURVEY BOT")
        print("="*50)

        for i in range(MAX_FAILURES):
            print(f"\n--- Page {i+1} ---")
            try:
                await page.wait_for_load_state('domcontentloaded', timeout=5000) 
                current_url = page.url
                
                # Check if we're still on the same URL
                if current_url == last_url:
                    failures_on_current_page += 1
                    consecutive_no_progress += 1
                else:
                    failures_on_current_page = 0
                    consecutive_no_progress = 0
                    pages_processed += 1
                
                print(f"Current URL: {current_url}")
                print(f"Pages processed: {pages_processed}, Failures: {failures_on_current_page}, No Progress: {consecutive_no_progress}")

                # Check for survey completion indicators
                try:
                    iframe_locator = page.frame_locator('iframe[title="signup-survey"]')
                    if await detect_survey_completion(page, iframe_locator):
                        await handle_survey_completion(page, iframe_locator)
                        break
                except Exception as e:
                    print(f"Error checking completion: {e}")
                    pass

                # Circuit breaker for getting stuck
                if failures_on_current_page >= MAX_FAILURES:
                    print(f"Circuit breaker triggered! Bot is stuck on {current_url}. Stopping.")
                    break
                
                if consecutive_no_progress >= MAX_NO_PROGRESS:
                    print(f"Bot has made no progress for {MAX_NO_PROGRESS} attempts. Stopping.")
                    break
                
                last_url = current_url
            except Exception as e:
                print(f"Error checking page state: {e}")
                consecutive_no_progress += 1
                pass
            
            try:
                await page.wait_for_selector('body button, body input, body a, body label, iframe', timeout=30000)
            except Exception:
                print("No interactive elements found on main page or iframe. Survey may have ended.")
                break
            
            success = await page_router(page)
            if not success:
                consecutive_no_progress += 1
                print(f"No action taken on this page. No progress count: {consecutive_no_progress}")
            else:
                consecutive_no_progress = 0
                print("✅ Successfully processed page")
            
            await asyncio.sleep(3)

        # Final check for survey completion
        print("\n" + "="*50)
        print("FINAL SURVEY STATUS")
        print("="*50)
        
        try:
            iframe_locator = page.frame_locator('iframe[title="signup-survey"]')
            if await detect_survey_completion(page, iframe_locator):
                await handle_survey_completion(page, iframe_locator)
                print("🎉 Survey completed successfully! 🎉")
            else:
                print(f"Bot has finished its run. Processed {pages_processed} pages.")
                print("Survey may be complete or may need manual intervention.")
        except Exception as e:
            print(f"Bot has finished its run. Final check error: {e}")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())