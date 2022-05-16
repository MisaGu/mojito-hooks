import { GraphQLClient, RequestDocument } from 'graphql-request';
import { QueryClient, QueryFunction } from 'react-query';
import { config } from '../constants/general.constants';
import { isBrowser } from './isBrowser.util';
import { Variables } from 'graphql-request/dist/types';
import { contentfulNormalizer, mojitoNormalizer } from './gqlDataNormalizer.util';

function handleQueryError(e: Error & { response?: Response & { error?: any; errors?: any[] } }) {
  const status = e.response?.status || 0;

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
}

export type QueryKey = [string, Variables];

export const mojitoGqlClient = new GraphQLClient(config.MOJITO_API_URL);

export const contentfulGqlClient = new GraphQLClient(config.CONTENTFUL_URL, {
  headers: {
    Authorization: `Bearer ${config.CONTENTFUL_AUTH_TOKEN}`,
  },
});

export const mojitoQueryFn: QueryFunction<unknown, QueryKey> = async ({ queryKey }) => {
  const [query, variables] = queryKey;

  return await mojitoGqlClient
    .request(query, variables)
    .catch(handleQueryError)
    .then((data) => mojitoNormalizer(data, variables));
};

export const contentfulQueryFn: QueryFunction<unknown, QueryKey> = async ({ queryKey }) => {
  const [query, variables] = queryKey;

  return await contentfulGqlClient
    .request(query, variables)
    .catch(handleQueryError)
    .then((data) => contentfulNormalizer(data, variables));
};

export const defaultQueryFn: QueryFunction<unknown, QueryKey> = async (context) => {
  return context.queryKey[0].startsWith('Contentful')
    ? contentfulQueryFn(context)
    : mojitoQueryFn(context);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: typeof window === 'undefined' ? 0 : 180000, // 3min
      cacheTime: Infinity, // disable garbage collection
      queryFn: defaultQueryFn,
    },
  },
});

// queryClient uses gqlRequest with gqlClient: contentfulGqlClient

/*
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
*/
