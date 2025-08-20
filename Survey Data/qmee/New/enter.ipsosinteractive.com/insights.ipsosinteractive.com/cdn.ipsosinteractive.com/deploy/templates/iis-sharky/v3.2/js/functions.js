!(function (A) {
  var F = A(window);
  A.fn.visible = function (A, t, e, B) {
    if (!(this.length < 1)) {
      var i = 1 < this.length ? this.eq(0) : this,
        n = i.get(0),
        g = A || 0.5,
        o = F.width(),
        s = window.innerHeight ? window.innerHeight : F.height(),
        a = ((B = B || "both"), !0 !== e || n.offsetWidth * n.offsetHeight);
      if ("function" == typeof n.getBoundingClientRect) {
        var r = n.getBoundingClientRect(),
          c = r.top >= -r.height * g && r.top < s,
          l = 0 < r.bottom && r.bottom <= s,
          h = 0 <= r.left && r.left < o,
          d = 0 < r.right && r.right <= o,
          Q = t ? c || l : c && l,
          D = t ? h || d : h && d;
        if ("both" === B) return a && Q && D;
        if ("vertical" === B) return a && Q;
        if ("horizontal" === B) return a && D;
      } else {
        var w = F.scrollTop() - i.height() * g,
          G = w + s,
          O = F.scrollLeft(),
          u = O + o,
          f = i.offset(),
          C = f.top,
          p = C + i.height(),
          I = f.left,
          E = I + i.width(),
          m = !0 === t ? p : C,
          b = !0 === t ? C : p,
          v = !0 === t ? E : I,
          H = !0 === t ? I : E;
        if ("both" === B) return !!a && b <= G && w <= m && H <= u && O <= v;
        if ("vertical" === B) return !!a && b <= G && w <= m;
        if ("horizontal" === B) return !!a && H <= u && O <= v;
      }
    }
  };
})(jQuery),
  (function (l) {
    l.fn.fishtip = function (A) {
      var c = {
        speed: 200,
        width: 0,
        position: "top",
        showDent: !0,
        offsetTop: 0,
        offsetLeft: 0,
        showEvents: "mouseenter",
        hideEvents: "mouseleave",
        showFor: 0,
        noShowClass: "",
      };
      return (
        l.extend(c, A),
        this.each(function () {
          var A = l(this);
          0 < c.showFor
            ? (e(A),
              setTimeout(function () {
                t(A);
              }, c.showFor))
            : (A.on(c.showEvents, function () {
                e(A);
              }),
              A.on(c.hideEvents, function () {
                t(A);
              }));
        })
      );
      function t(A) {
        A.data("tooltip").fadeOut(c.speed / 2);
      }
      function e(A) {
        if (void 0 === A.data("tooltip") || 0 == A.data("tooltip").length) {
          var t = c.position.toLowerCase(),
            e = "";
          (e =
            '<div class="fishtip-container fishtip-' +
            t +
            " dent-" +
            c.showDent +
            '">'),
            (e += '    <div class="fishtip-inner">'),
            (e += '        <div class="fishtip-content">' + c.text + "</div>"),
            (e += "    </div>"),
            (e += "</div>"),
            A.append(e);
          var i = A.find(".fishtip-container");
          A.data("tooltip", i), 0 < c.width && i.width(c.width);
          var B = i.outerWidth(),
            n = i.outerHeight(),
            g = A.width(),
            o = A.height(),
            s = 0,
            a = 0,
            r = c.showDent ? 8 : 0;
          "top" == t
            ? ((s = -(n + r)), (a = (g - B) / 2))
            : "bottom" == t
            ? ((s = o + r), (a = (g - B) / 2))
            : "left" == t
            ? ((s = (o - n) / 2), (a = -(B + r)))
            : "right" == t && ((s = (o - n) / 2), (a = g + r)),
            i.css({
              left: a + c.offsetLeft + "px",
              top: s + c.offsetTop + "px",
            }),
            "cursor" == t &&
              A.on("mousemove", function (A) {
                var t = l(this).offset(),
                  e = A.pageX - t.left,
                  B = A.pageY - t.top;
                (leftOffset = 0 == c.offsetLeft ? 10 : c.offsetLeft),
                  (topOffset = 0 == c.offsetTop ? 10 : c.offsetTop),
                  i.css({
                    left: e + leftOffset + "px",
                    top: B + topOffset + "px",
                  });
              }),
            (0 == c.noShowClass.length ||
              (c.noShowClass.length && !A.hasClass(c.noShowClass))) &&
              A.data("tooltip").fadeIn(c.speed);
        } else
          (0 == c.noShowClass.length ||
            (c.noShowClass.length && !A.hasClass(c.noShowClass))) &&
            A.data("tooltip").fadeIn(c.speed);
      }
    };
  })(jQuery);
