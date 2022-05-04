import { gql } from 'graphql-request';

export const COLLECTION_ITEM_AUCTION_LOT_BIDS_LIST_FIELD = gql`
  fragment CollectionItemAuctionLotBidsList on MarketplaceAuctionBid {
    id
    amount
    createdAt
    maximumBid
    marketplaceAuctionLotId
    marketplaceUser {
      id
      username
      avatar
    }
  }
`;

export const COLLECTION_ITEM_AUCTION_LOT_CURRENT_BID_FIELD = gql`
  fragment CollectionItemAuctionLotCurrentBid on MarketplaceAuctionBid {
    id
    amount
    createdAt
    maximumBid
    nextBidIncrement
    marketplaceAuctionLotId
    marketplaceUser {
      id
      username
      avatar
    }
  }
`;

export const COLLECTION_ITEM_AUCTION_LOT_MY_BID_FIELD = gql`
  fragment CollectionItemAuctionLotMyBid on MarketplaceAuctionBid {
    id
    amount
    createdAt
    currentBid
    maximumBid
    nextBidIncrement
    marketplaceAuctionLotId
  }
`;

export const COLLECTION_ITEM_AUCTION_LOT_DETAILS_FIELD = gql`
  fragment CollectionItemAuctionLotDetailsFields on MarketplaceAuctionLot {
    id
    status
    endDate
    startDate
    lotNumber
    startingBid
    marketplaceCollectionItemId
    feeStructure {
      buyersPremiumRate {
        from
        to
        rate
      }
      overheadPremiumRate {
        from
        to
        rate
      }
    }
  }
`;

export const COLLECTION_ITEM_BUY_NOW_DETAILS_FIELD = gql`
  fragment CollectionItemBuyNowDetailsFields on MarketplaceBuyNowOutput {
    id
    unitPrice
    totalUnits
    totalAvailableUnits
    startDate
    endDate
    sortNumber
  }
`;

export const COLLECTION_ITEM_FIELD = gql`
  ${COLLECTION_ITEM_BUY_NOW_DETAILS_FIELD}
  ${COLLECTION_ITEM_AUCTION_LOT_DETAILS_FIELD}

  fragment CollectionItemFields on MarketplaceCollectionItem {
    name
    id
    collectionId
    marketplaceTokenId
    saleType
    slug
    details {
      __typename
      ... on MarketplaceBuyNowOutput {
        ...CollectionItemBuyNowDetailsFields
      }
      ... on MarketplaceAuctionLot {
        ...CollectionItemAuctionLotDetailsFields
      }
    }
  }
`;

export const FAVORITE_ITEMS_FIELD = gql`
  fragment FavoriteItemsFields on MarketplaceCollectionItem {
    id
    marketplaceTokenId
    collectionId
    saleType
    name
    slug
    details {
      __typename
      ... on MarketplaceBuyNowOutput {
        id
      }
      ... on MarketplaceAuctionLot {
        id
      }
    }
  }
`;
