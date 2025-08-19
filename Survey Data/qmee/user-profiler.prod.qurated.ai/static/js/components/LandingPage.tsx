import { ReactComponent as LandingPageGraphic } from "../assets/LandingPageGraphic.svg";
import { Link, useLocation } from "react-router-dom";
import { GetOnboardingWording } from "../providers/PanelBrandSettingsProvider";
import Txt from "./common/Txt";

const LandingPage = () => {
  const { search } = useLocation();
  const handleLeave = () => {
    window.history.back();
  };

  return (
    <div className="sub-page">
      <div className="sub-page-container">
        <div className="landing-graphic-container">
          <LandingPageGraphic />

          <Txt component="p" className="landing-page-graphic-text">
            Your Survey Matching Questionnaire
          </Txt>
        </div>

        <div className="sub-page-info">
          <div>
            <Txt component="h2" className="sub-page-header">
              Welcome!
            </Txt>
            <div className="sub-page-text-container">
              <Txt component="p">{GetOnboardingWording()}</Txt>
            </div>
          </div>
          <Link
            to={`/prescreener/why${search}`}
            className="sub-page-link"
            style={{ padding: "0", margin: "10px auto 30px" }}
          >
            <Txt>Why do we ask this?</Txt>
          </Link>

          <Link
            to={`/prescreener${search}`}
            className="sub-page-primary-button"
          >
            <Txt>Let's go</Txt>
          </Link>
          <button className="sub-page-link" onClick={handleLeave}>
            <Txt>I'm not interested</Txt>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
