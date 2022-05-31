import { IMojitoCheckUsernameRequest } from '../../domain/interfaces';

export function resolveCheckUsername(req, res, ctx) {
  return res(
    ctx.data({
      orgUsernameAvailable: req.variables.username === 'new-user',
    } as IMojitoCheckUsernameRequest),
  );
}
