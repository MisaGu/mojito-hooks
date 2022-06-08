import { EMojitoKey } from '../../domain/enums/state.enum';
import { CollectionItemRemainingCountResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { getCollectionSlug } from '../../domain/utils/getSlug.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(collectionItemRequest?: CollectionItemRemainingCountResponse) {
  if (!collectionItemRequest) return undefined;

  return collectionItemRequest.collectionItemById.details.remainingCount;
}

export type UseCollectionItemRemainingCountData = ReturnType<typeof transformFn>;

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
    query: EMojitoKey.collectionItemByIdRemainingCount,
    variables: { id: collectionItemID, slug },
    options: { ...options, enabled: !!slug },
    transformFn,
    onlyAuthenticated: true,
  });
}

export default useCollectionItemRemainingCount;
