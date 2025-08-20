// Init custom survey helper listeners
(function ($) {
  "use strict";
  // Adding iframe handler for messages
  var iframeMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";
  var iframeEventer = window[iframeMethod];
  var iframeMessageEvent =
    iframeMethod === "attachEvent" ? "onmessage" : "message";
  // Listen to message from child window (iframe)
  var onlyStrings = false;
  window.cmSurvey = {
    mobileBreakpoint: 640,
    mobileMinimumWidth: 450,
    getDeviceScreenWidth: function () {
      return screen.width > 0 ? screen.width : window.innerWidth;
    },
    disableNextButton: function (disable) {
      $(function () {
        if (disable) {
          $(".cm-navigation-buttons .cm-navigation-next-button").addClass(
            "cm-button-disabled"
          );
        } else {
          $(".cm-navigation-buttons .cm-navigation-next-button").removeClass(
            "cm-button-disabled"
          );
        }
      });
    },
    disableBackButton: function (disable) {
      $(function () {
        if (disable) {
          $(".cm-navigation-buttons .cm-navigation-previous-button").addClass(
            "cm-button-disabled"
          );
        } else {
          $(
            ".cm-navigation-buttons .cm-navigation-previous-button"
          ).removeClass("cm-button-disabled");
        }
      });
    },
    hideNextButton: function (hide) {
      $(function () {
        if (hide) {
          $(".cm-navigation-buttons .cm-navigation-next-button").addClass(
            "cm-hidden"
          );
        } else {
          $(".cm-navigation-buttons .cm-navigation-next-button").removeClass(
            "cm-hidden"
          );
        }
      });
    },
    hideBackButton: function (hide) {
      $(function () {
        if (hide) {
          $(".cm-navigation-buttons .cm-navigation-previous-button").addClass(
            "cm-hidden"
          );
        } else {
          $(
            ".cm-navigation-buttons .cm-navigation-previous-button"
          ).removeClass("cm-hidden");
        }
      });
    },
    onPageLoad: function (callback) {
      if ($(".cm-Survey").data("cm-pageInitialized") === true) {
        if (CMP.executeCustomCode()) {
          try {
            callback();
          } catch (e) {}
        }
      } else if ($(".cm-Survey").length) {
        if (CMP.executeCustomCode()) {
          $(".cm-Survey").off("onPageLoad").on("onPageLoad", callback);
        }
      } else {
        $(function () {
          if (CMP.executeCustomCode()) {
            if ($(".cm-Survey").data("cm-pageInitialized") === true) {
              try {
                callback();
              } catch (e) {}
            } else {
              $(".cm-Survey").off("onPageLoad").on("onPageLoad", callback);
            }
          }
        });
      }
    },
    onLoad: function (callback) {
      $(function () {
        if (
          typeof cmIsCodebook === "undefined" ||
          (typeof cmIsCodebook !== "undefined" && !cmIsCodebook) ||
          $("body").hasClass("cm-Fragment")
        ) {
          if ($(".cm-Survey").data("cm-pageInitialized") === true) {
            try {
              callback();
            } catch (e) {
              console.error(e);
            }
          }
          $(".cm-Survey").on("onLoad", callback);
        }
      });
    },
    handleIframe: function (callback) {
      $(function () {
        iframeEventer(
          iframeMessageEvent,
          function (e) {
            if (e.data) {
              var eventData = {};
              if (typeof e.data === "string" && onlyStrings) {
                eventData = JSON.parse(e.data);
              } else {
                eventData = e.data;
              }
              callback(e, eventData);
            }
          },
          false
        );
      });
    },
    popup: function (popupName) {
      if (typeof popupName === "undefined" || popupName == null) {
        popupName = "";
      }
      $("#cm-popup-overlay").show();
      $('[data-cm-popup="' + popupName + '"]').show();
    },
    clearSession: function () {
      const projectId = $("#cmix-projectId").val();
      const cKeyReg = RegExp(".*cmix.*-prj-" + projectId, "iu");
      const fullCookies = document.cookie.split("; ");
      for (var i = 0; i < fullCookies.length; i++) {
        const cookieString = fullCookies[i];
        const eqIndex = cookieString.indexOf("=");
        const cKey = cookieString.substr(0, eqIndex);
        if (cKeyReg.test(cKey)) {
          document.cookie =
            cKey + "=;expires=Thu, 01 Jan 1970 00:00:01 UTC;path=/;";
        }
      }
    },
  };

  try {
    window.postMessage(
      {
        toString: function () {
          onlyStrings = true;
        },
      },
      "*"
    );
  } catch (e) {}
})(cmJq);
