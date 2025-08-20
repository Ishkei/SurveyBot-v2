var rr = {},
  ua = Object.defineProperty,
  ca = (s, e, t) =>
    e in s
      ? ua(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (s[e] = t),
  w = (s, e, t) => ca(s, typeof e != "symbol" ? e + "" : e, t),
  ai,
  ha = Object.defineProperty,
  fa = (s, e, t) =>
    e in s
      ? ha(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (s[e] = t),
  li = (s, e, t) => fa(s, typeof e != "symbol" ? e + "" : e, t),
  ee = ((s) => (
    (s[(s.Document = 0)] = "Document"),
    (s[(s.DocumentType = 1)] = "DocumentType"),
    (s[(s.Element = 2)] = "Element"),
    (s[(s.Text = 3)] = "Text"),
    (s[(s.CDATA = 4)] = "CDATA"),
    (s[(s.Comment = 5)] = "Comment"),
    s
  ))(ee || {});
const ui = {
    Node: ["childNodes", "parentNode", "parentElement", "textContent"],
    ShadowRoot: ["host", "styleSheets"],
    Element: ["shadowRoot", "querySelector", "querySelectorAll"],
    MutationObserver: [],
  },
  ci = {
    Node: ["contains", "getRootNode"],
    ShadowRoot: ["getSelection"],
    Element: [],
    MutationObserver: ["constructor"],
  },
  Mt = {};
function Ps(s) {
  if (Mt[s]) return Mt[s];
  const e = globalThis[s],
    t = e.prototype,
    r = s in ui ? ui[s] : void 0,
    i = !!(
      r &&
      r.every((l) => {
        var a, u;
        return !!(
          (u =
            (a = Object.getOwnPropertyDescriptor(t, l)) == null
              ? void 0
              : a.get) != null && u.toString().includes("[native code]")
        );
      })
    ),
    n = s in ci ? ci[s] : void 0,
    o = !!(
      n &&
      n.every((l) => {
        var a;
        return (
          typeof t[l] == "function" &&
          ((a = t[l]) == null ? void 0 : a.toString().includes("[native code]"))
        );
      })
    );
  if (i && o) return (Mt[s] = e.prototype), e.prototype;
  try {
    const l = document.createElement("iframe");
    document.body.appendChild(l);
    const a = l.contentWindow;
    if (!a) return e.prototype;
    const u = a[s].prototype;
    return document.body.removeChild(l), u ? (Mt[s] = u) : t;
  } catch {
    return t;
  }
}
const Nr = {};
function ke(s, e, t) {
  var r;
  const i = `${s}.${String(t)}`;
  if (Nr[i]) return Nr[i].call(e);
  const n = Ps(s),
    o = (r = Object.getOwnPropertyDescriptor(n, t)) == null ? void 0 : r.get;
  return o ? ((Nr[i] = o), o.call(e)) : e[t];
}
const kr = {};
function cn(s, e, t) {
  const r = `${s}.${String(t)}`;
  if (kr[r]) return kr[r].bind(e);
  const n = Ps(s)[t];
  return typeof n != "function" ? e[t] : ((kr[r] = n), n.bind(e));
}
function pa(s) {
  return ke("Node", s, "childNodes");
}
function da(s) {
  return ke("Node", s, "parentNode");
}
function ma(s) {
  return ke("Node", s, "parentElement");
}
function ga(s) {
  return ke("Node", s, "textContent");
}
function ya(s, e) {
  return cn("Node", s, "contains")(e);
}
function wa(s) {
  return cn("Node", s, "getRootNode")();
}
function ba(s) {
  return !s || !("host" in s) ? null : ke("ShadowRoot", s, "host");
}
function va(s) {
  return s.styleSheets;
}
function Sa(s) {
  return !s || !("shadowRoot" in s) ? null : ke("Element", s, "shadowRoot");
}
function Ca(s, e) {
  return ke("Element", s, "querySelector")(e);
}
function Ia(s, e) {
  return ke("Element", s, "querySelectorAll")(e);
}
function xa() {
  return Ps("MutationObserver").constructor;
}
const se = {
  childNodes: pa,
  parentNode: da,
  parentElement: ma,
  textContent: ga,
  contains: ya,
  getRootNode: wa,
  host: ba,
  styleSheets: va,
  shadowRoot: Sa,
  querySelector: Ca,
  querySelectorAll: Ia,
  mutationObserver: xa,
};
function hn(s) {
  return s.nodeType === s.ELEMENT_NODE;
}
function at(s) {
  const e = (s && "host" in s && "mode" in s && se.host(s)) || null;
  return !!(e && "shadowRoot" in e && se.shadowRoot(e) === s);
}
function lt(s) {
  return Object.prototype.toString.call(s) === "[object ShadowRoot]";
}
function Ra(s) {
  return (
    s.includes(" background-clip: text;") &&
      !s.includes(" -webkit-background-clip: text;") &&
      (s = s.replace(
        /\sbackground-clip:\s*text;/g,
        " -webkit-background-clip: text; background-clip: text;"
      )),
    s
  );
}
function Oa(s) {
  const { cssText: e } = s;
  if (e.split('"').length < 3) return e;
  const t = ["@import", `url(${JSON.stringify(s.href)})`];
  return (
    s.layerName === ""
      ? t.push("layer")
      : s.layerName && t.push(`layer(${s.layerName})`),
    s.supportsText && t.push(`supports(${s.supportsText})`),
    s.media.length && t.push(s.media.mediaText),
    t.join(" ") + ";"
  );
}
function sr(s) {
  try {
    const e = s.rules || s.cssRules;
    if (!e) return null;
    const t = Array.from(e, (r) => fn(r, s.href)).join("");
    return Ra(t);
  } catch {
    return null;
  }
}
function fn(s, e) {
  if (Aa(s)) {
    let t;
    try {
      t = sr(s.styleSheet) || Oa(s);
    } catch {
      t = s.cssText;
    }
    return s.styleSheet.href ? ir(t, s.styleSheet.href) : t;
  } else {
    let t = s.cssText;
    return (
      Ea(s) && s.selectorText.includes(":") && (t = Ma(t)), e ? ir(t, e) : t
    );
  }
}
function Ma(s) {
  const e = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
  return s.replace(e, "$1\\$2");
}
function Aa(s) {
  return "styleSheet" in s;
}
function Ea(s) {
  return "selectorText" in s;
}
class pn {
  constructor() {
    li(this, "idNodeMap", new Map()), li(this, "nodeMetaMap", new WeakMap());
  }
  getId(e) {
    var t;
    return e ? ((t = this.getMeta(e)) == null ? void 0 : t.id) ?? -1 : -1;
  }
  getNode(e) {
    return this.idNodeMap.get(e) || null;
  }
  getIds() {
    return Array.from(this.idNodeMap.keys());
  }
  getMeta(e) {
    return this.nodeMetaMap.get(e) || null;
  }
  removeNodeFromMap(e) {
    const t = this.getId(e);
    this.idNodeMap.delete(t),
      e.childNodes && e.childNodes.forEach((r) => this.removeNodeFromMap(r));
  }
  has(e) {
    return this.idNodeMap.has(e);
  }
  hasNode(e) {
    return this.nodeMetaMap.has(e);
  }
  add(e, t) {
    const r = t.id;
    this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, t);
  }
  replace(e, t) {
    const r = this.getNode(e);
    if (r) {
      const i = this.nodeMetaMap.get(r);
      i && this.nodeMetaMap.set(t, i);
    }
    this.idNodeMap.set(e, t);
  }
  reset() {
    (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
  }
}
function $a() {
  return new pn();
}
function Ts({
  element: s,
  maskInputOptions: e,
  tagName: t,
  type: r,
  value: i,
  maskInputFn: n,
}) {
  let o = i || "";
  const l = r && De(r);
  return (
    (e[t.toLowerCase()] || (l && e[l])) &&
      (n ? (o = n(o, s)) : (o = "*".repeat(o.length))),
    o
  );
}
function De(s) {
  return s.toLowerCase();
}
const hi = "__rrweb_original__";
function Na(s) {
  const e = s.getContext("2d");
  if (!e) return !0;
  const t = 50;
  for (let r = 0; r < s.width; r += t)
    for (let i = 0; i < s.height; i += t) {
      const n = e.getImageData,
        o = hi in n ? n[hi] : n;
      if (
        new Uint32Array(
          o.call(
            e,
            r,
            i,
            Math.min(t, s.width - r),
            Math.min(t, s.height - i)
          ).data.buffer
        ).some((a) => a !== 0)
      )
        return !1;
    }
  return !0;
}
function Ls(s) {
  const e = s.type;
  return s.hasAttribute("data-rr-is-password") ? "password" : e ? De(e) : null;
}
function dn(s, e) {
  let t;
  try {
    t = new URL(s, e ?? window.location.href);
  } catch {
    return null;
  }
  const r = /\.([0-9a-z]+)(?:$)/i,
    i = t.pathname.match(r);
  return (i == null ? void 0 : i[1]) ?? null;
}
function ka(s) {
  let e = "";
  return (
    s.indexOf("//") > -1
      ? (e = s.split("/").slice(0, 3).join("/"))
      : (e = s.split("/")[0]),
    (e = e.split("?")[0]),
    e
  );
}
const Pa = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
  Ta = /^(?:[a-z+]+:)?\/\//i,
  La = /^www\..*/i,
  Da = /^(data:)([^,]*),(.*)/i;
function ir(s, e) {
  return (s || "").replace(Pa, (t, r, i, n, o, l) => {
    const a = i || o || l,
      u = r || n || "";
    if (!a) return t;
    if (Ta.test(a) || La.test(a)) return `url(${u}${a}${u})`;
    if (Da.test(a)) return `url(${u}${a}${u})`;
    if (a[0] === "/") return `url(${u}${ka(e) + a}${u})`;
    const c = e.split("/"),
      h = a.split("/");
    c.pop();
    for (const m of h) m !== "." && (m === ".." ? c.pop() : c.push(m));
    return `url(${u}${c.join("/")}${u})`;
  });
}
let _a = 1;
const Fa = new RegExp("[^a-z0-9-_:]"),
  ct = -2;
function mn() {
  return _a++;
}
function Ua(s) {
  if (s instanceof HTMLFormElement) return "form";
  const e = De(s.tagName);
  return Fa.test(e) ? "div" : e;
}
let ze, fi;
const Ba = /^[^ \t\n\r\u000c]+/,
  za = /^[, \t\n\r\u000c]+/;
function Wa(s, e) {
  if (e.trim() === "") return e;
  let t = 0;
  function r(n) {
    let o;
    const l = n.exec(e.substring(t));
    return l ? ((o = l[0]), (t += o.length), o) : "";
  }
  const i = [];
  for (; r(za), !(t >= e.length); ) {
    let n = r(Ba);
    if (n.slice(-1) === ",")
      (n = Ge(s, n.substring(0, n.length - 1))), i.push(n);
    else {
      let o = "";
      n = Ge(s, n);
      let l = !1;
      for (;;) {
        const a = e.charAt(t);
        if (a === "") {
          i.push((n + o).trim());
          break;
        } else if (l) a === ")" && (l = !1);
        else if (a === ",") {
          (t += 1), i.push((n + o).trim());
          break;
        } else a === "(" && (l = !0);
        (o += a), (t += 1);
      }
    }
  }
  return i.join(", ");
}
const pi = new WeakMap();
function Ge(s, e) {
  return !e || e.trim() === "" ? e : Ds(s, e);
}
function Ga(s) {
  return !!(s.tagName === "svg" || s.ownerSVGElement);
}
function Ds(s, e) {
  let t = pi.get(s);
  if ((t || ((t = s.createElement("a")), pi.set(s, t)), !e)) e = "";
  else if (e.startsWith("blob:") || e.startsWith("data:")) return e;
  return t.setAttribute("href", e), t.href;
}
function gn(s, e, t, r) {
  return (
    r &&
    (t === "src" ||
    (t === "href" && !(e === "use" && r[0] === "#")) ||
    (t === "xlink:href" && r[0] !== "#") ||
    (t === "background" && (e === "table" || e === "td" || e === "th"))
      ? Ge(s, r)
      : t === "srcset"
      ? Wa(s, r)
      : t === "style"
      ? ir(r, Ds(s))
      : e === "object" && t === "data"
      ? Ge(s, r)
      : r)
  );
}
function yn(s, e, t) {
  return (s === "video" || s === "audio") && e === "autoplay";
}
function ja(s, e, t) {
  try {
    if (typeof e == "string") {
      if (s.classList.contains(e)) return !0;
    } else
      for (let r = s.classList.length; r--; ) {
        const i = s.classList[r];
        if (e.test(i)) return !0;
      }
    if (t) return s.matches(t);
  } catch {}
  return !1;
}
function nr(s, e, t) {
  if (!s) return !1;
  if (s.nodeType !== s.ELEMENT_NODE) return t ? nr(se.parentNode(s), e, t) : !1;
  for (let r = s.classList.length; r--; ) {
    const i = s.classList[r];
    if (e.test(i)) return !0;
  }
  return t ? nr(se.parentNode(s), e, t) : !1;
}
function wn(s, e, t, r) {
  let i;
  if (hn(s)) {
    if (((i = s), !se.childNodes(i).length)) return !1;
  } else {
    if (se.parentElement(s) === null) return !1;
    i = se.parentElement(s);
  }
  try {
    if (typeof e == "string") {
      if (r) {
        if (i.closest(`.${e}`)) return !0;
      } else if (i.classList.contains(e)) return !0;
    } else if (nr(i, e, r)) return !0;
    if (t) {
      if (r) {
        if (i.closest(t)) return !0;
      } else if (i.matches(t)) return !0;
    }
  } catch {}
  return !1;
}
function Va(s, e, t) {
  const r = s.contentWindow;
  if (!r) return;
  let i = !1,
    n;
  try {
    n = r.document.readyState;
  } catch {
    return;
  }
  if (n !== "complete") {
    const l = setTimeout(() => {
      i || (e(), (i = !0));
    }, t);
    s.addEventListener("load", () => {
      clearTimeout(l), (i = !0), e();
    });
    return;
  }
  const o = "about:blank";
  if (r.location.href !== o || s.src === o || s.src === "")
    return setTimeout(e, 0), s.addEventListener("load", e);
  s.addEventListener("load", e);
}
function Ha(s, e, t) {
  let r = !1,
    i;
  try {
    i = s.sheet;
  } catch {
    return;
  }
  if (i) return;
  const n = setTimeout(() => {
    r || (e(), (r = !0));
  }, t);
  s.addEventListener("load", () => {
    clearTimeout(n), (r = !0), e();
  });
}
function Ya(s, e) {
  const {
      doc: t,
      mirror: r,
      blockClass: i,
      blockSelector: n,
      needsMask: o,
      inlineStylesheet: l,
      maskInputOptions: a = {},
      maskTextFn: u,
      maskInputFn: c,
      dataURLOptions: h = {},
      inlineImages: m,
      recordCanvas: d,
      keepIframeSrcFn: g,
      newlyAddedElement: p = !1,
    } = e,
    f = Za(t, r);
  switch (s.nodeType) {
    case s.DOCUMENT_NODE:
      return s.compatMode !== "CSS1Compat"
        ? { type: ee.Document, childNodes: [], compatMode: s.compatMode }
        : { type: ee.Document, childNodes: [] };
    case s.DOCUMENT_TYPE_NODE:
      return {
        type: ee.DocumentType,
        name: s.name,
        publicId: s.publicId,
        systemId: s.systemId,
        rootId: f,
      };
    case s.ELEMENT_NODE:
      return Xa(s, {
        doc: t,
        blockClass: i,
        blockSelector: n,
        inlineStylesheet: l,
        maskInputOptions: a,
        maskInputFn: c,
        dataURLOptions: h,
        inlineImages: m,
        recordCanvas: d,
        keepIframeSrcFn: g,
        newlyAddedElement: p,
        rootId: f,
      });
    case s.TEXT_NODE:
      return Ja(s, { doc: t, needsMask: o, maskTextFn: u, rootId: f });
    case s.CDATA_SECTION_NODE:
      return { type: ee.CDATA, textContent: "", rootId: f };
    case s.COMMENT_NODE:
      return {
        type: ee.Comment,
        textContent: se.textContent(s) || "",
        rootId: f,
      };
    default:
      return !1;
  }
}
function Za(s, e) {
  if (!e.hasNode(s)) return;
  const t = e.getId(s);
  return t === 1 ? void 0 : t;
}
function Ja(s, e) {
  var t;
  const { needsMask: r, maskTextFn: i, rootId: n } = e,
    o = se.parentNode(s),
    l = o && o.tagName;
  let a = se.textContent(s);
  const u = l === "STYLE" ? !0 : void 0,
    c = l === "SCRIPT" ? !0 : void 0;
  if (u && a) {
    try {
      s.nextSibling ||
        s.previousSibling ||
        ((t = o.sheet) != null && t.cssRules && (a = sr(o.sheet)));
    } catch {}
    a = ir(a, Ds(e.doc));
  }
  return (
    c && (a = "SCRIPT_PLACEHOLDER"),
    !u &&
      !c &&
      a &&
      r &&
      (a = i ? i(a, se.parentElement(s)) : a.replace(/[\S]/g, "*")),
    { type: ee.Text, textContent: a || "", isStyle: u, rootId: n }
  );
}
function Xa(s, e) {
  const {
      doc: t,
      blockClass: r,
      blockSelector: i,
      inlineStylesheet: n,
      maskInputOptions: o = {},
      maskInputFn: l,
      dataURLOptions: a = {},
      inlineImages: u,
      recordCanvas: c,
      keepIframeSrcFn: h,
      newlyAddedElement: m = !1,
      rootId: d,
    } = e,
    g = ja(s, r, i),
    p = Ua(s);
  let f = {};
  const S = s.attributes.length;
  for (let y = 0; y < S; y++) {
    const C = s.attributes[y];
    yn(p, C.name, C.value) || (f[C.name] = gn(t, p, De(C.name), C.value));
  }
  if (p === "link" && n) {
    const y = Array.from(t.styleSheets).find((x) => x.href === s.href);
    let C = null;
    y && (C = sr(y)), C && (delete f.rel, delete f.href, (f._cssText = C));
  }
  if (
    p === "style" &&
    s.sheet &&
    !(s.innerText || se.textContent(s) || "").trim().length
  ) {
    const y = sr(s.sheet);
    y && (f._cssText = y);
  }
  if (p === "input" || p === "textarea" || p === "select") {
    const y = s.value,
      C = s.checked;
    f.type !== "radio" &&
    f.type !== "checkbox" &&
    f.type !== "submit" &&
    f.type !== "button" &&
    y
      ? (f.value = Ts({
          element: s,
          type: Ls(s),
          tagName: p,
          value: y,
          maskInputOptions: o,
          maskInputFn: l,
        }))
      : C && (f.checked = C);
  }
  if (
    (p === "option" &&
      (s.selected && !o.select ? (f.selected = !0) : delete f.selected),
    p === "dialog" &&
      s.open &&
      (f.rr_open_mode = s.matches("dialog:modal") ? "modal" : "non-modal"),
    p === "canvas" && c)
  ) {
    if (s.__context === "2d")
      Na(s) || (f.rr_dataURL = s.toDataURL(a.type, a.quality));
    else if (!("__context" in s)) {
      const y = s.toDataURL(a.type, a.quality),
        C = t.createElement("canvas");
      (C.width = s.width), (C.height = s.height);
      const x = C.toDataURL(a.type, a.quality);
      y !== x && (f.rr_dataURL = y);
    }
  }
  if (p === "img" && u) {
    ze || ((ze = t.createElement("canvas")), (fi = ze.getContext("2d")));
    const y = s;
    y.currentSrc || y.getAttribute("src");
    const C = y.crossOrigin,
      x = () => {
        y.removeEventListener("load", x);
        try {
          (ze.width = y.naturalWidth),
            (ze.height = y.naturalHeight),
            fi.drawImage(y, 0, 0),
            (f.rr_dataURL = ze.toDataURL(a.type, a.quality));
        } catch {
          if (y.crossOrigin !== "anonymous") {
            (y.crossOrigin = "anonymous"),
              y.complete && y.naturalWidth !== 0
                ? x()
                : y.addEventListener("load", x);
            return;
          }
        }
        y.crossOrigin === "anonymous" &&
          (C ? (f.crossOrigin = C) : y.removeAttribute("crossorigin"));
      };
    y.complete && y.naturalWidth !== 0 ? x() : y.addEventListener("load", x);
  }
  if (p === "audio" || p === "video") {
    const y = f;
    (y.rr_mediaState = s.paused ? "paused" : "played"),
      (y.rr_mediaCurrentTime = s.currentTime),
      (y.rr_mediaPlaybackRate = s.playbackRate),
      (y.rr_mediaMuted = s.muted),
      (y.rr_mediaLoop = s.loop),
      (y.rr_mediaVolume = s.volume);
  }
  if (
    (m ||
      (s.scrollLeft && (f.rr_scrollLeft = s.scrollLeft),
      s.scrollTop && (f.rr_scrollTop = s.scrollTop)),
    g)
  ) {
    const { width: y, height: C } = s.getBoundingClientRect();
    f = { class: f.class, rr_width: `${y}px`, rr_height: `${C}px` };
  }
  p === "iframe" &&
    !h(f.src) &&
    (s.contentDocument || (f.rr_src = f.src), delete f.src);
  let v;
  try {
    customElements.get(p) && (v = !0);
  } catch {}
  return {
    type: ee.Element,
    tagName: p,
    attributes: f,
    childNodes: [],
    isSVG: Ga(s) || void 0,
    needBlock: g,
    rootId: d,
    isCustom: v,
  };
}
function z(s) {
  return s == null ? "" : s.toLowerCase();
}
function Ka(s, e) {
  if (e.comment && s.type === ee.Comment) return !0;
  if (s.type === ee.Element) {
    if (
      e.script &&
      (s.tagName === "script" ||
        (s.tagName === "link" &&
          (s.attributes.rel === "preload" ||
            s.attributes.rel === "modulepreload") &&
          s.attributes.as === "script") ||
        (s.tagName === "link" &&
          s.attributes.rel === "prefetch" &&
          typeof s.attributes.href == "string" &&
          dn(s.attributes.href) === "js"))
    )
      return !0;
    if (
      e.headFavicon &&
      ((s.tagName === "link" && s.attributes.rel === "shortcut icon") ||
        (s.tagName === "meta" &&
          (z(s.attributes.name).match(/^msapplication-tile(image|color)$/) ||
            z(s.attributes.name) === "application-name" ||
            z(s.attributes.rel) === "icon" ||
            z(s.attributes.rel) === "apple-touch-icon" ||
            z(s.attributes.rel) === "shortcut icon")))
    )
      return !0;
    if (s.tagName === "meta") {
      if (
        e.headMetaDescKeywords &&
        z(s.attributes.name).match(/^description|keywords$/)
      )
        return !0;
      if (
        e.headMetaSocial &&
        (z(s.attributes.property).match(/^(og|twitter|fb):/) ||
          z(s.attributes.name).match(/^(og|twitter):/) ||
          z(s.attributes.name) === "pinterest")
      )
        return !0;
      if (
        e.headMetaRobots &&
        (z(s.attributes.name) === "robots" ||
          z(s.attributes.name) === "googlebot" ||
          z(s.attributes.name) === "bingbot")
      )
        return !0;
      if (e.headMetaHttpEquiv && s.attributes["http-equiv"] !== void 0)
        return !0;
      if (
        e.headMetaAuthorship &&
        (z(s.attributes.name) === "author" ||
          z(s.attributes.name) === "generator" ||
          z(s.attributes.name) === "framework" ||
          z(s.attributes.name) === "publisher" ||
          z(s.attributes.name) === "progid" ||
          z(s.attributes.property).match(/^article:/) ||
          z(s.attributes.property).match(/^product:/))
      )
        return !0;
      if (
        e.headMetaVerification &&
        (z(s.attributes.name) === "google-site-verification" ||
          z(s.attributes.name) === "yandex-verification" ||
          z(s.attributes.name) === "csrf-token" ||
          z(s.attributes.name) === "p:domain_verify" ||
          z(s.attributes.name) === "verify-v1" ||
          z(s.attributes.name) === "verification" ||
          z(s.attributes.name) === "shopify-checkout-api-token")
      )
        return !0;
    }
  }
  return !1;
}
function je(s, e) {
  const {
    doc: t,
    mirror: r,
    blockClass: i,
    blockSelector: n,
    maskTextClass: o,
    maskTextSelector: l,
    skipChild: a = !1,
    inlineStylesheet: u = !0,
    maskInputOptions: c = {},
    maskTextFn: h,
    maskInputFn: m,
    slimDOMOptions: d,
    dataURLOptions: g = {},
    inlineImages: p = !1,
    recordCanvas: f = !1,
    onSerialize: S,
    onIframeLoad: v,
    iframeLoadTimeout: y = 5e3,
    onStylesheetLoad: C,
    stylesheetLoadTimeout: x = 5e3,
    keepIframeSrcFn: R = () => !1,
    newlyAddedElement: O = !1,
  } = e;
  let { needsMask: b } = e,
    { preserveWhiteSpace: T = !0 } = e;
  b || (b = wn(s, o, l, b === void 0));
  const $ = Ya(s, {
    doc: t,
    mirror: r,
    blockClass: i,
    blockSelector: n,
    needsMask: b,
    inlineStylesheet: u,
    maskInputOptions: c,
    maskTextFn: h,
    maskInputFn: m,
    dataURLOptions: g,
    inlineImages: p,
    recordCanvas: f,
    keepIframeSrcFn: R,
    newlyAddedElement: O,
  });
  if (!$) return null;
  let Q;
  r.hasNode(s)
    ? (Q = r.getId(s))
    : Ka($, d) ||
      (!T &&
        $.type === ee.Text &&
        !$.isStyle &&
        !$.textContent.replace(/^\s+|\s+$/gm, "").length)
    ? (Q = ct)
    : (Q = mn());
  const I = Object.assign($, { id: Q });
  if ((r.add(s, I), Q === ct)) return null;
  S && S(s);
  let K = !a;
  if (I.type === ee.Element) {
    (K = K && !I.needBlock), delete I.needBlock;
    const L = se.shadowRoot(s);
    L && lt(L) && (I.isShadowHost = !0);
  }
  if ((I.type === ee.Document || I.type === ee.Element) && K) {
    d.headWhitespace &&
      I.type === ee.Element &&
      I.tagName === "head" &&
      (T = !1);
    const L = {
      doc: t,
      mirror: r,
      blockClass: i,
      blockSelector: n,
      needsMask: b,
      maskTextClass: o,
      maskTextSelector: l,
      skipChild: a,
      inlineStylesheet: u,
      maskInputOptions: c,
      maskTextFn: h,
      maskInputFn: m,
      slimDOMOptions: d,
      dataURLOptions: g,
      inlineImages: p,
      recordCanvas: f,
      preserveWhiteSpace: T,
      onSerialize: S,
      onIframeLoad: v,
      iframeLoadTimeout: y,
      onStylesheetLoad: C,
      stylesheetLoadTimeout: x,
      keepIframeSrcFn: R,
    };
    if (
      !(
        I.type === ee.Element &&
        I.tagName === "textarea" &&
        I.attributes.value !== void 0
      )
    )
      for (const D of Array.from(se.childNodes(s))) {
        const V = je(D, L);
        V && I.childNodes.push(V);
      }
    let P = null;
    if (hn(s) && (P = se.shadowRoot(s)))
      for (const D of Array.from(se.childNodes(P))) {
        const V = je(D, L);
        V && (lt(P) && (V.isShadow = !0), I.childNodes.push(V));
      }
  }
  const Z = se.parentNode(s);
  return (
    Z && at(Z) && lt(Z) && (I.isShadow = !0),
    I.type === ee.Element &&
      I.tagName === "iframe" &&
      Va(
        s,
        () => {
          const L = s.contentDocument;
          if (L && v) {
            const P = je(L, {
              doc: L,
              mirror: r,
              blockClass: i,
              blockSelector: n,
              needsMask: b,
              maskTextClass: o,
              maskTextSelector: l,
              skipChild: !1,
              inlineStylesheet: u,
              maskInputOptions: c,
              maskTextFn: h,
              maskInputFn: m,
              slimDOMOptions: d,
              dataURLOptions: g,
              inlineImages: p,
              recordCanvas: f,
              preserveWhiteSpace: T,
              onSerialize: S,
              onIframeLoad: v,
              iframeLoadTimeout: y,
              onStylesheetLoad: C,
              stylesheetLoadTimeout: x,
              keepIframeSrcFn: R,
            });
            P && v(s, P);
          }
        },
        y
      ),
    I.type === ee.Element &&
      I.tagName === "link" &&
      typeof I.attributes.rel == "string" &&
      (I.attributes.rel === "stylesheet" ||
        (I.attributes.rel === "preload" &&
          typeof I.attributes.href == "string" &&
          dn(I.attributes.href) === "css")) &&
      Ha(
        s,
        () => {
          if (C) {
            const L = je(s, {
              doc: t,
              mirror: r,
              blockClass: i,
              blockSelector: n,
              needsMask: b,
              maskTextClass: o,
              maskTextSelector: l,
              skipChild: !1,
              inlineStylesheet: u,
              maskInputOptions: c,
              maskTextFn: h,
              maskInputFn: m,
              slimDOMOptions: d,
              dataURLOptions: g,
              inlineImages: p,
              recordCanvas: f,
              preserveWhiteSpace: T,
              onSerialize: S,
              onIframeLoad: v,
              iframeLoadTimeout: y,
              onStylesheetLoad: C,
              stylesheetLoadTimeout: x,
              keepIframeSrcFn: R,
            });
            L && C(s, L);
          }
        },
        x
      ),
    I
  );
}
function Qa(s, e) {
  const {
    mirror: t = new pn(),
    blockClass: r = "rr-block",
    blockSelector: i = null,
    maskTextClass: n = "rr-mask",
    maskTextSelector: o = null,
    inlineStylesheet: l = !0,
    inlineImages: a = !1,
    recordCanvas: u = !1,
    maskAllInputs: c = !1,
    maskTextFn: h,
    maskInputFn: m,
    slimDOM: d = !1,
    dataURLOptions: g,
    preserveWhiteSpace: p,
    onSerialize: f,
    onIframeLoad: S,
    iframeLoadTimeout: v,
    onStylesheetLoad: y,
    stylesheetLoadTimeout: C,
    keepIframeSrcFn: x = () => !1,
  } = e || {};
  return je(s, {
    doc: s,
    mirror: t,
    blockClass: r,
    blockSelector: i,
    maskTextClass: n,
    maskTextSelector: o,
    skipChild: !1,
    inlineStylesheet: l,
    maskInputOptions:
      c === !0
        ? {
            color: !0,
            date: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0,
            textarea: !0,
            select: !0,
            password: !0,
          }
        : c === !1
        ? { password: !0 }
        : c,
    maskTextFn: h,
    maskInputFn: m,
    slimDOMOptions:
      d === !0 || d === "all"
        ? {
            script: !0,
            comment: !0,
            headFavicon: !0,
            headWhitespace: !0,
            headMetaDescKeywords: d === "all",
            headMetaSocial: !0,
            headMetaRobots: !0,
            headMetaHttpEquiv: !0,
            headMetaAuthorship: !0,
            headMetaVerification: !0,
          }
        : d === !1
        ? {}
        : d,
    dataURLOptions: g,
    inlineImages: a,
    recordCanvas: u,
    preserveWhiteSpace: p,
    onSerialize: f,
    onIframeLoad: S,
    iframeLoadTimeout: v,
    onStylesheetLoad: y,
    stylesheetLoadTimeout: C,
    keepIframeSrcFn: x,
    newlyAddedElement: !1,
  });
}
function qa(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default")
    ? s.default
    : s;
}
function el(s) {
  if (s.__esModule) return s;
  var e = s.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return (
    Object.defineProperty(t, "__esModule", { value: !0 }),
    Object.keys(s).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(s, r);
      Object.defineProperty(
        t,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return s[r];
              },
            }
      );
    }),
    t
  );
}
var _s = { exports: {} },
  W = String,
  bn = function () {
    return {
      isColorSupported: !1,
      reset: W,
      bold: W,
      dim: W,
      italic: W,
      underline: W,
      inverse: W,
      hidden: W,
      strikethrough: W,
      black: W,
      red: W,
      green: W,
      yellow: W,
      blue: W,
      magenta: W,
      cyan: W,
      white: W,
      gray: W,
      bgBlack: W,
      bgRed: W,
      bgGreen: W,
      bgYellow: W,
      bgBlue: W,
      bgMagenta: W,
      bgCyan: W,
      bgWhite: W,
    };
  };
_s.exports = bn();
_s.exports.createColors = bn;
var tl = _s.exports;
const rl = {},
  sl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: rl },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  be = el(sl);
let di = tl,
  mi = be,
  Zr = class vn extends Error {
    constructor(e, t, r, i, n, o) {
      super(e),
        (this.name = "CssSyntaxError"),
        (this.reason = e),
        n && (this.file = n),
        i && (this.source = i),
        o && (this.plugin = o),
        typeof t < "u" &&
          typeof r < "u" &&
          (typeof t == "number"
            ? ((this.line = t), (this.column = r))
            : ((this.line = t.line),
              (this.column = t.column),
              (this.endLine = r.line),
              (this.endColumn = r.column))),
        this.setMessage(),
        Error.captureStackTrace && Error.captureStackTrace(this, vn);
    }
    setMessage() {
      (this.message = this.plugin ? this.plugin + ": " : ""),
        (this.message += this.file ? this.file : "<css input>"),
        typeof this.line < "u" &&
          (this.message += ":" + this.line + ":" + this.column),
        (this.message += ": " + this.reason);
    }
    showSourceCode(e) {
      if (!this.source) return "";
      let t = this.source;
      e == null && (e = di.isColorSupported), mi && e && (t = mi(t));
      let r = t.split(/\r?\n/),
        i = Math.max(this.line - 3, 0),
        n = Math.min(this.line + 2, r.length),
        o = String(n).length,
        l,
        a;
      if (e) {
        let { bold: u, gray: c, red: h } = di.createColors(!0);
        (l = (m) => u(h(m))), (a = (m) => c(m));
      } else l = a = (u) => u;
      return r.slice(i, n).map((u, c) => {
        let h = i + 1 + c,
          m = " " + (" " + h).slice(-o) + " | ";
        if (h === this.line) {
          let d =
            a(m.replace(/\d/g, " ")) +
            u.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return (
            l(">") +
            a(m) +
            u +
            `
 ` +
            d +
            l("^")
          );
        }
        return " " + a(m) + u;
      }).join(`
`);
    }
    toString() {
      let e = this.showSourceCode();
      return (
        e &&
          (e =
            `

` +
            e +
            `
`),
        this.name + ": " + this.message + e
      );
    }
  };
