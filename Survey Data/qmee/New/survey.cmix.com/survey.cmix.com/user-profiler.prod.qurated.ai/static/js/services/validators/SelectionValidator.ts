import { Answer, Option, SurveyQuestionType } from "../../types/Prescreener";

const getId = (answer:  string | number | Option) =>
  typeof answer === "string" || typeof answer === "number"
    ? `${answer}`
    : answer.key || answer.label;

const SelectionValidator = (question: SurveyQuestionType, answer: string) => {
  if (question.answers) {
    return question.answers.some((a: Answer) => {
      if (a.options) {
        return a.options.some((o: string | number | Option) => getId(o) === answer);
      } else {
        return getId(a) === answer;
      }
    });
  } else {
    return false;
  }
};

export default SelectionValidator