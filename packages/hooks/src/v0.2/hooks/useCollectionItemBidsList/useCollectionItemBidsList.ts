import { EMojitoQueries } from '../../domain/gql/queries';
import { ICollectionItemByIdBidsList } from '../../domain/interfaces';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { QueryResult } from '../../domain/utils/gql.utils';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export type UseCollectionItemBidsListData = undefined | ICollectionItemByIdBidsList;

export type UseCollectionItemBidsListReturn = QueryResult<
  'itemBids',
  UseCollectionItemBidsListData
>;

export interface UseCollectionItemBidsListProps
  extends BaseHookProps<UseCollectionItemBidsListData> {
  collectionItemID: string;
}

export function useCollectionItemBidsList({
  collectionItemID,
  options,
}: UseCollectionItemBidsListProps): UseCollectionItemBidsListReturn {
  // TODO: Do we want to unwrap the result?

  return useMojitoFactory<'itemBids', UseCollectionItemBidsListData>({
    as: 'itemBids',
    query: EMojitoQueries.collectionItemByIdBidsList,
    variables: { id: collectionItemID },
    options,
  });
}
