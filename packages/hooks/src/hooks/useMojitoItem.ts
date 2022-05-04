import {
  IMojitoCollectionItem,
  IMojitoCollectionItemAuctionLot,
  IMojitoCollectionItemBuyNowLot,
} from '@interfaces/mojito.interface';
import { getPath } from '@utils/path.util';
import { useMemo } from 'react';
import { UseQueryOptions } from 'react-query';
import { useCollection } from './useCollection';

export function useMojitoItem<
  TItem = IMojitoCollectionItemAuctionLot | IMojitoCollectionItemBuyNowLot,
>(
  props: {
    url?: string;
    slug?: string;
    id?: string;
    options?: UseQueryOptions<any>;
  } = {},
): {
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
  const { collection, isAuction, isFakeAuction, isLoading } = useCollection({
    url: props.url,
    slug: props.slug,
    options: props.options,
  });
  const itemSlug = getPath[3];
  const mojitoItemByPath = useMemo(
    () =>
      props?.id
        ? collection?.items?.find((e) => e.id == props.id)
        : collection?.items?.find((e) => e.slug == itemSlug),
    [itemSlug, props?.id, collection?.items],
  );

  return {
    slug: isAuction || isFakeAuction ? itemSlug : '',
    isLoading,
    mojitoItem: mojitoItemByPath,
  };
}
