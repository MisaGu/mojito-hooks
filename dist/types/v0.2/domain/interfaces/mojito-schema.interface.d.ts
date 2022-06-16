export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<
  T extends {
    [key: string]: unknown;
  },
> = {
  [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  EthAddress: any;
  Time: any;
  UUID: any;
  UUID1: any;
  Upload: any;
};
export declare type AchBankAddressOutput = {
  __typename?: 'ACHBankAddressOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
};
export declare type AchBillingDetails = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode?: InputMaybe<Scalars['String']>;
};
export declare type AchBillingDetailsOutput = {
  __typename?: 'ACHBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};
export declare type AchData = {
  accountId: Scalars['String'];
  billingDetails: AchBillingDetails;
  metadata: AchMetadata;
  publicToken: Scalars['String'];
};
export declare type AchMetadata = {
  email: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};
export declare type AchMetadataOutput = {
  __typename?: 'ACHMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};
export declare type AchPaymentMethodOutput = {
  __typename?: 'ACHPaymentMethodOutput';
  accountNumber: Scalars['String'];
  bankAddress?: Maybe<AchBankAddressOutput>;
  billingDetails?: Maybe<AchBillingDetailsOutput>;
  id: Scalars['UUID1'];
  metadata?: Maybe<AchMetadataOutput>;
  status: Scalars['String'];
  type: PaymentType;
};
export declare type AchPaymentMethodPrepareStatementOutput = {
  __typename?: 'ACHPaymentMethodPrepareStatementOutput';
  linkToken: Scalars['String'];
};
export declare type Address = {
  __typename?: 'Address';
  buildingName?: Maybe<Scalars['String']>;
  buildingNumber?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  flatNumber?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  line3?: Maybe<Scalars['String']>;
  postcode: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  subStreet?: Maybe<Scalars['String']>;
  town?: Maybe<Scalars['String']>;
};
export declare type AddressInput = {
  buildingName?: InputMaybe<Scalars['String']>;
  buildingNumber: Scalars['String'];
  country: Scalars['String'];
  flatNumber?: InputMaybe<Scalars['String']>;
  line1?: InputMaybe<Scalars['String']>;
  line2?: InputMaybe<Scalars['String']>;
  line3?: InputMaybe<Scalars['String']>;
  postcode: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
  street: Scalars['String'];
  subStreet?: InputMaybe<Scalars['String']>;
  town: Scalars['String'];
};
export declare type AddressScreeningInput = {
  address: Scalars['String'];
  asset: Scalars['String'];
  network: Scalars['String'];
};
export declare type AllowList = {
  __typename?: 'AllowList';
  elements: Array<AllowListElement>;
  endTime: Scalars['Time'];
  filteringType: FilteringType;
  id: Scalars['UUID1'];
  identifierType: IdentifierType;
  startTime: Scalars['Time'];
};
export declare type AllowListElement = {
  __typename?: 'AllowListElement';
  id: Scalars['UUID1'];
  identifierValue: Scalars['String'];
};
export declare type AllowListInput = {
  elements: Array<Scalars['String']>;
  endTime: Scalars['Time'];
  filteringType: FilteringType;
  identifierType: IdentifierType;
  startTime: Scalars['Time'];
};
export declare type ApplicantRequest = {
  address?: InputMaybe<AddressInput>;
  dob?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  idNumbers?: InputMaybe<Array<InputMaybe<IdNumberInput>>>;
  lastName: Scalars['String'];
};
export declare type ApplicantResponse = {
  __typename?: 'ApplicantResponse';
  address?: Maybe<Address>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  href?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  idNumbers?: Maybe<Array<Maybe<IdNumber>>>;
  lastName: Scalars['String'];
};
export declare type Asset = {
  __typename?: 'Asset';
  currentVersion?: Maybe<AssetVersion>;
  id: Scalars['UUID1'];
  versions?: Maybe<Array<AssetVersion>>;
};
export declare type AssetFilter = {
  organizationID?: InputMaybe<Scalars['UUID1']>;
};
export declare type AssetVersion = {
  __typename?: 'AssetVersion';
  arweaveTx?: Maybe<Scalars['String']>;
  asset: Asset;
  assetID: Scalars['UUID1'];
  cdnUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  isCurrent: Scalars['Boolean'];
  name: Scalars['String'];
  slug: Scalars['String'];
};
export declare type AttributeValue = AttributeValueFloat | AttributeValueInt | AttributeValueString;
export declare type AttributeValueFloat = {
  __typename?: 'AttributeValueFloat';
  floatValue: Scalars['Float'];
};
export declare type AttributeValueInt = {
  __typename?: 'AttributeValueInt';
  intValue: Scalars['Int'];
};
export declare type AttributeValueString = {
  __typename?: 'AttributeValueString';
  stringValue: Scalars['String'];
};
export declare enum AuctionBidOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}
export declare enum AuctionLotStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview',
}
export declare type BidFilterInput = {
  marketplaceAuctionLotId?: InputMaybe<Scalars['UUID']>;
  order?: InputMaybe<AuctionBidOrder>;
  returnDeleted?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['UUID']>;
};
export declare type BuyerDetailOutput = {
  __typename?: 'BuyerDetailOutput';
  externalUserID: Scalars['String'];
  timestamp: Scalars['Time'];
  totalPrice: Scalars['Float'];
  units: Scalars['Int'];
  user?: Maybe<User>;
  userId: Scalars['UUID1'];
  username?: Maybe<Scalars['String']>;
};
export declare type CheckResponse = {
  __typename?: 'CheckResponse';
  id: Scalars['String'];
  success: Scalars['Boolean'];
};
export declare enum CollectionType {
  Auction = 'Auction',
  Tk2 = 'TK2',
}
export declare enum ContractType {
  Erc721Creator = 'ERC721Creator',
  Erc1155Creator = 'ERC1155Creator',
}
export declare type CreateMarketplaceBuyNowLotInput = {
  collectionId: Scalars['UUID1'];
  collectionItemName: Scalars['String'];
  delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
  endDate: Scalars['Time'];
  marketplaceTokenId?: InputMaybe<Scalars['UUID1']>;
  sortNumber: Scalars['Int'];
  startDate: Scalars['Time'];
  totalUnits?: InputMaybe<Scalars['Int']>;
  unitPrice: Scalars['Float'];
};
export declare type CreateMarketplaceClaimableSetInput = {
  collectionId: Scalars['UUID1'];
  collectionItemName: Scalars['String'];
  delivery: MarketplaceItemDeliveryInput;
  endDate: Scalars['Time'];
  perWalletLimit: Scalars['Int'];
  promoCodeConfig?: InputMaybe<MarketplaceItemCodeConfigInput>;
  startDate: Scalars['Time'];
  totalUnits: Scalars['Int'];
};
export declare type CreatePaymentCreditCardMetadataInput = {
  encryptedData: Scalars['String'];
  keyID: Scalars['String'];
};
export declare type CreatePaymentCryptoMetadataInput = {
  billingDetails?: InputMaybe<CryptoBillingDetails>;
  cancelURL?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  localPrice?: InputMaybe<LocalPrice>;
  name?: InputMaybe<Scalars['String']>;
  redirectURL?: InputMaybe<Scalars['String']>;
};
export declare type CreatePaymentMetadataInput = {
  creditCardData?: InputMaybe<CreatePaymentCreditCardMetadataInput>;
  cryptoData?: InputMaybe<CreatePaymentCryptoMetadataInput>;
  destinationAddress?: InputMaybe<Scalars['EthAddress']>;
  discountCodeID?: InputMaybe<Scalars['UUID1']>;
};
export declare type CreditCardBillingDetails = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['String'];
};
export declare type CreditCardBillingDetailsOutput = {
  __typename?: 'CreditCardBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};
export declare type CreditCardData = {
  billingDetails?: InputMaybe<CreditCardBillingDetails>;
  encryptedData: Scalars['String'];
  expirationMonth: Scalars['Int'];
  expirationYear: Scalars['Int'];
  keyID: Scalars['String'];
  metadata?: InputMaybe<CreditCardMetadata>;
};
export declare type CreditCardMetadata = {
  email: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};
export declare type CreditCardMetadataOutput = {
  __typename?: 'CreditCardMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};
export declare type CreditCardPaymentMethodOutput = {
  __typename?: 'CreditCardPaymentMethodOutput';
  billingDetails?: Maybe<CreditCardBillingDetailsOutput>;
  id: Scalars['UUID1'];
  last4Digit: Scalars['String'];
  metadata?: Maybe<CreditCardMetadataOutput>;
  network: Scalars['String'];
  status: Scalars['String'];
  type: PaymentType;
};
export declare type CryptoBillingDetails = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
};
export declare type CryptoPaymentDetails = {
  __typename?: 'CryptoPaymentDetails';
  hostedURL: Scalars['String'];
};
export declare type CryptoPaymentMethodOutput = {
  __typename?: 'CryptoPaymentMethodOutput';
  id: Scalars['UUID1'];
  status: Scalars['String'];
  type: PaymentType;
};
export declare type CurrentUser = {
  __typename?: 'CurrentUser';
  activeBids: Array<MarketplaceAuctionBid>;
  apiKeys?: Maybe<Array<Maybe<UserApiKeyResponse>>>;
  favoriteItems?: Maybe<Array<MarketplaceCollectionItem>>;
  id: Scalars['UUID'];
  user: User;
  userOrgs: Array<UserOrganization>;
  wallets?: Maybe<Array<Wallet>>;
  wonBids: Array<MarketplaceAuctionBid>;
};
export declare type CurrentUserActiveBidsArgs = {
  orgId: Scalars['UUID'];
};
export declare type CurrentUserUserOrgsArgs = {
  filter?: InputMaybe<UserOrgFilter>;
};
export declare type CurrentUserWonBidsArgs = {
  orgId?: InputMaybe<Scalars['UUID']>;
};
export declare enum DeliveryMethod {
  Erc721Provenance = 'ERC721Provenance',
  Erc721Transfer = 'ERC721Transfer',
  Erc721TransferByRange = 'ERC721TransferByRange',
  Erc1155OpenEdition = 'ERC1155OpenEdition',
  Erc1155Transfer = 'ERC1155Transfer',
  NoOp = 'NoOp',
}
export declare type DeployContractInput = {
  contractType: ContractType;
  nftName: Scalars['String'];
  nftSymbol: Scalars['String'];
  organizationId: Scalars['UUID1'];
  walletId: Scalars['UUID1'];
};
export declare type DiscountCode = {
  __typename?: 'DiscountCode';
  description?: Maybe<Scalars['String']>;
  discountCode: Scalars['String'];
  discountType: Scalars['String'];
  id: Scalars['UUID1'];
  organizationID: Scalars['UUID1'];
  value: Scalars['Float'];
};
export declare type DiscountedInvoiceItem = {
  __typename?: 'DiscountedInvoiceItem';
  discountCode: DiscountCode;
  discountedAmount: Scalars['Float'];
  invoiceItemID: Scalars['UUID1'];
  totalPrice: Scalars['Float'];
  totalPriceAfterDiscount: Scalars['Float'];
};
export declare type Erc721Metadata = {
  __typename?: 'ERC721Metadata';
  animationURL?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<MetadataAttributes>>;
  backgroundColor?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  externalURL?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  timestamp?: Maybe<Scalars['Int']>;
};
export declare enum ExtensionType {
  ProvenanceExtension = 'ProvenanceExtension',
  RedeemableExtension = 'RedeemableExtension',
}
export declare enum FilteringType {
  AllowList = 'AllowList',
}
export declare type IdNumber = {
  __typename?: 'IDNumber';
  stateCode: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};
export declare type IdNumberInput = {
  stateCode: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};
export declare enum IdentifierType {
  ExternalUserId = 'ExternalUserID',
  UserId = 'UserID',
}
export declare type InvoiceDetails = {
  __typename?: 'InvoiceDetails';
  OrganizationID: Scalars['UUID1'];
  billingAddress?: Maybe<InvoiceDetailsBillingAddress>;
  externalPaymentID: Scalars['String'];
  externalUserID: Scalars['String'];
  internalUserID: Scalars['String'];
  invoiceCreatedAt: Scalars['Time'];
  invoiceID: Scalars['UUID1'];
  invoiceNumber: Scalars['Int'];
  items: Array<Maybe<ItemInvoiceDetail>>;
  paymentID: Scalars['UUID1'];
  status: InvoiceStatus;
  userName: Scalars['String'];
};
export declare type InvoiceDetailsBillingAddress = {
  __typename?: 'InvoiceDetailsBillingAddress';
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};
export declare enum InvoiceStatus {
  AwaitingUserPayment = 'AwaitingUserPayment',
  Canceled = 'Canceled',
  Delivered = 'Delivered',
  Draft = 'Draft',
  Expired = 'Expired',
  Failed = 'Failed',
  Paid = 'Paid',
  Pending = 'Pending',
}
export declare type ItemInvoiceDetail = {
  __typename?: 'ItemInvoiceDetail';
  buyersPremium: Scalars['Float'];
  collectionItemID: Scalars['UUID1'];
  collectionItemTitle: Scalars['String'];
  collectionTitle: Scalars['String'];
  destinationAddress: Scalars['String'];
  invoiceItemID: Scalars['UUID1'];
  overheadPremium: Scalars['Float'];
  saleDate: Scalars['Time'];
  salesTaxRate: Scalars['Float'];
  taxes: Scalars['Float'];
  totalPrice: Scalars['Float'];
  unitPrice: Scalars['Float'];
  units: Scalars['Int'];
};
export declare enum KycStatus {
  Clear = 'Clear',
  Failed1 = 'Failed1',
  Failed2 = 'Failed2',
  Level1 = 'Level1',
  Level2 = 'Level2',
  None = 'None',
  Pending = 'Pending',
}
export declare type LocalPrice = {
  amount: Scalars['Float'];
  currency: Scalars['String'];
};
export declare enum MarketCollectionStatus {
  Active = 'Active',
  Archived = 'Archived',
  Inactive = 'Inactive',
}
export declare type Marketplace = {
  __typename?: 'Marketplace';
  collections?: Maybe<Array<MarketplaceCollection>>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  organizationID: Scalars['String'];
  theme?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<MarketplaceToken>>;
};
export declare type MarketplaceAuctionBid = {
  __typename?: 'MarketplaceAuctionBid';
  amount: Scalars['Float'];
  buyersPremium: Scalars['Float'];
  createdAt: Scalars['Time'];
  currentBid: Scalars['Float'];
  deletedAt?: Maybe<Scalars['Time']>;
  finalPrice: Scalars['Float'];
  id: Scalars['UUID'];
  isCurrent: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  marketplaceAuctionLot: MarketplaceAuctionLot;
  marketplaceAuctionLotId: Scalars['UUID1'];
  marketplaceUser?: Maybe<MarketplaceUser>;
  maximumBid?: Maybe<Scalars['Float']>;
  nextBidIncrement: Scalars['Float'];
  overheadPremium: Scalars['Float'];
  userId: Scalars['UUID'];
  userOrganization: UserOrganization;
};
export declare type MarketplaceAuctionBidInput = {
  amount: Scalars['Float'];
  marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type MarketplaceAuctionDefaultConfig = {
  __typename?: 'MarketplaceAuctionDefaultConfig';
  collectionId: Scalars['UUID'];
  endDate: Scalars['Time'];
  id: Scalars['UUID'];
  minIncrement: Scalars['Float'];
  reservePrice?: Maybe<Scalars['Float']>;
  startDate: Scalars['Time'];
};
export declare type MarketplaceAuctionFeeStructure = {
  __typename?: 'MarketplaceAuctionFeeStructure';
  buyersPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
  overheadPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
};
export declare type MarketplaceAuctionFeeStructureItem = {
  __typename?: 'MarketplaceAuctionFeeStructureItem';
  from: Scalars['Float'];
  rate: Scalars['Float'];
  to?: Maybe<Scalars['Float']>;
};
export declare type MarketplaceAuctionLot = {
  __typename?: 'MarketplaceAuctionLot';
  bids: Array<MarketplaceAuctionBid>;
  currentBid?: Maybe<MarketplaceAuctionBid>;
  defaultConfig: MarketplaceAuctionDefaultConfig;
  endDate: Scalars['Time'];
  feeStructure: MarketplaceAuctionFeeStructure;
  id: Scalars['UUID'];
  lotNumber?: Maybe<Scalars['Int']>;
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  marketplaceCollectionItemId: Scalars['UUID1'];
  myBid?: Maybe<MarketplaceAuctionBid>;
  previewDate?: Maybe<Scalars['Time']>;
  reserveMet: Scalars['Boolean'];
  reservePrice?: Maybe<Scalars['Float']>;
  startDate: Scalars['Time'];
  startingBid?: Maybe<Scalars['Float']>;
  status: AuctionLotStatus;
};
export declare type MarketplaceAuctionLotBidsArgs = {
  filter?: InputMaybe<BidFilterInput>;
};
export declare type MarketplaceAuctionLotDefaultConfigArgs = {
  collectionId: Scalars['UUID'];
};
export declare type MarketplaceAuctionLotInput = {
  collectionId: Scalars['UUID'];
  collectionItemName: Scalars['String'];
  delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
  endDate: Scalars['Time'];
  lotNumber?: InputMaybe<Scalars['Int']>;
  marketplaceTokenId?: InputMaybe<Scalars['UUID']>;
  reservePrice?: InputMaybe<Scalars['Float']>;
  saleType: MarketplaceSaleType;
  startDate: Scalars['Time'];
  startingBid?: InputMaybe<Scalars['Float']>;
};
export declare type MarketplaceAuctionLotUpdateInput = {
  delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
  endDate?: InputMaybe<Scalars['Time']>;
  lotNumber?: InputMaybe<Scalars['Int']>;
  maxEndDate?: InputMaybe<Scalars['Time']>;
  reservePrice?: InputMaybe<Scalars['Float']>;
  startDate?: InputMaybe<Scalars['Time']>;
  startingBid?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<AuctionLotStatus>;
};
export declare type MarketplaceBuyNowOutput = {
  __typename?: 'MarketplaceBuyNowOutput';
  endDate: Scalars['Time'];
  id: Scalars['UUID'];
  invoice?: Maybe<InvoiceDetails>;
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  purchaseTimeoutInMinutes?: Maybe<Scalars['Int']>;
  remainingCount: Scalars['Int'];
  sortNumber: Scalars['Int'];
  startDate: Scalars['Time'];
  totalAvailableUnits: Scalars['Int'];
  totalUnits: Scalars['Int'];
  unitPrice: Scalars['Float'];
};
export declare type MarketplaceBuyNowUpdateInput = {
  delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
  endDate?: InputMaybe<Scalars['Time']>;
  sortNumber?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['Time']>;
  totalUnits?: InputMaybe<Scalars['Int']>;
  unitPrice?: InputMaybe<Scalars['Float']>;
};
export declare type MarketplaceClaimableCodeOutput = {
  __typename?: 'MarketplaceClaimableCodeOutput';
  claimableSetID: Scalars['UUID1'];
  code: Scalars['String'];
  id: Scalars['UUID1'];
  isASingleUseCode: Scalars['Boolean'];
  redeemed: Scalars['Boolean'];
};
export declare type MarketplaceClaimableOutput = {
  __typename?: 'MarketplaceClaimableOutput';
  claimingType?: Maybe<Scalars['String']>;
  endDate: Scalars['Time'];
  id: Scalars['UUID'];
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  perWalletLimit: Scalars['Int'];
  startDate: Scalars['Time'];
  totalAvailableUnits: Scalars['Int'];
  totalUnits: Scalars['Int'];
};
export declare type MarketplaceCollection = {
  __typename?: 'MarketplaceCollection';
  collectionType: CollectionType;
  description: Scalars['String'];
  endDate?: Maybe<Scalars['Time']>;
  id: Scalars['UUID1'];
  items?: Maybe<Array<MarketplaceCollectionItem>>;
  marketplaceID: Scalars['UUID1'];
  name: Scalars['String'];
  slug: Scalars['String'];
  startDate?: Maybe<Scalars['Time']>;
  status: MarketCollectionStatus;
};
export declare type MarketplaceCollectionItemsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  statuses?: InputMaybe<Array<InputMaybe<MarketplaceCollectionItemStatus>>>;
};
export declare type MarketplaceCollectionCreateInput = {
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['Time']>;
  name: Scalars['String'];
  startDate?: InputMaybe<Scalars['Time']>;
  status?: InputMaybe<MarketCollectionStatus>;
};
export declare type MarketplaceCollectionItem = {
  __typename?: 'MarketplaceCollectionItem';
  collectionId: Scalars['UUID'];
  delivery?: Maybe<MarketplaceCollectionItemDelivery>;
  details: MarketplaceCollectionItemDetails;
  id: Scalars['UUID'];
  /** @deprecated Use `details` property instead */
  lot: MarketplaceAuctionLot;
  marketplaceTokenId?: Maybe<Scalars['UUID']>;
  name: Scalars['String'];
  saleType: MarketplaceSaleType;
  slug: Scalars['String'];
  status: MarketplaceCollectionItemStatus;
};
export declare type MarketplaceCollectionItemDelivery =
  | MarketplaceItemDeliveryErc721Provenance
  | MarketplaceItemDeliveryErc721Transfer
  | MarketplaceItemDeliveryErc721TransferByRange
  | MarketplaceItemDeliveryErc1155OpenEdition
  | MarketplaceItemDeliveryErc1155Transfer
  | MarketplaceItemDeliveryNoOp;
export declare type MarketplaceCollectionItemDetails =
  | MarketplaceAuctionLot
  | MarketplaceBuyNowOutput
  | MarketplaceClaimableOutput;
export declare enum MarketplaceCollectionItemStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview',
}
export declare type MarketplaceCollectionUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Time']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Time']>;
  status?: InputMaybe<MarketCollectionStatus>;
};
export declare type MarketplaceItemCodeConfigInput = {
  codeValue?: InputMaybe<Scalars['String']>;
  isSingleCode: Scalars['Boolean'];
  numberOfCodes?: InputMaybe<Scalars['Int']>;
  prefix?: InputMaybe<Scalars['String']>;
};
export declare type MarketplaceItemDeliveryErc721Provenance = {
  __typename?: 'MarketplaceItemDeliveryERC721Provenance';
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc721ProvenanceInput = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc721Transfer = {
  __typename?: 'MarketplaceItemDeliveryERC721Transfer';
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc721TransferByRange = {
  __typename?: 'MarketplaceItemDeliveryERC721TransferByRange';
  contractAddress: Scalars['String'];
  fromOnChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
  toOnChainTokenId: Scalars['Int'];
};
export declare type MarketplaceItemDeliveryErc721TransferByRangeInput = {
  contractAddress: Scalars['String'];
  fromOnChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
  toOnChainTokenId: Scalars['Int'];
};
export declare type MarketplaceItemDeliveryErc721TransferInput = {
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc1155OpenEdition = {
  __typename?: 'MarketplaceItemDeliveryERC1155OpenEdition';
  contractId: Scalars['UUID1'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc1155OpenEditionInput = {
  contractId: Scalars['UUID1'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc1155Transfer = {
  __typename?: 'MarketplaceItemDeliveryERC1155Transfer';
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryErc1155TransferInput = {
  amount: Scalars['Int'];
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};
export declare type MarketplaceItemDeliveryInput = {
  ERC721Provenance?: InputMaybe<MarketplaceItemDeliveryErc721ProvenanceInput>;
  ERC721Transfer?: InputMaybe<MarketplaceItemDeliveryErc721TransferInput>;
  ERC721TransferByRange?: InputMaybe<MarketplaceItemDeliveryErc721TransferByRangeInput>;
  ERC1155OpenEdition?: InputMaybe<MarketplaceItemDeliveryErc1155OpenEditionInput>;
  ERC1155Transfer?: InputMaybe<MarketplaceItemDeliveryErc1155TransferInput>;
  NoOp?: InputMaybe<MarketplaceItemDeliveryNoOpInput>;
  deliveryMethod: DeliveryMethod;
};
export declare type MarketplaceItemDeliveryNoOp = {
  __typename?: 'MarketplaceItemDeliveryNoOp';
  notes?: Maybe<Scalars['String']>;
};
export declare type MarketplaceItemDeliveryNoOpInput = {
  notes?: InputMaybe<Scalars['String']>;
};
export declare enum MarketplaceSaleType {
  Auction = 'Auction',
  BuyNow = 'BuyNow',
  Claimable = 'Claimable',
}
export declare type MarketplaceToken = {
  __typename?: 'MarketplaceToken';
  id: Scalars['UUID'];
  isTransferDisabled: Scalars['Boolean'];
  marketplaceID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  nftContractAddress: Scalars['String'];
  nftTokenID?: Maybe<Scalars['UUID']>;
  onChainTokenID: Scalars['Int'];
};
export declare type MarketplaceUser = {
  __typename?: 'MarketplaceUser';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  username?: Maybe<Scalars['String']>;
};
export declare type MetadataAttributes = {
  __typename?: 'MetadataAttributes';
  displayType?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['Int']>;
  traitType: Scalars['String'];
  value: AttributeValue;
};
export declare type Mutation = {
  __typename?: 'Mutation';
  addAllowListToBuyNowLot: Scalars['Boolean'];
  /**
   * Add an existing lot to User favorite lots list.
   *     If lot is already exists, then do nothing.
   *     If provided lot is invalid or not exists, then error message will be returned.
   */
  addCollectionItemToUserFavorites: Scalars['Boolean'];
  addExistingTokenToCollection: Scalars['String'];
  addOrganization: Organization;
  addTokensToCollection: Scalars['String'];
  /** Screens wallet address takes input arguments address, asset, network provides risk rating */
  addressScreening: RiskRating;
  burnToken: Scalars['String'];
  cancelMarketplaceAuctionBid: Scalars['Boolean'];
  /** Cancels payment by ID, can be called by org admin */
  cancelPayment: Scalars['Boolean'];
  cancelTokenTransfer: Scalars['Boolean'];
  /** Check Token Owner mutation takes the input arguments contractId, address, rangeStart, rangeEnd and then it check based on given contract ID and address matched within given range (start, end), If matched it returns the list of token Ids. */
  checkTokenOwners: Array<Maybe<Scalars['Int']>>;
  /** checkWalletTokens mutation checks what NFTs a user owns within a specific contract and token range */
  checkWalletTokens: Array<Maybe<Scalars['Int']>>;
  createAllowList?: Maybe<Scalars['UUID1']>;
  /** Creates new Applicant based on input data. */
  createApplicant: ApplicantResponse;
  /** Creates invoice for given Lot, can be called by org admin */
  createAuctionLotInvoice: InvoiceDetails;
  /** Creates new Check based for provided applicant ID. */
  createCheck: CheckResponse;
  createMarketplaceAuctionBid: MarketplaceAuctionBid;
  createMarketplaceAuctionLot: MarketplaceAuctionLot;
  createMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  createMarketplaceClaimableSet: MarketplaceClaimableOutput;
  createMarketplaceCollection: MarketplaceCollection;
  createOrgByUser: UserOrganization;
  /** Creates a multisig with organization as parent type */
  createOrgMultisig: Scalars['String'];
  /** Creates payment for given Invoice */
  createPayment: PaymentOutput;
  /** Creates new Payment method based on input data. */
  createPaymentMethod: PaymentMethodOutput;
  createTokenDraft: Scalars['String'];
  /** Create a new API key for given User and Organization. */
  createUserAPIKey?: Maybe<UserApiKeyResponse>;
  delayedTransferToken: Scalars['Boolean'];
  deleteAsset: Scalars['String'];
  /**
   * Delete an existing lot from User favorite lots list.
   *     If lot has been already deleted, then do nothing.
   *     If provided lot is invalid or not exists, then error message will be returned.
   */
  deleteCollectionItemFromUserFavorites: Scalars['Boolean'];
  deleteOrgUser: Scalars['Boolean'];
  /** Deletes existing Payment method by Payment ID. */
  deletePaymentMethod: Scalars['Boolean'];
  deleteToken: Scalars['String'];
  /** Delete an existing API key. */
  deleteUserAPIKey: Scalars['Boolean'];
  deleteUserInvitation: Scalars['Boolean'];
  /** Deploy existing multisig wallet to a new network */
  deployWalletToNetwork: Scalars['String'];
  /** Generates promo codes for a marketplace item */
  generatePromoCodes: Array<Maybe<Scalars['String']>>;
  importExternalTokenToCollection: Scalars['String'];
  /** List Wallets With Token takes contract address as input along with start/end date range and network type. Returns a list of token owners. */
  listWalletsWithToken: Array<Maybe<TokenOwner>>;
  loginWithSignature: SignInResponse;
  marketplaceUpdateTheme: Marketplace;
  mintTokens: Scalars['String'];
  nftContractAddAdmin: Scalars['String'];
  nftContractExtensionMintBatch: Scalars['String'];
  nftContractExtensionPause: Scalars['String'];
  nftContractExtensionProvenanceMint: Scalars['String'];
  nftContractExtensionRedeemableRedeemToken: Scalars['String'];
  nftContractExtensionSetBaseURI: Scalars['String'];
  nftContractExtensionSetProvenanceHash: Scalars['String'];
  nftContractExtensionUnpause: Scalars['String'];
  nftContractRegisterExtension: NftContract;
  nftContractSetTokenURI: Scalars['String'];
  nftDeployContract: NftContract;
  orgCreateMarketplace: Marketplace;
  ping: Scalars['String'];
  /** Redeem a claimable */
  redeemClaimable: Scalars['Boolean'];
  /** Redeem a claimable code */
  redeemClaimableCode: Scalars['Boolean'];
  /** Redeem a claimable */
  redeemClaimableItem: Scalars['Boolean'];
  /** Redeem a promo code */
  redeemPromoCode: Scalars['Boolean'];
  /** Release reservations held by invoice ID */
  releaseReservation: Scalars['Boolean'];
  removeAllowListFromBuyNowLot: Scalars['Boolean'];
  reserveMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  sendUserInvitation: Scalars['Boolean'];
  setContractRoyalties: Scalars['String'];
  setJwtIssuerDomain: Organization;
  startInvoiceDelivery: Scalars['Boolean'];
  /** Transfers a token in the provided wallet to the `transferTo` address */
  transferToken: Scalars['String'];
  updateAfterPaymentTransferSuspendTime: Scalars['Boolean'];
  /** Updates existing  Applicant based on input data. */
  updateApplicant: ApplicantResponse;
  updateBuyNowInvoiceExpiryMins: Scalars['Boolean'];
  updateMarketplaceAuctionLot: MarketplaceAuctionLot;
  updateMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  updateMarketplaceClaimableSet: MarketplaceClaimableOutput;
  updateMarketplaceCollection: MarketplaceCollection;
  /** Update name of multisig wallet */
  updateMultisigName: Scalars['Boolean'];
  /** Update existing Payment method based on input data. */
  updatePaymentMethod: Scalars['Boolean'];
  updateTokenDraft: Scalars['String'];
  updateUserOrgRole: UserOrganization;
  updateUserOrgSettings: UserOrganization;
  uploadArweaveAsset: Scalars['String'];
  uploadArweaveMetadata: Scalars['String'];
  uploadAsset: Scalars['String'];
  uploadAssets: Scalars['Int'];
  /** Verify Signature mutation takes the input arguments signature, message, address and then we need to check if signature+message indeed was signed by the address. */
  verifySignature: Scalars['Boolean'];
};
export declare type MutationAddAllowListToBuyNowLotArgs = {
  allowListID: Scalars['UUID1'];
  buyNowLotID: Scalars['UUID1'];
};
export declare type MutationAddCollectionItemToUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};
export declare type MutationAddExistingTokenToCollectionArgs = {
  marketplaceId: Scalars['UUID1'];
  tokenId: Scalars['UUID1'];
};
export declare type MutationAddOrganizationArgs = {
  handle: Scalars['String'];
  name: Scalars['String'];
};
export declare type MutationAddTokensToCollectionArgs = {
  marketplaceId: Scalars['UUID1'];
  tokenIds: Array<Scalars['UUID1']>;
};
export declare type MutationAddressScreeningArgs = {
  input: AddressScreeningInput;
  orgID: Scalars['UUID1'];
};
export declare type MutationBurnTokenArgs = {
  contractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
  walletId: Scalars['UUID1'];
};
export declare type MutationCancelMarketplaceAuctionBidArgs = {
  bidID: Scalars['UUID1'];
  marketplaceID: Scalars['UUID1'];
};
export declare type MutationCancelPaymentArgs = {
  orgID: Scalars['UUID1'];
  paymentID: Scalars['UUID1'];
};
export declare type MutationCancelTokenTransferArgs = {
  orgID: Scalars['UUID1'];
  tokenTransferID: Scalars['UUID1'];
};
export declare type MutationCheckTokenOwnersArgs = {
  contractId: Scalars['UUID1'];
  rangeEnd: Scalars['Int'];
  rangeStart: Scalars['Int'];
  walletAddress: Scalars['String'];
};
export declare type MutationCheckWalletTokensArgs = {
  chainId: Scalars['Int'];
  contractAddress: Scalars['String'];
  rangeEnd: Scalars['Int'];
  rangeStart: Scalars['Int'];
};
export declare type MutationCreateAllowListArgs = {
  allowListInput: AllowListInput;
  orgID: Scalars['UUID1'];
};
export declare type MutationCreateApplicantArgs = {
  input: ApplicantRequest;
  orgID: Scalars['UUID1'];
};
export declare type MutationCreateAuctionLotInvoiceArgs = {
  lotID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
};
export declare type MutationCreateCheckArgs = {
  applicantID: Scalars['String'];
};
export declare type MutationCreateMarketplaceAuctionBidArgs = {
  marketplaceAuctionBid: MarketplaceAuctionBidInput;
};
export declare type MutationCreateMarketplaceAuctionLotArgs = {
  marketplaceAuctionLot: MarketplaceAuctionLotInput;
};
export declare type MutationCreateMarketplaceBuyNowLotArgs = {
  input: CreateMarketplaceBuyNowLotInput;
};
export declare type MutationCreateMarketplaceClaimableSetArgs = {
  input: CreateMarketplaceClaimableSetInput;
};
export declare type MutationCreateMarketplaceCollectionArgs = {
  data: MarketplaceCollectionCreateInput;
  marketplaceID: Scalars['String'];
};
export declare type MutationCreateOrgByUserArgs = {
  handle: Scalars['String'];
  name: Scalars['String'];
};
export declare type MutationCreateOrgMultisigArgs = {
  chainId: Scalars['Int'];
  name: Scalars['String'];
  orgId: Scalars['UUID1'];
};
export declare type MutationCreatePaymentArgs = {
  invoiceID: Scalars['UUID1'];
  metadata?: InputMaybe<CreatePaymentMetadataInput>;
  paymentMethodID: Scalars['UUID1'];
};
export declare type MutationCreatePaymentMethodArgs = {
  input: PaymentMethodCreateInput;
  orgID: Scalars['UUID1'];
};
export declare type MutationCreateTokenDraftArgs = {
  contractId: Scalars['UUID1'];
  tokens: Array<TokenDraft>;
};
export declare type MutationCreateUserApiKeyArgs = {
  orgId: Scalars['UUID1'];
};
export declare type MutationDelayedTransferTokenArgs = {
  amount: Scalars['Int'];
  contractAddress: Scalars['String'];
  tokenOnChainId: Scalars['Int'];
  tokenType: TokenType;
  transferTo: Scalars['String'];
  walletId: Scalars['UUID1'];
};
export declare type MutationDeleteAssetArgs = {
  assetId: Scalars['UUID1'];
};
export declare type MutationDeleteCollectionItemFromUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};
export declare type MutationDeleteOrgUserArgs = {
  organizationID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};
export declare type MutationDeletePaymentMethodArgs = {
  orgID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
};
export declare type MutationDeleteTokenArgs = {
  tokenId: Scalars['UUID1'];
};
export declare type MutationDeleteUserApiKeyArgs = {
  keyId: Scalars['UUID1'];
};
export declare type MutationDeleteUserInvitationArgs = {
  email: Scalars['String'];
  orgId: Scalars['UUID1'];
};
export declare type MutationDeployWalletToNetworkArgs = {
  networkId: Scalars['UUID1'];
  walletId: Scalars['UUID1'];
};
export declare type MutationGeneratePromoCodesArgs = {
  marketplaceCollectionItemId: Scalars['UUID1'];
  num: Scalars['Int'];
};
export declare type MutationImportExternalTokenToCollectionArgs = {
  contractAddress: Scalars['String'];
  marketplaceId: Scalars['UUID1'];
  onChainId: Scalars['Int'];
};
export declare type MutationListWalletsWithTokenArgs = {
  contractAddress: Scalars['String'];
  endDate: Scalars['Time'];
  networkId: Scalars['UUID1'];
  startDate: Scalars['Time'];
};
export declare type MutationLoginWithSignatureArgs = {
  orgID: Scalars['UUID1'];
  request: SignInRequest;
};
export declare type MutationMarketplaceUpdateThemeArgs = {
  id: Scalars['String'];
  theme: Scalars['String'];
};
export declare type MutationMintTokensArgs = {
  tokenIds: Array<Scalars['UUID1']>;
};
export declare type MutationNftContractAddAdminArgs = {
  address: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionMintBatchArgs = {
  amountToMint: Scalars['Int'];
  extensionAddress: Scalars['String'];
  mintToAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionPauseArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionProvenanceMintArgs = {
  contractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
  mintToAddress: Scalars['String'];
  numberOfTokens: Scalars['Int'];
  voucherId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionRedeemableRedeemTokenArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
};
export declare type MutationNftContractExtensionSetBaseUriArgs = {
  baseURI: Scalars['String'];
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractExtensionSetProvenanceHashArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
  provenanceHash: Scalars['String'];
};
export declare type MutationNftContractExtensionUnpauseArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};
export declare type MutationNftContractRegisterExtensionArgs = {
  contractId: Scalars['UUID1'];
  extensionType: ExtensionType;
  maxTokenSupply: Scalars['Int'];
};
export declare type MutationNftContractSetTokenUriArgs = {
  nftContractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
  uri: Scalars['String'];
};
export declare type MutationNftDeployContractArgs = {
  input: DeployContractInput;
};
export declare type MutationOrgCreateMarketplaceArgs = {
  name: Scalars['String'];
  orgId?: InputMaybe<Scalars['UUID1']>;
};
export declare type MutationRedeemClaimableArgs = {
  claimableId: Scalars['String'];
  destAddr?: InputMaybe<Scalars['String']>;
};
export declare type MutationRedeemClaimableCodeArgs = {
  code: Scalars['String'];
  destAddr?: InputMaybe<Scalars['String']>;
};
export declare type MutationRedeemClaimableItemArgs = {
  claimableItemId: Scalars['UUID1'];
  destAddr?: InputMaybe<Scalars['String']>;
};
export declare type MutationRedeemPromoCodeArgs = {
  code: Scalars['String'];
  destAddr?: InputMaybe<Scalars['String']>;
};
export declare type MutationReleaseReservationArgs = {
  invoiceID: Scalars['UUID1'];
  orgID?: InputMaybe<Scalars['UUID1']>;
};
export declare type MutationRemoveAllowListFromBuyNowLotArgs = {
  buyNowLotID: Scalars['UUID1'];
};
export declare type MutationReserveMarketplaceBuyNowLotArgs = {
  input: ReserveMarketplaceBuyNowLotInput;
};
export declare type MutationSendUserInvitationArgs = {
  email: Scalars['String'];
  orgId: Scalars['UUID1'];
};
export declare type MutationSetContractRoyaltiesArgs = {
  basisPoints: Array<Scalars['Int']>;
  extensionAddress?: InputMaybe<Scalars['String']>;
  nftContractId: Scalars['UUID1'];
  receivers: Array<Scalars['String']>;
};
export declare type MutationSetJwtIssuerDomainArgs = {
  domain: Scalars['String'];
  orgId: Scalars['UUID'];
};
export declare type MutationStartInvoiceDeliveryArgs = {
  invoiceID: Scalars['UUID1'];
};
export declare type MutationTransferTokenArgs = {
  amount?: InputMaybe<Scalars['Int']>;
  contractAddress: Scalars['String'];
  tokenOnChainId: Scalars['Int'];
  tokenType?: InputMaybe<TokenType>;
  transferTo: Scalars['String'];
  walletId: Scalars['UUID1'];
};
export declare type MutationUpdateAfterPaymentTransferSuspendTimeArgs = {
  afterPaymentTransferSuspendTime: Scalars['Int'];
  orgID: Scalars['UUID1'];
};
export declare type MutationUpdateApplicantArgs = {
  applicantID: Scalars['String'];
  input: ApplicantRequest;
};
export declare type MutationUpdateBuyNowInvoiceExpiryMinsArgs = {
  buyNowInvoiceExpiryMins: Scalars['Int'];
  orgID: Scalars['UUID1'];
};
export declare type MutationUpdateMarketplaceAuctionLotArgs = {
  data: MarketplaceAuctionLotUpdateInput;
  marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type MutationUpdateMarketplaceBuyNowLotArgs = {
  input: MarketplaceBuyNowUpdateInput;
  marketplaceBuyNowLotID: Scalars['UUID'];
};
export declare type MutationUpdateMarketplaceClaimableSetArgs = {
  input: UpdateMarketplaceClaimableSetInput;
  marketplaceClaimableSetID: Scalars['UUID1'];
};
export declare type MutationUpdateMarketplaceCollectionArgs = {
  data: MarketplaceCollectionUpdateInput;
  id: Scalars['UUID1'];
};
export declare type MutationUpdateMultisigNameArgs = {
  newName: Scalars['String'];
  walletID: Scalars['UUID1'];
};
export declare type MutationUpdatePaymentMethodArgs = {
  input: PaymentMethodUpdateInput;
  orgID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
};
export declare type MutationUpdateTokenDraftArgs = {
  token: TokenDraft;
};
export declare type MutationUpdateUserOrgRoleArgs = {
  orgID: Scalars['UUID'];
  role: Scalars['String'];
  userID: Scalars['UUID'];
};
export declare type MutationUpdateUserOrgSettingsArgs = {
  params: SettingsInput;
};
export declare type MutationUploadArweaveAssetArgs = {
  assetVersionId: Scalars['UUID1'];
};
export declare type MutationUploadArweaveMetadataArgs = {
  tokenId: Scalars['UUID1'];
};
export declare type MutationUploadAssetArgs = {
  file: Scalars['Upload'];
  name: Scalars['String'];
  orgId: Scalars['UUID1'];
};
export declare type MutationUploadAssetsArgs = {
  files: Array<InputMaybe<Scalars['Upload']>>;
  orgId: Scalars['UUID1'];
};
export declare type MutationVerifySignatureArgs = {
  address: Scalars['String'];
  message: Scalars['String'];
  signature: Scalars['String'];
};
export declare type NftContract = {
  __typename?: 'NFTContract';
  activationTxHash: Scalars['String'];
  admins: Array<Scalars['String']>;
  arweavePathManifest?: Maybe<Scalars['String']>;
  contractAddress: Scalars['EthAddress'];
  deploymentTxHash?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  marketplaceAddress: Scalars['EthAddress'];
  mediaTxHash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftContractType: NftContractType;
  nftTokens?: Maybe<Array<NftToken>>;
  symbol?: Maybe<Scalars['String']>;
  transferOwnershipHash?: Maybe<Scalars['String']>;
  wallet: Wallet;
};
export declare type NftContractType = {
  __typename?: 'NFTContractType';
  id: Scalars['UUID1'];
  name: Scalars['String'];
};
export declare type NftMetadata = {
  __typename?: 'NFTMetadata';
  copyright?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};
export declare type NftToken = {
  __typename?: 'NFTToken';
  asset?: Maybe<Asset>;
  assetId?: Maybe<Scalars['UUID1']>;
  deployed: Scalars['Boolean'];
  editions?: Maybe<Scalars['Int']>;
  ethereumTxId?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  metadataArweaveTxId?: Maybe<Scalars['String']>;
  metadataArweaveTxLink?: Maybe<Scalars['String']>;
  metadataJSON?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftContract: NftContract;
  nftContractID: Scalars['UUID1'];
  onChainId?: Maybe<Scalars['Int']>;
  royaltyBasisPoints?: Maybe<Scalars['Int']>;
};
export declare type Network = {
  __typename?: 'Network';
  chainID: Scalars['Int'];
  id: Scalars['UUID1'];
  name: Scalars['String'];
  openSeaProxyAddress: Scalars['String'];
  rpcURL: Scalars['String'];
  safeFactoryAddress: Scalars['String'];
  safeFallbackHandler: Scalars['String'];
  safeMasterContractAddress: Scalars['String'];
  wethAddress: Scalars['String'];
};
export declare type Organization = {
  __typename?: 'Organization';
  afterPaymentTransferSuspendTime?: Maybe<Scalars['Int']>;
  assets?: Maybe<Array<Asset>>;
  buyNowInvoiceExpiryMins?: Maybe<Scalars['Int']>;
  handle: Scalars['String'];
  id: Scalars['UUID1'];
  jwtIssuerDomain?: Maybe<Scalars['String']>;
  marketplaces: Array<Marketplace>;
  members: Array<OrganizationMember>;
  name: Scalars['String'];
  nftContracts?: Maybe<Array<NftContract>>;
  wallets?: Maybe<Array<Wallet>>;
};
export declare type OrganizationAssetsArgs = {
  filter?: InputMaybe<AssetFilter>;
};
export declare type OrganizationMembersArgs = {
  filter?: InputMaybe<OrganizationMemberFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};
export declare type OrganizationMember = {
  __typename?: 'OrganizationMember';
  email?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
  id: Scalars['UUID1'];
  name?: Maybe<Scalars['String']>;
  organizationId: Scalars['UUID1'];
  role?: Maybe<Scalars['String']>;
  userId: Scalars['UUID1'];
  username?: Maybe<Scalars['String']>;
};
export declare type OrganizationMemberFilter = {
  externalUserId?: InputMaybe<Scalars['String']>;
};
export declare type PaginatedMarketplaceClaimableCodeOutput = {
  __typename?: 'PaginatedMarketplaceClaimableCodeOutput';
  count?: Maybe<Scalars['Int']>;
  results: Array<MarketplaceClaimableCodeOutput>;
};
export declare type Payment = {
  __typename?: 'Payment';
  circlePaymentID: Scalars['String'];
  id: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
  status: PaymentStatus;
  userID: Scalars['UUID1'];
};
export declare type PaymentDetails = CryptoPaymentDetails;
export declare type PaymentMethodCreateInput = {
  achData?: InputMaybe<AchData>;
  creditCardData?: InputMaybe<CreditCardData>;
  paymentType: PaymentType;
  wireData?: InputMaybe<WireData>;
};
export declare type PaymentMethodOutput =
  | AchPaymentMethodOutput
  | CreditCardPaymentMethodOutput
  | CryptoPaymentMethodOutput
  | WirePaymentMethodOutput;
export declare type PaymentMethodPrepareStatementOutput = AchPaymentMethodPrepareStatementOutput;
export declare type PaymentMethodUpdateInput = {
  achData?: InputMaybe<AchData>;
  creditCardData?: InputMaybe<CreditCardData>;
  paymentType: PaymentType;
};
export declare type PaymentNotification3DsMessage = {
  __typename?: 'PaymentNotification3DSMessage';
  error?: Maybe<Scalars['String']>;
  redirectURL?: Maybe<Scalars['String']>;
};
export declare type PaymentNotificationMessage = PaymentNotification3DsMessage;
export declare type PaymentNotificationOutput = {
  __typename?: 'PaymentNotificationOutput';
  message: PaymentNotificationMessage;
};
export declare type PaymentOutput = {
  __typename?: 'PaymentOutput';
  details?: Maybe<PaymentDetails>;
  id: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
  processorPaymentID: Scalars['String'];
  status: PaymentStatus;
  userID: Scalars['UUID1'];
};
export declare type PaymentPublicKey = {
  __typename?: 'PaymentPublicKey';
  keyID: Scalars['String'];
  publicKey: Scalars['String'];
};
export declare enum PaymentStatus {
  ActionRequired = 'action_required',
  Confirmed = 'confirmed',
  Failed = 'failed',
  Paid = 'paid',
  Pending = 'pending',
}
export declare enum PaymentType {
  Ach = 'ACH',
  CreditCard = 'CreditCard',
  Crypto = 'Crypto',
  Wire = 'Wire',
}
export declare type Query = {
  __typename?: 'Query';
  /** Returns Invoice Item after applying the Discount */
  applyDiscountCode: DiscountedInvoiceItem;
  availableClaimables: Scalars['Int'];
  /** Check if user can redeem claimable */
  canRedeemClaimable: Scalars['Boolean'];
  /** Check if user can redeem claimable item */
  canRedeemClaimableItem: Scalars['Boolean'];
  collection?: Maybe<MarketplaceCollection>;
  collectionBySlug?: Maybe<MarketplaceCollection>;
  collectionItemById?: Maybe<MarketplaceCollectionItem>;
  getAllowLists?: Maybe<Array<AllowList>>;
  /** Retrieves applicant details by organizationID */
  getApplicant: ApplicantResponse;
  /** Get Available Claimables */
  getAvailableClaimables: Scalars['Int'];
  getBuyNowBuyerInfo?: Maybe<Array<BuyerDetailOutput>>;
  getClaimableCodesForSetId: PaginatedMarketplaceClaimableCodeOutput;
  /** Retrieves Discount codes by Invoice Item ID */
  getDiscountCodes: Array<Maybe<DiscountCode>>;
  /** Retrieves invoice details by ID */
  getInvoiceDetails: InvoiceDetails;
  /** Retrieves invoice list for given user, can be called by org admin */
  getInvoicesByUserID: Array<Maybe<InvoiceDetails>>;
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  /** Retrieves invoices user owns */
  getMyInvoices: Array<Maybe<InvoiceDetails>>;
  /** Retrieves payments user owns */
  getMyPayments: Array<Maybe<Payment>>;
  /** Returns requested Payment method */
  getPaymentMethod: PaymentMethodOutput;
  /** Returns Payment method list in scope of current Organization. */
  getPaymentMethodList: Array<PaymentMethodOutput>;
  /** Retrieves Payment notification */
  getPaymentNotification: PaymentNotificationOutput;
  /** Returns Public Key for further Payment data encryption. */
  getPaymentPublicKey: PaymentPublicKey;
  /** Retrieves payment list for given user, can be called by org admin */
  getPaymentsByUserID: Array<Maybe<Payment>>;
  /** Retrieves sdk token to inititate onfido web SDK */
  getSDKToken: SdkTokenResponse;
  /**  getSignatureMessage returns a message that should be used for in signing process */
  getSignatureMessage: Scalars['String'];
  /** Get Tax Quote */
  getTaxQuote: TaxQuoteOutput;
  getTokenTransfersHistory: Array<TokenTransfers>;
  /** Get User by wallet address and orgID */
  getUserByWalletAddress?: Maybe<User>;
  /** Get UserInvitations by orgID */
  getUserInvitations: Array<Maybe<UserInvitation>>;
  getWalletDeliveryCount: Scalars['Int'];
  internalUsers: Array<UserOrganization>;
  isTokenRedeemed: Scalars['Boolean'];
  isUserOnAllowList: Scalars['Boolean'];
  /** create invoice/lot report by collectionID and mails  to provided email */
  mailInvoiceLotDetailReportMailByCollectionID: Scalars['Boolean'];
  /** create salesreport by collectionID and mails to provided email */
  mailSalesReportByCollectionID: Scalars['Boolean'];
  marketplace: Marketplace;
  me?: Maybe<CurrentUser>;
  network: Network;
  nftContract: NftContract;
  nftToken: NftToken;
  orgUsernameAvailable: Scalars['Boolean'];
  organization: Organization;
  organizationByID: Organization;
  ping: Scalars['String'];
  /** Prepare requested Payment method for further use */
  preparePaymentMethod?: Maybe<PaymentMethodPrepareStatementOutput>;
  serverTime: Scalars['Time'];
  validateIp: ValidateIpResponse;
  /** Validate Payment limit */
  validatePaymentLimit: ValidatePaymentLimitOutput;
  wallet: Wallet;
};
export declare type QueryApplyDiscountCodeArgs = {
  discountCode: Scalars['String'];
  invoiceItemID: Scalars['UUID1'];
};
export declare type QueryAvailableClaimablesArgs = {
  claimableSetID: Scalars['UUID1'];
};
export declare type QueryCanRedeemClaimableArgs = {
  claimableID: Scalars['String'];
};
export declare type QueryCanRedeemClaimableItemArgs = {
  claimableItemID: Scalars['UUID1'];
};
export declare type QueryCollectionArgs = {
  id: Scalars['String'];
};
export declare type QueryCollectionBySlugArgs = {
  marketplaceID: Scalars['UUID1'];
  slug: Scalars['String'];
};
export declare type QueryCollectionItemByIdArgs = {
  id: Scalars['UUID1'];
};
export declare type QueryGetAllowListsArgs = {
  orgID: Scalars['UUID1'];
};
export declare type QueryGetApplicantArgs = {
  organizationID: Scalars['UUID1'];
};
export declare type QueryGetAvailableClaimablesArgs = {
  claimableId: Scalars['String'];
};
export declare type QueryGetBuyNowBuyerInfoArgs = {
  itemId: Scalars['UUID1'];
};
export declare type QueryGetClaimableCodesForSetIdArgs = {
  claimableSetID: Scalars['UUID1'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};
export declare type QueryGetDiscountCodesArgs = {
  invoiceItemID: Scalars['UUID1'];
};
export declare type QueryGetInvoiceDetailsArgs = {
  invoiceID: Scalars['UUID1'];
};
export declare type QueryGetInvoicesByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};
export declare type QueryGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type QueryGetPaymentMethodArgs = {
  paymentMethodID: Scalars['UUID1'];
};
export declare type QueryGetPaymentMethodListArgs = {
  orgID: Scalars['UUID1'];
};
export declare type QueryGetPaymentPublicKeyArgs = {
  orgID: Scalars['UUID1'];
};
export declare type QueryGetPaymentsByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};
export declare type QueryGetSdkTokenArgs = {
  applicantID: Scalars['String'];
  referrer: Scalars['String'];
};
export declare type QueryGetSignatureMessageArgs = {
  orgID: Scalars['UUID1'];
};
export declare type QueryGetTaxQuoteArgs = {
  input: TaxQuoteInput;
};
export declare type QueryGetTokenTransfersHistoryArgs = {
  orgId: Scalars['UUID1'];
};
export declare type QueryGetUserByWalletAddressArgs = {
  address: Scalars['String'];
  orgId: Scalars['UUID1'];
};
export declare type QueryGetUserInvitationsArgs = {
  orgId: Scalars['UUID1'];
};
export declare type QueryGetWalletDeliveryCountArgs = {
  internalWallets: Scalars['Boolean'];
  marketplaceCollectionId: Scalars['UUID1'];
};
export declare type QueryInternalUsersArgs = {
  organizationID: Scalars['UUID1'];
};
export declare type QueryIsTokenRedeemedArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
};
export declare type QueryIsUserOnAllowListArgs = {
  lotID: Scalars['UUID1'];
};
export declare type QueryMailInvoiceLotDetailReportMailByCollectionIdArgs = {
  collectionID: Scalars['UUID1'];
  toEmail: Scalars['String'];
};
export declare type QueryMailSalesReportByCollectionIdArgs = {
  collectionID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
  toEmail: Scalars['String'];
};
export declare type QueryMarketplaceArgs = {
  id: Scalars['UUID'];
};
export declare type QueryNetworkArgs = {
  id: Scalars['UUID1'];
};
export declare type QueryNftContractArgs = {
  id: Scalars['UUID1'];
};
export declare type QueryNftTokenArgs = {
  id: Scalars['UUID1'];
};
export declare type QueryOrgUsernameAvailableArgs = {
  organizationID: Scalars['UUID1'];
  username: Scalars['String'];
};
export declare type QueryOrganizationArgs = {
  handle: Scalars['String'];
};
export declare type QueryOrganizationByIdArgs = {
  id?: InputMaybe<Scalars['UUID1']>;
};
export declare type QueryPreparePaymentMethodArgs = {
  orgID?: InputMaybe<Scalars['UUID1']>;
  paymentMethodType: PaymentType;
};
export declare type QueryValidateIpArgs = {
  ip: Scalars['String'];
  organizationID: Scalars['UUID1'];
};
export declare type QueryValidatePaymentLimitArgs = {
  collectionID: Scalars['UUID1'];
  itemsCount: Scalars['Int'];
};
export declare type QueryWalletArgs = {
  id: Scalars['UUID1'];
};
export declare type ReserveMarketplaceBuyNowLotInput = {
  itemCount: Scalars['Int'];
  marketplaceBuyNowLotID: Scalars['UUID1'];
};
export declare enum RiskRating {
  High = 'High',
  Low = 'Low',
}
export declare enum Role {
  Admin = 'admin',
  User = 'user',
}
export declare type SdkTokenResponse = {
  __typename?: 'SDKTokenResponse';
  token: Scalars['String'];
};
export declare type SettingsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  settingsJson?: InputMaybe<Scalars['String']>;
  userOrgId: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};
export declare type SignInRequest = {
  chainID: Scalars['Int'];
  challenge: Scalars['String'];
  signature: Scalars['String'];
  signer: Scalars['String'];
};
export declare type SignInResponse = {
  __typename?: 'SignInResponse';
  me: CurrentUser;
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};
export declare type Subscription = {
  __typename?: 'Subscription';
  auctionLotUpdated: MarketplaceAuctionLot;
  bidFeed: MarketplaceAuctionBid;
  /** Returns a MarketplaceAuctionLot on subscribe and whenever a new bid is placed */
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  /** Subscribes to lots and bids updates within given marketplace collection */
  marketplaceCollectionLotsUpdates: MarketplaceAuctionLot;
};
export declare type SubscriptionAuctionLotUpdatedArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type SubscriptionBidFeedArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};
export declare type SubscriptionGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID1'];
};
export declare type SubscriptionMarketplaceCollectionLotsUpdatesArgs = {
  collectionId: Scalars['UUID1'];
};
export declare enum TaxProvider {
  NoOp = 'NoOp',
  TaxJar = 'TaxJar',
  Vertex = 'Vertex',
}
export declare type TaxQuoteBillingAddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};
export declare type TaxQuoteBillingAddressOutput = {
  __typename?: 'TaxQuoteBillingAddressOutput';
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};
export declare type TaxQuoteInput = {
  address: TaxQuoteBillingAddressInput;
  orgID: Scalars['UUID1'];
  taxablePrice: Scalars['Float'];
};
export declare type TaxQuoteOutput = {
  __typename?: 'TaxQuoteOutput';
  taxablePrice: Scalars['Float'];
  totalTaxAmount: Scalars['Float'];
  totalTaxedPrice: Scalars['Float'];
  verifiedAddress: TaxQuoteBillingAddressOutput;
};
export declare type TokenDraft = {
  assetId?: InputMaybe<Scalars['UUID1']>;
  copyright?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  editions?: InputMaybe<Scalars['Int']>;
  invoiceItemId?: InputMaybe<Scalars['UUID1']>;
  metadataJSON?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  royaltyBasisPoints?: InputMaybe<Scalars['Int']>;
  tokenId?: InputMaybe<Scalars['UUID1']>;
};
export declare type TokenOwner = {
  __typename?: 'TokenOwner';
  tokenId: Scalars['Int'];
  walletAddress: Scalars['String'];
};
export declare type TokenTransfers = {
  __typename?: 'TokenTransfers';
  amount?: Maybe<Scalars['Int']>;
  callerUserId?: Maybe<Scalars['UUID1']>;
  contractAddress?: Maybe<Scalars['String']>;
  createdAt: Scalars['Time'];
  id: Scalars['UUID1'];
  jobId?: Maybe<Scalars['UUID1']>;
  organizationId?: Maybe<Scalars['UUID1']>;
  resolvedTransferTo?: Maybe<Scalars['String']>;
  status: TransferStatus;
  tokenOnChainId?: Maybe<Scalars['Int']>;
  tokenType?: Maybe<TokenType>;
  transactionHash?: Maybe<Scalars['String']>;
  transferTo?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Time'];
  userId?: Maybe<Scalars['UUID1']>;
  wallet?: Maybe<Wallet>;
  walletId?: Maybe<Scalars['UUID1']>;
};
export declare enum TokenType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}
export declare enum TransactionStatus {
  Completed = 'Completed',
  Failed = 'Failed',
  Pending = 'Pending',
}
export declare enum TransactionType {
  DeployMultisig = 'DeployMultisig',
  TransferToken = 'TransferToken',
}
export declare enum TransferStatus {
  Canceled = 'Canceled',
  Failed = 'Failed',
  InProgress = 'InProgress',
  Queued = 'Queued',
  Success = 'Success',
}
export declare type UpdateMarketplaceClaimableSetInput = {
  endDate?: InputMaybe<Scalars['Time']>;
  startDate?: InputMaybe<Scalars['Time']>;
  totalAvailableUnits?: InputMaybe<Scalars['Int']>;
  totalUnits?: InputMaybe<Scalars['Int']>;
};
export declare type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};
export declare type UserApiKeyResponse = {
  __typename?: 'UserAPIKeyResponse';
  createdAt?: Maybe<Scalars['Time']>;
  id?: Maybe<Scalars['UUID1']>;
  key?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Time']>;
};
export declare type UserInvitation = {
  __typename?: 'UserInvitation';
  email: Scalars['String'];
  id: Scalars['UUID'];
  status: Scalars['String'];
};
export declare type UserOrgFilter = {
  orgId?: InputMaybe<Scalars['UUID']>;
};
export declare type UserOrganization = {
  __typename?: 'UserOrganization';
  avatar?: Maybe<Scalars['String']>;
  bidAllowed: Scalars['Boolean'];
  externalUserId: Scalars['String'];
  id: Scalars['UUID'];
  kycStatus: KycStatus;
  organization: Organization;
  organizationId: Scalars['UUID'];
  role: Scalars['String'];
  settings?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['UUID'];
  username?: Maybe<Scalars['String']>;
};
export declare type ValidateIpResponse = {
  __typename?: 'ValidateIPResponse';
  Success: Scalars['Boolean'];
  ipScreeningId: Scalars['UUID1'];
};
export declare type ValidatePaymentLimitData = {
  __typename?: 'ValidatePaymentLimitData';
  isLimitExceeded: Scalars['Boolean'];
  remainingTotal: Scalars['Int'];
  remainingTransaction: Scalars['Int'];
};
export declare type ValidatePaymentLimitOutput = {
  __typename?: 'ValidatePaymentLimitOutput';
  ach: ValidatePaymentLimitData;
  creditCard: ValidatePaymentLimitData;
  wire: ValidatePaymentLimitData;
};
export declare type Wallet = {
  __typename?: 'Wallet';
  address?: Maybe<Scalars['EthAddress']>;
  deploymentTxHash?: Maybe<Scalars['String']>;
  gnosisSafeURL?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  name: Scalars['String'];
  network: Network;
  networkId: Scalars['UUID1'];
  parentID: Scalars['UUID1'];
  parentType: Scalars['String'];
  tokens?: Maybe<Array<WalletToken>>;
};
export declare enum WalletParentType {
  Organization = 'organization',
  User = 'user',
}
export declare type WalletToken = {
  __typename?: 'WalletToken';
  balance?: Maybe<Scalars['String']>;
  contractAddress: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** Token ID in smart contract */
  id: Scalars['BigInt'];
  metadata?: Maybe<Erc721Metadata>;
  timeLastUpdated?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
};
export declare enum WalletTxType {
  MojitoHotWallet = 'MojitoHotWallet',
  Multisig = 'Multisig',
}
export declare type WireBankAddress = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
};
export declare type WireBankAddressOutput = {
  __typename?: 'WireBankAddressOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
};
export declare type WireBeneficiary = {
  __typename?: 'WireBeneficiary';
  address1: Scalars['String'];
  address2: Scalars['String'];
  name: Scalars['String'];
};
export declare type WireBeneficiaryBank = {
  __typename?: 'WireBeneficiaryBank';
  accountNumber: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  routingNumber: Scalars['String'];
  swiftCode: Scalars['String'];
};
export declare type WireBillingDetails = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['String'];
};
export declare type WireBillingDetailsOutput = {
  __typename?: 'WireBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};
export declare type WireData = {
  accountNumber: Scalars['String'];
  bankAddress: WireBankAddress;
  billingDetails: WireBillingDetails;
  routingNumber: Scalars['String'];
};
export declare type WireInstructions = {
  __typename?: 'WireInstructions';
  beneficiary: WireBeneficiary;
  beneficiaryBank: WireBeneficiaryBank;
  trackingRef: Scalars['String'];
};
export declare type WirePaymentMethodOutput = {
  __typename?: 'WirePaymentMethodOutput';
  bankAddress?: Maybe<WireBankAddressOutput>;
  billingDetails?: Maybe<WireBillingDetailsOutput>;
  description: Scalars['String'];
  id: Scalars['UUID1'];
  instructions?: Maybe<WireInstructions>;
  status: Scalars['String'];
  type: PaymentType;
};
