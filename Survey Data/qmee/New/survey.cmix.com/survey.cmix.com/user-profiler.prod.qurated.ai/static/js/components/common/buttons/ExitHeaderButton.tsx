import { useContext } from "react";
import { RequestCtx } from "../../../providers/RequestContext";

interface Props {
  onClick: () => void;
  hide: boolean;
  title?: string;
}

const MobiWorkxExitSvg = () => {
  return (
    <svg width="19" height="19" className="icon" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">

  <path d="M16.5998 15.6286L9.7998 9.31429L16.5998 3" stroke="#3C3C3C" stroke-width="4" stroke-linecap="square"/>
  <path d="M2.9998 3.00033L9.79981 9.31462L2.9998 15.6289" stroke="#3C3C3C" stroke-width="4" stroke-linecap="square"/>
  {/* <path d="M48.8 15.6286L42 9.31429L48.8 3" stroke="#3C3C3C" stroke-width="4" stroke-linecap="square"/> */}
</svg>
  );
};

const ExitSvg = () => {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 34 34"
      fill="none"
      className="icon"
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
        d="M23.6008 23.6286L16.8008 17.3143L23.6008 11"
        stroke="#303F9F"
        strokeLinecap="round"
      />
      <path
        d="M10.0008 11.0003L16.8008 17.3146L10.0008 23.6289"
        stroke="#303F9F"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ExitButton = ({ onClick, hide, title }: Props) => {
  const { isMobiworkxPanel } = useContext(RequestCtx);
  if (hide) return null;

  return (
    <button
      className="exit-button"
      onClick={onClick}
      title={title || "Exit"}
      aria-label="exit"
    >
      {isMobiworkxPanel ? <MobiWorkxExitSvg /> : <ExitSvg />}
    </button>
  );
};

export default ExitButton;
