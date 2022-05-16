import { UseQueryResult } from 'react-query';

export type QueryResult<TDataPropertyName extends string, TData = any, TError = Error> = {
  isLoading: boolean;
  error: TError | null;
  refetch: UseQueryResult<TData, TError>['refetch'];
  queryResult: Omit<UseQueryResult<TData, TError>, 'data' | 'isLoading' | 'error' | 'refetch'>;
} & { [P in TDataPropertyName]: TData | undefined };

export function getQueryReturn<TDataPropertyName extends string, TData = any, TError = Error>(
  key: TDataPropertyName,
  result: UseQueryResult<TData>,
) {
  const { data, isLoading, error, refetch, ...queryResult } = result as UseQueryResult<
    TData,
    TError
  >;

  return {
    [key]: data,
    isLoading,
    error,
    refetch,
    queryResult,
  } as QueryResult<TDataPropertyName, TData, TError>;
}
