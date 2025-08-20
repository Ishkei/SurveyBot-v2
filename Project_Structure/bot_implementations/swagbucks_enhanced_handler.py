"""
Enhanced Swagbucks Survey Handler
Addresses specific issues with date of birth fields and navigation
"""

import asyncio
import re
import random
from typing import Dict, List, Optional, Any, Tuple
from playwright.async_api import Page, FrameLocator, Locator
import logging

logger = logging.getLogger(__name__)

class SwagbucksEnhancedHandler:
    """
    Enhanced handler for Swagbucks surveys
    Specifically addresses date of birth and navigation issues
    """
    
    def __init__(self):
        # Swagbucks-specific selectors and patterns
        self.swagbucks_patterns = {
            'date_of_birth': {
                'month_selectors': [
                    'input[name="date_m"]',
                    'input[id="dobMonth"]',
                    'input[placeholder="MM"]',
                    'select[name="date_m"]',
                    'select[id="dobMonth"]'
                ],
                'day_selectors': [
                    'input[name="date_d"]',
                    'input[id="dobDay"]',
                    'input[placeholder="DD"]',
                    'select[name="date_d"]',
                    'select[id="dobDay"]'
                ],
                'year_selectors': [
                    'input[name="date_y"]',
                    'input[id="dobYear"]',
                    'input[placeholder="YYYY"]',
                    'select[name="date_y"]',
                    'select[id="dobYear"]'
                ]
            },
            'navigation': {
                'continue_selectors': [
                    'button:has-text("Continue")',
                    'button:has-text("Next")',
                    'button:has-text("Submit")',
                    'input[type="submit"]',
                    'input[value="Continue"]',
                    'input[value="Next"]',
                    '.btn-primary',
                    '.btn',
                    '[role="button"]'
                ],
                'disabled_button_selectors': [
                    'button[disabled]',
                    'button.disabled',
                    'input[disabled]',
                    '.btn-disabled'
                ]
            },
            'form_validation': {
                'required_field_indicators': [
                    'input[required]',
                    'input[aria-required="true"]',
                    '.required',
                    '[data-required="true"]'
                ]
            }
        }
        
        # Common date values for persona
        self.default_dates = {
            'month': '06',  # June
            'day': '15',
            'year': '1990'
        }

    async def handle_swagbucks_survey(self, page: Page, iframe_locator: Optional[FrameLocator] = None) -> Dict[str, Any]:
        """
        Main handler for Swagbucks surveys
        """
        try:
            logger.info("Handling Swagbucks survey...")
            
            # Determine if we're in an iframe or main page
            if iframe_locator:
                return await self._handle_iframe_survey(iframe_locator)
            else:
                return await self._handle_main_page_survey(page)
                
        except Exception as e:
            logger.error(f"Error handling Swagbucks survey: {e}")
            return {
                'status': 'error',
                'message': f'Swagbucks handling error: {str(e)}'
            }

    async def _handle_iframe_survey(self, iframe_locator: FrameLocator) -> Dict[str, Any]:
        """Handle survey within iframe"""
        try:
            # Check for date of birth fields first
            if await self._is_date_of_birth_page(iframe_locator):
                logger.info("Detected date of birth page")
                return await self._handle_date_of_birth_page(iframe_locator)
            
            # Check for other common form types
            if await self._is_demographics_page(iframe_locator):
                logger.info("Detected demographics page")
                return await self._handle_demographics_page(iframe_locator)
            
            # Try to find and click navigation buttons
            if await self._handle_navigation(iframe_locator):
                return {
                    'status': 'handled',
                    'message': 'Navigation handled successfully'
                }
            
            return {
                'status': 'unknown',
                'message': 'Unknown page type in Swagbucks survey'
            }
            
        except Exception as e:
            logger.error(f"Error handling iframe survey: {e}")
            return {
                'status': 'error',
                'message': f'Iframe handling error: {str(e)}'
            }

    async def _handle_main_page_survey(self, page: Page) -> Dict[str, Any]:
        """Handle survey on main page"""
        try:
            # Check for date of birth fields
            if await self._is_date_of_birth_page_main(page):
                logger.info("Detected date of birth page on main page")
                return await self._handle_date_of_birth_page_main(page)
            
            # Try to find and click navigation buttons
            if await self._handle_navigation_main(page):
                return {
                    'status': 'handled',
                    'message': 'Navigation handled successfully on main page'
                }
            
            return {
                'status': 'unknown',
                'message': 'Unknown page type on main page'
            }
            
        except Exception as e:
            logger.error(f"Error handling main page survey: {e}")
            return {
                'status': 'error',
                'message': f'Main page handling error: {str(e)}'
            }

    async def _is_date_of_birth_page(self, iframe_locator: FrameLocator) -> bool:
        """Check if current page is a date of birth page"""
        try:
            # Look for date of birth indicators
            page_text = await iframe_locator.locator('body').inner_text()
            page_text_lower = page_text.lower()
            
            # Check for date-related text
            date_indicators = [
                'when were you born',
                'date of birth',
                'birth date',
                'when were you born',
                'month', 'day', 'year'
            ]
            
            if any(indicator in page_text_lower for indicator in date_indicators):
                # Also check for date input fields
                month_field = await iframe_locator.locator('input[placeholder="MM"], input[name="date_m"], input[id="dobMonth"]').count()
                day_field = await iframe_locator.locator('input[placeholder="DD"], input[name="date_d"], input[id="dobDay"]').count()
                year_field = await iframe_locator.locator('input[placeholder="YYYY"], input[name="date_y"], input[id="dobYear"]').count()
                
                return month_field > 0 and day_field > 0 and year_field > 0
            
            return False
            
        except Exception as e:
            logger.debug(f"Error checking date of birth page: {e}")
            return False

    async def _is_date_of_birth_page_main(self, page: Page) -> bool:
        """Check if main page is a date of birth page"""
        try:
            # Look for date of birth indicators
            page_text = await page.evaluate('document.body.innerText.toLowerCase()')
            
            # Check for date-related text
            date_indicators = [
                'when were you born',
                'date of birth',
                'birth date',
                'when were you born',
                'month', 'day', 'year'
            ]
            
            if any(indicator in page_text for indicator in date_indicators):
                # Also check for date input fields
                month_field = await page.locator('input[placeholder="MM"], input[name="date_m"], input[id="dobMonth"]').count()
                day_field = await page.locator('input[placeholder="DD"], input[name="date_d"], input[id="dobDay"]').count()
                year_field = await page.locator('input[placeholder="YYYY"], input[name="date_y"], input[id="dobYear"]').count()
                
                return month_field > 0 and day_field > 0 and year_field > 0
            
            return False
            
        except Exception as e:
            logger.debug(f"Error checking date of birth page on main page: {e}")
            return False

    async def _handle_date_of_birth_page(self, iframe_locator: FrameLocator) -> Dict[str, Any]:
        """Handle date of birth page specifically"""
        try:
            logger.info("Handling date of birth page...")
            
            # Fill month field
            month_filled = await self._fill_date_field(iframe_locator, 'month', self.default_dates['month'])
            if not month_filled:
                logger.warning("Failed to fill month field")
            
            # Fill day field
            day_filled = await self._fill_date_field(iframe_locator, 'day', self.default_dates['day'])
            if not day_filled:
                logger.warning("Failed to fill day field")
            
            # Fill year field
            year_filled = await self._fill_date_field(iframe_locator, 'year', self.default_dates['year'])
            if not year_filled:
                logger.warning("Failed to fill year field")
            
            # Wait a moment for fields to update
            await asyncio.sleep(1)
            
            # Try to enable and click the continue button
            continue_clicked = await self._enable_and_click_continue(iframe_locator)
            
            if continue_clicked:
                logger.info("Successfully filled date of birth and clicked continue")
                return {
                    'status': 'handled',
                    'message': 'Date of birth filled and continue clicked'
                }
            else:
                logger.warning("Date of birth filled but continue button not clicked")
                return {
                    'status': 'partial',
                    'message': 'Date of birth filled but continue button issue'
                }
                
        except Exception as e:
            logger.error(f"Error handling date of birth page: {e}")
            return {
                'status': 'error',
                'message': f'Date of birth handling error: {str(e)}'
            }

    async def _handle_date_of_birth_page_main(self, page: Page) -> Dict[str, Any]:
        """Handle date of birth page on main page"""
        try:
            logger.info("Handling date of birth page on main page...")
            
            # Fill month field
            month_filled = await self._fill_date_field_main(page, 'month', self.default_dates['month'])
            if not month_filled:
                logger.warning("Failed to fill month field on main page")
            
            # Fill day field
            day_filled = await self._fill_date_field_main(page, 'day', self.default_dates['day'])
            if not day_filled:
                logger.warning("Failed to fill day field on main page")
            
            # Fill year field
            year_filled = await self._fill_date_field_main(page, 'year', self.default_dates['year'])
            if not year_filled:
                logger.warning("Failed to fill year field on main page")
            
            # Wait a moment for fields to update
            await asyncio.sleep(1)
            
            # Try to enable and click the continue button
            continue_clicked = await self._enable_and_click_continue_main(page)
            
            if continue_clicked:
                logger.info("Successfully filled date of birth and clicked continue on main page")
                return {
                    'status': 'handled',
                    'message': 'Date of birth filled and continue clicked on main page'
                }
            else:
                logger.warning("Date of birth filled but continue button not clicked on main page")
                return {
                    'status': 'partial',
                    'message': 'Date of birth filled but continue button issue on main page'
                }
                
        except Exception as e:
            logger.error(f"Error handling date of birth page on main page: {e}")
            return {
                'status': 'error',
                'message': f'Date of birth handling error on main page: {str(e)}'
            }

    async def _fill_date_field(self, iframe_locator: FrameLocator, field_type: str, value: str) -> bool:
        """Fill a specific date field in iframe"""
        try:
            selectors = self.swagbucks_patterns['date_of_birth'][f'{field_type}_selectors']
            
            for selector in selectors:
                try:
                    field = iframe_locator.locator(selector)
                    if await field.count() > 0:
                        # Clear the field first
                        await field.fill('')
                        await asyncio.sleep(0.5)
                        
                        # Fill with the value
                        await field.fill(value)
                        await asyncio.sleep(0.5)
                        
                        # Trigger change event
                        await field.evaluate('el => el.dispatchEvent(new Event("change", { bubbles: true }))')
                        await field.evaluate('el => el.dispatchEvent(new Event("input", { bubbles: true }))')
                        
                        logger.info(f"Successfully filled {field_type} field with {value}")
                        return True
                        
                except Exception as e:
                    logger.debug(f"Selector {selector} failed for {field_type}: {e}")
                    continue
            
            logger.warning(f"Could not fill {field_type} field with any selector")
            return False
            
        except Exception as e:
            logger.error(f"Error filling {field_type} field: {e}")
            return False

    async def _fill_date_field_main(self, page: Page, field_type: str, value: str) -> bool:
        """Fill a specific date field on main page"""
        try:
            selectors = self.swagbucks_patterns['date_of_birth'][f'{field_type}_selectors']
            
            for selector in selectors:
                try:
                    field = page.locator(selector)
                    if await field.count() > 0:
                        # Clear the field first
                        await field.fill('')
                        await asyncio.sleep(0.5)
                        
                        # Fill with the value
                        await field.fill(value)
                        await asyncio.sleep(0.5)
                        
                        # Trigger change event
                        await field.evaluate('el => el.dispatchEvent(new Event("change", { bubbles: true }))')
                        await field.evaluate('el => el.dispatchEvent(new Event("input", { bubbles: true }))')
                        
                        logger.info(f"Successfully filled {field_type} field with {value} on main page")
                        return True
                        
                except Exception as e:
                    logger.debug(f"Selector {selector} failed for {field_type} on main page: {e}")
                    continue
            
            logger.warning(f"Could not fill {field_type} field with any selector on main page")
            return False
            
        except Exception as e:
            logger.error(f"Error filling {field_type} field on main page: {e}")
            return False

    async def _enable_and_click_continue(self, iframe_locator: FrameLocator) -> bool:
        """Enable and click the continue button in iframe"""
        try:
            # Try multiple strategies to enable and click the continue button
            
            # Strategy 1: Look for disabled buttons and try to enable them
            for disabled_selector in self.swagbucks_patterns['navigation']['disabled_button_selectors']:
                try:
                    disabled_buttons = iframe_locator.locator(disabled_selector)
                    if await disabled_buttons.count() > 0:
                        # Try to remove disabled attribute
                        await disabled_buttons.first.evaluate('el => el.removeAttribute("disabled")')
                        await disabled_buttons.first.evaluate('el => el.classList.remove("disabled")')
                        logger.info("Removed disabled attribute from button")
                except Exception as e:
                    logger.debug(f"Could not remove disabled attribute: {e}")
            
            # Strategy 2: Try to click continue buttons
            for selector in self.swagbucks_patterns['navigation']['continue_selectors']:
                try:
                    button = iframe_locator.locator(selector)
                    if await button.count() > 0:
                        # Check if button is visible and clickable
                        if await button.is_visible():
                            # Try to click
                            await button.click()
                            logger.info(f"Successfully clicked continue button: {selector}")
                            await asyncio.sleep(2)
                            return True
                except Exception as e:
                    logger.debug(f"Continue button {selector} failed: {e}")
                    continue
            
            # Strategy 3: Try to trigger form submission
            try:
                # Look for form and submit it
                forms = iframe_locator.locator('form')
                if await forms.count() > 0:
                    await forms.first.evaluate('form => form.submit()')
                    logger.info("Form submitted via JavaScript")
                    await asyncio.sleep(2)
                    return True
            except Exception as e:
                logger.debug(f"Form submission failed: {e}")
            
            logger.warning("Could not enable or click continue button")
            return False
            
        except Exception as e:
            logger.error(f"Error enabling and clicking continue button: {e}")
            return False

    async def _enable_and_click_continue_main(self, page: Page) -> bool:
        """Enable and click the continue button on main page"""
        try:
            # Try multiple strategies to enable and click the continue button
            
            # Strategy 1: Look for disabled buttons and try to enable them
            for disabled_selector in self.swagbucks_patterns['navigation']['disabled_button_selectors']:
                try:
                    disabled_buttons = page.locator(disabled_selector)
                    if await disabled_buttons.count() > 0:
                        # Try to remove disabled attribute
                        await disabled_buttons.first.evaluate('el => el.removeAttribute("disabled")')
                        await disabled_buttons.first.evaluate('el => el.classList.remove("disabled")')
                        logger.info("Removed disabled attribute from button on main page")
                except Exception as e:
                    logger.debug(f"Could not remove disabled attribute on main page: {e}")
            
            # Strategy 2: Try to click continue buttons
            for selector in self.swagbucks_patterns['navigation']['continue_selectors']:
                try:
                    button = page.locator(selector)
                    if await button.count() > 0:
                        # Check if button is visible and clickable
                        if await button.is_visible():
                            # Try to click
                            await button.click()
                            logger.info(f"Successfully clicked continue button on main page: {selector}")
                            await asyncio.sleep(2)
                            return True
                except Exception as e:
                    logger.debug(f"Continue button {selector} failed on main page: {e}")
                    continue
            
            # Strategy 3: Try to trigger form submission
            try:
                # Look for form and submit it
                forms = page.locator('form')
                if await forms.count() > 0:
                    await forms.first.evaluate('form => form.submit()')
                    logger.info("Form submitted via JavaScript on main page")
                    await asyncio.sleep(2)
                    return True
            except Exception as e:
                logger.debug(f"Form submission failed on main page: {e}")
            
            logger.warning("Could not enable or click continue button on main page")
            return False
            
        except Exception as e:
            logger.error(f"Error enabling and clicking continue button on main page: {e}")
            return False

    async def _is_demographics_page(self, iframe_locator: FrameLocator) -> bool:
        """Check if current page is a demographics page"""
        try:
            page_text = await iframe_locator.locator('body').inner_text()
            page_text_lower = page_text.lower()
            
            demographics_indicators = [
                'demographics',
                'personal information',
                'about you',
                'your profile',
                'background information'
            ]
            
            return any(indicator in page_text_lower for indicator in demographics_indicators)
            
        except Exception as e:
            logger.debug(f"Error checking demographics page: {e}")
            return False

    async def _handle_demographics_page(self, iframe_locator: FrameLocator) -> Dict[str, Any]:
        """Handle demographics page"""
        try:
            logger.info("Handling demographics page...")
            
            # Try to find and click navigation buttons
            if await self._handle_navigation(iframe_locator):
                return {
                    'status': 'handled',
                    'message': 'Demographics page navigation handled'
                }
            
            return {
                'status': 'unknown',
                'message': 'Demographics page not fully handled'
            }
            
        except Exception as e:
            logger.error(f"Error handling demographics page: {e}")
            return {
                'status': 'error',
                'message': f'Demographics handling error: {str(e)}'
            }

    async def _handle_navigation(self, iframe_locator: FrameLocator) -> bool:
        """Handle navigation in iframe"""
        try:
            for selector in self.swagbucks_patterns['navigation']['continue_selectors']:
                try:
                    button = iframe_locator.locator(selector)
                    if await button.count() > 0 and await button.is_visible():
                        await button.click()
                        logger.info(f"Successfully clicked navigation button: {selector}")
                        await asyncio.sleep(2)
                        return True
                except Exception as e:
                    logger.debug(f"Navigation button {selector} failed: {e}")
                    continue
            
            return False
            
        except Exception as e:
            logger.error(f"Error handling navigation: {e}")
            return False

    async def _handle_navigation_main(self, page: Page) -> bool:
        """Handle navigation on main page"""
        try:
            for selector in self.swagbucks_patterns['navigation']['continue_selectors']:
                try:
                    button = page.locator(selector)
                    if await button.count() > 0 and await button.is_visible():
                        await button.click()
                        logger.info(f"Successfully clicked navigation button on main page: {selector}")
                        await asyncio.sleep(2)
                        return True
                except Exception as e:
                    logger.debug(f"Navigation button {selector} failed on main page: {e}")
                    continue
            
            return False
            
        except Exception as e:
            logger.error(f"Error handling navigation on main page: {e}")
            return False

# Export the class
__all__ = ["SwagbucksEnhancedHandler"]
