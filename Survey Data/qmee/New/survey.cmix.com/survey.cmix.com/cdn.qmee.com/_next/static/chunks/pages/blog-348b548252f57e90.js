(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9195],
  {
    23986: function (e, n, l) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/blog",
        function () {
          return l(25545);
        },
      ]);
    },
    14480: function (e, n, l) {
      "use strict";
      var a = l(85893);
      l(67294);
      n.Z = function (e) {
        var n = e.color,
          l = e.className;
        return (0, a.jsx)("svg", {
          className: l,
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
    4542: function (e, n, l) {
      "use strict";
      var a = l(85893),
        t = l(86010),
        r = l(67294),
        o = l(11570),
        s = l.n(o),
        i = l(39414);
      function u(e, n, l) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: l,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[n] = l),
          e
        );
      }
      function c(e, n) {
        if (null == e) return {};
        var l,
          a,
          t = (function (e, n) {
            if (null == e) return {};
            var l,
              a,
              t = {},
              r = Object.keys(e);
            for (a = 0; a < r.length; a++)
              (l = r[a]), n.indexOf(l) >= 0 || (t[l] = e[l]);
            return t;
          })(e, n);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (a = 0; a < r.length; a++)
            (l = r[a]),
              n.indexOf(l) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, l) &&
                  (t[l] = e[l]));
        }
        return t;
      }
      function d(e, n) {
        var l = e.className,
          r = e.children,
          o = e.component,
          d = e.interactive,
          g = c(e, ["className", "children", "component", "interactive"]),
          m = o || "div";
        return (0, a.jsx)(
          m,
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var l = null != arguments[n] ? arguments[n] : {},
                a = Object.keys(l);
              "function" === typeof Object.getOwnPropertySymbols &&
                (a = a.concat(
                  Object.getOwnPropertySymbols(l).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(l, e).enumerable;
                  })
                )),
                a.forEach(function (n) {
                  u(e, n, l[n]);
                });
            }
            return e;
          })(
            {
              className: (0, t.Z)(
                s().root,
                d || o === i.Z ? s().interactive : s().outlined,
                l
              ),
            },
            g,
            { ref: n, children: r }
          )
        );
      }
      n.Z = r.forwardRef(d);
    },
    28052: function (e, n, l) {
      "use strict";
      var a = l(85893),
        t = l(67294),
        r = (l(22578), l(67912)),
        o = l(27484),
        s = l.n(o),
        i = l(14480),
        u = l(48020),
        c = l(39414),
        d = l(4542),
        g = l(80933),
        m = l(83133),
        f = l.n(m),
        y = l(2161),
        p = t.forwardRef(function (e, n) {
          var l = e.postRef,
            t = (0, r.useFragment)(y, l);
          return (0,
          a.jsx)("li", { ref: n, children: (0, a.jsxs)(d.Z, { interactive: !0, component: c.Z, to: "/blog/".concat(t.slug), className: f().root, children: [t.imageUrl && (0, a.jsx)(g.Z, { loading: "lazy", src: t.imageUrl, alt: "", width: 352, height: 200 }), (0, a.jsxs)("article", { children: [(0, a.jsx)("h3", { children: t.title }), (0, a.jsx)("span", { children: s()(t.date).calendar() }), (0, a.jsx)("p", { children: t.excerpt }), (0, a.jsxs)(u.Z, { buttonType: "tertiary", children: ["Read more", (0, a.jsx)(i.Z, {})] })] })] }) });
        });
      n.Z = p;
    },
    2161: function (e, n, l) {
      "use strict";
      l.r(n);
      var a = {
        argumentDefinitions: [],
        kind: "Fragment",
        metadata: null,
        name: "BlogPostItem_item",
        selections: [
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
            name: "imageUrl",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "excerpt",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "date",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "slug",
            storageKey: null,
          },
        ],
        type: "BlogPost",
        abstractKey: null,
        hash: "6bcab581071c2ca79d30f87057149968",
      };
      n.default = a;
    },
    44824: function (e, n, l) {
      "use strict";
      var a = l(85893),
        t = (l(67294), l(86010)),
        r = l(87794),
        o = l(31636),
        s = l.n(o),
        i = r.Z;
      n.Z = function (e) {
        var n = e.className,
          l = e.children;
        return e.animate
          ? (0, a.jsx)(i, {
              typeName: "ul",
              className: (0, t.Z)(s().root, n),
              children: l,
            })
          : (0, a.jsx)("ul", { className: (0, t.Z)(s().root, n), children: l });
      };
    },
    66210: function (e, n, l) {
      "use strict";
      var a = l(85893),
        t = (l(67294), l(86010)),
        r = l(90119),
        o = l(4542),
        s = l(13800),
        i = l.n(s);
      n.Z = function (e) {
        var n = e.children,
          l = e.className,
          s = e.contentClassName;
        return (0, a.jsxs)("div", {
          className: (0, t.Z)(i().root, l),
          children: [
            (0, a.jsx)("div", {
              className: (0, t.Z)(i().contentContainer, s),
              children: n,
            }),
            (0, a.jsx)(o.Z, {
              className: (0, t.Z)(i().entryContainer, "logged-out-only"),
              component: "aside",
              interactive: !0,
              children: (0, a.jsx)(r.Z, {}),
            }),
          ],
        });
      };
    },
    1327: function (e, n, l) {
      "use strict";
      l.r(n);
      var a = (function () {
        var e = [
            { defaultValue: 12, kind: "LocalArgument", name: "count" },
            { defaultValue: null, kind: "LocalArgument", name: "cursor" },
          ],
          n = [
            { kind: "Variable", name: "after", variableName: "cursor" },
            { kind: "Variable", name: "first", variableName: "count" },
          ];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "BlogPostsPaginationQuery",
            selections: [
              {
                args: [
                  { kind: "Variable", name: "count", variableName: "count" },
                  { kind: "Variable", name: "cursor", variableName: "cursor" },
                ],
                kind: "FragmentSpread",
                name: "BlogPosts_posts",
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "BlogPostsPaginationQuery",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: "BlogPostConnection",
                kind: "LinkedField",
                name: "blogPosts",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "BlogPostEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "cursor",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "BlogPost",
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
                            name: "title",
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
                            name: "excerpt",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "date",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "slug",
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
                        name: "endCursor",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "hasNextPage",
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
                args: n,
                filters: null,
                handle: "connection",
                key: "BlogPosts_query_blogPosts",
                kind: "LinkedHandle",
                name: "blogPosts",
              },
            ],
          },
          params: {
            cacheID: "dda141cb57d796a52ba4ec42ac942a7f",
            id: null,
            metadata: {},
            name: "BlogPostsPaginationQuery",
            operationKind: "query",
            text: "query BlogPostsPaginationQuery(\n  $count: Int = 12\n  $cursor: String\n) {\n  ...BlogPosts_posts_1G22uz\n}\n\nfragment BlogPostItem_item on BlogPost {\n  title\n  imageUrl\n  excerpt\n  date\n  slug\n}\n\nfragment BlogPosts_posts_1G22uz on Query {\n  blogPosts(first: $count, after: $cursor) {\n    edges {\n      cursor\n      node {\n        id\n        ...BlogPostItem_item\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
          },
        };
      })();
      (a.hash = "18205ef3c82f94067f3e8ffdce2510ca"), (n.default = a);
    },
    54818: function (e, n, l) {
      "use strict";
      l.r(n);
      var a = (function () {
        var e = [{ defaultValue: null, kind: "LocalArgument", name: "count" }],
          n = [{ kind: "Variable", name: "first", variableName: "count" }];
        return {
          fragment: {
            argumentDefinitions: e,
            kind: "Fragment",
            metadata: null,
            name: "BlogPostsQuery",
            selections: [
              {
                args: [
                  { kind: "Variable", name: "count", variableName: "count" },
                ],
                kind: "FragmentSpread",
                name: "BlogPosts_posts",
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: e,
            kind: "Operation",
            name: "BlogPostsQuery",
            selections: [
              {
                alias: null,
                args: n,
                concreteType: "BlogPostConnection",
                kind: "LinkedField",
                name: "blogPosts",
                plural: !1,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "BlogPostEdge",
                    kind: "LinkedField",
                    name: "edges",
                    plural: !0,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "cursor",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        concreteType: "BlogPost",
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
                            name: "title",
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
                            name: "excerpt",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "date",
                            storageKey: null,
                          },
                          {
                            alias: null,
                            args: null,
                            kind: "ScalarField",
                            name: "slug",
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
                        name: "endCursor",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "hasNextPage",
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
                args: n,
                filters: null,
                handle: "connection",
                key: "BlogPosts_query_blogPosts",
                kind: "LinkedHandle",
                name: "blogPosts",
              },
            ],
          },
          params: {
            cacheID: "95bafa91050a071616968f143da15c74",
            id: null,
            metadata: {},
            name: "BlogPostsQuery",
            operationKind: "query",
            text: "query BlogPostsQuery(\n  $count: Int\n) {\n  ...BlogPosts_posts_yu5n1\n}\n\nfragment BlogPostItem_item on BlogPost {\n  title\n  imageUrl\n  excerpt\n  date\n  slug\n}\n\nfragment BlogPosts_posts_yu5n1 on Query {\n  blogPosts(first: $count) {\n    edges {\n      cursor\n      node {\n        id\n        ...BlogPostItem_item\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
          },
        };
      })();
      (a.hash = "ae1fb3d5ae30f2ac80ea1e7f587e695e"), (n.default = a);
    },
    53626: function (e, n, l) {
      "use strict";
      l.r(n);
      var a = (function () {
        var e = ["blogPosts"];
        return {
          argumentDefinitions: [
            { defaultValue: 12, kind: "LocalArgument", name: "count" },
            { defaultValue: null, kind: "LocalArgument", name: "cursor" },
          ],
          kind: "Fragment",
          metadata: {
            connection: [
              {
                count: "count",
                cursor: "cursor",
                direction: "forward",
                path: e,
              },
            ],
            refetch: {
              connection: {
                forward: { count: "count", cursor: "cursor" },
                backward: null,
                path: e,
              },
              fragmentPathInResult: [],
              operation: l(1327),
            },
          },
          name: "BlogPosts_posts",
          selections: [
            {
              alias: "blogPosts",
              args: null,
              concreteType: "BlogPostConnection",
              kind: "LinkedField",
              name: "__BlogPosts_query_blogPosts_connection",
              plural: !1,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "BlogPostEdge",
                  kind: "LinkedField",
                  name: "edges",
                  plural: !0,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "cursor",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "BlogPost",
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
                          name: "BlogPostItem_item",
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
                      name: "endCursor",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "hasNextPage",
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
      (a.hash = "18205ef3c82f94067f3e8ffdce2510ca"), (n.default = a);
    },
    25545: function (e, n, l) {
      "use strict";
      l.r(n),
        l.d(n, {
          __N_SSG: function () {
            return b;
          },
          default: function () {
            return x;
          },
        });
      var a = l(85893),
        t = (l(67294), l(67912)),
        r = (l(22578), l(44824)),
        o = l(13179),
        s = l(28052),
        i = l(48020),
        u = l(66210),
        c = l(84646),
        d = l(12651),
        g = l.n(d),
        m = l(9008),
        f = l.n(m),
        y = l(11163),
        p = l(54818),
        k = l(53626),
        _ = function (e) {
          var n = e.postsRef,
            l = (0, t.usePaginationFragment)(k, n),
            d = l.data,
            m = l.loadNext,
            p = l.isLoadingNext,
            _ = l.hasNext,
            h = (0, y.useRouter)();
          return d.blogPosts
            ? (0, a.jsxs)("div", {
                children: [
                  (0, a.jsx)(f(), {
                    children: (0, a.jsx)("link", {
                      rel: "alternate",
                      type: "application/rss+xml",
                      title: "Qmee Blog RSS Feed",
                      href: "https://qmee.com/rss/blog-rss/feed-".concat(
                        h.locale,
                        ".xml"
                      ),
                    }),
                  }),
                  (0, a.jsxs)(u.Z, {
                    children: [
                      (0, a.jsx)("div", { className: g().background }),
                      (0, a.jsx)(c.Z, {
                        component: "h1",
                        className: g().header,
                        children: "Latest from our blog",
                      }),
                      (0, a.jsx)(r.Z, {
                        animate: !0,
                        children: d.blogPosts.edges.map(function (e) {
                          var n = e.node;
                          return (0, a.jsx)(s.Z, { postRef: n }, n.id);
                        }),
                      }),
                      _
                        ? (0, a.jsx)(i.Z, {
                            className: g().showMoreButton,
                            disabled: p,
                            buttonType: "tertiary",
                            onClick: function () {
                              return m(12);
                            },
                            children: (0, a.jsx)(c.Z, {
                              component: "p",
                              children: "Show more",
                            }),
                          })
                        : null,
                    ],
                  }),
                ],
              })
            : (0, a.jsx)(o.Z, {
                errorDescription:
                  "We are having trouble loading our blog at the moment.",
              });
        },
        h = function () {
          var e = (0, t.useLazyLoadQuery)(
            p,
            { count: 12 },
            { fetchPolicy: "store-or-network" }
          );
          return (0, a.jsx)(_, { postsRef: e });
        },
        P = l(82688),
        b = !0,
        x = (0, P.bg)(h, {
          metaData: {
            title: "Blog",
            description:
              "Come and check out the Qmee blog and find out more about us.",
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
    83133: function (e) {
      e.exports = { root: "BlogPostItem_root__0IdxR" };
    },
    31636: function (e) {
      e.exports = { root: "ItemList_root__jjHJx" };
    },
    13800: function (e) {
      e.exports = {
        root: "AsideEntryForm_root__iOtaO",
        contentContainer: "AsideEntryForm_contentContainer__6S5tR",
        entryContainer: "AsideEntryForm_entryContainer__l4WF8",
      };
    },
    12651: function (e) {
      e.exports = {
        background: "BlogPosts_background__023s_",
        header: "BlogPosts_header__YOb6h",
        "show-more-button": "BlogPosts_show-more-button__WweHS",
      };
    },
  },
  function (e) {
    e.O(0, [3862, 7794, 4244, 6178, 119, 9774, 2888, 179], function () {
      return (n = 23986), e((e.s = n));
      var n;
    });
    var n = e.O();
    _N_E = n;
  },
]);
//# sourceMappingURL=blog-348b548252f57e90.js.map
