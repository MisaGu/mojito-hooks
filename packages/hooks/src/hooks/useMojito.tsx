import { useAuth0 } from '@auth0/auth0-react';
import { useIsomorphicLayoutEffect, usePrevious } from 'ahooks';
import { GraphQLClient, Variables } from 'graphql-request';
import { useMutation, UseMutationResult, useQuery, UseQueryOptions } from 'react-query';
import {
  EMojitoMutations,
  EMojitoQueries,
  IUseQueryResult,
  mojitoMutations,
  mojitoQueries,
} from '../data';
import { config } from '../domain/general.constants';
import {
  IMojitoCollection,
  IMojitoCollectionItem,
  IMojitoCollectionItemCurrentBids,
  IMojitoCollectionItemDetailsBid,
} from '../domain/interfaces';
import { gqlRequest, mojitoNormalizer, queryClient } from '../utils';
import { useCollection } from '../v0.2/hooks/useCollection/useCollection';

/*

SOME HOOKS IN THIS FILE HAVE BEEN MOVED TO V2.

*/

export const mojitoGqlClient = new GraphQLClient(config.MOJITO_API_URL);

export interface IUseMojitoOptions<T = any, V = Variables> {
  query: EMojitoQueries;
  variables?: V;
  options?: UseQueryOptions<T>;
  force?: boolean;
  onlyAuthenticated?: boolean;
}

export function useMojito<T = any, V = Variables>({
  query,
  variables,
  options,
  force = false,
  onlyAuthenticated,
}: IUseMojitoOptions<T, V>): IUseQueryResult {
  const { getIdTokenClaims, isAuthenticated } = useAuth0();
  const notIsAuthenticated = usePrevious(isAuthenticated);
  const queryKey: any = [`Mojito ${EMojitoQueries[query]}`, variables];

  const result = useQuery<T>(
    queryKey,
    async () => {
      if (isAuthenticated) {
        const token = await getIdTokenClaims();
        if (token) {
          mojitoGqlClient.setHeader('authorization', `Bearer ${token.__raw}`);
        }
      } else if (onlyAuthenticated) {
        return null;
      }

      if (Object.values(variables ?? {}).some((e) => !e)) {
        console.error('some of vars is undefined', variables);
        return null;
      }
      return await gqlRequest<T>({
        query: mojitoQueries[query],
        variables,
        normalizerFn: mojitoNormalizer,
        gqlClient: mojitoGqlClient,
      });
    },
    {
      ...options,
      meta: { authorization: isAuthenticated },
      enabled: !onlyAuthenticated,
    },
  );

  useIsomorphicLayoutEffect(() => {
    if (force) {
      queryClient.removeQueries(queryKey);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isAuthenticated && !notIsAuthenticated) {
      if (onlyAuthenticated && queryClient.getQueryData(queryKey) == undefined) {
        result.refetch();
      }
    }
  }, [isAuthenticated]);

  if (result.isError) {
    console.log(result.error);
  }

  return {
    loading: result.isLoading,
    ...result,
  };
}

export function useLazyMojito<T = any, V = Variables>({
  query,
  variables,
  options,
  force = false,
  onlyAuthenticated,
}: IUseMojitoOptions<T, V>): [(options?: UseQueryOptions<T>) => void, IUseQueryResult] {
  options = {
    enabled: false,
    ...options,
  };
  const result = useMojito({
    query,
    variables,
    options,
    force,
    onlyAuthenticated,
  });

  return [
    result.refetch,
    {
      ...result,
    },
  ];
}

export function useMojitoMutation<T = any, V = Variables>(
  query: EMojitoMutations,
  onlyAuthenticated = false,
): [UseMutationResult<T, any, V, any>['mutateAsync'], UseMutationResult<T, any, V, any>] {
  const { getIdTokenClaims } = useAuth0();
  const res = useMutation<T, any, V, any>(async (variables: V) => {
    const token = await getIdTokenClaims();
    if (token) {
      mojitoGqlClient.setHeader('authorization', `Bearer ${token.__raw}`);
    } else if (onlyAuthenticated) {
      return null;
    }

    if (Object.values(variables ?? {}).some((e) => !e)) {
      console.error('some of vars is undefined', variables);
      return null;
    }
    return await gqlRequest<T>({
      query: mojitoMutations[query],
      variables,
      normalizerFn: mojitoNormalizer,
      gqlClient: mojitoGqlClient,
    });
  });
  return [res.mutateAsync, res];
}

