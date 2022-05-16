import { useAuth0 } from '@auth0/auth0-react';
import {
  QueryObserverResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import { config } from '../../domain/constants/general.constants';
import { IMojitoCollection } from '../../domain/interfaces';
import { useMarketplaceCollectionsSlugWithItemsId } from '../useMarketplaceCollectionsSlugWithItemsId/useMarketplaceCollectionsSlugWithItemsId';
import {
  contentfulGqlClient,
  gqlRequest,
  mojitoGqlClient,
} from '../../domain/utils/gqlRequest.util';
import { useContentfulAuctionsSlugList } from '../useContentfulAuctionsSlugList/useContentfulAuctionsSlugList';
import { getAuctionSlug } from '../../domain/utils/path.util';
import { contentfulNormalizer, mojitoNormalizer } from '../../domain/utils/gqlDataNormalizer.util';
import { EMojitoQueries, mojitoQueries } from '../../domain/gql/queries';
import { contentfulQueries, EContentfulQueries } from '../../domain/gql/contentful';
import {
  contentfulQueryKeyGenerator,
  queryKeyGenerator,
} from '../../domain/utils/queryKeyGenerator.util';
import { useEffect } from 'react';
import { getQueryParams, getQueryReturn, QueryResult } from '../../domain/interfaces/gql.interface';

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

/*
return {
  collection: data,
  slug: isAuction || isFakeAuction ? auctionSlug : '',
  isAuction,
  isFakeAuction,
};
*/

export function useCollection(props?: UseCollectionProps): UseCollectionReturn {
  const queryClient = useQueryClient();
  const auctionSlug = getAuctionSlug(props);

  const queryKey = queryKeyGenerator(EMojitoQueries.collectionBySlug, {
    slug: auctionSlug,
    marketplaceID: config.MARKETPLACE_ID,
  });

  // TODO: Check what happens when the timer runs out:

  const queryReturn = useQuery<UseCollectionData>(
    queryKey,
    async () => {
      // TODO: Can we type-check queries and variables in queryKeyGenerator and return type in prefetchQuery?

      const data = await queryClient.fetchQuery(
        queryKeyGenerator(EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug),
      );

      const marketplaceCollections = (data as any)?.marketplace?.collections || [];

      const collectionByPath = marketplaceCollections.find((e) => e.slug == auctionSlug);

      if (!collectionByPath) return null;

      const collectionItems = collectionByPath?.items?.map((item) => item.id);

      // TODO: This is bad and skips type checking:
      await Promise.all([
        queryClient.prefetchQuery(contentfulQueryKeyGenerator(EContentfulQueries.auctionsSlugList)),
        queryClient.prefetchQuery(
          contentfulQueryKeyGenerator(EContentfulQueries.auctionBySlug, { slug: auctionSlug }),
        ),
        queryClient.prefetchQuery(
          contentfulQueryKeyGenerator(EContentfulQueries.shortLots, { mojitoIds: collectionItems }),
        ),
      ]);

      return await queryClient.fetchQuery<IMojitoCollection>(queryKey);
    },
    props?.options,
  );

  return queryReturn;
}
