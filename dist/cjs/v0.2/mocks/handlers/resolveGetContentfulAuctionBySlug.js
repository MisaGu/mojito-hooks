'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetContentfulAuctionBySlug = void 0;

function resolveGetContentfulAuctionBySlug(req, res, ctx) {
  return res(
    ctx.data({
      auctionCollection: {
        items: [
          {
            name: 'bid test 3',
            title: 'bid test 3',
            subtitle: null,
            duration: null,
            description: null,
            data: null,
            startDate: '2022-03-16T12:00:00.000Z',
            endDate: '2022-03-18T12:00:00.000Z',
            videoId: null,
            slug: 'bid-test-3',
            saleId: 'BID_TEST_3',
          },
        ],
      },
    }),
  );
}

exports.resolveGetContentfulAuctionBySlug = resolveGetContentfulAuctionBySlug;
