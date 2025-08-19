import { SurveyQuestionType } from "../../types/Prescreener";
import dayjs from "dayjs";

const DateValidator = (question: SurveyQuestionType, answer: string) => {
  if (question.type === 'date' && answer) {
    const minAge = question.minAge || question.min_age;
    const maxAge = question.maxAge || question.max_age;
    const date = dayjs(answer)
    return date.isValid()
      && (!minAge || date <= dayjs().subtract(minAge, 'years'))
      && (!maxAge || date >= dayjs().subtract(maxAge, 'years'))
  } else {
    return false
  }
}

export default DateValidator;