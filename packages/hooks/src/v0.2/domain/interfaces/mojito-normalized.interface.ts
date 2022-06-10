import { EMojitoCollectionItemAuctionLotStatus } from '../enums';
import { IContentfulAuction, IContentfulLotData } from './contentful.interface';
import * as Schema from './mojito-schema.interface';
import { Combine } from './_utils.interface';

export type MojitoServerTime = Date;

type MojitoQueryNormalizer = {
  serverTime: MojitoServerTime;
  me: MojitoCurrentUser;
};
export type MojitoQuery = Combine<Schema.Query, MojitoQueryNormalizer>;

type MojitoCurrentUserNormalizer = {
  wallets: MojitoWallet[];
  wonBids: MojitoMarketplaceAuctionBid[];
  activeBids: MojitoMarketplaceAuctionBid[];
  userOrgs: MojitoUserOrganization[];
  favoriteItems: MojitoMarketplaceCollectionItem[];
};
export type MojitoCurrentUser = Combine<Schema.CurrentUser, MojitoCurrentUserNormalizer>;

type MojitoOrganizationNormalizer = {
  marketplaces: null;
  wallets: MojitoWallet[];
  assets: MojitoAsset[];
  nftContracts: MojitoNftContract[];
};
export type MojitoOrganization = Combine<Schema.Organization, MojitoOrganizationNormalizer>;

type MojitoUserOrganizationNormalizer = {
  settings: { hasCompletedOnboarding: boolean };
  hasNotifications: boolean;
  notifications: {
    isTransactionalWithID: boolean;
    completeYourProfile: boolean;
    uploadID: boolean;
    contactUs: boolean;
  };
};
export type MojitoUserOrganization = Combine<
  Omit<Schema.UserOrganization, 'user' | 'organization'>,
  MojitoUserOrganizationNormalizer
>;

type MojitoWalletNormalizer = {
  tokens: MojitoWalletToken[];
};
export type MojitoWallet = Combine<Schema.Wallet, MojitoWalletNormalizer>;

type MojitoWalletTokenNormalizer = {
  walletId: string;
};
export type MojitoWalletToken = Combine<Schema.WalletToken, MojitoWalletTokenNormalizer>;

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
export type MojitoMarketplaceAuctionBid = Combine<
  Omit<Schema.MarketplaceAuctionBid, 'marketplaceAuctionLot'>,
  MojitoMarketplaceAuctionBidNormalizer
>;

type MarketplaceCollectionNormalizer = {
  contentfulData: IContentfulAuction;
  items: MojitoMarketplaceCollectionItem[];
  viewStatus: IMojitoCollectionView;
  hasMultipleLots: boolean;
};
export type MojitoMarketplaceCollection = Combine<
  Schema.MarketplaceCollection,
  MarketplaceCollectionNormalizer
>;

type MojitoMarketplaceNormalizer = {
  collections: MojitoMarketplaceCollection[];
};
export type MojitoMojitoMarketplace = Combine<Schema.Marketplace, MojitoMarketplaceNormalizer>;

type MojitoMarketplaceCollectionItemNormalizer<T> = {
  content: any; // TODO: contentful data type
  details: MojitoCollectionItemDetails<T>;
};
export type MojitoMarketplaceCollectionItem<T = Schema.MarketplaceSaleType> = Combine<
  Omit<Schema.MarketplaceCollectionItem, 'lot'>,
  MojitoMarketplaceCollectionItemNormalizer<T>
>;

type CollectionItemDetailsCommonNormalizer = {
  saleView: IMojitoViewType;
};
type CollectionItemDetailsBuyNowOutputNormalizer = CollectionItemDetailsCommonNormalizer & {
  invoice: MojitoInvoiceDetails;
};
type CollectionItemDetailsAuctionLotNormalizer = CollectionItemDetailsCommonNormalizer & {
  status: EMojitoCollectionItemAuctionLotStatus;
  currentBid: MojitoMarketplaceAuctionBid;
  myBid: MojitoMarketplaceAuctionBid;
  bids: MojitoMarketplaceAuctionBid[];
};
type CollectionItemDetailsClaimableOutputNormalizer = CollectionItemDetailsCommonNormalizer & {};
type CollectionItemDetailsNormalizer =
  | CollectionItemDetailsBuyNowOutputNormalizer
  | CollectionItemDetailsAuctionLotNormalizer
  | CollectionItemDetailsClaimableOutputNormalizer;
export type MojitoCollectionItemDetails<T = Schema.MarketplaceSaleType> =
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

type InvoiceDetailsNormalizer = {
  items: MojitoInvoiceDetailsItem[];
};
export type MojitoInvoiceDetails = Combine<Schema.InvoiceDetails, InvoiceDetailsNormalizer>;

type InvoiceDetailsItemNormalizer = {
  content: IContentfulLotData;
};
export type MojitoInvoiceDetailsItem = Combine<
  Schema.ItemInvoiceDetail,
  InvoiceDetailsItemNormalizer
>;

type AssetNormalizer = {
  versions: MojitoAssetVersion[];
  currentVersion: MojitoAssetVersion;
};
export type MojitoAsset = Combine<Schema.Asset, AssetNormalizer>;

type AssetVersionNormalizer = {};
export type MojitoAssetVersion = Combine<
  Omit<Schema.AssetVersion, 'asset'>,
  AssetVersionNormalizer
>;

type NftContractNormalizer = {
  nftTokens: MojitoNftToken;
};
export type MojitoNftContract = Combine<Schema.NftContract, NftContractNormalizer>;

type NftTokenNormalizer = {
  asset: MojitoAsset;
};
export type MojitoNftToken = Combine<Omit<Schema.NftToken, 'nftContract'>, NftTokenNormalizer>;

type CollectionItemRemainingCountNormalizer = {
  details: Pick<
    MojitoCollectionItemDetails<Schema.MarketplaceSaleType.BuyNow>,
    'id' | 'remainingCount'
  >;
};
export type MojitoCollectionItemRemainingCount = Combine<
  Pick<Schema.MarketplaceCollectionItem, 'id' | 'details'>,
  CollectionItemRemainingCountNormalizer
>;

type CollectionItemBidsListNormalizer = {
  details: Pick<MojitoCollectionItemDetails<Schema.MarketplaceSaleType.Auction>, 'bids'>;
};
export type MojitoCollectionItemBidsList = Combine<
  Pick<Schema.MarketplaceCollectionItem, 'details'>,
  CollectionItemBidsListNormalizer
>;

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

export type MarketplaceResponse = {
  marketplace: MojitoMojitoMarketplace;
};

export interface CollectionItemResponse {
  collectionItemById: MojitoMarketplaceCollectionItem;
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

export type IMojitoViewType = {
  isDuringSale: boolean;
  isPostSale: boolean;
  isPreSale: boolean;
};

export type IMojitoCollectionView = IMojitoViewType & {
  hasActiveBuyNowItems: boolean;
  hasActiveAuctionItems: boolean;
};
