    <!DOCTYPE html>
<html class="" lang="en-US">
<div id="container"></div>
<head>
<meta charset="utf-8" />
<meta name="robots"                content="noindex,nofollow" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="imagetoolbar"    content="no" />
<meta http-equiv="Pragma"          content="no-cache" />
<meta http-equiv="Cache-Control"   content="no-cache" />
<meta http-equiv="Expires"         content="-1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
<meta name="referrer" content="always" />
<meta name="referrer" content="unsafe-url" />
<title>Questionnaire about Yourself</title>
<link rel="icon" href="/e/assets/5.2.1/img/favicon.ico" type="image/x-icon" />
<script type="text/javascript" src="/e/assets/5.2.1/script/jquery/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="/e/assets/5.2.1/script/common/sharedFunction.js"></script>
<script type="text/javascript" src="/e/assets/5.2.1/script/scripts.js"></script>
<script type="text/javascript" src="/e/assets/5.2.1/std-ui/vendor.js"></script>
<script type="text/javascript" src="/e/assets/5.2.1/std-ui/common.js"></script>
<link type="text/css" href="/e/assets/5.2.1/css2/reset.min.css" rel="stylesheet" />
<link type="text/css" href="/e/assets/5.2.1/css2/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<link type="text/css" href="/e/assets/5.2.1/css2/std.css" rel="stylesheet" />
<link type="text/css" href="/e/assets/5.2.1/std-ui/common.css" rel="stylesheet" />
<link type="text/css" href="/e/assets/5.2.1/css2/enoq_locale.css" rel="stylesheet" />
<link type="text/css" href="/e/assets/5.2.1/css2/tsunoq.css" rel="stylesheet" />
<link type="text/css" href="/e/assets/5.2.1/css2/yamaq.css" rel="stylesheet" />
<link type="text/css" href="/e/assets/5.2.1/css2/std_open.css" rel="stylesheet" />
<link type="text/css" href="/e/assets/5.2.1/css2/std_sp.css" rel="stylesheet" media="screen and (max-width: 766px)"/>
<link type="text/css" href="/e/assets/5.2.1/css2/tsunoq_sp.css" rel="stylesheet" media="screen and (max-width: 766px)"/>
<link type="text/css" href="/e/assets/5.2.1/css2/yamaq_sp.css" rel="stylesheet" media="screen and (max-width: 766px)"/>
<link type="text/css" href="/e/assets/5.2.1/css2/std_open_sp.css" rel="stylesheet" media="screen and (max-width: 766px)"/>
<link type="text/css" href="style.css?t=3507848330" rel="stylesheet" />
<link type="text/css" href="style_sp.css?t=3507848330" rel="stylesheet" media="screen and (max-width: 766px)"/>
<link type='text/css' href='/e/assets/5.2.1/css2/pg_hd_cap_tbl_w.css' rel='stylesheet' />
</head>
<body>
    

            <div id="main" class="main--loading" style="width: 766px;">
    


        <form  autocomplete="off" action="index.php" method="post" id="mainform">
<img style="display:none;" src="https://img.macromill.com/removal" />
<div class="page-captions"></div>



<div class="question-app">
<div class="question-area qa-q101" id="qa-q101" :class="classes"
    data-qid="q101"
    data-qno="SQ1"
    data-type="SA"
    data-type-sub=""
    data-required="1"
