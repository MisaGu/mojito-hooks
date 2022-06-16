'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetCollectionItemByIdRemainingCount = void 0;

function resolveGetCollectionItemByIdRemainingCount(req, res, ctx) {
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

exports.resolveGetCollectionItemByIdRemainingCount = resolveGetCollectionItemByIdRemainingCount;
