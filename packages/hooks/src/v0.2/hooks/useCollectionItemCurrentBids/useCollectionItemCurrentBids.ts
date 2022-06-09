import { useMemo } from 'react';
import { MojitoMarketplaceAuctionBid } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useCollectionItemsCurrentBids } from '../useCollectionItemsCurrentBids/useCollectionItemsCurrentBids';

export type UseCollectionItemCurrentBidsData = undefined | MojitoMarketplaceAuctionBid;

export type UseCollectionItemCurrentBidsReturn = ReturnType<typeof useCollectionItemCurrentBid>;

export interface UseCollectionItemCurrentBidsProps
  extends BaseQueryHookPropsWithUrlAndSlug<UseCollectionItemCurrentBidsData> {
  collectionItemID: string;
}

export function useCollectionItemCurrentBid({
  collectionItemID,
  ...props
}: UseCollectionItemCurrentBidsProps) {
  const { currentBids: collectionItemsBids, ...result } = useCollectionItemsCurrentBids(
    props as any,
  );

  const currentBids = useMemo(() => {
    return collectionItemsBids?.find((item) => item.id === collectionItemID);
  }, [collectionItemsBids, collectionItemID]);

  return {
    ...(result as any),
    currentBids,
  };
}

export default useCollectionItemCurrentBid;
