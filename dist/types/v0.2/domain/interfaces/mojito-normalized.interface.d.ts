import { EMojitoCollectionItemAuctionLotStatus } from '../enums';
import { IContentfulCollection, IContentfulCollectionItem } from './contentful.interface';
import * as Schema from './mojito-schema.interface';
import { Combine } from './_utils.interface';
export declare type MojitoServerTime = Date;
declare type MojitoQueryNormalizer = {
  serverTime: MojitoServerTime;
  me: MojitoCurrentUser;
};
export declare type MojitoQuery = Combine<Schema.Query, MojitoQueryNormalizer>;
declare type MojitoCurrentUserNormalizer = {
  wallets: MojitoWallet[];
  wonBids: MojitoMarketplaceAuctionBid[];
  activeBids: MojitoMarketplaceAuctionBid[];
  userOrgs: MojitoUserOrganization[];
  favoriteItems: MojitoMarketplaceCollectionItem[];
};
export declare type MojitoCurrentUser = Combine<Schema.CurrentUser, MojitoCurrentUserNormalizer>;
declare type MojitoOrganizationNormalizer = {
  wallets: MojitoWallet[];
  assets: MojitoAsset[];
  nftContracts: MojitoNftContract[];
};
export declare type MojitoOrganization = Combine<
  Omit<Schema.Organization, 'marketplaces'>,
  MojitoOrganizationNormalizer
>;
declare type MojitoUserOrganizationNormalizer = {
  settings: {
    hasCompletedOnboarding: boolean;
  };
  hasNotifications: boolean;
  notifications: {
    isTransactionalWithID: boolean;
    completeYourProfile: boolean;
    uploadID: boolean;
    contactUs: boolean;
  };
};
export declare type MojitoUserOrganization = Combine<
  Omit<Schema.UserOrganization, 'user' | 'organization'>,
  MojitoUserOrganizationNormalizer
>;
declare type MojitoWalletNormalizer = {
  tokens: MojitoWalletToken[];
};
export declare type MojitoWallet = Combine<Schema.Wallet, MojitoWalletNormalizer>;
declare type MojitoWalletTokenNormalizer = {
  walletId: string;
};
export declare type MojitoWalletToken = Combine<Schema.WalletToken, MojitoWalletTokenNormalizer>;
interface MojitoMarketplaceAuctionBidNormalizer {
  userOrganization: MojitoUserOrganization;
  isMine: boolean;
  isCurrent: boolean;
  isHold: boolean;
  isOutbid: boolean;
  isInfo: boolean;
  isLost: boolean;
  isSold: boolean;
  isWin: boolean;
  isStart: boolean;
}
export declare type MojitoMarketplaceAuctionBid = Combine<
  Omit<Schema.MarketplaceAuctionBid, 'marketplaceAuctionLot'>,
  MojitoMarketplaceAuctionBidNormalizer
>;
declare type MarketplaceCollectionNormalizer = {
  content: IContentfulCollection;
  items: MojitoMarketplaceCollectionItem[];
  saleStatus: MojitoSaleStatus;
  hasMultipleLots: boolean;
};
export declare type MojitoMarketplaceCollection = Combine<
  Schema.MarketplaceCollection,
  MarketplaceCollectionNormalizer
>;
declare type MojitoMarketplaceNormalizer = {
  collections: MojitoMarketplaceCollection[];
};
export declare type MojitoMojitoMarketplace = Combine<
  Schema.Marketplace,
  MojitoMarketplaceNormalizer
>;
declare type MojitoMarketplaceCollectionItemNormalizer<T> = {
  content: any;
  details: MojitoCollectionItemDetails<T>;
};
export declare type MojitoMarketplaceCollectionItem<T = Schema.MarketplaceSaleType> = Combine<
  Omit<Schema.MarketplaceCollectionItem, 'lot'>,
  MojitoMarketplaceCollectionItemNormalizer<T>
>;
declare type CollectionItemDetailsCommonNormalizer = {
  saleView: MojitoSaleStatus;
};
declare type CollectionItemDetailsBuyNowOutputNormalizer = CollectionItemDetailsCommonNormalizer & {
  invoice: MojitoInvoiceDetails;
};
declare type CollectionItemDetailsAuctionLotNormalizer = CollectionItemDetailsCommonNormalizer & {
  status: EMojitoCollectionItemAuctionLotStatus;
  currentBid: MojitoMarketplaceAuctionBid;
  myBid: MojitoMarketplaceAuctionBid;
  bids: MojitoMarketplaceAuctionBid[];
};
declare type CollectionItemDetailsClaimableOutputNormalizer =
  CollectionItemDetailsCommonNormalizer & {};
declare type CollectionItemDetailsNormalizer =
  | CollectionItemDetailsBuyNowOutputNormalizer
  | CollectionItemDetailsAuctionLotNormalizer
  | CollectionItemDetailsClaimableOutputNormalizer;
