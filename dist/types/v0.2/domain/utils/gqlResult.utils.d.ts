import { Variables } from 'graphql-request';
import { UseMutationResult, UseQueryResult } from 'react-query';
export declare type QueryResult<TDataPropertyName extends string, TData = any, TError = Error> = {
  isLoading: boolean;
  error: TError | null;
  refetch: UseQueryResult<TData, TError>['refetch'];
  queryResult: Omit<UseQueryResult<TData, TError>, 'data' | 'isLoading' | 'error' | 'refetch'>;
} & {
  [P in TDataPropertyName]: TData | undefined;
};
export declare function normalizeQueryResult<
  TDataPropertyName extends string,
  TData = any,
  TError = Error,
>(
  key: TDataPropertyName,
  result: UseQueryResult<TData>,
): QueryResult<TDataPropertyName, TData, TError>;
export declare type MutationResult<
  TDataPropertyName extends string,
  TData = any,
  TError = Error,
> = {
  isLoading: boolean;
  error: TError | null;
  mutate: UseMutationResult<TData, TError>['mutate'];
  mutateAsync: UseMutationResult<TData, TError>['mutateAsync'];
  mutationResult: Omit<
    UseMutationResult<TData, TError>,
    'data' | 'isLoading' | 'error' | 'mutate' | 'mutateAsync'
  >;
} & {
  [P in TDataPropertyName]: TData | undefined;
};
export declare function normalizeMutationResult<
  TDataPropertyName extends string,
  TData = any,
  TVariables = Variables,
  TError = Error,
>(
  key: TDataPropertyName,
  result: UseMutationResult<TData, TError, TVariables>,
): MutationResult<TDataPropertyName, TData, TError>;
