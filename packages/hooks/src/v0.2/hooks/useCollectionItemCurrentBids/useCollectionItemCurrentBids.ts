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

  // TODO: The old logic must go into the normalizer:

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