export declare type MojitoCollectionItemDetails<T = Schema.MarketplaceSaleType> =
  T extends Schema.MarketplaceSaleType.BuyNow
    ? Combine<
        Omit<Schema.MarketplaceBuyNowOutput, 'marketplaceCollectionItem'>,
        CollectionItemDetailsBuyNowOutputNormalizer
      >
    : T extends Schema.MarketplaceSaleType.Auction
    ? Combine<
        Omit<Schema.MarketplaceAuctionLot, 'marketplaceCollectionItem'>,
        CollectionItemDetailsAuctionLotNormalizer
      >
    : T extends Schema.MarketplaceSaleType.Claimable
    ? Combine<
        Omit<Schema.MarketplaceClaimableOutput, 'marketplaceCollectionItem'>,
        CollectionItemDetailsClaimableOutputNormalizer
      >
    : Combine<Schema.MarketplaceCollectionItemDetails, CollectionItemDetailsNormalizer>;
declare type InvoiceDetailsNormalizer = {
  items: MojitoInvoiceDetailsItem[];
};
export declare type MojitoInvoiceDetails = Combine<Schema.InvoiceDetails, InvoiceDetailsNormalizer>;
declare type InvoiceDetailsItemNormalizer = {
  content: IContentfulCollectionItem;
};
export declare type MojitoInvoiceDetailsItem = Combine<
  Schema.ItemInvoiceDetail,
  InvoiceDetailsItemNormalizer
>;
declare type AssetNormalizer = {
  versions: MojitoAssetVersion[];
  currentVersion: MojitoAssetVersion;
};
export declare type MojitoAsset = Combine<Schema.Asset, AssetNormalizer>;
declare type AssetVersionNormalizer = {};
export declare type MojitoAssetVersion = Combine<
  Omit<Schema.AssetVersion, 'asset'>,
  AssetVersionNormalizer
>;
declare type NftContractNormalizer = {
  nftTokens: MojitoNftToken;
};
export declare type MojitoNftContract = Combine<Schema.NftContract, NftContractNormalizer>;
declare type NftTokenNormalizer = {
  asset: MojitoAsset;
};
export declare type MojitoNftToken = Combine<
  Omit<Schema.NftToken, 'nftContract'>,
  NftTokenNormalizer
>;
declare type CollectionItemRemainingCountNormalizer = {
  details: Pick<
    MojitoCollectionItemDetails<Schema.MarketplaceSaleType.BuyNow>,
    'id' | 'remainingCount'
  >;
};
export declare type MojitoCollectionItemRemainingCount = Combine<
  Pick<Schema.MarketplaceCollectionItem, 'id' | 'details'>,
  CollectionItemRemainingCountNormalizer
>;
declare type CollectionItemBidsListNormalizer = {
  details: Pick<MojitoCollectionItemDetails<Schema.MarketplaceSaleType.Auction>, 'bids'>;
};
export declare type MojitoCollectionItemBidsList = Combine<
  Pick<Schema.MarketplaceCollectionItem, 'details'>,
  CollectionItemBidsListNormalizer
>;
export interface ServerTimeResponse {
  serverTime: string;
}
export interface CurrentUserResponse {
  me: MojitoCurrentUser;
}
export interface ProfileResponse {
  me: Pick<MojitoCurrentUser, 'user'>;
}
export interface FavoriteResponse {
  me: Pick<MojitoCurrentUser, 'favoriteItems'>;
}
export interface WalletsResponse {
  me: Pick<MojitoCurrentUser, 'wallets'>;
}
export interface UserOrganizationResponse {
  me: Pick<MojitoCurrentUser, 'userOrgs'>;
}
export interface ServerTimeResponse {
  serverTime: string;
}
export interface OrgUsernameAvailableResponse {
  orgUsernameAvailable: boolean;
}
export declare type MarketplaceResponse = {
  marketplace: MojitoMojitoMarketplace;
};
export interface CollectionItemResponse {
  collectionItemById: MojitoMarketplaceCollectionItem;
}
export interface CollectionItemBySlugResponse {
  collectionBySlug: MojitoMarketplaceCollectionItem;
}
export interface CollectionItemRemainingCountResponse {
  collectionItemById: MojitoCollectionItemRemainingCount;
}
export interface MojitoGetMyInvoicesResponse {
  getMyInvoices: MojitoInvoiceDetails[];
}
export interface CollectionItemBidsListResponse {
  collectionItemById: MojitoCollectionItemBidsList;
}
export interface MojitoCollectionItemCurrentBidsResponse {
  items: {
    id: string;
    details: Pick<
      MojitoCollectionItemDetails<Schema.MarketplaceSaleType.Auction>,
      'id' | 'endDate' | 'startDate' | 'startingBid' | 'currentBid' | 'myBid'
    >;
  }[];
}
export declare type MojitoSaleStatus = {
  isDuringSale: boolean;
  isPostSale: boolean;
  isPreSale: boolean;
};
export {};
