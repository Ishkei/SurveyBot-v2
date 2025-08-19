import React, { useContext, useEffect, useState } from "react";
import { RequestCtx } from "./RequestContext";
import { getBrandSettings } from "../services/BrandSettings";
import { BrandSettingType } from "../types/BrandSetting";

interface Props {
  children: React.ReactNode,
  setBrandSettingsApplied: (applied: Boolean) => any
};

const DEFAULT_PANEL_BRAND_SETTINGS: BrandSettingType = {
  primary_colour: "#2bd675",
  secondary_colour: "#000000",
  title_colour: "#6a6a6a",
  text_colour: "gray",  
  accurate_matching_title: "Improve your rewards",
  accurate_matching_subtitle: "Allow us to ask you questions based on your race, ethnicity, health, political views and religion.",
  accurate_matching_wording: "People who provide this information get matched to more rewarded surveys than those who don't.",
  accurate_matching_profile_wording: "People who provide additional information about their Ethnicity, Religion, Health and Leisure activities, get matched to more rewarded surveys than those who don't",
  onboarding_wording: "Before we take you to complete your survey, we just need to get to know a little more about you.",
  offboarding_wording: "We’re sorry to see you’re no longer interested. Your current progress will be lost. Are you sure you no longer wish to take part?",
  question_completed_background_colour: "#deffed"
};

export const PanelBrandSettingsContext = React.createContext(DEFAULT_PANEL_BRAND_SETTINGS);

export function PanelBrandSettingsProvider({ children, setBrandSettingsApplied }: Props): JSX.Element {
  const requestContext = useContext(RequestCtx);
  const [brandSettings, setBrandSettings] = useState<BrandSettingType>({});
  const [stylesLoaded, setStylesLoaded] = useState<Boolean>(false);
  const [stylesInjected, setStylesInjected] = useState<Boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if(requestContext.jwt && !stylesLoaded) {
      (async ()=>{
        try {
          const brandSettingsResponse = await getBrandSettings(requestContext.jwt);
          if (!isMounted) return;
  
          setBrandSettings({
            ...DEFAULT_PANEL_BRAND_SETTINGS,
            ...(brandSettingsResponse || {})
          });
          setStylesLoaded(true);
        } catch (err: any) {
          console.error(err.message);
          if (!isMounted) return;

          setBrandSettings(DEFAULT_PANEL_BRAND_SETTINGS);
          setStylesLoaded(true);
        }
      })();
    }

    return () => {
      isMounted = false
    }
  }, [requestContext, stylesLoaded]);

  useEffect(() => {
    try {
      if(Object.keys(brandSettings).length && stylesLoaded && !stylesInjected) {
        const root = document.documentElement;
        root.style.setProperty('--primary-colour', brandSettings.primary_colour);
        root.style.setProperty('--secondary-colour', brandSettings.secondary_colour);
        root.style.setProperty('--title-colour', brandSettings.title_colour);
        root.style.setProperty('--text-colour', brandSettings.text_colour);
        root.style.setProperty('--question-completed-background-colour', brandSettings.question_completed_background_colour);
  
        if(requestContext.isLifepointsPanel || requestContext.isMobiworkxPanel){
          root.style.setProperty('--question-completed-background-colour',  brandSettings.question_completed_background_colour || "#dae7ff");
          root.style.setProperty('--error-colour', brandSettings.error_colour || "#ff2584");
          root.style.setProperty('--profiler-loading-bar-colour', brandSettings.profiler_loading_bar_colour || "#00E2E2");
          root.style.setProperty('--button-unselected-background-colour', brandSettings.button_unselected_background_colour || "#f0f2ff")
          root.style.setProperty('--button-error-background-colour', brandSettings.button_error_background_colour || "#ffedf5")
          root.style.setProperty('--button-colour', brandSettings.button_colour || brandSettings.primary_colour);
          root.style.setProperty('--address-text-colour', brandSettings.address_text_colour || brandSettings.text_colour);
        }
        setStylesInjected(true);
        setBrandSettingsApplied(true);
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }, [
    brandSettings,
    stylesLoaded,
    stylesInjected,
    setBrandSettingsApplied,
    requestContext.isLifepointsPanel,
    requestContext.isMobiworkxPanel
  ]);

  return (
    <PanelBrandSettingsContext.Provider value={brandSettings}>
      { children }
    </PanelBrandSettingsContext.Provider>
  );
};

export function GetOnboardingWording(): string {
  const context = useContext(PanelBrandSettingsContext);
  return context.onboarding_wording;
}

export function GetAccurateMatchingTitle(): string {
  const context = useContext(PanelBrandSettingsContext);
  return context.accurate_matching_title;
}

export function GetAccurateMatchingSubtitle(): string {
  const context = useContext(PanelBrandSettingsContext);
  return context.accurate_matching_subtitle;
}

export function GetAccurateMatchingWording(): string {
  const context = useContext(PanelBrandSettingsContext);
  return context.accurate_matching_wording;
}

export function GetProfileAccurateMatchingWording(): string {
  const context = useContext(PanelBrandSettingsContext);
  return context.accurate_matching_profile_wording || context.accurate_matching_wording;
}