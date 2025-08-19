import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        # Use Chromium to match the main Playwright bot
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        print("Navigating to the Qmee login page...")
        await page.goto("https://www.qmee.com/en-us/login")

        print("\n" + "="*50)
        print("ACTION REQUIRED: Please log in to your Qmee account in the browser window.")
        print("After you have successfully logged in and see the main dashboard, come back here and press Enter.")
        print("="*50)
        
        input() # This pauses the script, waiting for you to press Enter.

        # Save storage state to the exact path expected by the main bot
        project_root = Path(__file__).resolve().parents[2]
        target_path = project_root / "Main_Files_to_Run" / "auth.json"
        await context.storage_state(path=str(target_path))
        
        print(f"\nAuthentication state has been saved to: {target_path}")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

    # (Removed invalid dictionary block)


# This script is used to save the authentication state of a Qmee account.# It uses Playwright to open a browser, navigate to the Qmee login page,
# and waits for the user to log in manually. After logging in, it saves the
# authentication state to a file named "auth.json" for later use in the bot.
# This allows the bot to use the saved authentication state to access the Qmee
# account without needing to log in again, making it easier to automate tasks.
# Make sure to run this script before running the main bot script to ensure
# that the authentication state is saved correctly.
# Note: The saved authentication state is sensitive information, so handle it securely.
# Make sure to keep the auth.json file private and do not share it publicly.
# You can run this script by executing `python save_auth.py` in your terminal.