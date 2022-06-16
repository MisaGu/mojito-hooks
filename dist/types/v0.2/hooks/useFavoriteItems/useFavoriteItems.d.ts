import { FavoriteResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: FavoriteResponse,
):
  | import('../../domain/interfaces').MojitoMarketplaceCollectionItem<
      import('../../domain/interfaces/mojito-schema.interface').MarketplaceSaleType
    >[]
  | undefined;
export declare type UseFavoriteItemsData = ReturnType<typeof selectorFn>;
export declare type UseFavoriteItemsReturn = ReturnType<typeof useFavoriteItems>;
export declare type UseFavoriteItemsProps = BaseQueryHookProps<UseFavoriteItemsData>;
export declare function useFavoriteItems({
  options,
}?: UseFavoriteItemsProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'favoriteItems',
  any,
  Error
>;
export default useFavoriteItems;
