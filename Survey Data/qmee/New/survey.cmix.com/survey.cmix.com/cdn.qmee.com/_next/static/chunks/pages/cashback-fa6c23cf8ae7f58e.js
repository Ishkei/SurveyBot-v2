(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5034],
  {
    73284: function (e, n, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/cashback",
        function () {
          return a(23212);
        },
      ]);
    },
    39256: function (e, n, a) {
      "use strict";
      var l = a(85893),
        r = (a(67294), a(67912)),
        s = (a(22578), a(48251)),
        i = a(84646),
        t = a(11163),
        o = a(18857),
        u = a(98640),
        d = function (e) {
          return !e.includes("gaming");
        };
      n.Z = function () {
        var e = (0, t.useRouter)(),
          n = Array.isArray(e.query.category)
            ? e.query.category[0]
            : e.query.category,
          a = (0, r.useLazyLoadQuery)(
            u,
            {
              requiredTags: [n].filter(Boolean),
              promoTags: [n, o.yJ].filter(Boolean),
            },
            { fetchPolicy: "store-or-network" }
          );
        return a.cashbacks
          ? (0, l.jsx)(s.Z, {
              offersRef: a.cashbacks,
              promosRef: a.cashbackPromos,
              offerType: "cashback",
              filterByTags: d,
            })
          : (0, l.jsx)(i.Z, {
              component: "p",
              children:
                "We are having trouble loading cashback offers at the moment.",
            });
      };
    },
    98640: function (e, n, a) {
      "use strict";
      a.r(n);
      var l = (function () {
        var e = {
            defaultValue: null,
            kind: "LocalArgument",
            name: "promoTags",
          },
          n = {
            defaultValue: null,
            kind: "LocalArgument",
            name: "requiredTags",
          },
          a = { kind: "Literal", name: "rejectedTags", value: ["gaming"] },
          l = [
            {
              fields: [
                a,
                {
                  kind: "Variable",
                  name: "requiredTags",
                  variableName: "requiredTags",
                },
              ],
              kind: "ObjectValue",
              name: "input",
            },
          ],
          r = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          s = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "tags",
            storageKey: null,
          },
          i = [
            { kind: "Literal", name: "first", value: 1 },
            {
              fields: [
                a,
                {
                  kind: "Variable",
                  name: "requiredTags",
                  variableName: "promoTags",
                },
              ],
              kind: "ObjectValue",
              name: "input",
            },
          ],
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "title",
            storageKey: null,
          },
          o = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "name",
            storageKey: null,
          },
          u = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "imageUrl",
            storageKey: null,
          },
          d = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "guid",
            storageKey: null,
          },
          c = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "paysReward",
            storageKey: null,
          },
          g = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "rewardLabel",
            storageKey: null,
          };
        return {
          fragment: {
            argumentDefinitions: [e, n],
            kind: "Fragment",
            metadata: null,
            name: "CashbackQuery",
            selections: [
              {
                alias: null,
                args: l,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "cashbacks",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "OfferEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "Offer",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [r, s],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  { args: null, kind: "FragmentSpread", name: "Offers_offers" },
                ],
                storageKey: null,
              },
              {
                alias: "cashbackPromos",
                args: i,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "cashbacks",
                plural: !1,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "OfferPromoBanner_promos",
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
            argumentDefinitions: [n, e],
            kind: "Operation",
            name: "CashbackQuery",
            selections: [
              {
                alias: null,
                args: l,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "cashbacks",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "OfferEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "Offer",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [
                          r,
                          s,
                          t,
                          {
                            alias: null,
                            args: null,
                            concreteType: "Advertiser",
                            kind: "LinkedField",
                            name: "advertiser",
                            plural: !1,
                            selections: [o, u],
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            concreteType: "Category",
                            kind: "LinkedField",
                            name: "categories",
                            plural: !0,
                            selections: [
                              {
                                alias: null,
                                args: null,
                                kind: "ScalarField",
                                name: "tag",
                                storageKey: null,
                              },
                              o,
                            ],
                            storageKey: null,
                          },
                          d,
                          c,
                          g,
                        ],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  r,
                ],
                storageKey: null,
              },
              {
                alias: "cashbackPromos",
                args: i,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "cashbacks",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "OfferEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "Offer",
                        kind: "LinkedField",
                        name: "node",
                        plural: !1,
                        selections: [
                          c,
                          r,
                          u,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "desktopImageUrl",
                            storageKey: null,
                          },
                          t,
                          g,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "slug",
                            storageKey: null,
                          },
                          d,
                          {
                            alias: null,
                            args: null,
                            concreteType: "Advertiser",
                            kind: "LinkedField",
                            name: "advertiser",
                            plural: !1,
                            selections: [o],
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  r,
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            cacheID: "a1f34ce2225a2d448ba9f1c85ab6973f",
            id: null,
            metadata: {},
            name: "CashbackQuery",
            operationKind: "query",
            text: 'query CashbackQuery(\n  $requiredTags: [String!]\n  $promoTags: [String!]\n) {\n  cashbacks(input: {requiredTags: $requiredTags, rejectedTags: ["gaming"]}) {\n    edges {\n      node {\n        id\n        tags\n      }\n    }\n    ...Offers_offers\n    id\n  }\n  cashbackPromos: cashbacks(input: {requiredTags: $promoTags, rejectedTags: ["gaming"]}, first: 1) {\n    ...OfferPromoBanner_promos\n    id\n  }\n}\n\nfragment OfferItem_offer on Offer {\n  id\n  title\n  guid\n  advertiser {\n    name\n    imageUrl\n  }\n  tags\n  paysReward\n  rewardLabel\n}\n\nfragment OfferPromoBanner_promos on OfferConnection {\n  edges {\n    node {\n      paysReward\n      id\n      imageUrl\n      desktopImageUrl\n      title\n      rewardLabel\n      slug\n      guid\n      advertiser {\n        name\n      }\n    }\n  }\n}\n\nfragment Offers_offers on OfferConnection {\n  edges {\n    node {\n      id\n      title\n      advertiser {\n        name\n      }\n      categories {\n        tag\n        name\n      }\n      tags\n      ...OfferItem_offer\n    }\n  }\n}\n',
          },
        };
      })();
      (l.hash = "936f5bd29efab1644517c2950bc87536"), (n.default = l);
    },
    23212: function (e, n, a) {
      "use strict";
      a.r(n),
        a.d(n, {
          __N_SSG: function () {
            return s;
          },
        });
      var l = a(39256),
        r = a(82688),
        s = !0;
      n.default = (0, r.bg)(l.Z, {
        metaData: {
          title: "Cashback",
          description:
            "Earn cashback on great products and enjoy your wallet being a little bigger at the end of the month.",
        },
      });
    },
  },
  function (e) {
    e.O(0, [3862, 4244, 6178, 567, 8251, 9774, 2888, 179], function () {
      return (n = 73284), e((e.s = n));
      var n;
    });
    var n = e.O();
    _N_E = n;
  },
]);
//# sourceMappingURL=cashback-fa6c23cf8ae7f58e.js.map
