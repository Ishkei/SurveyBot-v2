function gridOptimize(qName, autoSubmit, progress, backBtn) {
  if (backBtn) {
    setInterval(function () {
      if (getCurrentSplitResponseBatch() !== 0) {
        jQuery("#cm-PrevButton").show();
      } else {
        jQuery("#cm-PrevButton").hide();
      }
    }, 5);
  }
  jQuery("table").hide();
  jQuery(".cm-question-wrapper").each(function () {
    jQuery(this).addClass("styleOP");
  });
  if (!("ontouchstart" in document)) {
    jQuery(".cm-grid-cell-content").each(function () {
      jQuery(this).addClass("noTouch");
    });
  }

  if (autoSubmit) {
    jQuery("#cm-NextButton").hide();
  }

  jQuery(".cm-grid-input ").hide();
  jQuery('<div class="rowCard"></div>').insertBefore(
    jQuery("div[data-qnum=" + qName + "] " + ".cm-grid-response-set")
  );
  jQuery('<div id="btnContain"></div>').insertAfter(
    jQuery("div[data-qnum=" + qName + "] " + ".cm-grid-response-set")
  );
  jQuery("div[data-qnum=" + qName + "] " + ".cm-grid-row:gt(0)").each(
    function () {
      var dataBatch = jQuery(this).attr("data-response-batch");
      var el = jQuery(this).find("td:first").detach();
      jQuery(el)
        .appendTo("div[data-qnum=" + qName + "] " + ".rowCard")
        .addClass("rowContent")
        .attr("data-response-batch", dataBatch);
    }
  );
  jQuery("div[data-qnum=" + qName + "] " + "tr:gt(0)").each(function () {
    jQuery(this)
      .find("td")
      .each(function (index) {
        jQuery("div[data-qnum=" + qName + "] " + "td:not('.rowContent')")
          .not(jQuery("td").has("div"))
          .css("display", "none");
        jQuery(this)
          .find("div:first")
          .append(
            jQuery("div[data-qnum=" + qName + "] " + "tr:first")
              .find("td")
              .eq(index + 1)
              .html()
          );
      });
  });
  jQuery("div[data-qnum=" + qName + "] " + "tr:not(:first)").each(function () {
    var dataBatch = jQuery(this).attr("data-response-batch");
    jQuery("div[data-qnum=" + qName + "] " + "#btnContain").append(
      '<div class="btnRow cm-question" data-response-batch=' +
        dataBatch +
        "></div>"
    );
  });
  jQuery("div[data-qnum=" + qName + "] " + "tr:not(:first)").each(function (
    index
  ) {
    var a = jQuery(this).find("td div").detach();
    jQuery("div[data-qnum=" + qName + "] " + ".btnRow")
      .eq(index)
      .append(a);
  });
  jQuery("input:checked")
    .parents(".cm-grid-cell-content")
    .addClass("selectedElem");
  if (progress) {
    jQuery("tr[data-response-batch]").each(function (index) {
      jQuery(
        "<div class='progressIndicator' data-response-batch=" +
          index +
          ">" +
          (index + 1) +
          "/" +
          jQuery("div[data-response-batch-count]").attr(
            "data-response-batch-count"
          ) +
          "</div>"
      ).insertAfter(jQuery(".cm-instructions"));
    });
  }
  gotoSplitResponsesBatch(getCurrentSplitResponseBatch());
  jQuery(".rowCard td").css("width", "");

  jQuery("div[data-qnum=" + qName + "] " + ".btnRow").each(function () {
    jQuery("div[data-qnum=" + qName + "] " + ".cm-grid-cell-content").each(
      function () {
        jQuery(this).click(function () {
          jQuery(this)
            .find("input[type=radio]")
            .prop("checked", "true")
            .trigger("change");
        });
      }
    );
  });
  jQuery("div[data-qnum=" + qName + "] " + ".cm-grid-cell-content").click(
    function () {
      if (!jQuery(this).find("input[type=checkbox]").prop("checked")) {
        if (jQuery(this).find("input").hasClass("cm-exclusiveResponse")) {
          jQuery(this)
            .siblings()
            .find("input[type=checkbox]")
            .prop("checked", "");
          jQuery(this)
            .find("input[type=checkbox]")
            .prop("checked", "checked")
            .trigger("change");
        } else {
          jQuery(this)
            .siblings()
            .find(".cm-exclusiveResponse")
            .prop("checked", "");
          jQuery(this)
            .find("input[type=checkbox]")
            .prop("checked", "checked")
            .trigger("change");
        }
      } else {
        jQuery(this)
          .find("input[type=checkbox]")
          .prop("checked", "")
          .trigger("change");
      }
    }
  );

  jQuery("div[data-qnum=" + qName + "] " + "input[type=radio]").each(
    function () {
      if (autoSubmit) {
        jQuery(this)
          .parents(".cm-grid-cell-content")
          .click(function () {
            jQuery("#cm-NextButton").click();
          });
      }
      jQuery(this).change(function () {
        jQuery(this)
          .parents(".cm-grid-cell-content")
          .siblings()
          .removeClass("selectedElem");
        jQuery(this).parents(".cm-grid-cell-content").addClass("selectedElem");
      });
    }
  );
  jQuery("div[data-qnum=" + qName + "] " + "input[type=checkbox]").each(
    function () {
      jQuery(this).change(function () {
        jQuery(this)
          .parents(".cm-grid-cell-content")
          .removeClass("selectedElem");
        jQuery(this)
          .parents(".cm-grid-cell-content")
          .siblings()
          .removeClass("selectedElem");
        if (jQuery(this).hasClass("cm-exclusiveResponse")) {
          if (jQuery(this).prop("checked")) {
            jQuery(this)
              .parents(".cm-grid-cell-content")
              .addClass("selectedElem");
          } else {
            jQuery(this)
              .parents(".cm-grid-cell-content")
              .removeClass("selectedElem");
          }
        } else {
          jQuery(this)
            .parents(".btnRow")
            .find("input:checked")
            .parents(".cm-grid-cell-content")
            .addClass("selectedElem");
          jQuery(this)
            .siblings()
            .find(".cm-exclusiveResponse")
            .parents(".cm-grid-cell-content")
            .removeClass("selectedElem");
        }
      });
    }
  );
}
function rowSelect(autoSubmit) {
  jQuery(".cm-question-wrapper").each(function () {
    jQuery(this).addClass("styleOP");
  });
  if (autoSubmit) {
    jQuery("#cm-NextButton").hide();
  }
  jQuery("input:checked")
    .parents(".cm-response-container")
    .addClass("selectedElem");
  jQuery(".cm-response-container input[type='checkbox']").change(function () {
    if (jQuery(this).is(":checked")) {
      if (jQuery(this).hasClass("cm-exclusiveResponse")) {
        // jQuery(".cm-response-container").removeClass("selectedElem");
        // jQuery(".cm-response-container").find(".cm-radio-label-text").removeClass("selectedElem");
        // jQuery(".cm-response-container").find(".cm-other-specify").css("background-color", "#ffffff");
        jQuery(this)
          .parents(".styleOP")
          .find(".cm-response-container")
          .removeClass("selectedElem");
        jQuery(this)
          .parents(".styleOP")
          .find(".cm-response-container .cm-radio-label-text")
          .removeClass("selectedElem");
        jQuery(this)
          .parents(".styleOP")
          .find(".cm-response-container .cm-other-specify")
          .css("background-color", "#ffffff");
      } else {
        //jQuery(".cm-exclusiveResponse").parents(".cm-response-container").removeClass("selectedElem");
        //jQuery(".cm-exclusiveResponse").parents(".cm-response-container").find(".cm-radio-label-text").removeClass("selectedElem");
        //jQuery(".cm-exclusiveResponse").parents(".cm-response-container").find(".cm-other-specify").css("background-color", "#ffffff");

        jQuery(this)
          .parents(".styleOP")
          .find(".cm-exclusiveResponse")
          .parents(".cm-response-container")
          .removeClass("selectedElem");
        jQuery(this)
          .parents(".styleOP")
          .find(".cm-exclusiveResponse")
          .parents(".cm-response-container")
          .find(".cm-radio-label-text")
          .removeClass("selectedElem");
        jQuery(this)
          .parents(".styleOP")
          .find(".cm-exclusiveResponse")
          .parents(".cm-response-container")
          .find(".cm-other-specify")
          .css("background-color", "#ffffff");
      }
      jQuery(this).parents(".cm-response-container").addClass("selectedElem");
      jQuery(this)
        .parents(".cm-response-container")
        .find(".cm-radio-label-text")
        .addClass("selectedElem");
      jQuery(this)
        .parents(".cm-response-container")
        .find(".cm-other-specify")
        .css("background-color", "#ffffff");
    } else {
      jQuery(this)
        .parents(".cm-response-container")
        .removeClass("selectedElem");
      jQuery(this)
        .parents(".cm-response-container")
        .find(".cm-radio-label-text")
        .removeClass("selectedElem");
      jQuery(this)
        .parents(".cm-response-container")
        .find(".cm-other-specify")
        .css("background-color", "#ffffff");
    }
  });
  jQuery(".cm-response-container input[type='radio']").change(function () {
    if (jQuery(this).prop("checked")) {
      jQuery(this).parents(".cm-response-container").addClass("selectedElem");
      jQuery(this)
        .parents(".cm-response-container")
        .find(".cm-radio-label-text")
        .addClass("selectedElem");
      jQuery(this)
        .parents(".cm-response-container")
        .find(".cm-other-specify")
        .css("background-color", "#ffffff");
      jQuery(this)
        .parents(".styleOP")
        .find("input[type='radio']:not(:checked)")
        .parents(".cm-response-container")
        .removeClass("selectedElem");
      jQuery(this)
        .parents(".styleOP")
        .find("input[type='radio']:not(:checked)")
        .parents(".cm-response-container")
        .find(".cm-radio-label-text")
        .removeClass("selectedElem");
      jQuery(this)
        .parents(".styleOP")
        .find("input[type='radio']:not(:checked)")
        .parents(".cm-response-container")
        .find(".cm-other-specify")
        .css("background-color", "#ffffff");
      if (autoSubmit) {
        if (
          jQuery(this)
            .parents(".cm-response-container")
            .hasClass("cm-other-specify-container")
        ) {
          jQuery("#cm-NextButton").show();
        } else {
          jQuery("#cm-NextButton").click();
        }
      }
    }
  });
}
