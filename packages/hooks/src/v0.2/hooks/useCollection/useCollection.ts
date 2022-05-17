import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { config } from '../../domain/constants/general.constants';
import { IMojitoCollection } from '../../domain/interfaces';
import { getAuctionSlug } from '../../domain/utils/path.util';
import { EMojitoQueries } from '../../domain/gql/queries';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { normalizeQueryResult, QueryResult } from '../../domain/utils/gql.utils';

// TODO: Separate props and result interfaces in separate file in this module:

interface UseCollectionProps {
  url?: string;
  slug?: string;
  options?: UseQueryOptions<any>;
}

export type UseCollectionData = IMojitoCollection | null;

export type UseCollectionReturn = QueryResult<'collection', UseCollectionData>;

// TODO: To normalizer:

// const { marketplaceCollectionsSlugWithItemsId } = useMarketplaceCollectionsSlugWithItemsId();

// const { auctionsSlugList } = useContentfulAuctionsSlugList();
// (EContentfulQueries.auctionsSlugList) data?.auctionCollection?.items?.map((collection: IContentfulAuction) => collection.slug)

// const collectionByPath = marketplaceCollectionsSlugWithItemsId?.find(
//   (e) => e.slug == variables.slug,
// );

// const collectionExists = !!collectionByPath;
// const isAuction = collectionExists && auctionsSlugList.includes(variables.slug);
// const isFakeAuction = collectionExists && !isAuction;

// const { auctionsSlugList } = queryClient.getFromCache(QueryKey.get(EContentfulQueries.auctionsSlugList))
// const isFake = !auctionsSlugList.includes(variables.slug);

/*
return {
  collection: data,
  slug: isAuction || isFakeAuction ? auctionSlug : '',
  isAuction,
  isFakeAuction,
};

TODO: This has been renamed to isFake (this means we don't have data from Contentful)
*/

export function useCollection(props?: UseCollectionProps): UseCollectionReturn {
  const queryClient = useQueryClient();
  const auctionSlug = getAuctionSlug(props);

  const queryKey = QueryKey.get(EMojitoQueries.collectionBySlug, {
    slug: auctionSlug,
    marketplaceID: config.MARKETPLACE_ID,
  });

  // TODO: Check what happens when the timer runs out:

  // console.log('RUN HOOK');

  const result = useQuery<UseCollectionData>(
    queryKey,
    async () => {
      // TODO: Can we type-check queries and variables in QueryKey.get and return type in prefetchQuery?

      // console.log('RUN QUERY');

      const data = await queryClient.fetchQuery(
        QueryKey.get(EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug, {
          id: config.MARKETPLACE_ID,
        }),
      );

      // TODO: Move fetching and slug validation here:
      // queryClient.prefetchQuery(contentfulQueryKey.get(EContentfulQueries.auctionsSlugList)),

      const existsOnContentful = true;

      const marketplaceCollections = (data as any)?.marketplace?.collections || [];

      const collectionByPath = marketplaceCollections.find((e) => e.slug == auctionSlug);

      if (!collectionByPath) return null;

      if (existsOnContentful) {
        const collectionItems = collectionByPath?.items?.map((item) => item.id);

        // TODO: This is bad and skips type checking:
        await Promise.all([
          queryClient.prefetchQuery(
            QueryKey.get(EContentfulQueries.auctionBySlug, { slug: auctionSlug }),
          ),
          queryClient.prefetchQuery(
            QueryKey.get(EContentfulQueries.shortLots, { mojitoIds: collectionItems }),
          ),
        ]);
      }

      return await queryClient.fetchQuery<IMojitoCollection>(queryKey);
    },
    props?.options,
  );

  return normalizeQueryResult('collection', result);
}
