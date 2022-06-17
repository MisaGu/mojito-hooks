import { Variables } from 'graphql-request/dist/types';
import { QueryKey as ReactQueryQueryKey } from 'react-query';
import { EContentfulKey, EMojitoKey, EOptionKey } from '../enums/state.enum';
import { contentfulQueries } from '../gql/contentful';
import { mojitoQueries } from '../gql/queries';

export type IQueryKey = [string] | [string, Variables];

const QUERY_KEY_PREFIX = 'MOJITO-HOOKS::';
const QUERY_KEY_INFIX_OPTION = `${QUERY_KEY_PREFIX}OPTION::`;
const QUERY_KEY_INFIX_MOJITO = `${QUERY_KEY_PREFIX}API::`;
const QUERY_KEY_INFIX_CONTENTFUL = `${QUERY_KEY_PREFIX}CONTENTFUL::`;

export class QueryKey {
  private static _removeQueryKeyPrefix<T>(queryKey: string) {
    return queryKey.replace(/^MOJITO-HOOKS::(API|CONTENTFUL|OPTIONS)::/, '') as unknown as T;
  }

  static get = (
    query: EMojitoKey | EContentfulKey | EOptionKey,
    variables?: Variables,
  ): IQueryKey => {
    let prefix = '';

    if (EMojitoKey[query]) prefix = QUERY_KEY_INFIX_MOJITO;
    else if (EContentfulKey[query]) prefix = QUERY_KEY_INFIX_CONTENTFUL;
    else if (EOptionKey[query]) prefix = QUERY_KEY_INFIX_OPTION;

    const queryKey = `${prefix}${query}`;

    return variables ? [queryKey, variables] : [queryKey];
  };

  static getMojitoQuery = (queryKey: string) => {
    const mojitoQueryKey = QueryKey._removeQueryKeyPrefix<EMojitoKey>(queryKey);
    return mojitoQueries[mojitoQueryKey];
  };

  static getContentfulQuery = (queryKey: string) => {
    const contentfulQueryKey = QueryKey._removeQueryKeyPrefix<EContentfulKey>(queryKey);
    return contentfulQueries[contentfulQueryKey];
  };

  static isOptions = (queryKey: string) => {
    return queryKey.startsWith(QUERY_KEY_INFIX_OPTION);
  };

  static isMojito = (queryKey: string) => {
    return queryKey.startsWith(QUERY_KEY_INFIX_MOJITO);
  };

  static isContentful = (queryKey: string) => {
    return queryKey.startsWith(QUERY_KEY_INFIX_CONTENTFUL);
  };

  static isMojitoHooksKey(queryKey: ReactQueryQueryKey): queryKey is IQueryKey {
    return Array.isArray(queryKey) && queryKey[0]?.includes(QUERY_KEY_PREFIX) === true;
  }
}
