import React from "react";
import { ReactComponent as BoostIcon } from "../../assets/BoostIcon.svg";

const PercentageBar = ({
  percentage,
  showBoostIcon,
}: {
  percentage: number;
  showBoostIcon: boolean;
}) => {
  return (
    <div className="loader-bar">
      <div
        className="loader-progress"
        style={{ width: `${percentage * 0.95 + 5}%` }}
      >
        {showBoostIcon && (
          <span>
            <BoostIcon />
          </span>
        )}
        <p className="percent-text">{(percentage || 0).toFixed(0)}%</p>
      </div>
    </div>
  );
};

PercentageBar.defaultProps = {
  percentage: 0,
  showBoostIcon: false,
};

export default PercentageBar;
