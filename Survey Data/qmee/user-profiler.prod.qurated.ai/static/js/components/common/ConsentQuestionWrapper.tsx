import { ReactNode } from "react";
import {
  GetAccurateMatchingSubtitle,
  GetAccurateMatchingTitle,
} from "../../providers/PanelBrandSettingsProvider";
import Txt from "./Txt";

interface Props {
  children: ReactNode;
  className?: string;
}

const ConsentQuestionWrapper = ({ children, className }: Props) => {
  return (
    <div className={`survey-content-wrapper ${className}`}>
      <div className="titles">
        <div className="survey-title-container">
          <Txt component="h6" className="survey-title">{GetAccurateMatchingTitle() || "Improve your rewards"}</Txt>
          <Txt component="h6" className="survey-subtitle">
              {GetAccurateMatchingSubtitle() ||
                "Allow us to ask you questions based on your race, ethnicity, health, political views and religion."}
          </Txt>
        </div>
      </div>
      <div className="survey-content">{children}</div>
    </div>
  );
};

export default ConsentQuestionWrapper;
