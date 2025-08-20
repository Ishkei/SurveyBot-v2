import { Notifier } from "@airbrake/browser";

function createAirbrakeNotifier() {
  if (
    !process.env.REACT_APP_AIRBRAKE_PROJECT_ID ||
    !process.env.REACT_APP_AIRBRAKE_PROJECT_KEY
  ) {
    return null;
  }

  return new Notifier({
    projectId: Number(process.env.REACT_APP_AIRBRAKE_PROJECT_ID),
    projectKey: String(process.env.REACT_APP_AIRBRAKE_PROJECT_KEY),
    environment: process.env.NODE_ENV,
    instrumentation: {
      history: true,
      onerror: true,
    },
  });
}

const extensionUrls = [
  "chrome-extension://",
  "webkit-masked-url://hidden",
  "webkit-masked-url",
  "/extensions/",
  "chrome-extension",
  "safari-web-extension://",
];

const errorsToIgnore = [
  "what does conduitPage even do",
  "null is not an object (evaluating 'elt.parentNode')",
  "some error on top.GLOBALS",
  "biiig problem on originalCreateNotification",
  "canvas.contentDocument",
  "MyApp_RemoveAllHighlights",
  "Can't find variable: ZiteReader, I wonder why?",
  "ComboSearch is not defined",
  "atomicFindClose has messed up",
  "bad news, we have a fb_xd_fragment",
  "oh no! we have a case of: bmi_SafeAddOnload, again !",
  "watch out ! EBCallBackMessageReceived",
  "error _gCrWeb",
  "conduitPage",
  "null is not an object (evaluating 'elt.parentNode')",
  "plugin.setSuspendState is not a function",
  "Extension context invalidated",
  "useless error webkit-masked-url: please filter",
  "TypeError: can't access dead object because dead stuff smells bad",
  "Cannot redefine property: solana",
  "Cannot redefine property: ethereum",
  "Cannot redefine property: googletag",
  "undefined is not an object (evaluating 'a.L')", // Old iOS Chrome translation error
  "undefined is not an object (evaluating 'a.J')", // New iOS Chrome translation error
  'Permission denied to access property "correspondingUseElement"',
  "wallet must has at least one account",
  'Permission denied to access property "document"',
  "Can't find variable: gmo",
];

const airbrake = createAirbrakeNotifier();

if (airbrake) {
  airbrake.addFilter((notice) => {
    console.log("notice filtering", notice);
    if (["development", "test"].includes(notice.context.environment)) {
      return null;
    }

    let error: any = notice.errors?.[0] || notice?.error;
    console.log("error", error?.message);

    if (!error?.message || error?.message === "Error") {
      return null;
    }

    if (error && error.backtrace) {
      let frame = error.backtrace?.[0];
      if (frame.file === "<anonymous>") {
        return null;
      }

      for (let i = 0; i < error?.backtrace?.length; i++) {
        for (let i = 0; i < extensionUrls?.length; i++) {
          if (frame.file?.includes(extensionUrls[i])) {
            console.log("filtering 1", error, extensionUrls[i]);
            return null;
          }
        }
      }
    }

    for (let i = 0; i < extensionUrls?.length; i++) {
      if (
        notice?.error?.stack?.includes(extensionUrls[i]) ||
        notice?.url?.includes(extensionUrls[i])
      ) {
        return null;
      }
    }

    for (let i = 0; i < errorsToIgnore?.length; i++) {
      if (error.message?.includes(errorsToIgnore[i])) {
        return null;
      }
    }

    console.log("passed filter");
    return notice;
  });
}

export { airbrake };
