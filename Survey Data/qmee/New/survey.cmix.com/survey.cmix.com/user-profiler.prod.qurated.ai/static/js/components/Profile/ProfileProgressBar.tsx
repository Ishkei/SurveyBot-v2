import "./PercentageBar.scss";
import { ProfileContext } from "../../providers/ProfileContext";
import { useContext } from "react";
import Txt from "../common/Txt";
import PercentageBar from "../common/PercentageBar";

const ProfileProgressBar = () => {
  const { profilePercentage } = useContext(ProfileContext);

  return (
    <div className="profile-progress-container">
      <PercentageBar percentage={profilePercentage} showBoostIcon={true} />
      {profilePercentage === 100 && (
        <Txt component="p" className="profile-progress-message">
          You are matched to the best surveys
        </Txt>
      )}
    </div>
  );
};

export default ProfileProgressBar;
