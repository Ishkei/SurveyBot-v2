history.forward();
NS4 = document.layers ? 1 : 0;
IE4 = document.all ? 1 : 0;
DOM = document.getElementById ? 1 : 0;
ver4 = NS4 || IE4 ? 1 : 0;
if (document.domain.indexOf("livra") != -1)
  var message =
    "Copyright \xa9 " +
    new Date().getFullYear() +
    " Livra All rights reserved.";
else
  var message =
    "Copyright \xa9 " +
    new Date().getFullYear() +
    " Ipsos Interactive Services  All rights reserved.";

function clickIE() {
  if (document.all) {
    if (event.button == 2 || event.button == 3) {
      alert(message);
      return false;
    }
  }
}

function clickNS(e) {
  if (document.layers || (document.getElementById && !document.all)) {
    if (e.which == 2 || e.which == 3) {
      alert(message);
      return false;
    }
  }
}

if (document.layers) {
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = clickNS;
} else if (document.all && !document.getElementById) {
  document.onmousedown = clickIE;
}
document.oncontextmenu = new Function("alert(message);return false");
