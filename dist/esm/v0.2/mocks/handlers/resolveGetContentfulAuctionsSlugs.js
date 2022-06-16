export function resolveGetContentfulAuctionsSlugs(req, res, ctx) {
  return res(
    ctx.data({
      auctionCollection: {
        items: [
          {
            slug: 'mock-item-1',
          },
          {
            slug: 'mock-item-2',
          },
        ],
      },
    }),
  );
}
