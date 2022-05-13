import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';
import { QueryClient } from 'react-query';
import { config } from '../constants/general.constants';
import { isBrowser } from './isBrowser.util';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: typeof window === 'undefined' ? 0 : 180000, // 3min
      cacheTime: Infinity, // disable garbage collection
      // queryFn: gqlRequest,
    },
  },
});

export const mojitoGqlClient = new GraphQLClient(config.MOJITO_API_URL);

export const contentfulGqlClient = new GraphQLClient(config.CONTENTFUL_URL, {
  headers: {
    Authorization: `Bearer ${config.CONTENTFUL_AUTH_TOKEN}`,
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
      const status = e.response?.status;

      console.log(e);

      if (isBrowser && status >= 500 && window.location.pathname !== '/500') {
        window.location.href = '/500';
      } else {
        if (e.response?.error) {
          console.log(e.response.error);
        }

        // throw e.response.errors[0];

        throw e;
      }
    })
    .then((data) => normalizerFn?.(data, variables));
}
