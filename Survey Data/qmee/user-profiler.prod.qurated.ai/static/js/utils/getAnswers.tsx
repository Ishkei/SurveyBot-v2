import { SurveyQuestionType } from "../types/Prescreener";
import { AnswerType, CategoryType } from "../types/Profile";

export const getAnswerString = (answers?: AnswerType[]) => {
  return answers?.reduce(
    (answered: string | undefined, answer: AnswerType) =>
      answered ? `${answered},${answer.key}` : answer.key,
    undefined
  );
};

export const getQuestionListAnswers = (questions?: SurveyQuestionType[]) => {
  let answers = {};

  questions?.forEach((question) => {
    const questionAnswers = question.answered?.map(({ key }) => key);
    const childQuestionAnswers = getQuestionListAnswers(
      question?.child_questions
    );

    answers = {
      ...answers,
      [question.key]: questionAnswers,
      ...childQuestionAnswers,
    };
  });

  return answers;
};

export const getAllProfileAnswers = (profile: CategoryType[]) => {
  let profileAnswers = {};

  profile.forEach((category) => {
    const questions = category["questions"];
    const answers = getQuestionListAnswers(questions);
    profileAnswers = { ...profileAnswers, ...answers };
  });

  return profileAnswers
};