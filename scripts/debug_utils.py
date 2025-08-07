# debug_utils.py
import os

# List of files that define our project's context.
PROJECT_FILES = ['bot.py', 'actions.py', 'persona.json']

def get_project_context():
    """Reads all project files and combines them into a single string for the AI."""
    context_str = "--- START OF PROJECT FILES ---\n"
    for file_path in PROJECT_FILES:
        try:
            with open(file_path, 'r') as f:
                content = f.read()
                context_str += f"\n--- File: {file_path} ---\n"
                context_str += content
                context_str += f"\n--- End of File: {file_path} ---\n"
        except FileNotFoundError:
            context_str += f"\n--- File: {file_path} (Not Found) ---\n"
        except Exception as e:
            context_str += f"\n--- Error reading {file_path}: {e} ---\n"
            
    context_str += "\n--- END OF PROJECT FILES ---\n"
    return context_str

def apply_fix(file_path, new_code):
    """Safely overwrites a file with new code provided by the AI."""
    if not os.path.exists(file_path):
        print(f"Error: Cannot apply fix. File '{file_path}' does not exist.")
        return False
    try:
        with open(file_path, 'w') as f:
            f.write(new_code)
        print(f"Successfully applied fix to '{file_path}'.")
        return True
    except Exception as e:
        print(f"Error applying fix to '{file_path}': {e}")
        return False