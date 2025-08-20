(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6784],
  {
    10091: function (e, n, r) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/survey-tips",
        function () {
          return r(77831);
        },
      ]);
    },
    14480: function (e, n, r) {
      "use strict";
      var t = r(85893);
      r(67294);
      n.Z = function (e) {
        var n = e.color,
          r = e.className;
        return (0, t.jsx)("svg", {
          className: r,
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
    4542: function (e, n, r) {
      "use strict";
      var t = r(85893),
        i = r(86010),
        o = r(67294),
        s = r(11570),
        c = r.n(s),
        a = r(39414);
      function u(e, n, r) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[n] = r),
          e
        );
      }
      function p(e, n) {
        if (null == e) return {};
        var r,
          t,
          i = (function (e, n) {
            if (null == e) return {};
            var r,
              t,
              i = {},
              o = Object.keys(e);
            for (t = 0; t < o.length; t++)
              (r = o[t]), n.indexOf(r) >= 0 || (i[r] = e[r]);
            return i;
          })(e, n);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (t = 0; t < o.length; t++)
            (r = o[t]),
              n.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (i[r] = e[r]));
        }
        return i;
      }
      function l(e, n) {
        var r = e.className,
          o = e.children,
          s = e.component,
          l = e.interactive,
          v = p(e, ["className", "children", "component", "interactive"]),
          h = s || "div";
        return (0, t.jsx)(
          h,
          (function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var r = null != arguments[n] ? arguments[n] : {},
                t = Object.keys(r);
              "function" === typeof Object.getOwnPropertySymbols &&
                (t = t.concat(
                  Object.getOwnPropertySymbols(r).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(r, e).enumerable;
                  })
                )),
                t.forEach(function (n) {
                  u(e, n, r[n]);
                });
            }
            return e;
          })(
            {
              className: (0, i.Z)(
                c().root,
                l || s === a.Z ? c().interactive : c().outlined,
                r
              ),
            },
            v,
            { ref: n, children: o }
          )
        );
      }
      n.Z = o.forwardRef(l);
    },
    77831: function (e, n, r) {
      "use strict";
      r.r(n),
        r.d(n, {
          __N_SSG: function () {
            return d;
          },
          default: function () {
            return y;
          },
        });
      var t = r(85893),
        i = (r(67294), r(74077)),
        o = r.n(i),
        s = r(84646),
        c = r(46112),
        a = r.n(c),
        u = r(20298),
        p = r(4542),
        l = r(39414),
        v = r(14480),
        h = function (e) {
          var n = e.tip,
            r = e.index,
            i = n.title,
            o = n.icon,
            c = n.path;
          return (0, t.jsxs)(p.Z, {
            interactive: !0,
            component: l.Z,
            to: "".concat(u.UC.path, "/").concat(c),
            className: a().root,
            children: [
              (0, t.jsx)("div", {
                className: a().tipIconContainer,
                children: (0, t.jsx)("svg", {
                  className: a().tipIcon,
                  children: (0, t.jsx)("image", {
                    width: "100%",
                    height: "100%",
                    href: o,
                  }),
                }),
              }),
              (0, t.jsxs)("header", {
                className: a().tipInfo,
                children: [
                  (0, t.jsx)(s.Z, {
                    component: "p",
                    className: a().tipNumber,
                    translateOptions: { vars: [r + 1] },
                    children: "Tip %1s;",
                  }),
                  (0, t.jsx)(s.Z, {
                    component: "h2",
                    className: a().tipName,
                    children: i,
                  }),
                ],
              }),
              (0, t.jsx)("div", {
                className: a().chevronContainer,
                children: (0, t.jsx)(v.Z, {
                  className: a().chevronIcon,
                  color: "#C3C5D0",
                }),
              }),
            ],
          });
        },
        m = function (e) {
          var n = e.surveyTips;
          return (0, t.jsxs)("main", {
            children: [
              (0, t.jsx)(s.Z, {
                component: "h1",
                className: o().surveyTipsTitle,
                children: "Survey Tips",
              }),
              (0, t.jsx)(s.Z, {
                component: "p",
                children:
                  "Survey providers are constantly analyzing your behaviour to ensure you are giving genuine, honest answers during surveys.",
              }),
              (0, t.jsx)(s.Z, {
                component: "p",
                children:
                  "If the providers are happy, it'll mean less declines & a better survey experience for you - which is what we all want! To make this easier, we think it's really useful to understand what the survey providers are looking for.",
              }),
              (0, t.jsx)(s.Z, {
                component: "p",
                children:
                  "So, check out the tips we've provided to help you become a 'Survey Winner'",
              }),
              (0, t.jsx)("section", {
                className: o().surveyTipsListWrapper,
                children: (0, t.jsx)("div", {
                  className: o().surveyTipsList,
                  children: n.map(function (e, n) {
                    return (0, t.jsx)(h, { tip: e, index: n }, e.path);
                  }),
                }),
              }),
            ],
          });
        },
        _ = r(82688),
        d = !0,
        y = (0, _.bg)(m, {
          requiresAuthentication: !1,
          metaData: {
            title: "Qmee Survey Tips",
            description:
              "Become a 'Survey Winner' when earning money with Qmee!",
            imageUrl:
              "https://cdn.assets.qmee.com/colour-scheme/survey-tips/banners/SocialShareBanner.png",
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
    46112: function (e) {
      e.exports = {
        root: "SurveyTipItem_root__2_ctU",
        chevronIcon: "SurveyTipItem_chevronIcon__72QC6",
        tipInfo: "SurveyTipItem_tipInfo__ns742",
        tipNumber: "SurveyTipItem_tipNumber__JE21_",
        tipName: "SurveyTipItem_tipName__h2CKO",
        tipIconContainer: "SurveyTipItem_tipIconContainer__E3YER",
        tipIcon: "SurveyTipItem_tipIcon__TuXzu",
        chevronContainer: "SurveyTipItem_chevronContainer__qULIh",
      };
    },
    74077: function (e) {
      e.exports = {
        surveyTipsListWrapper: "SurveyTips_surveyTipsListWrapper__b4vpB",
        surveyTipsTitle: "SurveyTips_surveyTipsTitle__1LcT_",
        surveyTipsList: "SurveyTips_surveyTipsList__DgX8g",
      };
    },
  },
  function (e) {
    e.O(0, [3862, 4244, 6178, 9774, 2888, 179], function () {
      return (n = 10091), e((e.s = n));
      var n;
    });
    var n = e.O();
    _N_E = n;
  },
]);
//# sourceMappingURL=survey-tips-f798ef5d68fd6bda.js.map
