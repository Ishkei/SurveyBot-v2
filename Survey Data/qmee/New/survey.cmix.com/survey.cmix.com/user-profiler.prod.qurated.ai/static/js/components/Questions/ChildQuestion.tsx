import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Child } from "./../../services/Children";
import "./ChildQuestion.scss";
import { SurveyQuestionType } from "../../types/Prescreener";
import Txt from "../common/Txt";
import { useNamespace } from "../common/TranslationWrapper";
import { useTranslation } from "react-i18next";
import ChildAnswer from "./ChildAnswer";
import { getLocalisation } from "../../services/getLocalisation";

interface Props {
  question: SurveyQuestionType;
  disabled: boolean;
  updateAnswer: (
    key: string,
    answerKey: string | undefined,
    label?: string
  ) => void;
  value?: string;
}

const NONE_ANSWER_KEYS = ["n/a", "", "none"];

export default function ChildrenControls({
  updateAnswer,
  question,
  value,
  disabled,
}: Props) {
  const [children, setChildren] = useState<Array<Child>>(
    Child.childrenFromKey(value || "")
  );

  const namespace = useNamespace();
  const { t } = useTranslation(namespace);
  const localisation = useMemo(
    () => getLocalisation(question?.localisation, t),
    [question?.localisation, t]
  );

  useEffect(() => {
    let updatedValue = value || "";
    if (NONE_ANSWER_KEYS.includes(updatedValue)) updatedValue = "";

    setChildren(
      (prevChildren) => prevChildren || Child.childrenFromKey(updatedValue)
    );
  }, [value]);

  const handleSelectMonth = (index: number, month: number | null) => {
    const activeChild = children[index];
    if (!activeChild) return;

    activeChild.setMonth(month || undefined);
    updateChild(index);
  };

  const handleSelectYear = (index: number, year: number | null) => {
    const activeChild = children[index];
    if (!activeChild) return;

    activeChild.setYear(year || undefined);
    updateChild(index);
  };

  const handleSelectGender = (index: number, gender: "m" | "f" | "u" | undefined) => {
    children[index]?.setGender(gender);
    updateChild(index);
  };

  const updateChild = (index: number) => {
    const activeChild = children[index];
    if (!activeChild) return;

    updateChildren(children, true);
  };

  const createNewChild = () => {
    updateChildren([...children, new Child()], true);
  };

  const updateChildren = useCallback(
    (children: Array<Child>, shouldUpdateParent: boolean) => {
      setChildren([...children]);
      if (shouldUpdateParent) {
        const asKey = Child.childrenToKey(children);
        updateAnswer(question.key, asKey);
      }
    },
    [updateAnswer, question.key]
  );

  const deleteChild = (index: number) => {
    updateChildren(
      children.filter((c, i) => i !== index),
      true
    );
  };

  const renderNoneAnswer = () => {
    if (children.length) return null;

    const noneSelected =
      typeof value == "string" && NONE_ANSWER_KEYS.includes(value);

    const handleNoneClick = () => {
      if (disabled) return;

      updateChildren([], true);
    };

    return (
      <div className={`item ${noneSelected && "activeItem"}`}>
        <label
          htmlFor={`${question?.key}-none`}
          className={`radio-answer child-none ${noneSelected && "selected"}`}
        >
          {localisation.no_children}
        </label>
        <input
          type="radio"
          id={`${question?.key}-none`}
          disabled={disabled}
          checked={noneSelected}
          onChange={handleNoneClick}
        />
      </div>
    );
  };

  return (
    <div className="childQuestion childControl">
      <div className="add-child-container">
        <div className="children">
          {renderNoneAnswer()}
          <button
            disabled={disabled}
            onClick={createNewChild}
            className={`item addChild`}
          >
            + <Txt>Add child</Txt>
          </button>
        </div>
      </div>
      <div className="child-list">
        {children.map((child, index) => (
          <ChildAnswer
            index={index}
            key={child.id}
            localisation={localisation}
            activeChild={child}
            question={question}
            updateGender={handleSelectGender}
            updateYear={handleSelectYear}
            updateMonth={handleSelectMonth}
            onRemove={deleteChild}
          />
        ))}
      </div>
    </div>
  );
}

ChildrenControls.defaultProps = {
  question: {},
  onChange: () => null,
  disabled: false,
  updateAnswer: () => null,
};
