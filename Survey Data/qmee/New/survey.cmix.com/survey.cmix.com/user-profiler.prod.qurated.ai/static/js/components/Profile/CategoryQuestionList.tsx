import Collapsible from "react-collapsible";
import CategoryHeader from "./CategoryHeader";
import ProfileQuestion from "./ProfileQuestion";
import "./CategoryQuestionList.scss";
import { SurveyQuestionType } from "../../types/Prescreener";
import { useContext, useRef } from "react";
import { ProfileContext } from "../../providers/ProfileContext";

interface Props {
  category: string;
  questions: SurveyQuestionType[];
}

const CategoryQuestionList = ({ category, questions }: Props) => {
  const { activeCategory, updateActiveCategory } = useContext(ProfileContext);
  const containerRef = useRef<null | HTMLDivElement>(null);

  const handleOpen = () => {
    updateActiveCategory(category);
  };

  const handleClose = () => {
    if (activeCategory === category) {
      updateActiveCategory(undefined);
    }
  };

  const scrollIntoView = () => {
    const yOffset = -100;
    const y =
      (containerRef.current?.getBoundingClientRect?.()?.top || 0) +
      (window.scrollY || window.pageYOffset) +
      yOffset;

    window?.scrollTo?.({ top: y, behavior: "smooth" });
  };

  return (
    <div ref={containerRef}>
      <Collapsible
        onOpening={handleOpen}
        onOpen={scrollIntoView}
        onClosing={handleClose}
        open={activeCategory === category}
        triggerClassName="collapsible-category-header-closed"
        openedClassName="collapsible-category-header-open"
        contentInnerClassName="collapsible-content-inner"
        contentOuterClassName="collapsible-content-outer"
        className={`collapsible-category-header ${
          activeCategory && activeCategory !== category && "category-unfocused"
        }`}
        trigger={<CategoryHeader category={category} />}
      >
        {questions?.map((question) => (
          <ProfileQuestion key={question.key} question={question} />
        ))}
      </Collapsible>
    </div>
  );
};

export default CategoryQuestionList;
