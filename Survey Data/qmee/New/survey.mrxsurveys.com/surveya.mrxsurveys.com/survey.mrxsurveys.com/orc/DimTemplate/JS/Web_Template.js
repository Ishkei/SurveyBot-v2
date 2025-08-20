window.history.forward();
	if(window.history.forward(1) != null) window.history.forward(1);
	location.hash='#no-';
	if(location.hash == '#no-'){
		location.hash='#_';
		window.onhashchange=function(){
			if(location.hash == '#no-') location.hash='#_';
		}
	}

var plyrLoadOnce = true;
var probeLoadOnce = true;
	
$(function() {

	// check to see if the IE8 hack flag is set so we can change some behaviors
	var isIE8 = true; 
	try{ IE8hack; }
	catch(e) { if(e.name == "ReferenceError") { isIE8 = false; } }
	
	if($("span#redirect").length) {
		$(location).attr('href',$("span#redirect").attr("url"));
	}
	
	$(".mrSingle").each(function(index){
		if ( $(this).is( "input" ) ) {
			$(this).addClass( "Remove_Input" );
			$(this).after("<label for=" + $(this).attr("id") + " class='Radio_Button'></label>");
		}
	});
	$(".mrMultiple").each(function(index){
		if ( $(this).is( "input" ) ) {
			$(this).addClass( "Remove_Input" );
			$(this).after("<label for=" + $(this).attr("id") + " class='Check_Box'></label>");
		}
	});
	
	if($("span#ScriptIsTest").length) {
		$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/FontHelperFunctions.js");
	}
	
	if($("#shownprog").hasClass("animated") || $("#shownprog").hasClass("thinline")) {
		$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/progress/jquery.velocity.min.js", function() {
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/progress/number-pb.js", function() {
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/progress/orcinclude.js");
			});
		});
	} else {
		$("div.number-pb-num").text($("td.mrProgressText").text());
	}
	$(".theme").each(function() { // JavaScript code to alter the control theme
		if($(this).hasClass("bubble")) { $(this).closest(".Question").find("textarea.mrEdit").wrap("<div class='speech-bubble'></div>"); }
		if($(this).hasClass("gridCol")) { $(this).closest(".Question").find(".mrQuestionTable").addClass("swipeTable"); }
		if($(this).hasClass("dot")) { $(this).closest(".Question").find(".DefaultControls").addClass("Theme_Dot").removeClass("DefaultControls"); }
		if($(this).hasClass("empty")) { $(this).closest(".Question").find(".DefaultControls").addClass("Theme_Empty").removeClass("DefaultControls"); }
		if($(this).hasClass("full")) { $(this).closest(".Question").find(".DefaultControls").addClass("Theme_Full").removeClass("DefaultControls"); }
		if($(this).hasClass("leftright")) { 
			$(this).closest(".Question").find("table.mrQuestionTable").addClass("leftRight nonresponsive");
			$(this).closest(".Question").find("table.mrQuestionTable").find("tr").each(function() {
				$(this).find("td:eq(1)").after($(this).find("td:eq(0)"));
			});
		}
		if($(this).hasClass("srr")) { $(this).closest(".Question").find("table.mrQuestionTable").addClass("SRR"); }
		if($(this).hasClass("textbutton") || $(this).hasClass("tags")) {
			$(this).closest(".Question").find(".DefaultControls").addClass("Theme_Line");
			$(this).closest("div.QuestionLabel").next().find("input.Remove_Input").each(function() {
				$(this).nextAll().addBack().wrapAll("<div class='line'></div>");
			});
			if($(this).hasClass("tags")) {
				$(this).closest(".Question").find(".DefaultControls").addClass("Tags");
			}
		}
		if($(this).hasClass("number") && !isIE8) { 
			var min = $(this).attr('data-min'); //get min val
			if (typeof min !== 'undefined') {
				if($(this).closest("td").hasClass("mrGridCategoryText")) {
					$(this).closest("tr").find(".mrEdit").prop({'type' : 'number','min' : min}).addClass("number");
				} else {
					$(this).closest(".Question").find(".mrEdit").prop({'type' : 'number','min' : min}).addClass("number");
				}
			} else {
				if($(this).closest("td").hasClass("mrGridCategoryText")) {
					$(this).closest("tr").find(".mrEdit").prop({'type' : 'number','min' : 0}).addClass("number");
				} else {
					$(this).closest(".Question").find(".mrEdit").prop({'type' : 'number','min' : 0}).addClass("number");
				}
			}
		}
		if($(this).hasClass("ScrollList")) { 
			$(this).closest(".Question").find(".QuestionControls").addClass("scrollDiv"); 
			$(this).closest(".Question").find(".mrDropdown").prop('size', $(this).attr('data-size')).addClass("scrollList"); 
			//$.getScript("https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js", function() {
				//$("span.ScrollList").closest(".Question").find("select.mrDropdown").select2({
					//closeOnSelect: false,
					//minimumResultsForSearch: Infinity
				//});
				//$("span.ScrollList").closest(".Question").find("select.mrDropdown").on('select2:close', function(e) {
					//$(this).select2('open');
					//$("body span.select2-container").css({"position":"relative","top":"inherit","left":"inherit"}).appendTo($("span.ScrollList").closest(".Question").find(".QuestionControls"));
				//});
				$("span.ScrollList").closest(".Question").find(".mrDropdown").closest(".QuestionControls").css('text-align','center');
				//$("select.mrDropdown").select2('open');
				//$("body span.select2-container").css({"position":"relative","top":"inherit","left":"inherit"}).appendTo($("span.ScrollList").closest(".Question").find(".QuestionControls"));
			//});
			//loadcssfile("https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css","css");
		}
		if($(this).hasClass("telephone") && !isIE8) {
			if($(this).closest("td").hasClass("mrGridCategoryText")) {
				$(this).closest("tr").find(".mrEdit").prop('type', 'tel'); 
			} else {
				$(this).closest(".Question").find(".mrEdit").prop('type', 'tel'); 
			}
		}
		if($(this).hasClass("email") && !isIE8) { 
			if($(this).closest("td").hasClass("mrGridCategoryText")) {
				if($(this).closest("tr").find(".mrEdit").is("textarea")) {
					var $taElement = $(this).closest("tr").find(".mrEdit");
					var $iElement = $("<input>").attr({
						id: $taElement.attr('id'),
						class: $taElement.attr('class'),
						name: $taElement.attr('name'),
						value: $taElement.val(),
						style: 'width:60%;'
					});
					$taElement.after($iElement).remove();
				}
				$(this).closest("tr").find(".mrEdit").prop('type', 'email'); 
			} else {
				if($(this).closest(".Question").find(".mrEdit").is("textarea")) {
					var $taElement = $(this).closest(".Question").find(".mrEdit");
					var $iElement = $("<input>").attr({
						id: $taElement.attr('id'),
						class: $taElement.attr('class'),
						name: $taElement.attr('name'),
						value: $taElement.val(),
						style: 'width:60%;'
					});
					$taElement.after($iElement).remove();
				}
				$(this).closest(".Question").find(".mrEdit").prop('type', 'email'); 
			}
		}
		if($(this).hasClass("sticky")) {
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/fixto.min.js", function() {
				$('div.QuestionLabel').fixTo('div.Question', { zIndex : 10 }).css({"background-color":"#fff"});
			});
		}
		if($(this).hasClass("placeholder")) { $(this).closest(".Question").find(".mrEdit").prop('placeholder', $(this).text()); };
		if($(this).hasClass("nonresponsive")) { $(this).closest("div.QuestionLabel").next().find("table.mrQuestionTable").addClass("nonresponsive"); };
		if($(this).hasClass("accordion")) { $(this).closest("div.QuestionLabel").next().find("table.mrQuestionTable").addClass("accordion"); };
		if($(this).hasClass("twocol")) { 
			if($(this).attr('orientation')=='vertical') {
				var totResps = parseInt($(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']").length);
				var wrapNum = 0;
				if(totResps%2 == 0) { wrapNum = totResps/2; } else { wrapNum = Math.ceil(totResps/2); }
				$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:lt("+wrapNum+")").wrapAll("<div class='vDoubleColumn'></div>");
				$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:gt("+(wrapNum-1)+")").wrapAll("<div class='vDoubleColumn'></div>");
			} else {
				$(this).closest(".Question").find(".QuestionControls").addClass("DoubleColumn"); 
			}
		}
		if($(this).hasClass("twocol_Vert")) { 
			var totResps = parseInt($(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']").length);
			var wrapNum = 0;
			if(totResps%2 == 0) { wrapNum = totResps/2; } else { wrapNum = Math.ceil(totResps/2); }
			$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:lt("+wrapNum+")").wrapAll("<div class='vDoubleColumn'></div>");
			$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:gt("+(wrapNum-1)+")").wrapAll("<div class='vDoubleColumn'></div>");
		}
		if($(this).hasClass("threecol")) { 
			if($(this).attr('orientation')=='vertical') {
				var totResps = parseInt($(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']").length);
				var wrapNum = 0;
				var wrapNum2 = 0;
				if(totResps%3 == 0) { wrapNum = totResps/3; wrapNum2 = totResps/3; } else { wrapNum = Math.ceil(totResps/3); if((totResps-wrapNum)%2 == 0) { wrapNum2 = (totResps-wrapNum)/2; } else { wrapNum2 = Math.ceil((totResps-wrapNum)/2); } }
				$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:lt("+wrapNum+")").wrapAll("<div class='vTripleColumn'></div>");
				$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:gt("+(wrapNum-1)+"):lt("+(wrapNum2)+")").wrapAll("<div class='vTripleColumn'></div>");
				$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:gt("+(wrapNum+wrapNum2-1)+")").wrapAll("<div class='vTripleColumn'></div>");
			} else {
				$(this).closest(".Question").find(".QuestionControls").addClass("TripleColumn"); 
			}
		}
		if($(this).hasClass("threecol_Vert")) { 
			var totResps = parseInt($(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']").length);
			var wrapNum = 0;
			var wrapNum2 = 0;
			if(totResps%3 == 0) { wrapNum = totResps/3; wrapNum2 = totResps/3; } else { wrapNum = Math.ceil(totResps/3); if((totResps-wrapNum)%2 == 0) { wrapNum2 = (totResps-wrapNum)/2; } else { wrapNum2 = Math.ceil((totResps-wrapNum)/2); } }
			$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:lt("+wrapNum+")").wrapAll("<div class='vTripleColumn'></div>");
			$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:gt("+(wrapNum-1)+"):lt("+(wrapNum2)+")").wrapAll("<div class='vTripleColumn'></div>");
			$(this).closest(".Question").find(".QuestionControls").find("span[id^='Cell']:gt("+(wrapNum+wrapNum2-1)+")").wrapAll("<div class='vTripleColumn'></div>");
		}
	});
	$(".widget").each(function() { // JavaScript code to initialize the various widgets
		if($(this).hasClass("calendar")) {
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/calendar/js/orc_calendar.js", function() {
				// no callback   
			});
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/calendar/css/orc_calendar.css","css");
		}
		if($(this).hasClass("catsum")) {
			var total = $(this).attr('data_total');
			var label = $(this).attr('data_label');
			var legend = $(this).attr('data_legend');
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/catsum/catsum.asp?data_total="+total+"&data_label="+label+"&data_legend="+legend, function() {
				// no callback
			});
		}
		if($(this).hasClass("colsum")) {
			var prefix = "";
			var suffix = "";
			var label = "Total";
			var attrPrefix = $(this).attr('prefix'); //get special prefix values
			var attrSuffix = $(this).attr('suffix'); //get special suffix values
			var attrLabel = $(this).attr('label'); //get special label values
			if(typeof attrLabel !== "undefined") { // If there's a custom label, use it
				label = attrLabel;
			}
			if(typeof attrPrefix !== "undefined") { // If there's a custom prefix, use it
				prefix = attrPrefix;
			} else { // Otherwise look for a hard-coded class
				if($(this).hasClass("prefix-dollar")) { prefix = "%24"; }
				if($(this).hasClass("prefix-pound")) { prefix = "%A3"; }
				if($(this).hasClass("prefix-yen")) { prefix = "%A5"; }
			}
			if(typeof attrSuffix !== "undefined") { // If there's a custom suffix, use it
				suffix = attrSuffix;
			} else { // Otherwise look for a hard-coded class
				if($(this).hasClass("suffix-cents")) { suffix = "%2E%30%30"; }
				if($(this).hasClass("suffix-percent")) { suffix = "%25"; }
			}
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/colsum/colsum.asp?prefix="+prefix+"&suffix="+suffix+"&label="+label, function() {
				// no callback   
			});
		}
		if($(this).hasClass("combobox")) {
			$("body").addClass('combobox');
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/combobox/js/ORC_ComboBox.js", function() {
				$(".combobox").closest("div.QuestionLabel").next().find("select.mrDropdown").wrap('<div class="ui-widget"></div>');
				$(".combobox").closest("div.QuestionLabel").next().find("select.mrDropdown").attr('placeholder', 'Type in');
				$(".combobox").closest("div.QuestionLabel").next().find("select.mrDropdown").combobox();    
				if(typeof $(".widget.combobox").attr("strlen") === "undefined") {
					$( "input.custom-combobox-input" ).autocomplete( "option", "minLength", 4 );
				} else {
					$( "input.custom-combobox-input" ).autocomplete( "option", "minLength", $(this).attr("strlen") );
				}
			});
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/combobox/css/ComboBox.css","css");
		}
		if($(this).hasClass("gridTimer")) {
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/gridtimer/gridtimer.js", function() {
				// no callback   
			});
		}
		if($(this).hasClass("ideal")) {
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/CSS/AdhocIdeal.css","css");
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/AdhocIdeal.js", function() {
				// no callback   
			});
		}
		if($(this).hasClass("masonry")) {
			if(isIE8) { // Masonry v3 for IE8 support
				$(".masonry").closest(".Question").find(".DefaultControls").addClass("Theme_Line");
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/masonry/js/masonryv3.pkgd.min.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/masonry/ungrid.js");
				});
			} else { // Masonry v4 for all the modern browsers
				$(".masonry").closest(".Question").find(".DefaultControls").addClass("Theme_Line");
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/masonry/js/masonry.pkgd.min.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/masonry/ungrid.js");
				});
			}
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/masonry/css/ungrid.css","css");
		}
		if($(this).hasClass("maxdiff")) {
			$(this).closest("div.QuestionLabel").next().find("table.mrQuestionTable").addClass("maxDiff");
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/maxdiff/maxdiff.js", function() {
				// no callback   
			});
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/maxdiff/maxdiff.css","css");
		}
		if($(this).hasClass("probe")) {
			$(this).closest("div.QuestionLabel").next().find("textarea.mrEdit").addClass("probe").css("margin-left","8px");
			if(probeLoadOnce) {
				var lang = $(this).attr('lang');
				lang = lang.substr(0,2);
				if(lang == "ar") {			// Arabic
				} else if(lang == "de") {	// German
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/lexer.js", function() {
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/POSTagger.js");
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/probe_lexer.js");
					});
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/lexicon_de.js");
				} else if(lang == "es") {	// Spanish
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/lexer.js", function() {
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/POSTagger.js");
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/probe_lexer.js");
					});
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/lexicon_es.js");
				} else if(lang == "fr") {	// French
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/lexer.js", function() {
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/POSTagger.js");
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/probe_lexer.js");
					});
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/lexicon_fr.js");
				} else if(lang == "it") {	// Italian
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/lexer.js", function() {
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/POSTagger.js");
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/probe_lexer.js");
					});
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/lexicon_it.js");
				} else if(lang == "ko") {	// Korean
				} else if(lang == "pt") {	// Portuguese
				} else if(lang == "zh") {	// Chinese
				} else if(lang == "ac") {	// Active Listening
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/activelistening/lexer.js", function() {
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/activelistening/POSTagger.js");
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/activelistening/probe_lexer.js");
					});
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/activelistening/lexicon.js");
				} else {					// English (other)
					$.getScript("https://unpkg.com/compromise@latest/builds/compromise.min.js", function() {
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/probe.js");
					});
				}
				// Compromise is English only; load supplemental lexicon file for other languages
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/autoprobe/probe.css","css");
				probeLoadOnce = false;
			}
		}
		if($(this).hasClass("textselect")) {
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/textselect/textSelect.js", function() {
				// no callback   
			});
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/textselect/textSelect.css","css");
		}
		if($(this).hasClass("textselectmulti")) {
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/textselect/textSelectMulti.js", function() {
				// no callback   
			});
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/textselect/textSelectMulti.css","css");
		}
		if($(this).hasClass("barrating")) { // jQuery barrating (e.g. vertbar, star, thumb, etc)
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/jquery.barrating.orc.min.js", function() {
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/jquery.actual.min.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/barRating.js");
				});
			});
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/barrating.orc.live.css","css");
			if($(this).hasClass("circle")) {
				if($(this).hasClass("bar")) { //load the bar version
					$(this).closest("div.QuestionLabel").next().addClass('bar');
					loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/bars-circle.css","css");
				} else {					  //load the single response version
					loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/circle.css","css");
				}
			}
			if($(this).hasClass("horizbar")) { loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/bars-horizontal.css","css"); }
			if($(this).hasClass("icons")) { loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/icons.css","css"); }
			if($(this).hasClass("pill")) {
				if($(this).hasClass("bar")) { //load the bar version
					loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/bars-pill.css","css");
				} else {					  //load the single response version
					loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/pill.css","css");
				}
			}
			if($(this).hasClass("square")) {
				if($(this).hasClass("bar")) { //load the bar version
					$(this).closest("div.QuestionLabel").next().addClass('bar');
					loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/bars-square.css","css");
				} else {					  //load the single response version
					loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/square.css","css");
				}
			}
			if($(this).hasClass("star")) { loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/fontawesome-stars.css","css"); }
			if($(this).hasClass("thumb")) { loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/thumbs.css","css"); }
			if($(this).hasClass("vertbar")) { loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/bars-1to10.css","css"); }
			if($(this).hasClass("smiley")) { loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/barrating/themes/emoji-face.css","css"); }
		}
		if($(this).hasClass("rank")) { //ranking question; uses custom attributes
			$(this).closest("div.QuestionLabel").next().find("table.mrQuestionTable").addClass("rank");
			var numRank = $(this).attr('numToRank'); //get numToRank attribute value
			var maxRank = $(this).attr('maxToRank'); //get maxToRank attribute value
			var message = encodeURIComponent($(this).attr('message'));
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/fixto.min.js", function() {
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/rank/rankSort.asp?numToRank="+numRank+"&maxToRank="+maxRank+"&errorTxt="+message);
			});
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/rank/rankSort.css","css");
		}
		if($(this).hasClass("maphilight")) { //map hilighter; JS loads happen down below
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/maphilight/maphilight.css","css");
		}
		if($(this).hasClass("matrix")) { //matrix questions; uses custom attributes
			$(this).closest("div.QuestionLabel").next().find("table.mrQuestionTable").addClass("matrix");
			if($(this).hasClass("vert")) {
				var cols = $(this).attr('columns'); //get number of display columns
				var arrow = $(this).attr('arrows'); //show navigation arrows
				var nums = $(this).attr('numbers'); //show # of # numbers
				var next = $(this).attr('autoNext'); //automatically proceed on final response
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/jquery.actual.min.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/matrix/multiMatrixV.asp?columns="+cols+"&arrows="+arrow+"&numbers="+nums+"&next="+next)
				});
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/matrix/matrix.css","css");
			} else if($(this).hasClass("multi")) { //multi-response matrix
				var cols = $(this).attr('columns'); //get number of display columns
				var arrow = $(this).attr('arrows'); //show navigation arrows
				var nums = $(this).attr('numbers'); //show # of # numbers
				var next = $(this).attr('autoNext'); //automatically proceed on final response
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/jquery.actual.min.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/jquery.scrollTo.min.js", function() {
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/matrix/multiMatrix.asp?columns="+cols+"&arrows="+arrow+"&numbers="+nums+"&next="+next)
					});
				});
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/matrix/matrix.css","css");
			} else if($(this).hasClass("numeric")) { //numeric response matrix
				var arrow = $(this).attr('arrows'); //show navigation arrows
				var nums = $(this).attr('numbers'); //show # of # numbers
				var advance = $(this).attr('clickToAdvance'); //require next button to advance attribute
				var next = $(this).attr('autoNext'); //automatically proceed on final response
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/jquery.actual.min.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/matrix/numMatrix.asp?arrows="+arrow+"&numbers="+nums+"&clickadvance="+advance+"&next="+next)
				});
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/matrix/numMatrix.css","css");
			} else { // regular single response categorical matrix
				var cols = $(this).attr('columns'); //get number of display columns
				var arrow = $(this).attr('arrows'); //show navigation arrows
				var nums = $(this).attr('numbers'); //show # of # numbers
				var advance = $(this).attr('clickToAdvance'); //require next button to advance attribute
				var next = $(this).attr('autoNext'); //automatically proceed on final response
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/jquery.actual.min.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/jquery.scrollTo.min.js");
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/matrix/matrix.asp?columns="+cols+"&arrows="+arrow+"&numbers="+nums+"&clickadvance="+advance+"&next="+next);
				});
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/matrix/matrix.css","css");
			}
		}
		if($(this).hasClass("player")) { //HTML5 audio/video player
			if(plyrLoadOnce) {
				if($(this).hasClass("tv")) { 		$(this).parent().find("div.ad").addClass('video');		}
				if($(this).hasClass("phone")) { 	$(this).parent().find("div.ad").addClass('phone');		}
				var autoPlay = $(this).attr('playonload'); //start automatically
				var nextType = $(this).attr('next'); //next page behavior
				var showProg = $(this).attr('progress'); //include progress bar
				var showMute = $(this).attr('mute'); //include mute control
				var showVol = $(this).attr('volume'); //include volume control
				var showFull = $(this).attr('fullscreen'); //include full screen control
				var canPause = $(this).attr('pause'); //toggle ability to pause media
				var canReplay = $(this).attr('replay'); //toggle the ability to replay media
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/plyr/plyr.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/plyr/orc-plyr.asp?playonload="+autoPlay+"&nexttype="+nextType+"&progress="+showProg+"&mute="+showMute+"&volume="+showVol+"&fullscreen="+showFull+"&pause="+canPause+"&replay="+canReplay);
				});
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/JS/plyr/plyr.css","css");
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/JS/plyr/orc-plyr.css","css");
				plyrLoadOnce = false;
			}
		}
		if($(this).hasClass("shelf")) { //shelf set question; uses custom attributes
			var numRows = $(this).attr('rows'); //# of rows to display
			var numCols = $(this).attr('columns'); //# of columns per row
			var priceStyle = $(this).attr('price'); //format of price element
			if($(this).hasClass("categorical")) {
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/shelf/shelfSet.asp?rows="+numRows+"&columns="+numCols+"&price="+priceStyle);
			}
			if($(this).hasClass("numeric")) {
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/shelf/shelfSetNum.asp?rows="+numRows+"&columns="+numCols+"&price="+priceStyle);
			}
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/shelf/lightbox/js/lightbox.js");
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/shelf/shelfSet.css","css");
			loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/shelf/lightbox/css/lightbox.css","css");
		}
		if($(this).hasClass("slider")) { //slider questions; uses custom attributes
			$(this).closest("div.QuestionLabel").next().find("table.mrQuestionTable").addClass("sliders");
			if($(this).hasClass("numeric")) {
				var maxPoint = $(this).attr('max'); //maximum response value
				var minPoint = $(this).attr('min'); //minimum response value
				var startPoint = $(this).attr('startVal'); //starting point of handle
				var increment = $(this).attr('increment'); //how far to move each slide
				var prefix = $(this).attr('prefix'); //number prefix
				var suffix = $(this).attr('suffix'); //number suffix
				var step = $(this).attr('step'); //how many steps for the scale
				var scale = $(this).attr('scale'); //scale theme
				var hideAttr = $(this).attr('hideCol1'); //hide the attribute column of a grid
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/jQuery-ui-Slider-Pips/jquery-ui-slider-pips.min.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/numSlider.asp?max="+maxPoint+"&min="+minPoint+"&startVal="+startPoint+"&increment="+increment+"&prefix="+prefix+"&suffix="+suffix+"&step="+step+"&scale="+scale+"&hideCol1="+hideAttr);
				})
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/jQuery-ui-Slider-Pips/jquery-ui-slider-pips.css","css");
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/Slider.css","css");
			}
			if($(this).hasClass("categorical")) {
				var respCount = $(this).attr('resps'); //maximum response value
				var labelTxt = $(this).attr('labelText'); //minimum response value
				var tipTxt = $(this).attr('tipText'); //starting point of handle
				var showTip = $(this).attr('showTip'); //how far to move each slide
				var hideAttr = $(this).attr('hideCol1'); //hide the attribute column of a grid
				var theme = $(this).attr('theme'); //any special themes
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/selectToUISlider/js/selectToUISlider.jQuery.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/catSlider.asp?resps=+"+respCount+"&labelText="+labelTxt+"&tipText="+tipTxt+"&showTip="+showTip+"&hideCol1="+hideAttr+"&theme="+theme);
				})
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/catSlider.css","css");
			}
			if($(this).hasClass("catMatrix")) {
				var respCount = $(this).attr('resps'); //maximum response value
				var labelTxt = $(this).attr('labelText'); //minimum response value
				var tipTxt = $(this).attr('tipText'); //starting point of handle
				var showTip = $(this).attr('showTip'); //how far to move each slide
				var hideAttr = $(this).attr('hideCol1'); //hide the attribute column of a grid
				var theme = $(this).attr('theme'); //any special themes
				var arrow = $(this).attr('arrows'); //show navigation arrows
				var nums = $(this).attr('numbers'); //show # of # numbers
				var advance = $(this).attr('clickToAdvance'); //require next button to advance attribute
				var next = $(this).attr('autoNext'); //automatically proceed on final response
				$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/selectToUISlider/js/selectToUISlider.jQuery.js", function() {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/catSliderMatrix.asp?resps=+"+respCount+"&labelText="+labelTxt+"&tipText="+tipTxt+"&showTip="+showTip+"&hideCol1="+hideAttr+"&theme="+theme+"&arrows="+arrow+"&numbers="+nums+"&clickadvance="+advance+"&next="+next);
				})
				loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/sliders/catSlider.css","css");
			}
		}
		if($(this).hasClass("zoom")) { //image zoom
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/zoom/jquery.elevatezoom.js", function() {
				$("img[id^='zoom_']").elevateZoom({
					zoomType: "lens",
					lensShape: "round",
					lensSize : 200
				});
			});
		}
	});
	$(".DefaultControls, .Theme_Full, .Theme_Empty, .Theme_Dot").not(".Theme_Line").each(function() {
		$(this).find("span.mrQuestionTable").addClass("ui-controlgroup");
		$(this).find("input.Remove_Input").each(function() {
			$(this).nextAll(':lt(2)').addBack().wrapAll("<div class='default'></div>");
		});
	});
	$(".mrSingle, .mrMultiple").each(function(index){
		if ( $(this).is( "input" ) ) {
			var thisID = $(this).prop('id');
			var osID = thisID.replace('_C','_O');
			if($("input.mrEdit#"+osID).length) {
				if($("input.mrEdit#"+osID).closest(".QuestionControls").hasClass("Theme_Line")) {
					//nada
				} else {
					$("label[for='"+thisID+"']:eq(1)").append($("input.mrEdit#"+osID).parent());
				}
			}
		}
	});
	$(".mrQuestionTable").each(function(index){ // apply some responsive defaults to grids
		if( ($("table.mrQuestionTable").find('tr:first').children('td.mrGridQuestionText').length == 0) && ($("table.mrQuestionTable").find('tr:first').children('td.mrGridCategoryText').length == 0) ) {	
			// multi-column list, do nothing
		} else {
			if ( $(this).is( "table" ) ) {
				$(this).addClass( "GridTable" );
				if($(this).hasClass("rank") || $(this).hasClass("matrix") || $(this).hasClass("sliders") || $(this).hasClass("nonresponsive") || $(this).hasClass("maxDiff")) { 
					// Don't do anything
					if($(this).hasClass("sliders")) {
						$("table.sliders").find("td:last-child").each(function() {
							$(this).find("div.default").css('border-radius',0).wrapAll("<span class='ui-controlgroup' style='margin-bottom:10px;margin-top:10px;'></span>");
						});
					}
				} else if($(this).hasClass("swipeTable")) {
					$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tablesaw/tablesaw.jquery.js", function() {
						//$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tablesaw/tablesaw-init.js");
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tablesaw/orc_tablesaw_swipe.js");
					});
					loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tablesaw/tablesaw.css","css");
				} else {
					if(($(this).find("input.mrSingle").length || $(this).find("input.mrMultiple").length)  && !isIE8 && !$("div.NumMatrix").length) { // only apply to traditional categorical grids
						$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tablesaw/tablesaw.stackonly.jquery.js", function() {
							$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tablesaw/orc_tablesaw.js");
							if($("span.theme.reverse").length) {
								$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tablesaw/flipMobile.js", function() {
									flipMobile();
								});
							}
						});
						loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tablesaw/tablesaw.stackonly.css","css");
					}
				}
			}
			$("input.Remove_Input[style*='visibility: hidden']").parent().hide();
		}
	});
});

