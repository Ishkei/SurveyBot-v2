try {
  let e =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self
        ? self
        : {},
    n = new e.Error().stack;
  n &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[n] = "59a1a25e-641e-4b43-8c66-5332408bf003"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-59a1a25e-641e-4b43-8c66-5332408bf003"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [332],
  {
    6760: (e, n, t) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return t(9306);
        },
      ]);
    },
    9306: (e, n, t) => {
      "use strict";
      t.r(n), t.d(n, { default: () => a });
      var s = t(7876),
        r = t(4232),
        d = t(7328),
        u = t.n(d),
        l = t(9099),
        i = t(2862),
        f = t(6583),
        c = t(7612),
        o = t(4426);
      let a = () => {
        let e = (0, l.useRouter)(),
          n = (0, c.A)();
        return (
          (0, r.useEffect)(() => {
            n.current ||
              ((n.current = !0),
              e.push((0, o.Rt)("/consent")).finally(() => {
                n.current = !1;
              }));
          }, []),
          (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)(u(), {
                children: (0, s.jsx)("title", {
                  children: "Samplicious - Home",
                }),
              }),
              (0, s.jsx)(i.p, { children: (0, s.jsx)(f.W, {}) }),
            ],
          })
        );
      };
    },
  },
  (e) => {
    e.O(0, [636, 593, 792], () => e((e.s = 6760))), (_N_E = e.O());
  },
]);