var Fs = Zr;
Zr.default = Zr;
var Ct = {};
Ct.isClean = Symbol("isClean");
Ct.my = Symbol("my");
const gi = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1,
};
function il(s) {
  return s[0].toUpperCase() + s.slice(1);
}
let Jr = class {
  constructor(e) {
    this.builder = e;
  }
  atrule(e, t) {
    let r = "@" + e.name,
      i = e.params ? this.rawValue(e, "params") : "";
    if (
      (typeof e.raws.afterName < "u"
        ? (r += e.raws.afterName)
        : i && (r += " "),
      e.nodes)
    )
      this.block(e, r + i);
    else {
      let n = (e.raws.between || "") + (t ? ";" : "");
      this.builder(r + i + n, e);
    }
  }
  beforeAfter(e, t) {
    let r;
    e.type === "decl"
      ? (r = this.raw(e, null, "beforeDecl"))
      : e.type === "comment"
      ? (r = this.raw(e, null, "beforeComment"))
      : t === "before"
      ? (r = this.raw(e, null, "beforeRule"))
      : (r = this.raw(e, null, "beforeClose"));
    let i = e.parent,
      n = 0;
    for (; i && i.type !== "root"; ) (n += 1), (i = i.parent);
    if (
      r.includes(`
`)
    ) {
      let o = this.raw(e, null, "indent");
      if (o.length) for (let l = 0; l < n; l++) r += o;
    }
    return r;
  }
  block(e, t) {
    let r = this.raw(e, "between", "beforeOpen");
    this.builder(t + r + "{", e, "start");
    let i;
    e.nodes && e.nodes.length
      ? (this.body(e), (i = this.raw(e, "after")))
      : (i = this.raw(e, "after", "emptyBody")),
      i && this.builder(i),
      this.builder("}", e, "end");
  }
  body(e) {
    let t = e.nodes.length - 1;
    for (; t > 0 && e.nodes[t].type === "comment"; ) t -= 1;
    let r = this.raw(e, "semicolon");
    for (let i = 0; i < e.nodes.length; i++) {
      let n = e.nodes[i],
        o = this.raw(n, "before");
      o && this.builder(o), this.stringify(n, t !== i || r);
    }
  }
  comment(e) {
    let t = this.raw(e, "left", "commentLeft"),
      r = this.raw(e, "right", "commentRight");
    this.builder("/*" + t + e.text + r + "*/", e);
  }
  decl(e, t) {
    let r = this.raw(e, "between", "colon"),
      i = e.prop + r + this.rawValue(e, "value");
    e.important && (i += e.raws.important || " !important"),
      t && (i += ";"),
      this.builder(i, e);
  }
  document(e) {
    this.body(e);
  }
  raw(e, t, r) {
    let i;
    if ((r || (r = t), t && ((i = e.raws[t]), typeof i < "u"))) return i;
    let n = e.parent;
    if (
      r === "before" &&
      (!n ||
        (n.type === "root" && n.first === e) ||
        (n && n.type === "document"))
    )
      return "";
    if (!n) return gi[r];
    let o = e.root();
    if ((o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] < "u"))
      return o.rawCache[r];
    if (r === "before" || r === "after") return this.beforeAfter(e, r);
    {
      let l = "raw" + il(r);
      this[l]
        ? (i = this[l](o, e))
        : o.walk((a) => {
            if (((i = a.raws[t]), typeof i < "u")) return !1;
          });
    }
    return typeof i > "u" && (i = gi[r]), (o.rawCache[r] = i), i;
  }
  rawBeforeClose(e) {
    let t;
    return (
      e.walk((r) => {
        if (r.nodes && r.nodes.length > 0 && typeof r.raws.after < "u")
          return (
            (t = r.raws.after),
            t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")),
            !1
          );
      }),
      t && (t = t.replace(/\S/g, "")),
      t
    );
  }
  rawBeforeComment(e, t) {
    let r;
    return (
      e.walkComments((i) => {
        if (typeof i.raws.before < "u")
          return (
            (r = i.raws.before),
            r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
            !1
          );
      }),
      typeof r > "u"
        ? (r = this.raw(t, null, "beforeDecl"))
        : r && (r = r.replace(/\S/g, "")),
      r
    );
  }
  rawBeforeDecl(e, t) {
    let r;
    return (
      e.walkDecls((i) => {
        if (typeof i.raws.before < "u")
          return (
            (r = i.raws.before),
            r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
            !1
          );
      }),
      typeof r > "u"
        ? (r = this.raw(t, null, "beforeRule"))
        : r && (r = r.replace(/\S/g, "")),
      r
    );
  }
  rawBeforeOpen(e) {
    let t;
    return (
      e.walk((r) => {
        if (r.type !== "decl" && ((t = r.raws.between), typeof t < "u"))
          return !1;
      }),
      t
    );
  }
  rawBeforeRule(e) {
    let t;
    return (
      e.walk((r) => {
        if (
          r.nodes &&
          (r.parent !== e || e.first !== r) &&
          typeof r.raws.before < "u"
        )
          return (
            (t = r.raws.before),
            t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")),
            !1
          );
      }),
      t && (t = t.replace(/\S/g, "")),
      t
    );
  }
  rawColon(e) {
    let t;
    return (
      e.walkDecls((r) => {
        if (typeof r.raws.between < "u")
          return (t = r.raws.between.replace(/[^\s:]/g, "")), !1;
      }),
      t
    );
  }
  rawEmptyBody(e) {
    let t;
    return (
      e.walk((r) => {
        if (
          r.nodes &&
          r.nodes.length === 0 &&
          ((t = r.raws.after), typeof t < "u")
        )
          return !1;
      }),
      t
    );
  }
  rawIndent(e) {
    if (e.raws.indent) return e.raws.indent;
    let t;
    return (
      e.walk((r) => {
        let i = r.parent;
        if (
          i &&
          i !== e &&
          i.parent &&
          i.parent === e &&
          typeof r.raws.before < "u"
        ) {
          let n = r.raws.before.split(`
`);
          return (t = n[n.length - 1]), (t = t.replace(/\S/g, "")), !1;
        }
      }),
      t
    );
  }
  rawSemicolon(e) {
    let t;
    return (
      e.walk((r) => {
        if (
          r.nodes &&
          r.nodes.length &&
          r.last.type === "decl" &&
          ((t = r.raws.semicolon), typeof t < "u")
        )
          return !1;
      }),
      t
    );
  }
  rawValue(e, t) {
    let r = e[t],
      i = e.raws[t];
    return i && i.value === r ? i.raw : r;
  }
  root(e) {
    this.body(e), e.raws.after && this.builder(e.raws.after);
  }
  rule(e) {
    this.block(e, this.rawValue(e, "selector")),
      e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
  }
  stringify(e, t) {
    if (!this[e.type])
      throw new Error(
        "Unknown AST node type " +
          e.type +
          ". Maybe you need to change PostCSS stringifier."
      );
    this[e.type](e, t);
  }
};
var Sn = Jr;
Jr.default = Jr;
let nl = Sn;
function Xr(s, e) {
  new nl(e).stringify(s);
}
var yr = Xr;
Xr.default = Xr;
let { isClean: At, my: ol } = Ct,
  al = Fs,
  ll = Sn,
  ul = yr;
function Kr(s, e) {
  let t = new s.constructor();
  for (let r in s) {
    if (!Object.prototype.hasOwnProperty.call(s, r) || r === "proxyCache")
      continue;
    let i = s[r],
      n = typeof i;
    r === "parent" && n === "object"
      ? e && (t[r] = e)
      : r === "source"
      ? (t[r] = i)
      : Array.isArray(i)
      ? (t[r] = i.map((o) => Kr(o, t)))
      : (n === "object" && i !== null && (i = Kr(i)), (t[r] = i));
  }
  return t;
}
let Qr = class {
  constructor(e = {}) {
    (this.raws = {}), (this[At] = !1), (this[ol] = !0);
    for (let t in e)
      if (t === "nodes") {
        this.nodes = [];
        for (let r of e[t])
          typeof r.clone == "function"
            ? this.append(r.clone())
            : this.append(r);
      } else this[t] = e[t];
  }
  addToError(e) {
    if (
      ((e.postcssNode = this),
      e.stack && this.source && /\n\s{4}at /.test(e.stack))
    ) {
      let t = this.source;
      e.stack = e.stack.replace(
        /\n\s{4}at /,
        `$&${t.input.from}:${t.start.line}:${t.start.column}$&`
      );
    }
    return e;
  }
  after(e) {
    return this.parent.insertAfter(this, e), this;
  }
  assign(e = {}) {
    for (let t in e) this[t] = e[t];
    return this;
  }
  before(e) {
    return this.parent.insertBefore(this, e), this;
  }
  cleanRaws(e) {
    delete this.raws.before,
      delete this.raws.after,
      e || delete this.raws.between;
  }
  clone(e = {}) {
    let t = Kr(this);
    for (let r in e) t[r] = e[r];
    return t;
  }
  cloneAfter(e = {}) {
    let t = this.clone(e);
    return this.parent.insertAfter(this, t), t;
  }
  cloneBefore(e = {}) {
    let t = this.clone(e);
    return this.parent.insertBefore(this, t), t;
  }
  error(e, t = {}) {
    if (this.source) {
      let { end: r, start: i } = this.rangeBy(t);
      return this.source.input.error(
        e,
        { column: i.column, line: i.line },
        { column: r.column, line: r.line },
        t
      );
    }
    return new al(e);
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf"
          ? e
          : t === "root"
          ? () => e.root().toProxy()
          : e[t];
      },
      set(e, t, r) {
        return (
          e[t] === r ||
            ((e[t] = r),
            (t === "prop" ||
              t === "value" ||
              t === "name" ||
              t === "params" ||
              t === "important" ||
              t === "text") &&
              e.markDirty()),
          !0
        );
      },
    };
  }
  markDirty() {
    if (this[At]) {
      this[At] = !1;
      let e = this;
      for (; (e = e.parent); ) e[At] = !1;
    }
  }
  next() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e + 1];
  }
  positionBy(e, t) {
    let r = this.source.start;
    if (e.index) r = this.positionInside(e.index, t);
    else if (e.word) {
      t = this.toString();
      let i = t.indexOf(e.word);
      i !== -1 && (r = this.positionInside(i, t));
    }
    return r;
  }
  positionInside(e, t) {
    let r = t || this.toString(),
      i = this.source.start.column,
      n = this.source.start.line;
    for (let o = 0; o < e; o++)
      r[o] ===
      `
`
        ? ((i = 1), (n += 1))
        : (i += 1);
    return { column: i, line: n };
  }
  prev() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e - 1];
  }
  rangeBy(e) {
    let t = { column: this.source.start.column, line: this.source.start.line },
      r = this.source.end
        ? { column: this.source.end.column + 1, line: this.source.end.line }
        : { column: t.column + 1, line: t.line };
    if (e.word) {
      let i = this.toString(),
        n = i.indexOf(e.word);
      n !== -1 &&
        ((t = this.positionInside(n, i)),
        (r = this.positionInside(n + e.word.length, i)));
    } else
      e.start
        ? (t = { column: e.start.column, line: e.start.line })
        : e.index && (t = this.positionInside(e.index)),
        e.end
          ? (r = { column: e.end.column, line: e.end.line })
          : typeof e.endIndex == "number"
          ? (r = this.positionInside(e.endIndex))
          : e.index && (r = this.positionInside(e.index + 1));
    return (
      (r.line < t.line || (r.line === t.line && r.column <= t.column)) &&
        (r = { column: t.column + 1, line: t.line }),
      { end: r, start: t }
    );
  }
  raw(e, t) {
    return new ll().raw(this, e, t);
  }
  remove() {
    return (
      this.parent && this.parent.removeChild(this), (this.parent = void 0), this
    );
  }
  replaceWith(...e) {
    if (this.parent) {
      let t = this,
        r = !1;
      for (let i of e)
        i === this
          ? (r = !0)
          : r
          ? (this.parent.insertAfter(t, i), (t = i))
          : this.parent.insertBefore(t, i);
      r || this.remove();
    }
    return this;
  }
  root() {
    let e = this;
    for (; e.parent && e.parent.type !== "document"; ) e = e.parent;
    return e;
  }
  toJSON(e, t) {
    let r = {},
      i = t == null;
    t = t || new Map();
    let n = 0;
    for (let o in this) {
      if (
        !Object.prototype.hasOwnProperty.call(this, o) ||
        o === "parent" ||
        o === "proxyCache"
      )
        continue;
      let l = this[o];
      if (Array.isArray(l))
        r[o] = l.map((a) =>
          typeof a == "object" && a.toJSON ? a.toJSON(null, t) : a
        );
      else if (typeof l == "object" && l.toJSON) r[o] = l.toJSON(null, t);
      else if (o === "source") {
        let a = t.get(l.input);
        a == null && ((a = n), t.set(l.input, n), n++),
          (r[o] = { end: l.end, inputId: a, start: l.start });
      } else r[o] = l;
    }
    return i && (r.inputs = [...t.keys()].map((o) => o.toJSON())), r;
  }
  toProxy() {
    return (
      this.proxyCache ||
        (this.proxyCache = new Proxy(this, this.getProxyProcessor())),
      this.proxyCache
    );
  }
  toString(e = ul) {
    e.stringify && (e = e.stringify);
    let t = "";
    return (
      e(this, (r) => {
        t += r;
      }),
      t
    );
  }
  warn(e, t, r) {
    let i = { node: this };
    for (let n in r) i[n] = r[n];
    return e.warn(t, i);
  }
  get proxyOf() {
    return this;
  }
};
var wr = Qr;
Qr.default = Qr;
let cl = wr,
  qr = class extends cl {
    constructor(e) {
      e &&
        typeof e.value < "u" &&
        typeof e.value != "string" &&
        (e = { ...e, value: String(e.value) }),
        super(e),
        (this.type = "decl");
    }
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
  };
var br = qr;
qr.default = qr;
let hl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",
  fl = (s = 21) => {
    let e = "",
      t = s;
    for (; t--; ) e += hl[(Math.random() * 64) | 0];
    return e;
  };
var pl = { nanoid: fl };
let { SourceMapConsumer: yi, SourceMapGenerator: wi } = be,
  { existsSync: dl, readFileSync: ml } = be,
  { dirname: Pr, join: gl } = be;
function yl(s) {
  return Buffer ? Buffer.from(s, "base64").toString() : window.atob(s);
}
let es = class {
  constructor(e, t) {
    if (t.map === !1) return;
    this.loadAnnotation(e),
      (this.inline = this.startWith(this.annotation, "data:"));
    let r = t.map ? t.map.prev : void 0,
      i = this.loadMap(t.from, r);
    !this.mapFile && t.from && (this.mapFile = t.from),
      this.mapFile && (this.root = Pr(this.mapFile)),
      i && (this.text = i);
  }
  consumer() {
    return (
      this.consumerCache || (this.consumerCache = new yi(this.text)),
      this.consumerCache
    );
  }
  decodeInline(e) {
    let t = /^data:application\/json;charset=utf-?8;base64,/,
      r = /^data:application\/json;base64,/,
      i = /^data:application\/json;charset=utf-?8,/,
      n = /^data:application\/json,/;
    if (i.test(e) || n.test(e))
      return decodeURIComponent(e.substr(RegExp.lastMatch.length));
    if (t.test(e) || r.test(e)) return yl(e.substr(RegExp.lastMatch.length));
    let o = e.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + o);
  }
  getAnnotationURL(e) {
    return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(e) {
    return typeof e != "object"
      ? !1
      : typeof e.mappings == "string" ||
          typeof e._mappings == "string" ||
          Array.isArray(e.sections);
  }
  loadAnnotation(e) {
    let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
    if (!t) return;
    let r = e.lastIndexOf(t.pop()),
      i = e.indexOf("*/", r);
    r > -1 &&
      i > -1 &&
      (this.annotation = this.getAnnotationURL(e.substring(r, i)));
  }
  loadFile(e) {
    if (((this.root = Pr(e)), dl(e)))
      return (this.mapFile = e), ml(e, "utf-8").toString().trim();
  }
  loadMap(e, t) {
    if (t === !1) return !1;
    if (t) {
      if (typeof t == "string") return t;
      if (typeof t == "function") {
        let r = t(e);
        if (r) {
          let i = this.loadFile(r);
          if (!i)
            throw new Error(
              "Unable to load previous source map: " + r.toString()
            );
          return i;
        }
      } else {
        if (t instanceof yi) return wi.fromSourceMap(t).toString();
        if (t instanceof wi) return t.toString();
        if (this.isMap(t)) return JSON.stringify(t);
        throw new Error(
          "Unsupported previous source map format: " + t.toString()
        );
      }
    } else {
      if (this.inline) return this.decodeInline(this.annotation);
      if (this.annotation) {
        let r = this.annotation;
        return e && (r = gl(Pr(e), r)), this.loadFile(r);
      }
    }
  }
  startWith(e, t) {
    return e ? e.substr(0, t.length) === t : !1;
  }
  withContent() {
    return !!(
      this.consumer().sourcesContent &&
      this.consumer().sourcesContent.length > 0
    );
  }
};
var Cn = es;
es.default = es;
let { SourceMapConsumer: wl, SourceMapGenerator: bl } = be,
  { fileURLToPath: bi, pathToFileURL: Et } = be,
  { isAbsolute: ts, resolve: rs } = be,
  { nanoid: vl } = pl,
  Tr = be,
  vi = Fs,
  Sl = Cn,
  Lr = Symbol("fromOffsetCache"),
  Cl = !!(wl && bl),
  Si = !!(rs && ts),
  or = class {
    constructor(e, t = {}) {
      if (e === null || typeof e > "u" || (typeof e == "object" && !e.toString))
        throw new Error(`PostCSS received ${e} instead of CSS string`);
      if (
        ((this.css = e.toString()),
        this.css[0] === "\uFEFF" || this.css[0] === "￾"
          ? ((this.hasBOM = !0), (this.css = this.css.slice(1)))
          : (this.hasBOM = !1),
        t.from &&
          (!Si || /^\w+:\/\//.test(t.from) || ts(t.from)
            ? (this.file = t.from)
            : (this.file = rs(t.from))),
        Si && Cl)
      ) {
        let r = new Sl(this.css, t);
        if (r.text) {
          this.map = r;
          let i = r.consumer().file;
          !this.file && i && (this.file = this.mapResolve(i));
        }
      }
      this.file || (this.id = "<input css " + vl(6) + ">"),
        this.map && (this.map.file = this.from);
    }
    error(e, t, r, i = {}) {
      let n, o, l;
      if (t && typeof t == "object") {
        let u = t,
          c = r;
        if (typeof u.offset == "number") {
          let h = this.fromOffset(u.offset);
          (t = h.line), (r = h.col);
        } else (t = u.line), (r = u.column);
        if (typeof c.offset == "number") {
          let h = this.fromOffset(c.offset);
          (o = h.line), (l = h.col);
        } else (o = c.line), (l = c.column);
      } else if (!r) {
        let u = this.fromOffset(t);
        (t = u.line), (r = u.col);
      }
      let a = this.origin(t, r, o, l);
      return (
        a
          ? (n = new vi(
              e,
              a.endLine === void 0
                ? a.line
                : { column: a.column, line: a.line },
              a.endLine === void 0
                ? a.column
                : { column: a.endColumn, line: a.endLine },
              a.source,
              a.file,
              i.plugin
            ))
          : (n = new vi(
              e,
              o === void 0 ? t : { column: r, line: t },
              o === void 0 ? r : { column: l, line: o },
              this.css,
              this.file,
              i.plugin
            )),
        (n.input = {
          column: r,
          endColumn: l,
          endLine: o,
          line: t,
          source: this.css,
        }),
        this.file &&
          (Et && (n.input.url = Et(this.file).toString()),
          (n.input.file = this.file)),
        n
      );
    }
    fromOffset(e) {
      let t, r;
      if (this[Lr]) r = this[Lr];
      else {
        let n = this.css.split(`
`);
        r = new Array(n.length);
        let o = 0;
        for (let l = 0, a = n.length; l < a; l++)
          (r[l] = o), (o += n[l].length + 1);
        this[Lr] = r;
      }
      t = r[r.length - 1];
      let i = 0;
      if (e >= t) i = r.length - 1;
      else {
        let n = r.length - 2,
          o;
        for (; i < n; )
          if (((o = i + ((n - i) >> 1)), e < r[o])) n = o - 1;
          else if (e >= r[o + 1]) i = o + 1;
          else {
            i = o;
            break;
          }
      }
      return { col: e - r[i] + 1, line: i + 1 };
    }
    mapResolve(e) {
      return /^\w+:\/\//.test(e)
        ? e
        : rs(this.map.consumer().sourceRoot || this.map.root || ".", e);
    }
    origin(e, t, r, i) {
      if (!this.map) return !1;
      let n = this.map.consumer(),
        o = n.originalPositionFor({ column: t, line: e });
      if (!o.source) return !1;
      let l;
      typeof r == "number" &&
        (l = n.originalPositionFor({ column: i, line: r }));
      let a;
      ts(o.source)
        ? (a = Et(o.source))
        : (a = new URL(
            o.source,
            this.map.consumer().sourceRoot || Et(this.map.mapFile)
          ));
      let u = {
        column: o.column,
        endColumn: l && l.column,
        endLine: l && l.line,
        line: o.line,
        url: a.toString(),
      };
      if (a.protocol === "file:")
        if (bi) u.file = bi(a);
        else
          throw new Error(
            "file: protocol is not available in this PostCSS build"
          );
      let c = n.sourceContentFor(o.source);
      return c && (u.source = c), u;
    }
    toJSON() {
      let e = {};
      for (let t of ["hasBOM", "css", "file", "id"])
        this[t] != null && (e[t] = this[t]);
      return (
        this.map &&
          ((e.map = { ...this.map }),
          e.map.consumerCache && (e.map.consumerCache = void 0)),
        e
      );
    }
    get from() {
      return this.file || this.id;
    }
  };
var vr = or;
or.default = or;
Tr && Tr.registerInput && Tr.registerInput(or);
let { SourceMapConsumer: In, SourceMapGenerator: Xt } = be,
  { dirname: Kt, relative: xn, resolve: Rn, sep: On } = be,
  { pathToFileURL: Ci } = be,
  Il = vr,
  xl = !!(In && Xt),
  Rl = !!(Kt && Rn && xn && On),
  Ol = class {
    constructor(e, t, r, i) {
      (this.stringify = e),
        (this.mapOpts = r.map || {}),
        (this.root = t),
        (this.opts = r),
        (this.css = i),
        (this.originalCSS = i),
        (this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute),
        (this.memoizedFileURLs = new Map()),
        (this.memoizedPaths = new Map()),
        (this.memoizedURLs = new Map());
    }
    addAnnotation() {
      let e;
      this.isInline()
        ? (e =
            "data:application/json;base64," +
            this.toBase64(this.map.toString()))
        : typeof this.mapOpts.annotation == "string"
        ? (e = this.mapOpts.annotation)
        : typeof this.mapOpts.annotation == "function"
        ? (e = this.mapOpts.annotation(this.opts.to, this.root))
        : (e = this.outputFile() + ".map");
      let t = `
`;
      this.css.includes(`\r
`) &&
        (t = `\r
`),
        (this.css += t + "/*# sourceMappingURL=" + e + " */");
    }
    applyPrevMaps() {
      for (let e of this.previous()) {
        let t = this.toUrl(this.path(e.file)),
          r = e.root || Kt(e.file),
          i;
        this.mapOpts.sourcesContent === !1
          ? ((i = new In(e.text)),
            i.sourcesContent && (i.sourcesContent = null))
          : (i = e.consumer()),
          this.map.applySourceMap(i, t, this.toUrl(this.path(r)));
      }
    }
    clearAnnotation() {
      if (this.mapOpts.annotation !== !1)
        if (this.root) {
          let e;
          for (let t = this.root.nodes.length - 1; t >= 0; t--)
            (e = this.root.nodes[t]),
              e.type === "comment" &&
                e.text.indexOf("# sourceMappingURL=") === 0 &&
                this.root.removeChild(t);
        } else
          this.css &&
            (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
    }
    generate() {
      if ((this.clearAnnotation(), Rl && xl && this.isMap()))
        return this.generateMap();
      {
        let e = "";
        return (
          this.stringify(this.root, (t) => {
            e += t;
          }),
          [e]
        );
      }
    }
    generateMap() {
      if (this.root) this.generateString();
      else if (this.previous().length === 1) {
        let e = this.previous()[0].consumer();
        (e.file = this.outputFile()),
          (this.map = Xt.fromSourceMap(e, { ignoreInvalidMapping: !0 }));
      } else
        (this.map = new Xt({
          file: this.outputFile(),
          ignoreInvalidMapping: !0,
        })),
          this.map.addMapping({
            generated: { column: 0, line: 1 },
            original: { column: 0, line: 1 },
            source: this.opts.from
              ? this.toUrl(this.path(this.opts.from))
              : "<no source>",
          });
      return (
        this.isSourcesContent() && this.setSourcesContent(),
        this.root && this.previous().length > 0 && this.applyPrevMaps(),
        this.isAnnotation() && this.addAnnotation(),
        this.isInline() ? [this.css] : [this.css, this.map]
      );
    }
    generateString() {
      (this.css = ""),
        (this.map = new Xt({
          file: this.outputFile(),
          ignoreInvalidMapping: !0,
        }));
      let e = 1,
        t = 1,
        r = "<no source>",
        i = {
          generated: { column: 0, line: 0 },
          original: { column: 0, line: 0 },
          source: "",
        },
        n,
        o;
      this.stringify(this.root, (l, a, u) => {
        if (
          ((this.css += l),
          a &&
            u !== "end" &&
            ((i.generated.line = e),
            (i.generated.column = t - 1),
            a.source && a.source.start
              ? ((i.source = this.sourcePath(a)),
                (i.original.line = a.source.start.line),
                (i.original.column = a.source.start.column - 1),
                this.map.addMapping(i))
              : ((i.source = r),
                (i.original.line = 1),
                (i.original.column = 0),
                this.map.addMapping(i))),
          (n = l.match(/\n/g)),
          n
            ? ((e += n.length),
              (o = l.lastIndexOf(`
`)),
              (t = l.length - o))
            : (t += l.length),
          a && u !== "start")
        ) {
          let c = a.parent || { raws: {} };
          (!(a.type === "decl" || (a.type === "atrule" && !a.nodes)) ||
            a !== c.last ||
            c.raws.semicolon) &&
            (a.source && a.source.end
              ? ((i.source = this.sourcePath(a)),
                (i.original.line = a.source.end.line),
                (i.original.column = a.source.end.column - 1),
                (i.generated.line = e),
                (i.generated.column = t - 2),
                this.map.addMapping(i))
              : ((i.source = r),
                (i.original.line = 1),
                (i.original.column = 0),
                (i.generated.line = e),
                (i.generated.column = t - 1),
                this.map.addMapping(i)));
        }
      });
    }
    isAnnotation() {
      return this.isInline()
        ? !0
        : typeof this.mapOpts.annotation < "u"
        ? this.mapOpts.annotation
        : this.previous().length
        ? this.previous().some((e) => e.annotation)
        : !0;
    }
    isInline() {
      if (typeof this.mapOpts.inline < "u") return this.mapOpts.inline;
      let e = this.mapOpts.annotation;
      return typeof e < "u" && e !== !0
        ? !1
        : this.previous().length
        ? this.previous().some((t) => t.inline)
        : !0;
    }
    isMap() {
      return typeof this.opts.map < "u"
        ? !!this.opts.map
        : this.previous().length > 0;
    }
    isSourcesContent() {
      return typeof this.mapOpts.sourcesContent < "u"
        ? this.mapOpts.sourcesContent
        : this.previous().length
        ? this.previous().some((e) => e.withContent())
        : !0;
    }
    outputFile() {
      return this.opts.to
        ? this.path(this.opts.to)
        : this.opts.from
        ? this.path(this.opts.from)
        : "to.css";
    }
    path(e) {
      if (
        this.mapOpts.absolute ||
        e.charCodeAt(0) === 60 ||
        /^\w+:\/\//.test(e)
      )
        return e;
      let t = this.memoizedPaths.get(e);
      if (t) return t;
      let r = this.opts.to ? Kt(this.opts.to) : ".";
      typeof this.mapOpts.annotation == "string" &&
        (r = Kt(Rn(r, this.mapOpts.annotation)));
      let i = xn(r, e);
      return this.memoizedPaths.set(e, i), i;
    }
    previous() {
      if (!this.previousMaps)
        if (((this.previousMaps = []), this.root))
          this.root.walk((e) => {
            if (e.source && e.source.input.map) {
              let t = e.source.input.map;
              this.previousMaps.includes(t) || this.previousMaps.push(t);
            }
          });
        else {
          let e = new Il(this.originalCSS, this.opts);
          e.map && this.previousMaps.push(e.map);
        }
      return this.previousMaps;
    }
    setSourcesContent() {
      let e = {};
      if (this.root)
        this.root.walk((t) => {
          if (t.source) {
            let r = t.source.input.from;
            if (r && !e[r]) {
              e[r] = !0;
              let i = this.usesFileUrls
                ? this.toFileUrl(r)
                : this.toUrl(this.path(r));
              this.map.setSourceContent(i, t.source.input.css);
            }
          }
        });
      else if (this.css) {
        let t = this.opts.from
          ? this.toUrl(this.path(this.opts.from))
          : "<no source>";
        this.map.setSourceContent(t, this.css);
      }
    }
    sourcePath(e) {
      return this.mapOpts.from
        ? this.toUrl(this.mapOpts.from)
        : this.usesFileUrls
        ? this.toFileUrl(e.source.input.from)
        : this.toUrl(this.path(e.source.input.from));
    }
    toBase64(e) {
      return Buffer
        ? Buffer.from(e).toString("base64")
        : window.btoa(unescape(encodeURIComponent(e)));
    }
    toFileUrl(e) {
      let t = this.memoizedFileURLs.get(e);
      if (t) return t;
      if (Ci) {
        let r = Ci(e).toString();
        return this.memoizedFileURLs.set(e, r), r;
      } else
        throw new Error(
          "`map.absolute` option is not available in this PostCSS build"
        );
    }
    toUrl(e) {
      let t = this.memoizedURLs.get(e);
      if (t) return t;
      On === "\\" && (e = e.replace(/\\/g, "/"));
      let r = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
      return this.memoizedURLs.set(e, r), r;
    }
  };
var Mn = Ol;
let Ml = wr,
  ss = class extends Ml {
    constructor(e) {
      super(e), (this.type = "comment");
    }
  };
var Sr = ss;
ss.default = ss;
let { isClean: An, my: En } = Ct,
  $n = br,
  Nn = Sr,
  Al = wr,
  kn,
  Us,
  Bs,
  Pn;
function Tn(s) {
  return s.map((e) => (e.nodes && (e.nodes = Tn(e.nodes)), delete e.source, e));
}
function Ln(s) {
  if (((s[An] = !1), s.proxyOf.nodes)) for (let e of s.proxyOf.nodes) Ln(e);
}
let Me = class Dn extends Al {
  append(...e) {
    for (let t of e) {
      let r = this.normalize(t, this.last);
      for (let i of r) this.proxyOf.nodes.push(i);
    }
    return this.markDirty(), this;
  }
  cleanRaws(e) {
    if ((super.cleanRaws(e), this.nodes))
      for (let t of this.nodes) t.cleanRaws(e);
  }
  each(e) {
    if (!this.proxyOf.nodes) return;
    let t = this.getIterator(),
      r,
      i;
    for (
      ;
      this.indexes[t] < this.proxyOf.nodes.length &&
      ((r = this.indexes[t]), (i = e(this.proxyOf.nodes[r], r)), i !== !1);

    )
      this.indexes[t] += 1;
    return delete this.indexes[t], i;
  }
  every(e) {
    return this.nodes.every(e);
  }
  getIterator() {
    this.lastEach || (this.lastEach = 0),
      this.indexes || (this.indexes = {}),
      (this.lastEach += 1);
    let e = this.lastEach;
    return (this.indexes[e] = 0), e;
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf"
          ? e
          : e[t]
          ? t === "each" || (typeof t == "string" && t.startsWith("walk"))
            ? (...r) =>
                e[t](
                  ...r.map((i) =>
                    typeof i == "function" ? (n, o) => i(n.toProxy(), o) : i
                  )
                )
            : t === "every" || t === "some"
            ? (r) => e[t]((i, ...n) => r(i.toProxy(), ...n))
            : t === "root"
            ? () => e.root().toProxy()
            : t === "nodes"
            ? e.nodes.map((r) => r.toProxy())
            : t === "first" || t === "last"
            ? e[t].toProxy()
            : e[t]
          : e[t];
      },
      set(e, t, r) {
        return (
          e[t] === r ||
            ((e[t] = r),
            (t === "name" || t === "params" || t === "selector") &&
              e.markDirty()),
          !0
        );
      },
    };
  }
  index(e) {
    return typeof e == "number"
      ? e
      : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
  }
  insertAfter(e, t) {
    let r = this.index(e),
      i = this.normalize(t, this.proxyOf.nodes[r]).reverse();
    r = this.index(e);
    for (let o of i) this.proxyOf.nodes.splice(r + 1, 0, o);
    let n;
    for (let o in this.indexes)
      (n = this.indexes[o]), r < n && (this.indexes[o] = n + i.length);
    return this.markDirty(), this;
  }
  insertBefore(e, t) {
    let r = this.index(e),
      i = r === 0 ? "prepend" : !1,
      n = this.normalize(t, this.proxyOf.nodes[r], i).reverse();
    r = this.index(e);
    for (let l of n) this.proxyOf.nodes.splice(r, 0, l);
    let o;
    for (let l in this.indexes)
      (o = this.indexes[l]), r <= o && (this.indexes[l] = o + n.length);
    return this.markDirty(), this;
  }
  normalize(e, t) {
    if (typeof e == "string") e = Tn(kn(e).nodes);
    else if (typeof e > "u") e = [];
    else if (Array.isArray(e)) {
      e = e.slice(0);
      for (let i of e) i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type === "root" && this.type !== "document") {
      e = e.nodes.slice(0);
      for (let i of e) i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type) e = [e];
    else if (e.prop) {
      if (typeof e.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof e.value != "string" && (e.value = String(e.value)),
        (e = [new $n(e)]);
    } else if (e.selector) e = [new Us(e)];
    else if (e.name) e = [new Bs(e)];
    else if (e.text) e = [new Nn(e)];
    else throw new Error("Unknown node type in node creation");
    return e.map(
      (i) => (
        i[En] || Dn.rebuild(i),
        (i = i.proxyOf),
        i.parent && i.parent.removeChild(i),
        i[An] && Ln(i),
        typeof i.raws.before > "u" &&
          t &&
          typeof t.raws.before < "u" &&
          (i.raws.before = t.raws.before.replace(/\S/g, "")),
        (i.parent = this.proxyOf),
        i
      )
    );
  }
  prepend(...e) {
    e = e.reverse();
    for (let t of e) {
      let r = this.normalize(t, this.first, "prepend").reverse();
      for (let i of r) this.proxyOf.nodes.unshift(i);
      for (let i in this.indexes) this.indexes[i] = this.indexes[i] + r.length;
    }
    return this.markDirty(), this;
  }
  push(e) {
    return (e.parent = this), this.proxyOf.nodes.push(e), this;
  }
  removeAll() {
    for (let e of this.proxyOf.nodes) e.parent = void 0;
    return (this.proxyOf.nodes = []), this.markDirty(), this;
  }
  removeChild(e) {
    (e = this.index(e)),
      (this.proxyOf.nodes[e].parent = void 0),
      this.proxyOf.nodes.splice(e, 1);
    let t;
    for (let r in this.indexes)
      (t = this.indexes[r]), t >= e && (this.indexes[r] = t - 1);
    return this.markDirty(), this;
  }
  replaceValues(e, t, r) {
    return (
      r || ((r = t), (t = {})),
      this.walkDecls((i) => {
        (t.props && !t.props.includes(i.prop)) ||
          (t.fast && !i.value.includes(t.fast)) ||
          (i.value = i.value.replace(e, r));
      }),
      this.markDirty(),
      this
    );
  }
  some(e) {
    return this.nodes.some(e);
  }
  walk(e) {
    return this.each((t, r) => {
      let i;
      try {
        i = e(t, r);
      } catch (n) {
        throw t.addToError(n);
      }
      return i !== !1 && t.walk && (i = t.walk(e)), i;
    });
  }
  walkAtRules(e, t) {
    return t
      ? e instanceof RegExp
        ? this.walk((r, i) => {
            if (r.type === "atrule" && e.test(r.name)) return t(r, i);
          })
        : this.walk((r, i) => {
            if (r.type === "atrule" && r.name === e) return t(r, i);
          })
      : ((t = e),
        this.walk((r, i) => {
          if (r.type === "atrule") return t(r, i);
        }));
  }
  walkComments(e) {
    return this.walk((t, r) => {
      if (t.type === "comment") return e(t, r);
    });
  }
  walkDecls(e, t) {
    return t
      ? e instanceof RegExp
        ? this.walk((r, i) => {
            if (r.type === "decl" && e.test(r.prop)) return t(r, i);
          })
        : this.walk((r, i) => {
            if (r.type === "decl" && r.prop === e) return t(r, i);
          })
      : ((t = e),
        this.walk((r, i) => {
          if (r.type === "decl") return t(r, i);
        }));
  }
  walkRules(e, t) {
    return t
      ? e instanceof RegExp
        ? this.walk((r, i) => {
            if (r.type === "rule" && e.test(r.selector)) return t(r, i);
          })
        : this.walk((r, i) => {
            if (r.type === "rule" && r.selector === e) return t(r, i);
          })
      : ((t = e),
        this.walk((r, i) => {
          if (r.type === "rule") return t(r, i);
        }));
  }
  get first() {
    if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
  }
  get last() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
};
Me.registerParse = (s) => {
  kn = s;
};
Me.registerRule = (s) => {
  Us = s;
};
Me.registerAtRule = (s) => {
  Bs = s;
};
Me.registerRoot = (s) => {
  Pn = s;
};
var _e = Me;
Me.default = Me;
Me.rebuild = (s) => {
  s.type === "atrule"
    ? Object.setPrototypeOf(s, Bs.prototype)
    : s.type === "rule"
    ? Object.setPrototypeOf(s, Us.prototype)
    : s.type === "decl"
    ? Object.setPrototypeOf(s, $n.prototype)
    : s.type === "comment"
    ? Object.setPrototypeOf(s, Nn.prototype)
    : s.type === "root" && Object.setPrototypeOf(s, Pn.prototype),
    (s[En] = !0),
    s.nodes &&
      s.nodes.forEach((e) => {
        Me.rebuild(e);
      });
};
let El = _e,
  _n,
  Fn,
  ht = class extends El {
    constructor(e) {
      super({ type: "document", ...e }), this.nodes || (this.nodes = []);
    }
    toResult(e = {}) {
      return new _n(new Fn(), this, e).stringify();
    }
  };
ht.registerLazyResult = (s) => {
  _n = s;
};
ht.registerProcessor = (s) => {
  Fn = s;
};
var zs = ht;
ht.default = ht;
let is = class {
  constructor(e, t = {}) {
    if (((this.type = "warning"), (this.text = e), t.node && t.node.source)) {
      let r = t.node.rangeBy(t);
      (this.line = r.start.line),
        (this.column = r.start.column),
        (this.endLine = r.end.line),
        (this.endColumn = r.end.column);
    }
    for (let r in t) this[r] = t[r];
  }
  toString() {
    return this.node
      ? this.node.error(this.text, {
          index: this.index,
          plugin: this.plugin,
          word: this.word,
        }).message
      : this.plugin
      ? this.plugin + ": " + this.text
      : this.text;
  }
};
var Un = is;
is.default = is;
let $l = Un,
  ns = class {
    constructor(e, t, r) {
      (this.processor = e),
        (this.messages = []),
        (this.root = t),
        (this.opts = r),
        (this.css = void 0),
        (this.map = void 0);
    }
    toString() {
      return this.css;
    }
    warn(e, t = {}) {
      t.plugin ||
        (this.lastPlugin &&
          this.lastPlugin.postcssPlugin &&
          (t.plugin = this.lastPlugin.postcssPlugin));
      let r = new $l(e, t);
      return this.messages.push(r), r;
    }
    warnings() {
      return this.messages.filter((e) => e.type === "warning");
    }
    get content() {
      return this.css;
    }
  };
