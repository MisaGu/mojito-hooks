import { useAuth0 } from '@auth0/auth0-react';
import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import { EMojitoQueries, mojitoQueries } from '../data';
import { contentfulQueries, EContentfulQueries } from '../data/graph_ql/contentful.query';
import { config } from '../domain/general.constants';
import { IMojitoCollection } from '../domain/interfaces';
import { contentfulNormalizer, getPath, gqlRequest, mojitoNormalizer, queryClient } from '../utils';
import { contentfulGqlClient, useContentfulAuctionsSlugList } from './useContentful';
import { mojitoGqlClient, useMarketplaceCollectionsSlugWithItemsId } from './useMojito';

/*

THIS WHOLE FILE HAS BEEN MOVED TO V2.

*/

export function useCollection<TSelectorResult = undefined>(
  props: {
    url?: string;
    slug?: string;
    options?: UseQueryOptions<any>;
    selector?: (state: IMojitoCollection) => TSelectorResult;
  } = {},
): {
  slug: string;
  isAuction: boolean;
  isFakeAuction: boolean;
} & (TSelectorResult extends undefined
  ? {
      collection: IMojitoCollection | null;
    } & Omit<QueryObserverResult<IMojitoCollection, unknown>, 'data'>
  : { data?: TSelectorResult }) {
  const { getIdTokenClaims } = useAuth0();
  const { marketplaceCollectionsSlugWithItemsId } = useMarketplaceCollectionsSlugWithItemsId();
  const { auctionsSlugList } = useContentfulAuctionsSlugList();

  // const marketplaceCollectionsSlugWithItemsId = queryClient.getQueriesData([
  //   `Mojito ${EMojitoQueries[EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug]}`,
  //   { id: config.MARKETPLACE_ID },
  // ]);

  // const auctionsSlugList = queryClient.getQueriesData([
  //   `Contentful ${EContentfulQueries[EContentfulQueries.auctionsSlugList]}`,
  // ]);

  const auctionSlug = getPath[1];
  const collectionByPath = marketplaceCollectionsSlugWithItemsId?.find(
    (e) => e.slug == auctionSlug,
  );

  const isAuction = !!collectionByPath && auctionsSlugList.includes(auctionSlug);
  const isFakeAuction = !!collectionByPath && !auctionsSlugList.includes(auctionSlug);
  const queryKey = [
    `Mojito ${EMojitoQueries[EMojitoQueries.collectionBySlug]}`,
    {
      slug: auctionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    },
  ];

  const { data, ...result } = useQuery(
    queryKey,
    async () => {
      const token = await getIdTokenClaims();
      if (token) {
        mojitoGqlClient.setHeader('authorization', `Bearer ${token.__raw}`);
      }

      if (!isAuction && !isFakeAuction) return null;
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
    // @ts-ignore
    props?.options ? { ...props?.options } : {},
  );

  // @ts-ignore
  return {
    slug: isAuction || isFakeAuction ? auctionSlug : '',
    isAuction,
    isFakeAuction,
    ...(props?.selector ? { data } : { collection: data ?? null, ...result }),
  };
}
