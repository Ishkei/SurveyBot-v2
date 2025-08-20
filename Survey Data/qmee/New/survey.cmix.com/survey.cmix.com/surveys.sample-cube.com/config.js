(function (exports) {
  var settings = exports.__config || {};
  var absUrl = (function () {
    window.ABS_URL = window.ABS_URL.replace("{ABS_URL}", "");
    return window.ABS_URL || window.location.href;
  })();
  Object.defineProperties(settings, {
    useFingerprintPro: {
      value: true,
      writable: false,
    },
    fingerprintProKey: {
      value: "97Y6nHrdsyKdJzgedFdH",
      writable: false,
    },
    fpEndpoint: {
      value: "https://fp.sample-cube.com",
      writable: false,
    },
    daysForDuidRefresh: {
      value: 30,
      writable: false,
    },
    reconfirmContactTimeout: {
      value: 5,
      writable: false,
    },
    reconfirmEmailPattern: {
      value: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
      writable: false,
    },
    sampleChainTimeout: {
      value: 5,
      writable: false,
    },
    rvidTimeout: {
      value: 2,
      writable: false,
    },
    rfgTimeout: {
      value: 2,
      writable: false,
    },
    rfgLib: {
      value: "//hosting.researchforgood.com/js/df-fp.js",
      writable: false,
    },
    comScoreTimeout: {
      value: 2,
      writable: false,
    },
    comScoreLib: {
      value: "//sb.scorecardresearch.com/p?c1=14&c2=37581797&c4=s&cj=1&c3=",
      writable: false,
    },
    baseApi: {
      value: (function (url) {
        if (url.indexOf("localhost") > -1) {
          return "http://localhost:64657/api/v1";
        }
        //Dev
        if (url.indexOf("dev-p-surveys.sample-cube.com") > -1) {
          return "https://dev-p-api-surveys.sample-cube.com/api/v1";
        }
        //QA
        if (url.indexOf("qa-surveys.sample-cube.com") > -1) {
          return "https://qa-api-surveys.sample-cube.com/api/v1";
        }
        //Prod Staging - 2
        if (url.indexOf("stg2-surveys.sample-cube.com") > -1) {
          return "https://stg2-api-surveys.sample-cube.com/api/v1";
        }
        //Prod Staging - 1
        if (url.indexOf("stg-surveys.sample-cube.com") > -1) {
          return "https://stg-api-surveys.sample-cube.com/api/v1";
        }
        //Prod Primary
        if (url.indexOf("prod-eus-surveys.sample-cube.com") > -1) {
          return "https://prod-eus-api-surveys.sample-cube.com/api/v1";
        }
        if (url.indexOf("stg-eus-surveys.sample-cube.com") > -1) {
          return "https://stg-eus-api-surveys.sample-cube.com/api/v1";
        }
        //Prod
        return "https://api-surveys.sample-cube.com/api/v1";
      })(absUrl),
      writable: false,
    },
  });
  exports.__config = settings;
})(window);
