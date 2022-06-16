import { CollectionItemBySlugResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: CollectionItemBySlugResponse,
):
  | import('../../domain/interfaces').MojitoMarketplaceCollectionItem<
      import('../../domain/interfaces/mojito-schema.interface').MarketplaceSaleType
    >
  | undefined;
export declare type UseCollectionData = ReturnType<typeof selectorFn>;
export declare type UseCollectionReturn = ReturnType<typeof useCollection>;
export declare type UseCollectionProps = BaseQueryHookPropsWithUrlAndSlug<UseCollectionData>;
export declare function useCollection(
  props?: UseCollectionProps,
): import('../../domain/utils/gqlResult.utils').QueryResult<'collection', any, Error>;
export default useCollection;
