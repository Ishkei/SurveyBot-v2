import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Answer, SurveyQuestionType } from "../../types/Prescreener";
import "./SelectionControls.scss";
import "flat-map-polyfill";
import Txt from "../common/Txt";
import { AnswerType, QuestionType } from "../../types/Profile";
import SelectionAnswer from "../common/inputs/SelectionAnswer";
import DropdownSelection from "../common/inputs/DropdownSelection";
import { RequestCtx } from "../../providers/RequestContext";
import { shuffleAnswerOrder } from "../../utils/shuffleArray";
import { sortAnswers } from "../../utils/sortAnswers";

interface Props {
  question: SurveyQuestionType;
  disabled: boolean;
  updateAnswer: (
    key: string,
    answerKey: string,
    label: string | undefined
  ) => void;
  value?: string;
  styling?: string;
  isProfileQuestion?: boolean;
  dropdown?: boolean;
  status?: string;
  sortByLabel?: boolean;
  isValidAnswer?: (a: AnswerType) => boolean;
  showRequiredFlag?: boolean;
}

const isVisible = (q: AnswerType | QuestionType) => {
  if (q.hidden) return false;

  if (typeof q.show_to_panelist !== "undefined" && !q.show_to_panelist){
    return false;
  }

  return true;
};

const SelectionControls = ({
  question,
  disabled,
  updateAnswer,
  value,
  styling,
  isProfileQuestion,
  dropdown,
  status,
  sortByLabel,
  isValidAnswer,
  showRequiredFlag = false,
}: Props) => {
  const { isLifepointsPanel, isMobiworkxPanel } =
    useContext(RequestCtx);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const answer = answers.find(
      (a: Answer) => String(a.key) === e.target.value
    );
    if (!answer) return;

    updateAnswer(question?.key, answer.key, answer.label);
  };

  useEffect(() => {
    let answers = (question.answers || []).filter((a) => !a || isVisible(a));

    if (sortByLabel) {
      answers = answers.sort((a, b) =>
        a.label?.localeCompare ? a.label.localeCompare(b.label) : 0
      );
    } else if (question.options?.randomise_answer_order) {
      answers = shuffleAnswerOrder(answers, true);
    } else {
      answers = sortAnswers(answers);
    }

    setAnswers(answers);
  }, [question.answers, sortByLabel, question.options?.randomise_answer_order]);

  useEffect(() => {
    if (
      isProfileQuestion &&
      styling === "consent" &&
      typeof value == "undefined"
    ) {
      updateAnswer(question?.key, "true", "true");
    }
  }, [isProfileQuestion, value, styling, question?.key, updateAnswer]);

  const showAnswers = (answer: AnswerType) => {
    if (answer.hidden) return false;

    if (
      answer.response_option_filter &&
      isValidAnswer &&
      !isValidAnswer(answer)
    ) {
      return false;
    }

    return true;
  };

  const renderAnswer = (answer: AnswerType) => {
    const isConsent = styling === "consent";
    const answerLabel = () => {
      if (isConsent) {
        if (answer.key === "true") {
          return <Txt>Match me to more surveys</Txt>;
        } else {
          return <Txt>No thanks</Txt>;
        }
      } else {
        return answer.label || answer.text;
      }
    };

    const labelStyling = () => {
      if (
        isConsent &&
        answer.key === "true" &&
        (isProfileQuestion ? value === "true" : value !== "false")
      ) {
        return "consent-answer-yes";
      } else if (
        isConsent &&
        answer.key === "false" &&
        !(value === answer.key)
      ) {
        return "consent-answer-no";
      }
    };

    return (
      <SelectionAnswer
        key={answer.key}
        checked={value === answer.key}
        value={answer.key}
        id={answer.key}
        labelText={answerLabel()}
        className={labelStyling()}
        disabled={disabled}
        onChange={handleChange}
      />
    );
  };

  const filteredAnswers = () => {
    const filteredAns = answers.filter((ans) => showAnswers(ans));

    if (!filteredAns.length) return answers;

    return filteredAns;
  };

  if (dropdown) {
    const placeholder = question.placeholder || <Txt>Select an option</Txt>;

    return (
      <DropdownSelection
        name={question.title || question.text}
        floatingLabel={question.title || question.text}
        value={value}
        className={status}
        id={question.key}
        onChange={handleChange}
        answers={filteredAnswers()}
        placeholder={placeholder}
        isLifepoints={isLifepointsPanel || isMobiworkxPanel}
        showRequiredFlag={showRequiredFlag && !question.optional}
      />
    );
  }

  return (
    <>
      <div className={`radio-group ${answers.length <= 3 && "small"}`}>
        {filteredAnswers().map(renderAnswer)}
      </div>
    </>
  );
};

SelectionControls.defaultProps = {
  submitAnswer: () => null,
  updateAnswer: () => null,
  question: {},
  disabled: false,
};

export default SelectionControls;
