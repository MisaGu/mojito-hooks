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

export function useMarketplaceCollections(props?: UseMarketplaceCollectionsProps) {
  return useMojitoFactory({
    as: 'collections',
    query: EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: {
      id: config.MARKETPLACE_ID,
    },
    options: props?.options as any,
    selectorFn,
  });
}

export default useMarketplaceCollections;
