import { IMojitoCollectionItemCurrentBids } from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useCollectionItemsCurrentBids } from '../useCollectionItemsCurrentBids/useCollectionItemsCurrentBids';

export type UseCollectionItemCurrentBidsData = undefined | IMojitoCollectionItemCurrentBids;

export type UseCollectionItemCurrentBidsReturn = QueryResult<
  'itemCurrentBids',
  UseCollectionItemCurrentBidsData
>;

export interface UseCollectionItemCurrentBidsProps
  extends BaseHookPropsWithUrlAndSlug<UseCollectionItemCurrentBidsData> {
  collectionItemID: string;
}

export function useCollectionItemCurrentBids({
  collectionItemID,
  ...props
}: UseCollectionItemCurrentBidsProps): UseCollectionItemCurrentBidsReturn {
  const { currentBids, ...result } = useCollectionItemsCurrentBids(props as any);

  const itemCurrentBids = currentBids?.find((item) => item.id === collectionItemID);

  return {
    ...(result as any),
    itemCurrentBids,
  };
}
