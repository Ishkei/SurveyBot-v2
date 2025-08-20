(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8115],
  {
    98180: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/refer",
        function () {
          return a(52176);
        },
      ]);
    },
    4542: function (e, t, a) {
      "use strict";
      var s = a(85893),
        _ = a(86010),
        n = a(67294),
        r = a(11570),
        i = a.n(r),
        l = a(39414);
      function c(e, t, a) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = a),
          e
        );
      }
      function h(e, t) {
        if (null == e) return {};
        var a,
          s,
          _ = (function (e, t) {
            if (null == e) return {};
            var a,
              s,
              _ = {},
              n = Object.keys(e);
            for (s = 0; s < n.length; s++)
              (a = n[s]), t.indexOf(a) >= 0 || (_[a] = e[a]);
            return _;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          for (s = 0; s < n.length; s++)
            (a = n[s]),
              t.indexOf(a) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, a) &&
                  (_[a] = e[a]));
        }
        return _;
      }
      function d(e, t) {
        var a = e.className,
          n = e.children,
          r = e.component,
          d = e.interactive,
          o = h(e, ["className", "children", "component", "interactive"]),
          m = r || "div";
        return (0, s.jsx)(
          m,
          (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var a = null != arguments[t] ? arguments[t] : {},
                s = Object.keys(a);
              "function" === typeof Object.getOwnPropertySymbols &&
                (s = s.concat(
                  Object.getOwnPropertySymbols(a).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(a, e).enumerable;
                  })
                )),
                s.forEach(function (t) {
                  c(e, t, a[t]);
                });
            }
            return e;
          })(
            {
              className: (0, _.Z)(
                i().root,
                d || r === l.Z ? i().interactive : i().outlined,
                a
              ),
            },
            o,
            { ref: t, children: n }
          )
        );
      }
      t.Z = n.forwardRef(d);
    },
    58197: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return p;
        },
      });
      var s,
        _,
        n = a(85893),
        r = a(86010),
        i = a(67294),
        l = a(48556),
        c = a.n(l);
      function h() {
        return (
          (h = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var a = arguments[t];
                  for (var s in a)
                    Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
                }
                return e;
              }),
          h.apply(this, arguments)
        );
      }
      var d = function (e) {
        return i.createElement(
          "svg",
          h(
            {
              viewBox: "0 0 26 29",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          s ||
            (s = i.createElement("rect", {
              x: 2,
              y: 2,
              width: 16,
              height: 20,
              rx: 2,
              stroke: "currentColor",
              fill: "#FFF",
            })),
          _ ||
            (_ = i.createElement("rect", {
              x: 8,
              y: 7,
              width: 16,
              height: 20,
              rx: 2,
              stroke: "currentColor",
              fill: "#FFF",
            }))
        );
      };
      function o(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var a = 0, s = new Array(t); a < t; a++) s[a] = e[a];
        return s;
      }
      function m(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var a =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != a) {
              var s,
                _,
                n = [],
                r = !0,
                i = !1;
              try {
                for (
                  a = a.call(e);
                  !(r = (s = a.next()).done) &&
                  (n.push(s.value), !t || n.length !== t);
                  r = !0
                );
              } catch (l) {
                (i = !0), (_ = l);
              } finally {
                try {
                  r || null == a.return || a.return();
                } finally {
                  if (i) throw _;
                }
              }
              return n;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return o(e, t);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return o(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var p = function (e) {
        var t = e.value,
          a = e.className,
          s = e.onClick,
          _ = m(i.useState(t), 2),
          l = _[0],
          h = _[1];
        return (0, n.jsxs)("button", {
          type: "button",
          className: a ? (0, r.Z)(c().root, a) : c().root,
          onClick: function () {
            navigator.clipboard.writeText(t),
              setTimeout(function () {
                h(t);
              }, 1500),
              h("Copied to clipboard!"),
              s && s();
          },
          children: [
            (0, n.jsx)("span", { className: c().text, children: l }),
            (0, n.jsx)("div", {
              className: c().iconContainer,
              children: (0, n.jsx)(d, { className: c().icon }),
            }),
          ],
        });
      };
    },
    44824: function (e, t, a) {
      "use strict";
      var s = a(85893),
        _ = (a(67294), a(86010)),
        n = a(87794),
        r = a(31636),
        i = a.n(r),
        l = n.Z;
      t.Z = function (e) {
        var t = e.className,
          a = e.children;
        return e.animate
          ? (0, s.jsx)(l, {
              typeName: "ul",
              className: (0, _.Z)(i().root, t),
              children: a,
            })
          : (0, s.jsx)("ul", { className: (0, _.Z)(i().root, t), children: a });
      };
    },
    46542: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = (function () {
        var e = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "inviteType",
            storageKey: null,
          },
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "label",
            storageKey: null,
          },
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "token",
            storageKey: null,
          },
          s = {
            alias: null,
            args: null,
            concreteType: "Currency",
            kind: "LinkedField",
            name: "currency",
            plural: !1,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "currencySymbol",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          _ = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          };
        return {
          fragment: {
            argumentDefinitions: [],
            kind: "Fragment",
            metadata: null,
            name: "ReferralInvitesQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "ReferralInviteConnection",
                kind: "LinkedField",
                name: "referralInvites",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "ReferralInviteEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "ReferralInvite",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [e, t, a],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "UserData",
                kind: "LinkedField",
                name: "userData",
                plural: !1,
                selections: [s],
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
            name: "ReferralInvitesQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "ReferralInviteConnection",
                kind: "LinkedField",
                name: "referralInvites",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "ReferralInviteEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "ReferralInvite",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [e, t, a, _],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "UserData",
                kind: "LinkedField",
                name: "userData",
                plural: !1,
                selections: [s, _],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "d5a15f28b953618fd7a2f4b511effab0",
            id: null,
            metadata: {},
            name: "ReferralInvitesQuery",
            operationKind: "query",
            text: "query ReferralInvitesQuery {\n  referralInvites {\n    edges {\n      node {\n        inviteType\n        label\n        token\n        id\n      }\n    }\n  }\n  userData {\n    currency {\n      currencySymbol\n    }\n    id\n  }\n}\n",
          },
        };
      })();
      (s.hash = "eb37e9408363138ab4e25261029cf945"), (t.default = s);
    },
    52176: function (e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, {
          default: function () {
            return He;
          },
        });
      var s,
        _,
        n,
        r,
        i,
        l,
        c,
        h,
        d,
        o,
        m,
        p,
        g,
        v,
        f,
        O,
        q,
        E,
        u,
        M,
        y,
        k,
        P = a(85893),
        N = a(22578),
        Z = a(67294),
        z = a(40668),
        b = a.n(z),
        x = a(20298),
        C = a(39414);
      function w() {
        return (
          (w = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var a = arguments[t];
                  for (var s in a)
                    Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
                }
                return e;
              }),
          w.apply(this, arguments)
        );
      }
      var B,
        j,
        S,
        F,
        D,
        A,
        I,
        T,
        G,
        R,
        L,
        K,
        U,
        Q,
        V,
        W,
        Y,
        H,
        X,
        J,
        $,
        ee,
        te,
        ae,
        se,
        _e,
        ne,
        re,
        ie,
        le,
        ce,
        he,
        de,
        oe,
        me,
        pe,
        ge,
        ve;
      function fe() {
        return (
          (fe = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var a = arguments[t];
                  for (var s in a)
                    Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
                }
                return e;
              }),
          fe.apply(this, arguments)
        );
      }
      var Oe, qe, Ee, ue, Me, ye, ke, Pe, Ne, Ze, ze, be, xe, Ce, we, Be, je;
      function Se() {
        return (
          (Se = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var a = arguments[t];
                  for (var s in a)
                    Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
                }
                return e;
              }),
          Se.apply(this, arguments)
        );
      }
      var Fe,
        De,
        Ae = [
          {
            inviteType: "qmee_none",
            title: "Keep %1s;",
            titleValue: function (e) {
              return "".concat(e, "1");
            },
            description:
              "You'll keep 100% of the reward - go on, you deserve it!",
            image: function (e) {
              return Z.createElement(
                "svg",
                w(
                  {
                    id: "Oinq_keep_svg__Layer_1",
                    xmlns: "http://www.w3.org/2000/svg",
                    x: 0,
                    y: 0,
                    viewBox: "0 0 174.23 127.03",
                    style: { enableBackground: "new 0 0 174.23 127.03" },
                    xmlSpace: "preserve",
                  },
                  e
                ),
                s ||
                  (s = Z.createElement(
                    "style",
                    null,
                    ".Oinq_keep_svg__st0{fill:#4db96e}.Oinq_keep_svg__st1{fill:#242929}.Oinq_keep_svg__st2{fill:#a6d7b7}.Oinq_keep_svg__st3{fill:#4b5a6b}.Oinq_keep_svg__st4{fill:#7e8390}.Oinq_keep_svg__st5{fill:#3b9f60}.Oinq_keep_svg__st6{fill:#6fc282}.Oinq_keep_svg__st8{fill:#fff}.Oinq_keep_svg__st9{fill:#191919}"
                  )),
                Z.createElement(
                  "g",
                  {
                    id: "Oinq_keep_svg__Oinq_keep",
                    transform: "translate(-438.709 -858.652)",
                  },
                  Z.createElement(
                    "g",
                    {
                      id: "Oinq_keep_svg__Oinq_share",
                      transform: "translate(10716.762 4434.651)",
                    },
                    _ ||
                      (_ = Z.createElement(
                        "g",
                        {
                          id: "Oinq_keep_svg__Group_2552",
                          transform: "rotate(-7 -33919.14 82170.487)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5032",
                          className: "Oinq_keep_svg__st0",
                          d: "M20.73 24.45s-12.49-8.81-19.04-10c0 0-4.49-3.07-.22-5.98C.21 3.29 5.5 2.6 10.72 3.13s31.93 9.67 34.93 16.06-8.14 14.47-8.14 14.47-2.98 1.77-16.78-9.21z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5033",
                          className: "Oinq_keep_svg__st0",
                          d: "M20.73 24.45s-12.49-8.81-19.04-10c0 0-4.49-3.07-.22-5.98C.21 3.29 5.5 2.6 10.72 3.13c1.31.19 2.61.47 3.88.85-2.6 4.35-3.56 8.86.6 11.65 4.98 3.4 12.7-.39 18.56-4.59 5.81 2.68 10.7 5.64 11.89 8.16 3 6.37-8.14 14.47-8.14 14.47s-2.98 1.76-16.78-9.22z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5034",
                          className: "Oinq_keep_svg__st1",
                          d: "M15.39 4.2c-1.53-.47-3.09-.83-4.67-1.07C5.5 2.6.21 3.29 1.48 8.47c-4.27 2.93.22 5.98.22 5.98 2.66.65 5.21 1.66 7.6 2.99.62-4.93 2.75-9.55 6.09-13.24z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5035",
                          className: "Oinq_keep_svg__st2",
                          d: "M14.84 8.33s.29-2.24 1.66-2.56 9.75 2.42 11.02 3.87-4.16 2.43-7.73 1.73-4.84-1.73-4.95-3.04z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5036",
                          className: "Oinq_keep_svg__st3",
                          d: "M2.43 13.82s-1.63-.67-2-1.89S1.44 9.66 3.38 9.6c-1.13-.95-.53-2.88 2.13-3.68s4.94 1.6 4.04 4.99-1.54 5.17-3.17 4.5c-1.62-.67-3.95-1.59-3.95-1.59z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5037",
                          className: "Oinq_keep_svg__st4",
                          d: "M3.29 13.89s-1.82-.44-2.32-1.46.96-2.06 2.56-.9 1.25 2.77-.24 2.36z",
                        })
                      )),
                    n ||
                      (n = Z.createElement(
                        "g",
                        {
                          id: "Oinq_keep_svg__Group_2554",
                          transform: "translate(-10143.333 -3545.259)",
                        },
                        Z.createElement(
                          "g",
                          { id: "Oinq_keep_svg__Group_2553" },
                          Z.createElement("path", {
                            id: "Oinq_keep_svg__Path_5038",
                            className: "Oinq_keep_svg__st5",
                            d: "M14.8 15.49S27.37 8.77 31.23 3.6c0 0 4.45-2.46 4.85 2.69 4.69 1.37 2.88 6.34.12 10.67S14.26 40.3 7.87 39.87 0 25.78 0 25.78s-.07-3.46 14.8-10.29z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_keep_svg__Path_5039",
                            className: "Oinq_keep_svg__st5",
                            d: "M14.8 15.49S27.37 8.77 31.23 3.6c0 0 4.45-2.46 4.85 2.69 4.69 1.37 2.88 6.34.12 10.67-.73 1.06-1.53 2.06-2.4 3-2.3-4.36-5.45-7.37-9.52-5.07-4.92 2.73-5.35 11.32-4.63 18.48-4.72 3.8-9.25 6.68-11.78 6.51C1.47 39.44 0 25.79 0 25.79s-.07-3.47 14.8-10.3z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_keep_svg__Path_5040",
                            className: "Oinq_keep_svg__st1",
                            d: "M33.27 20.54c1.06-1.12 2.04-2.32 2.93-3.59 2.75-4.32 4.56-9.29-.12-10.67-.4-5.15-4.85-2.69-4.85-2.69-1.67 2-3.62 3.76-5.77 5.23 3.72 3.03 6.44 7.12 7.81 11.72z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_keep_svg__Path_5041",
                            className: "Oinq_keep_svg__st3",
                            d: "M31.41 4.54c.65-.59 1.51-.89 2.39-.84 1.13.26 1.36 1.97.54 3.7 1.26-.53 2.53.93 1.98 3.64s-3.47 3.57-5.76 1.15-3.42-3.83-2.16-4.94 3.01-2.71 3.01-2.71z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_keep_svg__Path_5042",
                            className: "Oinq_keep_svg__st4",
                            d: "M30.97 5.27s1.17-1.39 2.2-1.34 1.21 1.85-.43 2.69-2.77-.24-1.77-1.35z",
                          })
                        )
                      )),
                    r ||
                      (r = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5043",
                        className: "Oinq_keep_svg__st5",
                        d: "M-10126.2-3473.54c-.42-.34-.8-.72-1.15-1.13-.45-.49-.79-.92-1.03-1.22 3.91-.91 6.49-6.67 3.88-9.65-1.2-1.38-1.55-1.53-3.34-1.56-1.81 0-3.38 1.26-3.78 3.02-.58 2-.46 4.13.35 6.05-2.99-.01-4.63-1.8-6.39-4.19a18.97 18.97 0 0 1-2.34-3.79l-.29.21c-.83.6-1.83.91-2.86.9 2.26 4.22 5.89 7.99 10.34 8.84.75.2 1.52.32 2.3.36.17.01.34.01.51 0a6.078 6.078 0 0 0 2.65 3.03c2.14 1.15 5.01.06 5.01.08-.39.11-.8.15-1.2.12-.98-.08-1.9-.46-2.66-1.07zm-2.32-4.86c-1.05-.28-1.53-1.92-1.07-3.65.46-1.74 1.69-2.92 2.74-2.65 1.05.28 1.53 1.92 1.07 3.65s-1.69 2.93-2.74 2.65z",
                      })),
                    i ||
                      (i = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5044",
                        className: "Oinq_keep_svg__st0",
                        d: "M-10138.18-3543.78c4.73-6.42 11.37-23.82-.72-23.6-10.28.19-20.15 5.37-23.26 7.14-12.51-3.68-24.72-3.32-26.18-3.04-8.79-.62-17.62.52-25.97 3.33-2.4-1.43-12.85-7.23-23.76-7.43-12.4-.23-5.07 18.12-.34 24.09-1.38 1.76-2.65 3.6-3.8 5.52-17.47 29.15-4.96 72.12 30.79 83.59 14.21 4.55 59.7 8.6 75.2-19.58 11.97-21.8 7.17-54.88-1.96-70.02z",
                      })),
                    l ||
                      (l = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5045",
                        className: "Oinq_keep_svg__st5",
                        d: "M-10138.18-3543.78c4.3-5.85 10.2-20.78 2.1-23.26 6.14 4.68-1.05 18.27-5.3 16.51-3.6-1.26-11.92-7.09-18.67-10.85-.86.44-1.58.84-2.09 1.14h-.04c7.05 4.19 18.1 10.67 20.47 17.27 8.83 24.67 9.54 47.03-4.9 68.46-9.16 13.58-27.98 17.73-42.2 18.88a80.212 80.212 0 0 1-34.67-4.1c3.79 2.33 7.84 4.19 12.08 5.54 14.21 4.55 59.7 8.6 75.2-19.59 11.95-21.78 7.15-54.86-1.98-70z",
                      })),
                    c ||
                      (c = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5046",
                        className: "Oinq_keep_svg__st6",
                        d: "M-10208.18-3559.34s-31.08 10.07-36.97 32.22c-4.91 18.38 2.62 44.8 19.3 56.38 16.68 11.58 53.62 9.56 65.76-2.38 15.51-15.25 7.4-28.37-3.39-28.93 0 0-13.95-6.09-19.18-.04-2.62 3.78-14.2 22.39-15.18 16.35-18.66 11.43-32.42 1.19-20.2-16.53-5.26 1.62 5.07-17.41 17.25-27.09 15.15-12.03 39.12-3.54 48.46 13.65 7.06 12.98 10.47-28.13-5.23-36.18s-33.93-9.96-50.62-7.45z",
                      })),
                    h ||
                      (h = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5047",
                        className: "Oinq_keep_svg__st6",
                        d: "M-10153.86-3554.5s10.07 6.81 11.55 9.47c2.36-.3 5.92-10.66 5.33-14.21-.59-3.55-10.65-2.65-16.88 4.74z",
                      })),
                    d ||
                      (d = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5048",
                        className: "Oinq_keep_svg__st6",
                        d: "M-10220.69-3551.88s-10.07 6.81-11.55 9.47c-2.37-.29-5.92-10.66-5.31-14.21.61-3.54 10.64-2.66 16.86 4.74z",
                      })),
                    o ||
                      (o = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5049",
                        className: "Oinq_keep_svg__st5",
                        d: "M-10136.98-3559.23c-.05-.27-.16-.53-.31-.76-.16-.23-.36-.42-.6-.56-.34 3.6-1.13 9.2-4.66 9.84-3.31.74-7.69-2.62-10.59-4.6-.25.26-.49.53-.72.82 0 0 10.07 6.81 11.55 9.47 2.37-.29 5.92-10.66 5.33-14.21z",
                      })),
                    m ||
                      (m = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5050",
                        className: "Oinq_keep_svg__st2",
                        d: "M-10233-3538.93s-10.14 11.11-12.11 24.54 4.25 7.85 8.83-6.22 10.14-21.27 11.78-24.54-4.58 1.64-8.5 6.22z",
                      })),
                    Z.createElement(
                      "linearGradient",
                      {
                        id: "Oinq_keep_svg__Path_5051_00000088132545428027588780000014080439777909175948_",
                        gradientUnits: "userSpaceOnUse",
                        x1: -10439.534,
                        y1: -2850.927,
                        x2: -10439.534,
                        y2: -2851.927,
                        gradientTransform:
                          "matrix(4.3733 0 0 -8.0122 35466.297 -28473.701)",
                      },
                      Z.createElement("stop", {
                        offset: 0,
                        style: { stopColor: "#242929" },
                      }),
                      Z.createElement("stop", {
                        offset: 1,
                        style: { stopColor: "#242929" },
                      })
                    ),
                    Z.createElement("path", {
                      id: "Oinq_keep_svg__Path_5051",
                      style: {
                        fill: "url(#Oinq_keep_svg__Path_5051_00000088132545428027588780000014080439777909175948_)",
                      },
                      d: "M-10186.65-3563.42c-.56.01-1.12.07-1.68.17 0 0-.97-.14-2.68-.2v6.33a1.307 1.307 0 0 0 .45.98c.49.45 1.13.7 1.8.69.67 0 1.3-.26 1.79-.72.11-.11.2-.25.25-.39.06-.15.08-.3.08-.46l-.01-6.4z",
                    }),
                    p ||
                      (p = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5052",
                        className: "Oinq_keep_svg__st5",
                        d: "M-10161.62-3565.35a.985.985 0 0 1-.53-.12c-.21-.11-.4-.25-.56-.41-7.79-7.89-11.48-3.5-11.63-3.32a.47.47 0 0 1-.27.16c-.12.02-.25.02-.38-.02-.32-.11-.61-.3-.83-.56a2.35 2.35 0 0 1-.54-.93.86.86 0 0 1 .07-.75c.05-.06 4.83-5.74 14.48 4.04.25.25.44.56.55.89.1.25.09.52-.02.76-.07.14-.2.23-.34.26z",
                      })),
                    g ||
                      (g = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5053",
                        className: "Oinq_keep_svg__st5",
                        d: "M-10215.94-3561.78a.479.479 0 0 1-.38-.11.558.558 0 0 1-.1-.58c.09-.29.25-.55.46-.76 8.73-8.81 14.11-5.16 14.16-5.12.08.06.13.14.16.23.03.11.03.22 0 .33-.03.14-.09.27-.16.39-.08.14-.18.27-.29.39-.11.12-.24.23-.38.33-.13.09-.26.16-.41.22-.12.05-.25.07-.38.07-.1 0-.2-.03-.29-.08-.18-.12-4.36-2.9-11.37 4.17-.15.15-.33.28-.52.38-.15.08-.33.13-.5.14z",
                      })),
                    v ||
                      (v = Z.createElement("ellipse", {
                        id: "Oinq_keep_svg__Ellipse_189",
                        className: "Oinq_keep_svg__st8",
                        cx: -10176.18,
                        cy: -3545.7,
                        rx: 10.35,
                        ry: 12.92,
                      })),
                    f ||
                      (f = Z.createElement("ellipse", {
                        id: "Oinq_keep_svg__Ellipse_190",
                        className: "Oinq_keep_svg__st8",
                        cx: -10201.31,
                        cy: -3545.39,
                        rx: 10.43,
                        ry: 14.44,
                      })),
                    O ||
                      (O = Z.createElement(
                        "g",
                        {
                          id: "Oinq_keep_svg__Group_2555",
                          transform: "translate(-10184.507 -3549.575)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5054",
                          className: "Oinq_keep_svg__st9",
                          d: "M4.31 11.63a4.31 4.31 0 0 0 0-8.62 4.31 4.31 0 0 0 0 8.62z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5055",
                          className: "Oinq_keep_svg__st1",
                          d: "M7.48 4.39c.42 1.74.5 4.99-3.52 7.22.87.07 1.73-.12 2.49-.55.75-.43 1.36-1.08 1.74-1.86.38-.78.51-1.66.39-2.51-.13-.86-.51-1.66-1.1-2.3z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5056",
                          className: "Oinq_keep_svg__st8",
                          d: "M3.77 6.49a.939.939 0 1 0 0-1.88c-.52 0-.94.42-.94.94.01.52.43.94.94.94z",
                        })
                      )),
                    q ||
                      (q = Z.createElement(
                        "g",
                        {
                          id: "Oinq_keep_svg__Group_2556",
                          transform: "translate(-10202.667 -3549.938)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5057",
                          className: "Oinq_keep_svg__st9",
                          d: "M4.52 12.06c2.5 0 4.52-2.02 4.52-4.52 0-2.5-2.03-4.52-4.52-4.52A4.5 4.5 0 0 0 0 7.53c0 2.5 2.02 4.53 4.52 4.53z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5058",
                          className: "Oinq_keep_svg__st1",
                          d: "M7.84 4.46c.44 1.83.53 5.23-3.69 7.57.91.08 1.82-.12 2.61-.57.79-.45 1.43-1.13 1.83-1.95a4.507 4.507 0 0 0-.75-5.05z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5059",
                          className: "Oinq_keep_svg__st8",
                          d: "M3.96 6.67c.54 0 .98-.44.98-.98s-.44-.98-.98-.98-.98.44-.98.98.44.98.98.98z",
                        })
                      )),
                    E ||
                      (E = Z.createElement(
                        "g",
                        {
                          id: "Oinq_keep_svg__Group_2557",
                          transform: "translate(-10216.349 -3538.761)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5060",
                          className: "Oinq_keep_svg__st5",
                          d: "M20.92 3.96S8.35 5.62 2.13 16.99c-4.41 7.93-2.48 20.38 10.51 19.95s20.22.49 27.17 3.1 17.5 2.06 20.03-3.87 3.23-15.64-4.17-22.94S36.52.79 20.92 3.96z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5061",
                          className: "Oinq_keep_svg__st0",
                          d: "M3.25 22.05S.97 32.36 10.82 34.01s15.93-1 31.76 3.62 17.9-6.02 15.94-14.51S45.84 6.36 33.11 5.08 7.18 8.63 3.25 22.05z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5062",
                          className: "Oinq_keep_svg__st5",
                          d: "M18.14 22.21a4.031 4.031 0 0 1-4.36 3.62 4.029 4.029 0 0 1-2.94-4.84c.39-2.34 2.34-3.96 4.36-3.62 2.13.53 3.45 2.69 2.94 4.84z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5063",
                          className: "Oinq_keep_svg__st1",
                          d: "M19.19 23.57a4.031 4.031 0 0 1-4.36 3.62c-2.01-.33-3.33-2.5-2.94-4.84.21-2.2 2.16-3.81 4.36-3.62 2.01.33 3.33 2.5 2.94 4.84z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5064",
                          className: "Oinq_keep_svg__st5",
                          d: "M50.42 26.14c-.39 2.34-2.36 3.96-4.36 3.62a4.042 4.042 0 0 1-2.94-4.84c.39-2.34 2.34-3.96 4.36-3.62 2.14.54 3.45 2.7 2.94 4.84z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5065",
                          className: "Oinq_keep_svg__st1",
                          d: "M51.48 27.52a4.031 4.031 0 0 1-4.36 3.62c-2.02-.34-3.33-2.5-2.94-4.84.21-2.2 2.16-3.81 4.36-3.62 2.14.52 3.45 2.69 2.94 4.84z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_keep_svg__Path_5066",
                          className: "Oinq_keep_svg__st2",
                          d: "M33.77 6.42s-9.38-1.57-12.41 1.66c-.57 1.46 3.98 4.09 9.44 3.12s6.7-4.78 2.97-4.78z",
                        })
                      )),
                    u ||
                      (u = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5067",
                        d: "m-10216.46-3485.91 51.66-7.46s16.34 16.83-1.06 24.33c-17.39 7.51-45.75-6.45-50.6-16.87z",
                      })),
                    M ||
                      (M = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5068",
                        className: "Oinq_keep_svg__st8",
                        d: "M-10216.46-3485.91s32.16 4.56 46.34 1.94l.69-1.44.85 1.11c1.35-.28 2.64-.82 3.78-1.6v-7.46l-51.66 7.45z",
                      })),
                    Z.createElement("path", {
                      id: "Oinq_keep_svg__Path_5069",
                      d: "M-10197.69-3471.64s15.37-10.11 35.99-.42c-.01.01-11.95 11.3-35.99.42z",
                      style: { fill: "#e41f5c" },
                    }),
                    y ||
                      (y = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5070",
                        className: "Oinq_keep_svg__st5",
                        d: "M-10190.39-3564.01s-.66 7.42.31 8.37-2.44-.22-2.44-.22l-1.61-5.73.87-2.81 2.87.39z",
                      })),
                    k ||
                      (k = Z.createElement("path", {
                        id: "Oinq_keep_svg__Path_5071",
                        className: "Oinq_keep_svg__st5",
                        d: "M-10185.8-3563.67s-.84 7.08-1.81 8.03 2.44-.22 2.44-.22l1.61-5.73-.87-2.81-1.37.73z",
                      }))
                  )
                )
              );
            },
          },
          {
            inviteType: "qmee_equal_split",
            title: "Keep %1s;, Give %1s;",
            titleValue: function (e) {
              return "".concat(e, "0.50");
            },
            description:
              "Share the reward equally with your friend - %1s; for each of you, yay!",
            descriptionValue: function (e) {
              return "".concat(e, "0.50");
            },
            image: function (e) {
              return Z.createElement(
                "svg",
                fe(
                  {
                    id: "Oinq_share_svg__Layer_1",
                    xmlns: "http://www.w3.org/2000/svg",
                    x: 0,
                    y: 0,
                    viewBox: "0 0 263.57 122.39",
                    style: { enableBackground: "new 0 0 263.57 122.39" },
                    xmlSpace: "preserve",
                  },
                  e
                ),
                B ||
                  (B = Z.createElement(
                    "style",
                    null,
                    ".Oinq_share_svg__st0{fill:#4db96e}.Oinq_share_svg__st1{fill:#242929}.Oinq_share_svg__st2{fill:#a6d7b7}.Oinq_share_svg__st3{fill:#4b5a6b}.Oinq_share_svg__st4{fill:#7e8390}.Oinq_share_svg__st5{fill:#3b9f60}.Oinq_share_svg__st6{fill:#6fc282}.Oinq_share_svg__st8{fill:#fff}.Oinq_share_svg__st9{fill:#191919}.Oinq_share_svg__st11{fill:#ad6a27}.Oinq_share_svg__st13{fill:#d08e4d}.Oinq_share_svg__st14{opacity:.23;fill:#fff;enable-background:new}.Oinq_share_svg__st16{fill:#dba876}"
                  )),
                Z.createElement(
                  "g",
                  {
                    id: "Oinq_share_svg__Oinq_share",
                    transform: "translate(-795.942 -874.469)",
                  },
                  Z.createElement(
                    "g",
                    {
                      id: "Oinq_share_svg__Oinq_friend_share",
                      transform: "translate(803.379 874.469)",
                    },
                    j ||
                      (j = Z.createElement(
                        "g",
                        {
                          id: "Oinq_share_svg__Group_2552",
                          transform: "rotate(-7 448.021 -719.704)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5032",
                          className: "Oinq_share_svg__st0",
                          d: "M15.72 22.67S3.74 14.22-2.54 13.08c0 0-4.31-2.95-.21-5.74-1.21-4.96 3.86-5.63 8.86-5.12s30.63 9.28 33.5 15.4-7.8 13.88-7.8 13.88-2.85 1.69-16.09-8.83z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5033",
                          className: "Oinq_share_svg__st0",
                          d: "M15.72 22.67S3.74 14.22-2.54 13.08c0 0-4.31-2.95-.21-5.74-1.21-4.96 3.86-5.63 8.86-5.12 1.26.18 2.5.45 3.72.81-2.49 4.17-3.41 8.5.57 11.17 4.77 3.26 12.19-.38 17.81-4.4 5.57 2.57 10.27 5.4 11.4 7.82 2.88 6.11-7.8 13.88-7.8 13.88s-2.85 1.69-16.09-8.83z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5034",
                          className: "Oinq_share_svg__st1",
                          d: "M10.6 3.24c-1.47-.45-2.97-.8-4.48-1.02-5-.51-10.08.16-8.86 5.12-4.09 2.81.21 5.74.21 5.74 2.55.62 5 1.59 7.29 2.87.59-4.74 2.63-9.17 5.84-12.71z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5035",
                          className: "Oinq_share_svg__st2",
                          d: "M10.07 7.2s.28-2.14 1.59-2.45 9.35 2.32 10.57 3.71c1.22 1.39-3.99 2.33-7.42 1.66s-4.64-1.66-4.74-2.92z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5036",
                          className: "Oinq_share_svg__st3",
                          d: "M-1.84 12.47s-1.56-.64-1.92-1.81.97-2.18 2.83-2.23c-1.07-.92-.5-2.78 2.06-3.54S5.86 6.42 5 9.67s-1.48 4.96-3.04 4.31-3.8-1.51-3.8-1.51z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5037",
                          className: "Oinq_share_svg__st4",
                          d: "M-1.01 12.54s-1.75-.43-2.23-1.4.92-1.98 2.46-.87 1.2 2.66-.23 2.27z",
                        })
                      )),
                    S ||
                      (S = Z.createElement(
                        "g",
                        {
                          id: "Oinq_share_svg__Group_2554",
                          transform: "translate(220.372 29.487)",
                        },
                        Z.createElement(
                          "g",
                          { id: "Oinq_share_svg__Group_2553" },
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5038",
                            className: "Oinq_share_svg__st5",
                            d: "M9.97 14.58S22.03 8.13 25.73 3.17c0 0 4.26-2.36 4.65 2.58 4.49 1.32 2.76 6.08.12 10.23S9.45 38.38 3.32 37.96s-7.55-13.51-7.55-13.51-.07-3.32 14.2-9.87z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5039",
                            className: "Oinq_share_svg__st5",
                            d: "M9.97 14.58S22.03 8.13 25.73 3.17c0 0 4.26-2.36 4.65 2.58 4.49 1.32 2.76 6.08.12 10.23-.7 1.01-1.47 1.97-2.3 2.87-2.21-4.19-5.23-7.07-9.13-4.86-4.72 2.62-5.13 10.86-4.44 17.73-4.53 3.65-8.88 6.41-11.3 6.24-6.14-.41-7.55-13.51-7.55-13.51s-.08-3.32 14.19-9.87z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5040",
                            className: "Oinq_share_svg__st1",
                            d: "M27.68 19.42c1.02-1.08 1.96-2.23 2.81-3.44 2.64-4.15 4.38-8.92-.12-10.23-.39-4.94-4.65-2.58-4.65-2.58a27.468 27.468 0 0 1-5.53 5.02 22.9 22.9 0 0 1 7.49 11.23z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5041",
                            className: "Oinq_share_svg__st3",
                            d: "M25.9 4.08a3.17 3.17 0 0 1 2.29-.81c1.08.25 1.3 1.89.51 3.55 1.21-.5 2.43.89 1.9 3.5s-3.33 3.42-5.53 1.1S21.79 7.74 23 6.68s2.9-2.6 2.9-2.6z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5042",
                            className: "Oinq_share_svg__st4",
                            d: "M25.47 4.78s1.12-1.33 2.11-1.28 1.16 1.77-.41 2.58-2.66-.24-1.7-1.3z",
                          })
                        )
                      )),
                    F ||
                      (F = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5043",
                        className: "Oinq_share_svg__st5",
                        d: "M232.58 98.01c-.4-.33-.77-.69-1.11-1.08-.43-.47-.76-.88-.98-1.17 3.75-.87 6.23-6.4 3.72-9.26a3.226 3.226 0 0 0-3.21-1.49c-1.74 0-3.24 1.21-3.63 2.9-.56 1.91-.44 3.96.33 5.8-2.87-.01-4.43-1.72-6.13-4.02-.89-1.12-1.64-2.34-2.25-3.63l-.28.2c-.8.58-1.76.88-2.74.86 2.17 4.05 5.65 7.66 9.91 8.48.72.19 1.46.31 2.2.34.16.01.33.01.49.01a5.866 5.866 0 0 0 2.54 2.91c2.05 1.11 4.8.06 4.81.08-.37.11-.77.14-1.15.11-.91-.09-1.8-.46-2.52-1.04zm-2.24-4.67c-1.01-.27-1.47-1.84-1.03-3.5.44-1.66 1.62-2.81 2.63-2.54 1.01.27 1.47 1.84 1.03 3.5s-1.61 2.81-2.63 2.54z",
                      })),
                    D ||
                      (D = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5044",
                        className: "Oinq_share_svg__st0",
                        d: "M221.08 30.63c4.54-6.16 10.91-22.85-.69-22.64-9.86.18-19.33 5.16-22.31 6.85-12-3.53-23.71-3.19-25.11-2.92-8.43-.59-16.9.5-24.91 3.2-2.3-1.37-12.33-6.94-22.79-7.13-11.9-.22-4.87 17.38-.32 23.11a49.11 49.11 0 0 0-3.64 5.29c-16.76 27.96-4.75 69.18 29.53 80.18 13.63 4.37 57.26 8.25 72.13-18.79 11.48-20.89 6.87-52.63-1.89-67.15z",
                      })),
                    A ||
                      (A = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5045",
                        className: "Oinq_share_svg__st5",
                        d: "M221.08 30.63c4.12-5.61 9.78-19.93 2.01-22.31 5.89 4.49-1.01 17.53-5.09 15.83-3.45-1.21-11.44-6.8-17.91-10.41-.83.43-1.51.8-2.01 1.09h-.03c6.77 4.02 17.36 10.24 19.63 16.57 8.47 23.66 9.15 45.11-4.7 65.67-8.79 13.03-26.83 17.01-40.48 18.11a76.875 76.875 0 0 1-33.26-3.94c3.63 2.24 7.52 4.02 11.58 5.31 13.63 4.37 57.26 8.25 72.13-18.79 11.5-20.87 6.89-52.61-1.87-67.13z",
                      })),
                    I ||
                      (I = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5046",
                        className: "Oinq_share_svg__st6",
                        d: "M153.95 15.71s-29.81 9.66-35.46 30.9C113.78 64.23 121 89.58 137 100.69s51.44 9.17 63.08-2.28c14.88-14.63 7.1-27.22-3.25-27.75 0 0-13.38-5.84-18.4-.03-2.51 3.62-13.62 21.48-14.56 15.68-17.9 10.96-31.1 1.14-19.38-15.86-5.05 1.55 4.87-16.7 16.55-25.98 14.53-11.54 37.52-3.4 46.48 13.1 6.77 12.45 10.04-26.98-5.02-34.71s-32.55-9.57-48.55-7.15z",
                      })),
                    T ||
                      (T = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5047",
                        className: "Oinq_share_svg__st6",
                        d: "M206.05 20.35s9.66 6.53 11.08 9.08c2.27-.28 5.68-10.22 5.11-13.63s-10.22-2.54-16.19 4.55z",
                      })),
                    G ||
                      (G = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5048",
                        className: "Oinq_share_svg__st6",
                        d: "M141.94 22.86s-9.66 6.53-11.07 9.08c-2.27-.28-5.68-10.23-5.1-13.63s10.2-2.54 16.17 4.55z",
                      })),
                    R ||
                      (R = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5049",
                        className: "Oinq_share_svg__st5",
                        d: "M222.23 15.81c-.05-.26-.15-.51-.3-.73-.15-.22-.34-.4-.57-.54-.32 3.46-1.09 8.82-4.47 9.44-3.18.71-7.38-2.51-10.16-4.41-.24.25-.47.51-.69.78 0 0 9.66 6.53 11.08 9.08 2.27-.27 5.68-10.21 5.11-13.62z",
                      })),
                    L ||
                      (L = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5050",
                        className: "Oinq_share_svg__st2",
                        d: "M130.13 35.28s-9.73 10.65-11.61 23.54 4.08 7.53 8.47-5.96c4.4-13.49 9.73-20.4 11.29-23.54s-4.38 1.57-8.15 5.96z",
                      })),
                    Z.createElement(
                      "linearGradient",
                      {
                        id: "Oinq_share_svg__Path_5051_00000086684271889832424470000018055668612223571893_",
                        gradientUnits: "userSpaceOnUse",
                        x1: -136.031,
                        y1: 713.861,
                        x2: -136.031,
                        y2: 712.861,
                        gradientTransform:
                          "matrix(4.1904 0 0 -7.687 742.533 3515.122)",
                      },
                      Z.createElement("stop", {
                        offset: 0,
                        style: { stopColor: "#242929" },
                      }),
                      Z.createElement("stop", {
                        offset: 1,
                        style: { stopColor: "#242929" },
                      })
                    ),
                    Z.createElement("path", {
                      id: "Oinq_share_svg__Path_5051",
                      style: {
                        fill: "url(#Oinq_share_svg__Path_5051_00000086684271889832424470000018055668612223571893_)",
                      },
                      d: "M174.59 11.79c-.54.01-1.08.07-1.61.16 0 0-.93-.13-2.57-.19v6.08c0 .18.04.36.11.52.08.16.18.31.32.43.47.43 1.08.67 1.72.67.64 0 1.25-.25 1.71-.69.11-.11.19-.24.25-.38.05-.14.08-.29.07-.44v-6.16z",
                    }),
                    K ||
                      (K = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5052",
                        className: "Oinq_share_svg__st5",
                        d: "M198.6 9.94c-.18.01-.35-.03-.51-.11-.2-.1-.38-.24-.54-.4-7.47-7.57-11.01-3.36-11.16-3.18-.07.08-.16.14-.26.16-.12.02-.24.02-.36-.02-.31-.1-.59-.29-.8-.53-.24-.25-.42-.56-.52-.89a.828.828 0 0 1 .07-.72c.05-.05 4.64-5.51 13.89 3.88.24.24.42.53.53.86.1.24.09.5-.02.73-.06.11-.18.19-.32.22z",
                      })),
                    U ||
                      (U = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5053",
                        className: "Oinq_share_svg__st5",
                        d: "M146.49 13.37a.5.5 0 0 1-.37-.1.528.528 0 0 1-.09-.55c.09-.27.24-.52.44-.73 8.38-8.46 13.53-4.95 13.58-4.91.07.05.13.13.15.22.03.11.03.22 0 .32-.03.13-.08.26-.15.38a2 2 0 0 1-.28.37 2.11 2.11 0 0 1-.75.52c-.11.04-.24.07-.36.07-.1 0-.19-.03-.27-.08-.17-.11-4.18-2.78-10.91 4-.15.14-.31.27-.5.36-.15.07-.31.12-.49.13z",
                      })),
                    Q ||
                      (Q = Z.createElement("ellipse", {
                        id: "Oinq_share_svg__Ellipse_189",
                        className: "Oinq_share_svg__st8",
                        cx: 184.63,
                        cy: 28.79,
                        rx: 9.92,
                        ry: 12.4,
                      })),
                    V ||
                      (V = Z.createElement("ellipse", {
                        id: "Oinq_share_svg__Ellipse_190",
                        className: "Oinq_share_svg__st8",
                        cx: 160.53,
                        cy: 29.08,
                        rx: 10,
                        ry: 13.85,
                      })),
                    W ||
                      (W = Z.createElement(
                        "g",
                        {
                          id: "Oinq_share_svg__Group_2555",
                          transform: "translate(180.878 25.346)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5054",
                          className: "Oinq_share_svg__st9",
                          d: "M-.1 10.88a4.131 4.131 0 0 0 0-8.26 4.131 4.131 0 0 0 0 8.26z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5055",
                          className: "Oinq_share_svg__st1",
                          d: "M2.93 3.94c.4 1.67.48 4.78-3.37 6.92.83.07 1.66-.11 2.39-.52.72-.42 1.3-1.04 1.67-1.79.36-.75.49-1.59.37-2.41-.12-.82-.49-1.59-1.06-2.2z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5056",
                          className: "Oinq_share_svg__st8",
                          d: "M-.61 5.95c.5 0 .9-.4.9-.9s-.4-.9-.9-.9-.9.4-.9.9.4.9.9.9z",
                        })
                      )),
                    Y ||
                      (Y = Z.createElement(
                        "g",
                        {
                          id: "Oinq_share_svg__Group_2556",
                          transform: "translate(163.459 24.998)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5057",
                          className: "Oinq_share_svg__st9",
                          d: "M.11 11.29c2.4 0 4.34-1.94 4.34-4.34S2.51 2.61.11 2.61s-4.34 1.94-4.34 4.34 1.94 4.34 4.34 4.34z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5058",
                          className: "Oinq_share_svg__st1",
                          d: "M3.29 4c.42 1.75.51 5.02-3.54 7.27.87.07 1.74-.12 2.5-.55.76-.43 1.37-1.08 1.75-1.87.39-.79.52-1.67.4-2.53-.13-.87-.51-1.68-1.11-2.32z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5059",
                          className: "Oinq_share_svg__st8",
                          d: "M-.43 6.12a.939.939 0 1 0 0-1.88.939.939 0 1 0 0 1.88z",
                        })
                      )),
                    H ||
                      (H = Z.createElement(
                        "g",
                        {
                          id: "Oinq_share_svg__Group_2557",
                          transform: "translate(150.335 35.72)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5060",
                          className: "Oinq_share_svg__st5",
                          d: "M15.84 3.53S3.78 5.12-2.18 16.03c-4.23 7.6-2.39 19.55 10.08 19.13s19.4.47 26.06 2.97 16.79 1.97 19.22-3.72 3.1-15-4-22S30.8.49 15.84 3.53z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5061",
                          className: "Oinq_share_svg__st0",
                          d: "M-1.11 20.88s-2.19 9.89 7.26 11.47c9.46 1.58 15.28-.96 30.47 3.47S53.79 30.05 51.9 21.9 39.74 5.83 27.52 4.6 2.66 8.01-1.11 20.88z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5062",
                          className: "Oinq_share_svg__st5",
                          d: "M13.17 21.03a3.857 3.857 0 0 1-4.18 3.47 3.86 3.86 0 0 1-2.82-4.64c.2-2.11 2.07-3.66 4.18-3.48 2.05.51 3.31 2.58 2.82 4.65z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5063",
                          className: "Oinq_share_svg__st1",
                          d: "M14.18 22.34A3.872 3.872 0 0 1 10 25.82c-2.06-.51-3.31-2.59-2.82-4.65a3.872 3.872 0 0 1 4.18-3.48c2.05.51 3.31 2.59 2.82 4.65z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5064",
                          className: "Oinq_share_svg__st5",
                          d: "M44.13 24.81a3.879 3.879 0 0 1-4.18 3.48 3.878 3.878 0 0 1-2.82-4.64c.2-2.11 2.07-3.66 4.18-3.48 2.05.5 3.31 2.58 2.82 4.64z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5065",
                          className: "Oinq_share_svg__st1",
                          d: "M45.15 26.12a3.872 3.872 0 0 1-4.18 3.48 3.855 3.855 0 0 1-2.82-4.65 3.872 3.872 0 0 1 4.18-3.48c2.05.51 3.31 2.59 2.82 4.65z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5066",
                          className: "Oinq_share_svg__st2",
                          d: "M28.16 5.88s-9-1.5-11.9 1.59c-.54 1.4 3.82 3.92 9.05 3s6.43-4.58 2.85-4.59z",
                        })
                      )),
                    X ||
                      (X = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5067",
                        d: "m146 86.14 49.55-7.15s15.67 16.15-1.01 23.34-43.9-6.19-48.54-16.19z",
                      })),
                    J ||
                      (J = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5068",
                        className: "Oinq_share_svg__st8",
                        d: "M146 86.14s30.84 4.38 44.45 1.86l.66-1.38.82 1.06c1.3-.27 2.53-.79 3.62-1.54v-7.15L146 86.14z",
                      })),
                    Z.createElement("path", {
                      id: "Oinq_share_svg__Path_5069",
                      d: "M164 99.83s14.74-9.7 34.52-.4c0 0-11.46 10.84-34.52.4z",
                      style: { fill: "#e41f5c" },
                    }),
                    $ ||
                      ($ = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5070",
                        className: "Oinq_share_svg__st5",
                        d: "M171.01 11.23s-.63 7.11.3 8.03-2.34-.21-2.34-.21l-1.54-5.5.83-2.7 2.75.38z",
                      })),
                    ee ||
                      (ee = Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5071",
                        className: "Oinq_share_svg__st5",
                        d: "M175.4 11.55s-.81 6.79-1.73 7.7 2.34-.21 2.34-.21l1.54-5.5-.83-2.7-1.32.71z",
                      })),
                    Z.createElement(
                      "g",
                      {
                        id: "Oinq_share_svg__Group_2565",
                        transform: "translate(0 19.042)",
                      },
                      Z.createElement(
                        "g",
                        {
                          id: "Oinq_share_svg__Group_2558",
                          transform: "translate(0 28.787)",
                        },
                        te ||
                          (te = Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5072",
                            className: "Oinq_share_svg__st11",
                            d: "M5.15 27c.34-.68.62-1.39.83-2.11.29-.89.49-1.64.61-2.16-5.55 1.1-12.19-4.81-10.56-10.14.75-2.46 1.11-2.86 3.39-3.93a5.475 5.475 0 0 1 6.6 1.69 12.73 12.73 0 0 1 3.05 7.96c3.83-1.74 4.9-4.98 5.78-9.07.52-2.03.79-4.12.81-6.22l.49.1c1.41.29 2.88.11 4.19-.5-.46 6.72-2.93 13.66-8.15 17.32-.85.69-1.77 1.29-2.74 1.79-.21.11-.43.21-.65.3.08 1.94-.5 3.85-1.64 5.42-2.07 2.72-6.39 2.98-6.39 3 .56-.08 1.11-.27 1.61-.55A6.917 6.917 0 0 0 5.15 27zm.17-7.59c1.19-.97.86-3.34-.74-5.3S.72 11.33-.47 12.3s-.86 3.34.74 5.31 3.86 2.76 5.05 1.8z",
                          })),
                        Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5073",
                          d: "m12.99 15.11-.05-.23c.94-1.77 1.59-3.67 1.93-5.65.35-1.46.6-2.95.76-4.45l4.45.29c-.84 5.92-3.31 11.68-7.89 14.88-.85.69-1.77 1.29-2.74 1.79-.21.11-.42.2-.63.3-1.31.24-2.19.35-2.19.35 2.64-1.1 6.36-7.28 6.36-7.28z",
                          style: {
                            opacity: 0.29,
                            fill: "#191919",
                            enableBackground: "new",
                          },
                        })
                      ),
                      ae ||
                        (ae = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5074",
                          className: "Oinq_share_svg__st13",
                          d: "M15.27 21.18c-3.75-5.05-9.02-18.74.57-18.57 8.16.15 15.99 4.23 18.45 5.62a62.82 62.82 0 0 1 20.77-2.39c6.98-.48 13.98.41 20.61 2.62 1.9-1.13 10.2-5.69 18.85-5.85 9.84-.18 4.02 14.25.27 18.95 1.1 1.38 2.1 2.83 3.01 4.34 13.86 22.94 3.93 56.75-24.43 65.77C62.1 95.25 26 98.43 13.7 76.26 4.21 59.13 8.02 33.1 15.27 21.18z",
                        })),
                      se ||
                        (se = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5075",
                          className: "Oinq_share_svg__st11",
                          d: "M15.39 20.94c-3.47-4.53-8.23-16.1-1.69-18.02-4.96 3.62.85 14.16 4.28 12.79 2.91-.98 9.62-5.49 15.07-8.41.7.34 1.27.65 1.69.88h.03c-5.69 3.25-14.61 8.27-16.52 13.39-7.13 19.11-7.7 36.44 3.96 53.05 7.39 10.52 22.58 13.74 34.06 14.63 9.45.93 18.98-.16 27.98-3.18a45.092 45.092 0 0 1-9.75 4.29c-11.47 3.53-48.18 6.66-60.69-15.18-9.66-16.88-5.79-42.51 1.58-54.24z",
                        })),
                      _e ||
                        (_e = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5076",
                          className: "Oinq_share_svg__st14",
                          d: "M66.96 9.61s27.52 7.73 32.74 24.73c4.34 14.1-2.32 34.38-17.09 43.27s-47.48 7.34-58.23-1.82c-13.73-11.71-6.55-21.78 3-22.2 0 0 12.35-4.67 16.98-.03 2.32 2.9 12.75 3.48 13.62-1.16 2.32-2.7 6.88-.79 17.38 2.03 4.66 1.24 13.54-9.48 2.76-16.91-13.42-9.23-52.34-7.61-60.61 5.59-6.25 9.96-9.27-21.59 4.63-27.77s30.05-7.66 44.82-5.73z",
                        })),
                      ne ||
                        (ne = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5077",
                          className: "Oinq_share_svg__st14",
                          d: "M27.45 14.02s-8.91 6.03-10.23 8.39c-2.09-.26-5.24-9.44-4.72-12.58s9.44-2.35 14.95 4.19z",
                        })),
                      re ||
                        (re = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5078",
                          className: "Oinq_share_svg__st11",
                          d: "M12.51 9.83c.04-.24.14-.47.28-.67.14-.2.32-.37.53-.5.3 3.19 1 8.15 4.12 8.71 2.94.65 6.81-2.32 9.37-4.07.22.24.44.47.63.72 0 0-8.91 6.03-10.23 8.39-2.08-.26-5.22-9.43-4.7-12.58z",
                        })),
                      ie ||
                        (ie = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5079",
                          className: "Oinq_share_svg__st11",
                          d: "M65.19 21.8c.16.03.33.01.48-.06.19-.07.37-.18.53-.32 7.54-6.29 10.42-2.11 10.54-1.93.05.08.13.14.22.17.11.03.22.04.33.01.29-.07.56-.21.78-.42.24-.21.43-.47.55-.77.1-.21.1-.46 0-.67-.04-.05-3.77-5.47-13.1 2.32-.24.2-.43.45-.56.74-.11.21-.13.45-.04.68.05.12.15.21.27.25z",
                        })),
                      le ||
                        (le = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5080",
                          className: "Oinq_share_svg__st11",
                          d: "M90.01 31.78c.07.06.17.1.26.09.14-.04.26-.15.29-.29.07-.2.08-.41.05-.62-1.44-8.66-6.04-8.74-6.08-8.74-.07 0-.13.02-.18.07-.06.05-.11.12-.14.2-.04.09-.06.19-.07.29-.01.11-.01.23.01.34.02.12.04.23.08.34.04.1.09.2.15.29.05.08.11.14.19.19.06.04.13.07.2.07.15 0 3.7.11 4.86 7.05.03.15.08.29.15.43.06.11.14.21.23.29z",
                        })),
                      Z.createElement(
                        "linearGradient",
                        {
                          id: "Oinq_share_svg__Path_5081_00000026858019640280471880000013691194756057873839_",
                          gradientUnits: "userSpaceOnUse",
                          x1: -169.989,
                          y1: 411.985,
                          x2: -169.989,
                          y2: 410.985,
                          gradientTransform:
                            "matrix(31.6699 0 0 -4.9514 5441.05 2046.036)",
                        },
                        Z.createElement("stop", {
                          offset: 0,
                          style: { stopColor: "#242929" },
                        }),
                        Z.createElement("stop", {
                          offset: 1,
                          style: { stopColor: "#242929" },
                        })
                      ),
                      Z.createElement("path", {
                        id: "Oinq_share_svg__Path_5081",
                        style: {
                          fill: "url(#Oinq_share_svg__Path_5081_00000026858019640280471880000013691194756057873839_)",
                        },
                        d: "M73.35 11.08h-4.88S48.78 5.45 41.68 6.65c0 0 12.42-2.76 31.67 4.43z",
                      }),
                      ce ||
                        (ce = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5082",
                          className: "Oinq_share_svg__st11",
                          d: "M69.69 11.04S55.02 7.07 47.6 6.43s-1.89-.05-1.89-.05 18.14 3.28 20.46 5.09l3.52-.43z",
                        })),
                      he ||
                        (he = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5083",
                          className: "Oinq_share_svg__st11",
                          d: "M75.8 10.77S61.13 6.99 53.71 6.38s-1.89-.05-1.89-.05 18.14 3.12 20.46 4.85l3.52-.41z",
                        })),
                      de ||
                        (de = Z.createElement("ellipse", {
                          id: "Oinq_share_svg__Ellipse_191",
                          className: "Oinq_share_svg__st8",
                          cx: 84.25,
                          cy: 33.73,
                          rx: 3.77,
                          ry: 6.33,
                        })),
                      oe ||
                        (oe = Z.createElement("ellipse", {
                          id: "Oinq_share_svg__Ellipse_192",
                          className: "Oinq_share_svg__st8",
                          cx: 75.15,
                          cy: 31.88,
                          rx: 4.47,
                          ry: 7.51,
                        })),
                      me ||
                        (me = Z.createElement(
                          "g",
                          {
                            id: "Oinq_share_svg__Group_2559",
                            transform: "translate(87.134 28.83)",
                          },
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5084",
                            className: "Oinq_share_svg__st9",
                            d: "M-1.99 9.35c-1.24 0-2.24-1.51-2.24-3.37s1-3.37 2.24-3.37S.25 4.12.25 5.98s-1 3.37-2.24 3.37z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5085",
                            className: "Oinq_share_svg__st1",
                            d: "M-3.39 5.61a3.41 3.41 0 0 0 1.05 3.23.953.953 0 0 1-.74-.24 1.86 1.86 0 0 1-.52-.84c-.11-.36-.15-.75-.12-1.12.03-.37.15-.72.33-1.03z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5086",
                            className: "Oinq_share_svg__st8",
                            d: "M-2.16 6.25c-.27 0-.49-.33-.49-.73s.22-.73.49-.73.49.33.49.73-.22.73-.49.73z",
                          })
                        )),
                      pe ||
                        (pe = Z.createElement(
                          "g",
                          {
                            id: "Oinq_share_svg__Group_2560",
                            transform: "translate(77.421 26.572)",
                          },
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5087",
                            className: "Oinq_share_svg__st9",
                            d: "M-1.57 10.61c-1.47 0-2.66-1.79-2.66-4s1.19-4 2.66-4 2.66 1.79 2.66 4-1.19 4-2.66 4z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5088",
                            className: "Oinq_share_svg__st1",
                            d: "M-3.23 6.16c-.3 1.41.17 2.86 1.24 3.83-.32.03-.64-.07-.88-.29-.29-.27-.5-.61-.61-.99-.14-.43-.18-.89-.14-1.33.04-.43.17-.84.39-1.22z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5089",
                            className: "Oinq_share_svg__st8",
                            d: "M-1.77 6.92c-.32 0-.58-.39-.58-.87s.26-.87.58-.87.58.39.58.87-.26.87-.58.87z",
                          })
                        )),
                      ge ||
                        (ge = Z.createElement("path", {
                          id: "Oinq_share_svg__Path_5105",
                          d: "M60.13 59.24s-20.5 16.78-25.52-9.37 25.52 9.37 25.52 9.37z",
                        })),
                      ve ||
                        (ve = Z.createElement(
                          "g",
                          {
                            id: "Oinq_share_svg__Group_2561",
                            transform: "translate(57.12 35.509)",
                          },
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5090",
                            className: "Oinq_share_svg__st11",
                            d: "M38.57 7.24c.61.26 1.2.57 1.78.9 1.47.84 2.86 1.82 4.16 2.92 1.82 1.54 3.42 3.31 4.77 5.26 1.66 2.42 2.9 5.1 3.66 7.94.61 2.23.8 4.55.58 6.85a15.33 15.33 0 0 1-1.94 6.32 9.495 9.495 0 0 1-4.56 4.11c-2.35.88-4.92.94-7.31.19-2.92-.79-5.53-1.42-7.93-1.9s-4.56-.83-6.58-1.04c-1.9-.2-3.8-.28-5.71-.23-1.77.05-3.54.22-5.28.51-1.85.29-3.73.33-5.59.12-1.92-.2-3.8-.65-5.59-1.35-1.68-.63-3.21-1.58-4.52-2.8a7.873 7.873 0 0 1-2.35-4.23c-.32-1.8-.44-3.63-.36-5.46.08-2.04.43-4.07 1.02-6.02.63-2.09 1.58-4.06 2.83-5.85 1.37-1.94 3.08-3.62 5.06-4.94C6.86 7.08 9.2 5.89 11.65 5c2.6-.94 5.32-1.53 8.09-1.75 3.02-.23 6.07-.04 9.04.57 3.39.71 6.69 1.86 9.79 3.42z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5091",
                            className: "Oinq_share_svg__st13",
                            d: "M50.99 28.99c-.01.55-.05 1.11-.13 1.66-.16 1.24-.49 2.45-.97 3.61a8.478 8.478 0 0 1-2.68 3.53 7.955 7.955 0 0 1-5.29 1.41c-2.14-.12-4.26-.4-6.35-.85-2.01-.41-3.99-.9-6.16-1.35-2.42-.51-4.88-.85-7.35-1.04-3.32-.22-6.65-.19-9.96.09-3.93.31-6.88-.16-9.03-1.16a8.104 8.104 0 0 1-4.26-4.39c-.73-1.97-.94-4.09-.62-6.17.3-2.23.92-4.4 1.84-6.46.97-2.13 2.36-4.03 4.08-5.6a24.66 24.66 0 0 1 6.4-4.24c2.53-1.17 5.21-1.97 7.97-2.39 2.91-.45 5.86-.47 8.78-.07a33.1 33.1 0 0 1 8.61 2.39c2.69 1.16 5.18 2.74 7.37 4.69 2.2 1.97 4.01 4.35 5.31 7a24.68 24.68 0 0 1 2.44 9.34z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5092",
                            className: "Oinq_share_svg__st16",
                            d: "M37.58 25.93c-.02.58.05 1.15.21 1.71.14.51.37.99.68 1.42.28.4.64.73 1.05.99.4.24.85.38 1.32.41.46.02.92-.07 1.34-.27.43-.21.81-.51 1.12-.87.34-.4.6-.85.78-1.34.2-.54.31-1.1.34-1.67.02-.57-.04-1.15-.2-1.7-.14-.51-.37-.99-.67-1.42-.28-.4-.63-.74-1.04-1a2.776 2.776 0 0 0-2.66-.16c-.43.21-.81.5-1.12.87-.34.4-.61.85-.79 1.34-.22.54-.34 1.11-.36 1.69z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5093",
                            className: "Oinq_share_svg__st1",
                            d: "M36.36 27.06c-.02.58.04 1.15.2 1.71.15.51.38.99.69 1.42.28.4.64.74 1.05.99.4.24.85.39 1.32.41.46.02.92-.07 1.34-.27.43-.21.81-.51 1.12-.87.34-.4.6-.85.79-1.34.2-.54.31-1.1.33-1.68.02-.57-.04-1.15-.2-1.7-.14-.51-.37-.99-.67-1.42-.28-.4-.64-.74-1.05-1-.4-.25-.85-.39-1.31-.42-.46-.03-.93.06-1.35.26-.43.21-.81.51-1.12.87-.34.4-.61.85-.79 1.35a5.15 5.15 0 0 0-.35 1.69z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5094",
                            className: "Oinq_share_svg__st16",
                            d: "M7.05 22.75c-.02.59.05 1.18.22 1.74.15.52.39 1.01.71 1.45.29.41.66.75 1.09 1.01.41.25.88.39 1.35.42.48.02.95-.07 1.38-.27.44-.21.84-.51 1.16-.89.35-.4.63-.86.81-1.36.21-.54.33-1.12.35-1.7.02-.59-.05-1.17-.21-1.73-.15-.52-.39-1.01-.7-1.45a3.59 3.59 0 0 0-1.08-1.01c-.41-.25-.88-.4-1.36-.43-.48-.03-.96.06-1.39.27-.45.21-.84.51-1.16.89-.35.4-.63.86-.82 1.36-.2.54-.32 1.12-.35 1.7z",
                          }),
                          Z.createElement("path", {
                            id: "Oinq_share_svg__Path_5095",
                            className: "Oinq_share_svg__st1",
                            d: "M5.79 23.9c-.02.58.05 1.17.21 1.74.15.52.39 1.01.7 1.45.3.4.67.75 1.1 1.01.41.25.88.39 1.36.42.48.02.96-.07 1.39-.27.44-.21.84-.51 1.16-.89.35-.4.62-.87.81-1.36.21-.54.32-1.12.35-1.7.03-.59-.04-1.17-.21-1.73-.15-.52-.39-1.01-.7-1.45-.29-.41-.66-.75-1.08-1.02-.41-.25-.88-.4-1.36-.43-.48-.03-.96.06-1.39.27-.45.21-.84.51-1.17.88-.35.4-.63.87-.82 1.36-.21.55-.33 1.13-.35 1.72z",
                          })
                        ))
                    )
                  )
                )
              );
            },
          },
          {
            inviteType: "qmee_all",
            title: "Give %1s;",
            titleValue: function (e) {
              return "".concat(e, "1");
            },
            description:
              "You'll give 100% of the reward to your friend - you're generous like that",
            image: function (e) {
              return Z.createElement(
                "svg",
                Se(
                  {
                    id: "Oinq_give_svg__Layer_1",
                    xmlns: "http://www.w3.org/2000/svg",
                    x: 0,
                    y: 0,
                    viewBox: "0 0 150.51 120.96",
                    style: { enableBackground: "new 0 0 150.51 120.96" },
                    xmlSpace: "preserve",
                  },
                  e
                ),
                Oe ||
                  (Oe = Z.createElement(
                    "style",
                    null,
                    ".Oinq_give_svg__st0{fill:#ad6a27}.Oinq_give_svg__st2{fill:#d08e4d}.Oinq_give_svg__st3{opacity:.23;enable-background:new}.Oinq_give_svg__st3,.Oinq_give_svg__st5{fill:#fff}.Oinq_give_svg__st6{fill:#191919}.Oinq_give_svg__st7{fill:#242929}.Oinq_give_svg__st8{fill:#dba876}"
                  )),
                Z.createElement(
                  "g",
                  {
                    id: "Oinq_give_svg__Oinq_give",
                    transform: "translate(-1238.165 -875.616)",
                  },
                  Z.createElement(
                    "g",
                    {
                      id: "Oinq_give_svg__Friend_share",
                      transform: "translate(1238.712 875.616)",
                    },
                    Z.createElement(
                      "g",
                      {
                        id: "Oinq_give_svg__Group_2558",
                        transform: "translate(0 36.153)",
                      },
                      qe ||
                        (qe = Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5072",
                          className: "Oinq_give_svg__st0",
                          d: "M11.78 31.7c.43-.85.77-1.74 1.04-2.66.36-1.12.61-2.06.76-2.72C6.61 27.7-1.72 20.28.31 13.59c.94-3.09 1.4-3.59 4.26-4.94a6.872 6.872 0 0 1 8.29 2.12c2.39 2.79 3.74 6.32 3.83 10 4.81-2.19 6.15-6.26 7.26-11.4.65-2.55.99-5.18 1.02-7.81l.63.14c1.78.36 3.62.14 5.26-.63-.58 8.45-3.69 17.16-10.24 21.76a19.58 19.58 0 0 1-3.44 2.25c-.27.14-.54.26-.82.38.1 2.44-.63 4.84-2.06 6.81-2.6 3.41-8.02 3.74-8.02 3.77.71-.11 1.39-.34 2.02-.69 1.49-.85 2.7-2.12 3.48-3.65zm.22-9.53c1.5-1.22 1.08-4.2-.92-6.66s-4.84-3.49-6.34-2.28-1.08 4.2.93 6.66 4.84 3.49 6.33 2.28z",
                        })),
                      Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5073",
                        d: "m21.63 16.76-.07-.29c1.18-2.22 2-4.61 2.42-7.09.44-1.84.76-3.7.96-5.58l5.59.36c-1.05 7.43-4.16 14.66-9.91 18.69a19.58 19.58 0 0 1-3.44 2.25c-.26.14-.52.25-.79.37-1.65.3-2.76.44-2.76.44 3.32-1.38 8-9.15 8-9.15z",
                        style: {
                          opacity: 0.29,
                          fill: "#191919",
                          enableBackground: "new",
                        },
                      })
                    ),
                    Ee ||
                      (Ee = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5074",
                        className: "Oinq_give_svg__st2",
                        d: "M24.49 24.4C19.77 18.05 13.16.86 25.2 1.07c10.25.18 20.08 5.31 23.18 7.05 12.47-3.64 24.63-3.28 26.09-3 8.76-.61 17.55.51 25.88 3.29 2.39-1.42 12.81-7.14 23.68-7.34 12.36-.22 5.05 17.9.33 23.8a50.9 50.9 0 0 1 3.78 5.45c17.41 28.8 4.94 71.27-30.68 82.6-14.16 4.5-59.49 8.5-74.94-19.35-11.92-21.52-7.13-54.21 1.97-69.17z",
                      })),
                    ue ||
                      (ue = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5075",
                        className: "Oinq_give_svg__st0",
                        d: "M24.65 24.09C20.29 18.4 14.31 3.87 22.52 1.46c-6.23 4.55 1.07 17.78 5.38 16.06 3.65-1.22 12.08-6.9 18.92-10.56.88.43 1.6.81 2.12 1.1h.04c-7.15 4.07-18.35 10.39-20.75 16.81-8.96 24-9.67 45.76 4.97 66.62 9.28 13.22 28.36 17.26 42.77 18.38 11.87 1.16 23.84-.2 35.14-4a56.88 56.88 0 0 1-12.24 5.39c-14.4 4.43-60.51 8.37-76.22-19.06-12.13-21.18-7.26-53.38 2-68.11z",
                      })),
                    Me ||
                      (Me = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5076",
                        className: "Oinq_give_svg__st3",
                        d: "M89.41 9.87s34.56 9.7 41.11 31.05c5.46 17.71-2.91 43.18-21.46 54.34s-59.63 9.22-73.12-2.29c-17.25-14.7-8.23-27.35 3.77-27.88 0 0 15.51-5.87 21.33-.03 2.91 3.64 16.01 4.37 17.1-1.45 2.91-3.4 8.64-.99 21.83 2.54 5.85 1.56 17.01-11.91 3.46-21.23-16.85-11.6-65.73-9.55-76.11 7.02-7.85 12.51-11.64-27.11 5.82-34.88s37.71-9.62 56.27-7.19z",
                      })),
                    ye ||
                      (ye = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5077",
                        className: "Oinq_give_svg__st3",
                        d: "M39.79 15.4S28.6 22.97 26.95 25.93c-2.63-.33-6.58-11.85-5.92-15.8s11.84-2.95 18.76 5.27z",
                      })),
                    ke ||
                      (ke = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5078",
                        className: "Oinq_give_svg__st0",
                        d: "M21.02 10.14c.05-.3.17-.59.35-.84.17-.25.4-.47.66-.63.37 4.01 1.26 10.23 5.18 10.94 3.69.82 8.55-2.91 11.77-5.11.27.29.54.59.8.91 0 0-11.19 7.57-12.84 10.53-2.62-.33-6.57-11.85-5.92-15.8z",
                      })),
                    Pe ||
                      (Pe = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5079",
                        className: "Oinq_give_svg__st0",
                        d: "M87.19 25.17c.2.03.41.01.6-.07.24-.09.47-.23.66-.4 9.47-7.9 13.08-2.64 13.23-2.42.07.1.17.17.28.21.14.04.28.04.42.02.37-.08.71-.27.98-.53.3-.26.54-.6.7-.97.13-.27.13-.58 0-.84-.05-.07-4.73-6.88-16.46 2.92-.3.25-.54.57-.7.93-.14.26-.16.57-.06.85.07.14.2.25.35.3z",
                      })),
                    Ne ||
                      (Ne = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5080",
                        className: "Oinq_give_svg__st0",
                        d: "M118.36 37.7c.09.08.21.12.33.12.18-.04.32-.19.37-.37.08-.25.1-.52.06-.78-1.81-10.87-7.58-10.98-7.64-10.98-.08 0-.16.03-.23.09a.66.66 0 0 0-.17.24c-.05.12-.08.24-.09.36a2.07 2.07 0 0 0 .11.86c.05.13.11.25.19.36.06.09.14.18.24.24.07.05.16.08.25.09.19 0 4.65.14 6.11 8.86.03.19.09.37.18.54.06.15.16.27.29.37z",
                      })),
                    Z.createElement(
                      "linearGradient",
                      {
                        id: "Oinq_give_svg__Path_5081_00000004517515241017719130000016496265660523507115_",
                        gradientUnits: "userSpaceOnUse",
                        x1: -211.591,
                        y1: 442.479,
                        x2: -211.591,
                        y2: 441.479,
                        gradientTransform:
                          "matrix(39.7729 0 0 -6.218 8493.142 2756.829)",
                      },
                      Z.createElement("stop", {
                        offset: 0,
                        style: { stopColor: "#242929" },
                      }),
                      Z.createElement("stop", {
                        offset: 1,
                        style: { stopColor: "#242929" },
                      })
                    ),
                    Z.createElement("path", {
                      id: "Oinq_give_svg__Path_5081",
                      style: {
                        fill: "url(#Oinq_give_svg__Path_5081_00000004517515241017719130000016496265660523507115_)",
                      },
                      d: "M97.43 11.71H91.3S66.57 4.64 57.65 6.15c0 0 15.61-3.48 39.78 5.56z",
                    }),
                    Ze ||
                      (Ze = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5082",
                        className: "Oinq_give_svg__st0",
                        d: "M92.84 11.66S74.41 6.67 65.1 5.87s-2.38-.07-2.38-.07 22.78 4.12 25.7 6.4l4.42-.54z",
                      })),
                    ze ||
                      (ze = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5083",
                        className: "Oinq_give_svg__st0",
                        d: "M100.51 11.32S82.08 6.57 72.77 5.81s-2.38-.06-2.38-.06 22.78 3.92 25.7 6.08l4.42-.51z",
                      })),
                    be ||
                      (be = Z.createElement("ellipse", {
                        id: "Oinq_give_svg__Ellipse_191",
                        className: "Oinq_give_svg__st5",
                        cx: 111.12,
                        cy: 40.16,
                        rx: 4.73,
                        ry: 7.95,
                      })),
                    xe ||
                      (xe = Z.createElement("ellipse", {
                        id: "Oinq_give_svg__Ellipse_192",
                        className: "Oinq_give_svg__st5",
                        cx: 99.7,
                        cy: 37.82,
                        rx: 5.61,
                        ry: 9.43,
                      })),
                    Ce ||
                      (Ce = Z.createElement(
                        "g",
                        {
                          id: "Oinq_give_svg__Group_2559",
                          transform: "translate(109.431 36.207)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5084",
                          className: "Oinq_give_svg__st6",
                          d: "M2.81 9.54C1.26 9.54 0 7.64 0 5.31s1.26-4.23 2.81-4.23 2.82 1.9 2.82 4.23-1.26 4.23-2.82 4.23z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5085",
                          className: "Oinq_give_svg__st7",
                          d: "M1.06 4.83c-.32 1.49.18 3.04 1.31 4.06-.34.03-.68-.08-.93-.31-.31-.28-.53-.64-.65-1.04C.65 7.08.6 6.6.64 6.12c.04-.45.18-.89.42-1.29z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5086",
                          className: "Oinq_give_svg__st5",
                          d: "M2.61 5.64c-.34 0-.61-.41-.61-.92s.27-.92.61-.92.61.41.61.92-.28.92-.61.92z",
                        })
                      )),
                    we ||
                      (we = Z.createElement(
                        "g",
                        {
                          id: "Oinq_give_svg__Group_2560",
                          transform: "translate(97.232 33.372)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5087",
                          className: "Oinq_give_svg__st6",
                          d: "M3.34 11.12C1.49 11.12 0 8.87 0 6.09s1.5-5.02 3.34-5.02 3.34 2.25 3.34 5.02-1.5 5.03-3.34 5.03z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5088",
                          className: "Oinq_give_svg__st7",
                          d: "M1.25 5.53c-.37 1.77.22 3.6 1.56 4.81-.4.04-.8-.09-1.1-.36-.36-.34-.63-.77-.77-1.24C.77 8.2.71 7.63.77 7.06c.04-.54.21-1.06.48-1.53z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5089",
                          className: "Oinq_give_svg__st5",
                          d: "M3.09 6.49c-.4 0-.73-.49-.73-1.09s.32-1.09.73-1.09.73.49.73 1.09-.33 1.09-.73 1.09z",
                        })
                      )),
                    Be ||
                      (Be = Z.createElement("path", {
                        id: "Oinq_give_svg__Path_5105",
                        d: "M80.83 72.19S55.09 93.27 48.78 60.43s32.05 11.76 32.05 11.76z",
                      })),
                    je ||
                      (je = Z.createElement(
                        "g",
                        {
                          id: "Oinq_give_svg__Group_2561",
                          transform: "translate(72.788 45.316)",
                        },
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5090",
                          className: "Oinq_give_svg__st0",
                          d: "M53.43 6.85c.76.33 1.49.71 2.21 1.12 1.83 1.05 3.55 2.27 5.15 3.64 2.25 1.91 4.24 4.12 5.91 6.55 2.06 3.01 3.59 6.35 4.53 9.88.75 2.78.99 5.67.72 8.53a19.53 19.53 0 0 1-2.39 7.88 11.86 11.86 0 0 1-5.64 5.15c-2.9 1.11-6.09 1.21-9.06.29-3.62-.96-6.87-1.73-9.84-2.32s-5.68-1-8.2-1.25c-2.36-.24-4.74-.32-7.11-.25-2.21.08-4.42.3-6.6.67-2.31.37-4.66.43-6.99.19-2.4-.23-4.75-.79-7-1.65a16.96 16.96 0 0 1-5.67-3.49 9.836 9.836 0 0 1-2.96-5.3 30.9 30.9 0 0 1-.46-6.86c.11-2.57.53-5.11 1.28-7.57.79-2.62 1.99-5.1 3.55-7.35a24.12 24.12 0 0 1 6.34-6.2c2.71-1.83 5.63-3.32 8.69-4.43 3.25-1.19 6.65-1.93 10.1-2.2 3.77-.29 7.56-.05 11.26.71 4.23.88 8.32 2.31 12.18 4.26z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5091",
                          className: "Oinq_give_svg__st2",
                          d: "M68.8 33.93c-.01.69-.06 1.38-.16 2.06-.2 1.55-.6 3.06-1.2 4.5-.69 1.74-1.84 3.26-3.32 4.41a9.9 9.9 0 0 1-6.54 1.79c-2.65-.13-5.28-.47-7.88-1.02-2.5-.5-4.96-1.1-7.66-1.64-3.02-.62-6.07-1.04-9.15-1.25-4.14-.26-8.3-.2-12.43.17-4.91.41-8.6-.15-11.3-1.4a10.112 10.112 0 0 1-5.34-5.49c-.91-2.47-1.18-5.13-.78-7.74.38-2.8 1.16-5.53 2.31-8.12 1.21-2.67 2.95-5.06 5.12-7.03 2.37-2.18 5.08-3.98 8.01-5.33a37.29 37.29 0 0 1 9.94-3c3.62-.56 7.31-.59 10.94-.09 3.69.5 7.29 1.5 10.7 2.98 3.34 1.44 6.43 3.41 9.14 5.84 2.73 2.46 4.96 5.41 6.57 8.71 1.77 3.67 2.79 7.62 3.03 11.65z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5092",
                          className: "Oinq_give_svg__st8",
                          d: "M52.2 30.18c-.03.72.05 1.44.25 2.13.18.63.46 1.23.84 1.77.35.49.79.91 1.3 1.23.49.3 1.05.48 1.63.51.57.03 1.15-.09 1.66-.35.53-.26 1-.64 1.38-1.09.42-.5.74-1.06.97-1.67.25-.67.39-1.37.41-2.09.03-.72-.05-1.43-.25-2.12-.18-.63-.46-1.23-.83-1.77-.34-.49-.78-.91-1.3-1.23a3.6 3.6 0 0 0-1.63-.52 3.42 3.42 0 0 0-1.66.34c-.54.26-1.01.63-1.4 1.09-.42.5-.75 1.07-.98 1.68-.22.66-.37 1.37-.39 2.09z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5093",
                          className: "Oinq_give_svg__st7",
                          d: "M50.69 31.59c-.03.72.05 1.44.25 2.13.18.64.46 1.23.84 1.77.35.49.79.91 1.3 1.23.49.3 1.05.48 1.63.51.58.03 1.15-.09 1.67-.35.53-.27 1.01-.64 1.39-1.1.42-.5.75-1.07.97-1.68.25-.67.39-1.38.41-2.09.03-.72-.06-1.43-.25-2.12-.18-.63-.46-1.23-.84-1.77-.34-.49-.78-.91-1.3-1.23a3.6 3.6 0 0 0-1.63-.52c-.57-.03-1.15.09-1.66.34-.54.26-1.01.63-1.4 1.09-.42.5-.75 1.07-.98 1.68-.24.68-.38 1.39-.4 2.11z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5094",
                          className: "Oinq_give_svg__st8",
                          d: "M14.16 26.32c-.03.74.06 1.47.26 2.18.19.65.49 1.27.88 1.82.36.51.83.94 1.36 1.26.51.31 1.09.49 1.69.52a3.5 3.5 0 0 0 1.72-.35c.55-.27 1.05-.65 1.45-1.11.44-.51.78-1.08 1.02-1.71.26-.68.41-1.4.44-2.13.03-.73-.06-1.46-.26-2.17-.18-.65-.48-1.26-.87-1.81-.36-.51-.82-.94-1.35-1.26-.51-.31-1.1-.5-1.7-.53-.6-.03-1.2.08-1.74.34-.56.26-1.05.64-1.45 1.11a5.71 5.71 0 0 0-1.02 1.71c-.26.68-.41 1.4-.43 2.13z",
                        }),
                        Z.createElement("path", {
                          id: "Oinq_give_svg__Path_5095",
                          className: "Oinq_give_svg__st7",
                          d: "M12.57 27.77c-.03.74.06 1.47.26 2.18.19.65.49 1.27.88 1.82.36.51.83.94 1.36 1.26.52.31 1.1.49 1.71.52.6.03 1.2-.09 1.74-.35.56-.27 1.05-.65 1.45-1.12.44-.51.78-1.09 1.01-1.71.26-.68.4-1.41.43-2.14.03-.73-.05-1.47-.25-2.17-.19-.65-.48-1.26-.87-1.81-.36-.51-.82-.94-1.36-1.26-.51-.31-1.1-.5-1.7-.53-.6-.03-1.2.08-1.74.34-.56.26-1.05.64-1.46 1.11a5.51 5.51 0 0 0-1.02 1.71c-.26.68-.41 1.41-.44 2.15z",
                        })
                      ))
                  )
                )
              );
            },
          },
        ],
        Ie = a(21238),
        Te = a.n(Ie),
        Ge = a(58197),
        Re = a(4542),
        Le = a(84646),
        Ke = function (e) {
          var t = e.token,
            a = e.invite,
            s = e.currencySymbol,
            _ = a.image;
          return (0, P.jsxs)(Re.Z, {
            component: "li",
            className: Te().card,
            children: [
              (0, P.jsxs)("div", {
                className: Te().content,
                children: [
                  (0, P.jsx)(Le.Z, {
                    component: "h2",
                    translateOptions: {
                      vars: a.titleValue ? [a.titleValue(s)] || 0 : [],
                    },
                    children: a.title,
                  }),
                  (0, P.jsx)(_, { className: Te().image }),
                  (0, P.jsx)(Le.Z, {
                    component: "p",
                    className: Te().inviteDescription,
                    translateOptions: {
                      vars: a.descriptionValue
                        ? [a.descriptionValue(s)] || 0
                        : [],
                    },
                    children: a.description,
                  }),
                ],
              }),
              (0, P.jsx)(Ge.Z, { value: "https://qm.ee/".concat(t) }),
            ],
          });
        };
      function Ue() {
        return (
          (Ue = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var a = arguments[t];
                  for (var s in a)
                    Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
                }
                return e;
              }),
          Ue.apply(this, arguments)
        );
      }
      var Qe = function (e) {
          return Z.createElement(
            "svg",
            Ue(
              {
                height: 506,
                viewBox: "0 0 825 506",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            Fe ||
              (Fe = Z.createElement(
                "g",
                { clipPath: "url(#oinqhandinhand_svg__a)" },
                Z.createElement("path", {
                  d: "M417.79 194.57a24.64 24.64 0 0 1-4.44.75c-1.84.2-3.38.28-4.44.31 4.37-10.33-4.42-25.6-15.42-24.6-5.08.46-6 1-9 5s-2.68 9.29.62 13.49a25.231 25.231 0 0 0 14.22 9.14c-4.92 6.73-11.65 7.49-19.94 7.56-3.09 0-8.14.14-12.41-.93v1a13.194 13.194 0 0 1-2.66 7.93c13.24 1.82 27.7-.18 36.92-8.83a30.645 30.645 0 0 0 4.58-4.6c.3-.37.58-.75.85-1.14 3.74.938 7.686.586 11.2-1 6.11-2.93 8.35-11.2 8.4-11.18a8.97 8.97 0 0 1-1.71 2.9 13.74 13.74 0 0 1-6.77 4.2ZM403 191.85c-2.36 1.92-6.84.32-10-3.57-3.16-3.89-3.83-8.61-1.48-10.53s6.84-.32 10 3.58 3.83 8.6 1.48 10.52Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  opacity: 0.29,
                  d: "m391.54 205-.42-.2c-3.46 1.19-7.38 1.43-11.73 1.46a70.938 70.938 0 0 1-8.95-.31l-1.24 8.75c11.82.76 24-1.71 32.08-9.31a30.645 30.645 0 0 0 4.58-4.6c.29-.36.57-.73.83-1.11 1-2.45 1.56-4.12 1.56-4.12-3.19 4.71-16.71 9.44-16.71 9.44Z",
                  fill: "#191919",
                }),
                Z.createElement("path", {
                  d: "M385.49 441.2c0 15.89-78.11 28.8-174.49 28.8-96.38 0-174.45-12.91-174.45-28.8s78.11-28.77 174.45-28.77c96.34 0 174.49 12.88 174.49 28.77Z",
                  fill: "#D7D7D6",
                }),
                Z.createElement("path", {
                  d: "M136.43 379.39s-11.4 41.1-8.36 59.42c0 0-3.85 14.7-15.51 6.2-12.43 8.21-19.23-5-22.74-19.26-3.51-14.26-4.56-93 9.35-106.9 13.91-13.9 45.69 7.77 45.69 7.77s7.44 6.18-8.43 52.77Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M128.07 438.81c-3-18.32 8.36-59.42 8.36-59.42 15.87-46.59 8.43-52.77 8.43-52.77s-31.78-21.64-45.69-7.77c-3 3-5.38 9.19-7.12 17.1 7.36 16.5 23.18 28.21 31.47 43.34 8.81 19.81-14.71 36.34-35.41 31.23.183 5.113.754 10.204 1.71 15.23 3.51 14.21 10.31 27.47 22.74 19.26 11.66 8.5 15.51-6.2 15.51-6.2Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M88.23 412.46a88.928 88.928 0 0 0 1.59 13.29c3.51 14.21 10.31 27.47 22.74 19.26 11.66 8.5 15.51-6.2 15.51-6.2-1-5.93-.45-14.25.72-22.79a67.628 67.628 0 0 1-40.56-3.56Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M101.24 360.3s-10-4.72-11.24 6.71c-1.24 11.43-.23 31.33 1.25 36 1.48 4.67 10.48 2 16.73-13.31s-1.87-26.55-6.74-29.4Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M114.68 420.59s-12.76.92-21-2.56 1.24 21.41 9 23c7.76 1.59 10.32-5.96 10.32-5.96s2.65 4.35 6.39.09c3.74-4.26 8.78-13.16-4.71-14.57Z",
                  fill: "#4B5A6B",
                }),
                Z.createElement("path", {
                  d: "M100.45 422.86s-4.87-2.85-6.16.34 1.49 10.79 5.15 12.92c3.66 2.13 7.17-11.12 1.01-13.26Z",
                  fill: "#7E8390",
                }),
                Z.createElement("path", {
                  d: "M291.89 379.39s11.4 41.1 8.36 59.42c0 0 3.85 14.7 15.51 6.2 12.43 8.21 19.22-5 22.74-19.26 3.52-14.26 4.56-93-9.35-106.9-13.91-13.9-45.69 7.77-45.69 7.77s-7.46 6.18 8.43 52.77Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M300.25 438.81c3-18.32-8.36-59.42-8.36-59.42-15.87-46.59-8.43-52.77-8.43-52.77s31.78-21.64 45.69-7.77c3.05 3 5.38 9.19 7.12 17.1-7.36 16.5-23.18 28.21-31.47 43.34-8.81 19.81 14.71 36.34 35.41 31.23a100.666 100.666 0 0 1-1.71 15.23C335 440 328.19 453.22 315.76 445c-11.66 8.51-15.51-6.19-15.51-6.19Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M340.09 412.46a88.89 88.89 0 0 1-1.59 13.29C335 440 328.19 453.22 315.76 445c-11.66 8.5-15.51-6.2-15.51-6.2 1-5.93.45-14.25-.72-22.79a67.627 67.627 0 0 0 40.56-3.55Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M327.08 360.3s10-4.72 11.24 6.71c1.24 11.43.22 31.33-1.26 36-1.48 4.67-10.48 2-16.72-13.31-6.24-15.31 1.87-26.55 6.74-29.4Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M313.64 420.59s12.76.92 21-2.56-1.24 21.41-9 23c-7.76 1.59-10.29-5.92-10.29-5.92s-2.65 4.35-6.39.09c-3.74-4.26-8.81-13.2 4.68-14.61Z",
                  fill: "#4B5A6B",
                }),
                Z.createElement("path", {
                  d: "M327.87 422.86s4.87-2.85 6.16.34-1.49 10.79-5.15 12.92c-3.66 2.13-7.17-11.12-1.01-13.26Z",
                  fill: "#7E8390",
                }),
                Z.createElement("path", {
                  d: "M67.75 287.67s-32 28.23-39.44 45.24c0 0-11.25 10.2-16.38-3.29-14.9.11-13.35-14.71-8.54-28.54 4.81-13.83 47-80.45 66.18-84.47 19.18-4.02 34 31.44 34 31.44s2.9 9.24-35.82 39.62Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M67.75 287.67s-32 28.23-39.44 45.24c0 0-11.25 10.2-16.38-3.29-14.9.11-13.35-14.71-8.54-28.54a78.32 78.32 0 0 1 4.8-10c10.12 9.82 21.75 15.38 32 5.9 12.44-11.3 7.14-34.75-.48-53.37 11.05-14 22.23-25.42 29.84-27 19.22-4 34 31.44 34 31.44s2.92 9.24-35.8 39.62Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M9.31 289.08a90.048 90.048 0 0 0-5.92 12c-4.81 13.83-6.36 28.65 8.54 28.54 5.13 13.49 16.38 3.29 16.38 3.29 2.42-5.51 7.4-12.19 13-18.71a67.652 67.652 0 0 1-32-25.12Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M20.16 293.24s-5.87-2.24-5.87-6.16 12.87-24.91 17.63-27.43c4.76-2.52 3.92 12.87-.28 22.11s-7.84 12.04-11.48 11.48Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M27.06 330.51s-2.87 4-6.41 4.21c-3.54.21-5.53-4.2-4.43-9.51-3.32 2.43-8.18-.45-8.62-8.19-.44-7.74 7.52-12.39 16.14-7.74 8.62 4.65 13 7.52 10.18 11.5-2.82 3.98-6.86 9.73-6.86 9.73Z",
                  fill: "#4B5A6B",
                }),
                Z.createElement("path", {
                  d: "M27.81 328.2s-2.39 4.67-5.47 5.37c-3.08.7-5-4-.8-7.56 4.2-3.56 8.36-1.59 6.27 2.19Z",
                  fill: "#7E8390",
                }),
                Z.createElement("path", {
                  d: "M363.74 286.62s30.58 29.74 37.19 47.1c0 0 10.74 10.74 16.53-2.48 14.87.83 14-14.05 9.91-28.1s-43-82.63-62-87.59c-19-4.96-35.54 29.75-35.54 29.75s-3.27 9.09 33.91 41.32Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M417.46 331.24c-5.79 13.22-16.53 2.48-16.53 2.48-6.61-17.36-37.19-47.1-37.19-47.1-37.18-32.23-33.88-41.32-33.88-41.32s16.53-34.71 35.54-29.75c6 1.57 14 9.55 22.32 20.15a2.75 2.75 0 0 0-1.66.53c-8.22 23.29-9.59 46.12 5.48 69.41 14.93-5.5 21.71-8.68 27.63-20.37 4.23 8 7.21 14.51 8.2 17.87 4.13 14.05 4.96 28.93-9.91 28.1Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M422 290.87a90.425 90.425 0 0 1 5.33 12.27c4.13 14.05 5 28.93-9.91 28.1-5.79 13.22-16.53 2.48-16.53 2.48-2.14-5.62-6.8-12.54-12.11-19.32A67.575 67.575 0 0 0 422 290.87Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M415.3 285.08s-3.07 7.27-9.23 7.27-15.11-21.83-13.16-33.3c1.95-11.47 20.71 13.95 22.39 26.03Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M409.15 335.18s-2.24 1.68-5.88-2.8c-3.64-4.48-7.84-12.6-6.72-15.68s16-14 22.67-7.83c6.67 6.17 6.44 13.43 2.52 15.95-3.92 2.52-6.16.84-6.16.84s.84 9.52-6.43 9.52Z",
                  fill: "#4B5A6B",
                }),
                Z.createElement("path", {
                  d: "M408.58 334.61s-3.91.57-5.87-6.15c-1.96-6.72 1.4-5.32 5.6-2 4.2 3.32 3.07 7.88.27 8.15Z",
                  fill: "#7E8390",
                }),
                Z.createElement("path", {
                  d: "M354.42 109.92c13.21-17.93 31.75-66.5-2-65.88-28.7.52-56.25 15-64.93 19.93-34.93-10.27-69-9.27-73.08-8.49 0 0-34.19-3.75-72.5 9.3-6.69-4-35.87-20.18-66.32-20.74-34.62-.63-14.16 50.57-.94 67.24A146.527 146.527 0 0 0 64 126.68C15.28 208.05 50.22 328 150 360c39.66 12.71 166.65 24 209.9-54.67 33.41-60.8 20.01-153.15-5.48-195.41Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M354.42 109.92c12-16.33 28.46-58 5.85-64.92 17.15 13.06-2.94 51-14.81 46.08-10-3.51-33.28-19.78-52.11-30.28-2.41 1.24-4.4 2.34-5.84 3.17h-.1c19.69 11.69 50.53 29.79 57.13 48.22 24.66 68.85 26.64 131.27-13.69 191.1C305.28 341.2 252.76 352.79 213 356a223.732 223.732 0 0 1-96.78-11.46A152.782 152.782 0 0 0 150 360c39.66 12.71 166.65 24 209.9-54.67 33.41-60.8 20.01-153.15-5.48-195.41Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M159.05 66.49s-86.76 28.1-103.2 89.93c-13.7 51.29 7.31 125.06 53.89 157.38 46.58 32.32 149.67 26.69 183.56-6.63 43.29-42.58 20.64-79.2-9.47-80.74 0 0-38.93-17-53.54-.1-7.29 10.55-40.19 12.67-42.92-4.21-7.31-9.83-21.69-2.88-54.8 7.37C117.89 234 89.89 195 123.89 168c42.28-33.58 165-27.67 191.06 20.33 19.7 36.22 29.23-78.51-14.61-101-43.84-22.49-94.71-27.86-141.29-20.84ZM310.68 80s28.09 19 32.23 26.44c6.61-.83 16.52-29.75 14.87-39.67-1.65-9.92-29.78-7.4-47.1 13.23Z",
                  fill: "#6FC282",
                }),
                Z.createElement("path", {
                  d: "M124.11 87.32s-28.1 19-32.23 26.44c-6.61-.82-16.53-29.74-14.87-39.66 1.66-9.92 29.75-7.44 47.1 13.22Z",
                  fill: "#6FC282",
                }),
                Z.createElement("path", {
                  d: "M357.78 66.8a5.437 5.437 0 0 0-2.54-3.69c-.94 10.06-3.15 25.68-13 27.47-9.26 2.06-21.47-7.31-29.56-12.83-.69.74-1.37 1.49-2 2.28 0 0 28.09 19 32.23 26.44 6.61-.83 16.52-29.75 14.87-39.67ZM88.15 68.48c6.63 3.25 11.69 8.07 14.38 15.25 4.95 11.13-5.74 21.14-15.92 25 1.81 2.91 3.64 4.83 5.27 5 4.13-7.43 32.23-26.44 32.23-26.44-10.81-12.84-25.8-18.65-35.96-18.81ZM170.16 166.32s-34.16 9.43-46.92 43.28c-9.12 23.62 1 57.3 36.75 51.11 35.75-6.19 56.1-6.45 76.32-1.92 20.22 4.53 49.17-1.06 53.88-18.43 4.71-17.37 2.89-44.47-20.37-61.8s-57.74-27.01-99.66-12.24Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M128.29 223.14s-2.35 29.39 25.54 30.14 43.66-8.9 89.21-2.24 47.16-23.54 38.47-46.26c-8.69-22.72-41.51-41.43-77.23-40.06-35.72 1.37-70.28 19.81-75.99 58.42Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M169.5 217.83c-.18 6.61-4.95 11.85-10.65 11.69-5.7-.16-10.18-5.64-10-12.25.18-6.61 5-11.86 10.65-11.7 5.65.16 10.18 5.64 10 12.26Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M172.94 221.2c-.18 6.61-4.94 11.85-10.65 11.7-5.71-.15-10.18-5.64-10-12.26.18-6.62 4.95-11.85 10.65-11.7 5.7.15 10.18 5.65 10 12.26Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M260.27 216.27c-.18 6.62-4.94 11.86-10.65 11.7-5.71-.16-10.18-5.64-10-12.25.18-6.61 4.95-11.86 10.65-11.7 5.7.16 10.18 5.64 10 12.25Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M263.72 219.65c-.18 6.61-5 11.85-10.66 11.7-5.66-.15-10.17-5.64-10-12.26.17-6.62 4.95-11.85 10.65-11.7 5.7.15 10.19 5.61 10.01 12.26Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M206.63 168.16s-26.54-.71-33.66 9.37c-1 4.26 12.58 9.77 27.28 5 14.7-4.77 16.75-15.8 6.38-14.37ZM89.74 123.46S61.43 154.51 56 192c-5.43 37.49 11.87 21.92 24.66-17.35 12.79-39.27 28.31-59.36 32.88-68.5 4.57-9.14-12.84 4.52-23.8 17.31Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M219.13 55.08a32.287 32.287 0 0 0-4.7.47s-2.71-.38-7.47-.56v17.68a3.645 3.645 0 0 0 1.27 2.75 7.36 7.36 0 0 0 10-.06 3.166 3.166 0 0 0 .92-2.39l-.02-17.89Z",
                  fill: "url(#oinqhandinhand_svg__b)",
                }),
                Z.createElement("path", {
                  d: "M208.7 53.45s-1.83 20.7.86 23.36-6.81-.6-6.81-.6l-4.49-16 2.43-7.85 8.01 1.09ZM217.31 53.45s1.83 20.7-.86 23.36 6.82-.6 6.82-.6l4.48-16-2.43-7.85-8.01 1.09ZM270.85 127.09a1.497 1.497 0 0 1-1.3-.75c-5.88-10.15-15.46-5.45-15.86-5.25a1.496 1.496 0 0 1-1.146.089 1.505 1.505 0 0 1-.962-1.896c.124-.378.393-.693.748-.873.13-.06 12.53-6.15 19.82 6.43a1.509 1.509 0 0 1-.55 2 1.586 1.586 0 0 1-.75.25ZM144 127.09a1.53 1.53 0 0 1-.75-.2 1.513 1.513 0 0 1-.55-2c7.29-12.58 19.69-6.49 19.82-6.43a1.49 1.49 0 0 1 .749.873c.061.188.085.386.069.582a1.488 1.488 0 0 1-.52 1.026 1.5 1.5 0 0 1-1.658.199c-.41-.2-10-4.84-15.86 5.25a1.501 1.501 0 0 1-1.3.7Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M159.39 159.03c8.56 0 15.5-6.94 15.5-15.5 0-8.56-6.94-15.5-15.5-15.5-8.561 0-15.5 6.94-15.5 15.5 0 8.56 6.939 15.5 15.5 15.5Z",
                  fill: "#191919",
                }),
                Z.createElement("path", {
                  d: "M170.75 133c1.49 6.26 1.81 17.93-12.65 25.95a15.473 15.473 0 0 0 15.212-8.642A15.479 15.479 0 0 0 170.75 133Z",
                  fill: "#333",
                }),
                Z.createElement("path", {
                  d: "M153.25 141.9a3.37 3.37 0 1 0 0-6.74 3.37 3.37 0 0 0 0 6.74Z",
                  fill: "#fff",
                }),
                Z.createElement("path", {
                  d: "M141.48 133s-2.05 5.67 4.15 8",
                  stroke: "#191919",
                  strokeWidth: 1.17,
                  strokeMiterlimit: 10,
                  strokeLinecap: "round",
                }),
                Z.createElement("path", {
                  d: "M240 272.6s47.38-2.17 61.15-25.36c0 0 6.73 46.43-31.62 52.71C242.77 304.33 240 272.6 240 272.6Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M242.1 274s44.12-2.7 58.16-23.25c0 0 5.71 39.69-30.59 45.49C244.33 300.3 242.1 274 242.1 274Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M274.13 295.5c15.87-5 16.871-10.507 15.87-12.006-1.001-1.5-.441-3.196-15.87 0C258.7 286.689 255.5 289.5 255.5 295c3.5 1 3.2 3.695 18.63.5Z",
                  fill: "#E41F5C",
                }),
                Z.createElement("path", {
                  d: "M260 305s20 3.14 28.76-8.38",
                  stroke: "#3B9F60",
                  strokeWidth: 0.43,
                  strokeMiterlimit: 10,
                  strokeLinecap: "round",
                }),
                Z.createElement("path", {
                  d: "M138.42 137.67s2.1 5.5 8.19 3.29M276.61 137.67s-2.1 5.5-8.19 3.29",
                  stroke: "#191919",
                  strokeWidth: 1.17,
                  strokeMiterlimit: 10,
                  strokeLinecap: "round",
                }),
                Z.createElement("path", {
                  d: "M273.55 133s2 5.67-4.15 8",
                  stroke: "#191919",
                  strokeWidth: 1.17,
                  strokeMiterlimit: 10,
                  strokeLinecap: "round",
                }),
                Z.createElement("path", {
                  d: "M254.39 159.03c8.56 0 15.5-6.94 15.5-15.5 0-8.56-6.94-15.5-15.5-15.5-8.561 0-15.5 6.94-15.5 15.5 0 8.56 6.939 15.5 15.5 15.5Z",
                  fill: "#191919",
                }),
                Z.createElement("path", {
                  d: "M265.75 133c1.49 6.26 1.81 17.93-12.65 25.95a15.473 15.473 0 0 0 15.212-8.642A15.479 15.479 0 0 0 265.75 133Z",
                  fill: "#333",
                }),
                Z.createElement("path", {
                  d: "M248.25 141.9a3.37 3.37 0 1 0 0-6.74 3.37 3.37 0 0 0 0 6.74Z",
                  fill: "#fff",
                }),
                Z.createElement("path", {
                  d: "M334.26 75.56c-1.14-6.62-9.79-4.49-17.89-1.73a12.119 12.119 0 0 0-.31-1.23c8-3.3 15.9-8.26 11.39-13.85-4.37-4.58-10 1-14.93 7.42-.25-.28-.5-.55-.77-.81 5.48-6.42 10-14.1 3.64-17-5.92-2.14-8.42 5.27-10 13.14-.43-.14-.87-.27-1.31-.37 2.14-7.86 2.78-16.1-4-16.11-6.28.51-5.48 8.3-3.69 16.14-.617.144-1.225.328-1.82.55-1.62-7.94-4.11-15.5-10.08-13.35-6.49 3-1.67 10.89 3.94 17.38-.26.28-.52.56-.76.85-5.05-6.54-10.77-12.5-15.24-7.82-4.63 5.73 3.84 10.8 12 14.09-.11.4-.2.8-.28 1.21-8.27-2.86-17.35-5.28-18.52 1.51-.66 7.56 9.79 6.78 18.56 4.84.08.39.17.78.28 1.16-8.2 1.61-16.32 4.07-14.1 10.24 3 6.53 10.93 1.64 17.42-4 .25.28.5.56.76.82-6.52 5.06-12.45 10.79-7.78 15.25 5.56 4.51 10.5-3.38 13.8-11.32.39.15.79.27 1.19.39-2.12 7.84-2.74 16 4 16.05 6.17-.5 5.5-8 3.79-15.74.639-.13 1.27-.297 1.89-.5 3.3 7.87 8.2 15.59 13.72 11.12 4.58-4.39-1-10-7.41-14.95.26-.26.52-.52.77-.8 6.41 5.5 14.11 10.07 17 3.67 2.16-6-5.49-8.5-13.48-10.11.11-.38.21-.77.3-1.15 8.66 1.83 18.57 2.39 17.92-4.99Zm-34 14.89a13.32 13.32 0 1 1 13.31-13.32 13.302 13.302 0 0 1-3.895 9.418 13.302 13.302 0 0 1-9.415 3.902Z",
                  fill: "#fff",
                  stroke: "#CDCCCB",
                  strokeMiterlimit: 10,
                }),
                Z.createElement("path", {
                  d: "M314.24 77.12a13.785 13.785 0 0 1-8.521 12.717 13.779 13.779 0 1 1 8.521-12.717Z",
                  fill: "#EE948F",
                  stroke: "#D78485",
                  strokeMiterlimit: 10,
                }),
                Z.createElement("path", {
                  d: "M812.79 195.57a24.64 24.64 0 0 1-4.44.75c-1.84.2-3.38.28-4.44.31 4.37-10.33-4.42-25.6-15.42-24.6-5.08.46-6 1-9 5s-2.68 9.29.62 13.49a25.231 25.231 0 0 0 14.22 9.14c-4.92 6.73-11.65 7.49-19.94 7.56-3.09 0-8.14.14-12.41-.93v1a13.194 13.194 0 0 1-2.66 7.93c13.24 1.82 27.7-.18 36.92-8.83a30.645 30.645 0 0 0 4.58-4.6c.3-.37.58-.75.85-1.14 3.74.938 7.686.586 11.2-1 6.11-2.93 8.35-11.2 8.4-11.18a8.97 8.97 0 0 1-1.71 2.9 13.74 13.74 0 0 1-6.77 4.2ZM798 192.85c-2.36 1.92-6.84.32-10-3.57-3.16-3.89-3.83-8.61-1.48-10.53s6.84-.32 10 3.58 3.83 8.6 1.48 10.52Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  opacity: 0.29,
                  d: "m786.54 206-.42-.2c-3.46 1.19-7.38 1.43-11.73 1.46a70.938 70.938 0 0 1-8.95-.31l-1.24 8.75c11.82.76 24-1.71 32.08-9.31a30.645 30.645 0 0 0 4.58-4.6c.29-.36.57-.73.83-1.11 1-2.45 1.56-4.12 1.56-4.12-3.19 4.71-16.71 9.44-16.71 9.44Z",
                  fill: "#191919",
                }),
                Z.createElement("path", {
                  d: "M780.49 442.2c0 15.89-78.11 28.8-174.49 28.8-96.38 0-174.45-12.91-174.45-28.8s78.11-28.77 174.45-28.77c96.34 0 174.49 12.88 174.49 28.77Z",
                  fill: "#D7D7D6",
                }),
                Z.createElement("path", {
                  d: "M531.43 380.39s-11.4 41.1-8.36 59.42c0 0-3.85 14.7-15.51 6.2-12.43 8.21-19.23-5-22.74-19.26-3.51-14.26-4.56-93 9.35-106.9 13.91-13.9 45.69 7.77 45.69 7.77s7.44 6.18-8.43 52.77Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M523.07 439.81c-3-18.32 8.36-59.42 8.36-59.42 15.87-46.59 8.43-52.77 8.43-52.77s-31.78-21.64-45.69-7.77c-3 3-5.38 9.19-7.12 17.1 7.36 16.5 23.18 28.21 31.47 43.34 8.81 19.81-14.71 36.34-35.41 31.23.183 5.113.754 10.204 1.71 15.23 3.51 14.21 10.31 27.47 22.74 19.26 11.66 8.5 15.51-6.2 15.51-6.2Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M483.23 413.46a89.02 89.02 0 0 0 1.59 13.29c3.51 14.21 10.31 27.47 22.74 19.26 11.66 8.5 15.51-6.2 15.51-6.2-1-5.93-.45-14.25.72-22.79a67.63 67.63 0 0 1-40.56-3.56Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M496.24 361.3s-10-4.72-11.24 6.71c-1.24 11.43-.23 31.33 1.25 36 1.48 4.67 10.48 2 16.73-13.31s-1.87-26.55-6.74-29.4Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M509.68 421.59s-12.76.92-21-2.56 1.24 21.41 9 23c7.76 1.59 10.32-5.96 10.32-5.96s2.65 4.35 6.39.09c3.74-4.26 8.78-13.16-4.71-14.57Z",
                  fill: "#4B5A6B",
                }),
                Z.createElement("path", {
                  d: "M495.45 423.86s-4.87-2.85-6.16.34 1.49 10.79 5.15 12.92c3.66 2.13 7.17-11.12 1.01-13.26Z",
                  fill: "#7E8390",
                }),
                Z.createElement("path", {
                  d: "M686.89 380.39s11.4 41.1 8.36 59.42c0 0 3.85 14.7 15.51 6.2 12.43 8.21 19.22-5 22.74-19.26 3.52-14.26 4.56-93-9.35-106.9-13.91-13.9-45.69 7.77-45.69 7.77s-7.46 6.18 8.43 52.77Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M695.25 439.81c3-18.32-8.36-59.42-8.36-59.42-15.87-46.59-8.43-52.77-8.43-52.77s31.78-21.64 45.69-7.77c3.05 3 5.38 9.19 7.12 17.1-7.36 16.5-23.18 28.21-31.47 43.34-8.81 19.81 14.71 36.34 35.41 31.23a100.666 100.666 0 0 1-1.71 15.23C730 441 723.19 454.22 710.76 446c-11.66 8.51-15.51-6.19-15.51-6.19Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M735.09 413.46a88.89 88.89 0 0 1-1.59 13.29C730 441 723.19 454.22 710.76 446c-11.66 8.5-15.51-6.2-15.51-6.2 1-5.93.45-14.25-.72-22.79a67.627 67.627 0 0 0 40.56-3.55Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M722.08 361.3s10-4.72 11.24 6.71c1.24 11.43.22 31.33-1.26 36-1.48 4.67-10.48 2-16.72-13.31-6.24-15.31 1.87-26.55 6.74-29.4Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M708.64 421.59s12.76.92 21-2.56-1.24 21.41-9 23c-7.76 1.59-10.29-5.92-10.29-5.92s-2.65 4.35-6.39.09c-3.74-4.26-8.81-13.2 4.68-14.61Z",
                  fill: "#4B5A6B",
                }),
                Z.createElement("path", {
                  d: "M722.87 423.86s4.87-2.85 6.16.34-1.49 10.79-5.15 12.92c-3.66 2.13-7.17-11.12-1.01-13.26Z",
                  fill: "#7E8390",
                }),
                Z.createElement("path", {
                  d: "M462.75 288.67s-32 28.23-39.44 45.24c0 0-11.25 10.2-16.38-3.29-14.9.11-13.35-14.71-8.54-28.54 4.81-13.83 47-80.45 66.18-84.47 19.18-4.02 34 31.44 34 31.44s2.9 9.24-35.82 39.62Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M462.75 288.67s-32 28.23-39.44 45.24c0 0-11.25 10.2-16.38-3.29-14.9.11-13.35-14.71-8.54-28.54a78.405 78.405 0 0 1 4.8-10c10.12 9.82 21.75 15.38 32 5.9 12.44-11.3 7.14-34.75-.48-53.37 11.05-14 22.23-25.42 29.84-27 19.22-4 34 31.44 34 31.44s2.92 9.24-35.8 39.62Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M404.31 290.08a90.111 90.111 0 0 0-5.92 12c-4.81 13.83-6.36 28.65 8.54 28.54 5.13 13.49 16.38 3.29 16.38 3.29 2.42-5.51 7.4-12.19 13-18.71a67.656 67.656 0 0 1-32-25.12Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M415.16 294.24s-5.87-2.24-5.87-6.16 12.87-24.91 17.63-27.43c4.76-2.52 3.92 12.87-.28 22.11s-7.84 12.04-11.48 11.48Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M422.06 331.51s-2.87 4-6.41 4.21c-3.54.21-5.53-4.2-4.43-9.51-3.32 2.43-8.18-.45-8.62-8.19-.44-7.74 7.52-12.39 16.14-7.74 8.62 4.65 13 7.52 10.18 11.5-2.82 3.98-6.86 9.73-6.86 9.73Z",
                  fill: "#4B5A6B",
                }),
                Z.createElement("path", {
                  d: "M422.81 329.2s-2.39 4.67-5.47 5.37c-3.08.7-5-4-.8-7.56 4.2-3.56 8.36-1.59 6.27 2.19Z",
                  fill: "#7E8390",
                }),
                Z.createElement("path", {
                  d: "M758.74 287.62s30.58 29.74 37.19 47.1c0 0 10.74 10.74 16.53-2.48 14.87.83 14-14.05 9.91-28.1s-43-82.63-62-87.59c-19-4.96-35.54 29.75-35.54 29.75s-3.27 9.09 33.91 41.32Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M812.46 332.24c-5.79 13.22-16.53 2.48-16.53 2.48-6.61-17.36-37.19-47.1-37.19-47.1-37.18-32.23-33.88-41.32-33.88-41.32s16.53-34.71 35.54-29.75c6 1.57 14 9.55 22.32 20.15a2.75 2.75 0 0 0-1.66.53c-8.22 23.29-9.59 46.12 5.48 69.41 14.93-5.5 21.71-8.68 27.63-20.37 4.23 8 7.21 14.51 8.2 17.87 4.13 14.05 4.96 28.93-9.91 28.1Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M817 291.87a90.425 90.425 0 0 1 5.33 12.27c4.13 14.05 5 28.93-9.91 28.1-5.79 13.22-16.53 2.48-16.53 2.48-2.14-5.62-6.8-12.54-12.11-19.32A67.575 67.575 0 0 0 817 291.87Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M810.3 286.08s-3.07 7.27-9.23 7.27-15.11-21.83-13.16-33.3c1.95-11.47 20.71 13.95 22.39 26.03Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M804.15 336.18s-2.24 1.68-5.88-2.8c-3.64-4.48-7.84-12.6-6.72-15.68s16-14 22.67-7.83c6.67 6.17 6.44 13.43 2.52 15.95-3.92 2.52-6.16.84-6.16.84s.84 9.52-6.43 9.52Z",
                  fill: "#4B5A6B",
                }),
                Z.createElement("path", {
                  d: "M803.58 335.61s-3.91.57-5.87-6.15c-1.96-6.72 1.4-5.32 5.6-2 4.2 3.32 3.07 7.88.27 8.15Z",
                  fill: "#7E8390",
                }),
                Z.createElement("path", {
                  d: "M749.42 110.92c13.21-17.93 31.75-66.5-2-65.88-28.7.52-56.25 15-64.93 19.93-34.93-10.27-69-9.27-73.08-8.49 0 0-34.19-3.75-72.5 9.3-6.69-4-35.87-20.18-66.32-20.74-34.62-.63-14.16 50.57-.94 67.24a146.482 146.482 0 0 0-10.65 15.4C410.28 209.05 445.22 329 545 361c39.66 12.71 166.65 24 209.9-54.67 33.41-60.8 20.01-153.15-5.48-195.41Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M749.42 110.92c12-16.33 28.46-58 5.85-64.92 17.15 13.06-2.94 51-14.81 46.08-10-3.51-33.28-19.78-52.11-30.28-2.41 1.24-4.4 2.34-5.84 3.17h-.1c19.69 11.69 50.53 29.79 57.13 48.22 24.66 68.85 26.64 131.27-13.69 191.1C700.28 342.2 647.76 353.79 608 357a223.732 223.732 0 0 1-96.78-11.46A152.782 152.782 0 0 0 545 361c39.66 12.71 166.65 24 209.9-54.67 33.41-60.8 20.01-153.15-5.48-195.41Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M554.05 67.49s-86.76 28.1-103.2 89.93c-13.7 51.29 7.31 125.06 53.89 157.38 46.58 32.32 149.67 26.69 183.56-6.63 43.29-42.58 20.64-79.2-9.47-80.74 0 0-38.93-17-53.54-.1-7.29 10.55-40.19 12.67-42.92-4.21-7.31-9.83-21.69-2.88-54.8 7.37C512.89 235 484.89 196 518.89 169c42.28-33.58 165-27.67 191.06 20.33 19.7 36.22 29.23-78.51-14.61-101-43.84-22.49-94.71-27.86-141.29-20.84ZM705.68 81s28.09 19 32.23 26.44c6.61-.83 16.52-29.75 14.87-39.67-1.65-9.92-29.78-7.4-47.1 13.23Z",
                  fill: "#6FC282",
                }),
                Z.createElement("path", {
                  d: "M519.11 88.32s-28.1 19-32.23 26.44c-6.61-.82-16.53-29.74-14.87-39.66 1.66-9.92 29.75-7.44 47.1 13.22Z",
                  fill: "#6FC282",
                }),
                Z.createElement("path", {
                  d: "M752.78 67.8a5.439 5.439 0 0 0-2.54-3.69c-.94 10.06-3.15 25.68-13 27.47-9.26 2.06-21.47-7.31-29.56-12.83-.69.74-1.37 1.49-2 2.28 0 0 28.09 19 32.23 26.44 6.61-.83 16.52-29.75 14.87-39.67ZM483.15 69.48c6.63 3.25 11.69 8.07 14.38 15.25 4.95 11.13-5.74 21.14-15.92 25 1.81 2.91 3.64 4.83 5.27 5 4.13-7.43 32.23-26.44 32.23-26.44-10.81-12.84-25.8-18.65-35.96-18.81Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M484.74 124.46S456.43 155.51 451 193c-5.43 37.49 11.87 21.92 24.66-17.35 12.79-39.27 28.31-59.36 32.88-68.5 4.57-9.14-12.84 4.52-23.8 17.31Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M614.13 56.08a32.287 32.287 0 0 0-4.7.47s-2.71-.38-7.47-.56v17.68a3.645 3.645 0 0 0 1.27 2.75 7.36 7.36 0 0 0 10-.06 3.166 3.166 0 0 0 .92-2.39l-.02-17.89Z",
                  fill: "url(#oinqhandinhand_svg__c)",
                }),
                Z.createElement("path", {
                  d: "M603.7 54.45s-1.83 20.7.86 23.36-6.81-.6-6.81-.6l-4.49-16 2.43-7.85 8.01 1.09ZM612.31 54.45s1.83 20.7-.86 23.36 6.82-.6 6.82-.6l4.48-16-2.43-7.85-8.01 1.09ZM665.85 128.09a1.497 1.497 0 0 1-1.3-.75c-5.88-10.15-15.46-5.45-15.86-5.25a1.496 1.496 0 0 1-1.146.088 1.504 1.504 0 0 1-.214-2.768c.13-.06 12.53-6.15 19.82 6.43a1.506 1.506 0 0 1-.55 2 1.586 1.586 0 0 1-.75.25ZM539 128.09a1.53 1.53 0 0 1-.75-.2 1.513 1.513 0 0 1-.55-2c7.29-12.58 19.69-6.49 19.82-6.43a1.49 1.49 0 0 1 .749.873c.061.188.085.386.069.582a1.488 1.488 0 0 1-.52 1.026 1.5 1.5 0 0 1-1.658.199c-.41-.2-10-4.84-15.86 5.25a1.501 1.501 0 0 1-1.3.7Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M554.39 160.03c8.56 0 15.5-6.94 15.5-15.5 0-8.56-6.94-15.5-15.5-15.5-8.561 0-15.5 6.94-15.5 15.5 0 8.56 6.939 15.5 15.5 15.5Z",
                  fill: "#191919",
                }),
                Z.createElement("path", {
                  d: "M565.75 134c1.49 6.26 1.81 17.93-12.65 25.95a15.473 15.473 0 0 0 15.212-8.642A15.479 15.479 0 0 0 565.75 134Z",
                  fill: "#333",
                }),
                Z.createElement("path", {
                  d: "M548.25 142.9a3.37 3.37 0 1 0 0-6.74 3.37 3.37 0 0 0 0 6.74Z",
                  fill: "#fff",
                }),
                Z.createElement("path", {
                  d: "M649.39 160.03c8.56 0 15.5-6.94 15.5-15.5 0-8.56-6.94-15.5-15.5-15.5-8.561 0-15.5 6.94-15.5 15.5 0 8.56 6.939 15.5 15.5 15.5Z",
                  fill: "#191919",
                }),
                Z.createElement("path", {
                  d: "M660.75 134c1.49 6.26 1.81 17.93-12.65 25.95a15.473 15.473 0 0 0 15.212-8.642A15.479 15.479 0 0 0 660.75 134Z",
                  fill: "#333",
                }),
                Z.createElement("path", {
                  d: "M643.25 142.9a3.37 3.37 0 1 0 0-6.74 3.37 3.37 0 0 0 0 6.74Z",
                  fill: "#fff",
                }),
                Z.createElement("path", {
                  d: "M635 273.6s47.38-2.17 61.15-25.36c0 0 6.73 46.43-31.62 52.71C637.77 305.33 635 273.6 635 273.6Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M637.1 275s44.12-2.7 58.16-23.25c0 0 5.71 39.69-30.59 45.49C639.33 301.3 637.1 275 637.1 275Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M655 306s20 3.14 28.76-8.38",
                  stroke: "#3B9F60",
                  strokeWidth: 0.43,
                  strokeMiterlimit: 10,
                  strokeLinecap: "round",
                }),
                Z.createElement("path", {
                  d: "M725.42 120.4c-.7-1.58-6.32-2.11-19-4.92-20.51-4.56-45.67-5.27-62.53-2.81-16.86 2.46-27.05 8.25-31.27 9.31a51.684 51.684 0 0 1-20.73 0c-4.21-1.06-14.4-6.85-31.27-9.31-16.87-2.46-42-1.75-62.53 2.81-12.65 2.81-18.27 3.34-19 4.92-.73 1.58-1.06 11.24.7 12.47 1.76 1.23 3 1.58 4.39 3.51 1.39 1.93 7.2 23.72 11.07 30.39 3.87 6.67 13.17 17.74 40.58 16.34 27.41-1.4 32.8-6.22 36.89-8.61 12.29-7.2 16.86-33.2 18.26-37.77.82-2.63 2.11-6.67 11.25-6.32 9.13-.35 10.43 3.69 11.24 6.32 1.4 4.57 6 30.57 18.27 37.77 4.08 2.39 9.48 7.2 36.89 8.61 27.41 1.41 36.71-9.66 40.57-16.34 3.86-6.68 9.66-28.45 11.07-30.39 1.41-1.94 2.63-2.28 4.39-3.51 1.76-1.23 1.47-10.87.76-12.47Zm-153.35 48.48c-6.93 6.79-23.54 10.71-36 11.07-12.46.36-27.58-2.29-34.08-9s-9-19.32-10-27.23-1.58-18.09 5.27-21.78c6.85-3.69 23.71-7.38 42-7.56 13.35-.13 36.19 2.29 43.74 11.07 7.85 9.21-2.15 34.82-10.93 43.43Zm140.53-25.12c-1.05 7.91-3.51 20.55-10 27.23s-21.61 9.31-34.08 9c-12.47-.31-29.08-4.28-36-11.07-8.78-8.61-18.78-34.22-10.89-43.39 7.55-8.78 30.39-11.2 43.74-11.07 18.27.18 35.13 3.87 42 7.56 6.87 3.69 6.29 13.84 5.23 21.74Z",
                  fill: "#231F20",
                  stroke: "#231F20",
                  strokeWidth: 2,
                  strokeMiterlimit: 10,
                }),
                Z.createElement("path", {
                  d: "M565.16 167.32s-34.16 9.43-46.92 43.28c-9.12 23.62 1 57.3 36.75 51.11 35.75-6.19 56.1-6.45 76.32-1.92 20.22 4.53 49.17-1.06 53.88-18.43 4.71-17.37 2.89-44.47-20.37-61.8s-57.74-27.01-99.66-12.24Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M523.29 224.14s-2.35 29.39 25.54 30.14 43.66-8.9 89.21-2.24 47.16-23.54 38.47-46.26c-8.69-22.72-41.51-41.43-77.23-40.06-35.72 1.37-70.28 19.81-75.99 58.42Z",
                  fill: "#4DB96E",
                }),
                Z.createElement("path", {
                  d: "M564.5 218.83c-.18 6.61-4.95 11.85-10.65 11.69-5.7-.16-10.18-5.64-10-12.25.18-6.61 5-11.86 10.65-11.7 5.65.16 10.18 5.64 10 12.26Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M567.94 222.2c-.18 6.61-4.94 11.85-10.65 11.7-5.71-.15-10.18-5.64-10-12.26.18-6.62 4.95-11.85 10.65-11.7 5.7.15 10.18 5.65 10 12.26Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M655.27 217.27c-.18 6.62-4.94 11.86-10.65 11.7-5.71-.16-10.18-5.64-10-12.25.18-6.61 4.95-11.86 10.65-11.7 5.7.16 10.18 5.64 10 12.25Z",
                  fill: "#3B9F60",
                }),
                Z.createElement("path", {
                  d: "M658.72 220.65c-.18 6.61-5 11.85-10.66 11.7-5.66-.15-10.17-5.64-10-12.26.17-6.62 4.95-11.85 10.65-11.7 5.7.15 10.19 5.61 10.01 12.26Z",
                  fill: "#242929",
                }),
                Z.createElement("path", {
                  d: "M601.63 169.16s-26.54-.71-33.66 9.37c-1 4.26 12.58 9.77 27.28 5 14.7-4.77 16.75-15.8 6.38-14.37Z",
                  fill: "#A6D7B7",
                }),
                Z.createElement("path", {
                  d: "M669.13 296.5c15.87-5 16.871-10.506 15.87-12.006-1.001-1.5-.441-3.195-15.87 0C653.7 287.689 650.5 290.5 650.5 296c3.5 1 3.2 3.695 18.63.5Z",
                  fill: "#E41F5C",
                })
              )),
            De ||
              (De = Z.createElement(
                "defs",
                null,
                Z.createElement(
                  "linearGradient",
                  {
                    id: "oinqhandinhand_svg__b",
                    x1: 213.04,
                    y1: 77.35,
                    x2: 213.04,
                    y2: 54.99,
                    gradientUnits: "userSpaceOnUse",
                  },
                  Z.createElement("stop", { stopColor: "#242929" }),
                  Z.createElement("stop", { offset: 1, stopColor: "#242929" })
                ),
                Z.createElement(
                  "linearGradient",
                  {
                    id: "oinqhandinhand_svg__c",
                    x1: 608.04,
                    y1: 78.35,
                    x2: 608.04,
                    y2: 55.99,
                    gradientUnits: "userSpaceOnUse",
                  },
                  Z.createElement("stop", { stopColor: "#242929" }),
                  Z.createElement("stop", { offset: 1, stopColor: "#242929" })
                ),
                Z.createElement(
                  "clipPath",
                  { id: "oinqhandinhand_svg__a" },
                  Z.createElement("path", {
                    fill: "#fff",
                    d: "M0 0h825v506H0z",
                  })
                )
              ))
          );
        },
        Ve = a(44824),
        We = a(46542),
        Ye = function () {
          var e,
            t = (0, N.useLazyLoadQuery)(We, {}),
            a =
              null === (e = t.userData) || void 0 === e
                ? void 0
                : e.currency.currencySymbol;
          if (t.referralInvites && t.referralInvites.edges.length > 0) {
            var s = new Map();
            return (
              t.referralInvites.edges.map(function (e) {
                return s.set(e.node.inviteType, e.node.token);
              }),
              (0, P.jsxs)("section", {
                className: b().root,
                children: [
                  (0, P.jsx)(Le.Z, {
                    component: "h1",
                    className: b().title,
                    children: "Refer a friend to Qmee",
                  }),
                  (0, P.jsxs)(Le.Z, {
                    component: "p",
                    children: [
                      "For every friend that signs up to use Qmee through one of your links, a",
                      " ",
                      (0, P.jsxs)(Le.Z, {
                        component: "span",
                        skipTranslation: !0,
                        children: [a, "1"],
                      }),
                      " ",
                      "reward will be earned on their first cash out by PayPal or gift card!",
                    ],
                  }),
                  (0, P.jsx)(Le.Z, {
                    component: C.Z,
                    to: x.LT.path,
                    children: "See your Referral Rewards",
                  }),
                  (0, P.jsx)(Le.Z, { component: "p", children: "Remember..." }),
                  (0, P.jsxs)("ol", {
                    children: [
                      (0, P.jsxs)("li", {
                        children: [
                          (0, P.jsx)(Le.Z, {
                            component: "p",
                            children:
                              "The person you refer has to sign up with the link we provide to you, and they must sign up through the website (either via a desktop or mobile).",
                          }),
                          (0, P.jsx)(Le.Z, {
                            className: b().highlight,
                            component: "b",
                            children:
                              "*Please be aware, your link won't work through the Qmee mobile app - so make sure the person you refer doesn't sign up using the app.",
                          }),
                        ],
                      }),
                      (0, P.jsxs)(Le.Z, {
                        component: "li",
                        children: [
                          "You will only receive your referral bonus when they",
                          " ",
                          (0, P.jsx)(Le.Z, {
                            component: "b",
                            children: "cash out via PayPal or Gift Card",
                          }),
                        ],
                      }),
                      (0, P.jsx)(Le.Z, {
                        component: "li",
                        children:
                          "You are only permitted to have one account of your own - you can't refer yourself!",
                      }),
                    ],
                  }),
                  (0, P.jsxs)(Le.Z, {
                    component: "p",
                    children: [
                      "Choose what happens to your",
                      " ",
                      (0, P.jsxs)(Le.Z, {
                        component: "span",
                        skipTranslation: !0,
                        children: [a, "1"],
                      }),
                      " ",
                      "reward (Keep, Share or Give!) by deciding which of your links to use...",
                    ],
                  }),
                  (0, P.jsx)(Ve.Z, {
                    children: Ae.map(function (e) {
                      return s.get(e.inviteType)
                        ? (0, P.jsx)(
                            Ke,
                            {
                              token: s.get(e.inviteType),
                              invite: e,
                              currencySymbol: a,
                            },
                            e.inviteType
                          )
                        : null;
                    }),
                  }),
                  (0, P.jsx)("div", {
                    className: b().cardContainer,
                    children: (0, P.jsx)("div", {
                      className: b().innerContainer,
                    }),
                  }),
                ],
              })
            );
          }
          return (0, P.jsxs)("section", {
            className: b().noData,
            children: [
              (0, P.jsxs)(Le.Z, {
                component: "p",
                children: [
                  "Invites aren't available to you just yet but take a look at our blog to find out more more information about",
                  " ",
                  (0, P.jsx)(Le.Z, {
                    component: C.Z,
                    to: "".concat(x.Ec.path, "/how-to-invite-friends"),
                    children: "inviting your friends",
                  }),
                  " ",
                  "to Qmee.",
                ],
              }),
              (0, P.jsxs)(Le.Z, {
                component: "p",
                children: [
                  "If you have any queries, please contact our Support team on",
                  " ",
                  (0, P.jsx)(C.Z, {
                    to: "mailto:support@qmee.com",
                    children: "support@qmee.com",
                  }),
                ],
              }),
              (0, P.jsx)(Qe, {}),
            ],
          });
        },
        He = (0, a(82688).bg)(Ye, {
          requiresAuthentication: !0,
          metaData: { title: "Refer", description: "Refer a friend to Qmee" },
        });
    },
    11570: function (e) {
      e.exports = {
        root: "Card_root__qEP3_",
        interactive: "Card_interactive__f7luR",
        outlined: "Card_outlined__uy0qq",
      };
    },
    48556: function (e) {
      e.exports = {
        root: "Copyable_root__kPoGD",
        text: "Copyable_text__khaq5",
        iconContainer: "Copyable_iconContainer__ITvhj",
        icon: "Copyable_icon__Z9dhZ",
      };
    },
    31636: function (e) {
      e.exports = { root: "ItemList_root__jjHJx" };
    },
    21238: function (e) {
      e.exports = {
        root: "ReferralInviteCard_root__l2eX1",
        card: "ReferralInviteCard_card__HdTg0",
        inviteDescription: "ReferralInviteCard_inviteDescription__1l2sk",
        content: "ReferralInviteCard_content__NllN_",
        image: "ReferralInviteCard_image__Mz6R_",
      };
    },
    40668: function (e) {
      e.exports = {
        root: "ReferralInvites_root__0MzkQ",
        highlight: "ReferralInvites_highlight__BlVY_",
        title: "ReferralInvites_title__bFN7f",
        cardContainer: "ReferralInvites_cardContainer__Xdvxi",
        innerContainer: "ReferralInvites_innerContainer__pEfBq",
        noData: "ReferralInvites_noData__e0Env",
      };
    },
  },
  function (e) {
    e.O(0, [3862, 7794, 4244, 6178, 9774, 2888, 179], function () {
      return (t = 98180), e((e.s = t));
      var t;
    });
    var t = e.O();
    _N_E = t;
  },
]);
//# sourceMappingURL=refer-868a9bb9effc2e64.js.map
