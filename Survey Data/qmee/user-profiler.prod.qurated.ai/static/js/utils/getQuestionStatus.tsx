import { SurveyQuestionType } from "../types/Prescreener";
import Validator from "../services/validators/Validator";

const getQuestionStatus = async (
  question: SurveyQuestionType,
  answer: string | undefined
) => {
  let status;

  try {
    status = (await Validator(question, answer)) ? "valid" : "invalid";
  } catch (error: any) {
    status = "validation failed";
  }
  return status;
};

export default getQuestionStatus;
