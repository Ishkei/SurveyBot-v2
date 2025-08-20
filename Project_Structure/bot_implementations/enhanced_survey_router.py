"""
Enhanced Survey Router for Qmee Surveys
Incorporates patterns discovered from survey data analysis
"""

import asyncio
import re
import json
from typing import Dict, List, Optional, Tuple, Any
from playwright.async_api import Page, Locator, FrameLocator
import logging

# Import the specialized Swagbucks handler
try:
    from swagbucks_enhanced_handler import SwagbucksEnhancedHandler
    SWAGBUCKS_HANDLER_AVAILABLE = True
except ImportError:
    try:
        # Try alternative import path
        from .swagbucks_enhanced_handler import SwagbucksEnhancedHandler
        SWAGBUCKS_HANDLER_AVAILABLE = True
    except ImportError:
        SWAGBUCKS_HANDLER_AVAILABLE = False
        print("Warning: Swagbucks enhanced handler not available. Using basic handling.")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EnhancedSurveyRouter:
    """
    Enhanced survey router that handles different survey platforms and routing patterns
    Based on analysis of survey data from various providers
    """
    
    def __init__(self):
        # Initialize specialized handlers
        if SWAGBUCKS_HANDLER_AVAILABLE:
            self.swagbucks_handler = SwagbucksEnhancedHandler()
            logger.info("Swagbucks enhanced handler initialized")
        else:
            self.swagbucks_handler = None
            logger.warning("Swagbucks enhanced handler not available")
        
        # Survey platform patterns discovered from data analysis
        self.survey_platforms = {
            'ipsos': {
                'domains': ['enter.ipsosinteractive.com', 'insights.ipsosinteractive.com'],
                'patterns': [
                    'ipsos', 'market research company', 'share your opinions',
                    'accept and take the survey', 'wicket.ajax'
                ],
                'selectors': [
                    'button:has-text("Accept and take the survey")',
                    '#acceptAndTakeSurveyLink1',
                    '.btn-primary'
                ]
            },
            'cmix': {
                'domains': ['survey.cmix.com', 'cdn.cmix.com'],
                'patterns': [
                    'cmix', 'criticalmix', 'materialize', 'jquery-ui',
                    'cm-survey-navigation', 'cm-NextButton'
                ],
                'selectors': [
                    '#cm-NextButton',
                    '.cm-navigation-next-button',
                    'button:has-text("Next")'
                ]
            },
            'lifepointspanel': {
                'domains': ['surveys.lifepointspanel.com'],
                'patterns': [
                    'lifepointspanel', 'respview', 'selfserve',
                    'jquery-ui', 'font-awesome'
                ],
                'selectors': [
                    'button:has-text("Continue")',
                    'button:has-text("Next")',
                    '.btn-primary'
                ]
            },
            'samplicio': {
                'domains': ['samplicio.us', 'www.samplicio.us'],
                'patterns': [
                    'samplicio', 'rx.samplicio.us', 'usersync.samplicio.us'
                ],
                'selectors': [
                    'button:has-text("Continue")',
                    'button:has-text("Next")',
                    '.btn'
                ]
            },
            'qualtrics': {
                'domains': ['qualtrics.com', 'sbushsu.syd1.qualtrics.com'],
                'patterns': [
                    'qualtrics', 'Qualtrics', 'survey platform'
                ],
                'selectors': [
                    'button:has-text("Next")',
                    'button:has-text("Continue")',
                    '.NextButton'
                ]
            },
            'swagbucks': {
                'domains': ['swagbucks.com', 'www.swagbucks.com'],
                'patterns': [
                    'swagbucks', 'gold surveys', 'prescreen'
                ],
                'selectors': [
                    'button:has-text("Continue")',
                    'button:has-text("Next")',
                    '.btn-primary'
                ]
            }
        }
        
        # Common survey completion indicators
        self.completion_indicators = [
            "you have completed the survey", "survey has been completed", 
            "thank you for completing", "survey submission successful",
            "your responses have been recorded", "survey complete!",
            "congratulations! you have finished", "thank you for your participation",
            "survey finished", "completion page", "final page", "thank you page"
        ]
        
        # Survey disqualification indicators
        self.disqualification_indicators = [
            "we're sorry", "unfortunately", "not eligible", "don't qualify",
            "not a good match", "survey ended", "no more questions",
            "thank you for your time", "disqualified", "not suitable",
            "no longer needed", "survey closed", "quota full", "redirecting",
            "finding another survey", "looking for surveys", "matching you with surveys"
        ]
        
        # Router redirect patterns
        self.router_patterns = [
            "dang it!", "you've been declined by the survey provider",
            "this could be due to one of these reasons:", "speeding through the survey",
            "not paying attention", "dishonest survey responses", "not answering clearly",
            "use of offensive language", "a vpn was detected", "view tips"
        ]

    async def detect_survey_platform(self, page: Page, iframe_locator: Optional[FrameLocator] = None) -> Optional[str]:
        """
        Detect which survey platform we're currently on
        """
        try:
            # Check main page URL first
            current_url = page.url.lower()
            
            # Check iframe content if available
            content_to_check = []
            if iframe_locator:
                try:
                    iframe_text = await iframe_locator.locator('body').inner_text()
                    content_to_check.append(iframe_text.lower())
                except:
                    pass
            
            # Add main page content
            try:
                main_text = await page.evaluate('document.body.innerText.toLowerCase()')
                content_to_check.append(main_text)
            except:
                pass
            
            # Check each platform
            for platform_name, platform_data in self.survey_platforms.items():
                # Check domains
                if any(domain in current_url for domain in platform_data['domains']):
                    logger.info(f"Detected {platform_name} platform via domain")
                    return platform_name
                
                # Check patterns in content
                for pattern in platform_data['patterns']:
                    if any(pattern.lower() in content for content in content_to_check):
                        logger.info(f"Detected {platform_name} platform via pattern: {pattern}")
                        return platform_name
            
            logger.info("Could not determine survey platform")
            return None
            
        except Exception as e:
            logger.error(f"Error detecting survey platform: {e}")
            return None

    async def handle_swagbucks_survey(self, page: Page, iframe_locator: FrameLocator) -> bool:
        """
        Handle Swagbucks surveys using enhanced handler if available
        """
        try:
            if self.swagbucks_handler:
                logger.info("Using enhanced Swagbucks handler")
                result = await self.swagbucks_handler.handle_swagbucks_survey(page, iframe_locator)
                
                if result['status'] in ['handled', 'partial']:
                    logger.info(f"Swagbucks survey handled: {result['message']}")
                    return True
                else:
                    logger.warning(f"Swagbucks handler result: {result['status']} - {result['message']}")
                    # Fall back to basic handling
                    return await self._handle_swagbucks_basic(page, iframe_locator)
            else:
                logger.info("Using basic Swagbucks handling")
                return await self._handle_swagbucks_basic(page, iframe_locator)
                
        except Exception as e:
            logger.error(f"Error in Swagbucks handler: {e}")
            return await self._handle_swagbucks_basic(page, iframe_locator)

    async def _handle_swagbucks_basic(self, page: Page, iframe_locator: FrameLocator) -> bool:
        """
        Basic Swagbucks handling as fallback
        """
        try:
            logger.info("Handling Swagbucks survey with basic handler...")
            
            # Look for navigation buttons
            for selector in self.survey_platforms['swagbucks']['selectors']:
                try:
                    if await iframe_locator.locator(selector).count() > 0:
                        await iframe_locator.locator(selector).first.click()
                        logger.info("Clicked Swagbucks navigation button")
                        await asyncio.sleep(2)
                        return True
                except Exception as e:
                    logger.debug(f"Swagbucks selector {selector} failed: {e}")
                    continue
            
            # Look for any clickable element in the survey
            try:
                clickable_elements = iframe_locator.locator('button, input[type="submit"], .btn, [role="button"]')
                if await clickable_elements.count() > 0:
                    await clickable_elements.first.click()
                    logger.info("Clicked Swagbucks fallback element")
                    await asyncio.sleep(2)
                    return True
            except Exception as e:
                logger.debug(f"Swagbucks fallback failed: {e}")
            
            return False
            
        except Exception as e:
            logger.error(f"Error handling Swagbucks survey: {e}")
            return False

    async def handle_ipsos_survey(self, page: Page, iframe_locator: FrameLocator) -> bool:
        """
        Handle Ipsos Interactive surveys
        """
        try:
            logger.info("Handling Ipsos Interactive survey...")
            
            # Look for the main survey button
            for selector in self.survey_platforms['ipsos']['selectors']:
                try:
                    if await iframe_locator.locator(selector).count() > 0:
                        await iframe_locator.locator(selector).first.click()
                        logger.info("Clicked Ipsos survey button")
                        await asyncio.sleep(2)
                        return True
                except Exception as e:
                    logger.debug(f"Ipsos selector {selector} failed: {e}")
                    continue
            
            # Fallback: look for any button with survey-related text
            try:
                survey_buttons = iframe_locator.locator('button, a').filter(
                    has_text=re.compile(r'accept|survey|start|continue', re.IGNORECASE)
                )
                if await survey_buttons.count() > 0:
                    await survey_buttons.first.click()
                    logger.info("Clicked fallback Ipsos button")
                    await asyncio.sleep(2)
                    return True
            except Exception as e:
                logger.debug(f"Ipsos fallback failed: {e}")
            
            return False
            
        except Exception as e:
            logger.error(f"Error handling Ipsos survey: {e}")
            return False

    async def handle_cmix_survey(self, page: Page, iframe_locator: FrameLocator) -> bool:
        """
        Handle CMIX surveys
        """
        try:
            logger.info("Handling CMIX survey...")
            
            # Look for navigation buttons
            for selector in self.survey_platforms['cmix']['selectors']:
                try:
                    if await iframe_locator.locator(selector).count() > 0:
                        await iframe_locator.locator(selector).first.click()
                        logger.info("Clicked CMIX navigation button")
                        await asyncio.sleep(2)
                        return True
                except Exception as e:
                    logger.debug(f"CMIX selector {selector} failed: {e}")
                    continue
            
            # Look for any clickable element in the survey
            try:
                clickable_elements = iframe_locator.locator('button, input[type="submit"], .btn, [role="button"]')
                if await clickable_elements.count() > 0:
                    await clickable_elements.first.click()
                    logger.info("Clicked CMIX fallback element")
                    await asyncio.sleep(2)
                    return True
            except Exception as e:
                logger.debug(f"CMIX fallback failed: {e}")
            
            return False
            
        except Exception as e:
            logger.error(f"Error handling CMIX survey: {e}")
            return False

    async def handle_lifepointspanel_survey(self, page: Page, iframe_locator: FrameLocator) -> bool:
        """
        Handle LifePoints Panel surveys
        """
        try:
            logger.info("Handling LifePoints Panel survey...")
            
            # Look for navigation buttons
            for selector in self.survey_platforms['lifepointspanel']['selectors']:
                try:
                    if await iframe_locator.locator(selector).count() > 0:
                        await iframe_locator.locator(selector).first.click()
                        logger.info("Clicked LifePoints navigation button")
                        await asyncio.sleep(2)
                        return True
                except Exception as e:
                    logger.debug(f"LifePoints selector {selector} failed: {e}")
                    continue
            
            # Look for any clickable element
            try:
                clickable_elements = iframe_locator.locator('button, input[type="submit"], .btn')
                if await clickable_elements.count() > 0:
                    await clickable_elements.first.click()
                    logger.info("Clicked LifePoints fallback element")
                    await asyncio.sleep(2)
                    return True
            except Exception as e:
                logger.debug(f"LifePoints fallback failed: {e}")
            
            return False
            
        except Exception as e:
            logger.error(f"Error handling LifePoints Panel survey: {e}")
            return False

    async def handle_survey_router_page(self, page: Page, iframe_locator: Optional[FrameLocator] = None) -> bool:
        """
        Handle survey router pages that redirect to different surveys
        """
        try:
            logger.info("Handling survey router page...")
            
            # Check for router patterns
            content_to_check = []
            if iframe_locator:
                try:
                    iframe_text = await iframe_locator.locator('body').inner_text()
                    content_to_check.append(iframe_text.lower())
                except:
                    pass
            
            try:
                main_text = await page.evaluate('document.body.innerText.toLowerCase()')
                content_to_check.append(main_text)
            except:
                pass
            
            # Check for router indicators
            is_router = any(
                any(pattern in content for pattern in self.router_patterns)
                for content in content_to_check
            )
            
            if is_router:
                logger.info("Survey router page detected")
                
                # Look for continue/find more surveys buttons
                continue_selectors = [
                    'button:has-text("Continue")',
                    'button:has-text("Find More Surveys")',
                    'button:has-text("Next")',
                    'a:has-text("Continue")',
                    'a:has-text("Find More Surveys")',
                    'input[value*="Continue"]',
                    'input[value*="Next"]',
                    '.btn-primary',
                    '.btn'
                ]
                
                for selector in continue_selectors:
                    try:
                        if iframe_locator:
                            if await iframe_locator.locator(selector).count() > 0:
                                await iframe_locator.locator(selector).first.click()
                                logger.info("Clicked router continue button")
                                await asyncio.sleep(3)
                                return True
                        else:
                            if await page.locator(selector).count() > 0:
                                await page.locator(selector).first.click()
                                logger.info("Clicked router continue button on main page")
                                await asyncio.sleep(3)
                                return True
                    except Exception as e:
                        logger.debug(f"Router selector {selector} failed: {e}")
                        continue
                
                # If no specific buttons found, try to navigate back to Qmee
                logger.info("No router buttons found, attempting to return to Qmee")
                try:
                    await page.goto("https://www.qmee.com/en-us/surveys", timeout=30000)
                    await asyncio.sleep(3)
                    return True
                except Exception as e:
                    logger.error(f"Failed to return to Qmee: {e}")
                    return False
            
            return False
            
        except Exception as e:
            logger.error(f"Error handling survey router page: {e}")
            return False

    async def detect_survey_completion(self, page: Page, iframe_locator: Optional[FrameLocator] = None) -> bool:
        """
        Enhanced survey completion detection
        """
        try:
            content_to_check = []
            
            if iframe_locator:
                try:
                    iframe_text = await iframe_locator.locator('body').inner_text()
                    content_to_check.append(iframe_text.lower())
                except:
                    pass
            
            try:
                main_text = await page.evaluate('document.body.innerText.toLowerCase()')
                content_to_check.append(main_text)
            except:
                pass
            
            # Check for completion indicators
            for content in content_to_check:
                if any(indicator in content for indicator in self.completion_indicators):
                    logger.info("Survey completion detected")
                    return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error detecting survey completion: {e}")
            return False

    async def detect_survey_disqualification(self, page: Page, iframe_locator: Optional[FrameLocator] = None) -> bool:
        """
        Enhanced survey disqualification detection
        """
        try:
            content_to_check = []
            
            if iframe_locator:
                try:
                    iframe_text = await iframe_locator.locator('body').inner_text()
                    content_to_check.append(iframe_text.lower())
                except:
                    pass
            
            try:
                main_text = await page.evaluate('document.body.innerText.toLowerCase()')
                content_to_check.append(main_text)
            except:
                pass
            
            # Check for disqualification indicators
            for content in content_to_check:
                if any(indicator in content for indicator in self.disqualification_indicators):
                    logger.info("Survey disqualification detected")
                    return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error detecting survey disqualification: {e}")
            return False

    async def route_survey(self, page: Page, iframe_locator: Optional[FrameLocator] = None) -> Dict[str, Any]:
        """
        Main routing function that determines how to handle the current survey
        """
        try:
            result = {
                'status': 'unknown',
                'platform': None,
                'action_taken': False,
                'message': ''
            }
            
            # Check for completion first
            if await self.detect_survey_completion(page, iframe_locator):
                result['status'] = 'completed'
                result['message'] = 'Survey completed successfully'
                return result
            
            # Check for disqualification
            if await self.detect_survey_disqualification(page, iframe_locator):
                result['status'] = 'disqualified'
                result['message'] = 'Survey disqualification detected'
                return result
            
            # Check for router pages
            if await self.handle_survey_router_page(page, iframe_locator):
                result['status'] = 'routed'
                result['action_taken'] = True
                result['message'] = 'Survey router page handled'
                return result
            
            # Detect platform and handle accordingly
            platform = await self.detect_survey_platform(page, iframe_locator)
            result['platform'] = platform
            
            if platform == 'swagbucks':
                if await self.handle_swagbucks_survey(page, iframe_locator):
                    result['status'] = 'handled'
                    result['action_taken'] = True
                    result['message'] = 'Swagbucks survey handled successfully'
                else:
                    result['status'] = 'failed'
                    result['message'] = 'Failed to handle Swagbucks survey'
                    
            elif platform == 'ipsos':
                if await self.handle_ipsos_survey(page, iframe_locator):
                    result['status'] = 'handled'
                    result['action_taken'] = True
                    result['message'] = 'Ipsos survey handled successfully'
                else:
                    result['status'] = 'failed'
                    result['message'] = 'Failed to handle Ipsos survey'
                    
            elif platform == 'cmix':
                if await self.handle_cmix_survey(page, iframe_locator):
                    result['status'] = 'handled'
                    result['action_taken'] = True
                    result['message'] = 'CMIX survey handled successfully'
                else:
                    result['status'] = 'failed'
                    result['message'] = 'Failed to handle CMIX survey'
                    
            elif platform == 'lifepointspanel':
                if await self.handle_lifepointspanel_survey(page, iframe_locator):
                    result['status'] = 'handled'
                    result['action_taken'] = True
                    result['message'] = 'LifePoints Panel survey handled successfully'
                else:
                    result['status'] = 'failed'
                    result['message'] = 'Failed to handle LifePoints Panel survey'
                    
            else:
                result['status'] = 'unknown_platform'
                result['message'] = f'Unknown survey platform: {platform}'
            
            return result
            
        except Exception as e:
            logger.error(f"Error in route_survey: {e}")
            return {
                'status': 'error',
                'platform': None,
                'action_taken': False,
                'message': f'Error: {str(e)}'
            }

# Export the class
__all__ = ["EnhancedSurveyRouter"]
