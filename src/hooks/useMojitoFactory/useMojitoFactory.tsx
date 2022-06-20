import { Variables } from 'graphql-request/dist/types';
import isEqual from 'lodash.isequal';
import { useEffect, useRef, useState } from 'react';
import { QueryObserver, useQueryClient, UseQueryOptions } from 'react-query';
import { EMojitoKey, EOptionKey } from '../../domain/enums/state.enum';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { normalizeQueryResult } from '../../domain/utils/gqlResult.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';

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
  const _unsubscribe = useRef<() => void>();
  const _authUnsubscribe = useRef<() => void>();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const queryKey = QueryKey.get(query, variables);
  const queryOptions = {
    ...options,
    queryKey,
    queryFn: async () => {
      if (preloadFn) await preloadFn();

      const configuredQueryFn =
        options?.queryFn || queryClient.getDefaultOptions().queries?.queryFn || defaultQueryFn;

      return (await configuredQueryFn({ queryKey, meta: undefined })) as TResponse;
    },
    meta: { ...options?.meta, authorization: isAuthorized },
    enabled: options?.enabled !== false && (!onlyAuthenticated || isAuthorized),
  };

  const observer = useRef(new QueryObserver<TResponse, TError>(queryClient, queryOptions));
  const authObserver = useRef(
    new QueryObserver<TResponse, TError>(queryClient, {
      queryKey: QueryKey.get(EOptionKey.isAuthorized),
    }),
  );
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
    if (force) {
      queryClient.removeQueries(queryKey);
    }

    _unsubscribe.current?.();
    observer.current = new QueryObserver<TResponse, TError>(queryClient, queryOptions);

    return () => observer.current?.destroy();
  }, [JSON.stringify(queryKey), isAuthorized, force]);

  useEffect(() => {
    _unsubscribe.current = observer.current.subscribe((result) => {
      if (selectorFn) {
        if (result.data) {
          const _selectorResult = selectorFn(result.data);
          if (!isEqual(_selectorResult, data)) {
            setData(_selectorResult);
          }
        }
      } else {
        setData(result.data as any);
      }
    });

    return () => _unsubscribe.current?.();
  }, [observer.current]);

  useEffect(() => {
    _authUnsubscribe.current = authObserver.current.subscribe((result) => {
      setIsAuthorized(!!result.data);
    });

    return () => {
      _authUnsubscribe.current?.();
      authObserver.current?.destroy();
    };
  }, [authObserver.current]);

  //@ts-ignore
  _result.data = data;
  // _result.refetch = () => {
  //   const _result = queryOptions.queryFn
  // }

  return normalizeQueryResult(as, _result);
}
