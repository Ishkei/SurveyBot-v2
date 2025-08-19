import React, { useState, useCallback, useEffect, ReactNode, useContext } from "react";
import Modal from "react-modal";
import ProfileQuestionWrapper from "../Profile/ProfileQuestionWrapper";
import QuestionControls from "../Questions/Questions";
import { AddressAnswers, SurveyQuestionType } from "../../types/Prescreener";
import getQuestionStatus from "../../utils/getQuestionStatus";
import "./QuestionModal.scss";
import { getAnswerString } from "../../utils/getAnswers";
import Txt from "./Txt";
import Validator from "../../services/validators/Validator";
import {
  FULL_ADDRESS_CONFIRMATION_KEY,
  FULL_ADDRESS_CONSENT_KEY,
  VALID_NON_CONSENT_ADDRESS_QUESTIONS,
} from "../Questions/AddressQuestion";
import { RequestCtx } from "../../providers/RequestContext";

interface Props {
  visible: boolean;
  closeModal: () => void;
  question?: SurveyQuestionType;
  handleSave: (answer: string | AddressAnswers, closeModal?: boolean) => void;
  children?: ReactNode;
  header?: ReactNode;
  className?: string;
  overideContainer?: ReactNode | null;
}

interface AnswerType {
  [s: string]: { key: string | undefined; status?: string };
}

const optionalAnswerGiven = (
  question: SurveyQuestionType,
  answer: string | null | undefined,
  previousAnswer?: string | null
): boolean => {
  const { optional, answerKey: currentAnswerKey, status } = question;

  if(currentAnswerKey){
    previousAnswer = currentAnswerKey
  }

  if (!optional) return false;

  if (answer === null) return true;
  // handles a user completely ignoring a optional embedded question
  if (typeof answer === "undefined" && !previousAnswer && status !== "valid") {
    return true;
  }

  return false;
};

const formatAddressAnswers = (addressAnswers: AnswerType | undefined) => {
  const formattedAnswer: AddressAnswers = {};
  if (!addressAnswers) return formattedAnswer;

  for (const key in addressAnswers) {
    const answer = addressAnswers[key];
    if (answer?.key && answer?.status === "valid") {
      formattedAnswer[key] = answer.key;
    }
  }

  return formattedAnswer;
};

