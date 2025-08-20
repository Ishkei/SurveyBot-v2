var jsver = "";
function createScriptTag(ver) {
  try {
    var scriptTag = document.createElement("script");
    if (/opera/.test(navigator.userAgent.toLowerCase())) {
      scriptTag.setAttribute("type", "application/javascript;version=" + ver);
    } else {
      scriptTag.setAttribute("language", "Javascript" + ver);
    }
    scriptTag.text = "jsver = " + ver + ";";
    document.forms[0].appendChild(scriptTag);
  } catch (e) {
    jsver = "";
  }
}

if (jsver == "") {
  createScriptTag(2.2);
}
if (jsver == "") {
  createScriptTag(2.1);
}
if (jsver == "") {
  createScriptTag(2.0);
}
if (jsver == "") {
  createScriptTag(1.9);
}
if (jsver == "") {
  createScriptTag(1.8);
}
if (jsver == "") {
  createScriptTag(1.7);
}
if (jsver == "") {
  createScriptTag(1.6);
}
if (jsver == "") {
  createScriptTag(1.5);
}
if (jsver == "") {
  createScriptTag(1.4);
}
if (jsver == "") {
  createScriptTag(1.3);
}
if (jsver == "") {
  createScriptTag(1.2);
}
if (jsver == "") {
  createScriptTag(1.1);
}

MyBrowser = (function () {
  var JavaScriptVersion = (function (v) {
    if (isNaN(v)) v = -1;
    return v;
  })(jsver);
  var Supports = (function (ua) {
    var testEl = document.createElement("video"),
      videoTag = (fileAPI = canvasTag = mpeg4 = h264 = ogg = webm = false),
      cvs = document.createElement("canvas");
    if (testEl.canPlayType) {
      // Check for MPEG-4 support
      mpeg4 = "" !== testEl.canPlayType('video/mp4; codecs="mp4v.20.8"');

      // Check for h264 support
      h264 =
        "" !==
        (testEl.canPlayType('video/mp4; codecs="avc1.42E01E"') ||
          testEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));

      // Check for Ogg support
      ogg = "" !== testEl.canPlayType('video/ogg; codecs="theora"');

      // Check for Webm support
      webm = "" !== testEl.canPlayType('video/webm; codecs="vp8, vorbis"');

      videoTag = [];
      if (mpeg4) videoTag.push("mpeg4");
      if (h264) videoTag.push("h264");
      if (ogg) videoTag.push("ogg");
      if (webm) videoTag.push("webm");
    }
    if (
      !!(
        window.File &&
        window.FileReader &&
        window.FileList &&
        window.Blob &&
        !/android/i.test(ua)
      )
    ) {
      fileAPI = [];
      if (!!window.File) fileAPI.push("File");
      if (!!window.FileReader) fileAPI.push("FileReader");
      if (!!window.FileList) fileAPI.push("FileList");
      if (!!window.Blob) fileAPI.push("Blob");
    }
    canvasTag = !!(cvs.getContext && cvs.getContext("2d"));
    return { VideoTag: videoTag, CanvasTag: canvasTag, FileAPI: fileAPI };
  })(navigator.userAgent.toLowerCase());
  return { Supports: Supports, JavaScriptVersion: JavaScriptVersion };
})();

var WebcamSnifferStatus = {
  UNKNOWN: 0,
  FLASH_NOT_INSTALLED: 1,
  FLASH_TOO_OLD: 2,
  FLASH_BLACKLISTED: 3,
  BROWSER_BLACKLISTED: 4,
  MOBILE_BROWSER: 5,
  NO_WEBCAMS_DETECTED: 6,
  OTHER_ERROR: 7,
  0: "UNKNOWN",
  1: "FLASH_NOT_INSTALLED",
  2: "FLASH_TOO_OLD",
  3: "FLASH_BLACKLISTED",
  4: "BROWSER_BLACKLISTED",
  5: "MOBILE_BROWSER",
  6: "NO_WEBCAMS_DETECTED",
  7: "OTHER_ERROR",
};

function _RealeyesitEnvDetectCallback(result) {
  if (window.webCamSet === 0) {
    setVal("hasWebcam", result.checksPassed ? "true" : "false");
    setVal("webcamStatus", result.failureReasonCode || "0");
  }
  window.webCamSet = 1;
  submitter();
}

function GetJavascriptVersion() {
  if (isNaN(jsver)) jsver = -1;
  return jsver;
}

var userAgent = navigator.userAgent.toLowerCase(),
  t1 = new Date().getTime(),
  t2,
  speed,
  browser = "",
  counter = 0;

function hasFlash() {
  //get flash version
  var f = new Array(),
    i,
    flash,
    res,
    str;
  try {
    f["enabled"] = false;
    f["version"] = "0.0";
    f["revision"] = "0";
    f["unknown"] = false;
    if (/msie/i.test(userAgent) && !/opera/i.test(userAgent)) {
      for (i = 20; i > 0; i--) {
        try {
          flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
          res = flash
            .GetVariable("$version")
            .match(/([0-9]{1,}\,[0-9]{1,}\,[0-9]{1,}\,[0-9]{1,})/gim);
          if (res) {
            str = res[0];
            f["version"] = str.split(",")[0] + "." + str.split(",")[1];
            f["revision"] = str.split(",")[2];
          }
          break;
        } catch (ex) {}
      }
      if (f["version"] > 0) {
        f["enabled"] = true;
      }
      if (f["unknown"]) {
        f["enabled"] = false;
        f["version"] = "0.0";
        f["revision"] = "0";
      }
      return f;
    } else {
      if (navigator.plugins) {
        var p = navigator.plugins;
        if (p.length == 0) {
          f["unknown"] = true;
        }
        for (i = 0; i < p.length; i++) {
          if (/flash/i.test(p[i].description)) {
            f["enabled"] = true;
            res = p[i].description.match(/[0-9]{1,}[\.]{0,1}[0-9]{0,}/gim);
            if (res) {
              f["version"] = res[0];
            }
            res = p[i].description.match(/r[0-9]{0,}/gim);
            if (res) {
              f["revision"] = res[0].substr(1);
            }
            break;
          }
        }
      } else {
        f["unknown"] = true;
      }
      if (f["unknown"]) {
        f["enabled"] = false;
        f["version"] = "0.0";
        f["revision"] = "0";
      }
    }
  } catch (e) {
    window.handleError(e);
  }
  return f;
}

