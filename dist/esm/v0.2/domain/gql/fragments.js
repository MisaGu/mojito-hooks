var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', {
        value: raw,
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  };

import { gql } from 'graphql-request';
export var ME_USER_ORGS_FIELD = gql(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  fragment UserOrganizationSchema on UserOrganization {\n    id\n    userId\n    externalUserId\n    organizationId\n    kycStatus\n    role\n    bidAllowed\n    username\n    avatar\n    settings\n  }\n',
      ],
      [
        '\n  fragment UserOrganizationSchema on UserOrganization {\n    id\n    userId\n    externalUserId\n    organizationId\n    kycStatus\n    role\n    bidAllowed\n    username\n    avatar\n    settings\n  }\n',
      ],
    )),
);
export var COLLECTION_ITEM_AUCTION_LOT_BID_FIELD = gql(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      [
        '\n  fragment CollectionItemAuctionLotBid on MarketplaceAuctionBid {\n    id\n    amount\n    createdAt\n    maximumBid\n    nextBidIncrement\n    marketplaceAuctionLotId\n    marketplaceUser {\n      id\n      username\n      avatar\n    }\n  }\n',
      ],
      [
        '\n  fragment CollectionItemAuctionLotBid on MarketplaceAuctionBid {\n    id\n    amount\n    createdAt\n    maximumBid\n    nextBidIncrement\n    marketplaceAuctionLotId\n    marketplaceUser {\n      id\n      username\n      avatar\n    }\n  }\n',
      ],
    )),
);
export var COLLECTION_ITEM_AUCTION_LOT_DETAILS_FIELD = gql(
  templateObject_3 ||
    (templateObject_3 = __makeTemplateObject(
      [
        '\n  fragment CollectionItemAuctionLotDetailsFields on MarketplaceAuctionLot {\n    id\n    status\n    endDate\n    startDate\n    lotNumber\n    startingBid\n    marketplaceCollectionItemId\n    feeStructure {\n      buyersPremiumRate {\n        from\n        to\n        rate\n      }\n      overheadPremiumRate {\n        from\n        to\n        rate\n      }\n    }\n  }\n',
      ],
      [
        '\n  fragment CollectionItemAuctionLotDetailsFields on MarketplaceAuctionLot {\n    id\n    status\n    endDate\n    startDate\n    lotNumber\n    startingBid\n    marketplaceCollectionItemId\n    feeStructure {\n      buyersPremiumRate {\n        from\n        to\n        rate\n      }\n      overheadPremiumRate {\n        from\n        to\n        rate\n      }\n    }\n  }\n',
      ],
    )),
);
export var COLLECTION_ITEM_BUY_NOW_DETAILS_FIELD = gql(
  templateObject_4 ||
    (templateObject_4 = __makeTemplateObject(
      [
        '\n  fragment CollectionItemBuyNowDetailsFields on MarketplaceBuyNowOutput {\n    id\n    unitPrice\n    totalUnits\n    totalAvailableUnits\n    startDate\n    endDate\n    sortNumber\n  }\n',
      ],
      [
        '\n  fragment CollectionItemBuyNowDetailsFields on MarketplaceBuyNowOutput {\n    id\n    unitPrice\n    totalUnits\n    totalAvailableUnits\n    startDate\n    endDate\n    sortNumber\n  }\n',
      ],
    )),
);
export var COLLECTION_ITEM_FIELD = gql(
  templateObject_5 ||
    (templateObject_5 = __makeTemplateObject(
      [
        '\n  ',
        '\n  ',
        '\n\n  fragment CollectionItemFields on MarketplaceCollectionItem {\n    name\n    id\n    collectionId\n    marketplaceTokenId\n    saleType\n    slug\n    details {\n      __typename\n      ... on MarketplaceBuyNowOutput {\n        ...CollectionItemBuyNowDetailsFields\n      }\n      ... on MarketplaceAuctionLot {\n        ...CollectionItemAuctionLotDetailsFields\n      }\n    }\n  }\n',
      ],
      [
        '\n  ',
        '\n  ',
        '\n\n  fragment CollectionItemFields on MarketplaceCollectionItem {\n    name\n    id\n    collectionId\n    marketplaceTokenId\n    saleType\n    slug\n    details {\n      __typename\n      ... on MarketplaceBuyNowOutput {\n        ...CollectionItemBuyNowDetailsFields\n      }\n      ... on MarketplaceAuctionLot {\n        ...CollectionItemAuctionLotDetailsFields\n      }\n    }\n  }\n',
      ],
    )),
  COLLECTION_ITEM_BUY_NOW_DETAILS_FIELD,
  COLLECTION_ITEM_AUCTION_LOT_DETAILS_FIELD,
);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
