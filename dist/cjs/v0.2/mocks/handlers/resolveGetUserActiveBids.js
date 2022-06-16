'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetUserActiveBids = void 0;

function resolveGetUserActiveBids(req, res, ctx) {
  return res(
    ctx.data({
      serverTime: '2022-05-23T15:48:23Z',
      me: {
        id: 'mock-user-id',
        activeBids: [],
      },
    }),
  );
}

exports.resolveGetUserActiveBids = resolveGetUserActiveBids;
