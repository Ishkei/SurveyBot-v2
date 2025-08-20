import React, { useContext, useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import "./SuperBoostPopup.scss";
import { ProfileContext } from "../../providers/ProfileContext";
import { ReactComponent as CloseIcon } from "../../assets/closeIcon.svg";
import { ReactComponent as OinqIcon } from "../../assets/SuperBoosted_Oinq.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile_icon.svg";
import { RequestCtx } from "../../providers/RequestContext";
import Txt from "../common/Txt";

const SuperBoostedPopup = () => {
  const { provider, isMobiworkxPanel } = useContext(RequestCtx);
  const { profilePercentage } = useContext(ProfileContext);

  const [visible, setVisible] = useState<boolean>(false);
  const previousPercentageRef = useRef<number | undefined>();

  useEffect(() => {
    // only is visible if you are going to 100% and not already at 100%
    if (
      previousPercentageRef.current &&
      previousPercentageRef.current !== 100 &&
      profilePercentage === 100
    ) {
      setVisible(true);
    }

    previousPercentageRef.current = profilePercentage;
  }, [profilePercentage]);

  const closePopup = () => {
    setVisible(false);
  };

  return (
    <Modal
      isOpen={visible}
      className={`question-modal-container super-boost ${
        provider === "lifpoints" && "lifepoints-profiler"
      } ${isMobiworkxPanel ? "mobiworkx-profiler" : ""}`}
      overlayClassName="question-modal-background"
      onRequestClose={closePopup}
    >
      <div className="super-boost-container">
        <button
          onClick={closePopup}
          className="quick-fire-close-button"
          title="Close"
        >
          <CloseIcon />
        </button>

        <div className="super-boost-image">
          {provider === "qmee" ? (
            <OinqIcon />
          ) : (
            <ProfileIcon />
          )}
        </div>
        {provider === "qmee" ? (
          <Txt className="super-boost-title" component="h1">
            100% Super Boosted
          </Txt>
        ) : (
          <Txt className="super-boost-title" component="h1">
            Your Profile is 100%
          </Txt>
        )}

        {provider === "qmee" ? (
          <Txt component="p" className="super-boost-text">
            Your profile is ready to be matched to the best possible surveys
            Don’t forget to keep checking back and updating the necessary.
          </Txt>
        ) : (
          <Txt component="p" className="super-boost-text">
            Don’t forget to update your profile questions as and when your
            circumstances change. This helps us to match you to better surveys.
          </Txt>
        )}

        <button className="super-boost-green-button" onClick={closePopup}>
          <Txt>Close</Txt>
        </button>
      </div>
    </Modal>
  );
};

export default SuperBoostedPopup;
