import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CollectionItemResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { checkCollectionItemId } from '../../domain/utils/state/marketplaceCollectionsInfoWithItemsIdAndSlug.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: CollectionItemResponse) {
  if (!response) return undefined;

  return response.collectionItemById;
}

export type UseCollectionItemByIdData = ReturnType<typeof selectorFn>;

export type UseCollectionItemByIdReturn = ReturnType<typeof useCollectionItemById>;

export interface UseCollectionItemByIdProps extends BaseQueryHookProps<UseCollectionItemByIdData> {
  id: string;
}

export function useCollectionItemById({ id, options }: UseCollectionItemByIdProps) {
  const _id = checkCollectionItemId(id);

  return useMojitoFactory({
    as: 'item',
    queryKey: QueryKey.get(EMojitoKey.collectionItemById, { id: _id }),
    options: { ...options, enabled: !!_id },
    selectorFn,
  });
}

export default useCollectionItemById;
