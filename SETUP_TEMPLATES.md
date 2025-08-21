# Setup Guide - Using Templates

This guide explains how to set up the project using the provided template files.

## Security Notice

The repository now contains template files instead of actual configuration files with sensitive information. This ensures that no API keys, passwords, or authentication tokens are accidentally committed to version control.

## Required Setup Steps

### 1. Environment Configuration

Copy the template files to create your actual configuration:

```bash
# Root directory
cp .env.template .env
cp auth.json.template auth.json

# Main_Files_to_Run directory
cp Main_Files_to_Run/.env.template Main_Files_to_Run/.env
cp Main_Files_to_Run/auth.json.template Main_Files_to_Run/auth.json
```

### 2. Fill in Your Configuration

Edit the `.env` files with your actual values:

- **API Keys**: Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/)
- **OpenAI API Key**: Get your key from [OpenAI Platform](https://platform.openai.com/)
- **Qmee Credentials**: Your actual Qmee email and password
- **CPX Research Settings**: Your CPX app ID and user ID
- **Proxy Settings**: Your proxy configuration (if using)

### 3. Authentication Setup

The `auth.json` files contain cookie and token templates. You'll need to:

1. Log into Qmee manually in your browser
2. Use browser developer tools to export cookies
3. Replace the placeholder values in `auth.json` with actual tokens

## Template Files

- `.env.template` - Environment configuration template
- `auth.json.template` - Authentication data template
- `Main_Files_to_Run/.env.template` - Main execution directory environment template
- `Main_Files_to_Run/auth.json.template` - Main execution directory authentication template

## Important Notes

- **Never commit** the actual `.env` or `auth.json` files
- The `.gitignore` file is configured to exclude these sensitive files
- Always use the template files as a starting point
- Keep your API keys and credentials secure

## Getting Started

After setting up your configuration files:

1. Install dependencies: `pip install -r requirements.txt`
2. Activate virtual environment: `source venv/bin/activate`
3. Run the bot: `python Main_Files_to_Run/run_bot.py`

## Support

If you encounter issues during setup, check that:
- All required fields in the template files are filled
- API keys are valid and have proper permissions
- Authentication tokens are current and valid
