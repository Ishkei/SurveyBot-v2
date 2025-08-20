(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5744],
  {
    65744: function (e, s, n) {
      "use strict";
      n.r(s);
      var a = n(85893),
        i = (n(67294), n(84646)),
        t = n(39414),
        o = n(48020),
        r = n(16110),
        c = n.n(r),
        l = n(86010),
        d = n(11163),
        u = {
          speeding: "avoid-speeding",
          "trap-question": "pay-attention",
          location: "only-use-within-allowed-countries",
        };
      s.default = function (e) {
        var s = e.userInboxMessage,
          n = e.onClose,
          r = s.id,
          p = s.message,
          g = s.imageUrl,
          _ = s.topic,
          m = (0, d.useRouter)(),
          h = (null === _ || void 0 === _ ? void 0 : _.split("/").pop()) || "",
          x = u[h] || "",
          M = "/survey-tips/".concat(x);
        return (0, a.jsxs)("div", {
          className: (0, l.Z)(c().root, g && c().inboxMessageIconVisible),
          children: [
            g &&
              (0, a.jsx)("svg", {
                className: c().inboxMessageIcon,
                children: (0, a.jsx)("image", {
                  width: "100%",
                  height: "100%",
                  href: g,
                }),
              }),
            p && (0, a.jsx)(i.Z, { asMarkdown: !0, children: p }),
            M &&
              (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsx)(o.Z, {
                    className: c().primaryCtaBtn,
                    buttonType: "primary",
                    buttonSize: "large",
                    color: "secondary",
                    component: t.Z,
                    to: M,
                    onClick: function (e) {
                      e.preventDefault(), n(r), m.push(M);
                    },
                    children: (0, a.jsx)(i.Z, {
                      children: x ? "View Tip" : "View Tips",
                    }),
                  }),
                  (0, a.jsx)(o.Z, {
                    buttonType: "tertiary",
                    onClick: function (e) {
                      e.preventDefault(), n(r);
                    },
                    className: c().cancelBtn,
                    children: (0, a.jsx)(i.Z, { children: "I'm okay, thanks" }),
                  }),
                ],
              }),
          ],
        });
      };
    },
    16110: function (e) {
      e.exports = {
        root: "FraudTerminatedMessage_root__THpYJ",
        inboxMessageIconVisible:
          "FraudTerminatedMessage_inboxMessageIconVisible__cdU6_",
        inboxMessageIcon: "FraudTerminatedMessage_inboxMessageIcon__42pvw",
        primaryCtaBtn: "FraudTerminatedMessage_primaryCtaBtn__Ae8kU",
        cancelBtn: "FraudTerminatedMessage_cancelBtn__T_k5j",
        strongMessage: "FraudTerminatedMessage_strongMessage__toBSZ",
      };
    },
  },
]);
//# sourceMappingURL=5744.33e078325ce6f2b7.js.map
