import { AnswerKeyType, SurveyQuestionType } from "../../types/Prescreener";
import TextControls from "./TextControls";
import "./AddressQuestion.scss";
import SelectionControls from "./SelectionControls";
import { AnswerType } from "../../types/Profile";
import { useCallback, useContext } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import formatGoogleAddressComponents from "../../utils/formatGoogleAddressComponents";
import GooglePlacesTextControl from "./GooglePlacesTextControl";
import { RequestCtx } from "../../providers/RequestContext";
interface Props {
  question: SurveyQuestionType;
  updateAnswer: (
    key: string,
    answerKey: { [s: string]: AnswerKeyType }
  ) => void;
  isValidAnswer?: (a: AnswerType) => boolean;
  addressValues?: string | { [s: string]: { key?: string; status?: string } };
  changeConfirmButtonVisbility?: (a: boolean) => void;
}

export const FULL_ADDRESS_CONSENT_KEY = "full_address_consent";
export const FULL_ADDRESS_CONFIRMATION_KEY = "yes";
export const FULL_ADDRESS_DECLINE_KEY = "no";

export const VALID_NON_CONSENT_ADDRESS_QUESTIONS = [
  FULL_ADDRESS_CONSENT_KEY,
  "5de4",
  "5de1",
];

export const LIFEPOINTS_GOOGLE_PLACES_API_MARKETS = [
  "are",
  "sau",
];

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

const AddressControls = (props: Props) => {
  const {
    question: addressQuestion,
    isValidAnswer,
    changeConfirmButtonVisbility = () => {},
    updateAnswer,
    question,
  } = props;
  const embeddedQuestions = question.address_questions || question.nested_questions;
  const requestContext = useContext(RequestCtx);

  const handleUpdate = (questionKey: string, value: AnswerKeyType) => {
    if (!value) value = null;
    props.updateAnswer(addressQuestion.key, { [questionKey]: value });
  };

  const handlePlaceUpdate = useCallback(
    (place: google.maps.places.PlaceResult | null) => {
      if (place?.address_components) {
        const { postcode, address1, address2, state, city } =
          formatGoogleAddressComponents(
            place?.address_components,
            false
          );

        const updates: any = {
          "address_line_1": address1 || place?.name,
          "address_line_2": address2 || null,
          "city": city || null,
          "state": state || null,
          "5de4": postcode || null,
        };

        const stateQuestion = embeddedQuestions?.find((q) => q.key === "state");
        const cityQuestion = embeddedQuestions?.find((q) => q.key === "city");

        if (stateQuestion?.type === "selection") {
          const stateAnswer = stateQuestion.answers?.find(
            (ans: AnswerType) => ans.key === state || ans.label === state || ans.text === state
          );

          updates["state"] = stateAnswer ? stateAnswer.key : null;
        }

        if (cityQuestion?.type === "selection") {
          const cityAnswer = cityQuestion.answers?.find(
            (ans: AnswerType) => ans.key === city || ans.label === city || ans.text === city
          );
          updates["city"] = cityAnswer ? cityAnswer.key : null;
        }

        updateAnswer("address", updates);
      }
    },
    [updateAnswer, embeddedQuestions]
  );

  if (!embeddedQuestions?.length) return null;

  const consentQuestion = embeddedQuestions.find(
    (question) => question.key === FULL_ADDRESS_CONSENT_KEY
  );

  let consentAnswer = consentQuestion?.answerKey;

  if (typeof props.addressValues == "object" && !consentAnswer) {
    consentAnswer = props.addressValues?.[FULL_ADDRESS_CONSENT_KEY]?.key;
  }

  const showAutoComplete = () => {
    if (!GOOGLE_API_KEY) return false;
    if (requestContext.isMobiworkxPanel) return true;

    if (
      requestContext.isLifepointsPanel &&
      LIFEPOINTS_GOOGLE_PLACES_API_MARKETS.includes(requestContext.countryCode?.toLowerCase() || "")
    ) {
      return true;
    }

    return false;
  };

  const renderAnswer = (question: SurveyQuestionType) => {
    const isPostcodeQuestion = ["5de4", "5de1"].includes(question.key);
    let profileAddressValues = undefined;

    // hides additional address questions if user declines or hasn't provided full address consent
    if (
      consentQuestion &&
      (!consentAnswer || consentAnswer === FULL_ADDRESS_DECLINE_KEY)
    ) {
      if (!VALID_NON_CONSENT_ADDRESS_QUESTIONS.includes(question.key)) {
        return null;
      }
    }

    if (question.key === "address_line_1" && showAutoComplete()) {
      return renderAutoCompleteQuestion(question);
    }

    if (typeof props.addressValues == "object") {
      profileAddressValues = props.addressValues?.[question.key];
    }

    const status = question.status || profileAddressValues?.status;
    const answerKey = question.answerKey || profileAddressValues?.key || "";

    return (
      <div key={question.key}>
        <label htmlFor={question.key} className="address-questions-title">
          {question.title || question.text}
        </label>
        {question.key === FULL_ADDRESS_CONSENT_KEY && (
          <h3 className="address-consent-subtitle">{question.subtitle || question.subtext}</h3>
        )}

        {question.type === "selection" ? (
          <SelectionControls
            question={question}
            updateAnswer={handleUpdate}
            value={answerKey}
            dropdown={question.key !== FULL_ADDRESS_CONSENT_KEY}
            status={status}
            sortByLabel={question.key !== FULL_ADDRESS_CONSENT_KEY}
            isValidAnswer={isValidAnswer}
            showRequiredFlag={true}
          />
        ) : (
          <TextControls
            question={question}
            status={status || ""}
            value={answerKey}
            timeout={isPostcodeQuestion ? 1000 : 0}
            showStatus={isPostcodeQuestion}
            updateAnswer={handleUpdate}
            showRequiredFlag={true}
            changeConfirmButtonVisbility={changeConfirmButtonVisbility}
            errorClassName="address-error-message"
          />
        )}
      </div>
    );
  };

  const renderAutoCompleteQuestion = (question: SurveyQuestionType) => {
    if (!question || !GOOGLE_API_KEY) return null;
    if (!showAutoComplete()) return null;

    let profileAddressValues = undefined;

    if (typeof props.addressValues == "object") {
      profileAddressValues = props.addressValues?.[question.key];
    }

    const status = question.status || profileAddressValues?.status;
    const answerKey = question.answerKey || profileAddressValues?.key || "";

    return (
      <APIProvider apiKey={GOOGLE_API_KEY}>
        <GooglePlacesTextControl
          onPlaceSelect={handlePlaceUpdate}
          question={question}
          status={status || ""}
          updateAnswer={handleUpdate}
          changeConfirmButtonVisbility={changeConfirmButtonVisbility}
          value={answerKey}
          errorClassName="address-error-message"
        />
      </APIProvider>
    );
  };

  return (
    <div className="address-question-group">
      {embeddedQuestions.map(renderAnswer)}
    </div>
  );
};

AddressControls.defaultProps = {
  updateAnswer: () => null,
  question: {},
};

export default AddressControls;
