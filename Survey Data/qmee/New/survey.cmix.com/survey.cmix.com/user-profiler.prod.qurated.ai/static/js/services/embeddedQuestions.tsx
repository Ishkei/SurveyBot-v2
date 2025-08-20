import { SurveyQuestionListType } from "../types/Prescreener";

export const updateEmebeddedQuestionData = (
  questions: SurveyQuestionListType,
  parentKey: string,
  embeddedKey: string,
  updatedData: { [k: string]: string | boolean | undefined | null }
) => {
  const embeddedQuestions = questions[parentKey]?.address_questions || questions[parentKey]?.nested_questions || [];
  const questionIndex = embeddedQuestions?.findIndex(
    ({ key }) => key === embeddedKey
  );
  if (questionIndex === -1) return questions;

  embeddedQuestions[questionIndex] = {
    ...embeddedQuestions[questionIndex],
    ...updatedData,
  };

  const updatedQuestions = {
    ...questions,
    [parentKey]: {
      ...questions[parentKey],
    },
  };

  if (questions[parentKey].address_questions) {
    updatedQuestions[parentKey].address_questions = embeddedQuestions;
  } else {
    updatedQuestions[parentKey].nested_questions = embeddedQuestions;
  }

  return updatedQuestions;
};
