(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9335],
  {
    81382: function (e, t, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/contact",
        function () {
          return n(70841);
        },
      ]);
    },
    70841: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return k;
          },
        });
      var o = n(85893),
        r = n(67294),
        s = n(84646),
        a = n(39414),
        i = n(48020),
        c = n(80933),
        u = n(37454),
        l = n(20298),
        d = {
          src: "https://cdn.qmee.com/_next/static/media/contact_img_1.437d6107.png",
          height: 876,
          width: 1160,
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAu0lEQVR42mN4f7+f+f///wx/n3nr/n1mnQBkgvkwzADnvGIw/v9CM3bavYoonVsd87xut+WAFVy+fEng4qXLOfcvX7Wd9SBc0+pW50qgZKrrrfa9brfaUxkuXbpccOHyheB7F+9kV91YEmdyu6HK+1anltuttga3221zgAouOV68dLHw5qXrJXU355ja327d7n67Pcftdvt+11ttrmD7z549K3f03AlBENv3RoeU6822Otebrfb///9nAADRP3aPjfOk/wAAAABJRU5ErkJggg==",
        },
        h = {
          src: "https://cdn.qmee.com/_next/static/media/contact_img_2.ed33f6b1.png",
          height: 746,
          width: 1160,
          blurDataURL:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAlUlEQVR42mP4//8/AzL+cY9B/P/nE0v/f9jd+v0OgwiD6612DbdbbdVBd/qj////z/Dv65Vtz76/+v/hx+v//z/tn8zgdru9AojdA+70NjOsZBD8//PRtpWvjv+/+OnW///fzk8CmtCmDMQFQbc7MsHWvJvj8Ofni/9/v9+5+/8xgwIDmhsYwdY8jTH5e49B5v///wwAiUZuOFQUhiwAAAAASUVORK5CYII=",
        },
        p = n(80626),
        m = n(51538),
        y = n(99617),
        f = n.n(y),
        A = n(86010),
        g = function (e) {
          var t = e.children,
            n = e.className;
          return (0, o.jsx)("div", {
            className: (0, A.Z)(f().root, n),
            children: t,
          });
        },
        x = n(84125),
        j = n.n(x),
        v = function (e) {
          var t = e.name,
            n = e.value,
            r = e.label,
            a = e.onClick;
          return (0, o.jsxs)("label", {
            className: j().root,
            onClick: a,
            children: [
              (0, o.jsx)("input", { type: "radio", name: t, value: n }),
              (0, o.jsx)(s.Z, { children: r }),
            ],
          });
        };
      function b(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o;
      }
      function w(e, t) {
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
                r,
                s = [],
                a = !0,
                i = !1;
              try {
                for (
                  n = n.call(e);
                  !(a = (o = n.next()).done) &&
                  (s.push(o.value), !t || s.length !== t);
                  a = !0
                );
              } catch (c) {
                (i = !0), (r = c);
              } finally {
                try {
                  a || null == n.return || n.return();
                } finally {
                  if (i) throw r;
                }
              }
              return s;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return b(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return b(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var Z = function () {
          var e = w(r.useState(null), 2),
            t = e[0],
            n = e[1];
          return (0, o.jsxs)("main", {
            className: "fadedPageBg",
            children: [
              (0, o.jsx)(p.Z, {
                mobileColumnOrderSwapped: !0,
                contentAlignedTop: !0,
                isFirstRow: !0,
                leftColumn: (0, o.jsxs)(o.Fragment, {
                  children: [
                    (0, o.jsx)(s.Z, {
                      component: "h1",
                      children: "Contact Us",
                    }),
                    (0, o.jsx)(s.Z, { component: "h2", children: "FAQ's" }),
                    (0, o.jsxs)(s.Z, {
                      component: "p",
                      children: [
                        "For help with common problems, check out our ",
                        (0, o.jsx)(a.Z, { to: l.Z0.path, children: "FAQs" }),
                        " - the answer to your question may already be waiting for you there.",
                      ],
                    }),
                    (0, o.jsx)(u.Z, {
                      children: (0, o.jsx)(i.Z, {
                        component: a.Z,
                        color: "primary",
                        buttonType: "secondary",
                        buttonSize: "large",
                        to: l.Z0.path,
                        prefetch: !1,
                        children: "View Frequently Asked Questions",
                      }),
                    }),
                  ],
                }),
                rightColumn: (0, o.jsx)(c.Z, { src: d, alt: "Contact Us" }),
              }),
              (0, o.jsx)(p.Z, {
                hasBorderBottom: !0,
                contentAlignedTop: !0,
                leftColumn: (0, o.jsx)(o.Fragment, {
                  children: (0, o.jsxs)("section", {
                    children: [
                      (0, o.jsx)(s.Z, {
                        component: "h2",
                        children: "Customer Support",
                      }),
                      (0, o.jsx)(s.Z, {
                        component: "p",
                        children:
                          "If you have a query about your account, or something isn't working as it should be, send our friendly support team an email at:",
                      }),
                      (0, o.jsx)(s.Z, {
                        component: "p",
                        children: (0, o.jsx)("a", {
                          href: "mailto:support@qmee.com",
                          children: "support@qmee.com",
                        }),
                      }),
                      (0, o.jsxs)(s.Z, {
                        component: "p",
                        children: [
                          "To ensure our experienced support agents can help you as quickly as possible,",
                          " ",
                          (0, o.jsx)("strong", {
                            children:
                              "please email from the email address listed on your Qmee account",
                          }),
                          ". If you haven't signed up to Qmee yet, not to worry - you can still get in touch with our friendly support team.",
                        ],
                      }),
                    ],
                  }),
                }),
                rightColumn: (0, o.jsx)(o.Fragment, {
                  children: (0, o.jsxs)("section", {
                    children: [
                      (0, o.jsx)(s.Z, {
                        component: "h2",
                        children: "Survey Queries",
                      }),
                      (0, o.jsx)(s.Z, {
                        component: "p",
                        children:
                          "If your query is related to a survey, please ensure you include the Survey ID Number in your email - this can be found in the 'Recently Finished Surveys' section of your dashboard.",
                      }),
                      (0, o.jsxs)(s.Z, {
                        component: "p",
                        children: [
                          (0, o.jsx)("strong", {
                            children:
                              "Don't have a Qmee account but have a question?",
                          }),
                          " You can also can also email ",
                          (0, o.jsx)("a", {
                            href: "mailto:support@qmee.com",
                            children: "support@qmee.com",
                          }),
                          " get in touch.",
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              (0, o.jsx)(p.Z, {
                contentAlignedTop: !0,
                leftColumn: (0, o.jsxs)(o.Fragment, {
                  children: [
                    (0, o.jsx)(s.Z, {
                      component: "h2",
                      children: "Security Support",
                    }),
                    (0, o.jsx)(s.Z, {
                      component: "p",
                      children:
                        "Are you a security researcher or have you found a vulnerability that you would like to report?",
                    }),
                    (0, o.jsxs)(g, {
                      children: [
                        (0, o.jsx)(v, {
                          value: "yes",
                          name: "securityReport",
                          label: "Yes",
                          onClick: function () {
                            return n(!0);
                          },
                        }),
                        (0, o.jsx)(v, {
                          value: "radio2",
                          name: "securityReport",
                          label: "No",
                          onClick: function () {
                            return n(!1);
                          },
                        }),
                      ],
                    }),
                    !0 === t &&
                      (0, o.jsxs)(o.Fragment, {
                        children: [
                          (0, o.jsxs)(s.Z, {
                            component: "p",
                            children: [
                              "Please contact our ",
                              (0, o.jsx)("strong", {
                                children: "Security Support Team",
                              }),
                              " via",
                              " ",
                              (0, o.jsx)("a", {
                                href: "mailto:security@qmee.com",
                                children: "security@qmee.com",
                              }),
                              ".",
                            ],
                          }),
                          (0, o.jsxs)(s.Z, {
                            component: "p",
                            children: [
                              "If necessary, use our ",
                              (0, o.jsx)("a", {
                                href: "/security.asc",
                                children: "public key",
                              }),
                              " to keep your message safe and please provide us with a secure way to respond.",
                            ],
                          }),
                          (0, o.jsx)(s.Z, {
                            component: "p",
                            children:
                              "We'll get back to you as soon as we can, usually within 24 hours to tell you the best way to track the status of your issue.",
                          }),
                        ],
                      }),
                    !1 === t &&
                      (0, o.jsxs)(o.Fragment, {
                        children: [
                          (0, o.jsxs)(s.Z, {
                            component: "p",
                            children: [
                              "Please contact our ",
                              (0, o.jsx)("strong", {
                                children: "Customer Support Team",
                              }),
                              " via",
                              " ",
                              (0, o.jsx)("a", {
                                href: "mailto:support@qmee.com",
                                children: "support@qmee.com",
                              }),
                              ".",
                            ],
                          }),
                          (0, o.jsxs)(s.Z, {
                            component: "p",
                            children: [
                              "To ensure our experienced support agents can help you as quickly as possible,",
                              " ",
                              (0, o.jsx)("strong", {
                                children:
                                  "please email from the email address listed on your Qmee account",
                              }),
                              ". If you haven't signed up to Qmee yet, not to worry - you can still get in touch with our friendly support team.",
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
                rightColumn: (0, o.jsx)(c.Z, {
                  src: h,
                  alt: "Have a query about security?",
                }),
              }),
              (0, o.jsx)(m.Z, {
                title: (0, o.jsx)(s.Z, {
                  children: "Frequently Asked Questions",
                }),
                ctaText: "FAQ's",
                ctaLink: l.Z0.path,
                children:
                  "Check out our FAQ's to help with any unanswered questions",
              }),
            ],
          });
        },
        k = (0, n(82688).bg)(Z, {
          fullPage: !0,
          metaData: {
            title: "Contact",
            description:
              "Got a question? Contact our dedicated & friendly customer support team - rated excellent for customer support.",
          },
        });
    },
    84125: function (e) {
      e.exports = { root: "RadioButton_root__7seBi" };
    },
    99617: function (e) {
      e.exports = { root: "RadioGroup_root__JkROW" };
    },
  },
  function (e) {
    e.O(0, [3862, 4244, 6178, 9774, 2888, 179], function () {
      return (t = 81382), e((e.s = t));
      var t;
    });
    var t = e.O();
    _N_E = t;
  },
]);
//# sourceMappingURL=contact-ef5513a840d34752.js.map
