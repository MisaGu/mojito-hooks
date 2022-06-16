'use strict';

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useCollectionItemCurrentBid = void 0;

var useCollectionItemsCurrentBids_1 = require('../useCollectionItemsCurrentBids/useCollectionItemsCurrentBids');

function useCollectionItemCurrentBid(_a) {
  var collectionItemID = _a.collectionItemID,
    props = __rest(_a, ['collectionItemID']);

  var _b = (0, useCollectionItemsCurrentBids_1.useCollectionItemsCurrentBids)(props),
    currentBids = _b.currentBids,
    result = __rest(_b, ['currentBids']);
}

exports.useCollectionItemCurrentBid = useCollectionItemCurrentBid;
exports['default'] = useCollectionItemCurrentBid;
