(function (ready, monitoring) {
  "use strict";

  function getValueByElementId(id) {
    var element = document.getElementById(id);
    return element && element.value;
  }

  var start = new Date().getTime();
  var timeoutId;
  var timedOut = false;
  var respAuthTimeout = getValueByElementId("RespAuthTimeout");

  /**
   * If the aysnc checks don't finish in time, redirect via a timeout
   */
  var timeoutMs = respAuthTimeout || 1000;
  timeoutId = setTimeout(function timeout() {
    timedOut = true;
    try {
      monitoring.postTimer("respauth.time", new Date().getTime() - start);
      monitoring.postCounter("respauth.timeout", 1);
    } catch (error) {
      // ignore
    }
    redirect();
  }, timeoutMs);

  /**
   * Redirects the respondent to the next page
   */
  function redirect() {
    var redirectUrl = getValueByElementId("hfRedirectURL");
    var form = document.getElementById("formRouter");

    /**
     * Apparently we need to sub in a random number in a hidden field so that ASP.NET thinks this is a unique request
     */
    document.getElementById("iRandom").value = Math.floor(Math.random() * 1000);

    if (redirectUrl) {
      window.location = redirectUrl;
    } else {
      form.action = "ErrorPage";
      form.submit();
    }
  }
})(window.ready, window.monitoring);