>
    <v-style>
        #qa-q101{
            width:766px;
            max-width:100%;
        }

        @media print{
            #qa-q101{
                width:766px;
                margin:0;
            }
        }

        @media only screen and (max-width: 766px){
            #qa-q101{
                width:100%;
            }
        }
    </v-style>
    <span v-pre>
        <input class="answer" type="hidden" value='{"q101":null}' />
        <input class="state" type="hidden" value='{}' />
    </span>
    <div class="question-header" ref="questionHeader">
        <p class="qno-area">SQ1</p>
        <div class="misc">
            <span class="progress">6%</span>

        </div>
        <div :class="{ 'qtext-area':true, 'qtext-area--collapsed':collapsed }" ref="qTextArea">
                        <div class="qtext">Please select your gender and age.</div>
        </div>
                <div class="qtext-spacer" v-show="!wrapped"></div>
                        <div class="qtext-toggler" @click="wrapped ? toggleText() : null">
            <ul>
                                                                    <li><span class="single-answer">
                        <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
                        <span>Single answer</span>
                    </span></li>
                                                                                        <li><span class="required-answer">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <span>Required</span>
                        </span></li>
                                                                                                    <li><template v-if="!collapsed">
                        <div class="expanded" v-show="wrapped"><img src="/e/assets/5.2.1/img/expanded-white.gif" />Hide question</div>
                    </template>
                    <template v-else>
                        <div class="collapsed" v-show="wrapped"><img src="/e/assets/5.2.1/img/collapsed-white.gif" />Show question</div>
                    </template>
                </li>
                        </ul>
            </div>
                                </div>
    <p class="spacer" ref="spacer"></p>
    <div class="qmidtext-area qmidtext-area-notext"></div>
    <question :class="{
    'sa':true,
    'sa--column': 1 < 1,
    'sa--table': false }"
    ref="question">
    <ul class="sa-section">
        <li class="selection" :class="{ 'selection--active': answer.q101 == 1 }">
            <radio id="q101_1" name="q101"
                :number="1"
                :no="null"
                :image="hasImage('q101_1')"
                @zoom="showDialog('q101_1')"
                v-model.number="answer.q101"
                ><label for="q101_1">[Male] 14 years or younger</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 2 }">
            <radio id="q101_2" name="q101"
                :number="2"
                :no="null"
                :image="hasImage('q101_2')"
                @zoom="showDialog('q101_2')"
                v-model.number="answer.q101"
                ><label for="q101_2">[Male] 15-19 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 3 }">
            <radio id="q101_3" name="q101"
                :number="3"
                :no="null"
                :image="hasImage('q101_3')"
                @zoom="showDialog('q101_3')"
                v-model.number="answer.q101"
                ><label for="q101_3">[Male] 20-24 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 4 }">
            <radio id="q101_4" name="q101"
                :number="4"
                :no="null"
                :image="hasImage('q101_4')"
                @zoom="showDialog('q101_4')"
                v-model.number="answer.q101"
                ><label for="q101_4">[Male] 25-29 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 5 }">
            <radio id="q101_5" name="q101"
                :number="5"
                :no="null"
                :image="hasImage('q101_5')"
                @zoom="showDialog('q101_5')"
                v-model.number="answer.q101"
                ><label for="q101_5">[Male] 30-34 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 6 }">
            <radio id="q101_6" name="q101"
                :number="6"
                :no="null"
                :image="hasImage('q101_6')"
                @zoom="showDialog('q101_6')"
                v-model.number="answer.q101"
                ><label for="q101_6">[Male] 35-39 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 7 }">
            <radio id="q101_7" name="q101"
                :number="7"
                :no="null"
                :image="hasImage('q101_7')"
                @zoom="showDialog('q101_7')"
                v-model.number="answer.q101"
                ><label for="q101_7">[Male] 40-44 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 8 }">
            <radio id="q101_8" name="q101"
                :number="8"
                :no="null"
                :image="hasImage('q101_8')"
                @zoom="showDialog('q101_8')"
                v-model.number="answer.q101"
                ><label for="q101_8">[Male] 45-49 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 9 }">
            <radio id="q101_9" name="q101"
                :number="9"
                :no="null"
                :image="hasImage('q101_9')"
                @zoom="showDialog('q101_9')"
                v-model.number="answer.q101"
                ><label for="q101_9">[Male] 50 years or older</label></radio>
        </li>
        <li class="comment">
            <span class="comment__text"><br/></span>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 10 }">
            <radio id="q101_10" name="q101"
                :number="10"
                :no="null"
                :image="hasImage('q101_10')"
                @zoom="showDialog('q101_10')"
                v-model.number="answer.q101"
                ><label for="q101_10">[Female] 14 years or younger</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 11 }">
            <radio id="q101_11" name="q101"
                :number="11"
                :no="null"
                :image="hasImage('q101_11')"
                @zoom="showDialog('q101_11')"
                v-model.number="answer.q101"
                ><label for="q101_11">[Female] 15-19 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 12 }">
            <radio id="q101_12" name="q101"
                :number="12"
                :no="null"
                :image="hasImage('q101_12')"
                @zoom="showDialog('q101_12')"
                v-model.number="answer.q101"
                ><label for="q101_12">[Female] 20-24 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 13 }">
            <radio id="q101_13" name="q101"
                :number="13"
                :no="null"
                :image="hasImage('q101_13')"
                @zoom="showDialog('q101_13')"
                v-model.number="answer.q101"
                ><label for="q101_13">[Female] 25-29 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 14 }">
            <radio id="q101_14" name="q101"
                :number="14"
                :no="null"
                :image="hasImage('q101_14')"
                @zoom="showDialog('q101_14')"
                v-model.number="answer.q101"
                ><label for="q101_14">[Female] 30-34 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 15 }">
            <radio id="q101_15" name="q101"
                :number="15"
                :no="null"
                :image="hasImage('q101_15')"
                @zoom="showDialog('q101_15')"
                v-model.number="answer.q101"
                ><label for="q101_15">[Female] 35-39 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 16 }">
            <radio id="q101_16" name="q101"
                :number="16"
                :no="null"
                :image="hasImage('q101_16')"
                @zoom="showDialog('q101_16')"
                v-model.number="answer.q101"
                ><label for="q101_16">[Female] 40-44 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 17 }">
            <radio id="q101_17" name="q101"
                :number="17"
                :no="null"
                :image="hasImage('q101_17')"
                @zoom="showDialog('q101_17')"
                v-model.number="answer.q101"
                ><label for="q101_17">[Female] 45-49 years old</label></radio>
        </li>
        <li class="selection" :class="{ 'selection--active': answer.q101 == 18 }">
            <radio id="q101_18" name="q101"
                :number="18"
                :no="null"
                :image="hasImage('q101_18')"
                @zoom="showDialog('q101_18')"
                v-model.number="answer.q101"
                ><label for="q101_18">[Female] 50 years or older</label></radio>
        </li>
    </ul>
