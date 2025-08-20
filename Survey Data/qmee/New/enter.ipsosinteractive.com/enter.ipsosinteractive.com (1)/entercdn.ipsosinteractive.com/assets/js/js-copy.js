$(document).ready(function () {
  $(".js-tooltip").tooltip();

  $(".js-copy").click(function () {
    var text = $(this).attr("data-copy");
    var el = $(this);
    copyToClipboard(text, el);
  });
});

function isOS() {
  return navigator.userAgent.match(/ipad|iphone/i);
}

function copyToClipboardTextFromInput() {
  var el = $(document.getElementById("copyButton"));
  var text =
    window.location.hostname +
    "/static/" +
    document.getElementById("link").value.replace(/ /g, "-");
  copyToClipboard(text, el);
}

function copyToClipboard(text, el) {
  var copyTest = document.queryCommandSupported("copy");
  var elOriginalText = el.attr("data-original-title");
  var range, selection;

  if (copyTest === true) {
    var copyTextArea = document.createElement("textarea");
    copyTextArea.value = text;
    copyTextArea.setAttribute("readonly", "");
    document.body.appendChild(copyTextArea);

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(copyTextArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyTextArea.setSelectionRange(0, 999999);
    } else {
      copyTextArea.select();
    }

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "Copied!" : "Whoops, not copied!";
      el.attr("data-original-title", msg).tooltip("show");
    } catch (err) {
      console.log("Oops, unable to copy");
    }
    document.body.removeChild(copyTextArea);
    el.attr("data-original-title", elOriginalText);
  } else {
    // Fallback if browser doesn't support .execCommand('copy')
    window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
  }
}
