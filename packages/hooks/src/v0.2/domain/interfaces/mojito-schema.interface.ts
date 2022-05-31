export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  EthAddress: string;
  Time: string;
  Upload: any;
  UUID: string;
  UUID1: string;
};

export type AchBankAddressOutput = {
  __typename?: 'ACHBankAddressOutput';
  bankName: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  city: Scalars['String'];
};

export type AchBillingDetails = {
  name: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
};

export type AchBillingDetailsOutput = {
  __typename?: 'ACHBillingDetailsOutput';
  name: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  city: Scalars['String'];
  postalCode: Scalars['String'];
};

export type AchData = {
  publicToken: Scalars['String'];
  accountId: Scalars['String'];
  metadata: AchMetadata;
  billingDetails: AchBillingDetails;
};

export type AchMetadata = {
  email: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type AchMetadataOutput = {
  __typename?: 'ACHMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type AchPaymentMethodOutput = {
  __typename?: 'ACHPaymentMethodOutput';
  id: Scalars['UUID1'];
  type: PaymentType;
  status: Scalars['String'];
  accountNumber: Scalars['String'];
  metadata?: Maybe<AchMetadataOutput>;
  bankAddress?: Maybe<AchBankAddressOutput>;
  billingDetails?: Maybe<AchBillingDetailsOutput>;
};

export type AchPaymentMethodPrepareStatementOutput = {
  __typename?: 'ACHPaymentMethodPrepareStatementOutput';
  linkToken: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  flatNumber?: Maybe<Scalars['String']>;
  buildingNumber?: Maybe<Scalars['String']>;
  buildingName?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  subStreet?: Maybe<Scalars['String']>;
  town?: Maybe<Scalars['String']>;
  postcode: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  line3?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  flatNumber?: Maybe<Scalars['String']>;
  buildingNumber: Scalars['String'];
  buildingName?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  subStreet?: Maybe<Scalars['String']>;
  town: Scalars['String'];
  postcode: Scalars['String'];
  country: Scalars['String'];
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  line3?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type ApplicantRequest = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  idNumbers?: Maybe<Array<Maybe<IdNumberInput>>>;
  address?: Maybe<AddressInput>;
};

export type ApplicantResponse = {
  __typename?: 'ApplicantResponse';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  idNumbers?: Maybe<Array<Maybe<IdNumber>>>;
  address?: Maybe<Address>;
  href?: Maybe<Scalars['String']>;
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['UUID1'];
  versions?: Maybe<Array<AssetVersion>>;
  currentVersion?: Maybe<AssetVersion>;
};

export type AssetFilter = {
  organizationID?: Maybe<Scalars['UUID1']>;
};

export type AssetVersion = {
  __typename?: 'AssetVersion';
  id: Scalars['UUID1'];
  slug: Scalars['String'];
  assetID: Scalars['UUID1'];
  asset: Asset;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isCurrent: Scalars['Boolean'];
  cdnUrl?: Maybe<Scalars['String']>;
  arweaveTx?: Maybe<Scalars['String']>;
};

export type AttributeValue = AttributeValueString | AttributeValueInt | AttributeValueFloat;

export type AttributeValueFloat = {
  __typename?: 'AttributeValueFloat';
  floatValue: Scalars['Float'];
};

export type AttributeValueInt = {
  __typename?: 'AttributeValueInt';
  intValue: Scalars['Int'];
};

export type AttributeValueString = {
  __typename?: 'AttributeValueString';
  stringValue: Scalars['String'];
};

export enum AuctionBidOrder {
  Desc = 'DESC',
  Asc = 'ASC',
}

export enum AuctionLotStatus {
  Hidden = 'Hidden',
  Preview = 'Preview',
  Active = 'Active',
  Completed = 'Completed',
}

export type BidFilterInput = {
  marketplaceAuctionLotId?: Maybe<Scalars['UUID']>;
  userId?: Maybe<Scalars['UUID']>;
  order?: Maybe<AuctionBidOrder>;
  returnDeleted?: Maybe<Scalars['Boolean']>;
};

export type BuyerDetailOutput = {
  __typename?: 'BuyerDetailOutput';
  totalPrice: Scalars['Float'];
  units: Scalars['Int'];
  timestamp: Scalars['Time'];
  userId: Scalars['UUID1'];
  user?: Maybe<User>;
  externalUserID: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type CheckResponse = {
  __typename?: 'CheckResponse';
  id: Scalars['String'];
  success: Scalars['Boolean'];
};

export enum CollectionType {
  Auction = 'Auction',
  Tk2 = 'TK2',
}

export enum ContractType {
  Erc721Creator = 'ERC721Creator',
  Erc1155Creator = 'ERC1155Creator',
}

export type CreateMarketplaceBuyNowLotInput = {
  marketplaceTokenId?: Maybe<Scalars['UUID1']>;
  collectionId: Scalars['UUID1'];
  collectionItemName: Scalars['String'];
  unitPrice: Scalars['Float'];
  totalUnits?: Maybe<Scalars['Int']>;
  startDate: Scalars['Time'];
  endDate: Scalars['Time'];
  sortNumber: Scalars['Int'];
  delivery?: Maybe<MarketplaceItemDeliveryInput>;
};

export type CreateMarketplaceClaimableSetInput = {
  collectionId: Scalars['UUID1'];
  collectionItemName: Scalars['String'];
  totalUnits: Scalars['Int'];
  totalAvailableUnits: Scalars['Int'];
  startDate: Scalars['Time'];
  endDate: Scalars['Time'];
};

export type CreatePaymentCreditCardMetadataInput = {
  keyID: Scalars['String'];
  encryptedData: Scalars['String'];
};

export type CreatePaymentCryptoMetadataInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  localPrice: LocalPrice;
  billingDetails?: Maybe<CryptoBillingDetails>;
  redirectURL?: Maybe<Scalars['String']>;
  cancelURL?: Maybe<Scalars['String']>;
};

export type CreatePaymentMetadataInput = {
  creditCardData?: Maybe<CreatePaymentCreditCardMetadataInput>;
  cryptoData?: Maybe<CreatePaymentCryptoMetadataInput>;
  destinationAddress?: Maybe<Scalars['EthAddress']>;
};

export type CreditCardBillingDetails = {
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
};

export type CreditCardBillingDetailsOutput = {
  __typename?: 'CreditCardBillingDetailsOutput';
  name: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  city: Scalars['String'];
  postalCode: Scalars['String'];
};

export type CreditCardData = {
  keyID: Scalars['String'];
  encryptedData: Scalars['String'];
  billingDetails?: Maybe<CreditCardBillingDetails>;
  expirationMonth: Scalars['Int'];
  expirationYear: Scalars['Int'];
  metadata?: Maybe<CreditCardMetadata>;
};

export type CreditCardMetadata = {
  email: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type CreditCardMetadataOutput = {
  __typename?: 'CreditCardMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreditCardPaymentMethodOutput = {
  __typename?: 'CreditCardPaymentMethodOutput';
  id: Scalars['UUID1'];
  type: PaymentType;
  status: Scalars['String'];
  network: Scalars['String'];
  last4Digit: Scalars['String'];
  metadata?: Maybe<CreditCardMetadataOutput>;
  billingDetails?: Maybe<CreditCardBillingDetailsOutput>;
};

export type CryptoBillingDetails = {
  name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
};

export type CryptoPaymentDetails = {
  __typename?: 'CryptoPaymentDetails';
  hostedURL: Scalars['String'];
};

export type CryptoPaymentMethodOutput = {
  __typename?: 'CryptoPaymentMethodOutput';
  id: Scalars['UUID1'];
  type: PaymentType;
  status: Scalars['String'];
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  id: Scalars['UUID'];
  user: User;
  userOrgs: Array<UserOrganization>;
  apiKeys?: Maybe<Array<Maybe<UserApiKeyResponse>>>;
  favoriteItems?: Maybe<Array<MarketplaceCollectionItem>>;
  wonBids: Array<MarketplaceAuctionBid>;
  activeBids: Array<MarketplaceAuctionBid>;
  wallets?: Maybe<Array<Wallet>>;
};

export type CurrentUserUserOrgsArgs = {
  filter?: Maybe<UserOrgFilter>;
};

export type CurrentUserWonBidsArgs = {
  orgId?: Maybe<Scalars['UUID']>;
};

export type CurrentUserActiveBidsArgs = {
  orgId: Scalars['UUID'];
};

export enum DeliveryMethod {
  Erc721Provenance = 'ERC721Provenance',
  Erc721Transfer = 'ERC721Transfer',
  Erc1155Transfer = 'ERC1155Transfer',
  Erc1155OpenEdition = 'ERC1155OpenEdition',
  NoOp = 'NoOp',
}

export type DeployContractInput = {
  contractType: ContractType;
  organizationId: Scalars['UUID1'];
  walletId: Scalars['UUID1'];
  nftName: Scalars['String'];
  nftSymbol: Scalars['String'];
};

export type Erc721Metadata = {
  __typename?: 'ERC721Metadata';
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  attributes?: Maybe<Array<MetadataAttributes>>;
  externalURL?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Scalars['String']>;
  animationURL?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
};

export enum ExtensionType {
  ProvenanceExtension = 'ProvenanceExtension',
}

export type IdNumber = {
  __typename?: 'IDNumber';
  type: Scalars['String'];
  value: Scalars['String'];
  stateCode: Scalars['String'];
};

export type IdNumberInput = {
  type: Scalars['String'];
  value: Scalars['String'];
  stateCode: Scalars['String'];
};

export type InvoiceDetails = {
  __typename?: 'InvoiceDetails';
  userName: Scalars['String'];
  invoiceID: Scalars['UUID1'];
  invoiceNumber: Scalars['Int'];
  invoiceCreatedAt: Scalars['Time'];
  externalUserID: Scalars['String'];
  internalUserID: Scalars['String'];
  items: Array<Maybe<ItemInvoiceDetail>>;
  status: InvoiceStatus;
  paymentID: Scalars['UUID1'];
  externalPaymentID: Scalars['String'];
  billingAddress?: Maybe<InvoiceDetailsBillingAddress>;
  OrganizationID: Scalars['UUID1'];
};

export type InvoiceDetailsBillingAddress = {
  __typename?: 'InvoiceDetailsBillingAddress';
  street1: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
};

export enum InvoiceStatus {
  Draft = 'Draft',
  AwaitingUserPayment = 'AwaitingUserPayment',
  Pending = 'Pending',
  Canceled = 'Canceled',
  Expired = 'Expired',
  Paid = 'Paid',
  Failed = 'Failed',
  Delivered = 'Delivered',
}

export type ItemInvoiceDetail = {
  __typename?: 'ItemInvoiceDetail';
  collectionItemID: Scalars['UUID1'];
  collectionTitle: Scalars['String'];
  collectionItemTitle: Scalars['String'];
  destinationAddress: Scalars['String'];
  units: Scalars['Int'];
  unitPrice: Scalars['Float'];
  buyersPremium: Scalars['Float'];
  overheadPremium: Scalars['Float'];
  totalPrice: Scalars['Float'];
  saleDate: Scalars['Time'];
  taxes: Scalars['Float'];
  salesTaxRate: Scalars['Float'];
};

export enum KycStatus {
  None = 'None',
  Pending = 'Pending',
  Level1 = 'Level1',
  Level2 = 'Level2',
  Clear = 'Clear',
  Failed1 = 'Failed1',
  Failed2 = 'Failed2',
}

export type LocalPrice = {
  amount: Scalars['Float'];
  currency: Scalars['String'];
};

export enum MarketCollectionStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Archived = 'Archived',
}

export type Marketplace = {
  __typename?: 'Marketplace';
  id: Scalars['UUID'];
  name: Scalars['String'];
  organizationID: Scalars['String'];
  theme?: Maybe<Scalars['String']>;
  collections?: Maybe<Array<MarketplaceCollection>>;
  tokens?: Maybe<Array<MarketplaceToken>>;
};

export type MarketplaceAuctionBid = {
  __typename?: 'MarketplaceAuctionBid';
  id: Scalars['UUID'];
  marketplaceAuctionLotId: Scalars['UUID1'];
  marketplaceAuctionLot: MarketplaceAuctionLot;
  currentBid: Scalars['Float'];
  maximumBid?: Maybe<Scalars['Float']>;
  userId: Scalars['UUID'];
  amount: Scalars['Float'];
  userOrganization: UserOrganization;
  isCurrent: Scalars['Boolean'];
  nextBidIncrement: Scalars['Float'];
  createdAt: Scalars['Time'];
  deletedAt?: Maybe<Scalars['Time']>;
  marketplaceUser?: Maybe<MarketplaceUser>;
  isMine: Scalars['Boolean'];
  buyersPremium: Scalars['Float'];
  overheadPremium: Scalars['Float'];
  finalPrice: Scalars['Float'];
};

export type MarketplaceAuctionBidInput = {
  marketplaceAuctionLotId: Scalars['UUID'];
  amount: Scalars['Float'];
};

export type MarketplaceAuctionDefaultConfig = {
  __typename?: 'MarketplaceAuctionDefaultConfig';
  id: Scalars['UUID'];
  collectionId: Scalars['UUID'];
  reservePrice?: Maybe<Scalars['Float']>;
  startDate: Scalars['Time'];
  endDate: Scalars['Time'];
  minIncrement: Scalars['Float'];
};

export type MarketplaceAuctionFeeStructure = {
  __typename?: 'MarketplaceAuctionFeeStructure';
  buyersPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
  overheadPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
};

export type MarketplaceAuctionFeeStructureItem = {
  __typename?: 'MarketplaceAuctionFeeStructureItem';
  from: Scalars['Float'];
  to?: Maybe<Scalars['Float']>;
  rate: Scalars['Float'];
};

export type MarketplaceAuctionLot = {
  __typename?: 'MarketplaceAuctionLot';
  id: Scalars['UUID'];
  lotNumber?: Maybe<Scalars['Int']>;
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  marketplaceCollectionItemId: Scalars['UUID1'];
  startingBid?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
  reserveMet: Scalars['Boolean'];
  previewDate?: Maybe<Scalars['Time']>;
  startDate: Scalars['Time'];
  endDate: Scalars['Time'];
  status: AuctionLotStatus;
  currentBid?: Maybe<MarketplaceAuctionBid>;
  myBid?: Maybe<MarketplaceAuctionBid>;
  bids: Array<MarketplaceAuctionBid>;
  defaultConfig: MarketplaceAuctionDefaultConfig;
  feeStructure: MarketplaceAuctionFeeStructure;
};

export type MarketplaceAuctionLotBidsArgs = {
  filter?: Maybe<BidFilterInput>;
};

export type MarketplaceAuctionLotDefaultConfigArgs = {
  collectionId: Scalars['UUID'];
};

export type MarketplaceAuctionLotInput = {
  marketplaceTokenId?: Maybe<Scalars['UUID']>;
  collectionId: Scalars['UUID'];
  saleType: MarketplaceSaleType;
  startingBid?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
  lotNumber?: Maybe<Scalars['Int']>;
  startDate: Scalars['Time'];
  endDate: Scalars['Time'];
  collectionItemName: Scalars['String'];
  delivery?: Maybe<MarketplaceItemDeliveryInput>;
};

export type MarketplaceAuctionLotUpdateInput = {
  startingBid?: Maybe<Scalars['Float']>;
  reservePrice?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['Time']>;
  endDate?: Maybe<Scalars['Time']>;
  maxEndDate?: Maybe<Scalars['Time']>;
  status?: Maybe<AuctionLotStatus>;
  lotNumber?: Maybe<Scalars['Int']>;
  delivery?: Maybe<MarketplaceItemDeliveryInput>;
};

export type MarketplaceBuyNowOutput = {
  __typename?: 'MarketplaceBuyNowOutput';
  id: Scalars['UUID'];
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  unitPrice: Scalars['Float'];
  totalUnits: Scalars['Int'];
  totalAvailableUnits: Scalars['Int'];
  startDate: Scalars['Time'];
  endDate: Scalars['Time'];
  sortNumber: Scalars['Int'];
  invoice?: Maybe<InvoiceDetails>;
  remainingCount: Scalars['Int'];
  purchaseTimeoutInMinutes?: Maybe<Scalars['Int']>;
};

export type MarketplaceBuyNowUpdateInput = {
  unitPrice?: Maybe<Scalars['Float']>;
  totalUnits?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['Time']>;
  endDate?: Maybe<Scalars['Time']>;
  sortNumber?: Maybe<Scalars['Int']>;
};

export type MarketplaceClaimableOutput = {
  __typename?: 'MarketplaceClaimableOutput';
  id: Scalars['UUID'];
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  totalUnits: Scalars['Int'];
  totalAvailableUnits: Scalars['Int'];
  startDate: Scalars['Time'];
  endDate: Scalars['Time'];
};

export type MarketplaceCollection = {
  __typename?: 'MarketplaceCollection';
  id: Scalars['UUID1'];
  marketplaceID: Scalars['UUID1'];
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  status: MarketCollectionStatus;
  startDate?: Maybe<Scalars['Time']>;
  endDate?: Maybe<Scalars['Time']>;
  collectionType: CollectionType;
  items?: Maybe<Array<MarketplaceCollectionItem>>;
};

export type MarketplaceCollectionItemsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  statuses?: Maybe<Array<Maybe<MarketplaceCollectionItemStatus>>>;
};

export type MarketplaceCollectionCreateInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  startDate?: Maybe<Scalars['Time']>;
  endDate?: Maybe<Scalars['Time']>;
  status?: Maybe<MarketCollectionStatus>;
};

export type MarketplaceCollectionItem = {
  __typename?: 'MarketplaceCollectionItem';
  id: Scalars['UUID'];
  marketplaceTokenId?: Maybe<Scalars['UUID']>;
  collectionId: Scalars['UUID'];
  saleType: MarketplaceSaleType;
  name: Scalars['String'];
  slug: Scalars['String'];
  status: MarketplaceCollectionItemStatus;
  /** @deprecated Use `details` property instead */
  lot: MarketplaceAuctionLot;
  details: MarketplaceCollectionItemDetails;
  delivery?: Maybe<MarketplaceCollectionItemDelivery>;
};

export type MarketplaceCollectionItemDelivery =
  | MarketplaceItemDeliveryErc721Provenance
  | MarketplaceItemDeliveryErc721Transfer
  | MarketplaceItemDeliveryErc1155Transfer
  | MarketplaceItemDeliveryErc1155OpenEdition
  | MarketplaceItemDeliveryNoOp;

export type MarketplaceCollectionItemDetails =
  | MarketplaceBuyNowOutput
  | MarketplaceAuctionLot
  | MarketplaceClaimableOutput;

export enum MarketplaceCollectionItemStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview',
}

export type MarketplaceCollectionUpdateInput = {
  slug?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Time']>;
  endDate?: Maybe<Scalars['Time']>;
  status?: Maybe<MarketCollectionStatus>;
  description?: Maybe<Scalars['String']>;
};

export type MarketplaceItemDeliveryErc1155OpenEdition = {
  __typename?: 'MarketplaceItemDeliveryERC1155OpenEdition';
  ownerWalletId: Scalars['UUID1'];
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
};

export type MarketplaceItemDeliveryErc1155OpenEditionInput = {
  ownerWalletId: Scalars['UUID1'];
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
};

export type MarketplaceItemDeliveryErc1155Transfer = {
  __typename?: 'MarketplaceItemDeliveryERC1155Transfer';
  ownerWalletId: Scalars['UUID1'];
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
};

export type MarketplaceItemDeliveryErc1155TransferInput = {
  ownerWalletId: Scalars['UUID1'];
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  amount: Scalars['Int'];
};

export type MarketplaceItemDeliveryErc721Provenance = {
  __typename?: 'MarketplaceItemDeliveryERC721Provenance';
  nftContractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
};

export type MarketplaceItemDeliveryErc721ProvenanceInput = {
  nftContractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
};

export type MarketplaceItemDeliveryErc721Transfer = {
  __typename?: 'MarketplaceItemDeliveryERC721Transfer';
  ownerWalletId: Scalars['UUID1'];
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
};

