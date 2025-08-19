import { SurveyQuestionType } from "../types/Prescreener";
import findParentMismatch from "./parentMismatch";

interface QuestionDataType {
  [k: string]: SurveyQuestionType;
}

export const getNextQuestionIndex = (
  questionIndexes: string[],
  questionData: QuestionDataType,
  currentIndex: number
) => {
  for (let i = 1; i < questionIndexes.length; i++) {
    const index = (currentIndex + i) % questionIndexes.length;
    const status = questionData[questionIndexes[index]]?.status;
    if (
      status !== "prefilled" &&
      (index > currentIndex || status !== "valid") &&
      !findParentMismatch(questionData, questionIndexes[index])
    ) {
      return index;
    }
  }
  return currentIndex;
};

export const getPreviousQuestionIndex = (
  questionIndexes: string[],
  questionData: QuestionDataType,
  currentIndex: number
) => {
  for (let i = currentIndex - 1; i >= 0; i--) {
    const status = questionData[questionIndexes[i]]?.status;
    if (
      status !== "prefilled" &&
      !findParentMismatch(questionData, questionIndexes[i])
    )
      return i;
  }
  return currentIndex;
};
