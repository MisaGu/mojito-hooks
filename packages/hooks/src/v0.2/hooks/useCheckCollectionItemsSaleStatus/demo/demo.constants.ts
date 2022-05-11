import {
  EMojitoCollectionItemAuctionLotStatus,
  EMojitoCollectionItemStatus,
  SaleType,
} from '../../../domain/enums';
import {
  IMojitoCollectionItem,
  IMojitoCollectionItemAuctionLot,
  IMojitoCollectionItemBuyNowLot,
} from '../../../domain/interfaces';

const COMMON_COLLECTION_ITEM: IMojitoCollectionItem = {
  id: 'item-1',
  slug: 'item-1',
  collectionId: 'collection-1',
  marketplaceTokenId: 'marketplace-token-1',
  saleType: null as any,
  status: EMojitoCollectionItemStatus.Active,
  details: {} as any,
  contentfulData: {} as any,
  name: 'Item 1',
};

export const BUY_NOW_COLLECTION_ITEMS: IMojitoCollectionItem<IMojitoCollectionItemBuyNowLot>[] = [
  {
    ...COMMON_COLLECTION_ITEM,
    saleType: SaleType.BuyNow,
    details: {
      id: 'item-details-1',
      marketplaceCollectionItemId: 'item-1',
      unitPrice: 100,
      totalUnits: 1000,
      totalAvailableUnits: 1000,
      startDate: Date.now().toString(),
      endDate: Date.now().toString(),
      sortNumber: 0,
      invoice: {} as any,
      remainingCount: 1000,
      endTimestamp: Date.now(),
      saleView: {
        isDuringSale: true,
        isPostSale: false,
        isPreSale: false,
      },
    },
  },
];

export const AUCTION_COLLECTION_ITEMS: IMojitoCollectionItem<IMojitoCollectionItemAuctionLot>[] = [
  {
    ...COMMON_COLLECTION_ITEM,
    saleType: SaleType.Auction,
    details: {
      id: 'item-details-1',
      lotNumber: 1,
      marketplaceCollectionItemId: 'item-1',
      startingBid: 100,
      reservePrice: 1000,
      reserveMet: 900,
      previewDate: Date.now().toString(),
      startDate: Date.now().toString(),
      endDate: Date.now().toString(),
      status: EMojitoCollectionItemAuctionLotStatus.active,
      defaultConfig: {} as any,
      feeStructure: {} as any,
      endTimestamp: Date.now(),
      saleView: {
        isDuringSale: true,
        isPostSale: false,
        isPreSale: false,
      },
    },
  },
];

export const MIXED_COLLECTION_ITEMS: IMojitoCollectionItem[] = [
  ...BUY_NOW_COLLECTION_ITEMS,
  ...AUCTION_COLLECTION_ITEMS,
];
