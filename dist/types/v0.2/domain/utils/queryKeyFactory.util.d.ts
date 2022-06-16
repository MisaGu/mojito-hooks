import { Variables } from 'graphql-request/dist/types';
import { QueryKey as ReactQueryQueryKey } from 'react-query';
import { EContentfulKey, EMojitoKey, EOptionKey } from '../enums/state.enum';
export declare type IQueryKey = [string] | [string, Variables];
export declare class QueryKey {
  private static _removeQueryKeyPrefix;
  static get: (query: EMojitoKey | EContentfulKey | EOptionKey, variables?: Variables) => IQueryKey;
  static getMojitoQuery: (queryKey: string) => string;
  static getContentfulQuery: (queryKey: string) => string;
  static isOpt: (queryKey: string) => boolean;
  static isMojito: (queryKey: string) => boolean;
  static isContentful: (queryKey: string) => boolean;
  static isMojitoHooksKey(queryKey: ReactQueryQueryKey): queryKey is IQueryKey;
}
