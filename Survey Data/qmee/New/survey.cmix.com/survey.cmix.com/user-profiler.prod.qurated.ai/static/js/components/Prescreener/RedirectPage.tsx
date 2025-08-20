import { useContext, useEffect, useState } from "react";
import "./RedirectPage.scss";
import { ReactComponent as ProfileMatched } from "../../assets/Profile_Matched.svg";
import { ReactComponent as LoadingTick } from "../../assets/LoadingTick.svg";
import { ReactComponent as LifepointsRedirectIcon } from "../../assets/LifepointsRedirectIcon.svg";
import { ReactComponent as LifepointsMatchFoundIcon } from "../../assets/LifepointsMatchFoundIcon.svg";
import Txt from "../common/Txt";
import { RequestCtx } from "../../providers/RequestContext";
import MobiworkxRedirectPage from "../Mobiworkx/MobiworkxRedirectPage";
interface Props {
  cancelLoading: () => void;
  surveyFound: boolean;
}

const RedirectPage = ({
  cancelLoading = () => {},
  surveyFound = false,
}: Props) => {
  const { isLifepointsPanel, isMobiworkxPanel } = useContext(RequestCtx);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setMounted(true);

    let timeout = setTimeout(() => {
      if (isMounted) cancelLoading();
    }, 10000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [cancelLoading]);

  if(isMobiworkxPanel){
    return (<MobiworkxRedirectPage surveyFound={surveyFound} />);
  }

  return (
    <div className={`redirectPage ${mounted && "mounted"}`}>
      {isLifepointsPanel ? (
        !surveyFound ? (
          <div className="redirect-message-container">
            <LifepointsRedirectIcon className="small"/>
            <Txt component="p">Just a moment,</Txt>
            <Txt component="p">we're matching you to our surveys...</Txt>
          </div>
        ) : (
          <div className="redirect-message-container">
            <LifepointsMatchFoundIcon />
            <Txt component="p">Matches Found</Txt>
          </div>
        )
      ) : (
        <div>
          <div className="profileMatchedAnimation">
            <ProfileMatched className="profileMatchedIcons" />
            <LoadingTick className="profileMatchedTick" />
          </div>

          <Txt component="p" className="title">
            Profile Matching Completed
          </Txt>
          <Txt component="p">Loading your rewarded survey</Txt>

          <div className="redirectSpinner" />
        </div>
      )}
    </div>
  );
};

export default RedirectPage;
