import { useContext } from "react";
import { RequestCtx } from "../../../providers/RequestContext";

const MobiWorkxExitSvg = () => {
  return (
    <svg width="19" height="19" className="icon" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.8 15.6286L3 9.31429L9.8 3" stroke="#3C3C3C" stroke-width="4" stroke-linecap="square"/>
  </svg>
  );
};

const ExitSvg = () => {
  return (
    <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    className="icon"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="17"
      cy="17"
      rx="17"
      ry="17"
      transform="rotate(-180 17 17)"
      className="back-button-fill"
    />
    <path
      d="M20.8 23.6286L14 17.3143L20.8 11"
      stroke="#303F9F"
      strokeLinecap="round"
    />
  </svg>
  );
};

const BackButton = ({
  onClick,
  hide,
}: {
  onClick: () => void;
  hide: boolean;
}) => {
  const { isMobiworkxPanel } = useContext(RequestCtx);

  if (hide) {
    return null;
  }

  return (
    <button className="back-button" onClick={onClick} aria-label="back">
  
      {isMobiworkxPanel ? <MobiWorkxExitSvg /> : <ExitSvg />}
    </button>
  );
};

export default BackButton;
