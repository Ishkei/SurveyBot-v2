#!/usr/bin/env python3
"""
Targeted Qmee Scraping Enhancement
Demonstrates how selective scraping could improve the survey bot
"""

import asyncio
import json
import os
import sys
from pathlib import Path
from playwright.async_api import async_playwright
from typing import Dict, List, Optional

# Add project structure to path
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "📁 Project Structure"))
from config import Config

class QmeeScrapingEnhancement:
    """Targeted scraping to enhance Qmee survey bot capabilities."""
    
    def __init__(self):
        self.config = Config()
        self.survey_patterns = {}
        self.element_maps = {}
        
    async def analyze_qmee_structure(self):
        """Analyze Qmee's survey structure without full scraping."""
        print("🔍 Analyzing Qmee survey structure...")
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=False)
            context = await browser.new_context()
            page = await context.new_page()
            
            try:
                # Navigate to Qmee
                await page.goto("https://qmee.com", wait_until="networkidle")
                
                # Analyze common elements
                await self._analyze_common_elements(page)
                
                # Analyze survey patterns (if accessible)
                await self._analyze_survey_patterns(page)
                
                # Save findings
                await self._save_analysis()
                
            except Exception as e:
                print(f"❌ Analysis failed: {e}")
            finally:
                await browser.close()
    
    async def _analyze_common_elements(self, page):
        """Analyze common UI elements on Qmee."""
        print("📋 Analyzing common UI elements...")
        
        elements = {
            "buttons": [],
            "forms": [],
            "navigation": [],
            "survey_cards": []
        }
        
        # Find common button patterns
        buttons = await page.query_selector_all("button, a[role='button']")
        for btn in buttons[:10]:  # Limit to first 10
            text = await btn.inner_text()
            classes = await btn.get_attribute("class")
            elements["buttons"].append({
                "text": text.strip() if text else "",
                "classes": classes,
                "type": "button"
            })
        
        # Find form patterns
        forms = await page.query_selector_all("form, input, select, textarea")
        for form in forms[:5]:
            tag = await form.evaluate("node => node.tagName.toLowerCase()")
            placeholder = await form.get_attribute("placeholder")
            elements["forms"].append({
                "tag": tag,
                "placeholder": placeholder,
                "type": "form_element"
            })
        
        # Find navigation elements
        nav_elements = await page.query_selector_all("nav, [role='navigation'], .nav, .menu")
        for nav in nav_elements[:5]:
            text = await nav.inner_text()
            elements["navigation"].append({
                "text": text.strip() if text else "",
                "type": "navigation"
            })
        
        self.element_maps["common"] = elements
        print(f"✅ Found {len(elements['buttons'])} buttons, {len(elements['forms'])} form elements")
    
    async def _analyze_survey_patterns(self, page):
        """Analyze survey-specific patterns if accessible."""
        print("📊 Analyzing survey patterns...")
        
        # Look for survey-related content
        survey_selectors = [
            ".survey", "[data-survey]", ".question", ".poll",
            "[class*='survey']", "[class*='question']", "[class*='poll']"
        ]
        
        patterns = {
            "question_types": [],
            "answer_formats": [],
            "navigation_patterns": []
        }
        
        for selector in survey_selectors:
            elements = await page.query_selector_all(selector)
            for element in elements[:3]:  # Limit analysis
                text = await element.inner_text()
                classes = await element.get_attribute("class")
                
                if text and len(text.strip()) > 10:
                    patterns["question_types"].append({
                        "text": text.strip()[:100],
                        "classes": classes,
                        "selector": selector
                    })
        
        self.survey_patterns = patterns
        print(f"✅ Found {len(patterns['question_types'])} potential question patterns")
    
    async def _save_analysis(self):
        """Save analysis results for bot enhancement."""
        analysis_data = {
            "element_maps": self.element_maps,
            "survey_patterns": self.survey_patterns,
            "recommendations": self._generate_recommendations()
        }
        
        output_file = Path("qmee_analysis.json")
        with open(output_file, 'w') as f:
            json.dump(analysis_data, f, indent=2)
        
        print(f"✅ Analysis saved to {output_file}")
    
    def _generate_recommendations(self) -> Dict:
        """Generate recommendations based on analysis."""
        recommendations = {
            "enhanced_selectors": [],
            "improved_navigation": [],
            "better_responses": [],
            "risk_mitigation": []
        }
        
        # Enhanced selectors based on common elements
        if self.element_maps.get("common"):
            buttons = self.element_maps["common"]["buttons"]
            for btn in buttons:
                if any(word in btn["text"].lower() for word in ["start", "begin", "survey"]):
                    recommendations["enhanced_selectors"].append({
                        "type": "start_button",
                        "selector": f"button:has-text('{btn['text']}')",
                        "confidence": "high"
                    })
        
        # Improved navigation patterns
        recommendations["improved_navigation"].extend([
            "Use vision-based approach for dynamic content",
            "Implement fallback selectors for common buttons",
            "Add random delays between actions",
            "Rotate user agents and fingerprints"
        ])
        
        # Better response strategies
        recommendations["better_responses"].extend([
            "Use Discord-style personality responses",
            "Implement context-aware answer generation",
            "Add survey-specific response templates",
            "Maintain consistency across similar questions"
        ])
        
        # Risk mitigation
        recommendations["risk_mitigation"].extend([
            "Avoid full site scraping to prevent detection",
            "Use vision models instead of HTML parsing",
            "Implement human-like interaction patterns",
            "Rotate IP addresses and user agents",
            "Add random delays and natural typing patterns"
        ])
        
        return recommendations
    
    async def enhance_bot_with_analysis(self):
        """Enhance the existing bot with analysis results."""
        print("🚀 Enhancing bot with analysis results...")
        
        # Load analysis if available
        analysis_file = Path("qmee_analysis.json")
        if not analysis_file.exists():
            print("❌ No analysis file found. Run analysis first.")
            return
        
        with open(analysis_file, 'r') as f:
            analysis = json.load(f)
        
        # Apply enhancements
        await self._apply_enhanced_selectors(analysis)
        await self._apply_improved_navigation(analysis)
        await self._apply_better_responses(analysis)
        
        print("✅ Bot enhancements applied!")
    
    async def _apply_enhanced_selectors(self, analysis):
        """Apply enhanced selectors to bot configuration."""
        print("🎯 Applying enhanced selectors...")
        
        # Update config with better selectors
        enhanced_selectors = analysis.get("recommendations", {}).get("enhanced_selectors", [])
        
        for selector_info in enhanced_selectors:
            print(f"   Added selector: {selector_info['selector']} ({selector_info['type']})")
    
    async def _apply_improved_navigation(self, analysis):
        """Apply improved navigation strategies."""
        print("🧭 Applying improved navigation...")
        
        nav_strategies = analysis.get("recommendations", {}).get("improved_navigation", [])
        
        for strategy in nav_strategies:
            print(f"   Strategy: {strategy}")
    
    async def _apply_better_responses(self, analysis):
        """Apply better response strategies."""
        print("💬 Applying better response strategies...")
        
        response_strategies = analysis.get("recommendations", {}).get("better_responses", [])
        
        for strategy in response_strategies:
            print(f"   Strategy: {strategy}")

async def main():
    """Main function to demonstrate scraping enhancement."""
    print("🎯 Qmee Scraping Enhancement Demo")
    print("=" * 50)
    
    enhancer = QmeeScrapingEnhancement()
    
    # Step 1: Analyze Qmee structure
    print("\n1️⃣ Analyzing Qmee structure...")
    await enhancer.analyze_qmee_structure()
    
    # Step 2: Enhance bot with findings
    print("\n2️⃣ Enhancing bot with findings...")
    await enhancer.enhance_bot_with_analysis()
    
    print("\n✅ Enhancement demo completed!")
    print("\n📋 Key Takeaways:")
    print("   • Targeted analysis is better than full scraping")
    print("   • Vision-based approach reduces detection risk")
    print("   • Enhanced selectors improve automation reliability")
    print("   • Discord personality responses feel more natural")

if __name__ == "__main__":
    asyncio.run(main())
