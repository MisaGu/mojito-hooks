import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CollectionBySlugResponse } from '../../domain/interfaces';
import {
  BaseQueryHookPropsWithUrlAndSlug,
  PaginatedQueryProps,
} from '../../domain/interfaces/hooks.interface';
import { collectionPreloadFn } from '../../domain/utils/service/collectionPreloadFn';
import { getCollectionSlugFromPathname } from '../../domain/utils/state/path.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { getPaginationArgs } from '../../domain/utils/paginationUtils';

function selectorFn(response?: CollectionBySlugResponse) {
  if (!response) return undefined;

  return response.collectionBySlug;
}

export type UseCollectionData = ReturnType<typeof selectorFn>;

export type UseCollectionReturn = ReturnType<typeof useCollection>;

export interface UseCollectionProps
  extends BaseQueryHookPropsWithUrlAndSlug<UseCollectionData>,
    PaginatedQueryProps {
  marketplaceID: string;
}

export function useCollection(props: UseCollectionProps) {
  const collectionSlug = props.slug || getCollectionSlugFromPathname();
  const marketplaceID = props.marketplaceID ?? config.MARKETPLACE_ID;

  const paginationArgs = getPaginationArgs(props);

  return useMojitoFactory(
    {
      as: 'collection',
      queryKey: QueryKey.get(EMojitoKey.collectionBySlug, {
        slug: collectionSlug,
        marketplaceID,
        ...paginationArgs,
      }),
      options: props.options,
      onQueryStart: () => collectionPreloadFn(collectionSlug),
      selectorFn: selectorFn,
      force: true,
    },
    [collectionSlug, marketplaceID, paginationArgs?.offset, paginationArgs?.limit],
  );
}

export default useCollection;
