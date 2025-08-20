(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [691],
  {
    691: function (e, s, a) {
      "use strict";
      a.r(s);
      var n = a(85893),
        t = (a(67294), a(54192)),
        i = a.n(t),
        o = a(86010),
        r = a(84646);
      s.default = function (e) {
        var s = e.userInboxMessage,
          a = (s.title, s.message),
          t = s.imageUrl;
        return (0, n.jsxs)("div", {
          className: (0, o.Z)(i().root, t && i().inboxMessageIconVisible),
          children: [
            t &&
              (0, n.jsx)("svg", {
                className: i().inboxMessageIcon,
                children: (0, n.jsx)("image", {
                  width: "100%",
                  height: "100%",
                  href: t,
                }),
              }),
            a && (0, n.jsx)(r.Z, { asMarkdown: !0, children: a }),
          ],
        });
      };
    },
    54192: function (e) {
      e.exports = {
        root: "DefaultMessage_root__aSd3c",
        inboxMessageIconVisible:
          "DefaultMessage_inboxMessageIconVisible___Ma3T",
        inboxMessageIcon: "DefaultMessage_inboxMessageIcon__OYALV",
        primaryCtaBtn: "DefaultMessage_primaryCtaBtn__8z791",
        cancelBtn: "DefaultMessage_cancelBtn__YAbtL",
        strongMessage: "DefaultMessage_strongMessage__7vDLI",
      };
    },
  },
]);
//# sourceMappingURL=691.be3e647cd721f630.js.map
