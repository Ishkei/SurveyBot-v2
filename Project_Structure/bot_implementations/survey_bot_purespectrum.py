import asyncio
import re
import random
import time
from typing import Dict, List, Any, Optional
from playwright.async_api import Page, Browser, BrowserContext
import json
import os

class PureSpectrumBot:
    """Bot implementation for PureSpectrum surveys"""
    
    def __init__(self, persona_data: Dict[str, Any] = None):
        self.page: Optional[Page] = None
        self.browser: Optional[Browser] = None
        self.context: Optional[BrowserContext] = None
        self.persona_data = persona_data or {}
        self.session_stats = {
            'questions_answered': 0,
            'surveys_completed': 0,
            'errors_encountered': 0,
            'start_time': time.time()
        }
        
    async def initialize_browser(self, browser: Browser, context: BrowserContext) -> bool:
        """Initialize browser and context"""
        try:
            self.browser = browser
            self.context = context
            self.page = await context.new_page()
            
            # Set viewport
            await self.page.set_viewport_size({"width": 1280, "height": 720})
            
            # Set user agent
            await self.page.set_extra_http_headers({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            })
            
            print("✅ PureSpectrum bot browser initialized")
            return True
            
        except Exception as e:
            print(f"❌ Error initializing PureSpectrum bot browser: {e}")
            return False
    
    async def handle_purespectrum_survey(self) -> Dict[str, Any]:
        """Handle a PureSpectrum survey from start to finish"""
        try:
            print("🎯 Starting PureSpectrum survey handling...")
            
            # Wait for page to load
            await asyncio.sleep(3)
            
            # Check if we're on a qualification page
            page_content = await self.page.content()
            if "Before you begin the survey, please answer the 6 questions below" in page_content:
                print("📋 Detected PureSpectrum qualification questions")
                return await self.handle_qualification_questions()
            
            # Check if we're on the main survey
            elif "question" in page_content.lower() or "select" in page_content.lower():
                print("📝 Detected main PureSpectrum survey")
                return await self.handle_main_survey()
            
            else:
                print("⚠️ Unknown PureSpectrum page format")
                return {'status': 'unknown', 'reason': 'Unknown page format'}
                
        except Exception as e:
            print(f"❌ Error handling PureSpectrum survey: {e}")
            return {'status': 'error', 'reason': str(e)}
    
    async def handle_qualification_questions(self) -> Dict[str, Any]:
        """Handle the 6 preliminary qualification questions"""
        try:
            print("🔍 Starting qualification questions...")
            questions_answered = 0
            max_questions = 6
            
            while questions_answered < max_questions:
                # Wait for question to load
                await asyncio.sleep(2)
                
                # Get current question
                question_info = await self.get_qualification_question()
                if not question_info:
                    print("⚠️ No qualification question found, checking if complete...")
                    break
                
                print(f"📝 Qualification Question {questions_answered + 1}: {question_info['text'][:100]}...")
                print(f"   Type: {question_info['type']}")
                
                # Answer the question
                if await self.answer_qualification_question(question_info):
                    questions_answered += 1
                    print(f"✅ Question {questions_answered} answered")
                    
                    # Wait for next question or completion
                    await asyncio.sleep(2)
                else:
                    print(f"❌ Failed to answer question {questions_answered + 1}")
                    break
            
            print(f"✅ Completed {questions_answered} qualification questions")
            
            # Check if we can proceed to main survey
            if await self.check_can_proceed_to_survey():
                print("🎯 Qualification complete, proceeding to main survey...")
                return await self.handle_main_survey()
            else:
                return {'status': 'qualification_failed', 'questions_answered': questions_answered}
                
        except Exception as e:
            print(f"❌ Error handling qualification questions: {e}")
            return {'status': 'error', 'reason': str(e)}
    
    async def get_qualification_question(self) -> Optional[Dict[str, Any]]:
        """Get information about the current qualification question"""
        try:
            # Look for question text
            question_selectors = [
                'div:contains("I\'m a Male/Female")',
                'div:contains("Male/Female")',
                '.question-text',
                '.qualification-question',
                'p:contains("Male")',
                'p:contains("Female")'
            ]
            
            question_text = ""
            for selector in question_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        question_text = await self.page.locator(selector).first.text_content()
                        break
                except Exception:
                    continue
            
            if not question_text:
                # Fallback: get any text that looks like a question
                page_text = await self.page.text_content('body')
                lines = page_text.split('\n')
                for line in lines:
                    if any(term in line.lower() for term in ['male', 'female', 'gender', 'age', 'income', 'education']):
                        question_text = line.strip()
                        break
            
            if not question_text:
                return None
            
            # Determine question type
            if 'male/female' in question_text.lower() or 'gender' in question_text.lower():
                question_type = 'gender'
            elif 'age' in question_text.lower():
                question_type = 'age'
            elif 'income' in question_text.lower():
                question_type = 'income'
            elif 'education' in question_text.lower():
                question_type = 'education'
            elif 'employment' in question_text.lower() or 'job' in question_text.lower():
                question_type = 'employment'
            else:
                question_type = 'other'
            
            return {
                'text': question_text,
                'type': question_type
            }
            
        except Exception as e:
            print(f"⚠️ Error getting qualification question: {e}")
            return None
    
    async def answer_qualification_question(self, question_info: Dict[str, Any]) -> bool:
        """Answer a qualification question based on persona"""
        try:
            question_type = question_info['type']
            
            if question_type == 'gender':
                return await self.answer_gender_question()
            elif question_type == 'age':
                return await self.answer_age_question()
            elif question_type == 'income':
                return await self.answer_income_question()
            elif question_type == 'education':
                return await self.answer_education_question()
            elif question_type == 'employment':
                return await self.answer_employment_question()
            else:
                return await self.answer_generic_question()
                
        except Exception as e:
            print(f"❌ Error answering qualification question: {e}")
            return False
    
    async def answer_gender_question(self) -> bool:
        """Answer gender-related questions"""
        try:
            # Look for gender selection elements
            gender_selectors = [
                'select option:contains("Male")',
                'select option:contains("Female")',
                'input[value="Male"]',
                'input[value="Female"]',
                'label:contains("Male")',
                'label:contains("Female")'
            ]
            
            # Get persona gender
            persona_gender = self.persona_data.get('gender', 'Male')
            
            for selector in gender_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        if 'Male' in selector and persona_gender == 'Male':
                            await self.page.locator(selector).first.click()
                            print(f"✅ Selected gender: {persona_gender}")
                            return True
                        elif 'Female' in selector and persona_gender == 'Female':
                            await self.page.locator(selector).first.click()
                            print(f"✅ Selected gender: {persona_gender}")
                            return True
                except Exception:
                    continue
            
            # Fallback: try to find and click any gender option
            try:
                if persona_gender == 'Male':
                    await self.page.click('text=Male')
                else:
                    await self.page.click('text=Female')
                print(f"✅ Selected gender: {persona_gender}")
                return True
            except Exception:
                pass
            
            print("❌ Could not select gender")
            return False
            
        except Exception as e:
            print(f"❌ Error answering gender question: {e}")
            return False
    
    async def answer_age_question(self) -> bool:
        """Answer age-related questions"""
        try:
            # Get persona age
            persona_age = self.persona_data.get('age', 34)
            
            # Look for age input or selection
            age_selectors = [
                'input[type="number"]',
                'input[type="text"]',
                'select option'
            ]
            
            for selector in age_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        if 'input' in selector:
                            await self.page.locator(selector).first.fill(str(persona_age))
                            print(f"✅ Entered age: {persona_age}")
                            return True
                        elif 'select' in selector:
                            # Find closest age option
                            options = await self.page.locator(selector).all()
                            for option in options:
                                option_text = await option.text_content()
                                if option_text and str(persona_age) in option_text:
                                    await option.click()
                                    print(f"✅ Selected age: {persona_age}")
                                    return True
                except Exception:
                    continue
            
            print("❌ Could not answer age question")
            return False
            
        except Exception as e:
            print(f"❌ Error answering age question: {e}")
            return False
    
    async def answer_income_question(self) -> bool:
        """Answer income-related questions"""
        try:
            # Get persona income
            persona_income = self.persona_data.get('personal_income_before_taxes', '$50,000 - $74,999')
            
            # Look for income selection
            try:
                await self.page.click(f'text={persona_income}')
                print(f"✅ Selected income: {persona_income}")
                return True
            except Exception:
                # Try alternative approach
                try:
                    await self.page.click('text=income')
                    await asyncio.sleep(1)
                    await self.page.click(f'text={persona_income}')
                    print(f"✅ Selected income: {persona_income}")
                    return True
                except Exception:
                    pass
            
            print("❌ Could not answer income question")
            return False
            
        except Exception as e:
            print(f"❌ Error answering income question: {e}")
            return False
    
    async def answer_education_question(self) -> bool:
        """Answer education-related questions"""
        try:
            # Get persona education
            persona_education = self.persona_data.get('education_level', 'Bachelor\'s degree')
            
            try:
                await self.page.click(f'text={persona_education}')
                print(f"✅ Selected education: {persona_education}")
                return True
            except Exception:
                pass
            
            print("❌ Could not answer education question")
            return False
            
        except Exception as e:
            print(f"❌ Error answering education question: {e}")
            return False
    
    async def answer_employment_question(self) -> bool:
        """Answer employment-related questions"""
        try:
            # Get persona employment info
            persona_employment = self.persona_data.get('employment_status', 'Employed full-time')
            
            try:
                await self.page.click(f'text={persona_employment}')
                print(f"✅ Selected employment: {persona_employment}")
                return True
            except Exception:
                pass
            
            print("❌ Could not answer employment question")
            return False
            
        except Exception as e:
            print(f"❌ Error answering employment question: {e}")
            return False
    
    async def answer_generic_question(self) -> bool:
        """Answer generic questions with random selection"""
        try:
            # Look for any clickable options
            option_selectors = [
                'input[type="radio"]',
                'input[type="checkbox"]',
                'select option',
                'button',
                'a'
            ]
            
            for selector in option_selectors:
                try:
                    options = await self.page.locator(selector).all()
                    if options:
                        # Select random option
                        random_option = random.choice(options)
                        await random_option.click()
                        print("✅ Selected random option for generic question")
                        return True
                except Exception:
                    continue
            
            print("❌ Could not answer generic question")
            return False
            
        except Exception as e:
            print(f"❌ Error answering generic question: {e}")
            return False
    
    async def check_can_proceed_to_survey(self) -> bool:
        """Check if qualification is complete and we can proceed to main survey"""
        try:
            # Look for indicators that qualification is complete
            completion_indicators = [
                'text="Continue"',
                'text="Next"',
                'text="Start Survey"',
                'text="Begin Survey"',
                'button:contains("Continue")',
                'button:contains("Next")',
                'button:contains("Start")'
            ]
            
            for indicator in completion_indicators:
                try:
                    if await self.page.locator(indicator).count() > 0:
                        print("✅ Found continuation button, qualification complete")
                        return True
                except Exception:
                    continue
            
            # Check if we're already on the main survey
            page_content = await self.page.content()
            if any(term in page_content.lower() for term in ['survey', 'question', 'select', 'choose']):
                print("✅ Already on main survey")
                return True
            
            print("⚠️ Qualification status unclear")
            return False
            
        except Exception as e:
            print(f"⚠️ Error checking qualification status: {e}")
            return False
    
    async def handle_main_survey(self) -> Dict[str, Any]:
        """Handle the main PureSpectrum survey questions"""
        try:
            print("📝 Starting main PureSpectrum survey...")
            
            max_questions = 100  # Safety limit
            questions_answered = 0
            
            while questions_answered < max_questions:
                # Wait for question to load
                await asyncio.sleep(2)
                
                # Check if survey is complete
                if await self.check_survey_completion():
                    print("🎉 PureSpectrum survey completed!")
                    self.session_stats['surveys_completed'] += 1
                    return {'status': 'completed', 'questions_answered': questions_answered}
                
                # Handle current question
                if await self.handle_survey_question():
                    questions_answered += 1
                    self.session_stats['questions_answered'] += 1
                    print(f"✅ Question {questions_answered} answered")
                else:
                    print(f"❌ Failed to handle question {questions_answered + 1}")
                    break
            
            print(f"⚠️ Survey stopped after {questions_answered} questions")
            return {'status': 'incomplete', 'questions_answered': questions_answered}
            
        except Exception as e:
            print(f"❌ Error handling main survey: {e}")
            return {'status': 'error', 'reason': str(e)}
    
    async def handle_survey_question(self) -> bool:
        """Handle a single survey question"""
        try:
            # Get question information
            question_info = await self.get_survey_question()
            if not question_info:
                return False
            
            print(f"📝 Survey Question: {question_info['text'][:100]}...")
            print(f"   Type: {question_info['type']}")
            
            # Answer the question
            if question_info['type'] == 'single_choice':
                return await self.answer_single_choice(question_info)
            elif question_info['type'] == 'multiple_choice':
                return await self.answer_multiple_choice(question_info)
            elif question_info['type'] == 'text_input':
                return await self.answer_text_input(question_info)
            elif question_info['type'] == 'number_input':
                return await self.answer_number_input(question_info)
            else:
                return await self.answer_generic_question()
                
        except Exception as e:
            print(f"❌ Error handling survey question: {e}")
            return False
    
    async def get_survey_question(self) -> Optional[Dict[str, Any]]:
        """Get information about the current survey question"""
        try:
            # Look for question text
            question_selectors = [
                '.question-text',
                '.survey-question',
                'h1',
                'h2',
                'h3',
                'p:contains("?")',
                'div:contains("?")'
            ]
            
            question_text = ""
            for selector in question_selectors:
                try:
                    if await self.page.locator(selector).count() > 0:
                        question_text = await self.page.locator(selector).first.text_content()
                        if question_text and len(question_text.strip()) > 10:
                            break
                except Exception:
                    continue
            
            if not question_text:
                return None
            
            # Determine question type
            if await self.page.locator('input[type="radio"]').count() > 0:
                question_type = 'single_choice'
            elif await self.page.locator('input[type="checkbox"]').count() > 0:
                question_type = 'multiple_choice'
            elif await self.page.locator('input[type="text"]').count() > 0:
                question_type = 'text_input'
            elif await self.page.locator('input[type="number"]').count() > 0:
                question_type = 'number_input'
            else:
                question_type = 'unknown'
            
            return {
                'text': question_text,
                'type': question_type
            }
            
        except Exception as e:
            print(f"⚠️ Error getting survey question: {e}")
            return None
    
    async def answer_single_choice(self, question_info: Dict[str, Any]) -> bool:
        """Answer a single choice question"""
        try:
            # Get all radio button options
            radio_options = await self.page.locator('input[type="radio"]').all()
            
            if not radio_options:
                return False
            
            # Select random option
            random_option = random.choice(radio_options)
            await random_option.click()
            
            # Submit if there's a submit button
            try:
                await self.page.click('text=Next')
            except Exception:
                try:
                    await self.page.click('text=Continue')
                except Exception:
                    pass
            
            return True
            
        except Exception as e:
            print(f"❌ Error answering single choice: {e}")
            return False
    
    async def answer_multiple_choice(self, question_info: Dict[str, Any]) -> bool:
        """Answer a multiple choice question"""
        try:
            # Get all checkbox options
            checkbox_options = await self.page.locator('input[type="checkbox"]').all()
            
            if not checkbox_options:
                return False
            
            # Select 1-3 random options
            num_to_select = random.randint(1, min(3, len(checkbox_options)))
            selected_options = random.sample(checkbox_options, num_to_select)
            
            for option in selected_options:
                await option.click()
            
            # Submit
            try:
                await self.page.click('text=Next')
            except Exception:
                try:
                    await self.page.click('text=Continue')
                except Exception:
                    pass
            
            return True
            
        except Exception as e:
            print(f"❌ Error answering multiple choice: {e}")
            return False
    
    async def answer_text_input(self, question_info: Dict[str, Any]) -> bool:
        """Answer a text input question"""
        try:
            # Find text input
            text_input = await self.page.locator('input[type="text"], textarea').first
            
            if not text_input:
                return False
            
            # Generate response based on question
            response = await self.generate_text_response(question_info['text'])
            
            # Fill the input
            await text_input.fill(response)
            
            # Submit
            try:
                await self.page.click('text=Next')
            except Exception:
                try:
                    await self.page.click('text=Continue')
                except Exception:
                    pass
            
            return True
            
        except Exception as e:
            print(f"❌ Error answering text input: {e}")
            return False
    
    async def answer_number_input(self, question_info: Dict[str, Any]) -> bool:
        """Answer a number input question"""
        try:
            # Find number input
            number_input = await self.page.locator('input[type="number"]').first
            
            if not number_input:
                return False
            
            # Generate appropriate number response
            response = await self.generate_number_response(question_info['text'])
            
            # Fill the input
            await number_input.fill(str(response))
            
            # Submit
            try:
                await self.page.click('text=Next')
            except Exception:
                try:
                    await self.page.click('text=Continue')
                except Exception:
                    pass
            
            return True
            
        except Exception as e:
            print(f"❌ Error answering number input: {e}")
            return False
    
    async def generate_text_response(self, question: str) -> str:
        """Generate a text response based on the question and persona"""
        try:
            question_lower = question.lower()
            
            # Generate responses based on question type
            if 'name' in question_lower:
                return self.persona_data.get('first_name', 'John')
            elif 'email' in question_lower:
                return self.persona_data.get('email', 'john.doe@email.com')
            elif 'phone' in question_lower:
                return self.persona_data.get('phone', '555-123-4567')
            elif 'company' in question_lower or 'employer' in question_lower:
                return self.persona_data.get('company_name', 'Tech Solutions Inc.')
            elif 'job' in question_lower or 'title' in question_lower:
                return self.persona_data.get('job_title', 'Marketing Manager')
            elif 'city' in question_lower:
                return self.persona_data.get('city', 'Denver')
            elif 'state' in question_lower:
                return self.persona_data.get('state', 'Colorado')
            else:
                # Generic response
                responses = [
                    "I prefer not to answer",
                    "Not applicable",
                    "None",
                    "N/A"
                ]
                return random.choice(responses)
                
        except Exception as e:
            print(f"⚠️ Error generating text response: {e}")
            return "I prefer not to answer"
    
    async def generate_number_response(self, question: str) -> int:
        """Generate a number response based on the question and persona"""
        try:
            question_lower = question.lower()
            
            if 'age' in question_lower:
                return self.persona_data.get('age', 34)
            elif 'income' in question_lower:
                return random.randint(50000, 75000)
            elif 'hours' in question_lower or 'time' in question_lower:
                return random.randint(1, 10)
            elif 'number' in question_lower or 'count' in question_lower:
                return random.randint(1, 5)
            else:
                return random.randint(1, 10)
                
        except Exception as e:
            print(f"⚠️ Error generating number response: {e}")
            return 5
    
    async def check_survey_completion(self) -> bool:
        """Check if the survey is complete"""
        try:
            # Look for completion indicators
            completion_indicators = [
                'text="Thank you"',
                'text="Survey Complete"',
                'text="Completion"',
                'text="Finished"',
                'text="Done"',
                '.completion-message',
                '.thank-you'
            ]
            
            for indicator in completion_indicators:
                try:
                    if await self.page.locator(indicator).count() > 0:
                        return True
                except Exception:
                    continue
            
            # Check page content
            page_content = await self.page.content()
            if any(term in page_content.lower() for term in ['thank you', 'survey complete', 'completion', 'finished']):
                return True
            
            return False
            
        except Exception as e:
            print(f"⚠️ Error checking survey completion: {e}")
            return False
    
    async def cleanup(self):
        """Clean up resources"""
        try:
            if self.page:
                await self.page.close()
            print("🧹 PureSpectrum bot cleanup completed")
        except Exception as e:
            print(f"⚠️ Error during PureSpectrum bot cleanup: {e}")
    
    def print_session_summary(self):
        """Print session summary"""
        duration = time.time() - self.session_stats['start_time']
        print(f"\n==================================================")
        print(f"📊 PURESPECTRUM SESSION SUMMARY")
        print(f"==================================================")
        print(f"Duration: {duration:.2f} seconds")
        print(f"Questions Answered: {self.session_stats['questions_answered']}")
        print(f"Surveys Completed: {self.session_stats['surveys_completed']}")
        print(f"Errors Encountered: {self.session_stats['errors_encountered']}")
        print(f"==================================================")
