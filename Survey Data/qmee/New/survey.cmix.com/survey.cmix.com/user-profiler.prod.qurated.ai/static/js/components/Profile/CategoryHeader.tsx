import { getCategoryIcon } from "../../utils/categoryIcons";
import { ReactComponent as BoostIcon } from "../../assets/BoostIcon.svg";
import "./CategoryHeader.scss";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../providers/ProfileContext";
import Txt from "../common/Txt";
import MobiworkxCategoryHeader from "../Mobiworkx/MobiworkxCategoryHeader";
import { RequestCtx } from "../../providers/RequestContext";

interface Props {
  category: string;
}

const CategoryHeader = ({ category }: Props) => {
  const { getQuestionCompletion } = useContext(ProfileContext);
  const { isMobiworkxPanel } = useContext(RequestCtx);

  const [total, setTotal] = useState<number | undefined>();
  const [completed, setCompleted] = useState<number | undefined>();

  useEffect(() => {
    const { total, completed } = getQuestionCompletion(category);
    setTotal(total);
    setCompleted(completed);
  }, [getQuestionCompletion, category]);

  const percentage = `${completed || 0}/${total}`;
  const isLongPercentage = percentage.length > 4;

  if (isMobiworkxPanel)
    return (
      <MobiworkxCategoryHeader
        category={category}
        total={total}
        completed={completed}
      />
    );

  return (
    <div
      className={`category-banner-container ${
        total && total === completed && "category-completed"
      } ${isLongPercentage && "large-category"}`}
    >
      <div className="category-banner">
        <div className="category-info">
          <div className="category-image">{getCategoryIcon(category)}</div>
          <span className="category-percentage">
            {completed}/{total}
          </span>
          <div className="boost-icon">
            <BoostIcon />
          </div>
        </div>
        <Txt component="span" className="category-title">
          {category || "Other"}
        </Txt>
      </div>
      <span className="chevron-container">
        <span className="chevron bottom" />
      </span>
    </div>
  );
};

export default CategoryHeader;
