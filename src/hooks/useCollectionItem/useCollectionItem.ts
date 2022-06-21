import { CollectionBySlugResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useCollection } from '../useCollection/useCollection';

function selectorFn(id: string) {
  return (response?: CollectionBySlugResponse) => {
    if (!response) return undefined;

    return response.collectionBySlug.items.find((item) => item.id === id);
  };
}

export type UseCollectionData = ReturnType<typeof selectorFn>;

export type UseCollectionReturn = ReturnType<typeof useCollectionItem>;

export type UseCollectionProps = BaseQueryHookProps<UseCollectionData> & {
  collectionSlug: string;
  id: string;
};

export function useCollectionItem(props: UseCollectionProps) {
  const { collection: collectionItem, ...result } = useCollection({
    slug: props.collectionSlug,
    selectorFn: props.id ? selectorFn(props.id) : () => undefined,
  });
  return { collectionItem, ...result };
}

export default useCollectionItem;
