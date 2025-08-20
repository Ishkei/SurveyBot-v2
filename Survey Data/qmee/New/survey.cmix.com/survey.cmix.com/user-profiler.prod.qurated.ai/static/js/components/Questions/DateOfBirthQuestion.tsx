import {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import "react-widgets/styles.css";
import "./DateOfBirthQuestion.scss";
import { SurveyQuestionType } from "../../types/Prescreener";
import Txt from "../common/Txt";
import { TranslateContext, useNamespace } from "../common/TranslationWrapper";
import { useTranslation } from "react-i18next";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import MonthInput from "../common/inputs/dateInputs/MonthInput";
import { getDateOrder, getDatePattern } from "../../services/getDatePattern";
import DateInput from "../common/inputs/dateInputs/DateInput";
import YearInput from "../common/inputs/dateInputs/YearInput";
import utc from "dayjs/plugin/utc";
import DelayedMessageContainer from "../common/DelayedMessageContainer";
import { RequestCtx } from "../../providers/RequestContext";

dayjs.extend(utc);

const toISOString = (day: number, month: number, year: number) => {
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0)).toISOString();
};

interface Props {
  question: SurveyQuestionType;
  disabled: boolean;
  updateAnswer: (
    key: string,
    answerKey: string | undefined,
    label?: string
  ) => void;
  handleReset: () => void;
  value?: string;
  isProfileQuestion?: boolean;
}

interface SelectedDateType {
  month?: number;
  year?: number;
  day?: number;
}

