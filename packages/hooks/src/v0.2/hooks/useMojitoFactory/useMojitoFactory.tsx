import { Variables } from 'graphql-request/dist/types';
import { useEffect } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoQueries } from '../../domain/gql/queries';
import { normalizeQueryResult } from '../../domain/utils/gqlResult.utils';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

export interface MojitoFactoryOptions<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
> {
  as: TDataPropertyName;
  query: EMojitoQueries;
  variables?: Variables;
  options?: UseQueryOptions<TReturn, TError>;
  preloadFn?: () => Promise<TReturn | undefined | void>;
  transformFn?: (data: TData | undefined) => TReturn | undefined;
  force?: boolean;
  onlyAuthenticated?: boolean;
}

export function useMojitoFactory<
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
  force = false,
  onlyAuthenticated,
}: MojitoFactoryOptions<TDataPropertyName, TData, TReturn, TError>) {
  const { isAuthenticated } = useAuthContext();
  const queryClient = useQueryClient();
  const queryKey = QueryKey.get(query, variables);
  const enabled = options?.enabled !== false && (!onlyAuthenticated || isAuthenticated);

  const queryFn =
    preloadFn || transformFn
      ? async () => {
          if (preloadFn) await preloadFn();

          const configuredQueryFn =
            options?.queryFn || queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;

          const result = (await configuredQueryFn({ queryKey, meta: undefined })) as TData;

          return transformFn ? transformFn(result) : (result as unknown as TReturn);
        }
      : options?.queryFn;

  const mojitoFactoryUseQueryOptions = {
    ...options,
    queryFn,
    meta: { ...options?.meta, authorization: isAuthenticated },
    enabled,
  };

  if (!queryFn) delete mojitoFactoryUseQueryOptions.queryFn;

  const result = useQuery<TReturn | undefined, TError>(queryKey, mojitoFactoryUseQueryOptions);

  useEffect(() => {
    if (force) {
      queryClient.removeQueries(queryKey);
    }
  }, [queryKey]);

  useEffect(() => {
    if (
      isAuthenticated &&
      onlyAuthenticated &&
      enabled &&
      queryClient.getQueryData(queryKey) === undefined
    ) {
      result.refetch();
    }
  }, [isAuthenticated]);

  return normalizeQueryResult(as, result);
}
