import { SurveyQuestionType } from "../types/Prescreener";
import { CategoryType } from "../types/Profile";
import { sortByCategory } from "./sortByCategory";

interface QuestionType {
  questions?: QuestionType[];
  key: string;
}

interface ProfileStructure {
  category: string;
  questions: QuestionType[];
}

export const formatProfileToCategoryOrder = (
  profile: CategoryType[]
): ProfileStructure[] => {
  const orderedCategory = sortByCategory(profile);

  const formattedProfile = orderedCategory.map((category) => {
    return {
      category: category.category,
      questions: category.questions.map((question) => ({
        key: question.key,
        questions: question?.child_questions?.map((question) => ({
          key: question.key,
        })),
      })),
    };
  });

  return formattedProfile;
};

export const formatProfileToQuestionsHash = (profile: CategoryType[]) => {
  const questions: { [l: string]: SurveyQuestionType } = {};

  profile.forEach((category: CategoryType) => {
    category.questions.forEach((question) => {
      questions[question.key] = question;

      question.child_questions?.forEach((childQuestion) => {
        questions[childQuestion.key] = childQuestion;
      });
    });
  });

  return questions;
};
