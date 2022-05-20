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
      'useMarketplaceCollectionsSlugWithItemsId',
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
    title: 'Other',
    children: [
      'useFavoriteItems',
      'useInvoiceDownload',
      'useInvoices',
      'useLazyMojitoOneLot',
      'useMojitoItem',
      'useMojitoMutation',
      'useMojitoWallets',
      'useOrganization',
      'usePlaceBidMutation',
      'useProfile',
      'useServerTime',
    ],
  },
];
