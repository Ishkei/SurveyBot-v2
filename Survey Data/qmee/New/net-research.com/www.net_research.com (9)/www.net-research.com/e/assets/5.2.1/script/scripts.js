/**  -------------------------------------------------------------------
 **
 **  dialog.js / 2005.07.22
 **  順位入力ボタンスクリプト
 **  version 1.1 test (Rank Button を複数セット使用できるようにする)
 **
 **  -------------------------------------------------------------------
 **/

mmRankButton = {
  nullstr: "-",
  delimiter: "_",
  cnt: new Array(),
  maxrank: new Array(),
};

// 順位ボタンセットの追加
function mmAddRankButton(qid, maxrank) {
  mmRankButton.maxrank[qid] = maxrank;

  var frm = document.getElementById("mainform");
  if (frm != null) {
    for ($i = 0; $i < frm.elements.length; $i++) {
      if (frm.elements[$i].name.substr(0, 1 + qid.length) == "b" + qid) {
        frm.elements[$i].value = mmRankButton.nullstr;
      }
    }
  }

  for (i = 1; i <= mmRankButton.maxrank[qid]; i++) {
    if (frm != null) {
      if (frm.elements[qid + mmRankButton.delimiter + i].value > 0) {
        frm.elements[
          "b" +
            qid +
            mmRankButton.delimiter +
            frm.elements[qid + mmRankButton.delimiter + i].value
        ].value = i;
      }
    }
  }
}

// 順位ボタンの入力値のクリア
function mmClearRank() {
  var frm = document.getElementById("mainform");
  for (qid in mmRankButton.cnt) {
    for (i = 1; i <= mmRankButton.cnt[qid]; i++) {
      frm.elements[qid + i].value = null;
      frm.elements["b" + qid + i].value = mmRankButton.nullstr;
    }
  }
}

// ボタンプッシュ時の順位入力・消去
function mmSwitchRank(id) {
  // 既に順位が入力されている場合はクリアする
  buf = id.split(mmRankButton.delimiter);
  qid = buf[0];

  var frm = document.getElementById("mainform");
  if (frm == null) {
    return;
  }

  if (frm.elements["b" + id].value > 0) {
    frm.elements[
      qid + mmRankButton.delimiter + frm.elements["b" + id].value
    ].value = "";
    frm.elements["b" + id].value = mmRankButton.nullstr;

    // 最小順位を検索しセットする
  } else {
    //minrank = mmRankButton.cnt[qid];
    //ranknum = new Array(mmRankButton.cnt[qid]);

    minrank = mmRankButton.maxrank[qid] + 1;

    for (i = 1; i <= mmRankButton.maxrank[qid]; i++) {
      if (frm.elements[qid + mmRankButton.delimiter + i].value == "") {
        minrank = i;
        break;
      }
    }

    if (mmRankButton.maxrank[qid] >= minrank) {
      frm.elements["b" + id].value = minrank;
      frm.elements[qid + mmRankButton.delimiter + minrank].value = buf[1];
    }
  }
  return;
}

function func(a, b) {
  return b - a;
}

