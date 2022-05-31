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

export type NormalizedQuery = {
  __typename?: 'Query';
  ping: any;
  serverTime: IMojitoServerTime;
  me: MojitoCurrentUser;
  mailSalesReportByCollectionID: any;
  mailInvoiceLotDetailReportMailByCollectionID: any;
  validateIp: any;
  getApplicant: any;
  getSDKToken: any;
  getMarketplaceAuctionLot: any;
  collection: any;
  collectionBySlug: any;
  getBuyNowBuyerInfo: any;
  collectionItemById: any;
  nftContract: any;
  nftToken: any;
  organization: any;
  organizationByID: any;
  orgUsernameAvailable: any;
  marketplace: any;
  internalUsers: any;
  preparePaymentMethod: any;
  getPaymentMethod: any;
  getPaymentPublicKey: any;
  getPaymentMethodList: any;
  getMyInvoices: any;
  getInvoicesByUserID: any;
  getInvoiceDetails: any;
  getMyPayments: any;
  getPaymentsByUserID: any;
  getPaymentNotification: any;
  validatePaymentLimit: any;
  getTaxQuote: any;
  getAvailableClaimables: any;
  canRedeemClaimable: any;
  getUserByWalletAddress: any;
  wallet: any;
  network: any;
};

type MojitoCurrentUserNormalizer = {
  wallets: MojitoWallet[];
  wonBids: any; //TODO overload with Combine<>
  activeBids: MojitoMarketplaceAuctionBid[]; //TODO overload with Combine<>
  userOrgs: any; //TODO overload with Combine<>
  favoriteItems: any; //TODO overload with Combine<>
};
export type MojitoCurrentUser = Combine<Schema.CurrentUser, MojitoCurrentUserNormalizer>;

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

// =============================================== OLD ===============================================
export interface MojitoUserOrganization {
  id: string;
  userId: string;
  user: MojitoUser;
  externalUserId: string;
  organizationId: string;
  organization: any;
  kycStatus: EKycStatus;
  role: string;
  bidAllowed: boolean;
  username: string;
  avatar: string;
  settings: {
    hasCompletedOnboarding?: boolean;
    notifications: {
      bidOnSold?: boolean;
      savedBidOn?: boolean;
      savedSold?: boolean;
    };
    privacy: {
      hideActivity?: boolean;
      showCollection?: boolean;
      showSaved?: boolean;
    };
  };
  notifications: {
    isTransactionalWithID: boolean; // todo move to userStatus, this is not notification!!!!
    completeYourProfile: boolean;
    uploadID: boolean;
    contactUs: boolean;
  } | null;
}

export interface MojitoUserAPIKey {
  id: string;
  key: string;
  updatedAt: string;
  createdAt: string;
}

// export interface MojitoWallet {
//   id: string;
//   name: string;
//   address: string; //EthAddress
//   parentType: string;
//   parentID: string;
//   network: MojitoWalletNetwork;
//   networkId: string;
//   transactionId: string;
//   deploymentTxHash: string;
//   gnosisSafeURL: string;
//   tokens: MojitoWalletToken[];

// }

export interface MojitoUser {
  id: string;
  avatar: string;
  username: string;
  name: string;
  email: string;
  wallets: MojitoWallet[];
}

export interface IMojitoProfileResponse {
  me: MojitoCurrentUser;
}

export interface IMojitoFavoriteResponse {
  me: Pick<MojitoCurrentUser, 'favoriteItems'>;
}

export interface IMojitoServerTimeResponse {
  serverTime: string;
}

export interface IMojitoGetMyInvoicesRequest {
  getMyInvoices: IMojitoInvoice & {
    userName: string;
    paymentID: string;
    externalPaymentID: string;
    billingAddress: IMojitoInvoiceBillingAddress;
    OrganizationID: string;
  };
}

export interface IMojitoProfileCustomOrgs {
  hasNotifications: boolean;
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

export interface IMojitoInvoiceDetailsItem {
  collectionItemId: string;
  collectionTitle: string;
  collectionItemTitle: string;
  units: number;
  unitPrice: number;
  buyersPremium: number;
  overheadPremium: number;
  totalPrice: number;
  saleDate: string;
  taxes: number;
  salesTaxRate: number;
  destinationAddress: string;
  contentfulData?: IContentfulLotData;
}

export interface IMojitoInvoice {
  invoiceID: string;
  invoiceNumber: string;
  invoiceCreatedAt: string;
  externalUserID: string;
  internalUserID: string;
  items: IMojitoInvoiceDetailsItem[];
  status: InvoiceStatus;
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
  marketplaceTokenId: string;
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
  invoice: IMojitoInvoice;
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

/*
export interface IIMojitoCollectionItemCurrentBidsRequest {
  collectionBySlug: IIMojitoCollectionItemCurrentBids;
}
*/

export interface IIMojitoCollectionLotsIdList {
  items: IMojitoCollectionItemSummary[];
}

/*
export interface IIMojitoCollectionLotsIdListRequest {
  collectionBySlug: IIMojitoCollectionLotsIdList;
}
*/

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

export interface IMojitoMarketplace {
  id: string;
  name: string;
  organizationID: string;
  theme: string;
  collections: IMojitoCollection[];
  tokens: IMojitoMarketplaceToken;
}

export type IMojitoMarketplaceResponse = {
  marketplace: IMojitoMarketplace;
};

export interface IMojitoCollection {
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
