import { useMemo } from 'react';
import { RefetchOptions, RefetchQueryFilters } from 'react-query';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { QueryResult } from '../../domain/utils/gql.utils';
import { getItemSlug } from '../../domain/utils/path.util';
import { useCollection, UseCollectionData } from '../useCollection/useCollection';

interface TransformFnProps {
  pathname?: string;
  collectionItemID?: string;
}

function transformFn(collection?: UseCollectionData, props?: TransformFnProps) {
  if (!collection) return undefined;

  const collectionItemID = props?.collectionItemID;
  const itemSlug = getItemSlug({ pathname: props?.pathname });

  return collection.items.find(
    collectionItemID
      ? (collectionItem) => collectionItem.id == collectionItemID
      : (collectionItem) => collectionItem.slug == itemSlug,
  );
}

export type UseMojitoItemData = ReturnType<typeof transformFn>;

export type UseMojitoItemReturn = ReturnType<typeof useMojitoItem>;

export interface UseMojitoItemProps extends BaseQueryHookPropsWithUrlAndSlug<UseMojitoItemData> {
  collectionItemID?: string;
}

export function useMojitoItem(
  props: UseMojitoItemProps = {},
): QueryResult<'collectionItem', UseMojitoItemData, Error> {
  const { collection, error, isLoading, refetch, queryResult } = useCollection({
    pathname: props.pathname,
    slug: props.slug,
    options: props.options as BaseQueryHookPropsWithUrlAndSlug<UseCollectionData>['options'],
  });

  const collectionItem = useMemo(() => {
    return transformFn(collection, props);
  }, [collection?.items, props.collectionItemID, props.pathname]);

  return {
    collectionItem,
    error,
    isLoading,
    refetch: async <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => {
      const collection = await refetch(options);

      return new Promise(() => ({
        data: transformFn(collection.data, props),
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
