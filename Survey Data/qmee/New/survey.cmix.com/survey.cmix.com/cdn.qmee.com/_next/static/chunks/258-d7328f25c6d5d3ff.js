(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [258, 1779],
  {
    14480: function (e, t, n) {
      "use strict";
      var o = n(85893);
      n(67294);
      t.Z = function (e) {
        var t = e.color,
          n = e.className;
        return (0, o.jsx)("svg", {
          className: n,
          xmlns: "http://www.w3.org/2000/svg",
          width: "12",
          height: "13",
          viewBox: "0 0 12 22",
          children: (0, o.jsxs)("g", {
            fill: "none",
            fillRule: "evenodd",
            stroke: t || "currentColor",
            strokeWidth: "2",
            transform: "rotate(-180 5.5 10.5)",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              (0, o.jsx)("polygon", { points: "9.864 10 .197 0" }),
              (0, o.jsx)("path", { d: "M9.86363636,10 L0.196969697,20" }),
            ],
          }),
        });
      };
    },
    49594: function (e, t, n) {
      "use strict";
      var o = n(85893),
        i = n(86010),
        r = n(67294),
        s = n(69926),
        l = n(14480),
        a = n(84646),
        c = n(95832),
        d = n.n(c);
      function u(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o;
      }
      function h(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function g(e, t) {
        if (null == e) return {};
        var n,
          o,
          i = (function (e, t) {
            if (null == e) return {};
            var n,
              o,
              i = {},
              r = Object.keys(e);
            for (o = 0; o < r.length; o++)
              (n = r[o]), t.indexOf(n) >= 0 || (i[n] = e[n]);
            return i;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (o = 0; o < r.length; o++)
            (n = r[o]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (i[n] = e[n]));
        }
        return i;
      }
      function p(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != n) {
              var o,
                i,
                r = [],
                s = !0,
                l = !1;
              try {
                for (
                  n = n.call(e);
                  !(s = (o = n.next()).done) &&
                  (r.push(o.value), !t || r.length !== t);
                  s = !0
                );
              } catch (a) {
                (l = !0), (i = a);
              } finally {
                try {
                  s || null == n.return || n.return();
                } finally {
                  if (l) throw i;
                }
              }
              return r;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return u(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return u(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      t.Z = function (e) {
        var t,
          n,
          c = e.title,
          u = e.className,
          f = e.headerClassName,
          b = e.contentClassName,
          m = e.children,
          _ = e.startOpen,
          k = e.open,
          v = e.skipTitleTranslation,
          x = e.id,
          y = e.onOpen,
          C = e.headerIcon,
          j = g(e, [
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
          T = r.useRef(null),
          w = p(r.useState(_ || k), 2),
          N = w[0],
          O = w[1],
          Z = p(r.useState(!1), 2),
          S = Z[0],
          B = Z[1],
          E = p(r.useState(!0), 2),
          I = E[0],
          A = E[1],
          P = (0, s.q_)({
            from: {
              maxHeight: N
                ? 0
                : null === (t = T.current) || void 0 === t
                ? void 0
                : t.scrollHeight,
            },
            to: {
              maxHeight: N
                ? null === (n = T.current) || void 0 === n
                  ? void 0
                  : n.scrollHeight
                : 0,
            },
            onRest: function () {
              return A(!1);
            },
          });
        return (
          r.useEffect(
            function () {
              S && A(!0);
            },
            [S]
          ),
          r.useEffect(
            function () {
              N || S ? (A(!0), B(!0)) : A(!1), void 0 !== k && N !== k && O(k);
            },
            [k, N, S]
          ),
          (0, o.jsxs)(
            "div",
            (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {},
                  o = Object.keys(n);
                "function" === typeof Object.getOwnPropertySymbols &&
                  (o = o.concat(
                    Object.getOwnPropertySymbols(n).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(n, e).enumerable;
                    })
                  )),
                  o.forEach(function (t) {
                    h(e, t, n[t]);
                  });
              }
              return e;
            })({ id: x, className: (0, i.Z)(d().root, u) }, j, {
              children: [
                Boolean(c) &&
                  (0, o.jsxs)("button", {
                    className: (0, i.Z)(f),
                    type: "button",
                    onClick: function () {
                      y && y(x || "", !N), void 0 === k && O(!N);
                    },
                    children: [
                      (0, o.jsx)(a.Z, { skipTranslation: v, children: c }),
                      (0, o.jsx)(l.Z, {
                        className: (0, i.Z)(
                          d().icon,
                          N ? d().iconOpen : d().iconClosed
                        ),
                      }),
                      C,
                    ],
                  }),
                I
                  ? (0, o.jsx)(s.q.div, {
                      style: P,
                      className: (0, i.Z)(d().content, b),
                      ref: T,
                      children: m,
                    })
                  : (0, o.jsx)("div", {
                      style: { maxHeight: N ? "auto" : 0 },
                      className: (0, i.Z)(d().content, N && d().openContent, b),
                      ref: T,
                      children: m,
                    }),
              ],
            })
          )
        );
      };
    },
    91779: function (e, t, n) {
      "use strict";
      n.r(t);
      var o = n(85893),
        i = (n(67294), n(14194)),
        r = n(76199);
      t.default = function (e) {
        var t = e.children;
        return (0, o.jsx)(i.D, { remarkPlugins: [r.Z], children: t });
      };
    },
    39351: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return b;
        },
        C: function () {
          return f;
        },
      });
      var o = n(85893),
        i = n(86010),
        r = n(67294),
        s = n(11205),
        l = n.n(s),
        a = n(84364),
        c = n.n(a),
        d = n(84646);
      function u(e, t) {
        if (null == e) return {};
        var n,
          o,
          i = (function (e, t) {
            if (null == e) return {};
            var n,
              o,
              i = {},
              r = Object.keys(e);
            for (o = 0; o < r.length; o++)
              (n = r[o]), t.indexOf(n) >= 0 || (i[n] = e[n]);
            return i;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (o = 0; o < r.length; o++)
            (n = r[o]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (i[n] = e[n]));
        }
        return i;
      }
      var h = function (e) {
          var t = e.falseText,
            n = e.trueText,
            r = e.checked,
            s = e.disabled,
            l = e.id,
            a = e.onClick;
          e.children,
            u(e, [
              "falseText",
              "trueText",
              "checked",
              "disabled",
              "id",
              "onClick",
              "children",
            ]);
          return (0, o.jsxs)("div", {
            className: (0, i.Z)(c().root, s && c().disabled),
            children: [
              (0, o.jsx)("button", {
                type: "button",
                onClick: function () {
                  return a(!1);
                },
                disabled: s,
                className: (0, i.Z)(s && c().disabled),
                children: (0, o.jsx)(d.Z, {
                  component: "p",
                  className: (0, i.Z)(
                    c().text,
                    "".concat(
                      r || void 0 === r ? c().inactiveText : c().activeText
                    )
                  ),
                  children: t || "Off",
                }),
              }),
              (0, o.jsxs)("label", {
                htmlFor: "toggleButton-".concat(l),
                className: c().label,
                children: [
                  (0, o.jsx)("div", {
                    className: (0, i.Z)(c().switch),
                    children: (0, o.jsx)("span", {
                      className: (0, i.Z)(
                        c().slider,
                        r && c().sliderChecked,
                        s && c().disabled
                      ),
                      children: (0, o.jsx)("span", {
                        className: (0, i.Z)(
                          c().circle,
                          void 0 === r && c().unanswered,
                          r && c().circleChecked,
                          s && c().sliderDisabled
                        ),
                      }),
                    }),
                  }),
                  (0, o.jsx)("input", {
                    id: "toggleButton-".concat(l),
                    type: "checkbox",
                    className: c().input,
                    checked: r,
                    disabled: s,
                    onChange: function () {
                      return a(!r);
                    },
                    "aria-label": "toggleButton-".concat(l),
                  }),
                ],
              }),
              (0, o.jsx)("button", {
                type: "button",
                onClick: function () {
                  return a(!0);
                },
                disabled: s,
                className: (0, i.Z)(s && c().disabled),
                children: (0, o.jsx)(d.Z, {
                  component: "p",
                  className: (0, i.Z)(
                    c().text,
                    "".concat(r ? c().activeText : c().inactiveText)
                  ),
                  children: n || "On",
                }),
              }),
            ],
          });
        },
        g = n(49594),
        p = n(91779),
        f = function (e) {
          var t = e.description,
            n = e.details,
            r = e.title,
            s = e.checked,
            a = e.disabled,
            c = e.onCheckedChange,
            u = e.className,
            f = e.id;
          return (0, o.jsxs)("div", {
            className: (0, i.Z)(l().root, u),
            children: [
              (0, o.jsxs)("div", {
                children: [
                  (0, o.jsx)(d.Z, {
                    component: "h3",
                    className: l().title,
                    children: r,
                  }),
                  t &&
                    (0, o.jsx)(d.Z, {
                      component: "p",
                      className: l().subtitle,
                      children: t,
                    }),
                  n
                    ? (0, o.jsx)(g.Z, {
                        title: (0, o.jsx)(d.Z, {
                          component: "p",
                          children: "Learn More",
                        }),
                        className: l().collapsible,
                        headerClassName: l().collapsibleHeader,
                        children: (0, o.jsx)("div", {
                          className: l().details,
                          children: (0, o.jsx)(p.default, { children: n }),
                        }),
                      })
                    : null,
                ],
              }),
              (0, o.jsx)(h, {
                checked: s,
                onClick: function () {
                  c && c(!s);
                },
                id: f,
                disabled: a || !1,
              }),
            ],
          });
        },
        b = function (e) {
          var t = e.children,
            n = e.className;
          return (0, o.jsx)("ul", {
            className: (0, i.Z)(l().list, n),
            children: r.Children.map(t, function (e) {
              return (0, o.jsx)("li", { children: e });
            }),
          });
        };
    },
    60258: function (e, t, n) {
      "use strict";
      var o = n(85893),
        i = (n(67294), n(39351));
      t.Z = function (e) {
        var t = e.handleToggleSettingCookie,
          n = e.handleToggleTrackingCookie,
          r = e.handleToggleMarketingCookie,
          s = e.handleToggleSocialCookie,
          l = e.settingCookie,
          a = e.trackingCookie,
          c = e.marketingCookie,
          d = e.socialCookie,
          u = e.className;
        return (0, o.jsxs)(i.Z, {
          className: u,
          children: [
            (0, o.jsx)(i.C, {
              checked: !0,
              disabled: !0,
              id: "cookie-essential",
              title: "Essential website cookies",
              description:
                "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.",
            }),
            (0, o.jsx)(i.C, {
              checked: l,
              onCheckedChange: t,
              id: "cookie-settings",
              title: "Cookies that remember your settings",
              description:
                "These cookies do things like remember your preferences and the choices you make, to personalise your experience of using the site.",
            }),
            (0, o.jsx)(i.C, {
              checked: a,
              onCheckedChange: n,
              id: "cookie-tracking",
              title: "Analytics cookies",
              description:
                "These cookies help us understand how our website is being used, how effective marketing campaigns are, and help us customize and improve our websites for you.",
            }),
            (0, o.jsx)(i.C, {
              checked: c,
              onCheckedChange: r,
              id: "cookie-marketing",
              title: "Advertising cookies",
              description:
                "These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, selecting advertisements that are based on your interests and measuring the number of ads displayed and their performance, such as how many people clicked on a given ad.",
            }),
            (0, o.jsx)(i.C, {
              checked: d,
              onCheckedChange: s,
              id: "cookie-social",
              title: "Social networking cookies",
              description:
                "These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites. These cookies may also be used for advertising purposes too.",
            }),
          ],
        });
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
    11205: function (e) {
      e.exports = {
        root: "SettingToggle_root__hJGWI",
        subtitle: "SettingToggle_subtitle__sPgoz",
        title: "SettingToggle_title__rT7Zq",
        list: "SettingToggle_list__K01Gl",
        collapsible: "SettingToggle_collapsible__ik2Ud",
        collapsibleHeader: "SettingToggle_collapsibleHeader__EluCu",
        details: "SettingToggle_details__yFIZw",
      };
    },
    84364: function (e) {
      e.exports = {
        root: "ToggleButton_root__5bDNI",
        text: "ToggleButton_text__kje9G",
        inactiveText: "ToggleButton_inactiveText__qph3Z",
        activeText: "ToggleButton_activeText__zW4uj",
        input: "ToggleButton_input__apNGY",
        switch: "ToggleButton_switch__0WHL5",
        disabled: "ToggleButton_disabled__Lt4wf",
        sliderDisabled: "ToggleButton_sliderDisabled__2R0hw",
        label: "ToggleButton_label__cE2Qc",
        slider: "ToggleButton_slider__6KJfr",
        sliderChecked: "ToggleButton_sliderChecked__QG_3Q",
        unanswered: "ToggleButton_unanswered__EL_AA",
        circle: "ToggleButton_circle__yeevf",
        circleChecked: "ToggleButton_circleChecked__wnv6F",
      };
    },
  },
]);
//# sourceMappingURL=258-d7328f25c6d5d3ff.js.map
