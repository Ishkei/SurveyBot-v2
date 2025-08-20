//set the domain
//we need all files to have the same domain when using framesets, otherwise there will be an error generated.
//All files loaded in the frameset at the bottom of this page will have the same script that will change their domain
var pattern =
  "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
if (window.location.hostname.toString().match(new RegExp(pattern))) {
  document.domain = window.location.hostname;
} else {
  document.domain = window.location.hostname.substr(
    window.location.hostname.indexOf(".") + 1
  );
}

//instantiate Console object
var c = null;
//comment below line when live to force browsers not to log info. uncomment if debugging needed
try {
  c = console;
} catch (ex) {}
c = c || new Object({ log: function (str) {} });
var console = c;

//when error occurs on page, log it or save it into an input if available
window.onerror = function (ex) {
  handleError(ex);
};

//usefull functions
//sets the value val to element with id
function setVal(id, val) {
  var el = document.getElementById(id);
  if (typeof el !== "undefined") {
    el.value = val;
  }
}

//adds custom events
function addCustomEvent(el, event, fct) {
  try {
    if (el.addEventListener) {
      //non ie
      el.addEventListener(event, fct, false);
    } else if (el.attachEvent) {
      //IE
      el.attachEvent("on" + event, fct);
    } else {
      el["on" + event] = fct;
    }
  } catch (e) {
    window.handleError(e);
  }
}

//adds attributes
function setAttributesFrom(tag, obj) {
  try {
    for (var i in obj) {
      $(tag).attr(i, obj[i]);
    }
  } catch (e) {
    window.handleError(e);
  }
}

//creates and returns a tag
function createTag(tag, attr, parent) {
  //create html object with value
  try {
    var el = document.createElement(tag);
    setAttributesFrom(el, attr);
    document.getElementById(parent).appendChild(el);
  } catch (e) {
    window.handleError(e);
  }
}

//sets a cookie
function setCookie(cName, value, exdays) {
  var exdate = new Date(),
    cValue,
    domain = location.hostname;
  domain = domain.substr(domain.indexOf("."));
  try {
    exdate.setDate(exdate.getDate() + exdays);
    cValue =
      escape(value) +
      (exdays == null ? "" : "; expires=" + exdate.toUTCString());
    document.cookie =
      cName.toUpperCase() +
      "=" +
      cValue +
      "; domain=" +
      domain +
      "; secure; path=/";
  } catch (e) {
    window.handleError(e);
  }
}

//transforms error object into a string
function errorToString(ex) {
  if (!ex) {
    return "";
  }
  var ndx,
    result = "",
    props = [
      "message",
      "stack",
      "type",
      "name",
      "arguments",
      "description",
      "fileName",
      "lineNumber",
    ];
  for (ndx = 0; ndx < props.length; ndx += 1) {
    if (ex[props[ndx]]) {
      result +=
        (result.length > 0 ? "; " : "") +
        props[ndx] +
        ": " +
        (ex[props[ndx]].join ? ex[props[ndx]].join() : ex[props[ndx]]);
    }
  }
  return result.replace(/\n/, ", ");
}

//handles error: saves its string representation into an input if available and logs it if available
function handleError(ex) {
  if (!ex) {
    return;
  }
  var err = document.getElementById("javascriptError");
  if (err) {
    err.value += escape(
      ex instanceof Error ? errorToString(ex) : ex.toString()
    );
  }
  if (console) {
    if (console.log) {
      console.log(ex);
    }
  }
}
