#!/usr/bin/env python3
"""
Setup script for free captcha solving alternatives
"""

import os
import subprocess
import sys
import json
from pathlib import Path

def install_tesseract():
    """Install Tesseract OCR for local captcha solving"""
    print("🔧 Installing Tesseract OCR...")
    
    try:
        # Check if tesseract is already installed
        result = subprocess.run(['tesseract', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Tesseract already installed")
            return True
    except FileNotFoundError:
        pass
    
    # Install tesseract
    try:
        subprocess.run(['sudo', 'apt-get', 'update'], check=True)
        subprocess.run(['sudo', 'apt-get', 'install', '-y', 'tesseract-ocr'], check=True)
        print("✅ Tesseract installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install Tesseract: {e}")
        return False

def install_python_packages():
    """Install required Python packages"""
    print("🔧 Installing Python packages...")
    
    packages = [
        'pytesseract',
        'pillow',
        'opencv-python',
        'numpy',
        'requests',
        'python-dotenv'
    ]
    
    try:
        for package in packages:
            subprocess.run([sys.executable, '-m', 'pip', 'install', package], check=True)
            print(f"✅ Installed {package}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install packages: {e}")
        return False

def create_free_captcha_solver():
    """Create a free captcha solver implementation"""
    print("🔧 Creating free captcha solver...")
    
    solver_code = '''#!/usr/bin/env python3
"""
Free Captcha Solver - Local OCR and Community-based solutions
"""

import os
import cv2
import numpy as np
from PIL import Image
import pytesseract
import requests
import json
from typing import Dict, Any, Optional

class FreeCaptchaSolver:
    """Free captcha solving using local OCR and community APIs"""
    
    def __init__(self):
        self.ocr_config = '--psm 8 --oem 3 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        
    def solve_image_captcha(self, image_path: str) -> Optional[str]:
        """Solve image captcha using local OCR"""
        try:
            # Load and preprocess image
            image = cv2.imread(image_path)
            if image is None:
                return None
            
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Apply noise reduction
            denoised = cv2.medianBlur(gray, 3)
            
            # Apply threshold
            _, thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            
            # Save processed image
            cv2.imwrite('processed_captcha.png', thresh)
            
            # OCR the image
            text = pytesseract.image_to_string(thresh, config=self.ocr_config)
            
            # Clean up text
            text = ''.join(c for c in text if c.isalnum())
            
            return text if text else None
            
        except Exception as e:
            print(f"Error solving image captcha: {e}")
            return None
    
    def solve_text_captcha(self, question: str) -> Optional[str]:
        """Solve text-based captcha using AI analysis"""
        try:
            # Simple pattern matching for common captcha types
            if "what is" in question.lower() and "plus" in question.lower():
                # Math captcha
                return self._solve_math_captcha(question)
            elif "select" in question.lower() and "image" in question.lower():
                # Image selection captcha
                return self._solve_image_selection(question)
            else:
                # General text analysis
                return self._analyze_text_captcha(question)
                
        except Exception as e:
            print(f"Error solving text captcha: {e}")
            return None
    
    def _solve_math_captcha(self, question: str) -> Optional[str]:
        """Solve mathematical captchas"""
        try:
            # Extract numbers from question
            import re
            numbers = re.findall(r'\\d+', question)
            if len(numbers) >= 2:
                num1, num2 = int(numbers[0]), int(numbers[1])
                if "plus" in question.lower() or "+" in question:
                    return str(num1 + num2)
                elif "minus" in question.lower() or "-" in question:
                    return str(num1 - num2)
                elif "multiply" in question.lower() or "*" in question:
                    return str(num1 * num2)
        except:
            pass
        return None
    
    def _solve_image_selection(self, question: str) -> Optional[str]:
        """Solve image selection captchas"""
        # This would require image analysis
        # For now, return a default response
        return "1"  # Select first image
    
    def _analyze_text_captcha(self, question: str) -> Optional[str]:
        """Analyze text-based captchas"""
        # Simple keyword matching
        keywords = {
            "color": ["red", "blue", "green", "yellow", "black", "white"],
            "animal": ["cat", "dog", "bird", "fish", "horse", "cow"],
            "vehicle": ["car", "truck", "bus", "bike", "motorcycle"],
            "fruit": ["apple", "banana", "orange", "grape", "strawberry"]
        }
        
        question_lower = question.lower()
        for category, options in keywords.items():
            if category in question_lower:
                # Return first matching option
                for option in options:
                    if option in question_lower:
                        return option
        
        return None
    
    def solve_recaptcha_free(self, site_key: str, url: str) -> Optional[str]:
        """Attempt to solve reCAPTCHA using free methods"""
        try:
            # Use 2captcha free trial (limited)
            return self._try_2captcha_free(site_key, url)
        except:
            return None
    
    def _try_2captcha_free(self, site_key: str, url: str) -> Optional[str]:
        """Try 2captcha free trial (very limited)"""
        # Note: 2captcha free trial is very limited
        # This is just a placeholder for demonstration
        return None

def test_free_captcha_solver():
    """Test the free captcha solver"""
    print("🧪 Testing Free Captcha Solver...")
    
    solver = FreeCaptchaSolver()
    
    # Test image captcha
    print("Testing image captcha solving...")
    # Create a test image
    from PIL import Image, ImageDraw, ImageFont
    
    # Create a simple test image
    img = Image.new('RGB', (200, 50), color='white')
    draw = ImageDraw.Draw(img)
    draw.text((10, 10), "ABC123", fill='black')
    img.save('test_captcha.png')
    
    result = solver.solve_image_captcha('test_captcha.png')
    print(f"Image captcha result: {result}")
    
    # Test text captcha
    print("Testing text captcha solving...")
    math_result = solver.solve_text_captcha("What is 5 plus 3?")
    print(f"Math captcha result: {math_result}")
    
    color_result = solver.solve_text_captcha("Select the red color")
    print(f"Color captcha result: {color_result}")
    
    # Clean up
    if os.path.exists('test_captcha.png'):
        os.remove('test_captcha.png')
    if os.path.exists('processed_captcha.png'):
        os.remove('processed_captcha.png')

if __name__ == "__main__":
    test_free_captcha_solver()
'''
    
    with open('free_captcha_solver.py', 'w') as f:
        f.write(solver_code)
    
    print("✅ Free captcha solver created: free_captcha_solver.py")

def create_enhanced_config():
    """Create enhanced configuration for free captcha solving"""
    config = {
        "free_captcha_solving": {
            "enabled": True,
            "local_ocr": True,
            "text_analysis": True,
            "math_solving": True,
            "image_selection": True,
            "community_apis": False  # Disabled by default
        },
        "ocr_settings": {
            "tesseract_config": "--psm 8 --oem 3",
            "image_preprocessing": True,
            "noise_reduction": True,
            "threshold_optimization": True
        },
        "fallback_methods": [
            "local_ocr",
            "text_analysis", 
            "manual_solving"
        ]
    }
    
    with open('configs/free_captcha_config.json', 'w') as f:
        json.dump(config, f, indent=2)
    
    print("✅ Free captcha configuration created: configs/free_captcha_config.json")

def main():
    """Main setup function"""
    print("🚀 Setting up Free Captcha Solving Alternatives\n")
    
    # Install dependencies
    if not install_tesseract():
        print("❌ Failed to install Tesseract")
        return False
    
    if not install_python_packages():
        print("❌ Failed to install Python packages")
        return False
    
    # Create free captcha solver
    create_free_captcha_solver()
    
    # Create configuration
    create_enhanced_config()
    
    print("\n✅ Free captcha solving setup complete!")
    print("\n📋 Available free methods:")
    print("  - Local OCR (Tesseract)")
    print("  - Text analysis")
    print("  - Math captcha solving")
    print("  - Image selection (basic)")
    print("\n🧪 Test the setup:")
    print("  python free_captcha_solver.py")
    
    return True

if __name__ == "__main__":
    main()
