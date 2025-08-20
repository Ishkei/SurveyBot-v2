/*jslint plusplus: true, forin: true*/
var DownloadMngrLib = function (options) {
  "use strict";
  options = options || {};
  var defaults = {
      noOfServers: 3,
      rootDomain: "media.ipsosinteractive.com",
      protocol: "https:",
      loadedObjects: {},
    },
    member,
    index = 0,
    Servers = [],
    LeastLoadedServer = function () {
      var min = Servers[0].queue.length,
        ret = Servers[0],
        i;
      for (i = 1; i < Servers.length; i++) {
        if (min > Servers[i].queue.length) {
          min = Servers[i].queue.length;
          ret = Servers[i];
        }
      }
      return ret;
    },
    addCustomEvent = function (element, event, callback) {
      if (element.addEventListener) {
        //non ie
        element.addEventListener(event, callback, false);
      } else if (element.attachEvent) {
        //IE
        element.attachEvent("on" + event, callback);
      } else {
        element["on" + event] = callback;
      }
    },
    resources = [];
  options = options || {};
  defaults.loadedObjects = defaults.loadedObjects || {};
  for (member in options) {
    if (defaults.hasOwnProperty(member)) {
      defaults[member] = options[member];
    }
  }
  this.Init = function () {
    var i;
    if (defaults.noOfServers === 0) {
      Servers[0] = {
        name: defaults.rootDomain,
        queue: [],
        RemoveFromQueue: function (item) {
          var a = this.queue,
            n = a.length,
            r = [];
          for (i = 0; i < n / 2; i++) {
            if (a[i] !== item) {
              r[i] = a[i];
            }
            if (a[n - i - 1] !== item) {
              r[n - i - 2] = a[n - i - 1];
            }
          }
          this.queue = r;
        },
      };
    } else {
      for (i = 0; i < defaults.noOfServers; i++) {
        Servers[i] = {
          name:
            defaults.rootDomain.substr(0, defaults.rootDomain.indexOf(".")) +
            i +
            defaults.rootDomain.substr(defaults.rootDomain.indexOf(".")),
          queue: [],
          RemoveFromQueue: function (item) {
            var a = this.queue,
              n = a.length,
              r = [];
            for (i = 0; i < n / 2; i++) {
              if (a[i] !== item) {
                r[i] = a[i];
              }
              if (a[n - i - 1] !== item) {
                r[n - i - 2] = a[n - i - 1];
              }
            }
            this.queue = r;
          },
        };
      }
    }
  };
  this.Add = function (item) {
    var server = LeastLoadedServer(),
      resource,
      i,
      xhr;
    item = item || "";
    i = server.queue.length;
    server.queue.push(item);
    resource =
      defaults.protocol +
      "//" +
      server.name +
      "/" +
      item.substr(item.indexOf("/") + 1);
    resources.push(resource);
    if (typeof defaults.loadedObjects[resource] === "undefined") {
      defaults.loadedObjects[resource] = {};
      defaults.loadedObjects[resource].index = index;
      defaults.loadedObjects[resource].percent = 0;
    }
    if (/trident\/7.0/gi.test(navigator.userAgent)) {
      defaults.loadedObjects[resource].percent = 100;
    } else {
      xhr = XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open("GET", resource, true);
      addCustomEvent(xhr, "progress", function (xhrevt) {
        defaults.loadedObjects[resource].percent = Math.min(
          100,
          (xhrevt.loaded * 100) / xhrevt.total
        );
      });
      addCustomEvent(xhr, "load", function (xhrevt) {
        if (xhr.readyState === 4) {
          defaults.loadedObjects[resource].percent = 100;
          server.RemoveFromQueue(item);
        }
      });
      xhr.send();
    }
    index++;
  };
};
