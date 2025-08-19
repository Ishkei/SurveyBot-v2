import { useState, useContext } from "react";
import { RequestCtx } from "../../providers/RequestContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetOnboardingWording } from "../../providers/PanelBrandSettingsProvider";
import Txt from "../common/Txt";
import WhyDoWeAskPopup from "../Lifepoints/WhyDoWeAskPopup";
import profilerFinishedRedirect from "../../utils/ProfilerFinishedRedirect";
import LifepointsLandingExitModal from "../Lifepoints/LifepointsLandingExitModal";
import LandingPageAnimation from "../../assets/lottie/landing_page_animation.json";
import Lottie from "lottie-react";
import "./MobiworkxLandingPage.scss"

const MobiworkxLandingPage = () => {
  const { search } = useLocation();
  const requestContext = useContext(RequestCtx);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showWhyDoWeAskPopup, setShowWhyDoWeAskPopup] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleLeave = () => {
    profilerFinishedRedirect(requestContext.jwt, "exited");
  };

  const handleWhyPopupOpen = () => {
    setShowWhyDoWeAskPopup(true);
  };

  const handleClose = () => {
    setShowWhyDoWeAskPopup(false);
    setShowExitModal(false);
    navigate(`/prescreener${search}`);
  };

  return (
    <div className="mobiworkx">
      <div className="sub-page">
        <div className="sub-page-container">
        <Txt component="h2" className="mobile-sub-page-header">
                Welcome onboard
              </Txt>
          <div className="landing-graphic-container">
            <Lottie animationData={LandingPageAnimation} loop={false} />
          </div>

          <div className="sub-page-info">
            <div>
              <Txt component="h2" className="sub-page-header">
                Let's tailor our surveys for you
              </Txt>
              <div className="sub-page-text-container">
                <Txt component="p">{GetOnboardingWording()}</Txt>
              </div>
            </div>

            <button
              className="sub-page-link"
              onClick={handleWhyPopupOpen}
              style={{ padding: "0", margin: "10px auto 30px" }}
            >
              <Txt>Why is this important?</Txt>
            </button>

            <Link
              to={`/prescreener${search}`}
              className="sub-page-primary-button"
            >
              <Txt>Match me to surveys</Txt>
            </Link>
            <button
              className="sub-page-link"
              onClick={() => {
                setShowExitModal(true);
              }}
            >
              <Txt>Skip for now</Txt>
            </button>
          </div>

          <WhyDoWeAskPopup
            visible={showWhyDoWeAskPopup}
            onCancel={handleClose}
            onLeave={handleLeave}
            className="mobiworkx"
          />

          <LifepointsLandingExitModal
            visible={showExitModal}
            onCancel={handleClose}
            onLeave={handleLeave}
            className="mobiworkx"
          />
        </div>
      </div>
    </div>
  );
};

export default MobiworkxLandingPage;
