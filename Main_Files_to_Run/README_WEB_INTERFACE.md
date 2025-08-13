# Survey Bot Web Interface

A beautiful web-based control panel for the Survey Bot with real-time monitoring and control capabilities.

## Features

- 🎛️ **Easy Configuration**: Dropdown menus for all bot settings
- 🚀 **One-Click Start/Stop**: Simple button controls for bot operation
- 📊 **Real-Time Status**: Live updates on bot status and configuration
- 📝 **Activity Logs**: Real-time logging of bot activities
- 🔌 **WebSocket Connection**: Persistent connection for instant updates
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### 1. Install Dependencies

```bash
# Activate your virtual environment
source ../.venv/bin/activate

# Install web interface dependencies
pip install -r requirements_web.txt
```

### 2. Start the Web Interface

```bash
# Option 1: Use the dedicated script
python3 start_web_interface.py

# Option 2: Use run_bot.py with web interface flag
python3 run_bot.py --web-interface
```

### 3. Access the Interface

Open your web browser and navigate to:
```
http://localhost:5000
```

## Usage

### Starting the Bot

1. Select your preferred **Implementation** (Playwright recommended)
2. Choose the **Platform** (Qmee, CPX Research, etc.)
3. Pick a **Personality** mode
4. Set **Max Surveys** limit
5. Configure **Advanced Options** as needed
6. Click **🚀 Start Bot**

### Stopping the Bot

- Click the **🛑 Stop Bot** button to safely stop the bot
- The button will be enabled only when the bot is running

### Monitoring

- **Status Panel**: Shows current bot status, implementation, platform, and personality
- **Activity Logs**: Real-time updates of bot activities
- **Connection Status**: Top-right indicator shows connection health

## Configuration Options

### Bot Configuration
- **Implementation**: Playwright, Selenium, Undetected Chrome, V2Ray, Proxychains, Hybrid
- **Platform**: Qmee, CPX Research, PureSpectrum
- **Personality**: Enhanced AI, Natural Conversation, Professional, Casual
- **Max Surveys**: Number of surveys to complete (1-50)

### Advanced Options
- **Headless Mode**: Run browser in background or visible
- **Proxy Configuration**: V2Ray, Proxychains, Standard HTTP, or None
- **Captcha Handling**: Auto-solve, Manual, or Skip
- **Typing Simulation**: Enable/disable human-like typing

## Troubleshooting

### Connection Issues
- Check if the web interface is running on the correct port
- Ensure no firewall is blocking port 5000
- Verify the virtual environment is activated

### Bot Not Starting
- Check the activity logs for error messages
- Ensure all required dependencies are installed
- Verify your configuration settings

### Flask Import Errors
```bash
pip install flask flask-socketio python-socketio python-engineio
```

## Security Notes

- The web interface runs on `0.0.0.0:5000` by default
- This makes it accessible from other devices on your network
- For production use, consider:
  - Adding authentication
  - Restricting to localhost only
  - Using HTTPS
  - Implementing rate limiting

## Technical Details

- **Backend**: Flask with Flask-SocketIO
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Communication**: WebSocket for real-time updates
- **Architecture**: Threaded bot execution with web interface
- **Status Sync**: Automatic status synchronization every 5 seconds

## Development

The web interface is built into `run_bot.py` and can be extended by:
- Adding new configuration options
- Implementing additional monitoring features
- Creating custom bot control actions
- Adding user authentication and management
