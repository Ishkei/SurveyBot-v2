import { AnswerKeyType, SurveyQuestionListType } from "../types/Prescreener";
import findExtendedPrerequisiteMatch, { findOptionsParentmatch } from "./extendedPrerequisiteMatch";

const isAnswer = (answer: AnswerKeyType) =>
  answer !== null && answer !== undefined;

const findParentMismatch = (
  questionsData: SurveyQuestionListType,
  key: string
) => {
  const childData = questionsData[key] || {};
  const extendedPrerequisites: any = childData.extended_prerequisites;

  if (extendedPrerequisites) {
    return !findExtendedPrerequisiteMatch(questionsData, key);
  }

  if(childData?.options?.parents) {
    return !findOptionsParentmatch(questionsData, key);
  }

  if (!childData.parents) {
    return null;
  }

  let parents: any = childData.parents;
  let match = true;

  if (parents["if"]) {
    parents = parents["if"];
  }

  if (parents["unless"]) {
    parents = parents["unless"];
    match = false;
  }

  return Object.entries(parents).find(
    ([parentId, requirement]: [string, any]) => {
      const parent = questionsData[parentId];

      if (!parent) {
        return null;
      }

      if (!isAnswer(parent.answerKey)) {
        return true;
      }

      if (findParentMismatch(questionsData, parentId)) {
        return true;
      }

      const answerKeys = Array.isArray(requirement)
        ? requirement
        : requirement?.answerKeys;

      const matches = answerKeys?.includes(parent.answerKey);
      if ((requirement?.type === "if" || Array.isArray(requirement)) && match) {
        return !matches;
      } else if (requirement?.type === "unless" || !match) {
        return matches;
      } else {
        return false;
      }
    }
  );
};

export default findParentMismatch;
