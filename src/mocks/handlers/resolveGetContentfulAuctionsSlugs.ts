import { ContentfulAuctionsSlugListQuery } from '../../domain/interfaces';

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
    } as ContentfulAuctionsSlugListQuery),
  );
}
