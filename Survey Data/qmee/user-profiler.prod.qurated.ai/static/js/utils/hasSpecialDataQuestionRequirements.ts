const ACCURATE_MATCHING_CONSENT_KEY = "15b6";

export const hasSpecialDataQuestionRequirements = (prerequisites: any): boolean => {
    if (!prerequisites) return false;
  
    if (prerequisites.prerequisite_definition) {
      prerequisites = prerequisites.prerequisite_definition;
    }
  
    if (Array.isArray(prerequisites)) {
      return prerequisites.some((prerequisite) => {
        if (prerequisite?.prerequisite_definition) {
          prerequisite = prerequisite.prerequisite_definition;
        }
  
        if (prerequisite?.conditions) {
          return hasSpecialDataQuestionRequirements(prerequisite.conditions);
        } else if (prerequisite?.question_key) {
          return prerequisite?.question_key === ACCURATE_MATCHING_CONSENT_KEY;
        }
        return false;
      });
    }
  
    if (prerequisites?.conditions) {
      return hasSpecialDataQuestionRequirements(prerequisites.conditions);
    } else if (prerequisites?.question_key) {
      return prerequisites?.question_key === ACCURATE_MATCHING_CONSENT_KEY;
    }
  
    return false;
  };


  export default hasSpecialDataQuestionRequirements