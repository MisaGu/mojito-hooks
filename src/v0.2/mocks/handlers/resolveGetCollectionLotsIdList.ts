export function resolveGetCollectionLotsIdList(req, res, ctx) {
  return res(
    ctx.data({
      collectionBySlug: {
        items: [
          {
            id: 'mock-item-id',
            name: 'mock-item',
            saleType: 'Auction',
          },
        ],
      },
    }),
  );
}
