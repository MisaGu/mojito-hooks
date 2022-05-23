export function resolveGetServerTime(req, res, ctx) {
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
