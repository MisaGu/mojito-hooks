import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';
import { QueryClient } from 'react-query';
import isBrowser from './isBrowser';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: typeof window === 'undefined' ? 0 : 180000, // 3min
      cacheTime: Infinity, // disable garbage collection
    },
  },
});

interface IGqlRequestParams {
  query: RequestDocument;
  variables?: Variables;
  normalizerFn?: (data: any, variables?: Variables) => any;
  gqlClient: GraphQLClient;
}

export async function gqlRequest<T>({
  query,
  variables,
  normalizerFn,
  gqlClient,
}: IGqlRequestParams): Promise<any> {
  return await gqlClient
    .request<T>(query, variables)
    .catch((e) => {
      if (isBrowser && e.response.status >= 500 && location.pathname != '/500') {
        document.location.href = '/500';
        console.error(e);
      } else {
        throw e.response.errors[0];
      }
    })
    .then((data) => normalizerFn?.(data, variables));
}
