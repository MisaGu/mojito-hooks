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
  data: TData;
  error: TError | null;
  isLoading: boolean;
} & { [P in TDataPropertyName]: () => void };

export function normalizeMutationResult<
  TDataPropertyName extends string,
  TData = any,
  TError = Error,
  TVariables = Variables,
>(
  key: TDataPropertyName,
  result: UseMutationResult<TData, TError, TVariables>,
  variables: TVariables,
) {
  const { mutate, data, isLoading, error, ...mutationResult } = result as UseMutationResult<
    TData,
    TError
  >;

  return {
    data,
    isLoading,
    error,
    mutationResult,
    [key]: () => mutate(variables),
  } as MutationResult<TDataPropertyName, TData, TError>;
}
