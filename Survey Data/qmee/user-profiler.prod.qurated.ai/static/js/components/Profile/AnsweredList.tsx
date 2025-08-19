import { SurveyQuestionType } from "../../types/Prescreener";
import { AnswerType } from "../../types/Profile";
import "./AnsweredList.scss";

interface Props {
  answers: AnswerType[] | undefined;
  question: SurveyQuestionType;
}

const childGenderLabels: {[k: string]: string} = {
  "m": "♂",
  "f": "♀",
  "u": ""
}

function convertUTCDateToLocalDate(date: Date) {
  return new Date(date.getTime() + date.getTimezoneOffset()*60*1000);   
}

const formatLabel = (question: SurveyQuestionType, answer: AnswerType) => {
  const answerText = answer.text || answer.label || "";
  const answerKey = answer.key;

  if(question.type === "date" && answerText){
    const date = new Date(Date.parse(answerText))
    const dateString = convertUTCDateToLocalDate(date).toLocaleDateString();
    return dateString || answerText;
  }

  if(question.type === "children" && answerText){
    if(answerKey.toLocaleLowerCase() === "none" || answerKey === "" || answerKey === "n/a"){
      return answerText;
    }

    const [gender, month, year] = answerKey.split("-")
    if(!month || !year) return answerText;

    const genderLabel = childGenderLabels[gender || ""]
    const date = `${month.length === 1 ? `0${month}`: month}/${year}`;

    return !genderLabel ? date : `${genderLabel} ${date}`
  }

  // look up answer in question answer list to fix not translated answer text
  if(!answer.user_specific){
    const questionAnswer = question.answers?.find(answer => answer.key === answerKey)
    if(questionAnswer?.text) return questionAnswer?.text;
  }

  return answerText;
}

const AnsweredList = ({ question, answers }: Props) => {
  return (
    <span className="question-answer-container">
      {answers?.map((answer) => {
        let hidden = answer?.hidden;
        if (typeof answer.show_to_panelist === "boolean") {
          hidden = !answer.show_to_panelist;
        }
        if (hidden) return null;

        return (
          <span key={answer.key} className="question-answer">
            {formatLabel(question, answer)}
          </span>
        );
      })}
    </span>
  );
};

export default AnsweredList;
