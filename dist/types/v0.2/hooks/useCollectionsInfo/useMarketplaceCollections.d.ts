import { MarketplaceResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: MarketplaceResponse,
): import('../../domain/interfaces').MojitoMarketplaceCollection[] | undefined;
export declare type UseMarketplaceCollectionsData = ReturnType<typeof selectorFn>;
export declare type UseMarketplaceCollectionsReturn = ReturnType<typeof useMarketplaceCollections>;
export declare type UseMarketplaceCollectionsProps =
  BaseQueryHookProps<UseMarketplaceCollectionsData>;
export declare function useMarketplaceCollections({
  options,
}?: UseMarketplaceCollectionsProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'collections',
  any,
  Error
>;
export default useMarketplaceCollections;
