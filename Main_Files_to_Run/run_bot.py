#!/usr/bin/env python3
# This script should be run with the virtual environment activated
# Run: source ../venv/bin/activate && python3 run_bot.py
"""
Enhanced Main Runner Script for Survey Automation Bot.
Supports multiple implementations with advanced AI personality and typing simulation.
"""

import sys
import os
import argparse
import asyncio
import json
import logging
from typing import Optional, Dict, Any, List
from pathlib import Path
import time
import traceback

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure"))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

# Web interface imports
try:
    from flask import Flask, render_template_string, request, jsonify, redirect, url_for
    from flask_socketio import SocketIO, emit
    import threading
    FLASK_AVAILABLE = True
    print("✅ Flask web interface available")
except ImportError as e:
    FLASK_AVAILABLE = False
    print(f"⚠️ Flask not available: {e}")
    print("Web interface will be disabled")

from Project_Structure.config import Config, create_sample_env

# Web interface HTML template
WEB_INTERFACE_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Survey Bot Control Panel</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1em;
        }
        .content {
            padding: 30px;
        }
        .control-panel {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }
        .control-section {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #e9ecef;
        }
        .control-section h3 {
            margin: 0 0 20px 0;
            color: #495057;
            font-size: 1.3em;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #495057;
        }
        .form-group select, .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }
        .form-group select:focus, .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        .button-group {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }
        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            flex: 1;
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        .btn-danger {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
        }
        .btn-danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        .btn-secondary:hover {
            background: #5a6268;
        }
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        .status-panel {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #e9ecef;
            margin-bottom: 30px;
        }
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .status-item {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }
        .status-item h4 {
            margin: 0 0 10px 0;
            color: #495057;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .status-item .value {
            font-size: 1.5em;
            font-weight: 600;
            color: #667eea;
        }
        .status-item .status-running {
            color: #28a745;
        }
        .status-item .status-stopped {
            color: #dc3545;
        }
        .logs-panel {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #e9ecef;
        }
        .logs-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .logs-header h3 {
            margin: 0;
            color: #495057;
        }
        .clear-logs {
            background: #6c757d;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
        }
        .logs-container {
            background: #2d3748;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            max-height: 400px;
            overflow-y: auto;
            white-space: pre-wrap;
        }
        .log-entry {
            margin-bottom: 5px;
            padding: 2px 0;
        }
        .log-entry:last-child {
            margin-bottom: 0;
        }
        .connection-status {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 12px;
            font-weight: 600;
            z-index: 1000;
        }
        .connected {
            background: #28a745;
            color: white;
        }
        .disconnected {
            background: #dc3545;
            color: white;
        }
        .connecting {
            background: #ffc107;
            color: #212529;
        }
        @media (max-width: 768px) {
            .control-panel {
                grid-template-columns: 1fr;
            }
            .button-group {
                flex-direction: column;
            }
            .status-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="connection-status" id="connectionStatus">
        <span id="connectionText">Connecting...</span>
    </div>
    
    <div class="container">
        <div class="header">
            <h1>🤖 Survey Bot Control Panel</h1>
            <p>Advanced automation with AI personality and enhanced features</p>
        </div>
        
        <div class="content">
            <div class="control-panel">
                <div class="control-section">
                    <h3>🚀 Bot Configuration</h3>
                    <div class="form-group">
                        <label for="implementation">Implementation:</label>
                        <select id="implementation">
                            <option value="playwright">Playwright (Recommended)</option>
                            <option value="selenium">Selenium</option>
                            <option value="undetected">Undetected Chrome</option>
                            <option value="v2ray">V2Ray Proxy</option>
                            <option value="proxychains">Proxychains</option>
                            <option value="hybrid">Hybrid/DOM Model</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="platform">Platform:</label>
                        <select id="platform">
                            <option value="qmee">Qmee</option>
                            <option value="cpx">CPX Research</option>
                            <option value="pure">PureSpectrum</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="personality">Personality:</label>
                        <select id="personality">
                            <option value="enhanced">Enhanced AI</option>
                            <option value="natural">Natural Conversation</option>
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="maxSurveys">Max Surveys:</label>
                        <input type="number" id="maxSurveys" value="5" min="1" max="50">
                    </div>
                    <div class="button-group">
                        <button class="btn btn-primary" id="startBtn" onclick="startBot()">
                            🚀 Start Bot
                        </button>
                        <button class="btn btn-danger" id="stopBtn" onclick="stopBot()" disabled>
                            🛑 Stop Bot
                        </button>
                    </div>
                </div>
                
                <div class="control-section">
                    <h3>⚙️ Advanced Options</h3>
                    <div class="form-group">
                        <label for="headless">Headless Mode:</label>
                        <select id="headless">
                            <option value="false">No (Show Browser)</option>
                            <option value="true">Yes (Background)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="proxy">Proxy Configuration:</label>
                        <select id="proxy">
                            <option value="none">No Proxy</option>
                            <option value="v2ray">V2Ray</option>
                            <option value="proxychains">Proxychains</option>
                            <option value="standard">Standard HTTP</option>
                        </select>
                    </div>
                    <!-- CAPTCHA handling disabled -->
                    <div class="form-group">
                        <label for="typing">Typing Simulation:</label>
                        <select id="typing">
                            <option value="enabled">Enabled</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </div>
                    <div class="button-group">
                        <button class="btn btn-secondary" onclick="checkStatus()">
                            🔍 Check Status
                        </button>
                        <button class="btn btn-secondary" onclick="clearLogs()">
                            🗑️ Clear Logs
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="status-panel">
                <h3>📊 Bot Status</h3>
                <div class="status-grid">
                    <div class="status-item">
                        <h4>Status</h4>
                        <div class="value" id="statusValue">Stopped</div>
                    </div>
                    <div class="status-item">
                        <h4>Implementation</h4>
                        <div class="value" id="implementationValue">-</div>
                    </div>
                    <div class="status-item">
                        <h4>Platform</h4>
                        <div class="value" id="platformValue">-</div>
                    </div>
                    <div class="status-item">
                        <h4>Personality</h4>
                        <div class="value" id="personalityValue">-</div>
                    </div>
                </div>
            </div>
            
            <div class="logs-panel">
                <div class="logs-header">
                    <h3>📝 Activity Logs</h3>
                    <button class="clear-logs" onclick="clearLogs()">Clear Logs</button>
                </div>
                <div class="logs-container" id="logsContainer">
                    <div class="log-entry">🤖 Survey Bot Control Panel initialized</div>
                    <div class="log-entry">📡 Connecting to server...</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let socket;
        let isConnected = false;
        let botRunning = false;

        function connectWebSocket() {
            socket = io();
            
            socket.on('connect', function() {
                console.log('Connected to server');
                isConnected = true;
                updateConnectionStatus('connected', 'Connected');
                addLog('✅ Connected to server');
                requestStatus();
            });
            
            socket.on('disconnect', function() {
                console.log('Disconnected from server');
                isConnected = false;
                updateConnectionStatus('disconnected', 'Disconnected');
                addLog('❌ Disconnected from server');
            });
            
            socket.on('bot_status', function(data) {
                console.log('Received status update:', data);
                updateStatus(data);
            });
            
            socket.on('bot_log', function(data) {
                console.log('Received log:', data);
                addLog(data.message);
            });
            
            socket.on('bot_stats', function(data) {
                console.log('Received stats:', data);
                // Handle stats update if needed
            });
            
            socket.on('connect_error', function(error) {
                console.log('Connection error:', error);
                updateConnectionStatus('disconnected', 'Connection Error');
                addLog('❌ Connection error: ' + error);
            });
        }

        function updateConnectionStatus(status, text) {
            const statusElement = document.getElementById('connectionStatus');
            const textElement = document.getElementById('connectionText');
            
            statusElement.className = 'connection-status ' + status;
            textElement.textContent = text;
        }

        function updateStatus(data) {
            const statusValue = document.getElementById('statusValue');
            const implementationValue = document.getElementById('implementationValue');
            const platformValue = document.getElementById('platformValue');
            const personalityValue = document.getElementById('personalityValue');
            
            if (data.status) {
                statusValue.textContent = data.status;
                statusValue.className = 'value status-' + data.status.toLowerCase();
                botRunning = data.status === 'Running';
            }
            
            if (data.implementation) {
                implementationValue.textContent = data.implementation;
            }
            
            if (data.platform) {
                platformValue.textContent = data.platform;
            }
            
            if (data.personality) {
                personalityValue.textContent = data.personality;
            }
            
            updateButtonStates();
        }

        function updateButtonStates() {
            const startBtn = document.getElementById('startBtn');
            const stopBtn = document.getElementById('stopBtn');
            
            if (botRunning) {
                startBtn.disabled = true;
                stopBtn.disabled = false;
                startBtn.textContent = '🔄 Running...';
                stopBtn.textContent = '🛑 Stop Bot';
            } else {
                startBtn.disabled = false;
                stopBtn.disabled = true;
                startBtn.textContent = '🚀 Start Bot';
                stopBtn.textContent = '🛑 Stop Bot';
            }
        }

        function addLog(message) {
            const logsContainer = document.getElementById('logsContainer');
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = message;
            logsContainer.appendChild(logEntry);
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }

        function startBot() {
            if (!isConnected) {
                addLog('❌ Not connected to server');
                return;
            }
            
            const config = {
                implementation: document.getElementById('implementation').value,
                platform: document.getElementById('platform').value,
                personality: document.getElementById('personality').value,
                max_surveys: parseInt(document.getElementById('maxSurveys').value),
                headless: document.getElementById('headless').value === 'true',
                proxy: document.getElementById('proxy').value,
                // CAPTCHA handling disabled
                typing: document.getElementById('typing').value
            };
            
            addLog('🚀 Starting bot with configuration: ' + JSON.stringify(config));
            
            fetch('/api/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    addLog('❌ Error starting bot: ' + data.error);
                } else {
                    addLog('✅ Bot start request sent');
                }
            })
            .catch(error => {
                addLog('❌ Error starting bot: ' + error);
            });
        }

        function stopBot() {
            if (!isConnected) {
                addLog('❌ Not connected to server');
                return;
            }
            
            addLog('🛑 Stopping bot...');
            
            fetch('/api/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    addLog('❌ Error stopping bot: ' + data.error);
                } else {
                    addLog('✅ Bot stop request sent');
                }
            })
            .catch(error => {
                addLog('❌ Error stopping bot: ' + error);
            });
        }

        function checkStatus() {
            if (isConnected) {
                socket.emit('request_status');
                addLog('🔍 Status check requested');
            } else {
                addLog('❌ Not connected to server');
            }
        }

        function clearLogs() {
            const logsContainer = document.getElementById('logsContainer');
            logsContainer.innerHTML = '<div class="log-entry">🗑️ Logs cleared</div>';
        }

        function requestStatus() {
            if (isConnected) {
                socket.emit('request_status');
            }
        }

        // Initialize connection
        document.addEventListener('DOMContentLoaded', function() {
            connectWebSocket();
            
            // Request status every 10 seconds as backup
            setInterval(requestStatus, 10000);
        });
    </script>
