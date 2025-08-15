#!/usr/bin/env python3
# This script should be run with the virtual environment activated
# Run: source ../venv/bin/activate && python3 run_bot_dual_ai.py
"""
Enhanced Main Runner Script for Survey Automation Bot with Universal Dual AI Integration.
Supports multiple implementations with advanced AI personality, typing simulation, captcha solving,
and intelligent dual AI system (Gemini + OpenAI) for all survey platforms.
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

# Dual AI integration
try:
    from Project_Structure.universal_dual_ai_integration import create_platform_integration
    DUAL_AI_AVAILABLE = True
    print("✅ Universal Dual AI system available")
except ImportError as e:
    DUAL_AI_AVAILABLE = False
    print(f"⚠️ Dual AI not available: {e}")

from Project_Structure.config import Config, create_sample_env

# Web interface HTML template
WEB_INTERFACE_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Survey Bot Control Panel - Dual AI Enhanced</title>
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
        .dual-ai-badge {
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            margin-top: 10px;
            display: inline-block;
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
        .dual-ai-section {
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            color: white;
            grid-column: 1 / -1;
        }
        .dual-ai-section h3 {
            color: white;
        }
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .status-online { background-color: #28a745; }
        .status-offline { background-color: #dc3545; }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1em;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .btn-secondary {
            background: #6c757d;
        }
        .btn-success {
            background: #28a745;
        }
        .btn-warning {
            background: #ffc107;
            color: #212529;
        }
        .btn-danger {
            background: #dc3545;
        }
        .log-container {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            max-height: 400px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .log-entry {
            margin-bottom: 8px;
            padding: 4px 0;
        }
        .log-info { color: #17a2b8; }
        .log-success { color: #28a745; }
        .log-warning { color: #ffc107; }
        .log-error { color: #dc3545; }
        .dual-ai-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-value {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .stat-label {
            font-size: 0.9em;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Survey Bot Control Panel</h1>
            <p>Advanced automation with Universal Dual AI Integration</p>
            <div class="dual-ai-badge">🤖 Gemini + OpenAI Dual AI System</div>
        </div>
        
        <div class="content">
            <div class="dual-ai-section">
                <h3>🤖 Dual AI System Status</h3>
                <div class="dual-ai-stats">
                    <div class="stat-card">
                        <div class="stat-value" id="gemini-status">🟢</div>
                        <div class="stat-label">Gemini AI</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="openai-status">🟢</div>
                        <div class="stat-label">OpenAI</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="cache-efficiency">100%</div>
                        <div class="stat-label">Cache Efficiency</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="total-requests">0</div>
                        <div class="stat-label">Total Requests</div>
                    </div>
                </div>
            </div>
            
            <div class="control-panel">
                <div class="control-section">
                    <h3>🎯 Bot Control</h3>
                    <button class="btn" onclick="startBot()">🚀 Start Bot</button>
                    <button class="btn btn-secondary" onclick="stopBot()">⏹️ Stop Bot</button>
                    <button class="btn btn-success" onclick="testDualAI()">🧪 Test Dual AI</button>
                    <button class="btn btn-warning" onclick="getStats()">📊 Get Stats</button>
                </div>
                
                <div class="control-section">
                    <h3>⚙️ Configuration</h3>
                    <button class="btn" onclick="loadConfig()">📁 Load Config</button>
                    <button class="btn" onclick="saveConfig()">💾 Save Config</button>
                    <button class="btn" onclick="resetConfig()">🔄 Reset Config</button>
                </div>
            </div>
            
            <div class="control-section">
                <h3>📝 Activity Log</h3>
                <div class="log-container" id="log-container">
                    <div class="log-entry log-info">🚀 Dual AI Enhanced Survey Bot Ready</div>
                    <div class="log-entry log-success">✅ Gemini AI: Online</div>
                    <div class="log-entry log-success">✅ OpenAI: Online</div>
                    <div class="log-entry log-info">🌐 Universal compatibility enabled</div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        const socket = io();
        
        socket.on('log_update', function(data) {
            const logContainer = document.getElementById('log-container');
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry log-${data.level}`;
            logEntry.textContent = data.message;
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        });
        
        socket.on('dual_ai_stats', function(data) {
            document.getElementById('gemini-status').textContent = data.gemini_available ? '🟢' : '🔴';
            document.getElementById('openai-status').textContent = data.openai_available ? '🟢' : '🔴';
            document.getElementById('cache-efficiency').textContent = data.cache_efficiency || '100%';
            document.getElementById('total-requests').textContent = data.total_requests || '0';
        });
        
        function startBot() {
            socket.emit('start_bot');
        }
        
        function stopBot() {
            socket.emit('stop_bot');
        }
        
        function testDualAI() {
            socket.emit('test_dual_ai');
        }
        
        function getStats() {
            socket.emit('get_stats');
        }
        
        function loadConfig() {
            socket.emit('load_config');
        }
        
        function saveConfig() {
            socket.emit('save_config');
        }
        
        function resetConfig() {
            socket.emit('reset_config');
        }
    </script>
</body>
</html>
"""


