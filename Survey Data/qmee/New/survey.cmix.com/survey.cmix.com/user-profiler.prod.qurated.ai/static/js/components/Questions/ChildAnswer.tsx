import { useState, useCallback, useEffect, useId, useRef } from "react";
import { ChangeEvent } from "react";
import { Child } from "../../services/Children";
import { LocalisationType } from "../../types/Children";
import { SurveyQuestionType } from "../../types/Prescreener";
import Txt from "../common/Txt";
import { useTranslation } from "react-i18next";
import { useNamespace } from "../common/TranslationWrapper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import MonthInput from "../common/inputs/dateInputs/MonthInput";
import YearInput from "../common/inputs/dateInputs/YearInput";

interface Props {
  updateGender: (i: number, gender: "m" | "f" | "u" | undefined) => void;
  updateYear: (i: number, a: number) => void;
  updateMonth: (i: number, a: number) => void;
  question: SurveyQuestionType;
  activeChild: Child;
  localisation: LocalisationType;
  index: number;
  onRemove: (a: number) => void;
}

const ChildAnswer = (props: Props) => {
  const {
    updateGender,
    updateYear,
    updateMonth,
    question,
    activeChild,
    index,
    onRemove,
  } = props;

  const namespace = useNamespace();
  const { t } = useTranslation(namespace);
  const [invalidYearInput, setInvalidYearInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const childId = useId();
  const yearRef = useRef<HTMLInputElement | undefined>(undefined);

  const handleYearChange = (e: any) => {
    updateYear(index, e?.target.value);
    validateChildren(activeChild);
  };

  const handleYearIndexChange = (year: number) => {
    updateYear(index, year);
    validateChildren(activeChild);
  };

  const handleMonthChange = (month: any) => {
    updateMonth(index, month);
    validateChildren(activeChild);
  };

  const validateChildren = useCallback((child: Child) => {
    if (child.month && !child.getValidMonths().includes(Number(child.month))) {
      setErrorMessage(
        "Invalid Date: The expected date can only be up to 9 months away."
      );
    } else if (
      child.year &&
      !child.getValidYears().includes(Number(child.year))
    ) {
      setErrorMessage("Child is older than the age of 18");
    } else {
      setErrorMessage("");
    }
    if (child.gender && !child.getValidGenders().includes(child.gender)) {
      child.setGender(undefined);
    }

    setInvalidYearInput(
      !!child.year &&
        (String(child.year).length < 4 ||
          !child.getValidYears().includes(Number(child.year)))
    );
  }, []);

  useEffect(() => {
    validateChildren(activeChild);
  }, [activeChild, validateChildren]);

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === "m" ||
      e.target.value === "f" ||
      e.target.value === "u"
    ) {
      if (e.target.checked) {
        updateGender(index, e.target.value);
      } else {
        updateGender(index, undefined);
      }
      validateChildren(activeChild);
    }
  };

  const removeChild = () => {
    onRemove(index);
  };

  const expecting = activeChild.isExpecting();

  const renderGenderAnswers = (
    currentGender: string | undefined,
    genderKey: string,
    genderLabel: string
  ) => {
    const checked = !!(currentGender && currentGender === genderKey);

    return (
      <div className={"radioContainer select-container"} key={genderKey}>
        <input
          type="checkbox"
          checked={checked}
          value={genderKey}
          id={`${childId}-${index}-${genderKey}`}
          onChange={handleGenderChange}
        />
        <label
          htmlFor={`${childId}-${index}-${genderKey}`}
          className={`radio-answer ${checked && "selected"}`}
        >
          <span>{genderLabel}</span>
        </label>
      </div>
    );
  };

  const minDate = () => {
    return dayjs().subtract(19, "year");
  };

  const maxDate = () => {
    return dayjs().add(9, "months");
  };

  const handleMonthComplete = ()=>{
    yearRef.current?.focus();
  }

  return (
    <div className={`activeChild`} data-testid={`child-${index + 1}`}>
      <div className="child-header">
        <p className="child-number">{index + 1}</p>
        <button className="close-header-button" onClick={removeChild}>
          <Txt component="span">Remove</Txt>
        </button>
      </div>
      <div className="questionContainer">
        <Txt
          component="label"
          htmlFor={`${question?.key}-birth-year_input`}
          className="child-menu-dropdown-label"
        >
          Date of Birth/Expecting
        </Txt>

        <div className="dob-child-input-container">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
              okButtonLabel: t("OK"),
              cancelButtonLabel: t("Cancel"),
              datePickerToolbarTitle: t("Select Date"),
            }}
          >
            <MonthInput
              className={`date-select ${errorMessage && "invalid error"}`}
              onMonthChange={handleMonthChange}
              value={activeChild.month}
              floatingLabel={t("Month")}
              onComplete={() => {
                handleMonthComplete();
              }}
            />
            <YearInput
              className={`date-select ${
                (invalidYearInput || !!errorMessage) && "invalid error"
              }`}
              onChange={handleYearChange}
              value={activeChild.year}
              maxDate={maxDate()}
              inputRef={yearRef}
              onYearChange={handleYearIndexChange}
              minDate={minDate()}
              floatingLabel={t("Year")}
              key={"year"}
            />
          </LocalizationProvider>
        </div>
        {!!errorMessage && (
          <p className="child-date-error-message">{errorMessage}</p>
        )}
      </div>

      <div className={"questionContainer"}>
        <h3>
          <Txt component="span" className="child-menu-dropdown-label">
            Gender
          </Txt>{" "}
          {expecting && (
            <span  className="child-menu-dropdown-label">
            {"("}

            <Txt component="span" className="child-menu-dropdown-label">
              Optional
            </Txt>
            {")"}
            </span>
          )}
        </h3>

        <div className={"radioAnswers selectGroup"}>
          {renderGenderAnswers(activeChild.gender, "f", "Female")}
          {renderGenderAnswers(activeChild.gender, "m", "Male")}
        </div>
      </div>
    </div>
  );
};

export default ChildAnswer;
