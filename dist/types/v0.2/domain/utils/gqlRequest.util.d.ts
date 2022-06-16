import { GraphQLClient } from 'graphql-request';
import { QueryClient, QueryFunctionContext } from 'react-query';
import { IQueryKey } from './queryKeyFactory.util';
export declare type MojitoHookQueryError = Error & {
  response?: Response & {
    error?: any;
    errors?: any[];
  };
};
export declare type MojitoHookQueryErrorFn = (e: MojitoHookQueryError) => void;
export declare function setOnErrorCallback(customOnErrorCallback: MojitoHookQueryErrorFn): void;
export declare const mojitoGqlClient: GraphQLClient;
export declare const contentfulGqlClient: GraphQLClient;
export declare type QueryFn<T = unknown> = (
  context: QueryFunctionContext<IQueryKey>,
) => T | Promise<T>;
export declare const mojitoQueryFn: <T = unknown>({
  queryKey,
}: QueryFunctionContext<IQueryKey>) => Promise<T>;
export declare const contentfulQueryFn: <T = unknown>({
  queryKey,
}: QueryFunctionContext<IQueryKey>) => Promise<T>;
export declare const defaultQueryFn: <T = unknown>(
  context: QueryFunctionContext<IQueryKey>,
) => T | Promise<T> | null;
export declare const QUERY_CLIENT_STALE_TIME = 180000;
export declare const queryClient: QueryClient;
