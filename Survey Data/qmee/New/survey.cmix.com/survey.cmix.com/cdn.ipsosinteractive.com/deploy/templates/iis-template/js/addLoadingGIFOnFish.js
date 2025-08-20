function everythingReady() {
  var containerCode = "";
  var parag = document.createElement("p").style,
    supportsTransitions =
      "transition" in parag ||
      "WebkitTransition" in parag ||
      "MozTransition" in parag ||
      "msTransition" in parag ||
      "OTransition" in parag;
  containerCode += "	<div class='iisSharky-loading-animation'>";
  if (supportsTransitions) {
    containerCode +=
      "		<div class='loader'><div></div><div></div><div></div></div>";
  } else {
    containerCode +=
      "		<div class='loader-fallback'><img src='https://cdn.ipsosinteractive.com/deploy/templates/iis-fish-template/img/basic/loading-fallback.gif' alt='loading'></div></div></div>";
  }
  containerCode += "	</div>";
  $("body").append(containerCode);
  $("body").trigger("fakeReady");
}
