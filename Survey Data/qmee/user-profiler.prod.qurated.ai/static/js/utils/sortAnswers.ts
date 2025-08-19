import { AnswerType } from "../types/Profile";

export const sortAnswers = (answers: AnswerType[]): AnswerType[] => {
  const sortedAnswers = answers.sort((a, b) => {
    if (a.priority && b.priority) return a.priority - b.priority;
    if (a.priority && !b.priority) return 1;
    if (!a.priority && b.priority) return -1;

    if (a.display_order && b.display_order) return a.display_order - b.display_order;
    if (a.display_order && !b.display_order) return 1;
    if (!a.display_order && b.display_order) return -1;

    if (a.single_multi_punch_answer || a.exclusive_multi_punch_answer || a.none_answer) return -1;

    return a.label?.localeCompare ? a.label.localeCompare(b.label) : 0;
  });

  return sortedAnswers;
};
