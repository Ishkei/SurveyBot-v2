import { AddressAnswers, SurveyQuestionType } from "../../types/Prescreener";
import "./EditQuestionsModal.scss";
import { getCategoryIcon } from "../../utils/categoryIcons";
import QuestionModal from "../common/QuestionModal";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import { RequestCtx } from "../../providers/RequestContext";
import { useContext } from "react";
import EditMobiworkxQuestionsModal from "../Mobiworkx/EditMobiworkxQuestionsModal";

interface Props {
  question?: SurveyQuestionType;
  visible: boolean;
  submitAnswer: (answer: string | AddressAnswers) => void;
  closeModal: () => void;
}

const EditQuestionsModal = ({
  question,
  visible,
  closeModal,
  submitAnswer,
}: Props) => {
  const { isMobiworkxPanel } = useContext(RequestCtx);

  if (isMobiworkxPanel) {
    return (
      <EditMobiworkxQuestionsModal
        question={question}
        visible={visible}
        closeModal={closeModal}
        submitAnswer={submitAnswer}
      />
    );
  }

  const handleSave = async (answers?: string | AddressAnswers) => {
    if (typeof answers === "undefined") return;

    try {
      await submitAnswer(answers);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const answered = question?.answered?.length;

  const header = (
    <>
      <button
        onClick={closeModal}
        className="edit-modal-close-button"
        title="Close editing question"
      >
        <CloseIcon />
      </button>
      <div className={`edit-question-number ${answered && "completed"}`}>
        {question?.category && getCategoryIcon(question.category)}
        <span>
          {question?.question_number}
        </span>
      </div>
    </>
  );

  return (
    <QuestionModal
      question={question}
      closeModal={closeModal}
      handleSave={handleSave}
      visible={visible}
      header={header}
      className="edit-modal"
    />
  );
};

export default EditQuestionsModal;
