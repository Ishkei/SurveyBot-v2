var u =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function f(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function i(e) {
  if (e.__esModule) return e;
  var r = e.default;
  if (typeof r == "function") {
    var t = function n() {
      return this instanceof n
        ? Reflect.construct(r, arguments, this.constructor)
        : r.apply(this, arguments);
    };
    t.prototype = r.prototype;
  } else t = {};
  return (
    Object.defineProperty(t, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (n) {
      var o = Object.getOwnPropertyDescriptor(e, n);
      Object.defineProperty(
        t,
        n,
        o.get
          ? o
          : {
              enumerable: !0,
              get: function () {
                return e[n];
              },
            }
      );
    }),
    t
  );
}
export { u as e, i as o, f as t };
