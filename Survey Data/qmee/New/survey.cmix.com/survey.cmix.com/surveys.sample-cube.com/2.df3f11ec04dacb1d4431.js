(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    IA5S: function (e, t, n) {
      "use strict";
      var r = n("mrSG"),
        i = n("fNSe"),
        s = n("Ccae"),
        a = n("5fN4"),
        o = n("fJYB"),
        u = n("6of5"),
        c = (function () {
          return function () {
            (this.respondent = new u.a()),
              (this.url = ""),
              (this.accountId = 0);
          };
        })(),
        l = n("y/dN"),
        p = n("v24p"),
        d = n("SSnk"),
        h = n("GV/m"),
        f = n("cpR2"),
        g = n("pbCj"),
        b = n("T6l3");
      n.d(t, "b", function () {
        return v;
      }),
        n.d(t, "a", function () {
          return y;
        });
      var v = (function (e) {
          function t(t) {
            var n = e.call(this, t) || this;
            return (
              (n.imagePixelUrl = ""),
              (n.javaScriptUrl = ""),
              (n.redirectUrl = ""),
              (n.iframeurl = ""),
              (n.comScoreImageUrl = ""),
              n
            );
          }
          return (
            Object(r.b)(t, e),
            Object.defineProperty(t.prototype, "hasSafeIframeUrl", {
              get: function () {
                return !!this.iframeurl;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "hasSafeRedirectUrl", {
              get: function () {
                return !!this.redirectUrl;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "hasSafeJavaScriptUrl", {
              get: function () {
                return !!this.javaScriptUrl;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "hasSafeImagePixelUrl", {
              get: function () {
                return !!this.imagePixelUrl;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "hasSafeComScoreImageUrl", {
              get: function () {
                return !!this.comScoreImageUrl;
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(i.a),
        y = (function (e) {
          function t(t, n) {
            var r = e.call(this, "Loading ...") || this;
            return (
              (r.endService = t),
              (r.sanitizer = n),
              (r.endingInputData = null),
              (r.endingOutputData = null),
              (r.supplierUrlEncryptionInputData = new c()),
              (r.win = !1),
              (r.fail = !1),
              (r.quotaFail = !1),
              r.sessionStorageService.set("sc.step", p.a.Landed),
              r
            );
          }
          return (
            Object(r.b)(t, e),
            Object.defineProperty(t.prototype, "safeIframeUrl", {
              get: function () {
                return this.sanitizer.bypassSecurityTrustUrl(this.iframeurl);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "safeRedirectUrl", {
              get: function () {
                return this.sanitizer.bypassSecurityTrustUrl(this.redirectUrl);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "safeJavaScriptUrl", {
              get: function () {
                return this.sanitizer.bypassSecurityTrustUrl(
                  this.javaScriptUrl
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "safeImagePixelUrl", {
              get: function () {
                return this.sanitizer.bypassSecurityTrustUrl(
                  this.imagePixelUrl
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngOnInit = function () {
              return (
                (t = this),
                void 0,
                (r = function () {
                  var t, n, r, i, c, p, v, y;
                  return (function (e, t) {
                    var n,
                      r,
                      i,
                      s,
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
                      (s = { next: o(0), throw: o(1), return: o(2) }),
                      "function" == typeof Symbol &&
                        (s[Symbol.iterator] = function () {
                          return this;
                        }),
                      s
                    );
                    function o(s) {
                      return function (o) {
                        return (function (s) {
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
                                      2 & s[0]
                                        ? "return"
                                        : s[0]
                                        ? "throw"
                                        : "next"
                                    ]) &&
                                  !(i = i.call(r, s[1])).done)
                              )
                                return i;
                              switch (
                                ((r = 0), i && (s = [0, i.value]), s[0])
                              ) {
                                case 0:
                                case 1:
                                  i = s;
                                  break;
                                case 4:
                                  return a.label++, { value: s[1], done: !1 };
                                case 5:
                                  a.label++, (r = s[1]), (s = [0]);
                                  continue;
                                case 7:
                                  (s = a.ops.pop()), a.trys.pop();
                                  continue;
                                default:
                                  if (
                                    !(i =
                                      (i = a.trys).length > 0 &&
                                      i[i.length - 1]) &&
                                    (6 === s[0] || 2 === s[0])
                                  ) {
                                    a = 0;
                                    continue;
                                  }
                                  if (
                                    3 === s[0] &&
                                    (!i || (s[1] > i[0] && s[1] < i[3]))
                                  ) {
                                    a.label = s[1];
                                    break;
                                  }
                                  if (6 === s[0] && a.label < i[1]) {
                                    (a.label = i[1]), (i = s);
                                    break;
                                  }
                                  if (i && a.label < i[2]) {
                                    (a.label = i[2]), a.ops.push(s);
                                    break;
                                  }
                                  i[2] && a.ops.pop(), a.trys.pop();
                                  continue;
                              }
                              s = t.call(e, a);
                            } catch (o) {
                              (s = [6, o]), (r = 0);
                            } finally {
                              n = i = 0;
                            }
                          if (5 & s[0]) throw s[1];
                          return { value: s[0] ? s[1] : void 0, done: !0 };
                        })([s, o]);
                      };
                    }
                  })(this, function (S) {
                    switch (S.label) {
                      case 0:
                        return (
                          e.prototype.ngOnInit.call(this),
                          (t = this),
                          (n = l.a.parseQuery()),
                          (t.endingInputData = o.b.processParameters(n)),
                          t.endingInputData.respondent.respondentToken
                            ? 0 === t.endingInputData.respondent.returnStatusId
                              ? (t.displayAlert(
                                  a.a.InvalidReturnStatus,
                                  s.a.Error
                                ),
                                [2])
                              : (this.checkForTestRespondent(),
                                (r = new b.a(
                                  t.localStorageService.get("sc.rvid.data")
                                )) &&
                                  ((t.endingInputData.relevantId =
                                    r.RVid || ""),
                                  (t.endingInputData.fraudProfileScore =
                                    Math.round(r.FraudRiskProbability) || 0),
                                  (t.endingInputData.country =
                                    r.Country || "")),
                                (i = t),
                                [
                                  4,
                                  t.endService.setStatus(
                                    t.endingInputData,
                                    function (e) {
                                      throw new f.b({
                                        message: e.message,
                                        data: Object(f.c)(e.error)
                                          ? e.error
                                          : null,
                                      });
                                    }
                                  ),
                                ])
                            : (t.displayAlert(a.a.InvalidRespondent, s.a.Error),
                              [2])
                        );
                      case 1:
                        return (
                          (i.endingOutputData = S.sent()),
                          t.endingOutputData.respondent.isTest
                            ? (t.sessionStorageService.set(
                                "sc.respondent.test",
                                t.endingOutputData.respondent
                              ),
                              t.sessionStorageService.remove("sc.respondent"))
                            : (t.sessionStorageService.set(
                                "sc.respondent",
                                t.endingOutputData.respondent
                              ),
                              t.sessionStorageService.remove(
                                "sc.respondent.test"
                              )),
                          t.endingOutputData.setStatusResponseType ===
                          d.a.Success
                            ? (t.sessionStorageService.clear(),
                              t.displayAlert(a.a.ThanksForParticipation),
                              [2])
                            : t.endingOutputData.setStatusResponseType ===
                              d.a.Redirect
                            ? (t.sessionStorageService.clear(),
                              t.endingOutputData.urlType == h.a.None
                                ? (window.location.href =
                                    t.endingOutputData.redirectUrl)
                                : t.endingOutputData.urlType === h.a.JavaScript
                                ? (t.javaScriptUrl = t.redirectUrl)
                                : t.endingOutputData.urlType === h.a.IFrame
                                ? (this.iframeurl = t.redirectUrl)
                                : t.endingOutputData.urlType ===
                                    h.a.ImagePixel &&
                                  (this.imagePixelUrl = t.redirectUrl),
                              [2])
                            : (t.endingOutputData.hasPages() &&
                                (t.sessionStorageService.get(
                                  "sc.qualifications"
                                ) &&
                                  t.sessionStorageService.remove(
                                    "sc.qualifications"
                                  ),
                                t.sessionStorageService.set(
                                  "sc.qualifications",
                                  t.endingOutputData.pages
                                )),
                              t.endingOutputData.dropCookie &&
                                (t.sessionStorageService.set(
                                  "sc.vendorurl",
                                  t.endingOutputData.redirectUrl
                                ),
                                t.sessionStorageService.set(
                                  "sc.urltype",
                                  t.endingOutputData.urlType
                                ),
                                this.navigateTo(
                                  "/survey/after-complete-consent",
                                  !0
                                )),
                              t.endingOutputData.setStatusResponseType ===
                                d.a.AfterComplete &&
                                (t.sessionStorageService.set(
                                  "sc.vendorurl",
                                  t.endingOutputData.redirectUrl
                                ),
                                t.sessionStorageService.set(
                                  "sc.urltype",
                                  t.endingOutputData.urlType
                                ),
                                this.navigateTo("/survey/after-complete", !0)),
                              t.endingOutputData.setStatusResponseType ===
                                d.a.AfterCompleteReconfirmContact &&
                                (t.sessionStorageService.set(
                                  "sc.vendorurl",
                                  t.endingOutputData.redirectUrl
                                ),
                                t.sessionStorageService.set(
                                  "sc.urltype",
                                  t.endingOutputData.urlType
                                ),
                                this.navigateTo(
                                  "/survey/after-complete-reconfirm-contact",
                                  !0
                                )),
                              t.endingOutputData.setStatusResponseType ===
                                d.a.Routed &&
                                ((c = t.endingOutputData),
                                ((p = new u.a(
                                  t.sessionStorageService.get(
                                    t.isTestUrl
                                      ? "sc.respondent.test"
                                      : "sc.respondent"
                                  )
                                )).id = c.respondentId),
                                (p.surveyId = c.surveyId),
                                (p.respondentToken = c.respondentToken),
                                t.sessionStorageService.set(
                                  t.isTestUrl
                                    ? "sc.respondent.test"
                                    : "sc.respondent",
                                  p
                                ),
                                !(v = g.b.instanceFrom(
                                  t.localStorageService.get(
                                    t.isTestUrl
                                      ? "sc.profile.test"
                                      : "sc.profile"
                                  )
                                )) &&
                                  v.userId < 1 &&
                                  (v = t.localStorageService.get(
                                    t.isTestUrl
                                      ? "sc.profile.test"
                                      : "sc.profile"
                                  )),
                                t.sessionStorageService.set(
                                  "sc.samplechainenable",
                                  c.isSampleChainEnabled
                                ),
                                t.sessionStorageService.set(
                                  "sc.verifyrelevantid",
                                  c.verifyRelevantId
                                ),
                                t.sessionStorageService.remove(
                                  "sc.sample.chain.data"
                                ),
                                t.sessionStorageService.set(
                                  "sc.sampleChainDestinationPlatformId",
                                  c.sampleChainDestinationPlatformId
                                ),
                                t.sessionStorageService.set(
                                  "sc.sampleChainDestinationSurveyNumber",
                                  c.sampleChainDestinationSurveyNumber
                                ),
                                t.sessionStorageService.set(
                                  "sc.verifyrfgfingerprint",
                                  c.verifyRFGFingerPrint
                                ),
                                (y = t.endingOutputData),
                                t.sessionStorageService.set(
                                  "sc.ispollfishenabled",
                                  !0 !== t.isTestUrl && y.isPollfishEnabled
                                ),
                                t.sessionStorageService.set(
                                  "sc.isplrouterenabled",
                                  !0 !== t.isTestUrl && y.isPLRouterEnabled
                                ),
                                t.sessionStorageService.set(
                                  "sc.clientinvokeurl",
                                  !0 !== t.isTestUrl && y.clientInvokeUrl
                                ),
                                t.sessionStorageService.set(
                                  "sc.isRecontact",
                                  c.isRecontact
                                ),
                                t.sessionStorageService.set(
                                  "sc.isPIDRouting",
                                  c.isPIDRouting
                                ),
                                t.sessionStorageService.set(
                                  "sc.originaluserid",
                                  c.originalUserId
                                ),
                                t.ngOnDestroy(),
                                t.navigateTo("/survey", !0)),
                              [2])
                        );
                    }
                  });
                }),
                new ((n = void 0) || (n = Promise))(function (e, i) {
                  function s(e) {
                    try {
                      o(r.next(e));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function a(e) {
                    try {
                      o(r.throw(e));
                    } catch (t) {
                      i(t);
                    }
                  }
                  function o(t) {
                    t.done
                      ? e(t.value)
                      : new n(function (e) {
                          e(t.value);
                        }).then(s, a);
                  }
                  o((r = r.apply(t, [])).next());
                })
              );
              var t, n, r;
            }),
            (t.prototype.ngOnDestroy = function () {
              e.prototype.ngOnDestroy.call(this);
            }),
            (t.prototype.checkForTestRespondent = function () {
              this.endingInputData.respondent.respondentToken.indexOf("test") >=
                0 &&
                ((this.endingInputData.respondent.isTest = !0),
                (this.endingInputData.respondent.respondentToken =
                  this.endingInputData.respondent.respondentToken.replace(
                    "test",
                    ""
                  )));
            }),
            t
          );
        })(v);
    },
    JNNf: function (e, t, n) {
      "use strict";
      var r = n("t/Na"),
        i = n("F/XL"),
        s = n("xMyE"),
        a = n("T1DM"),
        o = n("mrSG"),
        u = (function (e) {
          function t() {
            var n = e.call(this, "Timeout has occurred") || this;
            return (
              (n.name = "TimeoutError"),
              Object.setPrototypeOf(n, t.prototype),
              n
            );
          }
          return o.b(t, e), t;
        })(Error),
        c = n("VGuC"),
        l = n("MGBS"),
        p = n("zotm"),
        d = (function () {
          function e(e, t, n, r) {
            (this.waitFor = e),
              (this.absoluteTimeout = t),
              (this.withObservable = n),
              (this.scheduler = r);
          }
          return (
            (e.prototype.call = function (e, t) {
              return t.subscribe(
                new h(
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
        h = (function (e) {
          function t(t, n, r, i, s) {
            var a = e.call(this, t) || this;
            return (
              (a.absoluteTimeout = n),
              (a.waitFor = r),
              (a.withObservable = i),
              (a.scheduler = s),
              (a.action = null),
              a.scheduleTimeout(),
              a
            );
          }
          return (
            o.b(t, e),
            (t.dispatchTimeout = function (e) {
              var t = e.withObservable;
              e._unsubscribeAndRecycle(), e.add(Object(p.a)(e, t));
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
        f = n("XlPw"),
        g = n("9Z1F"),
        b = n("vV5i"),
        v = n("Hprf"),
        y = n("WfvI");
      n.d(t, "a", function () {
        return m;
      });
      var S = function (e, t, n, r) {
          return new (n || (n = Promise))(function (i, s) {
            function a(e) {
              try {
                u(r.next(e));
              } catch (t) {
                s(t);
              }
            }
            function o(e) {
              try {
                u(r.throw(e));
              } catch (t) {
                s(t);
              }
            }
            function u(e) {
              e.done
                ? i(e.value)
                : new n(function (t) {
                    t(e.value);
                  }).then(a, o);
            }
            u((r = r.apply(e, t || [])).next());
          });
        },
        P = function (e, t) {
          var n,
            r,
            i,
            s,
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
            (s = { next: o(0), throw: o(1), return: o(2) }),
            "function" == typeof Symbol &&
              (s[Symbol.iterator] = function () {
                return this;
              }),
            s
          );
          function o(s) {
            return function (o) {
              return (function (s) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          r[2 & s[0] ? "return" : s[0] ? "throw" : "next"]) &&
                        !(i = i.call(r, s[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (s = [0, i.value]), s[0])) {
                      case 0:
                      case 1:
                        i = s;
                        break;
                      case 4:
                        return a.label++, { value: s[1], done: !1 };
                      case 5:
                        a.label++, (r = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !(i = (i = a.trys).length > 0 && i[i.length - 1]) &&
                          (6 === s[0] || 2 === s[0])
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!i || (s[1] > i[0] && s[1] < i[3]))
                        ) {
                          a.label = s[1];
                          break;
                        }
                        if (6 === s[0] && a.label < i[1]) {
                          (a.label = i[1]), (i = s);
                          break;
                        }
                        if (i && a.label < i[2]) {
                          (a.label = i[2]), a.ops.push(s);
                          break;
                        }
                        i[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    s = t.call(e, a);
                  } catch (o) {
                    (s = [6, o]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, o]);
            };
          }
        },
        m = (function () {
          function e() {
            (this.headers = new r.g({ "Content-Type": "application/json" })),
              (this.rootUri = b.a.get(v.b)),
              (this.http = b.a.get(r.c));
          }
          return (
            (e.prototype.get = function (e, t, n, r, i, s) {
              return S(this, void 0, void 0, function () {
                return P(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return [
                        4,
                        this.executeAction(
                          F.Get,
                          e,
                          {},
                          t,
                          n,
                          r,
                          i,
                          s
                        ).toPromise(),
                      ];
                    case 1:
                      return [2, a.sent()];
                  }
                });
              });
            }),
            (e.prototype.delete = function (e, t, n, r) {
              return S(this, void 0, void 0, function () {
                return P(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.executeAction(
                          F.Delete,
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
            (e.prototype.post = function (e, t, n, r, i, s) {
              return S(this, void 0, void 0, function () {
                return P(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return [
                        4,
                        this.executeAction(
                          F.Post,
                          e,
                          t,
                          n,
                          r,
                          i,
                          s
                        ).toPromise(),
                      ];
                    case 1:
                      return [2, a.sent()];
                  }
                });
              });
            }),
            (e.prototype.put = function (e, t, n, r, i) {
              return S(this, void 0, void 0, function () {
                return P(this, function (s) {
                  switch (s.label) {
                    case 0:
                      return [
                        4,
                        this.executeAction(F.Put, e, t, n, r, i).toPromise(),
                      ];
                    case 1:
                      return [2, s.sent()];
                  }
                });
              });
            }),
            (e.prototype.executeAction = function (e, t, n, r, o, l, p, h) {
              void 0 === p && (p = null), void 0 === h && (h = null);
              var b = "" + this.rootUri + t,
                v = { headers: this.getRequestHeaders(r) };
              h && (v.withCredentials = h),
                l === y.a.ThirdPartyAPI && ((b = t), (v.headers = null));
              var S,
                P = null;
              switch (e) {
                case F.Post:
                  P = this.executePost(b, n, v);
                  break;
                case F.Put:
                  P = this.executePut(b, n, v);
                  break;
                case F.Delete:
                  P = this.executeDelete(b, v);
                  break;
                default:
                  P = this.executeGet(b, v);
              }
              return p
                ? P.pipe(
                    Object(s.a)(function (e) {
                      return Object(i.a)(e);
                    }),
                    (void 0 === S && (S = a.a),
                    (function (e, t, n) {
                      return (
                        void 0 === n && (n = a.a),
                        function (r) {
                          var i = Object(c.a)(e),
                            s = i ? +e - n.now() : Math.abs(e);
                          return r.lift(new d(s, i, t, n));
                        }
                      );
                    })(1e3 * p, Object(f.a)(new u()), S)),
                    Object(g.a)(function (e) {
                      return "function" == typeof o && o(e), Object(i.a)({});
                    })
                  )
                : P.pipe(
                    Object(s.a)(function (e) {
                      return Object(i.a)(e);
                    }),
                    Object(g.a)(function (e) {
                      return "function" == typeof o && o(e), Object(i.a)({});
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
        F = (function (e) {
          return (
            (e[(e.Get = 0)] = "Get"),
            (e[(e.Post = 1)] = "Post"),
            (e[(e.Put = 2)] = "Put"),
            (e[(e.Delete = 3)] = "Delete"),
            e
          );
        })({});
    },
    T6l3: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return i;
      });
      var r = n("Tolu"),
        i = (function () {
          function e(e) {
            for (var t in ((this.$type =
              "SampleCube.UserFlow.API.Models.SurveyPage.RelevantIdApiModel, SampleCube.UserFlow.API.Models.SurveyPage"),
            (this.RvidCallType = r.a.NoData),
            (this.Score = null),
            (this.GeoIP = null),
            (this.TotalCompletes = null),
            (this.FraudProfileScore = null),
            (this.FraudRiskProbability = null),
            (this.FraudFlagCount = null),
            (this.isNew = null),
            (this.CompleteFlag = null),
            (this.ScreenoutFlag = null),
            (this.FPF1 = null),
            (this.FPF2 = null),
            (this.FPF3 = null),
            (this.FPF4 = null),
            (this.FPF5 = null),
            (this.FPF6 = null),
            (this.FPF7 = null),
            (this.FPF8 = null),
            (this.FPF9 = null),
            (this.FPF10 = null),
            (this.FPF11 = null),
            (this.FPF12 = null),
            (this.FPF13 = null),
            (this.FPF14 = null),
            (this.isMobile = null),
            (this.OldIDDate = null),
            (this.CompleteDate = null),
            (this.ScreenoutDate = null),
            (this.RVid = null),
            (this.Country = null),
            (this.OldId = null),
            (this.CSOPanelistID = null),
            (this.CSOPanelistIDDate = null),
            (this.CSOPanelistIDStatus = null),
            (this.Domain = null),
            (this.RVIDHash2 = null),
            (e = e || {})))
              "$type" !== t &&
                e.hasOwnProperty(t) &&
                this.hasOwnProperty(t) &&
                (this[t] = e[t]);
          }
          return (
            (e.getTypeOf = function (e) {
              switch (e) {
                case "Score":
                case "GeoIP":
                case "TotalCompletes":
                case "FraudProfileScore":
                case "FraudRiskProbability":
                case "FraudFlagCount":
                  return "number";
                case "isNew":
                case "CompleteFlag":
                case "ScreenoutFlag":
                case "FPF1":
                case "FPF2":
                case "FPF3":
                case "FPF4":
                case "FPF5":
                case "FPF6":
                case "FPF7":
                case "FPF8":
                case "FPF9":
                case "FPF10":
                case "FPF11":
                case "FPF12":
                case "FPF13":
                case "FPF14":
                case "isMobile":
                  return "boolean";
                case "OldIDDate":
                case "CompleteDate":
                case "ScreenoutDate":
                  return "Date";
                case "RVid":
                case "Country":
                case "OldId":
                case "CSOPanelistID":
                case "CSOPanelistIDDate":
                case "CSOPanelistIDStatus":
                case "Domain":
                case "RVIDHash2":
                default:
                  return "string";
              }
            }),
            e
          );
        })();
    },
    Tolu: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return r;
      });
      var r = (function (e) {
        return (
          (e[(e.NoData = 0)] = "NoData"),
          (e[(e.Cookie = 1)] = "Cookie"),
          (e[(e.Call = 2)] = "Call"),
          (e[(e.Failed = 3)] = "Failed"),
          e
        );
      })({});
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
//# sourceMappingURL=2.df3f11ec04dacb1d4431.js.map
