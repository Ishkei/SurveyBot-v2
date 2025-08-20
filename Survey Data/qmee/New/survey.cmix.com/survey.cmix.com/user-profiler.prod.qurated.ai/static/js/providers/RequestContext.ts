import React from "react";
import { decodeToken } from "../services/DecodeToken";
import 'url-search-params-polyfill';

interface RequestContextInterface {
  jwt: string;
  provider: string;
  userGuid?: string;
  destinationUrl?: string;
  countryCode?: string;
  exp?: number;
  encodedProfile?: string;
  profileIV?: string;
  miniScreener: string;
  demographics_v2: boolean;
  hideQuestions?: string;
  endlessProfiler?: boolean;
  isLifepointsPanel?: boolean;
  firstProfiler?: boolean;
  showLandingPage?: boolean;
  isMobiworkxPanel?: boolean;
}

const LIFEPOINT_PANELS = ["lifepoints", "demo"]
const MOBIWORKX_PANELS = ["mobiworkx", "mobiworkx-demo"]

export const RequestCtx = React.createContext<RequestContextInterface>({
  jwt: "",
  provider: "",
  userGuid: "",
  countryCode: "",
  miniScreener: "false",
  demographics_v2: false,
  firstProfiler: false,
});

export function getRequestContext(): RequestContextInterface {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token") || "";
  const encodedProfile = urlParams.get("encProfile") || undefined;
  const profileIV = urlParams.get("profileiv") || undefined;
  const miniScreener = urlParams.get("miniScreener") || "false";
  const showLandingPage = urlParams.get("showLandingPage") === "true";

  const {
    sub,
    destinationUrl,
    countryCode,
    panelProvider,
    demographics_v2,
    endless_profiler = false,
    hideQuestions = false,
    exp = 0,
  }: any = decodeToken(token);

  const isLifepointsPanel = LIFEPOINT_PANELS.includes(panelProvider);
  const isMobiworkxPanel = MOBIWORKX_PANELS.includes(panelProvider)

  const firstProfiler = miniScreener === "false" && !endless_profiler

  return {
    jwt: token,
    provider: panelProvider,
    userGuid: sub,
    destinationUrl,
    countryCode,
    encodedProfile,
    endlessProfiler: endless_profiler,
    isLifepointsPanel,
    isMobiworkxPanel,
    profileIV,
    exp,
    miniScreener,
    firstProfiler,
    demographics_v2,
    hideQuestions,
    showLandingPage
  };
}
