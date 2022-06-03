import {
  EKycStatus,
  EMojitoCollectionItemAuctionLotStatus,
  EMojitoCollectionItemStatus,
  InvoiceStatus,
  SaleType,
} from '../enums';
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
  wonBids: any; //TODO overload with Combine<>
  activeBids: MojitoMarketplaceAuctionBid[]; //TODO overload with Combine<>
  userOrgs: MojitoUserOrganization[]; //TODO overload with Combine<>
  favoriteItems: MojitoCollectionItem; //TODO overload with Combine<>
};
export type MojitoCurrentUser = Combine<Schema.CurrentUser, MojitoCurrentUserNormalizer>;

// Schema.UserOrganization

type MojitoUserOrganizationNormalizer = {
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
  marketplaceAuctionLot: MojitoMarketplaceAuctionLot;
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
  Schema.WalletToken,
  MojitoMarketplaceAuctionBidNormalizer
>;

type MarketplaceAuctionLotNormalizer = {};
export type MojitoMarketplaceAuctionLot = Combine<
  Omit<Schema.WalletToken, 'marketplaceCollectionItem'>,
  MarketplaceAuctionLotNormalizer
>;

type MojitoMarketplaceNormalizer = {
  collections: MojitoCollection[];
};
export type MojitoMojitoMarketplace = Combine<Schema.Marketplace, MojitoMarketplaceNormalizer>;

type CollectionItemNormalizer<T> = { details: MojitoCollectionItemDetails<T> };
export type MojitoCollectionItem<T = Schema.MarketplaceSaleType> = Combine<
  Schema.MarketplaceCollectionItem,
  CollectionItemNormalizer<T>
>;

type CollectionItemDetailsNormalizer = {};
export type MojitoCollectionItemDetails<T = Schema.MarketplaceSaleType> =
  T extends Schema.MarketplaceSaleType.BuyNow
    ? Combine<Schema.MarketplaceBuyNowOutput, CollectionItemDetailsNormalizer>
    : T extends Schema.MarketplaceSaleType.Auction
    ? Combine<Schema.MarketplaceAuctionLot, CollectionItemDetailsNormalizer>
    : T extends Schema.MarketplaceSaleType.Claimable
    ? Combine<Schema.MarketplaceClaimableOutput, CollectionItemDetailsNormalizer>
    : Combine<Schema.MarketplaceCollectionItemDetails, CollectionItemDetailsNormalizer>;

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

// =============================================== API Response ===============================================

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

// =============================================== OLD ===============================================

export interface MojitoUser {
  id: string;
  avatar: string;
  username: string;
  name: string;
  email: string;
  wallets: MojitoWallet[];
}

export interface IMojitoViewType {
  isDuringSale: boolean;
  isPostSale: boolean;
  isPreSale: boolean;
}

export interface IMojitoCollectionView extends IMojitoViewType {
  hasActiveBuyNowItems: boolean;
  hasActiveAuctionItems: boolean;
}

export interface IMojitoFeeStructure {
  from: number;
  rate: number;
  to: number;
}

export interface IMojitoInvoiceBillingAddress {
  street1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
// Collection items and collection item details common data:

interface IMojitoCollectionItemDetailsCommonProps {
  __typename?: string;
  id: string;
  marketplaceCollectionItemId: string;
  startDate: string;
  endDate: string;
  endTimestamp: number;
  saleView: IMojitoViewType;
}

interface IMojitoCollectionItemGeneric<S extends SaleType, D extends IMojitoCollectionItemDetails> {
  id: string;
  slug: string;
  collectionId: string;
  marketplaceTokenId: string | null;
  saleType: S;
  status: EMojitoCollectionItemStatus;
  details: D;
  contentfulData: IContentfulLotData;
  name: string;
}

export type IMojitoCollectionItemSummary = Pick<
  IMojitoCollectionItemGeneric<SaleType, IMojitoCollectionItemDetails>,
  'id' | 'name' | 'saleType'
>;

// Collection item auction lot:

export interface IMojitoCollectionFeeStructure {
  buyersPremiumRate: IMojitoFeeStructure[];
  overheadPremiumRate: IMojitoFeeStructure[];
}

export interface IMojitoCollectionItemDetailsAuctionLot
  extends IMojitoCollectionItemDetailsCommonProps {
  lotNumber: number;
  startingBid: number;
  reservePrice: number;
  reserveMet: number;
  previewDate: string;
  status: EMojitoCollectionItemAuctionLotStatus;
  // currentBid: IMojitoCollectionItemDetailsBid;
  // myBid: IMojitoCollectionItemDetailsBid | null;
  // bids: IMojitoCollectionItemDetailsBid[];
  defaultConfig: any;
  feeStructure: IMojitoCollectionFeeStructure;
  //custom props
}

export type IMojitoCollectionItemAuctionLot = IMojitoCollectionItemGeneric<
  SaleType.Auction,
  IMojitoCollectionItemDetailsAuctionLot
>;

// Collection item buy now lot:

export interface IMojitoCollectionItemDetailsBuyNowLot
  extends IMojitoCollectionItemDetailsCommonProps {
  unitPrice: number;
  totalUnits: number;
  totalAvailableUnits: number;
  sortNumber: number;
  invoice: MojitoInvoiceDetails;
  remainingCount: number;
}

export type IMojitoCollectionItemBuyNowLot = IMojitoCollectionItemGeneric<
  SaleType.BuyNow,
  IMojitoCollectionItemDetailsBuyNowLot
>;

// Mixed collection items details and collection items:

export type IMojitoCollectionItemDetails =
  | IMojitoCollectionItemDetailsBuyNowLot
  | IMojitoCollectionItemDetailsAuctionLot;

export type MojitoMarketplaceCollectionItem =
  | IMojitoCollectionItemBuyNowLot
  | IMojitoCollectionItemAuctionLot;

export interface IMojitoCollectionItemCurrentBids {
  id: string;
  details: {
    id: string;
    endDate: string;
    startDate: string;
    startingBid: number;
    currentBid: MojitoMarketplaceAuctionBid;
    myBid: MojitoMarketplaceAuctionBid | null;
    endTimestamp: number;
    saleView: IMojitoViewType;
  };
}

export interface ICollectionItemByIdBidsList {
  id: string;
  details: {
    id: string;
    endDate: string;
    startDate: string;
    bids: MojitoMarketplaceAuctionBid[];
  };
}

export interface ICollectionItemByIdBidsListRequest {
  collectionItemById: ICollectionItemByIdBidsList;
}

export interface IIMojitoCollectionItemCurrentBids {
  id: string;
  items: IMojitoCollectionItemCurrentBids[];
}

export interface IIMojitoCollectionItemCurrentBidsRequest {
  collectionBySlug: IIMojitoCollectionItemCurrentBids;
}

export interface IIMojitoCollectionLotsIdList {
  items: IMojitoCollectionItemSummary[];
}

export interface IIMojitoCollectionLotsIdListRequest {
  collectionBySlug: IIMojitoCollectionLotsIdList;
}

export interface IIMojitoCollectionBySlugRequest {
  collectionBySlug: {
    id: string;
    slug: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    items: MojitoMarketplaceCollectionItem[];
  };
}

export interface IIMojitoCollectionItemCurrentBidsItems {
  items: IMojitoCollectionItemCurrentBids[];
}

export interface IMojitoMarketplaceToken {
  id: string;
  name: string;
  marketplaceID: string;
  onChainTokenID: number;
  nftTokenID: string;
  nftContractAddress: string;
}

export interface MojitoCollection {
  id: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  contentfulData: IContentfulAuction;
  items: MojitoMarketplaceCollectionItem[];
  hasMultipleLots: boolean;
  name: string;
  viewStatus: IMojitoCollectionView;
  isFake: boolean;
}

export interface IMojitoItemInvoice {
  collectionTitle: string;
  collectionItemTitle: string;
  totalPrice: number;
}

export interface IMojitoTokenData {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: { trait_type: string; value: string }[];
}

export interface IUseMojitoOneLotSubscription {
  data: {
    getMarketplaceAuctionLot: Pick<
      IMojitoCollectionItemCurrentBids['details'],
      'id' | 'currentBid' | 'myBid'
    >;
  };
}

export interface IUseMojitoCollectionSubscription {
  data: {
    marketplaceCollectionLotsUpdates: Pick<
      IMojitoCollectionItemCurrentBids['details'],
      'id' | 'currentBid' | 'myBid'
    >;
  };
}
