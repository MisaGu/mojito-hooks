import { IContentfulAuctionBySlugQuery } from '../../domain/interfaces';

export function resolveGetContentfulAuctionBySlug(req, res, ctx) {
  return res(
    ctx.data({
      auctionCollection: {
        items: [
          {
            name: 'LFC Heroes',
            title: 'LFC Heroes',
            subtitle: null,
            duration: null,
            description: null,
            data: null,
            startDate: '2022-03-16T12:00:00.000Z',
            endDate: '2022-03-18T12:00:00.000Z',
            videoId: null,
            slug: 'lfc',
            saleId: 'NFTN23',
          },
        ],
      },
    } as IContentfulAuctionBySlugQuery),
  );
}
