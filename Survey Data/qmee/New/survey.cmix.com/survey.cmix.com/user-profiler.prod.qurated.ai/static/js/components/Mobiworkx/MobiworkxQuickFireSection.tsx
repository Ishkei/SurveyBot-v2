import { useState, useCallback, useEffect, useContext } from "react";
import { AddressAnswers, SurveyQuestionType } from "../../types/Prescreener";
// import "./EditQuestionsModal.scss";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import {
  getNextPriorityQuestion,
  submitAddressAnswers,
  submitQuestionAnswer,
} from "../../services/Demographics";
import { RequestCtx } from "../../providers/RequestContext";
import QuestionModal from "../common/QuestionModal";
import "./MobiworkxQuickFireSection.scss";
import { ProfileContext } from "../../providers/ProfileContext";
import Txt from "../common/Txt";
import { ReactComponent as NextIcon } from "../../assets/nextIcon.svg";
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

const MobiworkxQuickFireSection = () => {
  const requestContext = useContext(RequestCtx);
  const { refreshProfileData, profile } = useContext(ProfileContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { locale } = useContext(TranslateContext);
  const namespace = useNamespace();
  const { t } = useTranslation(namespace);

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

  let category = question?.category ? t(question.category) :  undefined

  return (
    <>
      <button className="mobiworkx-quick-fire-button" onClick={openModal}>
        
          <NextIcon />
      </button>

      <QuestionModal
        visible={visible}
        closeModal={closeModal}
        question={question}
        handleSave={handleSave}
        className="quick-fire-modal mobiworkx"
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
            <Txt component="h1">Profile Quick Boost</Txt>
            <Txt component="p">
              Complete all remaining profile questions and start recieving
              better surveys.
            </Txt>
          </div>
          <div>
            <div className="edit-question-category-header">
              <h6>
                {category} {!!question?.question_number && `(${question?.question_number})`}
              </h6>
            </div>
          </div>
        </>
      </QuestionModal>
    </>
  );
};

export default MobiworkxQuickFireSection;
