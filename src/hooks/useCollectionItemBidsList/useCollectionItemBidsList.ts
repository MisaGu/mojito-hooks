import { EMojitoKey } from '../../domain/enums/state.enum';
import { CollectionItemBidsListResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: CollectionItemBidsListResponse) {
  if (!response) return undefined;

  return response.collectionItemById.details.bids;
}

export type UseCollectionItemBidsListData = ReturnType<typeof selectorFn>;

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
    query: EMojitoKey.collectionItemByIdBidsList,
    variables: { id: collectionItemID },
    options,
    selectorFn,
  });
}

export default useCollectionItemBidsList;
