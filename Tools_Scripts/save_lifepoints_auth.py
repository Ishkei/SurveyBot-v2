#!/usr/bin/env python3
"""
Save LifePoints authentication state for automated login
This script opens a browser, navigates to LifePoints login page,
and saves the authentication state after manual login.
"""

import asyncio
import os
import sys
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    """Main function to save LifePoints authentication state"""
    print("🔐 LifePoints Authentication State Saver")
    print("=" * 50)
    
    try:
        async with async_playwright() as p:
            # Launch browser in visible mode for manual login
            browser = await p.chromium.launch(
                headless=False,
                args=[
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-blink-features=AutomationControlled'
                ]
            )
            
            # Create new context with realistic user agent
            context = await browser.new_context(
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                viewport={'width': 1920, 'height': 1080}
            )
            
            page = await context.new_page()
            
            print("🌐 Navigating to LifePoints login page...")
            await page.goto("https://app.lifepointspanel.com/en-US/login")
            
            # Wait for page to load
            await page.wait_for_load_state('networkidle')
            
            print("\n" + "="*60)
            print("🔑 ACTION REQUIRED: Please log in to your LifePoints account")
            print("="*60)
            print("1. Enter your email and password in the browser window")
            print("2. Complete any verification steps if required")
            print("3. Wait until you see the main dashboard")
            print("4. Come back here and press Enter to save the session")
            print("="*60)
            
            # Wait for user to complete login
            input("Press Enter after you have successfully logged in...")
            
            # Verify login was successful by checking for dashboard elements
            try:
                # Wait a bit for the page to fully load after login
                await asyncio.sleep(2)
                
                # Check if we're on the dashboard or surveys page
                current_url = page.url
                if 'dashboard' in current_url or 'surveys' in current_url:
                    print("✅ Login appears successful - on dashboard/surveys page")
                else:
                    print("⚠️ Warning: May not be fully logged in. Current URL:", current_url)
                    print("   Please ensure you're on the main dashboard before continuing")
                    input("Press Enter if you're sure you're logged in...")
                
                # Try to find dashboard elements to confirm login
                try:
                    # Look for common dashboard elements
                    dashboard_selectors = [
                        'text=LIFEPOINTS',
                        'text=Dashboard',
                        'text=Surveys',
                        '.points-display',
                        '.survey-card'
                    ]
                    
                    dashboard_found = False
                    for selector in dashboard_selectors:
                        try:
                            element = page.locator(selector)
                            if await element.is_visible(timeout=2000):
                                dashboard_found = True
                                print(f"✅ Found dashboard element: {selector}")
                                break
                        except:
                            continue
                    
                    if not dashboard_found:
                        print("⚠️ Warning: Could not find typical dashboard elements")
                        print("   Please ensure you're fully logged in before continuing")
                        input("Press Enter if you're sure you're logged in...")
                
                except Exception as e:
                    print(f"⚠️ Could not verify dashboard elements: {e}")
                    print("   Continuing anyway - please ensure you're logged in")
                
            except Exception as e:
                print(f"⚠️ Error verifying login status: {e}")
                print("   Continuing anyway - please ensure you're logged in")
            
            # Save the authentication state
            print("\n💾 Saving authentication state...")
            
            # Determine the target path for auth.json
            project_root = Path(__file__).resolve().parents[2]
            target_path = project_root / "Main_Files_to_Run" / "auth.json"
            
            # Ensure the directory exists
            target_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save the storage state
            await context.storage_state(path=str(target_path))
            
            print(f"✅ Authentication state saved to: {target_path}")
            print(f"📁 File size: {target_path.stat().st_size} bytes")
            
            # Verify the file was created
            if target_path.exists():
                print("🔍 Verifying saved authentication state...")
                
                # Try to read the file to ensure it's valid JSON
                try:
                    import json
                    with open(target_path, 'r') as f:
                        auth_data = json.load(f)
                    
                    # Check for expected keys
                    if 'cookies' in auth_data and 'origins' in auth_data:
                        print("✅ Authentication state appears valid")
                        print(f"   Cookies: {len(auth_data.get('cookies', []))}")
                        print(f"   Origins: {len(auth_data.get('origins', []))}")
                    else:
                        print("⚠️ Authentication state may be incomplete")
                        print(f"   Keys found: {list(auth_data.keys())}")
                
                except Exception as e:
                    print(f"⚠️ Warning: Could not verify authentication state: {e}")
                    print("   File was created but may not be valid")
            
            # Close browser
            await browser.close()
            
            print("\n" + "="*60)
            print("🎉 LifePoints authentication state saved successfully!")
            print("="*60)
            print("You can now run the LifePoints bot with:")
            print("   python3 Main_Files_to_Run/run_bot.py --platform lifepoints")
            print("\nThe bot will use the saved session and won't require login again.")
            print("="*60)
            
    except Exception as e:
        print(f"❌ Error saving authentication state: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

def check_dependencies():
    """Check if required dependencies are available"""
    try:
        import playwright
        print("✅ Playwright is available")
        return True
    except ImportError:
        print("❌ Playwright is not installed")
        print("\n📦 Installation Instructions:")
        print("1. Activate your virtual environment:")
        print("   source venv/bin/activate")
        print("\n2. Install Playwright:")
        print("   pip install playwright")
        print("\n3. Install Playwright browsers:")
        print("   playwright install")
        print("\n4. Alternative: Install from requirements file:")
        print("   pip install -r Configurations/requirements_enhanced.txt")
        print("\n5. Or use the lightweight requirements:")
        print("   pip install -r Configurations/requirements_lightweight.txt")
        return False

if __name__ == "__main__":
    print("🔐 LifePoints Authentication State Saver")
    print("=" * 50)
    
    # Check if virtual environment is activated
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️ Virtual environment may not be activated")
        print("   Consider running: source venv/bin/activate")
        print()
    
    # Check dependencies
    if not check_dependencies():
        print("\n💡 Quick Fix:")
        print("   cd ~/SurveyBot-v2-main-python-script")
        print("   source venv/bin/activate")
        print("   pip install playwright")
        print("   playwright install")
        print("   python3 Tools_Scripts/save_lifepoints_auth.py")
        sys.exit(1)
    
    # Run the main function
    success = asyncio.run(main())
    
    if success:
        print("\n✅ Script completed successfully!")
    else:
        print("\n❌ Script failed!")
        sys.exit(1)