class DualAIEnhancedSurveyBot:
    """
    Enhanced Survey Bot with Universal Dual AI Integration
    
    Features:
    - Gemini + OpenAI dual AI system
    - Universal platform compatibility
    - Intelligent question answering
    - Enhanced question logging
    - Platform-specific optimization
    """
    
    def __init__(self):
        self.config = Config()
        self.dual_ai = None
        self.current_platform = "Universal"
        self.question_cache = {}
        self.stats = {
            'total_requests': 0,
            'gemini_usage': 0,
            'openai_usage': 0,
            'fallback_usage': 0,
            'cache_hits': 0,
            'cache_misses': 0
        }
        
        # Initialize dual AI system
        self._initialize_dual_ai()
        
        print("🚀 Dual AI Enhanced Survey Bot initialized")
    
    def _initialize_dual_ai(self):
        """Initialize the dual AI system"""
        try:
            if DUAL_AI_AVAILABLE:
                self.dual_ai = create_platform_integration("Universal")
                print("✅ Dual AI system initialized successfully")
                
                # Test the system
                test_result = self.dual_ai.test_system()
                if test_result["status"] == "Success":
                    print("✅ Dual AI system verified and ready")
                else:
                    print("⚠️ Dual AI system issues detected")
            else:
                print("⚠️ Dual AI not available - using basic responses")
                
        except Exception as e:
            print(f"❌ Error initializing dual AI: {e}")
            self.dual_ai = None
    
    def detect_platform(self, url: str) -> str:
        """Detect survey platform from URL"""
        url_lower = url.lower()
        
        if "cpx-research" in url_lower or "cpx" in url_lower:
            return "CPX Research"
        elif "qmee" in url_lower:
            return "Qmee"
        elif "purespectrum" in url_lower:
            return "PureSpectrum"
        elif "sampleeye" in url_lower:
            return "SampleEye"
        elif "samplecube" in url_lower:
            return "SampleCube"
        else:
            return "Universal"
    
    def optimize_for_platform(self, platform: str):
        """Optimize dual AI for specific platform"""
        try:
            if DUAL_AI_AVAILABLE and platform != self.current_platform:
                self.dual_ai = create_platform_integration(platform)
                self.current_platform = platform
                print(f"🚀 Optimized dual AI for {platform}")
                
                # Test the platform-specific system
                test_result = self.dual_ai.test_system()
                if test_result["status"] == "Success":
                    print(f"✅ {platform} AI system verified")
                else:
                    print(f"⚠️ {platform} AI system issues detected")
                    
        except Exception as e:
            print(f"❌ Error optimizing for {platform}: {e}")
    
    async def handle_survey_question(self, question: str, question_type: str = "open_ended", 
                                   options: List[Dict] = None, context: str = "") -> str:
        """
        Handle survey questions using dual AI system
        
        Args:
            question: The survey question text
            question_type: Type of question (open_ended, single_punch, multi_punch)
            options: Available options for multiple choice questions
            context: Additional context about the survey
        
        Returns:
            AI-generated response or selected option
        """
        try:
            # Check cache first
            cache_key = f"{question}_{question_type}_{self.current_platform}"
            if cache_key in self.question_cache:
                self.stats['cache_hits'] += 1
                cached_response = self.question_cache[cache_key]
                print(f"🎯 Using cached response: {cached_response[:100]}...")
                return cached_response
            
            self.stats['cache_misses'] += 1
            self.stats['total_requests'] += 1
            
            # Use dual AI if available
            if self.dual_ai:
                try:
                    # Build context
                    full_context = f"Platform: {self.current_platform}. Question type: {question_type}. {context}"
                    
                    # Get AI response
                    response = self.dual_ai.answer_question(question, question_type, options, full_context)
                    
                    if response:
                        # Clean and format response
                        cleaned_response = self._clean_response(response)
                        
                        # Cache the response
                        self.question_cache[cache_key] = cleaned_response
                        
                        # Track usage
                        if hasattr(self.dual_ai, 'ai_system'):
                            ai_stats = self.dual_ai.ai_system.get_performance_stats()
                            self.stats['gemini_usage'] = ai_stats.get('gemini_usage', 0)
                            self.stats['openai_usage'] = ai_stats.get('openai_usage', 0)
                            self.stats['fallback_usage'] = ai_stats.get('fallback_usage', 0)
                        
                        print(f"🤖 Dual AI response: {cleaned_response[:100]}...")
                        return cleaned_response
                    else:
                        print("⚠️ Dual AI failed - using fallback")
                        
                except Exception as e:
                    print(f"❌ Dual AI error: {e}")
            
            # Fallback to basic response
            fallback_response = await self._generate_fallback_response(question, question_type, options)
            self.stats['fallback_usage'] += 1
            
            # Cache the fallback response
            self.question_cache[cache_key] = fallback_response
            
            return fallback_response
            
        except Exception as e:
            print(f"❌ Error handling question: {e}")
            return "I would like to share my thoughts on this topic."
    
    def _clean_response(self, response: str) -> str:
        """Clean and format AI response to appear human-like"""
        if not response:
            return ""
        
        # Clean the response
        cleaned = response.strip()
        
        # Remove bot detection patterns
        cleaned = cleaned.replace(';', '')  # Remove semicolons (bot giveaway)
        cleaned = cleaned.replace('–', ' ')  # Remove en dashes
        cleaned = cleaned.replace('—', ' ')  # Remove em dashes
        cleaned = cleaned.replace('-', ' ')  # Remove regular dashes
        
        # Remove other bot-like patterns
        cleaned = cleaned.replace('...', '.')  # Replace ellipsis with period
        cleaned = cleaned.replace('..', '.')   # Replace double dots
        cleaned = cleaned.replace('  ', ' ')  # Remove double spaces
        
        # Clean up multiple spaces and formatting
        import re
        cleaned = re.sub(r'\s+', ' ', cleaned)  # Multiple spaces to single space
        
        # Remove quotes if they wrap the entire response
        cleaned = cleaned.strip('"').strip("'")
        
        # Remove bot-like sentence structures
        cleaned = re.sub(r'^I think\s+', '', cleaned, flags=re.IGNORECASE)  # Remove "I think" at start
        cleaned = re.sub(r'^I believe\s+', '', cleaned, flags=re.IGNORECASE)  # Remove "I believe" at start
        cleaned = re.sub(r'^In my opinion\s+', '', cleaned, flags=re.IGNORECASE)  # Remove "In my opinion" at start
        
        # Remove bot phrases anywhere in the text
        cleaned = cleaned.replace('I think ', '')
        cleaned = cleaned.replace('I believe ', '')
        cleaned = cleaned.replace('In my opinion ', '')
        
        # Fix double periods and spacing issues
        cleaned = re.sub(r'\.\s*\.', '.', cleaned)  # Remove double periods
        cleaned = re.sub(r'\s+\.', '.', cleaned)  # Fix spacing before periods
        
        # Clean up any remaining double spaces
        cleaned = re.sub(r'\s+', ' ', cleaned)
        
        # Ensure proper sentence structure
        if cleaned and not cleaned.endswith(('.', '!', '?')):
            cleaned += '.'
        
        # Capitalize first letter
        if cleaned:
            cleaned = cleaned[0].upper() + cleaned[1:]
        
        # Final cleanup - remove any leading/trailing spaces
        cleaned = cleaned.strip()
        
        return cleaned
    
    async def _generate_fallback_response(self, question: str, question_type: str, 
                                        options: List[Dict] = None) -> str:
        """Generate fallback response when dual AI is unavailable"""
        try:
            question_lower = question.lower()
            
            # Handle specific question types
            if any(term in question_lower for term in ['birth year', 'year of birth', 'born', 'birthdate']):
                import random
                from datetime import datetime
                current_year = datetime.now().year
                birth_year = current_year - random.randint(25, 45)
                return str(birth_year)
            
            if 'zip' in question_lower and 'code' in question_lower:
                return "90210"
            
            if 'city' in question_lower:
                return "Los Angeles"
            
            if 'state' in question_lower:
                return "California"
            
            if 'age' in question_lower or 'years old' in question_lower:
                return str(random.randint(25, 45))
            
            # Generic responses
            generic_responses = [
                "I find this topic quite interesting and would like to share my perspective.",
                "Based on my experience, I think this is an important consideration.",
                "I have some thoughts on this that I'd like to express.",
                "This is something I've thought about before and I have a few ideas.",
                "I believe this is worth discussing and I'd like to contribute my viewpoint."
            ]
            
            return random.choice(generic_responses)
            
        except Exception as e:
            print(f"❌ Error generating fallback response: {e}")
            return "I think this is interesting and I wanted to share my opinion on this topic."
    
    def get_stats(self) -> Dict[str, Any]:
        """Get comprehensive bot statistics"""
        stats = {
            'dual_ai_available': DUAL_AI_AVAILABLE,
            'current_platform': self.current_platform,
            'total_requests': self.stats['total_requests'],
            'gemini_usage': self.stats['gemini_usage'],
            'openai_usage': self.stats['openai_usage'],
            'fallback_usage': self.stats['fallback_usage'],
            'cache_hits': self.stats['cache_hits'],
            'cache_misses': self.stats['cache_misses'],
            'cache_efficiency': f"{(self.stats['cache_hits'] / max(self.stats['total_requests'], 1)) * 100:.1f}%" if self.stats['total_requests'] > 0 else "100%"
        }
        
        # Add dual AI stats if available
        if self.dual_ai and hasattr(self.dual_ai, 'ai_system'):
            try:
                ai_stats = self.dual_ai.ai_system.get_performance_stats()
                stats.update(ai_stats)
            except Exception as e:
                print(f"⚠️ Error getting AI stats: {e}")
        
        return stats
    
    def display_stats(self):
        """Display comprehensive statistics"""
        print("\n" + "=" * 80)
        print("📊 DUAL AI ENHANCED SURVEY BOT STATISTICS")
        print("=" * 80)
        
        stats = self.get_stats()
        
        print(f"🤖 Dual AI System: {'✅ Available' if stats['dual_ai_available'] else '❌ Not Available'}")
        print(f"🌐 Current Platform: {stats['current_platform']}")
        print(f"📊 Total Requests: {stats['total_requests']}")
        print(f"🚀 Gemini Usage: {stats['gemini_usage']}")
        print(f"🤖 OpenAI Usage: {stats['openai_usage']}")
        print(f"⚠️  Fallback Usage: {stats['fallback_usage']}")
        print(f"🎯 Cache Hits: {stats['cache_hits']}")
        print(f"❌ Cache Misses: {stats['cache_misses']}")
        print(f"💾 Cache Efficiency: {stats['cache_efficiency']}")
        
        if 'system_status' in stats:
            print(f"🔧 System Status: {stats['system_status']}")
        
        print("=" * 80)


