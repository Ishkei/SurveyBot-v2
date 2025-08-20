import { findOptionsParentmatch } from "../services/extendedPrerequisiteMatch";
import { SurveyQuestionListType, SurveyQuestionType } from "../types/Prescreener";

export const includesCorrectParentAnswer = (
  required_answers: string[],
  parentAnswer: string | undefined
) => {
  if (!required_answers.length) return true;

  return required_answers.some((answer: string) =>
    parentAnswer?.includes(answer)
  );
};

interface ProfileAnswersType {
  [key: string]: string[] | undefined;
}

export const isQuestionComplete = (
  questions: SurveyQuestionListType,
  question: SurveyQuestionType,
  profileAnswers?: ProfileAnswersType
) => {
  const answer = profileAnswers?.[question.key];

  if (
    !findOptionsParentmatch(questions, question.key, profileAnswers)
  ) {
    return true;
  }

  if (!answer) return false;

  if (question.child_questions) {
    return question.child_questions.every((child) => {
      if (
        !findOptionsParentmatch(questions, child.key, profileAnswers)
      ){
        return true;  
      }

      return !!child.answered?.length;
    });
  }

  return typeof answer !== "undefined";
};
