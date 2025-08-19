import Txt from "../common/Txt";

interface Props {
  category: string;
  total?: number;
  completed?: number;
}

const TickIcon = () => (
  <svg
    width="19"
    height="12"
    viewBox="0 0 19 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.74337 12L14.6516 5.63569L19 0H14.181L9.84072 5.63569L7.33389 8.83271L4.81896 5.62082H0L4.92441 12H9.74337Z"
      fill="#00BB31"
    />
  </svg>
);

const MobiworkxCategoryHeader = ({ category, total, completed }: Props) => {
  const percentage = `${completed || 0}/${total}`;
  const isLongPercentage = percentage.length > 4;

  return (
    <div
      className={`category-banner-container ${
        total && total === completed && "category-completed"
      } ${isLongPercentage && "large-category"}`}
    >
      <div className="category-banner">
        <div
          className="tick-container"
        >
          <TickIcon />
        </div>

        <Txt component="span" className="category-title">
          {category || "Other"}
        </Txt>
        <div className="category-info">
          <span className="category-percentage">
            {completed}/{total}
          </span>
        </div>
      </div>
      <span className="chevron-container">
        <span className="chevron bottom" />
      </span>
    </div>
  );
};

export default MobiworkxCategoryHeader;
