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

function selectorFn(response?: CollectionBySlugResponse) {
  if (!response) return undefined;

  return response.collectionBySlug;
}

export type UseCollectionPageData = ReturnType<typeof selectorFn>;

export type UseCollectionPageReturn = ReturnType<typeof useCollectionPage>;

export interface UseCollectionPageProps
  extends BaseQueryHookPropsWithUrlAndSlug<UseCollectionPageData>,
    PaginatedQueryProps {
  marketplaceID: string;
}

export function useCollectionPage(props: UseCollectionPageProps) {
  const collectionSlug = props.slug || getCollectionSlugFromPathname();
  const marketplaceID = props.marketplaceID ?? config.MARKETPLACE_ID;

  return useMojitoFactory(
    {
      as: 'collectionPage',
      queryKey: QueryKey.get(EMojitoKey.collectionBySlugPage, {
        slug: collectionSlug,
        marketplaceID,
        page: props.page,
        pageSize: props.pageSize,
      }),
      options: props.options,
      onQueryStart: () => collectionPreloadFn(collectionSlug),
      selectorFn: selectorFn,
      force: true,
    },
    [collectionSlug, marketplaceID, props.page, props.pageSize],
  );
}

export default useCollectionPage;
