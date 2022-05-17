import { Variables } from 'graphql-request/dist/types';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoQueries, IUseQueryResult } from '../../domain/gql/queries';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

interface IUseMojitoOptions<T = any> {
  query: EMojitoQueries;
  variables?: Variables;
  options?: UseQueryOptions<T>;
  force?: boolean;
  onlyAuthenticated?: boolean;
}

export function useMojitoFactory<T = any>({
  query,
  variables,
  options,
  force = false,
  onlyAuthenticated,
}: IUseMojitoOptions<T>): IUseQueryResult {
  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuthContext();
  const [prevIsAuthenticated, setPrevIsAuthenticated] = useState(isAuthenticated);
  const queryKey = QueryKey.get(query, variables);

  if (!Object.is(prevIsAuthenticated, isAuthenticated)) {
    setPrevIsAuthenticated(isAuthenticated);
  }

  const result = useQuery<T | null>(queryKey, {
    ...options,
    meta: { authorization: isAuthenticated },
    enabled: !onlyAuthenticated,
  });

  useEffect(() => {
    if (force) {
      queryClient.removeQueries(queryKey);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !prevIsAuthenticated) {
      if (onlyAuthenticated && queryClient.getQueryData(queryKey) == undefined) {
        result.refetch();
      }
    }
  }, [isAuthenticated]);

  if (result.isError) {
    console.log(result.error);
  }

  return {
    loading: result.isLoading,
    ...result,
  };
}
