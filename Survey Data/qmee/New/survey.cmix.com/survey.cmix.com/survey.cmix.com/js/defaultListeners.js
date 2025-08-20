cmJq(function ($) {
  "use strict";
  function findSiblingResponseInputs(element) {
    var thisJq = cmJq(element);
    var parentQuestion = thisJq.parents(".cm-question").first();
    var inputs = null;

    var $cell = thisJq.closest(".cm-grid-cell");

    if ($cell.length > 0) {
      var qId = $cell.attr("questionid");
      inputs = parentQuestion
        .find('[questionid="' + qId + '"] :input')
        .not(this)
        .not("[data-marker='" + thisJq.attr("value") + "']");
    } else {
      inputs = parentQuestion
        .find(":input")
        .not(this)
        .not("[data-marker='" + thisJq.attr("value") + "']");
    }

    return inputs;
  }

  // Add eventListener to the document so that any submission of the form will
  // call submit via ajax and retain page.
  $(document).on("submit", "form#cm-surveyForm.cm-ajax", postSurvey);
  var surveyContainer = $("#cm-surveyContainer");

  surveyContainer.on("change", "input[type='number']", function () {
    var valStr = this.value;
    var val = parseFloat(valStr);
    if (isNaN(val) && valStr !== "-" && valStr !== ".") {
      this.value = "";
    } else {
      // reset it to insure it's a valid numeric
      this.value = val;
    }
  });

  // Add eventListener to the input boxes within a numeric response set that
  // contains a runningTotal span.
  // precision is stored in the list element of the response set.
  surveyContainer.on("change keyup", "[data-cm-running-total]", function () {
    var questionId = $(this).attr("data-cm-running-total");
    var responseSet = surveyContainer.find(
      "[data-cm-running-total=" + questionId + "]"
    );

    var sum = 0;
    responseSet.each(function forEachInput(index, value) {
      if (value.type === "number") {
        var val = parseFloat($(this).val());
        if (isNaN(val)) {
          val = 0;
        }
        sum += val;
      }
    });

    var totalSelector = "[data-cm-running-total-label=" + questionId + "]";
    var total = surveyContainer.find(totalSelector); // The element that will display the total
    if (total.length > 0) {
      var precisionSetting = $(total).data("cm-precision").split(":");
      var precision = parseInt(precisionSetting.pop());
      $(total).text(sum.toFixed(precision));
    }
  });

  // Add eventListener to the input boxes within the data-cm-precision attribute
  // the attribute has the format of 'exact:2'
  surveyContainer.on("change", "INPUT[data-cm-precision]", function () {
    var precisionSetting = $(this).data("cm-precision").split(":");
    var precision = parseInt(precisionSetting.pop());
    var val = parseFloat($(this).val());
    if (precisionSetting[0] === "exact" && precision >= 0 && precision <= 20) {
      val = val.toFixed(precision);
      $(this).val(val);
    }
  });

  // Add eventListener to the checkboxes toggle the checkboxes
  // if the item checked is an exclusive choice
  surveyContainer.on("change", ":checkbox", function () {
    var exclusive = false;
    var clickedCheckbox = $(this);
    if (
      clickedCheckbox.hasClass("cm-exclusiveResponse") ||
      clickedCheckbox.hasClass("cm-RSDK")
    ) {
      exclusive = true;
    }

    var isGrid =
      clickedCheckbox.closest("[data-qnum]").find(".cm-grid-response-set")
        .length > 0 || clickedCheckbox.closest(".cm-simple-grid").length > 0;

    var inputs;
    var exclusiveInputs;
    var exclusiveSpecify = [];
    if (isGrid) {
      var questionId = clickedCheckbox
        .closest("[questionid]")
        .attr("questionid");
      var grid = clickedCheckbox.closest("[data-qnum]");
      var allQuestionElems = grid.find("[questionid=" + questionId + "]");
      inputs = allQuestionElems.find(":input").not(this);
      var $this = $(this);
      if ($this.closest(".cm-simple-grid").length > 0) {
        inputs = inputs.not("[value=" + $this.attr("value") + "]");
      }
      exclusiveInputs = allQuestionElems.find(".cm-exclusiveResponse");
      exclusiveInputs.each(function () {
        var $this = $(this);
        var marker = $this.attr("id");
        exclusiveSpecify.push($("[data-marker=" + marker + "]"));
      });
    } else {
      inputs = clickedCheckbox.parents(".fieldset").find(":input").not(this);
      exclusiveInputs = clickedCheckbox
        .parents(".fieldset")
        .find(".cm-exclusiveResponse");
      exclusiveInputs.each(function () {
        var $this = $(this);
        var marker = $this.attr("id");
        exclusiveSpecify.push($("#" + marker + "_SP"));
      });
    }

    if (clickedCheckbox.prop("checked")) {
      if (exclusive) {
        $(inputs).each(function forEachInput() {
          this.checked = false;
          var tagName = $(this).prop("tagName");

          if (tagName === "SELECT") {
            $(this).val("");
          } else if (tagName === "TEXTAREA") {
            $(this).val("");
          } else {
            var inputType = $(this).attr("type").toUpperCase();

            // clear the values of all but radio and checkbox types because
            // their values must be preserved.
            if (inputType !== "RADIO" && inputType !== "CHECKBOX") {
              $(this).val("");
            } else {
              this.checked = false;
            }
          }
        });
      } else {
        exclusiveInputs.prop("checked", false);
        $.each(exclusiveSpecify, function () {
          $(this).val("");
        });
      }
    }
  });

  // Add eventListener to the checkboxes with a class of cm-QDK
  // If checked, disable all inputs (except this) in the Question Div
  surveyContainer.on("change", ":checkbox.cm-QDK", function onDontKnowChange() {
    if ($(this).prop("checked")) {
      var inputs = $(this).parents("DIV.cm-question").find(":input").not(this);
      var divsMobileSmart = $(this)
        .parents("DIV.cm-question")
        .find(".cm-smart-button")
        .not(this);
      if (divsMobileSmart.length > 0) {
        $(".cm-smart-button").removeClass("cm-selected");
      }
      $(inputs).each(function () {
        this.checked = false;
        var $this = $(this);
        var tagName = $this.prop("tagName");

        if (tagName === "SELECT") {
          $this.val("");
        } else if (tagName === "TEXTAREA") {
          $this.val("");
        } else if (tagName === "BUTTON") {
          // do nothing
        } else {
          var inputType = ($this.attr("type") || "").toUpperCase();

          // clear the values of all but radio and checkbox types because
          // their values must be preserved.
          if (inputType !== "RADIO" && inputType !== "CHECKBOX") {
            $this.val("");
          }
        }
      });
    }
  });

  surveyContainer.on("change", ":input", function onInputFieldChange() {
    var $this = $(this);
    if (!$this.hasClass("cm-header-other-specify")) {
      var dontKnow = $this.parents(".cm-question").find(".cm-QDK");
      if (!$this.hasClass("cm-QDK")) {
        dontKnow.prop("checked", false);
      }

      if (!$this.hasClass("cm-RSDK")) {
        var $cell = $this.closest("[questionId]");
        if ($cell.length !== 0) {
          var questionId = $cell.attr("questionid");
          var allQuestionInputs = surveyContainer.find(
            "[questionid=" + questionId + "] input"
          );
          var exclusiveInputs = allQuestionInputs.filter(".cm-RSDK");
          exclusiveInputs.prop("checked", false);
        } else {
          var responseDontKnow = $this.closest(".cm-question").find(".cm-RSDK");
          responseDontKnow.prop("checked", false);
        }
      }
    }
  });

  surveyContainer.on(
    "keyup",
    ".cm-numeric-input",
    function onNumericInputFieldKeyup() {
      var $this = $(this);
      var value = $this.val();
      if (
        value.length > 1 &&
        value[0] === "0" &&
        value[1] !== "." &&
        !isNaN(value)
      ) {
        $this.val(+value);
      }
    }
  );

  // handle showing and hiding the other specify on ddb changes
  surveyContainer.on("change", "select.cm-dropdown-input", function () {
    // Always clear and hide all the other specifies
    $(this).parents("li").find(".cm-other-specify").val("").hide();
    var option = $(this).find(":selected");
    var specifyBox = $(option).attr("data-specify");
    if (specifyBox) {
      $("#" + specifyBox)
        .animate({
          width: "toggle",
        })
        .focus();
    }
  });

  // handle clearing the other specify boxes when a radio question changes.
  surveyContainer.on("change", 'input[type="radio"]', function (event) {
    var specifyBox = $(this).attr("data-specify");

    if (specifyBox) {
      $("#" + specifyBox).focus();
    }
    findSiblingResponseInputs(this).filter(".cm-other-specify").val("");
  });

  // clear an other-specify's value if it's checkbox gets unchecked.
  surveyContainer.on("change", 'input[type="checkbox"]', function () {
    var $this = $(this);
    var marker = $this.val();
    var $cell = $this.closest("[questionId]");
    var $specify = null;

    if ($cell.length > 0) {
      $specify = $cell.find(
        "input.cm-other-specify[data-marker='" + marker + "']"
      );
    } else {
      $specify = $this
        .closest(".cm-question")
        .find("input.cm-other-specify[data-marker='" + marker + "']");
    }

    if ($this.prop("checked") === false) {
      $specify.val("");
    } else {
      $specify.focus();
    }
  });

  // Check radios and checkboxes when an other specify is clicked on.
  surveyContainer.on("click", ".cm-other-specify", function () {
    var marker = $(this).attr("data-marker");
    var $cell = $(this).closest("[questionId]");
    var radios = null;
    var checkboxes = null;

    if ($cell.length > 0) {
      radios = $cell.find("input[type='radio'][value='" + marker + "']");
      checkboxes = $cell.find("input[type='checkbox'][value='" + marker + "']");
    } else {
      var $parent = $(this).closest(".cm-question");
      radios = $parent.find("input[type='radio'][value='" + marker + "']");
      checkboxes = $parent.find(
        "input[type='checkbox'][value='" + marker + "']"
      );
    }

    radios.prop("checked", true).trigger("change");
    checkboxes.prop("checked", true).trigger("change");
  });

  $("#cm-popup-overlay").click(function (event) {
    $("#cm-popup-overlay").hide();
    $("[data-cm-popup]").hide();
    event.preventDefault();
    event.stopPropagation();
  });

  // test controls
  $(document).on("click", "#cm-testControls A", function () {
    var cmid = getParameterByName("CMID");
    var lnk = $(this).attr("id");
    var action;

    switch (lnk) {
      case "TUCprev":
        action = "prev";
        break;

      case "TUCrev":
        action = "review";
        break;

      case "TUCrestart":
        action = "restart";
        break;
    }

    $.ajax({
      url: "testUserControls.php",
      type: "POST",
      data: { action: action, go: "prev", CMID: cmid },
    })
      .done(function () {
        switch (action) {
          case "prev":
            $("#go").val("prev");
            postSurvey();
            break;
          case "review":
            if (console.log) {
              console.log("view/edit past answers.");
            }
            break;
          case "restart":
            window.location.reload();
            break;
        }
      })
      .fail(function () {
        alert("Failed, Sorry");
      });
  });
});
