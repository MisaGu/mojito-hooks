import { EMojitoQueries } from '../../domain/gql/queries';
import { normalizeQueryResult } from '../../domain/utils/gql.utils';
import { useCollection } from '../useCollection/useCollection';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export function useCollectionItemBidsList(id: string, _slug?: string) {
  const { collection } = useCollection();
  const slug = collection?.slug;

  return useMojitoFactory({
    as: 'bids',
    query: EMojitoQueries.collectionItemByIdBidsList,
    variables: { id, slug: _slug ?? slug },
  });
}
