// Update 31 July 2023 //comment console.log

var LanCode = null;
var ModelList = null;
var LoaderList = null;
var ScriptReady = false;
var GibberishClass = null;

// **** Language Script Loader ***
function LanguageScriptLoader() {
  if (LoaderList.length > 0) {
    var loadCount = 0;
    for (var theIndex in LoaderList) {
      theScript = document.createElement("script");
      theScript.type = "text/javascript";
      theScript.async = true;
      theScript.onload = function () {
        loadCount++;
        if (loadCount == LoaderList.length) {
          if (LanCode == "vn" || LanCode == "th") {
            LanguageModelLoader();
          } else {
            GibberishAsianReady();
          }
        }
      };
      theScript.src = LoaderList[theIndex].path;
      document.getElementsByTagName("head")[0].appendChild(theScript);
    }
  }
}

// **** Language Model Loader ***
function LanguageModelLoader() {
  if (ModelList.length > 0) {
    var loadCount = 0;
    for (var theIndex in ModelList) {
      theScript = document.createElement("script");
      theScript.type = "text/javascript";
      theScript.async = true;
      theScript.onload = function () {
        loadCount++;
        if (loadCount == ModelList.length) {
          if (LanCode == "my") {
            GibberishClass.MY_ModelFile = MY_ModelFile;
            GibberishClass.MY_Dictionary = MY_Dictionary;
            GibberishClass.MY_UsingJSONFile = true;
          }
          if (LanCode == "vn") {
            GibberishClass.VN_ModelFile = VN_ModelFile;
            GibberishClass.VN_UsingJSONFile = true;
          }
          if (LanCode == "th") {
            GibberishClass.TH_ModelFile = TH_ModelFile;
            GibberishClass.TH_UsingJSONFile = true;
          }
          if (LanCode == "id") {
            GibberishClass.ID_ModelFile = ID_ModelFile;
            GibberishClass.ID_Dictionary = ID_Dictionary;
            GibberishClass.ID_UsingJSONFile = true;
          }
          GibberishAsianReady();
        }
      };
      theScript.src = ModelList[theIndex].path;
      document.getElementsByTagName("head")[0].appendChild(theScript);
    }
  }
}

// **** Gibberish Asian Ready ***
function GibberishAsianReady() {
  ScriptReady = true;
  // Gibberish Asian Ready
  //console.log("ready.");
}

/*
ch = Chinese 中文
my = Malay
jp = Japanese 日本語の
kr = Korean 한국인
vn = Vietnamese
th = Thai
id = Indonesian
*/
// **** Language Configuration ***
function LanguageConfiguration(theLanCode) {
  LanCode = theLanCode;
  switch (theLanCode) {
    case "ch":
      //
      LoaderList = [
        {
          type: "idiom",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/idiom-library/idiom_cs.js",
        },
        {
          type: "idiom",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/idiom-library/idiom_ct.js",
        },
        // {
        //   type: "plugin",
        //   path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/plugin/opencc-js/data.min.js",
        // },
        // {
        //   type: "plugin",
        //   path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/plugin/opencc-js/data.cn2t.min.js",
        // },
        // {
        //   type: "plugin",
        //   path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/plugin/opencc-js/data.t2cn.min.js",
        // },
        // {
        //   type: "plugin",
        //   path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/plugin/opencc-js/bundle-browser.min.js",
        // },
      ];
      GibberishClass = new CH_GibberishCheck();
      LanguageScriptLoader();
      break;
    case "my":
      ModelList = [
        {
          type: "model",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/model/gib_model_malay.js",
        },
        {
          type: "dictionary",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/idiom-library/dic_my.js",
        },
      ];
      GibberishClass = new MY_GibberishCheck();
      LanguageModelLoader();
      break;
    case "jp":
      LoaderList = [
        {
          type: "idiom",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/idiom-library/idiom_jp.js",
        },
        // {
        //   type: "plugin",
        //   path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/plugin/wanakana/wanakana.min.js",
        // },
      ];
      GibberishClass = new JP_GibberishCheck();
      LanguageScriptLoader();
      break;
    case "kr":
      LoaderList = [
        {
          type: "idiom",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/idiom-library/idiom_kr.js",
        },
      ];
      GibberishClass = new KR_GibberishCheck();
      LanguageScriptLoader();
      break;
    case "vn":
      ModelList = [
        {
          type: "model",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/model/gib_model_vietnamese.js",
        },
      ];
      LoaderList = [
        {
          type: "script",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/model/gd.js",
        },
      ];
      GibberishClass = new VN_GibberishCheck();
      LanguageScriptLoader();
      break;
    case "th":
      ModelList = [
        {
          type: "model",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/model/gib_model_thai.js",
        },
      ];
      LoaderList = [
        {
          type: "script",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/model/gd.js",
        },
      ];
      GibberishClass = new TH_GibberishCheck();
      LanguageScriptLoader();
      break;
    case "id":
      ModelList = [
        {
          type: "model",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/model/gib_model_Indonesian.js",
        },
        {
          type: "dictionary",
          path: "https://media.ipsosinteractive.com/sandbox/TheEngineRoom/Projects/POCS/DataGuards/asian/idiom-library/dic_id.js",
        },
      ];
      GibberishClass = new ID_GibberishCheck();
      LanguageModelLoader();
      break;
    default:
      document.onreadystatechange = function () {
        if (document.readyState === "complete") {
          if (LanCode == "") {
            $("#GibberishError").html("missing language code.");
          } else {
            $("#GibberishError").html("input language code not support.");
          }
        }
      };
  }
}

// **** Chinese Gibberish Check Class ***
class CH_GibberishCheck {
  commonWordList = null;
  idiomDictionary = null;
  IsSimplified = false;
  GB_GibberishAnswer = false;
  GB_GibberishAnswerList = [];
  CH_UserInput = "";

  GB_UpdateResult_Func() {
    $("#GibberishResult").html(
      "Gibberish answers detected -- " +
        this.GB_GibberishAnswer +
        "</br>" +
        "</br>"
    );
  }

  // split Sentence Word for analysis
  CH_SplitSentenceWord(str) {
    theSentence = str.replace(/\s/g, ""); //remove space
    var splitSentence = theSentence
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        "@"
      )
      .replace(/[\d\.]+$/, "@");
    var sentenceArray = splitSentence.split("@");