var Ws = ns;
ns.default = ns;
const Dr = 39,
  Ii = 34,
  $t = 92,
  xi = 47,
  Nt = 10,
  tt = 32,
  kt = 12,
  Pt = 9,
  Tt = 13,
  Nl = 91,
  kl = 93,
  Pl = 40,
  Tl = 41,
  Ll = 123,
  Dl = 125,
  _l = 59,
  Fl = 42,
  Ul = 58,
  Bl = 64,
  Lt = /[\t\n\f\r "#'()/;[\\\]{}]/g,
  Dt = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
  zl = /.[\r\n"'(/\\]/,
  Ri = /[\da-f]/i;
var Wl = function (e, t = {}) {
  let r = e.css.valueOf(),
    i = t.ignoreErrors,
    n,
    o,
    l,
    a,
    u,
    c,
    h,
    m,
    d,
    g,
    p = r.length,
    f = 0,
    S = [],
    v = [];
  function y() {
    return f;
  }
  function C(b) {
    throw e.error("Unclosed " + b, f);
  }
  function x() {
    return v.length === 0 && f >= p;
  }
  function R(b) {
    if (v.length) return v.pop();
    if (f >= p) return;
    let T = b ? b.ignoreUnclosed : !1;
    switch (((n = r.charCodeAt(f)), n)) {
      case Nt:
      case tt:
      case Pt:
      case Tt:
      case kt: {
        o = f;
        do (o += 1), (n = r.charCodeAt(o));
        while (n === tt || n === Nt || n === Pt || n === Tt || n === kt);
        (g = ["space", r.slice(f, o)]), (f = o - 1);
        break;
      }
      case Nl:
      case kl:
      case Ll:
      case Dl:
      case Ul:
      case _l:
      case Tl: {
        let $ = String.fromCharCode(n);
        g = [$, $, f];
        break;
      }
      case Pl: {
        if (
          ((m = S.length ? S.pop()[1] : ""),
          (d = r.charCodeAt(f + 1)),
          m === "url" &&
            d !== Dr &&
            d !== Ii &&
            d !== tt &&
            d !== Nt &&
            d !== Pt &&
            d !== kt &&
            d !== Tt)
        ) {
          o = f;
          do {
            if (((c = !1), (o = r.indexOf(")", o + 1)), o === -1))
              if (i || T) {
                o = f;
                break;
              } else C("bracket");
            for (h = o; r.charCodeAt(h - 1) === $t; ) (h -= 1), (c = !c);
          } while (c);
          (g = ["brackets", r.slice(f, o + 1), f, o]), (f = o);
        } else
          (o = r.indexOf(")", f + 1)),
            (a = r.slice(f, o + 1)),
            o === -1 || zl.test(a)
              ? (g = ["(", "(", f])
              : ((g = ["brackets", a, f, o]), (f = o));
        break;
      }
      case Dr:
      case Ii: {
        (l = n === Dr ? "'" : '"'), (o = f);
        do {
          if (((c = !1), (o = r.indexOf(l, o + 1)), o === -1))
            if (i || T) {
              o = f + 1;
              break;
            } else C("string");
          for (h = o; r.charCodeAt(h - 1) === $t; ) (h -= 1), (c = !c);
        } while (c);
        (g = ["string", r.slice(f, o + 1), f, o]), (f = o);
        break;
      }
      case Bl: {
        (Lt.lastIndex = f + 1),
          Lt.test(r),
          Lt.lastIndex === 0 ? (o = r.length - 1) : (o = Lt.lastIndex - 2),
          (g = ["at-word", r.slice(f, o + 1), f, o]),
          (f = o);
        break;
      }
      case $t: {
        for (o = f, u = !0; r.charCodeAt(o + 1) === $t; ) (o += 1), (u = !u);
        if (
          ((n = r.charCodeAt(o + 1)),
          u &&
            n !== xi &&
            n !== tt &&
            n !== Nt &&
            n !== Pt &&
            n !== Tt &&
            n !== kt &&
            ((o += 1), Ri.test(r.charAt(o))))
        ) {
          for (; Ri.test(r.charAt(o + 1)); ) o += 1;
          r.charCodeAt(o + 1) === tt && (o += 1);
        }
        (g = ["word", r.slice(f, o + 1), f, o]), (f = o);
        break;
      }
      default: {
        n === xi && r.charCodeAt(f + 1) === Fl
          ? ((o = r.indexOf("*/", f + 2) + 1),
            o === 0 && (i || T ? (o = r.length) : C("comment")),
            (g = ["comment", r.slice(f, o + 1), f, o]),
            (f = o))
          : ((Dt.lastIndex = f + 1),
            Dt.test(r),
            Dt.lastIndex === 0 ? (o = r.length - 1) : (o = Dt.lastIndex - 2),
            (g = ["word", r.slice(f, o + 1), f, o]),
            S.push(g),
            (f = o));
        break;
      }
    }
    return f++, g;
  }
  function O(b) {
    v.push(b);
  }
  return { back: O, endOfFile: x, nextToken: R, position: y };
};
let Bn = _e,
  ar = class extends Bn {
    constructor(e) {
      super(e), (this.type = "atrule");
    }
    append(...e) {
      return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
    }
    prepend(...e) {
      return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
    }
  };
var Gs = ar;
ar.default = ar;
Bn.registerAtRule(ar);
let zn = _e,
  Wn,
  Gn,
  He = class extends zn {
    constructor(e) {
      super(e), (this.type = "root"), this.nodes || (this.nodes = []);
    }
    normalize(e, t, r) {
      let i = super.normalize(e);
      if (t) {
        if (r === "prepend")
          this.nodes.length > 1
            ? (t.raws.before = this.nodes[1].raws.before)
            : delete t.raws.before;
        else if (this.first !== t)
          for (let n of i) n.raws.before = t.raws.before;
      }
      return i;
    }
    removeChild(e, t) {
      let r = this.index(e);
      return (
        !t &&
          r === 0 &&
          this.nodes.length > 1 &&
          (this.nodes[1].raws.before = this.nodes[r].raws.before),
        super.removeChild(e)
      );
    }
    toResult(e = {}) {
      return new Wn(new Gn(), this, e).stringify();
    }
  };
He.registerLazyResult = (s) => {
  Wn = s;
};
He.registerProcessor = (s) => {
  Gn = s;
};
var It = He;
He.default = He;
zn.registerRoot(He);
let ft = {
  comma(s) {
    return ft.split(s, [","], !0);
  },
  space(s) {
    let e = [
      " ",
      `
`,
      "	",
    ];
    return ft.split(s, e);
  },
  split(s, e, t) {
    let r = [],
      i = "",
      n = !1,
      o = 0,
      l = !1,
      a = "",
      u = !1;
    for (let c of s)
      u
        ? (u = !1)
        : c === "\\"
        ? (u = !0)
        : l
        ? c === a && (l = !1)
        : c === '"' || c === "'"
        ? ((l = !0), (a = c))
        : c === "("
        ? (o += 1)
        : c === ")"
        ? o > 0 && (o -= 1)
        : o === 0 && e.includes(c) && (n = !0),
        n ? (i !== "" && r.push(i.trim()), (i = ""), (n = !1)) : (i += c);
    return (t || i !== "") && r.push(i.trim()), r;
  },
};
var jn = ft;
ft.default = ft;
let Vn = _e,
  Gl = jn,
  lr = class extends Vn {
    constructor(e) {
      super(e), (this.type = "rule"), this.nodes || (this.nodes = []);
    }
    get selectors() {
      return Gl.comma(this.selector);
    }
    set selectors(e) {
      let t = this.selector ? this.selector.match(/,\s*/) : null,
        r = t ? t[0] : "," + this.raw("between", "beforeOpen");
      this.selector = e.join(r);
    }
  };
var js = lr;
lr.default = lr;
Vn.registerRule(lr);
let jl = br,
  Vl = Wl,
  Hl = Sr,
  Yl = Gs,
  Zl = It,
  Oi = js;
const Mi = { empty: !0, space: !0 };
function Jl(s) {
  for (let e = s.length - 1; e >= 0; e--) {
    let t = s[e],
      r = t[3] || t[2];
    if (r) return r;
  }
}
let Xl = class {
  constructor(e) {
    (this.input = e),
      (this.root = new Zl()),
      (this.current = this.root),
      (this.spaces = ""),
      (this.semicolon = !1),
      this.createTokenizer(),
      (this.root.source = {
        input: e,
        start: { column: 1, line: 1, offset: 0 },
      });
  }
  atrule(e) {
    let t = new Yl();
    (t.name = e[1].slice(1)),
      t.name === "" && this.unnamedAtrule(t, e),
      this.init(t, e[2]);
    let r,
      i,
      n,
      o = !1,
      l = !1,
      a = [],
      u = [];
    for (; !this.tokenizer.endOfFile(); ) {
      if (
        ((e = this.tokenizer.nextToken()),
        (r = e[0]),
        r === "(" || r === "["
          ? u.push(r === "(" ? ")" : "]")
          : r === "{" && u.length > 0
          ? u.push("}")
          : r === u[u.length - 1] && u.pop(),
        u.length === 0)
      )
        if (r === ";") {
          (t.source.end = this.getPosition(e[2])),
            t.source.end.offset++,
            (this.semicolon = !0);
          break;
        } else if (r === "{") {
          l = !0;
          break;
        } else if (r === "}") {
          if (a.length > 0) {
            for (n = a.length - 1, i = a[n]; i && i[0] === "space"; )
              i = a[--n];
            i &&
              ((t.source.end = this.getPosition(i[3] || i[2])),
              t.source.end.offset++);
          }
          this.end(e);
          break;
        } else a.push(e);
      else a.push(e);
      if (this.tokenizer.endOfFile()) {
        o = !0;
        break;
      }
    }
    (t.raws.between = this.spacesAndCommentsFromEnd(a)),
      a.length
        ? ((t.raws.afterName = this.spacesAndCommentsFromStart(a)),
          this.raw(t, "params", a),
          o &&
            ((e = a[a.length - 1]),
            (t.source.end = this.getPosition(e[3] || e[2])),
            t.source.end.offset++,
            (this.spaces = t.raws.between),
            (t.raws.between = "")))
        : ((t.raws.afterName = ""), (t.params = "")),
      l && ((t.nodes = []), (this.current = t));
  }
  checkMissedSemicolon(e) {
    let t = this.colon(e);
    if (t === !1) return;
    let r = 0,
      i;
    for (
      let n = t - 1;
      n >= 0 && ((i = e[n]), !(i[0] !== "space" && ((r += 1), r === 2)));
      n--
    );
    throw this.input.error(
      "Missed semicolon",
      i[0] === "word" ? i[3] + 1 : i[2]
    );
  }
  colon(e) {
    let t = 0,
      r,
      i,
      n;
    for (let [o, l] of e.entries()) {
      if (
        ((r = l),
        (i = r[0]),
        i === "(" && (t += 1),
        i === ")" && (t -= 1),
        t === 0 && i === ":")
      )
        if (!n) this.doubleColon(r);
        else {
          if (n[0] === "word" && n[1] === "progid") continue;
          return o;
        }
      n = r;
    }
    return !1;
  }
  comment(e) {
    let t = new Hl();
    this.init(t, e[2]),
      (t.source.end = this.getPosition(e[3] || e[2])),
      t.source.end.offset++;
    let r = e[1].slice(2, -2);
    if (/^\s*$/.test(r)) (t.text = ""), (t.raws.left = r), (t.raws.right = "");
    else {
      let i = r.match(/^(\s*)([^]*\S)(\s*)$/);
      (t.text = i[2]), (t.raws.left = i[1]), (t.raws.right = i[3]);
    }
  }
  createTokenizer() {
    this.tokenizer = Vl(this.input);
  }
  decl(e, t) {
    let r = new jl();
    this.init(r, e[0][2]);
    let i = e[e.length - 1];
    for (
      i[0] === ";" && ((this.semicolon = !0), e.pop()),
        r.source.end = this.getPosition(i[3] || i[2] || Jl(e)),
        r.source.end.offset++;
      e[0][0] !== "word";

    )
      e.length === 1 && this.unknownWord(e), (r.raws.before += e.shift()[1]);
    for (r.source.start = this.getPosition(e[0][2]), r.prop = ""; e.length; ) {
      let u = e[0][0];
      if (u === ":" || u === "space" || u === "comment") break;
      r.prop += e.shift()[1];
    }
    r.raws.between = "";
    let n;
    for (; e.length; )
      if (((n = e.shift()), n[0] === ":")) {
        r.raws.between += n[1];
        break;
      } else
        n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]),
          (r.raws.between += n[1]);
    (r.prop[0] === "_" || r.prop[0] === "*") &&
      ((r.raws.before += r.prop[0]), (r.prop = r.prop.slice(1)));
    let o = [],
      l;
    for (; e.length && ((l = e[0][0]), !(l !== "space" && l !== "comment")); )
      o.push(e.shift());
    this.precheckMissedSemicolon(e);
    for (let u = e.length - 1; u >= 0; u--) {
      if (((n = e[u]), n[1].toLowerCase() === "!important")) {
        r.important = !0;
        let c = this.stringFrom(e, u);
        (c = this.spacesFromEnd(e) + c),
          c !== " !important" && (r.raws.important = c);
        break;
      } else if (n[1].toLowerCase() === "important") {
        let c = e.slice(0),
          h = "";
        for (let m = u; m > 0; m--) {
          let d = c[m][0];
          if (h.trim().indexOf("!") === 0 && d !== "space") break;
          h = c.pop()[1] + h;
        }
        h.trim().indexOf("!") === 0 &&
          ((r.important = !0), (r.raws.important = h), (e = c));
      }
      if (n[0] !== "space" && n[0] !== "comment") break;
    }
    e.some((u) => u[0] !== "space" && u[0] !== "comment") &&
      ((r.raws.between += o.map((u) => u[1]).join("")), (o = [])),
      this.raw(r, "value", o.concat(e), t),
      r.value.includes(":") && !t && this.checkMissedSemicolon(e);
  }
  doubleColon(e) {
    throw this.input.error(
      "Double colon",
      { offset: e[2] },
      { offset: e[2] + e[1].length }
    );
  }
  emptyRule(e) {
    let t = new Oi();
    this.init(t, e[2]),
      (t.selector = ""),
      (t.raws.between = ""),
      (this.current = t);
  }
  end(e) {
    this.current.nodes &&
      this.current.nodes.length &&
      (this.current.raws.semicolon = this.semicolon),
      (this.semicolon = !1),
      (this.current.raws.after = (this.current.raws.after || "") + this.spaces),
      (this.spaces = ""),
      this.current.parent
        ? ((this.current.source.end = this.getPosition(e[2])),
          this.current.source.end.offset++,
          (this.current = this.current.parent))
        : this.unexpectedClose(e);
  }
  endFile() {
    this.current.parent && this.unclosedBlock(),
      this.current.nodes &&
        this.current.nodes.length &&
        (this.current.raws.semicolon = this.semicolon),
      (this.current.raws.after = (this.current.raws.after || "") + this.spaces),
      (this.root.source.end = this.getPosition(this.tokenizer.position()));
  }
  freeSemicolon(e) {
    if (((this.spaces += e[1]), this.current.nodes)) {
      let t = this.current.nodes[this.current.nodes.length - 1];
      t &&
        t.type === "rule" &&
        !t.raws.ownSemicolon &&
        ((t.raws.ownSemicolon = this.spaces), (this.spaces = ""));
    }
  }
  getPosition(e) {
    let t = this.input.fromOffset(e);
    return { column: t.col, line: t.line, offset: e };
  }
  init(e, t) {
    this.current.push(e),
      (e.source = { input: this.input, start: this.getPosition(t) }),
      (e.raws.before = this.spaces),
      (this.spaces = ""),
      e.type !== "comment" && (this.semicolon = !1);
  }
  other(e) {
    let t = !1,
      r = null,
      i = !1,
      n = null,
      o = [],
      l = e[1].startsWith("--"),
      a = [],
      u = e;
    for (; u; ) {
      if (((r = u[0]), a.push(u), r === "(" || r === "["))
        n || (n = u), o.push(r === "(" ? ")" : "]");
      else if (l && i && r === "{") n || (n = u), o.push("}");
      else if (o.length === 0)
        if (r === ";")
          if (i) {
            this.decl(a, l);
            return;
          } else break;
        else if (r === "{") {
          this.rule(a);
          return;
        } else if (r === "}") {
          this.tokenizer.back(a.pop()), (t = !0);
          break;
        } else r === ":" && (i = !0);
      else r === o[o.length - 1] && (o.pop(), o.length === 0 && (n = null));
      u = this.tokenizer.nextToken();
    }
    if (
      (this.tokenizer.endOfFile() && (t = !0),
      o.length > 0 && this.unclosedBracket(n),
      t && i)
    ) {
      if (!l)
        for (
          ;
          a.length &&
          ((u = a[a.length - 1][0]), !(u !== "space" && u !== "comment"));

        )
          this.tokenizer.back(a.pop());
      this.decl(a, l);
    } else this.unknownWord(a);
  }
  parse() {
    let e;
    for (; !this.tokenizer.endOfFile(); )
      switch (((e = this.tokenizer.nextToken()), e[0])) {
        case "space":
          this.spaces += e[1];
          break;
        case ";":
          this.freeSemicolon(e);
          break;
        case "}":
          this.end(e);
          break;
        case "comment":
          this.comment(e);
          break;
        case "at-word":
          this.atrule(e);
          break;
        case "{":
          this.emptyRule(e);
          break;
        default:
          this.other(e);
          break;
      }
    this.endFile();
  }
  precheckMissedSemicolon() {}
  raw(e, t, r, i) {
    let n,
      o,
      l = r.length,
      a = "",
      u = !0,
      c,
      h;
    for (let m = 0; m < l; m += 1)
      (n = r[m]),
        (o = n[0]),
        o === "space" && m === l - 1 && !i
          ? (u = !1)
          : o === "comment"
          ? ((h = r[m - 1] ? r[m - 1][0] : "empty"),
            (c = r[m + 1] ? r[m + 1][0] : "empty"),
            !Mi[h] && !Mi[c]
              ? a.slice(-1) === ","
                ? (u = !1)
                : (a += n[1])
              : (u = !1))
          : (a += n[1]);
    if (!u) {
      let m = r.reduce((d, g) => d + g[1], "");
      e.raws[t] = { raw: m, value: a };
    }
    e[t] = a;
  }
  rule(e) {
    e.pop();
    let t = new Oi();
    this.init(t, e[0][2]),
      (t.raws.between = this.spacesAndCommentsFromEnd(e)),
      this.raw(t, "selector", e),
      (this.current = t);
  }
  spacesAndCommentsFromEnd(e) {
    let t,
      r = "";
    for (
      ;
      e.length &&
      ((t = e[e.length - 1][0]), !(t !== "space" && t !== "comment"));

    )
      r = e.pop()[1] + r;
    return r;
  }
  spacesAndCommentsFromStart(e) {
    let t,
      r = "";
    for (; e.length && ((t = e[0][0]), !(t !== "space" && t !== "comment")); )
      r += e.shift()[1];
    return r;
  }
  spacesFromEnd(e) {
    let t,
      r = "";
    for (; e.length && ((t = e[e.length - 1][0]), t === "space"); )
      r = e.pop()[1] + r;
    return r;
  }
  stringFrom(e, t) {
    let r = "";
    for (let i = t; i < e.length; i++) r += e[i][1];
    return e.splice(t, e.length - t), r;
  }
  unclosedBlock() {
    let e = this.current.source.start;
    throw this.input.error("Unclosed block", e.line, e.column);
  }
  unclosedBracket(e) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unexpectedClose(e) {
    throw this.input.error(
      "Unexpected }",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unknownWord(e) {
    throw this.input.error(
      "Unknown word",
      { offset: e[0][2] },
      { offset: e[0][2] + e[0][1].length }
    );
  }
  unnamedAtrule(e, t) {
    throw this.input.error(
      "At-rule without name",
      { offset: t[2] },
      { offset: t[2] + t[1].length }
    );
  }
};
var Kl = Xl;
let Ql = _e,
  ql = Kl,
  eu = vr;
function ur(s, e) {
  let t = new eu(s, e),
    r = new ql(t);
  try {
    r.parse();
  } catch (i) {
    throw i;
  }
  return r.root;
}
var Vs = ur;
ur.default = ur;
Ql.registerParse(ur);
let { isClean: Se, my: tu } = Ct,
  ru = Mn,
  su = yr,
  iu = _e,
  nu = zs,
  Ai = Ws,
  ou = Vs,
  au = It;
const lu = {
    atrule: "AtRule",
    comment: "Comment",
    decl: "Declaration",
    document: "Document",
    root: "Root",
    rule: "Rule",
  },
  uu = {
    AtRule: !0,
    AtRuleExit: !0,
    Comment: !0,
    CommentExit: !0,
    Declaration: !0,
    DeclarationExit: !0,
    Document: !0,
    DocumentExit: !0,
    Once: !0,
    OnceExit: !0,
    postcssPlugin: !0,
    prepare: !0,
    Root: !0,
    RootExit: !0,
    Rule: !0,
    RuleExit: !0,
  },
  cu = { Once: !0, postcssPlugin: !0, prepare: !0 },
  Ye = 0;
function rt(s) {
  return typeof s == "object" && typeof s.then == "function";
}
function Hn(s) {
  let e = !1,
    t = lu[s.type];
  return (
    s.type === "decl"
      ? (e = s.prop.toLowerCase())
      : s.type === "atrule" && (e = s.name.toLowerCase()),
    e && s.append
      ? [t, t + "-" + e, Ye, t + "Exit", t + "Exit-" + e]
      : e
      ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e]
      : s.append
      ? [t, Ye, t + "Exit"]
      : [t, t + "Exit"]
  );
}
function Ei(s) {
  let e;
  return (
    s.type === "document"
      ? (e = ["Document", Ye, "DocumentExit"])
      : s.type === "root"
      ? (e = ["Root", Ye, "RootExit"])
      : (e = Hn(s)),
    {
      eventIndex: 0,
      events: e,
      iterator: 0,
      node: s,
      visitorIndex: 0,
      visitors: [],
    }
  );
}
function os(s) {
  return (s[Se] = !1), s.nodes && s.nodes.forEach((e) => os(e)), s;
}
let as = {},
  Ze = class Yn {
    constructor(e, t, r) {
      (this.stringified = !1), (this.processed = !1);
      let i;
      if (
        typeof t == "object" &&
        t !== null &&
        (t.type === "root" || t.type === "document")
      )
        i = os(t);
      else if (t instanceof Yn || t instanceof Ai)
        (i = os(t.root)),
          t.map &&
            (typeof r.map > "u" && (r.map = {}),
            r.map.inline || (r.map.inline = !1),
            (r.map.prev = t.map));
      else {
        let n = ou;
        r.syntax && (n = r.syntax.parse),
          r.parser && (n = r.parser),
          n.parse && (n = n.parse);
        try {
          i = n(t, r);
        } catch (o) {
          (this.processed = !0), (this.error = o);
        }
        i && !i[tu] && iu.rebuild(i);
      }
      (this.result = new Ai(e, i, r)),
        (this.helpers = { ...as, postcss: as, result: this.result }),
        (this.plugins = this.processor.plugins.map((n) =>
          typeof n == "object" && n.prepare
            ? { ...n, ...n.prepare(this.result) }
            : n
        ));
    }
    async() {
      return this.error
        ? Promise.reject(this.error)
        : this.processed
        ? Promise.resolve(this.result)
        : (this.processing || (this.processing = this.runAsync()),
          this.processing);
    }
    catch(e) {
      return this.async().catch(e);
    }
    finally(e) {
      return this.async().then(e, e);
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(e, t) {
      let r = this.result.lastPlugin;
      try {
        t && t.addToError(e),
          (this.error = e),
          e.name === "CssSyntaxError" && !e.plugin
            ? ((e.plugin = r.postcssPlugin), e.setMessage())
            : r.postcssVersion;
      } catch {}
      return e;
    }
    prepareVisitors() {
      this.listeners = {};
      let e = (t, r, i) => {
        this.listeners[r] || (this.listeners[r] = []),
          this.listeners[r].push([t, i]);
      };
      for (let t of this.plugins)
        if (typeof t == "object")
          for (let r in t) {
            if (!uu[r] && /^[A-Z]/.test(r))
              throw new Error(
                `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
              );
            if (!cu[r])
              if (typeof t[r] == "object")
                for (let i in t[r])
                  i === "*"
                    ? e(t, r, t[r][i])
                    : e(t, r + "-" + i.toLowerCase(), t[r][i]);
              else typeof t[r] == "function" && e(t, r, t[r]);
          }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    async runAsync() {
      this.plugin = 0;
      for (let e = 0; e < this.plugins.length; e++) {
        let t = this.plugins[e],
          r = this.runOnRoot(t);
        if (rt(r))
          try {
            await r;
          } catch (i) {
            throw this.handleError(i);
          }
      }
      if ((this.prepareVisitors(), this.hasListener)) {
        let e = this.result.root;
        for (; !e[Se]; ) {
          e[Se] = !0;
          let t = [Ei(e)];
          for (; t.length > 0; ) {
            let r = this.visitTick(t);
            if (rt(r))
              try {
                await r;
              } catch (i) {
                let n = t[t.length - 1].node;
                throw this.handleError(i, n);
              }
          }
        }
        if (this.listeners.OnceExit)
          for (let [t, r] of this.listeners.OnceExit) {
            this.result.lastPlugin = t;
            try {
              if (e.type === "document") {
                let i = e.nodes.map((n) => r(n, this.helpers));
                await Promise.all(i);
              } else await r(e, this.helpers);
            } catch (i) {
              throw this.handleError(i);
            }
          }
      }
      return (this.processed = !0), this.stringify();
    }
    runOnRoot(e) {
      this.result.lastPlugin = e;
      try {
        if (typeof e == "object" && e.Once) {
          if (this.result.root.type === "document") {
            let t = this.result.root.nodes.map((r) => e.Once(r, this.helpers));
            return rt(t[0]) ? Promise.all(t) : t;
          }
          return e.Once(this.result.root, this.helpers);
        } else if (typeof e == "function")
          return e(this.result.root, this.result);
      } catch (t) {
        throw this.handleError(t);
      }
    }
    stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      (this.stringified = !0), this.sync();
      let e = this.result.opts,
        t = su;
      e.syntax && (t = e.syntax.stringify),
        e.stringifier && (t = e.stringifier),
        t.stringify && (t = t.stringify);
      let i = new ru(t, this.result.root, this.result.opts).generate();
      return (this.result.css = i[0]), (this.result.map = i[1]), this.result;
    }
    sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      if (((this.processed = !0), this.processing)) throw this.getAsyncError();
      for (let e of this.plugins) {
        let t = this.runOnRoot(e);
        if (rt(t)) throw this.getAsyncError();
      }
      if ((this.prepareVisitors(), this.hasListener)) {
        let e = this.result.root;
        for (; !e[Se]; ) (e[Se] = !0), this.walkSync(e);
        if (this.listeners.OnceExit)
          if (e.type === "document")
            for (let t of e.nodes) this.visitSync(this.listeners.OnceExit, t);
          else this.visitSync(this.listeners.OnceExit, e);
      }
      return this.result;
    }
    then(e, t) {
      return this.async().then(e, t);
    }
    toString() {
      return this.css;
    }
    visitSync(e, t) {
      for (let [r, i] of e) {
        this.result.lastPlugin = r;
        let n;
        try {
          n = i(t, this.helpers);
        } catch (o) {
          throw this.handleError(o, t.proxyOf);
        }
        if (t.type !== "root" && t.type !== "document" && !t.parent) return !0;
        if (rt(n)) throw this.getAsyncError();
      }
    }
    visitTick(e) {
      let t = e[e.length - 1],
        { node: r, visitors: i } = t;
      if (r.type !== "root" && r.type !== "document" && !r.parent) {
        e.pop();
        return;
      }
      if (i.length > 0 && t.visitorIndex < i.length) {
        let [o, l] = i[t.visitorIndex];
        (t.visitorIndex += 1),
          t.visitorIndex === i.length &&
            ((t.visitors = []), (t.visitorIndex = 0)),
          (this.result.lastPlugin = o);
        try {
          return l(r.toProxy(), this.helpers);
        } catch (a) {
          throw this.handleError(a, r);
        }
      }
      if (t.iterator !== 0) {
        let o = t.iterator,
          l;
        for (; (l = r.nodes[r.indexes[o]]); )
          if (((r.indexes[o] += 1), !l[Se])) {
            (l[Se] = !0), e.push(Ei(l));
            return;
          }
        (t.iterator = 0), delete r.indexes[o];
      }
      let n = t.events;
      for (; t.eventIndex < n.length; ) {
        let o = n[t.eventIndex];
        if (((t.eventIndex += 1), o === Ye)) {
          r.nodes &&
            r.nodes.length &&
            ((r[Se] = !0), (t.iterator = r.getIterator()));
          return;
        } else if (this.listeners[o]) {
          t.visitors = this.listeners[o];
          return;
        }
      }
      e.pop();
    }
    walkSync(e) {
      e[Se] = !0;
      let t = Hn(e);
      for (let r of t)
        if (r === Ye)
          e.nodes &&
            e.each((i) => {
              i[Se] || this.walkSync(i);
            });
        else {
          let i = this.listeners[r];
          if (i && this.visitSync(i, e.toProxy())) return;
        }
    }
    warnings() {
      return this.sync().warnings();
    }
    get content() {
      return this.stringify().content;
    }
    get css() {
      return this.stringify().css;
    }
    get map() {
      return this.stringify().map;
    }
    get messages() {
      return this.sync().messages;
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      return this.sync().root;
    }
    get [Symbol.toStringTag]() {
      return "LazyResult";
    }
  };
Ze.registerPostcss = (s) => {
  as = s;
};
var Zn = Ze;
Ze.default = Ze;
au.registerLazyResult(Ze);
nu.registerLazyResult(Ze);
let hu = Mn,
  fu = yr,
  pu = Vs;
const du = Ws;
let ls = class {
  constructor(e, t, r) {
    (t = t.toString()),
      (this.stringified = !1),
      (this._processor = e),
      (this._css = t),
      (this._opts = r),
      (this._map = void 0);
    let i,
      n = fu;
    (this.result = new du(this._processor, i, this._opts)),
      (this.result.css = t);
    let o = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return o.root;
      },
    });
    let l = new hu(n, i, this._opts, t);
    if (l.isMap()) {
      let [a, u] = l.generate();
      a && (this.result.css = a), u && (this.result.map = u);
    } else l.clearAnnotation(), (this.result.css = l.css);
  }
  async() {
    return this.error
      ? Promise.reject(this.error)
      : Promise.resolve(this.result);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(e, t) {
    return this.async().then(e, t);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root) return this._root;
    let e,
      t = pu;
    try {
      e = t(this._css, this._opts);
    } catch (r) {
      this.error = r;
    }
    if (this.error) throw this.error;
    return (this._root = e), e;
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
};
var mu = ls;
ls.default = ls;
let gu = mu,
  yu = Zn,
  wu = zs,
  bu = It,
  pt = class {
    constructor(e = []) {
      (this.version = "8.4.38"), (this.plugins = this.normalize(e));
    }
    normalize(e) {
      let t = [];
      for (let r of e)
        if (
          (r.postcss === !0 ? (r = r()) : r.postcss && (r = r.postcss),
          typeof r == "object" && Array.isArray(r.plugins))
        )
          t = t.concat(r.plugins);
        else if (typeof r == "object" && r.postcssPlugin) t.push(r);
        else if (typeof r == "function") t.push(r);
        else if (!(typeof r == "object" && (r.parse || r.stringify)))
          throw new Error(r + " is not a PostCSS plugin");
      return t;
    }
    process(e, t = {}) {
      return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax
        ? new gu(this, e, t)
        : new yu(this, e, t);
    }
    use(e) {
      return (this.plugins = this.plugins.concat(this.normalize([e]))), this;
    }
  };
var vu = pt;
pt.default = pt;
bu.registerProcessor(pt);
wu.registerProcessor(pt);
let Su = br,
  Cu = Cn,
  Iu = Sr,
  xu = Gs,
  Ru = vr,
  Ou = It,
  Mu = js;
function dt(s, e) {
  if (Array.isArray(s)) return s.map((i) => dt(i));
  let { inputs: t, ...r } = s;
  if (t) {
    e = [];
    for (let i of t) {
      let n = { ...i, __proto__: Ru.prototype };
      n.map && (n.map = { ...n.map, __proto__: Cu.prototype }), e.push(n);
    }
  }
  if ((r.nodes && (r.nodes = s.nodes.map((i) => dt(i, e))), r.source)) {
    let { inputId: i, ...n } = r.source;
    (r.source = n), i != null && (r.source.input = e[i]);
  }
  if (r.type === "root") return new Ou(r);
  if (r.type === "decl") return new Su(r);
  if (r.type === "rule") return new Mu(r);
  if (r.type === "comment") return new Iu(r);
  if (r.type === "atrule") return new xu(r);
  throw new Error("Unknown node type: " + s.type);
}
var Au = dt;
dt.default = dt;
let Eu = Fs,
  Jn = br,
  $u = Zn,
  Nu = _e,
  Hs = vu,
  ku = yr,
  Pu = Au,
  Xn = zs,
  Tu = Un,
  Kn = Sr,
  Qn = Gs,
  Lu = Ws,
  Du = vr,
  _u = Vs,
  Fu = jn,
  qn = js,
  eo = It,
  Uu = wr;
function _(...s) {
  return s.length === 1 && Array.isArray(s[0]) && (s = s[0]), new Hs(s);
}
_.plugin = function (e, t) {
  let r = !1;
  function i(...o) {
    console &&
      console.warn &&
      !r &&
      ((r = !0), rr.LANG && rr.LANG.startsWith("cn"));
    let l = t(...o);
    return (l.postcssPlugin = e), (l.postcssVersion = new Hs().version), l;
  }
  let n;
  return (
    Object.defineProperty(i, "postcss", {
      get() {
        return n || (n = i()), n;
      },
    }),
    (i.process = function (o, l, a) {
      return _([i(a)]).process(o, l);
    }),
    i
  );
};
_.stringify = ku;
_.parse = _u;
_.fromJSON = Pu;
_.list = Fu;
_.comment = (s) => new Kn(s);
_.atRule = (s) => new Qn(s);
_.decl = (s) => new Jn(s);
_.rule = (s) => new qn(s);
_.root = (s) => new eo(s);
_.document = (s) => new Xn(s);
_.CssSyntaxError = Eu;
_.Declaration = Jn;
_.Container = Nu;
_.Processor = Hs;
_.Document = Xn;
_.Comment = Kn;
_.Warning = Tu;
_.AtRule = Qn;
_.Result = Lu;
_.Input = Du;
_.Rule = qn;
_.Root = eo;
_.Node = Uu;
$u.registerPostcss(_);
var Bu = _;
_.default = _;
const H = qa(Bu);
H.stringify;
H.fromJSON;
H.plugin;
H.parse;
H.list;
H.document;
H.comment;
H.atRule;
H.rule;
H.decl;
H.root;
H.CssSyntaxError;
H.Declaration;
H.Container;
H.Processor;
H.Document;
H.Comment;
H.Warning;
H.AtRule;
H.Result;
H.Input;
H.Rule;
H.Root;
H.Node;
var zu = Object.defineProperty,
  Wu = (s, e, t) =>
    e in s
      ? zu(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (s[e] = t),
  ge = (s, e, t) => Wu(s, typeof e != "symbol" ? e + "" : e, t);
function Gu(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default")
    ? s.default
    : s;
}
function ju(s) {
  if (s.__esModule) return s;
  var e = s.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return (
    Object.defineProperty(t, "__esModule", { value: !0 }),
    Object.keys(s).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(s, r);
      Object.defineProperty(
        t,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return s[r];
              },
            }
      );
    }),
    t
  );
}
var Ys = { exports: {} },
  G = String,
  to = function () {
    return {
      isColorSupported: !1,
      reset: G,
      bold: G,
      dim: G,
      italic: G,
      underline: G,
      inverse: G,
      hidden: G,
      strikethrough: G,
      black: G,
      red: G,
      green: G,
      yellow: G,
      blue: G,
      magenta: G,
      cyan: G,
      white: G,
      gray: G,
      bgBlack: G,
      bgRed: G,
      bgGreen: G,
      bgYellow: G,
      bgBlue: G,
      bgMagenta: G,
      bgCyan: G,
      bgWhite: G,
    };
  };
Ys.exports = to();
Ys.exports.createColors = to;
var Vu = Ys.exports;
const Hu = {},
  Yu = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Hu },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ve = ju(Yu);
let $i = Vu,
  Ni = ve,
  us = class ro extends Error {
    constructor(e, t, r, i, n, o) {
      super(e),
        (this.name = "CssSyntaxError"),
        (this.reason = e),
        n && (this.file = n),
        i && (this.source = i),
        o && (this.plugin = o),
        typeof t < "u" &&
          typeof r < "u" &&
          (typeof t == "number"
            ? ((this.line = t), (this.column = r))
            : ((this.line = t.line),
              (this.column = t.column),
              (this.endLine = r.line),
              (this.endColumn = r.column))),
        this.setMessage(),
        Error.captureStackTrace && Error.captureStackTrace(this, ro);
    }
    setMessage() {
      (this.message = this.plugin ? this.plugin + ": " : ""),
        (this.message += this.file ? this.file : "<css input>"),
        typeof this.line < "u" &&
          (this.message += ":" + this.line + ":" + this.column),
        (this.message += ": " + this.reason);
    }
    showSourceCode(e) {
      if (!this.source) return "";
      let t = this.source;
      e == null && (e = $i.isColorSupported), Ni && e && (t = Ni(t));
      let r = t.split(/\r?\n/),
        i = Math.max(this.line - 3, 0),
        n = Math.min(this.line + 2, r.length),
        o = String(n).length,
        l,
        a;
      if (e) {
        let { bold: u, gray: c, red: h } = $i.createColors(!0);
        (l = (m) => u(h(m))), (a = (m) => c(m));
      } else l = a = (u) => u;
      return r.slice(i, n).map((u, c) => {
        let h = i + 1 + c,
          m = " " + (" " + h).slice(-o) + " | ";
        if (h === this.line) {
          let d =
            a(m.replace(/\d/g, " ")) +
            u.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return (
            l(">") +
            a(m) +
            u +
            `
 ` +
            d +
            l("^")
          );
        }
        return " " + a(m) + u;
      }).join(`
`);
    }
    toString() {
      let e = this.showSourceCode();
      return (
        e &&
          (e =
            `

` +
            e +
            `
`),
        this.name + ": " + this.message + e
      );
    }
  };
var Zs = us;
us.default = us;
var xt = {};
xt.isClean = Symbol("isClean");
xt.my = Symbol("my");
const ki = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1,
};
function Zu(s) {
  return s[0].toUpperCase() + s.slice(1);
}
let cs = class {
  constructor(e) {
    this.builder = e;
  }
  atrule(e, t) {
    let r = "@" + e.name,
      i = e.params ? this.rawValue(e, "params") : "";
    if (
      (typeof e.raws.afterName < "u"
        ? (r += e.raws.afterName)
        : i && (r += " "),
      e.nodes)
    )
      this.block(e, r + i);
    else {
      let n = (e.raws.between || "") + (t ? ";" : "");
      this.builder(r + i + n, e);
    }
  }
  beforeAfter(e, t) {
    let r;
    e.type === "decl"
      ? (r = this.raw(e, null, "beforeDecl"))
      : e.type === "comment"
      ? (r = this.raw(e, null, "beforeComment"))
      : t === "before"
      ? (r = this.raw(e, null, "beforeRule"))
      : (r = this.raw(e, null, "beforeClose"));
    let i = e.parent,
      n = 0;
    for (; i && i.type !== "root"; ) (n += 1), (i = i.parent);
    if (
      r.includes(`
`)
    ) {
      let o = this.raw(e, null, "indent");
      if (o.length) for (let l = 0; l < n; l++) r += o;
    }
    return r;
  }
  block(e, t) {
    let r = this.raw(e, "between", "beforeOpen");
    this.builder(t + r + "{", e, "start");
    let i;
    e.nodes && e.nodes.length
      ? (this.body(e), (i = this.raw(e, "after")))
      : (i = this.raw(e, "after", "emptyBody")),
      i && this.builder(i),
      this.builder("}", e, "end");
  }
  body(e) {
    let t = e.nodes.length - 1;
    for (; t > 0 && e.nodes[t].type === "comment"; ) t -= 1;
    let r = this.raw(e, "semicolon");
    for (let i = 0; i < e.nodes.length; i++) {
      let n = e.nodes[i],
        o = this.raw(n, "before");
      o && this.builder(o), this.stringify(n, t !== i || r);
    }
  }
  comment(e) {
    let t = this.raw(e, "left", "commentLeft"),
      r = this.raw(e, "right", "commentRight");
    this.builder("/*" + t + e.text + r + "*/", e);
  }
  decl(e, t) {
    let r = this.raw(e, "between", "colon"),
      i = e.prop + r + this.rawValue(e, "value");
    e.important && (i += e.raws.important || " !important"),
      t && (i += ";"),
      this.builder(i, e);
  }
  document(e) {
    this.body(e);
  }
  raw(e, t, r) {
    let i;
    if ((r || (r = t), t && ((i = e.raws[t]), typeof i < "u"))) return i;
    let n = e.parent;
    if (
      r === "before" &&
      (!n ||
        (n.type === "root" && n.first === e) ||
        (n && n.type === "document"))
    )
      return "";
    if (!n) return ki[r];
    let o = e.root();
    if ((o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] < "u"))
      return o.rawCache[r];
    if (r === "before" || r === "after") return this.beforeAfter(e, r);
    {
      let l = "raw" + Zu(r);
      this[l]
        ? (i = this[l](o, e))
        : o.walk((a) => {
            if (((i = a.raws[t]), typeof i < "u")) return !1;
          });
    }
    return typeof i > "u" && (i = ki[r]), (o.rawCache[r] = i), i;
  }
  rawBeforeClose(e) {
    let t;
    return (
      e.walk((r) => {
        if (r.nodes && r.nodes.length > 0 && typeof r.raws.after < "u")
          return (
            (t = r.raws.after),
            t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")),
            !1
          );
      }),
      t && (t = t.replace(/\S/g, "")),
      t
    );
  }
  rawBeforeComment(e, t) {
    let r;
    return (
      e.walkComments((i) => {
        if (typeof i.raws.before < "u")
          return (
            (r = i.raws.before),
            r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
            !1
          );
      }),
      typeof r > "u"
        ? (r = this.raw(t, null, "beforeDecl"))
        : r && (r = r.replace(/\S/g, "")),
      r
    );
  }
  rawBeforeDecl(e, t) {
    let r;
    return (
      e.walkDecls((i) => {
        if (typeof i.raws.before < "u")
          return (
            (r = i.raws.before),
            r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
            !1
          );
      }),
      typeof r > "u"
        ? (r = this.raw(t, null, "beforeRule"))
        : r && (r = r.replace(/\S/g, "")),
      r
    );
  }
  rawBeforeOpen(e) {
    let t;
    return (
      e.walk((r) => {
        if (r.type !== "decl" && ((t = r.raws.between), typeof t < "u"))
          return !1;
      }),
      t
    );
  }
  rawBeforeRule(e) {
    let t;
    return (
      e.walk((r) => {
        if (
          r.nodes &&
          (r.parent !== e || e.first !== r) &&
          typeof r.raws.before < "u"
        )
          return (
            (t = r.raws.before),
            t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")),
            !1
          );
      }),
      t && (t = t.replace(/\S/g, "")),
      t
    );
  }
  rawColon(e) {
    let t;
    return (
      e.walkDecls((r) => {
        if (typeof r.raws.between < "u")
          return (t = r.raws.between.replace(/[^\s:]/g, "")), !1;
      }),
      t
    );
  }
  rawEmptyBody(e) {
    let t;
    return (
      e.walk((r) => {
        if (
          r.nodes &&
          r.nodes.length === 0 &&
          ((t = r.raws.after), typeof t < "u")
        )
          return !1;
      }),
      t
    );
  }
  rawIndent(e) {
    if (e.raws.indent) return e.raws.indent;
    let t;
    return (
      e.walk((r) => {
        let i = r.parent;
        if (
          i &&
          i !== e &&
          i.parent &&
          i.parent === e &&
          typeof r.raws.before < "u"
        ) {
          let n = r.raws.before.split(`
`);
          return (t = n[n.length - 1]), (t = t.replace(/\S/g, "")), !1;
        }
      }),
      t
    );
  }
  rawSemicolon(e) {
    let t;
    return (
      e.walk((r) => {
        if (
          r.nodes &&
          r.nodes.length &&
          r.last.type === "decl" &&
          ((t = r.raws.semicolon), typeof t < "u")
        )
          return !1;
      }),
      t
    );
  }
  rawValue(e, t) {
    let r = e[t],
      i = e.raws[t];
    return i && i.value === r ? i.raw : r;
  }
  root(e) {
    this.body(e), e.raws.after && this.builder(e.raws.after);
  }
  rule(e) {
    this.block(e, this.rawValue(e, "selector")),
      e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
  }
  stringify(e, t) {
    if (!this[e.type])
      throw new Error(
        "Unknown AST node type " +
          e.type +
          ". Maybe you need to change PostCSS stringifier."
      );
    this[e.type](e, t);
  }
};
var so = cs;
cs.default = cs;
let Ju = so;
function hs(s, e) {
  new Ju(e).stringify(s);
}
var Cr = hs;
hs.default = hs;
let { isClean: _t, my: Xu } = xt,
  Ku = Zs,
  Qu = so,
  qu = Cr;
function fs(s, e) {
  let t = new s.constructor();
  for (let r in s) {
    if (!Object.prototype.hasOwnProperty.call(s, r) || r === "proxyCache")
      continue;
    let i = s[r],
      n = typeof i;
    r === "parent" && n === "object"
      ? e && (t[r] = e)
      : r === "source"
      ? (t[r] = i)
      : Array.isArray(i)
      ? (t[r] = i.map((o) => fs(o, t)))
      : (n === "object" && i !== null && (i = fs(i)), (t[r] = i));
  }
  return t;
}
let ps = class {
  constructor(e = {}) {
    (this.raws = {}), (this[_t] = !1), (this[Xu] = !0);
    for (let t in e)
      if (t === "nodes") {
        this.nodes = [];
        for (let r of e[t])
          typeof r.clone == "function"
            ? this.append(r.clone())
            : this.append(r);
      } else this[t] = e[t];
  }
  addToError(e) {
    if (
      ((e.postcssNode = this),
      e.stack && this.source && /\n\s{4}at /.test(e.stack))
    ) {
      let t = this.source;
      e.stack = e.stack.replace(
        /\n\s{4}at /,
        `$&${t.input.from}:${t.start.line}:${t.start.column}$&`
      );
    }
    return e;
  }
  after(e) {
    return this.parent.insertAfter(this, e), this;
  }
  assign(e = {}) {
    for (let t in e) this[t] = e[t];
    return this;
  }
  before(e) {
    return this.parent.insertBefore(this, e), this;
  }
  cleanRaws(e) {
    delete this.raws.before,
      delete this.raws.after,
      e || delete this.raws.between;
  }
  clone(e = {}) {
    let t = fs(this);
    for (let r in e) t[r] = e[r];
    return t;
  }
  cloneAfter(e = {}) {
    let t = this.clone(e);
    return this.parent.insertAfter(this, t), t;
  }
  cloneBefore(e = {}) {
    let t = this.clone(e);
    return this.parent.insertBefore(this, t), t;
  }
  error(e, t = {}) {
    if (this.source) {
      let { end: r, start: i } = this.rangeBy(t);
      return this.source.input.error(
        e,
        { column: i.column, line: i.line },
        { column: r.column, line: r.line },
        t
      );
    }
    return new Ku(e);
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf"
          ? e
          : t === "root"
          ? () => e.root().toProxy()
          : e[t];
      },
      set(e, t, r) {
        return (
          e[t] === r ||
            ((e[t] = r),
            (t === "prop" ||
              t === "value" ||
              t === "name" ||
              t === "params" ||
              t === "important" ||
              t === "text") &&
              e.markDirty()),
          !0
        );
      },
    };
  }
  markDirty() {
    if (this[_t]) {
      this[_t] = !1;
      let e = this;
      for (; (e = e.parent); ) e[_t] = !1;
    }
  }
  next() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e + 1];
  }
  positionBy(e, t) {
    let r = this.source.start;
    if (e.index) r = this.positionInside(e.index, t);
    else if (e.word) {
      t = this.toString();
      let i = t.indexOf(e.word);
      i !== -1 && (r = this.positionInside(i, t));
    }
    return r;
  }
  positionInside(e, t) {
    let r = t || this.toString(),
      i = this.source.start.column,
      n = this.source.start.line;
    for (let o = 0; o < e; o++)
      r[o] ===
      `
`
        ? ((i = 1), (n += 1))
        : (i += 1);
    return { column: i, line: n };
  }
  prev() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e - 1];
  }
  rangeBy(e) {
    let t = { column: this.source.start.column, line: this.source.start.line },
      r = this.source.end
        ? { column: this.source.end.column + 1, line: this.source.end.line }
        : { column: t.column + 1, line: t.line };
    if (e.word) {
      let i = this.toString(),
        n = i.indexOf(e.word);
      n !== -1 &&
        ((t = this.positionInside(n, i)),
        (r = this.positionInside(n + e.word.length, i)));
    } else
      e.start
        ? (t = { column: e.start.column, line: e.start.line })
        : e.index && (t = this.positionInside(e.index)),
        e.end
          ? (r = { column: e.end.column, line: e.end.line })
          : typeof e.endIndex == "number"
          ? (r = this.positionInside(e.endIndex))
          : e.index && (r = this.positionInside(e.index + 1));
    return (
      (r.line < t.line || (r.line === t.line && r.column <= t.column)) &&
        (r = { column: t.column + 1, line: t.line }),
      { end: r, start: t }
    );
  }
  raw(e, t) {
    return new Qu().raw(this, e, t);
  }
  remove() {
    return (
      this.parent && this.parent.removeChild(this), (this.parent = void 0), this
    );
  }
  replaceWith(...e) {
    if (this.parent) {
      let t = this,
        r = !1;
      for (let i of e)
        i === this
          ? (r = !0)
          : r
          ? (this.parent.insertAfter(t, i), (t = i))
          : this.parent.insertBefore(t, i);
      r || this.remove();
    }
    return this;
  }
  root() {
    let e = this;
    for (; e.parent && e.parent.type !== "document"; ) e = e.parent;
    return e;
  }
  toJSON(e, t) {
    let r = {},
      i = t == null;
    t = t || new Map();
    let n = 0;
    for (let o in this) {
      if (
        !Object.prototype.hasOwnProperty.call(this, o) ||
        o === "parent" ||
        o === "proxyCache"
      )
        continue;
      let l = this[o];
      if (Array.isArray(l))
        r[o] = l.map((a) =>
          typeof a == "object" && a.toJSON ? a.toJSON(null, t) : a
        );
      else if (typeof l == "object" && l.toJSON) r[o] = l.toJSON(null, t);
      else if (o === "source") {
        let a = t.get(l.input);
        a == null && ((a = n), t.set(l.input, n), n++),
          (r[o] = { end: l.end, inputId: a, start: l.start });
      } else r[o] = l;
    }
    return i && (r.inputs = [...t.keys()].map((o) => o.toJSON())), r;
  }
  toProxy() {
    return (
      this.proxyCache ||
        (this.proxyCache = new Proxy(this, this.getProxyProcessor())),
      this.proxyCache
    );
  }
  toString(e = qu) {
    e.stringify && (e = e.stringify);
    let t = "";
    return (
      e(this, (r) => {
        t += r;
      }),
      t
    );
  }
  warn(e, t, r) {
    let i = { node: this };
    for (let n in r) i[n] = r[n];
    return e.warn(t, i);
  }
  get proxyOf() {
    return this;
  }
};
var Ir = ps;
ps.default = ps;
let ec = Ir,
  ds = class extends ec {
    constructor(e) {
      e &&
        typeof e.value < "u" &&
        typeof e.value != "string" &&
        (e = { ...e, value: String(e.value) }),
        super(e),
        (this.type = "decl");
    }
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
  };
var xr = ds;
ds.default = ds;
let tc = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",
  rc = (s = 21) => {
    let e = "",
      t = s;
    for (; t--; ) e += tc[(Math.random() * 64) | 0];
    return e;
  };
var sc = { nanoid: rc };
let { SourceMapConsumer: Pi, SourceMapGenerator: Ti } = ve,
  { existsSync: ic, readFileSync: nc } = ve,
  { dirname: _r, join: oc } = ve;
function ac(s) {
  return Buffer ? Buffer.from(s, "base64").toString() : window.atob(s);
}
let ms = class {
  constructor(e, t) {
    if (t.map === !1) return;
    this.loadAnnotation(e),
      (this.inline = this.startWith(this.annotation, "data:"));
    let r = t.map ? t.map.prev : void 0,
      i = this.loadMap(t.from, r);
    !this.mapFile && t.from && (this.mapFile = t.from),
      this.mapFile && (this.root = _r(this.mapFile)),
      i && (this.text = i);
  }
  consumer() {
    return (
      this.consumerCache || (this.consumerCache = new Pi(this.text)),
      this.consumerCache
    );
  }
  decodeInline(e) {
    let t = /^data:application\/json;charset=utf-?8;base64,/,
      r = /^data:application\/json;base64,/,
      i = /^data:application\/json;charset=utf-?8,/,
      n = /^data:application\/json,/;
    if (i.test(e) || n.test(e))
      return decodeURIComponent(e.substr(RegExp.lastMatch.length));
    if (t.test(e) || r.test(e)) return ac(e.substr(RegExp.lastMatch.length));
    let o = e.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + o);
  }
  getAnnotationURL(e) {
    return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(e) {
    return typeof e != "object"
      ? !1
      : typeof e.mappings == "string" ||
          typeof e._mappings == "string" ||
          Array.isArray(e.sections);
  }
  loadAnnotation(e) {
    let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
    if (!t) return;
    let r = e.lastIndexOf(t.pop()),
      i = e.indexOf("*/", r);
    r > -1 &&
      i > -1 &&
      (this.annotation = this.getAnnotationURL(e.substring(r, i)));
  }
  loadFile(e) {
    if (((this.root = _r(e)), ic(e)))
      return (this.mapFile = e), nc(e, "utf-8").toString().trim();
  }
  loadMap(e, t) {
    if (t === !1) return !1;
    if (t) {
      if (typeof t == "string") return t;
      if (typeof t == "function") {
        let r = t(e);
        if (r) {
          let i = this.loadFile(r);
          if (!i)
            throw new Error(
              "Unable to load previous source map: " + r.toString()
            );
          return i;
        }
      } else {
        if (t instanceof Pi) return Ti.fromSourceMap(t).toString();
        if (t instanceof Ti) return t.toString();
        if (this.isMap(t)) return JSON.stringify(t);
        throw new Error(
          "Unsupported previous source map format: " + t.toString()
        );
      }
    } else {
      if (this.inline) return this.decodeInline(this.annotation);
      if (this.annotation) {
        let r = this.annotation;
        return e && (r = oc(_r(e), r)), this.loadFile(r);
      }
    }
  }
  startWith(e, t) {
    return e ? e.substr(0, t.length) === t : !1;
  }
  withContent() {
    return !!(
      this.consumer().sourcesContent &&
      this.consumer().sourcesContent.length > 0
    );
  }
};
var io = ms;
ms.default = ms;
let { SourceMapConsumer: lc, SourceMapGenerator: uc } = ve,
  { fileURLToPath: Li, pathToFileURL: Ft } = ve,
  { isAbsolute: gs, resolve: ys } = ve,
  { nanoid: cc } = sc,
  Fr = ve,
  Di = Zs,
  hc = io,
  Ur = Symbol("fromOffsetCache"),
  fc = !!(lc && uc),
  _i = !!(ys && gs),
  cr = class {
    constructor(e, t = {}) {
      if (e === null || typeof e > "u" || (typeof e == "object" && !e.toString))
        throw new Error(`PostCSS received ${e} instead of CSS string`);
      if (
        ((this.css = e.toString()),
        this.css[0] === "\uFEFF" || this.css[0] === "￾"
          ? ((this.hasBOM = !0), (this.css = this.css.slice(1)))
          : (this.hasBOM = !1),
        t.from &&
          (!_i || /^\w+:\/\//.test(t.from) || gs(t.from)
            ? (this.file = t.from)
            : (this.file = ys(t.from))),
        _i && fc)
      ) {
        let r = new hc(this.css, t);
        if (r.text) {
          this.map = r;
          let i = r.consumer().file;
          !this.file && i && (this.file = this.mapResolve(i));
        }
      }
      this.file || (this.id = "<input css " + cc(6) + ">"),
        this.map && (this.map.file = this.from);
    }
    error(e, t, r, i = {}) {
      let n, o, l;
      if (t && typeof t == "object") {
        let u = t,
          c = r;
        if (typeof u.offset == "number") {
          let h = this.fromOffset(u.offset);
          (t = h.line), (r = h.col);
        } else (t = u.line), (r = u.column);
        if (typeof c.offset == "number") {
          let h = this.fromOffset(c.offset);
          (o = h.line), (l = h.col);
        } else (o = c.line), (l = c.column);
      } else if (!r) {
        let u = this.fromOffset(t);
        (t = u.line), (r = u.col);
      }
      let a = this.origin(t, r, o, l);
      return (
        a
          ? (n = new Di(
              e,
              a.endLine === void 0
                ? a.line
                : { column: a.column, line: a.line },
              a.endLine === void 0
                ? a.column
                : { column: a.endColumn, line: a.endLine },
              a.source,
              a.file,
              i.plugin
            ))
          : (n = new Di(
              e,
              o === void 0 ? t : { column: r, line: t },
              o === void 0 ? r : { column: l, line: o },
              this.css,
              this.file,
              i.plugin
            )),
        (n.input = {
          column: r,
          endColumn: l,
          endLine: o,
          line: t,
          source: this.css,
        }),
        this.file &&
          (Ft && (n.input.url = Ft(this.file).toString()),
          (n.input.file = this.file)),
        n
      );
    }
    fromOffset(e) {
      let t, r;
      if (this[Ur]) r = this[Ur];
      else {
        let n = this.css.split(`
`);
        r = new Array(n.length);
        let o = 0;
        for (let l = 0, a = n.length; l < a; l++)
          (r[l] = o), (o += n[l].length + 1);
        this[Ur] = r;
      }
      t = r[r.length - 1];
      let i = 0;
      if (e >= t) i = r.length - 1;
      else {
        let n = r.length - 2,
          o;
        for (; i < n; )
          if (((o = i + ((n - i) >> 1)), e < r[o])) n = o - 1;
          else if (e >= r[o + 1]) i = o + 1;
          else {
            i = o;
            break;
          }
      }
      return { col: e - r[i] + 1, line: i + 1 };
    }
    mapResolve(e) {
      return /^\w+:\/\//.test(e)
        ? e
        : ys(this.map.consumer().sourceRoot || this.map.root || ".", e);
    }
    origin(e, t, r, i) {
      if (!this.map) return !1;
      let n = this.map.consumer(),
        o = n.originalPositionFor({ column: t, line: e });
      if (!o.source) return !1;
      let l;
      typeof r == "number" &&
        (l = n.originalPositionFor({ column: i, line: r }));
      let a;
      gs(o.source)
        ? (a = Ft(o.source))
        : (a = new URL(
            o.source,
            this.map.consumer().sourceRoot || Ft(this.map.mapFile)
          ));
      let u = {
        column: o.column,
        endColumn: l && l.column,
        endLine: l && l.line,
        line: o.line,
        url: a.toString(),
      };
      if (a.protocol === "file:")
        if (Li) u.file = Li(a);
        else
          throw new Error(
            "file: protocol is not available in this PostCSS build"
          );
      let c = n.sourceContentFor(o.source);
      return c && (u.source = c), u;
    }
    toJSON() {
      let e = {};
      for (let t of ["hasBOM", "css", "file", "id"])
        this[t] != null && (e[t] = this[t]);
      return (
        this.map &&
          ((e.map = { ...this.map }),
          e.map.consumerCache && (e.map.consumerCache = void 0)),
        e
      );
    }
    get from() {
      return this.file || this.id;
    }
  };
var Rr = cr;
cr.default = cr;
Fr && Fr.registerInput && Fr.registerInput(cr);
let { SourceMapConsumer: no, SourceMapGenerator: Qt } = ve,
  { dirname: qt, relative: oo, resolve: ao, sep: lo } = ve,
  { pathToFileURL: Fi } = ve,
  pc = Rr,
  dc = !!(no && Qt),
  mc = !!(qt && ao && oo && lo),
  gc = class {
    constructor(e, t, r, i) {
      (this.stringify = e),
        (this.mapOpts = r.map || {}),
        (this.root = t),
        (this.opts = r),
        (this.css = i),
        (this.originalCSS = i),
        (this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute),
        (this.memoizedFileURLs = new Map()),
        (this.memoizedPaths = new Map()),
        (this.memoizedURLs = new Map());
    }
    addAnnotation() {
      let e;
      this.isInline()
        ? (e =
            "data:application/json;base64," +
            this.toBase64(this.map.toString()))
        : typeof this.mapOpts.annotation == "string"
        ? (e = this.mapOpts.annotation)
        : typeof this.mapOpts.annotation == "function"
        ? (e = this.mapOpts.annotation(this.opts.to, this.root))
        : (e = this.outputFile() + ".map");
      let t = `
`;
      this.css.includes(`\r
`) &&
        (t = `\r
`),
        (this.css += t + "/*# sourceMappingURL=" + e + " */");
    }
    applyPrevMaps() {
      for (let e of this.previous()) {
        let t = this.toUrl(this.path(e.file)),
          r = e.root || qt(e.file),
          i;
        this.mapOpts.sourcesContent === !1
          ? ((i = new no(e.text)),
            i.sourcesContent && (i.sourcesContent = null))
          : (i = e.consumer()),
          this.map.applySourceMap(i, t, this.toUrl(this.path(r)));
      }
    }
    clearAnnotation() {
      if (this.mapOpts.annotation !== !1)
        if (this.root) {
          let e;
          for (let t = this.root.nodes.length - 1; t >= 0; t--)
            (e = this.root.nodes[t]),
              e.type === "comment" &&
                e.text.indexOf("# sourceMappingURL=") === 0 &&
                this.root.removeChild(t);
        } else
          this.css &&
            (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
    }
    generate() {
      if ((this.clearAnnotation(), mc && dc && this.isMap()))
        return this.generateMap();
      {
        let e = "";
        return (
          this.stringify(this.root, (t) => {
            e += t;
          }),
          [e]
        );
      }
    }
    generateMap() {
      if (this.root) this.generateString();
      else if (this.previous().length === 1) {
        let e = this.previous()[0].consumer();
        (e.file = this.outputFile()),
          (this.map = Qt.fromSourceMap(e, { ignoreInvalidMapping: !0 }));
      } else
        (this.map = new Qt({
          file: this.outputFile(),
          ignoreInvalidMapping: !0,
        })),
          this.map.addMapping({
            generated: { column: 0, line: 1 },
            original: { column: 0, line: 1 },
            source: this.opts.from
              ? this.toUrl(this.path(this.opts.from))
              : "<no source>",
          });
      return (
        this.isSourcesContent() && this.setSourcesContent(),
        this.root && this.previous().length > 0 && this.applyPrevMaps(),
        this.isAnnotation() && this.addAnnotation(),
        this.isInline() ? [this.css] : [this.css, this.map]
      );
    }
    generateString() {
      (this.css = ""),
        (this.map = new Qt({
          file: this.outputFile(),
          ignoreInvalidMapping: !0,
        }));
      let e = 1,
        t = 1,
        r = "<no source>",
        i = {
          generated: { column: 0, line: 0 },
          original: { column: 0, line: 0 },
          source: "",
        },
        n,
        o;
      this.stringify(this.root, (l, a, u) => {
        if (
          ((this.css += l),
          a &&
            u !== "end" &&
            ((i.generated.line = e),
            (i.generated.column = t - 1),
            a.source && a.source.start
              ? ((i.source = this.sourcePath(a)),
                (i.original.line = a.source.start.line),
                (i.original.column = a.source.start.column - 1),
                this.map.addMapping(i))
              : ((i.source = r),
                (i.original.line = 1),
                (i.original.column = 0),
                this.map.addMapping(i))),
          (n = l.match(/\n/g)),
          n
            ? ((e += n.length),
              (o = l.lastIndexOf(`
`)),
              (t = l.length - o))
            : (t += l.length),
          a && u !== "start")
        ) {
          let c = a.parent || { raws: {} };
          (!(a.type === "decl" || (a.type === "atrule" && !a.nodes)) ||
            a !== c.last ||
            c.raws.semicolon) &&
            (a.source && a.source.end
              ? ((i.source = this.sourcePath(a)),
                (i.original.line = a.source.end.line),
                (i.original.column = a.source.end.column - 1),
                (i.generated.line = e),
                (i.generated.column = t - 2),
                this.map.addMapping(i))
              : ((i.source = r),
                (i.original.line = 1),
                (i.original.column = 0),
                (i.generated.line = e),
                (i.generated.column = t - 1),
                this.map.addMapping(i)));
        }
      });
    }
    isAnnotation() {
      return this.isInline()
        ? !0
        : typeof this.mapOpts.annotation < "u"
        ? this.mapOpts.annotation
        : this.previous().length
        ? this.previous().some((e) => e.annotation)
        : !0;
    }
    isInline() {
      if (typeof this.mapOpts.inline < "u") return this.mapOpts.inline;
      let e = this.mapOpts.annotation;
      return typeof e < "u" && e !== !0
        ? !1
        : this.previous().length
        ? this.previous().some((t) => t.inline)
        : !0;
    }
    isMap() {
      return typeof this.opts.map < "u"
        ? !!this.opts.map
        : this.previous().length > 0;
    }
    isSourcesContent() {
      return typeof this.mapOpts.sourcesContent < "u"
        ? this.mapOpts.sourcesContent
        : this.previous().length
        ? this.previous().some((e) => e.withContent())
        : !0;
    }
    outputFile() {
      return this.opts.to
        ? this.path(this.opts.to)
        : this.opts.from
        ? this.path(this.opts.from)
        : "to.css";
    }
    path(e) {
      if (
        this.mapOpts.absolute ||
        e.charCodeAt(0) === 60 ||
        /^\w+:\/\//.test(e)
      )
        return e;
      let t = this.memoizedPaths.get(e);
      if (t) return t;
      let r = this.opts.to ? qt(this.opts.to) : ".";
      typeof this.mapOpts.annotation == "string" &&
        (r = qt(ao(r, this.mapOpts.annotation)));
      let i = oo(r, e);
      return this.memoizedPaths.set(e, i), i;
    }
    previous() {
      if (!this.previousMaps)
        if (((this.previousMaps = []), this.root))
          this.root.walk((e) => {
            if (e.source && e.source.input.map) {
              let t = e.source.input.map;
              this.previousMaps.includes(t) || this.previousMaps.push(t);
            }
          });
        else {
          let e = new pc(this.originalCSS, this.opts);
          e.map && this.previousMaps.push(e.map);
        }
      return this.previousMaps;
    }
    setSourcesContent() {
      let e = {};
      if (this.root)
        this.root.walk((t) => {
          if (t.source) {
            let r = t.source.input.from;
            if (r && !e[r]) {
              e[r] = !0;
              let i = this.usesFileUrls
                ? this.toFileUrl(r)
                : this.toUrl(this.path(r));
              this.map.setSourceContent(i, t.source.input.css);
            }
          }
        });
      else if (this.css) {
        let t = this.opts.from
          ? this.toUrl(this.path(this.opts.from))
          : "<no source>";
        this.map.setSourceContent(t, this.css);
      }
    }
    sourcePath(e) {
      return this.mapOpts.from
        ? this.toUrl(this.mapOpts.from)
        : this.usesFileUrls
        ? this.toFileUrl(e.source.input.from)
        : this.toUrl(this.path(e.source.input.from));
    }
    toBase64(e) {
      return Buffer
        ? Buffer.from(e).toString("base64")
        : window.btoa(unescape(encodeURIComponent(e)));
    }
    toFileUrl(e) {
      let t = this.memoizedFileURLs.get(e);
      if (t) return t;
      if (Fi) {
        let r = Fi(e).toString();
        return this.memoizedFileURLs.set(e, r), r;
      } else
        throw new Error(
          "`map.absolute` option is not available in this PostCSS build"
        );
    }
    toUrl(e) {
      let t = this.memoizedURLs.get(e);
      if (t) return t;
      lo === "\\" && (e = e.replace(/\\/g, "/"));
      let r = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
      return this.memoizedURLs.set(e, r), r;
    }
  };
var uo = gc;
let yc = Ir,
  ws = class extends yc {
    constructor(e) {
      super(e), (this.type = "comment");
    }
  };
var Or = ws;
ws.default = ws;
let { isClean: co, my: ho } = xt,
  fo = xr,
  po = Or,
  wc = Ir,
  mo,
  Js,
  Xs,
  go;
function yo(s) {
  return s.map((e) => (e.nodes && (e.nodes = yo(e.nodes)), delete e.source, e));
}
function wo(s) {
  if (((s[co] = !1), s.proxyOf.nodes)) for (let e of s.proxyOf.nodes) wo(e);
}
let Ae = class bo extends wc {
  append(...e) {
    for (let t of e) {
      let r = this.normalize(t, this.last);
      for (let i of r) this.proxyOf.nodes.push(i);
    }
    return this.markDirty(), this;
  }
  cleanRaws(e) {
    if ((super.cleanRaws(e), this.nodes))
      for (let t of this.nodes) t.cleanRaws(e);
  }
  each(e) {
    if (!this.proxyOf.nodes) return;
    let t = this.getIterator(),
      r,
      i;
    for (
      ;
      this.indexes[t] < this.proxyOf.nodes.length &&
      ((r = this.indexes[t]), (i = e(this.proxyOf.nodes[r], r)), i !== !1);

    )
      this.indexes[t] += 1;
    return delete this.indexes[t], i;
  }
  every(e) {
    return this.nodes.every(e);
  }
  getIterator() {
    this.lastEach || (this.lastEach = 0),
      this.indexes || (this.indexes = {}),
      (this.lastEach += 1);
    let e = this.lastEach;
    return (this.indexes[e] = 0), e;
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf"
          ? e
          : e[t]
          ? t === "each" || (typeof t == "string" && t.startsWith("walk"))
            ? (...r) =>
                e[t](
                  ...r.map((i) =>
                    typeof i == "function" ? (n, o) => i(n.toProxy(), o) : i
                  )
                )
            : t === "every" || t === "some"
            ? (r) => e[t]((i, ...n) => r(i.toProxy(), ...n))
            : t === "root"
            ? () => e.root().toProxy()
            : t === "nodes"
            ? e.nodes.map((r) => r.toProxy())
            : t === "first" || t === "last"
            ? e[t].toProxy()
            : e[t]
          : e[t];
      },
      set(e, t, r) {
        return (
          e[t] === r ||
            ((e[t] = r),
            (t === "name" || t === "params" || t === "selector") &&
              e.markDirty()),
          !0
        );
      },
    };
  }
  index(e) {
    return typeof e == "number"
      ? e
      : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
  }
  insertAfter(e, t) {
    let r = this.index(e),
      i = this.normalize(t, this.proxyOf.nodes[r]).reverse();
    r = this.index(e);
    for (let o of i) this.proxyOf.nodes.splice(r + 1, 0, o);
    let n;
    for (let o in this.indexes)
      (n = this.indexes[o]), r < n && (this.indexes[o] = n + i.length);
    return this.markDirty(), this;
  }
  insertBefore(e, t) {
    let r = this.index(e),
      i = r === 0 ? "prepend" : !1,
      n = this.normalize(t, this.proxyOf.nodes[r], i).reverse();
    r = this.index(e);
    for (let l of n) this.proxyOf.nodes.splice(r, 0, l);
    let o;
    for (let l in this.indexes)
      (o = this.indexes[l]), r <= o && (this.indexes[l] = o + n.length);
    return this.markDirty(), this;
  }
  normalize(e, t) {
    if (typeof e == "string") e = yo(mo(e).nodes);
    else if (typeof e > "u") e = [];
    else if (Array.isArray(e)) {
      e = e.slice(0);
      for (let i of e) i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type === "root" && this.type !== "document") {
      e = e.nodes.slice(0);
      for (let i of e) i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type) e = [e];
    else if (e.prop) {
      if (typeof e.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof e.value != "string" && (e.value = String(e.value)),
        (e = [new fo(e)]);
    } else if (e.selector) e = [new Js(e)];
    else if (e.name) e = [new Xs(e)];
    else if (e.text) e = [new po(e)];
    else throw new Error("Unknown node type in node creation");
    return e.map(
      (i) => (
        i[ho] || bo.rebuild(i),
        (i = i.proxyOf),
        i.parent && i.parent.removeChild(i),
        i[co] && wo(i),
        typeof i.raws.before > "u" &&
          t &&
          typeof t.raws.before < "u" &&
          (i.raws.before = t.raws.before.replace(/\S/g, "")),
        (i.parent = this.proxyOf),
        i
      )
    );
  }
  prepend(...e) {
    e = e.reverse();
    for (let t of e) {
      let r = this.normalize(t, this.first, "prepend").reverse();
      for (let i of r) this.proxyOf.nodes.unshift(i);
      for (let i in this.indexes) this.indexes[i] = this.indexes[i] + r.length;
    }
    return this.markDirty(), this;
  }
  push(e) {
    return (e.parent = this), this.proxyOf.nodes.push(e), this;
  }
  removeAll() {
    for (let e of this.proxyOf.nodes) e.parent = void 0;
    return (this.proxyOf.nodes = []), this.markDirty(), this;
  }
  removeChild(e) {
    (e = this.index(e)),
      (this.proxyOf.nodes[e].parent = void 0),
      this.proxyOf.nodes.splice(e, 1);
    let t;
    for (let r in this.indexes)
      (t = this.indexes[r]), t >= e && (this.indexes[r] = t - 1);
    return this.markDirty(), this;
  }
  replaceValues(e, t, r) {
    return (
      r || ((r = t), (t = {})),
      this.walkDecls((i) => {
        (t.props && !t.props.includes(i.prop)) ||
          (t.fast && !i.value.includes(t.fast)) ||
          (i.value = i.value.replace(e, r));
      }),
      this.markDirty(),
      this
    );
  }
  some(e) {
    return this.nodes.some(e);
  }
  walk(e) {
    return this.each((t, r) => {
      let i;
      try {
        i = e(t, r);
      } catch (n) {
        throw t.addToError(n);
      }
      return i !== !1 && t.walk && (i = t.walk(e)), i;
    });
  }
  walkAtRules(e, t) {
    return t
      ? e instanceof RegExp
        ? this.walk((r, i) => {
            if (r.type === "atrule" && e.test(r.name)) return t(r, i);
          })
        : this.walk((r, i) => {
            if (r.type === "atrule" && r.name === e) return t(r, i);
          })
      : ((t = e),
        this.walk((r, i) => {
          if (r.type === "atrule") return t(r, i);
        }));
  }
  walkComments(e) {
    return this.walk((t, r) => {
      if (t.type === "comment") return e(t, r);
    });
  }
  walkDecls(e, t) {
    return t
      ? e instanceof RegExp
        ? this.walk((r, i) => {
            if (r.type === "decl" && e.test(r.prop)) return t(r, i);
          })
        : this.walk((r, i) => {
            if (r.type === "decl" && r.prop === e) return t(r, i);
          })
      : ((t = e),
        this.walk((r, i) => {
          if (r.type === "decl") return t(r, i);
        }));
  }
  walkRules(e, t) {
    return t
      ? e instanceof RegExp
        ? this.walk((r, i) => {
            if (r.type === "rule" && e.test(r.selector)) return t(r, i);
          })
        : this.walk((r, i) => {
            if (r.type === "rule" && r.selector === e) return t(r, i);
          })
      : ((t = e),
        this.walk((r, i) => {
          if (r.type === "rule") return t(r, i);
        }));
  }
  get first() {
    if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
  }
  get last() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
};
Ae.registerParse = (s) => {
  mo = s;
};
Ae.registerRule = (s) => {
  Js = s;
};
Ae.registerAtRule = (s) => {
  Xs = s;
};
Ae.registerRoot = (s) => {
  go = s;
};
var Fe = Ae;
Ae.default = Ae;
Ae.rebuild = (s) => {
  s.type === "atrule"
    ? Object.setPrototypeOf(s, Xs.prototype)
    : s.type === "rule"
    ? Object.setPrototypeOf(s, Js.prototype)
    : s.type === "decl"
    ? Object.setPrototypeOf(s, fo.prototype)
    : s.type === "comment"
    ? Object.setPrototypeOf(s, po.prototype)
    : s.type === "root" && Object.setPrototypeOf(s, go.prototype),
    (s[ho] = !0),
    s.nodes &&
      s.nodes.forEach((e) => {
        Ae.rebuild(e);
      });
};
let bc = Fe,
  vo,
  So,
  mt = class extends bc {
    constructor(e) {
      super({ type: "document", ...e }), this.nodes || (this.nodes = []);
    }
    toResult(e = {}) {
      return new vo(new So(), this, e).stringify();
    }
  };
mt.registerLazyResult = (s) => {
  vo = s;
};
mt.registerProcessor = (s) => {
  So = s;
};
var Ks = mt;
mt.default = mt;
let bs = class {
  constructor(e, t = {}) {
    if (((this.type = "warning"), (this.text = e), t.node && t.node.source)) {
      let r = t.node.rangeBy(t);
      (this.line = r.start.line),
        (this.column = r.start.column),
        (this.endLine = r.end.line),
        (this.endColumn = r.end.column);
    }
    for (let r in t) this[r] = t[r];
  }
  toString() {
    return this.node
      ? this.node.error(this.text, {
          index: this.index,
          plugin: this.plugin,
          word: this.word,
        }).message
      : this.plugin
      ? this.plugin + ": " + this.text
      : this.text;
  }
};
var Co = bs;
bs.default = bs;
let vc = Co,
  vs = class {
    constructor(e, t, r) {
      (this.processor = e),
        (this.messages = []),
        (this.root = t),
        (this.opts = r),
        (this.css = void 0),
        (this.map = void 0);
    }
    toString() {
      return this.css;
    }
    warn(e, t = {}) {
      t.plugin ||
        (this.lastPlugin &&
          this.lastPlugin.postcssPlugin &&
          (t.plugin = this.lastPlugin.postcssPlugin));
      let r = new vc(e, t);
      return this.messages.push(r), r;
    }
    warnings() {
      return this.messages.filter((e) => e.type === "warning");
    }
    get content() {
      return this.css;
    }
  };
var Qs = vs;
vs.default = vs;
const Br = 39,
  Ui = 34,
  Ut = 92,
  Bi = 47,
  Bt = 10,
  st = 32,
  zt = 12,
  Wt = 9,
  Gt = 13,
  Sc = 91,
  Cc = 93,
  Ic = 40,
  xc = 41,
  Rc = 123,
  Oc = 125,
  Mc = 59,
  Ac = 42,
  Ec = 58,
  $c = 64,
  jt = /[\t\n\f\r "#'()/;[\\\]{}]/g,
  Vt = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
  Nc = /.[\r\n"'(/\\]/,
  zi = /[\da-f]/i;
var kc = function (e, t = {}) {
  let r = e.css.valueOf(),
    i = t.ignoreErrors,
    n,
    o,
    l,
    a,
    u,
    c,
    h,
    m,
    d,
    g,
    p = r.length,
    f = 0,
    S = [],
    v = [];
  function y() {
    return f;
  }
  function C(b) {
    throw e.error("Unclosed " + b, f);
  }
  function x() {
    return v.length === 0 && f >= p;
  }
  function R(b) {
    if (v.length) return v.pop();
    if (f >= p) return;
    let T = b ? b.ignoreUnclosed : !1;
    switch (((n = r.charCodeAt(f)), n)) {
      case Bt:
      case st:
      case Wt:
      case Gt:
      case zt: {
        o = f;
        do (o += 1), (n = r.charCodeAt(o));
        while (n === st || n === Bt || n === Wt || n === Gt || n === zt);
        (g = ["space", r.slice(f, o)]), (f = o - 1);
        break;
      }
      case Sc:
      case Cc:
      case Rc:
      case Oc:
      case Ec:
      case Mc:
      case xc: {
        let $ = String.fromCharCode(n);
        g = [$, $, f];
        break;
      }
      case Ic: {
        if (
          ((m = S.length ? S.pop()[1] : ""),
          (d = r.charCodeAt(f + 1)),
          m === "url" &&
            d !== Br &&
            d !== Ui &&
            d !== st &&
            d !== Bt &&
            d !== Wt &&
            d !== zt &&
            d !== Gt)
        ) {
          o = f;
          do {
            if (((c = !1), (o = r.indexOf(")", o + 1)), o === -1))
              if (i || T) {
                o = f;
                break;
              } else C("bracket");
            for (h = o; r.charCodeAt(h - 1) === Ut; ) (h -= 1), (c = !c);
          } while (c);
          (g = ["brackets", r.slice(f, o + 1), f, o]), (f = o);
        } else
          (o = r.indexOf(")", f + 1)),
            (a = r.slice(f, o + 1)),
            o === -1 || Nc.test(a)
              ? (g = ["(", "(", f])
              : ((g = ["brackets", a, f, o]), (f = o));
        break;
      }
      case Br:
      case Ui: {
        (l = n === Br ? "'" : '"'), (o = f);
        do {
          if (((c = !1), (o = r.indexOf(l, o + 1)), o === -1))
            if (i || T) {
              o = f + 1;
              break;
            } else C("string");
          for (h = o; r.charCodeAt(h - 1) === Ut; ) (h -= 1), (c = !c);
        } while (c);
        (g = ["string", r.slice(f, o + 1), f, o]), (f = o);
        break;
      }
      case $c: {
        (jt.lastIndex = f + 1),
          jt.test(r),
          jt.lastIndex === 0 ? (o = r.length - 1) : (o = jt.lastIndex - 2),
          (g = ["at-word", r.slice(f, o + 1), f, o]),
          (f = o);
        break;
      }
      case Ut: {
        for (o = f, u = !0; r.charCodeAt(o + 1) === Ut; ) (o += 1), (u = !u);
        if (
          ((n = r.charCodeAt(o + 1)),
          u &&
            n !== Bi &&
            n !== st &&
            n !== Bt &&
            n !== Wt &&
            n !== Gt &&
            n !== zt &&
            ((o += 1), zi.test(r.charAt(o))))
        ) {
          for (; zi.test(r.charAt(o + 1)); ) o += 1;
          r.charCodeAt(o + 1) === st && (o += 1);
        }
        (g = ["word", r.slice(f, o + 1), f, o]), (f = o);
        break;
      }
      default: {
        n === Bi && r.charCodeAt(f + 1) === Ac
          ? ((o = r.indexOf("*/", f + 2) + 1),
            o === 0 && (i || T ? (o = r.length) : C("comment")),
            (g = ["comment", r.slice(f, o + 1), f, o]),
            (f = o))
          : ((Vt.lastIndex = f + 1),
            Vt.test(r),
            Vt.lastIndex === 0 ? (o = r.length - 1) : (o = Vt.lastIndex - 2),
            (g = ["word", r.slice(f, o + 1), f, o]),
            S.push(g),
            (f = o));
        break;
      }
    }
    return f++, g;
  }
  function O(b) {
    v.push(b);
  }
  return { back: O, endOfFile: x, nextToken: R, position: y };
};
let Io = Fe,
  hr = class extends Io {
    constructor(e) {
      super(e), (this.type = "atrule");
    }
    append(...e) {
      return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
    }
    prepend(...e) {
      return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
    }
  };
var qs = hr;
hr.default = hr;
Io.registerAtRule(hr);
let xo = Fe,
  Ro,
  Oo,
  Je = class extends xo {
    constructor(e) {
      super(e), (this.type = "root"), this.nodes || (this.nodes = []);
    }
    normalize(e, t, r) {
      let i = super.normalize(e);
      if (t) {
        if (r === "prepend")
          this.nodes.length > 1
            ? (t.raws.before = this.nodes[1].raws.before)
            : delete t.raws.before;
        else if (this.first !== t)
          for (let n of i) n.raws.before = t.raws.before;
      }
      return i;
    }
    removeChild(e, t) {
      let r = this.index(e);
      return (
        !t &&
          r === 0 &&
          this.nodes.length > 1 &&
          (this.nodes[1].raws.before = this.nodes[r].raws.before),
        super.removeChild(e)
      );
    }
    toResult(e = {}) {
      return new Ro(new Oo(), this, e).stringify();
    }
  };
Je.registerLazyResult = (s) => {
  Ro = s;
};
Je.registerProcessor = (s) => {
  Oo = s;
};
var Rt = Je;
Je.default = Je;
xo.registerRoot(Je);
let gt = {
  comma(s) {
    return gt.split(s, [","], !0);
  },
  space(s) {
    let e = [
      " ",
      `
`,
      "	",
    ];
    return gt.split(s, e);
  },
  split(s, e, t) {
    let r = [],
      i = "",
      n = !1,
      o = 0,
      l = !1,
      a = "",
      u = !1;
    for (let c of s)
      u
        ? (u = !1)
        : c === "\\"
        ? (u = !0)
        : l
        ? c === a && (l = !1)
        : c === '"' || c === "'"
        ? ((l = !0), (a = c))
        : c === "("
        ? (o += 1)
        : c === ")"
        ? o > 0 && (o -= 1)
        : o === 0 && e.includes(c) && (n = !0),
        n ? (i !== "" && r.push(i.trim()), (i = ""), (n = !1)) : (i += c);
    return (t || i !== "") && r.push(i.trim()), r;
  },
};
var Mo = gt;
gt.default = gt;
let Ao = Fe,
  Pc = Mo,
  fr = class extends Ao {
    constructor(e) {
      super(e), (this.type = "rule"), this.nodes || (this.nodes = []);
    }
    get selectors() {
      return Pc.comma(this.selector);
    }
    set selectors(e) {
      let t = this.selector ? this.selector.match(/,\s*/) : null,
        r = t ? t[0] : "," + this.raw("between", "beforeOpen");
      this.selector = e.join(r);
    }
  };
var ei = fr;
fr.default = fr;
Ao.registerRule(fr);
let Tc = xr,
  Lc = kc,
  Dc = Or,
  _c = qs,
  Fc = Rt,
  Wi = ei;
const Gi = { empty: !0, space: !0 };
function Uc(s) {
  for (let e = s.length - 1; e >= 0; e--) {
    let t = s[e],
      r = t[3] || t[2];
    if (r) return r;
  }
}
let Bc = class {
  constructor(e) {
    (this.input = e),
      (this.root = new Fc()),
      (this.current = this.root),
      (this.spaces = ""),
      (this.semicolon = !1),
      this.createTokenizer(),
      (this.root.source = {
        input: e,
        start: { column: 1, line: 1, offset: 0 },
      });
  }
  atrule(e) {
    let t = new _c();
    (t.name = e[1].slice(1)),
      t.name === "" && this.unnamedAtrule(t, e),
      this.init(t, e[2]);
    let r,
      i,
      n,
      o = !1,
      l = !1,
      a = [],
      u = [];
    for (; !this.tokenizer.endOfFile(); ) {
      if (
        ((e = this.tokenizer.nextToken()),
        (r = e[0]),
        r === "(" || r === "["
          ? u.push(r === "(" ? ")" : "]")
          : r === "{" && u.length > 0
          ? u.push("}")
          : r === u[u.length - 1] && u.pop(),
        u.length === 0)
      )
        if (r === ";") {
          (t.source.end = this.getPosition(e[2])),
            t.source.end.offset++,
            (this.semicolon = !0);
          break;
        } else if (r === "{") {
          l = !0;
          break;
        } else if (r === "}") {
          if (a.length > 0) {
            for (n = a.length - 1, i = a[n]; i && i[0] === "space"; )
              i = a[--n];
            i &&
              ((t.source.end = this.getPosition(i[3] || i[2])),
              t.source.end.offset++);
          }
          this.end(e);
          break;
        } else a.push(e);
      else a.push(e);
      if (this.tokenizer.endOfFile()) {
        o = !0;
        break;
      }
    }
    (t.raws.between = this.spacesAndCommentsFromEnd(a)),
      a.length
        ? ((t.raws.afterName = this.spacesAndCommentsFromStart(a)),
          this.raw(t, "params", a),
          o &&
            ((e = a[a.length - 1]),
            (t.source.end = this.getPosition(e[3] || e[2])),
            t.source.end.offset++,
            (this.spaces = t.raws.between),
            (t.raws.between = "")))
        : ((t.raws.afterName = ""), (t.params = "")),
      l && ((t.nodes = []), (this.current = t));
  }
  checkMissedSemicolon(e) {
    let t = this.colon(e);
    if (t === !1) return;
    let r = 0,
      i;
    for (
      let n = t - 1;
      n >= 0 && ((i = e[n]), !(i[0] !== "space" && ((r += 1), r === 2)));
      n--
    );
    throw this.input.error(
      "Missed semicolon",
      i[0] === "word" ? i[3] + 1 : i[2]
    );
  }
  colon(e) {
    let t = 0,
      r,
      i,
      n;
    for (let [o, l] of e.entries()) {
      if (
        ((r = l),
        (i = r[0]),
        i === "(" && (t += 1),
        i === ")" && (t -= 1),
        t === 0 && i === ":")
      )
        if (!n) this.doubleColon(r);
        else {
          if (n[0] === "word" && n[1] === "progid") continue;
          return o;
        }
      n = r;
    }
    return !1;
  }
  comment(e) {
    let t = new Dc();
    this.init(t, e[2]),
      (t.source.end = this.getPosition(e[3] || e[2])),
      t.source.end.offset++;
    let r = e[1].slice(2, -2);
    if (/^\s*$/.test(r)) (t.text = ""), (t.raws.left = r), (t.raws.right = "");
    else {
      let i = r.match(/^(\s*)([^]*\S)(\s*)$/);
      (t.text = i[2]), (t.raws.left = i[1]), (t.raws.right = i[3]);
    }
  }
  createTokenizer() {
    this.tokenizer = Lc(this.input);
  }
  decl(e, t) {
    let r = new Tc();
    this.init(r, e[0][2]);
    let i = e[e.length - 1];
    for (
      i[0] === ";" && ((this.semicolon = !0), e.pop()),
        r.source.end = this.getPosition(i[3] || i[2] || Uc(e)),
        r.source.end.offset++;
      e[0][0] !== "word";

    )
      e.length === 1 && this.unknownWord(e), (r.raws.before += e.shift()[1]);
    for (r.source.start = this.getPosition(e[0][2]), r.prop = ""; e.length; ) {
      let u = e[0][0];
      if (u === ":" || u === "space" || u === "comment") break;
      r.prop += e.shift()[1];
    }
    r.raws.between = "";
    let n;
    for (; e.length; )
      if (((n = e.shift()), n[0] === ":")) {
        r.raws.between += n[1];
        break;
      } else
        n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]),
          (r.raws.between += n[1]);
    (r.prop[0] === "_" || r.prop[0] === "*") &&
      ((r.raws.before += r.prop[0]), (r.prop = r.prop.slice(1)));
    let o = [],
      l;
    for (; e.length && ((l = e[0][0]), !(l !== "space" && l !== "comment")); )
      o.push(e.shift());
    this.precheckMissedSemicolon(e);
    for (let u = e.length - 1; u >= 0; u--) {
      if (((n = e[u]), n[1].toLowerCase() === "!important")) {
        r.important = !0;
        let c = this.stringFrom(e, u);
        (c = this.spacesFromEnd(e) + c),
          c !== " !important" && (r.raws.important = c);
        break;
      } else if (n[1].toLowerCase() === "important") {
        let c = e.slice(0),
          h = "";
        for (let m = u; m > 0; m--) {
          let d = c[m][0];
          if (h.trim().indexOf("!") === 0 && d !== "space") break;
          h = c.pop()[1] + h;
        }
        h.trim().indexOf("!") === 0 &&
          ((r.important = !0), (r.raws.important = h), (e = c));
      }
      if (n[0] !== "space" && n[0] !== "comment") break;
    }
    e.some((u) => u[0] !== "space" && u[0] !== "comment") &&
      ((r.raws.between += o.map((u) => u[1]).join("")), (o = [])),
      this.raw(r, "value", o.concat(e), t),
      r.value.includes(":") && !t && this.checkMissedSemicolon(e);
  }
  doubleColon(e) {
    throw this.input.error(
      "Double colon",
      { offset: e[2] },
      { offset: e[2] + e[1].length }
    );
  }
  emptyRule(e) {
    let t = new Wi();
    this.init(t, e[2]),
      (t.selector = ""),
      (t.raws.between = ""),
      (this.current = t);
  }
  end(e) {
    this.current.nodes &&
      this.current.nodes.length &&
      (this.current.raws.semicolon = this.semicolon),
      (this.semicolon = !1),
      (this.current.raws.after = (this.current.raws.after || "") + this.spaces),
      (this.spaces = ""),
      this.current.parent
        ? ((this.current.source.end = this.getPosition(e[2])),
          this.current.source.end.offset++,
          (this.current = this.current.parent))
        : this.unexpectedClose(e);
  }
  endFile() {
    this.current.parent && this.unclosedBlock(),
      this.current.nodes &&
        this.current.nodes.length &&
        (this.current.raws.semicolon = this.semicolon),
      (this.current.raws.after = (this.current.raws.after || "") + this.spaces),
      (this.root.source.end = this.getPosition(this.tokenizer.position()));
  }
  freeSemicolon(e) {
    if (((this.spaces += e[1]), this.current.nodes)) {
      let t = this.current.nodes[this.current.nodes.length - 1];
      t &&
        t.type === "rule" &&
        !t.raws.ownSemicolon &&
        ((t.raws.ownSemicolon = this.spaces), (this.spaces = ""));
    }
  }
  getPosition(e) {
    let t = this.input.fromOffset(e);
    return { column: t.col, line: t.line, offset: e };
  }
  init(e, t) {
    this.current.push(e),
      (e.source = { input: this.input, start: this.getPosition(t) }),
      (e.raws.before = this.spaces),
      (this.spaces = ""),
      e.type !== "comment" && (this.semicolon = !1);
  }
  other(e) {
    let t = !1,
      r = null,
      i = !1,
      n = null,
      o = [],
      l = e[1].startsWith("--"),
      a = [],
      u = e;
    for (; u; ) {
      if (((r = u[0]), a.push(u), r === "(" || r === "["))
        n || (n = u), o.push(r === "(" ? ")" : "]");
      else if (l && i && r === "{") n || (n = u), o.push("}");
      else if (o.length === 0)
        if (r === ";")
          if (i) {
            this.decl(a, l);
            return;
          } else break;
        else if (r === "{") {
          this.rule(a);
          return;
        } else if (r === "}") {
          this.tokenizer.back(a.pop()), (t = !0);
          break;
        } else r === ":" && (i = !0);
      else r === o[o.length - 1] && (o.pop(), o.length === 0 && (n = null));
      u = this.tokenizer.nextToken();
    }
    if (
      (this.tokenizer.endOfFile() && (t = !0),
      o.length > 0 && this.unclosedBracket(n),
      t && i)
    ) {
      if (!l)
        for (
          ;
          a.length &&
          ((u = a[a.length - 1][0]), !(u !== "space" && u !== "comment"));

        )
          this.tokenizer.back(a.pop());
      this.decl(a, l);
    } else this.unknownWord(a);
  }
  parse() {
    let e;
    for (; !this.tokenizer.endOfFile(); )
      switch (((e = this.tokenizer.nextToken()), e[0])) {
        case "space":
          this.spaces += e[1];
          break;
        case ";":
          this.freeSemicolon(e);
          break;
        case "}":
          this.end(e);
          break;
        case "comment":
          this.comment(e);
          break;
        case "at-word":
          this.atrule(e);
          break;
        case "{":
          this.emptyRule(e);
          break;
        default:
          this.other(e);
          break;
      }
    this.endFile();
  }
  precheckMissedSemicolon() {}
  raw(e, t, r, i) {
    let n,
      o,
      l = r.length,
      a = "",
      u = !0,
      c,
      h;
    for (let m = 0; m < l; m += 1)
      (n = r[m]),
        (o = n[0]),
        o === "space" && m === l - 1 && !i
          ? (u = !1)
          : o === "comment"
          ? ((h = r[m - 1] ? r[m - 1][0] : "empty"),
            (c = r[m + 1] ? r[m + 1][0] : "empty"),
            !Gi[h] && !Gi[c]
              ? a.slice(-1) === ","
                ? (u = !1)
                : (a += n[1])
              : (u = !1))
          : (a += n[1]);
    if (!u) {
      let m = r.reduce((d, g) => d + g[1], "");
      e.raws[t] = { raw: m, value: a };
    }
    e[t] = a;
  }
  rule(e) {
    e.pop();
    let t = new Wi();
    this.init(t, e[0][2]),
      (t.raws.between = this.spacesAndCommentsFromEnd(e)),
      this.raw(t, "selector", e),
      (this.current = t);
  }
  spacesAndCommentsFromEnd(e) {
    let t,
      r = "";
    for (
      ;
      e.length &&
      ((t = e[e.length - 1][0]), !(t !== "space" && t !== "comment"));

    )
      r = e.pop()[1] + r;
    return r;
  }
  spacesAndCommentsFromStart(e) {
    let t,
      r = "";
    for (; e.length && ((t = e[0][0]), !(t !== "space" && t !== "comment")); )
      r += e.shift()[1];
    return r;
  }
  spacesFromEnd(e) {
    let t,
      r = "";
    for (; e.length && ((t = e[e.length - 1][0]), t === "space"); )
      r = e.pop()[1] + r;
    return r;
  }
  stringFrom(e, t) {
    let r = "";
    for (let i = t; i < e.length; i++) r += e[i][1];
    return e.splice(t, e.length - t), r;
  }
  unclosedBlock() {
    let e = this.current.source.start;
    throw this.input.error("Unclosed block", e.line, e.column);
  }
  unclosedBracket(e) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unexpectedClose(e) {
    throw this.input.error(
      "Unexpected }",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unknownWord(e) {
    throw this.input.error(
      "Unknown word",
      { offset: e[0][2] },
      { offset: e[0][2] + e[0][1].length }
    );
  }
  unnamedAtrule(e, t) {
    throw this.input.error(
      "At-rule without name",
      { offset: t[2] },
      { offset: t[2] + t[1].length }
    );
  }
};
var zc = Bc;
let Wc = Fe,
  Gc = zc,
  jc = Rr;
function pr(s, e) {
  let t = new jc(s, e),
    r = new Gc(t);
  try {
    r.parse();
  } catch (i) {
    throw i;
  }
  return r.root;
}
var ti = pr;
pr.default = pr;
Wc.registerParse(pr);
let { isClean: Ce, my: Vc } = xt,
  Hc = uo,
  Yc = Cr,
  Zc = Fe,
  Jc = Ks,
  ji = Qs,
  Xc = ti,
  Kc = Rt;
const Qc = {
    atrule: "AtRule",
    comment: "Comment",
    decl: "Declaration",
    document: "Document",
    root: "Root",
    rule: "Rule",
  },
  qc = {
    AtRule: !0,
    AtRuleExit: !0,
    Comment: !0,
    CommentExit: !0,
    Declaration: !0,
    DeclarationExit: !0,
    Document: !0,
    DocumentExit: !0,
    Once: !0,
    OnceExit: !0,
    postcssPlugin: !0,
    prepare: !0,
    Root: !0,
    RootExit: !0,
    Rule: !0,
    RuleExit: !0,
  },
  eh = { Once: !0, postcssPlugin: !0, prepare: !0 },
  Xe = 0;
function it(s) {
  return typeof s == "object" && typeof s.then == "function";
}
function Eo(s) {
  let e = !1,
    t = Qc[s.type];
  return (
    s.type === "decl"
      ? (e = s.prop.toLowerCase())
      : s.type === "atrule" && (e = s.name.toLowerCase()),
    e && s.append
      ? [t, t + "-" + e, Xe, t + "Exit", t + "Exit-" + e]
      : e
      ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e]
      : s.append
      ? [t, Xe, t + "Exit"]
      : [t, t + "Exit"]
  );
}
function Vi(s) {
  let e;
  return (
    s.type === "document"
      ? (e = ["Document", Xe, "DocumentExit"])
      : s.type === "root"
      ? (e = ["Root", Xe, "RootExit"])
      : (e = Eo(s)),
    {
      eventIndex: 0,
      events: e,
      iterator: 0,
      node: s,
      visitorIndex: 0,
      visitors: [],
    }
  );
}
function Ss(s) {
  return (s[Ce] = !1), s.nodes && s.nodes.forEach((e) => Ss(e)), s;
}
let Cs = {},
  Ke = class $o {
    constructor(e, t, r) {
      (this.stringified = !1), (this.processed = !1);
      let i;
      if (
        typeof t == "object" &&
        t !== null &&
        (t.type === "root" || t.type === "document")
      )
        i = Ss(t);
      else if (t instanceof $o || t instanceof ji)
        (i = Ss(t.root)),
          t.map &&
            (typeof r.map > "u" && (r.map = {}),
            r.map.inline || (r.map.inline = !1),
            (r.map.prev = t.map));
      else {
        let n = Xc;
        r.syntax && (n = r.syntax.parse),
          r.parser && (n = r.parser),
          n.parse && (n = n.parse);
        try {
          i = n(t, r);
        } catch (o) {
          (this.processed = !0), (this.error = o);
        }
        i && !i[Vc] && Zc.rebuild(i);
      }
      (this.result = new ji(e, i, r)),
        (this.helpers = { ...Cs, postcss: Cs, result: this.result }),
        (this.plugins = this.processor.plugins.map((n) =>
          typeof n == "object" && n.prepare
            ? { ...n, ...n.prepare(this.result) }
            : n
        ));
    }
    async() {
      return this.error
        ? Promise.reject(this.error)
        : this.processed
        ? Promise.resolve(this.result)
        : (this.processing || (this.processing = this.runAsync()),
          this.processing);
    }
    catch(e) {
      return this.async().catch(e);
    }
    finally(e) {
      return this.async().then(e, e);
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(e, t) {
      let r = this.result.lastPlugin;
      try {
        t && t.addToError(e),
          (this.error = e),
          e.name === "CssSyntaxError" && !e.plugin
            ? ((e.plugin = r.postcssPlugin), e.setMessage())
            : r.postcssVersion;
      } catch {}
      return e;
    }
    prepareVisitors() {
      this.listeners = {};
      let e = (t, r, i) => {
        this.listeners[r] || (this.listeners[r] = []),
          this.listeners[r].push([t, i]);
      };
      for (let t of this.plugins)
        if (typeof t == "object")
          for (let r in t) {
            if (!qc[r] && /^[A-Z]/.test(r))
              throw new Error(
                `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
              );
            if (!eh[r])
              if (typeof t[r] == "object")
                for (let i in t[r])
                  i === "*"
                    ? e(t, r, t[r][i])
                    : e(t, r + "-" + i.toLowerCase(), t[r][i]);
              else typeof t[r] == "function" && e(t, r, t[r]);
          }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    async runAsync() {
      this.plugin = 0;
      for (let e = 0; e < this.plugins.length; e++) {
        let t = this.plugins[e],
          r = this.runOnRoot(t);
        if (it(r))
          try {
            await r;
          } catch (i) {
            throw this.handleError(i);
          }
      }
      if ((this.prepareVisitors(), this.hasListener)) {
        let e = this.result.root;
        for (; !e[Ce]; ) {
          e[Ce] = !0;
          let t = [Vi(e)];
          for (; t.length > 0; ) {
            let r = this.visitTick(t);
            if (it(r))
              try {
                await r;
              } catch (i) {
                let n = t[t.length - 1].node;
                throw this.handleError(i, n);
              }
          }
        }
        if (this.listeners.OnceExit)
          for (let [t, r] of this.listeners.OnceExit) {
            this.result.lastPlugin = t;
            try {
              if (e.type === "document") {
                let i = e.nodes.map((n) => r(n, this.helpers));
                await Promise.all(i);
              } else await r(e, this.helpers);
            } catch (i) {
              throw this.handleError(i);
            }
          }
      }
      return (this.processed = !0), this.stringify();
    }
    runOnRoot(e) {
      this.result.lastPlugin = e;
      try {
        if (typeof e == "object" && e.Once) {
          if (this.result.root.type === "document") {
            let t = this.result.root.nodes.map((r) => e.Once(r, this.helpers));
            return it(t[0]) ? Promise.all(t) : t;
          }
          return e.Once(this.result.root, this.helpers);
        } else if (typeof e == "function")
          return e(this.result.root, this.result);
      } catch (t) {
        throw this.handleError(t);
      }
    }
    stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      (this.stringified = !0), this.sync();
      let e = this.result.opts,
        t = Yc;
      e.syntax && (t = e.syntax.stringify),
        e.stringifier && (t = e.stringifier),
        t.stringify && (t = t.stringify);
      let i = new Hc(t, this.result.root, this.result.opts).generate();
      return (this.result.css = i[0]), (this.result.map = i[1]), this.result;
    }
    sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      if (((this.processed = !0), this.processing)) throw this.getAsyncError();
      for (let e of this.plugins) {
        let t = this.runOnRoot(e);
        if (it(t)) throw this.getAsyncError();
      }
      if ((this.prepareVisitors(), this.hasListener)) {
        let e = this.result.root;
        for (; !e[Ce]; ) (e[Ce] = !0), this.walkSync(e);
        if (this.listeners.OnceExit)
          if (e.type === "document")
            for (let t of e.nodes) this.visitSync(this.listeners.OnceExit, t);
          else this.visitSync(this.listeners.OnceExit, e);
      }
      return this.result;
    }
    then(e, t) {
      return this.async().then(e, t);
    }
    toString() {
      return this.css;
    }
    visitSync(e, t) {
      for (let [r, i] of e) {
        this.result.lastPlugin = r;
        let n;
        try {
          n = i(t, this.helpers);
        } catch (o) {
          throw this.handleError(o, t.proxyOf);
        }
        if (t.type !== "root" && t.type !== "document" && !t.parent) return !0;
        if (it(n)) throw this.getAsyncError();
      }
    }
    visitTick(e) {
      let t = e[e.length - 1],
        { node: r, visitors: i } = t;
      if (r.type !== "root" && r.type !== "document" && !r.parent) {
        e.pop();
        return;
      }
      if (i.length > 0 && t.visitorIndex < i.length) {
        let [o, l] = i[t.visitorIndex];
        (t.visitorIndex += 1),
          t.visitorIndex === i.length &&
            ((t.visitors = []), (t.visitorIndex = 0)),
          (this.result.lastPlugin = o);
        try {
          return l(r.toProxy(), this.helpers);
        } catch (a) {
          throw this.handleError(a, r);
        }
      }
      if (t.iterator !== 0) {
        let o = t.iterator,
          l;
        for (; (l = r.nodes[r.indexes[o]]); )
          if (((r.indexes[o] += 1), !l[Ce])) {
            (l[Ce] = !0), e.push(Vi(l));
            return;
          }
        (t.iterator = 0), delete r.indexes[o];
      }
      let n = t.events;
      for (; t.eventIndex < n.length; ) {
        let o = n[t.eventIndex];
        if (((t.eventIndex += 1), o === Xe)) {
          r.nodes &&
            r.nodes.length &&
            ((r[Ce] = !0), (t.iterator = r.getIterator()));
          return;
        } else if (this.listeners[o]) {
          t.visitors = this.listeners[o];
          return;
        }
      }
      e.pop();
    }
    walkSync(e) {
      e[Ce] = !0;
      let t = Eo(e);
      for (let r of t)
        if (r === Xe)
          e.nodes &&
            e.each((i) => {
              i[Ce] || this.walkSync(i);
            });
        else {
          let i = this.listeners[r];
          if (i && this.visitSync(i, e.toProxy())) return;
        }
    }
    warnings() {
      return this.sync().warnings();
    }
    get content() {
      return this.stringify().content;
    }
    get css() {
      return this.stringify().css;
    }
    get map() {
      return this.stringify().map;
    }
    get messages() {
      return this.sync().messages;
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      return this.sync().root;
    }
    get [Symbol.toStringTag]() {
      return "LazyResult";
    }
  };
Ke.registerPostcss = (s) => {
  Cs = s;
};
var No = Ke;
Ke.default = Ke;
Kc.registerLazyResult(Ke);
Jc.registerLazyResult(Ke);
let th = uo,
  rh = Cr,
  sh = ti;
const ih = Qs;
let Is = class {
  constructor(e, t, r) {
    (t = t.toString()),
      (this.stringified = !1),
      (this._processor = e),
      (this._css = t),
      (this._opts = r),
      (this._map = void 0);
    let i,
      n = rh;
    (this.result = new ih(this._processor, i, this._opts)),
      (this.result.css = t);
    let o = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return o.root;
      },
    });
    let l = new th(n, i, this._opts, t);
    if (l.isMap()) {
      let [a, u] = l.generate();
      a && (this.result.css = a), u && (this.result.map = u);
    } else l.clearAnnotation(), (this.result.css = l.css);
  }
  async() {
    return this.error
      ? Promise.reject(this.error)
      : Promise.resolve(this.result);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(e, t) {
    return this.async().then(e, t);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root) return this._root;
    let e,
      t = sh;
    try {
      e = t(this._css, this._opts);
    } catch (r) {
      this.error = r;
    }
    if (this.error) throw this.error;
    return (this._root = e), e;
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
};
var nh = Is;
Is.default = Is;
let oh = nh,
  ah = No,
  lh = Ks,
  uh = Rt,
  yt = class {
    constructor(e = []) {
      (this.version = "8.4.38"), (this.plugins = this.normalize(e));
    }
    normalize(e) {
      let t = [];
      for (let r of e)
        if (
          (r.postcss === !0 ? (r = r()) : r.postcss && (r = r.postcss),
          typeof r == "object" && Array.isArray(r.plugins))
        )
          t = t.concat(r.plugins);
        else if (typeof r == "object" && r.postcssPlugin) t.push(r);
        else if (typeof r == "function") t.push(r);
        else if (!(typeof r == "object" && (r.parse || r.stringify)))
          throw new Error(r + " is not a PostCSS plugin");
      return t;
    }
    process(e, t = {}) {
      return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax
        ? new oh(this, e, t)
        : new ah(this, e, t);
    }
    use(e) {
      return (this.plugins = this.plugins.concat(this.normalize([e]))), this;
    }
  };
