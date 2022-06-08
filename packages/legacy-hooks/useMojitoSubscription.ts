import { useAuth0 } from '@auth0/auth0-react';
import { SubscriptionClient } from 'graphql-subscriptions-client';
import { useEffect, useRef } from 'react';
import { EMojitoSubscriptions, mojitoSubscriptions } from '../data';
import { config } from '../domain/general.constants';
import {
  IMojitoCollection,
  IMojitoCollectionItemDetailsBid,
  IUseMojitoCollectionSubscription,
  IUseMojitoOneLotSubscription,
} from '../domain/interfaces';
import { mojitoNormalizer, queryClient } from '../utils';
import isBrowser from '../utils/isBrowser';

let client: SubscriptionClient | null = null;

function getGqlSubscriptionClient(token?: string): SubscriptionClient | null {
  if (!client)
    client = isBrowser
      ? new SubscriptionClient(config.MOJITO_API_URL.replace('https', 'wss'), {
          reconnect: true,
          lazy: true,
          connectionCallback: (error: any) => {
            error && console.error(error);
          },
          ...(token
            ? {
                connectionParams: {
                  authorization: `Bearer ${token}`,
                },
              }
            : {}),
        })
      : null;

  return client;
}

function useSubscription(
  cb: (token?: string) => void,
  subscriptionRef: { unsubscribe: () => void } | undefined,
): void {
  const { isAuthenticated, getIdTokenClaims, isLoading } = useAuth0();

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        const token = isAuthenticated ? await getIdTokenClaims() : null;
        subscriptionRef?.unsubscribe?.();
        cb(token?.__raw);
      }
    })();
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    return () => {
      subscriptionRef?.unsubscribe?.();
    };
  }, []);
}

export function useMojitoOneLotSubscription(lotId: string, collectionSlug: string): void {
  const subscription = useRef<{ unsubscribe: () => void }>();
  useSubscription(subscribe, subscription.current);

  function subscribe(token?: string) {
    subscription.current = getGqlSubscriptionClient(token)
      ?.request({
        query: mojitoSubscriptions[EMojitoSubscriptions.getMarketplaceAuctionLot],
        variables: { marketplaceAuctionLotId: lotId },
      })
      .subscribe(
        {
          next({
            data: { getMarketplaceAuctionLot: newLotDetails },
          }: IUseMojitoOneLotSubscription) {
            if (newLotDetails) {
              queryClient.setQueryData<IMojitoCollection>(
                [
                  `Mojito ${EMojitoKey[EMojitoKey.collectionBySlugCurrentBids]}`,
                  {
                    marketplaceID: config.MARKETPLACE_ID,
                    slug: collectionSlug,
                  },
                ],
                (data) => {
                  if (!data) return {} as IMojitoCollection;
                  Object.assign(
                    data?.items?.find((e) => e.details.id === newLotDetails.id)?.details,
                    newLotDetails,
                  );
                  return mojitoNormalizer({ collectionBySlug: data }, { slug: collectionSlug });
                },
              );
            }
          },
        },
        (e: any) => console.error(e),
      );
  }
}

export function useCollectionItemBidsSubscription(
  itemId: string,
  lotId: string,
  collectionSlug: string,
): any {
  const subscription = useRef<{ unsubscribe: () => void }>();
  useSubscription(subscribe, subscription.current);

  function subscribe(token?: string) {
    subscription.current = getGqlSubscriptionClient(token)
      ?.request({
        query: mojitoSubscriptions[EMojitoSubscriptions.collectionItemBids],
        variables: { marketplaceAuctionLotId: lotId },
      })
      .subscribe(
        {
          next({
            data: { getMarketplaceAuctionLot: newLotDetails },
          }: IUseMojitoOneLotSubscription) {
            if (newLotDetails) {
              queryClient.setQueryData<IMojitoCollectionItemDetailsBid[]>(
                [
                  `Mojito ${EMojitoKey[EMojitoKey.collectionItemByIdBidsList]}`,
                  {
                    id: itemId,
                    slug: collectionSlug,
                  },
                ],
                () => {
                  return mojitoNormalizer(
                    {
                      collectionItemById: {
                        id: itemId,
                        details: newLotDetails,
                      },
                    },
                    { slug: collectionSlug },
                  );
                },
              );
            }
          },
        },
        (e: any) => console.error(e),
      );
  }
}

export function useMojitoCollectionSubscription(
  collectionSlug: string,
  collectionId: string,
): void {
  const subscription = useRef<{ unsubscribe: () => void }>();
  useSubscription(subscribe, subscription.current);

  function subscribe(token?: string) {
    subscription.current = getGqlSubscriptionClient(token)
      ?.request({
        query: mojitoSubscriptions[EMojitoSubscriptions.marketplaceCollectionLotsUpdates],
        variables: { slug: collectionSlug, collectionId },
      })
      .subscribe(
        {
          next({
            data: { marketplaceCollectionLotsUpdates: newLotDetails },
          }: IUseMojitoCollectionSubscription) {
            if (newLotDetails) {
              queryClient.setQueryData<IMojitoCollection>(
                [
                  `Mojito ${EMojitoKey[EMojitoKey.collectionBySlugCurrentBids]}`,
                  {
                    slug: collectionSlug,
                    marketplaceID: config.MARKETPLACE_ID,
                  },
                ],
                (data) => {
                  if (!data) return {} as IMojitoCollection;
                  Object.assign(
                    data?.items?.find((e) => e.details.id === newLotDetails.id)?.details,
                    newLotDetails,
                  );
                  return mojitoNormalizer({ collectionBySlug: data }, { slug: collectionSlug });
                },
              );
            }
          },
        },
        (e: any) => console.error(e),
      );
  }
}
