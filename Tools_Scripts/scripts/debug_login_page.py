#!/usr/bin/env python3
"""
Debug script to inspect Qmee login page structure
"""

import asyncio
from playwright.async_api import async_playwright
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

async def debug_playwright():
    """Debug login page with Playwright"""
    print("🔍 Debugging with Playwright...")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        
        # Navigate to login page
        await page.goto("https://www.qmee.com/en-us/login")
        await page.wait_for_load_state('networkidle')
        
        # Handle cookie popup
        try:
            accept_button = await page.wait_for_selector("button:has-text('Accept All')", timeout=5000)
            if accept_button:
                await accept_button.click()
                print("✅ Accepted cookies")
                await page.wait_for_timeout(2000)
        except:
            print("⚠️  No cookie popup found")
        
        # Take screenshot
        await page.screenshot(path="login_page_playwright.png")
        print("📸 Screenshot saved as login_page_playwright.png")
        
        # Get page content
        content = await page.content()
        with open("login_page_playwright.html", "w") as f:
            f.write(content)
        print("📄 HTML saved as login_page_playwright.html")
        
        # Look for input fields
        inputs = await page.query_selector_all("input")
        print(f"🔍 Found {len(inputs)} input fields:")
        
        for i, inp in enumerate(inputs):
            input_type = await inp.get_attribute("type")
            input_name = await inp.get_attribute("name")
            input_id = await inp.get_attribute("id")
            input_placeholder = await inp.get_attribute("placeholder")
            print(f"  Input {i+1}: type={input_type}, name={input_name}, id={input_id}, placeholder={input_placeholder}")
        
        # Look for buttons
        buttons = await page.query_selector_all("button")
        print(f"🔍 Found {len(buttons)} buttons:")
        
        for i, btn in enumerate(buttons):
            button_text = await btn.text_content()
            button_type = await btn.get_attribute("type")
            print(f"  Button {i+1}: text='{button_text}', type={button_type}")
        
        await browser.close()

def debug_selenium():
    """Debug login page with Selenium"""
    print("🔍 Debugging with Selenium...")
    
    options = uc.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    driver = uc.Chrome(options=options)
    wait = WebDriverWait(driver, 10)
    
    try:
        # Navigate to login page
        driver.get("https://www.qmee.com/en-us/login")
        
        # Handle cookie popup
        try:
            cookie_buttons = wait.until(EC.presence_of_all_elements_located((By.XPATH, "//button[contains(text(), 'Accept All') or contains(text(), 'Accept')]")))
            if cookie_buttons:
                cookie_buttons[0].click()
                print("✅ Accepted cookies")
        except:
            print("⚠️  No cookie popup found")
        
        # Take screenshot
        driver.save_screenshot("login_page_selenium.png")
        print("📸 Screenshot saved as login_page_selenium.png")
        
        # Get page source
        with open("login_page_selenium.html", "w") as f:
            f.write(driver.page_source)
        print("📄 HTML saved as login_page_selenium.html")
        
        # Look for input fields
        inputs = driver.find_elements(By.TAG_NAME, "input")
        print(f"🔍 Found {len(inputs)} input fields:")
        
        for i, inp in enumerate(inputs):
            input_type = inp.get_attribute("type")
            input_name = inp.get_attribute("name")
            input_id = inp.get_attribute("id")
            input_placeholder = inp.get_attribute("placeholder")
            print(f"  Input {i+1}: type={input_type}, name={input_name}, id={input_id}, placeholder={input_placeholder}")
        
        # Look for buttons
        buttons = driver.find_elements(By.TAG_NAME, "button")
        print(f"🔍 Found {len(buttons)} buttons:")
        
        for i, btn in enumerate(buttons):
            button_text = btn.text
            button_type = btn.get_attribute("type")
            print(f"  Button {i+1}: text='{button_text}', type={button_type}")
        
    finally:
        driver.quit()

async def main():
    """Main debug function"""
    print("🚀 Starting login page debug...")
    
    # Debug with both methods
    await debug_playwright()
    debug_selenium()
    
    print("✅ Debug complete! Check the screenshots and HTML files.")

if __name__ == "__main__":
    asyncio.run(main())
