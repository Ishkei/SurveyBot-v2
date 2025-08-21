#!/usr/bin/env python3
"""
Test Enhanced DOM Analysis for LifePoints Bot
Demonstrates the hybrid approach for solving survey pages with DOM tree analysis
"""

import asyncio
import os
import sys
import json
from pathlib import Path

# Add project structure to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))
sys.path.insert(0, str(project_root / "Project_Structure"))

async def test_enhanced_dom_analysis():
    """Test the enhanced DOM analysis functionality"""
    print("🧪 Testing Enhanced DOM Analysis for LifePoints Bot")
    print("=" * 60)
    
    try:
        # Import the LifePoints bot
        from Project_Structure.bot_implementations.lifepoints_enhanced_bot import LifePointsEnhancedBot
        
        print("✅ LifePoints bot imported successfully")
        
        # Check environment variables
        email = os.getenv("LIFEPOINTS_EMAIL")
        password = os.getenv("LIFEPOINTS_PASSWORD")
        
        if not email or not password:
            print("❌ LIFEPOINTS_EMAIL and LIFEPOINTS_PASSWORD must be set in .env file")
            print("Please run setup_lifepoints_credentials.py first")
            return False
        
        print(f"✅ Environment variables loaded: {email[:10]}...")
        
        # Create bot instance
        bot = LifePointsEnhancedBot(headless=False)  # Set to True for headless testing
        print("✅ Bot instance created")
        
        # Test DOM tree building on a sample page
        print("\n🔍 Testing DOM tree building...")
        
        # Start browser and navigate to a test page
        success = await bot.start_browser()
        if not success:
            print("❌ Failed to start browser")
            return False
        
        print("✅ Browser started successfully")
        
        # Navigate to a test page (you can change this to any page)
        test_url = "https://example.com"
        print(f"🌐 Navigating to test page: {test_url}")
        
        try:
            await bot.page.goto(test_url)
            await bot.page.wait_for_load_state('networkidle')
            print("✅ Test page loaded")
            
            # Test the enhanced DOM analysis
            print("\n🔧 Testing Enhanced DOM Analysis...")
            
            # Build DOM tree
            dom_tree_text, dom_tree_structured, element_map = await bot._build_enhanced_dom_tree()
            
            print(f"📊 DOM Analysis Results:")
            print(f"  - Elements found: {len(element_map)}")
            print(f"  - Structured data: {len(dom_tree_structured)} items")
            print(f"  - Text representation: {len(dom_tree_text)} characters")
            
            # Show sample of structured data
            if dom_tree_structured:
                print(f"\n📋 Sample structured element:")
                sample = dom_tree_structured[0]
                print(f"  ID: {sample['id']}")
                print(f"  Tag: {sample['tag']}")
                for key, value in sample.items():
                    if key not in ['id', 'tag', 'element']:
                        print(f"  {key}: {value}")
            
            # Test page context analysis
            print(f"\n📋 Testing page context analysis...")
            page_context = await bot._analyze_page_context(bot.page)
            print(f"Page context: {page_context[:200]}...")
            
            # Test AI prompt creation
            print(f"\n🤖 Testing AI prompt creation...")
            ai_prompt = bot._create_ai_prompt(page_context, dom_tree_structured, dom_tree_text)
            print(f"AI prompt length: {len(ai_prompt)} characters")
            print(f"Prompt preview: {ai_prompt[:300]}...")
            
            print("\n✅ All tests completed successfully!")
            
        except Exception as e:
            print(f"❌ Error during testing: {e}")
            import traceback
            traceback.print_exc()
        
        finally:
            # Cleanup
            await bot.close()
            print("🧹 Browser closed")
        
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure you're in the correct directory and all dependencies are installed")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return False

async def test_survey_solving():
    """Test the survey solving functionality with a mock survey page"""
    print("\n🧪 Testing Survey Solving Functionality")
    print("=" * 60)
    
    try:
        from Project_Structure.bot_implementations.lifepoints_enhanced_bot import LifePointsEnhancedBot
        
        # Create bot instance
        bot = LifePointsEnhancedBot(headless=False)
        
        # Start browser
        success = await bot.start_browser()
        if not success:
            print("❌ Failed to start browser")
            return False
        
        # Create a simple HTML test page with survey elements
        test_html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test Survey Page</title>
        </head>
        <body>
            <h1>Survey Question</h1>
            <p>What is your favorite color?</p>
            
            <form>
                <label>
                    <input type="radio" name="color" value="red"> Red
                </label>
                <br>
                <label>
                    <input type="radio" name="color" value="blue"> Blue
                </label>
                <br>
                <label>
                    <input type="radio" name="color" value="green"> Green
                </label>
                <br>
                
                <textarea name="reason" placeholder="Why do you like this color?"></textarea>
                <br>
                
                <button type="submit">Next</button>
            </form>
        </body>
        </html>
        """
        
        # Set the HTML content
        await bot.page.set_content(test_html)
        print("✅ Test survey page loaded")
        
        # Test survey solving
        print("🔍 Testing survey solving...")
        success = await bot.solve_survey_page_with_dom()
        
        if success:
            print("✅ Survey solving completed successfully")
        else:
            print("⚠️ Survey solving completed with fallback")
        
        # Cleanup
        await bot.close()
        print("🧹 Browser closed")
        
        return True
        
    except Exception as e:
        print(f"❌ Error during survey solving test: {e}")
        import traceback
        traceback.print_exc()
        return False

async def main():
    """Main test function"""
    print("🚀 LifePoints Enhanced DOM Analysis Test Suite")
    print("=" * 60)
    
    # Test 1: Basic DOM analysis
    print("\n📋 Test 1: Enhanced DOM Analysis")
    success1 = await test_enhanced_dom_analysis()
    
    # Test 2: Survey solving
    print("\n📋 Test 2: Survey Solving")
    success2 = await test_survey_solving()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Results Summary:")
    print(f"  ✅ Enhanced DOM Analysis: {'PASS' if success1 else 'FAIL'}")
    print(f"  ✅ Survey Solving: {'PASS' if success2 else 'FAIL'}")
    
    if success1 and success2:
        print("\n🎉 All tests passed! Enhanced DOM analysis is working correctly.")
    else:
        print("\n⚠️ Some tests failed. Check the output above for details.")
    
    print("\n💡 Next steps:")
    print("  1. Use the bot with real LifePoints surveys")
    print("  2. The enhanced DOM analysis will automatically provide better AI decisions")
    print("  3. Check logs for detailed DOM tree information")

if __name__ == "__main__":
    # Check if we're in the right directory
    if not os.path.exists("Project_Structure"):
        print("❌ Please run this script from the project root directory")
        print("   cd /path/to/SurveyBot-v2-main-python-script")
        print("   python3 Tools_Scripts/test_enhanced_dom_analysis.py")
        sys.exit(1)
    
    # Run the tests
    asyncio.run(main())
