'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetCollectionItemByIdBidsList = void 0;

function resolveGetCollectionItemByIdBidsList(req, res, ctx) {
  return res(
    ctx.data({
      collectionItemById: {
        id: 'mock-item-id',
        details: {
          id: 'mock-item-id',
          endDate: '',
          startDate: '',
          bids: [],
        },
      },
    }),
  );
}

exports.resolveGetCollectionItemByIdBidsList = resolveGetCollectionItemByIdBidsList;
