import "./SurveyQuestionWrapper.scss";
import ConsentQuestionWrapper from "../common/ConsentQuestionWrapper";
import Txt from "../common/Txt";

const CONSENT_QUESTION_KEY = "15b6";
const TERMS_QUESTION_KEY = "terms";
const TERMS_SUBTITLE =
  "By submitting this information you agree to the terms and conditions and it being passed on to our third party partners as part of us being able to provide you with surveys.";

const SurveyQuestionWrapper = (props: any) => {
  const { question, children } = props;
  const data: any = question.data || question;

  if (data.key === CONSENT_QUESTION_KEY) {
    return <ConsentQuestionWrapper>{children}</ConsentQuestionWrapper>;
  }

  const subtitle =
    question.key === TERMS_QUESTION_KEY ? (
      <Txt>{TERMS_SUBTITLE}</Txt>
    ) : (
      data.subtitle || data.subtext
    );

  return (
    <>
      <h6 key={question.key} className="survey-title survey-header-text">
        {data.title || data.text || <Txt>About you</Txt>}
      </h6>
      <div className="survey-content-wrapper">
        <div className="titles">
          <div className="survey-title-container">
            <div>
              {subtitle && (
                <h6 key={question.key} className="survey-subtitle">
                  {subtitle}
                </h6>
              )}
            </div>
          </div>
        </div>
        <div className="survey-content">{children}</div>
      </div>
    </>
  );
};

export default SurveyQuestionWrapper;
