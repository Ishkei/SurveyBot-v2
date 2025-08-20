function accordionGrid(autoSubmit) {
  if (autoSubmit) {
    jQuery("#cm-NextButton").css("display", "none");
  }
  jQuery("tr:not(:first)").find(".cm-simple-grid__cell").css("display", "none");

  jQuery(".cm-simple-grid__row-header div").append(
    '<i class="fa fa-chevron-down" aria-hidden="true"></i>'
  );
  jQuery(".cm-simple-grid__row-header div").append(
    '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
  );

  jQuery(".cm-simple-grid").addClass("accordion");
  jQuery(".cm-simple-grid__row-header")
    .eq(0)
    .siblings(".cm-simple-grid__cell")
    .slideToggle("normal", "linear");
  jQuery(".cm-simple-grid__row-header")
    .eq(0)
    .find(".fa-chevron-down")
    .css("display", "block");
  jQuery(".cm-simple-grid__row-header")
    .eq(0)
    .find(".fa-chevron-right")
    .css("display", "none");
  jQuery('input[type="radio"]').on("change", function () {
    const answerText = jQuery(this).parent().find(".cm-smart-button").text();
    const cellSelected = jQuery(this)
      .parents(".cm-smart-button")
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim();
    jQuery(this).parents("tr").find(".answerSelected").html(cellSelected);
    jQuery(this)
      .parents("tr")
      .find(".cm-simple-grid__row-header")
      .addClass("answered");
    jQuery(this).parents("tr").find(".fa-chevron-down").css("display", "none");
    jQuery(this)
      .parents("tr")
      .find(".fa-chevron-right")
      .css("display", "block");
    jQuery(this)
      .parents("tr")
      .find(".cm-simple-grid__cell")
      .slideToggle("normal", "linear");
    jQuery(this)
      .parents("tr")
      .next()
      .find(".cm-simple-grid__cell")
      .slideToggle("normal", "linear");
    jQuery(this)
      .parents("tr")
      .next()
      .find(".fa-chevron-down")
      .css("display", "block");
    jQuery(this)
      .parents("tr")
      .next()
      .find(".fa-chevron-right")
      .css("display", "none");

    if (
      jQuery(this)
        .parents("tr")
        .find(".cm-simple-grid__row-header")
        .find(".answerText")
    ) {
      jQuery(this)
        .parents("tr")
        .find(".cm-simple-grid__row-header")
        .find(".answerText")
        .remove();
    }
    jQuery(this)
      .parents("tr")
      .find(".cm-simple-grid__row-header")
      .append('<div class="answerText">' + answerText + "</div>");

    if (autoSubmit) {
      if (jQuery(".answered").length === jQuery("tr").length - 1) {
        jQuery("#cm-NextButton").click();
      }
    }
  });

  jQuery(".cm-simple-grid__row-header").on("click", function () {
    jQuery(this)
      .siblings(".cm-simple-grid__cell")
      .slideToggle("normal", "linear");
    if (jQuery(this).find(".fa-chevron-down").is(":hidden")) {
      jQuery(this).find(".fa-chevron-down").css("display", "block");
      jQuery(this).find(".fa-chevron-right").css("display", "none");
    } else {
      jQuery(this).find(".fa-chevron-down").css("display", "none");
      jQuery(this).find(".fa-chevron-right").css("display", "block");
    }
  });

  if (jQuery(".cm-smart-button").hasClass("cm-selected")) {
    const selectedBtns = jQuery(".cm-smart-button.cm-selected");
    jQuery(selectedBtns[0])
      .parent()
      .parent()
      .parent()
      .find(".cm-simple-grid__cell")
      .css("display", "none");
    jQuery(selectedBtns[0])
      .parent()
      .parent()
      .parent()
      .find(".fa-chevron-down")
      .css("display", "none");
    jQuery(selectedBtns[0])
      .parent()
      .parent()
      .parent()
      .find(".fa-chevron-right")
      .css("display", "block");
    for (let i = 0; i < selectedBtns.length; i++) {
      const answerText = jQuery(selectedBtns[i]).text();
      jQuery(selectedBtns[i])
        .parent()
        .parent()
        .parent()
        .find(".cm-simple-grid__row-header")
        .addClass("answered");
      jQuery(selectedBtns[i])
        .parent()
        .parent()
        .parent()
        .find(".cm-simple-grid__row-header")
        .append('<div class="answerText">' + answerText + "</div>");
    }
  }
}
