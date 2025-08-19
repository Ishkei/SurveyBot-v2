import { ReactComponent as BoostIcon } from "../../assets/BoostIcon.svg";

const LifepointsPercentageBar = ({
  percentage,
  showBoostIcon,
}: {
  percentage: number;
  showBoostIcon: boolean;
}) => {
  return (
    <>
      <div className="loader-bar thin">
        <div
          className="loader-progress thin"
          style={{ width: `${percentage * 0.95 + 5}%` }}
        >
          {showBoostIcon && (
            <span>
              <BoostIcon />
            </span>
          )}
        </div>
      </div>
      <p className="percent-text">{(percentage || 0).toFixed(0)}%</p>
    </>
  );
};

LifepointsPercentageBar.defaultProps = {
  percentage: 0,
  showBoostIcon: false,
};

export default LifepointsPercentageBar;
