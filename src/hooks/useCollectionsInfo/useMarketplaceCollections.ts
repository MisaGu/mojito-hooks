import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { MarketplaceResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: MarketplaceResponse) {
  if (!response) return undefined;

  return response.marketplace.collections;
}

export type UseMarketplaceCollectionsData = ReturnType<typeof selectorFn>;

export type UseMarketplaceCollectionsReturn = ReturnType<typeof useMarketplaceCollections>;

export type UseMarketplaceCollectionsProps = BaseQueryHookProps<UseMarketplaceCollectionsData>;

export function useMarketplaceCollections({ options }: UseMarketplaceCollectionsProps = {}) {
  return useMojitoFactory({
    as: 'collections',
    queryKey: QueryKey.get(EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug, {
      id: config.MARKETPLACE_ID,
    }),
    options,
    selectorFn,
  });
}

export default useMarketplaceCollections;
