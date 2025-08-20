(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7746],
  {
    50008: function (e, o, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/faq",
        function () {
          return n(69299);
        },
      ]);
    },
    14480: function (e, o, n) {
      "use strict";
      var t = n(85893);
      n(67294);
      o.Z = function (e) {
        var o = e.color,
          n = e.className;
        return (0, t.jsx)("svg", {
          className: n,
          xmlns: "http://www.w3.org/2000/svg",
          width: "12",
          height: "13",
          viewBox: "0 0 12 22",
          children: (0, t.jsxs)("g", {
            fill: "none",
            fillRule: "evenodd",
            stroke: o || "currentColor",
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
    49594: function (e, o, n) {
      "use strict";
      var t = n(85893),
        r = n(86010),
        a = n(67294),
        s = n(69926),
        i = n(14480),
        c = n(84646),
        u = n(95832),
        h = n.n(u);
      function l(e, o) {
        (null == o || o > e.length) && (o = e.length);
        for (var n = 0, t = new Array(o); n < o; n++) t[n] = e[n];
        return t;
      }
      function d(e, o, n) {
        return (
          o in e
            ? Object.defineProperty(e, o, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[o] = n),
          e
        );
      }
      function y(e, o) {
        if (null == e) return {};
        var n,
          t,
          r = (function (e, o) {
            if (null == e) return {};
            var n,
              t,
              r = {},
              a = Object.keys(e);
            for (t = 0; t < a.length; t++)
              (n = a[t]), o.indexOf(n) >= 0 || (r[n] = e[n]);
            return r;
          })(e, o);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (t = 0; t < a.length; t++)
            (n = a[t]),
              o.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (r[n] = e[n]));
        }
        return r;
      }
      function m(e, o) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, o) {
            var n =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != n) {
              var t,
                r,
                a = [],
                s = !0,
                i = !1;
              try {
                for (
                  n = n.call(e);
                  !(s = (t = n.next()).done) &&
                  (a.push(t.value), !o || a.length !== o);
                  s = !0
                );
              } catch (c) {
                (i = !0), (r = c);
              } finally {
                try {
                  s || null == n.return || n.return();
                } finally {
                  if (i) throw r;
                }
              }
              return a;
            }
          })(e, o) ||
          (function (e, o) {
            if (!e) return;
            if ("string" === typeof e) return l(e, o);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return l(e, o);
          })(e, o) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      o.Z = function (e) {
        var o,
          n,
          u = e.title,
          l = e.className,
          p = e.headerClassName,
          f = e.contentClassName,
          w = e.children,
          g = e.startOpen,
          b = e.open,
          v = e.skipTitleTranslation,
          j = e.id,
          x = e.onOpen,
          k = e.headerIcon,
          Z = y(e, [
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
          q = a.useRef(null),
          P = m(a.useState(g || b), 2),
          I = P[0],
          A = P[1],
          Q = m(a.useState(!1), 2),
          _ = Q[0],
          F = Q[1],
          O = m(a.useState(!0), 2),
          C = O[0],
          T = O[1],
          W = (0, s.q_)({
            from: {
              maxHeight: I
                ? 0
                : null === (o = q.current) || void 0 === o
                ? void 0
                : o.scrollHeight,
            },
            to: {
              maxHeight: I
                ? null === (n = q.current) || void 0 === n
                  ? void 0
                  : n.scrollHeight
                : 0,
            },
            onRest: function () {
              return T(!1);
            },
          });
        return (
          a.useEffect(
            function () {
              _ && T(!0);
            },
            [_]
          ),
          a.useEffect(
            function () {
              I || _ ? (T(!0), F(!0)) : T(!1), void 0 !== b && I !== b && A(b);
            },
            [b, I, _]
          ),
          (0, t.jsxs)(
            "div",
            (function (e) {
              for (var o = 1; o < arguments.length; o++) {
                var n = null != arguments[o] ? arguments[o] : {},
                  t = Object.keys(n);
                "function" === typeof Object.getOwnPropertySymbols &&
                  (t = t.concat(
                    Object.getOwnPropertySymbols(n).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(n, e).enumerable;
                    })
                  )),
                  t.forEach(function (o) {
                    d(e, o, n[o]);
                  });
              }
              return e;
            })({ id: j, className: (0, r.Z)(h().root, l) }, Z, {
              children: [
                Boolean(u) &&
                  (0, t.jsxs)("button", {
                    className: (0, r.Z)(p),
                    type: "button",
                    onClick: function () {
                      x && x(j || "", !I), void 0 === b && A(!I);
                    },
                    children: [
                      (0, t.jsx)(c.Z, { skipTranslation: v, children: u }),
                      (0, t.jsx)(i.Z, {
                        className: (0, r.Z)(
                          h().icon,
                          I ? h().iconOpen : h().iconClosed
                        ),
                      }),
                      k,
                    ],
                  }),
                C
                  ? (0, t.jsx)(s.q.div, {
                      style: W,
                      className: (0, r.Z)(h().content, f),
                      ref: q,
                      children: w,
                    })
                  : (0, t.jsx)("div", {
                      style: { maxHeight: I ? "auto" : 0 },
                      className: (0, r.Z)(h().content, I && h().openContent, f),
                      ref: q,
                      children: w,
                    }),
              ],
            })
          )
        );
      };
    },
    36629: function (e, o, n) {
      "use strict";
      var t = n(85893),
        r = (n(67294), n(13717)),
        a = n.n(r),
        s = n(16642),
        i = n(84646),
        c = n(86010);
      o.Z = function (e) {
        var o = e.detailed,
          n = e.tag,
          r = e.type,
          u = e.className,
          h = s.Z[r][n];
        return h
          ? (0, t.jsxs)("div", {
              className: (0, c.Z)(a().tagDescription, u),
              children: [
                (0, t.jsx)(h.Icon, { className: a().icon }),
                (0, t.jsxs)("div", {
                  className: a().tagContent,
                  children: [
                    (0, t.jsx)(i.Z, { component: "h4", children: h.title }),
                    (0, t.jsx)(i.Z, {
                      component: "p",
                      children: (o && h.detailedDescription) || h.description,
                    }),
                  ],
                }),
              ],
            })
          : null;
      };
    },
    49649: function (e, o, n) {
      "use strict";
      n.d(o, {
        Z: function () {
          return p;
        },
      });
      var t,
        r,
        a = n(85893),
        s = n(67294),
        i = n(9382),
        c = n.n(i),
        u = n(39414),
        h = n(49594);
      function l() {
        return (
          (l = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var o = 1; o < arguments.length; o++) {
                  var n = arguments[o];
                  for (var t in n)
                    Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
                }
                return e;
              }),
          l.apply(this, arguments)
        );
      }
      var d = function (e) {
          return s.createElement(
            "svg",
            l(
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 511.997 511.997",
                xmlSpace: "preserve",
              },
              e
            ),
            t ||
              (t = s.createElement("path", {
                d: "m212.26 390.24-60.331 60.331c-25.012 25.012-65.517 25.012-90.508.005-24.996-24.996-24.996-65.505-.005-90.496l120.683-120.683c24.991-24.992 65.5-24.992 90.491 0 8.331 8.331 21.839 8.331 30.17 0 8.331-8.331 8.331-21.839 0-30.17-41.654-41.654-109.177-41.654-150.831 0L31.247 329.909c-41.654 41.654-41.654 109.177 0 150.831 41.649 41.676 109.177 41.676 150.853 0l60.331-60.331c8.331-8.331 8.331-21.839 0-30.17s-21.84-8.33-30.171.001z",
              })),
            r ||
              (r = s.createElement("path", {
                d: "M480.751 31.24c-41.654-41.654-109.199-41.654-150.853 0l-72.384 72.384c-8.331 8.331-8.331 21.839 0 30.17 8.331 8.331 21.839 8.331 30.17 0l72.384-72.384c24.991-24.992 65.521-24.992 90.513 0 24.991 24.991 24.991 65.5 0 90.491L317.845 284.638c-24.992 24.992-65.5 24.992-90.491 0-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17c41.654 41.654 109.177 41.654 150.831 0l132.736-132.736c41.654-41.654 41.654-109.178 0-150.832z",
              }))
          );
        },
        y = n(84646),
        m = n(11163),
        p = function (e) {
          var o = e.heading,
            n = e.questions,
            t = e.id,
            r = (0, m.useRouter)();
          return (0, a.jsxs)("section", {
            className: c().root,
            children: [
              o &&
                (0, a.jsxs)("div", {
                  id: t,
                  className: c().sectionHeading,
                  children: [
                    (0, a.jsx)(y.Z, { component: "h2", children: o }),
                    (0, a.jsx)(u.Z, {
                      to: "".concat(r.pathname, "#").concat(t),
                      children: (0, a.jsx)(d, { className: c().largeLinkIcon }),
                    }),
                  ],
                }),
              n.map(function (e) {
                var o = e.key,
                  n = e.question,
                  t = e.answer;
                return (0,
                a.jsx)(h.Z, { itemScope: !0, itemProp: "mainEntry", itemType: "https://schema.org/Question", className: c().collapsible, title: (0, a.jsxs)(y.Z, { component: "h3", id: o, size: "normal", itemProp: "name", children: [n, " ", (0, a.jsx)(u.Z, { to: "".concat(r.pathname, "#").concat(o), children: (0, a.jsx)(d, { className: c().linkIcon }) })] }), headerClassName: c().questionHeader, children: (0, a.jsx)("div", { className: c().answer, itemScope: !0, itemProp: "acceptedAnswer", itemType: "https://schema.org/Answer", children: t }) }, o || n);
              }),
            ],
          });
        };
    },
    69299: function (e, o, n) {
      "use strict";
      n.r(o),
        n.d(o, {
          default: function () {
            return Q;
          },
        });
      var t = n(85893),
        r = n(67294),
        a = n(47856),
        s = n.n(a),
        i = n(86010),
        c = n(80933),
        u = n(80626),
        h = n(51538),
        l = n(49649),
        d = n(48020),
        y = n(84646),
        m = n(20298),
        p = n(39414),
        f = n(16642),
        w = n(36629);
      function g(e, o) {
        (null == o || o > e.length) && (o = e.length);
        for (var n = 0, t = new Array(o); n < o; n++) t[n] = e[n];
        return t;
      }
      function b(e, o, n) {
        return (
          o in e
            ? Object.defineProperty(e, o, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[o] = n),
          e
        );
      }
      function v(e) {
        for (var o = 1; o < arguments.length; o++) {
          var n = null != arguments[o] ? arguments[o] : {},
            t = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (t = t.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            t.forEach(function (o) {
              b(e, o, n[o]);
            });
        }
        return e;
      }
      function j(e, o) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, o) {
            var n =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != n) {
              var t,
                r,
                a = [],
                s = !0,
                i = !1;
              try {
                for (
                  n = n.call(e);
                  !(s = (t = n.next()).done) &&
                  (a.push(t.value), !o || a.length !== o);
                  s = !0
                );
              } catch (c) {
                (i = !0), (r = c);
              } finally {
                try {
                  s || null == n.return || n.return();
                } finally {
                  if (i) throw r;
                }
              }
              return a;
            }
          })(e, o) ||
          (function (e, o) {
            if (!e) return;
            if ("string" === typeof e) return g(e, o);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return g(e, o);
          })(e, o) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function x(e) {
        return e
          .replace(/ /g, "_")
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, "");
      }
      var k = [
          {
            key: "introduction",
            heading: "About Qmee",
            questions: [
              {
                question: "Who or what is Qmee?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Qmee is a free mobile app and desktop site, where you can earn real money for taking paid surveys anytime, anywhere. When you complete surveys, Qmee adds your rewards to your piggy bank in real time. Plus, with our no minimum cashout amount, you're always in control of your rewards!",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Qmee not only has surveys - you can also earn cashback from online purchases, or get paid to play with our gaming offers. Plus, add the Qmee app to your desktop or browser to earn extra cash when you search for your favorite sites and engage with the hottest brands!",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "there's even a fun daily poll where you can share your opinion and see what other Qmee users think, plus a daily pop quiz - earn cash for knowing the correct answer!",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Qmee is available in the US, UK, CA, AU, FR and DE, with more countries coming soon!",
                    }),
                  ],
                }),
              },
              {
                question: "What do I get when using Qmee?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "When you complete surveys and offers with Qmee, you'll get cash rewards in your Qmee piggy bank that you can cashout to PayPal or Venmo at any time - you can even choose to treat yourself to a gift card, or donate to one of the charities we work with. Plus, if you complete a survey each day, you'll keep your streak alive and get an extra 10% on your survey rewards!",
                  }),
                }),
              },
              {
                question: "How much will I earn?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "There's no limit to how much you can earn with Qmee and you can start earning today! Save your rewards to help buy holiday gifts, or cash out to buy your daily coffee.",
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "See how other users have spent their rewards in our",
                        " ",
                        (0, t.jsx)(y.Z, {
                          component: "a",
                          to: "https://www.qmee.com/blog",
                          children: "'Meet Our Qmee Users'",
                        }),
                        " ",
                        "series!",
                      ],
                    }),
                  ],
                }),
              },
              {
                question: "How do I sign up for Qmee?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children: "Signing up for Qmee is free and easy!",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Go to our sign up page and enter your email address and a password of your choice. Then, just answer a few simple questions about yourself so you can start being matched with surveys that fit your profile and are tailored to you.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "It's super easy to get started - you'll be topping up your piggy bank in no time. Sign up with Qmee to start making money online today!",
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "If you need any help getting started with Qmee, send our helpful support team an email at",
                        " ",
                        (0, t.jsx)(y.Z, {
                          component: "a",
                          href: "mailto:support@qmee.com",
                          children: "support@qmee.com",
                        }),
                        ".",
                      ],
                    }),
                    (0, t.jsx)(y.Z, { component: "p" }),
                  ],
                }),
              },
            ],
          },
          {
            key: "surveys",
            heading: "Surveys",
            questions: [
              {
                question: "How do I get surveys?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "Surveys are available to everyone \u2013 you just need to answer a few simple questions about yourself to start receiving them. After you've signed up to Qmee, you'll see a 'Surveys' tab on your Qmee dashboard where you'll be able to tell us a little bit about yourself. Answer these questions honestly, so we can provide you with surveys that are right for you!",
                  }),
                }),
              },
              {
                question: "How often will I get surveys?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsxs)(y.Z, {
                    component: "p",
                    children: [
                      "New surveys are shown on your 'Surveys' tab whenever they become available from the survey providers. To ensure you are getting the most surveys possible check out our",
                      " ",
                      (0, t.jsx)("a", {
                        href: "https://www.qmee.com/blog/qmee-survey-checklist",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "Survey Checklist",
                      }),
                      "!",
                      " ",
                    ],
                  }),
                }),
              },
              {
                question: "Why was my survey unsuccessful?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Unfortunately, some surveys can be deemed unsuccessful and declined by the survey provider. There are a number of reasons why this might happen:",
                    }),
                    (0, t.jsxs)("ul", {
                      children: [
                        (0, t.jsxs)(y.Z, {
                          component: "li",
                          children: [
                            (0, t.jsx)("strong", {
                              children:
                                "You don't meet the criteria they're looking for for that particular survey",
                            }),
                            " ",
                            "- the survey providers can be quite picky about who they need answers from, and unfortunately, the questions to determine whether you meet this criteria can be asked at any point during the survey.",
                          ],
                        }),
                        (0, t.jsxs)(y.Z, {
                          component: "li",
                          children: [
                            (0, t.jsx)("strong", {
                              children:
                                "The maximum number of respondents for that survey has been reached",
                            }),
                            " ",
                            "- all surveys have a quota, and the quota of completed responses can be reached whilst you're still working on your answers.",
                          ],
                        }),
                        (0, t.jsxs)(y.Z, {
                          component: "li",
                          children: [
                            (0, t.jsx)("strong", {
                              children:
                                "The survey providers felt you were answering the questions too quickly, inconsistently or illogically",
                            }),
                            " ",
                            "- the providers are always analysing the behaviour of survey takers, to ensure they're collecting high quality responses. They're not always right, but answering surveys carefully helps to reduce these declines.",
                          ],
                        }),
                      ],
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "We know that having a survey declined can be really disheartening and sometimes it can't be avoided. However, there are a few things that you can do to increase your successful surveys. Check out our",
                        " ",
                        (0, t.jsx)(y.Z, {
                          component: p.Z,
                          to: m.UC.path,
                          children: "Survey Tips",
                        }),
                        " ",
                        "to find out how you can become a 'Survey Winner'!",
                      ],
                    }),
                  ],
                }),
              },
              {
                question: "What do the survey icons mean?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "You may have noticed icons sometimes labelling available surveys on your Survey Dashboard. Take a look at the icons below to find out what each of them mean...",
                    }),
                    Object.entries(f.Z.survey)
                      .filter(function (e) {
                        var o = j(e, 2);
                        o[0];
                        return o[1].detailedDescription;
                      })
                      .map(function (e) {
                        var o = j(e, 1)[0];
                        return (0,
                        t.jsx)(w.Z, { className: s().tagDescription, detailed: !0, tag: o, type: "survey" }, o);
                      }),
                  ],
                }),
              },
              {
                question: "I've had an issue with a survey, what do I do?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsxs)(y.Z, {
                    component: "p",
                    children: [
                      "Please email our support team at",
                      " ",
                      (0, t.jsx)(y.Z, {
                        component: "a",
                        href: "mailto:support@qmee.com",
                        children: "support team",
                      }),
                      " ",
                      "with the survey ID and as much detail of the issue as possible. If you don't know the survey ID, please send the date and time you took the survey, and the category/name of the survey if you know it. Also, sending any relevant screenshots can help the support team diagnose the problem quickly.",
                    ],
                  }),
                }),
              },
              {
                question: "What are Daily Polls?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Find out what other Qmee users think by answering our daily poll questions! Each day a new question is asked, and you'll get to see how many people agree with you (or don't agree with you!) when you choose your answer.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "you'll find the Daily Poll on the homepage \u2013 from asking who you think the best superhero is, to finding out your favorite pizza topping, the daily polls are always fun and interesting!",
                    }),
                    (0, t.jsx)(y.Z, { component: "p" }),
                    (0, t.jsx)(y.Z, { component: "p" }),
                    (0, t.jsx)(y.Z, { component: "p" }),
                    (0, t.jsx)(y.Z, { component: "p" }),
                    (0, t.jsx)(y.Z, { component: "p" }),
                  ],
                }),
              },
              {
                question: "What is a survey/daily poll streak?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Increase your survey rewards when you maintain a streak of 5 consecutive days! You can create and sustain your streak by completing surveys or answering the poll 5 days in a row. Your reward increase will be available for as long as your streak is active and will be shown next to the original survey reward.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "On your homepage, you'll see 5 'Oinqs' which represent how many days you have left before you've completed your streak - Oinq will be shown as a grey outline with a lock inside. Then, when you complete a survey or answer the daily poll each day, the Oinq will turn green.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "To help you maintain your streak, you'll be shown how many hours/minutes you have until your next streak task is ready to take, plus how many days you've maintained your streak - see how long you can keep it going!",
                    }),
                  ],
                }),
              },
            ],
          },
          {
            heading: "Cashback Offers",
            questions: [
              {
                question: "What are Cashback Offers?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "We call them our hand-picked money earners! Whether you're looking to change your internet provider, buy a new phone, or even sign up to a free trial, with these specially chosen cashback offers you'll be getting a free cash reward at the same time as doing something you were going to do anyway - it's a win-win situation! The first few will appear on your homepage, then just click on 'view all', or head to your 'cashback' tab, to browse all the options.",
                  }),
                }),
              },
              {
                question: "How do they work?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "First of all, you need to have a Qmee account and be logged in to see which offers are currently available. Once you've decided which cashback offer you'd like to take part in (and which reward you'd like to receive!), you need to click the 'Go to cashback' button to follow the link to the brand's website \u2013 we'll track this to ensure you receive your reward if you're eligible and complete the cashback offer. The brand will then let us know when the cashback offer has been completed. you'll receive the reward in your piggybank once it has been sent to us by the brand \u2013 this can take up to 90 days, unless otherwise stated (for example, if you've chosen to take part in a Travel offer, the reward may only be given once you've completed your trip/stay).",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "It's super important to click the 'Go to cashback' button when you're trying to get cashback from shopping with a brand. If you search the website yourself, or follow a different cashback provider's link, we cannot track the status of your purchase and do not receive the cashback to pass onto you.",
                    }),
                  ],
                }),
              },
              {
                question: "What do the statuses mean?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "There are a few different statuses that you may see when taking part in a cashback offer. Here, you can learn more about what they mean\u2026",
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        (0, t.jsx)("strong", { children: "Pending" }),
                        " - the brand has seen that you have made a purchase or completed an action on their website, but they still need to check whether you have met the criteria of the offer.",
                      ],
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        (0, t.jsx)("strong", { children: "Approved" }),
                        " - it has been confirmed that you completed the offer correctly and approved by the brand. The reward has now been added to your piggybank and will be shown in your Qmee History - hooray!",
                      ],
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        (0, t.jsx)("strong", { children: "Rejected" }),
                        " - your offer reward has been rejected by the brand. This could be for a few different reasons, such as: the order was cancelled, the products or services purchased were excluded in the terms of the cashback offer, you were not a new customer (some brands only pay cashback to new customers, but this will be written in the terms), or it can be something else.",
                        " ",
                      ],
                    }),
                  ],
                }),
              },
              {
                question: "Why is there a wait before my reward is paid?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "You can receive your rewards anywhere between a couple of weeks after completing the cashback offer, up to a maximum of 90 days after. There is always a wait before your reward is paid, and the length of the wait depends on the specific brand, how quickly they review your transaction and confirm you completed the offer, and then when they send your reward through to us.",
                  }),
                }),
              },
              {
                question:
                  "Do I have to be a new user to complete the cashback offer?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "You don't have to be a new Qmee user to complete cashback offers. But, in some cases, you must be a new customer to the specific brand you've chosen to complete an offer with. The terms for each cashback offer are shown at the bottom of the page - it will state here whether you need to be a new or existing customer. So, please be sure to read through the offer terms prior to completing any offer to avoid disappointment!",
                  }),
                }),
              },
              {
                question: "Can I complete a cashback offer more than once?",
                answer: (0, t.jsx)(y.Z, {
                  component: "p",
                  children:
                    "Unless otherwise stated, an offer can only be completed once and the reward for the offer will only be given the first time you complete an offer.",
                }),
              },
              {
                question:
                  "Can I receive a reward for a cashback offer I completed previously, outside of Qmee?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "We cannot reward any offer that is completed outside of Qmee. If you have not completed an offer by following the 'Go to cashback' button on the offer pages, we cannot track the status of your purchase and do not receive the cashback to pass onto you.",
                  }),
                }),
              },
              {
                question:
                  "Can I complete a cashback offer with Adblock turned on?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "We use cookies to link your offer reward back to your account, and these can be blocked by Adblock. To allow offer tracking, make sure you have Adblock turned off before clicking on the 'Go to cashback' button for the offer you want to take part in.",
                  }),
                }),
              },
              {
                question: "Why has my cashback offer reward been rejected?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "If the offer you took part in is showing as 'Rejected' in your , this means that the brand has not approved you to receive the offer reward. We may not know exactly why the brand has reached this decision, but some possible reasons may include:",
                    }),
                    (0, t.jsxs)("ul", {
                      children: [
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "You canceled or returned all or part of your order.",
                        }),
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "You used a promotional code, voucher code or another form of discount not approved by the brand when making your purchase.",
                        }),
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "The brand provides offer rewards to new customers only, and you have shopped with this brand before.",
                        }),
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "You may have used a saved quote or a renewal quote to make this purchase.",
                        }),
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "You did not complete your order online i.e. it was finalized over the phone.",
                        }),
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "You did not stay within the offer terms set by the brand.",
                        }),
                      ],
                    }),
                  ],
                }),
              },
              {
                question:
                  "How do I cancel or unsubscribe from an offer I completed?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "Products and services subscribed to or purchased through an offer shown on your Qmee 'Cashback' tab are all from third-party brands. To cancel or unsubscribe from these offers, you will need to contact the brand directly. The contact information is in the brand's terms of services or the receipt they provide you upon offer completion. If you decide to cancel or unsubscribe from the offer, this may affect your receipt of the cash reward.",
                  }),
                }),
              },
              {
                question: "Other important information...",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "We cannot be held responsible if the brand fails to report your sale to us. Brands have their own rules upon which they determine transactions to be genuine - for example, an attempt to simply earn a cash reward by clicking/registering with no intention to continue to use/buy from their website could be deemed as non-genuine. These rules may or may not be advertised by ourselves or the brand and may be discretionary. Rewards will only be credited for offers that are advertised by us and that are fully completed.",
                  }),
                }),
              },
            ],
          },
          {
            key: "searching",
            heading: "Browser Extension",
            questions: [
              {
                question: "How does it work?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Once you have the Qmee extension installed in your desktop browser, it works in the background as your personal online shopping and saving companion. you'll see a Q in your browser toolbar that you can click on to see your balance at any time.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "You can get cash rewards when you're searching on your favorite sites and engaging with brands you love. You can also get price savings when we find you a better deal with our automatic price comparison tool \u2013 all without having to go to different sites to compare! These appear as additional results on the left of your screen in the Qmee sidebar, on the sites you're already searching on.",
                    }),
                  ],
                }),
              },
              {
                question:
                  "What's the catch? there's no such thing as as money for nothing...",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "There isn't a catch! You earn cash when you search for what you want online by clicking and engaging on results related to brands you love. We provide you with the ability to discover new brands, compare pricing, or secure money-saving coupons for the things you want to purchase. Essentially, you're getting extra cash just for doing what you already do!",
                  }),
                }),
              },
              {
                question: "Does Qmee change the search results I see?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "No. You still see exactly the same results from your usual search engine as anyone who doesn't use Qmee - the only difference is that you see some extra ones that earn you money and show you price comparisons on the items you're shopping for.",
                  }),
                }),
              },
              {
                question: "I've just joined, why am I not seeing any results?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "We only show results when we have something relevant to show you, so we won't appear all the time or every time you search. Qmee gives the best results when you're searching normally and clicking on results that interest you. This gives you the most rewards, but also allows the businesses that list with us a chance to connect with you.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "We do look at your pattern of searches and clicks to determine whether to show you results or not and this changes over time as you use the service. If you're not seeing anything today, don't worry, when it sees you have settled down to a normal search pattern you'll start to see results again.",
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "If you need a hand getting started, please don't hesitate to contact our support team at",
                        " ",
                        (0, t.jsx)(y.Z, {
                          component: "a",
                          href: "mailto:support@qmee.com",
                          children: "support@qmee.com",
                        }),
                        ".",
                      ],
                    }),
                  ],
                }),
              },
              {
                question: "Why don't all Qmee results show rewards?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children: "There are 3 reasons...",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "1 - As well as showing results with cash rewards, we also show coupons and deals in the sidebar to make your internet shopping experience even better, and save you money too.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "2 - If you're seeing a result without a cash reward attached, it may be a result from our price comparison feature. These results show you the best prices on the products you're shopping for without you having to go to different sites to compare - we do the work for you, all you do is save even more money!",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "3 - If you have already clicked on a result and earned the reward, you might see the result appear again (in case you want another look at that website), but it won't have another reward attached.",
                    }),
                  ],
                }),
              },
              {
                question: "Will Qmee work if I have Adblock installed?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsxs)(y.Z, {
                    component: "p",
                    children: [
                      "Yes. Adblock shouldn't cause any problems when you install and use Qmee. However, if you do notice any problems, please let us know by emailing",
                      " ",
                      (0, t.jsx)(y.Z, {
                        component: "a",
                        href: "mailto:support@qmee.com",
                        children: "support@qmee.com",
                      }),
                      ".",
                    ],
                  }),
                }),
              },
            ],
          },
          {
            heading: "General Information",
            questions: [
              {
                question: "Is Qmee safe? Reassure me...",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "The Qmee products and services have been designed with your privacy in mind.",
                    }),
                    (0, t.jsxs)("ul", {
                      children: [
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "We encrypt all communications and passwords, so that they cannot be read by anyone they shouldn't be.",
                        }),
                        (0, t.jsxs)(y.Z, {
                          component: "li",
                          children: [
                            "We don't share your data with anyone without your permission.",
                            " ",
                          ],
                        }),
                        (0, t.jsxs)(y.Z, {
                          component: "li",
                          children: [
                            "We don't store any financial information when you cashout your rewards.",
                            " ",
                          ],
                        }),
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "You can make changes to your details, or request for them to be deleted at any time.",
                        }),
                      ],
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "If you want to know more, check out our",
                        " ",
                        (0, t.jsx)(y.Z, {
                          component: p.Z,
                          to: m.Gn.path,
                          children: "Privacy Promise",
                        }),
                        ".",
                      ],
                    }),
                  ],
                }),
              },
              {
                question: "What will you do with the information I give you?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "When you join Qmee, you agree to our information use and data protection policy as explained in our terms and conditions. In line with this agreement, Qmee does not share any data with third parties without your permission.",
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "It's also a top priority to protect your data when you're taking surveys. So, if you're declined by a survey, neither the survey provider, nor Qmee keep the information you gave in that survey.",
                        " ",
                      ],
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Plus, if you make the decision to leave Qmee, we'll remove as much information as we can about your account, other than data we are required to hold under statute.",
                    }),
                  ],
                }),
              },
              {
                question: "Where can I use Qmee?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsxs)(y.Z, {
                    component: "p",
                    children: [
                      "You can use Qmee, anytime, anywhere! The Qmee app is available on both Android and iOS devices, so you can take it wherever you go. Plus, you can access the website version of Qmee from your browser, so earning cash from home is super easy.",
                      " ",
                    ],
                  }),
                }),
              },
              {
                question: "How can I cashout my Qmee rewards?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "At Qmee, we want to give you the freedom to choose how you spend your hard-earned rewards. Here are the current cashout methods that you can use to withdraw your earnings:",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children: (0, t.jsx)("strong", {
                        children: "PayPal/Venmo",
                      }),
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "With no minimum withdrawal amount, you can cashout to your PayPal or Venmo account whenever you like. Your rewards will be sent to your account for you to spend however you choose!",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children: (0, t.jsx)("strong", {
                        children: "Gift cards",
                      }),
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Do you already know exactly how you want to spend your rewards? We've got you covered! You can choose from our variety of different gift card options at any of the set gift card amounts",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children: (0, t.jsx)("strong", { children: "Charity" }),
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "If you want to use your rewards to help a charity, then you can! When you select the Charity option on the cashout page, you can choose to donate your rewards to any of the organizations available. We don't take any commission when you cashout to charity, so every penny goes to the charity of your choice.",
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "If you have any other cashout methods or charities that you'd like to see available on Qmee, drop us an email at",
                        " ",
                        (0, t.jsx)(y.Z, {
                          component: "a",
                          href: "mailto:support@qmee.com",
                          children: "support@qmee.com",
                        }),
                        ".",
                      ],
                    }),
                  ],
                }),
              },
              {
                question: "How quickly does Qmee pay out?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "There are a variety of ways you can cashout your Qmee rewards, and for all of them, we get your cash to you as quickly as possible. When cashing out to PayPal or Venmo with no minimum cashout amount, your money will appear in your account within a few minutes. If you like to spend your rewards on gift cards, an email with your gift card information should be with you just as quickly.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children: (0, t.jsx)("em", {
                        children:
                          "Note: Banking hours, public holidays and systems outside Qmee's control can sometimes cause delays.",
                      }),
                    }),
                  ],
                }),
              },
              {
                question: "What if I don't have a PayPal account?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "It's free and doesn't take long to sign up for one \u2013 just go to the PayPal website. Or, if you don't want to sign up for a PayPal account, you can choose to donate your piggy bank contents to charity.",
                  }),
                }),
              },
              {
                question:
                  "Are there any requirements for linking a PayPal account?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Any PayPal accounts you try to link to Qmee must meet the following requirements:",
                    }),
                    (0, t.jsxs)("ul", {
                      children: [
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "The PayPal account must be registered in the same country as your Qmee account.",
                        }),
                        (0, t.jsxs)(y.Z, {
                          component: "li",
                          children: [
                            "Your PayPal account must be fully verified. Instructions for how to do this can be found",
                            " ",
                            (0, t.jsx)(y.Z, {
                              component: p.Z,
                              to: "https://www.qmee.com/blog/how-to-fully-verify-your-paypal-account",
                              children: "here",
                            }),
                            ".",
                          ],
                        }),
                        (0, t.jsx)(y.Z, {
                          component: "li",
                          children:
                            "The PayPal account must not be linked to another Qmee account.",
                        }),
                      ],
                    }),
                  ],
                }),
              },
              {
                question: "How can I invite my friends?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "Once you've been with Qmee for a while, you'll receive a personal invite link that you can share with friends to use when they sign up. To find your invite link, head to the",
                        " ",
                        (0, t.jsx)(y.Z, {
                          component: p.Z,
                          to: "".concat(m.ys.path),
                          children: "Refer a Friend",
                        }),
                        " ",
                        "option in your 'Account' section. You can share your invite link via email or your social accounts.",
                      ],
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Your referral must sign up through your link and when they make their first cashout to PayPal, you'll earn a reward in your piggy bank. Remind them there is no minimum cash out amount!",
                    }),
                  ],
                }),
              },
            ],
          },
          {
            heading: "My Account",
            questions: [
              {
                question: "Can I make changes to my account?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "Yes. In your \u201cMy Account\u201d section, you'll find your Survey Profile where you can make changes if you need to - we always suggest you keep your profile up to date to ensure you receive the right surveys for you. you'll also find your Login Details in your \u201cMy Account\u201d section - if you'd like to change the email address or password you use to log in to your Qmee account, you can do so here.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children: (0, t.jsx)("em", {
                        children:
                          "*Remember, you are only permitted to have one Qmee account, so edit the email address on the account you want to use, rather than create a new account.",
                      }),
                    }),
                    (0, t.jsxs)(y.Z, {
                      component: "p",
                      children: [
                        "If you are thinking about closing your account, please contact our support team on",
                        " ",
                        (0, t.jsx)(y.Z, {
                          component: "a",
                          href: "mailto:support@qmee.com",
                          children: "support@qmee.com",
                        }),
                        ".",
                      ],
                    }),
                  ],
                }),
              },
              {
                question:
                  "Do I need a different account for each browser, PC or mobile that I use?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "No. You are only permitted to have one Qmee account - you can use the same one across all devices and browsers that you use. You just need to log in to your account on whichever browser or device you're using.",
                  }),
                }),
              },
              {
                question: "Can I update my PayPal account details?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "We connect to your PayPal account ID, so you can update your PayPal account details via PayPal directly and it won't impact your Qmee account - you'll still receive your rewards. Just make sure the email you want to receive notifications to is set as your primary email in your PayPal account, then when we send you your rewards you'll get notified by PayPal on this email.",
                  }),
                }),
              },
              {
                question:
                  "Can I change the PayPal account linked to my Qmee account?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "In order to make sure everyone receives the right rewards, it's really important we know who people are when they cash out. For this reason, you can't unlink a PayPal account once you've linked it. So, please make sure you link to the correct PayPal account when you first cash out.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "However, you can link additional PayPal accounts if you'd like to change where we send your rewards to.",
                    }),
                  ],
                }),
              },
              {
                question:
                  "Can I change the Venmo account linked to my Qmee account?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsxs)(y.Z, {
                    component: "p",
                    children: [
                      "If you're a US user wanting to change the Venmo account you use to cashout your rewards, you can add up to two Venmo accounts. If you want to remove a Venmo account, you can request this by emailing",
                      " ",
                      (0, t.jsx)(y.Z, {
                        component: "a",
                        href: "mailto:support@qmee.com",
                        children: "support@qmee.com",
                      }),
                      " ",
                      "- but to save you time, try to link the Venmo accounts you will want to cashout from in the first instance.",
                    ],
                  }),
                }),
              },
              {
                question: "Why can't I log in?",
                answer: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "If you are having trouble logging in, there are 3 things that could be going wrong.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "1 - Are you entering the wrong email address? Double check the welcome email we sent you \u2013 it confirms the email address you used.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "2 - Have you forgotten your password? No problem, you can reset your password.",
                    }),
                    (0, t.jsx)(y.Z, {
                      component: "p",
                      children:
                        "3 - Have you tried logging in with the wrong information too many times? If you have, you won't be able to log in for a while. We would suggest waiting 24 hours before trying to log in (with the right information) again.",
                    }),
                  ],
                }),
              },
              {
                question: "Why can't I cash out to a gift card?",
                answer: (0, t.jsx)(t.Fragment, {
                  children: (0, t.jsx)(y.Z, {
                    component: "p",
                    children:
                      "You must have a PayPal account linked to your Qmee account before cashing out to gift cards - this is because we want to make sure everyone receives the right rewards. Before cashing out to a gift card, we need you to verify your identity first by cashing out (any amount) to your PayPal account. We don't want anyone taking your hard earned gift cards!",
                  }),
                }),
              },
            ],
          },
        ].map(function (e) {
          return v({}, e, {
            key: x(e.heading),
            questions: e.questions.map(function (o) {
              return v({}, o, {
                key: "".concat(x(e.heading), "__").concat(x(o.question)),
              });
            }),
          });
        }),
        Z = n(16349),
        q = n(11163),
        P = n(73135),
        I = {
          src: "https://cdn.qmee.com/_next/static/media/faq_img_1.c4aadbc1.png",
          height: 722,
          width: 1160,
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAkklEQVR42mMAAbfb7RKz7mxgZQCC+/fv5z948GAnkJ4MxIwMrrfa7L1vdzQx3CqLu3X/jumDBw+6gBKOQDwTpBikuzzkdo8bw62CguP3zuU9e/Ak7vb9O2JAyRiQIpAJ4t43O/IYblYGPH3wWPn+g/sb7j940PTgwYMdQAWGDOjg5s2b3Pfu3Uu5c+eOGgMDAwMAL6BWud8qEjsAAAAASUVORK5CYII=",
        },
        A = function () {
          var e = (0, q.useRouter)(),
            o = (0, P.Z)(),
            n = e.asPath.match(/#.*/gi),
            a = (n && n[0]) || "";
          r.useEffect(
            function () {
              (window.location.hash =
                null === a || void 0 === a ? void 0 : a.replace("#", "")),
                (null === a || void 0 === a ? void 0 : a.match(/#.+/)) && o(a);
            },
            [a, o]
          );
          return (0, t.jsxs)("main", {
            className: (0, i.Z)("fadedPageBg", s().root),
            children: [
              (0, t.jsx)(u.Z, {
                mobileColumnOrderSwapped: !0,
                contentAlignedTop: !0,
                isFirstRow: !0,
                leftColumn: (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(y.Z, { component: "h1", children: "FAQ's" }),
                    (0, t.jsx)("nav", {
                      className: s().buttonsContainer,
                      children: k.map(function (e) {
                        var n = e.key,
                          r = e.heading;
                        return (0, t.jsx)(
                          d.Z,
                          {
                            className: (0, i.Z)(s().filterButton),
                            onClick: function () {
                              return (function (e) {
                                o(e);
                              })(n);
                            },
                            children: (0, t.jsx)(y.Z, { children: r }),
                          },
                          n
                        );
                      }),
                    }),
                  ],
                }),
                rightColumn: (0, t.jsx)(c.Z, { src: I, alt: "FAQ's" }),
              }),
              (0, t.jsxs)(Z.Z, {
                children: [
                  (0, t.jsx)("div", {
                    className: s().faqQuestionsWrapper,
                    children: k.map(function (e) {
                      var o = e.key,
                        n = e.heading,
                        r = e.questions;
                      return (0,
                      t.jsx)(l.Z, { id: o, heading: n, questions: r }, o);
                    }),
                  }),
                  (0, t.jsx)(h.Z, {
                    title: (0, t.jsx)(y.Z, {
                      children: "The Qmee Privacy Promise",
                    }),
                    ctaText: "Tell me more",
                    ctaLink: m.Gn.path,
                    children:
                      "At Qmee, we understand the growing concerns around privacy, so check out our promise of putting you first.",
                  }),
                ],
              }),
            ],
          });
        },
        Q = (0, n(82688).bg)(A, {
          fullPage: !0,
          metaData: {
            title: "FAQ",
            description:
              "How do I earn cash with Qmee? Shop, search & take surveys. Is the app free? Yes! What\u2019s the minimum cashout amount? There is none!",
          },
        });
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
    9382: function (e) {
      e.exports = {
        root: "FaqAccordion_root__ExhDt",
        sectionHeading: "FaqAccordion_sectionHeading__zPVwq",
        answer: "FaqAccordion_answer__sVLHA",
        collapsible: "FaqAccordion_collapsible__vyKj_",
        linkIcon: "FaqAccordion_linkIcon__nOnHX",
        largeLinkIcon: "FaqAccordion_largeLinkIcon__5tZcr",
        questionHeader: "FaqAccordion_questionHeader__QKOlg",
      };
    },
    47856: function (e) {
      e.exports = {
        buttonsContainer: "Faq_buttonsContainer__osOLR",
        filterButton: "Faq_filterButton__s4pYE",
        iconContainer: "Faq_iconContainer__gQu3Y",
        faqSurveyHeader: "Faq_faqSurveyHeader__viwc_",
        tagDescription: "Faq_tagDescription__PSldc",
        faqQuestionsWrapper: "Faq_faqQuestionsWrapper__rnnMW",
      };
    },
  },
  function (e) {
    e.O(0, [3862, 9926, 4244, 6178, 567, 9774, 2888, 179], function () {
      return (o = 50008), e((e.s = o));
      var o;
    });
    var o = e.O();
    _N_E = o;
  },
]);
//# sourceMappingURL=faq-b568329fda97f03d.js.map
