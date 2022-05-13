import { Variables } from 'graphql-request/dist/types';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { mojitoGqlClient } from '../../../hooks';
import { gqlRequest, mojitoNormalizer, queryClient } from '../../../utils';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoQueries, IUseQueryResult, mojitoQueries } from '../../domain/gql/queries';

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
  const {
    state: { token, isAuthenticated },
  } = useAuthContext();
  const [prevIsAuthenticated, setPrevIsAuthenticated] = useState(isAuthenticated);
  const queryKey = [`Mojito ${EMojitoQueries[query]}`, variables];

  if (!Object.is(prevIsAuthenticated, isAuthenticated)) {
    setPrevIsAuthenticated(isAuthenticated);
  }

  const result = useQuery<T>(
    queryKey,
    async () => {
      if (Object.values(variables ?? {}).some((e) => !e)) {
        console.error('Some of vars is undefined', variables);
        return null;
      }

      if (isAuthenticated) {
        mojitoGqlClient.setHeader('authorization', `Bearer ${token}`);
      } else if (onlyAuthenticated) {
        return null;
      }

      return await gqlRequest<T>({
        query: mojitoQueries[query],
        variables,
        normalizerFn: mojitoNormalizer,
        gqlClient: mojitoGqlClient,
      });
    },
    {
      ...options,
      meta: { authorization: isAuthenticated },
      enabled: !onlyAuthenticated,
    },
  );

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
