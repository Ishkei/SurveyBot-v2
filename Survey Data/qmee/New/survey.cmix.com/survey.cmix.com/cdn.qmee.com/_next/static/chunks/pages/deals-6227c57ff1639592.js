(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [901],
  {
    78605: function (e, n, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/deals",
        function () {
          return a(94872);
        },
      ]);
    },
    58332: function (e, n, a) {
      "use strict";
      var l = a(85893),
        r = (a(67294), a(67912)),
        s = (a(22578), a(48251)),
        i = a(84646),
        t = a(11163),
        o = a(18857),
        d = a(70788);
      n.Z = function () {
        var e = (0, t.useRouter)(),
          n = Array.isArray(e.query.category)
            ? e.query.category[0]
            : e.query.category,
          a = (0, r.useLazyLoadQuery)(
            d,
            {
              requiredTags: [n].filter(Boolean),
              promoTags: [n, o.yJ].filter(Boolean),
            },
            { fetchPolicy: "store-or-network" }
          );
        return a.deals
          ? (0, l.jsx)(s.Z, {
              offersRef: a.deals,
              promosRef: a.dealsPromos,
              offerType: "deal",
            })
          : (0, l.jsx)(i.Z, {
              component: "p",
              children: "We are having trouble loading deals at the moment.",
            });
      };
    },
    70788: function (e, n, a) {
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
          a = [
            {
              fields: [
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
          l = [
            { kind: "Literal", name: "first", value: 1 },
            {
              fields: [
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
            name: "title",
            storageKey: null,
          },
          i = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "name",
            storageKey: null,
          },
          t = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "imageUrl",
            storageKey: null,
          },
          o = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "guid",
            storageKey: null,
          },
          d = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "paysReward",
            storageKey: null,
          },
          u = {
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
            name: "DealsQuery",
            selections: [
              {
                alias: null,
                args: a,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "deals",
                plural: !1,
                selections: [
                  { args: null, kind: "FragmentSpread", name: "Offers_offers" },
                ],
                storageKey: null,
              },
              {
                alias: "dealsPromos",
                args: l,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "deals",
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
            name: "DealsQuery",
            selections: [
              {
                alias: null,
                args: a,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "deals",
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
                          {
                            alias: null,
                            args: null,
                            concreteType: "Advertiser",
                            kind: "LinkedField",
                            name: "advertiser",
                            plural: !1,
                            selections: [i, t],
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
                              i,
                            ],
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "tags",
                            storageKey: null,
                          },
                          o,
                          d,
                          u,
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
                alias: "dealsPromos",
                args: l,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "deals",
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
                          d,
                          r,
                          t,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "desktopImageUrl",
                            storageKey: null,
                          },
                          s,
                          u,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "slug",
                            storageKey: null,
                          },
                          o,
                          {
                            alias: null,
                            args: null,
                            concreteType: "Advertiser",
                            kind: "LinkedField",
                            name: "advertiser",
                            plural: !1,
                            selections: [i],
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
            cacheID: "4f7cba036f37a0d31fab89644a212430",
            id: null,
            metadata: {},
            name: "DealsQuery",
            operationKind: "query",
            text: "query DealsQuery(\n  $requiredTags: [String!]\n  $promoTags: [String!]\n) {\n  deals(input: {requiredTags: $requiredTags}) {\n    ...Offers_offers\n    id\n  }\n  dealsPromos: deals(input: {requiredTags: $promoTags}, first: 1) {\n    ...OfferPromoBanner_promos\n    id\n  }\n}\n\nfragment OfferItem_offer on Offer {\n  id\n  title\n  guid\n  advertiser {\n    name\n    imageUrl\n  }\n  tags\n  paysReward\n  rewardLabel\n}\n\nfragment OfferPromoBanner_promos on OfferConnection {\n  edges {\n    node {\n      paysReward\n      id\n      imageUrl\n      desktopImageUrl\n      title\n      rewardLabel\n      slug\n      guid\n      advertiser {\n        name\n      }\n    }\n  }\n}\n\nfragment Offers_offers on OfferConnection {\n  edges {\n    node {\n      id\n      title\n      advertiser {\n        name\n      }\n      categories {\n        tag\n        name\n      }\n      tags\n      ...OfferItem_offer\n    }\n  }\n}\n",
          },
        };
      })();
      (l.hash = "1cd8be45aade219f005277f02495631d"), (n.default = l);
    },
    94872: function (e, n, a) {
      "use strict";
      a.r(n),
        a.d(n, {
          __N_SSG: function () {
            return s;
          },
        });
      var l = a(58332),
        r = a(82688),
        s = !0;
      n.default = (0, r.bg)(l.Z, {
        metaData: {
          title: "Deals",
          description:
            "Find deals and money saving coupons on the biggest brands around or just let us show you ones you\u2019ll like.",
        },
      });
    },
  },
  function (e) {
    e.O(0, [3862, 4244, 6178, 567, 8251, 9774, 2888, 179], function () {
      return (n = 78605), e((e.s = n));
      var n;
    });
    var n = e.O();
    _N_E = n;
  },
]);
//# sourceMappingURL=deals-6227c57ff1639592.js.map
