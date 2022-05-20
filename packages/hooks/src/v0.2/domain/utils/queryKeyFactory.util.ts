import { Variables } from 'graphql-request/dist/types';
import { contentfulQueries, EContentfulQueries } from '../gql/contentful';
import { EMojitoQueries, EMojitoVariables, mojitoQueries } from '../gql/queries';
import { QueryKey as ReactQueryQueryKey } from 'react-query';

export type IQueryKey = [string] | [string, Variables];

const QUERY_KEY_PREFIX = 'MOJITO-HOOKS::';
const QUERY_KEY_INFIX_MOJITO = `${QUERY_KEY_PREFIX}API::`;
const QUERY_KEY_INFIX_CONTENTFUL = `${QUERY_KEY_PREFIX}CONTENTFUL::`;

export class QueryKey {
  private static _removeQueryKeyPrefix<T>(queryKey: string) {
    return queryKey.replace(/^MOJITO-HOOKS::(API|CONTENTFUL)::/, '') as unknown as T;
  }

  static get<TQuery extends keyof EMojitoVariables>(
    query: TQuery,
    variables: EMojitoVariables[TQuery],
  ): IQueryKey {
    let prefix = '';

    if (EMojitoQueries[query]) prefix = QUERY_KEY_INFIX_MOJITO;
    else if (EContentfulQueries[query]) prefix = QUERY_KEY_INFIX_CONTENTFUL;

    const queryKey = `${prefix}${query}`;

    return variables ? [queryKey, variables] : [queryKey];
  }

  static getMojitoQuery = (queryKey: string) => {
    const mojitoQueryKey = QueryKey._removeQueryKeyPrefix<EMojitoQueries>(queryKey);
    return mojitoQueries[mojitoQueryKey];
  };

  static getContentfulQuery = (queryKey: string) => {
    const contentfulQueryKey = QueryKey._removeQueryKeyPrefix<EContentfulQueries>(queryKey);
    return contentfulQueries[contentfulQueryKey];
  };

  static isMojito = (queryKey: string) => {
    return queryKey.startsWith(QUERY_KEY_INFIX_MOJITO);
  };

  static isContentful = (queryKey: string) => {
    return queryKey.startsWith(QUERY_KEY_INFIX_CONTENTFUL);
  };

  static isMojitoHooksKey(queryKey: ReactQueryQueryKey): queryKey is IQueryKey {
    return Array.isArray(queryKey) && queryKey[0].includes(QUERY_KEY_PREFIX);
  }
}

QueryKey.get(EMojitoQueries.userActiveBids, { organizationID: '234' });
