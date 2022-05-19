import { UseQueryResult } from 'react-query';

export type QueryResult<TDataPropertyName extends string, TData = any, TError = Error> = {
  isLoading: boolean;
  error: TError | null;
  refetch: UseQueryResult<TData, TError>['refetch'];
  queryResult: Omit<UseQueryResult<TData, TError>, 'data' | 'isLoading' | 'error' | 'refetch'>;
} & { [P in TDataPropertyName]: TData | undefined };

export function normalizeQueryResult<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
>(
  key: TDataPropertyName,
  result: UseQueryResult<TData>,
  transformFn?: (data: TData | undefined) => TReturn | undefined,
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
    [key]: transformFn ? transformFn(data) : data,
  } as QueryResult<TDataPropertyName, TReturn, TError>;
}
