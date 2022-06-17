import { GraphQLClient } from 'graphql-request';
import { QueryClient, QueryFunctionContext } from 'react-query';
import { config } from '../constants/general.constants';
import { isBrowser } from './isBrowser.util';
import { contentfulNormalizer, mojitoNormalizer } from './gqlDataNormalizer.util';
import { QueryKey, IQueryKey } from './queryKeyFactory.util';
import { EOptionKey } from '../enums/state.enum';

export type MojitoHookQueryError = Error & {
  queryKey: string | string[];
  response?: Response & { error?: any; errors?: any[] };
};

export type MojitoHookQueryErrorFn = (e: MojitoHookQueryError) => void;

function handleQueryError(e: MojitoHookQueryError) {
  const _onErrorCallback = queryClient.getQueryData<(e: MojitoHookQueryError) => void>(
    QueryKey.get(EOptionKey.onErrorCallback),
  );
  if (_onErrorCallback) _onErrorCallback(e);

  const status = e.response?.status || 0;
  if (isBrowser && status >= 500 && window.location.pathname !== '/500') {
    window.location.href = '/500';
  } else {
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
  const isAuthorized = queryClient.getQueryData<boolean>(QueryKey.get(EOptionKey.isAuthorized));
  const authorization = queryClient.getQueryData<string[]>(QueryKey.get(EOptionKey.authorization));

  // console.log(`${mojitoQuery ? '🍸' : '❌'} MOJITO QUERY = ${query} => ${mojitoQuery}...`);

  return (await mojitoGqlClient
    .request(
      mojitoQuery,
      variables,
      isAuthorized && authorization
        ? {
            [authorization[0]]: authorization[1],
          }
        : {},
    )
    .catch((e) => handleQueryError(Object.assign(e, { queryKey })))
    .then((data) => mojitoNormalizer(data, variables))) as T;
};

export const contentfulQueryFn = async <T = unknown>({
  queryKey,
}: QueryFunctionContext<IQueryKey>): Promise<T> => {
  const [query, variables] = queryKey;
  const contentfulQuery = QueryKey.getContentfulQuery(query);

  // console.log(
  //   `${contentfulQuery ? '💾' : '❌'} CONTENTFUL QUERY = ${query} => ${contentfulQuery}...`,
  // );

  return (await contentfulGqlClient
    .request(contentfulQuery, variables)
    .catch((e) => handleQueryError(Object.assign(e, { queryKey })))
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

    return QueryKey.isContentful(query)
      ? contentfulQueryFn<T>(context)
      : QueryKey.isMojito(query)
      ? mojitoQueryFn<T>(context)
      : null;
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
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1500 * 2 ** attemptIndex, 30000),
    },
  },
});
