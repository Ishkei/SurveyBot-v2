import {
  Condition,
  Conditions,
  SurveyQuestionListType,
} from "../types/Prescreener";

interface ProfileAnswersType {
  [key: string]: string[] | undefined;
}

const validateAndConditions = (
  conditions: Conditions[],
  questionsData: SurveyQuestionListType,
  answers?: ProfileAnswersType
): boolean => {
  return conditions.every((condition) => {
    if (condition?.conditions) {
      return validateAllConditions(condition, questionsData, answers);
    } else {
      return validateCondition(condition, questionsData, answers);
    }
  });
};

const validateOrConditions = (
  conditions: Conditions[],
  questionsData: SurveyQuestionListType,
  answers?: ProfileAnswersType
): boolean => {
  return conditions.some((condition) => {
    if (condition["conditions"]) {
      return validateAllConditions(condition, questionsData, answers);
    }

    return validateCondition(condition, questionsData, answers);
  });
};

const validateCondition = (
  condition: Condition,
  questionsData: SurveyQuestionListType,
  profileAnswers?: ProfileAnswersType
) => {
  const requiredQuestion = questionsData[condition.question_key];
  const requiredAnswers = condition.answer_keys || [];

  if(condition.answer_key){
    requiredAnswers.push(condition.answer_key);
  }

  if (!requiredQuestion) return true;

  if (!requiredAnswers.length) return false;

  let answers = profileAnswers ? profileAnswers[condition.question_key] : requiredQuestion.answerKey?.split(",");

  let match = false;
  
  if(condition?.operator === "AND"){
    match = requiredAnswers.every((requiredAnswer) => answers?.includes(requiredAnswer));
  } else {
    match = requiredAnswers.some((requiredAnswer) => answers?.includes(requiredAnswer));
  }

  return condition?.operator === "NOT" ? !match : match;
};

export const validateAllConditions = (
  conditions: Conditions,
  questionsData: SurveyQuestionListType,
  answers?: ProfileAnswersType
): boolean => {
  const operator = conditions["operator"];

  if (operator === "AND" && conditions["conditions"]) {
    return validateAndConditions(conditions["conditions"], questionsData, answers);
  } else if (operator === "OR" && conditions["conditions"]) {
    return validateOrConditions(conditions["conditions"], questionsData, answers);
  }

  if(!conditions["conditions"] && conditions["question_key"]){
    return validateCondition(conditions, questionsData, answers);
  }

  return false;
};

export const findExtendedPrerequisiteMatch = (
  questionsData: SurveyQuestionListType,
  key: string
) => {
  const childData = questionsData[key] || {};
  const extended_prerequisites: any = childData.extended_prerequisites;

  if (!extended_prerequisites) return true;

  return validateAllConditions(extended_prerequisites, questionsData);
};

export const findOptionsParentmatch = (
  questionsData: SurveyQuestionListType,
  key: string,
  profileAnswers?: ProfileAnswersType
) => {
  const childData = questionsData[key] || {};
  let prerequisites: any = childData?.options?.parents || childData?.options?.prerequisites;

  return includesCorrectRequirements(
    questionsData,
    prerequisites,
    profileAnswers
  )
}

export const includesCorrectRequirements = (
  questions: SurveyQuestionListType,
  requirements: any,
  profileAnswers?: ProfileAnswersType
) => {
  if (!requirements) return true;

  if(Array.isArray(requirements)){
    return requirements.every((prerequisite: any) => {
      if(prerequisite?.prerequisite_definition){
        prerequisite = prerequisite.prerequisite_definition;
      }

      return validateAllConditions(prerequisite, questions, profileAnswers);
    });
  }
  
  if(requirements?.prerequisite_definition){
    requirements = requirements.prerequisite_definition;
  }

  return validateAllConditions(requirements, questions, profileAnswers);
}

export default findExtendedPrerequisiteMatch;
