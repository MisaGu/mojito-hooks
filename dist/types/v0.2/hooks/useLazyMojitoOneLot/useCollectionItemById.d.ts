import { CollectionItemResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: CollectionItemResponse,
):
  | import('../../domain/interfaces').MojitoMarketplaceCollectionItem<
      import('../../domain/interfaces/mojito-schema.interface').MarketplaceSaleType
    >
  | undefined;
export declare type UseCollectionItemByIdData = ReturnType<typeof selectorFn>;
export declare type UseCollectionItemByIdReturn = ReturnType<typeof useCollectionItemById>;
export interface UseCollectionItemByIdProps extends BaseQueryHookProps<UseCollectionItemByIdData> {
  id: string;
}
export declare function useCollectionItemById({
  id,
  options,
}: UseCollectionItemByIdProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'item',
  any,
  Error
>;
export default useCollectionItemById;
