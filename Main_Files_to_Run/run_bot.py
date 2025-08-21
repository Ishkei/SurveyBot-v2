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
from dotenv import load_dotenv

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure"))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

# Ensure Project_Structure is in the path for imports
project_structure_path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure"))
parent_path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

print(f"Current working directory: {os.getcwd()}")
print(f"Project structure path: {project_structure_path}")
print(f"Parent path: {parent_path}")
print(f"Project structure exists: {os.path.exists(project_structure_path)}")

# Add paths to sys.path
if project_structure_path not in sys.path:
    sys.path.insert(0, project_structure_path)
    print(f"Added Project_Structure to Python path: {project_structure_path}")

if parent_path not in sys.path:
    sys.path.insert(0, parent_path)
    print(f"Added parent directory to Python path: {parent_path}")

print(f"Python path after modification: {sys.path[:3]}...")

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
    <script>
        // WebSocket disabled - using HTTP fallback mode
        console.log('HTTP mode enabled - WebSocket disabled');
    </script>
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
        
        /* Platform-specific configuration styling */
        .platform-config {
            background: #e3f2fd;
            border: 1px solid #2196f3;
            border-radius: 8px;
            padding: 15px;
            margin-top: 15px;
        }
        
        .platform-config label {
            color: #1976d2;
            font-weight: 600;
        }
        
        .platform-config input {
            border-color: #2196f3;
        }
        
        .platform-config input:focus {
            border-color: #1565c0;
            box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
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
                            <option value="enhanced_cursor">Enhanced Cursor Bot (HumanCursor)</option>
                            <option value="qmee_enhanced">Qmee Enhanced Bot (Real Patterns)</option>
                            <option value="qmee_comprehensive">Qmee Comprehensive Bot (AI + Caching)</option>
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
                            <option value="lifepoints">LifePoints Panel</option>
                        </select>
                        <small style="color: #666; font-size: 12px; margin-top: 5px; display: block;">
                            Select LifePoints Panel to automate surveys and earn points
                        </small>
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
                    <div class="form-group">
                        <label for="cursor_simulation">Cursor Simulation:</label>
                        <select id="cursor_simulation">
                            <option value="enabled">Enhanced HumanCursor</option>
                            <option value="fallback">PyAutoGUI Fallback</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="scroll_method">Scroll Method:</label>
                        <select id="scroll_method">
                            <option value="auto">Auto-Detect</option>
                            <option value="mouse_wheel">Mouse Wheel</option>
                            <option value="smooth">Smooth Scrolling</option>
                            <option value="scrollbar">Scrollbar Detection</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="qmee_url">Qmee Survey URL (for enhanced bot):</label>
                        <input type="text" id="qmee_url" placeholder="https://user-profiler.prod.qurated.ai/prescreener?token=..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    
                    <!-- LifePoints Configuration -->
                    <div class="form-group platform-config" id="lifepointsConfig" style="display: none;">
                        <label for="lifepoints_email">LifePoints Email:</label>
                        <input type="email" id="lifepoints_email" placeholder="your_email@example.com" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                    <div class="form-group platform-config" id="lifepointsConfig2" style="display: none;">
                        <label for="lifepoints_password">LifePoints Password:</label>
                        <input type="password" id="lifepoints_password" placeholder="your_password" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
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
                    <div class="form-group">
                        <label for="cursor_simulation">Cursor Simulation:</label>
                        <select id="cursor_simulation">
                            <option value="enabled">Enhanced HumanCursor</option>
                            <option value="fallback">PyAutoGUI Fallback</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="scroll_method">Scroll Method:</label>
                        <select id="scroll_method">
                            <option value="auto">Auto-Detect</option>
                            <option value="mouse_wheel">Mouse Wheel</option>
                            <option value="smooth">Smooth Scrolling</option>
                            <option value="scrollbar">Scrollbar Detection</option>
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
                    </div>
                    <div class="status-item">
                        <h4>Enhanced Cursor</h4>
                        <div class="value" id="enhancedCursorValue">-</div>
                    </div>
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
            console.log('WebSocket connection disabled for now - using HTTP fallback');
            isConnected = true; // Simulate connection for HTTP fallback
            updateConnectionStatus('connected', 'HTTP Mode');
            addLog('✅ Using HTTP mode (WebSocket disabled)');
            // Don't request status immediately - let user actions trigger it
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
            const enhancedCursorValue = document.getElementById('enhancedCursorValue');
            
            if (data && data.status) {
                statusValue.textContent = data.status;
                statusValue.className = 'value status-' + data.status.toLowerCase();
                botRunning = data.status === 'Running';
            }
            
            if (data && data.implementation) {
                implementationValue.textContent = data.implementation;
            }
            
            if (data && data.platform) {
                platformValue.textContent = data.platform;
            }
            
            if (data && data.personality) {
                personalityValue.textContent = data.personality;
            }

            if (data && typeof data.enhanced_cursor !== 'undefined') {
                enhancedCursorValue.textContent = data.enhanced_cursor ? 'Yes' : 'No';
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
            console.log('Start button clicked. Connection status:', isConnected);
            console.log('Socket object:', socket);
            
            if (!isConnected) {
                addLog('❌ Not connected to server');
                console.error('Cannot start bot: not connected to server');
                return;
            }
            
            // Validate platform-specific requirements
            const platform = document.getElementById('platform').value;
            if (platform === 'lifepoints') {
                const email = document.getElementById('lifepoints_email').value.trim();
                const password = document.getElementById('lifepoints_password').value.trim();
                
                if (!email || !password) {
                    addLog('❌ LifePoints requires both email and password');
                    return;
                }
                
                if (!email.includes('@')) {
                    addLog('❌ Please enter a valid email address for LifePoints');
                    return;
                }
            }
            
            const config = {
                implementation: document.getElementById('implementation').value,
                platform: document.getElementById('platform').value,
                personality: document.getElementById('personality').value,
                max_surveys: parseInt(document.getElementById('maxSurveys').value),
                headless: document.getElementById('headless').value === 'true',
                proxy: document.getElementById('proxy').value,
                // CAPTCHA handling disabled
                typing: document.getElementById('typing').value,
                cursor_simulation: document.getElementById('cursor_simulation').value,
                scroll_method: document.getElementById('scroll_method').value,
                qmee_url: document.getElementById('qmee_url').value,
                lifepoints_email: document.getElementById('lifepoints_email').value,
                lifepoints_password: document.getElementById('lifepoints_password').value
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
            // HTTP fallback: poll REST endpoint for status
            fetch('/api/status')
                .then(resp => resp.json())
                .then(data => updateStatus(data))
                .catch(err => addLog('❌ Status error: ' + err));
        }

        // Platform change handler
        function handlePlatformChange() {
            const platform = document.getElementById('platform').value;
            const lifepointsConfig = document.getElementById('lifepointsConfig');
            const lifepointsConfig2 = document.getElementById('lifepointsConfig2');
            const qmeeUrlConfig = document.getElementById('qmee_url').parentElement;
            
            // Hide all platform-specific configs first
            lifepointsConfig.style.display = 'none';
            lifepointsConfig2.style.display = 'none';
            qmeeUrlConfig.style.display = 'none';
            
            // Show relevant config based on platform
            if (platform === 'lifepoints') {
                lifepointsConfig.style.display = 'block';
                lifepointsConfig2.style.display = 'block';
                addLog('🎯 LifePoints Panel selected - Enter your credentials below');
            } else if (platform === 'qmee') {
                qmeeUrlConfig.style.display = 'block';
                addLog('🎯 Qmee selected - Enter survey URL if needed');
            } else {
                addLog('🎯 Platform changed to: ' + platform);
            }
        }
        
        // Initialize connection
        document.addEventListener('DOMContentLoaded', function() {
            connectWebSocket();
            
            // Add platform change listener
            document.getElementById('platform').addEventListener('change', handlePlatformChange);
            
            // Initialize platform-specific configs
            handlePlatformChange();
            
            // Request status every 10 seconds as backup
            setInterval(requestStatus, 10000);
        });
    </script>
</body>
</html>
"""

# Enhanced features imports
try:
    # Load environment variables first
    from dotenv import load_dotenv
    from pathlib import Path
    
    # Load .env file
    env_file = Path("../.env")
    if env_file.exists():
        load_dotenv(env_file)
        print("✅ Environment variables loaded from .env")
    
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

# Enhanced cursor simulation imports
try:
    # Load environment variables if not already loaded
    if 'GEMINI_API_KEY' not in os.environ:
        from dotenv import load_dotenv
        from pathlib import Path
        env_file = Path("../.env")
        if env_file.exists():
            load_dotenv(env_file)
            print("✅ Environment variables loaded for enhanced cursor")
    
    from Project_Structure.enhanced_cursor_simulation import EnhancedCursorSimulator
    from Project_Structure.bot_implementations.advanced_survey_bot import AdvancedSurveyBot
    ENHANCED_CURSOR_AVAILABLE = True
    print("✅ Enhanced cursor simulation loaded successfully")
except ImportError as e:
    ENHANCED_CURSOR_AVAILABLE = False
    print(f"⚠️ Enhanced cursor simulation not available: {e}")
    print("Basic cursor functionality will still work")

# Qmee enhanced bot imports
try:
    from Project_Structure.bot_implementations.qmee_bot_enhancements import QmeeIntegratedBot, run_qmee_enhanced_bot
    QMEE_ENHANCED_AVAILABLE = True
    print("✅ Qmee enhanced bot loaded successfully")
except ImportError as e:
    QMEE_ENHANCED_AVAILABLE = False
    print(f"⚠️ Qmee enhanced bot not available: {e}")
    print("Standard qmee functionality will still work")

# Platform-specific bot imports - only load when needed
QMEE_COMPREHENSIVE_AVAILABLE = False
LIFEPOINTS_AVAILABLE = False

def load_platform_bots(platform):
    """Load platform-specific bots only when needed"""
    global QMEE_COMPREHENSIVE_AVAILABLE, LIFEPOINTS_AVAILABLE, QmeeEnhancedSurveyBot, LifePointsEnhancedBot
    
    # Initialize bot classes as None
    QmeeEnhancedSurveyBot = None
    LifePointsEnhancedBot = None
    
    if platform == "qmee":
        try:
            from Project_Structure.bot_implementations.qmee_enhanced_survey_bot import QmeeEnhancedSurveyBot
            QMEE_COMPREHENSIVE_AVAILABLE = True
            print("✅ Qmee Enhanced Survey Bot (Comprehensive) available")
        except ImportError as e:
            QMEE_COMPREHENSIVE_AVAILABLE = False
            print(f"⚠️ Qmee Enhanced Survey Bot (Comprehensive) not available: {e}")
    
    elif platform == "lifepoints":
        try:
            from Project_Structure.bot_implementations.lifepoints_enhanced_bot import LifePointsEnhancedBot
            LIFEPOINTS_AVAILABLE = True
            print("✅ LifePoints Enhanced Survey Bot available")
        except ImportError as e:
            LIFEPOINTS_AVAILABLE = False
            print(f"⚠️ LifePoints Enhanced Survey Bot not available: {e}")
    
    # Load all bots for enhanced router (needs all platforms)
    elif platform == "enhanced_router":
        try:
            from Project_Structure.bot_implementations.qmee_enhanced_survey_bot import QmeeEnhancedSurveyBot
            QMEE_COMPREHENSIVE_AVAILABLE = True
            print("✅ Qmee Enhanced Survey Bot (Comprehensive) available")
        except ImportError as e:
            QMEE_COMPREHENSIVE_AVAILABLE = False
            print(f"⚠️ Qmee Enhanced Survey Bot (Comprehensive) not available: {e}")
        
        try:
            from Project_Structure.bot_implementations.lifepoints_enhanced_bot import LifePointsEnhancedBot
            LIFEPOINTS_AVAILABLE = True
            print("✅ LifePoints Enhanced Survey Bot available")
        except ImportError as e:
            LIFEPOINTS_AVAILABLE = False
            print(f"⚠️ LifePoints Enhanced Survey Bot not available: {e}")

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
            config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure", "enhanced_ai_config.json")
            self.enhanced_integration = EnhancedBotIntegration(config_path)
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
        
        # Check for authentication state
        auth_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "auth.json")
        if os.path.exists(auth_file_path):
            print(f"🔐 Authentication: ✅ Saved session available ({auth_file_path})")
        else:
            print("🔐 Authentication: ⚠️ No saved session found")
            print("   💡 Run 'python3 setup_auth.py' to save your Qmee login session")
        
        # Show enhanced router info if using it
        if args.implementation == "enhanced_router":
                    print("🔧 Enhanced Router: ✅ Enabled (Improved survey platform detection)")
        print("   - Swagbucks date of birth handling")
        print("   - Multi-platform survey routing")
        print("   - Enhanced error recovery")
        print("   - Saved authentication state support")
        
        print("-" * 50)
        
        try:
            # Check platform first, then implementation
            if args.platform == "cpx":
                # CPX Research platform - use CPX-specific bot
                await self._run_cpx_bot(args)
            elif args.platform == "lifepoints":
                # LifePoints platform - use LifePoints-specific bot
                await self._run_lifepoints_bot(args)
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
            elif args.implementation == "enhanced_cursor":
                await self._run_enhanced_cursor_bot(args)
            elif args.implementation == "enhanced_router":
                await self._run_enhanced_router_bot(args)
            elif args.implementation == "qmee_enhanced":
                await self._run_qmee_enhanced_bot(args)
            elif args.implementation == "qmee_comprehensive":
                await self._run_qmee_comprehensive_bot(args)
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
        """Run Playwright bot with enhanced router integration"""
        try:
            # Check for saved authentication state
            auth_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "auth.json")
            use_auth_state = os.path.exists(auth_file_path)
            
            if use_auth_state:
                print(f"🔐 Found saved authentication state: {auth_file_path}")
                print("   Using saved session - no need to login manually")
            else:
                print("⚠️ No saved authentication state found")
                print("   Run Tools_Scripts/scripts/save_auth.py first to save your login session")
            
            # Try to use enhanced router if available
            try:
                from Project_Structure.bot_implementations.improved_survey_bot import ImprovedSurveyBot
                print("🚀 Using enhanced router with Playwright bot")
                
                # Initialize enhanced bot
                bot = ImprovedSurveyBot(
                    headless=getattr(args, "headless", False),
                    personality_style=getattr(args, "personality_mode", "natural_conversation"),
                    auth_state_path=auth_file_path if use_auth_state else None
                )
                
                # Run survey session
                await bot.run_survey_session()
                
            except ImportError:
                print("⚠️ Enhanced router not available, using standard Playwright bot")
                from Project_Structure.bot_implementations.survey_bot_playwright import main as playwright_main
                
                # Enhance the bot if possible
                if self.bot_enhancer:
                    self.bot_enhancer.enable_enhancement()
                
                await playwright_main()
                
        except Exception as e:
            self.logger.error(f"Playwright bot failed: {e}")
            import traceback
            traceback.print_exc()
    
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
        """Run Hybrid bot with enhanced router integration"""
        try:
            # Check for saved authentication state
            auth_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "auth.json")
            use_auth_state = os.path.exists(auth_file_path)
            
            if use_auth_state:
                print(f"🔐 Found saved authentication state: {auth_file_path}")
                print("   Using saved session - no need to login manually")
            else:
                print("⚠️ No saved authentication state found")
                print("   Run Tools_Scripts/scripts/save_auth.py first to save your login session")
            
            # Try to use enhanced router if available
            try:
                from Project_Structure.bot_implementations.improved_survey_bot import ImprovedSurveyBot
                print("🚀 Using enhanced router with Hybrid bot")
                
                # Initialize enhanced bot
                bot = ImprovedSurveyBot(
                    headless=getattr(args, "headless", False),
                    personality_style=getattr(args, "personality_mode", "natural_conversation"),
                    auth_state_path=auth_file_path if use_auth_state else None
                )
                
                # Run survey session
                await bot.run_survey_session()
                
            except ImportError:
                print("⚠️ Enhanced router not available, using standard Hybrid bot")
                from Project_Structure.bot_implementations.survey_bot_hybrid import main as hybrid_main
                
                # Enhance the bot if possible
                if self.bot_enhancer:
                    self.bot_enhancer.enable_enhancement()
                
                await hybrid_main()
                
        except Exception as e:
            self.logger.error(f"Hybrid bot failed: {e}")
            import traceback
            traceback.print_exc()

    async def _run_enhanced_cursor_bot(self, args):
        """Run Enhanced Cursor bot with HumanCursor simulation"""
        if not ENHANCED_CURSOR_AVAILABLE:
            print("❌ Enhanced cursor simulation not available")
            return
        
        try:
            # Load enhanced cursor configuration
            config = self._get_enhanced_cursor_config(args)
            
            # Initialize enhanced survey bot
            bot = AdvancedSurveyBot(config)
            
            print(f"🚀 Starting Enhanced Cursor Survey Bot")
            print(f"   HumanCursor: ✅ Enabled")
            print("   Scroll Method: " + str(config.get("scrolling_methods", {}).get("PREFERRED_METHOD", "auto")))
            print(f"   Human-like Movement: ✅ Enabled")
            
            # Run the enhanced bot
            await bot.run()
            
        except Exception as e:
            self.logger.error(f"Enhanced cursor bot failed: {e}")
            import traceback
            traceback.print_exc()
    
    async def _run_enhanced_router_bot(self, args):
        """Run Enhanced Router bot with improved survey platform detection"""
        try:
            # Check if enhanced router is available
            try:
                # Use dynamic import to avoid import path issues
                import sys
                import os
                import importlib.util
                
                # Ensure the correct paths are in sys.path
                project_structure_path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Project_Structure"))
                if project_structure_path not in sys.path:
                    sys.path.insert(0, project_structure_path)
                
                # Try dynamic imports
                try:
                    # Load enhanced_survey_router using exec
                    router_file_path = os.path.join(project_structure_path, "bot_implementations", "enhanced_survey_router.py")
                    with open(router_file_path, 'r') as f:
                        router_code = f.read()
                    
                    # Create a namespace for the module
                    router_namespace = {}
                    exec(router_code, router_namespace)
                    EnhancedSurveyRouter = router_namespace['EnhancedSurveyRouter']
                    
                    # Load improved_survey_bot using exec
                    bot_file_path = os.path.join(project_structure_path, "bot_implementations", "improved_survey_bot.py")
                    with open(bot_file_path, 'r') as f:
                        bot_code = f.read()
                    
                    # Create a namespace for the module
                    bot_namespace = {}
                    exec(bot_code, bot_namespace)
                    ImprovedSurveyBot = bot_namespace['ImprovedSurveyBot']
                    
                    print("✅ Enhanced router components loaded using exec")
                    
                except Exception as e:
                    print(f"❌ Exec import failed: {e}")
                    # Fallback to regular import
                    try:
                        from bot_implementations.enhanced_survey_router import EnhancedSurveyRouter
                        from bot_implementations.improved_survey_bot import ImprovedSurveyBot
                        print("✅ Enhanced router components loaded using fallback import")
                    except ImportError as e2:
                        print(f"❌ Fallback import also failed: {e2}")
                        return
                
                ENHANCED_ROUTER_AVAILABLE = True
                print("✅ Enhanced router components imported successfully")
            except ImportError as e:
                print(f"❌ Enhanced router not available: {e}")
                print("Make sure the enhanced_survey_router.py and improved_survey_bot.py files are available")
                print(f"Current Python path: {sys.path[:3]}...")  # Show first 3 paths
                return
            
            # Load enhanced router configuration
            config = self._get_enhanced_router_config(args)
            
            print(f"🚀 Starting Enhanced Router Survey Bot")
            print(f"   Platform Detection: ✅ Enabled")
            print(f"   Swagbucks Handler: ✅ Enabled")
            print(f"   Multi-Platform Support: ✅ Enabled")
            print(f"   Enhanced Error Recovery: ✅ Enabled")
            print(f"   Personality Mode: {config.get('personality_style', 'natural_conversation')}")
            
            # Check for saved authentication state
            auth_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "auth.json")
            use_auth_state = os.path.exists(auth_file_path)
            
            if use_auth_state:
                print(f"🔐 Found saved authentication state: {auth_file_path}")
                print("   Using saved session - no need to login manually")
            else:
                print("⚠️ No saved authentication state found")
                print("   Run Tools_Scripts/scripts/save_auth.py first to save your login session")
            
            # Initialize the enhanced router bot
            bot = ImprovedSurveyBot(
                headless=config.get('headless', False),
                personality_style=config.get('personality_style', 'natural_conversation'),
                auth_state_path=auth_file_path if use_auth_state else None
            )
            
            # Run survey session
            await bot.run_survey_session()
            
            print("✅ Enhanced router bot completed successfully")
            
        except Exception as e:
            self.logger.error(f"Enhanced router bot failed: {e}")
            import traceback
            traceback.print_exc()
    
    def _get_enhanced_cursor_config(self, args):
        """Get enhanced cursor configuration"""
        return {
            "DEBUG_MODE": getattr(args, "headless", False),
            "USE_VISION_MODEL": False,
            "USE_OCR": False,
            "USE_MOUSE_CONTROL": True,
            "SURVEY_URL": getattr(args, "url", "https://example.com"),
            
            # Enhanced cursor configuration
            "cursor_simulation": {
                "ENABLE_CURSOR_TRAIL": True,
                "SHOW_MOVEMENT_PATH": True,
                "HIGHLIGHT_CLICK_TARGETS": True
            },
            
            "mouse_movement": {
                "ENHANCED_BEZIER_CURVES": True,
                "HUMAN_LIKE_RANDOMNESS": 3,
                "MOVEMENT_SPEED": "normal"
            },
            
            "scrolling_methods": {
                "PREFERRED_METHOD": getattr(args, "scroll_method", "auto"),
                "ENABLE_MOUSE_WHEEL": True,
                "ENABLE_SMOOTH_SCROLL": True
            }
        }
    
    def _get_enhanced_router_config(self, args):
        """Get enhanced router configuration"""
        return {
            "headless": getattr(args, "headless", False),
            "personality_style": getattr(args, "personality_mode", "natural_conversation"),
            "max_surveys_per_session": getattr(args, "max_surveys", 5),
            "max_failures_per_page": 25,
            "max_total_attempts": 100,
            "delay_between_actions": [2, 5],
            "enhanced_patterns_path": "../Project_Structure/configs/enhanced_survey_patterns.json",
            "swagbucks_config_path": "../Project_Structure/configs/swagbucks_specific_config.json"
        }
    
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
                ext_user_id=Config.CPX_EXT_USER_ID,
                config_path="../Configurations/configs/cpx_config.json" # Explicitly pass config path
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
    
    async def _run_lifepoints_bot(self, args):
        """Run LifePoints Enhanced bot"""
        if not LIFEPOINTS_AVAILABLE:
            print("❌ LifePoints enhanced bot not available")
            return
        
        try:
            print("🚀 Starting LifePoints Enhanced Survey Bot")
            print(f"   Platform: LifePoints Panel")
            print(f"   Enhanced Features: {'✅ Enabled' if ENHANCED_FEATURES_AVAILABLE else '❌ Disabled'}")
            print(f"   Typing Simulation: {'✅ Enabled' if getattr(args, 'typing_simulation', False) else '❌ Disabled'}")
            print(f"   Typing Style: {getattr(args, 'typing_style', 'careful_typer')}")
            
            # Check for authentication credentials
            email = os.getenv("LIFEPOINTS_EMAIL")
            password = os.getenv("LIFEPOINTS_PASSWORD")
            
            if not email or not password:
                print("❌ LifePoints credentials not found in environment variables")
                print("   Please set LIFEPOINTS_EMAIL and LIFEPOINTS_PASSWORD in your .env file")
                return
            
            # Create LifePoints bot instance
            lifepoints_bot = LifePointsEnhancedBot(
                headless=getattr(args, "headless", False),
                proxy=getattr(args, "proxy", False)
            )
            
            # Propagate typing preferences
            if hasattr(self, 'session_stats'):
                if hasattr(lifepoints_bot, 'typing_simulator'):
                    # Set typing style from session stats
                    typing_style = self.session_stats.get('typing_style', 'careful_typer')
                    if hasattr(lifepoints_bot.typing_simulator, 'set_typing_style'):
                        lifepoints_bot.typing_simulator.set_typing_style(typing_style)
                    print(f"   Typing Style Applied: {typing_style}")
            
            try:
                # Check for saved authentication state
                auth_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "auth.json")
                use_auth_state = os.path.exists(auth_file_path)
                
                if use_auth_state:
                    print(f"🔐 Found saved authentication state: {auth_file_path}")
                    print("   Using saved session - no need to login manually")
                else:
                    print("⚠️ No saved authentication state found")
                    print("   Run 'python3 Tools_Scripts/save_lifepoints_auth.py' to save your login session")
                    print("   Or run 'python3 Tools_Scripts/setup_lifepoints_credentials.py' to set up credentials first")
                
                # Start browser with authentication state if available
                if not await lifepoints_bot.start_browser(auth_file_path if use_auth_state else None):
                    print("❌ Failed to start LifePoints bot browser")
                    return
                
                # Login to LifePoints (will use saved session if available)
                print("🔐 Logging into LifePoints...")
                if not await lifepoints_bot.login(email, password, auth_file_path if use_auth_state else None):
                    print("❌ Failed to login to LifePoints")
                    return
                
                print("✅ Successfully logged into LifePoints")
                
                # Get available surveys
                surveys = await lifepoints_bot.get_available_surveys()
                if not surveys:
                    print("❌ No surveys available")
                    return
                
                print(f"📊 Found {len(surveys)} available surveys")
                
                # Show survey information
                for i, survey in enumerate(surveys[:5]):  # Show first 5 surveys
                    print(f"   {i}: {survey['title']} - {survey['points']} points ({survey['duration']})")
                
                # Take surveys up to max_surveys
                max_surveys = getattr(args, "max_surveys", 5)
                surveys_taken = 0
                
                for i in range(min(len(surveys), max_surveys)):
                    if not surveys[i]['available']:
                        continue
                    
                    print(f"\n🚀 Taking survey {i+1}/{max_surveys}: {surveys[i]['title']}")
                    
                    if await lifepoints_bot.take_survey(i):
                        surveys_taken += 1
                        print(f"✅ Survey {i+1} completed successfully")
                    else:
                        print(f"❌ Survey {i+1} failed")
                    
                    # Small delay between surveys
                    await asyncio.sleep(2)
                
                # Show final statistics
                stats = await lifepoints_bot.get_session_stats()
                print(f"\n📈 Session Summary:")
                print(f"   Surveys Completed: {stats['surveys_completed']}")
                print(f"   Points Earned: {stats['points_earned']}")
                print(f"   Session Duration: {stats['session_duration']}")
                print(f"   Surveys per Hour: {stats['surveys_per_hour']:.2f}")
                
            finally:
                # Cleanup
                await lifepoints_bot.close()
                print("🧹 LifePoints bot cleanup completed")
            
        except Exception as e:
            self.logger.error(f"LifePoints bot failed: {e}")
            import traceback
            traceback.print_exc()
    
    async def _run_qmee_enhanced_bot(self, args):
        """Run Qmee Enhanced bot with real application patterns"""
        if not QMEE_ENHANCED_AVAILABLE:
            print("❌ Qmee enhanced bot not available")
            return
        
        try:
            # Load qmee enhanced configuration
            config = self._get_qmee_enhanced_config(args)
            
            print(f"🚀 Starting Qmee Enhanced Survey Bot")
            print(f"   Real Qmee Patterns: ✅ Enabled")
            print(f"   JWT Token Support: ✅ Enabled")
            print(f"   Panel Detection: ✅ Enabled")
            print(f"   Enhanced Cursor: {'✅ Enabled' if ENHANCED_CURSOR_AVAILABLE else '❌ Disabled'}")
            
            # Get survey URL from web interface or default
            survey_url = getattr(args, 'qmee_url', '') or getattr(args, 'url', 'https://user-profiler.prod.qurated.ai/prescreener')
            
            # Run the enhanced qmee bot
            results = await run_qmee_enhanced_bot(survey_url, config)
            
            if results:
                print(f"✅ Qmee bot completed successfully")
                print(f"   Questions Answered: {results.get('questions_answered', 0)}")
                print(f"   Completion Status: {results.get('completion_status', 'unknown')}")
                print(f"   Duration: {results.get('duration', 0):.2f} seconds")
            else:
                print("❌ Qmee bot failed to complete")
            
        except Exception as e:
            self.logger.error(f"Qmee enhanced bot failed: {e}")
            import traceback
            traceback.print_exc()
    
    async def _run_qmee_comprehensive_bot(self, args):
        """Run Qmee Comprehensive Enhanced bot with AI and caching"""
        if not QMEE_COMPREHENSIVE_AVAILABLE:
            print("❌ Qmee Comprehensive Enhanced bot not available")
            return
        
        try:
            # Load comprehensive configuration
            config = self._get_qmee_comprehensive_config(args)
            
            print(f"🚀 Starting Qmee Comprehensive Enhanced Survey Bot")
            print(f"   AI Response Generation: {'✅ Enabled' if config.get('ai_enabled') else '❌ Disabled'}")
            print(f"   Question Caching: ✅ Enabled")
            print(f"   Real Qmee Selectors: ✅ Enabled")
            print(f"   Human Behavior Sim: ✅ Enabled")
            print(f"   GraphQL API Ready: ✅ Enabled")
            
            # Initialize the comprehensive bot
            bot = QmeeEnhancedSurveyBot(config)
            
            # Run survey session
            max_surveys = getattr(args, 'max_surveys', 5)
            results = await bot.run_survey_session(max_surveys=max_surveys)
            
            if results.get("completed"):
                print(f"✅ Qmee comprehensive bot completed successfully")
                print(f"   Surveys Completed: {results.get('surveys_completed', 0)}")
                print(f"   Questions Answered: {results.get('questions_answered', 0)}")
                print(f"   Duration: {results.get('duration', 0):.2f} seconds")
                print(f"   Cache Hit Rate: {results.get('cache_hit_rate', 0):.1%}")
                
                # Update session stats
                self.session_stats['surveys_completed'] += results.get('surveys_completed', 0)
                self.session_stats['questions_answered'] += results.get('questions_answered', 0)
                self.session_stats['cache_hits'] = results.get('cache_hits', 0)
                self.session_stats['cache_misses'] = results.get('cache_misses', 0)
            else:
                print("❌ Qmee comprehensive bot failed to complete")
                print(f"   Error: {results.get('error', 'Unknown error')}")
                
        except Exception as e:
            self.logger.error(f"Qmee comprehensive bot failed: {e}")
            import traceback
            traceback.print_exc()
    
    def _get_qmee_comprehensive_config(self, args):
        """Get qmee comprehensive enhanced configuration"""
        return {
            "headless": getattr(args, "headless", True),
            "max_surveys": getattr(args, "max_surveys", 5),
            "debug": getattr(args, "debug", False),
            "ai_enabled": True,
            "question_caching": {
                "enabled": True,
                "cache_file": "qmee_question_cache.json",
                "use_ai_generation": True
            },
            "behavioral_patterns": {
                "typing_simulation": {
                    "enabled": True,
                    "base_speed": 0.1,
                    "speed_variation": 0.05
                },
                "mouse_movement": {
                    "enabled": True,
                    "human_like_curves": True
                },
                "reading_simulation": {
                    "enabled": True,
                    "question_read_time": [2.0, 5.0]
                }
            },
            "session_management": {
                "max_surveys_per_session": getattr(args, "max_surveys", 5),
                "max_questions_per_survey": 50,
                "retry_attempts": 3
            }
        }

    def _get_qmee_enhanced_config(self, args):
        """Get qmee enhanced configuration"""
        return {
            "enhanced_cursor": ENHANCED_CURSOR_AVAILABLE,
            "debug_mode": getattr(args, "headless", False),
            "max_questions": getattr(args, "max_surveys", 50),
            "human_behavior": {
                "timing": {
                    "question_read_time": [2.0, 5.0],
                    "answer_decision_time": [1.0, 3.0],
                    "click_delay": [0.1, 0.3],
                    "between_questions": [1.0, 3.0]
                }
            },
            "qmee_config_path": "../Configurations/configs/qmee_enhanced_config.json"
        }
    
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
                    
                    # Set LifePoints credentials as environment variables if provided
                    if config.get('platform') == 'lifepoints':
                        if config.get('lifepoints_email'):
                            os.environ['LIFEPOINTS_EMAIL'] = config['lifepoints_email']
                        if config.get('lifepoints_password'):
                            os.environ['LIFEPOINTS_PASSWORD'] = config['lifepoints_password']
            
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
    """Main entry point for the enhanced survey bot with improved survey routing"""
    parser = argparse.ArgumentParser(description="Enhanced Survey Automation Bot with Advanced Survey Router")
    parser.add_argument(
        "--implementation", 
        "-i",
        choices=["playwright", "selenium", "undetected", "v2ray", "proxychains", "hybrid", "enhanced_cursor", "enhanced_router"],
        default=Config.BROWSER_TYPE,
        help="Choose bot implementation (enhanced_router includes improved survey platform detection and Swagbucks handling)"
    )
    parser.add_argument(
        "--platform",
        "-p", 
        choices=["qmee", "earnhaus", "prolific", "mturk", "cpx", "lifepoints"],
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
    parser.add_argument(
        "--url",
        type=str,
        help="Survey URL to navigate to"
    )
    parser.add_argument(
        "--max-surveys",
        type=int,
        default=5,
        help="Maximum number of surveys to complete"
    )
    parser.add_argument(
        "--scroll-method",
        choices=["auto", "scrollbar", "mouse_wheel", "javascript", "smooth"],
        default="auto",
        help="Preferred scrolling method"
    )
    
    args = parser.parse_args()
    
    # Ensure .env is set up correctly
    setup_environment()
    # Explicitly load .env from the current directory first, then project root
    current_env_path = os.path.join(os.path.dirname(__file__), '.env')
    root_env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    
    # Try current directory first, then project root
    if os.path.exists(current_env_path):
        load_dotenv(dotenv_path=current_env_path)
        print(f"✅ Loaded .env from: {current_env_path}")
    elif os.path.exists(root_env_path):
        load_dotenv(dotenv_path=root_env_path)
        print(f"✅ Loaded .env from: {root_env_path}")
    else:
        print("⚠️ No .env file found in current or parent directory") 
    Config.reload() # Reload Config class attributes from updated environment

    # Re-read CPX specific environment variables after .env is loaded
    Config.CPX_APP_ID = os.getenv("CPX_APP_ID", Config.CPX_APP_ID)
    Config.CPX_EXT_USER_ID = os.getenv("CPX_EXT_USER_ID", Config.CPX_EXT_USER_ID)
    
    # Re-read LifePoints specific environment variables after .env is loaded
    Config.LIFEPOINTS_EMAIL = os.getenv("LIFEPOINTS_EMAIL", Config.LIFEPOINTS_EMAIL)
    Config.LIFEPOINTS_PASSWORD = os.getenv("LIFEPOINTS_PASSWORD", Config.LIFEPOINTS_PASSWORD)
    
    # Also load API keys for enhanced features
    Config.GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", Config.GEMINI_API_KEY)
    Config.OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", Config.OPENAI_API_KEY)
    
    # Debug: Show what was loaded
    print(f"🔍 Environment Variables Loaded:")
    print(f"  LifePoints Email: {'✅' if Config.LIFEPOINTS_EMAIL else '❌'}")
    print(f"  LifePoints Password: {'✅' if Config.LIFEPOINTS_PASSWORD else '❌'}")
    print(f"  Gemini API Key: {'✅' if Config.GEMINI_API_KEY else '❌'}")
    print(f"  OpenAI API Key: {'✅' if Config.OPENAI_API_KEY else '❌'}")

    # Update config based on arguments
    Config.BROWSER_TYPE = args.implementation
    Config.SURVEY_PLATFORM = args.platform
    Config.HEADLESS = args.headless
    
    # Load platform-specific bots only when needed
    load_platform_bots(args.platform)
    
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
        print("⚠️ Note: Some configuration warnings may appear but won't affect web interface")
        web_interface = WebInterface(runner)
        web_interface.run(host='0.0.0.0', port=5000, debug=False)
        return
    
    # Validate configuration only for non-web-interface runs
    if not Config.validate_config():
        print("Configuration errors found. Please fix them before running.")
        return
    
    # Run bot normally - CAPTCHA handling disabled
    if args.implementation == "enhanced_router":
        print("🔧 Enhanced Router mode - using improved survey platform detection")
        print("   This includes better handling of Swagbucks, Ipsos, CMIX, and other survey platforms")
    else:
        print("🔧 Standard mode - using regular bot implementations")
    
    asyncio.run(runner.run_enhanced_bot(args))

def setup_environment():
    """Setup the environment and dependencies"""
    print("Setting up enhanced environment...")
    
    # Create sample .env file
    create_sample_env()
    
    # Skip dependency installation for now to avoid conflicts
    print("Skipping dependency installation (already installed)...")
    
    # Install browser drivers only if needed
    browser_type = Config.BROWSER_TYPE
    if browser_type in ["playwright", "enhanced_router"]:
        print("Checking Playwright browsers...")
        # Only install if not already present
        if not os.path.exists(os.path.expanduser("~/.cache/ms-playwright")):
            print("Installing Playwright browsers...")
            os.system("playwright install")
        else:
            print("Playwright browsers already installed")
    elif browser_type == "selenium":
        print("Note: For Selenium, you may need to install ChromeDriver manually")
        print("Download from: https://chromedriver.chromium.org/")
    elif browser_type == "enhanced_router":
        print("Enhanced Router mode - will use Playwright for browser automation")
    else:
        print(f"Browser type '{browser_type}' - no specific driver installation needed")
    
    print("Environment setup complete!")
    print("Dependencies are already installed in virtual environment.")

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
