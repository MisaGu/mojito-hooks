import { Variables } from 'graphql-request/dist/types';
import isEqual from 'lodash.isequal';
import { useEffect, useRef, useState } from 'react';
import { QueryObserver, useQueryClient, UseQueryOptions } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { normalizeQueryResult } from '../../domain/utils/gqlResult.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

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
  selectorFn?: (response: TSelectorResult) => TData;
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
  const { isAuthenticated } = useAuthContext(); // REPLACE ME
  const _unsubscribe = useRef<() => void>();

  const queryKey = QueryKey.get(query, variables);
  const queryOptions = {
    ...options,
    queryKey,
    queryFn: async () => {
      if (preloadFn) await preloadFn();

      const configuredQueryFn =
        options?.queryFn || queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;

      return (await configuredQueryFn({ queryKey, meta: undefined })) as TSelectorResult;
    },
    meta: { ...options?.meta, authorization: isAuthenticated },
    enabled: options?.enabled !== false && (!onlyAuthenticated || isAuthenticated),
  };

  const observer = useRef(
    new QueryObserver<TData | TSelectorResult | undefined, TError>(queryClient, queryOptions),
  );
  const _result = observer.current.getCurrentResult();
  const [data, setData] = useState(
    selectorFn ? (_result.data ? selectorFn(_result.data as any) : _result.data) : _result.data,
  );

  useEffect(() => {
    if (force) {
      queryClient.removeQueries(queryKey);
    }

    _unsubscribe.current?.();
    observer.current = new QueryObserver<TData | TSelectorResult | undefined, TError>(
      queryClient,
      queryOptions,
    );

    return () => observer.current?.destroy();
  }, [JSON.stringify(queryKey), isAuthenticated, force]);

  useEffect(() => {
    _unsubscribe.current = observer.current.subscribe((result) => {
      if (selectorFn) {
        console.log(result);
        if (result.data) {
          const _selectorResult = selectorFn(result.data as any);
          if (!isEqual(_selectorResult, data)) {
            setData(_selectorResult);
          }
        }
      } else {
        setData(result.data);
      }
    });

    return () => _unsubscribe.current?.();
  }, [observer.current]);

  _result.data = data;

  return normalizeQueryResult(as, _result);
}
