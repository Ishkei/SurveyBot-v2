import dayjs, { Dayjs } from "dayjs";
import React, { useId, useRef } from "react";
import { ReactComponent as DropdownIcon } from "../../../../assets/dropdown.svg";
import "./dateInputs.scss";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { Popover } from "@mui/material";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onComplete?: () => void;
  onYearChange?: (index: number) => void;
  className?: string;
  placeholder?: string;
  floatingLabel?: string;
  inputRef?: any;
  minYear?: number;
  maxYear?: number;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

const YearInput = ({
  onYearChange,
  className,
  floatingLabel = "Year",
  onComplete,
  inputRef,
  minYear,
  maxYear,
  onChange,
  value,
  minDate,
  maxDate,
  ...inputProps
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const inputId = useId();
  const previousValue = useRef<string | number>();
  const inputContainerRef = useRef<string | number>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(inputRef?.current || inputContainerRef?.current || event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleYearChange = (e: any) => {
    if (onChange) onChange(e);

    previousValue.current = e.target.value?.replace(/[^0-9]/, "");
  };

  const handleYearIndexChange = (index: number) => {
    if (onYearChange) onYearChange(index);
    previousValue.current = index;
  };

  const handleKeyUp = (e: any) => {
    if (!onComplete) return;

    if (e.key === "Enter" || e.code === "Space") {
      return onComplete();
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      return;
    }

    if (String(previousValue.current)?.length === 4) {
      onComplete();
    }
  };

  const handleKeyDown = (e: any) => {
    if(e.code === "Space"){
      e.preventDefault();
      if(onComplete) onComplete();
    }
  }

  const canBeOpen = open && Boolean(anchorEl);
  const popperId = canBeOpen ? `popup-${inputId}` : undefined;
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div
      className={`year-input text-control-container ${
        floatingLabel && "floating-label-group"
      }`}
    >
      <input
        ref={inputRef || inputContainerRef}
        placeholder="YYYY"
        type="number"
        id={`input-year-${inputId}`}
        className={`text-input ${className}`}
        value={value ? value : ""}
        onChange={handleYearChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        required
        min={0}
        max={dayjs().year() + 1}
        {...inputProps}
        onFocus={(e) => {
          if (value) e.target.select();
        }}
      />
      {!!floatingLabel && (
        <label className="floating-label" htmlFor={`input-year-${inputId}`}>
          <span>{floatingLabel}</span>
        </label>
      )}
      <button
        aria-describedby={popperId}
        type="button"
        className="dropdown-button"
        onClick={handleClick}
        aria-label="open year dropdown"
        title="open year select dropdown"
      >
        <DropdownIcon />
      </button>
      <Popover
        id={popperId}
        className={className}
        onKeyDown={handleClose}
        onClick={handleClose}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <YearCalendar
          onChange={(e: any) => {
            if (e["$y"]) {
              handleYearIndexChange(e["$y"]);
            }
          }}
          value={value ? dayjs().year(Number(value)) : undefined}
          className="dob-year-calender"
          minDate={minDate}
          maxDate={maxDate}
        />
      </Popover>
    </div>
  );
};

export default YearInput;
