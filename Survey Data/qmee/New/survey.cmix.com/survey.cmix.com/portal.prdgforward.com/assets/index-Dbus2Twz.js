var lo = Object.defineProperty;
var fo = (e, t, n) =>
  t in e
    ? lo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Y = (e, t, n) => fo(e, typeof t != "symbol" ? t + "" : t, n);
function Fl() {
  import.meta.url, import("_").catch(() => 1), (async function* () {})().next();
}
(function () {
  try {
    var e =
        typeof window < "u"
          ? window
          : typeof global < "u"
          ? global
          : typeof self < "u"
          ? self
          : {},
      t = new e.Error().stack;
    t &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[t] = "546432fd-a0cd-4985-914c-fe09bb77f7da"),
      (e._sentryDebugIdIdentifier =
        "sentry-dbid-546432fd-a0cd-4985-914c-fe09bb77f7da"));
  } catch (n) {}
})();
var po =
  typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
po.SENTRY_RELEASE = { id: "9dafe063ece4b211d26e53b066a69774011dc03a" };
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
const y = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
  ge = "8.42.0",
  b = globalThis;
function jt(e, t, n) {
  const r = n || b,
    s = (r.__SENTRY__ = r.__SENTRY__ || {}),
    o = (s[ge] = s[ge] || {});
  return o[e] || (o[e] = t());
}
const pe = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
  mo = "Sentry Logger ",
  an = ["debug", "info", "warn", "error", "log", "assert", "trace"],
  xt = {};
function Re(e) {
  if (!("console" in b)) return e();
  const t = b.console,
    n = {},
    r = Object.keys(xt);
  r.forEach((s) => {
    const o = xt[s];
    (n[s] = t[s]), (t[s] = o);
  });
  try {
    return e();
  } finally {
    r.forEach((s) => {
      t[s] = n[s];
    });
  }
}
function ho() {
  let e = !1;
  const t = {
    enable: () => {
      e = !0;
    },
    disable: () => {
      e = !1;
    },
    isEnabled: () => e,
  };
  return (
    pe
      ? an.forEach((n) => {
          t[n] = (...r) => {
            e &&
              Re(() => {
                b.console[n]("".concat(mo, "[").concat(n, "]:"), ...r);
              });
          };
        })
      : an.forEach((n) => {
          t[n] = () => {};
        }),
    t
  );
}
const m = jt("logger", ho),
  Yr = 50,
  be = "?",
  Qn = /\(error: (.*)\)/,
  er = /captureMessage|captureException/;
function Xr(...e) {
  const t = e.sort((n, r) => n[0] - r[0]).map((n) => n[1]);
  return (n, r = 0, s = 0) => {
    const o = [],
      i = n.split("\n");
    for (let a = r; a < i.length; a++) {
      const c = i[a];
      if (c.length > 1024) continue;
      const u = Qn.test(c) ? c.replace(Qn, "$1") : c;
      if (!u.match(/\S*Error: /)) {
        for (const l of t) {
          const d = l(u);
          if (d) {
            o.push(d);
            break;
          }
        }
        if (o.length >= Yr + s) break;
      }
    }
    return _o(o.slice(s));
  };
}
function go(e) {
  return Array.isArray(e) ? Xr(...e) : e;
}
function _o(e) {
  if (!e.length) return [];
  const t = Array.from(e);
  return (
    /sentryWrapped/.test(ht(t).function || "") && t.pop(),
    t.reverse(),
    er.test(ht(t).function || "") &&
      (t.pop(), er.test(ht(t).function || "") && t.pop()),
    t
      .slice(0, Yr)
      .map((n) => ({
        ...n,
        filename: n.filename || ht(t).filename,
        function: n.function || be,
      }))
  );
}
function ht(e) {
  return e[e.length - 1] || {};
}
const Kt = "<anonymous>";
function ie(e) {
  try {
    return !e || typeof e != "function" ? Kt : e.name || Kt;
  } catch (t) {
    return Kt;
  }
}
function tr(e) {
  const t = e.exception;
  if (t) {
    const n = [];
    try {
      return (
        t.values.forEach((r) => {
          r.stacktrace.frames && n.push(...r.stacktrace.frames);
        }),
        n
      );
    } catch (r) {
      return;
    }
  }
}
const Rt = {},
  nr = {};
function me(e, t) {
  (Rt[e] = Rt[e] || []), Rt[e].push(t);
}
function he(e, t) {
  if (!nr[e]) {
    nr[e] = !0;
    try {
      t();
    } catch (n) {
      pe && m.error("Error while instrumenting ".concat(e), n);
    }
  }
}
function K(e, t) {
  const n = e && Rt[e];
  if (n)
    for (const r of n)
      try {
        r(t);
      } catch (s) {
        pe &&
          m.error(
            "Error while triggering instrumentation handler.\nType: "
              .concat(e, "\nName: ")
              .concat(ie(r), "\nError:"),
            s
          );
      }
}
let gt = null;
function Kr(e) {
  const t = "error";
  me(t, e), he(t, yo);
}
function yo() {
  (gt = b.onerror),
    (b.onerror = function (e, t, n, r, s) {
      return (
        K("error", { column: r, error: s, line: n, msg: e, url: t }),
        gt && !gt.__SENTRY_LOADER__ ? gt.apply(this, arguments) : !1
      );
    }),
    (b.onerror.__SENTRY_INSTRUMENTED__ = !0);
}
let _t = null;
function Jr(e) {
  const t = "unhandledrejection";
  me(t, e), he(t, So);
}
function So() {
  (_t = b.onunhandledrejection),
    (b.onunhandledrejection = function (e) {
      return (
        K("unhandledrejection", e),
        _t && !_t.__SENTRY_LOADER__ ? _t.apply(this, arguments) : !0
      );
    }),
    (b.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0);
}
function Ae() {
  return On(b), b;
}
function On(e) {
  const t = (e.__SENTRY__ = e.__SENTRY__ || {});
  return (t.version = t.version || ge), (t[ge] = t[ge] || {});
}
const Zr = Object.prototype.toString;
function xn(e) {
  switch (Zr.call(e)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return ae(e, Error);
  }
}
function We(e, t) {
  return Zr.call(e) === "[object ".concat(t, "]");
}
function Qr(e) {
  return We(e, "ErrorEvent");
}
function rr(e) {
  return We(e, "DOMError");
}
function Eo(e) {
  return We(e, "DOMException");
}
function oe(e) {
  return We(e, "String");
}
function Dn(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    "__sentry_template_string__" in e &&
    "__sentry_template_values__" in e
  );
}
function Ln(e) {
  return (
    e === null || Dn(e) || (typeof e != "object" && typeof e != "function")
  );
}
function $e(e) {
  return We(e, "Object");
}
function Wt(e) {
  return typeof Event < "u" && ae(e, Event);
}
function bo(e) {
  return typeof Element < "u" && ae(e, Element);
}
function To(e) {
  return We(e, "RegExp");
}
function st(e) {
  return !!(e && e.then && typeof e.then == "function");
}
function wo(e) {
  return (
    $e(e) &&
    "nativeEvent" in e &&
    "preventDefault" in e &&
    "stopPropagation" in e
  );
}
function ae(e, t) {
  try {
    return e instanceof t;
  } catch (n) {
    return !1;
  }
}
function es(e) {
  return !!(typeof e == "object" && e !== null && (e.__isVue || e._isVue));
}
const Me = b,
  vo = 80;
