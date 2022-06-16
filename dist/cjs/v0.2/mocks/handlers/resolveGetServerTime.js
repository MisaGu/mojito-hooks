'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetServerTime = void 0;

function resolveGetServerTime(req, res, ctx) {
  return res(
    ctx.data({
      serverTime: '2022-05-25T14:27:18Z',
    }),
  );
}

exports.resolveGetServerTime = resolveGetServerTime;
