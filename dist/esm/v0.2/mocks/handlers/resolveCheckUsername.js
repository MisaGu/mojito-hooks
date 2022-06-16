export function resolveCheckUsername(req, res, ctx) {
  return res(
    ctx.data({
      orgUsernameAvailable: req.variables.username === 'new-user',
    }),
  );
}
