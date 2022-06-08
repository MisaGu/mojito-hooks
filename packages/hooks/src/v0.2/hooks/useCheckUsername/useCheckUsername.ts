import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { OrgUsernameAvailableResponse } from '../../domain/interfaces';
import { BaseLazyQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(response?: OrgUsernameAvailableResponse) {
  if (!response) return undefined;

  return response.orgUsernameAvailable;
}

export type UseCheckUsername = ReturnType<typeof transformFn>;

export type UseCheckUsernameReturn = ReturnType<typeof useCheckUsername>;

export interface UseCheckUsernameProps extends BaseLazyQueryHookProps<UseCheckUsername> {
  username: string;
}

export function useCheckUsername({ username, options }: UseCheckUsernameProps) {
  const { refetch: checkUsername, ...factory } = useMojitoFactory({
    as: 'usernameAvailable',
    query: EMojitoKey.checkUsername,
    variables: {
      organizationID: config.ORGANIZATION_ID,
      username,
    },
    options: { ...options, enabled: false },
    selectFn: transformFn,
  });

  return { ...factory, checkUsername };
}

export default useCheckUsername;
