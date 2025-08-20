!(function () {
  "use strict";
  var e = "",
    a = /^[a-z]{2}(-[A-Z]{2})?$/,
    t = "x-default",
    n = "lang",
    r = "ljs-lang",
    o = document.getElementById("localizeScript"),
    i = o.dataset,
    l = window.JSON.parse,
    c = l(i.bits);
  function g(a) {
    var t = i.src;
    if ("undefined" == typeof Localize || a !== Localize.getLanguage()) {
      if ("undefined" == typeof Localize && void 0 !== t && "" !== t) {
        var n,
          r = document.createElement("script");
        (r.onload = s),
          (r.src = t),
          document.head.appendChild(r),
          (n = document.createElement("style")),
          document.head.append(n),
          n.sheet.insertRule("#localize-widget { display: none !important; }");
      } else Localize.setLanguage(a);
      (e = a), (sbPage.languageCode = a);
    }
  }
  function d(e) {
    if ("undefined" != typeof Localize && Localize.loaded)
      for (var a = 0; a < e.length; a++) {
        var t = e[a];
        t.innerHTML = t.innerHTML.replace(/(\d+\s?SB)|(\d+\:?)/g, function (e) {
          return "<span notranslate>" + e + "</span>";
        });
      }
  }
  function s() {
    var a = window;
    if (!a.Localize) {
      a.Localize = {};
      for (
        var t = [
            "translate",
            "untranslate",
            "phrase",
            "initialize",
            "translatePage",
            "setLanguage",
            "getLanguage",
            "detectLanguage",
            "getAvailableLanguages",
            "untranslatePage",
            "bootstrap",
            "prefetch",
            "on",
            "off",
            "hideWidget",
            "showWidget",
            "getSourceLanguage",
          ],
          n = 0;
        n < t.length;
        n++
      )
        a.Localize[t[n]] = function () {};
    }
    Localize.initialize({
      key: i.key,
      rememberLanguage: !0,
      autodetectLanguage: !1,
    }),
      f({ to: e }),
      Localize.on("setLanguage", u),
      Localize.setLanguage(e);
  }
  function u(e) {
    document.dispatchEvent(new Event("prdgLocalizeLoaded"));
    var a = Localize.getLanguage(),
      t = o.getAttribute("data-language-code") === a;
    if (e.to !== e.from && !t) {
      if (l(i.isMember)) {
        var n = new FormData();
        n.append("locale", c[a]),
          fetch("/?cmd=ac-jx-locale", { method: "POST", body: n });
      }
      o.setAttribute("data-language-code", a), f(e);
    }
  }
  function f(e) {
    var a = v(),
      t = a.searchParams,
      n = e.to;
    h(n, t),
      (a.search = t.toString()),
      (function (e) {
        var a = document.querySelectorAll(".sbHowItWorksLocalize");
        if (0 !== a.length)
          for (let o = 0; o < a.length; o++) {
            var t = a[o],
              n = new URL(t.href),
              r = n.searchParams;
            h(e, r), (n.search = r.toString()), (t.href = n.toString());
          }
      })(n),
      window.history.replaceState({}, "", a.toString());
  }
  function h(e, a) {
    "en" === e ? a.delete(n) : (a.has(n) && a.delete(n), a.append(n, e));
  }
  function p(e) {
    return e.getAttribute("hreflang");
  }
  function w(e) {
    m({ rel: "alternate", hreflang: e, href: L(e) });
  }
  function L(e) {
    var a = v(),
      r = a.searchParams;
    return (
      r.has(n) && r.delete(n),
      e && "en" !== e && e !== t && r.append(n, e),
      (a.search = r.toString()),
      a.toString()
    );
  }
  function m(e) {
    var a = document.createElement("link");
    for (var t in e) a.setAttribute(t, e[t]);
    document.head.append(a);
  }
  function v() {
    return new URL(window.location.href);
  }
  void 0 === window.sbPage && (window.sbPage = {}),
    (sbPage.setLanguage = g),
    (sbPage.prepareElementsForLocalize = d),
    (function () {
      var o = v().searchParams.get(n);
      if (
        (o &&
          !a.test(o) &&
          (window.console.error("Invalid language code", o), (o = "en")),
        (d = () => {
          var e;
          (function () {
            var e = document.querySelector('link[rel="canonical"]');
            if (e) {
              e.href = L();
              return;
            }
            m({ rel: "canonical", href: L() });
          })((e = o ? o.slice(0, 2) : "en")),
            (function (e) {
              for (
                var n = [t, "en", "de", "es", "fr"],
                  r = document.querySelectorAll('link[rel="alternate"]'),
                  o = Array.prototype.slice.call(r).map(p),
                  i = 0;
                i < n.length;
                i++
              ) {
                var l = n[i];
                o.includes(l) || w(l);
              }
              e && a.test(e) && !n.includes(e) && w(e);
            })(e);
        }),
        "requestIdleCallback" in window ? window.requestIdleCallback(d) : d(),
        o)
      )
        return g(o);
      if (l(i.testing))
        try {
          window.localStorage.getItem(r) &&
            (e = window.localStorage.getItem(r)),
            g(e);
        } catch (e) {}
      else {
        e = i.languageCode;
        try {
          s = window.localStorage.getItem(r);
        } catch (e) {}
        if (s && s in c) e = s;
        else {
          var d,
            s,
            u = "en",
            f = window.navigator.languages;
          if (Array.isArray(f) && f.length > 0) {
            var h = f[0];
            "string" == typeof h && (u = h);
          } else {
            var y = window.navigator.language;
            y && "string" == typeof y && (u = y);
          }
          u.includes("-") && (u = u.split("-")[0]), (e = u);
        }
        e && "en" !== e && g(e);
      }
    })();
})();
