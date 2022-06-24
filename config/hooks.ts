/* eslint-disable */

export const menus = [
  {
    title: 'Mojito',
    children: [
      'useActiveBids',
      'useCheckUsername',
      'useCollection',
      'useCollectionItem',
      'useCollectionItemBidsList',
      'useCollectionItemCurrentBids',
      'useCollectionItemRemainingCount',
      'useCollectionItemsCurrentBids',
      'useCollectionsInfo',
      'useFavoriteItems',
      'useInvoices',
      'useLazyMojitoOneLot',
      'useMojitoWallets',
      'useOrganization',
      'useProfile',
      'useServerTime',
    ],
  },
  {
    title: 'Downloads',
    children: ['useInvoiceDownload'],
  },
  {
    title: 'Internal',
    children: ['useMojitoFactory'],
  },
  {
    title: 'Mutations',
    children: ['useMojitoMutation', 'usePlaceBidMutation'],
  },
];
