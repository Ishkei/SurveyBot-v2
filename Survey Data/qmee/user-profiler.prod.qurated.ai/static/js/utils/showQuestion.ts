import { findOptionsParentmatch } from "../services/extendedPrerequisiteMatch";
import { SurveyQuestionType } from "../types/Prescreener";
import { AnswerType, QuestionType } from "../types/Profile";

interface ProfileAnswersType {
  [key: string]: string[] | undefined;
}

const showQuestion = (
  question: QuestionType,
  parentAnswer?: AnswerType[],
  isChild?: boolean,
  questions?: { [key: string]: SurveyQuestionType },
  answers?: ProfileAnswersType
) => {
  if (!isChild) return true;

  if(questions && question.options?.parents){
    return findOptionsParentmatch(questions, question.key, answers);
  }

  if (!question.requires?.length) return true;

  return !!parentAnswer?.some(
    ({ key }: { key: string }) => question.requires?.includes(key)
  );
};

export default showQuestion;
