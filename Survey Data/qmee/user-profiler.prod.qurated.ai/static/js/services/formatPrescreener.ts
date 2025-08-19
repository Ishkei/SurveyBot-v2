import { SurveyQuestionListType, SurveyQuestionType } from "../types/Prescreener";

export const formatPrescreener = (questions: Array<SurveyQuestionType>) =>
  questions.reduce((surveyList: SurveyQuestionListType, question: SurveyQuestionType) => {
    surveyList[question.key] = question;
    return surveyList;
  }, {});

