export function resolveGetServerTime(req, res, ctx) {
  return res(
    ctx.data({
      serverTime: '2022-05-25T14:27:18Z',
    }),
  );
}
