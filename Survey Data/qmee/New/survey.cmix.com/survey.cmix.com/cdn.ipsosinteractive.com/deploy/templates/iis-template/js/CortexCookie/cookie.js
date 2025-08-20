//namespacing to avoid name conflicts
var CookieManipulation = (function () {
  "use strict";
  var thisObject = {};
  /*
   * Sets a cookie
   * name		- the name of the cookie
   * value	- the value of the cookie
   * expire	- when the cookie should expire and is not available anymore;
   *				possible values: number (number of days after when the cookie shoud expire); date (the actual date when the cookie should expire)
   */
  thisObject.setCookie = function (name, value, expire) {
    var expireDate,
      currentDate = new Date();
    if (typeof expire === "object" && typeof expire.getTime === "function") {
      //a date passed
      expireDate = expire;
    } else if (typeof expire === "number") {
      //a number is passed
      expireDate = new Date(
        currentDate.setDate(currentDate.getDate() + expire)
      );
    } else {
      // default
      expireDate = currentDate;
    }
    document.cookie =
      name +
      "=" +
      escape(value) +
      ";expires=" +
      expireDate.toGMTString() +
      ";path=/"; //set the cookie
  };
  /*
   * Gets the value of a cookie
   * name		- the name of the cookie
   */
  thisObject.getCookie = function (name) {
    if (!document.cookie) {
      return;
    } //no cookies set
    var rex = new RegExp("(^|)" + name + "=[^;]+($|;)", "gi"), //match the cookie
      matches = rex.exec(document.cookie), //find all cookies with the sepecified name
      result = "",
      match,
      value,
      ndx;
    if (typeof matches === "object" && matches !== null && matches.length > 0) {
      for (ndx = 0; ndx < matches.length; ndx += 1) {
        match = matches[ndx];
        if (match.replace(/ /gi, "").length > 0 && match.indexOf("=") > 0) {
          //only if there is a valid match
          value = match.split("=")[1];
          if (value.indexOf(";") === value.length - 1) {
            value = value.substr(0, value.length - 2); //deletes the last semicolon
          }
          result += (result.length > 0 ? "," : "") + value; //get the value of the cookie
        }
      }
    }
    return result;
  };
  /*
   * Deletes a cookie
   * name		- the name of the cookie
   */
  thisObject.deleteCookie = function (name) {
    if (!document.cookie) {
      return;
    } //no cookies set
    var rex = new RegExp("(^|)" + name + "=[^;]+($|;)", "gi"),
      cookieExists = rex.test(document.cookie);
    if (cookieExists) {
      thisObject.setCookie(name, "", -1);
    }
  };
  return thisObject;
})();
var pattern =
  "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
if (window.location.hostname.toString().match(new RegExp(pattern))) {
  document.domain = window.location.hostname;
} else {
  document.domain = window.location.hostname.substr(
    window.location.hostname.indexOf(".") + 1
  );
}
var theProtocol = top.location.protocol == "https:" ? "https://" : "http://";
var theHost = top.location.host;
var lpURL = theProtocol + theHost + "/surveys/";
$.ajax({
  type: "POST",
  url: lpURL,
  data: "cortexredir=1",
  success: function (msg) {},
});
