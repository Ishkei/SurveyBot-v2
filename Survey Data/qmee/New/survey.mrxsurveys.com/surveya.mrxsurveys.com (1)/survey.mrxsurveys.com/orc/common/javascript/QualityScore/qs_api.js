var pageId = "";
var matrixData = "";
var jsonResponse;
var t;

window.addEventListener("message", function (event) {
  if (event.data.search("Error") > -1) {
    console.log('Message Received');
    clearTimeout(t);
    // Turn the fake button back on
    $("#orcNextFakeQS").one('click', function (event) {
      console.log("click");
      if ($(".GridTable").length) {
        if ($(".GridTable input[type='radio']").length || $(".GridTable input[type='checkbox']").length) {
          pageId = $("input[name='I.SavePoint']").val(); // Question Name
          matrixData = pageId + ":";
          onRow = 1;
          $(".GridTable > tbody > tr").each(function () {
            hadOne = 0;
            if (onRow > 1) {
              rowString = ";";
            } else {
              rowString = "";
            }
            onCol = 1;
            $(this).find("input").each(function () {
              if ($(this).is(':checked')) {
                if (hadOne == 0) {
                  rowString = rowString + onRow + "-" + onCol;
                } else {
                  rowString = rowString + "," + onRow + "-" + onCol;
                }
                hadOne = 1;
              }
              onCol++;
            });
            onRow++;
            if (hadOne > 0) {
              matrixData = matrixData + rowString;
            }
          });
          if ($(".GridTable > tbody > tr input:checked").length) {
            // If they gave at least one response, look for skipped rows and blank them out
            matrixData = matrixData.replace(":;", ":");
            matrixData = matrixData.replace(";;", ";");
          } else {
            // If they left the whole grid question blank, blank out the Imperium string
            matrixData = "";
          }
        }
      }
      t = setTimeout("QSDataNoResponse();", 5000);
      console.log(matrixData);
      imperium_qualityscore.CollectData(pageId, matrixData, CollectDataResponse);
    });
  }
}, false);

// If there is a response
function CollectDataResponse(jsonData) {
	// Clients can access response fields using syntax: jsonData.fieldname
	// eg: jsonData.StatusCode
	jsonResponse = jsonData;
	console.log(jsonData);
	console.log($("input#GeoCodes").length);
	if($("input#GeoCodes").length) {
		$("textarea[name='_QGKLOOP_Qid_QGKDATA'").val($("span#respidxx").children("span.mrBannerText").html());
		$("textarea[name='_QGKLOOP_Qsurvey_QGKDATA'").val($("span#projectidx").children("span.mrBannerText").html());
		$("textarea[name='_QGKLOOP_QgeoCodes_QGKDATA'").val("1,US");
		$("textarea[name='_QGKLOOP_QisNew_QGKDATA'").val(jsonResponse.RVIDResult.IsNew)
		$("textarea[name='_QGKLOOP_Qscore_QGKDATA'").val(jsonResponse.RVIDResult.Score)
		$("textarea[name='_QGKLOOP_QoldId_QGKDATA'").val(jsonResponse.RVIDResult.OldId)
		$("textarea[name='_QGKLOOP_QoldDate_QGKDATA'").val(jsonResponse.RVIDResult.OldIdDate)
		$("textarea[name='_QGKLOOP_QgeoValid_QGKDATA'").val(jsonResponse.RVIDResult.GeoIp)
		$("textarea[name='_QGKLOOP_QgkId_QGKDATA'").val(jsonResponse.RVIDResult.RVid)
		//$("textarea[name='_QGKLOOP_Qproperties_QGKDATA'").val(JSON.stringify(jsonResponse.RVIDResult.valueOf()))
		$("textarea[name='_QGKLOOP_QfraudRisk_QGKDATA'").val(jsonResponse.RVIDResult.FraudRiskProbability)
		$("textarea[name='_QGKLOOP_QipStatus_QGKDATA'").val(jsonResponse.RVIDResult.IPStatus)
	}
	$("#orcNext").click();
}

// If there is no response
function QSDataNoResponse(){
	$("#orcNext").click();
}

$(function() {
	if($("input#GeoCodes").length) {
		$(".mrQuestionTable td").hide();
		$(".mrNext").hide();
		$(".mrStop").hide();
		$("span.mrBannerText").hide();
	}
	var nextTxt = $(".mrNext").attr("value")
	$("#orcNext").hide().after("<span id='orcNextFakeQS' class='orcButton'><span id='nextText'>"+nextTxt+"</span> <span class='fa-chevron-right'></span></span>");
	$("input#SurveyID").hide().val($("span#projectidx").children("span.mrBannerText").html());
	$("input#PanelistID").hide().val($("span#respidxx").children("span.mrBannerText").html());
	$("input#ClientID").hide().val("2088F759-6B64-426D-A55B-0F990D075A6F");
	pageId = $("input[name='I.SavePoint']").val(); // Question Name
	if($("input#GeoCodes").length) {
		$.getScript("https://d2cjqdos4nhnz5.cloudfront.net/qslib1.0.js",function() {
			t = setTimeout( function(){ $("textarea[name='_QGKLOOP_Qid_QGKDATA'").val($("span#respidxx").children("span.mrBannerText").html()); $("#orcNext").click(); }, 30000 ); 
			imperium_qualityscore.CollectData(pageId, matrixData, CollectDataResponse);
		});
	} else {
		if($("textarea.mrEdit").length) {
			$("textarea.mrEdit").addClass("imperium-ra-question").removeClass("mrEdit");
			$("input#ClientID").after("<input type='hidden' name='LangCode' id='LangCode' value='EN' /><input type='hidden' name='BillingCode' id='BillingCode' value='' />");
		}
		$.getScript("https://d2cjqdos4nhnz5.cloudfront.net/qslib1.0.js");
		
		// Set up the fake button to call the API
		$("#orcNextFakeQS").one('click', function(event){
			console.log("click");
			if($(".GridTable").length) {
				if($(".GridTable input[type='radio']").length || $(".GridTable input[type='checkbox']").length) {
					pageId = $("input[name='I.SavePoint']").val(); // Question Name
					matrixData = pageId + ":"
					onRow = 1;
					$(".GridTable > tbody > tr").each(function() {
						hadOne = 0;
						if(onRow > 1) {
							rowString = ";";
						} else {
							rowString = "";
						}
						onCol = 1;
						$(this).find("input").each(function() {
							if($(this).is(':checked')) {
								if(hadOne == 0) {
									rowString = rowString + onRow + "-" + onCol;
								} else {
									rowString = rowString + "," + onRow + "-" + onCol;
								}
								hadOne = 1;
							}
							onCol++;
						});
						onRow++;
						if(hadOne > 0) { matrixData = matrixData + rowString; }
					});
					if($(".GridTable > tbody > tr input:checked").length) { // If they gave at least one response, look for skipped rows and blank them out
						matrixData = matrixData.replace(":;",":");
						matrixData = matrixData.replace(";;",";");
					} else { // If they left the whole grid question blank, blank out the Imperium string
						matrixData = "";
					}
				}
			}
			t = setTimeout("QSDataNoResponse();", 5000);
			console.log(matrixData);
			imperium_qualityscore.CollectData(pageId, matrixData, CollectDataResponse);
		});
	}	
});