function Te(e, t = {}) {
  if (!e) return "<unknown>";
  try {
    let n = e;
    const r = 5,
      s = [];
    let o = 0,
      i = 0;
    const a = " > ",
      c = a.length;
    let u;
    const l = Array.isArray(t) ? t : t.keyAttrs,
      d = (!Array.isArray(t) && t.maxStringLength) || vo;
    for (
      ;
      n &&
      o++ < r &&
      ((u = Io(n, l)),
      !(u === "html" || (o > 1 && i + s.length * c + u.length >= d)));

    )
      s.push(u), (i += u.length), (n = n.parentNode);
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function Io(e, t) {
  const n = e,
    r = [];
  if (!n || !n.tagName) return "";
  if (Me.HTMLElement && n instanceof HTMLElement && n.dataset) {
    if (n.dataset.sentryComponent) return n.dataset.sentryComponent;
    if (n.dataset.sentryElement) return n.dataset.sentryElement;
  }
  r.push(n.tagName.toLowerCase());
  const s =
    t && t.length
      ? t.filter((i) => n.getAttribute(i)).map((i) => [i, n.getAttribute(i)])
      : null;
  if (s && s.length)
    s.forEach((i) => {
      r.push("[".concat(i[0], '="').concat(i[1], '"]'));
    });
  else {
    n.id && r.push("#".concat(n.id));
    const i = n.className;
    if (i && oe(i)) {
      const a = i.split(/\s+/);
      for (const c of a) r.push(".".concat(c));
    }
  }
  const o = ["aria-label", "type", "name", "title", "alt"];
  for (const i of o) {
    const a = n.getAttribute(i);
    a && r.push("[".concat(i, '="').concat(a, '"]'));
  }
  return r.join("");
}
function ko() {
  try {
    return Me.document.location.href;
  } catch (e) {
    return "";
  }
}
function Ro(e) {
  return Me.document && Me.document.querySelector
    ? Me.document.querySelector(e)
    : null;
}
function ts(e) {
  if (!Me.HTMLElement) return null;
  let t = e;
  const n = 5;
  for (let r = 0; r < n; r++) {
    if (!t) return null;
    if (t instanceof HTMLElement) {
      if (t.dataset.sentryComponent) return t.dataset.sentryComponent;
      if (t.dataset.sentryElement) return t.dataset.sentryElement;
    }
    t = t.parentNode;
  }
  return null;
}
function Fe(e, t = 0) {
  return typeof e != "string" || t === 0 || e.length <= t
    ? e
    : "".concat(e.slice(0, t), "...");
}
function sr(e, t) {
  if (!Array.isArray(e)) return "";
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    try {
      es(s) ? n.push("[VueViewModel]") : n.push(String(s));
    } catch (o) {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(t);
}
function Ao(e, t, n = !1) {
  return oe(e)
    ? To(t)
      ? t.test(e)
      : oe(t)
      ? n
        ? e === t
        : e.includes(t)
      : !1
    : !1;
}
function _e(e, t = [], n = !1) {
  return t.some((r) => Ao(e, r, n));
}
function z(e, t, n) {
  if (!(t in e)) return;
  const r = e[t],
    s = n(r);
  typeof s == "function" && ns(s, r);
  try {
    e[t] = s;
  } catch (o) {
    pe && m.log('Failed to replace method "'.concat(t, '" in object'), e);
  }
}
function J(e, t, n) {
  try {
    Object.defineProperty(e, t, { value: n, writable: !0, configurable: !0 });
  } catch (r) {
    pe &&
      m.log(
        'Failed to add non-enumerable property "'.concat(t, '" to object'),
        e
      );
  }
}
function ns(e, t) {
  try {
    const n = t.prototype || {};
    (e.prototype = t.prototype = n), J(e, "__sentry_original__", t);
  } catch (n) {}
}
function Mn(e) {
  return e.__sentry_original__;
}
function rs(e) {
  if (xn(e))
    return { message: e.message, name: e.name, stack: e.stack, ...ir(e) };
  if (Wt(e)) {
    const t = {
      type: e.type,
      target: or(e.target),
      currentTarget: or(e.currentTarget),
      ...ir(e),
    };
    return (
      typeof CustomEvent < "u" && ae(e, CustomEvent) && (t.detail = e.detail), t
    );
  } else return e;
}
function or(e) {
  try {
    return bo(e) ? Te(e) : Object.prototype.toString.call(e);
  } catch (t) {
    return "<unknown>";
  }
}
function ir(e) {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t;
  } else return {};
}
function Po(e, t = 40) {
  const n = Object.keys(rs(e));
  n.sort();
  const r = n[0];
  if (!r) return "[object has no keys]";
  if (r.length >= t) return Fe(r, t);
  for (let s = n.length; s > 0; s--) {
    const o = n.slice(0, s).join(", ");
    if (!(o.length > t)) return s === n.length ? o : Fe(o, t);
  }
  return "";
}
function F(e) {
  return cn(e, new Map());
}
function cn(e, t) {
  if (Co(e)) {
    const n = t.get(e);
    if (n !== void 0) return n;
    const r = {};
    t.set(e, r);
    for (const s of Object.getOwnPropertyNames(e))
      typeof e[s] < "u" && (r[s] = cn(e[s], t));
    return r;
  }
  if (Array.isArray(e)) {
    const n = t.get(e);
    if (n !== void 0) return n;
    const r = [];
    return (
      t.set(e, r),
      e.forEach((s) => {
        r.push(cn(s, t));
      }),
      r
    );
  }
  return e;
}
function Co(e) {
  if (!$e(e)) return !1;
  try {
    const t = Object.getPrototypeOf(e).constructor.name;
    return !t || t === "Object";
  } catch (t) {
    return !0;
  }
}
const ss = 1e3;
function ot() {
  return Date.now() / ss;
}
function No() {
  const { performance: e } = b;
  if (!e || !e.now) return ot;
  const t = Date.now() - e.now(),
    n = e.timeOrigin == null ? t : e.timeOrigin;
  return () => (n + e.now()) / ss;
}
const B = No(),
  q = (() => {
    const { performance: e } = b;
    if (!e || !e.now) return;
    const t = 3600 * 1e3,
      n = e.now(),
      r = Date.now(),
      s = e.timeOrigin ? Math.abs(e.timeOrigin + n - r) : t,
      o = s < t,
      i = e.timing && e.timing.navigationStart,
      c = typeof i == "number" ? Math.abs(i + n - r) : t,
      u = c < t;
    return o || u ? (s <= c ? e.timeOrigin : i) : r;
  })();
function x() {
  const e = b,
    t = e.crypto || e.msCrypto;
  let n = () => Math.random() * 16;
  try {
    if (t && t.randomUUID) return t.randomUUID().replace(/-/g, "");
    t &&
      t.getRandomValues &&
      (n = () => {
        const r = new Uint8Array(1);
        return t.getRandomValues(r), r[0];
      });
  } catch (r) {}
  return ("10000000100040008000" + 1e11).replace(/[018]/g, (r) =>
    (r ^ ((n() & 15) >> (r / 4))).toString(16)
  );
}
function os(e) {
  return e.exception && e.exception.values ? e.exception.values[0] : void 0;
}
function de(e) {
  const { message: t, event_id: n } = e;
  if (t) return t;
  const r = os(e);
  return r
    ? r.type && r.value
      ? "".concat(r.type, ": ").concat(r.value)
      : r.type || r.value || n || "<unknown>"
    : n || "<unknown>";
}
function un(e, t, n) {
  const r = (e.exception = e.exception || {}),
    s = (r.values = r.values || []),
    o = (s[0] = s[0] || {});
  o.value || (o.value = t || ""), o.type || (o.type = "Error");
}
function tt(e, t) {
  const n = os(e);
  if (!n) return;
  const r = { type: "generic", handled: !0 },
    s = n.mechanism;
  if (((n.mechanism = { ...r, ...s, ...t }), t && "data" in t)) {
    const o = { ...(s && s.data), ...t.data };
    n.mechanism.data = o;
  }
}
function ar(e) {
  if (Oo(e)) return !0;
  try {
    J(e, "__sentry_captured__", !0);
  } catch (t) {}
  return !1;
}
function Oo(e) {
  try {
    return e.__sentry_captured__;
  } catch (t) {}
}
var ne;
(function (e) {
  e[(e.PENDING = 0)] = "PENDING";
  const n = 1;
  e[(e.RESOLVED = n)] = "RESOLVED";
  const r = 2;
  e[(e.REJECTED = r)] = "REJECTED";
})(ne || (ne = {}));
function we(e) {
  return new X((t) => {
    t(e);
  });
}
function Dt(e) {
  return new X((t, n) => {
    n(e);
  });
}
class X {
  constructor(t) {
    X.prototype.__init.call(this),
      X.prototype.__init2.call(this),
      X.prototype.__init3.call(this),
      X.prototype.__init4.call(this),
      (this._state = ne.PENDING),
      (this._handlers = []);
    try {
      t(this._resolve, this._reject);
    } catch (n) {
      this._reject(n);
    }
  }
  then(t, n) {
    return new X((r, s) => {
      this._handlers.push([
        !1,
        (o) => {
          if (!t) r(o);
          else
            try {
              r(t(o));
            } catch (i) {
              s(i);
            }
        },
        (o) => {
          if (!n) s(o);
          else
            try {
              r(n(o));
            } catch (i) {
              s(i);
            }
        },
      ]),
        this._executeHandlers();
    });
  }
  catch(t) {
    return this.then((n) => n, t);
  }
  finally(t) {
    return new X((n, r) => {
      let s, o;
      return this.then(
        (i) => {
          (o = !1), (s = i), t && t();
        },
        (i) => {
          (o = !0), (s = i), t && t();
        }
      ).then(() => {
        if (o) {
          r(s);
          return;
        }
        n(s);
      });
    });
  }
  __init() {
    this._resolve = (t) => {
      this._setResult(ne.RESOLVED, t);
    };
  }
  __init2() {
    this._reject = (t) => {
      this._setResult(ne.REJECTED, t);
    };
  }
  __init3() {
    this._setResult = (t, n) => {
      if (this._state === ne.PENDING) {
        if (st(n)) {
          n.then(this._resolve, this._reject);
          return;
        }
        (this._state = t), (this._value = n), this._executeHandlers();
      }
    };
  }
  __init4() {
    this._executeHandlers = () => {
      if (this._state === ne.PENDING) return;
      const t = this._handlers.slice();
      (this._handlers = []),
        t.forEach((n) => {
          n[0] ||
            (this._state === ne.RESOLVED && n[1](this._value),
            this._state === ne.REJECTED && n[2](this._value),
            (n[0] = !0));
        });
    };
  }
}
function xo(e) {
  const t = B(),
    n = {
      sid: x(),
      init: !0,
      timestamp: t,
      started: t,
      duration: 0,
      status: "ok",
      errors: 0,
      ignoreDuration: !1,
      toJSON: () => Lo(n),
    };
  return e && He(n, e), n;
}
function He(e, t = {}) {
  if (
    (t.user &&
      (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address),
      !e.did &&
        !t.did &&
        (e.did = t.user.id || t.user.email || t.user.username)),
    (e.timestamp = t.timestamp || B()),
    t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism),
    t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
    t.sid && (e.sid = t.sid.length === 32 ? t.sid : x()),
    t.init !== void 0 && (e.init = t.init),
    !e.did && t.did && (e.did = "".concat(t.did)),
    typeof t.started == "number" && (e.started = t.started),
    e.ignoreDuration)
  )
    e.duration = void 0;
  else if (typeof t.duration == "number") e.duration = t.duration;
  else {
    const n = e.timestamp - e.started;
    e.duration = n >= 0 ? n : 0;
  }
  t.release && (e.release = t.release),
    t.environment && (e.environment = t.environment),
    !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
    !e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
    typeof t.errors == "number" && (e.errors = t.errors),
    t.status && (e.status = t.status);
}
function Do(e, t) {
  let n = {};
  e.status === "ok" && (n = { status: "exited" }), He(e, n);
}
function Lo(e) {
  return F({
    sid: "".concat(e.sid),
    init: e.init,
    started: new Date(e.started * 1e3).toISOString(),
    timestamp: new Date(e.timestamp * 1e3).toISOString(),
    status: e.status,
    errors: e.errors,
    did:
      typeof e.did == "number" || typeof e.did == "string"
        ? "".concat(e.did)
        : void 0,
    duration: e.duration,
    abnormal_mechanism: e.abnormal_mechanism,
    attrs: {
      release: e.release,
      environment: e.environment,
      ip_address: e.ipAddress,
      user_agent: e.userAgent,
    },
  });
}
function nt() {
  return x();
}
function Lt() {
  return x().substring(16);
}
function qt(e, t, n = 2) {
  if (!t || typeof t != "object" || n <= 0) return t;
  if (e && t && Object.keys(t).length === 0) return e;
  const r = { ...e };
  for (const s in t)
    Object.prototype.hasOwnProperty.call(t, s) &&
      (r[s] = qt(r[s], t[s], n - 1));
  return r;
}
const dn = "_sentrySpan";
function Ue(e, t) {
  t ? J(e, dn, t) : delete e[dn];
}
function Mt(e) {
  return e[dn];
}
const Mo = 100;
class Fn {
  constructor() {
    (this._notifyingListeners = !1),
      (this._scopeListeners = []),
      (this._eventProcessors = []),
      (this._breadcrumbs = []),
      (this._attachments = []),
      (this._user = {}),
      (this._tags = {}),
      (this._extra = {}),
      (this._contexts = {}),
      (this._sdkProcessingMetadata = {}),
      (this._propagationContext = { traceId: nt(), spanId: Lt() });
  }
  clone() {
    const t = new Fn();
    return (
      (t._breadcrumbs = [...this._breadcrumbs]),
      (t._tags = { ...this._tags }),
      (t._extra = { ...this._extra }),
      (t._contexts = { ...this._contexts }),
      (t._user = this._user),
      (t._level = this._level),
      (t._session = this._session),
      (t._transactionName = this._transactionName),
      (t._fingerprint = this._fingerprint),
      (t._eventProcessors = [...this._eventProcessors]),
      (t._requestSession = this._requestSession),
      (t._attachments = [...this._attachments]),
      (t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata }),
      (t._propagationContext = { ...this._propagationContext }),
      (t._client = this._client),
      (t._lastEventId = this._lastEventId),
      Ue(t, Mt(this)),
      t
    );
  }
  setClient(t) {
    this._client = t;
  }
  setLastEventId(t) {
    this._lastEventId = t;
  }
  getClient() {
    return this._client;
  }
  lastEventId() {
    return this._lastEventId;
  }
  addScopeListener(t) {
    this._scopeListeners.push(t);
  }
  addEventProcessor(t) {
    return this._eventProcessors.push(t), this;
  }
  setUser(t) {
    return (
      (this._user = t || {
        email: void 0,
        id: void 0,
        ip_address: void 0,
        username: void 0,
      }),
      this._session && He(this._session, { user: t }),
      this._notifyScopeListeners(),
      this
    );
  }
  getUser() {
    return this._user;
  }
  getRequestSession() {
    return this._requestSession;
  }
  setRequestSession(t) {
    return (this._requestSession = t), this;
  }
  setTags(t) {
    return (
      (this._tags = { ...this._tags, ...t }), this._notifyScopeListeners(), this
    );
  }
  setTag(t, n) {
    return (
      (this._tags = { ...this._tags, [t]: n }),
      this._notifyScopeListeners(),
      this
    );
  }
  setExtras(t) {
    return (
      (this._extra = { ...this._extra, ...t }),
      this._notifyScopeListeners(),
      this
    );
  }
  setExtra(t, n) {
    return (
      (this._extra = { ...this._extra, [t]: n }),
      this._notifyScopeListeners(),
      this
    );
  }
  setFingerprint(t) {
    return (this._fingerprint = t), this._notifyScopeListeners(), this;
  }
  setLevel(t) {
    return (this._level = t), this._notifyScopeListeners(), this;
  }
  setTransactionName(t) {
    return (this._transactionName = t), this._notifyScopeListeners(), this;
  }
  setContext(t, n) {
    return (
      n === null ? delete this._contexts[t] : (this._contexts[t] = n),
      this._notifyScopeListeners(),
      this
    );
  }
  setSession(t) {
    return (
      t ? (this._session = t) : delete this._session,
      this._notifyScopeListeners(),
      this
    );
  }
  getSession() {
    return this._session;
  }
  update(t) {
    if (!t) return this;
    const n = typeof t == "function" ? t(this) : t,
      [r, s] =
        n instanceof ve
          ? [n.getScopeData(), n.getRequestSession()]
          : $e(n)
          ? [t, t.requestSession]
          : [],
      {
        tags: o,
        extra: i,
        user: a,
        contexts: c,
        level: u,
        fingerprint: l = [],
        propagationContext: d,
      } = r || {};
    return (
      (this._tags = { ...this._tags, ...o }),
      (this._extra = { ...this._extra, ...i }),
      (this._contexts = { ...this._contexts, ...c }),
      a && Object.keys(a).length && (this._user = a),
      u && (this._level = u),
      l.length && (this._fingerprint = l),
      d && (this._propagationContext = d),
      s && (this._requestSession = s),
      this
    );
  }
  clear() {
    return (
      (this._breadcrumbs = []),
      (this._tags = {}),
      (this._extra = {}),
      (this._user = {}),
      (this._contexts = {}),
      (this._level = void 0),
      (this._transactionName = void 0),
      (this._fingerprint = void 0),
      (this._requestSession = void 0),
      (this._session = void 0),
      Ue(this, void 0),
      (this._attachments = []),
      this.setPropagationContext({ traceId: nt() }),
      this._notifyScopeListeners(),
      this
    );
  }
  addBreadcrumb(t, n) {
    const r = typeof n == "number" ? n : Mo;
    if (r <= 0) return this;
    const s = { timestamp: ot(), ...t },
      o = this._breadcrumbs;
    return (
      o.push(s),
      (this._breadcrumbs = o.length > r ? o.slice(-r) : o),
      this._notifyScopeListeners(),
      this
    );
  }
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  clearBreadcrumbs() {
    return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
  }
  addAttachment(t) {
    return this._attachments.push(t), this;
  }
  clearAttachments() {
    return (this._attachments = []), this;
  }
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: Mt(this),
    };
  }
  setSDKProcessingMetadata(t) {
    return (
      (this._sdkProcessingMetadata = qt(this._sdkProcessingMetadata, t, 2)),
      this
    );
  }
  setPropagationContext(t) {
    return (this._propagationContext = { spanId: Lt(), ...t }), this;
  }
  getPropagationContext() {
    return this._propagationContext;
  }
  captureException(t, n) {
    const r = n && n.event_id ? n.event_id : x();
    if (!this._client)
      return (
        m.warn("No client configured on scope - will not capture exception!"), r
      );
    const s = new Error("Sentry syntheticException");
    return (
      this._client.captureException(
        t,
        { originalException: t, syntheticException: s, ...n, event_id: r },
        this
      ),
      r
    );
  }
  captureMessage(t, n, r) {
    const s = r && r.event_id ? r.event_id : x();
    if (!this._client)
      return (
        m.warn("No client configured on scope - will not capture message!"), s
      );
    const o = new Error(t);
    return (
      this._client.captureMessage(
        t,
        n,
        { originalException: t, syntheticException: o, ...r, event_id: s },
        this
      ),
      s
    );
  }
  captureEvent(t, n) {
    const r = n && n.event_id ? n.event_id : x();
    return this._client
      ? (this._client.captureEvent(t, { ...n, event_id: r }, this), r)
      : (m.warn("No client configured on scope - will not capture event!"), r);
  }
  _notifyScopeListeners() {
    this._notifyingListeners ||
      ((this._notifyingListeners = !0),
      this._scopeListeners.forEach((t) => {
        t(this);
      }),
      (this._notifyingListeners = !1));
  }
}
const ve = Fn;
function Fo() {
  return jt("defaultCurrentScope", () => new ve());
}
function $o() {
  return jt("defaultIsolationScope", () => new ve());
}
class Ho {
  constructor(t, n) {
    let r;
    t ? (r = t) : (r = new ve());
    let s;
    n ? (s = n) : (s = new ve()),
      (this._stack = [{ scope: r }]),
      (this._isolationScope = s);
  }
  withScope(t) {
    const n = this._pushScope();
    let r;
    try {
      r = t(n);
    } catch (s) {
      throw (this._popScope(), s);
    }
    return st(r)
      ? r.then(
          (s) => (this._popScope(), s),
          (s) => {
            throw (this._popScope(), s);
          }
        )
      : (this._popScope(), r);
  }
  getClient() {
    return this.getStackTop().client;
  }
  getScope() {
    return this.getStackTop().scope;
  }
  getIsolationScope() {
    return this._isolationScope;
  }
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  _pushScope() {
    const t = this.getScope().clone();
    return this._stack.push({ client: this.getClient(), scope: t }), t;
  }
  _popScope() {
    return this._stack.length <= 1 ? !1 : !!this._stack.pop();
  }
}
function Be() {
  const e = Ae(),
    t = On(e);
  return (t.stack = t.stack || new Ho(Fo(), $o()));
}
function Uo(e) {
  return Be().withScope(e);
}
function Bo(e, t) {
  const n = Be();
  return n.withScope(() => ((n.getStackTop().scope = e), t(e)));
}
function cr(e) {
  return Be().withScope(() => e(Be().getIsolationScope()));
}
function jo() {
  return {
    withIsolationScope: cr,
    withScope: Uo,
    withSetScope: Bo,
    withSetIsolationScope: (e, t) => cr(t),
    getCurrentScope: () => Be().getScope(),
    getIsolationScope: () => Be().getIsolationScope(),
  };
}
function qe(e) {
  const t = On(e);
  return t.acs ? t.acs : jo();
}
function I() {
  const e = Ae();
  return qe(e).getCurrentScope();
}
function Pe() {
  const e = Ae();
  return qe(e).getIsolationScope();
}
function Wo() {
  return jt("globalScope", () => new ve());
}
function Gt(...e) {
  const t = Ae(),
    n = qe(t);
  if (e.length === 2) {
    const [r, s] = e;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(e[0]);
}
function w() {
  return I().getClient();
}
function qo(e) {
  const t = e.getPropagationContext(),
    { traceId: n, spanId: r, parentSpanId: s } = t;
  return F({ trace_id: n, span_id: r, parent_span_id: s });
}
const Go = "_sentryMetrics";
function ln(e) {
  const t = e[Go];
  if (!t) return;
  const n = {};
  for (const [, [r, s]] of t) (n[r] || (n[r] = [])).push(F(s));
  return n;
}
const se = "sentry.source",
  is = "sentry.sample_rate",
  Ie = "sentry.op",
  D = "sentry.origin",
  fn = "sentry.idle_span_finish_reason",
  Vt = "sentry.measurement_unit",
  zt = "sentry.measurement_value",
  Vo = "sentry.profile_id",
  $n = "sentry.exclusive_time",
  zo = 0,
  as = 1,
  O = 2;
function Yo(e) {
  if (e < 400 && e >= 100) return { code: as };
  if (e >= 400 && e < 500)
    switch (e) {
      case 401:
        return { code: O, message: "unauthenticated" };
      case 403:
        return { code: O, message: "permission_denied" };
      case 404:
        return { code: O, message: "not_found" };
      case 409:
        return { code: O, message: "already_exists" };
      case 413:
        return { code: O, message: "failed_precondition" };
      case 429:
        return { code: O, message: "resource_exhausted" };
      case 499:
        return { code: O, message: "cancelled" };
      default:
        return { code: O, message: "invalid_argument" };
    }
  if (e >= 500 && e < 600)
    switch (e) {
      case 501:
        return { code: O, message: "unimplemented" };
      case 503:
        return { code: O, message: "unavailable" };
      case 504:
        return { code: O, message: "deadline_exceeded" };
      default:
        return { code: O, message: "internal_error" };
    }
  return { code: O, message: "unknown_error" };
}
function cs(e, t) {
  e.setAttribute("http.response.status_code", t);
  const n = Yo(t);
  n.message !== "unknown_error" && e.setStatus(n);
}
const Hn = "sentry-",
  Xo = /^sentry-/,
  Ko = 8192;
function us(e) {
  const t = Zo(e);
  if (!t) return;
  const n = Object.entries(t).reduce((r, [s, o]) => {
    if (s.match(Xo)) {
      const i = s.slice(Hn.length);
      r[i] = o;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0) return n;
}
function Jo(e) {
  if (!e) return;
  const t = Object.entries(e).reduce(
    (n, [r, s]) => (s && (n["".concat(Hn).concat(r)] = s), n),
    {}
  );
  return Qo(t);
}
function Zo(e) {
  if (!(!e || (!oe(e) && !Array.isArray(e))))
    return Array.isArray(e)
      ? e.reduce((t, n) => {
          const r = ur(n);
          return (
            Object.entries(r).forEach(([s, o]) => {
              t[s] = o;
            }),
            t
          );
        }, {})
      : ur(e);
}
function ur(e) {
  return e
    .split(",")
    .map((t) => t.split("=").map((n) => decodeURIComponent(n.trim())))
    .reduce((t, [n, r]) => (n && r && (t[n] = r), t), {});
}
function Qo(e) {
  if (Object.keys(e).length !== 0)
    return Object.entries(e).reduce((t, [n, r], s) => {
      const o = ""
          .concat(encodeURIComponent(n), "=")
          .concat(encodeURIComponent(r)),
        i = s === 0 ? o : "".concat(t, ",").concat(o);
      return i.length > Ko
        ? (pe &&
            m.warn(
              "Not adding key: "
                .concat(n, " with val: ")
                .concat(
                  r,
                  " to baggage header due to exceeding baggage size limits."
                )
            ),
          t)
        : i;
    }, "");
}
const ds = new RegExp(
  "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$"
);
function ei(e) {
  if (!e) return;
  const t = e.match(ds);
  if (!t) return;
  let n;
  return (
    t[3] === "1" ? (n = !0) : t[3] === "0" && (n = !1),
    { traceId: t[1], parentSampled: n, parentSpanId: t[2] }
  );
}
function ti(e, t) {
  const n = ei(e),
    r = us(t);
  if (!n || !n.traceId) return { traceId: nt(), spanId: Lt() };
  const { traceId: s, parentSpanId: o, parentSampled: i } = n,
    a = Lt();
  return { traceId: s, parentSpanId: o, spanId: a, sampled: i, dsc: r || {} };
}
function ls(e = x(), t = x().substring(16), n) {
  let r = "";
  return (
    n !== void 0 && (r = n ? "-1" : "-0"), "".concat(e, "-").concat(t).concat(r)
  );
}
const fs = 0,
  ps = 1;
let dr = !1;
function ni(e) {
  const { spanId: t, traceId: n } = e.spanContext(),
    { data: r, op: s, parent_span_id: o, status: i, origin: a } = T(e);
  return F({
    parent_span_id: o,
    span_id: t,
    trace_id: n,
    data: r,
    op: s,
    status: i,
    origin: a,
  });
}
function ri(e) {
  const { spanId: t, traceId: n } = e.spanContext(),
    { parent_span_id: r } = T(e);
  return F({ parent_span_id: r, span_id: t, trace_id: n });
}
function si(e) {
  const { traceId: t, spanId: n } = e.spanContext(),
    r = Ce(e);
  return ls(t, n, r);
}
function ye(e) {
  return typeof e == "number"
    ? lr(e)
    : Array.isArray(e)
    ? e[0] + e[1] / 1e9
    : e instanceof Date
    ? lr(e.getTime())
    : B();
}
function lr(e) {
  return e > 9999999999 ? e / 1e3 : e;
}
function T(e) {
  if (ii(e)) return e.getSpanJSON();
  try {
    const { spanId: t, traceId: n } = e.spanContext();
    if (oi(e)) {
      const {
        attributes: r,
        startTime: s,
        name: o,
        endTime: i,
        parentSpanId: a,
        status: c,
      } = e;
      return F({
        span_id: t,
        trace_id: n,
        data: r,
        description: o,
        parent_span_id: a,
        start_timestamp: ye(s),
        timestamp: ye(i) || void 0,
        status: ms(c),
        op: r[Ie],
        origin: r[D],
        _metrics_summary: ln(e),
      });
    }
    return { span_id: t, trace_id: n };
  } catch (t) {
    return {};
  }
}
function oi(e) {
  const t = e;
  return (
    !!t.attributes && !!t.startTime && !!t.name && !!t.endTime && !!t.status
  );
}
function ii(e) {
  return typeof e.getSpanJSON == "function";
}
function Ce(e) {
  const { traceFlags: t } = e.spanContext();
  return t === ps;
}
function ms(e) {
  if (!(!e || e.code === zo))
    return e.code === as ? "ok" : e.message || "unknown_error";
}
const Se = "_sentryChildSpans",
  pn = "_sentryRootSpan";
function hs(e, t) {
  const n = e[pn] || e;
  J(t, pn, n), e[Se] ? e[Se].add(t) : J(e, Se, new Set([t]));
}
function ai(e, t) {
  e[Se] && e[Se].delete(t);
}
function At(e) {
  const t = new Set();
  function n(r) {
    if (!t.has(r) && Ce(r)) {
      t.add(r);
      const s = r[Se] ? Array.from(r[Se]) : [];
      for (const o of s) n(o);
    }
  }
  return n(e), Array.from(t);
}
function $(e) {
  return e[pn] || e;
}
function H() {
  const e = Ae(),
    t = qe(e);
  return t.getActiveSpan ? t.getActiveSpan() : Mt(I());
}
function gs() {
  dr ||
    (Re(() => {
      console.warn(
        "[Sentry] Deprecation warning: Returning null from `beforeSendSpan` will be disallowed from SDK version 9.0.0 onwards. The callback will only support mutating spans. To drop certain spans, configure the respective integrations directly."
      );
    }),
    (dr = !0));
}
let fr = !1;
function ci() {
  fr || ((fr = !0), Kr(mn), Jr(mn));
}
function mn() {
  const e = H(),
    t = e && $(e);
  if (t) {
    const n = "internal_error";
    y && m.log("[Tracing] Root span: ".concat(n, " -> Global error occurred")),
      t.setStatus({ code: O, message: n });
  }
}
mn.tag = "sentry_tracingErrorCallback";
const _s = "_sentryScope",
  ys = "_sentryIsolationScope";
function ui(e, t, n) {
  e && (J(e, ys, n), J(e, _s, t));
}
function pr(e) {
  return { scope: e[_s], isolationScope: e[ys] };
}
function fe(e) {
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__) return !1;
  const t = w(),
    n = e || (t && t.getOptions());
  return (
    !!n && (n.enableTracing || "tracesSampleRate" in n || "tracesSampler" in n)
  );
}
class Ne {
  constructor(t = {}) {
    (this._traceId = t.traceId || x()),
      (this._spanId = t.spanId || x().substring(16));
  }
  spanContext() {
    return { spanId: this._spanId, traceId: this._traceId, traceFlags: fs };
  }
  end(t) {}
  setAttribute(t, n) {
    return this;
  }
  setAttributes(t) {
    return this;
  }
  setStatus(t) {
    return this;
  }
  updateName(t) {
    return this;
  }
  isRecording() {
    return !1;
  }
  addEvent(t, n, r) {
    return this;
  }
  addLink(t) {
    return this;
  }
  addLinks(t) {
    return this;
  }
  recordException(t, n) {}
}
function di(e, t, n = () => {}) {
  let r;
  try {
    r = e();
  } catch (s) {
    throw (t(s), n(), s);
  }
  return li(r, t, n);
}
function li(e, t, n) {
  return st(e)
    ? e.then(
        (r) => (n(), r),
        (r) => {
          throw (t(r), n(), r);
        }
      )
    : (n(), e);
}
const Un = "production",
  Ss = "_frozenDsc";
function mr(e, t) {
  J(e, Ss, t);
}
function Es(e, t) {
  const n = t.getOptions(),
    { publicKey: r } = t.getDsn() || {},
    s = F({
      environment: n.environment || Un,
      release: n.release,
      public_key: r,
      trace_id: e,
    });
  return t.emit("createDsc", s), s;
}
function bs(e, t) {
  const n = t.getPropagationContext();
  return n.dsc || Es(n.traceId, e);
}
function Ge(e) {
  const t = w();
  if (!t) return {};
  const n = $(e),
    r = n[Ss];
  if (r) return r;
  const s = n.spanContext().traceState,
    o = s && s.get("sentry.dsc"),
    i = o && us(o);
  if (i) return i;
  const a = Es(e.spanContext().traceId, t),
    c = T(n),
    u = c.data || {},
    l = u[is];
  l != null && (a.sample_rate = "".concat(l));
  const d = u[se],
    f = c.description;
  return (
    d !== "url" && f && (a.transaction = f),
    fe() && (a.sampled = String(Ce(n))),
    t.emit("createDsc", a, n),
    a
  );
}
function fi(e) {
  if (!y) return;
  const {
      description: t = "< unknown name >",
      op: n = "< unknown op >",
      parent_span_id: r,
    } = T(e),
    { spanId: s } = e.spanContext(),
    o = Ce(e),
    i = $(e),
    a = i === e,
    c = "[Tracing] Starting "
      .concat(o ? "sampled" : "unsampled", " ")
      .concat(a ? "root " : "", "span"),
    u = ["op: ".concat(n), "name: ".concat(t), "ID: ".concat(s)];
  if ((r && u.push("parent ID: ".concat(r)), !a)) {
    const { op: l, description: d } = T(i);
    u.push("root ID: ".concat(i.spanContext().spanId)),
      l && u.push("root op: ".concat(l)),
      d && u.push("root description: ".concat(d));
  }
  m.log("".concat(c, "\n  ").concat(u.join("\n  ")));
}
function pi(e) {
  if (!y) return;
  const { description: t = "< unknown name >", op: n = "< unknown op >" } =
      T(e),
    { spanId: r } = e.spanContext(),
    o = $(e) === e,
    i = '[Tracing] Finishing "'
      .concat(n, '" ')
      .concat(o ? "root " : "", 'span "')
      .concat(t, '" with ID ')
      .concat(r);
  m.log(i);
}
function Ts(e) {
  if (typeof e == "boolean") return Number(e);
  const t = typeof e == "string" ? parseFloat(e) : e;
  if (typeof t != "number" || isNaN(t) || t < 0 || t > 1) {
    y &&
      m.warn(
        "[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got "
          .concat(JSON.stringify(e), " of type ")
          .concat(JSON.stringify(typeof e), ".")
      );
    return;
  }
  return t;
}
function mi(e, t) {
  if (!fe(e)) return [!1];
  let n;
  typeof e.tracesSampler == "function"
    ? (n = e.tracesSampler(t))
    : t.parentSampled !== void 0
    ? (n = t.parentSampled)
    : typeof e.tracesSampleRate < "u"
    ? (n = e.tracesSampleRate)
    : (n = 1);
  const r = Ts(n);
  return r === void 0
    ? (y &&
        m.warn(
          "[Tracing] Discarding transaction because of invalid sample rate."
        ),
      [!1])
    : r
    ? Math.random() < r
      ? [!0, r]
      : (y &&
          m.log(
            "[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ".concat(
              Number(n),
              ")"
            )
          ),
        [!1, r])
    : (y &&
        m.log(
          "[Tracing] Discarding transaction because ".concat(
            typeof e.tracesSampler == "function"
              ? "tracesSampler returned 0 or false"
              : "a negative sampling decision was inherited or tracesSampleRate is set to 0"
          )
        ),
      [!1, r]);
}
const hi = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function gi(e) {
  return e === "http" || e === "https";
}
function it(e, t = !1) {
  const {
    host: n,
    path: r,
    pass: s,
    port: o,
    projectId: i,
    protocol: a,
    publicKey: c,
  } = e;
  return (
    ""
      .concat(a, "://")
      .concat(c)
      .concat(t && s ? ":".concat(s) : "") +
    "@"
      .concat(n)
      .concat(o ? ":".concat(o) : "", "/")
      .concat(r && "".concat(r, "/"))
      .concat(i)
  );
}
function _i(e) {
  const t = hi.exec(e);
  if (!t) {
    Re(() => {
      console.error("Invalid Sentry Dsn: ".concat(e));
    });
    return;
  }
  const [n, r, s = "", o = "", i = "", a = ""] = t.slice(1);
  let c = "",
    u = a;
  const l = u.split("/");
  if ((l.length > 1 && ((c = l.slice(0, -1).join("/")), (u = l.pop())), u)) {
    const d = u.match(/^\d+/);
    d && (u = d[0]);
  }
  return ws({
    host: o,
    pass: s,
    path: c,
    projectId: u,
    port: i,
    protocol: n,
    publicKey: r,
  });
}
function ws(e) {
  return {
    protocol: e.protocol,
    publicKey: e.publicKey || "",
    pass: e.pass || "",
    host: e.host,
    port: e.port || "",
    path: e.path || "",
    projectId: e.projectId,
  };
}
function yi(e) {
  if (!pe) return !0;
  const { port: t, projectId: n, protocol: r } = e;
  return ["protocol", "publicKey", "host", "projectId"].find((i) =>
    e[i] ? !1 : (m.error("Invalid Sentry Dsn: ".concat(i, " missing")), !0)
  )
    ? !1
    : n.match(/^\d+$/)
    ? gi(r)
      ? t && isNaN(parseInt(t, 10))
        ? (m.error("Invalid Sentry Dsn: Invalid port ".concat(t)), !1)
        : !0
      : (m.error("Invalid Sentry Dsn: Invalid protocol ".concat(r)), !1)
    : (m.error("Invalid Sentry Dsn: Invalid projectId ".concat(n)), !1);
}
function Si(e) {
  const t = typeof e == "string" ? _i(e) : ws(e);
  if (!(!t || !yi(t))) return t;
}
function Ei() {
  const e = typeof WeakSet == "function",
    t = e ? new WeakSet() : [];
  function n(s) {
    if (e) return t.has(s) ? !0 : (t.add(s), !1);
    for (let o = 0; o < t.length; o++) if (t[o] === s) return !0;
    return t.push(s), !1;
  }
  function r(s) {
    if (e) t.delete(s);
    else
      for (let o = 0; o < t.length; o++)
        if (t[o] === s) {
          t.splice(o, 1);
          break;
        }
  }
  return [n, r];
}
function le(e, t = 100, n = 1 / 0) {
  try {
    return hn("", e, t, n);
  } catch (r) {
    return { ERROR: "**non-serializable** (".concat(r, ")") };
  }
}
function vs(e, t = 3, n = 100 * 1024) {
  const r = le(e, t);
  return vi(r) > n ? vs(e, t - 1, n) : r;
}
function hn(e, t, n = 1 / 0, r = 1 / 0, s = Ei()) {
  const [o, i] = s;
  if (
    t == null ||
    ["boolean", "string"].includes(typeof t) ||
    (typeof t == "number" && Number.isFinite(t))
  )
    return t;
  const a = bi(e, t);
  if (!a.startsWith("[object ")) return a;
  if (t.__sentry_skip_normalization__) return t;
  const c =
    typeof t.__sentry_override_normalization_depth__ == "number"
      ? t.__sentry_override_normalization_depth__
      : n;
  if (c === 0) return a.replace("object ", "");
  if (o(t)) return "[Circular ~]";
  const u = t;
  if (u && typeof u.toJSON == "function")
    try {
      const p = u.toJSON();
      return hn("", p, c - 1, r, s);
    } catch (p) {}
  const l = Array.isArray(t) ? [] : {};
  let d = 0;
  const f = rs(t);
  for (const p in f) {
    if (!Object.prototype.hasOwnProperty.call(f, p)) continue;
    if (d >= r) {
      l[p] = "[MaxProperties ~]";
      break;
    }
    const h = f[p];
    (l[p] = hn(p, h, c - 1, r, s)), d++;
  }
  return i(t), l;
}
function bi(e, t) {
  try {
    if (e === "domain" && t && typeof t == "object" && t._events)
      return "[Domain]";
    if (e === "domainEmitter") return "[DomainEmitter]";
    if (typeof global < "u" && t === global) return "[Global]";
    if (typeof window < "u" && t === window) return "[Window]";
    if (typeof document < "u" && t === document) return "[Document]";
    if (es(t)) return "[VueViewModel]";
    if (wo(t)) return "[SyntheticEvent]";
    if (typeof t == "number" && !Number.isFinite(t)) return "[".concat(t, "]");
    if (typeof t == "function") return "[Function: ".concat(ie(t), "]");
    if (typeof t == "symbol") return "[".concat(String(t), "]");
    if (typeof t == "bigint") return "[BigInt: ".concat(String(t), "]");
    const n = Ti(t);
    return /^HTML(\w*)Element$/.test(n)
      ? "[HTMLElement: ".concat(n, "]")
      : "[object ".concat(n, "]");
  } catch (n) {
    return "**non-serializable** (".concat(n, ")");
  }
}
function Ti(e) {
  const t = Object.getPrototypeOf(e);
  return t ? t.constructor.name : "null prototype";
}
function wi(e) {
  return ~-encodeURI(e).split(/%..|./).length;
}
function vi(e) {
  return wi(JSON.stringify(e));
}
function Ve(e, t = []) {
  return [e, t];
}
function Ii(e, t) {
  const [n, r] = e;
  return [n, [...r, t]];
}
function hr(e, t) {
  const n = e[1];
  for (const r of n) {
    const s = r[0].type;
    if (t(r, s)) return !0;
  }
  return !1;
}
function gn(e) {
  return b.__SENTRY__ && b.__SENTRY__.encodePolyfill
    ? b.__SENTRY__.encodePolyfill(e)
    : new TextEncoder().encode(e);
}
function ki(e) {
  const [t, n] = e;
  let r = JSON.stringify(t);
  function s(o) {
    typeof r == "string"
      ? (r = typeof o == "string" ? r + o : [gn(r), o])
      : r.push(typeof o == "string" ? gn(o) : o);
  }
  for (const o of n) {
    const [i, a] = o;
    if (
      (s("\n".concat(JSON.stringify(i), "\n")),
      typeof a == "string" || a instanceof Uint8Array)
    )
      s(a);
    else {
      let c;
      try {
        c = JSON.stringify(a);
      } catch (u) {
        c = JSON.stringify(le(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : Ri(r);
}
function Ri(e) {
  const t = e.reduce((s, o) => s + o.length, 0),
    n = new Uint8Array(t);
  let r = 0;
  for (const s of e) n.set(s, r), (r += s.length);
  return n;
}
function Ai(e) {
  return [{ type: "span" }, e];
}
function Pi(e) {
  const t = typeof e.data == "string" ? gn(e.data) : e.data;
  return [
    F({
      type: "attachment",
      length: t.length,
      filename: e.filename,
      content_type: e.contentType,
      attachment_type: e.attachmentType,
    }),
    t,
  ];
}
const Ci = {
  session: "session",
  sessions: "session",
  attachment: "attachment",
  transaction: "transaction",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile: "profile",
  profile_chunk: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  feedback: "feedback",
  span: "span",
  statsd: "metric_bucket",
};
function gr(e) {
  return Ci[e];
}
function Is(e) {
  if (!e || !e.sdk) return;
  const { name: t, version: n } = e.sdk;
  return { name: t, version: n };
}
function Ni(e, t, n, r) {
  const s =
    e.sdkProcessingMetadata && e.sdkProcessingMetadata.dynamicSamplingContext;
  return {
    event_id: e.event_id,
    sent_at: new Date().toISOString(),
    ...(t && { sdk: t }),
    ...(!!n && r && { dsn: it(r) }),
    ...(s && { trace: F({ ...s }) }),
  };
}
function Oi(e, t) {
  return (
    t &&
      ((e.sdk = e.sdk || {}),
      (e.sdk.name = e.sdk.name || t.name),
      (e.sdk.version = e.sdk.version || t.version),
      (e.sdk.integrations = [
        ...(e.sdk.integrations || []),
        ...(t.integrations || []),
      ]),
      (e.sdk.packages = [...(e.sdk.packages || []), ...(t.packages || [])])),
    e
  );
}
function xi(e, t, n, r) {
  const s = Is(n),
    o = {
      sent_at: new Date().toISOString(),
      ...(s && { sdk: s }),
      ...(!!r && t && { dsn: it(t) }),
    },
    i =
      "aggregates" in e
        ? [{ type: "sessions" }, e]
        : [{ type: "session" }, e.toJSON()];
  return Ve(o, [i]);
}
function Di(e, t, n, r) {
  const s = Is(n),
    o = e.type && e.type !== "replay_event" ? e.type : "event";
  Oi(e, n && n.sdk);
  const i = Ni(e, s, r, t);
  return delete e.sdkProcessingMetadata, Ve(i, [[{ type: o }, e]]);
}
function Li(e, t) {
  function n(l) {
    return !!l.trace_id && !!l.public_key;
  }
  const r = Ge(e[0]),
    s = t && t.getDsn(),
    o = t && t.getOptions().tunnel,
    i = {
      sent_at: new Date().toISOString(),
      ...(n(r) && { trace: r }),
      ...(!!o && s && { dsn: it(s) }),
    },
    a = t && t.getOptions().beforeSendSpan,
    c = a
      ? (l) => {
          const d = a(T(l));
          return d || gs(), d;
        }
      : (l) => T(l),
    u = [];
  for (const l of e) {
    const d = c(l);
    d && u.push(Ai(d));
  }
  return Ve(i, u);
}
function Mi(e, t, n, r = H()) {
  const s = r && $(r);
  s &&
    (y &&
      m.log(
        "[Measurement] Setting measurement on root span: "
          .concat(e, " = ")
          .concat(t, " ")
          .concat(n)
      ),
    s.addEvent(e, { [zt]: t, [Vt]: n }));
}
function _r(e) {
  if (!e || e.length === 0) return;
  const t = {};
  return (
    e.forEach((n) => {
      const r = n.attributes || {},
        s = r[Vt],
        o = r[zt];
      typeof s == "string" &&
        typeof o == "number" &&
        (t[n.name] = { value: o, unit: s });
    }),
    t
  );
}
const yr = 1e3;
class Bn {
  constructor(t = {}) {
    (this._traceId = t.traceId || x()),
      (this._spanId = t.spanId || x().substring(16)),
      (this._startTime = t.startTimestamp || B()),
      (this._attributes = {}),
      this.setAttributes({ [D]: "manual", [Ie]: t.op, ...t.attributes }),
      (this._name = t.name),
      t.parentSpanId && (this._parentSpanId = t.parentSpanId),
      "sampled" in t && (this._sampled = t.sampled),
      t.endTimestamp && (this._endTime = t.endTimestamp),
      (this._events = []),
      (this._isStandaloneSpan = t.isStandalone),
      this._endTime && this._onSpanEnded();
  }
  addLink(t) {
    return this;
  }
  addLinks(t) {
    return this;
  }
  recordException(t, n) {}
  spanContext() {
    const { _spanId: t, _traceId: n, _sampled: r } = this;
    return { spanId: t, traceId: n, traceFlags: r ? ps : fs };
  }
  setAttribute(t, n) {
    return (
      n === void 0 ? delete this._attributes[t] : (this._attributes[t] = n),
      this
    );
  }
  setAttributes(t) {
    return Object.keys(t).forEach((n) => this.setAttribute(n, t[n])), this;
  }
  updateStartTime(t) {
    this._startTime = ye(t);
  }
  setStatus(t) {
    return (this._status = t), this;
  }
  updateName(t) {
    return (this._name = t), this.setAttribute(se, "custom"), this;
  }
  end(t) {
    this._endTime || ((this._endTime = ye(t)), pi(this), this._onSpanEnded());
  }
  getSpanJSON() {
    return F({
      data: this._attributes,
      description: this._name,
      op: this._attributes[Ie],
      parent_span_id: this._parentSpanId,
      span_id: this._spanId,
      start_timestamp: this._startTime,
      status: ms(this._status),
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[D],
      _metrics_summary: ln(this),
      profile_id: this._attributes[Vo],
      exclusive_time: this._attributes[$n],
      measurements: _r(this._events),
      is_segment: (this._isStandaloneSpan && $(this) === this) || void 0,
      segment_id: this._isStandaloneSpan
        ? $(this).spanContext().spanId
        : void 0,
    });
  }
  isRecording() {
    return !this._endTime && !!this._sampled;
  }
  addEvent(t, n, r) {
    y && m.log("[Tracing] Adding an event to span:", t);
    const s = Sr(n) ? n : r || B(),
      o = Sr(n) ? {} : n || {},
      i = { name: t, time: ye(s), attributes: o };
    return this._events.push(i), this;
  }
  isStandaloneSpan() {
    return !!this._isStandaloneSpan;
  }
  _onSpanEnded() {
    const t = w();
    if (
      (t && t.emit("spanEnd", this),
      !(this._isStandaloneSpan || this === $(this)))
    )
      return;
    if (this._isStandaloneSpan) {
      this._sampled
        ? $i(Li([this], t))
        : (y &&
            m.log(
              "[Tracing] Discarding standalone span because its trace was not chosen to be sampled."
            ),
          t && t.recordDroppedEvent("sample_rate", "span"));
      return;
    }
    const r = this._convertSpanToTransaction();
    r && (pr(this).scope || I()).captureEvent(r);
  }
  _convertSpanToTransaction() {
    if (!Er(T(this))) return;
    this._name ||
      (y &&
        m.warn(
          "Transaction has no name, falling back to `<unlabeled transaction>`."
        ),
      (this._name = "<unlabeled transaction>"));
    const { scope: t, isolationScope: n } = pr(this),
      s = (t || I()).getClient() || w();
    if (this._sampled !== !0) {
      y &&
        m.log(
          "[Tracing] Discarding transaction because its trace was not chosen to be sampled."
        ),
        s && s.recordDroppedEvent("sample_rate", "transaction");
      return;
    }
    const i = At(this)
        .filter((d) => d !== this && !Fi(d))
        .map((d) => T(d))
        .filter(Er),
      a = this._attributes[se],
      c = {
        contexts: { trace: ni(this) },
        spans:
          i.length > yr
            ? i
                .sort((d, f) => d.start_timestamp - f.start_timestamp)
                .slice(0, yr)
            : i,
        start_timestamp: this._startTime,
        timestamp: this._endTime,
        transaction: this._name,
        type: "transaction",
        sdkProcessingMetadata: {
          capturedSpanScope: t,
          capturedSpanIsolationScope: n,
          ...F({ dynamicSamplingContext: Ge(this) }),
        },
        _metrics_summary: ln(this),
        ...(a && { transaction_info: { source: a } }),
      },
      u = _r(this._events);
    return (
      u &&
        Object.keys(u).length &&
        (y &&
          m.log(
            "[Measurements] Adding measurements to transaction event",
            JSON.stringify(u, void 0, 2)
          ),
        (c.measurements = u)),
      c
    );
  }
}
function Sr(e) {
  return (e && typeof e == "number") || e instanceof Date || Array.isArray(e);
}
function Er(e) {
  return !!e.start_timestamp && !!e.timestamp && !!e.span_id && !!e.trace_id;
}
function Fi(e) {
  return e instanceof Bn && e.isStandaloneSpan();
}
function $i(e) {
  const t = w();
  if (!t) return;
  const n = e[1];
  if (!n || n.length === 0) {
    t.recordDroppedEvent("before_send", "span");
    return;
  }
  t.sendEnvelope(e);
}
const ks = "__SENTRY_SUPPRESS_TRACING__";
function Hi(e, t) {
  const n = Wn();
  if (n.startSpanManual) return n.startSpanManual(e, t);
  const r = As(e),
    { forceTransaction: s, parentSpan: o } = e;
  return Gt(e.scope, () =>
    Bi(o)(() => {
      const a = I(),
        c = Ps(a),
        l =
          e.onlyIfParent && !c
            ? new Ne()
            : Rs({
                parentSpan: c,
                spanArguments: r,
                forceTransaction: s,
                scope: a,
              });
      Ue(a, l);
      function d() {
        l.end();
      }
      return di(
        () => t(l, d),
        () => {
          const { status: f } = T(l);
          l.isRecording() &&
            (!f || f === "ok") &&
            l.setStatus({ code: O, message: "internal_error" });
        }
      );
    })
  );
}
function at(e) {
  const t = Wn();
  if (t.startInactiveSpan) return t.startInactiveSpan(e);
  const n = As(e),
    { forceTransaction: r, parentSpan: s } = e;
  return (
    e.scope
      ? (i) => Gt(e.scope, i)
      : s !== void 0
      ? (i) => jn(s, i)
      : (i) => i()
  )(() => {
    const i = I(),
      a = Ps(i);
    return e.onlyIfParent && !a
      ? new Ne()
      : Rs({ parentSpan: a, spanArguments: n, forceTransaction: r, scope: i });
  });
}
function jn(e, t) {
  const n = Wn();
  return n.withActiveSpan
    ? n.withActiveSpan(e, t)
    : Gt((r) => (Ue(r, e || void 0), t(r)));
}
function Rs({
  parentSpan: e,
  spanArguments: t,
  forceTransaction: n,
  scope: r,
}) {
  if (!fe()) return new Ne();
  const s = Pe();
  let o;
  if (e && !n) (o = Ui(e, r, t)), hs(e, o);
  else if (e) {
    const i = Ge(e),
      { traceId: a, spanId: c } = e.spanContext(),
      u = Ce(e);
    (o = br({ traceId: a, parentSpanId: c, ...t }, r, u)), mr(o, i);
  } else {
    const {
      traceId: i,
      dsc: a,
      parentSpanId: c,
      sampled: u,
    } = { ...s.getPropagationContext(), ...r.getPropagationContext() };
    (o = br({ traceId: i, parentSpanId: c, ...t }, r, u)), a && mr(o, a);
  }
  return fi(o), ui(o, r, s), o;
}
function As(e) {
  const n = { isStandalone: (e.experimental || {}).standalone, ...e };
  if (e.startTime) {
    const r = { ...n };
    return (r.startTimestamp = ye(e.startTime)), delete r.startTime, r;
  }
  return n;
}
function Wn() {
  const e = Ae();
  return qe(e);
}
function br(e, t, n) {
  const r = w(),
    s = (r && r.getOptions()) || {},
    { name: o = "", attributes: i } = e,
    [a, c] = t.getScopeData().sdkProcessingMetadata[ks]
      ? [!1]
      : mi(s, {
          name: o,
          parentSampled: n,
          attributes: i,
          transactionContext: { name: o, parentSampled: n },
        }),
    u = new Bn({
      ...e,
      attributes: { [se]: "custom", ...e.attributes },
      sampled: a,
    });
  return c !== void 0 && u.setAttribute(is, c), r && r.emit("spanStart", u), u;
}
function Ui(e, t, n) {
  const { spanId: r, traceId: s } = e.spanContext(),
    o = t.getScopeData().sdkProcessingMetadata[ks] ? !1 : Ce(e),
    i = o
      ? new Bn({ ...n, parentSpanId: r, traceId: s, sampled: o })
      : new Ne({ traceId: s });
  hs(e, i);
  const a = w();
  return (
    a && (a.emit("spanStart", i), n.endTimestamp && a.emit("spanEnd", i)), i
  );
}
function Ps(e) {
  const t = Mt(e);
  if (!t) return;
  const n = w();
  return (n ? n.getOptions() : {}).parentSpanIsAlwaysRootSpan ? $(t) : t;
}
function Bi(e) {
  return e !== void 0 ? (t) => jn(e, t) : (t) => t();
}
const Pt = { idleTimeout: 1e3, finalTimeout: 3e4, childSpanTimeout: 15e3 },
  ji = "heartbeatFailed",
  Wi = "idleTimeout",
  qi = "finalTimeout",
  Gi = "externalFinish";
function Cs(e, t = {}) {
  const n = new Map();
  let r = !1,
    s,
    o = Gi,
    i = !t.disableAutoFinish;
  const a = [],
    {
      idleTimeout: c = Pt.idleTimeout,
      finalTimeout: u = Pt.finalTimeout,
      childSpanTimeout: l = Pt.childSpanTimeout,
      beforeSpanEnd: d,
    } = t,
    f = w();
  if (!f || !fe()) return new Ne();
  const p = I(),
    h = H(),
    _ = Vi(e);
  _.end = new Proxy(_.end, {
    apply(E, P, j) {
      d && d(_);
      const [A, ...N] = j,
        U = A || B(),
        R = ye(U),
        xe = At(_).filter((ue) => ue !== _);
      if (!xe.length) return k(R), Reflect.apply(E, P, [R, ...N]);
      const ft = xe.map((ue) => T(ue).timestamp).filter((ue) => !!ue),
        pt = ft.length ? Math.max(...ft) : void 0,
        De = T(_).start_timestamp,
        mt = Math.min(
          De ? De + u / 1e3 : 1 / 0,
          Math.max(De || -1 / 0, Math.min(R, pt || 1 / 0))
        );
      return k(mt), Reflect.apply(E, P, [mt, ...N]);
    },
  });
  function v() {
    s && (clearTimeout(s), (s = void 0));
  }
  function G(E) {
    v(),
      (s = setTimeout(() => {
        !r && n.size === 0 && i && ((o = Wi), _.end(E));
      }, c));
  }
  function V(E) {
    s = setTimeout(() => {
      !r && i && ((o = ji), _.end(E));
    }, l);
  }
  function L(E) {
    v(), n.set(E, !0);
    const P = B();
    V(P + l / 1e3);
  }
  function Z(E) {
    if ((n.has(E) && n.delete(E), n.size === 0)) {
      const P = B();
      G(P + c / 1e3);
    }
  }
  function k(E) {
    (r = !0), n.clear(), a.forEach((R) => R()), Ue(p, h);
    const P = T(_),
      { start_timestamp: j } = P;
    if (!j) return;
    (P.data || {})[fn] || _.setAttribute(fn, o),
      m.log('[Tracing] Idle span "'.concat(P.op, '" finished'));
    const N = At(_).filter((R) => R !== _);
    let U = 0;
    N.forEach((R) => {
      R.isRecording() &&
        (R.setStatus({ code: O, message: "cancelled" }),
        R.end(E),
        y &&
          m.log(
            "[Tracing] Cancelling span since span ended early",
            JSON.stringify(R, void 0, 2)
          ));
      const xe = T(R),
        { timestamp: ft = 0, start_timestamp: pt = 0 } = xe,
        De = pt <= E,
        mt = (u + c) / 1e3,
        ue = ft - pt <= mt;
      if (y) {
        const Zn = JSON.stringify(R, void 0, 2);
        De
          ? ue ||
            m.log(
              "[Tracing] Discarding span since it finished after idle span final timeout",
              Zn
            )
          : m.log(
              "[Tracing] Discarding span since it happened after idle span was finished",
              Zn
            );
      }
      (!ue || !De) && (ai(_, R), U++);
    }),
      U > 0 && _.setAttribute("sentry.idle_span_discarded_spans", U);
  }
  return (
    a.push(
      f.on("spanStart", (E) => {
        if (r || E === _ || T(E).timestamp) return;
        At(_).includes(E) && L(E.spanContext().spanId);
      })
    ),
    a.push(
      f.on("spanEnd", (E) => {
        r || Z(E.spanContext().spanId);
      })
    ),
    a.push(
      f.on("idleSpanEnableAutoFinish", (E) => {
        E === _ && ((i = !0), G(), n.size && V());
      })
    ),
    t.disableAutoFinish || G(),
    setTimeout(() => {
      r ||
        (_.setStatus({ code: O, message: "deadline_exceeded" }),
        (o = qi),
        _.end());
    }, u),
    _
  );
}
function Vi(e) {
  const t = at(e);
  return Ue(I(), t), y && m.log("[Tracing] Started span is an idle span"), t;
}
function _n(e, t, n, r = 0) {
  return new X((s, o) => {
    const i = e[r];
    if (t === null || typeof i != "function") s(t);
    else {
      const a = i({ ...t }, n);
      y &&
        i.id &&
        a === null &&
        m.log('Event processor "'.concat(i.id, '" dropped event')),
        st(a)
          ? a.then((c) => _n(e, c, n, r + 1).then(s)).then(null, o)
          : _n(e, a, n, r + 1)
              .then(s)
              .then(null, o);
    }
  });
}
let yt, Tr, St;
function zi(e) {
  const t = b._sentryDebugIds;
  if (!t) return {};
  const n = Object.keys(t);
  return (
    (St && n.length === Tr) ||
      ((Tr = n.length),
      (St = n.reduce((r, s) => {
        yt || (yt = {});
        const o = yt[s];
        if (o) r[o[0]] = o[1];
        else {
          const i = e(s);
          for (let a = i.length - 1; a >= 0; a--) {
            const c = i[a],
              u = c && c.filename,
              l = t[s];
            if (u && l) {
              (r[u] = l), (yt[s] = [u, l]);
              break;
            }
          }
        }
        return r;
      }, {}))),
    St
  );
}
function Yi(e, t) {
  const {
    fingerprint: n,
    span: r,
    breadcrumbs: s,
    sdkProcessingMetadata: o,
  } = t;
  Xi(e, t), r && Zi(e, r), Qi(e, n), Ki(e, s), Ji(e, o);
}
function wr(e, t) {
  const {
    extra: n,
    tags: r,
    user: s,
    contexts: o,
    level: i,
    sdkProcessingMetadata: a,
    breadcrumbs: c,
    fingerprint: u,
    eventProcessors: l,
    attachments: d,
    propagationContext: f,
    transactionName: p,
    span: h,
  } = t;
  Et(e, "extra", n),
    Et(e, "tags", r),
    Et(e, "user", s),
    Et(e, "contexts", o),
    (e.sdkProcessingMetadata = qt(e.sdkProcessingMetadata, a, 2)),
    i && (e.level = i),
    p && (e.transactionName = p),
    h && (e.span = h),
    c.length && (e.breadcrumbs = [...e.breadcrumbs, ...c]),
    u.length && (e.fingerprint = [...e.fingerprint, ...u]),
    l.length && (e.eventProcessors = [...e.eventProcessors, ...l]),
    d.length && (e.attachments = [...e.attachments, ...d]),
    (e.propagationContext = { ...e.propagationContext, ...f });
}
function Et(e, t, n) {
  e[t] = qt(e[t], n, 1);
}
function Xi(e, t) {
  const {
      extra: n,
      tags: r,
      user: s,
      contexts: o,
      level: i,
      transactionName: a,
    } = t,
    c = F(n);
  c && Object.keys(c).length && (e.extra = { ...c, ...e.extra });
  const u = F(r);
  u && Object.keys(u).length && (e.tags = { ...u, ...e.tags });
  const l = F(s);
  l && Object.keys(l).length && (e.user = { ...l, ...e.user });
  const d = F(o);
  d && Object.keys(d).length && (e.contexts = { ...d, ...e.contexts }),
    i && (e.level = i),
    a && e.type !== "transaction" && (e.transaction = a);
}
function Ki(e, t) {
  const n = [...(e.breadcrumbs || []), ...t];
  e.breadcrumbs = n.length ? n : void 0;
}
function Ji(e, t) {
  e.sdkProcessingMetadata = { ...e.sdkProcessingMetadata, ...t };
}
function Zi(e, t) {
  (e.contexts = { trace: ri(t), ...e.contexts }),
    (e.sdkProcessingMetadata = {
      dynamicSamplingContext: Ge(t),
      ...e.sdkProcessingMetadata,
    });
  const n = $(t),
    r = T(n).description;
  r && !e.transaction && e.type === "transaction" && (e.transaction = r);
}
function Qi(e, t) {
  (e.fingerprint = e.fingerprint
    ? Array.isArray(e.fingerprint)
      ? e.fingerprint
      : [e.fingerprint]
    : []),
    t && (e.fingerprint = e.fingerprint.concat(t)),
    e.fingerprint && !e.fingerprint.length && delete e.fingerprint;
}
function ea(e, t, n, r, s, o) {
  const { normalizeDepth: i = 3, normalizeMaxBreadth: a = 1e3 } = e,
    c = {
      ...t,
      event_id: t.event_id || n.event_id || x(),
      timestamp: t.timestamp || ot(),
    },
    u = n.integrations || e.integrations.map((v) => v.name);
  ta(c, e),
    sa(c, u),
    s && s.emit("applyFrameMetadata", t),
    t.type === void 0 && na(c, e.stackParser);
  const l = ia(r, n.captureContext);
  n.mechanism && tt(c, n.mechanism);
  const d = s ? s.getEventProcessors() : [],
    f = Wo().getScopeData();
  if (o) {
    const v = o.getScopeData();
    wr(f, v);
  }
  if (l) {
    const v = l.getScopeData();
    wr(f, v);
  }
  const p = [...(n.attachments || []), ...f.attachments];
  p.length && (n.attachments = p), Yi(c, f);
  const h = [...d, ...f.eventProcessors];
  return _n(h, c, n).then(
    (v) => (v && ra(v), typeof i == "number" && i > 0 ? oa(v, i, a) : v)
  );
}
function ta(e, t) {
  const { environment: n, release: r, dist: s, maxValueLength: o = 250 } = t;
  (e.environment = e.environment || n || Un),
    !e.release && r && (e.release = r),
    !e.dist && s && (e.dist = s),
    e.message && (e.message = Fe(e.message, o));
  const i = e.exception && e.exception.values && e.exception.values[0];
  i && i.value && (i.value = Fe(i.value, o));
  const a = e.request;
  a && a.url && (a.url = Fe(a.url, o));
}
function na(e, t) {
  const n = zi(t);
  try {
    e.exception.values.forEach((r) => {
      r.stacktrace.frames.forEach((s) => {
        n && s.filename && (s.debug_id = n[s.filename]);
      });
    });
  } catch (r) {}
}
function ra(e) {
  const t = {};
  try {
    e.exception.values.forEach((r) => {
      r.stacktrace.frames.forEach((s) => {
        s.debug_id &&
          (s.abs_path
            ? (t[s.abs_path] = s.debug_id)
            : s.filename && (t[s.filename] = s.debug_id),
          delete s.debug_id);
      });
    });
  } catch (r) {}
  if (Object.keys(t).length === 0) return;
  (e.debug_meta = e.debug_meta || {}),
    (e.debug_meta.images = e.debug_meta.images || []);
  const n = e.debug_meta.images;
  Object.entries(t).forEach(([r, s]) => {
    n.push({ type: "sourcemap", code_file: r, debug_id: s });
  });
}
function sa(e, t) {
  t.length > 0 &&
    ((e.sdk = e.sdk || {}),
    (e.sdk.integrations = [...(e.sdk.integrations || []), ...t]));
}
function oa(e, t, n) {
  if (!e) return null;
  const r = {
    ...e,
    ...(e.breadcrumbs && {
      breadcrumbs: e.breadcrumbs.map((s) => ({
        ...s,
        ...(s.data && { data: le(s.data, t, n) }),
      })),
    }),
    ...(e.user && { user: le(e.user, t, n) }),
    ...(e.contexts && { contexts: le(e.contexts, t, n) }),
    ...(e.extra && { extra: le(e.extra, t, n) }),
  };
  return (
    e.contexts &&
      e.contexts.trace &&
      r.contexts &&
      ((r.contexts.trace = e.contexts.trace),
      e.contexts.trace.data &&
        (r.contexts.trace.data = le(e.contexts.trace.data, t, n))),
    e.spans &&
      (r.spans = e.spans.map((s) => ({
        ...s,
        ...(s.data && { data: le(s.data, t, n) }),
      }))),
    r
  );
}
function ia(e, t) {
  if (!t) return e;
  const n = e ? e.clone() : new ve();
  return n.update(t), n;
}
function Ft(e, t) {
  return I().captureException(e, void 0);
}
function Ns(e, t) {
  return I().captureEvent(e, t);
}
async function aa(e) {
  const t = w();
  return t
    ? t.flush(e)
    : (y && m.warn("Cannot flush events. No client defined."),
      Promise.resolve(!1));
}
function ca() {
  const e = w();
  return !!e && e.getOptions().enabled !== !1 && !!e.getTransport();
}
function vr(e) {
  const t = w(),
    n = Pe(),
    r = I(),
    { release: s, environment: o = Un } = (t && t.getOptions()) || {},
    { userAgent: i } = b.navigator || {},
    a = xo({
      release: s,
      environment: o,
      user: r.getUser() || n.getUser(),
      ...(i && { userAgent: i }),
      ...e,
    }),
    c = n.getSession();
  return (
    c && c.status === "ok" && He(c, { status: "exited" }),
    Os(),
    n.setSession(a),
    r.setSession(a),
    a
  );
}
function Os() {
  const e = Pe(),
    t = I(),
    n = t.getSession() || e.getSession();
  n && Do(n), xs(), e.setSession(), t.setSession();
}
function xs() {
  const e = Pe(),
    t = I(),
    n = w(),
    r = t.getSession() || e.getSession();
  r && n && n.captureSession(r);
}
function Ir(e = !1) {
  if (e) {
    Os();
    return;
  }
  xs();
}
const ua = "7";
function da(e) {
  const t = e.protocol ? "".concat(e.protocol, ":") : "",
    n = e.port ? ":".concat(e.port) : "";
  return ""
    .concat(t, "//")
    .concat(e.host)
    .concat(n)
    .concat(e.path ? "/".concat(e.path) : "", "/api/");
}
function la(e) {
  return "".concat(da(e)).concat(e.projectId, "/envelope/");
}
function fa(e, t) {
  const n = { sentry_version: ua };
  return (
    e.publicKey && (n.sentry_key = e.publicKey),
    t && (n.sentry_client = "".concat(t.name, "/").concat(t.version)),
    new URLSearchParams(n).toString()
  );
}
function pa(e, t, n) {
  return t || "".concat(la(e), "?").concat(fa(e, n));
}
const kr = [];
function ma(e) {
  const t = {};
  return (
    e.forEach((n) => {
      const { name: r } = n,
        s = t[r];
      (s && !s.isDefaultInstance && n.isDefaultInstance) || (t[r] = n);
    }),
    Object.values(t)
  );
}
function ha(e) {
  const t = e.defaultIntegrations || [],
    n = e.integrations;
  t.forEach((i) => {
    i.isDefaultInstance = !0;
  });
  let r;
  if (Array.isArray(n)) r = [...t, ...n];
  else if (typeof n == "function") {
    const i = n(t);
    r = Array.isArray(i) ? i : [i];
  } else r = t;
  const s = ma(r),
    o = s.findIndex((i) => i.name === "Debug");
  if (o > -1) {
    const [i] = s.splice(o, 1);
    s.push(i);
  }
  return s;
}
function ga(e, t) {
  const n = {};
  return (
    t.forEach((r) => {
      r && Ds(e, r, n);
    }),
    n
  );
}
function Rr(e, t) {
  for (const n of t) n && n.afterAllSetup && n.afterAllSetup(e);
}
function Ds(e, t, n) {
  if (n[t.name]) {
    y &&
      m.log(
        "Integration skipped because it was already installed: ".concat(t.name)
      );
    return;
  }
  if (
    ((n[t.name] = t),
    kr.indexOf(t.name) === -1 &&
      typeof t.setupOnce == "function" &&
      (t.setupOnce(), kr.push(t.name)),
    t.setup && typeof t.setup == "function" && t.setup(e),
    typeof t.preprocessEvent == "function")
  ) {
    const r = t.preprocessEvent.bind(t);
    e.on("preprocessEvent", (s, o) => r(s, o, e));
  }
  if (typeof t.processEvent == "function") {
    const r = t.processEvent.bind(t),
      s = Object.assign((o, i) => r(o, i, e), { id: t.name });
    e.addEventProcessor(s);
  }
  y && m.log("Integration installed: ".concat(t.name));
}
function _a(e, t, n) {
  const r = [
    { type: "client_report" },
    { timestamp: ot(), discarded_events: e },
  ];
  return Ve(t ? { dsn: t } : {}, [r]);
}
class ee extends Error {
  constructor(t, n = "warn") {
    super(t),
      (this.message = t),
      (this.name = new.target.prototype.constructor.name),
      Object.setPrototypeOf(this, new.target.prototype),
      (this.logLevel = n);
  }
}
const Ar = "Not capturing exception because it's already been captured.";
class ya {
  constructor(t) {
    if (
      ((this._options = t),
      (this._integrations = {}),
      (this._numProcessing = 0),
      (this._outcomes = {}),
      (this._hooks = {}),
      (this._eventProcessors = []),
      t.dsn
        ? (this._dsn = Si(t.dsn))
        : y && m.warn("No DSN provided, client will not send events."),
      this._dsn)
    ) {
      const s = pa(this._dsn, t.tunnel, t._metadata ? t._metadata.sdk : void 0);
      this._transport = t.transport({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...t.transportOptions,
        url: s,
      });
    }
    const r = ["enableTracing", "tracesSampleRate", "tracesSampler"].find(
      (s) => s in t && t[s] == null
    );
    r &&
      Re(() => {
        console.warn(
          "[Sentry] Deprecation warning: `".concat(
            r,
            "` is set to undefined, which leads to tracing being enabled. In v9, a value of `undefined` will result in tracing being disabled."
          )
        );
      });
  }
  captureException(t, n, r) {
    const s = x();
    if (ar(t)) return y && m.log(Ar), s;
    const o = { event_id: s, ...n };
    return (
      this._process(
        this.eventFromException(t, o).then((i) => this._captureEvent(i, o, r))
      ),
      o.event_id
    );
  }
  captureMessage(t, n, r, s) {
    const o = { event_id: x(), ...r },
      i = Dn(t) ? t : String(t),
      a = Ln(t)
        ? this.eventFromMessage(i, n, o)
        : this.eventFromException(t, o);
    return (
      this._process(a.then((c) => this._captureEvent(c, o, s))), o.event_id
    );
  }
  captureEvent(t, n, r) {
    const s = x();
    if (n && n.originalException && ar(n.originalException))
      return y && m.log(Ar), s;
    const o = { event_id: s, ...n },
      a = (t.sdkProcessingMetadata || {}).capturedSpanScope;
    return this._process(this._captureEvent(t, o, a || r)), o.event_id;
  }
  captureSession(t) {
    typeof t.release != "string"
      ? y &&
        m.warn("Discarded session because of missing or non-string release")
      : (this.sendSession(t), He(t, { init: !1 }));
  }
  getDsn() {
    return this._dsn;
  }
  getOptions() {
    return this._options;
  }
  getSdkMetadata() {
    return this._options._metadata;
  }
  getTransport() {
    return this._transport;
  }
  flush(t) {
    const n = this._transport;
    return n
      ? (this.emit("flush"),
        this._isClientDoneProcessing(t).then((r) =>
          n.flush(t).then((s) => r && s)
        ))
      : we(!0);
  }
  close(t) {
    return this.flush(t).then(
      (n) => ((this.getOptions().enabled = !1), this.emit("close"), n)
    );
  }
  getEventProcessors() {
    return this._eventProcessors;
  }
  addEventProcessor(t) {
    this._eventProcessors.push(t);
  }
  init() {
    (this._isEnabled() ||
      this._options.integrations.some(({ name: t }) =>
        t.startsWith("Spotlight")
      )) &&
      this._setupIntegrations();
  }
  getIntegrationByName(t) {
    return this._integrations[t];
  }
  addIntegration(t) {
    const n = this._integrations[t.name];
    Ds(this, t, this._integrations), n || Rr(this, [t]);
  }
  sendEvent(t, n = {}) {
    this.emit("beforeSendEvent", t, n);
    let r = Di(t, this._dsn, this._options._metadata, this._options.tunnel);
    for (const o of n.attachments || []) r = Ii(r, Pi(o));
    const s = this.sendEnvelope(r);
    s && s.then((o) => this.emit("afterSendEvent", t, o), null);
  }
  sendSession(t) {
    const n = xi(t, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(n);
  }
  recordDroppedEvent(t, n, r) {
    if (this._options.sendClientReports) {
      const s = typeof r == "number" ? r : 1,
        o = "".concat(t, ":").concat(n);
      y &&
        m.log(
          'Recording outcome: "'
            .concat(o, '"')
            .concat(s > 1 ? " (".concat(s, " times)") : "")
        ),
        (this._outcomes[o] = (this._outcomes[o] || 0) + s);
    }
  }
  on(t, n) {
    const r = (this._hooks[t] = this._hooks[t] || []);
    return (
      r.push(n),
      () => {
        const s = r.indexOf(n);
        s > -1 && r.splice(s, 1);
      }
    );
  }
  emit(t, ...n) {
    const r = this._hooks[t];
    r && r.forEach((s) => s(...n));
  }
  sendEnvelope(t) {
    return (
      this.emit("beforeEnvelope", t),
      this._isEnabled() && this._transport
        ? this._transport
            .send(t)
            .then(
              null,
              (n) => (y && m.error("Error while sending envelope:", n), n)
            )
        : (y && m.error("Transport disabled"), we({}))
    );
  }
  _setupIntegrations() {
    const { integrations: t } = this._options;
    (this._integrations = ga(this, t)), Rr(this, t);
  }
  _updateSessionFromEvent(t, n) {
    let r = !1,
      s = !1;
    const o = n.exception && n.exception.values;
    if (o) {
      s = !0;
      for (const c of o) {
        const u = c.mechanism;
        if (u && u.handled === !1) {
          r = !0;
          break;
        }
      }
    }
    const i = t.status === "ok";
    ((i && t.errors === 0) || (i && r)) &&
      (He(t, {
        ...(r && { status: "crashed" }),
        errors: t.errors || Number(s || r),
      }),
      this.captureSession(t));
  }
  _isClientDoneProcessing(t) {
    return new X((n) => {
      let r = 0;
      const s = 1,
        o = setInterval(() => {
          this._numProcessing == 0
            ? (clearInterval(o), n(!0))
            : ((r += s), t && r >= t && (clearInterval(o), n(!1)));
        }, s);
    });
  }
  _isEnabled() {
    return this.getOptions().enabled !== !1 && this._transport !== void 0;
  }
  _prepareEvent(t, n, r = I(), s = Pe()) {
    const o = this.getOptions(),
      i = Object.keys(this._integrations);
    return (
      !n.integrations && i.length > 0 && (n.integrations = i),
      this.emit("preprocessEvent", t, n),
      t.type || s.setLastEventId(t.event_id || n.event_id),
      ea(o, t, n, r, this, s).then((a) => {
        if (a === null) return a;
        a.contexts = { trace: qo(r), ...a.contexts };
        const c = bs(this, r);
        return (
          (a.sdkProcessingMetadata = {
            dynamicSamplingContext: c,
            ...a.sdkProcessingMetadata,
          }),
          a
        );
      })
    );
  }
  _captureEvent(t, n = {}, r) {
    return this._processEvent(t, n, r).then(
      (s) => s.event_id,
      (s) => {
        if (y) {
          const o = s;
          o.logLevel === "log" ? m.log(o.message) : m.warn(o);
        }
      }
    );
  }
  _processEvent(t, n, r) {
    const s = this.getOptions(),
      { sampleRate: o } = s,
      i = Ms(t),
      a = Ls(t),
      c = t.type || "error",
      u = "before send for type `".concat(c, "`"),
      l = typeof o > "u" ? void 0 : Ts(o);
    if (a && typeof l == "number" && Math.random() > l)
      return (
        this.recordDroppedEvent("sample_rate", "error", t),
        Dt(
          new ee(
            "Discarding event because it's not included in the random sample (sampling rate = ".concat(
              o,
              ")"
            ),
            "log"
          )
        )
      );
    const d = c === "replay_event" ? "replay" : c,
      p = (t.sdkProcessingMetadata || {}).capturedSpanIsolationScope;
    return this._prepareEvent(t, n, r, p)
      .then((h) => {
        if (h === null)
          throw (
            (this.recordDroppedEvent("event_processor", d, t),
            new ee(
              "An event processor returned `null`, will not send event.",
              "log"
            ))
          );
        if (n.data && n.data.__sentry__ === !0) return h;
        const v = Ea(this, s, h, n);
        return Sa(v, u);
      })
      .then((h) => {
        if (h === null) {
          if ((this.recordDroppedEvent("before_send", d, t), i)) {
            const V = 1 + (t.spans || []).length;
            this.recordDroppedEvent("before_send", "span", V);
          }
          throw new ee(
            "".concat(u, " returned `null`, will not send event."),
            "log"
          );
        }
        const _ = r && r.getSession();
        if ((!i && _ && this._updateSessionFromEvent(_, h), i)) {
          const G =
              (h.sdkProcessingMetadata &&
                h.sdkProcessingMetadata.spanCountBeforeProcessing) ||
              0,
            V = h.spans ? h.spans.length : 0,
            L = G - V;
          L > 0 && this.recordDroppedEvent("before_send", "span", L);
        }
        const v = h.transaction_info;
        if (i && v && h.transaction !== t.transaction) {
          const G = "custom";
          h.transaction_info = { ...v, source: G };
        }
        return this.sendEvent(h, n), h;
      })
      .then(null, (h) => {
        throw h instanceof ee
          ? h
          : (this.captureException(h, {
              data: { __sentry__: !0 },
              originalException: h,
            }),
            new ee(
              "Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ".concat(
                h
              )
            ));
      });
  }
  _process(t) {
    this._numProcessing++,
      t.then(
        (n) => (this._numProcessing--, n),
        (n) => (this._numProcessing--, n)
      );
  }
  _clearOutcomes() {
    const t = this._outcomes;
    return (
      (this._outcomes = {}),
      Object.entries(t).map(([n, r]) => {
        const [s, o] = n.split(":");
        return { reason: s, category: o, quantity: r };
      })
    );
  }
  _flushOutcomes() {
    y && m.log("Flushing outcomes...");
    const t = this._clearOutcomes();
    if (t.length === 0) {
      y && m.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      y && m.log("No dsn provided, will not send outcomes");
      return;
    }
    y && m.log("Sending outcomes:", t);
    const n = _a(t, this._options.tunnel && it(this._dsn));
    this.sendEnvelope(n);
  }
}
function Sa(e, t) {
  const n = "".concat(t, " must return `null` or a valid event.");
  if (st(e))
    return e.then(
      (r) => {
        if (!$e(r) && r !== null) throw new ee(n);
        return r;
      },
      (r) => {
        throw new ee("".concat(t, " rejected with ").concat(r));
      }
    );
  if (!$e(e) && e !== null) throw new ee(n);
  return e;
}
function Ea(e, t, n, r) {
  const { beforeSend: s, beforeSendTransaction: o, beforeSendSpan: i } = t;
  if (Ls(n) && s) return s(n, r);
  if (Ms(n)) {
    if (n.spans && i) {
      const a = [];
      for (const c of n.spans) {
        const u = i(c);
        u ? a.push(u) : (gs(), e.recordDroppedEvent("before_send", "span"));
      }
      n.spans = a;
    }
    if (o) {
      if (n.spans) {
        const a = n.spans.length;
        n.sdkProcessingMetadata = {
          ...n.sdkProcessingMetadata,
          spanCountBeforeProcessing: a,
        };
      }
      return o(n, r);
    }
  }
  return n;
}
function Ls(e) {
  return e.type === void 0;
}
function Ms(e) {
  return e.type === "transaction";
}
function ba(e, t) {
  t.debug === !0 &&
    (y
      ? m.enable()
      : Re(() => {
          console.warn(
            "[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."
          );
        })),
    I().update(t.initialScope);
  const r = new e(t);
  return Ta(r), r.init(), r;
}
function Ta(e) {
  I().setClient(e);
}
function wa(e) {
  const t = [];
  function n() {
    return e === void 0 || t.length < e;
  }
  function r(i) {
    return t.splice(t.indexOf(i), 1)[0] || Promise.resolve(void 0);
  }
  function s(i) {
    if (!n())
      return Dt(new ee("Not adding Promise because buffer limit was reached."));
    const a = i();
    return (
      t.indexOf(a) === -1 && t.push(a),
      a.then(() => r(a)).then(null, () => r(a).then(null, () => {})),
      a
    );
  }
  function o(i) {
    return new X((a, c) => {
      let u = t.length;
      if (!u) return a(!0);
      const l = setTimeout(() => {
        i && i > 0 && a(!1);
      }, i);
      t.forEach((d) => {
        we(d).then(() => {
          --u || (clearTimeout(l), a(!0));
        }, c);
      });
    });
  }
  return { $: t, add: s, drain: o };
}
const va = 60 * 1e3;
function Ia(e, t = Date.now()) {
  const n = parseInt("".concat(e), 10);
  if (!isNaN(n)) return n * 1e3;
  const r = Date.parse("".concat(e));
  return isNaN(r) ? va : r - t;
}
function ka(e, t) {
  return e[t] || e.all || 0;
}
function Ra(e, t, n = Date.now()) {
  return ka(e, t) > n;
}
function Aa(e, { statusCode: t, headers: n }, r = Date.now()) {
  const s = { ...e },
    o = n && n["x-sentry-rate-limits"],
    i = n && n["retry-after"];
  if (o)
    for (const a of o.trim().split(",")) {
      const [c, u, , , l] = a.split(":", 5),
        d = parseInt(c, 10),
        f = (isNaN(d) ? 60 : d) * 1e3;
      if (!u) s.all = r + f;
      else
        for (const p of u.split(";"))
          p === "metric_bucket"
            ? (!l || l.split(";").includes("custom")) && (s[p] = r + f)
            : (s[p] = r + f);
    }
  else i ? (s.all = r + Ia(i, r)) : t === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const Pa = 64;
function Ca(e, t, n = wa(e.bufferSize || Pa)) {
  let r = {};
  const s = (i) => n.drain(i);
  function o(i) {
    const a = [];
    if (
      (hr(i, (d, f) => {
        const p = gr(f);
        if (Ra(r, p)) {
          const h = Pr(d, f);
          e.recordDroppedEvent("ratelimit_backoff", p, h);
        } else a.push(d);
      }),
      a.length === 0)
    )
      return we({});
    const c = Ve(i[0], a),
      u = (d) => {
        hr(c, (f, p) => {
          const h = Pr(f, p);
          e.recordDroppedEvent(d, gr(p), h);
        });
      },
      l = () =>
        t({ body: ki(c) }).then(
          (d) => (
            d.statusCode !== void 0 &&
              (d.statusCode < 200 || d.statusCode >= 300) &&
              y &&
              m.warn(
                "Sentry responded with status code ".concat(
                  d.statusCode,
                  " to sent event."
                )
              ),
            (r = Aa(r, d)),
            d
          ),
          (d) => {
            throw (u("network_error"), d);
          }
        );
    return n.add(l).then(
      (d) => d,
      (d) => {
        if (d instanceof ee)
          return (
            y && m.error("Skipped sending event because buffer is full."),
            u("queue_overflow"),
            we({})
          );
        throw d;
      }
    );
  }
  return { send: o, flush: s };
}
function Pr(e, t) {
  if (!(t !== "event" && t !== "transaction"))
    return Array.isArray(e) ? e[1] : void 0;
}
function Na(e, t, n = [t], r = "npm") {
  const s = e._metadata || {};
  s.sdk ||
    (s.sdk = {
      name: "sentry.javascript.".concat(t),
      packages: n.map((o) => ({
        name: "".concat(r, ":@sentry/").concat(o),
        version: ge,
      })),
      version: ge,
    }),
    (e._metadata = s);
}
function Fs(e = {}) {
  const t = w();
  if (!ca() || !t) return {};
  const n = Ae(),
    r = qe(n);
  if (r.getTraceData) return r.getTraceData(e);
  const s = I(),
    o = e.span || H(),
    i = o ? si(o) : Oa(s),
    a = o ? Ge(o) : bs(t, s),
    c = Jo(a);
  return ds.test(i)
    ? { "sentry-trace": i, baggage: c }
    : (m.warn("Invalid sentry-trace data. Cannot generate trace data"), {});
}
function Oa(e) {
  const { traceId: t, sampled: n, spanId: r } = e.getPropagationContext();
  return ls(t, r, n);
}
const xa = 100;
function ke(e, t) {
  const n = w(),
    r = Pe();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: o = xa } = n.getOptions();
  if (o <= 0) return;
  const a = { timestamp: ot(), ...e },
    c = s ? Re(() => s(a, t)) : a;
  c !== null &&
    (n.emit && n.emit("beforeAddBreadcrumb", c, t), r.addBreadcrumb(c, o));
}
let Cr;
const Da = "FunctionToString",
  Nr = new WeakMap(),
  La = () => ({
    name: Da,
    setupOnce() {
      Cr = Function.prototype.toString;
      try {
        Function.prototype.toString = function (...e) {
          const t = Mn(this),
            n = Nr.has(w()) && t !== void 0 ? t : this;
          return Cr.apply(n, e);
        };
      } catch (e) {}
    },
    setup(e) {
      Nr.set(e, !0);
    },
  }),
  Ma = La,
  Fa = [
    /^Script error\.?$/,
    /^Javascript error: Script error\.? on line 0$/,
    /^ResizeObserver loop completed with undelivered notifications.$/,
    /^Cannot redefine property: googletag$/,
    "undefined is not an object (evaluating 'a.L')",
    'can\'t redefine non-configurable property "solana"',
    "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)",
    "Can't find variable: _AutofillCallbackHandler",
  ],
  $a = "InboundFilters",
  Ha = (e = {}) => ({
    name: $a,
    processEvent(t, n, r) {
      const s = r.getOptions(),
        o = Ba(e, s);
      return ja(t, o) ? null : t;
    },
  }),
  Ua = Ha;
function Ba(e = {}, t = {}) {
  return {
    allowUrls: [...(e.allowUrls || []), ...(t.allowUrls || [])],
    denyUrls: [...(e.denyUrls || []), ...(t.denyUrls || [])],
    ignoreErrors: [
      ...(e.ignoreErrors || []),
      ...(t.ignoreErrors || []),
      ...(e.disableErrorDefaults ? [] : Fa),
    ],
    ignoreTransactions: [
      ...(e.ignoreTransactions || []),
      ...(t.ignoreTransactions || []),
    ],
    ignoreInternal: e.ignoreInternal !== void 0 ? e.ignoreInternal : !0,
  };
}
function ja(e, t) {
  return t.ignoreInternal && Ya(e)
    ? (y &&
        m.warn(
          "Event dropped due to being internal Sentry Error.\nEvent: ".concat(
            de(e)
          )
        ),
      !0)
    : Wa(e, t.ignoreErrors)
    ? (y &&
        m.warn(
          "Event dropped due to being matched by `ignoreErrors` option.\nEvent: ".concat(
            de(e)
          )
        ),
      !0)
    : Ka(e)
    ? (y &&
        m.warn(
          "Event dropped due to not having an error message, error type or stacktrace.\nEvent: ".concat(
            de(e)
          )
        ),
      !0)
    : qa(e, t.ignoreTransactions)
    ? (y &&
        m.warn(
          "Event dropped due to being matched by `ignoreTransactions` option.\nEvent: ".concat(
            de(e)
          )
        ),
      !0)
    : Ga(e, t.denyUrls)
    ? (y &&
        m.warn(
          "Event dropped due to being matched by `denyUrls` option.\nEvent: "
            .concat(de(e), ".\nUrl: ")
            .concat($t(e))
        ),
      !0)
    : Va(e, t.allowUrls)
    ? !1
    : (y &&
        m.warn(
          "Event dropped due to not being matched by `allowUrls` option.\nEvent: "
            .concat(de(e), ".\nUrl: ")
            .concat($t(e))
        ),
      !0);
}
function Wa(e, t) {
  return e.type || !t || !t.length ? !1 : za(e).some((n) => _e(n, t));
}
function qa(e, t) {
  if (e.type !== "transaction" || !t || !t.length) return !1;
  const n = e.transaction;
  return n ? _e(n, t) : !1;
}
function Ga(e, t) {
  if (!t || !t.length) return !1;
  const n = $t(e);
  return n ? _e(n, t) : !1;
}
function Va(e, t) {
  if (!t || !t.length) return !0;
  const n = $t(e);
  return n ? _e(n, t) : !0;
}
function za(e) {
  const t = [];
  e.message && t.push(e.message);
  let n;
  try {
    n = e.exception.values[e.exception.values.length - 1];
  } catch (r) {}
  return (
    n &&
      n.value &&
      (t.push(n.value),
      n.type && t.push("".concat(n.type, ": ").concat(n.value))),
    t
  );
}
function Ya(e) {
  try {
    return e.exception.values[0].type === "SentryError";
  } catch (t) {}
  return !1;
}
function Xa(e = []) {
  for (let t = e.length - 1; t >= 0; t--) {
    const n = e[t];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]")
      return n.filename || null;
  }
  return null;
}
function $t(e) {
  try {
    let t;
    try {
      t = e.exception.values[0].stacktrace.frames;
    } catch (n) {}
    return t ? Xa(t) : null;
  } catch (t) {
    return y && m.error("Cannot extract url for event ".concat(de(e))), null;
  }
}
function Ka(e) {
  return e.type ||
    !e.exception ||
    !e.exception.values ||
    e.exception.values.length === 0
    ? !1
    : !e.message &&
        !e.exception.values.some(
          (t) => t.stacktrace || (t.type && t.type !== "Error") || t.value
        );
}
function Ja(e, t, n = 250, r, s, o, i) {
  if (
    !o.exception ||
    !o.exception.values ||
    !i ||
    !ae(i.originalException, Error)
  )
    return;
  const a =
    o.exception.values.length > 0
      ? o.exception.values[o.exception.values.length - 1]
      : void 0;
  a &&
    (o.exception.values = Za(
      yn(e, t, s, i.originalException, r, o.exception.values, a, 0),
      n
    ));
}
function yn(e, t, n, r, s, o, i, a) {
  if (o.length >= n + 1) return o;
  let c = [...o];
  if (ae(r[s], Error)) {
    Or(i, a);
    const u = e(t, r[s]),
      l = c.length;
    xr(u, s, l, a), (c = yn(e, t, n, r[s], s, [u, ...c], u, l));
  }
  return (
    Array.isArray(r.errors) &&
      r.errors.forEach((u, l) => {
        if (ae(u, Error)) {
          Or(i, a);
          const d = e(t, u),
            f = c.length;
          xr(d, "errors[".concat(l, "]"), f, a),
            (c = yn(e, t, n, u, s, [d, ...c], d, f));
        }
      }),
    c
  );
}
function Or(e, t) {
  (e.mechanism = e.mechanism || { type: "generic", handled: !0 }),
    (e.mechanism = {
      ...e.mechanism,
      ...(e.type === "AggregateError" && { is_exception_group: !0 }),
      exception_id: t,
    });
}
function xr(e, t, n, r) {
  (e.mechanism = e.mechanism || { type: "generic", handled: !0 }),
    (e.mechanism = {
      ...e.mechanism,
      type: "chained",
      source: t,
      exception_id: n,
      parent_id: r,
    });
}
function Za(e, t) {
  return e.map((n) => (n.value && (n.value = Fe(n.value, t)), n));
}
function Ee(e) {
  if (!e) return {};
  const t = e.match(
    /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
  );
  if (!t) return {};
  const n = t[6] || "",
    r = t[8] || "";
  return {
    host: t[4],
    path: t[5],
    protocol: t[2],
    search: n,
    hash: r,
    relative: t[5] + n + r,
  };
}
function Qa(e) {
  const t = "console";
  me(t, e), he(t, ec);
}
function ec() {
  "console" in b &&
    an.forEach(function (e) {
      e in b.console &&
        z(b.console, e, function (t) {
          return (
            (xt[e] = t),
            function (...n) {
              K("console", { args: n, level: e });
              const s = xt[e];
              s && s.apply(b.console, n);
            }
          );
        });
    });
}
function tc(e) {
  return e === "warn"
    ? "warning"
    : ["fatal", "error", "warning", "log", "info", "debug"].includes(e)
    ? e
    : "log";
}
const nc = "Dedupe",
  rc = () => {
    let e;
    return {
      name: nc,
      processEvent(t) {
        if (t.type) return t;
        try {
          if (oc(t, e))
            return (
              y &&
                m.warn(
                  "Event dropped due to being a duplicate of previously captured event."
                ),
              null
            );
        } catch (n) {}
        return (e = t);
      },
    };
  },
  sc = rc;
function oc(e, t) {
  return t ? !!(ic(e, t) || ac(e, t)) : !1;
}
function ic(e, t) {
  const n = e.message,
    r = t.message;
  return !(
    (!n && !r) ||
    (n && !r) ||
    (!n && r) ||
    n !== r ||
    !Hs(e, t) ||
    !$s(e, t)
  );
}
function ac(e, t) {
  const n = Dr(t),
    r = Dr(e);
  return !(
    !n ||
    !r ||
    n.type !== r.type ||
    n.value !== r.value ||
    !Hs(e, t) ||
    !$s(e, t)
  );
}
function $s(e, t) {
  let n = tr(e),
    r = tr(t);
  if (!n && !r) return !0;
  if ((n && !r) || (!n && r) || ((n = n), (r = r), r.length !== n.length))
    return !1;
  for (let s = 0; s < r.length; s++) {
    const o = r[s],
      i = n[s];
    if (
      o.filename !== i.filename ||
      o.lineno !== i.lineno ||
      o.colno !== i.colno ||
      o.function !== i.function
    )
      return !1;
  }
  return !0;
}
function Hs(e, t) {
  let n = e.fingerprint,
    r = t.fingerprint;
  if (!n && !r) return !0;
  if ((n && !r) || (!n && r)) return !1;
  (n = n), (r = r);
  try {
    return n.join("") === r.join("");
  } catch (s) {
    return !1;
  }
}
function Dr(e) {
  return e.exception && e.exception.values && e.exception.values[0];
}
function cc(e, t, n, r, s = "auto.http.browser") {
  if (!e.fetchData) return;
  const o = fe() && t(e.fetchData.url);
  if (e.endTimestamp && o) {
    const f = e.fetchData.__span;
    if (!f) return;
    const p = r[f];
    p && (lc(p, e), delete r[f]);
    return;
  }
  const { method: i, url: a } = e.fetchData,
    c = dc(a),
    u = c ? Ee(c).host : void 0,
    l = !!H(),
    d =
      o && l
        ? at({
            name: "".concat(i, " ").concat(a),
            attributes: {
              url: a,
              type: "fetch",
              "http.method": i,
              "http.url": c,
              "server.address": u,
              [D]: s,
              [Ie]: "http.client",
            },
          })
        : new Ne();
  if (
    ((e.fetchData.__span = d.spanContext().spanId),
    (r[d.spanContext().spanId] = d),
    n(e.fetchData.url))
  ) {
    const f = e.args[0],
      p = e.args[1] || {},
      h = uc(f, p, fe() && l ? d : void 0);
    h && ((e.args[1] = p), (p.headers = h));
  }
  return d;
}
function uc(e, t, n) {
  const r = Fs({ span: n }),
    s = r["sentry-trace"],
    o = r.baggage;
  if (!s) return;
  const i = t.headers || (fc(e) ? e.headers : void 0);
  if (i)
    if (pc(i)) {
      const a = new Headers(i);
      if ((a.set("sentry-trace", s), o)) {
        const c = a.get("baggage");
        if (c) {
          const u = bt(c);
          a.set("baggage", u ? "".concat(u, ",").concat(o) : o);
        } else a.set("baggage", o);
      }
      return a;
    } else if (Array.isArray(i)) {
      const a = [
        ...i
          .filter((c) => !(Array.isArray(c) && c[0] === "sentry-trace"))
          .map((c) => {
            if (
              Array.isArray(c) &&
              c[0] === "baggage" &&
              typeof c[1] == "string"
            ) {
              const [u, l, ...d] = c;
              return [u, bt(l), ...d];
            } else return c;
          }),
        ["sentry-trace", s],
      ];
      return o && a.push(["baggage", o]), a;
    } else {
      const a = "baggage" in i ? i.baggage : void 0;
      let c = [];
      return (
        Array.isArray(a)
          ? (c = a
              .map((u) => (typeof u == "string" ? bt(u) : u))
              .filter((u) => u === ""))
          : a && c.push(bt(a)),
        o && c.push(o),
        {
          ...i,
          "sentry-trace": s,
          baggage: c.length > 0 ? c.join(",") : void 0,
        }
      );
    }
  else return { ...r };
}
function dc(e) {
  try {
    return new URL(e).href;
  } catch (t) {
    return;
  }
}
function lc(e, t) {
  if (t.response) {
    cs(e, t.response.status);
    const n =
      t.response &&
      t.response.headers &&
      t.response.headers.get("content-length");
    if (n) {
      const r = parseInt(n);
      r > 0 && e.setAttribute("http.response_content_length", r);
    }
  } else t.error && e.setStatus({ code: O, message: "internal_error" });
  e.end();
}
function bt(e) {
  return e
    .split(",")
    .filter((t) => !t.split("=")[0].startsWith(Hn))
    .join(",");
}
function fc(e) {
  return typeof Request < "u" && ae(e, Request);
}
function pc(e) {
  return typeof Headers < "u" && ae(e, Headers);
}
function Us(e) {
  if (e !== void 0)
    return e >= 400 && e < 500 ? "warning" : e >= 500 ? "error" : void 0;
}
const Sn = b;
function Bs() {
  if (!("fetch" in Sn)) return !1;
  try {
    return (
      new Headers(), new Request("http://www.example.com"), new Response(), !0
    );
  } catch (e) {
    return !1;
  }
}
function En(e) {
  return (
    e && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
  );
}
function mc() {
  if (typeof EdgeRuntime == "string") return !0;
  if (!Bs()) return !1;
  if (En(Sn.fetch)) return !0;
  let e = !1;
  const t = Sn.document;
  if (t && typeof t.createElement == "function")
    try {
      const n = t.createElement("iframe");
      (n.hidden = !0),
        t.head.appendChild(n),
        n.contentWindow &&
          n.contentWindow.fetch &&
          (e = En(n.contentWindow.fetch)),
        t.head.removeChild(n);
    } catch (n) {
      pe &&
        m.warn(
          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
          n
        );
    }
  return e;
}
function js(e, t) {
  const n = "fetch";
  me(n, e), he(n, () => Ws(void 0, t));
}
function hc(e) {
  const t = "fetch-body-resolved";
  me(t, e), he(t, () => Ws(_c));
}
function Ws(e, t = !1) {
  (t && !mc()) ||
    z(b, "fetch", function (n) {
      return function (...r) {
        const { method: s, url: o } = yc(r),
          i = {
            args: r,
            fetchData: { method: s, url: o },
            startTimestamp: B() * 1e3,
          };
        e || K("fetch", { ...i });
        const a = new Error().stack;
        return n.apply(b, r).then(
          async (c) => (
            e
              ? e(c)
              : K("fetch", { ...i, endTimestamp: B() * 1e3, response: c }),
            c
          ),
          (c) => {
            throw (
              (K("fetch", { ...i, endTimestamp: B() * 1e3, error: c }),
              xn(c) &&
                c.stack === void 0 &&
                ((c.stack = a), J(c, "framesToPop", 1)),
              c)
            );
          }
        );
      };
    });
}
async function gc(e, t) {
  if (e && e.body) {
    const n = e.body,
      r = n.getReader(),
      s = setTimeout(() => {
        n.cancel().then(null, () => {});
      }, 90 * 1e3);
    let o = !0;
    for (; o; ) {
      let i;
      try {
        i = setTimeout(() => {
          n.cancel().then(null, () => {});
        }, 5e3);
        const { done: a } = await r.read();
        clearTimeout(i), a && (t(), (o = !1));
      } catch (a) {
        o = !1;
      } finally {
        clearTimeout(i);
      }
    }
    clearTimeout(s), r.releaseLock(), n.cancel().then(null, () => {});
  }
}
function _c(e) {
  let t;
  try {
    t = e.clone();
  } catch (n) {
    return;
  }
  gc(t, () => {
    K("fetch-body-resolved", { endTimestamp: B() * 1e3, response: e });
  });
}
function bn(e, t) {
  return !!e && typeof e == "object" && !!e[t];
}
function Lr(e) {
  return typeof e == "string"
    ? e
    : e
    ? bn(e, "url")
      ? e.url
      : e.toString
      ? e.toString()
      : ""
    : "";
}
function yc(e) {
  if (e.length === 0) return { method: "GET", url: "" };
  if (e.length === 2) {
    const [n, r] = e;
    return {
      url: Lr(n),
      method: bn(r, "method") ? String(r.method).toUpperCase() : "GET",
    };
  }
  const t = e[0];
  return {
    url: Lr(t),
    method: bn(t, "method") ? String(t.method).toUpperCase() : "GET",
  };
}
function Sc() {
  return "npm";
}
const Tt = b;
function Ec() {
  const e = Tt.chrome,
    t = e && e.app && e.app.runtime,
    n = "history" in Tt && !!Tt.history.pushState && !!Tt.history.replaceState;
  return !t && n;
}
const S = b;
let Tn = 0;
function qs() {
  return Tn > 0;
}
function bc() {
  Tn++,
    setTimeout(() => {
      Tn--;
    });
}
function je(e, t = {}) {
  function n(s) {
    return typeof s == "function";
  }
  if (!n(e)) return e;
  try {
    const s = e.__sentry_wrapped__;
    if (s) return typeof s == "function" ? s : e;
    if (Mn(e)) return e;
  } catch (s) {
    return e;
  }
  const r = function (...s) {
    try {
      const o = s.map((i) => je(i, t));
      return e.apply(this, o);
    } catch (o) {
      throw (
        (bc(),
        Gt((i) => {
          i.addEventProcessor(
            (a) => (
              t.mechanism && (un(a, void 0), tt(a, t.mechanism)),
              (a.extra = { ...a.extra, arguments: s }),
              a
            )
          ),
            Ft(o);
        }),
        o)
      );
    }
  };
  try {
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
  } catch (s) {}
  ns(r, e), J(e, "__sentry_wrapped__", r);
  try {
    Object.getOwnPropertyDescriptor(r, "name").configurable &&
      Object.defineProperty(r, "name", {
        get() {
          return e.name;
        },
      });
  } catch (s) {}
  return r;
}
const te = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__;
function qn(e, t) {
  const n = Gn(e, t),
    r = { type: kc(t), value: Rc(t) };
  return (
    n.length && (r.stacktrace = { frames: n }),
    r.type === void 0 &&
      r.value === "" &&
      (r.value = "Unrecoverable error caught"),
    r
  );
}
function Tc(e, t, n, r) {
  const s = w(),
    o = s && s.getOptions().normalizeDepth,
    i = Oc(t),
    a = { __serialized__: vs(t, o) };
  if (i) return { exception: { values: [qn(e, i)] }, extra: a };
  const c = {
    exception: {
      values: [
        {
          type: Wt(t) ? t.constructor.name : r ? "UnhandledRejection" : "Error",
          value: Cc(t, { isUnhandledRejection: r }),
        },
      ],
    },
    extra: a,
  };
  if (n) {
    const u = Gn(e, n);
    u.length && (c.exception.values[0].stacktrace = { frames: u });
  }
  return c;
}
function Jt(e, t) {
  return { exception: { values: [qn(e, t)] } };
}
function Gn(e, t) {
  const n = t.stacktrace || t.stack || "",
    r = vc(t),
    s = Ic(t);
  try {
    return e(n, r, s);
  } catch (o) {}
  return [];
}
const wc = /Minified React error #\d+;/i;
function vc(e) {
  return e && wc.test(e.message) ? 1 : 0;
}
function Ic(e) {
  return typeof e.framesToPop == "number" ? e.framesToPop : 0;
}
function Gs(e) {
  return typeof WebAssembly < "u" && typeof WebAssembly.Exception < "u"
    ? e instanceof WebAssembly.Exception
    : !1;
}
function kc(e) {
  const t = e && e.name;
  return !t && Gs(e)
    ? e.message && Array.isArray(e.message) && e.message.length == 2
      ? e.message[0]
      : "WebAssembly.Exception"
    : t;
}
function Rc(e) {
  const t = e && e.message;
  return t
    ? t.error && typeof t.error.message == "string"
      ? t.error.message
      : Gs(e) && Array.isArray(e.message) && e.message.length == 2
      ? e.message[1]
      : t
    : "No error message";
}
function Ac(e, t, n, r) {
  const s = (n && n.syntheticException) || void 0,
    o = Vn(e, t, s, r);
  return (
    tt(o),
    (o.level = "error"),
    n && n.event_id && (o.event_id = n.event_id),
    we(o)
  );
}
function Pc(e, t, n = "info", r, s) {
  const o = (r && r.syntheticException) || void 0,
    i = wn(e, t, o, s);
  return (i.level = n), r && r.event_id && (i.event_id = r.event_id), we(i);
}
function Vn(e, t, n, r, s) {
  let o;
  if (Qr(t) && t.error) return Jt(e, t.error);
  if (rr(t) || Eo(t)) {
    const i = t;
    if ("stack" in t) o = Jt(e, t);
    else {
      const a = i.name || (rr(i) ? "DOMError" : "DOMException"),
        c = i.message ? "".concat(a, ": ").concat(i.message) : a;
      (o = wn(e, c, n, r)), un(o, c);
    }
    return (
      "code" in i &&
        (o.tags = { ...o.tags, "DOMException.code": "".concat(i.code) }),
      o
    );
  }
  return xn(t)
    ? Jt(e, t)
    : $e(t) || Wt(t)
    ? ((o = Tc(e, t, n, s)), tt(o, { synthetic: !0 }), o)
    : ((o = wn(e, t, n, r)), un(o, "".concat(t)), tt(o, { synthetic: !0 }), o);
}
function wn(e, t, n, r) {
  const s = {};
  if (r && n) {
    const o = Gn(e, n);
    o.length &&
      (s.exception = { values: [{ value: t, stacktrace: { frames: o } }] });
  }
  if (Dn(t)) {
    const { __sentry_template_string__: o, __sentry_template_values__: i } = t;
    return (s.logentry = { message: o, params: i }), s;
  }
  return (s.message = t), s;
}
function Cc(e, { isUnhandledRejection: t }) {
  const n = Po(e),
    r = t ? "promise rejection" : "exception";
  if (Qr(e))
    return "Event `ErrorEvent` captured as "
      .concat(r, " with message `")
      .concat(e.message, "`");
  if (Wt(e)) {
    const s = Nc(e);
    return "Event `"
      .concat(s, "` (type=")
      .concat(e.type, ") captured as ")
      .concat(r);
  }
  return "Object captured as ".concat(r, " with keys: ").concat(n);
}
function Nc(e) {
  try {
    const t = Object.getPrototypeOf(e);
    return t ? t.constructor.name : void 0;
  } catch (t) {}
}
function Oc(e) {
  for (const t in e)
    if (Object.prototype.hasOwnProperty.call(e, t)) {
      const n = e[t];
      if (n instanceof Error) return n;
    }
}
function xc(e, { metadata: t, tunnel: n, dsn: r }) {
  const s = {
      event_id: e.event_id,
      sent_at: new Date().toISOString(),
      ...(t && t.sdk && { sdk: { name: t.sdk.name, version: t.sdk.version } }),
      ...(!!n && !!r && { dsn: it(r) }),
    },
    o = Dc(e);
  return Ve(s, [o]);
}
function Dc(e) {
  return [{ type: "user_report" }, e];
}
class Lc extends ya {
  constructor(t) {
    const n = { parentSpanIsAlwaysRootSpan: !0, ...t },
      r = S.SENTRY_SDK_SOURCE || Sc();
    Na(n, "browser", ["browser"], r),
      super(n),
      n.sendClientReports &&
        S.document &&
        S.document.addEventListener("visibilitychange", () => {
          S.document.visibilityState === "hidden" && this._flushOutcomes();
        });
  }
  eventFromException(t, n) {
    return Ac(this._options.stackParser, t, n, this._options.attachStacktrace);
  }
  eventFromMessage(t, n = "info", r) {
    return Pc(
      this._options.stackParser,
      t,
      n,
      r,
      this._options.attachStacktrace
    );
  }
  captureUserFeedback(t) {
    if (!this._isEnabled()) {
      te && m.warn("SDK not enabled, will not capture user feedback.");
      return;
    }
    const n = xc(t, {
      metadata: this.getSdkMetadata(),
      dsn: this.getDsn(),
      tunnel: this.getOptions().tunnel,
    });
    this.sendEnvelope(n);
  }
  _prepareEvent(t, n, r) {
    return (
      (t.platform = t.platform || "javascript"), super._prepareEvent(t, n, r)
    );
  }
}
const zn = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
  Mc = (e, t) => (e > t[1] ? "poor" : e > t[0] ? "needs-improvement" : "good"),
  ze = (e, t, n, r) => {
    let s, o;
    return (i) => {
      t.value >= 0 &&
        (i || r) &&
        ((o = t.value - (s || 0)),
        (o || s === void 0) &&
          ((s = t.value), (t.delta = o), (t.rating = Mc(t.value, n)), e(t)));
    };
  },
  g = b,
  Fc = () =>
    "v4-"
      .concat(Date.now(), "-")
      .concat(Math.floor(Math.random() * (9e12 - 1)) + 1e12),
  ct = (e = !0) => {
    const t =
      g.performance &&
      g.performance.getEntriesByType &&
      g.performance.getEntriesByType("navigation")[0];
    if (!e || (t && t.responseStart > 0 && t.responseStart < performance.now()))
      return t;
  },
  ut = () => {
    const e = ct();
    return (e && e.activationStart) || 0;
  },
  Ye = (e, t) => {
    const n = ct();
    let r = "navigate";
    return (
      n &&
        ((g.document && g.document.prerendering) || ut() > 0
          ? (r = "prerender")
          : g.document && g.document.wasDiscarded
          ? (r = "restore")
          : n.type && (r = n.type.replace(/_/g, "-"))),
      {
        name: e,
        value: typeof t > "u" ? -1 : t,
        rating: "good",
        delta: 0,
        entries: [],
        id: Fc(),
        navigationType: r,
      }
    );
  },
  Oe = (e, t, n) => {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        const r = new PerformanceObserver((s) => {
          Promise.resolve().then(() => {
            t(s.getEntries());
          });
        });
        return r.observe(Object.assign({ type: e, buffered: !0 }, n || {})), r;
      }
    } catch (r) {}
  },
  Xe = (e) => {
    const t = (n) => {
      (n.type === "pagehide" ||
        (g.document && g.document.visibilityState === "hidden")) &&
        e(n);
    };
    g.document &&
      (addEventListener("visibilitychange", t, !0),
      addEventListener("pagehide", t, !0));
  },
  Yt = (e) => {
    let t = !1;
    return () => {
      t || (e(), (t = !0));
    };
  };
let Ze = -1;
const $c = () =>
    g.document.visibilityState === "hidden" && !g.document.prerendering
      ? 0
      : 1 / 0,
  Ht = (e) => {
    g.document.visibilityState === "hidden" &&
      Ze > -1 &&
      ((Ze = e.type === "visibilitychange" ? e.timeStamp : 0), Uc());
  },
  Hc = () => {
    addEventListener("visibilitychange", Ht, !0),
      addEventListener("prerenderingchange", Ht, !0);
  },
  Uc = () => {
    removeEventListener("visibilitychange", Ht, !0),
      removeEventListener("prerenderingchange", Ht, !0);
  },
  Xt = () => (
    g.document && Ze < 0 && ((Ze = $c()), Hc()),
    {
      get firstHiddenTime() {
        return Ze;
      },
    }
  ),
  dt = (e) => {
    g.document && g.document.prerendering
      ? addEventListener("prerenderingchange", () => e(), !0)
      : e();
  },
  Bc = [1800, 3e3],
  jc = (e, t = {}) => {
    dt(() => {
      const n = Xt(),
        r = Ye("FCP");
      let s;
      const i = Oe("paint", (a) => {
        a.forEach((c) => {
          c.name === "first-contentful-paint" &&
            (i.disconnect(),
            c.startTime < n.firstHiddenTime &&
              ((r.value = Math.max(c.startTime - ut(), 0)),
              r.entries.push(c),
              s(!0)));
        });
      });
      i && (s = ze(e, r, Bc, t.reportAllChanges));
    });
  },
  Wc = [0.1, 0.25],
  qc = (e, t = {}) => {
    jc(
      Yt(() => {
        const n = Ye("CLS", 0);
        let r,
          s = 0,
          o = [];
        const i = (c) => {
            c.forEach((u) => {
              if (!u.hadRecentInput) {
                const l = o[0],
                  d = o[o.length - 1];
                s &&
                l &&
                d &&
                u.startTime - d.startTime < 1e3 &&
                u.startTime - l.startTime < 5e3
                  ? ((s += u.value), o.push(u))
                  : ((s = u.value), (o = [u]));
              }
            }),
              s > n.value && ((n.value = s), (n.entries = o), r());
          },
          a = Oe("layout-shift", i);
        a &&
          ((r = ze(e, n, Wc, t.reportAllChanges)),
          Xe(() => {
            i(a.takeRecords()), r(!0);
          }),
          setTimeout(r, 0));
      })
    );
  },
  Gc = [100, 300],
  Vc = (e, t = {}) => {
    dt(() => {
      const n = Xt(),
        r = Ye("FID");
      let s;
      const o = (c) => {
          c.startTime < n.firstHiddenTime &&
            ((r.value = c.processingStart - c.startTime),
            r.entries.push(c),
            s(!0));
        },
        i = (c) => {
          c.forEach(o);
        },
        a = Oe("first-input", i);
      (s = ze(e, r, Gc, t.reportAllChanges)),
        a &&
          Xe(
            Yt(() => {
              i(a.takeRecords()), a.disconnect();
            })
          );
    });
  };
let Vs = 0,
  Zt = 1 / 0,
  wt = 0;
const zc = (e) => {
  e.forEach((t) => {
    t.interactionId &&
      ((Zt = Math.min(Zt, t.interactionId)),
      (wt = Math.max(wt, t.interactionId)),
      (Vs = wt ? (wt - Zt) / 7 + 1 : 0));
  });
};
let vn;
const Yc = () => (vn ? Vs : performance.interactionCount || 0),
  Xc = () => {
    "interactionCount" in performance ||
      vn ||
      (vn = Oe("event", zc, {
        type: "event",
        buffered: !0,
        durationThreshold: 0,
      }));
  },
  re = [],
  Qt = new Map(),
  Kc = 40;
let Jc = 0;
const Zc = () => Yc() - Jc,
  Qc = () => {
    const e = Math.min(re.length - 1, Math.floor(Zc() / 50));
    return re[e];
  },
  en = 10,
  eu = [],
  tu = (e) => {
    if (
      (eu.forEach((r) => r(e)),
      !(e.interactionId || e.entryType === "first-input"))
    )
      return;
    const t = re[re.length - 1],
      n = Qt.get(e.interactionId);
    if (n || re.length < en || (t && e.duration > t.latency)) {
      if (n)
        e.duration > n.latency
          ? ((n.entries = [e]), (n.latency = e.duration))
          : e.duration === n.latency &&
            e.startTime === (n.entries[0] && n.entries[0].startTime) &&
            n.entries.push(e);
      else {
        const r = { id: e.interactionId, latency: e.duration, entries: [e] };
        Qt.set(r.id, r), re.push(r);
      }
      re.sort((r, s) => s.latency - r.latency),
        re.length > en && re.splice(en).forEach((r) => Qt.delete(r.id));
    }
  },
  zs = (e) => {
    const t = g.requestIdleCallback || g.setTimeout;
    let n = -1;
    return (
      (e = Yt(e)),
      g.document && g.document.visibilityState === "hidden"
        ? e()
        : ((n = t(e)), Xe(e)),
      n
    );
  },
  nu = [200, 500],
  ru = (e, t = {}) => {
    "PerformanceEventTiming" in g &&
      "interactionId" in PerformanceEventTiming.prototype &&
      dt(() => {
        Xc();
        const n = Ye("INP");
        let r;
        const s = (i) => {
            zs(() => {
              i.forEach(tu);
              const a = Qc();
              a &&
                a.latency !== n.value &&
                ((n.value = a.latency), (n.entries = a.entries), r());
            });
          },
          o = Oe("event", s, {
            durationThreshold:
              t.durationThreshold != null ? t.durationThreshold : Kc,
          });
        (r = ze(e, n, nu, t.reportAllChanges)),
          o &&
            (o.observe({ type: "first-input", buffered: !0 }),
            Xe(() => {
              s(o.takeRecords()), r(!0);
            }));
      });
  },
  su = [2500, 4e3],
  Mr = {},
  ou = (e, t = {}) => {
    dt(() => {
      const n = Xt(),
        r = Ye("LCP");
      let s;
      const o = (a) => {
          t.reportAllChanges || (a = a.slice(-1)),
            a.forEach((c) => {
              c.startTime < n.firstHiddenTime &&
                ((r.value = Math.max(c.startTime - ut(), 0)),
                (r.entries = [c]),
                s());
            });
        },
        i = Oe("largest-contentful-paint", o);
      if (i) {
        s = ze(e, r, su, t.reportAllChanges);
        const a = Yt(() => {
          Mr[r.id] ||
            (o(i.takeRecords()), i.disconnect(), (Mr[r.id] = !0), s(!0));
        });
        ["keydown", "click"].forEach((c) => {
          g.document &&
            addEventListener(c, () => zs(a), { once: !0, capture: !0 });
        }),
          Xe(a);
      }
    });
  },
  iu = [800, 1800],
  In = (e) => {
    g.document && g.document.prerendering
      ? dt(() => In(e))
      : g.document && g.document.readyState !== "complete"
      ? addEventListener("load", () => In(e), !0)
      : setTimeout(e, 0);
  },
  au = (e, t = {}) => {
    const n = Ye("TTFB"),
      r = ze(e, n, iu, t.reportAllChanges);
    In(() => {
      const s = ct();
      s &&
        ((n.value = Math.max(s.responseStart - ut(), 0)),
        (n.entries = [s]),
        r(!0));
    });
  },
  Qe = {},
  Ut = {};
let Ys, Xs, Ks, Js, Zs;
function Qs(e, t = !1) {
  return lt("cls", e, fu, Ys, t);
}
function cu(e, t = !1) {
  return lt("lcp", e, mu, Ks, t);
}
function uu(e) {
  return lt("fid", e, pu, Xs);
}
function du(e) {
  return lt("ttfb", e, hu, Js);
}
function lu(e) {
  return lt("inp", e, gu, Zs);
}
function rt(e, t) {
  return eo(e, t), Ut[e] || (_u(e), (Ut[e] = !0)), to(e, t);
}
function Ke(e, t) {
  const n = Qe[e];
  if (!(!n || !n.length))
    for (const r of n)
      try {
        r(t);
      } catch (s) {
        zn &&
          m.error(
            "Error while triggering instrumentation handler.\nType: "
              .concat(e, "\nName: ")
              .concat(ie(r), "\nError:"),
            s
          );
      }
}
function fu() {
  return qc(
    (e) => {
      Ke("cls", { metric: e }), (Ys = e);
    },
    { reportAllChanges: !0 }
  );
}
function pu() {
  return Vc((e) => {
    Ke("fid", { metric: e }), (Xs = e);
  });
}
function mu() {
  return ou(
    (e) => {
      Ke("lcp", { metric: e }), (Ks = e);
    },
    { reportAllChanges: !0 }
  );
}
function hu() {
  return au((e) => {
    Ke("ttfb", { metric: e }), (Js = e);
  });
}
function gu() {
  return ru((e) => {
    Ke("inp", { metric: e }), (Zs = e);
  });
}
function lt(e, t, n, r, s = !1) {
  eo(e, t);
  let o;
  return (
    Ut[e] || ((o = n()), (Ut[e] = !0)),
    r && t({ metric: r }),
    to(e, t, s ? o : void 0)
  );
}
function _u(e) {
  const t = {};
  e === "event" && (t.durationThreshold = 0),
    Oe(
      e,
      (n) => {
        Ke(e, { entries: n });
      },
      t
    );
}
function eo(e, t) {
  (Qe[e] = Qe[e] || []), Qe[e].push(t);
}
function to(e, t, n) {
  return () => {
    n && n();
    const r = Qe[e];
    if (!r) return;
    const s = r.indexOf(t);
    s !== -1 && r.splice(s, 1);
  };
}
function yu(e) {
  return "duration" in e;
}
function tn(e) {
  return typeof e == "number" && isFinite(e);
}
function ce(e, t, n, { ...r }) {
  const s = T(e).start_timestamp;
  return (
    s &&
      s > t &&
      typeof e.updateStartTime == "function" &&
      e.updateStartTime(t),
    jn(e, () => {
      const o = at({ startTime: t, ...r });
      return o && o.end(n), o;
    })
  );
}
function no(e) {
  const t = w();
  if (!t) return;
  const { name: n, transaction: r, attributes: s, startTime: o } = e,
    { release: i, environment: a } = t.getOptions(),
    c = t.getIntegrationByName("Replay"),
    u = c && c.getReplayId(),
    l = I(),
    d = l.getUser(),
    f = d !== void 0 ? d.email || d.id || d.ip_address : void 0;
  let p;
  try {
    p = l.getScopeData().contexts.profile.profile_id;
  } catch (_) {}
  const h = {
    release: i,
    environment: a,
    user: f || void 0,
    profile_id: p || void 0,
    replay_id: u || void 0,
    transaction: r,
    "user_agent.original": g.navigator && g.navigator.userAgent,
    ...s,
  };
  return at({
    name: n,
    attributes: h,
    startTime: o,
    experimental: { standalone: !0 },
  });
}
function Yn() {
  return g && g.addEventListener && g.performance;
}
function C(e) {
  return e / 1e3;
}
function Su() {
  let e = 0,
    t,
    n;
  if (!bu()) return;
  let r = !1;
  function s() {
    r || ((r = !0), n && Eu(e, t, n), o());
  }
  const o = Qs(({ metric: i }) => {
    const a = i.entries[i.entries.length - 1];
    a && ((e = i.value), (t = a));
  }, !0);
  Xe(() => {
    s();
  }),
    setTimeout(() => {
      const i = w();
      if (!i) return;
      const a = i.on("startNavigationSpan", () => {
          s(), a && a();
        }),
        c = H(),
        u = c && $(c),
        l = u && T(u);
      l && l.op === "pageload" && (n = u.spanContext().spanId);
    }, 0);
}
function Eu(e, t, n) {
  zn && m.log("Sending CLS span (".concat(e, ")"));
  const r = C((q || 0) + ((t && t.startTime) || 0)),
    s = I().getScopeData().transactionName,
    o = t ? Te(t.sources[0] && t.sources[0].node) : "Layout shift",
    i = F({
      [D]: "auto.http.browser.cls",
      [Ie]: "ui.webvital.cls",
      [$n]: (t && t.duration) || 0,
      "sentry.pageload.span_id": n,
    }),
    a = no({ name: o, transaction: s, attributes: i, startTime: r });
  a && (a.addEvent("cls", { [Vt]: "", [zt]: e }), a.end(r));
}
function bu() {
  try {
    return PerformanceObserver.supportedEntryTypes.includes("layout-shift");
  } catch (e) {
    return !1;
  }
}
const Tu = 2147483647;
let Fr = 0,
  M = {},
  W,
  et;
function wu({ recordClsStandaloneSpans: e }) {
  const t = Yn();
  if (t && q) {
    t.mark && g.performance.mark("sentry-tracing-init");
    const n = Pu(),
      r = Au(),
      s = Cu(),
      o = e ? Su() : Ru();
    return () => {
      n(), r(), s(), o && o();
    };
  }
  return () => {};
}
function vu() {
  rt("longtask", ({ entries: e }) => {
    const t = H();
    if (!t) return;
    const { op: n, start_timestamp: r } = T(t);
    for (const s of e) {
      const o = C(q + s.startTime),
        i = C(s.duration);
      (n === "navigation" && r && o < r) ||
        ce(t, o, o + i, {
          name: "Main UI thread blocked",
          op: "ui.long-task",
          attributes: { [D]: "auto.ui.browser.metrics" },
        });
    }
  });
}
function Iu() {
  new PerformanceObserver((t) => {
    const n = H();
    if (n)
      for (const r of t.getEntries()) {
        if (!r.scripts[0]) continue;
        const s = C(q + r.startTime),
          { start_timestamp: o, op: i } = T(n);
        if (i === "navigation" && o && s < o) continue;
        const a = C(r.duration),
          c = { [D]: "auto.ui.browser.metrics" },
          u = r.scripts[0],
          {
            invoker: l,
            invokerType: d,
            sourceURL: f,
            sourceFunctionName: p,
            sourceCharPosition: h,
          } = u;
        (c["browser.script.invoker"] = l),
          (c["browser.script.invoker_type"] = d),
          f && (c["code.filepath"] = f),
          p && (c["code.function"] = p),
          h !== -1 && (c["browser.script.source_char_position"] = h),
          ce(n, s, s + a, {
            name: "Main UI thread blocked",
            op: "ui.long-animation-frame",
            attributes: c,
          });
      }
  }).observe({ type: "long-animation-frame", buffered: !0 });
}
function ku() {
  rt("event", ({ entries: e }) => {
    const t = H();
    if (t) {
      for (const n of e)
        if (n.name === "click") {
          const r = C(q + n.startTime),
            s = C(n.duration),
            o = {
              name: Te(n.target),
              op: "ui.interaction.".concat(n.name),
              startTime: r,
              attributes: { [D]: "auto.ui.browser.metrics" },
            },
            i = ts(n.target);
          i && (o.attributes["ui.component_name"] = i), ce(t, r, r + s, o);
        }
    }
  });
}
function Ru() {
  return Qs(({ metric: e }) => {
    const t = e.entries[e.entries.length - 1];
    t && ((M.cls = { value: e.value, unit: "" }), (et = t));
  }, !0);
}
function Au() {
  return cu(({ metric: e }) => {
    const t = e.entries[e.entries.length - 1];
    t && ((M.lcp = { value: e.value, unit: "millisecond" }), (W = t));
  }, !0);
}
function Pu() {
  return uu(({ metric: e }) => {
    const t = e.entries[e.entries.length - 1];
    if (!t) return;
    const n = C(q),
      r = C(t.startTime);
    (M.fid = { value: e.value, unit: "millisecond" }),
      (M["mark.fid"] = { value: n + r, unit: "second" });
  });
}
function Cu() {
  return du(({ metric: e }) => {
    e.entries[e.entries.length - 1] &&
      (M.ttfb = { value: e.value, unit: "millisecond" });
  });
}
function Nu(e, t) {
  const n = Yn();
  if (!n || !g.performance.getEntries || !q) return;
  const r = C(q),
    s = n.getEntries(),
    { op: o, start_timestamp: i } = T(e);
  if (
    (s.slice(Fr).forEach((a) => {
      const c = C(a.startTime),
        u = C(Math.max(0, a.duration));
      if (!(o === "navigation" && i && r + c < i))
        switch (a.entryType) {
          case "navigation": {
            xu(e, a, r);
            break;
          }
          case "mark":
          case "paint":
          case "measure": {
            Ou(e, a, c, u, r);
            const l = Xt(),
              d = a.startTime < l.firstHiddenTime;
            a.name === "first-paint" &&
              d &&
              (M.fp = { value: a.startTime, unit: "millisecond" }),
              a.name === "first-contentful-paint" &&
                d &&
                (M.fcp = { value: a.startTime, unit: "millisecond" });
            break;
          }
          case "resource": {
            Lu(e, a, a.name, c, u, r);
            break;
          }
        }
    }),
    (Fr = Math.max(s.length - 1, 0)),
    Mu(e),
    o === "pageload")
  ) {
    $u(M);
    const a = M["mark.fid"];
    a &&
      M.fid &&
      (ce(e, a.value, a.value + C(M.fid.value), {
        name: "first input delay",
        op: "ui.action",
        attributes: { [D]: "auto.ui.browser.metrics" },
      }),
      delete M["mark.fid"]),
      (!("fcp" in M) || !t.recordClsOnPageloadSpan) && delete M.cls,
      Object.entries(M).forEach(([c, u]) => {
        Mi(c, u.value, u.unit);
      }),
      e.setAttribute("performance.timeOrigin", r),
      e.setAttribute("performance.activationStart", ut()),
      Fu(e);
  }
  (W = void 0), (et = void 0), (M = {});
}
function Ou(e, t, n, r, s) {
  const o = ct(!1),
    i = C(o ? o.requestStart : 0),
    a = s + Math.max(n, i),
    c = s + n,
    u = c + r,
    l = { [D]: "auto.resource.browser.metrics" };
  return (
    a !== c &&
      ((l["sentry.browser.measure_happened_before_request"] = !0),
      (l["sentry.browser.measure_start_time"] = a)),
    ce(e, a, u, { name: t.name, op: t.entryType, attributes: l }),
    a
  );
}
function xu(e, t, n) {
  [
    "unloadEvent",
    "redirect",
    "domContentLoadedEvent",
    "loadEvent",
    "connect",
  ].forEach((r) => {
    vt(e, t, r, n);
  }),
    vt(e, t, "secureConnection", n, "TLS/SSL", "connectEnd"),
    vt(e, t, "fetch", n, "cache", "domainLookupStart"),
    vt(e, t, "domainLookup", n, "DNS"),
    Du(e, t, n);
}
function vt(e, t, n, r, s, o) {
  const i = o ? t[o] : t["".concat(n, "End")],
    a = t["".concat(n, "Start")];
  !a ||
    !i ||
    ce(e, r + C(a), r + C(i), {
      op: "browser.".concat(s || n),
      name: t.name,
      attributes: { [D]: "auto.ui.browser.metrics" },
    });
}
function Du(e, t, n) {
  const r = n + C(t.requestStart),
    s = n + C(t.responseEnd),
    o = n + C(t.responseStart);
  t.responseEnd &&
    (ce(e, r, s, {
      op: "browser.request",
      name: t.name,
      attributes: { [D]: "auto.ui.browser.metrics" },
    }),
    ce(e, o, s, {
      op: "browser.response",
      name: t.name,
      attributes: { [D]: "auto.ui.browser.metrics" },
    }));
}
function Lu(e, t, n, r, s, o) {
  if (t.initiatorType === "xmlhttprequest" || t.initiatorType === "fetch")
    return;
  const i = Ee(n),
    a = { [D]: "auto.resource.browser.metrics" };
  nn(a, t, "transferSize", "http.response_transfer_size"),
    nn(a, t, "encodedBodySize", "http.response_content_length"),
    nn(a, t, "decodedBodySize", "http.decoded_response_content_length"),
    t.deliveryType != null &&
      (a["http.response_delivery_type"] = t.deliveryType),
    "renderBlockingStatus" in t &&
      (a["resource.render_blocking_status"] = t.renderBlockingStatus),
    i.protocol && (a["url.scheme"] = i.protocol.split(":").pop()),
    i.host && (a["server.address"] = i.host),
    (a["url.same_origin"] = n.includes(g.location.origin));
  const c = o + r,
    u = c + s;
  ce(e, c, u, {
    name: n.replace(g.location.origin, ""),
    op: t.initiatorType
      ? "resource.".concat(t.initiatorType)
      : "resource.other",
    attributes: a,
  });
}
function Mu(e) {
  const t = g.navigator;
  if (!t) return;
  const n = t.connection;
  n &&
    (n.effectiveType &&
      e.setAttribute("effectiveConnectionType", n.effectiveType),
    n.type && e.setAttribute("connectionType", n.type),
    tn(n.rtt) && (M["connection.rtt"] = { value: n.rtt, unit: "millisecond" })),
    tn(t.deviceMemory) &&
      e.setAttribute("deviceMemory", "".concat(t.deviceMemory, " GB")),
    tn(t.hardwareConcurrency) &&
      e.setAttribute("hardwareConcurrency", String(t.hardwareConcurrency));
}
function Fu(e) {
  W &&
    (W.element && e.setAttribute("lcp.element", Te(W.element)),
    W.id && e.setAttribute("lcp.id", W.id),
    W.url && e.setAttribute("lcp.url", W.url.trim().slice(0, 200)),
    W.loadTime != null && e.setAttribute("lcp.loadTime", W.loadTime),
    W.renderTime != null && e.setAttribute("lcp.renderTime", W.renderTime),
    e.setAttribute("lcp.size", W.size)),
    et &&
      et.sources &&
      et.sources.forEach((t, n) =>
        e.setAttribute("cls.source.".concat(n + 1), Te(t.node))
      );
}
function nn(e, t, n, r) {
  const s = t[n];
  s != null && s < Tu && (e[r] = s);
}
function $u(e) {
  const t = ct(!1);
  if (!t) return;
  const { responseStart: n, requestStart: r } = t;
  r <= n && (e["ttfb.requestTime"] = { value: n - r, unit: "millisecond" });
}
const Hu = 1e3;
let $r, kn, Rn;
function Uu(e) {
  const t = "dom";
  me(t, e), he(t, Bu);
}
function Bu() {
  if (!g.document) return;
  const e = K.bind(null, "dom"),
    t = Hr(e, !0);
  g.document.addEventListener("click", t, !1),
    g.document.addEventListener("keypress", t, !1),
    ["EventTarget", "Node"].forEach((n) => {
      const s = g[n],
        o = s && s.prototype;
      !o ||
        !o.hasOwnProperty ||
        !o.hasOwnProperty("addEventListener") ||
        (z(o, "addEventListener", function (i) {
          return function (a, c, u) {
            if (a === "click" || a == "keypress")
              try {
                const l = (this.__sentry_instrumentation_handlers__ =
                    this.__sentry_instrumentation_handlers__ || {}),
                  d = (l[a] = l[a] || { refCount: 0 });
                if (!d.handler) {
                  const f = Hr(e);
                  (d.handler = f), i.call(this, a, f, u);
                }
                d.refCount++;
              } catch (l) {}
            return i.call(this, a, c, u);
          };
        }),
        z(o, "removeEventListener", function (i) {
          return function (a, c, u) {
            if (a === "click" || a == "keypress")
              try {
                const l = this.__sentry_instrumentation_handlers__ || {},
                  d = l[a];
                d &&
                  (d.refCount--,
                  d.refCount <= 0 &&
                    (i.call(this, a, d.handler, u),
                    (d.handler = void 0),
                    delete l[a]),
                  Object.keys(l).length === 0 &&
                    delete this.__sentry_instrumentation_handlers__);
              } catch (l) {}
            return i.call(this, a, c, u);
          };
        }));
    });
}
function ju(e) {
  if (e.type !== kn) return !1;
  try {
    if (!e.target || e.target._sentryId !== Rn) return !1;
  } catch (t) {}
  return !0;
}
function Wu(e, t) {
  return e !== "keypress"
    ? !1
    : !t || !t.tagName
    ? !0
    : !(
        t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.isContentEditable
      );
}
function Hr(e, t = !1) {
  return (n) => {
    if (!n || n._sentryCaptured) return;
    const r = qu(n);
    if (Wu(n.type, r)) return;
    J(n, "_sentryCaptured", !0), r && !r._sentryId && J(r, "_sentryId", x());
    const s = n.type === "keypress" ? "input" : n.type;
    ju(n) ||
      (e({ event: n, name: s, global: t }),
      (kn = n.type),
      (Rn = r ? r._sentryId : void 0)),
      clearTimeout($r),
      ($r = g.setTimeout(() => {
        (Rn = void 0), (kn = void 0);
      }, Hu));
  };
}
function qu(e) {
  try {
    return e.target;
  } catch (t) {
    return null;
  }
}
let It;
function Xn(e) {
  const t = "history";
  me(t, e), he(t, Gu);
}
function Gu() {
  if (!Ec()) return;
  const e = g.onpopstate;
  g.onpopstate = function (...n) {
    const r = g.location.href,
      s = It;
    if (((It = r), K("history", { from: s, to: r }), e))
      try {
        return e.apply(this, n);
      } catch (i) {}
  };
  function t(n) {
    return function (...r) {
      const s = r.length > 2 ? r[2] : void 0;
      if (s) {
        const o = It,
          i = String(s);
        (It = i), K("history", { from: o, to: i });
      }
      return n.apply(this, r);
    };
  }
  z(g.history, "pushState", t), z(g.history, "replaceState", t);
}
const Ct = {};
function Vu(e) {
  const t = Ct[e];
  if (t) return t;
  let n = g[e];
  if (En(n)) return (Ct[e] = n.bind(g));
  const r = g.document;
  if (r && typeof r.createElement == "function")
    try {
      const s = r.createElement("iframe");
      (s.hidden = !0), r.head.appendChild(s);
      const o = s.contentWindow;
      o && o[e] && (n = o[e]), r.head.removeChild(s);
    } catch (s) {
      zn &&
        m.warn(
          "Could not create sandbox iframe for "
            .concat(e, " check, bailing to window.")
            .concat(e, ": "),
          s
        );
    }
  return n && (Ct[e] = n.bind(g));
}
function Ur(e) {
  Ct[e] = void 0;
}
const Le = "__sentry_xhr_v3__";
function ro(e) {
  const t = "xhr";
  me(t, e), he(t, zu);
}
function zu() {
  if (!g.XMLHttpRequest) return;
  const e = XMLHttpRequest.prototype;
  (e.open = new Proxy(e.open, {
    apply(t, n, r) {
      const s = B() * 1e3,
        o = oe(r[0]) ? r[0].toUpperCase() : void 0,
        i = Yu(r[1]);
      if (!o || !i) return t.apply(n, r);
      (n[Le] = { method: o, url: i, request_headers: {} }),
        o === "POST" &&
          i.match(/sentry_key/) &&
          (n.__sentry_own_request__ = !0);
      const a = () => {
        const c = n[Le];
        if (c && n.readyState === 4) {
          try {
            c.status_code = n.status;
          } catch (l) {}
          const u = { endTimestamp: B() * 1e3, startTimestamp: s, xhr: n };
          K("xhr", u);
        }
      };
      return (
        "onreadystatechange" in n && typeof n.onreadystatechange == "function"
          ? (n.onreadystatechange = new Proxy(n.onreadystatechange, {
              apply(c, u, l) {
                return a(), c.apply(u, l);
              },
            }))
          : n.addEventListener("readystatechange", a),
        (n.setRequestHeader = new Proxy(n.setRequestHeader, {
          apply(c, u, l) {
            const [d, f] = l,
              p = u[Le];
            return (
              p && oe(d) && oe(f) && (p.request_headers[d.toLowerCase()] = f),
              c.apply(u, l)
            );
          },
        })),
        t.apply(n, r)
      );
    },
  })),
    (e.send = new Proxy(e.send, {
      apply(t, n, r) {
        const s = n[Le];
        if (!s) return t.apply(n, r);
        r[0] !== void 0 && (s.body = r[0]);
        const o = { startTimestamp: B() * 1e3, xhr: n };
        return K("xhr", o), t.apply(n, r);
      },
    }));
}
function Yu(e) {
  if (oe(e)) return e;
  try {
    return e.toString();
  } catch (t) {}
}
const rn = [],
  Nt = new Map();
function Xu() {
  if (Yn() && q) {
    const t = Ku();
    return () => {
      t();
    };
  }
  return () => {};
}
const Br = {
  click: "click",
  pointerdown: "click",
  pointerup: "click",
  mousedown: "click",
  mouseup: "click",
  touchstart: "click",
  touchend: "click",
  mouseover: "hover",
  mouseout: "hover",
  mouseenter: "hover",
  mouseleave: "hover",
  pointerover: "hover",
  pointerout: "hover",
  pointerenter: "hover",
  pointerleave: "hover",
  dragstart: "drag",
  dragend: "drag",
  drag: "drag",
  dragenter: "drag",
  dragleave: "drag",
  dragover: "drag",
  drop: "drag",
  keydown: "press",
  keyup: "press",
  keypress: "press",
  input: "press",
};
function Ku() {
  return lu(({ metric: e }) => {
    if (e.value == null) return;
    const t = e.entries.find((h) => h.duration === e.value && Br[h.name]);
    if (!t) return;
    const { interactionId: n } = t,
      r = Br[t.name],
      s = C(q + t.startTime),
      o = C(e.value),
      i = H(),
      a = i ? $(i) : void 0,
      u = (n != null ? Nt.get(n) : void 0) || a,
      l = u ? T(u).description : I().getScopeData().transactionName,
      d = Te(t.target),
      f = F({
        [D]: "auto.http.browser.inp",
        [Ie]: "ui.interaction.".concat(r),
        [$n]: t.duration,
      }),
      p = no({ name: d, transaction: l, attributes: f, startTime: s });
    p &&
      (p.addEvent("inp", { [Vt]: "millisecond", [zt]: e.value }), p.end(s + o));
  });
}
function Ju(e) {
  const t = ({ entries: n }) => {
    const r = H(),
      s = r && $(r);
    n.forEach((o) => {
      if (!yu(o) || !s) return;
      const i = o.interactionId;
      if (i != null && !Nt.has(i)) {
        if (rn.length > 10) {
          const a = rn.shift();
          Nt.delete(a);
        }
        rn.push(i), Nt.set(i, s);
      }
    });
  };
  rt("event", t), rt("first-input", t);
}
function Zu(e, t = Vu("fetch")) {
  let n = 0,
    r = 0;
  function s(o) {
    const i = o.body.length;
    (n += i), r++;
    const a = {
      body: o.body,
      method: "POST",
      referrerPolicy: "origin",
      headers: e.headers,
      keepalive: n <= 6e4 && r < 15,
      ...e.fetchOptions,
    };
    if (!t) return Ur("fetch"), Dt("No fetch implementation available");
    try {
      return t(e.url, a).then(
        (c) => (
          (n -= i),
          r--,
          {
            statusCode: c.status,
            headers: {
              "x-sentry-rate-limits": c.headers.get("X-Sentry-Rate-Limits"),
              "retry-after": c.headers.get("Retry-After"),
            },
          }
        )
      );
    } catch (c) {
      return Ur("fetch"), (n -= i), r--, Dt(c);
    }
  }
  return Ca(e, s);
}
const Qu = 30,
  ed = 50;
function An(e, t, n, r) {
  const s = { filename: e, function: t === "<anonymous>" ? be : t, in_app: !0 };
  return n !== void 0 && (s.lineno = n), r !== void 0 && (s.colno = r), s;
}
const td = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
  nd =
    /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
  rd = /\((\S*)(?::(\d+))(?::(\d+))\)/,
  sd = (e) => {
    const t = td.exec(e);
    if (t) {
      const [, r, s, o] = t;
      return An(r, be, +s, +o);
    }
    const n = nd.exec(e);
    if (n) {
      if (n[2] && n[2].indexOf("eval") === 0) {
        const i = rd.exec(n[2]);
        i && ((n[2] = i[1]), (n[3] = i[2]), (n[4] = i[3]));
      }
      const [s, o] = so(n[1] || be, n[2]);
      return An(o, s, n[3] ? +n[3] : void 0, n[4] ? +n[4] : void 0);
    }
  },
  od = [Qu, sd],
  id =
    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
  ad = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
  cd = (e) => {
    const t = id.exec(e);
    if (t) {
      if (t[3] && t[3].indexOf(" > eval") > -1) {
        const o = ad.exec(t[3]);
        o &&
          ((t[1] = t[1] || "eval"), (t[3] = o[1]), (t[4] = o[2]), (t[5] = ""));
      }
      let r = t[3],
        s = t[1] || be;
      return (
        ([s, r] = so(s, r)),
        An(r, s, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
      );
    }
  },
  ud = [ed, cd],
  dd = [od, ud],
  ld = Xr(...dd),
  so = (e, t) => {
    const n = e.indexOf("safari-extension") !== -1,
      r = e.indexOf("safari-web-extension") !== -1;
    return n || r
      ? [
          e.indexOf("@") !== -1 ? e.split("@")[0] : be,
          n ? "safari-extension:".concat(t) : "safari-web-extension:".concat(t),
        ]
      : [e, t];
  },
  kt = 1024,
  fd = "Breadcrumbs",
  pd = (e = {}) => {
    const t = {
      console: !0,
      dom: !0,
      fetch: !0,
      history: !0,
      sentry: !0,
      xhr: !0,
      ...e,
    };
    return {
      name: fd,
      setup(n) {
        t.console && Qa(_d(n)),
          t.dom && Uu(gd(n, t.dom)),
          t.xhr && ro(yd(n)),
          t.fetch && js(Sd(n)),
          t.history && Xn(Ed(n)),
          t.sentry && n.on("beforeSendEvent", hd(n));
      },
    };
  },
  md = pd;
function hd(e) {
  return function (n) {
    w() === e &&
      ke(
        {
          category: "sentry.".concat(
            n.type === "transaction" ? "transaction" : "event"
          ),
          event_id: n.event_id,
          level: n.level,
          message: de(n),
        },
        { event: n }
      );
  };
}
function gd(e, t) {
  return function (r) {
    if (w() !== e) return;
    let s,
      o,
      i = typeof t == "object" ? t.serializeAttribute : void 0,
      a =
        typeof t == "object" && typeof t.maxStringLength == "number"
          ? t.maxStringLength
          : void 0;
    a &&
      a > kt &&
      (te &&
        m.warn(
          "`dom.maxStringLength` cannot exceed "
            .concat(kt, ", but a value of ")
            .concat(a, " was configured. Sentry will use ")
            .concat(kt, " instead.")
        ),
      (a = kt)),
      typeof i == "string" && (i = [i]);
    try {
      const u = r.event,
        l = bd(u) ? u.target : u;
      (s = Te(l, { keyAttrs: i, maxStringLength: a })), (o = ts(l));
    } catch (u) {
      s = "<unknown>";
    }
    if (s.length === 0) return;
    const c = { category: "ui.".concat(r.name), message: s };
    o && (c.data = { "ui.component_name": o }),
      ke(c, { event: r.event, name: r.name, global: r.global });
  };
}
function _d(e) {
  return function (n) {
    if (w() !== e) return;
    const r = {
      category: "console",
      data: { arguments: n.args, logger: "console" },
      level: tc(n.level),
      message: sr(n.args, " "),
    };
    if (n.level === "assert")
      if (n.args[0] === !1)
        (r.message = "Assertion failed: ".concat(
          sr(n.args.slice(1), " ") || "console.assert"
        )),
          (r.data.arguments = n.args.slice(1));
      else return;
    ke(r, { input: n.args, level: n.level });
  };
}
function yd(e) {
  return function (n) {
    if (w() !== e) return;
    const { startTimestamp: r, endTimestamp: s } = n,
      o = n.xhr[Le];
    if (!r || !s || !o) return;
    const { method: i, url: a, status_code: c, body: u } = o,
      l = { method: i, url: a, status_code: c },
      d = { xhr: n.xhr, input: u, startTimestamp: r, endTimestamp: s },
      f = Us(c);
    ke({ category: "xhr", data: l, type: "http", level: f }, d);
  };
}
function Sd(e) {
  return function (n) {
    if (w() !== e) return;
    const { startTimestamp: r, endTimestamp: s } = n;
    if (
      s &&
      !(n.fetchData.url.match(/sentry_key/) && n.fetchData.method === "POST")
    )
      if (n.error) {
        const o = n.fetchData,
          i = {
            data: n.error,
            input: n.args,
            startTimestamp: r,
            endTimestamp: s,
          };
        ke({ category: "fetch", data: o, level: "error", type: "http" }, i);
      } else {
        const o = n.response,
          i = { ...n.fetchData, status_code: o && o.status },
          a = {
            input: n.args,
            response: o,
            startTimestamp: r,
            endTimestamp: s,
          },
          c = Us(i.status_code);
        ke({ category: "fetch", data: i, type: "http", level: c }, a);
      }
  };
}
function Ed(e) {
  return function (n) {
    if (w() !== e) return;
    let r = n.from,
      s = n.to;
    const o = Ee(S.location.href);
    let i = r ? Ee(r) : void 0;
    const a = Ee(s);
    (!i || !i.path) && (i = o),
      o.protocol === a.protocol && o.host === a.host && (s = a.relative),
      o.protocol === i.protocol && o.host === i.host && (r = i.relative),
      ke({ category: "navigation", data: { from: r, to: s } });
  };
}
function bd(e) {
  return !!e && !!e.target;
}
const Td = [
    "EventTarget",
    "Window",
    "Node",
    "ApplicationCache",
    "AudioTrackList",
    "BroadcastChannel",
    "ChannelMergerNode",
    "CryptoOperation",
    "EventSource",
    "FileReader",
    "HTMLUnknownElement",
    "IDBDatabase",
    "IDBRequest",
    "IDBTransaction",
    "KeyOperation",
    "MediaController",
    "MessagePort",
    "ModalWindow",
    "Notification",
    "SVGElementInstance",
    "Screen",
    "SharedWorker",
    "TextTrack",
    "TextTrackCue",
    "TextTrackList",
    "WebSocket",
    "WebSocketWorker",
    "Worker",
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "XMLHttpRequestUpload",
  ],
  wd = "BrowserApiErrors",
  vd = (e = {}) => {
    const t = {
      XMLHttpRequest: !0,
      eventTarget: !0,
      requestAnimationFrame: !0,
      setInterval: !0,
      setTimeout: !0,
      ...e,
    };
    return {
      name: wd,
      setupOnce() {
        t.setTimeout && z(S, "setTimeout", jr),
          t.setInterval && z(S, "setInterval", jr),
          t.requestAnimationFrame && z(S, "requestAnimationFrame", kd),
          t.XMLHttpRequest &&
            "XMLHttpRequest" in S &&
            z(XMLHttpRequest.prototype, "send", Rd);
        const n = t.eventTarget;
        n && (Array.isArray(n) ? n : Td).forEach(Ad);
      },
    };
  },
  Id = vd;
function jr(e) {
  return function (...t) {
    const n = t[0];
    return (
      (t[0] = je(n, {
        mechanism: {
          data: { function: ie(e) },
          handled: !1,
          type: "instrument",
        },
      })),
      e.apply(this, t)
    );
  };
}
function kd(e) {
  return function (t) {
    return e.apply(this, [
      je(t, {
        mechanism: {
          data: { function: "requestAnimationFrame", handler: ie(e) },
          handled: !1,
          type: "instrument",
        },
      }),
    ]);
  };
}
function Rd(e) {
  return function (...t) {
    const n = this;
    return (
      ["onload", "onerror", "onprogress", "onreadystatechange"].forEach((s) => {
        s in n &&
          typeof n[s] == "function" &&
          z(n, s, function (o) {
            const i = {
                mechanism: {
                  data: { function: s, handler: ie(o) },
                  handled: !1,
                  type: "instrument",
                },
              },
              a = Mn(o);
            return a && (i.mechanism.data.handler = ie(a)), je(o, i);
          });
      }),
      e.apply(this, t)
    );
  };
}
function Ad(e) {
  const n = S[e],
    r = n && n.prototype;
  !r ||
    !r.hasOwnProperty ||
    !r.hasOwnProperty("addEventListener") ||
    (z(r, "addEventListener", function (s) {
      return function (o, i, a) {
        try {
          Pd(i) &&
            (i.handleEvent = je(i.handleEvent, {
              mechanism: {
                data: { function: "handleEvent", handler: ie(i), target: e },
                handled: !1,
                type: "instrument",
              },
            }));
        } catch (c) {}
        return s.apply(this, [
          o,
          je(i, {
            mechanism: {
              data: { function: "addEventListener", handler: ie(i), target: e },
              handled: !1,
              type: "instrument",
            },
          }),
          a,
        ]);
      };
    }),
    z(r, "removeEventListener", function (s) {
      return function (o, i, a) {
        try {
          const c = i.__sentry_wrapped__;
          c && s.call(this, o, c, a);
        } catch (c) {}
        return s.call(this, o, i, a);
      };
    }));
}
function Pd(e) {
  return typeof e.handleEvent == "function";
}
const Cd = "GlobalHandlers",
  Nd = (e = {}) => {
    const t = { onerror: !0, onunhandledrejection: !0, ...e };
    return {
      name: Cd,
      setupOnce() {
        Error.stackTraceLimit = 50;
      },
      setup(n) {
        t.onerror && (xd(n), Wr("onerror")),
          t.onunhandledrejection && (Dd(n), Wr("onunhandledrejection"));
      },
    };
  },
  Od = Nd;
function xd(e) {
  Kr((t) => {
    const { stackParser: n, attachStacktrace: r } = oo();
    if (w() !== e || qs()) return;
    const { msg: s, url: o, line: i, column: a, error: c } = t,
      u = Fd(Vn(n, c || s, void 0, r, !1), o, i, a);
    (u.level = "error"),
      Ns(u, {
        originalException: c,
        mechanism: { handled: !1, type: "onerror" },
      });
  });
}
function Dd(e) {
  Jr((t) => {
    const { stackParser: n, attachStacktrace: r } = oo();
    if (w() !== e || qs()) return;
    const s = Ld(t),
      o = Ln(s) ? Md(s) : Vn(n, s, void 0, r, !0);
    (o.level = "error"),
      Ns(o, {
        originalException: s,
        mechanism: { handled: !1, type: "onunhandledrejection" },
      });
  });
}
function Ld(e) {
  if (Ln(e)) return e;
  try {
    if ("reason" in e) return e.reason;
    if ("detail" in e && "reason" in e.detail) return e.detail.reason;
  } catch (t) {}
  return e;
}
function Md(e) {
  return {
    exception: {
      values: [
        {
          type: "UnhandledRejection",
          value: "Non-Error promise rejection captured with value: ".concat(
            String(e)
          ),
        },
      ],
    },
  };
}
function Fd(e, t, n, r) {
  const s = (e.exception = e.exception || {}),
    o = (s.values = s.values || []),
    i = (o[0] = o[0] || {}),
    a = (i.stacktrace = i.stacktrace || {}),
    c = (a.frames = a.frames || []),
    u = isNaN(parseInt(r, 10)) ? void 0 : r,
    l = isNaN(parseInt(n, 10)) ? void 0 : n,
    d = oe(t) && t.length > 0 ? t : ko();
  return (
    c.length === 0 &&
      c.push({ colno: u, filename: d, function: be, in_app: !0, lineno: l }),
    e
  );
}
function Wr(e) {
  te && m.log("Global Handler attached: ".concat(e));
}
function oo() {
  const e = w();
  return (
    (e && e.getOptions()) || { stackParser: () => [], attachStacktrace: !1 }
  );
}
const $d = () => ({
    name: "HttpContext",
    preprocessEvent(e) {
      if (!S.navigator && !S.location && !S.document) return;
      const t = (e.request && e.request.url) || (S.location && S.location.href),
        { referrer: n } = S.document || {},
        { userAgent: r } = S.navigator || {},
        s = {
          ...(e.request && e.request.headers),
          ...(n && { Referer: n }),
          ...(r && { "User-Agent": r }),
        },
        o = { ...e.request, ...(t && { url: t }), headers: s };
      e.request = o;
    },
  }),
  Hd = "cause",
  Ud = 5,
  Bd = "LinkedErrors",
  jd = (e = {}) => {
    const t = e.limit || Ud,
      n = e.key || Hd;
    return {
      name: Bd,
      preprocessEvent(r, s, o) {
        const i = o.getOptions();
        Ja(qn, i.stackParser, i.maxValueLength, n, t, r, s);
      },
    };
  },
  Wd = jd;
function qd(e) {
  return [Ua(), Ma(), Id(), md(), Od(), Wd(), sc(), $d()];
}
function Gd(e = {}) {
  const t = {
    defaultIntegrations: qd(),
    release:
      typeof __SENTRY_RELEASE__ == "string"
        ? __SENTRY_RELEASE__
        : S.SENTRY_RELEASE && S.SENTRY_RELEASE.id
        ? S.SENTRY_RELEASE.id
        : void 0,
    autoSessionTracking: !0,
    sendClientReports: !0,
  };
  return (
    e.defaultIntegrations == null && delete e.defaultIntegrations,
    { ...t, ...e }
  );
}
function Vd() {
  const e = typeof S.window < "u" && S;
  if (!e) return !1;
  const t = e.chrome ? "chrome" : "browser",
    n = e[t],
    r = n && n.runtime && n.runtime.id,
    s = (S.location && S.location.href) || "",
    o = [
      "chrome-extension:",
      "moz-extension:",
      "ms-browser-extension:",
      "safari-web-extension:",
    ],
    i = !!r && S === S.top && o.some((c) => s.startsWith("".concat(c, "//"))),
    a = typeof e.nw < "u";
  return !!r && !i && !a;
}
function zd(e = {}) {
  const t = Gd(e);
  if (!t.skipBrowserExtensionCheck && Vd()) {
    Re(() => {
      console.error(
        "[Sentry] You cannot run Sentry this way in a browser extension, check: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/"
      );
    });
    return;
  }
  te &&
    (Bs() ||
      m.warn(
        "No Fetch API detected. The Sentry SDK requires a Fetch API compatible environment to send events. Please add a Fetch API polyfill."
      ));
  const n = {
      ...t,
      stackParser: go(t.stackParser || ld),
      integrations: ha(t),
      transport: t.transport || Zu,
    },
    r = ba(Lc, n);
  return t.autoSessionTracking && Yd(), r;
}
function Yd() {
  if (typeof S.document > "u") {
    te &&
      m.warn(
        "Session tracking in non-browser environment with @sentry/browser is not supported."
      );
    return;
  }
  vr({ ignoreDuration: !0 }),
    Ir(),
    Xn(({ from: e, to: t }) => {
      e !== void 0 && e !== t && (vr({ ignoreDuration: !0 }), Ir());
    });
}
const qr = new WeakMap(),
  sn = new Map(),
  Ot = {
    traceFetch: !0,
    traceXHR: !0,
    enableHTTPTimings: !0,
    trackFetchStreamPerformance: !1,
  };
function Xd(e, t) {
  const {
      traceFetch: n,
      traceXHR: r,
      trackFetchStreamPerformance: s,
      shouldCreateSpanForRequest: o,
      enableHTTPTimings: i,
      tracePropagationTargets: a,
    } = {
      traceFetch: Ot.traceFetch,
      traceXHR: Ot.traceXHR,
      trackFetchStreamPerformance: Ot.trackFetchStreamPerformance,
      ...t,
    },
    c = typeof o == "function" ? o : (d) => !0,
    u = (d) => Qd(d, a),
    l = {};
  n &&
    (e.addEventProcessor(
      (d) => (
        d.type === "transaction" &&
          d.spans &&
          d.spans.forEach((f) => {
            if (f.op === "http.client") {
              const p = sn.get(f.span_id);
              p && ((f.timestamp = p / 1e3), sn.delete(f.span_id));
            }
          }),
        d
      )
    ),
    s &&
      hc((d) => {
        if (d.response) {
          const f = qr.get(d.response);
          f && d.endTimestamp && sn.set(f, d.endTimestamp);
        }
      }),
    js((d) => {
      const f = cc(d, c, u, l);
      if (
        (d.response &&
          d.fetchData.__span &&
          qr.set(d.response, d.fetchData.__span),
        f)
      ) {
        const p = io(d.fetchData.url),
          h = p ? Ee(p).host : void 0;
        f.setAttributes({ "http.url": p, "server.address": h });
      }
      i && f && Gr(f);
    })),
    r &&
      ro((d) => {
        const f = el(d, c, u, l);
        i && f && Gr(f);
      });
}
function Kd(e) {
  return (
    e.entryType === "resource" &&
    "initiatorType" in e &&
    typeof e.nextHopProtocol == "string" &&
    (e.initiatorType === "fetch" || e.initiatorType === "xmlhttprequest")
  );
}
function Gr(e) {
  const { url: t } = T(e).data || {};
  if (!t || typeof t != "string") return;
  const n = rt("resource", ({ entries: r }) => {
    r.forEach((s) => {
      Kd(s) &&
        s.name.endsWith(t) &&
        (Zd(s).forEach((i) => e.setAttribute(...i)), setTimeout(n));
    });
  });
}
function Jd(e) {
  let t = "unknown",
    n = "unknown",
    r = "";
  for (const s of e) {
    if (s === "/") {
      [t, n] = e.split("/");
      break;
    }
    if (!isNaN(Number(s))) {
      (t = r === "h" ? "http" : r), (n = e.split(r)[1]);
      break;
    }
    r += s;
  }
  return r === e && (t = r), { name: t, version: n };
}
function Q(e = 0) {
  return ((q || performance.timeOrigin) + e) / 1e3;
}
function Zd(e) {
  const { name: t, version: n } = Jd(e.nextHopProtocol),
    r = [];
  return (
    r.push(["network.protocol.version", n], ["network.protocol.name", t]),
    q
      ? [
          ...r,
          ["http.request.redirect_start", Q(e.redirectStart)],
          ["http.request.fetch_start", Q(e.fetchStart)],
          ["http.request.domain_lookup_start", Q(e.domainLookupStart)],
          ["http.request.domain_lookup_end", Q(e.domainLookupEnd)],
          ["http.request.connect_start", Q(e.connectStart)],
          ["http.request.secure_connection_start", Q(e.secureConnectionStart)],
          ["http.request.connection_end", Q(e.connectEnd)],
          ["http.request.request_start", Q(e.requestStart)],
          ["http.request.response_start", Q(e.responseStart)],
          ["http.request.response_end", Q(e.responseEnd)],
        ]
      : r
  );
}
function Qd(e, t) {
  const n = S.location && S.location.href;
  if (n) {
    let r, s;
    try {
      (r = new URL(e, n)), (s = new URL(n).origin);
    } catch (i) {
      return !1;
    }
    const o = r.origin === s;
    return t ? _e(r.toString(), t) || (o && _e(r.pathname, t)) : o;
  } else {
    const r = !!e.match(/^\/(?!\/)/);
    return t ? _e(e, t) : r;
  }
}
function el(e, t, n, r) {
  const s = e.xhr,
    o = s && s[Le];
  if (!s || s.__sentry_own_request__ || !o) return;
  const i = fe() && t(o.url);
  if (e.endTimestamp && i) {
    const d = s.__sentry_xhr_span_id__;
    if (!d) return;
    const f = r[d];
    f &&
      o.status_code !== void 0 &&
      (cs(f, o.status_code), f.end(), delete r[d]);
    return;
  }
  const a = io(o.url),
    c = a ? Ee(a).host : void 0,
    u = !!H(),
    l =
      i && u
        ? at({
            name: "".concat(o.method, " ").concat(o.url),
            attributes: {
              type: "xhr",
              "http.method": o.method,
              "http.url": a,
              url: o.url,
              "server.address": c,
              [D]: "auto.http.browser",
              [Ie]: "http.client",
            },
          })
        : new Ne();
  return (
    (s.__sentry_xhr_span_id__ = l.spanContext().spanId),
    (r[s.__sentry_xhr_span_id__] = l),
    n(o.url) && tl(s, fe() && u ? l : void 0),
    l
  );
}
function tl(e, t) {
  const { "sentry-trace": n, baggage: r } = Fs({ span: t });
  n && nl(e, n, r);
}
function nl(e, t, n) {
  try {
    e.setRequestHeader("sentry-trace", t),
      n && e.setRequestHeader("baggage", n);
  } catch (r) {}
}
function io(e) {
  try {
    return new URL(e, S.location.origin).href;
  } catch (t) {
    return;
  }
}
function rl() {
  S && S.document
    ? S.document.addEventListener("visibilitychange", () => {
        const e = H();
        if (!e) return;
        const t = $(e);
        if (S.document.hidden && t) {
          const n = "cancelled",
            { op: r, status: s } = T(t);
          te &&
            m.log(
              "[Tracing] Transaction: "
                .concat(n, " -> since tab moved to the background, op: ")
                .concat(r)
            ),
            s || t.setStatus({ code: O, message: n }),
            t.setAttribute("sentry.cancellation_reason", "document.hidden"),
            t.end();
        }
      })
    : te &&
      m.warn(
        "[Tracing] Could not set up background tab detection due to lack of global document"
      );
}
const sl = "BrowserTracing",
  ol = {
    ...Pt,
    instrumentNavigation: !0,
    instrumentPageLoad: !0,
    markBackgroundSpan: !0,
    enableLongTask: !0,
    enableLongAnimationFrame: !0,
    enableInp: !0,
    _experiments: {},
    ...Ot,
  },
  il = (e = {}) => {
    ci();
    const {
        enableInp: t,
        enableLongTask: n,
        enableLongAnimationFrame: r,
        _experiments: { enableInteractions: s, enableStandaloneClsSpans: o },
        beforeStartSpan: i,
        idleTimeout: a,
        finalTimeout: c,
        childSpanTimeout: u,
        markBackgroundSpan: l,
        traceFetch: d,
        traceXHR: f,
        trackFetchStreamPerformance: p,
        shouldCreateSpanForRequest: h,
        enableHTTPTimings: _,
        instrumentPageLoad: v,
        instrumentNavigation: G,
      } = { ...ol, ...e },
      V = wu({ recordClsStandaloneSpans: o || !1 });
    t && Xu(),
      r &&
      b.PerformanceObserver &&
      PerformanceObserver.supportedEntryTypes &&
      PerformanceObserver.supportedEntryTypes.includes("long-animation-frame")
        ? Iu()
        : n && vu(),
      s && ku();
    const L = { name: void 0, source: void 0 };
    function Z(k, E) {
      const P = E.op === "pageload",
        j = i ? i(E) : E,
        A = j.attributes || {};
      E.name !== j.name && ((A[se] = "custom"), (j.attributes = A)),
        (L.name = j.name),
        (L.source = A[se]);
      const N = Cs(j, {
        idleTimeout: a,
        finalTimeout: c,
        childSpanTimeout: u,
        disableAutoFinish: P,
        beforeSpanEnd: (R) => {
          V(), Nu(R, { recordClsOnPageloadSpan: !o });
        },
      });
      function U() {
        ["interactive", "complete"].includes(S.document.readyState) &&
          k.emit("idleSpanEnableAutoFinish", N);
      }
      return (
        P &&
          S.document &&
          (S.document.addEventListener("readystatechange", () => {
            U();
          }),
          U()),
        N
      );
    }
    return {
      name: sl,
      afterAllSetup(k) {
        let E,
          P = S.location && S.location.href;
        function j() {
          E &&
            !T(E).timestamp &&
            (te &&
              m.log(
                "[Tracing] Finishing current active span with op: ".concat(
                  T(E).op
                )
              ),
            E.end());
        }
        k.on("startNavigationSpan", (A) => {
          w() === k && (j(), (E = Z(k, { op: "navigation", ...A })));
        }),
          k.on("startPageLoadSpan", (A, N = {}) => {
            if (w() !== k) return;
            j();
            const U = N.sentryTrace || Vr("sentry-trace"),
              R = N.baggage || Vr("baggage"),
              xe = ti(U, R);
            I().setPropagationContext(xe), (E = Z(k, { op: "pageload", ...A }));
          }),
          k.on("spanEnd", (A) => {
            const N = T(A).op;
            if (A !== $(A) || (N !== "navigation" && N !== "pageload")) return;
            const U = I(),
              R = U.getPropagationContext();
            U.setPropagationContext({
              ...R,
              sampled: R.sampled !== void 0 ? R.sampled : Ce(A),
              dsc: R.dsc || Ge(A),
            });
          }),
          S.location &&
            (v &&
              al(k, {
                name: S.location.pathname,
                startTime: q ? q / 1e3 : void 0,
                attributes: { [se]: "url", [D]: "auto.pageload.browser" },
              }),
            G &&
              Xn(({ to: A, from: N }) => {
                if (N === void 0 && P && P.indexOf(A) !== -1) {
                  P = void 0;
                  return;
                }
                N !== A &&
                  ((P = void 0),
                  cl(k, {
                    name: S.location.pathname,
                    attributes: { [se]: "url", [D]: "auto.navigation.browser" },
                  }));
              })),
          l && rl(),
          s && ul(a, c, u, L),
          t && Ju(),
          Xd(k, {
            traceFetch: d,
            traceXHR: f,
            trackFetchStreamPerformance: p,
            tracePropagationTargets: k.getOptions().tracePropagationTargets,
            shouldCreateSpanForRequest: h,
            enableHTTPTimings: _,
          });
      },
    };
  };
function al(e, t, n) {
  e.emit("startPageLoadSpan", t, n), I().setTransactionName(t.name);
  const r = H();
  return (r && T(r).op) === "pageload" ? r : void 0;
}
function cl(e, t) {
  Pe().setPropagationContext({ traceId: nt() }),
    I().setPropagationContext({ traceId: nt() }),
    e.emit("startNavigationSpan", t),
    I().setTransactionName(t.name);
  const n = H();
  return (n && T(n).op) === "navigation" ? n : void 0;
}
function Vr(e) {
  const t = Ro("meta[name=".concat(e, "]"));
  return t ? t.getAttribute("content") : void 0;
}
function ul(e, t, n, r) {
  let s;
  const o = () => {
    const i = "ui.action.click",
      a = H(),
      c = a && $(a);
    if (c) {
      const u = T(c).op;
      if (["navigation", "pageload"].includes(u)) {
        te &&
          m.warn(
            "[Tracing] Did not create ".concat(
              i,
              " span because a pageload or navigation span is in progress."
            )
          );
        return;
      }
    }
    if (
      (s &&
        (s.setAttribute(fn, "interactionInterrupted"), s.end(), (s = void 0)),
      !r.name)
    ) {
      te &&
        m.warn(
          "[Tracing] Did not create ".concat(
            i,
            " transaction because _latestRouteName is missing."
          )
        );
      return;
    }
    s = Cs(
      { name: r.name, op: i, attributes: { [se]: r.source || "url" } },
      { idleTimeout: e, finalTimeout: t, childSpanTimeout: n }
    );
  };
  S.document && addEventListener("click", o, { once: !1, capture: !0 });
}
zd({
  dsn: "https://167353bb7c5141308b120e473e8f9ce0@o494432.ingest.sentry.io/4505034569089024",
  integrations: [il()],
  tracesSampleRate: 0.1,
});
function Kn(e) {
  let t = new URL(e);
  return (
    (e = t.origin),
    e.match(/^https?:\/\/localhost/) || e.match(/^https?:\/\/127\.0\.0\.1/)
      ? (n, r) => e + r
      : e.match(/^https?:\/\/portal\./)
      ? (n, r) => e.replace("://portal.", "://" + n + ".") + r
      : (n, r) => t.protocol + "//" + n + "." + "secured-entry.com" + r
  );
}
function dl(e) {
  let n = new URL(e).hostname;
  return n.match(/([^.]+\.)?secfwddv.com/)
    ? "dev"
    : n.match(/([^.]+\.)?secfwdqa.com/)
    ? "qa"
    : "prod";
}
function Pn(e, t, n, r) {
  let s = n + ":";
  return (
    r instanceof Error
      ? (s = s + encodeURIComponent(r.message))
      : (s = s + "unknown"),
    t("click", "/v1/results/" + e + "/error?emsg=" + encodeURIComponent(s))
  );
}
function ll(e, t) {
  return t("click", "/v1/results/" + e + "/timeout");
}
function Je(e, t, n) {
  let r = new Date(),
    s,
    o = new Promise((i, a) => {
      s = setTimeout(() => a("generic timeout"), 5e3);
    });
  return (
    (n = Promise.race([n, o]).finally(() => s && clearTimeout(s))),
    new Promise((i) => {
      Hi({ op: "promise", name: t != null ? t : "unnamed promise" }, (a) => {
        n.then((c) => {
          t != null ? i({ key: t, value: { 2: c } }) : i(void 0);
        })
          .catch((c) => {
            a == null || a.setStatus("unknown_error");
            let u = c;
            u instanceof Error
              ? (u = u.message)
              : typeof u == "string" ||
                u instanceof String ||
                (u = JSON.stringify(c)),
              t != null ? i({ key: t, value: { 1: u } }) : i(void 0);
          })
          .finally(() => {
            a == null || a.end(),
              window.location.hash === "#debug" &&
                console.log(
                  ""
                    .concat(e, " took ")
                    .concat(new Date().getTime() - r.getTime(), "ms")
                );
          });
      });
    })
  );
}
async function fl(e, t, n, r, s) {
  const o = e("click", "/v1/results/" + t + window.location.search),
    i = await pl(t, r, 2),
    a = {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(n)),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Hashcash": i,
      },
      signal: void 0,
      credentials: "include",
    },
    c = async () => {
      let d;
      typeof AbortController < "u" &&
        ((d = new AbortController()), (a.signal = d.signal));
      const f = 4500;
      try {
        const p = await ao(fetch(o, a), f);
        if (!p.ok) throw new Error(p.statusText);
        return p.json();
      } catch (p) {
        throw (d && d.abort(), p);
      }
    };
  let u = 0;
  const l = 500;
  for (; u <= s; )
    try {
      return await c();
    } catch (d) {
      if (u === s) throw d;
      const f = l * Math.pow(2, u);
      await new Promise((p) => setTimeout(p, f)), u++;
    }
  throw new Error("Failed to post results after retries.");
}
function ao(e, t) {
  let n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("timed out"));
    }, t);
  });
  return Promise.race([e, n]);
}
async function pl(e, t, n) {
  const r = "H:"
    .concat(n, ":")
    .concat(Math.floor(Date.now() / 1e3), ":")
    .concat(e, ":")
    .concat(btoa(t), ":SHA-256");
  return ml(r, n);
}
async function ml(e, t) {
  const n = new TextEncoder();
  let r = 0;
  for (;;) {
    const s = "".concat(e, ":").concat(btoa(r.toString())),
      o = await crypto.subtle.digest("SHA-256", n.encode(s));
    if (
      Array.from(new Uint8Array(o))
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("")
        .startsWith("0".repeat(t))
    )
      return s;
    r++;
  }
}
function hl(e, t, n, r) {
  return new Promise((s) => {
    const o = new Image();
    (o.onerror = function () {
      (o.onerror = null), s();
    }),
      (o.src = gl(e, t)),
      r == null || r.addEventListener("abort", () => s());
  });
}
function gl(e, t) {
  switch (e) {
    case "dev":
      return "https://".concat(t, "-rlv.secfwddnsdv.com");
    case "qa":
      return "https://".concat(t, "-rlv.secfwddnsqa.com");
    default:
      return "https://".concat(t, "-rlv.yourlast.click");
  }
}
function _l(e, t) {
  return new Promise((n, r) => {
    const s = new Map(),
      o = [{ urls: "stun:stun.l.google.com:19302" }],
      i = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
    let a;
    try {
      let c =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      if (!c) {
        r(new Error("WebRTC not supported"));
        return;
      }
      const u = new c({ iceServers: o }),
        l = () => {
          a !== void 0 && clearTimeout(a),
            u.close(),
            n({ i: Object.fromEntries(s) });
        };
      (u.onicecandidate = (d) => {
        var f, p, h;
        (h =
          (p =
            (f = d == null ? void 0 : d.candidate) == null
              ? void 0
              : f.candidate) == null
            ? void 0
            : p.match(i)) == null ||
          h.forEach((_) => {
            _ !== "0.0.0.0" && (s.set(_, !0), l());
          });
      }),
        (u.onicegatheringstatechange = () => {
          u.iceGatheringState === "complete" &&
            (a !== void 0 && clearTimeout(a), l());
        }),
        u.createDataChannel(""),
        u.createOffer().then((d) => u.setLocalDescription(d)),
        t == null || t.addEventListener("abort", () => l()),
        e && (a = setTimeout(l, 2e3));
    } catch (c) {
      a !== void 0 && clearTimeout(a), r(c);
    }
  });
}
function yl(e, t) {
  return new Promise((n) => {
    let s, o;
    typeof AbortController < "u" &&
      ((s = new AbortController()), (o = s.signal));
    const i = setTimeout(() => {
        s !== void 0 && s.abort();
      }, 500),
      a = t + "/v2/" + e;
    fetch(a, { signal: o, headers: { "X-SecuredForward": "1" } })
      .then(() => {
        clearTimeout(i), n();
      })
      .catch(() => {
        clearTimeout(i), n();
      });
  });
}
function Sl(e, t) {
  return new Promise((n, r) => {
    let s = setTimeout(() => {
      r("websocket timeout");
    }, 1500);
    const o = () => {
        clearTimeout(s), n();
      },
      i = (c) => {
        clearTimeout(s), Ft(c), r(c);
      };
    if ("WebSocket" in window) {
      const c = co(t, "/v2/" + e, !0),
        u = new WebSocket(c);
      El(u)
        .then(o)
        .catch((l) => {
          Ft(l), Cn(t, e).then(o).catch(i);
        });
    } else Cn(t, e).then(o).catch(i);
  });
}
function co(e, t, n) {
  if (n) {
    const r = e.startsWith("https") ? "wss://" : "ws://",
      s = new URL(e),
      o = s.hostname,
      i = s.port ? ":".concat(s.port) : "";
    return "".concat(r).concat(o).concat(i).concat(t);
  } else return "".concat(e).concat(t);
}
function Cn(e, t) {
  const n = co(e, "/v2/" + t, !1);
  return fetch(n, { headers: { "X-SecuredForward": "1" } });
}
function El(e) {
  return new Promise((t, n) => {
    (e.onmessage = (r) => {
      e.send(r.data);
    }),
      (e.onclose = () => {
        t();
      }),
      (e.onerror = (r) => {
        e.close(), n(r);
      });
  });
}
function bl() {
  try {
    let e = function (p) {
      let h = !1;
      for (const _ of n)
        if (
          ((a.style.fontFamily = '"'.concat(p, '",').concat(_)),
          a.offsetWidth !== c[_].width || a.offsetHeight !== c[_].height)
        ) {
          h = !0;
          break;
        }
      return h;
    };
    const t = [
        { name: "Calibri", os: "Windows", weight: 9 },
        { name: "Cambria", os: "Windows", weight: 9 },
        { name: "Segoe UI", os: "Windows", weight: 9 },
        { name: "Consolas", os: "Windows", weight: 8 },
        { name: "Candara", os: "Windows", weight: 7 },
        { name: "Helvetica Neue", os: "Mac", weight: 9 },
        { name: "Lucida Grande", os: "Mac", weight: 9 },
        { name: "San Francisco", os: "Mac", weight: 9 },
        { name: "Monaco", os: "Mac", weight: 8 },
        { name: "Geneva", os: "Mac", weight: 7 },
        { name: "DejaVu Sans", os: "Linux", weight: 9 },
        { name: "Ubuntu", os: "Linux", weight: 8 },
        { name: "Liberation Sans", os: "Linux", weight: 7 },
        { name: "Fira Sans", os: "Linux", weight: 6 },
        { name: "Cantarell", os: "Linux", weight: 6 },
        { name: "Roboto", os: "Android", weight: 9 },
        { name: "Droid Sans", os: "Android", weight: 8 },
        { name: "Noto Sans", os: "Android", weight: 7 },
        { name: "Droid Serif", os: "Android", weight: 6 },
        { name: "San Francisco", os: "iOS", weight: 9 },
        { name: "Helvetica Neue", os: "iOS", weight: 8 },
        { name: "Arial", os: "iOS", weight: 7 },
        { name: "Gill Sans", os: "iOS", weight: 6 },
        { name: "Futura", os: "iOS", weight: 6 },
        { name: "Arial", os: ["Windows", "Mac", "Linux"], weight: 3 },
        { name: "Times New Roman", os: ["Windows", "Mac", "Linux"], weight: 3 },
        { name: "Courier New", os: ["Windows", "Mac", "Linux"], weight: 2 },
        { name: "Georgia", os: ["Windows", "Mac"], weight: 2 },
        { name: "Verdana", os: ["Windows", "Mac"], weight: 2 },
      ],
      n = ["monospace", "sans-serif", "serif"],
      r = "mmmmmmmmmmlli",
      s = "72px",
      o = document.body,
      i = document.createElement("div"),
      a = document.createElement("span");
    (i.style.position = "absolute"),
      (i.style.left = "-10000px"),
      (i.style.top = "-10000px"),
      o.appendChild(i),
      (a.style.fontSize = s),
      (a.innerHTML = r),
      i.appendChild(a);
    const c = {};
    for (const p of n)
      (a.style.fontFamily = p),
        (c[p] = { width: a.offsetWidth, height: a.offsetHeight });
    const u = {};
    for (const p of t)
      if (e(p.name)) {
        const h = Array.isArray(p.os) ? p.os : [p.os];
        for (const _ of h) u[_] = (u[_] || 0) + p.weight;
      }
    o.removeChild(i);
    let l = null,
      d = 0;
    for (const p in u) u[p] > d && ((l = p), (d = u[p]));
    return { maxOs: l, osCounter: u };
  } catch (e) {
    return { maxOs: null, osCounter: {} };
  }
}
const on = navigator;
function Tl() {
  return new Promise((e, t) => {
    var r;
    if (!on.userAgentData || !on.userAgentData.getHighEntropyValues) {
      t(new Error("UserAgentData is not available"));
      return;
    }
    const n = [
      "architecture",
      "bitness",
      "brands",
      "fullVersionList",
      "mobile",
      "model",
      "platform",
      "platformVersion",
      "uaFullVersion",
      "wow64",
    ];
    (r = on.userAgentData) == null ||
      r
        .getHighEntropyValues(n)
        .then((s) => {
          const o = {
            a: s.architecture,
            b: s.bitness,
            br: s.brands,
            f: s.fullVersionList,
            m: s.mobile,
            mo: s.model,
            p: s.platform,
            pv: s.platformVersion,
            uf: s.uaFullVersion,
            w: s.wow64,
          };
          e(o);
        })
        .catch((s) => {
          t(s);
        });
  });
}
function wl() {
  try {
    const e = window.screen.width,
      t = window.screen.height,
      n = document.createElement("div");
    (n.style.width = "100vw"),
      (n.style.height = "100vh"),
      document.body.appendChild(n);
    const r = n.offsetWidth,
      s = n.offsetHeight,
      o = window.devicePixelRatio || 1,
      i = r * o,
      a = s * o,
      c = window.innerWidth,
      u = window.innerHeight,
      l = window.screen.availWidth,
      d = window.screen.availHeight,
      f = {
        bsr: "".concat(e, "x").concat(t),
        rsr: "".concat(i, "x").concat(a),
        wsr: "".concat(c, "x").concat(u),
        srdw: Math.abs(e - i),
        srdh: Math.abs(t - a),
        asr: "".concat(l, "x").concat(d),
      };
    return document.body.removeChild(n), f;
  } catch (e) {
    return;
  }
}
function vl() {
  const e = navigator;
  return new Promise((t, n) => {
    var r;
    if (!e.bluetooth || !e.bluetooth.getAvailability) {
      n(new Error("Bluetooth is not available"));
      return;
    }
    (r = e.bluetooth) == null ||
      r
        .getAvailability()
        .then((s) => {
          t(s);
        })
        .catch((s) => {
          n(s);
        });
  });
}
function Il() {
  try {
    const e = window.speechSynthesis.getVoices();
    return e.length === 0 ? !1 : e.some((t) => /^google/i.test(t.name));
  } catch (e) {
    return !1;
  }
}
const zr = {
  NotAllowedError: "Permission to access sensor was denied.",
  NotReadableError: "Cannot connect to the sensor.",
  SecurityError: "Sensor construction was blocked by the Permissions Policy.",
  ReferenceError: "Sensor is not supported by the User Agent.",
};
function kl() {
  return new Promise((e) => {
    const t = {
      AccelerometerSupported: !1,
      AccelerometerExceptionString: null,
      AccelerometerCoordinates: null,
    };
    if (!("Accelerometer" in window)) {
      e(t);
      return;
    }
    t.AccelerometerSupported = !0;
    let n = null;
    try {
      (n = new Accelerometer({ frequency: 10 })),
        (n.onerror = (s) => {
          const o = s.error;
          (t.AccelerometerExceptionString = zr[o.name] || o.message), r(), e(t);
        }),
        (n.onreading = () => {
          n &&
            ((t.AccelerometerCoordinates = { X: n.x, Y: n.y, Z: n.z }),
            r(),
            e(t));
        }),
        n.start();
    } catch (s) {
      const o = s;
      (t.AccelerometerExceptionString = zr[o.name] || o.toString()), r(), e(t);
    }
    function r() {
      n && (n.stop(), (n = null));
    }
    setTimeout(() => {
      !t.AccelerometerCoordinates &&
        !t.AccelerometerExceptionString &&
        ((t.AccelerometerExceptionString = "Sensor reading timed out."),
        r(),
        e(t));
    }, 1e3);
  });
}
function Rl() {
  const e = {
    HasError: !1,
    ExceptionString: null,
    Vendor: null,
    Renderer: null,
  };
  var t = document.createElement("canvas"),
    n = null;
  try {
    n = t.getContext("webgl") || t.getContext("webgl2");
  } catch (s) {
    return (e.HasError = !0), (e.ExceptionString = s.toString()), e;
  }
  if (n === null)
    return (e.HasError = !0), (e.ExceptionString = "WebGL not supported"), e;
  const r = n.getExtension("WEBGL_debug_renderer_info");
  return r === null
    ? ((e.HasError = !0),
      (e.ExceptionString = "WEBGL_debug_renderer_info not supported"),
      e)
    : ((e.Vendor = "".concat(n.getParameter(r.UNMASKED_VENDOR_WEBGL))),
      (e.Renderer = n.getParameter(r.UNMASKED_RENDERER_WEBGL)),
      e);
}
function Al() {
  return new Promise((e) => {
    const t = navigator,
      n = {
        ua: t.userAgent,
        uad: void 0,
        hl: window.history.length,
        c: void 0,
        ce: t.cookieEnabled,
        dm: t.deviceMemory,
        cf: void 0,
        hc: t.hardwareConcurrency,
        l: t.language,
        ls: t.languages,
        mtp: t.maxTouchPoints,
        o: t.onLine,
        pve: t.pdfViewerEnabled,
        klm: void 0,
        bc: void 0,
        dt: void 0,
        tz:
          typeof Intl < "u" && typeof Intl.DateTimeFormat == "function"
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "unknown",
        npl: t.plugins && "length" in t.plugins ? t.plugins.length : void 0,
        mtpl:
          t.mimeTypes && "length" in t.mimeTypes ? t.mimeTypes.length : void 0,
        dvr: window.devicePixelRatio,
        ischr: "chrome" in window,
        pltf: "platform" in t ? t.platform : void 0,
        fd: bl(),
        sr: wl(),
        bt: !1,
        gv: Il(),
        wglur: Rl(),
        gsa: void 0,
        prm:
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        wa: "WebSocket" in window && window.WebSocket != null,
      };
    if (
      (t.gpu &&
        typeof t.gpu.getPreferredCanvasFormat == "function" &&
        (n.cf = t.gpu.getPreferredCanvasFormat()),
      t.connection)
    ) {
      const { connection: l } = t;
      n.c = {
        d: "downlink" in l ? l.downlink : 0,
        dm: "downlinkMax" in l ? l.downlinkMax : 0,
        et: "effectiveType" in l ? l.effectiveType : "",
        rtt: "rtt" in l ? l.rtt : 0,
        sd: "saveData" in l ? l.saveData : !1,
        t: "type" in l ? l.type : "",
      };
    }
    const r = kl().then((l) => {
        n.gsa = l;
      }),
      s = new Promise((l, d) => {
        t.keyboard
          ? t.keyboard
              .getLayoutMap()
              .then((f) => {
                (n.klm = Array.from(f.entries())), l();
              })
              .catch((f) => {
                d(f);
              })
          : d(new Error("Keyboard not supported"));
      }),
      o = new Promise((l, d) => {
        t.getBattery
          ? t
              .getBattery()
              .then((f) => {
                (n.bc = f.charging), l();
              })
              .catch((f) => {
                d(f);
              })
          : d(new Error("battery not supported"));
      }),
      i = new Promise((l, d) => {
        try {
          if (window.Worker) {
            const f = new Worker(
              URL.createObjectURL(
                new Blob(
                  [
                    '"use strict";\n                    onmessage = (ev) => { postMessage({isOpenBeat:true});\n                        debugger;\n                        postMessage({isOpenBeat:false});\n                    };',
                  ],
                  { type: "text/javascript" }
                )
              )
            );
            let p = null;
            const _ = setTimeout(() => {
              f.terminate(),
                p !== null && clearTimeout(p),
                d(new Error("Worker timeout reached"));
            }, 1e3);
            f.postMessage({}),
              (f.onmessage = (v) => {
                clearTimeout(_),
                  v.data.isOpenBeat
                    ? (p = setTimeout(() => {
                        (n.dt = !0), f.terminate(), l();
                      }, 500))
                    : (p !== null && clearTimeout(p),
                      (n.dt = !1),
                      f.terminate(),
                      l());
              }),
              (f.onerror = () => {
                clearTimeout(_), d(new Error("Worker error"));
              });
          } else d(new Error("worker not supported"));
        } catch (f) {
          d(f);
        }
      }),
      a = new Promise((l, d) => {
        Tl()
          .then((f) => {
            (n.uad = f), l();
          })
          .catch((f) => {
            d(f);
          });
      }),
      c = new Promise((l, d) => {
        vl()
          .then((f) => {
            (n.bt = f), l();
          })
          .catch((f) => {
            d(f);
          });
      }),
      u = [s, o, i, a, c, r];
    Promise.allSettled(u).then(() => {
      e(n);
    });
  });
}
Object.fromEntries ||
  Object.defineProperty(Object, "fromEntries", {
    value(e) {
      if (!e || !e[Symbol.iterator])
        throw new Error(
          "Object.fromEntries() requires a single iterable argument"
        );
      const t = {};
      return (
        Object.keys(e).forEach((n) => {
          const [r, s] = e[n];
          t[r] = s;
        }),
        t
      );
    },
  });
