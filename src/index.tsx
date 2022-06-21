import React, { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { EMojitoKey, EOptionKey } from './domain/enums/state.enum';
import { mojitoGqlClient, MojitoHookQueryError, queryClient } from './domain/utils/gqlRequest.util';
import { QueryKey } from './domain/utils/queryKeyFactory.util';
import { ReactQueryDevtools } from 'react-query/devtools';
import UrlPattern from 'url-pattern';

export enum UrlParams {
  collectionSlug,
  collectionItemSlug,
}

/**
 * authorization - request authentication header;
 * if record
 * ```typescript
 * hedaer: {
 *   'YOUR_AUTH_KEY': YOUR_AUTH_TOKEN);
 * }
 * ```
 * if string the default header authentication key will be used.
 * ```typescript
 * hedaer: {
 *   'Authorization': YOUR_AUTH_TOKEN);
 * }
 * ```
 *
 * urlPatters - the url patterns that match your app routes to collection page and collection item page
 * EVERY url pattern must contain `:collectionSlug` OR `:collectionItemSlug` named segment
 */
export interface MojitoHooksProviderProps {
  children: React.ReactElement | null;
  authorization?: string | Record<string, string>;
  urlPatterns?: string[];
  onError?: (e: MojitoHookQueryError) => void;
  //   onRouterChange?: () => void;
}
//asd

const HooksOptions: React.FC<MojitoHooksProviderProps> = (props) => {
  queryClient.prefetchQuery(QueryKey.get(EMojitoKey.serverTime));

  useEffect(() => {
    if (props.onError)
      queryClient.setQueryData(QueryKey.get(EOptionKey.onErrorCallback), () => props.onError);
  }, [props.onError]);

  useEffect(() => {
    if (props.authorization) {
      let _authorization;
      if (typeof props.authorization === 'string') {
        _authorization = ['Authorization', props.authorization];
      } else {
        const _k = Object.keys(props.authorization);

        if (_k.length === 1) {
          _authorization = [_k[0], props.authorization[_k[0]]];
        }
      }

      queryClient.setQueryData(QueryKey.get(EOptionKey.authorization), _authorization);
      // TEMPORARY - TODO FIX ME
      mojitoGqlClient.setHeader(_authorization[0], _authorization[1]);
      queryClient
        .fetchQuery(QueryKey.get(EMojitoKey.checkAuthentication), { retry: false })
        .then(() => queryClient.setQueryData(QueryKey.get(EOptionKey.isAuthorized), true))
        .catch(() => {
          queryClient.setQueryData(QueryKey.get(EOptionKey.isAuthorized), false);
          throw new Error(
            `MojitoHooksProvider::authorization: the provided Authorization value doest work`,
          );
        });
    } else {
      console.log('No authorization value provided');
    }
  }, [props.authorization]);

  useEffect(() => {
    if (props.urlPatterns) {
      if (
        props.urlPatterns?.every(
          (pattern) => pattern.search(/[:collectionSlug|:collectionItemSlug]/) != -1,
        )
      ) {
        queryClient.setQueryData(
          QueryKey.get(EOptionKey.urlPatterns),
          props.urlPatterns.map((i) => new UrlPattern(i)),
        );
      } else {
        throw new Error(
          `MojitoHooksProvider::urlPatterns: must contain collectionSlug OR collectionItemSlug in EVERY url pattern in the array`,
        );
      }
    } else {
      queryClient.setQueryData(
        QueryKey.get(EOptionKey.urlPatterns),
        ['/:collectionSlug', '/hooks/*', '/hooks/:collectionItemSlug'].map(
          (i) => new UrlPattern(i),
        ),
      );
    }
  }, [props.urlPatterns]);

  return props.children;
};

export const MojitoHooksProvider: React.FC<MojitoHooksProviderProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HooksOptions
        children={props.children}
        authorization={props.authorization}
        urlPatterns={props.urlPatterns}
        onError={props.onError}
      />
    </QueryClientProvider>
  );
};

export * from './hooks';
