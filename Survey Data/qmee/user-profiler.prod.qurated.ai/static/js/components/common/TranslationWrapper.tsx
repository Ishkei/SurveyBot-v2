import React, { ReactNode, useContext, useEffect, useState } from "react";
import { RequestCtx } from "../../providers/RequestContext";
import {
  getNavigatorLanguage,
  languageFromLocale,
} from "../../services/GetTextHelper";
import { changeLanguage } from "i18next";

type Context = {
  namespace?: string;
  locale?: string;
  language?: string;
};

export const TranslateContext = React.createContext<Context>({
  namespace: undefined,
});

export type Props = {
  children: ReactNode;
  namespace: string;
};
export default function TranslationWrapper({ children, namespace }: Props) {
  const { countryCode } = useContext(RequestCtx);
  const [locale, setLocale] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    if (!countryCode) return;
   
    const urlParams = new URLSearchParams(window.location.search);
    const languageOveride = urlParams.get("language");
    let locale = languageOveride || getNavigatorLanguage();

    // Sets locale to british if user is english in the uk but has a us locale
    if(!languageOveride && locale.includes("en") && countryCode.toLowerCase() === "gbr"){
      locale = "en-gb";
    }

    // Fix for users with badly formatted browser locales e.g 'en,zh'
    locale = locale?.replace(/[^a-zA-Z0-9-]/, '-')

    const language = languageFromLocale(locale);
    changeLanguage(locale);

    setLanguage(language);
    setLocale(locale);
  }, [countryCode]);

  return (
    <TranslateContext.Provider value={{ namespace, locale, language }}>
      {children}
    </TranslateContext.Provider>
  );
}

export function useNamespace() {
  return useContext(TranslateContext).namespace;
}
