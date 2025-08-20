(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [119],
  {
    90119: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return D;
        },
      });
      var r = n(85893),
        o = n(86010),
        i = n(20298),
        a = n(11163),
        s = n(67294),
        c = n(84646),
        l = n(19428),
        u = n.n(l),
        m = n(68690),
        f = n.n(m),
        d = n(83493),
        p = n(39414),
        g = n(33613),
        h = n(37578),
        y = n(57785),
        b = n(33564),
        v = n(15e3);
      function S(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function j(e, t, n) {
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
      function x(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function (t) {
              j(e, t, n[t]);
            });
        }
        return e;
      }
      function _(e, t) {
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
              var r,
                o,
                i = [],
                a = !0,
                s = !1;
              try {
                for (
                  n = n.call(e);
                  !(a = (r = n.next()).done) &&
                  (i.push(r.value), !t || i.length !== t);
                  a = !0
                );
              } catch (c) {
                (s = !0), (o = c);
              } finally {
                try {
                  a || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return i;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return S(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return S(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var w = function (e) {
          var t = e.formSettings,
            n = e.emailSettings,
            l = e.passwordSettings,
            u = e.email,
            m = e.password,
            S = e.disableRedirectAfterLogin,
            j = e.onSwitchMode,
            w = (0, v.f0)(),
            Z = _((0, d.Z)(w), 2),
            N = Z[0],
            k = Z[1],
            A = _(s.useState(""), 2),
            F = A[0],
            O = A[1],
            E = (0, a.useRouter)();
          return (0, r.jsxs)("section", {
            className: f().root,
            children: [
              (0, r.jsxs)(b.Z, {
                submitDisabled: t.submitDisabled || k.isLoading,
                onSubmit: function (e) {
                  e.preventDefault(),
                    N(u, m)
                      .then(function () {
                        return S
                          ? null
                          : E.push(i.h1.path, void 0, { shallow: !0 });
                      })
                      .catch(function (e) {
                        return O(
                          e.loginError ||
                            "Network error. Maybe you have tried too many times. Try again later."
                        );
                      });
                },
                submitName: "Log In",
                children: [
                  (0, r.jsxs)("div", {
                    className: f().section,
                    children: [
                      (0, r.jsx)(y.Z, x({}, n)),
                      (0, r.jsxs)(c.Z, {
                        component: "p",
                        className: f().subscript,
                        children: [
                          "Need an account?",
                          " ",
                          (0, r.jsx)(c.Z, {
                            component: "button",
                            type: "button",
                            onClick: j,
                            children: "Sign up",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsxs)("div", {
                    className: f().section,
                    children: [
                      (0, r.jsx)(h.Z, x({}, l, { labelPlaceholder: !1 })),
                      (0, r.jsx)(c.Z, {
                        component: p.Z,
                        className: (0, o.Z)(f().subscript, f().forgotPassword),
                        to: i.AF.path,
                        children: "Forgot your password?",
                      }),
                    ],
                  }),
                ],
              }),
              F &&
                (0, r.jsx)(g.Z, {
                  message: F,
                  onClose: function () {
                    return O("");
                  },
                }),
            ],
          });
        },
        Z = n(34051),
        N = n.n(Z),
        k = n(62320),
        A = n.n(k),
        F = n(41604),
        O = n(65561);
      function E(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function U(e, t, n, r, o, i, a) {
        try {
          var s = e[i](a),
            c = s.value;
        } catch (l) {
          return void n(l);
        }
        s.done ? t(c) : Promise.resolve(c).then(r, o);
      }
      function C(e, t, n) {
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
      function I(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function (t) {
              C(e, t, n[t]);
            });
        }
        return e;
      }
      function P(e, t) {
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
              var r,
                o,
                i = [],
                a = !0,
                s = !1;
              try {
                for (
                  n = n.call(e);
                  !(a = (r = n.next()).done) &&
                  (i.push(r.value), !t || i.length !== t);
                  a = !0
                );
              } catch (c) {
                (s = !0), (o = c);
              } finally {
                try {
                  a || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return i;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return E(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return E(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var L = function (e) {
        var t = e.formSettings,
          n = e.emailSettings,
          l = e.passwordSettings,
          u = e.email,
          m = e.password,
          S = e.onSwitchMode,
          j = (0, v.QS)(),
          x = P((0, d.Z)(j), 2),
          _ = x[0],
          w = x[1],
          Z = P(s.useState(!1), 2),
          k = Z[0],
          E = Z[1],
          C = P(s.useState(null), 2),
          L = C[0],
          T = C[1],
          B = (0, a.useRouter)(),
          D = P(s.useState(!1), 2),
          M = D[0],
          R = (D[1], P(s.useState(), 2)),
          G = R[0],
          $ = R[1],
          q = (function () {
            var e,
              t =
                ((e = N().mark(function e(t) {
                  var n;
                  return N().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              t.preventDefault(),
                              (e.prev = 1),
                              (e.next = 4),
                              _(u, m, k)
                            );
                          case 4:
                            (n = e.sent) &&
                              ((0, F.ZB)(n.guid),
                              (0, F.Nq)("sign-up", { userGuid: n.guid })),
                              B.push(i.At.path, void 0, { shallow: !0 }),
                              (e.next = 12);
                            break;
                          case 9:
                            (e.prev = 9),
                              (e.t0 = e.catch(1)),
                              $(
                                e.t0.loginError ||
                                  "Network error. Maybe you have tried too many times. Try again later."
                              );
                          case 12:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[1, 9]]
                  );
                })),
                function () {
                  var t = this,
                    n = arguments;
                  return new Promise(function (r, o) {
                    var i = e.apply(t, n);
                    function a(e) {
                      U(i, r, o, a, s, "next", e);
                    }
                    function s(e) {
                      U(i, r, o, a, s, "throw", e);
                    }
                    a(void 0);
                  });
                });
            return function (e) {
              return t.apply(this, arguments);
            };
          })();
        return (0, r.jsxs)("section", {
          className: f().root,
          children: [
            (0, r.jsxs)(b.Z, {
              submitDisabled: t.submitDisabled || w.isLoading,
              onSubmit: q,
              submitName: "Sign Up",
              submitButtonType: "primary",
              submitButtonColor: "secondary",
              children: [
                (0, r.jsxs)("div", {
                  className: f().section,
                  children: [
                    (0, r.jsx)(
                      y.Z,
                      I({}, n, {
                        onBlur: function () {
                          A().run({
                            email: u,
                            suggested: function (e) {
                              T(e);
                            },
                            empty: function () {
                              T(null);
                            },
                          });
                        },
                      })
                    ),
                    L &&
                      !M &&
                      (0, r.jsx)(O.Z, {
                        status: "warning",
                        className: f().mailcheck,
                        onClick: function () {
                          (null === n || void 0 === n ? void 0 : n.onChange) &&
                            L &&
                            (null === n ||
                              void 0 === n ||
                              n.onChange({ target: { value: L.full } }),
                            T(null));
                        },
                        children: (0, r.jsxs)("div", {
                          children: [
                            "Did you mean ",
                            null === L || void 0 === L ? void 0 : L.address,
                            "@",
                            (0, r.jsx)("strong", {
                              children:
                                null === L || void 0 === L ? void 0 : L.domain,
                            }),
                            "?",
                          ],
                        }),
                      }),
                    (0, r.jsxs)(c.Z, {
                      component: "p",
                      className: f().subscript,
                      children: [
                        "Got an account?",
                        " ",
                        (0, r.jsx)(c.Z, {
                          component: "button",
                          type: "button",
                          onClick: S,
                          children: "Log In",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: f().section,
                  children: [
                    (0, r.jsx)(h.Z, I({}, l, { labelPlaceholder: !1 })),
                    void 0 !== G &&
                      (0, r.jsx)("p", {
                        children: (0, r.jsx)(c.Z, {
                          component: p.Z,
                          to: i.yC.path,
                          children: "How we help protect your account",
                        }),
                      }),
                    (0, r.jsxs)(c.Z, {
                      component: "p",
                      className: f().subscript,
                      children: [
                        "By signing up I agree to the",
                        " ",
                        (0, r.jsx)(c.Z, {
                          component: p.Z,
                          className: f().agreementButton,
                          prefetch: !1,
                          to: i.bh.path,
                          children: "terms and conditions",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)("label", {
                  className: (0, o.Z)(
                    f().subscript,
                    f().marketing,
                    f().section
                  ),
                  htmlFor: "marketing",
                  children: [
                    (0, r.jsx)("input", {
                      type: "checkbox",
                      id: "marketing",
                      className: f().checkbox,
                      checked: k,
                      onChange: function () {
                        return E(!k);
                      },
                    }),
                    (0, r.jsx)(c.Z, {
                      component: "p",
                      children:
                        "Allow Qmee to send me emails regarding competitions, new features, reminders & other promotional marketing messages.",
                    }),
                  ],
                }),
              ],
            }),
            G &&
              (0, r.jsx)(g.Z, {
                message: G,
                onClose: function () {
                  return $("");
                },
              }),
          ],
        });
      };
      function T(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function B(e, t) {
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
              var r,
                o,
                i = [],
                a = !0,
                s = !1;
              try {
                for (
                  n = n.call(e);
                  !(a = (r = n.next()).done) &&
                  (i.push(r.value), !t || i.length !== t);
                  a = !0
                );
              } catch (c) {
                (s = !0), (o = c);
              } finally {
                try {
                  a || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return i;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return T(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return T(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var D = function (e) {
        var t = e.defaultToLogin,
          n = e.showLoginForm,
          l = e.onToggleLoginForm,
          m = e.onAutofillDetected,
          f = e.disabled,
          d = e.navRouteToPage,
          p = e.disableRedirectAfterLogin,
          g = B(s.useState(Boolean(n || t)), 2),
          h = g[0],
          y = g[1],
          b = B(s.useState(""), 2),
          v = b[0],
          S = b[1],
          j = B(s.useState(""), 2),
          x = j[0],
          _ = j[1],
          Z = s.useRef(null),
          N = s.useRef(null),
          k = !1,
          A = B(s.useState(!1), 2),
          F = A[0],
          O = (A[1], (0, a.useRouter)());
        s.useEffect(
          function () {
            void 0 !== n && y(n);
          },
          [n]
        ),
          s.useEffect(
            function () {
              0;
            },
            [F, k, m]
          );
        var E = function (e) {
            d ? (e ? O.push(i.ym.path) : O.push(i._5.path)) : l ? l(e) : y(e);
          },
          U = { submitDisabled: Boolean(!v || !x || f) },
          C = {
            onChange: function (e) {
              return S(e.target.value);
            },
            type: "text",
            id: "Login-form-email",
            title: "Email",
            value: v,
            placeholder: "Email",
            autoComplete: "off",
            disabled: !!f,
            ref: Z,
            className: u().input,
          },
          I = {
            onChange: function (e) {
              return _(e.target.value);
            },
            id: "Login-form-password",
            title: "Password",
            value: x,
            placeholder: "Password",
            disabled: !!f,
            ref: N,
            className: u().input,
          };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsxs)("div", {
              className: u().signUpFormSelector,
              children: [
                (0, r.jsxs)("button", {
                  className: u().signUpToggle,
                  type: "button",
                  onClick: function () {
                    return E(!1);
                  },
                  children: [
                    (0, r.jsx)(c.Z, {
                      component: "h3",
                      className: h ? u().inactive : u().active,
                      children: "Sign Up",
                    }),
                    (0, r.jsx)("span", {
                      className: (0, o.Z)(
                        u().indicator,
                        !h && u().activeIndicator
                      ),
                    }),
                  ],
                }),
                (0, r.jsxs)("button", {
                  className: u().signUpToggle,
                  type: "button",
                  onClick: function () {
                    return E(!0);
                  },
                  children: [
                    (0, r.jsx)(c.Z, {
                      component: "h3",
                      className: h ? u().active : u().inactive,
                      children: "Log In",
                    }),
                    (0, r.jsx)("span", {
                      className: (0, o.Z)(
                        u().indicator,
                        h && u().activeIndicator
                      ),
                    }),
                  ],
                }),
              ],
            }),
            h
              ? (0, r.jsx)(w, {
                  formSettings: U,
                  emailSettings: C,
                  passwordSettings: I,
                  email: v,
                  disableRedirectAfterLogin: p,
                  password: x,
                  onSwitchMode: function () {
                    return E(!1);
                  },
                })
              : (0, r.jsx)(L, {
                  formSettings: U,
                  emailSettings: C,
                  passwordSettings: I,
                  email: v,
                  password: x,
                  onSwitchMode: function () {
                    return E(!0);
                  },
                }),
          ],
        });
      };
    },
    19428: function (e) {
      e.exports = {
        input: "EntryForm_input__ZEIpu",
        signUpFormSelector: "EntryForm_signUpFormSelector__EvOsY",
        active: "EntryForm_active__Ehivs",
        inactive: "EntryForm_inactive__OM4lh",
        indicator: "EntryForm_indicator__WwCTL",
        signUpToggle: "EntryForm_signUpToggle__mhr05",
        activeIndicator: "EntryForm_activeIndicator__s6Ncx",
      };
    },
    68690: function (e) {
      e.exports = {
        root: "SignUpForm_root__q8VCx",
        mailcheck: "SignUpForm_mailcheck__cfay3",
        subscript: "SignUpForm_subscript__xzyBI",
        agreementButton: "SignUpForm_agreementButton__Shsss",
        overlay: "SignUpForm_overlay__l5rJk",
        marketing: "SignUpForm_marketing__601_0",
        checkbox: "SignUpForm_checkbox__vHDGK",
        section: "SignUpForm_section__VX07D",
        signUpBtn: "SignUpForm_signUpBtn__fZsz_",
      };
    },
  },
]);
//# sourceMappingURL=119-a764624aed5c2d71.js.map
