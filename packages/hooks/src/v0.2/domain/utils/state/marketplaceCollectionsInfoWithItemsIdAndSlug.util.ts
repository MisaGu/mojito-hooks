import { config } from '../../constants/general.constants';
import { EMojitoQueries } from '../../gql/queries';
import {
  MojitoMarketplaceCollection,
  MojitoMarketplaceCollectionItem,
} from '../../interfaces/mojito-normalized.interface';
import { queryClient } from '../gqlRequest.util';
import { QueryKey } from '../queryKeyFactory.util';

const marketplaceCollectionsSlugQueryKey = QueryKey.get(
  EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
  { id: config.MARKETPLACE_ID },
);

export function checkCollectionSlug(slug?: string): string | undefined {
  if (!slug) return undefined;

  const _data = queryClient.getQueryData<MojitoMarketplaceCollection[]>(
    marketplaceCollectionsSlugQueryKey,
  );

  return _data?.find((collection) => collection.slug == slug)?.slug;
}

export function checkCollectionId(id?: string): string | undefined {
  if (!id) return undefined;

  const _data = queryClient.getQueryData<MojitoMarketplaceCollection[]>(
    marketplaceCollectionsSlugQueryKey,
  );

  return _data?.find((collection) => collection.id == id)?.id;
}

export function checkCollectionItemSlug(slug?: string): string | undefined {
  if (!slug) return undefined;

  const _data = queryClient.getQueryData<MojitoMarketplaceCollection[]>(
    marketplaceCollectionsSlugQueryKey,
  );

  return _data
    ?.reduce<MojitoMarketplaceCollectionItem[]>(
      (acc, collection) => acc.concat(collection.items),
      [],
    )
    ?.find((item) => item.slug == slug)?.slug;
}

export function checkCollectionItemId(id?: string): string | undefined {
  if (!id) return undefined;

  const _data = queryClient.getQueryData<MojitoMarketplaceCollection[]>(
    marketplaceCollectionsSlugQueryKey,
  );

  return _data
    ?.reduce<MojitoMarketplaceCollectionItem[]>(
      (acc, collection) => acc.concat(collection.items),
      [],
    )
    ?.find((item) => item.id == id)?.id;
}