function funcRotate(qid) {
  var widarr = new Array();
  var sa = new Array();
  var num = new Array();
  var hei1 = jQuery("div#qa-q" + qid + " td.mt-hyoto").height();
  var elm0 = jQuery("div#qa-q" + qid + " td.mt-hyoken");
  var elm1 = jQuery("div#qa-q" + qid + " td.mt-hyoto:has(div.vertical)");
  var elm2 = jQuery("div#qa-q" + qid + " td.mt-hyoto div.vertical");
  var cnt = 0;
  var cnt1 = 0;
  var h = jQuery("span.codeview-selectionid").height();
  jQuery(elm0).each(function () {
    sa[cnt] =
      jQuery("div#qa-q" + qid + " td.mt-hyoken").height() -
      jQuery(
        "div#qa-q" + qid + " td.mt-hyoto div.vertical:eq(" + cnt + ")"
      ).height();
    cnt++;
  });

  jQuery(elm2).each(function () {
    var inner = jQuery(this).html();
    var expl = inner.split("<br>");
    num[cnt1] = expl.length;
    cnt1++;
  });

  num.sort(func);
  num = num[0] + 1;

  sa.sort(func).reverse();
  sa = sa[0] / 2;
  if (!SharedFunction.isIE()) {
    jQuery("#qa-q" + qid + " td.mt-hyoto").attr("nowrap", "nowrap");
  }
  var i = 0;
  jQuery(elm1).each(function () {
    widarr[i] = parseInt(jQuery(this).width());
    i++;
  });
  widarr.sort(func);
  var wid = widarr[0] + sa + 35 + h;
  var hei = jQuery("#qa-q" + qid + " td.mt-hyoto").css("height");

  jQuery("#qa-q" + qid + " td.mt-hyoto div.vertical")
    //.css("margin-top",(sa) +"px")
    //.css("margin-right","0px")
    .css("margin", "0px auto")
    .css("display", "block")
    .css("-moz-transform", "rotate(90deg)")
    .css("-o-transform", "rotate(90deg)")
    .css("-webkit-transform", "rotate(90deg)")
    .css("writing-mode", "tb-rl")
    .css("text-align", "left")
    .css("-ms-writing-mode", "tb-rl");
  jQuery("#qa-q" + qid + " td.mt-hyoto div.vertical").css("height", wid + "px");

  if (!SharedFunction.isIE()) {
    //var hyotowid = jQuery("#qa-q"+ qid +" td.mt-hyoto").width();
    jQuery("#qa-q" + qid + " td.mt-hyoto div.vertical").width(hei1);
    jQuery("#qa-q" + qid + " td.mt-hyoto div.vertical").css(
      "height",
      num + "em"
    );
    /*
		jQuery("#qa-q"+ qid +" td.mt-hyoto div.vertical").each(function(){
			if(jQuery(this).css("height") > num + "em"){
				jQuery("#qa-q"+ qid +" td.mt-hyoto div.vertical").css("height",num+"em");
			}
		});
		*/
    jQuery("#qa-q" + qid + " td.mt-hyoto:has(div.vertical)")
      .css("height", wid + "px")
      .css("width", hei1 + "px");
  }
}

function addListener(elem, eventType, func, cap) {
  if (elem.addEventListener) {
    elem.addEventListener(eventType, func, cap);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + eventType, func);
  }
}

function removeListener(elem, eventType, func, cap) {
  if (elem.removeEventListener) {
    elem.removeEventListener(eventType, func, cap);
  } else if (elem.detachEvent) {
    elem.detachEvent("on" + eventType, func);
  }
}

function checkTateichi() {
  var mtmTableElms = document.querySelectorAll("table.chkmtm");
  var mtsTableElms = document.querySelectorAll("table.chkmts");
  if (
    nTateichiAlert == 0 &&
    !SharedFunction.validateTateichi(mtmTableElms, mtsTableElms)
  ) {
    // javascript.tplでPHPから渡される。
    alert(MSG_MARTIX_ALERT);
    nTateichiAlert++;
    return false;
  }
  return true;
}

function ChangeCharacterSize(i) {
  switch (i) {
    case 1:
      sz = "12px";
      break;
    case 2:
      sz = "16px";
      break;
    case 3:
      sz = "20px";
      break;
    default:
      return;
  }

  for (j = 0; j < document.styleSheets.length; j++) {
    mysheet = document.styleSheets[j];
    myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;
    if (!myrules) {
      continue;
    }
    for (k = 0; k < myrules.length; k++) {
      if (myrules[k].selectorText == "" || myrules[k].selectorText == "*") {
        myrules[k].style.fontSize = sz;
        hcs = document.getElementById("hdncharactersize");
        if (hcs) {
          document.getElementById("hdncharactersize").value = i;
        }
        break;
      }
    }
  }
}

function confirmEnoq() {
  if (!checkTateichi()) {
    return false;
  }

  var mainFormElm = document.getElementById("mainform");

  SharedFunction.goNext(mainFormElm);
}

function in_array(needle, haystack, argStrict) {
  // Checks if the given value exists in the array
  //
  // version: 1109.2015
  // discuss at: http://phpjs.org/functions/in_array    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: vlado houba
  // +   input by: Billy
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);    // *     returns 1: true
  // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
  // *     returns 2: false
  // *     example 3: in_array(1, ['1', '2', '3']);
  // *     returns 3: true    // *     example 3: in_array(1, ['1', '2', '3'], false);
  // *     returns 3: true
  // *     example 4: in_array(1, ['1', '2', '3'], true);
  // *     returns 4: false
  var key = "",
    strict = !!argStrict;

  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] == needle) {
        return true;
      }
    }
  }
  return false;
}
