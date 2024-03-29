export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export type AchBankAddressOutput = {
  __typename?: 'ACHBankAddressOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
};

export type AchBillingDetails = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode?: InputMaybe<Scalars['String']>;
};

export type AchBillingDetailsOutput = {
  __typename?: 'ACHBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type AchData = {
  accountId: Scalars['String'];
  billingDetails: AchBillingDetails;
  metadata: AchMetadata;
  publicToken: Scalars['String'];
};

export type AchMetadata = {
  email: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type AchMetadataOutput = {
  __typename?: 'ACHMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type AchPaymentMethodOutput = {
  __typename?: 'ACHPaymentMethodOutput';
  accountNumber: Scalars['String'];
  bankAddress?: Maybe<AchBankAddressOutput>;
  billingDetails?: Maybe<AchBillingDetailsOutput>;
  id: Scalars['UUID1'];
  metadata?: Maybe<AchMetadataOutput>;
  status: Scalars['String'];
  type: PaymentType;
};

export type AchPaymentMethodPrepareStatementOutput = {
  __typename?: 'ACHPaymentMethodPrepareStatementOutput';
  linkToken: Scalars['String'];
};

export type Address = {
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

export type AddressInput = {
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

export type AddressScreeningInput = {
  address: Scalars['String'];
  asset: Scalars['String'];
  network: Scalars['String'];
};

export type AllowList = {
  __typename?: 'AllowList';
  elements: Array<AllowListElement>;
  endTime: Scalars['Time'];
  filteringType: FilteringType;
  id: Scalars['UUID1'];
  identifierType: IdentifierType;
  startTime: Scalars['Time'];
};

export type AllowListElement = {
  __typename?: 'AllowListElement';
  id: Scalars['UUID1'];
  identifierValue: Scalars['String'];
};

export type AllowListInput = {
  elements: Array<Scalars['String']>;
  endTime: Scalars['Time'];
  filteringType: FilteringType;
  identifierType: IdentifierType;
  startTime: Scalars['Time'];
};

export type ApplicantRequest = {
  address?: InputMaybe<AddressInput>;
  dob?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  idNumbers?: InputMaybe<Array<InputMaybe<IdNumberInput>>>;
  lastName: Scalars['String'];
};

export type ApplicantResponse = {
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

export type Asset = {
  __typename?: 'Asset';
  currentVersion?: Maybe<AssetVersion>;
  id: Scalars['UUID1'];
  versions?: Maybe<Array<AssetVersion>>;
};

export type AssetFilter = {
  organizationID?: InputMaybe<Scalars['UUID1']>;
};

export type AssetVersion = {
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

export type AttributeValue = AttributeValueFloat | AttributeValueInt | AttributeValueString;

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
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum AuctionLotStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview',
}

export type BidFilterInput = {
  marketplaceAuctionLotId?: InputMaybe<Scalars['UUID']>;
  order?: InputMaybe<AuctionBidOrder>;
  returnDeleted?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export type BuyerDetailOutput = {
  __typename?: 'BuyerDetailOutput';
  externalUserID: Scalars['String'];
  timestamp: Scalars['Time'];
  totalPrice: Scalars['Float'];
  units: Scalars['Int'];
  user?: Maybe<User>;
  userId: Scalars['UUID1'];
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

export type CreateEmailTemplateInput = {
  eventType: EventType;
  orgID: Scalars['UUID1'];
  subject: Scalars['String'];
  templateContent: Scalars['String'];
};

export type CreateMarketplaceBuyNowLotInput = {
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

export type CreateMarketplaceClaimableSetInput = {
  collectionId: Scalars['UUID1'];
  collectionItemName: Scalars['String'];
  delivery: MarketplaceItemDeliveryInput;
  endDate: Scalars['Time'];
  perWalletLimit: Scalars['Int'];
  promoCodeConfig?: InputMaybe<MarketplaceItemCodeConfigInput>;
  startDate: Scalars['Time'];
  totalUnits: Scalars['Int'];
};

export type CreatePaymentCreditCardMetadataInput = {
  encryptedData: Scalars['String'];
  keyID: Scalars['String'];
};

export type CreatePaymentCryptoMetadataInput = {
  billingDetails?: InputMaybe<CryptoBillingDetails>;
  cancelURL?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  localPrice?: InputMaybe<LocalPrice>;
  name?: InputMaybe<Scalars['String']>;
  redirectURL?: InputMaybe<Scalars['String']>;
};

export type CreatePaymentMetadataInput = {
  creditCardData?: InputMaybe<CreatePaymentCreditCardMetadataInput>;
  cryptoData?: InputMaybe<CreatePaymentCryptoMetadataInput>;
  destinationAddress?: InputMaybe<Scalars['EthAddress']>;
  discountCodeID?: InputMaybe<Scalars['UUID1']>;
};

export type CreditCardBillingDetails = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type CreditCardBillingDetailsOutput = {
  __typename?: 'CreditCardBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type CreditCardData = {
  billingDetails?: InputMaybe<CreditCardBillingDetails>;
  encryptedData: Scalars['String'];
  expirationMonth: Scalars['Int'];
  expirationYear: Scalars['Int'];
  keyID: Scalars['String'];
  metadata?: InputMaybe<CreditCardMetadata>;
};

export type CreditCardMetadata = {
  email: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type CreditCardMetadataOutput = {
  __typename?: 'CreditCardMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreditCardPaymentMethodOutput = {
  __typename?: 'CreditCardPaymentMethodOutput';
  billingDetails?: Maybe<CreditCardBillingDetailsOutput>;
  id: Scalars['UUID1'];
  last4Digit: Scalars['String'];
  metadata?: Maybe<CreditCardMetadataOutput>;
  network: Scalars['String'];
  status: Scalars['String'];
  type: PaymentType;
};

export type CryptoBillingDetails = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
};

export type CryptoPaymentDetails = {
  __typename?: 'CryptoPaymentDetails';
  hostedURL: Scalars['String'];
};

export type CryptoPaymentMethodOutput = {
  __typename?: 'CryptoPaymentMethodOutput';
  id: Scalars['UUID1'];
  status: Scalars['String'];
  type: PaymentType;
};

export type CurrentUser = {
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

export type CurrentUserActiveBidsArgs = {
  orgId: Scalars['UUID'];
};

export type CurrentUserUserOrgsArgs = {
  filter?: InputMaybe<UserOrgFilter>;
};

export type CurrentUserWonBidsArgs = {
  orgId: Scalars['UUID'];
};

export enum DeliveryMethod {
  Erc721Provenance = 'ERC721Provenance',
  Erc721Transfer = 'ERC721Transfer',
  Erc721TransferByRange = 'ERC721TransferByRange',
  Erc1155OpenEdition = 'ERC1155OpenEdition',
  Erc1155Transfer = 'ERC1155Transfer',
  NoOp = 'NoOp',
}

export type DeployContractInput = {
  contractType: ContractType;
  nftName: Scalars['String'];
  nftSymbol: Scalars['String'];
  organizationId: Scalars['UUID1'];
  walletId: Scalars['UUID1'];
};

export type DiscountCode = {
  __typename?: 'DiscountCode';
  description?: Maybe<Scalars['String']>;
  discountCode: Scalars['String'];
  discountType: Scalars['String'];
  id: Scalars['UUID1'];
  organizationID: Scalars['UUID1'];
  value: Scalars['Float'];
};

export type DiscountedInvoiceItem = {
  __typename?: 'DiscountedInvoiceItem';
  discountCode: DiscountCode;
  discountedAmount: Scalars['Float'];
  invoiceItemID: Scalars['UUID1'];
  totalPrice: Scalars['Float'];
  totalPriceAfterDiscount: Scalars['Float'];
};

export type Erc721Metadata = {
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

export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  active: Scalars['Boolean'];
  eventType: EventType;
  id: Scalars['UUID1'];
  organization: Organization;
  organizationID: Scalars['UUID1'];
  subject: Scalars['String'];
  templateContent: Scalars['String'];
};

export enum EventType {
  BidCanceled = 'BidCanceled',
  BidOutBid = 'BidOutBid',
  BidWon = 'BidWon',
  LeadingBid = 'LeadingBid',
  OrderCompletion = 'OrderCompletion',
  ResetPassowrd = 'ResetPassowrd',
  TokenClaimed = 'TokenClaimed',
  TokenTransferComplete = 'TokenTransferComplete',
  UserInvitation = 'UserInvitation',
  UserSignUp = 'UserSignUp',
  VerifyAccount = 'VerifyAccount',
}

export enum ExtensionType {
  ProvenanceExtension = 'ProvenanceExtension',
  RedeemableExtension = 'RedeemableExtension',
}

export enum FilteringType {
  AllowList = 'AllowList',
}

export type IdNumber = {
  __typename?: 'IDNumber';
  stateCode: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export type IdNumberInput = {
  stateCode: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export enum IdentifierType {
  ExternalUserId = 'ExternalUserID',
  UserId = 'UserID',
  WalletAddress = 'WalletAddress',
}

export type InvoiceDetails = {
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

export type InvoiceDetailsBillingAddress = {
  __typename?: 'InvoiceDetailsBillingAddress';
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};

export enum InvoiceStatus {
  AwaitingUserPayment = 'AwaitingUserPayment',
  Canceled = 'Canceled',
  Delivered = 'Delivered',
  Draft = 'Draft',
  Expired = 'Expired',
  Failed = 'Failed',
  Paid = 'Paid',
  Pending = 'Pending',
}

export type ItemInvoiceDetail = {
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

export enum KycStatus {
  Clear = 'Clear',
  Failed1 = 'Failed1',
  Failed2 = 'Failed2',
  Level1 = 'Level1',
  Level2 = 'Level2',
  None = 'None',
  Pending = 'Pending',
}

export type LocalPrice = {
  amount: Scalars['Float'];
  currency: Scalars['String'];
};

export enum MarketCollectionStatus {
  Active = 'Active',
  Archived = 'Archived',
  Inactive = 'Inactive',
}

export type Marketplace = {
  __typename?: 'Marketplace';
  collections?: Maybe<Array<MarketplaceCollection>>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  organizationID: Scalars['String'];
  theme?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<MarketplaceToken>>;
};

export type MarketplaceAuctionBid = {
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

export type MarketplaceAuctionBidInput = {
  amount: Scalars['Float'];
  marketplaceAuctionLotId: Scalars['UUID'];
};

export type MarketplaceAuctionDefaultConfig = {
  __typename?: 'MarketplaceAuctionDefaultConfig';
  collectionId: Scalars['UUID'];
  endDate: Scalars['Time'];
  id: Scalars['UUID'];
  minIncrement: Scalars['Float'];
  reservePrice?: Maybe<Scalars['Float']>;
  startDate: Scalars['Time'];
};

export type MarketplaceAuctionFeeStructure = {
  __typename?: 'MarketplaceAuctionFeeStructure';
  buyersPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
  overheadPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
};

export type MarketplaceAuctionFeeStructureItem = {
  __typename?: 'MarketplaceAuctionFeeStructureItem';
  from: Scalars['Float'];
  rate: Scalars['Float'];
  to?: Maybe<Scalars['Float']>;
};

export type MarketplaceAuctionLot = {
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

export type MarketplaceAuctionLotBidsArgs = {
  filter?: InputMaybe<BidFilterInput>;
};

export type MarketplaceAuctionLotDefaultConfigArgs = {
  collectionId: Scalars['UUID'];
};

export type MarketplaceAuctionLotInput = {
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

export type MarketplaceAuctionLotUpdateInput = {
  delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
  endDate?: InputMaybe<Scalars['Time']>;
  lotNumber?: InputMaybe<Scalars['Int']>;
  maxEndDate?: InputMaybe<Scalars['Time']>;
  reservePrice?: InputMaybe<Scalars['Float']>;
  startDate?: InputMaybe<Scalars['Time']>;
  startingBid?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<AuctionLotStatus>;
};

export type MarketplaceBuyNowOutput = {
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

export type MarketplaceBuyNowUpdateInput = {
  delivery?: InputMaybe<MarketplaceItemDeliveryInput>;
  endDate?: InputMaybe<Scalars['Time']>;
  sortNumber?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['Time']>;
  totalUnits?: InputMaybe<Scalars['Int']>;
  unitPrice?: InputMaybe<Scalars['Float']>;
};

export type MarketplaceClaimableCodeOutput = {
  __typename?: 'MarketplaceClaimableCodeOutput';
  claimableSetID: Scalars['UUID1'];
  code: Scalars['String'];
  id: Scalars['UUID1'];
  isASingleUseCode: Scalars['Boolean'];
  redeemed: Scalars['Boolean'];
  redemptions: Array<MarketplaceClaimableCodeRedemptionOutput>;
};

export type MarketplaceClaimableCodeRedemptionOutput = {
  __typename?: 'MarketplaceClaimableCodeRedemptionOutput';
  code: Scalars['String'];
  dateClaimed?: Maybe<Scalars['Time']>;
  walletAddress?: Maybe<Scalars['String']>;
};

export type MarketplaceClaimableOutput = {
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

export type MarketplaceCollection = {
  __typename?: 'MarketplaceCollection';
  collectionType: CollectionType;
  configuration?: Maybe<MarketplaceCollectionConfiguration>;
  description: Scalars['String'];
  endDate?: Maybe<Scalars['Time']>;
  id: Scalars['UUID1'];
  items?: Maybe<Array<MarketplaceCollectionItem>>;
  itemsCount: Scalars['Int'];
  marketplaceID: Scalars['UUID1'];
  name: Scalars['String'];
  slug: Scalars['String'];
  startDate?: Maybe<Scalars['Time']>;
  status: MarketCollectionStatus;
};

export type MarketplaceCollectionItemsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  statuses?: InputMaybe<Array<InputMaybe<MarketplaceCollectionItemStatus>>>;
};

export type MarketplaceCollectionItemsCountArgs = {
  statuses?: InputMaybe<Array<InputMaybe<MarketplaceCollectionItemStatus>>>;
};

export type MarketplaceCollectionConfiguration = {
  __typename?: 'MarketplaceCollectionConfiguration';
  purchaseLimit?: Maybe<Scalars['Int']>;
  taxInvoiceSapType?: Maybe<Scalars['String']>;
  taxInvoiceSku?: Maybe<Scalars['String']>;
};

export type MarketplaceCollectionCreateInput = {
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['Time']>;
  name: Scalars['String'];
  startDate?: InputMaybe<Scalars['Time']>;
  status?: InputMaybe<MarketCollectionStatus>;
};

export type MarketplaceCollectionItem = {
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

export type MarketplaceCollectionItemDelivery =
  | MarketplaceItemDeliveryErc721Provenance
  | MarketplaceItemDeliveryErc721Transfer
  | MarketplaceItemDeliveryErc721TransferByRange
  | MarketplaceItemDeliveryErc1155OpenEdition
  | MarketplaceItemDeliveryErc1155Transfer
  | MarketplaceItemDeliveryNoOp;

export type MarketplaceCollectionItemDetails =
  | MarketplaceAuctionLot
  | MarketplaceBuyNowOutput
  | MarketplaceClaimableOutput;

export enum MarketplaceCollectionItemStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview',
}

export type MarketplaceCollectionUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Time']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Time']>;
  status?: InputMaybe<MarketCollectionStatus>;
};

export type MarketplaceItemCodeConfigInput = {
  codeValue?: InputMaybe<Scalars['String']>;
  isSingleCode: Scalars['Boolean'];
  numberOfCodes?: InputMaybe<Scalars['Int']>;
  prefix?: InputMaybe<Scalars['String']>;
};

export type MarketplaceItemDeliveryErc721Provenance = {
  __typename?: 'MarketplaceItemDeliveryERC721Provenance';
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};

export type MarketplaceItemDeliveryErc721ProvenanceInput = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};

export type MarketplaceItemDeliveryErc721Transfer = {
  __typename?: 'MarketplaceItemDeliveryERC721Transfer';
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};

export type MarketplaceItemDeliveryErc721TransferByRange = {
  __typename?: 'MarketplaceItemDeliveryERC721TransferByRange';
  contractAddress: Scalars['String'];
  fromOnChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
  toOnChainTokenId: Scalars['Int'];
};

export type MarketplaceItemDeliveryErc721TransferByRangeInput = {
  contractAddress: Scalars['String'];
  fromOnChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
  toOnChainTokenId: Scalars['Int'];
};

export type MarketplaceItemDeliveryErc721TransferInput = {
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};

export type MarketplaceItemDeliveryErc1155OpenEdition = {
  __typename?: 'MarketplaceItemDeliveryERC1155OpenEdition';
  contractId: Scalars['UUID1'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};

export type MarketplaceItemDeliveryErc1155OpenEditionInput = {
  contractId: Scalars['UUID1'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};

export type MarketplaceItemDeliveryErc1155Transfer = {
  __typename?: 'MarketplaceItemDeliveryERC1155Transfer';
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};

export type MarketplaceItemDeliveryErc1155TransferInput = {
  amount: Scalars['Int'];
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  ownerWalletId: Scalars['UUID1'];
};

export type MarketplaceItemDeliveryInput = {
  ERC721Provenance?: InputMaybe<MarketplaceItemDeliveryErc721ProvenanceInput>;
  ERC721Transfer?: InputMaybe<MarketplaceItemDeliveryErc721TransferInput>;
  ERC721TransferByRange?: InputMaybe<MarketplaceItemDeliveryErc721TransferByRangeInput>;
  ERC1155OpenEdition?: InputMaybe<MarketplaceItemDeliveryErc1155OpenEditionInput>;
  ERC1155Transfer?: InputMaybe<MarketplaceItemDeliveryErc1155TransferInput>;
  NoOp?: InputMaybe<MarketplaceItemDeliveryNoOpInput>;
  deliveryMethod: DeliveryMethod;
};

export type MarketplaceItemDeliveryNoOp = {
  __typename?: 'MarketplaceItemDeliveryNoOp';
  notes?: Maybe<Scalars['String']>;
};

export type MarketplaceItemDeliveryNoOpInput = {
  notes?: InputMaybe<Scalars['String']>;
};

export enum MarketplaceSaleType {
  Auction = 'Auction',
  BuyNow = 'BuyNow',
  Claimable = 'Claimable',
}

export type MarketplaceToken = {
  __typename?: 'MarketplaceToken';
  id: Scalars['UUID'];
  isTransferDisabled: Scalars['Boolean'];
  marketplaceID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  nftContractAddress: Scalars['String'];
  nftToken: NftToken;
  nftTokenID?: Maybe<Scalars['UUID']>;
  onChainTokenID: Scalars['Int'];
};

export type MarketplaceUser = {
  __typename?: 'MarketplaceUser';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  username?: Maybe<Scalars['String']>;
};

export type MetadataAttributes = {
  __typename?: 'MetadataAttributes';
  displayType?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['Int']>;
  traitType: Scalars['String'];
  value: AttributeValue;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAllowListToBuyNowLot: Scalars['Boolean'];
  addAllowListToClaimableSet: Scalars['Boolean'];
  /**
   * Add an existing lot to User favorite lots list.
   *     If lot is already exists, then do nothing.
   *     If provided lot is invalid or not exists, then error message will be returned.
   */
  addCollectionItemToUserFavorites: Scalars['Boolean'];
  addExistingTokenToCollection: Scalars['String'];
  /** addMultisigOwner mutation adds new owner for the existing multisig wallet */
  addMultisigOwner: Wallet;
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
  /** Creates email template record for given orgID and EventType */
  createEmailTemplate: EmailTemplate;
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
  delayedTransferToken: TokenTransfers;
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
  processTokenTranfer: TokenTransfers;
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
  removeAllowListFromClaimableSet: Scalars['Boolean'];
  reserveMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  sendUserInvitation: Scalars['Boolean'];
  setContractRoyalties: Scalars['String'];
  setJwtIssuerDomain: Organization;
  startInvoiceDelivery: Scalars['Boolean'];
  /** Transfers a token in the provided wallet to the `transferTo` address */
  transferToken: Scalars['String'];
  updateAfterPaymentTransferSuspendTime: Scalars['Boolean'];
  updateAllowList: Scalars['Boolean'];
  /** Updates existing  Applicant based on input data. */
  updateApplicant: ApplicantResponse;
  updateBuyNowInvoiceExpiryMins: Scalars['Boolean'];
  /** Updates email_template for given id */
  updateEmailTemplate: Scalars['Boolean'];
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

export type MutationAddAllowListToBuyNowLotArgs = {
  allowListID: Scalars['UUID1'];
  buyNowLotID: Scalars['UUID1'];
};

export type MutationAddAllowListToClaimableSetArgs = {
  allowListID: Scalars['UUID1'];
  claimableSetID: Scalars['UUID1'];
};

export type MutationAddCollectionItemToUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};

export type MutationAddExistingTokenToCollectionArgs = {
  marketplaceId: Scalars['UUID1'];
  tokenId: Scalars['UUID1'];
};

export type MutationAddMultisigOwnerArgs = {
  newAddress: Scalars['String'];
  walletID: Scalars['UUID1'];
};

export type MutationAddOrganizationArgs = {
  handle: Scalars['String'];
  name: Scalars['String'];
};

export type MutationAddTokensToCollectionArgs = {
  marketplaceId: Scalars['UUID1'];
  tokenIds: Array<Scalars['UUID1']>;
};

export type MutationAddressScreeningArgs = {
  input: AddressScreeningInput;
  orgID: Scalars['UUID1'];
};

export type MutationBurnTokenArgs = {
  contractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
  walletId: Scalars['UUID1'];
};

export type MutationCancelMarketplaceAuctionBidArgs = {
  bidID: Scalars['UUID1'];
  marketplaceID: Scalars['UUID1'];
};

export type MutationCancelPaymentArgs = {
  orgID: Scalars['UUID1'];
  paymentID: Scalars['UUID1'];
};

export type MutationCancelTokenTransferArgs = {
  orgID: Scalars['UUID1'];
  tokenTransferID: Scalars['UUID1'];
};

export type MutationCheckTokenOwnersArgs = {
  contractId: Scalars['UUID1'];
  rangeEnd: Scalars['Int'];
  rangeStart: Scalars['Int'];
  walletAddress: Scalars['String'];
};

export type MutationCheckWalletTokensArgs = {
  chainId: Scalars['Int'];
  contractAddress: Scalars['String'];
  rangeEnd: Scalars['Int'];
  rangeStart: Scalars['Int'];
};

export type MutationCreateAllowListArgs = {
  allowListInput: AllowListInput;
  orgID: Scalars['UUID1'];
};

export type MutationCreateApplicantArgs = {
  input: ApplicantRequest;
  orgID: Scalars['UUID1'];
};

export type MutationCreateAuctionLotInvoiceArgs = {
  lotID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
};

export type MutationCreateCheckArgs = {
  applicantID: Scalars['String'];
};

export type MutationCreateEmailTemplateArgs = {
  input: CreateEmailTemplateInput;
};

export type MutationCreateMarketplaceAuctionBidArgs = {
  marketplaceAuctionBid: MarketplaceAuctionBidInput;
};

export type MutationCreateMarketplaceAuctionLotArgs = {
  marketplaceAuctionLot: MarketplaceAuctionLotInput;
};

export type MutationCreateMarketplaceBuyNowLotArgs = {
  input: CreateMarketplaceBuyNowLotInput;
};

export type MutationCreateMarketplaceClaimableSetArgs = {
  input: CreateMarketplaceClaimableSetInput;
};

export type MutationCreateMarketplaceCollectionArgs = {
  data: MarketplaceCollectionCreateInput;
  marketplaceID: Scalars['String'];
};

export type MutationCreateOrgByUserArgs = {
  handle: Scalars['String'];
  name: Scalars['String'];
};

export type MutationCreateOrgMultisigArgs = {
  chainId: Scalars['Int'];
  name: Scalars['String'];
  orgId: Scalars['UUID1'];
};

export type MutationCreatePaymentArgs = {
  invoiceID: Scalars['UUID1'];
  metadata?: InputMaybe<CreatePaymentMetadataInput>;
  paymentMethodID: Scalars['UUID1'];
};

export type MutationCreatePaymentMethodArgs = {
  input: PaymentMethodCreateInput;
  orgID: Scalars['UUID1'];
};

export type MutationCreateTokenDraftArgs = {
  contractId: Scalars['UUID1'];
  tokens: Array<TokenDraft>;
};

export type MutationCreateUserApiKeyArgs = {
  orgId: Scalars['UUID1'];
};

export type MutationDelayedTransferTokenArgs = {
  amount: Scalars['Int'];
  contractAddress: Scalars['String'];
  tokenOnChainId: Scalars['Int'];
  tokenType: TokenType;
  transferTo: Scalars['String'];
  walletId: Scalars['UUID1'];
};

export type MutationDeleteAssetArgs = {
  assetId: Scalars['UUID1'];
};

export type MutationDeleteCollectionItemFromUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};

export type MutationDeleteOrgUserArgs = {
  organizationID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};

export type MutationDeletePaymentMethodArgs = {
  orgID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
};

export type MutationDeleteTokenArgs = {
  tokenId: Scalars['UUID1'];
};

export type MutationDeleteUserApiKeyArgs = {
  keyId: Scalars['UUID1'];
};

export type MutationDeleteUserInvitationArgs = {
  email: Scalars['String'];
  orgId: Scalars['UUID1'];
};

export type MutationDeployWalletToNetworkArgs = {
  networkId: Scalars['UUID1'];
  walletId: Scalars['UUID1'];
};

export type MutationGeneratePromoCodesArgs = {
  marketplaceCollectionItemId: Scalars['UUID1'];
  num: Scalars['Int'];
};

export type MutationImportExternalTokenToCollectionArgs = {
  contractAddress: Scalars['String'];
  marketplaceId: Scalars['UUID1'];
  onChainId: Scalars['Int'];
};

export type MutationListWalletsWithTokenArgs = {
  contractAddress: Scalars['String'];
  endDate: Scalars['Time'];
  networkId: Scalars['UUID1'];
  startDate: Scalars['Time'];
};

export type MutationLoginWithSignatureArgs = {
  orgID: Scalars['UUID1'];
  request: SignInRequest;
};

export type MutationMarketplaceUpdateThemeArgs = {
  id: Scalars['String'];
  theme: Scalars['String'];
};

export type MutationMintTokensArgs = {
  tokenIds: Array<Scalars['UUID1']>;
};

export type MutationNftContractAddAdminArgs = {
  address: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};

export type MutationNftContractExtensionMintBatchArgs = {
  amountToMint: Scalars['Int'];
  extensionAddress: Scalars['String'];
  mintToAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};

export type MutationNftContractExtensionPauseArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};

export type MutationNftContractExtensionProvenanceMintArgs = {
  contractId: Scalars['UUID1'];
  extensionAddress: Scalars['String'];
  mintToAddress: Scalars['String'];
  numberOfTokens: Scalars['Int'];
  voucherId: Scalars['UUID1'];
};

export type MutationNftContractExtensionRedeemableRedeemTokenArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
};

export type MutationNftContractExtensionSetBaseUriArgs = {
  baseURI: Scalars['String'];
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};

export type MutationNftContractExtensionSetProvenanceHashArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
  provenanceHash: Scalars['String'];
};

export type MutationNftContractExtensionUnpauseArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};

export type MutationNftContractRegisterExtensionArgs = {
  contractId: Scalars['UUID1'];
  extensionType: ExtensionType;
  maxTokenSupply: Scalars['Int'];
};

export type MutationNftContractSetTokenUriArgs = {
  nftContractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
  uri: Scalars['String'];
};

export type MutationNftDeployContractArgs = {
  input: DeployContractInput;
};

export type MutationOrgCreateMarketplaceArgs = {
  name: Scalars['String'];
  orgId?: InputMaybe<Scalars['UUID1']>;
};

export type MutationProcessTokenTranferArgs = {
  orgID: Scalars['UUID1'];
  tokenTransferID: Scalars['UUID1'];
};

export type MutationRedeemClaimableArgs = {
  claimableId: Scalars['String'];
  destAddr?: InputMaybe<Scalars['String']>;
};

export type MutationRedeemClaimableCodeArgs = {
  code: Scalars['String'];
  destAddr?: InputMaybe<Scalars['String']>;
};

export type MutationRedeemClaimableItemArgs = {
  claimableItemId: Scalars['UUID1'];
  destAddr?: InputMaybe<Scalars['String']>;
};

export type MutationRedeemPromoCodeArgs = {
  code: Scalars['String'];
  destAddr?: InputMaybe<Scalars['String']>;
};

export type MutationReleaseReservationArgs = {
  invoiceID: Scalars['UUID1'];
  orgID?: InputMaybe<Scalars['UUID1']>;
};

export type MutationRemoveAllowListFromBuyNowLotArgs = {
  buyNowLotID: Scalars['UUID1'];
};

export type MutationRemoveAllowListFromClaimableSetArgs = {
  claimableSetID: Scalars['UUID1'];
};

export type MutationReserveMarketplaceBuyNowLotArgs = {
  input: ReserveMarketplaceBuyNowLotInput;
};

export type MutationSendUserInvitationArgs = {
  email: Scalars['String'];
  orgId: Scalars['UUID1'];
};

export type MutationSetContractRoyaltiesArgs = {
  basisPoints: Array<Scalars['Int']>;
  extensionAddress?: InputMaybe<Scalars['String']>;
  nftContractId: Scalars['UUID1'];
  receivers: Array<Scalars['String']>;
};

export type MutationSetJwtIssuerDomainArgs = {
  domain: Scalars['String'];
  orgId: Scalars['UUID'];
};

export type MutationStartInvoiceDeliveryArgs = {
  invoiceID: Scalars['UUID1'];
};

export type MutationTransferTokenArgs = {
  amount?: InputMaybe<Scalars['Int']>;
  contractAddress: Scalars['String'];
  tokenOnChainId: Scalars['Int'];
  tokenType?: InputMaybe<TokenType>;
  transferTo: Scalars['String'];
  walletId: Scalars['UUID1'];
};

export type MutationUpdateAfterPaymentTransferSuspendTimeArgs = {
  afterPaymentTransferSuspendTime: Scalars['Int'];
  orgID: Scalars['UUID1'];
};

export type MutationUpdateAllowListArgs = {
  allowListID: Scalars['UUID1'];
  elementsToAdd?: InputMaybe<Array<Scalars['String']>>;
  elementsToRemove?: InputMaybe<Array<Scalars['String']>>;
  endTime?: InputMaybe<Scalars['Time']>;
  orgID: Scalars['UUID1'];
  startTime?: InputMaybe<Scalars['Time']>;
};

export type MutationUpdateApplicantArgs = {
  applicantID: Scalars['String'];
  input: ApplicantRequest;
};

export type MutationUpdateBuyNowInvoiceExpiryMinsArgs = {
  buyNowInvoiceExpiryMins: Scalars['Int'];
  orgID: Scalars['UUID1'];
};

export type MutationUpdateEmailTemplateArgs = {
  id: Scalars['UUID1'];
  input: CreateEmailTemplateInput;
};

export type MutationUpdateMarketplaceAuctionLotArgs = {
  data: MarketplaceAuctionLotUpdateInput;
  marketplaceAuctionLotId: Scalars['UUID'];
};

export type MutationUpdateMarketplaceBuyNowLotArgs = {
  input: MarketplaceBuyNowUpdateInput;
  marketplaceBuyNowLotID: Scalars['UUID'];
};

export type MutationUpdateMarketplaceClaimableSetArgs = {
  input: UpdateMarketplaceClaimableSetInput;
  marketplaceClaimableSetID: Scalars['UUID1'];
};

export type MutationUpdateMarketplaceCollectionArgs = {
  data: MarketplaceCollectionUpdateInput;
  id: Scalars['UUID1'];
};

export type MutationUpdateMultisigNameArgs = {
  newName: Scalars['String'];
  walletID: Scalars['UUID1'];
};

export type MutationUpdatePaymentMethodArgs = {
  input: PaymentMethodUpdateInput;
  orgID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
};

export type MutationUpdateTokenDraftArgs = {
  token: TokenDraft;
};

export type MutationUpdateUserOrgRoleArgs = {
  orgID: Scalars['UUID'];
  role: Scalars['String'];
  userID: Scalars['UUID'];
};

export type MutationUpdateUserOrgSettingsArgs = {
  params: SettingsInput;
};

export type MutationUploadArweaveAssetArgs = {
  assetVersionId: Scalars['UUID1'];
};

export type MutationUploadArweaveMetadataArgs = {
  tokenId: Scalars['UUID1'];
};

export type MutationUploadAssetArgs = {
  file: Scalars['Upload'];
  name: Scalars['String'];
  orgId: Scalars['UUID1'];
};

export type MutationUploadAssetsArgs = {
  files: Array<InputMaybe<Scalars['Upload']>>;
  orgId: Scalars['UUID1'];
};

export type MutationVerifySignatureArgs = {
  address: Scalars['String'];
  message: Scalars['String'];
  signature: Scalars['String'];
};

export type NftContract = {
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

export type NftContractType = {
  __typename?: 'NFTContractType';
  id: Scalars['UUID1'];
  name: Scalars['String'];
};

export type NftMetadata = {
  __typename?: 'NFTMetadata';
  copyright?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type NftToken = {
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

export type Network = {
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

export type Organization = {
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

export type OrganizationAssetsArgs = {
  filter?: InputMaybe<AssetFilter>;
};

export type OrganizationMembersArgs = {
  filter?: InputMaybe<OrganizationMemberFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type OrganizationMember = {
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

export type OrganizationMemberFilter = {
  externalUserId?: InputMaybe<Scalars['String']>;
};

export type PaginatedMarketplaceClaimableCodeOutput = {
  __typename?: 'PaginatedMarketplaceClaimableCodeOutput';
  count?: Maybe<Scalars['Int']>;
  results: Array<MarketplaceClaimableCodeOutput>;
};

export type Payment = {
  __typename?: 'Payment';
  circlePaymentID: Scalars['String'];
  id: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
  status: PaymentStatus;
  userID: Scalars['UUID1'];
};

export type PaymentDetails = CryptoPaymentDetails;

export type PaymentMethodCreateInput = {
  achData?: InputMaybe<AchData>;
  creditCardData?: InputMaybe<CreditCardData>;
  paymentType: PaymentType;
  wireData?: InputMaybe<WireData>;
};

export type PaymentMethodOutput =
  | AchPaymentMethodOutput
  | CreditCardPaymentMethodOutput
  | CryptoPaymentMethodOutput
  | WirePaymentMethodOutput;

export type PaymentMethodPrepareStatementOutput = AchPaymentMethodPrepareStatementOutput;

export type PaymentMethodUpdateInput = {
  achData?: InputMaybe<AchData>;
  creditCardData?: InputMaybe<CreditCardData>;
  paymentType: PaymentType;
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
  details?: Maybe<PaymentDetails>;
  id: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
  processorPaymentID: Scalars['String'];
  status: PaymentStatus;
  userID: Scalars['UUID1'];
};

export type PaymentPublicKey = {
  __typename?: 'PaymentPublicKey';
  keyID: Scalars['String'];
  publicKey: Scalars['String'];
};

export enum PaymentStatus {
  ActionRequired = 'action_required',
  Confirmed = 'confirmed',
  Failed = 'failed',
  Paid = 'paid',
  Pending = 'pending',
}

export enum PaymentType {
  Ach = 'ACH',
  CreditCard = 'CreditCard',
  Crypto = 'Crypto',
  Wire = 'Wire',
}

export type Query = {
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
  getAllowList: AllowList;
  getAllowLists?: Maybe<Array<AllowList>>;
  /** Retrieves applicant details by organizationID */
  getApplicant: ApplicantResponse;
  /** Get Available Claimables */
  getAvailableClaimables: Scalars['Int'];
  getBuyNowBuyerInfo?: Maybe<Array<BuyerDetailOutput>>;
  getClaimableCodesForSetId: PaginatedMarketplaceClaimableCodeOutput;
  /** Retrieves Discount codes by Invoice Item ID */
  getDiscountCodes: Array<Maybe<DiscountCode>>;
  /** Retrieves email templates for organizationID and filters by eventType if provided  */
  getEmailTemplateByOrgIDAndEventType: Array<Maybe<EmailTemplate>>;
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
  /** getSignatureMessage returns a message that should be used for in signing process */
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
  isUserOnClaimableSetsAllowList: Scalars['Boolean'];
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
  /**  tokenOwners returns the list of token owners */
  tokenOwners: Array<Maybe<TokenOwnersResponse>>;
  validateIp: ValidateIpResponse;
  /** Validate Payment limit */
  validatePaymentLimit: ValidatePaymentLimitOutput;
  validateTokenTransfer: Scalars['Boolean'];
  wallet: Wallet;
};

export type QueryApplyDiscountCodeArgs = {
  discountCode: Scalars['String'];
  invoiceItemID: Scalars['UUID1'];
};

export type QueryAvailableClaimablesArgs = {
  claimableSetID: Scalars['UUID1'];
};

export type QueryCanRedeemClaimableArgs = {
  claimableID: Scalars['String'];
};

export type QueryCanRedeemClaimableItemArgs = {
  claimableItemID: Scalars['UUID1'];
  destAddr?: InputMaybe<Scalars['String']>;
};

export type QueryCollectionArgs = {
  id: Scalars['String'];
};

export type QueryCollectionBySlugArgs = {
  marketplaceID: Scalars['UUID1'];
  slug: Scalars['String'];
};

export type QueryCollectionItemByIdArgs = {
  id: Scalars['UUID1'];
};

export type QueryGetAllowListArgs = {
  allowListID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
};

export type QueryGetAllowListsArgs = {
  orgID: Scalars['UUID1'];
};

export type QueryGetApplicantArgs = {
  organizationID: Scalars['UUID1'];
};

export type QueryGetAvailableClaimablesArgs = {
  claimableId: Scalars['String'];
};

export type QueryGetBuyNowBuyerInfoArgs = {
  itemId: Scalars['UUID1'];
};

export type QueryGetClaimableCodesForSetIdArgs = {
  claimableSetID: Scalars['UUID1'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type QueryGetDiscountCodesArgs = {
  invoiceItemID: Scalars['UUID1'];
};

export type QueryGetEmailTemplateByOrgIdAndEventTypeArgs = {
  eventType?: InputMaybe<EventType>;
  orgID: Scalars['UUID1'];
};

export type QueryGetInvoiceDetailsArgs = {
  invoiceID: Scalars['UUID1'];
};

export type QueryGetInvoicesByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};

export type QueryGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};

export type QueryGetMyInvoicesArgs = {
  returnAllStatuses?: InputMaybe<Scalars['Boolean']>;
};

export type QueryGetPaymentMethodArgs = {
  paymentMethodID: Scalars['UUID1'];
};

export type QueryGetPaymentMethodListArgs = {
  orgID: Scalars['UUID1'];
};

export type QueryGetPaymentPublicKeyArgs = {
  orgID: Scalars['UUID1'];
};

export type QueryGetPaymentsByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};

export type QueryGetSdkTokenArgs = {
  applicantID: Scalars['String'];
  referrer: Scalars['String'];
};

export type QueryGetSignatureMessageArgs = {
  orgID: Scalars['UUID1'];
};

export type QueryGetTaxQuoteArgs = {
  input: TaxQuoteInput;
};

export type QueryGetTokenTransfersHistoryArgs = {
  orgId: Scalars['UUID1'];
};

export type QueryGetUserByWalletAddressArgs = {
  address: Scalars['String'];
  orgId: Scalars['UUID1'];
};

export type QueryGetUserInvitationsArgs = {
  orgId: Scalars['UUID1'];
};

export type QueryGetWalletDeliveryCountArgs = {
  internalWallets: Scalars['Boolean'];
  marketplaceCollectionId: Scalars['UUID1'];
};

export type QueryInternalUsersArgs = {
  organizationID: Scalars['UUID1'];
};

export type QueryIsTokenRedeemedArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
  tokenId: Scalars['Int'];
};

export type QueryIsUserOnAllowListArgs = {
  lotID: Scalars['UUID1'];
};

export type QueryIsUserOnClaimableSetsAllowListArgs = {
  claimableSetID: Scalars['UUID1'];
};

export type QueryMailInvoiceLotDetailReportMailByCollectionIdArgs = {
  collectionID: Scalars['UUID1'];
  toEmail: Scalars['String'];
};

export type QueryMailSalesReportByCollectionIdArgs = {
  collectionID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
  toEmail: Scalars['String'];
};

export type QueryMarketplaceArgs = {
  id: Scalars['UUID'];
};

export type QueryNetworkArgs = {
  id: Scalars['UUID1'];
};

export type QueryNftContractArgs = {
  id: Scalars['UUID1'];
};

export type QueryNftTokenArgs = {
  id: Scalars['UUID1'];
};

export type QueryOrgUsernameAvailableArgs = {
  organizationID: Scalars['UUID1'];
  username: Scalars['String'];
};

export type QueryOrganizationArgs = {
  handle: Scalars['String'];
};

export type QueryOrganizationByIdArgs = {
  id: Scalars['UUID1'];
};

export type QueryPreparePaymentMethodArgs = {
  orgID?: InputMaybe<Scalars['UUID1']>;
  paymentMethodType: PaymentType;
};

export type QueryTokenOwnersArgs = {
  chainId: Scalars['Int'];
  contractAddress: Scalars['String'];
  tokenIds: Array<Scalars['Int']>;
};

export type QueryValidateIpArgs = {
  ip: Scalars['String'];
  organizationID: Scalars['UUID1'];
};

export type QueryValidatePaymentLimitArgs = {
  collectionID: Scalars['UUID1'];
  itemsCount: Scalars['Int'];
};

export type QueryValidateTokenTransferArgs = {
  contractAddress: Scalars['String'];
  onChainTokenId: Scalars['Int'];
  walletId: Scalars['UUID1'];
};

export type QueryWalletArgs = {
  id: Scalars['UUID1'];
};

export type ReserveMarketplaceBuyNowLotInput = {
  itemCount: Scalars['Int'];
  marketplaceBuyNowLotID: Scalars['UUID1'];
};

export enum RiskRating {
  High = 'High',
  Low = 'Low',
}

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export type SdkTokenResponse = {
  __typename?: 'SDKTokenResponse';
  token: Scalars['String'];
};

export type SettingsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  settingsJson?: InputMaybe<Scalars['String']>;
  userOrgId: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type SignInRequest = {
  chainID: Scalars['Int'];
  challenge: Scalars['String'];
  signature: Scalars['String'];
  signer: Scalars['String'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  me: CurrentUser;
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  auctionLotUpdated: MarketplaceAuctionLot;
  bidFeed: MarketplaceAuctionBid;
  /** Returns a MarketplaceAuctionLot on subscribe and whenever a new bid is placed */
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  /** Subscribes to lots and bids updates within given marketplace collection */
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
  NoOp = 'NoOp',
  TaxJar = 'TaxJar',
  Vertex = 'Vertex',
}

export type TaxQuoteBillingAddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};

export type TaxQuoteBillingAddressOutput = {
  __typename?: 'TaxQuoteBillingAddressOutput';
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};

export type TaxQuoteInput = {
  address: TaxQuoteBillingAddressInput;
  orgID: Scalars['UUID1'];
  taxablePrice: Scalars['Float'];
};

export type TaxQuoteOutput = {
  __typename?: 'TaxQuoteOutput';
  taxablePrice: Scalars['Float'];
  totalTaxAmount: Scalars['Float'];
  totalTaxedPrice: Scalars['Float'];
  verifiedAddress: TaxQuoteBillingAddressOutput;
};

export type TokenDraft = {
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

export type TokenOwner = {
  __typename?: 'TokenOwner';
  tokenId: Scalars['Int'];
  walletAddress: Scalars['String'];
};

export type TokenOwnersResponse = {
  __typename?: 'TokenOwnersResponse';
  owners: Array<Maybe<Scalars['String']>>;
  tokenId: Scalars['Int'];
};

export type TokenTransfers = {
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
  token: MarketplaceToken;
  tokenOnChainId?: Maybe<Scalars['Int']>;
  tokenType?: Maybe<TokenType>;
  transactionHash?: Maybe<Scalars['String']>;
  transferTo?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Time'];
  userId?: Maybe<Scalars['UUID1']>;
  walletId?: Maybe<Scalars['UUID1']>;
};

export enum TokenType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}

export enum TransactionStatus {
  Completed = 'Completed',
  Failed = 'Failed',
  Pending = 'Pending',
}

export enum TransactionType {
  DeployMultisig = 'DeployMultisig',
  TransferToken = 'TransferToken',
}

export enum TransferStatus {
  Canceled = 'Canceled',
  Failed = 'Failed',
  InProgress = 'InProgress',
  Queued = 'Queued',
  Success = 'Success',
}

export type UpdateMarketplaceClaimableSetInput = {
  endDate?: InputMaybe<Scalars['Time']>;
  startDate?: InputMaybe<Scalars['Time']>;
  totalAvailableUnits?: InputMaybe<Scalars['Int']>;
  totalUnits?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserApiKeyResponse = {
  __typename?: 'UserAPIKeyResponse';
  createdAt?: Maybe<Scalars['Time']>;
  id?: Maybe<Scalars['UUID1']>;
  key?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Time']>;
};

export type UserInvitation = {
  __typename?: 'UserInvitation';
  email: Scalars['String'];
  id: Scalars['UUID'];
  status: Scalars['String'];
};

export type UserOrgFilter = {
  orgId: Scalars['UUID'];
};

export type UserOrganization = {
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

export type ValidateIpResponse = {
  __typename?: 'ValidateIPResponse';
  Success: Scalars['Boolean'];
  ipScreeningId: Scalars['UUID1'];
};

export type ValidatePaymentLimitData = {
  __typename?: 'ValidatePaymentLimitData';
  isLimitExceeded: Scalars['Boolean'];
  remainingTotal: Scalars['Int'];
  remainingTransaction: Scalars['Int'];
};

export type ValidatePaymentLimitOutput = {
  __typename?: 'ValidatePaymentLimitOutput';
  ach: ValidatePaymentLimitData;
  creditCard: ValidatePaymentLimitData;
  wire: ValidatePaymentLimitData;
};

export type Wallet = {
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

export enum WalletParentType {
  Organization = 'organization',
  User = 'user',
}

export type WalletToken = {
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

export enum WalletTxType {
  MojitoHotWallet = 'MojitoHotWallet',
  Multisig = 'Multisig',
}

export type WireBankAddress = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
};

export type WireBankAddressOutput = {
  __typename?: 'WireBankAddressOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
};

export type WireBeneficiary = {
  __typename?: 'WireBeneficiary';
  address1: Scalars['String'];
  address2: Scalars['String'];
  name: Scalars['String'];
};

export type WireBeneficiaryBank = {
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

export type WireBillingDetails = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type WireBillingDetailsOutput = {
  __typename?: 'WireBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type WireData = {
  accountNumber: Scalars['String'];
  bankAddress: WireBankAddress;
  billingDetails: WireBillingDetails;
  routingNumber: Scalars['String'];
};

export type WireInstructions = {
  __typename?: 'WireInstructions';
  beneficiary: WireBeneficiary;
  beneficiaryBank: WireBeneficiaryBank;
  trackingRef: Scalars['String'];
};

export type WirePaymentMethodOutput = {
  __typename?: 'WirePaymentMethodOutput';
  bankAddress?: Maybe<WireBankAddressOutput>;
  billingDetails?: Maybe<WireBillingDetailsOutput>;
  description: Scalars['String'];
  id: Scalars['UUID1'];
  instructions?: Maybe<WireInstructions>;
  status: Scalars['String'];
  type: PaymentType;
};
