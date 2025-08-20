import { Localisation } from "../types/Prescreener";

export const getDefaultTranslatedValues = (translate: (a: string) => string) => {
    return {
      date_format: "MMM/YYYY",
      gender_shorts: {
        m: "♂",
        f: "♀",
        u: " ",
      },
      gender_labels: {
        m: translate("Male"),
        f: translate("Female"),
        u: translate("Unknown"),
      },
      currentYearFormat: `[${translate("Expecting")}] (YYYY)`,
      nextYearFormat: `[${translate("Expecting")}] (YYYY)`,
      no_children: translate("None/Not expecting"),
    };
  };
  
export const getLocalisation = (
    localisation: Localisation | undefined,
    translate: (a: string) => string
  ) => {
    const defaultLocalisation = getDefaultTranslatedValues(translate);
  
    return {
      ...defaultLocalisation,
      ...localisation,
      gender_shorts: {
        ...defaultLocalisation["gender_shorts"],
        ...localisation?.["gender_shorts"],
      },
      gender_labels: {
        ...defaultLocalisation["gender_labels"],
        ...localisation?.["gender_labels"],
      },
    };
  };
  