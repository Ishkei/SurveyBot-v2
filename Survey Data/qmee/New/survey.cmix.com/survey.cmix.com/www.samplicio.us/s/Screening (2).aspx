

<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="description" /><meta name="keywords" /><meta http-equiv="Pragma" content="no-cache" /><meta http-equiv="Expires" content="-1" /><meta http-equiv="CACHE-CONTROL" content="no-store" />

    <!-- JEC 09/14/2010 - do not allow robots to crawl Router -->
    <meta name="robots" content="noindex" /><meta name="robots" content="nofollow" /><meta name="robots" content="nosnippet" /><meta name="robots" content="noodp" /><meta name="robots" content="noydir" /><meta name="robots" content="noarchive" /><meta name="robots" content="unavailable_after: 07-FEB-2011 00:00:00 EST" /><meta name="robots" content="noimageindex" /><title>

</title>

    <script type="text/javascript">
        window.history.forward();
        var pageStart = new Date().getTime();
    </script>
</head>
<body>
<img alt="Loading" style="position: absolute; top: 50%; left: 50%; margin-top: -24px; margin-left: -24px" src="Includes/images/loader-green.gif" />
<form method="post" action="./RelevantID.aspx?RVPID=7tQaMSMj7cGNT4BHLi1T1u4s&amp;RVSID=67242433&amp;RSID=25c60be2-e290-4e4a-9bb2-fe3e52f97324&amp;RVTO=8000&amp;SSID=68a57a88-1248-6abc-071a-beea292797a3" id="formRelevantID">
<div class="aspNetHidden">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTY0NDMzODAxMGRkslIo6jWNbNnRdeeCaXDsH9lihh4=" />
</div>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="A50583E0" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEdAASiNxxOMqTMiI4kT4MRmueiVA+Sk9DMJinQPuK1H6scuNxyFUYtvSk8uef1U7n5esHt7E3pw5ZLMAH2FQP1kpqNj/K+WXTxFV7ZrqYTn28IH2gvdIE=" />
</div>
    <input type="hidden" name="SampleChainSearchResponse" id="SampleChainSearchResponse" />
    <input type="hidden" name="PageLoadTimeMs" id="PageLoadTimeMs" />
    <input type="hidden" name="PageTimeSpentMs" id="PageTimeSpentMs" />
</form>

<script src="includes/js/jquery.min.js"></script>
<script src="includes/js/bluebird.min.js"></script>

<script src="includes/js/monitoring.js?v=1723732672"></script>
<script type="text/javascript">
    var start = new Date().getTime();
    var timeoutId = null;
    var timedOut = false;
    var redirectUrl = null;

    var pageTimeSpentTimerStart = start;
    var pageLoadTimeMs;
    window.addEventListener("DOMContentLoaded", function() { 
        pageTimeSpentTimerStart = new Date().getTime();
        pageLoadTimeMs = new Date().getTime() - pageStart;
    });


    function setPageTimeSpent(){
        document.getElementById('PageLoadTimeMs').value = pageLoadTimeMs;
        document.getElementById('PageTimeSpentMs').value = new Date().getTime() - pageTimeSpentTimerStart;
    }

    // Responds to the return of the relevant ID call in the iframe where it is loaded
    // Listens for data from cops
    function messageHandler(event) {
        if (!timedOut) {
            document.getElementById('SampleChainSearchResponse').value = JSON.stringify(event.data);
            setPageTimeSpent();
            document.getElementById('formRelevantID').submit();
        }
    }

    /*
     * Gets the value of a query string parameter
     */
    function extractQueryStringParam(param) {
        var querySt = window.location.search.substring(1);
        var queryStringArray = querySt.split('&');
        for (var i = 0; i < queryStringArray.length; i++) {
            var ft = queryStringArray[i].split('=');
            if (ft[0].toLowerCase() === param.toLowerCase()) {
                return ft[1];
            }
        }
        return '';
    }

    const sampleChainStartTime = Math.floor(Date.now());

    const sampleChainBaseURL = "https://prod.rtymgt.com";
    const sampleChainPublicKey = "09489503-3059-4129-a9fa-734c31d0d111";
    const surveyId = "67242433";
    const sessionId = "68a57a88-1248-6abc-071a-beea292797a3";
    const supplierID = "1052";
    const researchDefenderTestingType = "B"

    const getSampleChainSearchResults = async () => {
        return new Promise((resolve) => {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            const url = sampleChainBaseURL + "/api/v4/respondents/search/" + sampleChainPublicKey;
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            let body = {
                sy_nr: surveyId,
                sn_ud: sessionId,
            }
            if (researchDefenderTestingType === "A") {
                body.pm_sr_id = supplierID;
            }

            requestBody = JSON.stringify(body);
            
            request.onload = function () {
                let status = request && request.status;
                monitoring.postCounter("fraud_detection.samplechain_search.response.status." + status.toString(), 1);
                if (status >= 200 && status < 400) {
                    const endTime = Math.floor(Date.now());
                    resolve([request.response, endTime]);
                } else {
                    monitoring.postLog("SampleChain Search returned a non-200 status", { sessionId, surveyId, status });
                }
            };
            request.send(requestBody);
        });
    };


    const runSampleChainSearch = async () => {
        const [results, endTime] = await getSampleChainSearchResults();
        var parsedResult = encodeURIComponent(results);
        try {
            parsedResult = JSON.parse(results)
        } catch{
            // not a valid json, value will be passed to the backed and logged
        }
        var event = {
            data: {
                response: parsedResult,
                isSampleChainSearchResponse: true,
                sessionSid: sessionId,
                surveyId: surveyId,
                elapsed: endTime - sampleChainStartTime
            }
        };
        messageHandler(event);
    };

    runSampleChainSearch();

    /* 
     * If the call to SampleChain Search API does not respond, redirect via a timeout
     */
    function timeout() {
        // Stop listening for messages since there was a timeout
        timedOut = true;
        monitoring.postLog("SampleChain Search did not respond", { url: window.location });
        setPageTimeSpent();
        document.getElementById('formRelevantID').submit();
    }

    var timeOut = extractQueryStringParam('RVTO');
    if (timeOut === '') {
        timeOut = '8000';
    }
    timeoutId = setTimeout('timeout();', timeOut);
</script>
</body>
</html>
