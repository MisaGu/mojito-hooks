import { gql } from 'graphql-request';
import { EMojitoKey } from '../enums/state.enum';
import {
  COLLECTION_ITEM_AUCTION_LOT_BIDS_LIST_FIELD,
  COLLECTION_ITEM_AUCTION_LOT_CURRENT_BID_FIELD,
  COLLECTION_ITEM_AUCTION_LOT_MY_BID_FIELD,
  COLLECTION_ITEM_FIELD,
  FAVORITE_ITEMS_FIELD,
  ME_USER_ORGS_FIELD,
} from './fragments';

export const mojitoQueries: Record<EMojitoKey, string> = {
  [EMojitoKey.profile]: gql`
    ${ME_USER_ORGS_FIELD}

    query GetProfile($filter: UserOrgFilter) {
      serverTime
      me {
        id
        user {
          id
          username
          email
        }
        userOrgs(filter: $filter) {
          ...UserOrganizationSchema
        }
      }
    }
  `,
  [EMojitoKey.organization]: gql`
    ${ME_USER_ORGS_FIELD}

    query GetOrganization($filter: UserOrgFilter) {
      serverTime
      me {
        id
        userOrgs(filter: $filter) {
          ...UserOrganizationSchema
        }
      }
    }
  `,
  [EMojitoKey.userWallets]: gql`
    query GetWallets {
      me {
        id
        wallets {
          id
          name
          address
          parentType
          parentID
          networkId
          network {
            chainID
          }
          tokens {
            id
            title
            contractAddress
            timeLastUpdated
            metadata {
              name
              description
              image
              attributes {
                traitType
                value {
                  ... on AttributeValueInt {
                    intValue
                  }
                  ... on AttributeValueFloat {
                    floatValue
                  }
                  ... on AttributeValueString {
                    stringValue
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  [EMojitoKey.invoices]: gql`
    query GetInvoices {
      getMyInvoices {
        invoiceID
        invoiceNumber
        invoiceCreatedAt
        status
        items {
          collectionItemID: collectionItemId
          collectionTitle
          destinationAddress
          collectionItemTitle
          units
          unitPrice
          buyersPremium
          overheadPremium
          totalPrice
          saleDate
          taxes
          salesTaxRate
        }
      }
    }
  `,
  [EMojitoKey.userActiveBids]: gql`
    query GetUserActiveBids($organizationID: UUID!) {
      serverTime
      me {
        id
        activeBids(orgId: $organizationID) {
          id
          amount
          marketplaceAuctionLot {
            id
            marketplaceCollectionItemId
            status
            currentBid {
              amount
              id
            }
            bids {
              amount
            }
          }
        }
      }
    }
  `,
  [EMojitoKey.userFavorites]: gql`
    ${FAVORITE_ITEMS_FIELD}
    query GetUserFavorites {
      serverTime
      me {
        id
        favoriteItems {
          ...FavoriteItemsFields
        }
      }
    }
  `,
  [EMojitoKey.checkUsername]: gql`
    query CheckUsername($organizationID: UUID1!, $username: String!) {
      orgUsernameAvailable(organizationID: $organizationID, username: $username)
    }
  `,
  [EMojitoKey.collectionBySlug]: gql`
    ${COLLECTION_ITEM_FIELD}
    query GetCollectionBySlug($slug: String!, $marketplaceID: UUID1!) {
      collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {
        id
        slug
        name
        description
        startDate
        endDate
        items(statuses: [Active]) {
          ...CollectionItemFields
        }
      }
    }
  `,
  [EMojitoKey.collectionBySlugCurrentBids]: gql`
    ${COLLECTION_ITEM_AUCTION_LOT_CURRENT_BID_FIELD}
    ${COLLECTION_ITEM_AUCTION_LOT_MY_BID_FIELD}

    query GetCollectionBySlugCurrentBids($slug: String!, $marketplaceID: UUID1!) {
      collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {
        id
        items(statuses: [Active]) {
          id
          details {
            ... on MarketplaceAuctionLot {
              id
              endDate
              startDate
              startingBid
              currentBid {
                ...CollectionItemAuctionLotCurrentBid
              }
              myBid {
                ...CollectionItemAuctionLotMyBid
              }
            }
          }
        }
      }
    }
  `,
  [EMojitoKey.collectionItemByIdRemainingCount]: gql`
    query GetCollectionItemByIdRemainingCount($id: UUID1!) {
      collectionItemById(id: $id) {
        id
        details {
          ... on MarketplaceBuyNowOutput {
            id
            remainingCount
          }
        }
      }
    }
  `,
  [EMojitoKey.collectionItemByIdBidsList]: gql`
    ${COLLECTION_ITEM_AUCTION_LOT_BIDS_LIST_FIELD}

    query GetCollectionItemByIdBidsList($id: UUID1!) {
      collectionItemById(id: $id) {
        id
        details {
          ... on MarketplaceAuctionLot {
            id
            endDate
            startDate
            bids {
              ...CollectionItemAuctionLotBidsList
            }
          }
        }
      }
    }
  `,
  [EMojitoKey.collectionItemById]: gql`
    ${COLLECTION_ITEM_FIELD}

    query GetCollectionItemById($id: UUID1!) {
      collectionItemById(id: $id) {
        ...CollectionItemFields
      }
    }
  `,
  [EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug]: gql`
    query GetMarketplaceCollectionsInfoWithItemsIdAndSlug($id: UUID!) {
      marketplace(id: $id) {
        collections {
          id
          slug
          name
          description
          startDate
          endDate
          items(statuses: [Active]) {
            id
            slug
          }
        }
      }
    }
  `,
  [EMojitoKey.serverTime]: gql`
    query GetServerTime {
      serverTime
    }
  `,
};
