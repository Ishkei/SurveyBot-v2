// Global object, but shouldn't be well known with Survey Programmers
// CMP = Critical Mix Protected
(function () {
  "use strict";
  window.CMP = {
    afterPageLoad: function (callback) {
      if (cmJq(".cm-Survey").data("cm-pageInitialized") === true) {
        if (CMP.executeCustomCode()) {
          try {
            callback();
          } catch (e) {}
        }
      } else if (cmJq(".cm-Survey").length) {
        if (CMP.executeCustomCode()) {
          cmJq(".cm-Survey").one("afterPageLoad", callback);
        }
      } else {
        $(function () {
          if (CMP.executeCustomCode()) {
            if (cmJq(".cm-Survey").data("cm-pageInitialized") === true) {
              try {
                callback();
              } catch (e) {}
            } else {
              cmJq(".cm-Survey").one("afterPageLoad", callback);
            }
          }
        });
      }
    },
    executeCustomCode: function () {
      var cmIsCodebook;
      return (
        typeof cmIsCodebook === "undefined" ||
        (typeof cmIsCodebook !== "undefined" && !cmIsCodebook) ||
        $("body").hasClass("cm-Fragment")
      );
    },
  };
})();
