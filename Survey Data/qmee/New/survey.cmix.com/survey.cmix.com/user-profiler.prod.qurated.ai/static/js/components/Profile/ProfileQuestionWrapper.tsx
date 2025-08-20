import ConsentQuestionWrapper from "../common/ConsentQuestionWrapper";
import Txt from "../common/Txt";

const CONSENT_QUESTION_KEY = "15b6";
const TERMS_QUESTION_KEY = "terms";
const TERMS_SUBTITLE =
  "By submitting this information you agree to the terms and conditions and it being passed on to our third party partners as part of us being able to provide you with surveys.";

const ProfileQuestionWrapper = (props: any) => {
  const { question, removeTitle, customTitle, children } = props;
  const data: any = question.data || question;

  if (data.key === CONSENT_QUESTION_KEY) {
    return (
      <ConsentQuestionWrapper className="profile-content-wrapper">
        {children}
      </ConsentQuestionWrapper>
    );
  }

  const subtitle =
    question.key === TERMS_QUESTION_KEY ? (
      <Txt>{TERMS_SUBTITLE}</Txt>
    ) : (
      data.subtitle || data.subtext
    );

  return (
    <div className={`survey-content-wrapper profile-content-wrapper type-${question.type}`}>
      <div className="titles">
        <div className="survey-title-container">
          {!!customTitle ? (
            <div className="custom-survey-title-container">
              <Txt component="h6" className="survey-title custom">{customTitle}</Txt>
            </div>
          ) : (
            <div>
              <h6 className="survey-title">
                {data.title || data.text || <Txt>About you</Txt>}
              </h6>
              {subtitle && (
                <h6 className="survey-subtitle">
                  {subtitle}
                </h6>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="survey-content">{children}</div>
      {!!customTitle && (
        <button onClick={removeTitle} className="cancel-button">
          <Txt>{customTitle === "Edit Child" ? "Go back" : "Cancel"}</Txt>
        </button>
      )}
    </div>
  );
};

export default ProfileQuestionWrapper;
