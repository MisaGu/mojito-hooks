'use strict';

var _a;

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.mojitoSubscriptions = exports.EMojitoSubscriptions = void 0;

var fragments_1 = require('./fragments');

var EMojitoSubscriptions;

(function (EMojitoSubscriptions) {
  EMojitoSubscriptions[(EMojitoSubscriptions['collectionItemBids'] = 0)] = 'collectionItemBids';
  EMojitoSubscriptions[(EMojitoSubscriptions['getMarketplaceAuctionLot'] = 1)] =
    'getMarketplaceAuctionLot';
  EMojitoSubscriptions[(EMojitoSubscriptions['marketplaceCollectionLotsUpdates'] = 2)] =
    'marketplaceCollectionLotsUpdates';
})((EMojitoSubscriptions = exports.EMojitoSubscriptions || (exports.EMojitoSubscriptions = {})));

exports.mojitoSubscriptions =
  ((_a = {}),
  (_a[EMojitoSubscriptions.collectionItemBids] = '\n  '.concat(
    fragments_1.COLLECTION_ITEM_AUCTION_LOT_BID_FIELD,
    '\n\n    subscription bidFeed($marketplaceAuctionLotId: UUID1!) {\n      getMarketplaceAuctionLot(marketplaceAuctionLotId: $marketplaceAuctionLotId) {\n        id\n        endDate\n        startDate\n        bids {\n          ...CollectionItemAuctionLotBid\n        }\n      }\n    }\n  ',
  )),
  (_a[EMojitoSubscriptions.getMarketplaceAuctionLot] = '\n  '
    .concat(fragments_1.COLLECTION_ITEM_AUCTION_LOT_BID_FIELD, '\n  ')
    .concat(
      fragments_1.COLLECTION_ITEM_AUCTION_LOT_BID_FIELD,
      '\n\n    subscription getMarketplaceAuctionLot($marketplaceAuctionLotId: UUID1!) {\n      getMarketplaceAuctionLot(marketplaceAuctionLotId: $marketplaceAuctionLotId) {\n        id\n        endDate\n        startDate\n        currentBid {\n          ...CollectionItemAuctionLotBid\n        }\n        myBid {\n         ...CollectionItemAuctionLotBid\n        }\n      }\n    }\n  ',
    )),
  (_a[EMojitoSubscriptions.marketplaceCollectionLotsUpdates] = '\n  '
    .concat(fragments_1.COLLECTION_ITEM_AUCTION_LOT_BID_FIELD, '\n  ')
    .concat(
      fragments_1.COLLECTION_ITEM_AUCTION_LOT_BID_FIELD,
      '\n\n    subscription marketplaceCollectionLotsUpdates($collectionId: UUID1!) {\n      marketplaceCollectionLotsUpdates(collectionId: $collectionId) {\n        id\n        endDate\n        startDate\n        currentBid {\n          ...CollectionItemAuctionLotBid\n        }\n        myBid {\n          ...CollectionItemAuctionLotBid\n        }\n      }\n    }\n  ',
    )),
  _a);
