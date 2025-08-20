import React, { ReactNode } from "react";
import "./TextInput.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  autoCompleteString?: string;
  value?: string;
  className?: string;
  title?: string;
  placeholder?: string;
  floatingLabel?: string;
  id?: string;
  showRequiredFlag?: boolean;
}

const TextInput = React.forwardRef(({
  value,
  icon,
  className,
  autoCompleteString,
  floatingLabel,
  id,
  showRequiredFlag = false,
  ...inputProps
}: Props, ref: React.Ref<HTMLInputElement> | undefined) => {
  return (
    <div
      className={`text-control-container ${
        floatingLabel && "floating-label-group"
      }`}
    >
      <input
        type="text"
        ref={ref || null}
        className={`text-input ${className}`}
        value={value || ""}
        autoComplete={autoCompleteString}
        onFocus={(e) => {
          if (value) e.target.select();
        }}
        required
        id={id}
        {...inputProps}
      />
      {!!floatingLabel && (
        <label className="floating-label" htmlFor={id}>
          <span>{floatingLabel}</span>
          {!!showRequiredFlag && <span className="bold-text">{" "}*</span>}
        </label>
      )}
      {icon}
    </div>
  );
});

export default TextInput;
