'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.WalletTxType =
  exports.WalletParentType =
  exports.TransferStatus =
  exports.TransactionType =
  exports.TransactionStatus =
  exports.TokenType =
  exports.TaxProvider =
  exports.Role =
  exports.RiskRating =
  exports.PaymentType =
  exports.PaymentStatus =
  exports.MarketplaceSaleType =
  exports.MarketplaceCollectionItemStatus =
  exports.MarketCollectionStatus =
  exports.KycStatus =
  exports.InvoiceStatus =
  exports.IdentifierType =
  exports.FilteringType =
  exports.ExtensionType =
  exports.DeliveryMethod =
  exports.ContractType =
  exports.CollectionType =
  exports.AuctionLotStatus =
  exports.AuctionBidOrder =
    void 0;
var AuctionBidOrder;

(function (AuctionBidOrder) {
  AuctionBidOrder['Asc'] = 'ASC';
  AuctionBidOrder['Desc'] = 'DESC';
})((AuctionBidOrder = exports.AuctionBidOrder || (exports.AuctionBidOrder = {})));

var AuctionLotStatus;

(function (AuctionLotStatus) {
  AuctionLotStatus['Active'] = 'Active';
  AuctionLotStatus['Completed'] = 'Completed';
  AuctionLotStatus['Hidden'] = 'Hidden';
  AuctionLotStatus['Preview'] = 'Preview';
})((AuctionLotStatus = exports.AuctionLotStatus || (exports.AuctionLotStatus = {})));

var CollectionType;

(function (CollectionType) {
  CollectionType['Auction'] = 'Auction';
  CollectionType['Tk2'] = 'TK2';
})((CollectionType = exports.CollectionType || (exports.CollectionType = {})));

var ContractType;

(function (ContractType) {
  ContractType['Erc721Creator'] = 'ERC721Creator';
  ContractType['Erc1155Creator'] = 'ERC1155Creator';
})((ContractType = exports.ContractType || (exports.ContractType = {})));

var DeliveryMethod;

(function (DeliveryMethod) {
  DeliveryMethod['Erc721Provenance'] = 'ERC721Provenance';
  DeliveryMethod['Erc721Transfer'] = 'ERC721Transfer';
  DeliveryMethod['Erc721TransferByRange'] = 'ERC721TransferByRange';
  DeliveryMethod['Erc1155OpenEdition'] = 'ERC1155OpenEdition';
  DeliveryMethod['Erc1155Transfer'] = 'ERC1155Transfer';
  DeliveryMethod['NoOp'] = 'NoOp';
})((DeliveryMethod = exports.DeliveryMethod || (exports.DeliveryMethod = {})));

var ExtensionType;

(function (ExtensionType) {
  ExtensionType['ProvenanceExtension'] = 'ProvenanceExtension';
  ExtensionType['RedeemableExtension'] = 'RedeemableExtension';
})((ExtensionType = exports.ExtensionType || (exports.ExtensionType = {})));

var FilteringType;

(function (FilteringType) {
  FilteringType['AllowList'] = 'AllowList';
})((FilteringType = exports.FilteringType || (exports.FilteringType = {})));

var IdentifierType;

(function (IdentifierType) {
  IdentifierType['ExternalUserId'] = 'ExternalUserID';
  IdentifierType['UserId'] = 'UserID';
})((IdentifierType = exports.IdentifierType || (exports.IdentifierType = {})));

var InvoiceStatus;

(function (InvoiceStatus) {
  InvoiceStatus['AwaitingUserPayment'] = 'AwaitingUserPayment';
  InvoiceStatus['Canceled'] = 'Canceled';
  InvoiceStatus['Delivered'] = 'Delivered';
  InvoiceStatus['Draft'] = 'Draft';
  InvoiceStatus['Expired'] = 'Expired';
  InvoiceStatus['Failed'] = 'Failed';
  InvoiceStatus['Paid'] = 'Paid';
  InvoiceStatus['Pending'] = 'Pending';
})((InvoiceStatus = exports.InvoiceStatus || (exports.InvoiceStatus = {})));

var KycStatus;

(function (KycStatus) {
  KycStatus['Clear'] = 'Clear';
  KycStatus['Failed1'] = 'Failed1';
  KycStatus['Failed2'] = 'Failed2';
  KycStatus['Level1'] = 'Level1';
  KycStatus['Level2'] = 'Level2';
  KycStatus['None'] = 'None';
  KycStatus['Pending'] = 'Pending';
})((KycStatus = exports.KycStatus || (exports.KycStatus = {})));

