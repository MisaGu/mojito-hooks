'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetUserFavorites = void 0;

function resolveGetUserFavorites(req, res, ctx) {
  return res(
    ctx.data({
      serverTime: '2022-05-25T14:05:40Z',
      me: {
        id: '3062dffb-db49-4cb7-bb16-05dfbdb1e982',
        favoriteItems: [],
      },
    }),
  );
}

exports.resolveGetUserFavorites = resolveGetUserFavorites;
