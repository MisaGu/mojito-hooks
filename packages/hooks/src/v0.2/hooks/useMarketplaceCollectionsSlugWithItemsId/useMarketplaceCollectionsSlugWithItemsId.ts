import { EMojitoQueries, IUseQueryResult } from '../../domain/gql/queries';
import { IMojitoCollection } from '../../domain/interfaces';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export function useMarketplaceCollectionsSlugWithItemsId(): {
  marketplaceCollectionsSlugWithItemsId: IMojitoCollection[];
  marketplaceCollectionsSlugWithItemsIdLoading: boolean;
  marketplaceCollectionsSlugWithItemsIdError: IUseQueryResult['error'];
} {
  const { data, error, loading } = useMojitoFactory({
    query: EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: { id: config.MARKETPLACE_ID },
  });

  // if (error) console.error(error);

  return {
    marketplaceCollectionsSlugWithItemsId: data?.marketplace?.collections,
    marketplaceCollectionsSlugWithItemsIdLoading: loading,
    marketplaceCollectionsSlugWithItemsIdError: error,
  };
}
