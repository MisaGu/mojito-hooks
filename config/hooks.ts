export const menus = [
  {
    title: 'Mojito',
    children: [
      'useActiveBids',
      'useCollection',
      'useCollectionItemBidsList',
      'useCollectionItemCurrentBids',
      'useCollectionItemRemainingCount',
      'useCollectionItemsCurrentBids',
      'useCollectionLotsIdList',
      'useCollectionSlug',
      'useFavoriteItems',
      'useInvoices',
      'useLazyMojitoOneLot',
      'useMarketplaceCollectionsSlugWithItemsId',
      'useMojitoItem',
      'useMojitoWallets',
      'useOrganization',
      'useProfile',
      'useServerTime',
    ],
  },
  {
    title: 'Contentful',
    children: [
      'useContentfulAuctionsSlugList',
      'useContentfulAuthors',
      'useContentfulCollectors',
      'useContentfulLots',
      'useContentfulShortLots',
    ],
  },
  {
    title: 'Internal',
    children: ['useContentfulFactory', 'useMojitoFactory'],
  },
  {
    title: 'Downloads',
    children: ['useInvoiceDownload'],
  },
  {
    title: 'Mutations',
    children: ['useMojitoMutation', 'usePlaceBidMutation'],
  },
];
