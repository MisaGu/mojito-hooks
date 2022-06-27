import { Variables } from 'graphql-request';
import { UseMutationResult, UseQueryResult } from 'react-query';

export type QueryResult<TDataPropertyName extends string, TData = any, TError = Error> = {
  isLoading: boolean;
  error: TError | null;
  refetch: UseQueryResult<TData, TError>['refetch'];
  queryResult: Omit<UseQueryResult<TData, TError>, 'data' | 'isLoading' | 'error' | 'refetch'>;
} & { [P in TDataPropertyName]: TData | undefined };

export function normalizeQueryResult<TDataPropertyName extends string, TData = any, TError = Error>(
  key: TDataPropertyName,
  result: UseQueryResult<TData>,
) {
  const { data, isLoading, error, refetch, ...queryResult } = result as UseQueryResult<
    TData,
    TError
  >;
  return {
    isLoading,
    error,
    refetch,
    queryResult,
    [key]: data,
  } as QueryResult<TDataPropertyName, TData, TError>;
}

export type MutationResult<TDataPropertyName extends string, TData = any, TError = Error> = {
  isLoading: boolean;
  error: TError | null;
  mutate: UseMutationResult<TData, TError>['mutate'];
  mutateAsync: UseMutationResult<TData, TError>['mutateAsync'];
  mutationResult: Omit<
    UseMutationResult<TData, TError>,
    'data' | 'isLoading' | 'error' | 'mutate' | 'mutateAsync'
  >;
} & { [P in TDataPropertyName]: TData | undefined };

export function normalizeMutationResult<
  TDataPropertyName extends string,
  TData = any,
  TVariables = Variables,
  TError = Error,
>(key: TDataPropertyName, result: UseMutationResult<TData, TError, TVariables>) {
  const { mutate, mutateAsync, data, isLoading, error, ...mutationResult } =
    result as UseMutationResult<TData, TError>;

  return {
    isLoading,
    error,
    mutate,
    mutateAsync,
    mutationResult,
    [key]: data,
  } as MutationResult<TDataPropertyName, TData, TError>;
}
