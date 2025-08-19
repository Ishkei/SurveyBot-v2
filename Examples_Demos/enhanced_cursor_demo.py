#!/usr/bin/env python3
"""
Enhanced Cursor Simulation Demo
Showcases the new HumanCursor-based cursor simulation features
"""

import asyncio
import sys
import os
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from Project_Structure.bot_implementations.advanced_survey_bot import AdvancedSurveyBot
from Project_Structure.enhanced_cursor_simulation import EnhancedCursorSimulator

async def demo_enhanced_cursor():
    """Demo the enhanced cursor simulation features."""
    
    print("🚀 Enhanced Cursor Simulation Demo")
    print("=" * 50)
    
    # Load configuration
    config = {
        "DEBUG_MODE": True,
        "USE_VISION_MODEL": False,
        "USE_OCR": False,
        "USE_MOUSE_CONTROL": True,
        "SURVEY_URL": "https://example.com",
        
        # Enhanced cursor configuration
        "cursor_simulation": {
            "ENABLE_CURSOR_TRAIL": True,
            "SHOW_MOVEMENT_PATH": True,
            "CURSOR_TRAIL_DURATION": 2.0,
            "HIGHLIGHT_CLICK_TARGETS": True
        },
        
        "mouse_movement": {
            "ENHANCED_BEZIER_CURVES": True,
            "CONTROL_POINT_RANDOMNESS": 100,
            "MOVEMENT_SMOOTHNESS": 15,
            "HUMAN_LIKE_RANDOMNESS": 3,
            "ACCELERATION_CURVE": "ease_in_out",
            "MOVEMENT_SPEED": "normal",
            "BASE_SPEED_PX_PER_SEC": 200
        },
        
        "scrolling_methods": {
            "PREFERRED_METHOD": "auto",
            "ENABLE_SCROLLBAR_DETECTION": True,
            "ENABLE_MOUSE_WHEEL": True,
            "ENABLE_SMOOTH_SCROLL": True,
            "SCROLL_STEPS": 10,
            "STEP_DELAY": 0.05
        }
    }
    
    try:
        # Initialize enhanced cursor simulator
        print("🔧 Initializing Enhanced Cursor Simulator...")
        cursor_simulator = EnhancedCursorSimulator(config)
        
        # Test basic mouse movement
        print("\n📱 Testing Human-like Mouse Movement...")
        start_pos = (100, 100)
        end_pos = (500, 400)
        
        success = await cursor_simulator.move_mouse_human_like(start_pos, end_pos)
        print(f"   Mouse movement: {'✅' if success else '❌'}")
        
        # Test clicking
        print("\n🖱️ Testing Human-like Clicking...")
        click_success = await cursor_simulator.click_element_human_like(end_pos, "demo_button")
        print(f"   Click action: {'✅' if click_success else '❌'}")
        
        # Test scrolling
        print("\n📜 Testing Advanced Scrolling...")
        scroll_methods = ["mouse_wheel", "smooth", "javascript"]
        
        for method in scroll_methods:
            scroll_success = await cursor_simulator.advanced_scroll("down", method)
            print(f"   {method} scroll: {'✅' if scroll_success else '❌'}")
            await asyncio.sleep(0.5)
        
        # Test drag and drop
        print("\n🔄 Testing Drag and Drop...")
        drag_start = (300, 300)
        drag_end = (600, 600)
        drag_success = await cursor_simulator.drag_and_drop(drag_start, drag_end)
        print(f"   Drag and drop: {'✅' if drag_success else '❌'}")
        
        # Test cursor position
        print("\n📍 Testing Cursor Position...")
        current_pos = cursor_simulator.get_cursor_position()
        print(f"   Current position: {current_pos}")
        
        # Test cursor trail visualization
        print("\n🎨 Testing Cursor Trail Visualization...")
        demo_path = [(100, 100), (200, 150), (300, 200), (400, 250), (500, 300)]
        trail_success = await cursor_simulator.show_cursor_trail(demo_path, 2.0)
        print(f"   Cursor trail: {'✅' if trail_success else '❌'}")
        
        print("\n✅ Enhanced Cursor Demo Completed Successfully!")
        
    except Exception as e:
        print(f"❌ Demo failed: {e}")
        import traceback
        traceback.print_exc()

async def demo_integrated_bot():
    """Demo the enhanced cursor features integrated with the survey bot."""
    
    print("\n🤖 Integrated Survey Bot Demo")
    print("=" * 50)
    
    config = {
        "DEBUG_MODE": True,
        "USE_VISION_MODEL": False,
        "USE_OCR": False,
        "USE_MOUSE_CONTROL": True,
        "SURVEY_URL": "https://example.com",
        
        "cursor_simulation": {
            "ENABLE_CURSOR_TRAIL": True,
            "SHOW_MOVEMENT_PATH": True
        },
        
        "mouse_movement": {
            "ENHANCED_BEZIER_CURVES": True,
            "HUMAN_LIKE_RANDOMNESS": 3
        },
        
        "scrolling_methods": {
            "PREFERRED_METHOD": "auto",
            "ENABLE_MOUSE_WHEEL": True,
            "ENABLE_SMOOTH_SCROLL": True
        }
    }
    
    try:
        # Initialize the enhanced survey bot
        print("🔧 Initializing Enhanced Survey Bot...")
        bot = AdvancedSurveyBot(config)
        
        # Test enhanced cursor methods
        print("\n📱 Testing Bot's Enhanced Cursor Methods...")
        
        # Test mouse movement
        start_pos = (200, 200)
        end_pos = (600, 500)
        move_success = await bot.move_mouse_human_like(start_pos, end_pos)
        print(f"   Bot mouse movement: {'✅' if move_success else '❌'}")
        
        # Test advanced scrolling
        scroll_success = await bot.advanced_scroll("down", "smooth")
        print(f"   Bot smooth scroll: {'✅' if scroll_success else '❌'}")
        
        # Test drag and drop
        drag_success = await bot.drag_and_drop((400, 400), (700, 700))
        print(f"   Bot drag and drop: {'✅' if drag_success else '❌'}")
        
        # Test cursor position
        bot_pos = bot.get_cursor_position()
        print(f"   Bot cursor position: {bot_pos}")
        
        print("\n✅ Integrated Bot Demo Completed Successfully!")
        
    except Exception as e:
        print(f"❌ Integrated demo failed: {e}")
        import traceback
        traceback.print_exc()

async def main():
    """Main demo function."""
    print("🎯 Enhanced Cursor Simulation Demo Suite")
    print("=" * 60)
    
    # Demo 1: Standalone cursor simulator
    await demo_enhanced_cursor()
    
    # Demo 2: Integrated with survey bot
    await demo_integrated_bot()
    
    print("\n🎉 All demos completed!")
    print("\n💡 Key Features Demonstrated:")
    print("   • Human-like mouse movement with HumanCursor")
    print("   • Enhanced Bézier curve paths")
    print("   • Multiple scrolling methods")
    print("   • Drag and drop simulation")
    print("   • Cursor trail visualization")
    print("   • Fallback strategies for compatibility")
    print("   • Integration with existing survey bot")

if __name__ == "__main__":
    asyncio.run(main())
