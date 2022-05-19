import { Variables } from 'graphql-request/dist/types';
import { useEffect } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoQueries } from '../../domain/gql/queries';
import { normalizeQueryResult } from '../../domain/utils/gql.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

export interface IUseMojitoFactoryOptions<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
> {
  as: TDataPropertyName;
  query: EMojitoQueries;
  variables?: Variables;
  options?: UseQueryOptions<TData, TError>;
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
  transformFn,
  force = false,
  onlyAuthenticated,
}: IUseMojitoFactoryOptions<TDataPropertyName, TData, TReturn, TError>) {
  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuthContext();
  const queryKey = QueryKey.get(query, variables);
  const enabled = options?.enabled !== false && (!onlyAuthenticated || isAuthenticated);

  const result = useQuery<TData | undefined>(queryKey, {
    ...options,
    meta: { ...options?.meta, authorization: isAuthenticated },
    enabled,
  });

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
      console.log('🔄 useMojitoFactory refetch...');

      result.refetch();
    }
  }, [isAuthenticated]);

  if (result.isError) {
    console.log(result.error);
  }

  return normalizeQueryResult(as, result, transformFn);
}
