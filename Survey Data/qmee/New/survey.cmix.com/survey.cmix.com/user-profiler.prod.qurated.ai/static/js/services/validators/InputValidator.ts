import axios from "axios";
import { SurveyQuestionType } from "../../types/Prescreener";
import 'url-search-params-polyfill';
import profilerFinishedRedirect from "../../utils/ProfilerFinishedRedirect";
import profilingApiUrl from "../../utils/profilingApiUrl";

const getJwtToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token")
  return token
};

const inputValidator = async (
  question: SurveyQuestionType,
  answer: string
): Promise<boolean> => {
    answer = answer?.trim();

    if (!answer) return false;

    const { regex } = question.input || question;
    const minLength = question.input?.minLength || question.min_length || 1;
    const maxLength = question.input?.maxLength || question.max_length || 60;
    const postcodeQuestion = question.input?.type === "postcode" || question?.input_type === "postcode" || question?.key === "5de4";

    if (minLength && answer.length < minLength) return false;
    if (maxLength && answer.length > maxLength) return false;

    if(regex){
      const valid = RegExp(regex, "u").test(answer);
      if(!valid) return false;
    } else if(postcodeQuestion){
      const valid = RegExp("^[\\w -]+$").test(answer);
      if(!valid) return false;
    }

    if (postcodeQuestion) {
      const formattedAnswer = answer.replace(/[ -]/g, "");
      const jwt = getJwtToken();
      return axios
        .get(`${profilingApiUrl(jwt || "")}/question/${question.key}/answer/${formattedAnswer}/validate?token=${jwt}`)
        .then(() => true)
        .catch((error) => {
          console.error(error);
          if (error.response?.status === 400) return false;
          if(error.response?.status === 401){
            profilerFinishedRedirect(String(jwt), "expired_link");
          }
          error.question = question;
          error.answer = answer;
          throw error;
        });
    }
  return true;
};

export default inputValidator;