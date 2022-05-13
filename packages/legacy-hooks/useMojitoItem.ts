import { useMemo } from 'react';
import { UseQueryOptions } from 'react-query';
import {
  IMojitoCollectionItem,
  IMojitoCollectionItemAuctionLot,
  IMojitoCollectionItemBuyNowLot,
} from '../domain/interfaces';
import { getPath } from '../utils';
import { useCollection } from './useCollection';

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
