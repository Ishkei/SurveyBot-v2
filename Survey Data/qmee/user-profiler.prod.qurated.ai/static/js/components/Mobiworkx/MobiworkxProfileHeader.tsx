import Txt from "../common/Txt";
import "./MobiworkxProfileHeader.scss"

const MobiworkxProfileHeader = () => {
  return (
    <div className="profile-header-container">
      <Txt component="h1" className="profile-header-title">
        Survey Matching Profile
      </Txt>
      <div className="profile-header-text mobiworkx">
        <Txt component="h2">
          The more complete you profile, the more chance you have of receiving
          surveys.
        </Txt>
        <Txt component="h2">
          Bought a new car? Changed your mobile operator? Update your profile
          questions as and when your circumstances change. This helps us to
          match you to better surveys.
        </Txt>
      </div>
    </div>
  );
};

export default MobiworkxProfileHeader;
