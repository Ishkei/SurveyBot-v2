import React, { useContext } from "react";
import "./ProgressLoader.scss";
import { RequestCtx } from "../../providers/RequestContext";
import ExitButton from "../common/buttons/ExitHeaderButton";
import BackButton from "../common/buttons/BackHeaderButton";
import LifepointsPercentageBar from "../Lifepoints/LifepointsPercentageBar";

interface Props {
  percentage: number;
  isSignupSurvey?: boolean;
  previousQuestion: () => void;
  isStartQuestion: boolean;
  provider: string;
  isInitialPrescreenerComplete?: boolean;
  endlessProfiler?: boolean;
  onExit?: () => void;
  isLastQuestion?: boolean;
  showLoader?: boolean;
}
function ProgressLoader({
  percentage,
  previousQuestion,
  isStartQuestion,
  provider,
  endlessProfiler,
  isInitialPrescreenerComplete,
  onExit,
  isLastQuestion = false,
  showLoader = true,
}: Props) {
  const requestContext = useContext(RequestCtx);
  const handleExit = () => {
    if (requestContext.isLifepointsPanel && onExit) {
      return onExit();
    } else {
      window.history.back();
    }
  };

  const lastFirstProfilerQuestion = !endlessProfiler && isLastQuestion;

  const loaderPercentage =
    lastFirstProfilerQuestion || isInitialPrescreenerComplete
      ? 100
      : percentage;

  const showExitButton = () => {
    if (provider === "qmee") return false;
    if (requestContext.isLifepointsPanel || requestContext.isMobiworkxPanel) return true;

    return !!isStartQuestion || !!endlessProfiler;
  };

  const showBackButton = () => {
    if (provider === "qmee") return false;

    return !isStartQuestion && !endlessProfiler;
  };

  return (
    <div className="progress-loader-container">
      <div className="progress-container">
          <ExitButton
            onClick={() => {
              handleExit();
            }}
            hide={!showExitButton()}
          />
          <BackButton
            onClick={() => {
              previousQuestion();
            }}
            hide={!showBackButton()}
          />
        {!!showLoader && (
          <LifepointsPercentageBar percentage={loaderPercentage} />
        )}
      </div>
    </div>
  );
}

ProgressLoader.defaultProps = {
  isStartQuestion: false,
  previousQuestion: () => null,
  percentage: 0,
};
export default ProgressLoader;
