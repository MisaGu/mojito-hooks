import { UseMutationResult, UseQueryResult } from 'react-query';
import { normalizeMutationResult, normalizeQueryResult } from '../gqlResult.utils';

describe('normalizeQueryResult()', () => {
  const mockedUseQueryResult: UseQueryResult<string> = {
    data: 'test-data',
    error: null,
    isError: false,
    isIdle: false,
    isLoading: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: 'success',
    dataUpdatedAt: 0,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    isFetched: true,
    isFetchedAfterMount: true,
    isFetching: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetching: false,
    isStale: false,
    refetch: () => Promise.resolve() as any,
    remove: () => {},
  };

  it('should be defined', () => {
    expect(normalizeQueryResult).toBeDefined();
  });

  it('returns the right result', () => {
    const result = normalizeQueryResult('test', mockedUseQueryResult);

    expect(result.error).toBe(mockedUseQueryResult.error);
    expect(result.isLoading).toBe(mockedUseQueryResult.isLoading);
    expect(result.refetch).toBe(mockedUseQueryResult.refetch);
    expect(result.test).toBe(mockedUseQueryResult.data);
    expect(Object.keys(result.queryResult).length).toBe(
      Object.keys(mockedUseQueryResult).length - 4,
    );
  });
});

describe('normalizeMutationResult()', () => {
  const mockedMutationResult: UseMutationResult<string> = {
    data: 'test-data',
    error: null,
    isError: false,
    isIdle: false,
    isLoading: false,
    isSuccess: true,
    status: 'success',
    failureCount: 0,
    context: null,
    isPaused: false,
    mutate: () => Promise.resolve() as any,
    mutateAsync: () => Promise.resolve('test-data') as any,
    reset: () => {},
    variables: null,
  };

  it('should be defined', () => {
    expect(normalizeMutationResult).toBeDefined();
  });

  it('returns the right result', () => {
    const result = normalizeMutationResult('test', mockedMutationResult);

    expect(result.error).toBe(mockedMutationResult.error);
    expect(result.isLoading).toBe(mockedMutationResult.isLoading);
    expect(result.mutate).toBe(mockedMutationResult.mutate);
    expect(result.mutateAsync).toBe(mockedMutationResult.mutateAsync);
    expect(result.test).toBe(mockedMutationResult.data);
    expect(Object.keys(result.mutationResult).length).toBe(
      Object.keys(mockedMutationResult).length - 5,
    );
  });
});
