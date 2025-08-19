import {
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  forwardRef,
} from "react";
import { ReactComponent as ConfirmIcon } from "../../assets/Confirm.svg";
import { ReactComponent as ErrorIcon } from "../../assets/Error.svg";
import { ReactComponent as LoadingIcon } from "../../assets/loading.svg";
import { SurveyQuestionType } from "../../types/Prescreener";
import "./TextControls.scss";
import TextInput from "../common/inputs/TextInput";

const AUTO_COMPLETE_VALUES: any = {
  address_line_1: "address-line1",
  address_line_2: "address-line2",
  "5de4": "postal-code",
  state: "state",
  city: "address-level2",
};

const getAutoCompleteString = (key: string) => {
  if (AUTO_COMPLETE_VALUES[key]) return AUTO_COMPLETE_VALUES[key];

  return key;
};

export interface TextControlProps {
  updateAnswer?: (key: string, value: string | undefined) => void;
  question: SurveyQuestionType;
  status?: string;
  changeConfirmButtonVisbility?: (a: boolean) => void;
  value?: string;
  timeout?: number;
  showStatus?: boolean;
  errorClassName?: string;
  showRequiredFlag?: boolean;
}

const TextControls = forwardRef(
  (
    {
      question,
      status = "",
      timeout = 1000,
      showStatus = true,
      errorClassName,
      changeConfirmButtonVisbility = (_) => {},
      value: savedValue = "",
      updateAnswer = (_) => {},
      showRequiredFlag = false,
    }: TextControlProps,
    ref: React.Ref<HTMLInputElement> | undefined
  ) => {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const errorMessage =
      question.error_message ||
      question.input?.errorMessage ||
      question.errorMessage;
    const placeholder = question.placeholder || question.input?.placeholder;
    const uppercase = !!(question.uppercase || question.input?.uppercase);

    const handleUpdateAnswer = (value: string) => {
      clearTimeout(timeoutRef.current);
      changeConfirmButtonVisbility?.(true);
      setLoading(false);
      submitAnswer(value);
    };

    const submitAnswer = async (value: string) => {
      setLoading(false);
      updateAnswer(question.key, value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const currentValue = uppercase
        ? e.target.value.toUpperCase()
        : e.target.value;
      setText(currentValue);

      clearTimeout(timeoutRef.current);

      if (savedValue !== currentValue) {
        setLoading(true);
        if (timeout) {
          changeConfirmButtonVisbility?.(false);
          timeoutRef.current = setTimeout(
            () => handleUpdateAnswer(currentValue),
            timeout
          );
        } else {
          handleUpdateAnswer(currentValue);
        }
      } else {
        setLoading(false);
        changeConfirmButtonVisbility?.(true);
      }
    };

    const handleOnKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Enter" && text !== savedValue) {
        handleUpdateAnswer(text);
      }
    };

    const handleRetry = () => {
      handleUpdateAnswer(savedValue);
    };

    const handleOnBlur = () => {
      if (text !== savedValue) {
        handleUpdateAnswer(text);
      }
    };

    useEffect(() => {
      if (typeof savedValue !== "undefined") setText(savedValue || "");
    }, [savedValue, timeout, question?.key]);

    const StatusIcon = () => {
      if (!status || !text) return null;

      if (loading || status === "loading") {
        return <LoadingIcon className="icon loaderIcon" />;
      } else if (status === "valid") {
        return <ConfirmIcon className="icon" />;
      } else {
        return <ErrorIcon className="icon" />;
      }
    };

    return (
      <div>
        <TextInput
          id={`${question.key}-text-input`}
          title={question.title || question.text}
          placeholder={placeholder || question.title || question.text}
          floatingLabel={question.title || question.text}
          autoComplete={getAutoCompleteString(question.key)}
          className={!loading && !!text ? status : ""}
          onChange={handleChange}
          onBlur={handleOnBlur}
          onKeyUp={handleOnKeyUp}
          value={text}
          showRequiredFlag={showRequiredFlag && !question.optional}
          icon={showStatus && <StatusIcon />}
          ref={ref}
        />
        {text && status === "invalid" && errorMessage && (
          <p className={`text-control-error-message ${errorClassName}`}>
            {errorMessage}
          </p>
        )}
        {status === "validation failed" && !loading && (
          <div>
            <p className="text-control-error-message">
              Failed to validate, please check your internet connection and try
              again.
            </p>
            <button className="text-retry-button" onClick={handleRetry}>
              Try again
            </button>
          </div>
        )}
      </div>
    );
  }
);

TextControls.defaultProps = {
  updateAnswer: () => null,
  status: undefined,
  value: "",
  changeConfirmButtonVisbility: () => null,
};

export default TextControls;
