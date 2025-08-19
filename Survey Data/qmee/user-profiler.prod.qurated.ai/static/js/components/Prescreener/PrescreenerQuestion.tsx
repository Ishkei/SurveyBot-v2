import { useState, useEffect, useRef, useCallback, useContext } from "react";
import QuestionControls from "../Questions/Questions";
import "./PrescreenerQuestion.scss";
import SurveyQuestionWrapper from "../Questions/SurveyQuestionWrapper";
import { AnswerKeyType, SurveyQuestionType } from "../../types/Prescreener";
import LoadingAnimation from "./LoadingAnimation";
import PrescreenerNextButton from "./PrescreenerNextButton";
import { AnswerType } from "../../types/Profile";
import { ReactComponent as LifepointsLoadingIcon } from "../../assets/LifepointsLoadingIcon.svg";
import { RequestCtx } from "../../providers/RequestContext";
const showSubmitKeys = [
  "accept",
  "multi_punch",
  "postcode",
  "input",
  "children",
  "address",
];

interface Props {
  updateAnswer: (q: SurveyQuestionType, k: string | undefined) => void;
  resetAnswer: (key: string) => void;
  isLastQuestion: boolean;
  isMostRecentQuestion: boolean;
  status: string | undefined;
  nextQuestion: () => void;
  answer: AnswerKeyType;
  activeQuestion: SurveyQuestionType;
  loading: boolean;
  isValidAnswer?: (a: AnswerType) => boolean;
}

const PrescreenerQuestion = ({
  updateAnswer,
  resetAnswer,
  isLastQuestion,
  isMostRecentQuestion,
  status,
  nextQuestion,
  answer,
  activeQuestion,
  loading,
  isValidAnswer,
}: Props) => {
  const { isLifepointsPanel } = useContext(RequestCtx);
  const [customTitle, setCustomTitle] = useState<string>("");
  const [submitButtonVisibilty, setSubmitButtonVisibilty] =
    useState<boolean>(true);
  const editedRef = useRef<boolean>(false);

  const showSubmit: () => boolean = useCallback(() => {
    return !!(
      activeQuestion?.type !== "date" &&
      (isLastQuestion ||
        !isMostRecentQuestion ||
        (activeQuestion?.type && showSubmitKeys.includes(activeQuestion.type)))
    );
  }, [activeQuestion?.type, isLastQuestion, isMostRecentQuestion]);

  const handleUpdate = async (
    questionKey: string,
    answer: string | undefined
  ) => {
    if (activeQuestion) {
      editedRef.current = true;
      updateAnswer(activeQuestion, answer);
    }
  };

  const handleSave = () => {
    if (status !== "valid") return;
    nextQuestion();
  };

  useEffect(() => {
    if (
      status === "prefilled" ||
      (status === "valid" && editedRef.current && !showSubmit())
    ) {
      editedRef.current = false;
      nextQuestion();
    }
  }, [status, showSubmit, nextQuestion]);

  const updateTitle = useCallback((title: string) => {
    setCustomTitle(title);
  }, []);

  const removeTitle = useCallback(() => {
    setCustomTitle("");
  }, []);

  useEffect(() => {
    editedRef.current = false;
    removeTitle();
    setSubmitButtonVisibilty(true);
  }, [activeQuestion?.key, removeTitle]);

  const changeConfirmButtonVisbility = (showSubmit: boolean) => {
    setSubmitButtonVisibilty(showSubmit);
  };

  if (!activeQuestion)
    return (
      <div className="loading-icon">
        {isLifepointsPanel ? <LifepointsLoadingIcon className="spinner-icon"/> : <LoadingAnimation />}
      </div>
    );

  return (
    <div className="survey-content-container">
      <SurveyQuestionWrapper
        customTitle={customTitle}
        question={activeQuestion}
        removeTitle={removeTitle}
      >
        <QuestionControls
          key={activeQuestion.key}
          question={activeQuestion}
          customTitle={customTitle}
          removeTitle={removeTitle}
          updateAnswer={handleUpdate}
          changeConfirmButtonVisbility={changeConfirmButtonVisbility}
          handleReset={() => resetAnswer(activeQuestion?.key)}
          updateTitle={updateTitle}
          status={status}
          resetStatus={() => resetAnswer(activeQuestion.key)}
          value={answer}
          isValidAnswer={isValidAnswer}
        />
      </SurveyQuestionWrapper>

      {showSubmit() &&
        (activeQuestion.key === "34e1" || status === "valid") &&
        submitButtonVisibilty && (
          <PrescreenerNextButton
            onConfirm={handleSave}
            loading={loading}
            status={status}
            activeQuestion={activeQuestion}
            isLastQuestion={isLastQuestion}
          />
        )}
    </div>
  );
};

export default PrescreenerQuestion;
