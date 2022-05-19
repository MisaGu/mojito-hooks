import { EMojitoQueries } from '../../domain/gql/queries';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { IMojitoMarketplaceResponse } from '../../domain/interfaces';

function transformFn(marketplaceRequest?: IMojitoMarketplaceResponse) {
  if (!marketplaceRequest) return undefined;

  return marketplaceRequest.marketplace.collections;
}

export type UseMarketplaceCollectionsSlugWithItemsIdData = ReturnType<typeof transformFn>;

export type UseMarketplaceCollectionsSlugWithItemsIdReturn = ReturnType<
  typeof useMarketplaceCollectionsSlugWithItemsId
>;

export type UseMarketplaceCollectionsSlugWithItemsIdProps =
  BaseHookProps<UseMarketplaceCollectionsSlugWithItemsIdData>;

export function useMarketplaceCollectionsSlugWithItemsId({
  options,
}: UseMarketplaceCollectionsSlugWithItemsIdProps = {}) {
  return useMojitoFactory({
    as: 'marketplaceCollectionsSlugWithItemsId',
    query: EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: { id: config.MARKETPLACE_ID },
    options,
    transformFn,
  });
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
