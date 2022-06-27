import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CollectionBySlugResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { collectionPreloadFn } from '../../domain/utils/service/collectionPreloadFn';
import { getCollectionSlugFromPathname } from '../../domain/utils/state/path.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: CollectionBySlugResponse) {
  if (!response) return undefined;

  return response.collectionBySlug;
}

export type UseCollectionData = ReturnType<typeof selectorFn>;

export type UseCollectionReturn = ReturnType<typeof useCollection>;

export type UseCollectionProps = BaseQueryHookPropsWithUrlAndSlug<UseCollectionData>;

export function useCollection(props: UseCollectionProps) {
  const collectionSlug = props.slug || getCollectionSlugFromPathname();

  return useMojitoFactory({
    as: 'collection',
    queryKey: QueryKey.get(EMojitoKey.collectionBySlug, {
      slug: collectionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    }),
    options: props.options,
    preloadFn: () => collectionPreloadFn(collectionSlug),
    selectorFn: selectorFn,
  });
}

export default useCollection;
