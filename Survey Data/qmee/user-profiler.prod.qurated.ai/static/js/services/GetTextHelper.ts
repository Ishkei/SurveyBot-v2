interface Map {
  [key: string]: string | undefined
}

const countryCodeMappings: Map = {
  GBR: 'en',
  USA: 'en',
  CAN: 'en',
  AUS: 'en',
  FRA: 'fr',
  DEU: 'de',
  ITA: 'it',
  ESP: 'es'
}

export function localeFromCode(code: string): string {
  // Default to EN if we do not have any mappings for specified code
  return countryCodeMappings[code.toUpperCase()] || 'en'
}

export function languageFromLocale(locale: string): string {
  const langPart = locale.split("-")[0];
  if (!langPart || langPart.length !== 2) return "en";

  return langPart;
}

export const getNavigatorLanguage = (): string => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.language || 'en';
  }
}