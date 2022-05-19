import { IMojitoCollectionItemCurrentBids } from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useCollectionItemsCurrentBids } from '../useCollectionItemsCurrentBids/useCollectionItemsCurrentBids';
import { useMemo } from 'react';

export type UseCollectionItemCurrentBidsData = undefined | IMojitoCollectionItemCurrentBids;

export type UseCollectionItemCurrentBidsReturn = ReturnType<typeof useCollectionItemCurrentBids>;

export interface UseCollectionItemCurrentBidsProps
  extends BaseQueryHookPropsWithUrlAndSlug<UseCollectionItemCurrentBidsData> {
  collectionItemID: string;
}

export function useCollectionItemCurrentBids({
  collectionItemID,
  ...props
}: UseCollectionItemCurrentBidsProps) {
  const { currentBids, ...result } = useCollectionItemsCurrentBids(props as any);

  const itemCurrentBids = useMemo(() => {
    return currentBids?.find((item) => item.id === collectionItemID);
  }, [currentBids, collectionItemID]);

  /*

  refetch: () => {
    const itemsCurrentBids = refetch();

    return fn(itemsCurrentBids);
  }

  */

  return {
    ...(result as any),
    itemCurrentBids,
  };
}

// legacy function

/*

export function useCollectionItemCurrentBids(
  id?: string,
  _slug?: string,
): {
  allCurrentBids: IMojitoCollectionItemCurrentBids[];
  currentBids: IMojitoCollectionItemCurrentBids;
  currentBidsLoading: boolean;
  currentBidsError: IUseQueryResult['error'];
  currentBidsRefetch: () => void;
} {
  const { slug } = useCollection();
  const { data, error, loading, refetch } = useMojito({
    query: EMojitoQueries.collectionBySlugCurrentBids,
    variables: { slug: _slug ?? slug, marketplaceID: config.MARKETPLACE_ID },
  });

  if (error) console.error(error);

  return {
    allCurrentBids: data?.items,
    currentBids: id
      ? data?.items?.find((item: IMojitoCollectionItemCurrentBids) => item.id == id)
      : undefined,
    currentBidsLoading: loading,
    currentBidsError: error,
    currentBidsRefetch: refetch,
  };
}

*/
