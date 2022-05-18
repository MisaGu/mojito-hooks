import { EMojitoQueries } from '../../domain/gql/queries';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { useCollection } from '../useCollection/useCollection';

export function useCollectionItemCurrentBids(id?: string, _slug?: string) {
  const { collection } = useCollection();
  const slug = collection?.slug;

  return useMojitoFactory({
    as: 'currentBids',
    query: EMojitoQueries.collectionBySlugCurrentBids,
    variables: { slug: _slug ?? slug, marketplaceID: config.MARKETPLACE_ID },
  });

  /*

  return {
    allCurrentBids: data?.items,
    currentBidsLoading: loading,
    currentBidsError: error,
    currentBidsRefetch: refetch,
  };

  currentBids: id
    ? data?.items?.find((item: IMojitoCollectionItemCurrentBids) => item.id == id)
    : undefined,

  */
}

// legacy function

/*

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
  const { data, error, loading, refetch } = useMojito({
    query: EMojitoQueries.collectionBySlugCurrentBids,
    variables: { slug: _slug ?? slug, marketplaceID: config.MARKETPLACE_ID },
  });

  if (error) console.error(error);

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

*/
