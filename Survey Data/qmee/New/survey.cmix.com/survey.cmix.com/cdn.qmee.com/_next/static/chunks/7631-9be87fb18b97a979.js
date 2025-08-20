(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7631],
  {
    4542: function (e, n, t) {
      "use strict";
      var r = t(85893),
        a = t(86010),
        i = t(67294),
        l = t(11570),
        s = t.n(l),
        o = t(39414);
      function c(e, n, t) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[n] = t),
          e
        );
      }
      function u(e, n) {
        if (null == e) return {};
        var t,
          r,
          a = (function (e, n) {
            if (null == e) return {};
            var t,
              r,
              a = {},
              i = Object.keys(e);
            for (r = 0; r < i.length; r++)
              (t = i[r]), n.indexOf(t) >= 0 || (a[t] = e[t]);
            return a;
          })(e, n);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          for (r = 0; r < i.length; r++)
            (t = i[r]),
              n.indexOf(t) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, t) &&
                  (a[t] = e[t]));
        }
        return a;
      }
      function d(e, n) {
        var t = e.className,
          i = e.children,
          l = e.component,
          d = e.interactive,
          m = u(e, ["className", "children", "component", "interactive"]),
          v = l || "div";
        return (0, r.jsx)(
          v,
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = null != arguments[n] ? arguments[n] : {},
                r = Object.keys(t);
              "function" === typeof Object.getOwnPropertySymbols &&
                (r = r.concat(
                  Object.getOwnPropertySymbols(t).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                  })
                )),
                r.forEach(function (n) {
                  c(e, n, t[n]);
                });
            }
            return e;
          })(
            {
              className: (0, a.Z)(
                s().root,
                d || l === o.Z ? s().interactive : s().outlined,
                t
              ),
            },
            m,
            { ref: n, children: i }
          )
        );
      }
      n.Z = i.forwardRef(d);
    },
    51625: function (e, n, t) {
      "use strict";
      var r = t(85893),
        a = (t(67294), t(13717)),
        i = t.n(a),
        l = t(67404),
        s = t(16642),
        o = t(84646);
      function c(e, n, t) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[n] = t),
          e
        );
      }
      function u(e, n) {
        if (null == e) return {};
        var t,
          r,
          a = (function (e, n) {
            if (null == e) return {};
            var t,
              r,
              a = {},
              i = Object.keys(e);
            for (r = 0; r < i.length; r++)
              (t = i[r]), n.indexOf(t) >= 0 || (a[t] = e[t]);
            return a;
          })(e, n);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          for (r = 0; r < i.length; r++)
            (t = i[r]),
              n.indexOf(t) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, t) &&
                  (a[t] = e[t]));
        }
        return a;
      }
      n.Z = function (e) {
        var n = e.tag,
          t = e.type,
          a = u(e, ["tag", "type"]),
          d = s.Z[t][n];
        return d
          ? (0, r.jsx)(
              l.Z,
              (function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = null != arguments[n] ? arguments[n] : {},
                    r = Object.keys(t);
                  "function" === typeof Object.getOwnPropertySymbols &&
                    (r = r.concat(
                      Object.getOwnPropertySymbols(t).filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                      })
                    )),
                    r.forEach(function (n) {
                      c(e, n, t[n]);
                    });
                }
                return e;
              })(
                {
                  tipClassName: i().tip,
                  tip: (0, r.jsxs)("div", {
                    className: i().tagContent,
                    children: [
                      (0, r.jsx)(o.Z, { component: "h4", children: d.title }),
                      (0, r.jsx)(o.Z, {
                        component: "p",
                        children: d.description,
                      }),
                    ],
                  }),
                },
                a,
                { children: (0, r.jsx)(d.Icon, { className: i().icon }) }
              )
            )
          : null;
      };
    },
    67404: function (e, n, t) {
      "use strict";
      t.d(n, {
        Z: function () {
          return v;
        },
      });
      var r = t(85893),
        a = t(86010),
        i = t(67294);
      function l(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
        return r;
      }
      function s(e, n) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, n) {
            var t =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != t) {
              var r,
                a,
                i = [],
                l = !0,
                s = !1;
              try {
                for (
                  t = t.call(e);
                  !(l = (r = t.next()).done) &&
                  (i.push(r.value), !n || i.length !== n);
                  l = !0
                );
              } catch (o) {
                (s = !0), (a = o);
              } finally {
                try {
                  l || null == t.return || t.return();
                } finally {
                  if (s) throw a;
                }
              }
              return i;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return l(e, n);
            var t = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === t && e.constructor && (t = e.constructor.name);
            if ("Map" === t || "Set" === t) return Array.from(t);
            if (
              "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            )
              return l(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function o() {
        var e = i.useRef(null),
          n = s(i.useState(null), 2),
          t = n[0],
          r = n[1],
          a = i.useCallback(function () {
            return r(e && e.current ? e.current.getBoundingClientRect() : null);
          }, []);
        return (
          i.useEffect(
            function () {
              setTimeout(a, 500);
            },
            [a]
          ),
          i.useEffect(
            function () {
              return (
                a(),
                window.addEventListener("resize", a),
                function () {
                  return window.removeEventListener("resize", a);
                }
              );
            },
            [a]
          ),
          [t, e]
        );
      }
      var c = t(33045),
        u = t.n(c);
      function d(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
        return r;
      }
      function m(e, n) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, n) {
            var t =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != t) {
              var r,
                a,
                i = [],
                l = !0,
                s = !1;
              try {
                for (
                  t = t.call(e);
                  !(l = (r = t.next()).done) &&
                  (i.push(r.value), !n || i.length !== n);
                  l = !0
                );
              } catch (o) {
                (s = !0), (a = o);
              } finally {
                try {
                  l || null == t.return || t.return();
                } finally {
                  if (s) throw a;
                }
              }
              return i;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return d(e, n);
            var t = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === t && e.constructor && (t = e.constructor.name);
            if ("Map" === t || "Set" === t) return Array.from(t);
            if (
              "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            )
              return d(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var v = function (e) {
        var n,
          t,
          i,
          l = e.children,
          s = e.wrapperClassName,
          c = e.tipClassName,
          d = e.tip,
          v = m(o(), 2),
          p = v[0],
          f = v[1],
          y = m(o(), 2),
          h = y[0],
          _ = y[1],
          g = null;
        return (
          p && h && p.left + p.width / 2 + h.width / 2 > window.innerWidth
            ? (g = "right")
            : p && h && p.left - p.width / 2 + h.width / 2 < 0 && (g = "left"),
          (0, r.jsxs)("div", {
            className: (0, a.Z)(s, u().root),
            ref: f,
            children: [
              l,
              (0, r.jsx)("div", { className: u().arrow }),
              (0, r.jsx)("div", {
                className: u().tip,
                ref: _,
                style: g
                  ? ((n = {}),
                    (t = g),
                    (i = 0),
                    t in n
                      ? Object.defineProperty(n, t, {
                          value: i,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (n[t] = i),
                    n)
                  : void 0,
                children: (0, r.jsx)("div", {
                  className: c,
                  style: {
                    flexDirection: "column",
                    right: g ? "0" : "inherit",
                  },
                  children: d,
                }),
              }),
            ],
          })
        );
      };
    },
    87631: function (e, n, t) {
      "use strict";
      t.d(n, {
        _Y: function () {
          return Y;
        },
        ZP: function () {
          return Q;
        },
        nH: function () {
          return B;
        },
      });
      var r,
        a,
        i,
        l = t(85893),
        s = t(86010),
        o = t(27484),
        c = t.n(o),
        u = t(94712),
        d = t.n(u),
        m = t(67294),
        v = (t(22578), t(67912)),
        p = t(27011),
        f = t.n(p),
        y = t(80933),
        h = t(34838),
        _ = t(48020);
      function g() {
        return (
          (g = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                }
                return e;
              }),
          g.apply(this, arguments)
        );
      }
      var j,
        x = function (e) {
          return m.createElement(
            "svg",
            g(
              {
                height: 26,
                viewBox: "0 0 26 26",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            r ||
              (r = m.createElement("path", {
                d: "M20.339 9.547h-1.83V5.37C18.509 2.41 16.049 0 13.024 0 10 0 7.54 2.41 7.54 5.371v4.176H5.714a3.05 3.05 0 0 0-3.047 3.047v10.36A3.05 3.05 0 0 0 5.714 26h14.625a3.05 3.05 0 0 0 3.047-3.047v-10.36a3.05 3.05 0 0 0-3.047-3.046Z",
                fill: "#CBCBCB",
              })),
            a ||
              (a = m.createElement("path", {
                d: "M20.313 9.547h-1.83V5.37C18.483 2.41 16.023 0 12.998 0 9.974 0 7.514 2.41 7.514 5.371v4.176H5.687a3.05 3.05 0 0 0-3.046 3.047v10.36A3.05 3.05 0 0 0 5.687 26h14.625a3.05 3.05 0 0 0 3.047-3.047v-10.36a3.05 3.05 0 0 0-3.047-3.046ZM9.544 5.37c0-1.842 1.55-3.34 3.453-3.34 1.904 0 3.453 1.498 3.453 3.34v4.176H9.545V5.37Zm11.783 17.582c0 .56-.456 1.016-1.015 1.016H5.688c-.56 0-1.016-.456-1.016-1.016v-10.36c0-.56.455-1.015 1.016-1.015h14.625c.56 0 1.015.456 1.015 1.016v10.36Z",
                fill: "#24282C",
              })),
            i ||
              (i = m.createElement("path", {
                d: "M13 14.523a1.879 1.879 0 0 0-1.018 3.459v2.229a1.016 1.016 0 1 0 2.032 0v-2.227A1.879 1.879 0 0 0 13 14.524Z",
                fill: "#24282C",
              }))
          );
        };
      function S() {
        return (
          (S = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                }
                return e;
              }),
          S.apply(this, arguments)
        );
      }
      var b,
        w,
        I,
        N = function (e) {
          return m.createElement(
            "svg",
            S(
              {
                height: 19,
                viewBox: "0 0 32 32",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "#f36",
              },
              e
            ),
            j ||
              (j = m.createElement("path", {
                d: "M26.707 5.293a1 1 0 0 0-1.414 0l-3.174 3.174A14.471 14.471 0 0 0 16 7C7.874 7 1.481 15.041 1.213 15.383a1 1 0 0 0 0 1.234 27.724 27.724 0 0 0 6.823 5.933l-2.743 2.743a1 1 0 1 0 1.414 1.414l20-20a1 1 0 0 0 0-1.414zM11 16a5.006 5.006 0 0 1 5-5 4.892 4.892 0 0 1 2.73.856l-6.874 6.874A4.892 4.892 0 0 1 11 16zM30.787 15.383a27.937 27.937 0 0 0-5.116-4.812l-4.741 4.741A4.874 4.874 0 0 1 21 16a5.006 5.006 0 0 1-5 5 4.874 4.874 0 0 1-.688-.07l-3.4 3.4A13.529 13.529 0 0 0 16 25c8.126 0 14.519-8.041 14.787-8.383a1 1 0 0 0 0-1.234z",
              }))
          );
        };
      function k() {
        return (
          (k = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                }
                return e;
              }),
          k.apply(this, arguments)
        );
      }
      var O,
        C = function (e) {
          return m.createElement(
            "svg",
            k(
              {
                width: 32,
                height: 32,
                viewBox: "0 0 74 74",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            b ||
              (b = m.createElement("circle", {
                cx: 35.1,
                cy: 38.1,
                r: 35.1,
                fill: "#2bd675",
              })),
            w ||
              (w = m.createElement("path", {
                d: "M53.033 20.508a3.908 3.908 0 1 1-5.527 5.527 17.181 17.181 0 1 0 0 24.299 3.908 3.908 0 1 1 5.527 5.527 25 25 0 1 1 0-35.353Z",
                fill: "#fff",
              })),
            I ||
              (I = m.createElement("path", {
                d: "m54.074 28.92-10.861-.27a1.079 1.079 0 0 1-.581-.188 1.113 1.113 0 0 1-.395-.476 1.052 1.052 0 0 1-.073-.601c.035-.2.13-.383.271-.524l10.591-10.59a.977.977 0 0 1 .524-.27c.2-.035.41-.009.6.074.192.084.357.22.475.394.118.173.184.375.19.58l.27 10.86c.005.136-.018.27-.067.396a.964.964 0 0 1-.944.615Z",
                fill: "#fff",
              }))
          );
        };
      function Z() {
        return (
          (Z = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                }
                return e;
              }),
          Z.apply(this, arguments)
        );
      }
      var T = function (e) {
          return m.createElement(
            "svg",
            Z(
              {
                height: 512,
                viewBox: "0 0 32 32",
                width: 512,
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            O ||
              (O = m.createElement("path", {
                d: "M16 31A15 15 0 1 0 1 16a15 15 0 0 0 15 15zm0-24.38a2 2 0 1 1-2 2 2 2 0 0 1 2-2zM14 16a2 2 0 0 1 4 0v8a2 2 0 0 1-4 0z",
              }))
          );
        },
        M = t(4542),
        K = t(51625),
        F = t(67404),
        A = t(84646),
        E = t(51519),
        D = t.n(E),
        P = t(22098),
        U = t(20298),
        q = t(15e3),
        G = function (e) {
          var n = e.survey,
            t = e.className,
            r = (0, q.nu)();
          return (0, l.jsxs)(M.Z, {
            component: "a",
            href: r ? U.At.path : U._5.path,
            rel: "noopener noreferrer",
            interactive: !0,
            className: (0, s.Z)(D().root, D().unpaidCard, t),
            children: [
              (0, l.jsx)(A.Z, {
                component: "h4",
                className: D().unpaidTitle,
                children:
                  "static-prescreener" === n.id
                    ? n.title
                    : "Sign up to surveys",
              }),
              (0, l.jsx)(P.Z, { className: D().oinq }),
              (0, l.jsx)(_.Z, {
                className: D().signUpButton,
                buttonType: "primary",
                color: "secondary",
                children: (0, l.jsx)(A.Z, { children: "Start earning" }),
              }),
            ],
          });
        },
        B = t(69192);
      function L(e) {
        if (e) {
          var n = new URL(e),
            t = new URLSearchParams(n.search);
          return (
            ("alpha.qmee.com" !== window.location.host &&
              "localhost:3000" !== window.location.host) ||
              t.append("fromAlpha", "true"),
            "".concat(n.origin).concat(n.pathname, "?").concat(t)
          );
        }
      }
      var R = function (e) {
          var n = e.survey,
            t = e.className;
          return (0, l.jsxs)("header", {
            className: (0, s.Z)(f().categoryContainer, t),
            children: [
              (0, l.jsx)(A.Z, {
                component: "h5",
                className: (0, s.Z)(
                  f().title,
                  n.tags.includes("broken") && f().broken
                ),
                skipTranslation: !0,
                children: n.title,
              }),
              (0, l.jsx)("div", {
                className: f().tagContainer,
                children: n.tags.map(function (e) {
                  return (0, l.jsx)(K.Z, { tag: e, type: "survey" }, e);
                }),
              }),
            ],
          });
        },
        z = function (e) {
          var n = e.survey,
            t = e.className,
            r = n.tags.includes("sensitive"),
            a = n.lockedInfo && !n.tags.includes("broken"),
            i = n.tags.includes("in_progress");
          return (0, l.jsxs)("div", {
            className: (0, s.Z)(
              f().imageIconContainer,
              i && f().partComplete,
              t
            ),
            children: [
              (0, l.jsx)(y.Z, {
                src: n.imageUrl,
                alt: "for survey ".concat(n.title),
                width: 84,
                height: 84,
                className: (0, s.Z)(f().image, r && f().sensitive),
              }),
              r &&
                (0, l.jsx)("div", {
                  className: f().sensitiveOverlay,
                  children: (0, l.jsx)(N, {
                    fill: "#FFF",
                    height: "28",
                    width: "28",
                  }),
                }),
              a &&
                (0, l.jsx)("div", {
                  className: f().lockedOverlay,
                  children: (0, l.jsx)(x, {}),
                }),
              i &&
                (0, l.jsx)("div", {
                  className: f().partCompleted,
                  children: (0, l.jsx)(C, {}),
                }),
            ],
          });
        },
        H = function (e) {
          var n,
            t,
            r,
            a,
            i,
            o,
            c = e.survey,
            u = e.className;
          return (0, l.jsxs)(M.Z, {
            component: "div",
            rel: "noopener noreferrer",
            interactive: !0,
            className: (0, s.Z)(f().root, "locked", u),
            children: [
              (0, l.jsx)(R, { survey: c }),
              (0, l.jsxs)("div", {
                className: (0, s.Z)(f().informationContainer),
                children: [
                  (
                    null === (n = c.reward) || void 0 === n
                      ? void 0
                      : n.formatted
                  )
                    ? (0, l.jsxs)("aside", {
                        className: (0, s.Z)(f().moneyTimeContainer, f().locked),
                        children: [
                          (0, l.jsx)("p", {
                            className: f().reward,
                            children: (0, l.jsx)("span", {
                              children:
                                (null === (t = c.reward) || void 0 === t
                                  ? void 0
                                  : t.formatted) || "",
                            }),
                          }),
                          (0, l.jsx)("p", {
                            className: f().time,
                            children: ""
                              .concat(c.duration, " min")
                              .concat(c.duration > 1 ? "s" : ""),
                          }),
                        ],
                      })
                    : (0, l.jsx)(z, { survey: c }),
                  (0, l.jsxs)("div", {
                    className: (0, s.Z)(
                      f().lockedInfo,
                      c.tags.includes("broken") && f().broken
                    ),
                    children: [
                      (null === (r = c.lockedInfo) || void 0 === r
                        ? void 0
                        : r.title) &&
                        (0, l.jsx)(A.Z, {
                          component: "h4",
                          children:
                            null === (a = c.lockedInfo) || void 0 === a
                              ? void 0
                              : a.title,
                        }),
                      (null === (i = c.lockedInfo) || void 0 === i
                        ? void 0
                        : i.description) &&
                        (0, l.jsx)(A.Z, {
                          component: "p",
                          children:
                            null === (o = c.lockedInfo) || void 0 === o
                              ? void 0
                              : o.description,
                        }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        Y = function (e) {
          var n,
            t,
            r,
            a,
            i = e.survey,
            o = e.disableTooltip,
            u = e.className,
            m = i.tags.includes("broken"),
            v = (i.lockedInfo && !i.tags.includes("broken")) || !i.url,
            p = "PENDING" === i.status && i.url,
            y = Boolean(
              i.baseReward &&
                (null === (n = i.baseReward) || void 0 === n
                  ? void 0
                  : n.formatted) !==
                  (null === (t = i.reward) || void 0 === t
                    ? void 0
                    : t.formatted)
            ),
            g = i.tags.includes("screener"),
            j = (0, h.Z)(),
            x =
              null !== i.durationDetails.min ||
              null !== i.durationDetails.median ||
              null !== i.durationDetails.max;
          return (
            c().extend(d()),
            g
              ? (0, l.jsx)(G, { survey: i, className: u })
              : m
              ? (0, l.jsx)(H, { survey: i, className: u })
              : (0, l.jsxs)(M.Z, {
                  component: "a",
                  href: L(i.url),
                  rel: "noopener noreferrer",
                  interactive: !v,
                  className: (0, s.Z)(f().root, f().active, u),
                  children: [
                    (0, l.jsx)(R, { survey: i }),
                    i.adminData &&
                      j &&
                      (0, l.jsxs)("div", {
                        className: f().adminInfo,
                        children: [
                          i.adminData.surveyGuid,
                          " : ",
                          i.adminData.rankScore,
                        ],
                      }),
                    (0, l.jsxs)("div", {
                      className: (0, s.Z)(f().informationContainer),
                      children: [
                        (0, l.jsx)(z, { survey: i }),
                        (0, l.jsxs)("aside", {
                          className: f().moneyTimeContainer,
                          children: [
                            (0, l.jsxs)("p", {
                              className: f().reward,
                              children: [
                                y &&
                                  (0, l.jsxs)("s", {
                                    children: [
                                      null === (r = i.baseReward) ||
                                      void 0 === r
                                        ? void 0
                                        : r.formatted,
                                      (0, l.jsx)("svg", {
                                        preserveAspectRatio: "none",
                                        viewBox: "0 0 32 32",
                                        children: (0, l.jsx)("line", {
                                          x1: "0",
                                          y1: "32",
                                          x2: "32",
                                          y2: "0",
                                        }),
                                      }),
                                    ],
                                  }),
                                (0, l.jsx)("span", {
                                  children:
                                    (null === (a = i.reward) || void 0 === a
                                      ? void 0
                                      : a.formatted) || "",
                                }),
                              ],
                            }),
                            !o && x
                              ? (0, l.jsx)(F.Z, {
                                  tip: (0, l.jsxs)("div", {
                                    className: f().qmeeTimeContainer,
                                    children: [
                                      (0, l.jsx)("div", {
                                        className: f().qmeeTimeTitle,
                                        children: (0, l.jsx)(A.Z, {
                                          component: "h5",
                                          children:
                                            "Qmee users take on average:",
                                        }),
                                      }),
                                      (0, l.jsxs)("div", {
                                        className: f().timeIllustration,
                                        children: [
                                          (0, l.jsxs)("div", {
                                            className: f().times,
                                            children: [
                                              (0, l.jsx)("div", {
                                                className: f().timesMin,
                                                children: (0, l.jsx)(A.Z, {
                                                  component: "span",
                                                  translateOptions: {
                                                    plural: "%1s; mins",
                                                    vars: [
                                                      i.durationDetails.min ||
                                                        0,
                                                    ],
                                                  },
                                                  children: "%1s; min",
                                                }),
                                              }),
                                              (0, l.jsx)("div", {
                                                className: f().timesMed,
                                                children: (0, l.jsx)(A.Z, {
                                                  component: "span",
                                                  translateOptions: {
                                                    plural: "%1s; mins",
                                                    vars: [
                                                      i.durationDetails
                                                        .median || 0,
                                                    ],
                                                  },
                                                  children: "%1s; min",
                                                }),
                                              }),
                                              (0, l.jsx)("div", {
                                                className: f().timesMax,
                                                children: (0, l.jsx)(A.Z, {
                                                  component: "span",
                                                  translateOptions: {
                                                    plural: "%1s; mins",
                                                    vars: [
                                                      i.durationDetails.max ||
                                                        0,
                                                    ],
                                                  },
                                                  children: "%1s; min",
                                                }),
                                              }),
                                            ],
                                          }),
                                          (0, l.jsxs)("div", {
                                            className: f().notches,
                                            children: [
                                              (0, l.jsxs)("div", {
                                                className:
                                                  f().notchCircleContainer,
                                                children: [
                                                  (0, l.jsx)("div", {
                                                    className: f().notchesMin,
                                                    children: (0, l.jsx)(
                                                      "div",
                                                      { className: f().notch }
                                                    ),
                                                  }),
                                                  (0, l.jsx)("div", {
                                                    className: f().notchesMed,
                                                    children: (0, l.jsx)(
                                                      "div",
                                                      { className: f().notch }
                                                    ),
                                                  }),
                                                  (0, l.jsx)("div", {
                                                    className: f().notchesMax,
                                                    children: (0, l.jsx)(
                                                      "div",
                                                      { className: f().notch }
                                                    ),
                                                  }),
                                                ],
                                              }),
                                              (0, l.jsx)("div", {
                                                className: f().notchLine,
                                              }),
                                            ],
                                          }),
                                          (0, l.jsx)("hr", {}),
                                          (0, l.jsxs)("div", {
                                            className:
                                              f().providerTimeContainer,
                                            children: [
                                              (0, l.jsx)(A.Z, {
                                                component: "h5",
                                                children:
                                                  "Survey Provider Time:",
                                              }),
                                              (0, l.jsx)(A.Z, {
                                                component: "span",
                                                translateOptions: {
                                                  plural: "%1s; mins",
                                                  vars: [
                                                    i.durationDetails
                                                      .providerDuration || 0,
                                                  ],
                                                },
                                                children: "%1s; min",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  children: (0, l.jsxs)("p", {
                                    className: f().time,
                                    children: [
                                      (0, l.jsx)(T, {}),
                                      i.duration,
                                      " min",
                                      i.duration > 1 ? "s" : "",
                                    ],
                                  }),
                                })
                              : (0, l.jsx)("p", {
                                  className: f().time,
                                  children: ""
                                    .concat(i.duration, " min")
                                    .concat(i.duration > 1 ? "s" : ""),
                                }),
                          ],
                        }),
                        !v &&
                          (0, l.jsx)(_.Z, {
                            className: (0, s.Z)(
                              f().button,
                              p ? f().continue : f().standard
                            ),
                            children: (0, l.jsx)(A.Z, {
                              component: "p",
                              children: p ? "Continue" : "Start",
                            }),
                          }),
                      ],
                    }),
                  ],
                })
          );
        },
        Q = function (e) {
          var n = e.surveyRef,
            t = e.className,
            r = e.disableTooltip,
            a = (0, v.useFragment)(B, n);
          return (0, l.jsx)(Y, { survey: a, disableTooltip: r, className: t });
        };
    },
    69192: function (e, n, t) {
      "use strict";
      t.r(n);
      var r = (function () {
        var e = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "title",
            storageKey: null,
          },
          n = [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "formatted",
              storageKey: null,
            },
          ];
        return {
          argumentDefinitions: [],
          kind: "Fragment",
          metadata: null,
          name: "SurveyItem_survey",
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "studyId",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "supportId",
              storageKey: null,
            },
            e,
            {
              alias: null,
              args: null,
              concreteType: "MoneyAmount",
              kind: "LinkedField",
              name: "reward",
              plural: !1,
              selections: n,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "LockedSurveyInfo",
              kind: "LinkedField",
              name: "lockedInfo",
              plural: !1,
              selections: [
                e,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "description",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "status",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "statusDescription",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "startedAt",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "MoneyAmount",
              kind: "LinkedField",
              name: "baseReward",
              plural: !1,
              selections: n,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "duration",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "DurationDetails",
              kind: "LinkedField",
              name: "durationDetails",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "max",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "median",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "min",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "providerDuration",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "url",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "imageUrl",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "iconUrl",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "tags",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "fraudType",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "AdminSurveyData",
              kind: "LinkedField",
              name: "adminData",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "surveyGuid",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "rankScore",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          type: "Survey",
          abstractKey: null,
        };
      })();
      (r.hash = "998acf98f46363efee3ba188065397ac"), (n.default = r);
    },
    34838: function (e, n, t) {
      "use strict";
      t.d(n, {
        Z: function () {
          return a;
        },
      });
      var r = t(15e3);
      function a() {
        var e = (0, r.IF)();
        return (
          (null === e || void 0 === e ? void 0 : e.roles.includes("admin")) ||
          !1
        );
      }
    },
    11570: function (e) {
      e.exports = {
        root: "Card_root__qEP3_",
        interactive: "Card_interactive__f7luR",
        outlined: "Card_outlined__uy0qq",
      };
    },
    33045: function (e) {
      e.exports = {
        root: "Tooltip_root__UkGqs",
        tip: "Tooltip_tip__nOl_j",
        arrow: "Tooltip_arrow__hZphM",
      };
    },
    51519: function (e) {
      e.exports = {
        root: "SignUpSurveyItem_root__pcpba",
        oinq: "SignUpSurveyItem_oinq__M75DP",
        unpaidTitle: "SignUpSurveyItem_unpaidTitle__FpgKt",
        unpaidCard: "SignUpSurveyItem_unpaidCard__JWCKe",
        signUpButton: "SignUpSurveyItem_signUpButton__HevZ2",
      };
    },
    27011: function (e) {
      e.exports = {
        root: "SurveyItem_root__NGTKv",
        active: "SurveyItem_active__X1y7O",
        imageIconContainer: "SurveyItem_imageIconContainer__pNP19",
        partComplete: "SurveyItem_partComplete___KwRD",
        adminInfo: "SurveyItem_adminInfo__DQQt8",
        image: "SurveyItem_image__EjKo6",
        sensitive: "SurveyItem_sensitive__uAENw",
        sensitiveOverlay: "SurveyItem_sensitiveOverlay__if13m",
        lockedOverlay: "SurveyItem_lockedOverlay__TPSja",
        partCompleted: "SurveyItem_partCompleted__Gc8bh",
        categoryContainer: "SurveyItem_categoryContainer__K00MD",
        title: "SurveyItem_title__YfXc4",
        tagContainer: "SurveyItem_tagContainer__n_FYU",
        informationContainer: "SurveyItem_informationContainer__i8ztJ",
        moneyTimeContainer: "SurveyItem_moneyTimeContainer__jNjI7",
        locked: "SurveyItem_locked__uOFc_",
        reward: "SurveyItem_reward__oC_8A",
        time: "SurveyItem_time__hZAS_",
        qmeeTimeContainer: "SurveyItem_qmeeTimeContainer__19_6l",
        timeIllustration: "SurveyItem_timeIllustration__ChPep",
        times: "SurveyItem_times__HDd_s",
        timesMin: "SurveyItem_timesMin__GYA21",
        timesMed: "SurveyItem_timesMed__wrGdH",
        timesMax: "SurveyItem_timesMax__Yqhc2",
        notches: "SurveyItem_notches__rGKMM",
        notchesMin: "SurveyItem_notchesMin__e71gG",
        notchesMed: "SurveyItem_notchesMed__4t1Gi",
        notchesMax: "SurveyItem_notchesMax__5MyGg",
        qmeeTimeTitle: "SurveyItem_qmeeTimeTitle__0i0VT",
        notchCircleContainer: "SurveyItem_notchCircleContainer___TVvG",
        notchLine: "SurveyItem_notchLine__Y2NmN",
        notch: "SurveyItem_notch__DpATW",
        providerTimeContainer: "SurveyItem_providerTimeContainer__qXpCM",
        button: "SurveyItem_button__NlQU6",
        continue: "SurveyItem_continue__pKEOH",
        standard: "SurveyItem_standard__CiK7a",
        startedAt: "SurveyItem_startedAt__ufKK2",
        lockedInfo: "SurveyItem_lockedInfo__vJ_zQ",
        broken: "SurveyItem_broken__bwGM3",
        historyStatusIcon: "SurveyItem_historyStatusIcon__gNE11",
      };
    },
  },
]);
//# sourceMappingURL=7631-9be87fb18b97a979.js.map