try {
  $.browser = {
    version: /aol/.test(userAgent)
      ? userAgent.match(/aol(\s|\/)(\d*)\.(\d*)/gim)[0].substr(4)
      : !/opera/.test(userAgent)
      ? (userAgent.match(/.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/) || [])[1]
      : userAgent.substring(userAgent.lastIndexOf("/") + 1),
    chrome: /chrome/.test(userAgent),
    android:
      /android|linux/.test(userAgent) &&
      "ontouchstart" in document.documentElement,
    iphone: /iphone/.test(userAgent),
    ipad: /ipad/.test(userAgent),
    ipod: /ipod/.test(userAgent),
    blackberry: /blackberry/.test(userAgent),
    kindle: /kindle|silk|amazon|ebook|reader/.test(userAgent),
    safari: /safari/.test(userAgent) && !/chrome/.test(userAgent),
    opera: /opera/.test(userAgent),
    ie: /msie|trident/.test(userAgent) && !/opera/.test(userAgent),
    edge: /edge/.test(userAgent) && !/opera/.test(userAgent),
    firefox:
      /firefox/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
    aol: /aol/.test(userAgent),
  };
} catch (e) {
  window.handleError(e);
}

try {
  if (/trident|msie|edge/.test(userAgent)) {
    $.each($.browser, function (key, value) {
      $.browser[key] = false;
    });
    if (/edge/.test(userAgent)) {
      $.browser.version = userAgent
        .match(/edge(\s|\/)(\d*)\.(\d*)/gim)[0]
        .substr(5);
      $.browser.edge = true;
    } else if (/trident|msie/.test(userAgent)) {
      $.browser.ie = true;
      if (/trident\/7.0/.test(userAgent)) {
        $.browser.version = "11.0";
      } else if (/trident\/6.0/.test(userAgent)) {
        $.browser.version = "10.0";
      } else if (/trident\/5.0/.test(userAgent)) {
        $.browser.version = "9.0";
      } else if (/trident\/4.0/.test(userAgent)) {
        $.browser.version = "8.0";
      }
    }
  }

  $.each($.browser, function (key, value) {
    //get browser type
    if (value == true) {
      browser = key;
    }
  });
} catch (e) {
  window.handleError(e);
}

//(function () {

//	var envDetect = document.createElement('script');
//	envDetect.type = 'text/javascript';
//	envDetect.async = true;
//	envDetect.src = '//codesdwncdn.realeyesit.com/environment-checker/release/2/Realeyesit.EnvironmentalDetectionAPI.js';
//	var s = document.getElementsByTagName('script')[0];
//	s.parentNode.insertBefore(envDetect, s);
//})();

//var img = new Image();
try {
  //addCustomEvent(img, "load", function () {
  t2 = new Date().getTime();
  /*var size = (413053 / 1024) * 8; //size in Kb
	var time = (t2-t1)/1000; //time in seconds*/
  //speed = size / time; //speed in Kbps
  speed = 0;
  //speed = (750.55)/((t2-t1)/1000);
  //speed
  setVal("speed", "-1");
  //flash
  var flash = hasFlash();
  setVal("flash", flash["enabled"]);
  setVal("flashVersion", flash["version"].toString());
  setVal("flashMajor", flash["version"].toString().split(".")[0]);
  setVal("flashMinor", flash["version"].toString().split(".")[1]);
  setVal("flashRev", flash["revision"]);
  //browser
  setVal("browser", browser);
  setVal("version", $.browser.version);
  setVal("screenHeight", window.screen.height);
  setVal("screenWidth", window.screen.width);
  setVal("screenAvailHeight", window.screen.availHeight);
  setVal("screenColorDepth", window.screen.colorDepth);
  setVal("screenPixelDepth", window.screen.pixelDepth);
  setVal("screenAvailWidth", window.screen.availWidth);
  setVal("navigatorAppCodeName", navigator.appCodeName);
  setVal("navigatorAppName", navigator.appName);
  setVal("navigatorAppVersion", navigator.appVersion);
  setVal("navigatorPlatform", navigator.platform);
  setVal("navigatorUseragent", navigator.userAgent);
  setVal("timeZoneOffset", new Date().getTimezoneOffset());
  //javascript
  setVal("javascriptversion", GetJavascriptVersion());
  //html5
  setVal("canvasTag", MyBrowser.Supports.CanvasTag);
  setVal("videoTag", MyBrowser.Supports.VideoTag);
  setVal("fileAPI", MyBrowser.Supports.FileAPI);
  setVal("SnifferCalled", "yes");
  //others
  setVal("protocol", self.location.protocol);

  //img.src = "sniffer/img/a.jpg?" + (new Date()).getTime();
} catch (e) {
  window.handleError(e);
}
