import { SurveyQuestionType } from "../../types/Prescreener";

const BinaryValidator = (question: SurveyQuestionType, answer: string) => {
  return answer === "true" || answer === "false";
};

export default BinaryValidator;
