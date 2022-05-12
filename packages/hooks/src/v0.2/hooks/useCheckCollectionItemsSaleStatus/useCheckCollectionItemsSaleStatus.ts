import { useMemo } from 'react';
import { SaleType } from '../../domain/enums';
import { IMojitoCollectionItem } from '../../domain/interfaces';

export interface ItemsSaleStatus {
  hasActiveBuyNowItems: boolean;
  hasActiveAuctionItems: boolean;
}

function checkCollectionItemsSaleStatus(items: IMojitoCollectionItem[] = []): ItemsSaleStatus {
  const totalItems = items.length;

  let i = 0;
  let hasActiveBuyNowItems = false;
  let hasActiveAuctionItems = false;

  while (i < totalItems && !(hasActiveAuctionItems && hasActiveBuyNowItems)) {
    const { details, saleType } = items[i++];

    if (!details?.saleView?.isDuringSale) continue;

    if (saleType === SaleType.BuyNow) {
      hasActiveBuyNowItems = true;
    }

    if (saleType === SaleType.Auction) {
      hasActiveAuctionItems = true;
    }
  }

  return {
    hasActiveBuyNowItems,
    hasActiveAuctionItems,
  };
}

export function useCheckCollectionItemsSaleStatus(
  items?: IMojitoCollectionItem[],
): ItemsSaleStatus {
  return useMemo(() => checkCollectionItemsSaleStatus(items), [items]);
}
