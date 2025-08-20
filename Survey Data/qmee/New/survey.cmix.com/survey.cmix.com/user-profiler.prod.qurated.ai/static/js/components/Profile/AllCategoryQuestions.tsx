import { useContext } from 'react'
import CategoryQuestionList from './CategoryQuestionList';
import { ProfileContext } from '../../providers/ProfileContext';

const AllCategoryQuestions = () => {
    const { profile } = useContext(ProfileContext);

    return (
      <div className="all-category-questions-container">
        {profile?.map(({ category, questions }) => (
          <CategoryQuestionList
            key={category}
            category={category}
            questions={questions}
          />
        ))}
      </div>
    );
  };
  
export default AllCategoryQuestions