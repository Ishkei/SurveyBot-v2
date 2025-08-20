import { Answer, SurveyQuestionType } from "../../types/Prescreener";
import SelectionValidator from "./SelectionValidator";

const NoneValidator = (question: SurveyQuestionType) => {
  if (question.answers) {
    return question.answers.some((a: Answer) => {
      if(a.hidden) return false

      return a.none_answer || a.key === "none"
    });
  } else {
    return false;
  }
};

const MultiPunchValidator = (question: SurveyQuestionType, answers: string) => {
  if (answers) {
    return answers
      .split(",")
      .every((answer) => SelectionValidator(question, answer));
  } else {
    return answers === "" && NoneValidator(question)
  }
};

export default MultiPunchValidator;