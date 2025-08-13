#!/usr/bin/env python3
"""
Script to help complete Qmee signup process
"""

import asyncio
from playwright.async_api import async_playwright

async def complete_signup():
    """Complete Qmee signup process"""
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        print("="*50)
        print("Qmee Signup Completion")
        print("="*50)
        
        print("\nNavigating to Qmee...")
        await page.goto("https://www.qmee.com/en-us/login")
        
        print("\nLooking for 'Start Earning' button...")
        
        # Wait for page to load
        await page.wait_for_load_state("networkidle")
        
        # Look for start earning button
        try:
            start_button = await page.wait_for_selector("button:has-text('Start Earning'), button:has-text('start earning')", timeout=5000)
            if start_button:
                print("Found 'Start Earning' button! Clicking it...")
                await start_button.click()
                
                print("\n" + "="*50)
                print("SIGNUP PROCESS:")
                print("Please complete the signup process in the browser window.")
                print("Fill in all required fields and complete the registration.")
                print("After you see the dashboard or surveys page, come back here and press Enter.")
                print("="*50)
                
                input() # Wait for user to complete signup
                
                print("\nSignup completed! Saving authentication state...")
                await context.storage_state(path="auth.json")
                print("Authentication state saved to auth.json")
                
        except Exception as e:
            print(f"No 'Start Earning' button found: {e}")
            print("You may already be signed up or on a different page.")
            print("Please complete any required signup process manually.")
            input("Press Enter when signup is complete...")
            
            # Save auth state anyway
            await context.storage_state(path="auth.json")
            print("Authentication state saved to auth.json")
        
        await browser.close()
        print("\nSignup process completed! You can now run the bot.")

if __name__ == "__main__":
    asyncio.run(complete_signup())
