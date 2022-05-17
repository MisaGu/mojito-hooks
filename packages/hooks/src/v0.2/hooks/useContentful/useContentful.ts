import { Variables } from 'graphql-request';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { normalizeQueryResult } from '../../domain/utils/gql.utils';
import { queryKeyGenerator } from '../../domain/utils/queryKeyGenerator.util';

interface IUseContentfulOptions<TDataPropertyName extends string, TData = any, TError = Error> {
  as: TDataPropertyName;
  query: EContentfulQueries;
  variables?: Variables;
  options?: UseQueryOptions<TData, TError>;
}

export function useContentful<TDataPropertyName extends string, TData = any, TError = Error>({
  as,
  query,
  variables,
  options,
}: IUseContentfulOptions<TDataPropertyName, TData, TError>) {
  const result = useQuery<TData | undefined>(queryKeyGenerator(query, variables), options);

  return normalizeQueryResult(as, result);
}
