import { useMemo } from 'react';
import { RefetchOptions, RefetchQueryFilters } from 'react-query';
import {
  BaseQueryHookPropsWithUrlAndSlug,
  BaseQueryHookPropsWithUrlAndSlugAndId,
} from '../../domain/interfaces/hooks.interface';
import { QueryResult } from '../../domain/utils/gql.utils';
import { getPath } from '../../domain/utils/path.util';
import { useCollection, UseCollectionData } from '../useCollection/useCollection';

function transformFn(props: { collection?: UseCollectionData; id?: string }) {
  if (!props.collection) return undefined;
  const itemSlug = getPath[3];

  if (props.id) {
    return props.collection.items.find((e) => e.id == props.id);
  } else {
    props.collection.items.find((e) => e.slug == itemSlug);
  }
}

export type UseMojitoItemData = ReturnType<typeof transformFn>;

export type UseMojitoItemReturn = ReturnType<typeof useMojitoItem>;

export type UseMojitoItemProps = BaseQueryHookPropsWithUrlAndSlugAndId<UseMojitoItemData>;

export function useMojitoItem({ id, ...props }: UseMojitoItemProps = {}): QueryResult<
  'collectionItem',
  UseMojitoItemData,
  Error
> {
  const { collection, error, isLoading, refetch, queryResult } = useCollection({
    url: props.url,
    slug: props.slug,
    options: props.options as BaseQueryHookPropsWithUrlAndSlug<UseCollectionData>['options'],
  });

  const collectionItem = useMemo(() => transformFn({ collection, id }), [id, collection?.items]);

  return {
    collectionItem,
    error,
    isLoading,
    refetch: async <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => {
      const collection = await refetch(options);

      return new Promise(() => ({
        data: transformFn({ collection: collection.data, id }),
        error,
        isLoading,
        refetch,
        queryResult,
      }));
    },
    queryResult,
  };
}

// legacy function
/*

export function useMojitoItem<
  TItem = IMojitoCollectionItemAuctionLot | IMojitoCollectionItemBuyNowLot,
>({
  id,
  ...props
}: {
  url?: string;
  slug?: string;
  id?: string;
  options?: UseQueryOptions<any>;
} = {}): {
  slug: string;
  isLoading: boolean;
  mojitoItem:
    | IMojitoCollectionItem<
        TItem extends IMojitoCollectionItemAuctionLot
          ? IMojitoCollectionItemAuctionLot
          : TItem extends IMojitoCollectionItemBuyNowLot
          ? IMojitoCollectionItemBuyNowLot
          : IMojitoCollectionItemAuctionLot | IMojitoCollectionItemBuyNowLot
      >
    | undefined;
} {
  const { collection, isAuction, isFakeAuction, isLoading } = useCollection(props);
  const itemSlug = getPath[3];

  const mojitoItemByPath = useMemo(
    () =>
      id
        ? collection?.items?.find((e) => e.id == id)
        : collection?.items?.find((e) => e.slug == itemSlug),
    [itemSlug, id, collection?.items],
  );

  return {
    slug: isAuction || isFakeAuction ? itemSlug : '',
    isLoading,
    mojitoItem: mojitoItemByPath,
  };
}

*/
