import { EMojitoQueries, IUseQueryResult } from '../../domain/gql/queries';
import { IMojitoCollectionItemCurrentBids } from '../../domain/interfaces';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { useCollection } from '../useCollection/useCollection';

export function useCollectionItemCurrentBids(
  id?: string,
  _slug?: string,
): {
  allCurrentBids: IMojitoCollectionItemCurrentBids[];
  currentBids: IMojitoCollectionItemCurrentBids;
  currentBidsLoading: boolean;
  currentBidsError: IUseQueryResult['error'];
  currentBidsRefetch: () => void;
} {
  const { slug } = useCollection();
  const { data, error, loading, refetch } = useMojitoFactory({
    query: EMojitoQueries.collectionBySlugCurrentBids,
    variables: { slug: _slug ?? slug, marketplaceID: config.MARKETPLACE_ID },
  });

  // if (error) console.error(error);

  return {
    allCurrentBids: data?.items,
    currentBids: id
      ? data?.items?.find((item: IMojitoCollectionItemCurrentBids) => item.id == id)
      : undefined,
    currentBidsLoading: loading,
    currentBidsError: error,
    currentBidsRefetch: refetch,
  };
}
