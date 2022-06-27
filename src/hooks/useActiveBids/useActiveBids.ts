import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { CurrentUserResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: CurrentUserResponse) {
  if (!response) return undefined;
  console.log(response.me);
  return response.me.activeBids;
}

export type UseActiveBidsData = ReturnType<typeof selectorFn>;

export type UseActiveBidsReturn = ReturnType<typeof useActiveBids>;

export type UseActiveBidsProps = BaseQueryHookProps<UseActiveBidsData>;

export function useActiveBids({ options }: UseActiveBidsProps = {}) {
  return useMojitoFactory({
    as: 'activeBids',
    queryKey: QueryKey.get(EMojitoKey.userActiveBids, {
      organizationID: config.ORGANIZATION_ID,
    }),
    options,
    selectorFn,
    onlyAuthenticated: true,
  });
}

export default useActiveBids;
