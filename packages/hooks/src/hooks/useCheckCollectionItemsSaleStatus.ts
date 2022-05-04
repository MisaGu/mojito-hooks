import { SaleType } from '@enums/saleType';
import { IMojitoCollectionItem } from '@interfaces/mojito.interface';
import { useSetState } from 'ahooks';
import { useEffect } from 'react';

export const useCheckCollectionItemsSaleStatus = (
  items: IMojitoCollectionItem<any>[] | undefined,
): {
  haveActiveAuctionItems: boolean;
  haveActiveBuyNowItems: boolean;
} => {
  const [state, setState] = useSetState({
    haveActiveAuctionItems: false,
    haveActiveBuyNowItems: false,
  });

  useEffect(() => {
    if (items?.length) {
      const haveActiveAuctionItems = !!items.filter(
        (item) => item.saleType === SaleType.Auction && item.details?.saleView?.isDuringSale,
      ).length;

      const haveActiveBuyNowItems = !!items.filter(
        (item) => item.saleType === SaleType.BuyNow && item.details?.saleView?.isDuringSale,
      ).length;

      setState({ haveActiveAuctionItems, haveActiveBuyNowItems });
    }
  }, [items]);

  return state;
};
