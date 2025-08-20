"""
Test script for the Enhanced Survey Router
Tests the router's ability to detect different survey platforms and handle various scenarios
"""

import asyncio
import json
from enhanced_survey_router import EnhancedSurveyRouter

async def test_platform_detection():
    """Test platform detection capabilities"""
    print("🧪 Testing Platform Detection...")
    
    router = EnhancedSurveyRouter()
    
    # Test data based on discovered patterns
    test_cases = [
        {
            "name": "Ipsos Interactive",
            "url": "https://enter.ipsosinteractive.com/survey",
            "content": "ipsos market research company share your opinions accept and take the survey",
            "expected": "ipsos"
        },
        {
            "name": "CMIX",
            "url": "https://survey.cmix.com/survey",
            "content": "cmix criticalmix materialize jquery-ui cm-survey-navigation",
            "expected": "cmix"
        },
        {
            "name": "LifePoints Panel",
            "url": "https://surveys.lifepointspanel.com/survey",
            "content": "lifepointspanel respview selfserve jquery-ui font-awesome",
            "expected": "lifepointspanel"
        },
        {
            "name": "Samplicio",
            "url": "https://samplicio.us/survey",
            "content": "samplicio survey platform",
            "expected": "samplicio"
        },
        {
            "name": "Qualtrics",
            "url": "https://qualtrics.com/survey",
            "content": "Qualtrics survey platform",
            "expected": "qualtrics"
        },
        {
            "name": "Swagbucks",
            "url": "https://swagbucks.com/surveys",
            "content": "swagbucks gold surveys prescreen",
            "expected": "swagbucks"
        }
    ]
    
    for test_case in test_cases:
        print(f"\nTesting {test_case['name']}...")
        
        # Simulate page content
        mock_page = MockPage(test_case['url'], test_case['content'])
        
        # Test platform detection
        detected_platform = await router.detect_survey_platform(mock_page)
        
        if detected_platform == test_case['expected']:
            print(f"✅ {test_case['name']}: Platform correctly detected as {detected_platform}")
        else:
            print(f"❌ {test_case['name']}: Expected {test_case['expected']}, got {detected_platform}")

async def test_router_patterns():
    """Test router pattern detection"""
    print("\n🧪 Testing Router Pattern Detection...")
    
    router = EnhancedSurveyRouter()
    
    # Test disqualification patterns
    print("\nTesting Disqualification Detection...")
    disqualification_content = "dang it! you've been declined by the survey provider this could be due to one of these reasons: speeding through the survey not paying attention"
    
    mock_page = MockPage("https://example.com", disqualification_content)
    is_disqualified = await router.detect_survey_disqualification(mock_page)
    
    if is_disqualified:
        print("✅ Disqualification correctly detected")
    else:
        print("❌ Disqualification not detected")
    
    # Test completion patterns
    print("\nTesting Completion Detection...")
    completion_content = "you have completed the survey thank you for your participation survey complete!"
    
    mock_page = MockPage("https://example.com", completion_content)
    is_completed = await router.detect_survey_completion(mock_page)
    
    if is_completed:
        print("✅ Completion correctly detected")
    else:
        print("❌ Completion not detected")

async def test_handling_strategies():
    """Test platform-specific handling strategies"""
    print("\n🧪 Testing Handling Strategies...")
    
    router = EnhancedSurveyRouter()
    
    # Test Ipsos handling
    print("\nTesting Ipsos Handling...")
    ipsos_content = "ipsos market research company accept and take the survey"
    mock_page = MockPage("https://enter.ipsosinteractive.com", ipsos_content)
    
    # Simulate iframe locator
    mock_iframe = MockFrameLocator(ipsos_content)
    
    result = await router.route_survey(mock_page, mock_iframe)
    print(f"Ipsos routing result: {result['status']} - {result['message']}")
    
    # Test CMIX handling
    print("\nTesting CMIX Handling...")
    cmix_content = "cmix criticalmix materialize cm-survey-navigation"
    mock_page = MockPage("https://survey.cmix.com", cmix_content)
    mock_iframe = MockFrameLocator(cmix_content)
    
    result = await router.route_survey(mock_page, mock_iframe)
    print(f"CMIX routing result: {result['status']} - {result['message']}")

class MockPage:
    """Mock page object for testing"""
    def __init__(self, url, content):
        self.url = url
        self.content = content
    
    async def evaluate(self, script):
        return self.content.lower()

class MockFrameLocator:
    """Mock iframe locator for testing"""
    def __init__(self, content):
        self.content = content
    
    def locator(self, selector):
        return MockLocator(self.content)

class MockLocator:
    """Mock locator for testing"""
    def __init__(self, content):
        self.content = content
    
    async def inner_text(self):
        return self.content
    
    async def count(self):
        return 1 if self.content else 0
    
    async def first(self):
        return MockElement()
    
    async def wait_for(self, timeout):
        pass

class MockElement:
    """Mock element for testing"""
    async def click(self):
        pass

async def main():
    """Main test function"""
    print("🚀 Enhanced Survey Router Test Suite")
    print("=" * 50)
    
    try:
        await test_platform_detection()
        await test_router_patterns()
        await test_handling_strategies()
        
        print("\n✅ All tests completed successfully!")
        
    except Exception as e:
        print(f"\n❌ Test suite failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
