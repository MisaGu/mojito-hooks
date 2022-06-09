import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CurrentUserResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: CurrentUserResponse) {
  if (!response) return undefined;

  return response.me.activeBids;
}

export type UseActiveBidsData = ReturnType<typeof selectorFn>;

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
    selectorFn,
    onlyAuthenticated: true,
  });
}

export default useActiveBids;

function selectorFn2(response?: CurrentUserResponse) {
  if (!response) return undefined;

  return response.me.activeBids;
}

export type UseActiveBidsData2 = ReturnType<typeof selectorFn>;

export type UseActiveBidsReturn2 = ReturnType<typeof useActiveBids>;

export type UseActiveBidsProps2 = BaseQueryHookProps<UseActiveBidsData2>;

export function useActiveBids2({ options }: UseActiveBidsProps2 = {}) {
  return useMojitoFactory({
    as: 'activeBids',
    query: EMojitoKey.userActiveBids,
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
    options,
    selectorFn: selectorFn2,
    onlyAuthenticated: true,
  });
}