<scroll-indicator :is-parent-ready="isReady"></scroll-indicator>
<image-dialog :ids="images"
    :init="imageDialogInit"
    :show="imageDialogStatus == 'show'"
    @close="imageDialogStatus = 'close'">
                    <template #[`q101_1`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 1 }">
            <label for="q101_1"><label for="q101_1">[Male] 14 years or younger</label></label>
        </div>
    </template>
                        <template #[`q101_2`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 2 }">
            <label for="q101_2"><label for="q101_2">[Male] 15-19 years old</label></label>
        </div>
    </template>
                        <template #[`q101_3`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 3 }">
            <label for="q101_3"><label for="q101_3">[Male] 20-24 years old</label></label>
        </div>
    </template>
                        <template #[`q101_4`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 4 }">
            <label for="q101_4"><label for="q101_4">[Male] 25-29 years old</label></label>
        </div>
    </template>
                        <template #[`q101_5`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 5 }">
            <label for="q101_5"><label for="q101_5">[Male] 30-34 years old</label></label>
        </div>
    </template>
                        <template #[`q101_6`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 6 }">
            <label for="q101_6"><label for="q101_6">[Male] 35-39 years old</label></label>
        </div>
    </template>
                        <template #[`q101_7`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 7 }">
            <label for="q101_7"><label for="q101_7">[Male] 40-44 years old</label></label>
        </div>
    </template>
                        <template #[`q101_8`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 8 }">
            <label for="q101_8"><label for="q101_8">[Male] 45-49 years old</label></label>
        </div>
    </template>
                        <template #[`q101_9`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 9 }">
            <label for="q101_9"><label for="q101_9">[Male] 50 years or older</label></label>
        </div>
    </template>
                                            <template #[`q101_10`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 10 }">
            <label for="q101_10"><label for="q101_10">[Female] 14 years or younger</label></label>
        </div>
    </template>
                        <template #[`q101_11`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 11 }">
            <label for="q101_11"><label for="q101_11">[Female] 15-19 years old</label></label>
        </div>
    </template>
                        <template #[`q101_12`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 12 }">
            <label for="q101_12"><label for="q101_12">[Female] 20-24 years old</label></label>
        </div>
    </template>
                        <template #[`q101_13`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 13 }">
            <label for="q101_13"><label for="q101_13">[Female] 25-29 years old</label></label>
        </div>
    </template>
                        <template #[`q101_14`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 14 }">
            <label for="q101_14"><label for="q101_14">[Female] 30-34 years old</label></label>
        </div>
    </template>
                        <template #[`q101_15`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 15 }">
            <label for="q101_15"><label for="q101_15">[Female] 35-39 years old</label></label>
        </div>
    </template>
                        <template #[`q101_16`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 16 }">
            <label for="q101_16"><label for="q101_16">[Female] 40-44 years old</label></label>
        </div>
    </template>
                        <template #[`q101_17`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 17 }">
            <label for="q101_17"><label for="q101_17">[Female] 45-49 years old</label></label>
        </div>
    </template>
                        <template #[`q101_18`]>
        <div class="selection" v-bind:class="{ 'selection--active': answer.q101 == 18 }">
            <label for="q101_18"><label for="q101_18">[Female] 50 years or older</label></label>
        </div>
    </template>
            </image-dialog>
