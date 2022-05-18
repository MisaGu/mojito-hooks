import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoCollectionItemBuyNowLot } from '../../domain/interfaces';
import { BaseHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { QueryResult } from '../../domain/utils/gql.utils';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export type UseCollectionItemRemainingCountData = undefined | number;

export type UseCollectionItemRemainingCountReturn = QueryResult<
  'remainingCount',
  UseCollectionItemRemainingCountData
>;

export interface UseCollectionItemRemainingCountProps
  extends BaseHookPropsWithUrlAndSlug<UseCollectionItemRemainingCountData> {
  collectionItemID: string;
}

// TODO: Memo this function:

function transformFn(
  collectionItemById?: IMojitoCollectionItemBuyNowLot,
): UseCollectionItemRemainingCountData {
  if (!collectionItemById) return undefined;

  return collectionItemById.details.remainingCount;
}

export function useCollectionItemRemainingCount({
  collectionItemID,
  options,
  ...props
}: UseCollectionItemRemainingCountProps) {
  const { slug } = useCollectionSlug(props);

  return useMojitoFactory({
    as: 'remainingCount',
    query: EMojitoQueries.collectionItemByIdRemainingCount,
    variables: { id: collectionItemID, slug },
    options: { ...(options as any), enabled: !!slug },
    transformFn,
    onlyAuthenticated: true,
  });
}
