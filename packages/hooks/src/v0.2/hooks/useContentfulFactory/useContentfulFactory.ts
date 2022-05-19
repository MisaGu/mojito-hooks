import { Variables } from 'graphql-request';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { normalizeQueryResult } from '../../domain/utils/gql.utils';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
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
  options?: UseQueryOptions<TReturn, TError>;
  preloadFn?: () => Promise<TReturn | void>;
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
  preloadFn,
  transformFn,
}: IUseContentfulOptions<TDataPropertyName, TData, TReturn, TError>) {
  const queryClient = useQueryClient();
  const queryKey = QueryKey.get(query, variables);

  const queryFn =
    preloadFn || transformFn
      ? async () => {
          if (preloadFn) {
            const preloadResult = await preloadFn();

            if (preloadResult !== undefined) return preloadResult;
          }

          const configuredQueryFn =
            options?.queryFn || queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;

          const result = (await configuredQueryFn({ queryKey, meta: undefined })) as TData;

          return transformFn ? transformFn(result) : (result as unknown as TReturn);
        }
      : options?.queryFn;

  const result = useQuery<TReturn | undefined, TError>(
    queryKey,
    queryFn ? { ...options, queryFn } : options,
  );

  return normalizeQueryResult(as, result);
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
