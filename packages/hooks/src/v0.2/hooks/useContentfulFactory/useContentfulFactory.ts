import { Variables } from 'graphql-request';
import { useQuery, UseQueryOptions } from 'react-query';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { normalizeQueryResult } from '../../domain/utils/gql.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

export interface IUseContentfulOptions<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
> {
  as: TDataPropertyName;
  query: EContentfulQueries;
  variables?: Variables;
  options?: UseQueryOptions<TData, TError>;
  transformFn?: (data: TData | undefined) => TReturn | undefined;
}

export function useContentfulFactory<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
>({
  as,
  query,
  variables,
  options,
  transformFn,
}: IUseContentfulOptions<TDataPropertyName, TData, TReturn, TError>) {
  const result = useQuery<TData | undefined>(QueryKey.get(query, variables), options);

  return normalizeQueryResult(as, result, transformFn);
}

// legacy function

/*
export function useContentful<T = any, V = Variables>(
  query: EContentfulQueries,
  variables?: V,
  options?: UseQueryOptions<T>
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
    options
  );
  return {
    loading: result.isLoading,
    ...result,
  };
}
*/
