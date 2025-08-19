import React, { ReactNode } from "react";
import Txt from "../Txt";
import { AnswerType } from "../../../types/Profile";
import "./DropdownSelection.scss";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactNode;
  autoCompleteString?: string;
  value?: string;
  className?: string;
  title?: string;
  placeholder?: string | ReactNode;
  floatingLabel?: string;
  id?: string;
  answers: AnswerType[];
  isLifepoints?: boolean;
  showRequiredFlag?: boolean;
}

const DropdownSelection = ({
  placeholder,
  answers,
  floatingLabel,
  className,
  value,
  id,
  isLifepoints = false,
  showRequiredFlag = false,
  ...selectProps
}: Props) => (
  <div
    className={`selection-container ${floatingLabel && "floating-label-group"}`}
  >
    <select
      value={value}
      className={`selection-dropdown ${className}`}
      id={id}
      required
      {...selectProps}
    >
      <>
        {!!floatingLabel && (
          <option value="" disabled hidden>
            <span className="floating-label-selection-placeholder">{isLifepoints ? "" : placeholder || <Txt>Select an option</Txt>}</span>
          </option>
        )}
        <option value="Placeholder" disabled>
          {placeholder || <Txt>Select an option</Txt>}
        </option>
      </>
      {answers.map((answer) => (
        <option key={answer.key} value={answer.key}>
          {answer.label || answer.text}
        </option>
      ))}
    </select>
    {!!floatingLabel && (
      <label className="floating-label" htmlFor={id}>
        {floatingLabel}
        {!!showRequiredFlag && <span className="bold-text">{" "}*</span>}
      </label>
    )}
  </div>
);

export default DropdownSelection;