export type MarketplaceItemDeliveryErc721TransferInput = {
  ownerWalletId: Scalars['UUID1'];
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
};

export type MarketplaceItemDeliveryInput = {
  deliveryMethod: DeliveryMethod;
  ERC721Provenance?: Maybe<MarketplaceItemDeliveryErc721ProvenanceInput>;
  ERC721Transfer?: Maybe<MarketplaceItemDeliveryErc721TransferInput>;
  ERC1155Transfer?: Maybe<MarketplaceItemDeliveryErc1155TransferInput>;
  ERC1155OpenEdition?: Maybe<MarketplaceItemDeliveryErc1155OpenEditionInput>;
  NoOp?: Maybe<MarketplaceItemDeliveryNoOpInput>;
};

export type MarketplaceItemDeliveryNoOp = {
  __typename?: 'MarketplaceItemDeliveryNoOp';
  notes?: Maybe<Scalars['String']>;
};

export type MarketplaceItemDeliveryNoOpInput = {
  notes?: Maybe<Scalars['String']>;
};

export enum MarketplaceSaleType {
  Auction = 'Auction',
  BuyNow = 'BuyNow',
  Claimable = 'Claimable',
}

export type MarketplaceToken = {
  __typename?: 'MarketplaceToken';
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  marketplaceID: Scalars['UUID'];
  onChainTokenID: Scalars['Int'];
  nftTokenID?: Maybe<Scalars['UUID']>;
  nftContractAddress: Scalars['String'];
  isTransferDisabled: Scalars['Boolean'];
};

export type MarketplaceUser = {
  __typename?: 'MarketplaceUser';
  id: Scalars['UUID'];
  avatar?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type MetadataAttributes = {
  __typename?: 'MetadataAttributes';
  traitType: Scalars['String'];
  value: AttributeValue;
  displayType?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  ping: Scalars['String'];
  uploadAsset: Scalars['String'];
  uploadAssets: Scalars['Int'];
  deleteAsset: Scalars['String'];
  uploadArweaveAsset: Scalars['String'];
  loginWithSignature: Organization;
  addOrganization: Organization;
  createApplicant: ApplicantResponse;
  createCheck: CheckResponse;
  updateApplicant: ApplicantResponse;
  addCollectionItemToUserFavorites: Scalars['Boolean'];
  deleteCollectionItemFromUserFavorites: Scalars['Boolean'];
  createMarketplaceCollection: MarketplaceCollection;
  updateMarketplaceCollection: MarketplaceCollection;
  createMarketplaceAuctionLot: MarketplaceAuctionLot;
  updateMarketplaceAuctionLot: MarketplaceAuctionLot;
  createMarketplaceAuctionBid: MarketplaceAuctionBid;
  createMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  updateMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  reserveMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  createMarketplaceClaimableSet: MarketplaceClaimableOutput;
  updateMarketplaceClaimableSet: MarketplaceClaimableOutput;
  cancelMarketplaceAuctionBid: Scalars['Boolean'];
  startInvoiceDelivery: Scalars['Boolean'];
  createTokenDraft: Scalars['String'];
  updateTokenDraft: Scalars['String'];
  deleteToken: Scalars['String'];
  nftDeployContract: NftContract;
  nftContractAddAdmin: Scalars['String'];
  nftContractSetTokenURI: Scalars['String'];
  mintTokens: Scalars['String'];
  uploadArweaveMetadata: Scalars['String'];
  setRoyaltiesExtension: Scalars['String'];
  burnToken: Scalars['String'];
  nftContractExtensionPause: Scalars['String'];
  nftContractExtensionUnpause: Scalars['String'];
  nftContractExtensionSetBaseURI: Scalars['String'];
  nftContractRegisterExtensionProvenance: NftContract;
  nftContractExtensionSetProvenanceHash: Scalars['String'];
  nftContractExtensionProvenanceMint: Scalars['String'];
  createOrgByUser: UserOrganization;
  orgCreateMarketplace: Marketplace;
  marketplaceUpdateTheme: Marketplace;
  addTokensToCollection: Scalars['String'];
  addExistingTokenToCollection: Scalars['String'];
  importExternalTokenToCollection: Scalars['String'];
  setJwtIssuerDomain: Organization;
  updateUserOrgRole: UserOrganization;
  updateUserOrgSettings: UserOrganization;
  sendUserInvitation: Scalars['Boolean'];
  deleteUserInvitation: Scalars['Boolean'];
  deleteOrgUser: Scalars['Boolean'];
  createPaymentMethod: PaymentMethodOutput;
  updatePaymentMethod: Scalars['Boolean'];
  deletePaymentMethod: Scalars['Boolean'];
  createAuctionLotInvoice: InvoiceDetails;
  releaseReservation: Scalars['Boolean'];
  createPayment: PaymentOutput;
  cancelPayment: Scalars['Boolean'];
  generatePromoCodes: Array<Maybe<Scalars['String']>>;
  redeemPromoCode: Scalars['Boolean'];
  redeemClaimable: Scalars['Boolean'];
  createUserAPIKey?: Maybe<UserApiKeyResponse>;
  deleteUserAPIKey: Scalars['Boolean'];
  updateMultisigName: Scalars['Boolean'];
  createOrgMultisig: Scalars['String'];
  deployWalletToNetwork: Scalars['String'];
  transferToken: Scalars['String'];
  verifySignature: Scalars['Boolean'];
  checkTokenOwners: Array<Maybe<Scalars['Int']>>;
};

export type MutationUploadAssetArgs = {
  orgId: Scalars['UUID1'];
  file: Scalars['Upload'];
  name: Scalars['String'];
};

export type MutationUploadAssetsArgs = {
  orgId: Scalars['UUID1'];
  files: Array<Maybe<Scalars['Upload']>>;
};

export type MutationDeleteAssetArgs = {
  assetId: Scalars['UUID1'];
};

export type MutationUploadArweaveAssetArgs = {
  assetVersionId: Scalars['UUID1'];
};

export type MutationLoginWithSignatureArgs = {
  request: SigninRequest;
};

export type MutationAddOrganizationArgs = {
  name: Scalars['String'];
  handle: Scalars['String'];
};

export type MutationCreateApplicantArgs = {
  orgID: Scalars['UUID1'];
  input: ApplicantRequest;
};

export type MutationCreateCheckArgs = {
  applicantID: Scalars['String'];
};

export type MutationUpdateApplicantArgs = {
  applicantID: Scalars['String'];
  input: ApplicantRequest;
};

export type MutationAddCollectionItemToUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};

export type MutationDeleteCollectionItemFromUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};

export type MutationCreateMarketplaceCollectionArgs = {
  marketplaceID: Scalars['String'];
  data: MarketplaceCollectionCreateInput;
};

export type MutationUpdateMarketplaceCollectionArgs = {
  id: Scalars['UUID1'];
  data: MarketplaceCollectionUpdateInput;
};

export type MutationCreateMarketplaceAuctionLotArgs = {
  marketplaceAuctionLot: MarketplaceAuctionLotInput;
};

export type MutationUpdateMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
  data: MarketplaceAuctionLotUpdateInput;
};

export type MutationCreateMarketplaceAuctionBidArgs = {
  marketplaceAuctionBid: MarketplaceAuctionBidInput;
};

export type MutationCreateMarketplaceBuyNowLotArgs = {
  input: CreateMarketplaceBuyNowLotInput;
};

export type MutationUpdateMarketplaceBuyNowLotArgs = {
  marketplaceBuyNowLotID: Scalars['UUID'];
  input: MarketplaceBuyNowUpdateInput;
};

export type MutationReserveMarketplaceBuyNowLotArgs = {
  input: ReserveMarketplaceBuyNowLotInput;
};

export type MutationCreateMarketplaceClaimableSetArgs = {
  input: CreateMarketplaceClaimableSetInput;
};

export type MutationUpdateMarketplaceClaimableSetArgs = {
  marketplaceClaimableSetID: Scalars['UUID'];
  input: UpdateMarketplaceClaimableSetInput;
};

export type MutationCancelMarketplaceAuctionBidArgs = {
  bidID: Scalars['UUID1'];
  marketplaceID: Scalars['UUID1'];
};

export type MutationStartInvoiceDeliveryArgs = {
  invoiceID: Scalars['UUID1'];
};

export type MutationCreateTokenDraftArgs = {
  tokens: Array<TokenDraft>;
  contractId: Scalars['UUID1'];
};

export type MutationUpdateTokenDraftArgs = {
  token: TokenDraft;
};

export type MutationDeleteTokenArgs = {
  tokenId: Scalars['UUID1'];
};

export type MutationNftDeployContractArgs = {
  input: DeployContractInput;
};

export type MutationNftContractAddAdminArgs = {
  nftContractId: Scalars['UUID1'];
  address: Scalars['String'];
};

export type MutationNftContractSetTokenUriArgs = {
  nftContractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
  uri: Scalars['String'];
};

export type MutationMintTokensArgs = {
  tokenIds: Array<Scalars['UUID1']>;
};

export type MutationUploadArweaveMetadataArgs = {
  tokenId: Scalars['UUID1'];
};

export type MutationSetRoyaltiesExtensionArgs = {
  nftContractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
  receivers: Array<Scalars['String']>;
  percentages: Array<Scalars['Int']>;
};

export type MutationBurnTokenArgs = {
  contractId: Scalars['UUID1'];
  walletId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
};

export type MutationNftContractExtensionPauseArgs = {
  nftContractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
};

export type MutationNftContractExtensionUnpauseArgs = {
  nftContractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
};

export type MutationNftContractExtensionSetBaseUriArgs = {
  nftContractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
  baseURI: Scalars['String'];
};

export type MutationNftContractRegisterExtensionProvenanceArgs = {
  contractId: Scalars['UUID1'];
  maxTokenSupply: Scalars['Int'];
};

export type MutationNftContractExtensionSetProvenanceHashArgs = {
  nftContractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
  provenanceHash: Scalars['String'];
};

export type MutationNftContractExtensionProvenanceMintArgs = {
  contractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
  voucherId: Scalars['UUID1'];
  mintToAddress: Scalars['String'];
  numberOfTokens: Scalars['Int'];
};

export type MutationCreateOrgByUserArgs = {
  name: Scalars['String'];
  handle: Scalars['String'];
};

export type MutationOrgCreateMarketplaceArgs = {
  name: Scalars['String'];
  orgId?: Maybe<Scalars['UUID1']>;
};

export type MutationMarketplaceUpdateThemeArgs = {
  id: Scalars['String'];
  theme: Scalars['String'];
};

export type MutationAddTokensToCollectionArgs = {
  tokenIds: Array<Scalars['UUID1']>;
  marketplaceId: Scalars['UUID1'];
};

export type MutationAddExistingTokenToCollectionArgs = {
  tokenId: Scalars['UUID1'];
  marketplaceId: Scalars['UUID1'];
};

export type MutationImportExternalTokenToCollectionArgs = {
  onChainId: Scalars['Int'];
  contractAddress: Scalars['String'];
  marketplaceId: Scalars['UUID1'];
};

export type MutationSetJwtIssuerDomainArgs = {
  orgId: Scalars['UUID'];
  domain: Scalars['String'];
};

export type MutationUpdateUserOrgRoleArgs = {
  userID: Scalars['UUID'];
  orgID: Scalars['UUID'];
  role: Scalars['String'];
};

export type MutationUpdateUserOrgSettingsArgs = {
  params: SettingsInput;
};

export type MutationSendUserInvitationArgs = {
  orgId: Scalars['UUID1'];
  email: Scalars['String'];
};

export type MutationDeleteUserInvitationArgs = {
  orgId: Scalars['UUID1'];
  email: Scalars['String'];
};

export type MutationDeleteOrgUserArgs = {
  userID: Scalars['UUID1'];
  organizationID: Scalars['UUID1'];
};

