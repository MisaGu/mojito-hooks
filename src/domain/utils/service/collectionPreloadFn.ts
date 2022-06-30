import { config } from '../../../domain/constants/general.constants';
import { EContentfulKey, EMojitoKey } from '../../../domain/enums/state.enum';
import { ContentfulAuctionsSlugListQuery, MarketplaceResponse } from '../../../domain/interfaces';
import { queryClient } from '../gqlRequest.util';
import { QueryKey } from '../queryKeyFactory.util';

export async function collectionPreloadFn(collectionSlug?: string) {
  if (!collectionSlug) return;

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
    const collectionItems = mojitoCollection.items.map((item) => item.id);

    await Promise.all([
      queryClient.prefetchQuery(
        QueryKey.get(EContentfulKey.auctionBySlug, { slug: collectionSlug }),
      ),
      queryClient.prefetchQuery(
        QueryKey.get(EContentfulKey.shortLots, { mojitoIds: collectionItems }),
      ),
    ]);
  }
}
