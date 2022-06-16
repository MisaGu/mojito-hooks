'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetMarketplaceCollectionsInfoWithItemsIdAndSlug = void 0;

function resolveGetMarketplaceCollectionsInfoWithItemsIdAndSlug(req, res, ctx) {
  return res(
    ctx.data({
      marketplace: {
        collections: [
          {
            id: 'mock-collection-id',
            slug: 'bid-test-3',
            name: 'bid test 3',
            description: '',
            startDate: '2022-03-10T01:04:03Z',
            endDate: '2022-03-22T11:10:03Z',
            items: [
              {
                slug: 'test',
                id: '549c4f64-ca4d-4087-a8a6-3b8ce1ecf059',
              },
            ],
          },
        ],
      },
    }),
  );
}

exports.resolveGetMarketplaceCollectionsInfoWithItemsIdAndSlug =
  resolveGetMarketplaceCollectionsInfoWithItemsIdAndSlug;
