$(".DGField textarea").removeAttr("class").removeAttr("id"),
  $(".DGField label").remove(),
  $(".DGField span").removeAttr("class"),
  $(".DGField:gt(0)").each(function () {
    $(".DGContainer").append($(this));
  }),
  $("#content>div>br").remove();
var noOEFOund = !0;
function unboundReady() {
  initDG();
}
function initDG() {
  let t = {
      index: 1,
      sid: sid,
      respid: respid,
      locale: locale,
      surveyid: surveyid,
      idtype: idtype,
      descriptive: descriptive,
      rtype: rtype,
      pA: pA,
      tS: tS,
      hP: hP,
      rF: rF,
      fR: fR,
      bW: bW,
      questiontype: questiontype,
      devicetype: devicetype,
    },
    e = $(".vEdit").length > 0 ? ".vEdit" : ".mrEdit";
  hasOE &&
    $(e).each(function () {
      if (!$(this).is(":hidden")) {
        var i =
          ".vEdit" == e
            ? $(e).prop("tagName").toLowerCase() +
              "[name=" +
              $(this).attr("name") +
              "]:visible"
            : "#" + $(this).attr("id");
        return BootstrapFront({ ...t, tA: i, mini: !1 }), (noOEFOund = !1), !1;
      }
    }),
    (!hasOE || noOEFOund) && BootstrapFront({ ...t, tA: "", mini: !0 });
}
function saveDGData(t) {
  let e = t;
  for (let i in e) $('.DGContainer textarea[name$="_Q' + i + '"]').val(e[i]);
}
$(window).load(function () {
  $(".customJSONproperties").length > 0
    ? -1 ==
        $(".customJSONproperties")[0]
          .textContent.toString()
          .indexOf("UnboundList") && initDG()
    : initDG();
}),
  $("body").on("fakeReady", function () {
    (noOEFOund = !0), initDG();
  }),
  $(".mrNext").click(function () {
    "function" == typeof dg_submit && dg_submit();
  });
