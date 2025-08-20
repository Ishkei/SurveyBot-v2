import { t as li, e as ci } from "./_commonjsHelpers.C3AsgxGs-B-SmbmTK.js";
var K,
  Q,
  J = { exports: {} };
(K = J),
  (Q = J.exports),
  (function (_, c) {
    var I = "function",
      E = "undefined",
      L = "object",
      O = "string",
      Y = "major",
      e = "model",
      a = "name",
      i = "type",
      o = "vendor",
      r = "version",
      h = "architecture",
      q = "console",
      s = "mobile",
      b = "tablet",
      m = "smarttv",
      T = "wearable",
      F = "embedded",
      C = "Amazon",
      z = "Apple",
      ii = "ASUS",
      ei = "BlackBerry",
      k = "Browser",
      U = "Chrome",
      j = "Firefox",
      M = "Google",
      oi = "Huawei",
      G = "LG",
      H = "Microsoft",
      ai = "Motorola",
      R = "Opera",
      B = "Samsung",
      ri = "Sharp",
      P = "Sony",
      Z = "Xiaomi",
      $ = "Zebra",
      ti = "Facebook",
      ni = "Chromium OS",
      si = "Mac OS",
      V = function (d) {
        for (var l = {}, n = 0; n < d.length; n++) l[d[n].toUpperCase()] = d[n];
        return l;
      },
      bi = function (d, l) {
        return typeof d === O && N(l).indexOf(N(d)) !== -1;
      },
      N = function (d) {
        return d.toLowerCase();
      },
      W = function (d, l) {
        if (typeof d === O)
          return (
            (d = d.replace(/^\s\s*/, "")),
            typeof l === E ? d : d.substring(0, 500)
          );
      },
      A = function (d, l) {
        for (var n, u, v, w, x, t, p = 0; p < l.length && !x; ) {
          var y = l[p],
            g = l[p + 1];
          for (n = u = 0; n < y.length && !x && y[n]; )
            if ((x = y[n++].exec(d)))
              for (v = 0; v < g.length; v++)
                (t = x[++u]),
                  typeof (w = g[v]) === L && w.length > 0
                    ? w.length === 2
                      ? typeof w[1] == I
                        ? (this[w[0]] = w[1].call(this, t))
                        : (this[w[0]] = w[1])
                      : w.length === 3
                      ? typeof w[1] !== I || (w[1].exec && w[1].test)
                        ? (this[w[0]] = t ? t.replace(w[1], w[2]) : c)
                        : (this[w[0]] = t ? w[1].call(this, t, w[2]) : c)
                      : w.length === 4 &&
                        (this[w[0]] = t
                          ? w[3].call(this, t.replace(w[1], w[2]))
                          : c)
                    : (this[w] = t || c);
          p += 2;
        }
      },
      X = function (d, l) {
        for (var n in l)
          if (typeof l[n] === L && l[n].length > 0) {
            for (var u = 0; u < l[n].length; u++)
              if (bi(l[n][u], d)) return n === "?" ? c : n;
          } else if (bi(l[n], d)) return n === "?" ? c : n;
        return d;
      },
      wi = {
        ME: "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        2e3: "NT 5.0",
        XP: ["NT 5.1", "NT 5.2"],
        Vista: "NT 6.0",
        7: "NT 6.1",
        8: "NT 6.2",
        8.1: "NT 6.3",
        10: ["NT 6.4", "NT 10.0"],
        RT: "ARM",
      },
      di = {
        browser: [
          [/\b(?:crmo|crios)\/([\w\.]+)/i],
          [r, [a, "Chrome"]],
          [/edg(?:e|ios|a)?\/([\w\.]+)/i],
          [r, [a, "Edge"]],
          [
            /(opera mini)\/([-\w\.]+)/i,
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
          ],
          [a, r],
          [/opios[\/ ]+([\w\.]+)/i],
          [r, [a, R + " Mini"]],
          [/\bopr\/([\w\.]+)/i],
          [r, [a, R]],
          [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
          [r, [a, "Baidu"]],
          [
            /(kindle)\/([\w\.]+)/i,
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
            /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
            /(?:ms|\()(ie) ([\w\.]+)/i,
            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
            /(heytap|ovi)browser\/([\d\.]+)/i,
            /(weibo)__([\d\.]+)/i,
          ],
          [a, r],
          [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
          [r, [a, "UC" + k]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i,
          ],
          [r, [a, "WeChat"]],
          [/konqueror\/([\w\.]+)/i],
          [r, [a, "Konqueror"]],
          [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
          [r, [a, "IE"]],
          [/ya(?:search)?browser\/([\w\.]+)/i],
          [r, [a, "Yandex"]],
          [/slbrowser\/([\w\.]+)/i],
          [r, [a, "Smart Lenovo " + k]],
          [/(avast|avg)\/([\w\.]+)/i],
          [[a, /(.+)/, "$1 Secure " + k], r],
          [/\bfocus\/([\w\.]+)/i],
          [r, [a, j + " Focus"]],
          [/\bopt\/([\w\.]+)/i],
          [r, [a, R + " Touch"]],
          [/coc_coc\w+\/([\w\.]+)/i],
          [r, [a, "Coc Coc"]],
          [/dolfin\/([\w\.]+)/i],
          [r, [a, "Dolphin"]],
          [/coast\/([\w\.]+)/i],
          [r, [a, R + " Coast"]],
          [/miuibrowser\/([\w\.]+)/i],
          [r, [a, "MIUI " + k]],
          [/fxios\/([-\w\.]+)/i],
          [r, [a, j]],
          [/\bqihu|(qi?ho?o?|360)browser/i],
          [[a, "360 " + k]],
          [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],
          [[a, /(.+)/, "$1 " + k], r],
          [/samsungbrowser\/([\w\.]+)/i],
          [r, [a, B + " Internet"]],
          [/(comodo_dragon)\/([\w\.]+)/i],
          [[a, /_/g, " "], r],
          [/metasr[\/ ]?([\d\.]+)/i],
          [r, [a, "Sogou Explorer"]],
          [/(sogou)mo\w+\/([\d\.]+)/i],
          [[a, "Sogou Mobile"], r],
          [
            /(electron)\/([\w\.]+) safari/i,
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i,
          ],
          [a, r],
          [/(lbbrowser)/i, /\[(linkedin)app\]/i],
          [a],
          [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
          [[a, ti], r],
          [
            /(Klarna)\/([\w\.]+)/i,
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
            /safari (line)\/([\w\.]+)/i,
            /\b(line)\/([\w\.]+)\/iab/i,
            /(alipay)client\/([\w\.]+)/i,
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i,
          ],
          [a, r],
          [/\bgsa\/([\w\.]+) .*safari\//i],
          [r, [a, "GSA"]],
          [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
          [r, [a, "TikTok"]],
          [/headlesschrome(?:\/([\w\.]+)| )/i],
          [r, [a, U + " Headless"]],
          [/ wv\).+(chrome)\/([\w\.]+)/i],
          [[a, U + " WebView"], r],
          [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
          [r, [a, "Android " + k]],
          [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
          [a, r],
          [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
          [r, [a, "Mobile Safari"]],
          [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
          [r, a],
          [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
          [
            a,
            [
              r,
              X,
              {
                "1.0": "/8",
                1.2: "/1",
                1.3: "/3",
                "2.0": "/412",
                "2.0.2": "/416",
                "2.0.3": "/417",
                "2.0.4": "/419",
                "?": "/",
              },
            ],
          ],
          [/(webkit|khtml)\/([\w\.]+)/i],
          [a, r],
          [/(navigator|netscape\d?)\/([-\w\.]+)/i],
          [[a, "Netscape"], r],
          [/mobile vr; rv:([\w\.]+)\).+firefox/i],
          [r, [a, j + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            /(swiftfox)/i,
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            /(firefox)\/([\w\.]+)/i,
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            /(links) \(([\w\.]+)/i,
            /panasonic;(viera)/i,
          ],
          [a, r],
          [/(cobalt)\/([\w\.]+)/i],
          [a, [r, /master.|lts./, ""]],
        ],
        cpu: [
          [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
          [[h, "amd64"]],
          [/(ia32(?=;))/i],
          [[h, N]],
          [/((?:i[346]|x)86)[;\)]/i],
          [[h, "ia32"]],
          [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
          [[h, "arm64"]],
          [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
          [[h, "armhf"]],
          [/windows (ce|mobile); ppc;/i],
          [[h, "arm"]],
          [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
          [[h, /ower/, "", N]],
          [/(sun4\w)[;\)]/i],
          [[h, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
          ],
          [[h, N]],
        ],
        device: [
          [
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
          ],
          [e, [o, B], [i, b]],
          [
            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i,
          ],
          [e, [o, B], [i, s]],
          [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
          [e, [o, z], [i, s]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
          ],
          [e, [o, z], [i, b]],
          [/(macintosh);/i],
          [e, [o, z]],
          [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
          [e, [o, ri], [i, s]],
          [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
          [e, [o, oi], [i, b]],
          [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
          ],
          [e, [o, oi], [i, s]],
          [
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
            /\b; (\w+) build\/hm\1/i,
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
          ],
          [
            [e, /_/g, " "],
            [o, Z],
            [i, s],
          ],
          [
            /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i,
          ],
          [
            [e, /_/g, " "],
            [o, Z],
            [i, b],
          ],
          [
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
          ],
          [e, [o, "OPPO"], [i, s]],
          [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
          [e, [o, "Vivo"], [i, s]],
          [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
          [e, [o, "Realme"], [i, s]],
          [
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
          ],
          [e, [o, ai], [i, s]],
          [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
          [e, [o, ai], [i, b]],
          [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
          [e, [o, G], [i, b]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i,
          ],
          [e, [o, G], [i, s]],
          [
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
          ],
          [e, [o, "Lenovo"], [i, b]],
          [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
          [
            [e, /_/g, " "],
            [o, "Nokia"],
            [i, s],
          ],
          [/(pixel c)\b/i],
          [e, [o, M], [i, b]],
          [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
          [e, [o, M], [i, s]],
          [
            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
          ],
          [e, [o, P], [i, s]],
          [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
          [
            [e, "Xperia Tablet"],
            [o, P],
            [i, b],
          ],
          [
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
          ],
          [e, [o, "OnePlus"], [i, s]],
          [
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
            /(kf[a-z]+)( bui|\)).+silk\//i,
          ],
          [e, [o, C], [i, b]],
          [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
          [
            [e, /(.+)/g, "Fire Phone $1"],
            [o, C],
            [i, s],
          ],
          [/(playbook);[-\w\),; ]+(rim)/i],
          [e, o, [i, b]],
          [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
          [e, [o, ei], [i, s]],
          [
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
          ],
          [e, [o, ii], [i, b]],
          [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
          [e, [o, ii], [i, s]],
          [/(nexus 9)/i],
          [e, [o, "HTC"], [i, b]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
          ],
          [o, [e, /_/g, " "], [i, s]],
          [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
          [e, [o, "Acer"], [i, b]],
          [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
          [e, [o, "Meizu"], [i, s]],
          [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
          [e, [o, "Ulefone"], [i, s]],
          [
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
            /(hp) ([\w ]+\w)/i,
            /(asus)-?(\w+)/i,
            /(microsoft); (lumia[\w ]+)/i,
            /(lenovo)[-_ ]?([-\w]+)/i,
            /(jolla)/i,
            /(oppo) ?([\w ]+) bui/i,
          ],
          [o, e, [i, s]],
          [
            /(kobo)\s(ereader|touch)/i,
            /(archos) (gamepad2?)/i,
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            /(kindle)\/([\w\.]+)/i,
            /(nook)[\w ]+build\/(\w+)/i,
            /(dell) (strea[kpr\d ]*[\dko])/i,
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            /(trinity)[- ]*(t\d{3}) bui/i,
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            /(vodafone) ([\w ]+)(?:\)| bui)/i,
          ],
          [o, e, [i, b]],
          [/(surface duo)/i],
          [e, [o, H], [i, b]],
          [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
          [e, [o, "Fairphone"], [i, s]],
          [/(u304aa)/i],
          [e, [o, "AT&T"], [i, s]],
          [/\bsie-(\w*)/i],
          [e, [o, "Siemens"], [i, s]],
          [/\b(rct\w+) b/i],
          [e, [o, "RCA"], [i, b]],
          [/\b(venue[\d ]{2,7}) b/i],
          [e, [o, "Dell"], [i, b]],
          [/\b(q(?:mv|ta)\w+) b/i],
          [e, [o, "Verizon"], [i, b]],
          [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
          [e, [o, "Barnes & Noble"], [i, b]],
          [/\b(tm\d{3}\w+) b/i],
          [e, [o, "NuVision"], [i, b]],
          [/\b(k88) b/i],
          [e, [o, "ZTE"], [i, b]],
          [/\b(nx\d{3}j) b/i],
          [e, [o, "ZTE"], [i, s]],
          [/\b(gen\d{3}) b.+49h/i],
          [e, [o, "Swiss"], [i, s]],
          [/\b(zur\d{3}) b/i],
          [e, [o, "Swiss"], [i, b]],
          [/\b((zeki)?tb.*\b) b/i],
          [e, [o, "Zeki"], [i, b]],
          [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
          [[o, "Dragon Touch"], e, [i, b]],
          [/\b(ns-?\w{0,9}) b/i],
          [e, [o, "Insignia"], [i, b]],
          [/\b((nxa|next)-?\w{0,9}) b/i],
          [e, [o, "NextBook"], [i, b]],
          [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
          [[o, "Voice"], e, [i, s]],
          [/\b(lvtel\-)?(v1[12]) b/i],
          [[o, "LvTel"], e, [i, s]],
          [/\b(ph-1) /i],
          [e, [o, "Essential"], [i, s]],
          [/\b(v(100md|700na|7011|917g).*\b) b/i],
          [e, [o, "Envizen"], [i, b]],
          [/\b(trio[-\w\. ]+) b/i],
          [e, [o, "MachSpeed"], [i, b]],
          [/\btu_(1491) b/i],
          [e, [o, "Rotor"], [i, b]],
          [/(shield[\w ]+) b/i],
          [e, [o, "Nvidia"], [i, b]],
          [/(sprint) (\w+)/i],
          [o, e, [i, s]],
          [/(kin\.[onetw]{3})/i],
          [
            [e, /\./g, " "],
            [o, H],
            [i, s],
          ],
          [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
          [e, [o, $], [i, b]],
          [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
          [e, [o, $], [i, s]],
          [/smart-tv.+(samsung)/i],
          [o, [i, m]],
          [/hbbtv.+maple;(\d+)/i],
          [
            [e, /^/, "SmartTV"],
            [o, B],
            [i, m],
          ],
          [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
          [
            [o, G],
            [i, m],
          ],
          [/(apple) ?tv/i],
          [o, [e, z + " TV"], [i, m]],
          [/crkey/i],
          [
            [e, U + "cast"],
            [o, M],
            [i, m],
          ],
          [/droid.+aft(\w+)( bui|\))/i],
          [e, [o, C], [i, m]],
          [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
          [e, [o, ri], [i, m]],
          [/(bravia[\w ]+)( bui|\))/i],
          [e, [o, P], [i, m]],
          [/(mitv-\w{5}) bui/i],
          [e, [o, Z], [i, m]],
          [/Hbbtv.*(technisat) (.*);/i],
          [o, e, [i, m]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
          ],
          [
            [o, W],
            [e, W],
            [i, m],
          ],
          [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
          [[i, m]],
          [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
          [o, e, [i, q]],
          [/droid.+; (shield) bui/i],
          [e, [o, "Nvidia"], [i, q]],
          [/(playstation [345portablevi]+)/i],
          [e, [o, P], [i, q]],
          [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
          [e, [o, H], [i, q]],
          [/((pebble))app/i],
          [o, e, [i, T]],
          [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
          [e, [o, z], [i, T]],
          [/droid.+; (glass) \d/i],
          [e, [o, M], [i, T]],
          [/droid.+; (wt63?0{2,3})\)/i],
          [e, [o, $], [i, T]],
          [/(quest( 2| pro)?)/i],
          [e, [o, ti], [i, T]],
          [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
          [o, [i, F]],
          [/(aeobc)\b/i],
          [e, [o, C], [i, F]],
          [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],
          [e, [i, s]],
          [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
          [e, [i, b]],
          [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
          [[i, b]],
          [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
          [[i, s]],
          [/(android[-\w\. ]{0,9});.+buil/i],
          [e, [o, "Generic"]],
        ],
        engine: [
          [/windows.+ edge\/([\w\.]+)/i],
          [r, [a, "EdgeHTML"]],
          [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
          [r, [a, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
            /ekioh(flow)\/([\w\.]+)/i,
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            /\b(libweb)/i,
          ],
          [a, r],
          [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
          [r, a],
        ],
        os: [
          [/microsoft (windows) (vista|xp)/i],
          [a, r],
          [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],
          [a, [r, X, wi]],
          [
            /windows nt 6\.2; (arm)/i,
            /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
          ],
          [
            [r, X, wi],
            [a, "Windows"],
          ],
          [
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i,
          ],
          [
            [r, /_/g, "."],
            [a, "iOS"],
          ],
          [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
          [
            [a, si],
            [r, /_/g, "."],
          ],
          [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
          [r, a],
          [
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,
            /(tizen|kaios)[\/ ]([\w\.]+)/i,
            /\((series40);/i,
          ],
          [a, r],
          [/\(bb(10);/i],
          [r, [a, ei]],
          [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
          [r, [a, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
          ],
          [r, [a, j + " OS"]],
          [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
          [r, [a, "webOS"]],
          [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
          [r, [a, "watchOS"]],
          [/crkey\/([\d\.]+)/i],
          [r, [a, U + "cast"]],
          [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
          [[a, ni], r],
          [
            /panasonic;(viera)/i,
            /(netrange)mmh/i,
            /(nettv)\/(\d+\.[\w\.]+)/i,
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            /(xbox); +xbox ([^\);]+)/i,
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            /(mint)[\/\(\) ]?(\w*)/i,
            /(mageia|vectorlinux)[; ]/i,
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            /(hurd|linux) ?([\w\.]*)/i,
            /(gnu) ?([\w\.]*)/i,
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            /(haiku) (\w+)/i,
          ],
          [a, r],
          [/(sunos) ?([\w\.\d]*)/i],
          [[a, "Solaris"], r],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            /(unix) ?([\w\.]*)/i,
          ],
          [a, r],
        ],
      },
      f = function (d, l) {
        if ((typeof d === L && ((l = d), (d = c)), !(this instanceof f)))
          return new f(d, l).getResult();
        var n = typeof _ !== E && _.navigator ? _.navigator : c,
          u = d || (n && n.userAgent ? n.userAgent : ""),
          v = n && n.userAgentData ? n.userAgentData : c,
          w = l
            ? (function (t, p) {
                var y = {};
                for (var g in t)
                  p[g] && p[g].length % 2 == 0
                    ? (y[g] = p[g].concat(t[g]))
                    : (y[g] = t[g]);
                return y;
              })(di, l)
            : di,
          x = n && n.userAgent == u;
        return (
          (this.getBrowser = function () {
            var t,
              p = {};
            return (
              (p[a] = c),
              (p[r] = c),
              A.call(p, u, w.browser),
              (p[Y] =
                typeof (t = p[r]) === O
                  ? t.replace(/[^\d\.]/g, "").split(".")[0]
                  : c),
              x &&
                n &&
                n.brave &&
                typeof n.brave.isBrave == I &&
                (p[a] = "Brave"),
              p
            );
          }),
          (this.getCPU = function () {
            var t = {};
            return (t[h] = c), A.call(t, u, w.cpu), t;
          }),
          (this.getDevice = function () {
            var t = {};
            return (
              (t[o] = c),
              (t[e] = c),
              (t[i] = c),
              A.call(t, u, w.device),
              x && !t[i] && v && v.mobile && (t[i] = s),
              x &&
                t[e] == "Macintosh" &&
                n &&
                typeof n.standalone !== E &&
                n.maxTouchPoints &&
                n.maxTouchPoints > 2 &&
                ((t[e] = "iPad"), (t[i] = b)),
              t
            );
          }),
          (this.getEngine = function () {
            var t = {};
            return (t[a] = c), (t[r] = c), A.call(t, u, w.engine), t;
          }),
          (this.getOS = function () {
            var t = {};
            return (
              (t[a] = c),
              (t[r] = c),
              A.call(t, u, w.os),
              x &&
                !t[a] &&
                v &&
                v.platform != "Unknown" &&
                (t[a] = v.platform
                  .replace(/chrome os/i, ni)
                  .replace(/macos/i, si)),
              t
            );
          }),
          (this.getResult = function () {
            return {
              ua: this.getUA(),
              browser: this.getBrowser(),
              engine: this.getEngine(),
              os: this.getOS(),
              device: this.getDevice(),
              cpu: this.getCPU(),
            };
          }),
          (this.getUA = function () {
            return u;
          }),
          (this.setUA = function (t) {
            return (u = typeof t === O && t.length > 500 ? W(t, 500) : t), this;
          }),
          this.setUA(u),
          this
        );
      };
    (f.VERSION = "0.7.37"),
      (f.BROWSER = V([a, r, Y])),
      (f.CPU = V([h])),
      (f.DEVICE = V([e, o, i, q, s, m, b, T, F])),
      (f.ENGINE = f.OS = V([a, r])),
      K.exports && (Q = K.exports = f),
      (Q.UAParser = f);
    var S = typeof _ !== E && (_.jQuery || _.Zepto);
    if (S && !S.ua) {
      var D = new f();
      (S.ua = D.getResult()),
        (S.ua.get = function () {
          return D.getUA();
        }),
        (S.ua.set = function (d) {
          D.setUA(d);
          var l = D.getResult();
          for (var n in l) S.ua[n] = l[n];
        });
    }
  })(typeof window == "object" ? window : ci);
var ui = li(J.exports),
  mi = Object.freeze({ __proto__: null, default: ui });
export { mi as u };
