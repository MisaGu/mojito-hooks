export function resolveGetCollectionItemByIdRemainingCount(req, res, ctx) {
  return res(
    ctx.data({
      collectionItemById: {
        id: 'mock-item-id',
        details: {
          id: 'mock-item-id',
          remainingCount: 100,
        },
      },
    }),
  );
}
