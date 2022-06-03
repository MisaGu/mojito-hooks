import { EMojitoQueries } from '../../domain/gql/queries';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { CurrentUserResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { config } from '../../domain/constants/general.constants';

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
    query: EMojitoQueries.userActiveBids,
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
    options,
    transformFn,
    onlyAuthenticated: true,
  });
}

export default useActiveBids;
