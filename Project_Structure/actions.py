# actions.py

from typing_simulation import TypingSimulator, type_text_naturally, TYPING_PRESETS

async def click_element(page, element_id, element_map):
    """Clicks a specified element from the element map."""
    element_to_click = element_map.get(element_id)
    if not element_to_click:
        raise ValueError(f"Element with ID {element_id} not found in the element map.")
    
    action_text = (await element_to_click.inner_text() or "").strip()
    print(f"Toolbox: Clicking element [{element_id}] with text '{action_text}'")
    await element_to_click.click(timeout=15000)
    return f"Successfully clicked element {element_id}."

async def fill_textbox(page, element_id, text_to_fill, element_map, use_typing_simulation: bool = True, typing_config: dict = None):
    """
    Fills a specified textbox element with the given text.
    
    Args:
        page: Playwright page object
        element_id: ID of the element to fill
        text_to_fill: Text to fill in the textbox
        element_map: Map of element IDs to elements
        use_typing_simulation: Whether to use human-like typing simulation
        typing_config: Configuration for typing simulation
    """
    element_to_fill = element_map.get(element_id)
    if not element_to_fill:
        raise ValueError(f"Element with ID {element_id} not found in the element map.")
    
    if use_typing_simulation:
        print(f"Toolbox: Filling element [{element_id}] with human-like typing simulation")
        
        # Use typing simulation for more realistic behavior
        try:
            # Configure typing simulator
            config = typing_config or TYPING_PRESETS['average_typer']
            simulator = TypingSimulator(config)
            
            # Use Playwright typing simulation
            success = await simulator.type_text_human_like(text_to_fill, element_to_fill, use_pyautogui=False)
            
            if success:
                return f"Successfully filled element {element_id} with human-like typing simulation."
            else:
                # Fallback to regular fill if simulation fails
                print("⚠️ Typing simulation failed, falling back to regular fill")
                await element_to_fill.fill(text_to_fill)
                return f"Successfully filled element {element_id} with fallback method."
                
        except Exception as e:
            print(f"⚠️ Typing simulation error: {e}, using fallback")
            await element_to_fill.fill(text_to_fill)
            return f"Successfully filled element {element_id} with fallback method."
    else:
        # Regular fill without simulation
        print(f"Toolbox: Filling element [{element_id}] with text '{text_to_fill}'")
        await element_to_fill.fill(text_to_fill)
        return f"Successfully filled element {element_id}."

async def fill_textbox_with_typing_style(page, element_id, text_to_fill, element_map, typing_style: str = 'average_typer'):
    """
    Fills a textbox with a specific typing style preset.
    
    Args:
        page: Playwright page object
        element_id: ID of the element to fill
        text_to_fill: Text to fill in the textbox
        element_map: Map of element IDs to elements
        typing_style: Typing style preset ('fast_typer', 'average_typer', 'slow_typer', 'careful_typer')
    """
    if typing_style not in TYPING_PRESETS:
        print(f"⚠️ Unknown typing style '{typing_style}', using 'average_typer'")
        typing_style = 'average_typer'
    
    config = TYPING_PRESETS[typing_style]
    return await fill_textbox(page, element_id, text_to_fill, element_map, True, config)

# Add other actions here as needed