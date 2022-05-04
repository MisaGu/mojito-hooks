import { config } from '@constants';
import {
  IMojitoCollectionItem,
  IMojitoCollectionItemAuctionLot,
  IMojitoCollectionItemBuyNowLot,
  IMojitoCollectionItemDetailsBid,
  IMojitoInvoice,
  IMojitoProfile,
  IMojitoProfileCustomOrgs,
  IMojitoProfileUserOrg,
  IMojitoWallet,
} from '@interfaces/mojito.interface';
import * as Sentry from '@sentry/react';
import { EMojitoQueries } from 'data/graph_ql/mojito.query';
import { useEffect } from 'react';
import { UseQueryOptions } from 'react-query';
import { useLazyMojito, useMojito } from './useMojito';

export function useProfile(props?: { force?: boolean }): {
  profile: IMojitoProfile;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.profile,
    force: props?.force,
    onlyAuthenticated: true,
  });

  const profile = result?.data?.me;
  const organization = profile?.userOrgs?.[0];

  useEffect(() => {
    if (!profile || !organization) return;

    Sentry.setUser({ id: profile.id });
    Sentry.setTag('profileID', profile.id);
    Sentry.setTag('organizationID', organization.id);
  }, [profile, organization]);

  return {
    profile,
    ...result,
  };
}

export function useOrganization(options: UseQueryOptions<any> = {}): {
  organization: (IMojitoProfileUserOrg & IMojitoProfileCustomOrgs) | null;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.organization,
    options,
    onlyAuthenticated: true,
  });

  const profile = result?.data?.me;
  const organization = profile?.userOrgs?.[0];

  useEffect(() => {
    if (!profile || !organization) return;

    Sentry.setUser({ id: profile.id });
    Sentry.setTag('profileID', profile.id);
    Sentry.setTag('organizationID', organization.id);
  }, [profile, organization]);

  return {
    organization,
    ...result,
  };
}

export function useFavorites(): {
  favorites:
    | (
        | IMojitoCollectionItem<IMojitoCollectionItemAuctionLot>
        | IMojitoCollectionItem<IMojitoCollectionItemBuyNowLot>
      )[]
    | null;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.userFavorites,
    onlyAuthenticated: true,
  });

  return {
    favorites: result?.data?.me?.favoriteItems,
    ...result,
  };
}

export function useInvoices(): {
  invoices: IMojitoInvoice[];
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.invoices,
    onlyAuthenticated: true,
  });

  return {
    invoices: result?.data?.getMyInvoices,
    ...result,
  };
}

export function useActiveBids(): {
  activeBids: IMojitoCollectionItemDetailsBid[] | null;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.userActiveBids,
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
    onlyAuthenticated: true,
  });

  return {
    activeBids: result?.data?.me?.activeBids,
    ...result,
  };
}

export function useLazyMojitoOneLot(variables: { marketplaceAuctionLotId: string | undefined }): [
  () => void,
  {
    mojitoItemDetails?: IMojitoCollectionItemAuctionLot;
  } & ReturnType<typeof useMojito>,
] {
  const [getData, result] = useLazyMojito({
    query: EMojitoQueries.oneLot,
    variables,
  });

  return [
    getData,
    {
      mojitoItemDetails:
        (
          result?.data as {
            getMarketplaceAuctionLot: IMojitoCollectionItemAuctionLot;
          }
        )?.getMarketplaceAuctionLot ?? undefined,
      ...result,
    },
  ];
}

export function useServerTime(): {
  serverTime: Date;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.serverTime,
  });

  return {
    serverTime: result?.data?.serverTime,
    ...result,
  };
}

export function useMojitoWallets(): {
  wallets: IMojitoWallet[];
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.userWallets,
    onlyAuthenticated: true,
  });

  return {
    wallets: result?.data?.me?.wallets,
    ...result,
  };
}
