'use strict';

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

var _a;

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.mojitoQueries = void 0;

var graphql_request_1 = require('graphql-request');

var state_enum_1 = require('../enums/state.enum');

var fragments_1 = require('./fragments');

exports.mojitoQueries =
  ((_a = {}),
  (_a[state_enum_1.EMojitoKey.profile] = (0, graphql_request_1.gql)(
    templateObject_1 ||
      (templateObject_1 = __makeTemplateObject(
        [
          '\n    ',
          '\n\n    query GetProfile($filter: UserOrgFilter) {\n      serverTime\n      me {\n        id\n        user {\n          id\n          username\n          name\n          email\n        }\n        userOrgs(filter: $filter) {\n          ...UserOrganizationSchema\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    ',
          '\n\n    query GetProfile($filter: UserOrgFilter) {\n      serverTime\n      me {\n        id\n        user {\n          id\n          username\n          name\n          email\n        }\n        userOrgs(filter: $filter) {\n          ...UserOrganizationSchema\n        }\n      }\n    }\n  ',
        ],
      )),
    fragments_1.ME_USER_ORGS_FIELD,
  )),
  (_a[state_enum_1.EMojitoKey.userWallets] = (0, graphql_request_1.gql)(
    templateObject_2 ||
      (templateObject_2 = __makeTemplateObject(
        [
          '\n    query GetWallets {\n      me {\n        id\n        wallets {\n          id\n          name\n          address\n          parentType\n          parentID\n          networkId\n          network {\n            chainID\n          }\n          tokens {\n            id\n            title\n            contractAddress\n            timeLastUpdated\n            metadata {\n              name\n              description\n              image\n              attributes {\n                traitType\n                value {\n                  ... on AttributeValueInt {\n                    intValue\n                  }\n                  ... on AttributeValueFloat {\n                    floatValue\n                  }\n                  ... on AttributeValueString {\n                    stringValue\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetWallets {\n      me {\n        id\n        wallets {\n          id\n          name\n          address\n          parentType\n          parentID\n          networkId\n          network {\n            chainID\n          }\n          tokens {\n            id\n            title\n            contractAddress\n            timeLastUpdated\n            metadata {\n              name\n              description\n              image\n              attributes {\n                traitType\n                value {\n                  ... on AttributeValueInt {\n                    intValue\n                  }\n                  ... on AttributeValueFloat {\n                    floatValue\n                  }\n                  ... on AttributeValueString {\n                    stringValue\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[state_enum_1.EMojitoKey.invoices] = (0, graphql_request_1.gql)(
    templateObject_3 ||
      (templateObject_3 = __makeTemplateObject(
        [
          '\n    query GetInvoices {\n      getMyInvoices {\n        invoiceID\n        invoiceNumber\n        invoiceCreatedAt\n        status\n        items {\n          collectionItemID\n          collectionTitle\n          destinationAddress\n          collectionItemTitle\n          units\n          unitPrice\n          buyersPremium\n          overheadPremium\n          totalPrice\n          saleDate\n          taxes\n          salesTaxRate\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetInvoices {\n      getMyInvoices {\n        invoiceID\n        invoiceNumber\n        invoiceCreatedAt\n        status\n        items {\n          collectionItemID\n          collectionTitle\n          destinationAddress\n          collectionItemTitle\n          units\n          unitPrice\n          buyersPremium\n          overheadPremium\n          totalPrice\n          saleDate\n          taxes\n          salesTaxRate\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[state_enum_1.EMojitoKey.userActiveBids] = (0, graphql_request_1.gql)(
    templateObject_4 ||
      (templateObject_4 = __makeTemplateObject(
        [
          '\n    query GetUserActiveBids($organizationID: UUID!) {\n      serverTime\n      me {\n        id\n        activeBids(orgId: $organizationID) {\n          id\n          amount\n          marketplaceAuctionLot {\n            id\n            marketplaceCollectionItemId\n            status\n            currentBid {\n              amount\n              id\n            }\n            bids {\n              amount\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetUserActiveBids($organizationID: UUID!) {\n      serverTime\n      me {\n        id\n        activeBids(orgId: $organizationID) {\n          id\n          amount\n          marketplaceAuctionLot {\n            id\n            marketplaceCollectionItemId\n            status\n            currentBid {\n              amount\n              id\n            }\n            bids {\n              amount\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[state_enum_1.EMojitoKey.userFavorites] = (0, graphql_request_1.gql)(
    templateObject_5 ||
      (templateObject_5 = __makeTemplateObject(
        [
          '\n    ',
          '\n    query GetUserFavorites {\n      serverTime\n      me {\n        id\n        favoriteItems {\n          ...CollectionItemFields\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    ',
          '\n    query GetUserFavorites {\n      serverTime\n      me {\n        id\n        favoriteItems {\n          ...CollectionItemFields\n        }\n      }\n    }\n  ',
        ],
      )),
    fragments_1.COLLECTION_ITEM_FIELD,
  )),
  (_a[state_enum_1.EMojitoKey.checkUsername] = (0, graphql_request_1.gql)(
    templateObject_6 ||
      (templateObject_6 = __makeTemplateObject(
        [
          '\n    query CheckUsername($organizationID: UUID1!, $username: String!) {\n      orgUsernameAvailable(organizationID: $organizationID, username: $username)\n    }\n  ',
        ],
        [
          '\n    query CheckUsername($organizationID: UUID1!, $username: String!) {\n      orgUsernameAvailable(organizationID: $organizationID, username: $username)\n    }\n  ',
        ],
      )),
  )),
  (_a[state_enum_1.EMojitoKey.collectionBySlug] = (0, graphql_request_1.gql)(
    templateObject_7 ||
      (templateObject_7 = __makeTemplateObject(
        [
          '\n    ',
          '\n    query GetCollectionBySlug($slug: String!, $marketplaceID: UUID1!) {\n      collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {\n        id\n        slug\n        name\n        description\n        startDate\n        endDate\n        items(statuses: [Active]) {\n          ...CollectionItemFields\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    ',
          '\n    query GetCollectionBySlug($slug: String!, $marketplaceID: UUID1!) {\n      collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {\n        id\n        slug\n        name\n        description\n        startDate\n        endDate\n        items(statuses: [Active]) {\n          ...CollectionItemFields\n        }\n      }\n    }\n  ',
        ],
      )),
    fragments_1.COLLECTION_ITEM_FIELD,
  )),
  (_a[state_enum_1.EMojitoKey.collectionBySlugCurrentBids] = (0, graphql_request_1.gql)(
    templateObject_8 ||
      (templateObject_8 = __makeTemplateObject(
        [
          '\n    ',
          '\n\n    query GetCollectionBySlugCurrentBids($slug: String!, $marketplaceID: UUID1!) {\n      collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {\n        items(statuses: [Active]) {\n          details {\n            ... on MarketplaceAuctionLot {\n              currentBid {\n                ...CollectionItemAuctionLotBid\n              }\n              myBid {\n                ...CollectionItemAuctionLotBid\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    ',
          '\n\n    query GetCollectionBySlugCurrentBids($slug: String!, $marketplaceID: UUID1!) {\n      collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {\n        items(statuses: [Active]) {\n          details {\n            ... on MarketplaceAuctionLot {\n              currentBid {\n                ...CollectionItemAuctionLotBid\n              }\n              myBid {\n                ...CollectionItemAuctionLotBid\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
    fragments_1.COLLECTION_ITEM_AUCTION_LOT_BID_FIELD,
  )),
  (_a[state_enum_1.EMojitoKey.collectionItemByIdRemainingCount] = (0, graphql_request_1.gql)(
    templateObject_9 ||
      (templateObject_9 = __makeTemplateObject(
        [
          '\n    query GetCollectionItemByIdRemainingCount($id: UUID1!) {\n      collectionItemById(id: $id) {\n        id\n        details {\n          ... on MarketplaceBuyNowOutput {\n            id\n            remainingCount\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetCollectionItemByIdRemainingCount($id: UUID1!) {\n      collectionItemById(id: $id) {\n        id\n        details {\n          ... on MarketplaceBuyNowOutput {\n            id\n            remainingCount\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[state_enum_1.EMojitoKey.collectionItemByIdBidsList] = (0, graphql_request_1.gql)(
    templateObject_10 ||
      (templateObject_10 = __makeTemplateObject(
        [
          '\n    ',
          '\n\n    query GetCollectionItemByIdBidsList($id: UUID1!) {\n      collectionItemById(id: $id) {\n        id\n        details {\n          ... on MarketplaceAuctionLot {\n            id\n            endDate\n            startDate\n            bids {\n              ...CollectionItemAuctionLotBid\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    ',
          '\n\n    query GetCollectionItemByIdBidsList($id: UUID1!) {\n      collectionItemById(id: $id) {\n        id\n        details {\n          ... on MarketplaceAuctionLot {\n            id\n            endDate\n            startDate\n            bids {\n              ...CollectionItemAuctionLotBid\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
    fragments_1.COLLECTION_ITEM_AUCTION_LOT_BID_FIELD,
  )),
  (_a[state_enum_1.EMojitoKey.collectionItemById] = (0, graphql_request_1.gql)(
    templateObject_11 ||
      (templateObject_11 = __makeTemplateObject(
        [
          '\n    ',
          '\n\n    query GetCollectionItemById($id: UUID1!) {\n      collectionItemById(id: $id) {\n        ...CollectionItemFields\n      }\n    }\n  ',
        ],
        [
          '\n    ',
          '\n\n    query GetCollectionItemById($id: UUID1!) {\n      collectionItemById(id: $id) {\n        ...CollectionItemFields\n      }\n    }\n  ',
        ],
      )),
    fragments_1.COLLECTION_ITEM_FIELD,
  )),
  (_a[state_enum_1.EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug] = (0,
  graphql_request_1.gql)(
    templateObject_12 ||
      (templateObject_12 = __makeTemplateObject(
        [
          '\n    query GetMarketplaceCollectionsInfoWithItemsIdAndSlug($id: UUID!) {\n      marketplace(id: $id) {\n        collections {\n          id\n          slug\n          name\n          description\n          startDate\n          endDate\n          items(statuses: [Active]) {\n            id\n            slug\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetMarketplaceCollectionsInfoWithItemsIdAndSlug($id: UUID!) {\n      marketplace(id: $id) {\n        collections {\n          id\n          slug\n          name\n          description\n          startDate\n          endDate\n          items(statuses: [Active]) {\n            id\n            slug\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[state_enum_1.EMojitoKey.serverTime] = (0, graphql_request_1.gql)(
    templateObject_13 ||
      (templateObject_13 = __makeTemplateObject(
        ['\n    query GetServerTime {\n      serverTime\n    }\n  '],
        ['\n    query GetServerTime {\n      serverTime\n    }\n  '],
      )),
  )),
  _a);
var templateObject_1,
  templateObject_2,
  templateObject_3,
  templateObject_4,
  templateObject_5,
  templateObject_6,
  templateObject_7,
  templateObject_8,
  templateObject_9,
  templateObject_10,
  templateObject_11,
  templateObject_12,
  templateObject_13;