try {
  var openedWindow = null,
    pattern =
      "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
  0 <= window.location.hostname.indexOf(".") &&
    (window.location.hostname.toString().match(new RegExp(pattern))
      ? (document.domain = window.location.hostname)
      : (document.domain = window.location.hostname.substr(
          window.location.hostname.indexOf(".") + 1
        )));
} catch (A) {}
!(function (A, g) {
  function o() {
    var A = d.elements;
    return "string" == typeof A ? A.split(" ") : A;
  }
  function s(A) {
    var t = h[A[n]];
    return t || ((t = {}), l++, (A[n] = l), (h[l] = t)), t;
  }
  function a(A, t, e) {
    return (
      t || (t = g),
      c
        ? t.createElement(A)
        : (e || (e = s(t)),
          (t = e.cache[A]
            ? e.cache[A].cloneNode()
            : i.test(A)
            ? (e.cache[A] = e.createElem(A)).cloneNode()
            : e.createElem(A)).canHaveChildren && !B.test(A)
            ? e.frag.appendChild(t)
            : t)
    );
  }
  function t(A) {
    A || (A = g);
    var t,
      e,
      B = s(A);
    if (d.shivCSS && !r && !B.hasCSS) {
      var i,
        n = A;
      (i = n.createElement("p")),
        (n = n.getElementsByTagName("head")[0] || n.documentElement),
        (i.innerHTML =
          "x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>"),
        (i = n.insertBefore(i.lastChild, n.firstChild)),
        (B.hasCSS = !!i);
    }
    return (
      c ||
        ((t = A),
        (e = B).cache ||
          ((e.cache = {}),
          (e.createElem = t.createElement),
          (e.createFrag = t.createDocumentFragment),
          (e.frag = e.createFrag())),
        (t.createElement = function (A) {
          return d.shivMethods ? a(A, t, e) : e.createElem(A);
        }),
        (t.createDocumentFragment = Function(
          "h,f",
          "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
            o()
              .join()
              .replace(/[\w\-]+/g, function (A) {
                return (
                  e.createElem(A), e.frag.createElement(A), 'c("' + A + '")'
                );
              }) +
            ");return n}"
        )(d, e.frag))),
      A
    );
  }
  var r,
    c,
    e = A.html5 || {},
    B = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
    i =
      /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
    n = "_html5shiv",
    l = 0,
    h = {};
  !(function () {
    try {
      var A,
        t = g.createElement("a");
      if (
        ((t.innerHTML = "<xyz></xyz>"),
        (r = "hidden" in t),
        !(A = 1 == t.childNodes.length))
      ) {
        g.createElement("a");
        var e = g.createDocumentFragment();
        A =
          void 0 === e.cloneNode ||
          void 0 === e.createDocumentFragment ||
          void 0 === e.createElement;
      }
      c = A;
    } catch (A) {
      c = r = !0;
    }
  })();
  var d = {
    elements:
      e.elements ||
      "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
    version: "3.7.0",
    shivCSS: !1 !== e.shivCSS,
    supportsUnknownElements: c,
    shivMethods: !1 !== e.shivMethods,
    type: "default",
    shivDocument: t,
    createElement: a,
    createDocumentFragment: function (A, t) {
      if ((A || (A = g), c)) return A.createDocumentFragment();
      for (
        var e = (t = t || s(A)).frag.cloneNode(), B = 0, i = o(), n = i.length;
        B < n;
        B++
      )
        e.createElement(i[B]);
      return e;
    },
  };
  (A.html5 = d), t(g);
})(this, document),
  ($.fn.lightBox = function (A) {
    var i;
    return (
      $(document.body).css("height", "100%"),
      this.each(function () {
        var A = {
          backgroundColor: "#AAAAAA",
          backgroundOpacity: "0.5",
          closeImageURL:
            "https://cdn.ipsosinteractive.com/deploy/resources/scripts/lightbox/img/close.png",
          closeHeight: "21px",
          closeWidth: "21px",
          offset: "50",
          borderColor: "#dddddd",
          borderWidth: "5px",
          cache: !0,
          instructionCSS:
            "https://cdn.ipsosinteractive.com/deploy/resources/scripts/lightbox/lightbox.css",
        };
        if (
          ($(this).attr("closeInstructionText")
            ? (A.instructionText = $(this).attr("closeInstructionText"))
            : (A.instructionText = "Click here to close the window."),
          $(this).attr("params"))
        )
          for (
            var t = $(this).attr("params").replace(/ /g, "").split(","), e = 0;
            e < t.length;
            e++
          )
            2 == (i = t[e].split(":")).length && (A[i[0]] = i[1]);
        $(this).hover(
          function () {
            $(this).css("cursor", "pointer");
          },
          function () {
            $(this).css("cursor", "auto");
          }
        );
        var B = "";
        switch (this.tagName.toUpperCase()) {
          case "IMG":
            B = $(this)
              .attr("src")
              .replace(
                $(this).attr("src").split("/")[
                  $(this).attr("src").split("/").length - 1
                ],
                $(this).attr("bigPic")
              );
            break;
          case "A":
            B = $(this).attr("href");
        }
        $(this).click(function () {
          if (($.fn.lightBox.display(B, A), "A" == this.tagName.toUpperCase()))
            return !1;
        });
      })
    );
  }),
  ($.fn.lightBox.display = function (A, t) {
    var e = { image: A, html: [], lightBox: { height: 0, width: 0 } };
    e.html.push(
      '<link href="' + t.instructionCSS + '" rel="stylesheet" type="text/css">'
    ),
      e.html.push(
        '<div class="iis_lightbox outer background" style="background-color: ' +
          t.backgroundColor.replace(/'/g, "") +
          "; opacity: " +
          t.backgroundOpacity.replace(/'/g, "") +
          "; filter: alpha(opacity=" +
          100 * t.backgroundOpacity.replace(/'/g, "") +
          '); height: 100%; width: 100%; top: 0px; left: 0px; position: absolute;"></div>'
      ),
      e.html.push(
        '<div class="iis_lightbox outer lightbox-container" style="height: 100%; width: 100%; top: 0px; position: absolute; text-align:center;">'
      ),
      e.html.push(
        '<div class="iis_lightbox inner lightbox-container" style="left: 50%; position: absolute; visibility: hidden; margin-topp: ' +
          $(window).scrollTop() +
          t.offset.replace(/'/g, "") +
          'px; ">'
      ),
      e.html.push(
        '<img class="iis_lightbox" src="' +
          e.image +
          '" style="border: ' +
          t.borderWidth.replace(/'/g, "") +
          " solid " +
          t.borderColor.replace(/'/g, "") +
          ';" />'
      ),
      e.html.push(
        '<div class="iis_lightbox pictureInstruction"><center><table><tr><td class="instrLeft">&nbsp;</td><td  class="instrMain">' +
          t.instructionText +
          '</td><td class="instrRight">&nbsp;</td></tr></table></center></div>'
      ),
      "" != t.closeHeight &&
        "" != t.closeWidth &&
        e.html.push(
          '<span class="iis_lightbox close" style="background-image: url(' +
            t.closeImageURL +
            "); border: " +
            t.borderWidth.replace(/'/g, "") +
            " solid " +
            t.borderColor.replace(/'/g, "") +
            "; height: " +
            ($.support.boxModel
              ? t.closeHeight
              : parseInt(t.closeHeight) + 2 * parseInt(t.borderWidth) + "px") +
            "; width: " +
            ($.support.boxModel
              ? t.closeWidth
              : parseInt(t.closeWidth) +
                2 * parseInt(t.borderWidth.replace(/'/g, "")) +
                "px") +
            '; top: -20px; right: -20px; position: absolute;"></span>'
        ),
      e.html.push("</div>"),
      e.html.push("</div>"),
      $("select").css("visibility", "hidden"),
      $(document.body).append(e.html.join("")),
      $("div.iis_lightbox.outer").click(function () {
        $("select").css("visibility", "visible"),
          $("div.iis_lightbox.outer").remove();
      }),
      $("img.iis_lightbox").load(function () {
        (e.lightBox.width = $(this).parent().width()),
          $("div.iis_lightbox.inner.lightbox-container").css(
            "margin-top",
            $(window).scrollTop() + parseInt(t.offset.replace(/'/g, ""))
          ),
          $("div.iis_lightbox.inner.lightbox-container").css(
            "margin-left",
            Math.floor(e.lightBox.width / -2) + "px"
          ),
          $("div.iis_lightbox.inner.lightbox-container").css(
            "visibility",
            "visible"
          ),
          $("div.iis_lightbox.outer").css("height", $(document).height()),
          $("div.iis_lightbox.outer").css("zIndex", "9999");
      }),
      $("span.iis_lightbox.close").hover(
        function () {
          $(this).css("background-position", "0px " + t.closeHeight);
        },
        function () {
          $(this).css("background-position", "0px 0px");
        }
      );
  });
var openedWindow = null;
function OpenPopUpWindow(A, t) {
  location.protocol;
  var e =
    ("https:" == window.location.protocol ? "https:" : "http:") +
    "//cdn.ipsosinteractive.com/deploy/resources/scripts/popup-picture/popup.html";
  t.width || (t.width = 200),
    t.height || (t.height = 133),
    t.lang || (t.lang = 9);
  var B =
      "top=" +
      (screen.height / 2 - t.height / 2) +
      ",left=" +
      (screen.width / 2 - t.width / 2) +
      ",height=" +
      t.height +
      ",width=" +
      (t.width + 40) +
      ",fullscreen=0,directories=0,location=0,menubar=0,scrollbars=1,status=0,titlebar=0,toolbar=0",
    i = "p=" + A + "&lang=" + t.lang + "&w=" + t.width + "&h=" + t.height;
  openedWindow = window.open(e + "?" + i, "_blank", B);
}
function noBack() {
  history.forward();
}
function tell(A) {
  "object" == typeof console && console.log(A);
}
function getQuestionProperty(A) {
  var t = $(".customquestionproperties:first").text(),
    e = "";
  return -1 != t.search(A) && (e = t.split(A + ":")[1].split("]")[0]), e;
}
function loadFiles(A, t) {
  for (
    var e = A.length,
      B = function () {
        0;
      },
      i = [],
      n = 0;
    n < e;
    n++
  )
    -1 != A[n].indexOf(".css")
      ? $("head").append(
          "<link rel='stylesheet' type='text/css' href='" + A[n] + "' />"
        )
      : i.push($.getScript(A[n], B));
  $.when.apply(null, i).then(function () {
    t && t();
  });
}
$(document).ready(function () {
  if (document.getElementsByTagName("form")[0] && top)
    try {
      if (top.location.href !== window.location.href) {
        for (
          var A = "?",
            t = document
              .getElementsByTagName("form")[0]
              .getElementsByTagName("input"),
            e = 0;
          e < 5;
          e++
        )
          "?" != A && (A += "&"), (A += t[e].name + "=" + t[e].value);
        if (document.getElementById("sessionVars")) {
          var B = document
            .getElementById("sessionVars")
            .getElementsByTagName("input");
          for (e = 0; e < B.length; e++)
            "?" != A && (A += "&"), (A += B[e].name + "=" + B[e].value);
        }
        var i = "surveys",
          n = top.location.href;
        0 <= n.indexOf("surveystest")
          ? (i = "surveystest")
          : 0 <= n.indexOf("surveys_test")
          ? (i = "surveys_test")
          : 0 <= n.indexOf("surveys2") && (i = "surveys2");
        var g = document.createElement("iframe");
        g.setAttribute("id", "iframe"),
          g.setAttribute(
            "src",
            top.location.protocol +
              "//" +
              top.location.hostname +
              "/" +
              i +
              "/sessionControl.aspx" +
              A
          ),
          g.setAttribute("style", "position:relative; left:-200px"),
          g.setAttribute("width", "0px"),
          g.setAttribute("height", "0px"),
          g.setAttribute("aria-hidden", "true"),
          g.setAttribute("tabindex", "-1"),
          g.setAttribute("title", "empty"),
          document.body.appendChild(g);
      }
    } catch (A) {}
}),
  eval(
    (function (A, t, e, B, i, n) {
      if (
        ((i = function (A) {
          return (
            (A < 62 ? "" : i(parseInt(A / 62))) +
            (35 < (A %= 62) ? String.fromCharCode(A + 29) : A.toString(36))
          );
        }),
        !"".replace(/^/, String))
      ) {
        for (; e--; ) n[i(e)] = B[e] || i(e);
        (B = [
          function (A) {
            return n[A];
          },
        ]),
          (i = function () {
            return "\\w+";
          }),
          (e = 1);
      }
      for (; e--; )
        B[e] && (A = A.replace(new RegExp("\\b" + i(e) + "\\b", "g"), B[e]));
      return A;
    })(
      '6 18=q(){1B.17.J=q(){r z.13(/^\\s+|\\s+$/,\'\')};6 d=H.1q(1t H());6 e=I;6 f={};6 g={"B":"9,0,0,0"};5(4.8>0){5(7 4[0].B!="v"){g.B=4[0].B}}6 h={"1a":1b,"1c":1d,"1e":"1f"+d,"1j":"","1k":"1l","G":"","1m":"1n/x-1o-1p"};6 i={"F":"","1u":I,"1x":A,"O":A,"P":"Q","R":"S","T":"#U","V":"W","X":"","Y":"","Z":"A","10":"11","12":"","19":"","14":A,"15":"16","p":""};6 j=q(a){5(7 a!="u"){r""}6 b="";w(6 c y a){5(a[c].C().J()!==""){b+="<1g 1h=\\""+c+"\\""+" 1i=\\""+a[c]+"\\" />\\n"}}r b};6 k=q(a,b){5(7 a!="u"||7 b!="u"){r N}w(6 c y b){5(7 b[c]!="v"){a[c]=b[c]}}r a};6 l=q(a){5(7 a!="u"){r}i.F=h.G=a.D};6 m=q(a,b){5(7 a!="u"||7 b!="u"){r N}w(6 c y b){5(7 a[c]!="v"){a[c]=b[c]}}r a};6 n=q(){5(4.8==2&&7 4[0]=="E"){i.p+=(i.p.C().8>0?"&":"")+4[0]+"="+4[1]}t 5(4.8==1&&7 4[0]=="E"){i.p+=(i.p.C().8>0?"&":"")+4[0]}t{w(6 a y 4[0]){5(7 4[0][a]!="v"){i.p+=(i.p.C().8>0?"&":"")+a+"="+4[0][a]}}}};z.1r=q(){6 a={};5(4.8==2&&7 4[0]=="E"){a[4[0]]=4[1]}t{a=4[0]}h=m(h,a);i=m(i,a);l(a)};z.1s=n;z.K=q(){5(4.8==1&&7 4[0]=="L"){e=4[0]}};z.1v=q(){6 a="<u";w(6 b y h){5(7 h[b]!="v"&&h[b]!==""){a+=" "+b+"=\\""+h[b]+"\\""}}a+=">\\n";f.p=i.p;5(e){i=k(i,f);a+=j(i)}t{f.p=i.p;a+=j(f)}a+="</u>";5(7 4[0]=="L"){5(4[0]){1w(a)}t{r a}}t 5(7 4[0]=="E"){M.1y(4[0]).1z=a}t{M.1A(a)}};5(4.8>0){5(4.8>=3){z.K(4[2])}5(4.8>=2){n(4[1])}5(4.8>=1){h=m(h,4[0]);5(e){i=m(i,4[0]);l(4[0])}t{w(6 o y 4[0]){5(7 i[o]!=="v"){f[o]=4[0][o]}}h.G=1C.D;5(7 4[0].D!="v"){f["F"]=4[0].D}}}}};',
      0,
      101,
      "||||arguments|if|var|typeof|length|||||||||||||||||flashvars|function|return||else|object|undefined|for||in|this|false|version|toString|src|string|movie|data|Date|true|trim|setMergeOption|boolean|document|null|menu|quality|best|wmode|opaque|bgcolor|FFFFFF|scale|showall|salign|base|swliveconnect|allowscriptaccess|always|devicefont|replace|allowfullscreen|allownetworking|all|prototype|writeFlashObject|seamlesstabbing|width|500|height|400|id|flashMovie|param|name|value|class|align|top|type|application|shockwave|flash|parse|addNewOption|addNewFlashVar|new|play|WriteObject|alert|loop|getElementById|innerHTML|writeln|String|arr".split(
        "|"
      ),
      0,
      {}
    )
  ),
  Array.prototype.reduce ||
    (Array.prototype.reduce = function (A) {
      var t = this.length;
      if ("function" != typeof A) throw new TypeError();
      if (0 == t && 1 == arguments.length) throw new TypeError();
      var e = 0;
      if (2 <= arguments.length) var B = arguments[1];
      else
        for (;;) {
          if (e in this) {
            B = this[e++];
            break;
          }
          if (++e >= t) throw new TypeError();
        }
      for (; e < t; e++) e in this && (B = A.call(null, B, this[e], e, this));
      return B;
    }),
  Array.prototype.indexOf ||
    (Array.prototype.indexOf = function (A, t) {
      var e;
      if (null == this) throw new TypeError('"this" is null or not defined');
      var B = Object(this),
        i = B.length >>> 0;
      if (0 === i) return -1;
      var n = +t || 0;
      if ((Math.abs(n) === 1 / 0 && (n = 0), i <= n)) return -1;
      for (e = Math.max(0 <= n ? n : i - Math.abs(n), 0); e < i; ) {
        if (e in B && B[e] === A) return e;
        e++;
      }
      return -1;
    }),
  ($.fn.otherBehaviour = function (A) {
    var t = $.extend({ checked: !1 }, A);
    return this.each(function () {
      var A = $(this).val();
      t.checked
        ? 0 == A.length && $(this).focus().val($(this).data("initial-value"))
        : 0 != A.length && $(this).data("initial-value", A).val("");
    });
  }),
  function () {
    function A() {}
    function n(A, t) {
      for (var e = A.length; e--; ) if (A[e].listener === t) return e;
      return -1;
    }
    function t(A) {
      return function () {
        return this[A].apply(this, arguments);
      };
    }
    var e = A.prototype,
      B = this,
      i = B.EventEmitter;
    (e.getListeners = function (A) {
      var t,
        e,
        B = this._getEvents();
      if ("object" == typeof A)
        for (e in ((t = {}), B))
          B.hasOwnProperty(e) && A.test(e) && (t[e] = B[e]);
      else t = B[A] || (B[A] = []);
      return t;
    }),
      (e.flattenListeners = function (A) {
        var t,
          e = [];
        for (t = 0; A.length > t; t += 1) e.push(A[t].listener);
        return e;
      }),
      (e.getListenersAsObject = function (A) {
        var t,
          e = this.getListeners(A);
        return e instanceof Array && ((t = {})[A] = e), t || e;
      }),
      (e.addListener = function (A, t) {
        var e,
          B = this.getListenersAsObject(A),
          i = "object" == typeof t;
        for (e in B)
          B.hasOwnProperty(e) &&
            -1 === n(B[e], t) &&
            B[e].push(i ? t : { listener: t, once: !1 });
        return this;
      }),
      (e.on = t("addListener")),
      (e.addOnceListener = function (A, t) {
        return this.addListener(A, { listener: t, once: !0 });
      }),
      (e.once = t("addOnceListener")),
      (e.defineEvent = function (A) {
        return this.getListeners(A), this;
      }),
      (e.defineEvents = function (A) {
        for (var t = 0; A.length > t; t += 1) this.defineEvent(A[t]);
        return this;
      }),
      (e.removeListener = function (A, t) {
        var e,
          B,
          i = this.getListenersAsObject(A);
        for (B in i)
          i.hasOwnProperty(B) && -1 !== (e = n(i[B], t)) && i[B].splice(e, 1);
        return this;
      }),
      (e.off = t("removeListener")),
      (e.addListeners = function (A, t) {
        return this.manipulateListeners(!1, A, t);
      }),
      (e.removeListeners = function (A, t) {
        return this.manipulateListeners(!0, A, t);
      }),
      (e.manipulateListeners = function (A, t, e) {
        var B,
          i,
          n = A ? this.removeListener : this.addListener,
          g = A ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
          for (B = e.length; B--; ) n.call(this, t, e[B]);
        else
          for (B in t)
            t.hasOwnProperty(B) &&
              (i = t[B]) &&
              ("function" == typeof i
                ? n.call(this, B, i)
                : g.call(this, B, i));
        return this;
      }),
      (e.removeEvent = function (A) {
        var t,
          e = typeof A,
          B = this._getEvents();
        if ("string" === e) delete B[A];
        else if ("object" === e)
          for (t in B) B.hasOwnProperty(t) && A.test(t) && delete B[t];
        else delete this._events;
        return this;
      }),
      (e.removeAllListeners = t("removeEvent")),
      (e.emitEvent = function (A, t) {
        var e,
          B,
          i,
          n = this.getListenersAsObject(A);
        for (i in n)
          if (n.hasOwnProperty(i))
            for (B = n[i].length; B--; )
              !0 === (e = n[i][B]).once && this.removeListener(A, e.listener),
                e.listener.apply(this, t || []) ===
                  this._getOnceReturnValue() &&
                  this.removeListener(A, e.listener);
        return this;
      }),
      (e.trigger = t("emitEvent")),
      (e.emit = function (A) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(A, t);
      }),
      (e.setOnceReturnValue = function (A) {
        return (this._onceReturnValue = A), this;
      }),
      (e._getOnceReturnValue = function () {
        return (
          !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        );
      }),
      (e._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (A.noConflict = function () {
        return (B.EventEmitter = i), A;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return A;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = A)
        : (this.EventEmitter = A);
  }.call(this),
  (function (e) {
    function B(A) {
      var t = e.event;
      return (t.target = t.target || t.srcElement || A), t;
    }
    var A = document.documentElement,
      t = function () {};
    A.addEventListener
      ? (t = function (A, t, e) {
          A.addEventListener(t, e, !1);
        })
      : A.attachEvent &&
        (t = function (t, A, e) {
          (t[A + e] = e.handleEvent
            ? function () {
                var A = B(t);
                e.handleEvent.call(e, A);
              }
            : function () {
                var A = B(t);
                e.call(t, A);
              }),
            t.attachEvent("on" + A, t[A + e]);
        });
    var i = function () {};
    A.removeEventListener
      ? (i = function (A, t, e) {
          A.removeEventListener(t, e, !1);
        })
      : A.detachEvent &&
        (i = function (t, e, B) {
          t.detachEvent("on" + e, t[e + B]);
          try {
            delete t[e + B];
          } catch (A) {
            t[e + B] = void 0;
          }
        });
    var n = { bind: t, unbind: i };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", n)
      : (e.eventie = n);
  })(this),
  (function (e, B) {
    "function" == typeof define && define.amd
      ? define(
          ["eventEmitter/EventEmitter", "eventie/eventie"],
          function (A, t) {
            return B(e, A, t);
          }
        )
      : "object" == typeof exports
      ? (module.exports = B(
          e,
          require("wolfy87-eventemitter"),
          require("eventie")
        ))
      : (e.imagesLoaded = B(e, e.EventEmitter, e.eventie));
  })(window, function (A, t, e) {
    function i(A, t) {
      for (var e in t) A[e] = t[e];
      return A;
    }
    function n(A) {
      var t,
        e = [];
      if (((t = A), "[object Array]" === c.call(t))) e = A;
      else if ("number" == typeof A.length)
        for (var B = 0, i = A.length; B < i; B++) e.push(A[B]);
      else e.push(A);
      return e;
    }
    function g(A, t, e) {
      if (!(this instanceof g)) return new g(A, t);
      "string" == typeof A && (A = document.querySelectorAll(A)),
        (this.elements = n(A)),
        (this.options = i({}, this.options)),
        "function" == typeof t ? (e = t) : i(this.options, t),
        e && this.on("always", e),
        this.getImages(),
        s && (this.jqDeferred = new s.Deferred());
      var B = this;
      setTimeout(function () {
        B.check();
      });
    }
    function B(A) {
      this.img = A;
    }
    function o(A) {
      (this.src = A), (l[A] = this);
    }
    var s = A.jQuery,
      a = A.console,
      r = void 0 !== a,
      c = Object.prototype.toString;
    ((g.prototype = new t()).options = {}),
      (g.prototype.getImages = function () {
        this.images = [];
        for (var A = 0, t = this.elements.length; A < t; A++) {
          var e = this.elements[A];
          "IMG" === e.nodeName && this.addImage(e);
          var B = e.nodeType;
          if (B && (1 === B || 9 === B || 11 === B))
            try {
              for (
                var i = e.querySelectorAll("img"), n = 0, g = i.length;
                n < g;
                n++
              ) {
                var o = i[n];
                this.addImage(o);
              }
            } catch (A) {}
        }
      }),
      (g.prototype.addImage = function (A) {
        var t = new B(A);
        this.images.push(t);
      }),
      (g.prototype.check = function () {
        function A(A, t) {
          return (
            e.options.debug && r && a.log("confirm", A, t),
            e.progress(A),
            ++B === i && e.complete(),
            !0
          );
        }
        var e = this,
          B = 0,
          i = this.images.length;
        if (((this.hasAnyBroken = !1), i))
          for (var t = 0; t < i; t++) {
            var n = this.images[t];
            n.on("confirm", A), n.check();
          }
        else this.complete();
      }),
      (g.prototype.progress = function (A) {
        this.hasAnyBroken = this.hasAnyBroken || !A.isLoaded;
        var t = this;
        setTimeout(function () {
          t.emit("progress", t, A),
            t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, A);
        });
      }),
      (g.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var e = this;
        setTimeout(function () {
          if ((e.emit(t, e), e.emit("always", e), e.jqDeferred)) {
            var A = e.hasAnyBroken ? "reject" : "resolve";
            e.jqDeferred[A](e);
          }
        });
      }),
      s &&
        (s.fn.imagesLoaded = function (A, t) {
          return new g(this, A, t).jqDeferred.promise(s(this));
        }),
      ((B.prototype = new t()).check = function () {
        var A = l[this.img.src] || new o(this.img.src);
        if (A.isConfirmed) this.confirm(A.isLoaded, "cached was confirmed");
        else if (this.img.complete && void 0 !== this.img.naturalWidth)
          this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
        else {
          var e = this;
          A.on("confirm", function (A, t) {
            return e.confirm(A.isLoaded, t), !0;
          }),
            A.check();
        }
      }),
      (B.prototype.confirm = function (A, t) {
        (this.isLoaded = A), this.emit("confirm", this, t);
      });
    var l = {};
    return (
      ((o.prototype = new t()).check = function () {
        if (!this.isChecked) {
          var A = new Image();
          e.bind(A, "load", this),
            e.bind(A, "error", this),
            (A.src = this.src),
            (this.isChecked = !0);
        }
      }),
      (o.prototype.handleEvent = function (A) {
        var t = "on" + A.type;
        this[t] && this[t](A);
      }),
      (o.prototype.onload = function (A) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(A);
      }),
      (o.prototype.onerror = function (A) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(A);
      }),
      (o.prototype.confirm = function (A, t) {
        (this.isConfirmed = !0),
          (this.isLoaded = A),
          this.emit("confirm", this, t);
      }),
      (o.prototype.unbindProxyEvents = function (A) {
        e.unbind(A.target, "load", this), e.unbind(A.target, "error", this);
      }),
      g
    );
  }),
  ($.fn.equalHeight = function () {
    var B = [];
    return (
      this.css("height", ""),
      $.each(this, function (A, t) {
        var e;
        ($element = $(t)),
          (e =
            "border-box" == $element.css("box-sizing") ||
            "border-box" == $element.css("-moz-box-sizing")
              ? $element.innerHeight()
              : $element.height()),
          B.push(e);
      }),
      this.css("height", Math.max.apply(window, B) + "px"),
      this
    );
  });
var minLoop = function (A) {
    for (var t = A.length, e = 1 / 0; t--; ) A[t] < e && (e = A[t]);
    return e;
  },
  maxLoop = function (A) {
    for (var t = A.length, e = -1 / 0; t--; ) A[t] > e && (e = A[t]);
    return e;
  };
function OverlayMaster(A) {
  (this.Title = ""),
    (this.Message = "Message placeholder."),
    (this.OkButton = "Ok"),
    (this.ModalType = "error"),
    (this.ButtonAlignment = "right"),
    (this.Animate = !0),
    (this.CanCloseAfter = 0),
    $.extend(this, A),
    this.makeOverlay(),
    this.events();
}
function StickyHeaderObj(A, t) {
  (this.theContainer = A.addClass("StickyHeader")),
    (this.theControls = A.find(".the-controls")),
    (this.thePictureTop = A.find(".pictureTop")),
    (this.thePictureBottom = A.find(".pictureBottom")),
    this.init();
}
($.wait = function (t) {
  return $.Deferred(function (A) {
    setTimeout(A.resolve, t);
  });
}),
  (OverlayMaster.prototype.makeOverlay = function () {
    this.modalIdentifier = "modalNo" + $(".iisSharky-modalWindow").length;
    var A = "";
    (A +=
      "<div class='iisSharky-modalWindow " +
      this.modalIdentifier +
      " " +
      (this.Animate ? "fade" : "") +
      " type-" +
      this.ModalType +
      "' style='display:none;'>"),
      (A += "\t<div class='modalShadow'></div>"),
      (A +=
        '\t<div class="modalContents"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
        (0 < this.Title.length
          ? '<div class="bootstrap-dialog-header"><div class="bootstrap-dialog-close-button"><button class="close">×</button></div><div class="bootstrap-dialog-title">' +
            this.Title +
            "</div></div>"
          : "") +
        '</div><div class="modal-body"><div class="bootstrap-dialog-body"><div class="bootstrap-dialog-message">' +
        this.Message +
        '</div></div></div><div class="modal-footer" style="display: block;"><div class="bootstrap-dialog-footer"><div class="bootstrap-dialog-footer-buttons ' +
        this.ButtonAlignment +
        '"><button class="btn btn-default">' +
        this.OkButton +
        "</button></div></div></div></div></div></div>"),
      (A += "</div>"),
      $("body").append(A),
      (this.element = $(".iisSharky-modalWindow." + this.modalIdentifier)),
      (this.shadow = this.element.find(".modalShadow")),
      (this.button = this.element.find(".btn-default")),
      (this.closeButton = this.element.find(".bootstrap-dialog-close-button"));
  }),
  (OverlayMaster.prototype.show = function () {
    var A = this;
    this.element.css("display", "block"),
      $("body").data("modalIsOpen") ||
        $("body").data("modalIsOpen", this.modalIdentifier),
      $.wait(300).then(function () {
        A.element.addClass("in"), $("body").css("overflow", "hidden");
      });
  }),
  (OverlayMaster.prototype.hide = function () {
    var A = this;
    this.element.removeClass("in"),
      $("body").data("modalIsOpen") == A.modalIdentifier &&
        $("body").data("modalIsOpen", ""),
      $.wait(300).then(function () {
        A.element.css("display", "none"),
          $("body").data("modalIsOpen") || $("body").css("overflow", "");
      });
  }),
  (OverlayMaster.prototype.events = function () {
    var A = this;
    0 < A.CanCloseAfter && A.button.add(A.closeButton).addClass("disabled"),
      $.wait(A.CanCloseAfter).then(function () {
        A.button.add(A.closeButton).removeClass("disabled"),
          A.shadow
            .add(A.button)
            .add(A.closeButton)
            .on("click", function () {
              A.hide();
            });
      });
  }),
  Array.prototype.forEach ||
    (Array.prototype.forEach = function (A, t) {
      var e, B;
      if (null == this) throw new TypeError(" this is null or not defined");
      var i = Object(this),
        n = i.length >>> 0;
      if ("function" != typeof A) throw new TypeError(A + " is not a function");
      for (1 < arguments.length && (e = t), B = 0; B < n; ) {
        var g;
        B in i && ((g = i[B]), A.call(e, g, B, i)), B++;
      }
    }),
  (function (A, t) {
    "function" == typeof define && define.amd
      ? define([], t)
      : "object" == typeof exports
      ? (module.exports = t())
      : (A.FontLoader = t());
  })(window, function () {
    var A,
      t = /MSIE/i.test(navigator.userAgent),
      e = null;
    t &&
      null !==
        (A = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(
          navigator.userAgent
        )) &&
      (e = parseFloat(A[1]));
    function c(A, t, e, B) {
      (this.delegate = t),
        (this.timeout = void 0 !== e ? e : 3e3),
        (this._fontsArray = this._parseFonts(A)),
        (this._testDiv = null),
        (this._testContainer = null),
        (this._adobeBlankSizeWatcher = null),
        (this._sizeWatchers = []),
        (this._timeoutId = null),
        (this._intervalId = null),
        (this._intervalDelay = 50),
        (this._numberOfLoadedFonts = 0),
        (this._numberOfFonts = this._fontsArray.length),
        (this._fontsMap = {}),
        (this._finished = !1),
        (this._document = B || document);
    }
    function o(A, t) {
      (this.width = A), (this.height = t);
    }
    function l(A, t) {
      (this._element = A),
        (this._delegate = t.delegate),
        (this._size = null),
        (this._continuous = !!t.continuous),
        (this._direction = t.direction ? t.direction : l.directions.both),
        (this._dimension = t.dimension ? t.dimension : l.dimensions.both),
        (this._sizeIncreaseWatcherContentElm = null),
        (this._sizeDecreaseWatcherElm = null),
        (this._sizeIncreaseWatcherElm = null),
        (this._state = l.states.initialized),
        (this._scrollAmount = 2),
        (this._document = t.document || document),
        this._generateScrollWatchers(t.size),
        this._appendScrollWatchersToElement(t.container);
    }
    return (
      (c.useAdobeBlank = !1),
      (c.useResizeEvent = t && e < 11 && void 0 !== document.attachEvent),
      (c.useIntervalChecking =
        window.opera || (t && e < 11 && !c.useResizeEvent)),
      (c.referenceText =
        " !\"\\#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~"),
      (c.referenceFontFamilies = c.useAdobeBlank
        ? ["AdobeBlank"]
        : ["serif", "cursive"]),
      (c.adobeBlankFontFaceStyleId = "fontLoaderAdobeBlankFontFace"),
      (c.adobeBlankReferenceSize = null),
      (c.referenceFontFamilyVariationSizes = {}),
      (c.adobeBlankFontFaceRule =
        "@font-face{ font-family:AdobeBlank; src:url('data:font/opentype;base64,T1RUTwAKAIAAAwAgQ0ZGIM6ZbkwAAEPEAAAZM0RTSUcAAAABAABtAAAAAAhPUy8yAR6vMwAAARAAAABgY21hcDqI98oAACjEAAAa4GhlYWT+BQILAAAArAAAADZoaGVhCCID7wAAAOQAAAAkaG10eAPoAHwAAFz4AAAQBm1heHAIAVAAAAABCAAAAAZuYW1lD/tWxwAAAXAAACdScG9zdP+4ADIAAEOkAAAAIAABAAAAAQj1Snw1O18PPPUAAwPoAAAAAM2C2p8AAAAAzYLanwB8/4gDbANwAAAAAwACAAAAAAAAAAEAAANw/4gAyAPoAHwAfANsAAEAAAAAAAAAAAAAAAAAAAACAABQAAgBAAAABAAAAZAABQAAAooCWAAAAEsCigJYAAABXgAyANwAAAAAAAAAAAAAAAD3/67/+9///w/gAD8AAAAAQURCRQHAAAD//wNw/4gAyANwAHhgLwH/AAAAAAAAAAAAAAAgAAAAAAARANIAAQAAAAAAAQALAAAAAQAAAAAAAgAHAAsAAQAAAAAAAwAbABIAAQAAAAAABAALAAAAAQAAAAAABQA5AC0AAQAAAAAABgAKAGYAAwABBAkAAABuAHAAAwABBAkAAQAWAN4AAwABBAkAAgAOAPQAAwABBAkAAwA2AQIAAwABBAkABAAWAN4AAwABBAkABQByATgAAwABBAkABgAUAaoAAwABBAkACAA0Ab4AAwABBAkACwA0AfIAAwABBAkADSQSAiYAAwABBAkADgBIJjhBZG9iZSBCbGFua1JlZ3VsYXIxLjAzNTtBREJFO0Fkb2JlQmxhbms7QURPQkVWZXJzaW9uIDEuMDM1O1BTIDEuMDAzO2hvdGNvbnYgMS4wLjcwO21ha2VvdGYubGliMi41LjU5MDBBZG9iZUJsYW5rAKkAIAAyADAAMQAzACAAQQBkAG8AYgBlACAAUwB5AHMAdABlAG0AcwAgAEkAbgBjAG8AcgBwAG8AcgBhAHQAZQBkAC4AIABBAGwAbAAgAFIAaQBnAGgAdABzACAAUgBlAHMAZQByAHYAZQBkAC4AQQBkAG8AYgBlACAAQgBsAGEAbgBrAFIAZQBnAHUAbABhAHIAMQAuADAAMwA1ADsAQQBEAEIARQA7AEEAZABvAGIAZQBCAGwAYQBuAGsAOwBBAEQATwBCAEUAVgBlAHIAcwBpAG8AbgAgADEALgAwADMANQA7AFAAUwAgADEALgAwADAAMwA7AGgAbwB0AGMAbwBuAHYAIAAxAC4AMAAuADcAMAA7AG0AYQBrAGUAbwB0AGYALgBsAGkAYgAyAC4ANQAuADUAOQAwADAAQQBkAG8AYgBlAEIAbABhAG4AawBBAGQAbwBiAGUAIABTAHkAcwB0AGUAbQBzACAASQBuAGMAbwByAHAAbwByAGEAdABlAGQAaAB0AHQAcAA6AC8ALwB3AHcAdwAuAGEAZABvAGIAZQAuAGMAbwBtAC8AdAB5AHAAZQAvAEEAZABvAGIAZQAgAEIAbABhAG4AawAgAGkAcwAgAHIAZQBsAGUAYQBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAUwBJAEwAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUAIAAtACAAcABsAGUAYQBzAGUAIAByAGUAYQBkACAAaQB0ACAAYwBhAHIAZQBmAHUAbABsAHkAIABhAG4AZAAgAGQAbwAgAG4AbwB0ACAAZABvAHcAbgBsAG8AYQBkACAAdABoAGUAIABmAG8AbgB0AHMAIAB1AG4AbABlAHMAcwAgAHkAbwB1ACAAYQBnAHIAZQBlACAAdABvACAAdABoAGUAIAB0AGgAZQAgAHQAZQByAG0AcwAgAG8AZgAgAHQAaABlACAAbABpAGMAZQBuAHMAZQA6AA0ACgANAAoAQwBvAHAAeQByAGkAZwBoAHQAIACpACAAMgAwADEAMwAgAEEAZABvAGIAZQAgAFMAeQBzAHQAZQBtAHMAIABJAG4AYwBvAHIAcABvAHIAYQB0AGUAZAAgACgAaAB0AHQAcAA6AC8ALwB3AHcAdwAuAGEAZABvAGIAZQAuAGMAbwBtAC8AKQAsACAAdwBpAHQAaAAgAFIAZQBzAGUAcgB2AGUAZAAgAEYAbwBuAHQAIABOAGEAbQBlACAAQQBkAG8AYgBlACAAQgBsAGEAbgBrAA0ACgANAAoAVABoAGkAcwAgAEYAbwBuAHQAIABTAG8AZgB0AHcAYQByAGUAIABpAHMAIABsAGkAYwBlAG4AcwBlAGQAIAB1AG4AZABlAHIAIAB0AGgAZQAgAFMASQBMACAATwBwAGUAbgAgAEYAbwBuAHQAIABMAGkAYwBlAG4AcwBlACwAIABWAGUAcgBzAGkAbwBuACAAMQAuADEALgANAAoADQAKAFQAaABpAHMAIABsAGkAYwBlAG4AcwBlACAAaQBzACAAYwBvAHAAaQBlAGQAIABiAGUAbABvAHcALAAgAGEAbgBkACAAaQBzACAAYQBsAHMAbwAgAGEAdgBhAGkAbABhAGIAbABlACAAdwBpAHQAaAAgAGEAIABGAEEAUQAgAGEAdAA6ACAAaAB0AHQAcAA6AC8ALwBzAGMAcgBpAHAAdABzAC4AcwBpAGwALgBvAHIAZwAvAE8ARgBMAA0ACgANAAoALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAA0ACgBTAEkATAAgAE8AUABFAE4AIABGAE8ATgBUACAATABJAEMARQBOAFMARQAgAFYAZQByAHMAaQBvAG4AIAAxAC4AMQAgAC0AIAAyADYAIABGAGUAYgByAHUAYQByAHkAIAAyADAAMAA3AA0ACgAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ALQAtAC0ADQAKAA0ACgBQAFIARQBBAE0AQgBMAEUADQAKAFQAaABlACAAZwBvAGEAbABzACAAbwBmACAAdABoAGUAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUAIAAoAE8ARgBMACkAIABhAHIAZQAgAHQAbwAgAHMAdABpAG0AdQBsAGEAdABlACAAdwBvAHIAbABkAHcAaQBkAGUAIABkAGUAdgBlAGwAbwBwAG0AZQBuAHQAIABvAGYAIABjAG8AbABsAGEAYgBvAHIAYQB0AGkAdgBlACAAZgBvAG4AdAAgAHAAcgBvAGoAZQBjAHQAcwAsACAAdABvACAAcwB1AHAAcABvAHIAdAAgAHQAaABlACAAZgBvAG4AdAAgAGMAcgBlAGEAdABpAG8AbgAgAGUAZgBmAG8AcgB0AHMAIABvAGYAIABhAGMAYQBkAGUAbQBpAGMAIABhAG4AZAAgAGwAaQBuAGcAdQBpAHMAdABpAGMAIABjAG8AbQBtAHUAbgBpAHQAaQBlAHMALAAgAGEAbgBkACAAdABvACAAcAByAG8AdgBpAGQAZQAgAGEAIABmAHIAZQBlACAAYQBuAGQAIABvAHAAZQBuACAAZgByAGEAbQBlAHcAbwByAGsAIABpAG4AIAB3AGgAaQBjAGgAIABmAG8AbgB0AHMAIABtAGEAeQAgAGIAZQAgAHMAaABhAHIAZQBkACAAYQBuAGQAIABpAG0AcAByAG8AdgBlAGQAIABpAG4AIABwAGEAcgB0AG4AZQByAHMAaABpAHAAIAB3AGkAdABoACAAbwB0AGgAZQByAHMALgANAAoADQAKAFQAaABlACAATwBGAEwAIABhAGwAbABvAHcAcwAgAHQAaABlACAAbABpAGMAZQBuAHMAZQBkACAAZgBvAG4AdABzACAAdABvACAAYgBlACAAdQBzAGUAZAAsACAAcwB0AHUAZABpAGUAZAAsACAAbQBvAGQAaQBmAGkAZQBkACAAYQBuAGQAIAByAGUAZABpAHMAdAByAGkAYgB1AHQAZQBkACAAZgByAGUAZQBsAHkAIABhAHMAIABsAG8AbgBnACAAYQBzACAAdABoAGUAeQAgAGEAcgBlACAAbgBvAHQAIABzAG8AbABkACAAYgB5ACAAdABoAGUAbQBzAGUAbAB2AGUAcwAuACAAVABoAGUAIABmAG8AbgB0AHMALAAgAGkAbgBjAGwAdQBkAGkAbgBnACAAYQBuAHkAIABkAGUAcgBpAHYAYQB0AGkAdgBlACAAdwBvAHIAawBzACwAIABjAGEAbgAgAGIAZQAgAGIAdQBuAGQAbABlAGQALAAgAGUAbQBiAGUAZABkAGUAZAAsACAAcgBlAGQAaQBzAHQAcgBpAGIAdQB0AGUAZAAgAGEAbgBkAC8AbwByACAAcwBvAGwAZAAgAHcAaQB0AGgAIABhAG4AeQAgAHMAbwBmAHQAdwBhAHIAZQAgAHAAcgBvAHYAaQBkAGUAZAAgAHQAaABhAHQAIABhAG4AeQAgAHIAZQBzAGUAcgB2AGUAZAAgAG4AYQBtAGUAcwAgAGEAcgBlACAAbgBvAHQAIAB1AHMAZQBkACAAYgB5ACAAZABlAHIAaQB2AGEAdABpAHYAZQAgAHcAbwByAGsAcwAuACAAVABoAGUAIABmAG8AbgB0AHMAIABhAG4AZAAgAGQAZQByAGkAdgBhAHQAaQB2AGUAcwAsACAAaABvAHcAZQB2AGUAcgAsACAAYwBhAG4AbgBvAHQAIABiAGUAIAByAGUAbABlAGEAcwBlAGQAIAB1AG4AZABlAHIAIABhAG4AeQAgAG8AdABoAGUAcgAgAHQAeQBwAGUAIABvAGYAIABsAGkAYwBlAG4AcwBlAC4AIABUAGgAZQAgAHIAZQBxAHUAaQByAGUAbQBlAG4AdAAgAGYAbwByACAAZgBvAG4AdABzACAAdABvACAAcgBlAG0AYQBpAG4AIAB1AG4AZABlAHIAIAB0AGgAaQBzACAAbABpAGMAZQBuAHMAZQAgAGQAbwBlAHMAIABuAG8AdAAgAGEAcABwAGwAeQAgAHQAbwAgAGEAbgB5ACAAZABvAGMAdQBtAGUAbgB0ACAAYwByAGUAYQB0AGUAZAAgAHUAcwBpAG4AZwAgAHQAaABlACAAZgBvAG4AdABzACAAbwByACAAdABoAGUAaQByACAAZABlAHIAaQB2AGEAdABpAHYAZQBzAC4ADQAKAA0ACgBEAEUARgBJAE4ASQBUAEkATwBOAFMADQAKACIARgBvAG4AdAAgAFMAbwBmAHQAdwBhAHIAZQAiACAAcgBlAGYAZQByAHMAIAB0AG8AIAB0AGgAZQAgAHMAZQB0ACAAbwBmACAAZgBpAGwAZQBzACAAcgBlAGwAZQBhAHMAZQBkACAAYgB5ACAAdABoAGUAIABDAG8AcAB5AHIAaQBnAGgAdAAgAEgAbwBsAGQAZQByACgAcwApACAAdQBuAGQAZQByACAAdABoAGkAcwAgAGwAaQBjAGUAbgBzAGUAIABhAG4AZAAgAGMAbABlAGEAcgBsAHkAIABtAGEAcgBrAGUAZAAgAGEAcwAgAHMAdQBjAGgALgAgAFQAaABpAHMAIABtAGEAeQAgAGkAbgBjAGwAdQBkAGUAIABzAG8AdQByAGMAZQAgAGYAaQBsAGUAcwAsACAAYgB1AGkAbABkACAAcwBjAHIAaQBwAHQAcwAgAGEAbgBkACAAZABvAGMAdQBtAGUAbgB0AGEAdABpAG8AbgAuAA0ACgANAAoAIgBSAGUAcwBlAHIAdgBlAGQAIABGAG8AbgB0ACAATgBhAG0AZQAiACAAcgBlAGYAZQByAHMAIAB0AG8AIABhAG4AeQAgAG4AYQBtAGUAcwAgAHMAcABlAGMAaQBmAGkAZQBkACAAYQBzACAAcwB1AGMAaAAgAGEAZgB0AGUAcgAgAHQAaABlACAAYwBvAHAAeQByAGkAZwBoAHQAIABzAHQAYQB0AGUAbQBlAG4AdAAoAHMAKQAuAA0ACgANAAoAIgBPAHIAaQBnAGkAbgBhAGwAIABWAGUAcgBzAGkAbwBuACIAIAByAGUAZgBlAHIAcwAgAHQAbwAgAHQAaABlACAAYwBvAGwAbABlAGMAdABpAG8AbgAgAG8AZgAgAEYAbwBuAHQAIABTAG8AZgB0AHcAYQByAGUAIABjAG8AbQBwAG8AbgBlAG4AdABzACAAYQBzACAAZABpAHMAdAByAGkAYgB1AHQAZQBkACAAYgB5ACAAdABoAGUAIABDAG8AcAB5AHIAaQBnAGgAdAAgAEgAbwBsAGQAZQByACgAcwApAC4ADQAKAA0ACgAiAE0AbwBkAGkAZgBpAGUAZAAgAFYAZQByAHMAaQBvAG4AIgAgAHIAZQBmAGUAcgBzACAAdABvACAAYQBuAHkAIABkAGUAcgBpAHYAYQB0AGkAdgBlACAAbQBhAGQAZQAgAGIAeQAgAGEAZABkAGkAbgBnACAAdABvACwAIABkAGUAbABlAHQAaQBuAGcALAAgAG8AcgAgAHMAdQBiAHMAdABpAHQAdQB0AGkAbgBnACAALQAtACAAaQBuACAAcABhAHIAdAAgAG8AcgAgAGkAbgAgAHcAaABvAGwAZQAgAC0ALQAgAGEAbgB5ACAAbwBmACAAdABoAGUAIABjAG8AbQBwAG8AbgBlAG4AdABzACAAbwBmACAAdABoAGUAIABPAHIAaQBnAGkAbgBhAGwAIABWAGUAcgBzAGkAbwBuACwAIABiAHkAIABjAGgAYQBuAGcAaQBuAGcAIABmAG8AcgBtAGEAdABzACAAbwByACAAYgB5ACAAcABvAHIAdABpAG4AZwAgAHQAaABlACAARgBvAG4AdAAgAFMAbwBmAHQAdwBhAHIAZQAgAHQAbwAgAGEAIABuAGUAdwAgAGUAbgB2AGkAcgBvAG4AbQBlAG4AdAAuAA0ACgANAAoAIgBBAHUAdABoAG8AcgAiACAAcgBlAGYAZQByAHMAIAB0AG8AIABhAG4AeQAgAGQAZQBzAGkAZwBuAGUAcgAsACAAZQBuAGcAaQBuAGUAZQByACwAIABwAHIAbwBnAHIAYQBtAG0AZQByACwAIAB0AGUAYwBoAG4AaQBjAGEAbAAgAHcAcgBpAHQAZQByACAAbwByACAAbwB0AGgAZQByACAAcABlAHIAcwBvAG4AIAB3AGgAbwAgAGMAbwBuAHQAcgBpAGIAdQB0AGUAZAAgAHQAbwAgAHQAaABlACAARgBvAG4AdAAgAFMAbwBmAHQAdwBhAHIAZQAuAA0ACgANAAoAUABFAFIATQBJAFMAUwBJAE8ATgAgACYAIABDAE8ATgBEAEkAVABJAE8ATgBTAA0ACgBQAGUAcgBtAGkAcwBzAGkAbwBuACAAaQBzACAAaABlAHIAZQBiAHkAIABnAHIAYQBuAHQAZQBkACwAIABmAHIAZQBlACAAbwBmACAAYwBoAGEAcgBnAGUALAAgAHQAbwAgAGEAbgB5ACAAcABlAHIAcwBvAG4AIABvAGIAdABhAGkAbgBpAG4AZwAgAGEAIABjAG8AcAB5ACAAbwBmACAAdABoAGUAIABGAG8AbgB0ACAAUwBvAGYAdAB3AGEAcgBlACwAIAB0AG8AIAB1AHMAZQAsACAAcwB0AHUAZAB5ACwAIABjAG8AcAB5ACwAIABtAGUAcgBnAGUALAAgAGUAbQBiAGUAZAAsACAAbQBvAGQAaQBmAHkALAAgAHIAZQBkAGkAcwB0AHIAaQBiAHUAdABlACwAIABhAG4AZAAgAHMAZQBsAGwAIABtAG8AZABpAGYAaQBlAGQAIABhAG4AZAAgAHUAbgBtAG8AZABpAGYAaQBlAGQAIABjAG8AcABpAGUAcwAgAG8AZgAgAHQAaABlACAARgBvAG4AdAAgAFMAbwBmAHQAdwBhAHIAZQAsACAAcwB1AGIAagBlAGMAdAAgAHQAbwAgAHQAaABlACAAZgBvAGwAbABvAHcAaQBuAGcAIABjAG8AbgBkAGkAdABpAG8AbgBzADoADQAKAA0ACgAxACkAIABOAGUAaQB0AGgAZQByACAAdABoAGUAIABGAG8AbgB0ACAAUwBvAGYAdAB3AGEAcgBlACAAbgBvAHIAIABhAG4AeQAgAG8AZgAgAGkAdABzACAAaQBuAGQAaQB2AGkAZAB1AGEAbAAgAGMAbwBtAHAAbwBuAGUAbgB0AHMALAAgAGkAbgAgAE8AcgBpAGcAaQBuAGEAbAAgAG8AcgAgAE0AbwBkAGkAZgBpAGUAZAAgAFYAZQByAHMAaQBvAG4AcwAsACAAbQBhAHkAIABiAGUAIABzAG8AbABkACAAYgB5ACAAaQB0AHMAZQBsAGYALgANAAoADQAKADIAKQAgAE8AcgBpAGcAaQBuAGEAbAAgAG8AcgAgAE0AbwBkAGkAZgBpAGUAZAAgAFYAZQByAHMAaQBvAG4AcwAgAG8AZgAgAHQAaABlACAARgBvAG4AdAAgAFMAbwBmAHQAdwBhAHIAZQAgAG0AYQB5ACAAYgBlACAAYgB1AG4AZABsAGUAZAAsACAAcgBlAGQAaQBzAHQAcgBpAGIAdQB0AGUAZAAgAGEAbgBkAC8AbwByACAAcwBvAGwAZAAgAHcAaQB0AGgAIABhAG4AeQAgAHMAbwBmAHQAdwBhAHIAZQAsACAAcAByAG8AdgBpAGQAZQBkACAAdABoAGEAdAAgAGUAYQBjAGgAIABjAG8AcAB5ACAAYwBvAG4AdABhAGkAbgBzACAAdABoAGUAIABhAGIAbwB2AGUAIABjAG8AcAB5AHIAaQBnAGgAdAAgAG4AbwB0AGkAYwBlACAAYQBuAGQAIAB0AGgAaQBzACAAbABpAGMAZQBuAHMAZQAuACAAVABoAGUAcwBlACAAYwBhAG4AIABiAGUAIABpAG4AYwBsAHUAZABlAGQAIABlAGkAdABoAGUAcgAgAGEAcwAgAHMAdABhAG4AZAAtAGEAbABvAG4AZQAgAHQAZQB4AHQAIABmAGkAbABlAHMALAAgAGgAdQBtAGEAbgAtAHIAZQBhAGQAYQBiAGwAZQAgAGgAZQBhAGQAZQByAHMAIABvAHIAIABpAG4AIAB0AGgAZQAgAGEAcABwAHIAbwBwAHIAaQBhAHQAZQAgAG0AYQBjAGgAaQBuAGUALQByAGUAYQBkAGEAYgBsAGUAIABtAGUAdABhAGQAYQB0AGEAIABmAGkAZQBsAGQAcwAgAHcAaQB0AGgAaQBuACAAdABlAHgAdAAgAG8AcgAgAGIAaQBuAGEAcgB5ACAAZgBpAGwAZQBzACAAYQBzACAAbABvAG4AZwAgAGEAcwAgAHQAaABvAHMAZQAgAGYAaQBlAGwAZABzACAAYwBhAG4AIABiAGUAIABlAGEAcwBpAGwAeQAgAHYAaQBlAHcAZQBkACAAYgB5ACAAdABoAGUAIAB1AHMAZQByAC4ADQAKAA0ACgAzACkAIABOAG8AIABNAG8AZABpAGYAaQBlAGQAIABWAGUAcgBzAGkAbwBuACAAbwBmACAAdABoAGUAIABGAG8AbgB0ACAAUwBvAGYAdAB3AGEAcgBlACAAbQBhAHkAIAB1AHMAZQAgAHQAaABlACAAUgBlAHMAZQByAHYAZQBkACAARgBvAG4AdAAgAE4AYQBtAGUAKABzACkAIAB1AG4AbABlAHMAcwAgAGUAeABwAGwAaQBjAGkAdAAgAHcAcgBpAHQAdABlAG4AIABwAGUAcgBtAGkAcwBzAGkAbwBuACAAaQBzACAAZwByAGEAbgB0AGUAZAAgAGIAeQAgAHQAaABlACAAYwBvAHIAcgBlAHMAcABvAG4AZABpAG4AZwAgAEMAbwBwAHkAcgBpAGcAaAB0ACAASABvAGwAZABlAHIALgAgAFQAaABpAHMAIAByAGUAcwB0AHIAaQBjAHQAaQBvAG4AIABvAG4AbAB5ACAAYQBwAHAAbABpAGUAcwAgAHQAbwAgAHQAaABlACAAcAByAGkAbQBhAHIAeQAgAGYAbwBuAHQAIABuAGEAbQBlACAAYQBzACAAcAByAGUAcwBlAG4AdABlAGQAIAB0AG8AIAB0AGgAZQAgAHUAcwBlAHIAcwAuAA0ACgANAAoANAApACAAVABoAGUAIABuAGEAbQBlACgAcwApACAAbwBmACAAdABoAGUAIABDAG8AcAB5AHIAaQBnAGgAdAAgAEgAbwBsAGQAZQByACgAcwApACAAbwByACAAdABoAGUAIABBAHUAdABoAG8AcgAoAHMAKQAgAG8AZgAgAHQAaABlACAARgBvAG4AdAAgAFMAbwBmAHQAdwBhAHIAZQAgAHMAaABhAGwAbAAgAG4AbwB0ACAAYgBlACAAdQBzAGUAZAAgAHQAbwAgAHAAcgBvAG0AbwB0AGUALAAgAGUAbgBkAG8AcgBzAGUAIABvAHIAIABhAGQAdgBlAHIAdABpAHMAZQAgAGEAbgB5ACAATQBvAGQAaQBmAGkAZQBkACAAVgBlAHIAcwBpAG8AbgAsACAAZQB4AGMAZQBwAHQAIAB0AG8AIABhAGMAawBuAG8AdwBsAGUAZABnAGUAIAB0AGgAZQAgAGMAbwBuAHQAcgBpAGIAdQB0AGkAbwBuACgAcwApACAAbwBmACAAdABoAGUAIABDAG8AcAB5AHIAaQBnAGgAdAAgAEgAbwBsAGQAZQByACgAcwApACAAYQBuAGQAIAB0AGgAZQAgAEEAdQB0AGgAbwByACgAcwApACAAbwByACAAdwBpAHQAaAAgAHQAaABlAGkAcgAgAGUAeABwAGwAaQBjAGkAdAAgAHcAcgBpAHQAdABlAG4AIABwAGUAcgBtAGkAcwBzAGkAbwBuAC4ADQAKAA0ACgA1ACkAIABUAGgAZQAgAEYAbwBuAHQAIABTAG8AZgB0AHcAYQByAGUALAAgAG0AbwBkAGkAZgBpAGUAZAAgAG8AcgAgAHUAbgBtAG8AZABpAGYAaQBlAGQALAAgAGkAbgAgAHAAYQByAHQAIABvAHIAIABpAG4AIAB3AGgAbwBsAGUALAAgAG0AdQBzAHQAIABiAGUAIABkAGkAcwB0AHIAaQBiAHUAdABlAGQAIABlAG4AdABpAHIAZQBsAHkAIAB1AG4AZABlAHIAIAB0AGgAaQBzACAAbABpAGMAZQBuAHMAZQAsACAAYQBuAGQAIABtAHUAcwB0ACAAbgBvAHQAIABiAGUAIABkAGkAcwB0AHIAaQBiAHUAdABlAGQAIAB1AG4AZABlAHIAIABhAG4AeQAgAG8AdABoAGUAcgAgAGwAaQBjAGUAbgBzAGUALgAgAFQAaABlACAAcgBlAHEAdQBpAHIAZQBtAGUAbgB0ACAAZgBvAHIAIABmAG8AbgB0AHMAIAB0AG8AIAByAGUAbQBhAGkAbgAgAHUAbgBkAGUAcgAgAHQAaABpAHMAIABsAGkAYwBlAG4AcwBlACAAZABvAGUAcwAgAG4AbwB0ACAAYQBwAHAAbAB5ACAAdABvACAAYQBuAHkAIABkAG8AYwB1AG0AZQBuAHQAIABjAHIAZQBhAHQAZQBkACAAdQBzAGkAbgBnACAAdABoAGUAIABGAG8AbgB0ACAAUwBvAGYAdAB3AGEAcgBlAC4ADQAKAA0ACgBUAEUAUgBNAEkATgBBAFQASQBPAE4ADQAKAFQAaABpAHMAIABsAGkAYwBlAG4AcwBlACAAYgBlAGMAbwBtAGUAcwAgAG4AdQBsAGwAIABhAG4AZAAgAHYAbwBpAGQAIABpAGYAIABhAG4AeQAgAG8AZgAgAHQAaABlACAAYQBiAG8AdgBlACAAYwBvAG4AZABpAHQAaQBvAG4AcwAgAGEAcgBlACAAbgBvAHQAIABtAGUAdAAuAA0ACgANAAoARABJAFMAQwBMAEEASQBNAEUAUgANAAoAVABIAEUAIABGAE8ATgBUACAAUwBPAEYAVABXAEEAUgBFACAASQBTACAAUABSAE8AVgBJAEQARQBEACAAIgBBAFMAIABJAFMAIgAsACAAVwBJAFQASABPAFUAVAAgAFcAQQBSAFIAQQBOAFQAWQAgAE8ARgAgAEEATgBZACAASwBJAE4ARAAsACAARQBYAFAAUgBFAFMAUwAgAE8AUgAgAEkATQBQAEwASQBFAEQALAAgAEkATgBDAEwAVQBEAEkATgBHACAAQgBVAFQAIABOAE8AVAAgAEwASQBNAEkAVABFAEQAIABUAE8AIABBAE4AWQAgAFcAQQBSAFIAQQBOAFQASQBFAFMAIABPAEYAIABNAEUAUgBDAEgAQQBOAFQAQQBCAEkATABJAFQAWQAsACAARgBJAFQATgBFAFMAUwAgAEYATwBSACAAQQAgAFAAQQBSAFQASQBDAFUATABBAFIAIABQAFUAUgBQAE8AUwBFACAAQQBOAEQAIABOAE8ATgBJAE4ARgBSAEkATgBHAEUATQBFAE4AVAAgAE8ARgAgAEMATwBQAFkAUgBJAEcASABUACwAIABQAEEAVABFAE4AVAAsACAAVABSAEEARABFAE0AQQBSAEsALAAgAE8AUgAgAE8AVABIAEUAUgAgAFIASQBHAEgAVAAuACAASQBOACAATgBPACAARQBWAEUATgBUACAAUwBIAEEATABMACAAVABIAEUAIABDAE8AUABZAFIASQBHAEgAVAAgAEgATwBMAEQARQBSACAAQgBFACAATABJAEEAQgBMAEUAIABGAE8AUgAgAEEATgBZACAAQwBMAEEASQBNACwAIABEAEEATQBBAEcARQBTACAATwBSACAATwBUAEgARQBSACAATABJAEEAQgBJAEwASQBUAFkALAAgAEkATgBDAEwAVQBEAEkATgBHACAAQQBOAFkAIABHAEUATgBFAFIAQQBMACwAIABTAFAARQBDAEkAQQBMACwAIABJAE4ARABJAFIARQBDAFQALAAgAEkATgBDAEkARABFAE4AVABBAEwALAAgAE8AUgAgAEMATwBOAFMARQBRAFUARQBOAFQASQBBAEwAIABEAEEATQBBAEcARQBTACwAIABXAEgARQBUAEgARQBSACAASQBOACAAQQBOACAAQQBDAFQASQBPAE4AIABPAEYAIABDAE8ATgBUAFIAQQBDAFQALAAgAFQATwBSAFQAIABPAFIAIABPAFQASABFAFIAVwBJAFMARQAsACAAQQBSAEkAUwBJAE4ARwAgAEYAUgBPAE0ALAAgAE8AVQBUACAATwBGACAAVABIAEUAIABVAFMARQAgAE8AUgAgAEkATgBBAEIASQBMAEkAVABZACAAVABPACAAVQBTAEUAIABUAEgARQAgAEYATwBOAFQAIABTAE8ARgBUAFcAQQBSAEUAIABPAFIAIABGAFIATwBNACAATwBUAEgARQBSACAARABFAEEATABJAE4ARwBTACAASQBOACAAVABIAEUAIABGAE8ATgBUACAAUwBPAEYAVABXAEEAUgBFAC4ADQAKAGgAdAB0AHAAOgAvAC8AdwB3AHcALgBhAGQAbwBiAGUALgBjAG8AbQAvAHQAeQBwAGUALwBsAGUAZwBhAGwALgBoAHQAbQBsAAAAAAAFAAAAAwAAADgAAAAEAAABUAABAAAAAAAsAAMAAQAAADgAAwAKAAABUAAGAAwAAAAAAAEAAAAEARgAAABCAEAABQACB/8P/xf/H/8n/y//N/8//0f/T/9X/1//Z/9v/3f/f/+H/4//l/+f/6f/r/+3/7//x//P/9f/5//v//f//c///f//AAAAAAgAEAAYACAAKAAwADgAQABIAFAAWABgAGgAcAB4AIAAiACQAJgAoACoALAAuADAAMgA0ADgAOgA8AD4AP3w//8AAfgB8AHoAeAB2AHQAcgBwAG4AbABqAGgAZgBkAGIAYABeAFwAWgBYAFYAVABSAFAATgBMAEgARgBEAEIAQgBAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAZkAAAAAAAAAIgAAAAAAAAB/8AAAABAAAIAAAAD/8AAAABAAAQAAAAF/8AAAABAAAYAAAAH/8AAAABAAAgAAAAJ/8AAAABAAAoAAAAL/8AAAABAAAwAAAAN/8AAAABAAA4AAAAP/8AAAABAABAAAAAR/8AAAABAABIAAAAT/8AAAABAABQAAAAV/8AAAABAABYAAAAX/8AAAABAABgAAAAZ/8AAAABAABoAAAAb/8AAAABAABwAAAAd/8AAAABAAB4AAAAf/8AAAABAACAAAAAh/8AAAABAACIAAAAj/8AAAABAACQAAAAl/8AAAABAACYAAAAn/8AAAABAACgAAAAp/8AAAABAACoAAAAr/8AAAABAACwAAAAt/8AAAABAAC4AAAAv/8AAAABAADAAAAAx/8AAAABAADIAAAAz/8AAAABAADQAAAA1/8AAAABAADgAAAA5/8AAAABAADoAAAA7/8AAAABAADwAAAA9/8AAAABAAD4AAAA/c8AAAABAAD98AAA//0AAAXxAAEAAAABB/8AAAABAAEIAAABD/8AAAABAAEQAAABF/8AAAABAAEYAAABH/8AAAABAAEgAAABJ/8AAAABAAEoAAABL/8AAAABAAEwAAABN/8AAAABAAE4AAABP/8AAAABAAFAAAABR/8AAAABAAFIAAABT/8AAAABAAFQAAABV/8AAAABAAFYAAABX/8AAAABAAFgAAABZ/8AAAABAAFoAAABb/8AAAABAAFwAAABd/8AAAABAAF4AAABf/8AAAABAAGAAAABh/8AAAABAAGIAAABj/8AAAABAAGQAAABl/8AAAABAAGYAAABn/8AAAABAAGgAAABp/8AAAABAAGoAAABr/8AAAABAAGwAAABt/8AAAABAAG4AAABv/8AAAABAAHAAAABx/8AAAABAAHIAAABz/8AAAABAAHQAAAB1/8AAAABAAHYAAAB3/8AAAABAAHgAAAB5/8AAAABAAHoAAAB7/8AAAABAAHwAAAB9/8AAAABAAH4AAAB//0AAAABAAIAAAACB/8AAAABAAIIAAACD/8AAAABAAIQAAACF/8AAAABAAIYAAACH/8AAAABAAIgAAACJ/8AAAABAAIoAAACL/8AAAABAAIwAAACN/8AAAABAAI4AAACP/8AAAABAAJAAAACR/8AAAABAAJIAAACT/8AAAABAAJQAAACV/8AAAABAAJYAAACX/8AAAABAAJgAAACZ/8AAAABAAJoAAACb/8AAAABAAJwAAACd/8AAAABAAJ4AAACf/8AAAABAAKAAAACh/8AAAABAAKIAAACj/8AAAABAAKQAAACl/8AAAABAAKYAAACn/8AAAABAAKgAAACp/8AAAABAAKoAAACr/8AAAABAAKwAAACt/8AAAABAAK4AAACv/8AAAABAALAAAACx/8AAAABAALIAAACz/8AAAABAALQAAAC1/8AAAABAALYAAAC3/8AAAABAALgAAAC5/8AAAABAALoAAAC7/8AAAABAALwAAAC9/8AAAABAAL4AAAC//0AAAABAAMAAAADB/8AAAABAAMIAAADD/8AAAABAAMQAAADF/8AAAABAAMYAAADH/8AAAABAAMgAAADJ/8AAAABAAMoAAADL/8AAAABAAMwAAADN/8AAAABAAM4AAADP/8AAAABAANAAAADR/8AAAABAANIAAADT/8AAAABAANQAAADV/8AAAABAANYAAADX/8AAAABAANgAAADZ/8AAAABAANoAAADb/8AAAABAANwAAADd/8AAAABAAN4AAADf/8AAAABAAOAAAADh/8AAAABAAOIAAADj/8AAAABAAOQAAADl/8AAAABAAOYAAADn/8AAAABAAOgAAADp/8AAAABAAOoAAADr/8AAAABAAOwAAADt/8AAAABAAO4AAADv/8AAAABAAPAAAADx/8AAAABAAPIAAADz/8AAAABAAPQAAAD1/8AAAABAAPYAAAD3/8AAAABAAPgAAAD5/8AAAABAAPoAAAD7/8AAAABAAPwAAAD9/8AAAABAAP4AAAD//0AAAABAAQAAAAEB/8AAAABAAQIAAAED/8AAAABAAQQAAAEF/8AAAABAAQYAAAEH/8AAAABAAQgAAAEJ/8AAAABAAQoAAAEL/8AAAABAAQwAAAEN/8AAAABAAQ4AAAEP/8AAAABAARAAAAER/8AAAABAARIAAAET/8AAAABAARQAAAEV/8AAAABAARYAAAEX/8AAAABAARgAAAEZ/8AAAABAARoAAAEb/8AAAABAARwAAAEd/8AAAABAAR4AAAEf/8AAAABAASAAAAEh/8AAAABAASIAAAEj/8AAAABAASQAAAEl/8AAAABAASYAAAEn/8AAAABAASgAAAEp/8AAAABAASoAAAEr/8AAAABAASwAAAEt/8AAAAB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AAloAAAJb/8AAAABAAlwAAAJd/8AAAABAAl4AAAJf/8AAAABAAmAAAAJh/8AAAABAAmIAAAJj/8AAAABAAmQAAAJl/8AAAABAAmYAAAJn/8AAAABAAmgAAAJp/8AAAABAAmoAAAJr/8AAAABAAmwAAAJt/8AAAABAAm4AAAJv/8AAAABAAnAAAAJx/8AAAABAAnIAAAJz/8AAAABAAnQAAAJ1/8AAAABAAnYAAAJ3/8AAAABAAngAAAJ5/8AAAABAAnoAAAJ7/8AAAABAAnwAAAJ9/8AAAABAAn4AAAJ//0AAAABAAoAAAAKB/8AAAABAAoIAAAKD/8AAAABAAoQAAAKF/8AAAABAAoYAAAKH/8AAAABAAogAAAKJ/8AAAABAAooAAAKL/8AAAABAAowAAAKN/8AAAABAAo4AAAKP/8AAAABAApAAAAKR/8AAAABAApIAAAKT/8AAAABAApQAAAKV/8AAAABAApYAAAKX/8AAAABAApgAAAKZ/8AAAABAApoAAAKb/8AAAABAApwAAAKd/8AAAABAAp4AAAKf/8AAAABAAqAAAAKh/8AAAABAAqIAAAKj/8AAAABAAqQAAAKl/8AAAABAAqYAAAKn/8AAAABAAqgAAAKp/8AAAABAAqoAAAKr/8AAAABAAqwAAAKt/8AAAABAAq4AAAKv/8AAAABAArAAAAKx/8AAAABAArIAAAKz/8AAAABAArQAAAK1/8AAAABAArYAAAK3/8AAAABAArgAAAK5/8AAAABAAroAAAK7/8AAAABAArwAAAK9/8AAAABAAr4AAAK//0AAAABAAsAAAALB/8AAAABAAsIAAALD/8AAAABAAsQAAALF/8AAAABAAsYAAALH/8AAAABAAsgAAALJ/8AAAABAAsoAAALL/8AAAABAAswAAALN/8AAAABAAs4AAALP/8AAAABAAtAAAALR/8AAAABAAtIAAALT/8AAAABAAtQAAALV/8AAAABAAtYAAALX/8AAAABAAtgAAALZ/8AAAABAAtoAAALb/8AAAABAAtwAAALd/8AAAABAAt4AAALf/8AAAABAAuAAAALh/8AAAABAAuIAAALj/8AAAABAAuQAAALl/8AAAABAAuYAAALn/8AAAABAAugAAALp/8AAAABAAuoAAALr/8AAAABAAuwAAALt/8AAAABAAu4AAALv/8AAAAB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ASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6ATsBPAE9AT4BPwFAAUEBQgFDAUQBRQFGAUcBSAFJAUoBSwFMAU0BTgFPAVABUQFSAVMBVAFVAVYBVwFYAVkBWgFbAVwBXQFeAV8BYAFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBbAFtAW4BbwFwAXEBcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/AYABgQGCAYMBhAGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwG4AbkBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAdQB1QHWAdcB2AHZAdoB2wHcAd0B3gHfAeAB4QHiAeMB5AHlAeYB5wHoAekB6gHrAewB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4B/wIAAgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisCLAItAi4CLwIwAjECMgIzAjQCNQI2AjcCOAI5AjoCOwI8Aj0CPgI/AkACQQJCAkMCRAJFAkYCRwJIAkkCSgJLAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkgKTApQClQKWApcCmAKZApoCmwKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAs0CzgLPAtAC0QLSAtMC1ALVAtYC1wLYAtkC2gLbAtwC3QLeAt8C4ALhAuIC4wLkAuUC5gLnAugC6QLqAusC7ALtAu4C7wLwAvEC8gLzAvQC9QL2AvcC+AL5AvoC+wL8Av0C/gL/AwADAQMCAwMDBAMFAwYDBwMIAwkDCgMLAwwDDQMOAw8DEAMRAxIDEwMUAxUDFgMXAxgDGQMaAxsDHAMdAx4DHwMgAyEDIgMjAyQDJQMmAycDKAMpAyoDKwMsAy0DLgMvAzADMQMyAzMDNAM1AzYDNwM4AzkDOgM7AzwDPQM+Az8DQANBA0IDQwNEA0UDRgNHA0gDSQNKA0sDTANNA04DTwNQA1EDUgNTA1QDVQNWA1cDWANZA1oDWwNcA10DXgNfA2ADYQNiA2MDZANlA2YDZwNoA2kDagNrA2wDbQNuA28DcANxA3IDcwN0A3UDdgN3A3gDeQN6A3sDfAN9A34DfwOAA4EDggODA4QDhQOGA4cDiAOJA4oDiwOMA40DjgOPA5ADkQOSA5MDlAOVA5YDlwOYA5kDmgObA5wDnQOeA58DoAOhA6IDowOkA6UDpgOnA6gDqQOqA6sDrAOtA64DrwOwA7EDsgOzA7QDtQO2A7cDuAO5A7oDuwO8A70DvgO/A8ADwQPCA8MDxAPFA8YDxwPIA8kDygPLA8wDzQPOA88D0APRA9ID0wPUA9UD1gPXA9gD2QPaA9sD3APdA94D3wPgA+ED4gPjA+QD5QPmA+cD6APpA+oD6wPsA+0D7gPvA/AD8QPyA/MD9AP1A/YD9wP4A/kD+gP7A/wD/QP+A/8EAAQBBAIEAwQEBAUEBgQHBAgECQQKBAsEDAQNBA4EDwQQBBEEEgQTBBQEFQQWBBcEGAQZBBoEGwQcBB0EHgQfBCAEIQQiBCMEJAQlBCYEJwQoBCkEKgQrBCwELQQuBC8EMAQxBDIEMwQ0BDUENgQ3BDgEOQQ6BDsEPAQ9BD4EPwRABEEEQgRDBEQERQRGBEcESARJBEoESwRMBE0ETgRPBFAEUQRSBFMEVARVBFYEVwRYBFkEWgRbBFwEXQReBF8EYARhBGIEYwRkBGUEZgRnBGgEaQRqBGsEbARtBG4EbwRwBHEEcgRzBHQEdQR2BHcEeAR5BHoEewR8BH0EfgR/BIAEgQSCBIMEhASFBIYEhwSIBIkEigSLBIwEjQSOBI8EkASRBJIEkwSUBJUElgSXBJgEmQSaBJsEnASdBJ4EnwSgBKEEogSjBKQEpQSmBKcEqASpBKoEqwSsBK0ErgSvBLAEsQSyBLMEtAS1BLYEtwS4BLkEugS7BLwEvQS+BL8EwATBBMIEwwTEBMUExgTHBMgEyQTKBMsEzATNBM4EzwTQBNEE0gTTBNQE1QTWBNcE2ATZBNoE2wTcBN0E3gTfBOAE4QTiBOME5ATlBOYE5wToBOkE6gTrBOwE7QTuBO8E8ATxBPIE8wT0BPUE9gT3BPgE+QT6BPsE/AT9BP4E/wUABQEFAgUDBQQFBQUGBQcFCAUJBQoFCwUMBQ0FDgUPBRAFEQUSBRMFFAUVBRYFFwUYBRkFGgUbBRwFHQUeBR8FIAUhBSIFIwUkBSUFJgUnBSgFKQUqBSsFLAUtBS4FLwUwBTEFMgUzBTQFNQU2BTcFOAU5BToFOwU8BT0FPgU/BUAFQQVCBUMFRAVFBUYFRwVIBUkFSgVLBUwFTQVOBU8FUAVRBVIFUwVUBVUFVgVXBVgFWQVaBVsFXAVdBV4FXwVgBWEFYgVjBWQFZQVmBWcFaAVpBWoFawVsBW0FbgVvBXAFcQVyBXMFdAV1BXYFdwV4BXkFegV7BXwFfQV+BX8FgAWBBYIFgwWEBYUFhgWHBYgFiQWKBYsFjAWNBY4FjwWQBZEFkgWTBZQFlQWWBZcFmAWZBZoFmwWcBZ0FngWfBaAFoQWiBaMFpAWlBaYFpwWoBakFqgWrBawFrQWuBa8FsAWxBbIFswW0BbUFtgW3BbgFuQW6BbsFvAW9Bb4FvwXABcEFwgXDBcQFxQXGBccFyAXJBcoFywXMBc0FzgXPBdAF0QXSBdMF1AXVBdYF1wXYBdkF2gXbBdwF3QXeBd8F4AXhBeIF4wXkBeUF5gXnBegF6QXqBesF7AXtBe4F7wXwBfEF8gXzBfQF9QX2BfcF+AX5BfoF+wX8Bf0F/gX/BgAGAQYCBgMGBAYFBgYGBwYIBgkGCgYLBgwGDQYOBg8GEAYRBhIGEwYUBhUGFgYXBhgGGQYaBhsGHAYdBh4GHwYgBiEGIgYjBiQGJQYmBicGKAYpBioGKwYsBi0GLgYvBjAGMQYyBjMGNAY1BjYGNwY4BjkGOgY7BjwGPQY+Bj8GQAZBBkIGQwZEBkUGRgZHBkgGSQZKBksGTAZNBk4GTwZQBlEGUgZTBlQGVQZWBlcGWAZZBloGWwZcBl0GXgZfBmAGYQZiBmMGZAZlBmYGZwZoBmkGagZrBmwGbQZuBm8GcAZxBnIGcwZ0BnUGdgZ3BngGeQZ6BnsGfAZ9Bn4GfwaABoEGggaDBoQGhQaGBocGiAaJBooGiwaMBo0GjgaPBpAGkQaSBpMGlAaVBpYGlwaYBpkGmgabBpwGnQaeBp8GoAahBqIGowakBqUGpganBqgGqQaqBqsGrAatBq4GrwawBrEGsgazBrQGtQa2BrcGuAa5BroGuwa8Br0Gvga/BsAGwQbCBsMGxAbFBsYGxwbIBskGygbLBswGzQbOBs8G0AbRBtIG0wbUBtUG1gbXBtgG2QbaBtsG3AbdBt4G3wbgBuEG4gbjBuQG5QbmBucG6AbpBuoG6wbsBu0G7gbvBvAG8QbyBvMG9Ab1BvYG9wb4BvkG+gb7BvwG/Qb+Bv8HAAcBBwIHAwcEBwUHBgcHBwgHCQcKBwsHDAcNBw4HDwcQBxEHEgcTBxQHFQcWBxcHGAcZBxoHGwccBx0HHgcfByAHIQciByMHJAclByYHJwcoBykHKgcrBywHLQcuBy8HMAcxBzIHMwc0BzUHNgc3BzgHOQc6BzsHPAc9Bz4HPwdAB0EHQgdDB0QHRQdGB0cHSAdJB0oHSwdMB00HTgdPB1AHUQdSB1MHVAdVB1YHVwdYB1kHWgdbB1wHXQdeB18HYAdhB2IHYwdkB2UHZgdnB2gHaQdqB2sHbAdtB24HbwdwB3EHcgdzB3QHdQd2B3cHeAd5B3oHewd8B30Hfgd/B4AHgQeCB4MHhAeFB4YHhweIB4kHigeLB4wHjQeOB48HkAeRB5IHkweUB5UHlgeXB5gHmQeaB5sHnAedB54HnwegB6EHogejB6QHpQemB6cHqAepB6oHqwesB60HrgevB7AHsQeyB7MHtAe1B7YHtwe4B7kHuge7B7wHvQe+B78HwAfBB8IHwwfEB8UHxgfHB8gHyQfKB8sHzAfNB84HzwfQB9EH0gfTB9QH1QfWB9cH2AfZB9oH2wfcB90H3gffB+AH4QfiB+MH5AflB+YH5wfoB+kH6gfrB+wH7QfuB+8H8AfxB/IH8wf0B/UH9gf3B/gH+Qf6B/sH/Af9B/4H/wgACAEIAggDCAQIBQgGCAcICAgJCAoICwgMCA0IDggPCBAIEQgSCBMIFAgVCBYIFwgYCBkIGggbCBwIHQgeCB8IIAghCCIIIwgkCCUIJggnCCgIKQgqCCsILAgtCC4ILwgwCDEIMggzCDQINQg2CDcIOAg5CDoIOwg8CD0IPgg/CEAIQQhCCEMIRAhFCEYIRwhICEkISghLIPsMt/oktwH3ELf5LLcD9xD6BBX+fPmE+nwH/Vj+JxX50gf3xfwzBaawFfvF+DcF+PYGpmIV/dIH+8X4MwVwZhX3xfw3Bfz2Bg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODgABAQEK+B8MJpocGSQS+46LHAVGiwa9Cr0L+ucVAAPoAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAA') format('truetype'); }"),
      (c.fontStyleAliasesMap = {
        n: "normal",
        b: "bold",
        i: "italic",
        o: "oblique",
      }),
      (c.prototype = {
        constructor: c,
        loadFonts: function () {
          var A,
            t = this;
          0 !== this._numberOfFonts
            ? (null !== this.timeout &&
                (this._timeoutId = window.setTimeout(function () {
                  t._finish();
                }, this.timeout)),
              (this._testContainer = this._document.createElement("div")),
              (this._testContainer.style.cssText =
                "position:absolute; left:-10000px; top:-10000px; white-space:nowrap; font-size:20px; line-height:20px; visibility:hidden;"),
              (this._testDiv = this._document.createElement("div")),
              (this._testDiv.style.position = "absolute"),
              this._testDiv.appendChild(
                this._document.createTextNode(c.referenceText)
              ),
              c.useAdobeBlank
                ? c.adobeBlankReferenceSize
                  ? this._loadFonts()
                  : this._loadAdobeBlankFont()
                : ((A = this._getNewFontVariationsFromFonts(this._fontsArray))
                    .length && this._extractReferenceFontSizes(A),
                  this._loadFonts()))
            : this._finish();
        },
        _extractReferenceFontSizes: function (A) {
          var t, e, B, i, n, g;
          for (
            t = this._testDiv.cloneNode(!0),
              this._testContainer.appendChild(t),
              this._document.body.appendChild(this._testContainer),
              B = 0;
            B < A.length;
            B++
          )
            for (
              i = (g = A[B]).key,
                c.referenceFontFamilyVariationSizes[i] = [],
                e = 0;
              e < c.referenceFontFamilies.length;
              e++
            )
              (t.style.fontFamily = c.referenceFontFamilies[e]),
                (t.style.fontWeight = g.weight),
                (t.style.fontStyle = g.style),
                (n = new o(t.offsetWidth, t.offsetHeight)),
                c.referenceFontFamilyVariationSizes[i].push(n);
          this._testContainer.parentNode.removeChild(this._testContainer),
            t.parentNode.removeChild(t);
        },
        _loadAdobeBlankFont: function () {
          var A,
            t = this;
          this._addAdobeBlankFontFaceIfNeeded(),
            (A = this._testDiv.cloneNode(!0)),
            this._testContainer.appendChild(A),
            this._document.body.appendChild(this._testContainer),
            (A.style.fontFamily = "serif"),
            c.useIntervalChecking
              ? (this._testContainer.appendChild(A),
                (this._intervalId = window.setInterval(function () {
                  t._checkAdobeBlankSize();
                }, this._intervalDelay)),
                this._checkAdobeBlankSize())
              : ((this._adobeBlankSizeWatcher = new l(A, {
                  container: this._testContainer,
                  delegate: this,
                  continuous: !0,
                  direction: l.directions.decrease,
                  dimension: l.dimensions.horizontal,
                  document: this._document,
                })),
                this._adobeBlankSizeWatcher.prepareForWatch(),
                this._adobeBlankSizeWatcher.beginWatching()),
            (A.style.fontFamily = c.referenceFontFamilies[0] + ", serif");
        },
        _getNewFontVariationsFromFonts: function (A) {
          var t,
            e,
            B,
            i = [],
            n = {};
          for (B = 0; B < A.length; B++)
            (t = A[B]),
              (e = this._fontVariationKeyForFont(t)) in n ||
                e in c.referenceFontFamilyVariationSizes ||
                ((n[e] = !0),
                i.push({ key: e, weight: t.weight, style: t.style }));
          return i;
        },
        _parseFonts: function (A) {
          var t = [];
          return (
            A.forEach(function (A) {
              if ("string" == typeof A)
                -1 < A.indexOf(":")
                  ? (t = t.concat(this._convertShorthandToFontObjects(A)))
                  : t.push({ family: A, weight: 400, style: "normal" });
              else {
                if (!this._isValidFontObject(A))
                  throw new Error("Invalid font format");
                t.push(A);
              }
            }, this),
            t
          );
        },
        _isValidFontObject: function (A) {
          return (
            !!(A.family && A.weight && A.style) &&
            -1 !== ["normal", "italic", "bold", "oblique"].indexOf(A.style)
          );
        },
        _convertShorthandToFontObjects: function (n) {
          var g,
            o = [],
            A = n.split(":");
          return (
            (g = A[0]),
            A[1].split(",").forEach(function (A) {
              var t, e, B, i;
              if (2 !== A.length)
                throw new Error(
                  "Invalid Font Variation Description: '" +
                    A +
                    "' for font string: '" +
                    n +
                    "'"
                );
              (t = A[0]),
                (e = A[1]),
                t in c.fontStyleAliasesMap &&
                  ((i = c.fontStyleAliasesMap[t]),
                  (B = parseInt(e, 10)),
                  isNaN(B) ||
                    ((B *= 100), o.push({ family: g, weight: B, style: i })));
            }),
            o
          );
        },
        _addAdobeBlankFontFaceIfNeeded: function () {
          var A;
          this._document.getElementById(c.adobeBlankFontFaceStyleId) ||
            ((A = this._document.createElement("style")).setAttribute(
              "type",
              "text/css"
            ),
            A.setAttribute("id", c.adobeBlankFontFaceStyleId),
            A.appendChild(
              this._document.createTextNode(c.adobeBlankFontFaceRule)
            ),
            this._document.getElementsByTagName("head")[0].appendChild(A));
        },
        _checkAdobeBlankSize: function () {
          var A = this._testContainer.firstChild;
          this._adobeBlankLoaded(A);
        },
        _adobeBlankLoaded: function (A) {
          0 === A.offsetWidth &&
            ((c.adobeBlankReferenceSize = new o(A.offsetWidth, A.offsetHeight)),
            null !== this._adobeBlankSizeWatcher
              ? (this._adobeBlankSizeWatcher.endWatching(),
                this._adobeBlankSizeWatcher.removeScrollWatchers(),
                (this._adobeBlankSizeWatcher = null))
              : (window.clearInterval(this._intervalId),
                A.parentNode.removeChild(A)),
            this._testContainer.parentNode.removeChild(this._testContainer),
            this._loadFonts());
        },
        _cloneNodeSetStyleAndAttributes: function (A, t, e) {
          var B = this._testDiv.cloneNode(!0);
          return (
            (B.style.fontWeight = A.weight),
            (B.style.fontStyle = A.style),
            B.setAttribute("data-font-map-key", t),
            B.setAttribute("data-ref-font-family-index", String(e)),
            B
          );
        },
        _getFontMapKeyFromElement: function (A) {
          return A.getAttribute("data-font-map-key");
        },
        _getFontFromElement: function (A) {
          var t = this._getFontMapKeyFromElement(A);
          return this._fontsMap[t];
        },
        _getFontFamilyFromElement: function (A) {
          var t = this._getFontFromElement(A);
          try {
            return t.family;
          } catch (A) {
            return "";
          }
        },
        _getReferenceFontFamilyIndexFromElement: function (A) {
          return A.getAttribute("data-ref-font-family-index");
        },
        _getReferenceFontFamilyFromElement: function (A) {
          var t = this._getReferenceFontFamilyIndexFromElement(A);
          return c.referenceFontFamilies[t];
        },
        _fontVariationKeyForFont: function (A) {
          return A.weight + A.style;
        },
        _fontsMapKeyForFont: function (A) {
          return A.family + A.weight + A.style;
        },
        _loadFonts: function () {
          var A,
            t,
            e,
            B,
            i,
            n,
            g,
            o,
            s,
            a,
            r = this;
          for (A = 0; A < this._numberOfFonts; A++)
            for (
              i = this._fontsArray[A],
                n = this._fontsMapKeyForFont(i),
                this._fontsMap[n] = i,
                t = 0;
              t < c.referenceFontFamilies.length;
              t++
            )
              (e = this._cloneNodeSetStyleAndAttributes(i, n, t)),
                c.useResizeEvent
                  ? ((e.style.fontFamily = c.referenceFontFamilies[t]),
                    this._testContainer.appendChild(e))
                  : c.useIntervalChecking
                  ? ((e.style.fontFamily =
                      "'" + i.family + "', " + c.referenceFontFamilies[t]),
                    this._testContainer.appendChild(e))
                  : ((e.style.fontFamily = c.referenceFontFamilies[t]),
                    (a = c.useAdobeBlank
                      ? ((o = c.adobeBlankReferenceSize),
                        (s = l.directions.decrease),
                        l.dimensions.horizontal)
                      : ((g = this._fontVariationKeyForFont(i)),
                        (o = c.referenceFontFamilyVariationSizes[g][t]),
                        (s = l.directions.both),
                        l.dimensions.both)),
                    (B = new l(e, {
                      container: this._testContainer,
                      delegate: this,
                      size: o,
                      direction: s,
                      dimension: a,
                      document: this._document,
                    })),
                    this._sizeWatchers.push(B));
          if (
            (this._document.body.appendChild(this._testContainer),
            c.useResizeEvent)
          ) {
            for (t = 0; t < this._testContainer.childNodes.length; t++)
              (e = this._testContainer.childNodes[t]).attachEvent(
                "onresize",
                (function (A, t) {
                  return function () {
                    A._elementSizeChanged(t);
                  };
                })(this, e)
              );
            window.setTimeout(function () {
              for (t = 0; t < r._testContainer.childNodes.length; t++)
                (e = r._testContainer.childNodes[t]).style.fontFamily =
                  "'" +
                  r._getFontFamilyFromElement(e) +
                  "', " +
                  r._getReferenceFontFamilyFromElement(e);
            }, 0);
          } else if (c.useIntervalChecking)
            (this._intervalId = window.setInterval(function () {
              r._checkSizes();
            }, this._intervalDelay)),
              this._checkSizes();
          else {
            for (A = 0; A < this._sizeWatchers.length; A++)
              (B = this._sizeWatchers[A]).prepareForWatch();
            for (A = 0; A < this._sizeWatchers.length; A++)
              (B = this._sizeWatchers[A]).beginWatching(),
                ((e = B.getWatchedElement()).style.fontFamily =
                  "'" +
                  this._getFontFamilyFromElement(e) +
                  "', " +
                  r._getReferenceFontFamilyFromElement(e));
          }
        },
        _checkSizes: function () {
          var A, t, e, B, i, n;
          for (A = this._testContainer.childNodes.length - 1; 0 <= A; A--)
            (i = new o(
              (t = this._testContainer.childNodes[A]).offsetWidth,
              t.offsetHeight
            )),
              (c.useAdobeBlank
                ? c.adobeBlankReferenceSize
                : ((e = this._getFontFromElement(t)),
                  (B = this._fontVariationKeyForFont(e)),
                  (n = this._getReferenceFontFamilyIndexFromElement(t)),
                  c.referenceFontFamilyVariationSizes[B][n])
              ).isEqual(i) ||
                (t.parentNode.removeChild(t), this._elementSizeChanged(t));
        },
        _elementSizeChanged: function (A) {
          var t, e;
          this._finished ||
            ((e = this._getFontMapKeyFromElement(A)),
            void 0 !== this._fontsMap[e] &&
              ((t = this._fontsMap[e]),
              this._numberOfLoadedFonts++,
              delete this._fontsMap[e],
              this.delegate &&
                "function" == typeof this.delegate.fontLoaded &&
                this.delegate.fontLoaded(t),
              this._numberOfLoadedFonts === this._numberOfFonts &&
                this._finish()));
        },
        _finish: function () {
          var A,
            t,
            e,
            B,
            i = [];
          if (!this._finished) {
            for (
              this._finished = !0,
                null !== this._adobeBlankSizeWatcher &&
                  (this._adobeBlankSizeWatcher.getState() ===
                    l.states.watchingForSizeChange &&
                    this._adobeBlankSizeWatcher.endWatching(),
                  (this._adobeBlankSizeWatcher = null)),
                t = 0;
              t < this._sizeWatchers.length;
              t++
            )
              (e = this._sizeWatchers[t]).getState() ===
                l.states.watchingForSizeChange && e.endWatching();
            if (
              ((this._sizeWatchers = []),
              null !== this._testContainer &&
                this._testContainer.parentNode.removeChild(this._testContainer),
              null !== this._timeoutId && window.clearTimeout(this._timeoutId),
              null !== this._intervalId &&
                window.clearInterval(this._intervalId),
              this.delegate)
            ) {
              if (this._numberOfLoadedFonts < this._numberOfFonts) {
                for (B in this._fontsMap)
                  this._fontsMap.hasOwnProperty(B) && i.push(this._fontsMap[B]);
                A = {
                  message:
                    "Not all fonts were loaded (" +
                    this._numberOfLoadedFonts +
                    "/" +
                    this._numberOfFonts +
                    ")",
                  notLoadedFonts: i,
                };
              } else A = null;
              "function" == typeof this.delegate.complete
                ? this.delegate.complete(A)
                : "function" == typeof this.delegate.fontsLoaded &&
                  this.delegate.fontsLoaded(A);
            }
          }
        },
        sizeWatcherChangedSize: function (A) {
          var t = A.getWatchedElement();
          A === this._adobeBlankSizeWatcher
            ? this._adobeBlankLoaded(t)
            : this._elementSizeChanged(t);
        },
      }),
      (o.sizeFromString = function (A) {
        var t = A.split(",");
        return 2 !== t.length ? null : new o(t[0], t[1]);
      }),
      (o.prototype.isEqual = function (A) {
        return this.width === A.width && this.height === A.height;
      }),
      (o.prototype.toString = function () {
        return this.width + "," + this.height;
      }),
      (l.states = {
        initialized: 0,
        generatedScrollWatchers: 1,
        appendedScrollWatchers: 2,
        preparedScrollWatchers: 3,
        watchingForSizeChange: 4,
      }),
      (l.directions = { decrease: 1, increase: 2, both: 3 }),
      (l.dimensions = { horizontal: 1, vertical: 2, both: 3 }),
      (l.prototype = {
        constructor: l,
        getWatchedElement: function () {
          return this._element;
        },
        getState: function () {
          return this._state;
        },
        setSize: function (A) {
          (this._size = A),
            this._direction & l.directions.increase &&
              (this._sizeIncreaseWatcherContentElm.style.cssText =
                "width: " +
                (A.width + this._scrollAmount) +
                "px; height: " +
                (A.height + this._scrollAmount) +
                "px;"),
            this._direction & l.directions.decrease &&
              (this._sizeDecreaseWatcherElm.style.cssText =
                "position:absolute; left: 0px; top: 0px; overflow: hidden; width: " +
                (A.width - this._scrollAmount) +
                "px; height: " +
                (A.height - this._scrollAmount) +
                "px;");
        },
        _generateScrollWatchers: function (A) {
          (this._element.style.position = "absolute"),
            this._direction & l.directions.increase &&
              ((this._sizeIncreaseWatcherContentElm =
                this._document.createElement("div")),
              (this._sizeIncreaseWatcherElm =
                this._document.createElement("div")),
              (this._sizeIncreaseWatcherElm.style.cssText =
                "position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden;"),
              this._sizeIncreaseWatcherElm.appendChild(
                this._sizeIncreaseWatcherContentElm
              ),
              this._element.appendChild(this._sizeIncreaseWatcherElm)),
            this._direction & l.directions.decrease &&
              ((this._sizeDecreaseWatcherElm =
                this._document.createElement("div")),
              this._sizeDecreaseWatcherElm.appendChild(this._element)),
            A && this.setSize(A),
            (this._state = l.states.generatedScrollWatchers);
        },
        _appendScrollWatchersToElement: function (A) {
          if (this._state !== l.states.generatedScrollWatchers)
            throw new Error(
              "SizeWatcher._appendScrollWatchersToElement() was invoked before SizeWatcher._generateScrollWatchers()"
            );
          this._direction & l.directions.decrease
            ? A.appendChild(this._sizeDecreaseWatcherElm)
            : A.appendChild(this._element),
            (this._state = l.states.appendedScrollWatchers);
        },
        removeScrollWatchers: function () {
          this._direction & l.directions.decrease
            ? this._sizeDecreaseWatcherElm.parentNode &&
              this._sizeDecreaseWatcherElm.parentNode.removeChild(
                this._sizeDecreaseWatcherElm
              )
            : this._element.parentNode &&
              this._element.parentNode.removeChild(this._element);
        },
        prepareForWatch: function () {
          var A,
            t = !0,
            e = !0;
          if (this._state !== l.states.appendedScrollWatchers)
            throw new Error(
              "SizeWatcher.prepareForWatch() invoked before SizeWatcher._appendScrollWatchersToElement()"
            );
          if (
            (null === this._size &&
              this.setSize(
                new o(this._element.offsetWidth, this._element.offsetHeight)
              ),
            this._direction & l.directions.decrease &&
              (t = this._scrollElementToBottomRight(
                this._sizeDecreaseWatcherElm
              )),
            this._direction & l.directions.increase &&
              (e = this._scrollElementToBottomRight(
                this._sizeIncreaseWatcherElm
              )),
            !t || !e)
          ) {
            for (
              A = this._element.parentNode;
              A !== this._document && null !== A;

            )
              A = A.parentNode;
            if (null === A)
              throw new Error(
                "Can't set scroll position of scroll watchers. SizeWatcher is not in the DOM tree."
              );
            console && console.warn;
          }
          this._state = l.states.preparedScrollWatchers;
        },
        _scrollElementToBottomRight: function (A) {
          var t = !0;
          return (
            this._dimension & l.dimensions.vertical &&
              ((A.scrollTop = this._scrollAmount), (t = t && 0 < A.scrollTop)),
            this._dimension & l.dimensions.horizontal &&
              ((A.scrollLeft = this._scrollAmount),
              (t = t && 0 < A.scrollLeft)),
            t
          );
        },
        beginWatching: function () {
          if (this._state !== l.states.preparedScrollWatchers)
            throw new Error(
              "SizeWatcher.beginWatching() invoked before SizeWatcher.prepareForWatch()"
            );
          this._direction & l.directions.decrease &&
            this._sizeDecreaseWatcherElm.addEventListener("scroll", this, !1),
            this._direction & l.directions.increase &&
              this._sizeIncreaseWatcherElm.addEventListener("scroll", this, !1),
            (this._state = l.states.watchingForSizeChange);
        },
        endWatching: function () {
          if (this._state !== l.states.watchingForSizeChange)
            throw new Error(
              "SizeWatcher.endWatching() invoked before SizeWatcher.beginWatching()"
            );
          this._direction & l.directions.decrease &&
            this._sizeDecreaseWatcherElm.removeEventListener(
              "scroll",
              this,
              !1
            ),
            this._direction & l.directions.increase &&
              this._sizeIncreaseWatcherElm.removeEventListener(
                "scroll",
                this,
                !1
              ),
            (this._state = l.states.appendedScrollWatchers);
        },
        handleEvent: function (A) {
          var t;
          this._state === l.states.watchingForSizeChange &&
            ((t = new o(this._element.offsetWidth, this._element.offsetHeight)),
            this._size.isEqual(t) ||
              (this._delegate &&
                "function" == typeof this._delegate.sizeWatcherChangedSize &&
                (this._delegate.sizeWatcherChangedSize(this),
                this._state !== l.states.watchingForSizeChange)) ||
              (this._continuous
                ? (this.setSize(t),
                  (this._state = l.states.appendedScrollWatchers),
                  this.prepareForWatch(),
                  (this._state = l.states.watchingForSizeChange))
                : this.endWatching()));
        },
      }),
      c
    );
  }),
  (sharky_throttle = function (e, B, i) {
    var n,
      g,
      o,
      s,
      a = 0;
    i || (i = {});
    var r = function () {
        (a = !1 === i.leading ? 0 : Date.now()),
          (n = null),
          (s = e.apply(g, o)),
          n || (g = o = null);
      },
      A = function () {
        var A = Date.now();
        a || !1 !== i.leading || (a = A);
        var t = B - (A - a);
        return (
          (g = this),
          (o = arguments),
          t <= 0 || B < t
            ? (n && (clearTimeout(n), (n = null)),
              (a = A),
              (s = e.apply(g, o)),
              n || (g = o = null))
            : n || !1 === i.trailing || (n = setTimeout(r, t)),
          s
        );
      };
    return (
      (A.cancel = function () {
        clearTimeout(n), (a = 0), (n = g = o = null);
      }),
      A
    );
  }),
  (StickyHeaderObj.prototype = {
    init: function () {
      var A = this;
      (A.PixelToBottomTollerance = 0),
        (A.StickyThreshold = 206),
        (A.MaxScreenHeightToApplySicky = 80),
        (A.IsLastQuestion = !1),
        (A.theQuestionText = A.theContainer.find(".question:first")),
        (A.theStickyQuestionText = A.theQuestionText.clone()),
        A.theStickyQuestionText
          .insertAfter(A.theQuestionText)
          .addClass("sticky-question-text"),
        A.theStickyQuestionText.append(
          "<i class='sticky fa fa-chevron-down'></i><i class='sticky fa fa-chevron-up'></i><div class='overlay'></div>"
        ),
        A.theContainer.is($(".question-container").last()) &&
          (A.IsLastQuestion = !0),
        A._bindEvents();
    },
    _bindEvents: function () {
      var B = this;
      B.theContainer.on("click", ".question .fa-chevron-down", function () {
        B._toggleStickyStatement("expand");
      }),
        B.theContainer.on("click", ".question .fa-chevron-up", function () {
          B._toggleStickyStatement("collapse");
        }),
        $(window)
          .on("resize", function (A) {
            var t = $(window).width();
            if (t == B.cachedWidth) return !1;
            (B.cachedWidth = t), B._deactivateStickyContent();
            var e = setInterval(function () {
              B._doStickyLogic();
            }, 25);
            setTimeout(function () {
              clearInterval(e);
            }, 2e3);
          })
          .trigger("resize"),
        $(window).on(
          "scroll",
          function (A, t) {
            B._doStickyLogic();
          },
          10
        );
    },
    _doStickyLogic: function () {
      this._setVisibleFixedNavBar();
      var A = this._isElementInViewport(this.theQuestionText);
      this._setStickyState(A);
    },
    _setStickyState: function (A) {
      var t = this,
        e = t._isElementInViewport(t.theContainer),
        B = t.visibleFixedNavBar ? $("#navigation-bar").height() : 0,
        i = t.theQuestionText.height(),
        n = document.documentElement.clientHeight || window.innerHeight,
        g = t.thePictureTop ? t.thePictureTop.height() : 0,
        o = t.thePictureBottom ? t.thePictureBottom.height() : 0;
      i > (n * t.MaxScreenHeightToApplySicky) / 100 ||
      t.theControls.height() + g + o + B + Math.min(i, 150) + 50 < n
        ? t._deactivateStickyContent()
        : 1 < $(".question-container").length &&
          !t.IsLastQuestion &&
          e.bottomPX - t.PixelToBottomTollerance < n
        ? t._deactivateStickyContent()
        : (A.top ||
            t.theContainer.hasClass("sticky-active") ||
            (t.theContainer.addClass("sticky-active"),
            t.theStickyQuestionText.css("top", B + "px"),
            t.theStickyQuestionText.width(t.theQuestionText.width()),
            t.theQuestionText.height() > t.StickyThreshold &&
              t._toggleStickyStatement("collapse")),
          A.top &&
            t.theContainer.hasClass("sticky-active") &&
            t._deactivateStickyContent());
    },
    _setVisibleFixedNavBar: function () {
      "ontouchstart" in document.documentElement ||
      this.isWirelessDevice ||
      !$("#navigation-bar").is(":visible") ||
      "fixed" != $("#navigation-bar").css("position")
        ? (this.visibleFixedNavBar = !1)
        : (this.visibleFixedNavBar = !0);
    },
    _isElementInViewport: function (A, t) {
      var e = $(window),
        B = e.scrollLeft(),
        i = e.scrollTop(),
        n = A.offset(),
        g = {},
        o = 0;
      return (
        (g.topPX = n.top - i),
        this.visibleFixedNavBar && (o = $("#navigation-bar").height()),
        (g.top = g.topPX >= o),
        t ||
          ((g.leftPX = n.left - B),
          (g.bottomPX = n.top - i + A.height()),
          (g.rightPX = n.left - B + A.width()),
          (g.left = 0 <= g.leftPX),
          (g.bottom =
            g.bottomPX <=
            (document.documentElement.clientHeight || window.innerHeight)),
          (g.right =
            g.rightPX <=
            (document.documentElement.clientWidth || window.innerWidth))),
        g
      );
    },
    _toggleStickyStatement: function (A) {
      "collapse" === A || "collapsed" === A
        ? this.theContainer
            .removeClass("toggle-expanded")
            .addClass("toggle-collapsed")
        : this.theContainer
            .removeClass("toggle-collapsed")
            .addClass("toggle-expanded");
    },
    _deactivateStickyContent: function () {
      this.theContainer.hasClass("sticky-active") &&
        (this.theContainer.removeClass("sticky-active"),
        this.theContainer.removeClass("toggle-collapsed toggle-expanded"));
    },
  });
var Visibility = (function () {
  var A, t, e;
  return (
    void 0 !== document.hidden
      ? ((A = "hidden"), (t = "visibilitychange"), (e = "visibilityState"))
      : void 0 !== document.mozHidden
      ? ((A = "mozHidden"),
        (t = "mozvisibilitychange"),
        (e = "mozVisibilityState"))
      : void 0 !== document.msHidden
      ? ((A = "msHidden"),
        (t = "msvisibilitychange"),
        (e = "msVisibilityState"))
      : void 0 !== document.webkitHidden &&
        ((A = "webkitHidden"),
        (t = "webkitvisibilitychange"),
        (e = "webkitVisibilityState")),
    {
      isHidden: function () {
        return document[A] || !1;
      },
      state: e,
      hidden: A,
      visibilitychange: t,
    }
  );
})();
function pageSubmit() {
  "function" == typeof dg_submit && dg_submit(), document.mrForm.submit();
}
