import { SurveyQuestionListType } from "../types/Prescreener";
import findParentMismatch from "./parentMismatch";

const completionCheck = (questions: SurveyQuestionListType): boolean => {
  for (const key in questions) {
    const question = questions[key];
    const status = question.status;

    if (
      status !== "valid" &&
      status !== "prefilled" &&
      !findParentMismatch(questions, question.key)
    ) {
      return false;
    }
  }
  return true;
};

export default completionCheck;
