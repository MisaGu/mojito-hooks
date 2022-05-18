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

/*


export function useCollectionItemRemainingCount(
  id: string,
  _slug?: string,
): {
  remainingCount: number;
  remainingCountLoading: boolean;
  remainingCountError: IUseQueryResult['error'];
  remainingCountRefetch: () => void;
} {
  const { slug } = useCollection();
  const { data, error, loading, refetch } = useMojito({
    query: EMojitoQueries.collectionItemByIdRemainingCount,
    variables: { id, slug: _slug ?? slug },
    onlyAuthenticated: true,
  });

  if (error) console.error(error);

  return {
    remainingCount: data?.details?.remainingCount,
    remainingCountLoading: loading,
    remainingCountError: error,
    remainingCountRefetch: refetch,
  };
}


*/
