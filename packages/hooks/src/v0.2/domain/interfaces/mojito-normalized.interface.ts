import { EMojitoCollectionItemAuctionLotStatus } from '../enums';
import { IContentfulAuction, IContentfulLotData } from './contentful.interface';
import * as Schema from './mojito-schema.interface';
import { Combine } from './_utils.interface';

export type IMojitoServerTime = Date;

type MojitoQueryNormalizer = {
  __typename?: 'Query';
  serverTime: IMojitoServerTime;
  me: MojitoCurrentUser;
};
export type MojitoQuery = Combine<Schema.Query, MojitoQueryNormalizer>;

type MojitoCurrentUserNormalizer = {
  wallets: MojitoWallet[];
  wonBids: MojitoMarketplaceAuctionBid[]; //TODO overload with Combine<>
  activeBids: MojitoMarketplaceAuctionBid[]; //TODO overload with Combine<>
  userOrgs: MojitoUserOrganization[]; //TODO overload with Combine<>
  favoriteItems: any; //TODO overload with Combine<>
};
export type MojitoCurrentUser = Combine<Schema.CurrentUser, MojitoCurrentUserNormalizer>;

type MojitoOrganizationNormalizer = {
  wallets: MojitoWallet[];
  assets: MojitoAsset[]; // FIX TYPE
  nftContracts: MojitoNftContract[]; // FIX TYPE
};
export type MojitoOrganization = Combine<
  Omit<Schema.Organization, 'marketplaces'>,
  MojitoOrganizationNormalizer
>;

type MojitoUserOrganizationNormalizer = {
  organization: MojitoOrganization;
  settings: {
    hasCompletedOnboarding: boolean;
    notifications: {
      bidOnSold: boolean;
      savedBidOn: boolean;
      savedSold: boolean;
    };
    privacy: {
      hideActivity: boolean;
      showCollection: boolean;
      showSaved: boolean;
    };
  };
  hasNotifications: boolean;
  notifications: {
    completeYourProfile: boolean;
    uploadID: boolean;
    contactUs: boolean;
  };
};
export type MojitoUserOrganization = Combine<
  Schema.UserOrganization,
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
  marketplaceAuctionLot: any;
  userOrganization: any;
  marketplaceUser: any;
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
  Schema.MarketplaceAuctionBid,
  MojitoMarketplaceAuctionBidNormalizer
>;

type MarketplaceAuctionLotNormalizer = {
  marketplaceCollectionItem: any;
  currentBid: any;
  myBid: any;
  bids: any;
};
export type MojitoMarketplaceAuctionLot = Combine<
  Omit<Schema.MarketplaceAuctionLot, 'marketplaceCollectionItem'>,
  MarketplaceAuctionLotNormalizer
>;

type MojitoCollectionNormalizer = {
  contentfulData: IContentfulAuction;
  items: MojitoCollectionItem[];
  viewStatus: IMojitoCollectionView;
};
export type MojitoMojitoCollection = Combine<
  Schema.MarketplaceCollection,
  MojitoCollectionNormalizer
>;

type MojitoMarketplaceNormalizer = {
  collections: MojitoMojitoCollection[];
};
export type MojitoMojitoMarketplace = Combine<Schema.Marketplace, MojitoMarketplaceNormalizer>;

type CollectionItemNormalizer<T> = { details: MojitoCollectionItemDetails<T> };
export type MojitoCollectionItem<T = Schema.MarketplaceSaleType> = Combine<
  Schema.MarketplaceCollectionItem,
  CollectionItemNormalizer<T>
>;

type CollectionItemDetailsCommonNormalizer = {
  content: any; // TODO: contentful data type
  saleView: IMojitoViewType;
};
type CollectionItemDetailsBuyNowOutputNormalizer = CollectionItemDetailsCommonNormalizer & {
  invoice: MojitoInvoiceDetails;
};
type CollectionItemDetailsAuctionLotNormalizer = CollectionItemDetailsCommonNormalizer & {
  status: EMojitoCollectionItemAuctionLotStatus;
  currentBid: MojitoMarketplaceAuctionBid;
  myBid: any;
  bids: any;
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
  collectionItemById: MojitoCollectionItem;
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
