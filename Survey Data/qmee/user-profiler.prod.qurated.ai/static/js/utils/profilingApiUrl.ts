import { decodeToken } from "../services/DecodeToken";

const herokuUrl = process.env.REACT_APP_PROVIDER_API_DOMAIN || "http://localhost:8000";
const awsUrl = process.env.REACT_APP_PROVIDER_API_AWS_DOMAIN;

const profilingApiUrl = (token?: string) => {
  if (!token) return herokuUrl;
  if(process.env.REACT_APP_PROVIDER_API_AWS_ENABLED === "true") return awsUrl;

  const { profiler_api_ab_test }: any = decodeToken(token);
  if (profiler_api_ab_test){
    return awsUrl || herokuUrl;
  };

  return herokuUrl;
};


export default profilingApiUrl;