var MarketCollectionStatus;

(function (MarketCollectionStatus) {
  MarketCollectionStatus['Active'] = 'Active';
  MarketCollectionStatus['Archived'] = 'Archived';
  MarketCollectionStatus['Inactive'] = 'Inactive';
})(
  (MarketCollectionStatus =
    exports.MarketCollectionStatus || (exports.MarketCollectionStatus = {})),
);

var MarketplaceCollectionItemStatus;

(function (MarketplaceCollectionItemStatus) {
  MarketplaceCollectionItemStatus['Active'] = 'Active';
  MarketplaceCollectionItemStatus['Completed'] = 'Completed';
  MarketplaceCollectionItemStatus['Hidden'] = 'Hidden';
  MarketplaceCollectionItemStatus['Preview'] = 'Preview';
})(
  (MarketplaceCollectionItemStatus =
    exports.MarketplaceCollectionItemStatus || (exports.MarketplaceCollectionItemStatus = {})),
);

var MarketplaceSaleType;

(function (MarketplaceSaleType) {
  MarketplaceSaleType['Auction'] = 'Auction';
  MarketplaceSaleType['BuyNow'] = 'BuyNow';
  MarketplaceSaleType['Claimable'] = 'Claimable';
})((MarketplaceSaleType = exports.MarketplaceSaleType || (exports.MarketplaceSaleType = {})));

var PaymentStatus;

(function (PaymentStatus) {
  PaymentStatus['ActionRequired'] = 'action_required';
  PaymentStatus['Confirmed'] = 'confirmed';
  PaymentStatus['Failed'] = 'failed';
  PaymentStatus['Paid'] = 'paid';
  PaymentStatus['Pending'] = 'pending';
})((PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {})));

var PaymentType;

(function (PaymentType) {
  PaymentType['Ach'] = 'ACH';
  PaymentType['CreditCard'] = 'CreditCard';
  PaymentType['Crypto'] = 'Crypto';
  PaymentType['Wire'] = 'Wire';
})((PaymentType = exports.PaymentType || (exports.PaymentType = {})));

var RiskRating;

(function (RiskRating) {
  RiskRating['High'] = 'High';
  RiskRating['Low'] = 'Low';
})((RiskRating = exports.RiskRating || (exports.RiskRating = {})));

var Role;

(function (Role) {
  Role['Admin'] = 'admin';
  Role['User'] = 'user';
})((Role = exports.Role || (exports.Role = {})));

var TaxProvider;

(function (TaxProvider) {
  TaxProvider['NoOp'] = 'NoOp';
  TaxProvider['TaxJar'] = 'TaxJar';
  TaxProvider['Vertex'] = 'Vertex';
})((TaxProvider = exports.TaxProvider || (exports.TaxProvider = {})));

var TokenType;

(function (TokenType) {
  TokenType['Erc721'] = 'ERC721';
  TokenType['Erc1155'] = 'ERC1155';
})((TokenType = exports.TokenType || (exports.TokenType = {})));

var TransactionStatus;

(function (TransactionStatus) {
  TransactionStatus['Completed'] = 'Completed';
  TransactionStatus['Failed'] = 'Failed';
  TransactionStatus['Pending'] = 'Pending';
})((TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {})));

var TransactionType;

(function (TransactionType) {
  TransactionType['DeployMultisig'] = 'DeployMultisig';
  TransactionType['TransferToken'] = 'TransferToken';
})((TransactionType = exports.TransactionType || (exports.TransactionType = {})));

var TransferStatus;

(function (TransferStatus) {
  TransferStatus['Canceled'] = 'Canceled';
  TransferStatus['Failed'] = 'Failed';
  TransferStatus['InProgress'] = 'InProgress';
  TransferStatus['Queued'] = 'Queued';
  TransferStatus['Success'] = 'Success';
})((TransferStatus = exports.TransferStatus || (exports.TransferStatus = {})));

var WalletParentType;

(function (WalletParentType) {
  WalletParentType['Organization'] = 'organization';
  WalletParentType['User'] = 'user';
})((WalletParentType = exports.WalletParentType || (exports.WalletParentType = {})));

var WalletTxType;

(function (WalletTxType) {
  WalletTxType['MojitoHotWallet'] = 'MojitoHotWallet';
  WalletTxType['Multisig'] = 'Multisig';
})((WalletTxType = exports.WalletTxType || (exports.WalletTxType = {})));
