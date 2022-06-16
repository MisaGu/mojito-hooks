'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetContentfulAuctionsSlugs = void 0;

function resolveGetContentfulAuctionsSlugs(req, res, ctx) {
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

exports.resolveGetContentfulAuctionsSlugs = resolveGetContentfulAuctionsSlugs;
