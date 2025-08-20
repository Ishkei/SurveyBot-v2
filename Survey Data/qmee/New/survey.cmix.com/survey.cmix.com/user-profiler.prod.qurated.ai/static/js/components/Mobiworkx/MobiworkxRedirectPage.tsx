import Txt from "../common/Txt";
import OffboadingPageAnimation from "../../assets/lottie/loading_surveys_animation.json";
import Lottie from "lottie-react";
import "./MobiworkxRedirectPage.scss";

interface Props {
  surveyFound: boolean;
}

const MobiworkxRedirectPage = ({ surveyFound = false }: Props) => {
  return (
    <div className={`redirectPage mounted mobiworkx`}>
      <div className="redirect-message-container">
        <Lottie
          animationData={OffboadingPageAnimation}
          loop={!surveyFound}
          className="small"
        />

        {!surveyFound ? (
          <div>
            <Txt component="p">One moment</Txt>
            <Txt component="p">
              Whilst we match you to the best possible surveys
            </Txt>
          </div>
        ) : (
          <div>
            <Txt component="p">Matches Found</Txt>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobiworkxRedirectPage;
