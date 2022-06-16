'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetOneLot = void 0;

function resolveGetOneLot(req, res, ctx) {
  return res(
    ctx.data({
      users: [
        {
          firstName: 'John',
          lastName: 'Maverick',
        },
        {
          firstName: 'Cathaline',
          lastName: 'McCoy',
        },
      ],
    }),
  );
}

exports.resolveGetOneLot = resolveGetOneLot;
