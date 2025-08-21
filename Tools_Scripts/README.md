# Tools Scripts Directory

This directory contains utility scripts for setting up and managing the SurveyBot v2 system.

## LifePoints Scripts

### 🔐 `save_lifepoints_auth.py`
Saves your LifePoints login session to avoid repeated authentication.
- Opens browser and navigates to LifePoints login page
- Waits for manual login completion
- Saves session to `auth.json` for future use

**Usage**: `python3 Tools_Scripts/save_lifepoints_auth.py`

### 🔑 `setup_lifepoints_credentials.py`
Sets up LifePoints credentials in your `.env` file.
- Interactive credential input
- Secure password handling
- Updates existing `.env` files

**Usage**: `python3 Tools_Scripts/setup_lifepoints_credentials.py`

### 📦 `install_lifepoints_deps.py`
Automatically installs LifePoints dependencies.
- Installs Playwright and browsers
- Verifies installation
- Provides troubleshooting steps

**Usage**: `python3 Tools_Scripts/install_lifepoints_deps.py`

## Testing Scripts

### 🧪 `test_lifepoints_bot.py`
Tests the LifePoints bot functionality.
- Verifies bot import and initialization
- Tests browser startup and login
- Validates survey discovery

**Usage**: `python3 Tools_Scripts/test_lifepoints_bot.py`

## Setup Workflow

1. **Install Dependencies**:
   ```bash
   python3 Tools_Scripts/install_lifepoints_deps.py
   ```

2. **Set Up Credentials**:
   ```bash
   python3 Tools_Scripts/setup_lifepoints_credentials.py
   ```

3. **Save Authentication Session**:
   ```bash
   python3 Tools_Scripts/save_lifepoints_auth.py
   ```

4. **Test the Bot**:
   ```bash
   python3 Tools_Scripts/test_lifepoints_bot.py
   ```

5. **Run the Bot**:
   ```bash
   python3 Main_Files_to_Run/run_bot.py --platform lifepoints
   ```

## Troubleshooting

- **ModuleNotFoundError**: Run the installer script first
- **Virtual Environment**: Ensure `source venv/bin/activate` is run
- **Dependencies**: Use `install_lifepoints_deps.py` for automatic setup
- **Authentication**: Run `save_lifepoints_auth.py` if sessions expire

## File Locations

- **Authentication State**: `Main_Files_to_Run/auth.json`
- **Environment Variables**: `../.env`
- **Bot Implementation**: `../Project_Structure/bot_implementations/lifepoints_enhanced_bot.py`
