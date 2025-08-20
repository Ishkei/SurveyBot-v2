import findParentMismatch from "../services/parentMismatch";
import { SurveyQuestionListType } from "../types/Prescreener";

export const isLastQuestionIndex = (
  currentIndex: number,
  questions: SurveyQuestionListType,
  questionKeys: string[]
) => {
  for (let i = 0; i < questionKeys.length; i++) {
    if (i === currentIndex) continue;
    const question = questions[questionKeys[i]];
    if (!question) continue;

    if (
      i < currentIndex &&
      (question.status === "valid" || question.status === "prefilled")
    ) {
      continue;
    }

    if (
      question.status !== "prefilled" &&
      (i >= currentIndex || question.status !== "valid") &&
      !findParentMismatch(questions, question.key)
    ) {
      return false;
    }
  }
  return true;
};

export const isStartQuestionIndex = (
  currentIndex: number,
  questions: SurveyQuestionListType,
  questionKeys: string[]
) => {
  if (currentIndex === 0) return true;
  for (let index = currentIndex - 1; index >= 0; index--) {
    const question = questions[questionKeys[index]];
    if (question?.status !== "prefilled") return false;
  }
  return true;
};

export const getNonPrefilledQuestionIndex = (
  currentKey: string,
  keys: string[],
  questions: SurveyQuestionListType
) => {
  let index = 0;

  for (let i = 0; i < keys.length; i++) {
    const question = questions[keys[i]];

    if (question?.key === currentKey) break;
    if (question?.status !== "prefilled") index++;
  }
  return index;
};
