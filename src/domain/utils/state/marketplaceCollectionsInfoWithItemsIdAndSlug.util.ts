import { config } from '../../constants/general.constants';
import { EMojitoKey } from '../../enums/state.enum';
import {
  MarketplaceResponse,
  MojitoMarketplaceCollectionItem,
} from '../../interfaces/mojito-normalized.interface';
import { queryClient } from '../gqlRequest.util';
import { QueryKey } from '../queryKeyFactory.util';

const marketplaceCollectionsSlugQueryKey = QueryKey.get(
  EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug,
  { id: config.MARKETPLACE_ID },
);

function getData() {
  const _data = queryClient.getQueryData<MarketplaceResponse>(marketplaceCollectionsSlugQueryKey)
    ?.marketplace?.collections;

  if (!_data) queryClient.fetchQuery(marketplaceCollectionsSlugQueryKey);

  return _data;
}

export function checkCollectionSlug(slug?: string): string | undefined {
  if (!slug) return undefined;
  const _data = getData();

  return _data?.find((collection) => collection.slug == slug)?.slug;
}

export function checkCollectionId(id?: string): string | undefined {
  if (!id) return undefined;
  const _data = getData();

  return _data?.find((collection) => collection.id == id)?.id;
}

export function checkCollectionItemSlug(slug?: string): string | undefined {
  if (!slug) return undefined;
  const _data = getData();

  return _data
    ?.reduce<MojitoMarketplaceCollectionItem[]>(
      (acc, collection) => acc.concat(collection.items),
      [],
    )
    ?.find((item) => item.slug == slug)?.slug;
}

export function checkCollectionItemId(id?: string): string | undefined {
  if (!id) return undefined;
  const _data = getData();

  return _data
    ?.reduce<MojitoMarketplaceCollectionItem[]>(
      (acc, collection) => acc.concat(collection.items),
      [],
    )
    ?.find((item) => item.id == id)?.id;
}
