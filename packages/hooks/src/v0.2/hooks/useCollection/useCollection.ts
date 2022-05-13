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
import { getAuctionSlug, getPath } from '../../domain/utils/path.util';
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

  const isAuction = !!collectionByPath && auctionsSlugList.includes(auctionSlug);
  const isFakeAuction = !!collectionByPath && !auctionsSlugList.includes(auctionSlug);
  const isAnyAuction = isAuction || isFakeAuction;
  const queryKey = queryKeyGenerator(EMojitoQueries.collectionBySlug, {
    slug: auctionSlug,
    marketplaceID: config.MARKETPLACE_ID,
  });

  console.log({ auctionSlug, collectionByPath, isAuction, isFakeAuction });

  const { data, refetch, ...result } = useQuery(
    queryKey,
    async () => {
      /*
    const token = await getIdTokenClaims();

    if (token) {
      mojitoGqlClient.setHeader('authorization', `Bearer ${token.__raw}`);
    }
    */

      if (!isAnyAuction) return null;

      /*
    const collectionItems = collectionByPath?.items?.map((e) => e.id);

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
    ]);
    */

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
      enabled: isAnyAuction,
    },
  );

  useEffect(() => {
    if (isAnyAuction) {
      console.log('REFETCH');

      refetch();
    }
  }, [isAnyAuction, refetch]);

  return {
    slug: isAuction || isFakeAuction ? auctionSlug : '',
    isAuction,
    isFakeAuction,
    collection: data,
    refetch,
    ...result,
  };
}
