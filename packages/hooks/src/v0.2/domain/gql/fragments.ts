import { gql } from 'graphql-request';

export const ME_USER_ORGS_FIELD = gql`
  fragment UserOrganizationSchema on UserOrganization {
    id
    userId
    externalUserId
    organizationId
    kycStatus
    role
    bidAllowed
    username
    avatar
    settings
  }
`;

export const COLLECTION_ITEM_AUCTION_LOT_BID_FIELD = gql`
  fragment CollectionItemAuctionLotBid on MarketplaceAuctionBid {
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
