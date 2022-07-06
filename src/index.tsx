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
  config: {
    CONTENTFUL_URL: string;
    CONTENTFUL_AUTH_TOKEN: string;
    MOJITO_API_URL: string;
    INVOICE_URL: string;
    MARKETPLACE_ID: string;
    ORGANIZATION_ID: string;
    AUTH_TOKEN: string;
    AUTH_HEADER?: Record<string, string>;
  };
  children: React.ReactElement | null;
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
    if (props.config.AUTH_TOKEN || props.config.AUTH_HEADER) {
      let _authorization;

      if (props.config.AUTH_TOKEN) {
        _authorization = ['authorization', `Bearer ${props.config.AUTH_TOKEN}`];
      }

      if (props.config.AUTH_HEADER) {
        const _k = Object.keys(props.config.AUTH_HEADER);

        if (_k.length === 1) {
          _authorization = [_k[0], props.config.AUTH_HEADER[_k[0]]];
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
  }, [props.config.AUTH_TOKEN, props.config.AUTH_HEADER]);

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
        config={props.config}
        children={props.children}
        urlPatterns={props.urlPatterns}
        onError={props.onError}
      />
    </QueryClientProvider>
  );
};

export * from './hooks';
