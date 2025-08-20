(window.webpackJsonp = window.webpackJsonp || []).push([
  [6],
  {
    "3AcF": function (e, t) {
      !(function (t, n, r) {
        "use strict";
        "function" == typeof window.define && window.define.amd
          ? window.define(r)
          : void 0 !== e && e.exports
          ? (e.exports = r())
          : n.exports
          ? (n.exports = r())
          : (n.Fingerprint2 = r());
      })(0, this, function () {
        "use strict";
        var e = function (t) {
          if (!(this instanceof e)) return new e(t);
          (this.options = this.extend(t, {
            swfContainerId: "fingerprintjs2",
            swfPath: "flash/compiled/FontList.swf",
            detectScreenOrientation: !0,
            sortPluginsFor: [/palemoon/i],
            userDefinedFonts: [],
            excludeDoNotTrack: !0,
            excludePixelRatio: !0,
          })),
            (this.nativeForEach = Array.prototype.forEach),
            (this.nativeMap = Array.prototype.map);
        };
        return (
          (e.prototype = {
            extend: function (e, t) {
              if (null == e) return t;
              for (var n in e) null != e[n] && t[n] !== e[n] && (t[n] = e[n]);
              return t;
            },
            get: function (e) {
              var t = this,
                n = {
                  data: [],
                  addPreprocessedComponent: function (e) {
                    var r = e.value;
                    "function" == typeof t.options.preprocessor &&
                      (r = t.options.preprocessor(e.key, r)),
                      n.data.push({ key: e.key, value: r });
                  },
                };
              (n = this.userAgentKey(n)),
                (n = this.languageKey(n)),
                (n = this.colorDepthKey(n)),
                (n = this.deviceMemoryKey(n)),
                (n = this.pixelRatioKey(n)),
                (n = this.hardwareConcurrencyKey(n)),
                (n = this.screenResolutionKey(n)),
                (n = this.availableScreenResolutionKey(n)),
                (n = this.timezoneOffsetKey(n)),
                (n = this.sessionStorageKey(n)),
                (n = this.localStorageKey(n)),
                (n = this.indexedDbKey(n)),
                (n = this.addBehaviorKey(n)),
                (n = this.openDatabaseKey(n)),
                (n = this.cpuClassKey(n)),
                (n = this.platformKey(n)),
                (n = this.doNotTrackKey(n)),
                (n = this.pluginsKey(n)),
                (n = this.canvasKey(n)),
                (n = this.webglKey(n)),
                (n = this.webglVendorAndRendererKey(n)),
                (n = this.adBlockKey(n)),
                (n = this.hasLiedLanguagesKey(n)),
                (n = this.hasLiedResolutionKey(n)),
                (n = this.hasLiedOsKey(n)),
                (n = this.hasLiedBrowserKey(n)),
                (n = this.touchSupportKey(n)),
                (n = this.customEntropyFunction(n)),
                this.fontsKey(n, function (n) {
                  var r = [];
                  t.each(n.data, function (e) {
                    var t = e.value;
                    t && "function" == typeof t.join && (t = t.join(";")),
                      r.push(t);
                  });
                  var i = t.x64hash128(r.join("~~~"), 31);
                  return e(i, n.data);
                });
            },
            customEntropyFunction: function (e) {
              return (
                "function" == typeof this.options.customFunction &&
                  e.addPreprocessedComponent({
                    key: "custom",
                    value: this.options.customFunction(),
                  }),
                e
              );
            },
            userAgentKey: function (e) {
              return (
                this.options.excludeUserAgent ||
                  e.addPreprocessedComponent({
                    key: "user_agent",
                    value: this.getUserAgent(),
                  }),
                e
              );
            },
            getUserAgent: function () {
              return navigator.userAgent;
            },
            languageKey: function (e) {
              return (
                this.options.excludeLanguage ||
                  e.addPreprocessedComponent({
                    key: "language",
                    value:
                      navigator.language ||
                      navigator.userLanguage ||
                      navigator.browserLanguage ||
                      navigator.systemLanguage ||
                      "",
                  }),
                e
              );
            },
            colorDepthKey: function (e) {
              return (
                this.options.excludeColorDepth ||
                  e.addPreprocessedComponent({
                    key: "color_depth",
                    value: window.screen.colorDepth || -1,
                  }),
                e
              );
            },
            deviceMemoryKey: function (e) {
              return (
                this.options.excludeDeviceMemory ||
                  e.addPreprocessedComponent({
                    key: "device_memory",
                    value: this.getDeviceMemory(),
                  }),
                e
              );
            },
            getDeviceMemory: function () {
              return navigator.deviceMemory || -1;
            },
            pixelRatioKey: function (e) {
              return (
                this.options.excludePixelRatio ||
                  e.addPreprocessedComponent({
                    key: "pixel_ratio",
                    value: this.getPixelRatio(),
                  }),
                e
              );
            },
            getPixelRatio: function () {
              return window.devicePixelRatio || "";
            },
            screenResolutionKey: function (e) {
              return this.options.excludeScreenResolution
                ? e
                : this.getScreenResolution(e);
            },
            getScreenResolution: function (e) {
              var t;
              return (
                (t =
                  this.options.detectScreenOrientation &&
                  window.screen.height > window.screen.width
                    ? [window.screen.height, window.screen.width]
                    : [window.screen.width, window.screen.height]),
                e.addPreprocessedComponent({ key: "resolution", value: t }),
                e
              );
            },
            availableScreenResolutionKey: function (e) {
              return this.options.excludeAvailableScreenResolution
                ? e
                : this.getAvailableScreenResolution(e);
            },
            getAvailableScreenResolution: function (e) {
              var t;
              return (
                window.screen.availWidth &&
                  window.screen.availHeight &&
                  (t = this.options.detectScreenOrientation
                    ? window.screen.availHeight > window.screen.availWidth
                      ? [window.screen.availHeight, window.screen.availWidth]
                      : [window.screen.availWidth, window.screen.availHeight]
                    : [window.screen.availHeight, window.screen.availWidth]),
                void 0 !== t &&
                  e.addPreprocessedComponent({
                    key: "available_resolution",
                    value: t,
                  }),
                e
              );
            },
            timezoneOffsetKey: function (e) {
              return (
                this.options.excludeTimezoneOffset ||
                  e.addPreprocessedComponent({
                    key: "timezone_offset",
                    value: new Date().getTimezoneOffset(),
                  }),
                e
              );
            },
            sessionStorageKey: function (e) {
              return (
                !this.options.excludeSessionStorage &&
                  this.hasSessionStorage() &&
                  e.addPreprocessedComponent({
                    key: "session_storage",
                    value: 1,
                  }),
                e
              );
            },
            localStorageKey: function (e) {
              return (
                !this.options.excludeSessionStorage &&
                  this.hasLocalStorage() &&
                  e.addPreprocessedComponent({
                    key: "local_storage",
                    value: 1,
                  }),
                e
              );
            },
            indexedDbKey: function (e) {
              return (
                !this.options.excludeIndexedDB &&
                  this.hasIndexedDB() &&
                  e.addPreprocessedComponent({ key: "indexed_db", value: 1 }),
                e
              );
            },
            addBehaviorKey: function (e) {
              return (
                !this.options.excludeAddBehavior &&
                  document.body &&
                  document.body.addBehavior &&
                  e.addPreprocessedComponent({ key: "add_behavior", value: 1 }),
                e
              );
            },
            openDatabaseKey: function (e) {
              return (
                !this.options.excludeOpenDatabase &&
                  window.openDatabase &&
                  e.addPreprocessedComponent({
                    key: "open_database",
                    value: 1,
                  }),
                e
              );
            },
            cpuClassKey: function (e) {
              return (
                this.options.excludeCpuClass ||
                  e.addPreprocessedComponent({
                    key: "cpu_class",
                    value: this.getNavigatorCpuClass(),
                  }),
                e
              );
            },
            platformKey: function (e) {
              return (
                this.options.excludePlatform ||
                  e.addPreprocessedComponent({
                    key: "navigator_platform",
                    value: this.getNavigatorPlatform(),
                  }),
                e
              );
            },
            doNotTrackKey: function (e) {
              return (
                this.options.excludeDoNotTrack ||
                  e.addPreprocessedComponent({
                    key: "do_not_track",
                    value: this.getDoNotTrack(),
                  }),
                e
              );
            },
            canvasKey: function (e) {
              return (
                !this.options.excludeCanvas &&
                  this.isCanvasSupported() &&
                  e.addPreprocessedComponent({
                    key: "canvas",
                    value: this.getCanvasFp(),
                  }),
                e
              );
            },
            webglKey: function (e) {
              return (
                !this.options.excludeWebGL &&
                  this.isWebGlSupported() &&
                  e.addPreprocessedComponent({
                    key: "webgl",
                    value: this.getWebglFp(),
                  }),
                e
              );
            },
            webglVendorAndRendererKey: function (e) {
              return (
                !this.options.excludeWebGLVendorAndRenderer &&
                  this.isWebGlSupported() &&
                  e.addPreprocessedComponent({
                    key: "webgl_vendor",
                    value: this.getWebglVendorAndRenderer(),
                  }),
                e
              );
            },
            adBlockKey: function (e) {
              return (
                this.options.excludeAdBlock ||
                  e.addPreprocessedComponent({
                    key: "adblock",
                    value: this.getAdBlock(),
                  }),
                e
              );
            },
            hasLiedLanguagesKey: function (e) {
              return (
                this.options.excludeHasLiedLanguages ||
                  e.addPreprocessedComponent({
                    key: "has_lied_languages",
                    value: this.getHasLiedLanguages(),
                  }),
                e
              );
            },
            hasLiedResolutionKey: function (e) {
              return (
                this.options.excludeHasLiedResolution ||
                  e.addPreprocessedComponent({
                    key: "has_lied_resolution",
                    value: this.getHasLiedResolution(),
                  }),
                e
              );
            },
            hasLiedOsKey: function (e) {
              return (
                this.options.excludeHasLiedOs ||
                  e.addPreprocessedComponent({
                    key: "has_lied_os",
                    value: this.getHasLiedOs(),
                  }),
                e
              );
            },
            hasLiedBrowserKey: function (e) {
              return (
                this.options.excludeHasLiedBrowser ||
                  e.addPreprocessedComponent({
                    key: "has_lied_browser",
                    value: this.getHasLiedBrowser(),
                  }),
                e
              );
            },
            fontsKey: function (e, t) {
              return this.options.excludeJsFonts
                ? this.flashFontsKey(e, t)
                : this.jsFontsKey(e, t);
            },
            flashFontsKey: function (e, t) {
              return this.options.excludeFlashFonts
                ? t(e)
                : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled()
                ? void 0 === this.options.swfPath
                  ? t(e)
                  : void this.loadSwfAndDetectFonts(function (n) {
                      e.addPreprocessedComponent({
                        key: "swf_fonts",
                        value: n.join(";"),
                      }),
                        t(e);
                    })
                : t(e);
            },
            jsFontsKey: function (e, t) {
              var n = this;
              return setTimeout(function () {
                var r = ["monospace", "sans-serif", "serif"],
                  i = [
                    "Andale Mono",
                    "Arial",
                    "Arial Black",
                    "Arial Hebrew",
                    "Arial MT",
                    "Arial Narrow",
                    "Arial Rounded MT Bold",
                    "Arial Unicode MS",
                    "Bitstream Vera Sans Mono",
                    "Book Antiqua",
                    "Bookman Old Style",
                    "Calibri",
                    "Cambria",
                    "Cambria Math",
                    "Century",
                    "Century Gothic",
                    "Century Schoolbook",
                    "Comic Sans",
                    "Comic Sans MS",
                    "Consolas",
                    "Courier",
                    "Courier New",
                    "Geneva",
                    "Georgia",
                    "Helvetica",
                    "Helvetica Neue",
                    "Impact",
                    "Lucida Bright",
                    "Lucida Calligraphy",
                    "Lucida Console",
                    "Lucida Fax",
                    "LUCIDA GRANDE",
                    "Lucida Handwriting",
                    "Lucida Sans",
                    "Lucida Sans Typewriter",
                    "Lucida Sans Unicode",
                    "Microsoft Sans Serif",
                    "Monaco",
                    "Monotype Corsiva",
                    "MS Gothic",
                    "MS Outlook",
                    "MS PGothic",
                    "MS Reference Sans Serif",
                    "MS Sans Serif",
                    "MS Serif",
                    "MYRIAD",
                    "MYRIAD PRO",
                    "Palatino",
                    "Palatino Linotype",
                    "Segoe Print",
                    "Segoe Script",
                    "Segoe UI",
                    "Segoe UI Light",
                    "Segoe UI Semibold",
                    "Segoe UI Symbol",
                    "Tahoma",
                    "Times",
                    "Times New Roman",
                    "Times New Roman PS",
                    "Trebuchet MS",
                    "Verdana",
                    "Wingdings",
                    "Wingdings 2",
                    "Wingdings 3",
                  ];
                n.options.extendedJsFonts &&
                  (i = i.concat([
                    "Abadi MT Condensed Light",
                    "Academy Engraved LET",
                    "ADOBE CASLON PRO",
                    "Adobe Garamond",
                    "ADOBE GARAMOND PRO",
                    "Agency FB",
                    "Aharoni",
                    "Albertus Extra Bold",
                    "Albertus Medium",
                    "Algerian",
                    "Amazone BT",
                    "American Typewriter",
                    "American Typewriter Condensed",
                    "AmerType Md BT",
                    "Andalus",
                    "Angsana New",
                    "AngsanaUPC",
                    "Antique Olive",
                    "Aparajita",
                    "Apple Chancery",
                    "Apple Color Emoji",
                    "Apple SD Gothic Neo",
                    "Arabic Typesetting",
                    "ARCHER",
                    "ARNO PRO",
                    "Arrus BT",
                    "Aurora Cn BT",
                    "AvantGarde Bk BT",
                    "AvantGarde Md BT",
                    "AVENIR",
                    "Ayuthaya",
                    "Bandy",
                    "Bangla Sangam MN",
                    "Bank Gothic",
                    "BankGothic Md BT",
                    "Baskerville",
                    "Baskerville Old Face",
                    "Batang",
                    "BatangChe",
                    "Bauer Bodoni",
                    "Bauhaus 93",
                    "Bazooka",
                    "Bell MT",
                    "Bembo",
                    "Benguiat Bk BT",
                    "Berlin Sans FB",
                    "Berlin Sans FB Demi",
                    "Bernard MT Condensed",
                    "BernhardFashion BT",
                    "BernhardMod BT",
                    "Big Caslon",
                    "BinnerD",
                    "Blackadder ITC",
                    "BlairMdITC TT",
                    "Bodoni 72",
                    "Bodoni 72 Oldstyle",
                    "Bodoni 72 Smallcaps",
                    "Bodoni MT",
                    "Bodoni MT Black",
                    "Bodoni MT Condensed",
                    "Bodoni MT Poster Compressed",
                    "Bookshelf Symbol 7",
                    "Boulder",
                    "Bradley Hand",
                    "Bradley Hand ITC",
                    "Bremen Bd BT",
                    "Britannic Bold",
                    "Broadway",
                    "Browallia New",
                    "BrowalliaUPC",
                    "Brush Script MT",
                    "Californian FB",
                    "Calisto MT",
                    "Calligrapher",
                    "Candara",
                    "CaslonOpnface BT",
                    "Castellar",
                    "Centaur",
                    "Cezanne",
                    "CG Omega",
                    "CG Times",
                    "Chalkboard",
                    "Chalkboard SE",
                    "Chalkduster",
                    "Charlesworth",
                    "Charter Bd BT",
                    "Charter BT",
                    "Chaucer",
                    "ChelthmITC Bk BT",
                    "Chiller",
                    "Clarendon",
                    "Clarendon Condensed",
                    "CloisterBlack BT",
                    "Cochin",
                    "Colonna MT",
                    "Constantia",
                    "Cooper Black",
                    "Copperplate",
                    "Copperplate Gothic",
                    "Copperplate Gothic Bold",
                    "Copperplate Gothic Light",
                    "CopperplGoth Bd BT",
                    "Corbel",
                    "Cordia New",
                    "CordiaUPC",
                    "Cornerstone",
                    "Coronet",
                    "Cuckoo",
                    "Curlz MT",
                    "DaunPenh",
                    "Dauphin",
                    "David",
                    "DB LCD Temp",
                    "DELICIOUS",
                    "Denmark",
                    "DFKai-SB",
                    "Didot",
                    "DilleniaUPC",
                    "DIN",
                    "DokChampa",
                    "Dotum",
                    "DotumChe",
                    "Ebrima",
                    "Edwardian Script ITC",
                    "Elephant",
                    "English 111 Vivace BT",
                    "Engravers MT",
                    "EngraversGothic BT",
                    "Eras Bold ITC",
                    "Eras Demi ITC",
                    "Eras Light ITC",
                    "Eras Medium ITC",
                    "EucrosiaUPC",
                    "Euphemia",
                    "Euphemia UCAS",
                    "EUROSTILE",
                    "Exotc350 Bd BT",
                    "FangSong",
                    "Felix Titling",
                    "Fixedsys",
                    "FONTIN",
                    "Footlight MT Light",
                    "Forte",
                    "FrankRuehl",
                    "Fransiscan",
                    "Freefrm721 Blk BT",
                    "FreesiaUPC",
                    "Freestyle Script",
                    "French Script MT",
                    "FrnkGothITC Bk BT",
                    "Fruitger",
                    "FRUTIGER",
                    "Futura",
                    "Futura Bk BT",
                    "Futura Lt BT",
                    "Futura Md BT",
                    "Futura ZBlk BT",
                    "FuturaBlack BT",
                    "Gabriola",
                    "Galliard BT",
                    "Gautami",
                    "Geeza Pro",
                    "Geometr231 BT",
                    "Geometr231 Hv BT",
                    "Geometr231 Lt BT",
                    "GeoSlab 703 Lt BT",
                    "GeoSlab 703 XBd BT",
                    "Gigi",
                    "Gill Sans",
                    "Gill Sans MT",
                    "Gill Sans MT Condensed",
                    "Gill Sans MT Ext Condensed Bold",
                    "Gill Sans Ultra Bold",
                    "Gill Sans Ultra Bold Condensed",
                    "Gisha",
                    "Gloucester MT Extra Condensed",
                    "GOTHAM",
                    "GOTHAM BOLD",
                    "Goudy Old Style",
                    "Goudy Stout",
                    "GoudyHandtooled BT",
                    "GoudyOLSt BT",
                    "Gujarati Sangam MN",
                    "Gulim",
                    "GulimChe",
                    "Gungsuh",
                    "GungsuhChe",
                    "Gurmukhi MN",
                    "Haettenschweiler",
                    "Harlow Solid Italic",
                    "Harrington",
                    "Heather",
                    "Heiti SC",
                    "Heiti TC",
                    "HELV",
                    "Herald",
                    "High Tower Text",
                    "Hiragino Kaku Gothic ProN",
                    "Hiragino Mincho ProN",
                    "Hoefler Text",
                    "Humanst 521 Cn BT",
                    "Humanst521 BT",
                    "Humanst521 Lt BT",
                    "Imprint MT Shadow",
                    "Incised901 Bd BT",
                    "Incised901 BT",
                    "Incised901 Lt BT",
                    "INCONSOLATA",
                    "Informal Roman",
                    "Informal011 BT",
                    "INTERSTATE",
                    "IrisUPC",
                    "Iskoola Pota",
                    "JasmineUPC",
                    "Jazz LET",
                    "Jenson",
                    "Jester",
                    "Jokerman",
                    "Juice ITC",
                    "Kabel Bk BT",
                    "Kabel Ult BT",
                    "Kailasa",
                    "KaiTi",
                    "Kalinga",
                    "Kannada Sangam MN",
                    "Kartika",
                    "Kaufmann Bd BT",
                    "Kaufmann BT",
                    "Khmer UI",
                    "KodchiangUPC",
                    "Kokila",
                    "Korinna BT",
                    "Kristen ITC",
                    "Krungthep",
                    "Kunstler Script",
                    "Lao UI",
                    "Latha",
                    "Leelawadee",
                    "Letter Gothic",
                    "Levenim MT",
                    "LilyUPC",
                    "Lithograph",
                    "Lithograph Light",
                    "Long Island",
                    "Lydian BT",
                    "Magneto",
                    "Maiandra GD",
                    "Malayalam Sangam MN",
                    "Malgun Gothic",
                    "Mangal",
                    "Marigold",
                    "Marion",
                    "Marker Felt",
                    "Market",
                    "Marlett",
                    "Matisse ITC",
                    "Matura MT Script Capitals",
                    "Meiryo",
                    "Meiryo UI",
                    "Microsoft Himalaya",
                    "Microsoft JhengHei",
                    "Microsoft New Tai Lue",
                    "Microsoft PhagsPa",
                    "Microsoft Tai Le",
                    "Microsoft Uighur",
                    "Microsoft YaHei",
                    "Microsoft Yi Baiti",
                    "MingLiU",
                    "MingLiU_HKSCS",
                    "MingLiU_HKSCS-ExtB",
                    "MingLiU-ExtB",
                    "Minion",
                    "Minion Pro",
                    "Miriam",
                    "Miriam Fixed",
                    "Mistral",
                    "Modern",
                    "Modern No. 20",
                    "Mona Lisa Solid ITC TT",
                    "Mongolian Baiti",
                    "MONO",
                    "MoolBoran",
                    "Mrs Eaves",
                    "MS LineDraw",
                    "MS Mincho",
                    "MS PMincho",
                    "MS Reference Specialty",
                    "MS UI Gothic",
                    "MT Extra",
                    "MUSEO",
                    "MV Boli",
                    "Nadeem",
                    "Narkisim",
                    "NEVIS",
                    "News Gothic",
                    "News GothicMT",
                    "NewsGoth BT",
                    "Niagara Engraved",
                    "Niagara Solid",
                    "Noteworthy",
                    "NSimSun",
                    "Nyala",
                    "OCR A Extended",
                    "Old Century",
                    "Old English Text MT",
                    "Onyx",
                    "Onyx BT",
                    "OPTIMA",
                    "Oriya Sangam MN",
                    "OSAKA",
                    "OzHandicraft BT",
                    "Palace Script MT",
                    "Papyrus",
                    "Parchment",
                    "Party LET",
                    "Pegasus",
                    "Perpetua",
                    "Perpetua Titling MT",
                    "PetitaBold",
                    "Pickwick",
                    "Plantagenet Cherokee",
                    "Playbill",
                    "PMingLiU",
                    "PMingLiU-ExtB",
                    "Poor Richard",
                    "Poster",
                    "PosterBodoni BT",
                    "PRINCETOWN LET",
                    "Pristina",
                    "PTBarnum BT",
                    "Pythagoras",
                    "Raavi",
                    "Rage Italic",
                    "Ravie",
                    "Ribbon131 Bd BT",
                    "Rockwell",
                    "Rockwell Condensed",
                    "Rockwell Extra Bold",
                    "Rod",
                    "Roman",
                    "Sakkal Majalla",
                    "Santa Fe LET",
                    "Savoye LET",
                    "Sceptre",
                    "Script",
                    "Script MT Bold",
                    "SCRIPTINA",
                    "Serifa",
                    "Serifa BT",
                    "Serifa Th BT",
                    "ShelleyVolante BT",
                    "Sherwood",
                    "Shonar Bangla",
                    "Showcard Gothic",
                    "Shruti",
                    "Signboard",
                    "SILKSCREEN",
                    "SimHei",
                    "Simplified Arabic",
                    "Simplified Arabic Fixed",
                    "SimSun",
                    "SimSun-ExtB",
                    "Sinhala Sangam MN",
                    "Sketch Rockwell",
                    "Skia",
                    "Small Fonts",
                    "Snap ITC",
                    "Snell Roundhand",
                    "Socket",
                    "Souvenir Lt BT",
                    "Staccato222 BT",
                    "Steamer",
                    "Stencil",
                    "Storybook",
                    "Styllo",
                    "Subway",
                    "Swis721 BlkEx BT",
                    "Swiss911 XCm BT",
                    "Sylfaen",
                    "Synchro LET",
                    "System",
                    "Tamil Sangam MN",
                    "Technical",
                    "Teletype",
                    "Telugu Sangam MN",
                    "Tempus Sans ITC",
                    "Terminal",
                    "Thonburi",
                    "Traditional Arabic",
                    "Trajan",
                    "TRAJAN PRO",
                    "Tristan",
                    "Tubular",
                    "Tunga",
                    "Tw Cen MT",
                    "Tw Cen MT Condensed",
                    "Tw Cen MT Condensed Extra Bold",
                    "TypoUpright BT",
                    "Unicorn",
                    "Univers",
                    "Univers CE 55 Medium",
                    "Univers Condensed",
                    "Utsaah",
                    "Vagabond",
                    "Vani",
                    "Vijaya",
                    "Viner Hand ITC",
                    "VisualUI",
                    "Vivaldi",
                    "Vladimir Script",
                    "Vrinda",
                    "Westminster",
                    "WHITNEY",
                    "Wide Latin",
                    "ZapfEllipt BT",
                    "ZapfHumnst BT",
                    "ZapfHumnst Dm BT",
                    "Zapfino",
                    "Zurich BlkEx BT",
                    "Zurich Ex BT",
                    "ZWAdobeF",
                  ])),
                  (i = (i = i.concat(n.options.userDefinedFonts)).filter(
                    function (e, t) {
                      return i.indexOf(e) === t;
                    }
                  ));
                var o = document.getElementsByTagName("body")[0],
                  a = document.createElement("div"),
                  s = document.createElement("div"),
                  c = {},
                  u = {},
                  l = function () {
                    var e = document.createElement("span");
                    return (
                      (e.style.position = "absolute"),
                      (e.style.left = "-9999px"),
                      (e.style.fontSize = "72px"),
                      (e.style.fontStyle = "normal"),
                      (e.style.fontWeight = "normal"),
                      (e.style.letterSpacing = "normal"),
                      (e.style.lineBreak = "auto"),
                      (e.style.lineHeight = "normal"),
                      (e.style.textTransform = "none"),
                      (e.style.textAlign = "left"),
                      (e.style.textDecoration = "none"),
                      (e.style.textShadow = "none"),
                      (e.style.whiteSpace = "normal"),
                      (e.style.wordBreak = "normal"),
                      (e.style.wordSpacing = "normal"),
                      (e.innerHTML = "mmmmmmmmmmlli"),
                      e
                    );
                  },
                  d = function (e) {
                    for (var t = !1, n = 0; n < r.length; n++)
                      if (
                        (t =
                          e[n].offsetWidth !== c[r[n]] ||
                          e[n].offsetHeight !== u[r[n]])
                      )
                        return t;
                    return t;
                  },
                  h = (function () {
                    for (var e = [], t = 0, n = r.length; t < n; t++) {
                      var i = l();
                      (i.style.fontFamily = r[t]), a.appendChild(i), e.push(i);
                    }
                    return e;
                  })();
                o.appendChild(a);
                for (var p = 0, g = r.length; p < g; p++)
                  (c[r[p]] = h[p].offsetWidth), (u[r[p]] = h[p].offsetHeight);
                var f = (function () {
                  for (var e, t, n, o = {}, a = 0, c = i.length; a < c; a++) {
                    for (var u = [], d = 0, h = r.length; d < h; d++) {
                      var p =
                        ((e = i[a]),
                        (t = r[d]),
                        (n = void 0),
                        ((n = l()).style.fontFamily = "'" + e + "'," + t),
                        n);
                      s.appendChild(p), u.push(p);
                    }
                    o[i[a]] = u;
                  }
                  return o;
                })();
                o.appendChild(s);
                for (var m = [], v = 0, S = i.length; v < S; v++)
                  d(f[i[v]]) && m.push(i[v]);
                o.removeChild(s),
                  o.removeChild(a),
                  e.addPreprocessedComponent({ key: "js_fonts", value: m }),
                  t(e);
              }, 1);
            },
            pluginsKey: function (e) {
              return (
                this.options.excludePlugins ||
                  (this.isIE()
                    ? this.options.excludeIEPlugins ||
                      e.addPreprocessedComponent({
                        key: "ie_plugins",
                        value: this.getIEPlugins(),
                      })
                    : e.addPreprocessedComponent({
                        key: "regular_plugins",
                        value: this.getRegularPlugins(),
                      })),
                e
              );
            },
            getRegularPlugins: function () {
              var e = [];
              if (navigator.plugins)
                for (var t = 0, n = navigator.plugins.length; t < n; t++)
                  navigator.plugins[t] && e.push(navigator.plugins[t]);
              return (
                this.pluginsShouldBeSorted() &&
                  (e = e.sort(function (e, t) {
                    return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
                  })),
                this.map(
                  e,
                  function (e) {
                    var t = this.map(e, function (e) {
                      return [e.type, e.suffixes].join("~");
                    }).join(",");
                    return [e.name, e.description, t].join("::");
                  },
                  this
                )
              );
            },
            getIEPlugins: function () {
              var e = [];
              return (
                ((Object.getOwnPropertyDescriptor &&
                  Object.getOwnPropertyDescriptor(window, "ActiveXObject")) ||
                  "ActiveXObject" in window) &&
                  (e = this.map(
                    [
                      "AcroPDF.PDF",
                      "Adodb.Stream",
                      "AgControl.AgControl",
                      "DevalVRXCtrl.DevalVRXCtrl.1",
                      "MacromediaFlashPaper.MacromediaFlashPaper",
                      "Msxml2.DOMDocument",
                      "Msxml2.XMLHTTP",
                      "PDF.PdfCtrl",
                      "QuickTime.QuickTime",
                      "QuickTimeCheckObject.QuickTimeCheck.1",
                      "RealPlayer",
                      "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
                      "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
                      "Scripting.Dictionary",
                      "SWCtl.SWCtl",
                      "Shell.UIHelper",
                      "ShockwaveFlash.ShockwaveFlash",
                      "Skype.Detection",
                      "TDCCtl.TDCCtl",
                      "WMPlayer.OCX",
                      "rmocx.RealPlayer G2 Control",
                      "rmocx.RealPlayer G2 Control.1",
                    ],
                    function (e) {
                      try {
                        return new window.ActiveXObject(e), e;
                      } catch (e) {
                        return null;
                      }
                    }
                  )),
                navigator.plugins && (e = e.concat(this.getRegularPlugins())),
                e
              );
            },
            pluginsShouldBeSorted: function () {
              for (
                var e = !1, t = 0, n = this.options.sortPluginsFor.length;
                t < n;
                t++
              )
                if (navigator.userAgent.match(this.options.sortPluginsFor[t])) {
                  e = !0;
                  break;
                }
              return e;
            },
            touchSupportKey: function (e) {
              return (
                this.options.excludeTouchSupport ||
                  e.addPreprocessedComponent({
                    key: "touch_support",
                    value: this.getTouchSupport(),
                  }),
                e
              );
            },
            hardwareConcurrencyKey: function (e) {
              return (
                this.options.excludeHardwareConcurrency ||
                  e.addPreprocessedComponent({
                    key: "hardware_concurrency",
                    value: this.getHardwareConcurrency(),
                  }),
                e
              );
            },
            hasSessionStorage: function () {
              try {
                return !!window.sessionStorage;
              } catch (e) {
                return !0;
              }
            },
            hasLocalStorage: function () {
              try {
                return !!window.localStorage;
              } catch (e) {
                return !0;
              }
            },
            hasIndexedDB: function () {
              try {
                return !!window.indexedDB;
              } catch (e) {
                return !0;
              }
            },
            getHardwareConcurrency: function () {
              return navigator.hardwareConcurrency
                ? navigator.hardwareConcurrency
                : "unknown";
            },
            getNavigatorCpuClass: function () {
              return navigator.cpuClass ? navigator.cpuClass : "unknown";
            },
            getNavigatorPlatform: function () {
              return navigator.platform ? navigator.platform : "unknown";
            },
            getDoNotTrack: function () {
              return navigator.doNotTrack
                ? navigator.doNotTrack
                : navigator.msDoNotTrack
                ? navigator.msDoNotTrack
                : window.doNotTrack
                ? window.doNotTrack
                : "unknown";
            },
            getTouchSupport: function () {
              var e = 0,
                t = !1;
              void 0 !== navigator.maxTouchPoints
                ? (e = navigator.maxTouchPoints)
                : void 0 !== navigator.msMaxTouchPoints &&
                  (e = navigator.msMaxTouchPoints);
              try {
                document.createEvent("TouchEvent"), (t = !0);
              } catch (e) {}
              return [e, t, "ontouchstart" in window];
            },
            getCanvasFp: function () {
              var e = [],
                t = document.createElement("canvas");
              (t.width = 2e3), (t.height = 200), (t.style.display = "inline");
              var n = t.getContext("2d");
              return (
                n.rect(0, 0, 10, 10),
                n.rect(2, 2, 6, 6),
                e.push(
                  "canvas winding:" +
                    (!1 === n.isPointInPath(5, 5, "evenodd") ? "yes" : "no")
                ),
                (n.textBaseline = "alphabetic"),
                (n.fillStyle = "#f60"),
                n.fillRect(125, 1, 62, 20),
                (n.fillStyle = "#069"),
                (n.font = this.options.dontUseFakeFontInCanvas
                  ? "11pt Arial"
                  : "11pt no-real-font-123"),
                n.fillText(
                  "Cwm fjordbank glyphs vext quiz, \ud83d\ude03",
                  2,
                  15
                ),
                (n.fillStyle = "rgba(102, 204, 0, 0.2)"),
                (n.font = "18pt Arial"),
                n.fillText(
                  "Cwm fjordbank glyphs vext quiz, \ud83d\ude03",
                  4,
                  45
                ),
                (n.globalCompositeOperation = "multiply"),
                (n.fillStyle = "rgb(255,0,255)"),
                n.beginPath(),
                n.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                (n.fillStyle = "rgb(0,255,255)"),
                n.beginPath(),
                n.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                (n.fillStyle = "rgb(255,255,0)"),
                n.beginPath(),
                n.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                n.closePath(),
                n.fill(),
                (n.fillStyle = "rgb(255,0,255)"),
                n.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                n.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                n.fill("evenodd"),
                t.toDataURL && e.push("canvas fp:" + t.toDataURL()),
                e.join("~")
              );
            },
            getWebglFp: function () {
              var e,
                t = function (t) {
                  return (
                    e.clearColor(0, 0, 0, 1),
                    e.enable(e.DEPTH_TEST),
                    e.depthFunc(e.LEQUAL),
                    e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                    "[" + t[0] + ", " + t[1] + "]"
                  );
                };
              if (!(e = this.getWebglCanvas())) return null;
              var n = [],
                r = e.createBuffer();
              e.bindBuffer(e.ARRAY_BUFFER, r);
              var i = new Float32Array([
                -0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0,
              ]);
              e.bufferData(e.ARRAY_BUFFER, i, e.STATIC_DRAW),
                (r.itemSize = 3),
                (r.numItems = 3);
              var o = e.createProgram(),
                a = e.createShader(e.VERTEX_SHADER);
              e.shaderSource(
                a,
                "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"
              ),
                e.compileShader(a);
              var s = e.createShader(e.FRAGMENT_SHADER);
              e.shaderSource(
                s,
                "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"
              ),
                e.compileShader(s),
                e.attachShader(o, a),
                e.attachShader(o, s),
                e.linkProgram(o),
                e.useProgram(o),
                (o.vertexPosAttrib = e.getAttribLocation(o, "attrVertex")),
                (o.offsetUniform = e.getUniformLocation(o, "uniformOffset")),
                e.enableVertexAttribArray(o.vertexPosArray),
                e.vertexAttribPointer(
                  o.vertexPosAttrib,
                  r.itemSize,
                  e.FLOAT,
                  !1,
                  0,
                  0
                ),
                e.uniform2f(o.offsetUniform, 1, 1),
                e.drawArrays(e.TRIANGLE_STRIP, 0, r.numItems);
              try {
                n.push(e.canvas.toDataURL());
              } catch (e) {}
              n.push(
                "extensions:" + (e.getSupportedExtensions() || []).join(";")
              ),
                n.push(
                  "webgl aliased line width range:" +
                    t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))
                ),
                n.push(
                  "webgl aliased point size range:" +
                    t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))
                ),
                n.push("webgl alpha bits:" + e.getParameter(e.ALPHA_BITS)),
                n.push(
                  "webgl antialiasing:" +
                    (e.getContextAttributes().antialias ? "yes" : "no")
                ),
                n.push("webgl blue bits:" + e.getParameter(e.BLUE_BITS)),
                n.push("webgl depth bits:" + e.getParameter(e.DEPTH_BITS)),
                n.push("webgl green bits:" + e.getParameter(e.GREEN_BITS)),
                n.push(
                  "webgl max anisotropy:" +
                    (function (e) {
                      var t =
                        e.getExtension("EXT_texture_filter_anisotropic") ||
                        e.getExtension(
                          "WEBKIT_EXT_texture_filter_anisotropic"
                        ) ||
                        e.getExtension("MOZ_EXT_texture_filter_anisotropic");
                      if (t) {
                        var n = e.getParameter(
                          t.MAX_TEXTURE_MAX_ANISOTROPY_EXT
                        );
                        return 0 === n && (n = 2), n;
                      }
                      return null;
                    })(e)
                ),
                n.push(
                  "webgl max combined texture image units:" +
                    e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)
                ),
                n.push(
                  "webgl max cube map texture size:" +
                    e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)
                ),
                n.push(
                  "webgl max fragment uniform vectors:" +
                    e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)
                ),
                n.push(
                  "webgl max render buffer size:" +
                    e.getParameter(e.MAX_RENDERBUFFER_SIZE)
                ),
                n.push(
                  "webgl max texture image units:" +
                    e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)
                ),
                n.push(
                  "webgl max texture size:" + e.getParameter(e.MAX_TEXTURE_SIZE)
                ),
                n.push(
                  "webgl max varying vectors:" +
                    e.getParameter(e.MAX_VARYING_VECTORS)
                ),
                n.push(
                  "webgl max vertex attribs:" +
                    e.getParameter(e.MAX_VERTEX_ATTRIBS)
                ),
                n.push(
                  "webgl max vertex texture image units:" +
                    e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
                ),
                n.push(
                  "webgl max vertex uniform vectors:" +
                    e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)
                ),
                n.push(
                  "webgl max viewport dims:" +
                    t(e.getParameter(e.MAX_VIEWPORT_DIMS))
                ),
                n.push("webgl red bits:" + e.getParameter(e.RED_BITS)),
                n.push("webgl renderer:" + e.getParameter(e.RENDERER)),
                n.push(
                  "webgl shading language version:" +
                    e.getParameter(e.SHADING_LANGUAGE_VERSION)
                ),
                n.push("webgl stencil bits:" + e.getParameter(e.STENCIL_BITS)),
                n.push("webgl vendor:" + e.getParameter(e.VENDOR)),
                n.push("webgl version:" + e.getParameter(e.VERSION));
              try {
                var c = e.getExtension("WEBGL_debug_renderer_info");
                c &&
                  (n.push(
                    "webgl unmasked vendor:" +
                      e.getParameter(c.UNMASKED_VENDOR_WEBGL)
                  ),
                  n.push(
                    "webgl unmasked renderer:" +
                      e.getParameter(c.UNMASKED_RENDERER_WEBGL)
                  ));
              } catch (e) {}
              return e.getShaderPrecisionFormat
                ? (n.push(
                    "webgl vertex shader high float precision:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT)
                        .precision
                  ),
                  n.push(
                    "webgl vertex shader high float precision rangeMin:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT)
                        .rangeMin
                  ),
                  n.push(
                    "webgl vertex shader high float precision rangeMax:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT)
                        .rangeMax
                  ),
                  n.push(
                    "webgl vertex shader medium float precision:" +
                      e.getShaderPrecisionFormat(
                        e.VERTEX_SHADER,
                        e.MEDIUM_FLOAT
                      ).precision
                  ),
                  n.push(
                    "webgl vertex shader medium float precision rangeMin:" +
                      e.getShaderPrecisionFormat(
                        e.VERTEX_SHADER,
                        e.MEDIUM_FLOAT
                      ).rangeMin
                  ),
                  n.push(
                    "webgl vertex shader medium float precision rangeMax:" +
                      e.getShaderPrecisionFormat(
                        e.VERTEX_SHADER,
                        e.MEDIUM_FLOAT
                      ).rangeMax
                  ),
                  n.push(
                    "webgl vertex shader low float precision:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT)
                        .precision
                  ),
                  n.push(
                    "webgl vertex shader low float precision rangeMin:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT)
                        .rangeMin
                  ),
                  n.push(
                    "webgl vertex shader low float precision rangeMax:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT)
                        .rangeMax
                  ),
                  n.push(
                    "webgl fragment shader high float precision:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.HIGH_FLOAT
                      ).precision
                  ),
                  n.push(
                    "webgl fragment shader high float precision rangeMin:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.HIGH_FLOAT
                      ).rangeMin
                  ),
                  n.push(
                    "webgl fragment shader high float precision rangeMax:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.HIGH_FLOAT
                      ).rangeMax
                  ),
                  n.push(
                    "webgl fragment shader medium float precision:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.MEDIUM_FLOAT
                      ).precision
                  ),
                  n.push(
                    "webgl fragment shader medium float precision rangeMin:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.MEDIUM_FLOAT
                      ).rangeMin
                  ),
                  n.push(
                    "webgl fragment shader medium float precision rangeMax:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.MEDIUM_FLOAT
                      ).rangeMax
                  ),
                  n.push(
                    "webgl fragment shader low float precision:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT)
                        .precision
                  ),
                  n.push(
                    "webgl fragment shader low float precision rangeMin:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT)
                        .rangeMin
                  ),
                  n.push(
                    "webgl fragment shader low float precision rangeMax:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT)
                        .rangeMax
                  ),
                  n.push(
                    "webgl vertex shader high int precision:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT)
                        .precision
                  ),
                  n.push(
                    "webgl vertex shader high int precision rangeMin:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT)
                        .rangeMin
                  ),
                  n.push(
                    "webgl vertex shader high int precision rangeMax:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT)
                        .rangeMax
                  ),
                  n.push(
                    "webgl vertex shader medium int precision:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT)
                        .precision
                  ),
                  n.push(
                    "webgl vertex shader medium int precision rangeMin:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT)
                        .rangeMin
                  ),
                  n.push(
                    "webgl vertex shader medium int precision rangeMax:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT)
                        .rangeMax
                  ),
                  n.push(
                    "webgl vertex shader low int precision:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT)
                        .precision
                  ),
                  n.push(
                    "webgl vertex shader low int precision rangeMin:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT)
                        .rangeMin
                  ),
                  n.push(
                    "webgl vertex shader low int precision rangeMax:" +
                      e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT)
                        .rangeMax
                  ),
                  n.push(
                    "webgl fragment shader high int precision:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT)
                        .precision
                  ),
                  n.push(
                    "webgl fragment shader high int precision rangeMin:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT)
                        .rangeMin
                  ),
                  n.push(
                    "webgl fragment shader high int precision rangeMax:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT)
                        .rangeMax
                  ),
                  n.push(
                    "webgl fragment shader medium int precision:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.MEDIUM_INT
                      ).precision
                  ),
                  n.push(
                    "webgl fragment shader medium int precision rangeMin:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.MEDIUM_INT
                      ).rangeMin
                  ),
                  n.push(
                    "webgl fragment shader medium int precision rangeMax:" +
                      e.getShaderPrecisionFormat(
                        e.FRAGMENT_SHADER,
                        e.MEDIUM_INT
                      ).rangeMax
                  ),
                  n.push(
                    "webgl fragment shader low int precision:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT)
                        .precision
                  ),
                  n.push(
                    "webgl fragment shader low int precision rangeMin:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT)
                        .rangeMin
                  ),
                  n.push(
                    "webgl fragment shader low int precision rangeMax:" +
                      e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT)
                        .rangeMax
                  ),
                  n.join("~"))
                : n.join("~");
            },
            getWebglVendorAndRenderer: function () {
              try {
                var e = this.getWebglCanvas(),
                  t = e.getExtension("WEBGL_debug_renderer_info");
                return (
                  e.getParameter(t.UNMASKED_VENDOR_WEBGL) +
                  "~" +
                  e.getParameter(t.UNMASKED_RENDERER_WEBGL)
                );
              } catch (e) {
                return null;
              }
            },
            getAdBlock: function () {
              var e = document.createElement("div");
              (e.innerHTML = "&nbsp;"), (e.className = "adsbox");
              var t = !1;
              try {
                document.body.appendChild(e),
                  (t =
                    0 ===
                    document.getElementsByClassName("adsbox")[0].offsetHeight),
                  document.body.removeChild(e);
              } catch (e) {
                t = !1;
              }
              return t;
            },
            getHasLiedLanguages: function () {
              if (void 0 !== navigator.languages)
                try {
                  if (
                    navigator.languages[0].substr(0, 2) !==
                    navigator.language.substr(0, 2)
                  )
                    return !0;
                } catch (e) {
                  return !0;
                }
              return !1;
            },
            getHasLiedResolution: function () {
              return (
                window.screen.width < window.screen.availWidth ||
                window.screen.height < window.screen.availHeight
              );
            },
            getHasLiedOs: function () {
              var e,
                t = navigator.userAgent.toLowerCase(),
                n = navigator.oscpu,
                r = navigator.platform.toLowerCase();
              if (
                ((e =
                  t.indexOf("windows phone") >= 0
                    ? "Windows Phone"
                    : t.indexOf("win") >= 0
                    ? "Windows"
                    : t.indexOf("android") >= 0
                    ? "Android"
                    : t.indexOf("linux") >= 0
                    ? "Linux"
                    : t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0
                    ? "iOS"
                    : t.indexOf("mac") >= 0
                    ? "Mac"
                    : "Other"),
                ("ontouchstart" in window ||
                  navigator.maxTouchPoints > 0 ||
                  navigator.msMaxTouchPoints > 0) &&
                  "Windows Phone" !== e &&
                  "Android" !== e &&
                  "iOS" !== e &&
                  "Other" !== e)
              )
                return !0;
              if (void 0 !== n) {
                if (
                  (n = n.toLowerCase()).indexOf("win") >= 0 &&
                  "Windows" !== e &&
                  "Windows Phone" !== e
                )
                  return !0;
                if (n.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e)
                  return !0;
                if (n.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e)
                  return !0;
                if (
                  (-1 === n.indexOf("win") &&
                    -1 === n.indexOf("linux") &&
                    -1 === n.indexOf("mac")) !=
                  ("Other" === e)
                )
                  return !0;
              }
              return (
                (r.indexOf("win") >= 0 &&
                  "Windows" !== e &&
                  "Windows Phone" !== e) ||
                ((r.indexOf("linux") >= 0 ||
                  r.indexOf("android") >= 0 ||
                  r.indexOf("pike") >= 0) &&
                  "Linux" !== e &&
                  "Android" !== e) ||
                ((r.indexOf("mac") >= 0 ||
                  r.indexOf("ipad") >= 0 ||
                  r.indexOf("ipod") >= 0 ||
                  r.indexOf("iphone") >= 0) &&
                  "Mac" !== e &&
                  "iOS" !== e) ||
                (-1 === r.indexOf("win") &&
                  -1 === r.indexOf("linux") &&
                  -1 === r.indexOf("mac")) !=
                  ("Other" === e) ||
                (void 0 === navigator.plugins &&
                  "Windows" !== e &&
                  "Windows Phone" !== e)
              );
            },
            getHasLiedBrowser: function () {
              var e,
                t = navigator.userAgent.toLowerCase(),
                n = navigator.productSub;
              if (
                ("Chrome" ==
                  (e =
                    t.indexOf("firefox") >= 0
                      ? "Firefox"
                      : t.indexOf("opera") >= 0 || t.indexOf("opr") >= 0
                      ? "Opera"
                      : t.indexOf("chrome") >= 0
                      ? "Chrome"
                      : t.indexOf("safari") >= 0
                      ? "Safari"
                      : t.indexOf("trident") >= 0
                      ? "Internet Explorer"
                      : "Other") ||
                  "Safari" === e ||
                  "Opera" === e) &&
                "20030107" !== n
              )
                return !0;
              var r,
                i = eval.toString().length;
              if (
                37 === i &&
                "Safari" !== e &&
                "Firefox" !== e &&
                "Other" !== e
              )
                return !0;
              if (39 === i && "Internet Explorer" !== e && "Other" !== e)
                return !0;
              if (33 === i && "Chrome" !== e && "Opera" !== e && "Other" !== e)
                return !0;
              try {
                throw "a";
              } catch (e) {
                try {
                  e.toSource(), (r = !0);
                } catch (e) {
                  r = !1;
                }
              }
              return !(!r || "Firefox" === e || "Other" === e);
            },
            isCanvasSupported: function () {
              var e = document.createElement("canvas");
              return !(!e.getContext || !e.getContext("2d"));
            },
            isWebGlSupported: function () {
              if (!this.isCanvasSupported()) return !1;
              var e = this.getWebglCanvas();
              return !!window.WebGLRenderingContext && !!e;
            },
            isIE: function () {
              return (
                "Microsoft Internet Explorer" === navigator.appName ||
                !(
                  "Netscape" !== navigator.appName ||
                  !/Trident/.test(navigator.userAgent)
                )
              );
            },
            hasSwfObjectLoaded: function () {
              return void 0 !== window.swfobject;
            },
            hasMinFlashInstalled: function () {
              return window.swfobject.hasFlashPlayerVersion("9.0.0");
            },
            addFlashDivNode: function () {
              var e = document.createElement("div");
              e.setAttribute("id", this.options.swfContainerId),
                document.body.appendChild(e);
            },
            loadSwfAndDetectFonts: function (e) {
              var t = "___fp_swf_loaded";
              window[t] = function (t) {
                e(t);
              };
              var n = this.options.swfContainerId;
              this.addFlashDivNode(),
                window.swfobject.embedSWF(
                  this.options.swfPath,
                  n,
                  "1",
                  "1",
                  "9.0.0",
                  !1,
                  { onReady: t },
                  { allowScriptAccess: "always", menu: "false" },
                  {}
                );
            },
            getWebglCanvas: function () {
              var e = document.createElement("canvas"),
                t = null;
              try {
                t = e.getContext("webgl") || e.getContext("experimental-webgl");
              } catch (e) {}
              return t || (t = null), t;
            },
            each: function (e, t, n) {
              if (null !== e)
                if (this.nativeForEach && e.forEach === this.nativeForEach)
                  e.forEach(t, n);
                else if (e.length === +e.length) {
                  for (var r = 0, i = e.length; r < i; r++)
                    if (t.call(n, e[r], r, e) === {}) return;
                } else
                  for (var o in e)
                    if (e.hasOwnProperty(o) && t.call(n, e[o], o, e) === {})
                      return;
            },
            map: function (e, t, n) {
              var r = [];
              return null == e
                ? r
                : this.nativeMap && e.map === this.nativeMap
                ? e.map(t, n)
                : (this.each(e, function (e, i, o) {
                    r[r.length] = t.call(n, e, i, o);
                  }),
                  r);
            },
            x64Add: function (e, t) {
              var n = [0, 0, 0, 0];
              return (
                (n[3] +=
                  (e = [
                    e[0] >>> 16,
                    65535 & e[0],
                    e[1] >>> 16,
                    65535 & e[1],
                  ])[3] +
                  (t = [
                    t[0] >>> 16,
                    65535 & t[0],
                    t[1] >>> 16,
                    65535 & t[1],
                  ])[3]),
                (n[2] += n[3] >>> 16),
                (n[3] &= 65535),
                (n[2] += e[2] + t[2]),
                (n[1] += n[2] >>> 16),
                (n[2] &= 65535),
                (n[1] += e[1] + t[1]),
                (n[0] += n[1] >>> 16),
                (n[1] &= 65535),
                (n[0] += e[0] + t[0]),
                (n[0] &= 65535),
                [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
              );
            },
            x64Multiply: function (e, t) {
              var n = [0, 0, 0, 0];
              return (
                (n[3] +=
                  (e = [
                    e[0] >>> 16,
                    65535 & e[0],
                    e[1] >>> 16,
                    65535 & e[1],
                  ])[3] *
                  (t = [
                    t[0] >>> 16,
                    65535 & t[0],
                    t[1] >>> 16,
                    65535 & t[1],
                  ])[3]),
                (n[2] += n[3] >>> 16),
                (n[3] &= 65535),
                (n[2] += e[2] * t[3]),
                (n[1] += n[2] >>> 16),
                (n[2] &= 65535),
                (n[2] += e[3] * t[2]),
                (n[1] += n[2] >>> 16),
                (n[2] &= 65535),
                (n[1] += e[1] * t[3]),
                (n[0] += n[1] >>> 16),
                (n[1] &= 65535),
                (n[1] += e[2] * t[2]),
                (n[0] += n[1] >>> 16),
                (n[1] &= 65535),
                (n[1] += e[3] * t[1]),
                (n[0] += n[1] >>> 16),
                (n[1] &= 65535),
                (n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0]),
                (n[0] &= 65535),
                [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
              );
            },
            x64Rotl: function (e, t) {
              return 32 == (t %= 64)
                ? [e[1], e[0]]
                : t < 32
                ? [
                    (e[0] << t) | (e[1] >>> (32 - t)),
                    (e[1] << t) | (e[0] >>> (32 - t)),
                  ]
                : [
                    (e[1] << (t -= 32)) | (e[0] >>> (32 - t)),
                    (e[0] << t) | (e[1] >>> (32 - t)),
                  ];
            },
            x64LeftShift: function (e, t) {
              return 0 == (t %= 64)
                ? e
                : t < 32
                ? [(e[0] << t) | (e[1] >>> (32 - t)), e[1] << t]
                : [e[1] << (t - 32), 0];
            },
            x64Xor: function (e, t) {
              return [e[0] ^ t[0], e[1] ^ t[1]];
            },
            x64Fmix: function (e) {
              return (
                (e = this.x64Xor(e, [0, e[0] >>> 1])),
                (e = this.x64Multiply(e, [4283543511, 3981806797])),
                (e = this.x64Xor(e, [0, e[0] >>> 1])),
                (e = this.x64Multiply(e, [3301882366, 444984403])),
                this.x64Xor(e, [0, e[0] >>> 1])
              );
            },
            x64hash128: function (e, t) {
              for (
                var n = (e = e || "").length % 16,
                  r = e.length - n,
                  i = [0, (t = t || 0)],
                  o = [0, t],
                  a = [0, 0],
                  s = [0, 0],
                  c = [2277735313, 289559509],
                  u = [1291169091, 658871167],
                  l = 0;
                l < r;
                l += 16
              )
                (a = [
                  (255 & e.charCodeAt(l + 4)) |
                    ((255 & e.charCodeAt(l + 5)) << 8) |
                    ((255 & e.charCodeAt(l + 6)) << 16) |
                    ((255 & e.charCodeAt(l + 7)) << 24),
                  (255 & e.charCodeAt(l)) |
                    ((255 & e.charCodeAt(l + 1)) << 8) |
                    ((255 & e.charCodeAt(l + 2)) << 16) |
                    ((255 & e.charCodeAt(l + 3)) << 24),
                ]),
                  (s = [
                    (255 & e.charCodeAt(l + 12)) |
                      ((255 & e.charCodeAt(l + 13)) << 8) |
                      ((255 & e.charCodeAt(l + 14)) << 16) |
                      ((255 & e.charCodeAt(l + 15)) << 24),
                    (255 & e.charCodeAt(l + 8)) |
                      ((255 & e.charCodeAt(l + 9)) << 8) |
                      ((255 & e.charCodeAt(l + 10)) << 16) |
                      ((255 & e.charCodeAt(l + 11)) << 24),
                  ]),
                  (a = this.x64Multiply(a, c)),
                  (a = this.x64Rotl(a, 31)),
                  (a = this.x64Multiply(a, u)),
                  (i = this.x64Xor(i, a)),
                  (i = this.x64Rotl(i, 27)),
                  (i = this.x64Add(i, o)),
                  (i = this.x64Add(
                    this.x64Multiply(i, [0, 5]),
                    [0, 1390208809]
                  )),
                  (s = this.x64Multiply(s, u)),
                  (s = this.x64Rotl(s, 33)),
                  (s = this.x64Multiply(s, c)),
                  (o = this.x64Xor(o, s)),
                  (o = this.x64Rotl(o, 31)),
                  (o = this.x64Add(o, i)),
                  (o = this.x64Add(
                    this.x64Multiply(o, [0, 5]),
                    [0, 944331445]
                  ));
              switch (((a = [0, 0]), (s = [0, 0]), n)) {
                case 15:
                  s = this.x64Xor(
                    s,
                    this.x64LeftShift([0, e.charCodeAt(l + 14)], 48)
                  );
                case 14:
                  s = this.x64Xor(
                    s,
                    this.x64LeftShift([0, e.charCodeAt(l + 13)], 40)
                  );
                case 13:
                  s = this.x64Xor(
                    s,
                    this.x64LeftShift([0, e.charCodeAt(l + 12)], 32)
                  );
                case 12:
                  s = this.x64Xor(
                    s,
                    this.x64LeftShift([0, e.charCodeAt(l + 11)], 24)
                  );
                case 11:
                  s = this.x64Xor(
                    s,
                    this.x64LeftShift([0, e.charCodeAt(l + 10)], 16)
                  );
                case 10:
                  s = this.x64Xor(
                    s,
                    this.x64LeftShift([0, e.charCodeAt(l + 9)], 8)
                  );
                case 9:
                  (s = this.x64Xor(s, [0, e.charCodeAt(l + 8)])),
                    (s = this.x64Multiply(s, u)),
                    (s = this.x64Rotl(s, 33)),
                    (s = this.x64Multiply(s, c)),
                    (o = this.x64Xor(o, s));
                case 8:
                  a = this.x64Xor(
                    a,
                    this.x64LeftShift([0, e.charCodeAt(l + 7)], 56)
                  );
                case 7:
                  a = this.x64Xor(
                    a,
                    this.x64LeftShift([0, e.charCodeAt(l + 6)], 48)
                  );
                case 6:
                  a = this.x64Xor(
                    a,
                    this.x64LeftShift([0, e.charCodeAt(l + 5)], 40)
                  );
                case 5:
                  a = this.x64Xor(
                    a,
                    this.x64LeftShift([0, e.charCodeAt(l + 4)], 32)
                  );
                case 4:
                  a = this.x64Xor(
                    a,
                    this.x64LeftShift([0, e.charCodeAt(l + 3)], 24)
                  );
                case 3:
                  a = this.x64Xor(
                    a,
                    this.x64LeftShift([0, e.charCodeAt(l + 2)], 16)
                  );
                case 2:
                  a = this.x64Xor(
                    a,
                    this.x64LeftShift([0, e.charCodeAt(l + 1)], 8)
                  );
                case 1:
                  (a = this.x64Xor(a, [0, e.charCodeAt(l)])),
                    (a = this.x64Multiply(a, c)),
                    (a = this.x64Rotl(a, 31)),
                    (a = this.x64Multiply(a, u)),
                    (i = this.x64Xor(i, a));
              }
              return (
                (i = this.x64Xor(i, [0, e.length])),
                (o = this.x64Xor(o, [0, e.length])),
                (i = this.x64Add(i, o)),
                (o = this.x64Add(o, i)),
                (i = this.x64Fmix(i)),
                (o = this.x64Fmix(o)),
                (i = this.x64Add(i, o)),
                (o = this.x64Add(o, i)),
                ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) +
                  ("00000000" + (i[1] >>> 0).toString(16)).slice(-8) +
                  ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) +
                  ("00000000" + (o[1] >>> 0).toString(16)).slice(-8)
              );
            },
          }),
          (e.VERSION = "1.8.0"),
          e
        );
      });
    },
    JNNf: function (e, t, n) {
      "use strict";
      var r = n("t/Na"),
        i = n("F/XL"),
        o = n("xMyE"),
        a = n("T1DM"),
        s = n("mrSG"),
        c = (function (e) {
          function t() {
            var n = e.call(this, "Timeout has occurred") || this;
            return (
              (n.name = "TimeoutError"),
              Object.setPrototypeOf(n, t.prototype),
              n
            );
          }
          return s.b(t, e), t;
        })(Error),
        u = n("VGuC"),
        l = n("MGBS"),
        d = n("zotm"),
        h = (function () {
          function e(e, t, n, r) {
            (this.waitFor = e),
              (this.absoluteTimeout = t),
              (this.withObservable = n),
              (this.scheduler = r);
          }
          return (
            (e.prototype.call = function (e, t) {
              return t.subscribe(
                new p(
                  e,
                  this.absoluteTimeout,
                  this.waitFor,
                  this.withObservable,
                  this.scheduler
                )
              );
            }),
            e
          );
        })(),
        p = (function (e) {
          function t(t, n, r, i, o) {
            var a = e.call(this, t) || this;
            return (
              (a.absoluteTimeout = n),
              (a.waitFor = r),
              (a.withObservable = i),
              (a.scheduler = o),
              (a.action = null),
              a.scheduleTimeout(),
              a
            );
          }
          return (
            s.b(t, e),
            (t.dispatchTimeout = function (e) {
              var t = e.withObservable;
              e._unsubscribeAndRecycle(), e.add(Object(d.a)(e, t));
            }),
            (t.prototype.scheduleTimeout = function () {
              var e = this.action;
              e
                ? (this.action = e.schedule(this, this.waitFor))
                : this.add(
                    (this.action = this.scheduler.schedule(
                      t.dispatchTimeout,
                      this.waitFor,
                      this
                    ))
                  );
            }),
            (t.prototype._next = function (t) {
              this.absoluteTimeout || this.scheduleTimeout(),
                e.prototype._next.call(this, t);
            }),
            (t.prototype._unsubscribe = function () {
              (this.action = null),
                (this.scheduler = null),
                (this.withObservable = null);
            }),
            t
          );
        })(l.a),
        g = n("XlPw"),
        f = n("9Z1F"),
        m = n("vV5i"),
        v = n("Hprf"),
        S = n("WfvI");
      n.d(t, "a", function () {
        return T;
      });
      var b = function (e, t, n, r) {
          return new (n || (n = Promise))(function (i, o) {
            function a(e) {
              try {
                c(r.next(e));
              } catch (t) {
                o(t);
              }
            }
            function s(e) {
              try {
                c(r.throw(e));
              } catch (t) {
                o(t);
              }
            }
            function c(e) {
              e.done
                ? i(e.value)
                : new n(function (t) {
                    t(e.value);
                  }).then(a, s);
            }
            c((r = r.apply(e, t || [])).next());
          });
        },
        y = function (e, t) {
          var n,
            r,
            i,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: s(0), throw: s(1), return: s(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function s(o) {
            return function (s) {
              return (function (o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          r[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [0, i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return a.label++, { value: o[1], done: !1 };
                      case 5:
                        a.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !(i = (i = a.trys).length > 0 && i[i.length - 1]) &&
                          (6 === o[0] || 2 === o[0])
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          a.label = o[1];
                          break;
                        }
                        if (6 === o[0] && a.label < i[1]) {
                          (a.label = i[1]), (i = o);
                          break;
                        }
                        if (i && a.label < i[2]) {
                          (a.label = i[2]), a.ops.push(o);
                          break;
                        }
                        i[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    o = t.call(e, a);
                  } catch (s) {
                    (o = [6, s]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, s]);
            };
          }
        },
        T = (function () {
          function e() {
            (this.headers = new r.g({ "Content-Type": "application/json" })),
              (this.rootUri = m.a.get(v.b)),
              (this.http = m.a.get(r.c));
          }
          return (
            (e.prototype.get = function (e, t, n, r, i, o) {
              return b(this, void 0, void 0, function () {
                return y(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return [
                        4,
                        this.executeAction(
                          w.Get,
                          e,
                          {},
                          t,
                          n,
                          r,
                          i,
                          o
                        ).toPromise(),
                      ];
                    case 1:
                      return [2, a.sent()];
                  }
                });
              });
            }),
            (e.prototype.delete = function (e, t, n, r) {
              return b(this, void 0, void 0, function () {
                return y(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.executeAction(
                          w.Delete,
                          e,
                          {},
                          t,
                          n,
                          r
                        ).toPromise(),
                      ];
                    case 1:
                      return [2, i.sent()];
                  }
                });
              });
            }),
            (e.prototype.post = function (e, t, n, r, i, o) {
              return b(this, void 0, void 0, function () {
                return y(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return [
                        4,
                        this.executeAction(
                          w.Post,
                          e,
                          t,
                          n,
                          r,
                          i,
                          o
                        ).toPromise(),
                      ];
                    case 1:
                      return [2, a.sent()];
                  }
                });
              });
            }),
            (e.prototype.put = function (e, t, n, r, i) {
              return b(this, void 0, void 0, function () {
                return y(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return [
                        4,
                        this.executeAction(w.Put, e, t, n, r, i).toPromise(),
                      ];
                    case 1:
                      return [2, o.sent()];
                  }
                });
              });
            }),
            (e.prototype.executeAction = function (e, t, n, r, s, l, d, p) {
              void 0 === d && (d = null), void 0 === p && (p = null);
              var m = "" + this.rootUri + t,
                v = { headers: this.getRequestHeaders(r) };
              p && (v.withCredentials = p),
                l === S.a.ThirdPartyAPI && ((m = t), (v.headers = null));
              var b,
                y = null;
              switch (e) {
                case w.Post:
                  y = this.executePost(m, n, v);
                  break;
                case w.Put:
                  y = this.executePut(m, n, v);
                  break;
                case w.Delete:
                  y = this.executeDelete(m, v);
                  break;
                default:
                  y = this.executeGet(m, v);
              }
              return d
                ? y.pipe(
                    Object(o.a)(function (e) {
                      return Object(i.a)(e);
                    }),
                    (void 0 === b && (b = a.a),
                    (function (e, t, n) {
                      return (
                        void 0 === n && (n = a.a),
                        function (r) {
                          var i = Object(u.a)(e),
                            o = i ? +e - n.now() : Math.abs(e);
                          return r.lift(new h(o, i, t, n));
                        }
                      );
                    })(1e3 * d, Object(g.a)(new c()), b)),
                    Object(f.a)(function (e) {
                      return "function" == typeof s && s(e), Object(i.a)({});
                    })
                  )
                : y.pipe(
                    Object(o.a)(function (e) {
                      return Object(i.a)(e);
                    }),
                    Object(f.a)(function (e) {
                      return "function" == typeof s && s(e), Object(i.a)({});
                    })
                  );
            }),
            (e.prototype.executeGet = function (e, t) {
              return this.http.get(e, t);
            }),
            (e.prototype.executeDelete = function (e, t) {
              return this.http.delete(e, t);
            }),
            (e.prototype.executePost = function (e, t, n) {
              return this.http.post(e, t, n);
            }),
            (e.prototype.executePut = function (e, t, n) {
              return this.http.put(e, t, n);
            }),
            (e.prototype.getRequestHeaders = function (e) {
              var t = this;
              e = e || new r.g();
              var n = {};
              return (
                this.headers.keys().forEach(function (e) {
                  var r = t.headers.get(e);
                  n[e] = r;
                }),
                e.keys().forEach(function (e) {
                  var r = t.headers.get(e);
                  n[e] = r;
                }),
                new r.g(n)
              );
            }),
            e
          );
        })(),
        w = (function (e) {
          return (
            (e[(e.Get = 0)] = "Get"),
            (e[(e.Post = 1)] = "Post"),
            (e[(e.Put = 2)] = "Put"),
            (e[(e.Delete = 3)] = "Delete"),
            e
          );
        })({});
    },
    UMy1: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n("CcnG"),
        i = (function () {
          return function () {};
        })(),
        o = n("t68o"),
        a = n("zbXB"),
        s = n("NcP4"),
        c = n("pMnS"),
        u = n("mrSG"),
        l = n("fNSe"),
        d = n("v24p"),
        h = n("ciR0"),
        p = n("pbCj"),
        g = n("y/dN"),
        f = n("Arki"),
        m = (function () {
          function e() {
            (this.$type =
              "SampleCube.UserFlow.API.Models.LandingPage.DTOs.SessionRequestApiDTO, SampleCube.UserFlow.API.Models.LandingPage"),
              (this.vendorId = 0),
              (this.sid = ""),
              (this.sampleCubeUser = null),
              (this.absUrl = ""),
              (this.urlData = new f.b()),
              (this.referralUrl = ""),
              (this.deviceType = 0),
              (this.hashkey = ""),
              (this.relevantId = ""),
              (this.fraudProfileScore = 0),
              (this.country = "");
          }
          return (
            (e.processParameters = function (t) {
              var n = new e();
              n.sampleCubeUser = p.b.instanceFrom(t);
              var r = g.a.absoluteUrl;
              for (var i in ((r +=
                (r.indexOf("?") >= 0 ? "&" : "?") + "cheesecake=true"),
              (n.absUrl = r),
              (n.referralUrl = window.document.referrer),
              t))
                t.hasOwnProperty(i) &&
                  n.urlData.$values.push(
                    new f.a({ key: i.toLowerCase(), value: t[i].toString() })
                  );
              return (
                (n.deviceType = g.a.getDeviceType()),
                (n.vendorId = t.vid || 0),
                (n.sid = t.sid || ""),
                (n.hashkey = t.hashkey || ""),
                n
              );
            }),
            e
          );
        })(),
        v = n("cpR2"),
        S = n("Hprf"),
        b = n("vV5i"),
        y = n("5fN4"),
        T = b.a.get(S.P),
        w = (function (e) {
          function t(t, n, r, i) {
            var o = e.call(this, "Loading survey ...") || this;
            return (
              (o.duidService = t),
              (o.sessionService = n),
              (o.loaderService = r),
              (o.languageService = i),
              (o.sessionRequest = new m()),
              o.sessionStorageService.set("sc.step", d.a.CreateSession),
              o
            );
          }
          return (
            Object(u.b)(t, e),
            (t.prototype.ngOnInit = function () {
              return (
                (t = this),
                void 0,
                (r = function () {
                  var t, n, r, i, o;
                  return (function (e, t) {
                    var n,
                      r,
                      i,
                      o,
                      a = {
                        label: 0,
                        sent: function () {
                          if (1 & i[0]) throw i[1];
                          return i[1];
                        },
                        trys: [],
                        ops: [],
                      };
                    return (
                      (o = { next: s(0), throw: s(1), return: s(2) }),
                      "function" == typeof Symbol &&
                        (o[Symbol.iterator] = function () {
                          return this;
                        }),
                      o
                    );
                    function s(o) {
                      return function (s) {
                        return (function (o) {
                          if (n)
                            throw new TypeError(
                              "Generator is already executing."
                            );
                          for (; a; )
                            try {
                              if (
                                ((n = 1),
                                r &&
                                  (i =
                                    r[
                                      2 & o[0]
                                        ? "return"
                                        : o[0]
                                        ? "throw"
                                        : "next"
                                    ]) &&
                                  !(i = i.call(r, o[1])).done)
                              )
                                return i;
                              switch (
                                ((r = 0), i && (o = [0, i.value]), o[0])
                              ) {
                                case 0:
                                case 1:
                                  i = o;
                                  break;
                                case 4:
                                  return a.label++, { value: o[1], done: !1 };
                                case 5:
                                  a.label++, (r = o[1]), (o = [0]);
                                  continue;
                                case 7:
                                  (o = a.ops.pop()), a.trys.pop();
                                  continue;
                                default:
                                  if (
                                    !(i =
                                      (i = a.trys).length > 0 &&
                                      i[i.length - 1]) &&
                                    (6 === o[0] || 2 === o[0])
                                  ) {
                                    a = 0;
                                    continue;
                                  }
                                  if (
                                    3 === o[0] &&
                                    (!i || (o[1] > i[0] && o[1] < i[3]))
                                  ) {
                                    a.label = o[1];
                                    break;
                                  }
                                  if (6 === o[0] && a.label < i[1]) {
                                    (a.label = i[1]), (i = o);
                                    break;
                                  }
                                  if (i && a.label < i[2]) {
                                    (a.label = i[2]), a.ops.push(o);
                                    break;
                                  }
                                  i[2] && a.ops.pop(), a.trys.pop();
                                  continue;
                              }
                              o = t.call(e, a);
                            } catch (s) {
                              (o = [6, s]), (r = 0);
                            } finally {
                              n = i = 0;
                            }
                          if (5 & o[0]) throw o[1];
                          return { value: o[0] ? o[1] : void 0, done: !0 };
                        })([o, s]);
                      };
                    }
                  })(this, function (a) {
                    switch (a.label) {
                      case 0:
                        return (
                          e.prototype.ngOnInit.call(this),
                          this.languageService.use(navigator.language),
                          (y.a.LanguageCode =
                            this.languageService.currentLang.toLowerCase()),
                          console.log(y.a.LanguageCode),
                          (t = this).getParameters(),
                          (t.sessionRequest = m.processParameters(t.params)),
                          T ? [4, t.duidService.getFingerprintPro()] : [3, 2]
                        );
                      case 1:
                        return (n = a.sent()), (t.duid = n.visitorId), [3, 4];
                      case 2:
                        return (r = t), [4, t.duidService.getFingerprint()];
                      case 3:
                        (r.duid = a.sent()), (a.label = 4);
                      case 4:
                        return (
                          (i = p.b.instanceFrom(
                            t.localStorageService.get(
                              t.sessionRequest.sampleCubeUser.isTest
                                ? "sc.profile.test"
                                : "sc.profile"
                            )
                          )) &&
                            t.params.uid &&
                            t.params.vid &&
                            t.params.vid === i.vendorId &&
                            t.params.uid === i.vendorUserId &&
                            (i instanceof h.a && (i = i),
                            (t.sessionRequest.sampleCubeUser = i)),
                          (t.sessionRequest.sampleCubeUser.gender =
                            this.getGenderFromUrl().toString()),
                          (t.sessionRequest.sampleCubeUser.duid = t.duid),
                          (t.sessionRequest.referralUrl = (
                            this.params.referralurl || ""
                          ).toString()),
                          (t.sessionRequest.absUrl = (
                            this.params.absurl || ""
                          ).toString()),
                          null != t.cachedRespondent &&
                          Object.keys(t.cachedRespondent).length > 0
                            ? [2, t.navigateTo("/survey/demographics", !0)]
                            : ((o = t),
                              [
                                4,
                                t.sessionService.createSession(
                                  t.sessionRequest,
                                  function (e) {
                                    throw new v.b({
                                      message: e.message,
                                      data: Object(v.c)(e.error)
                                        ? e.error
                                        : null,
                                    });
                                  }
                                ),
                              ])
                        );
                      case 5:
                        if (((o.session = a.sent()), null == t.session))
                          throw new v.b({
                            message: "Invalid Url.",
                            data: new v.a({
                              debugData: "",
                              details: "",
                              errorCode: 40,
                              message: "InvalidURL",
                            }),
                          });
                        return (
                          t.localStorageService.remove(
                            t.sessionRequest.sampleCubeUser.isTest
                              ? "sc.profile.test"
                              : "sc.profile"
                          ),
                          t.session &&
                            t.session.sampleCubeUser &&
                            t.session.respondent &&
                            (t.localStorageService.set(
                              t.session.sampleCubeUser.isTest
                                ? "sc.profile.test"
                                : "sc.profile",
                              t.session.sampleCubeUser
                            ),
                            t.localStorageService.set(
                              "sc.profile.createdOn",
                              new Date()
                            ),
                            (t.session.respondent.duid = t.duid),
                            t.session.respondent.isTest
                              ? (t.sessionStorageService.set(
                                  "sc.respondent.test",
                                  t.session.respondent
                                ),
                                t.sessionStorageService.remove("sc.respondent"))
                              : (t.sessionStorageService.set(
                                  "sc.respondent",
                                  t.session.respondent
                                ),
                                t.sessionStorageService.remove(
                                  "sc.respondent.test"
                                )),
                            t.sessionStorageService.set(
                              "sc.skipdemographics",
                              t.session.skipDemographics
                            ),
                            t.sessionStorageService.set(
                              "sc.consistencycheck",
                              t.session.consistencyCheck
                            ),
                            t.sessionStorageService.set(
                              "sc.lid",
                              t.session.languageId
                            ),
                            t.sessionStorageService.set(
                              "sc.accountid",
                              t.session.accountId
                            ),
                            t.sessionStorageService.set(
                              "sc.verifyrelevantid",
                              t.session.verifyRelevantId
                            ),
                            t.sessionStorageService.set(
                              "sc.samplechainenable",
                              t.session.isSampleChainEnabled
                            ),
                            t.sessionStorageService.set(
                              "sc.sampleChainDestinationPlatformId",
                              t.session.sampleChainDestinationPlatformId
                            ),
                            t.sessionStorageService.set(
                              "sc.sampleChainDestinationSurveyNumber",
                              t.session.sampleChainDestinationSurveyNumber
                            ),
                            t.sessionStorageService.set(
                              "sc.prescreenercheck",
                              t.session.preScreenerCheck
                            ),
                            t.sessionStorageService.set(
                              "sc.verifyrfgfingerprint",
                              t.session.verifyRFGFingerPrint
                            ),
                            t.navigateTo("/survey/demographics", !0)),
                          [2]
                        );
                    }
                  });
                }),
                new ((n = void 0) || (n = Promise))(function (e, i) {
                  function o(e) {
                    try {
                      s(r.next(e));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function a(e) {
                    try {
                      s(r.throw(e));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function s(t) {
                    t.done
                      ? e(t.value)
                      : new n(function (e) {
                          e(t.value);
                        }).then(o, a);
                  }
                  s((r = r.apply(t, [])).next());
                })
              );
              var t, n, r;
            }),
            (t.prototype.ngOnDestroy = function () {
              e.prototype.ngOnDestroy.call(this);
            }),
            t
          );
        })(l.a),
        E = n("3AcF"),
        R = (function () {
          return function (e, t) {
            (this.visitorId = e), (this.duIdTimestamp = t);
          };
        })(),
        x = function () {
          return (x =
            Object.assign ||
            function (e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        };
      "function" == typeof SuppressedError && SuppressedError;
      var C = "Blocked by CSP",
        A = "The endpoint parameter is not a valid URL";
      function M(e) {
        for (var t = "", n = 0; n < e.length; ++n)
          if (n > 0) {
            var r = e[n].toLowerCase();
            t += r !== e[n] ? " ".concat(r) : e[n];
          } else t += e[n].toUpperCase();
        return t;
      }
      var P = M("WrongRegion"),
        O = M("SubscriptionNotActive"),
        _ = M("UnsupportedVersion"),
        I = M("InstallationMethodRestricted"),
        B = "API key required",
        F = "Failed to load the JS script of the agent",
        L = "9319",
        D =
          "https://fpnpmcdn.net/v<version>/<apiKey>/loader_v<loaderVersion>.js";
      function N(e) {
        return (function (e, t, n, r) {
          var i,
            o = document,
            a = "securitypolicyviolation",
            s = function (t) {
              var n = new URL(e, location.href),
                r = t.blockedURI;
              (r !== n.href &&
                r !== n.protocol.slice(0, -1) &&
                r !== n.origin) ||
                ((i = t), c());
            };
          o.addEventListener(a, s);
          var c = function () {
            return o.removeEventListener(a, s);
          };
          return Promise.resolve()
            .then(t)
            .then(
              function (e) {
                return c(), e;
              },
              function (e) {
                return new Promise(function (e) {
                  var t = new MessageChannel();
                  (t.port1.onmessage = function () {
                    return e();
                  }),
                    t.port2.postMessage(null);
                }).then(function () {
                  if ((c(), i))
                    return (function () {
                      throw new Error(C);
                    })();
                  throw e;
                });
              }
            );
        })(e, function () {
          return (function (e) {
            return new Promise(function (t, n) {
              if (
                (function (e) {
                  if (URL.prototype)
                    try {
                      return new URL(e, location.href), !1;
                    } catch (t) {
                      if (t instanceof Error && "TypeError" === t.name)
                        return !0;
                      throw t;
                    }
                })(e)
              )
                throw new Error(A);
              var r = document.createElement("script"),
                i = function () {
                  var e;
                  return null === (e = r.parentNode) || void 0 === e
                    ? void 0
                    : e.removeChild(r);
                },
                o = document.head || document.getElementsByTagName("head")[0];
              (r.onload = function () {
                i(), t();
              }),
                (r.onerror = function () {
                  i(), n(new Error(F));
                }),
                (r.async = !0),
                (r.src = e),
                o.appendChild(r);
            });
          })(e);
        }).then(k);
      }
      function k() {
        var e = window,
          t = "__fpjs_p_l_b",
          n = e[t];
        if (
          ((function (e, t) {
            var n,
              r =
                null === (n = Object.getOwnPropertyDescriptor) || void 0 === n
                  ? void 0
                  : n.call(Object, e, t);
            (null == r ? void 0 : r.configurable)
              ? delete e[t]
              : (r && !r.writable) || (e[t] = void 0);
          })(e, t),
          "function" != typeof (null == n ? void 0 : n.load))
        )
          throw new Error(L);
        return n;
      }
      var G = {
          load: function (e) {
            var t,
              n = e.apiKey,
              r = void 0 === n ? e.token : n,
              i = (function (e, t) {
                var n = {};
                for (var r in e)
                  Object.prototype.hasOwnProperty.call(e, r) &&
                    t.indexOf(r) < 0 &&
                    (n[r] = e[r]);
                if (
                  null != e &&
                  "function" == typeof Object.getOwnPropertySymbols
                ) {
                  var i = 0;
                  for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                    t.indexOf(r[i]) < 0 &&
                      Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                      (n[r[i]] = e[r[i]]);
                }
                return n;
              })(e, ["scriptUrlPattern", "token", "apiKey"]),
              o =
                null !==
                  (t = (function (e, t) {
                    return (function (e, t) {
                      return Object.prototype.hasOwnProperty.call(
                        e,
                        "scriptUrlPattern"
                      );
                    })(e)
                      ? e.scriptUrlPattern
                      : void 0;
                  })(e)) && void 0 !== t
                  ? t
                  : D,
              a = (function () {
                var e = [],
                  t = function () {
                    e.push({
                      time: new Date(),
                      state: document.visibilityState,
                    });
                  },
                  n = (function (e, t, n, r) {
                    return (
                      e.addEventListener(t, n, r),
                      function () {
                        return e.removeEventListener(t, n, r);
                      }
                    );
                  })(document, "visibilitychange", t);
                return t(), [e, n];
              })(),
              s = a[0],
              c = a[1];
            return Promise.resolve()
              .then(function () {
                if (!r || "string" != typeof r) throw new Error(B);
                return (function (e, t) {
                  var n,
                    r,
                    i,
                    o,
                    a = [],
                    s =
                      ((n = (function (e) {
                        var t = (function (e, t, n) {
                          for (var r, i = 0, o = t.length; i < o; i++)
                            (!r && i in t) ||
                              (r || (r = Array.prototype.slice.call(t, 0, i)),
                              (r[i] = t[i]));
                          return [].concat(r || Array.prototype.slice.call(t));
                        })([], e, !0);
                        return {
                          current: function () {
                            return t[0];
                          },
                          postpone: function () {
                            var e = t.shift();
                            void 0 !== e && t.push(e);
                          },
                          exclude: function () {
                            t.shift();
                          },
                        };
                      })(e)),
                      (o = 0),
                      (r = function () {
                        return (
                          Math.random() * Math.min(3e3, 100 * Math.pow(2, o++))
                        );
                      }),
                      (i = new Set()),
                      [
                        n.current(),
                        function (e, t) {
                          var o,
                            a = t instanceof Error ? t.message : "";
                          if (a === C || a === A) n.exclude(), (o = 0);
                          else if (a === L) n.exclude();
                          else if (a === F) {
                            var s = Date.now() - e.getTime() < 50,
                              c = n.current();
                            c && s && !i.has(c) && (i.add(c), (o = 0)),
                              n.postpone();
                          } else n.postpone();
                          var u = n.current();
                          return void 0 === u
                            ? void 0
                            : [
                                u,
                                null != o ? o : e.getTime() + r() - Date.now(),
                              ];
                        },
                      ]),
                    c = s[0],
                    u = s[1];
                  if (void 0 === c)
                    return Promise.reject(
                      new TypeError("The list of script URL patterns is empty")
                    );
                  var l = function (e) {
                    var n = new Date(),
                      r = function (t) {
                        return a.push({
                          url: e,
                          startedAt: n,
                          finishedAt: new Date(),
                          error: t,
                        });
                      },
                      i = t(e);
                    return (
                      i.then(function () {
                        return r();
                      }, r),
                      i.catch(function (e) {
                        if (a.length >= 5) throw e;
                        var t = u(n, e);
                        if (!t) throw e;
                        var r,
                          i = t[0];
                        return ((r = t[1]),
                        new Promise(function (e) {
                          return setTimeout(e, r);
                        })).then(function () {
                          return l(i);
                        });
                      })
                    );
                  };
                  return l(c).then(function (e) {
                    return [e, a];
                  });
                })(
                  (function (e, t) {
                    return (Array.isArray(e) ? e : [e]).map(function (e) {
                      return (function (e, t) {
                        var n = encodeURIComponent;
                        return e.replace(/<[^<>]+>/g, function (e) {
                          return "<version>" === e
                            ? "3"
                            : "<apiKey>" === e
                            ? n(t)
                            : "<loaderVersion>" === e
                            ? n("3.11.0")
                            : e;
                        });
                      })(String(e), t);
                    });
                  })(o, r),
                  N
                );
              })
              .catch(function (e) {
                throw (
                  (c(),
                  (function (e) {
                    return e instanceof Error && e.message === L
                      ? new Error(F)
                      : e;
                  })(e))
                );
              })
              .then(function (e) {
                var t = e[0],
                  n = e[1];
                return (
                  c(),
                  t.load(
                    x(x({}, i), { ldi: { attempts: n, visibilityStates: s } })
                  )
                );
              });
          },
          defaultScriptUrlPattern: D,
          ERROR_SCRIPT_LOAD_FAIL: F,
          ERROR_API_KEY_EXPIRED: "API key expired",
          ERROR_API_KEY_INVALID: "API key not found",
          ERROR_API_KEY_MISSING: B,
          ERROR_BAD_REQUEST_FORMAT: "Request cannot be parsed",
          ERROR_BAD_RESPONSE_FORMAT: "Response cannot be parsed",
          ERROR_CLIENT_TIMEOUT: "Client timeout",
          ERROR_CSP_BLOCK: C,
          ERROR_FORBIDDEN_ENDPOINT: M("HostnameRestricted"),
          ERROR_FORBIDDEN_HEADER: "Not available with restricted header",
          ERROR_FORBIDDEN_ORIGIN: "Not available for this origin",
          ERROR_GENERAL_SERVER_FAILURE: "Request failed",
          ERROR_INSTALLATION_METHOD_RESTRICTED: I,
          ERROR_INTEGRATION_FAILURE: M("IntegrationFailed"),
          ERROR_INVALID_ENDPOINT: A,
          ERROR_NETWORK_ABORT: "Network request aborted",
          ERROR_NETWORK_CONNECTION: "Network connection error",
          ERROR_RATE_LIMIT: "Too many requests, rate limit exceeded",
          ERROR_SERVER_TIMEOUT: "Request failed to process",
          ERROR_SUBSCRIPTION_NOT_ACTIVE: O,
          ERROR_TOKEN_EXPIRED: "API key expired",
          ERROR_TOKEN_INVALID: "API key not found",
          ERROR_TOKEN_MISSING: B,
          ERROR_UNSUPPORTED_VERSION: _,
          ERROR_WRONG_REGION: P,
          defaultEndpoint: { default: "endpoint" },
          defaultTlsEndpoint: { default: "tlsEndpoint" },
        },
        U = n("db6O"),
        H = function (e, t, n, r) {
          return new (n || (n = Promise))(function (i, o) {
            function a(e) {
              try {
                c(r.next(e));
              } catch (t) {
                o(t);
              }
            }
            function s(e) {
              try {
                c(r.throw(e));
              } catch (t) {
                o(t);
              }
            }
            function c(e) {
              e.done
                ? i(e.value)
                : new n(function (t) {
                    t(e.value);
                  }).then(a, s);
            }
            c((r = r.apply(e, t || [])).next());
          });
        },
        K = function (e, t) {
          var n,
            r,
            i,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: s(0), throw: s(1), return: s(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function s(o) {
            return function (s) {
              return (function (o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          r[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) &&
                        !(i = i.call(r, o[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (o = [0, i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return a.label++, { value: o[1], done: !1 };
                      case 5:
                        a.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !(i = (i = a.trys).length > 0 && i[i.length - 1]) &&
                          (6 === o[0] || 2 === o[0])
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!i || (o[1] > i[0] && o[1] < i[3]))
                        ) {
                          a.label = o[1];
                          break;
                        }
                        if (6 === o[0] && a.label < i[1]) {
                          (a.label = i[1]), (i = o);
                          break;
                        }
                        if (i && a.label < i[2]) {
                          (a.label = i[2]), a.ops.push(o);
                          break;
                        }
                        i[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    o = t.call(e, a);
                  } catch (s) {
                    (o = [6, s]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, s]);
            };
          }
        },
        X = b.a.get(S.o),
        z = (b.a.get(S.p), b.a.get(S.k)),
        V = (function () {
          function e(e) {
            (this.localStorageService = e), (this.visitorId = "");
          }
          return (
            (e.prototype.getFingerprint = function () {
              return H(this, void 0, void 0, function () {
                var e;
                return K(this, function (t) {
                  return (
                    (e = this),
                    [
                      2,
                      new Promise(function (t, n) {
                        try {
                          var r = e.localStorageService.get("sc.duid");
                          null === r || "" === r
                            ? new E({
                                excludeScreenResolution: !0,
                                excludePixelRatio: !0,
                                excludeAdBlock: !0,
                              }).get(function (n, r) {
                                e.localStorageService.set("sc.duid", n), t(n);
                              })
                            : t(r);
                        } catch (i) {
                          n(i);
                        }
                      }),
                    ]
                  );
                });
              });
            }),
            (e.prototype.getFingerprintPro = function () {
              return H(this, void 0, void 0, function () {
                var e, t, n, r, i;
                return K(this, function (o) {
                  switch (o.label) {
                    case 0:
                      return (
                        (t = (e = this).localStorageService.get("sc.duid.pro")),
                        (n = e.localStorageService.get(
                          "sc.duid.pro.timestamp"
                        )),
                        (r = -1),
                        n &&
                          (r = this.dateDiffInDays(
                            new Date(parseInt(n)),
                            new Date()
                          )),
                        null === t || "" === t || r > z
                          ? [
                              4,
                              G.load({
                                apiKey: X,
                                endpoint: [
                                  "https://fp.sample-cube.com",
                                  G.defaultEndpoint,
                                ],
                                scriptUrlPattern: [
                                  "https://fp.sample-cube.com/web/v<version>/<apiKey>/loader_v<loaderVersion>.js",
                                  G.defaultScriptUrlPattern,
                                ],
                              }),
                            ]
                          : [3, 3]
                      );
                    case 1:
                      return [4, o.sent().get()];
                    case 2:
                      return (
                        (i = o.sent()),
                        (this.visitorId = i.visitorId),
                        e.localStorageService.remove("sc.duid"),
                        e.localStorageService.remove("sc.duid.pro"),
                        e.localStorageService.remove("sc.duid.pro.timestamp"),
                        e.localStorageService.set("sc.duid", this.visitorId),
                        e.localStorageService.set(
                          "sc.duid.pro",
                          this.visitorId
                        ),
                        e.localStorageService.set(
                          "sc.duid.pro.timestamp",
                          new Date().getTime()
                        ),
                        [3, 4]
                      );
                    case 3:
                      (this.visitorId = t), (o.label = 4);
                    case 4:
                      return [2, new R(this.visitorId, r)];
                  }
                });
              });
            }),
            (e.prototype.dateDiffInDays = function (e, t) {
              var n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()),
                r = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
              return Math.floor((r - n) / 864e5);
            }),
            (e.ngInjectableDef = r.U({
              factory: function () {
                return new e(r.Y(U.a));
              },
              token: e,
              providedIn: "root",
            })),
            e
          );
        })(),
        W = n("IfdK"),
        j = n("cYL5"),
        q = n("A7o+"),
        Y = r.pb({ encapsulation: 0, styles: [[""]], data: {} });
      function Z(e) {
        return r.Lb(0, [], null, null);
      }
      function J(e) {
        return r.Lb(
          0,
          [
            (e()(),
            r.rb(
              0,
              0,
              null,
              null,
              1,
              "app-session",
              [],
              null,
              null,
              null,
              Z,
              Y
            )),
            r.qb(1, 245760, null, 0, w, [V, W.a, j.a, q.j], null, null),
          ],
          function (e, t) {
            e(t, 1, 0);
          },
          null
        );
      }
      var Q = r.nb("app-session", w, J, {}, {}, []),
        $ = n("Ip0R"),
        ee = n("gIcY"),
        te = n("M2Lx"),
        ne = n("Wf4p"),
        re = n("eDkP"),
        ie = n("Fzqc"),
        oe = n("o3x0"),
        ae = n("jQLj"),
        se = n("+p7G"),
        ce = n("uGex"),
        ue = n("ZYjt"),
        le = n("wmQ5"),
        de = n("v9Dh"),
        he = n("dWZg"),
        pe = n("UodH"),
        ge = n("8mMr"),
        fe = n("Z+uX"),
        me = n("SMsm"),
        ve = n("seP3"),
        Se = n("/VYK"),
        be = n("b716"),
        ye = n("4c35"),
        Te = n("qAlS"),
        we = n("lLAP"),
        Ee = n("9It4"),
        Re = n("de3e"),
        xe = n("kWGw"),
        Ce = n("Lwpp"),
        Ae = n("FVSy"),
        Me = n("LC5p"),
        Pe = n("r43C"),
        Oe = n("Nsh5"),
        _e = n("vvyD"),
        Ie = n("ZYCi"),
        Be = (function () {
          return function () {};
        })();
      n.d(t, "StartPageModuleNgFactory", function () {
        return Fe;
      });
      var Fe = r.ob(i, [], function (e) {
        return r.yb([
          r.zb(512, r.j, r.db, [
            [8, [o.a, a.b, a.a, s.a, c.a, Q]],
            [3, r.j],
            r.w,
          ]),
          r.zb(4608, $.m, $.l, [r.t, [2, $.v]]),
          r.zb(4608, ee.w, ee.w, []),
          r.zb(4608, ee.e, ee.e, []),
          r.zb(4608, te.c, te.c, []),
          r.zb(4608, ne.d, ne.d, []),
          r.zb(4608, re.a, re.a, [
            re.g,
            re.c,
            r.j,
            re.f,
            re.d,
            r.q,
            r.y,
            $.d,
            ie.b,
          ]),
          r.zb(5120, re.h, re.i, [re.a]),
          r.zb(5120, oe.b, oe.c, [re.a]),
          r.zb(4608, oe.d, oe.d, [
            re.a,
            r.q,
            [2, $.g],
            [2, oe.a],
            oe.b,
            [3, oe.d],
            re.c,
          ]),
          r.zb(4608, ae.i, ae.i, []),
          r.zb(5120, ae.a, ae.b, [re.a]),
          r.zb(4608, ne.c, se.a, [[2, ne.h]]),
          r.zb(5120, ce.a, ce.b, [re.a]),
          r.zb(4608, ue.f, ne.e, [
            [2, ne.i],
            [2, ne.m],
          ]),
          r.zb(4608, le.a, le.a, []),
          r.zb(5120, de.b, de.c, [re.a]),
          r.zb(1073742336, $.c, $.c, []),
          r.zb(1073742336, ie.a, ie.a, []),
          r.zb(1073742336, ne.m, ne.m, [[2, ne.f]]),
          r.zb(1073742336, he.b, he.b, []),
          r.zb(1073742336, ne.t, ne.t, []),
          r.zb(1073742336, pe.c, pe.c, []),
          r.zb(1073742336, ge.a, ge.a, []),
          r.zb(1073742336, fe.b, fe.b, []),
          r.zb(1073742336, me.b, me.b, []),
          r.zb(1073742336, ee.u, ee.u, []),
          r.zb(1073742336, ee.k, ee.k, []),
          r.zb(1073742336, ee.s, ee.s, []),
          r.zb(1073742336, te.d, te.d, []),
          r.zb(1073742336, ve.e, ve.e, []),
          r.zb(1073742336, Se.c, Se.c, []),
          r.zb(1073742336, be.c, be.c, []),
          r.zb(1073742336, ye.f, ye.f, []),
          r.zb(1073742336, Te.b, Te.b, []),
          r.zb(1073742336, re.e, re.e, []),
          r.zb(1073742336, oe.g, oe.g, []),
          r.zb(1073742336, we.a, we.a, []),
          r.zb(1073742336, ae.j, ae.j, []),
          r.zb(1073742336, ne.u, ne.u, []),
          r.zb(1073742336, ne.p, ne.p, []),
          r.zb(1073742336, Ee.c, Ee.c, []),
          r.zb(1073742336, Re.c, Re.c, []),
          r.zb(1073742336, ne.r, ne.r, []),
          r.zb(1073742336, ne.q, ne.q, []),
          r.zb(1073742336, ce.c, ce.c, []),
          r.zb(1073742336, xe.a, xe.a, []),
          r.zb(1073742336, Ce.d, Ce.d, []),
          r.zb(1073742336, le.b, le.b, []),
          r.zb(1073742336, Ae.e, Ae.e, []),
          r.zb(1073742336, Me.a, Me.a, []),
          r.zb(1073742336, ne.n, ne.n, []),
          r.zb(1073742336, Pe.a, Pe.a, []),
          r.zb(1073742336, de.e, de.e, []),
          r.zb(1073742336, Oe.h, Oe.h, []),
          r.zb(1073742336, _e.a, _e.a, []),
          r.zb(1073742336, Ie.p, Ie.p, [
            [2, Ie.v],
            [2, Ie.o],
          ]),
          r.zb(1073742336, Be, Be, []),
          r.zb(1073742336, i, i, []),
          r.zb(256, ne.g, ne.k, []),
          r.zb(
            1024,
            Ie.m,
            function () {
              return [[{ path: "", component: w }]];
            },
            []
          ),
        ]);
      });
    },
    WfvI: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return r;
      }),
        n.d(t, "a", function () {
          return i;
        });
      var r = (function (e) {
          return (
            (e[(e.NoData = 0)] = "NoData"),
            (e[(e.Cookie = 1)] = "Cookie"),
            (e[(e.Call = 2)] = "Call"),
            (e[(e.Failed = 3)] = "Failed"),
            e
          );
        })({}),
        i = (function (e) {
          return (
            (e[(e.ThirdPartyAPI = 0)] = "ThirdPartyAPI"),
            (e[(e.MarketCubeAPI = 1)] = "MarketCubeAPI"),
            e
          );
        })({});
    },
  },
]);
//# sourceMappingURL=6.8f386def0f3159dc8e95.js.map
