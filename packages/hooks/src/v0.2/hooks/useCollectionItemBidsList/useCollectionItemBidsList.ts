import { EMojitoQueries } from '../../domain/gql/queries';
import { CollectionItemBidsListResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(response?: CollectionItemBidsListResponse) {
  if (!response) return undefined;

  return response.collectionItemById.details.bids;
}

export type UseCollectionItemBidsListData = ReturnType<typeof transformFn>;

export type UseCollectionItemBidsListReturn = ReturnType<typeof useCollectionItemBidsList>;

export interface UseCollectionItemBidsListProps
  extends BaseQueryHookProps<UseCollectionItemBidsListData> {
  collectionItemID: string;
}

export function useCollectionItemBidsList({
  collectionItemID,
  options,
}: UseCollectionItemBidsListProps) {
  return useMojitoFactory({
    as: 'bids',
    query: EMojitoQueries.collectionItemByIdBidsList,
    variables: { id: collectionItemID },
    options,
    transformFn,
  });
}

export default useCollectionItemBidsList;
