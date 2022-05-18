export function useMojitoMutationFactory() {
  return true;
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
