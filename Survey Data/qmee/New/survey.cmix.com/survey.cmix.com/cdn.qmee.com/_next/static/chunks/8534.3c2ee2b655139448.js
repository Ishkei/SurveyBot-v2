(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8534, 8407],
  {
    50667: function (e, n, a) {
      "use strict";
      var r = a(85893);
      a(67294);
      n.Z = function (e) {
        var n = e.className;
        return (0, r.jsxs)("svg", {
          className: n,
          viewBox:
            "0.12390102908773254 0.07476807499999999 12.93802107540772 12.850481743181424",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            (0, r.jsx)("path", {
              d: "M0.42 12.62C-0.06 12.14 -0.06 11.37 0.42 10.89C1.47 9.84 9.83 1.48 10.87 0.43C11.37 -0.03 12.15 -0.01 12.61 0.49C13.03 0.94 13.06 1.63 12.67 2.11C11.62 3.16 3.21 11.57 2.16 12.62C1.92 12.83 1.61 12.93 1.29 12.92C0.98 12.94 0.66 12.83 0.42 12.62Z",
              fill: "currentColor",
            }),
            (0, r.jsx)("path", {
              d: "M10.87 12.56C9.83 11.52 1.47 3.15 0.42 2.11C-0.02 1.59 0.04 0.81 0.55 0.37C1.02 -0.02 1.7 -0.02 2.16 0.37C3.21 1.42 11.62 9.78 12.67 10.83C13.17 11.29 13.19 12.07 12.73 12.57C12.71 12.59 12.69 12.6 12.67 12.62C12.41 12.85 12.08 12.95 11.74 12.92C11.41 12.92 11.1 12.79 10.87 12.56Z",
              fill: "currentColor",
            }),
          ],
        });
      };
    },
    59873: function (e, n, a) {
      "use strict";
      var r = a(85893),
        t = a(67294),
        l = a(30675),
        i = a.n(l),
        s = a(86010),
        o = a(50667);
      n.Z = function (e) {
        var n = e.onClose,
          a = e.showClose,
          l = e.children,
          u = e.className,
          d = e.backgroundTestId,
          c = e.contentTestId,
          g = e.isVideo,
          m = t.useRef(null),
          f = t.useCallback(
            function (e) {
              m.current && !m.current.contains(e.target) && n();
            },
            [n]
          );
        return (
          t.useEffect(
            function () {
              return (
                document.addEventListener("mousedown", f),
                function () {
                  return document.removeEventListener("mousedown", f);
                }
              );
            },
            [m, f]
          ),
          (0, r.jsx)("div", {
            className: (0, s.Z)(i().root, u),
            "data-testid": d,
            children: (0, r.jsx)("div", {
              className: (0, s.Z)(
                i().contentOuterWrapper,
                g && i().videoOuterWrapper
              ),
              children: (0, r.jsx)("div", {
                className: i().contentInnerWrapper,
                ref: m,
                children: (0, r.jsxs)("div", {
                  className: i().content,
                  ref: m,
                  children: [
                    a &&
                      (0, r.jsx)("button", {
                        type: "button",
                        onClick: n,
                        className: (0, s.Z)(i().close, g && i().videoCloseBtn),
                        "data-testid": c,
                        children: (0, r.jsx)(o.Z, {}),
                      }),
                    l,
                  ],
                }),
              }),
            }),
          })
        );
      };
    },
    22113: function (e, n, a) {
      "use strict";
      a.r(n),
        a.d(n, {
          default: function () {
            return F;
          },
        });
      var r = a(85893),
        t = a(59873),
        l = a(67294),
        i = (a(22578), a(67912)),
        s = a(6523),
        o = a.n(s),
        u = a(5152),
        d = a.n(u);
      function c(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, r = new Array(n); a < n; a++) r[a] = e[a];
        return r;
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
              var r,
                t,
                l = [],
                i = !0,
                s = !1;
              try {
                for (
                  a = a.call(e);
                  !(i = (r = a.next()).done) &&
                  (l.push(r.value), !n || l.length !== n);
                  i = !0
                );
              } catch (o) {
                (s = !0), (t = o);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (s) throw t;
                }
              }
              return l;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return c(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return c(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var m = d()(
          function () {
            return a.e(691).then(a.bind(a, 691));
          },
          {
            loadableGenerated: {
              webpack: function () {
                return [691];
              },
            },
            ssr: !1,
          }
        ),
        f = {
          "/survey/failed/fraud": d()(
            function () {
              return a.e(5744).then(a.bind(a, 65744));
            },
            {
              loadableGenerated: {
                webpack: function () {
                  return [65744];
                },
              },
              ssr: !1,
            }
          ),
          "/survey/paid/complete": d()(
            function () {
              return a.e(9878).then(a.bind(a, 49878));
            },
            {
              loadableGenerated: {
                webpack: function () {
                  return [49878];
                },
              },
              ssr: !1,
            }
          ),
          "/survey/paid/autopay": d()(
            function () {
              return a.e(1056).then(a.bind(a, 61056));
            },
            {
              loadableGenerated: {
                webpack: function () {
                  return [61056];
                },
              },
              ssr: !1,
            }
          ),
          "/league/demoted": d()(
            function () {
              return Promise.all([a.e(2448), a.e(1075)]).then(a.bind(a, 91075));
            },
            {
              loadableGenerated: {
                webpack: function () {
                  return [91075];
                },
              },
              ssr: !1,
            }
          ),
          "/league/promoted": d()(
            function () {
              return Promise.all([
                a.e(8388),
                a.e(2448),
                a.e(1495),
                a.e(7300),
              ]).then(a.bind(a, 7300));
            },
            {
              loadableGenerated: {
                webpack: function () {
                  return [7300];
                },
              },
              ssr: !1,
            }
          ),
          "/league/retained": d()(
            function () {
              return Promise.all([
                a.e(8388),
                a.e(2448),
                a.e(1495),
                a.e(620),
              ]).then(a.bind(a, 30620));
            },
            {
              loadableGenerated: {
                webpack: function () {
                  return [30620];
                },
              },
              ssr: !1,
            }
          ),
          "/": m,
        };
      var y = a(13203),
        p = a(95345),
        b = a(29059),
        v = a(354);
      function k(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, r = new Array(n); a < n; a++) r[a] = e[a];
        return r;
      }
      function h(e, n) {
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
              var r,
                t,
                l = [],
                i = !0,
                s = !1;
              try {
                for (
                  a = a.call(e);
                  !(i = (r = a.next()).done) &&
                  (l.push(r.value), !n || l.length !== n);
                  i = !0
                );
              } catch (o) {
                (s = !0), (t = o);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (s) throw t;
                }
              }
              return l;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return k(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return k(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var I = a(61423),
        M = a(62638),
        x = a(90193),
        K = function (e) {
          var n,
            a,
            s = e.userInboxMessagesRef,
            u = (0, y.ZP)(M, s),
            d = h((0, i.useMutation)(x), 1)[0],
            c = h(l.useState(null), 2),
            k = c[0],
            I = c[1],
            K = null === (n = u.edges[0]) || void 0 === n ? void 0 : n.node,
            F = k !== (null === K || void 0 === K ? void 0 : K.id),
            _ = (function (e) {
              if (!e) return m;
              var n = Object.entries(f)
                .sort(function (e, n) {
                  return n[0].length - e[0].length;
                })
                .find(function (n) {
                  var a = g(n, 1)[0];
                  return e.startsWith(a);
                });
              return n ? n[1] : m;
            })(null === K || void 0 === K ? void 0 : K.topic),
            S = (0, p.useWasShownReviewPrompt)(),
            w = new Date().getDay(),
            C = 6 === w || 0 === w,
            U = (0, b.vR)().showModal,
            j =
              ("/survey/paid/complete" ===
                (null === K || void 0 === K ? void 0 : K.topic) ||
                (null === K ||
                void 0 === K ||
                null === (a = K.topic) ||
                void 0 === a
                  ? void 0
                  : a.includes("admin/test/message"))) &&
              !S &&
              !C,
            O = (0, v.Z)(),
            T = l.useCallback(
              function () {
                O({ type: "review_dialog_closed", value: "surveys_page" });
              },
              [O]
            ),
            A = function (e) {
              if ((d({ variables: { input: { id: e } } }), I(e), j)) {
                var n = { onClose: T };
                U(b.Ny.REVIEW_PROMPT_MODAL, n);
              }
            };
          return K && F
            ? (0, r.jsx)(t.Z, {
                showClose: !0,
                onClose: function () {
                  return A(K.id);
                },
                children: (0, r.jsx)("div", {
                  className: o().root,
                  children: (0, r.jsx)(_, { userInboxMessage: K, onClose: A }),
                }),
              })
            : null;
        },
        F = function () {
          var e = (0, i.useLazyLoadQuery)(
            I,
            {},
            { fetchPolicy: "store-and-network" }
          );
          return (0, r.jsx)(r.Fragment, {
            children:
              e.userInboxMessages &&
              (0, r.jsx)(K, { userInboxMessagesRef: e.userInboxMessages }),
          });
        };
    },
    90193: function (e, n, a) {
      "use strict";
      a.r(n);
      var r = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "input" }],
          n = [
            {
              alias: null,
              args: [
                { kind: "Variable", name: "input", variableName: "input" },
              ],
              kind: "ScalarField",
              name: "readMessage",
              storageKey: null,
            },
          ];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "UserInboxModalMutation",
            selections: n,
            type: "Mutation",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "UserInboxModalMutation",
            selections: n,
          },
          params: {
            cacheID: "ce61200a6146cfa2ec4b853e943ba082",
            id: null,
            metadata: {},
            name: "UserInboxModalMutation",
            operationKind: "mutation",
            text: "mutation UserInboxModalMutation(\n  $input: ReadMessageInput!\n) {\n  readMessage(input: $input)\n}\n",
          },
        };
      })();
      (r.hash = "349da00acdaa6403f70a0877142fae60"), (n.default = r);
    },
    61423: function (e, n, a) {
      "use strict";
      a.r(n);
      var r = (function () {
        var e = {
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
            name: "UserInboxModalQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "UserInboxMessagesConnection",
                kind: "LinkedField",
                name: "userInboxMessages",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "UserInboxModal_userInboxMessages",
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
            name: "UserInboxModalQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "UserInboxMessagesConnection",
                kind: "LinkedField",
                name: "userInboxMessages",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "UserInboxMessageEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "UserInboxMessage",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [
                          e,
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
                            name: "message",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "subjectKey",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "topic",
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
                            concreteType: "MoneyAmount",
                            kind: "LinkedField",
                            name: "reward",
                            plural: !1,
                            selections: [
                              {
                                alias: null,
                                args: null,
                                kind: "ScalarField",
                                name: "formatted",
                                storageKey: null,
                              },
                            ],
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  e,
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "ab51c596ee786a30d3307bd4aaac165c",
            id: null,
            metadata: {},
            name: "UserInboxModalQuery",
            operationKind: "query",
            text: "query UserInboxModalQuery {\n  userInboxMessages {\n    ...UserInboxModal_userInboxMessages\n    id\n  }\n}\n\nfragment UserInboxModal_userInboxMessages on UserInboxMessagesConnection {\n  edges {\n    node {\n      id\n      title\n      message\n      subjectKey\n      topic\n      imageUrl\n      reward {\n        formatted\n      }\n    }\n  }\n  id\n}\n",
          },
        };
      })();
      (r.hash = "ea089cdff03297d48261849741469041"), (n.default = r);
    },
    23695: function (e, n, a) {
      "use strict";
      a.r(n);
      var r = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          n = [{ kind: "Variable", name: "id", variableName: "id" }],
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          };
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "UserInboxModalRefetchQuery",
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
                    name: "UserInboxModal_userInboxMessages",
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
            name: "UserInboxModalRefetchQuery",
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
                        concreteType: "UserInboxMessageEdge",
                        kind: "LinkedField",
                        name: "edges",
                        plural: !0,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            concreteType: "UserInboxMessage",
                            kind: "LinkedField",
                            name: "node",
                            plural: !1,
                            selections: [
                              a,
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
                                name: "message",
                                storageKey: null,
                              },
                              {
                                alias: null,
                                args: null,
                                kind: "ScalarField",
                                name: "subjectKey",
                                storageKey: null,
                              },
                              {
                                alias: null,
                                args: null,
                                kind: "ScalarField",
                                name: "topic",
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
                                concreteType: "MoneyAmount",
                                kind: "LinkedField",
                                name: "reward",
                                plural: !1,
                                selections: [
                                  {
                                    alias: null,
                                    args: null,
                                    kind: "ScalarField",
                                    name: "formatted",
                                    storageKey: null,
                                  },
                                ],
                                storageKey: null,
                              },
                            ],
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                    ],
                    type: "UserInboxMessagesConnection",
                    abstractKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "bc42c46a1f506821a2da80bdce36dfeb",
            id: null,
            metadata: {},
            name: "UserInboxModalRefetchQuery",
            operationKind: "query",
            text: "query UserInboxModalRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...UserInboxModal_userInboxMessages\n    id\n  }\n}\n\nfragment UserInboxModal_userInboxMessages on UserInboxMessagesConnection {\n  edges {\n    node {\n      id\n      title\n      message\n      subjectKey\n      topic\n      imageUrl\n      reward {\n        formatted\n      }\n    }\n  }\n  id\n}\n",
          },
        };
      })();
      (r.hash = "9609cb1af363abc23605def79d436ad0"), (n.default = r);
    },
    62638: function (e, n, a) {
      "use strict";
      a.r(n);
      var r = (function () {
        var e = {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "id",
          storageKey: null,
        };
        return {
          argumentDefinitions: [],
          kind: "Fragment",
          metadata: {
            refetch: {
              connection: null,
              fragmentPathInResult: ["node"],
              operation: a(23695),
              identifierField: "id",
            },
          },
          name: "UserInboxModal_userInboxMessages",
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "UserInboxMessageEdge",
              kind: "LinkedField",
              name: "edges",
              plural: !0,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "UserInboxMessage",
                  kind: "LinkedField",
                  name: "node",
                  plural: !1,
                  selections: [
                    e,
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
                      name: "message",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "subjectKey",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "topic",
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
                      concreteType: "MoneyAmount",
                      kind: "LinkedField",
                      name: "reward",
                      plural: !1,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "formatted",
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            e,
          ],
          type: "UserInboxMessagesConnection",
          abstractKey: null,
        };
      })();
      (r.hash = "9609cb1af363abc23605def79d436ad0"), (n.default = r);
    },
    95482: function (e, n, a) {
      "use strict";
      a.r(n);
      var r = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "input" }],
          n = [
            {
              alias: null,
              args: [
                { kind: "Variable", name: "input", variableName: "input" },
              ],
              kind: "ScalarField",
              name: "frontendEventTriggered",
              storageKey: null,
            },
          ];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "useFrontendEventTrackerMutation",
            selections: n,
            type: "Mutation",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "useFrontendEventTrackerMutation",
            selections: n,
          },
          params: {
            cacheID: "8400355402e8b8ba765383a7ae59798a",
            id: null,
            metadata: {},
            name: "useFrontendEventTrackerMutation",
            operationKind: "mutation",
            text: "mutation useFrontendEventTrackerMutation(\n  $input: FrontendEventTriggeredInput!\n) {\n  frontendEventTriggered(input: $input)\n}\n",
          },
        };
      })();
      (r.hash = "7ef56cabf4633b6858bfd4833dcc241b"), (n.default = r);
    },
    354: function (e, n, a) {
      "use strict";
      a.d(n, {
        Z: function () {
          return s;
        },
      });
      var r = a(22578);
      function t(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, r = new Array(n); a < n; a++) r[a] = e[a];
        return r;
      }
      function l(e, n) {
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
              var r,
                t,
                l = [],
                i = !0,
                s = !1;
              try {
                for (
                  a = a.call(e);
                  !(i = (r = a.next()).done) &&
                  (l.push(r.value), !n || l.length !== n);
                  i = !0
                );
              } catch (o) {
                (s = !0), (t = o);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (s) throw t;
                }
              }
              return l;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return t(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return t(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var i = a(95482);
      function s() {
        var e = l((0, r.useMutation)(i), 1)[0];
        return function (n) {
          var a = n.type,
            r = n.value;
          e({
            variables: { input: { type: a, value: r, sourceApp: "qmee-site" } },
          });
        };
      }
    },
    30675: function (e) {
      e.exports = {
        root: "Overlay_root__oetez",
        fadeInOuter: "Overlay_fadeInOuter__XCmjM",
        close: "Overlay_close__E8_sg",
        videoCloseBtn: "Overlay_videoCloseBtn__Ls_fn",
        contentOuterWrapper: "Overlay_contentOuterWrapper__SXByJ",
        videoOuterWrapper: "Overlay_videoOuterWrapper__e0mzI",
        contentInnerWrapper: "Overlay_contentInnerWrapper__Rm9LY",
        content: "Overlay_content__4WPLE",
      };
    },
    6523: function (e) {
      e.exports = { root: "UserInboxModal_root__T2KNE" };
    },
  },
]);
//# sourceMappingURL=8534.3c2ee2b655139448.js.map
