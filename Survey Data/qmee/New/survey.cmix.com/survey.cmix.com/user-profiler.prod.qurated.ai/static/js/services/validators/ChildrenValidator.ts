import { SurveyQuestionType } from "../../types/Prescreener";
import { Child } from "../Children";

const ChildrenValidator = (question: SurveyQuestionType, answer: string) => {
  if (answer) {
    return Child.childrenFromKey(answer).every((child) => child.isValid());
  } else {
    return answer === "";
  }
};

export default ChildrenValidator;
