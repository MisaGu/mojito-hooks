'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetCollectionLotsIdList = void 0;

function resolveGetCollectionLotsIdList(req, res, ctx) {
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

exports.resolveGetCollectionLotsIdList = resolveGetCollectionLotsIdList;
