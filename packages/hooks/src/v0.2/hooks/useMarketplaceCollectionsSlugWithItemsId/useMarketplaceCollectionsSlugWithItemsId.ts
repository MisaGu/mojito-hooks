import { EMojitoQueries } from '../../domain/gql/queries';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export function useMarketplaceCollectionsSlugWithItemsId() {
  return useMojitoFactory({
    as: 'marketplaceCollectionsSlugWithItemsId',
    query: EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: { id: config.MARKETPLACE_ID },
  });

  // TODO: The old logic must go into the normalizer:
  // data?.marketplace?.collections / IMojitoCollection[]
}

// legacy function
/*

export function useMarketplaceCollectionsSlugWithItemsId(): {
  marketplaceCollectionsSlugWithItemsId: IMojitoCollection[];
  marketplaceCollectionsSlugWithItemsIdLoading: boolean;
  marketplaceCollectionsSlugWithItemsIdError: IUseQueryResult['error'];
} {
  const { data, error, loading } = useMojito({
    query: EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: { id: config.MARKETPLACE_ID },
  });

  if (error) console.error(error);

  return {
    marketplaceCollectionsSlugWithItemsId: data?.marketplace?.collections,
    marketplaceCollectionsSlugWithItemsIdLoading: loading,
    marketplaceCollectionsSlugWithItemsIdError: error,
  };
}

*/
