export function resolveGetUserActiveBids(req, res, ctx) {
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