export type MutationCreatePaymentMethodArgs = {
  orgID: Scalars['UUID1'];
  input: PaymentMethodCreateInput;
};

export type MutationUpdatePaymentMethodArgs = {
  paymentMethodID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
  input: PaymentMethodUpdateInput;
};

export type MutationDeletePaymentMethodArgs = {
  paymentMethodID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
};

export type MutationCreateAuctionLotInvoiceArgs = {
  orgID: Scalars['UUID1'];
  lotID: Scalars['UUID1'];
};

export type MutationReleaseReservationArgs = {
  invoiceID: Scalars['UUID1'];
  orgID?: Maybe<Scalars['UUID1']>;
};

export type MutationCreatePaymentArgs = {
  invoiceID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
  metadata?: Maybe<CreatePaymentMetadataInput>;
};

export type MutationCancelPaymentArgs = {
  paymentID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
};

export type MutationGeneratePromoCodesArgs = {
  marketplaceCollectionItemId: Scalars['UUID1'];
  num: Scalars['Int'];
};

export type MutationRedeemPromoCodeArgs = {
  code: Scalars['String'];
  destAddr?: Maybe<Scalars['String']>;
};

export type MutationRedeemClaimableArgs = {
  claimableId: Scalars['String'];
  destAddr?: Maybe<Scalars['String']>;
};

export type MutationCreateUserApiKeyArgs = {
  orgId: Scalars['UUID1'];
};

export type MutationDeleteUserApiKeyArgs = {
  keyId: Scalars['UUID1'];
};

export type MutationUpdateMultisigNameArgs = {
  walletID: Scalars['UUID1'];
  newName: Scalars['String'];
};

export type MutationCreateOrgMultisigArgs = {
  orgId: Scalars['UUID1'];
  chainId: Scalars['Int'];
  name: Scalars['String'];
};

export type MutationDeployWalletToNetworkArgs = {
  walletId: Scalars['UUID1'];
  networkId: Scalars['UUID1'];
};

export type MutationTransferTokenArgs = {
  walletId: Scalars['UUID1'];
  contractAddress: Scalars['String'];
  tokenType: TokenType;
  tokenOnChainId: Scalars['Int'];
  amount?: Maybe<Scalars['Int']>;
  transferTo: Scalars['String'];
};

export type MutationVerifySignatureArgs = {
  signature: Scalars['String'];
  message: Scalars['String'];
  address: Scalars['String'];
};

export type MutationCheckTokenOwnersArgs = {
  contractId: Scalars['UUID1'];
  walletAddress: Scalars['String'];
  rangeStart: Scalars['Int'];
  rangeEnd: Scalars['Int'];
};

export type Network = {
  __typename?: 'Network';
  id: Scalars['UUID1'];
  name: Scalars['String'];
  chainID: Scalars['Int'];
  rpcURL: Scalars['String'];
  openSeaProxyAddress: Scalars['String'];
  wethAddress: Scalars['String'];
  safeMasterContractAddress: Scalars['String'];
  safeFactoryAddress: Scalars['String'];
  safeFallbackHandler: Scalars['String'];
};

export type NftContract = {
  __typename?: 'NFTContract';
  id: Scalars['UUID1'];
  nftContractType: NftContractType;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  wallet: Wallet;
  contractAddress: Scalars['EthAddress'];
  marketplaceAddress: Scalars['EthAddress'];
  activationTxHash: Scalars['String'];
  deploymentTxHash?: Maybe<Scalars['String']>;
  mediaTxHash?: Maybe<Scalars['String']>;
  arweavePathManifest?: Maybe<Scalars['String']>;
  nftTokens?: Maybe<Array<NftToken>>;
  transferOwnershipHash?: Maybe<Scalars['String']>;
  admins: Array<Scalars['String']>;
};

export type NftContractType = {
  __typename?: 'NFTContractType';
  id: Scalars['UUID1'];
  name: Scalars['String'];
};

export type NftMetadata = {
  __typename?: 'NFTMetadata';
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
};

export type NftToken = {
  __typename?: 'NFTToken';
  id: Scalars['UUID1'];
  name?: Maybe<Scalars['String']>;
  metadataArweaveTxId?: Maybe<Scalars['String']>;
  metadataArweaveTxLink?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['Int']>;
  ethereumTxId?: Maybe<Scalars['String']>;
  editions?: Maybe<Scalars['Int']>;
  deployed: Scalars['Boolean'];
  royaltyBasisPoints?: Maybe<Scalars['Int']>;
  assetId?: Maybe<Scalars['UUID1']>;
  asset?: Maybe<Asset>;
  metadataJSON?: Maybe<Scalars['String']>;
  nftContractID: Scalars['UUID1'];
  nftContract: NftContract;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['UUID1'];
  handle: Scalars['String'];
  name: Scalars['String'];
  jwtIssuerDomain?: Maybe<Scalars['String']>;
  members: Array<OrganizationMember>;
  marketplaces: Array<Marketplace>;
  assets?: Maybe<Array<Asset>>;
  wallets?: Maybe<Array<Wallet>>;
  nftContracts?: Maybe<Array<NftContract>>;
};

