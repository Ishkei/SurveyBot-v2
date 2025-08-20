jQuery("body").append(
  '<input type="hidden" id="ClientID" name="QSClientID" value="32F0DF3C-D504-46E9-999F-AE32A3D57A44"><input type="hidden" id="SurveyID" name="SurveyID"><input type="hidden" id="PanelistID" name="PanelistID">'
);
jQuery("#SurveyID").val(
  jQuery("#cmix-projectId").val() + (tplisTest ? "_test" : "")
);
jQuery("#PanelistID").val(PanelistID);

jQuery(document).ready(function () {
  var $ = jQuery;
  var QsIsTesting = tplisTest;
  var isAjax = $("#cmix-submitType").val() == "ajax" ? 1 : 0;
  var submitted = 1,
    callStart = 0;
  var timeout = 3000;
  var locale = $("#cmix-locale").val().toUpperCase().split("-");
  var QsLangCode = locale[0];
  var timeoutId = null;
  var cmixPostSurvey = window.postSurvey;
  var cmixFlowDirection = "";

  if (
    [
      "AR",
      "BG",
      "ZH-CHS",
      "ZH-CHT",
      "CS",
      "DA",
      "NL",
      "EN",
      "FI",
      "FR",
      "DE",
      "HU",
      "ID",
      "IT",
      "JA",
      "KO",
      "MS",
      "NN",
      "NO",
      "PL",
      "PT",
      "RO",
      "RU",
      "SK",
      "ES",
      "SV",
      "TH",
      "TR",
      "VI",
    ].indexOf(QsLangCode) < 0
  ) {
    QsLangCode = "";
  }

  function submitForm(submitType) {
    if (!submitType) submitType = "timeout";
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (!submitted) {
      surveyCover.off();
      submitted = 1;
      if (!isAjax) {
        $("#cm-surveyForm").off("submit", CallQSService).submit();
      } else {
        cmixPostSurvey(cmixFlowDirection);
      }
    } /*
    try{
      $.get("https://surveytools.dynata.com/dcd/cmix/qualityScore/qstracking.php?survey=" + 
           jQuery("#cmix-projectId").val() + "&question=" + $(".cm-question").data("qnum") + "&rid=" + $("#cmix-respondentId").val() + 
           "&isajax=" + isAjax + "&apitime=" + (Date.now() - callStart) + "&submit=" + submitType);
    } 
    catch(e){
      console.log("call qstracking error", e);
    }*/
  }

  function derivePageId() {
    pId = $("[name=cmix-pageId]").val();
    var loopId = $("#loopnode").data("loopiter");
    if (loopId) {
      pId += "_" + loopId;
    }
    return pId;
  }

  function CallQSService(e) {
    submitted = 0;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (!isAjax) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      e.stopPropagation();
      surveyCover.on();
    }
    var isRvId = $("#GeoCodes").length > 0;
    var isRA = $(".imperium-ra-question").length > 0;

    var pageId = derivePageId();

    try {
      callStart = Date.now();
      imperium_qualityscore.CollectData(
        pageId,
        getMatrixData(),
        CollectQSDataResponse
      );
    } catch (e) {
      console.error(e);
      submitForm("error: " + e.message);
    }
    if (isAjax && !isRvId && !isRA) {
      submitForm("nowait");
    } else {
      timeoutId = setTimeout(submitForm, timeout);
    }
  }

  function CollectQSDataResponse(data) {
    if (QsIsTesting) console.log("QS:", JSON.stringify(data));
    submitForm("apidone");
  }

  function getMatrixData() {
    var d = {};
    var data = [];
    var loopId = $("#loopnode").data("loopiter");
    $(".cm-simple-grid  table td input:radio:checked").each(function () {
      var items = $(this).attr("id").replace(/^h_/, "").split("_");
      if (items.length == 3) {
        if (loopId) items[0] += "_" + loopId;
        d[items[0]] = d[items[0]] || {};
        d[items[0]][items[1]] = d[items[0]][items[1]] || [];
        d[items[0]][items[1]].push(items[2]);
      }
    });
    for (var qid in d) {
      var rows = [];
      for (var rid in d[qid]) {
        rows.push(rid + "-" + d[qid][rid].join(","));
      }
      data.push(qid + ":" + rows.join(";"));
    }
    return data.join("|");
  }

  function questionLoad() {
    if (!$("#qualityscore_collect_disabled").length) {
      if (QsLangCode) {
        $(
          ".cm-question:not([data-type=PERSONAL_IDENTIFIABLE_INFORMATION],[data-type=PASSCODE]"
        )
          .find('input[type="text"]:visible')
          .addClass("imperium-ra-question");
        $(
          ".cm-question:not([data-type=PERSONAL_IDENTIFIABLE_INFORMATION],[data-type=PASSCODE]"
        )
          .find("textarea:visible")
          .addClass("imperium-ra-question");
        $(".imperium-ra-question.cm-other-specify").each(function () {
          $(this).prop("imperium-ra-attrs", { EngagedLength: 1 });
        });
        $(".cm-numeric-input").addClass("imperium-numeric-question");
        $("label.cm-numeric-input")
          .siblings('input[type="number"]')
          .addClass("imperium-numeric-question");
      }
      imperium_qualityscore.InitializeQS();
      if (!isAjax) {
        $("#cm-surveyForm").on("submit", CallQSService);
      }
    }
  }
  function qsPostSurvey(flowDirection) {
    if (submitted == 0) return;
    cmixFlowDirection = flowDirection;
    if (
      !$("#qualityscore_collect_disabled").length &&
      flowDirection == "forward"
    ) {
      CallQSService();
    } else {
      cmixPostSurvey(flowDirection);
    }
  }
  cmSurvey.onLoad(function () {
    setTimeout(questionLoad, 100);
  });
  if (isAjax) {
    window.postSurvey = qsPostSurvey;
  }

  if (QsLangCode) {
    $("body").append(
      '<input type="hidden" id="LangCode" name="LangCode" value="' +
        QsLangCode +
        '">'
    );
  }
});

function qsRaAttributes(QID, parameters, precodes = []) {
  var $ = jQuery;
  for (var i = 0; i < precodes.length; i++)
    precodes[i] = (precodes[i] + "").toLowerCase();

  function setRaAttrs() {
    var $question = $("#question-" + QID);

    $question.find(".imperium-ra-question").each(function () {
      var $this = $(this),
        elemId;

      if (precodes.length > 0) {
        if ($question.data("type") == "SIMPLE_GRID") {
          elemId = $this.data("specify-label") || $this.data("id") || "";
          var splits = elemId.toLowerCase().replace(/^h_/, "").split("_");
          if (splits.length < 3) return;
          var rowId = splits[1],
            colId = splits[2];
          if (
            precodes.indexOf(rowId) < 0 &&
            precodes.indexOf(rowId + "_" + colId) < 0 &&
            precodes.indexOf("*_" + colId) < 0
          )
            return;
        } else {
          elemId = $this.closest("li").find("[data-name]").data("name");
          if (elemId == undefined || precodes.indexOf(elemId + "") < 0) return;
        }
      }

      var qsRaAttrs = $this.prop("imperium-ra-attrs") || {};
      $.extend(qsRaAttrs, parameters);
      $this.prop("imperium-ra-attrs", qsRaAttrs);
    });
  }
  setTimeout(setRaAttrs, 300);
}
