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
import { QueryResult } from '../../domain/utils/gql.utils';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { BaseHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';

export type UseCollectionData = IMojitoCollection | null | undefined;

export type UseCollectionReturn = QueryResult<'collection', UseCollectionData>;

export type UseCollectionProps = BaseHookPropsWithUrlAndSlug<UseCollectionData>;

export function useCollection(props?: UseCollectionProps): UseCollectionReturn {
  const queryClient = useQueryClient();
  const queryFn = queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;
  const collectionSlug = getCollectionSlug(props);

  async function useCollectionFn() {
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

    // We can't call the queryClient for the same `queryKey` here:
    // return await queryClient.fetchQuery<IMojitoCollection>(queryKey, { cacheTime: 0 });

    // Instead, we need to get the queryFn from queryClient's options (getDefaultOptions):

    const queryKey = QueryKey.get(EMojitoQueries.collectionBySlug, {
      slug: collectionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    });

    return (await queryFn({ queryKey, meta: undefined })) as IMojitoCollection;
  }

  return useMojitoFactory<'collection', UseCollectionData>({
    as: 'collection',
    query: EMojitoQueries.collectionBySlug,
    variables: {
      slug: collectionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    },
    options: {
      ...props?.options,
      queryFn: useCollectionFn,
    },
  });
}