function Pl(e) {
  return e
    ? new Promise((t) => {
        e.complete && t();
        let n = setTimeout(() => t(), 1500);
        e.addEventListener("load", () => {
          clearTimeout(n), t();
        }),
          e.addEventListener("error", () => {
            clearTimeout(n), t();
          });
      })
    : Promise.resolve();
}
function Cl(e, t = {}) {
  return new Promise((n) => {
    const {
      dataSizePerInterval: r = 64 * 1024,
      checkInterval: s = 50,
      maxRuntime: o = 2e3,
      minRuntime: i = 800,
      abortSignal: a,
    } = t;
    if (!("WebSocket" in window && window.WebSocket !== void 0)) {
      n(-1);
      return;
    }
    const u = new WebSocket(e);
    let l,
      d = 0,
      f = !1;
    function p() {
      try {
        u.close();
      } catch (V) {}
    }
    function h(V, L, Z) {
      let k = 0;
      L < 500
        ? (k = 0)
        : L < 1e3
        ? (k = (L - 500) / 5)
        : L < 1500
        ? (k = 75 + (L - 1e3) / 40)
        : (k = 90 + (Math.min(L, V) - 1500) / 100);
      const E = (L / s) * r,
        P = Math.min(Z / E, 3),
        j = Math.min((P - 1) * 25, 50),
        A = k / 100,
        N = j / 100,
        U = A + N - A * N;
      return Math.min(U * 100, 95);
    }
    function _() {
      f = !0;
    }
    a && a.addEventListener("abort", _);
    const v = setTimeout(() => {
      p(), n(h(o, o, d));
    }, o + 100);
    (u.onopen = () => {}),
      (u.onmessage = () => {
        (l = Date.now()), G();
      }),
      (u.onerror = () => {
        clearTimeout(v), p(), n(-2);
      });
    function G() {
      const V = new Uint8Array(r);
      u.send(V),
        (d += r),
        setTimeout(() => {
          if (u.bufferedAmount > 0) {
            clearTimeout(v), p(), n(0);
            return;
          }
          const Z = Date.now() - l;
          if (Z >= o || (Z >= i && f)) {
            clearTimeout(v);
            const k = h(o, Z, d);
            p(), n(k);
            return;
          }
          G();
        }, s);
    }
  });
}
function Nl(e) {
  return new Promise((t) => {
    const n = Date.now().toString().slice(-8),
      r = Math.random(),
      s = "https://secured-entry".concat(n, ".com?b=").concat(r),
      o = Date.now(),
      i = (a) => {
        t({ r: a, p: Date.now() - o });
      };
    if (
      (fetch(s, { signal: e })
        .then((a) => i("resolved"))
        .catch((a) => i("not-resolved")),
      e.addEventListener("abort", () => i("timeout")),
      e.aborted)
    ) {
      i("timeout");
      return;
    }
  });
}
function Ol(e, t, n) {
  return new Promise((r) => {
    const s = Date.now(),
      o = (u) => {
        r({ r: u, p: Date.now() - s });
      };
    let i = setTimeout(() => {
      o("timeout");
    }, 1500);
    const a = "".concat(t, ":").concat(n, "/v2/js/").concat(e);
    var c = document.createElement("script");
    c.setAttribute("src", a),
      document.head.appendChild(c),
      (c.onload = function () {
        if ((clearTimeout(i), document.getElementById(e))) return o("loaded");
        o("failed");
      });
  });
}
async function xl(e, t) {
  var n;
  try {
    const r = await Jn.create(e, t),
      s = new Promise((o, i) => {
        setTimeout(() => {
          i(new Error("timed out"));
        }, 20500);
      });
    return await Promise.race([r.fraudink(), s]);
  } catch (r) {
    try {
      (n = t.errorReporter) == null || n.call(t, r);
    } catch (i) {}
    let s = Kn(t.baseUrl),
      o = "";
    try {
      r.message == "timed out"
        ? (o = ll(e, s))
        : (o = Pn(e, s, "app_error", r));
    } finally {
      o == "" && (o = Pn(e, s, "app_error", r));
    }
    return { redirectURL: o };
  }
}
class Jn {
  constructor(t, n) {
    Y(this, "txId");
    Y(this, "urlFormatter");
    Y(this, "utrkrImgElement", null);
    Y(this, "env", "prod");
    Y(this, "mb");
    Y(this, "ucfg");
    Y(this, "utrkr");
    Y(this, "utrkrUncommonPort");
    Y(this, "utrkr6");
    Y(this, "wsurl");
    Y(this, "ard");
    var r;
    (this.txId = t),
      (this.urlFormatter = Kn(n.baseUrl)),
      (this.utrkrImgElement = (r = n.utrkrImgElement) != null ? r : null),
      (this.env = dl(n.baseUrl)),
      (this.mb = ""),
      (this.ucfg = this.urlFormatter("click", "/v1/config/" + this.txId)),
      (this.utrkr = this.urlFormatter("trkr", "")),
      (this.utrkr6 = this.urlFormatter("trkr6", "")),
      (this.wsurl = this.urlFormatter("tw", "/v1/ws")
        .replace("https:", "wss:")
        .replace("http:", "ws:")),
      (this.ard = ""),
      (this.utrkrUncommonPort = "22379"),
      this.isLocalhost() &&
        ((this.utrkr = this.utrkr.replace(":9001", ":8080")),
        (this.utrkr6 = this.utrkr6.replace(":9001", ":8080")));
  }
  static async create(t, n) {
    if (!t) throw new Error("txId is null or empty.");
    const r = new Jn(t, n);
    try {
      const s = await ao(r.fetchConfiguration(), 5500);
      return r.applyConfiguration(s), r;
    } catch (s) {
      throw s;
    }
  }
  async fraudink() {
    const t = [],
      n = [];
    let r = new AbortController(),
      s = new Map();
    t.push(Je("i6", null, yl(this.txId, this.utrkr6))),
      t.push(Je("trkr", null, Pl(this.utrkrImgElement)));
    const o = {
      a: { create: (d) => _l(!0, null), detach: !1 },
      c: { create: (d) => Al(), detach: !1 },
      d: { create: (d) => hl(this.env, this.txId, !1, d), detach: !0 },
      l: {
        create: () => Ol(this.txId, this.utrkr, this.utrkrUncommonPort),
        detach: !0,
      },
      e: { create: (d) => Sl(this.txId, this.utrkr), detach: !1 },
      z: {
        create: (d) => Cl(this.wsurl, { abortSignal: d, checkInterval: 100 }),
        detach: !0,
      },
      dr: { create: (d) => Nl(d), detach: !0 },
    };
    this.mb.includes("e") && t.push(Je("ws", null, Cn(this.utrkr, this.txId)));
    const i = () => Promise.reject("disabled");
    Object.entries(o).forEach((d) => {
      const [f, p] = d;
      if (this.mb.includes(f)) t.push(Je(f, f, i()));
      else {
        let h = Je(f, f, p.create(r.signal));
        p.detach ? n.push(h) : t.push(h);
      }
    });
    const a = await Promise.all(t);
    r.abort();
    const c = await Promise.all(n);
    [...a, ...c].forEach((d) => {
      d != null && (d.key == "d" || d.key == "e" || s.set(d.key, d.value));
    });
    const u = this.getCSRFToken();
    return {
      redirectURL: (await fl(this.urlFormatter, this.txId, s, u, 3)).data
        .redirect_url,
    };
  }
  getCSRFToken() {
    const t = document.querySelector('meta[name="csrf-token"]');
    return (t && t.getAttribute("content")) || "";
  }
  async fetchConfiguration() {
    if (this.isLocalhost()) return { data: { mb: "bfg" } };
    const t = document.getElementById("config");
    if (t) {
      const i = t.getAttribute("data-json");
      if (i)
        try {
          const a = JSON.parse(i);
          if (a) return a;
        } catch (a) {}
    }
    const n = (i) => new Promise((a) => setTimeout(a, i)),
      r = 2,
      s = [500, 1e3],
      o = {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };
    for (let i = 0; i <= r; i++)
      try {
        const a = await fetch(this.ucfg, o);
        if (!a.ok) throw new Error("Failed to fetch configuration");
        return await a.json();
      } catch (a) {
        if (i < r) await n(s[i]);
        else throw a;
      }
  }
  applyConfiguration(t) {
    var n, r, s, o;
    (this.mb = (n = t.data.mb) != null ? n : ""),
      (this.utrkr = (r = t.data.utrkr) != null ? r : this.utrkr),
      (this.utrkr6 = (s = t.data.utrkr6) != null ? s : this.utrkr6),
      (this.ard = (o = t.data.ard) != null ? o : ""),
      this.ard == "" && !this.mb.includes("f") && (this.mb = this.mb + "f");
  }
  isLocalhost() {
    return (
      window.location.hostname == "localhost" ||
      window.location.hostname == "127.0.0.1"
    );
  }
}
function Dl() {
  let t = /tx\/([a-zA-Z0-9-]+)/.exec(window.location.href);
  if (t != null && t.length === 2) return t[1];
  let r = /r\/[a-zA-Z0-9-]+\/([a-zA-Z0-9-]+)/.exec(window.location.href);
  return r != null && r.length === 2 ? r[1] : null;
}
const uo = window.location.host.startsWith("localhost")
    ? "http://localhost:9001"
    : window.location.origin,
  Bt = Dl();
let Nn = !1;
window.onerror = function (e) {
  if ((console.error("window error:", e), !Bt || Nn)) return !0;
  let t = Kn(uo),
    n = Pn(Bt, t, "window_error", e);
  return (Nn = !0), setTimeout(() => (window.location.href = n), 1e3), !0;
};
function Ll() {
  if (self !== top) {
    top.location = self.location;
    return;
  }
  if (!Bt) return;
  const e = {
    baseUrl: uo,
    errorReporter: (t) => Ft(t),
    utrkrImgElement: document.getElementById("trkrimg"),
  };
  xl(Bt, e).then(async (t) => {
    (Nn = !0), await aa(200), (window.location.href = t.redirectURL);
  });
}
Ll();
export { Fl as __vite_legacy_guard };
