//V2.2 - 19/05/2025

function BootstrapFront(options) {
  options = options || {};

  //Default values
  this.defaults = {
    index: 1,
    tA: "#_Q0",
    pA: true,
    tS: true,
    hP: true,
    rF: true,
    fR: true,
    bW: true,
    rtype: "0",
    sid: "000",
    respid: "0000",
    locale: "00",
    surveyid: "00000",
    special_mod: false,
    mini: false,
    idtype: "n/a",
    descriptive: false,
    limited: false,
    questiontype: "",
    devicetype: "",
  };

  var member;
  for (member in options) {
    if (
      options.hasOwnProperty(member) &&
      this.defaults.hasOwnProperty(member)
    ) {
      this.defaults[member] = options[member];
    }
  }

  /*$('textarea[name$="DGScriptLoad"]').val('1');
	window.setTimeout( function() {
		//Search for previous data
		var WinRealName = window.name.split("DGN")[0]
		var DGSession = window.name.split("DGN")[1];
		
		//var lastQID_temp = DGSession.split('"qid":')[1];
		//var lastQID = lastQID_temp.split(",")[0];
	
		if ( DGSession != "" && DGSession != null && DGSession != undefined && DGSession )
		{
			$('textarea[name$="DGScriptLoad"]').val('2');
			//Send data from previous question
			$.ajax({
				 url: "https://DGApi.ipsosinteractive.com/dataguard/",
				 method: "POST",
				 crossDomain: true,
				 headers: {
					  "accept": "application/json",
					  "Access-Control-Allow-Origin":"*"
				 },
				 contentType: "application/json",
				 data: DGSession,
				 success: function(result) {
					 $('textarea[name$="DGScriptLoad"]').val('3');
					  //alert('Success: '+DGSession);
				 },
				 fail: function(result) {
					 $('textarea[name$="DGScriptLoad"]').val('4');
					  //alert("Error: "+DGSession);
				 }
			});
			//Clean session
			window.name = WinRealName;
		}
	},10);
	
	//Limited
	if ( defaults.limited == true )
		return;*/

  //Output variables
  var RA_paste = 0;
  var RA_garbage = false;
  var RA_toofastWords = false;
  var RA_toofastChars = false;
  var RA_bot = false;
  var RA_reactedTooFast = false;
  var RA_badWord = false;
  var RA_Notfocused = true;
  var RA_focusReaction = false;
  var RA_checks = false;
  var RA_checkFocus = false;
  var RA_fileUpload = false;
  var gibberishScore = 0;
  var RA_translated = false;
  var RA_localtime = "";

  //Globals
  var RA_textArea = $(defaults.tA);
  var RA_nrOfChars = 0;
  var RA_nrOfWords = 0;
  var RA_prevChars = 0;
  var RA_prevWords = 0;
  var RA_OKtoWrite = false;
  var RA_tempText = "";
  var RA_lang = $("html").prop("lang");
  var RA_debugger = false;
  var initial_policy = "";
  var initial_text = "";
  var dimensions_error = false;

  //If error and OE full
  if (defaults.mini == false) {
    if (
      document.querySelectorAll("#error-message").length > 0 &&
      $(RA_textArea).val().length > 0
    )
      dimensions_error = true;
  }

  initial_policy = $("ul.list-inline li").eq(3).find("a").html();
  initial_text = $("#question .mrQuestionText").eq(0).text();

  //Globals for speeders
  var specialModule = defaults.special_mod;
  var cooldown = false;
  var nrOfClicks = 0;
  var nrOfActions = 0;
  var nrOfStrokes = 0;
  var nrOfChars = 0;
  var pageTimer = 0;
  var pageTimer_fast = 0;
  var averageClickTime = 0;
  var charsOnPage = 0;
  var charsOnAnswer = 0;
  var brackets = "";

  var KeyUniqueVal = Array();
  var KeyRatio = Array();
  var KeyBot = "";

  //Extended Globals
  var keybinds = Array();
  var nrblurs = 0;

  //Blurs
  $(window).blur(function () {
    nrblurs++;
  });

  //Get client time
  RA_localtime = getLocalTime();

  //SPEEDERS PART

  //Locals
  var clickTimeArray = Array();
  var clickTimeArray2 = Array();
  var clickXArray = Array();
  var clickYArray = Array();

  //-----------------------------------------------Page timer
  window.setInterval(function () {
    if ($(".loader").length == 0) {
      pageTimer += 100;

      if (RA_debugger == false) {
        var allow = 100;
        var start = +new Date();
        debugger;
        var end = +new Date();
        if (isNaN(start) || isNaN(end) || end - start > allow)
          RA_debugger = true;
      }
    }
  }, 100);

  window.setInterval(function () {
    if ($(".loader").length == 0) {
      pageTimer_fast += 10;
    }
  }, 10);

  //Key times
  var keyTimes = new Array();

  //Mouse movement
  var xMonitor = new Array();
  var yMonitor = new Array();
  var ballisticFlag = false;
  var teleportFlag = false;
  var hasTouchScreen = false;

  //Temporary
  var mbx = new Array();
  var mby = new Array();

  window.setInterval(function () {
    if (
      navigator.numberOfTouchPoints > 0 ||
      navigator.maxTouchPoints > 0 ||
      "ontouchstart" in window
    )
      hasTouchScreen = true;
  }, 1000);

  document.addEventListener("mousemove", (event) => {
    var mX = event.clientX;
    var mY = event.clientY;
    if (
      mX > 50 &&
      mY > 50 &&
      mX < window.innerWidth - 50 &&
      mY < window.innerHeight - 50
    ) {
      xMonitor.push(event.clientX);
      yMonitor.push(event.clientY);
    } else {
      xMonitor = [];
      yMonitor = [];
    }
  });

  window.setInterval(function () {
    if (checkMovementType(xMonitor, yMonitor) == 2) {
      ballisticFlag = true;
    }
    var tempX = xMonitor[xMonitor.length - 1];
    var tempY = yMonitor[yMonitor.length - 1];

    //Temporary
    mbx.push(xMonitor);
    mbx.push("#");
    mby.push(yMonitor);
    mby.push("#");

    xMonitor = [];
    yMonitor = [];
    xMonitor.push(tempX);
    yMonitor.push(tempY);
  }, 300);

  //----------------------------------------------Number of clicks
  var clickClasses = Array();
  //Single
  clickClasses.push("label-with-mrSingle");
  //Picture
  clickClasses.push("enlargePic");
  //clickClasses.push("#zoomModuleContents");
  //Dropdown
  clickClasses.push("mrDropdown");
  //Headers
  clickClasses.push("answer-container");
  //Single with pictures
  clickClasses.push("answerContainer");
  //Volume control
  clickClasses.push("VC_bar");
  //Slider
  clickClasses.push("slider");
  //Slider left/right
  clickClasses.push("fa");
  //Grid
  clickClasses.push("grid-answer-div");
  //Multiple
  clickClasses.push("label-with-mrMultiple");
  //Checkbox
  clickClasses.push("mrMultiple");
  //Multiple_text_extension
  clickClasses.push("mrMultipleText");
  //Image checkbox
  clickClasses.push("CCI_checkbox");
  //Image radio
  clickClasses.push("CCI_radio");
  //Radio button
  clickClasses.push("mrSingle");
  //mrEdit
  clickClasses.push("mrEdit");
  //Answer inside ( pictures )
  clickClasses.push("answerInside");
  //Drop down categories
  clickClasses.push("mrShowText");

  $(document).click(function (e) {
    var xMouse = e.clientX;
    var yMouse = e.clientY;
    var SaveXY = true;

    if (clickXArray.length > 0 && clickYArray.length > 0) {
      if (
        clickXArray[clickXArray.length - 1] == xMouse &&
        clickYArray[clickYArray.length - 1] == yMouse
      )
        SaveXY = false;
    }
    if (SaveXY == true) {
      SurveyGeneralClick(xMouse, yMouse);

      if ($(e.target).attr("class")) {
        for (var i = 0; i < clickClasses.length; i++) {
          if ($(e.target).attr("class").indexOf(clickClasses[i]) >= 0) {
            SurveyClick();
            i = 1000;
          }
        }
      }
    }
  });

  function SurveyGeneralClick(xM, yM) {
    if (
      !xM ||
      xM == 0 ||
      xM == undefined ||
      xM == "" ||
      xM == null ||
      !yM ||
      yM == 0 ||
      yM == undefined ||
      yM == "" ||
      yM == null
    )
      return;
    else {
      clickTimeArray2.push(pageTimer);
      //Add coordinates
      clickXArray.push(xM);
      clickYArray.push(yM);
    }
  }

  function SurveyClick() {
    if (cooldown == false) {
      //Add click time
      clickTimeArray.push(pageTimer);
      //Count click
      nrOfClicks++;
      showConsole();
      cooldown = true;
      window.setTimeout(function () {
        cooldown = false;
        SurveyActions();
      }, 50);
    }
  }

  //----------------------------------------------Number of actions
  function SurveyActions() {
    nrOfActions = 0;
    //Single
    $(".mrSingle").each(function () {
      if ($(this).prop("checked")) nrOfActions++;
    });
    //Drop-down
    $(".mrMultiple").each(function () {
      if (this.selected) nrOfActions++;
    });
    //Multiple
    $(".mrMultiple").each(function () {
      if ($(this).prop("checked")) nrOfActions++;
    });
    showConsole();
  }

  //-----------------------------------------------Number of key strokes
  $(document).on("keydown", function (e) {
    keyTimes.push(pageTimer_fast);
    nrOfStrokes++;
    //Shift
    if (e.keyCode == 18) {
      keybinds.push("Alt");
    }
    //Control
    if (e.keyCode == 17) {
      keybinds.push("Control");
    }
    //Shift
    if (e.keyCode == 16) {
      keybinds.push("Shift");
    }
    //Insert
    if (e.keyCode == 45) {
      keybinds.push("Insert");
    }
    //Backspace
    if (e.keyCode == 8) {
      keybinds.push("Backspace");
    }
    //Delete
    if (e.keyCode == 46) {
      keybinds.push("Delete");
    }
  });

  //-----------------------------------------------Number of characters
  $(".mrEdit").on("input", function () {
    nrOfChars = 0;
    $(".mrEdit").each(function () {
      nrOfChars += $(this).val().length;
    });
    showConsole();
  });

  ///-----------------------------------------------Characters on answer
  $(".mrSingleText").each(function () {
    charsOnAnswer += $(this).text().length;
  });
  $(".mrMultipleText").each(function () {
    charsOnAnswer += $(this).text().length;
  });
  $(".slider-label-value").each(function () {
    charsOnAnswer += $(this).text().length;
  });

  ///-----------------------------------------------Characters on page
  $(".mrQuestionText").each(function () {
    charsOnPage += $(this).text().length;
  });

  function showConsole() {
    /*console.clear();
			console.log("Clicks: "+nrOfClicks);
			console.log("Actions: "+nrOfActions);
			console.log("Strokes: "+nrOfStrokes);
			console.log("Characters: "+nrOfChars);
			console.log("Click times: "+clickTimeArray);
			console.log("Time spent: "+pageTimer);*/
  }

  //END OF SPEEDERS PART

  //Paste check
  if (defaults.pA == true && defaults.mini != true) {
    RA_textArea.on("paste", function (e) {
      window.setTimeout(function () {
        var newTextLength = RA_textArea.val().split("").length;
        var oldTextLength = RA_nrOfChars;
        var pastedLength = newTextLength - oldTextLength;
        if (pastedLength > 0) RA_paste += pastedLength;
      }, 50);
    });
  } else RA_paste = '"NA"';
  //Focus check
  if (defaults.fR == true && defaults.mini != true) {
    RA_textArea.on("focus", function (e) {
      if (RA_Notfocused == true) {
        RA_Notfocused = false;
        var focusInterval = window.setInterval(function () {
          if (RA_textArea.val() != "") {
            if (defaults.tA.split("_").length < 3) RA_focusReaction = true;
          }
          clearInterval(focusInterval);
        }, 100);
      }
    });
  } else {
    RA_Notfocused = '"NA"';
    RA_focusReaction = '"NA"';
  }

  //Reacted too fast check
  if (defaults.rF == true && defaults.mini != true) {
    var loaderInterval = window.setInterval(function () {
      if ($(".loader").length == 0 && RA_OKtoWrite == false) {
        RA_tempText = RA_textArea.val();
        RA_OKtoWrite = true;
        clearInterval(loaderInterval);
      }
    }, 500);
  } else RA_reactedTooFast = '"NA"';

  //Typing speed check
  if (defaults.tS == true && defaults.mini != true) {
    window.setInterval(function () {
      //Check if words are too fast
      RA_prevWords = RA_nrOfWords;
      RA_nrOfWords = RA_textArea.val().split(" ").length;
      if (RA_nrOfWords - RA_prevWords > 3) RA_toofastWords = true;
      //Check if chars are too fast
      RA_prevChars = RA_nrOfChars;
      RA_nrOfChars = RA_textArea.val().split("").length;
      if (RA_nrOfChars - RA_prevChars > 10) RA_toofastChars = true;
    }, 500);
  } else {
    RA_toofastChars = '"NA"';
    RA_toofastWords = '"NA"';
  }

  //Inject hidden textboxes
  if (defaults.hP == true || defaults.mini == true) {
    $("#mrForm").eq(0).append("<div id='RA_div' style='display:none;'></div>");

    $("#RA_div").append(
      "<textarea id='the_answer_1' rows='3' cols='20'></textarea>"
    );
    $("#RA_div").append(
      "<textarea id='the_answer_2' rows='3' cols='20'>specify</textarea>"
    );
    $("#RA_div").append("<input type='checkbox' id='the_answer_3'></input>");
    $("#RA_div").append("<input type='radio' id='the_answer_4'></input>");
    $("#RA_div").append(
      "<input type='file' id='the_answer_5' accept='image/png, image/jpeg'></input>"
    );

    $("#the_answer_1").on("focus", function (e) {
      RA_checkFocus = true;
    });
    $("#the_answer_2").on("focus", function (e) {
      RA_checkFocus = true;
    });
    $("#the_answer_3").on("focus", function (e) {
      RA_checkFocus = true;
    });
    $("#the_answer_4").on("focus", function (e) {
      RA_checkFocus = true;
    });
    $("#the_answer_5").on("focus", function (e) {
      RA_fileUpload = true;
    });
    $("#the_answer_5").on("change", function () {
      RA_fileUpload = true;
    });
  } else {
    RA_bot = '"NA"';
  }

  //Load words table
  var wordList = "";
  if (defaults.bW == true && defaults.mini != true) {
    $.ajax({
      url: URLWordsFile,
      success: function (data) {
        wordList = data.split(";");
      },
      error: function (xhr, ajaxOptions, thrownError) {
        RA_badWord = "File " + xhr;
      },
    });
  }

  //Load exclusion table
  if (defaults.mini != true) {
    var exclusionList = "";
    $.ajax({
      url: ExclusionURL,
      success: function (data) {
        exclusionList = data.split(";");
      },
      error: function (xhr, ajaxOptions, thrownError) {},
    });
  }
  //Submit

  var dgSID2 = $('input[name="I.Project"]').val();
  var dgQID2 = $('input[name="I.SavePoint"]').val();
  var dgDATA2 = "";

  //Asian preparation
  var GBlang = null;
  var shortLang = defaults.locale.split("-")[0];

  if (shortLang == "zh") GBlang = "ch";
  if (shortLang == "ms") GBlang = "my";
  if (shortLang == "ja") GBlang = "jp";
  if (shortLang == "ko") GBlang = "kr";
  if (shortLang == "vi") GBlang = "vn";
  if (shortLang == "th") GBlang = "th";
  if (shortLang == "id") GBlang = "id";

  if (GBlang != null) {
    LanguageConfiguration(GBlang);
  }

  function dg_submit() {
    //Send gibberish
    if (defaults.mini != true) {
      var gibTemp;

      //Asian
      if (GBlang == "ch" || GBlang == "jp" || GBlang == "kr") {
        if (GBlang == "my" || GBlang == "id" || GBlang == "jp") {
          GibberishClass.GB_GibberishAnswerList = [];
        }

        GibberishClass.GB_GibberishAnswer = false;
        GibberishClass.GB_UpdateResult_Func();

        GibberishClass.GB_CheckGibberishData(RA_textArea.val());

        if (GibberishClass.GB_GibberishAnswer == true) gibTemp = 100;
        else gibTemp = 0;
      }
      //English
      else if (shortLang == "en") {
        gibTemp = RecalculateGibberish();
      }
      //Other
      else if (
        shortLang == "nl" ||
        shortLang == "fr" ||
        shortLang == "de" ||
        shortLang == "it" ||
        shortLang == "pl" ||
        shortLang == "es" ||
        shortLang == "tr" ||
        shortLang == "nn" ||
        shortLang == "da" ||
        shortLang == "hu" ||
        shortLang == "pt" ||
        shortLang == "sv"
      ) {
        gibTemp = RecalculateGibberish_V2(RA_textArea.val());
      } else gibTemp = 0;

      gibberishScore = gibTemp;
    }

    //Key times calculations
    if (defaults.mini != true) {
      if (keyTimes.length >= 2 && RA_textArea.val().length > 20) {
        var keyDiffs = new Array();
        for (var i = 0; i < keyTimes.length - 1; i++) {
          //Record all key differences
          keyDiffs.push(keyTimes[i + 1] - keyTimes[i]);
        }
        //Record only unique values
        var uniqueDiffs = new Array();
        var uniqueTimes = new Array();
        for (var i = 0; i < keyDiffs.length; i++) {
          if (!uniqueDiffs.includes(keyDiffs[i])) {
            var countTimes = 0;
            for (var j = i; j < keyDiffs.length; j++) {
              if (keyDiffs[i] == keyDiffs[j]) {
                countTimes++;
              }
            }
            uniqueDiffs.push(keyDiffs[i]);
            uniqueTimes.push(countTimes);
          }
        }
        //Percentage of unique values
        if (!$("#vWrapper").length) {
          var uniquePercent = (uniqueDiffs.length / keyDiffs.length) * 100;

          var alertstr = "";
          for (var i = 0; i < uniqueDiffs.length; i++) {
            alertstr += uniqueDiffs[i] + ":" + uniqueTimes[i] + " ";
          }

          KeyUniqueVal = alertstr;
          KeyRatio = Math.round(uniquePercent);

          if (
            keyDiffs.length > 15 &&
            keyDiffs.length <= 25 &&
            uniqueDiffs.length <= 3 &&
            KeyRatio < 15
          )
            KeyBot = true;
          else if (
            keyDiffs.length > 25 &&
            uniqueDiffs.length <= 5 &&
            KeyRatio < 15
          )
            KeyBot = true;
          else if (keyDiffs.length > 15) KeyBot = false;

          //var alertstr2 = Math.round(uniquePercent)+"%\n"+alertstr+"\nKey times:"+keyTimes+"\nKey diffs: "+keyDiffs;
          //alert(alertstr2);
        }
      }
    }

    //Final setup for reactedTooFast
    if (defaults.rF == true && defaults.mini != true) {
      if (RA_tempText != "") RA_reactedTooFast = true;
    }
    //Final setup for honeyPots
    if (defaults.hP == true || defaults.mini == true) {
      if (
        $("#the_answer_1").val().length > 1 ||
        $("#the_answer_2").val() != "specify"
      )
        RA_bot = true;
      if (
        $("#the_answer_3").prop("checked") == true ||
        $("#the_answer_4").prop("checked") == true
      )
        RA_checks = true;
    }
    //Final setup for badWords
    if (defaults.bW == true && defaults.mini != true) {
      for (var i = 0; i < wordList.length; i++) {
        var bad_word = wordList[i].toLowerCase();
        var test_word = RA_textArea.val().toLowerCase().trim();

        if (
          test_word.length > 8 &&
          bad_word != "" &&
          test_word.includes(bad_word) &&
          test_word.length < parseInt(bad_word.length) + 4
        ) {
          RA_badWord = true;
        }
        if (test_word.length <= 8 && bad_word != "" && test_word == bad_word) {
          RA_badWord = true;
        }
      }
    } else RA_badWord = '"NA"';

    //Final setup for pastedAnswers
    var RA_pastePercent;
    if (defaults.pA == true && defaults.mini != true) {
      if (RA_textArea.val().length > 0)
        RA_pastePercent = parseInt((RA_paste / RA_textArea.val().length) * 100);
      else RA_pastePercent = "0";
    } else RA_pastePercent = '"NA"';
    //Focus bypass
    if (RA_textArea.val() == "") RA_Notfocused = false;

    //Check translation
    final_policy = $("ul.list-inline li").eq(3).find("a").html();
    final_text = $("#question  .mrQuestionText").eq(0).text();
    if (final_policy != initial_policy) RA_translated = true;
    if (final_text != initial_text) RA_translated = true;

    //Descriptive
    var oetext = "";
    if (defaults.mini != true) {
      if (defaults.descriptive == true && RA_textArea.val().includes("@"))
        defaults.descriptive = false;
      if (defaults.descriptive == true) oetext = RA_textArea.val();
    }

    //Brackets
    if (defaults.mini != true) {
      brackets = "";
      var tempztext = RA_textArea.val();
      for (var i = 0; i < tempztext.length; i++) {
        if (tempztext[i] == "[" || tempztext[i] == "]")
          brackets += tempztext[i];
      }
    }

    //Correct values for Dimensions Error message
    if (dimensions_error == true) {
      RA_pastePercent = 0;
      RA_toofastWords = false;
      RA_toofastChars = false;
      RA_reactedTooFast = false;
      RA_Notfocused = false;
      RA_focusReaction = false;
    }

    //Delete mouse triggers if touchscreen
    if (hasTouchScreen) {
      ballisticFlag = false;
      teleportFlag = false;
    }

    //PAL fix ( TODO )
    if (nrOfClicks == 0 || pageTimer == 0) {
      nrblurs = null;
    }

    if (defaults.mini != true)
      dgDATA2 =
        '{ "dg":{"platform":"dimensions","translate":' +
        RA_translated +
        ',"guid":"00000000-0000-0000-0000-000000000000","localtime":"' +
        RA_localtime +
        '","deviceType":"' +
        defaults.devicetype +
        '","questionType":"' +
        defaults.questiontype +
        '","idtype":"' +
        defaults.idtype +
        '","respid":"' +
        defaults.respid +
        '","rt":"' +
        defaults.rtype +
        '","sid":"' +
        defaults.surveyid +
        '","ci":"' +
        defaults.locale +
        '","qid":"' +
        dgQID2 +
        '","pid":"' +
        dgSID2 +
        '","a":{"oetext":"' +
        oetext +
        '","descriptive":"' +
        defaults.descriptive +
        '","br":"' +
        brackets +
        '","keybinds":"' +
        keybinds +
        '","nrblurs":' +
        nrblurs +
        ',"pc":' +
        RA_pastePercent +
        ',"hc":"' +
        document.querySelector("#the_answer_1").value +
        "-" +
        document.querySelector("#the_answer_2").value +
        '","db":' +
        RA_debugger +
        ',"wf":' +
        RA_toofastWords +
        ',"cf":' +
        RA_toofastChars +
        ',"hp":' +
        RA_bot +
        ',"hi":' +
        RA_checks +
        ',"hf":' +
        RA_checkFocus +
        ',"fu":' +
        RA_fileUpload +
        ',"rf":' +
        RA_reactedTooFast +
        ',"nf":' +
        RA_Notfocused +
        ',"fr":' +
        RA_focusReaction +
        ',"bw":' +
        RA_badWord +
        ',"gs":' +
        gibberishScore +
        '},"b":{"cl":' +
        nrOfClicks +
        ',"ac":' +
        nrOfActions +
        ',"ks":' +
        nrOfStrokes +
        ',"ch":' +
        nrOfChars +
        ',"cc":' +
        charsOnPage +
        ',"ca":' +
        charsOnAnswer +
        ',"ct":"' +
        clickTimeArray +
        '","ct2":"' +
        clickTimeArray2 +
        '","mB":' +
        ballisticFlag +
        ',"KeyUniqueVal":"' +
        KeyUniqueVal +
        '","KeyRatio":"' +
        KeyRatio +
        '","KeyBot":"' +
        KeyBot +
        '","mbx":"","mby":"","mT":' +
        teleportFlag +
        ',"cx":"' +
        clickXArray +
        '","cy":"' +
        clickYArray +
        '","tp":' +
        pageTimer +
        "}}}";
    else
      dgDATA2 =
        '{ "dg":{"platform":"dimensions","translate":' +
        RA_translated +
        ',"guid":"00000000-0000-0000-0000-000000000000","localtime":"' +
        RA_localtime +
        '","deviceType":"' +
        defaults.devicetype +
        '","questionType":"' +
        defaults.questiontype +
        '","idtype":"' +
        defaults.idtype +
        '","respid":"' +
        defaults.respid +
        '","rt":"' +
        defaults.rtype +
        '","sid":"' +
        defaults.surveyid +
        '","ci":"' +
        defaults.locale +
        '","qid":"' +
        dgQID2 +
        '","pid":"' +
        dgSID2 +
        '","a":{"hp":' +
        RA_bot +
        ',"br":"' +
        brackets +
        '","keybinds":"' +
        keybinds +
        '","nrblurs":' +
        nrblurs +
        ',"hc":"' +
        document.querySelector("#the_answer_1").value +
        "-" +
        document.querySelector("#the_answer_2").value +
        '","hi":' +
        RA_checks +
        ',"db":' +
        RA_debugger +
        ',"hf":' +
        RA_checkFocus +
        ',"fu":' +
        RA_fileUpload +
        '},"b":{"cl":' +
        nrOfClicks +
        ',"ac":' +
        nrOfActions +
        ',"ks":' +
        nrOfStrokes +
        ',"ch":' +
        nrOfChars +
        ',"cc":' +
        charsOnPage +
        ',"ca":' +
        charsOnAnswer +
        ',"ct":"' +
        clickTimeArray +
        '","ct2":"' +
        clickTimeArray2 +
        '","cx":"' +
        clickXArray +
        '","cy":"' +
        clickYArray +
        '","mB":' +
        ballisticFlag +
        ',"mbx":"","mby":"","mT":' +
        teleportFlag +
        ',"tp":' +
        pageTimer +
        "}}}";

    navigator.sendBeacon(
      "https://DGApi.ipsosinteractive.com/dataguard/",
      dgDATA2
    );
    //window.name = window.name+"DGN"+dgDATA2;
  }
  window.dg_submit = dg_submit;

  //Jonathan's detector
  // ********* Gibberish checking start *********
  var GB_BigFile;
  var GB_GoodFile;
  var GB_BadFile;
  var GB_ModelFile;
  let model_data = {};

  function InitializeGibberishData() {
    $.ajax({
      url: URLGibberishFile,
      success: function (data4) {
        GB_ModelFile = data4;
        UsingJSONFile = true;
        model_data = GB_ModelFile;
      },
      error: function (data4) {},
    });
  }
  InitializeGibberishData();

  let Jaccepted_chars = "abcdefghijklmnopqrstuvwxyz ";
  let Jk = Jaccepted_chars.length;
  let Jpos = {};

  for (let Ji = 0; Ji < Jk; Ji++) {
    Jpos[Jaccepted_chars[Ji]] = Ji;
  }

  function normalize(line) {
    var arr = line.toLowerCase().split("");
    return arr.filter(function (item) {
      return Jaccepted_chars.indexOf(item) > -1;
    });
  }

  function averageTransitionProbability(line, log_prob_matrix) {
    let log_prob = 1.0;
    let transition_ct = 0;

    var filtered_line = normalize(line);
    var a = false;

    for (var b in filtered_line) {
      if (a !== false) {
        log_prob += log_prob_matrix[Jpos[a]][Jpos[filtered_line[b]]];
        transition_ct += 1;
      }
      a = filtered_line[b];
    }

    return Math.exp(log_prob / (transition_ct || 1));
  }

  function gib_dect(line) {
    return (
      averageTransitionProbability(line, model_data.matrix) >
      model_data.threshold
    );
  }

  //The function
  function checkJgib(astring) {
    return gib_dect(astring);
  }
  // ********* Gibberish checking end *********

  //Gibberish detector
  //$("#nav-controls").append("<br/><br/><br/><div id='gib'>Gibberish score is <span id='gibval'>0</span></div>");

  /*window.setInterval( function() {
		var gibTemp = RecalculateGibberish();
		$("#gibval").html(gibTemp);
		gibberishScore = gibTemp;
	},300);*/

  function RecalculateGibberish() {
    //console.clear();
    var stringGib = RA_textArea.val().toLowerCase().split(/\s+/);
    var weirdFactor = 0;

    var consonantDex = [
      "b",
      "c",
      "d",
      "f",
      "g",
      "j",
      "l",
      "m",
      "n",
      "p",
      "r",
      "s",
      "t",
    ];
    var rareDex = ["h", "k", "q", "v", "w", "x", "y", "z"];
    var vowelDex = ["a", "e", "i", "o", "u"];

    var lastchar = 0;
    var consecutiveconsonants = 1;
    var consecutivevowels = 1;
    var consecutiverares = 1;

    var consonants = 0;
    var vowels = 0;
    var rares = 0;

    var conSeq = 1;
    var vowSeq = 1;
    var rarSeq = 1;
    var bigFlag = false;

    var distinctChars = new Array();

    var avgWeird = new Array();
    var avgRatio = new Array();

    for (var i = 0; i <= stringGib.length; i++) {
      var theString = "";
      if (i == stringGib.length) theString = RA_textArea.val().toLowerCase();
      else theString = stringGib[i];

      weirdFactor = 0;

      if (i != stringGib.length) {
        if (
          theString.includes("asd") ||
          theString.includes("qwe") ||
          theString.includes("fgh") ||
          theString.includes("jkl") ||
          theString.includes("wqe") ||
          theString.includes("rwe") ||
          theString.includes("zxc") ||
          theString.includes("gfh") ||
          theString.includes("hfg") ||
          theString.includes("hjg") ||
          theString.includes("tyu") ||
          theString.includes("ytu") ||
          theString.includes("lkj") ||
          theString.includes("cvb") ||
          theString.includes("mnb") ||
          theString.includes("sdf") ||
          theString.includes("dsf") ||
          theString.includes("fdd")
        )
          weirdFactor += 3;
      }

      distinctChars = new Array();

      lastchar = 0;
      consecutiveconsonants = 1;
      consecutivevowels = 1;
      consecutiverares = 1;

      consonants = 0;
      vowels = 0;
      rares = 0;

      conSeq = 0;
      vowSeq = 0;
      rarSeq = 0;
      bigFlag = false;

      //Analyze word size
      var nrChars = theString.length;

      if (i == stringGib.length) nrChars -= stringGib.length - 1;

      if (i != stringGib.length) {
        if (nrChars > 10) weirdFactor = 1;
        if (nrChars > 15) weirdFactor = 2;
        if (nrChars > 20) weirdFactor = 5;
      }

      //Analyze word structure
      for (var j = 0; j < theString.length; j++) {
        var noChar = true;

        //Distinct
        var another = true;
        for (var k = 0; k < distinctChars.length; k++) {
          if (theString[j] == distinctChars[k]) another = false;
        }
        if (another == true) distinctChars.push(theString[j]);

        //Consonants
        for (var k = 0; k < consonantDex.length; k++) {
          if (theString[j] == consonantDex[k]) {
            noChar = false;
            consonants++;
            conSeq++;
            vowSeq = 0;
            rarSeq = 0;
            if (conSeq > 4) bigFlag = true;

            if (lastchar == 1 || lastchar == 3) {
              consecutiveconsonants++;
            }
            lastchar = 1;
          }
        }
        //Vowels
        for (var k = 0; k < vowelDex.length; k++) {
          if (theString[j] == vowelDex[k]) {
            noChar = false;
            vowels++;
            conSeq = 0;
            vowSeq++;
            rarSeq = 0;
            if (vowSeq > 3) bigFlag = true;

            if (lastchar == 2) {
              consecutivevowels++;
            }
            lastchar = 2;
          }
        }
        //Rares
        for (var k = 0; k < rareDex.length; k++) {
          if (theString[j] == rareDex[k]) {
            noChar = false;
            rares++;
            consonants++;
            conSeq++;
            vowSeq = 0;
            rarSeq++;

            if (conSeq > 4) bigFlag = true;
            if (rarSeq > 3) bigFlag = true;

            if (lastchar == 3) {
              consecutiverares++;
              consecutiveconsonants++;
            }
            if (lastchar == 1) {
              consecutiveconsonants++;
            }
            lastchar = 3;
          }
        }

        if (noChar == true) {
          conSeq = 0;
          vowSeq = 0;
          rarSeq = 0;
          lastchar = 0;
        }
      }

      //Word result
      var expectedConsonants = Math.floor((nrChars * 68) / 100);
      if (expectedConsonants == 0) expectedConsonants = 1;
      var expectedVowels = Math.floor((nrChars * 32) / 100);
      if (expectedVowels == 0) expectedVowels = 1;
      var expectedRares = Math.floor((nrChars * 20) / 100);
      var expectedConConsonants = Math.floor((nrChars / 4) * 2);
      var expectedConVowels = Math.floor((nrChars / 5) * 2);
      var expectedConRares = Math.floor((nrChars / 5) * 2);

      if (i == stringGib.length) {
        expectedConsonants = Math.floor((nrChars * 68) / 100);
        expectedVowels = Math.floor((nrChars * 32) / 100);
        expectedRares = Math.floor((nrChars * 10) / 100);
        expectedConConsonants = Math.floor(nrChars / 7);
        expectedConVowels = Math.floor(nrChars / 20);
        expectedConRares = Math.floor(nrChars / 200);
      }

      var factor1 = expectedConsonants / consonants;
      var factor2 = expectedVowels / vowels;
      var factor3 = expectedRares / rares;
      var factor4 = expectedConConsonants / consecutiveconsonants;
      var factor5 = expectedConVowels / consecutivevowels;
      var factor6 = expectedConRares / consecutiverares;

      if (isNaN(factor1) || !isFinite(factor1)) factor1 = 0;
      if (isNaN(factor2) || !isFinite(factor2)) factor2 = 0;
      if (isNaN(factor3) || !isFinite(factor3)) factor3 = 0;
      if (isNaN(factor4) || !isFinite(factor4)) factor4 = 0;
      if (isNaN(factor5) || !isFinite(factor5)) factor5 = 0;
      if (isNaN(factor6) || !isFinite(factor6)) factor6 = 0;

      if (i != stringGib.length) {
        if (factor1 > 0 && (factor1 > 1.1 || factor1 < 0.9)) weirdFactor += 0.5;
        if (nrChars > 5 && factor1 > 0 && (factor1 > 1.3 || factor1 < 0.7))
          weirdFactor += 0.5;
        if (nrChars > 5 && factor1 > 0 && (factor1 > 1.5 || factor1 < 0.5))
          weirdFactor += 0.5;
        if (nrChars > 5 && factor1 > 0 && (factor1 > 1.8 || factor1 < 0.3))
          weirdFactor += 0.5;
        if (nrChars <= 5 && consonants >= 4) weirdFactor += 4;

        if (factor2 > 0 && (factor2 > 1.1 || factor2 < 0.9)) weirdFactor++;
        if (nrChars > 5 && factor2 > 0 && (factor2 > 1.3 || factor2 < 0.7))
          weirdFactor += 0.5;
        if (nrChars > 5 && factor2 > 0 && (factor2 > 1.5 || factor2 < 0.5))
          weirdFactor += 0.5;
        if (nrChars > 5 && factor2 > 0 && (factor2 > 1.8 || factor2 < 0.3))
          weirdFactor += 0.5;
        if (nrChars <= 5 && vowels >= 3) weirdFactor += 4;
      }

      if (i != stringGib.length) {
        if (factor3 > 0 && (factor3 < 0.5 || factor3 > 2)) weirdFactor++;

        if (factor4 > 0 && factor4 < 0.9) weirdFactor++;
        if (nrChars > 5 && factor4 > 0 && (factor4 < 0.7 || factor4 > 2))
          weirdFactor++;
        if (nrChars > 5 && factor4 > 0 && (factor4 < 0.5 || factor4 > 3))
          weirdFactor++;
        if (nrChars > 5 && factor4 > 0 && (factor4 < 0.3 || factor4 > 4))
          weirdFactor++;

        if (factor5 > 0 && factor5 < 0.9) weirdFactor++;
        if (nrChars > 5 && factor5 > 0 && (factor5 < 0.7 || factor5 > 2))
          weirdFactor++;
        if (nrChars > 5 && factor5 > 0 && (factor5 < 0.5 || factor5 > 3))
          weirdFactor++;
        if (nrChars > 5 && factor5 > 0 && (factor5 < 0.3 || factor5 > 4))
          weirdFactor++;

        if (factor6 > 0 && (factor6 < 0.7 || factor6 > 2)) weirdFactor += 2;
      }

      var nrDistinct = distinctChars.length;
      var normalDuplicates = nrChars;
      if (i != stringGib.length) {
        if (nrChars / nrDistinct > 1.5) weirdFactor += 2;
        if (nrChars / nrDistinct > 2) weirdFactor += 3;
        if (nrChars / nrDistinct > 3) weirdFactor += 4;
        if (nrChars / nrDistinct > 5) weirdFactor += 6;
      } else {
        if (nrChars > 10) normalDuplicates = Math.floor(nrChars / 1.5);
        if (nrChars > 20) normalDuplicates = Math.floor(nrChars / 2);
        if (nrChars > 30) normalDuplicates = Math.floor(nrChars / 2);
        if (nrChars > 40) normalDuplicates = Math.floor(nrChars / 2);
        if (nrChars > 50) normalDuplicates = 20;

        if (normalDuplicates / nrDistinct > 1.5) weirdFactor += 3;
        if (normalDuplicates / nrDistinct > 2) weirdFactor += 5;
        if (normalDuplicates / nrDistinct > 3) weirdFactor += 7;
        if (normalDuplicates / nrDistinct > 5) weirdFactor += 9;
      }

      if (bigFlag == true && nrChars < 30) weirdFactor += 5;
      if (bigFlag == true && nrChars > 30) weirdFactor += 3;

      //Jonathan
      if (i != stringGib.length && theString != "") {
        var JonGib = checkJgib(theString);
        //True-correct, False-gibberish
        if (JonGib == false) {
          if (nrChars < 5) weirdFactor += 8;
          if (nrChars >= 5 && nrChars <= 15) weirdFactor += 7;
          if (nrChars > 15) weirdFactor += 6;
        }
      }
      //End of J

      if (weirdFactor > 10) weirdFactor = 10;

      //Excluded word
      for (var l = 0; l < exclusionList.length; l++) {
        if (theString == exclusionList[l].toLowerCase()) weirdFactor = 0;
      }

      //Prevent infinity
      if (weirdFactor == 0) weirdFactor = 1;

      if (nrChars > 2) {
        if (i != stringGib.length) avgWeird.push(weirdFactor);
        else if (i > 3) avgWeird.push(weirdFactor);
      }
    }

    var result = 0;
    for (var i = 0; i < avgWeird.length - 1; i++) result += avgWeird[i];
    result /= avgWeird.length;

    if (avgWeird[avgWeird.length - 1] > result)
      result = avgWeird[avgWeird.length - 1];

    //Correction for 0
    if (isNaN(result) || !isFinite(result)) result = 0;
    if (result == 1) result = 0;

    return Math.floor(result * 10);
  }

  function RecalculateGibberish_V2(textu) {
    var stringGib = textu.toLowerCase().trim();
    var weirdFactor = 0;

    //Check if char repeats more than 3 times
    var xlastChar = "";
    var xRepeat = 1;
    for (var i = 0; i < stringGib.length; i++) {
      if (stringGib[i] == xlastChar) xRepeat++;
      else {
        xlastChar = stringGib[i];
        xRepeat = 1;
      }

      if (xRepeat > 3) weirdFactor = 100;
    }

    //Check if does not contain consonant
    var letterDex = [
      "b",
      "c",
      "d",
      "f",
      "g",
      "j",
      "l",
      "m",
      "n",
      "p",
      "r",
      "s",
      "t",
      "h",
      "k",
      "q",
      "v",
      "w",
      "x",
      "y",
      "z",
      "ñ",
      "ç",
      "ÿ",
      "č",
      "ď",
      "ť",
      "ř",
      "ž",
      "š",
      "ň",
      "ć",
      "ń",
      "ś",
      "ź",
      "ł",
      "ż",
      "ß",
      "ç",
      "ş",
      "ğ",
    ];
    var xnrLetters = 0;
    for (var i = 0; i < stringGib.length; i++) {
      for (var j = 0; j < letterDex.length; j++) {
        if (stringGib[i] == letterDex[j]) xnrLetters++;
      }
    }
    if (xnrLetters == 0) weirdFactor = 100;

    //Check if does not contain vowel
    var letterDex = [
      "a",
      "e",
      "i",
      "o",
      "u",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "ü",
      "â",
      "ê",
      "î",
      "ô",
      "û",
      "à",
      "è",
      "ì",
      "ò",
      "ù",
      "é",
      "ë",
      "ï",
      "ü",
      "æ",
      "œ",
      "à",
      "ì",
      "ò",
      "ù",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "à",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "â",
      "ê",
      "ô",
      "ã",
      "õ",
      "ä",
      "ü",
      "ö",
      "ï",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "à",
      "è",
      "ì",
      "ò",
      "ù",
      "å",
      "ä",
      "ö",
      "á",
      "é",
      "í",
      "ú",
      "ý",
      "ó",
      "ě",
      "ů",
      "ý",
      "ą",
      "ę",
      "ó",
      "á",
      "í",
      "é",
      "ó",
      "ú",
      "ü",
      "ö",
      "ő",
      "ű",
      "ø",
      "å",
      "æ",
      "ä",
      "ü",
      "ö",
      "ı",
      "ö",
      "ü",
      "ø",
      "å",
    ];
    var xnrLetters = 0;
    for (var i = 0; i < stringGib.length; i++) {
      for (var j = 0; j < letterDex.length; j++) {
        if (stringGib[i] == letterDex[j]) xnrLetters++;
      }
    }
    if (xnrLetters == 0) weirdFactor = 100;

    //Under 3 chars
    if (stringGib.length < 3) weirdFactor = 100;

    //Count numbers
    var numberDex = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    var xnrNumbers = 0;
    for (var i = 0; i < stringGib.length; i++) {
      for (var j = 0; j < numberDex.length; j++) {
        if (stringGib[i] == numberDex[j]) xnrNumbers++;
      }
    }
    if (xnrNumbers >= stringGib.length / 2) weirdFactor = 100;

    return weirdFactor;
  }

  function getLocalTime() {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString();

    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    const timezoneOffset = currentDate.getTimezoneOffset();
    const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const timezoneOffsetMinutes = Math.abs(timezoneOffset) % 60;
    const timezoneSign = timezoneOffset >= 0 ? "-" : "+";
    const timezoneOffsetString = `${timezoneSign}${timezoneOffsetHours
      .toString()
      .padStart(2, "0")}:${timezoneOffsetMinutes.toString().padStart(2, "0")}`;

    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formattedString = `${day}.${month}.${year} ${hours}:${minutes} GMT${timezoneOffsetString} (${timezoneName})`;

    return formattedString;
  }

  function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function calculateAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  function checkMovementType(xMouse, yMouse) {
    if (xMouse.length < 2 || yMouse.length < 2) return 0;
    if (isNaN(xMouse[0]) || isNaN(yMouse[0])) return 0;

    let startX = xMouse[0],
      startY = yMouse[0];
    let endX = xMouse[xMouse.length - 1],
      endY = yMouse[yMouse.length - 1];

    if (Math.abs(endX - startX) < 50 && Math.abs(endY - startY) < 50) return 0;

    let isBallistic = false;
    let angleThreshold = 0.6;
    let totalAngleChange = 0;

    for (let i = 1; i < xMouse.length - 1; i++) {
      let angle = calculateAngle(
        xMouse[i - 1],
        yMouse[i - 1],
        xMouse[i],
        yMouse[i]
      );
      let nextAngle = calculateAngle(
        xMouse[i],
        yMouse[i],
        xMouse[i + 1],
        yMouse[i + 1]
      );
      let angleDiff = Math.abs(nextAngle - angle);

      // Normalize angle differences to avoid floating-point issues
      if (Math.abs(angleDiff) > Number.EPSILON) {
        totalAngleChange += angleDiff;
      }

      // Debugging logs
      //console.log(`Angle1: ${angle.toFixed(3)}, Angle2: ${nextAngle.toFixed(3)}, Diff: ${angleDiff.toFixed(3)}`);

      //Teleport
      if (
        Math.abs(xMouse[i - 1] - xMouse[i]) > 200 ||
        Math.abs(yMouse[i - 1] - yMouse[i]) > 200
      ) {
        //console.log("Teleport triggered");
        teleportFlag = true;
        return 0;
      }
    }

    //console.log(`Total Angle Change: ${totalAngleChange.toFixed(3)}`);

    //Compare angle change with threshold
    if (totalAngleChange > angleThreshold) {
      return 1;
    } else {
      //console.log("Ballistic movement : "+xMouse + " - " + yMouse + " - " + totalAngleChange + " - " + angleThreshold);
      return 2;
    }
  }
}
