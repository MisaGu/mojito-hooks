import { EMojitoQueries } from '../../domain/gql/queries';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export function useMarketplaceCollectionsSlugWithItemsId() {
  return useMojitoFactory({
    as: 'marketplaceCollectionsSlugWithItemsId',
    query: EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: { id: config.MARKETPLACE_ID },
  });

  // TODO: New hook which uses this hook/query and return only slug and itemSlug.

  // data?.marketplace?.collections / IMojitoCollection[]
}