var ch = yt;
yt.default = yt;
uh.registerProcessor(yt);
lh.registerProcessor(yt);
let hh = xr,
  fh = io,
  ph = Or,
  dh = qs,
  mh = Rr,
  gh = Rt,
  yh = ei;
function wt(s, e) {
  if (Array.isArray(s)) return s.map((i) => wt(i));
  let { inputs: t, ...r } = s;
  if (t) {
    e = [];
    for (let i of t) {
      let n = { ...i, __proto__: mh.prototype };
      n.map && (n.map = { ...n.map, __proto__: fh.prototype }), e.push(n);
    }
  }
  if ((r.nodes && (r.nodes = s.nodes.map((i) => wt(i, e))), r.source)) {
    let { inputId: i, ...n } = r.source;
    (r.source = n), i != null && (r.source.input = e[i]);
  }
  if (r.type === "root") return new gh(r);
  if (r.type === "decl") return new hh(r);
  if (r.type === "rule") return new yh(r);
  if (r.type === "comment") return new ph(r);
  if (r.type === "atrule") return new dh(r);
  throw new Error("Unknown node type: " + s.type);
}
var wh = wt;
wt.default = wt;
let bh = Zs,
  ko = xr,
  vh = No,
  Sh = Fe,
  ri = ch,
  Ch = Cr,
  Ih = wh,
  Po = Ks,
  xh = Co,
  To = Or,
  Lo = qs,
  Rh = Qs,
  Oh = Rr,
  Mh = ti,
  Ah = Mo,
  Do = ei,
  _o = Rt,
  Eh = Ir;
