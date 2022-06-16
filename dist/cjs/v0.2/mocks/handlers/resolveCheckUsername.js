'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveCheckUsername = void 0;

function resolveCheckUsername(req, res, ctx) {
  return res(
    ctx.data({
      orgUsernameAvailable: req.variables.username === 'new-user',
    }),
  );
}

exports.resolveCheckUsername = resolveCheckUsername;
