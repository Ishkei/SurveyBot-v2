/*
 * John Oatis 5/8/2014
 * Whenever a page loads there may be functions that need to fire for example
 * initializing runningTotal spans on display.
 * The pageInit() method is called by each displayed page.
 * pageInit() <-- main method
 * initRunningTotal() // sets the running total for all responsesets that have it.
 * initRSDK(); // disables the items in a responseset if the RSDK was checked.
 * initDdbOS(); // toggles other specify boxes for drop down boxes
 * initQueryParams(); // sets inputs to a value specified in the query string.
 */
(function () {
  "use strict";
  window.pageInit = function () {
    initContentDirectives();
    initSkipTo();
    initGridFloatingHeaders();
    initMobileSmart();
    initGridColumnSizes();
    initSetPrecision();
    initRunningTotal();
    initRSDK();
    initQDK();
    initDdbOS();
    initResponseCols();
    checkPagePrinting();
    initResponseClickWrapper();
    // initSanitizeInputListeners();
    initCharCounterListeners();
    initPopups();
    initDragDropBucket();
    initSlider();
    initHighlightText();
    initHighlightImage();
    initDragDropScale();
    initCoordinateTracker();
    initSimpleGrid();
    firePageEvents();
    calculateSimpleGridTableWidths();
  };

  window.firePageEvents = function firePageEvents() {
    try {
      cmJq(".cm-Survey").trigger("onLoad");
    } catch (e) {
      console.error("Error when running onLoad event listeners", e);
    }

    try {
      cmJq(".cm-Survey").trigger("onPageLoad").off("onPageLoad");
    } catch (e) {
      console.error("Error when running onPageLoad event listeners", e);
    }

    try {
      cmJq(".cm-Survey").trigger("afterPageLoad");
    } catch (e) {
      console.error("Error when running afterPageLoad event listeners", e);
    }

    cmJq(".cm-Survey").data("cm-pageInitialized", true);
  };

  window.checkPagePrinting = function checkPagePrinting() {
    var $body = cmJq("body:not(.cm-Codebook)");
    $body.removeClass("allow-printing");
    if (cmJq(".allow-page-printing").length > 0) {
      $body.addClass("allow-printing");
    }
  };

  window.initRunningTotal = function initRunningTotal() {
    cmJq("[data-cm-running-total-label]").each(function forEachOutputLabel() {
      var $this = cmJq(this);
      var questionId = $this.attr("data-cm-running-total-label");
      var responseSet = cmJq("[data-cm-running-total=" + questionId + "]");

      var sum = 0;
      responseSet.each(function forEachInput(index, value) {
        if (value.type === "number") {
          var val = parseFloat(cmJq(this).val());
          if (isNaN(val)) {
            val = 0;
          }
          sum += val;
        }
      });

      var precisionSetting = $this.data("cm-precision").split(":");
      var precision = parseInt(precisionSetting.pop());
      $this.text(sum.toFixed(precision));
    });
  };

  window.initSetPrecision = function initSetPrecision() {
    var responses = cmJq("INPUT[data-cm-precision]");

    responses.each(function () {
      var precisionSetting = cmJq(this).data("cm-precision").split(":");
      var precision = parseInt(precisionSetting.pop());
      var value = cmJq(this).val();
      if (value && precision) {
        value = cmJq(this).val();
        value = parseFloat(value).toFixed(precision);
        cmJq(this).val(value);
      }
    });
  };

  window.initRSDK = function initRSDK() {
    var RSDKs = cmJq(":checkbox.cm-exclusiveResponse");
    RSDKs.each(function () {
      var thisJq = cmJq(this);
      if (thisJq.prop("checked")) {
        var parentQuestion = thisJq.parents(".cm-question").first();
        var inputs = null;
        if (!parentQuestion.hasClass("cm-grid-cell")) {
          inputs = parentQuestion
            .find(":input")
            .not(this)
            .not("[data-marker='" + thisJq.attr("value") + "']");
        } else {
          var qId = parentQuestion.attr("questionid");
          inputs = parentQuestion
            .parents(".cm-grid-response-set")
            .first()
            .find('[questionid="' + qId + '"] :input')
            .not(this)
            .not("[data-marker='" + thisJq.attr("value") + "']");
        }
        inputs.each(function () {
          var jInput = cmJq(this);
          this.checked = false;
          var tagName = jInput.prop("tagName");
          if (tagName === "SELECT") {
            cmJq(this).val("");
          } else if (tagName === "TEXTAREA") {
            cmJq(this).val("");
          } else {
            var inputType = (cmJq(this).attr("type") || "").toUpperCase();

            // clear the values of all but radio and checkbox types because
            // their values must be preserved.
            if (inputType !== "RADIO" && inputType !== "CHECKBOX") {
              cmJq(this).val("");
            }
          }
        });
      }
    });
  };

  // If a questions opt-out/DK checkbox is checked disable all the other
  // inputs in that question element when the page loads.
  window.initQDK = function initQDK() {
    var RSDKs = cmJq(":checkbox.cm-QDK");
    RSDKs.each(function () {
      if (cmJq(this).prop("checked")) {
        var inputs = cmJq(this)
          .parents("DIV.cm-question")
          .find(":input")
          .not(this);

        cmJq(inputs).each(function () {
          this.checked = false;
          var tagName = cmJq(this).prop("tagName");

          if (tagName === "SELECT") {
            cmJq(this).val("");
          } else if (tagName === "TEXTAREA") {
            cmJq(this).val("");
          } else if (tagName === "BUTTON") {
            // do nothing
          } else {
            var inputType = cmJq(this).attr("type").toUpperCase();

            // clear the values of all but radio and checkbox types because
            // their values must be preserved.
            if (inputType !== "RADIO" && inputType !== "CHECKBOX") {
              cmJq(this).val("");
            }
          }
        });
      }
    });
  };

  window.initDdbOS = function initDdbOS() {
    // checks otherspecifies in dropdown boxes to see if they should be visible or not
    cmJq(".cm-dropdown-response-set .cm-other-specify").each(function () {
      if (cmJq(this).val()) {
        cmJq(this).show();
      }
    });
  };

  /** @deprecated */
  window.initQueryParams = function initQueryParams() {
    // For every input with a data-param attribute, fetch that value from
    // the query string and set the inout to that value.
    cmJq("*[data-param]").each(function () {
      // Get the param name
      var param = cmJq(this).attr("data-param");
      // Get the param value
      var value = getParameterByName(param);
      var type = cmJq(this).attr("type");

      var tagName = cmJq(this).prop("tagName").toLowerCase();
      if (tagName === "select") {
        type = "select";
      }

      // Set the input value
      switch (type) {
        case "radio":
        case "checkbox":
          if (cmJq(this).attr("data-name") === value) {
            cmJq(this).prop("checked", true);
          }
          break;
        case "select":
          var id = cmJq(this).attr("id");
          cmJq("#" + id + " option").each(function (i) {
            var optionName = cmJq(this).attr("data-name");
            var optionValue = cmJq(this).attr("value");
            if (optionName === value) {
              cmJq("#" + id).val(optionValue);
            }
          });
          break;
        default:
          cmJq(this).val(value);
          break;
      }
    });
  };

  window.getParameterByName = function getParameterByName(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  window.initResponseCols = function initResponseCols() {
    cmJq(".cm-responseSet").each(function () {
      var numCols = parseInt(cmJq(this).attr("data-cols"));
      var numChildren = parseInt(cmJq(this).children().length);
      var p = cmJq(this).parent();
      var colWidth = 100 / numCols + "%";

      if (numCols > 1 && numChildren > 1) {
        cmJq(this).cols(numCols);
      }

      p.find(".cm-responseSet").each(function () {
        cmJq(this).css("width", colWidth);
      });
    });
    cmJq(
      ".cm-radio-response-set, .cm-checkbox-response-set, .cm-text-response-set, .cm-numeric-response-set"
    ).each(function () {
      var numCols = parseInt(cmJq(this).attr("data-cols"));
      var numChildren = parseInt(cmJq(this).children().length);
      var p = cmJq(this).parent();
      var colWidth = 100 / numCols + "%";

      if (numCols > 1 && numChildren > 1) {
        cmJq(this).cols(numCols);
      }

      var className = "";
      if (cmJq(this).hasClass("cm-checkbox-response-set")) {
        className = "cm-checkbox-response-set";
      } else if (cmJq(this).hasClass("cm-radio-response-set")) {
        className = "cm-radio-response-set";
      } else if (cmJq(this).hasClass("cm-text-response-set")) {
        className = "cm-text-response-set";
      } else if (cmJq(this).hasClass("cm-numeric-response-set")) {
        className = "cm-numeric-response-set";
      }

      var children = p.find("." + className);

      if (numCols > 1) {
        children.each(function (index) {
          if (index > 0) {
            cmJq(this).removeClass(className + "--first-column");
          }
          if (index !== children.length - 1) {
            cmJq(this).removeClass(className + "--last-column");
          }
          cmJq(this).css("width", colWidth);
        });
      }
    });
  };

  window.initResponseClickWrapper = function initResponseClickWrapper() {
    cmJq(".cm-radio-response-set .cm-response-container")
      .off("click")
      .on("click", function (event) {
        var target = cmJq(event.target);
        if (
          target !== event.currentTarget &&
          !target.is(".cm-radio-label-container")
        ) {
          return;
        }
        var $radio = cmJq(this).find("input[type='radio']:enabled");
        if ($radio.length > 0) {
          if (!$radio.prop("checked")) {
            $radio.prop("checked", true);
            $radio.trigger("change");
          }
        }
      });
    cmJq(".cm-checkbox-response-set .cm-response-container")
      .off("click")
      .on("click", function (event) {
        var target = cmJq(event.target);
        if (
          target !== event.currentTarget &&
          !target.is(".cm-checkbox-label-container")
        ) {
          return;
        }

        var $checkbox = cmJq(this).find("input[type='checkbox']:enabled");
        if ($checkbox.length > 0) {
          if (!$checkbox.prop("checked")) {
            $checkbox.prop("checked", true);
          } else {
            $checkbox.prop("checked", false);
          }
          $checkbox.trigger("change");
        }
      });
    cmJq(".cm-grid-response-set, .cm-simple-grid")
      .off("click")
      .on("click", function (event) {
        var $target = cmJq(event.target);
        var targetTag = $target.prop("tagName").toUpperCase();

        if (
          targetTag === "TR" ||
          targetTag === "TBODY" ||
          targetTag === "TABLE" ||
          $target.hasClass("cm-simple-grid__mobile-smart")
        ) {
          return;
        }
        var $radio = $target.find("input[type=radio]:enabled");
        var $checkbox = $target.find("input[type=checkbox]:enabled");
        if ($radio.length > 0) {
          if (!$radio.prop("checked")) {
            $radio.prop("checked", true);
            $radio.trigger("change");
          }
        } else if ($checkbox.length > 0) {
          if (!$checkbox.prop("checked")) {
            $checkbox.prop("checked", true);
          } else {
            $checkbox.prop("checked", false);
          }
          $checkbox.trigger("change");
        }
      });
  };

  var charCounterEvents = "keydown change paste";
  window.initCharCounterListeners = function initCharCounterListeners() {
    // handle clearing the other specify boxes when a radio question changes.
    cmJq(".cm-response-container-count--remaining .cm-text-input").each(
      function (i, element) {
        countChars(element, true);
      }
    );
    cmJq(".cm-response-container-count--used .cm-text-input").each(function (
      i,
      element
    ) {
      countChars(element, false);
    });

    cmJq(".cm-response-container-count--remaining .cm-text-input")
      .off(charCounterEvents)
      .on(charCounterEvents, countCharsLeftHandler);
    cmJq(".cm-response-container-count--used .cm-text-input")
      .off(charCounterEvents)
      .on(charCounterEvents, countCharsCurrentHandler);
  };

  window.isSpecialKey = function isSpecialKey(key) {
    if (key === 8) {
      // Shift, ctrl, alt, pause, capslock
      return true;
    } else if (key >= 16 && key <= 20) {
      // Shift, ctrl, alt, pause, capslock
      return true;
    } else if (key === 27) {
      // Escape
      return true;
    } else if (key >= 33 && key <= 40) {
      // Navigation keys
      return true;
    } else if (key >= 45 && key <= 46) {
      // Insert, delete
      return true;
    } else if (key >= 91 && key <= 93) {
      // Window, select
      return true;
    } else if (key >= 112 && key <= 123) {
      // Function keys
      return true;
    } else if (key >= 144 && key <= 145) {
      // Lock keys
      return true;
    }
    return false;
  };

  var surrogateRegex = /[\uD800-\uDFFF][\uD800-\uDFFF]/g;
  var lowSurrogateRegex = /[\uD800-\uDFFF]/g;
  window.utf8CharCount = function utf8CharCount(string) {
    var charCount = 0;
    if (typeof string === "string" || string instanceof String) {
      charCount = string.length;
      var matches = string.match(surrogateRegex);
      if (matches !== null && matches.length > 0) {
        charCount -= matches.length;
      }
    }
    return charCount;
  };

  window.preventIfFull = function preventIfFull(event) {
    if (event.type === "keydown") {
      var element = event.currentTarget;
      var jElem = jQuery(element);
      var value = jElem.val();

      var charCount = utf8CharCount(value);
      var max = jElem.attr("data-maxlength");
      if (max === "") {
        max = 4000;
      }
      // Reset content if greater than max, or prevent typing.
      var selStart = getSelectionStart(element);
      var selEnd = getSelectionEnd(element);
      if (max !== "" && max > 0 && selStart === selEnd) {
        if (event.ctrlKey || event.altKey || isSpecialKey(event.which)) {
          return false;
        } else if (charCount >= max) {
          event.preventDefault();
          return true;
        }
      }
    }
    return false;
  };

  window.countCharsLeftHandler = function countCharsLeftHandler(event) {
    var prevented = preventIfFull(event);
    if (!prevented) {
      setTimeout(function () {
        countChars(event.currentTarget, true);
      }, 0);
    }
  };

  window.countCharsCurrentHandler = function countCharsCurrentHandler(event) {
    var prevented = preventIfFull(event);
    if (!prevented) {
      setTimeout(function () {
        countChars(event.currentTarget, false);
      }, 0);
    }
  };

  window.getSelectionStart = function getSelectionStart(element) {
    var start = null;
    if (typeof element.selectionStart === "number") {
      start = element.selectionStart;
    } else if (
      window.getSelection &&
      window.getSelection() !== null &&
      window.getSelection().getRangeAt(0) !== null &&
      typeof window.getSelection().getRangeAt(0).startOffset === "number"
    ) {
      start = window.getSelection().getRangeAt(0).startOffset;
    }
    // var jElem = jQuery(element);
    // var value = jElem.val();
    return start;
  };

  window.getSelectionEnd = function getSelectionEnd(element) {
    var end = null;
    if (typeof element.selectionEnd === "number") {
      end = element.selectionEnd;
    } else if (
      window.getSelection &&
      window.getSelection() !== null &&
      window.getSelection().getRangeAt(0) !== null &&
      typeof window.getSelection().getRangeAt(0).endOffset === "number"
    ) {
      end = window.getSelection().getRangeAt(0).endOffset;
    }
    // var jElem = jQuery(element);
    // var value = jElem.val();
    return end;
  };

  window.setSelection = function setSelection(element, start) {
    var sel;
    if (element.setSelectionRange) {
      element.setSelectionRange(start, start);
    } else if (document.selection) {
      sel = document.selection.createRange();
      sel.moveStart("character", start);
      sel.select();
    } else {
      sel = window.getSelection();
      sel.collapse(element.firstChild, start);
    }
  };

  window.calculateUTF8Excess = function calculateUTF8Excess(value, excess) {
    var length = value.length;
    var stringEnd = length - excess;
    var substr = value.substring(stringEnd);
    var match = 0;
    var newMatch = 0;
    do {
      match = newMatch;
      newMatch = Math.ceil((substr.match(lowSurrogateRegex) || []).length / 2);
      substr = value.substring(stringEnd - newMatch);
    } while (newMatch !== match);
    excess = substr.length;
    return excess;
  };

  window.resetFieldLength = function resetFieldLength(element) {
    var jElem = jQuery(element);
    var value = jElem.val();
    var charCount = utf8CharCount(value);
    var max = jElem.attr("data-maxlength");
    if (max === "") {
      max = 4000;
    }
    // Reset content if greater than max, or prevent typing.
    if (max !== "" && max > 0 && charCount > max) {
      var selStart = getSelectionStart(element);
      var selEnd = getSelectionEnd(element);
      var preString = value.substring(0, selStart);
      var postString = value.substring(selEnd);
      var excess = calculateUTF8Excess(preString, charCount - max);
      var cutPosition = selStart - excess;
      var endPosition = selEnd - excess;
      var newValue = "";
      if (preString !== null && preString !== "") {
        newValue = preString.substring(0, cutPosition) + postString;
      } else {
        newValue = value.substring(0, max);
      }
      jElem.css("visibility", "hidden");
      jElem.val(newValue);
      setSelection(element, endPosition);
      jElem.css("visibility", "");
    }
  };

  window.countChars = function countChars(element, substract) {
    resetFieldLength(element);
    var jElem = jQuery(element);
    var value = jElem.val();
    var charCount = utf8CharCount(value);
    var container = jElem.closest(".cm-response-container");
    var counter = container.find(".cm-text-counter");
    var max = jElem.attr("data-maxlength");
    var min = jElem.attr("data-minlength");
    var content = counter.attr("data-content");
    // See if the field has maxlength set if it's 0.
    if (max === "") {
      max = 4000;
    }
    if (substract) {
      charCount = max - charCount;
    }
    if (content !== null) {
      content = content.replace(
        /{{charCount}}/g,
        "<span class='cm-text-counter-count'>" + charCount + "</span>"
      );
      content = content.replace(
        /{{maxLength}}/g,
        "<span class='cm-text-counter-maxlen'>" + max + "</span>"
      );
      content = content.replace(
        /{{minLength}}/g,
        "<span class='cm-text-counter-minlen'>" + min + "</span>"
      );
      container.find(".cm-text-counter").html(content);
    }
    if ((substract && charCount < 0) || (!substract && charCount > max)) {
      container.find(".cm-text-counter-count").addClass("cm-error");
    } else {
      container.find(".cm-text-counter-count").removeClass("cm-error");
    }
  };

  window.popupClickListener = function popupClickListener(event) {
    jQuery("#cm-popup-overlay").hide();
    jQuery("[data-cm-popup]").hide();
    event.preventDefault();
    event.stopPropagation();
  };

  window.initPopups = function initPopups() {
    jQuery("[data-cm-popup]").each(function () {
      var jThis = jQuery(this);
      if (jThis.find(".cm-popup-content").length === 0) {
        var content = jThis.html();
        jThis.empty();
        var newContent = jQuery("<div/>").addClass("cm-popup-content");
        newContent.html(content);
        jThis.click(popupClickListener);
        jThis.append(newContent);
      }
    });
    jQuery("[data-cm-open-popup]")
      .off("click")
      .click(function (event) {
        var popup = jQuery(this).data("cm-open-popup");
        if (popup && popup !== "") {
          cmSurvey.popup(popup);
        }
        event.preventDefault();
        event.stopPropagation();
      });
  };

  function initContentDirectives() {
    if (!cmJq.fn.ContentEdit) {
      return;
    }

    cmJq("[data-content-url]")
      .not("[data-content-url] [data-content-url]")
      .ContentEdit();
  }

  function initSkipTo() {
    var questionData = [];
    var pageData = [];
    var option = "QUESTION";
    var skipToEle = cmJq("#dp_skip_to");
    var clearSkipToElement = cmJq("#clear_skip_to");

    cmJq("#question_list > li")
      .each(function () {
        questionData.push(cmJq.trim(cmJq(this).text()));
      })
      .remove();

    cmJq("#page_list > li")
      .each(function () {
        pageData.push("PAGE " + (parseInt(cmJq.trim(cmJq(this).text())) + 1));
      })
      .remove();

    skipToEle
      .autocomplete({
        minLength: 0,
        source: function (request, response) {
          var data = [];
          var x;
          var searchVal = (request.term || "").toLowerCase();

          if (option === "QUESTION") {
            for (x = 0; x < questionData.length; x++) {
              if (questionData[x].toLowerCase().indexOf(searchVal) > -1) {
                data.push(questionData[x]);
              }
            }
          } else if (option === "PAGE") {
            for (x = 0; x < pageData.length; x++) {
              if (pageData[x].toLowerCase().indexOf(searchVal) > -1) {
                data.push(pageData[x]);
              }
            }
          }

          return response(data);
        },
      })
      .on("autocompleteselect", function (event, ui) {
        skipToEle.val(ui.item.value).trigger("change");
      })
      .off("click")
      .on("click", function () {
        skipToEle.autocomplete("search", skipToEle.val() || "");
      })
      .off("change.clear")
      .on("change.clear", function () {
        var val = skipToEle.val();

        if (!val || val === "") {
          clearSkipToElement.hide();
        } else {
          clearSkipToElement.show();
        }
      })
      .off("keydown.clear")
      .on("keydown.clear", function (e) {
        if (e.keyCode > 47 && e.keyCode < 91) {
          clearSkipToElement.show();
        }
      })
      .off("keyup.clear")
      .on("keyup.clear", function (e) {
        skipToEle.trigger("change");
      });

    // NOTE, I maintain the object reference, as there is no
    // way to recreate the autocomplete, or change its data
    cmJq("#dp_skip_to_option")
      .off()
      .on("change", function () {
        option = cmJq(this).val();

        skipToEle.val("").trigger("change");
      });

    cmJq("#clear_skip_to")
      .off()
      .click(function () {
        skipToEle.val("").trigger("change");
      });
  }

  window.initGridFloatingHeaders = function initGridFloatingHeaders() {
    function isCenterAligned(cell) {
      return (
        cell.hasClass("cm-grid-cell-alignment__center-top") ||
        cell.hasClass("cm-grid-cell-alignment__center-middle") ||
        cell.hasClass("cm-grid-cell-alignment__center-bottom")
      );
    }

    function isMiddleAligned(cell) {
      return (
        cell.hasClass("cm-grid-cell-alignment__left-middle") ||
        cell.hasClass("cm-grid-cell-alignment__center-middle") ||
        cell.hasClass("cm-grid-cell-alignment__right-middle")
      );
    }

    function resizeFloatingHeaders() {
      if (jQuery(".cm-grid-row-header .cm-grid-floated").length > 0) {
        jQuery(".cm-grid-row-header").each(function () {
          var jRow = jQuery(this);
          var maxHeight = 0;
          var jFloated = jRow.find(".cm-grid-floated");
          var floatedCount = jFloated.length;
          jFloated.each(function () {
            if (jQuery(this).html().trim() === "") {
              floatedCount--;
            }
          });
          if (floatedCount > 0) {
            var totalWidth = 0;
            var hasFloatedColumnHeaders = false;
            // Calculate the total width for the floating headers section.
            jRow.find(".cm-grid-cell").each(function () {
              var jCell = jQuery(this);
              if (!jCell.hasClass("cm-grid-column-header")) {
                if (
                  jCell.find(".cm-grid-floated").length > 0 ||
                  jCell.html().trim() === ""
                ) {
                  totalWidth += jCell.outerWidth();
                }
                hasFloatedColumnHeaders = true;
              }
            });
            if (hasFloatedColumnHeaders) {
              jRow.find(".cm-grid-cell").css("border", "0px none");
              var newWidth = totalWidth / floatedCount;
              // Calculate the maxHeight and set the new width, unhide all floated elements and remove borders from parent cell.
              jFloated.each(function () {
                var jElem = jQuery(this);
                jElem.css({
                  width: newWidth,
                  visibility: "visible",
                });
                var height = jElem.outerHeight();
                maxHeight = Math.max(maxHeight, height);
                jElem.parent(".cm-grid-cell").css("border", "0px none");
                // Add the center offset to the floated elements, horizontally and vertically, if need be.
                var jCell = jElem.parents(".cm-grid-cell").first();
                if (isCenterAligned(jCell)) {
                  jElem.css("margin-left", -(newWidth / 2));
                }
                if (isMiddleAligned(jCell)) {
                  jElem.css("margin-top", -(height / 2));
                  jElem.css("top", height / 2);
                }
              });
              // Set the row height so the floated elements fit inside.
              jRow.css("height", maxHeight);
            }
          }
        });
      }
    }

    jQuery(window).resize(function () {
      resizeFloatingHeaders();
    });
    resizeFloatingHeaders();
  };

  window.initMobileSmart = function initMobileSmart() {
    transformGridRadios();
    buildMobileSmart();
  };

  window.initGridColumnSizes = function initGridColumnSizes() {
    var $ = cmJq;

    if (!initGridColumnSizes.hasRun) {
      initGridColumnSizes.hasRun = true;

      $(document).ready(function () {
        autoSizeGridColumns();
      });
      $(window).resize(autoSizeGridColumns);
    } else {
      autoSizeGridColumns();
    }
  };

  window.autoSizeGridColumns = function autoSizeGridColumns() {
    var $ = cmJq;
    var $tables = $("table.cm-grid-response-set");
    var cellWidthSetContexts = [];

    // Reset cell widths
    $tables.each(function () {
      var $table = $(this);
      // If the headers are being floated, widths will be reset by that function instead.
      if ($table.find(".cm-grid-floated").length === 0) {
        $table.find("td.cm-grid-cell").css({
          width: "auto",
          minWidth: "auto",
          maxWidth: "auto",
        });
      }
    });

    // Calculate new cell widths
    $tables.each(function () {
      var $table = $(this);
      var subQuestionIds = $table.data("sub-question-ids");
      var modifiedColumnIndices = {};

      subQuestionIds.forEach(function (questionId) {
        var $cells = $("td.cm-grid-cell[questionid=" + questionId + "]");
        var columnsHaveAlreadyBeenModified = false;
        var cellWidthSum = 0;
        var cellWidthAverage;

        if (
          $cells.length > 1 &&
          $cells[0].parentElement === $cells[1].parentElement
        ) {
          $cells.each(function () {
            var $cell = $(this);
            var columnIndex = $cell.index();

            if (modifiedColumnIndices[columnIndex] === true) {
              columnsHaveAlreadyBeenModified = true;
            } else {
              cellWidthSum += $cell.outerWidth(true);
              modifiedColumnIndices[$cell.index()] = true;
            }

            if (columnsHaveAlreadyBeenModified) {
              return false;
            }
          });

          if (!columnsHaveAlreadyBeenModified) {
            cellWidthAverage = cellWidthSum / $cells.length;
            cellWidthSetContexts.push({
              width: cellWidthAverage,
              cells: $cells,
            });
          }
        }
      });
    });

    // Set new cell widths
    if (cellWidthSetContexts.length > 0) {
      cellWidthSetContexts.forEach(function (obj) {
        obj.cells.css({
          width: obj.width,
          minWidth: obj.width,
          maxWidth: obj.width,
        });
      });
    }
  };

  window.initSlider = function initSlider() {
    var $ = window.cmJq;

    var CONTAINER = ".cm-sliders-container";
    var SLIDER = ".cm-slider";
    var SLIDER_CONTAINER = ".cm-slider-container";
    var SLIDER_ROW = ".cm-slider-row";
    var SLIDER_VALUE = ".cm-slider-value";

    $(function () {
      $(CONTAINER).each(function () {
        var $container = $(this);
        var $slider = $container.find(SLIDER);

        var min = Number($container.data("min"));
        var max = Number($container.data("max"));
        var step = Number($container.data("step"));
        var defaultPosition = $container.data("default-position");
        var precision = parseInt($container.data("precision"));
        var prevResponses = $container.data("prev-responses");
        var questionId = $container.data("question-id");
        var reversedSlider = $container.data("reversed-slider") + "" === "true";

        var sliderOptions = {
          min: min,
          max: max,
          step: step,
          range: reversedSlider ? "min" : "max",
          slide: OnSlide,
        };

        $container.find(".cm-QDK").on("change", OnDontKnowChange);
        init();

        function init() {
          $slider.slider(sliderOptions);
          setInitialValues();
        }

        function setInitialValues() {
          $slider.each(function () {
            var $thisSlider = $(this);

            var value = (max - min) / 2 + min;
            if (defaultPosition === "start") {
              value = min;
            } else if (defaultPosition === "end") {
              value = max;
            }

            if (reversedSlider) {
              value = max - (value - min);
            }
            moveSlider($thisSlider, value);
          });

          var $dontKnowInput;
          var slidersMapList = [];
          for (var responseId in prevResponses) {
            if (prevResponses.hasOwnProperty(responseId)) {
              var inputId = questionId + "_" + responseId;
              var $input = $("#" + inputId);
              if ($input.length === 1) {
                if ($input.hasClass("cm-QDK")) {
                  // dont know selected
                  $dontKnowInput = $input;
                } else {
                  var prevResponseValue = prevResponses[responseId];
                  if (typeof prevResponseValue === "string") {
                    prevResponseValue = Number(prevResponseValue);
                  }
                  slidersMapList.push({
                    $input: $input.siblings(SLIDER),
                    value: prevResponseValue,
                  });
                }
              }
            }
          }

          if ($dontKnowInput !== void 0) {
            $dontKnowInput.prop("checked", true).trigger("change");
          } else {
            $.each(slidersMapList, function (i, map) {
              if (map.value !== undefined) {
                var $thisSlider = map.$input;

                var previousValue = map.value;
                if (reversedSlider) {
                  previousValue = min + (max - previousValue);
                }

                setSliderValue($thisSlider, previousValue);
              }
            });
          }
        }

        function getPercentageFromValue(value) {
          return ((value - min) / (max - min)) * 100;
        }

        function moveSlider($slider, value) {
          var percentage = getPercentageFromValue(value);

          $slider.find(".ui-slider-range").css("width", 100 - percentage + "%");
          $slider
            .find(".ui-slider-handle")
            .css(
              "left",
              (reversedSlider ? 100 - percentage : percentage) + "%"
            );
        }

        function setSliderValue($slider, value) {
          value = transformSliderValue(value);

          clearSliderErrors($slider);
          $slider.slider("value", value);
          moveSlider($slider, value);
          setSliderValueLabel($slider, value);
          setSliderFormValue($slider, value);
        }

        function OnSlide(event, ui) {
          event.preventDefault();

          setSliderValue($(event.target), ui.value);

          $container.find(".cm-error").removeClass("cm-error");
        }

        function setSliderValueLabel($thisSlider, value) {
          var $thisSliderContainer = $thisSlider.closest(SLIDER_CONTAINER);
          var $thisSliderValueLabel = $thisSliderContainer.find(SLIDER_VALUE);
          if (value !== null) {
            var dataValue = $thisSliderValueLabel.data("slider-value-label");
            if (typeof dataValue === "string") {
              dataValue = dataValue.replace(/{{value}}/g, value);
            }
            $thisSliderValueLabel.html(dataValue);
          } else {
            $thisSliderValueLabel.html("&nbsp;");
          }
        }

        function setSliderFormValue($thisSlider, value) {
          var $input = getSliderInput($thisSlider);
          $input.val(value);
        }

        function getSliderInput($thisSlider) {
          var $thisSliderContainer = $thisSlider.closest(SLIDER_CONTAINER);
          var $thisSliderValue = $thisSliderContainer.find(SLIDER_VALUE);
          var inputId = $thisSliderValue.data("input-id");
          var $input = $("#" + inputId);
          return $input;
        }

        function clearSliderErrors($thisSlider) {
          var $thisSliderRow = $thisSlider.closest(SLIDER_ROW);
          $thisSliderRow.find(".cm-error").removeClass("cm-error");
          $thisSliderRow.find(".cm-responseError").remove();

          var $thisQuestion = $thisSliderRow.closest(".cm-question");
          var $sliderErrors = $thisQuestion.find(".cm-responseError");
          if (!$sliderErrors.length) {
            $thisQuestion.find(".cm-error-msg").html("");
          }
        }

        function transformSliderValue(value) {
          if (reversedSlider) {
            value = max - (value - min);
          }

          return value.toFixed(precision);
        }

        function OnDontKnowChange() {
          var $this = $(this);
          var checked = $this.prop("checked");

          $slider.each(function () {
            var $thisSlider = $(this);

            if (checked) {
              $thisSlider.slider("disable");
              clearSliderErrors($thisSlider);
            } else {
              $thisSlider.slider("enable");
              setSliderFormValue($thisSlider, $thisSlider.slider("value"));
            }
          });
        }
      });
    });
  };

  window.initDragDropBucket = function initDragDropBucket() {
    // jQuery
    var $ = window.cmJq;

    // Selectors
    var CONTAINER = ".cm-dd-container";
    var DONTKNOW_INPUT = ":checkbox.cm-QDK";
    var BUCKET_SECTION = ".cm-dd-bucket-section";
    var DRAG_ITEM_LIST = ".cm-dd-drag-item-list";
    var DRAG_ITEM = ".cm-dd-drag-item";
    var DRAG_ITEM_CONTENT = ".cm-dd-drag-item-content";
    var DRAG_ITEM_CONTENT_WRAPPER = ".cm-dd-drag-item-content__wrapper";
    var DRAG_ITEM_ERROR = ".cm-dd-drag-item-error";
    var DRAG_ITEM_ERROR_TEXT = ".cm-dd-drag-item-error__text";
    var DRAG_ITEM_ERROR_ICON = ".cm-dd-drag-item-error__icon";
    var BUCKET_GROUP_LIST = ".cm-dd-bucket-group-list";
    var BUCKET_GROUP = ".cm-dd-bucket-group";
    var BUCKET_GROUP_HEADER = ".cm-dd-bucket-group__header";
    var BUCKET_GROUP_HEADER_CONTENT = ".cm-dd-bucket-group__header-content";
    var BUCKET_LIST = ".cm-dd-bucket-list";
    var BUCKET = ".cm-dd-bucket";
    var BUCKET_ERROR = ".cm-dd-bucket-error";
    var BUCKET_ERROR_TEXT = ".cm-dd-bucket-error__text";
    var BUCKET_ERROR_ICON = ".cm-dd-bucket-error__icon";
    var DEFAULT_BUCKET = ".cm-dd-bucket[data-is-default='true']";
    var BUCKET_HEADER = ".cm-dd-bucket__header";
    var BUCKET_HEADER_CONTENT = ".cm-dd-bucket__header-content";
    var BUCKET_DRAG_ITEM_LIST_CONTAINER =
      ".cm-dd-bucket__drag-item-list-container";
    var BUCKET_DRAG_ITEM_LIST = ".cm-dd-bucket__drag-item-list";

    // Setting constants
    var DROP_HOVER_CLASS = "cm-dd-bucket-hover";
    var DRAGGING_APPEND_TO = "body";
    var DRAGGING_Z_INDEX = 9999;
    var ORIGIN_DROP_TOLERANCE = "touch";
    var DROP_TOLERANCE = "intersect";

    $(function () {
      $(CONTAINER).each(function () {
        init($(this));
      });
    });

    function init($container) {
      // Elements
      var $dontKnowInput = $container.find(DONTKNOW_INPUT);
      var $bucketSection = $container.find(BUCKET_SECTION);
      var $dragItemList = $container.find(DRAG_ITEM_LIST);
      var $dragItem = $container.find(DRAG_ITEM);
      var $dragItemContent = $container.find(DRAG_ITEM_CONTENT);
      var $dragItemContentWrapper = $container.find(DRAG_ITEM_CONTENT_WRAPPER);
      var $bucketGroupList = $container.find(BUCKET_GROUP_LIST);
      var $bucketGroup = $container.find(BUCKET_GROUP);
      var $bucketGroupHeader = $container.find(BUCKET_GROUP_HEADER);
      var $bucketGroupHeaderContent = $container.find(
        BUCKET_GROUP_HEADER_CONTENT
      );
      var $bucketList = $container.find(BUCKET_LIST);
      var $bucket = $container.find(BUCKET);
      var $bucketHeader = $container.find(BUCKET_HEADER);
      var $bucketHeaderContent = $container.find(BUCKET_HEADER_CONTENT);
      var $bucketDragItemListContainer = $container.find(
        BUCKET_DRAG_ITEM_LIST_CONTAINER
      );
      var $bucketDragItemList = $container.find(BUCKET_DRAG_ITEM_LIST);

      // Settings
      var settings = $container.data("settings");
      var prevResponses = $container.data("prev-responses");
      var questionId = $container.data("question-id");
      var showGroups = $container.data("show-groups");
      var bucketFullMessage = $container.data("bucket-full-message");
      var fillOrderErrorMessage = $container.data("fill-order-error-message");

      var originPileResponsiveLayout = new ResponsiveLayout($dragItemList, {
        orientation: settings.dragSectionLayout.orientation,
        itemWidth: settings.dragSectionLayout.dragItemWidth,
        itemHeight: settings.dragSectionLayout.dragItemHeight,
        horizontalSpacing: settings.dragSectionLayout.dragItemHorizontalSpacing,
        verticalSpacing: settings.dragSectionLayout.dragItemVerticalSpacing,
        offset: settings.dragSectionLayout.dragItemOffset,
        columnSpacing: settings.dragSectionLayout.dragItemColumnSpacing,
      });

      // Drag/Drop configuration
      $dragItem.draggable({
        helper: DragHelper,
        stop: OnDragStop,
        appendTo: DRAGGING_APPEND_TO,
        zIndex: DRAGGING_Z_INDEX,
      });

      $dragItemList.droppable({
        accept: DRAG_ITEM + "[data-question-id=" + questionId + "]",
        tolerance: ORIGIN_DROP_TOLERANCE,
        hoverClass: DROP_HOVER_CLASS,
        drop: OnOriginDrop,
      });

      $bucketDragItemList.droppable({
        accept: DRAG_ITEM + "[data-question-id=" + questionId + "]",
        tolerance: DROP_TOLERANCE,
        hoverClass: DROP_HOVER_CLASS,
        drop: OnDrop,
      });

      $dontKnowInput.on("change", OnDontKnowChange);

      render();
      checkDefaultBucket();
      setPrevResponses();
      updateFormValues();

      $(window).resize(render);

      $container.find("img").each(function () {
        $(this).load(render);
      });

      function render() {
        if ($(CONTAINER).length > 0) {
          var prevScrollPos = {
            x: window.scrollX,
            y: window.scrollY,
          };

          renderOriginPile();
          renderBuckets();
          applyBucketDragItemSpacing();

          window.scrollTo(prevScrollPos.x, prevScrollPos.y);
        }
      }

      function renderOriginPile() {
        $dragItemContentWrapper.attr("style", "");
        $bucket.find(DRAG_ITEM).each(function () {
          var $this = $(this);
          var $clone = $this.clone();

          $clone.css("visibility", "hidden");
          $this.data("clone", $clone);
          var $placeholder = $container.find(
            "#placeholder-" + $this.data("name")
          );
          $placeholder.after($clone);
        });

        originPileResponsiveLayout.render();
        $dragItemList.css(
          "min-height",
          originPileResponsiveLayout.itemHeight + "px"
        );

        var fontSize = adjustSameFontSize($dragItemContentWrapper);
        $dragItem.each(function () {
          var $this = $(this);
          $this.css("width", originPileResponsiveLayout.itemWidth + "px");
          $this.css("height", originPileResponsiveLayout.itemHeight + "px");
          $this.find(DRAG_ITEM_CONTENT).css({
            height: originPileResponsiveLayout.itemHeight + "px",
            lineHeight: originPileResponsiveLayout.itemHeight + "px",
          });
          $this.css("font-size", fontSize + "px");
        });

        $bucket.find(DRAG_ITEM).each(function () {
          var $this = $(this);
          $this.data("clone").remove();
        });
      }

      function renderBuckets() {
        if (settings.bucketSectionLayout.orientation === "horizontal") {
          renderHorizontalBuckets();
        } else if (settings.bucketSectionLayout.orientation === "vertical") {
          renderVerticalBuckets();
        }
      }

      function renderHorizontalBuckets() {
        // Calculate bucket width/height
        var dragItemWidth = $dragItem.outerWidth();
        var dragItemHeight = $dragItemContent.outerHeight();
        var verticalSpacing = calculateSizeFromOptions(
          settings.bucketSectionLayout.dragItemVerticalSpacing,
          dragItemHeight
        );
        var maxNumDragItems =
          typeof settings.bucketDragItemMax === "number" &&
          settings.bucketDragItemMax > 0
            ? settings.bucketDragItemMax
            : $dragItem.length;
        var bucketDragItemListHeight =
          (dragItemHeight + verticalSpacing) * (maxNumDragItems - 1) +
          dragItemHeight;

        var bucketWidth = dragItemWidth + 2;

        $bucket.width(bucketWidth);
        $bucketDragItemListContainer.height(bucketDragItemListHeight);

        // calculate bucket/group header heights
        $bucketGroup.attr("style", "");
        $bucketGroupHeader.attr("style", "");
        $bucketHeader.attr("style", "");

        var maxGroupHeaderHeight = 0;
        $bucketGroupHeader.each(function () {
          var height = $(this).outerHeight();
          maxGroupHeaderHeight = Math.max(maxGroupHeaderHeight, height);
        });

        var maxBucketHeaderHeight = 0;
        $bucketHeader.each(function () {
          var height = $(this).outerHeight();
          maxBucketHeaderHeight = Math.max(maxBucketHeaderHeight, height);
        });

        $bucketGroupHeader.css("height", maxGroupHeaderHeight + "px");
        $bucketHeader.css("height", maxBucketHeaderHeight + "px");

        $bucketGroup.each(function () {
          var $this = $(this);
          var $thisBuckets = $this.find(BUCKET);

          // reduce any extra width space around buckets
          var currLeft = null;
          var totalWidth = 0;
          $.each($thisBuckets, function () {
            var $this = $(this);
            var left = $this.position().left;
            var width = $this.outerWidth(true);

            if (currLeft === null || left > currLeft) {
              currLeft = left;
              totalWidth += width;
            } else {
              return false;
            }
          });

          $this.width(totalWidth);

          // set some CSS classes to denote beginning and end of bucket rows
          var groupRect = $this[0].getBoundingClientRect();
          $thisBuckets.each(function () {
            var $this = $(this);

            var rect = $this[0].getBoundingClientRect();
            if (rect.left === groupRect.left) {
              $this.addClass("row-start");
            } else {
              $this.removeClass("row-start");
            }

            if (rect.right === groupRect.right || $this.next().length === 0) {
              $this.addClass("row-end");
            } else {
              $this.removeClass("row-end");
            }
          });
        });

        adjustSameFontSize($bucketGroupHeaderContent);
        adjustSameFontSize($bucketHeaderContent);
      }

      function renderVerticalBuckets() {
        $.each(
          [
            $bucketDragItemListContainer,
            $bucketHeader,
            $bucketHeaderContent,
            $bucketGroupHeader,
            $bucketGroupHeaderContent,
            $bucket,
            $bucketGroup,
            $bucketSection,
          ],
          function (i, $selector) {
            $selector.attr("style", "");
          }
        );
        var maxNumDragItems =
          typeof settings.bucketDragItemMax === "number" &&
          settings.bucketDragItemMax > 0
            ? settings.bucketDragItemMax
            : $dragItem.length;

        var bucketSectionWidth = $bucketSection.outerWidth();
        if (showGroups) {
          var bucketGroupHeaderWidth = calculateSizeFromOptions(
            settings.bucketSectionLayout.bucketGroupHeaderWidth,
            bucketSectionWidth
          );
        }
        var bucketHeaderWidth = calculateSizeFromOptions(
          settings.bucketSectionLayout.bucketHeaderWidth,
          bucketSectionWidth
        );

        // Calculate dimensions of bucket drag item lists from bucket drag item spacing options
        var dragItemWidth = $dragItem.outerWidth();
        var dragItemHeight = $dragItemContent.outerHeight();

        var horizontalSpacing = calculateSizeFromOptions(
          settings.bucketSectionLayout.dragItemHorizontalSpacing,
          dragItemWidth
        );
        var verticalSpacing = calculateSizeFromOptions(
          settings.bucketSectionLayout.dragItemVerticalSpacing,
          dragItemHeight
        );

        var maxBucketDragItemListWidth =
          bucketSectionWidth -
          bucketHeaderWidth -
          (showGroups ? bucketGroupHeaderWidth : 0);
        var numDragItemsPerRow = 1;
        var bucketDragItemListWidth = dragItemWidth + 2;
        while (
          numDragItemsPerRow < maxNumDragItems &&
          bucketDragItemListWidth + dragItemWidth + horizontalSpacing <
            maxBucketDragItemListWidth
        ) {
          bucketDragItemListWidth += dragItemWidth + horizontalSpacing;
          numDragItemsPerRow++;
        }

        var numDragItemRows = Math.ceil(maxNumDragItems / numDragItemsPerRow);
        var bucketDragItemListHeight =
          (dragItemHeight + verticalSpacing) * (numDragItemRows - 1) +
          dragItemHeight +
          2;

        $bucketHeader.css("width", bucketHeaderWidth + "px");
        $bucketDragItemListContainer.css(
          "width",
          bucketDragItemListWidth + "px"
        );
        $bucket.css("height", bucketDragItemListHeight + "px");
        $bucketHeader.css({
          height: bucketDragItemListHeight + "px",
          "line-height": bucketDragItemListHeight + "px",
        });
        if (showGroups) {
          $bucketGroupHeader.css("width", bucketGroupHeaderWidth + "px");
          $bucketGroupList.css(
            "width",
            bucketGroupHeaderWidth +
              bucketHeaderWidth +
              bucketDragItemListWidth +
              "px"
          );
        } else {
          $bucketList.css(
            "width",
            bucketHeaderWidth + bucketDragItemListWidth + "px"
          );
        }

        if (showGroups) {
          $bucketGroup.each(function () {
            var $this = $(this);
            var height = $this.find(BUCKET).length * bucketDragItemListHeight;
            $this.css("height", height + "px");
            $this.find(BUCKET_GROUP_HEADER).css("height", height + "px");
            $this.find(BUCKET_GROUP_HEADER).css("line-height", height + "px");
          });
        }

        adjustSameFontSize($bucketGroupHeaderContent);
        adjustSameFontSize($bucketHeaderContent);
      }

      function applyBucketDragItemSpacing() {
        var dragItemWidth = $dragItem.outerWidth();
        var dragItemHeight = $dragItemContent.outerHeight();
        var horizontalSpacing = calculateSizeFromOptions(
          settings.bucketSectionLayout.dragItemHorizontalSpacing,
          dragItemWidth
        );
        var verticalSpacing = calculateSizeFromOptions(
          settings.bucketSectionLayout.dragItemVerticalSpacing,
          dragItemHeight
        );
        var orientation = settings.bucketSectionLayout.orientation;

        $bucketDragItemListContainer.each(function () {
          var $this = $(this);
          var $dragItems = $this.find(DRAG_ITEM);

          if (orientation === "vertical") {
            $bucketDragItemList.css({
              paddingRight: -1 * horizontalSpacing + "px",
            });
          }

          $dragItems.each(function (i) {
            $(this).css({
              marginTop: verticalSpacing + "px",
              marginLeft:
                orientation === "vertical" ? horizontalSpacing + "px" : "",
              top: -1 * verticalSpacing + "px",
              left:
                orientation === "vertical" ? -1 * horizontalSpacing + "px" : 0,
            });
          });
        });
      }

      function checkDefaultBucket() {
        var $defaultBucket = $container.find(DEFAULT_BUCKET);
        if ($defaultBucket.length) {
          var $list = $defaultBucket.find(BUCKET_DRAG_ITEM_LIST);
          $dragItem.each(function () {
            var $currBucket = $(this);
            $list.append($currBucket);
          });
          applyBucketDragItemSpacing();
        }
      }

      function setPrevResponses() {
        // try setting dont know
        if (prevResponses[questionId]) {
          var responseId = Object.keys(prevResponses[questionId])[0];
          if (responseId && prevResponses[questionId][responseId] === 1) {
            $("#" + questionId + "_" + responseId).prop("checked", true);
          }
        } else {
          var dragItemIds = Object.keys(prevResponses);
          for (var i = 0, len = dragItemIds.length; i < len; i++) {
            var dragItemId = dragItemIds[i];
            var $currDragItem = $("#drag-item-" + dragItemId);
            var bucketId = prevResponses[dragItemId];
            var $currBucketDragItemList = $(
              "#bucket-" + bucketId + " " + BUCKET_DRAG_ITEM_LIST
            );
            $currBucketDragItemList.append($currDragItem);
          }
          applyBucketDragItemSpacing();
        }
      }

      function clearErrors() {
        $container.find(DRAG_ITEM_ERROR).each(function () {
          $(this).removeClass(DRAG_ITEM_ERROR.replace(".", ""));
          $(this).find(DRAG_ITEM_ERROR_ICON).remove();
          $(this).find(DRAG_ITEM_ERROR_TEXT).remove();
        });

        $container.find(BUCKET_ERROR).each(function () {
          $(this).removeClass(BUCKET_ERROR.replace(".", ""));
          $(this).find(BUCKET_ERROR_ICON).remove();
          $(this).find(BUCKET_ERROR_TEXT).remove();
        });
      }

      function DragHelper(e) {
        var $draggable = $(e.currentTarget);

        var $clone = $draggable.clone();
        $draggable.css({
          visibility: "hidden",
        });

        return $clone;
      }

      function OnDragStop(e, ui) {
        $(ui.helper.context).css("visibility", "visible");
      }

      function OnOriginDrop(event, ui) {
        addItemToOriginPile(ui.draggable);
        updateFormValues();
        validateFillOrder();
      }

      function addItemToOriginPile($item) {
        var $placeholder = $container.find(
          "#placeholder-" + $item.data("name")
        );
        $placeholder.after($item);
        originPileResponsiveLayout.render();
      }

      function OnDrop(event, ui) {
        var $currBucket = $(this).closest(BUCKET);
        var $currDragItem = ui.draggable;

        var $currBucketDragItemList = $currBucket.find(BUCKET_DRAG_ITEM_LIST);
        var $currBucketDragItems = $currBucketDragItemList
          .find(DRAG_ITEM)
          .not($currDragItem);
        var bucketDragItemMax = $currBucket.data("max");

        var isOverMax =
          typeof bucketDragItemMax === "number"
            ? $currBucketDragItems.length + 1 > bucketDragItemMax
            : false;
        if (isOverMax) {
          if (settings.bucketOverflowError) {
            addItemToOriginPile($currDragItem);
            var id = $currBucket.data("value");
            addDDError("bucket", id, bucketFullMessage);
          } else {
            addItemToOriginPile(
              $currBucketDragItemList.find(DRAG_ITEM).first()
            );
            $currBucketDragItemList.append($currDragItem);
            applyBucketDragItemSpacing();
          }
        } else {
          $currBucketDragItemList.append($currDragItem);
          applyBucketDragItemSpacing();
          originPileResponsiveLayout.render();
        }

        $dontKnowInput.each(function () {
          $(this).prop("checked", false);
        });

        updateFormValues();
        validateFillOrder();
      }

      function validateFillOrder() {
        if (typeof settings.enforceBucketFillOrder === "string") {
          var split = settings.enforceBucketFillOrder.split("-");
          var from = split[0];
          var to = split[1];

          var $orderedBuckets;
          if (from === "start" && to === "end") {
            $orderedBuckets = $container.find(BUCKET).reverse();
          } else if (from === "end" && to === "start") {
            $orderedBuckets = $container.find(BUCKET);
          }

          if ($orderedBuckets !== void 0) {
            var found = false;
            $orderedBuckets.each(function () {
              var $thisBucket = $(this);
              var $thisBucketItems = $thisBucket.find(DRAG_ITEM);

              if ($thisBucketItems.length > 0) {
                found = true;
              } else if (found) {
                var id = $thisBucket.data("value");
                addDDError("bucket", id, fillOrderErrorMessage);
              }
            });
          }
        }
      }

      function OnDontKnowChange() {
        var $this = $(this);
        if ($this.is(":checked")) {
          $bucket.each(function () {
            $bucket.find(DRAG_ITEM).each(function () {
              addItemToOriginPile($(this).detach());
            });
          });
          applyBucketDragItemSpacing();

          updateFormValues();
        }
      }

      function updateFormValues() {
        clearErrors();

        $dragItemList.find(DRAG_ITEM).each(function () {
          var $currDragItem = $(this);
          var name = $currDragItem.data("name");
          var $input = $container.find("[name='" + name + "']");
          $input.val("");
        });

        $bucket.find(DRAG_ITEM).each(function () {
          var $currDragItem = $(this);
          var name = $currDragItem.data("name");
          var $input = $container.find("[name='" + name + "']");
          var $currBucket = $currDragItem.closest(BUCKET);
          var value = $currBucket.data("value");
          $input.val(value);
        });
      }
    }
  };

  /**
   * @param $container
   * @param options
   * @constructor
   */
  window.ResponsiveLayout = function ResponsiveLayout($container, options) {
    var $ = cmJq;
    var self = this;

    options || (options = {});

    var itemWidthOptions = options.itemWidth || {};
    var itemHeightOptions = options.itemHeight || {};
    var horizontalSpacingOptions = options.horizontalSpacing || {};
    var verticalSpacingOptions = options.verticalSpacing || {};
    var offsetOptions = options.offset || {};
    var columnSpacingOptions = options.columnSpacing || {};

    self.itemWidth = null;
    self.itemHeight = null;
    self.fontSize = null;
    self.render = render;

    $container.find("img").each(function () {
      $(this).load(render);
    });

    function render() {
      var $wrapper1 = $container.find(".responsive-layout-wrapper-1");
      var $wrapper2 = $container.find(".responsive-layout-wrapper-2");
      var $columns = $container.find(".responsive-layout-column");
      var $itemContainers = $container.find(
        ".responsive-layout-item-container"
      );
      var $items = $container.find(".responsive-layout-item");
      var direction = $("body").prop("dir");

      $wrapper1.attr("style", "");
      $wrapper2.attr("style", "");
      $columns.attr("style", "");
      $itemContainers.attr("style", "");
      $items.attr("style", "");

      // set container dimensions
      var wrapper1Rect = $wrapper1[0].getBoundingClientRect();
      var wrapper1Width = wrapper1Rect.width;
      if (typeof wrapper1Width !== "number") {
        wrapper1Width = wrapper1Rect.right - wrapper1Rect.left;
      }

      // calculate item width
      var itemWidth = calculateSizeFromOptions(itemWidthOptions, wrapper1Width);
      $itemContainers.css("width", itemWidth + "px");
      if (options.orientation === "vertical") {
        $columns.css("width", itemWidth + "px");
      }

      // Calculate item height
      var itemHeight = calculateSizeFromOptions(
        itemHeightOptions,
        wrapper1Width
      );
      $itemContainers.css("height", itemHeight + "px");
      $items.css({
        height: itemHeight + "px",
        "line-height": itemHeight + "px",
      });

      // Calculate spacing
      var horizontalSpacing = calculateSizeFromOptions(
        horizontalSpacingOptions,
        itemWidth
      );
      var verticalSpacing = calculateSizeFromOptions(
        verticalSpacingOptions,
        itemHeight
      );

      // set offset
      var orientation = options.orientation;
      var offset = 0;
      if (orientation === "horizontal") {
        offset = calculateSizeFromOptions(offsetOptions, itemHeight);
      } else if (orientation === "vertical") {
        offset = calculateSizeFromOptions(offsetOptions, itemWidth);
      }

      $wrapper1.css({
        maxWidth: "calc(100% - " + horizontalSpacing * -1 + "px)",
        maxHeight: "calc(100% - " + verticalSpacing * -1 + "px)",
      });

      $wrapper2.css("marginTop", verticalSpacing * -1 + "px");
      $wrapper2.css(
        direction === "rtl" ? "marginRight" : "marginLeft",
        horizontalSpacing * -1 + "px"
      );

      if (orientation === "horizontal") {
        $itemContainers.each(function () {
          var $this = $(this);
          $this.css("marginTop", verticalSpacing + "px");
          $this.css(
            direction === "rtl" ? "marginRight" : "marginLeft",
            horizontalSpacing + "px"
          );
        });

        var currLeft = null;
        var currColumn = 0;
        $itemContainers.each(function (i) {
          var $this = $(this);
          var position = $this.position();

          if (currLeft === null || position.left < currLeft) {
            currColumn = 0;
          } else {
            currColumn++;
          }

          currLeft = position.left;

          var even = currColumn % 2 === 0;
          if (
            (even && offsetOptions.type === "even") ||
            (!even && offsetOptions.type === "odd")
          ) {
            $this.css("margin-top", verticalSpacing + offset + "px");
          }
        });
      } else if (orientation === "vertical") {
        $itemContainers.each(function () {
          $(this).css({
            marginTop: verticalSpacing + "px",
          });
        });

        $columns.each(function () {
          $(this).css(
            direction === "rtl" ? "marginRight" : "marginLeft",
            horizontalSpacing + "px"
          );
        });

        var columnRect = $columns[0].getBoundingClientRect();
        var columnHeight = columnRect.height;
        if (typeof columnHeight !== "number") {
          columnHeight = columnRect.right - columnRect.left;
        }
        var columnSpacing = calculateSizeFromOptions(
          columnSpacingOptions,
          columnHeight
        );

        $columns.each(function () {
          var $this = $(this);
          var position = $this.position();
          var marginTop = 0;

          if (position.top > 0) {
            marginTop +=
              columnSpacing +
              (verticalSpacing < 0 ? Math.abs(verticalSpacing) : 0);
          }

          if (marginTop !== 0) {
            $this.css("margin-top", marginTop);
          }

          $(this)
            .find(".responsive-layout-item-container")
            .each(function (i) {
              var even = i % 2 === 0;
              if (
                (even && offsetOptions.type === "even") ||
                (!even && offsetOptions.type === "odd")
              ) {
                $(this).css(
                  direction === "rtl" ? "marginRight" : "marginLeft",
                  offset + "px"
                );
              }
            });
        });
      }

      // adjust wrapper1 width
      var minItemLeft = null;
      var maxItemRight = null;
      $itemContainers.each(function () {
        var rect = $(this)[0].getBoundingClientRect();
        minItemLeft =
          minItemLeft === null ? rect.left : Math.min(rect.left, minItemLeft);
        maxItemRight =
          maxItemRight === null
            ? rect.right
            : Math.max(rect.right, maxItemRight);
      });

      $wrapper1.css({
        width: maxItemRight - minItemLeft + horizontalSpacing + 2 + "px",
        position: "relative",
      });
      $wrapper1.css(
        direction === "rtl" ? "right" : "left",
        horizontalSpacing / 2 + "px"
      );

      self.itemWidth = itemWidth;
      self.itemHeight = itemHeight;
    }
  };

  window.calculateSizeFromOptions = function calculateSizeFromOptions(
    options,
    relativeSize
  ) {
    var size = options.value;

    if (options.unit === "%") {
      size = size * 0.01 * relativeSize;

      if (!isEmptyValue(options.min)) {
        size = Math.max(options.min, size);
      }

      if (!isEmptyValue(options.max)) {
        size = Math.min(options.max, size);
      }
    }

    return size;
  };

  window.adjustSameFontSize = function adjustSameFontSize($selector, options) {
    var $ = cmJq;

    options || (options = {});

    var fontSize = null;
    var minFontSize = "min" in options ? options.min : 8;
    var step = "step" in options ? options.step : 0.1;

    $selector.each(function () {
      var $this = $(this);
      var $parent = $this.parent();
      var parentWidth = $parent.outerWidth();
      var parentHeight = $parent.outerHeight();
      var thisFontSize = parseFloat($this.css("font-size"));

      while (
        ($this.outerWidth() > parentWidth ||
          $this.outerHeight() > parentHeight) &&
        thisFontSize - step >= minFontSize
      ) {
        thisFontSize -= step;
        $this.css("font-size", thisFontSize + "px");
      }

      if (fontSize === null || thisFontSize < fontSize) {
        fontSize = thisFontSize;
      }
    });

    $selector.css({
      fontSize: fontSize + "px",
    });

    return fontSize;
  };

  window.initHighlightText = function initHighlightText() {
    var $ = window.cmJq;

    var CONTAINER = ".cm-highlight-text-container";

    $(document).ready(function () {
      if (!rangy.initialized) {
        rangy.init();
      }

      $(CONTAINER).each(function () {
        init($(this));
      });
    });

    function init($container) {
      var rangesEnabled = $container.data("ranges-enabled");
      if (!rangesEnabled) {
        return;
      }

      var questionId = $container.attr("data-question");
      var states = $container.data("states");
      var maxState = states.length;

      var dontKnows = $container.find(":checkbox.cm-RSDK");
      var gridDontKnows = $container
        .closest(".cm-question")
        .parent()
        .closest(".cm-question")
        .find(".cm-grid-dontknow :checkbox");
      $.merge(dontKnows, gridDontKnows);
      var inputs = $container.find("input[type=hidden]");

      var ranges = $container.data("ranges");
      var rangyRanges = [];

      var highlightStateClassAppliers = [];

      var prevResponses = $container.data("prev-responses");

      for (var i = 0; i < maxState; ++i) {
        highlightStateClassAppliers[i] = rangy.createClassApplier(
          "cm-highlight-question" + questionId + "-state" + i
        );
      }

      surveyCover.on();

      var highlightClassApplierOptions = {
        useExistingElements: false,
        elementAttributes: {},
        onElementCreate: function (element, applier) {
          $(element).click(function (event) {
            event.preventDefault();

            var rangeIndex = parseInt($(this).attr("data-range"), 10);
            var response = rangyRanges[rangeIndex].responseId;
            var state = rangyRanges[rangeIndex].state;
            var range = rangyRanges[rangeIndex].range;

            try {
              highlightStateClassAppliers[state].undoToRange(range);
            } catch (e) {
              // Ignore the error rangy-range sometimes throws.
            }
            state = (state + 1) % maxState;
            highlightStateClassAppliers[state].applyToRange(range);
            rangyRanges[rangeIndex].state = state;

            inputs
              .filter('[name="' + questionId + "[" + response + ']"]')
              .attr("value", states[state]);

            dontKnows.each(function () {
              $(this).prop("checked", false);
            });
            $container.trigger("cm-highlight-text-click", {
              response: response,
              state: state,
            });
          });
        },
      };

      if (ranges.length === 0) {
        surveyCover.off();
      }

      ranges.forEach(function (range, r) {
        var rangyRange = rangy.createRangyRange();

        setupTimeout(range, rangyRange, r);

        rangyRanges.push({
          responseId: range["id"],
          state: 0,
          range: rangyRange,
        });
      });

      var rangyRangesByResponseId = {};
      rangyRanges.forEach(function (rangyRange) {
        rangyRangesByResponseId[rangyRange.responseId] = rangyRange;
      });

      var stateIndexesByValue = {};
      states.forEach(function (state, i) {
        stateIndexesByValue[state] = i;
      });
      $container.trigger("cm-highlight-text-init");

      function setupPreviousResponses() {
        for (var p in prevResponses) {
          if (prevResponses.hasOwnProperty(p)) {
            inputs
              .filter('[name="' + questionId + "[" + p + ']"]')
              .attr("value", prevResponses[p]);

            var rr = rangyRangesByResponseId[p];
            if (rr !== undefined) {
              try {
                highlightStateClassAppliers[0].undoToRange(rr.range);
              } catch (e) {
                // Ignore the error rangy-range sometimes throws.
              }
              highlightStateClassAppliers[
                stateIndexesByValue[prevResponses[p]]
              ].applyToRange(rr.range);
              rr.state = stateIndexesByValue[prevResponses[p]];
            }
          }
        }
      }

      function setupTimeout(range, rangyRange, r) {
        setTimeout(function () {
          highlightClassApplierOptions.elementAttributes["data-response"] =
            range["id"];
          highlightClassApplierOptions.elementAttributes["data-range"] = r;
          var highlightClassApplier = rangy.createClassApplier(
            "cm-highlight-response",
            highlightClassApplierOptions
          );

          rangyRange.selectCharacters(
            $container.find(".cm-highlight-text")[0],
            range["start"],
            range["end"]
          );
          highlightClassApplier.applyToRange(rangyRange);
          $(".cm-highlight-response[data-response=" + range["id"] + "]")
            .first()
            .addClass("first")
            .addBack()
            .last()
            .addClass("last");

          if (r === ranges.length - 1) {
            setupPreviousResponses();
            surveyCover.off();
          }
        }, 0);
      }

      dontKnows.change(function (event) {
        if ($(this).is(":checked")) {
          // Reset all highlights to start state
          for (var r in rangyRanges) {
            if (rangyRanges.hasOwnProperty(r)) {
              try {
                highlightStateClassAppliers[rangyRanges[r].state].undoToRange(
                  rangyRanges[r].range
                );
              } catch (e) {
                // Ignore the error rangy-range sometimes throws.
              }
              rangyRanges[r].state = 0;
              inputs
                .filter(
                  '[name="' +
                    questionId +
                    "[" +
                    rangyRanges[r].responseId +
                    ']"]'
                )
                .attr("value", "");
            }
          }

          dontKnows.not($(this)).prop("checked", false);
        }
        $container.trigger("cm-highlight-text-dk", {
          response: $(this).attr("data-id"),
          state: $(this).is(":checked"),
        });
      });

      $("#cm-View").click(function (event) {
        var state = 0;
        if ($("body").hasClass("cm-Codebook")) {
          state = 1;
        }

        rangyRanges.forEach(function (rangyRange) {
          var oldState = rangyRange.state;
          var range = rangyRange.range;

          try {
            highlightStateClassAppliers[oldState].undoToRange(range);
          } catch (e) {
            // Ignore the error rangy-range sometimes throws.
          }
          highlightStateClassAppliers[state].applyToRange(range);
          rangyRange.state = state;
        });
      });
    }
  };

  window.initHighlightImage = function initHighlightImage() {
    var $ = window.cmJq;

    var CONTAINER = ".cm-highlight-image-container";

    $(document).ready(function () {
      $(CONTAINER).each(function () {
        init($(this));
      });
    });

    function init($container) {
      var inCodebookMode = $("body").hasClass("cm-Codebook");
      var questionId = $container.attr("data-question");
      var commentsEnabled = $container.data("commentsEnabled");
      var commentsDraggable = $container.data("commentsDraggable");
      var displayAll = $container.data("displayall");
      var codebookGroups = [];
      var inputs = $container.find("input[type=hidden]");
      var dontKnows = $container.find(":checkbox.cm-RSDK");
      var gridDontKnows = $container
        .closest(".cm-question")
        .parent()
        .closest(".cm-question")
        .find(".cm-grid-dontknow :checkbox");
      $.merge(dontKnows, gridDontKnows);
      var JSONPolygonList = $container.data("polygons");
      var JSONPolygons = [];
      var polygons = [];
      var highlightStates = $container.data("states") || [];
      var prevResponses = $container.data("prev-responses") || {};
      var $canvas = $container.find("canvas").first();
      var $question = $container.closest(".cm-question");

      var highlightStateIndexesByValue = {};
      highlightStates.forEach(function (state, i) {
        if (i > 0) {
          var color = fabric.Color.fromRgba(state.style.stroke);
          state.style.stroke = color.toRgb();
        }
        highlightStateIndexesByValue[state.value] = i;
      });

      var canvas = new fabric.Canvas("canvas" + questionId, {
        renderOnAddRemove: false,
        selection: false,
        moveCursor: "pointer",
      });

      var $canvasContainer = $container.find(".canvas-container").first();

      var context = canvas.getContext();
      canvas.perPixelTargetFind = typeof context.getImageData !== "undefined";

      // Using pseudo private methods to override pieces of the library which are problematic
      canvas._setCssDimension("width", "100%");
      canvas._setCssDimension("height", "auto");
      canvas.lowerCanvasEl.style["position"] = "static";

      fabric.Image.fromURL(
        $container.attr("data-background"),
        function (image) {
          if (image === null) {
            console.error(
              'Unable to load background image "' +
                $container.attr("data-background") +
                '" for question ' +
                questionId
            );
          } else {
            canvas.setBackgroundImage(image);
            canvas.setDimensions(
              {
                width: image.getWidth(),
                height: image.getHeight(),
              },
              {
                backstoreOnly: true,
              }
            );
            $container
              .find(".cm-highlight-indent")
              .css("max-width", image.getWidth());

            JSONPolygonList.forEach(function (pObj) {
              var polygon = JSON.parse(pObj.polygon);

              polygon.responseId = pObj.id;
              polygon.responseName = pObj.name;
              polygon.locked = pObj.locked;

              JSONPolygons.push(polygon);
            });

            fabric.util.enlivenObjects(JSONPolygons, function (polys) {
              polys.forEach(function (polygon) {
                // Turning off selection logic directly turns off too much event handling. Instead, lock down all
                // types of modification
                polygon.setOptions({
                  hasBorders: false,
                  hasControls: false,
                  hasRotatingPoint: false,
                  lockMovementX: true,
                  lockMovementY: true,
                  lockRotation: true,
                  lockScalingFlip: true,
                  lockScalingX: true,
                  lockScalingY: true,
                  hoverCursor: "pointer",
                  strokeWidth: 1,
                });

                var state = 0;
                if (polygon.locked) {
                  polygon.selectable = false;
                  polygon.evented = false;

                  inputs
                    .filter(
                      '[name="' + questionId + "[" + polygon.responseId + ']"]'
                    )
                    .attr("value", "");

                  polygon.setOptions({
                    fill: "rgba(100, 100, 100, 0.2)",
                    stroke: "rgb(100, 100, 100)",
                  });
                } else {
                  if (inCodebookMode) {
                    state = 1;
                  } else if (polygon.responseId in prevResponses) {
                    state =
                      highlightStateIndexesByValue[
                        prevResponses[polygon.responseId]
                      ];

                    inputs
                      .filter(
                        '[name="' +
                          questionId +
                          "[" +
                          polygon.responseId +
                          ']"]'
                      )
                      .attr("value", highlightStates[state].value);
                  }

                  polygon.setOptions(highlightStates[state].style);
                }

                if (commentsEnabled) {
                  initCommentElement(polygon);
                }
                setPolygonHighlightState(polygon, state);

                canvas.add(polygon);

                if (displayAll) {
                  var group = new fabric.Group([], {
                    visible: inCodebookMode,
                    selectable: false,
                  });

                  // Following the style of .cm-nameValue
                  // padding: 3px 4px
                  group.add(
                    new fabric.Rect({
                      top: group.getTop(),
                      left: group.getLeft(),
                      originX: "center",
                      originY: "center",
                      fill: "rgb(87, 87, 87)",
                      rx: 4,
                      ry: 4,
                    })
                  );

                  group.add(
                    new fabric.Text(polygon.responseName, {
                      top: group.getTop(),
                      left: group.getLeft(),
                      originX: "center",
                      originY: "center",
                      fill: "white",
                    })
                  );

                  // Empirically determined constants that make it look right
                  group.width = group.item(1).getWidth() + 20;
                  group.height = group.item(1).getHeight() + 10;

                  group.item(0).width = group.getWidth();
                  group.item(0).height = group.getHeight();

                  group.top = polygon.top;
                  group.left = polygon.left;

                  group.isResponseName = true;

                  canvas.add(group);
                  codebookGroups.push(group);
                }
              });

              polygons = polys;
            });

            canvas.renderAll();
            $container.data("canvas", canvas);
            $container.trigger("cm-highlight-image-init");

            canvas.on("mouse:down", function (event) {
              if (
                typeof event.target !== "undefined" &&
                !event.target.isResponseName
              ) {
                var poly = event.target;
                var state = poly.highlightState;
                state = (state + 1) % highlightStates.length;
                poly.setOptions(highlightStates[state].style);
                setPolygonHighlightState(poly, state);

                var response = poly.responseId;
                inputs
                  .filter('[name="' + questionId + "[" + response + ']"]')
                  .attr("value", highlightStates[state].value);

                dontKnows.each(function () {
                  $(this).prop("checked", false);
                });

                canvas.renderAll();
                $container.trigger("cm-highlight-image-click", {
                  response: response,
                  state: state,
                });
              }
            });

            dontKnows.change(function (event) {
              if ($(this).is(":checked")) {
                polygons.forEach(function (poly) {
                  if (!poly.locked) {
                    var response = poly.responseId;

                    // Set the polygon to the default state
                    poly.setOptions(highlightStates[0].style);
                    setPolygonHighlightState(poly, 0);

                    inputs
                      .filter('[name="' + questionId + "[" + response + ']"]')
                      .attr("value", highlightStates[0].value);
                  }
                });

                canvas.renderAll();

                dontKnows.not($(this)).prop("checked", false);
              }
              $container.trigger("cm-highlight-image-dk", {
                response: $(this).attr("data-id"),
                state: $(this).is(":checked"),
              });
            });

            $("#cm-View").click(function (event) {
              codebookGroups.forEach(function (group) {
                group.visible = !group.visible;
              });

              var state = 0;
              if ($("body").hasClass("cm-Codebook")) {
                state = 1;
              }

              polygons.forEach(function (poly) {
                if (!poly.locked) {
                  poly.setOptions(highlightStates[state].style);
                  setPolygonHighlightState(poly, state);
                }
              });

              canvas.renderAll();
            });
          }
        }
      );

      function setPolygonHighlightState(polygon, state) {
        polygon.highlightState = state;
        polygon.trigger("set-state");
      }

      function initCommentElement(polygon) {
        var inactiveBorderColor = "transparent";
        var inactiveBorderWidth = 3;
        var activeBorderColor = "rgba(244,244,44,0.85)";
        var activeBorderWidth = 3;
        var $textarea = $("<textarea>")
          .attr({
            name: questionId + "[" + polygon.responseId + "_SP" + "]",
          })
          .css({
            backgroundColor: "white",
            outline: "none",
          });
        var $wrapper = $("<div>")
          .append($textarea)
          .attr({
            class: "cm-other-specify",
          })
          .css({
            display: "none",
            position: "absolute",
            border: inactiveBorderWidth + "px solid " + inactiveBorderColor,
          });

        if (prevResponses.hasOwnProperty(polygon.responseId + "_SP")) {
          $textarea.val(prevResponses[polygon.responseId + "_SP"]);
        }

        $wrapper.on("mousedown click", function (e) {
          makeActive();
        });

        if (commentsDraggable) {
          $wrapper.draggable({
            containment: cmJq("body"),
          });
        }

        $question.on(
          "response-error-" + polygon.responseId,
          function (e, error) {
            $wrapper.addClass("error");

            $textarea.one("keyup", function () {
              $wrapper.removeClass("error");
            });
          }
        );

        $container.on("set-active", function (event, o) {
          if (polygon !== o) {
            makeInactive();
          }
        });

        $canvasContainer.append($wrapper);
        $wrapper.data("initialWidth", $wrapper.outerWidth());
        initPosition();

        $(window).on("resize", initPosition);
        $container.on("remove", function () {
          $(window).off("resize", initPosition);
        });

        polygon.on("set-state", function () {
          var state = highlightStates[polygon.highlightState];

          if (state.blank) {
            $wrapper.css("display", "none");
            $textarea.val("");
          } else {
            $wrapper.css({
              display: "inline-block",
              backgroundColor: state.style.fill,
            });

            makeActive();
          }
        });

        function makeActive() {
          polygon.stroke = activeBorderColor;
          polygon.strokeWidth = activeBorderWidth;
          canvas.renderAll();

          $wrapper.css({
            border: activeBorderWidth + "px solid " + activeBorderColor,
            zIndex: 9999,
          });

          $textarea.css({
            opacity: 1,
          });

          // For some reason the element wouldn't focus. So I tried wrapping it in a timeout as a quick hack job.
          // Feel free to figure out the real "why" and implement a "real" solution.
          // The first focus is so that it works on mobile; the timeout is for non-mobile browsers
          // (something to do with the click event and the fact that canvas is capturing them?)
          $textarea.focus();
          setTimeout(function () {
            $textarea.focus();
          }, 0);

          $container.trigger("set-active", polygon);
        }

        function makeInactive() {
          var state = highlightStates[polygon.highlightState];

          polygon.strokeWidth = 1;
          polygon.stroke = state.style.stroke;
          canvas.renderAll();

          $wrapper.css({
            zIndex: 9998,
            border: inactiveBorderWidth + "px solid " + inactiveBorderColor,
          });

          $textarea.css({
            opacity: 0.5,
          });
        }

        function initPosition() {
          var canvasWidth = $canvas.width();
          var canvasHeight = $canvas.height();
          var canvasOffset = $canvas.offset();
          var windowWidth = $(window).width();
          var relativeX = polygon.left / canvas.width;
          var relativeY = (polygon.top + polygon.height) / canvas.height;
          var left = canvasWidth * relativeX;
          var top = canvasHeight * relativeY + 5;
          var width = $wrapper.data("initialWidth");

          if (canvasOffset.left + left + width > windowWidth) {
            left -= canvasOffset.left + left + width - windowWidth + 10;
          }

          if (left < -1 * canvasOffset.left + 10) {
            left = -1 * canvasOffset.left + 10;
            width = windowWidth - 20;
          }

          $textarea.css("width", width);

          $wrapper.css({
            left: left,
            top: top,
          });
        }
      }
    }
  };

  window.initDragDropScale = function initDragDropScale() {
    var $ = window.cmJq;

    var CONTAINER = ".cm-dd-scale-container";
    var WINDOW_REDRAW_DEBOUNCE = 250;

    $(document).ready(function () {
      $(CONTAINER).each(function () {
        init($(this));
      });
    });

    function init($container) {
      var positionValues = { above: 1, below: -1 };
      var mainLineY = 50;
      var $canvas = $container.find("canvas.scale");
      var $canvasContainer = $container.find(".canvasContainer");
      var $dontKnowInput = $container.find(":checkbox.cm-QDK");
      var questionId = $container.data("questionid");
      var canvas = $canvas[0];
      var width = canvas.width;
      var height = canvas.height;
      var horizontalPadding = $container.data("horizontalpadding");

      var tickPosition = $container.data("tickposition");
      var count = $container.data("count");
      var minorTickHeight = 10 * positionValues[tickPosition];
      var tickWidth = 5;
      var majorTickHeight = 2 * minorTickHeight;
      var majorTicks = $container.data("majorticks");
      var majorValuesPosition = mainLineY - 20 * positionValues[tickPosition];

      var start = $container.data("start");
      var step = $container.data("step");
      var snap = $container.data("snap");
      var snapStep = $container.data("snapstep");
      var precision = $container.data("precision");
      var interval =
        (width - 2 * horizontalPadding) / ((step * (count - 1)) / snapStep);

      var itemValuePosition = $container.data("itemvalueposition");
      var itemValueTemplate = $container.data("itemvaluetemplate");
      var scaleValuePosition =
        mainLineY + 40 * positionValues[itemValuePosition];
      var allowOverlap = $container.data("allowoverlap");
      var showDupeWarning = $container.data("showdupewarning");
      var $dupeWarning = $container.find(".dupeWarning div");
      var indicatorHeight = majorTickHeight;

      // var currentlyDragging = false;

      var dragItemLayoutSettings = $container.data("layoutsettings");
      var originPileResponsiveLayout = new ResponsiveLayout(
        $container.find(".cm-dd-drag-section"),
        {
          orientation: dragItemLayoutSettings.orientation,
          itemWidth: dragItemLayoutSettings.dragItemWidth,
          itemHeight: dragItemLayoutSettings.dragItemHeight,
          horizontalSpacing: dragItemLayoutSettings.dragItemHorizontalSpacing,
          verticalSpacing: dragItemLayoutSettings.dragItemVerticalSpacing,
          offset: dragItemLayoutSettings.dragItemOffset,
          columnSpacing: dragItemLayoutSettings.dragItemColumnSpacing,
        }
      );

      var minorTickColor = $container.data("minortickcolor");
      var majorTickColor = $container.data("majortickcolor");
      var scaleColor = $container.data("scalecolor");
      var itemValueColor = $container.data("itemvaluecolor");

      var dropAreaPosition = $container.data("dropareaposition");

      $container.find(".cm-dd-drag-item").each(function () {
        $(this).data("placeholder", $(this).prev(".placeholder"));
      });

      originPileResponsiveLayout.render();

      var prevResponses = $container.data("prev-responses") || {};
      setupPreviousResponses();

      var ctx = canvas.getContext("2d");
      ctx.lineWidth = tickWidth;
      arrangeHeaders();
      arrangeMajorLabels();
      fixDropAreaHeight();
      draw();

      function arrangeHeaders() {
        var scale = width / $canvas.width();
        var headers = $container.find(".rangeHeaders li");

        var marginTop = 0;
        headers.each(function () {
          var startPos = getScaleXForValue($(this).data("start")) / scale;
          var stopPos = getScaleXForValue($(this).data("stop")) / scale;

          if (startPos < stopPos) {
            $(this).css({
              left: startPos,
              right: $canvas.width() - stopPos,
            });
          } else {
            $(this).css({
              left: stopPos,
              right: $canvas.width() - startPos,
            });
          }

          marginTop = Math.max(marginTop, $(this).outerHeight(true));
        });

        $container.find(".rangeHeaders").height(marginTop);
      }

      function arrangeMajorLabels() {
        var scale = width / $canvas.width();
        var labelContainer = $container.find(".tickValues");
        var labels = labelContainer.find("li");

        labelContainer.css({
          bottom: majorValuesPosition,
        });

        labels.each(function () {
          $(this).css({
            top: -1 * ($(this).outerHeight(true) / 2),
            left:
              getScaleXForValue($(this).data("value")) / scale -
              $(this).outerWidth(true) / 2,
          });
        });
      }

      function draw() {
        var tickX = 0;
        var value = 0;

        for (var tick = 0; tick < count; ++tick) {
          tickX =
            horizontalPadding +
            ((width - 2 * horizontalPadding) / (count - 1)) * tick;
          value = parseFloat((tick * step + start).toFixed(precision));

          ctx.beginPath();
          ctx.lineWidth = tickWidth;
          ctx.lineCap = "round";
          if (majorTicks[tick] === value) {
            ctx.strokeStyle = majorTickColor;
            ctx.moveTo(tickX, mainLineY - majorTickHeight);
          } else {
            ctx.strokeStyle = minorTickColor;
            ctx.moveTo(tickX, mainLineY - minorTickHeight);
          }
          ctx.lineTo(tickX, mainLineY - 2 * positionValues[tickPosition]);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.strokeStyle = scaleColor;
        ctx.lineCap = "round";
        ctx.lineWidth = tickWidth;
        ctx.moveTo(horizontalPadding, mainLineY);
        ctx.lineTo(width - horizontalPadding, mainLineY);
        ctx.stroke();

        $container.find(".indicatorValue").each(function () {
          var value = parseFloat($(this).find(".value").data("value"));
          var pos = getScaleXForValue(value);

          if (
            ($container.find(".bucket").hasClass("cm-dd-bucket-hover") &&
              $container
                .find("#" + $(this).data("drag-item"))
                .hasClass("ui-draggable-dragging")) ||
            $container.find(".bucket").hasClass("always-show-item-value")
          ) {
            ctx.strokeStyle = itemValueColor;
            ctx.lineCap = "round";
            ctx.lineWidth = tickWidth;
            ctx.beginPath();
            ctx.moveTo(pos, mainLineY);
            ctx.lineTo(pos, mainLineY - indicatorHeight);
            ctx.stroke();
          }
        });
      }

      function clear() {
        ctx.clearRect(0, 0, width, height);
      }

      function getScaleValueAtX(x) {
        var scaleWidth = width - 2 * horizontalPadding;
        var adjustedX = x - horizontalPadding;
        var percentage = adjustedX / scaleWidth;
        var range = step * (count - 1);
        return (range * percentage + start).toFixed(precision);
      }

      function getScaleXForValue(value) {
        var range = step * (count - 1);
        var percentage = (value - start) / range;
        var scaleWidth = width - 2 * horizontalPadding;
        return scaleWidth * percentage + horizontalPadding;
      }

      function getNearestSnapPoint(x) {
        return (
          Math.round((x - horizontalPadding) / interval) * interval +
          horizontalPadding
        );
      }

      function clampXAtBounds(x) {
        return Math.min(
          width - horizontalPadding,
          Math.max(horizontalPadding, x)
        );
      }

      function addItemToOriginPile($item) {
        $container
          .find(
            'input[name="' + questionId + "[" + $item.data("responseid") + ']"]'
          )
          .val("");

        var $placeholder = $item.data("placeholder");
        $placeholder.after($item);
        originPileResponsiveLayout.render();
      }

      function clearDragItemErrors($dragItem) {
        $dragItem.removeClass("cm-dd-drag-item-error");
        $dragItem.find(".cm-dd-drag-item-error__icon").remove();
        $dragItem.find(".cm-dd-drag-item-error__text").remove();
      }

      var qnum = $container.closest(".cm-question").data("qnum");
      var acceptSelector =
        ".cm-question[data-qnum=" + qnum + "] .cm-dd-drag-item";

      $container.find(".cm-dd-drag-item-list").droppable({
        accept: acceptSelector,
        hoverClass: "cm-dd-bucket-hover",
        tolerance: "intersect",
        drop: function (event, ui) {
          addItemToOriginPile(ui.helper.detach());
          originPileResponsiveLayout.render();

          var $indicatorValue = $container.find(
            '.indicatorValue[data-drag-item="' +
              ui.helper.attr("id") +
              '"] .value'
          );
          $indicatorValue.empty().data("value", "");

          fixDropAreaHeight();
          clear();
          draw();
        },
      });

      $container.find(".bucket").droppable({
        accept: acceptSelector,
        hoverClass: "cm-dd-bucket-hover",
        tolerance: "intersect",
        drop: function (event, ui) {
          var scale = width / $canvas.width();
          var left =
            ui.helper.offset().left -
            $canvasContainer.offset().left +
            ui.helper.width() / 2;
          var topOffset = $canvasContainer.outerHeight(true);

          // Translate into chart scale
          left = left * scale;

          if (snap) {
            left = getNearestSnapPoint(left);
          }

          left = clampXAtBounds(left);

          $container
            .find(
              'input[name="' +
                questionId +
                "[" +
                ui.helper.data("responseid") +
                ']"]'
            )
            .val(getScaleValueAtX(left));

          $dontKnowInput.each(function () {
            $(this).prop("checked", false);
          });

          if (showDupeWarning) {
            checkDupes();
          }

          var $indicatorValue = $container.find(
            '.indicatorValue[data-drag-item="' +
              ui.helper.attr("id") +
              '"] .value'
          );

          var value = getScaleValueAtX(left);

          $indicatorValue
            .empty()
            .append(itemValueTemplate.replace("{{value}}", value))
            .data("value", value);

          $indicatorValue.css({
            bottom: scaleValuePosition - $indicatorValue.outerHeight(true) / 2,
            left: left / scale - $indicatorValue.outerWidth(true) / 2,
          });

          // Translate out of chart scale
          left = left / scale;

          // Center
          left = left - ui.helper.width() / 2;

          ui.helper.css("margin", "0");
          ui.helper.css("left", left + "px");

          if (dropAreaPosition === "above") {
            topOffset = 10;
          }

          ui.helper.css("top", topOffset + "px");

          ui.helper.detach().appendTo($container.find(".dropArea .bucket"));

          if (!allowOverlap) {
            stackAgainstSiblings(ui.helper);
          }

          if (!$container.find(".bucket").hasClass("always-show-item-value")) {
            $indicatorValue.empty().data("value", "");
          }

          fixDropAreaHeight();

          clear();
          draw();
          originPileResponsiveLayout.render();
        },
      });

      $container.find(".cm-dd-drag-item").draggable({
        revert: "invalid",
        start: function () {
          // currentlyDragging = true;
          $(this).css("z-index", "10000");
        },
        drag: function (event, ui) {
          clear();
          var scale = width / $canvas.width();
          var pos =
            ui.helper.offset().left -
            $canvasContainer.offset().left +
            ui.helper.width() / 2;

          pos = pos * scale;

          if (snap) {
            pos = getNearestSnapPoint(pos);
          }

          pos = clampXAtBounds(pos);

          var $indicatorValue = $container.find(
            '.indicatorValue[data-drag-item="' +
              ui.helper.attr("id") +
              '"] .value'
          );

          var value = "";
          if ($container.find(".bucket").hasClass("cm-dd-bucket-hover")) {
            value = getScaleValueAtX(pos);
          }

          $indicatorValue
            .empty()
            .append(itemValueTemplate.replace("{{value}}", value))
            .data("value", value);

          $indicatorValue.css({
            bottom: scaleValuePosition - $indicatorValue.outerHeight(true) / 2,
            left: pos / scale - $indicatorValue.outerWidth(true) / 2,
          });

          draw();
        },
        stop: function (event, ui) {
          // currentlyDragging = false;
          ui.helper.css("z-index", "0");
          clearDragItemErrors(ui.helper);
          clear();
          draw();
        },
      });

      function checkDupes() {
        $dupeWarning.hide();
        var values = {};
        $container.find(".datastore input").each(function () {
          var value = $(this).val();
          if (value !== "") {
            if (typeof values[value] !== "undefined") {
              $dupeWarning.show();
              return false;
            } else {
              values[value] = true;
            }
          }
        });
      }

      function fixDropAreaHeight() {
        var highestY =
          $container.find(".cm-dd-drag-item").height() +
          $canvasContainer.outerHeight(true);
        $container.find(".bucket .cm-dd-drag-item").each(function () {
          var y = $(this).position().top + $(this).height();
          if (y > highestY) {
            highestY = y;
          }
        });

        if (dropAreaPosition === "above") {
          highestY += $canvasContainer.outerHeight(true);
        }

        $container.find(".bucket").height(highestY + 10);
      }

      function stackAgainstSiblings($selector) {
        var intersecting = findIntersectingElements(
          $selector,
          $selector.siblings(".cm-dd-drag-item")
        );
        while (intersecting.length > 0) {
          var highestY = 0;
          intersecting.forEach(function (element) {
            var y = element.position().top + element.height();
            if (y > highestY) {
              highestY = y;
            }
          });
          $selector.css("top", highestY + 10 + "px");
          intersecting = findIntersectingElements(
            $selector,
            $selector.siblings(".cm-dd-drag-item")
          );
        }
      }

      // Modified from http://stackoverflow.com/questions/1560926
      function findIntersectingElements(targetSelector, elementsToTest) {
        var intersectingElements = [];

        var $target = $(targetSelector);
        var tAxis = $target.offset();
        var targetX = [tAxis.left, tAxis.left + $target.outerWidth()];
        var targetY = [tAxis.top, tAxis.top + $target.outerHeight()];

        $(elementsToTest).each(function () {
          var $this = $(this);
          var thisPos = $this.offset();
          var elementX = [thisPos.left, thisPos.left + $this.outerWidth()];
          var elementY = [thisPos.top, thisPos.top + $this.outerHeight()];

          if (
            targetX[0] < elementX[1] &&
            targetX[1] > elementX[0] &&
            targetY[0] < elementY[1] &&
            targetY[1] > elementY[0]
          ) {
            intersectingElements.push($this);
          }
        });
        return intersectingElements;
      }

      function OnDontKnowChange() {
        if ($(this).is(":checked")) {
          $container.find(".cm-dd-drag-item").each(function () {
            addItemToOriginPile($(this).detach());
          });
          fixDropAreaHeight();
        }
      }

      function setupPreviousResponses() {
        $container.find(".cm-dd-drag-item").each(function () {
          var responseId = $(this).attr("data-responseid");
          if (typeof prevResponses[responseId] !== "undefined") {
            $(this).css("margin", "0");
            $(this).detach().appendTo($container.find(".dropArea .bucket"));
            $container
              .find(
                '.indicatorValue[data-drag-item="' +
                  $(this).attr("id") +
                  '"] .value'
              )
              .empty()
              .append(
                itemValueTemplate.replace(
                  "{{value}}",
                  prevResponses[responseId]
                )
              )
              .data("value", prevResponses[responseId]);
            $container
              .find('input[name="' + questionId + "[" + responseId + ']"]')
              .val(prevResponses[responseId]);
          }
        });
        repositionDragItems();
        originPileResponsiveLayout.render();
      }

      function repositionDragItems() {
        var scale = width / $canvas.width();

        $container
          .find(".cm-dd-drag-item-list")
          .css("min-height", originPileResponsiveLayout.itemHeight + "px");
        var itemsToReposition = [];
        $container.find(".cm-dd-drag-item").each(function () {
          var value = $container
            .find(
              'input[name="' +
                questionId +
                "[" +
                $(this).data("responseid") +
                ']"]'
            )
            .val();
          if (value !== "") {
            itemsToReposition.push($(this));
          }
          $(this).css("width", originPileResponsiveLayout.itemWidth + "px");
          $(this).css("height", originPileResponsiveLayout.itemHeight + "px");
          $(this)
            .find(".cm-dd-drag-item-content")
            .css("height", originPileResponsiveLayout.itemHeight + "px");
          $(this)
            .find(".cm-dd-drag-item-content")
            .css("line-height", originPileResponsiveLayout.itemHeight + "px");
          $(this).css("font-size", originPileResponsiveLayout.fontSize + "px");
        });

        $(itemsToReposition).each(function () {
          var value = $container
            .find(
              'input[name="' +
                questionId +
                "[" +
                $(this).data("responseid") +
                ']"]'
            )
            .val();
          var pos = getScaleXForValue(value) / scale;
          var left = pos - $(this).width() / 2;

          var topOffset = $canvasContainer.outerHeight(true);

          if (dropAreaPosition === "above") {
            topOffset = 10;
          }

          $(this).css({ top: topOffset + "px", left: left + "px" });

          var $indicatorValue = $container.find(
            '.indicatorValue[data-drag-item="' +
              $(this).attr("id") +
              '"] .value'
          );

          $indicatorValue.css({
            bottom: scaleValuePosition - $indicatorValue.outerHeight(true) / 2,
            left: pos - $indicatorValue.outerWidth(true) / 2,
          });
        });

        if (!allowOverlap) {
          itemsToReposition = itemsToReposition.slice(1);
          $(itemsToReposition).each(function () {
            stackAgainstSiblings($(this));
          });
        }
      }

      $dontKnowInput.on("change", OnDontKnowChange);

      function OnDDScaleResize() {
        if ($(CONTAINER).length > 0) {
          if (OnDDScaleResize.timer !== void 0) {
            clearTimeout(OnDDScaleResize.timer);
          }

          OnDDScaleResize.timer = setTimeout(function () {
            originPileResponsiveLayout.render();
            arrangeHeaders();
            arrangeMajorLabels();

            repositionDragItems();

            fixDropAreaHeight();
            OnDDScaleResize.timer = void 0;
          }, WINDOW_REDRAW_DEBOUNCE);
        }
      }

      $(window).resize(OnDDScaleResize);
    }
  };

  window.initCoordinateTracker = function initCoordinateTracker() {
    var $ = cmJq;
    var classes = {
      question: "cm-question",
      container: "cm-coordinate-tracker",
      coordinateState: "cm-coordinate-state",
      coordinateStateActive: "cm-coordinate-state-active",
      image: "cm-coordinate-tracker-image",
      coordinatesContainer: "cm-coordinates-container",
      coordinate: "cm-coordinate",
      coordinateActive: "cm-coordinate-active",
      coordinateButton: "cm-coordinate-button",
      coordinateRemoveButton: "cm-coordinate-remove-button",
      coordinateCommentContainer: "cm-coordinate-comment-container",
      coordinateComment: "cm-coordinate-comment",
      dontKnowInput: "cm-RSDK",
      disabledOverlay: "cm-coordinate-tracker-disabled-overlay",
    };

    $("." + classes.container).each(function () {
      var $container = $(this);
      var $survey = $(".cm-Survey");
      var $question = $container.closest("." + classes.question);
      var $dontKnowInputs = $question.find("." + classes.dontKnowInput);
      var $disabledOverlay = $container.find("." + classes.disabledOverlay);
      var $activeCoordinateState = null;
      var $activeCoordinate = null;
      var $image = $container.find("." + classes.image);
      var $coordinatesContainer = $container.find(
        "." + classes.coordinatesContainer
      );
      var questionId = $container.data("questionId");
      var imageWidth = $container.data("imageWidth");
      var imageHeight = $container.data("imageHeight");
      var commentsEnabled = $container.data("commentsEnabled");
      var commentsDraggable = $container.data("commentsDraggable");
      var coordinateSize = $container.data("coordinateSize");
      var $formInput = $container.find('[name="' + questionId + '[COORDS]"]');
      var prevCoordinates = $container.data("prevCoordinates");

      $container.on("click", "." + classes.coordinateState, function () {
        setActiveCoordinateState($(this));
      });

      $container.on("click", "." + classes.image, function (e) {
        var relativeX = e.offsetX;
        var relativeY = e.offsetY;
        var x = (relativeX / $image.width()) * imageWidth;
        var y = (relativeY / $image.height()) * imageHeight;

        x = Math.floor(x);
        y = Math.floor(y);

        addCoordinate($activeCoordinateState, x, y);

        $dontKnowInputs.attr("checked", false);
      });

      $container.on("focus click", "." + classes.coordinateButton, function () {
        setActiveCoordinate($(this).closest("." + classes.coordinate));
      });

      $container.on("focus", "." + classes.coordinateComment, function () {
        setActiveCoordinate($(this).closest("." + classes.coordinate));
      });

      $container.on("click", "." + classes.coordinateComment, function () {
        // because mobile safari doesn't know how to
        // focus textareas without some help.
        $(this).focus();
      });

      $container.on(
        "mousedown",
        "." + classes.coordinateCommentContainer,
        function () {
          setActiveCoordinate($(this).closest("." + classes.coordinate));
        }
      );

      $container.on(
        "click",
        "." + classes.coordinateRemoveButton,
        function (e) {
          removeCoordinate($(this).closest("." + classes.coordinate));
        }
      );

      $question.on("change", "." + classes.dontKnowInput, function () {
        if ($dontKnowInputs.is(":checked")) {
          removeAllCoordinates();
          setActiveCoordinate(null);
          $disabledOverlay.show();
        } else {
          $disabledOverlay.hide();
        }
      });

      $survey.on("beforeSubmit", function () {
        var value = "";

        if (!$dontKnowInputs.is(":checked")) {
          value = getSerializedCoordinates();
        }

        $formInput.val(value);
      });

      setActiveCoordinateState(
        $container.find("." + classes.coordinateState).first()
      );

      // Set previous responses/coordinates
      if ($dontKnowInputs.is(":checked")) {
        $disabledOverlay.show();
      } else if (prevCoordinates && prevCoordinates.length) {
        prevCoordinates.forEach(function (coordinate) {
          var x = coordinate[0];
          var y = coordinate[1];
          var responseId = coordinate[2];
          var comment = coordinate[3];

          var $coordinateState = $container.find(
            "." +
              classes.coordinateState +
              '[data-response-id="' +
              responseId +
              '"]'
          );

          if ($coordinateState) {
            addCoordinate($coordinateState, x, y, comment);
          }
        });
      }

      function setActiveCoordinateState($coordinateState) {
        if (
          $activeCoordinateState &&
          (!$coordinateState ||
            $coordinateState[0] !== $activeCoordinateState[0])
        ) {
          $activeCoordinateState.removeClass(classes.coordinateStateActive);
        }

        if ($coordinateState) {
          $coordinateState.addClass(classes.coordinateStateActive);
        }

        $activeCoordinateState = $coordinateState;
      }

      function addCoordinate($coordinateState, x, y, comment) {
        var $coordinate;
        var radius;
        var xPercent;
        var yPercent;

        if (!$coordinateState) {
          throw new Error(
            "Tried adding a coordinate without specifying a coordinate state."
          );
        }

        $coordinate = generateCoordinate(commentsEnabled, commentsDraggable);
        $coordinate.data({
          x: x,
          y: y,
          responseId: $coordinateState.data("responseId"),
        });
        $coordinate.attr("data-state", $coordinateState.data("value"));

        if (comment) {
          $coordinate.find("." + classes.coordinateComment).val(comment);
        }

        radius = coordinateSize / 2;
        xPercent = (x / imageWidth) * 100;
        yPercent = (y / imageHeight) * 100;

        $coordinate.css({
          left: "calc(" + xPercent + "% - " + radius + "px)",
          top: "calc(" + yPercent + "% - " + radius + "px)",
        });

        $coordinate.find("." + classes.coordinateButton).css({
          width: coordinateSize + "px",
          height: coordinateSize + "px",
        });

        $coordinate.appendTo($coordinatesContainer);
        $coordinate.find("." + classes.coordinateComment).focus();

        setActiveCoordinate($coordinate);
      }

      function removeCoordinate($coordinate) {
        $coordinate.remove();
      }

      function removeAllCoordinates() {
        $coordinatesContainer.find("." + classes.coordinate).each(function () {
          removeCoordinate($(this));
        });
      }

      function setActiveCoordinate($coordinate) {
        if (
          $activeCoordinate &&
          (!$coordinate || $coordinate[0] !== $activeCoordinate[0])
        ) {
          $activeCoordinate.removeClass(classes.coordinateActive);
        }

        if ($coordinate) {
          $coordinate.addClass(classes.coordinateActive);
        }

        $activeCoordinate = $coordinate;
      }

      function getSerializedCoordinates() {
        var coordinates = [];

        $coordinatesContainer.find("." + classes.coordinate).each(function () {
          var $this = $(this);
          var $comment = $this.find("." + classes.coordinateComment);

          var data = [
            $this.data("x"),
            $this.data("y"),
            $this.data("responseId"),
          ];

          if ($comment.length) {
            data.push($comment.val());
          }

          coordinates.push(data);
        });

        return JSON.stringify(coordinates);
      }
    });

    function generateCoordinate(withComments, commentsDraggable) {
      var $coordinate;
      var $button;
      var $removeButton;
      var $comment;
      var $textarea;

      $coordinate = $("<div>");
      $coordinate.addClass(classes.coordinate);

      $button = $("<button>");
      $button.attr("type", "button");
      $button.addClass(classes.coordinateButton);
      $button.appendTo($coordinate);

      $removeButton = $("<button>");
      $removeButton.attr("type", "button");
      $removeButton.addClass(classes.coordinateRemoveButton);
      $removeButton.appendTo($coordinate);

      if (withComments) {
        $comment = $("<div>");
        $comment.addClass(classes.coordinateCommentContainer);
        $comment.appendTo($coordinate);

        if (commentsDraggable) {
          $comment.draggable({
            containment: "document",
          });
        }

        $textarea = $("<textarea>");
        $textarea.addClass(classes.coordinateComment);
        $textarea.appendTo($comment);
      }

      return $coordinate;
    }
  };

  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = (function () {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
      var dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor",
      ];
      var dontEnumsLength = dontEnums.length;

      return function (obj) {
        if (
          typeof obj !== "object" &&
          (typeof obj !== "function" || obj === null)
        ) {
          throw new TypeError("Object.keys called on non-object");
        }

        var result = [];
        var prop;
        var i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    })();
  }

  window.transformGridRadios = function transformGridRadios() {
    var div = ".cm-smart-button";
    var sel = "cm-selected";
    jQuery(".cm-mobile-smart").each(function () {
      var jThis = jQuery(this);
      jThis.find(div + " input").each(function () {
        var jThis = jQuery(this);
        var jParent = jThis.parents(div).first();
        jParent.attr({
          "data-question-id": jThis.attr("name"),
          "data-response-id": jThis.attr("value"),
        });
        if (jThis.attr("checked")) {
          jParent.addClass(sel);
        }
      });
      jThis.find(div).click(function () {
        var jThis = jQuery(this);
        jQuery(
          '.cm-smart-button[data-question-id="' +
            jThis.attr("data-question-id") +
            '"]'
        ).removeClass(sel);
        jThis.addClass(sel);
        jThis.find("input").attr("checked", true);
      });
    });
  };

  window.buildMobileSmart = function buildMobileSmart() {
    jQuery(".cm-mobile-smart").each(function () {
      var jThis = jQuery(this).data("smart-current", 0);
      var jWrapper = jThis.find(".cm-mobile-smart__wrapper--grid").first();
      var jHeaders = jThis.find(".cm-grid-column-header");
      var jRows = jThis.find(".cm-grid-row");
      var qHeaders = [];
      var questionResponses = {};
      var questionOrder = [];
      // TODO, change this to play nicely with any layout. Currently works for row layout only.
      // Change this also to account for multiple mobile-smart questions being on the same page, should jump from one question to the next.
      jHeaders.each(function () {
        qHeaders.push(jQuery(this).html().trim());
      });
      jRows.each(function () {
        jQuery(this)
          .find(".cm-smart-button")
          .each(function () {
            var jThis = jQuery(this);
            var newContent = jThis
              .find(".cm-grid-cell-content")
              .contents()
              .filter(function () {
                return this.nodeName !== "LABEL";
              });
            var questionId = jThis.attr("data-question-id");
            if (questionOrder.indexOf(questionId) < 0) {
              questionOrder.push(questionId);
              questionResponses[questionId] = [];
            }
            questionResponses[questionId].push({
              questionId: questionId,
              responseId: jThis.attr("data-response-id"),
              newContent: newContent.clone(),
            });
          });
      });
      if (questionOrder.length > 0) {
        var jSmartQuestion = jQuery("<div/>").addClass(
          "cm-mobile-smart__wrapper--smart-question"
        );
        for (var i = 0; i < questionOrder.length; i++) {
          var questionId = questionOrder[i];
          var jSmartRow = jQuery("<div/>")
            .addClass("cm-smart-row")
            .data("smart-row", i);
          var header = qHeaders.length > i ? qHeaders[i] : "";
          var jSmartHeader = jQuery("<div/>")
            .addClass("cm-smart-header")
            .append(header);
          var jResponseGroup = jQuery("<div/>").addClass(
            "cm-smart-response-group"
          );
          var currentResponses = questionResponses[questionId];
          for (var k = 0; k < currentResponses.length; k++) {
            var attrs = {
              "data-question-id": currentResponses[k].questionId,
              "data-response-id": currentResponses[k].responseId,
            };
            var jResponse = jQuery("<div/>")
              .attr(attrs)
              .addClass("cm-smart-button");
            var jResponseLabel = jQuery("<div/>")
              .addClass("cm-smart-response-label")
              .append(currentResponses[k].newContent);

            if (
              jQuery(
                "input[value=" + currentResponses[k].responseId + "]"
              ).attr("checked")
            ) {
              jResponse.addClass("cm-selected");
            }
            jResponse
              .append(jResponseLabel)
              .appendTo(jResponseGroup)
              .click(function () {
                var jThis = jQuery(this);
                jThis
                  .parents(".cm-smart-response-group")
                  .first()
                  .find(".cm-smart-button")
                  .removeClass("cm-selected");
                jThis.addClass("cm-selected");
                jQuery(
                  "input[value=" + jThis.attr("data-response-id") + "]"
                ).attr("checked", true);
              });
          }
          if (i > 0) {
            jSmartRow.hide();
          }
          jSmartRow
            .append(jSmartHeader)
            .append(jResponseGroup)
            .appendTo(jSmartQuestion);
          // replace all <br>'s with spaces on mobile
          jSmartQuestion.find("br").replaceWith(" ");
        }
        jWrapper.before(jSmartQuestion);
      }
    });
    if (hasMobileSmart()) {
      var navDirection = cmJq("[data-nav-direction]").attr(
        "data-nav-direction"
      );
      if (navDirection === "BACK") {
        var smartCount = getMobileSmartCount();
        if (smartCount > 1) {
          goToMobileSmartQuestion(smartCount - 1);
        }
      }
    }
    resizeSmartGridButtons();
  };

  window.resizeSmartGridButtons = function resizeSmartGridButtons() {
    jQuery(".cm-mobile-smart__wrapper--grid").each(function () {
      var maxHeight = 0;
      var jButtons = jQuery(this).find(".cm-smart-button");
      jButtons.css({
        height: "auto",
      });
      jButtons.each(function () {
        var jThis = jQuery(this);
        var height = jThis.outerHeight();
        maxHeight = Math.max(maxHeight, height);
      });
      jButtons.css({
        height: maxHeight,
      });
    });
  };

  // simple grid mobile smart / button display bindings
  function initSimpleGrid() {
    var $ = window.cmJq;
    $(document).ready(function () {
      var $simpleGridWrappers = $(".cm-simple-grid");
      $simpleGridWrappers.each(function () {
        var $simpleGridWrapper = $(this);
        var $mobileQuestion = $simpleGridWrapper.find(
          ".cm-simple-grid__mobile-smart"
        );
        var $desktopQuestion = $simpleGridWrapper.find(
          ".cm-simple-grid__desktop"
        );
        var $smartButtons = $simpleGridWrapper.find(".cm-smart-button:first");
        var isButtonDisplay = $smartButtons.length >= 1;
        var isMobileSmart = $mobileQuestion.length >= 1;

        if (isButtonDisplay) {
          initSimpleGridButtonDisplay(
            $simpleGridWrapper,
            $desktopQuestion,
            $mobileQuestion
          );
        }

        $simpleGridWrapper.find(":input").on("change", inputWatch);
        $simpleGridWrapper.find(".cm-QDK").on("click", function () {
          var $inputs = $simpleGridWrapper.find("input:not(.cm-QDK)");
          var $textInputs = $inputs.not('[type="checkbox"], [type="radio"]');
          var $toggleInputs = $inputs.filter(
            '[type="checkbox"], [type="radio"]'
          );
          $textInputs.val("");
          $toggleInputs.prop("checked", false);
          if (isButtonDisplay) {
            $simpleGridWrapper
              .find(".cm-smart-button.cm-selected")
              .removeClass("cm-selected");
          }
        });

        function rowDKUpdate($dk, source, isChecked) {
          var id = $dk.attr("data-id");
          var parentId = $dk.attr("data-parent-id");
          var $parent = $dk.closest(".cm-simple-grid__view");

          // find the parent of the other views input
          var $matchParent = null;
          if (source === "desktop") {
            $matchParent = $parent
              .parent()
              .find(".cm-simple-grid__mobile-smart");
          } else {
            $matchParent = $parent.parent().find(".cm-simple-grid__desktop");
          }

          // find the matching input
          var $matchingInput = $matchParent.find("input[data-id=" + id + "]");

          // if checking the dk clear the other values in the row of the desktop view
          if (isChecked) {
            // grab all of the matching inputs and buttons for this question to prepare to clear them
            var $rowInputs = $desktopQuestion.find(
              "input[data-parent-id=" + parentId + "]"
            );
            $rowInputs.not("[data-id=" + id + "]").each(function () {
              var $input = cmJq(this);
              var type = $input.attr("type");
              if (type === "radio" || type === "checkbox") {
                $input.prop("checked", false).trigger("change");
              } else {
                $input.val("").trigger("change");
              }

              if (isButtonDisplay) {
                var inputId = $input.attr("data-id");
                var $buttons = $simpleGridWrapper.find(
                  ".cm-smart-button[data-id=" + inputId + "]"
                );
                $buttons.removeClass("cm-selected");
              }
            });

            $dk.prop("checked", true);
            $matchingInput.prop("checked", true);
            if (isButtonDisplay) {
              var dkId = $dk.attr("data-id");
              $simpleGridWrapper
                .find(".cm-smart-button[data-id=" + dkId + "]")
                .addClass("cm-selected");
            }
          } else {
            $dk.prop("checked", false);
            $matchingInput.prop("checked", false);
          }
        }

        function inputWatch(event) {
          var $this = $(this);
          var $dontKnow = $this.parents(".cm-question").find(".cm-QDK");
          if (!$this.hasClass("cm-QDK")) {
            $dontKnow.prop("checked", false);
          } else {
            // check to see if other question dont knows need to be unchecked
            var $checkedDks = $dontKnow
              .not("[id=" + $this.attr("id") + "]")
              .filter(":checked");
            $checkedDks.prop("checked", false);
          }

          if (
            !$this.hasClass("cm-RSDK") &&
            !$this.hasClass("cm-exclusiveResponse")
          ) {
            // check if the row has a row DK and uncheck it if it does
            var parentId = $this.attr("data-parent-id");
            var type = $this.attr("type");
            var $parent = $this.parents(".cm-simple-grid__view");
            var isDesktop = $parent.hasClass("cm-simple-grid__desktop");
            var $rowDk = $desktopQuestion.find(
              "input.cm-RSDK[data-parent-id=" +
                parentId +
                "], input.cm-exclusiveResponse[data-parent-id=" +
                parentId +
                "]"
            );
            var cloneable =
              !isButtonDisplay || type === "text" || type === "numeric";

            $rowDk.each(function (i, thisDk) {
              var $thisDk = $(thisDk);
              if ($thisDk.is(":checked")) {
                $thisDk.prop("checked", false).trigger("change");
              }
            });

            // if button display is on, remove the selected class from each
            if (isButtonDisplay) {
              var $rowDkButtons = $simpleGridWrapper.find(
                ".cm-smart-button.cm-RSDK[data-parent-id=" +
                  parentId +
                  "], .cm-smart-button.cm-exclusiveResponse[data-parent-id=" +
                  parentId +
                  "]"
              );
              $rowDkButtons.removeClass("cm-selected");
            }

            // clone the input between the mobile smart and desktop views if applicable
            if (isMobileSmart && cloneable) {
              // trigger the row update to clone the value to the other view
              if (isDesktop) {
                updateSimpleGridInputs(
                  $this,
                  $desktopQuestion,
                  $mobileQuestion,
                  "desktop"
                );
              } else {
                updateSimpleGridInputs(
                  $this,
                  $desktopQuestion,
                  $mobileQuestion,
                  "mobile"
                );
              }
            }
          } else {
            if (
              $this
                .closest(".cm-simple-grid__view")
                .hasClass("cm-simple-grid__mobile-smart")
            ) {
              rowDKUpdate($this, "mobile", $this.is(":checked"));
            } else {
              rowDKUpdate($this, "desktop", $this.is(":checked"));
            }
          }
        }
      });
    });
  }

  function initSimpleGridButtonDisplay(
    $simpleGridWrapper,
    $desktopQuestion,
    $mobileQuestion
  ) {
    var $ = window.cmJq;
    // click function handling
    $simpleGridWrapper.off("click");
    $desktopQuestion.on("click", ".cm-simple-grid__cell", triggerClick);
    $mobileQuestion.on("click", ".cm-smart-button", triggerClick);

    function triggerClick(event) {
      var $target = cmJq(event.target);
      var $button = null;
      var isSpecify = false;

      if ($target.hasClass("cm-other-specify")) {
        $button = $target.closest(".cm-smart-button");
        isSpecify = true;
      } else if ($target.hasClass("cm-simple-grid__cell")) {
        $button = $target.find(".cm-smart-button");
      } else {
        $button = $target.closest(".cm-smart-button");
      }

      var id = $button.attr("data-id");
      var parentId = $button.attr("data-parent-id");
      var type = $button.attr("data-type");
      var $input = $desktopQuestion.find('input[data-id="' + id + '"]');
      var isCurrentlySelected = $input.is(":checked");

      if (type === "radio") {
        if (isCurrentlySelected === false) {
          var $questionButtons = $(
            ".cm-smart-button[data-parent-id=" + parentId + "]"
          );
          $questionButtons.removeClass("cm-selected"); // uncheck old buttons
          $questionButtons
            .filter("[data-id=" + id + "]")
            .addClass("cm-selected"); // check the new button
          $input.prop("checked", true).trigger("change");
        }
        // radios cannot be unchecked, they don't work that way
      } else if (type === "checkbox") {
        var $matchingButton = $(".cm-smart-button[data-id=" + id + "]");
        var $tiedInput = $desktopQuestion.find("input[data-id=" + id + "]");
        var update = true;
        if (isCurrentlySelected === true) {
          // uncheck the button
          if (isSpecify) {
            // do not uncheck the button if the os was clicked
            update = false;
          } else {
            $matchingButton.removeClass("cm-selected");
          }
        } else {
          // check the button
          $matchingButton.addClass("cm-selected");
        }
        if (update) {
          $tiedInput.click();
        }
      }
    }
  }

  function updateSimpleGridInputs(
    $input,
    $desktopQuestion,
    $mobileQuestion,
    $source
  ) {
    // based on the element and type update the other inputs in the simple grid
    var id = $input.attr("data-id");
    var type = $input.attr("type");
    var $matchInput = null;
    var inputTagName = $input.prop("tagName");
    var inputSearchString = 'input[data-id="' + id + '"]';
    // handle the input if the select text format is textarea instead of the default input
    if (
      typeof inputTagName !== "undefined" &&
      inputTagName.toLowerCase() === "textarea"
    ) {
      inputSearchString = 'textarea[data-id="' + id + '"]';
    }
    var value = null;

    // update the value of the match and hidden inputs
    if (type === "radio") {
      value = $input.attr("value");
      // handle the radio by cloning the state
      if ($source === "mobile") {
        $matchInput = $desktopQuestion.find(
          inputSearchString + "[data-response-id=" + value + "]"
        );
      } else {
        $matchInput = $mobileQuestion.find(
          inputSearchString + "[data-response-id=" + value + "]"
        );
      }
      $matchInput.prop("checked", true);
    } else {
      if ($source === "mobile") {
        $matchInput = $desktopQuestion.find(inputSearchString);
      } else {
        $matchInput = $mobileQuestion.find(inputSearchString);
      }
      if (type === "checkbox") {
        // handle checkbox types by cloning the check state
        if ($input.prop("checked")) {
          $matchInput.prop("checked", true);
        } else {
          $matchInput.prop("checked", false);
        }
      } else {
        // handle text/numeric inputs by copying the values
        value = $input.val();
        $matchInput.val(value);
      }
    }
  }

  window.isEmptyValue = function isEmptyValue(value) {
    return (
      value === null ||
      value === void 0 ||
      (typeof value === "string" && value.length === 0)
    );
  };

  function calculateSimpleGridWidth(simpleGridElement) {
    var table = simpleGridElement.find(".cm-simple-grid__table");
    var corner = table.find("th.cm-simple-grid__corner").first();
    var columns = table.find("th.cm-simple-grid__column-header");
    var widestColumn = null;

    table.css("table-layout", "auto");

    var cornerWidth = corner.outerWidth();

    if (cornerWidth < 30) {
      cornerWidth = 30;
    }

    corner.css("width", cornerWidth);

    columns.each(function () {
      var _this = jQuery(this);
      if (
        widestColumn === null ||
        _this.outerWidth() > widestColumn.outerWidth()
      ) {
        widestColumn = _this;
      }
    });

    if (widestColumn !== null) {
      var width = widestColumn.outerWidth();

      if (width < 50) {
        width = 50;
      }

      columns.each(function () {
        jQuery(this).outerWidth(width);
      });
    }

    table.css("table-layout", "fixed");

    if (simpleGridElement.outerWidth() < table.outerWidth()) {
      simpleGridElement.addClass("overflow");
    }
  }

  function calculateSimpleGridTableWidths() {
    if (cmSurvey.getDeviceScreenWidth() <= cmSurvey.mobileMinimumWidth) {
      jQuery("div.cm-simple-grid").each(function () {
        calculateSimpleGridWidth(jQuery(this));
      });
    }
  }

  jQuery(window).resize(function () {
    resizeSmartGridButtons();
  });
})();
