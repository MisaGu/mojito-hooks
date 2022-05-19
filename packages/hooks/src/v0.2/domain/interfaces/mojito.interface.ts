import {
  EKycStatus,
  EMojitoCollectionItemAuctionLotStatus,
  EMojitoCollectionItemStatus,
  InvoiceStatus,
  SaleType,
} from '../enums';
import { IContentfulAuction, IContentfulLotData } from './contentful.interface';

export interface IMojitoProfileUserOrg {
  id: string;
  userId: string;
  user: IMojitoProfileUser;
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

export interface IApiKeys {
  id: string;
  key: string;
  updatedAt: string;
  createdAt: string;
}

export interface IMojitoWalletTokenMetaAttr {
  traitType: string;
  value: {
    intValue?: number;
    floatValue?: number;
    stringValue?: string;
  };
  displayType: string;
  maxValue: number;
}
export interface IMojitoWalletTokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes: IMojitoWalletTokenMetaAttr[];
  externalURL: string;
  backgroundColor: string;
  animationURL: string;
  timestamp: string;
  language: string;
}

export interface IMojitoWalletToken {
  id: string;
  title: string;
  contractAddress: string;
  timeLastUpdated: string;
  metadata: IMojitoWalletTokenMetadata;
  walletId: string;
}

export interface IMojitoWalletNetwork {
  id: string;
  name: string;
  chainID: number;
  rpcURL: string;
  openSeaProxyAddress: string;
  wethAddress: string;
  safeMasterContractAddress: string;
  safeFactoryAddress: string;
  safeFallbackHandler: string;
}

export interface IMojitoWallet {
  id: string;
  name: string;
  address: string; //EthAddress
  parentType: string;
  parentID: string;
  network: IMojitoWalletNetwork;
  networkId: string;
  transactionId: string;
  deploymentTxHash: string;
  gnosisSafeURL: string;
  tokens: IMojitoWalletToken[];
}

export interface IMojitoProfileUser {
  id: string;
  avatar: string;
  username: string;
  name: string;
  email: string;
  wallets: IMojitoWallet[];
}

export interface IMojitoCollectionItemDetailsBid {
  id: string;
  marketplaceAuctionLotId: string;
  marketplaceAuctionLot: IMojitoCollectionItemAuctionLot;
  userId: string;
  amount: number;
  marketplaceUser: IMojitoProfileUser;
  userOrganization: IMojitoProfileUserOrg;
  nextBidIncrement: number;
  createdAt: string;
  maximumBid: number;
  // custom props
  isMine?: boolean;
  isCurrent?: boolean;
  isHold?: boolean;
  isOutbid?: boolean;
  isInfo?: boolean;
  isLost?: boolean;
  isSold?: boolean;
  isWin?: boolean;
  isStart?: boolean;
}

export interface IMojitoProfileRequest {
  me: IMojitoProfile;
}

export interface IMojitoFavoriteRequest {
  me: Pick<IMojitoProfile, 'favoriteItems'>;
}

export interface IMojitoProfile {
  id: string;
  user: IMojitoProfileUser;
  userOrgs: IMojitoProfileUserOrg[];
  apiKeys: IApiKeys;
  favoriteItems: IMojitoCollectionItem[];
  activeBids: IMojitoCollectionItemDetailsBid[];
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

export type IMojitoCollectionItem =
  | IMojitoCollectionItemBuyNowLot
  | IMojitoCollectionItemAuctionLot;

export interface IMojitoCollectionItemCurrentBids {
  id: string;
  details: {
    id: string;
    endDate: string;
    startDate: string;
    startingBid: number;
    currentBid: IMojitoCollectionItemDetailsBid;
    myBid: IMojitoCollectionItemDetailsBid | null;
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
    bids: IMojitoCollectionItemDetailsBid[];
  };
}

export interface ICollectionItemByIdBidsListRequest {
  collectionItemById: ICollectionItemByIdBidsList;
}

export interface IIMojitoCollectionItemCurrentBidsRequest {
  collectionBySlug: {
    id: string;
    items: IMojitoCollectionItemCurrentBids[];
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
  items: IMojitoCollectionItem[];
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
