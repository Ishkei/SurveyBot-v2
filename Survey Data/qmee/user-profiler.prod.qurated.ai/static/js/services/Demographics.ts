import axios from "axios";
import type { CategoryType } from "../types/Profile";
import type {
  SubmitPrescreenerResponse,
  SubmitRequestBody,
  SubmitRequestObjects,
  SurveyQuestionListType,
  SurveyQuestionType,
  NestedQuestionAnswers,
} from "../types/Prescreener";
import completionCheck from "./completionCheck";
import findParentMismatch from "./parentMismatch";
import { sendEventLog } from "./EventLogs";
import profilerFinishedRedirect from "../utils/ProfilerFinishedRedirect";
import profilingApiUrl from "../utils/profilingApiUrl";

interface NextQuestionType {
  questions?: SurveyQuestionType[];
}

interface PrecreenerResponseType {
  questions: SurveyQuestionType[];
}


export async function getProfile(token: string, language?: string) {
  try {
    let path = `${profilingApiUrl(token)}/user/profile?token=${token}&redirect=false`

    if (language) {
      path += `&language=${language}`;
    }

    const { data, status } = await axios.get<CategoryType[]>(path);

    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return [];
    } else {
      console.log("unexpected error: ", error);
      return [];
    }
  }
}

interface UserProfileInfoResponseType {
  remaining_question_count?: number;
  profile_completion_percentage: number;
}

export async function getUserProfileInfo(token: string): Promise<UserProfileInfoResponseType | undefined> {
  try {
    const { data, status } = await axios.get<UserProfileInfoResponseType>(
      `${profilingApiUrl(token)}/user/prescreener/info?token=${token}&redirect=false`
    );

    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return;
    } else {
      console.log("unexpected error: ", error);
      return;
    }
  }
}

export async function getPrescreener(
  token: string,
  encodedProfile?: string,
  profileIV?: string,
  limit: number = 3,
  language?: string
) {
  try {
    let path = `${profilingApiUrl(token)}/user/prescreener?token=${token}&limit=${limit}`;

    if (language) {
      path += `&language=${language}`;
    }

    if (encodedProfile && profileIV) {
      path += `&encProfile=${encodedProfile}&profileiv=${profileIV}&redirect=false`;
    }

    const { data, status } = await axios.get<PrecreenerResponseType>(path);

    console.log("response status is: ", status);

    return data?.questions;
  } catch (error: any) {
    console.log("error message: ", error.message);
    if (error.response?.status !== 404) {
      sendEventLog(
        "prescreener_error_occurred",
        {
          location: "getPrescreener",
          error: error.message,
          data: error.response?.data,
          status: error.response?.status,
        },
        token
      );
    }

    if (error.response?.status === 401) {
      profilerFinishedRedirect(token, "expired_link");
    }

    return [];
  }
}

export async function getNextPriorityQuestion(token: string, language?: string) {
  try {
    let path =  `${profilingApiUrl(token)}/user/prescreener?token=${token}&count=1&redirect=false`
    if (language) {
      path += `&language=${language}`;
    }

    const { data } = await axios.get<NextQuestionType>(path);

    return data?.questions?.[0];
  } catch (error: any) {
    console.error(error);
    return undefined;
  }
}

export async function submitQuestionAnswer(
  token: string,
  questionKey: string,
  answer: string
) {
  answer = !answer || answer === "n/a" ? "none" : answer;
  if (questionKey === "5de4") answer = answer.replace(/\W/g, "");

  const { data, status } = await axios.post<SubmitPrescreenerResponse>(
    `${profilingApiUrl(token)}/question/${questionKey}/answer/${answer}?token=${token}&redirect=false`
  );

  console.log("response status is: ", status);

  return data.questions || [];
}

export async function submitAddressAnswers(
  token: string,
  _questionKey: string,
  addressAnswers: {[s:string]: string}
) {

  try {
    const { data } = await axios.post<SubmitPrescreenerResponse>(
      `${profilingApiUrl(token)}/user/prescreener?token=${token}&more=false&redirect=false&miniScreener=false`,
      {
        response: {},
        prefilled: {},
        address: addressAnswers
      }
    );

    return data.questions || [];
  } catch (error: any) {
    if (error.response?.status === 401) {
      profilerFinishedRedirect(token, "expired_link");
    }

    throw error;
  }
}

export const getSubmitRequestBody = (
  questions: SurveyQuestionListType
): SubmitRequestBody => {
  const response: SubmitRequestObjects = {};
  const prefilled: SubmitRequestObjects = {};
  const addressAnswers: NestedQuestionAnswers = {};
  for (const key in questions) {
    const question = questions[key];
    const status = question.status;

    const embeddedQuestions = question.address_questions || question.nested_questions;

    if (!!embeddedQuestions?.length) {
      for (let i = 0; i < embeddedQuestions.length; i++) {
        const embeddedQuestion = embeddedQuestions[i];
        const key = embeddedQuestion.key;
        let answer = embeddedQuestion.answerKey;

        if (
          embeddedQuestion.status !== "valid" ||
          typeof answer === "undefined" ||
          answer === null
        ) {
          continue;
        }

        if (answer && key === "5de4") {
          answer = answer.replace(/\W/g, "");
        }

        addressAnswers[key] = answer;
      }
      continue;
    }

    if (
      typeof question.answerKey === "undefined" ||
      question.answerKey === null ||
      findParentMismatch(questions, question.key)
    ) {
      continue;
    }

    if (question.key === "5de4") {
      question.answerKey = question.answerKey.replace(/\W/g, "");
    }

    if (status === "valid" || status === "prefilled") {
      response[key] = question.answerKey;
    }
    if (status === "prefilled") {
      prefilled[key] = question.answerKey;
    }
  }

  const body: SubmitRequestBody = { response, prefilled };

  if (Object.values(addressAnswers).length) body["address"] = addressAnswers;

  return body;
};

export async function submitPrescreener(
  token: string,
  questions: SurveyQuestionListType,
  miniScreener: string,
  moreQuestions?: boolean,
  encodedProfile?: string,
  profileIV?: string
) {
  if (!completionCheck(questions)) {
    throw Error("Questions are not all complete");
  }

  const body = getSubmitRequestBody(questions);
  try {
    const { data } = await axios.post<SubmitPrescreenerResponse>(
      `${profilingApiUrl(token)}/user/prescreener?token=${token}&more=${moreQuestions}&redirect=false&miniScreener=${miniScreener}${
        encodedProfile && profileIV
          ? `&encProfile=${encodedProfile}&profileiv=${profileIV}`
          : ""
      }`,
      body
    );

    return data.questions || [];
  } catch (error: any) {
    if (error.response?.status === 401) {
      profilerFinishedRedirect(token, "expired_link");
    }

    throw error;
  }
}

export async function submitEndlessQuestions(
  token: string,
  questions: SurveyQuestionListType,
  moreQuestions?: boolean,
  limit?: Number
) {
  if (!completionCheck(questions)) {
    throw Error("Questions are not all complete");
  }

  const body = getSubmitRequestBody(questions);
  try {
    const { data } = await axios.post<SubmitPrescreenerResponse>(
      `${profilingApiUrl(token)}/user/prescreener?token=${token}&more=${moreQuestions}&redirect=false&miniScreener=true&limit=${
        limit || 3
      }`,
      body
    );

    return data.questions || [];
  } catch (error: any) {
    if (error.response?.status === 401) {
      profilerFinishedRedirect(token, "expired_link");
    }

    throw error;
  }
}
