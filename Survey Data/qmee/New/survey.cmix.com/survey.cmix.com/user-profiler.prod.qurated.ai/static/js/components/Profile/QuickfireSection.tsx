import { useState, useCallback, useEffect, useContext } from "react";
import { AddressAnswers, SurveyQuestionType } from "../../types/Prescreener";
import "./EditQuestionsModal.scss";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import {
  getNextPriorityQuestion,
  submitAddressAnswers,
  submitQuestionAnswer,
} from "../../services/Demographics";
import { RequestCtx } from "../../providers/RequestContext";
import QuestionModal from "../common/QuestionModal";
import { ReactComponent as QuickFireHeaderIcon } from "../../assets/PopUpHeaderIcon.svg";
import "./QuickFireSection.scss";
import { ReactComponent as BoostIcon } from "../../assets/BoostIcon.svg";
import { ProfileContext } from "../../providers/ProfileContext";
import Txt from "../common/Txt";
import { TranslateContext, useNamespace } from "../common/TranslationWrapper";
import { useTranslation } from "react-i18next";

const LoadingComponent = (
  <div className="question-modal-loading-container">
    <div className="question-modal-loader-spinner" />
  </div>
);

const NoQuestionComponent = (
  <div className="quick-fire-no-question-container">
    <Txt component="h2">Your profile seems up-to-date</Txt>
    <Txt component="p">
      Don't forget, if there's been any changes to your profile, such as your
      Job, Lifestyle, etc. you can still update your details by editing its
      section
    </Txt>
  </div>
);

const QuickFireSection = () => {
  const requestContext = useContext(RequestCtx);
  const { refreshProfileData, profile } = useContext(ProfileContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { locale } = useContext(TranslateContext);

  const [question, setQuestion] = useState<SurveyQuestionType | undefined>(
    undefined
  );

  const getQuestion = useCallback(async () => {
    setLoading(true);
    const question = await getNextPriorityQuestion(requestContext?.jwt, locale);
    setQuestion(question);
    setLoading(false);
  }, [requestContext?.jwt, locale]);

  useEffect(() => {
    if (visible) {
      getQuestion();
    } else {
      setLoading(true);
    }
  }, [visible, getQuestion]);

  const handleSave = async (
    answerKey: string | AddressAnswers,
    shouldCloseModal = false
  ) => {
    if (typeof answerKey === "undefined" || !question?.key) return;

    try {
      if (typeof answerKey === "string") {
        await submitQuestionAnswer(
          requestContext?.jwt,
          question.key,
          answerKey
        );
      } else if (typeof answerKey === "object" && question?.key === "address") {
        await submitAddressAnswers(
          requestContext?.jwt,
          question.key,
          answerKey
        );
      }
      refreshProfileData();

      if (shouldCloseModal) {
        setVisible(false);
      } else {
        await getQuestion();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  const overideContainer =
    typeof question === "undefined"
      ? loading
        ? LoadingComponent
        : NoQuestionComponent
      : null;

  if (!profile.length) return null;

  return (
    <>
      <button className="quick-fire-button" onClick={openModal}>
        <Txt component="span">Quick fire</Txt>
        <span className="boost-icon">
          <BoostIcon />
        </span>
      </button>

      <QuestionModal
        visible={visible}
        closeModal={closeModal}
        question={question}
        handleSave={handleSave}
        className="quick-fire-modal"
        header={<QuickFireHeaderIcon className="quick-fire-header-icon" />}
        overideContainer={overideContainer}
      >
        <>
          <div className="quick-fire-header-container">
            <button
              onClick={closeModal}
              className="quick-fire-close-button"
              title="close"
            >
              <CloseIcon />
            </button>
            <Txt component="h1">Quick-fire Boost</Txt>
            <Txt component="p">
              Boost your profile and start receiving better surveys
            </Txt>
          </div>
        </>
      </QuestionModal>
    </>
  );
};

export default QuickFireSection;