function F(...s) {
  return s.length === 1 && Array.isArray(s[0]) && (s = s[0]), new ri(s);
}
F.plugin = function (e, t) {
  let r = !1;
  function i(...o) {
    console &&
      console.warn &&
      !r &&
      ((r = !0), rr.LANG && rr.LANG.startsWith("cn"));
    let l = t(...o);
    return (l.postcssPlugin = e), (l.postcssVersion = new ri().version), l;
  }
  let n;
  return (
    Object.defineProperty(i, "postcss", {
      get() {
        return n || (n = i()), n;
      },
    }),
    (i.process = function (o, l, a) {
      return F([i(a)]).process(o, l);
    }),
    i
  );
};
F.stringify = Ch;
F.parse = Mh;
F.fromJSON = Ih;
F.list = Ah;
F.comment = (s) => new To(s);
F.atRule = (s) => new Lo(s);
F.decl = (s) => new ko(s);
F.rule = (s) => new Do(s);
F.root = (s) => new _o(s);
F.document = (s) => new Po(s);
F.CssSyntaxError = bh;
F.Declaration = ko;
F.Container = Sh;
F.Processor = ri;
F.Document = Po;
F.Comment = To;
F.Warning = xh;
F.AtRule = Lo;
F.Result = Rh;
F.Input = Oh;
F.Rule = Do;
F.Root = _o;
F.Node = Eh;
vh.registerPostcss(F);
var $h = F;
F.default = F;
const Y = Gu($h);
Y.stringify;
Y.fromJSON;
Y.plugin;
Y.parse;
Y.list;
Y.document;
Y.comment;
Y.atRule;
Y.rule;
Y.decl;
Y.root;
Y.CssSyntaxError;
Y.Declaration;
Y.Container;
Y.Processor;
Y.Document;
Y.Comment;
Y.Warning;
Y.AtRule;
Y.Result;
Y.Input;
Y.Rule;
Y.Root;
Y.Node;
class si {
  constructor(...e) {
    ge(this, "parentElement", null),
      ge(this, "parentNode", null),
      ge(this, "ownerDocument"),
      ge(this, "firstChild", null),
      ge(this, "lastChild", null),
      ge(this, "previousSibling", null),
      ge(this, "nextSibling", null),
      ge(this, "ELEMENT_NODE", 1),
      ge(this, "TEXT_NODE", 3),
      ge(this, "nodeType"),
      ge(this, "nodeName"),
      ge(this, "RRNodeType");
  }
  get childNodes() {
    const e = [];
    let t = this.firstChild;
    for (; t; ) e.push(t), (t = t.nextSibling);
    return e;
  }
  contains(e) {
    if (e instanceof si) {
      if (e.ownerDocument !== this.ownerDocument) return !1;
      if (e === this) return !0;
    } else return !1;
    for (; e.parentNode; ) {
      if (e.parentNode === this) return !0;
      e = e.parentNode;
    }
    return !1;
  }
  appendChild(e) {
    throw new Error(
      "RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method."
    );
  }
  insertBefore(e, t) {
    throw new Error(
      "RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method."
    );
  }
  removeChild(e) {
    throw new Error(
      "RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method."
    );
  }
  toString() {
    return "RRNode";
  }
}
const Hi = {
    Node: ["childNodes", "parentNode", "parentElement", "textContent"],
    ShadowRoot: ["host", "styleSheets"],
    Element: ["shadowRoot", "querySelector", "querySelectorAll"],
    MutationObserver: [],
  },
  Yi = {
    Node: ["contains", "getRootNode"],
    ShadowRoot: ["getSelection"],
    Element: [],
    MutationObserver: ["constructor"],
  },
  Ht = {};
