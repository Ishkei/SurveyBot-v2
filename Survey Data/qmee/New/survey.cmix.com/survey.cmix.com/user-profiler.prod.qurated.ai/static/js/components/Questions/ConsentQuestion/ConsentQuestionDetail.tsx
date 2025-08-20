import "./ConsentQuestionDetail.scss";
import {
  GetAccurateMatchingWording,
  GetProfileAccurateMatchingWording,
} from "../../../providers/PanelBrandSettingsProvider";
import { ReactComponent as MatchRewardIcon } from "../../../assets/MatchRewardIcon.svg";
import Txt from "../../common/Txt";

interface Props {
  isProfileQuestion: boolean;
}

const ConsentQuestionDetail = ({ isProfileQuestion }: Props) => {
  return (
    <>
      <div className="separator">
        <div className="line"></div>
        <p className="separator-icon"><MatchRewardIcon /></p>
        <div className="line"></div>
      </div>
      <div className="consent-details">
        {isProfileQuestion ? (
          <Txt>{GetProfileAccurateMatchingWording()}</Txt>
        ) : (
          <Txt>{GetAccurateMatchingWording()}</Txt>
        )}
      </div>
    </>
  );
};

ConsentQuestionDetail.defaultProps = {
  isProfileQuestion: false
};

export default ConsentQuestionDetail;