# Main execution
async def main():
    """Main execution function"""
    print("🚀 Starting Dual AI Enhanced Survey Bot...")
    
    # Create bot instance
    bot = DualAIEnhancedSurveyBot()
    
    # Display initial stats
    bot.display_stats()
    
    # Test dual AI system
    print("\n🧪 Testing Dual AI System...")
    test_question = "What is your favorite hobby?"
    response = await bot.handle_survey_question(test_question, "open_ended", context="Hobby survey")
    print(f"✅ Test response: {response}")
    
    # Test platform optimization
    print("\n🚀 Testing Platform Optimization...")
    test_urls = [
        "https://offers.cpx-research.com/survey",
        "https://qmee.com/survey",
        "https://purespectrum.com/survey"
    ]
    
    for url in test_urls:
        platform = bot.detect_platform(url)
        print(f"🌐 URL: {url}")
        print(f"🎯 Detected Platform: {platform}")
        bot.optimize_for_platform(platform)
        
        # Test question on optimized platform
        test_response = await bot.handle_survey_question(
            "What is your favorite color?", 
            "open_ended", 
            context="Color preference survey"
        )
        print(f"🤖 Response: {test_response}")
        print("-" * 50)
    
    # Display final stats
    print("\n📊 Final Statistics:")
    bot.display_stats()
    
    print("\n🎉 Dual AI Enhanced Survey Bot test complete!")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n👋 Bot stopped by user")
    except Exception as e:
        print(f"❌ Error: {e}")
        traceback.print_exc()
