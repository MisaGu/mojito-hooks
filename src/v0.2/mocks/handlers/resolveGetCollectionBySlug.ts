export function resolveGetCollectionBySlug(req, res, ctx) {
  return res(
    ctx.data({
      collectionBySlug: {
        id: 'mock-collection-id',
        slug: 'mock-collection',
        name: 'Mock Collection',
        description: '',
        startDate: '2022-05-01T14:20:00Z',
        endDate: '2022-05-25T23:36:00Z',
        items: [
          {
            name: 'Mock Collection Item',
            id: 'mock-collection-item-id',
            collectionId: 'mock-collection-id',
            marketplaceTokenId: null,
            saleType: 'BuyNow',
            slug: 'mock-collection-item',
            details: {
              __typename: 'MarketplaceBuyNowOutput',
              id: 'mock-collection-item-details-id',
              unitPrice: 100,
              totalUnits: 1,
              totalAvailableUnits: 1,
              startDate: '2022-05-24T18:44:32Z',
              endDate: '2022-05-25T23:36:00Z',
              sortNumber: 0,
            },
          },
        ],
      },
    }),
  );
}
