import { Dayjs } from "dayjs";
import React, { useRef, useId } from "react";
import MonthDropdown from "../../MonthDropdown";
import { ReactComponent as DropdownIcon } from "../../../../assets/dropdown.svg";
import "./dateInputs.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  month?: number;
  minDate?: Dayjs;
  onMonthChange: (index: number | string) => void;
  onComplete?: () => void;
  className?: string;
  placeholder?: string;
  floatingLabel?: string;
  inputRef?: any;
}

const MonthInput = ({
  month,
  onMonthChange,
  className,
  floatingLabel = "Month",
  onComplete,
  inputRef,
  value,
  ...inputProps
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const previousValue = useRef<string | number>();
  const inputContainerRef = useRef();

  const inputId = useId();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(inputRef?.current || inputContainerRef?.current || event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleMonthChange = (e: any) => {
    const value = e.target.value?.replace(/[^0-9]/, "");
    onMonthChange(value);
    previousValue.current = value;
  };

  const handleMonthIndexChange = (index: number) => {
    onMonthChange(index < 10 ? `0${index}` : index);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const popperId = canBeOpen ? `popup-${inputId}` : undefined;
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleKeyUp = (e: any) => {
    if (!onComplete) return;

    if (e.key === "Enter" || e.key === "Space" || e.key === "") {
      return onComplete();
    }
    const value = previousValue.current;
    const valid = Number(value) > 0 && Number(value) <= 12;

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      return;
    }

    if (String(previousValue.current)?.length === 2 && valid) {
      onComplete();
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (onComplete) onComplete();
    }
  };

  const ownerState = {
    onCancel: handleClose,
  };

  const validDate = () => {
    if (!(Number(month) <= 12 && Number(month) > 0)) return false;

    return true;
  };

  return (
    <div
      className={`month-input text-control-container ${
        floatingLabel && "floating-label-group"
      }`}
    >
      <input
        ref={inputRef || inputContainerRef}
        placeholder="MM"
        type="number"
        id={`input-month-${inputId}`}
        className={`text-input ${className} ${!validDate && "invalid"}`}
        value={typeof value !== "undefined" ? value : ""}
        onChange={handleMonthChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          e.target.select();
        }}
        required
        min={1}
        max={12}
        {...inputProps}
      />
      {!!floatingLabel && (
        <label className="floating-label" htmlFor={`input-month-${inputId}`}>
          <span>{floatingLabel}</span>
        </label>
      )}
      <button
        aria-describedby={popperId}
        type="button"
        className="dropdown-button"
        onClick={handleClick}
        aria-label="open month dropdown"
        title="open month dropdown"
      >
        <DropdownIcon />
      </button>
      <MonthDropdown
        id={popperId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        ownerState={ownerState}
        updateMonth={handleMonthIndexChange}
        activeMonthIndex={month ? month - 1 : undefined}
      />
    </div>
  );
};

export default MonthInput;
