import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { RequestCtx } from "../providers/RequestContext";
import PrescreenerQuestion from "../components/Prescreener/PrescreenerQuestion";
import "./Prescreener.scss";
import {
  AnswerKeyType,
  SurveyQuestionListType,
  SurveyQuestionType,
} from "../types/Prescreener";
import {
  getNextQuestionIndex,
  getPreviousQuestionIndex,
} from "../services/getActiveIndex";
import {
  getPrescreener,
  getUserProfileInfo,
  submitEndlessQuestions,
  submitPrescreener,
} from "../services/Demographics";
import Validator from "../services/validators/Validator";
import { formatPrescreener } from "../services/formatPrescreener";
import ProgressLoader from "../components/Prescreener/ProgressLoader";
import PrescreenerPages from "../components/PrescreenerPages";
import { Link, useLocation } from "react-router-dom";
import UserTracking from "../components/UserTracking/UserTracking";
import TrackingProvider from "../components/UserTracking/TrackingProvider";
import { PopupMessageContext } from "../providers/PopupMessageContext";
import RedirectPage from "../components/Prescreener/RedirectPage";
import {
  getNonPrefilledQuestionIndex,
  isLastQuestionIndex,
  isStartQuestionIndex,
} from "../utils/questionIndex";
import Txt from "../components/common/Txt";
import { updateEmebeddedQuestionData } from "../services/embeddedQuestions";
import useLogger from "../services/useLogger";
import profilerFinishedRedirect from "../utils/ProfilerFinishedRedirect";
import { TranslateContext } from "../components/common/TranslationWrapper";
import { AnswerType } from "../types/Profile";
import ExitModal from "../components/common/ExitModal";
import {
  FULL_ADDRESS_CONFIRMATION_KEY,
  FULL_ADDRESS_CONSENT_KEY,
  VALID_NON_CONSENT_ADDRESS_QUESTIONS,
} from "../components/Questions/AddressQuestion";

interface UpdatedValuesType {
  status?: string;
  answerKey?: string;
}

interface AddressAnswers {
  [s: string]: AnswerKeyType;
}

interface UserProfileInfoType {
  remainingQuestionCount?: number;
  percentage: number;
}