    this.CH_UserInput = str
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[a-z]/gi, "")
      .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "");

    // Input request at least one Characters
    if (this.CH_UserInput == "") {
      this.GB_GibberishAnswer = true;
    }

    for (var theSentence in sentenceArray) {
      if (sentenceArray[theSentence] != "") {
        this.CH_IsAllChn(sentenceArray[theSentence]);
      }
    }
  }

  // filter symbol and number before check Repeat Sentence Check.
  CH_IsAllChn(str) {
    str = str.replace(/\s/g, ""); //remove space
    var theString = str
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[\d\.]+$/, "")
      .replace(/[a-zA-Z]/gi, "");

    this.CH_RepeatSentenceCheck(theString);
  }

  CH_RepeatSentenceCheck(theSentence) {
    let inputString = theSentence;
    let words = [...inputString];

    if (words.length >= 4) {
      //Repeat word pattern - AAABBB
      if (
        inputString.substring(0, 1) == inputString.substring(1, 2) &&
        inputString.substring(2, 3) == inputString.substring(3, 4) &&
        inputString.substring(3, 4) == inputString.substring(4, 5)
      ) {
        if (
          !this.idiomDictionary.includes(
            inputString.substring(0, 2) + inputString.substring(2, 4)
          )
        ) {
          this.GB_GibberishAnswer = true;
          this.CH_CasualConversationCheck(
            inputString.substring(0, 2) + inputString.substring(2, 4)
          );
        }
      }

      //Repeat word pattern - ABABAB
      if (
        inputString.substring(0, 2) == inputString.substring(2, 4) &&
        inputString.substring(2, 4) == inputString.substring(4, 6)
      ) {
        if (!this.idiomDictionary.includes(inputString)) {
          this.GB_GibberishAnswer = true;
          this.CH_CasualConversationCheck(theSentence);
        }
      }

      //Repeat word pattern - ABCABCABC
      if (
        inputString.substring(0, 3) == inputString.substring(3, 6) &&
        inputString.substring(3, 6) == inputString.substring(6, 9)
      ) {
        this.GB_GibberishAnswer = true;
      }

      //Repeat word pattern - ABCDABCDABCD
      if (
        inputString.substring(0, 4) == inputString.substring(4, 8) &&
        inputString.substring(4, 8) == inputString.substring(8, 12)
      ) {
        this.GB_GibberishAnswer = true;
      }

      //Repeat word pattern - ABCDABCDABCD
      if (
        inputString.substring(0, 5) == inputString.substring(5, 10) &&
        inputString.substring(5, 10) == inputString.substring(10, 15)
      ) {
        this.GB_GibberishAnswer = true;
      }

      //Repeat word pattern - AAA
      if ((words[0] == words[0]) == words[0]) {
        this.GB_GibberishAnswer = true;
      }

      var totalStr = inputString.length;

      //Repeat word pattern - xxxXYXYXY
      if (
        inputString.substring(totalStr - 2, totalStr) ==
          inputString.substring(totalStr - 4, totalStr - 2) &&
        inputString.substring(totalStr - 4, totalStr - 2) ==
          inputString.substring(totalStr - 6, totalStr - 4)
      ) {
        if (
          !this.idiomDictionary.includes(
            inputString.substring(totalStr - 4, totalStr)
          )
        ) {
          this.GB_GibberishAnswer = true;
          this.CH_CasualConversationCheck(theSentence);
        }
      }

      //Repeat word pattern - xxxXYZXYZXYZ
      if (
        inputString.substring(totalStr - 3, totalStr) ==
          inputString.substring(totalStr - 6, totalStr - 3) &&
        inputString.substring(totalStr - 6, totalStr - 3) ==
          inputString.substring(totalStr - 9, totalStr - 6)
      ) {
        this.GB_GibberishAnswer = true;
      }

      //Repeat word pattern - xxxXYZXYZXYZx
      if (
        inputString.substring(totalStr - 4, totalStr - 1) ==
          inputString.substring(totalStr - 4, totalStr - 7) &&
        inputString.substring(totalStr - 4, totalStr - 7) ==
          inputString.substring(totalStr - 7, totalStr - 10)
      ) {
        this.GB_GibberishAnswer = true;
      }
    }
    this.CH_IdiomChecking(inputString);
  }

  // check is repeat word is valid
  CH_CheckRepeatWords(theWords, inputString) {
    var regex = new RegExp(theWords, "gi"),
      result,
      indices = [];
    while ((result = regex.exec(inputString))) {
      indices.push(result.index);
    }

    var idiomArray = theWords;
    var countDifferentWord = 0;
    for (var theIndices in indices) {
      if (theIndices != 0) {
        if (
          Number(indices[theIndices] - 1) == indices[Number(theIndices) - 1]
        ) {
          idiomArray = idiomArray + inputString[indices[theIndices]];
        }
      }

      if (theIndices != indices.length - 1) {
        if (
          Number(indices[theIndices] + 1) != indices[Number(theIndices) + 1]
        ) {
          countDifferentWord++;
        }
      } else {
        if (
          Number(indices[theIndices] - 1) != indices[Number(theIndices) - 1]
        ) {
          countDifferentWord++;
        }
      }
    }

    if (countDifferentWord == 0) {
      if (!this.idiomDictionary.includes(idiomArray)) {
        this.GB_GibberishAnswer = true;
      }
    }
  }

  // check is repeat word is valid
  CH_CheckContinueLetter(inputString) {
    var countLetter = 0;
    var preLetter = "";

    for (var i = 0; i < inputString.length; i++) {
      var idiomCheck = "";
      if (preLetter != inputString.charAt(i)) {
        idiomCheck = "";
        preLetter = inputString.charAt(i);
        countLetter = 1;
      } else {
        countLetter++;
        if (countLetter >= 2) {
          for (let i = 0; i < countLetter; i++) {
            idiomCheck = idiomCheck + preLetter;
          }

          if (!this.idiomDictionary.includes(idiomCheck)) {
            //continue letter detect!
            this.GB_GibberishAnswer = true;
            this.GB_UpdateResult_Func();
            break;
          }
        }
      }
    }
  }

  CH_IdiomChecking(sentence) {
    var commonWord = this.commonWordList;

    let inputString = sentence;
    inputString = inputString.replace(/[a-zA-Z]/gi, "");
    let words = [...inputString]; //split thesentince
    let wordMap = {};
    for (let i = 0; i < words.length; i++) {
      let currentWordCount = wordMap[words[i]];
      let count = currentWordCount ? currentWordCount : 0;
      wordMap[words[i]] = count + 1; //count repeact word and save on array
    }
    var totalWordsRepeactCount = 0;
    //Check Repeat word and idiom
    for (var theWords in wordMap) {
      totalWordsRepeactCount++;
      if (wordMap[theWords] >= 3) {
        if (commonWord.includes(theWords)) {
          if (inputString.length < 10) {
            if (!this.idiomDictionary.includes(inputString)) {
              this.CH_CheckRepeatWords(theWords, inputString);
            }
          }
        } else {
          if (!this.idiomDictionary.includes(inputString)) {
            this.CH_CheckRepeatWords(theWords, inputString);
          }
        }
      }
    }

    if (inputString.length > 4) {
      // Repeat word is too many on sentince
      if (totalWordsRepeactCount <= inputString.length / 2) {
        this.CH_CheckContinueLetter(inputString);
      }
    }

    //Check word length <=4 with and dunplicate word is more than 1
    if (inputString.length <= 4 && inputString.length > 2) {
      if (wordMap[theWords] >= 4) {
        if (!this.idiomDictionary.includes(inputString)) {
          this.GB_GibberishAnswer = true;
        }
      }
    }
  }

  // Second Validation Check for ordinary casual conversation
  CH_CasualConversationCheck(inputString) {
    if (this.GB_GibberishAnswer) {
      var theSentence = inputString.replace(/\s/g, ""); //remove space
      var wordsOnly = theSentence
        .replace(
          /[`~!@#$%^&*()）_|+\-=?;:'",.<>～！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
          ""
        )
        .replace(/[a-z]/gi, "");

      let words = [...wordsOnly]; //split thesentince
      let wordMap = {};
      for (let i = 0; i < words.length; i++) {
        let currentWordCount = wordMap[words[i]];
        let count = currentWordCount ? currentWordCount : 0;
        wordMap[words[i]] = count + 1; //count repeact word and save on array
      }

      var totalWordsRepeactCount = 0;
      //Check Repeat word and idiom
      for (var theWords in wordMap) {
        if (wordMap[theWords] > 1) {
          totalWordsRepeactCount =
            Number(totalWordsRepeactCount) + Number(wordMap[theWords]);
        }
      }

      var percentOf = (totalWordsRepeactCount / this.CH_UserInput.length) * 100;
      // If the repeated word is not more than 50% of total input length will be defined as not Gibberish
      if (percentOf < 50) {
        this.GB_GibberishAnswer = false;
      }
    }
  }

  // //Ignore Emoji, Symbol and Emoticons for Gibberish Check
  CH_IgnoreSymbolEmoji(inputString) {
    var removeEmoji = inputString.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );

    return removeEmoji;
  }

  //Check special characters and numbering input
  CH_ValidationInput(inputString) {
    var theString = inputString
      .replace(
        /[`¡~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[a-zA-Z]/gi, "");

    // Without any Chinese Character, Only Numbering input, Only letters input
    if (
      theString.length == 0 ||
      /^\d+$/.test(inputString) ||
      /^[a-zA-Z]+$/.test(inputString)
    ) {
      this.GB_GibberishAnswer = true;
    }
  }

  //Check repeated numbers issue
  // Number repeated continuously for more than 4 times detect as jibberish
  // China Phone number include 11 digit, Taiwan, HongKong and Macau 8 digit,
  // eg: China"18555032655" Taiwan"96956173" HongKong"95432617"
  CH_CheckRepeatedNumbers(inputString) {
    var countDigits = 0;
    var tempNumbersArray = "";
    var gibNumberArray = [];
    for (var i = 0; i < inputString.length; i++) {
      if (isNaN(inputString.charAt(i))) {
        countDigits = 0;
        if (tempNumbersArray.length > 9) {
          gibNumberArray.push(tempNumbersArray);
          tempNumbersArray = "";
        }
        tempNumbersArray = "";
      } else {
        countDigits++;
        tempNumbersArray = tempNumbersArray + inputString[i];
      }
    }

    if (tempNumbersArray.length > 10) {
      gibNumberArray.push(tempNumbersArray);
      tempNumbersArray = "";
    }

    //Add to gibberish answer list as a single word
    if (gibNumberArray.length > 0) {
      for (var theArray in gibNumberArray) {
        // Avoid aibberish answer add to list twice
        var exitOnList = false;
        for (var theList in this.GB_GibberishAnswerList) {
          if (
            this.GB_GibberishAnswerList[theList] == gibNumberArray[theArray]
          ) {
            exitOnList = true;
          }
        }
        if (!exitOnList) {
          this.GB_GibberishAnswerList.push(gibNumberArray[theArray]);
        }
      }
    }
  }

  //Check repeated symbol issue
  CH_CheckRepeatedSymbol(inputString) {
    //Check if 4 and more continuance consecutive special only flag to gibberish
    var tempContinueSymbolArray = [];
    var tempContinueSymbol = "";
    const checkContinueDifferentSymbol = inputString.split("");

    for (var theword in checkContinueDifferentSymbol) {
      const regexSingle =
        /[`'~!@#$%^&*()）_|+\-=?;:'",.　<>～！@#¥%？©®《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi;
      const foundDiffSymbol =
        checkContinueDifferentSymbol[theword].match(regexSingle);
      if (foundDiffSymbol) {
        tempContinueSymbol =
          tempContinueSymbol +
          checkContinueDifferentSymbol[theword].toLowerCase();
      } else {
        if (tempContinueSymbol.length > 3) {
          tempContinueSymbolArray.push(tempContinueSymbol);
        }
        tempContinueSymbol = "";
      }
    }
    if (tempContinueSymbol.length > 3) {
      tempContinueSymbolArray.push(tempContinueSymbol);
    }

    if (tempContinueSymbolArray.length > 0) {
      for (var theArray in tempContinueSymbolArray) {
        // Avoid aibberish answer add to list twice
        var exitOnList = false;
        for (var theList in this.GB_GibberishAnswerList) {
          if (
            this.GB_GibberishAnswerList[theList].toLowerCase() ==
            tempContinueSymbolArray[theArray].toLowerCase()
          ) {
            exitOnList = true;
          }
        }
        if (!exitOnList) {
          this.GB_GibberishAnswerList.push(tempContinueSymbolArray[theArray]);
        }
      }
    }
  }

  //Chinese only set the Gibberish flag if input words more than 40%
  CH_IsChineseUnicode(inputString) {
    function isUnicodeInRange(str, ranges) {
      for (let i = 0; i < str.length; i++) {
        const code = str.codePointAt(i);
        let isInRange = false;
        for (let j = 0; j < ranges.length; j++) {
          const [start, end] = ranges[j];
          if (code >= start && code <= end) {
            isInRange = true;
            break;
          }
        }
        if (!isInRange) {
          return false;
        }
      }
      return true;
    }

    const CH_Ranges = [
      [0x4e00, 0x9fff],
      [0x3400, 0x4dbf],
      [0x20000, 0x2a6df],
      [0x2a700, 0x2b739],
      [0x2b740, 0x2b81d],
      [0x2b820, 0x2cea1],
      [0x2ceb0, 0x2ebe0],
      [0x30000, 0x3134a],
      [0x31350, 0x323af],
      [0x2f800, 0x2fa1f],
      [0x2e80, 0x2eff],
      [0x31c0, 0x31ef],
      [0x2ff0, 0x2fff],
      [0x2f800, 0x2fa1f],
      [0x2e80, 0x2eff],
      [0x31c0, 0x31ef],
    ];

    return isUnicodeInRange(inputString, CH_Ranges);
  }

  //Chinese only set the Gibberish flag if input words more than 40%
  CH_FortyPercentAlphabet(inputString) {
    inputString = inputString.replace(
      /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890０１２３４５６７８９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｛｜｝～｟｠｡｢｣､￠￡￢￣￤￥￦￨￩￪￫￭￮！@#¥%？♡ㆍᆞᆢ《》’—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
      ""
    );
    inputString = inputString.replace(
      /[ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ]/gi,
      "A"
    ); //Halfwidth and Fullwidth Forms alphabet filter
    var thisClass = this;
    var chineseWords = 0;
    var nonChineseWords = 0;
    // var stringArray = inputString.split(/(\s+)/);
    var stringArray = inputString.split("");

    //var splitWordArray = [];

    // Continuous alpabet count is 1 word only
    var alphabetList = [];
    var nonAlphabetList = [];
    var tempList = "";
    for (var theChr in stringArray) {
      if (stringArray[theChr].match(/^[a-zA-Z]+$/)) {
        tempList = tempList + stringArray[theChr];
      } else {
        if (tempList.length > 0) {
          alphabetList.push(tempList);
        }
        tempList = "";
        if (stringArray[theChr] != " ") {
          nonAlphabetList.push(stringArray[theChr]);
        }
      }
    }
    if (tempList.length > 0) {
      alphabetList.push(tempList);
    }
    nonChineseWords = nonChineseWords + alphabetList.length;

    //can't detect is English language or other alphabet language（Malay，Indo) only can check alphabet now
    for (var theIndex in nonAlphabetList) {
      if (this.CH_IsChineseUnicode(nonAlphabetList[theIndex])) {
        chineseWords++;
      } else {
        nonChineseWords++;
      }
    }

    //Set Gibberish to True if more than 40% word is english
    nonChineseWords = nonChineseWords + this.GB_GibberishAnswerList.length;
    var totalInputWords = nonChineseWords + chineseWords;
    var totalInputPercent = (nonChineseWords / totalInputWords) * 100;

    // console.log("nonChineseWords :: "+nonChineseWords);
    // console.log("chineseWords :: "+chineseWords);
    // console.log("this.GB_GibberishAnswerList :: "+this.GB_GibberishAnswerList);
    // console.log("totalInputPercent :: "+totalInputPercent);

    if (totalInputPercent > 40) {
      thisClass.GB_GibberishAnswer = true;
    } else {
      if (!thisClass.GB_GibberishAnswer) {
        thisClass.GB_GibberishAnswer = false;
      }
    }
    thisClass.GB_UpdateResult_Func();
  }

  // 高高兴兴 Simplified , 高高興興 Traditional
  GB_CheckGibberishData(theInput) {
    this.GB_GibberishAnswer = false;
    this.GB_GibberishAnswerList = [];

    theInput = theInput.toLowerCase().trim();
    /*
    const converter = OpenCC.Converter({ from: "tw", to: "cn" });
    if (theInput == converter(theInput)) {
      this.IsSimplified = true;
      this.idiomDictionary = idiomDictionaryCS;
      this.commonWordList = commonWordCS;
    } else {
      this.IsSimplified = false;
      this.idiomDictionary = idiomDictionaryCT;
      this.commonWordList = commonWordCT;
    }
    */
    this.idiomDictionary = idiomDictionaryCS + idiomDictionaryCT;
    this.commonWordList = commonWordCS + commonWordCT;

    theInput = theInput.replace(/[\r\n]+/gm, ""); //remove line breaks

    // [CH]Check for Emoji and by-pass them
    theInput = this.CH_IgnoreSymbolEmoji(theInput);

    // [CH]Check if sentence only has symbols and/or numbers
    this.CH_ValidationInput(theInput);

    // [CH]Check it sentence has more than 11 continuous repeated numbers
    this.CH_CheckRepeatedNumbers(theInput);

    // [CH]Check it there are more than 3 continuous symbol
    this.CH_CheckRepeatedSymbol(theInput);

    // [CH]Check it > 40% Non Chinese
    this.CH_FortyPercentAlphabet(theInput);

    // [CH]Check for Repeated sentence
    // [CH]Casual Conversation Check
    // [CH]Idiom Checking
    // [CH]Check for Repeated words
    this.CH_SplitSentenceWord(theInput);

    this.GB_UpdateResult_Func();
  }
}

// **** Malay Gibberish Check Class ***
class MY_GibberishCheck {
  MY_ModelFile;
  MY_Dictionary;
  GB_GibberishAnswer = false;
  GB_GibberishAnswerList = [];
  MY_UsingJSONFile = false;
  Custom_TargetOE;

  GB_UpdateResult_Func() {
    $("#GibberishResult").html(
      "Gibberish answers detected -- " +
        this.GB_GibberishAnswer +
        "</br>" +
        "List of possible gibberish answers -- " +
        this.GB_GibberishAnswerList +
        "</br>" +
        "</br>"
    );
  }

  // Check continue letter
  MY_CheckContinueLetter(theInput) {
    var splitSentence = theInput.split(/\s+/);
    var countDigits = 0;

    for (var theWord in splitSentence) {
      var countLetter = 0;
      var preLetter = "";

      for (var i = 0; i < splitSentence[theWord].length; i++) {
        //Letter repeated continuously for more than 3 times detect as jibberish
        if (preLetter != splitSentence[theWord].charAt(i)) {
          preLetter = splitSentence[theWord].charAt(i);
          countLetter = 1;
        } else {
          if (isNaN(splitSentence[theWord].charAt(i))) {
            countLetter++;
            if (countLetter >= 3) {
              this.GB_GibberishAnswer = true;
              this.GB_UpdateResult_Func();
              break;
            }
          } else {
            preLetter = "";
            countLetter = 0;
          }
        }

        // Number repeated continuously for more than 4 times detect as jibberish
        if (isNaN(splitSentence[theWord].charAt(i))) {
          countDigits = 0;
        } else {
          countDigits++;
          if (countDigits >= 5) {
            this.GB_GibberishAnswer = true;
            this.GB_UpdateResult_Func();
            break;
          }
        }
      }

      if (this.GB_GibberishAnswer) {
        break;
      }
    }

    if (!this.GB_GibberishAnswer) {
      this.MY_ValidationInput(theInput);
    }
  }

  //Check special characters and numbering input
  MY_ValidationInput(theInput) {
    var theString = theInput
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[a-zA-Z]/gi, "");
  }

  //Check repeated symbol issue
  MY_CheckRepeatedSymbol(inputString) {
    const pattern = /([^])\1+/g;
    const matches = inputString.match(pattern);
    var repeatedSymbolCount = 0;

    for (const theIndex in matches) {
      repeatedSymbolCount++;
      //Ellipsis points can be ignored
      if (matches[theIndex][0] == "." && matches[theIndex].length < 4) {
        if (repeatedSymbolCount != 0) {
          repeatedSymbolCount--;
        }
      } else {
        var exitOnList = false;
        for (var theList in this.GB_GibberishAnswerList) {
          if (
            this.GB_GibberishAnswerList[theList].toLowerCase() ==
            matches[theIndex].toLowerCase()
          ) {
            exitOnList = true;
          }
        }
        if (!exitOnList) {
          this.GB_GibberishAnswerList.push(matches[theIndex]);
        }
      }
    }

    if (repeatedSymbolCount > 0) {
      this.GB_GibberishAnswer = true;
    }
  }

  //DG asian v1 Malay only set the Gibberish flag if input words more than 40%
  MY_FortyPercentAlphabet(theWordsArray) {
    var thisClass = this;
    var totalInputPercent =
      (thisClass.GB_GibberishAnswerList.length / theWordsArray.length) * 100;

    //Only set to false if more than 40% word is Gibberish
    if (thisClass.GB_GibberishAnswer) {
      if (totalInputPercent > 40) {
        thisClass.GB_GibberishAnswer = true;
      } else {
        thisClass.GB_GibberishAnswer = false;
      }
    }

    //Flag Gibberish Answer if only Symbol
    // if(thisClass.GB_GibberishAnswerList.length == 1)
    // {
    //    var isSymbolOnly = thisClass.GB_GibberishAnswerList[0];
    //    const regex = /[`1234567890~!@#$%^&*()）_|+\-=?;:'",.<>～！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi;
    //    const foundSymbol = isSymbolOnly.match(regex);
    //    if(foundSymbol != null)
    //    {
    //     thisClass.GB_GibberishAnswer = true;
    //     console.log("hello")
    //    }
    // }

    thisClass.GB_UpdateResult_Func();
  }

  //Check if input only number
  MY_CheckOnlyNumber(inputString) {
    var removeDigits = inputString.replace(/[0-9]/g, "");
    if (removeDigits.length == 0) {
      this.GB_GibberishAnswer = true;
    }
  }

  //Check special cases ( word with symbol) only more than 4 consecutive special characters will flag is Gibberish
  /*
    ta!!!man = true
    !!!taman = false
    taman!!! = false
    taman!!!! = true
    taman... = false
    taman.... = true
  */
  MY_CheckWordWithSymbol(inputString) {
    var symbolWithWord = inputString.split(/(\s+)/);

    for (var i = 0; i < symbolWithWord.length; i++) {
      //remove all white space and empty array
      symbolWithWord[i] = symbolWithWord[i].replace(/\s/g, "");

      if (symbolWithWord[i].length > 0) {
        // Check if 4 consecutive special characters at the beginning or end flag to gibberish
        const consecutivePattern = /^[\W_]{4}|[\W_]{4}$/;
        if (consecutivePattern.test(symbolWithWord[i])) {
          // Avoid aibberish answer add to list twice
          var exitOnList = false;
          for (var theList in this.GB_GibberishAnswerList) {
            if (
              this.GB_GibberishAnswerList[theList].toLowerCase() ==
              symbolWithWord[i].toLowerCase()
            ) {
              exitOnList = true;
            }
          }
          if (!exitOnList) {
            this.GB_GibberishAnswer = true;
            this.GB_GibberishAnswerList.push(symbolWithWord[i].toLowerCase());
          }
        }

        const dashPattern = /\-/; // matches the sequence "-"
        if (dashPattern.test(symbolWithWord[i])) {
          symbolWithWord[i] = symbolWithWord[i].replace("-", ""); //handle malay en dash "bermain-main"
        }

        const dotPattern = /\.\.\./; // matches the sequence "..."
        if (dotPattern.test(symbolWithWord[i])) {
          symbolWithWord[i] = symbolWithWord[i].replace("...", ""); //handle Ellipsis points "lebih..."
        }

        // Check is any non-alphanumeric character between alphanumeric characters end flag to gibberish
        const onBetweenPattern = /^[a-zA-Z0-9]+[\W_]+[a-zA-Z0-9]+$/;
        if (onBetweenPattern.test(symbolWithWord[i])) {
          // Avoid aibberish answer add to list twice
          var exitOnList = false;
          for (var theList in this.GB_GibberishAnswerList) {
            if (
              this.GB_GibberishAnswerList[theList].toLowerCase() ==
              symbolWithWord[i].toLowerCase()
            ) {
              exitOnList = true;
            }
          }
          if (!exitOnList) {
            this.GB_GibberishAnswer = true;
            this.GB_GibberishAnswerList.push(symbolWithWord[i].toLowerCase());
          }
        }
      }
    }
  }

  GB_CheckGibberishData(theInput) {
    theInput = theInput.toLowerCase().trim();
    var thisClass = this;
    //this.Custom_TargetOE = theInput;
    let accepted_chars = "abcdefghijklmnopqrstuvwxyz ";
    let k = accepted_chars.length;
    let pos = {};

    for (let i = 0; i < k; i++) {
      pos[accepted_chars[i]] = i;
    }

    function normalize(line) {
      var arr = line.toLowerCase().split("");
      return arr.filter(function (item) {
        return accepted_chars.indexOf(item) > -1;
      });
    }

    function averageTransitionProbability(line, log_prob_matrix) {
      let log_prob = 1.0;
      let transition_ct = 0;

      var filtered_line = normalize(line);
      var a = false;

      for (var b in filtered_line) {
        if (a !== false) {
          log_prob += log_prob_matrix[pos[a]][pos[filtered_line[b]]];
          transition_ct += 1;
        }
        a = filtered_line[b];
      }

      return Math.exp(log_prob / (transition_ct || 1));
    }

    let model_data = {};

    if (this.MY_UsingJSONFile) {
      model_data = this.MY_ModelFile;
    } else {
      model_data = JSON.parse(this.MY_ModelFile);
    }

    function gib_dect(line) {
      return (
        averageTransitionProbability(line, model_data.matrix) >
        model_data.threshold
      );
    }

    function GB_AnalyzeGibberish_Func(userInputText) {
      //var splitWord = userInputText.split(/[^\w]/);
      var splitWord = userInputText.split(/\s+/);

      // Reset before Analyze Gibberish checking
      thisClass.GB_GibberishAnswerList = [];
      thisClass.GB_GibberishAnswer = false;

      /*
      for (var i = 0; i < splitWord.length; i++) {
        if (gib_dect(splitWord[i])) {
        } else {
          thisClass.GB_GibberishAnswer = true;
          thisClass.GB_GibberishAnswerList.push(splitWord[i]);
        }
      }
      */

      var workCheck = 0;
      for (var i = 0; i < splitWord.length; i++) {
        var ignoreCase = false;

        //Handle dot pattern on between "Mencari pendapatan lebih...Dan mencari"
        const onBetweenPattern = /^[a-zA-Z0-9]+[\W_]+[a-zA-Z0-9]+$/;
        if (onBetweenPattern.test(splitWord[i])) {
          const dashPattern = /\-/; // matches the sequence "-"
          if (dashPattern.test(splitWord[i])) {
            ignoreCase = true;
          }

          const dotPattern = /\.\.\./; // matches the sequence "..."
          if (dotPattern.test(splitWord[i])) {
            ignoreCase = true;
          }
        }

        if (!ignoreCase) {
          var theWord = splitWord[i].replace(
            /[`~!@#$%^&*()）_|+\=?;:'",.<>～！@#¥%？.《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
            ""
          );
        } else {
          var theWord = splitWord[i];
        }

        // if string contains only digits ignore it
        if (/^\d+$/.test(theWord)) {
          theWord = "";
        }

        if (
          theWord != "" &&
          theWord != " " &&
          theWord != null &&
          theWord.length > 0
        ) {
          workCheck++;
          if (!MY_Dictionary.includes(theWord.toLowerCase())) {
            thisClass.GB_GibberishAnswer = true;
            thisClass.GB_GibberishAnswerList.push(theWord.toLowerCase());
          }
        }
      }

      // Not valid malay word
      if (workCheck == 0) {
        thisClass.GB_GibberishAnswer = true;
      }

      //sambung belajar dengan  bersungguh-subgguh dan berguna kepada masyarakat
      thisClass.MY_CheckWordWithSymbol(userInputText);
      //thisClass.MY_CheckRepeatedSymbol(userInputText); //[remove]

      // First input character in Malay cannot be a symbol, except for numbers
      if (/^[a-zA-Z()]+$/.test(splitWord[0][0]) == false) {
        thisClass.GB_GibberishAnswer = true;
      }

      userInputText = userInputText.replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？.《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      );

      thisClass.MY_CheckContinueLetter(userInputText);
      thisClass.MY_FortyPercentAlphabet(splitWord);
      thisClass.MY_CheckOnlyNumber(userInputText);
      thisClass.GB_UpdateResult_Func();
    }

    GB_AnalyzeGibberish_Func(theInput);
  }

  GB_UpdateResult_Func() {
    $("#GibberishResult").html(
      "Gibberish answers detected -- " +
        this.GB_GibberishAnswer +
        "</br>" +
        "List of possible gibberish answers -- " +
        this.GB_GibberishAnswerList +
        "</br>" +
        "</br>"
    );
  }
}

// **** Japanese Gibberish Check Class ***
class JP_GibberishCheck {
  commonWordList = null;
  idiomDictionary = null;
  GB_GibberishAnswer = false;
  GB_GibberishAnswerList = [];

  GB_UpdateResult_Func() {
    $("#GibberishResult").html(
      "Gibberish answers detected -- " +
        this.GB_GibberishAnswer +
        "</br>" +
        "</br>"
    );
  }

  // split Sentence Word for analysis
  JP_SplitSentenceWord(str) {
    theSentence = str.replace(/\s/g, ""); //remove space
    var splitSentence = theSentence
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.　<>～1234567890！@#¥%？©®《》・･—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        "@"
      )
      .replace(/[\d\.]+$/, "@");
    var sentenceArray = splitSentence.split("@");

    for (var theSentence in sentenceArray) {
      if (sentenceArray[theSentence] != "") {
        this.JP_IsAllChn(sentenceArray[theSentence]);
      }
    }
  }

  // filter symbol and number before check Repeat Sentence Check.
  JP_IsAllChn(str) {
    str = str.replace(/\s/g, ""); //remove space
    var theString = str
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.　<>～1234567890！@#¥%？©®《》・･—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[\d\.]+$/, "")
      .replace(/[a-zA-Z]/gi, "");
    this.JP_RepeatSentenceCheck(theString);
  }

  //Check Repeated sentence
  JP_RepeatSentenceCheck(theSentence) {
    let inputString = theSentence;
    let words = [...inputString];

    if (words.length >= 4) {
      //Repeat word pattern - ABABAB
      if (
        inputString.substring(0, 2) == inputString.substring(2, 4) &&
        inputString.substring(2, 4) == inputString.substring(4, 6)
      ) {
        if (!this.idiomDictionary.includes(inputString.substring(0, 4))) {
          this.GB_GibberishAnswer = true;
        }
      }

      //Repeat word pattern - ABCABCABC
      if (
        inputString.substring(0, 3) == inputString.substring(3, 6) &&
        inputString.substring(3, 6) == inputString.substring(6, 9)
      ) {
        if (!this.idiomDictionary.includes(inputString.substring(0, 3))) {
          this.GB_GibberishAnswer = true;
        }
      }

      //Repeat word pattern - ABCDABCDABCD
      if (
        inputString.substring(0, 4) == inputString.substring(4, 8) &&
        inputString.substring(4, 8) == inputString.substring(8, 12)
      ) {
        if (!this.idiomDictionary.includes(inputString.substring(0, 4))) {
          this.GB_GibberishAnswer = true;
        }
      }

      //Repeat word pattern - ABCDEABCDE
      if (
        inputString.substring(0, 5) == inputString.substring(5, 10) &&
        inputString.substring(5, 10) == inputString.substring(10, 15)
      ) {
        if (!this.idiomDictionary.includes(inputString.substring(0, 5))) {
          this.GB_GibberishAnswer = true;
        }
      }

      //Repeat word pattern - AAA
      if ((words[0] == words[0]) == words[0]) {
        this.GB_GibberishAnswer = true;
      }

      var totalStr = inputString.length;

      //Repeat word pattern - xxxXYXYXY
      if (
        inputString.substring(totalStr - 2, totalStr) ==
          inputString.substring(totalStr - 4, totalStr - 2) &&
        inputString.substring(totalStr - 4, totalStr - 2) ==
          inputString.substring(totalStr - 6, totalStr - 4)
      ) {
        if (
          !this.idiomDictionary.includes(
            inputString.substring(totalStr - 4, totalStr)
          )
        ) {
          this.GB_GibberishAnswer = true;
        }
      }

      //Repeat word pattern - xxxXYZXYZXYZ
      if (
        inputString.substring(totalStr - 3, totalStr) ==
          inputString.substring(totalStr - 6, totalStr - 3) &&
        inputString.substring(totalStr - 6, totalStr - 3) ==
          inputString.substring(totalStr - 9, totalStr - 6)
      ) {
        if (
          !this.idiomDictionary.includes(
            inputString.substring(totalStr - 4, totalStr)
          )
        ) {
          this.GB_GibberishAnswer = true;
        }
      }

      //Repeat word pattern - xxxXYZXYZXYZx
      if (
        inputString.substring(totalStr - 4, totalStr - 1) ==
          inputString.substring(totalStr - 4, totalStr - 7) &&
        inputString.substring(totalStr - 4, totalStr - 7) ==
          inputString.substring(totalStr - 7, totalStr - 10)
      ) {
        if (
          !this.idiomDictionary.includes(
            inputString.substring(totalStr - 4, totalStr - 1)
          )
        ) {
          this.GB_GibberishAnswer = true;
        }
      }
    }

    this.JP_IdiomChecking(inputString);
  }

  // check is repeat word is valid
  JP_CheckRepeatWords(theWords, inputString) {
    var regex = new RegExp(theWords, "gi"),
      result,
      indices = [];
    while ((result = regex.exec(inputString))) {
      indices.push(result.index);
    }

    var idiomArray = theWords;
    var countDifferentWord = 0;
    for (var theIndices in indices) {
      if (theIndices != 0) {
        if (
          Number(indices[theIndices] - 1) == indices[Number(theIndices) - 1]
        ) {
          idiomArray = idiomArray + inputString[indices[theIndices]];
        }
      }

      if (theIndices != indices.length - 1) {
        if (
          Number(indices[theIndices] + 1) != indices[Number(theIndices) + 1]
        ) {
          countDifferentWord++;
        }
      } else {
        if (
          Number(indices[theIndices] - 1) != indices[Number(theIndices) - 1]
        ) {
          countDifferentWord++;
        }
      }
    }

    if (countDifferentWord == 0) {
      if (!this.idiomDictionary.includes(idiomArray)) {
        this.GB_GibberishAnswer = true;
      }
    }
  }

  // check is repeat word is valid
  JP_CheckContinueLetter(inputString) {
    var countLetter = 0;
    var preLetter = "";

    for (var i = 0; i < inputString.length; i++) {
      var idiomCheck = "";
      if (preLetter != inputString.charAt(i)) {
        idiomCheck = "";
        preLetter = inputString.charAt(i);
        countLetter = 1;
      } else {
        countLetter++;
        if (countLetter >= 2) {
          for (let i = 0; i < countLetter; i++) {
            idiomCheck = idiomCheck + preLetter;
          }

          if (!this.idiomDictionary.includes(idiomCheck)) {
            //continue letter detect!
            this.GB_GibberishAnswer = true;
            this.GB_UpdateResult_Func();
            break;
          }
        }
      }
    }
  }

  JP_IdiomChecking(sentence) {
    var commonWord = this.commonWordList;

    let inputString = sentence;
    inputString = inputString.replace(/[a-zA-Z]/gi, "");
    let words = [...inputString]; //split thesentince
    let wordMap = {};
    for (let i = 0; i < words.length; i++) {
      let currentWordCount = wordMap[words[i]];
      let count = currentWordCount ? currentWordCount : 0;
      wordMap[words[i]] = count + 1; //count repeact word and save on array
    }

    var totalWordsRepeactCount = 0;
    //Check Repeat word and idiom
    for (var theWords in wordMap) {
      totalWordsRepeactCount++;
      if (wordMap[theWords] >= 3) {
        if (commonWord.includes(theWords)) {
          if (inputString.length < 10) {
            if (!this.idiomDictionary.includes(inputString)) {
              this.JP_CheckRepeatWords(theWords, inputString);
            }
          }
        } else {
          if (!this.idiomDictionary.includes(inputString)) {
            this.JP_CheckRepeatWords(theWords, inputString);
          }
        }
      }
    }

    if (inputString.length > 4) {
      // Repeat word is too many on sentince
      if (totalWordsRepeactCount <= inputString.length / 2) {
        this.JP_CheckContinueLetter(inputString);
      }
    }

    //Check word length <=4 with and dunplicate word is more than 1
    if (inputString.length <= 4 && inputString.length > 2) {
      if (wordMap[theWords] >= 3) {
        if (!this.idiomDictionary.includes(inputString)) {
          this.GB_GibberishAnswer = true;
        }
      }
    }
  }

  //Check repeated numbers issue
  // Number repeated continuously for more than 11 times detect as jibberish
  // Japan Phone number include 11 digit. eg: "81543613488"
  JP_CheckRepeatedNumbers(inputString) {
    var countDigits = 0;
    var tempNumbersArray = "";
    var gibNumberArray = [];
    for (var i = 0; i < inputString.length; i++) {
      if (isNaN(inputString.charAt(i))) {
        countDigits = 0;
        if (tempNumbersArray.length > 9) {
          gibNumberArray.push(tempNumbersArray);
          tempNumbersArray = "";
        }
        tempNumbersArray = "";
      } else {
        countDigits++;
        tempNumbersArray = tempNumbersArray + inputString[i];
      }
    }

    if (tempNumbersArray.length > 10) {
      gibNumberArray.push(tempNumbersArray);
      tempNumbersArray = "";
    }

    //Add to gibberish answer list as a single word
    if (gibNumberArray.length > 0) {
      for (var theArray in gibNumberArray) {
        // Avoid aibberish answer add to list twice
        var exitOnList = false;
        for (var theList in this.GB_GibberishAnswerList) {
          if (
            this.GB_GibberishAnswerList[theList] == gibNumberArray[theArray]
          ) {
            exitOnList = true;
          }
        }
        if (!exitOnList) {
          this.GB_GibberishAnswerList.push(gibNumberArray[theArray]);
        }
      }
    }
  }

  //Check repeated symbol issue
  JP_CheckRepeatedSymbol(inputString) {
    //Check if 4 and more continuance consecutive special only flag to gibberish
    var tempContinueSymbolArray = [];
    var tempContinueSymbol = "";
    const checkContinueDifferentSymbol = inputString.split("");

    for (var theword in checkContinueDifferentSymbol) {
      const regexSingle =
        /[`'~!@#$%^&*()）_|+\-=?;:'",.　<>～！@#¥%？©®《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi;
      const foundDiffSymbol =
        checkContinueDifferentSymbol[theword].match(regexSingle);
      if (foundDiffSymbol) {
        tempContinueSymbol =
          tempContinueSymbol +
          checkContinueDifferentSymbol[theword].toLowerCase();
      } else {
        if (tempContinueSymbol.length > 3) {
          tempContinueSymbolArray.push(tempContinueSymbol);
        }
        tempContinueSymbol = "";
      }
    }
    //[todo add to chinese]
    if (tempContinueSymbol.length > 3) {
      tempContinueSymbolArray.push(tempContinueSymbol);
    }

    if (tempContinueSymbolArray.length > 0) {
      for (var theArray in tempContinueSymbolArray) {
        // Avoid aibberish answer add to list twice
        var exitOnList = false;
        for (var theList in this.GB_GibberishAnswerList) {
          if (
            this.GB_GibberishAnswerList[theList].toLowerCase() ==
            tempContinueSymbolArray[theArray].toLowerCase()
          ) {
            exitOnList = true;
          }
        }
        if (!exitOnList) {
          this.GB_GibberishAnswerList.push(tempContinueSymbolArray[theArray]);
        }
      }
    }
  }

  //Japanese only set the Gibberish flag if input words more than 40%
  JP_IsJapaneseUnicode(inputString) {
    function isUnicodeInRange(str, ranges) {
      for (let i = 0; i < str.length; i++) {
        const code = str.codePointAt(i);
        let isInRange = false;
        for (let j = 0; j < ranges.length; j++) {
          const [start, end] = ranges[j];
          if (code >= start && code <= end) {
            isInRange = true;
            break;
          }
        }
        if (!isInRange) {
          return false;
        }
      }
      return true;
    }

    const JP_Ranges = [
      [0x3040, 0x309f],
      [0x30a0, 0x30ff],
      [0x31f0, 0x31ff],
      [0x3000, 0x303f],
      [0xff00, 0xffef],
    ];

    return isUnicodeInRange(inputString, JP_Ranges);
  }

  //Japanese only set the Gibberish flag if Japanese plus Han below 60%
  JP_IsHanUnicode(inputString) {
    function isUnicodeInRange(str, ranges) {
      for (let i = 0; i < str.length; i++) {
        const code = str.codePointAt(i);
        let isInRange = false;
        for (let j = 0; j < ranges.length; j++) {
          const [start, end] = ranges[j];
          if (code >= start && code <= end) {
            isInRange = true;
            break;
          }
        }
        if (!isInRange) {
          return false;
        }
      }
      return true;
    }

    const Han_Ranges = [
      [0x4e00, 0x9fff],
      [0x3400, 0x4dbf],
      [0x20000, 0x2a6df],
      [0x2a700, 0x2b739],
      [0x2b740, 0x2b81d],
      [0x2b820, 0x2cea1],
      [0x2ceb0, 0x2ebe0],
      [0x30000, 0x3134a],
      [0x31350, 0x323af],
      [0x2f800, 0x2fa1f],
      [0x2e80, 0x2eff],
      [0x31c0, 0x31ef],
      [0x2ff0, 0x2fff],
      [0x2f800, 0x2fa1f],
      [0x2e80, 0x2eff],
      [0x31c0, 0x31ef],
    ];

    return isUnicodeInRange(inputString, Han_Ranges);
  }

  //Japanese only set the Gibberish flag if input words more than 40%
  JP_FortyPercentAlphabet(inputString) {
    inputString = inputString.replace(
      /[`~!@#$%^&*()）_|+\-=?;:'",.　<>～1234567890０１２３４５６７８９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｛｜｝～｟｠｡｢｣､￠￡￢￣￤￥￦￨￩￪￫￭￮！@#¥%？©®《》・･—·…，.、。、”“‘・、‥‼️。････：；\{\}\[\]\\\/]/gi,
      ""
    );
    inputString = inputString.replace(
      /[ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ]/gi,
      "A"
    ); //Halfwidth and Fullwidth Forms alphabet filter
    var thisClass = this;
    var japaneseWords = 0;
    var nonjapaneseWords = 0;
    var stringArray = inputString.split("");

    // Continuous alpabet count is 1 word only
    var alphabetList = [];
    var nonAlphabetList = [];
    var tempList = "";
    for (var theChr in stringArray) {
      if (stringArray[theChr].match(/^[a-zA-Z]+$/)) {
        tempList = tempList + stringArray[theChr];
      } else {
        if (tempList.length > 0) {
          alphabetList.push(tempList);
        }
        tempList = "";
        if (stringArray[theChr] != " ") {
          nonAlphabetList.push(stringArray[theChr]);
        }
      }
    }
    if (tempList.length > 0) {
      alphabetList.push(tempList);
    }
    nonjapaneseWords = nonjapaneseWords + alphabetList.length;

    //can't detect is English language or other alphabet language（Malay，Indo) only can check alphabet now
    // eg: Hello bila makan lunch?
    //can't detect is Japanese language or Chinese langauge because Japanese word include Han (汉字)
    // eg: 日本語が上手ですね！
    for (var theIndex in nonAlphabetList) {
      var isJapanese = this.JP_IsJapaneseUnicode(nonAlphabetList[theIndex]);
      if (isJapanese) {
        japaneseWords++;
      } else {
        if (this.JP_IsHanUnicode(nonAlphabetList[theIndex])) {
          japaneseWords++;
        } else {
          nonjapaneseWords++;
        }
      }
    }

    //Set Gibberish to True if more than 40% word is english
    nonjapaneseWords = nonjapaneseWords + this.GB_GibberishAnswerList.length;
    var totalInputWords = nonjapaneseWords + japaneseWords;
    var totalInputPercent = (nonjapaneseWords / totalInputWords) * 100;

    // console.log("nonjapaneseWords :: "+nonjapaneseWords);
    // console.log("japaneseWords :: "+japaneseWords);
    // console.log("this.GB_GibberishAnswerList :: "+this.GB_GibberishAnswerList);
    // console.log("totalInputPercent :: "+totalInputPercent);

    if (totalInputPercent > 40) {
      thisClass.GB_GibberishAnswer = true;
    } else {
      if (!thisClass.GB_GibberishAnswer) {
        thisClass.GB_GibberishAnswer = false;
      }
    }
    thisClass.GB_UpdateResult_Func();
  }

  //Check special characters and numbering input
  JP_ValidationInput(inputString) {
    var theString = inputString
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.　<>～1234567890！@#¥%？©®《》０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｛｜｝～｟｠｡｢｣､￠￡￢￣￤￥￦￨￩￪￫￭￮・･—·…，.、。、”“‘・、‥‼️。････：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[a-zA-Z]/gi, "");

    // Without any Japenese Character, Only Numbering input, Only letters input
    if (
      theString.length == 0 ||
      /^\d+$/.test(inputString) ||
      /^[a-zA-Z]+$/.test(inputString)
    ) {
      this.GB_GibberishAnswer = true;
    }
  }

  // //Ignore Emoji, Symbol and Emoticons for Gibberish Check
  JP_IgnoreSymbolEmoji(inputString) {
    var removeEmoji = inputString.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );

    return removeEmoji;
  }

  GB_CheckGibberishData(theInput) {
    this.GB_GibberishAnswer = false;
    this.GB_GibberishAnswerList = [];

    theInput = theInput.toLowerCase().trim();
    this.commonWordList = commonWordJP;
    this.idiomDictionary = idiomDictionaryJP;

    // [JP]Check for Emoji and by-pass them
    theInput = this.JP_IgnoreSymbolEmoji(theInput);

    // [JP]Check if sentence only has symbols and/or numbers
    this.JP_ValidationInput(theInput);

    // [JP]Check it sentence has more than 11 continuous repeated numbers
    this.JP_CheckRepeatedNumbers(theInput);

    // [JP]Check it there are more than 3 continuous symbol
    this.JP_CheckRepeatedSymbol(theInput);

    // [JP]Check it > 40% Non Japanese
    this.JP_FortyPercentAlphabet(theInput);

    // [JP]Check for Repeated sentence
    // [JP]Idiom Checking
    // [JP]Check for Repeated words
    this.JP_SplitSentenceWord(theInput);

    this.GB_UpdateResult_Func();
  }
}

// **** Korean Gibberish Check Class ***
class KR_GibberishCheck {
  commonWordList = null;
  idiomDictionary = null;
  GB_GibberishAnswer = false;
  GB_GibberishAnswerList = [];

  GB_UpdateResult_Func() {
    $("#GibberishResult").html(
      "Gibberish answers detected -- " +
        this.GB_GibberishAnswer +
        "</br>" +
        "</br>"
    );
  }

  // split Sentence Word for analysis
  KR_splitSentenceWord(str) {
    theSentence = str.replace(/\s/g, ""); //remove space
    var splitSentence = theSentence
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》’—·…，.、。.”“‘：；\{\}\[\]\\\/]/gi,
        "@"
      )
      .replace(/[\d\.]+$/, "@");
    var sentenceArray = splitSentence.split("@");

    for (var theSentence in sentenceArray) {
      if (sentenceArray[theSentence] != "") {
        this.KR_IsAllChn(sentenceArray[theSentence]);
      }
    }
  }

  // check is all input is Korean Characters
  KR_IsAllChn(str) {
    str = str.replace(/\s/g, ""); //remove space
    var theString = str
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》’—·…，.、。.”“‘：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[\d\.]+$/, "")
      .replace(/[a-zA-Z]/gi, "");
    this.KR_RepeatSentenceCheck(theString);
  }

  KR_RepeatSentenceCheck(theSentence) {
    let inputString = theSentence;
    let words = [...inputString];
    if (words.length >= 4) {
      //Repeat word pattern - ABABAB
      if (
        inputString.substring(0, 2) == inputString.substring(2, 4) &&
        inputString.substring(2, 4) == inputString.substring(4, 6)
      ) {
        if (!this.idiomDictionary.includes(inputString)) {
          this.GB_GibberishAnswer = true;
        }
      }

      //Repeat word pattern - ABCABCABC
      if (
        inputString.substring(0, 3) == inputString.substring(3, 6) &&
        inputString.substring(3, 6) == inputString.substring(6, 9)
      ) {
        this.GB_GibberishAnswer = true;
      }

      //Repeat word pattern - ABCDABCDABCD
      if (
        inputString.substring(0, 4) == inputString.substring(4, 8) &&
        inputString.substring(4, 8) == inputString.substring(8, 12)
      ) {
        this.GB_GibberishAnswer = true;
      }

      //Repeat word pattern - ABCDEABCDE
      if (
        inputString.substring(0, 5) == inputString.substring(5, 10) &&
        inputString.substring(5, 10) == inputString.substring(10, 15)
      ) {
        this.GB_GibberishAnswer = true;
      }

      //Repeat word pattern - AAA
      if ((words[0] == words[0]) == words[0]) {
        this.GB_GibberishAnswer = true;
      }

      var totalStr = inputString.length;

      //Repeat word pattern - xxxXYXYXY
      if (
        inputString.substring(totalStr - 2, totalStr) ==
          inputString.substring(totalStr - 4, totalStr - 2) &&
        inputString.substring(totalStr - 4, totalStr - 2) ==
          inputString.substring(totalStr - 6, totalStr - 4)
      ) {
        if (
          !this.idiomDictionary.includes(
            inputString.substring(totalStr - 4, totalStr)
          )
        ) {
          // Korean Vowel/Consonant special case
          if (
            !this.commonWordList.includes(
              inputString.substring(totalStr - 1, totalStr)
            )
          ) {
            this.GB_GibberishAnswer = true;
          }
        }
      }

      //Repeat word pattern - xxxXYZXYZ
      //Repeat word pattern - xxxXYZXYZXYZ
      if (
        inputString.substring(totalStr - 3, totalStr) ==
          inputString.substring(totalStr - 6, totalStr - 3) &&
        inputString.substring(totalStr - 6, totalStr - 3) ==
          inputString.substring(totalStr - 9, totalStr - 6)
      ) {
        // Korean Vowel/Consonant special case
        if (
          !this.commonWordList.includes(
            inputString.substring(totalStr - 1, totalStr)
          )
        ) {
          this.GB_GibberishAnswer = true;
        }
      }

      //Repeat word pattern - xxxXYZXYZXYZx
      if (
        inputString.substring(totalStr - 4, totalStr - 1) ==
          inputString.substring(totalStr - 4, totalStr - 7) &&
        inputString.substring(totalStr - 4, totalStr - 7) ==
          inputString.substring(totalStr - 7, totalStr - 10)
      ) {
        this.GB_GibberishAnswer = true;
      }
    }
    this.KR_IdiomChecking(inputString);
  }

  // check is repeat word is valid
  KR_CheckRepeatWords(theWords, inputString) {
    var regex = new RegExp(theWords, "gi"),
      result,
      indices = [];
    while ((result = regex.exec(inputString))) {
      indices.push(result.index);
    }

    var idiomArray = theWords;
    var countDifferentWord = 0;
    for (var theIndices in indices) {
      if (theIndices != 0) {
        if (
          Number(indices[theIndices] - 1) == indices[Number(theIndices) - 1]
        ) {
          idiomArray = idiomArray + inputString[indices[theIndices]];
        }
      }

      if (theIndices != indices.length - 1) {
        if (
          Number(indices[theIndices] + 1) != indices[Number(theIndices) + 1]
        ) {
          countDifferentWord++;
        }
      } else {
        if (
          Number(indices[theIndices] - 1) != indices[Number(theIndices) - 1]
        ) {
          countDifferentWord++;
        }
      }
    }

    if (countDifferentWord == 0) {
      if (!this.idiomDictionary.includes(idiomArray)) {
        this.GB_GibberishAnswer = true;
      }
    }
  }

  // check is repeat word is valid
  KR_CheckContinueLetter(inputString) {
    var countLetter = 0;
    var preLetter = "";

    for (var i = 0; i < inputString.length; i++) {
      var idiomCheck = "";
      if (preLetter != inputString.charAt(i)) {
        idiomCheck = "";
        preLetter = inputString.charAt(i);
        countLetter = 1;
      } else {
        countLetter++;
        if (countLetter >= 2) {
          for (let i = 0; i < countLetter; i++) {
            idiomCheck = idiomCheck + preLetter;
          }

          if (!this.idiomDictionary.includes(idiomCheck)) {
            //continue letter detect!
            this.GB_GibberishAnswer = true;
            this.GB_UpdateResult_Func();
            break;
          }
        }
      }
    }
  }

  KR_IdiomChecking(sentence) {
    var commonWord = this.commonWordList;

    let inputString = sentence;
    inputString = inputString.replace(/[a-zA-Z]/gi, "");

    let words = [...inputString]; //split thesentince
    let wordMap = {};
    for (let i = 0; i < words.length; i++) {
      let currentWordCount = wordMap[words[i]];
      let count = currentWordCount ? currentWordCount : 0;
      wordMap[words[i]] = count + 1; //count repeact word and save on array
    }
    var totalWordsRepeactCount = 0;
    //Check Repeat word and idiom
    for (var theWords in wordMap) {
      totalWordsRepeactCount++;
      if (wordMap[theWords] >= 3) {
        if (commonWord.includes(theWords)) {
          if (inputString.length < 10) {
            if (!this.idiomDictionary.includes(inputString)) {
              this.KR_CheckRepeatWords(theWords, inputString);
            }
          }
        } else {
          if (!this.idiomDictionary.includes(inputString)) {
            this.KR_CheckRepeatWords(theWords, inputString);
          }
        }
      }
    }

    if (inputString.length > 4) {
      // Repeat word is too many on sentince
      if (totalWordsRepeactCount <= inputString.length / 2) {
        this.KR_CheckContinueLetter(inputString);
      }
    }

    //Check word length <=4 with and dunplicate word is more than 1
    if (inputString.length <= 4 && inputString.length > 2) {
      if (wordMap[theWords] >= 3) {
        if (!this.idiomDictionary.includes(inputString)) {
          this.GB_GibberishAnswer = true;
        }
      }
    }
  }

  //Check repeated numbers issue
  // Number repeated continuously for more than 11 times detect as jibberish
  // Korea Phone number include 11 digit. eg: "01062033087"
  KR_CheckRepeatedNumbers(inputString) {
    var countDigits = 0;
    var tempNumbersArray = "";
    var gibNumberArray = [];
    for (var i = 0; i < inputString.length; i++) {
      if (isNaN(inputString.charAt(i))) {
        countDigits = 0;
        if (tempNumbersArray.length > 9) {
          gibNumberArray.push(tempNumbersArray);
          tempNumbersArray = "";
        }
        tempNumbersArray = "";
      } else {
        countDigits++;
        tempNumbersArray = tempNumbersArray + inputString[i];
      }
    }

    if (tempNumbersArray.length > 10) {
      gibNumberArray.push(tempNumbersArray);
      tempNumbersArray = "";
    }

    //Add to gibberish answer list as a single word
    if (gibNumberArray.length > 0) {
      for (var theArray in gibNumberArray) {
        // Avoid aibberish answer add to list twice
        var exitOnList = false;
        for (var theList in this.GB_GibberishAnswerList) {
          if (
            this.GB_GibberishAnswerList[theList] == gibNumberArray[theArray]
          ) {
            exitOnList = true;
          }
        }
        if (!exitOnList) {
          this.GB_GibberishAnswerList.push(gibNumberArray[theArray]);
        }
      }
    }
  }

  //Check repeated symbol issue
  KR_CheckRepeatedSymbol(inputString) {
    //Check if 4 and more continuance consecutive special only flag to gibberish
    var tempContinueSymbolArray = [];
    var tempContinueSymbol = "";
    const checkContinueDifferentSymbol = inputString.split("");

    for (var theword in checkContinueDifferentSymbol) {
      const regexSingle =
        /[`'~!@#$%^&*()）_|+\-=?;:'",.　<>～！@#¥%？©®《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi;
      const foundDiffSymbol =
        checkContinueDifferentSymbol[theword].match(regexSingle);
      if (foundDiffSymbol) {
        tempContinueSymbol =
          tempContinueSymbol +
          checkContinueDifferentSymbol[theword].toLowerCase();
      } else {
        if (tempContinueSymbol.length > 3) {
          tempContinueSymbolArray.push(tempContinueSymbol);
        }
        tempContinueSymbol = "";
      }
    }
    //[todo add to chinese]
    if (tempContinueSymbol.length > 3) {
      tempContinueSymbolArray.push(tempContinueSymbol);
    }

    if (tempContinueSymbolArray.length > 0) {
      for (var theArray in tempContinueSymbolArray) {
        // Avoid aibberish answer add to list twice
        var exitOnList = false;
        for (var theList in this.GB_GibberishAnswerList) {
          if (
            this.GB_GibberishAnswerList[theList].toLowerCase() ==
            tempContinueSymbolArray[theArray].toLowerCase()
          ) {
            exitOnList = true;
          }
        }
        if (!exitOnList) {
          this.GB_GibberishAnswerList.push(tempContinueSymbolArray[theArray]);
        }
      }
    }
  }

  //Check repeated with different symbol issue
  KR_CheckRepeatedDifferentSymbol(inputString) {
    //Check repeated differnt symbol
    //eg: 포켓몬스터 !@#$%^& - true
    var stringArray = inputString.split("");
    var countRepeated = 0;

    for (var theIndex in stringArray) {
      const symbolList =
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi;
      const foundSymbol = stringArray[theIndex].match(symbolList);
      if (foundSymbol) {
        countRepeated++;
      } else {
        if (countRepeated < 4) {
          countRepeated = 0;
        }
      }
    }

    if (countRepeated >= 4) {
      this.GB_GibberishAnswer = true;
    }
  }

  //Korean only set the Gibberish flag if input words more than 40%
  KR_IsKoreanUnicode(inputString) {
    function isUnicodeInRange(str, ranges) {
      for (let i = 0; i < str.length; i++) {
        const code = str.codePointAt(i);
        let isInRange = false;
        for (let j = 0; j < ranges.length; j++) {
          const [start, end] = ranges[j];
          if (code >= start && code <= end) {
            isInRange = true;
            break;
          }
        }
        if (!isInRange) {
          return false;
        }
      }
      return true;
    }

    const KR_Ranges = [
      [0x1100, 0x11ff],
      [0xa960, 0xa97f],
      [0xd7b0, 0xd7ff],
      [0x3130, 0x318f],
      [0xac00, 0xd7af],
      [0xff00, 0xffef],
    ];

    return isUnicodeInRange(inputString, KR_Ranges);
  }

  //Korean only set the Gibberish flag if Korean plus Han below 60%
  KR_IsHanUnicode(inputString) {
    function isUnicodeInRange(str, ranges) {
      for (let i = 0; i < str.length; i++) {
        const code = str.codePointAt(i);
        let isInRange = false;
        for (let j = 0; j < ranges.length; j++) {
          const [start, end] = ranges[j];
          if (code >= start && code <= end) {
            isInRange = true;
            break;
          }
        }
        if (!isInRange) {
          return false;
        }
      }
      return true;
    }

    const Han_Ranges = [
      [0x4e00, 0x9fff],
      [0x3400, 0x4dbf],
      [0x20000, 0x2a6df],
      [0x2a700, 0x2b739],
      [0x2b740, 0x2b81d],
      [0x2b820, 0x2cea1],
      [0x2ceb0, 0x2ebe0],
      [0x30000, 0x3134a],
      [0x31350, 0x323af],
      [0x2f800, 0x2fa1f],
      [0x2e80, 0x2eff],
      [0x31c0, 0x31ef],
      [0x2ff0, 0x2fff],
      [0x2f800, 0x2fa1f],
      [0x2e80, 0x2eff],
      [0x31c0, 0x31ef],
    ];

    return isUnicodeInRange(inputString, Han_Ranges);
  }

  //Korean only set the Gibberish flag if input words more than 40%
  KR_FortyPercentAlphabet(inputString) {
    inputString = inputString.replace(
      /[`~!@#$%^&*()）_|+\-=?;:'",.　<>～1234567890０１２３４５６７８９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｛｜｝～｟｠｡｢｣､￠￡￢￣￤￥￦￨￩￪￫￭￮！@#¥%？©®《》・･—·…，.、。、”“‘・、‥‼️。････：；\{\}\[\]\\\/]/gi,
      ""
    );
    inputString = inputString.replace(
      /[ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ]/gi,
      "A"
    ); //Halfwidth and Fullwidth Forms alphabet filter
    var thisClass = this;
    var koreanWords = 0;
    var nonkoreanWords = 0;
    var stringArray = inputString.split("");

    // Continuous alpabet count is 1 word only
    var alphabetList = [];
    var nonAlphabetList = [];
    var tempList = "";
    for (var theChr in stringArray) {
      if (stringArray[theChr].match(/^[a-zA-Z]+$/)) {
        tempList = tempList + stringArray[theChr];
      } else {
        if (tempList.length > 0) {
          alphabetList.push(tempList);
        }
        tempList = "";
        if (stringArray[theChr] != " ") {
          nonAlphabetList.push(stringArray[theChr]);
        }
      }
    }
    if (tempList.length > 0) {
      alphabetList.push(tempList);
    }
    nonkoreanWords = nonkoreanWords + alphabetList.length;

    //can't detect is English language or other alphabet language（Malay，Indo) only can check alphabet now
    // eg: Hello bila makan lunch?
    //can't detect is Japanese language or Chinese langauge because Japanese word include Han (汉字)
    // eg: 日本語が上手ですね！
    for (var theIndex in nonAlphabetList) {
      var isKorean = this.KR_IsKoreanUnicode(nonAlphabetList[theIndex]);
      if (isKorean) {
        koreanWords++;
      } else {
        if (this.KR_IsHanUnicode(nonAlphabetList[theIndex])) {
          koreanWords++;
        } else {
          nonkoreanWords++;
        }
      }
    }

    //Set Gibberish to True if more than 40% word is english
    nonkoreanWords = nonkoreanWords + this.GB_GibberishAnswerList.length;
    var totalInputWords = nonkoreanWords + koreanWords;
    var totalInputPercent = (nonkoreanWords / totalInputWords) * 100;

    // console.log("nonkoreanWords :: "+nonkoreanWords);
    // console.log("koreanWords :: "+koreanWords);
    // console.log("this.GB_GibberishAnswerList :: "+this.GB_GibberishAnswerList);
    // console.log("totalInputPercent :: "+totalInputPercent);

    if (totalInputPercent > 40) {
      thisClass.GB_GibberishAnswer = true;
    } else {
      if (!thisClass.GB_GibberishAnswer) {
        thisClass.GB_GibberishAnswer = false;
      }
    }
    thisClass.GB_UpdateResult_Func();
  }

  // Ignore Emoji, Symbol and Emoticons for Gibberish Check
  KR_IgnoreSymbolEmoji(inputString) {
    var removeEmoji = inputString.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );
    return removeEmoji;
  }

  // Check if the text contains any Korean characters
  KR_isKorean(str) {
    const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    return koreanRegex.test(str);
  }

  //Check special characters and numbering input
  KR_ValidationInput(inputString) {
    var theString = inputString
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？♡ㆍᆞᆢ《》０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ’—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[a-zA-Z]/gi, "")
      .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "")
      .replace(/^\s+|\s+$|\s+(?=\s)/g, "");

    // Without any Korean Character, Only Numbering input, Only letters input
    if (
      theString.length == 0 ||
      /^\d+$/.test(inputString) ||
      /^[a-zA-Z]+$/.test(inputString)
    ) {
      this.GB_GibberishAnswer = true;
    }

    // Not allow Emoji
    // if (/\p{Emoji}/u.test(theString)) {
    //   this.GB_GibberishAnswer = true;
    // }
  }

  GB_CheckGibberishData(theInput) {
    this.GB_GibberishAnswer = false;
    this.GB_GibberishAnswerList = [];

    theInput = theInput.toLowerCase().trim();
    this.idiomDictionary = idiomDictionaryKR;
    this.commonWordList = commonWordKR;

    // [KR]Check for Emoji and by-pass them
    theInput = this.KR_IgnoreSymbolEmoji(theInput);

    // [KR]Check if sentence only has symbols and/or numbers
    this.KR_ValidationInput(theInput);

    // [KR]Check it sentence has more than 11 continuous repeated numbers
    this.KR_CheckRepeatedNumbers(theInput);

    // [KR]Check it there are more than 3 continuous symbol
    this.KR_CheckRepeatedSymbol(theInput);

    // [KR]Check it > 40% Non Japanese
    this.KR_FortyPercentAlphabet(theInput);

    //this.KR_CheckRepeatedDifferentSymbol(theInput);
    this.KR_splitSentenceWord(theInput);

    this.GB_UpdateResult_Func();
  }
}

// **** Vietnamese Gibberish Check Class ***
class VN_GibberishCheck {
  VN_ModelFile;
  VN_UsingJSONFile = false;
  GB_GibberishAnswer = false;
  GB_GibberishAnswerList = [];

  GB_UpdateResult_Func() {
    $("#GibberishResult").html(
      "Gibberish answers detected -- " +
        this.GB_GibberishAnswer +
        "</br>" +
        "</br>" +
        "</br>"
    );
  }

  GB_CheckGibberishData(checkInput) {
    checkInput = checkInput.toLowerCase().trim();
    //// Check continue letter
    var splitSentence = checkInput.split(/\s+/);
    var countDigits = 0;

    for (var theWord in splitSentence) {
      var countLetter = 0;
      var preLetter = "";

      //Vietnamese word with some SpecialChars mostly is jibberish
      if (theWord == splitSentence.length - 1) {
        var lastWord = splitSentence[theWord];
        for (var index = 0; index < lastWord.length; index++) {
          if (index != lastWord.length - 1) {
            const regexSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            const doesItHaveSpecialChars = regexSpecialChars.test(
              lastWord[index]
            );

            if (doesItHaveSpecialChars) {
              this.GB_GibberishAnswer = true;
              this.GB_UpdateResult_Func();
              break;
            }
          }
        }
      } else {
        const regexSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const doesItHaveSpecialChars = regexSpecialChars.test(
          splitSentence[theWord]
        );

        if (doesItHaveSpecialChars) {
          this.GB_GibberishAnswer = true;
          this.GB_UpdateResult_Func();
          break;
        }
      }

      for (var i = 0; i < splitSentence[theWord].length; i++) {
        //Vietnamese word String with some numbers mostly is jibberish
        const regexNum = /\d/;
        const doesItHaveNumber = regexNum.test(splitSentence[theWord]);

        //Vietnamese max word could have around 6 characters only.
        if (splitSentence[theWord].length > 6 || doesItHaveNumber) {
          this.GB_GibberishAnswer = true;
          this.GB_UpdateResult_Func();
          break;
        }

        //Letter repeated continuously for more than 3 times detect as jibberish
        if (preLetter != splitSentence[theWord].charAt(i)) {
          preLetter = splitSentence[theWord].charAt(i);
          countLetter = 1;
        } else {
          if (isNaN(splitSentence[theWord].charAt(i))) {
            countLetter++;
            if (countLetter >= 3) {
              this.GB_GibberishAnswer = true;
              this.GB_UpdateResult_Func();
              break;
            }
          } else {
            preLetter = "";
            countLetter = 0;
          }
        }

        // Number repeated continuously for more than 4 times detect as jibberish
        if (isNaN(splitSentence[theWord].charAt(i))) {
          countDigits = 0;
        } else {
          countDigits++;
          if (countDigits >= 5) {
            this.GB_GibberishAnswer = true;
            this.GB_UpdateResult_Func();
            break;
          }
        }
      }
    }

    if (!this.GB_GibberishAnswer) {
      this.VN_GibberishDetect(checkInput);
    }
  }

  VN_GB_CheckAlpahbet(theInput) {
    theInput = theInput.replace(" ", "x");

    var notValidAlphabet = false;

    var alphabetFullList =
      "AaĂăÂâBbCcDdĐđEeÊêGgHhIiKkLlMmNnOoÔôƠơPpQqRrSsTtUuƯưVvXxYyỚỆáãộắếớứờùóểềọệàửỉầũởợủạúữậừấẫốíịồảổẩựẹặýìỗằụõễòéỏẽĩẪẬỡẳèỎÒẠẻẤỹỘỞẾÓÁÝÀỄỀỜỊẦỒỨỦĨỷẵỳỮỪÍỂỐẢεûỵöỔỤỬẨŨÚÃÉỰ​ỌẶÙÌẮỢẸ₫ẰÈỲẲẺỈỶẴẼÕỖỠỸỴ";

    for (var i = 0; i < theInput.length; i++) {
      try {
        let position = alphabetList.search(theInput.charAt(i));
        if (position < 0) {
          notValidAlphabet = true;
        }
      } catch (error) {
        //error
      }
    }

    if (notValidAlphabet) {
      this.GB_GibberishAnswer = true;
      this.GB_UpdateResult_Func();
    } else {
      this.GB_GibberishAnswer = false;
      this.GB_UpdateResult_Func();
    }
  }

  // Check if the text contains Vietnamese characters
  VN_isVietnamese(str) {
    const vietnameseRegex = /[\u00C0-\u1EF9\u1EFA-\u20AB]+/;
    return vietnameseRegex.test(str);
  }

  //Vietnamese only set the Gibberish flag if input words more than 40%
  VN_FortyPercentAlphabet(inputString) {
    var thisClass = this;
    var vietnameseWords = 0;
    var englishWords = 0;
    var stringArray = inputString.split(/(\s+)/);
    var splitWordArray = [];

    for (var theIndex in stringArray) {
      if (stringArray[theIndex] != " ") {
        if (thisClass.VN_isVietnamese(stringArray[theIndex])) {
          //Include ML to improve checking rate is input word is Vietnamese or English
          let gibberish = GibberishDetect({ model: this.VN_ModelFile });
          if (gibberish.detect(stringArray[theIndex])) {
            //Vietnamese Words -
            vietnameseWords++;
          } else {
            //English Words -
            englishWords++;
          }
        } else {
          //English Words -
          englishWords++;
        }
        splitWordArray.push(stringArray[theIndex]);
        /*
        if( stringArray[theIndex].match(/^[a-zA-Z0-9]+$/) )
        {
          //English Words - 
          //can't cover multiple language only can check alphabet now
          englishWords++;
          splitWordArray.push(stringArray[theIndex]);
        }
        else
        {
          //Vietnamese Words - 
          //can't cover multiple language only can check logographic now
          var vietnameseLogographic = [...stringArray[theIndex]];
          for (var theWord in vietnameseLogographic) 
          {
            vietnameseWords++;
            splitWordArray.push(vietnameseLogographic[theWord]);
          }
        }
*/
      }
    }

    //Set Gibberish to True if more than 40% word is english
    var totalInputWords = englishWords + vietnameseWords;
    var totalInputPercent = (englishWords / totalInputWords) * 100;

    if (totalInputPercent > 40) {
      thisClass.GB_GibberishAnswer = true;
    } else {
      if (!thisClass.GB_GibberishAnswer) {
        thisClass.GB_GibberishAnswer = false;
      }
    }
    thisClass.GB_UpdateResult_Func();
  }

  VN_GibberishDetect(theInput) {
    let gibberish = GibberishDetect({ model: this.VN_ModelFile });

    if (gibberish.detect(theInput)) {
      // if (theInput.length < 9) {
      //     this.VN_GB_CheckAlpahbet(theInput);
      // } else {
      //   this.GB_GibberishAnswer = true;
      // }
      this.GB_GibberishAnswer = true;
    }

    this.GB_UpdateResult_Func();
    this.VN_FortyPercentAlphabet(theInput);
  }
}

// **** Thai Gibberish Check Class ***
class TH_GibberishCheck {
  TH_ModelFile;
  GB_GibberishAnswer = false;
  TH_UsingJSONFile = false;

  GB_CheckGibberishData(theInput) {
    theInput = theInput.toLowerCase().trim();
    this.GB_GibberishAnswer = false;

    /* //ML Gibberish check   
    var validWord = this.TH_RepeatWordPatternCheck(theInput);
    if (!validWord) {
      let gibberish = GibberishDetect({ model: this.TH_ModelFile });

      if (gibberish.detect(theInput)) {
        this.GB_GibberishAnswer = true;
      }
    }
    */

    // First input character in Thai cannot be a symbol, except for numbers
    var isSymbolOnly = theInput.charAt(0);
    const regex =
      /[`~!@#$%^&*()）_|+\-=?;:'",.<>～！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi;
    const foundSymbol = isSymbolOnly.match(regex);
    if (foundSymbol != null) {
      this.GB_GibberishAnswer = true;
    }

    var IgnoreSymbolEmoji = this.TH_IgnoreSymbolEmoji(theInput);

    this.TH_CheckRepeatedSymbol(IgnoreSymbolEmoji);
    this.TH_CheckContinueLetter(IgnoreSymbolEmoji);
    this.TH_RepeatWordPatternCheck(IgnoreSymbolEmoji);

    // if(!this.GB_GibberishAnswer)
    // {
    //   var splitWord = theInput.split(/\s+/);
    //   console.log(splitWord)
    //   if(this.TH_IsThai(splitWord) == false)
    //   {
    //     this.GB_GibberishAnswer = true;
    //   }
    // }

    this.TH_FortyPercentAlphabet(IgnoreSymbolEmoji);
    this.GB_UpdateResult_Func();
  }

  // Ignore Emoji, Symbol and Emoticons for Gibberish Check
  TH_IgnoreSymbolEmoji(inputString) {
    var removeEmoji = inputString.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );
    return removeEmoji;
  }

  //Check repeated symbol issue.
  TH_CheckRepeatedSymbol(inputString) {
    const regex = /([^])\1+/g;
    let checkSymbol;

    while ((checkSymbol = regex.exec(inputString)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (checkSymbol.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `checkSymbol`-variable.
      checkSymbol.forEach((match, groupIndex) => {
        if (match.length > 1) {
          const regex =
            /[`~!@#$%^&*()）_|+\-=?;:'",.<>～！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi;
          const foundSymbol = match.match(regex);
          if (foundSymbol != null) {
            //Check if 4 and more consecutive special only flag to gibberish
            if (match.length >= 4) {
              this.GB_GibberishAnswer = true;
            }
            //Ellipsis points can be ignored
            if (
              (match[0] == "." && match.length < 4) ||
              (match[0] == "。" && match.length < 4)
            ) {
              this.GB_GibberishAnswer = false;
            }
          }
        }
      });
    }
  }

  // Check continue letter
  TH_CheckContinueLetter(theInput) {
    theInput = theInput.replace(
      /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》,—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
      ""
    );

    var splitSentence = theInput.split(/\s+/);
    var countDigits = 0;

    for (var theWord in splitSentence) {
      var countLetter = 0;
      var preLetter = "";

      for (var i = 0; i < splitSentence[theWord].length; i++) {
        //Letter repeated continuously for more than 3 times detect as jibberish
        // [remove] thai sentence can repeat the words more than 4 times without any break
        // eg: ต้องการใช้เวลาว่างในการหารายได้เสริมผ่านสื่อออนไลน์ไลน์
        /*
        if (preLetter != splitSentence[theWord].charAt(i)) {
          preLetter = splitSentence[theWord].charAt(i);
          countLetter = 1;
        } else {
          if (isNaN(splitSentence[theWord].charAt(i))) {
            countLetter++;
            if (countLetter >= 3) {
              this.GB_GibberishAnswer = true;
              console.log("hittt")
              console.log(splitSentence[theWord].charAt(i))
              this.GB_UpdateResult_Func();
              break;
            }
          } else {
            preLetter = "";
            countLetter = 0;
          }
        }
        */

        // Number repeated continuously for more than 10 times detect as jibberish
        // Thai Phone number include 10 digit. eg: "0812345678"
        if (isNaN(splitSentence[theWord].charAt(i))) {
          countDigits = 0;
        } else {
          countDigits++;
          if (countDigits >= 11) {
            this.GB_GibberishAnswer = true;
            this.GB_UpdateResult_Func();
            break;
          }
        }
      }

      if (this.GB_GibberishAnswer) {
        break;
      }
    }
  }

  TH_IsThai(inputString) {
    const thaiRegex = /[\u0E00-\u0E7F]/;
    // Check if the text contains any Thai characters
    return thaiRegex.test(inputString);
  }

  //Thai only set the Gibberish flag if input words more than 40%
  TH_FortyPercentAlphabet(inputString) {
    var thisClass = this;
    var thaiWords = 0;
    var englishWords = 0;
    var stringArray = inputString.split(/(\s+)/);
    var splitWordArray = [];

    for (var theIndex in stringArray) {
      if (stringArray[theIndex] != " ") {
        if (stringArray[theIndex].match(/^[a-zA-Z0-9]+$/)) {
          //English Words -
          //can't cover multiple language only can check alphabet now
          englishWords++;
          splitWordArray.push(stringArray[theIndex]);
        } else {
          //Thai Words -
          //can't cover multiple language only can check logographic now
          var thaiLogographic = [...stringArray[theIndex]];
          for (var theWord in thaiLogographic) {
            var removeSymbol = thaiLogographic[theWord].replace(
              /[`~!@#$%^&*()）_|+\-=?;:'",.　<>～！@#¥%？©®《》・･—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
              ""
            );
            // exclude symbol when check TH_IsThai
            if (removeSymbol.length > 0) {
              if (this.TH_IsThai(thaiLogographic[theWord]) == true) {
                thaiWords++;
                splitWordArray.push(thaiLogographic[theWord]);
              } else {
                englishWords++;
                splitWordArray.push(stringArray[theIndex]);
              }
            }
          }
        }
      }
    }

    //Set Gibberish to True if more than 40% word is english
    var totalInputWords = englishWords + thaiWords;
    var totalInputPercent = (englishWords / totalInputWords) * 100;

    if (totalInputPercent > 40) {
      thisClass.GB_GibberishAnswer = true;
    } else {
      if (!thisClass.GB_GibberishAnswer) {
        thisClass.GB_GibberishAnswer = false;
      }
    }
    thisClass.GB_UpdateResult_Func();
  }

  TH_RepeatWordPatternCheck(theInput) {
    var splitSentence = theInput.split(/\s+/);

    if (splitSentence[0] == splitSentence[1]) {
      this.GB_GibberishAnswer = true;
    }

    if (
      splitSentence[splitSentence.length - 1] ==
      splitSentence[splitSentence.length - 2]
    ) {
      this.GB_GibberishAnswer = true;
    }

    if (splitSentence.length == 1) {
      if (
        splitSentence[0].substring(0, 2) == splitSentence[0].substring(2, 4)
      ) {
        this.GB_GibberishAnswer = true;
      }

      var totalStr = splitSentence[0].length;
      if (
        splitSentence[0].substring(totalStr - 2, totalStr) ==
        splitSentence[0].substring(totalStr - 4, totalStr - 2)
      ) {
        this.GB_GibberishAnswer = true;
      }
    }
  }

  TH_RepeatWordPatternCheck_older(theInput) {
    const specialChars = `\`@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/~`;
    const result = specialChars.split("").some((specialChar) => {
      if (theInput.includes(specialChar)) {
        this.GB_GibberishAnswer = true;
      }
    });

    const myArray = theInput.split(" ");
    if (myArray.length > 1) {
      if (myArray[0] == myArray[1]) {
        this.GB_GibberishAnswer = true;
      }

      if (myArray[myArray.length - 1] == myArray[myArray.length - 2]) {
        this.GB_GibberishAnswer = true;
      }
    }

    var theString = theInput
      .replace(/[`!?'",.1234567890”“‘\{\}\[\]\\\/]/gi, "")
      .replace(/[\d\.]+$/, "");

    let inputString = theString;
    let words = [...inputString]; //split thesentince

    var countSame = 0;
    var maxContinueCha = 2;
    var totalStr = inputString.length;

    //Repeat word pattern - ABCABC
    if (inputString.substring(0, 3) == inputString.substring(3, 6)) {
      this.GB_GibberishAnswer = true;
    }
    //Repeat word pattern - xxxXYZXYZ
    if (
      inputString.substring(totalStr - 2, totalStr) ==
      inputString.substring(totalStr - 4, totalStr - 2)
    ) {
      this.GB_GibberishAnswer = true;
    }

    if (!this.GB_GibberishAnswer) {
      for (var theIndex in words) {
        if (theIndex > 0) {
          if (words[theIndex - 1] == words[theIndex]) {
            countSame++;
          } else {
            if (countSame != maxContinueCha) {
              countSame = 0;
            }
          }

          if (countSame == maxContinueCha) {
            this.GB_GibberishAnswer = true;
          }
        }
      }
    }
    return this.GB_GibberishAnswer;
  }

  GB_UpdateResult_Func() {
    $("#GibberishResult").html(
      "Gibberish answers detected -- " +
        this.GB_GibberishAnswer +
        "</br>" +
        "</br>" +
        "</br>"
    );
  }
}

// **** Indonesian Gibberish Check Class ***
class ID_GibberishCheck {
  ID_ModelFile;
  ID_UsingJSONFile = false;
  GB_GibberishAnswer = false;
  GB_GibberishAnswerList = [];

  // Check continue letter
  ID_CheckContinueLetter(theInput) {
    var splitSentence = theInput.split(/\s+/);
    var countDigits = 0;

    for (var theWord in splitSentence) {
      var countLetter = 0;
      var preLetter = "";

      for (var i = 0; i < splitSentence[theWord].length; i++) {
        //Letter repeated continuously for more than 3 times detect as jibberish
        if (preLetter != splitSentence[theWord].charAt(i)) {
          preLetter = splitSentence[theWord].charAt(i);
          countLetter = 1;
        } else {
          if (isNaN(splitSentence[theWord].charAt(i))) {
            countLetter++;
            if (countLetter >= 3) {
              this.GB_GibberishAnswer = true;
              this.GB_UpdateResult_Func();
              break;
            }
          } else {
            preLetter = "";
            countLetter = 0;
          }
        }

        // Number repeated continuously for more than 4 times detect as jibberish
        if (isNaN(splitSentence[theWord].charAt(i))) {
          countDigits = 0;
        } else {
          countDigits++;
          if (countDigits >= 5) {
            this.GB_GibberishAnswer = true;
            this.GB_UpdateResult_Func();
            break;
          }
        }
      }

      if (this.GB_GibberishAnswer) {
        break;
      }
    }

    if (!this.GB_GibberishAnswer) {
      this.ID_ValidationInput(theInput);
    }
  }

  //Check special characters and numbering input
  ID_ValidationInput(theInput) {
    var theString = theInput
      .replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？《》,—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      )
      .replace(/[a-zA-Z]/gi, "");
  }

  //DG asian v1 Indo only set the Gibberish flag if input words more than 40%
  ID_FortyPercentAlphabet(theWordsArray) {
    var thisClass = this;
    var totalInputPercent =
      (thisClass.GB_GibberishAnswerList.length / theWordsArray.length) * 100;

    //Only set to false if more than 40% word is Gibberish
    if (thisClass.GB_GibberishAnswer) {
      if (totalInputPercent > 40) {
        thisClass.GB_GibberishAnswer = true;
      } else {
        thisClass.GB_GibberishAnswer = false;
      }
    }

    //Flag Gibberish Answer if only Symbol
    // if(thisClass.GB_GibberishAnswerList.length == 1)
    // {
    //    var isSymbolOnly = thisClass.GB_GibberishAnswerList[0];
    //    const regex = /[`1234567890~!@#$%^&*()）_|+\-=?;:'",.<>～！@#¥%？《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi;
    //    const foundSymbol = isSymbolOnly.match(regex);
    //    if(foundSymbol != null)
    //    {
    //     thisClass.GB_GibberishAnswer = true;
    //    }
    // }

    thisClass.GB_UpdateResult_Func();
  }

  //Check repeated symbol issue.
  ID_CheckRepeatedSymbol(inputString) {
    const pattern = /([^])\1+/g;
    const matches = inputString.match(pattern);
    var repeatedSymbolCount = 0;

    for (const theIndex in matches) {
      //Ellipsis points can be ignored
      if (matches[theIndex][0] == "." && matches[theIndex].length < 4) {
        if (repeatedSymbolCount != 0) {
          repeatedSymbolCount--;
        }
      } else {
        if (matches[theIndex].length > 3) {
          repeatedSymbolCount++;
          this.GB_GibberishAnswerList.push(matches[theIndex]);
        }
      }
    }

    if (repeatedSymbolCount > 0) {
      this.GB_GibberishAnswer = true;
    }
  }

  //Check if input only number
  ID_CheckOnlyNumber(inputString) {
    var removeDigits = inputString.replace(/[0-9]/g, "");
    if (removeDigits.length == 0) {
      this.GB_GibberishAnswer = true;
    }
  }

  //Check special cases ( word with symbol) only more than 4 consecutive special characters will flag is Gibberish
  /*
      tem!!!pat = true
      !!!tempat = false
      tempat!!! = false
      tempat!!!! = true
      tempat... = false
      tempat.... = true
    */
  ID_CheckWordWithSymbol(inputString) {
    inputString = inputString.replace(/[.,]/gi, " ");
    var symbolWithWord = inputString.split(/(\s+)/);

    for (var i = 0; i < symbolWithWord.length; i++) {
      //remove all white space and empty array
      symbolWithWord[i] = symbolWithWord[i].replace(/\s/g, "");

      if (symbolWithWord[i].length > 0) {
        // Check if 4 consecutive special characters at the beginning or end flag to gibberish
        const consecutivePattern = /^[\W_]{4}|[\W_]{4}$/;
        if (consecutivePattern.test(symbolWithWord[i])) {
          // Avoid aibberish answer add to list twice
          var exitOnList = false;
          for (var theList in this.GB_GibberishAnswerList) {
            if (
              this.GB_GibberishAnswerList[theList].toLowerCase() ==
              symbolWithWord[i].toLowerCase()
            ) {
              exitOnList = true;
            }
          }
          if (!exitOnList) {
            this.GB_GibberishAnswer = true;
            this.GB_GibberishAnswerList.push(symbolWithWord[i].toLowerCase());
          }
        }

        const dashPattern = /\-/; // matches the sequence "-"
        if (dashPattern.test(symbolWithWord[i])) {
          symbolWithWord[i] = symbolWithWord[i].replace("-", ""); //handle malay en dash "bermain-main"
        }

        const dotPattern = /\.\.\./; // matches the sequence "..."
        if (dotPattern.test(symbolWithWord[i])) {
          symbolWithWord[i] = symbolWithWord[i].replace("...", ""); //handle Ellipsis points "lebih..."
        }

        // Check is any non-alphanumeric character between alphanumeric characters end flag to gibberish
        const onBetweenPattern = /^[a-zA-Z0-9]+[\W_]+[a-zA-Z0-9]+$/;
        if (onBetweenPattern.test(symbolWithWord[i])) {
          // Avoid aibberish answer add to list twice
          var exitOnList = false;
          for (var theList in this.GB_GibberishAnswerList) {
            if (
              this.GB_GibberishAnswerList[theList].toLowerCase() ==
              symbolWithWord[i].toLowerCase()
            ) {
              exitOnList = true;
            }
          }
          if (!exitOnList) {
            this.GB_GibberishAnswer = true;
            this.GB_GibberishAnswerList.push(symbolWithWord[i].toLowerCase());
          }
        }
      }
    }
  }

  GB_CheckGibberishData(theInput) {
    theInput = theInput.toLowerCase().trim();
    var thisClass = this;
    let accepted_chars = "abcdefghijklmnopqrstuvwxyz ";
    let k = accepted_chars.length;
    let pos = {};

    for (let i = 0; i < k; i++) {
      pos[accepted_chars[i]] = i;
    }

    function normalize(line) {
      var arr = line.toLowerCase().split("");
      return arr.filter(function (item) {
        return accepted_chars.indexOf(item) > -1;
      });
    }

    function averageTransitionProbability(line, log_prob_matrix) {
      let log_prob = 1.0;
      let transition_ct = 0;
      var filtered_line = normalize(line);
      var a = false;

      for (var b in filtered_line) {
        if (a !== false) {
          log_prob += log_prob_matrix[pos[a]][pos[filtered_line[b]]];
          transition_ct += 1;
        }
        a = filtered_line[b];
      }

      return Math.exp(log_prob / (transition_ct || 1));
    }

    let model_data = {};

    if (this.ID_UsingJSONFile) {
      model_data = this.ID_ModelFile;
    } else {
      model_data = JSON.parse(this.ID_ModelFile);
    }

    function gib_dect(line) {
      return (
        averageTransitionProbability(line, model_data.matrix) >
        model_data.threshold
      );
    }

    function GB_AnalyzeGibberish_Func(theInput) {
      var userInputText = theInput.toLowerCase().trim();
      var splitWord = userInputText.split(/\s+/);

      // Reset before Analyze Gibberish checking
      thisClass.GB_GibberishAnswerList = [];
      thisClass.GB_GibberishAnswer = false;

      // for (var i = 0; i < splitWord.length; i++) {
      //   if (gib_dect(splitWord[i])) {
      //   } else {
      //     thisClass.GB_GibberishAnswer = true;
      //     thisClass.GB_GibberishAnswerList.push(splitWord[i]);
      //   }
      // }

      var removeDot = userInputText.replace(".", " ");
      var splitOnlyWord = removeDot.split(/[^\w]/);

      var workCheck = 0;
      for (var i = 0; i < splitOnlyWord.length; i++) {
        var ignoreCase = false;

        //Handle dot pattern on between "Mencari penghasilan lebih...Dan mencari"
        const onBetweenPattern = /^[a-zA-Z0-9]+[\W_]+[a-zA-Z0-9]+$/;
        if (onBetweenPattern.test(splitOnlyWord[i])) {
          const dashPattern = /\-/; // matches the sequence "-"
          if (dashPattern.test(splitOnlyWord[i])) {
            ignoreCase = true;
          }

          const dotPattern = /\.\.\./; // matches the sequence "..."
          if (dotPattern.test(splitOnlyWord[i])) {
            ignoreCase = true;
          }
        }

        if (!ignoreCase) {
          var theWord = splitOnlyWord[i].replace(
            /[`~!@#$%^&*()）_|+\=?;:'",.<>～！@#¥%？.《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
            ""
          );
        } else {
          var theWord = splitOnlyWord[i];
        }

        // if string contains only digits ignore it
        if (/^\d+$/.test(theWord)) {
          theWord = "";
        }

        if (
          theWord != "" &&
          theWord != " " &&
          theWord != null &&
          theWord.length > 0
        ) {
          workCheck++;
          if (!ID_Dictionary.includes(theWord.toLowerCase())) {
            thisClass.GB_GibberishAnswer = true;
            thisClass.GB_GibberishAnswerList.push(theWord.toLowerCase());
          }
        }
      }

      // Not valid malay word
      if (workCheck == 0) {
        thisClass.GB_GibberishAnswer = true;
      }

      thisClass.ID_CheckWordWithSymbol(userInputText);
      thisClass.ID_CheckRepeatedSymbol(userInputText); //[needed]

      // First input character in Malay cannot be a symbol, except for numbers
      if (/^[a-zA-Z()]+$/.test(splitWord[0]) == false) {
        thisClass.GB_GibberishAnswer = true;
      }

      userInputText = userInputText.replace(
        /[`~!@#$%^&*()）_|+\-=?;:'",.<>～1234567890！@#¥%？.《》—·…，.、。”“‘：；\{\}\[\]\\\/]/gi,
        ""
      );

      thisClass.ID_CheckContinueLetter(userInputText);
      thisClass.ID_FortyPercentAlphabet(splitWord);
      thisClass.ID_CheckOnlyNumber(userInputText);
      thisClass.GB_UpdateResult_Func();
    }

    GB_AnalyzeGibberish_Func(theInput);
  }

  GB_UpdateResult_Func() {
    $("#GibberishResult").html(
      "Gibberish answers detected -- " +
        this.GB_GibberishAnswer +
        "</br>" +
        "List of possible gibberish answers -- " +
        this.GB_GibberishAnswerList +
        "</br>" +
        "</br>"
    );
  }
}

// !!!!!!!!!!!! [development Test  Start] !!!!!!!!!!!!

// ch = Chinese 中文
// my = Malay
// jp = Japanese 日本語の
// kr = Korean 한국인
// vn = Vietnamese
// th = Thai
// id = Indonesian
// Change language by url parameter value eg: ?lan=my
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const languageTest = urlParams.get("lan");
//console.log(languageTest);

// Load the required scripts based on the language code
LanguageConfiguration(languageTest); //[change the value for test other language]

//Create gibberish checking Button
$(document).ready(function () {
  $("#demo").append(
    "<input id='BTN_gibberish' type='button' value='Check gibberish'></input><br/><br/>"
  );

  //[Button Event] gibberish checking event listener
  $("#BTN_gibberish").click(function () {
    if (ScriptReady) {
      GibberishClass.GB_GibberishAnswer = false;
      GibberishClass.GB_UpdateResult_Func();

      if (LanCode == "my" || LanCode == "id" || LanCode == "jp") {
        GibberishClass.GB_GibberishAnswerList = [];
      }

      if ($("#_Q1").val().length > 0) {
        GibberishClass.GB_CheckGibberishData($("#_Q1").val());
      }
    }
  });
});
// [For development test - end]
