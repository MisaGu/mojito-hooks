import { Variables } from 'graphql-request';
import { useEffect } from 'react';
import { useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoQueries } from '../../domain/gql/queries';
import { normalizeMutationResult } from '../../domain/utils/gql.utils';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

export interface IUseMojitoFactoryOptions<
  TDataPropertyName extends string,
  TData = any,
  TError = Error,
  TVariables = Variables,
> {
  as: TDataPropertyName;
  query: EMojitoQueries;
  variables: TVariables;
  options?: UseMutationOptions<TData, TError, TVariables>;
  transformFn?: (data: TData | undefined) => TData;
  onlyAuthenticated?: boolean;
  auto?: boolean;
}

export function useMojitoMutation<
  TDataPropertyName extends string,
  TData = any,
  TError = Error,
  TVariables = Variables,
>({
  as,
  query,
  variables,
  options,
  transformFn,
  onlyAuthenticated,
  auto = true,
}: IUseMojitoFactoryOptions<TDataPropertyName, TData, TError, TVariables>) {
  const queryClient = useQueryClient();
  const queryFn = queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;
  const mutationKey = QueryKey.get(query, variables);
  const { isAuthenticated } = useAuthContext();

  const result = useMutation<TData, TError, TVariables>(
    async () => {
      const _query = (await queryFn({ queryKey: mutationKey, meta: undefined })) as TData;

      return transformFn ? transformFn(_query) : _query;
    },
    {
      ...options,
      mutationKey,
      meta: { ...options?.meta, authorization: isAuthenticated },
    },
  );

  if (result.isError) {
    console.log(result.error);
  }

  useEffect(() => {
    if (!auto) return;

    if (onlyAuthenticated) {
      if (isAuthenticated) result.mutate(variables);
    } else {
      result.mutate(variables);
    }
  }, [isAuthenticated, variables]);

  // TODO: We should return a wrap around `mutate` that takes into account authentication...

  return normalizeMutationResult(as, result, variables);
}

// legacy function
/*

export function useMojitoMutation<T = any, V = Variables>(
  query: EMojitoMutations,
  onlyAuthenticated = false,
): [UseMutationResult<T, any, V, any>['mutateAsync'], UseMutationResult<T, any, V, any>] {
  const { getIdTokenClaims } = useAuth0();
  const res = useMutation<T, any, V, any>(async (variables: V) => {
    const token = await getIdTokenClaims();
    if (token) {
      mojitoGqlClient.setHeader('authorization', `Bearer ${token.__raw}`);
    } else if (onlyAuthenticated) {
      return null;
    }

    if (Object.values(variables ?? {}).some((e) => !e)) {
      console.error('some of vars is undefined', variables);
      return null;
    }
    return await gqlRequest<T>({
      query: mojitoMutations[query],
      variables,
      normalizerFn: mojitoNormalizer,
      gqlClient: mojitoGqlClient,
    });
  });
  return [res.mutateAsync, res];
}


*/
