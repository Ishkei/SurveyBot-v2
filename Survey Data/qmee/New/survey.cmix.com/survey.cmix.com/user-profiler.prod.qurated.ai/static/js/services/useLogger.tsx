import { useCallback } from "react";
import { sendEventLog } from "./EventLogs";

const useLogger = (jwt: string) => {
  const logEvent = useCallback(
    (event: string, data: Object) => {
      sendEventLog(event, data, jwt);
    },
    [jwt]
  );

  const logError = useCallback(
    (
      location: string,
      error: any,
      extraData: { [k: string]: string | boolean } = {}
    ) => {
      logEvent("prescreener_error_occurred", {
        location,
        info: error.message,
        data: error.response?.data,
        ...extraData,
      });
    },
    [logEvent]
  );

  const logUpdateAnswer = useCallback(
    (
      key: string,
      status: string | undefined,
      extraData: { [k: string]: string | boolean } = {}
    ) => {
      const valid = status === "valid" || status === "prefilled";
      const eventName = valid
        ? "update_demographic_question"
        : "invalid_demographic_answer";
      logEvent(eventName, { key, status, ...extraData });
    },
    [logEvent]
  );

  return {
    logUpdateAnswer,
    logError,
    logEvent
  };
};

export default useLogger;