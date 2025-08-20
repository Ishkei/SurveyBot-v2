(function (global, $) {
  "use strict";
  function addNavigationListeners() {
    var isFirstPage = $("[data-first-page]").attr("data-first-page") === "true";
    var showPreviousButton = false;
    var skipInput = $(".skip-input");
    if (hasMobileSmart()) {
      var currentQuestion = getCurrentMobileSmart();
      if (currentQuestion > 0) {
        showPreviousButton = true;
      }
    } else if (hasPageSplitResponses()) {
      var pageBatch = getCurrentSplitResponseBatch();
      if (pageBatch > 0) {
        showPreviousButton = true;
      }
    }
    if (isFirstPage) {
      if (showPreviousButton) {
        $(".cm-navigation-previous-button").removeClass("cm-hidden");
        $(".cm-navigation-test-control-button").removeClass("cm-hidden");
      } else {
        $(".cm-navigation-previous-button").addClass("cm-hidden");
        $(".cm-navigation-test-control-button").addClass("cm-hidden");
      }
    }

    $("#cm-PrevButton.cm-ajax")
      .off()
      .on("click", function (event) {
        if ($(event.target).hasClass("cm-button-disabled")) {
          return;
        }
        var doReturn = false;
        if (hasMobileSmart()) {
          var firstQuestion = goBackOnMobileSmart();
          if (!firstQuestion) {
            doReturn = true;
          }
        }
        if (hasPageSplitResponses()) {
          var firstPage = goBackOnSplitResponses();
          if (!firstPage) {
            doReturn = true;
          }
        }
        if (doReturn) {
          return;
        }

        $("#cmix-go").val("prev");
        postSurvey("back");
      });

    $("#cm-NextButton.cm-ajax")
      .off()
      .on("click", function (event) {
        if ($(event.target).hasClass("cm-button-disabled")) {
          return;
        }
        var doReturn = false;
        if (hasMobileSmart()) {
          var lastQuestion = goForwardOnMobileSmart();
          if (!lastQuestion) {
            doReturn = true;
          }
          if (hasPageSplitResponses()) {
            var lastPage = goForwardOnSplitResponses();
            if (!lastPage) {
              doReturn = true;
            }
          }
        }
        if (doReturn) {
          return;
        }
        $("#cmix-go").val("next");
        postSurvey("forward");
      });

    $("#cm-PrevButton.cm-post")
      .off()
      .on("click", function () {
        // trigger the beforeSubmit event before submitting the form
        // to match the AJAX submit of the form
        $(".cm-Survey").trigger("beforeSubmit");

        // set the cmix-go to prev
        $("#cmix-go").val("prev");

        // submit the form
        $("#cm-surveyForm").submit();
      });

    $("#cm-NextButton.cm-post")
      .off()
      .on("click", function () {
        // trigger the beforeSubmit event before submitting the form
        // to match the AJAX submit of the form
        $(".cm-Survey").trigger("beforeSubmit");

        // submit the form
        $("#cm-surveyForm").submit();
      });

    $("#cm-TestBackButton")
      .off()
      .on("click", function (event) {
        if ($(event.target).hasClass("cm-button-disabled")) {
          return;
        }
        var doReturn = false;
        if (hasMobileSmart()) {
          var firstQuestion = goBackOnMobileSmart();
          if (!firstQuestion) {
            doReturn = true;
          }
        }
        if (hasPageSplitResponses()) {
          var firstPage = goBackOnSplitResponses();
          if (!firstPage) {
            doReturn = true;
          }
        }
        if (doReturn) {
          return;
        }

        $("#cmix-go").val("prev");
        postSurvey("back");
      });

    $("#cm-locale-switcher-test").on("change", function (event) {
      var queryParams = parseQueryString();
      var paramsForURL = "";
      var locale = $(this).val();
      var url = window.location.href.substring(
        window.location.href.lastIndexOf("/"),
        0
      );

      if (queryParams.length) {
        paramsForURL = "?" + jQuery.param(queryParams);
      }
      window.location = url + "/" + locale + paramsForURL;
    });

    $(".cm-navigation-test-restart-button")
      .off()
      .on("click", function (event) {
        if ($(event.target).hasClass("cm-button-disabled")) {
          return;
        }
        surveyCover.on();
        $("#testRestartForm").submit();
      });

    $(".skip-dropdown").change(function () {
      skipInput.hide();
      $("#" + $(this).val()).show();
    });

    $("#redirect-nav")
      .off()
      .on("click", function () {
        $("#redirect-dropdown-menu").show();
      });

    $("#redirect-dropdown-menu").mouseleave(function () {
      $("#redirect-dropdown-menu").hide();
    });

    $(".cm-navigation-skip-to")
      .off()
      .on("click", function (event) {
        var val = $("#dp_skip_to").val();
        if (!val || val === "") {
          return;
        }

        var $injector = angular.element("body").injector();
        var $mdDialog = $injector.get("$mdDialog");

        $mdDialog.show({
          bindAsController: true,
          controllerAs: "$ctrl",
          controller: function ($scope, $mdDialog, $http) {
            var ctrl = this;
            var TYPES = {
              INSTANT: "INSTANT",
              WALK: "WALK",
            };

            var skipToData = {
              type: TYPES.INSTANT,
            };

            this.queryTemplates = function (searchText) {
              return $http
                .get(
                  window.surveyApiUrl +
                    "/surveys/" +
                    $("#cmix-survey-id").val() +
                    "/simulation-templates?name=" +
                    searchText
                )
                .then(function (response) {
                  return response.data || [];
                });
            };

            this.setType = function (type) {
              skipToData.type = type;
            };

            this.submit = function () {
              var skipToValue = $("#dp_skip_to").val();
              var skipToOption = $("#dp_skip_to_option").val();
              var pageValue;
              var questionValue;

              if (skipToOption === "PAGE") {
                pageValue = $.trim(skipToValue.replace("PAGE", ""));
              } else if (skipToOption === "QUESTION") {
                questionValue = skipToValue;
              }

              $("#page_value").val(pageValue);
              $("#question_value").val(questionValue);
              $("#cmix-walk").val(skipToData.type === TYPES.WALK);

              if (ctrl.selectedTemplate) {
                $("#cmix-template-id").val(ctrl.selectedTemplate.id);
              }

              if (pageValue && pageValue !== "") {
                $("#cmix-go").val("skip_page");
                postSurvey();
              } else if (questionValue && questionValue !== "") {
                $("#cmix-go").val("skip_question");
                postSurvey();
              }

              $mdDialog.hide();
            };

            this.cancel = function () {
              $mdDialog.cancel();
            };
          },
          templateUrl: "/views/skip-to.dialog.html",
        });
      });

    $("#questionNum, #pageNum").keypress(function (e) {
      if (e.which === 13) {
        $(".cm-navigation-skip-to").click();
      }
    });
    $("#cm-autofill-page")
      .off()
      .click(function (event) {
        event.preventDefault();
        $(".cm-element.cm-question").each(function () {
          var questionType = $(this).attr("data-type");
          directQuestionFill($(this), questionType);
        });
        $("#cm-NextButton").click();
      });
    $(".cm-autofill")
      .off()
      .click(function (event) {
        event.preventDefault();
        var questionType = $(this).parent().first().attr("data-type");
        var questionContainer = $(this).parent().first();
        directQuestionFill(questionContainer, questionType);
      });
  }

  global.hasPageSplitResponses = function () {
    var pageHasBatches = $("[data-response-current-batch]");
    return pageHasBatches.length > 0;
  };

  global.hasMobileSmart = function () {
    var isMobileSmart = false;
    var mobileSmart = $(".cm-mobile-smart");
    if (mobileSmart.length > 0) {
      isMobileSmart = mobileSmart
        .find(".cm-mobile-smart__wrapper--smart-question")
        .is(":visible");
    }
    return isMobileSmart;
  };

  global.goBackOnSplitResponses = function () {
    var currentPageBatch = getCurrentSplitResponseBatch();
    if (currentPageBatch > 0) {
      currentPageBatch--;

      gotoSplitResponsesBatch(currentPageBatch);

      return false;
    }
    return true;
  };

  global.goForwardOnSplitResponses = function () {
    var pageBatchCount = $("[data-response-batch-count]").attr(
      "data-response-batch-count"
    );
    var currentPageBatch = getCurrentSplitResponseBatch();
    if (currentPageBatch < pageBatchCount - 1) {
      currentPageBatch++;

      gotoSplitResponsesBatch(currentPageBatch);

      return false;
    }
    return true;
  };

  global.getCurrentMobileSmart = function () {
    var mobileSmart = $(".cm-mobile-smart");
    return parseInt(mobileSmart.data("smart-current"));
  };

  global.getMobileSmartCount = function () {
    var mobileSmart = $(".cm-mobile-smart");
    return mobileSmart.find(
      ".cm-mobile-smart__wrapper--smart-question .cm-smart-row"
    ).length;
  };

  global.goBackOnMobileSmart = function () {
    var currentQuestion = getCurrentMobileSmart();
    if (currentQuestion > 0) {
      goToMobileSmartQuestion(--currentQuestion);
      return false;
    }
    return true;
  };

  global.goForwardOnMobileSmart = function () {
    var currentQuestion = getCurrentMobileSmart();
    var questionCount = getMobileSmartCount();
    if (currentQuestion < questionCount - 1) {
      goToMobileSmartQuestion(++currentQuestion);
      return false;
    }
    return true;
  };

  global.goToMobileSmartQuestion = function (currentQuestion) {
    var mobileSmart = $(".cm-mobile-smart");
    mobileSmart.data("smart-current", currentQuestion);
    var smartRows = mobileSmart
      .find(".cm-mobile-smart__wrapper--smart-question .cm-smart-row")
      .hide();
    smartRows
      .filter(function () {
        return jQuery(this).data("smart-row") === currentQuestion;
      })
      .show();
  };

  global.getCurrentSplitResponseBatch = function () {
    var pageHasBatches = $("[data-response-current-batch]");
    var currentPageBatch = pageHasBatches.attr("data-response-current-batch");
    return parseInt(currentPageBatch);
  };

  global.isLastSplitResponseBatch = function () {
    var pageHasBatches = $("[data-response-current-batch]");
    var pageBatchCount = $("[data-response-batch-count]").attr(
      "data-response-batch-count"
    );
    var currentPageBatch = pageHasBatches.attr("data-response-current-batch");
    if (currentPageBatch < pageBatchCount - 1) {
      return false;
    }

    return true;
  };

  global.gotoSplitResponsesBatch = function (pageBatch) {
    var $parentContainer = $("[data-response-current-batch]").closest(
      ".cm-question"
    );
    $parentContainer.find("[data-response-batch]").addClass("cm-hidden");
    $parentContainer.find(".cm-response-group-name").addClass("cm-hidden");
    $parentContainer
      .find(".cm-response-group:not(.cm-grid-dontknow):not(.dont-knows)")
      .addClass("cm-hidden");

    var currentBatchRecord = $("[data-response-current-batch]");
    currentBatchRecord.attr("data-response-current-batch", pageBatch);

    var isFirstPage = $("[data-first-page]").attr("data-first-page") === "true";
    if (isFirstPage) {
      if (pageBatch > 0) {
        $(".cm-navigation-previous-button").removeClass("cm-hidden");
        $(".cm-navigation-test-control-button").removeClass("cm-hidden");
      } else {
        $(".cm-navigation-previous-button").addClass("cm-hidden");
        $(".cm-navigation-test-control-button").addClass("cm-hidden");
      }
    }

    var visibleResponses = $parentContainer.find(
      "[data-response-batch=" + pageBatch + "]"
    );
    visibleResponses.removeClass("cm-hidden");
    visibleResponses.each(function (ind, response) {
      var $responseGroup = $parentContainer
        .find(response)
        .closest(".cm-response-group");
      $responseGroup.removeClass("cm-hidden");
      $responseGroup.find(".cm-response-group-name").removeClass("cm-hidden");
    });

    // find simple grid row group headers with start and end batch attributes
    var simpleGridGroupRowHeaders = $parentContainer.find(
      "[data-row-group-header-batch-start]"
    );
    simpleGridGroupRowHeaders.each(function (ind, rowGroupHeader) {
      var batchStart = $(rowGroupHeader).attr(
        "data-row-group-header-batch-start"
      );
      var batchEnd = $(rowGroupHeader).attr("data-row-group-header-batch-end");
      if (pageBatch >= batchStart && pageBatch <= batchEnd) {
        $(rowGroupHeader).removeClass("cm-hidden");
      } else {
        $(rowGroupHeader).addClass("cm-hidden");
      }
    });
  };

  $(document).on("ready", function () {
    addNavigationListeners();
    preventEnterKey();

    if (document.errorJSON !== null) {
      attachErrors(document.errorJSON);
    }
  });

  global.postSurvey = function (flowDirection) {
    var formData;

    $(".cm-Survey").trigger("beforeSubmit");

    formData = $("#cm-surveyForm").serialize();
    if ($("#skipForm").length > 0) {
      formData += "&" + $("#skipForm").serialize();
    }
    surveyCover.on();
    $.ajax({
      url: "/submit",
      method: "POST",
      data: formData,
      timeout: 300000,
      success: function success(data, status, xhr) {
        if (typeof data === "object") {
          var currentBatch = null;
          var minimumWithErrors = null;
          if (hasMobileSmart()) {
            currentBatch = getCurrentMobileSmart();
            minimumWithErrors = getMinimumMobileSmartWithErrors(data);

            goToMobileSmartQuestion(minimumWithErrors);

            if (currentBatch < minimumWithErrors) {
              clearPreviousErrors();

              $(window).scrollTop(0);

              return;
            }
          }
          if (hasPageSplitResponses()) {
            currentBatch = getCurrentSplitResponseBatch();
            minimumWithErrors = getMinimumSplitResponseBatchWithErrors(data);

            if (minimumWithErrors <= currentBatch) {
              gotoSplitResponsesBatch(minimumWithErrors);
            } else {
              gotoSplitResponsesBatch(currentBatch + 1);
            }

            if (currentBatch < minimumWithErrors) {
              clearPreviousErrors();

              $(window).scrollTop(0);

              return;
            }
          }

          attachErrors(data);
          hideValidQuestions(data);
        } else {
          if (flowDirection === "forward") {
            if (hasPageSplitResponses() && !isLastSplitResponseBatch()) {
              clearPreviousErrors();

              gotoSplitResponsesBatch(getCurrentSplitResponseBatch() + 1);
              $(window).scrollTop(0);

              return;
            }
          } else {
            if (!hasPageSplitResponses()) {
              $(".cm-navigation-previous-button").addClass("cm-hidden");
              $(".cm-navigation-test-control-button").addClass("cm-hidden");
            }
          }

          $(".cm-Survey").data("cm-pageInitialized", false);
          $("#cm-surveyContainer").html(data); // handler returned HTML

          if (window.angular) {
            var $injector = angular.element("body").injector();

            if ($injector) {
              $injector.invoke(function ($rootScope, $compile) {
                angular.element("[bindable]").each(function () {
                  $compile(this)($rootScope);
                });

                $rootScope.$apply();
              });
            }
          }
          pageInit();
        }
        $(window).scrollTop(0);

        addNavigationListeners();
      },
      error: function (xhr, testStatus, errorThrown) {
        if (xhr.status === 409) {
          window.location.reload(true);
        }
      },
      complete: function complete() {
        surveyCover.off();
      },
    });
  };

  global.getMinimumSplitResponseBatchWithErrors = function (errorJSON) {
    var pageBatchCount = $("[data-response-batch-count]").attr(
      "data-response-batch-count"
    );
    var minBatchNumberWithErrors = parseInt(pageBatchCount) - 1;

    for (var q in errorJSON) {
      var errorMsg = errorJSON[q].errorMsg;
      if (errorMsg) {
        minBatchNumberWithErrors = 0;
      }

      var cellQuestions = errorJSON[q].invalidCellQuestions || {};
      var cellResponses = errorJSON[q].invalidCellResponses || {};

      if (Object.keys(cellQuestions).length > 0) {
        for (var questionId in cellQuestions) {
          var $cells = $(".cm-grid-cell[questionid='" + questionId + "']");

          if (hasPageSplitResponses()) {
            var responseBatchs = $cells.closest("[data-response-batch]");
            responseBatchs.each(function (ind, batch) {
              var batchNumber = parseInt($(batch).attr("data-response-batch"));
              if (minBatchNumberWithErrors > batchNumber) {
                minBatchNumberWithErrors = batchNumber;
              }
            });
          }
        }
      }

      if (Object.keys(cellResponses).length > 0) {
        for (var responseId in cellResponses) {
          var $input = $("#" + responseId + "");
          var $cell = $input.closest(".cm-grid-cell");

          if (hasPageSplitResponses()) {
            responseBatchs = $cell.closest("[data-response-batch]");
            responseBatchs.each(function (ind, batch) {
              var batchNumber = parseInt($(batch).attr("data-response-batch"));
              if (minBatchNumberWithErrors > batchNumber) {
                minBatchNumberWithErrors = batchNumber;
              }
            });
          }
        }
      }
    }
    return minBatchNumberWithErrors;
  };

  global.getMinimumMobileSmartWithErrors = function (errorJSON) {
    var splitCount = getMobileSmartCount();
    var minWithErrors = splitCount - 1;

    for (var q in errorJSON) {
      var errorMsg = errorJSON[q].errorMsg;
      if (errorMsg) {
        minWithErrors = 0;
      }

      var questions = errorJSON[q].invalidCellQuestions || {};
      var responses = errorJSON[q].invalidCellResponses || {};

      var rowNumber = null;
      for (var questionId in questions) {
        var $question = $(
          ".cm-smart-response-group [data-question-id='" + questionId + "']"
        ).first();
        var $smartQuestionRow = $question.closest(".cm-smart-row");
        rowNumber = $smartQuestionRow.data("smart-row");
        if (typeof rowNumber !== "undefined" && minWithErrors > rowNumber) {
          minWithErrors = rowNumber;
        }
      }

      for (var responseId in responses) {
        var $response = $(
          ".cm-smart-response-group [data-response-id='" + responseId + "']"
        );

        var $smartResponseRow = $response.closest(".cm-smart-row");
        rowNumber = $smartResponseRow.data("smart-row");
        if (typeof rowNumber !== "undefined" && minWithErrors > rowNumber) {
          minWithErrors = rowNumber;
        }
      }
    }
    return minWithErrors;
  };

  global.surveyCover = {
    counter: 0,
    timeout: null,
    on: function () {
      var $surveyForm = $("#cm-surveyForm");
      var $surveyCover = $(".cm-loader-wrapper");
      $(".cm-navigation-preventer").show();
      if ($surveyForm.outerWidth() !== $surveyCover.outerWidth()) {
        $surveyCover.width($surveyForm.outerWidth());
      }
      $surveyCover.height($surveyForm.outerHeight());
      $surveyCover.offset({
        left: $surveyForm.offset().left,
      });
      var $message = $surveyCover.find(".cm-message");
      this.counter += 1;
      if (this.timeout === null) {
        this.timeout = setTimeout(function () {
          $message.fadeIn(200).css("display", ";table-cell");
          $surveyForm.css({
            opacity: 0.5,
          });
        }, 3000);
      }
      $surveyCover.find(".cm-message").hide();
      $surveyCover.fadeIn(200);
    },
    off: function (force) {
      var $surveyForm = $("#cm-surveyForm");
      this.counter = Math.max(0, this.counter - 1);
      if (this.counter === 0 || force) {
        clearTimeout(this.timeout);
        this.timeout = null;
        $(".cm-loader-wrapper").fadeOut(200);
        $(".cm-navigation-preventer").hide();
        $surveyForm.css({
          opacity: 1,
        });
      }
    },
  };

  global.addDDError = function (type, id, err) {
    var $window = $(window);
    var $body = $("body");
    var $dragItem = $("#" + type + "-" + id);
    var $errorIcon = $(
      "<span class='cm-dd-" + type + "-error__icon'>!</span>'"
    );
    var $errorText = $(
      "<span class='cm-dd-" + type + "-error__text'>" + err + "</span>"
    );

    $dragItem.addClass("cm-dd-" + type + "-error");
    $dragItem.append($errorIcon);
    $dragItem.append($errorText);

    var position = $errorText.position();
    var offset = $errorText.offset();
    $errorText.hide();

    var stay = false;

    $errorIcon.on("mouseenter", function () {
      $body.prepend($errorText);
      $errorText.css({
        left: offset.left + "px",
        top: offset.top + "px",
      });
      $(".cm-dd-" + type + "-error__text").hide();
      $errorText.show();
    });

    $errorIcon.on("mouseleave", function () {
      if (!stay) {
        $errorText.hide();
        $errorText.css({
          left: position.left + "px",
          top: position.top + "px",
        });
        $dragItem.prepend($errorText);
      }
    });

    $errorIcon.on("click", function (e) {
      e.stopPropagation();
      stay = true;
      $body.prepend($errorText);
      $errorText.css({
        left: offset.left + "px",
        top: offset.top + "px",
      });
      $(".cm-dd-" + type + "-error__text").hide();
      $errorText.show();
    });

    $errorText.on("click", function (e) {
      e.stopPropagation();
    });

    $window.on("click", function (e) {
      stay = false;
      $errorText.hide();
      $errorText.css({
        left: position.left + "px",
        top: position.top + "px",
      });
      $dragItem.prepend($errorText);
    });
  };

  global.clearPreviousErrors = function () {
    var $questions = $("DIV.cm-element[data-qnum]");
    $questions.attr("valid", true).find(".cm-error-msg").empty().hide();

    $questions
      .find("DIV[data-subquestionname]")
      .attr("valid", true)
      .find(".cm-cell-sub-question-error")
      .remove();

    $questions.find(".cm-responseError").remove();
    $questions.find(".cm-cell-response-error").remove();
    $questions.find(".cm-dd-drag-item-error__icon").remove();
    $questions.find(".cm-dd-drag-item-error__text").remove();
    $questions.find(".cm-dd-bucket-error__icon").remove();
    $questions.find(".cm-dd-bucket-error__text").remove();

    $questions.find(".warning").removeClass("warning");
    $questions.find(".cm-error").removeClass("cm-error");
    $questions.find(".cm-error-highlight").removeClass("cm-error-highlight");
    $questions
      .find(".cm-dd-drag-item-error")
      .removeClass("cm-dd-drag-item-error");
    $questions.find(".cm-dd-bucket-error").removeClass("cm-dd-bucket-error");
  };

  function attachErrors(errorJSON) {
    // Remove any previously displayed errors:
    clearPreviousErrors();

    for (var q in errorJSON) {
      var qnum = q;
      var msg = errorJSON[q].errorMsg;
      var responseErrors = errorJSON[q].invalidResponses;
      var cellQuestions = errorJSON[q].invalidCellQuestions || {};
      var cellResponses = errorJSON[q].invalidCellResponses || {};
      var dragItems = errorJSON[q].invalidDragItems;
      var buckets = errorJSON[q].invalidBuckets;
      var questionId;
      var questionErrorsToDisplay = [];
      var responseErrorsToDisplay = [];
      var errorMessageKeys = {};
      var errorNumber = 1;
      var question = $("DIV.cm-element[data-qnum='" + qnum + "']").attr(
        "valid",
        false
      );
      var questionType = question.attr("data-type");

      // Add the msg to the question
      if (msg !== "") {
        question.find(".cm-error-msg:first").html(msg).fadeIn();
      }

      for (var dragItemId in dragItems) {
        addDDError("drag-item", dragItemId, dragItems[dragItemId]);
      }

      for (var bucketId in buckets) {
        addDDError("bucket", bucketId, buckets[bucketId]);
      }

      // Attach sub-question-level errors to cells
      for (questionId in cellQuestions) {
        var $annotatedCells;
        var $highlightCells = $(
          ".cm-grid-cell[questionid='" + questionId + "']"
        );
        if (questionType === "SIMPLE_GRID") {
          $annotatedCells = question.find(
            '.grid-error-helper[data-subquestionname="' + questionId + '"]'
          );
          $highlightCells = $highlightCells.parent("td");
        } else {
          $annotatedCells = $highlightCells;
        }
        $highlightCells.addClass("cm-error-highlight");
        $annotatedCells.each(function () {
          var $cell = $(this);
          var $input = $cell.find("input,textarea");
          var responseId = $input.attr("id");

          var rawMessage = cellQuestions[questionId];
          if (!errorMessageKeys.hasOwnProperty(rawMessage)) {
            errorMessageKeys[rawMessage] = errorNumber++;
          }

          var $errorMarker = $(
            "<div class='cm-cell-error-num'><span>" +
              errorMessageKeys[rawMessage] +
              "</span></div>"
          );

          $errorMarker.addClass("has-error-description");
          var message = $("<div/>")
            .html(rawMessage.replace(/<br>/gi, " "))
            .text();

          if ($.inArray(message, questionErrorsToDisplay) < 0) {
            questionErrorsToDisplay.push(message);
          }
          $errorMarker.attr("data-hover", message);
          $errorMarker.click(function onErrorMarkerClick() {
            $errorMarker.toggleClass("clicked");
          });

          $cell.attr("valid", false).addClass("warning");

          if (!cellResponses.hasOwnProperty(responseId)) {
            if (questionType === "SIMPLE_GRID") {
              $errorMarker.addClass("cm-cell-sub-question-error");
              $cell.prepend($errorMarker);
            } else {
              $errorMarker.addClass("cm-cell-response-error");
              $cell.append($errorMarker);
            }
          }
        });
      }

      // Attach response-level errors to cells
      for (var responseId in cellResponses) {
        var $input = $("#" + responseId + "");
        var $cell = $input.closest(".cm-grid-cell");

        var rawResponseMessage = cellResponses[responseId];
        if (!errorMessageKeys.hasOwnProperty(rawResponseMessage)) {
          errorMessageKeys[rawResponseMessage] = errorNumber++;
        }
        var $errorMarker = $(
          "<div class='cm-cell-response-error cm-cell-error-num'><span>" +
            errorMessageKeys[rawResponseMessage] +
            "</span></div>"
        );

        $errorMarker.addClass("has-error-description");
        var message = $("<div/>")
          .html(rawResponseMessage.replace(/<br>/gi, " "))
          .text();

        responseErrorsToDisplay.push(message);

        $errorMarker.attr("data-hover", message);
        $errorMarker.click(function onErrorMarkerClick() {
          $errorMarker.toggleClass("clicked");
        });

        $cell.attr("valid", false).addClass("warning");
        $cell.append($errorMarker);
      }

      // List the error messages above the grid under the overall errors
      var errorListHTML = "<ol class='cm-error-msg' style='display: block;'>";
      for (var errorKey in errorMessageKeys) {
        errorListHTML += "<li>";
        errorListHTML += errorKey;
        errorListHTML += "</li>";
      }
      errorListHTML += "</ol>";

      question.find(".cm-error-msg:first").append(errorListHTML).fadeIn();

      var responseError;
      while ((responseError = responseErrors.shift())) {
        var id = responseError.id;
        var error = responseError.error;

        var $select = question.find("SELECT");
        if ($select.length > 0) {
          $select
            .closest("LABEL")
            .addClass("cm-error")
            .closest("LI")
            .append('<div class="cm-responseError">' + error + "</div>");
        } else if (question.find(".cm-dd-scale-container").length > 0) {
          addDDError("drag-item", id, error);
        } else if (question.find(".cm-sliders-container").length > 0) {
          questionId = question
            .find(".cm-sliders-container")
            .data("question-id");
          question
            .find("input#" + questionId + "_" + id)
            .closest(".cm-slider-container")
            .addClass("cm-error");
        } else {
          question
            .find("LABEL[data-id='" + id + "']")
            .addClass("cm-error")
            .parent()
            .append('<div class="cm-responseError">' + error + "</div>");
        }

        question.trigger("response-error-" + id, responseError);
      }
      if (questionType === "SIMPLE_GRID") {
        var $desktopView = question.find(".cm-simple-grid__desktop");
        var $mobileView = question.find(".cm-simple-grid__mobile-smart");
        if ($mobileView.length > 0) {
          populateSimpleGridMobileSmartErrors($desktopView, $mobileView);
        }
      }
    }
  }

  function populateSimpleGridMobileSmartErrors($desktopView, $mobileView) {
    // clear existing errors on mobile smart
    $mobileView
      .find(".grid-error-helper-mobile")
      .find(".cm-cell-error-num")
      .remove();

    // populate the mobile display off of the desktop version
    var $desktopErrors = $desktopView.find(
      ".grid-error-helper.warning, .cm-cell-response-error"
    );

    // loop the row level errors
    $desktopErrors.each(function () {
      var $rowError = $(this);
      var errorSubQuestionName = $rowError.attr("data-subquestionname");
      var $errorMobileRow = $mobileView.find(
        '.grid-error-helper-mobile[data-subquestionname="' +
          errorSubQuestionName +
          '"]'
      );
      var $errorMessageHtml = $rowError.find("div").clone();
      var $newErrorMessage = cmJq("<div></div>")
        .addClass("cm-simple-grid__row-header")
        .append($errorMessageHtml);

      // copy the error the row in the mobile smart
      $errorMobileRow.append($newErrorMessage);
    });

    // loop cell/response level errors
    var $desktopRowCellErrors = $desktopView.find(".cm-cell-response-error");
    $desktopRowCellErrors.each(function () {
      var $cellError = $(this);
      var id = $cellError.parent().find("input").attr("id");
      var $cellErrorMessage = $cellError.clone(); // grab the cell message
      var $errorMobileInput = $mobileView.find('input[data-id="' + id + '"]');
      var $parent = $errorMobileInput.parent();
      var $label = $parent.find("label");
      if ($label.length > 0) {
        $label.after($cellErrorMessage);
      } else {
        $errorMobileInput.before($cellErrorMessage);
      }
    });
  }

  function directQuestionFill(questionContainer, questionType) {
    switch (questionType) {
      case "RADIO":
        fillRadioQuestion(questionContainer);
        break;
      case "DROPDOWN":
        fillDropDownQuestion(questionContainer);
        break;
      case "CHECKBOX":
        fillCheckBoxQuestion(questionContainer);
        break;
      case "NUMERIC":
        fillNumberQuestion(questionContainer);
        break;
      case "TEXT":
        fillTextQuestion(questionContainer);
        break;
      case "SLIDER":
        fillSliderQuestion(questionContainer);
        break;
      case "SIMPLE_GRID":
      case "GRID":
        fillSimpleGridQuestion(questionContainer, questionType);
        break;
      default:
        break;
    }
  }

  function fillRadioQuestion(question) {
    var radioContainers = question.find(
      ".cm-radio-response-set .cm-response-container"
    );
    var radioInputs = [];
    radioContainers.each(function (i, element) {
      if (!$(element).hasClass("cm-other-specify-container")) {
        radioInputs.push($(element).find("input[type=radio]"));
      }
    });
    var randomChoice = Math.floor(Math.random() * radioInputs.length);
    $(radioInputs[randomChoice]).prop("checked", true);
  }

  function fillDropDownQuestion(question) {
    var options = question.find(".cm-dropdown-response-set select option");
    var optionInputs = [];
    options.each(function (i, element) {
      if (!$(element).hasClass("cm-other-specify")) {
        optionInputs.push(element);
      }
    });
    var select = question.find(".cm-dropdown-response-set select");
    var randomOption = Math.floor(
      Math.random() * (optionInputs.length - 1) + 1
    );
    select.val($(optionInputs[randomOption]).val()).trigger("change");
  }

  function fillCheckBoxQuestion(question) {
    var checkboxContainers = question.find(
      ".cm-checkbox-response-set .cm-response-container"
    );
    var checkboxInputs = [];
    var min = 1;
    var max;
    var minChoices = parseInt(
      $(question).find(".cm-checkbox-response-set").attr("min")
    );
    var maxChoices = parseInt(
      $(question).find(".cm-checkbox-response-set").attr("max")
    );

    if (minChoices) {
      min = minChoices;
    }
    if (maxChoices) {
      max = maxChoices;
    }
    checkboxContainers.each(function (i, element) {
      if (!$(element).hasClass("cm-other-specify-container")) {
        checkboxInputs.push($(element).find("input[type=checkbox]"));
      }
    });
    if (min && max) {
      var checked = randomNumberGenerator(min, max);
      var i = 0;
      while (checked !== 0) {
        $(checkboxInputs[i]).prop("checked", true);
        checked--;
        i++;
      }
    } else {
      var randomChoice = Math.floor(Math.random() * checkboxInputs.length);
      $(checkboxInputs[randomChoice]).prop("checked", true);
    }
  }

  function fillNumberQuestion(question) {
    var numberContainers = question.find(
      ".cm-numeric-input-container input[type=number]"
    );
    var oneOfEach = question
      .find(".cm-numeric-response-set")
      .attr("data-one-of-each");
    var randomNumberArray = [];
    var randomNumber;
    var maxIterations = 0;
    for (var i = 0; i < numberContainers.length; i++) {
      var min = parseInt(question.find(numberContainers[i]).attr("min"), 10);
      var max = parseInt(question.find(numberContainers[i]).attr("max"), 10);

      if (oneOfEach === "1") {
        var uniqueNumber = false;
        while (uniqueNumber === false) {
          randomNumber = randomNumberGenerator(min, max, 1);
          if ($.inArray(randomNumber, randomNumberArray) === -1) {
            randomNumberArray.push(randomNumber);
            uniqueNumber = true;
          }
          maxIterations++;
          if (maxIterations === 50) {
            question
              .find(".cm-qtext")
              .prepend(
                "<div class='cm-error-msg-max'><p>Mismatch in responses to overall min and max settings</p></div>"
              );
            return;
          }
        }
      } else {
        randomNumber = randomNumberGenerator(min, max, 1);
        randomNumberArray.push(randomNumber);
      }
      numberContainers.eq(i).val(randomNumberArray[i]);
    }
    var specifies = question.find(
      ".cm-numeric-label-container input[type=text]"
    );
    if (specifies.length) {
      $(specifies).each(function (i, element) {
        $(element).val("SPECIFY-TEXT");
      });
    }
  }

  function fillTextQuestion(question) {
    var textContainers = question.find(
      ".cm-text-response-set input[type=text], .cm-text-response-set textarea"
    );
    var min = 1;
    var max;
    var possible = "The quick red fox jumped over the lazy brown dog. ";

    for (var i = 0; i < textContainers.length; i++) {
      var text = "";

      if (question.find(textContainers[i]).attr("data-maxlength") !== "") {
        max = parseInt(
          question.find(textContainers[i]).attr("data-maxlength"),
          10
        );
      }
      if (question.find(textContainers[i]).attr("data-minlength") !== "") {
        min =
          parseInt(
            question.find(textContainers[i]).attr("data-minlength"),
            10
          ) + 1;
      }
      var randomNumber = randomNumberGenerator(min, max);
      while (text.length < randomNumber) {
        text += possible;
        if (text.length > randomNumber) {
          text = text.substr(0, randomNumber);
          textContainers.eq(i).val(text);
        }
      }
    }
  }

  function fillSliderQuestion(question) {
    var $sliderContainerElement = question.find(".cm-sliders-container");
    var min = parseInt($sliderContainerElement.attr("data-min"), 10);
    var max = parseInt($sliderContainerElement.attr("data-max"), 10);
    var sliders = question.find(".cm-slider-container");
    var reversedSlider =
      $sliderContainerElement.attr("reversed-slider") + "" === "true";
    var forceUnique = $sliderContainerElement.attr("data-force-unique");
    var randomNumberArray = [];
    var randomNumber;
    var maxIterations = 0;
    var uniquesLength = sliders.length;
    if (forceUnique === "true") {
      while (uniquesLength !== 0) {
        randomNumber = randomNumberGenerator(min, max, 1);
        if ($.inArray(randomNumber, randomNumberArray) === -1) {
          randomNumberArray.push(randomNumber);
          uniquesLength--;
        }
        maxIterations++;
        if (maxIterations === 50) {
          question
            .find(".cm-qtext")
            .prepend(
              "<div class='cm-error-msg-max'><p>Mismatch in responses to overall min and max settings</p></div>"
            );
          return;
        }
      }
    }
    for (var i = 0; i < sliders.length; i++) {
      var sliderNumericInput = sliders.eq(i).find(".cm-numeric-input");
      if (forceUnique !== "true") {
        randomNumber = randomNumberGenerator(min, max, 1);
        randomNumberArray.push(randomNumber);
      }
      sliderNumericInput.val(randomNumberArray[i]);
      sliders.eq(i).find(".cm-slider-value").html(randomNumberArray[i]);
      moveSlider($(sliders[i]), randomNumberArray[i], reversedSlider, min, max);
    }
  }

  function getPercentageFromValue(value, min, max) {
    return ((value - min) / (max - min)) * 100;
  }

  function moveSlider($slider, value, reversedSlider, min, max) {
    var percentage = getPercentageFromValue(value, min, max);

    $slider.find(".ui-slider-range").css("width", 100 - percentage + "%");
    $slider
      .find(".ui-slider-handle")
      .css("left", (reversedSlider ? 100 - percentage : percentage) + "%");
  }

  function fillSimpleGridQuestion(question, questionType) {
    var subquestions = [];
    var subQuestionInputAndSettings = [];
    var settings = {};
    var subquestionSelects = [];
    var possible = "The quick red fox jumped over the lazy brown dog. ";
    var type;
    var $question = $(question);
    var subQuestionOneOfEach = $question
      .find('[data-subquestionname][data-one-of-each="true"]')
      .map(function (i, element) {
        return $(element).attr("data-subquestionname");
      });
    $question.find("[questionid]").each(function (i, element) {
      var $elem = jQuery(element);
      var questionId = $elem.attr("questionid");
      if (subquestions.indexOf(questionId) === -1) {
        subquestions.push(questionId);
      }
    });
    $.each(subquestions, function (i, subquestion) {
      var inputs = $(question)
        .find("[questionid=" + subquestion + "] input")
        .filter(function (j, element) {
          var elementId = this.id;
          var dataSpecify = $(this).attr("data-specify");
          if (
            elementId.substr(elementId.length - 3) !== "_SP" &&
            (dataSpecify === null ||
              dataSpecify === "" ||
              typeof dataSpecify === "undefined")
          ) {
            return element;
          }
        })
        .get();
      if (questionType === "GRID") {
        if ($question.find("[questionid=" + subquestion + "] select")) {
          var selects = $(question)
            .find("[questionid=" + subquestion + "] select")
            .get();
          if (selects.length !== 0) {
            subquestionSelects.push(selects);
          }
        }
      }
      if (inputs.length !== 0) {
        settings.oneOfEach =
          $.inArray(subquestion, subQuestionOneOfEach) !== -1;
        subQuestionInputAndSettings.push({
          inputs: inputs,
          settings: settings,
        });
      }
    });
    for (var x = 0; x < subQuestionInputAndSettings.length; x++) {
      var randomInput = Math.floor(
        Math.random() * subQuestionInputAndSettings[x].inputs.length
      );
      if (subQuestionInputAndSettings[x].inputs[randomInput].type) {
        type = subQuestionInputAndSettings[x].inputs[randomInput].type;
      }

      if (type === "radio" || type === "checkbox") {
        subQuestionInputAndSettings[x].inputs[randomInput].checked = true;
      } else if (type === "text") {
        $(subQuestionInputAndSettings[x].inputs).each(function (i) {
          var min = 1;
          var max = 50;
          var inputElement = $(subQuestionInputAndSettings[x].inputs[i]);
          if (typeof inputElement.attr("max") !== "undefined") {
            max = parseInt(inputElement.attr("max"), 10);
          }
          if (typeof inputElement.attr("min") !== "undefined") {
            if (parseInt(inputElement.attr("min"), 10) !== 0) {
              min = parseInt(inputElement.attr("min"), 10);
            }
          }

          var text = "";
          var randomNumber = randomNumberGenerator(min, max);

          while (text.length < randomNumber) {
            text += possible;
            if (text.length > randomNumber) {
              text = text.substr(0, randomNumber);
              $(inputElement).val(text);
            }
          }
        });
      } else if (type === "number") {
        var oneOfEach = subQuestionInputAndSettings[x].settings.oneOfEach;
        var randomNumbersUniqueArray = [];
        $(subQuestionInputAndSettings[x].inputs).each(function (i) {
          var min = 0;
          var max = 50;
          var randomNumber = 0;
          var inputElement = $(subQuestionInputAndSettings[x].inputs[i]);
          var uniqueNumber = false;
          var maxIterations = 0;
          if (questionType === "SIMPLE_GRID") {
            if (typeof inputElement.attr("max") !== "undefined") {
              max = parseInt(inputElement.attr("max"), 10);
            }
            if (
              typeof $(subQuestionInputAndSettings[x].inputs[i]).attr("min") !==
              "undefined"
            ) {
              min = parseInt(inputElement.attr("min"), 10);
            }
            if (oneOfEach === true) {
              while (uniqueNumber === false) {
                randomNumber = randomNumberGenerator(min, max);
                if ($.inArray(randomNumber, randomNumbersUniqueArray) === -1) {
                  randomNumbersUniqueArray.push(randomNumber);
                  uniqueNumber = true;
                }
                maxIterations++;
                if (maxIterations === 50) {
                  question
                    .find(".cm-qtext")
                    .prepend(
                      "<div class='cm-error-msg-max'><p>Mismatched responses with overall min and max settings</p></div>"
                    );
                  return;
                }
              }
            } else {
              randomNumber = randomNumberGenerator(min, max);
              randomNumbersUniqueArray.push(randomNumber);
            }
            $(subQuestionInputAndSettings[x].inputs[i]).val(
              randomNumbersUniqueArray[i]
            );
          } else if (questionType === "GRID") {
            if ($(subQuestionInputAndSettings[x].inputs[i]).attr("max")) {
              max = parseInt(inputElement.attr("max"), 10);
            }
            if ($(subQuestionInputAndSettings[x].inputs[i]).attr("min")) {
              min = parseInt(inputElement.attr("min"), 10);
            }
            randomNumber = randomNumberGenerator(min, max);
            $(inputElement).val(randomNumber);
          }
        });
      }
    }
    if (subquestionSelects.length > 0) {
      $(subquestionSelects).each(function (g, element) {
        var options = $(element).find("option");
        var optionInputs = [];
        options.each(function (i, element) {
          if (!$(element).hasClass("cm-other-specify")) {
            optionInputs.push(element);
          }
        });
        var randomOption = Math.floor(
          Math.random() * (optionInputs.length - 1) + 1
        );
        $(element).val($(optionInputs[randomOption]).val()).trigger("change");
      });
    }
  }
  function randomNumberGenerator(min, max, offset) {
    offset = offset || 0;
    return Math.floor(Math.random() * (max - min + offset)) + min;
  }
  function hideValidQuestions(errorJSON) {
    // Add a class to all the valid questions that will hide them;
    $("DIV.cm-element[valid=true][data-hideIfValid='true']")
      .fadeOut()
      .addClass("cm-hideIfValid");
    $("DIV.cm-element[valid=false][data-hideIfValid='true']")
      .fadeIn()
      .removeClass("cm-hideIfValid");
  }

  function preventEnterKey() {
    $(document).on("keypress", function (e) {
      if (e.keyCode === 13 && e.target && e.target.type !== "textarea") {
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
      }
    });
  }

  window.parseQueryString = function () {
    var params = {};
    var query = window.location.search.substring(1);

    var names = query.split("&");
    for (var i in names) {
      if (names.hasOwnProperty(i)) {
        var pair = names[i].split("=");
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
      }
    }
    return params;
  };
})(window, cmJq);
