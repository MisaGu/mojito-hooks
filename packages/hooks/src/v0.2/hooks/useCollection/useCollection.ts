import { useQueryClient } from 'react-query';
import { config } from '../../domain/constants/general.constants';
import {
  IContentfulAuctionsQuery,
  IMojitoCollection,
  IMojitoMarketplaceResponse,
} from '../../domain/interfaces';
import { getCollectionSlug } from '../../domain/utils/path.util';
import { EMojitoQueries } from '../../domain/gql/queries';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';

export type UseCollectionData = IMojitoCollection | null | undefined;

export type UseCollectionReturn = ReturnType<typeof useCollection>;

export type UseCollectionProps = BaseQueryHookPropsWithUrlAndSlug<UseCollectionData>;

export function useCollection(props?: UseCollectionProps) {
  const queryClient = useQueryClient();
  const collectionSlug = getCollectionSlug(props);

  async function preloadFn() {
    const [mojitoCollections, contentfulCollectionSlugsOnly] = await Promise.all([
      queryClient.fetchQuery<IMojitoMarketplaceResponse>(
        QueryKey.get(EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug, {
          id: config.MARKETPLACE_ID,
        }),
      ),
      queryClient.fetchQuery<IContentfulAuctionsQuery>(
        QueryKey.get(EContentfulQueries.auctionsSlugList),
      ),
    ]);

    const mojitoCollection = mojitoCollections.marketplace.collections.find(
      (collection) => collection.slug == collectionSlug,
    );

    const contentfulCollection = contentfulCollectionSlugsOnly.auctionCollection.items.find(
      (collection) => collection.slug == collectionSlug,
    );

    if (!mojitoCollection) return null;

    if (contentfulCollection) {
      const collectionItems = mojitoCollection.items.map((item) => item.id);

      await Promise.all([
        queryClient.prefetchQuery(
          QueryKey.get(EContentfulQueries.auctionBySlug, { slug: collectionSlug }),
        ),
        queryClient.prefetchQuery(
          QueryKey.get(EContentfulQueries.shortLots, { mojitoIds: collectionItems }),
        ),
      ]);
    }
  }

  return useMojitoFactory({
    as: 'collection',
    query: EMojitoQueries.collectionBySlug,
    variables: {
      slug: collectionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    },
    options: props?.options,
    preloadFn,
  });
}