</question>


<v-style>
    @-moz-document url-prefix(){
        @media print{
            #qa-q101 .sa--column{
                display:table;
                margin-bottom:30px;
            }
            #qa-q101 .sa .sa-section{
                display:table-cell;
            }
                            #qa-q101 .sa .sa-section{
                    display:block;
                }
                    }
    }
</v-style>
    <div class="question-footer">
            </div>
</div>
</div><nav id="navigator" class="global-navigator">
        <button v-on:click="goNext" type="button" id="next" :class="{ disabled: !enabled }">Next</button>
    </nav>
<input type="hidden" id="csrfkey" name="csrf" value="216c4f5c25b963ccfd3b4896dc90a777"/>
<script type="text/javascript">document.oncontextmenu = function(){return false;};</script><script type="text/javascript">
document.oncopy = function(){return false;};
document.documentElement.style.setProperty('-ms-user-select', 'none');
document.documentElement.style.setProperty('-moz-user-select', 'none');
document.documentElement.style.webkitUserSelect = 'none';
document.documentElement.style.webkitTouchCallout = 'none';
document.documentElement.style.kHtmlUserSelect = 'none';
</script>                <input type="hidden"                       name="hdnPagePos"       value="1"/>
                <input type="hidden" id="hdncharactersize" name="hdncharactersize" value="1"/>
                <input type="hidden" id="systemTouchDeviceFlag" name="systemTouchDeviceFlag" value="false" />
                <input type="hidden" id="has-caption" value=""/>
                <input type="hidden" id="is-scroll-all-question" value=""/>
            </form>
            <div class="loading">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <dialog id="app-dialog"></dialog>
        <dialog id="image-dialog-single"></dialog>
                    <span class="below"></span>
        <script type="text/javascript" src="/e/assets/5.2.1/script/common/enoq5.js"></script>

