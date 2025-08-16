#!/bin/bash

# SurveyBot-v2 Virtual Environment Activation Script
echo "Activating SurveyBot-v2 virtual environment..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Error: Virtual environment 'venv' not found!"
    echo "Please run: python3 -m venv venv"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Verify activation
if [ -n "$VIRTUAL_ENV" ]; then
    echo "✅ Virtual environment activated successfully!"
    echo "📍 Virtual environment: $VIRTUAL_ENV"
    echo "🐍 Python version: $(python --version)"
    echo "📦 Pip version: $(pip --version)"
    echo ""
    echo "To deactivate, run: deactivate"
    echo "To install packages: pip install -r requirements.txt"
    echo ""
    echo "Your virtual environment is now active! 🎉"
else
    echo "❌ Failed to activate virtual environment"
    exit 1
fi
