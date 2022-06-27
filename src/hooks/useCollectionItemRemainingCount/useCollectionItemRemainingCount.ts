import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CollectionItemRemainingCountResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { getCollectionSlug } from '../../domain/utils/getSlug.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(collectionItemRequest?: CollectionItemRemainingCountResponse) {
  if (!collectionItemRequest) return undefined;

  return collectionItemRequest.collectionItemById.details.remainingCount;
}

export type UseCollectionItemRemainingCountData = ReturnType<typeof selectorFn>;

export type UseCollectionItemRemainingCountReturn = ReturnType<
  typeof useCollectionItemRemainingCount
>;

export interface UseCollectionItemRemainingCountProps
  extends BaseQueryHookPropsWithUrlAndSlug<UseCollectionItemRemainingCountData> {
  collectionItemID: string;
}

export function useCollectionItemRemainingCount({
  collectionItemID,
  options,
  ...props
}: UseCollectionItemRemainingCountProps) {
  const slug = getCollectionSlug(props.slug);

  return useMojitoFactory({
    as: 'remainingCount',
    queryKey: QueryKey.get(EMojitoKey.collectionItemByIdRemainingCount, {
      id: collectionItemID,
      slug,
    }),
    options: { ...options, enabled: !!slug },
    selectorFn,
    onlyAuthenticated: true,
  });
}

export default useCollectionItemRemainingCount;