function ii(s) {
  if (Ht[s]) return Ht[s];
  const e = globalThis[s],
    t = e.prototype,
    r = s in Hi ? Hi[s] : void 0,
    i = !!(
      r &&
      r.every((l) => {
        var a, u;
        return !!(
          (u =
            (a = Object.getOwnPropertyDescriptor(t, l)) == null
              ? void 0
              : a.get) != null && u.toString().includes("[native code]")
        );
      })
    ),
    n = s in Yi ? Yi[s] : void 0,
    o = !!(
      n &&
      n.every((l) => {
        var a;
        return (
          typeof t[l] == "function" &&
          ((a = t[l]) == null ? void 0 : a.toString().includes("[native code]"))
        );
      })
    );
  if (i && o) return (Ht[s] = e.prototype), e.prototype;
  try {
    const l = document.createElement("iframe");
    document.body.appendChild(l);
    const a = l.contentWindow;
    if (!a) return e.prototype;
    const u = a[s].prototype;
    return document.body.removeChild(l), u ? (Ht[s] = u) : t;
  } catch {
    return t;
  }
}
const zr = {};
function Pe(s, e, t) {
  var r;
  const i = `${s}.${String(t)}`;
  if (zr[i]) return zr[i].call(e);
  const n = ii(s),
    o = (r = Object.getOwnPropertyDescriptor(n, t)) == null ? void 0 : r.get;
  return o ? ((zr[i] = o), o.call(e)) : e[t];
}
const Wr = {};
function Fo(s, e, t) {
  const r = `${s}.${String(t)}`;
  if (Wr[r]) return Wr[r].bind(e);
  const n = ii(s)[t];
  return typeof n != "function" ? e[t] : ((Wr[r] = n), n.bind(e));
}
function Nh(s) {
  return Pe("Node", s, "childNodes");
}
function kh(s) {
  return Pe("Node", s, "parentNode");
}
function Ph(s) {
  return Pe("Node", s, "parentElement");
}
function Th(s) {
  return Pe("Node", s, "textContent");
}
function Lh(s, e) {
  return Fo("Node", s, "contains")(e);
}
function Dh(s) {
  return Fo("Node", s, "getRootNode")();
}
function _h(s) {
  return !s || !("host" in s) ? null : Pe("ShadowRoot", s, "host");
}
function Fh(s) {
  return s.styleSheets;
}
function Uh(s) {
  return !s || !("shadowRoot" in s) ? null : Pe("Element", s, "shadowRoot");
}
function Bh(s, e) {
  return Pe("Element", s, "querySelector")(e);
}
function zh(s, e) {
  return Pe("Element", s, "querySelectorAll")(e);
}
function Uo() {
  return ii("MutationObserver").constructor;
}
const M = {
  childNodes: Nh,
  parentNode: kh,
  parentElement: Ph,
  textContent: Th,
  contains: Lh,
  getRootNode: Dh,
  host: _h,
  styleSheets: Fh,
  shadowRoot: Uh,
  querySelector: Bh,
  querySelectorAll: zh,
  mutationObserver: Uo,
};
function oe(s, e, t = document) {
  const r = { capture: !0, passive: !0 };
  return t.addEventListener(s, e, r), () => t.removeEventListener(s, e, r);
}
let Zi = {
  map: {},
  getId() {
    return -1;
  },
  getNode() {
    return null;
  },
  removeNodeFromMap() {},
  has() {
    return !1;
  },
  reset() {},
};
typeof window < "u" &&
  window.Proxy &&
  window.Reflect &&
  (Zi = new Proxy(Zi, {
    get(s, e, t) {
      return Reflect.get(s, e, t);
    },
  }));
function bt(s, e, t = {}) {
  let r = null,
    i = 0;
  return function (...n) {
    const o = Date.now();
    !i && t.leading === !1 && (i = o);
    const l = e - (o - i),
      a = this;
    l <= 0 || l > e
      ? (r && (clearTimeout(r), (r = null)), (i = o), s.apply(a, n))
      : !r &&
        t.trailing !== !1 &&
        (r = setTimeout(() => {
          (i = t.leading === !1 ? 0 : Date.now()), (r = null), s.apply(a, n);
        }, l));
  };
}
function Mr(s, e, t, r, i = window) {
  const n = i.Object.getOwnPropertyDescriptor(s, e);
  return (
    i.Object.defineProperty(
      s,
      e,
      r
        ? t
        : {
            set(o) {
              setTimeout(() => {
                t.set.call(this, o);
              }, 0),
                n && n.set && n.set.call(this, o);
            },
          }
    ),
    () => Mr(s, e, n || {}, !0)
  );
}
function qe(s, e, t) {
  try {
    if (!(e in s)) return () => {};
    const r = s[e],
      i = t(r);
    return (
      typeof i == "function" &&
        ((i.prototype = i.prototype || {}),
        Object.defineProperties(i, {
          __rrweb_original__: { enumerable: !1, value: r },
        })),
      (s[e] = i),
      () => {
        s[e] = r;
      }
    );
  } catch {
    return () => {};
  }
}
let dr = Date.now;
/[1-9][0-9]{12}/.test(Date.now().toString()) ||
  (dr = () => new Date().getTime());
function Bo(s) {
  var e, t, r, i;
  const n = s.document;
  return {
    left: n.scrollingElement
      ? n.scrollingElement.scrollLeft
      : s.pageXOffset !== void 0
      ? s.pageXOffset
      : n.documentElement.scrollLeft ||
        ((n == null ? void 0 : n.body) &&
          ((e = M.parentElement(n.body)) == null ? void 0 : e.scrollLeft)) ||
        ((t = n == null ? void 0 : n.body) == null ? void 0 : t.scrollLeft) ||
        0,
    top: n.scrollingElement
      ? n.scrollingElement.scrollTop
      : s.pageYOffset !== void 0
      ? s.pageYOffset
      : (n == null ? void 0 : n.documentElement.scrollTop) ||
        ((n == null ? void 0 : n.body) &&
          ((r = M.parentElement(n.body)) == null ? void 0 : r.scrollTop)) ||
        ((i = n == null ? void 0 : n.body) == null ? void 0 : i.scrollTop) ||
        0,
  };
}
function zo() {
  return (
    window.innerHeight ||
    (document.documentElement && document.documentElement.clientHeight) ||
    (document.body && document.body.clientHeight)
  );
}
function Wo() {
  return (
    window.innerWidth ||
    (document.documentElement && document.documentElement.clientWidth) ||
    (document.body && document.body.clientWidth)
  );
}
function Go(s) {
  return s ? (s.nodeType === s.ELEMENT_NODE ? s : M.parentElement(s)) : null;
}
function ae(s, e, t, r) {
  if (!s) return !1;
  const i = Go(s);
  if (!i) return !1;
  try {
    if (typeof e == "string") {
      if (i.classList.contains(e) || (r && i.closest("." + e) !== null))
        return !0;
    } else if (nr(i, e, r)) return !0;
  } catch {}
  return !!(t && (i.matches(t) || (r && i.closest(t) !== null)));
}
function Wh(s, e) {
  return e.getId(s) !== -1;
}
function Gr(s, e, t) {
  return s.tagName === "TITLE" && t.headTitleMutations ? !0 : e.getId(s) === ct;
}
function jo(s, e) {
  if (at(s)) return !1;
  const t = e.getId(s);
  if (!e.has(t)) return !0;
  const r = M.parentNode(s);
  return r && r.nodeType === s.DOCUMENT_NODE ? !1 : r ? jo(r, e) : !0;
}
function xs(s) {
  return !!s.changedTouches;
}
function Gh(s = window) {
  "NodeList" in s &&
    !s.NodeList.prototype.forEach &&
    (s.NodeList.prototype.forEach = Array.prototype.forEach),
    "DOMTokenList" in s &&
      !s.DOMTokenList.prototype.forEach &&
      (s.DOMTokenList.prototype.forEach = Array.prototype.forEach);
}
function Vo(s, e) {
  return !!(s.nodeName === "IFRAME" && e.getMeta(s));
}
function Ho(s, e) {
  return !!(
    s.nodeName === "LINK" &&
    s.nodeType === s.ELEMENT_NODE &&
    s.getAttribute &&
    s.getAttribute("rel") === "stylesheet" &&
    e.getMeta(s)
  );
}
function Rs(s) {
  return s
    ? s instanceof si && "shadowRoot" in s
      ? !!s.shadowRoot
      : !!M.shadowRoot(s)
    : !1;
}
class jh {
  constructor() {
    w(this, "id", 1),
      w(this, "styleIDMap", new WeakMap()),
      w(this, "idStyleMap", new Map());
  }
  getId(e) {
    return this.styleIDMap.get(e) ?? -1;
  }
  has(e) {
    return this.styleIDMap.has(e);
  }
  add(e, t) {
    if (this.has(e)) return this.getId(e);
    let r;
    return (
      t === void 0 ? (r = this.id++) : (r = t),
      this.styleIDMap.set(e, r),
      this.idStyleMap.set(r, e),
      r
    );
  }
  getStyle(e) {
    return this.idStyleMap.get(e) || null;
  }
  reset() {
    (this.styleIDMap = new WeakMap()),
      (this.idStyleMap = new Map()),
      (this.id = 1);
  }
  generateId() {
    return this.id++;
  }
}
function Yo(s) {
  var e;
  let t = null;
  return (
    "getRootNode" in s &&
      ((e = M.getRootNode(s)) == null ? void 0 : e.nodeType) ===
        Node.DOCUMENT_FRAGMENT_NODE &&
      M.host(M.getRootNode(s)) &&
      (t = M.host(M.getRootNode(s))),
    t
  );
}
function Vh(s) {
  let e = s,
    t;
  for (; (t = Yo(e)); ) e = t;
  return e;
}
function Hh(s) {
  const e = s.ownerDocument;
  if (!e) return !1;
  const t = Vh(s);
  return M.contains(e, t);
}
function Zo(s) {
  const e = s.ownerDocument;
  return e ? M.contains(e, s) || Hh(s) : !1;
}
var N = ((s) => (
    (s[(s.DomContentLoaded = 0)] = "DomContentLoaded"),
    (s[(s.Load = 1)] = "Load"),
    (s[(s.FullSnapshot = 2)] = "FullSnapshot"),
    (s[(s.IncrementalSnapshot = 3)] = "IncrementalSnapshot"),
    (s[(s.Meta = 4)] = "Meta"),
    (s[(s.Custom = 5)] = "Custom"),
    (s[(s.Plugin = 6)] = "Plugin"),
    s
  ))(N || {}),
  A = ((s) => (
    (s[(s.Mutation = 0)] = "Mutation"),
    (s[(s.MouseMove = 1)] = "MouseMove"),
    (s[(s.MouseInteraction = 2)] = "MouseInteraction"),
    (s[(s.Scroll = 3)] = "Scroll"),
    (s[(s.ViewportResize = 4)] = "ViewportResize"),
    (s[(s.Input = 5)] = "Input"),
    (s[(s.TouchMove = 6)] = "TouchMove"),
    (s[(s.MediaInteraction = 7)] = "MediaInteraction"),
    (s[(s.StyleSheetRule = 8)] = "StyleSheetRule"),
    (s[(s.CanvasMutation = 9)] = "CanvasMutation"),
    (s[(s.Font = 10)] = "Font"),
    (s[(s.Log = 11)] = "Log"),
    (s[(s.Drag = 12)] = "Drag"),
    (s[(s.StyleDeclaration = 13)] = "StyleDeclaration"),
    (s[(s.Selection = 14)] = "Selection"),
    (s[(s.AdoptedStyleSheet = 15)] = "AdoptedStyleSheet"),
    (s[(s.CustomElement = 16)] = "CustomElement"),
    s
  ))(A || {}),
  pe = ((s) => (
    (s[(s.MouseUp = 0)] = "MouseUp"),
    (s[(s.MouseDown = 1)] = "MouseDown"),
    (s[(s.Click = 2)] = "Click"),
    (s[(s.ContextMenu = 3)] = "ContextMenu"),
    (s[(s.DblClick = 4)] = "DblClick"),
    (s[(s.Focus = 5)] = "Focus"),
    (s[(s.Blur = 6)] = "Blur"),
    (s[(s.TouchStart = 7)] = "TouchStart"),
    (s[(s.TouchMove_Departed = 8)] = "TouchMove_Departed"),
    (s[(s.TouchEnd = 9)] = "TouchEnd"),
    (s[(s.TouchCancel = 10)] = "TouchCancel"),
    s
  ))(pe || {}),
  Oe = ((s) => (
    (s[(s.Mouse = 0)] = "Mouse"),
    (s[(s.Pen = 1)] = "Pen"),
    (s[(s.Touch = 2)] = "Touch"),
    s
  ))(Oe || {}),
  Qe = ((s) => (
    (s[(s["2D"] = 0)] = "2D"),
    (s[(s.WebGL = 1)] = "WebGL"),
    (s[(s.WebGL2 = 2)] = "WebGL2"),
    s
  ))(Qe || {}),
  We = ((s) => (
    (s[(s.Play = 0)] = "Play"),
    (s[(s.Pause = 1)] = "Pause"),
    (s[(s.Seeked = 2)] = "Seeked"),
    (s[(s.VolumeChange = 3)] = "VolumeChange"),
    (s[(s.RateChange = 4)] = "RateChange"),
    s
  ))(We || {});
function Ji(s) {
  return "__ln" in s;
}
class Yh {
  constructor() {
    w(this, "length", 0), w(this, "head", null), w(this, "tail", null);
  }
  get(e) {
    if (e >= this.length) throw new Error("Position outside of list range");
    let t = this.head;
    for (let r = 0; r < e; r++) t = (t == null ? void 0 : t.next) || null;
    return t;
  }
  addNode(e) {
    const t = { value: e, previous: null, next: null };
    if (((e.__ln = t), e.previousSibling && Ji(e.previousSibling))) {
      const r = e.previousSibling.__ln.next;
      (t.next = r),
        (t.previous = e.previousSibling.__ln),
        (e.previousSibling.__ln.next = t),
        r && (r.previous = t);
    } else if (
      e.nextSibling &&
      Ji(e.nextSibling) &&
      e.nextSibling.__ln.previous
    ) {
      const r = e.nextSibling.__ln.previous;
      (t.previous = r),
        (t.next = e.nextSibling.__ln),
        (e.nextSibling.__ln.previous = t),
        r && (r.next = t);
    } else
      this.head && (this.head.previous = t),
        (t.next = this.head),
        (this.head = t);
    t.next === null && (this.tail = t), this.length++;
  }
  removeNode(e) {
    const t = e.__ln;
    this.head &&
      (t.previous
        ? ((t.previous.next = t.next),
          t.next ? (t.next.previous = t.previous) : (this.tail = t.previous))
        : ((this.head = t.next),
          this.head ? (this.head.previous = null) : (this.tail = null)),
      e.__ln && delete e.__ln,
      this.length--);
  }
}
const Xi = (s, e) => `${s}@${e}`;
class Zh {
  constructor() {
    w(this, "frozen", !1),
      w(this, "locked", !1),
      w(this, "texts", []),
      w(this, "attributes", []),
      w(this, "attributeMap", new WeakMap()),
      w(this, "removes", []),
      w(this, "mapRemoves", []),
      w(this, "movedMap", {}),
      w(this, "addedSet", new Set()),
      w(this, "movedSet", new Set()),
      w(this, "droppedSet", new Set()),
      w(this, "mutationCb"),
      w(this, "blockClass"),
      w(this, "blockSelector"),
      w(this, "maskTextClass"),
      w(this, "maskTextSelector"),
      w(this, "inlineStylesheet"),
      w(this, "maskInputOptions"),
      w(this, "maskTextFn"),
      w(this, "maskInputFn"),
      w(this, "keepIframeSrcFn"),
      w(this, "recordCanvas"),
      w(this, "inlineImages"),
      w(this, "slimDOMOptions"),
      w(this, "dataURLOptions"),
      w(this, "doc"),
      w(this, "mirror"),
      w(this, "iframeManager"),
      w(this, "stylesheetManager"),
      w(this, "shadowDomManager"),
      w(this, "canvasManager"),
      w(this, "processedNodeManager"),
      w(this, "unattachedDoc"),
      w(this, "processMutations", (e) => {
        e.forEach(this.processMutation), this.emit();
      }),
      w(this, "emit", () => {
        if (this.frozen || this.locked) return;
        const e = [],
          t = new Set(),
          r = new Yh(),
          i = (a) => {
            let u = a,
              c = ct;
            for (; c === ct; )
              (u = u && u.nextSibling), (c = u && this.mirror.getId(u));
            return c;
          },
          n = (a) => {
            const u = M.parentNode(a);
            if (!u || !Zo(a) || u.tagName === "TEXTAREA") return;
            const c = at(u) ? this.mirror.getId(Yo(a)) : this.mirror.getId(u),
              h = i(a);
            if (c === -1 || h === -1) return r.addNode(a);
            const m = je(a, {
              doc: this.doc,
              mirror: this.mirror,
              blockClass: this.blockClass,
              blockSelector: this.blockSelector,
              maskTextClass: this.maskTextClass,
              maskTextSelector: this.maskTextSelector,
              skipChild: !0,
              newlyAddedElement: !0,
              inlineStylesheet: this.inlineStylesheet,
              maskInputOptions: this.maskInputOptions,
              maskTextFn: this.maskTextFn,
              maskInputFn: this.maskInputFn,
              slimDOMOptions: this.slimDOMOptions,
              dataURLOptions: this.dataURLOptions,
              recordCanvas: this.recordCanvas,
              inlineImages: this.inlineImages,
              onSerialize: (d) => {
                Vo(d, this.mirror) && this.iframeManager.addIframe(d),
                  Ho(d, this.mirror) &&
                    this.stylesheetManager.trackLinkElement(d),
                  Rs(a) &&
                    this.shadowDomManager.addShadowRoot(
                      M.shadowRoot(a),
                      this.doc
                    );
              },
              onIframeLoad: (d, g) => {
                this.iframeManager.attachIframe(d, g),
                  this.shadowDomManager.observeAttachShadow(d);
              },
              onStylesheetLoad: (d, g) => {
                this.stylesheetManager.attachLinkElement(d, g);
              },
            });
            m && (e.push({ parentId: c, nextId: h, node: m }), t.add(m.id));
          };
        for (; this.mapRemoves.length; )
          this.mirror.removeNodeFromMap(this.mapRemoves.shift());
        for (const a of this.movedSet)
          (Ki(this.removes, a, this.mirror) &&
            !this.movedSet.has(M.parentNode(a))) ||
            n(a);
        for (const a of this.addedSet)
          (!Qi(this.droppedSet, a) && !Ki(this.removes, a, this.mirror)) ||
          Qi(this.movedSet, a)
            ? n(a)
            : this.droppedSet.add(a);
        let o = null;
        for (; r.length; ) {
          let a = null;
          if (o) {
            const u = this.mirror.getId(M.parentNode(o.value)),
              c = i(o.value);
            u !== -1 && c !== -1 && (a = o);
          }
          if (!a) {
            let u = r.tail;
            for (; u; ) {
              const c = u;
              if (((u = u.previous), c)) {
                const h = this.mirror.getId(M.parentNode(c.value));
                if (i(c.value) === -1) continue;
                if (h !== -1) {
                  a = c;
                  break;
                } else {
                  const d = c.value,
                    g = M.parentNode(d);
                  if (g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    const p = M.host(g);
                    if (this.mirror.getId(p) !== -1) {
                      a = c;
                      break;
                    }
                  }
                }
              }
            }
          }
          if (!a) {
            for (; r.head; ) r.removeNode(r.head.value);
            break;
          }
          (o = a.previous), r.removeNode(a.value), n(a.value);
        }
        const l = {
          texts: this.texts
            .map((a) => {
              const u = a.node,
                c = M.parentNode(u);
              return (
                c &&
                  c.tagName === "TEXTAREA" &&
                  this.genTextAreaValueMutation(c),
                { id: this.mirror.getId(u), value: a.value }
              );
            })
            .filter((a) => !t.has(a.id))
            .filter((a) => this.mirror.has(a.id)),
          attributes: this.attributes
            .map((a) => {
              const { attributes: u } = a;
              if (typeof u.style == "string") {
                const c = JSON.stringify(a.styleDiff),
                  h = JSON.stringify(a._unchangedStyles);
                c.length < u.style.length &&
                  (c + h).split("var(").length ===
                    u.style.split("var(").length &&
                  (u.style = a.styleDiff);
              }
              return { id: this.mirror.getId(a.node), attributes: u };
            })
            .filter((a) => !t.has(a.id))
            .filter((a) => this.mirror.has(a.id)),
          removes: this.removes,
          adds: e,
        };
        (!l.texts.length &&
          !l.attributes.length &&
          !l.removes.length &&
          !l.adds.length) ||
          ((this.texts = []),
          (this.attributes = []),
          (this.attributeMap = new WeakMap()),
          (this.removes = []),
          (this.addedSet = new Set()),
          (this.movedSet = new Set()),
          (this.droppedSet = new Set()),
          (this.movedMap = {}),
          this.mutationCb(l));
      }),
      w(this, "genTextAreaValueMutation", (e) => {
        let t = this.attributeMap.get(e);
        t ||
          ((t = {
            node: e,
            attributes: {},
            styleDiff: {},
            _unchangedStyles: {},
          }),
          this.attributes.push(t),
          this.attributeMap.set(e, t)),
          (t.attributes.value = Array.from(
            M.childNodes(e),
            (r) => M.textContent(r) || ""
          ).join(""));
      }),
      w(this, "processMutation", (e) => {
        if (!Gr(e.target, this.mirror, this.slimDOMOptions))
          switch (e.type) {
            case "characterData": {
              const t = M.textContent(e.target);
              !ae(e.target, this.blockClass, this.blockSelector, !1) &&
                t !== e.oldValue &&
                this.texts.push({
                  value:
                    wn(
                      e.target,
                      this.maskTextClass,
                      this.maskTextSelector,
                      !0
                    ) && t
                      ? this.maskTextFn
                        ? this.maskTextFn(t, Go(e.target))
                        : t.replace(/[\S]/g, "*")
                      : t,
                  node: e.target,
                });
              break;
            }
            case "attributes": {
              const t = e.target;
              let r = e.attributeName,
                i = e.target.getAttribute(r);
              if (r === "value") {
                const o = Ls(t);
                i = Ts({
                  element: t,
                  maskInputOptions: this.maskInputOptions,
                  tagName: t.tagName,
                  type: o,
                  value: i,
                  maskInputFn: this.maskInputFn,
                });
              }
              if (
                ae(e.target, this.blockClass, this.blockSelector, !1) ||
                i === e.oldValue
              )
                return;
              let n = this.attributeMap.get(e.target);
              if (
                t.tagName === "IFRAME" &&
                r === "src" &&
                !this.keepIframeSrcFn(i)
              )
                if (!t.contentDocument) r = "rr_src";
                else return;
              if (
                (n ||
                  ((n = {
                    node: e.target,
                    attributes: {},
                    styleDiff: {},
                    _unchangedStyles: {},
                  }),
                  this.attributes.push(n),
                  this.attributeMap.set(e.target, n)),
                r === "type" &&
                  t.tagName === "INPUT" &&
                  (e.oldValue || "").toLowerCase() === "password" &&
                  t.setAttribute("data-rr-is-password", "true"),
                !yn(t.tagName, r))
              )
                if (
                  ((n.attributes[r] = gn(this.doc, De(t.tagName), De(r), i)),
                  r === "style")
                ) {
                  if (!this.unattachedDoc)
                    try {
                      this.unattachedDoc =
                        document.implementation.createHTMLDocument();
                    } catch {
                      this.unattachedDoc = this.doc;
                    }
                  const o = this.unattachedDoc.createElement("span");
                  e.oldValue && o.setAttribute("style", e.oldValue);
                  for (const l of Array.from(t.style)) {
                    const a = t.style.getPropertyValue(l),
                      u = t.style.getPropertyPriority(l);
                    a !== o.style.getPropertyValue(l) ||
                    u !== o.style.getPropertyPriority(l)
                      ? u === ""
                        ? (n.styleDiff[l] = a)
                        : (n.styleDiff[l] = [a, u])
                      : (n._unchangedStyles[l] = [a, u]);
                  }
                  for (const l of Array.from(o.style))
                    t.style.getPropertyValue(l) === "" && (n.styleDiff[l] = !1);
                } else
                  r === "open" &&
                    t.tagName === "DIALOG" &&
                    (t.matches("dialog:modal")
                      ? (n.attributes.rr_open_mode = "modal")
                      : (n.attributes.rr_open_mode = "non-modal"));
              break;
            }
            case "childList": {
              if (ae(e.target, this.blockClass, this.blockSelector, !0)) return;
              if (e.target.tagName === "TEXTAREA") {
                this.genTextAreaValueMutation(e.target);
                return;
              }
              e.addedNodes.forEach((t) => this.genAdds(t, e.target)),
                e.removedNodes.forEach((t) => {
                  const r = this.mirror.getId(t),
                    i = at(e.target)
                      ? this.mirror.getId(M.host(e.target))
                      : this.mirror.getId(e.target);
                  ae(e.target, this.blockClass, this.blockSelector, !1) ||
                    Gr(t, this.mirror, this.slimDOMOptions) ||
                    !Wh(t, this.mirror) ||
                    (this.addedSet.has(t)
                      ? (Os(this.addedSet, t), this.droppedSet.add(t))
                      : (this.addedSet.has(e.target) && r === -1) ||
                        jo(e.target, this.mirror) ||
                        (this.movedSet.has(t) && this.movedMap[Xi(r, i)]
                          ? Os(this.movedSet, t)
                          : this.removes.push({
                              parentId: i,
                              id: r,
                              isShadow:
                                at(e.target) && lt(e.target) ? !0 : void 0,
                            })),
                    this.mapRemoves.push(t));
                });
              break;
            }
          }
      }),
      w(this, "genAdds", (e, t) => {
        if (
          !this.processedNodeManager.inOtherBuffer(e, this) &&
          !(this.addedSet.has(e) || this.movedSet.has(e))
        ) {
          if (this.mirror.hasNode(e)) {
            if (Gr(e, this.mirror, this.slimDOMOptions)) return;
            this.movedSet.add(e);
            let r = null;
            t && this.mirror.hasNode(t) && (r = this.mirror.getId(t)),
              r &&
                r !== -1 &&
                (this.movedMap[Xi(this.mirror.getId(e), r)] = !0);
          } else this.addedSet.add(e), this.droppedSet.delete(e);
          ae(e, this.blockClass, this.blockSelector, !1) ||
            (M.childNodes(e).forEach((r) => this.genAdds(r)),
            Rs(e) &&
              M.childNodes(M.shadowRoot(e)).forEach((r) => {
                this.processedNodeManager.add(r, this), this.genAdds(r, e);
              }));
        }
      });
  }
  init(e) {
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "maskTextClass",
      "maskTextSelector",
      "inlineStylesheet",
      "maskInputOptions",
      "maskTextFn",
      "maskInputFn",
      "keepIframeSrcFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "dataURLOptions",
      "doc",
      "mirror",
      "iframeManager",
      "stylesheetManager",
      "shadowDomManager",
      "canvasManager",
      "processedNodeManager",
    ].forEach((t) => {
      this[t] = e[t];
    });
  }
  freeze() {
    (this.frozen = !0), this.canvasManager.freeze();
  }
  unfreeze() {
    (this.frozen = !1), this.canvasManager.unfreeze(), this.emit();
  }
  isFrozen() {
    return this.frozen;
  }
  lock() {
    (this.locked = !0), this.canvasManager.lock();
  }
  unlock() {
    (this.locked = !1), this.canvasManager.unlock(), this.emit();
  }
  reset() {
    this.shadowDomManager.reset(), this.canvasManager.reset();
  }
}
function Os(s, e) {
  s.delete(e), M.childNodes(e).forEach((t) => Os(s, t));
}
function Ki(s, e, t) {
  return s.length === 0 ? !1 : Jh(s, e, t);
}
function Jh(s, e, t) {
  let r = M.parentNode(e);
  for (; r; ) {
    const i = t.getId(r);
    if (s.some((n) => n.id === i)) return !0;
    r = M.parentNode(r);
  }
  return !1;
}
function Qi(s, e) {
  return s.size === 0 ? !1 : Jo(s, e);
}
function Jo(s, e) {
  const t = M.parentNode(e);
  return t ? (s.has(t) ? !0 : Jo(s, t)) : !1;
}
let ut;
function Xh(s) {
  ut = s;
}
function Kh() {
  ut = void 0;
}
const E = (s) =>
    ut
      ? (...t) => {
          try {
            return s(...t);
          } catch (r) {
            if (ut && ut(r) === !0) return;
            throw r;
          }
        }
      : s,
  Le = [];
function Ot(s) {
  try {
    if ("composedPath" in s) {
      const e = s.composedPath();
      if (e.length) return e[0];
    } else if ("path" in s && s.path.length) return s.path[0];
  } catch {}
  return s && s.target;
}
function Xo(s, e) {
  const t = new Zh();
  Le.push(t), t.init(s);
  const r = new (Uo())(E(t.processMutations.bind(t)));
  return (
    r.observe(e, {
      attributes: !0,
      attributeOldValue: !0,
      characterData: !0,
      characterDataOldValue: !0,
      childList: !0,
      subtree: !0,
    }),
    r
  );
}
function Qh({ mousemoveCb: s, sampling: e, doc: t, mirror: r }) {
  if (e.mousemove === !1) return () => {};
  const i = typeof e.mousemove == "number" ? e.mousemove : 50,
    n = typeof e.mousemoveCallback == "number" ? e.mousemoveCallback : 500;
  let o = [],
    l;
  const a = bt(
      E((h) => {
        const m = Date.now() - l;
        s(
          o.map((d) => ((d.timeOffset -= m), d)),
          h
        ),
          (o = []),
          (l = null);
      }),
      n
    ),
    u = E(
      bt(
        E((h) => {
          const m = Ot(h),
            { clientX: d, clientY: g } = xs(h) ? h.changedTouches[0] : h;
          l || (l = dr()),
            o.push({ x: d, y: g, id: r.getId(m), timeOffset: dr() - l }),
            a(
              typeof DragEvent < "u" && h instanceof DragEvent
                ? A.Drag
                : h instanceof MouseEvent
                ? A.MouseMove
                : A.TouchMove
            );
        }),
        i,
        { trailing: !1 }
      )
    ),
    c = [oe("mousemove", u, t), oe("touchmove", u, t), oe("drag", u, t)];
  return E(() => {
    c.forEach((h) => h());
  });
}
function qh({
  mouseInteractionCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  sampling: n,
}) {
  if (n.mouseInteraction === !1) return () => {};
  const o =
      n.mouseInteraction === !0 || n.mouseInteraction === void 0
        ? {}
        : n.mouseInteraction,
    l = [];
  let a = null;
  const u = (c) => (h) => {
    const m = Ot(h);
    if (ae(m, r, i, !0)) return;
    let d = null,
      g = c;
    if ("pointerType" in h) {
      switch (h.pointerType) {
        case "mouse":
          d = Oe.Mouse;
          break;
        case "touch":
          d = Oe.Touch;
          break;
        case "pen":
          d = Oe.Pen;
          break;
      }
      d === Oe.Touch
        ? pe[c] === pe.MouseDown
          ? (g = "TouchStart")
          : pe[c] === pe.MouseUp && (g = "TouchEnd")
        : Oe.Pen;
    } else xs(h) && (d = Oe.Touch);
    d !== null
      ? ((a = d),
        ((g.startsWith("Touch") && d === Oe.Touch) ||
          (g.startsWith("Mouse") && d === Oe.Mouse)) &&
          (d = null))
      : pe[c] === pe.Click && ((d = a), (a = null));
    const p = xs(h) ? h.changedTouches[0] : h;
    if (!p) return;
    const f = t.getId(m),
      { clientX: S, clientY: v } = p;
    E(s)({
      type: pe[g],
      id: f,
      x: S,
      y: v,
      ...(d !== null && { pointerType: d }),
    });
  };
  return (
    Object.keys(pe)
      .filter(
        (c) =>
          Number.isNaN(Number(c)) && !c.endsWith("_Departed") && o[c] !== !1
      )
      .forEach((c) => {
        let h = De(c);
        const m = u(c);
        if (window.PointerEvent)
          switch (pe[c]) {
            case pe.MouseDown:
            case pe.MouseUp:
              h = h.replace("mouse", "pointer");
              break;
            case pe.TouchStart:
            case pe.TouchEnd:
              return;
          }
        l.push(oe(h, m, e));
      }),
    E(() => {
      l.forEach((c) => c());
    })
  );
}
function Ko({
  scrollCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  sampling: n,
}) {
  const o = E(
    bt(
      E((l) => {
        const a = Ot(l);
        if (!a || ae(a, r, i, !0)) return;
        const u = t.getId(a);
        if (a === e && e.defaultView) {
          const c = Bo(e.defaultView);
          s({ id: u, x: c.left, y: c.top });
        } else s({ id: u, x: a.scrollLeft, y: a.scrollTop });
      }),
      n.scroll || 100
    )
  );
  return oe("scroll", o, e);
}
function ef({ viewportResizeCb: s }, { win: e }) {
  let t = -1,
    r = -1;
  const i = E(
    bt(
      E(() => {
        const n = zo(),
          o = Wo();
        (t !== n || r !== o) &&
          (s({ width: Number(o), height: Number(n) }), (t = n), (r = o));
      }),
      200
    )
  );
  return oe("resize", i, e);
}
const tf = ["INPUT", "TEXTAREA", "SELECT"],
  qi = new WeakMap();