export const Prescreener = () => {
  const requestContext = useContext(RequestCtx);
  const { language } = useContext(TranslateContext);
  const [questions, setQuestions] = useState<SurveyQuestionListType>({});
  const [questionKeys, setQuestionKeys] = useState<Array<string>>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const { showMessage } = useContext(PopupMessageContext);
  const [loading, setLoading] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [exitModalVisibilty, setExitModalVisibility] = useState(false);

  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileInfoType>();
  const [findingSurveys, setFindingSurveys] = useState<boolean>(false);
  const [surveyFound, setSurveyFound] = useState<boolean>(false);
  const [completedQuestions, setCompletedQuestions] = useState<Array<string>>(
    []
  );
  const isMounted = useRef<boolean>(true);
  const editedRef = useRef<boolean>(false);
  const activeQuestion = questions?.[questionKeys[activeQuestionIndex]];
  const { search } = useLocation();
  const { logError, logEvent, logUpdateAnswer } = useLogger(
    requestContext?.jwt
  );

  const updateQuestion = useCallback(
    (key: string, updatedValues: UpdatedValuesType) => {
      setQuestions((prevData) => ({
        ...prevData,
        [key]: { ...prevData[key], ...updatedValues },
      }));
    },
    []
  );

  const updateEmbeddedQuestion = useCallback(
    (
      key: string,
      childKey: string,
      status: string | undefined,
      answerKey: AnswerKeyType
    ) => {
      setQuestions((prevData) =>
        updateEmebeddedQuestionData(prevData, key, childKey, {
          status,
          answerKey,
        })
      );
    },
    []
  );

  const redirectUser = useCallback(
    (status: string, showRedirectPage: boolean = true) => {
      if (isMounted.current && showRedirectPage) {
        setLoading(false);
        setFindingSurveys(true);
        setSurveyFound(true);
      }
      profilerFinishedRedirect(requestContext.jwt, status);
    },
    [requestContext.jwt]
  );

  const optionalAnswerGiven = (
    question: SurveyQuestionType,
    answer: string | null | undefined
  ): boolean => {
    const { optional, answerKey: previousAnswer, status } = question;

    if (!optional) return false;

    if (answer === null) return true;
    // handles a user completely ignoring a optional embedded question
    if (
      typeof answer === "undefined" &&
      !previousAnswer &&
      status !== "valid"
    ) {
      return true;
    }

    return false;
  };

  const updateAddressAnswer = useCallback(
    async (addressQuestion: SurveyQuestionType, answerKey: AddressAnswers) => {
      let status;
      let valid = true;
      const { key: parentKey } = addressQuestion;

      const questions =
        addressQuestion.address_questions ||
        addressQuestion.nested_questions ||
        [];
      updateQuestion(parentKey, { status: "loading" });

      let showFullAddress = true;
      const addressConsentQuestion = questions.find(
        (q) => q.key === FULL_ADDRESS_CONSENT_KEY
      );

      const multipleAnswers = Object.keys(answerKey).length > 1;

      if (addressConsentQuestion) {
        const consentKey = answerKey[FULL_ADDRESS_CONSENT_KEY];
        const previousConsentKey = addressConsentQuestion.answerKey;

        if (typeof consentKey === "undefined") {
          showFullAddress =
            previousConsentKey === FULL_ADDRESS_CONFIRMATION_KEY;
        } else {
          showFullAddress = consentKey === FULL_ADDRESS_CONFIRMATION_KEY;
        }
      }

      try {
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];
          const { key, status: questionStatus } = question;
          const updatedAnswer = answerKey[key];

          if (
            !showFullAddress &&
            !VALID_NON_CONSENT_ADDRESS_QUESTIONS.includes(key)
          ) {
            updateEmbeddedQuestion(parentKey, key, undefined, undefined); // clear address answer
            continue;
          }

          if (optionalAnswerGiven(question, updatedAnswer)) {
            updateEmbeddedQuestion(parentKey, key, "valid", undefined);
            continue;
          }

          if (typeof updatedAnswer === "undefined") {
            if (questionStatus !== "valid") valid = false;
            continue;
          }

          updateEmbeddedQuestion(parentKey, key, "loading", updatedAnswer);

          const isValid = await Validator(question, updatedAnswer);
          const childStatus = isValid ? "valid" : "invalid";

          updateEmbeddedQuestion(parentKey, key, childStatus, updatedAnswer);

          if (!isValid) {
            valid = false;
            if (!multipleAnswers) break;
          }
        }

        status = valid ? "valid" : "invalid";
      } catch (error: any) {
        status = "validation failed";
        logError("updateAddressAnswer", error, { key: parentKey });
      }

      updateQuestion(parentKey, { status });
    },
    [logError, updateEmbeddedQuestion, updateQuestion]
  );

  const updateAnswer = useCallback(
    async (
      question: SurveyQuestionType,
      answerKey: string | undefined | AddressAnswers
    ) => {
      const { key, skippable } = question;
      let status;
      editedRef.current = true;

      if (skippable && answerKey == null) {
        updateQuestion(key, { status: "valid", answerKey });
        return;
      }

      if (typeof answerKey == "object") {
        return updateAddressAnswer(question, answerKey);
      }

      updateQuestion(key, { status: "loading", answerKey });

      try {
        const valid = await Validator(question, answerKey);
        status = valid ? "valid" : "invalid";

        if (!valid) {
          logUpdateAnswer(key, status, { prefilled: false });
        }
      } catch (error: any) {
        logError("updateAnswer", error, { key });
        status = "validation failed";
      }

      updateQuestion(key, { status, answerKey });
    },
    [updateQuestion, logError, logUpdateAnswer, updateAddressAnswer]
  );

  const updatePrefilledAnswer = useCallback(
    async (question: SurveyQuestionType, answerKey: string) => {
      let status;
      try {
        updateQuestion(question.key, { status: "loading", answerKey });
        const valid = await Validator(question, answerKey);
        if (valid) status = "prefilled";
      } finally {
        updateQuestion(question.key, { status, answerKey });
        logUpdateAnswer(question.key, status, { prefilled: true });
      }
    },
    [updateQuestion, logUpdateAnswer]
  );

  const resetAnswer = (questionKey: string) => {
    updateQuestion(questionKey, {
      status: undefined,
      answerKey: undefined,
    });
  };

  const addQuestions = (questionList: SurveyQuestionType[]) => {
    const newKeys: Array<string> = [];

    questionList.forEach((question: SurveyQuestionType) => {
      if (!questions[question.key]) newKeys.push(question.key);
    });

    setQuestions((questionData: SurveyQuestionListType) => {
      questionList.forEach((question: SurveyQuestionType) => {
        if (!questionData[question.key]) {
          questionData[question.key] = question;
        }
      });
      return questionData;
    });
    setQuestionKeys((keys) => [...keys, ...newKeys]);

    return newKeys;
  };

  // For updating questions in the endless profiler
  const submitSingleQuestion = async () => {
    try {
      const getMoreQuestions =
        isLastQuestion || questionCount() - nonPrefilledQuestionIndex() < 4;

      const questions = await submitEndlessQuestions(
        requestContext.jwt,
        { [activeQuestion.key]: activeQuestion },
        getMoreQuestions,
        10
      );

      if ((!questions || !questions.length) && getMoreQuestions) return redirectUser("complete");

      const newQuestions = addQuestions(questions);
      if (!newQuestions.length && isLastQuestion) {
        return redirectUser("complete");
      }
    } catch (error: any) {
      console.error(error);
      logError("postAnswer", error, { key: activeQuestion.key });
    }
  };

  const submitAllAnswers = async () => {
    logEvent("prescreener_submit_button_clicked", {
      questionKey: activeQuestion.key,
    });

    setLoading(true);
    if (
      requestContext.miniScreener === "false" &&
      !requestContext.endlessProfiler
    ) {
      setFindingSurveys(true);
    }
    try {
      await submitPrescreener(
        requestContext.jwt,
        questions,
        requestContext.miniScreener,
        false,
        requestContext.encodedProfile,
        requestContext.profileIV
      );

      logEvent("update_demographic_question", {
        questionKey: "submit-prescreener-survey",
      });

      return redirectUser("complete");
    } catch (error: any) {
      console.error(error.message);
      showMessage(error.message, "error");
      setLoading(false);
      setFindingSurveys(false);
      logError("submitAnswer", error);
    }
  };

  const updateCompletedQuestions = (key: string) => {
    if (completedQuestions.includes(key)) return;
    setCompletedQuestions((questionKeys) => [...questionKeys, key]);
  };

  const prefillQuestions = useCallback(
    (questions: Array<SurveyQuestionType>) => {
      questions.forEach((question) => {
        const answer = question?.answer?.key || question?.answered?.[0]?.key;
        if (typeof answer !== "undefined" && !question?.answerKey) {
          updatePrefilledAnswer(question, answer);
        }
      });
    },
    [updatePrefilledAnswer]
  );

  const nextQuestion = () => {
    if (!activeQuestion?.key && activeQuestion?.answerKey) return;

    if (editedRef.current && isMostRecentQuestion) {
      if (
        (activeQuestion.type === "selection" ||
          activeQuestion.type === "multi_punch") &&
        !activeQuestion?.parents?.["if"]?.["15b6"]
      ) {
        logUpdateAnswer(activeQuestion.key, "valid", {
          prefilled: false,
          answerKey: activeQuestion.answerKey || "",
        });
      } else {
        logUpdateAnswer(activeQuestion.key, "valid", { prefilled: false });
      }
    }

    updateCompletedQuestions(activeQuestion?.key);

    if (isLastQuestion && !requestContext.endlessProfiler) {
      return submitAllAnswers();
    }

    if (requestContext.endlessProfiler && editedRef.current) {
      submitSingleQuestion();
    }

    setActiveQuestionIndex((currentIndex) => {
      const nextQuestionIndex = getNextQuestionIndex(
        questionKeys,
        questions,
        currentIndex
      );

      logEvent("prescreener_question_change", {
        type: "Next Question",
        from: questionKeys[currentIndex],
        to: questionKeys[nextQuestionIndex],
      });

      return nextQuestionIndex;
    });
  };

  const previousQuestion = () => {
    if (!questions) return;

    setActiveQuestionIndex((currentIndex) => {
      const previousIndex = getPreviousQuestionIndex(
        questionKeys,
        questions,
        currentIndex
      );

      logEvent("prescreener_question_change", {
        type: "Previous Question",
        from: questionKeys[currentIndex],
        to: questionKeys[previousIndex],
      });

      return previousIndex;
    });
  };

  const isMostRecentQuestion = !!(
    activeQuestion?.key && !completedQuestions.includes(activeQuestion.key)
  );

  const isStartQuestion = useMemo(
    () => isStartQuestionIndex(activeQuestionIndex, questions, questionKeys),
    [activeQuestionIndex, questions, questionKeys]
  );

  const isLastQuestion = useMemo(
    () => isLastQuestionIndex(activeQuestionIndex, questions, questionKeys),
    [activeQuestionIndex, questions, questionKeys]
  );

  const nonPrefilledQuestionIndex = useCallback((): number => {
    return getNonPrefilledQuestionIndex(
      activeQuestion?.key,
      questionKeys,
      questions
    );
  }, [questionKeys, questions, activeQuestion?.key]);

  const questionCount = useCallback((): number => {
    return questionKeys.reduce((count, key) => {
      return questions[key]?.status !== "prefilled" ? ++count : count;
    }, 0);
  }, [questionKeys, questions]);

  const percentage = useMemo(
    () => (nonPrefilledQuestionIndex() / questionCount()) * 100,
    [nonPrefilledQuestionIndex, questionCount]
  );

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!requestContext.endlessProfiler) return;

    (async () => {
      const userProfileInfo = await getUserProfileInfo(requestContext.jwt);
      if (
        typeof userProfileInfo?.profile_completion_percentage === "undefined"
      ) {
        return;
      }

      setUserProfileInfo({
        remainingQuestionCount: userProfileInfo?.remaining_question_count,
        percentage: userProfileInfo?.profile_completion_percentage,
      });
    })();
  }, [requestContext.endlessProfiler, requestContext.jwt]);

  const currentEstimatedPercentage = useMemo(() => {
    if (!requestContext.endlessProfiler || !userProfileInfo) return undefined;

    const { remainingQuestionCount, percentage: initialPercentage } =
      userProfileInfo;

    if (!remainingQuestionCount) return undefined;

    const totalAnswers =
      (remainingQuestionCount * 100) / (100 - initialPercentage);
    const totalAnswered =
      nonPrefilledQuestionIndex() + (totalAnswers - remainingQuestionCount);

    return (totalAnswered * 100) / totalAnswers;
  }, [
    nonPrefilledQuestionIndex,
    userProfileInfo,
    requestContext.endlessProfiler,
  ]);

  useEffect(() => {
    if (language && requestContext.jwt && !questionKeys?.length) {
      (async () => {
        try {
          const questions = await getPrescreener(
            requestContext.jwt,
            requestContext.encodedProfile,
            requestContext.profileIV,
            requestContext.endlessProfiler ? 10 : 3,
            language
          );

          if (!questions || !questions.length) {
            return redirectUser("no-questions", false);
          }
          if (!isMounted.current) return;

          setQuestions(formatPrescreener(questions));
          setShowProgressBar(true);
          prefillQuestions(questions);
          setQuestionKeys(questions.map(({ key }) => key));

          logEvent("update_demographic_question", {
            questionKey: questionKeys.includes("3f22")
              ? "start-prescreener-survey"
              : "start-survey",
          });
        } catch (error: any) {
          console.error(error.message);
        }
      })();
    }
  }, [
    requestContext,
    questionKeys,
    prefillQuestions,
    redirectUser,
    logEvent,
    language,
  ]);

  useEffect(() => {
    editedRef.current = false;
    window.scroll(0, 0);
  }, [activeQuestion?.key]);

  const trackingEnabled = Boolean(
    process.env.NODE_ENV === "production" &&
      process.env.REACT_APP_TRACKING_ENABLED === "true" &&
      requestContext.provider === "pch" &&
      questionKeys?.length
  );

  const closeRedirectPage = useCallback(() => {
    setFindingSurveys(false);
  }, []);

  const answerMatchesResponseOptionFilter = (answer: AnswerType) => {
    if (!answer.response_option_filter) return true;

    const requirement = answer.response_option_filter;
    const questionKey = requirement.question_id;
    const requiredAnswer = requirement.answer_id;

    let requiredQuestion = questions[questionKey];

    if (!requiredQuestion && questions["address"]) {
      const addressQuestions =
        questions["address"]?.address_questions ||
        questions["address"]?.nested_questions;
      const embeddedQuestion = addressQuestions?.find(
        (question) => question.key === questionKey
      );
      if (embeddedQuestion) requiredQuestion = embeddedQuestion;
    }

    if (!requiredQuestion?.answerKey) return true;

    const userAnswers = requiredQuestion?.answerKey?.split(",") || [];

    if (!userAnswers.length) return false;
    return userAnswers?.some((ans) => ans === requiredAnswer);
  };

  const isValidAnswer = (answer: AnswerType) => {
    if (answer.hidden) return false;

    return answerMatchesResponseOptionFilter(answer);
  };

  return (
    <div className={`${requestContext.isLifepointsPanel && "lifepoints"}`}>
      <TrackingProvider trackingEnabled={trackingEnabled}>
        <UserTracking trackingEnabled={trackingEnabled} />
        <ExitModal
          visible={exitModalVisibilty}
          onCancel={() => {
            setExitModalVisibility(false);
          }}
          percentage={currentEstimatedPercentage}
        />
        <PrescreenerPages shouldRedirect={!!questionKeys.length}>
          {findingSurveys && !requestContext.endlessProfiler ? (
            <RedirectPage
              cancelLoading={closeRedirectPage}
              surveyFound={surveyFound}
            />
          ) : (
            <div
              className={`main ${
                requestContext.isLifepointsPanel && "lifepoints-profiler"
              } ${requestContext.isMobiworkxPanel && "mobiworkx-profiler"}`}
            >
              {showProgressBar && (
                <ProgressLoader
                  isStartQuestion={isStartQuestion}
                  isLastQuestion={
                    isLastQuestion &&
                    typeof activeQuestion?.answerKey !== "undefined"
                  }
                  percentage={
                    requestContext.endlessProfiler
                      ? currentEstimatedPercentage
                      : percentage
                  }
                  showLoader={
                    !requestContext.endlessProfiler ||
                    !!currentEstimatedPercentage
                  }
                  previousQuestion={previousQuestion}
                  provider={requestContext.provider}
                  endlessProfiler={requestContext.endlessProfiler}
                  onExit={() => {
                    setExitModalVisibility(true);
                  }}
                />
              )}

              <PrescreenerQuestion
                isValidAnswer={isValidAnswer}
                updateAnswer={updateAnswer}
                resetAnswer={resetAnswer}
                isLastQuestion={isLastQuestion}
                isMostRecentQuestion={isMostRecentQuestion}
                status={activeQuestion?.status}
                nextQuestion={nextQuestion}
                answer={activeQuestion?.answerKey}
                activeQuestion={activeQuestion}
                loading={loading}
              />

              <footer className="footer">
                <p className="qurated-footer-text">© Qurated 2022</p>
                <div className="footer-link-container">
                  <Link to={`/prescreener/terms${search}`}>
                    <Txt>Terms of service</Txt>
                  </Link>
                  <Link to={`/prescreener/privacy${search}`}>
                    <Txt>Privacy Policy</Txt>
                  </Link>
                </div>
              </footer>
            </div>
          )}
        </PrescreenerPages>
      </TrackingProvider>
    </div>
  );
};

export default Prescreener;
