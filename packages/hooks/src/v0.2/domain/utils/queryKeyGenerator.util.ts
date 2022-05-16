import { Variables } from 'graphql-request/dist/types';
import { EContentfulQueries } from '../gql/contentful';
import { EMojitoQueries } from '../gql/queries';

export type QueryKey = string | [string, Variables];

const QUERY_KEY_PREFIX = 'MOJITO-HOOKS::';
const QUERY_KEY_INFIX_MOJITO = `${QUERY_KEY_PREFIX}API::`;
const QUERY_KEY_INFIX_CONTENTFUL = `${QUERY_KEY_PREFIX}CONTENTFUL::`;

export function queryKeyGenerator(
  query: EMojitoQueries | EContentfulQueries,
  variables: Variables = {},
): QueryKey {
  let prefix = '';

  if (EMojitoQueries[query]) prefix = QUERY_KEY_INFIX_MOJITO;
  else if (EContentfulQueries[query]) prefix = QUERY_KEY_INFIX_CONTENTFUL;

  const queryKey = `${prefix}${query}`;

  return variables ? [queryKey, variables] : queryKey;
}

function removeQueryKeyPrefix<T>(queryKey: string) {
  return queryKey.replace(/^MOJITO-HOOKS::(API|CONTENTFUL)::/, '') as unknown as T;
}

export function getMojitoQueryKey(queryKey: string) {
  return removeQueryKeyPrefix<EMojitoQueries>(queryKey);
}

export function getContentfulQueryKey(queryKey: string) {
  return removeQueryKeyPrefix<EContentfulQueries>(queryKey);
}

export function isContentfulQueryKey(queryKey: string) {
  return queryKey.startsWith(QUERY_KEY_INFIX_CONTENTFUL);
}

/*

export function queryKeyGenerator(
  query: EMojitoQueries | EContentfulQueries,
  variables: Variables = {},
): QueryKey {
  return [`Mojito ${EMojitoQueries[query]}`, variables];
}

export function contentfulQueryKeyGenerator(
  query: EContentfulQueries,
  variables: Variables = {},
): QueryKey {
  return [`Contentful ${EContentfulQueries[query]}`, variables];
}
*/
