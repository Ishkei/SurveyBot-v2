!(function () {
  "use strict";
  var t, a, e;
  function n(t) {
    try {
      var a = "__test__",
        e = "session" === t ? window.sessionStorage : window.localStorage;
      return e.setItem(a, a), e.removeItem(a), !0;
    } catch (t) {
      return !1;
    }
  }
  (a = t =
    (function (t) {
      var a;
      if (
        t &&
        "application/json" === t.type &&
        "string" == typeof (a = t.textContent) &&
        "" !== a
      ) {
        var e = {};
        try {
          e = JSON.parse(t.textContent);
        } catch (a) {
          window.console.error(
            "Could not parse JSON from script tag {error: " +
              a +
              "}; {scriptTag:" +
              t.id +
              "}; {JSON: " +
              t.textContent +
              "}."
          );
        }
        return e;
      }
      return {};
    })(document.getElementById("sbTrackJsMetadata"))),
    window.TrackJS &&
      (window.TrackJS.addMetadata("Appm", a.appm),
      window.TrackJS.addMetadata("SessionStorageAccessible", n("session")),
      window.TrackJS.addMetadata("LocalStorageAccessible", n()),
      window.TrackJS.addMetadata("mid", a.mid)),
    (e = t),
    window.TrackJS &&
      window.TrackJS.install({ token: e.token, application: e.application });
})();
