import { Variables } from 'graphql-request';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { contentfulQueryKeyGenerator } from '../../domain/utils/queryKeyGenerator.util';

export function useContentful<T = any, V = Variables>(
  query: EContentfulQueries,
  variables?: V,
  options?: UseQueryOptions<T>,
): UseQueryResult<T> {
  return useQuery<T>(contentfulQueryKeyGenerator(query, variables), options);
}
