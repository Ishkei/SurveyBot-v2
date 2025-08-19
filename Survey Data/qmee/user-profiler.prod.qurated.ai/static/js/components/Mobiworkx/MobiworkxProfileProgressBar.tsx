import { ProfileContext } from "../../providers/ProfileContext";
import { useContext } from "react";
import Txt from "../common/Txt";
import LifepointsPercentageBar from "../Lifepoints/LifepointsPercentageBar";
import MobiworkxQuickFireSection from "./MobiworkxQuickFireSection";

const MobiworkxProfileProgressBar = () => {
  const { profilePercentage } = useContext(ProfileContext);

  return (
    <div className="profile-progress-container">
      <LifepointsPercentageBar
        percentage={profilePercentage}
        showBoostIcon={true}
      />
      {profilePercentage === 100 && (
        <Txt component="p" className="profile-progress-message">
          You are matched to the best surveys
        </Txt>
      )}

      <MobiworkxQuickFireSection/>
    </div>
  );
};

export default MobiworkxProfileProgressBar;
