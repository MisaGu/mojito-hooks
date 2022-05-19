import { EMojitoQueries } from '../../domain/gql/queries';
import { ICollectionItemByIdBidsListRequest } from '../../domain/interfaces';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(collectionItem?: ICollectionItemByIdBidsListRequest) {
  if (!collectionItem) return undefined;

  return collectionItem.collectionItemById;
}

export type UseCollectionItemBidsListData = ReturnType<typeof transformFn>;

export type UseCollectionItemBidsListReturn = ReturnType<typeof useCollectionItemBidsList>;

export interface UseCollectionItemBidsListProps
  extends BaseHookProps<UseCollectionItemBidsListData> {
  collectionItemID: string;
}

export function useCollectionItemBidsList({
  collectionItemID,
  options,
}: UseCollectionItemBidsListProps) {
  return useMojitoFactory({
    as: 'itemBids',
    query: EMojitoQueries.collectionItemByIdBidsList,
    variables: { id: collectionItemID },
    options,
    transformFn,
  });
}
