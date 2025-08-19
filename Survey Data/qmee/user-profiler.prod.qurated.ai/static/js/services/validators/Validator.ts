import InputValidator from "./InputValidator";
import BinaryValidator from "./BinaryValidator";
import AcceptValidator from "./AcceptValidator";
import SelectionValidator from "./SelectionValidator";
import ChildrenValidator from "./ChildrenValidator";
import DateValidator from "./DateValidator";
import MultiPunchValidator from "./MultiPunchValidator";
import { AnswerKeyType, SurveyQuestionType } from "../../types/Prescreener";

const VALIDATORS: {
  [k: string]: (
    question: SurveyQuestionType,
    answer: string
  ) => Promise<boolean> | boolean;
} = {
  input: InputValidator,
  selection: SelectionValidator,
  multi_punch: MultiPunchValidator,
  binary: BinaryValidator,
  children: ChildrenValidator,
  date: DateValidator,
  accept: AcceptValidator,
  undefined: SelectionValidator,
};

const isValid = (question: SurveyQuestionType, answer: AnswerKeyType) => {
  if(typeof answer == "undefined" || answer == null) return Promise.resolve(false);

  const validator = VALIDATORS[question.type];
  if (validator) {
    return Promise.resolve(validator(question, answer));
  } else {
    console.warn(
      `Validation of '${question.type}' question is not implemented`
    );
    return Promise.resolve(false);
  }
};

export default isValid;
