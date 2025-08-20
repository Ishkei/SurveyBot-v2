import { useContext } from "react";
import { AnswerType } from "../../types/Profile";
import { ReactComponent as EditButton } from "../../assets/EditPencil.svg";
import { ReactComponent as MobiworkxEditIcon } from "../../assets/MobiworkxEditQuestionIcon.svg";
import { ReactComponent as LockIcon } from "../../assets/lock.svg";
import { ReactComponent as QuestionModalIcon } from "../../assets/Modal_pop_icon.svg";
import QuestionHeaderInfo from "./QuestionHeaderInfo";
import AnsweredList from "./AnsweredList";
import AllChildrenQuestions from "./AllChildrenQuestions";
import "./ProfileQuestion.scss";
import showQuestion from "../../utils/showQuestion";
import { SurveyQuestionType } from "../../types/Prescreener";
import { EditQuestionContext } from "../../providers/EditQuestionContext";
import { getCategoryIcon } from "../../utils/categoryIcons";
import { ProfileContext } from "../../providers/ProfileContext";
import { RequestCtx } from "../../providers/RequestContext";
import Txt from "../common/Txt";
import hasSpecialDataQuestionRequirements from "../../utils/hasSpecialDataQuestionRequirements";

interface Props {
  question: SurveyQuestionType;
  parentAnswer?: AnswerType[];
  editParent?: (question?: SurveyQuestionType | undefined) => void;
  isChildQuestion?: boolean;
  parentNumber?: string | number;
}

const ProfileQuestion = ({
  question,
  parentAnswer,
  editParent,
  parentNumber,
  isChildQuestion,
}: Props) => {
  const {
    question_number: questionNumber = "",
    category = "",
    title,
    text,
    answered
  } = question;
  const { provider, hideQuestions } = useContext(RequestCtx);
  const { handleEditQuestion } = useContext(EditQuestionContext);
  const { specialDataConsentGiven, questions, answers, getQuestionStatus } =
    useContext(ProfileContext);
  const { isMobiworkxPanel } = useContext(RequestCtx);

  const specialDataConsent = hasSpecialDataQuestionRequirements(
    question?.options?.parents || question?.options?.prerequisites
  );

  const editable =
    question.editable || question.editable_by_panelist || !answered?.length;

  let needsConsent = !specialDataConsentGiven && specialDataConsent;

  const isVisible =
    !needsConsent &&
    showQuestion(question, parentAnswer, !!isChildQuestion, questions, answers);
  const status = getQuestionStatus(isVisible, question);

  const handleParentEdit = () => {
    if (editParent) editParent();
  };

  const editQuestion = () => {
    if (
      isChildQuestion &&
      !showQuestion(
        question,
        parentAnswer,
        !!isChildQuestion,
        questions,
        answers
      ) &&
      editParent
    ) {
      return editParent();
    }

    handleEditQuestion(question);
  };

  const editIcon = isMobiworkxPanel ? <MobiworkxEditIcon /> : <EditButton />;

  if (hideQuestions && !isVisible && !specialDataConsent) return null;

  return (
    <>
      <div className={`question-container ${status && `question-${status}`}`}>
        {isMobiworkxPanel ? (
          <div className="question-number-container">
            <p>{String(questionNumber)?.replace("Q", "")}</p>
          </div>
        ) : (
          <QuestionHeaderInfo
            questionNumber={questionNumber}
            category={category}
          />
        )}

        <button
          className="question-edit-button"
          disabled={!editable || !isVisible}
          title={editable ? "Edit question" : "Cannot edit question"}
          onClick={() => {
            editQuestion();
          }}
        >
          <span className="question-text-container">
            <span className="question-title">{title || text}</span>
            {isVisible && <AnsweredList question={question} answers={answered} />}
          </span>
          <span className="question-edit-background" />
          <span className={`question-edit-icon`}>
            {editable ? editIcon : <LockIcon />}
          </span>
        </button>
        {needsConsent ? (
          <button
            className="question-hidden-info"
            onClick={() => {
              editQuestion();
            }}
          >
            <Txt>Accurate Matching is needed for this question</Txt>
          </button>
        ) : !editable ? (
          provider === "qmee" ? (
            <div className="contact-support-message">
              <Txt component="p">
                Please contact{" "}
                <a href="mailto: support@qmee.com">support@qmee.com</a> to
                request an edit
              </Txt>
            </div>
          ) : (
            <div className="contact-support-message">
              <Txt component="p">Please contact support to request an edit</Txt>
            </div>
          )
        ) : (
          !isVisible && (
            <button className="question-hidden-info" onClick={handleParentEdit}>
              <span>
                <Txt>
                  Unlock this question by providing a relevant answer to{" "}
                </Txt>
                <span className="hidden-cateogry-text">
                  {isMobiworkxPanel ? category : getCategoryIcon(category)}
                  {parentNumber}
                </span>
              </span>
              <span className="question-modal-icon">
                <QuestionModalIcon />
              </span>
            </button>
          )
        )}
      </div>

      <AllChildrenQuestions
        questions={question.child_questions}
        parentAnswer={question.answered}
        editParent={editQuestion}
        parentNumber={questionNumber}
      />
    </>
  );
};

export default ProfileQuestion;
