import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { MarketplaceResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(response?: MarketplaceResponse) {
  if (!response) return undefined;

  return response.marketplace.collections;
}

export type UseMarketplaceCollectionsData = ReturnType<typeof transformFn>;

export type UseMarketplaceCollectionsReturn = ReturnType<typeof useMarketplaceCollections>;

export type UseMarketplaceCollectionsProps = BaseQueryHookProps<UseMarketplaceCollectionsData>;

export function useMarketplaceCollections(props?: UseMarketplaceCollectionsProps) {
  return useMojitoFactory({
    as: 'collections',
    query: EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: {
      id: config.MARKETPLACE_ID,
    },
    options: props?.options as any,
    selectFn: transformFn,
  });
}

export default useMarketplaceCollections;