function rf({
  inputCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  ignoreClass: n,
  ignoreSelector: o,
  maskInputOptions: l,
  maskInputFn: a,
  sampling: u,
  userTriggeredOnInput: c,
}) {
  function h(v) {
    let y = Ot(v);
    const C = v.isTrusted,
      x = y && y.tagName;
    if (
      (y && x === "OPTION" && (y = M.parentElement(y)),
      !y ||
        !x ||
        tf.indexOf(x) < 0 ||
        ae(y, r, i, !0) ||
        y.classList.contains(n) ||
        (o && y.matches(o)))
    )
      return;
    let R = y.value,
      O = !1;
    const b = Ls(y) || "";
    b === "radio" || b === "checkbox"
      ? (O = y.checked)
      : (l[x.toLowerCase()] || l[b]) &&
        (R = Ts({
          element: y,
          maskInputOptions: l,
          tagName: x,
          type: b,
          value: R,
          maskInputFn: a,
        })),
      m(
        y,
        c
          ? { text: R, isChecked: O, userTriggered: C }
          : { text: R, isChecked: O }
      );
    const T = y.name;
    b === "radio" &&
      T &&
      O &&
      e.querySelectorAll(`input[type="radio"][name="${T}"]`).forEach(($) => {
        if ($ !== y) {
          const Q = $.value;
          m(
            $,
            c
              ? { text: Q, isChecked: !O, userTriggered: !1 }
              : { text: Q, isChecked: !O }
          );
        }
      });
  }
  function m(v, y) {
    const C = qi.get(v);
    if (!C || C.text !== y.text || C.isChecked !== y.isChecked) {
      qi.set(v, y);
      const x = t.getId(v);
      E(s)({ ...y, id: x });
    }
  }
  const g = (u.input === "last" ? ["change"] : ["input", "change"]).map((v) =>
      oe(v, E(h), e)
    ),
    p = e.defaultView;
  if (!p)
    return () => {
      g.forEach((v) => v());
    };
  const f = p.Object.getOwnPropertyDescriptor(
      p.HTMLInputElement.prototype,
      "value"
    ),
    S = [
      [p.HTMLInputElement.prototype, "value"],
      [p.HTMLInputElement.prototype, "checked"],
      [p.HTMLSelectElement.prototype, "value"],
      [p.HTMLTextAreaElement.prototype, "value"],
      [p.HTMLSelectElement.prototype, "selectedIndex"],
      [p.HTMLOptionElement.prototype, "selected"],
    ];
  return (
    f &&
      f.set &&
      g.push(
        ...S.map((v) =>
          Mr(
            v[0],
            v[1],
            {
              set() {
                E(h)({ target: this, isTrusted: !1 });
              },
            },
            !1,
            p
          )
        )
      ),
    E(() => {
      g.forEach((v) => v());
    })
  );
}
function mr(s) {
  const e = [];
  function t(r, i) {
    if (
      (Yt("CSSGroupingRule") && r.parentRule instanceof CSSGroupingRule) ||
      (Yt("CSSMediaRule") && r.parentRule instanceof CSSMediaRule) ||
      (Yt("CSSSupportsRule") && r.parentRule instanceof CSSSupportsRule) ||
      (Yt("CSSConditionRule") && r.parentRule instanceof CSSConditionRule)
    ) {
      const o = Array.from(r.parentRule.cssRules).indexOf(r);
      i.unshift(o);
    } else if (r.parentStyleSheet) {
      const o = Array.from(r.parentStyleSheet.cssRules).indexOf(r);
      i.unshift(o);
    }
    return i;
  }
  return t(s, e);
}
function $e(s, e, t) {
  let r, i;
  return s
    ? (s.ownerNode ? (r = e.getId(s.ownerNode)) : (i = t.getId(s)),
      { styleId: i, id: r })
    : {};
}
function sf(
  { styleSheetRuleCb: s, mirror: e, stylesheetManager: t },
  { win: r }
) {
  if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype) return () => {};
  const i = r.CSSStyleSheet.prototype.insertRule;
  (r.CSSStyleSheet.prototype.insertRule = new Proxy(i, {
    apply: E((c, h, m) => {
      const [d, g] = m,
        { id: p, styleId: f } = $e(h, e, t.styleMirror);
      return (
        ((p && p !== -1) || (f && f !== -1)) &&
          s({ id: p, styleId: f, adds: [{ rule: d, index: g }] }),
        c.apply(h, m)
      );
    }),
  })),
    (r.CSSStyleSheet.prototype.addRule = function (
      c,
      h,
      m = this.cssRules.length
    ) {
      const d = `${c} { ${h} }`;
      return r.CSSStyleSheet.prototype.insertRule.apply(this, [d, m]);
    });
  const n = r.CSSStyleSheet.prototype.deleteRule;
  (r.CSSStyleSheet.prototype.deleteRule = new Proxy(n, {
    apply: E((c, h, m) => {
      const [d] = m,
        { id: g, styleId: p } = $e(h, e, t.styleMirror);
      return (
        ((g && g !== -1) || (p && p !== -1)) &&
          s({ id: g, styleId: p, removes: [{ index: d }] }),
        c.apply(h, m)
      );
    }),
  })),
    (r.CSSStyleSheet.prototype.removeRule = function (c) {
      return r.CSSStyleSheet.prototype.deleteRule.apply(this, [c]);
    });
  let o;
  r.CSSStyleSheet.prototype.replace &&
    ((o = r.CSSStyleSheet.prototype.replace),
    (r.CSSStyleSheet.prototype.replace = new Proxy(o, {
      apply: E((c, h, m) => {
        const [d] = m,
          { id: g, styleId: p } = $e(h, e, t.styleMirror);
        return (
          ((g && g !== -1) || (p && p !== -1)) &&
            s({ id: g, styleId: p, replace: d }),
          c.apply(h, m)
        );
      }),
    })));
  let l;
  r.CSSStyleSheet.prototype.replaceSync &&
    ((l = r.CSSStyleSheet.prototype.replaceSync),
    (r.CSSStyleSheet.prototype.replaceSync = new Proxy(l, {
      apply: E((c, h, m) => {
        const [d] = m,
          { id: g, styleId: p } = $e(h, e, t.styleMirror);
        return (
          ((g && g !== -1) || (p && p !== -1)) &&
            s({ id: g, styleId: p, replaceSync: d }),
          c.apply(h, m)
        );
      }),
    })));
  const a = {};
  Zt("CSSGroupingRule")
    ? (a.CSSGroupingRule = r.CSSGroupingRule)
    : (Zt("CSSMediaRule") && (a.CSSMediaRule = r.CSSMediaRule),
      Zt("CSSConditionRule") && (a.CSSConditionRule = r.CSSConditionRule),
      Zt("CSSSupportsRule") && (a.CSSSupportsRule = r.CSSSupportsRule));
  const u = {};
  return (
    Object.entries(a).forEach(([c, h]) => {
      (u[c] = {
        insertRule: h.prototype.insertRule,
        deleteRule: h.prototype.deleteRule,
      }),
        (h.prototype.insertRule = new Proxy(u[c].insertRule, {
          apply: E((m, d, g) => {
            const [p, f] = g,
              { id: S, styleId: v } = $e(d.parentStyleSheet, e, t.styleMirror);
            return (
              ((S && S !== -1) || (v && v !== -1)) &&
                s({
                  id: S,
                  styleId: v,
                  adds: [{ rule: p, index: [...mr(d), f || 0] }],
                }),
              m.apply(d, g)
            );
          }),
        })),
        (h.prototype.deleteRule = new Proxy(u[c].deleteRule, {
          apply: E((m, d, g) => {
            const [p] = g,
              { id: f, styleId: S } = $e(d.parentStyleSheet, e, t.styleMirror);
            return (
              ((f && f !== -1) || (S && S !== -1)) &&
                s({ id: f, styleId: S, removes: [{ index: [...mr(d), p] }] }),
              m.apply(d, g)
            );
          }),
        }));
    }),
    E(() => {
      (r.CSSStyleSheet.prototype.insertRule = i),
        (r.CSSStyleSheet.prototype.deleteRule = n),
        o && (r.CSSStyleSheet.prototype.replace = o),
        l && (r.CSSStyleSheet.prototype.replaceSync = l),
        Object.entries(a).forEach(([c, h]) => {
          (h.prototype.insertRule = u[c].insertRule),
            (h.prototype.deleteRule = u[c].deleteRule);
        });
    })
  );
}
function Qo({ mirror: s, stylesheetManager: e }, t) {
  var r, i, n;
  let o = null;
  t.nodeName === "#document" ? (o = s.getId(t)) : (o = s.getId(M.host(t)));
  const l =
      t.nodeName === "#document"
        ? (r = t.defaultView) == null
          ? void 0
          : r.Document
        : (n = (i = t.ownerDocument) == null ? void 0 : i.defaultView) == null
        ? void 0
        : n.ShadowRoot,
    a =
      l != null && l.prototype
        ? Object.getOwnPropertyDescriptor(
            l == null ? void 0 : l.prototype,
            "adoptedStyleSheets"
          )
        : void 0;
  return o === null || o === -1 || !l || !a
    ? () => {}
    : (Object.defineProperty(t, "adoptedStyleSheets", {
        configurable: a.configurable,
        enumerable: a.enumerable,
        get() {
          var u;
          return (u = a.get) == null ? void 0 : u.call(this);
        },
        set(u) {
          var c;
          const h = (c = a.set) == null ? void 0 : c.call(this, u);
          if (o !== null && o !== -1)
            try {
              e.adoptStyleSheets(u, o);
            } catch {}
          return h;
        },
      }),
      E(() => {
        Object.defineProperty(t, "adoptedStyleSheets", {
          configurable: a.configurable,
          enumerable: a.enumerable,
          get: a.get,
          set: a.set,
        });
      }));
}
function nf(
  {
    styleDeclarationCb: s,
    mirror: e,
    ignoreCSSAttributes: t,
    stylesheetManager: r,
  },
  { win: i }
) {
  const n = i.CSSStyleDeclaration.prototype.setProperty;
  i.CSSStyleDeclaration.prototype.setProperty = new Proxy(n, {
    apply: E((l, a, u) => {
      var c;
      const [h, m, d] = u;
      if (t.has(h)) return n.apply(a, [h, m, d]);
      const { id: g, styleId: p } = $e(
        (c = a.parentRule) == null ? void 0 : c.parentStyleSheet,
        e,
        r.styleMirror
      );
      return (
        ((g && g !== -1) || (p && p !== -1)) &&
          s({
            id: g,
            styleId: p,
            set: { property: h, value: m, priority: d },
            index: mr(a.parentRule),
          }),
        l.apply(a, u)
      );
    }),
  });
  const o = i.CSSStyleDeclaration.prototype.removeProperty;
  return (
    (i.CSSStyleDeclaration.prototype.removeProperty = new Proxy(o, {
      apply: E((l, a, u) => {
        var c;
        const [h] = u;
        if (t.has(h)) return o.apply(a, [h]);
        const { id: m, styleId: d } = $e(
          (c = a.parentRule) == null ? void 0 : c.parentStyleSheet,
          e,
          r.styleMirror
        );
        return (
          ((m && m !== -1) || (d && d !== -1)) &&
            s({
              id: m,
              styleId: d,
              remove: { property: h },
              index: mr(a.parentRule),
            }),
          l.apply(a, u)
        );
      }),
    })),
    E(() => {
      (i.CSSStyleDeclaration.prototype.setProperty = n),
        (i.CSSStyleDeclaration.prototype.removeProperty = o);
    })
  );
}
function of({
  mediaInteractionCb: s,
  blockClass: e,
  blockSelector: t,
  mirror: r,
  sampling: i,
  doc: n,
}) {
  const o = E((a) =>
      bt(
        E((u) => {
          const c = Ot(u);
          if (!c || ae(c, e, t, !0)) return;
          const {
            currentTime: h,
            volume: m,
            muted: d,
            playbackRate: g,
            loop: p,
          } = c;
          s({
            type: a,
            id: r.getId(c),
            currentTime: h,
            volume: m,
            muted: d,
            playbackRate: g,
            loop: p,
          });
        }),
        i.media || 500
      )
    ),
    l = [
      oe("play", o(We.Play), n),
      oe("pause", o(We.Pause), n),
      oe("seeked", o(We.Seeked), n),
      oe("volumechange", o(We.VolumeChange), n),
      oe("ratechange", o(We.RateChange), n),
    ];
  return E(() => {
    l.forEach((a) => a());
  });
}
function af({ fontCb: s, doc: e }) {
  const t = e.defaultView;
  if (!t) return () => {};
  const r = [],
    i = new WeakMap(),
    n = t.FontFace;
  t.FontFace = function (a, u, c) {
    const h = new n(a, u, c);
    return (
      i.set(h, {
        family: a,
        buffer: typeof u != "string",
        descriptors: c,
        fontSource:
          typeof u == "string"
            ? u
            : JSON.stringify(Array.from(new Uint8Array(u))),
      }),
      h
    );
  };
  const o = qe(e.fonts, "add", function (l) {
    return function (a) {
      return (
        setTimeout(
          E(() => {
            const u = i.get(a);
            u && (s(u), i.delete(a));
          }),
          0
        ),
        l.apply(this, [a])
      );
    };
  });
  return (
    r.push(() => {
      t.FontFace = n;
    }),
    r.push(o),
    E(() => {
      r.forEach((l) => l());
    })
  );
}
function lf(s) {
  const {
    doc: e,
    mirror: t,
    blockClass: r,
    blockSelector: i,
    selectionCb: n,
  } = s;
  let o = !0;
  const l = E(() => {
    const a = e.getSelection();
    if (!a || (o && a != null && a.isCollapsed)) return;
    o = a.isCollapsed || !1;
    const u = [],
      c = a.rangeCount || 0;
    for (let h = 0; h < c; h++) {
      const m = a.getRangeAt(h),
        {
          startContainer: d,
          startOffset: g,
          endContainer: p,
          endOffset: f,
        } = m;
      ae(d, r, i, !0) ||
        ae(p, r, i, !0) ||
        u.push({
          start: t.getId(d),
          startOffset: g,
          end: t.getId(p),
          endOffset: f,
        });
    }
    n({ ranges: u });
  });
  return l(), oe("selectionchange", l);
}
function uf({ doc: s, customElementCb: e }) {
  const t = s.defaultView;
  return !t || !t.customElements
    ? () => {}
    : qe(t.customElements, "define", function (i) {
        return function (n, o, l) {
          try {
            e({ define: { name: n } });
          } catch {}
          return i.apply(this, [n, o, l]);
        };
      });
}
function cf(s, e) {
  const {
    mutationCb: t,
    mousemoveCb: r,
    mouseInteractionCb: i,
    scrollCb: n,
    viewportResizeCb: o,
    inputCb: l,
    mediaInteractionCb: a,
    styleSheetRuleCb: u,
    styleDeclarationCb: c,
    canvasMutationCb: h,
    fontCb: m,
    selectionCb: d,
    customElementCb: g,
  } = s;
  (s.mutationCb = (...p) => {
    e.mutation && e.mutation(...p), t(...p);
  }),
    (s.mousemoveCb = (...p) => {
      e.mousemove && e.mousemove(...p), r(...p);
    }),
    (s.mouseInteractionCb = (...p) => {
      e.mouseInteraction && e.mouseInteraction(...p), i(...p);
    }),
    (s.scrollCb = (...p) => {
      e.scroll && e.scroll(...p), n(...p);
    }),
    (s.viewportResizeCb = (...p) => {
      e.viewportResize && e.viewportResize(...p), o(...p);
    }),
    (s.inputCb = (...p) => {
      e.input && e.input(...p), l(...p);
    }),
    (s.mediaInteractionCb = (...p) => {
      e.mediaInteaction && e.mediaInteaction(...p), a(...p);
    }),
    (s.styleSheetRuleCb = (...p) => {
      e.styleSheetRule && e.styleSheetRule(...p), u(...p);
    }),
    (s.styleDeclarationCb = (...p) => {
      e.styleDeclaration && e.styleDeclaration(...p), c(...p);
    }),
    (s.canvasMutationCb = (...p) => {
      e.canvasMutation && e.canvasMutation(...p), h(...p);
    }),
    (s.fontCb = (...p) => {
      e.font && e.font(...p), m(...p);
    }),
    (s.selectionCb = (...p) => {
      e.selection && e.selection(...p), d(...p);
    }),
    (s.customElementCb = (...p) => {
      e.customElement && e.customElement(...p), g(...p);
    });
}
function hf(s, e = {}) {
  const t = s.doc.defaultView;
  if (!t) return () => {};
  cf(s, e);
  let r;
  s.recordDOM && (r = Xo(s, s.doc));
  const i = Qh(s),
    n = qh(s),
    o = Ko(s),
    l = ef(s, { win: t }),
    a = rf(s),
    u = of(s);
  let c = () => {},
    h = () => {},
    m = () => {},
    d = () => {};
  s.recordDOM &&
    ((c = sf(s, { win: t })),
    (h = Qo(s, s.doc)),
    (m = nf(s, { win: t })),
    s.collectFonts && (d = af(s)));
  const g = lf(s),
    p = uf(s),
    f = [];
  for (const S of s.plugins) f.push(S.observer(S.callback, t, S.options));
  return E(() => {
    Le.forEach((S) => S.reset()),
      r == null || r.disconnect(),
      i(),
      n(),
      o(),
      l(),
      a(),
      u(),
      c(),
      h(),
      m(),
      d(),
      g(),
      p(),
      f.forEach((S) => S());
  });
}
function Yt(s) {
  return typeof window[s] < "u";
}
function Zt(s) {
  return !!(
    typeof window[s] < "u" &&
    window[s].prototype &&
    "insertRule" in window[s].prototype &&
    "deleteRule" in window[s].prototype
  );
}
class en {
  constructor(e) {
    w(this, "iframeIdToRemoteIdMap", new WeakMap()),
      w(this, "iframeRemoteIdToIdMap", new WeakMap()),
      (this.generateIdFn = e);
  }
  getId(e, t, r, i) {
    const n = r || this.getIdToRemoteIdMap(e),
      o = i || this.getRemoteIdToIdMap(e);
    let l = n.get(t);
    return l || ((l = this.generateIdFn()), n.set(t, l), o.set(l, t)), l;
  }
  getIds(e, t) {
    const r = this.getIdToRemoteIdMap(e),
      i = this.getRemoteIdToIdMap(e);
    return t.map((n) => this.getId(e, n, r, i));
  }
  getRemoteId(e, t, r) {
    const i = r || this.getRemoteIdToIdMap(e);
    if (typeof t != "number") return t;
    const n = i.get(t);
    return n || -1;
  }
  getRemoteIds(e, t) {
    const r = this.getRemoteIdToIdMap(e);
    return t.map((i) => this.getRemoteId(e, i, r));
  }
  reset(e) {
    if (!e) {
      (this.iframeIdToRemoteIdMap = new WeakMap()),
        (this.iframeRemoteIdToIdMap = new WeakMap());
      return;
    }
    this.iframeIdToRemoteIdMap.delete(e), this.iframeRemoteIdToIdMap.delete(e);
  }
  getIdToRemoteIdMap(e) {
    let t = this.iframeIdToRemoteIdMap.get(e);
    return t || ((t = new Map()), this.iframeIdToRemoteIdMap.set(e, t)), t;
  }
  getRemoteIdToIdMap(e) {
    let t = this.iframeRemoteIdToIdMap.get(e);
    return t || ((t = new Map()), this.iframeRemoteIdToIdMap.set(e, t)), t;
  }
}
class ff {
  constructor(e) {
    w(this, "iframes", new WeakMap()),
      w(this, "crossOriginIframeMap", new WeakMap()),
      w(this, "crossOriginIframeMirror", new en(mn)),
      w(this, "crossOriginIframeStyleMirror"),
      w(this, "crossOriginIframeRootIdMap", new WeakMap()),
      w(this, "mirror"),
      w(this, "mutationCb"),
      w(this, "wrappedEmit"),
      w(this, "loadListener"),
      w(this, "stylesheetManager"),
      w(this, "recordCrossOriginIframes"),
      (this.mutationCb = e.mutationCb),
      (this.wrappedEmit = e.wrappedEmit),
      (this.stylesheetManager = e.stylesheetManager),
      (this.recordCrossOriginIframes = e.recordCrossOriginIframes),
      (this.crossOriginIframeStyleMirror = new en(
        this.stylesheetManager.styleMirror.generateId.bind(
          this.stylesheetManager.styleMirror
        )
      )),
      (this.mirror = e.mirror),
      this.recordCrossOriginIframes &&
        window.addEventListener("message", this.handleMessage.bind(this));
  }
  addIframe(e) {
    this.iframes.set(e, !0),
      e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e);
  }
  addLoadListener(e) {
    this.loadListener = e;
  }
  attachIframe(e, t) {
    var r, i;
    this.mutationCb({
      adds: [{ parentId: this.mirror.getId(e), nextId: null, node: t }],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: !0,
    }),
      this.recordCrossOriginIframes &&
        ((r = e.contentWindow) == null ||
          r.addEventListener("message", this.handleMessage.bind(this))),
      (i = this.loadListener) == null || i.call(this, e),
      e.contentDocument &&
        e.contentDocument.adoptedStyleSheets &&
        e.contentDocument.adoptedStyleSheets.length > 0 &&
        this.stylesheetManager.adoptStyleSheets(
          e.contentDocument.adoptedStyleSheets,
          this.mirror.getId(e.contentDocument)
        );
  }
  handleMessage(e) {
    const t = e;
    if (t.data.type !== "rrweb" || t.origin !== t.data.origin || !e.source)
      return;
    const i = this.crossOriginIframeMap.get(e.source);
    if (!i) return;
    const n = this.transformCrossOriginEvent(i, t.data.event);
    n && this.wrappedEmit(n, t.data.isCheckout);
  }
  transformCrossOriginEvent(e, t) {
    var r;
    switch (t.type) {
      case N.FullSnapshot: {
        this.crossOriginIframeMirror.reset(e),
          this.crossOriginIframeStyleMirror.reset(e),
          this.replaceIdOnNode(t.data.node, e);
        const i = t.data.node.id;
        return (
          this.crossOriginIframeRootIdMap.set(e, i),
          this.patchRootIdOnNode(t.data.node, i),
          {
            timestamp: t.timestamp,
            type: N.IncrementalSnapshot,
            data: {
              source: A.Mutation,
              adds: [
                {
                  parentId: this.mirror.getId(e),
                  nextId: null,
                  node: t.data.node,
                },
              ],
              removes: [],
              texts: [],
              attributes: [],
              isAttachIframe: !0,
            },
          }
        );
      }
      case N.Meta:
      case N.Load:
      case N.DomContentLoaded:
        return !1;
      case N.Plugin:
        return t;
      case N.Custom:
        return (
          this.replaceIds(t.data.payload, e, [
            "id",
            "parentId",
            "previousId",
            "nextId",
          ]),
          t
        );
      case N.IncrementalSnapshot:
        switch (t.data.source) {
          case A.Mutation:
            return (
              t.data.adds.forEach((i) => {
                this.replaceIds(i, e, ["parentId", "nextId", "previousId"]),
                  this.replaceIdOnNode(i.node, e);
                const n = this.crossOriginIframeRootIdMap.get(e);
                n && this.patchRootIdOnNode(i.node, n);
              }),
              t.data.removes.forEach((i) => {
                this.replaceIds(i, e, ["parentId", "id"]);
              }),
              t.data.attributes.forEach((i) => {
                this.replaceIds(i, e, ["id"]);
              }),
              t.data.texts.forEach((i) => {
                this.replaceIds(i, e, ["id"]);
              }),
              t
            );
          case A.Drag:
          case A.TouchMove:
          case A.MouseMove:
            return (
              t.data.positions.forEach((i) => {
                this.replaceIds(i, e, ["id"]);
              }),
              t
            );
          case A.ViewportResize:
            return !1;
          case A.MediaInteraction:
          case A.MouseInteraction:
          case A.Scroll:
          case A.CanvasMutation:
          case A.Input:
            return this.replaceIds(t.data, e, ["id"]), t;
          case A.StyleSheetRule:
          case A.StyleDeclaration:
            return (
              this.replaceIds(t.data, e, ["id"]),
              this.replaceStyleIds(t.data, e, ["styleId"]),
              t
            );
          case A.Font:
            return t;
          case A.Selection:
            return (
              t.data.ranges.forEach((i) => {
                this.replaceIds(i, e, ["start", "end"]);
              }),
              t
            );
          case A.AdoptedStyleSheet:
            return (
              this.replaceIds(t.data, e, ["id"]),
              this.replaceStyleIds(t.data, e, ["styleIds"]),
              (r = t.data.styles) == null ||
                r.forEach((i) => {
                  this.replaceStyleIds(i, e, ["styleId"]);
                }),
              t
            );
        }
    }
    return !1;
  }
  replace(e, t, r, i) {
    for (const n of i)
      (!Array.isArray(t[n]) && typeof t[n] != "number") ||
        (Array.isArray(t[n])
          ? (t[n] = e.getIds(r, t[n]))
          : (t[n] = e.getId(r, t[n])));
    return t;
  }
  replaceIds(e, t, r) {
    return this.replace(this.crossOriginIframeMirror, e, t, r);
  }
  replaceStyleIds(e, t, r) {
    return this.replace(this.crossOriginIframeStyleMirror, e, t, r);
  }
  replaceIdOnNode(e, t) {
    this.replaceIds(e, t, ["id", "rootId"]),
      "childNodes" in e &&
        e.childNodes.forEach((r) => {
          this.replaceIdOnNode(r, t);
        });
  }
  patchRootIdOnNode(e, t) {
    e.type !== ee.Document && !e.rootId && (e.rootId = t),
      "childNodes" in e &&
        e.childNodes.forEach((r) => {
          this.patchRootIdOnNode(r, t);
        });
  }
}
class pf {
  constructor(e) {
    w(this, "shadowDoms", new WeakSet()),
      w(this, "mutationCb"),
      w(this, "scrollCb"),
      w(this, "bypassOptions"),
      w(this, "mirror"),
      w(this, "restoreHandlers", []),
      (this.mutationCb = e.mutationCb),
      (this.scrollCb = e.scrollCb),
      (this.bypassOptions = e.bypassOptions),
      (this.mirror = e.mirror),
      this.init();
  }
  init() {
    this.reset(), this.patchAttachShadow(Element, document);
  }
  addShadowRoot(e, t) {
    if (!lt(e) || this.shadowDoms.has(e)) return;
    this.shadowDoms.add(e);
    const r = Xo(
      {
        ...this.bypassOptions,
        doc: t,
        mutationCb: this.mutationCb,
        mirror: this.mirror,
        shadowDomManager: this,
      },
      e
    );
    this.restoreHandlers.push(() => r.disconnect()),
      this.restoreHandlers.push(
        Ko({
          ...this.bypassOptions,
          scrollCb: this.scrollCb,
          doc: e,
          mirror: this.mirror,
        })
      ),
      setTimeout(() => {
        e.adoptedStyleSheets &&
          e.adoptedStyleSheets.length > 0 &&
          this.bypassOptions.stylesheetManager.adoptStyleSheets(
            e.adoptedStyleSheets,
            this.mirror.getId(M.host(e))
          ),
          this.restoreHandlers.push(
            Qo(
              {
                mirror: this.mirror,
                stylesheetManager: this.bypassOptions.stylesheetManager,
              },
              e
            )
          );
      }, 0);
  }
  observeAttachShadow(e) {
    !e.contentWindow ||
      !e.contentDocument ||
      this.patchAttachShadow(e.contentWindow.Element, e.contentDocument);
  }
  patchAttachShadow(e, t) {
    const r = this;
    this.restoreHandlers.push(
      qe(e.prototype, "attachShadow", function (i) {
        return function (n) {
          const o = i.call(this, n),
            l = M.shadowRoot(this);
          return l && Zo(this) && r.addShadowRoot(l, t), o;
        };
      })
    );
  }
  reset() {
    this.restoreHandlers.forEach((e) => {
      try {
        e();
      } catch {}
    }),
      (this.restoreHandlers = []),
      (this.shadowDoms = new WeakSet());
  }
}
var Ve = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  df = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Jt = 0; Jt < Ve.length; Jt++) df[Ve.charCodeAt(Jt)] = Jt;
var mf = function (s) {
  var e = new Uint8Array(s),
    t,
    r = e.length,
    i = "";
  for (t = 0; t < r; t += 3)
    (i += Ve[e[t] >> 2]),
      (i += Ve[((e[t] & 3) << 4) | (e[t + 1] >> 4)]),
      (i += Ve[((e[t + 1] & 15) << 2) | (e[t + 2] >> 6)]),
      (i += Ve[e[t + 2] & 63]);
  return (
    r % 3 === 2
      ? (i = i.substring(0, i.length - 1) + "=")
      : r % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="),
    i
  );
};
const tn = new Map();
function gf(s, e) {
  let t = tn.get(s);
  return (
    t || ((t = new Map()), tn.set(s, t)), t.has(e) || t.set(e, []), t.get(e)
  );
}
const qo = (s, e, t) => {
  if (!s || !(ta(s, e) || typeof s == "object")) return;
  const r = s.constructor.name,
    i = gf(t, r);
  let n = i.indexOf(s);
  return n === -1 && ((n = i.length), i.push(s)), n;
};
function er(s, e, t) {
  if (s instanceof Array) return s.map((r) => er(r, e, t));
  if (s === null) return s;
  if (
    s instanceof Float32Array ||
    s instanceof Float64Array ||
    s instanceof Int32Array ||
    s instanceof Uint32Array ||
    s instanceof Uint8Array ||
    s instanceof Uint16Array ||
    s instanceof Int16Array ||
    s instanceof Int8Array ||
    s instanceof Uint8ClampedArray
  )
    return { rr_type: s.constructor.name, args: [Object.values(s)] };
  if (s instanceof ArrayBuffer) {
    const r = s.constructor.name,
      i = mf(s);
    return { rr_type: r, base64: i };
  } else {
    if (s instanceof DataView)
      return {
        rr_type: s.constructor.name,
        args: [er(s.buffer, e, t), s.byteOffset, s.byteLength],
      };
    if (s instanceof HTMLImageElement) {
      const r = s.constructor.name,
        { src: i } = s;
      return { rr_type: r, src: i };
    } else if (s instanceof HTMLCanvasElement) {
      const r = "HTMLImageElement",
        i = s.toDataURL();
      return { rr_type: r, src: i };
    } else {
      if (s instanceof ImageData)
        return {
          rr_type: s.constructor.name,
          args: [er(s.data, e, t), s.width, s.height],
        };
      if (ta(s, e) || typeof s == "object") {
        const r = s.constructor.name,
          i = qo(s, e, t);
        return { rr_type: r, index: i };
      }
    }
  }
  return s;
}
const ea = (s, e, t) => s.map((r) => er(r, e, t)),
  ta = (s, e) =>
    !![
      "WebGLActiveInfo",
      "WebGLBuffer",
      "WebGLFramebuffer",
      "WebGLProgram",
      "WebGLRenderbuffer",
      "WebGLShader",
      "WebGLShaderPrecisionFormat",
      "WebGLTexture",
      "WebGLUniformLocation",
      "WebGLVertexArrayObject",
      "WebGLVertexArrayObjectOES",
    ]
      .filter((i) => typeof e[i] == "function")
      .find((i) => s instanceof e[i]);
function yf(s, e, t, r) {
  const i = [],
    n = Object.getOwnPropertyNames(e.CanvasRenderingContext2D.prototype);
  for (const o of n)
    try {
      if (typeof e.CanvasRenderingContext2D.prototype[o] != "function")
        continue;
      const l = qe(e.CanvasRenderingContext2D.prototype, o, function (a) {
        return function (...u) {
          return (
            ae(this.canvas, t, r, !0) ||
              setTimeout(() => {
                const c = ea(u, e, this);
                s(this.canvas, { type: Qe["2D"], property: o, args: c });
              }, 0),
            a.apply(this, u)
          );
        };
      });
      i.push(l);
    } catch {
      const l = Mr(e.CanvasRenderingContext2D.prototype, o, {
        set(a) {
          s(this.canvas, {
            type: Qe["2D"],
            property: o,
            args: [a],
            setter: !0,
          });
        },
      });
      i.push(l);
    }
  return () => {
    i.forEach((o) => o());
  };
}
function wf(s) {
  return s === "experimental-webgl" ? "webgl" : s;
}
function rn(s, e, t, r) {
  const i = [];
  try {
    const n = qe(s.HTMLCanvasElement.prototype, "getContext", function (o) {
      return function (l, ...a) {
        if (!ae(this, e, t, !0)) {
          const u = wf(l);
          if (
            ("__context" in this || (this.__context = u),
            r && ["webgl", "webgl2"].includes(u))
          )
            if (a[0] && typeof a[0] == "object") {
              const c = a[0];
              c.preserveDrawingBuffer || (c.preserveDrawingBuffer = !0);
            } else a.splice(0, 1, { preserveDrawingBuffer: !0 });
        }
        return o.apply(this, [l, ...a]);
      };
    });
    i.push(n);
  } catch {}
  return () => {
    i.forEach((n) => n());
  };
}
function sn(s, e, t, r, i, n) {
  const o = [],
    l = Object.getOwnPropertyNames(s);
  for (const a of l)
    if (
      ![
        "isContextLost",
        "canvas",
        "drawingBufferWidth",
        "drawingBufferHeight",
      ].includes(a)
    )
      try {
        if (typeof s[a] != "function") continue;
        const u = qe(s, a, function (c) {
          return function (...h) {
            const m = c.apply(this, h);
            if (
              (qo(m, n, this),
              "tagName" in this.canvas && !ae(this.canvas, r, i, !0))
            ) {
              const d = ea(h, n, this),
                g = { type: e, property: a, args: d };
              t(this.canvas, g);
            }
            return m;
          };
        });
        o.push(u);
      } catch {
        const u = Mr(s, a, {
          set(c) {
            t(this.canvas, { type: e, property: a, args: [c], setter: !0 });
          },
        });
        o.push(u);
      }
  return o;
}
function bf(s, e, t, r) {
  const i = [];
  return (
    i.push(...sn(e.WebGLRenderingContext.prototype, Qe.WebGL, s, t, r, e)),
    typeof e.WebGL2RenderingContext < "u" &&
      i.push(...sn(e.WebGL2RenderingContext.prototype, Qe.WebGL2, s, t, r, e)),
    () => {
      i.forEach((n) => n());
    }
  );
}
const ra =
    "KGZ1bmN0aW9uKCkgewogICJ1c2Ugc3RyaWN0IjsKICB2YXIgY2hhcnMgPSAiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyI7CiAgdmFyIGxvb2t1cCA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAidW5kZWZpbmVkIiA/IFtdIDogbmV3IFVpbnQ4QXJyYXkoMjU2KTsKICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7CiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpOwogIH0KICB2YXIgZW5jb2RlID0gZnVuY3Rpb24oYXJyYXlidWZmZXIpIHsKICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSwgaTIsIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gIiI7CiAgICBmb3IgKGkyID0gMDsgaTIgPCBsZW47IGkyICs9IDMpIHsKICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kyXSA+PiAyXTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMl0gJiAzKSA8PCA0IHwgYnl0ZXNbaTIgKyAxXSA+PiA0XTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMiArIDFdICYgMTUpIDw8IDIgfCBieXRlc1tpMiArIDJdID4+IDZdOwogICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaTIgKyAyXSAmIDYzXTsKICAgIH0KICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgIj0iOwogICAgfSBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgIj09IjsKICAgIH0KICAgIHJldHVybiBiYXNlNjQ7CiAgfTsKICBjb25zdCBsYXN0QmxvYk1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7CiAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTsKICBhc3luYyBmdW5jdGlvbiBnZXRUcmFuc3BhcmVudEJsb2JGb3Iod2lkdGgsIGhlaWdodCwgZGF0YVVSTE9wdGlvbnMpIHsKICAgIGNvbnN0IGlkID0gYCR7d2lkdGh9LSR7aGVpZ2h0fWA7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBpZiAodHJhbnNwYXJlbnRCbG9iTWFwLmhhcyhpZCkpIHJldHVybiB0cmFuc3BhcmVudEJsb2JNYXAuZ2V0KGlkKTsKICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsKICAgICAgb2Zmc2NyZWVuLmdldENvbnRleHQoIjJkIik7CiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBvZmZzY3JlZW4uY29udmVydFRvQmxvYihkYXRhVVJMT3B0aW9ucyk7CiAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpOwogICAgICBjb25zdCBiYXNlNjQgPSBlbmNvZGUoYXJyYXlCdWZmZXIpOwogICAgICB0cmFuc3BhcmVudEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICByZXR1cm4gYmFzZTY0OwogICAgfSBlbHNlIHsKICAgICAgcmV0dXJuICIiOwogICAgfQogIH0KICBjb25zdCB3b3JrZXIgPSBzZWxmOwogIHdvcmtlci5vbm1lc3NhZ2UgPSBhc3luYyBmdW5jdGlvbihlKSB7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBjb25zdCB7IGlkLCBiaXRtYXAsIHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zIH0gPSBlLmRhdGE7CiAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKAogICAgICAgIHdpZHRoLAogICAgICAgIGhlaWdodCwKICAgICAgICBkYXRhVVJMT3B0aW9ucwogICAgICApOwogICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOwogICAgICBjb25zdCBjdHggPSBvZmZzY3JlZW4uZ2V0Q29udGV4dCgiMmQiKTsKICAgICAgY3R4LmRyYXdJbWFnZShiaXRtYXAsIDAsIDApOwogICAgICBiaXRtYXAuY2xvc2UoKTsKICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IG9mZnNjcmVlbi5jb252ZXJ0VG9CbG9iKGRhdGFVUkxPcHRpb25zKTsKICAgICAgY29uc3QgdHlwZSA9IGJsb2IudHlwZTsKICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCBibG9iLmFycmF5QnVmZmVyKCk7CiAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7CiAgICAgIGlmICghbGFzdEJsb2JNYXAuaGFzKGlkKSAmJiBhd2FpdCB0cmFuc3BhcmVudEJhc2U2NCA9PT0gYmFzZTY0KSB7CiAgICAgICAgbGFzdEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICAgIHJldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UoeyBpZCB9KTsKICAgICAgfQogICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KSByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7CiAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7CiAgICAgICAgaWQsCiAgICAgICAgdHlwZSwKICAgICAgICBiYXNlNjQsCiAgICAgICAgd2lkdGgsCiAgICAgICAgaGVpZ2h0CiAgICAgIH0pOwogICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7CiAgICB9IGVsc2UgewogICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsKICAgIH0KICB9Owp9KSgpOwovLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS1iaXRtYXAtZGF0YS11cmwtd29ya2VyLUlKcEM3Z19iLmpzLm1hcAo=",
  vf = (s) => Uint8Array.from(atob(s), (e) => e.charCodeAt(0)),
  nn =
    typeof window < "u" &&
    window.Blob &&
    new Blob([vf(ra)], { type: "text/javascript;charset=utf-8" });