function DateOfBirthControls(props: Props) {
  const {
    question,
    updateAnswer,
    isProfileQuestion,
    value: currentValue,
  } = props;
  const namespace = useNamespace();
  const { t } = useTranslation(namespace);
  const { locale } = useContext(TranslateContext);
  const { provider } = useContext(RequestCtx);
  const [selectedDate, setSelectedDate] = useState<SelectedDateType>({
    month: undefined,
    year: undefined,
    day: undefined,
  });
  const [valid, setValid] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(true);
  const [age, setAge] = useState<string>("");
  const dayRef = useRef<HTMLInputElement>();
  const monthRef = useRef<HTMLInputElement>();
  const yearRef = useRef<HTMLInputElement | undefined>(undefined);

  let minAge = Number(question.minAge || question.min_age || question.options?.min_age || 18);
  if (provider === "qmee") minAge = 16;

  let maxAge = Number(question.maxAge || question.max_age || question.options?.max_age || 100);

  useEffect(() => {
    if (currentValue) {
      const date = dayjs(currentValue).utc();
      setSelectedDate({
        month: date.month() + 1,
        year: date.year(),
        day: date.date(),
      });
      setValidated(false);
    }
  }, [currentValue]);

  const submitAnswer = () => {
    if (selectedDate.month && selectedDate.year && selectedDate.day && valid) {
      updateAnswer(
        question.key,
        toISOString(selectedDate.day, selectedDate.month, selectedDate.year)
      );
    }
  };

  const handleRetry = () => {
    setSelectedDate({ month: undefined, year: undefined, day: undefined });
    props.handleReset();
  };

  const calculateAge = useCallback((updatedData: SelectedDateType) => {
    if (!updatedData.month || !updatedData.year || !updatedData.day) return "";

    const today = new Date();
    const birthDate = new Date(
      updatedData.year,
      updatedData.month - 1,
      updatedData.day
    );

    let age: number | string =
      today.getUTCMilliseconds() - birthDate.getUTCMilliseconds();
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    age = Math.abs(ageDate.getUTCFullYear() - 1970);

    setAge(String(age));
  }, []);

  const invalidDate = useMemo(() => {
    if (selectedDate?.month) {
      if (!(selectedDate.month > 0 && selectedDate.month <= 12)) return true;
    }
    if (selectedDate.month && selectedDate.day && selectedDate.year) {
      const date = dayjs()
        .year(selectedDate.year)
        .month(selectedDate.month - 1);
      return date.daysInMonth() < selectedDate.day;
    }

    return false;
  }, [selectedDate.month, selectedDate.day, selectedDate.year]);

  const verifyAge = useCallback(
    (updatedData: SelectedDateType) => {
      if (!updatedData.month || !updatedData.year || !updatedData.day) return;

      if (invalidDate || String(updatedData.year).length !== 4) {
        setValid(false);
        return;
      }

      const date = dayjs()
        .year(updatedData.year)
        .month(updatedData.month - 1);

      if (date.daysInMonth() < updatedData.day) {
        setValid(false);
        return;
      }

      const today = new Date();
      const birthDate = new Date(
        updatedData.year,
        updatedData.month - 1,
        updatedData.day
      );

      let age: number | string =
        today.getUTCMilliseconds() - birthDate.getUTCMilliseconds();
      const ageDifMs = Date.now() - birthDate.getTime();

      if (ageDifMs < 0) {
        setValid(false);
        return;
      }

      const ageDate = new Date(ageDifMs);
      age = Math.abs(ageDate.getUTCFullYear() - 1970);

      setValid(minAge <= age && age < maxAge);
    },
    [minAge, maxAge, invalidDate]
  );

  useEffect(() => {
    if (selectedDate.month && selectedDate.year && selectedDate.day) {
      verifyAge(selectedDate);
      calculateAge(selectedDate);
    } else {
      setValid(false);
    }
    setValidated(true);
  }, [selectedDate, verifyAge, calculateAge]);

  useEffect(() => {
    if (
      selectedDate.month &&
      selectedDate.year &&
      selectedDate.day &&
      valid &&
      isProfileQuestion &&
      props.question?.key
    ) {
      updateAnswer(
        props.question.key,
        toISOString(selectedDate.day, selectedDate.month, selectedDate.year)
      );
    }
  }, [
    props.question?.key,
    selectedDate,
    valid,
    isProfileQuestion,
    updateAnswer,
  ]);

  const handleDateChange = (e: any) => {
    const day = e?.target?.value?.replace(/[^0-9]/, "");

    setSelectedDate((prevState: SelectedDateType) => ({
      ...prevState,
      day,
    }));
    setValidated(false);
  };

  const handleMonthIndexChange = (index: any) => {
    setSelectedDate((prevState: SelectedDateType) => ({
      ...prevState,
      month: index,
    }));
    setValidated(false);
  };

  const handleYearChange = (e: any) => {
    const year = e?.target?.value?.replace(/[^0-9]/, "");
    setSelectedDate((prevState: SelectedDateType) => ({
      ...prevState,
      year,
    }));
    setValidated(false);
  };

  const handleYearIndexChange = (index: number) => {
    setSelectedDate((prevState: SelectedDateType) => ({
      ...prevState,
      year: index,
    }));
    setValidated(false);
  };

  const minDate = () => {
    return dayjs().subtract(maxAge, "year");
  };

  const maxDate = () => {
    return dayjs().subtract(minAge, "year");
  };

  const order = getDateOrder(locale || "en-us");

  const handleComplete = (type: "MM" | "DD" | "YYYY") => {
    const currentIndex = order.findIndex((val) => val === type);

    if (currentIndex > -1) {
      for (let i = currentIndex + 1; i < order.length; i++) {
        switch (order[i]) {
          case "MM":
            return monthRef.current?.focus();
          case "DD":
            return dayRef.current?.focus();
          case "YYYY":
            return yearRef.current?.focus();
          default:
            break;
        }
      }
    }
  };

  return (
    <div>
      <div>
        <div className="dateOfBirthQuestionSelect">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateFormats={{
              month: locale?.includes("en") ? "MMM" : "MM",
              normalDateWithWeekday: getDatePattern(locale || "en-US"),
              fullDate: getDatePattern(locale || "en-US"),
            }}
            localeText={{
              okButtonLabel: t("OK"),
              cancelButtonLabel: t("Cancel"),
              datePickerToolbarTitle: t("Select Date"),
            }}
          >
            {order.map((type: string) => {
              switch (type) {
                case "MM":
                  return (
                    <MonthInput
                      key="Month"
                      onMonthChange={handleMonthIndexChange}
                      className={invalidDate ? "error invalid" : ""}
                      value={selectedDate.month}
                      onComplete={() => {
                        handleComplete("MM");
                      }}
                      inputRef={monthRef}
                      floatingLabel={t("Month")}
                      autoComplete="bday-month"
                    />
                  );
                case "DD":
                  return (
                    <DateInput
                      key="Date"
                      onChange={handleDateChange}
                      className={`${invalidDate && "error invalid"}`}
                      value={selectedDate.day}
                      onComplete={() => {
                        handleComplete("DD");
                      }}
                      floatingLabel={t("Day")}
                      inputRef={dayRef}
                      autoComplete="bday-day"
                    />
                  );
                case "YYYY":
                  return (
                    <YearInput
                      key={"year"}
                      onChange={handleYearChange}
                      className={`${invalidDate && "error invalid"}`}
                      value={selectedDate.year}
                      onComplete={() => {
                        handleComplete("YYYY");
                      }}
                      onYearChange={handleYearIndexChange}
                      inputRef={yearRef}
                      autoComplete="bday-year"
                      floatingLabel={t("Year")}
                      maxDate={maxDate()}
                      minDate={minDate()}
                    />
                  );
                default:
                  return null;
              }
            })}
          </LocalizationProvider>
        </div>
      </div>

      {isProfileQuestion && (
        <div className="profile-question-age-info">
          {!validated ||
          !(
            selectedDate.month &&
            selectedDate.year &&
            selectedDate.day
          ) ? null : valid ? (
            <Txt component="p"> {{ age }} years old</Txt>
          ) : (
            <Txt component="p">
              Invalid age. Age must be between {{ minAge }}-
              {{ maxAge: maxAge - 1 }} years old
            </Txt>
          )}
        </div>
      )}

      {!!selectedDate.month &&
        !!selectedDate.year &&
        selectedDate.day &&
        !isProfileQuestion && (
          <div>
            {!validated ? null : valid ? (
              <div className="age-check-container">
                <Txt component="p">Are you {{ age }} years old?</Txt>
                <div className="age-check-button-container">
                  <button
                    onClick={submitAnswer}
                    className="radio-answer confirm"
                  >
                    <Txt>Yes</Txt>
                  </button>
                  <button
                    onClick={handleRetry}
                    className="radio-answer confirm"
                  >
                    <Txt>No</Txt>
                  </button>
                </div>
              </div>
            ) : invalidDate ? (
              <DelayedMessageContainer>
                <div key="invalid-date">
                  <Txt component="p">Invalid date</Txt>
                </div>
              </DelayedMessageContainer>
            ) : (
              <DelayedMessageContainer>
                <div key="invalid-age">
                  <Txt component="p">
                    Invalid age. Age must be between {{ minAge }}-
                    {{ maxAge: maxAge - 1 }} years old
                  </Txt>
                </div>
              </DelayedMessageContainer>
            )}
          </div>
        )}
    </div>
  );
}

DateOfBirthControls.defaultProps = {
  question: {},
  updateAnswer: () => null,
  handleReset: () => null,
  disabled: false,
};

export default DateOfBirthControls;
