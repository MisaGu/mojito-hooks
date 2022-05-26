export const menus = [
  {
    title: 'Mojito',
    children: [
      'useActiveBids',
      'useCheckUsername',
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
      'useContentfulAuctionBySlug',
      'useContentfulAuctionsSlugList',
      'useContentfulAuthors',
      'useContentfulCollectors',
      'useContentfulFullLot',
      'useContentfulOrganization',
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
