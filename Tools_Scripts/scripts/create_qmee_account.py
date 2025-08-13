#!/usr/bin/env python3
"""
Qmee Account Creation Script with V2Ray Proxy Bypass
Bypasses ISP-based account creation restrictions
"""

import os
import json
import time
import random
import string
from typing import Optional, Dict, Any
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import undetected_chromedriver as uc

# Import V2Ray proxy manager
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent))
from proxy_management.proxy_manager_v2ray import V2RayProxyManager, ProxyConfig

class QmeeAccountCreator:
    """Creates new Qmee accounts using V2Ray proxies to bypass ISP restrictions"""
    
    def __init__(self):
        self.v2ray_manager = V2RayProxyManager(v2ray_path="./v2ray/v2ray")
        self.driver = None
        self.current_proxy = None
        
    def setup_v2ray_proxy(self) -> bool:
        """Setup V2Ray proxy for account creation"""
        try:
            # Load proxy configurations
            config_files = [
                "configs/v2ray_proxies.json",
                "v2ray_proxies.json",
                "configs/sample_v2ray_proxies.json"
            ]
            
            config_loaded = False
            for config_file in config_files:
                if os.path.exists(config_file) and self.v2ray_manager.load_configs_from_file(config_file):
                    config_loaded = True
                    print(f"Loaded V2Ray configs from {config_file}")
                    break
            
            if not config_loaded:
                print("No V2Ray configurations found. Creating sample configs...")
                from proxy_management.proxy_manager_v2ray import create_sample_proxies
                create_sample_proxies()
                self.v2ray_manager.load_configs_from_file("sample_v2ray_proxies.json")
            
            # Get best proxy
            best_proxy = self.v2ray_manager.get_best_proxy()
            if not best_proxy:
                print("No working V2Ray proxies available!")
                return False
            
            # Start V2Ray proxy
            if self.v2ray_manager.start_proxy(best_proxy, 1080):
                self.current_proxy = best_proxy
                print(f"Using V2Ray proxy: {best_proxy.name}")
                return True
            else:
                print("Failed to start V2Ray proxy")
                return False
                
        except Exception as e:
            print(f"Error setting up V2Ray proxy: {e}")
            return False
    
    def create_undetected_browser(self) -> bool:
        """Create undetected Chrome browser with proxy"""
        try:
            options = uc.ChromeOptions()
            
            # Add proxy configuration
            if self.current_proxy:
                options.add_argument('--proxy-server=socks5://127.0.0.1:1080')
                print("Configured browser to use V2Ray proxy")
            
            # Stealth options
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-blink-features=AutomationControlled')
            options.add_experimental_option("excludeSwitches", ["enable-automation"])
            options.add_experimental_option('useAutomationExtension', False)
            
            # Random window size
            width = random.randint(1200, 1600)
            height = random.randint(800, 1000)
            options.add_argument(f'--window-size={width},{height}')
            
            # Random user agent
            user_agents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            ]
            options.add_argument(f'--user-agent={random.choice(user_agents)}')
            
            # Create undetected driver
            self.driver = uc.Chrome(options=options)
            
            # Remove webdriver properties
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            print("Undetected browser created successfully")
            return True
            
        except Exception as e:
            print(f"Error creating browser: {e}")
            return False
    
    def generate_random_persona(self) -> Dict[str, Any]:
        """Generate random persona for account creation"""
        first_names = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley", "Quinn", "Avery", "Blake", "Cameron"]
        last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
        
        # Generate random email
        username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
        domain = random.choice(["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"])
        email = f"{username}@{domain}"
        
        # Generate random password
        password = ''.join(random.choices(string.ascii_letters + string.digits + "!@#$%^&*", k=12))
        
        return {
            "first_name": random.choice(first_names),
            "last_name": random.choice(last_names),
            "email": email,
            "password": password,
            "date_of_birth": f"{random.randint(1980, 2000)}-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}",
            "gender": random.choice(["Male", "Female", "Other"]),
            "country": "United States",
            "state": random.choice(["California", "Texas", "Florida", "New York", "Illinois"]),
            "city": random.choice(["Los Angeles", "Houston", "Miami", "New York", "Chicago"])
        }
    
    def create_qmee_account(self, persona: Dict[str, Any]) -> bool:
        """Create new Qmee account with given persona"""
        try:
            print(f"Creating Qmee account for: {persona['first_name']} {persona['last_name']}")
            print(f"Email: {persona['email']}")
            
            # Navigate to Qmee signup page
            self.driver.get("https://www.qmee.com/signup")
            time.sleep(random.uniform(2, 4))
            
            # Fill in registration form
            wait = WebDriverWait(self.driver, 20)
            
            # First Name
            first_name_field = wait.until(EC.presence_of_element_located((By.NAME, "firstName")))
            self.human_type(first_name_field, persona['first_name'])
            
            # Last Name
            last_name_field = self.driver.find_element(By.NAME, "lastName")
            self.human_type(last_name_field, persona['last_name'])
            
            # Email
            email_field = self.driver.find_element(By.NAME, "email")
            self.human_type(email_field, persona['email'])
            
            # Password
            password_field = self.driver.find_element(By.NAME, "password")
            self.human_type(password_field, persona['password'])
            
            # Confirm Password
            confirm_password_field = self.driver.find_element(By.NAME, "confirmPassword")
            self.human_type(confirm_password_field, persona['password'])
            
            # Date of Birth
            dob_field = self.driver.find_element(By.NAME, "dateOfBirth")
            self.human_type(dob_field, persona['date_of_birth'])
            
            # Gender
            gender_field = self.driver.find_element(By.NAME, "gender")
            gender_field.click()
            gender_option = self.driver.find_element(By.XPATH, f"//option[text()='{persona['gender']}']")
            gender_option.click()
            
            # Country
            country_field = self.driver.find_element(By.NAME, "country")
            country_field.click()
            country_option = self.driver.find_element(By.XPATH, f"//option[text()='{persona['country']}']")
            country_option.click()
            
            # State
            state_field = self.driver.find_element(By.NAME, "state")
            state_field.click()
            state_option = self.driver.find_element(By.XPATH, f"//option[text()='{persona['state']}']")
            state_option.click()
            
            # City
            city_field = self.driver.find_element(By.NAME, "city")
            self.human_type(city_field, persona['city'])
            
            # Accept terms
            terms_checkbox = self.driver.find_element(By.NAME, "acceptTerms")
            if not terms_checkbox.is_selected():
                terms_checkbox.click()
            
            # Submit form
            submit_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
            submit_button.click()
            
            # Wait for account creation
            time.sleep(5)
            
            # Check if account was created successfully
            if "dashboard" in self.driver.current_url or "welcome" in self.driver.current_url:
                print("✅ Account created successfully!")
                
                # Save account details
                self.save_account_details(persona)
                return True
            else:
                print("❌ Account creation failed")
                return False
                
        except Exception as e:
            print(f"Error creating account: {e}")
            return False
    
    def human_type(self, element, text: str):
        """Type text with human-like delays"""
        element.clear()
        for char in text:
            element.send_keys(char)
            time.sleep(random.uniform(0.05, 0.15))
    
    def save_account_details(self, persona: Dict[str, Any]):
        """Save account details to file"""
        try:
            accounts_file = "created_accounts.json"
            accounts = []
            
            if os.path.exists(accounts_file):
                with open(accounts_file, 'r') as f:
                    accounts = json.load(f)
            
            account_info = {
                "created_at": time.strftime("%Y-%m-%d %H:%M:%S"),
                "proxy_used": self.current_proxy.name if self.current_proxy else "None",
                "persona": persona
            }
            
            accounts.append(account_info)
            
            with open(accounts_file, 'w') as f:
                json.dump(accounts, f, indent=2)
            
            print(f"Account details saved to {accounts_file}")
            
        except Exception as e:
            print(f"Error saving account details: {e}")
    
    def rotate_proxy(self) -> bool:
        """Rotate to next V2Ray proxy"""
        try:
            # Stop current proxy
            self.v2ray_manager.stop_proxy()
            
            # Get next proxy
            next_proxy = self.v2ray_manager.rotate_proxy()
            if not next_proxy:
                print("No more proxies available for rotation")
                return False
            
            # Start new proxy
            if self.v2ray_manager.start_proxy(next_proxy, 1080):
                self.current_proxy = next_proxy
                print(f"Rotated to V2Ray proxy: {next_proxy.name}")
                
                # Restart browser with new proxy
                if self.driver:
                    self.driver.quit()
                time.sleep(2)
                return self.create_undetected_browser()
            else:
                print(f"Failed to start proxy: {next_proxy.name}")
                return False
                
        except Exception as e:
            print(f"Error rotating proxy: {e}")
            return False
    
    def cleanup(self):
        """Cleanup resources"""
        if self.driver:
            self.driver.quit()
        if self.v2ray_manager:
            self.v2ray_manager.stop_proxy()
    
    def run(self, num_accounts: int = 1):
        """Run account creation process"""
        print("🚀 Starting Qmee Account Creation with V2Ray Proxy Bypass")
        print("=" * 60)
        
        try:
            # Setup V2Ray proxy
            if not self.setup_v2ray_proxy():
                print("Failed to setup V2Ray proxy")
                return
            
            # Create browser
            if not self.create_undetected_browser():
                print("Failed to create browser")
                return
            
            # Create accounts
            for i in range(num_accounts):
                print(f"\n📝 Creating account {i+1}/{num_accounts}")
                
                # Generate random persona
                persona = self.generate_random_persona()
                
                # Try to create account
                success = self.create_qmee_account(persona)
                
                if not success:
                    print("Attempting proxy rotation...")
                    if self.rotate_proxy():
                        # Retry with new proxy
                        success = self.create_qmee_account(persona)
                    
                    if not success:
                        print(f"Failed to create account {i+1}")
                        continue
                
                print(f"✅ Account {i+1} created successfully!")
                
                # Wait between accounts
                if i < num_accounts - 1:
                    delay = random.uniform(30, 60)
                    print(f"Waiting {delay:.1f} seconds before next account...")
                    time.sleep(delay)
            
            print(f"\n🎉 Successfully created {num_accounts} accounts!")
            
        except Exception as e:
            print(f"Error during account creation: {e}")
        finally:
            self.cleanup()

def main():
    """Main function"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Create Qmee accounts with V2Ray proxy bypass")
    parser.add_argument("--accounts", "-a", type=int, default=1, help="Number of accounts to create")
    parser.add_argument("--proxy-rotation", "-r", action="store_true", help="Enable automatic proxy rotation")
    
    args = parser.parse_args()
    
    creator = QmeeAccountCreator()
    creator.run(args.accounts)

if __name__ == "__main__":
    main()
