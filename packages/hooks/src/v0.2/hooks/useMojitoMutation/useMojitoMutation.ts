import { Variables } from 'graphql-request';
import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { normalizeMutationResult } from '../../domain/utils/gqlResult.utils';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

export interface IUseMojitoFactoryOptions<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
  TVariables = Variables,
  TContext = unknown,
> {
  as: TDataPropertyName;
  query: EMojitoKey;
  variables: TVariables;
  options?: UseMutationOptions<TReturn, TError, TVariables, TContext>;
  selectorFn?: (data: TData | undefined) => TReturn;
  onlyAuthenticated?: boolean;
  auto?: boolean;
}

export function useMojitoMutation<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
  TVariables = Variables,
  TContext = unknown,
>({
  as,
  query,
  variables,
  options,
  selectorFn,
  onlyAuthenticated,
  auto = true,
}: IUseMojitoFactoryOptions<TDataPropertyName, TData, TReturn, TError, TVariables, TContext>) {
  const { isAuthenticated } = useAuthContext();
  const queryClient = useQueryClient();
  const mutationKey = QueryKey.get(query, variables);

  const mutationFn = selectorFn
    ? async () => {
        const configuredQueryFn =
          (options as any)?.queryFn ||
          queryClient.getDefaultOptions().queries?.queryFn ||
          defaultQueryFn;

        // TODO: Is this code ok? Should it be like this? In any case, mutations.mutationFn type seem wrong,
        // as they only take variables, nothing else.
        // options?.mutationFn || queryClient.getDefaultOptions().mutations?.mutationFn || defaultQueryFn;

        const result = (await configuredQueryFn({
          queryKey: mutationKey,
          meta: undefined,
        })) as TData;

        return selectorFn ? selectorFn(result) : (result as unknown as TReturn);
      }
    : (options as any)?.queryFn;

  const mojitoFactoryUseMutationOptions = {
    ...options,
    mutationFn,
    meta: { ...options?.meta, authorization: isAuthenticated },
  };

  if (!mutationFn) delete mojitoFactoryUseMutationOptions.mutationFn;

  const result = useMutation<TReturn, TError, TVariables, TContext>(
    mutationKey,
    mojitoFactoryUseMutationOptions,
  );

  useEffect(() => {
    if (!auto || (onlyAuthenticated && !isAuthenticated)) return;

    result.mutate(variables);
  }, [isAuthenticated, variables]);

  const normalizedResult = normalizeMutationResult(as, result);

  const mutate = useCallback(
    (variablesProp: TVariables, context: TContext) => {
      if (onlyAuthenticated && !isAuthenticated) Promise.resolve();

      return result.mutate(variablesProp || variables, context);
    },
    [isAuthenticated, result.mutate, variables],
  );

  const mutateAsync = useCallback(
    (variablesProp: TVariables, context: TContext) => {
      if (onlyAuthenticated && !isAuthenticated) Promise.resolve();

      return result.mutateAsync(variablesProp || variables, context);
    },
    [isAuthenticated, result.mutateAsync, variables],
  );

  return {
    ...normalizedResult,
    mutate,
    mutateAsync,
  };
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
