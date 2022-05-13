import { dehydrate, DehydratedState } from 'react-query';
import { EMojitoQueries, mojitoQueries } from '../gql/queries';
import { contentfulQueries, EContentfulQueries } from '../gql/contentful';
import { config } from '../constants/general.constants';
import { IMojitoCollection } from '../interfaces';
import { contentfulNormalizer, mojitoNormalizer } from './gqlDataNormalizer.util';
import { contentfulGqlClient, gqlRequest, mojitoGqlClient, queryClient } from './gqlRequest.util';

export async function getDehydratedState(
  props: any,
  options = { loadSingleLotPageFullInfo: false },
): Promise<{
  dehydratedState: DehydratedState;
}> {
  const pathArr = (props.asPath ?? props?.resolvedUrl ?? props.req?.url)
    ?.split('#')[0]
    .split('?')[0]
    .split('/');
  const singleLotPageSlug = pathArr && pathArr.length === 4 && pathArr[3];
  const auctionPageSlug = pathArr && pathArr[1];

  if (auctionPageSlug == '500') return { dehydratedState: dehydrate(queryClient) };

  const marketplaceCollectionsSlugQueryKey = [
    `Mojito ${EMojitoQueries[EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug]}`,
    { id: config.MARKETPLACE_ID },
  ];

  await Promise.all([
    queryClient.prefetchQuery(
      marketplaceCollectionsSlugQueryKey,
      gqlRequest.bind(null, {
        query: mojitoQueries[EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug],
        variables: { id: config.MARKETPLACE_ID },
        normalizerFn: mojitoNormalizer,
        gqlClient: mojitoGqlClient,
      }),
    ),
    queryClient.prefetchQuery(
      [`Contentful ${EContentfulQueries[EContentfulQueries.auctionsSlugList]}`],
      gqlRequest.bind(null, {
        query: contentfulQueries[EContentfulQueries.auctionsSlugList],
        normalizerFn: contentfulNormalizer,
        gqlClient: contentfulGqlClient,
      }),
    ),
    queryClient.prefetchQuery(
      [`Contentful ${EContentfulQueries[EContentfulQueries.organizations]}`],
      gqlRequest.bind(null, {
        query: contentfulQueries[EContentfulQueries.organizations],
        normalizerFn: contentfulNormalizer,
        gqlClient: contentfulGqlClient,
      }),
    ),
  ]);

  const collections = queryClient.getQueryState<any>(marketplaceCollectionsSlugQueryKey)?.data
    ?.marketplace.collections;
  const collectionByPath: IMojitoCollection = collections?.find(
    (e: IMojitoCollection) => e.slug == auctionPageSlug,
  );

  if (collectionByPath) {
    const collectionItemsId = collectionByPath.items.map((e) => e.id);
    const pageSpecificRequests: any[] = [];

    if (options.loadSingleLotPageFullInfo) {
      const mojitoLotId = collectionByPath.items.find((e) => e.slug === singleLotPageSlug)?.id;

      if (mojitoLotId) {
        pageSpecificRequests.push(
          queryClient.prefetchQuery(
            [
              `Contentful ${EContentfulQueries[EContentfulQueries.fullLot]}`,
              { mojitoId: mojitoLotId },
            ],
            gqlRequest.bind(null, {
              query: contentfulQueries[EContentfulQueries.fullLot],
              variables: {
                slug: auctionPageSlug,
                mojitoId: mojitoLotId,
              },
              normalizerFn: contentfulNormalizer,
              gqlClient: contentfulGqlClient,
            }),
          ),
        );
      }
    }

    await Promise.all([
      queryClient.prefetchQuery(
        [
          `Contentful ${EContentfulQueries[EContentfulQueries.auctionBySlug]}`,
          { slug: auctionPageSlug },
        ],
        gqlRequest.bind(null, {
          query: contentfulQueries[EContentfulQueries.auctionBySlug],
          variables: { slug: auctionPageSlug },
          normalizerFn: contentfulNormalizer,
          gqlClient: contentfulGqlClient,
        }),
      ),
      queryClient.prefetchQuery(
        [
          `Contentful ${EContentfulQueries[EContentfulQueries.shortLots]}`,
          { slug: auctionPageSlug },
        ],
        gqlRequest.bind(null, {
          query: contentfulQueries[EContentfulQueries.shortLots],
          variables: {
            slug: auctionPageSlug,
            mojitoIds: collectionItemsId,
          },
          normalizerFn: contentfulNormalizer,
          gqlClient: contentfulGqlClient,
        }),
      ),
      ...pageSpecificRequests,
    ]);
    await queryClient.prefetchQuery(
      [
        `Mojito ${EMojitoQueries[EMojitoQueries.collectionBySlug]}`,
        { slug: auctionPageSlug, marketplaceID: config.MARKETPLACE_ID },
      ],
      gqlRequest.bind(null, {
        query: mojitoQueries[EMojitoQueries.collectionBySlug],
        variables: {
          slug: auctionPageSlug,
          marketplaceID: config.MARKETPLACE_ID,
        },
        normalizerFn: mojitoNormalizer,
        gqlClient: mojitoGqlClient,
      }),
    );
  }
  props.res?.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  return { dehydratedState: dehydrate(queryClient) };
}

export default getDehydratedState;
