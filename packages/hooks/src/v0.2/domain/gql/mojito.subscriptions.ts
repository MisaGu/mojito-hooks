import {
  COLLECTION_ITEM_AUCTION_LOT_BIDS_LIST_FIELD,
  COLLECTION_ITEM_AUCTION_LOT_CURRENT_BID_FIELD,
  COLLECTION_ITEM_AUCTION_LOT_MY_BID_FIELD,
} from './fragments';

export enum EMojitoSubscriptions {
  collectionItemBids,
  getMarketplaceAuctionLot,
  marketplaceCollectionLotsUpdates,
}

export const mojitoSubscriptions = {
  [EMojitoSubscriptions.collectionItemBids]: `
  ${COLLECTION_ITEM_AUCTION_LOT_BIDS_LIST_FIELD}

    subscription bidFeed($marketplaceAuctionLotId: UUID1!) {
      getMarketplaceAuctionLot(marketplaceAuctionLotId: $marketplaceAuctionLotId) {
        id
        endDate
        startDate
        bids {
          ...CollectionItemAuctionLotBidsList
        }
      }
    }
  `,
  [EMojitoSubscriptions.getMarketplaceAuctionLot]: `
  ${COLLECTION_ITEM_AUCTION_LOT_CURRENT_BID_FIELD}
  ${COLLECTION_ITEM_AUCTION_LOT_MY_BID_FIELD}

    subscription getMarketplaceAuctionLot($marketplaceAuctionLotId: UUID1!) {
      getMarketplaceAuctionLot(marketplaceAuctionLotId: $marketplaceAuctionLotId) {
        id
        endDate
        startDate
        currentBid {
          ...CollectionItemAuctionLotCurrentBid
        }
        myBid {
         ...CollectionItemAuctionLotMyBid
        }
      }
    }
  `,
  [EMojitoSubscriptions.marketplaceCollectionLotsUpdates]: `
  ${COLLECTION_ITEM_AUCTION_LOT_CURRENT_BID_FIELD}
  ${COLLECTION_ITEM_AUCTION_LOT_MY_BID_FIELD}

    subscription marketplaceCollectionLotsUpdates($collectionId: UUID1!) {
      marketplaceCollectionLotsUpdates(collectionId: $collectionId) {
        id
        endDate
        startDate
        currentBid {
          ...CollectionItemAuctionLotCurrentBid
        }
        myBid {
          ...CollectionItemAuctionLotMyBid
        }
      }
    }
  `,
};
