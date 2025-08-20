import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from 'i18next-http-backend';
import LocizeBackend from 'i18next-locize-backend';
import Backend from 'i18next-chained-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const httpBackendSettings = {
  loadPath: '/locales/{{lng}}/common.json'
}

const locizeBackendSettings = {
  projectId: '3507136b-2981-49c2-84a4-cd1549539526', // Not secret - will appear in network requests to locize
  apiKey: process.env.REACT_APP_LOCIZE_API_KEY, // The API key is only used for write operations. It must be kept secret and only added in developement
  referenceLng: 'en',
  version: process.env.NODE_ENV === "production" ? 'production' : 'latest',
};

// When enabled gets translations from locize instead of local translation folder
const locizeEnabled = process.env.NODE_ENV !== "production" && process.env.REACT_APP_LOCIZE_API_KEY;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: (code) => {
      if (!code || code === 'en') return ['en'];
      const fallbacks = [code];

      const langPart = code.split('-')[0];
      if (langPart !== code) fallbacks.push(langPart);

      // Adds english as a final fallback or the dev language if developing
      fallbacks.push(process.env.NODE_ENV !== "production" ? "dev" : "en");
      return fallbacks;
    },
    debug: !!(process.env.NODE_ENV !== "production"),
    backend: {
      backends: locizeEnabled ? [LocizeBackend] : [HttpBackend],
      backendOptions: locizeEnabled ? [locizeBackendSettings] : [httpBackendSettings],
    },
    interpolation: {
      escapeValue: false // react already safe from xss
    },
    saveMissing: false // set to true if you want to upload missing translations
  });
