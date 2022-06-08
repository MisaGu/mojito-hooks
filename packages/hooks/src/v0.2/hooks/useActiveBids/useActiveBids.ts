import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CurrentUserResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(response?: CurrentUserResponse) {
  if (!response) return undefined;

  return response.me.activeBids;
}

export type UseActiveBidsData = ReturnType<typeof transformFn>;

export type UseActiveBidsReturn = ReturnType<typeof useActiveBids>;

export type UseActiveBidsProps = BaseQueryHookProps<UseActiveBidsData>;

export function useActiveBids({ options }: UseActiveBidsProps = {}) {
  return useMojitoFactory({
    as: 'activeBids',
    query: EMojitoKey.userActiveBids,
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
    options,
    transformFn,
    onlyAuthenticated: true,
  });
}

export default useActiveBids;
