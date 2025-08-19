import { SurveyQuestionListType, SurveyQuestionType } from "../types/Prescreener";
import { CategoryType } from "../types/Profile";
import { isQuestionComplete } from "./isQuestionsComplete";

interface ProfileAnswersType {
  [key: string]: string[] | undefined;
}

export const getProfileCompletionPercentage = (
  profile: CategoryType[],
  isSpecialDataConsentGiven: boolean,
  questions: SurveyQuestionListType,
  profileAnswers?: ProfileAnswersType
) => {
  let totalQuestions = 0;
  let completedQuestions = 0;

  profile.forEach(({ questions: categoryQuestions }) => {
    const { total, completed } = getQuestionListCompletion(
      categoryQuestions,
      isSpecialDataConsentGiven,
      questions,
      profileAnswers
    );

    totalQuestions += total;
    completedQuestions += completed;
  });

  return (completedQuestions * 100) / totalQuestions;
};

export const getQuestionListCompletion = (
  cateogryQuestions: SurveyQuestionType[],
  isSpecialDataConsentGiven: boolean,
  questions: SurveyQuestionListType,
  profileAnswers?: ProfileAnswersType
) => {
  let total = 0;
  let completed = 0;

  cateogryQuestions.forEach((question) => {
    const consent = question.special_data_consent && !isSpecialDataConsentGiven;
    if (isQuestionComplete(questions, question, profileAnswers) || consent) completed++;
    total++;
  });

  return { completed, total };
};
