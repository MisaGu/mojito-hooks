import isEqual from 'lodash.isequal';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QueryObserver, QueryObserverOptions, useQueryClient, UseQueryOptions } from 'react-query';
import { EOptionKey } from '../../domain/enums/state.enum';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { normalizeQueryResult } from '../../domain/utils/gqlResult.utils';
import { IQueryKey, QueryKey } from '../../domain/utils/queryKeyFactory.util';

export interface MojitoFactoryOptions<
  TDataPropertyName extends string,
  TSelectorData = any,
  TResponse = any,
  TError = Error,
> {
  as: TDataPropertyName;
  queryKey: IQueryKey;
  options?: UseQueryOptions<TResponse, TError>;
  onQueryStart?: () => Promise<void>;
  onQueryEnd?: (response?: TResponse) => Promise<void>;
  selectorFn?: (response: TSelectorData) => TResponse;
  force?: boolean;
  onlyAuthenticated?: boolean;
}

export function useMojitoFactory<
  TDataPropertyName extends string,
  TResponse = any,
  TSelectorData = any,
  TError = Error,
>(
  {
    as,
    queryKey,
    options,
    onQueryStart,
    onQueryEnd,
    selectorFn,
    onlyAuthenticated,
    force = false,
  }: MojitoFactoryOptions<TDataPropertyName, TSelectorData, TResponse, TError>,
  deps: ReadonlyArray<unknown> = [],
) {
  const queryClient = useQueryClient();
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const authQueryKey = QueryKey.get(EOptionKey.isAuthorized);

  const observer = useRef(new QueryObserver<TResponse, TError>(queryClient, getQueryOptions()));
  const _unsubscribe = useRef<() => void>();

  const authObserver = useRef<QueryObserver>();
  const _authUnsubscribe = useRef<() => void>();

  const _query = observer.current.getCurrentQuery();
  const _result = observer.current.getCurrentResult();

  let data = useMemo(() => {
    return selectorFn
      ? _query.state.data
        ? selectorFn(_query.state.data as unknown as TSelectorData)
        : _query.state.data
      : _query.state.data;
  }, [deps, _query.state.dataUpdatedAt]);

  function getQueryOptions(): QueryObserverOptions<TResponse, TError> {
    const _isAuthorized = !!queryClient.getQueryData<boolean>(authQueryKey);
    const variables = queryKey[1];

    return {
      ...options,
      queryKey,
      queryFn: async () => {
        if (onQueryStart) await onQueryStart();

        const configuredQueryFn =
          options?.queryFn || queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;

        return (await configuredQueryFn({ queryKey, meta: undefined })) as TResponse;
      },
      meta: { ...options?.meta, authorization: queryClient.getQueryData(authQueryKey) },
      enabled: options?.enabled !== false && (!onlyAuthenticated || _isAuthorized),
      keepPreviousData: options?.keepPreviousData ?? variables?.page !== undefined,
    };
  }

  function generateObserver() {
    observer.current = new QueryObserver<TResponse, TError>(queryClient, getQueryOptions());

    _unsubscribe.current?.();
    _unsubscribe.current = observer.current.subscribe(async (result) => {
      if (selectorFn) {
        if (result.data) {
          const _selectorResult = selectorFn(result.data as unknown as TSelectorData);

          if (!isEqual(_selectorResult, data)) {
            data = _selectorResult;

            forceUpdate();
          }
        }
      } else {
        data = result.data as any;
        forceUpdate();
      }

      if (onQueryEnd) await onQueryEnd(data);
    });
  }

  function generateAuthObserver() {
    const _isAuthorized = !!_query?.meta?.authorization;

    authObserver.current = new QueryObserver<TResponse, TError>(queryClient, {
      queryKey: authQueryKey,
    });

    _authUnsubscribe.current?.();

    _authUnsubscribe.current = authObserver.current.subscribe((result) => {
      if (onlyAuthenticated && _isAuthorized != !!result.data) {
        generateObserver();
      }
    });
  }

  useEffect(() => {
    if (onlyAuthenticated) {
      generateAuthObserver();
    } else {
      generateObserver();
    }

    return () => {
      _unsubscribe.current?.();
      observer.current?.destroy();

      _authUnsubscribe.current?.();
      authObserver.current?.destroy();
    };
  }, []);

  //@ts-ignore
  _result.data = data;

  //@ts-ignore
  _result.refetch = () => {
    _query.reset();
    data = undefined;
    generateObserver();
  };

  useEffect(() => {
    // TODO: Probably no need for `force`, only deps.length:
    if (force) _result.refetch();
  }, deps);

  /*
  useEffect(() => {
    _result.refetch();
  }, queryKey);
  */

  return normalizeQueryResult(as, _result);
}
