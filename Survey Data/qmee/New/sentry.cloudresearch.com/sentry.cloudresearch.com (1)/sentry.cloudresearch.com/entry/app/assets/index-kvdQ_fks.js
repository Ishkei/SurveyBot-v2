const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/ua-parser.CfzgcIAC-B3T_oW8Y.js",
      "assets/_commonjsHelpers.C3AsgxGs-B-SmbmTK.js",
      "assets/index.CGqBXHsi-a3qaMEwt.js",
      "assets/GpuTests.DfBqPlOq-BbN1gj9N.js",
    ])
) => i.map((i) => d[i]);
var Qf = Object.defineProperty;
var Jf = (t, e, n) =>
  e in t
    ? Qf(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (t[e] = n);
var Xf = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var $ = (t, e, n) => Jf(t, typeof e != "symbol" ? e + "" : e, n);
var tT = Xf((It, Ct) => {
  (function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
      r(s);
    new MutationObserver((s) => {
      for (const i of s)
        if (i.type === "childList")
          for (const a of i.addedNodes)
            a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(s) {
      const i = {};
      return (
        s.integrity && (i.integrity = s.integrity),
        s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
        s.crossOrigin === "use-credentials"
          ? (i.credentials = "include")
          : s.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
        i
      );
    }
    function r(s) {
      if (s.ep) return;
      s.ep = !0;
      const i = n(s);
      fetch(s.href, i);
    }
  })();
  /**
   * @vue/shared v3.4.15
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ function ba(t, e) {
    const n = new Set(t.split(","));
    return e ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r);
  }
  const de = {},
    Rn = [],
    Ye = () => {},
    ed = () => !1,
    Rs = (t) =>
      t.charCodeAt(0) === 111 &&
      t.charCodeAt(1) === 110 &&
      (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97),
    va = (t) => t.startsWith("onUpdate:"),
    Fe = Object.assign,
    wa = (t, e) => {
      const n = t.indexOf(e);
      n > -1 && t.splice(n, 1);
    },
    td = Object.prototype.hasOwnProperty,
    ne = (t, e) => td.call(t, e),
    U = Array.isArray,
    jn = (t) => Pr(t) === "[object Map]",
    js = (t) => Pr(t) === "[object Set]",
    Eo = (t) => Pr(t) === "[object Date]",
    W = (t) => typeof t == "function",
    xe = (t) => typeof t == "string",
    qt = (t) => typeof t == "symbol",
    oe = (t) => t !== null && typeof t == "object",
    wc = (t) => (oe(t) || W(t)) && W(t.then) && W(t.catch),
    Sc = Object.prototype.toString,
    Pr = (t) => Sc.call(t),
    nd = (t) => Pr(t).slice(8, -1),
    Tc = (t) => Pr(t) === "[object Object]",
    Sa = (t) =>
      xe(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
    ss = ba(
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    Bs = (t) => {
      const e = Object.create(null);
      return (n) => e[n] || (e[n] = t(n));
    },
    rd = /-(\w)/g,
    pt = Bs((t) => t.replace(rd, (e, n) => (n ? n.toUpperCase() : ""))),
    sd = /\B([A-Z])/g,
    Tn = Bs((t) => t.replace(sd, "-$1").toLowerCase()),
    zs = Bs((t) => t.charAt(0).toUpperCase() + t.slice(1)),
    oi = Bs((t) => (t ? `on${zs(t)}` : "")),
    $t = (t, e) => !Object.is(t, e),
    is = (t, e) => {
      for (let n = 0; n < t.length; n++) t[n](e);
    },
    ps = (t, e, n) => {
      Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !1,
        value: n,
      });
    },
    Ta = (t) => {
      const e = parseFloat(t);
      return isNaN(e) ? t : e;
    };
  let _o;
  const xc = () =>
    _o ||
    (_o =
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : {});
  function _t(t) {
    if (U(t)) {
      const e = {};
      for (let n = 0; n < t.length; n++) {
        const r = t[n],
          s = xe(r) ? ld(r) : _t(r);
        if (s) for (const i in s) e[i] = s[i];
      }
      return e;
    } else if (xe(t) || oe(t)) return t;
  }
  const id = /;(?![^(]*\))/g,
    ad = /:([^]+)/,
    od = /\/\*[^]*?\*\//g;
  function ld(t) {
    const e = {};
    return (
      t
        .replace(od, "")
        .split(id)
        .forEach((n) => {
          if (n) {
            const r = n.split(ad);
            r.length > 1 && (e[r[0].trim()] = r[1].trim());
          }
        }),
      e
    );
  }
  function D(t) {
    let e = "";
    if (xe(t)) e = t;
    else if (U(t))
      for (let n = 0; n < t.length; n++) {
        const r = D(t[n]);
        r && (e += r + " ");
      }
    else if (oe(t)) for (const n in t) t[n] && (e += n + " ");
    return e.trim();
  }
  const cd =
      "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    ud = ba(cd);
  function Ic(t) {
    return !!t || t === "";
  }
  function fd(t, e) {
    if (t.length !== e.length) return !1;
    let n = !0;
    for (let r = 0; n && r < t.length; r++) n = xr(t[r], e[r]);
    return n;
  }
  function xr(t, e) {
    if (t === e) return !0;
    let n = Eo(t),
      r = Eo(e);
    if (n || r) return n && r ? t.getTime() === e.getTime() : !1;
    if (((n = qt(t)), (r = qt(e)), n || r)) return t === e;
    if (((n = U(t)), (r = U(e)), n || r)) return n && r ? fd(t, e) : !1;
    if (((n = oe(t)), (r = oe(e)), n || r)) {
      if (!n || !r) return !1;
      const s = Object.keys(t).length,
        i = Object.keys(e).length;
      if (s !== i) return !1;
      for (const a in t) {
        const l = t.hasOwnProperty(a),
          c = e.hasOwnProperty(a);
        if ((l && !c) || (!l && c) || !xr(t[a], e[a])) return !1;
      }
    }
    return String(t) === String(e);
  }
  function dd(t, e) {
    return t.findIndex((n) => xr(n, e));
  }
  const te = (t) =>
      xe(t)
        ? t
        : t == null
        ? ""
        : U(t) || (oe(t) && (t.toString === Sc || !W(t.toString)))
        ? JSON.stringify(t, Cc, 2)
        : String(t),
    Cc = (t, e) =>
      e && e.__v_isRef
        ? Cc(t, e.value)
        : jn(e)
        ? {
            [`Map(${e.size})`]: [...e.entries()].reduce(
              (n, [r, s], i) => ((n[li(r, i) + " =>"] = s), n),
              {}
            ),
          }
        : js(e)
        ? { [`Set(${e.size})`]: [...e.values()].map((n) => li(n)) }
        : qt(e)
        ? li(e)
        : oe(e) && !U(e) && !Tc(e)
        ? String(e)
        : e,
    li = (t, e = "") => {
      var n;
      return qt(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t;
    };
  /**
   * @vue/reactivity v3.4.15
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ let nt;
  class hd {
    constructor(e = !1) {
      (this.detached = e),
        (this._active = !0),
        (this.effects = []),
        (this.cleanups = []),
        (this.parent = nt),
        !e &&
          nt &&
          (this.index = (nt.scopes || (nt.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    run(e) {
      if (this._active) {
        const n = nt;
        try {
          return (nt = this), e();
        } finally {
          nt = n;
        }
      }
    }
    on() {
      nt = this;
    }
    off() {
      nt = this.parent;
    }
    stop(e) {
      if (this._active) {
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
        for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
        if (this.scopes)
          for (n = 0, r = this.scopes.length; n < r; n++)
            this.scopes[n].stop(!0);
        if (!this.detached && this.parent && !e) {
          const s = this.parent.scopes.pop();
          s &&
            s !== this &&
            ((this.parent.scopes[this.index] = s), (s.index = this.index));
        }
        (this.parent = void 0), (this._active = !1);
      }
    }
  }
  function md(t, e = nt) {
    e && e.active && e.effects.push(t);
  }
  function gd() {
    return nt;
  }
  let fn;
  class xa {
    constructor(e, n, r, s) {
      (this.fn = e),
        (this.trigger = n),
        (this.scheduler = r),
        (this.active = !0),
        (this.deps = []),
        (this._dirtyLevel = 2),
        (this._trackId = 0),
        (this._runnings = 0),
        (this._shouldSchedule = !1),
        (this._depsLength = 0),
        md(this, s);
    }
    get dirty() {
      if (this._dirtyLevel === 1) {
        xn();
        for (let e = 0; e < this._depsLength; e++) {
          const n = this.deps[e];
          if (n.computed && (pd(n.computed), this._dirtyLevel >= 2)) break;
        }
        this._dirtyLevel < 2 && (this._dirtyLevel = 0), In();
      }
      return this._dirtyLevel >= 2;
    }
    set dirty(e) {
      this._dirtyLevel = e ? 2 : 0;
    }
    run() {
      if (((this._dirtyLevel = 0), !this.active)) return this.fn();
      let e = Zt,
        n = fn;
      try {
        return (Zt = !0), (fn = this), this._runnings++, ko(this), this.fn();
      } finally {
        Oo(this), this._runnings--, (fn = n), (Zt = e);
      }
    }
    stop() {
      var e;
      this.active &&
        (ko(this),
        Oo(this),
        (e = this.onStop) == null || e.call(this),
        (this.active = !1));
    }
  }
  function pd(t) {
    return t.value;
  }
  function ko(t) {
    t._trackId++, (t._depsLength = 0);
  }
  function Oo(t) {
    if (t.deps && t.deps.length > t._depsLength) {
      for (let e = t._depsLength; e < t.deps.length; e++) Ec(t.deps[e], t);
      t.deps.length = t._depsLength;
    }
  }
  function Ec(t, e) {
    const n = t.get(e);
    n !== void 0 &&
      e._trackId !== n &&
      (t.delete(e), t.size === 0 && t.cleanup());
  }
  let Zt = !0,
    Pi = 0;
  const _c = [];
  function xn() {
    _c.push(Zt), (Zt = !1);
  }
  function In() {
    const t = _c.pop();
    Zt = t === void 0 ? !0 : t;
  }
  function Ia() {
    Pi++;
  }
  function Ca() {
    for (Pi--; !Pi && Di.length; ) Di.shift()();
  }
  function kc(t, e, n) {
    if (e.get(t) !== t._trackId) {
      e.set(t, t._trackId);
      const r = t.deps[t._depsLength];
      r !== e
        ? (r && Ec(r, t), (t.deps[t._depsLength++] = e))
        : t._depsLength++;
    }
  }
  const Di = [];
  function Oc(t, e, n) {
    Ia();
    for (const r of t.keys())
      if (r._dirtyLevel < e && t.get(r) === r._trackId) {
        const s = r._dirtyLevel;
        (r._dirtyLevel = e), s === 0 && ((r._shouldSchedule = !0), r.trigger());
      }
    Ac(t), Ca();
  }
  function Ac(t) {
    for (const e of t.keys())
      e.scheduler &&
        e._shouldSchedule &&
        (!e._runnings || e.allowRecurse) &&
        t.get(e) === e._trackId &&
        ((e._shouldSchedule = !1), Di.push(e.scheduler));
  }
  const Mc = (t, e) => {
      const n = new Map();
      return (n.cleanup = t), (n.computed = e), n;
    },
    ys = new WeakMap(),
    dn = Symbol(""),
    Fi = Symbol("");
  function He(t, e, n) {
    if (Zt && fn) {
      let r = ys.get(t);
      r || ys.set(t, (r = new Map()));
      let s = r.get(n);
      s || r.set(n, (s = Mc(() => r.delete(n)))), kc(fn, s);
    }
  }
  function Et(t, e, n, r, s, i) {
    const a = ys.get(t);
    if (!a) return;
    let l = [];
    if (e === "clear") l = [...a.values()];
    else if (n === "length" && U(t)) {
      const c = Number(r);
      a.forEach((u, f) => {
        (f === "length" || (!qt(f) && f >= c)) && l.push(u);
      });
    } else
      switch ((n !== void 0 && l.push(a.get(n)), e)) {
        case "add":
          U(t)
            ? Sa(n) && l.push(a.get("length"))
            : (l.push(a.get(dn)), jn(t) && l.push(a.get(Fi)));
          break;
        case "delete":
          U(t) || (l.push(a.get(dn)), jn(t) && l.push(a.get(Fi)));
          break;
        case "set":
          jn(t) && l.push(a.get(dn));
          break;
      }
    Ia();
    for (const c of l) c && Oc(c, 2);
    Ca();
  }
  function yd(t, e) {
    var n;
    return (n = ys.get(t)) == null ? void 0 : n.get(e);
  }
  const bd = ba("__proto__,__v_isRef,__isVue"),
    Lc = new Set(
      Object.getOwnPropertyNames(Symbol)
        .filter((t) => t !== "arguments" && t !== "caller")
        .map((t) => Symbol[t])
        .filter(qt)
    ),
    Ao = vd();
  function vd() {
    const t = {};
    return (
      ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
        t[e] = function (...n) {
          const r = re(this);
          for (let i = 0, a = this.length; i < a; i++) He(r, "get", i + "");
          const s = r[e](...n);
          return s === -1 || s === !1 ? r[e](...n.map(re)) : s;
        };
      }),
      ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
        t[e] = function (...n) {
          xn(), Ia();
          const r = re(this)[e].apply(this, n);
          return Ca(), In(), r;
        };
      }),
      t
    );
  }
  function wd(t) {
    const e = re(this);
    return He(e, "has", t), e.hasOwnProperty(t);
  }
  class Nc {
    constructor(e = !1, n = !1) {
      (this._isReadonly = e), (this._shallow = n);
    }
    get(e, n, r) {
      const s = this._isReadonly,
        i = this._shallow;
      if (n === "__v_isReactive") return !s;
      if (n === "__v_isReadonly") return s;
      if (n === "__v_isShallow") return i;
      if (n === "__v_raw")
        return r === (s ? (i ? Nd : Rc) : i ? Fc : Dc).get(e) ||
          Object.getPrototypeOf(e) === Object.getPrototypeOf(r)
          ? e
          : void 0;
      const a = U(e);
      if (!s) {
        if (a && ne(Ao, n)) return Reflect.get(Ao, n, r);
        if (n === "hasOwnProperty") return wd;
      }
      const l = Reflect.get(e, n, r);
      return (qt(n) ? Lc.has(n) : bd(n)) || (s || He(e, "get", n), i)
        ? l
        : Me(l)
        ? a && Sa(n)
          ? l
          : l.value
        : oe(l)
        ? s
          ? jc(l)
          : Yn(l)
        : l;
    }
  }
  class Pc extends Nc {
    constructor(e = !1) {
      super(!1, e);
    }
    set(e, n, r, s) {
      let i = e[n];
      if (!this._shallow) {
        const c = Zn(i);
        if (
          (!bs(r) && !Zn(r) && ((i = re(i)), (r = re(r))),
          !U(e) && Me(i) && !Me(r))
        )
          return c ? !1 : ((i.value = r), !0);
      }
      const a = U(e) && Sa(n) ? Number(n) < e.length : ne(e, n),
        l = Reflect.set(e, n, r, s);
      return (
        e === re(s) &&
          (a ? $t(r, i) && Et(e, "set", n, r) : Et(e, "add", n, r)),
        l
      );
    }
    deleteProperty(e, n) {
      const r = ne(e, n);
      e[n];
      const s = Reflect.deleteProperty(e, n);
      return s && r && Et(e, "delete", n, void 0), s;
    }
    has(e, n) {
      const r = Reflect.has(e, n);
      return (!qt(n) || !Lc.has(n)) && He(e, "has", n), r;
    }
    ownKeys(e) {
      return He(e, "iterate", U(e) ? "length" : dn), Reflect.ownKeys(e);
    }
  }
  class Sd extends Nc {
    constructor(e = !1) {
      super(!0, e);
    }
    set(e, n) {
      return !0;
    }
    deleteProperty(e, n) {
      return !0;
    }
  }
  const Td = new Pc(),
    xd = new Sd(),
    Id = new Pc(!0),
    Ea = (t) => t,
    Hs = (t) => Reflect.getPrototypeOf(t);
  function Gr(t, e, n = !1, r = !1) {
    t = t.__v_raw;
    const s = re(t),
      i = re(e);
    n || ($t(e, i) && He(s, "get", e), He(s, "get", i));
    const { has: a } = Hs(s),
      l = r ? Ea : n ? Oa : Ir;
    if (a.call(s, e)) return l(t.get(e));
    if (a.call(s, i)) return l(t.get(i));
    t !== s && t.get(e);
  }
  function Wr(t, e = !1) {
    const n = this.__v_raw,
      r = re(n),
      s = re(t);
    return (
      e || ($t(t, s) && He(r, "has", t), He(r, "has", s)),
      t === s ? n.has(t) : n.has(t) || n.has(s)
    );
  }
  function qr(t, e = !1) {
    return (
      (t = t.__v_raw), !e && He(re(t), "iterate", dn), Reflect.get(t, "size", t)
    );
  }
  function Mo(t) {
    t = re(t);
    const e = re(this);
    return Hs(e).has.call(e, t) || (e.add(t), Et(e, "add", t, t)), this;
  }
  function Lo(t, e) {
    e = re(e);
    const n = re(this),
      { has: r, get: s } = Hs(n);
    let i = r.call(n, t);
    i || ((t = re(t)), (i = r.call(n, t)));
    const a = s.call(n, t);
    return (
      n.set(t, e), i ? $t(e, a) && Et(n, "set", t, e) : Et(n, "add", t, e), this
    );
  }
  function No(t) {
    const e = re(this),
      { has: n, get: r } = Hs(e);
    let s = n.call(e, t);
    s || ((t = re(t)), (s = n.call(e, t))), r && r.call(e, t);
    const i = e.delete(t);
    return s && Et(e, "delete", t, void 0), i;
  }
  function Po() {
    const t = re(this),
      e = t.size !== 0,
      n = t.clear();
    return e && Et(t, "clear", void 0, void 0), n;
  }
  function $r(t, e) {
    return function (r, s) {
      const i = this,
        a = i.__v_raw,
        l = re(a),
        c = e ? Ea : t ? Oa : Ir;
      return (
        !t && He(l, "iterate", dn),
        a.forEach((u, f) => r.call(s, c(u), c(f), i))
      );
    };
  }
  function Kr(t, e, n) {
    return function (...r) {
      const s = this.__v_raw,
        i = re(s),
        a = jn(i),
        l = t === "entries" || (t === Symbol.iterator && a),
        c = t === "keys" && a,
        u = s[t](...r),
        f = n ? Ea : e ? Oa : Ir;
      return (
        !e && He(i, "iterate", c ? Fi : dn),
        {
          next() {
            const { value: m, done: g } = u.next();
            return g
              ? { value: m, done: g }
              : { value: l ? [f(m[0]), f(m[1])] : f(m), done: g };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function Pt(t) {
    return function (...e) {
      return t === "delete" ? !1 : t === "clear" ? void 0 : this;
    };
  }
  function Cd() {
    const t = {
        get(i) {
          return Gr(this, i);
        },
        get size() {
          return qr(this);
        },
        has: Wr,
        add: Mo,
        set: Lo,
        delete: No,
        clear: Po,
        forEach: $r(!1, !1),
      },
      e = {
        get(i) {
          return Gr(this, i, !1, !0);
        },
        get size() {
          return qr(this);
        },
        has: Wr,
        add: Mo,
        set: Lo,
        delete: No,
        clear: Po,
        forEach: $r(!1, !0),
      },
      n = {
        get(i) {
          return Gr(this, i, !0);
        },
        get size() {
          return qr(this, !0);
        },
        has(i) {
          return Wr.call(this, i, !0);
        },
        add: Pt("add"),
        set: Pt("set"),
        delete: Pt("delete"),
        clear: Pt("clear"),
        forEach: $r(!0, !1),
      },
      r = {
        get(i) {
          return Gr(this, i, !0, !0);
        },
        get size() {
          return qr(this, !0);
        },
        has(i) {
          return Wr.call(this, i, !0);
        },
        add: Pt("add"),
        set: Pt("set"),
        delete: Pt("delete"),
        clear: Pt("clear"),
        forEach: $r(!0, !0),
      };
    return (
      ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
        (t[i] = Kr(i, !1, !1)),
          (n[i] = Kr(i, !0, !1)),
          (e[i] = Kr(i, !1, !0)),
          (r[i] = Kr(i, !0, !0));
      }),
      [t, n, e, r]
    );
  }
  const [Ed, _d, kd, Od] = Cd();
  function _a(t, e) {
    const n = e ? (t ? Od : kd) : t ? _d : Ed;
    return (r, s, i) =>
      s === "__v_isReactive"
        ? !t
        : s === "__v_isReadonly"
        ? t
        : s === "__v_raw"
        ? r
        : Reflect.get(ne(n, s) && s in r ? n : r, s, i);
  }
  const Ad = { get: _a(!1, !1) },
    Md = { get: _a(!1, !0) },
    Ld = { get: _a(!0, !1) },
    Dc = new WeakMap(),
    Fc = new WeakMap(),
    Rc = new WeakMap(),
    Nd = new WeakMap();
  function Pd(t) {
    switch (t) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function Dd(t) {
    return t.__v_skip || !Object.isExtensible(t) ? 0 : Pd(nd(t));
  }
  function Yn(t) {
    return Zn(t) ? t : ka(t, !1, Td, Ad, Dc);
  }
  function Fd(t) {
    return ka(t, !1, Id, Md, Fc);
  }
  function jc(t) {
    return ka(t, !0, xd, Ld, Rc);
  }
  function ka(t, e, n, r, s) {
    if (!oe(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t;
    const i = s.get(t);
    if (i) return i;
    const a = Dd(t);
    if (a === 0) return t;
    const l = new Proxy(t, a === 2 ? r : n);
    return s.set(t, l), l;
  }
  function Bn(t) {
    return Zn(t) ? Bn(t.__v_raw) : !!(t && t.__v_isReactive);
  }
  function Zn(t) {
    return !!(t && t.__v_isReadonly);
  }
  function bs(t) {
    return !!(t && t.__v_isShallow);
  }
  function Bc(t) {
    return Bn(t) || Zn(t);
  }
  function re(t) {
    const e = t && t.__v_raw;
    return e ? re(e) : t;
  }
  function zc(t) {
    return ps(t, "__v_skip", !0), t;
  }
  const Ir = (t) => (oe(t) ? Yn(t) : t),
    Oa = (t) => (oe(t) ? jc(t) : t);
  class Hc {
    constructor(e, n, r, s) {
      (this._setter = n),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this.__v_isReadonly = !1),
        (this.effect = new xa(
          () => e(this._value),
          () => as(this, 1),
          () => this.dep && Ac(this.dep)
        )),
        (this.effect.computed = this),
        (this.effect.active = this._cacheable = !s),
        (this.__v_isReadonly = r);
    }
    get value() {
      const e = re(this);
      return (
        (!e._cacheable || e.effect.dirty) &&
          $t(e._value, (e._value = e.effect.run())) &&
          as(e, 2),
        Vc(e),
        e.effect._dirtyLevel >= 1 && as(e, 1),
        e._value
      );
    }
    set value(e) {
      this._setter(e);
    }
    get _dirty() {
      return this.effect.dirty;
    }
    set _dirty(e) {
      this.effect.dirty = e;
    }
  }
  function Rd(t, e, n = !1) {
    let r, s;
    const i = W(t);
    return (
      i ? ((r = t), (s = Ye)) : ((r = t.get), (s = t.set)),
      new Hc(r, s, i || !s, n)
    );
  }
  function Vc(t) {
    Zt &&
      fn &&
      ((t = re(t)),
      kc(
        fn,
        t.dep ||
          (t.dep = Mc(() => (t.dep = void 0), t instanceof Hc ? t : void 0))
      ));
  }
  function as(t, e = 2, n) {
    t = re(t);
    const r = t.dep;
    r && Oc(r, e);
  }
  function Me(t) {
    return !!(t && t.__v_isRef === !0);
  }
  function vs(t) {
    return jd(t, !1);
  }
  function jd(t, e) {
    return Me(t) ? t : new Bd(t, e);
  }
  class Bd {
    constructor(e, n) {
      (this.__v_isShallow = n),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this._rawValue = n ? e : re(e)),
        (this._value = n ? e : Ir(e));
    }
    get value() {
      return Vc(this), this._value;
    }
    set value(e) {
      const n = this.__v_isShallow || bs(e) || Zn(e);
      (e = n ? e : re(e)),
        $t(e, this._rawValue) &&
          ((this._rawValue = e), (this._value = n ? e : Ir(e)), as(this, 2));
    }
  }
  function zd(t) {
    return Me(t) ? t.value : t;
  }
  const Hd = {
    get: (t, e, n) => zd(Reflect.get(t, e, n)),
    set: (t, e, n, r) => {
      const s = t[e];
      return Me(s) && !Me(n) ? ((s.value = n), !0) : Reflect.set(t, e, n, r);
    },
  };
  function Uc(t) {
    return Bn(t) ? t : new Proxy(t, Hd);
  }
  class Vd {
    constructor(e, n, r) {
      (this._object = e),
        (this._key = n),
        (this._defaultValue = r),
        (this.__v_isRef = !0);
    }
    get value() {
      const e = this._object[this._key];
      return e === void 0 ? this._defaultValue : e;
    }
    set value(e) {
      this._object[this._key] = e;
    }
    get dep() {
      return yd(re(this._object), this._key);
    }
  }
  class Ud {
    constructor(e) {
      (this._getter = e), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
    }
    get value() {
      return this._getter();
    }
  }
  function Zd(t, e, n) {
    return Me(t)
      ? t
      : W(t)
      ? new Ud(t)
      : oe(t) && arguments.length > 1
      ? Gd(t, e, n)
      : vs(t);
  }
  function Gd(t, e, n) {
    const r = t[e];
    return Me(r) ? r : new Vd(t, e, n);
  }
  /**
   * @vue/runtime-core v3.4.15
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ function Gt(t, e, n, r) {
    let s;
    try {
      s = r ? t(...r) : t();
    } catch (i) {
      Vs(i, e, n);
    }
    return s;
  }
  function at(t, e, n, r) {
    if (W(t)) {
      const i = Gt(t, e, n, r);
      return (
        i &&
          wc(i) &&
          i.catch((a) => {
            Vs(a, e, n);
          }),
        i
      );
    }
    const s = [];
    for (let i = 0; i < t.length; i++) s.push(at(t[i], e, n, r));
    return s;
  }
  function Vs(t, e, n, r = !0) {
    if ((e && e.vnode, e)) {
      let s = e.parent;
      const i = e.proxy,
        a = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; s; ) {
        const c = s.ec;
        if (c) {
          for (let u = 0; u < c.length; u++) if (c[u](t, i, a) === !1) return;
        }
        s = s.parent;
      }
      const l = e.appContext.config.errorHandler;
      if (l) {
        Gt(l, null, 10, [t, i, a]);
        return;
      }
    }
  }
  let Cr = !1,
    Ri = !1;
  const Oe = [];
  let ht = 0;
  const zn = [];
  let jt = null,
    an = 0;
  const Zc = Promise.resolve();
  let Aa = null;
  function Gc(t) {
    const e = Aa || Zc;
    return t ? e.then(this ? t.bind(this) : t) : e;
  }
  function Wd(t) {
    let e = ht + 1,
      n = Oe.length;
    for (; e < n; ) {
      const r = (e + n) >>> 1,
        s = Oe[r],
        i = Er(s);
      i < t || (i === t && s.pre) ? (e = r + 1) : (n = r);
    }
    return e;
  }
  function Ma(t) {
    (!Oe.length || !Oe.includes(t, Cr && t.allowRecurse ? ht + 1 : ht)) &&
      (t.id == null ? Oe.push(t) : Oe.splice(Wd(t.id), 0, t), Wc());
  }
  function Wc() {
    !Cr && !Ri && ((Ri = !0), (Aa = Zc.then($c)));
  }
  function qd(t) {
    const e = Oe.indexOf(t);
    e > ht && Oe.splice(e, 1);
  }
  function $d(t) {
    U(t)
      ? zn.push(...t)
      : (!jt || !jt.includes(t, t.allowRecurse ? an + 1 : an)) && zn.push(t),
      Wc();
  }
  function Do(t, e, n = Cr ? ht + 1 : 0) {
    for (; n < Oe.length; n++) {
      const r = Oe[n];
      if (r && r.pre) {
        if (t && r.id !== t.uid) continue;
        Oe.splice(n, 1), n--, r();
      }
    }
  }
  function qc(t) {
    if (zn.length) {
      const e = [...new Set(zn)].sort((n, r) => Er(n) - Er(r));
      if (((zn.length = 0), jt)) {
        jt.push(...e);
        return;
      }
      for (jt = e, an = 0; an < jt.length; an++) jt[an]();
      (jt = null), (an = 0);
    }
  }
  const Er = (t) => (t.id == null ? 1 / 0 : t.id),
    Kd = (t, e) => {
      const n = Er(t) - Er(e);
      if (n === 0) {
        if (t.pre && !e.pre) return -1;
        if (e.pre && !t.pre) return 1;
      }
      return n;
    };
  function $c(t) {
    (Ri = !1), (Cr = !0), Oe.sort(Kd);
    try {
      for (ht = 0; ht < Oe.length; ht++) {
        const e = Oe[ht];
        e && e.active !== !1 && Gt(e, null, 14);
      }
    } finally {
      (ht = 0),
        (Oe.length = 0),
        qc(),
        (Cr = !1),
        (Aa = null),
        (Oe.length || zn.length) && $c();
    }
  }
  function Yd(t, e, ...n) {
    if (t.isUnmounted) return;
    const r = t.vnode.props || de;
    let s = n;
    const i = e.startsWith("update:"),
      a = i && e.slice(7);
    if (a && a in r) {
      const f = `${a === "modelValue" ? "model" : a}Modifiers`,
        { number: m, trim: g } = r[f] || de;
      g && (s = n.map((y) => (xe(y) ? y.trim() : y))), m && (s = n.map(Ta));
    }
    let l,
      c = r[(l = oi(e))] || r[(l = oi(pt(e)))];
    !c && i && (c = r[(l = oi(Tn(e)))]), c && at(c, t, 6, s);
    const u = r[l + "Once"];
    if (u) {
      if (!t.emitted) t.emitted = {};
      else if (t.emitted[l]) return;
      (t.emitted[l] = !0), at(u, t, 6, s);
    }
  }
  function Kc(t, e, n = !1) {
    const r = e.emitsCache,
      s = r.get(t);
    if (s !== void 0) return s;
    const i = t.emits;
    let a = {},
      l = !1;
    if (!W(t)) {
      const c = (u) => {
        const f = Kc(u, e, !0);
        f && ((l = !0), Fe(a, f));
      };
      !n && e.mixins.length && e.mixins.forEach(c),
        t.extends && c(t.extends),
        t.mixins && t.mixins.forEach(c);
    }
    return !i && !l
      ? (oe(t) && r.set(t, null), null)
      : (U(i) ? i.forEach((c) => (a[c] = null)) : Fe(a, i),
        oe(t) && r.set(t, a),
        a);
  }
  function Us(t, e) {
    return !t || !Rs(e)
      ? !1
      : ((e = e.slice(2).replace(/Once$/, "")),
        ne(t, e[0].toLowerCase() + e.slice(1)) || ne(t, Tn(e)) || ne(t, e));
  }
  let ze = null,
    Yc = null;
  function ws(t) {
    const e = ze;
    return (ze = t), (Yc = (t && t.type.__scopeId) || null), e;
  }
  function Qd(t, e = ze, n) {
    if (!e || t._n) return t;
    const r = (...s) => {
      r._d && qo(-1);
      const i = ws(e);
      let a;
      try {
        a = t(...s);
      } finally {
        ws(i), r._d && qo(1);
      }
      return a;
    };
    return (r._n = !0), (r._c = !0), (r._d = !0), r;
  }
  function Fo(t) {
    const {
      type: e,
      vnode: n,
      proxy: r,
      withProxy: s,
      props: i,
      propsOptions: [a],
      slots: l,
      attrs: c,
      emit: u,
      render: f,
      renderCache: m,
      data: g,
      setupState: y,
      ctx: E,
      inheritAttrs: v,
    } = t;
    let N, S;
    const k = ws(t);
    try {
      if (n.shapeFlag & 4) {
        const Z = s || r,
          Y = Z;
        (N = dt(f.call(Y, Z, m, i, y, g, E))), (S = c);
      } else {
        const Z = e;
        (N = dt(
          Z.length > 1 ? Z(i, { attrs: c, slots: l, emit: u }) : Z(i, null)
        )),
          (S = e.props ? c : Jd(c));
      }
    } catch (Z) {
      (br.length = 0), Vs(Z, t, 1), (N = ve(yn));
    }
    let F = N;
    if (S && v !== !1) {
      const Z = Object.keys(S),
        { shapeFlag: Y } = F;
      Z.length && Y & 7 && (a && Z.some(va) && (S = Xd(S, a)), (F = Gn(F, S)));
    }
    return (
      n.dirs &&
        ((F = Gn(F)), (F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs)),
      n.transition && (F.transition = n.transition),
      (N = F),
      ws(k),
      N
    );
  }
  const Jd = (t) => {
      let e;
      for (const n in t)
        (n === "class" || n === "style" || Rs(n)) &&
          ((e || (e = {}))[n] = t[n]);
      return e;
    },
    Xd = (t, e) => {
      const n = {};
      for (const r in t) (!va(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
      return n;
    };
  function eh(t, e, n) {
    const { props: r, children: s, component: i } = t,
      { props: a, children: l, patchFlag: c } = e,
      u = i.emitsOptions;
    if (e.dirs || e.transition) return !0;
    if (n && c >= 0) {
      if (c & 1024) return !0;
      if (c & 16) return r ? Ro(r, a, u) : !!a;
      if (c & 8) {
        const f = e.dynamicProps;
        for (let m = 0; m < f.length; m++) {
          const g = f[m];
          if (a[g] !== r[g] && !Us(u, g)) return !0;
        }
      }
    } else
      return (s || l) && (!l || !l.$stable)
        ? !0
        : r === a
        ? !1
        : r
        ? a
          ? Ro(r, a, u)
          : !0
        : !!a;
    return !1;
  }
  function Ro(t, e, n) {
    const r = Object.keys(e);
    if (r.length !== Object.keys(t).length) return !0;
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      if (e[i] !== t[i] && !Us(n, i)) return !0;
    }
    return !1;
  }
  function th({ vnode: t, parent: e }, n) {
    for (; e; ) {
      const r = e.subTree;
      if (
        (r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t)
      )
        ((t = e.vnode).el = n), (e = e.parent);
      else break;
    }
  }
  const nh = "components";
  function Ue(t, e) {
    return sh(nh, t, !0, e) || t;
  }
  const rh = Symbol.for("v-ndc");
  function sh(t, e, n = !0, r = !1) {
    const s = ze || Ae;
    if (s) {
      const i = s.type;
      {
        const l = Qh(i, !1);
        if (l && (l === e || l === pt(e) || l === zs(pt(e)))) return i;
      }
      const a = jo(s[t] || i[t], e) || jo(s.appContext[t], e);
      return !a && r ? i : a;
    }
  }
  function jo(t, e) {
    return t && (t[e] || t[pt(e)] || t[zs(pt(e))]);
  }
  const ih = (t) => t.__isSuspense;
  function ah(t, e) {
    e && e.pendingBranch
      ? U(t)
        ? e.effects.push(...t)
        : e.effects.push(t)
      : $d(t);
  }
  const oh = Symbol.for("v-scx"),
    lh = () => cs(oh);
  function ch(t, e) {
    return La(t, null, e);
  }
  const Yr = {};
  function Hn(t, e, n) {
    return La(t, e, n);
  }
  function La(
    t,
    e,
    { immediate: n, deep: r, flush: s, once: i, onTrack: a, onTrigger: l } = de
  ) {
    if (e && i) {
      const q = e;
      e = (...ue) => {
        q(...ue), Y();
      };
    }
    const c = Ae,
      u = (q) => (r === !0 ? q : un(q, r === !1 ? 1 : void 0));
    let f,
      m = !1,
      g = !1;
    if (
      (Me(t)
        ? ((f = () => t.value), (m = bs(t)))
        : Bn(t)
        ? ((f = () => u(t)), (m = !0))
        : U(t)
        ? ((g = !0),
          (m = t.some((q) => Bn(q) || bs(q))),
          (f = () =>
            t.map((q) => {
              if (Me(q)) return q.value;
              if (Bn(q)) return u(q);
              if (W(q)) return Gt(q, c, 2);
            })))
        : W(t)
        ? e
          ? (f = () => Gt(t, c, 2))
          : (f = () => (y && y(), at(t, c, 3, [E])))
        : (f = Ye),
      e && r)
    ) {
      const q = f;
      f = () => un(q());
    }
    let y,
      E = (q) => {
        y = F.onStop = () => {
          Gt(q, c, 4), (y = F.onStop = void 0);
        };
      },
      v;
    if ($s)
      if (
        ((E = Ye),
        e ? n && at(e, c, 3, [f(), g ? [] : void 0, E]) : f(),
        s === "sync")
      ) {
        const q = lh();
        v = q.__watcherHandles || (q.__watcherHandles = []);
      } else return Ye;
    let N = g ? new Array(t.length).fill(Yr) : Yr;
    const S = () => {
      if (!(!F.active || !F.dirty))
        if (e) {
          const q = F.run();
          (r || m || (g ? q.some((ue, Ee) => $t(ue, N[Ee])) : $t(q, N))) &&
            (y && y(),
            at(e, c, 3, [q, N === Yr ? void 0 : g && N[0] === Yr ? [] : N, E]),
            (N = q));
        } else F.run();
    };
    S.allowRecurse = !!e;
    let k;
    s === "sync"
      ? (k = S)
      : s === "post"
      ? (k = () => Be(S, c && c.suspense))
      : ((S.pre = !0), c && (S.id = c.uid), (k = () => Ma(S)));
    const F = new xa(f, Ye, k),
      Z = gd(),
      Y = () => {
        F.stop(), Z && wa(Z.effects, F);
      };
    return (
      e
        ? n
          ? S()
          : (N = F.run())
        : s === "post"
        ? Be(F.run.bind(F), c && c.suspense)
        : F.run(),
      v && v.push(Y),
      Y
    );
  }
  function uh(t, e, n) {
    const r = this.proxy,
      s = xe(t) ? (t.includes(".") ? Qc(r, t) : () => r[t]) : t.bind(r, r);
    let i;
    W(e) ? (i = e) : ((i = e.handler), (n = e));
    const a = Dr(this),
      l = La(s, i.bind(r), n);
    return a(), l;
  }
  function Qc(t, e) {
    const n = e.split(".");
    return () => {
      let r = t;
      for (let s = 0; s < n.length && r; s++) r = r[n[s]];
      return r;
    };
  }
  function un(t, e, n = 0, r) {
    if (!oe(t) || t.__v_skip) return t;
    if (e && e > 0) {
      if (n >= e) return t;
      n++;
    }
    if (((r = r || new Set()), r.has(t))) return t;
    if ((r.add(t), Me(t))) un(t.value, e, n, r);
    else if (U(t)) for (let s = 0; s < t.length; s++) un(t[s], e, n, r);
    else if (js(t) || jn(t))
      t.forEach((s) => {
        un(s, e, n, r);
      });
    else if (Tc(t)) for (const s in t) un(t[s], e, n, r);
    return t;
  }
  function os(t, e) {
    if (ze === null) return t;
    const n = Ks(ze) || ze.proxy,
      r = t.dirs || (t.dirs = []);
    for (let s = 0; s < e.length; s++) {
      let [i, a, l, c = de] = e[s];
      i &&
        (W(i) && (i = { mounted: i, updated: i }),
        i.deep && un(a),
        r.push({
          dir: i,
          instance: n,
          value: a,
          oldValue: void 0,
          arg: l,
          modifiers: c,
        }));
    }
    return t;
  }
  function en(t, e, n, r) {
    const s = t.dirs,
      i = e && e.dirs;
    for (let a = 0; a < s.length; a++) {
      const l = s[a];
      i && (l.oldValue = i[a].value);
      let c = l.dir[r];
      c && (xn(), at(c, n, 8, [t.el, l, t, e]), In());
    }
  }
  /*! #__NO_SIDE_EFFECTS__ */ function Zs(t, e) {
    return W(t) ? Fe({ name: t.name }, e, { setup: t }) : t;
  }
  const ls = (t) => !!t.type.__asyncLoader,
    Jc = (t) => t.type.__isKeepAlive;
  function fh(t, e) {
    Xc(t, "a", e);
  }
  function dh(t, e) {
    Xc(t, "da", e);
  }
  function Xc(t, e, n = Ae) {
    const r =
      t.__wdc ||
      (t.__wdc = () => {
        let s = n;
        for (; s; ) {
          if (s.isDeactivated) return;
          s = s.parent;
        }
        return t();
      });
    if ((Gs(e, r, n), n)) {
      let s = n.parent;
      for (; s && s.parent; )
        Jc(s.parent.vnode) && hh(r, e, n, s), (s = s.parent);
    }
  }
  function hh(t, e, n, r) {
    const s = Gs(e, t, r, !0);
    nu(() => {
      wa(r[e], s);
    }, n);
  }
  function Gs(t, e, n = Ae, r = !1) {
    if (n) {
      const s = n[t] || (n[t] = []),
        i =
          e.__weh ||
          (e.__weh = (...a) => {
            if (n.isUnmounted) return;
            xn();
            const l = Dr(n),
              c = at(e, n, t, a);
            return l(), In(), c;
          });
      return r ? s.unshift(i) : s.push(i), i;
    }
  }
  const At =
      (t) =>
      (e, n = Ae) =>
        (!$s || t === "sp") && Gs(t, (...r) => e(...r), n),
    eu = At("bm"),
    mh = At("m"),
    gh = At("bu"),
    ph = At("u"),
    tu = At("bum"),
    nu = At("um"),
    yh = At("sp"),
    bh = At("rtg"),
    vh = At("rtc");
  function wh(t, e = Ae) {
    Gs("ec", t, e);
  }
  function Ss(t, e, n, r) {
    let s;
    const i = n;
    if (U(t) || xe(t)) {
      s = new Array(t.length);
      for (let a = 0, l = t.length; a < l; a++) s[a] = e(t[a], a, void 0, i);
    } else if (typeof t == "number") {
      s = new Array(t);
      for (let a = 0; a < t; a++) s[a] = e(a + 1, a, void 0, i);
    } else if (oe(t))
      if (t[Symbol.iterator]) s = Array.from(t, (a, l) => e(a, l, void 0, i));
      else {
        const a = Object.keys(t);
        s = new Array(a.length);
        for (let l = 0, c = a.length; l < c; l++) {
          const u = a[l];
          s[l] = e(t[u], u, l, i);
        }
      }
    else s = [];
    return s;
  }
  const ji = (t) => (t ? (gu(t) ? Ks(t) || t.proxy : ji(t.parent)) : null),
    yr = Fe(Object.create(null), {
      $: (t) => t,
      $el: (t) => t.vnode.el,
      $data: (t) => t.data,
      $props: (t) => t.props,
      $attrs: (t) => t.attrs,
      $slots: (t) => t.slots,
      $refs: (t) => t.refs,
      $parent: (t) => ji(t.parent),
      $root: (t) => ji(t.root),
      $emit: (t) => t.emit,
      $options: (t) => su(t),
      $forceUpdate: (t) =>
        t.f ||
        (t.f = () => {
          (t.effect.dirty = !0), Ma(t.update);
        }),
      $nextTick: (t) => t.n || (t.n = Gc.bind(t.proxy)),
      $watch: (t) => uh.bind(t),
    }),
    ci = (t, e) => t !== de && !t.__isScriptSetup && ne(t, e),
    Sh = {
      get({ _: t }, e) {
        const {
          ctx: n,
          setupState: r,
          data: s,
          props: i,
          accessCache: a,
          type: l,
          appContext: c,
        } = t;
        let u;
        if (e[0] !== "$") {
          const y = a[e];
          if (y !== void 0)
            switch (y) {
              case 1:
                return r[e];
              case 2:
                return s[e];
              case 4:
                return n[e];
              case 3:
                return i[e];
            }
          else {
            if (ci(r, e)) return (a[e] = 1), r[e];
            if (s !== de && ne(s, e)) return (a[e] = 2), s[e];
            if ((u = t.propsOptions[0]) && ne(u, e)) return (a[e] = 3), i[e];
            if (n !== de && ne(n, e)) return (a[e] = 4), n[e];
            Bi && (a[e] = 0);
          }
        }
        const f = yr[e];
        let m, g;
        if (f) return e === "$attrs" && He(t, "get", e), f(t);
        if ((m = l.__cssModules) && (m = m[e])) return m;
        if (n !== de && ne(n, e)) return (a[e] = 4), n[e];
        if (((g = c.config.globalProperties), ne(g, e))) return g[e];
      },
      set({ _: t }, e, n) {
        const { data: r, setupState: s, ctx: i } = t;
        return ci(s, e)
          ? ((s[e] = n), !0)
          : r !== de && ne(r, e)
          ? ((r[e] = n), !0)
          : ne(t.props, e) || (e[0] === "$" && e.slice(1) in t)
          ? !1
          : ((i[e] = n), !0);
      },
      has(
        {
          _: {
            data: t,
            setupState: e,
            accessCache: n,
            ctx: r,
            appContext: s,
            propsOptions: i,
          },
        },
        a
      ) {
        let l;
        return (
          !!n[a] ||
          (t !== de && ne(t, a)) ||
          ci(e, a) ||
          ((l = i[0]) && ne(l, a)) ||
          ne(r, a) ||
          ne(yr, a) ||
          ne(s.config.globalProperties, a)
        );
      },
      defineProperty(t, e, n) {
        return (
          n.get != null
            ? (t._.accessCache[e] = 0)
            : ne(n, "value") && this.set(t, e, n.value, null),
          Reflect.defineProperty(t, e, n)
        );
      },
    };
  function Bo(t) {
    return U(t) ? t.reduce((e, n) => ((e[n] = null), e), {}) : t;
  }
  let Bi = !0;
  function Th(t) {
    const e = su(t),
      n = t.proxy,
      r = t.ctx;
    (Bi = !1), e.beforeCreate && zo(e.beforeCreate, t, "bc");
    const {
      data: s,
      computed: i,
      methods: a,
      watch: l,
      provide: c,
      inject: u,
      created: f,
      beforeMount: m,
      mounted: g,
      beforeUpdate: y,
      updated: E,
      activated: v,
      deactivated: N,
      beforeDestroy: S,
      beforeUnmount: k,
      destroyed: F,
      unmounted: Z,
      render: Y,
      renderTracked: q,
      renderTriggered: ue,
      errorCaptured: Ee,
      serverPrefetch: rr,
      expose: vt,
      inheritAttrs: Jt,
      components: M,
      directives: K,
      filters: we,
    } = e;
    if ((u && xh(u, r, null), a))
      for (const j in a) {
        const Q = a[j];
        W(Q) && (r[j] = Q.bind(n));
      }
    if (s) {
      const j = s.call(n, n);
      oe(j) && (t.data = Yn(j));
    }
    if (((Bi = !0), i))
      for (const j in i) {
        const Q = i[j],
          lt = W(Q) ? Q.bind(n, n) : W(Q.get) ? Q.get.bind(n, n) : Ye,
          Xt = !W(Q) && W(Q.set) ? Q.set.bind(n) : Ye,
          ct = le({ get: lt, set: Xt });
        Object.defineProperty(r, j, {
          enumerable: !0,
          configurable: !0,
          get: () => ct.value,
          set: (Re) => (ct.value = Re),
        });
      }
    if (l) for (const j in l) ru(l[j], r, n, j);
    if (c) {
      const j = W(c) ? c.call(n) : c;
      Reflect.ownKeys(j).forEach((Q) => {
        Oh(Q, j[Q]);
      });
    }
    f && zo(f, t, "c");
    function ie(j, Q) {
      U(Q) ? Q.forEach((lt) => j(lt.bind(n))) : Q && j(Q.bind(n));
    }
    if (
      (ie(eu, m),
      ie(mh, g),
      ie(gh, y),
      ie(ph, E),
      ie(fh, v),
      ie(dh, N),
      ie(wh, Ee),
      ie(vh, q),
      ie(bh, ue),
      ie(tu, k),
      ie(nu, Z),
      ie(yh, rr),
      U(vt))
    )
      if (vt.length) {
        const j = t.exposed || (t.exposed = {});
        vt.forEach((Q) => {
          Object.defineProperty(j, Q, {
            get: () => n[Q],
            set: (lt) => (n[Q] = lt),
          });
        });
      } else t.exposed || (t.exposed = {});
    Y && t.render === Ye && (t.render = Y),
      Jt != null && (t.inheritAttrs = Jt),
      M && (t.components = M),
      K && (t.directives = K);
  }
  function xh(t, e, n = Ye) {
    U(t) && (t = zi(t));
    for (const r in t) {
      const s = t[r];
      let i;
      oe(s)
        ? "default" in s
          ? (i = cs(s.from || r, s.default, !0))
          : (i = cs(s.from || r))
        : (i = cs(s)),
        Me(i)
          ? Object.defineProperty(e, r, {
              enumerable: !0,
              configurable: !0,
              get: () => i.value,
              set: (a) => (i.value = a),
            })
          : (e[r] = i);
    }
  }
  function zo(t, e, n) {
    at(U(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy), e, n);
  }
  function ru(t, e, n, r) {
    const s = r.includes(".") ? Qc(n, r) : () => n[r];
    if (xe(t)) {
      const i = e[t];
      W(i) && Hn(s, i);
    } else if (W(t)) Hn(s, t.bind(n));
    else if (oe(t))
      if (U(t)) t.forEach((i) => ru(i, e, n, r));
      else {
        const i = W(t.handler) ? t.handler.bind(n) : e[t.handler];
        W(i) && Hn(s, i, t);
      }
  }
  function su(t) {
    const e = t.type,
      { mixins: n, extends: r } = e,
      {
        mixins: s,
        optionsCache: i,
        config: { optionMergeStrategies: a },
      } = t.appContext,
      l = i.get(e);
    let c;
    return (
      l
        ? (c = l)
        : !s.length && !n && !r
        ? (c = e)
        : ((c = {}),
          s.length && s.forEach((u) => Ts(c, u, a, !0)),
          Ts(c, e, a)),
      oe(e) && i.set(e, c),
      c
    );
  }
  function Ts(t, e, n, r = !1) {
    const { mixins: s, extends: i } = e;
    i && Ts(t, i, n, !0), s && s.forEach((a) => Ts(t, a, n, !0));
    for (const a in e)
      if (!(r && a === "expose")) {
        const l = Ih[a] || (n && n[a]);
        t[a] = l ? l(t[a], e[a]) : e[a];
      }
    return t;
  }
  const Ih = {
    data: Ho,
    props: Vo,
    emits: Vo,
    methods: hr,
    computed: hr,
    beforeCreate: Ne,
    created: Ne,
    beforeMount: Ne,
    mounted: Ne,
    beforeUpdate: Ne,
    updated: Ne,
    beforeDestroy: Ne,
    beforeUnmount: Ne,
    destroyed: Ne,
    unmounted: Ne,
    activated: Ne,
    deactivated: Ne,
    errorCaptured: Ne,
    serverPrefetch: Ne,
    components: hr,
    directives: hr,
    watch: Eh,
    provide: Ho,
    inject: Ch,
  };
  function Ho(t, e) {
    return e
      ? t
        ? function () {
            return Fe(
              W(t) ? t.call(this, this) : t,
              W(e) ? e.call(this, this) : e
            );
          }
        : e
      : t;
  }
  function Ch(t, e) {
    return hr(zi(t), zi(e));
  }
  function zi(t) {
    if (U(t)) {
      const e = {};
      for (let n = 0; n < t.length; n++) e[t[n]] = t[n];
      return e;
    }
    return t;
  }
  function Ne(t, e) {
    return t ? [...new Set([].concat(t, e))] : e;
  }
  function hr(t, e) {
    return t ? Fe(Object.create(null), t, e) : e;
  }
  function Vo(t, e) {
    return t
      ? U(t) && U(e)
        ? [...new Set([...t, ...e])]
        : Fe(Object.create(null), Bo(t), Bo(e ?? {}))
      : e;
  }
  function Eh(t, e) {
    if (!t) return e;
    if (!e) return t;
    const n = Fe(Object.create(null), t);
    for (const r in e) n[r] = Ne(t[r], e[r]);
    return n;
  }
  function iu() {
    return {
      app: null,
      config: {
        isNativeTag: ed,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {},
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap(),
    };
  }
  let _h = 0;
  function kh(t, e) {
    return function (r, s = null) {
      W(r) || (r = Fe({}, r)), s != null && !oe(s) && (s = null);
      const i = iu(),
        a = new WeakSet();
      let l = !1;
      const c = (i.app = {
        _uid: _h++,
        _component: r,
        _props: s,
        _container: null,
        _context: i,
        _instance: null,
        version: em,
        get config() {
          return i.config;
        },
        set config(u) {},
        use(u, ...f) {
          return (
            a.has(u) ||
              (u && W(u.install)
                ? (a.add(u), u.install(c, ...f))
                : W(u) && (a.add(u), u(c, ...f))),
            c
          );
        },
        mixin(u) {
          return i.mixins.includes(u) || i.mixins.push(u), c;
        },
        component(u, f) {
          return f ? ((i.components[u] = f), c) : i.components[u];
        },
        directive(u, f) {
          return f ? ((i.directives[u] = f), c) : i.directives[u];
        },
        mount(u, f, m) {
          if (!l) {
            const g = ve(r, s);
            return (
              (g.appContext = i),
              m === !0 ? (m = "svg") : m === !1 && (m = void 0),
              t(g, u, m),
              (l = !0),
              (c._container = u),
              (u.__vue_app__ = c),
              Ks(g.component) || g.component.proxy
            );
          }
        },
        unmount() {
          l && (t(null, c._container), delete c._container.__vue_app__);
        },
        provide(u, f) {
          return (i.provides[u] = f), c;
        },
        runWithContext(u) {
          xs = c;
          try {
            return u();
          } finally {
            xs = null;
          }
        },
      });
      return c;
    };
  }
  let xs = null;
  function Oh(t, e) {
    if (Ae) {
      let n = Ae.provides;
      const r = Ae.parent && Ae.parent.provides;
      r === n && (n = Ae.provides = Object.create(r)), (n[t] = e);
    }
  }
  function cs(t, e, n = !1) {
    const r = Ae || ze;
    if (r || xs) {
      const s = r
        ? r.parent == null
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides
        : xs._context.provides;
      if (s && t in s) return s[t];
      if (arguments.length > 1) return n && W(e) ? e.call(r && r.proxy) : e;
    }
  }
  function Ah(t, e, n, r = !1) {
    const s = {},
      i = {};
    ps(i, qs, 1), (t.propsDefaults = Object.create(null)), au(t, e, s, i);
    for (const a in t.propsOptions[0]) a in s || (s[a] = void 0);
    n
      ? (t.props = r ? s : Fd(s))
      : t.type.props
      ? (t.props = s)
      : (t.props = i),
      (t.attrs = i);
  }
  function Mh(t, e, n, r) {
    const {
        props: s,
        attrs: i,
        vnode: { patchFlag: a },
      } = t,
      l = re(s),
      [c] = t.propsOptions;
    let u = !1;
    if ((r || a > 0) && !(a & 16)) {
      if (a & 8) {
        const f = t.vnode.dynamicProps;
        for (let m = 0; m < f.length; m++) {
          let g = f[m];
          if (Us(t.emitsOptions, g)) continue;
          const y = e[g];
          if (c)
            if (ne(i, g)) y !== i[g] && ((i[g] = y), (u = !0));
            else {
              const E = pt(g);
              s[E] = Hi(c, l, E, y, t, !1);
            }
          else y !== i[g] && ((i[g] = y), (u = !0));
        }
      }
    } else {
      au(t, e, s, i) && (u = !0);
      let f;
      for (const m in l)
        (!e || (!ne(e, m) && ((f = Tn(m)) === m || !ne(e, f)))) &&
          (c
            ? n &&
              (n[m] !== void 0 || n[f] !== void 0) &&
              (s[m] = Hi(c, l, m, void 0, t, !0))
            : delete s[m]);
      if (i !== l)
        for (const m in i) (!e || !ne(e, m)) && (delete i[m], (u = !0));
    }
    u && Et(t, "set", "$attrs");
  }
  function au(t, e, n, r) {
    const [s, i] = t.propsOptions;
    let a = !1,
      l;
    if (e)
      for (let c in e) {
        if (ss(c)) continue;
        const u = e[c];
        let f;
        s && ne(s, (f = pt(c)))
          ? !i || !i.includes(f)
            ? (n[f] = u)
            : ((l || (l = {}))[f] = u)
          : Us(t.emitsOptions, c) ||
            ((!(c in r) || u !== r[c]) && ((r[c] = u), (a = !0)));
      }
    if (i) {
      const c = re(n),
        u = l || de;
      for (let f = 0; f < i.length; f++) {
        const m = i[f];
        n[m] = Hi(s, c, m, u[m], t, !ne(u, m));
      }
    }
    return a;
  }
  function Hi(t, e, n, r, s, i) {
    const a = t[n];
    if (a != null) {
      const l = ne(a, "default");
      if (l && r === void 0) {
        const c = a.default;
        if (a.type !== Function && !a.skipFactory && W(c)) {
          const { propsDefaults: u } = s;
          if (n in u) r = u[n];
          else {
            const f = Dr(s);
            (r = u[n] = c.call(null, e)), f();
          }
        } else r = c;
      }
      a[0] &&
        (i && !l ? (r = !1) : a[1] && (r === "" || r === Tn(n)) && (r = !0));
    }
    return r;
  }
  function ou(t, e, n = !1) {
    const r = e.propsCache,
      s = r.get(t);
    if (s) return s;
    const i = t.props,
      a = {},
      l = [];
    let c = !1;
    if (!W(t)) {
      const f = (m) => {
        c = !0;
        const [g, y] = ou(m, e, !0);
        Fe(a, g), y && l.push(...y);
      };
      !n && e.mixins.length && e.mixins.forEach(f),
        t.extends && f(t.extends),
        t.mixins && t.mixins.forEach(f);
    }
    if (!i && !c) return oe(t) && r.set(t, Rn), Rn;
    if (U(i))
      for (let f = 0; f < i.length; f++) {
        const m = pt(i[f]);
        Uo(m) && (a[m] = de);
      }
    else if (i)
      for (const f in i) {
        const m = pt(f);
        if (Uo(m)) {
          const g = i[f],
            y = (a[m] = U(g) || W(g) ? { type: g } : Fe({}, g));
          if (y) {
            const E = Wo(Boolean, y.type),
              v = Wo(String, y.type);
            (y[0] = E > -1),
              (y[1] = v < 0 || E < v),
              (E > -1 || ne(y, "default")) && l.push(m);
          }
        }
      }
    const u = [a, l];
    return oe(t) && r.set(t, u), u;
  }
  function Uo(t) {
    return t[0] !== "$";
  }
  function Zo(t) {
    const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
    return e ? e[2] : t === null ? "null" : "";
  }
  function Go(t, e) {
    return Zo(t) === Zo(e);
  }
  function Wo(t, e) {
    return U(e) ? e.findIndex((n) => Go(n, t)) : W(e) && Go(e, t) ? 0 : -1;
  }
  const lu = (t) => t[0] === "_" || t === "$stable",
    Na = (t) => (U(t) ? t.map(dt) : [dt(t)]),
    Lh = (t, e, n) => {
      if (e._n) return e;
      const r = Qd((...s) => Na(e(...s)), n);
      return (r._c = !1), r;
    },
    cu = (t, e, n) => {
      const r = t._ctx;
      for (const s in t) {
        if (lu(s)) continue;
        const i = t[s];
        if (W(i)) e[s] = Lh(s, i, r);
        else if (i != null) {
          const a = Na(i);
          e[s] = () => a;
        }
      }
    },
    uu = (t, e) => {
      const n = Na(e);
      t.slots.default = () => n;
    },
    Nh = (t, e) => {
      if (t.vnode.shapeFlag & 32) {
        const n = e._;
        n ? ((t.slots = re(e)), ps(e, "_", n)) : cu(e, (t.slots = {}));
      } else (t.slots = {}), e && uu(t, e);
      ps(t.slots, qs, 1);
    },
    Ph = (t, e, n) => {
      const { vnode: r, slots: s } = t;
      let i = !0,
        a = de;
      if (r.shapeFlag & 32) {
        const l = e._;
        l
          ? n && l === 1
            ? (i = !1)
            : (Fe(s, e), !n && l === 1 && delete s._)
          : ((i = !e.$stable), cu(e, s)),
          (a = e);
      } else e && (uu(t, e), (a = { default: 1 }));
      if (i) for (const l in s) !lu(l) && a[l] == null && delete s[l];
    };
  function Vi(t, e, n, r, s = !1) {
    if (U(t)) {
      t.forEach((g, y) => Vi(g, e && (U(e) ? e[y] : e), n, r, s));
      return;
    }
    if (ls(r) && !s) return;
    const i = r.shapeFlag & 4 ? Ks(r.component) || r.component.proxy : r.el,
      a = s ? null : i,
      { i: l, r: c } = t,
      u = e && e.r,
      f = l.refs === de ? (l.refs = {}) : l.refs,
      m = l.setupState;
    if (
      (u != null &&
        u !== c &&
        (xe(u)
          ? ((f[u] = null), ne(m, u) && (m[u] = null))
          : Me(u) && (u.value = null)),
      W(c))
    )
      Gt(c, l, 12, [a, f]);
    else {
      const g = xe(c),
        y = Me(c),
        E = t.f;
      if (g || y) {
        const v = () => {
          if (E) {
            const N = g ? (ne(m, c) ? m[c] : f[c]) : c.value;
            s
              ? U(N) && wa(N, i)
              : U(N)
              ? N.includes(i) || N.push(i)
              : g
              ? ((f[c] = [i]), ne(m, c) && (m[c] = f[c]))
              : ((c.value = [i]), t.k && (f[t.k] = c.value));
          } else
            g
              ? ((f[c] = a), ne(m, c) && (m[c] = a))
              : y && ((c.value = a), t.k && (f[t.k] = a));
        };
        s || E ? v() : ((v.id = -1), Be(v, n));
      }
    }
  }
  const Be = ah;
  function Dh(t) {
    return Fh(t);
  }
  function Fh(t, e) {
    const n = xc();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: s,
        patchProp: i,
        createElement: a,
        createText: l,
        createComment: c,
        setText: u,
        setElementText: f,
        parentNode: m,
        nextSibling: g,
        setScopeId: y = Ye,
        insertStaticContent: E,
      } = t,
      v = (
        d,
        h,
        b,
        w = null,
        T = null,
        C = null,
        L = void 0,
        I = null,
        _ = !!h.dynamicChildren
      ) => {
        if (d === h) return;
        d && !ar(d, h) && ((w = Zr(d)), Re(d, T, C, !0), (d = null)),
          h.patchFlag === -2 && ((_ = !1), (h.dynamicChildren = null));
        const { type: x, ref: P, shapeFlag: H } = h;
        switch (x) {
          case Ws:
            N(d, h, b, w);
            break;
          case yn:
            S(d, h, b, w);
            break;
          case fi:
            d == null && k(h, b, w, L);
            break;
          case Te:
            M(d, h, b, w, T, C, L, I, _);
            break;
          default:
            H & 1
              ? Y(d, h, b, w, T, C, L, I, _)
              : H & 6
              ? K(d, h, b, w, T, C, L, I, _)
              : (H & 64 || H & 128) && x.process(d, h, b, w, T, C, L, I, _, sr);
        }
        P != null && T && Vi(P, d && d.ref, C, h || d, !h);
      },
      N = (d, h, b, w) => {
        if (d == null) r((h.el = l(h.children)), b, w);
        else {
          const T = (h.el = d.el);
          h.children !== d.children && u(T, h.children);
        }
      },
      S = (d, h, b, w) => {
        d == null ? r((h.el = c(h.children || "")), b, w) : (h.el = d.el);
      },
      k = (d, h, b, w) => {
        [d.el, d.anchor] = E(d.children, h, b, w, d.el, d.anchor);
      },
      F = ({ el: d, anchor: h }, b, w) => {
        let T;
        for (; d && d !== h; ) (T = g(d)), r(d, b, w), (d = T);
        r(h, b, w);
      },
      Z = ({ el: d, anchor: h }) => {
        let b;
        for (; d && d !== h; ) (b = g(d)), s(d), (d = b);
        s(h);
      },
      Y = (d, h, b, w, T, C, L, I, _) => {
        h.type === "svg" ? (L = "svg") : h.type === "math" && (L = "mathml"),
          d == null ? q(h, b, w, T, C, L, I, _) : rr(d, h, T, C, L, I, _);
      },
      q = (d, h, b, w, T, C, L, I) => {
        let _, x;
        const { props: P, shapeFlag: H, transition: z, dirs: G } = d;
        if (
          ((_ = d.el = a(d.type, C, P && P.is, P)),
          H & 8
            ? f(_, d.children)
            : H & 16 && Ee(d.children, _, null, w, T, ui(d, C), L, I),
          G && en(d, null, w, "created"),
          ue(_, d, d.scopeId, L, w),
          P)
        ) {
          for (const ae in P)
            ae !== "value" &&
              !ss(ae) &&
              i(_, ae, null, P[ae], C, d.children, w, T, wt);
          "value" in P && i(_, "value", null, P.value, C),
            (x = P.onVnodeBeforeMount) && ft(x, w, d);
        }
        G && en(d, null, w, "beforeMount");
        const J = Rh(T, z);
        J && z.beforeEnter(_),
          r(_, h, b),
          ((x = P && P.onVnodeMounted) || J || G) &&
            Be(() => {
              x && ft(x, w, d), J && z.enter(_), G && en(d, null, w, "mounted");
            }, T);
      },
      ue = (d, h, b, w, T) => {
        if ((b && y(d, b), w)) for (let C = 0; C < w.length; C++) y(d, w[C]);
        if (T) {
          let C = T.subTree;
          if (h === C) {
            const L = T.vnode;
            ue(d, L, L.scopeId, L.slotScopeIds, T.parent);
          }
        }
      },
      Ee = (d, h, b, w, T, C, L, I, _ = 0) => {
        for (let x = _; x < d.length; x++) {
          const P = (d[x] = I ? Bt(d[x]) : dt(d[x]));
          v(null, P, h, b, w, T, C, L, I);
        }
      },
      rr = (d, h, b, w, T, C, L) => {
        const I = (h.el = d.el);
        let { patchFlag: _, dynamicChildren: x, dirs: P } = h;
        _ |= d.patchFlag & 16;
        const H = d.props || de,
          z = h.props || de;
        let G;
        if (
          (b && tn(b, !1),
          (G = z.onVnodeBeforeUpdate) && ft(G, b, h, d),
          P && en(h, d, b, "beforeUpdate"),
          b && tn(b, !0),
          x
            ? vt(d.dynamicChildren, x, I, b, w, ui(h, T), C)
            : L || Q(d, h, I, null, b, w, ui(h, T), C, !1),
          _ > 0)
        ) {
          if (_ & 16) Jt(I, h, H, z, b, w, T);
          else if (
            (_ & 2 && H.class !== z.class && i(I, "class", null, z.class, T),
            _ & 4 && i(I, "style", H.style, z.style, T),
            _ & 8)
          ) {
            const J = h.dynamicProps;
            for (let ae = 0; ae < J.length; ae++) {
              const pe = J[ae],
                Le = H[pe],
                Xe = z[pe];
              (Xe !== Le || pe === "value") &&
                i(I, pe, Le, Xe, T, d.children, b, w, wt);
            }
          }
          _ & 1 && d.children !== h.children && f(I, h.children);
        } else !L && x == null && Jt(I, h, H, z, b, w, T);
        ((G = z.onVnodeUpdated) || P) &&
          Be(() => {
            G && ft(G, b, h, d), P && en(h, d, b, "updated");
          }, w);
      },
      vt = (d, h, b, w, T, C, L) => {
        for (let I = 0; I < h.length; I++) {
          const _ = d[I],
            x = h[I],
            P =
              _.el && (_.type === Te || !ar(_, x) || _.shapeFlag & 70)
                ? m(_.el)
                : b;
          v(_, x, P, null, w, T, C, L, !0);
        }
      },
      Jt = (d, h, b, w, T, C, L) => {
        if (b !== w) {
          if (b !== de)
            for (const I in b)
              !ss(I) &&
                !(I in w) &&
                i(d, I, b[I], null, L, h.children, T, C, wt);
          for (const I in w) {
            if (ss(I)) continue;
            const _ = w[I],
              x = b[I];
            _ !== x && I !== "value" && i(d, I, x, _, L, h.children, T, C, wt);
          }
          "value" in w && i(d, "value", b.value, w.value, L);
        }
      },
      M = (d, h, b, w, T, C, L, I, _) => {
        const x = (h.el = d ? d.el : l("")),
          P = (h.anchor = d ? d.anchor : l(""));
        let { patchFlag: H, dynamicChildren: z, slotScopeIds: G } = h;
        G && (I = I ? I.concat(G) : G),
          d == null
            ? (r(x, b, w),
              r(P, b, w),
              Ee(h.children || [], b, P, T, C, L, I, _))
            : H > 0 && H & 64 && z && d.dynamicChildren
            ? (vt(d.dynamicChildren, z, b, T, C, L, I),
              (h.key != null || (T && h === T.subTree)) && fu(d, h, !0))
            : Q(d, h, b, P, T, C, L, I, _);
      },
      K = (d, h, b, w, T, C, L, I, _) => {
        (h.slotScopeIds = I),
          d == null
            ? h.shapeFlag & 512
              ? T.ctx.activate(h, b, w, L, _)
              : we(h, b, w, T, C, L, _)
            : Ie(d, h, _);
      },
      we = (d, h, b, w, T, C, L) => {
        const I = (d.component = Wh(d, w, T));
        if ((Jc(d) && (I.ctx.renderer = sr), qh(I), I.asyncDep)) {
          if ((T && T.registerDep(I, ie), !d.el)) {
            const _ = (I.subTree = ve(yn));
            S(null, _, h, b);
          }
        } else ie(I, d, h, b, T, C, L);
      },
      Ie = (d, h, b) => {
        const w = (h.component = d.component);
        if (eh(d, h, b))
          if (w.asyncDep && !w.asyncResolved) {
            j(w, h, b);
            return;
          } else (w.next = h), qd(w.update), (w.effect.dirty = !0), w.update();
        else (h.el = d.el), (w.vnode = h);
      },
      ie = (d, h, b, w, T, C, L) => {
        const I = () => {
            if (d.isMounted) {
              let { next: P, bu: H, u: z, parent: G, vnode: J } = d;
              {
                const Mn = du(d);
                if (Mn) {
                  P && ((P.el = J.el), j(d, P, L)),
                    Mn.asyncDep.then(() => {
                      d.isUnmounted || I();
                    });
                  return;
                }
              }
              let ae = P,
                pe;
              tn(d, !1),
                P ? ((P.el = J.el), j(d, P, L)) : (P = J),
                H && is(H),
                (pe = P.props && P.props.onVnodeBeforeUpdate) &&
                  ft(pe, G, P, J),
                tn(d, !0);
              const Le = Fo(d),
                Xe = d.subTree;
              (d.subTree = Le),
                v(Xe, Le, m(Xe.el), Zr(Xe), d, T, C),
                (P.el = Le.el),
                ae === null && th(d, Le.el),
                z && Be(z, T),
                (pe = P.props && P.props.onVnodeUpdated) &&
                  Be(() => ft(pe, G, P, J), T);
            } else {
              let P;
              const { el: H, props: z } = h,
                { bm: G, m: J, parent: ae } = d,
                pe = ls(h);
              tn(d, !1),
                G && is(G),
                !pe && (P = z && z.onVnodeBeforeMount) && ft(P, ae, h),
                tn(d, !0);
              {
                const Le = (d.subTree = Fo(d));
                v(null, Le, b, w, d, T, C), (h.el = Le.el);
              }
              if ((J && Be(J, T), !pe && (P = z && z.onVnodeMounted))) {
                const Le = h;
                Be(() => ft(P, ae, Le), T);
              }
              (h.shapeFlag & 256 ||
                (ae && ls(ae.vnode) && ae.vnode.shapeFlag & 256)) &&
                d.a &&
                Be(d.a, T),
                (d.isMounted = !0),
                (h = b = w = null);
            }
          },
          _ = (d.effect = new xa(I, Ye, () => Ma(x), d.scope)),
          x = (d.update = () => {
            _.dirty && _.run();
          });
        (x.id = d.uid), tn(d, !0), x();
      },
      j = (d, h, b) => {
        h.component = d;
        const w = d.vnode.props;
        (d.vnode = h),
          (d.next = null),
          Mh(d, h.props, w, b),
          Ph(d, h.children, b),
          xn(),
          Do(d),
          In();
      },
      Q = (d, h, b, w, T, C, L, I, _ = !1) => {
        const x = d && d.children,
          P = d ? d.shapeFlag : 0,
          H = h.children,
          { patchFlag: z, shapeFlag: G } = h;
        if (z > 0) {
          if (z & 128) {
            Xt(x, H, b, w, T, C, L, I, _);
            return;
          } else if (z & 256) {
            lt(x, H, b, w, T, C, L, I, _);
            return;
          }
        }
        G & 8
          ? (P & 16 && wt(x, T, C), H !== x && f(b, H))
          : P & 16
          ? G & 16
            ? Xt(x, H, b, w, T, C, L, I, _)
            : wt(x, T, C, !0)
          : (P & 8 && f(b, ""), G & 16 && Ee(H, b, w, T, C, L, I, _));
      },
      lt = (d, h, b, w, T, C, L, I, _) => {
        (d = d || Rn), (h = h || Rn);
        const x = d.length,
          P = h.length,
          H = Math.min(x, P);
        let z;
        for (z = 0; z < H; z++) {
          const G = (h[z] = _ ? Bt(h[z]) : dt(h[z]));
          v(d[z], G, b, null, T, C, L, I, _);
        }
        x > P ? wt(d, T, C, !0, !1, H) : Ee(h, b, w, T, C, L, I, _, H);
      },
      Xt = (d, h, b, w, T, C, L, I, _) => {
        let x = 0;
        const P = h.length;
        let H = d.length - 1,
          z = P - 1;
        for (; x <= H && x <= z; ) {
          const G = d[x],
            J = (h[x] = _ ? Bt(h[x]) : dt(h[x]));
          if (ar(G, J)) v(G, J, b, null, T, C, L, I, _);
          else break;
          x++;
        }
        for (; x <= H && x <= z; ) {
          const G = d[H],
            J = (h[z] = _ ? Bt(h[z]) : dt(h[z]));
          if (ar(G, J)) v(G, J, b, null, T, C, L, I, _);
          else break;
          H--, z--;
        }
        if (x > H) {
          if (x <= z) {
            const G = z + 1,
              J = G < P ? h[G].el : w;
            for (; x <= z; )
              v(null, (h[x] = _ ? Bt(h[x]) : dt(h[x])), b, J, T, C, L, I, _),
                x++;
          }
        } else if (x > z) for (; x <= H; ) Re(d[x], T, C, !0), x++;
        else {
          const G = x,
            J = x,
            ae = new Map();
          for (x = J; x <= z; x++) {
            const Ve = (h[x] = _ ? Bt(h[x]) : dt(h[x]));
            Ve.key != null && ae.set(Ve.key, x);
          }
          let pe,
            Le = 0;
          const Xe = z - J + 1;
          let Mn = !1,
            xo = 0;
          const ir = new Array(Xe);
          for (x = 0; x < Xe; x++) ir[x] = 0;
          for (x = G; x <= H; x++) {
            const Ve = d[x];
            if (Le >= Xe) {
              Re(Ve, T, C, !0);
              continue;
            }
            let ut;
            if (Ve.key != null) ut = ae.get(Ve.key);
            else
              for (pe = J; pe <= z; pe++)
                if (ir[pe - J] === 0 && ar(Ve, h[pe])) {
                  ut = pe;
                  break;
                }
            ut === void 0
              ? Re(Ve, T, C, !0)
              : ((ir[ut - J] = x + 1),
                ut >= xo ? (xo = ut) : (Mn = !0),
                v(Ve, h[ut], b, null, T, C, L, I, _),
                Le++);
          }
          const Io = Mn ? jh(ir) : Rn;
          for (pe = Io.length - 1, x = Xe - 1; x >= 0; x--) {
            const Ve = J + x,
              ut = h[Ve],
              Co = Ve + 1 < P ? h[Ve + 1].el : w;
            ir[x] === 0
              ? v(null, ut, b, Co, T, C, L, I, _)
              : Mn && (pe < 0 || x !== Io[pe] ? ct(ut, b, Co, 2) : pe--);
          }
        }
      },
      ct = (d, h, b, w, T = null) => {
        const { el: C, type: L, transition: I, children: _, shapeFlag: x } = d;
        if (x & 6) {
          ct(d.component.subTree, h, b, w);
          return;
        }
        if (x & 128) {
          d.suspense.move(h, b, w);
          return;
        }
        if (x & 64) {
          L.move(d, h, b, sr);
          return;
        }
        if (L === Te) {
          r(C, h, b);
          for (let H = 0; H < _.length; H++) ct(_[H], h, b, w);
          r(d.anchor, h, b);
          return;
        }
        if (L === fi) {
          F(d, h, b);
          return;
        }
        if (w !== 2 && x & 1 && I)
          if (w === 0) I.beforeEnter(C), r(C, h, b), Be(() => I.enter(C), T);
          else {
            const { leave: H, delayLeave: z, afterLeave: G } = I,
              J = () => r(C, h, b),
              ae = () => {
                H(C, () => {
                  J(), G && G();
                });
              };
            z ? z(C, J, ae) : ae();
          }
        else r(C, h, b);
      },
      Re = (d, h, b, w = !1, T = !1) => {
        const {
          type: C,
          props: L,
          ref: I,
          children: _,
          dynamicChildren: x,
          shapeFlag: P,
          patchFlag: H,
          dirs: z,
        } = d;
        if ((I != null && Vi(I, null, b, d, !0), P & 256)) {
          h.ctx.deactivate(d);
          return;
        }
        const G = P & 1 && z,
          J = !ls(d);
        let ae;
        if ((J && (ae = L && L.onVnodeBeforeUnmount) && ft(ae, h, d), P & 6))
          Yf(d.component, b, w);
        else {
          if (P & 128) {
            d.suspense.unmount(b, w);
            return;
          }
          G && en(d, null, h, "beforeUnmount"),
            P & 64
              ? d.type.remove(d, h, b, T, sr, w)
              : x && (C !== Te || (H > 0 && H & 64))
              ? wt(x, h, b, !1, !0)
              : ((C === Te && H & 384) || (!T && P & 16)) && wt(_, h, b),
            w && Vr(d);
        }
        ((J && (ae = L && L.onVnodeUnmounted)) || G) &&
          Be(() => {
            ae && ft(ae, h, d), G && en(d, null, h, "unmounted");
          }, b);
      },
      Vr = (d) => {
        const { type: h, el: b, anchor: w, transition: T } = d;
        if (h === Te) {
          Ur(b, w);
          return;
        }
        if (h === fi) {
          Z(d);
          return;
        }
        const C = () => {
          s(b), T && !T.persisted && T.afterLeave && T.afterLeave();
        };
        if (d.shapeFlag & 1 && T && !T.persisted) {
          const { leave: L, delayLeave: I } = T,
            _ = () => L(b, C);
          I ? I(d.el, C, _) : _();
        } else C();
      },
      Ur = (d, h) => {
        let b;
        for (; d !== h; ) (b = g(d)), s(d), (d = b);
        s(h);
      },
      Yf = (d, h, b) => {
        const { bum: w, scope: T, update: C, subTree: L, um: I } = d;
        w && is(w),
          T.stop(),
          C && ((C.active = !1), Re(L, d, h, b)),
          I && Be(I, h),
          Be(() => {
            d.isUnmounted = !0;
          }, h),
          h &&
            h.pendingBranch &&
            !h.isUnmounted &&
            d.asyncDep &&
            !d.asyncResolved &&
            d.suspenseId === h.pendingId &&
            (h.deps--, h.deps === 0 && h.resolve());
      },
      wt = (d, h, b, w = !1, T = !1, C = 0) => {
        for (let L = C; L < d.length; L++) Re(d[L], h, b, w, T);
      },
      Zr = (d) =>
        d.shapeFlag & 6
          ? Zr(d.component.subTree)
          : d.shapeFlag & 128
          ? d.suspense.next()
          : g(d.anchor || d.el);
    let ai = !1;
    const To = (d, h, b) => {
        d == null
          ? h._vnode && Re(h._vnode, null, null, !0)
          : v(h._vnode || null, d, h, null, null, null, b),
          ai || ((ai = !0), Do(), qc(), (ai = !1)),
          (h._vnode = d);
      },
      sr = {
        p: v,
        um: Re,
        m: ct,
        r: Vr,
        mt: we,
        mc: Ee,
        pc: Q,
        pbc: vt,
        n: Zr,
        o: t,
      };
    return { render: To, hydrate: void 0, createApp: kh(To) };
  }
  function ui({ type: t, props: e }, n) {
    return (n === "svg" && t === "foreignObject") ||
      (n === "mathml" &&
        t === "annotation-xml" &&
        e &&
        e.encoding &&
        e.encoding.includes("html"))
      ? void 0
      : n;
  }
  function tn({ effect: t, update: e }, n) {
    t.allowRecurse = e.allowRecurse = n;
  }
  function Rh(t, e) {
    return (!t || (t && !t.pendingBranch)) && e && !e.persisted;
  }
  function fu(t, e, n = !1) {
    const r = t.children,
      s = e.children;
    if (U(r) && U(s))
      for (let i = 0; i < r.length; i++) {
        const a = r[i];
        let l = s[i];
        l.shapeFlag & 1 &&
          !l.dynamicChildren &&
          ((l.patchFlag <= 0 || l.patchFlag === 32) &&
            ((l = s[i] = Bt(s[i])), (l.el = a.el)),
          n || fu(a, l)),
          l.type === Ws && (l.el = a.el);
      }
  }
  function jh(t) {
    const e = t.slice(),
      n = [0];
    let r, s, i, a, l;
    const c = t.length;
    for (r = 0; r < c; r++) {
      const u = t[r];
      if (u !== 0) {
        if (((s = n[n.length - 1]), t[s] < u)) {
          (e[r] = s), n.push(r);
          continue;
        }
        for (i = 0, a = n.length - 1; i < a; )
          (l = (i + a) >> 1), t[n[l]] < u ? (i = l + 1) : (a = l);
        u < t[n[i]] && (i > 0 && (e[r] = n[i - 1]), (n[i] = r));
      }
    }
    for (i = n.length, a = n[i - 1]; i-- > 0; ) (n[i] = a), (a = e[a]);
    return n;
  }
  function du(t) {
    const e = t.subTree.component;
    if (e) return e.asyncDep && !e.asyncResolved ? e : du(e);
  }
  const Bh = (t) => t.__isTeleport,
    Te = Symbol.for("v-fgt"),
    Ws = Symbol.for("v-txt"),
    yn = Symbol.for("v-cmt"),
    fi = Symbol.for("v-stc"),
    br = [];
  let st = null;
  function O(t = !1) {
    br.push((st = t ? null : []));
  }
  function zh() {
    br.pop(), (st = br[br.length - 1] || null);
  }
  let _r = 1;
  function qo(t) {
    _r += t;
  }
  function hu(t) {
    return (
      (t.dynamicChildren = _r > 0 ? st || Rn : null),
      zh(),
      _r > 0 && st && st.push(t),
      t
    );
  }
  function B(t, e, n, r, s, i) {
    return hu(p(t, e, n, r, s, i, !0));
  }
  function Ce(t, e, n, r, s) {
    return hu(ve(t, e, n, r, s, !0));
  }
  function Ui(t) {
    return t ? t.__v_isVNode === !0 : !1;
  }
  function ar(t, e) {
    return t.type === e.type && t.key === e.key;
  }
  const qs = "__vInternal",
    mu = ({ key: t }) => t ?? null,
    us = ({ ref: t, ref_key: e, ref_for: n }) => (
      typeof t == "number" && (t = "" + t),
      t != null
        ? xe(t) || Me(t) || W(t)
          ? { i: ze, r: t, k: e, f: !!n }
          : t
        : null
    );
  function p(
    t,
    e = null,
    n = null,
    r = 0,
    s = null,
    i = t === Te ? 0 : 1,
    a = !1,
    l = !1
  ) {
    const c = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: t,
      props: e,
      key: e && mu(e),
      ref: e && us(e),
      scopeId: Yc,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: i,
      patchFlag: r,
      dynamicProps: s,
      dynamicChildren: null,
      appContext: null,
      ctx: ze,
    };
    return (
      l
        ? (Pa(c, n), i & 128 && t.normalize(c))
        : n && (c.shapeFlag |= xe(n) ? 8 : 16),
      _r > 0 &&
        !a &&
        st &&
        (c.patchFlag > 0 || i & 6) &&
        c.patchFlag !== 32 &&
        st.push(c),
      c
    );
  }
  const ve = Hh;
  function Hh(t, e = null, n = null, r = 0, s = null, i = !1) {
    if (((!t || t === rh) && (t = yn), Ui(t))) {
      const l = Gn(t, e, !0);
      return (
        n && Pa(l, n),
        _r > 0 &&
          !i &&
          st &&
          (l.shapeFlag & 6 ? (st[st.indexOf(t)] = l) : st.push(l)),
        (l.patchFlag |= -2),
        l
      );
    }
    if ((Jh(t) && (t = t.__vccOpts), e)) {
      e = Vh(e);
      let { class: l, style: c } = e;
      l && !xe(l) && (e.class = D(l)),
        oe(c) && (Bc(c) && !U(c) && (c = Fe({}, c)), (e.style = _t(c)));
    }
    const a = xe(t) ? 1 : ih(t) ? 128 : Bh(t) ? 64 : oe(t) ? 4 : W(t) ? 2 : 0;
    return p(t, e, n, r, s, a, i, !0);
  }
  function Vh(t) {
    return t ? (Bc(t) || qs in t ? Fe({}, t) : t) : null;
  }
  function Gn(t, e, n = !1) {
    const { props: r, ref: s, patchFlag: i, children: a } = t,
      l = e ? Uh(r || {}, e) : r;
    return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: t.type,
      props: l,
      key: l && mu(l),
      ref:
        e && e.ref
          ? n && s
            ? U(s)
              ? s.concat(us(e))
              : [s, us(e)]
            : us(e)
          : s,
      scopeId: t.scopeId,
      slotScopeIds: t.slotScopeIds,
      children: a,
      target: t.target,
      targetAnchor: t.targetAnchor,
      staticCount: t.staticCount,
      shapeFlag: t.shapeFlag,
      patchFlag: e && t.type !== Te ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: t.dynamicProps,
      dynamicChildren: t.dynamicChildren,
      appContext: t.appContext,
      dirs: t.dirs,
      transition: t.transition,
      component: t.component,
      suspense: t.suspense,
      ssContent: t.ssContent && Gn(t.ssContent),
      ssFallback: t.ssFallback && Gn(t.ssFallback),
      el: t.el,
      anchor: t.anchor,
      ctx: t.ctx,
      ce: t.ce,
    };
  }
  function rt(t = " ", e = 0) {
    return ve(Ws, null, t, e);
  }
  function X(t = "", e = !1) {
    return e ? (O(), Ce(yn, null, t)) : ve(yn, null, t);
  }
  function dt(t) {
    return t == null || typeof t == "boolean"
      ? ve(yn)
      : U(t)
      ? ve(Te, null, t.slice())
      : typeof t == "object"
      ? Bt(t)
      : ve(Ws, null, String(t));
  }
  function Bt(t) {
    return (t.el === null && t.patchFlag !== -1) || t.memo ? t : Gn(t);
  }
  function Pa(t, e) {
    let n = 0;
    const { shapeFlag: r } = t;
    if (e == null) e = null;
    else if (U(e)) n = 16;
    else if (typeof e == "object")
      if (r & 65) {
        const s = e.default;
        s && (s._c && (s._d = !1), Pa(t, s()), s._c && (s._d = !0));
        return;
      } else {
        n = 32;
        const s = e._;
        !s && !(qs in e)
          ? (e._ctx = ze)
          : s === 3 &&
            ze &&
            (ze.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)));
      }
    else
      W(e)
        ? ((e = { default: e, _ctx: ze }), (n = 32))
        : ((e = String(e)), r & 64 ? ((n = 16), (e = [rt(e)])) : (n = 8));
    (t.children = e), (t.shapeFlag |= n);
  }
  function Uh(...t) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n];
      for (const s in r)
        if (s === "class")
          e.class !== r.class && (e.class = D([e.class, r.class]));
        else if (s === "style") e.style = _t([e.style, r.style]);
        else if (Rs(s)) {
          const i = e[s],
            a = r[s];
          a &&
            i !== a &&
            !(U(i) && i.includes(a)) &&
            (e[s] = i ? [].concat(i, a) : a);
        } else s !== "" && (e[s] = r[s]);
    }
    return e;
  }
  function ft(t, e, n, r = null) {
    at(t, e, 7, [n, r]);
  }
  const Zh = iu();
  let Gh = 0;
  function Wh(t, e, n) {
    const r = t.type,
      s = (e ? e.appContext : t.appContext) || Zh,
      i = {
        uid: Gh++,
        vnode: t,
        type: r,
        parent: e,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new hd(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: e ? e.provides : Object.create(s.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: ou(r, s),
        emitsOptions: Kc(r, s),
        emit: null,
        emitted: null,
        propsDefaults: de,
        inheritAttrs: r.inheritAttrs,
        ctx: de,
        data: de,
        props: de,
        attrs: de,
        slots: de,
        refs: de,
        setupState: de,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null,
      };
    return (
      (i.ctx = { _: i }),
      (i.root = e ? e.root : i),
      (i.emit = Yd.bind(null, i)),
      t.ce && t.ce(i),
      i
    );
  }
  let Ae = null,
    Is,
    Zi;
  {
    const t = xc(),
      e = (n, r) => {
        let s;
        return (
          (s = t[n]) || (s = t[n] = []),
          s.push(r),
          (i) => {
            s.length > 1 ? s.forEach((a) => a(i)) : s[0](i);
          }
        );
      };
    (Is = e("__VUE_INSTANCE_SETTERS__", (n) => (Ae = n))),
      (Zi = e("__VUE_SSR_SETTERS__", (n) => ($s = n)));
  }
  const Dr = (t) => {
      const e = Ae;
      return (
        Is(t),
        t.scope.on(),
        () => {
          t.scope.off(), Is(e);
        }
      );
    },
    $o = () => {
      Ae && Ae.scope.off(), Is(null);
    };
  function gu(t) {
    return t.vnode.shapeFlag & 4;
  }
  let $s = !1;
  function qh(t, e = !1) {
    e && Zi(e);
    const { props: n, children: r } = t.vnode,
      s = gu(t);
    Ah(t, n, s, e), Nh(t, r);
    const i = s ? $h(t, e) : void 0;
    return e && Zi(!1), i;
  }
  function $h(t, e) {
    const n = t.type;
    (t.accessCache = Object.create(null)), (t.proxy = zc(new Proxy(t.ctx, Sh)));
    const { setup: r } = n;
    if (r) {
      const s = (t.setupContext = r.length > 1 ? Yh(t) : null),
        i = Dr(t);
      xn();
      const a = Gt(r, t, 0, [t.props, s]);
      if ((In(), i(), wc(a))) {
        if ((a.then($o, $o), e))
          return a
            .then((l) => {
              Ko(t, l);
            })
            .catch((l) => {
              Vs(l, t, 0);
            });
        t.asyncDep = a;
      } else Ko(t, a);
    } else pu(t);
  }
  function Ko(t, e, n) {
    W(e)
      ? t.type.__ssrInlineRender
        ? (t.ssrRender = e)
        : (t.render = e)
      : oe(e) && (t.setupState = Uc(e)),
      pu(t);
  }
  function pu(t, e, n) {
    const r = t.type;
    t.render || (t.render = r.render || Ye);
    {
      const s = Dr(t);
      xn();
      try {
        Th(t);
      } finally {
        In(), s();
      }
    }
  }
  function Kh(t) {
    return (
      t.attrsProxy ||
      (t.attrsProxy = new Proxy(t.attrs, {
        get(e, n) {
          return He(t, "get", "$attrs"), e[n];
        },
      }))
    );
  }
  function Yh(t) {
    const e = (n) => {
      t.exposed = n || {};
    };
    return {
      get attrs() {
        return Kh(t);
      },
      slots: t.slots,
      emit: t.emit,
      expose: e,
    };
  }
  function Ks(t) {
    if (t.exposed)
      return (
        t.exposeProxy ||
        (t.exposeProxy = new Proxy(Uc(zc(t.exposed)), {
          get(e, n) {
            if (n in e) return e[n];
            if (n in yr) return yr[n](t);
          },
          has(e, n) {
            return n in e || n in yr;
          },
        }))
      );
  }
  function Qh(t, e = !0) {
    return W(t) ? t.displayName || t.name : t.name || (e && t.__name);
  }
  function Jh(t) {
    return W(t) && "__vccOpts" in t;
  }
  const le = (t, e) => Rd(t, e, $s);
  function Xh(t, e, n) {
    const r = arguments.length;
    return r === 2
      ? oe(e) && !U(e)
        ? Ui(e)
          ? ve(t, null, [e])
          : ve(t, e)
        : ve(t, null, e)
      : (r > 3
          ? (n = Array.prototype.slice.call(arguments, 2))
          : r === 3 && Ui(n) && (n = [n]),
        ve(t, e, n));
  }
  const em = "3.4.15";
  /**
   * @vue/runtime-dom v3.4.15
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ const tm = "http://www.w3.org/2000/svg",
    nm = "http://www.w3.org/1998/Math/MathML",
    zt = typeof document < "u" ? document : null,
    Yo = zt && zt.createElement("template"),
    rm = {
      insert: (t, e, n) => {
        e.insertBefore(t, n || null);
      },
      remove: (t) => {
        const e = t.parentNode;
        e && e.removeChild(t);
      },
      createElement: (t, e, n, r) => {
        const s =
          e === "svg"
            ? zt.createElementNS(tm, t)
            : e === "mathml"
            ? zt.createElementNS(nm, t)
            : zt.createElement(t, n ? { is: n } : void 0);
        return (
          t === "select" &&
            r &&
            r.multiple != null &&
            s.setAttribute("multiple", r.multiple),
          s
        );
      },
      createText: (t) => zt.createTextNode(t),
      createComment: (t) => zt.createComment(t),
      setText: (t, e) => {
        t.nodeValue = e;
      },
      setElementText: (t, e) => {
        t.textContent = e;
      },
      parentNode: (t) => t.parentNode,
      nextSibling: (t) => t.nextSibling,
      querySelector: (t) => zt.querySelector(t),
      setScopeId(t, e) {
        t.setAttribute(e, "");
      },
      insertStaticContent(t, e, n, r, s, i) {
        const a = n ? n.previousSibling : e.lastChild;
        if (s && (s === i || s.nextSibling))
          for (
            ;
            e.insertBefore(s.cloneNode(!0), n),
              !(s === i || !(s = s.nextSibling));

          );
        else {
          Yo.innerHTML =
            r === "svg"
              ? `<svg>${t}</svg>`
              : r === "mathml"
              ? `<math>${t}</math>`
              : t;
          const l = Yo.content;
          if (r === "svg" || r === "mathml") {
            const c = l.firstChild;
            for (; c.firstChild; ) l.appendChild(c.firstChild);
            l.removeChild(c);
          }
          e.insertBefore(l, n);
        }
        return [
          a ? a.nextSibling : e.firstChild,
          n ? n.previousSibling : e.lastChild,
        ];
      },
    },
    sm = Symbol("_vtc");
  function im(t, e, n) {
    const r = t[sm];
    r && (e = (e ? [e, ...r] : [...r]).join(" ")),
      e == null
        ? t.removeAttribute("class")
        : n
        ? t.setAttribute("class", e)
        : (t.className = e);
  }
  const Da = Symbol("_vod"),
    di = {
      beforeMount(t, { value: e }, { transition: n }) {
        (t[Da] = t.style.display === "none" ? "" : t.style.display),
          n && e ? n.beforeEnter(t) : or(t, e);
      },
      mounted(t, { value: e }, { transition: n }) {
        n && e && n.enter(t);
      },
      updated(t, { value: e, oldValue: n }, { transition: r }) {
        !e != !n &&
          (r
            ? e
              ? (r.beforeEnter(t), or(t, !0), r.enter(t))
              : r.leave(t, () => {
                  or(t, !1);
                })
            : or(t, e));
      },
      beforeUnmount(t, { value: e }) {
        or(t, e);
      },
    };
  function or(t, e) {
    t.style.display = e ? t[Da] : "none";
  }
  const am = Symbol("");
  function om(t, e, n) {
    const r = t.style,
      s = r.display,
      i = xe(n);
    if (n && !i) {
      if (e && !xe(e)) for (const a in e) n[a] == null && Gi(r, a, "");
      for (const a in n) Gi(r, a, n[a]);
    } else if (i) {
      if (e !== n) {
        const a = r[am];
        a && (n += ";" + a), (r.cssText = n);
      }
    } else e && t.removeAttribute("style");
    Da in t && (r.display = s);
  }
  const Qo = /\s*!important$/;
  function Gi(t, e, n) {
    if (U(n)) n.forEach((r) => Gi(t, e, r));
    else if ((n == null && (n = ""), e.startsWith("--"))) t.setProperty(e, n);
    else {
      const r = lm(t, e);
      Qo.test(n)
        ? t.setProperty(Tn(r), n.replace(Qo, ""), "important")
        : (t[r] = n);
    }
  }
  const Jo = ["Webkit", "Moz", "ms"],
    hi = {};
  function lm(t, e) {
    const n = hi[e];
    if (n) return n;
    let r = pt(e);
    if (r !== "filter" && r in t) return (hi[e] = r);
    r = zs(r);
    for (let s = 0; s < Jo.length; s++) {
      const i = Jo[s] + r;
      if (i in t) return (hi[e] = i);
    }
    return e;
  }
  const Xo = "http://www.w3.org/1999/xlink";
  function cm(t, e, n, r, s) {
    if (r && e.startsWith("xlink:"))
      n == null
        ? t.removeAttributeNS(Xo, e.slice(6, e.length))
        : t.setAttributeNS(Xo, e, n);
    else {
      const i = ud(e);
      n == null || (i && !Ic(n))
        ? t.removeAttribute(e)
        : t.setAttribute(e, i ? "" : n);
    }
  }
  function um(t, e, n, r, s, i, a) {
    if (e === "innerHTML" || e === "textContent") {
      r && a(r, s, i), (t[e] = n ?? "");
      return;
    }
    const l = t.tagName;
    if (e === "value" && l !== "PROGRESS" && !l.includes("-")) {
      t._value = n;
      const u = l === "OPTION" ? t.getAttribute("value") : t.value,
        f = n ?? "";
      u !== f && (t.value = f), n == null && t.removeAttribute(e);
      return;
    }
    let c = !1;
    if (n === "" || n == null) {
      const u = typeof t[e];
      u === "boolean"
        ? (n = Ic(n))
        : n == null && u === "string"
        ? ((n = ""), (c = !0))
        : u === "number" && ((n = 0), (c = !0));
    }
    try {
      t[e] = n;
    } catch {}
    c && t.removeAttribute(e);
  }
  function yu(t, e, n, r) {
    t.addEventListener(e, n, r);
  }
  function fm(t, e, n, r) {
    t.removeEventListener(e, n, r);
  }
  const el = Symbol("_vei");
  function dm(t, e, n, r, s = null) {
    const i = t[el] || (t[el] = {}),
      a = i[e];
    if (r && a) a.value = r;
    else {
      const [l, c] = hm(e);
      if (r) {
        const u = (i[e] = pm(r, s));
        yu(t, l, u, c);
      } else a && (fm(t, l, a, c), (i[e] = void 0));
    }
  }
  const tl = /(?:Once|Passive|Capture)$/;
  function hm(t) {
    let e;
    if (tl.test(t)) {
      e = {};
      let r;
      for (; (r = t.match(tl)); )
        (t = t.slice(0, t.length - r[0].length)), (e[r[0].toLowerCase()] = !0);
    }
    return [t[2] === ":" ? t.slice(3) : Tn(t.slice(2)), e];
  }
  let mi = 0;
  const mm = Promise.resolve(),
    gm = () => mi || (mm.then(() => (mi = 0)), (mi = Date.now()));
  function pm(t, e) {
    const n = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= n.attached) return;
      at(ym(r, n.value), e, 5, [r]);
    };
    return (n.value = t), (n.attached = gm()), n;
  }
  function ym(t, e) {
    if (U(e)) {
      const n = t.stopImmediatePropagation;
      return (
        (t.stopImmediatePropagation = () => {
          n.call(t), (t._stopped = !0);
        }),
        e.map((r) => (s) => !s._stopped && r && r(s))
      );
    } else return e;
  }
  const nl = (t) =>
      t.charCodeAt(0) === 111 &&
      t.charCodeAt(1) === 110 &&
      t.charCodeAt(2) > 96 &&
      t.charCodeAt(2) < 123,
    bm = (t, e, n, r, s, i, a, l, c) => {
      const u = s === "svg";
      e === "class"
        ? im(t, r, u)
        : e === "style"
        ? om(t, n, r)
        : Rs(e)
        ? va(e) || dm(t, e, n, r, a)
        : (
            e[0] === "."
              ? ((e = e.slice(1)), !0)
              : e[0] === "^"
              ? ((e = e.slice(1)), !1)
              : vm(t, e, r, u)
          )
        ? um(t, e, r, i, a, l, c)
        : (e === "true-value"
            ? (t._trueValue = r)
            : e === "false-value" && (t._falseValue = r),
          cm(t, e, r, u));
    };
  function vm(t, e, n, r) {
    if (r)
      return !!(
        e === "innerHTML" ||
        e === "textContent" ||
        (e in t && nl(e) && W(n))
      );
    if (
      e === "spellcheck" ||
      e === "draggable" ||
      e === "translate" ||
      e === "form" ||
      (e === "list" && t.tagName === "INPUT") ||
      (e === "type" && t.tagName === "TEXTAREA")
    )
      return !1;
    if (e === "width" || e === "height") {
      const s = t.tagName;
      if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
        return !1;
    }
    return nl(e) && xe(n) ? !1 : e in t;
  }
  const rl = (t) => {
      const e = t.props["onUpdate:modelValue"] || !1;
      return U(e) ? (n) => is(e, n) : e;
    },
    gi = Symbol("_assign"),
    wm = {
      deep: !0,
      created(t, { value: e, modifiers: { number: n } }, r) {
        const s = js(e);
        yu(t, "change", () => {
          const i = Array.prototype.filter
            .call(t.options, (a) => a.selected)
            .map((a) => (n ? Ta(Cs(a)) : Cs(a)));
          t[gi](t.multiple ? (s ? new Set(i) : i) : i[0]),
            (t._assigning = !0),
            Gc(() => {
              t._assigning = !1;
            });
        }),
          (t[gi] = rl(r));
      },
      mounted(t, { value: e, oldValue: n, modifiers: { number: r } }) {
        sl(t, e, n, r);
      },
      beforeUpdate(t, e, n) {
        t[gi] = rl(n);
      },
      updated(t, { value: e, oldValue: n, modifiers: { number: r } }) {
        t._assigning || sl(t, e, n, r);
      },
    };
  function sl(t, e, n, r) {
    const s = t.multiple,
      i = U(e);
    if (!(s && !i && !js(e)) && !(i && xr(e, n))) {
      for (let a = 0, l = t.options.length; a < l; a++) {
        const c = t.options[a],
          u = Cs(c);
        if (s)
          if (i) {
            const f = typeof u;
            f === "string" || f === "number"
              ? (c.selected = e.includes(r ? Ta(u) : u))
              : (c.selected = dd(e, u) > -1);
          } else c.selected = e.has(u);
        else if (xr(Cs(c), e)) {
          t.selectedIndex !== a && (t.selectedIndex = a);
          return;
        }
      }
      !s && t.selectedIndex !== -1 && (t.selectedIndex = -1);
    }
  }
  function Cs(t) {
    return "_value" in t ? t._value : t.value;
  }
  const Sm = {
      esc: "escape",
      space: " ",
      up: "arrow-up",
      left: "arrow-left",
      right: "arrow-right",
      down: "arrow-down",
      delete: "backspace",
    },
    Es = (t, e) => {
      const n = t._withKeys || (t._withKeys = {}),
        r = e.join(".");
      return (
        n[r] ||
        (n[r] = (s) => {
          if (!("key" in s)) return;
          const i = Tn(s.key);
          if (e.some((a) => a === i || Sm[a] === i)) return t(s);
        })
      );
    },
    Tm = Fe({ patchProp: bm }, rm);
  let il;
  function xm() {
    return il || (il = Dh(Tm));
  }
  const Im = (...t) => {
    const e = xm().createApp(...t),
      { mount: n } = e;
    return (
      (e.mount = (r) => {
        const s = Em(r);
        if (!s) return;
        const i = e._component;
        !W(i) && !i.render && !i.template && (i.template = s.innerHTML),
          (s.innerHTML = "");
        const a = n(s, !1, Cm(s));
        return (
          s instanceof Element &&
            (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
          a
        );
      }),
      e
    );
  };
  function Cm(t) {
    if (t instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && t instanceof MathMLElement)
      return "mathml";
  }
  function Em(t) {
    return xe(t) ? document.querySelector(t) : t;
  }
  const _m = "modulepreload",
    km = function (t) {
      return "/entry/app/" + t;
    },
    al = {},
    Vt = function (e, n, r) {
      let s = Promise.resolve();
      if (n && n.length > 0) {
        let a = function (u) {
          return Promise.all(
            u.map((f) =>
              Promise.resolve(f).then(
                (m) => ({ status: "fulfilled", value: m }),
                (m) => ({ status: "rejected", reason: m })
              )
            )
          );
        };
        document.getElementsByTagName("link");
        const l = document.querySelector("meta[property=csp-nonce]"),
          c =
            (l == null ? void 0 : l.nonce) ||
            (l == null ? void 0 : l.getAttribute("nonce"));
        s = a(
          n.map((u) => {
            if (((u = km(u)), u in al)) return;
            al[u] = !0;
            const f = u.endsWith(".css"),
              m = f ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${u}"]${m}`)) return;
            const g = document.createElement("link");
            if (
              ((g.rel = f ? "stylesheet" : _m),
              f || (g.as = "script"),
              (g.crossOrigin = ""),
              (g.href = u),
              c && g.setAttribute("nonce", c),
              document.head.appendChild(g),
              f)
            )
              return new Promise((y, E) => {
                g.addEventListener("load", y),
                  g.addEventListener("error", () =>
                    E(new Error(`Unable to preload CSS for ${u}`))
                  );
              });
          })
        );
      }
      function i(a) {
        const l = new Event("vite:preloadError", { cancelable: !0 });
        if (((l.payload = a), window.dispatchEvent(l), !l.defaultPrevented))
          throw a;
      }
      return s.then((a) => {
        for (const l of a || []) l.status === "rejected" && i(l.reason);
        return e().catch(i);
      });
    },
    Om = new (class {
      async getFingerprintData() {
        try {
          const t = await this.getFingerprintDataCore();
          return JSON.stringify(t);
        } catch {
          return null;
        }
      }
      async getDeviceData() {
        try {
          return Vt(
            () => import("./ua-parser.CfzgcIAC-B3T_oW8Y.js"),
            __vite__mapDeps([0, 1])
          )
            .then(function (t) {
              return t.u;
            })
            .then(({ default: t }) => t().device.type);
        } catch {
          return null;
        }
      }
      async getFingerprintDataCore() {
        var t, e, n, r, s, i, a;
        try {
          let l = this.getBrowserPlugins(),
            c = await this.getBrowserPermissions(),
            u = this.getConnectionInfo();
          const f = [
            'video/mp4; codecs="avc1.42E01E"',
            'video/ogg; codecs="theora"',
            'video/ogg; codecs="opus"',
            'video/webm; codecs="vp8, vorbis"',
            'video/webm; codecs="vp9"',
          ];
          let m = this.supportsMediaType(f, "video");
          const g = [
            "audio/aac",
            "audio/flac",
            "audio/mpeg",
            'audio/mp4; codecs="mp4a.40.2"',
            'audio/ogg; codecs="flac"',
            'audio/ogg; codecs="vorbis"',
            'audio/ogg; codecs="opus"',
            'audio/wav; codecs="1"',
            'audio/webm; codecs="vorbis"',
            'audio/webm; codecs="opus"',
          ];
          let y = this.supportsMediaType(g, "audio"),
            E = this.getGPUInfo(),
            v = new XMLHttpRequest();
          v.open("GET", document.location, !1), v.send(null);
          let N = v.getAllResponseHeaders().toLowerCase();
          return {
            browserData: {
              app: navigator.appName,
              appVersion: navigator.appVersion,
              cookie: navigator.cookieEnabled,
              doNotTrack: navigator.doNotTrack,
              httpHeaders: N,
              indexedDbUsed: "indexedDB" in window,
              javaEnabled: navigator.javaEnabled,
              language: navigator.language,
              localStorageUsed:
                ((t = window.localStorage) == null ? void 0 : t.length) > 0,
              numCPU: navigator.hardwareConcurrency,
              permissions: c,
              platform: navigator.platform,
              plugins: l,
              product: navigator.product,
              productSub: navigator.productSub,
              sessionStorageUsed:
                ((e = window.sessionStorage) == null ? void 0 : e.length) > 0,
              userAgent: navigator.userAgent,
              vendor: navigator.vendor,
              vendorSub: navigator.vendorSub,
            },
            deviceData: {
              audioFormats: y,
              connection: u,
              fonts: this.getFontAvailability(),
              gpu: E,
              key: window.key,
              locationBarVisible:
                (n = window.locationbar) == null ? void 0 : n.visible,
              mediaDevices: await this.getMediaDevices(),
              memory: navigator.deviceMemory,
              menuBarVisible: (r = window.menubar) == null ? void 0 : r.visible,
              personalBarVisible:
                (s = window.personalbar) == null ? void 0 : s.visible,
              screen: this.getScreenInfo(),
              screenLeft: window.screenLeft,
              screenTop: window.screenTop,
              statusBarVisible:
                (i = window.statusbar) == null ? void 0 : i.visible,
              timeZone: this.getTimeZone(),
              toolBarVisible: (a = window.toolbar) == null ? void 0 : a.visible,
              touchCapable:
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0,
              videoFormats: m,
            },
            detectedBrowser: await this.getDetectedBrowserInfo(),
          };
        } catch {
          return null;
        }
      }
      async getFingerprintDataEncoded() {
        try {
          return await Vt(
            () => import("./index.CGqBXHsi-a3qaMEwt.js"),
            __vite__mapDeps([2, 1])
          )
            .then(function (t) {
              return t.i;
            })
            .then(async ({ default: t }) => {
              const e = await this.getFingerprintDataCore(),
                n = JSON.stringify(e);
              var r = t.deflate(n, { to: "string" });
              return window.btoa(r);
            });
        } catch {
          return null;
        }
      }
      getDetectedBrowserInfo() {
        try {
          return navigator.userAgent
            ? Vt(
                () => import("./ua-parser.CfzgcIAC-B3T_oW8Y.js"),
                __vite__mapDeps([0, 1])
              )
                .then(function (t) {
                  return t.u;
                })
                .then(({ default: t }) => t(navigator.userAgent))
            : Promise.resolve(null);
        } catch {
          return Promise.resolve(null);
        }
      }
      getAudioContext(t) {
        try {
          let e = t.destination;
          return {
            channelCount: e.channelCount,
            channelCountMode: e.channelCountMode,
            channelInterpretation: e.channelInterpretation,
            maxChannelCount: e.maxChannelCount,
            numberOfInputs: e.numberOfInputs,
            numberOfOutputs: e.numberOfOutputs,
            sampleRate: t.sampleRate,
            baseLatency: t.baseLatency,
            state: t.state,
          };
        } catch {
          return null;
        }
      }
      getFrequencyAnalyser(t) {
        try {
          let e = t.createAnalyser();
          return {
            channelCount: e.channelCount,
            channelCountMode: e.channelCountMode,
            channelInterpretation: e.channelInterpretation,
            fftSize: e.fftSize,
            frequencyBinCount: e.frequencyBinCount,
            maxDecibels: e.maxDecibels,
            minDecibels: e.minDecibels,
            numberOfInputs: e.numberOfInputs,
            numberOfOutputs: e.numberOfOutputs,
            smoothingTimeConstant: e.smoothingTimeConstant,
          };
        } catch {
          return null;
        }
      }
      getTimeZone() {
        try {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch {
          return null;
        }
      }
      async getMediaDevices() {
        try {
          let t = [];
          return (
            await navigator.mediaDevices.enumerateDevices().then((e) => {
              e.forEach((n) => {
                t.push(n);
              });
            }),
            t
          );
        } catch {
          return null;
        }
      }
      getScreenInfo() {
        var r;
        let t = screen.width / screen.height,
          e = (
            Math.round(screen.width * t * Math.pow(10, 2)) / Math.pow(10, 2)
          ).toString(),
          n = (
            Math.round(screen.height * t * Math.pow(10, 2)) / Math.pow(10, 2)
          ).toString();
        return {
          availHeight: screen.availHeight,
          availLeft: screen.availLeft,
          availTop: screen.availTop,
          availableWidth: screen.availWidth,
          colorDepth: screen.colorDepth,
          pixelDepth: screen.pixelDepth,
          orientation: (r = screen.orientation) == null ? void 0 : r.type,
          aspectRatio: t.toPrecision(3).toString().concat(":1"),
          resolution: e.concat(" x ").concat(n),
        };
      }
      getFontAvailability() {
        try {
          const t = [
            "Abadi MT Condensed Light",
            "Academy Engraved LET",
            "ADOBE CASLON PRO",
            "Adobe Garamond",
            "ADOBE GARAMOND PRO",
            "Agency FB",
            "Aharoni",
            "Albertus Extra Bold",
            "Albertus Medium",
            "Algerian",
            "Amazone BT",
            "American Typewriter",
            "American Typewriter Condensed",
            "AmerType Md BT",
            "Andalus",
            "Angsana New",
            "AngsanaUPC",
            "Antique Olive",
            "Aparajita",
            "Apple Chancery",
            "Apple Color Emoji",
            "Apple SD Gothic Neo",
            "Arabic Typesetting",
            "ARCHER",
            "ARNO PRO",
            "Arrus BT",
            "Aurora Cn BT",
            "AvantGarde Bk BT",
            "AvantGarde Md BT",
            "AVENIR",
            "Ayuthaya",
            "Bandy",
            "Bangla Sangam MN",
            "Bank Gothic",
            "BankGothic Md BT",
            "Baskerville",
            "Baskerville Old Face",
            "Batang",
            "BatangChe",
            "Bauer Bodoni",
            "'Bauhaus 93'",
            "Bazooka",
            "Bell MT",
            "Bembo",
            "Benguiat Bk BT",
            "Berlin Sans FB",
            "Berlin Sans FB Demi",
            "Bernard MT Condensed",
            "BernhardFashion BT",
            "BernhardMod BT",
            "Big Caslon",
            "BinnerD",
            "Blackadder ITC",
            "BlairMdITC TT",
            "'Bodoni 72'",
            "'Bodoni 72 Oldstyle'",
            "'Bodoni 72 Smallcaps'",
            "Bodoni MT",
            "Bodoni MT Black",
            "Bodoni MT Condensed",
            "Bodoni MT Poster Compressed",
            "'Bookshelf Symbol 7'",
            "Boulder",
            "Bradley Hand",
            "Bradley Hand ITC",
            "Bremen Bd BT",
            "Britannic Bold",
            "Broadway",
            "Browallia New",
            "BrowalliaUPC",
            "Brush Script MT",
            "Californian FB",
            "Calisto MT",
            "Calligrapher",
            "Candara",
            "CaslonOpnface BT",
            "Castellar",
            "Centaur",
            "Cezanne",
            "CG Omega",
            "CG Times",
            "Chalkboard",
            "Chalkboard SE",
            "Chalkduster",
            "Charlesworth",
            "Charter Bd BT",
            "Charter BT",
            "Chaucer",
            "ChelthmITC Bk BT",
            "Chiller",
            "Clarendon",
            "Clarendon Condensed",
            "CloisterBlack BT",
            "Cochin",
            "Colonna MT",
            "Constantia",
            "Cooper Black",
            "Copperplate",
            "Copperplate Gothic",
            "Copperplate Gothic Bold",
            "Copperplate Gothic Light",
            "CopperplGoth Bd BT",
            "Corbel",
            "Cordia New",
            "CordiaUPC",
            "Cornerstone",
            "Coronet",
            "Cuckoo",
            "Curlz MT",
            "DaunPenh",
            "Dauphin",
            "David",
            "DB LCD Temp",
            "DELICIOUS",
            "Denmark",
            "DFKai-SB",
            "Didot",
            "DilleniaUPC",
            "DIN",
            "DokChampa",
            "Dotum",
            "DotumChe",
            "Ebrima",
            "Edwardian Script ITC",
            "Elephant",
            "'English 111 Vivace BT'",
            "Engravers MT",
            "EngraversGothic BT",
            "Eras Bold ITC",
            "Eras Demi ITC",
            "Eras Light ITC",
            "Eras Medium ITC",
            "EucrosiaUPC",
            "Euphemia",
            "Euphemia UCAS",
            "EUROSTILE",
            "'Exotc350 Bd BT'",
            "FangSong",
            "Felix Titling",
            "Fixedsys",
            "FONTIN",
            "Footlight MT Light",
            "Forte",
            "FrankRuehl",
            "Fransiscan",
            "'Freefrm721 Blk BT'",
            "FreesiaUPC",
            "Freestyle Script",
            "French Script MT",
            "FrnkGothITC Bk BT",
            "Fruitger",
            "FRUTIGER",
            "Futura",
            "Futura Bk BT",
            "Futura Lt BT",
            "Futura Md BT",
            "Futura ZBlk BT",
            "FuturaBlack BT",
            "Gabriola",
            "Galliard BT",
            "Gautami",
            "Geeza Pro",
            "'Geometr231 BT'",
            "'Geometr231 Hv BT'",
            "'Geometr231 Lt BT'",
            "'GeoSlab 703 Lt BT'",
            "'GeoSlab 703 XBd BT'",
            "Gigi",
            "Gill Sans",
            "Gill Sans MT",
            "Gill Sans MT Condensed",
            "Gill Sans MT Ext Condensed Bold",
            "Gill Sans Ultra Bold",
            "Gill Sans Ultra Bold Condensed",
            "Gisha",
            "Gloucester MT Extra Condensed",
            "GOTHAM",
            "GOTHAM BOLD",
            "Goudy Old Style",
            "Goudy Stout",
            "GoudyHandtooled BT",
            "GoudyOLSt BT",
            "Gujarati Sangam MN",
            "Gulim",
            "GulimChe",
            "Gungsuh",
            "GungsuhChe",
            "Gurmukhi MN",
            "Haettenschweiler",
            "Harlow Solid Italic",
            "Harrington",
            "Heather",
            "Heiti SC",
            "Heiti TC",
            "HELV",
            "Herald",
            "High Tower Text",
            "Hiragino Kaku Gothic ProN",
            "Hiragino Mincho ProN",
            "Hoefler Text",
            "'Humanst 521 Cn BT'",
            "Humanst521 BT",
            "Humanst521 Lt BT",
            "Imprint MT Shadow",
            "Incised901 Bd BT",
            "Incised901 BT",
            "Incised901 Lt BT",
            "INCONSOLATA",
            "Informal Roman",
            "'Informal011 BT'",
            "INTERSTATE",
            "IrisUPC",
            "Iskoola Pota",
            "JasmineUPC",
            "Jazz LET",
            "Jenson",
            "Jester",
            "Jokerman",
            "Juice ITC",
            "Kabel Bk BT",
            "Kabel Ult BT",
            "Kailasa",
            "KaiTi",
            "Kalinga",
            "Kannada Sangam MN",
            "Kartika",
            "Kaufmann Bd BT",
            "Kaufmann BT",
            "Khmer UI",
            "KodchiangUPC",
            "Kokila",
            "Korinna BT",
            "Kristen ITC",
            "Krungthep",
            "Kunstler Script",
            "Lao UI",
            "Latha",
            "Leelawadee",
            "Letter Gothic",
            "Levenim MT",
            "LilyUPC",
            "Lithograph",
            "Lithograph Light",
            "Long Island",
            "Lydian BT",
            "Magneto",
            "Maiandra GD",
            "Malayalam Sangam MN",
            "Malgun Gothic",
            "Mangal",
            "Marigold",
            "Marion",
            "Marker Felt",
            "Market",
            "Marlett",
            "Matisse ITC",
            "Matura MT Script Capitals",
            "Meiryo",
            "Meiryo UI",
            "Microsoft Himalaya",
            "Microsoft JhengHei",
            "Microsoft New Tai Lue",
            "Microsoft PhagsPa",
            "Microsoft Tai Le",
            "Microsoft Uighur",
            "Microsoft YaHei",
            "Microsoft Yi Baiti",
            "MingLiU",
            "MingLiU_HKSCS",
            "MingLiU_HKSCS-ExtB",
            "MingLiU-ExtB",
            "Minion",
            "Minion Pro",
            "Miriam",
            "Miriam Fixed",
            "Mistral",
            "Modern",
            "'Modern No. 20'",
            "Mona Lisa Solid ITC TT",
            "Mongolian Baiti",
            "MONO",
            "MoolBoran",
            "Mrs Eaves",
            "MS LineDraw",
            "MS Mincho",
            "MS PMincho",
            "MS Reference Specialty",
            "MS UI Gothic",
            "MT Extra",
            "MUSEO",
            "MV Boli",
            "Nadeem",
            "Narkisim",
            "NEVIS",
            "News Gothic",
            "News GothicMT",
            "NewsGoth BT",
            "Niagara Engraved",
            "Niagara Solid",
            "Noteworthy",
            "NSimSun",
            "Nyala",
            "OCR A Extended",
            "Old Century",
            "Old English Text MT",
            "Onyx",
            "Onyx BT",
            "OPTIMA",
            "Oriya Sangam MN",
            "OSAKA",
            "OzHandicraft BT",
            "Palace Script MT",
            "Papyrus",
            "Parchment",
            "Party LET",
            "Pegasus",
            "Perpetua",
            "Perpetua Titling MT",
            "PetitaBold",
            "Pickwick",
            "Plantagenet Cherokee",
            "Playbill",
            "PMingLiU",
            "PMingLiU-ExtB",
            "Poor Richard",
            "Poster",
            "PosterBodoni BT",
            "PRINCETOWN LET",
            "Pristina",
            "PTBarnum BT",
            "Pythagoras",
            "Raavi",
            "Rage Italic",
            "Ravie",
            "Ribbon131 Bd BT",
            "Rockwell",
            "Rockwell Condensed",
            "Rockwell Extra Bold",
            "Rod",
            "Roman",
            "Sakkal Majalla",
            "Santa Fe LET",
            "Savoye LET",
            "Sceptre",
            "Script",
            "Script MT Bold",
            "SCRIPTINA",
            "Serifa",
            "Serifa BT",
            "Serifa Th BT",
            "ShelleyVolante BT",
            "Sherwood",
            "Shonar Bangla",
            "Showcard Gothic",
            "Shruti",
            "Signboard",
            "SILKSCREEN",
            "SimHei",
            "Simplified Arabic",
            "Simplified Arabic Fixed",
            "SimSun",
            "SimSun-ExtB",
            "Sinhala Sangam MN",
            "Sketch Rockwell",
            "Skia",
            "Small Fonts",
            "Snap ITC",
            "Snell Roundhand",
            "Socket",
            "Souvenir Lt BT",
            "Staccato222 BT",
            "Steamer",
            "Stencil",
            "Storybook",
            "Styllo",
            "Subway",
            "Swis721 BlkEx BT",
            "Swiss911 XCm BT",
            "Sylfaen",
            "Synchro LET",
            "System",
            "Tamil Sangam MN",
            "Technical",
            "Teletype",
            "Telugu Sangam MN",
            "Tempus Sans ITC",
            "Terminal",
            "Thonburi",
            "Traditional Arabic",
            "Trajan",
            "TRAJAN PRO",
            "Tristan",
            "Tubular",
            "Tunga",
            "Tw Cen MT",
            "Tw Cen MT Condensed",
            "Tw Cen MT Condensed Extra Bold",
            "TypoUpright BT",
            "Unicorn",
            "Univers",
            "'Univers CE 55 Medium'",
            "Univers Condensed",
            "Utsaah",
            "Vagabond",
            "Vani",
            "Vijaya",
            "Viner Hand ITC",
            "VisualUI",
            "Vivaldi",
            "Vladimir Script",
            "Vrinda",
            "Westminster",
            "WHITNEY",
            "Wide Latin",
            "ZapfEllipt BT",
            "ZapfHumnst BT",
            "ZapfHumnst Dm BT",
            "Zapfino",
            "Zurich BlkEx BT",
            "Zurich Ex BT",
            "ZWAdobeF",
          ];
          let e = 0,
            n = [];
          for (let r = 0; r < t.length; r++)
            document.fonts.check("72px " + t[r]) &&
              (n.push(t[r].replace(/[']+/g, "")), e++);
          return n.unshift("detected: " + e), n;
        } catch {
          return null;
        }
      }
      async getBrowserPermissions() {
        try {
          const t = [
            "geolocation",
            "notifications",
            "push",
            "midi",
            "camera",
            "microphone",
            "persistent-storage",
            "payment-handler",
            "accelerometer",
            "gyroscope",
            "magnetometer",
            "clipboard-read",
            "clipboard-write",
            "background-sync",
          ];
          let e = {};
          for (let n = 0; n < t.length; n++)
            await navigator.permissions
              .query({ name: t[n], userVisibleOnly: !0 })
              .then((r) => {
                e[`${t[n]}`] = r.state;
              })
              .catch((r) => {});
          return e;
        } catch {
          return null;
        }
      }
      getBrowserPlugins() {
        try {
          let t = {};
          for (let e = 0; e < navigator.plugins.length; e++) {
            let n = navigator.plugins[e];
            t[n.name] = {
              name: n.name,
              filename: n.filename,
              version: n.version,
              description: n.description,
            };
          }
          return t;
        } catch {
          return null;
        }
      }
      getConnectionInfo() {
        try {
          return {
            downlink: navigator.connection.downlink,
            downlinkMax: navigator.connection.downlinkMax,
            effectiveType: navigator.connection.effectiveType,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData,
            type: navigator.connection.type,
          };
        } catch {
          return null;
        }
      }
      supportsMediaType(t, e) {
        try {
          let n = {};
          const r = document.createElement(e);
          for (let s = 0; s < t.length; s++) n[`${t[s]}`] = r.canPlayType(t[s]);
          return n;
        } catch {
          return null;
        }
      }
      getGPUInfo() {
        try {
          let t = document.createElement("canvas").getContext("webgl"),
            e = t.getExtension("WEBGL_debug_renderer_info");
          return {
            vendor: t.getParameter(e.UNMASKED_VENDOR_WEBGL),
            renderer: t.getParameter(e.UNMASKED_RENDERER_WEBGL),
            supportedExtensionCount: t.getSupportedExtensions().length,
          };
        } catch {
          return null;
        }
      }
      async getAdditionalDeviceInfo() {
        return await Vt(
          () => import("./GpuTests.DfBqPlOq-BbN1gj9N.js"),
          __vite__mapDeps([3, 1])
        ).then(async ({ GpuFunctions: t }) => {
          var e = {
            gpuTests: await t.getGPUTestResults(),
            audioTests: this.getAudioTestResults(),
          };
          return JSON.stringify(e);
        });
      }
      getAudioTestResults() {
        let t = new (window.AudioContext || window.webkitAudioContext)();
        return {
          audioContext: this.getAudioContext(t),
          frequencyAnalyser: this.getFrequencyAnalyser(t),
        };
      }
    })();
  window.CloudResearch_Utils = { UtilFunctions: Om };
  var bu =
      typeof global == "object" && global && global.Object === Object && global,
    Am = typeof self == "object" && self && self.Object === Object && self,
    Mt = bu || Am || Function("return this")(),
    Wn = Mt.Symbol,
    vu = Object.prototype,
    Mm = vu.hasOwnProperty,
    Lm = vu.toString,
    lr = Wn ? Wn.toStringTag : void 0;
  function Nm(t) {
    var e = Mm.call(t, lr),
      n = t[lr];
    try {
      t[lr] = void 0;
      var r = !0;
    } catch {}
    var s = Lm.call(t);
    return r && (e ? (t[lr] = n) : delete t[lr]), s;
  }
  var Pm = Object.prototype,
    Dm = Pm.toString;
  function Fm(t) {
    return Dm.call(t);
  }
  var Rm = "[object Null]",
    jm = "[object Undefined]",
    ol = Wn ? Wn.toStringTag : void 0;
  function Fr(t) {
    return t == null
      ? t === void 0
        ? jm
        : Rm
      : ol && ol in Object(t)
      ? Nm(t)
      : Fm(t);
  }
  function kr(t) {
    return t != null && typeof t == "object";
  }
  var _s = Array.isArray;
  function wu(t) {
    var e = typeof t;
    return t != null && (e == "object" || e == "function");
  }
  var Bm = "[object AsyncFunction]",
    zm = "[object Function]",
    Hm = "[object GeneratorFunction]",
    Vm = "[object Proxy]";
  function Su(t) {
    if (!wu(t)) return !1;
    var e = Fr(t);
    return e == zm || e == Hm || e == Bm || e == Vm;
  }
  var pi = Mt["__core-js_shared__"],
    ll = (function () {
      var t = /[^.]+$/.exec((pi && pi.keys && pi.keys.IE_PROTO) || "");
      return t ? "Symbol(src)_1." + t : "";
    })();
  function Um(t) {
    return !!ll && ll in t;
  }
  var Zm = Function.prototype,
    Gm = Zm.toString;
  function Cn(t) {
    if (t != null) {
      try {
        return Gm.call(t);
      } catch {}
      try {
        return t + "";
      } catch {}
    }
    return "";
  }
  var Wm = /[\\^$.*+?()[\]{}|]/g,
    qm = /^\[object .+?Constructor\]$/,
    $m = Function.prototype,
    Km = Object.prototype,
    Ym = $m.toString,
    Qm = Km.hasOwnProperty,
    Jm = RegExp(
      "^" +
        Ym.call(Qm)
          .replace(Wm, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function Xm(t) {
    if (!wu(t) || Um(t)) return !1;
    var e = Su(t) ? Jm : qm;
    return e.test(Cn(t));
  }
  function eg(t, e) {
    return t == null ? void 0 : t[e];
  }
  function Qn(t, e) {
    var n = eg(t, e);
    return Xm(n) ? n : void 0;
  }
  var Wi = Qn(Mt, "WeakMap"),
    tg = 9007199254740991,
    ng = /^(?:0|[1-9]\d*)$/;
  function rg(t, e) {
    var n = typeof t;
    return (
      (e = e ?? tg),
      !!e &&
        (n == "number" || (n != "symbol" && ng.test(t))) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
    );
  }
  function Tu(t, e) {
    return t === e || (t !== t && e !== e);
  }
  var sg = 9007199254740991;
  function xu(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= sg;
  }
  function ig(t) {
    return t != null && xu(t.length) && !Su(t);
  }
  var ag = Object.prototype;
  function og(t) {
    var e = t && t.constructor,
      n = (typeof e == "function" && e.prototype) || ag;
    return t === n;
  }
  function lg(t, e) {
    for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
    return r;
  }
  var cg = "[object Arguments]";
  function cl(t) {
    return kr(t) && Fr(t) == cg;
  }
  var Iu = Object.prototype,
    ug = Iu.hasOwnProperty,
    fg = Iu.propertyIsEnumerable,
    dg = cl(
      (function () {
        return arguments;
      })()
    )
      ? cl
      : function (t) {
          return kr(t) && ug.call(t, "callee") && !fg.call(t, "callee");
        };
  function hg() {
    return !1;
  }
  var Cu = typeof It == "object" && It && !It.nodeType && It,
    ul = Cu && typeof Ct == "object" && Ct && !Ct.nodeType && Ct,
    mg = ul && ul.exports === Cu,
    fl = mg ? Mt.Buffer : void 0,
    gg = fl ? fl.isBuffer : void 0,
    qi = gg || hg,
    pg = "[object Arguments]",
    yg = "[object Array]",
    bg = "[object Boolean]",
    vg = "[object Date]",
    wg = "[object Error]",
    Sg = "[object Function]",
    Tg = "[object Map]",
    xg = "[object Number]",
    Ig = "[object Object]",
    Cg = "[object RegExp]",
    Eg = "[object Set]",
    _g = "[object String]",
    kg = "[object WeakMap]",
    Og = "[object ArrayBuffer]",
    Ag = "[object DataView]",
    Mg = "[object Float32Array]",
    Lg = "[object Float64Array]",
    Ng = "[object Int8Array]",
    Pg = "[object Int16Array]",
    Dg = "[object Int32Array]",
    Fg = "[object Uint8Array]",
    Rg = "[object Uint8ClampedArray]",
    jg = "[object Uint16Array]",
    Bg = "[object Uint32Array]",
    fe = {};
  fe[Mg] =
    fe[Lg] =
    fe[Ng] =
    fe[Pg] =
    fe[Dg] =
    fe[Fg] =
    fe[Rg] =
    fe[jg] =
    fe[Bg] =
      !0;
  fe[pg] =
    fe[yg] =
    fe[Og] =
    fe[bg] =
    fe[Ag] =
    fe[vg] =
    fe[wg] =
    fe[Sg] =
    fe[Tg] =
    fe[xg] =
    fe[Ig] =
    fe[Cg] =
    fe[Eg] =
    fe[_g] =
    fe[kg] =
      !1;
  function zg(t) {
    return kr(t) && xu(t.length) && !!fe[Fr(t)];
  }
  function Hg(t) {
    return function (e) {
      return t(e);
    };
  }
  var Eu = typeof It == "object" && It && !It.nodeType && It,
    vr = Eu && typeof Ct == "object" && Ct && !Ct.nodeType && Ct,
    Vg = vr && vr.exports === Eu,
    yi = Vg && bu.process,
    dl = (function () {
      try {
        var t = vr && vr.require && vr.require("util").types;
        return t || (yi && yi.binding && yi.binding("util"));
      } catch {}
    })(),
    hl = dl && dl.isTypedArray,
    _u = hl ? Hg(hl) : zg,
    Ug = Object.prototype,
    Zg = Ug.hasOwnProperty;
  function Gg(t, e) {
    var n = _s(t),
      r = !n && dg(t),
      s = !n && !r && qi(t),
      i = !n && !r && !s && _u(t),
      a = n || r || s || i,
      l = a ? lg(t.length, String) : [],
      c = l.length;
    for (var u in t)
      Zg.call(t, u) &&
        !(
          a &&
          (u == "length" ||
            (s && (u == "offset" || u == "parent")) ||
            (i && (u == "buffer" || u == "byteLength" || u == "byteOffset")) ||
            rg(u, c))
        ) &&
        l.push(u);
    return l;
  }
  function Wg(t, e) {
    return function (n) {
      return t(e(n));
    };
  }
  var qg = Wg(Object.keys, Object),
    $g = Object.prototype,
    Kg = $g.hasOwnProperty;
  function Yg(t) {
    if (!og(t)) return qg(t);
    var e = [];
    for (var n in Object(t)) Kg.call(t, n) && n != "constructor" && e.push(n);
    return e;
  }
  function Qg(t) {
    return ig(t) ? Gg(t) : Yg(t);
  }
  var Or = Qn(Object, "create");
  function Jg() {
    (this.__data__ = Or ? Or(null) : {}), (this.size = 0);
  }
  function Xg(t) {
    var e = this.has(t) && delete this.__data__[t];
    return (this.size -= e ? 1 : 0), e;
  }
  var ep = "__lodash_hash_undefined__",
    tp = Object.prototype,
    np = tp.hasOwnProperty;
  function rp(t) {
    var e = this.__data__;
    if (Or) {
      var n = e[t];
      return n === ep ? void 0 : n;
    }
    return np.call(e, t) ? e[t] : void 0;
  }
  var sp = Object.prototype,
    ip = sp.hasOwnProperty;
  function ap(t) {
    var e = this.__data__;
    return Or ? e[t] !== void 0 : ip.call(e, t);
  }
  var op = "__lodash_hash_undefined__";
  function lp(t, e) {
    var n = this.__data__;
    return (
      (this.size += this.has(t) ? 0 : 1),
      (n[t] = Or && e === void 0 ? op : e),
      this
    );
  }
  function bn(t) {
    var e = -1,
      n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  bn.prototype.clear = Jg;
  bn.prototype.delete = Xg;
  bn.prototype.get = rp;
  bn.prototype.has = ap;
  bn.prototype.set = lp;
  function cp() {
    (this.__data__ = []), (this.size = 0);
  }
  function Ys(t, e) {
    for (var n = t.length; n--; ) if (Tu(t[n][0], e)) return n;
    return -1;
  }
  var up = Array.prototype,
    fp = up.splice;
  function dp(t) {
    var e = this.__data__,
      n = Ys(e, t);
    if (n < 0) return !1;
    var r = e.length - 1;
    return n == r ? e.pop() : fp.call(e, n, 1), --this.size, !0;
  }
  function hp(t) {
    var e = this.__data__,
      n = Ys(e, t);
    return n < 0 ? void 0 : e[n][1];
  }
  function mp(t) {
    return Ys(this.__data__, t) > -1;
  }
  function gp(t, e) {
    var n = this.__data__,
      r = Ys(n, t);
    return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this;
  }
  function Lt(t) {
    var e = -1,
      n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  Lt.prototype.clear = cp;
  Lt.prototype.delete = dp;
  Lt.prototype.get = hp;
  Lt.prototype.has = mp;
  Lt.prototype.set = gp;
  var Ar = Qn(Mt, "Map");
  function pp() {
    (this.size = 0),
      (this.__data__ = {
        hash: new bn(),
        map: new (Ar || Lt)(),
        string: new bn(),
      });
  }
  function yp(t) {
    var e = typeof t;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean"
      ? t !== "__proto__"
      : t === null;
  }
  function Qs(t, e) {
    var n = t.__data__;
    return yp(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
  }
  function bp(t) {
    var e = Qs(this, t).delete(t);
    return (this.size -= e ? 1 : 0), e;
  }
  function vp(t) {
    return Qs(this, t).get(t);
  }
  function wp(t) {
    return Qs(this, t).has(t);
  }
  function Sp(t, e) {
    var n = Qs(this, t),
      r = n.size;
    return n.set(t, e), (this.size += n.size == r ? 0 : 1), this;
  }
  function En(t) {
    var e = -1,
      n = t == null ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  En.prototype.clear = pp;
  En.prototype.delete = bp;
  En.prototype.get = vp;
  En.prototype.has = wp;
  En.prototype.set = Sp;
  function Tp(t, e) {
    for (var n = -1, r = e.length, s = t.length; ++n < r; ) t[s + n] = e[n];
    return t;
  }
  function xp() {
    (this.__data__ = new Lt()), (this.size = 0);
  }
  function Ip(t) {
    var e = this.__data__,
      n = e.delete(t);
    return (this.size = e.size), n;
  }
  function Cp(t) {
    return this.__data__.get(t);
  }
  function Ep(t) {
    return this.__data__.has(t);
  }
  var _p = 200;
  function kp(t, e) {
    var n = this.__data__;
    if (n instanceof Lt) {
      var r = n.__data__;
      if (!Ar || r.length < _p - 1)
        return r.push([t, e]), (this.size = ++n.size), this;
      n = this.__data__ = new En(r);
    }
    return n.set(t, e), (this.size = n.size), this;
  }
  function Wt(t) {
    var e = (this.__data__ = new Lt(t));
    this.size = e.size;
  }
  Wt.prototype.clear = xp;
  Wt.prototype.delete = Ip;
  Wt.prototype.get = Cp;
  Wt.prototype.has = Ep;
  Wt.prototype.set = kp;
  function Op(t, e) {
    for (var n = -1, r = t == null ? 0 : t.length, s = 0, i = []; ++n < r; ) {
      var a = t[n];
      e(a, n, t) && (i[s++] = a);
    }
    return i;
  }
  function Ap() {
    return [];
  }
  var Mp = Object.prototype,
    Lp = Mp.propertyIsEnumerable,
    ml = Object.getOwnPropertySymbols,
    Np = ml
      ? function (t) {
          return t == null
            ? []
            : ((t = Object(t)),
              Op(ml(t), function (e) {
                return Lp.call(t, e);
              }));
        }
      : Ap;
  function Pp(t, e, n) {
    var r = e(t);
    return _s(t) ? r : Tp(r, n(t));
  }
  function gl(t) {
    return Pp(t, Qg, Np);
  }
  var $i = Qn(Mt, "DataView"),
    Ki = Qn(Mt, "Promise"),
    Yi = Qn(Mt, "Set"),
    pl = "[object Map]",
    Dp = "[object Object]",
    yl = "[object Promise]",
    bl = "[object Set]",
    vl = "[object WeakMap]",
    wl = "[object DataView]",
    Fp = Cn($i),
    Rp = Cn(Ar),
    jp = Cn(Ki),
    Bp = Cn(Yi),
    zp = Cn(Wi),
    Ht = Fr;
  (($i && Ht(new $i(new ArrayBuffer(1))) != wl) ||
    (Ar && Ht(new Ar()) != pl) ||
    (Ki && Ht(Ki.resolve()) != yl) ||
    (Yi && Ht(new Yi()) != bl) ||
    (Wi && Ht(new Wi()) != vl)) &&
    (Ht = function (t) {
      var e = Fr(t),
        n = e == Dp ? t.constructor : void 0,
        r = n ? Cn(n) : "";
      if (r)
        switch (r) {
          case Fp:
            return wl;
          case Rp:
            return pl;
          case jp:
            return yl;
          case Bp:
            return bl;
          case zp:
            return vl;
        }
      return e;
    });
  var Sl = Mt.Uint8Array,
    Hp = "__lodash_hash_undefined__";
  function Vp(t) {
    return this.__data__.set(t, Hp), this;
  }
  function Up(t) {
    return this.__data__.has(t);
  }
  function ks(t) {
    var e = -1,
      n = t == null ? 0 : t.length;
    for (this.__data__ = new En(); ++e < n; ) this.add(t[e]);
  }
  ks.prototype.add = ks.prototype.push = Vp;
  ks.prototype.has = Up;
  function Zp(t, e) {
    for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
      if (e(t[n], n, t)) return !0;
    return !1;
  }
  function Gp(t, e) {
    return t.has(e);
  }
  var Wp = 1,
    qp = 2;
  function ku(t, e, n, r, s, i) {
    var a = n & Wp,
      l = t.length,
      c = e.length;
    if (l != c && !(a && c > l)) return !1;
    var u = i.get(t),
      f = i.get(e);
    if (u && f) return u == e && f == t;
    var m = -1,
      g = !0,
      y = n & qp ? new ks() : void 0;
    for (i.set(t, e), i.set(e, t); ++m < l; ) {
      var E = t[m],
        v = e[m];
      if (r) var N = a ? r(v, E, m, e, t, i) : r(E, v, m, t, e, i);
      if (N !== void 0) {
        if (N) continue;
        g = !1;
        break;
      }
      if (y) {
        if (
          !Zp(e, function (S, k) {
            if (!Gp(y, k) && (E === S || s(E, S, n, r, i))) return y.push(k);
          })
        ) {
          g = !1;
          break;
        }
      } else if (!(E === v || s(E, v, n, r, i))) {
        g = !1;
        break;
      }
    }
    return i.delete(t), i.delete(e), g;
  }
  function $p(t) {
    var e = -1,
      n = Array(t.size);
    return (
      t.forEach(function (r, s) {
        n[++e] = [s, r];
      }),
      n
    );
  }
  function Kp(t) {
    var e = -1,
      n = Array(t.size);
    return (
      t.forEach(function (r) {
        n[++e] = r;
      }),
      n
    );
  }
  var Yp = 1,
    Qp = 2,
    Jp = "[object Boolean]",
    Xp = "[object Date]",
    ey = "[object Error]",
    ty = "[object Map]",
    ny = "[object Number]",
    ry = "[object RegExp]",
    sy = "[object Set]",
    iy = "[object String]",
    ay = "[object Symbol]",
    oy = "[object ArrayBuffer]",
    ly = "[object DataView]",
    Tl = Wn ? Wn.prototype : void 0,
    bi = Tl ? Tl.valueOf : void 0;
  function cy(t, e, n, r, s, i, a) {
    switch (n) {
      case ly:
        if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
          return !1;
        (t = t.buffer), (e = e.buffer);
      case oy:
        return !(t.byteLength != e.byteLength || !i(new Sl(t), new Sl(e)));
      case Jp:
      case Xp:
      case ny:
        return Tu(+t, +e);
      case ey:
        return t.name == e.name && t.message == e.message;
      case ry:
      case iy:
        return t == e + "";
      case ty:
        var l = $p;
      case sy:
        var c = r & Yp;
        if ((l || (l = Kp), t.size != e.size && !c)) return !1;
        var u = a.get(t);
        if (u) return u == e;
        (r |= Qp), a.set(t, e);
        var f = ku(l(t), l(e), r, s, i, a);
        return a.delete(t), f;
      case ay:
        if (bi) return bi.call(t) == bi.call(e);
    }
    return !1;
  }
  var uy = 1,
    fy = Object.prototype,
    dy = fy.hasOwnProperty;
  function hy(t, e, n, r, s, i) {
    var a = n & uy,
      l = gl(t),
      c = l.length,
      u = gl(e),
      f = u.length;
    if (c != f && !a) return !1;
    for (var m = c; m--; ) {
      var g = l[m];
      if (!(a ? g in e : dy.call(e, g))) return !1;
    }
    var y = i.get(t),
      E = i.get(e);
    if (y && E) return y == e && E == t;
    var v = !0;
    i.set(t, e), i.set(e, t);
    for (var N = a; ++m < c; ) {
      g = l[m];
      var S = t[g],
        k = e[g];
      if (r) var F = a ? r(k, S, g, e, t, i) : r(S, k, g, t, e, i);
      if (!(F === void 0 ? S === k || s(S, k, n, r, i) : F)) {
        v = !1;
        break;
      }
      N || (N = g == "constructor");
    }
    if (v && !N) {
      var Z = t.constructor,
        Y = e.constructor;
      Z != Y &&
        "constructor" in t &&
        "constructor" in e &&
        !(
          typeof Z == "function" &&
          Z instanceof Z &&
          typeof Y == "function" &&
          Y instanceof Y
        ) &&
        (v = !1);
    }
    return i.delete(t), i.delete(e), v;
  }
  var my = 1,
    xl = "[object Arguments]",
    Il = "[object Array]",
    Qr = "[object Object]",
    gy = Object.prototype,
    Cl = gy.hasOwnProperty;
  function py(t, e, n, r, s, i) {
    var a = _s(t),
      l = _s(e),
      c = a ? Il : Ht(t),
      u = l ? Il : Ht(e);
    (c = c == xl ? Qr : c), (u = u == xl ? Qr : u);
    var f = c == Qr,
      m = u == Qr,
      g = c == u;
    if (g && qi(t)) {
      if (!qi(e)) return !1;
      (a = !0), (f = !1);
    }
    if (g && !f)
      return (
        i || (i = new Wt()),
        a || _u(t) ? ku(t, e, n, r, s, i) : cy(t, e, c, n, r, s, i)
      );
    if (!(n & my)) {
      var y = f && Cl.call(t, "__wrapped__"),
        E = m && Cl.call(e, "__wrapped__");
      if (y || E) {
        var v = y ? t.value() : t,
          N = E ? e.value() : e;
        return i || (i = new Wt()), s(v, N, n, r, i);
      }
    }
    return g ? (i || (i = new Wt()), hy(t, e, n, r, s, i)) : !1;
  }
  function Ou(t, e, n, r, s) {
    return t === e
      ? !0
      : t == null || e == null || (!kr(t) && !kr(e))
      ? t !== t && e !== e
      : py(t, e, n, r, Ou, s);
  }
  function yy(t, e) {
    return Ou(t, e);
  }
  class by {
    constructor() {
      $(this, "isKilled", !1);
      $(this, "stopFn", null);
      $(this, "assignmentId", null);
      $(this, "questionId", null);
      $(this, "oldQuestionId", null);
      $(this, "recordingFn", null);
      $(this, "initialized", !1);
      $(this, "hubConnected", "Connected");
      $(this, "FlaggedEvents", {
        Translation: "translation",
        Hidden: "hidden",
        Resumed: "resumed",
        Copy: "copy",
        Cut: "cut",
        Paste: "paste",
        AutomatedEntryDetection: "automated entry detection",
        CrTranslate: "cr-translate",
        CrAutomatedEntryDetection: "cr-automated-entry-detection",
        CrBadBrowserExtension: "cr-bad-browser-extension",
        BadExtensionDetected: "browser extension",
        Highlight: "highlight",
      });
      $(this, "flaggedDomEvents", [
        "copy",
        "cut",
        "paste",
        this.FlaggedEvents.CrTranslate,
        this.FlaggedEvents.CrAutomatedEntryDetection,
      ]);
      $(this, "eventHandler", null);
      $(this, "connection", null);
      $(this, "connectionStarted", !1);
      $(this, "maxEventLength", 3e4);
      $(this, "Subject", null);
      $(this, "observer", null);
      $(this, "loading", !1);
      $(this, "currentQuestionText", "");
      $(this, "record", null);
      $(this, "pack", null);
      $(this, "unpack", null);
      $(this, "endEventStreamerTimeout", null);
      $(this, "events", []);
      $(this, "isFinished", !1);
      $(this, "studyId", null);
      $(this, "translationApiUrl", null);
      $(this, "pollingIntervalId", null);
      $(this, "translatedQuestionIds", {});
      $(this, "badOpenEndedQuestionIds", {});
      $(this, "initializedOpenEndedListeners", {});
      $(this, "checkingTranslation", !1);
      $(this, "checkingFastTyping", !1);
      $(this, "choices", []);
      $(this, "lastDetectTranslationRequest", {});
      $(this, "ignoreScreenRecording", !1);
      $(this, "typingData", {});
      $(this, "badBrowserExtensionDetected", !1);
      $(this, "pointerUpHandler", null);
      $(this, "isPointerUpListenerAttached", !1);
      $(this, "lastHighlightedText", null);
    }
    async initializeListeners({
      apiUrl: e,
      timeout: n,
      studyId: r,
      translationApiUrl: s,
      ignoreScreenRecording: i,
    }) {
      if (
        ((this.studyId = r),
        (this.translationApiUrl = s),
        (this.ignoreScreenRecording = i),
        !(this.isKilled || n <= 0) && !this.initialized)
      )
        return (
          (this.initialized = !0),
          this.ignoreScreenRecording ||
            (await Vt(async () => {
              const {
                record: a,
                unpack: l,
                pack: c,
              } = await import("./all-ggWHf5Bc.js");
              return { record: a, unpack: l, pack: c };
            }, []).then(({ record: a, unpack: l, pack: c }) => {
              (this.pack = c), (this.unpack = l), (this.record = a);
            })),
          (this.endEventStreamerTimeout = setTimeout(
            () => this.stopEventStreamer(),
            1e4 + n
          )),
          Vt(() => import("./index-fflbE0g_.js"), []).then(
            async ({ Subject: a }) => {
              if (
                ((this.Subject = a),
                "WebSocket" in window || "MozWebSocket" in window)
              )
                await this.startSignalr(e);
              else return;
              (this.eventHandler = this.processEvent()),
                this.flaggedDomEvents.forEach((c) => {
                  document.addEventListener(c, this.eventHandler);
                }),
                this.setPageVisibilityHandler(),
                this.setMutationObserver();
            }
          )
        );
    }
    async stopEventStreamer() {
      try {
        (this.isKilled = !0),
          this.observer.disconnect(),
          this.stopRecording(),
          await this.save(),
          this.connection.stop();
      } catch {}
    }
    startSignalr(e) {
      return Vt(async () => {
        const {
          HubConnectionBuilder: n,
          LogLevel: r,
          HttpTransportType: s,
        } = await import("./index-fflbE0g_.js");
        return { HubConnectionBuilder: n, LogLevel: r, HttpTransportType: s };
      }, []).then(
        ({ HubConnectionBuilder: n, LogLevel: r, HttpTransportType: s }) => {
          (this.connection = new n()
            .withUrl(e, { transport: s.WebSockets, skipNegotiation: !0 })
            .withAutomaticReconnect()
            .configureLogging(r.Information)
            .build()),
            this.start();
        }
      );
    }
    start() {
      try {
        this.connection.start().then(() => {
          (this.connectionStarted = !0), this.recordEvents();
        });
      } catch {
        setTimeout(() => this.start(), 1e3);
      }
    }
    async runCustomEventDetectionAsync() {
      this.detectHighlighting(),
        await this.isQuestionTranslated(),
        await this.detectOpenEndedBehavior(),
        await this.detectBadBrowserExtensions();
    }
    async detectOpenEndedBehavior() {
      try {
        if (!this.questionId || this.badOpenEndedQuestionIds[this.questionId])
          return;
        if (!this.initializedOpenEndedListeners[this.questionId]) {
          const e = document.querySelector(".open-ended, .open-ended-long");
          if (!e) return;
          (this.typingData[this.questionId] = {
            lastTimestamp: null,
            lastLength: 0,
            totalChars: 0,
            inputContent: "",
            intervals: [],
            charCounts: [],
            timeoutId: null,
            isPasting: !1,
            pastedText: "",
          }),
            e.addEventListener("paste", (n) => {
              const r = this.typingData[this.questionId];
              (r.isPasting = !0),
                (r.pastedText = (
                  n.clipboardData || window.clipboardData
                ).getData("text"));
            }),
            e.addEventListener("input", (n) => {
              this.badOpenEndedQuestionIds[this.questionId] ||
                this.processTypingInput(n);
            }),
            (this.initializedOpenEndedListeners[this.questionId] = !0);
        }
      } catch {}
    }
    processTypingInput(e) {
      if (this.getIsDeviceMobile()) return;
      const r = this.typingData[this.questionId],
        s = Date.now(),
        i = e.target.value,
        a = i.length,
        l = a - r.lastLength;
      if (l > 0) {
        const c = r.lastTimestamp ? s - r.lastTimestamp : 1 / 0;
        if (r.intervals.length >= 10 && c < 100) {
          const u = r.intervals.slice(-10).reduce((f, m) => f + m, 0) / 10;
          if (u < 100) {
            this.flagAutomatedTyping(r, (l / (u || 1)) * 1e3);
            return;
          }
        }
        r.intervals.push(c), r.charCounts.push(l), (r.totalChars += l);
      }
      (r.lastTimestamp = s), (r.lastLength = a), (r.inputContent = i);
    }
    getIsDeviceMobile() {
      try {
        return window.innerWidth <= 768;
      } catch {
        return !1;
      }
    }
    flagAutomatedTyping(e, n) {
      if (this.badOpenEndedQuestionIds[this.questionId]) return;
      this.badOpenEndedQuestionIds[this.questionId] = !0;
      const r = {
        typingSpeed: n,
        totalChars: e.totalChars,
        questionId: this.questionId,
        timestamp: new Date(),
      };
      try {
        const s = new CustomEvent(
          this.FlaggedEvents.CrAutomatedEntryDetection,
          { detail: r }
        );
        document.dispatchEvent(s);
      } catch {}
      try {
        const s = this.createEventData(
          this.FlaggedEvents.CrAutomatedEntryDetection,
          r
        );
        this.streamFlaggedEvent(s);
      } catch {}
      this.resetTypingData(this.questionId);
    }
    resetTypingData(e) {
      this.typingData[e] &&
        (clearTimeout(this.typingData[e].timeoutId),
        (this.typingData[e].lastTimestamp = null),
        (this.typingData[e].lastLength = 0),
        (this.typingData[e].intervals = []),
        (this.typingData[e].charCounts = []),
        (this.typingData[e].totalChars = 0),
        (this.typingData[e].inputContent = "")),
        (this.checkingFastTyping = !1);
    }
    async isQuestionTranslated() {
      var g, y;
      if (
        this.checkingTranslation ||
        (this.questionId && this.translatedQuestionIds[this.questionId])
      )
        return;
      const e = this.questionId,
        r = document.getElementsByClassName("cr-p");
      if (!r.length) return;
      this.checkingTranslation = !0;
      const s = r[0],
        i = (s == null ? void 0 : s.textContent) ?? s.innerHTML,
        a = [];
      document.querySelectorAll(".cr-ct").forEach((E) => {
        var N, S;
        const v =
          ((N = E.textContent) == null ? void 0 : N.trim()) ??
          ((S = E.innerHTML) == null ? void 0 : S.trim());
        v && a.push(v);
      });
      const l = [];
      this.choices &&
        this.choices.forEach((E, v) => {
          a.length > v &&
            E.text !== a[v] &&
            l.push({ choiceId: this.choices[v].choiceId, text: a[v] });
        });
      const c = await this.getBrowserTranslationExtensions(),
        u =
          this.currentQuestionText !== i ||
          l.length ||
          c.detectedTranslationExtension,
        f = i == null ? void 0 : i.trim(),
        m = {
          questionId: this.questionId,
          currentText: f,
          assignmentId: this.assignmentId,
          choices: l,
          translationBrowserExtensionData: null,
        };
      if (u) {
        if (
          this.lastDetectTranslationRequest &&
          yy(this.lastDetectTranslationRequest, m)
        ) {
          this.checkingTranslation = !1;
          return;
        } else this.lastDetectTranslationRequest = m;
        let E = [[null], [null]];
        try {
          const v = new CustomEvent(this.FlaggedEvents.CrTranslate, {
            detail: {
              currentText: f,
              originalText:
                (g = this.currentQuestionText) == null ? void 0 : g.trim(),
              languagesDetected: [E[0][0], E[1][0]],
              choices: l,
            },
          });
          c.detectedTranslationExtension &&
            (m.translationBrowserExtensionData = c);
          const S = await (
            await fetch(this.translationApiUrl, {
              method: "POST",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(m),
            })
          ).json();
          S &&
            S.isTranslation &&
            ((this.translatedQuestionIds[this.questionId] = !0),
            (v.detail.metadata = S.metadata),
            m.translationBrowserExtensionData &&
              ((y = v.detail).metadata ?? (y.metadata = {}),
              (v.detail.metadata.translationBrowserExtension =
                m.translationBrowserExtensionData)),
            document.dispatchEvent(v),
            e === this.questionId &&
              this.pollingIntervalId &&
              (clearInterval(this.pollingIntervalId),
              (this.pollingIntervalId = null)));
        } catch {}
      }
      this.checkingTranslation = !1;
    }
    setMutationObserver() {
      try {
        (this.observer = new MutationObserver(async (e) => {
          const n = "cr-p";
          e.filter((s) => s.target.classList.contains(n)).length > 0
            ? await this.runCustomEventDetectionAsync()
            : currentText === originalText &&
              dntElement.hasAttribute("data-translated") &&
              (dntElement.removeAttribute("data-translated"),
              this.addFlaggedEvent(this.FlaggedEvents.Translation, {}));
        })),
          this.setObserver(!0);
      } catch {}
    }
    setObserver(e) {
      if (this.observer)
        if (e) {
          this.pollingIntervalId = setInterval(() => {
            this.runCustomEventDetectionAsync();
          }, 1e3);
          const n = document.querySelector(".cr-p");
          n &&
            (this.observer.observe(n, { subtree: !1, childList: !0 }),
            this.runCustomEventDetectionAsync());
        } else
          this.pollingIntervalId &&
            (clearInterval(this.pollingIntervalId),
            (this.pollingIntervalId = null)),
            this.observer.disconnect();
    }
    setPageVisibilityHandler() {
      let e, n;
      typeof document.hidden < "u"
        ? ((e = "hidden"), (n = "visibilitychange"))
        : typeof document.msHidden < "u"
        ? ((e = "msHidden"), (n = "msvisibilitychange"))
        : typeof document.webkitHidden < "u" &&
          ((e = "webkitHidden"), (n = "webkitvisibilitychange")),
        typeof document.addEventListener > "u" ||
          e === void 0 ||
          document.addEventListener(
            n,
            (r) => {
              if (!this.isFinished) {
                const s = {
                    type: "visibilitychange",
                    hidden: !!document[e],
                    visibilityState: document.visibilityState,
                    isTrusted: r.isTrusted,
                  },
                  i = this.createEventData("visibilitychange", s);
                this.addFlaggedEvent(
                  s.hidden
                    ? this.FlaggedEvents.Hidden
                    : this.FlaggedEvents.Resumed
                ),
                  this.streamFlaggedEvent(i);
              }
            },
            !1
          );
    }
    streamEvent(e) {
      try {
        if (e.type !== "rrweb") return;
        this.connection.state === this.hubConnected &&
          this.connection.invoke("SaveEvent", e).catch((n) => {});
      } catch {}
    }
    streamFlaggedEvent(e) {
      try {
        this.connection.state === this.hubConnected &&
          this.connection.invoke("SaveFlaggedEvent", e).catch((n) => {});
      } catch {}
    }
    async bulkStreamEvents(e) {
      try {
        this.connection.state === this.hubConnected &&
          (await this.connection.invoke("BulkSaveEvents", e));
      } catch {}
    }
    addFlaggedEvent(e, n) {
      this.ignoreScreenRecording ||
        (this.stopFn !== null
          ? this.record.addCustomEvent(e, n)
          : setTimeout(() => {
              try {
                this.record.addCustomEvent(e, n);
              } catch {}
            }, 1e4));
    }
    isFlaggedEvent(e) {
      return (
        this.flaggedDomEvents.includes(e.type) ||
        e.type === this.FlaggedEvents.Hidden ||
        e.type === this.FlaggedEvents.Resumed
      );
    }
    getFlaggedEventDisplay(e) {
      return e === this.FlaggedEvents.CrTranslate
        ? this.FlaggedEvents.Translation
        : e === this.FlaggedEvents.CrAutomatedEntryDetection
        ? this.FlaggedEvents.AutomatedEntryDetection
        : e === this.FlaggedEvents.CrBadBrowserExtension
        ? this.FlaggedEvents.BadExtensionDetected
        : e;
    }
    processEvent() {
      return (e) => {
        const n = this.isFlaggedEvent(e),
          r = this.parseEvent(e);
        n &&
          (this.addFlaggedEvent(this.getFlaggedEventDisplay(e.type), r),
          this.streamFlaggedEvent(this.createEventData(e.type, r))),
          this.streamEvent(this.createEventData(e.type, r));
      };
    }
    createEventData(e, n) {
      return {
        assignmentId: this.assignmentId,
        questionId: this.questionId,
        insertionTime: new Date(),
        eventType: e,
        eventJson: JSON.stringify(n),
        studyId: this.studyId,
      };
    }
    parseEvent(e) {
      let n = { isTrusted: e.isTrusted, type: e.type };
      try {
        switch (e.type) {
          case "contextmenu":
          case "click":
          case "mouseover":
          case "mouseout":
          case "mousemove":
          case "mousedown":
          case "mouseup":
          case "dblclick":
            return { ...n, ...this.parseMouseEvent(e) };
          case "keydown":
          case "keyup":
          case "keypress":
            return { ...n, ...this.parseKeyboardEvent(e) };
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchenter":
          case "touchleave":
          case "touchstart":
            return { ...n, ...this.parseTouchEvent(e) };
          case "focus":
          case "blur":
          case "focusin":
          case "focusout":
            return { ...n };
          case "cr-translate":
            return {
              ...n,
              originalText: e.detail.originalText,
              currentText: e.detail.currentText,
              languagesDetected: e.detail.languagesDetected,
              choices: e.detail.choices,
              metadata: e.detail.metadata,
            };
          case "copy":
            return { copyData: window.getSelection().toString(), ...n };
          case "cut":
            return { cutData: window.getSelection().toString(), ...n };
          case "paste":
            return {
              pasteData: (e.clipboardData || window.clipboardData).getData(
                "text"
              ),
              ...n,
            };
          case this.FlaggedEvents.CrAutomatedEntryDetection:
            return { ...n, detail: e.detail };
          default:
            return { ...n };
        }
      } catch {}
      return { ...n };
    }
    parseTouchEvent(e) {
      function n(r) {
        const s = [];
        for (let i = 0; i < r.length; i++) {
          const a = r[i];
          s.push({
            identifier: a.identifier,
            clientX: a.clientX,
            clientY: a.clientY,
            screenX: a.screenX,
            screenY: a.screenY,
            pageX: a.pageX,
            pageY: a.pageY,
          });
        }
        return s;
      }
      return {
        type: e.type,
        detail: e.detail,
        touches: n(e.touches),
        targetTouches: n(e.targetTouches),
        changedTouches: n(e.changedTouches),
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      };
    }
    parseKeyboardEvent(e) {
      return {
        type: e.type,
        key: e.key,
        code: e.code,
        location: e.location,
        repeat: e.repeat,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      };
    }
    parsePointerEvent(e) {
      return {
        ...parseMouseEvent(e),
        pointerId: e.pointerId,
        width: e.width,
        height: e.height,
        pressure: e.pressure,
        tiltX: e.tiltX,
        tiltY: e.tiltY,
        pointerType: e.pointerType,
        isPrimary: e.isPrimary,
      };
    }
    parseMouseEvent(e) {
      return {
        type: e.type,
        detail: e.detail,
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX,
        clientY: e.clientY,
        button: e.button,
        buttons: e.buttons,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      };
    }
    recordEvents() {
      this.recordingFn = setInterval(() => {
        this.startRecording();
      }, 200);
    }
    startRecording() {
      this.assignmentId != null &&
        !this.ignoreScreenRecording &&
        (clearInterval(this.recordingFn),
        (this.stopFn = this.record({
          emit: (e) => {
            try {
              const n = this.createEventData("rrweb", e),
                r = this.roughSizeOfObject(n);
              if (r >= this.maxEventLength) {
                let s = this.streamLargeEvent(n, r);
                for (let i of s);
              } else this.events.push(n);
            } catch {}
          },
          packFn: this.pack,
          plugins: [],
        })),
        setInterval(() => this.save(), 1 * 1e3));
    }
    save() {
      if (this.events.length === 0) return;
      const e = this.events.map((n) => n);
      (this.events = []),
        this.connection &&
          this.connection.state === this.hubConnected &&
          this.bulkStreamEvents(e);
    }
    *streamLargeEvent(e, n) {
      try {
        if (this.connection.state === this.hubConnected) {
          const r = new this.Subject();
          yield this.connection.send("StreamEvent", r);
          let s = this.chunkSubstr(e.eventJson, 2e4),
            i = e,
            a = 0;
          s.forEach((l) => {
            r.next({ ...i, eventJson: l });
          }),
            r.complete();
        }
      } catch {}
    }
    chunkSubstr(e, n) {
      const r = Math.ceil(e.length / n),
        s = new Array(r);
      for (let i = 0, a = 0; i < r; ++i, a += n) s[i] = e.substr(a, n);
      return s;
    }
    updateInformation({
      assignmentId: e,
      questionId: n,
      questionText: r,
      choices: s,
    }) {
      (this.assignmentId = e),
        (this.questionId = n),
        this.questionId != this.oldQuestionId &&
          ((this.oldQuestionId = this.questionId),
          (this.currentQuestionText = r),
          (this.choices = s),
          this.setObserver(!0));
    }
    stopRecording() {
      try {
        this.ignoreScreenRecording || (this.stopFn(), (this.stopFn = null));
      } catch {}
    }
    async playRecording(e, n, r) {
      let s = {};
      r && (s = { Authorization: `Bearer ${r}` });
      const l = (
        await (
          await fetch(e, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: s,
          })
        ).json()
      ).map((c) => JSON.parse(c.eventJson));
      return l.length > 0
        ? (Vt(async () => {
            const { default: c } = await import("rrweb-player");
            return { default: c };
          }, []).then(({ default: c }) => {
            new c({
              target: n,
              data: {
                events: l,
                autoplay: !0,
                tags: {
                  translation: "rgb(237, 74, 45)",
                  hidden: "rgb(237, 205, 45)",
                  resumed: "rgb(71, 237, 45)",
                  copy: "rgb(200, 195, 95)",
                  cut: "rgb(163, 126, 119)",
                  paste: "rgb(254, 86, 186)",
                  "automated entry detection": "rgb(254, 86, 186)",
                  "browser extension": "rgb(234, 76, 137)",
                  highlight: "rgb(120, 216, 230)",
                },
              },
              showWarning: !1,
              showDebug: !0,
              unpackFn: this.unpack,
              plugins: [],
            });
          }),
          !0)
        : !1;
    }
    roughSizeOfObject(e) {
      for (var n = [], r = [e], s = 0; r.length; ) {
        var i = r.pop();
        if (typeof i == "boolean") s += 4;
        else if (typeof i == "string") s += i.length * 2;
        else if (typeof i == "number") s += 8;
        else if (typeof i == "object" && n.indexOf(i) === -1) {
          n.push(i);
          for (var a in i) r.push(i[a]);
        }
      }
      return s;
    }
    setLoading(e) {
      (this.isLoading = e), this.setObserver(!e);
    }
    setFinished(e) {
      this.isFinished = e;
    }
    dispose() {
      (this.initialized = !1),
        this.flaggedDomEvents.forEach((e) => {
          document.removeEventListener(e, this.eventHandler);
        }),
        this.pointerUpHandler &&
          document.removeEventListener("pointerup", this.pointerUpHandler),
        this.connection && this.connection.stop(),
        this.setObserver(!1);
    }
    async getBrowserTranslationExtensions() {
      try {
        const e = document.querySelectorAll(
          ".notranslate.immersive-translate-target-wrapper"
        );
        if (e.length > 0)
          return {
            detectedTranslationExtension: !0,
            extensionType: "ImmersiveTranslate",
            languages: [
              ...new Set(
                Array.from(e)
                  .map((s) => s.getAttribute("lang"))
                  .filter(Boolean)
              ),
            ],
          };
        const n = document.getElementsByTagName(
          "deepl-inline-translate-tooltip"
        );
        if (n.length > 0 && n[0].shadowRoot) {
          const r = n[0].shadowRoot.querySelector(
            '[data-qa="inline-translate-tooltip"]'
          );
          if (r && r.offsetWidth > 0 && r.offsetHeight > 0) {
            const i = [],
              a = n[0].shadowRoot.querySelector(
                '[data-qa="deepl-language-selection-button"]'
              );
            return (
              a && i.push(a.textContent.trim()),
              {
                detectedTranslationExtension: !0,
                extensionType: "DeepL",
                languages: i,
              }
            );
          }
        }
      } catch (e) {
        return { detectedTranslationExtension: !1, error: e.message };
      }
      return { detectedTranslationExtension: !1 };
    }
    async detectBadBrowserExtensions() {
      try {
        if (this.badBrowserExtensionDetected) return;
        const e = setInterval(() => {
          if (
            document.getElementById("immersive-translate-popup") &&
            !this.badBrowserExtensionDetected
          ) {
            this.badBrowserExtensionDetected = !0;
            const n = "Immersive Translate";
            this.addFlaggedEvent(
              this.getFlaggedEventDisplay(
                this.FlaggedEvents.CrBadBrowserExtension
              ),
              { name: n }
            ),
              this.streamFlaggedEvent(
                this.createEventData(this.FlaggedEvents.CrBadBrowserExtension, {
                  name: n,
                })
              ),
              clearInterval(e);
          }
        }, 1e3);
      } catch {}
    }
    detectHighlighting() {
      this.isPointerUpListenerAttached ||
        ((this.isPointerUpListenerAttached = !0),
        (this.pointerUpHandler = () => {
          try {
            const e = window.getSelection();
            if (!e) return;
            const n = e.toString().trim();
            if (!n || n === this.lastHighlightedText || n.length < 10) return;
            this.lastHighlightedText = n;
            const s = e.anchorNode;
            if (!s) return;
            const i = s.nodeType === Node.TEXT_NODE ? s.parentElement : s,
              a = (i == null ? void 0 : i.closest("input, textarea")) !== null,
              l = { highlightedText: n, isHighlightedInInputOrTextArea: a };
            this.addFlaggedEvent(this.FlaggedEvents.Highlight, l),
              this.streamFlaggedEvent(
                this.createEventData(this.FlaggedEvents.Highlight, l)
              );
          } catch {}
        }),
        document.addEventListener("pointerup", this.pointerUpHandler));
    }
  }
  const nn = new by(),
    vy = {
      scriptLoaded: !1,
      showRecaptchaLabel() {
        document.body.classList.add("showRecaptchaLabel");
      },
      execute(t, e) {
        try {
          return grecaptcha.execute(t, { action: e }).then(function (n) {
            return n;
          });
        } catch {
          return null;
        }
      },
      hideRecaptchaLabel() {
        document.body.classList.remove("showRecaptchaLabel");
      },
    },
    wy = {
      changeTitle(t) {
        document.title = t;
      },
      changeMetaTags(t) {
        for (var e in t)
          if (t.hasOwnProperty(e)) {
            var n = document.querySelector("meta[name='" + e + "']"),
              r = !n;
            r &&
              ((n = document.createElement("META")), n.setAttribute("name", e)),
              n.setAttribute("content", t[e]),
              r && document.head.appendChild(n);
          }
      },
      elementInformation(t) {
        if (t) {
          let e = t.getBoundingClientRect();
          return { x: e.x, width: e.width, height: e.height };
        } else return {};
      },
      addCss(t, e) {
        try {
          var n = document.getElementsByTagName("style"),
            r = Array.prototype.slice.call(n);
          r.forEach((i) => {
            i.id &&
              i.id.startsWith("style-") &&
              document.getElementById(i.id).remove();
          });
        } catch {}
        const s = document.createElement("style");
        (s.textContent = t.replaceAll(".cr-", "#sentry .cr-")),
          e && s.setAttribute("id", e),
          document.head.append(s);
      },
      changeCss(t, e) {
        const n = document.getElementById(e);
        n ? (n.textContent = t) : this.addCss(t, e);
      },
      replaceLogo(t, e) {
        document.querySelectorAll(t).forEach((r) => {
          r.setAttribute("src", e);
        });
      },
      getTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      },
    };
  class Sy {
    async identifyUser() {
      var e;
      try {
        return typeof window > "u" ||
          !((e = window.Verisoul) != null && e.session)
          ? null
          : (await window.Verisoul.session()).session_id;
      } catch {
        return null;
      }
    }
  }
  const Ty = new Sy();
  class _n extends Error {}
  class xy extends _n {
    constructor(e) {
      super(`Invalid DateTime: ${e.toMessage()}`);
    }
  }
  class Iy extends _n {
    constructor(e) {
      super(`Invalid Interval: ${e.toMessage()}`);
    }
  }
  class Cy extends _n {
    constructor(e) {
      super(`Invalid Duration: ${e.toMessage()}`);
    }
  }
  class mr extends _n {}
  class Au extends _n {
    constructor(e) {
      super(`Invalid unit ${e}`);
    }
  }
  class Ke extends _n {}
  class Dt extends _n {
    constructor() {
      super("Zone is an abstract class");
    }
  }
  const A = "numeric",
    ot = "short",
    Ze = "long",
    Os = { year: A, month: A, day: A },
    Fa = { year: A, month: ot, day: A },
    Mu = { year: A, month: ot, day: A, weekday: ot },
    Ra = { year: A, month: Ze, day: A },
    ja = { year: A, month: Ze, day: A, weekday: Ze },
    Ba = { hour: A, minute: A },
    za = { hour: A, minute: A, second: A },
    Ha = { hour: A, minute: A, second: A, timeZoneName: ot },
    Va = { hour: A, minute: A, second: A, timeZoneName: Ze },
    Ua = { hour: A, minute: A, hour12: !1 },
    Za = { hour: A, minute: A, second: A, hour12: !1 },
    Ga = { hour: A, minute: A, second: A, hour12: !1, timeZoneName: ot },
    Wa = { hour: A, minute: A, second: A, hour12: !1, timeZoneName: Ze },
    qa = { year: A, month: A, day: A, hour: A, minute: A },
    $a = { year: A, month: A, day: A, hour: A, minute: A, second: A },
    Ka = { year: A, month: ot, day: A, hour: A, minute: A },
    Ya = { year: A, month: ot, day: A, hour: A, minute: A, second: A },
    Lu = { year: A, month: ot, day: A, weekday: ot, hour: A, minute: A },
    Qa = { year: A, month: Ze, day: A, hour: A, minute: A, timeZoneName: ot },
    Ja = {
      year: A,
      month: Ze,
      day: A,
      hour: A,
      minute: A,
      second: A,
      timeZoneName: ot,
    },
    Xa = {
      year: A,
      month: Ze,
      day: A,
      weekday: Ze,
      hour: A,
      minute: A,
      timeZoneName: Ze,
    },
    eo = {
      year: A,
      month: Ze,
      day: A,
      weekday: Ze,
      hour: A,
      minute: A,
      second: A,
      timeZoneName: Ze,
    };
  function ee(t) {
    return typeof t > "u";
  }
  function vn(t) {
    return typeof t == "number";
  }
  function Js(t) {
    return typeof t == "number" && t % 1 === 0;
  }
  function Ey(t) {
    return typeof t == "string";
  }
  function _y(t) {
    return Object.prototype.toString.call(t) === "[object Date]";
  }
  function yt() {
    try {
      return typeof Intl < "u" && Intl.DateTimeFormat;
    } catch {
      return !1;
    }
  }
  function Rr() {
    return !ee(Intl.DateTimeFormat.prototype.formatToParts);
  }
  function Nu() {
    try {
      return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
    } catch {
      return !1;
    }
  }
  function ky(t) {
    return Array.isArray(t) ? t : [t];
  }
  function El(t, e, n) {
    if (t.length !== 0)
      return t.reduce((r, s) => {
        const i = [e(s), s];
        return r && n(r[0], i[0]) === r[0] ? r : i;
      }, null)[1];
  }
  function Pu(t, e) {
    return e.reduce((n, r) => ((n[r] = t[r]), n), {});
  }
  function qn(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }
  function xt(t, e, n) {
    return Js(t) && t >= e && t <= n;
  }
  function Oy(t, e) {
    return t - e * Math.floor(t / e);
  }
  function Dn(t, e = 2) {
    const n = t < 0 ? "-" : "",
      r = n ? t * -1 : t;
    let s;
    return (
      r.toString().length < e
        ? (s = ("0".repeat(e) + r).slice(-e))
        : (s = r.toString()),
      `${n}${s}`
    );
  }
  function Pe(t) {
    if (!(ee(t) || t === null || t === "")) return parseInt(t, 10);
  }
  function to(t) {
    if (!(ee(t) || t === null || t === "")) {
      const e = parseFloat("0." + t) * 1e3;
      return Math.floor(e);
    }
  }
  function no(t, e, n = !1) {
    const r = 10 ** e;
    return (n ? Math.trunc : Math.round)(t * r) / r;
  }
  function jr(t) {
    return t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0);
  }
  function wr(t) {
    return jr(t) ? 366 : 365;
  }
  function As(t, e) {
    const n = Oy(e - 1, 12) + 1,
      r = t + (e - n) / 12;
    return n === 2
      ? jr(r)
        ? 29
        : 28
      : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
  }
  function ro(t) {
    let e = Date.UTC(
      t.year,
      t.month - 1,
      t.day,
      t.hour,
      t.minute,
      t.second,
      t.millisecond
    );
    return (
      t.year < 100 &&
        t.year >= 0 &&
        ((e = new Date(e)), e.setUTCFullYear(e.getUTCFullYear() - 1900)),
      +e
    );
  }
  function Ms(t) {
    const e =
        (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7,
      n = t - 1,
      r =
        (n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400)) % 7;
    return e === 4 || r === 3 ? 53 : 52;
  }
  function Qi(t) {
    return t > 99 ? t : t > 60 ? 1900 + t : 2e3 + t;
  }
  function Du(t, e, n, r = null) {
    const s = new Date(t),
      i = {
        hour12: !1,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
    r && (i.timeZone = r);
    const a = Object.assign({ timeZoneName: e }, i),
      l = yt();
    if (l && Rr()) {
      const c = new Intl.DateTimeFormat(n, a)
        .formatToParts(s)
        .find((u) => u.type.toLowerCase() === "timezonename");
      return c ? c.value : null;
    } else if (l) {
      const c = new Intl.DateTimeFormat(n, i).format(s);
      return new Intl.DateTimeFormat(n, a)
        .format(s)
        .substring(c.length)
        .replace(/^[, \u200e]+/, "");
    } else return null;
  }
  function Xs(t, e) {
    let n = parseInt(t, 10);
    Number.isNaN(n) && (n = 0);
    const r = parseInt(e, 10) || 0,
      s = n < 0 || Object.is(n, -0) ? -r : r;
    return n * 60 + s;
  }
  function Fu(t) {
    const e = Number(t);
    if (typeof t == "boolean" || t === "" || Number.isNaN(e))
      throw new Ke(`Invalid unit value ${t}`);
    return e;
  }
  function Ls(t, e, n) {
    const r = {};
    for (const s in t)
      if (qn(t, s)) {
        if (n.indexOf(s) >= 0) continue;
        const i = t[s];
        if (i == null) continue;
        r[e(s)] = Fu(i);
      }
    return r;
  }
  function Ns(t, e) {
    const n = Math.trunc(Math.abs(t / 60)),
      r = Math.trunc(Math.abs(t % 60)),
      s = t >= 0 ? "+" : "-";
    switch (e) {
      case "short":
        return `${s}${Dn(n, 2)}:${Dn(r, 2)}`;
      case "narrow":
        return `${s}${n}${r > 0 ? `:${r}` : ""}`;
      case "techie":
        return `${s}${Dn(n, 2)}${Dn(r, 2)}`;
      default:
        throw new RangeError(
          `Value format ${e} is out of range for property format`
        );
    }
  }
  function ei(t) {
    return Pu(t, ["hour", "minute", "second", "millisecond"]);
  }
  const Ru =
    /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;
  function ye(t) {
    return JSON.stringify(t, Object.keys(t).sort());
  }
  const Ay = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ju = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    My = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  function Bu(t) {
    switch (t) {
      case "narrow":
        return [...My];
      case "short":
        return [...ju];
      case "long":
        return [...Ay];
      case "numeric":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      case "2-digit":
        return [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
      default:
        return null;
    }
  }
  const zu = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    Hu = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    Ly = ["M", "T", "W", "T", "F", "S", "S"];
  function Vu(t) {
    switch (t) {
      case "narrow":
        return [...Ly];
      case "short":
        return [...Hu];
      case "long":
        return [...zu];
      case "numeric":
        return ["1", "2", "3", "4", "5", "6", "7"];
      default:
        return null;
    }
  }
  const Uu = ["AM", "PM"],
    Ny = ["Before Christ", "Anno Domini"],
    Py = ["BC", "AD"],
    Dy = ["B", "A"];
  function Zu(t) {
    switch (t) {
      case "narrow":
        return [...Dy];
      case "short":
        return [...Py];
      case "long":
        return [...Ny];
      default:
        return null;
    }
  }
  function Fy(t) {
    return Uu[t.hour < 12 ? 0 : 1];
  }
  function Ry(t, e) {
    return Vu(e)[t.weekday - 1];
  }
  function jy(t, e) {
    return Bu(e)[t.month - 1];
  }
  function By(t, e) {
    return Zu(e)[t.year < 0 ? 0 : 1];
  }
  function zy(t, e, n = "always", r = !1) {
    const s = {
        years: ["year", "yr."],
        quarters: ["quarter", "qtr."],
        months: ["month", "mo."],
        weeks: ["week", "wk."],
        days: ["day", "day", "days"],
        hours: ["hour", "hr."],
        minutes: ["minute", "min."],
        seconds: ["second", "sec."],
      },
      i = ["hours", "minutes", "seconds"].indexOf(t) === -1;
    if (n === "auto" && i) {
      const m = t === "days";
      switch (e) {
        case 1:
          return m ? "tomorrow" : `next ${s[t][0]}`;
        case -1:
          return m ? "yesterday" : `last ${s[t][0]}`;
        case 0:
          return m ? "today" : `this ${s[t][0]}`;
      }
    }
    const a = Object.is(e, -0) || e < 0,
      l = Math.abs(e),
      c = l === 1,
      u = s[t],
      f = r ? (c ? u[1] : u[2] || u[1]) : c ? s[t][0] : t;
    return a ? `${l} ${f} ago` : `in ${l} ${f}`;
  }
  function Hy(t) {
    const e = Pu(t, [
        "weekday",
        "era",
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "timeZoneName",
        "hour12",
      ]),
      n = ye(e),
      r = "EEEE, LLLL d, yyyy, h:mm a";
    switch (n) {
      case ye(Os):
        return "M/d/yyyy";
      case ye(Fa):
        return "LLL d, yyyy";
      case ye(Mu):
        return "EEE, LLL d, yyyy";
      case ye(Ra):
        return "LLLL d, yyyy";
      case ye(ja):
        return "EEEE, LLLL d, yyyy";
      case ye(Ba):
        return "h:mm a";
      case ye(za):
        return "h:mm:ss a";
      case ye(Ha):
        return "h:mm a";
      case ye(Va):
        return "h:mm a";
      case ye(Ua):
        return "HH:mm";
      case ye(Za):
        return "HH:mm:ss";
      case ye(Ga):
        return "HH:mm";
      case ye(Wa):
        return "HH:mm";
      case ye(qa):
        return "M/d/yyyy, h:mm a";
      case ye(Ka):
        return "LLL d, yyyy, h:mm a";
      case ye(Qa):
        return "LLLL d, yyyy, h:mm a";
      case ye(Xa):
        return r;
      case ye($a):
        return "M/d/yyyy, h:mm:ss a";
      case ye(Ya):
        return "LLL d, yyyy, h:mm:ss a";
      case ye(Lu):
        return "EEE, d LLL yyyy, h:mm a";
      case ye(Ja):
        return "LLLL d, yyyy, h:mm:ss a";
      case ye(eo):
        return "EEEE, LLLL d, yyyy, h:mm:ss a";
      default:
        return r;
    }
  }
  function _l(t, e) {
    let n = "";
    for (const r of t) r.literal ? (n += r.val) : (n += e(r.val));
    return n;
  }
  const Vy = {
    D: Os,
    DD: Fa,
    DDD: Ra,
    DDDD: ja,
    t: Ba,
    tt: za,
    ttt: Ha,
    tttt: Va,
    T: Ua,
    TT: Za,
    TTT: Ga,
    TTTT: Wa,
    f: qa,
    ff: Ka,
    fff: Qa,
    ffff: Xa,
    F: $a,
    FF: Ya,
    FFF: Ja,
    FFFF: eo,
  };
  class De {
    static create(e, n = {}) {
      return new De(e, n);
    }
    static parseFormat(e) {
      let n = null,
        r = "",
        s = !1;
      const i = [];
      for (let a = 0; a < e.length; a++) {
        const l = e.charAt(a);
        l === "'"
          ? (r.length > 0 && i.push({ literal: s, val: r }),
            (n = null),
            (r = ""),
            (s = !s))
          : s || l === n
          ? (r += l)
          : (r.length > 0 && i.push({ literal: !1, val: r }), (r = l), (n = l));
      }
      return r.length > 0 && i.push({ literal: s, val: r }), i;
    }
    static macroTokenToFormatOpts(e) {
      return Vy[e];
    }
    constructor(e, n) {
      (this.opts = n), (this.loc = e), (this.systemLoc = null);
    }
    formatWithSystemDefault(e, n) {
      return (
        this.systemLoc === null &&
          (this.systemLoc = this.loc.redefaultToSystem()),
        this.systemLoc.dtFormatter(e, Object.assign({}, this.opts, n)).format()
      );
    }
    formatDateTime(e, n = {}) {
      return this.loc.dtFormatter(e, Object.assign({}, this.opts, n)).format();
    }
    formatDateTimeParts(e, n = {}) {
      return this.loc
        .dtFormatter(e, Object.assign({}, this.opts, n))
        .formatToParts();
    }
    resolvedOptions(e, n = {}) {
      return this.loc
        .dtFormatter(e, Object.assign({}, this.opts, n))
        .resolvedOptions();
    }
    num(e, n = 0) {
      if (this.opts.forceSimple) return Dn(e, n);
      const r = Object.assign({}, this.opts);
      return n > 0 && (r.padTo = n), this.loc.numberFormatter(r).format(e);
    }
    formatDateTimeFromString(e, n) {
      const r = this.loc.listingMode() === "en",
        s =
          this.loc.outputCalendar &&
          this.loc.outputCalendar !== "gregory" &&
          Rr(),
        i = (y, E) => this.loc.extract(e, y, E),
        a = (y) =>
          e.isOffsetFixed && e.offset === 0 && y.allowZ
            ? "Z"
            : e.isValid
            ? e.zone.formatOffset(e.ts, y.format)
            : "",
        l = () => (r ? Fy(e) : i({ hour: "numeric", hour12: !0 }, "dayperiod")),
        c = (y, E) =>
          r
            ? jy(e, y)
            : i(E ? { month: y } : { month: y, day: "numeric" }, "month"),
        u = (y, E) =>
          r
            ? Ry(e, y)
            : i(
                E
                  ? { weekday: y }
                  : { weekday: y, month: "long", day: "numeric" },
                "weekday"
              ),
        f = (y) => {
          const E = De.macroTokenToFormatOpts(y);
          return E ? this.formatWithSystemDefault(e, E) : y;
        },
        m = (y) => (r ? By(e, y) : i({ era: y }, "era")),
        g = (y) => {
          switch (y) {
            case "S":
              return this.num(e.millisecond);
            case "u":
            case "SSS":
              return this.num(e.millisecond, 3);
            case "s":
              return this.num(e.second);
            case "ss":
              return this.num(e.second, 2);
            case "m":
              return this.num(e.minute);
            case "mm":
              return this.num(e.minute, 2);
            case "h":
              return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12);
            case "hh":
              return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12, 2);
            case "H":
              return this.num(e.hour);
            case "HH":
              return this.num(e.hour, 2);
            case "Z":
              return a({ format: "narrow", allowZ: this.opts.allowZ });
            case "ZZ":
              return a({ format: "short", allowZ: this.opts.allowZ });
            case "ZZZ":
              return a({ format: "techie", allowZ: this.opts.allowZ });
            case "ZZZZ":
              return e.zone.offsetName(e.ts, {
                format: "short",
                locale: this.loc.locale,
              });
            case "ZZZZZ":
              return e.zone.offsetName(e.ts, {
                format: "long",
                locale: this.loc.locale,
              });
            case "z":
              return e.zoneName;
            case "a":
              return l();
            case "d":
              return s ? i({ day: "numeric" }, "day") : this.num(e.day);
            case "dd":
              return s ? i({ day: "2-digit" }, "day") : this.num(e.day, 2);
            case "c":
              return this.num(e.weekday);
            case "ccc":
              return u("short", !0);
            case "cccc":
              return u("long", !0);
            case "ccccc":
              return u("narrow", !0);
            case "E":
              return this.num(e.weekday);
            case "EEE":
              return u("short", !1);
            case "EEEE":
              return u("long", !1);
            case "EEEEE":
              return u("narrow", !1);
            case "L":
              return s
                ? i({ month: "numeric", day: "numeric" }, "month")
                : this.num(e.month);
            case "LL":
              return s
                ? i({ month: "2-digit", day: "numeric" }, "month")
                : this.num(e.month, 2);
            case "LLL":
              return c("short", !0);
            case "LLLL":
              return c("long", !0);
            case "LLLLL":
              return c("narrow", !0);
            case "M":
              return s ? i({ month: "numeric" }, "month") : this.num(e.month);
            case "MM":
              return s
                ? i({ month: "2-digit" }, "month")
                : this.num(e.month, 2);
            case "MMM":
              return c("short", !1);
            case "MMMM":
              return c("long", !1);
            case "MMMMM":
              return c("narrow", !1);
            case "y":
              return s ? i({ year: "numeric" }, "year") : this.num(e.year);
            case "yy":
              return s
                ? i({ year: "2-digit" }, "year")
                : this.num(e.year.toString().slice(-2), 2);
            case "yyyy":
              return s ? i({ year: "numeric" }, "year") : this.num(e.year, 4);
            case "yyyyyy":
              return s ? i({ year: "numeric" }, "year") : this.num(e.year, 6);
            case "G":
              return m("short");
            case "GG":
              return m("long");
            case "GGGGG":
              return m("narrow");
            case "kk":
              return this.num(e.weekYear.toString().slice(-2), 2);
            case "kkkk":
              return this.num(e.weekYear, 4);
            case "W":
              return this.num(e.weekNumber);
            case "WW":
              return this.num(e.weekNumber, 2);
            case "o":
              return this.num(e.ordinal);
            case "ooo":
              return this.num(e.ordinal, 3);
            case "q":
              return this.num(e.quarter);
            case "qq":
              return this.num(e.quarter, 2);
            case "X":
              return this.num(Math.floor(e.ts / 1e3));
            case "x":
              return this.num(e.ts);
            default:
              return f(y);
          }
        };
      return _l(De.parseFormat(n), g);
    }
    formatDurationFromString(e, n) {
      const r = (c) => {
          switch (c[0]) {
            case "S":
              return "millisecond";
            case "s":
              return "second";
            case "m":
              return "minute";
            case "h":
              return "hour";
            case "d":
              return "day";
            case "M":
              return "month";
            case "y":
              return "year";
            default:
              return null;
          }
        },
        s = (c) => (u) => {
          const f = r(u);
          return f ? this.num(c.get(f), u.length) : u;
        },
        i = De.parseFormat(n),
        a = i.reduce((c, { literal: u, val: f }) => (u ? c : c.concat(f)), []),
        l = e.shiftTo(...a.map(r).filter((c) => c));
      return _l(i, s(l));
    }
  }
  class it {
    constructor(e, n) {
      (this.reason = e), (this.explanation = n);
    }
    toMessage() {
      return this.explanation
        ? `${this.reason}: ${this.explanation}`
        : this.reason;
    }
  }
  class Br {
    get type() {
      throw new Dt();
    }
    get name() {
      throw new Dt();
    }
    get universal() {
      throw new Dt();
    }
    offsetName(e, n) {
      throw new Dt();
    }
    formatOffset(e, n) {
      throw new Dt();
    }
    offset(e) {
      throw new Dt();
    }
    equals(e) {
      throw new Dt();
    }
    get isValid() {
      throw new Dt();
    }
  }
  let vi = null;
  class so extends Br {
    static get instance() {
      return vi === null && (vi = new so()), vi;
    }
    get type() {
      return "local";
    }
    get name() {
      return yt()
        ? new Intl.DateTimeFormat().resolvedOptions().timeZone
        : "local";
    }
    get universal() {
      return !1;
    }
    offsetName(e, { format: n, locale: r }) {
      return Du(e, n, r);
    }
    formatOffset(e, n) {
      return Ns(this.offset(e), n);
    }
    offset(e) {
      return -new Date(e).getTimezoneOffset();
    }
    equals(e) {
      return e.type === "local";
    }
    get isValid() {
      return !0;
    }
  }
  const Uy = RegExp(`^${Ru.source}$`);
  let fs = {};
  function Zy(t) {
    return (
      fs[t] ||
        (fs[t] = new Intl.DateTimeFormat("en-US", {
          hour12: !1,
          timeZone: t,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })),
      fs[t]
    );
  }
  const Gy = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 };
  function Wy(t, e) {
    const n = t.format(e).replace(/\u200E/g, ""),
      r = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(n),
      [, s, i, a, l, c, u] = r;
    return [a, s, i, l, c, u];
  }
  function qy(t, e) {
    const n = t.formatToParts(e),
      r = [];
    for (let s = 0; s < n.length; s++) {
      const { type: i, value: a } = n[s],
        l = Gy[i];
      ee(l) || (r[l] = parseInt(a, 10));
    }
    return r;
  }
  let Jr = {};
  class Je extends Br {
    static create(e) {
      return Jr[e] || (Jr[e] = new Je(e)), Jr[e];
    }
    static resetCache() {
      (Jr = {}), (fs = {});
    }
    static isValidSpecifier(e) {
      return !!(e && e.match(Uy));
    }
    static isValidZone(e) {
      try {
        return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
      } catch {
        return !1;
      }
    }
    static parseGMTOffset(e) {
      if (e) {
        const n = e.match(/^Etc\/GMT(0|[+-]\d{1,2})$/i);
        if (n) return -60 * parseInt(n[1]);
      }
      return null;
    }
    constructor(e) {
      super(), (this.zoneName = e), (this.valid = Je.isValidZone(e));
    }
    get type() {
      return "iana";
    }
    get name() {
      return this.zoneName;
    }
    get universal() {
      return !1;
    }
    offsetName(e, { format: n, locale: r }) {
      return Du(e, n, r, this.name);
    }
    formatOffset(e, n) {
      return Ns(this.offset(e), n);
    }
    offset(e) {
      const n = new Date(e);
      if (isNaN(n)) return NaN;
      const r = Zy(this.name),
        [s, i, a, l, c, u] = r.formatToParts ? qy(r, n) : Wy(r, n),
        m = ro({
          year: s,
          month: i,
          day: a,
          hour: l === 24 ? 0 : l,
          minute: c,
          second: u,
          millisecond: 0,
        });
      let g = +n;
      const y = g % 1e3;
      return (g -= y >= 0 ? y : 1e3 + y), (m - g) / (60 * 1e3);
    }
    equals(e) {
      return e.type === "iana" && e.name === this.name;
    }
    get isValid() {
      return this.valid;
    }
  }
  let wi = null;
  class ke extends Br {
    static get utcInstance() {
      return wi === null && (wi = new ke(0)), wi;
    }
    static instance(e) {
      return e === 0 ? ke.utcInstance : new ke(e);
    }
    static parseSpecifier(e) {
      if (e) {
        const n = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
        if (n) return new ke(Xs(n[1], n[2]));
      }
      return null;
    }
    constructor(e) {
      super(), (this.fixed = e);
    }
    get type() {
      return "fixed";
    }
    get name() {
      return this.fixed === 0 ? "UTC" : `UTC${Ns(this.fixed, "narrow")}`;
    }
    offsetName() {
      return this.name;
    }
    formatOffset(e, n) {
      return Ns(this.fixed, n);
    }
    get universal() {
      return !0;
    }
    offset() {
      return this.fixed;
    }
    equals(e) {
      return e.type === "fixed" && e.fixed === this.fixed;
    }
    get isValid() {
      return !0;
    }
  }
  class kl extends Br {
    constructor(e) {
      super(), (this.zoneName = e);
    }
    get type() {
      return "invalid";
    }
    get name() {
      return this.zoneName;
    }
    get universal() {
      return !1;
    }
    offsetName() {
      return null;
    }
    formatOffset() {
      return "";
    }
    offset() {
      return NaN;
    }
    equals() {
      return !1;
    }
    get isValid() {
      return !1;
    }
  }
  function on(t, e) {
    let n;
    if (ee(t) || t === null) return e;
    if (t instanceof Br) return t;
    if (Ey(t)) {
      const r = t.toLowerCase();
      return r === "local"
        ? e
        : r === "utc" || r === "gmt"
        ? ke.utcInstance
        : (n = Je.parseGMTOffset(t)) != null
        ? ke.instance(n)
        : Je.isValidSpecifier(r)
        ? Je.create(t)
        : ke.parseSpecifier(r) || new kl(t);
    } else
      return vn(t)
        ? ke.instance(t)
        : typeof t == "object" && t.offset && typeof t.offset == "number"
        ? t
        : new kl(t);
  }
  let Ol = () => Date.now(),
    Si = null,
    Al = null,
    Ml = null,
    Ll = null,
    Nl = !1;
  class Se {
    static get now() {
      return Ol;
    }
    static set now(e) {
      Ol = e;
    }
    static get defaultZoneName() {
      return Se.defaultZone.name;
    }
    static set defaultZoneName(e) {
      e ? (Si = on(e)) : (Si = null);
    }
    static get defaultZone() {
      return Si || so.instance;
    }
    static get defaultLocale() {
      return Al;
    }
    static set defaultLocale(e) {
      Al = e;
    }
    static get defaultNumberingSystem() {
      return Ml;
    }
    static set defaultNumberingSystem(e) {
      Ml = e;
    }
    static get defaultOutputCalendar() {
      return Ll;
    }
    static set defaultOutputCalendar(e) {
      Ll = e;
    }
    static get throwOnInvalid() {
      return Nl;
    }
    static set throwOnInvalid(e) {
      Nl = e;
    }
    static resetCaches() {
      be.resetCache(), Je.resetCache();
    }
  }
  let Ji = {};
  function Xi(t, e = {}) {
    const n = JSON.stringify([t, e]);
    let r = Ji[n];
    return r || ((r = new Intl.DateTimeFormat(t, e)), (Ji[n] = r)), r;
  }
  let ea = {};
  function $y(t, e = {}) {
    const n = JSON.stringify([t, e]);
    let r = ea[n];
    return r || ((r = new Intl.NumberFormat(t, e)), (ea[n] = r)), r;
  }
  let ta = {};
  function Ky(t, e = {}) {
    const { base: n, ...r } = e,
      s = JSON.stringify([t, r]);
    let i = ta[s];
    return i || ((i = new Intl.RelativeTimeFormat(t, e)), (ta[s] = i)), i;
  }
  let sn = null;
  function Yy() {
    if (sn) return sn;
    if (yt()) {
      const t = new Intl.DateTimeFormat().resolvedOptions().locale;
      return (sn = !t || t === "und" ? "en-US" : t), sn;
    } else return (sn = "en-US"), sn;
  }
  function Qy(t) {
    const e = t.indexOf("-u-");
    if (e === -1) return [t];
    {
      let n;
      const r = t.substring(0, e);
      try {
        n = Xi(t).resolvedOptions();
      } catch {
        n = Xi(r).resolvedOptions();
      }
      const { numberingSystem: s, calendar: i } = n;
      return [r, s, i];
    }
  }
  function Jy(t, e, n) {
    return yt()
      ? ((n || e) &&
          ((t += "-u"), n && (t += `-ca-${n}`), e && (t += `-nu-${e}`)),
        t)
      : [];
  }
  function Xy(t) {
    const e = [];
    for (let n = 1; n <= 12; n++) {
      const r = V.utc(2016, n, 1);
      e.push(t(r));
    }
    return e;
  }
  function e0(t) {
    const e = [];
    for (let n = 1; n <= 7; n++) {
      const r = V.utc(2016, 11, 13 + n);
      e.push(t(r));
    }
    return e;
  }
  function Xr(t, e, n, r, s) {
    const i = t.listingMode(n);
    return i === "error" ? null : i === "en" ? r(e) : s(e);
  }
  function t0(t) {
    return t.numberingSystem && t.numberingSystem !== "latn"
      ? !1
      : t.numberingSystem === "latn" ||
          !t.locale ||
          t.locale.startsWith("en") ||
          (yt() &&
            new Intl.DateTimeFormat(t.intl).resolvedOptions()
              .numberingSystem === "latn");
  }
  class n0 {
    constructor(e, n, r) {
      if (
        ((this.padTo = r.padTo || 0), (this.floor = r.floor || !1), !n && yt())
      ) {
        const s = { useGrouping: !1 };
        r.padTo > 0 && (s.minimumIntegerDigits = r.padTo),
          (this.inf = $y(e, s));
      }
    }
    format(e) {
      if (this.inf) {
        const n = this.floor ? Math.floor(e) : e;
        return this.inf.format(n);
      } else {
        const n = this.floor ? Math.floor(e) : no(e, 3);
        return Dn(n, this.padTo);
      }
    }
  }
  class r0 {
    constructor(e, n, r) {
      (this.opts = r), (this.hasIntl = yt());
      let s;
      if (e.zone.universal && this.hasIntl) {
        const i = -1 * (e.offset / 60),
          a = i >= 0 ? `Etc/GMT+${i}` : `Etc/GMT${i}`,
          l = Je.isValidZone(a);
        e.offset !== 0 && l
          ? ((s = a), (this.dt = e))
          : ((s = "UTC"),
            r.timeZoneName
              ? (this.dt = e)
              : (this.dt =
                  e.offset === 0
                    ? e
                    : V.fromMillis(e.ts + e.offset * 60 * 1e3)));
      } else
        e.zone.type === "local"
          ? (this.dt = e)
          : ((this.dt = e), (s = e.zone.name));
      if (this.hasIntl) {
        const i = Object.assign({}, this.opts);
        s && (i.timeZone = s), (this.dtf = Xi(n, i));
      }
    }
    format() {
      if (this.hasIntl) return this.dtf.format(this.dt.toJSDate());
      {
        const e = Hy(this.opts),
          n = be.create("en-US");
        return De.create(n).formatDateTimeFromString(this.dt, e);
      }
    }
    formatToParts() {
      return this.hasIntl && Rr()
        ? this.dtf.formatToParts(this.dt.toJSDate())
        : [];
    }
    resolvedOptions() {
      return this.hasIntl
        ? this.dtf.resolvedOptions()
        : {
            locale: "en-US",
            numberingSystem: "latn",
            outputCalendar: "gregory",
          };
    }
  }
  class s0 {
    constructor(e, n, r) {
      (this.opts = Object.assign({ style: "long" }, r)),
        !n && Nu() && (this.rtf = Ky(e, r));
    }
    format(e, n) {
      return this.rtf
        ? this.rtf.format(e, n)
        : zy(n, e, this.opts.numeric, this.opts.style !== "long");
    }
    formatToParts(e, n) {
      return this.rtf ? this.rtf.formatToParts(e, n) : [];
    }
  }
  class be {
    static fromOpts(e) {
      return be.create(
        e.locale,
        e.numberingSystem,
        e.outputCalendar,
        e.defaultToEN
      );
    }
    static create(e, n, r, s = !1) {
      const i = e || Se.defaultLocale,
        a = i || (s ? "en-US" : Yy()),
        l = n || Se.defaultNumberingSystem,
        c = r || Se.defaultOutputCalendar;
      return new be(a, l, c, i);
    }
    static resetCache() {
      (sn = null), (Ji = {}), (ea = {}), (ta = {});
    }
    static fromObject({
      locale: e,
      numberingSystem: n,
      outputCalendar: r,
    } = {}) {
      return be.create(e, n, r);
    }
    constructor(e, n, r, s) {
      const [i, a, l] = Qy(e);
      (this.locale = i),
        (this.numberingSystem = n || a || null),
        (this.outputCalendar = r || l || null),
        (this.intl = Jy(
          this.locale,
          this.numberingSystem,
          this.outputCalendar
        )),
        (this.weekdaysCache = { format: {}, standalone: {} }),
        (this.monthsCache = { format: {}, standalone: {} }),
        (this.meridiemCache = null),
        (this.eraCache = {}),
        (this.specifiedLocale = s),
        (this.fastNumbersCached = null);
    }
    get fastNumbers() {
      return (
        this.fastNumbersCached == null && (this.fastNumbersCached = t0(this)),
        this.fastNumbersCached
      );
    }
    listingMode(e = !0) {
      const n = yt(),
        r = n && Rr(),
        s = this.isEnglish(),
        i =
          (this.numberingSystem === null || this.numberingSystem === "latn") &&
          (this.outputCalendar === null || this.outputCalendar === "gregory");
      return !r && !(s && i) && !e ? "error" : !r || (s && i) ? "en" : "intl";
    }
    clone(e) {
      return !e || Object.getOwnPropertyNames(e).length === 0
        ? this
        : be.create(
            e.locale || this.specifiedLocale,
            e.numberingSystem || this.numberingSystem,
            e.outputCalendar || this.outputCalendar,
            e.defaultToEN || !1
          );
    }
    redefaultToEN(e = {}) {
      return this.clone(Object.assign({}, e, { defaultToEN: !0 }));
    }
    redefaultToSystem(e = {}) {
      return this.clone(Object.assign({}, e, { defaultToEN: !1 }));
    }
    months(e, n = !1, r = !0) {
      return Xr(this, e, r, Bu, () => {
        const s = n ? { month: e, day: "numeric" } : { month: e },
          i = n ? "format" : "standalone";
        return (
          this.monthsCache[i][e] ||
            (this.monthsCache[i][e] = Xy((a) => this.extract(a, s, "month"))),
          this.monthsCache[i][e]
        );
      });
    }
    weekdays(e, n = !1, r = !0) {
      return Xr(this, e, r, Vu, () => {
        const s = n
            ? { weekday: e, year: "numeric", month: "long", day: "numeric" }
            : { weekday: e },
          i = n ? "format" : "standalone";
        return (
          this.weekdaysCache[i][e] ||
            (this.weekdaysCache[i][e] = e0((a) =>
              this.extract(a, s, "weekday")
            )),
          this.weekdaysCache[i][e]
        );
      });
    }
    meridiems(e = !0) {
      return Xr(
        this,
        void 0,
        e,
        () => Uu,
        () => {
          if (!this.meridiemCache) {
            const n = { hour: "numeric", hour12: !0 };
            this.meridiemCache = [
              V.utc(2016, 11, 13, 9),
              V.utc(2016, 11, 13, 19),
            ].map((r) => this.extract(r, n, "dayperiod"));
          }
          return this.meridiemCache;
        }
      );
    }
    eras(e, n = !0) {
      return Xr(this, e, n, Zu, () => {
        const r = { era: e };
        return (
          this.eraCache[e] ||
            (this.eraCache[e] = [V.utc(-40, 1, 1), V.utc(2017, 1, 1)].map((s) =>
              this.extract(s, r, "era")
            )),
          this.eraCache[e]
        );
      });
    }
    extract(e, n, r) {
      const s = this.dtFormatter(e, n),
        i = s.formatToParts(),
        a = i.find((l) => l.type.toLowerCase() === r);
      return a ? a.value : null;
    }
    numberFormatter(e = {}) {
      return new n0(this.intl, e.forceSimple || this.fastNumbers, e);
    }
    dtFormatter(e, n = {}) {
      return new r0(e, this.intl, n);
    }
    relFormatter(e = {}) {
      return new s0(this.intl, this.isEnglish(), e);
    }
    isEnglish() {
      return (
        this.locale === "en" ||
        this.locale.toLowerCase() === "en-us" ||
        (yt() &&
          new Intl.DateTimeFormat(this.intl)
            .resolvedOptions()
            .locale.startsWith("en-us"))
      );
    }
    equals(e) {
      return (
        this.locale === e.locale &&
        this.numberingSystem === e.numberingSystem &&
        this.outputCalendar === e.outputCalendar
      );
    }
  }
  function Jn(...t) {
    const e = t.reduce((n, r) => n + r.source, "");
    return RegExp(`^${e}$`);
  }
  function kn(...t) {
    return (e) =>
      t
        .reduce(
          ([n, r, s], i) => {
            const [a, l, c] = i(e, s);
            return [Object.assign(n, a), r || l, c];
          },
          [{}, null, 1]
        )
        .slice(0, 2);
  }
  function Xn(t, ...e) {
    if (t == null) return [null, null];
    for (const [n, r] of e) {
      const s = n.exec(t);
      if (s) return r(s);
    }
    return [null, null];
  }
  function Gu(...t) {
    return (e, n) => {
      const r = {};
      let s;
      for (s = 0; s < t.length; s++) r[t[s]] = Pe(e[n + s]);
      return [r, null, n + s];
    };
  }
  const Wu = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
    io = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
    qu = RegExp(`${io.source}${Wu.source}?`),
    ao = RegExp(`(?:T${qu.source})?`),
    i0 = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
    a0 = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
    o0 = /(\d{4})-?(\d{3})/,
    l0 = Gu("weekYear", "weekNumber", "weekDay"),
    c0 = Gu("year", "ordinal"),
    u0 = /(\d{4})-(\d\d)-(\d\d)/,
    $u = RegExp(`${io.source} ?(?:${Wu.source}|(${Ru.source}))?`),
    f0 = RegExp(`(?: ${$u.source})?`);
  function Vn(t, e, n) {
    const r = t[e];
    return ee(r) ? n : Pe(r);
  }
  function Ku(t, e) {
    return [
      { year: Vn(t, e), month: Vn(t, e + 1, 1), day: Vn(t, e + 2, 1) },
      null,
      e + 3,
    ];
  }
  function On(t, e) {
    return [
      {
        hours: Vn(t, e, 0),
        minutes: Vn(t, e + 1, 0),
        seconds: Vn(t, e + 2, 0),
        milliseconds: to(t[e + 3]),
      },
      null,
      e + 4,
    ];
  }
  function er(t, e) {
    const n = !t[e] && !t[e + 1],
      r = Xs(t[e + 1], t[e + 2]),
      s = n ? null : ke.instance(r);
    return [{}, s, e + 3];
  }
  function Yu(t, e) {
    const n = t[e] ? Je.create(t[e]) : null;
    return [{}, n, e + 1];
  }
  const d0 = RegExp(`^T?${io.source}$`),
    h0 =
      /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;
  function m0(t) {
    const [e, n, r, s, i, a, l, c, u] = t,
      f = e[0] === "-",
      m = c && c[0] === "-",
      g = (y, E = !1) => (y !== void 0 && (E || (y && f)) ? -y : y);
    return [
      {
        years: g(Pe(n)),
        months: g(Pe(r)),
        weeks: g(Pe(s)),
        days: g(Pe(i)),
        hours: g(Pe(a)),
        minutes: g(Pe(l)),
        seconds: g(Pe(c), c === "-0"),
        milliseconds: g(to(u), m),
      },
    ];
  }
  const g0 = {
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60,
  };
  function oo(t, e, n, r, s, i, a) {
    const l = {
      year: e.length === 2 ? Qi(Pe(e)) : Pe(e),
      month: ju.indexOf(n) + 1,
      day: Pe(r),
      hour: Pe(s),
      minute: Pe(i),
    };
    return (
      a && (l.second = Pe(a)),
      t && (l.weekday = t.length > 3 ? zu.indexOf(t) + 1 : Hu.indexOf(t) + 1),
      l
    );
  }
  const p0 =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
  function y0(t) {
    const [, e, n, r, s, i, a, l, c, u, f, m] = t,
      g = oo(e, s, r, n, i, a, l);
    let y;
    return c ? (y = g0[c]) : u ? (y = 0) : (y = Xs(f, m)), [g, new ke(y)];
  }
  function b0(t) {
    return t
      .replace(/\([^()]*\)|[\n\t]/g, " ")
      .replace(/(\s\s+)/g, " ")
      .trim();
  }
  const v0 =
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
    w0 =
      /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
    S0 =
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
  function Pl(t) {
    const [, e, n, r, s, i, a, l] = t;
    return [oo(e, s, r, n, i, a, l), ke.utcInstance];
  }
  function T0(t) {
    const [, e, n, r, s, i, a, l] = t;
    return [oo(e, l, n, r, s, i, a), ke.utcInstance];
  }
  const x0 = Jn(i0, ao),
    I0 = Jn(a0, ao),
    C0 = Jn(o0, ao),
    E0 = Jn(qu),
    _0 = kn(Ku, On, er),
    k0 = kn(l0, On, er),
    O0 = kn(c0, On, er),
    A0 = kn(On, er);
  function M0(t) {
    return Xn(t, [x0, _0], [I0, k0], [C0, O0], [E0, A0]);
  }
  function L0(t) {
    return Xn(b0(t), [p0, y0]);
  }
  function N0(t) {
    return Xn(t, [v0, Pl], [w0, Pl], [S0, T0]);
  }
  function P0(t) {
    return Xn(t, [h0, m0]);
  }
  const D0 = kn(On);
  function F0(t) {
    return Xn(t, [d0, D0]);
  }
  const R0 = Jn(u0, f0),
    j0 = Jn($u),
    B0 = kn(Ku, On, er, Yu),
    z0 = kn(On, er, Yu);
  function H0(t) {
    return Xn(t, [R0, B0], [j0, z0]);
  }
  const V0 = "Invalid Duration",
    Qu = {
      weeks: {
        days: 7,
        hours: 7 * 24,
        minutes: 7 * 24 * 60,
        seconds: 7 * 24 * 60 * 60,
        milliseconds: 7 * 24 * 60 * 60 * 1e3,
      },
      days: {
        hours: 24,
        minutes: 24 * 60,
        seconds: 24 * 60 * 60,
        milliseconds: 24 * 60 * 60 * 1e3,
      },
      hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
      minutes: { seconds: 60, milliseconds: 60 * 1e3 },
      seconds: { milliseconds: 1e3 },
    },
    U0 = Object.assign(
      {
        years: {
          quarters: 4,
          months: 12,
          weeks: 52,
          days: 365,
          hours: 365 * 24,
          minutes: 365 * 24 * 60,
          seconds: 365 * 24 * 60 * 60,
          milliseconds: 365 * 24 * 60 * 60 * 1e3,
        },
        quarters: {
          months: 3,
          weeks: 13,
          days: 91,
          hours: 91 * 24,
          minutes: 91 * 24 * 60,
          seconds: 91 * 24 * 60 * 60,
          milliseconds: 91 * 24 * 60 * 60 * 1e3,
        },
        months: {
          weeks: 4,
          days: 30,
          hours: 30 * 24,
          minutes: 30 * 24 * 60,
          seconds: 30 * 24 * 60 * 60,
          milliseconds: 30 * 24 * 60 * 60 * 1e3,
        },
      },
      Qu
    ),
    $e = 146097 / 400,
    Ln = 146097 / 4800,
    Z0 = Object.assign(
      {
        years: {
          quarters: 4,
          months: 12,
          weeks: $e / 7,
          days: $e,
          hours: $e * 24,
          minutes: $e * 24 * 60,
          seconds: $e * 24 * 60 * 60,
          milliseconds: $e * 24 * 60 * 60 * 1e3,
        },
        quarters: {
          months: 3,
          weeks: $e / 28,
          days: $e / 4,
          hours: ($e * 24) / 4,
          minutes: ($e * 24 * 60) / 4,
          seconds: ($e * 24 * 60 * 60) / 4,
          milliseconds: ($e * 24 * 60 * 60 * 1e3) / 4,
        },
        months: {
          weeks: Ln / 7,
          days: Ln,
          hours: Ln * 24,
          minutes: Ln * 24 * 60,
          seconds: Ln * 24 * 60 * 60,
          milliseconds: Ln * 24 * 60 * 60 * 1e3,
        },
      },
      Qu
    ),
    Nn = [
      "years",
      "quarters",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ],
    G0 = Nn.slice(0).reverse();
  function rn(t, e, n = !1) {
    const r = {
      values: n ? e.values : Object.assign({}, t.values, e.values || {}),
      loc: t.loc.clone(e.loc),
      conversionAccuracy: e.conversionAccuracy || t.conversionAccuracy,
    };
    return new ce(r);
  }
  function W0(t) {
    return t < 0 ? Math.floor(t) : Math.ceil(t);
  }
  function Ju(t, e, n, r, s) {
    const i = t[s][n],
      a = e[n] / i,
      l = Math.sign(a) === Math.sign(r[s]),
      c = !l && r[s] !== 0 && Math.abs(a) <= 1 ? W0(a) : Math.trunc(a);
    (r[s] += c), (e[n] -= c * i);
  }
  function q0(t, e) {
    G0.reduce((n, r) => (ee(e[r]) ? n : (n && Ju(t, e, n, e, r), r)), null);
  }
  class ce {
    constructor(e) {
      const n = e.conversionAccuracy === "longterm" || !1;
      (this.values = e.values),
        (this.loc = e.loc || be.create()),
        (this.conversionAccuracy = n ? "longterm" : "casual"),
        (this.invalid = e.invalid || null),
        (this.matrix = n ? Z0 : U0),
        (this.isLuxonDuration = !0);
    }
    static fromMillis(e, n) {
      return ce.fromObject(Object.assign({ milliseconds: e }, n));
    }
    static fromObject(e) {
      if (e == null || typeof e != "object")
        throw new Ke(
          `Duration.fromObject: argument expected to be an object, got ${
            e === null ? "null" : typeof e
          }`
        );
      return new ce({
        values: Ls(e, ce.normalizeUnit, [
          "locale",
          "numberingSystem",
          "conversionAccuracy",
          "zone",
        ]),
        loc: be.fromObject(e),
        conversionAccuracy: e.conversionAccuracy,
      });
    }
    static fromISO(e, n) {
      const [r] = P0(e);
      if (r) {
        const s = Object.assign(r, n);
        return ce.fromObject(s);
      } else
        return ce.invalid(
          "unparsable",
          `the input "${e}" can't be parsed as ISO 8601`
        );
    }
    static fromISOTime(e, n) {
      const [r] = F0(e);
      if (r) {
        const s = Object.assign(r, n);
        return ce.fromObject(s);
      } else
        return ce.invalid(
          "unparsable",
          `the input "${e}" can't be parsed as ISO 8601`
        );
    }
    static invalid(e, n = null) {
      if (!e) throw new Ke("need to specify a reason the Duration is invalid");
      const r = e instanceof it ? e : new it(e, n);
      if (Se.throwOnInvalid) throw new Cy(r);
      return new ce({ invalid: r });
    }
    static normalizeUnit(e) {
      const n = {
        year: "years",
        years: "years",
        quarter: "quarters",
        quarters: "quarters",
        month: "months",
        months: "months",
        week: "weeks",
        weeks: "weeks",
        day: "days",
        days: "days",
        hour: "hours",
        hours: "hours",
        minute: "minutes",
        minutes: "minutes",
        second: "seconds",
        seconds: "seconds",
        millisecond: "milliseconds",
        milliseconds: "milliseconds",
      }[e && e.toLowerCase()];
      if (!n) throw new Au(e);
      return n;
    }
    static isDuration(e) {
      return (e && e.isLuxonDuration) || !1;
    }
    get locale() {
      return this.isValid ? this.loc.locale : null;
    }
    get numberingSystem() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
    toFormat(e, n = {}) {
      const r = Object.assign({}, n, {
        floor: n.round !== !1 && n.floor !== !1,
      });
      return this.isValid
        ? De.create(this.loc, r).formatDurationFromString(this, e)
        : V0;
    }
    toObject(e = {}) {
      if (!this.isValid) return {};
      const n = Object.assign({}, this.values);
      return (
        e.includeConfig &&
          ((n.conversionAccuracy = this.conversionAccuracy),
          (n.numberingSystem = this.loc.numberingSystem),
          (n.locale = this.loc.locale)),
        n
      );
    }
    toISO() {
      if (!this.isValid) return null;
      let e = "P";
      return (
        this.years !== 0 && (e += this.years + "Y"),
        (this.months !== 0 || this.quarters !== 0) &&
          (e += this.months + this.quarters * 3 + "M"),
        this.weeks !== 0 && (e += this.weeks + "W"),
        this.days !== 0 && (e += this.days + "D"),
        (this.hours !== 0 ||
          this.minutes !== 0 ||
          this.seconds !== 0 ||
          this.milliseconds !== 0) &&
          (e += "T"),
        this.hours !== 0 && (e += this.hours + "H"),
        this.minutes !== 0 && (e += this.minutes + "M"),
        (this.seconds !== 0 || this.milliseconds !== 0) &&
          (e += no(this.seconds + this.milliseconds / 1e3, 3) + "S"),
        e === "P" && (e += "T0S"),
        e
      );
    }
    toISOTime(e = {}) {
      if (!this.isValid) return null;
      const n = this.toMillis();
      if (n < 0 || n >= 864e5) return null;
      e = Object.assign(
        {
          suppressMilliseconds: !1,
          suppressSeconds: !1,
          includePrefix: !1,
          format: "extended",
        },
        e
      );
      const r = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
      let s = e.format === "basic" ? "hhmm" : "hh:mm";
      (!e.suppressSeconds || r.seconds !== 0 || r.milliseconds !== 0) &&
        ((s += e.format === "basic" ? "ss" : ":ss"),
        (!e.suppressMilliseconds || r.milliseconds !== 0) && (s += ".SSS"));
      let i = r.toFormat(s);
      return e.includePrefix && (i = "T" + i), i;
    }
    toJSON() {
      return this.toISO();
    }
    toString() {
      return this.toISO();
    }
    toMillis() {
      return this.as("milliseconds");
    }
    valueOf() {
      return this.toMillis();
    }
    plus(e) {
      if (!this.isValid) return this;
      const n = hn(e),
        r = {};
      for (const s of Nn)
        (qn(n.values, s) || qn(this.values, s)) &&
          (r[s] = n.get(s) + this.get(s));
      return rn(this, { values: r }, !0);
    }
    minus(e) {
      if (!this.isValid) return this;
      const n = hn(e);
      return this.plus(n.negate());
    }
    mapUnits(e) {
      if (!this.isValid) return this;
      const n = {};
      for (const r of Object.keys(this.values)) n[r] = Fu(e(this.values[r], r));
      return rn(this, { values: n }, !0);
    }
    get(e) {
      return this[ce.normalizeUnit(e)];
    }
    set(e) {
      if (!this.isValid) return this;
      const n = Object.assign(this.values, Ls(e, ce.normalizeUnit, []));
      return rn(this, { values: n });
    }
    reconfigure({ locale: e, numberingSystem: n, conversionAccuracy: r } = {}) {
      const s = this.loc.clone({ locale: e, numberingSystem: n }),
        i = { loc: s };
      return r && (i.conversionAccuracy = r), rn(this, i);
    }
    as(e) {
      return this.isValid ? this.shiftTo(e).get(e) : NaN;
    }
    normalize() {
      if (!this.isValid) return this;
      const e = this.toObject();
      return q0(this.matrix, e), rn(this, { values: e }, !0);
    }
    shiftTo(...e) {
      if (!this.isValid) return this;
      if (e.length === 0) return this;
      e = e.map((a) => ce.normalizeUnit(a));
      const n = {},
        r = {},
        s = this.toObject();
      let i;
      for (const a of Nn)
        if (e.indexOf(a) >= 0) {
          i = a;
          let l = 0;
          for (const u in r) (l += this.matrix[u][a] * r[u]), (r[u] = 0);
          vn(s[a]) && (l += s[a]);
          const c = Math.trunc(l);
          (n[a] = c), (r[a] = l - c);
          for (const u in s)
            Nn.indexOf(u) > Nn.indexOf(a) && Ju(this.matrix, s, u, n, a);
        } else vn(s[a]) && (r[a] = s[a]);
      for (const a in r)
        r[a] !== 0 && (n[i] += a === i ? r[a] : r[a] / this.matrix[i][a]);
      return rn(this, { values: n }, !0).normalize();
    }
    negate() {
      if (!this.isValid) return this;
      const e = {};
      for (const n of Object.keys(this.values)) e[n] = -this.values[n];
      return rn(this, { values: e }, !0);
    }
    get years() {
      return this.isValid ? this.values.years || 0 : NaN;
    }
    get quarters() {
      return this.isValid ? this.values.quarters || 0 : NaN;
    }
    get months() {
      return this.isValid ? this.values.months || 0 : NaN;
    }
    get weeks() {
      return this.isValid ? this.values.weeks || 0 : NaN;
    }
    get days() {
      return this.isValid ? this.values.days || 0 : NaN;
    }
    get hours() {
      return this.isValid ? this.values.hours || 0 : NaN;
    }
    get minutes() {
      return this.isValid ? this.values.minutes || 0 : NaN;
    }
    get seconds() {
      return this.isValid ? this.values.seconds || 0 : NaN;
    }
    get milliseconds() {
      return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
    get isValid() {
      return this.invalid === null;
    }
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }
    equals(e) {
      if (!this.isValid || !e.isValid || !this.loc.equals(e.loc)) return !1;
      function n(r, s) {
        return r === void 0 || r === 0 ? s === void 0 || s === 0 : r === s;
      }
      for (const r of Nn) if (!n(this.values[r], e.values[r])) return !1;
      return !0;
    }
  }
  function hn(t) {
    if (vn(t)) return ce.fromMillis(t);
    if (ce.isDuration(t)) return t;
    if (typeof t == "object") return ce.fromObject(t);
    throw new Ke(`Unknown duration argument ${t} of type ${typeof t}`);
  }
  const cr = "Invalid Interval";
  function $0(t, e) {
    return !t || !t.isValid
      ? me.invalid("missing or invalid start")
      : !e || !e.isValid
      ? me.invalid("missing or invalid end")
      : e < t
      ? me.invalid(
          "end before start",
          `The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`
        )
      : null;
  }
  class me {
    constructor(e) {
      (this.s = e.start),
        (this.e = e.end),
        (this.invalid = e.invalid || null),
        (this.isLuxonInterval = !0);
    }
    static invalid(e, n = null) {
      if (!e) throw new Ke("need to specify a reason the Interval is invalid");
      const r = e instanceof it ? e : new it(e, n);
      if (Se.throwOnInvalid) throw new Iy(r);
      return new me({ invalid: r });
    }
    static fromDateTimes(e, n) {
      const r = dr(e),
        s = dr(n),
        i = $0(r, s);
      return i ?? new me({ start: r, end: s });
    }
    static after(e, n) {
      const r = hn(n),
        s = dr(e);
      return me.fromDateTimes(s, s.plus(r));
    }
    static before(e, n) {
      const r = hn(n),
        s = dr(e);
      return me.fromDateTimes(s.minus(r), s);
    }
    static fromISO(e, n) {
      const [r, s] = (e || "").split("/", 2);
      if (r && s) {
        let i, a;
        try {
          (i = V.fromISO(r, n)), (a = i.isValid);
        } catch {
          a = !1;
        }
        let l, c;
        try {
          (l = V.fromISO(s, n)), (c = l.isValid);
        } catch {
          c = !1;
        }
        if (a && c) return me.fromDateTimes(i, l);
        if (a) {
          const u = ce.fromISO(s, n);
          if (u.isValid) return me.after(i, u);
        } else if (c) {
          const u = ce.fromISO(r, n);
          if (u.isValid) return me.before(l, u);
        }
      }
      return me.invalid(
        "unparsable",
        `the input "${e}" can't be parsed as ISO 8601`
      );
    }
    static isInterval(e) {
      return (e && e.isLuxonInterval) || !1;
    }
    get start() {
      return this.isValid ? this.s : null;
    }
    get end() {
      return this.isValid ? this.e : null;
    }
    get isValid() {
      return this.invalidReason === null;
    }
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }
    length(e = "milliseconds") {
      return this.isValid ? this.toDuration(e).get(e) : NaN;
    }
    count(e = "milliseconds") {
      if (!this.isValid) return NaN;
      const n = this.start.startOf(e),
        r = this.end.startOf(e);
      return Math.floor(r.diff(n, e).get(e)) + 1;
    }
    hasSame(e) {
      return this.isValid
        ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e)
        : !1;
    }
    isEmpty() {
      return this.s.valueOf() === this.e.valueOf();
    }
    isAfter(e) {
      return this.isValid ? this.s > e : !1;
    }
    isBefore(e) {
      return this.isValid ? this.e <= e : !1;
    }
    contains(e) {
      return this.isValid ? this.s <= e && this.e > e : !1;
    }
    set({ start: e, end: n } = {}) {
      return this.isValid ? me.fromDateTimes(e || this.s, n || this.e) : this;
    }
    splitAt(...e) {
      if (!this.isValid) return [];
      const n = e
          .map(dr)
          .filter((a) => this.contains(a))
          .sort(),
        r = [];
      let { s } = this,
        i = 0;
      for (; s < this.e; ) {
        const a = n[i] || this.e,
          l = +a > +this.e ? this.e : a;
        r.push(me.fromDateTimes(s, l)), (s = l), (i += 1);
      }
      return r;
    }
    splitBy(e) {
      const n = hn(e);
      if (!this.isValid || !n.isValid || n.as("milliseconds") === 0) return [];
      let { s: r } = this,
        s = 1,
        i;
      const a = [];
      for (; r < this.e; ) {
        const l = this.start.plus(n.mapUnits((c) => c * s));
        (i = +l > +this.e ? this.e : l),
          a.push(me.fromDateTimes(r, i)),
          (r = i),
          (s += 1);
      }
      return a;
    }
    divideEqually(e) {
      return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
    }
    overlaps(e) {
      return this.e > e.s && this.s < e.e;
    }
    abutsStart(e) {
      return this.isValid ? +this.e == +e.s : !1;
    }
    abutsEnd(e) {
      return this.isValid ? +e.e == +this.s : !1;
    }
    engulfs(e) {
      return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
    }
    equals(e) {
      return !this.isValid || !e.isValid
        ? !1
        : this.s.equals(e.s) && this.e.equals(e.e);
    }
    intersection(e) {
      if (!this.isValid) return this;
      const n = this.s > e.s ? this.s : e.s,
        r = this.e < e.e ? this.e : e.e;
      return n >= r ? null : me.fromDateTimes(n, r);
    }
    union(e) {
      if (!this.isValid) return this;
      const n = this.s < e.s ? this.s : e.s,
        r = this.e > e.e ? this.e : e.e;
      return me.fromDateTimes(n, r);
    }
    static merge(e) {
      const [n, r] = e
        .sort((s, i) => s.s - i.s)
        .reduce(
          ([s, i], a) =>
            i
              ? i.overlaps(a) || i.abutsStart(a)
                ? [s, i.union(a)]
                : [s.concat([i]), a]
              : [s, a],
          [[], null]
        );
      return r && n.push(r), n;
    }
    static xor(e) {
      let n = null,
        r = 0;
      const s = [],
        i = e.map((c) => [
          { time: c.s, type: "s" },
          { time: c.e, type: "e" },
        ]),
        a = Array.prototype.concat(...i),
        l = a.sort((c, u) => c.time - u.time);
      for (const c of l)
        (r += c.type === "s" ? 1 : -1),
          r === 1
            ? (n = c.time)
            : (n && +n != +c.time && s.push(me.fromDateTimes(n, c.time)),
              (n = null));
      return me.merge(s);
    }
    difference(...e) {
      return me
        .xor([this].concat(e))
        .map((n) => this.intersection(n))
        .filter((n) => n && !n.isEmpty());
    }
    toString() {
      return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : cr;
    }
    toISO(e) {
      return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : cr;
    }
    toISODate() {
      return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : cr;
    }
    toISOTime(e) {
      return this.isValid
        ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}`
        : cr;
    }
    toFormat(e, { separator: n = " – " } = {}) {
      return this.isValid
        ? `${this.s.toFormat(e)}${n}${this.e.toFormat(e)}`
        : cr;
    }
    toDuration(e, n) {
      return this.isValid
        ? this.e.diff(this.s, e, n)
        : ce.invalid(this.invalidReason);
    }
    mapEndpoints(e) {
      return me.fromDateTimes(e(this.s), e(this.e));
    }
  }
  class es {
    static hasDST(e = Se.defaultZone) {
      const n = V.now().setZone(e).set({ month: 12 });
      return !e.universal && n.offset !== n.set({ month: 6 }).offset;
    }
    static isValidIANAZone(e) {
      return Je.isValidSpecifier(e) && Je.isValidZone(e);
    }
    static normalizeZone(e) {
      return on(e, Se.defaultZone);
    }
    static months(
      e = "long",
      {
        locale: n = null,
        numberingSystem: r = null,
        locObj: s = null,
        outputCalendar: i = "gregory",
      } = {}
    ) {
      return (s || be.create(n, r, i)).months(e);
    }
    static monthsFormat(
      e = "long",
      {
        locale: n = null,
        numberingSystem: r = null,
        locObj: s = null,
        outputCalendar: i = "gregory",
      } = {}
    ) {
      return (s || be.create(n, r, i)).months(e, !0);
    }
    static weekdays(
      e = "long",
      { locale: n = null, numberingSystem: r = null, locObj: s = null } = {}
    ) {
      return (s || be.create(n, r, null)).weekdays(e);
    }
    static weekdaysFormat(
      e = "long",
      { locale: n = null, numberingSystem: r = null, locObj: s = null } = {}
    ) {
      return (s || be.create(n, r, null)).weekdays(e, !0);
    }
    static meridiems({ locale: e = null } = {}) {
      return be.create(e).meridiems();
    }
    static eras(e = "short", { locale: n = null } = {}) {
      return be.create(n, null, "gregory").eras(e);
    }
    static features() {
      let e = !1,
        n = !1,
        r = !1,
        s = !1;
      if (yt()) {
        (e = !0), (n = Rr()), (s = Nu());
        try {
          r =
            new Intl.DateTimeFormat("en", {
              timeZone: "America/New_York",
            }).resolvedOptions().timeZone === "America/New_York";
        } catch {
          r = !1;
        }
      }
      return { intl: e, intlTokens: n, zones: r, relative: s };
    }
  }
  function Dl(t, e) {
    const n = (s) => s.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(),
      r = n(e) - n(t);
    return Math.floor(ce.fromMillis(r).as("days"));
  }
  function K0(t, e, n) {
    const r = [
        ["years", (l, c) => c.year - l.year],
        ["quarters", (l, c) => c.quarter - l.quarter],
        ["months", (l, c) => c.month - l.month + (c.year - l.year) * 12],
        [
          "weeks",
          (l, c) => {
            const u = Dl(l, c);
            return (u - (u % 7)) / 7;
          },
        ],
        ["days", Dl],
      ],
      s = {};
    let i, a;
    for (const [l, c] of r)
      if (n.indexOf(l) >= 0) {
        i = l;
        let u = c(t, e);
        (a = t.plus({ [l]: u })),
          a > e ? ((t = t.plus({ [l]: u - 1 })), (u -= 1)) : (t = a),
          (s[l] = u);
      }
    return [t, s, a, i];
  }
  function Y0(t, e, n, r) {
    let [s, i, a, l] = K0(t, e, n);
    const c = e - s,
      u = n.filter(
        (m) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(m) >= 0
      );
    u.length === 0 &&
      (a < e && (a = s.plus({ [l]: 1 })),
      a !== s && (i[l] = (i[l] || 0) + c / (a - s)));
    const f = ce.fromObject(Object.assign(i, r));
    return u.length > 0
      ? ce
          .fromMillis(c, r)
          .shiftTo(...u)
          .plus(f)
      : f;
  }
  const lo = {
      arab: "[٠-٩]",
      arabext: "[۰-۹]",
      bali: "[᭐-᭙]",
      beng: "[০-৯]",
      deva: "[०-९]",
      fullwide: "[０-９]",
      gujr: "[૦-૯]",
      hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
      khmr: "[០-៩]",
      knda: "[೦-೯]",
      laoo: "[໐-໙]",
      limb: "[᥆-᥏]",
      mlym: "[൦-൯]",
      mong: "[᠐-᠙]",
      mymr: "[၀-၉]",
      orya: "[୦-୯]",
      tamldec: "[௦-௯]",
      telu: "[౦-౯]",
      thai: "[๐-๙]",
      tibt: "[༠-༩]",
      latn: "\\d",
    },
    Fl = {
      arab: [1632, 1641],
      arabext: [1776, 1785],
      bali: [6992, 7001],
      beng: [2534, 2543],
      deva: [2406, 2415],
      fullwide: [65296, 65303],
      gujr: [2790, 2799],
      khmr: [6112, 6121],
      knda: [3302, 3311],
      laoo: [3792, 3801],
      limb: [6470, 6479],
      mlym: [3430, 3439],
      mong: [6160, 6169],
      mymr: [4160, 4169],
      orya: [2918, 2927],
      tamldec: [3046, 3055],
      telu: [3174, 3183],
      thai: [3664, 3673],
      tibt: [3872, 3881],
    },
    Q0 = lo.hanidec.replace(/[\[|\]]/g, "").split("");
  function J0(t) {
    let e = parseInt(t, 10);
    if (isNaN(e)) {
      e = "";
      for (let n = 0; n < t.length; n++) {
        const r = t.charCodeAt(n);
        if (t[n].search(lo.hanidec) !== -1) e += Q0.indexOf(t[n]);
        else
          for (const s in Fl) {
            const [i, a] = Fl[s];
            r >= i && r <= a && (e += r - i);
          }
      }
      return parseInt(e, 10);
    } else return e;
  }
  function et({ numberingSystem: t }, e = "") {
    return new RegExp(`${lo[t || "latn"]}${e}`);
  }
  const X0 = "missing Intl.DateTimeFormat.formatToParts support";
  function se(t, e = (n) => n) {
    return { regex: t, deser: ([n]) => e(J0(n)) };
  }
  const eb = " ",
    Xu = `( |${eb})`,
    ef = new RegExp(Xu, "g");
  function tb(t) {
    return t.replace(/\./g, "\\.?").replace(ef, Xu);
  }
  function Rl(t) {
    return t.replace(/\./g, "").replace(ef, " ").toLowerCase();
  }
  function tt(t, e) {
    return t === null
      ? null
      : {
          regex: RegExp(t.map(tb).join("|")),
          deser: ([n]) => t.findIndex((r) => Rl(n) === Rl(r)) + e,
        };
  }
  function jl(t, e) {
    return { regex: t, deser: ([, n, r]) => Xs(n, r), groups: e };
  }
  function Bl(t) {
    return { regex: t, deser: ([e]) => e };
  }
  function nb(t) {
    return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }
  function rb(t, e) {
    const n = et(e),
      r = et(e, "{2}"),
      s = et(e, "{3}"),
      i = et(e, "{4}"),
      a = et(e, "{6}"),
      l = et(e, "{1,2}"),
      c = et(e, "{1,3}"),
      u = et(e, "{1,6}"),
      f = et(e, "{1,9}"),
      m = et(e, "{2,4}"),
      g = et(e, "{4,6}"),
      y = (N) => ({ regex: RegExp(nb(N.val)), deser: ([S]) => S, literal: !0 }),
      v = ((N) => {
        if (t.literal) return y(N);
        switch (N.val) {
          case "G":
            return tt(e.eras("short", !1), 0);
          case "GG":
            return tt(e.eras("long", !1), 0);
          case "y":
            return se(u);
          case "yy":
            return se(m, Qi);
          case "yyyy":
            return se(i);
          case "yyyyy":
            return se(g);
          case "yyyyyy":
            return se(a);
          case "M":
            return se(l);
          case "MM":
            return se(r);
          case "MMM":
            return tt(e.months("short", !0, !1), 1);
          case "MMMM":
            return tt(e.months("long", !0, !1), 1);
          case "L":
            return se(l);
          case "LL":
            return se(r);
          case "LLL":
            return tt(e.months("short", !1, !1), 1);
          case "LLLL":
            return tt(e.months("long", !1, !1), 1);
          case "d":
            return se(l);
          case "dd":
            return se(r);
          case "o":
            return se(c);
          case "ooo":
            return se(s);
          case "HH":
            return se(r);
          case "H":
            return se(l);
          case "hh":
            return se(r);
          case "h":
            return se(l);
          case "mm":
            return se(r);
          case "m":
            return se(l);
          case "q":
            return se(l);
          case "qq":
            return se(r);
          case "s":
            return se(l);
          case "ss":
            return se(r);
          case "S":
            return se(c);
          case "SSS":
            return se(s);
          case "u":
            return Bl(f);
          case "a":
            return tt(e.meridiems(), 0);
          case "kkkk":
            return se(i);
          case "kk":
            return se(m, Qi);
          case "W":
            return se(l);
          case "WW":
            return se(r);
          case "E":
          case "c":
            return se(n);
          case "EEE":
            return tt(e.weekdays("short", !1, !1), 1);
          case "EEEE":
            return tt(e.weekdays("long", !1, !1), 1);
          case "ccc":
            return tt(e.weekdays("short", !0, !1), 1);
          case "cccc":
            return tt(e.weekdays("long", !0, !1), 1);
          case "Z":
          case "ZZ":
            return jl(new RegExp(`([+-]${l.source})(?::(${r.source}))?`), 2);
          case "ZZZ":
            return jl(new RegExp(`([+-]${l.source})(${r.source})?`), 2);
          case "z":
            return Bl(/[a-z_+-/]{1,256}?/i);
          default:
            return y(N);
        }
      })(t) || { invalidReason: X0 };
    return (v.token = t), v;
  }
  const sb = {
    year: { "2-digit": "yy", numeric: "yyyyy" },
    month: { numeric: "M", "2-digit": "MM", short: "MMM", long: "MMMM" },
    day: { numeric: "d", "2-digit": "dd" },
    weekday: { short: "EEE", long: "EEEE" },
    dayperiod: "a",
    dayPeriod: "a",
    hour: { numeric: "h", "2-digit": "hh" },
    minute: { numeric: "m", "2-digit": "mm" },
    second: { numeric: "s", "2-digit": "ss" },
  };
  function ib(t, e, n) {
    const { type: r, value: s } = t;
    if (r === "literal") return { literal: !0, val: s };
    const i = n[r];
    let a = sb[r];
    if ((typeof a == "object" && (a = a[i]), a)) return { literal: !1, val: a };
  }
  function ab(t) {
    return [
      `^${t.map((n) => n.regex).reduce((n, r) => `${n}(${r.source})`, "")}$`,
      t,
    ];
  }
  function ob(t, e, n) {
    const r = t.match(e);
    if (r) {
      const s = {};
      let i = 1;
      for (const a in n)
        if (qn(n, a)) {
          const l = n[a],
            c = l.groups ? l.groups + 1 : 1;
          !l.literal &&
            l.token &&
            (s[l.token.val[0]] = l.deser(r.slice(i, i + c))),
            (i += c);
        }
      return [r, s];
    } else return [r, {}];
  }
  function lb(t) {
    const e = (s) => {
      switch (s) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
        case "H":
          return "hour";
        case "d":
          return "day";
        case "o":
          return "ordinal";
        case "L":
        case "M":
          return "month";
        case "y":
          return "year";
        case "E":
        case "c":
          return "weekday";
        case "W":
          return "weekNumber";
        case "k":
          return "weekYear";
        case "q":
          return "quarter";
        default:
          return null;
      }
    };
    let n;
    return (
      ee(t.Z)
        ? ee(t.z)
          ? (n = null)
          : (n = Je.create(t.z))
        : (n = new ke(t.Z)),
      ee(t.q) || (t.M = (t.q - 1) * 3 + 1),
      ee(t.h) ||
        (t.h < 12 && t.a === 1
          ? (t.h += 12)
          : t.h === 12 && t.a === 0 && (t.h = 0)),
      t.G === 0 && t.y && (t.y = -t.y),
      ee(t.u) || (t.S = to(t.u)),
      [
        Object.keys(t).reduce((s, i) => {
          const a = e(i);
          return a && (s[a] = t[i]), s;
        }, {}),
        n,
      ]
    );
  }
  let Ti = null;
  function cb() {
    return Ti || (Ti = V.fromMillis(1555555555555)), Ti;
  }
  function ub(t, e) {
    if (t.literal) return t;
    const n = De.macroTokenToFormatOpts(t.val);
    if (!n) return t;
    const i = De.create(e, n)
      .formatDateTimeParts(cb())
      .map((a) => ib(a, e, n));
    return i.includes(void 0) ? t : i;
  }
  function fb(t, e) {
    return Array.prototype.concat(...t.map((n) => ub(n, e)));
  }
  function tf(t, e, n) {
    const r = fb(De.parseFormat(n), t),
      s = r.map((a) => rb(a, t)),
      i = s.find((a) => a.invalidReason);
    if (i) return { input: e, tokens: r, invalidReason: i.invalidReason };
    {
      const [a, l] = ab(s),
        c = RegExp(a, "i"),
        [u, f] = ob(e, c, l),
        [m, g] = f ? lb(f) : [null, null];
      if (qn(f, "a") && qn(f, "H"))
        throw new mr("Can't include meridiem when specifying 24-hour format");
      return {
        input: e,
        tokens: r,
        regex: c,
        rawMatches: u,
        matches: f,
        result: m,
        zone: g,
      };
    }
  }
  function db(t, e, n) {
    const { result: r, zone: s, invalidReason: i } = tf(t, e, n);
    return [r, s, i];
  }
  const nf = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    rf = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  function Qe(t, e) {
    return new it(
      "unit out of range",
      `you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`
    );
  }
  function sf(t, e, n) {
    const r = new Date(Date.UTC(t, e - 1, n)).getUTCDay();
    return r === 0 ? 7 : r;
  }
  function af(t, e, n) {
    return n + (jr(t) ? rf : nf)[e - 1];
  }
  function of(t, e) {
    const n = jr(t) ? rf : nf,
      r = n.findIndex((i) => i < e),
      s = e - n[r];
    return { month: r + 1, day: s };
  }
  function na(t) {
    const { year: e, month: n, day: r } = t,
      s = af(e, n, r),
      i = sf(e, n, r);
    let a = Math.floor((s - i + 10) / 7),
      l;
    return (
      a < 1
        ? ((l = e - 1), (a = Ms(l)))
        : a > Ms(e)
        ? ((l = e + 1), (a = 1))
        : (l = e),
      Object.assign({ weekYear: l, weekNumber: a, weekday: i }, ei(t))
    );
  }
  function zl(t) {
    const { weekYear: e, weekNumber: n, weekday: r } = t,
      s = sf(e, 1, 4),
      i = wr(e);
    let a = n * 7 + r - s - 3,
      l;
    a < 1
      ? ((l = e - 1), (a += wr(l)))
      : a > i
      ? ((l = e + 1), (a -= wr(e)))
      : (l = e);
    const { month: c, day: u } = of(l, a);
    return Object.assign({ year: l, month: c, day: u }, ei(t));
  }
  function xi(t) {
    const { year: e, month: n, day: r } = t,
      s = af(e, n, r);
    return Object.assign({ year: e, ordinal: s }, ei(t));
  }
  function Hl(t) {
    const { year: e, ordinal: n } = t,
      { month: r, day: s } = of(e, n);
    return Object.assign({ year: e, month: r, day: s }, ei(t));
  }
  function hb(t) {
    const e = Js(t.weekYear),
      n = xt(t.weekNumber, 1, Ms(t.weekYear)),
      r = xt(t.weekday, 1, 7);
    return e
      ? n
        ? r
          ? !1
          : Qe("weekday", t.weekday)
        : Qe("week", t.week)
      : Qe("weekYear", t.weekYear);
  }
  function mb(t) {
    const e = Js(t.year),
      n = xt(t.ordinal, 1, wr(t.year));
    return e ? (n ? !1 : Qe("ordinal", t.ordinal)) : Qe("year", t.year);
  }
  function lf(t) {
    const e = Js(t.year),
      n = xt(t.month, 1, 12),
      r = xt(t.day, 1, As(t.year, t.month));
    return e
      ? n
        ? r
          ? !1
          : Qe("day", t.day)
        : Qe("month", t.month)
      : Qe("year", t.year);
  }
  function cf(t) {
    const { hour: e, minute: n, second: r, millisecond: s } = t,
      i = xt(e, 0, 23) || (e === 24 && n === 0 && r === 0 && s === 0),
      a = xt(n, 0, 59),
      l = xt(r, 0, 59),
      c = xt(s, 0, 999);
    return i
      ? a
        ? l
          ? c
            ? !1
            : Qe("millisecond", s)
          : Qe("second", r)
        : Qe("minute", n)
      : Qe("hour", e);
  }
  const Ii = "Invalid DateTime",
    gb = 864e13;
  function ts(t) {
    return new it("unsupported zone", `the zone "${t.name}" is not supported`);
  }
  function Ci(t) {
    return t.weekData === null && (t.weekData = na(t.c)), t.weekData;
  }
  function ur(t, e) {
    const n = {
      ts: t.ts,
      zone: t.zone,
      c: t.c,
      o: t.o,
      loc: t.loc,
      invalid: t.invalid,
    };
    return new V(Object.assign({}, n, e, { old: n }));
  }
  function uf(t, e, n) {
    let r = t - e * 60 * 1e3;
    const s = n.offset(r);
    if (e === s) return [r, e];
    r -= (s - e) * 60 * 1e3;
    const i = n.offset(r);
    return s === i ? [r, s] : [t - Math.min(s, i) * 60 * 1e3, Math.max(s, i)];
  }
  function Vl(t, e) {
    t += e * 60 * 1e3;
    const n = new Date(t);
    return {
      year: n.getUTCFullYear(),
      month: n.getUTCMonth() + 1,
      day: n.getUTCDate(),
      hour: n.getUTCHours(),
      minute: n.getUTCMinutes(),
      second: n.getUTCSeconds(),
      millisecond: n.getUTCMilliseconds(),
    };
  }
  function ds(t, e, n) {
    return uf(ro(t), e, n);
  }
  function Ul(t, e) {
    const n = t.o,
      r = t.c.year + Math.trunc(e.years),
      s = t.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3,
      i = Object.assign({}, t.c, {
        year: r,
        month: s,
        day:
          Math.min(t.c.day, As(r, s)) +
          Math.trunc(e.days) +
          Math.trunc(e.weeks) * 7,
      }),
      a = ce
        .fromObject({
          years: e.years - Math.trunc(e.years),
          quarters: e.quarters - Math.trunc(e.quarters),
          months: e.months - Math.trunc(e.months),
          weeks: e.weeks - Math.trunc(e.weeks),
          days: e.days - Math.trunc(e.days),
          hours: e.hours,
          minutes: e.minutes,
          seconds: e.seconds,
          milliseconds: e.milliseconds,
        })
        .as("milliseconds"),
      l = ro(i);
    let [c, u] = uf(l, n, t.zone);
    return a !== 0 && ((c += a), (u = t.zone.offset(c))), { ts: c, o: u };
  }
  function fr(t, e, n, r, s) {
    const { setZone: i, zone: a } = n;
    if (t && Object.keys(t).length !== 0) {
      const l = e || a,
        c = V.fromObject(Object.assign(t, n, { zone: l, setZone: void 0 }));
      return i ? c : c.setZone(a);
    } else
      return V.invalid(
        new it("unparsable", `the input "${s}" can't be parsed as ${r}`)
      );
  }
  function Pn(t, e, n = !0) {
    return t.isValid
      ? De.create(be.create("en-US"), {
          allowZ: n,
          forceSimple: !0,
        }).formatDateTimeFromString(t, e)
      : null;
  }
  function Zl(
    t,
    {
      suppressSeconds: e = !1,
      suppressMilliseconds: n = !1,
      includeOffset: r,
      includePrefix: s = !1,
      includeZone: i = !1,
      spaceZone: a = !1,
      format: l = "extended",
    }
  ) {
    let c = l === "basic" ? "HHmm" : "HH:mm";
    (!e || t.second !== 0 || t.millisecond !== 0) &&
      ((c += l === "basic" ? "ss" : ":ss"),
      (!n || t.millisecond !== 0) && (c += ".SSS")),
      (i || r) && a && (c += " "),
      i ? (c += "z") : r && (c += l === "basic" ? "ZZZ" : "ZZ");
    let u = Pn(t, c);
    return s && (u = "T" + u), u;
  }
  const ff = {
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    pb = {
      weekNumber: 1,
      weekday: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    yb = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
    df = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
    bb = [
      "weekYear",
      "weekNumber",
      "weekday",
      "hour",
      "minute",
      "second",
      "millisecond",
    ],
    vb = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
  function Gl(t) {
    const e = {
      year: "year",
      years: "year",
      month: "month",
      months: "month",
      day: "day",
      days: "day",
      hour: "hour",
      hours: "hour",
      minute: "minute",
      minutes: "minute",
      quarter: "quarter",
      quarters: "quarter",
      second: "second",
      seconds: "second",
      millisecond: "millisecond",
      milliseconds: "millisecond",
      weekday: "weekday",
      weekdays: "weekday",
      weeknumber: "weekNumber",
      weeksnumber: "weekNumber",
      weeknumbers: "weekNumber",
      weekyear: "weekYear",
      weekyears: "weekYear",
      ordinal: "ordinal",
    }[t.toLowerCase()];
    if (!e) throw new Au(t);
    return e;
  }
  function Wl(t, e) {
    for (const l of df) ee(t[l]) && (t[l] = ff[l]);
    const n = lf(t) || cf(t);
    if (n) return V.invalid(n);
    const r = Se.now(),
      s = e.offset(r),
      [i, a] = ds(t, s, e);
    return new V({ ts: i, zone: e, o: a });
  }
  function ql(t, e, n) {
    const r = ee(n.round) ? !0 : n.round,
      s = (a, l) => (
        (a = no(a, r || n.calendary ? 0 : 2, !0)),
        e.loc.clone(n).relFormatter(n).format(a, l)
      ),
      i = (a) =>
        n.calendary
          ? e.hasSame(t, a)
            ? 0
            : e.startOf(a).diff(t.startOf(a), a).get(a)
          : e.diff(t, a).get(a);
    if (n.unit) return s(i(n.unit), n.unit);
    for (const a of n.units) {
      const l = i(a);
      if (Math.abs(l) >= 1) return s(l, a);
    }
    return s(t > e ? -0 : 0, n.units[n.units.length - 1]);
  }
  class V {
    constructor(e) {
      const n = e.zone || Se.defaultZone;
      let r =
        e.invalid ||
        (Number.isNaN(e.ts) ? new it("invalid input") : null) ||
        (n.isValid ? null : ts(n));
      this.ts = ee(e.ts) ? Se.now() : e.ts;
      let s = null,
        i = null;
      if (!r)
        if (e.old && e.old.ts === this.ts && e.old.zone.equals(n))
          [s, i] = [e.old.c, e.old.o];
        else {
          const l = n.offset(this.ts);
          (s = Vl(this.ts, l)),
            (r = Number.isNaN(s.year) ? new it("invalid input") : null),
            (s = r ? null : s),
            (i = r ? null : l);
        }
      (this._zone = n),
        (this.loc = e.loc || be.create()),
        (this.invalid = r),
        (this.weekData = null),
        (this.c = s),
        (this.o = i),
        (this.isLuxonDateTime = !0);
    }
    static now() {
      return new V({});
    }
    static local(e, n, r, s, i, a, l) {
      return ee(e)
        ? V.now()
        : Wl(
            {
              year: e,
              month: n,
              day: r,
              hour: s,
              minute: i,
              second: a,
              millisecond: l,
            },
            Se.defaultZone
          );
    }
    static utc(e, n, r, s, i, a, l) {
      return ee(e)
        ? new V({ ts: Se.now(), zone: ke.utcInstance })
        : Wl(
            {
              year: e,
              month: n,
              day: r,
              hour: s,
              minute: i,
              second: a,
              millisecond: l,
            },
            ke.utcInstance
          );
    }
    static fromJSDate(e, n = {}) {
      const r = _y(e) ? e.valueOf() : NaN;
      if (Number.isNaN(r)) return V.invalid("invalid input");
      const s = on(n.zone, Se.defaultZone);
      return s.isValid
        ? new V({ ts: r, zone: s, loc: be.fromObject(n) })
        : V.invalid(ts(s));
    }
    static fromMillis(e, n = {}) {
      if (vn(e))
        return e < -864e13 || e > gb
          ? V.invalid("Timestamp out of range")
          : new V({
              ts: e,
              zone: on(n.zone, Se.defaultZone),
              loc: be.fromObject(n),
            });
      throw new Ke(
        `fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`
      );
    }
    static fromSeconds(e, n = {}) {
      if (vn(e))
        return new V({
          ts: e * 1e3,
          zone: on(n.zone, Se.defaultZone),
          loc: be.fromObject(n),
        });
      throw new Ke("fromSeconds requires a numerical input");
    }
    static fromObject(e) {
      const n = on(e.zone, Se.defaultZone);
      if (!n.isValid) return V.invalid(ts(n));
      const r = Se.now(),
        s = n.offset(r),
        i = Ls(e, Gl, ["zone", "locale", "outputCalendar", "numberingSystem"]),
        a = !ee(i.ordinal),
        l = !ee(i.year),
        c = !ee(i.month) || !ee(i.day),
        u = l || c,
        f = i.weekYear || i.weekNumber,
        m = be.fromObject(e);
      if ((u || a) && f)
        throw new mr(
          "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
        );
      if (c && a) throw new mr("Can't mix ordinal dates with month/day");
      const g = f || (i.weekday && !u);
      let y,
        E,
        v = Vl(r, s);
      g
        ? ((y = bb), (E = pb), (v = na(v)))
        : a
        ? ((y = vb), (E = yb), (v = xi(v)))
        : ((y = df), (E = ff));
      let N = !1;
      for (const ue of y) {
        const Ee = i[ue];
        ee(Ee) ? (N ? (i[ue] = E[ue]) : (i[ue] = v[ue])) : (N = !0);
      }
      const S = g ? hb(i) : a ? mb(i) : lf(i),
        k = S || cf(i);
      if (k) return V.invalid(k);
      const F = g ? zl(i) : a ? Hl(i) : i,
        [Z, Y] = ds(F, s, n),
        q = new V({ ts: Z, zone: n, o: Y, loc: m });
      return i.weekday && u && e.weekday !== q.weekday
        ? V.invalid(
            "mismatched weekday",
            `you can't specify both a weekday of ${
              i.weekday
            } and a date of ${q.toISO()}`
          )
        : q;
    }
    static fromISO(e, n = {}) {
      const [r, s] = M0(e);
      return fr(r, s, n, "ISO 8601", e);
    }
    static fromRFC2822(e, n = {}) {
      const [r, s] = L0(e);
      return fr(r, s, n, "RFC 2822", e);
    }
    static fromHTTP(e, n = {}) {
      const [r, s] = N0(e);
      return fr(r, s, n, "HTTP", n);
    }
    static fromFormat(e, n, r = {}) {
      if (ee(e) || ee(n))
        throw new Ke("fromFormat requires an input string and a format");
      const { locale: s = null, numberingSystem: i = null } = r,
        a = be.fromOpts({ locale: s, numberingSystem: i, defaultToEN: !0 }),
        [l, c, u] = db(a, e, n);
      return u ? V.invalid(u) : fr(l, c, r, `format ${n}`, e);
    }
    static fromString(e, n, r = {}) {
      return V.fromFormat(e, n, r);
    }
    static fromSQL(e, n = {}) {
      const [r, s] = H0(e);
      return fr(r, s, n, "SQL", e);
    }
    static invalid(e, n = null) {
      if (!e) throw new Ke("need to specify a reason the DateTime is invalid");
      const r = e instanceof it ? e : new it(e, n);
      if (Se.throwOnInvalid) throw new xy(r);
      return new V({ invalid: r });
    }
    static isDateTime(e) {
      return (e && e.isLuxonDateTime) || !1;
    }
    get(e) {
      return this[e];
    }
    get isValid() {
      return this.invalid === null;
    }
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }
    get locale() {
      return this.isValid ? this.loc.locale : null;
    }
    get numberingSystem() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
    get outputCalendar() {
      return this.isValid ? this.loc.outputCalendar : null;
    }
    get zone() {
      return this._zone;
    }
    get zoneName() {
      return this.isValid ? this.zone.name : null;
    }
    get year() {
      return this.isValid ? this.c.year : NaN;
    }
    get quarter() {
      return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
    get month() {
      return this.isValid ? this.c.month : NaN;
    }
    get day() {
      return this.isValid ? this.c.day : NaN;
    }
    get hour() {
      return this.isValid ? this.c.hour : NaN;
    }
    get minute() {
      return this.isValid ? this.c.minute : NaN;
    }
    get second() {
      return this.isValid ? this.c.second : NaN;
    }
    get millisecond() {
      return this.isValid ? this.c.millisecond : NaN;
    }
    get weekYear() {
      return this.isValid ? Ci(this).weekYear : NaN;
    }
    get weekNumber() {
      return this.isValid ? Ci(this).weekNumber : NaN;
    }
    get weekday() {
      return this.isValid ? Ci(this).weekday : NaN;
    }
    get ordinal() {
      return this.isValid ? xi(this.c).ordinal : NaN;
    }
    get monthShort() {
      return this.isValid
        ? es.months("short", { locObj: this.loc })[this.month - 1]
        : null;
    }
    get monthLong() {
      return this.isValid
        ? es.months("long", { locObj: this.loc })[this.month - 1]
        : null;
    }
    get weekdayShort() {
      return this.isValid
        ? es.weekdays("short", { locObj: this.loc })[this.weekday - 1]
        : null;
    }
    get weekdayLong() {
      return this.isValid
        ? es.weekdays("long", { locObj: this.loc })[this.weekday - 1]
        : null;
    }
    get offset() {
      return this.isValid ? +this.o : NaN;
    }
    get offsetNameShort() {
      return this.isValid
        ? this.zone.offsetName(this.ts, {
            format: "short",
            locale: this.locale,
          })
        : null;
    }
    get offsetNameLong() {
      return this.isValid
        ? this.zone.offsetName(this.ts, { format: "long", locale: this.locale })
        : null;
    }
    get isOffsetFixed() {
      return this.isValid ? this.zone.universal : null;
    }
    get isInDST() {
      return this.isOffsetFixed
        ? !1
        : this.offset > this.set({ month: 1 }).offset ||
            this.offset > this.set({ month: 5 }).offset;
    }
    get isInLeapYear() {
      return jr(this.year);
    }
    get daysInMonth() {
      return As(this.year, this.month);
    }
    get daysInYear() {
      return this.isValid ? wr(this.year) : NaN;
    }
    get weeksInWeekYear() {
      return this.isValid ? Ms(this.weekYear) : NaN;
    }
    resolvedLocaleOpts(e = {}) {
      const {
        locale: n,
        numberingSystem: r,
        calendar: s,
      } = De.create(this.loc.clone(e), e).resolvedOptions(this);
      return { locale: n, numberingSystem: r, outputCalendar: s };
    }
    toUTC(e = 0, n = {}) {
      return this.setZone(ke.instance(e), n);
    }
    toLocal() {
      return this.setZone(Se.defaultZone);
    }
    setZone(e, { keepLocalTime: n = !1, keepCalendarTime: r = !1 } = {}) {
      if (((e = on(e, Se.defaultZone)), e.equals(this.zone))) return this;
      if (e.isValid) {
        let s = this.ts;
        if (n || r) {
          const i = e.offset(this.ts),
            a = this.toObject();
          [s] = ds(a, i, e);
        }
        return ur(this, { ts: s, zone: e });
      } else return V.invalid(ts(e));
    }
    reconfigure({ locale: e, numberingSystem: n, outputCalendar: r } = {}) {
      const s = this.loc.clone({
        locale: e,
        numberingSystem: n,
        outputCalendar: r,
      });
      return ur(this, { loc: s });
    }
    setLocale(e) {
      return this.reconfigure({ locale: e });
    }
    set(e) {
      if (!this.isValid) return this;
      const n = Ls(e, Gl, []),
        r = !ee(n.weekYear) || !ee(n.weekNumber) || !ee(n.weekday),
        s = !ee(n.ordinal),
        i = !ee(n.year),
        a = !ee(n.month) || !ee(n.day),
        l = i || a,
        c = n.weekYear || n.weekNumber;
      if ((l || s) && c)
        throw new mr(
          "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
        );
      if (a && s) throw new mr("Can't mix ordinal dates with month/day");
      let u;
      r
        ? (u = zl(Object.assign(na(this.c), n)))
        : ee(n.ordinal)
        ? ((u = Object.assign(this.toObject(), n)),
          ee(n.day) && (u.day = Math.min(As(u.year, u.month), u.day)))
        : (u = Hl(Object.assign(xi(this.c), n)));
      const [f, m] = ds(u, this.o, this.zone);
      return ur(this, { ts: f, o: m });
    }
    plus(e) {
      if (!this.isValid) return this;
      const n = hn(e);
      return ur(this, Ul(this, n));
    }
    minus(e) {
      if (!this.isValid) return this;
      const n = hn(e).negate();
      return ur(this, Ul(this, n));
    }
    startOf(e) {
      if (!this.isValid) return this;
      const n = {},
        r = ce.normalizeUnit(e);
      switch (r) {
        case "years":
          n.month = 1;
        case "quarters":
        case "months":
          n.day = 1;
        case "weeks":
        case "days":
          n.hour = 0;
        case "hours":
          n.minute = 0;
        case "minutes":
          n.second = 0;
        case "seconds":
          n.millisecond = 0;
          break;
      }
      if ((r === "weeks" && (n.weekday = 1), r === "quarters")) {
        const s = Math.ceil(this.month / 3);
        n.month = (s - 1) * 3 + 1;
      }
      return this.set(n);
    }
    endOf(e) {
      return this.isValid
        ? this.plus({ [e]: 1 })
            .startOf(e)
            .minus(1)
        : this;
    }
    toFormat(e, n = {}) {
      return this.isValid
        ? De.create(this.loc.redefaultToEN(n)).formatDateTimeFromString(this, e)
        : Ii;
    }
    toLocaleString(e = Os) {
      return this.isValid
        ? De.create(this.loc.clone(e), e).formatDateTime(this)
        : Ii;
    }
    toLocaleParts(e = {}) {
      return this.isValid
        ? De.create(this.loc.clone(e), e).formatDateTimeParts(this)
        : [];
    }
    toISO(e = {}) {
      return this.isValid ? `${this.toISODate(e)}T${this.toISOTime(e)}` : null;
    }
    toISODate({ format: e = "extended" } = {}) {
      let n = e === "basic" ? "yyyyMMdd" : "yyyy-MM-dd";
      return this.year > 9999 && (n = "+" + n), Pn(this, n);
    }
    toISOWeekDate() {
      return Pn(this, "kkkk-'W'WW-c");
    }
    toISOTime({
      suppressMilliseconds: e = !1,
      suppressSeconds: n = !1,
      includeOffset: r = !0,
      includePrefix: s = !1,
      format: i = "extended",
    } = {}) {
      return Zl(this, {
        suppressSeconds: n,
        suppressMilliseconds: e,
        includeOffset: r,
        includePrefix: s,
        format: i,
      });
    }
    toRFC2822() {
      return Pn(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
    }
    toHTTP() {
      return Pn(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    }
    toSQLDate() {
      return Pn(this, "yyyy-MM-dd");
    }
    toSQLTime({ includeOffset: e = !0, includeZone: n = !1 } = {}) {
      return Zl(this, { includeOffset: e, includeZone: n, spaceZone: !0 });
    }
    toSQL(e = {}) {
      return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
    }
    toString() {
      return this.isValid ? this.toISO() : Ii;
    }
    valueOf() {
      return this.toMillis();
    }
    toMillis() {
      return this.isValid ? this.ts : NaN;
    }
    toSeconds() {
      return this.isValid ? this.ts / 1e3 : NaN;
    }
    toJSON() {
      return this.toISO();
    }
    toBSON() {
      return this.toJSDate();
    }
    toObject(e = {}) {
      if (!this.isValid) return {};
      const n = Object.assign({}, this.c);
      return (
        e.includeConfig &&
          ((n.outputCalendar = this.outputCalendar),
          (n.numberingSystem = this.loc.numberingSystem),
          (n.locale = this.loc.locale)),
        n
      );
    }
    toJSDate() {
      return new Date(this.isValid ? this.ts : NaN);
    }
    diff(e, n = "milliseconds", r = {}) {
      if (!this.isValid || !e.isValid)
        return ce.invalid(
          this.invalid || e.invalid,
          "created by diffing an invalid DateTime"
        );
      const s = Object.assign(
          { locale: this.locale, numberingSystem: this.numberingSystem },
          r
        ),
        i = ky(n).map(ce.normalizeUnit),
        a = e.valueOf() > this.valueOf(),
        l = a ? this : e,
        c = a ? e : this,
        u = Y0(l, c, i, s);
      return a ? u.negate() : u;
    }
    diffNow(e = "milliseconds", n = {}) {
      return this.diff(V.now(), e, n);
    }
    until(e) {
      return this.isValid ? me.fromDateTimes(this, e) : this;
    }
    hasSame(e, n) {
      if (!this.isValid) return !1;
      const r = e.valueOf(),
        s = this.setZone(e.zone, { keepLocalTime: !0 });
      return s.startOf(n) <= r && r <= s.endOf(n);
    }
    equals(e) {
      return (
        this.isValid &&
        e.isValid &&
        this.valueOf() === e.valueOf() &&
        this.zone.equals(e.zone) &&
        this.loc.equals(e.loc)
      );
    }
    toRelative(e = {}) {
      if (!this.isValid) return null;
      const n = e.base || V.fromObject({ zone: this.zone }),
        r = e.padding ? (this < n ? -e.padding : e.padding) : 0;
      let s = ["years", "months", "days", "hours", "minutes", "seconds"],
        i = e.unit;
      return (
        Array.isArray(e.unit) && ((s = e.unit), (i = void 0)),
        ql(
          n,
          this.plus(r),
          Object.assign(e, { numeric: "always", units: s, unit: i })
        )
      );
    }
    toRelativeCalendar(e = {}) {
      return this.isValid
        ? ql(
            e.base || V.fromObject({ zone: this.zone }),
            this,
            Object.assign(e, {
              numeric: "auto",
              units: ["years", "months", "days"],
              calendary: !0,
            })
          )
        : null;
    }
    static min(...e) {
      if (!e.every(V.isDateTime))
        throw new Ke("min requires all arguments be DateTimes");
      return El(e, (n) => n.valueOf(), Math.min);
    }
    static max(...e) {
      if (!e.every(V.isDateTime))
        throw new Ke("max requires all arguments be DateTimes");
      return El(e, (n) => n.valueOf(), Math.max);
    }
    static fromFormatExplain(e, n, r = {}) {
      const { locale: s = null, numberingSystem: i = null } = r,
        a = be.fromOpts({ locale: s, numberingSystem: i, defaultToEN: !0 });
      return tf(a, e, n);
    }
    static fromStringExplain(e, n, r = {}) {
      return V.fromFormatExplain(e, n, r);
    }
    static get DATE_SHORT() {
      return Os;
    }
    static get DATE_MED() {
      return Fa;
    }
    static get DATE_MED_WITH_WEEKDAY() {
      return Mu;
    }
    static get DATE_FULL() {
      return Ra;
    }
    static get DATE_HUGE() {
      return ja;
    }
    static get TIME_SIMPLE() {
      return Ba;
    }
    static get TIME_WITH_SECONDS() {
      return za;
    }
    static get TIME_WITH_SHORT_OFFSET() {
      return Ha;
    }
    static get TIME_WITH_LONG_OFFSET() {
      return Va;
    }
    static get TIME_24_SIMPLE() {
      return Ua;
    }
    static get TIME_24_WITH_SECONDS() {
      return Za;
    }
    static get TIME_24_WITH_SHORT_OFFSET() {
      return Ga;
    }
    static get TIME_24_WITH_LONG_OFFSET() {
      return Wa;
    }
    static get DATETIME_SHORT() {
      return qa;
    }
    static get DATETIME_SHORT_WITH_SECONDS() {
      return $a;
    }
    static get DATETIME_MED() {
      return Ka;
    }
    static get DATETIME_MED_WITH_SECONDS() {
      return Ya;
    }
    static get DATETIME_MED_WITH_WEEKDAY() {
      return Lu;
    }
    static get DATETIME_FULL() {
      return Qa;
    }
    static get DATETIME_FULL_WITH_SECONDS() {
      return Ja;
    }
    static get DATETIME_HUGE() {
      return Xa;
    }
    static get DATETIME_HUGE_WITH_SECONDS() {
      return eo;
    }
  }
  function dr(t) {
    if (V.isDateTime(t)) return t;
    if (t && t.valueOf && vn(t.valueOf())) return V.fromJSDate(t);
    if (t && typeof t == "object") return V.fromObject(t);
    throw new Ke(`Unknown datetime argument: ${t}, of type ${typeof t}`);
  }
  class wb {
    constructor() {
      (this.currentLanguage = null),
        (this.languageValues = {
          Question: {
            [o.English]: "Question",
            [o.Spanish]: "Pregunta",
            [o.Russian]: "вопрос",
            [o.Italian]: "Domanda",
            [o.French]: "Question",
            [o.German]: "Frage",
            [o.Dutch]: "Vraag",
            [o.Portuguese]: "Questão",
            [o.Polish]: "Pytanie",
            [o.Japanese]: "質問",
            [o.ChineseSimplified]: "问题",
            [o.Korean]: "지침",
            [o.Finnish]: "Kysymys",
            [o.Malay]: "Soalan",
            [o.Swedish]: "Fråga",
            [o.ChineseTraditional]: "問題",
            [o.Danish]: "Spørgsmål",
            [o.Filipino]: "Tanong",
            [o.Arabic]: "السؤال",
            [o.Thai]: "คำถามท",
            [o.Turkish]: "Soru",
            [o.Vietnamese]: "Câu hỏi",
            [o.Hindi]: "प्रश्न",
            [o.Romanian]: "Întrebare",
            [o.Norwegian]: "Spørsmål",
            [o.Czech]: "Otázka",
            [o.Hungarian]: "Kérdés",
            [o.Indonesian]: "Pertanyaan",
            [o.Greek]: "Ερώτηση",
            [o.Slovak]: "Otázka",
            [o.Luxembourgish]: "Fro",
            [o.Estonian]: "Küsimus",
            [o.Latvian]: "Jautājums",
            [o.Lithuanian]: "Klausimas",
            [o.Flemish]: "Vraag",
            [o.Croatian]: "Pitanje",
            [o.Urdu]: "سوال",
            [o.Kazakh]: "Сұрақ",
            [o.Marathi]: "प्रश्न",
            [o.Telugu]: "ప్రశ్న",
            [o.Tamil]: "கேள்வி",
            [o.Malayalam]: "ചോദ്യം",
            [o.Kannada]: "ಪ್ರಶ್ನೆ",
            [o.Oriya]: "ପ୍ରଶ୍ନା",
            [o.Gujarati]: "પ્રશ્ન",
            [o.Assamese]: "প্ৰশ্ন",
            [o.Bengali]: "প্রশ্ন",
            [o.Bulgarian]: "Въпрос",
          },
          Next: {
            [o.English]: "Next",
            [o.Spanish]: "Próximo",
            [o.Russian]: "следующий",
            [o.Italian]: "Seguente",
            [o.French]: "Suivant",
            [o.German]: "Nächster",
            [o.Dutch]: "Volgende",
            [o.Portuguese]: "Próximo",
            [o.Polish]: "Kolejny",
            [o.Japanese]: "次へ",
            [o.ChineseSimplified]: "下一页",
            [o.Korean]: "다음",
            [o.Finnish]: "Seuraava",
            [o.Malay]: "Seterusnya",
            [o.Swedish]: "Nästa",
            [o.ChineseTraditional]: "下一個",
            [o.Danish]: "Næste",
            [o.Filipino]: "Susunod",
            [o.Arabic]: "التالي",
            [o.Thai]: "ถัดไป",
            [o.Turkish]: "İleri",
            [o.Vietnamese]: "Tiếp theo",
            [o.Hindi]: "अगला",
            [o.Romanian]: "Următorul",
            [o.Norwegian]: "Neste",
            [o.Czech]: "další",
            [o.Hungarian]: "Következő",
            [o.Indonesian]: "Berikutnya",
            [o.Greek]: "Επόμενο",
            [o.Slovak]: "Ďalšie",
            [o.Luxembourgish]: "Nächst",
            [o.Estonian]: "Järgmine",
            [o.Latvian]: "Nākamais",
            [o.Lithuanian]: "Kitas",
            [o.Flemish]: "Volgende",
            [o.Croatian]: "Sljedeći",
            [o.Urdu]: "اگلا",
            [o.Kazakh]: "Келесі",
            [o.Marathi]: "पुढे",
            [o.Telugu]: "తరువాత",
            [o.Tamil]: "அடுத்த",
            [o.Malayalam]: "അടുത്ത",
            [o.Kannada]: "ಮುಂದಿನ",
            [o.Oriya]: "ପରବର୍ତ୍ତୀ",
            [o.Gujarati]: "આગલો",
            [o.Assamese]: "পৰব",
            [o.Bengali]: "পরবর্তী",
            [o.Bulgarian]: "Следващ",
          },
          of: {
            [o.English]: "of",
            [o.Spanish]: "de",
            [o.Russian]: "из",
            [o.Italian]: "di",
            [o.French]: "du",
            [o.German]: "von",
            [o.Dutch]: "van",
            [o.Portuguese]: "do",
            [o.Polish]: "z",
            [o.Japanese]: "の",
            [o.ChineseSimplified]: "的",
            [o.Korean]: "의",
            [o.Finnish]: "/",
            [o.Malay]: "daripada",
            [o.Swedish]: "av",
            [o.ChineseTraditional]: "之",
            [o.Danish]: "af",
            [o.Filipino]: "ng",
            [o.Arabic]: "من",
            [o.Thai]: "จาก",
            [o.Turkish]: "/",
            [o.Vietnamese]: "/",
            [o.Hindi]: "का",
            [o.Romanian]: "de",
            [o.Norwegian]: "av",
            [o.Czech]: "z",
            [o.Hungarian]: "nak,-nek",
            [o.Indonesian]: "dari",
            [o.Greek]: "του",
            [o.Slovak]: "z",
            [o.Luxembourgish]: "vun",
            [o.Estonian]: "kohta",
            [o.Latvian]: "no",
            [o.Lithuanian]: "iš",
            [o.Flemish]: "van",
            [o.Croatian]: "od",
            [o.Urdu]: "کی",
            [o.Kazakh]: "ның",
            [o.Marathi]: "चा",
            [o.Telugu]: "యొక్క",
            [o.Tamil]: "இன்",
            [o.Malayalam]: "ന്റെ",
            [o.Kannada]: "ನ",
            [o.Oriya]: "ର",
            [o.Gujarati]: "ના",
            [o.Assamese]: "ৰ",
            [o.Bengali]: "এর",
            [o.Bulgarian]: "на",
          },
          Instructions: {
            [o.English]: "Instructions",
            [o.Spanish]: "Instrucciones",
            [o.Russian]: "инструкции",
            [o.Italian]: "Istruzioni",
            [o.French]: "Instructions",
            [o.German]: "Anleitung",
            [o.Dutch]: "Instructies",
            [o.Portuguese]: "Instruções",
            [o.Polish]: "Instrukcje",
            [o.Japanese]: "説明",
            [o.ChineseSimplified]: "问题",
            [o.Korean]: "지침",
            [o.Finnish]: "Ohjeet",
            [o.Malay]: "Arahan",
            [o.Swedish]: "Instruktioner",
            [o.ChineseTraditional]: "指示",
            [o.Danish]: "Instruktioner",
            [o.Filipino]: "Mga Instruksyon",
            [o.Arabic]: "تعليمات",
            [o.Thai]: "คำแนะน",
            [o.Turkish]: "Talimatlar",
            [o.Vietnamese]: "Hướng dẫn",
            [o.Hindi]: "निर्देश",
            [o.Romanian]: "Instrucțiuni",
            [o.Norwegian]: "Bruksanvisning",
            [o.Czech]: "Instrukce",
            [o.Hungarian]: "Utasítás",
            [o.Indonesian]: "Instruksi",
            [o.Greek]: "Οδηγίες",
            [o.Slovak]: "Inštrukcie",
            [o.Luxembourgish]: "Instruktiounen",
            [o.Estonian]: "Juhised",
            [o.Latvian]: "Instrukcijas",
            [o.Lithuanian]: "Instrukcijos",
            [o.Flemish]: "Instructies",
            [o.Croatian]: "Upute",
            [o.Urdu]: "ہدایات",
            [o.Kazakh]: "Нұсқаулық",
            [o.Marathi]: "मार्गदर्शन",
            [o.Telugu]: "సూచనలు",
            [o.Tamil]: "வழிகாட்டு",
            [o.Malayalam]: "സൂചനകൾ",
            [o.Kannada]: "ಮಾರ್ಗಸೂಚಿಗಳು",
            [o.Oriya]: "ନିର୍ଦେଶ",
            [o.Gujarati]: "માર્ગદર્શન",
            [o.Assamese]: "নিৰ্দেশনা",
            [o.Bengali]: "নির্দেশনা",
            [o.Bulgarian]: "Инструкции",
          },
          "Please select answer to continue": {
            [o.English]: "Please select answer to continue",
            [o.Spanish]: "Seleccione la respuesta para continuar",
            [o.Russian]: "Пожалуйста, выберите ответ, чтобы продолжить",
            [o.Italian]: "Seleziona la risposta per continuare",
            [o.French]: "Veuillez sélectionner la réponse pour continuer",
            [o.German]: "Bitte wählen Sie Antwort, um fortzufahren",
            [o.Dutch]: "Selecteer een antwoord om door te gaan",
            [o.Portuguese]: "Selecione a resposta para continuar",
            [o.Polish]: "Wybierz odpowiedź, aby kontynuować",
            [o.Japanese]: "続行するには回答を選択してください",
            [o.ChineseSimplified]: "请选择答案以继续",
            [o.Korean]: "계속하려면 답변을 선택하세요.",
            [o.Finnish]: "Jatka valitsemalla vastaus",
            [o.Malay]: "Sila pilih jawapan untuk meneruskan",
            [o.Swedish]: "Välj svar för att fortsätta",
            [o.ChineseTraditional]: "請選擇答案以繼續",
            [o.Danish]: "Vælg svar for at fortsætte",
            [o.Filipino]: "Mangyaring pumili ng sagot upang magpatuloy",
            [o.Arabic]: "الرجاء تحديد الإجابة للمتابعة",
            [o.Thai]: "โปรดเลือกคำตอบเพื่อดำเนินการต่อ",
            [o.Turkish]: "Devam etmek için lütfen cevabı seçin",
            [o.Vietnamese]: "Vui lòng chọn câu trả lời để tiếp tục",
            [o.Hindi]: "जारी रखने के लिए कृपया एक उत्तर चुनें",
            [o.Romanian]: "Vă rugăm să selectați răspunsul pentru a continua",
            [o.Norwegian]: "Velg svar for å fortsette",
            [o.Czech]: "Pokračujte výběrem odpovědi",
            [o.Hungarian]: "Kérjük, válassza ki a választ a folytatáshoz",
            [o.Indonesian]: "Pilih jawaban untuk melanjutkan",
            [o.Greek]: "Επιλέξτε απάντηση για να συνεχίσετε",
            [o.Slovak]: "Ak chcete pokračovať, vyberte odpoveď",
            [o.Luxembourgish]: "Wählen Äntwert fir weiderzefueren",
            [o.Estonian]: "Jätkamiseks valige vastus",
            [o.Latvian]: "Lai turpinātu, atlasiet atbildi",
            [o.Lithuanian]: "Norėdami tęsti, pasirinkite atsakymą",
            [o.Flemish]: "Selecteer een antwoord om door te gaan",
            [o.Croatian]: "Odaberite odgovor za nastavak",
            [o.Urdu]: "براہ کرم جاری رکھنے کے لیے جواب منتخب کریں",
            [o.Kazakh]: "Жалғастыру үшін жауапты таңдаңыз",
            [o.Marathi]: "सुचना साठवण्यासाठी उत्तर निवडा",
            [o.Telugu]: "కొంతకాలం చేయడానికి సమాధానం ఎంచుకోండి",
            [o.Tamil]: "தொடர்வதற்கு பதிலைத் தேர்வு செய்க",
            [o.Malayalam]: "തുടരുകയായി ഉത്തരം തിരഞ്ഞെടുക്കുക",
            [o.Kannada]: "ಮುಂದುವರಿಸಲು ಉತ್ತರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            [o.Oriya]: "ପ୍ରସ୍ତୁତି ଜାରି ରଖିବା ପାଇଁ ଉତ୍ତର ଚୟନ କରନ୍ତୁ",
            [o.Gujarati]: "આગળ વધવા માટે જવાબ પસંદ કરો",
            [o.Assamese]: "চালিয়া যাওয়ার জন্য উত্তর নির্বাচন কৰক",
            [o.Bengali]: "চালিয়ে যাওয়ার জন্য উত্তর নির্বাচন করুন",
            [o.Bulgarian]: "Моля, изберете отговор, за да продължите",
          },
          "Your answer(s)": {
            [o.English]: "Your answer(s)",
            [o.Spanish]: "Tus respuestas",
            [o.Russian]: "Ваши ответы",
            [o.Italian]: "Le tue risposte",
            [o.French]: "Ta Réponse",
            [o.German]: "Deine Antworten",
            [o.Dutch]: "Uw antwoord",
            [o.Portuguese]: "Sua resposta",
            [o.Polish]: "Twoja odpowiedź",
            [o.Japanese]: "あなたの答え",
            [o.ChineseSimplified]: "你的答案",
            [o.Korean]: "너의 답",
            [o.Finnish]: "Vastauksesi",
            [o.Malay]: "Jawapan anda",
            [o.Swedish]: "Dina svar",
            [o.ChineseTraditional]: "您的回答",
            [o.Danish]: "Dine svar",
            [o.Filipino]: "Ang iyong sagot",
            [o.Arabic]: "اجابتك",
            [o.Thai]: "คำตอบของคุณ",
            [o.Turkish]: "senin cevabın",
            [o.Vietnamese]: "câu trả lời của bạn",
            [o.Hindi]: "आपका उत्तर",
            [o.Romanian]: "Răspunsul dvs",
            [o.Norwegian]: "Ditt svar",
            [o.Czech]: "Tvoje odpověď",
            [o.Hungarian]: "A válaszod",
            [o.Indonesian]: "Jawaban Anda",
            [o.Greek]: "Η απάντησή σου",
            [o.Slovak]: "Tvoja odpoveď",
            [o.Luxembourgish]: "Äntwert",
            [o.Estonian]: "Teie vastus",
            [o.Latvian]: "Jūsu atbilde",
            [o.Lithuanian]: "Jūsų atsakymas",
            [o.Flemish]: "Uw antwoord",
            [o.Croatian]: "Vaš odgovor",
            [o.Urdu]: "آپ کے جوابات",
            [o.Kazakh]: "Сіздің жауаптарыңыз",
            [o.Marathi]: "तुमचे उत्तर",
            [o.Telugu]: "మీ సమాధానాలు",
            [o.Tamil]: "உங்கள் பதில்கள்",
            [o.Malayalam]: "നിങ്ങളുടെ ഉത്തരങ്ങൾ",
            [o.Kannada]: "ನಿಮ್ಮ ಉತ್ತರಗಳು",
            [o.Oriya]: "ତୁମର ଉତ୍ତର",
            [o.Gujarati]: "તમારા જવાબો",
            [o.Assamese]: "আপোনাৰ উত্তৰসমূহ",
            [o.Bengali]: "তোমার উত্তরগুলি",
            [o.Bulgarian]: "Вашият отговор(и)",
          },
          "To continue press": {
            [o.English]: "To continue press",
            [o.Spanish]: "Para continuar presione",
            [o.Russian]: "Для продолжения нажмите",
            [o.Italian]: "Per continuare premere",
            [o.French]: "Pour continuer, appuyez sur",
            [o.German]: "Um fortzufahren, drücken Sie",
            [o.Dutch]: "Druk op om verder te gaan",
            [o.Portuguese]: "Para continuar pressione",
            [o.Polish]: "Aby kontynuować, naciśnij",
            [o.Japanese]: "押し続けるには",
            [o.ChineseSimplified]: "要继续按",
            [o.Korean]: "계속하려면",
            [o.Finnish]: "Jatka painamalla",
            [o.Malay]: "Untuk meneruskan tekan",
            [o.Swedish]: "För att fortsätta trycka på",
            [o.ChineseTraditional]: "要繼續，請按",
            [o.Danish]: "Sådan fortsætter du med at trykke på",
            [o.Filipino]: "Para magpatuloy, pindutin ang",
            [o.Arabic]: "للمتابعة اضغط على 'إدخال",
            [o.Thai]: "หากต้องการดำเนินการต่อให้กด",
            [o.Turkish]: "Devam etmek için 'Enter' (Giriş) düğmesine basın",
            [o.Vietnamese]: "Để tiếp tục, vui lòng nhấn nút",
            [o.Hindi]: 'जारी रखने के लिए "एंटर" दबाएं',
            [o.Romanian]: "Pentru a continua apăsați",
            [o.Norwegian]: "Trykk på for å fortsette",
            [o.Czech]: "Pro pokračování stiskněte",
            [o.Hungarian]: "A folytatáshoz nyomja meg a gombot",
            [o.Indonesian]: "Untuk melanjutkan tekan",
            [o.Greek]: "Για να συνεχίσετε πατήστε",
            [o.Slovak]: "Ak chcete pokračovať, stlačte",
            [o.Luxembourgish]: "Fir weiderzefueren drécken",
            [o.Estonian]: "Jätkamiseks vajutage",
            [o.Latvian]: "Lai turpinātu, nospiediet",
            [o.Lithuanian]: "Norėdami tęsti, spustelėkite",
            [o.Flemish]: "Om door te gaan druk op",
            [o.Croatian]: "Za nastavak pritisnite",
            [o.Urdu]: "جاری رکھنے کے لیے دبائیں",
            [o.Kazakh]: "Жалғастыру үшін басыңыз",
            [o.Marathi]: "सुरू ठेवण्यासाठी दाबा",
            [o.Telugu]: "కొంతకాలం చేయడానికి నొక్కండి",
            [o.Tamil]: "தொடர அழுத்தவும்",
            [o.Malayalam]: "തുടരാനായി അമർത്തുക",
            [o.Kannada]: "ಮುಂದುವರಿಸಲು ಒತ್ತಿಹೋಗಿ",
            [o.Oriya]: "ଚାଲିବା ପାଇଁ ଦବାନ୍ତୁ",
            [o.Gujarati]: "ચાલુ રાખવા માટે દબાવો",
            [o.Assamese]: "চালোৱাৰ বাবে চাপ দিব",
            [o.Bengali]: "চালিয়ে যাওয়ার জন্য চাপ দিন",
            [o.Bulgarian]: "За да продължите, натиснете",
          },
          Redirecting: {
            [o.English]: "Redirecting",
            [o.Spanish]: "Redirigiendo",
            [o.Russian]: "Перенаправление",
            [o.Italian]: "Reindirizzamento",
            [o.French]: "Redirection",
            [o.German]: "Umleiten",
            [o.Dutch]: "Omleiden",
            [o.Portuguese]: "Redirecionando",
            [o.Polish]: "Przekierowanie",
            [o.Japanese]: "リダイレクト",
            [o.ChineseSimplified]: "重新导向",
            [o.Korean]: "리디렉션",
            [o.Finnish]: "Uudelleenohjaus",
            [o.Malay]: "Mengarahkan semula",
            [o.Swedish]: "Omdirigera",
            [o.ChineseTraditional]: "重定向",
            [o.Danish]: "Omdirigere",
            [o.Filipino]: "Nire-redirect",
            [o.Arabic]: "إعادة توجيه",
            [o.Thai]: "กำลังเปลี่ยนเส้นทาง",
            [o.Turkish]: "Yönlendirme",
            [o.Vietnamese]: "chuyển hướng",
            [o.Hindi]: "पुन: निर्देशित",
            [o.Romanian]: "Redirecționare",
            [o.Norwegian]: "Omdirigerer",
            [o.Czech]: "Přesměrování",
            [o.Hungarian]: "Átirányítás",
            [o.Indonesian]: "Mengarahkan ulang",
            [o.Greek]: "Ανακατεύθυνση",
            [o.Slovak]: "Presmerovanie",
            [o.Luxembourgish]: "Weiderleeten",
            [o.Estonian]: "Ümbersuunamine",
            [o.Latvian]: "Pāradresēšana",
            [o.Lithuanian]: "Nukreipimas",
            [o.Flemish]: "Doorverwijzen",
            [o.Croatian]: "Preusmjeravanje",
            [o.Urdu]: "ری ڈائریکٹنگ",
            [o.Kazakh]: "Қайта бағыттау",
            [o.Marathi]: "पुनर्प्रेषित करीत आहे",
            [o.Telugu]: "రీడైరెక్టింగ్",
            [o.Tamil]: "மீதுள்ளது",
            [o.Malayalam]: "വീണ്ടും തിരികെടുക്കുന്നു",
            [o.Kannada]: "ಮರುನಿರ್ದೇಶಿಸುತ್ತಿದೆ",
            [o.Oriya]: "ପୁନଃନିର୍ଦେଶନ",
            [o.Gujarati]: "પુનઃનિર્દેશન",
            [o.Assamese]: "পুনৰ্নিৰ্দেশন",
            [o.Bengali]: "পুনঃনির্দেশন",
            [o.Bulgarian]: "Пренасочване",
          },
          "Select your preferred language": {
            [o.English]: "Select your preferred language",
            [o.Spanish]: "Seleccione su idioma preferido",
            [o.Russian]: "Выберите желаемый язык",
            [o.Italian]: "Seleziona la tua lingua preferita",
            [o.French]: "Sélectionnez votre langue préférée",
            [o.German]: "Wählen Sie Ihre bevorzugte Sprache",
            [o.Dutch]: "Kies uw voorkeurstaal",
            [o.Portuguese]: "Selecione seu idioma preferido",
            [o.Polish]: "Wybierz preferowany język",
            [o.Japanese]: "ご希望の言語を選択してください",
            [o.ChineseSimplified]: "选择您喜欢的语言",
            [o.Korean]: "선호하는 언어 선택",
            [o.Finnish]: "Valitse haluamasi kieli",
            [o.Malay]: "Pilih bahasa pilihan anda",
            [o.Swedish]: "Välj önskat språk",
            [o.ChineseTraditional]: "選擇您的首選語言",
            [o.Danish]: "Vælg dit foretrukne sprog",
            [o.Filipino]: "Piliin ang iyong gustong wika",
            [o.Arabic]: "اختر لغتك المفضلة",
            [o.Thai]: "เลือกภาษาที่คุณต้องการ",
            [o.Turkish]: "tercih ettiğiniz dili seçin",
            [o.Vietnamese]: "Chọn ngôn ngữ ưa thích của bạn",
            [o.Hindi]: "अपनी पसंदीदा भाषा का चयन करें",
            [o.Romanian]: "Selectați limba preferată",
            [o.Norwegian]: "Velg ønsket språk",
            [o.Czech]: "Vyberte preferovaný jazyk",
            [o.Hungarian]: "Válassza ki a kívánt nyelvet",
            [o.Indonesian]: "Pilih bahasa pilihan Anda",
            [o.Greek]: "Επιλέξτε τη γλώσσα που προτιμάτε",
            [o.Slovak]: "Vyberte preferovaný jazyk",
            [o.Luxembourgish]: "Wählen Är gewënschte Sprooch",
            [o.Estonian]: "Valige eelistatud keel",
            [o.Latvian]: "Izvēlieties vēlamo valodu",
            [o.Lithuanian]: "Pasirinkite norimą kalbą",
            [o.Flemish]: "Kies uw voorkeurstaal",
            [o.Croatian]: "Odaberite željeni jezik",
            [o.Urdu]: "اپنی پسندیدہ زبان منتخب کریں",
            [o.Kazakh]: "Таңдаңыз қалаған тіліңізді.",
            [o.Marathi]: "आपली पसंतीची भाषा निवडा",
            [o.Telugu]: "మీ ఇష్టమైన భాషను ఎంచుకోండి",
            [o.Tamil]: "உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்",
            [o.Malayalam]: "നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക",
            [o.Kannada]: "ನಿಮ್ಮ ಆಸಕ್ತಿಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            [o.Oriya]: "ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ",
            [o.Gujarati]: "તમારી પસંદગીની ભાષા પસંદ કરો",
            [o.Assamese]: "আপোনাৰ পছন্দৰ ভাষা চয়ন কৰক",
            [o.Bengali]: "আপনার পছন্দের ভাষা নির্বাচন করুন",
            [o.Bulgarian]: "Изберете предпочитания от вас език",
          },
          Start: {
            [o.English]: "Start",
            [o.Spanish]: "Comienzo",
            [o.Russian]: "Начало",
            [o.Italian]: "Inizio",
            [o.French]: "Début",
            [o.German]: "Start",
            [o.Dutch]: "Begin",
            [o.Portuguese]: "Começar",
            [o.Polish]: "Początek",
            [o.Japanese]: "開始",
            [o.ChineseSimplified]: "开始",
            [o.Korean]: "스타트",
            [o.Finnish]: "Alkaa",
            [o.Malay]: "Mula",
            [o.Swedish]: "Starta",
            [o.ChineseTraditional]: "開始",
            [o.Danish]: "Begynde",
            [o.Filipino]: "Magsimula",
            [o.Arabic]: "بداية",
            [o.Thai]: "เริ่ม",
            [o.Turkish]: "Başlama",
            [o.Vietnamese]: "Bắt đầu",
            [o.Hindi]: "शुरू",
            [o.Romanian]: "start",
            [o.Norwegian]: "Start",
            [o.Czech]: "Start",
            [o.Hungarian]: "Rajt",
            [o.Indonesian]: "Awal",
            [o.Greek]: "Αρχή",
            [o.Slovak]: "Štart",
            [o.Luxembourgish]: "Ufank",
            [o.Estonian]: "Alusta",
            [o.Latvian]: "Sākt",
            [o.Lithuanian]: "Pradėti",
            [o.Flemish]: "Begin",
            [o.Croatian]: "Početak",
            [o.Urdu]: "شروع",
            [o.Kazakh]: "Бастау",
            [o.Marathi]: "प्रारंभ",
            [o.Telugu]: "ప్రారంభించు",
            [o.Tamil]: "ஆரம்பம்",
            [o.Malayalam]: "ആരംഭിക്കുക",
            [o.Kannada]: "ಪ್ರಾರಂಭ",
            [o.Oriya]: "ଶୁରୁ",
            [o.Gujarati]: "શરૂ",
            [o.Assamese]: "আৰম্ভ",
            [o.Bengali]: "শুরু",
            [o.Bulgarian]: "Старт",
          },
          "Complete pre-study questions in": {
            [o.English]: "Complete pre-study questions in",
            [o.Spanish]: "Complete las preguntas previas al estudio en",
            [o.Russian]: "Заполните предварительные вопросы в",
            [o.Italian]: "le domande di pre-studio completo",
            [o.French]: "Répondre aux questions pré-étude en",
            [o.German]: "Komplette Vorstudie Fragen in",
            [o.Dutch]: "Compleet pre-studie vragen",
            [o.Portuguese]: "perguntas completas pré-estudo em",
            [o.Polish]: "Kompletny pytania wstępnego badania w",
            [o.Japanese]: "事前調査質問を次の時間内に完了させてください",
            [o.ChineseSimplified]: "请在下列时间内完成预调查问题",
            [o.Korean]: "연구 사전 질문을 완료하십시오.",
            [o.Finnish]: "Täytä esiopetuskysymykset",
            [o.Malay]: "Lengkapkan soalan pra-belajar di",
            [o.Swedish]: "Kompletta förstudiefrågor i",
            [o.ChineseTraditional]: "完成預科課程",
            [o.Danish]: "Komplette forundersøgelsesspørgsmål i",
            [o.Filipino]:
              "Sagutan ang mga tanong bago ang pag-aaral sa loob ng",
            [o.Arabic]: "أكمل أسئلة ما قبل الدراسة في غضون",
            [o.Thai]: "ตอบคำถามก่อนศึกษาภายใน",
            [o.Turkish]: "Çalışma Öncesi Soruları Tamamlayın",
            [o.Vietnamese]: "Hoàn thành các Câu hỏi Tiền nghiên cứu trong",
            [o.Hindi]: "पूर्व-अध्ययन प्रश्नों को में पूरा करें",
            [o.Romanian]: "Completați întrebările înainte de studiu în",
            [o.Norwegian]: "Fullfør forstudiespørsmål i",
            [o.Czech]: "Vyplňte předstudijní otázky v",
            [o.Hungarian]: "Töltse ki a tanulás előtti kérdéseket",
            [o.Indonesian]: "Lengkapi pertanyaan pra-studi di",
            [o.Greek]: `Συμπληρώστε τις προκαταρκτικές ερωτήσεις στο
`,
            [o.Slovak]: "Vyplňte otázky pred štúdiom v",
            [o.Luxembourgish]: "Komplett Pre-Studie Froen an",
            [o.Estonian]: "Täitke eel-uuringu küsimused",
            [o.Latvian]: "Aizpildiet pētījuma jautājumus",
            [o.Lithuanian]: "Užpildykite priešmokslinius klausimus",
            [o.Flemish]: "Vul de pre-studievragen in",
            [o.Croatian]: "Ispunite pre-studijska pitanja u",
            [o.Urdu]: "مکمل پیش-مطالعہ سوالات میں",
            [o.Kazakh]: "Алдыңғы зерттеу сұрақтарын толтырыңыз",
            [o.Marathi]: "पूर्व-अभ्यास प्रश्न पूर्ण करा",
            [o.Telugu]: "పూర్వాధ్యయన ప్రశ్నలను పూర్తి చేయండి",
            [o.Tamil]: "முந்தைய ஆய்வு கேள்விகளை முடிக்கவும்",
            [o.Malayalam]: "പ്രീ-സ്റ്റിഡി ചോദ്യങ്ങൾ പൂർത്തിയാക്കുക",
            [o.Kannada]: "ಪೂರ್ವಾಧ್ಯಯನ ಪ್ರಶ್ನೆಗಳನ್ನು ಪೂರ್ತಿಗೊಳಿಸಿ",
            [o.Oriya]: "ପୂର୍ବାଧ୍ୟଯନ ପ୍ରଶ୍ନଙ୍କୁ ପୂର୍ଣ୍ଣ କରନ୍ତୁ",
            [o.Gujarati]: "પૂર્વાધ્યયન પ્રશ્નોને પૂર્ણ કરો",
            [o.Assamese]: "পূৰ্ব অধ্যয়ন প্ৰশ্নসমূহ পূৰ্ণ কৰক",
            [o.Bengali]: "পূর্ব-অধ্যয়ন প্রশ্নগুলি পূরণ করুন",
            [o.Bulgarian]: "Попълнете въпросите преди обучението в",
          },
          "Select all that apply": {
            [o.English]: "Select all that apply",
            [o.Spanish]: "Seleccione todas las que correspondan",
            [o.Russian]: "Выбрать все, что подходит",
            [o.Italian]: "Seleziona tutte le risposte pertinenti",
            [o.French]: "Sélectionnez tout ce qui s'y rapporte",
            [o.German]: "Wählen Sie alle zutreffenden",
            [o.Dutch]: "Selecteer alles wat van toepassing is",
            [o.Portuguese]: "Selecione tudo que se aplica",
            [o.Polish]: "Wybierz wszystkie pasujące odpowiedzi",
            [o.Japanese]: "該当するものをすべて選択",
            [o.ChineseSimplified]: "选择所有符合条件的",
            [o.Korean]: "해당되는 모든 것들을 고르세요",
            [o.Finnish]: "Valitse kaikki jotka sopivat",
            [o.Malay]: "Pilih semua yang berkenaan",
            [o.Swedish]: "Välj alla som gäller",
            [o.ChineseTraditional]: "選擇所有適用項",
            [o.Danish]: "Vælg alt, hvad der gælder",
            [o.Filipino]: "Piliin ang lahat ng naaangkop",
            [o.Arabic]: "اختر كل ما ينطبق",
            [o.Thai]: "เลือกทั้งหมดที่ใช้",
            [o.Turkish]: "geçerli olanların hepsini seçin",
            [o.Vietnamese]: "Chọn tất cả những gì áp dụng",
            [o.Hindi]: "लागू होने वाले सभी का चयन करें",
            [o.Romanian]: "Selectați toate care se aplică",
            [o.Norwegian]: "Velg alt som passer",
            [o.Czech]: "Vybrat vše, co platí",
            [o.Hungarian]: "Válassza ki az összes megfelelőt",
            [o.Indonesian]: "Pilih semua yang berlaku",
            [o.Greek]: "Επιλέξτε όλα όσα ισχύουν",
            [o.Slovak]: "Vyberte všetky platné možnosti",
            [o.Luxembourgish]: "Wiel all dat passt",
            [o.Estonian]: "Valige kõik, mis kehtib",
            [o.Latvian]: "Atlasiet visu, kas attiecas",
            [o.Lithuanian]: "Pasirinkite viską, kas taikoma",
            [o.Flemish]: "Selecteer alles wat van toepassing is",
            [o.Croatian]: "Odaberite sve što vrijedi",
            [o.Urdu]: "تمام کا انتخاب کریں",
            [o.Kazakh]: "Жеткілікті барлығын таңдаңыз",
            [o.Marathi]: "सर्व लागू असलेले निवडा",
            [o.Telugu]: "అన్ని అనుకూలం ఎంచుకోండి",
            [o.Tamil]: "பொருத்தமானதை தேர்ந்தெடுக்கவும்",
            [o.Malayalam]: "അനുയോജ്യമായത് തിരഞ്ഞെടുക്കുക",
            [o.Kannada]: "ಅನುಕೂಲವಾದದ್ದನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            [o.Oriya]: "ସମସ୍ତ ପ୍ରୟୋଜନ କରନ୍ତୁ",
            [o.Gujarati]: "બધુ પસંદ કરો",
            [o.Assamese]: "সমস্ত প্রযোজ্য কৰা নিৰ্বাচন কৰক",
            [o.Bengali]: "সমস্ত প্রযোজ্য নির্বাচন করুন",
            [o.Bulgarian]: "Изберете всички, които се отнасят",
          },
          "Please enter answer to continue": {
            [o.English]: "Please enter answer to continue",
            [o.Spanish]: "Ingrese la respuesta para continuar",
            [o.Russian]: "Пожалуйста, введите ответ, чтобы продолжить",
            [o.Italian]: "Inserisci la risposta per continuare",
            [o.French]: "Veuillez saisir une réponse pour continuer",
            [o.German]: "Bitte geben Sie die Antwort ein, um fortzufahren",
            [o.Dutch]: "Voer een antwoord in om door te gaan",
            [o.Portuguese]: "Por favor, digite a resposta para continuar",
            [o.Polish]: "Wpisz odpowiedź, aby kontynuować",
            [o.Japanese]: "続行するには回答を入力してください",
            [o.ChineseSimplified]: "请输入答案以继续",
            [o.Korean]: "계속하려면 답변을 입력하세요",
            [o.Finnish]: "Kirjoita vastaus jatkaaksesi",
            [o.Malay]: "Sila masukkan jawapan untuk meneruskan",
            [o.Swedish]: "Vänligen ange svar för att fortsätta",
            [o.ChineseTraditional]: "請輸入答案以繼續",
            [o.Danish]: "Indtast venligst svar for at fortsætte",
            [o.Filipino]: "Pakipasok ang sagot upang magpatuloy",
            [o.Arabic]: "الرجاء إدخال الإجابة للمتابعة",
            [o.Thai]: "โปรดป้อนคำตอบเพื่อดำเนินการต่อ",
            [o.Turkish]: "Devam etmek için lütfen cevabı girin",
            [o.Vietnamese]: "Vui lòng nhập câu trả lời để tiếp tục",
            [o.Hindi]: "कृपया जारी रखने के लिए उत्तर दर्ज करें",
            [o.Romanian]: "Vă rugăm să introduceți răspunsul pentru a continua",
            [o.Norwegian]: "Skriv inn svar for å fortsette",
            [o.Czech]: "Pro pokračování zadejte odpověď",
            [o.Hungarian]: "A folytatáshoz írja be a választ",
            [o.Indonesian]: "Silakan masukkan jawaban untuk melanjutkan",
            [o.Greek]: "Εισαγάγετε την απάντηση για να συνεχίσετε",
            [o.Slovak]: "Ak chcete pokračovať, zadajte odpoveď",
            [o.Luxembourgish]: "Gitt Äntwert fir weiderzefueren",
            [o.Estonian]: "Jätkamiseks sisestage vastus",
            [o.Latvian]: "Lai turpinātu, ievadiet atbildi",
            [o.Lithuanian]: "Norėdami tęsti, įveskite atsakymą",
            [o.Flemish]: "Gelieve een antwoord in te voeren om door te gaan",
            [o.Croatian]: "Unesite odgovor za nastavak",
            [o.Urdu]: "جاری رکھنے کے لیے جواب دیں",
            [o.Kazakh]: "Жалғастыру үшін жауап беріңіз",
            [o.Marathi]: "सुरू ठेवण्यासाठी उत्तर द्या",
            [o.Telugu]: "కొంతకాలం చేయడానికి సమాధానం నమోదు చేయండి",
            [o.Tamil]: "தொடர அழுத்தவும்",
            [o.Malayalam]: "തുടരാനായി ഉത്തരം നൽകുക",
            [o.Kannada]: "ಮುಂದುವರಿಸಲು ಉತ್ತರವನ್ನು ನಮೂದಿಸಿ",
            [o.Oriya]: "ଚାଲିବା ପାଇଁ ଉତ୍ତର ଦିଅନ୍ତୁ",
            [o.Gujarati]: "ચાલુ રાખવા માટે ઉત્તર આપો",
            [o.Assamese]: "চালোৱাৰ বাবে উত্তৰ দিব",
            [o.Bengali]: "চালিয়ে যাওয়ার জন্য উত্তর দিন",
            [o.Bulgarian]: "Моля, въведете отговора, за да продължите",
          },
        });
    }
    getValueLanguage(e, n) {
      e || (e = "en");
      let r = e.indexOf("-"),
        s = r >= 0,
        i = null;
      return (
        s && (i = e.substring(0, r)),
        this.languageValues[n]
          ? this.languageValues[n][e]
            ? this.languageValues[n][e]
            : s && this.languageValues[n][i]
            ? this.languageValues[n][i]
            : n
          : n
      );
    }
    getValue(e) {
      return this.getValueLanguage(this.currentLanguage, e);
    }
    setLanguage(e) {
      return (this.currentLanguage = e);
    }
  }
  var hs = ((t) => (
    (t[(t.SingleChoice = 0)] = "SingleChoice"),
    (t[(t.MultiChoice = 1)] = "MultiChoice"),
    (t[(t.DateTime = 2)] = "DateTime"),
    (t[(t.Integer = 3)] = "Integer"),
    (t[(t.ShortText = 4)] = "ShortText"),
    (t[(t.LongText = 5)] = "LongText"),
    (t[(t.Recaptcha = 6)] = "Recaptcha"),
    t
  ))(hs || {});
  const o = {
      English: "en",
      Spanish: "es",
      Russian: "ru",
      Italian: "it",
      French: "fr",
      German: "de",
      Dutch: "nl",
      Portuguese: "pt",
      Polish: "pl",
      Japanese: "ja",
      ChineseSimplified: "zh-CN",
      Korean: "ko",
      Finnish: "fi",
      Malay: "ms",
      Swedish: "sv",
      ChineseTraditional: "zh-TW",
      Danish: "da",
      Filipino: "fil",
      Arabic: "ar",
      Thai: "th",
      Turkish: "tr",
      Vietnamese: "vi",
      Hindi: "hi",
      Romanian: "ro",
      Norwegian: "no",
      Czech: "cs",
      Hungarian: "hu",
      Indonesian: "id",
      Greek: "el",
      Slovak: "sk",
      Luxembourgish: "lb",
      Estonian: "et",
      Latvian: "lv",
      Lithuanian: "lt",
      Flemish: "nl-fl",
      Croatian: "hr",
      Urdu: "ur",
      Kazakh: "kk",
      Marathi: "mr",
      Telugu: "te",
      Tamil: "ta",
      Malayalam: "ml",
      Kannada: "kn",
      Oriya: "or",
      Gujarati: "gu",
      Assamese: "as",
      Bengali: "bn",
      Bulgarian: "bg",
    },
    ln = {
      shouldHaveChoices(t) {
        return t == 0 || t == 1;
      },
      shouldHaveAnswerText(t) {
        return t == 5 || t == 4;
      },
    },
    Ft = {
      AskQuestion: 0,
      ShowInstructions: 1,
      Terminate: 2,
      RouteToClientLink: 3,
      WaitForInformation: 4,
      SelectLanguage: 5,
      ShowMessage: 6,
    },
    mn = new wb(),
    Mr = {
      Logo: "cr-custom-logo",
      Choice: "cr-custom-co",
      SelectedChoice: "cr-custom-selected",
      ChoiceHover: "cr-custom-co:hover",
      HoverChoice: "cr-custom-co-hover",
      HeaderText: "cr-custom-header",
      QuestionText: "cr-custom-qt",
      InfoText: "cr-custom-info",
      DisplayAnswerText: "cr-custom-dat",
      TimerNumbers: "cr-custom-timer-num",
      TimerHrMinSec: "cr-custom-timer-hrminsec",
      TimerInstructions: "cr-custom-timer-inst",
      NextButton: "cr-custom-nb",
      HoverNextButton: "cr-custom-nb:hover",
      EnterButton: "cr-custom-eb",
      EnterButtonHover: "cr-custom-eb:hover",
      LoadingBar: "cr-custom-loadingbar",
      ProgressBar: "cr-custom-progress",
      QuestionCard: "cr-question-card",
      QuestionCardTopBar: "cr-question-card-topbar",
      QuestionCount: "cr-question-count",
      QuestionContainer: "cr-question-container",
      ErrorMessage: "sentry-error-msg",
      Footer: "cr-footer",
    },
    co = {
      QuestionPrompt: "cr-p",
      Choice: "cr-o",
      QuestionTypeMulti: "cr-t-m",
      QuestionTypeSingle: "cr-t-s",
      QuestionType: "cr-t",
      SelectBody: "cr-sb",
      ChoiceText: "cr-ct",
    },
    tr = {
      QuestionCountText: "question-count-text",
      RandomChoice: "random-choice",
      AnswerChoice: "answer-choice",
      Next: "next",
      OpenEnded: "open-ended",
      OpenEndedLong: "open-ended-long",
      Choice: "choice",
      Language: "language",
      LanguageOption: "language-option",
      Instruction: "instruction",
      Start: "start",
      CurrentQuestionCount: "current-count",
      TotalQuestionCount: "total-count",
      QuestionPrompt: "question-prompt",
      OptionA: "option-A",
      OptionB: "option-B",
      OptionC: "option-C",
      OptionD: "option-D",
      Timer: "timer",
      NotFoundErrorPage: "not-found-error-page",
      ApplicationErrorPage: "app-error-page",
      ProjectStoppedSection: "project-stopped-section",
    },
    Ei = { ProviderId: "providerId", StudyId: "studyId" },
    Sb = window.location.hostname.includes("staging"),
    Tb = window.location.hostname.includes("localhost"),
    xb = window.location.hostname.includes("frontend-vue");
  let ti = "https://sentry-api.cloudresearch.com";
  Sb && (ti = "https://sentry-staging-api.cloudresearch.com");
  Tb && (ti = "https://localhost:44354");
  xb && (ti = "http://backend:80");
  const Ib = { ApiUrl: ti },
    Cb = {
      emits: ["enter-key", "update:answer", "update:selectedChoices"],
      props: {
        question: Object,
        enableHotKeys: { type: Boolean, default: !0 },
        selectedChoices: { type: Array, default: [] },
        answer: { type: String, default: null },
        currentLanguage: String,
      },
      setup(t, { emit: e }) {
        const n = Yn({
            selectedChoices: t.selectedChoices,
            dropdownSelection: null,
            isDirty: !1,
          }),
          r = le(() => {
            if (!(!n.selectedChoices || n.selectedChoices.length === 0))
              return n.selectedChoices.map((v) => v.text).join(", ");
          }),
          s = vs(null),
          i = vs(null);
        ch(
          () => {
            s.value && s.value.focus(), i.value && i.value.focus();
          },
          { flush: "post" }
        );
        function a(v) {
          return v == hs.MultiChoice;
        }
        function l(v) {
          return ln.shouldHaveChoices(v);
        }
        const c = le(() => ln.shouldHaveAnswerText(t.question.questionType));
        function u(v) {
          return String.fromCharCode(65 + v);
        }
        function f(v) {
          return n.selectedChoices.some((N) => N.choiceId == v.choiceId);
        }
        function m(v) {
          t.question.questionType == hs.SingleChoice &&
            n.selectedChoices.length > 0 &&
            (n.selectedChoices = []),
            f(v) ? n.selectedChoices.pop() : n.selectedChoices.push(v),
            e("update:selected-choices", n.selectedChoices);
        }
        const g = (v) => {
          if (!t.enableHotKeys || c.value) return;
          if (v.key === "Enter") {
            e("enter-key");
            return;
          }
          const S = {
            type: v.type,
            key: v.key,
            code: v.code,
            location: v.location,
            repeat: v.repeat,
            ctrlKey: v.ctrlKey,
            shiftKey: v.shiftKey,
            altKey: v.altKey,
            metaKey: v.metaKey,
          }.key;
          if (S.length != 1) return;
          const k = S.toUpperCase().charCodeAt(0),
            F = 65,
            Z = t.question.choices.length;
          if (k >= F && k <= F + Z - 1) {
            var Y = k - F;
            Y >= 0 && Y < Z && m(t.question.choices[Y]);
          }
        };
        Hn(
          () => t.question.questionType,
          () => {
            document.removeEventListener("keypress", g, !0),
              document.addEventListener("keypress", g, !0);
          },
          { immediate: !0 }
        ),
          tu(() => {
            document.removeEventListener("keypress", g, !0);
          });
        const y = (v) => {
            (n.isDirty = !0), e("update:answer", v);
          },
          E = le(() => {
            var N, S;
            return c.value &&
              n.isDirty &&
              ((S = (N = t.answer) == null ? void 0 : N.trim()) == null
                ? void 0
                : S.length) == 0
              ? `text-red-main ${Mr.ErrorMessage}`
              : null;
          });
        return {
          state: n,
          isMultiChoice: a,
          shouldHaveChoices: l,
          hotKeyLetter: u,
          isSelected: f,
          choiceSelected: m,
          QuestionType: hs,
          CustomCss: Mr,
          displayOpenEndedQuestion: c,
          EventStreamerClasses: co,
          updateAnswer: y,
          LanguageTextService: mn,
          displayAnswer: r,
          shortText: s,
          longText: i,
          SelectorClasses: tr,
          getErrorClasses: E,
        };
      },
    },
    An = (t, e) => {
      const n = t.__vccOpts || t;
      for (const [r, s] of e) n[r] = s;
      return n;
    },
    Eb = { key: 0 },
    _b = ["innerHTML"],
    kb = { key: 1 },
    Ob = ["value"],
    Ab = ["value"],
    Mb = { key: 2 },
    Lb = p("option", { disabled: "", value: null }, "Select...", -1),
    Nb = ["value"],
    Pb = {
      class:
        "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",
    },
    Db = ["tabindex", "onClick", "onKeyup"],
    Fb = { class: "text-center w-full" },
    Rb = {
      key: 4,
      class: "transition-all duration-500",
      style: { opacity: "1" },
    };
  function jb(t, e, n, r, s, i) {
    var l, c;
    const a = Ue("font-awesome-icon");
    return (
      O(),
      B("div", null, [
        p(
          "h1",
          {
            id: "openEndedQuestionLabel",
            class:
              D(`font-bold my-2 sm:my-8 text-2xl ${r.CustomCss.QuestionText} ${r.EventStreamerClasses.QuestionPrompt}
      ${r.SelectorClasses.QuestionPrompt}-${n.question.questionId} ${r.SelectorClasses.QuestionPrompt}-${n.currentLanguage} ${r.SelectorClasses.QuestionPrompt}`),
          },
          te(n.question.prompt),
          3
        ),
        (l = n.question.displayMetadata) != null && l.extraHtml
          ? (O(),
            B("div", Eb, [
              p(
                "div",
                {
                  class: "ql-editor ql-display ql-question",
                  innerHTML: n.question.displayMetadata.extraHtml,
                },
                null,
                8,
                _b
              ),
            ]))
          : X("", !0),
        r.displayOpenEndedQuestion
          ? (O(),
            B("div", kb, [
              p(
                "div",
                { class: D(`mt-3 ${r.EventStreamerClasses.SelectBody}`) },
                [
                  n.question.questionType === r.QuestionType.ShortText
                    ? (O(),
                      B(
                        "input",
                        {
                          key: 0,
                          id: "openEndedQuestionShort",
                          "aria-labelledby": "openEndedQuestionLabel",
                          tabindex: "2",
                          class: D(
                            `flex-grow appearance-none rounded border py-3 px-3 leading-tight buttonfocus w-full ${r.SelectorClasses.OpenEnded}`
                          ),
                          type: "text",
                          value: n.answer,
                          onInput:
                            e[0] ||
                            (e[0] = (u) => r.updateAnswer(u.target.value)),
                          ref: "shortText",
                        },
                        null,
                        42,
                        Ob
                      ))
                    : X("", !0),
                  n.question.questionType === r.QuestionType.LongText
                    ? (O(),
                      B(
                        "textarea",
                        {
                          key: 1,
                          id: "openEndedQuestionLong",
                          "aria-labelledby": "openEndedQuestionLabel",
                          tabindex: "2",
                          class: D(
                            `appearance-none border rounded w-full py-2 px-3 leading-tight buttonfocus resize-none h-32 ${r.SelectorClasses.OpenEndedLong}`
                          ),
                          value: n.answer,
                          onInput:
                            e[1] ||
                            (e[1] = (u) => r.updateAnswer(u.target.value)),
                          ref: "longText",
                        },
                        null,
                        42,
                        Ab
                      ))
                    : X("", !0),
                ],
                2
              ),
              p(
                "div",
                {
                  style: _t({
                    visibility:
                      !n.answer || n.answer.trim() === ""
                        ? "visible"
                        : "hidden",
                  }),
                  class: D(`mt-4 sm:mt-8 text-gray-300 ${r.getErrorClasses}`),
                },
                [
                  r.getErrorClasses
                    ? (O(),
                      Ce(a, {
                        key: 0,
                        icon: ["fas", "exclamation-circle"],
                        class: "mr-2",
                      }))
                    : X("", !0),
                  rt(
                    " " +
                      te(
                        r.LanguageTextService.getValueLanguage(
                          n.currentLanguage,
                          "Please enter answer to continue"
                        )
                      ),
                    1
                  ),
                ],
                6
              ),
            ]))
          : r.shouldHaveChoices(n.question.questionType)
          ? (O(),
            B("div", Mb, [
              n.question.questionType === r.QuestionType.MultiChoice
                ? (O(),
                  B(
                    "div",
                    {
                      key: 0,
                      class: D(
                        `mt-2 text-md text-gray-medium ${r.SelectorClasses.Choice}`
                      ),
                    },
                    te(
                      r.LanguageTextService.getValueLanguage(
                        n.currentLanguage,
                        "Select all that apply"
                      )
                    ) + ": ",
                    3
                  ))
                : X("", !0),
              (c = n.question.displayMetadata) != null && c.showAsDropdown
                ? (O(),
                  B(
                    "div",
                    {
                      key: 1,
                      class: D(
                        `${r.EventStreamerClasses.SelectBody} mb-6 inline-block relative w-64`
                      ),
                    },
                    [
                      os(
                        p(
                          "select",
                          {
                            "onUpdate:modelValue":
                              e[2] ||
                              (e[2] = (u) => (r.state.dropdownSelection = u)),
                            class:
                              "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-4 pr-8 rounded shadow leading-tight focus:outline-none focus:ring",
                            onChange:
                              e[3] ||
                              (e[3] = (u) =>
                                r.choiceSelected(r.state.dropdownSelection)),
                          },
                          [
                            Lb,
                            (O(!0),
                            B(
                              Te,
                              null,
                              Ss(
                                n.question.choices,
                                (u) => (
                                  O(),
                                  B(
                                    "option",
                                    { key: u.choiceId, value: u },
                                    te(u.text),
                                    9,
                                    Nb
                                  )
                                )
                              ),
                              128
                            )),
                          ],
                          544
                        ),
                        [[wm, r.state.dropdownSelection]]
                      ),
                      p("div", Pb, [
                        ve(a, { icon: ["fal", "angle-down"], class: "mr-2" }),
                      ]),
                    ],
                    2
                  ))
                : (O(),
                  B(
                    "div",
                    {
                      key: 2,
                      class: D(`${r.EventStreamerClasses.SelectBody} mb-6`),
                    },
                    [
                      p(
                        "div",
                        {
                          class: D([
                            n.question.choices.length > 4
                              ? "sm:grid sm:grid-cols-2 gap-2"
                              : "",
                          ]),
                        },
                        [
                          (O(!0),
                          B(
                            Te,
                            null,
                            Ss(
                              n.question.choices,
                              (u, f) => (
                                O(),
                                B(
                                  "div",
                                  {
                                    class: D(
                                      `${r.EventStreamerClasses.QuestionTypeSingle}`
                                    ),
                                    key: u.choiceId,
                                  },
                                  [
                                    p(
                                      "div",
                                      {
                                        tabindex: f + 2,
                                        role: "button",
                                        class: D(
                                          `${[
                                            r.isSelected(u)
                                              ? "hover:border-light-gray-medium border-white"
                                              : "hover:border-blue-main",
                                          ]} choice-option w-full mt-2 border border-gray-medium flex items-center rounded cursor-pointer buttonfocus ${
                                            r.CustomCss.Choice
                                          } ${r.CustomCss.ChoiceHover} ${
                                            r.SelectorClasses.RandomChoice
                                          }`
                                        ),
                                        onClick: () => r.choiceSelected(u),
                                        onKeyup: Es(
                                          () => r.choiceSelected(u),
                                          ["space"]
                                        ),
                                      },
                                      [
                                        p(
                                          "div",
                                          {
                                            class: D(
                                              `border-r w-12 text-gray-medium flex self-stretch items-center ${r.CustomCss.Choice} ${r.CustomCss.ChoiceHover}`
                                            ),
                                          },
                                          [
                                            n.enableHotKeys
                                              ? (O(),
                                                B(
                                                  "div",
                                                  {
                                                    key: 0,
                                                    class: D(
                                                      `${[
                                                        r.isSelected(u)
                                                          ? `bg-blue-main text-white ${r.CustomCss.SelectedChoice}`
                                                          : "",
                                                      ]} w-full h-full flex items-center text-center p-4 ${
                                                        r.CustomCss.Choice
                                                      }`
                                                    ),
                                                  },
                                                  [
                                                    p("div", Fb, [
                                                      r.isMultiChoice(
                                                        n.question.questionType
                                                      )
                                                        ? (O(),
                                                          B(
                                                            Te,
                                                            { key: 0 },
                                                            [
                                                              r.isSelected(u)
                                                                ? (O(),
                                                                  Ce(a, {
                                                                    key: 0,
                                                                    icon: [
                                                                      "fa-solid",
                                                                      "fa-square-check",
                                                                    ],
                                                                  }))
                                                                : X("", !0),
                                                              r.isSelected(u)
                                                                ? X("", !0)
                                                                : (O(),
                                                                  Ce(a, {
                                                                    key: 1,
                                                                    icon: [
                                                                      "fa-regular",
                                                                      "fa-square",
                                                                    ],
                                                                  })),
                                                            ],
                                                            64
                                                          ))
                                                        : (O(),
                                                          B(
                                                            Te,
                                                            { key: 1 },
                                                            [
                                                              r.isSelected(u)
                                                                ? (O(),
                                                                  Ce(a, {
                                                                    key: 0,
                                                                    icon: [
                                                                      "fa-regular",
                                                                      "fa-circle-dot",
                                                                    ],
                                                                  }))
                                                                : X("", !0),
                                                              r.isSelected(u)
                                                                ? X("", !0)
                                                                : (O(),
                                                                  Ce(a, {
                                                                    key: 1,
                                                                    icon: [
                                                                      "fa-regular",
                                                                      "fa-circle",
                                                                    ],
                                                                  })),
                                                            ],
                                                            64
                                                          )),
                                                    ]),
                                                  ],
                                                  2
                                                ))
                                              : (O(),
                                                B(
                                                  "div",
                                                  {
                                                    key: 1,
                                                    class: D([
                                                      "w-full h-full flex items-center text-center p-4",
                                                      `${[
                                                        r.isSelected(u)
                                                          ? `bg-blue-main text-white ${r.CustomCss.SelectedChoice}`
                                                          : "",
                                                      ]}`,
                                                    ]),
                                                  },
                                                  [
                                                    r.isMultiChoice(
                                                      n.question.questionType
                                                    )
                                                      ? (O(),
                                                        B(
                                                          Te,
                                                          { key: 0 },
                                                          [
                                                            r.isSelected(u)
                                                              ? (O(),
                                                                Ce(a, {
                                                                  key: 0,
                                                                  icon: [
                                                                    "fa-solid",
                                                                    "fa-square-check",
                                                                  ],
                                                                }))
                                                              : X("", !0),
                                                            r.isSelected(u)
                                                              ? X("", !0)
                                                              : (O(),
                                                                Ce(a, {
                                                                  key: 1,
                                                                  icon: [
                                                                    "fa-regular",
                                                                    "fa-square",
                                                                  ],
                                                                })),
                                                          ],
                                                          64
                                                        ))
                                                      : (O(),
                                                        B(
                                                          Te,
                                                          { key: 1 },
                                                          [
                                                            r.isSelected(u)
                                                              ? (O(),
                                                                Ce(a, {
                                                                  key: 0,
                                                                  icon: [
                                                                    "fa-regular",
                                                                    "fa-circle-dot",
                                                                  ],
                                                                }))
                                                              : X("", !0),
                                                            r.isSelected(u)
                                                              ? X("", !0)
                                                              : (O(),
                                                                Ce(a, {
                                                                  key: 1,
                                                                  icon: [
                                                                    "fa-regular",
                                                                    "fa-circle",
                                                                  ],
                                                                })),
                                                          ],
                                                          64
                                                        )),
                                                  ],
                                                  2
                                                )),
                                          ],
                                          2
                                        ),
                                        p(
                                          "div",
                                          {
                                            class: D(
                                              `flex self-stretch items-center text-left w-full ${r.CustomCss.Choice} ${r.CustomCss.ChoiceHover}`
                                            ),
                                          },
                                          [
                                            p(
                                              "div",
                                              {
                                                class: D(
                                                  `${[
                                                    r.isSelected(u)
                                                      ? `bg-blue-main text-white ${r.CustomCss.SelectedChoice}`
                                                      : "",
                                                  ]} w-full p-4 ${
                                                    r.EventStreamerClasses
                                                      .ChoiceText
                                                  } ${
                                                    r.SelectorClasses
                                                      .AnswerChoice
                                                  }-${u.choiceId}`
                                                ),
                                              },
                                              te(u.text),
                                              3
                                            ),
                                          ],
                                          2
                                        ),
                                      ],
                                      42,
                                      Db
                                    ),
                                  ],
                                  2
                                )
                              )
                            ),
                            128
                          )),
                        ],
                        2
                      ),
                    ],
                    2
                  )),
              r.state.selectedChoices.length == 0
                ? (O(),
                  B(
                    "div",
                    {
                      key: 3,
                      class: D(`text-gray-300 ${r.CustomCss.InfoText}`),
                    },
                    te(
                      r.LanguageTextService.getValue(
                        "Please select answer to continue"
                      )
                    ),
                    3
                  ))
                : (O(),
                  B("div", Rb, [
                    p("div", null, [
                      p(
                        "span",
                        { class: D(`text-gray-300 ${r.CustomCss.InfoText}`) },
                        te(r.LanguageTextService.getValue("Your answer(s)")) +
                          ": ",
                        3
                      ),
                      p(
                        "span",
                        { class: D(`${r.CustomCss.DisplayAnswerText}`) },
                        te(r.displayAnswer),
                        3
                      ),
                    ]),
                  ])),
            ]))
          : X("", !0),
      ])
    );
  }
  const Bb = An(Cb, [["render", jb]]),
    zb = {
      props: {
        showButtonSkeleton: { type: Boolean, default: !0 },
        wrapperClasses: { type: String, default: "justify-center" },
        heightClasses: { default: "h-5/10" },
        wrapperStyles: { type: String, default: "" },
        width: { type: String, default: "w-1/2" },
        moreLines: { type: Boolean, default: !1 },
        visible: { type: Boolean, default: !1 },
      },
      setup(t) {
        const e = vs(!1);
        let n = null;
        Hn(
          () => t.visible,
          (s, i) => {
            s
              ? (n = setTimeout(() => {
                  e.value = !0;
                }, 1e4))
              : (clearTimeout(n), (e.value = !1));
          }
        );
        function r() {
          window.location.reload();
        }
        return { showReload: e, refreshPage: r };
      },
    },
    Hb = p(
      "div",
      { class: "top flex flex-col items-center h-3/10" },
      [p("div", { class: "w-1/2" })],
      -1
    ),
    Vb = p(
      "div",
      null,
      [
        p("div", {
          class: "line1 bg-gray-100 w-3/20 h-2/10 mt-4 mb-10 skeleton-box",
        }),
        p("div", {
          class: "line1 bg-gray-100 w-27/50 h-2/10 mt-4 mb-8 skeleton-box",
        }),
      ],
      -1
    ),
    Ub = p(
      "div",
      {
        class: "choice1 bg-gray-100 rounded w-85/100 h-2/10 mt-4 skeleton-box",
      },
      null,
      -1
    ),
    Zb = p(
      "div",
      {
        class: "choice1 bg-gray-100 rounded w-85/100 h-2/10 mt-4 skeleton-box",
      },
      null,
      -1
    ),
    Gb = p(
      "div",
      {
        class: "choice1 bg-gray-100 rounded w-85/100 h-2/10 mt-4 skeleton-box",
      },
      null,
      -1
    ),
    Wb = {
      key: 0,
      class: "choice1 bg-gray-100 rounded w-85/100 h-2/10 mt-4 skeleton-box",
    },
    qb = {
      key: 1,
      class: "choice1 bg-gray-100 rounded w-85/100 h-2/10 mt-4 skeleton-box",
    },
    $b = { key: 0, class: "flex flex-col justify-around mt-8 h-3/10" },
    Kb = p(
      "div",
      { class: "h-3/10" },
      [p("div", { class: "line1 bg-gray-100 w-29/100 h-5/10 skeleton-box" })],
      -1
    ),
    Yb = p(
      "div",
      { class: "h-3/10" },
      [p("div", { class: "bg-gray-100 rounded-lg w-1/8 h-full skeleton-box" })],
      -1
    ),
    Qb = [Kb, Yb],
    Jb = { key: 1, class: "flex flex-col items-center" },
    Xb = p(
      "div",
      { class: "mt-16 text-center text-lg" },
      [
        p("div", { class: "text-gray-medium" }, [
          p(
            "span",
            null,
            " If the next question does not appear shortly try reloading your page. "
          ),
        ]),
      ],
      -1
    ),
    ev = { class: "mt-4 text-center" };
  function tv(t, e, n, r, s, i) {
    const a = Ue("font-awesome-icon");
    return (
      O(),
      B(
        "div",
        {
          class: "rounded-lg w-full h-full flex flex-col bg-white",
          style: _t(n.wrapperStyles),
        },
        [
          Hb,
          r.showReload
            ? X("", !0)
            : (O(),
              B(
                "div",
                { key: 0, class: D(`flex w-full px-4 ${n.heightClasses}`) },
                [
                  p(
                    "div",
                    { class: D(`flex w-full ${n.wrapperClasses}`) },
                    [
                      p(
                        "div",
                        { class: D(`justify-start flex flex-col ${n.width}`) },
                        [
                          Vb,
                          p("div", null, [
                            Ub,
                            Zb,
                            Gb,
                            n.moreLines ? (O(), B("div", Wb)) : X("", !0),
                            n.moreLines ? (O(), B("div", qb)) : X("", !0),
                          ]),
                          n.showButtonSkeleton
                            ? (O(), B("div", $b, Qb))
                            : X("", !0),
                        ],
                        2
                      ),
                    ],
                    2
                  ),
                ],
                2
              )),
          r.showReload
            ? (O(),
              B("div", Jb, [
                Xb,
                p("div", ev, [
                  p(
                    "button",
                    {
                      onClick:
                        e[0] ||
                        (e[0] = (...l) => r.refreshPage && r.refreshPage(...l)),
                      class:
                        "focus:outline-none tracking-wide rounded px-3 py-2 text-base border border-blue-main bg-blue-main shadow-button-blue text-white active:bg-blue-main-dark hover:shadow-none flex items-center",
                    },
                    [
                      ve(a, { icon: ["far", "sync-alt"], class: "mr-2" }),
                      rt(" Reload Page "),
                    ]
                  ),
                ]),
              ]))
            : X("", !0),
        ],
        4
      )
    );
  }
  const nv = An(zb, [["render", tv]]),
    rv = Zs({
      props: { remainingSeconds: Number, languageCode: String },
      setup(t) {
        const e = le(() => t.remainingSeconds / 3600),
          n = le(() => (t.remainingSeconds / 60) % 60),
          r = le(() => t.remainingSeconds % 60);
        function s(i) {
          return Math.trunc(i).toFixed(0).padStart(2, "0");
        }
        return {
          hour: e,
          minute: n,
          second: r,
          numberDisplay: s,
          CustomCss: Mr,
          LanguageTextService: mn,
          SelectorClasses: tr,
        };
      },
    }),
    sv = { class: "text-gray-300" },
    iv = {
      class:
        "text-gray-dark text-center font-semibold lg:font-normal text-base lg:text-sm",
    },
    av = { class: "time flex w-full sm:justify-end" },
    ov = { class: "flex flex-col items-center" },
    lv = { class: "text-xl numeric-tabular-nums" },
    cv = p(
      "div",
      { class: "text-xl px-1 xl:px-2 numeric-tabular-nums" },
      [p("span", null, ":")],
      -1
    ),
    uv = { class: "flex flex-col items-center" },
    fv = { class: "text-xl numeric-tabular-nums" },
    dv = p(
      "div",
      { class: "text-xl px-1 xl:px-2 numeric-tabular-nums" },
      [p("span", null, ":")],
      -1
    ),
    hv = { class: "flex flex-col items-center" },
    mv = { class: "text-xl numeric-tabular-nums" };
  function gv(t, e, n, r, s, i) {
    return (
      O(),
      B(
        "div",
        { class: D(`text-gray-300 ${t.SelectorClasses.Timer}`) },
        [
          p("div", sv, [
            p(
              "div",
              {
                class: D(
                  `timer-clock h-auto flex flex-col items-start sm:items-center lg:items-start lg:px-0 ${t.CustomCss.TimerNumbers}`
                ),
              },
              [
                p("div", iv, [
                  p(
                    "div",
                    {
                      class: D(
                        `text-xs text-gray-300 mt-2 ${t.CustomCss.TimerInstructions}`
                      ),
                    },
                    te(
                      t.LanguageTextService.getValueLanguage(
                        t.languageCode,
                        "Complete pre-study questions in"
                      )
                    ) + ": ",
                    3
                  ),
                ]),
                p("div", av, [
                  p("div", ov, [
                    p("span", lv, te(t.numberDisplay(t.hour)), 1),
                    p(
                      "span",
                      {
                        class: D(
                          `text-tiny text-gray-medium hidden lg:block ${t.CustomCss.TimerHrMinSec}`
                        ),
                      },
                      "HR",
                      2
                    ),
                  ]),
                  cv,
                  p("div", uv, [
                    p("span", fv, te(t.numberDisplay(t.minute)), 1),
                    p(
                      "span",
                      {
                        class: D(
                          `text-tiny text-gray-medium hidden lg:block ${t.CustomCss.TimerHrMinSec}`
                        ),
                      },
                      "MIN",
                      2
                    ),
                  ]),
                  dv,
                  p("div", hv, [
                    p("span", mv, te(t.numberDisplay(t.second)), 1),
                    p(
                      "span",
                      {
                        class: D(
                          `text-tiny text-gray-medium hidden lg:block ${t.CustomCss.TimerHrMinSec}`
                        ),
                      },
                      "SEC",
                      2
                    ),
                  ]),
                ]),
              ],
              2
            ),
          ]),
        ],
        2
      )
    );
  }
  const hf = An(rv, [["render", gv]]),
    pv = Zs({
      props: { title: String, errorMessage: String, isProjectStopped: Boolean },
      setup() {
        return { SelectorClasses: tr };
      },
    }),
    mf =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAuOTUzIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjk2Ljk1MyA0OS40NDEiPgogIDxnIGlkPSJHcm91cF84MDIiIGRhdGEtbmFtZT0iR3JvdXAgODAyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzMgLTcyLjk1MykiPgogICAgPHRleHQgaWQ9IkNsb3VkUmVzZWFyY2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNi42NTIgMTAzLjg5OSkiIGZpbGw9IiMwMDY5OWQiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EtQm9sZCwgSGVsdmV0aWNhIiBmb250LXdlaWdodD0iNzAwIj4KICAgICAgPHRzcGFuIHg9Ii0xMiIgeT0iLTQiPkNsb3VkPC90c3Bhbj4KICAgIDwvdGV4dD4KICAgIDx0ZXh0IGlkPSJDbG91ZFJlc2VhcmNoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjYuNjUyIDEwMy44OTkpIiBmaWxsPSJsaWdodHN0ZWVsYmx1ZSIgZm9udC1zaXplPSIzMCIgZm9udC1mYW1pbHk9IkhlbHZldGljYS1Cb2xkLCBIZWx2ZXRpY2EiIGZvbnQtd2VpZ2h0PSI3MDAiPgogICAgICA8dHNwYW4geD0iNzMiIHk9Ii00Ij5SZXNlYXJjaDwvdHNwYW4+CiAgICA8L3RleHQ+CiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzIxMSIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjExIiB3aWR0aD0iOC40MTgiIGhlaWdodD0iOC40MTgiIHJ4PSIxLjMwOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzMgNzIuOTY0KSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjEyIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTIiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NS4xMjIgNzIuOTUzKSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjEzIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTMiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3My4wMDIgODUuMTAyKSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE0IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTQiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NS4wODUgODUuMDkxKSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE1IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTUiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3My4wMjIgOTcuMjI2KSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE2IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTYiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NS4xMjIgOTcuMjc3KSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE3IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTciIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5Ny4yMTYgNzIuOTg2KSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE4IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTgiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5Ny4yIDg1LjExNykiIGZpbGw9IiMwMDY5OWQiIC8+CiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzIxOSIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjE5IiB3aWR0aD0iOC40MTgiIGhlaWdodD0iOC40MTgiIHJ4PSIxLjMwOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTcuMiA5Ny4yNzcpIiBmaWxsPSIjMDA2OTlkIiAvPgogICAgPHRleHQgaWQ9IlRNIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNjIuOTUzIDg0LjQ1MykiIGZpbGw9ImxpZ2h0c3RlZWxibHVlIiBmb250LXNpemU9IjYiIGZvbnQtZmFtaWx5PSJNb250c2VycmF0LUJvbGQsIE1vbnRzZXJyYXQiIGZvbnQtd2VpZ2h0PSIzMDAiPgogICAgICA8dHNwYW4geD0iLTMwIiB5PSItMyI+VE08L3RzcGFuPgogICAgPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
    yv = "/entry/app/assets/404-DoGn-Php.png",
    bv = { class: "flex flex-col h-full" },
    vv = p(
      "div",
      { class: "text-center pt-8" },
      [p("div", { class: "inline-block" }, [p("img", { src: mf })])],
      -1
    ),
    wv = { class: "mt-2 flex items-center" },
    Sv = ["innerHTML"],
    Tv = {
      key: 1,
      class: "flex flex-col items-center justify-center flex-grow",
    },
    xv = p("div", null, [p("img", { src: yv, alt: "ghost-image" })], -1),
    Iv = { class: "mt-8" },
    Cv = { class: "text-2xl font-medium" },
    Ev = { class: "mt-4" },
    _v = { class: "w-full md:w-1/2 mx-auto" },
    kv = ["innerHTML"];
  function Ov(t, e, n, r, s, i) {
    const a = Ue("font-awesome-icon");
    return (
      O(),
      B(
        "div",
        {
          class: D([
            "w-screen h-full bg-gray-050",
            `${t.SelectorClasses.NotFoundErrorPage}`,
          ]),
        },
        [
          p("div", bv, [
            vv,
            t.isProjectStopped
              ? (O(),
                B(
                  "div",
                  {
                    key: 0,
                    class: D([
                      "flex flex-col items-center justify-center h-full",
                      `${t.SelectorClasses.ProjectStoppedSection}`,
                    ]),
                  },
                  [
                    p("div", null, [
                      ve(a, {
                        icon: ["fas", "exclamation-triangle"],
                        class: "text-gray-400 mb-4",
                        style: { "font-size": "7rem" },
                      }),
                    ]),
                    p("div", wv, [
                      p(
                        "div",
                        {
                          class: "text-2xl font-medium w-full text-center",
                          innerHTML: t.errorMessage,
                        },
                        null,
                        8,
                        Sv
                      ),
                    ]),
                  ],
                  2
                ))
              : (O(),
                B("div", Tv, [
                  xv,
                  p("div", Iv, [p("div", Cv, te(t.title), 1)]),
                  p("div", Ev, [
                    p("div", _v, [
                      p(
                        "div",
                        {
                          class: "text-gray-medium text-center",
                          innerHTML: t.errorMessage,
                        },
                        null,
                        8,
                        kv
                      ),
                    ]),
                  ]),
                ])),
          ]),
        ],
        2
      )
    );
  }
  const Av = An(pv, [["render", Ov]]),
    Mv = Zs({
      props: {
        title: String,
        errorMessage: String,
        hideRefreshButton: Boolean,
      },
      setup() {
        function t() {
          window.location.reload();
        }
        return { refreshPage: t, SelectorClasses: tr };
      },
    }),
    Lv = "/entry/app/assets/500-DBALZHnz.png",
    Nv = { class: "flex flex-col h-full" },
    Pv = p(
      "div",
      { class: "text-center pt-8" },
      [p("div", { class: "inline-block" }, [p("img", { src: mf })])],
      -1
    ),
    Dv = { class: "flex flex-col items-center justify-center flex-grow" },
    Fv = p("div", null, [p("img", { src: Lv, alt: "rocket-image" })], -1),
    Rv = { class: "mt-8" },
    jv = { class: "text-2xl font-medium" },
    Bv = { class: "mt-4" },
    zv = { class: "text-gray-medium" },
    Hv = { key: 0, class: "mt-4" };
  function Vv(t, e, n, r, s, i) {
    const a = Ue("font-awesome-icon");
    return (
      O(),
      B(
        "div",
        {
          class: D([
            "w-screen h-screen bg-gray-050",
            `${t.SelectorClasses.ApplicationErrorPage}`,
          ]),
        },
        [
          p("div", Nv, [
            Pv,
            p("div", Dv, [
              Fv,
              p("div", Rv, [p("div", jv, te(t.title), 1)]),
              p("div", Bv, [
                p("div", zv, [p("span", null, te(t.errorMessage), 1)]),
              ]),
              t.hideRefreshButton
                ? X("", !0)
                : (O(),
                  B("div", Hv, [
                    p(
                      "button",
                      {
                        onClick:
                          e[0] ||
                          (e[0] = (...l) =>
                            t.refreshPage && t.refreshPage(...l)),
                        class:
                          "focus:outline-none tracking-wide rounded px-3 py-2 text-base border border-blue-main bg-blue-main shadow-button-blue text-white active:bg-blue-main-dark hover:shadow-none flex items-center",
                      },
                      [
                        ve(a, { icon: ["far", "sync-alt"], class: "mr-2" }),
                        rt(" Reload Page "),
                      ]
                    ),
                  ])),
            ]),
          ]),
        ],
        2
      )
    );
  }
  const Uv = An(Mv, [["render", Vv]]),
    Zv =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAuOTUzIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjk2Ljk1MyA0OS40NDEiPgogIDxnIGlkPSJHcm91cF84MDIiIGRhdGEtbmFtZT0iR3JvdXAgODAyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzMgLTcyLjk1MykiPgogICAgPHRleHQgaWQ9IkNsb3VkUmVzZWFyY2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNi42NTIgMTAzLjg5OSkiIGZpbGw9IiMwMDY5OWQiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EtQm9sZCwgSGVsdmV0aWNhIiBmb250LXdlaWdodD0iNzAwIj4KICAgICAgPHRzcGFuIHg9Ii0xMiIgeT0iLTQiPkNsb3VkPC90c3Bhbj4KICAgIDwvdGV4dD4KICAgIDx0ZXh0IGlkPSJDbG91ZFJlc2VhcmNoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjYuNjUyIDEwMy44OTkpIiBmaWxsPSJsaWdodHN0ZWVsYmx1ZSIgZm9udC1zaXplPSIzMCIgZm9udC1mYW1pbHk9IkhlbHZldGljYS1Cb2xkLCBIZWx2ZXRpY2EiIGZvbnQtd2VpZ2h0PSI3MDAiPgogICAgICA8dHNwYW4geD0iNzMiIHk9Ii00Ij5SZXNlYXJjaDwvdHNwYW4+CiAgICA8L3RleHQ+CiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzIxMSIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjExIiB3aWR0aD0iOC40MTgiIGhlaWdodD0iOC40MTgiIHJ4PSIxLjMwOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzMgNzIuOTY0KSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjEyIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTIiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NS4xMjIgNzIuOTUzKSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjEzIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTMiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3My4wMDIgODUuMTAyKSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE0IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTQiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NS4wODUgODUuMDkxKSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE1IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTUiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3My4wMjIgOTcuMjI2KSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE2IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTYiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NS4xMjIgOTcuMjc3KSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE3IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTciIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5Ny4yMTYgNzIuOTg2KSIgZmlsbD0iIzAwNjk5ZCIgLz4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMjE4IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyMTgiIHdpZHRoPSI4LjQxOCIgaGVpZ2h0PSI4LjQxOCIgcng9IjEuMzA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5Ny4yIDg1LjExNykiIGZpbGw9IiMwMDY5OWQiIC8+CiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzIxOSIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjE5IiB3aWR0aD0iOC40MTgiIGhlaWdodD0iOC40MTgiIHJ4PSIxLjMwOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTcuMiA5Ny4yNzcpIiBmaWxsPSIjMDA2OTlkIiAvPgogICAgPHRleHQgaWQ9IlRNIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNjIuOTUzIDg0LjQ1MykiIGZpbGw9ImxpZ2h0c3RlZWxibHVlIiBmb250LXNpemU9IjYiIGZvbnQtZmFtaWx5PSJNb250c2VycmF0LUJvbGQsIE1vbnRzZXJyYXQiIGZvbnQtd2VpZ2h0PSIzMDAiPgogICAgICA8dHNwYW4geD0iLTMwIiB5PSItMyI+VE08L3RzcGFuPgogICAgPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==";
  function Gv(t) {
    return new Worker("/entry/app/assets/loadImages-DSFmM8OP.js", {
      name: t == null ? void 0 : t.name,
    });
  }
  const Wv = {
      components: { TimerClock: hf },
      emits: ["update:language-code"],
      props: {
        hideTimer: { type: Boolean, default: !1 },
        transitioning: { type: Boolean, default: !1 },
        studyLanguages: { type: Array, default: [] },
        remainingSeconds: { type: Number, default: 0 },
        logoUrl: { type: String, default: null },
        selectedLanguageCode: { type: String, default: null },
        enableNewUI: { type: Boolean, default: null },
      },
      setup(t, { emit: e }) {
        return {
          state: Yn({
            completionProgress: 0,
            hasSelectedLanguage: le(() => t.selectedLanguageCode),
            preferredLanguagesText: le(() => {
              let a = new Set();
              return (
                t.studyLanguages.forEach((l) => {
                  a.add(
                    mn.getValueLanguage(
                      l.languageCode,
                      "Select your preferred language"
                    )
                  );
                }),
                a
              );
            }),
          }),
          isLanguageCodeSelected: (a) => t.selectedLanguageCode === a,
          EventStreamerClasses: co,
          CustomCss: Mr,
          selectLanguage: (a) => {
            e("update:selected-language-code", a);
          },
          clickNext: () => {
            e("click-next");
          },
          LanguageTextService: mn,
          SelectorClasses: tr,
        };
      },
    },
    qv = { class: "flex flex-col w-full h-full overflow-x-hidden" },
    $v = { class: "w-full justify-center" },
    Kv = {
      class: "py-4 w-full sm:w-1/2 px-3 sm:px-0 mt-2 text-center mx-auto",
      role: "banner",
    },
    Yv = { class: "w-full flex justify-between" },
    Qv = ["src"],
    Jv = {
      class: "flex flex-col items-center w-full",
      role: "contentinfo",
      id: "mainContent",
      tabindex: "-1",
    },
    Xv = {
      class: "flex flex-col focus:outline-none w-full w-full sm:w-1/2 m-auto",
    },
    e1 = {
      style: {
        "margin-right": "auto !important",
        "margin-left": "0 !important",
      },
    },
    t1 = { class: "flex flex-col mt-2 w-full" },
    n1 = ["tabindex", "onClick", "onKeyup"],
    r1 = { class: "mt-2 sm:mt-6 sm:flex items-center justify-between" },
    s1 = { class: "flex items-center", style: { "animation-delay": "0.5s" } },
    i1 = ["disabled"];
  function a1(t, e, n, r, s, i) {
    const a = Ue("font-awesome-icon"),
      l = Ue("TimerClock");
    return (
      O(),
      B(
        "div",
        {
          class: D(
            `flex justify-center items-center h-full ${r.SelectorClasses.Language}`
          ),
        },
        [
          p("div", qv, [
            p("div", $v, [
              p(
                "div",
                { class: D(`${r.CustomCss.QuestionCardTopBar}`) },
                [
                  p("div", Kv, [
                    p("div", Yv, [
                      n.logoUrl
                        ? (O(),
                          B(
                            "img",
                            {
                              key: 0,
                              alt: "CloudResearch",
                              src: n.logoUrl,
                              class: D(`h-12 object-cover ${r.CustomCss.Logo}`),
                            },
                            null,
                            10,
                            Qv
                          ))
                        : X("", !0),
                      n.enableNewUI
                        ? (O(),
                          B(
                            "span",
                            {
                              key: 1,
                              class: D(`ml-auto ${r.CustomCss.HeaderText}`),
                            },
                            "Language",
                            2
                          ))
                        : X("", !0),
                    ]),
                  ]),
                  p(
                    "div",
                    { class: D(`flex ${r.CustomCss.ProgressBar}`) },
                    [
                      p(
                        "div",
                        {
                          class:
                            "border-b-2 border-blue-main transition-all duration-500 ease-in-out",
                          style: _t(`width: ${r.state.completionProgress}%`),
                        },
                        null,
                        4
                      ),
                      p(
                        "div",
                        {
                          class:
                            "border-b-2 border-gray-200 transition-all duration-500 ease-in-out",
                          style: _t(
                            `width: ${100 - r.state.completionProgress}%`
                          ),
                        },
                        null,
                        4
                      ),
                    ],
                    2
                  ),
                ],
                2
              ),
              p("div", Jv, [
                p("div", Xv, [
                  p(
                    "div",
                    {
                      class: D(
                        `py-4 flex flex-col px-3 sm:px-0 justify-center ${r.CustomCss.QuestionCard}`
                      ),
                    },
                    [
                      p("div", e1, [
                        (O(!0),
                        B(
                          Te,
                          null,
                          Ss(
                            r.state.preferredLanguagesText,
                            (c) => (
                              O(),
                              B(
                                "h1",
                                {
                                  key: c,
                                  class: D(
                                    `mt-2 text-xl font-semibold ${r.CustomCss.QuestionText}`
                                  ),
                                },
                                te(c),
                                3
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                      p("div", t1, [
                        (O(!0),
                        B(
                          Te,
                          null,
                          Ss(
                            n.studyLanguages,
                            (c, u) => (
                              O(),
                              B(
                                "div",
                                { key: c.languageCode, class: "mt-2 w-full" },
                                [
                                  p(
                                    "div",
                                    {
                                      tabindex: u + 2,
                                      role: "button",
                                      class: D(
                                        `${[
                                          r.isLanguageCodeSelected(
                                            c.languageCode
                                          )
                                            ? "hover:border-light-gray-medium border-white"
                                            : "hover:border-blue-main",
                                        ]} choice-option w-full mt-2 border border-gray-medium flex items-center rounded cursor-pointer buttonfocus ${
                                          r.CustomCss.Choice
                                        } ${r.CustomCss.ChoiceHover}`
                                      ),
                                      onClick: () =>
                                        r.selectLanguage(c.languageCode),
                                      onKeyup: Es(
                                        () => r.selectLanguage(c.languageCode),
                                        ["space"]
                                      ),
                                    },
                                    [
                                      p(
                                        "div",
                                        {
                                          class: D(
                                            `border-r w-24 text-gray-medium flex self-stretch items-center ${r.CustomCss.Choice} ${r.CustomCss.ChoiceHover}`
                                          ),
                                        },
                                        [
                                          p(
                                            "div",
                                            {
                                              class: D([
                                                "w-full h-full flex items-center text-center justify-center p-4",
                                                `${[
                                                  r.isLanguageCodeSelected(
                                                    c.languageCode
                                                  )
                                                    ? `bg-blue-main text-white ${r.CustomCss.SelectedChoice}`
                                                    : "",
                                                ]}`,
                                              ]),
                                            },
                                            [
                                              p(
                                                "div",
                                                null,
                                                te(c.languageCode),
                                                1
                                              ),
                                            ],
                                            2
                                          ),
                                        ],
                                        2
                                      ),
                                      p(
                                        "div",
                                        {
                                          class: D(
                                            `flex self-stretch items-center text-left w-full ${r.CustomCss.Choice} ${r.CustomCss.ChoiceHover}`
                                          ),
                                        },
                                        [
                                          p(
                                            "div",
                                            {
                                              class: D(`${[
                                                r.isLanguageCodeSelected(
                                                  c.languageCode
                                                )
                                                  ? `bg-blue-main text-white ${r.CustomCss.SelectedChoice}`
                                                  : "",
                                              ]} w-full p-4
                          ${r.SelectorClasses.LanguageOption} ${
                                                r.SelectorClasses.LanguageOption
                                              }-${c.languageCode} ${
                                                r.EventStreamerClasses
                                                  .ChoiceText
                                              }`),
                                            },
                                            te(c.displayName),
                                            3
                                          ),
                                        ],
                                        2
                                      ),
                                    ],
                                    42,
                                    n1
                                  ),
                                ]
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                    ],
                    2
                  ),
                  p("div", r1, [
                    p("div", s1, [
                      p(
                        "button",
                        {
                          class:
                            D(`buttonfocus tracking-wide rounded px-3 py-2 text-base border border-blue-main bg-blue-main shadow-button-blue text-white
                                    active:bg-blue-main-dark hover:shadow-none ${
                                      r.CustomCss.NextButton
                                    } ${r.CustomCss.HoverNextButton} ${
                              !r.state.hasSelectedLanguage || n.transitioning
                                ? "opacity-50 cursor-not-allowed"
                                : "next-button"
                            }`),
                          disabled:
                            !r.state.hasSelectedLanguage || n.transitioning,
                          onClick: e[0] || (e[0] = () => r.clickNext()),
                          onKeyup:
                            e[1] || (e[1] = Es(() => r.clickNext(), ["space"])),
                          type: "button",
                        },
                        [
                          p(
                            "div",
                            {
                              class: D(
                                `${
                                  n.transitioning ? "flex items-baseline" : ""
                                }`
                              ),
                            },
                            [
                              n.transitioning
                                ? (O(),
                                  Ce(a, {
                                    key: 0,
                                    icon: ["fas", "circle-notch"],
                                    class: "mr-2",
                                    spin: "",
                                  }))
                                : X("", !0),
                              p(
                                "div",
                                {
                                  class: D(
                                    `flex items-center ${r.SelectorClasses.Start}`
                                  ),
                                },
                                [
                                  rt(
                                    te(
                                      r.LanguageTextService.getValueLanguage(
                                        n.selectedLanguageCode,
                                        "Start"
                                      )
                                    ) + " ",
                                    1
                                  ),
                                  ve(a, {
                                    icon: ["far", "arrow-right"],
                                    size: "xs",
                                    class: "ml-2",
                                  }),
                                ],
                                2
                              ),
                            ],
                            2
                          ),
                        ],
                        42,
                        i1
                      ),
                    ]),
                    n.hideTimer
                      ? X("", !0)
                      : (O(),
                        Ce(
                          l,
                          {
                            key: 0,
                            remainingSeconds: n.remainingSeconds,
                            "language-code": n.selectedLanguageCode,
                          },
                          null,
                          8,
                          ["remainingSeconds", "language-code"]
                        )),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ],
        2
      )
    );
  }
  const o1 = An(Wv, [["render", a1]]);
  var ns,
    l1 = new Uint8Array(16);
  function c1() {
    if (
      !ns &&
      ((ns =
        (typeof crypto < "u" &&
          crypto.getRandomValues &&
          crypto.getRandomValues.bind(crypto)) ||
        (typeof msCrypto < "u" &&
          typeof msCrypto.getRandomValues == "function" &&
          msCrypto.getRandomValues.bind(msCrypto))),
      !ns)
    )
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    return ns(l1);
  }
  const u1 =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function f1(t) {
    return typeof t == "string" && u1.test(t);
  }
  var _e = [];
  for (var _i = 0; _i < 256; ++_i) _e.push((_i + 256).toString(16).substr(1));
  function d1(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      n = (
        _e[t[e + 0]] +
        _e[t[e + 1]] +
        _e[t[e + 2]] +
        _e[t[e + 3]] +
        "-" +
        _e[t[e + 4]] +
        _e[t[e + 5]] +
        "-" +
        _e[t[e + 6]] +
        _e[t[e + 7]] +
        "-" +
        _e[t[e + 8]] +
        _e[t[e + 9]] +
        "-" +
        _e[t[e + 10]] +
        _e[t[e + 11]] +
        _e[t[e + 12]] +
        _e[t[e + 13]] +
        _e[t[e + 14]] +
        _e[t[e + 15]]
      ).toLowerCase();
    if (!f1(n)) throw TypeError("Stringified UUID is invalid");
    return n;
  }
  function h1(t, e, n) {
    t = t || {};
    var r = t.random || (t.rng || c1)();
    return (r[6] = (r[6] & 15) | 64), (r[8] = (r[8] & 63) | 128), d1(r);
  }
  const St = Ib.ApiUrl,
    m1 = {
      components: {
        DisplayQuestion: Bb,
        LoadingSkeletonQuestionFull: nv,
        TimerClock: hf,
        NotFound: Av,
        LanguageSelector: o1,
        ApplicationError: Uv,
      },
      setup(t, e) {
        const n = Yn({
          remainingSeconds: 0,
          buttonAlreadyClicked: !1,
          totalQuestions: 5,
          currentQuestionNumber: 1,
          question: null,
          answer: {
            questionId: "",
            startTime: "",
            endTime: "",
            questionType: 0,
            selectedChoiceIds: [],
            answerText: null,
          },
          instructions: null,
          selectedChoices: [],
          hasError: !1,
          hasApplicationError: !1,
          customCssDisplay: null,
          calledCssEndpoint: !1,
          assignmentId: null,
          ignoreEvents: !1,
          waitingForSecurityCheckHandler: null,
          transitioning: !1,
          errorMessage: null,
          applicationErrorMessage:
            "An error has occured. Please try reloading your page and try again.",
          hideReloadOnErrorPage: !1,
          showStoppedProjectPage: !1,
          requiredEndTime: null,
          finished: !1,
          hideTimer: !1,
          studyId: "",
          hasInstructions: le(() => n.getInstructions && !n.transitioning),
          getInstructions: le(() => n.instructions ?? null),
          displayElement: le(() => n.question || n.instructions),
          isNextButtonDisabled: le(
            () =>
              !n.hasInstructions &&
              ((n.selectLanguage && !n.selectedLanguageCode) ||
                n.buttonAlreadyClicked ||
                n.noAnswerGiven)
          ),
          hasSelectedChoices: le(
            () => n.selectedChoices !== null && n.selectedChoices.length > 0
          ),
          noAnswerGiven: le(() => {
            var K;
            if (!n.question) return !1;
            if (
              ln.shouldHaveChoices(n.question.questionType) &&
              !n.hasSelectedChoices
            )
              return !0;
            const M =
              ((K = n.answer.answerText) == null ? void 0 : K.trim()) ?? null;
            return !!(ln.shouldHaveAnswerText(n.question.questionType) && !M);
          }),
          showEnterText: le(
            () =>
              !n.isNextButtonDisabled &&
              !n.hasInstructions &&
              n.question &&
              ln.shouldHaveChoices(n.question.questionType)
          ),
          selectLanguage: !1,
          selectedLanguageCode: null,
          studyLanguages: null,
          waitForSecurityCheck: !1,
          showTestModeMessage: !1,
          enableNewUI: !1,
          initialLoad: !0,
          countryCode: null,
        });
        window.CloudReseach_Sentry_isTransitioning = Zd(n, "transitioning");
        let r = window.location.href,
          s = r.toLowerCase(),
          i = new URL(r).searchParams,
          a = !0;
        const l = "/entry/";
        eu(async () => {
          if (!s.includes(l)) {
            n.hasError = !0;
            return;
          }
          let M = s.substring(r.indexOf(l) + l.length, r.indexOf("?")),
            K,
            we = 1;
          try {
            (K = localStorage.getItem("sentryToken")),
              K ||
                ((K = h1()), (we = 0), localStorage.setItem("sentryToken", K));
          } catch {}
          let Ie = u(),
            ie = await c();
          await fetch(`${St}/api/assignments/entry`, {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              studyId: M,
              currentUrl: r,
              token: K,
              tokenType: we,
              accessToken: Ie,
              deviceType: ie,
            }),
          })
            .then(async (j) => {
              if (j.status === 404) throw await j.json();
              return await j.json();
            })
            .then(async (j) => {
              var Q, lt, Xt, ct;
              if (a && j.frontendVerisoulSettings) {
                a = !1;
                try {
                  window.sentryLoadVerisoul({
                    projectId: j.frontendVerisoulSettings.projectId,
                    path: "prod",
                  });
                } catch (Re) {
                  console.error("Could not load verisoul", Re);
                }
              }
              (a = !1),
                (n.question = j.question),
                (n.totalQuestions = j.questionsToAskCount),
                (n.currentQuestionNumber = j.currentQuestion),
                (n.assignmentId = j.assignmentId),
                (n.ignoreEvents = j.ie),
                (n.instructions = j.instructions),
                (n.requiredEndTime = j.endTimeNeededToCompleteScreener),
                (n.hideTimer = j.hideTimer),
                (n.studyId = j.studyId),
                (n.showTestModeMessage = j.showTestModeMessage),
                (n.countryCode = j.countryCode),
                j.language &&
                  (mn.setLanguage(j.language),
                  (n.selectedLanguageCode = j.language)),
                q(j, n.remainingSeconds),
                j.pf &&
                  f(j).then(() => {
                    g();
                  });
              {
                const Re = V.fromISO(j.endTimeNeededToCompleteScreener, {
                  zone: "utc",
                });
                let Vr = me.fromDateTimes(V.utc(), Re).length("milliseconds");
                await nn.initializeListeners({
                  apiUrl: `${St}/entryHub`,
                  timeout: Vr,
                  studyId: M,
                  translationApiUrl: `${St}/api/assignments/detectEvent`,
                  ignoreScreenRecording: n.ignoreEvents,
                }),
                  nn.updateInformation({
                    assignmentId: n.assignmentId,
                    questionId:
                      (Q = n.question) == null ? void 0 : Q.questionId,
                    questionText:
                      (lt = n.question) == null ? void 0 : lt.prompt,
                    choices:
                      ((ct = (Xt = n.question) == null ? void 0 : Xt.choices) ==
                      null
                        ? void 0
                        : ct.map((Ur) => ({
                            choiceId: Ur.choiceId,
                            text: Ur.text,
                          }))) ?? [],
                  });
              }
              y(), await F(j), nn.setLoading(!1);
            })
            .catch((j) => {
              console.error(j),
                (n.hasError = !0),
                (n.errorMessage = j.errorMessage),
                (n.showStoppedProjectPage = j.showStoppedProjectPage);
            })
            .finally(() => {
              n.initialLoad = !1;
            });
        });
        async function c() {
          try {
            return await CloudResearch_Utils.UtilFunctions.getDeviceData();
          } catch (M) {
            return console.error(M), null;
          }
        }
        function u() {
          try {
            return localStorage.getItem("oidc_user");
          } catch {}
          return null;
        }
        async function f(M) {
          if (M.hi) return;
          const K = await ue();
          await fetch(`${St}/api/assignments/updateInformation`, {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assignmentId: M.assignmentId, fd: K }),
          });
        }
        const m = le(() =>
          n.selectLanguage
            ? 0
            : n.totalQuestions <= 0
            ? 100
            : (n.currentQuestionNumber / n.totalQuestions) * 100
        );
        async function g() {
          try {
            const M = new Gv();
            M.onmessage = async (K) => {
              const we = document.createElement("img"),
                Ie =
                  await CloudResearch_Utils.UtilFunctions.getAdditionalDeviceInfo();
              let ie = null;
              Ie &&
                ((ie = btoa(Ie)),
                await fetch(
                  `${St}/api/assignments/updateEntry?${i.toString()}`,
                  {
                    mode: "cors",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      assignmentId: n.assignmentId,
                      heartbeatString: ie,
                    }),
                  }
                ).then((j) => j.json()));
            };
          } catch (M) {
            console.error(M);
          }
        }
        async function y() {
          try {
            const M = i.get(Ei.ProviderId),
              K = await fetch(
                `${St}/api/provider/customDisplayInfo?${Ei.ProviderId}=${M}
                  &${Ei.StudyId}=${n.studyId}`,
                {
                  mode: "cors",
                  headers: { "Content-Type": "application/json" },
                }
              ).then((we) => we.json());
            (n.customCssDisplay = K),
              K && K.providerCss && wy.addCss(K.providerCss),
              (n.enableNewUI = K.enableNewUI);
          } catch (M) {
            console.error(M);
          } finally {
            n.calledCssEndpoint = !0;
          }
        }
        async function E() {
          if (!n.isNextButtonDisabled && !n.transitioning) {
            (n.transitioning = !0), (n.buttonAlreadyClicked = !0);
            const M = await N();
            nn.setLoading(!0);
            let K = u();
            try {
              const we = await fetch(`${St}/api/assignments/processAnswer`, {
                mode: "cors",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  answer: M,
                  isInstructions: n.instructions != null,
                  selectedLanguageCode: n.selectedLanguageCode,
                  accessToken: K,
                }),
              });
              we.ok ? await F(await we.json()) : (n.hasApplicationError = !0);
            } catch (we) {
              console.error(we), (n.hasApplicationError = !0);
            }
            nn.setLoading(!1);
          }
        }
        const v = le(() => n.currentQuestionNumber == n.totalQuestions);
        async function N() {
          var we;
          if (n.instructions) return { assignmentId: n.assignmentId };
          if (n.selectLanguage) return { assignmentId: n.assignmentId };
          const M = `question/${
              (we = n.question) == null ? void 0 : we.questionType
            }`,
            K = k();
          if (
            ((K.selectedChoiceIds = n.selectedChoices.map((Ie) => Ie.choiceId)),
            (K.assignmentId = n.assignmentId),
            v.value)
          )
            try {
              const Ie = await vy.execute(
                "6LeD1eAUAAAAAO1XfZdwJrlN4EB71kM3JmgT-tte",
                M
              );
              K.recaptchaToken = Ie;
            } catch (Ie) {
              console.log(`Exception while processing recaptcha.
 Exception ${Ie}`);
            }
          return K;
        }
        function S() {
          (n.selectedChoices = []),
            (n.buttonAlreadyClicked = !1),
            (n.answer.answerText = null),
            (n.answer.selectedChoiceIds = []),
            (n.selectLanguage = !1);
        }
        function k() {
          var M = n.question;
          if (ln.shouldHaveChoices(M.questionType)) {
            if (n.selectedChoices == null || n.selectedChoices.length == 0)
              return null;
            n.selectedChoices.forEach((K) => {
              n.answer.selectedChoiceIds.push(K.ChoiceId);
            });
          }
          return (
            (n.answer.questionId = M.questionId),
            (n.answer.endTime = V.utc().toISO()),
            (n.answer.questionType = M.questionType),
            n.answer
          );
        }
        async function F(M, K = !0) {
          var we, Ie, ie, j;
          if (
            (S(),
            (n.instructions = null),
            M.language && mn.setLanguage(M.language),
            M.nextAction === Ft.WaitForInformation)
          )
            (n.waitForSecurityCheck = !0),
              (n.waitingForSecurityCheckHandler = setTimeout(async () => {
                await Ee();
              }, 1e3));
          else if (M.nextAction === Ft.ShowInstructions)
            (n.instructions = M.instructions),
              (n.question = {}),
              (n.transitioning = !1);
          else if (M.showStoppedProjectPage)
            (n.hasError = !0),
              (n.errorMessage = M.message),
              (n.showStoppedProjectPage = !0);
          else if (M.nextAction == Ft.ShowMessage)
            (n.hasError = !0), (n.errorMessage = M.message);
          else if (M.nextAction === Ft.SelectLanguage)
            (n.studyLanguages = M.studyLanguages), (n.selectLanguage = !0);
          else if (M.nextAction === Ft.AskQuestion)
            (n.question = M.question),
              (n.currentQuestionNumber = M.currentQuestion),
              (n.totalQuestions = M.questionsToAskCount),
              (n.selectedLanguageCode = M.language),
              (n.transitioning = !1),
              (n.answer.startTime = V.utc().toISO());
          else if (M.nextAction === Ft.Terminate && M.terminationLink == null)
            (n.applicationErrorMessage =
              "There has been an error while attempting to redirect you. (Error code #6)"),
              (n.hideReloadOnErrorPage = !0),
              (n.hasApplicationError = !0);
          else if (
            M.nextAction === Ft.RouteToClientLink ||
            M.nextAction === Ft.Terminate
          ) {
            (n.finished = !0),
              nn.setFinished(!0),
              M.shouldGetSmartSignals && (await Z());
            const Q = M.clientLink ?? M.terminationLink;
            window.location = Q;
          }
          try {
            nn.updateInformation({
              assignmentId: n.assignmentId,
              questionId: (we = n.question) == null ? void 0 : we.questionId,
              questionText: (Ie = n.question) == null ? void 0 : Ie.prompt,
              choices:
                ((j = (ie = n.question) == null ? void 0 : ie.choices) == null
                  ? void 0
                  : j.map((Q) => ({ choiceId: Q.choiceId, text: Q.text }))) ??
                [],
            });
          } catch (Q) {
            console.error(Q);
          }
        }
        async function Z() {
          try {
            const M = await Ty.identifyUser({
              assignmentId: n.assignmentId,
              projectId: n.studyId,
              countryCode: n.countryCode,
            });
            M &&
              (await (
                await fetch(
                  `${St}/api/assignments/${n.assignmentId}/smartSignals`,
                  {
                    mode: "cors",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ deviceInformation: M }),
                  }
                )
              ).text());
          } catch (M) {
            console.error(M);
          }
        }
        function Y(M) {
          n.selectedChoices = M;
        }
        function q(M, K) {
          try {
            const we = V.utc(),
              Ie = V.fromISO(M.endTimeNeededToCompleteScreener, {
                zone: "utc",
              });
            let ie = me.fromDateTimes(we, Ie).length("seconds");
            if (!ie || ie <= 0) ie = 0;
            else {
              const j = setInterval(() => {
                n.remainingSeconds--,
                  n.remainingSeconds <= 0 &&
                    ((n.remainingSeconds = 0), clearInterval(j));
              }, 1e3);
            }
            n.remainingSeconds = ie;
          } catch {}
        }
        async function ue() {
          try {
            return await CloudResearch_Utils.UtilFunctions.getFingerprintDataEncoded();
          } catch (M) {
            return console.error(M), null;
          }
        }
        async function Ee() {
          try {
            await rr();
          } catch (M) {
            console.error(M),
              (n.hasApplicationError = !0),
              setTimeout(async () => {
                await Ee();
              }, 1e3);
          }
        }
        async function rr() {
          const M = await fetch(`${St}/api/assignments/processInfo`, {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assignmentId: n.assignmentId }),
          }).then((K) => K.json());
          await F(M);
        }
        const vt = le(() => {
            if (!n.question) return !1;
            ln.shouldHaveChoices(n.question.questionType);
          }),
          Jt = le(() => {
            var M, K;
            return n.calledCssEndpoint
              ? (M = n.customCssDisplay) != null && M.logoUrl
                ? n.customCssDisplay.logoUrl
                : (K = n.customCssDisplay) != null &&
                  K.hideCloudResearchBranding
                ? null
                : Zv
              : null;
          });
        return {
          state: n,
          gradeQuestionWrapper: E,
          completionProgress: m,
          updateSelectedChoices: Y,
          LanguageTextService: mn,
          logoUrl: Jt,
          shouldHaveChoices: vt,
          CustomCss: Mr,
          EventStreamerClasses: co,
          SelectorClasses: tr,
        };
      },
    },
    g1 = { role: "main", id: "sentry", class: "flex flex-col h-screen" },
    p1 = { key: 0, class: "flex items-center w-full md:w-1/2 mx-auto" },
    y1 = p(
      "a",
      { class: "skip-main", href: "#mainContent", tabindex: "1" },
      "Skip To Main Content",
      -1
    ),
    b1 = { key: 0, class: "text-blue-main mb-2" },
    v1 = p(
      "div",
      {
        class:
          "w-full p-4 bg-blue-main text-white flex items-center justify-between",
      },
      [
        p(
          "div",
          { class: "flex-grow text-center" },
          " You are in TestMode. Question selection is limited. "
        ),
      ],
      -1
    ),
    w1 = [v1],
    S1 = {
      key: 1,
      class:
        "h-full flex items-center justify-center text-blue-main text-3xl font-bold",
    },
    T1 = {
      key: 2,
      class: "w-full justify-center flex flex-col overflow-x-hidden grow",
      style: { "flex-grow": "1" },
    },
    x1 = { class: "w-full flex" },
    I1 = ["src"],
    C1 = { key: 0 },
    E1 = { key: 1 },
    _1 = {
      key: 0,
      class: D("py-4 flex flex-col w-full sm:w-1/2 px-3 sm:px-0"),
    },
    k1 = { key: 0, class: "text-xl font-semibold mb-8" },
    O1 = ["innerHTML"],
    A1 = { class: "question-count font-semibold" },
    M1 = { class: "w-full" },
    L1 = { class: "mt-2 sm:mt-6 sm:flex items-center justify-between w-full" },
    N1 = { class: "flex items-center", style: { "animation-delay": "0.5s" } },
    P1 = ["disabled"],
    D1 = { class: "flex items-center" },
    F1 = {
      key: 1,
      class:
        "mt-12 h-full flex items-center justify-center text-blue-main text-3xl font-bold",
    },
    R1 = ["innerHTML"],
    j1 = { class: "md:m-auto text-gray-medium text-sm" },
    B1 = p("sup", null, "®", -1),
    z1 = p("sup", null, "®", -1);
  function H1(t, e, n, r, s, i) {
    var y, E;
    const a = Ue("LoadingSkeletonQuestionFull"),
      l = Ue("NotFound"),
      c = Ue("ApplicationError"),
      u = Ue("LanguageSelector"),
      f = Ue("font-awesome-icon"),
      m = Ue("DisplayQuestion"),
      g = Ue("TimerClock");
    return (
      O(),
      B("div", g1, [
        r.state.initialLoad
          ? (O(),
            B("div", p1, [
              ve(
                a,
                {
                  "show-button-skeleton": !1,
                  "wrapper-classes": "justify-center",
                  "height-classes": "flex-grow",
                  "wrapper-styles": "min-height: 400px;",
                  width: "w-full",
                  "more-lines": !0,
                  visible: r.state.initialLoad,
                },
                null,
                8,
                ["visible"]
              ),
            ]))
          : (O(),
            B(
              Te,
              { key: 1 },
              [
                y1,
                r.state.showTestModeMessage
                  ? (O(), B("div", b1, w1))
                  : X("", !0),
                r.state.hasError
                  ? (O(),
                    Ce(
                      l,
                      {
                        key: 1,
                        title: "Not Found",
                        "error-message": r.state.errorMessage,
                        isProjectStopped: r.state.showStoppedProjectPage,
                      },
                      null,
                      8,
                      ["error-message", "isProjectStopped"]
                    ))
                  : r.state.hasApplicationError
                  ? (O(),
                    Ce(
                      c,
                      {
                        key: 2,
                        title: "Application Error",
                        "error-message": r.state.applicationErrorMessage,
                        "hide-refresh-button": r.state.hideReloadOnErrorPage,
                      },
                      null,
                      8,
                      ["error-message", "hide-refresh-button"]
                    ))
                  : r.state.calledCssEndpoint
                  ? (O(),
                    B(
                      Te,
                      { key: 3 },
                      [
                        r.state.selectLanguage
                          ? (O(),
                            Ce(
                              u,
                              {
                                key: 0,
                                onClickNext: r.gradeQuestionWrapper,
                                transitioning: r.state.transitioning,
                                logoUrl: r.logoUrl,
                                remainingSeconds: r.state.remainingSeconds,
                                hideTimer: r.state.hideTimer,
                                studyLanguages: r.state.studyLanguages,
                                "selected-language-code":
                                  r.state.selectedLanguageCode,
                                "onUpdate:selectedLanguageCode":
                                  e[0] ||
                                  (e[0] = (v) =>
                                    (r.state.selectedLanguageCode = v)),
                                enableNewUI: r.state.enableNewUI,
                              },
                              null,
                              8,
                              [
                                "onClickNext",
                                "transitioning",
                                "logoUrl",
                                "remainingSeconds",
                                "hideTimer",
                                "studyLanguages",
                                "selected-language-code",
                                "enableNewUI",
                              ]
                            ))
                          : r.state.waitForSecurityCheck
                          ? (O(),
                            B("div", S1, [
                              ve(f, {
                                icon: ["fas", "circle-notch"],
                                class: "mr-2",
                                spin: "",
                              }),
                              rt(
                                " " +
                                  te(
                                    r.LanguageTextService.getValue(
                                      "Redirecting"
                                    )
                                  ) +
                                  "... ",
                                1
                              ),
                            ]))
                          : r.state.displayElement
                          ? (O(),
                            B("div", T1, [
                              p(
                                "div",
                                {
                                  class: D(
                                    `py-4 w-full sm:w-1/2 px-3 sm:px-0 mt-2 mx-auto ${r.CustomCss.QuestionCardTopBar}`
                                  ),
                                  role: "banner",
                                },
                                [
                                  p("div", x1, [
                                    r.logoUrl
                                      ? (O(),
                                        B(
                                          "img",
                                          {
                                            key: 0,
                                            alt: "CloudResearch",
                                            src: r.logoUrl,
                                            class: D(
                                              `h-12 object-cover ${r.CustomCss.Logo}`
                                            ),
                                          },
                                          null,
                                          10,
                                          I1
                                        ))
                                      : X("", !0),
                                    r.state.enableNewUI
                                      ? (O(),
                                        B(
                                          "span",
                                          {
                                            key: 1,
                                            class: D(
                                              `ml-auto ${r.CustomCss.HeaderText}`
                                            ),
                                          },
                                          [
                                            r.state.hasInstructions
                                              ? (O(),
                                                B("span", C1, "Instructions"))
                                              : (O(),
                                                B(
                                                  "span",
                                                  E1,
                                                  te(
                                                    r.LanguageTextService.getValue(
                                                      "Question"
                                                    )
                                                  ) +
                                                    " " +
                                                    te(
                                                      r.state
                                                        .currentQuestionNumber
                                                    ) +
                                                    " " +
                                                    te(
                                                      r.LanguageTextService.getValue(
                                                        "of"
                                                      )
                                                    ) +
                                                    " " +
                                                    te(r.state.totalQuestions),
                                                  1
                                                )),
                                          ],
                                          2
                                        ))
                                      : X("", !0),
                                  ]),
                                ],
                                2
                              ),
                              p(
                                "div",
                                { class: D(`flex ${r.CustomCss.ProgressBar}`) },
                                [
                                  p(
                                    "div",
                                    {
                                      class:
                                        "border-b-2 border-blue-main transition-all duration-500 ease-in-out",
                                      style: _t(
                                        `width: ${r.completionProgress}%`
                                      ),
                                    },
                                    null,
                                    4
                                  ),
                                  p(
                                    "div",
                                    {
                                      class:
                                        "border-b-2 border-gray-200 transition-all duration-500 ease-in-out",
                                      style: _t(
                                        `width: ${100 - r.completionProgress}%`
                                      ),
                                    },
                                    null,
                                    4
                                  ),
                                ],
                                2
                              ),
                              p(
                                "div",
                                {
                                  class: D(
                                    `${
                                      r.state.hasInstructions
                                        ? "instructions-card"
                                        : `question-card ${r.CustomCss.QuestionContainer}`
                                    } flex grow justify-center focus:outline-none`
                                  ),
                                  id: "mainContent",
                                  tabindex: "-1",
                                  style: { "flex-grow": "1" },
                                },
                                [
                                  r.state.finished
                                    ? r.state.finished
                                      ? (O(),
                                        B(
                                          "div",
                                          F1,
                                          te(
                                            r.LanguageTextService.getValue(
                                              "Redirecting"
                                            )
                                          ) + "... ",
                                          1
                                        ))
                                      : X("", !0)
                                    : (O(),
                                      B("div", _1, [
                                        r.state.hasInstructions
                                          ? (O(),
                                            B(
                                              "div",
                                              {
                                                key: 0,
                                                class: D(
                                                  `pt-8 flex flex-col ${r.CustomCss.QuestionCard}`
                                                ),
                                              },
                                              [
                                                r.state.enableNewUI
                                                  ? X("", !0)
                                                  : (O(),
                                                    B(
                                                      "h1",
                                                      k1,
                                                      te(
                                                        r.LanguageTextService.getValue(
                                                          "Instructions"
                                                        )
                                                      ),
                                                      1
                                                    )),
                                                p(
                                                  "div",
                                                  {
                                                    class: D(
                                                      `ql-editor ql-display ${r.SelectorClasses.Instruction} ${r.CustomCss.QuestionText}`
                                                    ),
                                                    style: { padding: "0" },
                                                    innerHTML:
                                                      r.state.getInstructions,
                                                  },
                                                  null,
                                                  10,
                                                  O1
                                                ),
                                              ],
                                              2
                                            ))
                                          : r.state.question &&
                                            !r.state.transitioning
                                          ? (O(),
                                            B(
                                              "div",
                                              {
                                                key: 1,
                                                class: D(
                                                  `w-full ${r.CustomCss.QuestionCard}`
                                                ),
                                              },
                                              [
                                                p("div", A1, [
                                                  p(
                                                    "div",
                                                    {
                                                      class: D(
                                                        `flex justify-between ${r.CustomCss.HeaderText} ${r.SelectorClasses.QuestionCountText}`
                                                      ),
                                                    },
                                                    [
                                                      p(
                                                        "span",
                                                        {
                                                          class: D(
                                                            `${r.CustomCss.QuestionCount}`
                                                          ),
                                                        },
                                                        te(
                                                          r.LanguageTextService.getValue(
                                                            "Question"
                                                          )
                                                        ) +
                                                          " " +
                                                          te(
                                                            r.state
                                                              .currentQuestionNumber
                                                          ) +
                                                          " " +
                                                          te(
                                                            r.LanguageTextService.getValue(
                                                              "of"
                                                            )
                                                          ) +
                                                          " " +
                                                          te(
                                                            r.state
                                                              .totalQuestions
                                                          ),
                                                        3
                                                      ),
                                                    ],
                                                    2
                                                  ),
                                                ]),
                                                p("div", M1, [
                                                  ve(
                                                    m,
                                                    {
                                                      question:
                                                        r.state.question,
                                                      currentLanguage:
                                                        r.state
                                                          .selectedLanguageCode,
                                                      onEnterKey:
                                                        r.gradeQuestionWrapper,
                                                      "selected-choices":
                                                        r.state.selectedChoices,
                                                      "onUpdate:selectedChoices":
                                                        e[1] ||
                                                        (e[1] = (v) =>
                                                          (r.state.selectedChoices =
                                                            v)),
                                                      answer:
                                                        r.state.answer
                                                          .answerText,
                                                      "onUpdate:answer":
                                                        e[2] ||
                                                        (e[2] = (v) =>
                                                          (r.state.answer.answerText =
                                                            v)),
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      "question",
                                                      "currentLanguage",
                                                      "onEnterKey",
                                                      "selected-choices",
                                                      "answer",
                                                    ]
                                                  ),
                                                ]),
                                              ],
                                              2
                                            ))
                                          : X("", !0),
                                        os(
                                          p(
                                            "div",
                                            null,
                                            [
                                              ve(
                                                a,
                                                {
                                                  "show-button-skeleton": !1,
                                                  "wrapper-classes":
                                                    "justify-start",
                                                  "height-classes": "flex-grow",
                                                  "wrapper-styles":
                                                    "min-height: 400px;",
                                                  width: "w-full",
                                                  "more-lines": !0,
                                                  visible:
                                                    r.state.transitioning,
                                                },
                                                null,
                                                8,
                                                ["visible"]
                                              ),
                                            ],
                                            512
                                          ),
                                          [[di, r.state.transitioning]]
                                        ),
                                        os(
                                          p(
                                            "div",
                                            L1,
                                            [
                                              p("div", N1, [
                                                p(
                                                  "button",
                                                  {
                                                    tabindex: "100",
                                                    class: D(
                                                      `buttonfocus tracking-wide rounded px-3 py-2 text-base border border-blue-main bg-blue-main shadow-button-blue text-white active:bg-blue-main-dark hover:shadow-none ${
                                                        r.CustomCss.NextButton
                                                      } ${
                                                        r.CustomCss
                                                          .HoverNextButton
                                                      } ${
                                                        r.SelectorClasses.Next
                                                      } ${
                                                        r.state
                                                          .isNextButtonDisabled
                                                          ? "opacity-50 cursor-not-allowed"
                                                          : "next-button"
                                                      }`
                                                    ),
                                                    disabled:
                                                      r.state
                                                        .isNextButtonDisabled,
                                                    onClick:
                                                      e[3] ||
                                                      (e[3] = (...v) =>
                                                        r.gradeQuestionWrapper &&
                                                        r.gradeQuestionWrapper(
                                                          ...v
                                                        )),
                                                    onKeyup:
                                                      e[4] ||
                                                      (e[4] = Es(
                                                        (...v) =>
                                                          r.gradeQuestionWrapper &&
                                                          r.gradeQuestionWrapper(
                                                            ...v
                                                          ),
                                                        ["space"]
                                                      )),
                                                    type: "button",
                                                  },
                                                  [
                                                    p(
                                                      "div",
                                                      {
                                                        class: D(
                                                          `${
                                                            r.state
                                                              .transitioning
                                                              ? "flex items-center"
                                                              : ""
                                                          }`
                                                        ),
                                                      },
                                                      [
                                                        r.state.transitioning
                                                          ? (O(),
                                                            Ce(f, {
                                                              key: 0,
                                                              icon: [
                                                                "fas",
                                                                "circle-notch",
                                                              ],
                                                              class: "mr-2",
                                                              spin: "",
                                                            }))
                                                          : X("", !0),
                                                        p("div", D1, [
                                                          rt(
                                                            te(
                                                              r.LanguageTextService.getValue(
                                                                "Next"
                                                              )
                                                            ) + " ",
                                                            1
                                                          ),
                                                          ve(f, {
                                                            icon: [
                                                              "far",
                                                              "arrow-right",
                                                            ],
                                                            size: "xs",
                                                            class: "ml-2",
                                                          }),
                                                        ]),
                                                      ],
                                                      2
                                                    ),
                                                  ],
                                                  42,
                                                  P1
                                                ),
                                                os(
                                                  p(
                                                    "span",
                                                    {
                                                      class: D(
                                                        `sm:flex text-gray-300 semi-bold ml-4 ${r.CustomCss.InfoText}`
                                                      ),
                                                    },
                                                    [
                                                      rt(
                                                        te(
                                                          r.LanguageTextService.getValue(
                                                            "To continue press"
                                                          )
                                                        ) + " ",
                                                        1
                                                      ),
                                                      p(
                                                        "kbd",
                                                        {
                                                          class: D(
                                                            `keyboard-key ml-1 cursor-pointer hover:bg-gray-700 ${r.CustomCss.EnterButton} ${r.CustomCss.EnterButtonHover}`
                                                          ),
                                                          onClick:
                                                            e[5] ||
                                                            (e[5] = (...v) =>
                                                              r.gradeQuestionWrapper &&
                                                              r.gradeQuestionWrapper(
                                                                ...v
                                                              )),
                                                        },
                                                        "Enter",
                                                        2
                                                      ),
                                                    ],
                                                    2
                                                  ),
                                                  [[di, r.state.showEnterText]]
                                                ),
                                              ]),
                                              r.state.hideTimer
                                                ? X("", !0)
                                                : (O(),
                                                  Ce(
                                                    g,
                                                    {
                                                      key: 0,
                                                      remainingSeconds:
                                                        r.state
                                                          .remainingSeconds,
                                                      languageCode:
                                                        r.state
                                                          .selectedLanguageCode,
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      "remainingSeconds",
                                                      "languageCode",
                                                    ]
                                                  )),
                                            ],
                                            512
                                          ),
                                          [[di, !r.state.finished]]
                                        ),
                                      ])),
                                ],
                                2
                              ),
                            ]))
                          : r.state.question
                          ? X("", !0)
                          : (O(), Ce(a, { key: 3 })),
                      ],
                      64
                    ))
                  : X("", !0),
                (y = r.state.customCssDisplay) != null && y.footerHtml
                  ? (O(),
                    B(
                      "div",
                      {
                        key: 4,
                        innerHTML:
                          (E = r.state.customCssDisplay) == null
                            ? void 0
                            : E.footerHtml,
                      },
                      null,
                      8,
                      R1
                    ))
                  : X("", !0),
                !r.state.initialLoad && r.state.displayElement
                  ? (O(),
                    B(
                      "footer",
                      {
                        key: 5,
                        class: D(
                          `w-full p-5 bg-gray-050 md:sticky md:bottom-0 text-center ${r.CustomCss.Footer}`
                        ),
                      },
                      [
                        p("span", j1, [
                          rt(
                            "© 2021-" +
                              te(new Date().getFullYear()) +
                              " CloudResearch",
                            1
                          ),
                          B1,
                          rt(". Sentry"),
                          z1,
                          rt(
                            " is covered by U.S. Patent No's, 10,572,778, 11,080,656, and 11,227,298."
                          ),
                        ]),
                      ],
                      2
                    ))
                  : X("", !0),
              ],
              64
            )),
      ])
    );
  }
  const V1 = An(m1, [["render", H1]]),
    $l = () => {};
  let uo = {},
    gf = {},
    pf = null,
    yf = { mark: $l, measure: $l };
  try {
    typeof window < "u" && (uo = window),
      typeof document < "u" && (gf = document),
      typeof MutationObserver < "u" && (pf = MutationObserver),
      typeof performance < "u" && (yf = performance);
  } catch {}
  const { userAgent: Kl = "" } = uo.navigator || {},
    Kt = uo,
    he = gf,
    Yl = pf,
    rs = yf;
  Kt.document;
  const Nt =
      !!he.documentElement &&
      !!he.head &&
      typeof he.addEventListener == "function" &&
      typeof he.createElement == "function",
    bf = ~Kl.indexOf("MSIE") || ~Kl.indexOf("Trident/");
  var ge = "classic",
    vf = "duotone",
    Ge = "sharp",
    We = "sharp-duotone",
    U1 = [ge, vf, Ge, We],
    Z1 = {
      classic: {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat",
      },
      sharp: { 900: "fass", 400: "fasr", 300: "fasl", 100: "fast" },
      "sharp-duotone": { 900: "fasds" },
    },
    Ql = {
      kit: { fak: "kit", "fa-kit": "kit" },
      "kit-duotone": { fakd: "kit-duotone", "fa-kit-duotone": "kit-duotone" },
    },
    G1 = ["kit"],
    W1 = /fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,
    q1 =
      /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,
    $1 = {
      "Font Awesome 5 Free": { 900: "fas", 400: "far" },
      "Font Awesome 5 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
      },
      "Font Awesome 5 Brands": { 400: "fab", normal: "fab" },
      "Font Awesome 5 Duotone": { 900: "fad" },
    },
    K1 = {
      "Font Awesome 6 Free": { 900: "fas", 400: "far" },
      "Font Awesome 6 Pro": {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal",
        100: "fat",
      },
      "Font Awesome 6 Brands": { 400: "fab", normal: "fab" },
      "Font Awesome 6 Duotone": { 900: "fad" },
      "Font Awesome 6 Sharp": {
        900: "fass",
        400: "fasr",
        normal: "fasr",
        300: "fasl",
        100: "fast",
      },
      "Font Awesome 6 Sharp Duotone": { 900: "fasds" },
    },
    Y1 = {
      classic: {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat",
      },
      sharp: {
        "fa-solid": "fass",
        "fa-regular": "fasr",
        "fa-light": "fasl",
        "fa-thin": "fast",
      },
      "sharp-duotone": { "fa-solid": "fasds" },
    },
    Q1 = {
      classic: ["fas", "far", "fal", "fat"],
      sharp: ["fass", "fasr", "fasl", "fast"],
      "sharp-duotone": ["fasds"],
    },
    J1 = {
      classic: {
        fab: "fa-brands",
        fad: "fa-duotone",
        fal: "fa-light",
        far: "fa-regular",
        fas: "fa-solid",
        fat: "fa-thin",
      },
      sharp: {
        fass: "fa-solid",
        fasr: "fa-regular",
        fasl: "fa-light",
        fast: "fa-thin",
      },
      "sharp-duotone": { fasds: "fa-solid" },
    },
    X1 = {
      classic: {
        solid: "fas",
        regular: "far",
        light: "fal",
        thin: "fat",
        duotone: "fad",
        brands: "fab",
      },
      sharp: { solid: "fass", regular: "fasr", light: "fasl", thin: "fast" },
      "sharp-duotone": { solid: "fasds" },
    },
    wf = {
      classic: {
        fa: "solid",
        fas: "solid",
        "fa-solid": "solid",
        far: "regular",
        "fa-regular": "regular",
        fal: "light",
        "fa-light": "light",
        fat: "thin",
        "fa-thin": "thin",
        fad: "duotone",
        "fa-duotone": "duotone",
        fab: "brands",
        "fa-brands": "brands",
      },
      sharp: {
        fa: "solid",
        fass: "solid",
        "fa-solid": "solid",
        fasr: "regular",
        "fa-regular": "regular",
        fasl: "light",
        "fa-light": "light",
        fast: "thin",
        "fa-thin": "thin",
      },
      "sharp-duotone": { fa: "solid", fasds: "solid", "fa-solid": "solid" },
    },
    ew = ["solid", "regular", "light", "thin", "duotone", "brands"],
    Sf = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    tw = Sf.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    gr = {
      GROUP: "duotone-group",
      SWAP_OPACITY: "swap-opacity",
      PRIMARY: "primary",
      SECONDARY: "secondary",
    },
    nw = [
      ...Object.keys(Q1),
      ...ew,
      "2xs",
      "xs",
      "sm",
      "lg",
      "xl",
      "2xl",
      "beat",
      "border",
      "fade",
      "beat-fade",
      "bounce",
      "flip-both",
      "flip-horizontal",
      "flip-vertical",
      "flip",
      "fw",
      "inverse",
      "layers-counter",
      "layers-text",
      "layers",
      "li",
      "pull-left",
      "pull-right",
      "pulse",
      "rotate-180",
      "rotate-270",
      "rotate-90",
      "rotate-by",
      "shake",
      "spin-pulse",
      "spin-reverse",
      "spin",
      "stack-1x",
      "stack-2x",
      "stack",
      "ul",
      gr.GROUP,
      gr.SWAP_OPACITY,
      gr.PRIMARY,
      gr.SECONDARY,
    ]
      .concat(Sf.map((t) => "".concat(t, "x")))
      .concat(tw.map((t) => "w-".concat(t))),
    rw = {
      "Font Awesome Kit": { 400: "fak", normal: "fak" },
      "Font Awesome Kit Duotone": { 400: "fakd", normal: "fakd" },
    },
    sw = { kit: { "fa-kit": "fak" } },
    iw = { kit: { fak: "fa-kit" } },
    Jl = { kit: { kit: "fak" }, "kit-duotone": { "kit-duotone": "fakd" } };
  const kt = "___FONT_AWESOME___",
    ra = 16,
    Tf = "fa",
    xf = "svg-inline--fa",
    wn = "data-fa-i2svg",
    sa = "data-fa-pseudo-element",
    aw = "data-fa-pseudo-element-pending",
    fo = "data-prefix",
    ho = "data-icon",
    Xl = "fontawesome-i2svg",
    ow = "async",
    lw = ["HTML", "HEAD", "STYLE", "SCRIPT"],
    If = (() => {
      try {
        return !0;
      } catch {
        return !1;
      }
    })(),
    Cf = [ge, Ge, We];
  function zr(t) {
    return new Proxy(t, {
      get(e, n) {
        return n in e ? e[n] : e[ge];
      },
    });
  }
  const Ef = { ...wf };
  Ef[ge] = { ...wf[ge], ...Ql.kit, ...Ql["kit-duotone"] };
  const gn = zr(Ef),
    ia = { ...X1 };
  ia[ge] = { ...ia[ge], ...Jl.kit, ...Jl["kit-duotone"] };
  const Lr = zr(ia),
    aa = { ...J1 };
  aa[ge] = { ...aa[ge], ...iw.kit };
  const pn = zr(aa),
    oa = { ...Y1 };
  oa[ge] = { ...oa[ge], ...sw.kit };
  const cw = zr(oa),
    uw = W1,
    _f = "fa-layers-text",
    fw = q1,
    dw = { ...Z1 };
  zr(dw);
  const hw = [
      "class",
      "data-prefix",
      "data-icon",
      "data-fa-transform",
      "data-fa-mask",
    ],
    ki = gr,
    $n = new Set();
  Object.keys(Lr[ge]).map($n.add.bind($n));
  Object.keys(Lr[Ge]).map($n.add.bind($n));
  Object.keys(Lr[We]).map($n.add.bind($n));
  const mw = [...G1, ...nw],
    Sr = Kt.FontAwesomeConfig || {};
  function gw(t) {
    var e = he.querySelector("script[" + t + "]");
    if (e) return e.getAttribute(t);
  }
  function pw(t) {
    return t === "" ? !0 : t === "false" ? !1 : t === "true" ? !0 : t;
  }
  he &&
    typeof he.querySelector == "function" &&
    [
      ["data-family-prefix", "familyPrefix"],
      ["data-css-prefix", "cssPrefix"],
      ["data-family-default", "familyDefault"],
      ["data-style-default", "styleDefault"],
      ["data-replacement-class", "replacementClass"],
      ["data-auto-replace-svg", "autoReplaceSvg"],
      ["data-auto-add-css", "autoAddCss"],
      ["data-auto-a11y", "autoA11y"],
      ["data-search-pseudo-elements", "searchPseudoElements"],
      ["data-observe-mutations", "observeMutations"],
      ["data-mutate-approach", "mutateApproach"],
      ["data-keep-original-source", "keepOriginalSource"],
      ["data-measure-performance", "measurePerformance"],
      ["data-show-missing-icons", "showMissingIcons"],
    ].forEach((e) => {
      let [n, r] = e;
      const s = pw(gw(n));
      s != null && (Sr[r] = s);
    });
  const kf = {
    styleDefault: "solid",
    familyDefault: "classic",
    cssPrefix: Tf,
    replacementClass: xf,
    autoReplaceSvg: !0,
    autoAddCss: !0,
    autoA11y: !0,
    searchPseudoElements: !1,
    observeMutations: !0,
    mutateApproach: "async",
    keepOriginalSource: !0,
    measurePerformance: !1,
    showMissingIcons: !0,
  };
  Sr.familyPrefix && (Sr.cssPrefix = Sr.familyPrefix);
  const Kn = { ...kf, ...Sr };
  Kn.autoReplaceSvg || (Kn.observeMutations = !1);
  const R = {};
  Object.keys(kf).forEach((t) => {
    Object.defineProperty(R, t, {
      enumerable: !0,
      set: function (e) {
        (Kn[t] = e), Tr.forEach((n) => n(R));
      },
      get: function () {
        return Kn[t];
      },
    });
  });
  Object.defineProperty(R, "familyPrefix", {
    enumerable: !0,
    set: function (t) {
      (Kn.cssPrefix = t), Tr.forEach((e) => e(R));
    },
    get: function () {
      return Kn.cssPrefix;
    },
  });
  Kt.FontAwesomeConfig = R;
  const Tr = [];
  function yw(t) {
    return (
      Tr.push(t),
      () => {
        Tr.splice(Tr.indexOf(t), 1);
      }
    );
  }
  const Rt = ra,
    mt = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
  function bw(t) {
    if (!t || !Nt) return;
    const e = he.createElement("style");
    e.setAttribute("type", "text/css"), (e.innerHTML = t);
    const n = he.head.childNodes;
    let r = null;
    for (let s = n.length - 1; s > -1; s--) {
      const i = n[s],
        a = (i.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(a) > -1 && (r = i);
    }
    return he.head.insertBefore(e, r), t;
  }
  const vw = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  function Nr() {
    let t = 12,
      e = "";
    for (; t-- > 0; ) e += vw[(Math.random() * 62) | 0];
    return e;
  }
  function nr(t) {
    const e = [];
    for (let n = (t || []).length >>> 0; n--; ) e[n] = t[n];
    return e;
  }
  function mo(t) {
    return t.classList
      ? nr(t.classList)
      : (t.getAttribute("class") || "").split(" ").filter((e) => e);
  }
  function Of(t) {
    return ""
      .concat(t)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function ww(t) {
    return Object.keys(t || {})
      .reduce((e, n) => e + "".concat(n, '="').concat(Of(t[n]), '" '), "")
      .trim();
  }
  function ni(t) {
    return Object.keys(t || {}).reduce(
      (e, n) => e + "".concat(n, ": ").concat(t[n].trim(), ";"),
      ""
    );
  }
  function go(t) {
    return (
      t.size !== mt.size ||
      t.x !== mt.x ||
      t.y !== mt.y ||
      t.rotate !== mt.rotate ||
      t.flipX ||
      t.flipY
    );
  }
  function Sw(t) {
    let { transform: e, containerWidth: n, iconWidth: r } = t;
    const s = { transform: "translate(".concat(n / 2, " 256)") },
      i = "translate(".concat(e.x * 32, ", ").concat(e.y * 32, ") "),
      a = "scale("
        .concat((e.size / 16) * (e.flipX ? -1 : 1), ", ")
        .concat((e.size / 16) * (e.flipY ? -1 : 1), ") "),
      l = "rotate(".concat(e.rotate, " 0 0)"),
      c = { transform: "".concat(i, " ").concat(a, " ").concat(l) },
      u = { transform: "translate(".concat((r / 2) * -1, " -256)") };
    return { outer: s, inner: c, path: u };
  }
  function Tw(t) {
    let {
        transform: e,
        width: n = ra,
        height: r = ra,
        startCentered: s = !1,
      } = t,
      i = "";
    return (
      s && bf
        ? (i += "translate("
            .concat(e.x / Rt - n / 2, "em, ")
            .concat(e.y / Rt - r / 2, "em) "))
        : s
        ? (i += "translate(calc(-50% + "
            .concat(e.x / Rt, "em), calc(-50% + ")
            .concat(e.y / Rt, "em)) "))
        : (i += "translate(".concat(e.x / Rt, "em, ").concat(e.y / Rt, "em) ")),
      (i += "scale("
        .concat((e.size / Rt) * (e.flipX ? -1 : 1), ", ")
        .concat((e.size / Rt) * (e.flipY ? -1 : 1), ") ")),
      (i += "rotate(".concat(e.rotate, "deg) ")),
      i
    );
  }
  var xw = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
  function Af() {
    const t = Tf,
      e = xf,
      n = R.cssPrefix,
      r = R.replacementClass;
    let s = xw;
    if (n !== t || r !== e) {
      const i = new RegExp("\\.".concat(t, "\\-"), "g"),
        a = new RegExp("\\--".concat(t, "\\-"), "g"),
        l = new RegExp("\\.".concat(e), "g");
      s = s
        .replace(i, ".".concat(n, "-"))
        .replace(a, "--".concat(n, "-"))
        .replace(l, ".".concat(r));
    }
    return s;
  }
  let ec = !1;
  function Oi() {
    R.autoAddCss && !ec && (bw(Af()), (ec = !0));
  }
  var Iw = {
    mixout() {
      return { dom: { css: Af, insertCss: Oi } };
    },
    hooks() {
      return {
        beforeDOMElementCreation() {
          Oi();
        },
        beforeI2svg() {
          Oi();
        },
      };
    },
  };
  const Ot = Kt || {};
  Ot[kt] || (Ot[kt] = {});
  Ot[kt].styles || (Ot[kt].styles = {});
  Ot[kt].hooks || (Ot[kt].hooks = {});
  Ot[kt].shims || (Ot[kt].shims = []);
  var gt = Ot[kt];
  const Mf = [],
    Lf = function () {
      he.removeEventListener("DOMContentLoaded", Lf),
        (Ps = 1),
        Mf.map((t) => t());
    };
  let Ps = !1;
  Nt &&
    ((Ps = (he.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(
      he.readyState
    )),
    Ps || he.addEventListener("DOMContentLoaded", Lf));
  function Cw(t) {
    Nt && (Ps ? setTimeout(t, 0) : Mf.push(t));
  }
  function Hr(t) {
    const { tag: e, attributes: n = {}, children: r = [] } = t;
    return typeof t == "string"
      ? Of(t)
      : "<"
          .concat(e, " ")
          .concat(ww(n), ">")
          .concat(r.map(Hr).join(""), "</")
          .concat(e, ">");
  }
  function tc(t, e, n) {
    if (t && t[e] && t[e][n]) return { prefix: e, iconName: n, icon: t[e][n] };
  }
  var Ai = function (e, n, r, s) {
    var i = Object.keys(e),
      a = i.length,
      l = n,
      c,
      u,
      f;
    for (
      r === void 0 ? ((c = 1), (f = e[i[0]])) : ((c = 0), (f = r));
      c < a;
      c++
    )
      (u = i[c]), (f = l(f, e[u], u, e));
    return f;
  };
  function Ew(t) {
    const e = [];
    let n = 0;
    const r = t.length;
    for (; n < r; ) {
      const s = t.charCodeAt(n++);
      if (s >= 55296 && s <= 56319 && n < r) {
        const i = t.charCodeAt(n++);
        (i & 64512) == 56320
          ? e.push(((s & 1023) << 10) + (i & 1023) + 65536)
          : (e.push(s), n--);
      } else e.push(s);
    }
    return e;
  }
  function la(t) {
    const e = Ew(t);
    return e.length === 1 ? e[0].toString(16) : null;
  }
  function _w(t, e) {
    const n = t.length;
    let r = t.charCodeAt(e),
      s;
    return r >= 55296 &&
      r <= 56319 &&
      n > e + 1 &&
      ((s = t.charCodeAt(e + 1)), s >= 56320 && s <= 57343)
      ? (r - 55296) * 1024 + s - 56320 + 65536
      : r;
  }
  function nc(t) {
    return Object.keys(t).reduce((e, n) => {
      const r = t[n];
      return !!r.icon ? (e[r.iconName] = r.icon) : (e[n] = r), e;
    }, {});
  }
  function ca(t, e) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const { skipHooks: r = !1 } = n,
      s = nc(e);
    typeof gt.hooks.addPack == "function" && !r
      ? gt.hooks.addPack(t, nc(e))
      : (gt.styles[t] = { ...(gt.styles[t] || {}), ...s }),
      t === "fas" && ca("fa", e);
  }
  const { styles: cn, shims: kw } = gt,
    Ow = {
      [ge]: Object.values(pn[ge]),
      [Ge]: Object.values(pn[Ge]),
      [We]: Object.values(pn[We]),
    };
  let po = null,
    Nf = {},
    Pf = {},
    Df = {},
    Ff = {},
    Rf = {};
  const Aw = {
    [ge]: Object.keys(gn[ge]),
    [Ge]: Object.keys(gn[Ge]),
    [We]: Object.keys(gn[We]),
  };
  function Mw(t) {
    return ~mw.indexOf(t);
  }
  function Lw(t, e) {
    const n = e.split("-"),
      r = n[0],
      s = n.slice(1).join("-");
    return r === t && s !== "" && !Mw(s) ? s : null;
  }
  const jf = () => {
    const t = (r) => Ai(cn, (s, i, a) => ((s[a] = Ai(i, r, {})), s), {});
    (Nf = t(
      (r, s, i) => (
        s[3] && (r[s[3]] = i),
        s[2] &&
          s[2]
            .filter((l) => typeof l == "number")
            .forEach((l) => {
              r[l.toString(16)] = i;
            }),
        r
      )
    )),
      (Pf = t(
        (r, s, i) => (
          (r[i] = i),
          s[2] &&
            s[2]
              .filter((l) => typeof l == "string")
              .forEach((l) => {
                r[l] = i;
              }),
          r
        )
      )),
      (Rf = t((r, s, i) => {
        const a = s[2];
        return (
          (r[i] = i),
          a.forEach((l) => {
            r[l] = i;
          }),
          r
        );
      }));
    const e = "far" in cn || R.autoFetchSvg,
      n = Ai(
        kw,
        (r, s) => {
          const i = s[0];
          let a = s[1];
          const l = s[2];
          return (
            a === "far" && !e && (a = "fas"),
            typeof i == "string" && (r.names[i] = { prefix: a, iconName: l }),
            typeof i == "number" &&
              (r.unicodes[i.toString(16)] = { prefix: a, iconName: l }),
            r
          );
        },
        { names: {}, unicodes: {} }
      );
    (Df = n.names),
      (Ff = n.unicodes),
      (po = ri(R.styleDefault, { family: R.familyDefault }));
  };
  yw((t) => {
    po = ri(t.styleDefault, { family: R.familyDefault });
  });
  jf();
  function yo(t, e) {
    return (Nf[t] || {})[e];
  }
  function Nw(t, e) {
    return (Pf[t] || {})[e];
  }
  function Ut(t, e) {
    return (Rf[t] || {})[e];
  }
  function Bf(t) {
    return Df[t] || { prefix: null, iconName: null };
  }
  function Pw(t) {
    const e = Ff[t],
      n = yo("fas", t);
    return (
      e ||
      (n ? { prefix: "fas", iconName: n } : null) || {
        prefix: null,
        iconName: null,
      }
    );
  }
  function Yt() {
    return po;
  }
  const bo = () => ({ prefix: null, iconName: null, rest: [] });
  function ri(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { family: n = ge } = e,
      r = gn[n][t],
      s = Lr[n][t] || Lr[n][r],
      i = t in gt.styles ? t : null;
    return s || i || null;
  }
  const Dw = {
    [ge]: Object.keys(pn[ge]),
    [Ge]: Object.keys(pn[Ge]),
    [We]: Object.keys(pn[We]),
  };
  function si(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { skipLookups: n = !1 } = e,
      r = {
        [ge]: "".concat(R.cssPrefix, "-").concat(ge),
        [Ge]: "".concat(R.cssPrefix, "-").concat(Ge),
        [We]: "".concat(R.cssPrefix, "-").concat(We),
      };
    let s = null,
      i = ge;
    const a = U1.filter((c) => c !== vf);
    a.forEach((c) => {
      (t.includes(r[c]) || t.some((u) => Dw[c].includes(u))) && (i = c);
    });
    const l = t.reduce((c, u) => {
      const f = Lw(R.cssPrefix, u);
      if (
        (cn[u]
          ? ((u = Ow[i].includes(u) ? cw[i][u] : u), (s = u), (c.prefix = u))
          : Aw[i].indexOf(u) > -1
          ? ((s = u), (c.prefix = ri(u, { family: i })))
          : f
          ? (c.iconName = f)
          : u !== R.replacementClass &&
            !a.some((m) => u === r[m]) &&
            c.rest.push(u),
        !n && c.prefix && c.iconName)
      ) {
        const m = s === "fa" ? Bf(c.iconName) : {},
          g = Ut(c.prefix, c.iconName);
        m.prefix && (s = null),
          (c.iconName = m.iconName || g || c.iconName),
          (c.prefix = m.prefix || c.prefix),
          c.prefix === "far" &&
            !cn.far &&
            cn.fas &&
            !R.autoFetchSvg &&
            (c.prefix = "fas");
      }
      return c;
    }, bo());
    return (
      (t.includes("fa-brands") || t.includes("fab")) && (l.prefix = "fab"),
      (t.includes("fa-duotone") || t.includes("fad")) && (l.prefix = "fad"),
      !l.prefix &&
        i === Ge &&
        (cn.fass || R.autoFetchSvg) &&
        ((l.prefix = "fass"),
        (l.iconName = Ut(l.prefix, l.iconName) || l.iconName)),
      !l.prefix &&
        i === We &&
        (cn.fasds || R.autoFetchSvg) &&
        ((l.prefix = "fasds"),
        (l.iconName = Ut(l.prefix, l.iconName) || l.iconName)),
      (l.prefix === "fa" || s === "fa") && (l.prefix = Yt() || "fas"),
      l
    );
  }
  class Fw {
    constructor() {
      this.definitions = {};
    }
    add() {
      for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
        n[r] = arguments[r];
      const s = n.reduce(this._pullDefinitions, {});
      Object.keys(s).forEach((i) => {
        (this.definitions[i] = { ...(this.definitions[i] || {}), ...s[i] }),
          ca(i, s[i]);
        const a = pn[ge][i];
        a && ca(a, s[i]), jf();
      });
    }
    reset() {
      this.definitions = {};
    }
    _pullDefinitions(e, n) {
      const r = n.prefix && n.iconName && n.icon ? { 0: n } : n;
      return (
        Object.keys(r).map((s) => {
          const { prefix: i, iconName: a, icon: l } = r[s],
            c = l[2];
          e[i] || (e[i] = {}),
            c.length > 0 &&
              c.forEach((u) => {
                typeof u == "string" && (e[i][u] = l);
              }),
            (e[i][a] = l);
        }),
        e
      );
    }
  }
  let rc = [],
    Fn = {};
  const Un = {},
    Rw = Object.keys(Un);
  function jw(t, e) {
    let { mixoutsTo: n } = e;
    return (
      (rc = t),
      (Fn = {}),
      Object.keys(Un).forEach((r) => {
        Rw.indexOf(r) === -1 && delete Un[r];
      }),
      rc.forEach((r) => {
        const s = r.mixout ? r.mixout() : {};
        if (
          (Object.keys(s).forEach((i) => {
            typeof s[i] == "function" && (n[i] = s[i]),
              typeof s[i] == "object" &&
                Object.keys(s[i]).forEach((a) => {
                  n[i] || (n[i] = {}), (n[i][a] = s[i][a]);
                });
          }),
          r.hooks)
        ) {
          const i = r.hooks();
          Object.keys(i).forEach((a) => {
            Fn[a] || (Fn[a] = []), Fn[a].push(i[a]);
          });
        }
        r.provides && r.provides(Un);
      }),
      n
    );
  }
  function ua(t, e) {
    for (
      var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), s = 2;
      s < n;
      s++
    )
      r[s - 2] = arguments[s];
    return (
      (Fn[t] || []).forEach((a) => {
        e = a.apply(null, [e, ...r]);
      }),
      e
    );
  }
  function Sn(t) {
    for (
      var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
      r < e;
      r++
    )
      n[r - 1] = arguments[r];
    (Fn[t] || []).forEach((i) => {
      i.apply(null, n);
    });
  }
  function Qt() {
    const t = arguments[0],
      e = Array.prototype.slice.call(arguments, 1);
    return Un[t] ? Un[t].apply(null, e) : void 0;
  }
  function fa(t) {
    t.prefix === "fa" && (t.prefix = "fas");
    let { iconName: e } = t;
    const n = t.prefix || Yt();
    if (e)
      return (
        (e = Ut(n, e) || e), tc(zf.definitions, n, e) || tc(gt.styles, n, e)
      );
  }
  const zf = new Fw(),
    Bw = () => {
      (R.autoReplaceSvg = !1), (R.observeMutations = !1), Sn("noAuto");
    },
    zw = {
      i2svg: function () {
        let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return Nt
          ? (Sn("beforeI2svg", t), Qt("pseudoElements2svg", t), Qt("i2svg", t))
          : Promise.reject(new Error("Operation requires a DOM of some kind."));
      },
      watch: function () {
        let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const { autoReplaceSvgRoot: e } = t;
        R.autoReplaceSvg === !1 && (R.autoReplaceSvg = !0),
          (R.observeMutations = !0),
          Cw(() => {
            Vw({ autoReplaceSvgRoot: e }), Sn("watch", t);
          });
      },
    },
    Hw = {
      icon: (t) => {
        if (t === null) return null;
        if (typeof t == "object" && t.prefix && t.iconName)
          return {
            prefix: t.prefix,
            iconName: Ut(t.prefix, t.iconName) || t.iconName,
          };
        if (Array.isArray(t) && t.length === 2) {
          const e = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1],
            n = ri(t[0]);
          return { prefix: n, iconName: Ut(n, e) || e };
        }
        if (
          typeof t == "string" &&
          (t.indexOf("".concat(R.cssPrefix, "-")) > -1 || t.match(uw))
        ) {
          const e = si(t.split(" "), { skipLookups: !0 });
          return {
            prefix: e.prefix || Yt(),
            iconName: Ut(e.prefix, e.iconName) || e.iconName,
          };
        }
        if (typeof t == "string") {
          const e = Yt();
          return { prefix: e, iconName: Ut(e, t) || t };
        }
      },
    },
    qe = {
      noAuto: Bw,
      config: R,
      dom: zw,
      parse: Hw,
      library: zf,
      findIconDefinition: fa,
      toHtml: Hr,
    },
    Vw = function () {
      let t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      const { autoReplaceSvgRoot: e = he } = t;
      (Object.keys(gt.styles).length > 0 || R.autoFetchSvg) &&
        Nt &&
        R.autoReplaceSvg &&
        qe.dom.i2svg({ node: e });
    };
  function ii(t, e) {
    return (
      Object.defineProperty(t, "abstract", { get: e }),
      Object.defineProperty(t, "html", {
        get: function () {
          return t.abstract.map((n) => Hr(n));
        },
      }),
      Object.defineProperty(t, "node", {
        get: function () {
          if (!Nt) return;
          const n = he.createElement("div");
          return (n.innerHTML = t.html), n.children;
        },
      }),
      t
    );
  }
  function Uw(t) {
    let {
      children: e,
      main: n,
      mask: r,
      attributes: s,
      styles: i,
      transform: a,
    } = t;
    if (go(a) && n.found && !r.found) {
      const { width: l, height: c } = n,
        u = { x: l / c / 2, y: 0.5 };
      s.style = ni({
        ...i,
        "transform-origin": ""
          .concat(u.x + a.x / 16, "em ")
          .concat(u.y + a.y / 16, "em"),
      });
    }
    return [{ tag: "svg", attributes: s, children: e }];
  }
  function Zw(t) {
    let { prefix: e, iconName: n, children: r, attributes: s, symbol: i } = t;
    const a =
      i === !0 ? "".concat(e, "-").concat(R.cssPrefix, "-").concat(n) : i;
    return [
      {
        tag: "svg",
        attributes: { style: "display: none;" },
        children: [{ tag: "symbol", attributes: { ...s, id: a }, children: r }],
      },
    ];
  }
  function vo(t) {
    const {
        icons: { main: e, mask: n },
        prefix: r,
        iconName: s,
        transform: i,
        symbol: a,
        title: l,
        maskId: c,
        titleId: u,
        extra: f,
        watchable: m = !1,
      } = t,
      { width: g, height: y } = n.found ? n : e,
      E = r === "fak",
      v = [R.replacementClass, s ? "".concat(R.cssPrefix, "-").concat(s) : ""]
        .filter((Y) => f.classes.indexOf(Y) === -1)
        .filter((Y) => Y !== "" || !!Y)
        .concat(f.classes)
        .join(" ");
    let N = {
      children: [],
      attributes: {
        ...f.attributes,
        "data-prefix": r,
        "data-icon": s,
        class: v,
        role: f.attributes.role || "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 ".concat(g, " ").concat(y),
      },
    };
    const S =
      E && !~f.classes.indexOf("fa-fw")
        ? { width: "".concat((g / y) * 16 * 0.0625, "em") }
        : {};
    m && (N.attributes[wn] = ""),
      l &&
        (N.children.push({
          tag: "title",
          attributes: {
            id: N.attributes["aria-labelledby"] || "title-".concat(u || Nr()),
          },
          children: [l],
        }),
        delete N.attributes.title);
    const k = {
        ...N,
        prefix: r,
        iconName: s,
        main: e,
        mask: n,
        maskId: c,
        transform: i,
        symbol: a,
        styles: { ...S, ...f.styles },
      },
      { children: F, attributes: Z } =
        n.found && e.found
          ? Qt("generateAbstractMask", k) || { children: [], attributes: {} }
          : Qt("generateAbstractIcon", k) || { children: [], attributes: {} };
    return (k.children = F), (k.attributes = Z), a ? Zw(k) : Uw(k);
  }
  function sc(t) {
    const {
        content: e,
        width: n,
        height: r,
        transform: s,
        title: i,
        extra: a,
        watchable: l = !1,
      } = t,
      c = {
        ...a.attributes,
        ...(i ? { title: i } : {}),
        class: a.classes.join(" "),
      };
    l && (c[wn] = "");
    const u = { ...a.styles };
    go(s) &&
      ((u.transform = Tw({
        transform: s,
        startCentered: !0,
        width: n,
        height: r,
      })),
      (u["-webkit-transform"] = u.transform));
    const f = ni(u);
    f.length > 0 && (c.style = f);
    const m = [];
    return (
      m.push({ tag: "span", attributes: c, children: [e] }),
      i &&
        m.push({
          tag: "span",
          attributes: { class: "sr-only" },
          children: [i],
        }),
      m
    );
  }
  function Gw(t) {
    const { content: e, title: n, extra: r } = t,
      s = {
        ...r.attributes,
        ...(n ? { title: n } : {}),
        class: r.classes.join(" "),
      },
      i = ni(r.styles);
    i.length > 0 && (s.style = i);
    const a = [];
    return (
      a.push({ tag: "span", attributes: s, children: [e] }),
      n &&
        a.push({
          tag: "span",
          attributes: { class: "sr-only" },
          children: [n],
        }),
      a
    );
  }
  const { styles: Mi } = gt;
  function da(t) {
    const e = t[0],
      n = t[1],
      [r] = t.slice(4);
    let s = null;
    return (
      Array.isArray(r)
        ? (s = {
            tag: "g",
            attributes: { class: "".concat(R.cssPrefix, "-").concat(ki.GROUP) },
            children: [
              {
                tag: "path",
                attributes: {
                  class: "".concat(R.cssPrefix, "-").concat(ki.SECONDARY),
                  fill: "currentColor",
                  d: r[0],
                },
              },
              {
                tag: "path",
                attributes: {
                  class: "".concat(R.cssPrefix, "-").concat(ki.PRIMARY),
                  fill: "currentColor",
                  d: r[1],
                },
              },
            ],
          })
        : (s = { tag: "path", attributes: { fill: "currentColor", d: r } }),
      { found: !0, width: e, height: n, icon: s }
    );
  }
  const Ww = { found: !1, width: 512, height: 512 };
  function qw(t, e) {
    !If &&
      !R.showMissingIcons &&
      t &&
      console.error(
        'Icon with name "'
          .concat(t, '" and prefix "')
          .concat(e, '" is missing.')
      );
  }
  function ha(t, e) {
    let n = e;
    return (
      e === "fa" && R.styleDefault !== null && (e = Yt()),
      new Promise((r, s) => {
        if (n === "fa") {
          const i = Bf(t) || {};
          (t = i.iconName || t), (e = i.prefix || e);
        }
        if (t && e && Mi[e] && Mi[e][t]) {
          const i = Mi[e][t];
          return r(da(i));
        }
        qw(t, e),
          r({
            ...Ww,
            icon:
              R.showMissingIcons && t ? Qt("missingIconAbstract") || {} : {},
          });
      })
    );
  }
  const ic = () => {},
    ma =
      R.measurePerformance && rs && rs.mark && rs.measure
        ? rs
        : { mark: ic, measure: ic },
    pr = 'FA "6.6.0"',
    $w = (t) => (ma.mark("".concat(pr, " ").concat(t, " begins")), () => Hf(t)),
    Hf = (t) => {
      ma.mark("".concat(pr, " ").concat(t, " ends")),
        ma.measure(
          "".concat(pr, " ").concat(t),
          "".concat(pr, " ").concat(t, " begins"),
          "".concat(pr, " ").concat(t, " ends")
        );
    };
  var wo = { begin: $w, end: Hf };
  const ms = () => {};
  function ac(t) {
    return typeof (t.getAttribute ? t.getAttribute(wn) : null) == "string";
  }
  function Kw(t) {
    const e = t.getAttribute ? t.getAttribute(fo) : null,
      n = t.getAttribute ? t.getAttribute(ho) : null;
    return e && n;
  }
  function Yw(t) {
    return (
      t &&
      t.classList &&
      t.classList.contains &&
      t.classList.contains(R.replacementClass)
    );
  }
  function Qw() {
    return R.autoReplaceSvg === !0
      ? gs.replace
      : gs[R.autoReplaceSvg] || gs.replace;
  }
  function Jw(t) {
    return he.createElementNS("http://www.w3.org/2000/svg", t);
  }
  function Xw(t) {
    return he.createElement(t);
  }
  function Vf(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { ceFn: n = t.tag === "svg" ? Jw : Xw } = e;
    if (typeof t == "string") return he.createTextNode(t);
    const r = n(t.tag);
    return (
      Object.keys(t.attributes || []).forEach(function (i) {
        r.setAttribute(i, t.attributes[i]);
      }),
      (t.children || []).forEach(function (i) {
        r.appendChild(Vf(i, { ceFn: n }));
      }),
      r
    );
  }
  function eS(t) {
    let e = " ".concat(t.outerHTML, " ");
    return (e = "".concat(e, "Font Awesome fontawesome.com ")), e;
  }
  const gs = {
    replace: function (t) {
      const e = t[0];
      if (e.parentNode)
        if (
          (t[1].forEach((n) => {
            e.parentNode.insertBefore(Vf(n), e);
          }),
          e.getAttribute(wn) === null && R.keepOriginalSource)
        ) {
          let n = he.createComment(eS(e));
          e.parentNode.replaceChild(n, e);
        } else e.remove();
    },
    nest: function (t) {
      const e = t[0],
        n = t[1];
      if (~mo(e).indexOf(R.replacementClass)) return gs.replace(t);
      const r = new RegExp("".concat(R.cssPrefix, "-.*"));
      if ((delete n[0].attributes.id, n[0].attributes.class)) {
        const i = n[0].attributes.class
          .split(" ")
          .reduce(
            (a, l) => (
              l === R.replacementClass || l.match(r)
                ? a.toSvg.push(l)
                : a.toNode.push(l),
              a
            ),
            { toNode: [], toSvg: [] }
          );
        (n[0].attributes.class = i.toSvg.join(" ")),
          i.toNode.length === 0
            ? e.removeAttribute("class")
            : e.setAttribute("class", i.toNode.join(" "));
      }
      const s = n.map((i) => Hr(i)).join(`
`);
      e.setAttribute(wn, ""), (e.innerHTML = s);
    },
  };
  function oc(t) {
    t();
  }
  function Uf(t, e) {
    const n = typeof e == "function" ? e : ms;
    if (t.length === 0) n();
    else {
      let r = oc;
      R.mutateApproach === ow && (r = Kt.requestAnimationFrame || oc),
        r(() => {
          const s = Qw(),
            i = wo.begin("mutate");
          t.map(s), i(), n();
        });
    }
  }
  let So = !1;
  function Zf() {
    So = !0;
  }
  function ga() {
    So = !1;
  }
  let Ds = null;
  function lc(t) {
    if (!Yl || !R.observeMutations) return;
    const {
      treeCallback: e = ms,
      nodeCallback: n = ms,
      pseudoElementsCallback: r = ms,
      observeMutationsRoot: s = he,
    } = t;
    (Ds = new Yl((i) => {
      if (So) return;
      const a = Yt();
      nr(i).forEach((l) => {
        if (
          (l.type === "childList" &&
            l.addedNodes.length > 0 &&
            !ac(l.addedNodes[0]) &&
            (R.searchPseudoElements && r(l.target), e(l.target)),
          l.type === "attributes" &&
            l.target.parentNode &&
            R.searchPseudoElements &&
            r(l.target.parentNode),
          l.type === "attributes" &&
            ac(l.target) &&
            ~hw.indexOf(l.attributeName))
        )
          if (l.attributeName === "class" && Kw(l.target)) {
            const { prefix: c, iconName: u } = si(mo(l.target));
            l.target.setAttribute(fo, c || a),
              u && l.target.setAttribute(ho, u);
          } else Yw(l.target) && n(l.target);
      });
    })),
      Nt &&
        Ds.observe(s, {
          childList: !0,
          attributes: !0,
          characterData: !0,
          subtree: !0,
        });
  }
  function tS() {
    Ds && Ds.disconnect();
  }
  function nS(t) {
    const e = t.getAttribute("style");
    let n = [];
    return (
      e &&
        (n = e.split(";").reduce((r, s) => {
          const i = s.split(":"),
            a = i[0],
            l = i.slice(1);
          return a && l.length > 0 && (r[a] = l.join(":").trim()), r;
        }, {})),
      n
    );
  }
  function rS(t) {
    const e = t.getAttribute("data-prefix"),
      n = t.getAttribute("data-icon"),
      r = t.innerText !== void 0 ? t.innerText.trim() : "";
    let s = si(mo(t));
    return (
      s.prefix || (s.prefix = Yt()),
      e && n && ((s.prefix = e), (s.iconName = n)),
      (s.iconName && s.prefix) ||
        (s.prefix &&
          r.length > 0 &&
          (s.iconName =
            Nw(s.prefix, t.innerText) || yo(s.prefix, la(t.innerText))),
        !s.iconName &&
          R.autoFetchSvg &&
          t.firstChild &&
          t.firstChild.nodeType === Node.TEXT_NODE &&
          (s.iconName = t.firstChild.data)),
      s
    );
  }
  function sS(t) {
    const e = nr(t.attributes).reduce(
        (s, i) => (
          s.name !== "class" && s.name !== "style" && (s[i.name] = i.value), s
        ),
        {}
      ),
      n = t.getAttribute("title"),
      r = t.getAttribute("data-fa-title-id");
    return (
      R.autoA11y &&
        (n
          ? (e["aria-labelledby"] = ""
              .concat(R.replacementClass, "-title-")
              .concat(r || Nr()))
          : ((e["aria-hidden"] = "true"), (e.focusable = "false"))),
      e
    );
  }
  function iS() {
    return {
      iconName: null,
      title: null,
      titleId: null,
      prefix: null,
      transform: mt,
      symbol: !1,
      mask: { iconName: null, prefix: null, rest: [] },
      maskId: null,
      extra: { classes: [], styles: {}, attributes: {} },
    };
  }
  function cc(t) {
    let e =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { styleParser: !0 };
    const { iconName: n, prefix: r, rest: s } = rS(t),
      i = sS(t),
      a = ua("parseNodeAttributes", {}, t);
    let l = e.styleParser ? nS(t) : [];
    return {
      iconName: n,
      title: t.getAttribute("title"),
      titleId: t.getAttribute("data-fa-title-id"),
      prefix: r,
      transform: mt,
      mask: { iconName: null, prefix: null, rest: [] },
      maskId: null,
      symbol: !1,
      extra: { classes: s, styles: l, attributes: i },
      ...a,
    };
  }
  const { styles: aS } = gt;
  function Gf(t) {
    const e = R.autoReplaceSvg === "nest" ? cc(t, { styleParser: !1 }) : cc(t);
    return ~e.extra.classes.indexOf(_f)
      ? Qt("generateLayersText", t, e)
      : Qt("generateSvgReplacementMutation", t, e);
  }
  let bt = new Set();
  Cf.map((t) => {
    bt.add("fa-".concat(t));
  });
  Object.keys(gn[ge]).map(bt.add.bind(bt));
  Object.keys(gn[Ge]).map(bt.add.bind(bt));
  Object.keys(gn[We]).map(bt.add.bind(bt));
  bt = [...bt];
  function uc(t) {
    let e =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (!Nt) return Promise.resolve();
    const n = he.documentElement.classList,
      r = (f) => n.add("".concat(Xl, "-").concat(f)),
      s = (f) => n.remove("".concat(Xl, "-").concat(f)),
      i = R.autoFetchSvg
        ? bt
        : Cf.map((f) => "fa-".concat(f)).concat(Object.keys(aS));
    i.includes("fa") || i.push("fa");
    const a = [".".concat(_f, ":not([").concat(wn, "])")]
      .concat(i.map((f) => ".".concat(f, ":not([").concat(wn, "])")))
      .join(", ");
    if (a.length === 0) return Promise.resolve();
    let l = [];
    try {
      l = nr(t.querySelectorAll(a));
    } catch {}
    if (l.length > 0) r("pending"), s("complete");
    else return Promise.resolve();
    const c = wo.begin("onTree"),
      u = l.reduce((f, m) => {
        try {
          const g = Gf(m);
          g && f.push(g);
        } catch (g) {
          If || (g.name === "MissingIcon" && console.error(g));
        }
        return f;
      }, []);
    return new Promise((f, m) => {
      Promise.all(u)
        .then((g) => {
          Uf(g, () => {
            r("active"),
              r("complete"),
              s("pending"),
              typeof e == "function" && e(),
              c(),
              f();
          });
        })
        .catch((g) => {
          c(), m(g);
        });
    });
  }
  function oS(t) {
    let e =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    Gf(t).then((n) => {
      n && Uf([n], e);
    });
  }
  function lS(t) {
    return function (e) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const r = (e || {}).icon ? e : fa(e || {});
      let { mask: s } = n;
      return (
        s && (s = (s || {}).icon ? s : fa(s || {})), t(r, { ...n, mask: s })
      );
    };
  }
  const cS = function (t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const {
      transform: n = mt,
      symbol: r = !1,
      mask: s = null,
      maskId: i = null,
      title: a = null,
      titleId: l = null,
      classes: c = [],
      attributes: u = {},
      styles: f = {},
    } = e;
    if (!t) return;
    const { prefix: m, iconName: g, icon: y } = t;
    return ii(
      { type: "icon", ...t },
      () => (
        Sn("beforeDOMElementCreation", { iconDefinition: t, params: e }),
        R.autoA11y &&
          (a
            ? (u["aria-labelledby"] = ""
                .concat(R.replacementClass, "-title-")
                .concat(l || Nr()))
            : ((u["aria-hidden"] = "true"), (u.focusable = "false"))),
        vo({
          icons: {
            main: da(y),
            mask: s
              ? da(s.icon)
              : { found: !1, width: null, height: null, icon: {} },
          },
          prefix: m,
          iconName: g,
          transform: { ...mt, ...n },
          symbol: r,
          title: a,
          maskId: i,
          titleId: l,
          extra: { attributes: u, styles: f, classes: c },
        })
      )
    );
  };
  var uS = {
      mixout() {
        return { icon: lS(cS) };
      },
      hooks() {
        return {
          mutationObserverCallbacks(t) {
            return (t.treeCallback = uc), (t.nodeCallback = oS), t;
          },
        };
      },
      provides(t) {
        (t.i2svg = function (e) {
          const { node: n = he, callback: r = () => {} } = e;
          return uc(n, r);
        }),
          (t.generateSvgReplacementMutation = function (e, n) {
            const {
              iconName: r,
              title: s,
              titleId: i,
              prefix: a,
              transform: l,
              symbol: c,
              mask: u,
              maskId: f,
              extra: m,
            } = n;
            return new Promise((g, y) => {
              Promise.all([
                ha(r, a),
                u.iconName
                  ? ha(u.iconName, u.prefix)
                  : Promise.resolve({
                      found: !1,
                      width: 512,
                      height: 512,
                      icon: {},
                    }),
              ])
                .then((E) => {
                  let [v, N] = E;
                  g([
                    e,
                    vo({
                      icons: { main: v, mask: N },
                      prefix: a,
                      iconName: r,
                      transform: l,
                      symbol: c,
                      maskId: f,
                      title: s,
                      titleId: i,
                      extra: m,
                      watchable: !0,
                    }),
                  ]);
                })
                .catch(y);
            });
          }),
          (t.generateAbstractIcon = function (e) {
            let {
              children: n,
              attributes: r,
              main: s,
              transform: i,
              styles: a,
            } = e;
            const l = ni(a);
            l.length > 0 && (r.style = l);
            let c;
            return (
              go(i) &&
                (c = Qt("generateAbstractTransformGrouping", {
                  main: s,
                  transform: i,
                  containerWidth: s.width,
                  iconWidth: s.width,
                })),
              n.push(c || s.icon),
              { children: n, attributes: r }
            );
          });
      },
    },
    fS = {
      mixout() {
        return {
          layer(t) {
            let e =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {};
            const { classes: n = [] } = e;
            return ii({ type: "layer" }, () => {
              Sn("beforeDOMElementCreation", { assembler: t, params: e });
              let r = [];
              return (
                t((s) => {
                  Array.isArray(s)
                    ? s.map((i) => {
                        r = r.concat(i.abstract);
                      })
                    : (r = r.concat(s.abstract));
                }),
                [
                  {
                    tag: "span",
                    attributes: {
                      class: ["".concat(R.cssPrefix, "-layers"), ...n].join(
                        " "
                      ),
                    },
                    children: r,
                  },
                ]
              );
            });
          },
        };
      },
    },
    dS = {
      mixout() {
        return {
          counter(t) {
            let e =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {};
            const {
              title: n = null,
              classes: r = [],
              attributes: s = {},
              styles: i = {},
            } = e;
            return ii(
              { type: "counter", content: t },
              () => (
                Sn("beforeDOMElementCreation", { content: t, params: e }),
                Gw({
                  content: t.toString(),
                  title: n,
                  extra: {
                    attributes: s,
                    styles: i,
                    classes: ["".concat(R.cssPrefix, "-layers-counter"), ...r],
                  },
                })
              )
            );
          },
        };
      },
    },
    hS = {
      mixout() {
        return {
          text(t) {
            let e =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {};
            const {
              transform: n = mt,
              title: r = null,
              classes: s = [],
              attributes: i = {},
              styles: a = {},
            } = e;
            return ii(
              { type: "text", content: t },
              () => (
                Sn("beforeDOMElementCreation", { content: t, params: e }),
                sc({
                  content: t,
                  transform: { ...mt, ...n },
                  title: r,
                  extra: {
                    attributes: i,
                    styles: a,
                    classes: ["".concat(R.cssPrefix, "-layers-text"), ...s],
                  },
                })
              )
            );
          },
        };
      },
      provides(t) {
        t.generateLayersText = function (e, n) {
          const { title: r, transform: s, extra: i } = n;
          let a = null,
            l = null;
          if (bf) {
            const c = parseInt(getComputedStyle(e).fontSize, 10),
              u = e.getBoundingClientRect();
            (a = u.width / c), (l = u.height / c);
          }
          return (
            R.autoA11y && !r && (i.attributes["aria-hidden"] = "true"),
            Promise.resolve([
              e,
              sc({
                content: e.innerHTML,
                width: a,
                height: l,
                transform: s,
                title: r,
                extra: i,
                watchable: !0,
              }),
            ])
          );
        };
      },
    };
  const mS = new RegExp('"', "ug"),
    fc = [1105920, 1112319],
    dc = { FontAwesome: { normal: "fas", 400: "fas" }, ...K1, ...$1, ...rw },
    pa = Object.keys(dc).reduce(
      (t, e) => ((t[e.toLowerCase()] = dc[e]), t),
      {}
    ),
    gS = Object.keys(pa).reduce((t, e) => {
      const n = pa[e];
      return (t[e] = n[900] || [...Object.entries(n)][0][1]), t;
    }, {});
  function pS(t) {
    const e = t.replace(mS, ""),
      n = _w(e, 0),
      r = n >= fc[0] && n <= fc[1],
      s = e.length === 2 ? e[0] === e[1] : !1;
    return { value: la(s ? e[0] : e), isSecondary: r || s };
  }
  function yS(t, e) {
    const n = t.replace(/^['"]|['"]$/g, "").toLowerCase(),
      r = parseInt(e),
      s = isNaN(r) ? "normal" : r;
    return (pa[n] || {})[s] || gS[n];
  }
  function hc(t, e) {
    const n = "".concat(aw).concat(e.replace(":", "-"));
    return new Promise((r, s) => {
      if (t.getAttribute(n) !== null) return r();
      const a = nr(t.children).filter((g) => g.getAttribute(sa) === e)[0],
        l = Kt.getComputedStyle(t, e),
        c = l.getPropertyValue("font-family"),
        u = c.match(fw),
        f = l.getPropertyValue("font-weight"),
        m = l.getPropertyValue("content");
      if (a && !u) return t.removeChild(a), r();
      if (u && m !== "none" && m !== "") {
        const g = l.getPropertyValue("content");
        let y = yS(c, f);
        const { value: E, isSecondary: v } = pS(g),
          N = u[0].startsWith("FontAwesome");
        let S = yo(y, E),
          k = S;
        if (N) {
          const F = Pw(E);
          F.iconName && F.prefix && ((S = F.iconName), (y = F.prefix));
        }
        if (
          S &&
          !v &&
          (!a || a.getAttribute(fo) !== y || a.getAttribute(ho) !== k)
        ) {
          t.setAttribute(n, k), a && t.removeChild(a);
          const F = iS(),
            { extra: Z } = F;
          (Z.attributes[sa] = e),
            ha(S, y)
              .then((Y) => {
                const q = vo({
                    ...F,
                    icons: { main: Y, mask: bo() },
                    prefix: y,
                    iconName: k,
                    extra: Z,
                    watchable: !0,
                  }),
                  ue = he.createElementNS("http://www.w3.org/2000/svg", "svg");
                e === "::before"
                  ? t.insertBefore(ue, t.firstChild)
                  : t.appendChild(ue),
                  (ue.outerHTML = q.map((Ee) => Hr(Ee)).join(`
`)),
                  t.removeAttribute(n),
                  r();
              })
              .catch(s);
        } else r();
      } else r();
    });
  }
  function bS(t) {
    return Promise.all([hc(t, "::before"), hc(t, "::after")]);
  }
  function vS(t) {
    return (
      t.parentNode !== document.head &&
      !~lw.indexOf(t.tagName.toUpperCase()) &&
      !t.getAttribute(sa) &&
      (!t.parentNode || t.parentNode.tagName !== "svg")
    );
  }
  function mc(t) {
    if (Nt)
      return new Promise((e, n) => {
        const r = nr(t.querySelectorAll("*")).filter(vS).map(bS),
          s = wo.begin("searchPseudoElements");
        Zf(),
          Promise.all(r)
            .then(() => {
              s(), ga(), e();
            })
            .catch(() => {
              s(), ga(), n();
            });
      });
  }
  var wS = {
    hooks() {
      return {
        mutationObserverCallbacks(t) {
          return (t.pseudoElementsCallback = mc), t;
        },
      };
    },
    provides(t) {
      t.pseudoElements2svg = function (e) {
        const { node: n = he } = e;
        R.searchPseudoElements && mc(n);
      };
    },
  };
  let gc = !1;
  var SS = {
    mixout() {
      return {
        dom: {
          unwatch() {
            Zf(), (gc = !0);
          },
        },
      };
    },
    hooks() {
      return {
        bootstrap() {
          lc(ua("mutationObserverCallbacks", {}));
        },
        noAuto() {
          tS();
        },
        watch(t) {
          const { observeMutationsRoot: e } = t;
          gc
            ? ga()
            : lc(ua("mutationObserverCallbacks", { observeMutationsRoot: e }));
        },
      };
    },
  };
  const pc = (t) => {
    let e = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
    return t
      .toLowerCase()
      .split(" ")
      .reduce((n, r) => {
        const s = r.toLowerCase().split("-"),
          i = s[0];
        let a = s.slice(1).join("-");
        if (i && a === "h") return (n.flipX = !0), n;
        if (i && a === "v") return (n.flipY = !0), n;
        if (((a = parseFloat(a)), isNaN(a))) return n;
        switch (i) {
          case "grow":
            n.size = n.size + a;
            break;
          case "shrink":
            n.size = n.size - a;
            break;
          case "left":
            n.x = n.x - a;
            break;
          case "right":
            n.x = n.x + a;
            break;
          case "up":
            n.y = n.y - a;
            break;
          case "down":
            n.y = n.y + a;
            break;
          case "rotate":
            n.rotate = n.rotate + a;
            break;
        }
        return n;
      }, e);
  };
  var TS = {
    mixout() {
      return { parse: { transform: (t) => pc(t) } };
    },
    hooks() {
      return {
        parseNodeAttributes(t, e) {
          const n = e.getAttribute("data-fa-transform");
          return n && (t.transform = pc(n)), t;
        },
      };
    },
    provides(t) {
      t.generateAbstractTransformGrouping = function (e) {
        let { main: n, transform: r, containerWidth: s, iconWidth: i } = e;
        const a = { transform: "translate(".concat(s / 2, " 256)") },
          l = "translate(".concat(r.x * 32, ", ").concat(r.y * 32, ") "),
          c = "scale("
            .concat((r.size / 16) * (r.flipX ? -1 : 1), ", ")
            .concat((r.size / 16) * (r.flipY ? -1 : 1), ") "),
          u = "rotate(".concat(r.rotate, " 0 0)"),
          f = { transform: "".concat(l, " ").concat(c, " ").concat(u) },
          m = { transform: "translate(".concat((i / 2) * -1, " -256)") },
          g = { outer: a, inner: f, path: m };
        return {
          tag: "g",
          attributes: { ...g.outer },
          children: [
            {
              tag: "g",
              attributes: { ...g.inner },
              children: [
                {
                  tag: n.icon.tag,
                  children: n.icon.children,
                  attributes: { ...n.icon.attributes, ...g.path },
                },
              ],
            },
          ],
        };
      };
    },
  };
  const Li = { x: 0, y: 0, width: "100%", height: "100%" };
  function yc(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return (
      t.attributes && (t.attributes.fill || e) && (t.attributes.fill = "black"),
      t
    );
  }
  function xS(t) {
    return t.tag === "g" ? t.children : [t];
  }
  var IS = {
      hooks() {
        return {
          parseNodeAttributes(t, e) {
            const n = e.getAttribute("data-fa-mask"),
              r = n ? si(n.split(" ").map((s) => s.trim())) : bo();
            return (
              r.prefix || (r.prefix = Yt()),
              (t.mask = r),
              (t.maskId = e.getAttribute("data-fa-mask-id")),
              t
            );
          },
        };
      },
      provides(t) {
        t.generateAbstractMask = function (e) {
          let {
            children: n,
            attributes: r,
            main: s,
            mask: i,
            maskId: a,
            transform: l,
          } = e;
          const { width: c, icon: u } = s,
            { width: f, icon: m } = i,
            g = Sw({ transform: l, containerWidth: f, iconWidth: c }),
            y = { tag: "rect", attributes: { ...Li, fill: "white" } },
            E = u.children ? { children: u.children.map(yc) } : {},
            v = {
              tag: "g",
              attributes: { ...g.inner },
              children: [
                yc({
                  tag: u.tag,
                  attributes: { ...u.attributes, ...g.path },
                  ...E,
                }),
              ],
            },
            N = { tag: "g", attributes: { ...g.outer }, children: [v] },
            S = "mask-".concat(a || Nr()),
            k = "clip-".concat(a || Nr()),
            F = {
              tag: "mask",
              attributes: {
                ...Li,
                id: S,
                maskUnits: "userSpaceOnUse",
                maskContentUnits: "userSpaceOnUse",
              },
              children: [y, N],
            },
            Z = {
              tag: "defs",
              children: [
                { tag: "clipPath", attributes: { id: k }, children: xS(m) },
                F,
              ],
            };
          return (
            n.push(Z, {
              tag: "rect",
              attributes: {
                fill: "currentColor",
                "clip-path": "url(#".concat(k, ")"),
                mask: "url(#".concat(S, ")"),
                ...Li,
              },
            }),
            { children: n, attributes: r }
          );
        };
      },
    },
    CS = {
      provides(t) {
        let e = !1;
        Kt.matchMedia &&
          (e = Kt.matchMedia("(prefers-reduced-motion: reduce)").matches),
          (t.missingIconAbstract = function () {
            const n = [],
              r = { fill: "currentColor" },
              s = {
                attributeType: "XML",
                repeatCount: "indefinite",
                dur: "2s",
              };
            n.push({
              tag: "path",
              attributes: {
                ...r,
                d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
              },
            });
            const i = { ...s, attributeName: "opacity" },
              a = {
                tag: "circle",
                attributes: { ...r, cx: "256", cy: "364", r: "28" },
                children: [],
              };
            return (
              e ||
                a.children.push(
                  {
                    tag: "animate",
                    attributes: {
                      ...s,
                      attributeName: "r",
                      values: "28;14;28;28;14;28;",
                    },
                  },
                  {
                    tag: "animate",
                    attributes: { ...i, values: "1;0;1;1;0;1;" },
                  }
                ),
              n.push(a),
              n.push({
                tag: "path",
                attributes: {
                  ...r,
                  opacity: "1",
                  d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
                },
                children: e
                  ? []
                  : [
                      {
                        tag: "animate",
                        attributes: { ...i, values: "1;0;0;0;0;1;" },
                      },
                    ],
              }),
              e ||
                n.push({
                  tag: "path",
                  attributes: {
                    ...r,
                    opacity: "0",
                    d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
                  },
                  children: [
                    {
                      tag: "animate",
                      attributes: { ...i, values: "0;0;1;1;0;0;" },
                    },
                  ],
                }),
              { tag: "g", attributes: { class: "missing" }, children: n }
            );
          });
      },
    },
    ES = {
      hooks() {
        return {
          parseNodeAttributes(t, e) {
            const n = e.getAttribute("data-fa-symbol"),
              r = n === null ? !1 : n === "" ? !0 : n;
            return (t.symbol = r), t;
          },
        };
      },
    },
    _S = [Iw, uS, fS, dS, hS, wS, SS, TS, IS, CS, ES];
  jw(_S, { mixoutsTo: qe });
  qe.noAuto;
  qe.config;
  const kS = qe.library;
  qe.dom;
  const ya = qe.parse;
  qe.findIconDefinition;
  qe.toHtml;
  const OS = qe.icon;
  qe.layer;
  qe.text;
  qe.counter;
  const AS = {
      prefix: "fas",
      iconName: "circle-notch",
      icon: [
        512,
        512,
        [],
        "f1ce",
        "M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z",
      ],
    },
    MS = {
      prefix: "fas",
      iconName: "circle-exclamation",
      icon: [
        512,
        512,
        ["exclamation-circle"],
        "f06a",
        "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z",
      ],
    },
    LS = MS,
    NS = {
      prefix: "fas",
      iconName: "square-check",
      icon: [
        448,
        512,
        [9745, 9989, 61510, "check-square"],
        "f14a",
        "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z",
      ],
    },
    PS = {
      prefix: "fas",
      iconName: "triangle-exclamation",
      icon: [
        512,
        512,
        [9888, "exclamation-triangle", "warning"],
        "f071",
        "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z",
      ],
    },
    DS = PS,
    FS = {
      prefix: "far",
      iconName: "circle-dot",
      icon: [
        512,
        512,
        [128280, "dot-circle"],
        "f192",
        "M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z",
      ],
    },
    RS = {
      prefix: "far",
      iconName: "square",
      icon: [
        448,
        512,
        [9632, 9723, 9724, 61590],
        "f0c8",
        "M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z",
      ],
    },
    jS = {
      prefix: "far",
      iconName: "arrow-right",
      icon: [
        448,
        512,
        [8594],
        "f061",
        "M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z",
      ],
    },
    BS = {
      prefix: "far",
      iconName: "circle",
      icon: [
        512,
        512,
        [
          128308, 128309, 128992, 128993, 128994, 128995, 128996, 9679, 9898,
          9899, 11044, 61708, 61915,
        ],
        "f111",
        "M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z",
      ],
    },
    zS = {
      prefix: "far",
      iconName: "rotate",
      icon: [
        512,
        512,
        [128260, "sync-alt"],
        "f2f1",
        "M94 187.1C120.8 124.1 183.3 80 256 80c39.7 0 77.8 15.8 105.9 43.9l4.1 4.1-35.7 35.7c-6.6 6.6-10.3 15.6-10.3 25c0 19.5 15.8 35.3 35.3 35.3L472 224c13.3 0 24-10.7 24-24l0-116.7C496 63.8 480.2 48 460.7 48c-9.4 0-18.3 3.7-25 10.3L400 94.1l-4.1-4.1C358.8 52.8 308.5 32 256 32C163.4 32 83.9 88.2 49.8 168.3c-5.2 12.2 .5 26.3 12.7 31.5s26.3-.5 31.5-12.7zm368 157c5.2-12.2-.4-26.3-12.6-31.5s-26.3 .4-31.5 12.6C391 388.1 328.6 432 256 432c-39.7 0-77.8-15.8-105.9-43.9l-4.1-4.1 35.7-35.7c6.6-6.6 10.3-15.6 10.3-25c0-19.5-15.8-35.3-35.3-35.3L40 288c-13.3 0-24 10.7-24 24l0 116.7C16 448.2 31.8 464 51.3 464c9.4 0 18.3-3.7 25-10.3L112 417.9l4.1 4.1C153.2 459.2 203.5 480 256 480c92.5 0 171.8-56 206-135.9zM448 176l-62.1 0L448 113.9l0 62.1zM64 336l62.1 0L64 398.1 64 336z",
      ],
    },
    HS = zS,
    VS = {
      prefix: "fal",
      iconName: "angle-down",
      icon: [
        448,
        512,
        [8964],
        "f107",
        "M212.7 363.3c6.2 6.2 16.4 6.2 22.6 0l160-160c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 329.4 75.3 180.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l160 160z",
      ],
    };
  function bc(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e &&
        (r = r.filter(function (s) {
          return Object.getOwnPropertyDescriptor(t, s).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Tt(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e] != null ? arguments[e] : {};
      e % 2
        ? bc(Object(n), !0).forEach(function (r) {
            je(t, r, n[r]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : bc(Object(n)).forEach(function (r) {
            Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
          });
    }
    return t;
  }
  function US(t, e) {
    if (typeof t != "object" || !t) return t;
    var n = t[Symbol.toPrimitive];
    if (n !== void 0) {
      var r = n.call(t, e);
      if (typeof r != "object") return r;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (e === "string" ? String : Number)(t);
  }
  function ZS(t) {
    var e = US(t, "string");
    return typeof e == "symbol" ? e : e + "";
  }
  function Fs(t) {
    "@babel/helpers - typeof";
    return (
      (Fs =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                typeof Symbol == "function" &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      Fs(t)
    );
  }
  function je(t, e, n) {
    return (
      (e = ZS(e)),
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function GS(t, e) {
    if (t == null) return {};
    var n = {};
    for (var r in t)
      if (Object.prototype.hasOwnProperty.call(t, r)) {
        if (e.indexOf(r) >= 0) continue;
        n[r] = t[r];
      }
    return n;
  }
  function WS(t, e) {
    if (t == null) return {};
    var n = GS(t, e),
      r,
      s;
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(t);
      for (s = 0; s < i.length; s++)
        (r = i[s]),
          !(e.indexOf(r) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(t, r) &&
            (n[r] = t[r]);
    }
    return n;
  }
  var qS =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : {},
    Wf = { exports: {} };
  (function (t) {
    (function (e) {
      var n = function (S, k, F) {
          if (!u(k) || m(k) || g(k) || y(k) || c(k)) return k;
          var Z,
            Y = 0,
            q = 0;
          if (f(k))
            for (Z = [], q = k.length; Y < q; Y++) Z.push(n(S, k[Y], F));
          else {
            Z = {};
            for (var ue in k)
              Object.prototype.hasOwnProperty.call(k, ue) &&
                (Z[S(ue, F)] = n(S, k[ue], F));
          }
          return Z;
        },
        r = function (S, k) {
          k = k || {};
          var F = k.separator || "_",
            Z = k.split || /(?=[A-Z])/;
          return S.split(Z).join(F);
        },
        s = function (S) {
          return E(S)
            ? S
            : ((S = S.replace(/[\-_\s]+(.)?/g, function (k, F) {
                return F ? F.toUpperCase() : "";
              })),
              S.substr(0, 1).toLowerCase() + S.substr(1));
        },
        i = function (S) {
          var k = s(S);
          return k.substr(0, 1).toUpperCase() + k.substr(1);
        },
        a = function (S, k) {
          return r(S, k).toLowerCase();
        },
        l = Object.prototype.toString,
        c = function (S) {
          return typeof S == "function";
        },
        u = function (S) {
          return S === Object(S);
        },
        f = function (S) {
          return l.call(S) == "[object Array]";
        },
        m = function (S) {
          return l.call(S) == "[object Date]";
        },
        g = function (S) {
          return l.call(S) == "[object RegExp]";
        },
        y = function (S) {
          return l.call(S) == "[object Boolean]";
        },
        E = function (S) {
          return (S = S - 0), S === S;
        },
        v = function (S, k) {
          var F = k && "process" in k ? k.process : k;
          return typeof F != "function"
            ? S
            : function (Z, Y) {
                return F(Z, S, Y);
              };
        },
        N = {
          camelize: s,
          decamelize: a,
          pascalize: i,
          depascalize: a,
          camelizeKeys: function (S, k) {
            return n(v(s, k), S);
          },
          decamelizeKeys: function (S, k) {
            return n(v(a, k), S, k);
          },
          pascalizeKeys: function (S, k) {
            return n(v(i, k), S);
          },
          depascalizeKeys: function () {
            return this.decamelizeKeys.apply(this, arguments);
          },
        };
      t.exports ? (t.exports = N) : (e.humps = N);
    })(qS);
  })(Wf);
  var $S = Wf.exports,
    KS = ["class", "style"];
  function YS(t) {
    return t
      .split(";")
      .map(function (e) {
        return e.trim();
      })
      .filter(function (e) {
        return e;
      })
      .reduce(function (e, n) {
        var r = n.indexOf(":"),
          s = $S.camelize(n.slice(0, r)),
          i = n.slice(r + 1).trim();
        return (e[s] = i), e;
      }, {});
  }
  function QS(t) {
    return t.split(/\s+/).reduce(function (e, n) {
      return (e[n] = !0), e;
    }, {});
  }
  function qf(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (typeof t == "string") return t;
    var r = (t.children || []).map(function (c) {
        return qf(c);
      }),
      s = Object.keys(t.attributes || {}).reduce(
        function (c, u) {
          var f = t.attributes[u];
          switch (u) {
            case "class":
              c.class = QS(f);
              break;
            case "style":
              c.style = YS(f);
              break;
            default:
              c.attrs[u] = f;
          }
          return c;
        },
        { attrs: {}, class: {}, style: {} }
      );
    n.class;
    var i = n.style,
      a = i === void 0 ? {} : i,
      l = WS(n, KS);
    return Xh(
      t.tag,
      Tt(
        Tt(
          Tt({}, e),
          {},
          { class: s.class, style: Tt(Tt({}, s.style), a) },
          s.attrs
        ),
        l
      ),
      r
    );
  }
  var $f = !1;
  try {
    $f = !0;
  } catch {}
  function JS() {
    if (!$f && console && typeof console.error == "function") {
      var t;
      (t = console).error.apply(t, arguments);
    }
  }
  function Ni(t, e) {
    return (Array.isArray(e) && e.length > 0) || (!Array.isArray(e) && e)
      ? je({}, t, e)
      : {};
  }
  function XS(t) {
    var e,
      n =
        ((e = {
          "fa-spin": t.spin,
          "fa-pulse": t.pulse,
          "fa-fw": t.fixedWidth,
          "fa-border": t.border,
          "fa-li": t.listItem,
          "fa-inverse": t.inverse,
          "fa-flip": t.flip === !0,
          "fa-flip-horizontal": t.flip === "horizontal" || t.flip === "both",
          "fa-flip-vertical": t.flip === "vertical" || t.flip === "both",
        }),
        je(
          je(
            je(
              je(
                je(
                  je(
                    je(
                      je(
                        je(
                          je(e, "fa-".concat(t.size), t.size !== null),
                          "fa-rotate-".concat(t.rotation),
                          t.rotation !== null
                        ),
                        "fa-pull-".concat(t.pull),
                        t.pull !== null
                      ),
                      "fa-swap-opacity",
                      t.swapOpacity
                    ),
                    "fa-bounce",
                    t.bounce
                  ),
                  "fa-shake",
                  t.shake
                ),
                "fa-beat",
                t.beat
              ),
              "fa-fade",
              t.fade
            ),
            "fa-beat-fade",
            t.beatFade
          ),
          "fa-flash",
          t.flash
        ),
        je(
          je(e, "fa-spin-pulse", t.spinPulse),
          "fa-spin-reverse",
          t.spinReverse
        ));
    return Object.keys(n)
      .map(function (r) {
        return n[r] ? r : null;
      })
      .filter(function (r) {
        return r;
      });
  }
  function vc(t) {
    if (t && Fs(t) === "object" && t.prefix && t.iconName && t.icon) return t;
    if (ya.icon) return ya.icon(t);
    if (t === null) return null;
    if (Fs(t) === "object" && t.prefix && t.iconName) return t;
    if (Array.isArray(t) && t.length === 2)
      return { prefix: t[0], iconName: t[1] };
    if (typeof t == "string") return { prefix: "fas", iconName: t };
  }
  var eT = Zs({
    name: "FontAwesomeIcon",
    props: {
      border: { type: Boolean, default: !1 },
      fixedWidth: { type: Boolean, default: !1 },
      flip: {
        type: [Boolean, String],
        default: !1,
        validator: function (e) {
          return [!0, !1, "horizontal", "vertical", "both"].indexOf(e) > -1;
        },
      },
      icon: { type: [Object, Array, String], required: !0 },
      mask: { type: [Object, Array, String], default: null },
      maskId: { type: String, default: null },
      listItem: { type: Boolean, default: !1 },
      pull: {
        type: String,
        default: null,
        validator: function (e) {
          return ["right", "left"].indexOf(e) > -1;
        },
      },
      pulse: { type: Boolean, default: !1 },
      rotation: {
        type: [String, Number],
        default: null,
        validator: function (e) {
          return [90, 180, 270].indexOf(Number.parseInt(e, 10)) > -1;
        },
      },
      swapOpacity: { type: Boolean, default: !1 },
      size: {
        type: String,
        default: null,
        validator: function (e) {
          return (
            [
              "2xs",
              "xs",
              "sm",
              "lg",
              "xl",
              "2xl",
              "1x",
              "2x",
              "3x",
              "4x",
              "5x",
              "6x",
              "7x",
              "8x",
              "9x",
              "10x",
            ].indexOf(e) > -1
          );
        },
      },
      spin: { type: Boolean, default: !1 },
      transform: { type: [String, Object], default: null },
      symbol: { type: [Boolean, String], default: !1 },
      title: { type: String, default: null },
      titleId: { type: String, default: null },
      inverse: { type: Boolean, default: !1 },
      bounce: { type: Boolean, default: !1 },
      shake: { type: Boolean, default: !1 },
      beat: { type: Boolean, default: !1 },
      fade: { type: Boolean, default: !1 },
      beatFade: { type: Boolean, default: !1 },
      flash: { type: Boolean, default: !1 },
      spinPulse: { type: Boolean, default: !1 },
      spinReverse: { type: Boolean, default: !1 },
    },
    setup: function (e, n) {
      var r = n.attrs,
        s = le(function () {
          return vc(e.icon);
        }),
        i = le(function () {
          return Ni("classes", XS(e));
        }),
        a = le(function () {
          return Ni(
            "transform",
            typeof e.transform == "string"
              ? ya.transform(e.transform)
              : e.transform
          );
        }),
        l = le(function () {
          return Ni("mask", vc(e.mask));
        }),
        c = le(function () {
          return OS(
            s.value,
            Tt(
              Tt(Tt(Tt({}, i.value), a.value), l.value),
              {},
              {
                symbol: e.symbol,
                title: e.title,
                titleId: e.titleId,
                maskId: e.maskId,
              }
            )
          );
        });
      Hn(
        c,
        function (f) {
          if (!f)
            return JS("Could not find one or more icon(s)", s.value, l.value);
        },
        { immediate: !0 }
      );
      var u = le(function () {
        return c.value ? qf(c.value.abstract[0], {}, r) : null;
      });
      return function () {
        return u.value;
      };
    },
  });
  kS.add(jS, AS, VS, HS, DS, LS, NS, RS, BS, FS);
  const Kf = Im(V1);
  Kf.component("font-awesome-icon", eT);
  Kf.mount("#app");
});
export default tT();
