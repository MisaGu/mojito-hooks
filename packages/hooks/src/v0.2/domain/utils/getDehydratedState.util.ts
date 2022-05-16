import { dehydrate, DehydratedState } from 'react-query';
import { EMojitoQueries, mojitoQueries } from '../gql/queries';
import { contentfulQueries, EContentfulQueries } from '../gql/contentful';
import { config } from '../constants/general.constants';
import { IMojitoCollection } from '../interfaces';
import { contentfulNormalizer, mojitoNormalizer } from './gqlDataNormalizer.util';
import { contentfulGqlClient, mojitoGqlClient, queryClient } from './gqlRequest.util';
import { queryKeyGenerator } from './queryKeyGenerator.util';

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

  const marketplaceCollectionsSlugQueryKey = queryKeyGenerator(
    EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    { id: config.MARKETPLACE_ID },
  );

  await Promise.all([
    queryClient.prefetchQuery(marketplaceCollectionsSlugQueryKey),
    queryClient.prefetchQuery(queryKeyGenerator(EContentfulQueries.auctionsSlugList)),
    queryClient.prefetchQuery(queryKeyGenerator(EContentfulQueries.organizations)),
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
            queryKeyGenerator(EContentfulQueries.fullLot, { mojitoId: mojitoLotId }),
          ),
        );
      }
    }

    await Promise.all([
      queryClient.prefetchQuery(
        queryKeyGenerator(EContentfulQueries.auctionBySlug, { slug: auctionPageSlug }),
      ),
      queryClient.prefetchQuery(
        queryKeyGenerator(EContentfulQueries.shortLots, { mojitoIds: collectionItemsId }),
      ),
      ...pageSpecificRequests,
    ]);

    await queryClient.prefetchQuery(
      queryKeyGenerator(EMojitoQueries.collectionBySlug, {
        slug: auctionPageSlug,
        marketplaceID: config.MARKETPLACE_ID,
      }),
    );
  }

  props.res?.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return { dehydratedState: dehydrate(queryClient) };
}

export default getDehydratedState;
