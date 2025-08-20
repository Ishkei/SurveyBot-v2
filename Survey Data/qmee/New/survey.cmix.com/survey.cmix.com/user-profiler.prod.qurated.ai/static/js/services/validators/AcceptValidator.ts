import { SurveyQuestionType } from "../../types/Prescreener";

const AcceptValidator = (question: SurveyQuestionType, answer: string) => {
  return answer === "accepted";
};

export default AcceptValidator;
