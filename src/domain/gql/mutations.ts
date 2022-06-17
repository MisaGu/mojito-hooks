import { gql } from 'graphql-request';

export enum EMojitoMutations {
  saveCollectionItemToFavorites,
  removeCollectionItemFromFavorites,
  createBid,
  updateUserOrgSettings,
  transferToken,
}

export const mojitoMutations = {
  [EMojitoMutations.saveCollectionItemToFavorites]: gql`
    mutation AddCollectionItemToUserFavorites($collectionItemId: UUID1!) {
      addCollectionItemToUserFavorites(collectionItemId: $collectionItemId)
    }
  `,
  [EMojitoMutations.removeCollectionItemFromFavorites]: gql`
    mutation RemoveCollectionItemFromUserFavorites($collectionItemId: UUID1!) {
      deleteCollectionItemFromUserFavorites(collectionItemId: $collectionItemId)
    }
  `,
  [EMojitoMutations.createBid]: gql`
    mutation CreateMarketplaceAuctionBid($marketplaceAuctionLotId: UUID!, $amount: Float!) {
      createMarketplaceAuctionBid(
        marketplaceAuctionBid: {
          marketplaceAuctionLotId: $marketplaceAuctionLotId
          amount: $amount
        }
      ) {
        id
        amount
        marketplaceAuctionLotId
        userId
      }
    }
  `,
  [EMojitoMutations.updateUserOrgSettings]: gql`
    mutation ($userOrgId: String!, $username: String, $avatar: String, $settingsJson: String) {
      updateUserOrgSettings(
        params: {
          userOrgId: $userOrgId
          username: $username
          avatar: $avatar
          settingsJson: $settingsJson
        }
      ) {
        id
      }
    }
  `,
  [EMojitoMutations.transferToken]: gql`
    mutation (
      $walletId: UUID1!
      $tokenId: Int!
      $contractAddress: String!
      $transferTo: String!
      $tokenType: TokenType!
    ) {
      transferToken(
        walletId: $walletId
        tokenOnChainId: $tokenId
        contractAddress: $contractAddress
        transferTo: $transferTo
        tokenType: $tokenType
      )
    }
  `,
};
