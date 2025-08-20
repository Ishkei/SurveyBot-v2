var pageTimer = 5,
  duration = 1 /*seconds*/,
  intv = null;
var waitForWebCamSniffer = 0;
function submitter() {
  //relevantid functions
  try {
    if (
      pageTimer <= 0 || //timer expired
      (window.processingDone.rlvId === 1 &&
        window.webCamSet === 1 &&
        (window.processingDone.iov === 1 ||
          $("input#iov_call").val() !== "yes")) || //relevant id ran and web cam is done
      window.processingDone.iov === 1 ||
      $("input#iov_call").val() !== "yes"
    ) {
      //relevant id from cookie and we do have a web cam sniffer postback
      clearInterval(intv);
      try {
        document.ctlform.submit();
      } catch (e) {
        document.getElementById("submit-button").click();
      }
    }
  } catch (e) {
    window.handleError(e);
  }
}

function updateTimer() {
  try {
    pageTimer -= 1;
    duration += 1;
    if (pageTimer >= 0) {
      $("#loadercnt #time").html(pageTimer);
      $("#rvidtime").val(duration);

      //get the blackbox
      if ($("input#iov_call").val() === "yes") {
        bb = window.IGLOO.getBlackbox();
        if (bb && bb.finished) {
          window.processingDone.iov = 1;
          var blackboxOK = document.getElementById("iov_blackbox");
          if (blackboxOK) {
            blackboxOK.value = bb.blackbox;
          } else {
            createTag(
              "input",
              {
                id: "iov_blackbox",
                type: "hidden",
                name: "iov_blackbox",
                value: blackboxOk.blackbox,
              },
              "ctlform"
            );
          }
          pageTimer = 0;
          submitter();
          //console.log("blackbox:" + bb.finished + "value: " + bb.blackbox);
        }
      }
    } else {
      //rvid or web cam not responded
      if (
        document.getElementById("RVIDCompleted").value == "0" &&
        waitForWebCamSniffer != 1
      ) {
        window.processingDone.rlvId = 1;
        document.getElementById("Error").value = "Timeout Error";
      }

      // get the blackbox
      window.processingDone.iov = 1;
      bb = "";
      try {
        if ($("input#iov_call").val() === "yes") {
          bb = window.IGLOO.getBlackbox();
          if (bb && bb.finished) {
            var blackboxOK = document.getElementById("iov_blackbox");
            if (blackboxOK) {
              blackboxOK.value = bb.blackbox;
            } else {
              createTag(
                "input",
                {
                  id: "iov_blackbox",
                  type: "hidden",
                  name: "iov_blackbox",
                  value: blackboxOk.blackbox,
                },
                "ctlform"
              );
            }
            //console.log("blackbox:" + bb.finished + "value: " + bb.blackbox);
          } else {
            //iov not responded
            var blackbox = document.getElementById("iov_blackbox");
            if (blackbox) {
              blackbox.value = "";
            } else {
              createTag(
                "input",
                {
                  id: "iov_blackbox",
                  type: "hidden",
                  name: "iov_blackbox",
                  value: "",
                },
                "ctlform"
              );
            }
            //console.log("blackbox failed due to timeout");
          }
        }
      } catch (e) {
        window.handleError(e);
      }
      submitter(); //submit the page because the respondent waited 5 seconds
    }
  } catch (e) {
    window.handleError(e);
  }
}

function RVIDResponseComplete() {
  try {
    window.processingDone.rlvId = 1;
    document.getElementById("RVIDCompleted").value = "1";
    submitter();
  } catch (e) {
    window.handleError(e);
  }
}
/*end of relevantid functions*/

function doRVID() {
  waitForWebCamSniffer = 1;
  $("#loadercnt #time").html(pageTimer);
  $("#rvidtime").val(0);

  //get the blackbox
  if ($("input#iov_call").val() === "yes") {
    bb = window.IGLOO.getBlackbox();
    //console.log("blackbox start");
    if (bb && bb.finished) {
      window.processingDone.iov = 1;
      var blackboxOK = document.getElementById("iov_blackbox");
      if (blackboxOK) {
        blackboxOK.value = bb.blackbox;
      } else {
        createTag(
          "input",
          {
            id: "iov_blackbox",
            type: "hidden",
            name: "iov_blackbox",
            value: blackboxOk.blackbox,
          },
          "ctlform"
        );
      }
      console.log("blackbox 0");
      pageTimer = 0;
      submitter();
    } else {
      intv = setInterval(updateTimer, 500);
    }
  } else {
    pageTimer = 0;
    submitter();
  }
}
