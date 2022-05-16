import { EMojitoQueries, IUseQueryResult } from '../../domain/gql/queries';
import { IMojitoCollectionItemDetailsBid } from '../../domain/interfaces';
import { useCollection } from '../useCollection/useCollection';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export function useCollectionItemBidsList(
  id: string,
  _slug?: string,
): {
  bids: IMojitoCollectionItemDetailsBid[];
  bidsLoading: boolean;
  bidsError: IUseQueryResult['error'];
  bidsRefetch: () => void;
} {
  const { collection } = useCollection();
  const slug = collection?.slug;
  const { data, error, loading, refetch } = useMojitoFactory({
    query: EMojitoQueries.collectionItemByIdBidsList,
    variables: { id, slug: _slug ?? slug },
  });

  // if (error) console.error(error);

  return {
    bids: data?.details?.bids,
    bidsLoading: loading,
    bidsError: error,
    bidsRefetch: refetch,
  };
}
