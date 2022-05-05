import { Variables } from 'graphql-request';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { contentfulQueries, EContentfulQueries } from '../../data';
import { contentfulGqlClient } from '../../hooks';
import { contentfulNormalizer, gqlRequest } from '../../utils';

export function useContentfulFactory<T = any, V = Variables>(
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
