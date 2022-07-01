import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CollectionBySlugResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { collectionItemPreloadFn } from '../../domain/utils/service/collectionItemPreloadFn';
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

export type UseCollectionData = ReturnType<ReturnType<typeof selectorFn>>;

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
    queryKey: QueryKey.get(EMojitoKey.collectionBySlug, {
      slug: _collectionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    }),
    deps: [props.id, _slug],
    options: props.options,
    selectorFn: selectorFn(props.id, _slug),
    onQueryBegin: () =>
      collectionItemPreloadFn({ collectionSlug: _collectionSlug, id: props.id, slug: _slug }),
    force: true,
  });
}

export default useCollectionItem;
