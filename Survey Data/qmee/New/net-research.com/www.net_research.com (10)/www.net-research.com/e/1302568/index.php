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
<div class="question-area qa-q999" id="qa-q999" :class="classes"
    data-qid="q999"
    data-qno="<br/>"
    data-type="MTS"
    data-type-sub=""
    data-required="1"
>
    <v-style>
        #qa-q999{
            width:766px;
            max-width:100%;
        }

        @media print{
            #qa-q999{
                width:766px;
                margin:0;
            }
        }

        @media only screen and (max-width: 766px){
            #qa-q999{
                width:100%;
            }
        }
    </v-style>
    <span v-pre>
        <input class="answer" type="hidden" value='{"q999_1":null,"q999_2":null,"q999_3":null,"q999_4":null,"q999_5":null,"q999_6":null,"q999_7":null,"q999_8":null,"q999_9":null,"q999_10":null}' />
        <input class="state" type="hidden" value='{}' />
    </span>
    <div class="question-header" ref="questionHeader">
        <p class="qno-area"><br/></p>
        <div class="misc">
            <span class="progress">59%</span>

        </div>
        <div :class="{ 'qtext-area':true, 'qtext-area--collapsed':collapsed }" ref="qTextArea">
                        <div class="qtext">Read the following statements and select the options that best describe your thoughts.</div>
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
                                        <div class="q-progress">
                    <div class="progress">
                        <div class="bar"></div>
                    </div>
                    <p class="progress_text">
                        {{progressCount}}/{{answerCount}}
                    </p>
                </div>
                    </div>
    <p class="spacer" ref="spacer"></p>
    <div class="qmidtext-area qmidtext-area-notext"></div>
    <question class="mts" ref="question">
    <span id="question-parameters" v-pre>
        <span class="parameters" style="display: none;"
            data-value='{"q999__showStartAnswer":true,"q999_1__opened":false,"q999_2__opened":false,"q999_3__opened":false,"q999_4__opened":false,"q999_5__opened":false,"q999_6__opened":false,"q999_7__opened":false,"q999_8__opened":false,"q999_9__opened":false,"q999_10__opened":false,"q999_1__plainText":"True ","q999_2__plainText":"Neither ","q999_3__plainText":"False ","q999_1__required":true,"q999_2__required":true,"q999_3__required":true,"q999_4__required":true,"q999_5__required":true,"q999_6__required":true,"q999_7__required":true,"q999_8__required":true,"q999_9__required":true,"q999_10__required":true,"q999__tateichiMessage":"All your answers are same. Are you sure? Please proceed upon reconfirmation.","q999__checkFunctions":{},"visible":{"q999_1_1":1,"q999_1_2":1,"q999_1_3":1,"q999_2_1":1,"q999_2_2":1,"q999_2_3":1,"q999_3_1":1,"q999_3_2":1,"q999_3_3":1,"q999_4_1":1,"q999_4_2":1,"q999_4_3":1,"q999_5_1":1,"q999_5_2":1,"q999_5_3":1,"q999_6_1":1,"q999_6_2":1,"q999_6_3":1,"q999_7_1":1,"q999_7_2":1,"q999_7_3":1,"q999_8_1":1,"q999_8_2":1,"q999_8_3":1,"q999_9_1":1,"q999_9_2":1,"q999_9_3":1,"q999_10_1":1,"q999_10_2":1,"q999_10_3":1},"itemGroup":{"visible":{},"relation":{}},"selectionGroup":{"visible":{"gi0_gs0_1":1,"gi0_gs0_2":1,"gi0_gs0_3":1,"gi0_gs0_4":1,"gi0_gs0_5":1,"gi0_gs0_6":1,"gi0_gs0_7":1,"gi0_gs0_8":1,"gi0_gs0_9":1,"gi0_gs0_10":1},"relation":{"gi0_gs0_1":{"0":"1_1","1":"1_2","2":"1_3"},"gi0_gs0_2":{"0":"2_1","1":"2_2","2":"2_3"},"gi0_gs0_3":{"0":"3_1","1":"3_2","2":"3_3"},"gi0_gs0_4":{"0":"4_1","1":"4_2","2":"4_3"},"gi0_gs0_5":{"0":"5_1","1":"5_2","2":"5_3"},"gi0_gs0_6":{"0":"6_1","1":"6_2","2":"6_3"},"gi0_gs0_7":{"0":"7_1","1":"7_2","2":"7_3"},"gi0_gs0_8":{"0":"8_1","1":"8_2","2":"8_3"},"gi0_gs0_9":{"0":"9_1","1":"9_2","2":"9_3"},"gi0_gs0_10":{"0":"10_1","1":"10_2","2":"10_3"}}}}'></span>
        <span class="viewassets" style="display: none;"
            data-value='{
                "ses_setting":   { "codeview": "" },
                "qArgs":         {&quot;highlight&quot;:&quot; matrixhighlight&quot;,&quot;tateichi&quot;:&quot;&quot;,&quot;selectiondan&quot;:1,&quot;itemdan&quot;:1,&quot;qid&quot;:999,&quot;mask&quot;:[],&quot;hyoken&quot;:&quot;&quot;,&quot;size&quot;:[25],&quot;hyotoSize&quot;:[25,25,25],&quot;sa&quot;:[],&quot;tategaki&quot;:true,&quot;width&quot;:&quot;99%&quot;,&quot;selNo&quot;:false,&quot;iNo&quot;:false,&quot;qEx&quot;:[],&quot;hyotoLast&quot;:false,&quot;devide&quot;:1,&quot;inclusion&quot;:&quot;&quot;},
                "itemGroupList": [[]],
                "itemGroupIds":  [[1,2,3,4,5,6,7,8,9,10]],
                "itemGroupOffset": [0],
                "items":         {&quot;1&quot;:&quot;I often use coupons&quot;,&quot;2&quot;:&quot;I like to give gifts to people&quot;,&quot;3&quot;:&quot;I want to keep using the things that I like&quot;,&quot;4&quot;:&quot;Select \&quot;Neither\&quot; for this item&quot;,&quot;5&quot;:&quot;I like new products&quot;,&quot;6&quot;:&quot;I often make the wrong choice when shopping&quot;,&quot;7&quot;:&quot;I am easily influenced by the opinions of family and friends&quot;,&quot;8&quot;:&quot;I often go shopping in new stores&quot;,&quot;9&quot;:&quot;I often make impulse buys&quot;,&quot;10&quot;:&quot;I have never made an impulse buy&quot;},
                "selectionGroupList": [[]],
                "selectionGroupIds":  [[1,2,3]],
                "selections":    {&quot;1&quot;:&quot;True &quot;,&quot;2&quot;:&quot;Neither &quot;,&quot;3&quot;:&quot;False &quot;},
                "errorItems":    [],
                "qCells":        {&quot;1&quot;:{&quot;1&quot;:[&quot;[.]&quot;],&quot;2&quot;:[&quot;[.]&quot;],&quot;3&quot;:[&quot;[.]&quot;],&quot;4&quot;:[&quot;[.]&quot;],&quot;5&quot;:[&quot;[.]&quot;],&quot;6&quot;:[&quot;[.]&quot;],&quot;7&quot;:[&quot;[.]&quot;],&quot;8&quot;:[&quot;[.]&quot;],&quot;9&quot;:[&quot;[.]&quot;],&quot;10&quot;:[&quot;[.]&quot;]},&quot;2&quot;:{&quot;1&quot;:[&quot;[.]&quot;],&quot;2&quot;:[&quot;[.]&quot;],&quot;3&quot;:[&quot;[.]&quot;],&quot;4&quot;:[&quot;[.]&quot;],&quot;5&quot;:[&quot;[.]&quot;],&quot;6&quot;:[&quot;[.]&quot;],&quot;7&quot;:[&quot;[.]&quot;],&quot;8&quot;:[&quot;[.]&quot;],&quot;9&quot;:[&quot;[.]&quot;],&quot;10&quot;:[&quot;[.]&quot;]},&quot;3&quot;:{&quot;1&quot;:[&quot;[.]&quot;],&quot;2&quot;:[&quot;[.]&quot;],&quot;3&quot;:[&quot;[.]&quot;],&quot;4&quot;:[&quot;[.]&quot;],&quot;5&quot;:[&quot;[.]&quot;],&quot;6&quot;:[&quot;[.]&quot;],&quot;7&quot;:[&quot;[.]&quot;],&quot;8&quot;:[&quot;[.]&quot;],&quot;9&quot;:[&quot;[.]&quot;],&quot;10&quot;:[&quot;[.]&quot;]}},
                "errAlert":      null
            }'></span>
    </span>
    <div class="matrix-area ">
                        <section class=" matrix-item-no-group">

            <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 1)"></a>
                                    
                                    <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 0 + 1)" v-if="0 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '1')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 0 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[1]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >1.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I often use coupons</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 1) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 1] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 1 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 1] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 1])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 1 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][1] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 1 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 1] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 1 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 1 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 1 + '_' + 1"
                                        :name="qid + '_' + 1"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][1], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 1]"
                                        :image="_.includes(images[qid + '_' + 1], qid + '_' + 1 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 1, qid + '_' + 1 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][1] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 1 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 1] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 1 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 1 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 1 + '_' + 2"
                                        :name="qid + '_' + 1"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][1], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 1]"
                                        :image="_.includes(images[qid + '_' + 1], qid + '_' + 1 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 1, qid + '_' + 1 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][1] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 1 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 1] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 1 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 1 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 1 + '_' + 3"
                                        :name="qid + '_' + 1"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][1], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 1]"
                                        :image="_.includes(images[qid + '_' + 1], qid + '_' + 1 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 1, qid + '_' + 1 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(1);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 1 + 1)" v-if="1 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '2')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 1 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[2]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >2.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I like to give gifts to people</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 2) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 2] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 2 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 2] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 2])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 2 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][2] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 2 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 2] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 2 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 2 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 2 + '_' + 1"
                                        :name="qid + '_' + 2"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][2], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 2]"
                                        :image="_.includes(images[qid + '_' + 2], qid + '_' + 2 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 2, qid + '_' + 2 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][2] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 2 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 2] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 2 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 2 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 2 + '_' + 2"
                                        :name="qid + '_' + 2"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][2], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 2]"
                                        :image="_.includes(images[qid + '_' + 2], qid + '_' + 2 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 2, qid + '_' + 2 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][2] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 2 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 2] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 2 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 2 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 2 + '_' + 3"
                                        :name="qid + '_' + 2"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][2], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 2]"
                                        :image="_.includes(images[qid + '_' + 2], qid + '_' + 2 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 2, qid + '_' + 2 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(2);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 2 + 1)" v-if="2 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '3')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 2 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[3]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >3.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I want to keep using the things that I like</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 3) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 3] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 3 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 3] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 3])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 3 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][3] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 3 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 3] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 3 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 3 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 3 + '_' + 1"
                                        :name="qid + '_' + 3"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][3], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 3]"
                                        :image="_.includes(images[qid + '_' + 3], qid + '_' + 3 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 3, qid + '_' + 3 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][3] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 3 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 3] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 3 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 3 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 3 + '_' + 2"
                                        :name="qid + '_' + 3"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][3], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 3]"
                                        :image="_.includes(images[qid + '_' + 3], qid + '_' + 3 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 3, qid + '_' + 3 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][3] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 3 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 3] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 3 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 3 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 3 + '_' + 3"
                                        :name="qid + '_' + 3"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][3], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 3]"
                                        :image="_.includes(images[qid + '_' + 3], qid + '_' + 3 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 3, qid + '_' + 3 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(3);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 3 + 1)" v-if="3 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '4')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 3 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[4]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >4.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >Select "Neither" for this item</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 4) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 4] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 4 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 4] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 4])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 4 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][4] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 4 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 4] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 4 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 4 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 4 + '_' + 1"
                                        :name="qid + '_' + 4"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][4], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 4]"
                                        :image="_.includes(images[qid + '_' + 4], qid + '_' + 4 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 4, qid + '_' + 4 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][4] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 4 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 4] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 4 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 4 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 4 + '_' + 2"
                                        :name="qid + '_' + 4"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][4], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 4]"
                                        :image="_.includes(images[qid + '_' + 4], qid + '_' + 4 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 4, qid + '_' + 4 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][4] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 4 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 4] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 4 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 4 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 4 + '_' + 3"
                                        :name="qid + '_' + 4"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][4], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 4]"
                                        :image="_.includes(images[qid + '_' + 4], qid + '_' + 4 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 4, qid + '_' + 4 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(4);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 4 + 1)" v-if="4 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '5')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 4 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[5]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >5.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I like new products</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 5) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 5] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 5 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 5] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 5])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 5 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][5] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 5 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 5] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 5 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 5 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 5 + '_' + 1"
                                        :name="qid + '_' + 5"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][5], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 5]"
                                        :image="_.includes(images[qid + '_' + 5], qid + '_' + 5 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 5, qid + '_' + 5 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][5] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 5 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 5] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 5 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 5 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 5 + '_' + 2"
                                        :name="qid + '_' + 5"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][5], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 5]"
                                        :image="_.includes(images[qid + '_' + 5], qid + '_' + 5 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 5, qid + '_' + 5 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][5] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 5 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 5] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 5 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 5 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 5 + '_' + 3"
                                        :name="qid + '_' + 5"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][5], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 5]"
                                        :image="_.includes(images[qid + '_' + 5], qid + '_' + 5 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 5, qid + '_' + 5 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(5);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 5 + 1)" v-if="5 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '6')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 5 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[6]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >6.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I often make the wrong choice when shopping</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 6) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 6] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 6 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 6] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 6])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 6 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][6] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 6 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 6] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 6 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 6 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 6 + '_' + 1"
                                        :name="qid + '_' + 6"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][6], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 6]"
                                        :image="_.includes(images[qid + '_' + 6], qid + '_' + 6 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 6, qid + '_' + 6 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][6] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 6 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 6] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 6 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 6 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 6 + '_' + 2"
                                        :name="qid + '_' + 6"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][6], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 6]"
                                        :image="_.includes(images[qid + '_' + 6], qid + '_' + 6 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 6, qid + '_' + 6 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][6] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 6 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 6] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 6 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 6 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 6 + '_' + 3"
                                        :name="qid + '_' + 6"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][6], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 6]"
                                        :image="_.includes(images[qid + '_' + 6], qid + '_' + 6 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 6, qid + '_' + 6 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(6);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 6 + 1)" v-if="6 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '7')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 6 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[7]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >7.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I am easily influenced by the opinions of family and friends</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 7) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 7] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 7 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 7] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 7])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 7 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][7] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 7 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 7] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 7 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 7 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 7 + '_' + 1"
                                        :name="qid + '_' + 7"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][7], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 7]"
                                        :image="_.includes(images[qid + '_' + 7], qid + '_' + 7 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 7, qid + '_' + 7 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][7] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 7 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 7] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 7 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 7 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 7 + '_' + 2"
                                        :name="qid + '_' + 7"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][7], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 7]"
                                        :image="_.includes(images[qid + '_' + 7], qid + '_' + 7 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 7, qid + '_' + 7 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][7] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 7 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 7] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 7 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 7 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 7 + '_' + 3"
                                        :name="qid + '_' + 7"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][7], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 7]"
                                        :image="_.includes(images[qid + '_' + 7], qid + '_' + 7 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 7, qid + '_' + 7 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(7);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 7 + 1)" v-if="7 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '8')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 7 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[8]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >8.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I often go shopping in new stores</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 8) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 8] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 8 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 8] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 8])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 8 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][8] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 8 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 8] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 8 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 8 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 8 + '_' + 1"
                                        :name="qid + '_' + 8"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][8], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 8]"
                                        :image="_.includes(images[qid + '_' + 8], qid + '_' + 8 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 8, qid + '_' + 8 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][8] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 8 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 8] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 8 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 8 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 8 + '_' + 2"
                                        :name="qid + '_' + 8"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][8], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 8]"
                                        :image="_.includes(images[qid + '_' + 8], qid + '_' + 8 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 8, qid + '_' + 8 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][8] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 8 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 8] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 8 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 8 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 8 + '_' + 3"
                                        :name="qid + '_' + 8"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][8], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 8]"
                                        :image="_.includes(images[qid + '_' + 8], qid + '_' + 8 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 8, qid + '_' + 8 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(8);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 8 + 1)" v-if="8 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '9')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 8 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[9]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >9.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I often make impulse buys</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 9) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 9] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 9 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 9] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 9])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 9 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][9] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 9 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 9] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 9 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 9 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 9 + '_' + 1"
                                        :name="qid + '_' + 9"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][9], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 9]"
                                        :image="_.includes(images[qid + '_' + 9], qid + '_' + 9 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 9, qid + '_' + 9 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][9] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 9 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 9] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 9 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 9 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 9 + '_' + 2"
                                        :name="qid + '_' + 9"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][9], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 9]"
                                        :image="_.includes(images[qid + '_' + 9], qid + '_' + 9 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 9, qid + '_' + 9 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][9] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 9 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 9] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 9 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 9 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 9 + '_' + 3"
                                        :name="qid + '_' + 9"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][9], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 9]"
                                        :image="_.includes(images[qid + '_' + 9], qid + '_' + 9 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 9, qid + '_' + 9 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(9);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                                                <section class="matrix-item">

                <a :name="'item_' + qid + '_' + (viewassets.itemGroupOffset[0] + 9 + 1)" v-if="9 > 0"></a>
                <div class="matrix-item-header"                    @click="toggleItemOpened('999', '10')">

                    <div class="matrix-item-no" v-if="viewassets.qArgs.iNo === 'no'">{{viewassets.itemGroupOffset[0] + 9 + 1}}</div>
                    <div class="matrix-item-id-code" v-show="viewassets.ses_setting.codeview">[10]</div>
                    <div class="matrix-item-id"><span v-show="viewassets.qArgs.iNo === 'id'" >10.</span></div>
                    <div class="matrix-item-values">                                                    <div class="matrix-item-contents">
                                <span class="matrix-item-value">
                                                                            <span class="selection-slot"
                                        >I have never made an impulse buy</span>
                                                                    </span>
                            </div>
                                            </div>                    <div class="matrix-item-status">
                        <div class="matrix-item-icons">
                            <span class="err-mark" v-if="_.includes(viewassets.errorItems, qid + '_' + 10) || _.includes(viewassets.errorItems, qid + '_0')">
                            </span>
                            <span class="matrix-item-complete-icon" v-if="(answer[qid + '_' + 10] || null) !== null"></span>
                        </div>
                        <div class="matrix-item-indicator">
                            <span class="matrix-item-shutter-switch"
                                >{{params[qid + '_' + 10 + '__opened'] ? '▲' : '▼'}}</span>
                        </div>
                    </div>
                    <div class="matrix-item-status-bar" v-show="answer[qid + '_' + 10] != null">
                        {{
                            selectedPlainText(answer[qid + '_' + 10])
                        }}
                    </div>
                </div>                <div :class="{ 'matrix-item-body--closed': !params[qid + '_' + 10 + '__opened'], 'matrix-item-body': true }">
                    <ul class="matrix-selections">
                                                                        <li class="matrix-selection-group">
                                                                                    
                            <ul class="matrix-selection-group-items">
                                                                                                <li v-if="(viewassets.qCells[1] || null) !== null && viewassets.qCells[1][10] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 10 + '_' + 1)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 10] == 1, 'matrix-selection-item--disabled': disabled[qid + '_' + 10 + '_' + 1], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 10 + '_' + 1]"
                                    >

                                    <radio :id="qid + '_' + 10 + '_' + 1"
                                        :name="qid + '_' + 10"
                                        :number="1"
                                        :no="viewassets.qArgs.selNo === 'id' ? 1 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 0 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[1][10], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 10]"
                                        :image="_.includes(images[qid + '_' + 10], qid + '_' + 10 + '_' + 1)"
                                        @zoom="showDialog(qid + '_' + 10, qid + '_' + 10 + '_' + 1)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[1]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">True </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[2] || null) !== null && viewassets.qCells[2][10] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 10 + '_' + 2)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 10] == 2, 'matrix-selection-item--disabled': disabled[qid + '_' + 10 + '_' + 2], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 10 + '_' + 2]"
                                    >

                                    <radio :id="qid + '_' + 10 + '_' + 2"
                                        :name="qid + '_' + 10"
                                        :number="2"
                                        :no="viewassets.qArgs.selNo === 'id' ? 2 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 1 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[2][10], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 10]"
                                        :image="_.includes(images[qid + '_' + 10], qid + '_' + 10 + '_' + 2)"
                                        @zoom="showDialog(qid + '_' + 10, qid + '_' + 10 + '_' + 2)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[2]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">Neither </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                                                                <li v-if="(viewassets.qCells[3] || null) !== null && viewassets.qCells[3][10] !== null && !_.includes(viewassets.qArgs.mask, qid + '_' + 10 + '_' + 3)"
                                    :class="{ 'matrix-selection-item--active': answer[qid + '_' + 10] == 3, 'matrix-selection-item--disabled': disabled[qid + '_' + 10 + '_' + 3], 'matrix-selection-item': true, 'separator': true, }"
                                    v-show="params.visible[qid + '_' + 10 + '_' + 3]"
                                    >

                                    <radio :id="qid + '_' + 10 + '_' + 3"
                                        :name="qid + '_' + 10"
                                        :number="3"
                                        :no="viewassets.qArgs.selNo === 'id' ? 3 : viewassets.qArgs.selNo === 'no' ? beforeCumulativeSelectionGroupIds[0] + 2 + 1 : null"
                                        :show-control="_.some(viewassets.qCells[3][10], function(cell) { return cell === '[.]'; })"
                                        v-model.number="answer[qid + '_' + 10]"
                                        :image="_.includes(images[qid + '_' + 10], qid + '_' + 10 + '_' + 3)"
                                        @zoom="showDialog(qid + '_' + 10, qid + '_' + 10 + '_' + 3)"
                                        :require-any="!canClearCheck"
                                    ><div class="selection-paragraph">
                                        <span class="matrix-selection-item-code" v-if="viewassets.ses_setting.codeview">[3]</span>
                                        <span class="matrix-selection-item-text">
                                            <span class="selection-slot">False </span>
                                                                                    </span>
                                    </div>
                                    </radio>
                                </li>
                                                                                            </ul>

                                                                                    
                        </li>
                                            </ul>
                    <div class="matrix-item-closer" @click="closeItem(10);">
                        <span class="matrix-item-closer">Close</span>
                    </div>
                </div>
            </section>
                        
                                    
        </section>
                <div class="matrix-start-button-layer" @click="startAnswer()" v-show="params[qid + '__showStartAnswer']">
            <div class="matrix-start-button">
                Start answering                <div class="matrix-start-button-bg"></div>
            </div>
        </div>
    </div>
    <input type="hidden" name="chkitem[]" value="999_1"/><input type="hidden" name="chkitem[]" value="999_2"/><input type="hidden" name="chkitem[]" value="999_3"/><input type="hidden" name="chkitem[]" value="999_4"/><input type="hidden" name="chkitem[]" value="999_5"/><input type="hidden" name="chkitem[]" value="999_6"/><input type="hidden" name="chkitem[]" value="999_7"/><input type="hidden" name="chkitem[]" value="999_8"/><input type="hidden" name="chkitem[]" value="999_9"/><input type="hidden" name="chkitem[]" value="999_10"/>
                <image-dialog :ids="images['q999_1']"
                    :init="imageDialogInit['q999_1']"
                    :show="imageDialogStatus['q999_1'] == 'show'"
                    @close="imageDialogStatus['q999_1'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_2']"
                    :init="imageDialogInit['q999_2']"
                    :show="imageDialogStatus['q999_2'] == 'show'"
                    @close="imageDialogStatus['q999_2'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_3']"
                    :init="imageDialogInit['q999_3']"
                    :show="imageDialogStatus['q999_3'] == 'show'"
                    @close="imageDialogStatus['q999_3'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_4']"
                    :init="imageDialogInit['q999_4']"
                    :show="imageDialogStatus['q999_4'] == 'show'"
                    @close="imageDialogStatus['q999_4'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_5']"
                    :init="imageDialogInit['q999_5']"
                    :show="imageDialogStatus['q999_5'] == 'show'"
                    @close="imageDialogStatus['q999_5'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_6']"
                    :init="imageDialogInit['q999_6']"
                    :show="imageDialogStatus['q999_6'] == 'show'"
                    @close="imageDialogStatus['q999_6'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_7']"
                    :init="imageDialogInit['q999_7']"
                    :show="imageDialogStatus['q999_7'] == 'show'"
                    @close="imageDialogStatus['q999_7'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_8']"
                    :init="imageDialogInit['q999_8']"
                    :show="imageDialogStatus['q999_8'] == 'show'"
                    @close="imageDialogStatus['q999_8'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_9']"
                    :init="imageDialogInit['q999_9']"
                    :show="imageDialogStatus['q999_9'] == 'show'"
                    @close="imageDialogStatus['q999_9'] = 'close'"
        >
                                                                                            </image-dialog>
            <image-dialog :ids="images['q999_10']"
                    :init="imageDialogInit['q999_10']"
                    :show="imageDialogStatus['q999_10'] == 'show'"
                    @close="imageDialogStatus['q999_10'] = 'close'"
        >
                                                                                            </image-dialog>
        </question>
    <div class="question-footer">
            </div>
</div>
</div><nav id="navigator" class="global-navigator">
        <button v-on:click="goNext" type="button" id="next" :class="{ disabled: !enabled }">Next</button>
    </nav>
<input type="hidden" id="csrfkey" name="csrf" value="093da0aa4735b420169d2d169050d994"/>
<script type="text/javascript">document.oncontextmenu = function(){return false;};</script><script type="text/javascript">
document.oncopy = function(){return false;};
document.documentElement.style.setProperty('-ms-user-select', 'none');
document.documentElement.style.setProperty('-moz-user-select', 'none');
document.documentElement.style.webkitUserSelect = 'none';
document.documentElement.style.webkitTouchCallout = 'none';
document.documentElement.style.kHtmlUserSelect = 'none';
</script>                <input type="hidden"                       name="hdnPagePos"       value="10"/>
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

