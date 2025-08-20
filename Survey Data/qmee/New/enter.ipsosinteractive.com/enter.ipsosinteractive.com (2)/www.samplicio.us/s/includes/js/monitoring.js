/**
 * @overview defines monitoring request handlers
 * @requires bluebird (or Promises-compliant lib)
 * @requires jquery
 */
window.monitoring = (function (jQuery) {
  "use strict";

  /**
   * Request handler wrapping jQuery ajax
   * Stringifies any data passed in
   * @returns {Promise}
   */
  function request(url, data) {
    var json;

    try {
      json = JSON.stringify(data || {});
    } catch (ex) {
      return Promise.reject(new Error("Failed to stringify JSON data"));
    }

    return new Promise(function (resolve, reject) {
      jQuery.ajax({
        url: url,
        data: json,
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        success: function (data, textStatus, jqXhr) {
          resolve({ data: data, status: textStatus });
        },
        error: function (jqXhr, textStatus, errorThrown) {
          var error = new Error(
            errorThrown || "Request to " + url + " failed."
          );
          error.status = textStatus;
          reject(error);
        },
      });
    });
  }

  /**
   * Posts a message to the logger endpoint
   * @returns {Promise}
   */
  function postLog(message, data) {
    var url = "MonitoringService.asmx/Info";
    var payload = {
      message: message,
      data: data,
    };

    return request(url, payload);
  }

  /**
   * Posts a metric to the metrics endpoint
   * @returns {Promise}
   */
  function postCounter(statName, num) {
    var url = "MonitoringService.asmx/Counter";
    var payload = {
      statName: statName,
      num: num,
    };

    return request(url, payload);
  }

  /**
   * Posts a metric to the metrics endpoint
   * @returns {Promise}
   */
  function postTimer(statName, value) {
    var url = "MonitoringService.asmx/Timer";
    var payload = {
      statName: statName,
      value: value,
      sampleRate: 1,
    };

    return request(url, payload);
  }

  return {
    postLog: postLog,
    postCounter: postCounter,
    postTimer: postTimer,
  };
})(window.jQuery);
