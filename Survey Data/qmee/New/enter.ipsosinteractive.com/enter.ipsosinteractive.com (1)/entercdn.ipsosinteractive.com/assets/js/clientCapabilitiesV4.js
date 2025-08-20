function detectIEAndSubmit(message) {
  var browser = {};
  browser.name = "Other";
  // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
  if (!!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0)
    browser.name = "Opera";
  // Firefox 1.0+
  else if (typeof InstallTrigger !== "undefined") browser.name = "Firefox";
  // Safari 3.0+
  else if (
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window["safari"] || safari.pushNotification)
  )
    browser.name = "Safari";
  // Internet Explorer 6-11
  else if (/*@cc_on!@*/ false || !!document.documentMode) {
    browser.name = "IE";
  }
  if (browser.name == "IE") {
    alert(message);
    document.getElementById("submitNoIEOrRiskAccepted").click();
  } else {
    document.getElementById("submitNoIEOrRiskAccepted").click();
  }
}

function detectAndSubmit() {
  var browser = {};
  browser.name = "Other";
  // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
  if (!!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0)
    browser.name = "Opera";
  // Firefox 1.0+
  else if (typeof InstallTrigger !== "undefined") browser.name = "Firefox";
  // Safari 3.0+
  else if (
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window["safari"] || safari.pushNotification)
  )
    browser.name = "Safari";
  // Internet Explorer 6-11
  else if (/*@cc_on!@*/ false || !!document.documentMode) {
    browser.name = "IE";
  }
  // Edge 20+
  else if (!!window.StyleMedia) browser.name = "Edge";
  // Chrome 1+
  else if (!!window.chrome && !!window.chrome.webstore) browser.name = "Chrome";

  if (bowser.version) {
    var split = bowser.version.split(".");
    switch (split.length) {
      case 3:
        browser.patch = parseInt(split[2], 10);
      case 2:
        browser.minor = parseInt(split[1], 10);
      case 1:
        browser.major = parseInt(split[0], 10);
    }
  }

  document.getElementById("browserName").value = browser.name;
  document.getElementById("browserType").value = navigator.appCodeName;
  document.getElementById("browserMajor").value = browser.major;
  document.getElementById("browserMinor").value = browser.minor;
  document.getElementById("browserVersion").value = bowser.version;
  document.getElementById("platform").value = navigator.platform;
  document.getElementById("submitBrowserDetection").click();
}
