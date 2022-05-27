import { GraphQLClient } from 'graphql-request';
import { QueryClient, QueryFunctionContext } from 'react-query';
import { config } from '../constants/general.constants';
import { isBrowser } from './isBrowser.util';
import { contentfulNormalizer, mojitoNormalizer } from './gqlDataNormalizer.util';
import { QueryKey, IQueryKey } from './queryKeyFactory.util';
import { log } from './log.utils';

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

export type QueryFn<T = unknown> = (context: QueryFunctionContext<IQueryKey>) => T | Promise<T>;

export const mojitoQueryFn = async <T = unknown>({
  queryKey,
}: QueryFunctionContext<IQueryKey>): Promise<T> => {
  const [query, variables] = queryKey;
  const mojitoQuery = QueryKey.getMojitoQuery(query);

  log(`${mojitoQuery ? '🍸' : '❌'} MOJITO QUERY = ${query} => ${mojitoQuery}...`);

  // TODO: Add token with requestHeaders from request-client / mojitoGqlClient.setHeader("", token)

  return (await mojitoGqlClient
    .request(mojitoQuery, variables)
    .catch(handleQueryError)
    .then((data) => mojitoNormalizer(data, variables))) as T;
};

export const contentfulQueryFn = async <T = unknown>({
  queryKey,
}: QueryFunctionContext<IQueryKey>): Promise<T> => {
  const [query, variables] = queryKey;
  const contentfulQuery = QueryKey.getContentfulQuery(query);

  log(`${contentfulQuery ? '💾' : '❌'} CONTENTFUL QUERY = ${query} => ${contentfulQuery}...`);

  return (await contentfulGqlClient
    .request(contentfulQuery, variables)
    .catch(handleQueryError)
    .then((data) => contentfulNormalizer(data, variables))) as T;
};

export const defaultQueryFn = <T = unknown>(
  context: QueryFunctionContext<IQueryKey>,
): null | T | Promise<T> => {
  const { queryKey } = context;

  if (QueryKey.isMojitoHooksKey(queryKey)) {
    const [query, variables] = queryKey;

    const undefinedVars = Object.entries(variables ?? {}).filter((pair) => pair[1] === undefined);

    if (undefinedVars.length > 0) {
      console.error(
        "Variables can't be undefined:",
        undefinedVars.map((pair) => pair[0]),
      );

      return null;
    }

    return QueryKey.isContentful(query) ? contentfulQueryFn<T>(context) : mojitoQueryFn<T>(context);
  }

  // TODO: Add a fallback query function:
  return null;
};

// TODO: Make this configurable by users:
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
