import { AddressAnswers, SurveyQuestionType } from "../../types/Prescreener";
import QuestionModal from "../common/QuestionModal";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import { RequestCtx } from "../../providers/RequestContext";
import { useContext } from "react";

interface Props {
  question?: SurveyQuestionType;
  visible: boolean;
  submitAnswer: (answer: string | AddressAnswers) => void;
  closeModal: () => void;
}

const EditMobiworkxQuestionsModal = ({
  question,
  visible,
  closeModal,
  submitAnswer,
}: Props) => {
  const { provider } = useContext(RequestCtx);

  const handleSave = async (answers?: string | AddressAnswers) => {
    if (typeof answers === "undefined") return;

    try {
      await submitAnswer(answers);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const header = (
    <button
      onClick={closeModal}
      className="edit-modal-close-button"
      title="Close editing question"
    >
      <CloseIcon />
    </button>
  );

  return (
    <QuestionModal
      question={question}
      closeModal={closeModal}
      header={header}
      handleSave={handleSave}
      visible={visible}
      className={`edit-modal ${provider}`}
    >
      <div>
        <div className="edit-question-category-header">
          <h6>
            {question?.category} {!!question?.question_number ? `(${question?.question_number})` : ""}
          </h6>
        </div>
      </div>
    </QuestionModal>
  );
};

export default EditMobiworkxQuestionsModal;
