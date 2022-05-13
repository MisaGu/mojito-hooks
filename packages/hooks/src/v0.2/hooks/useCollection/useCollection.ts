import { useAuth0 } from '@auth0/auth0-react';
import { QueryObserverResult, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { config } from '../../domain/constants/general.constants';
import { IMojitoCollection } from '../../domain/interfaces';
import { useMarketplaceCollectionsSlugWithItemsId } from '../useMarketplaceCollectionsSlugWithItemsId/useMarketplaceCollectionsSlugWithItemsId';
import {
  contentfulGqlClient,
  gqlRequest,
  mojitoGqlClient,
  queryClient,
} from '../../domain/utils/gqlRequest.util';
import { useContentfulAuctionsSlugList } from '../useContentfulAuctionsSlugList/useContentfulAuctionsSlugList';
import { getAuctionSlug } from '../../domain/utils/path.util';
import { contentfulNormalizer, mojitoNormalizer } from '../../domain/utils/gqlDataNormalizer.util';
import { EMojitoQueries, mojitoQueries } from '../../domain/gql/queries';
import { contentfulQueries, EContentfulQueries } from '../../domain/gql/contentful';
import { queryKeyGenerator } from '../../domain/utils/queryKeyGenerator.util';
import { useEffect } from 'react';

// TODO: Separate props and result interfaces in separate file in this module:

interface UseCollectionProps {
  url?: string;
  slug?: string;
  options?: UseQueryOptions<any>;
}

// TODO: Move UseQueryResult to something like queryResult: UseQueryResult?

interface UseCollectionReturn extends Omit<UseQueryResult<IMojitoCollection, unknown>, 'data'> {
  slug: string;
  isAuction: boolean;
  isFakeAuction: boolean;
  collection: IMojitoCollection | null;
}

export function useCollection(props?: UseCollectionProps): UseCollectionReturn {
  const { marketplaceCollectionsSlugWithItemsId } = useMarketplaceCollectionsSlugWithItemsId();
  const { auctionsSlugList } = useContentfulAuctionsSlugList();
  const auctionSlug = getAuctionSlug(props);
  const collectionByPath = marketplaceCollectionsSlugWithItemsId?.find(
    (e) => e.slug == auctionSlug,
  );

  const collectionExists = !!collectionByPath;
  const isAuction = collectionExists && auctionsSlugList.includes(auctionSlug);
  const isFakeAuction = collectionExists && !isAuction;
  const queryKey = queryKeyGenerator(EMojitoQueries.collectionBySlug, {
    slug: auctionSlug,
    marketplaceID: config.MARKETPLACE_ID,
  });

  const { data, refetch, ...result } = useQuery(
    queryKey,
    async () => {
      if (!collectionExists) return null;

      const collectionItems = collectionByPath?.items?.map((item) => item.id);

      // TODO: This is bad and skips type checking:

      await Promise.all([
        queryClient.prefetchQuery(
          [
            `Contentful ${EContentfulQueries[EContentfulQueries.auctionBySlug]}`,
            { slug: auctionSlug },
          ],
          gqlRequest.bind(null, {
            query: contentfulQueries[EContentfulQueries.auctionBySlug],
            variables: { slug: auctionSlug },
            normalizerFn: contentfulNormalizer,
            gqlClient: contentfulGqlClient,
          }),
        ),
        queryClient.prefetchQuery(
          [`Contentful ${EContentfulQueries[EContentfulQueries.shortLots]}`, { slug: auctionSlug }],
          gqlRequest.bind(null, {
            query: contentfulQueries[EContentfulQueries.shortLots],
            variables: {
              slug: auctionSlug,
              mojitoIds: collectionItems,
            },
            normalizerFn: contentfulNormalizer,
            gqlClient: contentfulGqlClient,
          }),
        ),

        // TODO: It should work like this:
        // queryClient.prefetchQuery(queryKeyGenerator(EContentfulQueries.auctionBySlug, { slug: auctionSlug }),
        // queryClient.prefetchQuery(queryKeyGenerator(EContentfulQueries.shortLots, { slug: auctionSlug, mojitoIds: collectionItems }),
      ]);

      return await gqlRequest<IMojitoCollection>({
        query: mojitoQueries[EMojitoQueries.collectionBySlug],
        variables: {
          slug: auctionSlug,
          marketplaceID: config.MARKETPLACE_ID,
        },
        normalizerFn: mojitoNormalizer,
        gqlClient: mojitoGqlClient,
      });
    },
    {
      ...props?.options,
      enabled: collectionExists,
    },
  );

  useEffect(() => {
    if (collectionExists) refetch();
  }, [collectionExists, refetch]);

  return {
    // TODO: These 3 props should just go into collection:
    slug: isAuction || isFakeAuction ? auctionSlug : '',
    isAuction,
    isFakeAuction,
    collection: data,
    refetch,
    ...result,
  };
}
