#!/usr/bin/env python3
"""
Typing Simulation Demo
======================

This demo showcases all the different typing styles available in the Survey Bot.
Run this file to see how each typing style behaves in real-time.

Usage:
    python typing_demo.py [style_name]
    
Available styles:
    - fast_typer      : Quick, efficient typing
    - average_typer   : Balanced speed and naturalness
    - slow_typer      : Deliberate, careful typing
    - careful_typer   : Very precise, methodical typing

Examples:
    python typing_demo.py                    # Demo all styles
    python typing_demo.py fast_typer        # Demo only fast_typer
    python typing_demo.py --interactive     # Interactive demo mode
"""

import asyncio
import time
import sys
import argparse
from typing import Dict, Any, Optional
import random

# Import the typing simulation module
try:
    from typing_simulation import TypingSimulator, type_text_naturally, TYPING_PRESETS
    print("✅ Typing simulation module imported successfully")
except ImportError as e:
    print(f"❌ Error importing typing simulation: {e}")
    print("Make sure typing_simulation.py is in the same directory")
    sys.exit(1)

class TypingDemo:
    """Interactive demo for all typing styles"""
    
    def __init__(self):
        self.typing_simulator = TypingSimulator()
        self.demo_texts = [
            "Hello, this is a test message!",
            "My age is 25 years old.",
            "I live in Los Angeles, California.",
            "Please select your favorite color from the options below.",
            "This typing simulation looks very natural and human-like.",
            "12345 - Testing numbers and special characters!",
            "The quick brown fox jumps over the lazy dog.",
            "Sample survey question: How satisfied are you with our service?"
        ]
        
    def print_style_info(self, style_name: str, preset: Dict[str, Any]):
        """Display information about a typing style"""
        print(f"\n{'='*60}")
        print(f"🎯 TYPING STYLE: {style_name.upper().replace('_', ' ')}")
        print(f"{'='*60}")
        print(f"📊 Base Speed: {preset['base_typing_interval']:.3f}s per character")
        print(f"🔄 Variation: ±{preset['variance_range']:.3f}s")
        print(f"⏸️  Pause Chance: {preset['pause_probability']*100:.0f}%")
        print(f"⏱️  Pause Duration: {preset['pause_duration_range'][0]:.1f}s - {preset['pause_duration_range'][1]:.1f}s")
        print(f"🔤 Typo Chance: 2% (built-in)")
        print(f"⌨️  Backspace Delay: 0.1s (built-in)")
        print(f"{'='*60}")
    
    def demo_single_style(self, style_name: str, text: str, show_timing: bool = True):
        """Demonstrate a single typing style"""
        if style_name not in TYPING_PRESETS:
            print(f"❌ Unknown typing style: {style_name}")
            return
        
        preset = TYPING_PRESETS[style_name]
        self.print_style_info(style_name, preset)
        
        print(f"\n📝 Demo Text: {text}")
        print(f"⏰ Starting typing simulation...")
        print(f"🔤 Typed text:")
        
        # Start timing
        start_time = time.time()
        
        # Simulate typing with visual feedback
        typed_chars = []
        for i, char in enumerate(text):
            # Simulate typing delay
            delay = preset['base_typing_interval'] + random.uniform(-preset['variance_range'], preset['variance_range'])
            time.sleep(delay)
            
            # Add character
            typed_chars.append(char)
            
            # Show progress
            if show_timing:
                print(f"   [{delay:.3f}s] '{char}' → {''.join(typed_chars)}")
            else:
                print(f"   '{char}' → {''.join(typed_chars)}")
            
            # Simulate occasional pauses
            if random.random() < preset['pause_probability']:
                pause_duration = random.uniform(preset['pause_duration_range'][0], preset['pause_duration_range'][1])
                print(f"   ⏸️  Pause for {pause_duration:.2f}s...")
                time.sleep(pause_duration)
            
            # Simulate occasional typos (2% chance, built-in)
            if random.random() < 0.02:
                typo_char = random.choice('abcdefghijklmnopqrstuvwxyz')
                typed_chars.append(typo_char)
                print(f"   ❌ Typo: '{typo_char}' → {''.join(typed_chars)}")
                time.sleep(0.1)  # Built-in backspace delay
                typed_chars.pop()  # Remove typo
                print(f"   🔙 Backspace → {''.join(typed_chars)}")
        
        # End timing
        end_time = time.time()
        total_time = end_time - start_time
        
        print(f"\n✅ Typing completed!")
        print(f"⏱️  Total time: {total_time:.2f}s")
        print(f"📊 Average speed: {total_time/len(text):.3f}s per character")
        print(f"🎯 Target speed: {preset['base_typing_interval']:.3f}s per character")
        
        return total_time
    
    def demo_all_styles(self, text: str = None):
        """Demonstrate all typing styles with the same text"""
        if text is None:
            text = random.choice(self.demo_texts)
        
        print(f"\n🚀 DEMONSTRATING ALL TYPING STYLES")
        print(f"📝 Sample text: {text}")
        print(f"{'='*80}")
        
        results = {}
        
        for style_name in TYPING_PRESETS.keys():
            print(f"\n{'🔄'*20} {style_name.upper()} {'🔄'*20}")
            try:
                total_time = self.demo_single_style(style_name, text, show_timing=False)
                results[style_name] = total_time
            except Exception as e:
                print(f"❌ Error demonstrating {style_name}: {e}")
                results[style_name] = None
        
        # Show comparison
        self.show_comparison(text, results)
    
    def show_comparison(self, text: str, results: Dict[str, float]):
        """Show a comparison of all typing styles"""
        print(f"\n{'📊'*20} TYPING STYLE COMPARISON {'📊'*20}")
        print(f"📝 Text: {text}")
        print(f"🔢 Character count: {len(text)}")
        print(f"{'='*80}")
        
        # Sort by speed (fastest first)
        sorted_results = sorted(results.items(), key=lambda x: x[1] if x[1] is not None else float('inf'))
        
        print(f"{'Style':<20} {'Time':<10} {'Speed':<15} {'Efficiency':<15}")
        print(f"{'-'*20} {'-'*10} {'-'*15} {'-'*15}")
        
        for style_name, total_time in sorted_results:
            if total_time is not None:
                speed = total_time / len(text)
                efficiency = (TYPING_PRESETS[style_name]['base_typing_interval'] / speed) * 100
                print(f"{style_name:<20} {total_time:<10.2f}s {speed:<15.3f}s/char {efficiency:<15.1f}%")
            else:
                print(f"{style_name:<20} {'ERROR':<10} {'ERROR':<15} {'ERROR':<15}")
    
    def interactive_demo(self):
        """Interactive demo where user can choose styles and text"""
        print(f"\n🎮 INTERACTIVE TYPING DEMO")
        print(f"{'='*50}")
        
        while True:
            print(f"\n📋 Available options:")
            print(f"1. Demo all styles")
            print(f"2. Demo specific style")
            print(f"3. Custom text demo")
            print(f"4. Exit")
            
            choice = input(f"\n🎯 Enter your choice (1-4): ").strip()
            
            if choice == '1':
                text = input(f"📝 Enter text to demo (or press Enter for random): ").strip()
                if not text:
                    text = random.choice(self.demo_texts)
                self.demo_all_styles(text)
                
            elif choice == '2':
                print(f"\n🎯 Available styles:")
                for i, style in enumerate(TYPING_PRESETS.keys(), 1):
                    print(f"   {i}. {style}")
                
                try:
                    style_choice = int(input(f"\n🎯 Choose style (1-{len(TYPING_PRESETS)}): ")) - 1
                    style_names = list(TYPING_PRESETS.keys())
                    if 0 <= style_choice < len(style_names):
                        style_name = style_names[style_choice]
                        text = input(f"📝 Enter text to demo (or press Enter for random): ").strip()
                        if not text:
                            text = random.choice(self.demo_texts)
                        self.demo_single_style(style_name, text)
                    else:
                        print("❌ Invalid choice!")
                except ValueError:
                    print("❌ Please enter a valid number!")
                    
            elif choice == '3':
                text = input(f"📝 Enter your custom text: ").strip()
                if text:
                    style = input(f"🎯 Enter typing style (or press Enter for all): ").strip()
                    if style and style in TYPING_PRESETS:
                        self.demo_single_style(style, text)
                    else:
                        self.demo_all_styles(text)
                else:
                    print("❌ Please enter some text!")
                    
            elif choice == '4':
                print("👋 Goodbye! Thanks for trying the typing demo!")
                break
                
            else:
                print("❌ Invalid choice! Please enter 1-4.")
    
    def quick_demo(self, style_name: str = None):
        """Quick demo of typing styles"""
        if style_name and style_name in TYPING_PRESETS:
            # Demo specific style
            text = "Hello World! This is a quick demo."
            self.demo_single_style(style_name, text)
        else:
            # Demo all styles with short text
            text = "Hi there!"
            self.demo_all_styles(text)

def main():
    """Main function to run the typing demo"""
    parser = argparse.ArgumentParser(description="Typing Simulation Demo")
    parser.add_argument("style", nargs="?", help="Specific typing style to demo")
    parser.add_argument("--interactive", "-i", action="store_true", help="Run in interactive mode")
    parser.add_argument("--quick", "-q", action="store_true", help="Quick demo mode")
    
    args = parser.parse_args()
    
    print("🎯 TYPING SIMULATION DEMO")
    print("=" * 50)
    
    demo = TypingDemo()
    
    try:
        if args.interactive:
            demo.interactive_demo()
        elif args.quick:
            demo.quick_demo(args.style)
        elif args.style:
            # Demo specific style
            if args.style in TYPING_PRESETS:
                text = "This is a demonstration of the specified typing style."
                demo.demo_single_style(args.style, text)
            else:
                print(f"❌ Unknown typing style: {args.style}")
                print(f"Available styles: {', '.join(TYPING_PRESETS.keys())}")
        else:
            # Demo all styles
            demo.demo_all_styles()
            
    except KeyboardInterrupt:
        print(f"\n\n⏹️  Demo interrupted by user")
    except Exception as e:
        print(f"\n❌ Demo error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
