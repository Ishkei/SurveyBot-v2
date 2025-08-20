import React from 'react'
import { getCategoryIcon } from '../../utils/categoryIcons';
import { ReactComponent as BoostIcon } from "../../assets/BoostIcon.svg";
import "./QuestionHeaderInfo.scss";

const QuestionHeaderInfo = ({
    questionNumber,
    category,
  }: {
    questionNumber: number | string;
    category: string;
  }) => {
    const categoryIcon = getCategoryIcon(category);
  
    return (
      <div className="question-info-container">
        <div className="question-category-icon">{categoryIcon}</div>
        <span className="question-number">
          {questionNumber}
        </span>
        <div className="boost-icon">
          <BoostIcon />
        </div>
      </div>
    );
  };

  export default QuestionHeaderInfo;