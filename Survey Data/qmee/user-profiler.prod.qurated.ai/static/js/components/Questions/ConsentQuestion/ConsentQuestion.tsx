import { SurveyQuestionType } from "../../../types/Prescreener";
import ConsentQuestionDetail from "./ConsentQuestionDetail";
import SelectionControls from "../SelectionControls";

interface Props {
  question: SurveyQuestionType;
  disabled: boolean;
  updateAnswer: (key: string, answerKey: string, label: string | undefined) => void;
  value?: string;
}



const ConsentQuestion = (props: Props) => {
  return (
    <>
      <ConsentQuestionDetail {...props} />
      <SelectionControls {...props} styling="consent" />
    </>
  );
};

SelectionControls.defaultProps = {
  submitAnswer: () => null,
  updateAnswer: () => null,
  question: {},
  disabled: false,
};

export default ConsentQuestion;
