(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9695],
  {
    26568: function (n, e, a) {
      "use strict";
      var t,
        l,
        r = a(67294);
      function i() {
        return (
          (i = Object.assign
            ? Object.assign.bind()
            : function (n) {
                for (var e = 1; e < arguments.length; e++) {
                  var a = arguments[e];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (n[t] = a[t]);
                }
                return n;
              }),
          i.apply(this, arguments)
        );
      }
      e.Z = function (n) {
        return r.createElement(
          "svg",
          i(
            {
              viewBox: "106 180 188 205",
              xmlns: "http://www.w3.org/2000/svg",
              stroke: "currentColor",
            },
            n
          ),
          t ||
            (t = r.createElement("circle", {
              fill: "none",
              strokeWidth: 14,
              cx: 199.89,
              cy: 285.334,
              r: 85.334,
            })),
          l ||
            (l = r.createElement("path", {
              strokeWidth: 14,
              strokeLinecap: "round",
              fill: "none",
              d: "M199.551 219.363v70.001l45.115 45.115",
            }))
        );
      };
    },
    32960: function (n, e, a) {
      "use strict";
      var t,
        l = a(67294);
      function r() {
        return (
          (r = Object.assign
            ? Object.assign.bind()
            : function (n) {
                for (var e = 1; e < arguments.length; e++) {
                  var a = arguments[e];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (n[t] = a[t]);
                }
                return n;
              }),
          r.apply(this, arguments)
        );
      }
      e.Z = function (n) {
        return l.createElement(
          "svg",
          r(
            {
              fill: "#69eda2",
              viewBox: "0 0 22 18",
              xmlns: "http://www.w3.org/2000/svg",
            },
            n
          ),
          t ||
            (t = l.createElement("path", {
              d: "M8.424 17.218a1.12 1.12 0 0 1-1.588 0L.494 10.875a1.684 1.684 0 0 1 0-2.382l.794-.795a1.684 1.684 0 0 1 2.382 0l3.96 3.96 10.7-10.7a1.684 1.684 0 0 1 2.382 0l.794.795a1.684 1.684 0 0 1 0 2.382L8.424 17.218Z",
            }))
        );
      };
    },
    5272: function (n, e, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/account/balance",
        function () {
          return a(87375);
        },
      ]);
    },
    79249: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = {
        fragment: {
          argumentDefinitions: [],
          kind: "Fragment",
          metadata: null,
          name: "BalanceQuery",
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "Balance",
              kind: "LinkedField",
              name: "balance",
              plural: !1,
              selections: [
                { args: null, kind: "FragmentSpread", name: "Balance_balance" },
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
          name: "BalanceQuery",
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
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
        },
        params: {
          cacheID: "81503f64698e73ad814038cc33f58c51",
          id: null,
          metadata: {},
          name: "BalanceQuery",
          operationKind: "query",
          text: "query BalanceQuery {\n  balance {\n    ...Balance_balance\n    id\n  }\n}\n\nfragment Balance_balance on Balance {\n  id\n  amount {\n    formatted\n  }\n}\n",
        },
        hash: "4ffcaeebee38d0a015e775491a9c1113",
      };
      e.default = t;
    },
    32163: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          e = [{ kind: "Variable", name: "id", variableName: "id" }];
        return {
          fragment: {
            argumentDefinitions: n,
            kind: "Fragment",
            metadata: null,
            name: "BalanceRefetchQuery",
            selections: [
              {
                alias: null,
                args: e,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "Balance_balance",
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
            argumentDefinitions: n,
            kind: "Operation",
            name: "BalanceRefetchQuery",
            selections: [
              {
                alias: null,
                args: e,
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
            cacheID: "e2d005a6e10c95172d4f72714a6e908b",
            id: null,
            metadata: {},
            name: "BalanceRefetchQuery",
            operationKind: "query",
            text: "query BalanceRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...Balance_balance\n    id\n  }\n}\n\nfragment Balance_balance on Balance {\n  id\n  amount {\n    formatted\n  }\n}\n",
          },
        };
      })();
      (t.hash = "32e59d99455da971088506b6350b84aa"), (e.default = t);
    },
    31228: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = {
        argumentDefinitions: [],
        kind: "Fragment",
        metadata: {
          refetch: {
            connection: null,
            fragmentPathInResult: ["node"],
            operation: a(32163),
            identifierField: "id",
          },
        },
        name: "Balance_balance",
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
            ],
            storageKey: null,
          },
        ],
        type: "Balance",
        abstractKey: null,
        hash: "32e59d99455da971088506b6350b84aa",
      };
      e.default = t;
    },
    54832: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "cents",
            storageKey: null,
          },
          e = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "formatted",
            storageKey: null,
          },
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "type",
            storageKey: null,
          },
          l = {
            alias: null,
            args: null,
            concreteType: "MoneyAmount",
            kind: "LinkedField",
            name: "amount",
            plural: !1,
            selections: [
              n,
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "currency",
                storageKey: null,
              },
              e,
            ],
            storageKey: null,
          },
          r = [
            t,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "label",
              storageKey: null,
            },
            l,
          ];
        return {
          argumentDefinitions: [],
          kind: "Fragment",
          metadata: {
            refetch: {
              connection: null,
              fragmentPathInResult: ["node"],
              operation: a(36364),
              identifierField: "id",
            },
          },
          name: "HistoryCharts_history",
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
              name: "status",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "MoneyAmount",
              kind: "LinkedField",
              name: "earningTotal",
              plural: !1,
              selections: [n, e],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "MoneyAmount",
              kind: "LinkedField",
              name: "cashoutTotal",
              plural: !1,
              selections: [e],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "HistoryTotalAmount",
              kind: "LinkedField",
              name: "earningBreakdown",
              plural: !0,
              selections: r,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "HistoryTotalAmount",
              kind: "LinkedField",
              name: "cashoutBreakdown",
              plural: !0,
              selections: r,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "HistoryMonthlyAmount",
              kind: "LinkedField",
              name: "monthlyEarnings",
              plural: !0,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "date",
                  storageKey: null,
                },
                t,
                l,
              ],
              storageKey: null,
            },
          ],
          type: "History",
          abstractKey: null,
        };
      })();
      (t.hash = "e152ee58d93ea3ded6a8788580477103"), (e.default = t);
    },
    36364: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          e = [{ kind: "Variable", name: "id", variableName: "id" }],
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "cents",
            storageKey: null,
          },
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "formatted",
            storageKey: null,
          },
          l = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "type",
            storageKey: null,
          },
          r = {
            alias: null,
            args: null,
            concreteType: "MoneyAmount",
            kind: "LinkedField",
            name: "amount",
            plural: !1,
            selections: [
              a,
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "currency",
                storageKey: null,
              },
              t,
            ],
            storageKey: null,
          },
          i = [
            l,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "label",
              storageKey: null,
            },
            r,
          ];
        return {
          fragment: {
            argumentDefinitions: n,
            kind: "Fragment",
            metadata: null,
            name: "HistoryRefetchQuery",
            selections: [
              {
                alias: null,
                args: e,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "HistoryCharts_history",
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
            argumentDefinitions: n,
            kind: "Operation",
            name: "HistoryRefetchQuery",
            selections: [
              {
                alias: null,
                args: e,
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
                        kind: "ScalarField",
                        name: "status",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "MoneyAmount",
                        kind: "LinkedField",
                        name: "earningTotal",
                        plural: !1,
                        selections: [a, t],
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "MoneyAmount",
                        kind: "LinkedField",
                        name: "cashoutTotal",
                        plural: !1,
                        selections: [t],
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "HistoryTotalAmount",
                        kind: "LinkedField",
                        name: "earningBreakdown",
                        plural: !0,
                        selections: i,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "HistoryTotalAmount",
                        kind: "LinkedField",
                        name: "cashoutBreakdown",
                        plural: !0,
                        selections: i,
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "HistoryMonthlyAmount",
                        kind: "LinkedField",
                        name: "monthlyEarnings",
                        plural: !0,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "date",
                            storageKey: null,
                          },
                          l,
                          r,
                        ],
                        storageKey: null,
                      },
                    ],
                    type: "History",
                    abstractKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "927c26bc0f216325d6238ab618766186",
            id: null,
            metadata: {},
            name: "HistoryRefetchQuery",
            operationKind: "query",
            text: "query HistoryRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...HistoryCharts_history\n    id\n  }\n}\n\nfragment HistoryCharts_history on History {\n  id\n  status\n  earningTotal {\n    cents\n    formatted\n  }\n  cashoutTotal {\n    formatted\n  }\n  earningBreakdown {\n    type\n    label\n    amount {\n      cents\n      currency\n      formatted\n    }\n  }\n  cashoutBreakdown {\n    type\n    label\n    amount {\n      cents\n      currency\n      formatted\n    }\n  }\n  monthlyEarnings {\n    date\n    type\n    amount {\n      cents\n      currency\n      formatted\n    }\n  }\n}\n",
          },
        };
      })();
      (t.hash = "e152ee58d93ea3ded6a8788580477103"), (e.default = t);
    },
    4578: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = [
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
          name: "OfferHistoryItem_offer",
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "guid",
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
              concreteType: "Advertiser",
              kind: "LinkedField",
              name: "advertiser",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "name",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "MoneyAmount",
              kind: "LinkedField",
              name: "pendingAmount",
              plural: !1,
              selections: n,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "MoneyAmount",
              kind: "LinkedField",
              name: "approvedAmount",
              plural: !1,
              selections: n,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "MoneyAmount",
              kind: "LinkedField",
              name: "rejectedAmount",
              plural: !1,
              selections: n,
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "updatedAt",
              storageKey: null,
            },
          ],
          type: "OfferStatus",
          abstractKey: null,
        };
      })();
      (t.hash = "fcc11f559362c1cb84e9c6ec7faf72cc"), (e.default = t);
    },
    27693: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = {
        argumentDefinitions: [],
        kind: "Fragment",
        metadata: {
          refetch: {
            connection: null,
            fragmentPathInResult: ["node"],
            operation: a(45755),
            identifierField: "id",
          },
        },
        name: "OfferHistory_offerHistory",
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "OfferStatusEdge",
            kind: "LinkedField",
            name: "edges",
            plural: !0,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "OfferStatus",
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "guid",
                    storageKey: null,
                  },
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "OfferHistoryItem_offer",
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
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
        ],
        type: "OfferStatusConnection",
        abstractKey: null,
        hash: "09ea33f5492cdc1a6bfcf77d2b2b623e",
      };
      e.default = t;
    },
    45755: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          e = [{ kind: "Variable", name: "id", variableName: "id" }],
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
              kind: "ScalarField",
              name: "formatted",
              storageKey: null,
            },
          ];
        return {
          fragment: {
            argumentDefinitions: n,
            kind: "Fragment",
            metadata: null,
            name: "OfferStatusRefetchQuery",
            selections: [
              {
                alias: null,
                args: e,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "OfferHistory_offerHistory",
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
            argumentDefinitions: n,
            kind: "Operation",
            name: "OfferStatusRefetchQuery",
            selections: [
              {
                alias: null,
                args: e,
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
                        concreteType: "OfferStatusEdge",
                        kind: "LinkedField",
                        name: "edges",
                        plural: !0,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            concreteType: "OfferStatus",
                            kind: "LinkedField",
                            name: "node",
                            plural: !1,
                            selections: [
                              {
                                alias: null,
                                args: null,
                                kind: "ScalarField",
                                name: "guid",
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
                                concreteType: "Advertiser",
                                kind: "LinkedField",
                                name: "advertiser",
                                plural: !1,
                                selections: [
                                  {
                                    alias: null,
                                    args: null,
                                    kind: "ScalarField",
                                    name: "name",
                                    storageKey: null,
                                  },
                                ],
                                storageKey: null,
                              },
                              {
                                alias: null,
                                args: null,
                                concreteType: "MoneyAmount",
                                kind: "LinkedField",
                                name: "pendingAmount",
                                plural: !1,
                                selections: t,
                                storageKey: null,
                              },
                              {
                                alias: null,
                                args: null,
                                concreteType: "MoneyAmount",
                                kind: "LinkedField",
                                name: "approvedAmount",
                                plural: !1,
                                selections: t,
                                storageKey: null,
                              },
                              {
                                alias: null,
                                args: null,
                                concreteType: "MoneyAmount",
                                kind: "LinkedField",
                                name: "rejectedAmount",
                                plural: !1,
                                selections: t,
                                storageKey: null,
                              },
                              {
                                alias: null,
                                args: null,
                                kind: "ScalarField",
                                name: "updatedAt",
                                storageKey: null,
                              },
                              a,
                            ],
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                    ],
                    type: "OfferStatusConnection",
                    abstractKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "08bb8de395c9d03024e5eb07bd4c5df9",
            id: null,
            metadata: {},
            name: "OfferStatusRefetchQuery",
            operationKind: "query",
            text: "query OfferStatusRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...OfferHistory_offerHistory\n    id\n  }\n}\n\nfragment OfferHistoryItem_offer on OfferStatus {\n  guid\n  title\n  advertiser {\n    name\n  }\n  pendingAmount {\n    formatted\n  }\n  approvedAmount {\n    formatted\n  }\n  rejectedAmount {\n    formatted\n  }\n  updatedAt\n}\n\nfragment OfferHistory_offerHistory on OfferStatusConnection {\n  edges {\n    node {\n      guid\n      ...OfferHistoryItem_offer\n      id\n    }\n  }\n  id\n}\n",
          },
        };
      })();
      (t.hash = "09ea33f5492cdc1a6bfcf77d2b2b623e"), (e.default = t);
    },
    62428: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = [{ defaultValue: null, kind: "LocalArgument", name: "input" }],
          e = [
            {
              alias: null,
              args: [
                { kind: "Variable", name: "input", variableName: "input" },
              ],
              concreteType: "CashoutResponse",
              kind: "LinkedField",
              name: "resendGiftCard",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "successful",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "message",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ];
        return {
          fragment: {
            argumentDefinitions: n,
            kind: "Fragment",
            metadata: null,
            name: "TransactionItemResendGiftCardMutation",
            selections: e,
            type: "Mutation",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: n,
            kind: "Operation",
            name: "TransactionItemResendGiftCardMutation",
            selections: e,
          },
          params: {
            cacheID: "cc88c938b5617ded8be9399b8323ac96",
            id: null,
            metadata: {},
            name: "TransactionItemResendGiftCardMutation",
            operationKind: "mutation",
            text: "mutation TransactionItemResendGiftCardMutation(\n  $input: ResendGiftCardInput!\n) {\n  resendGiftCard(input: $input) {\n    successful\n    message\n  }\n}\n",
          },
        };
      })();
      (t.hash = "fbf42567fc7a6769d444ee5b4662a0ae"), (e.default = t);
    },
    17926: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = {
        argumentDefinitions: [],
        kind: "Fragment",
        metadata: null,
        name: "TransactionItem_transaction",
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
            name: "createdAt",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "eventType",
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
            ],
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "giftCardId",
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
            name: "status",
            storageKey: null,
          },
        ],
        type: "Transaction",
        abstractKey: null,
        hash: "71fa8f9a894b7ef92ad4d70e9e57b0ce",
      };
      e.default = t;
    },
    76207: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = [
            { defaultValue: 20, kind: "LocalArgument", name: "count" },
            { defaultValue: null, kind: "LocalArgument", name: "cursor" },
          ],
          e = [
            { kind: "Variable", name: "after", variableName: "cursor" },
            { kind: "Variable", name: "first", variableName: "count" },
          ];
        return {
          fragment: {
            argumentDefinitions: n,
            kind: "Fragment",
            metadata: null,
            name: "TransactionListPaginationQuery",
            selections: [
              {
                args: [
                  { kind: "Variable", name: "count", variableName: "count" },
                  { kind: "Variable", name: "cursor", variableName: "cursor" },
                ],
                kind: "FragmentSpread",
                name: "TransactionList_transactions",
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: n,
            kind: "Operation",
            name: "TransactionListPaginationQuery",
            selections: [
              {
                alias: null,
                args: e,
                concreteType: "TransactionConnection",
                kind: "LinkedField",
                name: "transactions",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "TransactionEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "Transaction",
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
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "createdAt",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "eventType",
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
                            ],
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "giftCardId",
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
                            name: "status",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "__typename",
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "cursor",
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
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
                        name: "hasNextPage",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "endCursor",
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
                args: e,
                filters: null,
                handle: "connection",
                key: "TransactionList_query_transactions",
                kind: "LinkedHandle",
                name: "transactions",
              },
            ],
          },
          params: {
            cacheID: "e0acb0417fa6509cc709db6a875676db",
            id: null,
            metadata: {},
            name: "TransactionListPaginationQuery",
            operationKind: "query",
            text: "query TransactionListPaginationQuery(\n  $count: Int = 20\n  $cursor: String\n) {\n  ...TransactionList_transactions_1G22uz\n}\n\nfragment TransactionItem_transaction on Transaction {\n  id\n  createdAt\n  eventType\n  amount {\n    formatted\n  }\n  giftCardId\n  description\n  status\n}\n\nfragment TransactionList_transactions_1G22uz on Query {\n  transactions(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...TransactionItem_transaction\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n",
          },
        };
      })();
      (t.hash = "4ab5954c2104020438e1284ef2ac4654"), (e.default = t);
    },
    39713: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = ["transactions"];
        return {
          argumentDefinitions: [
            { defaultValue: 20, kind: "LocalArgument", name: "count" },
            { defaultValue: null, kind: "LocalArgument", name: "cursor" },
          ],
          kind: "Fragment",
          metadata: {
            connection: [
              {
                count: "count",
                cursor: "cursor",
                direction: "forward",
                path: n,
              },
            ],
            refetch: {
              connection: {
                forward: { count: "count", cursor: "cursor" },
                backward: null,
                path: n,
              },
              fragmentPathInResult: [],
              operation: a(76207),
            },
          },
          name: "TransactionList_transactions",
          selections: [
            {
              alias: "transactions",
              args: null,
              concreteType: "TransactionConnection",
              kind: "LinkedField",
              name: "__TransactionList_query_transactions_connection",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "TransactionEdge",
                  kind: "LinkedField",
                  name: "edges",
                  plural: !0,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: "Transaction",
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
                        {
                          args: null,
                          kind: "FragmentSpread",
                          name: "TransactionItem_transaction",
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "__typename",
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "cursor",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
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
                      name: "hasNextPage",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "endCursor",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          type: "Query",
          abstractKey: null,
        };
      })();
      (t.hash = "4ab5954c2104020438e1284ef2ac4654"), (e.default = t);
    },
    46080: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = {
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
          e = [{ kind: "Literal", name: "first", value: 20 }],
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "formatted",
            storageKey: null,
          },
          l = [t],
          r = {
            alias: null,
            args: null,
            concreteType: "MoneyAmount",
            kind: "LinkedField",
            name: "amount",
            plural: !1,
            selections: l,
            storageKey: null,
          },
          i = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "status",
            storageKey: null,
          },
          s = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "name",
            storageKey: null,
          },
          o = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "cents",
            storageKey: null,
          },
          u = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "type",
            storageKey: null,
          },
          c = {
            alias: null,
            args: null,
            concreteType: "MoneyAmount",
            kind: "LinkedField",
            name: "amount",
            plural: !1,
            selections: [
              o,
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "currency",
                storageKey: null,
              },
              t,
            ],
            storageKey: null,
          },
          d = [
            u,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "label",
              storageKey: null,
            },
            c,
          ];
        return {
          fragment: {
            argumentDefinitions: [],
            kind: "Fragment",
            metadata: null,
            name: "AccountBalanceQuery",
            selections: [
              {
                args: null,
                kind: "FragmentSpread",
                name: "TransactionList_transactions",
              },
              {
                alias: null,
                args: null,
                concreteType: "OfferStatusConnection",
                kind: "LinkedField",
                name: "offerHistory",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "OfferHistory_offerHistory",
                  },
                ],
                storageKey: null,
              },
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
                    name: "Balance_balance",
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "History",
                kind: "LinkedField",
                name: "history",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "HistoryCharts_history",
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
                selections: [n],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "CashoutProviders",
                kind: "LinkedField",
                name: "cashoutProviders",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "CashoutProviderButtons_providers",
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
            name: "AccountBalanceQuery",
            selections: [
              {
                alias: null,
                args: e,
                concreteType: "TransactionConnection",
                kind: "LinkedField",
                name: "transactions",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "TransactionEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "Transaction",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [
                          a,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "createdAt",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "eventType",
                            storageKey: null,
                          },
                          r,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "giftCardId",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "description",
                            storageKey: null,
                          },
                          i,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "__typename",
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "cursor",
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
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
                        name: "hasNextPage",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "endCursor",
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: "transactions(first:20)",
              },
              {
                alias: null,
                args: e,
                filters: null,
                handle: "connection",
                key: "TransactionList_query_transactions",
                kind: "LinkedHandle",
                name: "transactions",
              },
              {
                alias: null,
                args: null,
                concreteType: "OfferStatusConnection",
                kind: "LinkedField",
                name: "offerHistory",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "OfferStatusEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "OfferStatus",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "guid",
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
                            concreteType: "Advertiser",
                            kind: "LinkedField",
                            name: "advertiser",
                            plural: !1,
                            selections: [s],
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            concreteType: "MoneyAmount",
                            kind: "LinkedField",
                            name: "pendingAmount",
                            plural: !1,
                            selections: l,
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            concreteType: "MoneyAmount",
                            kind: "LinkedField",
                            name: "approvedAmount",
                            plural: !1,
                            selections: l,
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            concreteType: "MoneyAmount",
                            kind: "LinkedField",
                            name: "rejectedAmount",
                            plural: !1,
                            selections: l,
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "updatedAt",
                            storageKey: null,
                          },
                          a,
                        ],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  a,
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "Balance",
                kind: "LinkedField",
                name: "balance",
                plural: !1,
                selections: [a, r],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "History",
                kind: "LinkedField",
                name: "history",
                plural: !1,
                selections: [
                  a,
                  i,
                  {
                    alias: null,
                    args: null,
                    concreteType: "MoneyAmount",
                    kind: "LinkedField",
                    name: "earningTotal",
                    plural: !1,
                    selections: [o, t],
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "MoneyAmount",
                    kind: "LinkedField",
                    name: "cashoutTotal",
                    plural: !1,
                    selections: l,
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "HistoryTotalAmount",
                    kind: "LinkedField",
                    name: "earningBreakdown",
                    plural: !0,
                    selections: d,
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "HistoryTotalAmount",
                    kind: "LinkedField",
                    name: "cashoutBreakdown",
                    plural: !0,
                    selections: d,
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "HistoryMonthlyAmount",
                    kind: "LinkedField",
                    name: "monthlyEarnings",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "date",
                        storageKey: null,
                      },
                      u,
                      c,
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
                selections: [n, a],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "CashoutProviders",
                kind: "LinkedField",
                name: "cashoutProviders",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "CashoutProvider",
                    kind: "LinkedField",
                    name: "providers",
                    plural: !0,
                    selections: [s, i, a],
                    storageKey: null,
                  },
                  a,
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "45c754bfc72da591142e1014e5f64c3a",
            id: null,
            metadata: {},
            name: "AccountBalanceQuery",
            operationKind: "query",
            text: "query AccountBalanceQuery {\n  ...TransactionList_transactions\n  offerHistory {\n    ...OfferHistory_offerHistory\n    id\n  }\n  balance {\n    ...Balance_balance\n    id\n  }\n  history {\n    ...HistoryCharts_history\n    id\n  }\n  userData {\n    currency {\n      currencySymbol\n    }\n    id\n  }\n  cashoutProviders {\n    ...CashoutProviderButtons_providers\n    id\n  }\n}\n\nfragment Balance_balance on Balance {\n  id\n  amount {\n    formatted\n  }\n}\n\nfragment CashoutProviderButtons_providers on CashoutProviders {\n  providers {\n    name\n    status\n    id\n  }\n  id\n}\n\nfragment HistoryCharts_history on History {\n  id\n  status\n  earningTotal {\n    cents\n    formatted\n  }\n  cashoutTotal {\n    formatted\n  }\n  earningBreakdown {\n    type\n    label\n    amount {\n      cents\n      currency\n      formatted\n    }\n  }\n  cashoutBreakdown {\n    type\n    label\n    amount {\n      cents\n      currency\n      formatted\n    }\n  }\n  monthlyEarnings {\n    date\n    type\n    amount {\n      cents\n      currency\n      formatted\n    }\n  }\n}\n\nfragment OfferHistoryItem_offer on OfferStatus {\n  guid\n  title\n  advertiser {\n    name\n  }\n  pendingAmount {\n    formatted\n  }\n  approvedAmount {\n    formatted\n  }\n  rejectedAmount {\n    formatted\n  }\n  updatedAt\n}\n\nfragment OfferHistory_offerHistory on OfferStatusConnection {\n  edges {\n    node {\n      guid\n      ...OfferHistoryItem_offer\n      id\n    }\n  }\n  id\n}\n\nfragment TransactionItem_transaction on Transaction {\n  id\n  createdAt\n  eventType\n  amount {\n    formatted\n  }\n  giftCardId\n  description\n  status\n}\n\nfragment TransactionList_transactions on Query {\n  transactions(first: 20) {\n    edges {\n      node {\n        id\n        ...TransactionItem_transaction\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n",
          },
        };
      })();
      (t.hash = "5f6ec672bc2271c26cc8fa912c558104"), (e.default = t);
    },
    18576: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = {
        argumentDefinitions: [],
        kind: "Fragment",
        metadata: {
          refetch: {
            connection: null,
            fragmentPathInResult: ["node"],
            operation: a(43108),
            identifierField: "id",
          },
        },
        name: "CashoutProviderButtons_providers",
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "CashoutProvider",
            kind: "LinkedField",
            name: "providers",
            plural: !0,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "name",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "status",
                storageKey: null,
              },
            ],
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
        type: "CashoutProviders",
        abstractKey: null,
        hash: "4761be8425bb2dfd93fe6fff1cfd6872",
      };
      e.default = t;
    },
    43108: function (n, e, a) {
      "use strict";
      a.r(e);
      var t = (function () {
        var n = [{ defaultValue: null, kind: "LocalArgument", name: "id" }],
          e = [{ kind: "Variable", name: "id", variableName: "id" }],
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          };
        return {
          fragment: {
            argumentDefinitions: n,
            kind: "Fragment",
            metadata: null,
            name: "CashoutProvidersRefetchQuery",
            selections: [
              {
                alias: null,
                args: e,
                concreteType: null,
                kind: "LinkedField",
                name: "node",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "CashoutProviderButtons_providers",
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
            argumentDefinitions: n,
            kind: "Operation",
            name: "CashoutProvidersRefetchQuery",
            selections: [
              {
                alias: null,
                args: e,
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
                        concreteType: "CashoutProvider",
                        kind: "LinkedField",
                        name: "providers",
                        plural: !0,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "name",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "status",
                            storageKey: null,
                          },
                          a,
                        ],
                        storageKey: null,
                      },
                    ],
                    type: "CashoutProviders",
                    abstractKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "83b745e21a7db75db8378ffe0a87f276",
            id: null,
            metadata: {},
            name: "CashoutProvidersRefetchQuery",
            operationKind: "query",
            text: "query CashoutProvidersRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...CashoutProviderButtons_providers\n    id\n  }\n}\n\nfragment CashoutProviderButtons_providers on CashoutProviders {\n  providers {\n    name\n    status\n    id\n  }\n  id\n}\n",
          },
        };
      })();
      (t.hash = "4761be8425bb2dfd93fe6fff1cfd6872"), (e.default = t);
    },
    87375: function (n, e, a) {
      "use strict";
      a.r(e),
        a.d(e, {
          default: function () {
            return ae;
          },
        });
      var t = a(85893),
        l = a(67294),
        r = (a(22578), a(67912)),
        i = a(10866),
        s = a.n(i),
        o = a(22406),
        u = a.n(o),
        c = a(8089),
        d = a.n(c),
        m = a(27484),
        g = a.n(m),
        y = a(40406),
        f = a(48020),
        p = a(22946),
        h = a(26568),
        k = a(84646),
        v = a(65561),
        b = a(11163),
        _ = a(57748);
      function F(n, e) {
        (null == e || e > n.length) && (e = n.length);
        for (var a = 0, t = new Array(e); a < e; a++) t[a] = n[a];
        return t;
      }
      function K(n, e) {
        return (
          (function (n) {
            if (Array.isArray(n)) return n;
          })(n) ||
          (function (n, e) {
            var a =
              null == n
                ? null
                : ("undefined" !== typeof Symbol && n[Symbol.iterator]) ||
                  n["@@iterator"];
            if (null != a) {
              var t,
                l,
                r = [],
                i = !0,
                s = !1;
              try {
                for (
                  a = a.call(n);
                  !(i = (t = a.next()).done) &&
                  (r.push(t.value), !e || r.length !== e);
                  i = !0
                );
              } catch (o) {
                (s = !0), (l = o);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (s) throw l;
                }
              }
              return r;
            }
          })(n, e) ||
          (function (n, e) {
            if (!n) return;
            if ("string" === typeof n) return F(n, e);
            var a = Object.prototype.toString.call(n).slice(8, -1);
            "Object" === a && n.constructor && (a = n.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return F(n, e);
          })(n, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var T = a(17926),
        x = a(62428),
        S = function (n) {
          var e = n.transactionRef,
            a = (0, r.useFragment)(T, e),
            l = (function () {
              var n = (0, b.useRouter)();
              return (0, _.EB)(n.locale || n.defaultLocale || "en-en");
            })(),
            i = K((0, r.useMutation)(x), 2),
            s = i[0],
            o = i[1],
            u = (0, y.VY)();
          return (0, t.jsxs)("tr", {
            className: d().transactionContainer,
            children: [
              (0, t.jsxs)("th", {
                className: d().tableHeading,
                children: [
                  (0, t.jsx)("p", {
                    className: d().idText,
                    children: g()(a.createdAt).locale(_.O1[l]).format("L - LT"),
                  }),
                  (0, t.jsxs)("span", {
                    className: d().eventName,
                    children: [
                      (0, t.jsxs)(k.Z, {
                        children: [
                          "Cashout" === a.eventType
                            ? (function () {
                                switch (a.description) {
                                  case "charity":
                                    return "Charity ";
                                  case "gift_card":
                                    return "Gift Card ";
                                  case "paypal":
                                    return "PayPal ";
                                  default:
                                    return "";
                                }
                              })()
                            : "",
                          a.eventType.replace(/([A-Z])/g, " $1").trim(),
                        ],
                      }),
                      "Pending" === a.status &&
                        (0, t.jsxs)(v.Z, {
                          status: "info",
                          className: d().processingIndicator,
                          children: [(0, t.jsx)(h.Z, {}), "Processing"],
                        }),
                    ],
                  }),
                ],
              }),
              (0, t.jsx)("td", {
                className: d().dataWrapper,
                children: (0, t.jsxs)("div", {
                  className: d().transactionData,
                  children: [
                    a.giftCardId &&
                      (0, t.jsx)(f.Z, {
                        disabled: o,
                        onClick: function () {
                          s({
                            variables: { input: { giftCardId: a.giftCardId } },
                            onCompleted: function (n) {
                              var e, a, t;
                              u.show(
                                null === (e = n.resendGiftCard) || void 0 === e
                                  ? void 0
                                  : e.message,
                                {
                                  type: (
                                    null === (a = n.resendGiftCard) ||
                                    void 0 === a
                                      ? void 0
                                      : a.successful
                                  )
                                    ? "success"
                                    : "error",
                                  timeout: (0, p.Z)(
                                    null === (t = n.resendGiftCard) ||
                                      void 0 === t
                                      ? void 0
                                      : t.message
                                  ),
                                }
                              );
                            },
                          });
                        },
                        color: "accent",
                        buttonType: "tertiary",
                        children: (0, t.jsx)(k.Z, {
                          component: "p",
                          children: "Resend Gift Card",
                        }),
                      }),
                    (0, t.jsx)("p", {
                      className: d().pricingText,
                      children: a.amount.formatted,
                    }),
                  ],
                }),
              }),
            ],
          });
        },
        j = a(39713),
        L = function (n) {
          var e,
            a,
            l,
            i = n.transactionsRef,
            s = (0, r.usePaginationFragment)(j, i),
            o = s.data,
            c = s.loadNext,
            d = s.isLoadingNext;
          return (0, t.jsxs)("section", {
            className: u().transactionListContainer,
            children: [
              (0, t.jsx)(k.Z, {
                component: "h2",
                children: "Transaction History",
              }),
              (0, t.jsx)("table", {
                className: u().table,
                children: (0, t.jsx)("tbody", {
                  children:
                    null === (e = o.transactions) || void 0 === e
                      ? void 0
                      : e.edges.map(function (n) {
                          return (0,
                          t.jsx)(S, { transactionRef: n.node }, n.node.id);
                        }),
                }),
              }),
              (
                null === (a = o.transactions) ||
                void 0 === a ||
                null === (l = a.pageInfo) ||
                void 0 === l
                  ? void 0
                  : l.hasNextPage
              )
                ? (0, t.jsx)(f.Z, {
                    disabled: d,
                    className: u().button,
                    buttonType: "tertiary",
                    onClick: function () {
                      c(20);
                    },
                    children: (0, t.jsx)(k.Z, {
                      component: "p",
                      children: "Show More",
                    }),
                  })
                : null,
            ],
          });
        },
        C = a(13203),
        A = a(31228),
        w = function (n) {
          var e = n.balanceRef,
            a = (0, C.ZP)(A, e);
          return (0, t.jsx)(t.Fragment, { children: a.amount.formatted });
        },
        I = (a(79249), a(13499)),
        O = a(55376),
        P = a(19743),
        H = a.n(P),
        N = a(53624),
        Z = a(39414),
        E = a(21344),
        B = a(66775),
        M = a(86010);
      function R(n, e) {
        (null == e || e > n.length) && (e = n.length);
        for (var a = 0, t = new Array(e); a < e; a++) t[a] = n[a];
        return t;
      }
      function D(n, e, a) {
        return (
          e in n
            ? Object.defineProperty(n, e, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[e] = a),
          n
        );
      }
      function Q(n) {
        for (var e = 1; e < arguments.length; e++) {
          var a = null != arguments[e] ? arguments[e] : {},
            t = Object.keys(a);
          "function" === typeof Object.getOwnPropertySymbols &&
            (t = t.concat(
              Object.getOwnPropertySymbols(a).filter(function (n) {
                return Object.getOwnPropertyDescriptor(a, n).enumerable;
              })
            )),
            t.forEach(function (e) {
              D(n, e, a[e]);
            });
        }
        return n;
      }
      function q(n) {
        return (
          (function (n) {
            if (Array.isArray(n)) return R(n);
          })(n) ||
          (function (n) {
            if (
              ("undefined" !== typeof Symbol && null != n[Symbol.iterator]) ||
              null != n["@@iterator"]
            )
              return Array.from(n);
          })(n) ||
          (function (n, e) {
            if (!n) return;
            if ("string" === typeof n) return R(n, e);
            var a = Object.prototype.toString.call(n).slice(8, -1);
            "Object" === a && n.constructor && (a = n.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return R(n, e);
          })(n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      B.kL.register(B.qi),
        B.kL.register(B.f$),
        B.kL.register(B.uw),
        B.kL.register(B.ZL),
        B.kL.register(B.u),
        B.kL.register(B.De);
      var V = a(54832),
        W = function (n, e, a) {
          return {
            labels: e,
            datasets: [
              {
                data: n,
                backgroundColor: a,
                borderWidth: 1,
                pointStyle: "circle",
              },
            ],
          };
        };
      function $(n) {
        return n.charAt(0).toUpperCase() + n.slice(1);
      }
      var G,
        U,
        Y,
        z,
        J,
        X = ["#2bd675", "#ff3366", "#ffcf33", "#3399FF", "#495867", "#bc7100"],
        nn = function (n) {
          var e,
            a,
            r = n.historyRef,
            i = n.currencySymbol,
            s = function (n) {
              return {
                tooltip: {
                  callbacks: {
                    label: function (n) {
                      return ""
                        .concat(u(n.dataset.label || n.label), " ")
                        .concat(i)
                        .concat(n.raw.toFixed(2));
                    },
                  },
                },
                legend: { position: n, labels: { usePointStyle: !0 } },
              };
            },
            o = (0, C.ZP)(V, r),
            u = (0, E.Z)(),
            c =
              (null === o || void 0 === o ? void 0 : o.earningBreakdown) &&
              q(null === o || void 0 === o ? void 0 : o.earningBreakdown).sort(
                function (n, e) {
                  return e.amount.cents - n.amount.cents;
                }
              ),
            d =
              (null === o || void 0 === o ? void 0 : o.cashoutBreakdown) &&
              q(null === o || void 0 === o ? void 0 : o.cashoutBreakdown).sort(
                function (n, e) {
                  return e.amount.cents - n.amount.cents;
                }
              ),
            m = [
              (null === c || void 0 === c
                ? void 0
                : c.map(function (n) {
                    return n.amount.cents / 100;
                  })) || [],
              (null === c || void 0 === c
                ? void 0
                : c.map(function (n) {
                    return u($(n.type));
                  })) || [],
              (null === c || void 0 === c
                ? void 0
                : c.map(function (n, e) {
                    return X[e % X.length];
                  })) || [],
            ],
            y = m[0],
            f = m[1],
            p = m[2],
            h = [
              (null === d || void 0 === d
                ? void 0
                : d.map(function (n) {
                    return n.amount.cents / 100;
                  })) || [],
              (null === d || void 0 === d
                ? void 0
                : d.map(function (n) {
                    return u($(n.type));
                  })) || [],
              (null === d || void 0 === d
                ? void 0
                : d.map(function (n, e) {
                    return X[e % X.length];
                  })) || [],
            ],
            v = h[0],
            b = h[1],
            _ = h[2],
            F = W(y, f, p),
            K = { maintainAspectRatio: !1, responsive: !1 },
            T = l.useCallback(
              function (n) {
                var e = (function (n, e) {
                    return n.reduce(function (n, a) {
                      return (n[a[e]] = n[a[e]] || []).push(a), n;
                    }, {});
                  })(n, "type"),
                  a = Object.keys(e),
                  t = (function (n) {
                    return n
                      .filter(function (n, e, a) {
                        return a.indexOf(n) === e;
                      })
                      .sort(function (n, e) {
                        return n < e ? -1 : n > e ? 1 : 0;
                      });
                  })(
                    n.map(function (n) {
                      return n.date;
                    })
                  );
                return {
                  labels: t.map(function (n) {
                    return g()(n).format("MM/YY");
                  }),
                  datasets: a.map(function (n) {
                    return {
                      label: u($(n)),
                      data: t.map(function (a) {
                        var t, l;
                        return (
                          (null ===
                            (t = e[n].find(function (n) {
                              return n.date === a;
                            })) ||
                          void 0 === t ||
                          null === (l = t.amount) ||
                          void 0 === l
                            ? void 0
                            : l.cents) / 100 || 0
                        );
                      }),
                      backgroundColor:
                        X[
                          ((null === c || void 0 === c
                            ? void 0
                            : c.findIndex(function (e) {
                                return e.type === n;
                              })) || 0) % X.length
                        ],
                    };
                  }),
                };
              },
              [c, u]
            ),
            x = W(v, b, _),
            S = l.useMemo(
              function () {
                return o.monthlyEarnings ? T(o.monthlyEarnings) : null;
              },
              [o, T]
            ),
            j = {
              responsive: !0,
              maintainAspectRatio: !1,
              scales: {
                y: {
                  grid: { display: !1 },
                  ticks: {
                    callback: function (n) {
                      return ""
                        .concat(i)
                        .concat(
                          "number" === typeof n
                            ? n.toFixed(2)
                            : parseFloat(n).toFixed(2)
                        );
                    },
                  },
                  stacked: !0,
                },
                x: { grid: { display: !1 }, stacked: !0 },
              },
              plugins: s("bottom"),
            };
          return "valid" !== (null === o || void 0 === o ? void 0 : o.status) ||
            (o.earningTotal && 0 !== o.earningTotal.cents)
            ? "valid" === (null === o || void 0 === o ? void 0 : o.status)
              ? (0, t.jsxs)("div", {
                  className: H().root,
                  children: [
                    (0, t.jsxs)("div", {
                      className: H().graphContainer,
                      children: [
                        (0, t.jsxs)("div", {
                          className: H().container,
                          children: [
                            (0, t.jsx)(k.Z, {
                              component: "h4",
                              translateOptions: {
                                vars: [
                                  (null === (e = o.earningTotal) || void 0 === e
                                    ? void 0
                                    : e.formatted) || "",
                                ],
                              },
                              children: "Total Earnings: %1s;",
                            }),
                            (0, t.jsx)(O.$I, {
                              data: F,
                              width: 320,
                              height: 128,
                              options: Q({}, K, { plugins: s("right") }),
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: H().container,
                          children: [
                            (0, t.jsx)(k.Z, {
                              component: "h4",
                              translateOptions: {
                                vars: [
                                  (null === (a = o.cashoutTotal) || void 0 === a
                                    ? void 0
                                    : a.formatted) || "",
                                ],
                              },
                              children: "Total Cashouts: %1s;",
                            }),
                            (0, t.jsx)(O.$I, {
                              data: x,
                              width: 320,
                              height: 128,
                              options: Q({}, K, { plugins: s("right") }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    S &&
                      (0, t.jsxs)("div", {
                        className: (0, M.Z)(
                          H().container,
                          H().barChartContainer
                        ),
                        children: [
                          (0, t.jsx)(k.Z, {
                            component: "h4",
                            children: "Monthly Earnings:",
                          }),
                          (0, t.jsx)("div", {
                            className: H().barChart,
                            children: (0, t.jsx)(O.$Q, { data: S, options: j }),
                          }),
                        ],
                      }),
                  ],
                })
              : "empty" === (null === o || void 0 === o ? void 0 : o.status) ||
                "processing" ===
                  (null === o || void 0 === o ? void 0 : o.status)
              ? (0, t.jsxs)("div", {
                  className: H().root,
                  children: [
                    (0, t.jsx)(k.Z, {
                      component: "h4",
                      children: "Loading History",
                    }),
                    (0, t.jsx)(N.Z, {}),
                  ],
                })
              : ((0, I.i)({
                  error: Error("unexpected history status ".concat(o.status)),
                  params: {},
                }),
                (0, t.jsx)("div", {
                  className: H().root,
                  children: (0, t.jsxs)(k.Z, {
                    component: "h4",
                    children: [
                      "Something went wrong displaying your history! Please contact",
                      " ",
                      (0, t.jsx)(Z.Z, {
                        to: "mailto:support@qmee.com",
                        children: "support@qmee.com",
                      }),
                    ],
                  }),
                }))
            : null;
        },
        en = l.memo(nn),
        an = a(24070),
        tn = a.n(an),
        ln = a(94712),
        rn = a.n(ln),
        sn = a(50009),
        on = a.n(sn),
        un = a(20298),
        cn = a(32960),
        dn = a(65236),
        mn = a(4578),
        gn = function (n) {
          var e,
            a = n.offerRef,
            l = (0, r.useFragment)(mn, a);
          return (
            g().extend(rn()),
            (0, t.jsxs)("tr", {
              className: on().transactionContainer,
              children: [
                (0, t.jsx)("th", {
                  children: (0, t.jsx)("p", {
                    className: on().idText,
                    children: "".concat(g()(l.updatedAt).calendar()),
                  }),
                }),
                (0, t.jsxs)("td", {
                  className: on().dataWrapper,
                  children: [
                    (0, t.jsx)(k.Z, {
                      skipTranslation: !0,
                      component: "h3",
                      size: "normal",
                      className: on().eventName,
                      children: (0, t.jsxs)("a", {
                        href: "".concat(un.A.path, "/").concat(l.guid),
                        className: on().link,
                        children: [
                          (0, t.jsx)(k.Z, { children: "Cashback" }),
                          " - ",
                          (null === (e = l.advertiser) || void 0 === e
                            ? void 0
                            : e.name) || l.title,
                        ],
                      }),
                    }),
                    (0, t.jsx)("p", {
                      className: on().pricingText,
                      children: (function () {
                        return l.pendingAmount
                          ? (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsx)(k.Z, { children: "Pending" }),
                                " - ",
                                l.pendingAmount.formatted,
                                (0, t.jsx)(h.Z, { className: on().clock }),
                              ],
                            })
                          : l.rejectedAmount
                          ? (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsx)(k.Z, { children: "Rejected" }),
                                " - ",
                                (0, t.jsx)("s", {
                                  children: l.rejectedAmount.formatted,
                                }),
                                (0, t.jsx)(dn.Z, { className: on().cross }),
                              ],
                            })
                          : l.approvedAmount
                          ? (0, t.jsxs)(t.Fragment, {
                              children: [
                                (0, t.jsx)(k.Z, { children: "Approved" }),
                                " - ",
                                null === (n = l.approvedAmount) || void 0 === n
                                  ? void 0
                                  : n.formatted,
                                (0, t.jsx)(cn.Z, { className: on().tick }),
                              ],
                            })
                          : (0, t.jsx)(k.Z, { children: "Tracked" });
                        var n;
                      })(),
                    }),
                  ],
                }),
              ],
            })
          );
        },
        yn = a(27693),
        fn = function (n) {
          var e = n.offerHistoryRef,
            a = n.className,
            l = (0, C.ZP)(yn, e);
          return (
            g().extend(rn()),
            (0, t.jsxs)("section", {
              className: (0, M.Z)(tn().transactionListContainer, a),
              children: [
                (0, t.jsx)(k.Z, { component: "h2", children: "Offer History" }),
                (0, t.jsx)(v.Z, {
                  status: "warning",
                  className: tn().warning,
                  children: (0, t.jsx)(k.Z, {
                    children:
                      "When the offer provider notifies us that a cashback offer has been started, it will show up here as 'Pending'. This usually happens within 2 weeks.",
                  }),
                }),
                (null === l || void 0 === l ? void 0 : l.edges.length) > 0
                  ? (0, t.jsx)("table", {
                      className: tn().table,
                      children: (0, t.jsx)("tbody", {
                        children: l.edges.map(function (n) {
                          return (0,
                          t.jsx)(gn, { offerRef: n.node }, n.node.guid);
                        }),
                      }),
                    })
                  : (0, t.jsxs)(k.Z, {
                      component: "p",
                      children: [
                        "Your recent cashback offers will appear here. Check out some",
                        " ",
                        (0, t.jsxs)(k.Z, {
                          component: Z.Z,
                          to: un.A.path,
                          children: ["cashback offers", " "],
                        }),
                        "now to get started!",
                      ],
                    }),
              ],
            })
          );
        },
        pn = a(25769),
        hn = a(95345),
        kn = a(354),
        vn = a(29059);
      function bn() {
        return (
          (bn = Object.assign
            ? Object.assign.bind()
            : function (n) {
                for (var e = 1; e < arguments.length; e++) {
                  var a = arguments[e];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (n[t] = a[t]);
                }
                return n;
              }),
          bn.apply(this, arguments)
        );
      }
      var _n,
        Fn,
        Kn = function (n) {
          return l.createElement(
            "svg",
            bn(
              {
                width: 50,
                height: 50,
                viewBox: "0 1 50 51",
                fill: "none",
                stroke: "currentColor",
                xmlns: "http://www.w3.org/2000/svg",
              },
              n
            ),
            G ||
              (G = l.createElement("rect", {
                x: 0.65,
                y: 6.65,
                width: 48.7,
                height: 35.7,
                rx: 3.35,
                strokeWidth: 1.3,
              })),
            U ||
              (U = l.createElement("path", {
                strokeWidth: 1.3,
                d: "M0 29.35h50",
              })),
            Y ||
              (Y = l.createElement("circle", {
                cx: 10,
                cy: 26,
                r: 5.35,
                strokeWidth: 1.3,
              })),
            z ||
              (z = l.createElement("circle", {
                cx: 22,
                cy: 26,
                r: 5.35,
                strokeWidth: 1.3,
              })),
            J ||
              (J = l.createElement("path", {
                strokeWidth: 1.3,
                d: "m16.182 27.716 5.271 9.882M15.866 27.788l-5.757 9.608M16.35 43V7",
              }))
          );
        };
      function Tn() {
        return (
          (Tn = Object.assign
            ? Object.assign.bind()
            : function (n) {
                for (var e = 1; e < arguments.length; e++) {
                  var a = arguments[e];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (n[t] = a[t]);
                }
                return n;
              }),
          Tn.apply(this, arguments)
        );
      }
      var xn,
        Sn = function (n) {
          return l.createElement(
            "svg",
            Tn(
              {
                height: 44,
                viewBox: "0 0 44 44",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              n
            ),
            _n ||
              (_n = l.createElement(
                "g",
                { clipPath: "url(#CharityIcon_svg__a)" },
                l.createElement("path", {
                  d: "m39.498 27.652-8.101 2.786a3.441 3.441 0 0 0-3.381-4.047H22.45a.859.859 0 0 1-.422-.11l-4.54-2.554a6.02 6.02 0 0 0-2.95-.774H8.446a2.582 2.582 0 0 0-2.43-1.718H.859a.86.86 0 0 0-.859.86v15.468c0 .474.385.86.86.86h5.156a2.583 2.583 0 0 0 2.406-1.655c.972.12 2.098.409 2.805.833l4.495 2.697a10.958 10.958 0 0 0 10.17.58l16.04-7.063c1.776-.72 2.653-2.852 1.638-4.73-.747-1.383-2.496-1.998-4.072-1.433ZM6.875 35.848a.86.86 0 0 1-.86.855H1.72v-13.75h4.297a.86.86 0 0 1 .859.86v12.035Zm34.404-3.622-.028.01-16.066 7.075a9.237 9.237 0 0 1-8.579-.487l-4.494-2.697c-.963-.577-2.34-.929-3.518-1.07V24.672h5.944c.737 0 1.465.191 2.107.553l4.54 2.553c.385.217.823.332 1.265.332h5.565c.948 0 1.72.77 1.72 1.719 0 .944-.772 1.718-1.72 1.718H19.28a.86.86 0 1 0 0 1.719h8.736a3.43 3.43 0 0 0 1.611-.403l10.45-3.592c.77-.278 1.64-.001 1.982.63.512.948.088 1.977-.78 2.325Z",
                  fill: "currentColor",
                }),
                l.createElement(
                  "g",
                  { clipPath: "url(#CharityIcon_svg__b)" },
                  l.createElement("path", {
                    d: "m27.853 10.26.688 1.157.687-1.156c.279-.47.743-1.095 1.422-1.58A3.96 3.96 0 0 1 33 7.936c2.44 0 4.254 1.812 4.254 4.246 0 1.285-.548 2.41-1.663 3.648-1.134 1.26-2.773 2.55-4.845 4.174-.666.522-1.42 1.114-2.205 1.745-.785-.63-1.539-1.222-2.204-1.743l-.002-.002c-2.071-1.625-3.711-2.914-4.845-4.174-1.115-1.237-1.663-2.363-1.663-3.649 0-2.433 1.813-4.245 4.254-4.245.868 0 1.652.25 2.35.747l.463-.652-.463.652c.679.484 1.143 1.11 1.422 1.579Z",
                    stroke: "currentColor",
                    strokeWidth: 1.6,
                  })
                )
              )),
            Fn ||
              (Fn = l.createElement(
                "defs",
                null,
                l.createElement(
                  "clipPath",
                  { id: "CharityIcon_svg__a" },
                  l.createElement("path", { d: "M0 0h44v44H0z" })
                ),
                l.createElement(
                  "clipPath",
                  { id: "CharityIcon_svg__b" },
                  l.createElement("path", {
                    transform: "translate(19.027 4.757)",
                    d: "M0 0h19.027v19.027H0z",
                  })
                )
              ))
          );
        };
      function jn() {
        return (
          (jn = Object.assign
            ? Object.assign.bind()
            : function (n) {
                for (var e = 1; e < arguments.length; e++) {
                  var a = arguments[e];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (n[t] = a[t]);
                }
                return n;
              }),
          jn.apply(this, arguments)
        );
      }
      var Ln,
        Cn = function (n) {
          return l.createElement(
            "svg",
            jn(
              {
                viewBox: "0 0 29 33",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              n
            ),
            xn ||
              (xn = l.createElement("path", {
                d: "M25.355 10.515c-.023-.017-.05-.023-.075-.037.036-.331.055-.667.055-1.007C25.335 4.248 21.086 0 15.863 0H4.562a.61.61 0 0 0-.605.525L.006 28.635a.61.61 0 0 0 .605.696h6.31c-.26 1.693-.512 2.921-.514 2.935a.611.611 0 0 0 .598.734h6.306a.611.611 0 0 0 .604-.524l1.148-7.967h5.296c4.428 0 8.031-3.518 8.031-7.843 0-2.41-1.105-4.652-3.035-6.15ZM5.093 1.223h10.771c4.549 0 8.25 3.7 8.25 8.25 0 4.548-3.7 8.247-8.25 8.247H9.098a.61.61 0 0 0-.605.526L7.106 28.11H1.314L5.093 1.223ZM20.36 23.286h-5.825a.611.611 0 0 0-.605.524l-1.147 7.967H7.746c.122-.652.303-1.686.476-2.884.001-.008-.002-.014-.001-.022.006-.022.019-.042.022-.066l1.386-9.864h6.235c4.402 0 8.101-3.022 9.159-7.097 1.366 1.25 2.146 2.975 2.146 4.822 0 3.65-3.055 6.62-6.809 6.62Z",
                fill: "currentColor",
              }))
          );
        };
      function An() {
        return (
          (An = Object.assign
            ? Object.assign.bind()
            : function (n) {
                for (var e = 1; e < arguments.length; e++) {
                  var a = arguments[e];
                  for (var t in a)
                    Object.prototype.hasOwnProperty.call(a, t) && (n[t] = a[t]);
                }
                return n;
              }),
          An.apply(this, arguments)
        );
      }
      var wn = function (n) {
          return l.createElement(
            "svg",
            An(
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: 486.667,
                height: 532,
                viewBox: "0 0 381 413",
              },
              n
            ),
            Ln ||
              (Ln = l.createElement("path", {
                d: "M291.7 23.5c-35.7 8.9-65 16.5-65.2 16.7-.3.2 1.6 5.4 4.1 11.5 17.7 43.7 14.5 83.9-12.3 151.8-11.6 29.5-40.8 87.1-43.7 86.2-.8-.3-15.3-113.3-31.8-247.5l-2.2-18.4-5.1.7C98.9 28.9 9.4 40.3 9.1 40.6c-.3.2 6.2 49.1 14.3 108.7 8.1 59.5 19.2 141 24.7 181 5.4 40 9.9 73.5 9.9 74.3 0 1.2 12.3 1.4 91.8 1.4l91.7-.1 6.5-8.7c71-95.7 119.2-202.9 124.8-277.2 2-27.2-.3-67.5-4.8-85.4-3.1-12-9.3-27.7-10.8-27.5-.4 0-29.9 7.4-65.5 16.4z",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 14,
              }))
          );
        },
        In = a(33401),
        On = a.n(In),
        Pn = function (n) {
          var e = n.Icon,
            a = n.name;
          return (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsx)(e, { className: On().image }),
              (0, t.jsx)(k.Z, { component: "h3", children: a }),
            ],
          });
        },
        Hn = function (n) {
          var e = n.path,
            a = n.Icon,
            l = n.name,
            r = n.status,
            i = n.onLockedClick,
            s = "OFFLINE" === r;
          return "AVAILABLE" !== r
            ? (0, t.jsx)("button", {
                onClick: i,
                className: (0, M.Z)(On().cashoutLink, s && On().offline),
                children: (0, t.jsx)(Pn, { Icon: a, name: l }),
              })
            : (0, t.jsx)(Z.Z, {
                to: e,
                className: On().cashoutLink,
                children: (0, t.jsx)(Pn, { Icon: a, name: l }),
              });
        },
        Nn = a(59873),
        Zn = a(25177),
        En = a.n(Zn),
        Bn = function (n) {
          var e = n.name;
          return (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsxs)(k.Z, {
                component: "p",
                children: [
                  "To be able to process your cashout, we first need you to verify your identity via PayPal. To do this verification, we need you to link & cashout any amount to a PayPal account. After this, you'll be able to use ",
                  e,
                  " to receive your rewards.",
                ],
              }),
              (0, t.jsxs)(k.Z, {
                component: "p",
                children: [
                  "If you have any issues, please reach out to",
                  " ",
                  (0, t.jsx)(k.Z, {
                    component: "a",
                    href: "mailto:support@qmee.com",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "support@qmee.com",
                  }),
                  ".",
                ],
              }),
              (0, t.jsx)(f.Z, {
                component: "a",
                href: un.BM.path,
                children: (0, t.jsx)(k.Z, {
                  component: "p",
                  children: "Cash out to PayPal",
                }),
              }),
            ],
          });
        },
        Mn = function (n) {
          var e = n.name;
          return (0, t.jsx)(t.Fragment, {
            children: (0, t.jsxs)(k.Z, {
              component: "p",
              children: [
                "Cashouts to ",
                e,
                " are currently offline, and we are working to bring them back as soon as possible. Please check back later.",
              ],
            }),
          });
        },
        Rn = function (n) {
          var e = n.provider,
            a = n.onClose,
            l = n.name,
            r = (0, vn.vR)().hideModal;
          return (0, t.jsx)(Nn.Z, {
            onClose: function () {
              r(), a();
            },
            showClose: !0,
            children: (0, t.jsxs)("div", {
              className: En().modal,
              children: [
                (0, t.jsxs)(k.Z, {
                  component: "h2",
                  children: ["Cashout to ", l],
                }),
                "REQUIRES_VERIFICATION" === e.status
                  ? (0, t.jsx)(Bn, { name: l })
                  : (0, t.jsx)(Mn, { name: l }),
              ],
            }),
          });
        },
        Dn = a(36330),
        Qn = a.n(Dn);
      function qn(n, e) {
        (null == e || e > n.length) && (e = n.length);
        for (var a = 0, t = new Array(e); a < e; a++) t[a] = n[a];
        return t;
      }
      function Vn(n, e, a) {
        return (
          e in n
            ? Object.defineProperty(n, e, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[e] = a),
          n
        );
      }
      function Wn(n, e) {
        return (
          (function (n) {
            if (Array.isArray(n)) return n;
          })(n) ||
          (function (n, e) {
            var a =
              null == n
                ? null
                : ("undefined" !== typeof Symbol && n[Symbol.iterator]) ||
                  n["@@iterator"];
            if (null != a) {
              var t,
                l,
                r = [],
                i = !0,
                s = !1;
              try {
                for (
                  a = a.call(n);
                  !(i = (t = a.next()).done) &&
                  (r.push(t.value), !e || r.length !== e);
                  i = !0
                );
              } catch (o) {
                (s = !0), (l = o);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (s) throw l;
                }
              }
              return r;
            }
          })(n, e) ||
          Gn(n, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function $n(n) {
        return (
          (function (n) {
            if (Array.isArray(n)) return qn(n);
          })(n) ||
          (function (n) {
            if (
              ("undefined" !== typeof Symbol && null != n[Symbol.iterator]) ||
              null != n["@@iterator"]
            )
              return Array.from(n);
          })(n) ||
          Gn(n) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function Gn(n, e) {
        if (n) {
          if ("string" === typeof n) return qn(n, e);
          var a = Object.prototype.toString.call(n).slice(8, -1);
          return (
            "Object" === a && n.constructor && (a = n.constructor.name),
            "Map" === a || "Set" === a
              ? Array.from(a)
              : "Arguments" === a ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
              ? qn(n, e)
              : void 0
          );
        }
      }
      var Un = {
          PAYPAL: { path: un.BM.path, Icon: Cn, name: "PayPal" },
          VENMO: { path: un.XC.path, Icon: wn, name: "Venmo" },
          GIFT_CARD: { path: un.Gm.path, Icon: Kn, name: "Gift Cards" },
          CHARITY: { path: un.vq.path, Icon: Sn, name: "Charity" },
        },
        Yn = a(18576);
      function zn(n) {
        var e = n.cashoutProvidersRef,
          a = n.className,
          r = $n((0, C.ZP)(Yn, e).providers).sort(function (n, e) {
            return "OFFLINE" === n.status && "OFFLINE" !== e.status ? 1 : 0;
          }),
          i = Wn(l.useState(null), 2),
          s = i[0],
          o = i[1];
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)("div", {
              className: (0, M.Z)(Qn().cashoutLinks, a),
              children: r.map(function (n) {
                return (0, t.jsx)(
                  Hn,
                  (function (n) {
                    for (var e = 1; e < arguments.length; e++) {
                      var a = null != arguments[e] ? arguments[e] : {},
                        t = Object.keys(a);
                      "function" === typeof Object.getOwnPropertySymbols &&
                        (t = t.concat(
                          Object.getOwnPropertySymbols(a).filter(function (n) {
                            return Object.getOwnPropertyDescriptor(
                              a,
                              n
                            ).enumerable;
                          })
                        )),
                        t.forEach(function (e) {
                          Vn(n, e, a[e]);
                        });
                    }
                    return n;
                  })({}, Un[n.name], {
                    status: n.status,
                    onLockedClick: function () {
                      return o(n);
                    },
                  }),
                  n.name
                );
              }),
            }),
            s &&
              (0, t.jsx)(Rn, {
                provider: s,
                name: Un[s.name].name,
                onClose: function () {
                  return o(null);
                },
              }),
          ],
        });
      }
      function Jn(n, e) {
        (null == e || e > n.length) && (e = n.length);
        for (var a = 0, t = new Array(e); a < e; a++) t[a] = n[a];
        return t;
      }
      function Xn(n, e) {
        return (
          (function (n) {
            if (Array.isArray(n)) return n;
          })(n) ||
          (function (n, e) {
            var a =
              null == n
                ? null
                : ("undefined" !== typeof Symbol && n[Symbol.iterator]) ||
                  n["@@iterator"];
            if (null != a) {
              var t,
                l,
                r = [],
                i = !0,
                s = !1;
              try {
                for (
                  a = a.call(n);
                  !(i = (t = a.next()).done) &&
                  (r.push(t.value), !e || r.length !== e);
                  i = !0
                );
              } catch (o) {
                (s = !0), (l = o);
              } finally {
                try {
                  i || null == a.return || a.return();
                } finally {
                  if (s) throw l;
                }
              }
              return r;
            }
          })(n, e) ||
          (function (n, e) {
            if (!n) return;
            if ("string" === typeof n) return Jn(n, e);
            var a = Object.prototype.toString.call(n).slice(8, -1);
            "Object" === a && n.constructor && (a = n.constructor.name);
            if ("Map" === a || "Set" === a) return Array.from(a);
            if (
              "Arguments" === a ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
            )
              return Jn(n, e);
          })(n, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var ne = a(46080),
        ee = function () {
          var n,
            e = (0, vn.vR)().showModal,
            a = new Date(1970, 0, 1, 0, 0, 0, 0).toISOString(),
            i = l.useMemo(function () {
              return new Date().toISOString();
            }, []),
            o = (0, pn.Z)(),
            u = o.successMessage,
            c = o.amount,
            d = (0, hn.useWasShownReviewPrompt)(),
            m = new Date().getDay(),
            g = 6 === m || 0 === m,
            y = Xn(l.useState(!1), 2),
            f = y[0],
            p = y[1],
            h = l.useMemo(
              function () {
                return (
                  !f &&
                  !d &&
                  !g &&
                  "Successfully cashed out" === u &&
                  c &&
                  parseInt(c, 10) > 30
                );
              },
              [f, d, u, c, g]
            ),
            b = (0, kn.Z)(),
            _ = l.useCallback(
              function () {
                b({
                  type: "review_dialog_closed",
                  value: "account_balance_page",
                });
              },
              [b]
            );
          l.useEffect(
            function () {
              if (h) {
                p(!0);
                var n = { onClose: _ };
                e(vn.Ny.REVIEW_PROMPT_MODAL, n);
              }
            },
            [e, h, _, p]
          );
          var F = (0, r.useLazyLoadQuery)(
              ne,
              { startDate: a, endDate: i },
              { fetchPolicy: "store-or-network" }
            ),
            K = (0, t.jsx)(v.Z, {
              message:
                "We are having problems loading your offer history at the moment. Please try again later.",
              status: "warning",
            }),
            T = (0, t.jsx)(v.Z, {
              message:
                "We are having problems loading your history at the moment. Please try again later.",
              status: "warning",
            }),
            x = (0, t.jsx)(v.Z, {
              message:
                "We are having problems loading cashouts at the moment. Please try again later.",
              status: "warning",
            }),
            S = (0, t.jsx)(v.Z, {
              message:
                "We are having problems loading your balance at the moment. Please try again later.",
              status: "warning",
            }),
            j = (0, t.jsx)(v.Z, {
              message:
                "We are having trouble loading transactions at the moment. Please try again later.",
              status: "warning",
            });
          return (0, t.jsxs)("div", {
            className: s().root,
            children: [
              (0, t.jsx)(I.Z, {
                fallback: S,
                children: F.balance
                  ? (0, t.jsx)("h1", {
                      className: s().balance,
                      children: (0, t.jsx)(w, { balanceRef: F.balance }),
                    })
                  : S,
              }),
              (0, t.jsx)(k.Z, {
                component: "h3",
                className: s().cashoutsHeader,
                children: "Cash out to:",
              }),
              (0, t.jsx)(I.Z, {
                fallback: x,
                children: F.cashoutProviders
                  ? (0, t.jsx)(zn, { cashoutProvidersRef: F.cashoutProviders })
                  : x,
              }),
              (0, t.jsx)(I.Z, {
                fallback: T,
                children: (0, t.jsx)(l.Suspense, {
                  fallback: null,
                  children: F.history
                    ? (0, t.jsx)(en, {
                        historyRef: F.history,
                        currencySymbol:
                          (null === (n = F.userData) || void 0 === n
                            ? void 0
                            : n.currency.currencySymbol) || "",
                      })
                    : T,
                }),
              }),
              (0, t.jsx)(I.Z, {
                fallback: K,
                children: (0, t.jsx)(l.Suspense, {
                  fallback: null,
                  children: F.offerHistory
                    ? (0, t.jsx)(fn, { offerHistoryRef: F.offerHistory })
                    : K,
                }),
              }),
              (0, t.jsx)(I.Z, {
                fallback: j,
                children: (0, t.jsx)(l.Suspense, {
                  fallback: null,
                  children: (0, t.jsx)("div", {
                    children: F ? (0, t.jsx)(L, { transactionsRef: F }) : j,
                  }),
                }),
              }),
            ],
          });
        },
        ae = (0, a(82688).bg)(ee, {
          requiresAuthentication: !0,
          metaData: {
            title: "Account balance",
            description: "View and access your account balance",
          },
        });
    },
    19743: function (n) {
      n.exports = {
        root: "HistoryCharts_root__5tV1b",
        graphContainer: "HistoryCharts_graphContainer__LUPTE",
        container: "HistoryCharts_container__OY0wt",
        barChartContainer: "HistoryCharts_barChartContainer__9MCr4",
        barChart: "HistoryCharts_barChart__DLFlk",
      };
    },
    24070: function (n) {
      n.exports = {
        transactionListContainer:
          "OfferHistory_transactionListContainer__nFXoO",
        table: "OfferHistory_table___i6ml",
        warning: "OfferHistory_warning__CyEMa",
      };
    },
    50009: function (n) {
      n.exports = {
        transactionContainer: "OfferHistoryItem_transactionContainer__fQuel",
        dataWrapper: "OfferHistoryItem_dataWrapper__qEkna",
        idText: "OfferHistoryItem_idText__urlzE",
        eventName: "OfferHistoryItem_eventName__gyOC_",
        link: "OfferHistoryItem_link__5sNv6",
        pricingText: "OfferHistoryItem_pricingText__LEZrv",
        clock: "OfferHistoryItem_clock__FLkAQ",
        cross: "OfferHistoryItem_cross__1FqHI",
        tick: "OfferHistoryItem_tick__RYYRi",
      };
    },
    8089: function (n) {
      n.exports = {
        transactionContainer: "TransactionItem_transactionContainer__79VJE",
        tableHeading: "TransactionItem_tableHeading__40Imo",
        processingIndicator: "TransactionItem_processingIndicator___8z0O",
        dataWrapper: "TransactionItem_dataWrapper__DkNjJ",
        idText: "TransactionItem_idText__4o3bs",
        eventTypeText: "TransactionItem_eventTypeText__3VBUY",
        eventName: "TransactionItem_eventName__MkGbJ",
        transactionData: "TransactionItem_transactionData__JyLHA",
        pricingText: "TransactionItem_pricingText__oGytK",
      };
    },
    22406: function (n) {
      n.exports = {
        transactionListContainer:
          "TransactionList_transactionListContainer__ToPJo",
        table: "TransactionList_table__TQueb",
        button: "TransactionList_button__HOCEd",
      };
    },
    10866: function (n) {
      n.exports = {
        root: "AccountBalance_root__SxGjV",
        image: "AccountBalance_image__6U7h0",
        offerHistory: "AccountBalance_offerHistory__Xko_j",
        cashoutsHeader: "AccountBalance_cashoutsHeader__OmnU_",
        balance: "AccountBalance_balance__70S1U",
      };
    },
    33401: function (n) {
      n.exports = {
        image: "CashoutProviderButton_image__HyEF3",
        cashoutLink: "CashoutProviderButton_cashoutLink__kUiIc",
        offline: "CashoutProviderButton_offline__OZgw2",
      };
    },
    36330: function (n) {
      n.exports = {
        cashoutLinks: "CashoutProviderButtons_cashoutLinks___D9PG",
      };
    },
    25177: function (n) {
      n.exports = {
        modal: "CashoutProviderInfoModal_modal__0bDfJ",
        button: "CashoutProviderInfoModal_button__Udqvl",
      };
    },
  },
  function (n) {
    n.O(0, [2757, 3862, 5389, 4244, 6178, 5345, 9774, 2888, 179], function () {
      return (e = 5272), n((n.s = e));
      var e;
    });
    var e = n.O();
    _N_E = e;
  },
]);
//# sourceMappingURL=balance-6c229d2ea3abe1f2.js.map
