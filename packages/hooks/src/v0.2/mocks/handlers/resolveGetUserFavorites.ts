export function resolveGetUserFavorites(req, res, ctx) {
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
