import React, { useContext, useState } from "react";
import EditQuestionsModal from "../components/Profile/EditQuestionsModal";
import { AddressAnswers, SurveyQuestionType } from "../types/Prescreener";
import { submitAddressAnswers, submitQuestionAnswer } from "../services/Demographics";
import { RequestCtx } from "./RequestContext";
import { ProfileContext } from "./ProfileContext";
import hasSpecialDataQuestionRequirements from "../utils/hasSpecialDataQuestionRequirements";

interface EditQuestionContextType {
  visible: boolean;
  handleEditQuestion: (
    question: SurveyQuestionType
  ) => void;
  closeModal: () => void;
}

export const EditQuestionContext = React.createContext<EditQuestionContextType>(
  {
    visible: false,
    handleEditQuestion: () => {},
    closeModal: () => {},
  }
);

interface Props {
  children: React.ReactNode;
}

type ActiveQuestionType = SurveyQuestionType | undefined;

function EditQuestionProvider({ children }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [question, setQuestion] = useState<ActiveQuestionType>();
  const [showAccurateMatching, setShowAccurateMatching] =
    useState<boolean>(false);
  const { jwt } = useContext(RequestCtx);
  const {
    consentQuestion,
    specialDataConsentGiven,
    refreshProfileData,
    getNextQuestion
  } = useContext(ProfileContext);

  const activeQuestion = showAccurateMatching
    ? consentQuestion
    : question;

  const handleEditQuestion = (
    question: SurveyQuestionType
  ) => {
    setVisible(true);
    setQuestion(question);
    if (
      hasSpecialDataQuestionRequirements(question?.options?.parents) &&
      !specialDataConsentGiven
    ) {
      setShowAccurateMatching(true);
    }
  };

  const closeModal = () => {
    setVisible(false);
    setShowAccurateMatching(false);
    setQuestion(undefined);
  };

  const submitAnswer = async (answer: string | AddressAnswers) => {
    if (!activeQuestion?.key) return;

    if(typeof answer === "string") {
      await submitQuestionAnswer(
        jwt,
        activeQuestion?.key,
        answer
      );
    } else if(typeof answer === "object" && activeQuestion?.key === "address"){
      await submitAddressAnswers(
        jwt,
        activeQuestion?.key,
        answer
      );
    }
    refreshProfileData();

    if (showAccurateMatching) {
      setShowAccurateMatching(false);
      if (answer !== "true") closeModal();
      return;
    }

    if(typeof answer === "object"){
      answer = Object.values(answer).join(",");
    }

    const nextQuestion = getNextQuestion?.(activeQuestion, answer)
    if (!nextQuestion) return closeModal();

    setQuestion(nextQuestion);
  };

  return (
    <EditQuestionContext.Provider
      value={{
        closeModal,
        visible,
        handleEditQuestion,
      }}
    >
      <EditQuestionsModal
        key={activeQuestion?.key}
        question={activeQuestion}
        visible={visible && !!activeQuestion}
        closeModal={closeModal}
        submitAnswer={submitAnswer}
      />
      {children}
    </EditQuestionContext.Provider>
  );
}

export default EditQuestionProvider;
