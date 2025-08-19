import { ChangeEvent, useState, useEffect } from "react";
import "./MultiPunchControls.scss";
import { AnswerType, QuestionType } from "../../types/Profile";
import Txt from "../common/Txt";
import SelectionAnswer from "../common/inputs/SelectionAnswer";
import { shuffleAnswerOrder } from "../../utils/shuffleArray";
import { sortAnswers } from "../../utils/sortAnswers";

interface Props {
  question: any;
  disabled?: boolean;
  updateAnswer: (key: string, b: string | undefined, label?: string) => void;
  value?: string;
  isValidAnswer?: (a: AnswerType) => boolean;
}

const NONE_ANSWER_KEYS = ["none", "n/a", ""];

const isVisible = (q: AnswerType | QuestionType) => {
  if(q.hidden) return false;

  if(typeof q.show_to_panelist === 'boolean'){
    return q.show_to_panelist;
  }

  return true;
}

const MultiPunchControls = (props: Props) => {
  const { question, value, updateAnswer, isValidAnswer } = props;
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const values = (value && value.split(",")) || [];
  const emptyStringText = question.emptyString || question.empty_string;

  const isSingleAnswer = (answer: AnswerType) => {
    return answer.single_multi_punch_answer || answer.none_answer || answer.exclusive_multi_punch_answer;
  };

  const isNoneAnswer = (answer: AnswerType) => {
    return answer.none_answer || NONE_ANSWER_KEYS.includes(answer.key);
  };

  const selectedAnswers: AnswerType[] = values
    .map((key: string) => answers.find((a: AnswerType) => a.key === key))
    .filter((a): a is AnswerType => !!a);

  function updateSelectedAnswers(updatedAnswers: AnswerType[]) {
    const isMulti = updatedAnswers.length > 1;

    const answers = updatedAnswers.filter((a?: AnswerType) => {
      if (!a || isNoneAnswer(a)) return false;

      return !isMulti || !isSingleAnswer(a);
    });

    updateAnswer(
      question.key,
      answers.map((a: AnswerType) => a.key).join(","),
      answers.map((a: AnswerType) => a.label || a.text).join(", ")
    );
  }

  useEffect(() => {
    let answers: AnswerType[] =
      question.answers.filter((a: AnswerType) => isVisible(a)) || [];

    if (question.options?.randomise_answer_order) {
      answers = shuffleAnswerOrder(answers, true);
    } else {
      answers = sortAnswers(answers);
    }

    setAnswers(answers);
  }, [question.answers, question.options?.randomise_answer_order]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    answer: AnswerType
  ) => {
    if (e.target.checked) {
      updateSelectedAnswers(
        isSingleAnswer(answer) ? [answer] : [...selectedAnswers, answer]
      );
    } else {
      updateSelectedAnswers(
        selectedAnswers.filter((a: AnswerType) => a.key !== answer.key)
      );
    }
  };

  const filteredAnswers = () => {
    const filteredAns = answers.filter((ans) => {
      if (!isVisible(ans)) return null;

      if (ans.response_option_filter && isValidAnswer && !isValidAnswer(ans)) {
        return null;
      }

      return true;
    });

    if (!filteredAns.length) return answers;

    return filteredAns;
  };

  const renderAnswer = (answer: AnswerType) => {
    if (!isVisible(answer)) {
      return null;
    }

    if (answer?.none_answer || answer.key === "none") {
      return showNoneAnswerAtTop() ? null : renderNoneAnswer(answer);
    }

    return (
      <SelectionAnswer
        type="checkbox"
        checked={Boolean(values?.includes(answer.key))}
        id={`${question.key}-${answer.key}-answer-key`}
        key={`${question.key}-${answer.key}-answer-key`}
        disabled={props.disabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, answer)}
        labelText={answer.label || answer.text}
        value={answer.key}
      />
    );
  };

  // if no priority is set, show none answer at the top
  const showNoneAnswerAtTop = () => {
    let noneAnswer =
      answers.find((ans) => ans.none_answer) ||
      answers.find((ans) => ans.key === "none");
    if (!noneAnswer || !isVisible(noneAnswer)) return false;

    if (noneAnswer && !(noneAnswer.priority || noneAnswer.display_order)) {
      return true;
    }

    return false;
  };

  const renderNoneAnswer = (noneAnswer?: AnswerType) => {
    // Backup for now till all none_answers are set up and being used
    if (!noneAnswer) {
      noneAnswer =
        answers.find((ans) => ans.none_answer) ||
        answers.find((ans) => ans.key === "none");
    }
  
    if (!noneAnswer || !isVisible(noneAnswer)) return null;

    const handleNone = () => updateSelectedAnswers([]);

    const noneAnswered =
      typeof props.value === "string" &&
      (NONE_ANSWER_KEYS.includes(props.value) ||
        props.value === noneAnswer.key);

    return (
      <SelectionAnswer
        type="checkbox"
        checked={noneAnswered}
        id={`${question.key}-${noneAnswer.key}-answer-key`}
        disabled={props.disabled}
        onChange={handleNone}
        labelText={
          noneAnswer.label || noneAnswer.text || emptyStringText || <Txt>None of these</Txt>
        }
        value=""
      />
    );
  };

  return (
    <div className="select-group">
      {showNoneAnswerAtTop() && renderNoneAnswer()}
      {filteredAnswers().map(renderAnswer)}
    </div>
  );
};

MultiPunchControls.defaultProps = {
  question: {},
  updateAnswer: () => null,
  disabled: false,
};

export default MultiPunchControls;
