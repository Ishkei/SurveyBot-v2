import { AnswerType } from "../types/Profile";

function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const isExclusiveAnswer = (answer: AnswerType): boolean => {
  if (answer.exclusive_multi_punch_answer) return true;
  if (answer.single_multi_punch_answer) return true;
  if (answer.none_answer) return true;

  return false;
};

export const shuffleAnswerOrder = (
  answerArray: AnswerType[],
  anchorExclusive: boolean = true
): AnswerType[] => {

  // remove exclusive answers before randomising if we are anchoring the exclusive answers
  let array = answerArray.filter((a: AnswerType) => !anchorExclusive || !isExclusiveAnswer(a));

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  if (anchorExclusive) {
    const exclusiveAnswers = answerArray.filter((a: AnswerType) =>
      isExclusiveAnswer(a)
    );
    const startItems: AnswerType[] = [];
    const endItems: AnswerType[] = [];

    exclusiveAnswers.forEach((answer: AnswerType) => {
      if (answer.display_order === 0) {
        startItems.push(answer);
      } else {
        endItems.push(answer);
      }
    });

    array = [...startItems, ...array, ...endItems];
  }

  return array;
};

export default shuffleArray;
