import { gql } from 'graphql-request';
import { UseQueryResult } from 'react-query/types/react/types';
import {
  COLLECTION_ITEM_AUCTION_LOT_BIDS_LIST_FIELD,
  COLLECTION_ITEM_AUCTION_LOT_CURRENT_BID_FIELD,
  COLLECTION_ITEM_AUCTION_LOT_DETAILS_FIELD,
  COLLECTION_ITEM_AUCTION_LOT_MY_BID_FIELD,
  COLLECTION_ITEM_FIELD,
  FAVORITE_ITEMS_FIELD,
} from './collection.fragment';

export type IUseQueryResult = UseQueryResult & {
  loading: UseQueryResult['isLoading'];
  data: any;
}; // FIXME this is temporary, change loading to isLoading everywhere

export enum EMojitoQueries {
  serverTime,
  checkUsername,
  userFavorites,
  userActiveBids,
  userWallets,
  profile,
  organization,
  oneLot,
  invoices,
  collectionBySlug,
  collectionLotsIdList,
  marketplaceCollectionsInfoWithItemsIdAndSlug,
  collectionBySlugCurrentBids,
  collectionItemByIdBidsList,
  collectionItemByIdRemainingCount,
}

export const mojitoQueries = {
  [EMojitoQueries.profile]: gql`
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
          id
          organizationId
          role
          bidAllowed
          kycStatus
          avatar
          username
          settings
          externalUserId
        }
      }
    }
  `,
  [EMojitoQueries.organization]: gql`
    query GetOrganization($filter: UserOrgFilter) {
      serverTime
      me {
        id
        userOrgs(filter: $filter) {
          id
          role
          kycStatus
          bidAllowed
          avatar
          username
          settings
        }
      }
    }
  `,
  [EMojitoQueries.userWallets]: gql`
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
  [EMojitoQueries.invoices]: gql`
    query GetInvoices {
      getMyInvoices {
        invoiceID
        invoiceNumber
        invoiceCreatedAt
        status
        items {
          collectionItemID
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
  [EMojitoQueries.userActiveBids]: gql`
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
  [EMojitoQueries.userFavorites]: gql`
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
  [EMojitoQueries.checkUsername]: gql`
    query CheckUsername($organizationID: String!, $username: String!) {
      orgUsernameAvailable(organizationID: $organizationID, username: $username)
    }
  `,
  [EMojitoQueries.collectionBySlug]: gql`
    ${COLLECTION_ITEM_FIELD}
    query collectionBySlug($slug: String!, $marketplaceID: UUID1!) {
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
  [EMojitoQueries.collectionBySlugCurrentBids]: gql`
    ${COLLECTION_ITEM_AUCTION_LOT_CURRENT_BID_FIELD}
    ${COLLECTION_ITEM_AUCTION_LOT_MY_BID_FIELD}

    query collectionBySlugCurrentBids($slug: String!, $marketplaceID: UUID1!) {
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
  [EMojitoQueries.collectionItemByIdRemainingCount]: gql`
    query collectionItemByIdBidsList($id: UUID1!) {
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
  [EMojitoQueries.collectionItemByIdBidsList]: gql`
    ${COLLECTION_ITEM_AUCTION_LOT_BIDS_LIST_FIELD}

    query collectionItemByIdBidsList($id: UUID1!) {
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
  [EMojitoQueries.collectionLotsIdList]: gql`
    ${COLLECTION_ITEM_FIELD}
    query collectionLotsIdList($slug: String!, $marketplaceID: UUID1!) {
      collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {
        items(statuses: [Active]) {
          id
          name
          saleType
        }
      }
    }
  `,
  [EMojitoQueries.oneLot]: gql`
    ${COLLECTION_ITEM_AUCTION_LOT_DETAILS_FIELD}
    query oneLot($marketplaceAuctionLotId: UUID!) {
      getMarketplaceAuctionLot(marketplaceAuctionLotId: $marketplaceAuctionLotId) {
        ...CollectionItemAuctionLotDetailsFields
      }
    }
  `,
  [EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug]: gql`
    query marketplaceCollectionsInfoWithItemsIdAndSlug($id: UUID!) {
      marketplace(id: $id) {
        collections {
          id
          slug
          name
          description
          startDate
          endDate
          items(statuses: [Active]) {
            slug
            id
          }
        }
      }
    }
  `,
  [EMojitoQueries.serverTime]: gql`
    query {
      serverTime
    }
  `,
};
