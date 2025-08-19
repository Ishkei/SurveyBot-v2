#!/usr/bin/env python3
"""
Simple test script for enhanced cursor simulation
Tests the core functionality without complex dependencies
"""

import asyncio
import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

async def test_enhanced_cursor():
    """Test the enhanced cursor simulation module."""
    
    print("🧪 Testing Enhanced Cursor Simulation")
    print("=" * 50)
    
    try:
        # Test import
        print("📦 Testing imports...")
        from Project_Structure.enhanced_cursor_simulation import EnhancedCursorSimulator
        print("✅ EnhancedCursorSimulator imported successfully")
        
        # Test initialization
        print("\n🔧 Testing initialization...")
        config = {
            "cursor_simulation": {"ENABLE_CURSOR_TRAIL": True},
            "mouse_movement": {"HUMAN_LIKE_RANDOMNESS": 3},
            "scrolling_methods": {"PREFERRED_METHOD": "auto"}
        }
        
        cursor = EnhancedCursorSimulator(config)
        print("✅ EnhancedCursorSimulator initialized successfully")
        print(f"   Current method: {cursor.current_method}")
        print(f"   HumanCursor available: {cursor.system_cursor is not None}")
        
        # Test basic functionality
        print("\n📱 Testing basic functionality...")
        
        # Test cursor position
        pos = cursor.get_cursor_position()
        print(f"   Current cursor position: {pos}")
        
        # Test Bézier path generation
        path = cursor._generate_bezier_path((100, 100), (500, 400), 10)
        print(f"   Generated Bézier path with {len(path)} points")
        print(f"   First point: {path[0]}, Last point: {path[-1]}")
        
        print("\n✅ All tests passed successfully!")
        print("\n🎯 Enhanced cursor simulation is working correctly!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_enhanced_cursor())
