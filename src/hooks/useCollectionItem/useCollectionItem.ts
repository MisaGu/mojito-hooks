import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CollectionBySlugResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { collectionPreloadFn } from '../../domain/utils/service/collectionPreloadFn';
import {
  getCollectionItemSlugFromPathname,
  getCollectionSlugFromPathname,
} from '../../domain/utils/state/path.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(id?: string, slug?: string) {
  return (response?: CollectionBySlugResponse) => {
    if (!response) return undefined;

    return response.collectionBySlug.items.find((item) => item.id === id || item.slug === slug);
  };
}

export type UseCollectionData = ReturnType<typeof selectorFn>;

export type UseCollectionReturn = ReturnType<typeof useCollectionItem>;

export type UseCollectionProps = BaseQueryHookProps<UseCollectionData> & {
  collectionSlug?: string;
  id?: string;
  slug?: string;
};

export function useCollectionItem(props: UseCollectionProps) {
  const _collectionSlug = props.collectionSlug || getCollectionSlugFromPathname();
  const _slug = props.slug || getCollectionItemSlugFromPathname();

  return useMojitoFactory({
    as: 'collectionItem',
    query: EMojitoKey.collectionBySlug,
    variables: {
      slug: _collectionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    },
    options: props.options,
    preloadFn: () => collectionPreloadFn(_collectionSlug),
    selectorFn: selectorFn(props.id, _slug),
  });
}

export default useCollectionItem;
