import { Variables } from 'graphql-request/dist/types';
import { useEffect } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoQueries } from '../../domain/gql/queries';
import { normalizeQueryResult } from '../../domain/utils/gql.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

interface IUseMojitoOptions<TDataPropertyName extends string, TData = any, TError = Error> {
  as: TDataPropertyName;
  query: EMojitoQueries;
  variables?: Variables;
  options?: UseQueryOptions<TData, TError>;
  force?: boolean;
  onlyAuthenticated?: boolean;
}

export function useMojitoFactory<TDataPropertyName extends string, TData = any, TError = Error>({
  as,
  query,
  variables,
  options,
  force = false,
  onlyAuthenticated,
}: IUseMojitoOptions<TDataPropertyName, TData, TError>) {
  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuthContext();
  const queryKey = QueryKey.get(query, variables);

  const result = useQuery<TData | undefined>(queryKey, {
    ...options,
    meta: { authorization: isAuthenticated },
    enabled: !onlyAuthenticated,
  });

  useEffect(() => {
    if (force) {
      queryClient.removeQueries(queryKey);
    }
  }, [queryKey]);

  useEffect(() => {
    if (isAuthenticated && onlyAuthenticated && queryClient.getQueryData(queryKey) === undefined) {
      console.log('🔄 useMojitoFactory refetch...');

      result.refetch();
    }
  }, [isAuthenticated]);

  if (result.isError) {
    console.log(result.error);
  }

  return normalizeQueryResult(as, result);
}
