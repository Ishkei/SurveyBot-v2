import profilingApiUrl from "./profilingApiUrl";

export function profilerFinishedUrl(jwt: string, status: string = "complete") {
  return `${profilingApiUrl(jwt)}/prescreen/finished/${status}?token=${jwt}`;
}

export const profilerFinishedRedirect = (jwt: string, status: string = "complete") => {
  window.location.href = profilerFinishedUrl(jwt, status);
}

export default profilerFinishedRedirect