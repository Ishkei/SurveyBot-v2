import { AnswerType } from "../../types/Profile";
import ProfileQuestion from "./ProfileQuestion";
import "./AllChildrenQuestions.scss";
import { SurveyQuestionType } from "../../types/Prescreener";

interface Props {
  questions?: SurveyQuestionType[];
  parentAnswer?: AnswerType[];
  editParent?: (question?: SurveyQuestionType | undefined) => void;
  parentNumber: string | number;
}

const ChildQuestions = ({ questions, parentAnswer, editParent, parentNumber }: Props) =>
  questions?.length ? (
    <div className="child-questions-container">
      {questions.map((question, index: number) => (
        <ProfileQuestion
          key={question.key}
          question={question}
          parentAnswer={parentAnswer}
          editParent={editParent}
          isChildQuestion={true}
          parentNumber={parentNumber}
        />
      ))}
    </div>
  ) : null;

export default ChildQuestions;
