import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SurveyQuestionType } from "../../types/Prescreener";
import "./AcceptQuestion.scss";
import Txt from "../common/Txt";

interface Props {
  question: SurveyQuestionType;
  updateAnswer: (key: string, value: string | undefined) => void;
  value?: string
}

const AcceptControls = (props: Props) => {
  const { question, updateAnswer } = props;
  const { search } = useLocation();
  const firstRender = useRef(true);

  useEffect(()=>{
    firstRender.current = true;
  }, [question.key])

  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;
      updateAnswer(question.key,  "accepted");
    }
  }, [question.key, updateAnswer])

  return (
    <div className="accept-question">
      <Link to={`/prescreener/terms${search}`} className="accept-question-link" ><Txt>Terms of service</Txt></Link>
      <Link to={`/prescreener/privacy${search}`} className="accept-question-link" ><Txt>Privacy policy</Txt></Link>
      <Link to={`/prescreener/partners${search}`} className="accept-question-link" ><Txt>Partners</Txt></Link>
    </div>
  );
};

AcceptControls.defaultProps = {
  question: {},
  updateAnswer: () => null,
};

export default AcceptControls;
