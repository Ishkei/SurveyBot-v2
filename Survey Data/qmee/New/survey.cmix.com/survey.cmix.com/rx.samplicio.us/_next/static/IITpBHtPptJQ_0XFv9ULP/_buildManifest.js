(self.__BUILD_MANIFEST = (function (e, a, s) {
  return {
    __rewrites: { afterFiles: [], beforeFiles: [], fallback: [] },
    __routerFilterStatic: {
      numItems: 0,
      errorRate: 1e-4,
      numBits: 0,
      numHashes: s,
      bitArray: [],
    },
    __routerFilterDynamic: {
      numItems: e,
      errorRate: 1e-4,
      numBits: e,
      numHashes: s,
      bitArray: [],
    },
    "/": ["static/chunks/pages/index-081a2bd742652898.js"],
    "/404": ["static/chunks/pages/404-ff79a4ba737dd9f8.js"],
    "/_error": ["static/chunks/pages/_error-64793d3adc256e9f.js"],
    "/age": ["static/chunks/pages/age-d29e9625d5347063.js"],
    "/consent": [
      "static/chunks/576-51c19d4347d007b8.js",
      "static/chunks/pages/consent-4f7f8655291dc66e.js",
    ],
    "/error": ["static/chunks/pages/error-9bdf3eda3f9cdb29.js"],
    "/error-nc": ["static/chunks/pages/error-nc-052fa650f775dbda.js"],
    "/quality-check": ["static/chunks/pages/quality-check-48f95ad7805b62e0.js"],
    "/unqualified": ["static/chunks/pages/unqualified-9907bb4ba9ffffbd.js"],
    sortedPages: [
      "/",
      "/404",
      "/_app",
      "/_error",
      "/age",
      "/consent",
      "/error",
      "/error-nc",
      "/quality-check",
      "/unqualified",
    ],
  };
})(0, 1e-4, NaN)),
  self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
