import { Variables } from 'graphql-request/dist/types';
import { useEffect } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoKey, EOptionKey } from '../../domain/enums/state.enum';
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
  query: EMojitoKey;
  variables?: Variables;
  options?: UseQueryOptions<TReturn, TError>;
  preloadFn?: () => Promise<TReturn | undefined | void>;
  selectFn?: (data: TData | undefined) => TReturn | undefined;
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
  selectFn,
  force = false,
  onlyAuthenticated,
}: MojitoFactoryOptions<TDataPropertyName, TData, TReturn, TError>) {
  const queryClient = useQueryClient();
  const isAuthenticated = queryClient.getQueryData<boolean>(
    QueryKey.get(EOptionKey.isAuthenticated),
  );
  const enabled = options?.enabled !== false && (!onlyAuthenticated || isAuthenticated);
  const queryKey = QueryKey.get(query, variables);

  const queryFn =
    preloadFn || selectFn
      ? async () => {
          if (preloadFn) await preloadFn();

          const configuredQueryFn =
            options?.queryFn || queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;

          const result = (await configuredQueryFn({ queryKey, meta: undefined })) as TData;

          return selectFn ? selectFn(result) : (result as unknown as TReturn);
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
