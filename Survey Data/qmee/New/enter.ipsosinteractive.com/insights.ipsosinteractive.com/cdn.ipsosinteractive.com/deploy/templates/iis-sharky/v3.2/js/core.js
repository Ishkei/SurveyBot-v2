function supportsSvg() {
  return document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#Shape",
    "1.0"
  );
}
!(function (p, r, i, e) {
  var t = function (e) {
    (this.metadata = p("body").data("studyJSON")),
      (this.browserVersion = p.browser.version.slice(
        0,
        p.browser.version.indexOf(".")
      )),
      (this.documentMode = i.documentMode),
      (this.tables = p("table.mrQuestionTable").addClass("table")),
      (this.mrQuestionTable = p(".mrQuestionTable")),
      (this.tableErrorTexts = this.tables.find(".mrErrorText")),
      (this.errorTexts = p("body").find(".mrErrorText")),
      (this.isIE7 = p.browser.msie && this.browserVersion < 8),
      (this.FirstTimeScroll = !0),
      (this.direction = "ltr"),
      (this.isWirelessDevice =
        !!this.metadata &&
        !!this.metadata.SnifferData.LPSSS_is_wireless_device &&
        this.metadata.SnifferData.LPSSS_is_wireless_device),
      (this.isTablet =
        !!this.metadata &&
        !!this.metadata.SnifferData.LPSSS_is_tablet &&
        this.metadata.SnifferData.LPSSS_is_tablet),
      (this.theLabels = p("label")),
      (this.answerContainers = p("[id^='Cell.']").addClass("answer-container")),
      (this.toDoList = []);
  };
  (t.prototype = {
    defaults: {
      applyHighlight: !0,
      dynamicsForExclusives: !0,
      moveInputsInsideLabels: !0,
      showTimers: !1,
      StyleDropdowns: !1,
      NextAlignment: "",
      NextSize: "",
      HideProgressBar: !1,
      BodyFontSize: "",
      Accessibility: !1,
      ProgressBarVersion: "classic",
    },
    init: function () {
      p.extend(this, this.defaults, this.metadata, { preventReady: !0 }),
        (this.QueueDef = []);
      try {
        (this.IgnoreResponsive = ["Grid", "GridOEClickFly", "MaxDiff"]),
          (this.templateFiles = {
            AutoComplete: [
              this.theFilePath.split("QuestionTemplates")[0] +
                "js/jquery-ui/1.11.1/jquery-ui.min.js",
            ],
            DragAndDrop: [this.theFilePath + "DragAndDrop/js/dragdrop.js"],
            InformationReview: [
              this.theFilePath + "InformationReview/js/pgwslider.min.js",
              this.theFilePath + "InformationReview/css/pgwslider.min.css",
            ],
            MobilePhone: [
              this.theFilePath + "MobilePhone/js/jquery.slimscroll.js",
            ],
            SmartPhone: [
              this.theFilePath + "SmartPhone/js/jquery.slimscroll.js",
            ],
            SmartPhoneGlobal: [
              this.theFilePath + "SmartPhoneGlobal/js/jquery.slimscroll.js",
              this.theFilePath + "SmartPhoneGlobal/js/plyr.js",
              this.theFilePath + "SmartPhoneGlobal/css/plyr.css",
            ],
            Slider: [
              this.theFilePath.split("QuestionTemplates")[0] +
                "js/jquery-ui/1.11.1/jquery-ui.min.js",
              this.theFilePath.split("QuestionTemplates")[0] +
                "css/jquery-ui/1.11.1/jquery-ui.min.css",
            ],
            MoviePlayer: [
              this.theFilePath + "MoviePlayer/css/video-js.css",
              this.theFilePath + "MoviePlayer/js/video.js",
              this.theFilePath + "MoviePlayer/js/ipsos.decoder.js",
            ],
            Avatar: [
              this.theFilePath + "Avatar/js/excanvas.js",
              this.theFilePath + "Avatar/js/jquery.jplayer.js",
              this.theFilePath + "Avatar/js/xdomain.js",
            ],
            ReputationModule: [
              this.theFilePath.split("QuestionTemplates")[0] +
                "js/jquery.event.move.js",
              this.theFilePath.split("QuestionTemplates")[0] +
                "js/jquery.event.swipe.js",
            ],
          });
      } catch (e) {}
      return this._general(), this;
    },
    _FormatErrorMessages: function (e, l) {
      var d = this,
        t =
          (e.find("table.mrQuestionTable").has(".mrErrorText"),
          e.find("table.mrQuestionTable .mrErrorText")),
        i = e.find("span.mrQuestionTable .mrErrorText"),
        s = e.find(".mrErrorText"),
        n = "",
        o = [];
      if (
        (d.showTimers && console.time("_FormatErrorMessages"),
        "GRID" != l.QType && t.length && ((i = t), (t = p(""))),
        s.not(t).each(function () {
          d.isIE7 ||
            p(
              "<span class='fa fa-exclamation-triangle'></span>&nbsp;"
            ).insertBefore(this),
            ("OE" != l.QType && "NUM" != l.QType && "DOUBLE" != l.QType) ||
              e.find(".mrEdit").addClass("has-error");
        }),
        t.each(function () {
          var e = p(this),
            t = e.closest("td,th"),
            i = p(".mrQuestionTable")
              .closest(".question-container")
              .find(".customJSONproperties")
              .text()
              .replace(/ /g, "");
          if (0 < t.find(".mrEdit").length)
            t.find("input.mrEdit").addClass("has-error");
          else if (0 < t.find("input:radio, input:checkbox").length) {
            var s = d.isIE7
                ? e.addClass("alert alert-danger alert-lg show")
                : "<i class='grid-top-error fa fa-arrow-circle-down'></i>",
              n = t.attr("id"),
              o = n.substr(0, n.length - 1),
              a = n.substr(n.length - 1, n.length),
              r = e
                .closest("table.mrQuestionTable")
                .find("[id='" + o + (a - 1) + "']");
            -1 == i.indexOf('"QTopHeaders":true')
              ? d.isIE7
                ? r.append(s)
                : r.addClass("grid-top-error-cell").prepend(s)
              : e.closest("td,th").addClass("grid-top-error-cell");
          } else
            d.isIE7
              ? p(this)
                  .addClass("alert alert-danger")
                  .css("padding-top", "0")
                  .css("padding-bottom", "0")
              : -1 == i.indexOf("GridCategoricalScale") &&
                t
                  .addClass("grid-left-error-cell")
                  .find(".mrQuestionText")
                  .prepend(
                    "<i class='grid-left-error fa fa-arrow-circle-right'></i>"
                  );
          d.isIE7 ||
            "GRID" != l.QType ||
            ((0 == t.find(".mrEdit").length ||
              (0 < t.find(".mrEdit").length &&
                0 == t.find("input:not(.mrEdit)").length)) &&
              e.remove());
        }),
        "GRID" == l.QType && d.Accessibility)
      ) {
        var a = e.find(".grid-top-error-cell, .grid-left-error-cell"),
          r = p("#error-message .mrErrorText");
        a.each(function () {
          if ("COL" == l.QOrientation && l.QTopHeaders)
            for (
              var e = p(this).attr("id"),
                t = e.substr(0, e.length - 1),
                i = e.substr(e.length - 1, e.length) - 1;
              0 <= i;
              i--
            ) {
              var s = p("[id='" + t + i + "']");
              if (s.length) {
                o.push(s.find(".mrQuestionText").text());
                break;
              }
            }
          else o.push(p(this).find(".mrQuestionText").text());
        }),
          r.length && r.html(r.html().replace(/{{answers}}/g, o.join(", ")));
      }
      p("body").on("change keyup", ".mrEdit.has-error", function () {
        p(this).removeClass("has-error");
      }),
        "GRID" != l.QType &&
          (i.each(function () {
            var e = p(this)
                .prev("span")
                .andSelf()
                .wrapAll(
                  '<div id="error-message" class="alert alert-danger show"></div>'
                )
                .parent(),
              t = e.closest(".answer-container");
            p(this).closest("span[id!='Cell.']").find("input.mrEdit").length &&
              theTd.find(".mrEdit").addClass("has-error"),
              t.find(".mrEdit").addClass("has-error"),
              (n = e.clone()),
              e.remove(),
              t.find(".mrSingle, .mrMultiple").on("change", function () {
                t.find(".mrEdit").removeClass("has-error");
              });
          }),
          n.length &&
            e
              .find(".mrQuestionTable")
              .closest(".question-container")
              .prepend(n)),
        d.showTimers && console.timeEnd("_FormatErrorMessages");
    },
    _MoveInputInLabel: function () {
      var e = this;
      e.showTimers && console.time("_MoveInputInLabel"),
        e.theLabels.each(function () {
          var e;
          1 == (e = p(this).siblings("input[class*='mr']")).length &&
            p(this)
              .addClass(
                "label-with-" + e.attr("class") + " highlight-me h-label"
              )
              .prepend(e);
        }),
        e.theLabels.find(".mrEdit").each(function () {
          var e = p(this),
            t = e.parent("label"),
            i = e.closest(".answer-container").find("label").eq(0);
          i.append(e.addClass("inlinemrEdit")),
            t.attr("for") != i.attr("for")
              ? t.remove()
              : t.addClass("labelDoNotRemove");
        }),
        p(".inlinemrEdit").click(function (e) {
          e.preventDefault();
        }),
        e.showTimers && console.timeEnd("_MoveInputInLabel");
    },
    _MoveGridContentInDiv: function () {
      var e = this;
      e.showTimers && console.time("_MoveGridContentInDiv"),
        e.tables.each(function () {
          if (0 == p("label:not('.labelDoNotRemove')", this).length) {
            var e = p(this)[0].outerHTML;
            void 0 !== e &&
              (p(this)[0].outerHTML = e
                .replace(/<div><\/div>/gi, "")
                .replace(
                  /(<input("[^"]*"|'[^']*'|[^'">])*>)/gi,
                  '<div class="grid-answer-div highlight-me h-div">$1</div>'
                ));
          }
        }),
        p(".mrQuestionTable").each(function () {
          p(".mrEdit:not('.inlinemrEdit')", this)
            .parent(".highlight-me")
            .removeClass("highlight-me");
        }),
        e.showTimers && console.timeEnd("_MoveGridContentInDiv");
    },
    _ProgressBarPercentage: function () {
      var e = p(".mrProgressText");
      1 < e.text().length &&
        (p(".progress-percentage").text(e.text()),
        e.text("100%" == e.text() ? "" : "."));
    },
    _DynamicHighlight: function () {
      var n = this;
      n.showTimers && console.time("_DynamicHighlight"),
        p("body").on("click", ".highlight-me.h-div .mrMultiple", function (e) {
          p(this).addClass("native-click");
        }),
        p("body").on("click", ".highlight-me.h-div", function () {
          var e = p(this),
            t = 0;
          p("input:radio:visible:not(:disabled)", e).each(function () {
            "hidden" != p(this).css("visibility") && t++;
          });
          var i = 0;
          if (
            (p("input:checkbox:visible:not(:disabled)", e).each(function () {
              "hidden" != p(this).css("visibility") && i++;
            }),
            t &&
              p("input:radio:first", e).prop("checked", !0).trigger("change"),
            i)
          ) {
            var s = p("input:checkbox:first", e);
            s
              .not(".native-click")
              .prop("checked", !s.prop("checked"))
              .trigger("change"),
              s.removeClass("native-click");
          }
          n._AnswerClicked(e, t, i, -1);
        }),
        p("body").on("click", ".highlight-me.h-label input", function (e) {
          1 == p(this).is(":visible") &&
            n._AnswerClicked(
              p(this).closest(".highlight-me.h-label"),
              -1,
              -1,
              -1,
              e.target.type
            );
        }),
        n.showTimers && console.timeEnd("_DynamicHighlight");
    },
    _DynamicForInputs: function () {
      var d = this;
      p(this);
      d.showTimers && console.time("_DynamicForInputs"),
        d.mrQuestionTable.each(function () {
          p(this);
          var i = [];
          p.each(p("input.mrSingle"), function () {
            var e = this.name;
            if (p.inArray(e, i) < 0) {
              i.push(e);
              var t = p("input.mrSingle[name='" + e + "']");
              t.data("radioAllGroupInputs", t);
            }
          }),
            p.browser.msie || navigator.userAgent.match(/Trident.*rv\:11\./)
              ? p("span[style]")
                  .filter(function () {
                    var e = p(this).get(0).style.color;
                    return (
                      (-1 < e.indexOf("rgb(102, 102, 103)") ||
                        -1 < e.indexOf("666667")) &&
                      p(this)
                    );
                  })
                  .addClass("apply-exclusive-logic")
              : p("span[style*='666667']").addClass("apply-exclusive-logic"),
            p(".apply-exclusive-logic").each(function () {
              d.showTimers &&
                console.time("Mark exclusive/non exclusive elements");
              var e = p(this);
              if (d.dynamicsForExclusives)
                if (e.parent().is("td")) {
                  var t = e.parent().attr("id").split("."),
                    o = e.closest(".mrQuestionTable");
                  o.find(
                    "td[id^='" +
                      t[0] +
                      "." +
                      t[1] +
                      ".'], td[id$='." +
                      t[2] +
                      "']"
                  )
                    .find("input:checkbox")
                    .each(function () {
                      var e = p(this),
                        t = e.attr("name"),
                        i = e.attr("value"),
                        s = t.substring(0, t.lastIndexOf(i)),
                        n = o.find("input[name^='" + s + "']").not(e);
                      d._ProcessTheExclusives(e, n);
                    });
                } else if (e.parent().is("label")) {
                  var i = (e = p(this)).closest(".question-container"),
                    s = e.siblings("input.mrMultiple");
                  if (void 0 !== s.attr("name")) {
                    var n = s.attr("name"),
                      a = s.attr("value"),
                      r = n.substring(0, n.lastIndexOf(a)),
                      l = p("input:checkbox[name^='" + r + "']", i).not(s);
                    d._ProcessTheExclusives(s, l);
                  }
                }
              d.showTimers &&
                console.timeEnd("Mark exclusive/non exclusive elements");
            });
        }),
        d.showTimers && console.timeEnd("_DynamicForInputs");
    },
    _ProcessTheExclusives: function (e, t) {
      e
        .addClass("exclusive-element")
        .closest(".highlight-me")
        .removeClass("non-exclusive-element")
        .addClass("exclusive-element"),
        t
          .not(".exclusive-element")
          .addClass("non-exclusive-element")
          .closest(".highlight-me")
          .addClass("non-exclusive-element"),
        e.data("checkboxComplementaryElements", t),
        t.not(".exclusive-element").length &&
          t
            .not(".exclusive-element")
            .data(
              "checkboxExclusiveInputs",
              void 0 === e.data("checkboxExclusiveInputs")
                ? e
                : t
                    .not(".exclusive-element")
                    .data("checkboxExclusiveInputs")
                    .add(e)
            );
    },
    _AnswerClicked: function (e, t, i, s, n) {
      this.showTimers && console.time("AnswerClicked");
      e.closest(".mrQuestionTable");
      var o = !1,
        a = !1;
      if (
        ((void 0 !== t && -1 != t) ||
          ((t = 0),
          p("input.mrSingle:visible:not(:disabled):checked", e).each(
            function () {
              "hidden" != p(this).css("visibility") && t++;
            }
          ),
          e.hasClass("label-with-mrSingle") &&
            p("input.mrEdit:visible:not(:disabled)", e).length &&
            (o = !0)),
        (void 0 !== i && -1 != i) ||
          ((i = 0),
          p("input:checkbox:visible:not(:disabled):checked", e).each(
            function () {
              "hidden" != p(this).css("visibility") && i++;
            }
          ),
          e.hasClass("label-with-mrMultiple") &&
            p("input.mrEdit:visible:not(:disabled)", e).length &&
            (a = !0)),
        0 < t || o)
      ) {
        var r = p("input:radio", e).prop("checked", !0).trigger("change");
        r
          .data("radioAllGroupInputs")
          .not(r)
          .trigger("change")
          .parent(".cellCheckedBackground")
          .removeClass("cellCheckedBackground")
          .find(".mrEdit")
          .otherBehaviour(),
          e
            .addClass("cellCheckedBackground")
            .find(".mrEdit")
            .otherBehaviour({ checked: !0 });
      } else if (0 < i || a) {
        var l = p("input:checkbox", e);
        a && "text" == n && l.prop("checked", !0).trigger("change"),
          l.is(":checked")
            ? (e.hasClass("non-exclusive-element")
                ? l
                    .data("checkboxExclusiveInputs")
                    .prop("checked", !1)
                    .closest(".cellCheckedBackground")
                    .removeClass("cellCheckedBackground")
                    .find("input.mrEdit")
                    .otherBehaviour()
                : e.hasClass("exclusive-element") &&
                  l
                    .data("checkboxComplementaryElements")
                    .prop("checked", !1)
                    .trigger("change")
                    .closest(".cellCheckedBackground")
                    .removeClass("cellCheckedBackground")
                    .find("input.mrEdit")
                    .otherBehaviour(),
              e
                .addClass("cellCheckedBackground")
                .find(".mrEdit")
                .otherBehaviour({ checked: !0 }))
            : e
                .closest(".cellCheckedBackground")
                .removeClass("cellCheckedBackground")
                .find("input.mrEdit")
                .otherBehaviour();
      } else
        e.closest(".cellCheckedBackground").removeClass(
          "cellCheckedBackground"
        );
      this.showTimers && console.timeEnd("AnswerClicked");
    },
    _general: function () {
      var s = this;
      s.showTimers && console.time("_general"),
        p("body").addClass("progress-bar-" + s.ProgressBarVersion),
        p("#navigation-bar").addClass("type-" + s.ProgressBarVersion),
        p(".question-container").each(function () {
          try {
            var e = p(this)
                .find(".customJSONproperties")
                .html()
                .replace(/%3C/g, "<")
                .replace(/%3E/g, ">"),
              t = p.parseJSON(e);
          } catch (e) {
            s.showTimers && tell(e);
          }
          e && s._FormatErrorMessages(p(this), t);
        }),
        s.moveInputsInsideLabels && s._MoveInputInLabel(),
        s._MoveGridContentInDiv(),
        s._ProgressBarPercentage(),
        s.showTimers && console.time("remove focus"),
        p("body")
          .on("keypress keydown", function (e) {
            if (!s.Accessibility) {
              if (p(e.target).is("input.mrEdit:text")) return 13 != e.keyCode;
              if (!p(e.target).is("textarea")) return 13 != e.keyCode;
            }
          })
          .on(
            "keypress keydown",
            "input:not(.mrEdit):not(.freeType),select,a",
            function (e) {
              return s.Accessibility
                ? !!p(e.target).is("a") || 13 != e.keyCode
                : 13 != e.keyCode && 32 != e.keyCode;
            }
          )
          .on("keypress keydown", ".freeType", function (e) {
            return 13 != e.keyCode;
          })
          .on("selectstart contextmenu", "input:not(.mrEdit)", function () {
            return "real" != s.StudyData.IDType;
          })
          .off("selectstart", "input:not(.mrEdit)", function () {
            p(this).on("selectstart", function () {
              return "real" != s.StudyData.IDType;
            });
          });
      try {
        "real" == s.StudyData.IDType && p("body").addClass("prevent-select");
      } catch (e) {}
      s.showTimers && console.timeEnd("remove focus"),
        s.showTimers && console.time("Initial highlight - for refresh"),
        p(".highlight-me input:checked")
          .closest(".highlight-me")
          .addClass("cellCheckedBackground"),
        s.showTimers && console.timeEnd("Initial highlight - for refresh"),
        s.showTimers && console.time("Mobile fixed position"),
        "ontouchstart" in i.documentElement ||
          s.isWirelessDevice ||
          p("#navigation-bar").css({ position: "fixed" }),
        s.showTimers && console.timeEnd("Mobile fixed position"),
        s.applyHighlight && s._DynamicHighlight(),
        s._DynamicForInputs(),
        s._formatNavigationBar(),
        s._styleSelectInputs(),
        s.HideProgressBar && p("body").addClass("hide-progress-bar"),
        "" != s.BodyFontSize &&
          p("body").addClass("font-size-" + s.BodyFontSize),
        "ontouchstart" in i.documentElement
          ? p("body").addClass("touch")
          : p("body").addClass("no-touch"),
        s.Accessibility && p("body").addClass("accessibility"),
        p("body").addClass(
          "direction-" + p("body").css("direction").toLowerCase()
        ),
        (s.direction = p("body").css("direction").toLowerCase()),
        p("img.lightbox, a.lightbox")
          .not(".alreadyLightbox")
          .each(function () {
            p(this).lightBox(), p(this).addClass("alreadyLightbox");
          }),
        p.browser.msie && 8 == this.browserVersion && s._ie8Enhancements(),
        p("body")
          .on("everythingReady fakeReady", function (e) {
            p("body").trigger("beforeEverythingReady"),
              s.theLoaderAnimation.remove(),
              s._thingsAreReady.call(s, e),
              s.showTimers && console.timeEnd("_general"),
              p("body").trigger("afterEverythingReady");
          })
          .on("beforeEverythingReady", function (e) {
            s._onBeforeEverythingReady();
          })
          .on("afterEverythingReady", function (e) {
            s._onAfterEverythingReady();
          }),
        s._addLoader(),
        s._HandleQuestions(),
        "test" == s.StudyData.IDType &&
          p
            .when(
              p.getScript(
                this.theFilePath.split("QuestionTemplates")[0] +
                  "js/axios.min.js"
              ),
              p.getScript(
                this.theFilePath.split("QuestionTemplates")[0] +
                  "js/polyfill-promise.js"
              ),
              p.Deferred(function (e) {
                p(e.resolve);
              })
            )
            .done(function () {
              for (var e = "", t = "", i = 0; i < s.CustomQuestions.length; i++)
                void 0 !==
                  s.CustomQuestions[i.toString()].settings.IISJsonBuilderId &&
                  (e =
                    s.CustomQuestions[i.toString()].settings.IISJsonBuilderId),
                  (t =
                    t +
                    (0 < t.length ? "," : "") +
                    s.CustomQuestions[i.toString()].settings.questionLook);
              -1 != r.location.href.indexOf("staging01.ipsosinteractive.com") ||
                r.location.href.indexOf("surveys.ipsosinteractive.com");
              0 < e.length &&
                -1 != r.location.href.indexOf("ipsosinteractive") &&
                s._HandleLogging(e, t);
            });
    },
    _onBeforeEverythingReady: function () {
      this._handleToDoList();
    },
    _onAfterEverythingReady: function () {},
    _handleToDoList: function () {
      for (var e = 0; e < this.toDoList.length; e++) {
        var t = this.toDoList[e];
        t.func.apply(this, t.params);
      }
      this.toDoList = [];
    },
    _ie8Enhancements: function () {
      p(".mrQuestionTable tr:nth-child(even)").addClass("even"),
        p(".mrQuestionTable tr:nth-child(odd)").addClass("odd");
    },
    _styleSelectInputs: function () {
      this.StyleDropdowns && p("select.mrDropdown").addClass("enhanced-look");
    },
    _formatNavigationBar: function () {
      "" !== this.NextAlignment &&
        p("#nav-controls").addClass("nav-" + this.NextAlignment.toLowerCase()),
        "" !== this.NextSize &&
          p("#nav-controls .mrNext").css("width", this.NextSize.toLowerCase());
    },
    _hideUrlBar: function () {
      p(r).on("load", function () {
        setTimeout(function () {
          r.scrollTo(0, 1);
        }, 0);
      }),
        p.browser.safari ? (bodyelem = p("body")) : (bodyelem = p("html,body")),
        setTimeout(function () {
          p("#error-message").length &&
            bodyelem.animate(
              {
                scrollTop:
                  p("#error-message:first").offset().top -
                  p(".navbar-header").height() -
                  10,
              },
              500
            );
        }, 500);
    },
    _thingsAreReady: function (e) {
      if (this.preventReady && "undefined" != typeof everythingReady)
        return (this.preventReady = !1), everythingReady(), !1;
      if (
        (this._hideUrlBar(),
        p(".panel, .footer").removeClass("invisible"),
        p.browser.msie && 8 == parseInt(p.browser.version))
      ) {
        var t = p("link[href$='style.css']");
        t[0].href = t[0].href;
      }
    },
    _addClassOnResize: function (e, t, i) {
      p(r)
        .on("resize", function () {
          p(r).width() < i ? e.addClass(t) : e.removeClass(t);
        })
        .trigger("resize");
    },
    _applyResponsiveGrids: function (e, t) {
      var i = e.find("table.mrQuestionTable");
      if (
        -1 != p.inArray(t.questionLook, this.IgnoreResponsive) ||
        t.DisableResponsiveGrids
      )
        return !1;
      if (!p("body").hasClass("everythingReady"))
        return (
          this.toDoList.push({
            func: this._applyResponsiveGrids,
            params: [e, t],
          }),
          !1
        );
      if (
        !(
          t.QTopHeaders ||
          t.QSideHeaders ||
          1 == t.GridBipolar ||
          t.DisableSmartGrids ||
          this.DisableSmartGrids
        )
      ) {
        var s = t.maxFirstCell || 300;
        i.find("td:eq(0)").width(9999).css("min-width", "9999px");
        var n = maxLoop(
          i
            .find("tr:gt(0)")
            .find(".mrQuestionText")
            .map(function () {
              p(this).css("display", "inline-block");
              var e = p(this).width();
              return p(this).css("display", ""), e;
            })
            .toArray()
        );
        (n += 20) < s && (s = n);
        var o = maxLoop(
          i
            .find("tr:eq(0)")
            .find("td:gt(0)")
            .map(function () {
              return p(this).outerWidth();
            })
        );
        o < t.ForceColumnWidth && (o = t.ForceColumnWidth),
          i
            .find("tr:eq(0)")
            .find("td:gt(0)")
            .width(o)
            .css("min-width", o + "px");
        var a = "left" == t.FreezeType ? o : s;
        i
          .find("td:eq(0)")
          .width(a)
          .css("min-width", a + "px"),
          t.flipTables ||
            i
              .find("tr:gt(0)")
              .find("td:eq(0)")
              .css("max-width", s + "px");
      }
      p(r)
        .on("resize", function () {
          var e = p("#navigation-bar").width() - p(".container").width() + 100;
          p(r).width() < i.width() + e
            ? i.closest("span").addClass("table-responsive")
            : i.closest("span").removeClass("table-responsive");
        })
        .trigger("resize");
    },
    _flipTables: function (e, t) {
      t = t || 600;
      var i = e.find("table.mrQuestionTable");
      this._addClassOnResize(i, "responsiveTable", t || i.width());
      var s = i
          .find("tr:eq(0)")
          .find(".mrGridQuestionText,.mrGridCategoryText")
          .map(function () {
            return p(this).text();
          }),
        n = "tr:gt(0)";
      0 < i.find("tr:eq(0)").find("input").length &&
        (i.find("tr:eq(0)").addClass("hasInputToShow"), (n = "tr")),
        0 < i.find("tr:eq(0)").find("select").length &&
          (i.find("tr:eq(0)").addClass("hasSelectToShow"),
          i.find("tr:eq(0)").before("<tr></tr>"),
          (n = "tr")),
        i.find(n).each(function () {
          for (var e = 0; e < s.length; e++)
            p(this)
              .find("td")
              .eq(e + 1)
              .find("div")
              .eq(0)
              .attr("data-title", p.trim(s[e]));
        });
    },
    _addLoader: function () {
      var e = "",
        t = i.createElement("p").style;
      (e += "\t<div class='iisSharky-loading-animation'>"),
        (e +=
          "transition" in t ||
          "WebkitTransition" in t ||
          "MozTransition" in t ||
          "msTransition" in t ||
          "OTransition" in t
            ? "\t\t<div class='loader'><div></div><div></div><div></div></div>"
            : "\t\t<div class='loader-fallback'><img src='https://cdn.ipsosinteractive.com/deploy/templates/iis-fish-template/img/basic/loading-fallback.gif' alt='loading'></div></div></div>"),
        (e += "\t</div>"),
        p("body").append(e),
        (this.theLoaderAnimation = p(".iisSharky-loading-animation"));
    },
    _HandleQuestions: function () {
      var s = this;
      if (
        (s.showTimers && console.time("_HandleQuestions"),
        (s.questionTypes = []),
        (s.CustomQuestions = p(".question-container")
          .find(".customJSONproperties")
          .map(function () {
            try {
              var t = p(this).html().replace(/%3C/g, "<").replace(/%3E/g, ">"),
                i = p.parseJSON(t);
              void 0 !== i.questionLook &&
                -1 == p.inArray(i.questionLook, s.questionTypes) &&
                (s.questionTypes.push(
                  i.CustomPath
                    ? i.questionLook + "[###]" + i.CustomPath
                    : i.questionLook
                ),
                void 0 !== i.AdditionalQuestion &&
                  -1 ==
                    p.inArray(
                      i.AdditionalQuestion.questionLook,
                      s.questionTypes
                    ) &&
                  s.questionTypes.push(
                    i.AdditionalQuestion.CustomPath
                      ? i.AdditionalQuestion.questionLook +
                          "[###]" +
                          i.AdditionalQuestion.CustomPath
                      : i.AdditionalQuestion.questionLook
                  ));
              var e = p(this)
                .closest(".question-container")
                .addClass(
                  "QType-" +
                    i.QType +
                    " QSubType-" +
                    i.QSubType +
                    " QOrientation-" +
                    i.QOrientation +
                    " QTopHeaders-" +
                    i.QTopHeaders +
                    " QSideHeaders-" +
                    i.QSideHeaders
                );
              return (
                s._GeneralQuestionFormating(e, i),
                { type: i.questionLook, settings: i, parent: e }
              );
            } catch (e) {
              "test" == s.StudyData.IDType && alert("INVALID JSON: " + t),
                (i = {});
            }
          })),
        (s.whatToLoad = []),
        void 0 !== s.metadata.AdditionalQuestions &&
          0 < Object.keys(s.metadata.AdditionalQuestions).length)
      )
        for (var e in s.metadata.AdditionalQuestions)
          -1 == p.inArray(e, s.questionTypes) && s.questionTypes.push(e);
      0 < p(".iis-tooltip").length && s.questionTypes.push("Tooltip");
      for (var t = 0; t < s.questionTypes.length; t++) {
        var i = s.questionTypes[t],
          n = s.theFilePath,
          o = i;
        -1 != i.indexOf("[###]") &&
          ((n = (i = i.split("[###]"))[1]), (o = i[0])),
          s.whatToLoad.push(n + o + "/css/" + o + ".css"),
          s.whatToLoad.push(n + o + "/js/" + o + ".js"),
          void 0 !== s.templateFiles[o] &&
            (s.whatToLoad = s.whatToLoad.concat(s.templateFiles[o]));
      }
      (s.Questions = []),
        s._loadFiles(s.whatToLoad, function () {
          s.CustomQuestions.map(function () {
            if (
              (s.showTimers && console.time(this.type + " function"),
              void 0 !== this.type)
            ) {
              var e = p.Deferred();
              if (
                (s.QueueDef.push(e),
                (this.settings.Deffered = e),
                (this.settings.theFilePath = s.theFilePath),
                s.Questions.push(
                  new r[this.type](
                    this.settings,
                    this.parent,
                    s._passOnObject()
                  )
                ),
                void 0 !== this.settings.AdditionalQuestion)
              ) {
                e = p.Deferred();
                s.QueueDef.push(e),
                  (this.settings.AdditionalQuestion.Deffered = e),
                  (this.settings.AdditionalQuestion.AdditionalQuestion = !0),
                  (this.settings.AdditionalQuestion.theFilePath =
                    s.theFilePath),
                  s.Questions.push(
                    new r[this.settings.AdditionalQuestion.questionLook](
                      this.settings.AdditionalQuestion,
                      this.parent,
                      s._passOnObject()
                    )
                  );
              }
            }
            s.showTimers && console.timeEnd(this.type + " function");
          }),
            p(".question-container").map(function () {
              if (
                void 0 !== s.metadata.AdditionalQuestions &&
                0 < Object.keys(s.metadata.AdditionalQuestions).length
              )
                for (var e in s.metadata.AdditionalQuestions) {
                  var t = p.Deferred(),
                    i = s.metadata.AdditionalQuestions[e];
                  s.QueueDef.push(t),
                    (i.Deffered = t),
                    (i.theFilePath = s.theFilePath),
                    void 0 !== r[e]
                      ? s.Questions.push(
                          new r[e](i, p(this), s._passOnObject())
                        )
                      : console.log(
                          "You used a non-existent question Type: ",
                          e
                        );
                }
            }),
            s._loadFonts(),
            p.whenWithProgress(s.QueueDef).then(
              function () {
                s.FirstTimeScroll &&
                  "rtl" == s.direction &&
                  p(".table-responsive").scrollLeft(999999),
                  (s.FirstTimeScroll = !1),
                  s.Accessibility && s._accessibility(),
                  p("body")
                    .addClass("everythingReady")
                    .trigger("everythingReady"),
                  p(r).trigger("resize"),
                  -1 != p.inArray("Tooltip", s.questionTypes) &&
                    new Tooltip(s.metadata.TooltipProperties);
              },
              function () {},
              function (e, t, i) {
                s.showTimers &&
                  console.log(
                    "Promise " + i + " . Status:" + e + " of " + t + " finished"
                  );
              }
            ),
            0 == s.QueueDef.length &&
              (p("body").addClass("everythingReady").trigger("everythingReady"),
              p(r).trigger("resize"));
        }),
        s.showTimers && console.timeEnd("_HandleQuestions");
    },
    _loadFonts: function () {
      var t = this,
        e = p.Deferred();
      t.QueueDef.push(e), (t.fontDeffered = e);
      var i = new FontLoader(
        ["robotolight", "robotoregular", "robotobold"],
        {
          fontLoaded: function (e) {
            t.showTimers && console.log("font loaded: " + e.family);
          },
          complete: function (e) {
            null !== e
              ? t.showTimers &&
                (console.log(e.message), console.log(e.notLoadedFonts))
              : t.showTimers && console.log("all fonts were loaded"),
              t.fontDeffered.resolve(t);
          },
        },
        2e3
      );
      try {
        i.loadFonts();
      } catch (e) {
        t.fontDeffered.resolve(t);
      }
    },
    _GeneralQuestionFormating: function (e, t) {
      var i = this;
      if ("GRID" == t.QType) {
        t.flipTables
          ? (i._flipTables(e, t.flipTablesWidth), i._applyResponsiveGrids(e, t))
          : "GridProgressive" != t.questionLook &&
            i._applyResponsiveGrids(e, t);
        var s = e.find(".mrQuestionTable");
        if (
          (s.addClass("table-bordered"),
          (!t.QTopHeaders && !t.QSideHeaders) ||
            ("SA" != t.QSubType && "MA" != t.QSubType) ||
            s.addClass("table-bordered"),
          i.StudyProperties.GridAlternateColorRow &&
            "ROW" == t.QOrientation &&
            !0 !== t.NoStrippes &&
            s.addClass("table-striped-row"),
          !t.QSideHeaders &&
            i.StudyProperties.GridAlternateColorCol &&
            "COL" == t.QOrientation &&
            !0 !== t.NoStrippes &&
            s.addClass("table-striped-col"),
          i.StudyProperties.GridAlternateColors)
        ) {
          for (
            var n = i.StudyProperties.GridAlternateColors,
              o = ["odd", "even"],
              a = Math.min(n.length, 2),
              r = "",
              l = -1;
            ++l < a;

          )
            (r +=
              ".table-striped-row > tbody > tr:nth-child(" +
              o[l] +
              ") > td{ background-color: " +
              n[l] +
              "; }"),
              (r +=
                ".table-striped-col > tbody > tr:nth-child(" +
                o[l] +
                ") > td{ background-color: " +
                n[l] +
                "; }");
          p("head link[rel='stylesheet']")
            .last()
            .after("<style>" + r + "</style>");
        }
        "COL" == t.QOrientation && s.addClass("table-vertical-dividers");
      }
      if ("NUM" == t.QType || "NUM" == t.QSubType) {
        var d = e.find(".mrEdit");
        try {
          d.attr("type", "number"),
            "NUM" == t.QType || "NUM" == t.QSubType
              ? d.attr("pattern", "[0-9]*")
              : d.attr("step", "any");
        } catch (e) {}
      }
      var h = e.find(".question-controls-container"),
        c = h.find(".picture-left"),
        u = h.find(".picture-right");
      0 < c.html().length && 0 < p.trim(c.html()).length && c.addClass("show"),
        0 < u.html().length &&
          0 < p.trim(u.html()).length &&
          u.addClass("show"),
        (c.hasClass("show") || u.hasClass("show")) &&
          h.addClass("has-side-content"),
        ((-1 != p.inArray(t.QType, i.StudyProperties.StickyQuestionTextTypes) &&
          !1 !== t.StickyQuestionText) ||
          !0 === t.StickyQuestionText) &&
          "GridProgressive" != t.questionLook &&
          new StickyHeaderObj(e, i.metadata.StickyProperties),
        t.inlineLabels && p(e).addClass("has-inline-labels");
    },
    _loadFiles: function (e, t) {
      for (
        var i = e.length,
          s = function () {
            0;
          },
          n = [],
          o = 0;
        o < i;
        o++
      )
        -1 != e[o].indexOf(".css")
          ? p("head").append(
              "<link rel='stylesheet' type='text/css' href='" +
                e[o] +
                "?" +
                new Date().getTime() +
                "' />"
            )
          : n.push(p.getScript(e[o], s));
      p.when.apply(null, n).then(function () {
        t && t();
      });
    },
    _accessibility: function () {
      0 < p("#error-message").length && p("#error-message").focus();
      var e = p(".mrQuestionTable"),
        t = e.find("legend");
      0 < t.length &&
        (t.each(function () {
          p(this).closest(".answer-container").addClass("hasLegend");
        }),
        e.find(".hasLegend").each(function () {
          var e = p(this);
          (e = e.add(p(this).nextUntil(".hasLegend"))).wrapAll("<fieldset />");
        })),
        e
          .find("tr:gt(0)")
          .find("td:gt(0):has(.mrQuestionText)")
          .closest("tr")
          .attr("aria-hidden", !0),
        e.find(".mrEdit").closest("tr").removeAttr("aria-hidden");
    },
    _passOnObject: function () {
      var e = {};
      return (
        (e.studyJSON = p("body").data("studyJSON")),
        (e.StudyProperties = e.studyJSON.StudyProperties),
        (e.LangCode = "en"),
        void 0 !== e.StudyProperties &&
          (e.StudyProperties &&
            e.StudyProperties.LangCode &&
            (e.LangCode = e.StudyProperties.LangCode.toLowerCase()),
          (e.FishVersion = e.StudyProperties.FishVersion)),
        "undefined" != typeof i18nFish &&
          (e.templateTexts = i18nFish[e.LangCode]
            ? i18nFish[e.LangCode]
            : i18nFish.en),
        e
      );
    },
    _HandleLogging: function (t, i) {
      var s = this,
        n = JSON.parse(sessionStorage.getItem("SessionStorageForLogging")) || {
          data: {},
          logId: "",
          surveyId: p('input[name="I.Project"]').val(),
        };
      void 0 === n.data[t] && (n.data[t] = {}),
        (n.data[t][p('input[name="I.SavePoint"]').val()] = i),
        "" == n.logId
          ? axios({
              method: "GET",
              url:
                "https://iisexport.ipsosinteractive.com/IISLoggerAPI/api/projects/" +
                n.surveyId,
              headers: {
                Accept: "application/json",
                "Cache-Control": "no-cache",
              },
            })
              .then(function (e) {
                axios({
                  method: "GET",
                  url:
                    "https://iisexport.ipsosinteractive.com/IISLoggerAPI/api/projects/" +
                    n.surveyId +
                    "/logs?AppId=CFE61B4C-D510-4E5E-9370-545FD741F504",
                  headers: {
                    Accept: "application/json",
                    "Cache-Control": "no-cache",
                  },
                })
                  .then(function (e) {
                    0 < e.data.length
                      ? ((n.data = JSON.parse(e.data[0].data)),
                        (n.data[t][p('input[name="I.SavePoint"]').val()] = i),
                        (n.logId = e.data[0].id),
                        sessionStorage.setItem(
                          "SessionStorageForLogging",
                          JSON.stringify(n)
                        ),
                        s._CreateLog("PUT", n))
                      : s._CreateLog("POST", n);
                  })
                  .catch(function () {
                    s._CreateLog("POST", n);
                  });
              })
              .catch(function (e) {
                axios({
                  method: "POST",
                  url: "https://iisexport.ipsosinteractive.com/IISLoggerAPI/api/projects/",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                  },
                  data: { Id: n.surveyId },
                }).then(function (e) {
                  s._CreateLog("POST", n);
                });
              })
          : axios({
              method: "GET",
              url:
                "https://iisexport.ipsosinteractive.com/IISLoggerAPI/api/projects/" +
                n.surveyId +
                "/logs/" +
                n.logId,
              headers: {
                Accept: "application/json",
                "Cache-Control": "no-cache",
              },
            }).then(function (e) {
              (n.data = JSON.parse(e.data.data)),
                (n.data[t][p('input[name="I.SavePoint"]').val()] = i),
                (n.logId = e.data.id),
                sessionStorage.setItem(
                  "SessionStorageForLogging",
                  JSON.stringify(n)
                ),
                s._CreateLog("PUT", n);
            });
    },
    _CreateLog: function (e, t) {
      var i =
        -1 != r.location.href.indexOf("staging01.ipsosinteractive.com")
          ? "Staging01"
          : -1 != r.location.href.indexOf("surveys.ipsosinteractive.com")
          ? "Production01"
          : "Other";
      axios({
        method: e,
        url:
          "https://iisexport.ipsosinteractive.com/IISLoggerAPI/api/projects/" +
          t.surveyId +
          "/logs/" +
          t.logId,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        data: {
          Data: JSON.stringify(t.data),
          AppId: "CFE61B4C-D510-4E5E-9370-545FD741F504",
          Platform: i,
        },
      }).then(function (e) {
        (t.data = JSON.parse(e.data.data)),
          (t.logId = e.data.id),
          sessionStorage.setItem("SessionStorageForLogging", JSON.stringify(t));
      });
    },
  }),
    (p.whenWithProgress = function (t) {
      for (var i = 0, s = p.Deferred(), e = 0; e < t.length; e++)
        t[e].done(function (e) {
          s.notify(++i, t.length, e.questionLook);
        });
      return (
        jQuery.when.apply(jQuery, t).done(function () {
          s.resolveWith(null, arguments);
        }),
        s.promise()
      );
    }),
    (t.defaults = t.prototype.defaults),
    p(i).ready(function () {
      new t().init();
    });
})(jQuery, window, document);
