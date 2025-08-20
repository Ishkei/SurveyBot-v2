import React, { ReactNode } from "react";
import "./SelectionAnswer.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  checked: boolean;
  title?: string;
  id?: string;
  labelText: string | ReactNode;
  type?: "radio" | "checkbox";
}

const SelectionAnswer = ({
  value,
  className,
  id,
  labelText,
  checked,
  type = "radio",
  ...inputProps
}: Props) => {
  return (
    <div className="radio-answer-container">
      <input
        type={type}
        value={value}
        checked={checked}
        id={id}
        {...inputProps}
      />
      <label
        htmlFor={id}
        className={`radio-answer ${checked && "selected"} ${className}`}
      >
        {labelText}
      </label>
    </div>
  );
};

export default SelectionAnswer;
