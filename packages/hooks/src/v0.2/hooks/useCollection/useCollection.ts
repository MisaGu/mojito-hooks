import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { config } from '../../domain/constants/general.constants';
import { IMojitoCollection } from '../../domain/interfaces';
import { getAuctionSlug } from '../../domain/utils/path.util';
import { EMojitoQueries } from '../../domain/gql/queries';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { queryKeyGenerator } from '../../domain/utils/queryKeyGenerator.util';
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

// const { auctionsSlugList } = queryClient.getFromCache(contentfulQueryKeyGenerator(EContentfulQueries.auctionsSlugList))
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

  const queryKey = queryKeyGenerator(EMojitoQueries.collectionBySlug, {
    slug: auctionSlug,
    marketplaceID: config.MARKETPLACE_ID,
  });

  // TODO: Check what happens when the timer runs out:

  // console.log('RUN HOOK');

  // TODO: USe useMojitoFactory here too and update useMojitoFactory to accept a function as second param.
  // NOT REALLY, THAT SECOND PARAM FN SHOULD NOT BE USED.

  // TODO: Extract test/demo constants/ids/etc. to constants...

  const result = useQuery<UseCollectionData>(
    queryKey,
    async () => {
      // TODO: Can we type-check queries and variables in queryKeyGenerator and return type in prefetchQuery?

      // console.log('RUN QUERY');

      const [marketplaceCollectionsData, auctionsSlugListData] = await Promise.all([
        queryClient.fetchQuery(
          queryKeyGenerator(EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug, {
            id: config.MARKETPLACE_ID,
          }),
        ),
        queryClient.fetchQuery(queryKeyGenerator(EContentfulQueries.auctionsSlugList)),
      ]);

      const marketplaceCollections =
        (marketplaceCollectionsData as any)?.marketplace?.collections || [];
      const collectionByPath = marketplaceCollections.find((e) => e.slug == auctionSlug);

      console.log('collectionByPath =', collectionByPath);

      if (!collectionByPath) return null;

      const existsOnContentful = (auctionsSlugListData as any)?.auctionCollection?.items.includes(
        auctionSlug,
      );

      console.log('existsOnContentful =', existsOnContentful);

      if (existsOnContentful) {
        console.log('\nPREFETCHING AUCTION DATA\n');

        const collectionItems = collectionByPath?.items?.map((item) => item.id);

        // TODO: This is bad and skips type checking:
        await Promise.all([
          queryClient.prefetchQuery(
            queryKeyGenerator(EContentfulQueries.auctionBySlug, { slug: auctionSlug }),
          ),
          queryClient.prefetchQuery(
            queryKeyGenerator(EContentfulQueries.shortLots, { mojitoIds: collectionItems }),
          ),
        ]);
      }

      return await queryClient.fetchQuery<IMojitoCollection>(queryKey);
    },
    props?.options,
  );

  console.log('useCollection result =', result);

  return normalizeQueryResult('collection', result);
}
