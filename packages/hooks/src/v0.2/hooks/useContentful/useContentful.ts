import { Variables } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { normalizeQueryResult } from '../../domain/utils/gql.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

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
  const result = useQuery<TData | undefined>(QueryKey.get(query, variables), options);

  return normalizeQueryResult(as, result);
}
