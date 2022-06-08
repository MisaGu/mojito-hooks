import { Variables } from 'graphql-request/dist/types';
import { useEffect, useRef, useState } from 'react';
import {
  QueryObserver,
  QueryObserverResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import { EMojitoKey, EOptionKey } from '../../domain/enums/state.enum';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { normalizeQueryResult } from '../../domain/utils/gqlResult.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import isEqual from 'lodash.isequal';

export interface MojitoFactoryOptions<
  TDataPropertyName extends string,
  TData = any,
  TSelectorResult = TData,
  TError = Error,
> {
  as: TDataPropertyName;
  query: EMojitoKey;
  variables?: Variables;
  options?: UseQueryOptions<TData, TError>;
  preloadFn?: () => Promise<TData | undefined | void>;
  selectorFn?: (data: TData) => TSelectorResult;
  force?: boolean;
  onlyAuthenticated?: boolean;
}

export function useMojitoFactory<
  TDataPropertyName extends string,
  TData = any,
  TSelectorResult = TData,
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
}: MojitoFactoryOptions<TDataPropertyName, TData, TSelectorResult, TError>) {
  const queryClient = useQueryClient();
  const isAuthenticated = queryClient.getQueryData<boolean>(
    QueryKey.get(EOptionKey.isAuthenticated),
  );
  const enabled = options?.enabled !== false && (!onlyAuthenticated || isAuthenticated);
  const queryKey = QueryKey.get(query, variables);
  const queryFn = async () => {
    if (preloadFn) await preloadFn();

    const configuredQueryFn =
      options?.queryFn || queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;

    return (await configuredQueryFn({ queryKey, meta: undefined })) as TData;
  };
  const observer = useRef(
    new QueryObserver<TData | undefined, TError>(queryClient, {
      ...options,
      queryKey,
      queryFn,
      meta: { ...options?.meta, authorization: isAuthenticated },
      enabled,
    }),
  );
  const _unsubscribe = useRef<() => void>();
  const _result = observer.current.getCurrentResult(); // QueryObserverResult<TData, TError>
  const [data, setData] = useState<TData | TSelectorResult | undefined>(
    selectorFn ? (_result.data ? selectorFn(_result.data) : _result.data) : _result.data,
  );

  useEffect(() => {
    if (force) {
      queryClient.removeQueries(queryKey);
    }

    _unsubscribe.current?.();
    observer.current = new QueryObserver<TData | undefined, TError>(queryClient, {
      queryKey,
      queryFn,
      ...options,
    });
  }, [queryKey]);

  useEffect(() => {
    _unsubscribe.current = observer.current.subscribe((result) => {
      if (selectorFn) {
        if (result.data) {
          const _selector = selectorFn(result.data as unknown as TData);
          if (!isEqual(_selector, data)) {
            setData(result.data);
          }
        }
      } else setData(result.data);
    });

    return () => _unsubscribe.current?.();
  }, [observer.current]);

  useEffect(() => {
    if (isAuthenticated && onlyAuthenticated && enabled) {
      _result.refetch();
    }
  }, [isAuthenticated]);

  return normalizeQueryResult(as, _result);
}
