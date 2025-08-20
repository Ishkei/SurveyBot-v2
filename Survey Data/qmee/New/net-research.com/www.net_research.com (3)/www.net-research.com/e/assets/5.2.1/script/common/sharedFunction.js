// @see https://github.com/umdjs/umd
// @see http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], function (b) {
      return (root.returnExportsGlobal = factory(b));
    });
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals
    root.SharedFunction = factory(root.jQuery);
  }
})(this, function ($) {
  var PHP_API_URL = "/e/api";

  /**
   * サーバのUTCDateを取得する。
   * プロミスパターン。
   *
   * @param {string} - csrfkey CSRF対策の一時キー
   * @return {Date} - サーバの時間オブジェクト
   */
  function getUTCDate_async_(csrfkey) {
    var SERVER_TIME_API = PHP_API_URL + "/settings/time";
    var defer = $.Deferred();
    $.ajax({
      async: true,
      cache: true,
      timeout: 2000,
      type: "GET",
      url: SERVER_TIME_API + "?" + "token=" + csrfkey,
      dataType: "text",
      success: defer.resolve,
      error: defer.reject,
    });
    return defer.promise();
  }

  /**
   * サーバのUTCDateを取得する。
   * プロミスパターン。
   * 復旧処理付き
   *
   * @param {string} - csrfkey CSRF対策の一時キー
   * @return {Date} - サーバの時間オブジェクト
   */
  function getUTCDate_async(csrfkey) {
    var defer = $.Deferred();

    getUTCDate_async_(csrfkey).then(
      function (data) {
        var json = $.parseJSON(data);
        defer.resolve(new Date(json.time * 1000));
      },
      function (error) {
        defer.resolve(new Date());
      }
    );

    return defer.promise();
  }

  /**
   * クライアントの UTC 時刻を取得する．
   * 非同期処理ではないが getUTCDate_async メソッドと形式が一致するように promise パターンで記述．
   *
   * @return {Date} - クライアントの時間オブジェクト
   */
  function getClientUTCDate_sync() {
    var d = $.Deferred();
    d.resolve(new Date());
    return d.promise();
  }

  /**
   * cm FA タグが現在の window.document 内に含まれているかどうかを取得する．
   * @param {string} qName 指定すると qName が cm FA タグであるかどうかを調べる．
   *                       null の場合は，cm FA タグがあるかどうかを調べる．
   * @return {bool} 含まれている場合は true
   */
  function isExistCmFa(qName) {
    var selector = !qName ? "[id $= '_mv']" : "#" + qName + "_mv";
    return $(selector).length != 0;
  }

  /**
   * 次へ進む処理
   *
   * * 回答完了時刻を設定する。（クライアントの現在時刻）
   * * メインフォームのサブミット処理をする。
   *
   * @param {HTMLFormElement} mainFormElm
   * @return void
   */
  function goNext(mainFormElm) {
    mainFormElm.submit();
  }

  /**
   * 状況に応じた時刻取得 promise を取得する
   * 現状，ページ内に FA タグ(type=cm)が含まれている場合はサーバ時刻を取得し，
   * そうでない場合はクライアント時刻を取得する．
   *
   * @param {string} - csrfkey CSRF対策の一時キー
   * @return {promise} - jQuery の promise オブジェクト
   */
  function getUTCDate(csrfkey) {
    if (isExistCmFa()) {
      return getUTCDate_async(csrfkey);
    }
    return getClientUTCDate_sync();
  }

  /**
   * マトリクスのinputタグのIDから各要素をばらす。
   *
   * @param {string} inputId "{設問番号}_{項目番号}_{選択肢番号}"
   * @return {Object} { qqid, itemId, selectId }
   */
  function parceId(inputId) {
    var tmp = inputId.split("_");
    return {
      qqId: tmp[0],
      itemId: tmp[1],
      selectId: tmp[2],
    };
  }

  /**
   * arrayオブジェクトのfilterに指定することで、uniqueにしてくれる。
   *
   * @param {any} x
   * @param {int} i
   * @param {array} self
   */
  function array_unique(x, i, self) {
    return self.indexOf(x) === i;
  }

  /**
   * タテイチチェックをする
   *
   * ※ マトリクス設問で縦方向で同一の回答をしているかどうかをチェックする。
   * たとえば、すべての項目で選択肢1が選択されている場合、考えて回答していないと判定する。
   *
   * ## タテイチの仕様
   *
   * * 設問タイプMTS・MTMで `chkmtm` または `chkmts` がクラスに設定されている場合に動作する。
   * * 一度エラーになった後は、チェックを実施せず常に正常とみなす。
   * * ~~(バグ？)複数設問が表示されているとき、最後にチェックしたMTSが正常なら、MTMがエラーだったとしても正常とする。~~
   * * ~~(バグ？)複数設問が表示されているとき、同一設問タイプ内で最後にチェックしたものが正常なら正常とする。~~
   * * 複数設問がタテイチチェック対象のとき、どれか一つでもタテイチエラーの場合はエラーを表示する。
   * * 複数設問がタテイチチェック対象のとき、どれか一つの設問が原因で一度でもアラートを出したら次回以降アラートを出さない。
   *
   * ## タテイチ判定条件
   *
   * ### MTSの場合
   *
   * 以下のように同一選択肢をすべての項目で選んでいる場合はタテイチとして判定する。
   *
   * |_    |選択肢1|選択肢2|選択肢3|
   * |-----|-------|-------|-------|
   * |項目1|  ○   |  🔘   |  ○   |
   * |項目2|  ○   |  🔘   |  ○   |
   * |項目3|  ○   |  🔘   |  ○   |
   * |項目4|  ○   |  🔘   |  ○   |
   *
   * 任意項目が存在して、未回答の項目がある場合は問題なしとする。
   *
   * |_    |選択肢1|選択肢2|選択肢3|
   * |-----|-------|-------|-------|
   * |項目1|  ○   |  🔘   |  ○   |
   * |項目2|  ○   |  ○   |  ○   |
   * |項目3|  ○   |  🔘   |  ○   |
   * |項目4|  ○   |  🔘   |  ○   |
   *
   * ### MTMの場合
   *
   * MTSと同一だが、複数選択肢をすべての項目で同一で選択していた場合もタテイチとして判定する。
   *
   * |_    |選択肢1|選択肢2|選択肢3|
   * |-----|-------|-------|-------|
   * |項目1|  ☑   |  ☑   |  □   |
   * |項目2|  ☑   |  ☑   |  □   |
   * |項目3|  ☑   |  ☑   |  □   |
   * |項目4|  ☑   |  ☑   |  □   |
   *
   * 以下のように選択肢1が同じだとしても、選択肢2に一つだけチェックがついている場合は問題なしとする。
   *
   * |_    |選択肢1|選択肢2|選択肢3|
   * |-----|-------|-------|-------|
   * |項目1|  ☑   |  □   |  □   |
   * |項目2|  ☑   |  ☑   |  □   |
   * |項目3|  ☑   |  □   |  □   |
   * |項目4|  ☑   |  □   |  □   |
   *
   * また、付属FAでチェックボックスを使う場合は、そのチェックボックスもチェック対象に入ってしまうため
   * 付属FAチェックボックスにチェックが入った時点でタテイチチェック対象外となる。
   *
   * |_      |選択肢1|選択肢2|選択肢3|
   * |-------|-------|-------|-------|
   * |項目1  |  ☑   |  □   |  □   |
   * |項目2  |  ☑   |  □   |  □   |
   * |項目3  |  ☑   |  □   |  □   |
   * |項目4☑|  ☑   |  □   |  □   |
   *
   * ## 前提となるHTML構造
   *
   * ```
   * <table class="chkmtm|chkmts">
   *     ...
   *         <td><!-- チェックボックスの場合 -->
   *             <input
   *                 type="checkbox"
   *                 id="{設問番号}_{項目番号}_{選択肢番号}"
   *                 name="{設問番号}_{項目番号}_{選択肢番号}"
   *                 value="1" />
   *             <!-- ラジオボタンの場合 -->
   *             <input
   *                 type="radio"
   *                 id="{設問番号}_{項目番号}_{選択肢番号}"
   *                 name="{設問番号}_{項目番号}"
   *                 value="{選択肢番号}" />
   *         </td>...
   *     ...
   * </table>
   * ```
   *
   * @param {NodeList} mtmTableElms MTM設問を表すテーブルタグの element オブジェクトのライブでない NodeList
   * @param {NodeList} mtsTableElms MTS設問を表すテーブルタグの element オブジェクトのライブでない NodeList
   * @return {boolean} true: 問題なし false: チェックエラー
   */
  function validateTateichi(mtmTableElms, mtsTableElms) {
    var VALID = true,
      INVALID = !VALID,
      $mtmTables = $(mtmTableElms),
      isValidToMTM = false,
      $mtsTables = $(mtsTableElms),
      isValidToMTS = false;

    // 対象になる設問がない場合はOK
    if ($mtmTables.length <= 0 && $mtsTables.length <= 0) return VALID;

    // まずは候補になるMTMすべてのうち一件でもタテイチエラーがあるかどうか
    isValidToMTM =
      $mtmTables.filter(function (index, tables) {
        var ERROR = true,
          SUCCESS = !ERROR,
          $inputList = $("input:checkbox, input:radio", tables),
          selectionCheckedCount = 0;

        // 項目問わず、選択されている選択肢数をカウント
        selectionCheckedCount = $inputList
          .filter(function (index, input) {
            return $(input).prop("checked");
          })
          .map(function (index, input) {
            return parceId($(input).attr("id")).selectId;
          })
          .get() // ここでjQuery => array
          .filter(array_unique).length;

        // 選択されている選択肢がない場合はOK
        if (selectionCheckedCount == 0) return SUCCESS;

        // 全ての項目で、選択されている選択肢数が一致する場合はエラー
        return (
          ERROR ==
          ($inputList
            .map(function (index, input) {
              return parceId($(input).attr("id"));
            })
            .map(function (index, id) {
              return id.qqId + "_" + id.itemId + "_";
            })
            .get() // ここでjQuery => array
            .filter(array_unique)
            .filter(function (qqIdAndItemId) {
              return (
                $("input[id^=" + qqIdAndItemId + "]:checked", tables).length !=
                selectionCheckedCount
              );
            }).length ==
            0)
        );
      }).length <= 0;

    // MTMでNGが出ていた場合はエラーを返してしまう
    if (!isValidToMTM) return INVALID;

    // 次に候補になるMTSすべてのうち一件でもタテイチエラーがあるかどうか
    isValidToMTS =
      $mtsTables.filter(function (index, tables) {
        var ERROR = true,
          SUCCESS = !ERROR,
          $inputList = $("input:radio", tables),
          qqIdAndItemIdList,
          hasAnyUnanswered = false;

        // inputタグがない場合はチェックしない。
        if ($inputList.length <= 0) return SUCCESS;

        // 項目リストを作る。
        qqIdAndItemIdList = $inputList
          .map(function (index, input) {
            return parceId($(input).attr("id"));
          })
          .map(function (index, id) {
            return id.qqId + "_" + id.itemId;
          })
          .get() // ここでjQuery => array
          .filter(array_unique);

        // 選択されていない項目が存在した場合は即問題なし。
        hasAnyUnanswered =
          qqIdAndItemIdList.filter(function (qqIdAndItemId) {
            return (
              $inputList.filter("input[name=" + qqIdAndItemId + "]:checked")
                .length == 0
            );
          }).length > 0;
        if (hasAnyUnanswered) return SUCCESS;

        // 全ての項目で同じ選択肢を選んでいる場合はエラー
        return (
          ERROR ==
          (qqIdAndItemIdList
            .map(function (qqIdAndItemId) {
              return $inputList.filter(
                "input[name=" + qqIdAndItemId + "]:checked"
              )[0].value;
            })
            .filter(array_unique).length ==
            1)
        );
      }).length == 0;

    // MTSでNGが出ていた場合はエラーを返してしまう
    if (!isValidToMTS) return INVALID;

    return VALID;
  }

  function sendBugReport(BD, params) {
    var url = "/e/adm5/?m=adm&a=do_send_bugreport&path=" + BD;
    var data = "data=";

    if (params.p1 == true) {
      // document.getElementById("p1").checked
      data += "&p1=1";
    }
    if (params.p2 == true) {
      // document.getElementById("p2").checked
      data += "&p2=1";
    }
    if (params.p3 == true) {
      // document.getElementById("p3").checked
      data += "&p3=1";
    }
    if (params.p4 == true) {
      // document.getElementById("p4").checked
      data += "&p4=1";
    }
    if (params.p5 == true) {
      // document.getElementById("p5").checked
      data += "&p5=1";
    }

    data += "&ptext=" + encodeURIComponent(params.ptext); // document.getElementById("ptext").value

    if (params.s1 == true) {
      // document.getElementById("s1").checked
      data += "&s1=1";
    }

    if (params.s2 == true) {
      // document.getElementById("s2").checked
      data += "&s2=1";
    }

    return $.ajax({
      type: "POST",
      url: url,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,
    });

    // 【１】XMLHttpRequestオブジェクト生成
    // var req = createXMLHTTP();
    // if (!req) {
    //     return;
    // }
    //
    // // 【２】レスポンスデータ受信時に呼び出すイベントハンドラ
    // req.onreadystatechange = function () {
    //
    //     var obj = document.getElementById("bug-report");
    //     obj.style.top = "100px";
    //
    //     document.getElementById("bugreport-1").style.display = "none";
    //     if (document.getElementById("s1").checked == true) {
    //         document.getElementById("bugreport-2").style.display = "block";
    //     } else {
    //         document.getElementById("bugreport-3").style.display = "block";
    //     }
    //
    // }
    //
    // req.open('POST', url, true); // method, url, async
    //
    // // POSTデータ用ヘッダ
    // req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    // req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    //
    // req.send(data);
  }

  function createXMLHTTP() {
    if (window.XMLHttpRequest) {
      // IE以外
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // IE用(バージョンにより異なる)
      try {
        return new ActiveXObject("MSXML2.XMLHTTP");
      } catch (e) {
        try {
          return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e2) {
          return null;
        }
      }
    }
    return null;
  }

  function getDeviceflag() {
    //1:PC 2:mobile 3:tablet
    if (navigator.userAgentData) {
      if (navigator.userAgentData.mobile) {
        return 2;
      } else {
        return 1;
      }
    } else {
      var ua = navigator.userAgent;
      if (ua.match(/iPhone/i)) {
        return 2;
      } else if (ua.match(/iPod/i)) {
        return 2;
      } else if (ua.match(/Android/i) && ua.match(/Mobile/i)) {
        return 2;
      } else if (ua.match(/Windows Phone/i)) {
        return 2;
      } else if (ua.match(/BlackBerry/i)) {
        return 2;
      } else if (ua.match(/BB10/i) && ua.match(/Mobile/i)) {
        return 2;
      } else if (ua.match(/Symbian/i)) {
        return 2;
      } else if (ua.match(/iPad/i)) {
        return 3;
      } else if (ua.match(/Android/i)) {
        return 3;
      } else if (ua.match(/tablet/i)) {
        return 3;
      } else if (
        ua.match(
          /Mozilla\/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident\/6.0)/i
        )
      ) {
        return 3;
      } else if (
        ua.match(
          /Mozilla\/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident\/6.0; Touch)/i
        )
      ) {
        return 3;
      } else {
        return 1;
      }
    }
  }

  function isDeviceSP() {
    //true:モバイル false:非モバイル
    return getDeviceflag() != 1;
  }

  function isIphone() {
    if (getBrandsToString().match(/iPhone/i)) {
      return true;
    } else {
      return false;
    }
  }

  function isIE() {
    var ua = getBrandsToString();
    if (ua.match(/MSIE/i) || ua.match(/Trident/i)) {
      return true;
    } else {
      return false;
    }
  }

  function isEdge() {
    if (getBrandsToString().match(/Edg/i)) {
      return true;
    } else {
      return false;
    }
  }

  function getBrandsToString() {
    var ua = "";
    if (navigator.userAgentData) {
      for (let i = 0; i < navigator.userAgentData.brands.length; i++) {
        ua +=
          (i == 0 ? "" : ",") +
          '"' +
          navigator.userAgentData.brands[i].brand +
          '";v="' +
          navigator.userAgentData.brands[i].version +
          '"';
      }
    } else {
      ua = navigator.userAgent;
    }
    return ua;
  }
  // ***** 公開されるAPIはこちらに *******************************
  return {
    goNext: goNext,
    getUTCDate: getUTCDate,
    validateTateichi: validateTateichi,
    createXMLHTTP: createXMLHTTP,
    sendBugReport: sendBugReport,
    /** 画像タグの拡大表示機能(StandardOnly)の有効化フラグ */
    canImageZoom: true,
    getDeviceflag: getDeviceflag,
    isDeviceSP: isDeviceSP,
    isIphone: isIphone,
    isIE: isIE,
    isEdge: isEdge,
  };
});
