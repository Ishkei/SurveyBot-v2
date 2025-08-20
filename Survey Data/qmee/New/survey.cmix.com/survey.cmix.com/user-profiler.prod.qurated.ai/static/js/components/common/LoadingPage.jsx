import { useContext } from "react";
import LoadingAnimation from "../Prescreener/LoadingAnimation";
import { RequestCtx } from "../../providers/RequestContext";
import { ReactComponent as LifepointsLoadingIcon } from "../../assets/LifepointsLoadingIcon.svg";

const LoadingPage = () => {
  const { isLifepointsPanel } = useContext(RequestCtx);

  if (isLifepointsPanel) {
    return (
      <div className="loading-page">
        <LifepointsLoadingIcon className="spinner-icon" />
      </div>
    );
  }
  return (
    <div className="loading-page">
      <LoadingAnimation />
    </div>
  );
};

export default LoadingPage;
