import { GraphQLClient } from 'graphql-request';
import { QueryClient, QueryFunction } from 'react-query';
import { config } from '../constants/general.constants';
import { isBrowser } from './isBrowser.util';
import { contentfulNormalizer, mojitoNormalizer } from './gqlDataNormalizer.util';
import { EMojitoQueries, mojitoQueries } from '../gql/queries';
import { contentfulQueries, EContentfulQueries } from '../gql/contentful';
import { QueryKey, IQueryKey, QUERY_KEY_PREFIX } from './queryKeyFactory.util';

export type MojitoHookQueryError = Error & {
  response?: Response & { error?: any; errors?: any[] };
};

export type MojitoHookQueryErrorFn = (e: MojitoHookQueryError) => void;

// TODO: Provide an example on how to use this to connect Sentry.

let onErrorCallback: MojitoHookQueryErrorFn = (e) => {
  console.log(e);
};

export function setOnErrorCallback(customOnErrorCallback: MojitoHookQueryErrorFn) {
  onErrorCallback = customOnErrorCallback;
}

function handleQueryError(e: MojitoHookQueryError) {
  const status = e.response?.status || 0;

  onErrorCallback(e);

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

export const mojitoGqlClient = new GraphQLClient(config.MOJITO_API_URL);

export const contentfulGqlClient = new GraphQLClient(config.CONTENTFUL_URL, {
  headers: {
    Authorization: `Bearer ${config.CONTENTFUL_AUTH_TOKEN}`,
  },
});

export const mojitoQueryFn: QueryFunction<unknown, IQueryKey> = async ({ queryKey }) => {
  const [query, variables] = queryKey;
  const mojitoQuery = QueryKey.getMojitoQuery(query);

  console.log(`${mojitoQuery ? '🔃' : '❌'} MOJITO QUERY = ${query} => ${mojitoQuery}...`);

  // TODO: Add token with requestHeaders from request-client / mojitoGqlClient.setHeader("", token)

  return await mojitoGqlClient
    .request(mojitoQuery, variables)
    .catch(handleQueryError)
    .then((data) => mojitoNormalizer(data, variables));
};

export const contentfulQueryFn: QueryFunction<unknown, IQueryKey> = async ({ queryKey }) => {
  const [query, variables] = queryKey;
  const contentfulQuery = QueryKey.getContentfulQuery(query);

  console.log(
    `${contentfulQuery ? '🔃' : '❌'} CONTENTFUL QUERY = ${query} => ${contentfulQuery}...`,
  );

  return await contentfulGqlClient
    .request(contentfulQuery, variables)
    .catch(handleQueryError)
    .then((data) => contentfulNormalizer(data, variables));
};

export const defaultQueryFn: QueryFunction<unknown, IQueryKey> = async (context) => {
  if (Array.isArray(context.queryKey) && context.queryKey[0].includes(QUERY_KEY_PREFIX)) {
    const [query, variables] = context.queryKey;

    const undefinedVars = Object.entries(variables ?? {}).filter((pair) => pair[1] === undefined);

    if (undefinedVars.length > 0) {
      console.error(
        "Variables can't be undefined:",
        undefinedVars.map((pair) => pair[0]),
      );

      return null;
    }

    return QueryKey.isContentful(query) ? contentfulQueryFn(context) : mojitoQueryFn(context);
  }
  // TODO: user custom default query functions
  return () => {};
};

export const QUERY_CLIENT_STALE_TIME = 180000; // 3 MIN

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: isBrowser ? QUERY_CLIENT_STALE_TIME : 0,
      cacheTime: Infinity, // disable garbage collection
      queryFn: defaultQueryFn,
    },
  },
});
