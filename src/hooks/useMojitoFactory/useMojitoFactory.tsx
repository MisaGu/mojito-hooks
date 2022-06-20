import { Variables } from 'graphql-request/dist/types';
import isEqual from 'lodash.isequal';
import { useEffect, useRef, useState } from 'react';
import { QueryObserver, useQueryClient, UseQueryOptions } from 'react-query';
import { EMojitoKey, EOptionKey } from '../../domain/enums/state.enum';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { normalizeQueryResult } from '../../domain/utils/gqlResult.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { useCallback } from 'react';

export interface MojitoFactoryOptions<
  TDataPropertyName extends string,
  TSelectorData = any,
  TResponse = TSelectorData,
  TError = Error,
> {
  as: TDataPropertyName;
  query: EMojitoKey;
  variables?: Variables;
  options?: UseQueryOptions<TResponse, TError>;
  preloadFn?: () => Promise<void>;
  selectorFn?: (response: TResponse) => TSelectorData;
  force?: boolean;
  onlyAuthenticated?: boolean;
}

export function useMojitoFactory<
  TDataPropertyName extends string,
  TSelectorData = any,
  TResponse = TSelectorData,
  TError = Error,
>({
  as,
  query,
  variables,
  options,
  preloadFn,
  selectorFn,
  force = false,
  onlyAuthenticated,
}: MojitoFactoryOptions<TDataPropertyName, TSelectorData, TResponse, TError>) {
  const queryClient = useQueryClient();

  const queryKey = QueryKey.get(query, variables);
  const authQueryKey = QueryKey.get(EOptionKey.isAuthorized);

  const observer = useRef(new QueryObserver<TResponse, TError>(queryClient, getQueryOptions()));
  const _unsubscribe = useRef<() => void>();

  const authObserver = useRef<QueryObserver>();
  const _authUnsubscribe = useRef<() => void>();

  const _query = observer.current.getCurrentQuery();
  const _result = observer.current.getCurrentResult();

  const [data, setData] = useState(
    (selectorFn
      ? _query.state.data
        ? selectorFn(_query.state.data)
        : _query.state.data
      : _query.state.data) as TSelectorData,
  );

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

  useEffect(() => {
    if (force) _query.destroy();

    // @ts-ignore
    if (_query.queryKey.asString !== queryKey.asString) {
      generateObserver();
    }
  }, [queryKey.asString, force]);

  function getQueryOptions() {
    const _isAuthorized = !!queryClient.getQueryData<boolean>(authQueryKey);

    return {
      ...options,
      queryKey,
      queryFn: async () => {
        if (preloadFn) await preloadFn();

        const configuredQueryFn =
          options?.queryFn || queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;

        return (await configuredQueryFn({ queryKey, meta: undefined })) as TResponse;
      },
      meta: { ...options?.meta, authorization: queryClient.getQueryData(authQueryKey) },
      enabled: options?.enabled !== false && (!onlyAuthenticated || _isAuthorized),
    };
  }

  function generateObserver() {
    observer.current = new QueryObserver<TResponse, TError>(queryClient, getQueryOptions());

    _unsubscribe.current?.();
    _unsubscribe.current = observer.current.subscribe((result) => {
      if (selectorFn) {
        if (result.data) {
          const _selectorResult = selectorFn(result.data);
          if (!isEqual(_selectorResult, data)) {
            console.log(1);
            setData(_selectorResult);
          }
        }
      } else {
        console.log(2);
        setData(result.data as any);
      }
    });

    return;
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

  //@ts-ignore
  _result.data = data;

  return normalizeQueryResult(as, _result);
}
