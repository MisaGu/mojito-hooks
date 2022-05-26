import { config } from '../../domain/constants/general.constants';
import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoCheckUsernameRequest } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(checkUsernameRequest?: IMojitoCheckUsernameRequest) {
  if (!checkUsernameRequest) return undefined;

  return checkUsernameRequest.orgUsernameAvailable;
}

export type UseCheckUsername = ReturnType<typeof transformFn>;

export type UseCheckUsernameReturn = ReturnType<typeof useCheckUsername>;

export interface UseCheckUsernameProps extends BaseQueryHookProps<UseCheckUsername> {
  username: string;
}

export function useCheckUsername({ username, options }: UseCheckUsernameProps) {
  return useMojitoFactory({
    as: 'usernameAvailable',
    query: EMojitoQueries.checkUsername,
    variables: {
      organizationID: config.ORGANIZATION_ID,
      username,
    },
    options,
    transformFn,
    onlyAuthenticated: true,
  });
}