function Sf(s) {
  let e;
  try {
    if (((e = nn && (window.URL || window.webkitURL).createObjectURL(nn)), !e))
      throw "";
    const t = new Worker(e, { name: s == null ? void 0 : s.name });
    return (
      t.addEventListener("error", () => {
        (window.URL || window.webkitURL).revokeObjectURL(e);
      }),
      t
    );
  } catch {
    return new Worker("data:text/javascript;base64," + ra, {
      name: s == null ? void 0 : s.name,
    });
  } finally {
    e && (window.URL || window.webkitURL).revokeObjectURL(e);
  }
}
class Cf {
  constructor(e) {
    w(this, "pendingCanvasMutations", new Map()),
      w(this, "rafStamps", { latestId: 0, invokeId: null }),
      w(this, "mirror"),
      w(this, "mutationCb"),
      w(this, "resetObservers"),
      w(this, "frozen", !1),
      w(this, "locked", !1),
      w(this, "processMutation", (a, u) => {
        ((this.rafStamps.invokeId &&
          this.rafStamps.latestId !== this.rafStamps.invokeId) ||
          !this.rafStamps.invokeId) &&
          (this.rafStamps.invokeId = this.rafStamps.latestId),
          this.pendingCanvasMutations.has(a) ||
            this.pendingCanvasMutations.set(a, []),
          this.pendingCanvasMutations.get(a).push(u);
      });
    const {
      sampling: t = "all",
      win: r,
      blockClass: i,
      blockSelector: n,
      recordCanvas: o,
      dataURLOptions: l,
    } = e;
    (this.mutationCb = e.mutationCb),
      (this.mirror = e.mirror),
      o && t === "all" && this.initCanvasMutationObserver(r, i, n),
      o &&
        typeof t == "number" &&
        this.initCanvasFPSObserver(t, r, i, n, { dataURLOptions: l });
  }
  reset() {
    this.pendingCanvasMutations.clear(),
      this.resetObservers && this.resetObservers();
  }
  freeze() {
    this.frozen = !0;
  }
  unfreeze() {
    this.frozen = !1;
  }
  lock() {
    this.locked = !0;
  }
  unlock() {
    this.locked = !1;
  }
  initCanvasFPSObserver(e, t, r, i, n) {
    const o = rn(t, r, i, !0),
      l = new Map(),
      a = new Sf();
    a.onmessage = (g) => {
      const { id: p } = g.data;
      if ((l.set(p, !1), !("base64" in g.data))) return;
      const { base64: f, type: S, width: v, height: y } = g.data;
      this.mutationCb({
        id: p,
        type: Qe["2D"],
        commands: [
          { property: "clearRect", args: [0, 0, v, y] },
          {
            property: "drawImage",
            args: [
              {
                rr_type: "ImageBitmap",
                args: [
                  {
                    rr_type: "Blob",
                    data: [{ rr_type: "ArrayBuffer", base64: f }],
                    type: S,
                  },
                ],
              },
              0,
              0,
            ],
          },
        ],
      });
    };
    const u = 1e3 / e;
    let c = 0,
      h;
    const m = () => {
        const g = [];
        return (
          t.document.querySelectorAll("canvas").forEach((p) => {
            ae(p, r, i, !0) || g.push(p);
          }),
          g
        );
      },
      d = (g) => {
        if (c && g - c < u) {
          h = requestAnimationFrame(d);
          return;
        }
        (c = g),
          m().forEach(async (p) => {
            var f;
            const S = this.mirror.getId(p);
            if (l.get(S) || p.width === 0 || p.height === 0) return;
            if ((l.set(S, !0), ["webgl", "webgl2"].includes(p.__context))) {
              const y = p.getContext(p.__context);
              ((f = y == null ? void 0 : y.getContextAttributes()) == null
                ? void 0
                : f.preserveDrawingBuffer) === !1 &&
                y.clear(y.COLOR_BUFFER_BIT);
            }
            const v = await createImageBitmap(p);
            a.postMessage(
              {
                id: S,
                bitmap: v,
                width: p.width,
                height: p.height,
                dataURLOptions: n.dataURLOptions,
              },
              [v]
            );
          }),
          (h = requestAnimationFrame(d));
      };
    (h = requestAnimationFrame(d)),
      (this.resetObservers = () => {
        o(), cancelAnimationFrame(h);
      });
  }
  initCanvasMutationObserver(e, t, r) {
    this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
    const i = rn(e, t, r, !1),
      n = yf(this.processMutation.bind(this), e, t, r),
      o = bf(this.processMutation.bind(this), e, t, r);
    this.resetObservers = () => {
      i(), n(), o();
    };
  }
  startPendingCanvasMutationFlusher() {
    requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  startRAFTimestamping() {
    const e = (t) => {
      (this.rafStamps.latestId = t), requestAnimationFrame(e);
    };
    requestAnimationFrame(e);
  }
  flushPendingCanvasMutations() {
    this.pendingCanvasMutations.forEach((e, t) => {
      const r = this.mirror.getId(t);
      this.flushPendingCanvasMutationFor(t, r);
    }),
      requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  flushPendingCanvasMutationFor(e, t) {
    if (this.frozen || this.locked) return;
    const r = this.pendingCanvasMutations.get(e);
    if (!r || t === -1) return;
    const i = r.map((o) => {
        const { type: l, ...a } = o;
        return a;
      }),
      { type: n } = r[0];
    this.mutationCb({ id: t, type: n, commands: i }),
      this.pendingCanvasMutations.delete(e);
  }
}
class If {
  constructor(e) {
    w(this, "trackedLinkElements", new WeakSet()),
      w(this, "mutationCb"),
      w(this, "adoptedStyleSheetCb"),
      w(this, "styleMirror", new jh()),
      (this.mutationCb = e.mutationCb),
      (this.adoptedStyleSheetCb = e.adoptedStyleSheetCb);
  }
  attachLinkElement(e, t) {
    "_cssText" in t.attributes &&
      this.mutationCb({
        adds: [],
        removes: [],
        texts: [],
        attributes: [{ id: t.id, attributes: t.attributes }],
      }),
      this.trackLinkElement(e);
  }
  trackLinkElement(e) {
    this.trackedLinkElements.has(e) ||
      (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e));
  }
  adoptStyleSheets(e, t) {
    if (e.length === 0) return;
    const r = { id: t, styleIds: [] },
      i = [];
    for (const n of e) {
      let o;
      this.styleMirror.has(n)
        ? (o = this.styleMirror.getId(n))
        : ((o = this.styleMirror.add(n)),
          i.push({
            styleId: o,
            rules: Array.from(n.rules || CSSRule, (l, a) => ({
              rule: fn(l, n.href),
              index: a,
            })),
          })),
        r.styleIds.push(o);
    }
    i.length > 0 && (r.styles = i), this.adoptedStyleSheetCb(r);
  }
  reset() {
    this.styleMirror.reset(), (this.trackedLinkElements = new WeakSet());
  }
  trackStylesheetInLinkElement(e) {}
}
class xf {
  constructor() {
    w(this, "nodeMap", new WeakMap()), w(this, "active", !1);
  }
  inOtherBuffer(e, t) {
    const r = this.nodeMap.get(e);
    return r && Array.from(r).some((i) => i !== t);
  }
  add(e, t) {
    this.active ||
      ((this.active = !0),
      requestAnimationFrame(() => {
        (this.nodeMap = new WeakMap()), (this.active = !1);
      })),
      this.nodeMap.set(e, (this.nodeMap.get(e) || new Set()).add(t));
  }
  destroy() {}
}
let X,
  tr,
  jr,
  gr = !1;
try {
  if (Array.from([1], (s) => s * 2)[0] !== 2) {
    const s = document.createElement("iframe");
    document.body.appendChild(s),
      (Array.from =
        ((ai = s.contentWindow) == null ? void 0 : ai.Array.from) ||
        Array.from),
      document.body.removeChild(s);
  }
} catch {}
const we = $a();
function Ue(s = {}) {
  const {
    emit: e,
    checkoutEveryNms: t,
    checkoutEveryNth: r,
    blockClass: i = "rr-block",
    blockSelector: n = null,
    ignoreClass: o = "rr-ignore",
    ignoreSelector: l = null,
    maskTextClass: a = "rr-mask",
    maskTextSelector: u = null,
    inlineStylesheet: c = !0,
    maskAllInputs: h,
    maskInputOptions: m,
    slimDOMOptions: d,
    maskInputFn: g,
    maskTextFn: p,
    hooks: f,
    packFn: S,
    sampling: v = {},
    dataURLOptions: y = {},
    mousemoveWait: C,
    recordDOM: x = !0,
    recordCanvas: R = !1,
    recordCrossOriginIframes: O = !1,
    recordAfter: b = s.recordAfter === "DOMContentLoaded"
      ? s.recordAfter
      : "load",
    userTriggeredOnInput: T = !1,
    collectFonts: $ = !1,
    inlineImages: Q = !1,
    plugins: I,
    keepIframeSrcFn: K = () => !1,
    ignoreCSSAttributes: Z = new Set([]),
    errorHandler: L,
  } = s;
  Xh(L);
  const P = O ? window.parent === window : !0;
  let D = !1;
  if (!P)
    try {
      window.parent.document && (D = !1);
    } catch {
      D = !0;
    }
  if (P && !e) throw new Error("emit function is required");
  if (!P && !D) return () => {};
  C !== void 0 && v.mousemove === void 0 && (v.mousemove = C), we.reset();
  const V =
      h === !0
        ? {
            color: !0,
            date: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0,
            textarea: !0,
            select: !0,
            password: !0,
          }
        : m !== void 0
        ? m
        : { password: !0 },
    ue =
      d === !0 || d === "all"
        ? {
            script: !0,
            comment: !0,
            headFavicon: !0,
            headWhitespace: !0,
            headMetaSocial: !0,
            headMetaRobots: !0,
            headMetaHttpEquiv: !0,
            headMetaVerification: !0,
            headMetaAuthorship: d === "all",
            headMetaDescKeywords: d === "all",
            headTitleMutations: d === "all",
          }
        : d || {};
  Gh();
  let de,
    te = 0;
  const ce = (k) => {
    for (const fe of I || []) fe.eventProcessor && (k = fe.eventProcessor(k));
    return S && !D && (k = S(k)), k;
  };
  X = (k, fe) => {
    var J;
    const B = k;
    if (
      ((B.timestamp = dr()),
      (J = Le[0]) != null &&
        J.isFrozen() &&
        B.type !== N.FullSnapshot &&
        !(B.type === N.IncrementalSnapshot && B.data.source === A.Mutation) &&
        Le.forEach((xe) => xe.unfreeze()),
      P)
    )
      e == null || e(ce(B), fe);
    else if (D) {
      const xe = {
        type: "rrweb",
        event: ce(B),
        origin: window.location.origin,
        isCheckout: fe,
      };
      window.parent.postMessage(xe, "*");
    }
    if (B.type === N.FullSnapshot) (de = B), (te = 0);
    else if (B.type === N.IncrementalSnapshot) {
      if (B.data.source === A.Mutation && B.data.isAttachIframe) return;
      te++;
      const xe = r && te >= r,
        U = t && B.timestamp - de.timestamp > t;
      (xe || U) && tr(!0);
    }
  };
  const ne = (k) => {
      X({ type: N.IncrementalSnapshot, data: { source: A.Mutation, ...k } });
    },
    re = (k) =>
      X({ type: N.IncrementalSnapshot, data: { source: A.Scroll, ...k } }),
    q = (k) =>
      X({
        type: N.IncrementalSnapshot,
        data: { source: A.CanvasMutation, ...k },
      }),
    Be = (k) =>
      X({
        type: N.IncrementalSnapshot,
        data: { source: A.AdoptedStyleSheet, ...k },
      }),
    me = new If({ mutationCb: ne, adoptedStyleSheetCb: Be }),
    he = new ff({
      mirror: we,
      mutationCb: ne,
      stylesheetManager: me,
      recordCrossOriginIframes: O,
      wrappedEmit: X,
    });
  for (const k of I || [])
    k.getMirror &&
      k.getMirror({
        nodeMirror: we,
        crossOriginIframeMirror: he.crossOriginIframeMirror,
        crossOriginIframeStyleMirror: he.crossOriginIframeStyleMirror,
      });
  const et = new xf();
  jr = new Cf({
    recordCanvas: R,
    mutationCb: q,
    win: window,
    blockClass: i,
    blockSelector: n,
    mirror: we,
    sampling: v.canvas,
    dataURLOptions: y,
  });
  const Te = new pf({
    mutationCb: ne,
    scrollCb: re,
    bypassOptions: {
      blockClass: i,
      blockSelector: n,
      maskTextClass: a,
      maskTextSelector: u,
      inlineStylesheet: c,
      maskInputOptions: V,
      dataURLOptions: y,
      maskTextFn: p,
      maskInputFn: g,
      recordCanvas: R,
      inlineImages: Q,
      sampling: v,
      slimDOMOptions: ue,
      iframeManager: he,
      stylesheetManager: me,
      canvasManager: jr,
      keepIframeSrcFn: K,
      processedNodeManager: et,
    },
    mirror: we,
  });
  tr = (k = !1) => {
    if (!x) return;
    X(
      {
        type: N.Meta,
        data: { href: window.location.href, width: Wo(), height: zo() },
      },
      k
    ),
      me.reset(),
      Te.init(),
      Le.forEach((J) => J.lock());
    const fe = Qa(document, {
      mirror: we,
      blockClass: i,
      blockSelector: n,
      maskTextClass: a,
      maskTextSelector: u,
      inlineStylesheet: c,
      maskAllInputs: V,
      maskTextFn: p,
      maskInputFn: g,
      slimDOM: ue,
      dataURLOptions: y,
      recordCanvas: R,
      inlineImages: Q,
      onSerialize: (J) => {
        Vo(J, we) && he.addIframe(J),
          Ho(J, we) && me.trackLinkElement(J),
          Rs(J) && Te.addShadowRoot(M.shadowRoot(J), document);
      },
      onIframeLoad: (J, B) => {
        he.attachIframe(J, B), Te.observeAttachShadow(J);
      },
      onStylesheetLoad: (J, B) => {
        me.attachLinkElement(J, B);
      },
      keepIframeSrcFn: K,
    });
    fe &&
      (X(
        { type: N.FullSnapshot, data: { node: fe, initialOffset: Bo(window) } },
        k
      ),
      Le.forEach((J) => J.unlock()),
      document.adoptedStyleSheets &&
        document.adoptedStyleSheets.length > 0 &&
        me.adoptStyleSheets(document.adoptedStyleSheets, we.getId(document)));
  };
  try {
    const k = [],
      fe = (B) => {
        var xe;
        return E(hf)(
          {
            mutationCb: ne,
            mousemoveCb: (U, $r) =>
              X({
                type: N.IncrementalSnapshot,
                data: { source: $r, positions: U },
              }),
            mouseInteractionCb: (U) =>
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.MouseInteraction, ...U },
              }),
            scrollCb: re,
            viewportResizeCb: (U) =>
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.ViewportResize, ...U },
              }),
            inputCb: (U) =>
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.Input, ...U },
              }),
            mediaInteractionCb: (U) =>
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.MediaInteraction, ...U },
              }),
            styleSheetRuleCb: (U) =>
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.StyleSheetRule, ...U },
              }),
            styleDeclarationCb: (U) =>
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.StyleDeclaration, ...U },
              }),
            canvasMutationCb: q,
            fontCb: (U) =>
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.Font, ...U },
              }),
            selectionCb: (U) => {
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.Selection, ...U },
              });
            },
            customElementCb: (U) => {
              X({
                type: N.IncrementalSnapshot,
                data: { source: A.CustomElement, ...U },
              });
            },
            blockClass: i,
            ignoreClass: o,
            ignoreSelector: l,
            maskTextClass: a,
            maskTextSelector: u,
            maskInputOptions: V,
            inlineStylesheet: c,
            sampling: v,
            recordDOM: x,
            recordCanvas: R,
            inlineImages: Q,
            userTriggeredOnInput: T,
            collectFonts: $,
            doc: B,
            maskInputFn: g,
            maskTextFn: p,
            keepIframeSrcFn: K,
            blockSelector: n,
            slimDOMOptions: ue,
            dataURLOptions: y,
            mirror: we,
            iframeManager: he,
            stylesheetManager: me,
            shadowDomManager: Te,
            processedNodeManager: et,
            canvasManager: jr,
            ignoreCSSAttributes: Z,
            plugins:
              ((xe = I == null ? void 0 : I.filter((U) => U.observer)) == null
                ? void 0
                : xe.map((U) => ({
                    observer: U.observer,
                    options: U.options,
                    callback: ($r) =>
                      X({
                        type: N.Plugin,
                        data: { plugin: U.name, payload: $r },
                      }),
                  }))) || [],
          },
          f
        );
      };
    he.addLoadListener((B) => {
      try {
        k.push(fe(B.contentDocument));
      } catch {}
    });
    const J = () => {
      tr(), k.push(fe(document)), (gr = !0);
    };
    return (
      document.readyState === "interactive" ||
      document.readyState === "complete"
        ? J()
        : (k.push(
            oe("DOMContentLoaded", () => {
              X({ type: N.DomContentLoaded, data: {} }),
                b === "DOMContentLoaded" && J();
            })
          ),
          k.push(
            oe(
              "load",
              () => {
                X({ type: N.Load, data: {} }), b === "load" && J();
              },
              window
            )
          )),
      () => {
        k.forEach((B) => B()), et.destroy(), (gr = !1), Kh();
      }
    );
  } catch {}
}
Ue.addCustomEvent = (s, e) => {
  if (!gr) throw new Error("please add custom event after start recording");
  X({ type: N.Custom, data: { tag: s, payload: e } });
};
Ue.freezePage = () => {
  Le.forEach((s) => s.freeze());
};
Ue.takeFullSnapshot = (s) => {
  if (!gr) throw new Error("please take full snapshot after start recording");
  tr(s);
};
Ue.mirror = we;
var on;
(function (s) {
  (s[(s.NotStarted = 0)] = "NotStarted"),
    (s[(s.Running = 1)] = "Running"),
    (s[(s.Stopped = 2)] = "Stopped");
})(on || (on = {}));
const { addCustomEvent: wp } = Ue,
  { freezePage: bp } = Ue,
  { takeFullSnapshot: vp } = Ue;
var ie = Uint8Array,
  le = Uint16Array,
  vt = Uint32Array,
  Ar = new ie([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 0, 0, 0,
  ]),
  Er = new ie([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 0, 0,
  ]),
  Ms = new ie([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
  ]),
  sa = function (s, e) {
    for (var t = new le(31), r = 0; r < 31; ++r) t[r] = e += 1 << s[r - 1];
    for (var i = new vt(t[30]), r = 1; r < 30; ++r)
      for (var n = t[r]; n < t[r + 1]; ++n) i[n] = ((n - t[r]) << 5) | r;
    return [t, i];
  },
  ia = sa(Ar, 2),
  na = ia[0],
  As = ia[1];
(na[28] = 258), (As[258] = 28);
var oa = sa(Er, 0),
  Rf = oa[0],
  an = oa[1],
  Es = new le(32768);
for (var j = 0; j < 32768; ++j) {
  var Ee = ((j & 43690) >>> 1) | ((j & 21845) << 1);
  (Ee = ((Ee & 52428) >>> 2) | ((Ee & 13107) << 2)),
    (Ee = ((Ee & 61680) >>> 4) | ((Ee & 3855) << 4)),
    (Es[j] = (((Ee & 65280) >>> 8) | ((Ee & 255) << 8)) >>> 1);
}
var Ie = function (s, e, t) {
    for (var r = s.length, i = 0, n = new le(e); i < r; ++i) ++n[s[i] - 1];
    var o = new le(e);
    for (i = 0; i < e; ++i) o[i] = (o[i - 1] + n[i - 1]) << 1;
    var l;
    if (t) {
      l = new le(1 << e);
      var a = 15 - e;
      for (i = 0; i < r; ++i)
        if (s[i])
          for (
            var u = (i << 4) | s[i],
              c = e - s[i],
              h = o[s[i] - 1]++ << c,
              m = h | ((1 << c) - 1);
            h <= m;
            ++h
          )
            l[Es[h] >>> a] = u;
    } else
      for (l = new le(r), i = 0; i < r; ++i)
        l[i] = Es[o[s[i] - 1]++] >>> (15 - s[i]);
    return l;
  },
  Ne = new ie(288);
for (var j = 0; j < 144; ++j) Ne[j] = 8;
for (var j = 144; j < 256; ++j) Ne[j] = 9;
for (var j = 256; j < 280; ++j) Ne[j] = 7;
for (var j = 280; j < 288; ++j) Ne[j] = 8;
var St = new ie(32);
for (var j = 0; j < 32; ++j) St[j] = 5;
var Of = Ie(Ne, 9, 0),
  Mf = Ie(Ne, 9, 1),
  Af = Ie(St, 5, 0),
  Ef = Ie(St, 5, 1),
  Vr = function (s) {
    for (var e = s[0], t = 1; t < s.length; ++t) s[t] > e && (e = s[t]);
    return e;
  },
  ye = function (s, e, t) {
    var r = (e / 8) >> 0;
    return ((s[r] | (s[r + 1] << 8)) >>> (e & 7)) & t;
  },
  Hr = function (s, e) {
    var t = (e / 8) >> 0;
    return (s[t] | (s[t + 1] << 8) | (s[t + 2] << 16)) >>> (e & 7);
  },
  ni = function (s) {
    return ((s / 8) >> 0) + (s & 7 && 1);
  },
  oi = function (s, e, t) {
    (t == null || t > s.length) && (t = s.length);
    var r = new (s instanceof le ? le : s instanceof vt ? vt : ie)(t - e);
    return r.set(s.subarray(e, t)), r;
  },
  $f = function (s, e, t) {
    var r = s.length,
      i = !e || t,
      n = !t || t.i;
    t || (t = {}), e || (e = new ie(r * 3));
    var o = function (Be) {
        var me = e.length;
        if (Be > me) {
          var he = new ie(Math.max(me * 2, Be));
          he.set(e), (e = he);
        }
      },
      l = t.f || 0,
      a = t.p || 0,
      u = t.b || 0,
      c = t.l,
      h = t.d,
      m = t.m,
      d = t.n,
      g = r * 8;
    do {
      if (!c) {
        t.f = l = ye(s, a, 1);
        var p = ye(s, a + 1, 3);
        if (((a += 3), p))
          if (p == 1) (c = Mf), (h = Ef), (m = 9), (d = 5);
          else if (p == 2) {
            var y = ye(s, a, 31) + 257,
              C = ye(s, a + 10, 15) + 4,
              x = y + ye(s, a + 5, 31) + 1;
            a += 14;
            for (var R = new ie(x), O = new ie(19), b = 0; b < C; ++b)
              O[Ms[b]] = ye(s, a + b * 3, 7);
            a += C * 3;
            var T = Vr(O),
              $ = (1 << T) - 1;
            if (!n && a + x * (T + 7) > g) break;
            for (var Q = Ie(O, T, 1), b = 0; b < x; ) {
              var I = Q[ye(s, a, $)];
              a += I & 15;
              var f = I >>> 4;
              if (f < 16) R[b++] = f;
              else {
                var K = 0,
                  Z = 0;
                for (
                  f == 16
                    ? ((Z = 3 + ye(s, a, 3)), (a += 2), (K = R[b - 1]))
                    : f == 17
                    ? ((Z = 3 + ye(s, a, 7)), (a += 3))
                    : f == 18 && ((Z = 11 + ye(s, a, 127)), (a += 7));
                  Z--;

                )
                  R[b++] = K;
              }
            }
            var L = R.subarray(0, y),
              P = R.subarray(y);
            (m = Vr(L)), (d = Vr(P)), (c = Ie(L, m, 1)), (h = Ie(P, d, 1));
          } else throw "invalid block type";
        else {
          var f = ni(a) + 4,
            S = s[f - 4] | (s[f - 3] << 8),
            v = f + S;
          if (v > r) {
            if (n) throw "unexpected EOF";
            break;
          }
          i && o(u + S),
            e.set(s.subarray(f, v), u),
            (t.b = u += S),
            (t.p = a = v * 8);
          continue;
        }
        if (a > g) throw "unexpected EOF";
      }
      i && o(u + 131072);
      for (
        var D = (1 << m) - 1, V = (1 << d) - 1, ue = m + d + 18;
        n || a + ue < g;

      ) {
        var K = c[Hr(s, a) & D],
          de = K >>> 4;
        if (((a += K & 15), a > g)) throw "unexpected EOF";
        if (!K) throw "invalid length/literal";
        if (de < 256) e[u++] = de;
        else if (de == 256) {
          c = null;
          break;
        } else {
          var te = de - 254;
          if (de > 264) {
            var b = de - 257,
              ce = Ar[b];
            (te = ye(s, a, (1 << ce) - 1) + na[b]), (a += ce);
          }
          var ne = h[Hr(s, a) & V],
            re = ne >>> 4;
          if (!ne) throw "invalid distance";
          a += ne & 15;
          var P = Rf[re];
          if (re > 3) {
            var ce = Er[re];
            (P += Hr(s, a) & ((1 << ce) - 1)), (a += ce);
          }
          if (a > g) throw "unexpected EOF";
          i && o(u + 131072);
          for (var q = u + te; u < q; u += 4)
            (e[u] = e[u - P]),
              (e[u + 1] = e[u + 1 - P]),
              (e[u + 2] = e[u + 2 - P]),
              (e[u + 3] = e[u + 3 - P]);
          u = q;
        }
      }
      (t.l = c),
        (t.p = a),
        (t.b = u),
        c && ((l = 1), (t.m = m), (t.d = h), (t.n = d));
    } while (!l);
    return u == e.length ? e : oi(e, 0, u);
  },
  Re = function (s, e, t) {
    t <<= e & 7;
    var r = (e / 8) >> 0;
    (s[r] |= t), (s[r + 1] |= t >>> 8);
  },
  nt = function (s, e, t) {
    t <<= e & 7;
    var r = (e / 8) >> 0;
    (s[r] |= t), (s[r + 1] |= t >>> 8), (s[r + 2] |= t >>> 16);
  },
  Yr = function (s, e) {
    for (var t = [], r = 0; r < s.length; ++r)
      s[r] && t.push({ s: r, f: s[r] });
    var i = t.length,
      n = t.slice();
    if (!i) return [new ie(0), 0];
    if (i == 1) {
      var o = new ie(t[0].s + 1);
      return (o[t[0].s] = 1), [o, 1];
    }
    t.sort(function (x, R) {
      return x.f - R.f;
    }),
      t.push({ s: -1, f: 25001 });
    var l = t[0],
      a = t[1],
      u = 0,
      c = 1,
      h = 2;
    for (t[0] = { s: -1, f: l.f + a.f, l, r: a }; c != i - 1; )
      (l = t[t[u].f < t[h].f ? u++ : h++]),
        (a = t[u != c && t[u].f < t[h].f ? u++ : h++]),
        (t[c++] = { s: -1, f: l.f + a.f, l, r: a });
    for (var m = n[0].s, r = 1; r < i; ++r) n[r].s > m && (m = n[r].s);
    var d = new le(m + 1),
      g = $s(t[c - 1], d, 0);
    if (g > e) {
      var r = 0,
        p = 0,
        f = g - e,
        S = 1 << f;
      for (
        n.sort(function (R, O) {
          return d[O.s] - d[R.s] || R.f - O.f;
        });
        r < i;
        ++r
      ) {
        var v = n[r].s;
        if (d[v] > e) (p += S - (1 << (g - d[v]))), (d[v] = e);
        else break;
      }
      for (p >>>= f; p > 0; ) {
        var y = n[r].s;
        d[y] < e ? (p -= 1 << (e - d[y]++ - 1)) : ++r;
      }
      for (; r >= 0 && p; --r) {
        var C = n[r].s;
        d[C] == e && (--d[C], ++p);
      }
      g = e;
    }
    return [new ie(d), g];
  },
  $s = function (s, e, t) {
    return s.s == -1
      ? Math.max($s(s.l, e, t + 1), $s(s.r, e, t + 1))
      : (e[s.s] = t);
  },
  ln = function (s) {
    for (var e = s.length; e && !s[--e]; );
    for (
      var t = new le(++e),
        r = 0,
        i = s[0],
        n = 1,
        o = function (a) {
          t[r++] = a;
        },
        l = 1;
      l <= e;
      ++l
    )
      if (s[l] == i && l != e) ++n;
      else {
        if (!i && n > 2) {
          for (; n > 138; n -= 138) o(32754);
          n > 2 &&
            (o(n > 10 ? ((n - 11) << 5) | 28690 : ((n - 3) << 5) | 12305),
            (n = 0));
        } else if (n > 3) {
          for (o(i), --n; n > 6; n -= 6) o(8304);
          n > 2 && (o(((n - 3) << 5) | 8208), (n = 0));
        }
        for (; n--; ) o(i);
        (n = 1), (i = s[l]);
      }
    return [t.subarray(0, r), e];
  },
  ot = function (s, e) {
    for (var t = 0, r = 0; r < e.length; ++r) t += s[r] * e[r];
    return t;
  },
  Ns = function (s, e, t) {
    var r = t.length,
      i = ni(e + 2);
    (s[i] = r & 255),
      (s[i + 1] = r >>> 8),
      (s[i + 2] = s[i] ^ 255),
      (s[i + 3] = s[i + 1] ^ 255);
    for (var n = 0; n < r; ++n) s[i + n + 4] = t[n];
    return (i + 4 + r) * 8;
  },
  un = function (s, e, t, r, i, n, o, l, a, u, c) {
    Re(e, c++, t), ++i[256];
    for (
      var h = Yr(i, 15),
        m = h[0],
        d = h[1],
        g = Yr(n, 15),
        p = g[0],
        f = g[1],
        S = ln(m),
        v = S[0],
        y = S[1],
        C = ln(p),
        x = C[0],
        R = C[1],
        O = new le(19),
        b = 0;
      b < v.length;
      ++b
    )
      O[v[b] & 31]++;
    for (var b = 0; b < x.length; ++b) O[x[b] & 31]++;
    for (
      var T = Yr(O, 7), $ = T[0], Q = T[1], I = 19;
      I > 4 && !$[Ms[I - 1]];
      --I
    );
    var K = (u + 5) << 3,
      Z = ot(i, Ne) + ot(n, St) + o,
      L =
        ot(i, m) +
        ot(n, p) +
        o +
        14 +
        3 * I +
        ot(O, $) +
        (2 * O[16] + 3 * O[17] + 7 * O[18]);
    if (K <= Z && K <= L) return Ns(e, c, s.subarray(a, a + u));
    var P, D, V, ue;
    if ((Re(e, c, 1 + (L < Z)), (c += 2), L < Z)) {
      (P = Ie(m, d, 0)), (D = m), (V = Ie(p, f, 0)), (ue = p);
      var de = Ie($, Q, 0);
      Re(e, c, y - 257), Re(e, c + 5, R - 1), Re(e, c + 10, I - 4), (c += 14);
      for (var b = 0; b < I; ++b) Re(e, c + 3 * b, $[Ms[b]]);
      c += 3 * I;
      for (var te = [v, x], ce = 0; ce < 2; ++ce)
        for (var ne = te[ce], b = 0; b < ne.length; ++b) {
          var re = ne[b] & 31;
          Re(e, c, de[re]),
            (c += $[re]),
            re > 15 && (Re(e, c, (ne[b] >>> 5) & 127), (c += ne[b] >>> 12));
        }
    } else (P = Of), (D = Ne), (V = Af), (ue = St);
    for (var b = 0; b < l; ++b)
      if (r[b] > 255) {
        var re = (r[b] >>> 18) & 31;
        nt(e, c, P[re + 257]),
          (c += D[re + 257]),
          re > 7 && (Re(e, c, (r[b] >>> 23) & 31), (c += Ar[re]));
        var q = r[b] & 31;
        nt(e, c, V[q]),
          (c += ue[q]),
          q > 3 && (nt(e, c, (r[b] >>> 5) & 8191), (c += Er[q]));
      } else nt(e, c, P[r[b]]), (c += D[r[b]]);
    return nt(e, c, P[256]), c + D[256];
  },
  Nf = new vt([
    65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632,
  ]),
  kf = function (s, e, t, r, i, n) {
    var o = s.length,
      l = new ie(r + o + 5 * (1 + Math.floor(o / 7e3)) + i),
      a = l.subarray(r, l.length - i),
      u = 0;
    if (!e || o < 8)
      for (var c = 0; c <= o; c += 65535) {
        var h = c + 65535;
        h < o
          ? (u = Ns(a, u, s.subarray(c, h)))
          : ((a[c] = n), (u = Ns(a, u, s.subarray(c, o))));
      }
    else {
      for (
        var m = Nf[e - 1],
          d = m >>> 13,
          g = m & 8191,
          p = (1 << t) - 1,
          f = new le(32768),
          S = new le(p + 1),
          v = Math.ceil(t / 3),
          y = 2 * v,
          C = function (B) {
            return (s[B] ^ (s[B + 1] << v) ^ (s[B + 2] << y)) & p;
          },
          x = new vt(25e3),
          R = new le(288),
          O = new le(32),
          b = 0,
          T = 0,
          c = 0,
          $ = 0,
          Q = 0,
          I = 0;
        c < o;
        ++c
      ) {
        var K = C(c),
          Z = c & 32767,
          L = S[K];
        if (((f[Z] = L), (S[K] = Z), Q <= c)) {
          var P = o - c;
          if ((b > 7e3 || $ > 24576) && P > 423) {
            (u = un(s, a, 0, x, R, O, T, $, I, c - I, u)),
              ($ = b = T = 0),
              (I = c);
            for (var D = 0; D < 286; ++D) R[D] = 0;
            for (var D = 0; D < 30; ++D) O[D] = 0;
          }
          var V = 2,
            ue = 0,
            de = g,
            te = (Z - L) & 32767;
          if (P > 2 && K == C(c - te))
            for (
              var ce = Math.min(d, P) - 1,
                ne = Math.min(32767, c),
                re = Math.min(258, P);
              te <= ne && --de && Z != L;

            ) {
              if (s[c + V] == s[c + V - te]) {
                for (var q = 0; q < re && s[c + q] == s[c + q - te]; ++q);
                if (q > V) {
                  if (((V = q), (ue = te), q > ce)) break;
                  for (
                    var Be = Math.min(te, q - 2), me = 0, D = 0;
                    D < Be;
                    ++D
                  ) {
                    var he = (c - te + D + 32768) & 32767,
                      et = f[he],
                      Te = (he - et + 32768) & 32767;
                    Te > me && ((me = Te), (L = he));
                  }
                }
              }
              (Z = L), (L = f[Z]), (te += (Z - L + 32768) & 32767);
            }
          if (ue) {
            x[$++] = 268435456 | (As[V] << 18) | an[ue];
            var k = As[V] & 31,
              fe = an[ue] & 31;
            (T += Ar[k] + Er[fe]), ++R[257 + k], ++O[fe], (Q = c + V), ++b;
          } else (x[$++] = s[c]), ++R[s[c]];
        }
      }
      u = un(s, a, n, x, R, O, T, $, I, c - I, u);
    }
    return oi(l, 0, r + ni(u) + i);
  },
  Pf = function () {
    var s = 1,
      e = 0;
    return {
      p: function (t) {
        for (var r = s, i = e, n = t.length, o = 0; o != n; ) {
          for (var l = Math.min(o + 5552, n); o < l; ++o) (r += t[o]), (i += r);
          (r %= 65521), (i %= 65521);
        }
        (s = r), (e = i);
      },
      d: function () {
        return (
          (((s >>> 8) << 16) | ((e & 255) << 8) | (e >>> 8)) +
          ((s & 255) << 23) * 2
        );
      },
    };
  },
  Tf = function (s, e, t, r, i) {
    return kf(
      s,
      e.level == null ? 6 : e.level,
      e.mem == null
        ? Math.ceil(Math.max(8, Math.min(13, Math.log(s.length))) * 1.5)
        : 12 + e.mem,
      t,
      r,
      !0
    );
  },
  Lf = function (s, e, t) {
    for (; t; ++e) (s[e] = t), (t >>>= 8);
  },
  Df = function (s, e) {
    var t = e.level,
      r = t == 0 ? 0 : t < 6 ? 1 : t == 9 ? 3 : 2;
    (s[0] = 120), (s[1] = (r << 6) | (r ? 32 - 2 * r : 1));
  },
  _f = function (s) {
    if ((s[0] & 15) != 8 || s[0] >>> 4 > 7 || ((s[0] << 8) | s[1]) % 31)
      throw "invalid zlib data";
    if (s[1] & 32) throw "invalid zlib data: preset dictionaries not supported";
  };
function Ff(s, e) {
  e === void 0 && (e = {});
  var t = Pf();
  t.p(s);
  var r = Tf(s, e, 2, 4);
  return Df(r, e), Lf(r, r.length - 4, t.d()), r;
}
function Uf(s, e) {
  return $f((_f(s), s.subarray(2, -4)), e);
}
function aa(s, e) {
  var t = s.length;
  if (!e && typeof TextEncoder < "u") return new TextEncoder().encode(s);
  for (
    var r = new ie(s.length + (s.length >>> 1)),
      i = 0,
      n = function (u) {
        r[i++] = u;
      },
      o = 0;
    o < t;
    ++o
  ) {
    if (i + 5 > r.length) {
      var l = new ie(i + 8 + ((t - o) << 1));
      l.set(r), (r = l);
    }
    var a = s.charCodeAt(o);
    a < 128 || e
      ? n(a)
      : a < 2048
      ? (n(192 | (a >>> 6)), n(128 | (a & 63)))
      : a > 55295 && a < 57344
      ? ((a = (65536 + (a & 1047552)) | (s.charCodeAt(++o) & 1023)),
        n(240 | (a >>> 18)),
        n(128 | ((a >>> 12) & 63)),
        n(128 | ((a >>> 6) & 63)),
        n(128 | (a & 63)))
      : (n(224 | (a >>> 12)), n(128 | ((a >>> 6) & 63)), n(128 | (a & 63)));
  }
  return oi(r, 0, i);
}
function la(s, e) {
  var t = "";
  if (!e && typeof TextDecoder < "u") return new TextDecoder().decode(s);
  for (var r = 0; r < s.length; ) {
    var i = s[r++];
    i < 128 || e
      ? (t += String.fromCharCode(i))
      : i < 224
      ? (t += String.fromCharCode(((i & 31) << 6) | (s[r++] & 63)))
      : i < 240
      ? (t += String.fromCharCode(
          ((i & 15) << 12) | ((s[r++] & 63) << 6) | (s[r++] & 63)
        ))
      : ((i =
          (((i & 15) << 18) |
            ((s[r++] & 63) << 12) |
            ((s[r++] & 63) << 6) |
            (s[r++] & 63)) -
          65536),
        (t += String.fromCharCode(55296 | (i >> 10), 56320 | (i & 1023))));
  }
  return t;
}
const ks = "v1",
  Sp = (s) => {
    const e = { ...s, v: ks };
    return la(Ff(aa(JSON.stringify(e))), !0);
  },
  Cp = (s) => {
    if (typeof s != "string") return s;
    try {
      const e = JSON.parse(s);
      if (e.timestamp) return e;
    } catch {}
    try {
      const e = JSON.parse(la(Uf(aa(s, !0))));
      if (e.v === ks) return e;
      throw new Error(
        `These events were packed with packer ${e.v} which is incompatible with current packer ${ks}.`
      );
    } catch {
      throw new Error("Unknown data format.");
    }
  };
export {
  N as EventType,
  A as IncrementalSource,
  pe as MouseInteractions,
  wp as addCustomEvent,
  bp as freezePage,
  Zi as mirror,
  Sp as pack,
  Ue as record,
  vp as takeFullSnapshot,
  Cp as unpack,
};
