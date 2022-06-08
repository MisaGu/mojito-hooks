import { EMojitoKey } from '../../domain/enums/state.enum';
import { ICollectionItemByIdBidsListRequest } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(collectionItemRequest?: ICollectionItemByIdBidsListRequest) {
  if (!collectionItemRequest) return undefined;

  return collectionItemRequest.collectionItemById.details.bids;
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
    query: EMojitoKey.collectionItemByIdBidsList,
    variables: { id: collectionItemID },
    options,
    transformFn,
  });
}

export default useCollectionItemBidsList;
