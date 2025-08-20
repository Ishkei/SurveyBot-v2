(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9147],
  {
    32960: function (e, n, t) {
      "use strict";
      var a,
        l = t(67294);
      function i() {
        return (
          (i = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }
                return e;
              }),
          i.apply(this, arguments)
        );
      }
      n.Z = function (e) {
        return l.createElement(
          "svg",
          i(
            {
              fill: "#69eda2",
              viewBox: "0 0 22 18",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          a ||
            (a = l.createElement("path", {
              d: "M8.424 17.218a1.12 1.12 0 0 1-1.588 0L.494 10.875a1.684 1.684 0 0 1 0-2.382l.794-.795a1.684 1.684 0 0 1 2.382 0l3.96 3.96 10.7-10.7a1.684 1.684 0 0 1 2.382 0l.794.795a1.684 1.684 0 0 1 0 2.382L8.424 17.218Z",
            }))
        );
      };
    },
    61284: function (e, n, t) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/account/explore",
        function () {
          return t(14171);
        },
      ]);
    },
    14480: function (e, n, t) {
      "use strict";
      var a = t(85893);
      t(67294);
      n.Z = function (e) {
        var n = e.color,
          t = e.className;
        return (0, a.jsx)("svg", {
          className: t,
          xmlns: "http://www.w3.org/2000/svg",
          width: "12",
          height: "13",
          viewBox: "0 0 12 22",
          children: (0, a.jsxs)("g", {
            fill: "none",
            fillRule: "evenodd",
            stroke: n || "currentColor",
            strokeWidth: "2",
            transform: "rotate(-180 5.5 10.5)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              (0, a.jsx)("polygon", { points: "9.864 10 .197 0" }),
              (0, a.jsx)("path", { d: "M9.86363636,10 L0.196969697,20" }),
            ],
          }),
        });
      };
    },
    4542: function (e, n, t) {
      "use strict";
      var a = t(85893),
        l = t(86010),
        i = t(67294),
        r = t(11570),
        s = t.n(r),
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
          a,
          l = (function (e, n) {
            if (null == e) return {};
            var t,
              a,
              l = {},
              i = Object.keys(e);
            for (a = 0; a < i.length; a++)
              (t = i[a]), n.indexOf(t) >= 0 || (l[t] = e[t]);
            return l;
          })(e, n);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          for (a = 0; a < i.length; a++)
            (t = i[a]),
              n.indexOf(t) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, t) &&
                  (l[t] = e[t]));
        }
        return l;
      }
      function d(e, n) {
        var t = e.className,
          i = e.children,
          r = e.component,
          d = e.interactive,
          k = u(e, ["className", "children", "component", "interactive"]),
          m = r || "div";
        return (0, a.jsx)(
          m,
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = null != arguments[n] ? arguments[n] : {},
                a = Object.keys(t);
              "function" === typeof Object.getOwnPropertySymbols &&
                (a = a.concat(
                  Object.getOwnPropertySymbols(t).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                  })
                )),
                a.forEach(function (n) {
                  c(e, n, t[n]);
                });
            }
            return e;
          })(
            {
              className: (0, l.Z)(
                s().root,
                d || r === o.Z ? s().interactive : s().outlined,
                t
              ),
            },
            k,
            { ref: n, children: i }
          )
        );
      }
      n.Z = i.forwardRef(d);
    },
    49594: function (e, n, t) {
      "use strict";
      var a = t(85893),
        l = t(86010),
        i = t(67294),
        r = t(69926),
        s = t(14480),
        o = t(84646),
        c = t(95832),
        u = t.n(c);
      function d(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, a = new Array(n); t < n; t++) a[t] = e[t];
        return a;
      }
      function k(e, n, t) {
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
      function m(e, n) {
        if (null == e) return {};
        var t,
          a,
          l = (function (e, n) {
            if (null == e) return {};
            var t,
              a,
              l = {},
              i = Object.keys(e);
            for (a = 0; a < i.length; a++)
              (t = i[a]), n.indexOf(t) >= 0 || (l[t] = e[t]);
            return l;
          })(e, n);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          for (a = 0; a < i.length; a++)
            (t = i[a]),
              n.indexOf(t) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, t) &&
                  (l[t] = e[t]));
        }
        return l;
      }
      function g(e, n) {
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
              var a,
                l,
                i = [],
                r = !0,
                s = !1;
              try {
                for (
                  t = t.call(e);
                  !(r = (a = t.next()).done) &&
                  (i.push(a.value), !n || i.length !== n);
                  r = !0
                );
              } catch (o) {
                (s = !0), (l = o);
              } finally {
                try {
                  r || null == t.return || t.return();
                } finally {
                  if (s) throw l;
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
      n.Z = function (e) {
        var n,
          t,
          c = e.title,
          d = e.className,
          p = e.headerClassName,
          f = e.contentClassName,
          h = e.children,
          y = e.startOpen,
          T = e.open,
          _ = e.skipTitleTranslation,
          v = e.id,
          C = e.onOpen,
          b = e.headerIcon,
          F = m(e, [
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
          x = i.useRef(null),
          j = g(i.useState(y || T), 2),
          I = j[0],
          L = j[1],
          w = g(i.useState(!1), 2),
          K = w[0],
          O = w[1],
          E = g(i.useState(!0), 2),
          S = E[0],
          P = E[1],
          Z = (0, r.q_)({
            from: {
              maxHeight: I
                ? 0
                : null === (n = x.current) || void 0 === n
                ? void 0
                : n.scrollHeight,
            },
            to: {
              maxHeight: I
                ? null === (t = x.current) || void 0 === t
                  ? void 0
                  : t.scrollHeight
                : 0,
            },
            onRest: function () {
              return P(!1);
            },
          });
        return (
          i.useEffect(
            function () {
              K && P(!0);
            },
            [K]
          ),
          i.useEffect(
            function () {
              I || K ? (P(!0), O(!0)) : P(!1), void 0 !== T && I !== T && L(T);
            },
            [T, I, K]
          ),
          (0, a.jsxs)(
            "div",
            (function (e) {
              for (var n = 1; n < arguments.length; n++) {
                var t = null != arguments[n] ? arguments[n] : {},
                  a = Object.keys(t);
                "function" === typeof Object.getOwnPropertySymbols &&
                  (a = a.concat(
                    Object.getOwnPropertySymbols(t).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })
                  )),
                  a.forEach(function (n) {
                    k(e, n, t[n]);
                  });
              }
              return e;
            })({ id: v, className: (0, l.Z)(u().root, d) }, F, {
              children: [
                Boolean(c) &&
                  (0, a.jsxs)("button", {
                    className: (0, l.Z)(p),
                    type: "button",
                    onClick: function () {
                      C && C(v || "", !I), void 0 === T && L(!I);
                    },
                    children: [
                      (0, a.jsx)(o.Z, { skipTranslation: _, children: c }),
                      (0, a.jsx)(s.Z, {
                        className: (0, l.Z)(
                          u().icon,
                          I ? u().iconOpen : u().iconClosed
                        ),
                      }),
                      b,
                    ],
                  }),
                S
                  ? (0, a.jsx)(r.q.div, {
                      style: Z,
                      className: (0, l.Z)(u().content, f),
                      ref: x,
                      children: h,
                    })
                  : (0, a.jsx)("div", {
                      style: { maxHeight: I ? "auto" : 0 },
                      className: (0, l.Z)(u().content, I && u().openContent, f),
                      ref: x,
                      children: h,
                    }),
              ],
            })
          )
        );
      };
    },
    47528: function (e, n, t) {
      "use strict";
      var a = t(85893),
        l = t(86010),
        i = t(67294),
        r = t(28090),
        s = t.n(r);
      function o(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, a = new Array(n); t < n; t++) a[t] = e[t];
        return a;
      }
      function c(e, n) {
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
              var a,
                l,
                i = [],
                r = !0,
                s = !1;
              try {
                for (
                  t = t.call(e);
                  !(r = (a = t.next()).done) &&
                  (i.push(a.value), !n || i.length !== n);
                  r = !0
                );
              } catch (o) {
                (s = !0), (l = o);
              } finally {
                try {
                  r || null == t.return || t.return();
                } finally {
                  if (s) throw l;
                }
              }
              return i;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return o(e, n);
            var t = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === t && e.constructor && (t = e.constructor.name);
            if ("Map" === t || "Set" === t) return Array.from(t);
            if (
              "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            )
              return o(e, n);
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
          t = e.diameterInPixels,
          r = e.progressPercentage,
          o = e.thickness,
          u = 0.5 * (t - o),
          d = c(i.useState(2 * Math.PI * u), 2),
          k = d[0],
          m = d[1],
          g = c(i.useState(k), 2),
          p = g[0],
          f = g[1];
        return (
          i.useEffect(
            function () {
              m(2 * Math.PI * u);
            },
            [u]
          ),
          i.useEffect(
            function () {
              r >= 0 && r <= 100 && f(k - (r / 100) * k);
            },
            [r, k]
          ),
          (0, a.jsx)("svg", {
            className: (0, l.Z)(s().root, n),
            width: "".concat(t),
            height: "".concat(t),
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, a.jsx)("circle", {
              cx: "".concat(Math.floor(t / 2)),
              cy: "".concat(Math.floor(t / 2)),
              r: "".concat(u),
              stroke: "currentColor",
              strokeWidth: "".concat(o),
              fill: "none",
              strokeDasharray: "".concat(k, " ").concat(k),
              strokeDashoffset: "".concat(p),
              style: { transition: "0.5s" },
            }),
          })
        );
      };
    },
    44824: function (e, n, t) {
      "use strict";
      var a = t(85893),
        l = (t(67294), t(86010)),
        i = t(87794),
        r = t(31636),
        s = t.n(r),
        o = i.Z;
      n.Z = function (e) {
        var n = e.className,
          t = e.children;
        return e.animate
          ? (0, a.jsx)(o, {
              typeName: "ul",
              className: (0, l.Z)(s().root, n),
              children: t,
            })
          : (0, a.jsx)("ul", { className: (0, l.Z)(s().root, n), children: t });
      };
    },
    92760: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "input" }],
          n = [{ kind: "Variable", name: "input", variableName: "input" }],
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          a = [
            t,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "key",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "completed",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "description",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "title",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "hidden",
              storageKey: null,
            },
          ],
          l = [
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
            {
              alias: null,
              args: null,
              concreteType: "TaskEdge",
              kind: "LinkedField",
              name: "edges",
              plural: !0,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Task",
                  kind: "LinkedField",
                  name: "node",
                  plural: !1,
                  selections: a,
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            t,
          ];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "TaskItemHideMutation",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: "TaskUpdatePayload",
                kind: "LinkedField",
                name: "hideTask",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "Task",
                    kind: "LinkedField",
                    name: "task",
                    plural: !1,
                    selections: [
                      {
                        args: null,
                        kind: "FragmentSpread",
                        name: "TaskItem_task",
                      },
                    ],
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskChecklist",
                    kind: "LinkedField",
                    name: "checklist",
                    plural: !1,
                    selections: [
                      {
                        args: null,
                        kind: "FragmentSpread",
                        name: "TaskChecklist_checklist",
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
            type: "Mutation",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "TaskItemHideMutation",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: "TaskUpdatePayload",
                kind: "LinkedField",
                name: "hideTask",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "Task",
                    kind: "LinkedField",
                    name: "task",
                    plural: !1,
                    selections: a,
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskChecklist",
                    kind: "LinkedField",
                    name: "checklist",
                    plural: !1,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "remaining",
                        plural: !1,
                        selections: l,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "completed",
                        plural: !1,
                        selections: l,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "hidden",
                        plural: !1,
                        selections: l,
                        storageKey: null,
                      },
                      t,
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "7a550e291229fa81987aacb1cb180da9",
            id: null,
            metadata: {},
            name: "TaskItemHideMutation",
            operationKind: "mutation",
            text: "mutation TaskItemHideMutation(\n  $input: ToggleHideInput!\n) {\n  hideTask(input: $input) {\n    task {\n      ...TaskItem_task\n      id\n    }\n    checklist {\n      ...TaskChecklist_checklist\n      id\n    }\n  }\n}\n\nfragment TaskChecklist_checklist on TaskChecklist {\n  remaining {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  completed {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  hidden {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  id\n}\n\nfragment TaskItem_task on Task {\n  id\n  key\n  completed\n  description\n  title\n  hidden\n}\n\nfragment TaskList_taskConnection on TaskConnection {\n  edges {\n    node {\n      id\n      ...TaskItem_task\n    }\n  }\n}\n",
          },
        };
      })();
      (a.hash = "89f727cc671a80d267ac89a82d5f60e9"), (n.default = a);
    },
    20200: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "input" }],
          n = [{ kind: "Variable", name: "input", variableName: "input" }],
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          a = [
            t,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "key",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "completed",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "description",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "title",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "hidden",
              storageKey: null,
            },
          ],
          l = [
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
            {
              alias: null,
              args: null,
              concreteType: "TaskEdge",
              kind: "LinkedField",
              name: "edges",
              plural: !0,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Task",
                  kind: "LinkedField",
                  name: "node",
                  plural: !1,
                  selections: a,
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            t,
          ];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "TaskItemUnhideMutation",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: "TaskUpdatePayload",
                kind: "LinkedField",
                name: "unhideTask",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "Task",
                    kind: "LinkedField",
                    name: "task",
                    plural: !1,
                    selections: [
                      {
                        args: null,
                        kind: "FragmentSpread",
                        name: "TaskItem_task",
                      },
                    ],
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskChecklist",
                    kind: "LinkedField",
                    name: "checklist",
                    plural: !1,
                    selections: [
                      {
                        args: null,
                        kind: "FragmentSpread",
                        name: "TaskChecklist_checklist",
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
            type: "Mutation",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "TaskItemUnhideMutation",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: "TaskUpdatePayload",
                kind: "LinkedField",
                name: "unhideTask",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "Task",
                    kind: "LinkedField",
                    name: "task",
                    plural: !1,
                    selections: a,
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskChecklist",
                    kind: "LinkedField",
                    name: "checklist",
                    plural: !1,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "remaining",
                        plural: !1,
                        selections: l,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "completed",
                        plural: !1,
                        selections: l,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "hidden",
                        plural: !1,
                        selections: l,
                        storageKey: null,
                      },
                      t,
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "26ad9280924251998ba5f7879e9eba15",
            id: null,
            metadata: {},
            name: "TaskItemUnhideMutation",
            operationKind: "mutation",
            text: "mutation TaskItemUnhideMutation(\n  $input: ToggleHideInput!\n) {\n  unhideTask(input: $input) {\n    task {\n      ...TaskItem_task\n      id\n    }\n    checklist {\n      ...TaskChecklist_checklist\n      id\n    }\n  }\n}\n\nfragment TaskChecklist_checklist on TaskChecklist {\n  remaining {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  completed {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  hidden {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  id\n}\n\nfragment TaskItem_task on Task {\n  id\n  key\n  completed\n  description\n  title\n  hidden\n}\n\nfragment TaskList_taskConnection on TaskConnection {\n  edges {\n    node {\n      id\n      ...TaskItem_task\n    }\n  }\n}\n",
          },
        };
      })();
      (a.hash = "b813d8a23c9261c55099deb2c1870cfa"), (n.default = a);
    },
    27191: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = {
        argumentDefinitions: [],
        kind: "Fragment",
        metadata: null,
        name: "TaskItem_task",
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
            name: "key",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "completed",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "description",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "title",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "hidden",
            storageKey: null,
          },
        ],
        type: "Task",
        abstractKey: null,
        hash: "e030320404ef1b97dadf58b8c9349762",
      };
      n.default = a;
    },
    52709: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = {
        argumentDefinitions: [],
        kind: "Fragment",
        metadata: null,
        name: "TaskList_taskConnection",
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "TaskEdge",
            kind: "LinkedField",
            name: "edges",
            plural: !0,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "Task",
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "id",
                    storageKey: null,
                  },
                  { args: null, kind: "FragmentSpread", name: "TaskItem_task" },
                ],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        type: "TaskConnection",
        abstractKey: null,
        hash: "2657e2b40ae7bbafcdb1be2f942070f8",
      };
      n.default = a;
    },
    16776: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = (function () {
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
            {
              alias: null,
              args: null,
              concreteType: "TaskEdge",
              kind: "LinkedField",
              name: "edges",
              plural: !0,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Task",
                  kind: "LinkedField",
                  name: "node",
                  plural: !1,
                  selections: [
                    e,
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "key",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "completed",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "description",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "title",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "hidden",
                      storageKey: null,
                    },
                  ],
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
            name: "TaskChecklistPageQuery",
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
                    name: "TaskChecklist_checklist",
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
            name: "TaskChecklistPageQuery",
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
                  {
                    alias: null,
                    args: null,
                    concreteType: "TaskConnection",
                    kind: "LinkedField",
                    name: "hidden",
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
            cacheID: "7b932e215ec48fc581cac70e68088ff4",
            id: null,
            metadata: {},
            name: "TaskChecklistPageQuery",
            operationKind: "query",
            text: "query TaskChecklistPageQuery {\n  tasks {\n    ...TaskChecklist_checklist\n    id\n  }\n}\n\nfragment TaskChecklist_checklist on TaskChecklist {\n  remaining {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  completed {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  hidden {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  id\n}\n\nfragment TaskItem_task on Task {\n  id\n  key\n  completed\n  description\n  title\n  hidden\n}\n\nfragment TaskList_taskConnection on TaskConnection {\n  edges {\n    node {\n      id\n      ...TaskItem_task\n    }\n  }\n}\n",
          },
        };
      })();
      (a.hash = "601583b70cce7a2518aac5d33093dec8"), (n.default = a);
    },
    36099: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          n = [{ kind: "Variable", name: "id", variableName: "id" }],
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          a = [
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
            {
              alias: null,
              args: null,
              concreteType: "TaskEdge",
              kind: "LinkedField",
              name: "edges",
              plural: !0,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Task",
                  kind: "LinkedField",
                  name: "node",
                  plural: !1,
                  selections: [
                    t,
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "key",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "completed",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "description",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "title",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "hidden",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            t,
          ];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "TaskChecklistRefetchQuery",
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
                    name: "TaskChecklist_checklist",
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
            name: "TaskChecklistRefetchQuery",
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
                  t,
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
                        selections: a,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "completed",
                        plural: !1,
                        selections: a,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "TaskConnection",
                        kind: "LinkedField",
                        name: "hidden",
                        plural: !1,
                        selections: a,
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
            cacheID: "fa8df7d0bbe5b09187a1d6a796c762e2",
            id: null,
            metadata: {},
            name: "TaskChecklistRefetchQuery",
            operationKind: "query",
            text: "query TaskChecklistRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...TaskChecklist_checklist\n    id\n  }\n}\n\nfragment TaskChecklist_checklist on TaskChecklist {\n  remaining {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  completed {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  hidden {\n    pageInfo {\n      totalCount\n    }\n    ...TaskList_taskConnection\n    id\n  }\n  id\n}\n\nfragment TaskItem_task on Task {\n  id\n  key\n  completed\n  description\n  title\n  hidden\n}\n\nfragment TaskList_taskConnection on TaskConnection {\n  edges {\n    node {\n      id\n      ...TaskItem_task\n    }\n  }\n}\n",
          },
        };
      })();
      (a.hash = "1d98dfc855ff0d062a6329b0019c49db"), (n.default = a);
    },
    83029: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = (function () {
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
          {
            args: null,
            kind: "FragmentSpread",
            name: "TaskList_taskConnection",
          },
        ];
        return {
          argumentDefinitions: [],
          kind: "Fragment",
          metadata: {
            refetch: {
              connection: null,
              fragmentPathInResult: ["node"],
              operation: t(36099),
              identifierField: "id",
            },
          },
          name: "TaskChecklist_checklist",
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
              concreteType: "TaskConnection",
              kind: "LinkedField",
              name: "hidden",
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
      (a.hash = "1d98dfc855ff0d062a6329b0019c49db"), (n.default = a);
    },
    14171: function (e, n, t) {
      "use strict";
      t.r(n),
        t.d(n, {
          default: function () {
            return oe;
          },
        });
      var a,
        l,
        i = t(85893),
        r = t(67294),
        s = (t(22578), t(67912)),
        o = t(63704),
        c = t.n(o),
        u = t(11259),
        d = t.n(u),
        k = t(83364),
        m = t.n(k),
        g = t(86010);
      function p() {
        return (
          (p = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }
                return e;
              }),
          p.apply(this, arguments)
        );
      }
      var f,
        h,
        y,
        T = function (e) {
          return r.createElement(
            "svg",
            p(
              {
                height: 42,
                viewBox: "0 0 43 42",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            a ||
              (a = r.createElement(
                "g",
                { clipPath: "url(#challenge_svg__a)" },
                r.createElement("path", {
                  d: "M2.429 13.63 13.743 2.485l15.882-.12 11.091 10.923-.12 15.566L29.283 40l-15.881.12L2.31 29.197l.119-15.567Z",
                  fill: "url(#challenge_svg__b)",
                  stroke: "#CECECE",
                  strokeWidth: 5,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }),
                r.createElement("path", {
                  d: "M22.096 13.336c-4.4 0-7.436 3.828-7.436 8.272 0 2.948 1.716 7.656 7.326 7.656 3.3 0 5.456-1.738 6.688-4.62l-3.102-2.398h-.176c-.572 2.332-1.804 3.41-3.454 3.41-2.376 0-3.388-2.222-3.388-4.224 0-2.706 1.452-4.51 3.542-4.51 1.386 0 2.486 1.012 3.146 2.97h.176l2.596-2.75c-.924-2.178-3.168-3.806-5.918-3.806Z",
                  fill: "#727272",
                })
              )),
            l ||
              (l = r.createElement(
                "defs",
                null,
                r.createElement(
                  "linearGradient",
                  {
                    id: "challenge_svg__b",
                    x1: 12.711,
                    y1: -0.007,
                    x2: 30.315,
                    y2: 42.492,
                    gradientUnits: "userSpaceOnUse",
                  },
                  r.createElement("stop", { stopColor: "#A4A4A4" }),
                  r.createElement("stop", { offset: 1, stopColor: "#E3E3E3" })
                ),
                r.createElement(
                  "clipPath",
                  { id: "challenge_svg__a" },
                  r.createElement("path", { fill: "#fff", d: "M0 0h43v42H0z" })
                )
              ))
          );
        };
      function _() {
        return (
          (_ = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }
                return e;
              }),
          _.apply(this, arguments)
        );
      }
      var v,
        C,
        b,
        F,
        x = function (e) {
          return r.createElement(
            "svg",
            _(
              {
                height: 66,
                viewBox: "0 0 66 66",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            f ||
              (f = r.createElement("path", {
                d: "m13.15 24.802 11.767-11.59 16.516-.125 11.516 11.34-.124 16.161-11.767 11.59-16.516.125-11.515-11.34.124-16.161Z",
                fill: "url(#diamond_svg__a)",
                stroke: "#FF981F",
                strokeWidth: 7,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              })),
            h ||
              (h = r.createElement(
                "g",
                { clipPath: "url(#diamond_svg__b)" },
                r.createElement("path", {
                  d: "M40.368 23.9H25.633L21 30.218 33.05 46.1 45 30.216 40.368 23.9Zm-12.78 7.012 3.394 10.143-7.695-10.143h4.3Zm1.478 0h7.873l-3.91 11.841-3.963-11.84Zm9.35 0h4.305L35.05 41.11l3.366-10.197Zm1.241-5.61 3.086 4.208h-4.326l-1.38-4.207h2.62Zm-4.096 0 1.38 4.208h-7.88l1.38-4.207h5.12Zm-9.217 0h2.62l-1.38 4.208H23.26l3.085-4.207Z",
                  fill: "#fff",
                })
              )),
            y ||
              (y = r.createElement(
                "defs",
                null,
                r.createElement(
                  "linearGradient",
                  {
                    id: "diamond_svg__a",
                    x1: 23.472,
                    y1: 9.722,
                    x2: 42.503,
                    y2: 55.668,
                    gradientUnits: "userSpaceOnUse",
                  },
                  r.createElement("stop", { stopColor: "#F1A608" }),
                  r.createElement("stop", { offset: 1, stopColor: "#FFB200" })
                ),
                r.createElement(
                  "clipPath",
                  { id: "diamond_svg__b" },
                  r.createElement("path", {
                    fill: "#fff",
                    transform: "translate(21 23)",
                    d: "M0 0h24v24H0z",
                  })
                )
              ))
          );
        };
      function j() {
        return (
          (j = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }
                return e;
              }),
          j.apply(this, arguments)
        );
      }
      var I,
        L,
        w,
        K = function (e) {
          return r.createElement(
            "svg",
            j(
              {
                height: 66,
                viewBox: "0 0 66 66",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            v ||
              (v = r.createElement("path", {
                d: "m13.15 24.802 11.767-11.59 16.516-.125 11.516 11.34-.124 16.161-11.767 11.59-16.516.125-11.515-11.34.124-16.161Z",
                fill: "url(#fire_svg__a)",
                stroke: "#EE2020",
                strokeWidth: 7,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              })),
            C ||
              (C = r.createElement("path", {
                d: "m26.838 31.899-1.313 3.737 1.01 2.93 2.122 2.222.707-6.566 3.232-3.232-.808 2.93 1.92 1.716h2.626l1.11 1.617-.707 3.939 3.334-3.94-.202-4.949-2.626-5.252-4.344-3.839-.909 3.131-5.151 5.556Z",
                fill: "#fff",
              })),
            b ||
              (b = r.createElement("path", {
                d: "M25.181 35.553c0 3.786 3.622 6.244 3.776 6.346a.586.586 0 0 0 .888-.648c-.918-3.215-.814-6.555 1.665-8.82-.303 1.113-.222 2.02.24 2.698.888 1.306 2.864 1.274 4.42 1.04 1.205 1.063.346 3.527-.382 4.98-.268.537.354 1.08.85.75 2.625-1.75 4.028-3.947 4.17-6.53.26-4.724-4.074-10.245-7.634-13.231a.586.586 0 0 0-.963.448c0 3.292-1.714 4.9-3.528 6.602-1.722 1.615-3.502 3.284-3.502 6.365Zm8.122-11.714c2.969 2.833 6.561 7.382 6.335 11.468-.087 1.573-.743 2.99-1.956 4.232.95-3.428-1.009-4.46-1.108-4.51a.586.586 0 0 0-.358-.054c-1.852.31-3.061.134-3.497-.505-.606-.886.237-2.726.58-3.302.289-.48-.2-1.053-.72-.845-1.786.714-5.236 3.59-4.262 9.48-.909-.948-1.964-2.438-1.964-4.25 0-2.573 1.451-3.934 3.131-5.51 1.615-1.515 3.42-3.21 3.819-6.204Z",
                fill: "#fff",
              })),
            F ||
              (F = r.createElement(
                "defs",
                null,
                r.createElement(
                  "linearGradient",
                  {
                    id: "fire_svg__a",
                    x1: 23.472,
                    y1: 9.722,
                    x2: 42.503,
                    y2: 55.668,
                    gradientUnits: "userSpaceOnUse",
                  },
                  r.createElement("stop", { stopColor: "#FA1515" }),
                  r.createElement("stop", { offset: 1, stopColor: "#FE7347" })
                )
              ))
          );
        };
      function O() {
        return (
          (O = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }
                return e;
              }),
          O.apply(this, arguments)
        );
      }
      var E,
        S = function (e) {
          return r.createElement(
            "svg",
            O(
              {
                height: 66,
                viewBox: "0 0 66 66",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            I ||
              (I = r.createElement("path", {
                d: "m13.15 24.802 11.767-11.59 16.516-.125 11.516 11.34-.124 16.161-11.767 11.59-16.516.125-11.515-11.34.124-16.161Z",
                fill: "url(#lightning_svg__a)",
                stroke: "#FCD43B",
                strokeWidth: 7,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              })),
            L ||
              (L = r.createElement("path", {
                d: "M40.812 30.025a.553.553 0 0 0-.206-.201.58.58 0 0 0-.283-.074h-7.37l1.236-9.09a.528.528 0 0 0-.084-.347.562.562 0 0 0-.29-.223.586.586 0 0 0-.37-.002.564.564 0 0 0-.293.218l-8.96 15.119a.527.527 0 0 0 .194.75.58.58 0 0 0 .284.075h7.259l-.979 9.103a.53.53 0 0 0 .093.344c.07.1.173.177.293.215.12.038.25.037.368-.004a.563.563 0 0 0 .288-.221l8.813-15.117a.527.527 0 0 0 .007-.545Z",
                fill: "#fff",
              })),
            w ||
              (w = r.createElement(
                "defs",
                null,
                r.createElement(
                  "linearGradient",
                  {
                    id: "lightning_svg__a",
                    x1: 23.472,
                    y1: 9.722,
                    x2: 42.503,
                    y2: 55.668,
                    gradientUnits: "userSpaceOnUse",
                  },
                  r.createElement("stop", { stopColor: "#F89700" }),
                  r.createElement("stop", { offset: 1, stopColor: "#FFC85C" })
                )
              ))
          );
        },
        P = t(32960);
      function Z() {
        return (
          (Z = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }
                return e;
              }),
          Z.apply(this, arguments)
        );
      }
      var N,
        M = function (e) {
          return r.createElement(
            "svg",
            Z(
              {
                height: 12,
                viewBox: "0 0 16 12",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            E ||
              (E = r.createElement("path", {
                d: "M15.748 5.392V5.39L11.256.922a.86.86 0 1 0-1.213 1.218l3.015 3H1.744C1.269 5.14.6 5.526.6 6s.67.86 1.144.86h11.315l-3.015 3a.86.86 0 0 0 1.213 1.218l4.49-4.469h.001a.86.86 0 0 0 0-1.217Z",
                fill: "#4E4E4E",
              }))
          );
        };
      function A() {
        return (
          (A = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }
                return e;
              }),
          A.apply(this, arguments)
        );
      }
      var D = function (e) {
          return r.createElement(
            "svg",
            A(
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 32 32",
                width: 512,
                height: 512,
              },
              e
            ),
            N ||
              (N = r.createElement("path", {
                d: "M16 25a12.67 12.67 0 0 1-2.293-.214 1 1 0 0 1-.842-.986 1.016 1.016 0 0 1 1.188-.984A10.666 10.666 0 0 0 16 23c5.924 0 11.069-5.187 12.687-7a26.915 26.915 0 0 0-3.54-3.308 1 1 0 0 1 1.225-1.582 27.326 27.326 0 0 1 4.416 4.275 1 1 0 0 1 0 1.233C30.519 16.959 24.124 25 16 25ZM26.707 5.293a1 1 0 0 0-1.414 0l-3.18 3.18a15.513 15.513 0 0 0-3.79-1.256A12.6 12.6 0 0 0 16 7C7.876 7 1.481 15.041 1.213 15.383a1 1 0 0 0 0 1.233 27.282 27.282 0 0 0 4.412 4.271 23.614 23.614 0 0 0 2.414 1.661l-2.746 2.745a1 1 0 1 0 1.414 1.414l20-20a1 1 0 0 0 0-1.414ZM6.853 19.309A26.915 26.915 0 0 1 3.313 16C4.931 14.188 10.076 9 16 9a10.632 10.632 0 0 1 1.961.184 12.974 12.974 0 0 1 2.638.8l-1.842 1.842a5 5 0 0 0-6.928 6.928L9.5 21.087a20.988 20.988 0 0 1-2.647-1.778Zm6.447-2.025A2.972 2.972 0 0 1 13 16a3.01 3.01 0 0 1 .872-2.118 3.079 3.079 0 0 1 3.4-.57Z",
              }))
          );
        },
        U = t(53624),
        R = t(20298),
        H = t(39414),
        Q = t(4542),
        B = t(84646);
      function q(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, a = new Array(n); t < n; t++) a[t] = e[t];
        return a;
      }
      function G(e, n) {
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
              var a,
                l,
                i = [],
                r = !0,
                s = !1;
              try {
                for (
                  t = t.call(e);
                  !(r = (a = t.next()).done) &&
                  (i.push(a.value), !n || i.length !== n);
                  r = !0
                );
              } catch (o) {
                (s = !0), (l = o);
              } finally {
                try {
                  r || null == t.return || t.return();
                } finally {
                  if (s) throw l;
                }
              }
              return i;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return q(e, n);
            var t = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === t && e.constructor && (t = e.constructor.name);
            if ("Map" === t || "Set" === t) return Array.from(t);
            if (
              "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            )
              return q(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var W = t(27191),
        $ = t(92760),
        z = t(20200);
      var V = function (e) {
          var n = e.taskRef,
            t = e.className,
            a = function (e) {
              b.current && !b.current.contains(e.target) && u(!1);
            },
            l = (0, s.useFragment)(W, n),
            o = G(r.useState(!1), 2),
            c = o[0],
            u = o[1],
            d = G((0, s.useMutation)($), 2),
            k = d[0],
            p = d[1],
            f = G((0, s.useMutation)(z), 2),
            h = f[0],
            y = f[1],
            _ = (function (e) {
              switch (e) {
                case "cashbackClicked":
                  return { link: R.A.path, icon: x };
                case "dealClicked":
                  return { link: R.nA.path, icon: K };
                case "hasCashedOut":
                  return { link: R.LT.path, icon: S };
                case "hasEthnicity":
                  return { link: R.xD.path, icon: x };
                case "hasFullProfile":
                  return { link: R.xD.path, icon: K };
                case "hasHighProfileCompletion":
                  return { link: R.xD.path, icon: S };
                case "sharedDeviceIdentifier":
                case "enabledEmailMatching":
                case "enabledThirdPartyDataMatching":
                  return { link: R.L6.path, icon: K };
                case "signedUpForSurveys":
                  return { link: R.Mg.path, icon: S };
                case "pollCompleted":
                case "streakActivated":
                  return { link: R.h1.path, icon: x };
                default:
                  return (
                    console.error(
                      "getTaskSettings did not match task with id ".concat(e)
                    ),
                    { link: "/", icon: x }
                  );
              }
            })(l.key),
            v = _.icon,
            C = _.link,
            b = r.useRef(null);
          return (
            r.useEffect(
              function () {
                return (
                  document.addEventListener("mousedown", a),
                  function () {
                    return document.removeEventListener("mousedown", a);
                  }
                );
              },
              [b]
            ),
            (0, i.jsxs)(Q.Z, {
              interactive: !l.completed,
              className: (0, g.Z)(
                m().root,
                t,
                l.completed ? m().completed : m().incomplete
              ),
              children: [
                l.completed
                  ? (function () {
                      var e = v || S;
                      return (0, i.jsx)(e, { className: m().icon });
                    })()
                  : (0, i.jsx)(T, { className: m().icon }),
                (0, i.jsxs)("div", {
                  className: m().info,
                  children: [
                    (0, i.jsx)(B.Z, {
                      component: "h3",
                      className: m().title,
                      children: l.completed ? "Complete!" : l.title,
                    }),
                    (0, i.jsx)(B.Z, {
                      component: "p",
                      className: l.completed ? m().complete : m().description,
                      children: l.completed ? l.title : l.description,
                    }),
                  ],
                }),
                (0, i.jsx)("div", {
                  className: ""
                    .concat(m().actions, " ")
                    .concat(
                      l.completed
                        ? "".concat(m().actionComplete)
                        : "".concat(m().actionIncomplete)
                    ),
                  children: l.completed
                    ? (0, i.jsx)(P.Z, {})
                    : (0, i.jsx)(i.Fragment, {
                        children:
                          p || y
                            ? (0, i.jsx)(U.Z, {})
                            : (0, i.jsxs)(i.Fragment, {
                                children: [
                                  (0, i.jsxs)("div", {
                                    className: m().menuContainer,
                                    children: [
                                      (0, i.jsx)("button", {
                                        type: "button",
                                        onClick: function () {
                                          u(!c);
                                        },
                                        className: m().menuOpener,
                                        children: "...",
                                      }),
                                      c &&
                                        (0, i.jsxs)("button", {
                                          className: m().menu,
                                          ref: b,
                                          type: "button",
                                          onClick: function () {
                                            u(!1),
                                              l.hidden
                                                ? h({
                                                    variables: {
                                                      input: { id: l.id },
                                                    },
                                                  })
                                                : k({
                                                    variables: {
                                                      input: { id: l.id },
                                                    },
                                                  });
                                          },
                                          disabled: p || y,
                                          children: [
                                            (0, i.jsx)(D, {
                                              className: m().eye,
                                            }),
                                            (0, i.jsx)(B.Z, {
                                              component: "p",
                                              children: l.hidden
                                                ? "Unhide task"
                                                : "Hide task",
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                  (0, i.jsx)(H.Z, {
                                    to: C,
                                    className: m().arrow,
                                    children: (0, i.jsx)(M, {}),
                                  }),
                                ],
                              }),
                      }),
                }),
              ],
            })
          );
        },
        X = t(44824),
        J = t(49594),
        Y = t(52709),
        ee = function (e) {
          var n = e.taskConnectionRef,
            t = e.heading,
            a = e.startOpen,
            l = e.testId,
            r = (0, s.useFragment)(Y, n);
          return (null === r || void 0 === r ? void 0 : r.edges.length) > 0
            ? (0, i.jsx)("div", {
                "data-testid": l,
                children: (0, i.jsx)(J.Z, {
                  "data-testid": l,
                  className: d().root,
                  headerClassName: d().heading,
                  startOpen: a,
                  skipTitleTranslation: !0,
                  title: t,
                  children: (0, i.jsx)(X.Z, {
                    children: r.edges.map(function (e) {
                      return (0,
                      i.jsx)("li", { children: (0, i.jsx)(V, { taskRef: e.node }) }, e.node.id);
                    }),
                  }),
                }),
              })
            : null;
        },
        ne = t(47528),
        te = t(13203),
        ae = t(21344),
        le = t(83029),
        ie = function (e) {
          var n,
            t,
            a,
            l,
            r,
            s,
            o,
            u = e.checklistRef,
            d = (0, te.ZP)(le, u),
            k =
              ((null === d ||
              void 0 === d ||
              null === (n = d.remaining) ||
              void 0 === n ||
              null === (t = n.pageInfo) ||
              void 0 === t
                ? void 0
                : t.totalCount) || 0) +
              ((null === d ||
              void 0 === d ||
              null === (a = d.completed) ||
              void 0 === a ||
              null === (l = a.pageInfo) ||
              void 0 === l
                ? void 0
                : l.totalCount) || 0),
            m = ((d.completed.pageInfo.totalCount || 0) / k) * 100,
            g = (0, ae.Z)();
          return (0, i.jsxs)("div", {
            className: c().root,
            children: [
              (0, i.jsxs)("div", {
                className: c().banner,
                children: [
                  (0, i.jsxs)("div", {
                    className: c().intro,
                    children: [
                      (0, i.jsxs)("header", {
                        className: c().header,
                        children: [
                          (0, i.jsx)(B.Z, {
                            component: "h1",
                            className: c().title,
                            children: "Explore Qmee",
                          }),
                          k &&
                            (0, i.jsxs)("div", {
                              className: c().progressCounter,
                              children: [
                                d.completed.pageInfo.totalCount,
                                "/",
                                k,
                              ],
                            }),
                        ],
                      }),
                      (0, i.jsx)(B.Z, {
                        component: "p",
                        children:
                          "There are a few things we recommend you try to get the most out of Qmee. These will help you get better surveys, more appropriate ones for your profile and earn extra money. Others are just to see all the great things Qmee has to offer!",
                      }),
                    ],
                  }),
                  (0, i.jsxs)("div", {
                    className: c().progressIndicator,
                    children: [
                      (0, i.jsx)(ne.Z, {
                        diameterInPixels: 180,
                        progressPercentage: m,
                        thickness: 6,
                      }),
                      (0, i.jsxs)("p", {
                        className: c().progressPercentage,
                        children: [Math.round(m), "%"],
                      }),
                    ],
                  }),
                ],
              }),
              (0, i.jsxs)("div", {
                className: c().tasks,
                children: [
                  (0, i.jsx)(ee, {
                    taskConnectionRef:
                      null === d || void 0 === d ? void 0 : d.remaining,
                    heading: g("CHALLENGES REMAINING (%1s;)", {
                      vars: [
                        "".concat(
                          null === (r = d.remaining) || void 0 === r
                            ? void 0
                            : r.pageInfo.totalCount
                        ),
                      ],
                    }),
                    startOpen: !0,
                    testId: "remainingSection",
                  }),
                  (0, i.jsx)(ee, {
                    taskConnectionRef:
                      null === d || void 0 === d ? void 0 : d.completed,
                    heading: g("COMPLETE (%1s;)", {
                      vars: [
                        "".concat(
                          null === (s = d.completed) || void 0 === s
                            ? void 0
                            : s.pageInfo.totalCount
                        ),
                      ],
                    }),
                    startOpen: !0,
                  }),
                  (0, i.jsx)(ee, {
                    taskConnectionRef:
                      null === d || void 0 === d ? void 0 : d.hidden,
                    heading: g("HIDDEN (%1s;)", {
                      vars: [
                        "".concat(
                          null === (o = d.hidden) || void 0 === o
                            ? void 0
                            : o.pageInfo.totalCount
                        ),
                      ],
                    }),
                    testId: "hiddenSection",
                  }),
                ],
              }),
            ],
          });
        },
        re = t(16776),
        se = function () {
          var e = (0, s.useLazyLoadQuery)(
            re,
            {},
            { fetchPolicy: "store-or-network" }
          );
          return (0, i.jsx)("section", {
            className: c().page,
            children: e.tasks
              ? (0, i.jsx)(ie, { checklistRef: e.tasks })
              : (0, i.jsx)("p", {
                  children:
                    "We are having trouble loading checklist tasks at the moment. Please try again later.",
                }),
          });
        },
        oe = (0, t(82688).bg)(se, {
          requiresAuthentication: !0,
          metaData: {
            title: "Explore Qmee",
            description: "Find out more about what you can do with Qmee.",
          },
        });
    },
    11570: function (e) {
      e.exports = {
        root: "Card_root__qEP3_",
        interactive: "Card_interactive__f7luR",
        outlined: "Card_outlined__uy0qq",
      };
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
    28090: function (e) {
      e.exports = { root: "ProgressRing_root__9sW4Q" };
    },
    31636: function (e) {
      e.exports = { root: "ItemList_root__jjHJx" };
    },
    83364: function (e) {
      e.exports = {
        root: "TaskItem_root__5szZp",
        icon: "TaskItem_icon__dBPPi",
        info: "TaskItem_info__UOhCT",
        title: "TaskItem_title__AmkEf",
        description: "TaskItem_description__9Kazc",
        complete: "TaskItem_complete__dez2W",
        actions: "TaskItem_actions__dgTtd",
        menuContainer: "TaskItem_menuContainer__1rSmy",
        menuOpener: "TaskItem_menuOpener__ux1FA",
        menu: "TaskItem_menu__7kZxf",
        eye: "TaskItem_eye__uXixQ",
        arrow: "TaskItem_arrow__8XyxO",
        completed: "TaskItem_completed__8UILG",
        actionComplete: "TaskItem_actionComplete__nG7Uz",
      };
    },
    11259: function (e) {
      e.exports = {
        root: "TaskList_root__G_lh0",
        heading: "TaskList_heading__TyGZn",
        complete: "TaskList_complete__gwe8B",
        emptyMessage: "TaskList_emptyMessage__GsuSL",
      };
    },
    63704: function (e) {
      e.exports = {
        page: "TaskChecklist_page__Onnjv",
        root: "TaskChecklist_root__oFxkA",
        title: "TaskChecklist_title__sokdl",
        banner: "TaskChecklist_banner__4U8jl",
        header: "TaskChecklist_header__Ii2lO",
        progressCounter: "TaskChecklist_progressCounter__E4ByK",
        progressIndicator: "TaskChecklist_progressIndicator__nZMzW",
        progressPercentage: "TaskChecklist_progressPercentage__5E6lv",
        intro: "TaskChecklist_intro__QVYMg",
        tasks: "TaskChecklist_tasks__JA0Gg",
      };
    },
  },
  function (e) {
    e.O(0, [3862, 9926, 7794, 4244, 6178, 9774, 2888, 179], function () {
      return (n = 61284), e((e.s = n));
      var n;
    });
    var n = e.O();
    _N_E = n;
  },
]);
//# sourceMappingURL=explore-c8fa7c3ff8106404.js.map
