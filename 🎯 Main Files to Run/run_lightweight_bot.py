#!/usr/bin/env python3
"""
Run script for the Lightweight Vision-Based Survey Bot
Based on Blue Parker's vision-based approach without heavy dependencies
"""

import asyncio
import json
import sys
from pathlib import Path

def load_config(config_path: str = "../⚙️ Configurations/configs/self_operating_config.json"):
    """Load configuration from JSON file."""
    try:
        with open(config_path, 'r') as f:
            config = json.load(f)
        print(f"✅ Configuration loaded from {config_path}")
        return config
    except FileNotFoundError:
        print(f"❌ Configuration file not found: {config_path}")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON in configuration: {e}")
        return None

async def run_lightweight_bot(config_path: str = "../⚙️ Configurations/configs/self_operating_config.json"):
    """Run the lightweight vision-based survey bot."""
    print("🤖 Lightweight Vision-Based Survey Bot")
    print("Based on Blue Parker's Vision-Based Approach")
    print("(Lightweight version - no heavy dependencies)")
    print("=" * 60)
    
    # Load configuration
    config = load_config(config_path)
    if not config:
        print("❌ Failed to load configuration")
        return
    
    # Import the lightweight bot
    try:
        sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "📁 Project Structure"))
        from bot_implementations.lightweight_vision_bot import LightweightVisionBot
    except ImportError as e:
        print(f"❌ Failed to import LightweightVisionBot: {e}")
        print("💡 Install lightweight dependencies:")
        print("   pip install -r ../⚙️ Configurations/requirements_lightweight.txt")
        return
    
    # Create bot instance
    try:
        bot = LightweightVisionBot(config)
        print("✅ Lightweight Vision Bot created successfully")
    except Exception as e:
        print(f"❌ Failed to create bot: {e}")
        return
    
    # Run the bot
    try:
        print("🚀 Starting lightweight vision-based survey automation...")
        await bot.run()
    except KeyboardInterrupt:
        print("\n⚠️  Bot stopped by user")
    except Exception as e:
        print(f"❌ Bot execution failed: {e}")
    finally:
        # Cleanup
        try:
            await bot.cleanup()
            print("✅ Bot cleanup completed")
        except Exception as e:
            print(f"⚠️  Cleanup failed: {e}")

def main():
    """Main function."""
    # Check command line arguments
    config_path = "../⚙️ Configurations/configs/self_operating_config.json"
    if len(sys.argv) > 1:
        config_path = sys.argv[1]
    
    print(f"📋 Using configuration: {config_path}")
    
            # Check if config file exists
        if not Path(config_path).exists():
            print(f"❌ Configuration file not found: {config_path}")
            print("💡 Available config files:")
            config_dir = Path("../⚙️ Configurations/configs")
        if config_dir.exists():
            for config_file in config_dir.glob("*.json"):
                print(f"   - {config_file}")
        return
    
    # Run the bot
    asyncio.run(run_lightweight_bot(config_path))

if __name__ == "__main__":
    main()
