import { EMojitoQueries } from '../../domain/gql/queries';
import { useCollection } from '../useCollection/useCollection';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export function useCollectionItemRemainingCount(id: string, _slug?: string) {
  const { collection } = useCollection();
  const slug = collection?.slug;

  return useMojitoFactory({
    as: 'remainingCount',
    query: EMojitoQueries.collectionItemByIdRemainingCount,
    variables: { id, slug: _slug ?? slug },
    onlyAuthenticated: true,
  });

  // data?.details?.remainingCount
}