<script type="text/javascript">
<!--
	var MM_BB_ErrFlag = false;
	var MSG_MARTIX_ALERT = "All your answers are same. Are you sure? Please proceed upon reconfirmation.";
	var nTateichiAlert = 0;
	var clickFlg = false;
	var scriptErrMsgOnConfirm = new Array();
	var elementMaxWidth = 0;

		var resizeImageParentSp = new Array("div.question-area","h1.qtext","table","td");

	var isDeviceSP = 0;
	var isSp;
		

    $(document).find("td.DynamicCellCriteriaColumn").each(function(i, td){
        $(td).hover(
            function(e){
                var dfd = $.Deferred();
                var $target = $(this);
                setTimeout(function(){
                    var startRow = $target.closest("tr").index();
                    var rowspan = $target.attr("rowspan");
                    var endRow = typeof rowspan !== 'undefined' ? startRow + parseInt(rowspan) : startRow + 1;
                    var $highlightRange = $target.closest("tbody").find("tr").slice(startRow, endRow).find(".DynamicCellIDColumn");
                    $highlightRange.addClass("condition-highlight");
                    dfd.resolve($highlightRange);
                }, 1);
                promise = dfd.promise();
            },
            function(e){
                promise.done(function($highlightRange){
                    $highlightRange.removeClass("condition-highlight");
                });
            }
        );
    });

    $(document).ready(function(){
        $('table.DynamicCellCategoriesTable').each(function () {
            var pre_element = null;
            var col_array = [];
            var this_table = $(this);
            $(this).find('tbody tr').eq(0).find('td.DynamicCellCriteriaColumn').each(function(){
                 col_array.push($(this).attr('data-col_num'));
            });
            $.each(col_array, function(i,val){
                 pre_element = null;
                 this_table.find('td[data-col_num = '+ val +']').each(function(){
                     var now_td = $(this);
                     if (pre_element == null) {
                         pre_element = now_td;
                     } else if (now_td.text() == pre_element.text()) {
                         var now_rowspan = now_td.attr('rowspan');
                         var pre_attr = pre_element.attr('rowspan');
                         now_td.remove();
                         if (typeof now_rowspan == 'undefined'){
                             now_rowspan = 1;
                         }
                         if (typeof pre_attr == 'undefined' ) {
                             pre_element.attr('rowspan', parseInt(now_rowspan,10) + 1);
                         }else{
                             pre_element.attr('rowspan', parseInt(now_rowspan,10) + parseInt(pre_element.attr('rowspan'),10));
                         }
                     } else {
                         pre_element = now_td;
                     }
                 });
             });
         });
     });

    $(document).ready(function(){
        $('table#newvarCaotionTable').each(function () {
            var pre_element = null;
            $(this).find('td.newvarCriteria').each(function () {

                var now_td = $(this);

                if (pre_element == null) {
                    pre_element = now_td;
                } else if (now_td.text() == pre_element.text()) {
                    now_td.remove();
                    var pre_attr = pre_element.attr('rowspan');
                    if (typeof pre_attr == 'undefined' ) {
                        pre_element.attr('rowspan', 2);
                    }else{
                        pre_element.attr('rowspan', parseInt(pre_element.attr('rowspan'),10) + 1);
                    }
                } else {
                    pre_element = now_td;
                }
            });
        });
    });

    $(document).ready(function(){
        $('table.condition-table').each(function () {
            var pre_element = null;
            var col_num = 2;
            var counter = 1;
            $(this).find('tr').each(function () {

                var now_td = $(this).find('th,td').eq( col_num );

                if (pre_element == null) {
                    pre_element = now_td;
                } else if (now_td.text() == pre_element.text()) {
                    now_td.remove();
                    var pre_attr = pre_element.attr('rowspan');
                    if (typeof pre_attr == 'undefined' ) {
                        pre_element.attr('rowspan', 2);
                    }else{
                        pre_element.attr('rowspan', parseInt(pre_element.attr('rowspan'),10) + 1);
                    }
                } else {
                    pre_element = now_td;
                }
                counter = counter + 1;
            });
        });
    });

    $(document).find("td.condition-criteria").each(function(i, td){
        $(td).hover(
            function(e){
                var dfd = $.Deferred();
                var $target = $(this);
                setTimeout(function(){
                    var startRow = $target.closest("tr").index();
                    var rowspan = $target.attr("rowspan");
                    var endRow = typeof rowspan !== 'undefined' ? startRow + parseInt(rowspan) : startRow + 1;
                    var $highlightRange = $target.closest("tbody").find("tr").slice(startRow, endRow).find(".condition-id");
                    $highlightRange.addClass("condition-highlight");
                    dfd.resolve($highlightRange);
                }, 1);
                promise = dfd.promise();
            },
            function(e){
                promise.done(function($highlightRange){
                    $highlightRange.removeClass("condition-highlight");
                });
            }
        );
    });

	$(function(){
		isSp = function(){
			return $("#container").css("min-width") != "800px";
		}

		elementMaxWidth = $("#container").css("width");

						$(window).on("orientationchange load resize",function(){
			reset();
		});
				$("label input:text").click(function(){
			return false;
		});

				$("div.question-area").on("click","img.clickableImg",function(){
			$("#"+$(this).attr("rel")).trigger("click");
		});

				var list = document.getElementsByTagName("input");
		for(var i=0; i<list.length; i++){
			if(list[i].type != 'button' && list[i].type != 'submit'){
				list[i].onkeypress = function (event){
					return submitStop(event);
				};
			}
		}

		
				

	});

	ChangeCharacterSize(1);

	function submitStop(e){
	    if (!e){
	    	 var e = window.event;
	  	}
	    if(e.keyCode == 13){
	   	    return false;
	    }
	}

	function addErrMsg(msg){
		if(!in_array(msg,scriptErrMsgOnConfirm)){
			scriptErrMsgOnConfirm.push(msg);
		}
	}

	function getErrMsg() {
		return scriptErrMsgOnConfirm;
	}

	function clearErrMsg() {
		scriptErrMsgOnConfirm = new Array();
	}

    	function getUTCDate() {
		var csrfkey = document.querySelector("#csrfkey").value;
		return SharedFunction.getUTCDate(csrfkey);
	}

    	function confirmEnoqAvoidDblClick(){
		getUTCDate().then(function(d) {
			var clickTime = d.getTime();
						
			if(scriptErrMsgOnConfirm.length > 0){
				alert(scriptErrMsgOnConfirm.join("\n"));
				scriptErrMsgOnConfirm = new Array();
				return false;
			}
			if(!checkTateichi()){
				return false;
			}

			disableButton();
			
			var mainFormElm = document.getElementById('mainform');
			SharedFunction.goNext(mainFormElm);
		},
		function(error) {
			console.error("サーバ時刻の取得に失敗しました。" + error);
		});
	}

	function disableButton(){
		$("div.button input").prop("disabled", true);
	}


	function resizeSlider(){
		$("div.slider").each(function(){
			var parent = $(this).parents("table.fas");
			if(!$(parent).hasClass("fas-slider")){
				$(parent).addClass("fas-slider");
			}
		});
	}

	function doChangeCharacterSize(size){
		ChangeCharacterSize(size);
		reset();
	}

	function reset(){
		if(isSp()){
			resizeSlider();
		}
	}

    $(function(){

        (function initConditionCaption(){

            var hasCodeParam = location.search.match(/code=\d+/) !== null;
            if(!hasCodeParam){
                // code=\dの指定が無い場合は、マッチングインデックス列を表示しない
                $(".captionGroupTableMIdxCell").hide();
            }

            $(".related-table-wrapper").each(function(i, e){
                var baseSelector = "#" + $(e).attr("related-to");
                var opposite = $(e).find(":first")[0];
                enoq5.joinConditionTable(baseSelector, opposite, hasCodeParam, 'ランダム設定');
            });

        })();

        (function initPulldownToggleSwitches(){
            var plExpand = function($tables, $switches){
                $tables.each(function (index, table) {
                    var $table = $(table);
                    var head = $table.find("thead")[0];
                    var body = $table.find("tbody")[0];
                    head.className = "plselectionheader_expand";
                    body.className = "plselectionheader_expand";
                });
                $tables.attr("expanded", true);
                $switches.html("▲");
            };
            var plCollapse = function($tables, $switches){
                $tables.each(function (index, table) {
                    var $table = $(table);
                    var head = $table.find("thead")[0];
                    var body = $table.find("tbody")[0];
                    head.className = "plselectionheader";
                    body.className = "plselectionheader";
                });
                $tables.attr("expanded", false);
                $switches.html("▼");
            };
            $(".pl_toggle_switch").on("click", function(e){
                $switch = $(this);
                $table = $switch.parents(".pl_seletion_table");
                if ($table.attr("expanded") == "true") {
                    plCollapse($table, $switch);
                } else {
                    plExpand($table, $switch);
                }
            });
            $(".pl_expand_switch").on("click", function(e){
                $tables = $(this).parents(".fa_table").find(".pl_seletion_table");
                plExpand($tables, $tables.find(".pl_toggle_switch"));
            });
            $(".pl_collapse_switch").on("click", function(e){
                $tables = $(this).parents(".fa_table").find(".pl_seletion_table");
                plCollapse($tables, $tables.find(".pl_toggle_switch"));
            });
        })();
        
    });

	(function suppressionOfImageSaving($) {
		var targetSelectors = [
			"div.question-area img",
			"div.ui-dialog img",
			"div.modal-wrapper img",
		];

		$(document).on("contextmenu", targetSelectors.join(', '), function(e) {
			e.preventDefault();
		})
	})(jQuery);

(function () {
    $(document).ready(function () {
        $systemTouchDeviceFlag = $('#systemTouchDeviceFlag');
        if ($systemTouchDeviceFlag.length > 0) {
            $systemTouchDeviceFlag.val('ontouchstart' in document);        }
    });
})();

//-->
</script>

    </body>
</html>

