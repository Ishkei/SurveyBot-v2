(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5060],
  {
    5593: function (e, n, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/surveys",
        function () {
          return a(27961);
        },
      ]);
    },
    56233: function (e, n, a) {
      "use strict";
      a.r(n);
      var l = (function () {
        var e = { defaultValue: null, kind: "LocalArgument", name: "first" },
          n = { defaultValue: null, kind: "LocalArgument", name: "input" },
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "roles",
            storageKey: null,
          },
          l = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          r = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "title",
            storageKey: null,
          },
          t = [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "formatted",
              storageKey: null,
            },
          ];
        return {
          fragment: {
            argumentDefinitions: [e, n],
            kind: "Fragment",
            metadata: null,
            name: "SurveysQuery",
            selections: [
              {
                args: null,
                kind: "FragmentSpread",
                name: "SurveyList_surveys",
              },
              {
                alias: null,
                args: null,
                concreteType: "Message",
                kind: "LinkedField",
                name: "dashboardMessage",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "Message_message",
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "GamificationStreak",
                kind: "LinkedField",
                name: "gamificationStreak",
                plural: !1,
                selections: [
                  { args: null, kind: "FragmentSpread", name: "Streak_streak" },
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
                selections: [a],
                storageKey: null,
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: [n, e],
            kind: "Operation",
            name: "SurveysQuery",
            selections: [
              {
                alias: null,
                args: [
                  { kind: "Variable", name: "first", variableName: "first" },
                  { kind: "Variable", name: "input", variableName: "input" },
                ],
                concreteType: "SurveyConnection",
                kind: "LinkedField",
                name: "surveys",
                plural: !1,
                selections: [
                  l,
                  {
                    alias: null,
                    args: null,
                    concreteType: "SurveyEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "Survey",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [
                          l,
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
                            name: "url",
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
                          r,
                          {
                            alias: null,
                            args: null,
                            concreteType: "MoneyAmount",
                            kind: "LinkedField",
                            name: "reward",
                            plural: !1,
                            selections: t,
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
                              r,
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
                            selections: t,
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
                concreteType: "ResponseQuality",
                kind: "LinkedField",
                name: "responseQuality",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "score",
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "Message",
                kind: "LinkedField",
                name: "dashboardMessage",
                plural: !1,
                selections: [
                  l,
                  r,
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
                    name: "type",
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "GamificationStreak",
                kind: "LinkedField",
                name: "gamificationStreak",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "expiresAt",
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "length",
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "unlocksAt",
                    storageKey: null,
                  },
                  l,
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
                selections: [a, l],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "9598ab7c11de2b419278e54c2538a563",
            id: null,
            metadata: {},
            name: "SurveysQuery",
            operationKind: "query",
            text: "query SurveysQuery(\n  $input: FilteredSurveyInput\n  $first: Int\n) {\n  ...SurveyList_surveys\n  dashboardMessage {\n    ...Message_message\n    id\n  }\n  gamificationStreak {\n    ...Streak_streak\n    id\n  }\n  userData {\n    roles\n    id\n  }\n}\n\nfragment Message_message on Message {\n  id\n  title\n  message\n  type\n}\n\nfragment Streak_streak on GamificationStreak {\n  expiresAt\n  length\n  unlocksAt\n  id\n}\n\nfragment SurveyItem_survey on Survey {\n  id\n  studyId\n  supportId\n  title\n  reward {\n    formatted\n  }\n  lockedInfo {\n    title\n    description\n  }\n  status\n  statusDescription\n  startedAt\n  baseReward {\n    formatted\n  }\n  duration\n  durationDetails {\n    max\n    median\n    min\n    providerDuration\n  }\n  url\n  imageUrl\n  iconUrl\n  tags\n  fraudType\n  adminData {\n    surveyGuid\n    rankScore\n  }\n}\n\nfragment SurveyList_surveys on Query {\n  surveys(input: $input, first: $first) {\n    id\n    edges {\n      node {\n        id\n        status\n        url\n        ...SurveyItem_survey\n      }\n    }\n  }\n  responseQuality {\n    score\n  }\n}\n",
          },
        };
      })();
      (l.hash = "80116071232e719c77f174a7c3f99e99"), (n.default = l);
    },
    27961: function (e, n, a) {
      "use strict";
      a.r(n),
        a.d(n, {
          __N_SSG: function () {
            return M;
          },
          default: function () {
            return P;
          },
        });
      var l,
        r,
        t,
        s = a(85893),
        i = a(67294),
        u = a(67912),
        o = (a(22578), a(40406)),
        c = a(21344),
        d = a(44482),
        y = a.n(d),
        g = a(41707),
        m = a(75477);
      function p() {
        return (
          (p = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var a = arguments[n];
                  for (var l in a)
                    Object.prototype.hasOwnProperty.call(a, l) && (e[l] = a[l]);
                }
                return e;
              }),
          p.apply(this, arguments)
        );
      }
      var f,
        k,
        v,
        S = function (e) {
          return i.createElement(
            "svg",
            p(
              {
                viewBox: "0 0 35 30",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            l ||
              (l = i.createElement("rect", {
                x: 0.5,
                y: 0.5,
                width: 34,
                height: 29,
                rx: 6.5,
                fill: "#FAFAFA",
                stroke: "#EBEBEB",
              })),
            r ||
              (r = i.createElement("path", {
                d: "M9.36 19.096c0-1.105 1.147-2.08 2.904-2.677a5.547 5.547 0 1 1 8.016-.01c1.776.595 2.936 1.577 2.936 2.687 0 1.816-3.103 3.288-6.928 3.288-3.825 0-6.929-1.472-6.929-3.288Zm3.773-6.51a3.135 3.135 0 1 0 6.27 0 3.135 3.135 0 0 0-6.27 0Z",
                fill: "#39F",
              })),
            t ||
              (t = i.createElement("path", {
                d: "M16.255 10.817a1.745 1.745 0 0 1 1.687 1.8 1.746 1.746 0 0 1-1.687 1.799 1.746 1.746 0 0 1-1.687-1.8 1.745 1.745 0 0 1 1.687-1.799Z",
                fill: "#495867",
              }))
          );
        };
      function h() {
        return (
          (h = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var n = 1; n < arguments.length; n++) {
                  var a = arguments[n];
                  for (var l in a)
                    Object.prototype.hasOwnProperty.call(a, l) && (e[l] = a[l]);
                }
                return e;
              }),
          h.apply(this, arguments)
        );
      }
      var b = function (e) {
          return i.createElement(
            "svg",
            h(
              {
                viewBox: "0 0 35 30",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              e
            ),
            f ||
              (f = i.createElement("rect", {
                x: 0.5,
                y: 0.5,
                width: 34,
                height: 29,
                rx: 6.5,
                fill: "#FAFAFA",
                stroke: "#EBEBEB",
              })),
            k ||
              (k = i.createElement("path", {
                d: "M17.791 14.509c1.95 0 3.53-1.539 3.53-3.436 0-1.898-1.58-3.436-3.53-3.436-1.949 0-3.529 1.538-3.529 3.436 0 1.897 1.58 3.436 3.53 3.436ZM17.791 21.364c-1.392 0-2.714-.282-3.722-.793-1.004-.509-1.595-1.194-1.665-1.928h-.008c0-.034 0-.066.002-.094-.002-.019-.002-.037-.002-.054 0-.108.012-.216.034-.32.05-.339.15-.667.299-.975.156-.323.356-.623.594-.892a5.337 5.337 0 0 1 2.388-1.509c.64.342 1.355.518 2.08.512a4.329 4.329 0 0 0 2.082-.512c.169.054.334.116.494.183a3.106 3.106 0 0 0 .789 2.62 3.105 3.105 0 0 0 2.03.988v.053h-.006c-.07.734-.662 1.42-1.666 1.928-1.008.511-2.33.793-3.723.793Zm4.162-5.07a.671.671 0 0 1-.508-.157.907.907 0 0 1-.184-.652v-.032c.36.23.686.508.973.825a2.934 2.934 0 0 1-.281.016Z",
                fill: "#39F",
              })),
            v ||
              (v = i.createElement("path", {
                d: "M23.695 18.081a2.905 2.905 0 0 1-2.053-4.958 2.903 2.903 0 0 1 4.746.936 2.905 2.905 0 0 1-.638 3.17 2.889 2.889 0 0 1-2.055.852Zm-1.07-3.079a.504.504 0 0 0-.303.906l1.233.93 1.614-2.15a.503.503 0 0 0-.804-.606l-1.01 1.344-.428-.323a.498.498 0 0 0-.302-.1Z",
                fill: "#495867",
              }))
          );
        },
        F = a(67404),
        _ = a(56127),
        K = a(13556),
        w = a(5561),
        j = a(25769),
        x = a(84646),
        I = a(86010);
      function E(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var a = 0, l = new Array(n); a < n; a++) l[a] = e[a];
        return l;
      }
      function A(e, n, a) {
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
      function D(e) {
        for (var n = 1; n < arguments.length; n++) {
          var a = null != arguments[n] ? arguments[n] : {},
            l = Object.keys(a);
          "function" === typeof Object.getOwnPropertySymbols &&
            (l = l.concat(
              Object.getOwnPropertySymbols(a).filter(function (e) {
                return Object.getOwnPropertyDescriptor(a, e).enumerable;
              })
            )),
            l.forEach(function (n) {
              A(e, n, a[n]);
            });
        }
        return e;
      }
      function L(e, n) {
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
              var l,
                r,
                t = [],
                s = !0,
                i = !1;
              try {
                for (
                  a = a.call(e);
                  !(s = (l = a.next()).done) &&
                  (t.push(l.value), !n || t.length !== n);
                  s = !0
                );
              } catch (u) {
                (i = !0), (r = u);
              } finally {
                try {
                  s || null == a.return || a.return();
                } finally {
                  if (i) throw r;
                }
              }
              return t;
            }
          })(e, n) ||
          (function (e, n) {
            if (!e) return;
            if ("string" === typeof e) return E(e, n);
            var a = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === a && e.constructor && (a = e.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return E(e, n);
          })(e, n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var O = a(56233),
        T = function () {
          var e = L((0, _.Z)(), 2),
            n = e[0],
            a = e[1],
            l = a.setWebcamSurveys,
            r = a.setPIISurveys,
            t = (0, j.Z)().qmee_survey_result,
            d = (0, o.VY)(),
            p = (0, c.Z)(),
            f = (0, u.useLazyLoadQuery)(
              O,
              { input: D({}, n, { historicSurveys: !0 }), first: null },
              { fetchPolicy: "store-and-network" }
            ),
            k = i.useRef(!0);
          i.useEffect(
            function () {
              t &&
                k.current &&
                ((k.current = !1),
                d.show(
                  p(
                    "Your recent survey is currently processing. Please check your survey history later for a status update."
                  ),
                  { type: "info", timeout: 5e3 }
                ));
            },
            [d, t, p]
          );
          return (0, s.jsxs)("section", {
            className: y().root,
            children: [
              f.dashboardMessage &&
                (0, s.jsx)(w.Z, {
                  className: y().message,
                  messageRef: f.dashboardMessage,
                }),
              (0, s.jsxs)("div", {
                className: y().streakFilterGroup,
                children: [
                  (0, s.jsxs)("div", {
                    className: y().filterButtonGroup,
                    children: [
                      (0, s.jsx)(F.Z, {
                        tipClassName: y().tip,
                        tip: (0, s.jsx)(s.Fragment, {
                          children: (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsxs)(x.Z, {
                                component: "h4",
                                children: [
                                  "PII Surveys - ",
                                  n.PIISurveys ? "Enabled" : "Disabled",
                                ],
                              }),
                              (0, s.jsx)(x.Z, {
                                component: "p",
                                children:
                                  "These are surveys that may ask for your Personally Identifiable Information",
                              }),
                            ],
                          }),
                        }),
                        children: (0, s.jsx)("button", {
                          type: "button",
                          className: (0, I.Z)(
                            y().filterButton,
                            n.PIISurveys && y().enabled
                          ),
                          onClick: function () {
                            r(!n.PIISurveys);
                          },
                          children: (0, s.jsx)(b, {}),
                        }),
                      }),
                      (0, s.jsx)(F.Z, {
                        tipClassName: y().tip,
                        tip: (0, s.jsx)(s.Fragment, {
                          children: (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsxs)(x.Z, {
                                component: "h4",
                                children: [
                                  "Webcam Surveys - ",
                                  n.webcamSurveys ? "Enabled" : "Disabled",
                                ],
                              }),
                              (0, s.jsx)(x.Z, {
                                component: "p",
                                children:
                                  "These are surveys that may ask to use your webcam as part of the survey",
                              }),
                            ],
                          }),
                        }),
                        children: (0, s.jsx)("button", {
                          type: "button",
                          className: (0, I.Z)(
                            y().filterButton,
                            n.webcamSurveys && y().enabled
                          ),
                          onClick: function () {
                            l(!n.webcamSurveys);
                          },
                          children: (0, s.jsx)(S, {}),
                        }),
                      }),
                    ],
                  }),
                  f.gamificationStreak &&
                    (0, s.jsx)(m.Z, { streakRef: f.gamificationStreak }),
                ],
              }),
              f &&
                (0, s.jsx)(K.Z, {
                  children: (0, s.jsx)(g.Z, {
                    surveysRef: f,
                    showFinished: !0,
                  }),
                }),
            ],
          });
        },
        Z = a(82688),
        M = !0,
        P = (0, Z.bg)(T, {
          requiresAuthentication: !0,
          metaData: {
            title: "Surveys",
            description: "Earn money online with Qmee surveys",
          },
        });
    },
    44482: function (e) {
      e.exports = {
        filterButtonGroup: "Surveys_filterButtonGroup__UAgsu",
        forecastIcon: "Surveys_forecastIcon__Q8lVT",
        forecastDescription: "Surveys_forecastDescription__Snrd7",
        streakFilterGroup: "Surveys_streakFilterGroup__BMdxI",
        filterButton: "Surveys_filterButton__KEaJg",
        enabled: "Surveys_enabled__eOhjF",
        infoIcons: "Surveys_infoIcons__6Pbrj",
        tip: "Surveys_tip___kdFO",
        message: "Surveys_message__BPty0",
      };
    },
  },
  function (e) {
    e.O(
      0,
      [3862, 9926, 7794, 4244, 6178, 567, 7631, 8894, 2723, 9774, 2888, 179],
      function () {
        return (n = 5593), e((e.s = n));
        var n;
      }
    );
    var n = e.O();
    _N_E = n;
  },
]);
//# sourceMappingURL=surveys-ae6753a6d8a14c36.js.map
