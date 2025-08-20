import { findOptionsParentmatch } from "../services/extendedPrerequisiteMatch";
import { SurveyQuestionListType, SurveyQuestionType } from "../types/Prescreener";
import { getAnswerString } from "./getAnswers";
import hasSpecialDataQuestionRequirements from "./hasSpecialDataQuestionRequirements";

interface ProfileAnswersType {
  [key: string]: string[] | undefined;
}

const getFirstValidQuestion = (
  questions: SurveyQuestionListType,
  categoryQuestions: SurveyQuestionType[],
  startIndex: number,
  parentAnswer: string | undefined = undefined,
  consentGiven: boolean = false,
  profileAnswers?: ProfileAnswersType
) => {
  for(let i = 0; i < categoryQuestions.length - 1; i++){
    let index = (i + startIndex) % categoryQuestions.length;
    const question = categoryQuestions[index];
    if (
      !question.answered?.length &&
      (question.editable || question.editable_by_panelist) &&
      (consentGiven || !hasSpecialDataQuestionRequirements(question.options?.parents)) &&
      findOptionsParentmatch(questions, question.key, profileAnswers)
    ) return question;

    if(question.child_questions?.length && question.answered?.length){
      const answered = getAnswerString(question.answered)
      const validChildQuestion = getFirstValidChildQuestion(questions, question, answered, consentGiven, profileAnswers);
      if(validChildQuestion) return validChildQuestion;
    }
  }
}

export const getNextValidQuestion =  (
    questions: SurveyQuestionListType,
    questionList: SurveyQuestionType[],
    currentQuestion: SurveyQuestionType,
    currentAnswer: string | undefined,
    consentGiven: boolean,
    profileAnswers?: ProfileAnswersType
  ) => {

  const startIndex = questionList.findIndex(({ key }) => key === currentQuestion.key)
  if(startIndex !== -1){
    const question = questionList[startIndex];

    if(question.child_questions?.length){
      const validChildQuestion = getFirstValidChildQuestion(questions, question, currentAnswer, consentGiven, profileAnswers);
      if(validChildQuestion) return validChildQuestion;
    }

    return getFirstValidQuestion(questions, questionList, startIndex + 1, undefined, consentGiven, profileAnswers)
  }

  for(let i = 0; i < questionList.length; i++){
    const question = questionList[i];
    const childQuestions = question.child_questions;

    if(question.key === currentQuestion.key){
      if(childQuestions?.length){
        const validChildQuestion = getFirstValidChildQuestion(questions, question, currentAnswer, consentGiven, profileAnswers);
        if(validChildQuestion) return validChildQuestion;
      }

      return getFirstValidQuestion(questions, questionList, i + 1, undefined, consentGiven, profileAnswers)
    }

    if(!childQuestions?.length) continue;

    const startIndex = childQuestions.findIndex(({ key }) => key === currentQuestion.key)
    if(startIndex === -1) continue;

    const answered = getAnswerString(question.answered)
    const nextQuestion = getFirstValidQuestion(questions, childQuestions, startIndex + 1, answered, consentGiven, profileAnswers)
    if(nextQuestion) return nextQuestion;

    return getFirstValidQuestion(questions, questionList, i + 1, undefined, consentGiven, profileAnswers)
  }
}

export const getFirstValidChildQuestion = (
  questions: SurveyQuestionListType,
  parentQuestion: SurveyQuestionType,
  parentAnswer: string | undefined,
  consentGiven: boolean,
  profileAnswers?: ProfileAnswersType
) => {
  const childQuestions = parentQuestion.child_questions;
  if (!childQuestions?.length) return undefined;
  if (!consentGiven && !!hasSpecialDataQuestionRequirements(parentQuestion.options?.parents)) return undefined;

  for (let i = 0; i < childQuestions?.length; i++) {
    const childQuestion = childQuestions[i];
    if (
      (!!consentGiven || !hasSpecialDataQuestionRequirements(childQuestion.options?.parents)) &&
      findOptionsParentmatch(questions, childQuestion.key, profileAnswers) &&
      !childQuestion.answered?.length
    ) {
      return childQuestion;
    }
  }
};