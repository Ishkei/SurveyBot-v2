#!/usr/bin/env python3
"""
Demo script showcasing human-like typing simulation for survey bots.
This demonstrates how the bot can simulate realistic typing patterns when answering open-ended questions.
"""

import asyncio
import json
import time
from typing_simulation import TypingSimulator, type_text_naturally, TYPING_PRESETS


async def demo_typing_simulation():
    """Demonstrate the typing simulation capabilities."""
    
    print("🤖 Survey Bot Typing Simulation Demo")
    print("=" * 50)
    
    # Load typing configuration
    try:
        with open('configs/typing_simulation_config.json', 'r') as f:
            config = json.load(f)
        print("✅ Loaded typing simulation configuration")
    except FileNotFoundError:
        print("⚠️ Configuration file not found, using default settings")
        config = {}
    
    # Initialize typing simulator
    simulator = TypingSimulator(config.get('typing_simulation', {}))
    
    # Demo different typing styles
    print("\n📝 Typing Style Presets:")
    for style_name, style_config in TYPING_PRESETS.items():
        print(f"  • {style_name}: {style_config['base_typing_interval']}s base interval")
    
    # Sample open-ended questions
    sample_questions = [
        "In a few words, tell us, why did you join Qmee?",
        "What motivated you to participate in this survey?",
        "How do you typically spend your free time?",
        "Tell us about your shopping habits.",
        "What are your thoughts on technology?"
    ]
    
    print(f"\n🔍 Sample Open-Ended Questions ({len(sample_questions)} total):")
    for i, question in enumerate(sample_questions, 1):
        print(f"  {i}. {question}")
    
    # Demo personality responses
    print("\n💭 Personality Response Generation:")
    try:
        from personality_responses import generate_personality_response
        
        # Load persona
        try:
            with open('configs/persona.json', 'r') as f:
                persona = json.load(f)
            print("✅ Loaded persona configuration")
        except FileNotFoundError:
            print("⚠️ Persona file not found, using default")
            persona = {}
        
        # Generate responses for each question
        responses = []
        for question in sample_questions[:3]:  # Demo first 3 questions
            print(f"\n🤔 Question: {question}")
            
            try:
                response = await generate_personality_response(question, style="discord_casual")
                print(f"💬 Response: {response}")
                responses.append((question, response))
            except Exception as e:
                print(f"❌ Error generating response: {e}")
                # Use fallback response
                fallback = "I saw an ad for this and thought it sounded like a good way to earn some extra money in my free time."
                print(f"💬 Fallback: {fallback}")
                responses.append((question, fallback))
        
        print(f"\n✅ Generated {len(responses)} personality responses")
        
    except ImportError:
        print("⚠️ Personality response module not available")
        # Use generic responses for demo
        responses = [
            (sample_questions[0], "I saw an ad for this and thought it sounded like a good way to earn some extra money in my free time."),
            (sample_questions[1], "I'm interested in sharing my opinions and earning rewards for my time."),
            (sample_questions[2], "I enjoy reading, watching movies, and spending time with friends and family.")
        ]
    
    # Demo typing simulation
    print("\n⌨️ Typing Simulation Demo:")
    print("Note: This is a simulation - no actual typing will occur")
    
    for i, (question, response) in enumerate(responses, 1):
        print(f"\n--- Question {i} ---")
        print(f"Q: {question}")
        print(f"A: {response}")
        
        # Simulate different typing styles
        for style_name in ['careful_typer', 'average_typer', 'fast_typer']:
            print(f"\n  Typing style: {style_name}")
            
            # Calculate estimated typing time
            config = TYPING_PRESETS[style_name]
            base_interval = config['base_typing_interval']
            char_count = len(response)
            estimated_time = char_count * base_interval
            
            print(f"    Characters: {char_count}")
            print(f"    Base interval: {base_interval}s")
            print(f"    Estimated time: {estimated_time:.1f}s")
            
            # Simulate typing delays
            if style_name == 'careful_typer':
                print("    🧠 Pausing for thoughtful responses...")
                await asyncio.sleep(0.5)
            elif style_name == 'average_typer':
                print("    ⚡ Normal typing pace...")
                await asyncio.sleep(0.3)
            else:  # fast_typer
                print("    🚀 Fast, confident typing...")
                await asyncio.sleep(0.2)
    
    # Demo advanced features
    print("\n🔧 Advanced Typing Features:")
    
    # Typo simulation
    print("  • Typo simulation: 2% chance of realistic typos")
    print("  • Thinking pauses: Pauses on certain words")
    print("  • Correction simulation: Occasional backspacing")
    print("  • Variable timing: Natural speed variations")
    
    # Performance metrics
    print("\n📊 Performance Metrics:")
    total_questions = len(responses)
    avg_response_length = sum(len(r[1]) for r in responses) / total_questions if responses else 0
    
    print(f"  • Total questions processed: {total_questions}")
    print(f"  • Average response length: {avg_response_length:.1f} characters")
    print(f"  • Typing styles available: {len(TYPING_PRESETS)}")
    
    # Configuration options
    print("\n⚙️ Configuration Options:")
    print("  • Enable/disable typing simulation")
    print("  • Customize typing speeds")
    print("  • Adjust typo probabilities")
    print("  • Set pause durations")
    print("  • Choose typing styles per question type")
    
    print("\n✅ Typing simulation demo completed!")
    print("\n💡 Usage in your bot:")
    print("  1. Import the typing_simulation module")
    print("  2. Use type_text_naturally() for human-like typing")
    print("  3. Choose appropriate typing styles for different question types")
    print("  4. Configure settings in typing_simulation_config.json")


async def demo_configuration_loading():
    """Demo loading and applying typing configurations."""
    
    print("\n🔧 Configuration Loading Demo:")
    print("=" * 40)
    
    try:
        # Load configuration
        with open('configs/typing_simulation_config.json', 'r') as f:
            config = json.load(f)
        
        # Show available styles
        styles = config.get('typing_simulation', {}).get('styles', {})
        print(f"Available typing styles: {list(styles.keys())}")
        
        # Show question type mapping
        mapping = config.get('typing_simulation', {}).get('question_type_mapping', {})
        print(f"Question type mappings: {list(mapping.keys())}")
        
        # Show detection keywords
        keywords = config.get('typing_simulation', {}).get('detection_keywords', {})
        print(f"Detection keywords: {list(keywords.keys())}")
        
        print("✅ Configuration loaded successfully")
        
    except FileNotFoundError:
        print("❌ Configuration file not found")
    except Exception as e:
        print(f"❌ Error loading configuration: {e}")


async def main():
    """Main demo function."""
    print("🚀 Starting Survey Bot Typing Simulation Demo")
    print("=" * 60)
    
    # Run demos
    await demo_typing_simulation()
    await demo_configuration_loading()
    
    print("\n🎉 Demo completed successfully!")
    print("\n📚 Next steps:")
    print("  1. Integrate typing simulation into your survey bot")
    print("  2. Customize typing styles for your use case")
    print("  3. Test with real survey sites")
    print("  4. Monitor performance and adjust settings")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n⏹️ Demo interrupted by user")
    except Exception as e:
        print(f"\n❌ Demo failed: {e}")
        print("Make sure all required modules are available")
