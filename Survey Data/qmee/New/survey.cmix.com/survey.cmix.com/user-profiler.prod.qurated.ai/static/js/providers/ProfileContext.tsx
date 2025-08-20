import React, {
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useContext,
} from "react";
import { SurveyQuestionType } from "../types/Prescreener";
import { getProfile } from "../services/Demographics";
import { RequestCtx } from "./RequestContext";
import { CategoryType } from "../types/Profile";
import { getAllProfileAnswers } from "../utils/getAnswers";
import {
  getProfileCompletionPercentage,
  getQuestionListCompletion,
} from "../utils/completionPercentage";
import { getNextValidQuestion } from "../utils/childQuestions";
import { sortByCategory } from "../utils/sortByCategory";
import {
  formatProfileToCategoryOrder,
  formatProfileToQuestionsHash,
} from "../utils/formatProfile";
import { isQuestionComplete } from "../utils/isQuestionsComplete";
import { TranslateContext } from "../components/common/TranslationWrapper";

interface ProfileAnswersType {
  [key: string]: string[] | undefined;
}

interface CompletionType {
  completed: number;
  total: number;
}

interface QuestionType {
  questions?: QuestionType[];
  key: string;
}
interface ProfileStructure {
  category: string;
  questions: QuestionType[];
}

interface ProfileContextType {
  refreshProfileData: () => void;
  profile: CategoryType[];
  specialDataConsentGiven: boolean;
  profileAnswers: ProfileAnswersType;
  consentQuestion?: SurveyQuestionType;
  getQuestionCompletion: (
    category: string
  ) => CompletionType | { [key: string]: undefined };
  activeCategory?: string;
  updateActiveCategory: (category: string | undefined) => void;
  profilePercentage?: number;
  getNextQuestion?: (
    question: SurveyQuestionType,
    currentAnswer: string | undefined
  ) => SurveyQuestionType | undefined;
  questions: { [key: string]: SurveyQuestionType };
  questionOrder?: ProfileStructure[];
  answers: ProfileAnswersType;
  getQuestionStatus: (
    isVisible: boolean,
    question: SurveyQuestionType
  ) => string;
}

export const ProfileContext = React.createContext<ProfileContextType>({
  refreshProfileData: () => {},
  profile: [],
  questions: {},
  specialDataConsentGiven: false,
  profileAnswers: {},
  getQuestionCompletion: (category: string) => ({}),
  updateActiveCategory: (category: string | undefined) => {},
  answers: {},
  getQuestionStatus: () => "",
});

const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const requestContext = React.useContext(RequestCtx);
  const { language } = useContext(TranslateContext);
  const [profile, setProfile] = useState<CategoryType[]>([]);
  const [answers, setAnswers] = useState<ProfileAnswersType>({});
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );
  const [categoryCompleted, setCategoryCompleted] = useState<boolean>(true);
  const [questionOrder, setQuestionOrder] = useState<ProfileStructure[]>([]);
  const [questions, setQuestions] = useState<{
    [key: string]: SurveyQuestionType;
  }>({});

  const refreshProfileData = useCallback(() => {
    getProfile(requestContext?.jwt, language).then((profile) => {
      setProfile(sortByCategory(profile));

      setQuestionOrder(formatProfileToCategoryOrder(profile));
      setQuestions(formatProfileToQuestionsHash(profile));
      setAnswers(getAllProfileAnswers(profile));
    });
  }, [requestContext?.jwt, language]);

  const consentQuestion = useMemo(() => {
    for (let i = 0; i < profile.length; i++) {
      const question = profile[i]["questions"].find(
        ({ key }) => key === "15b6"
      );
      if (question) return question;
    }
  }, [profile]);

  const specialDataConsentGiven =
    consentQuestion?.answered?.[0]?.key === "true";

  useEffect(() => {
    refreshProfileData();
  }, [refreshProfileData]);

  const profilePercentage = useMemo(
    () =>
      getProfileCompletionPercentage(
        profile,
        specialDataConsentGiven,
        questions,
        answers
      ),
    [profile, specialDataConsentGiven, questions, answers]
  );

  const getQuestionStatus = (
    isVisible: boolean,
    question: SurveyQuestionType
  ) => {
    if (!isVisible) return "hidden";

    const isComplete = !!isQuestionComplete(questions, question, answers);
    const hasAnswered = !!question.answered?.length;

    return isComplete ? "completed" : hasAnswered ? "answered" : "";
  };

  const getNextQuestion = useCallback(
    (
      currentQuestion: SurveyQuestionType,
      currentAnswer: string | undefined
    ) => {
      const categoryQuestions =
        profile.find(({ category }) => {
          category = category || "Other";

          return category === (currentQuestion.category || "Other");
        })?.questions || [];

      const consentGiven =
        currentQuestion.key === "15b6"
          ? currentAnswer === "true"
          : specialDataConsentGiven;

      const profileAnswers = {
        ...answers,
        [currentQuestion.key]: currentAnswer?.split(","),
      };

      return getNextValidQuestion(
        questions,
        categoryQuestions,
        currentQuestion,
        currentAnswer,
        consentGiven,
        profileAnswers
      );
    },
    [profile, specialDataConsentGiven, answers, questions]
  );

  const getQuestionCompletion = useCallback(
    (category: string) => {
      category = category || "Other";

      const categoryQuestions = profile.find(
        (categoryList) => (categoryList.category || "Other") === category
      )?.questions;

      if (!categoryQuestions) return {};

      const { total, completed } = getQuestionListCompletion(
        categoryQuestions,
        specialDataConsentGiven,
        questions,
        answers
      );

      return { total, completed };
    },
    [profile, specialDataConsentGiven, questions, answers]
  );

  const updateActiveCategory = (category: string | undefined) => {
    setActiveCategory(category);

    if (category) {
      const { total, completed } = getQuestionCompletion(category);
      setCategoryCompleted(total === completed);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      const { total, completed } = getQuestionCompletion(activeCategory);

      if (total === completed && !categoryCompleted) {
        setActiveCategory(undefined);
        setCategoryCompleted(true);
      } else if (total !== completed) {
        setCategoryCompleted(false);
      }
    }
  }, [
    activeCategory,
    categoryCompleted,
    getQuestionCompletion,
    specialDataConsentGiven,
  ]);

  return (
    <ProfileContext.Provider
      value={{
        profile: profile,
        refreshProfileData,
        questions,
        questionOrder,
        answers,
        profileAnswers: answers,
        specialDataConsentGiven,
        consentQuestion: consentQuestion,
        getQuestionCompletion: getQuestionCompletion,
        getQuestionStatus,
        activeCategory: activeCategory,
        updateActiveCategory: (category: string | undefined) =>
          updateActiveCategory(category),
        profilePercentage,
        getNextQuestion: getNextQuestion,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
