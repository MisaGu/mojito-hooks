import { config } from '../../../domain/constants/general.constants';
import { EMojitoKey, EContentfulKey } from '../../../domain/enums/state.enum';
import { MarketplaceResponse, ContentfulAuctionsSlugListQuery } from '../../../domain/interfaces';
import { queryClient } from '../gqlRequest.util';
import { QueryKey } from '../queryKeyFactory.util';

export async function collectionItemPreloadFn({
  id,
  slug,
  collectionSlug,
}: {
  collectionSlug?: string;
  id?: string;
  slug?: string;
}) {
  if (!collectionSlug || (!id && !slug)) return;

  const [mojitoCollections, contentfulCollectionSlugsOnly] = await Promise.all([
    queryClient.fetchQuery<MarketplaceResponse>(
      QueryKey.get(EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug, {
        id: config.MARKETPLACE_ID,
      }),
    ),
    queryClient.fetchQuery<ContentfulAuctionsSlugListQuery>(
      QueryKey.get(EContentfulKey.auctionsSlugList),
    ),
  ]);

  const mojitoCollection = mojitoCollections.marketplace.collections.find(
    (collection) => collection.slug == collectionSlug,
  );

  const contentfulCollection = contentfulCollectionSlugsOnly.auctionCollection.items.find(
    (collection) => collection.slug == collectionSlug,
  );

  if (!mojitoCollection) return;

  if (contentfulCollection) {
    const collectionItem = mojitoCollection.items.find(
      (item) => item.id == id || item.slug == slug,
    );

    if (!collectionItem) return;

    await Promise.all([
      queryClient.prefetchQuery(
        QueryKey.get(EContentfulKey.auctionBySlug, { slug: collectionSlug }),
      ),
      queryClient.prefetchQuery(
        QueryKey.get(EContentfulKey.fullLot, { mojitoId: collectionItem.id }),
      ),
    ]);
  }
}
