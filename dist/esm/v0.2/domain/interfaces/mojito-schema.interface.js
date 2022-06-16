export var AuctionBidOrder;

(function (AuctionBidOrder) {
  AuctionBidOrder['Asc'] = 'ASC';
  AuctionBidOrder['Desc'] = 'DESC';
})(AuctionBidOrder || (AuctionBidOrder = {}));

export var AuctionLotStatus;

(function (AuctionLotStatus) {
  AuctionLotStatus['Active'] = 'Active';
  AuctionLotStatus['Completed'] = 'Completed';
  AuctionLotStatus['Hidden'] = 'Hidden';
  AuctionLotStatus['Preview'] = 'Preview';
})(AuctionLotStatus || (AuctionLotStatus = {}));

export var CollectionType;

(function (CollectionType) {
  CollectionType['Auction'] = 'Auction';
  CollectionType['Tk2'] = 'TK2';
})(CollectionType || (CollectionType = {}));

export var ContractType;

(function (ContractType) {
  ContractType['Erc721Creator'] = 'ERC721Creator';
  ContractType['Erc1155Creator'] = 'ERC1155Creator';
})(ContractType || (ContractType = {}));

export var DeliveryMethod;

(function (DeliveryMethod) {
  DeliveryMethod['Erc721Provenance'] = 'ERC721Provenance';
  DeliveryMethod['Erc721Transfer'] = 'ERC721Transfer';
  DeliveryMethod['Erc721TransferByRange'] = 'ERC721TransferByRange';
  DeliveryMethod['Erc1155OpenEdition'] = 'ERC1155OpenEdition';
  DeliveryMethod['Erc1155Transfer'] = 'ERC1155Transfer';
  DeliveryMethod['NoOp'] = 'NoOp';
})(DeliveryMethod || (DeliveryMethod = {}));

export var ExtensionType;

(function (ExtensionType) {
  ExtensionType['ProvenanceExtension'] = 'ProvenanceExtension';
  ExtensionType['RedeemableExtension'] = 'RedeemableExtension';
})(ExtensionType || (ExtensionType = {}));

export var FilteringType;

(function (FilteringType) {
  FilteringType['AllowList'] = 'AllowList';
})(FilteringType || (FilteringType = {}));

export var IdentifierType;

(function (IdentifierType) {
  IdentifierType['ExternalUserId'] = 'ExternalUserID';
  IdentifierType['UserId'] = 'UserID';
})(IdentifierType || (IdentifierType = {}));

export var InvoiceStatus;

(function (InvoiceStatus) {
  InvoiceStatus['AwaitingUserPayment'] = 'AwaitingUserPayment';
  InvoiceStatus['Canceled'] = 'Canceled';
  InvoiceStatus['Delivered'] = 'Delivered';
  InvoiceStatus['Draft'] = 'Draft';
  InvoiceStatus['Expired'] = 'Expired';
  InvoiceStatus['Failed'] = 'Failed';
  InvoiceStatus['Paid'] = 'Paid';
  InvoiceStatus['Pending'] = 'Pending';
})(InvoiceStatus || (InvoiceStatus = {}));

export var KycStatus;

(function (KycStatus) {
  KycStatus['Clear'] = 'Clear';
  KycStatus['Failed1'] = 'Failed1';
  KycStatus['Failed2'] = 'Failed2';
  KycStatus['Level1'] = 'Level1';
  KycStatus['Level2'] = 'Level2';
  KycStatus['None'] = 'None';
  KycStatus['Pending'] = 'Pending';
})(KycStatus || (KycStatus = {}));

export var MarketCollectionStatus;

(function (MarketCollectionStatus) {
  MarketCollectionStatus['Active'] = 'Active';
  MarketCollectionStatus['Archived'] = 'Archived';
  MarketCollectionStatus['Inactive'] = 'Inactive';
})(MarketCollectionStatus || (MarketCollectionStatus = {}));

export var MarketplaceCollectionItemStatus;

(function (MarketplaceCollectionItemStatus) {
  MarketplaceCollectionItemStatus['Active'] = 'Active';
  MarketplaceCollectionItemStatus['Completed'] = 'Completed';
  MarketplaceCollectionItemStatus['Hidden'] = 'Hidden';
  MarketplaceCollectionItemStatus['Preview'] = 'Preview';
})(MarketplaceCollectionItemStatus || (MarketplaceCollectionItemStatus = {}));

export var MarketplaceSaleType;

(function (MarketplaceSaleType) {
  MarketplaceSaleType['Auction'] = 'Auction';
  MarketplaceSaleType['BuyNow'] = 'BuyNow';
  MarketplaceSaleType['Claimable'] = 'Claimable';
})(MarketplaceSaleType || (MarketplaceSaleType = {}));

export var PaymentStatus;

(function (PaymentStatus) {
  PaymentStatus['ActionRequired'] = 'action_required';
  PaymentStatus['Confirmed'] = 'confirmed';
  PaymentStatus['Failed'] = 'failed';
  PaymentStatus['Paid'] = 'paid';
  PaymentStatus['Pending'] = 'pending';
})(PaymentStatus || (PaymentStatus = {}));

export var PaymentType;

(function (PaymentType) {
  PaymentType['Ach'] = 'ACH';
  PaymentType['CreditCard'] = 'CreditCard';
  PaymentType['Crypto'] = 'Crypto';
  PaymentType['Wire'] = 'Wire';
})(PaymentType || (PaymentType = {}));

export var RiskRating;

(function (RiskRating) {
  RiskRating['High'] = 'High';
  RiskRating['Low'] = 'Low';
})(RiskRating || (RiskRating = {}));

export var Role;

(function (Role) {
  Role['Admin'] = 'admin';
  Role['User'] = 'user';
})(Role || (Role = {}));

export var TaxProvider;

(function (TaxProvider) {
  TaxProvider['NoOp'] = 'NoOp';
  TaxProvider['TaxJar'] = 'TaxJar';
  TaxProvider['Vertex'] = 'Vertex';
})(TaxProvider || (TaxProvider = {}));

export var TokenType;

(function (TokenType) {
  TokenType['Erc721'] = 'ERC721';
  TokenType['Erc1155'] = 'ERC1155';
})(TokenType || (TokenType = {}));

export var TransactionStatus;

(function (TransactionStatus) {
  TransactionStatus['Completed'] = 'Completed';
  TransactionStatus['Failed'] = 'Failed';
  TransactionStatus['Pending'] = 'Pending';
})(TransactionStatus || (TransactionStatus = {}));

export var TransactionType;

(function (TransactionType) {
  TransactionType['DeployMultisig'] = 'DeployMultisig';
  TransactionType['TransferToken'] = 'TransferToken';
})(TransactionType || (TransactionType = {}));

export var TransferStatus;

(function (TransferStatus) {
  TransferStatus['Canceled'] = 'Canceled';
  TransferStatus['Failed'] = 'Failed';
  TransferStatus['InProgress'] = 'InProgress';
  TransferStatus['Queued'] = 'Queued';
  TransferStatus['Success'] = 'Success';
})(TransferStatus || (TransferStatus = {}));

export var WalletParentType;

(function (WalletParentType) {
  WalletParentType['Organization'] = 'organization';
  WalletParentType['User'] = 'user';
})(WalletParentType || (WalletParentType = {}));

export var WalletTxType;

(function (WalletTxType) {
  WalletTxType['MojitoHotWallet'] = 'MojitoHotWallet';
  WalletTxType['Multisig'] = 'Multisig';
})(WalletTxType || (WalletTxType = {}));
