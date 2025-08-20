(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2363],
  {
    62134: function (e, n, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/gaming",
        function () {
          return a(90490);
        },
      ]);
    },
    30621: function (e, n, a) {
      "use strict";
      a.r(n);
      var l = (function () {
        var e = [
            {
              kind: "Literal",
              name: "input",
              value: { requiredTags: ["gaming"] },
            },
          ],
          n = [
            { kind: "Literal", name: "first", value: 1 },
            {
              kind: "Literal",
              name: "input",
              value: { requiredTags: ["gaming", "promo"] },
            },
          ],
          a = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          l = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "title",
            storageKey: null,
          },
          r = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "name",
            storageKey: null,
          },
          i = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "imageUrl",
            storageKey: null,
          },
          s = {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "guid",
            storageKey: null,
          },
          t = {
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
            argumentDefinitions: [],
            kind: "Fragment",
            metadata: null,
            name: "GamingQuery",
            selections: [
              {
                alias: "gaming",
                args: e,
                concreteType: "OfferConnection",
                kind: "LinkedField",
                name: "cashbacks",
                plural: !1,
                selections: [
                  { args: null, kind: "FragmentSpread", name: "Offers_offers" },
                ],
                storageKey: 'cashbacks(input:{"requiredTags":["gaming"]})',
              },
              {
                alias: "gamingPromos",
                args: n,
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
                storageKey:
                  'cashbacks(first:1,input:{"requiredTags":["gaming","promo"]})',
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: [],
            kind: "Operation",
            name: "GamingQuery",
            selections: [
              {
                alias: "gaming",
                args: e,
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
                          a,
                          l,
                          {
                            alias: null,
                            args: null,
                            concreteType: "Advertiser",
                            kind: "LinkedField",
                            name: "advertiser",
                            plural: !1,
                            selections: [r, i],
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
                              r,
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
                          s,
                          t,
                          g,
                        ],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  a,
                ],
                storageKey: 'cashbacks(input:{"requiredTags":["gaming"]})',
              },
              {
                alias: "gamingPromos",
                args: n,
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
                          t,
                          a,
                          i,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "desktopImageUrl",
                            storageKey: null,
                          },
                          l,
                          g,
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "slug",
                            storageKey: null,
                          },
                          s,
                          {
                            alias: null,
                            args: null,
                            concreteType: "Advertiser",
                            kind: "LinkedField",
                            name: "advertiser",
                            plural: !1,
                            selections: [r],
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  a,
                ],
                storageKey:
                  'cashbacks(first:1,input:{"requiredTags":["gaming","promo"]})',
              },
            ],
          },
          params: {
            cacheID: "df9c67f5185fef81e0dcbf69c289f073",
            id: null,
            metadata: {},
            name: "GamingQuery",
            operationKind: "query",
            text: 'query GamingQuery {\n  gaming: cashbacks(input: {requiredTags: ["gaming"]}) {\n    ...Offers_offers\n    id\n  }\n  gamingPromos: cashbacks(input: {requiredTags: ["gaming", "promo"]}, first: 1) {\n    ...OfferPromoBanner_promos\n    id\n  }\n}\n\nfragment OfferItem_offer on Offer {\n  id\n  title\n  guid\n  advertiser {\n    name\n    imageUrl\n  }\n  tags\n  paysReward\n  rewardLabel\n}\n\nfragment OfferPromoBanner_promos on OfferConnection {\n  edges {\n    node {\n      paysReward\n      id\n      imageUrl\n      desktopImageUrl\n      title\n      rewardLabel\n      slug\n      guid\n      advertiser {\n        name\n      }\n    }\n  }\n}\n\nfragment Offers_offers on OfferConnection {\n  edges {\n    node {\n      id\n      title\n      advertiser {\n        name\n      }\n      categories {\n        tag\n        name\n      }\n      tags\n      ...OfferItem_offer\n    }\n  }\n}\n',
          },
        };
      })();
      (l.hash = "f44b9b127c39dab75016b13dee5d0c7b"), (n.default = l);
    },
    90490: function (e, n, a) {
      "use strict";
      a.r(n),
        a.d(n, {
          __N_SSG: function () {
            return o;
          },
          default: function () {
            return u;
          },
        });
      var l = a(85893),
        r = (a(67294), a(67912)),
        i = (a(22578), a(48251)),
        s = a(30621),
        t = function () {
          var e = (0, r.useLazyLoadQuery)(
            s,
            {},
            { fetchPolicy: "store-or-network" }
          );
          return e.gaming
            ? (0, l.jsx)(i.Z, {
                staticCategory: { name: "Gaming", tag: "gaming" },
                offersRef: e.gaming,
                promosRef: e.gamingPromos,
                hideCategories: !0,
                offerType: "gaming",
              })
            : (0, l.jsx)("p", {
                children:
                  "We are having trouble loading gaming offers at the moment.",
              });
        },
        g = a(82688),
        o = !0,
        u = (0, g.bg)(t, {
          metaData: {
            title: "Gaming Offers",
            description:
              "Earn cashback on games and enjoy your wallet being a little bigger at the end of the month.",
          },
        });
    },
  },
  function (e) {
    e.O(0, [3862, 4244, 6178, 567, 8251, 9774, 2888, 179], function () {
      return (n = 62134), e((e.s = n));
      var n;
    });
    var n = e.O();
    _N_E = n;
  },
]);
//# sourceMappingURL=gaming-e795306749e55c91.js.map
