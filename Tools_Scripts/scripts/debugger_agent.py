import os
import json
import asyncio # <<< FIX HERE: Added missing import
from dotenv import load_dotenv
import google.generativeai as genai

# This will now be resolved correctly by the VS Code setting
import debug_utils

load_dotenv()

# --- CONFIGURATION ---
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "YOUR_GOOGLE_API_KEY")
if not GOOGLE_API_KEY or GOOGLE_API_KEY == "YOUR_GOOGLE_API_KEY":
    print("ERROR: GOOGLE_API_KEY not found in .env file. Please set it.")
    exit()
# This is the correct way to configure the library
genai.configure(api_key=GOOGLE_API_KEY) # type: ignore
model = genai.GenerativeModel('gemini-1.5-pro-latest', generation_config={"response_mime_type": "application/json"}) # pyright: ignore[reportPrivateImportUsage]

async def main():
    print("--- AI Debugger Agent Initialized ---")
    
    # 1. Gather Context
    project_context = debug_utils.get_project_context()
    
    # 2. Get the Error from the User
    print("\nPlease paste the full error message from the terminal below.")
    print("Press Ctrl+D (on Linux/Mac) or Ctrl+Z then Enter (on Windows) when you are done.")
    error_message_lines = []
    while True:
        try:
            line = input()
            error_message_lines.append(line)
        except EOFError:
            break
    error_message = "\n".join(error_message_lines)

    if not error_message:
        print("No error message provided. Exiting.")
        return

    # 3. Construct the Prompt for the AI
    prompt = f"""
    You are an expert Python debugging agent. Your task is to analyze a set of project files and an error message, identify the root cause of the error, and provide a complete, corrected version of the file that needs to be fixed.

    Here is the full context of the project:
    {project_context}

    Here is the error message the user encountered:
    --- ERROR MESSAGE ---
    {error_message}
    --- END OF ERROR MESSAGE ---

    Based on your analysis, provide a fix. Your response MUST be a single JSON object with two keys:
    1. "file_to_fix": A string containing the exact filename that needs to be modified (e.g., "bot.py").
    2. "fixed_code": A string containing the ENTIRE, complete, corrected code for that file.

    Example Response:
    {{"file_to_fix": "bot.py", "fixed_code": "import asyncio\\n\\nasync def main():\\n    # ... corrected code here ...\\n"}}
    """

    # 4. Call the AI Brain
    print("\nSending context to AI for analysis... Please wait.")
    try:
        response = await model.generate_content_async(prompt)
        decision_json = json.loads(response.text)
        
        file_to_fix = decision_json.get('file_to_fix')
        fixed_code = decision_json.get('fixed_code')

        if not file_to_fix or not fixed_code:
            print("\nAI response was malformed. Could not get a fix.")
            print(response.text)
            return
            
        # 5. Propose the Fix and Ask for Confirmation
        print("\n--- AI Suggests the Following Fix ---")
        print(f"File to be modified: {file_to_fix}")
        print("---------------------------------------")
        # print(fixed_code) # Uncomment to see the full proposed code
        print("---------------------------------------")

        user_confirmation = input("Do you want to apply this fix? (yes/no): ").lower()

        if user_confirmation in ['yes', 'y']:
            debug_utils.apply_fix(file_to_fix, fixed_code)
        else:
            print("Fix aborted by user.")

    except Exception as e:
        print(f"\nAn error occurred while communicating with the AI: {e}")


if __name__ == "__main__":
    # <<< FIX HERE: 'asyncio' is now defined >>>
    asyncio.run(main())