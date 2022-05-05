import { GraphQLClient, Variables } from 'graphql-request';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { contentfulQueries, EContentfulQueries, IUseQueryResult } from '../data';
import { config } from '../domain/general.constants';
import {
  IContentfulAuction,
  IContentfulAuthor,
  IContentfulAuthorsQuery,
  IContentfulCollector,
  IContentfulCollectorsQuery,
  IContentfulLotData,
} from '../domain/interfaces';
import { contentfulNormalizer, gqlRequest } from '../utils';

export const contentfulGqlClient = new GraphQLClient(config.CONTENTFUL_URL, {
  headers: {
    Authorization: `Bearer ${config.CONTENTFUL_AUTH_TOKEN}`,
  },
});

export function useContentful<T = any, V = Variables>(
  query: EContentfulQueries,
  variables?: V,
  options?: UseQueryOptions<T>,
): UseQueryResult<T> & { loading: boolean } {
  const queryKey: any[] = [`Contentful ${EContentfulQueries[query]}`];
  if (variables) queryKey.push(variables);
  const result = useQuery<T>(
    queryKey,
    async () =>
      await gqlRequest<T>({
        query: contentfulQueries[query],
        variables,
        normalizerFn: contentfulNormalizer,
        gqlClient: contentfulGqlClient,
      }),
    options,
  );
  return {
    loading: result.isLoading,
    ...result,
  };
}

export function useContentfulShortLots(mojitoID: string | string[]): {
  lots: IContentfulLotData[];
  lotError: any;
  lotLoading: boolean;
} {
  const { data, error, loading } = useContentful<any>(EContentfulQueries.shortLots, {
    mojitoIds: Array.isArray(mojitoID) ? mojitoID : [mojitoID],
  });
  if (error) console.error(error);
  return {
    lots: data ?? [],
    lotError: error,
    lotLoading: loading,
  };
}

export function useContentfulFullLot(mojitoID: string): {
  lot: IContentfulLotData | null;
  lotError: any;
  lotLoading: boolean;
} {
  const { data, error, loading } = useContentful<any>(EContentfulQueries.fullLot, {
    mojitoId: mojitoID,
  });
  if (error) console.error(error);
  return {
    lot: data ? (Object.values(data)[0] as IContentfulLotData) : null,
    lotError: error,
    lotLoading: loading,
  };
}

export function useContentfulAuthors(): {
  authors: IContentfulAuthor[];
  authorsError: any;
  authorsLoading: boolean;
} {
  const { data, error, loading } = useContentful<IContentfulAuthorsQuery>(
    EContentfulQueries.authors,
  );
  if (error) console.error(error);

  return {
    authors: data?.authorCollection?.items ?? [],
    authorsError: error,
    authorsLoading: loading,
  };
}

export function useContentfulCollectors(): {
  collectors: IContentfulCollector[];
  collectorsError: any;
  collectorsLoading: boolean;
} {
  const { data, error, loading } = useContentful<IContentfulCollectorsQuery>(
    EContentfulQueries.collectors,
  );
  if (error) console.error(error);

  return {
    collectors: data?.collectorCollection?.items ?? [],
    collectorsError: error,
    collectorsLoading: loading,
  };
}

export function useContentfulLots(mojitoIds?: string[]): {
  lots: { [k: string]: IContentfulLotData };
  lotsError: any;
  lotsLoading: boolean;
} {
  const { data, error, loading } = useContentful(EContentfulQueries.shortLots, mojitoIds);
  if (error) console.error(error);

  return {
    lots: data ?? {},
    lotsError: error,
    lotsLoading: loading,
  };
}

export function useContentfulAuctionsSlugList(): {
  auctionsSlugList: string[];
  auctionsSlugListLoading: boolean;
  auctionsSlugListError: IUseQueryResult['error'];
} {
  const { data, error, loading } = useContentful(EContentfulQueries.auctionsSlugList);
  if (error) console.error(error);

  return {
    auctionsSlugList:
      data?.auctionCollection?.items?.map((collection: IContentfulAuction) => collection.slug) ??
      [],
    auctionsSlugListLoading: loading,
    auctionsSlugListError: error,
  };
}
