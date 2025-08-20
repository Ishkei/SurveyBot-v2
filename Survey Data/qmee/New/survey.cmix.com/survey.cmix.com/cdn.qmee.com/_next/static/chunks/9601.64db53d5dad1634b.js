(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9601],
  {
    14480: function (e, n, a) {
      "use strict";
      var t = a(85893);
      a(67294);
      n.Z = function (e) {
        var n = e.color,
          a = e.className;
        return (0, t.jsx)("svg", {
          className: a,
          xmlns: "http://www.w3.org/2000/svg",
          width: "12",
          height: "13",
          viewBox: "0 0 12 22",
          children: (0, t.jsxs)("g", {
            fill: "none",
            fillRule: "evenodd",
            stroke: n || "currentColor",
            strokeWidth: "2",
            transform: "rotate(-180 5.5 10.5)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              (0, t.jsx)("polygon", { points: "9.864 10 .197 0" }),
              (0, t.jsx)("path", { d: "M9.86363636,10 L0.196969697,20" }),
            ],
          }),
        });
      };
    },
    49594: function (e, n, a) {
      "use strict";
      var t = a(85893),
        l = a(86010),
        r = a(67294),
        i = a(69926),
        o = a(14480),
        s = a(84646),
        c = a(95832),
        u = a.n(c);
      function d(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, t = new Array(n); a < n; a++) t[a] = e[a];
        return t;
      }
      function m(e, n, a) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[n] = a),
          e
        );
      }
      function f(e, n) {
        if (null == e) return {};
        var a,
          t,
          l = (function (e, n) {
            if (null == e) return {};
            var a,
              t,
              l = {},
              r = Object.keys(e);
            for (t = 0; t < r.length; t++)
              (a = r[t]), n.indexOf(a) >= 0 || (l[a] = e[a]);
            return l;
          })(e, n);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (t = 0; t < r.length; t++)
            (a = r[t]),
              n.indexOf(a) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, a) &&
                  (l[a] = e[a]));
        }
        return l;
      }
      function g(e, n) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, n) {
            var a =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != a) {
              var t,
                l,
                r = [],
                i = !0,
                o = !1;
              try {
                for (
                  a = a.call(e);
                  !(i = (t = a.next()).done) &&
                  (r.push(t.value), !n || r.length !== n);
                  i = !0
                );
              } catch (s) {
                (o = !0), (l = s);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (o) throw l;
                }
              }
              return r;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return d(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
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
      n.Z = function (e) {
        var n,
          a,
          c = e.title,
          d = e.className,
          p = e.headerClassName,
          h = e.contentClassName,
          y = e.children,
          k = e.startOpen,
          v = e.open,
          _ = e.skipTitleTranslation,
          b = e.id,
          x = e.onOpen,
          j = e.headerIcon,
          C = f(e, [
            "title",
            "className",
            "headerClassName",
            "contentClassName",
            "children",
            "startOpen",
            "open",
            "skipTitleTranslation",
            "id",
            "onOpen",
            "headerIcon",
          ]),
          I = r.useRef(null),
          F = g(r.useState(k || v), 2),
          A = F[0],
          L = F[1],
          S = g(r.useState(!1), 2),
          Z = S[0],
          N = S[1],
          w = g(r.useState(!0), 2),
          K = w[0],
          P = w[1],
          T = (0, i.q_)({
            from: {
              maxHeight: A
                ? 0
                : null === (n = I.current) || void 0 === n
                ? void 0
                : n.scrollHeight,
            },
            to: {
              maxHeight: A
                ? null === (a = I.current) || void 0 === a
                  ? void 0
                  : a.scrollHeight
                : 0,
            },
            onRest: function () {
              return P(!1);
            },
          });
        return (
          r.useEffect(
            function () {
              Z && P(!0);
            },
            [Z]
          ),
          r.useEffect(
            function () {
              A || Z ? (P(!0), N(!0)) : P(!1), void 0 !== v && A !== v && L(v);
            },
            [v, A, Z]
          ),
          (0, t.jsxs)(
            "div",
            (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var a = null != arguments[n] ? arguments[n] : {},
                  t = Object.keys(a);
                "function" === typeof Object.getOwnPropertySymbols &&
                  (t = t.concat(
                    Object.getOwnPropertySymbols(a).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(a, e).enumerable;
                    })
                  )),
                  t.forEach(function (n) {
                    m(e, n, a[n]);
                  });
              }
              return e;
            })({ id: b, className: (0, l.Z)(u().root, d) }, C, {
              children: [
                Boolean(c) &&
                  (0, t.jsxs)("button", {
                    className: (0, l.Z)(p),
                    type: "button",
                    onClick: function () {
                      x && x(b || "", !A), void 0 === v && L(!A);
                    },
                    children: [
                      (0, t.jsx)(s.Z, { skipTranslation: _, children: c }),
                      (0, t.jsx)(o.Z, {
                        className: (0, l.Z)(
                          u().icon,
                          A ? u().iconOpen : u().iconClosed
                        ),
                      }),
                      j,
                    ],
                  }),
                K
                  ? (0, t.jsx)(i.q.div, {
                      style: T,
                      className: (0, l.Z)(u().content, h),
                      ref: I,
                      children: y,
                    })
                  : (0, t.jsx)("div", {
                      style: { maxHeight: A ? "auto" : 0 },
                      className: (0, l.Z)(u().content, A && u().openContent, h),
                      ref: I,
                      children: y,
                    }),
              ],
            })
          )
        );
      };
    },
    47528: function (e, n, a) {
      "use strict";
      var t = a(85893),
        l = a(86010),
        r = a(67294),
        i = a(28090),
        o = a.n(i);
      function s(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, t = new Array(n); a < n; a++) t[a] = e[a];
        return t;
      }
      function c(e, n) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, n) {
            var a =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != a) {
              var t,
                l,
                r = [],
                i = !0,
                o = !1;
              try {
                for (
                  a = a.call(e);
                  !(i = (t = a.next()).done) &&
                  (r.push(t.value), !n || r.length !== n);
                  i = !0
                );
              } catch (s) {
                (o = !0), (l = s);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (o) throw l;
                }
              }
              return r;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return s(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return s(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      n.Z = function (e) {
        var n = e.className,
          a = e.diameterInPixels,
          i = e.progressPercentage,
          s = e.thickness,
          u = 0.5 * (a - s),
          d = c(r.useState(2 * Math.PI * u), 2),
          m = d[0],
          f = d[1],
          g = c(r.useState(m), 2),
          p = g[0],
          h = g[1];
        return (
          r.useEffect(
            function () {
              f(2 * Math.PI * u);
            },
            [u]
          ),
          r.useEffect(
            function () {
              i >= 0 && i <= 100 && h(m - (i / 100) * m);
            },
            [i, m]
          ),
          (0, t.jsx)("svg", {
            className: (0, l.Z)(o().root, n),
            width: "".concat(a),
            height: "".concat(a),
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, t.jsx)("circle", {
              cx: "".concat(Math.floor(a / 2)),
              cy: "".concat(Math.floor(a / 2)),
              r: "".concat(u),
              stroke: "currentColor",
              strokeWidth: "".concat(s),
              fill: "none",
              strokeDasharray: "".concat(m, " ").concat(m),
              strokeDashoffset: "".concat(p),
              style: { transition: "0.5s" },
            }),
          })
        );
      };
    },
    13556: function (e, n, a) {
      "use strict";
      a.d(n, {
        Z: function () {
          return o;
        },
      });
      var t = a(85893),
        l = a(67294),
        r = a(72447),
        i = a(53624);
      function o(e) {
        var n = e.children,
          a = e.fallback,
          o = e.className,
          s = e.withoutSSR,
          c = e.height,
          u = e.force,
          d = (0, r.Z)(),
          m = a || (0, t.jsx)(i.Z, { height: c || 16, className: o });
        return u || (s && d)
          ? (0, t.jsx)(t.Fragment, { children: m })
          : (0, t.jsx)(l.Suspense, { fallback: m, children: n });
      }
    },
    9601: function (e, n, a) {
      "use strict";
      a.r(n),
        a.d(n, {
          default: function () {
            return pe;
          },
        });
      var t,
        l = a(85893),
        r = a(86010),
        i = a(5152),
        o = a.n(i),
        s = a(67294);
      function c() {
        return (
          (c = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var a = arguments[n];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
                }
                return e;
              }),
          c.apply(this, arguments)
        );
      }
      var u,
        d = function (e) {
          return s.createElement(
            "svg",
            c(
              {
                height: 21,
                viewBox: "0 0 17 21",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            t ||
              (t = s.createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8.371 9.816c1.349 0 2.516-.483 3.47-1.438.955-.954 1.438-2.121 1.438-3.47 0-1.348-.483-2.516-1.438-3.47C10.887.484 9.72 0 8.371 0c-1.348 0-2.515.484-3.47 1.438-.954.954-1.437 2.122-1.437 3.47 0 1.349.483 2.516 1.438 3.47.954.954 2.121 1.438 3.47 1.438ZM16.794 14.382c.082.457.137.89.165 1.287.027.388.04.793.041 1.204 0 1.064-.338 1.925-1.005 2.56-.659.627-1.53.945-2.59.945h-9.81c-1.06 0-1.932-.318-2.59-.945C.338 18.798 0 17.937 0 16.873c0-.409.014-.813.04-1.203.028-.398.084-.832.166-1.288.083-.461.189-.897.316-1.295a6.41 6.41 0 0 1 .532-1.207c.23-.405.5-.756.803-1.046a3.535 3.535 0 0 1 1.153-.724 3.978 3.978 0 0 1 1.47-.267c.209 0 .41.085.798.338.243.158.523.339.832.536.267.17.628.33 1.074.474.437.14.879.212 1.316.212.436 0 .879-.071 1.314-.212.447-.145.809-.304 1.076-.474.312-.2.591-.38.83-.536.389-.253.59-.338.798-.338.53 0 1.025.09 1.472.266.448.178.836.422 1.152.725.303.29.573.641.803 1.046.221.389.4.795.532 1.207.128.398.234.834.317 1.295Z",
                fill: "currentColor",
              }))
          );
        },
        m = a(13556),
        f = a(20298);
      function g() {
        return (
          (g = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var a = arguments[n];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
                }
                return e;
              }),
          g.apply(this, arguments)
        );
      }
      var p = function (e) {
          return s.createElement(
            "svg",
            g({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 60 30" }, e),
            u ||
              (u = s.createElement(
                "g",
                {
                  "data-name": "Group 7465",
                  transform: "translate(-224 -535)",
                },
                s.createElement("rect", {
                  "data-name": "Rectangle 1788",
                  width: 60,
                  height: 30,
                  rx: 15,
                  transform: "translate(224 535)",
                  fill: "#fd6a6a",
                }),
                s.createElement("path", {
                  "data-name": "Path 14581",
                  d: "M239.776 554h4.578a2.646 2.646 0 0 0 2.856-2.632 2.8 2.8 0 0 0-1.75-2.478 2.285 2.285 0 0 0 1.372-2.114 2.427 2.427 0 0 0-2.646-2.394h-4.41Zm1.092-5.544v-3.08h3.038a1.634 1.634 0 0 1 1.82 1.54 1.634 1.634 0 0 1-1.82 1.54Zm0 4.55v-3.556h3.206a1.842 1.842 0 0 1 2.026 1.778 1.842 1.842 0 0 1-2.026 1.778Zm11.466.224a2.571 2.571 0 0 1-2.576-2.45h5.922c0-2.534-1.246-4.186-3.43-4.186a3.64 3.64 0 0 0-3.57 3.766 3.721 3.721 0 0 0 3.668 3.808 4.324 4.324 0 0 0 2.912-1.12l-.644-.686a3.4 3.4 0 0 1-2.282.868Zm-.042-5.7a2.313 2.313 0 0 1 2.352 2.312h-4.872a2.531 2.531 0 0 1 2.52-2.31Zm8.288 5.4a1.042 1.042 0 0 1-.756.294.844.844 0 0 1-.784-.91V547.7h1.778v-.938h-1.778v-1.988h-1.05v1.988h-1.134v.938h1.134v4.62a1.736 1.736 0 0 0 1.764 1.848 2.2 2.2 0 0 0 1.346-.462Zm4.942-6.342a5.852 5.852 0 0 0-2.6.7l.42.854a4.846 4.846 0 0 1 2.114-.658 1.848 1.848 0 0 1 1.96 2.1v.266a7.9 7.9 0 0 0-2.356-.4 2.588 2.588 0 0 0-2.842 2.408 2.365 2.365 0 0 0 2.646 2.31 3.029 3.029 0 0 0 2.548-1.3V554h1.05v-4.41a2.722 2.722 0 0 0-2.94-2.996Zm-.476 6.65c-1.022 0-1.806-.532-1.806-1.428 0-.868.91-1.484 1.988-1.484a8.237 8.237 0 0 1 2.184.294v1.106a2.378 2.378 0 0 1-2.366 1.518Z",
                  fill: "#fff",
                })
              ))
          );
        },
        h = a(77766),
        y = a.n(h),
        k = a(86221),
        v = a(84646),
        _ = a(24516),
        b = a.n(_);
      function x(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, t = new Array(n); a < n; a++) t[a] = e[a];
        return t;
      }
      function j(e, n) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, n) {
            var a =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != a) {
              var t,
                l,
                r = [],
                i = !0,
                o = !1;
              try {
                for (
                  a = a.call(e);
                  !(i = (t = a.next()).done) &&
                  (r.push(t.value), !n || r.length !== n);
                  i = !0
                );
              } catch (s) {
                (o = !0), (l = s);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (o) throw l;
                }
              }
              return r;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return x(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return x(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function C(e) {
        return "setting.newtag.".concat(e);
      }
      var I = function (e) {
        var n = e.children,
          a = e.className,
          t = e.featureKey,
          i = j((0, k.Z)(C(t), !1), 1)[0],
          o = j(s.useState(!1), 2),
          c = o[0],
          u = o[1];
        return (0, l.jsxs)("div", {
          className: (0, r.Z)(a, b().root),
          onMouseEnter: function () {
            return u(!0);
          },
          children: [
            n,
            !(c || i) &&
              (0, l.jsxs)(l.Fragment, {
                children: [
                  (0, l.jsx)("div", { className: b().arrow }),
                  (0, l.jsx)(v.Z, {
                    className: b().tag,
                    component: "p",
                    children: "NEW",
                  }),
                ],
              }),
          ],
        });
      };
      var F = a(39414),
        A = a(49594);
      var L,
        S,
        Z = a(13499),
        N = a(15e3),
        w = a(48020),
        K = function (e) {
          var n = e.className,
            a = (0, N.M6)();
          return (0, l.jsx)(w.Z, {
            buttonSize: "large",
            className: n,
            buttonType: "secondary",
            onClick: function () {
              a("button");
            },
            children: (0, l.jsx)(v.Z, { children: "Sign Out" }),
          });
        },
        P = a(22578),
        T = a(13203),
        R = a(58262),
        M = function (e) {
          var n = e.taskChecklistRef,
            a = (0, T.ZP)(R, n);
          return (0, l.jsx)(l.Fragment, {
            children:
              0 === a.completed.pageInfo.totalCount
                ? (0, l.jsx)("span", { children: "Try me!" })
                : (0, l.jsxs)("div", {
                    children: [
                      a.completed.pageInfo.totalCount || 0,
                      "/",
                      (a.completed.pageInfo.totalCount || 0) +
                        (a.remaining.pageInfo.totalCount || 0),
                    ],
                  }),
          });
        },
        O = function () {
          var e = (0, P.useLazyLoadQuery)(
            a(52523),
            {},
            { fetchPolicy: "store-or-network" }
          );
          return (0, l.jsx)(m.Z, {
            withoutSSR: !0,
            children: e.tasks && (0, l.jsx)(M, { taskChecklistRef: e.tasks }),
          });
        },
        E = function (e) {
          var n = e.className,
            a = e.onAdminButtonClick,
            t = e.isAdmin,
            i = (function (e) {
              var n = j((0, k.Z)(C(e), !1), 2),
                a = (n[0], n[1]);
              return function () {
                return a(!0);
              };
            })("league");
          return (0, l.jsx)("div", {
            className: (0, r.Z)(y().root, n),
            children: (0, l.jsxs)("nav", {
              children: [
                (0, l.jsx)(l.Fragment, {
                  children: (0, l.jsx)(A.Z, {
                    className: y().darkMenuList,
                    headerClassName: y().collapsibleHeader,
                    title: "Leagues",
                    onOpen: i,
                    headerIcon: (0, l.jsx)(p, { className: y().BetaIcon }),
                    children: (0, l.jsxs)("ul", {
                      className: y().leaguesMenuList,
                      children: [
                        (0, l.jsx)("li", {
                          children: (0, l.jsx)(F.Z, {
                            to: f.rW.path,
                            className: "link",
                            children: (0, l.jsx)(v.Z, {
                              children: "Leaderboard",
                            }),
                          }),
                        }),
                        (0, l.jsx)("li", {
                          children: (0, l.jsx)(F.Z, {
                            to: f.u$.path,
                            className: "link",
                            children: (0, l.jsx)(v.Z, {
                              children: "My Profile",
                            }),
                          }),
                        }),
                        (0, l.jsx)("li", {
                          children: (0, l.jsx)(F.Z, {
                            to: f.SG.path,
                            className: "link",
                            children: (0, l.jsx)(v.Z, {
                              children: "My Avatar",
                            }),
                          }),
                        }),
                        (0, l.jsx)("li", {
                          children: (0, l.jsx)(F.Z, {
                            to: f.c$.path,
                            className: "link",
                            children: (0, l.jsx)(v.Z, {
                              children: "How It Works",
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                (0, l.jsxs)("ul", {
                  className: y().menuList,
                  children: [
                    (0, l.jsx)("li", {
                      className: y().titleMenuListItem,
                      children: (0, l.jsx)(v.Z, {
                        component: "h4",
                        children: "My Account",
                      }),
                    }),
                    (0, l.jsx)("li", {
                      children: (0, l.jsx)(F.Z, {
                        to: f.xD.path,
                        className: "link",
                        children: (0, l.jsx)(v.Z, {
                          children: "Survey Profile",
                        }),
                      }),
                    }),
                    (0, l.jsx)("li", {
                      children: (0, l.jsx)(F.Z, {
                        to: f.LT.path,
                        className: "link",
                        children: (0, l.jsx)(v.Z, { children: "My Balance" }),
                      }),
                    }),
                    (0, l.jsx)("li", {
                      children: (0, l.jsx)(F.Z, {
                        to: f.I1.path,
                        className: "link",
                        children: (0, l.jsx)(v.Z, {
                          children: "Login Details",
                        }),
                      }),
                    }),
                    (0, l.jsx)("li", {
                      children: (0, l.jsx)(F.Z, {
                        to: f.L6.path,
                        className: "link",
                        children: (0, l.jsx)(v.Z, {
                          children: "Privacy Settings",
                        }),
                      }),
                    }),
                  ],
                }),
                (0, l.jsx)("ul", {
                  className: y().menuList,
                  children: (0, l.jsx)("li", {
                    className: y().titleMenuListItem,
                    children: (0, l.jsx)(F.Z, {
                      to: f.Lo.path,
                      children: (0, l.jsxs)(v.Z, {
                        component: "h4",
                        children: [
                          "Explore Qmee",
                          " ",
                          (0, l.jsx)("span", {
                            className: y().badge,
                            children: (0, l.jsx)(m.Z, {
                              withoutSSR: !0,
                              children: (0, l.jsx)(Z.Z, {
                                fallback: null,
                                children: (0, l.jsx)(O, {}),
                              }),
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                }),
                (0, l.jsxs)("ul", {
                  className: y().menuList,
                  children: [
                    (0, l.jsx)("li", {
                      className: y().titleMenuListItem,
                      children: (0, l.jsx)(v.Z, {
                        component: "h4",
                        children: "Referrals",
                      }),
                    }),
                    (0, l.jsx)("li", {
                      children: (0, l.jsx)(F.Z, {
                        to: f.ys.path,
                        className: "link",
                        children: (0, l.jsx)(v.Z, {
                          children: "Refer a Friend",
                        }),
                      }),
                    }),
                    false,
                  ],
                }),
                (0, l.jsxs)("ul", {
                  className: y().menuList,
                  children: [
                    (0, l.jsx)("li", {
                      className: y().titleMenuListItem,
                      children: (0, l.jsx)(v.Z, {
                        component: "h4",
                        children: "Help",
                      }),
                    }),
                    (0, l.jsx)("li", {
                      children: (0, l.jsx)(F.Z, {
                        to: f.UC.path,
                        className: "link",
                        children: (0, l.jsx)(v.Z, { children: "Survey Tips" }),
                      }),
                    }),
                    (0, l.jsx)("li", {
                      children: (0, l.jsx)(F.Z, {
                        to: f.Z0.path,
                        className: "link",
                        children: (0, l.jsx)(v.Z, { children: "FAQ" }),
                      }),
                    }),
                    (0, l.jsx)("li", {
                      children: (0, l.jsx)(F.Z, {
                        to: f.YS.path,
                        className: "link",
                        children: (0, l.jsx)(v.Z, { children: "Contact Us" }),
                      }),
                    }),
                  ],
                }),
                t &&
                  (0, l.jsx)("ul", {
                    className: y().menuList,
                    children: (0, l.jsx)("li", {
                      className: y().titleMenuListItem,
                      children: (0, l.jsx)("button", {
                        onClick: a,
                        children: (0, l.jsx)("h4", {
                          children: "Toggle Admin Panel",
                        }),
                      }),
                    }),
                  }),
                (0, l.jsx)(K, { className: y().logoutButton }),
              ],
            }),
          });
        },
        B = a(67912),
        H = a(69926),
        Q = a(5998),
        D = a.n(Q);
      function q() {
        return (
          (q = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var a = arguments[n];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
                }
                return e;
              }),
          q.apply(this, arguments)
        );
      }
      var W = function (e) {
          return s.createElement(
            "svg",
            q(
              {
                height: 216,
                viewBox: "0 0 217 216",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            L ||
              (L = s.createElement(
                "g",
                { clipPath: "url(#coin_svg__a)" },
                s.createElement("path", {
                  d: "M216.165 107.917C216.165 167.61 167.551 216 107.583 216c-31.613 0-60.07-13.446-79.913-34.909a108.531 108.531 0 0 1-13.752-18.462C4.438 146.58-1 127.879-1 107.917-1 48.225 47.614-.165 107.583-.165c20.059 0 38.846 5.413 54.965 14.853a108.539 108.539 0 0 1 18.543 13.69c21.561 19.74 35.074 48.072 35.074 79.539Z",
                  fill: "#F0CD00",
                }),
                s.createElement("path", {
                  d: "M216.166 107.917c0 58.347-46.443 105.894-104.541 108.008C53.526 213.811 7.084 166.264 7.084 107.917 7.084 49.57 53.526 2.022 111.625-.091c58.098 2.113 104.541 49.66 104.541 108.008Z",
                  fill: "#FFDE50",
                }),
                s.createElement("path", {
                  d: "M181.091 28.378 27.671 181.091a108.583 108.583 0 0 1-13.753-18.463l148.63-147.94a108.528 108.528 0 0 1 18.543 13.689ZM208.675 68.403 67.881 208.549a108.575 108.575 0 0 1-27.491-15.723L192.884 41.034a107.615 107.615 0 0 1 15.791 27.369Z",
                  fill: "#FFEA94",
                }),
                s.createElement("path", {
                  d: "M191.958 107.918c0 46.383-37.778 83.987-84.375 83.987-16.23 0-31.387-4.562-44.253-12.467a84.508 84.508 0 0 1-15.41-12.137 84.184 84.184 0 0 1-9.316-11.002 83.6 83.6 0 0 1-9.529-17.549c-3.67-9.242-5.735-19.292-5.859-29.8-.009-.344-.009-.688-.009-1.032 0-46.383 37.774-83.987 84.376-83.987.345 0 .696 0 1.041.009a84.397 84.397 0 0 1 29.934 5.832 84.434 84.434 0 0 1 17.63 9.485 85.03 85.03 0 0 1 11.053 9.273 84.107 84.107 0 0 1 12.192 15.338c7.942 12.807 12.525 27.895 12.525 44.05Z",
                  fill: "#F9C71E",
                }),
                s.createElement("path", {
                  d: "M167.241 48.53 47.92 167.3a84.184 84.184 0 0 1-9.316-11.002 83.6 83.6 0 0 1-9.529-17.549c-3.67-9.242-5.735-19.292-5.859-29.8-.009-.344-.009-.688-.009-1.032 0-46.383 37.774-83.987 84.376-83.987.345 0 .696 0 1.041.009a84.397 84.397 0 0 1 29.934 5.832 84.434 84.434 0 0 1 17.63 9.485 85.03 85.03 0 0 1 11.053 9.273Z",
                  fill: "#FFD028",
                }),
                s.createElement("path", {
                  d: "M191.956 107.918c0 46.383-37.778 83.987-84.375 83.987-1.6 0-3.187-.045-4.765-.133 44.382-2.457 79.607-39.064 79.607-83.854s-35.225-81.398-79.607-83.855a85.334 85.334 0 0 1 4.765-.132c46.597 0 84.375 37.604 84.375 83.987Z",
                  fill: "#EBBA14",
                })
              )),
            S ||
              (S = s.createElement(
                "defs",
                null,
                s.createElement(
                  "clipPath",
                  { id: "coin_svg__a" },
                  s.createElement("path", {
                    fill: "#fff",
                    d: "M0 0h217v216H0z",
                  })
                )
              ))
          );
        },
        $ = a(64611),
        U = a.n($),
        V = a(11163);
      function z(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, t = new Array(n); a < n; a++) t[a] = e[a];
        return t;
      }
      function G(e, n) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, n) {
            var a =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != a) {
              var t,
                l,
                r = [],
                i = !0,
                o = !1;
              try {
                for (
                  a = a.call(e);
                  !(i = (t = a.next()).done) &&
                  (r.push(t.value), !n || r.length !== n);
                  i = !0
                );
              } catch (s) {
                (o = !0), (l = s);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (o) throw l;
                }
              }
              return r;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return z(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return z(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var X = a(53698),
        J = function (e) {
          var n = e.balanceRef,
            a = (0, T.ZP)(X, n),
            t = G(
              (0, k.Z)(
                "oldBalance",
                function () {
                  return a.amount.cents;
                },
                { storeInitialValue: !0, disableInstanceSync: !0 }
              ),
              2
            ),
            i = t[0],
            o = t[1],
            c = a.amount.cents - i,
            u = G(
              (0, H.q_)(function () {
                return { value: i };
              }),
              2
            ),
            d = u[0],
            m = u[1],
            f = G(
              (0, H.q_)(function () {
                return { width: 0, left: 0, opacity: 0 };
              }),
              2
            ),
            g = f[0],
            p = f[1],
            h = (0, V.useRouter)();
          s.useEffect(
            function () {
              a.amount.cents !== i &&
                (p.set({ left: 0 }),
                m.set({ value: i }),
                m.start({
                  from: { value: i },
                  to: { value: a.amount.cents },
                  delay: 1e3,
                }),
                p.start({
                  from: { width: 0, left: 0, opacity: 0 },
                  to: [
                    { width: 160, left: -115, opacity: 1 },
                    { width: 160, left: -115, opacity: 1, delay: 1e3 },
                    { width: 0, left: 0, opacity: 0 },
                  ],
                  onRest: function (e) {
                    e.finished && o(a.amount.cents);
                  },
                }));
            },
            [a, p, i, m, o]
          );
          var y = (0, N.IF)(),
            v = null === y || void 0 === y ? void 0 : y.country,
            _ = h.locale || "en-us",
            b = new Intl.NumberFormat(v || _, {
              style: "currency",
              currency: a.amount.currency,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          return (0, l.jsxs)("div", {
            className: U().root,
            children: [
              (0, l.jsxs)(H.q.div, {
                className: (0, r.Z)(
                  D().root,
                  U().diff,
                  c < 0 ? U().cashout : U().payment
                ),
                style: g,
                children: [
                  c > 0 &&
                    (0, l.jsx)("div", {
                      className: U().coinWrapper,
                      children: (0, l.jsx)(W, { className: U().coin }),
                    }),
                  c > 0 && "+",
                  b.format(c / 100),
                ],
              }),
              (0, l.jsx)(H.q.div, {
                className: (0, r.Z)(D().root, U().current),
                children:
                  a.amount.cents === i
                    ? a.amount.formatted
                    : d.value.to(function (e) {
                        return b.format(e / 100).replace(/\s/g, "");
                      }),
              }),
            ],
          });
        },
        Y = a(80159),
        ee = function () {
          var e = (0, B.useLazyLoadQuery)(
            Y,
            {},
            { fetchPolicy: "store-or-network" }
          );
          return e.balance
            ? (0, l.jsx)(J, { balanceRef: e.balance })
            : (0, l.jsx)(l.Fragment, { children: "???" });
        },
        ne = function () {
          return (0, l.jsx)("h1", {
            className: U().balanceWrapper,
            children: (0, l.jsx)(Z.Z, {
              fallback: (0, l.jsx)("div", {
                className: U().fallback,
                children: "???",
              }),
              children: (0, l.jsx)(ee, {}),
            }),
          });
        },
        ae = a(91803),
        te = a.n(ae),
        le = a(47528),
        re = a(46065),
        ie = function (e) {
          var n = e.progressRef,
            a = (0, T.ZP)(re, n),
            t =
              (a.remaining.pageInfo.totalCount || 0) +
              (a.completed.pageInfo.totalCount || 0),
            r = ((a.completed.pageInfo.totalCount || 0) / t) * 100;
          return (0, l.jsx)(le.Z, {
            diameterInPixels: 50,
            progressPercentage: r,
            thickness: 4,
            className: te().checklistProgress,
          });
        },
        oe = a(60102),
        se = function () {
          var e = (0, B.useLazyLoadQuery)(
            oe,
            {},
            { fetchPolicy: "store-or-network" }
          );
          return e.tasks ? (0, l.jsx)(ie, { progressRef: e.tasks }) : null;
        },
        ce = a(4935),
        ue = a.n(ce),
        de = a(34838);
      function me(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, t = new Array(n); a < n; a++) t[a] = e[a];
        return t;
      }
      function fe(e, n) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, n) {
            var a =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != a) {
              var t,
                l,
                r = [],
                i = !0,
                o = !1;
              try {
                for (
                  a = a.call(e);
                  !(i = (t = a.next()).done) &&
                  (r.push(t.value), !n || r.length !== n);
                  i = !0
                );
              } catch (s) {
                (o = !0), (l = s);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (o) throw l;
                }
              }
              return r;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return me(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return me(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var ge = o()(
          function () {
            return Promise.resolve().then(a.bind(a, 68631));
          },
          {
            loadableGenerated: {
              webpack: function () {
                return [68631];
              },
            },
          }
        ),
        pe = function () {
          var e = s.createRef(),
            n = fe(s.useState(!1), 2),
            a = n[0],
            t = n[1],
            i = (0, de.Z)(),
            o = (0, l.jsxs)("div", {
              className: (0, r.Z)(D().root, ue().navigationContainer),
              children: [
                (0, l.jsx)(d, { className: ue().icon }),
                (0, l.jsx)(s.Suspense, {
                  fallback: null,
                  children: (0, l.jsx)(Z.Z, {
                    fallback: null,
                    children: (0, l.jsx)(se, {}),
                  }),
                }),
              ],
            });
          return (0, l.jsxs)("div", {
            className: ue().loggedInContainer,
            children: [
              (0, l.jsx)("div", {
                ref: e,
                children:
                  a &&
                  i &&
                  (0, l.jsx)(s.Suspense, {
                    fallback: null,
                    children: (0, l.jsx)(ge, {
                      onClose: function () {
                        return t(!1);
                      },
                    }),
                  }),
              }),
              false,
              (0, l.jsx)(F.Z, {
                to: f.LT.path,
                className: (0, r.Z)(D().root, ue().navigationContainer),
                children: (0, l.jsx)(m.Z, {
                  withoutSSR: !0,
                  children: (0, l.jsx)(Z.Z, {
                    fallback: null,
                    children: (0, l.jsx)(ne, {}),
                  }),
                }),
              }),
              (0, l.jsx)(I, {
                featureKey: "league",
                className: ue().navigationContainer,
                children: o,
              }),
              (0, l.jsx)(E, {
                className: (0, r.Z)(ue().hoverNav, ue().hoverNavContainer),
                onAdminButtonClick: function () {
                  return t(!a);
                },
                isAdmin: i,
              }),
            ],
          });
        };
    },
    80159: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = {
        fragment: {
          argumentDefinitions: [],
          kind: "Fragment",
          metadata: null,
          name: "AnimatedBalanceQuery",
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "Balance",
              kind: "LinkedField",
              name: "balance",
              plural: !1,
              selections: [
                {
                  args: null,
                  kind: "FragmentSpread",
                  name: "AnimatedBalance_balance",
                },
              ],
              storageKey: null,
            },
          ],
          type: "Query",
          abstractKey: null,
        },
        kind: "Request",
        operation: {
          argumentDefinitions: [],
          kind: "Operation",
          name: "AnimatedBalanceQuery",
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "Balance",
              kind: "LinkedField",
              name: "balance",
              plural: !1,
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
                  concreteType: "MoneyAmount",
                  kind: "LinkedField",
                  name: "amount",
                  plural: !1,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "formatted",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "cents",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "currency",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
        },
        params: {
          cacheID: "9356d9127b574d004c8ca477c64997a7",
          id: null,
          metadata: {},
          name: "AnimatedBalanceQuery",
          operationKind: "query",
          text: "query AnimatedBalanceQuery {\n  balance {\n    ...AnimatedBalance_balance\n    id\n  }\n}\n\nfragment AnimatedBalance_balance on Balance {\n  id\n  amount {\n    formatted\n    cents\n    currency\n  }\n}\n",
        },
        hash: "3a3a0b1896c457eaf815ca51c3fa22c2",
      };
      n.default = t;
    },
    56158: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          n = [{ kind: "Variable", name: "id", variableName: "id" }];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "AnimatedBalanceRefetchQuery",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "AnimatedBalance_balance",
                  },
                ],
                storageKey: null,
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "AnimatedBalanceRefetchQuery",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "__typename",
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "id",
                    storageKey: null,
                  },
                  {
                    kind: "InlineFragment",
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "MoneyAmount",
                        kind: "LinkedField",
                        name: "amount",
                        plural: !1,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "formatted",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "cents",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "currency",
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                    ],
                    type: "Balance",
                    abstractKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "3916d1a1f28cf52bab0be487075f06d1",
            id: null,
            metadata: {},
            name: "AnimatedBalanceRefetchQuery",
            operationKind: "query",
            text: "query AnimatedBalanceRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...AnimatedBalance_balance\n    id\n  }\n}\n\nfragment AnimatedBalance_balance on Balance {\n  id\n  amount {\n    formatted\n    cents\n    currency\n  }\n}\n",
          },
        };
      })();
      (t.hash = "97cac2ed2bb5edcf1edffaaa42f04b83"), (n.default = t);
    },
    53698: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = {
        argumentDefinitions: [],
        kind: "Fragment",
        metadata: {
          refetch: {
            connection: null,
            fragmentPathInResult: ["node"],
            operation: a(56158),
            identifierField: "id",
          },
        },
        name: "AnimatedBalance_balance",
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
            concreteType: "MoneyAmount",
            kind: "LinkedField",
            name: "amount",
            plural: !1,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "formatted",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "cents",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "currency",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        type: "Balance",
        abstractKey: null,
        hash: "97cac2ed2bb5edcf1edffaaa42f04b83",
      };
      n.default = t;
    },
    52523: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = (function () {
        var e = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          n = [
            {
              alias: null,
              args: null,
              concreteType: "PageInfo",
              kind: "LinkedField",
              name: "pageInfo",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "totalCount",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            e,
          ];
        return {
          fragment: {
            argumentDefinitions: [],
            kind: "Fragment",
            metadata: null,
            name: "ExploreProgressQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "TaskChecklist",
                kind: "LinkedField",
                name: "tasks",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "ExploreProgress_taskChecklist",
                  },
                ],
                storageKey: null,
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: [],
            kind: "Operation",
            name: "ExploreProgressQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "TaskChecklist",
                kind: "LinkedField",
                name: "tasks",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskConnection",
                    kind: "LinkedField",
                    name: "remaining",
                    plural: !1,
                    selections: n,
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskConnection",
                    kind: "LinkedField",
                    name: "completed",
                    plural: !1,
                    selections: n,
                    storageKey: null,
                  },
                  e,
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "0c2fb7b3b25f989280866dbd93ad35d2",
            id: null,
            metadata: {},
            name: "ExploreProgressQuery",
            operationKind: "query",
            text: "query ExploreProgressQuery {\n  tasks {\n    ...ExploreProgress_taskChecklist\n    id\n  }\n}\n\nfragment ExploreProgress_taskChecklist on TaskChecklist {\n  remaining {\n    pageInfo {\n      totalCount\n    }\n    id\n  }\n  completed {\n    pageInfo {\n      totalCount\n    }\n    id\n  }\n  id\n}\n",
          },
        };
      })();
      (t.hash = "fb93044e6ba966af8626aa66cf209e5c"), (n.default = t);
    },
    23557: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          n = [{ kind: "Variable", name: "id", variableName: "id" }],
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          t = [
            {
              alias: null,
              args: null,
              concreteType: "PageInfo",
              kind: "LinkedField",
              name: "pageInfo",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "totalCount",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            a,
          ];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "ExploreProgressRefetchQuery",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "ExploreProgress_taskChecklist",
                  },
                ],
                storageKey: null,
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "ExploreProgressRefetchQuery",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "__typename",
                    storageKey: null,
                  },
                  a,
                  {
                    kind: "InlineFragment",
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "remaining",
                        plural: !1,
                        selections: t,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "completed",
                        plural: !1,
                        selections: t,
                        storageKey: null,
                      },
                    ],
                    type: "TaskChecklist",
                    abstractKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "6f775970ab23dee366001029e935720e",
            id: null,
            metadata: {},
            name: "ExploreProgressRefetchQuery",
            operationKind: "query",
            text: "query ExploreProgressRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...ExploreProgress_taskChecklist\n    id\n  }\n}\n\nfragment ExploreProgress_taskChecklist on TaskChecklist {\n  remaining {\n    pageInfo {\n      totalCount\n    }\n    id\n  }\n  completed {\n    pageInfo {\n      totalCount\n    }\n    id\n  }\n  id\n}\n",
          },
        };
      })();
      (t.hash = "edca727ffe7431edcbff6d00f0baedf1"), (n.default = t);
    },
    58262: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = (function () {
        var e = [
          {
            alias: null,
            args: null,
            concreteType: "PageInfo",
            kind: "LinkedField",
            name: "pageInfo",
            plural: !1,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "totalCount",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ];
        return {
          argumentDefinitions: [],
          kind: "Fragment",
          metadata: {
            refetch: {
              connection: null,
              fragmentPathInResult: ["node"],
              operation: a(23557),
              identifierField: "id",
            },
          },
          name: "ExploreProgress_taskChecklist",
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "TaskConnection",
              kind: "LinkedField",
              name: "remaining",
              plural: !1,
              selections: e,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "TaskConnection",
              kind: "LinkedField",
              name: "completed",
              plural: !1,
              selections: e,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          type: "TaskChecklist",
          abstractKey: null,
        };
      })();
      (t.hash = "edca727ffe7431edcbff6d00f0baedf1"), (n.default = t);
    },
    60102: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = (function () {
        var e = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          n = [
            {
              alias: null,
              args: null,
              concreteType: "PageInfo",
              kind: "LinkedField",
              name: "pageInfo",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "totalCount",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            e,
          ];
        return {
          fragment: {
            argumentDefinitions: [],
            kind: "Fragment",
            metadata: null,
            name: "HeaderProgressRingContainerQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "TaskChecklist",
                kind: "LinkedField",
                name: "tasks",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "HeaderProgressRing_checklistProgress",
                  },
                ],
                storageKey: null,
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: [],
            kind: "Operation",
            name: "HeaderProgressRingContainerQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "TaskChecklist",
                kind: "LinkedField",
                name: "tasks",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskConnection",
                    kind: "LinkedField",
                    name: "remaining",
                    plural: !1,
                    selections: n,
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskConnection",
                    kind: "LinkedField",
                    name: "completed",
                    plural: !1,
                    selections: n,
                    storageKey: null,
                  },
                  e,
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "e8b1a1ea64c9db9956d7d28029b9cbf8",
            id: null,
            metadata: {},
            name: "HeaderProgressRingContainerQuery",
            operationKind: "query",
            text: "query HeaderProgressRingContainerQuery {\n  tasks {\n    ...HeaderProgressRing_checklistProgress\n    id\n  }\n}\n\nfragment HeaderProgressRing_checklistProgress on TaskChecklist {\n  remaining {\n    pageInfo {\n      totalCount\n    }\n    id\n  }\n  completed {\n    pageInfo {\n      totalCount\n    }\n    id\n  }\n  id\n}\n",
          },
        };
      })();
      (t.hash = "9293472f0fdd5370aacffe486de180b4"), (n.default = t);
    },
    93743: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          n = [{ kind: "Variable", name: "id", variableName: "id" }],
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          t = [
            {
              alias: null,
              args: null,
              concreteType: "PageInfo",
              kind: "LinkedField",
              name: "pageInfo",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "totalCount",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            a,
          ];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "HeaderProgressRingRefetchQuery",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "HeaderProgressRing_checklistProgress",
                  },
                ],
                storageKey: null,
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "HeaderProgressRingRefetchQuery",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "__typename",
                    storageKey: null,
                  },
                  a,
                  {
                    kind: "InlineFragment",
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "remaining",
                        plural: !1,
                        selections: t,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "completed",
                        plural: !1,
                        selections: t,
                        storageKey: null,
                      },
                    ],
                    type: "TaskChecklist",
                    abstractKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "f94216669047ba844293901c440e0bf8",
            id: null,
            metadata: {},
            name: "HeaderProgressRingRefetchQuery",
            operationKind: "query",
            text: "query HeaderProgressRingRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...HeaderProgressRing_checklistProgress\n    id\n  }\n}\n\nfragment HeaderProgressRing_checklistProgress on TaskChecklist {\n  remaining {\n    pageInfo {\n      totalCount\n    }\n    id\n  }\n  completed {\n    pageInfo {\n      totalCount\n    }\n    id\n  }\n  id\n}\n",
          },
        };
      })();
      (t.hash = "09e5e564d9405cdfebed0ce3ad07ae12"), (n.default = t);
    },
    46065: function (e, n, a) {
      "use strict";
      a.r(n);
      var t = (function () {
        var e = [
          {
            alias: null,
            args: null,
            concreteType: "PageInfo",
            kind: "LinkedField",
            name: "pageInfo",
            plural: !1,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "totalCount",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ];
        return {
          argumentDefinitions: [],
          kind: "Fragment",
          metadata: {
            refetch: {
              connection: null,
              fragmentPathInResult: ["node"],
              operation: a(93743),
              identifierField: "id",
            },
          },
          name: "HeaderProgressRing_checklistProgress",
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "TaskConnection",
              kind: "LinkedField",
              name: "remaining",
              plural: !1,
              selections: e,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "TaskConnection",
              kind: "LinkedField",
              name: "completed",
              plural: !1,
              selections: e,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          type: "TaskChecklist",
          abstractKey: null,
        };
      })();
      (t.hash = "09e5e564d9405cdfebed0ce3ad07ae12"), (n.default = t);
    },
    34838: function (e, n, a) {
      "use strict";
      a.d(n, {
        Z: function () {
          return l;
        },
      });
      var t = a(15e3);
      function l() {
        var e = (0, t.IF)();
        return (
          (null === e || void 0 === e ? void 0 : e.roles.includes("admin")) ||
          !1
        );
      }
    },
    95832: function (e) {
      e.exports = {
        root: "Collapsible_root__tuLQv",
        icon: "Collapsible_icon__BIpWp",
        iconClosed: "Collapsible_iconClosed__WdXD0",
        iconOpen: "Collapsible_iconOpen__DXH7A",
        content: "Collapsible_content__UgtIP",
        openContent: "Collapsible_openContent__Tr0LX",
      };
    },
    24516: function (e) {
      e.exports = {
        root: "NewTag_root__eURlk",
        tag: "NewTag_tag__Ho2wj",
        arrow: "NewTag_arrow__2o_Qa",
      };
    },
    28090: function (e) {
      e.exports = { root: "ProgressRing_root__9sW4Q" };
    },
    77766: function (e) {
      e.exports = {
        root: "AccountHoverMenu_root___pzRe",
        leaguesMenuList: "AccountHoverMenu_leaguesMenuList__gikrN",
        darkMenuList: "AccountHoverMenu_darkMenuList__PEL0T",
        collapsibleHeader: "AccountHoverMenu_collapsibleHeader__Z8L4D",
        BetaIcon: "AccountHoverMenu_BetaIcon__36mBj",
        titleMenuListItem: "AccountHoverMenu_titleMenuListItem__TceJO",
        menuList: "AccountHoverMenu_menuList__3E6jA",
        logoutButton: "AccountHoverMenu_logoutButton__IWh9d",
        promo: "AccountHoverMenu_promo__JLOEl",
        badge: "AccountHoverMenu_badge__K_UXR",
        startIcon: "AccountHoverMenu_startIcon__k_JRv",
        chevron: "AccountHoverMenu_chevron__LEFzU",
        chevronIconOpen: "AccountHoverMenu_chevronIconOpen__oXDWR",
        chevronIconClosed: "AccountHoverMenu_chevronIconClosed__wtQvz",
        leagueIconSmall: "AccountHoverMenu_leagueIconSmall__wSurI",
        row: "AccountHoverMenu_row__KsKl2",
        alignBottom: "AccountHoverMenu_alignBottom__LJafU",
      };
    },
    64611: function (e) {
      e.exports = {
        root: "AnimatedBalance_root__sFdoX",
        diff: "AnimatedBalance_diff__ngCNv",
        cashout: "AnimatedBalance_cashout__5VHV1",
        payment: "AnimatedBalance_payment__csV3h",
        current: "AnimatedBalance_current__QOtdj",
        balanceWrapper: "AnimatedBalance_balanceWrapper__Q0qgG",
        oinq: "AnimatedBalance_oinq__qrH6N",
        coinWrapper: "AnimatedBalance_coinWrapper__6GrYI",
        coin: "AnimatedBalance_coin__5p72a",
        upBalance: "AnimatedBalance_upBalance__bLM0R",
        fallback: "AnimatedBalance_fallback__shAFv",
      };
    },
    91803: function (e) {
      e.exports = {
        checklistProgress: "HeaderProgressRing_checklistProgress__jrT1L",
      };
    },
    4935: function (e) {
      e.exports = {
        loggedInContainer: "LoggedInHeader_loggedInContainer__s09Rm",
        icon: "LoggedInHeader_icon__LipXP",
        navigationContainer: "LoggedInHeader_navigationContainer__C_GF5",
        hoverNav: "LoggedInHeader_hoverNav__3Lg3N",
        hoverNavContainer: "LoggedInHeader_hoverNavContainer__znrKC",
        promo: "LoggedInHeader_promo___zOn_",
      };
    },
    5998: function (e) {
      e.exports = { root: "NavigationItem_root__DGLTI" };
    },
  },
]);
//# sourceMappingURL=9601.64db53d5dad1634b.js.map
