import { dehydrate, DehydratedState } from 'react-query';
import { config } from '../constants/general.constants';
import { EContentfulQueries } from '../gql/contentful';
import { EMojitoQueries } from '../gql/queries';
import { MojitoCollection } from '../interfaces';
import { queryClient } from './gqlRequest.util';
import { QueryKey } from './queryKeyFactory.util';

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

  const marketplaceCollectionsSlugQueryKey = QueryKey.get(
    EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    { id: config.MARKETPLACE_ID },
  );

  await Promise.all([
    queryClient.prefetchQuery(marketplaceCollectionsSlugQueryKey),
    queryClient.prefetchQuery(QueryKey.get(EContentfulQueries.auctionsSlugList)),
    queryClient.prefetchQuery(QueryKey.get(EContentfulQueries.organizations)),
  ]);

  const collections = queryClient.getQueryState<any>(marketplaceCollectionsSlugQueryKey)?.data
    ?.marketplace.collections;

  const collectionByPath: MojitoCollection = collections?.find(
    (e: MojitoCollection) => e.slug == auctionPageSlug,
  );

  if (collectionByPath) {
    const collectionItemsId = collectionByPath.items.map((e) => e.id);
    const pageSpecificRequests: any[] = [];

    if (options.loadSingleLotPageFullInfo) {
      const mojitoLotId = collectionByPath.items.find((e) => e.slug === singleLotPageSlug)?.id;

      if (mojitoLotId) {
        pageSpecificRequests.push(
          queryClient.prefetchQuery(
            QueryKey.get(EContentfulQueries.fullLot, { mojitoId: mojitoLotId }),
          ),
        );
      }
    }

    await Promise.all([
      queryClient.prefetchQuery(
        QueryKey.get(EContentfulQueries.auctionBySlug, { slug: auctionPageSlug }),
      ),
      queryClient.prefetchQuery(
        QueryKey.get(EContentfulQueries.shortLots, { mojitoIds: collectionItemsId }),
      ),
      ...pageSpecificRequests,
    ]);

    await queryClient.prefetchQuery(
      QueryKey.get(EMojitoQueries.collectionBySlug, {
        slug: auctionPageSlug,
        marketplaceID: config.MARKETPLACE_ID,
      }),
    );
  }

  props.res?.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return { dehydratedState: dehydrate(queryClient) };
}

export default getDehydratedState;
