!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('React')))
    : 'function' == typeof define && define.amd
    ? define(['React'], t)
    : 'object' == typeof exports
    ? (exports['mojitonft-hooks'] = t(require('React')))
    : (e['mojitonft-hooks'] = t(e.React));
})(this, function (e) {
  return (function (e) {
    var t = {};
    function n(o) {
      if (t[o]) return t[o].exports;
      var r = (t[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
      }),
      (n.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (n.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var r in e)
            n.d(
              o,
              r,
              function (t) {
                return e[t];
              }.bind(null, r),
            );
        return o;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 1))
    );
  })([
    function (t, n) {
      t.exports = e;
    },
    function (e, t, n) {
      'use strict';
      function o() {
        return !0;
      }
      n.r(t),
        n.d(t, 'useActiveBids', function () {
          return o;
        }),
        n.d(t, 'useCheckCollectionItemsSaleStatus', function () {
          return i;
        });
      var r,
        u = n(0);
      function i(e) {
        return Object(u.useMemo)(
          function () {
            return (function (e) {
              var t;
              void 0 === e && (e = []);
              for (var n = e.length, o = 0, u = !1, i = !1; o < n && (!i || !u); ) {
                var c = e[o++],
                  f = c.details,
                  l = c.saleType;
                (null === (t = null == f ? void 0 : f.saleView) || void 0 === t
                  ? void 0
                  : t.isDuringSale) && (l === r.BuyNow && (u = !0), l === r.Auction && (i = !0));
              }
              return { hasActiveBuyNowItems: u, hasActiveAuctionItems: i };
            })(e);
          },
          [e],
        );
      }
      !(function (e) {
        (e.Auction = 'Auction'), (e.BuyNow = 'BuyNow');
      })(r || (r = {}));
    },
  ]);
});
