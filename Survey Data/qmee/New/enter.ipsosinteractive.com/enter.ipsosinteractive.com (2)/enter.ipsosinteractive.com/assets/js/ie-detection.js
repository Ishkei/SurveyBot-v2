function getIEMajor() {
  var browser = {};
  browser.name = "Other";
  if (/*@cc_on!@*/ false || !!document.documentMode) {
    var split = bowser.version.split(".");
    switch (split.length) {
      case 3:
        browser.patch = parseInt(split[2], 10);
      case 2:
        browser.minor = parseInt(split[1], 10);
      case 1:
        browser.major = parseInt(split[0], 10);
    }
    return browser.major;
  }
  return null;
}

function isIE9OrLower() {
  var IEMajor = getIEMajor();
  return IEMajor != null && IEMajor <= 9;
}

function isIE8OrLower() {
  var IEMajor = getIEMajor();
  return IEMajor != null && IEMajor <= 8;
}