$(window).on("load", function() {
	$("#prevText").html($(".mrPrev").attr("value")); //get the text on the previous button
	$("#nextText").html($(".mrNext").attr("value")); //get the text on the next button
	$("#stopText").html($(".mrStop").attr("value")); //get the text on the next button
	$("#nav-Prev").hide(); //hide the previous button by default
	$("div#previousPage.qButton").hide();
	if( $(".mrPrev").length ) { $("#nav-Prev").show(); $("div#previousPage.qButton").show(); } //if Dimensions includes a previous button, unhide ours
	if($("span.widget.rank").length) {		} else { $("#orcNext").on("click", function() { $(".mrNext").trigger("click"); }); } // Click Next button 
	$("#orcPrev").on("click", function() { $(".mrPrev").trigger("click"); }); // Click Previous button
	$("#orcStop").on("click", function() { $(".mrStop").trigger("click");} ); // Click Stop button

	// *************************************************************************************************************************
	// Radio button/Checkbox exclusivity for standard categoricals
	$(':radio').not($('table.mrQuestionTable').find(':radio')).on("change", function(event){
		var $x = $(this).attr('id');		
		var $x = $x.substr(0,$x.indexOf("_",$x.indexOf("_")+1));
		$(':checkbox[id^=' + $x + ']').prop('checked', false); 
	})
	$(':checkbox').not($('table.mrQuestionTable').find(':checkbox')).on("change", function(event){
		if($(this).is(':checked')) {
			var $x = $(this).attr('id');		
			var $x = $x.substr(0,$x.indexOf("_",$x.indexOf("_")+1));
			$(':radio[id^="' + $x + '"]').prop('checked', false);
		}
	})
	// Prevent clicking on OS text box from checking the checkbox in Safari
	$("label").children("span").children("input.mrEdit").on('click',function(event) {
		event.preventDefault();
	});
	// Radio button/Checkbox exclusivity for grid rows
	$(':radio').not($('span.ui-controlgroup').find(':radio')).on("change", function(event){ 
		var $x = $(this).attr('id');		
		var $x = $x.substr(0,$x.lastIndexOf("_"));
		$(':checkbox[id^="' + $x + '"]').prop('checked', false); 
	})
	$(':checkbox').not($('span.ui-controlgroup').find(':checkbox')).on("change", function(event){
		if($(this).is(':checked')) {
			var $x = $(this).attr('id');		
			var $x = $x.substr(0,getNthPosition($x,'_',3));
			$(':radio[id^="' + $x + '"]').prop('checked', false);
		}
	})
	// Radio button/Checkbox activity for line theme
	$("div.line :radio,div.line :checkbox").each(function(event) { if($(this).is(':checked')) { $(this).closest("div.line").addClass("checked"); }});
	$("div.line :radio").on("change", function(event){
		$(this).closest("div.line").addClass("checked");
		$(this).closest(".Question").find("div.line").not($(this).closest("div.line")).removeClass("checked");
	});
	$("div.line :checkbox").on("change", function(event) {
		if($(this).is(':checked')) {
			$(this).closest("div.line").addClass("checked");
		} else {
			$(this).closest("div.line").removeClass("checked");
		}
	});
	// *************************************************************************************************************************
	
	// Code to trigger the change event of radio button and check box when the table cell is clicked instead *******************
	$('table.mrQuestionTable:not(.sliders)').find("td").on("click",function() {
		var $x = $(this).find(':radio,:checkbox').attr('id');
		$(':radio[id="' + $x + '"]').prop('checked',true).trigger("change");
		$(':checkbox[id="' + $x + '"]').prop('checked', !$(':checkbox[id="' + $x + '"]').prop('checked')).trigger("change");
	});
	// *************************************************************************************************************************
	
	// Post-load Tool Tips *****************************************************************************************************
	if($(".ORCTooltip").length) {
		$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tooltipster/js/tooltipster.bundle.min.js", function() {
			$(".ORCTooltip").tooltipster({
				animation: 'grow',
				delay: 200,
				theme: 'tooltipster-light'
			});
		});
		loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tooltipster/css/tooltipster.bundle.min.css","css");
		loadcssfile("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/tooltipster/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-light.min.css","css");
	}
	// *************************************************************************************************************************

	if($("span.mrQuestionText").html()=="Loading..." || $("span.mrQuestionText").html()=="Téléchargement..." || $("span.mrQuestionText").html()=="يتم التحميل...") {
			$("#nav-Next").hide();
			$("#nav-Stop").hide();
			var t = setTimeout(function() { document.mrForm.submit(); },1000);
	}
	
	
	// trigger the open for the select
	//if($("span.ScrollList").length) {
		//$("select.mrDropdown").select2('close');
		//$("select.mrDropdown").select2('open');
	//}
	
	/* Activate Tablesaw Swipe if a column-oriented grid is present */
	if($(".swipeTable").length) {
		$(".swipeTable").each(function() {
			$(this).unwrap();
		});
		$( "body" ).trigger( "enhance.tablesaw" );
		$(".tablesaw-advance-dots li:eq(0)").hide();
	}
	if($("span.widget.maphilight").length) { //Imagemap Concept Highlighter
		$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/maphilight/jquery.maphilight.js", function() {
			$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/widgets/maphilight/concepthilighter.js");
		});
	}
	
	$("body").css("display","");
	
	// ******************** SPEED TEST CODE BEGIN ******************************************************************************
	if($('.DQ_SpeedTest')[0] != null){
		$('.DQ_SpeedTest').closest("div.Question").hide();
		var startTime, endTime;
		startTime = new Date();
		
		$( "#orcNext").unbind( "click" );
		$("#orcNext").on("click", function() { 
			endTime = new Date();
			var timeDiff = endTime - startTime; //in ms
			// strip the ms
			timeDiff /= 1000;
			// get seconds 
			var seconds = Math.round(timeDiff);
			$('.DQ_SpeedTest').closest("div.Question").find("input.mrEdit").val(seconds);
			$(".mrNext").trigger("click");
		});
	}
	
	if($('.DQ_InternetSpeed')[0] != null){
		$('.DQ_InternetSpeed').closest("div.Question").hide();
		var startTime, endTime;
		startTime = new Date();
		
		$.getScript("https://survey.mrxsurveys.com/orc/DimTemplate/JS/Font_Helper2.js", function() {
			endTime = new Date();
			var timeDiff = endTime - startTime; //in ms
			timeDiff = (25 / timeDiff)*1000; // MB/s
			// get seconds 
			var seconds = Math.round(timeDiff);
			$('.DQ_InternetSpeed').closest("div.Question").find("input.mrEdit").val(seconds);
		});
	}
	// ******************** SPEED TEST CODE END ********************************************************************************
	
});

function loadcssfile(filename, filetype){
	if (filetype=="js"){ //if filename is a external JavaScript file
		
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	if (typeof fileref!="undefined"){
	document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	
}

var getNthPosition = function(str, sub, n) {
    if (n > str.split(sub).length - 1) return -1;
    var recursePosition = function(n) {
        if (n === 0) return str.indexOf(sub);
        return str.indexOf(sub, recursePosition(n - 1) + 1);
    };
    return recursePosition(n);
};