export type OrganizationMembersArgs = {
  filter?: Maybe<OrganizationMemberFilter>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type OrganizationAssetsArgs = {
  filter?: Maybe<AssetFilter>;
};

export type OrganizationMember = {
  __typename?: 'OrganizationMember';
  id: Scalars['UUID1'];
  userId: Scalars['UUID1'];
  organizationId: Scalars['UUID1'];
  username?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
  role?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type OrganizationMemberFilter = {
  externalUserId?: Maybe<Scalars['String']>;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['UUID1'];
  userID: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
  circlePaymentID: Scalars['String'];
  paymentMethodID: Scalars['UUID1'];
  status: PaymentStatus;
};

export type PaymentDetails = CryptoPaymentDetails;

export type PaymentMethodCreateInput = {
  paymentType: PaymentType;
  achData?: Maybe<AchData>;
  wireData?: Maybe<WireData>;
  creditCardData?: Maybe<CreditCardData>;
};

export type PaymentMethodOutput =
  | CreditCardPaymentMethodOutput
  | AchPaymentMethodOutput
  | WirePaymentMethodOutput
  | CryptoPaymentMethodOutput;

export type PaymentMethodPrepareStatementOutput = AchPaymentMethodPrepareStatementOutput;

export type PaymentMethodUpdateInput = {
  paymentType: PaymentType;
  achData?: Maybe<AchData>;
  creditCardData?: Maybe<CreditCardData>;
};

export type PaymentNotification3DsMessage = {
  __typename?: 'PaymentNotification3DSMessage';
  error?: Maybe<Scalars['String']>;
  redirectURL?: Maybe<Scalars['String']>;
};

export type PaymentNotificationMessage = PaymentNotification3DsMessage;

export type PaymentNotificationOutput = {
  __typename?: 'PaymentNotificationOutput';
  message: PaymentNotificationMessage;
};

export type PaymentOutput = {
  __typename?: 'PaymentOutput';
  id: Scalars['UUID1'];
  userID: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
  processorPaymentID: Scalars['String'];
  paymentMethodID: Scalars['UUID1'];
  status: PaymentStatus;
  details?: Maybe<PaymentDetails>;
};

export type PaymentPublicKey = {
  __typename?: 'PaymentPublicKey';
  keyID: Scalars['String'];
  publicKey: Scalars['String'];
};

export enum PaymentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Paid = 'paid',
  Failed = 'failed',
  ActionRequired = 'action_required',
}

export enum PaymentType {
  Ach = 'ACH',
  Wire = 'Wire',
  CreditCard = 'CreditCard',
  Crypto = 'Crypto',
}

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String'];
  serverTime: Scalars['Time'];
  me?: Maybe<CurrentUser>;
  mailSalesReportByCollectionID: Scalars['Boolean'];
  mailInvoiceLotDetailReportMailByCollectionID: Scalars['Boolean'];
  validateIp: ValidateIpResponse;
  getApplicant: ApplicantResponse;
  getSDKToken: SdkTokenResponse;
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  collection?: Maybe<MarketplaceCollection>;
  collectionBySlug?: Maybe<MarketplaceCollection>;
  getBuyNowBuyerInfo?: Maybe<Array<BuyerDetailOutput>>;
  collectionItemById?: Maybe<MarketplaceCollectionItem>;
  nftContract: NftContract;
  nftToken: NftToken;
  organization: Organization;
  organizationByID: Organization;
  orgUsernameAvailable: Scalars['Boolean'];
  marketplace: Marketplace;
  internalUsers: Array<UserOrganization>;
  preparePaymentMethod?: Maybe<PaymentMethodPrepareStatementOutput>;
  getPaymentMethod: PaymentMethodOutput;
  getPaymentPublicKey: PaymentPublicKey;
  getPaymentMethodList: Array<PaymentMethodOutput>;
  getMyInvoices: Array<Maybe<InvoiceDetails>>;
  getInvoicesByUserID: Array<Maybe<InvoiceDetails>>;
  getInvoiceDetails: InvoiceDetails;
  getMyPayments: Array<Maybe<Payment>>;
  getPaymentsByUserID: Array<Maybe<Payment>>;
  getPaymentNotification: PaymentNotificationOutput;
  validatePaymentLimit: ValidatePaymentLimitOutput;
  getTaxQuote: TaxQuoteOutput;
  getAvailableClaimables: Scalars['Int'];
  canRedeemClaimable: Scalars['Boolean'];
  getUserByWalletAddress?: Maybe<User>;
  wallet: Wallet;
  network: Network;
};

export type QueryMailSalesReportByCollectionIdArgs = {
  collectionID: Scalars['UUID1'];
  toEmail: Scalars['String'];
  orgID: Scalars['UUID1'];
};

export type QueryMailInvoiceLotDetailReportMailByCollectionIdArgs = {
  collectionID: Scalars['UUID1'];
  toEmail: Scalars['String'];
};

export type QueryValidateIpArgs = {
  ip: Scalars['String'];
  organizationID: Scalars['UUID1'];
};

export type QueryGetApplicantArgs = {
  organizationID: Scalars['UUID1'];
};

export type QueryGetSdkTokenArgs = {
  applicantID: Scalars['String'];
  referrer: Scalars['String'];
};

export type QueryGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};

export type QueryCollectionArgs = {
  id: Scalars['String'];
};

export type QueryCollectionBySlugArgs = {
  marketplaceID: Scalars['UUID1'];
  slug: Scalars['String'];
};

export type QueryGetBuyNowBuyerInfoArgs = {
  itemId: Scalars['UUID1'];
};

export type QueryCollectionItemByIdArgs = {
  id: Scalars['UUID1'];
};

export type QueryNftContractArgs = {
  id: Scalars['UUID1'];
};

export type QueryNftTokenArgs = {
  id: Scalars['UUID1'];
};

export type QueryOrganizationArgs = {
  handle: Scalars['String'];
};

export type QueryOrganizationByIdArgs = {
  id?: Maybe<Scalars['UUID1']>;
};

export type QueryOrgUsernameAvailableArgs = {
  organizationID: Scalars['UUID1'];
  username: Scalars['String'];
};

export type QueryMarketplaceArgs = {
  id: Scalars['UUID'];
};

export type QueryInternalUsersArgs = {
  organizationID: Scalars['UUID1'];
};

export type QueryPreparePaymentMethodArgs = {
  orgID?: Maybe<Scalars['UUID1']>;
  paymentMethodType: PaymentType;
};

export type QueryGetPaymentMethodArgs = {
  paymentMethodID: Scalars['UUID1'];
};

export type QueryGetPaymentPublicKeyArgs = {
  orgID: Scalars['UUID1'];
};

export type QueryGetPaymentMethodListArgs = {
  orgID?: Maybe<Scalars['UUID1']>;
};

export type QueryGetInvoicesByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};

export type QueryGetInvoiceDetailsArgs = {
  invoiceID: Scalars['UUID1'];
};

export type QueryGetPaymentsByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};

export type QueryValidatePaymentLimitArgs = {
  collectionID: Scalars['UUID1'];
  itemsCount: Scalars['Int'];
};

export type QueryGetTaxQuoteArgs = {
  input: TaxQuoteInput;
};

export type QueryGetAvailableClaimablesArgs = {
  claimableId: Scalars['String'];
};

export type QueryCanRedeemClaimableArgs = {
  claimableID: Scalars['String'];
};

export type QueryGetUserByWalletAddressArgs = {
  address: Scalars['String'];
  orgId: Scalars['UUID1'];
};

export type QueryWalletArgs = {
  id: Scalars['UUID1'];
};

export type QueryNetworkArgs = {
  id: Scalars['UUID1'];
};

export type ReserveMarketplaceBuyNowLotInput = {
  marketplaceBuyNowLotID: Scalars['UUID1'];
  itemCount: Scalars['Int'];
};

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type SdkTokenResponse = {
  __typename?: 'SDKTokenResponse';
  token: Scalars['String'];
};

