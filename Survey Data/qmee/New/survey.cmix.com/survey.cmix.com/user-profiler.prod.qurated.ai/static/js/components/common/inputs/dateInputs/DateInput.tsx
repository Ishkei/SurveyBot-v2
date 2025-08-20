import { Dayjs } from "dayjs";
import React, { useId, useRef } from "react";
import "./dateInputs.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  minDate?: Dayjs;
  onComplete?: () => void;
  className?: string;
  placeholder?: string;
  floatingLabel?: string;
  inputRef?: any
}

const DateInput = ({
  onChange = ()=> {},
  className,
  floatingLabel = "Date",
  onComplete,
  inputRef,
  value,
  ...inputProps
}: Props) => {
  const inputId = useId();
  const previousValue = useRef<string | number>();

  const handleDateChange = (e: any) => {
    onChange(e);
    previousValue.current = e.target.value?.replace(/[^0-9]/, "")
  };

  const handleKeyUp = (e: any) => {
    if(!onComplete || e.key === "ArrowUp" || e.key === "ArrowDown") return;

    if(e.key === "Enter" || e.code === "Space"){
      return onComplete()
    }

    const valid =  Number(previousValue.current) > 0 && Number(previousValue.current) <= 31;

    if(String(previousValue.current)?.length === 2 && valid){
      onComplete();
    }
  }

  const handleKeyDown = (e: any) => {
    if(e.code === "Space"){
      e.preventDefault();
      if(onComplete) onComplete();
    }
  }

  const validDate = () => {
    if(!(Number(value) <= 31 && Number(value) > 0)) return false;

    return true;
  }

  return (
    <div  className={`date-input text-control-container ${
      floatingLabel && "floating-label-group"
    }`}>
      <input
        ref={inputRef}
        placeholder="DD"
        type="number"
        id={`input-day-${inputId}`}
        className={`text-input ${className} ${!validDate && "invalid"}`}
        value={value ? value : ""}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onChange={handleDateChange}
        name="Date"
        required
        onFocus={(e) => {
          e.target.select();
        }}
        max={31}
        min={1}
        {...inputProps}
      />
       {!!floatingLabel && (
        <label className="floating-label" htmlFor={`input-day-${inputId}`}>
          <span>{floatingLabel}</span>
        </label>
      )}
    </div>
  );
};

export default DateInput;
