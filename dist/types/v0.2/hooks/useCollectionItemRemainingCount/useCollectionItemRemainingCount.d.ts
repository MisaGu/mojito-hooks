import { CollectionItemRemainingCountResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  collectionItemRequest?: CollectionItemRemainingCountResponse,
): number | undefined;
export declare type UseCollectionItemRemainingCountData = ReturnType<typeof selectorFn>;
export declare type UseCollectionItemRemainingCountReturn = ReturnType<
  typeof useCollectionItemRemainingCount
>;
export interface UseCollectionItemRemainingCountProps
  extends BaseQueryHookPropsWithUrlAndSlug<UseCollectionItemRemainingCountData> {
  collectionItemID: string;
}
export declare function useCollectionItemRemainingCount({
  collectionItemID,
  options,
  ...props
}: UseCollectionItemRemainingCountProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'remainingCount',
  any,
  Error
>;
export default useCollectionItemRemainingCount;
