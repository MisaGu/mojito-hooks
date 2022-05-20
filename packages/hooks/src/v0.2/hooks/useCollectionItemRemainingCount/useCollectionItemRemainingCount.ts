import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoCollectionItemBuyNowLot } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(collectionItemById?: IMojitoCollectionItemBuyNowLot) {
  if (!collectionItemById) return undefined;

  return collectionItemById.details.remainingCount;
}

export type UseCollectionItemRemainingCountData = ReturnType<typeof transformFn>;

export type UseCollectionItemRemainingCountReturn = ReturnType<
  typeof useCollectionItemRemainingCount
>;

export interface UseCollectionItemRemainingCountProps
  extends BaseQueryHookProps<UseCollectionItemRemainingCountData> {
  collectionItemID: string;
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
    options: { ...options, enabled: !!slug },
    transformFn,
    onlyAuthenticated: true,
  });
}

/*


export function useCollectionItemRemainingCount(
  id: string,
  _slug?: string,
): {
  remainingCount: number;
  remainingCountLoading: boolean;
  remainingCountError: IUseQueryResult['error'];
  remainingCountRefetch: () => void;
} {
  const { slug } = useCollection();
  const { data, error, loading, refetch } = useMojito({
    query: EMojitoQueries.collectionItemByIdRemainingCount,
    variables: { id, slug: _slug ?? slug },
    onlyAuthenticated: true,
  });

  if (error) console.error(error);

  return {
    remainingCount: data?.details?.remainingCount,
    remainingCountLoading: loading,
    remainingCountError: error,
    remainingCountRefetch: refetch,
  };
}


*/