const QuestionModal = ({
  visible,
  closeModal,
  question,
  handleSave,
  children,
  className,
  header,
  overideContainer,
}: Props) => {
  const [customTitle, setCustomTitle] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [addressAnswers, setAddressAnswers] = useState<AnswerType | undefined>(
    {}
  );

  const { isMobiworkxPanel } = useContext(RequestCtx);

  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(true);

  const validateAnswer = useCallback(
    async (answer: string | undefined) => {
      if (!question || typeof answer === "undefined") {
        setStatus("");
        return;
      }

      setLoading(true);
      const status = await getQuestionStatus(question, answer);
      setStatus(status);
      setLoading(false);
    },
    [question]
  );

  const updateAddressAnswer = useCallback(
    async (updatedAddressAnswers: AddressAnswers) => {
      if (!question || typeof updatedAddressAnswers === "undefined") {
        return;
      }

      let valid = true;
      setLoading(true);
      setStatus("");

      const addressQuestions = question.address_questions || question.nested_questions;
      if (!addressQuestions) return;

      const newAddressAnswers: AnswerType = {};

      let showFullAddress = true;
      const addressConsentQuestion = addressQuestions.find(
        (q) => q.key === FULL_ADDRESS_CONSENT_KEY
      );

      if (addressConsentQuestion) {
        const consentKey = updatedAddressAnswers[FULL_ADDRESS_CONSENT_KEY];
        const previousConsentKey =
          addressAnswers?.[FULL_ADDRESS_CONSENT_KEY]?.key;

        if (typeof consentKey === "undefined") {
          showFullAddress =
            previousConsentKey === FULL_ADDRESS_CONFIRMATION_KEY;
        } else {
          showFullAddress = consentKey === FULL_ADDRESS_CONFIRMATION_KEY;
        }
      }

      for (let i = 0; i < addressQuestions.length; i++) {
        const currentQuestion: SurveyQuestionType = addressQuestions[i];
        const answerKey = updatedAddressAnswers[currentQuestion?.key];

        // Clears additional address answers is consent question is present and user has not given consent
        if (
          !showFullAddress &&
          !VALID_NON_CONSENT_ADDRESS_QUESTIONS.includes(currentQuestion?.key)
        ) {
          newAddressAnswers[currentQuestion?.key] = {
            key: undefined,
            status: undefined,
          };
          continue;
        }

        if (optionalAnswerGiven(currentQuestion, answerKey, addressAnswers?.[currentQuestion?.key]?.key)) {
          newAddressAnswers[currentQuestion?.key] = {
            key: answerKey,
            status: "valid",
          };
          continue;
        }

        if (typeof answerKey === "undefined") {
          const previousAnswerStatus =
            addressAnswers?.[currentQuestion?.key]?.status;

          if (previousAnswerStatus !== "valid") valid = false;
          continue;
        }

        const isValid = await Validator(currentQuestion, answerKey);

        newAddressAnswers[currentQuestion?.key] = {
          key: answerKey,
          status: isValid ? "valid" : "invalid",
        };

        if (!isValid) {
          valid = false;
          break;
        }
      }

      setAddressAnswers((prev) => ({ ...prev, ...newAddressAnswers }));
      setStatus(valid ? "valid" : "invalid");
      setLoading(false);
    },
    [question, addressAnswers]
  );

  const updateAnswer = useCallback(
    async (_questionKey: string, answer: string | AddressAnswers) => {
      if (typeof answer == "object") {
        updateAddressAnswer(answer);
      } else {
        setAnswer(answer);
        validateAnswer(answer);
      }
    },
    [validateAnswer, updateAddressAnswer]
  );

  const updateTitle = useCallback((title: string) => {
    setCustomTitle(title);
  }, []);

  const removeTitle = useCallback(() => {
    setCustomTitle("");
  }, []);

  const changeConfirmButtonVisbility = (showSubmit: boolean) => {
    setShowSubmitButton(showSubmit);
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const resetAnswer = useCallback(() => {
    setAnswer(undefined);
    setStatus("");
  }, []);

  const saveAnswer = async () => {
    if (status !== "valid") return;

    if (question?.key === "address") {
      setLoading(true);
      const formattedAnswer = formatAddressAnswers(addressAnswers);

      await handleSave(formattedAnswer, false);
      setLoading(false);
    } else if (typeof answer === "string") {
      setLoading(true);
      await handleSave(answer, false);
      setLoading(false);
    }
  };

  const saveAnswerAndClose = async () => {
    if(status !== "valid"){
      return closeModal();
    }

    if (question?.key === "address") {
      setLoading(true);
      const formattedAnswer = formatAddressAnswers(addressAnswers);

      await handleSave(formattedAnswer, true);
      setLoading(false);
    } else if (typeof answer === "string") {
      setLoading(true);
      await handleSave(answer, true);
      setLoading(false);
    }

    closeModal();
  }

  useEffect(() => {
    setAnswer(undefined);
    setAddressAnswers(undefined);
    setStatus("");
  }, [question?.key, resetAnswer]);

  useEffect(() => {
    if (!question?.key) return;

    setStatus("");

    if (question.key !== "address") {
      const answer = getAnswerString(question?.answered);
      setAnswer(answer);
      validateAnswer(answer);
    } else {
      setAddressAnswers({});
    }

    setCustomTitle("");
    setShowSubmitButton(true);
  }, [question, question?.key, visible, validateAnswer]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [visible]);

  return (
    <Modal
      isOpen={visible}
      className={`question-modal-container ${isMobiworkxPanel ? "mobiworkx-profiler" : ""}`}
      overlayClassName={`question-modal-background  ${isMobiworkxPanel ? "mobiworkx-profiler" : ""}`}
      onRequestClose={closeModal}
    >
      {header}
      <div className={`question-modal ${className} ${isMobiworkxPanel ? "mobiworkx-profiler" : ""}`}>
        {children}
        {overideContainer
          ? overideContainer
          : !!question?.key && (
              <>
                <ProfileQuestionWrapper
                  customTitle={customTitle}
                  question={question}
                  removeTitle={removeTitle}
                >
                  <QuestionControls
                    key={question.key}
                    question={question}
                    customTitle={customTitle}
                    removeTitle={removeTitle}
                    updateAnswer={updateAnswer}
                    changeConfirmButtonVisbility={changeConfirmButtonVisbility}
                    handleReset={resetAnswer}
                    updateTitle={updateTitle}
                    status={status}
                    resetStatus={resetAnswer}
                    value={answer}
                    addressValues={addressAnswers}
                    isProfileQuestion={true}
                  />
                </ProfileQuestionWrapper>
                <div className="next-button-container">
                  <button
                    disabled={
                      status !== "valid" || loading || !showSubmitButton
                    }
                    className="next-button"
                    onClick={saveAnswer}
                  >
                    <Txt component="span">
                      {loading ? "Loading..." : "Next"}
                    </Txt>
                  </button>

                  <button
                    disabled={
                      (status !== "" && status !== "valid") || loading || !showSubmitButton
                    }
                    className="save-and-exit-button"
                    onClick={saveAnswerAndClose}
                  >
                    <Txt component="span">
                      Save & Close
                    </Txt>
                  </button>
                </div>
              </>
            )}
      </div>
    </Modal>
  );
};

export default QuestionModal;