// BELOW HERE HAS BEEN MOVED TO V2:

export function useCollectionLotsIdList(slug: string): {
  collectionLotsIdList: Pick<IMojitoCollectionItem<any>, 'id' | 'name'>[];
  collectionLoading: boolean;
  collectionError: IUseQueryResult['error'];
} {
  const { data, error, loading } = useMojito({
    query: EMojitoQueries.collectionLotsIdList,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
  });

  if (error) console.error(error);
  return {
    collectionLotsIdList: data?.items ?? [],
    collectionLoading: loading,
    collectionError: error,
  };
}

export function useMarketplaceCollectionsSlugWithItemsId(): {
  marketplaceCollectionsSlugWithItemsId: IMojitoCollection[];
  marketplaceCollectionsSlugWithItemsIdLoading: boolean;
  marketplaceCollectionsSlugWithItemsIdError: IUseQueryResult['error'];
} {
  const { data, error, loading } = useMojito({
    query: EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: { id: config.MARKETPLACE_ID },
  });

  if (error) console.error(error);

  return {
    marketplaceCollectionsSlugWithItemsId: data?.marketplace?.collections,
    marketplaceCollectionsSlugWithItemsIdLoading: loading,
    marketplaceCollectionsSlugWithItemsIdError: error,
  };
}

export function useCollectionItemCurrentBids(
  id?: string,
  _slug?: string,
): {
  allCurrentBids: IMojitoCollectionItemCurrentBids[];
  currentBids: IMojitoCollectionItemCurrentBids;
  currentBidsLoading: boolean;
  currentBidsError: IUseQueryResult['error'];
  currentBidsRefetch: () => void;
} {
  const { slug } = useCollection();
  const { data, error, loading, refetch } = useMojito({
    query: EMojitoQueries.collectionBySlugCurrentBids,
    variables: { slug: _slug ?? slug, marketplaceID: config.MARKETPLACE_ID },
  });

  if (error) console.error(error);

  return {
    allCurrentBids: data?.items,
    currentBids: id
      ? data?.items?.find((item: IMojitoCollectionItemCurrentBids) => item.id == id)
      : undefined,
    currentBidsLoading: loading,
    currentBidsError: error,
    currentBidsRefetch: refetch,
  };
}

export function useCollectionItemBidsList(
  id: string,
  _slug?: string,
): {
  bids: IMojitoCollectionItemDetailsBid[];
  bidsLoading: boolean;
  bidsError: IUseQueryResult['error'];
  bidsRefetch: () => void;
} {
  const { slug } = useCollection();
  const { data, error, loading, refetch } = useMojito({
    query: EMojitoQueries.collectionItemByIdBidsList,
    variables: { id, slug: _slug ?? slug },
  });

  if (error) console.error(error);

  return {
    bids: data?.details?.bids,
    bidsLoading: loading,
    bidsError: error,
    bidsRefetch: refetch,
  };
}

export function useCollectionItemRemainingCount(
  id: string,
  _slug?: string,
): {
  remainingCount: number;
  remainingCountLoading: boolean;
  remainingCountError: IUseQueryResult['error'];
  remainingCountRefetch: () => void;
} {
  const { slug } = useCollection();
  const { data, error, loading, refetch } = useMojito({
    query: EMojitoQueries.collectionItemByIdRemainingCount,
    variables: { id, slug: _slug ?? slug },
    onlyAuthenticated: true,
  });

  if (error) console.error(error);

  return {
    remainingCount: data?.details?.remainingCount,
    remainingCountLoading: loading,
    remainingCountError: error,
    remainingCountRefetch: refetch,
  };
}