</body>
</html>
"""

# Enhanced features imports
try:
    from Project_Structure.enhanced_personality_system import EnhancedPersonalitySystem, generate_enhanced_response
    from Project_Structure.enhanced_bot_integration import EnhancedBotIntegration, SurveyBotEnhancer
    from Project_Structure.typing_simulation import TypingSimulator, type_text_naturally
    # CAPTCHA handling disabled
    FreeCaptchaSolver = None
    ENHANCED_FEATURES_AVAILABLE = True
    print("✅ Enhanced features loaded successfully")
except ImportError as e:
    ENHANCED_FEATURES_AVAILABLE = False
    print(f"⚠️ Some enhanced features not available: {e}")
    print("Basic functionality will still work")

class EnhancedSurveyBotRunner:
    """Enhanced survey bot runner with advanced features integration"""
    
    def __init__(self):
        self.enhanced_personality = None
        self.typing_simulator = None
        self.captcha_solver = None
        self.bot_enhancer = None
        self.enhanced_integration = None
        self.session_stats = {
            'start_time': None,
            'surveys_completed': 0,
            'errors_encountered': 0,
            'personality_mode': 'natural_conversation'
        }
        
        # Initialize enhanced features
        self._initialize_enhanced_features()
        
        # Setup logging
        self._setup_logging()
    
    def _initialize_enhanced_features(self):
        """Initialize all enhanced features if available"""
        if not ENHANCED_FEATURES_AVAILABLE:
            return
            
        try:
            # Initialize enhanced personality system
            self.enhanced_personality = EnhancedPersonalitySystem()
            print(f"✅ Enhanced personality system initialized")
            
            # Initialize typing simulator
            self.typing_simulator = TypingSimulator()
            print(f"✅ Typing simulator initialized")
            
            # CAPTCHA handling disabled
            self.captcha_solver = None
            
            # Initialize enhanced bot integration
            self.enhanced_integration = EnhancedBotIntegration()
            print(f"✅ Enhanced bot integration initialized")
            
            # Initialize bot enhancer
            self.bot_enhancer = SurveyBotEnhancer()
            print(f"✅ Bot enhancer initialized")
            
        except Exception as e:
            print(f"⚠️ Error initializing enhanced features: {e}")
            traceback.print_exc()
    
    def _setup_logging(self):
        """Setup enhanced logging system"""
        log_dir = Path("logs")
        log_dir.mkdir(exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_dir / f"survey_bot_{time.strftime('%Y%m%d_%H%M%S')}.log"),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    async def run_enhanced_bot(self, args):
        """Run the bot with enhanced features"""
        self.session_stats['start_time'] = time.time()
        # Surface typing prefs for downstream bots
        self.session_stats['typing_simulation'] = getattr(args, 'typing_simulation', False)
        self.session_stats['typing_style'] = getattr(args, 'typing_style', 'careful_typer')
        
        print(f"\n🚀 Starting Enhanced Survey Bot")
        print(f"Implementation: {args.implementation}")
        print(f"Platform: {args.platform}")
        print(f"Personality Mode: {self.session_stats['personality_mode']}")
        print(f"Enhanced Features: {'✅ Enabled' if ENHANCED_FEATURES_AVAILABLE else '❌ Disabled'}")
        print("-" * 50)
        
        try:
            # Check platform first, then implementation
            if args.platform == "cpx":
                # CPX Research platform - use CPX-specific bot
                await self._run_cpx_bot(args)
            elif args.implementation == "playwright":
                await self._run_playwright_bot(args)
            elif args.implementation == "selenium":
                await self._run_selenium_bot(args)
            elif args.implementation == "undetected":
                await self._run_undetected_bot(args)
            elif args.implementation == "v2ray":
                await self._run_v2ray_bot(args)
            elif args.implementation == "proxychains":
                await self._run_proxychains_bot(args)
            elif args.implementation == "hybrid":
                await self._run_hybrid_bot(args)
            else:
                print(f"❌ Unknown implementation: {args.implementation}")
                return
                
        except Exception as e:
            self.session_stats['errors_encountered'] += 1
            self.logger.error(f"Bot execution failed: {e}")
            traceback.print_exc()
        finally:
            self._print_session_summary()
    
    async def _run_playwright_bot(self, args):
        """Run Playwright bot with enhancements"""
        from Project_Structure.bot_implementations.survey_bot_playwright import main as playwright_main
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enable_enhancement()
        
        await playwright_main()
    
    async def _run_selenium_bot(self, args):
        """Run Selenium bot with enhancements"""
        from Project_Structure.bot_implementations.survey_bot_selenium import main as selenium_main
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enable_enhancement()
        
        # Run in thread since selenium_main is synchronous
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor() as executor:
            await asyncio.get_event_loop().run_in_executor(executor, selenium_main)
    
    async def _run_undetected_bot(self, args):
        """Run Undetected bot with enhancements"""
        from Project_Structure.bot_implementations.survey_bot_undetected import main as undetected_main
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enable_enhancement()
        
        # Run in thread since undetected_main is synchronous
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor() as executor:
            await asyncio.get_event_loop().run_in_executor(executor, undetected_main)
    
    async def _run_v2ray_bot(self, args):
        """Run V2Ray bot with enhancements"""
        from Project_Structure.bot_implementations.survey_bot_v2ray import V2RayEnhancedSurveyBot
        
        bot = V2RayEnhancedSurveyBot()
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enhance_response_generation(bot.run)
        
        bot.run()
    
    async def _run_proxychains_bot(self, args):
        """Run Proxychains bot with enhancements"""
        from Project_Structure.bot_implementations.survey_bot_proxychains import ProxychainsSurveyBot
        
        bot = ProxychainsSurveyBot()
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enhance_response_generation(bot.run)
        
        bot.run()
    
    async def _run_hybrid_bot(self, args):
        """Run Hybrid bot with enhancements"""
        from Project_Structure.bot_implementations.survey_bot_hybrid import main as hybrid_main
        
        # Enhance the bot if possible
        if self.bot_enhancer:
            self.bot_enhancer.enable_enhancement()
        
        await hybrid_main()
    
    # CAPTCHA handling disabled - all CAPTCHA methods removed
    

    
    # All remaining CAPTCHA methods removed
    
    async def _run_cpx_bot(self, args):
        """Run CPX Research bot"""
        try:
            # Check if CPX bot is available
            try:
                from Project_Structure.bot_implementations.survey_bot_cpx import CPXResearchBot
            except ImportError as e:
                print(f"❌ CPX bot implementations not available: {e}")
                return
            
            print("🚀 Starting CPX Research bot...")
            
            # Create CPX bot instance
            cpx_bot = CPXResearchBot(
                app_id=Config.CPX_APP_ID,
                ext_user_id=Config.CPX_EXT_USER_ID
            )
            # Propagate typing preferences
            if hasattr(self, 'session_stats'):
                if hasattr(cpx_bot, '__dict__'):
                    cpx_bot.typing_style = self.session_stats.get('typing_style', 'careful_typer')
            
            # Initialize browser
            if not await cpx_bot.initialize_browser():
                print("❌ Failed to initialize CPX bot browser")
                return
            
            # Load persona if available
            if hasattr(cpx_bot, "load_persona") and callable(getattr(cpx_bot, "load_persona")):
                cpx_bot.load_persona()
            
            print("🚀 Starting CPX Research session...")
            
            # Run the CPX bot - it will handle PureSpectrum surveys in the same browser
            cpx_result = await cpx_bot.run_survey_session(max_surveys=getattr(args, "max_surveys", 5))
            
            # Print session summary and cleanup
            cpx_bot.print_session_summary()
            await cpx_bot.cleanup()
            
        except Exception as e:
            print(f"❌ Error running CPX bot: {e}")
            import traceback
            traceback.print_exc()
    
    def _print_session_summary(self):
        """Print session statistics and summary"""
        if self.session_stats['start_time']:
            duration = time.time() - self.session_stats['start_time']
            print("\n" + "=" * 50)
            print("📊 SESSION SUMMARY")
            print("=" * 50)
            print(f"Duration: {duration:.2f} seconds")
            print(f"Surveys Completed: {self.session_stats['surveys_completed']}")
    
            print(f"Errors Encountered: {self.session_stats['errors_encountered']}")
            print(f"Personality Mode: {self.session_stats['personality_mode']}")
            print("=" * 50)
    
    async def demo_enhanced_features(self):
        """Demonstrate enhanced features"""
        if not ENHANCED_FEATURES_AVAILABLE:
            print("❌ Enhanced features not available")
            return
        
        print("\n🎭 Enhanced Features Demo")
        print("-" * 30)
        
        # Demo personality system
        if self.enhanced_personality:
            print("\n🧠 Personality System Demo:")
            question = "What do you think about online surveys?"
            response = await self.enhanced_personality.generate_enhanced_response(
                question, 
                context="User is asking about survey opinions",
                mode="natural_conversation"
            )
            print(f"Q: {question}")
            print(f"A: {response[:200]}...")
        
        # Demo typing simulation
        if self.typing_simulator:
            print("\n⌨️ Typing Simulation Demo:")
            config = self.typing_simulator.get_typing_config()
            print(f"Base typing interval: {config['base_typing_interval']}s")
            print(f"Variance range: {config['variance_range']}s")
            print(f"Pause probability: {config['pause_probability']}")
        
        # CAPTCHA handling disabled
        
        print("\n✅ Enhanced features demo completed!")

class WebInterface:
    """Web interface for controlling the survey bot"""
    
    def __init__(self, bot_runner):
        self.bot_runner = bot_runner
        self.app = Flask(__name__)
        self.socketio = SocketIO(self.app, cors_allowed_origins="*")
        self.bot_thread = None
        self.bot_running = False
        self.current_config = {}
        self._setup_routes()
        self._setup_socket_events()
    
    def _setup_routes(self):
        @self.app.route('/')
        def index():
            return render_template_string(WEB_INTERFACE_HTML)
        
        @self.app.route('/api/start', methods=['POST'])
        def start_bot():
            try:
                data = request.get_json()
                if not data:
                    return jsonify({'error': 'No data provided'}), 400
                
                # Start bot in background thread
                self.bot_thread = threading.Thread(
                    target=self._run_bot_in_thread,
                    args=(data,),
                    daemon=True
                )
                self.bot_thread.start()
                
                return jsonify({'status': 'Bot started'})
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/stop', methods=['POST'])
        def stop_bot():
            try:
                self.bot_running = False
                if self.bot_thread and self.bot_thread.is_alive():
                    # Signal the bot to stop
                    if hasattr(self.bot_runner, 'stop_bot'):
                        self.bot_runner.stop_bot()
                return jsonify({'status': 'Bot stopped'})
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/status')
        def get_status():
            return jsonify({
                'status': 'Running' if self.bot_running else 'Stopped',
                'implementation': self.current_config.get('implementation', '-'),
                'platform': self.current_config.get('platform', '-'),
                'personality': self.current_config.get('personality', '-')
            })
    
    def _setup_socket_events(self):
        @self.socketio.on('connect')
        def handle_connect():
            print(f"🔌 Client connected: {request.sid}")
            self._emit_status_update()
        
        @self.socketio.on('disconnect')
        def handle_disconnect():
            print(f"🔌 Client disconnected: {request.sid}")
        
        @self.socketio.on('request_status')
        def handle_status_request():
            self._emit_status_update()
    
    def _run_bot_in_thread(self, config):
        """Run the bot in a background thread"""
        try:
            self.bot_running = True
            self.current_config = config
            self._emit_status_update()
            self._emit_log("🚀 Starting bot...")
            
            # Create a mock args object for the bot runner
            class MockArgs:
                def __init__(self, config):
                    for key, value in config.items():
                        setattr(self, key, value)
            
            args = MockArgs(config)
            
            # Run the bot
            asyncio.run(self.bot_runner.run_enhanced_bot(args))
            
        except Exception as e:
            self._emit_log(f"❌ Error running bot: {e}")
            print(f"❌ Bot thread error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            self.bot_running = False
            self._emit_status_update()
            self._emit_log("🛑 Bot stopped")
    
    def _emit_status_update(self):
        """Emit status update to connected clients"""
        try:
            status = {
                'status': 'Running' if self.bot_running else 'Stopped',
                'implementation': self.current_config.get('implementation', '-'),
                'platform': self.current_config.get('platform', '-'),
                'personality': self.current_config.get('personality', '-'),
                'enhanced_features': ENHANCED_FEATURES_AVAILABLE
            }
            print(f"🔔 Emitting status update: {status}")
            self.socketio.emit('bot_status', status)
        except Exception as e:
            print(f"❌ Error emitting status update: {e}")
    
    def _emit_log(self, message):
        """Emit log message to connected clients"""
        try:
            timestamp = time.strftime("%H:%M:%S")
            log_entry = f"[{timestamp}] {message}"
            print(f"📝 {log_entry}")
            self.socketio.emit('bot_log', {'message': log_entry})
        except Exception as e:
            print(f"❌ Error emitting log: {e}")
    
    def _emit_stats_update(self, stats):
        """Emit statistics update to connected clients"""
        try:
            self.socketio.emit('bot_stats', stats)
        except Exception as e:
            print(f"❌ Error emitting stats: {e}")
    
    def _force_status_sync(self):
        """Force status synchronization with frontend"""
        try:
            self._emit_status_update()
        except Exception as e:
            print(f"❌ Error in force status sync: {e}")
    
    def run(self, host='0.0.0.0', port=5000, debug=False):
        """Start the web interface"""
        print(f"🌐 Starting web interface on http://{host}:{port}")
        
        # Start a background thread to periodically sync status
        def status_sync_loop():
            while True:
                try:
                    time.sleep(5)  # Sync every 5 seconds
                    self._force_status_sync()
                except Exception as e:
                    print(f"❌ Status sync loop error: {e}")
                    break
        
        sync_thread = threading.Thread(target=status_sync_loop, daemon=True)
        sync_thread.start()
        
        self.socketio.run(self.app, host=host, port=port, debug=debug, allow_unsafe_werkzeug=True)

def main():
    """Main entry point for the enhanced survey bot"""
    parser = argparse.ArgumentParser(description="Enhanced Survey Automation Bot")
    parser.add_argument(
        "--implementation", 
        "-i",
        choices=["playwright", "selenium", "undetected", "v2ray", "proxychains", "hybrid"],
        default=Config.BROWSER_TYPE,
        help="Choose bot implementation"
    )
    parser.add_argument(
        "--platform",
        "-p", 
        choices=["qmee", "earnhaus", "prolific", "mturk", "cpx"],
        default=Config.SURVEY_PLATFORM,
        help="Choose survey platform"
    )
    parser.add_argument(
        "--headless",
        action="store_true",
        help="Run in headless mode"
    )
    parser.add_argument(
        "--proxy",
        action="store_true", 
        help="Enable proxy rotation"
    )
    parser.add_argument(
        "--test-proxies",
        action="store_true",
        help="Test and save working proxies"
    )
    parser.add_argument(
        "--config",
        action="store_true",
        help="Show current configuration"
    )
    parser.add_argument(
        "--setup",
        action="store_true",
        help="Setup environment and dependencies"
    )
    parser.add_argument(
        "--demo-enhanced",
        action="store_true",
        help="Demo enhanced features"
    )
    parser.add_argument(
        "--personality-mode",
        "-m",
        choices=["natural_conversation", "human_writer", "ai_team_simulation", "discord_casual"],
        default="natural_conversation",
        help="Choose personality mode for enhanced responses"
    )
    parser.add_argument(
        "--typing-simulation",
        action="store_true",
        help="Enable human-like typing simulation"
    )
    parser.add_argument(
        "--typing-style",
        choices=["fast_typer", "average_typer", "slow_typer", "careful_typer"],
        default="careful_typer",
        help="Typing simulation style"
    )
    # CAPTCHA handling disabled
    parser.add_argument(
        "--enhanced-ai",
        action="store_true",
        help="Enable enhanced AI response generation"
    )
    parser.add_argument(
        "--web-interface",
        action="store_true",
        help="Start web interface for bot control"
    )
    
    args = parser.parse_args()
    
    # Update config based on arguments
    Config.BROWSER_TYPE = args.implementation
    Config.SURVEY_PLATFORM = args.platform
    Config.HEADLESS = args.headless
    
    if args.config:
        Config.print_config()
        return
    
    if args.setup:
        setup_environment()
        return
    
    if args.test_proxies:
        test_proxies()
        return
    
    if args.demo_enhanced:
        runner = EnhancedSurveyBotRunner()
        asyncio.run(runner.demo_enhanced_features())
        return
    
    # Validate configuration
    if not Config.validate_config():
        print("Configuration errors found. Please fix them before running.")
        return
    
    # Create and run enhanced bot runner
    runner = EnhancedSurveyBotRunner()
    # Pass typing-simulation preference into runner session state
    if hasattr(runner, 'session_stats'):
        runner.session_stats['typing_simulation'] = getattr(args, 'typing_simulation', False)
        runner.session_stats['typing_style'] = getattr(args, 'typing_style', 'careful_typer')
    
    # Check if web interface is requested
    if args.web_interface:
        if not FLASK_AVAILABLE:
            print("❌ Web interface requested but Flask is not available")
            print("Please install Flask dependencies: pip install flask flask-socketio")
            return
        
        print("🌐 Starting web interface...")
        web_interface = WebInterface(runner)
        web_interface.run(host='0.0.0.0', port=5000, debug=False)
        return
    
    # Run bot normally - CAPTCHA handling disabled
    print("🔧 Standard mode - using regular bot implementations")
    
    asyncio.run(runner.run_enhanced_bot(args))

def setup_environment():
    """Setup the environment and dependencies"""
    print("Setting up enhanced environment...")
    
    # Create sample .env file
    create_sample_env()
    
    # Install dependencies
    print("Installing dependencies...")
    os.system("pip install -r ../Configurations/requirements.txt")
    
    # Install enhanced personality dependencies
    if os.path.exists("../Project_Structure/requirements_enhanced_personality.txt"):
        print("Installing enhanced personality dependencies...")
        os.system("pip install -r ../Project_Structure/requirements_enhanced_personality.txt")
    
    # Install browser drivers
    if Config.BROWSER_TYPE == "playwright":
        print("Installing Playwright browsers...")
        os.system("playwright install")
    elif Config.BROWSER_TYPE == "selenium":
        print("Note: For Selenium, you may need to install ChromeDriver manually")
        print("Download from: https://chromedriver.chromium.org/")
    
    # Install additional dependencies for enhanced features
    print("Installing enhanced features dependencies...")
    enhanced_deps = [
        # CAPTCHA dependencies removed
        # CAPTCHA dependencies removed
        "google-generativeai"
    ]
    
    for dep in enhanced_deps:
        try:
            os.system(f"pip install {dep}")
        except:
            print(f"⚠️ Could not install {dep}")
    
    print("Enhanced setup complete!")
    print("Please update your .env file with your API keys and settings.")

def test_proxies():
    """Test and save working proxies"""
    print("Testing proxies...")
    
    try:
        from Project_Structure.proxy_management.proxy_manager_v2ray import V2RayProxyManager
        
        manager = V2RayProxyManager(v2ray_path="./v2ray/v2ray")
        
        # Try to load from different config files
        config_files = [
            "configs/shadow_proxy_configs.json",
            "configs/v2ray_proxies.json",
            "configs/sample_v2ray_proxies.json"
        ]
        
        config_loaded = False
        for config_file in config_files:
            if os.path.exists(config_file):
                print(f"Loading proxies from {config_file}...")
                if manager.load_configs_from_file(config_file):
                    config_loaded = True
                    print(f"✓ Loaded {len(manager.proxy_configs)} proxy configurations")
                    break
        
        if not config_loaded:
            print("No proxy configuration files found. Creating sample configurations...")
            from Project_Structure.proxy_management.proxy_manager_v2ray import create_sample_proxies
            create_sample_proxies()
            manager.load_configs_from_file("sample_v2ray_proxies.json")
        
        if manager.proxy_configs:
            print(f"\nTesting {len(manager.proxy_configs)} proxy configurations...")
            
            working_configs = []
            for i, config in enumerate(manager.proxy_configs):
                print(f"\nTesting proxy {i+1}/{len(manager.proxy_configs)}: {config.name}")
                print(f"  Protocol: {config.protocol}")
                print(f"  Address: {config.address}:{config.port}")
                print(f"  Security: {config.security}")
                print(f"  Network: {config.network}")
                
                success, response_time = manager.test_proxy(config, timeout=15)
                
                if success:
                    print(f"  ✓ Working - Response time: {response_time:.2f}s")
                    working_configs.append(config)
                else:
                    print(f"  ✗ Failed")
            
            print(f"\nSummary: {len(working_configs)}/{len(manager.proxy_configs)} proxies are working")
            
            # Save working configurations
            if working_configs:
                manager.proxy_configs = working_configs
                manager.save_configs_to_file("configs/working_proxies.json")
                print(f"\nSaved {len(working_configs)} working proxy configurations to configs/working_proxies.json")
            else:
                print("\nNo working proxies found. You may need to check your V2Ray installation or network connectivity.")
        else:
            print("No proxies available for testing")
            
    except ImportError as e:
        print(f"Proxy manager not available: {e}")
        print("Make sure the proxy_management module is properly installed.")
    except Exception as e:
        print(f"Error testing proxies: {e}")
        import traceback
        traceback.print_exc()

def check_dependencies():
    """Check if all required dependencies are available"""
    missing_deps = []
    
    # Check if we're in a virtual environment
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️  Warning: Not running in a virtual environment")
        print("Please activate the virtual environment first:")
        print("  source ../venv/bin/activate")
        print("Then run this script again.")
        return False
    
    # Basic dependencies
    basic_deps = ["playwright", "selenium", "undetected_chromedriver", "dotenv"]
    for dep in basic_deps:
        try:
            __import__(dep.replace("-", "_"))
        except ImportError:
            missing_deps.append(dep)
    
    # Enhanced features dependencies
    if ENHANCED_FEATURES_AVAILABLE:
        enhanced_deps = []  # CAPTCHA dependencies removed
        for dep_name, import_name in enhanced_deps:
            try:
                __import__(import_name)
            except ImportError:
                missing_deps.append(dep_name)
    
    if missing_deps:
        print(f"Missing dependencies: {', '.join(missing_deps)}")
        print("Run with --setup to install dependencies")
        return False
    
    return True

if __name__ == "__main__":
    # Check dependencies first
    if not check_dependencies():
        print("Dependencies missing. Run with --setup to install them.")
        sys.exit(1)
    
    main()
