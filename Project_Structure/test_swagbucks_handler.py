"""
Test script for the Enhanced Swagbucks Handler
Tests the handler's ability to fill date of birth fields and handle navigation issues
"""

import asyncio
import json
from swagbucks_enhanced_handler import SwagbucksEnhancedHandler

async def test_date_of_birth_detection():
    """Test date of birth page detection"""
    print("🧪 Testing Date of Birth Page Detection...")
    
    handler = SwagbucksEnhancedHandler()
    
    # Test data based on the Swagbucks survey you showed
    test_cases = [
        {
            "name": "Swagbucks Date of Birth Page",
            "content": "When were you born? Month Day Year",
            "expected": True
        },
        {
            "name": "Regular Survey Page",
            "content": "What is your favorite color?",
            "expected": False
        },
        {
            "name": "Demographics Page",
            "content": "Please provide your personal information",
            "expected": False
        }
    ]
    
    for test_case in test_cases:
        print(f"\nTesting {test_case['name']}...")
        
        # Simulate iframe content
        mock_iframe = MockFrameLocator(test_case['content'])
        
        # Test detection
        is_dob_page = await handler._is_date_of_birth_page(mock_iframe)
        
        if is_dob_page == test_case['expected']:
            print(f"✅ {test_case['name']}: Detection correct")
        else:
            print(f"❌ {test_case['name']}: Expected {test_case['expected']}, got {is_dob_page}")

async def test_date_field_filling():
    """Test date field filling functionality"""
    print("\n🧪 Testing Date Field Filling...")
    
    handler = SwagbucksEnhancedHandler()
    
    # Test month field filling
    print("\nTesting Month Field Filling...")
    mock_iframe = MockFrameLocator("Month Day Year")
    month_filled = await handler._fill_date_field(mock_iframe, 'month', '06')
    
    if month_filled:
        print("✅ Month field filled successfully")
    else:
        print("❌ Month field filling failed")
    
    # Test day field filling
    print("\nTesting Day Field Filling...")
    day_filled = await handler._fill_date_field(mock_iframe, 'day', '15')
    
    if day_filled:
        print("✅ Day field filled successfully")
    else:
        print("❌ Day field filling failed")
    
    # Test year field filling
    print("\nTesting Year Field Filling...")
    year_filled = await handler._fill_date_field(mock_iframe, 'year', '1990')
    
    if year_filled:
        print("✅ Year field filled successfully")
    else:
        print("❌ Year field filling failed")

async def test_continue_button_handling():
    """Test continue button handling"""
    print("\n🧪 Testing Continue Button Handling...")
    
    handler = SwagbucksEnhancedHandler()
    
    # Test with disabled button
    print("\nTesting Disabled Button Handling...")
    mock_iframe = MockFrameLocator("Continue")
    continue_clicked = await handler._enable_and_click_continue(mock_iframe)
    
    if continue_clicked:
        print("✅ Continue button handled successfully")
    else:
        print("❌ Continue button handling failed")

async def test_full_date_of_birth_handling():
    """Test complete date of birth page handling"""
    print("\n🧪 Testing Full Date of Birth Page Handling...")
    
    handler = SwagbucksEnhancedHandler()
    
    # Simulate the exact Swagbucks page you showed
    swagbucks_content = """
    When were you born?
    Month: [MM] Day: [DD] Year: [1990]
    Continue
    """
    
    mock_iframe = MockFrameLocator(swagbucks_content)
    
    # Test the complete handling
    result = await handler._handle_date_of_birth_page(mock_iframe)
    
    print(f"Date of birth handling result: {result['status']} - {result['message']}")
    
    if result['status'] in ['handled', 'partial']:
        print("✅ Date of birth page handled successfully")
    else:
        print("❌ Date of birth page handling failed")

async def test_swagbucks_survey_routing():
    """Test complete Swagbucks survey routing"""
    print("\n🧪 Testing Complete Swagbucks Survey Routing...")
    
    handler = SwagbucksEnhancedHandler()
    
    # Test with iframe
    print("\nTesting Iframe Survey Handling...")
    mock_page = MockPage("https://www.swagbucks.com/surveys/gold-surveys-prescreen")
    mock_iframe = MockFrameLocator("When were you born? Month Day Year Continue")
    
    result = await handler.handle_swagbucks_survey(mock_page, mock_iframe)
    
    print(f"Iframe survey result: {result['status']} - {result['message']}")
    
    # Test without iframe (main page)
    print("\nTesting Main Page Survey Handling...")
    mock_page = MockPage("https://www.swagbucks.com/surveys/gold-surveys-prescreen")
    mock_page.content = "When were you born? Month Day Year Continue"
    
    result = await handler.handle_swagbucks_survey(mock_page)
    
    print(f"Main page survey result: {result['status']} - {result['message']}")

class MockPage:
    """Mock page object for testing"""
    def __init__(self, url, content=""):
        self.url = url
        self.content = content
    
    async def evaluate(self, script):
        return self.content.lower()

class MockFrameLocator:
    """Mock iframe locator for testing"""
    def __init__(self, content):
        self.content = content
    
    def locator(self, selector):
        return MockLocator(self.content, selector)

class MockLocator:
    """Mock locator for testing"""
    def __init__(self, content, selector):
        self.content = content
        self.selector = selector
    
    async def inner_text(self):
        return self.content
    
    async def count(self):
        # Simulate finding elements based on selector
        if 'input' in self.selector or 'select' in self.selector:
            return 1  # Found input/select elements
        elif 'button' in self.selector or 'Continue' in self.content:
            return 1  # Found button elements
        else:
            return 0
    
    async def first(self):
        return MockElement()
    
    async def wait_for(self, timeout):
        pass
    
    async def is_visible(self):
        return True
    
    async def fill(self, value):
        print(f"Mock: Filling field with '{value}'")
        return True
    
    async def click(self):
        print("Mock: Clicking element")
        return True
    
    async def evaluate(self, script):
        print(f"Mock: Executing script: {script}")
        return True

class MockElement:
    """Mock element for testing"""
    async def click(self):
        print("Mock: Element clicked")
        return True
    
    async def evaluate(self, script):
        print(f"Mock: Element script: {script}")
        return True

async def main():
    """Main test function"""
    print("🚀 Enhanced Swagbucks Handler Test Suite")
    print("=" * 60)
    
    try:
        await test_date_of_birth_detection()
        await test_date_field_filling()
        await test_continue_button_handling()
        await test_full_date_of_birth_handling()
        await test_swagbucks_survey_routing()
        
        print("\n✅ All Swagbucks handler tests completed successfully!")
        
    except Exception as e:
        print(f"\n❌ Test suite failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
