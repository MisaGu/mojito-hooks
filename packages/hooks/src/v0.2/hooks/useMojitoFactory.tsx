import { Variables } from 'graphql-request/dist/types';
import { useEffect, useRef, useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query/types/react';
import { mojitoGqlClient } from '../../hooks';
import { gqlRequest, mojitoNormalizer, queryClient } from '../../utils';
import { useAuthContext } from '../domain/context/auth.context';
import { EMojitoQueries, IUseQueryResult, mojitoQueries } from '../domain/gql/queries';

interface IUseMojitoOptions<T = any, V = Variables> {
  query: EMojitoQueries;
  variables?: V;
  options?: UseQueryOptions<T>;
  force?: boolean;
  onlyAuthenticated?: boolean;
}

function useMojitoFactory<T = any, V = Variables>({
  query,
  variables,
  options,
  force = false,
  onlyAuthenticated,
}: IUseMojitoOptions<T, V>): IUseQueryResult {
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
      if (isAuthenticated) {
        mojitoGqlClient.setHeader('authorization', `Bearer ${token}`);
      } else if (onlyAuthenticated) {
        return null;
      }

      if (Object.values(variables ?? {}).some((e) => !e)) {
        console.error('Some of vars is undefined', variables);
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

export default useMojitoFactory;
