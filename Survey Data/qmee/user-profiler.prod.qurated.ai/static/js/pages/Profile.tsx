import "../assets/styling/chevrons.scss";
import "./Profile.scss";
import EditQuestionProvider from "../providers/EditQuestionContext";
import QuickFireSection from "../components/Profile/QuickfireSection";
import ProfileProgressBar from "../components/Profile/ProfileProgressBar";
import AllCategoryQuestions from "../components/Profile/AllCategoryQuestions";
import ProfileContextProvider from "../providers/ProfileContext";
import ProfileHeader from "../components/Profile/ProfileHeader";
import SuperBoostedPopup from "../components/Profile/SuperBoostedPopup";
import { useContext } from "react";
import { RequestCtx } from "../providers/RequestContext";
import MobiworkxProfileProgressBar from "../components/Mobiworkx/MobiworkxProfileProgressBar";
import MobiworkxProfileHeader from "../components/Mobiworkx/MobiworkxProfileHeader";

const Profile = () => {
  const { isMobiworkxPanel } = useContext(RequestCtx);

  return (
    <ProfileContextProvider>
      <EditQuestionProvider>
        <div
          className={`profile-page ${
            isMobiworkxPanel ? "mobiworkx mobiworkx-profiler" : ""
          }`}
        >
          <div className="profile-container">
            {isMobiworkxPanel ? (
              <>
                <MobiworkxProfileProgressBar />
                <MobiworkxProfileHeader />
              </>
            ) : (
              <>
                <ProfileHeader />
                <ProfileProgressBar />
              </>
            )}
            <AllCategoryQuestions />
            <SuperBoostedPopup />
            {!isMobiworkxPanel && <QuickFireSection />}
          </div>
        </div>
      </EditQuestionProvider>
    </ProfileContextProvider>
  );
};

export default Profile;
