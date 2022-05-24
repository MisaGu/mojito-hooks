import { EMojitoQueries } from '../../domain/gql/queries';
import { ICollectionItemByIdRemainingCountRequest } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(collectionItemRequest?: ICollectionItemByIdRemainingCountRequest) {
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