export type SettingsInput = {
  userOrgId: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  settingsJson?: Maybe<Scalars['String']>;
};

export type SigninRequest = {
  challenge: Scalars['String'];
  signature: Scalars['String'];
  signer: Scalars['String'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  token: Scalars['String'];
  refreshToken: Scalars['String'];
  me: CurrentUser;
};

export type Subscription = {
  __typename?: 'Subscription';
  auctionLotUpdated: MarketplaceAuctionLot;
  bidFeed: MarketplaceAuctionBid;
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  marketplaceCollectionLotsUpdates: MarketplaceAuctionLot;
};

export type SubscriptionAuctionLotUpdatedArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};

export type SubscriptionBidFeedArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};

export type SubscriptionGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID1'];
};

export type SubscriptionMarketplaceCollectionLotsUpdatesArgs = {
  collectionId: Scalars['UUID1'];
};

export enum TaxProvider {
  Vertex = 'Vertex',
  TaxJar = 'TaxJar',
}

export type TaxQuoteBillingAddressInput = {
  street1: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
};

export type TaxQuoteBillingAddressOutput = {
  __typename?: 'TaxQuoteBillingAddressOutput';
  street1: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
};

export type TaxQuoteInput = {
  address: TaxQuoteBillingAddressInput;
  orgID: Scalars['UUID1'];
  taxablePrice: Scalars['Float'];
};

export type TaxQuoteOutput = {
  __typename?: 'TaxQuoteOutput';
  verifiedAddress: TaxQuoteBillingAddressOutput;
  taxablePrice: Scalars['Float'];
  totalTaxAmount: Scalars['Float'];
  totalTaxedPrice: Scalars['Float'];
};

export type TokenDraft = {
  tokenId?: Maybe<Scalars['UUID1']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['UUID1']>;
  royaltyBasisPoints?: Maybe<Scalars['Int']>;
  copyright?: Maybe<Scalars['String']>;
  metadataJSON?: Maybe<Scalars['String']>;
  editions?: Maybe<Scalars['Int']>;
  invoiceItemId?: Maybe<Scalars['UUID1']>;
};

export enum TokenType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}

export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}

export enum TransactionType {
  DeployMultisig = 'DeployMultisig',
  TransferToken = 'TransferToken',
}

export type UpdateMarketplaceClaimableSetInput = {
  totalUnits?: Maybe<Scalars['Int']>;
  totalAvailableUnits?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['Time']>;
  endDate?: Maybe<Scalars['Time']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['UUID'];
  username: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type UserApiKeyResponse = {
  __typename?: 'UserAPIKeyResponse';
  id?: Maybe<Scalars['UUID1']>;
  key?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Time']>;
  createdAt?: Maybe<Scalars['Time']>;
};

export type UserOrganization = {
  __typename?: 'UserOrganization';
  id: Scalars['UUID'];
  userId: Scalars['UUID'];
  user: User;
  externalUserId: Scalars['String'];
  organizationId: Scalars['UUID'];
  organization: Organization;
  kycStatus: KycStatus;
  role: Scalars['String'];
  bidAllowed: Scalars['Boolean'];
  username?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
};

export type UserOrgFilter = {
  orgId?: Maybe<Scalars['UUID']>;
};

export type ValidateIpResponse = {
  __typename?: 'ValidateIPResponse';
  ipScreeningId: Scalars['UUID1'];
  Success: Scalars['Boolean'];
};

export type ValidatePaymentLimitData = {
  __typename?: 'ValidatePaymentLimitData';
  remainingTotal: Scalars['Int'];
  isLimitExceeded: Scalars['Boolean'];
  remainingTransaction: Scalars['Int'];
};

export type ValidatePaymentLimitOutput = {
  __typename?: 'ValidatePaymentLimitOutput';
  ach: ValidatePaymentLimitData;
  wire: ValidatePaymentLimitData;
  creditCard: ValidatePaymentLimitData;
};

export type Wallet = {
  __typename?: 'Wallet';
  id: Scalars['UUID1'];
  name: Scalars['String'];
  address?: Maybe<Scalars['EthAddress']>;
  parentType: Scalars['String'];
  parentID: Scalars['UUID1'];
  network: Network;
  networkId: Scalars['UUID1'];
  deploymentTxHash?: Maybe<Scalars['String']>;
  gnosisSafeURL?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<WalletToken>>;
};

export enum WalletParentType {
  Organization = 'organization',
  User = 'user',
}

export type WalletToken = {
  __typename?: 'WalletToken';
  contractAddress: Scalars['String'];
  id: Scalars['Int'];
  tokenType?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
  metadata?: Maybe<Erc721Metadata>;
  timeLastUpdated?: Maybe<Scalars['String']>;
};

export enum WalletTxType {
  Multisig = 'Multisig',
  MojitoHotWallet = 'MojitoHotWallet',
}

export type WireBankAddress = {
  bankName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
};

export type WireBankAddressOutput = {
  __typename?: 'WireBankAddressOutput';
  bankName: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  city: Scalars['String'];
};

export type WireBeneficiary = {
  __typename?: 'WireBeneficiary';
  name: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
};

export type WireBeneficiaryBank = {
  __typename?: 'WireBeneficiaryBank';
  name: Scalars['String'];
  swiftCode: Scalars['String'];
  routingNumber: Scalars['String'];
  accountNumber: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
};

export type WireBillingDetails = {
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
};

export type WireBillingDetailsOutput = {
  __typename?: 'WireBillingDetailsOutput';
  name: Scalars['String'];
  address1: Scalars['String'];
  address2: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  city: Scalars['String'];
  postalCode: Scalars['String'];
};

export type WireData = {
  accountNumber: Scalars['String'];
  routingNumber: Scalars['String'];
  bankAddress: WireBankAddress;
  billingDetails: WireBillingDetails;
};

export type WireInstructions = {
  __typename?: 'WireInstructions';
  trackingRef: Scalars['String'];
  beneficiary: WireBeneficiary;
  beneficiaryBank: WireBeneficiaryBank;
};

export type WirePaymentMethodOutput = {
  __typename?: 'WirePaymentMethodOutput';
  id: Scalars['UUID1'];
  type: PaymentType;
  status: Scalars['String'];
  description: Scalars['String'];
  instructions?: Maybe<WireInstructions>;
  bankAddress?: Maybe<WireBankAddressOutput>;
  billingDetails?: Maybe<WireBillingDetailsOutput>;
};
