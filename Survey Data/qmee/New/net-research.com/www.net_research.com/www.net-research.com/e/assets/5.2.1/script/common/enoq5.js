// @see https://github.com/umdjs/umd
// @see http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], function (b) {
            return (root.returnExportsGlobal = factory(b));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        root.enoq5 = factory(root.jQuery);
    }
}(this, function ($) {

    var enoq5 = {

        "toTargetSelector": function (qExExpr, opt_itemId) {
            var selectors = [];
            var selections = qExExpr.targetSelections;
            for (var i = 0; i < selections.length; i++) {
                if (opt_itemId === undefined) {
                    selectors.push("#q" + qExExpr.qId + "_" + selections[i]);
                } else {
                    selectors.push("#q" + qExExpr.qId + "_" + opt_itemId + "_" + selections[i]);
                }
            }
            return selectors.join(",");
        },

        "toggleTargets": function (checked, qExExpr, opt_itemId) {
            var $targets = $(enoq5.toTargetSelector(qExExpr, opt_itemId));
            if (qExExpr.disableTargets) {
                $targets.prop("disabled", checked);
            }
            if (qExExpr.clearTargets && checked) {
                $targets.prop("checked", false);
            }
        },

        /**
         *
         * @param baseSelector 元テーブルのセレクタ
         * @param opposite 結合されるテーブル
         * @param hasCodeParam URLパラメータに"code=\d"の指定がある場合にtrue
         * @param randomHeaderText ランダム設定列のヘッダテキスト
         */
        "joinConditionTable": function (baseSelector, opposite, hasCodeParam, randomHeaderText) {

            var oppositeRows = $(opposite).find("tbody > tr");
            var oppositeColumnSize = $(oppositeRows[0]).children().size();
            if (!hasCodeParam) {
                // code=\dの指定が無い場合は、マッチングインデックス列を表示しない為、colspan数(=列数)を半分にする
                oppositeColumnSize = oppositeColumnSize / 2;
            }

            // ランダム設定列のヘッダーを付与し
            $(baseSelector).find("thead > tr").append("<th class='condition-random' colspan='" + oppositeColumnSize + "'>" + randomHeaderText + "</th>");
            $(baseSelector).find("tbody > tr").each(function (i, baseRow) {
                $(baseRow).append($(oppositeRows[i]).children());
            });

            $(baseSelector).html(function (i, src) {
                return src.replace(/td>\s+<td/g, "td><td");
            });

            $(baseSelector).find("td.captionGroupTableCell.shuffle").each(function (i, td) {
                $(td).hover(
                    function (e) {
                        var dfd = $.Deferred();
                        var $target = $(this);
                        setTimeout(function () {
                            var startRow = $target.closest("tr").index();
                            var rowspan = $target.attr("rowspan");
                            var endRow = typeof rowspan !== 'undefined' ? startRow + parseInt(rowspan) : startRow;
                            var $highlightRange = $target.closest("tbody").find("tr").slice(startRow, endRow).find(".condition-desc");
                            $highlightRange.addClass("condition-highlight");
                            dfd.resolve($highlightRange);
                        }, 1);
                        promise = dfd.promise();
                    },
                    function (e) {
                        promise.done(function ($highlightRange) {
                            $highlightRange.removeClass("condition-highlight");
                        });
                    }
                );
            });

            $(baseSelector).find("td.condition-criteria").each(function (i, td) {
                $(td).hover(
                    function (e) {
                        var dfd = $.Deferred();
                        var $target = $(this);
                        setTimeout(function () {
                            var startRow = $target.closest("tr").index();
                            var rowspan = $target.attr("rowspan");
                            var endRow = typeof rowspan !== 'undefined' ? startRow + parseInt(rowspan) : startRow + 1;
                            var $highlightRange = $target.closest("tbody").find("tr").slice(startRow, endRow).find(".condition-id");
                            $highlightRange.addClass("condition-highlight");
                            dfd.resolve($highlightRange);
                        }, 1);
                        promise = dfd.promise();
                    },
                    function (e) {
                        promise.done(function ($highlightRange) {
                            $highlightRange.removeClass("condition-highlight");
                        });
                    }
                );
            });
        }

    };

    return enoq5;
}));
