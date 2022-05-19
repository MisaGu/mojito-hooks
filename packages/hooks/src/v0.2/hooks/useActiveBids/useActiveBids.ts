import { EMojitoQueries } from '../../domain/gql/queries';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { IMojitoProfileRequest } from '../../domain/interfaces';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { config } from '../../domain/constants/general.constants';

function transformFn(profileRequest?: IMojitoProfileRequest) {
  if (!profileRequest) return undefined;

  return profileRequest.me.activeBids;
}

export type UseActiveBidsData = ReturnType<typeof transformFn>;

export type UseActiveBidsReturn = ReturnType<typeof useActiveBids>;

export type UseActiveBidsProps = BaseHookProps<UseActiveBidsData>;

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

// legacy function
/*
  export function useActiveBids(): {
    activeBids: IMojitoCollectionItemDetailsBid[] | null;
  } & ReturnType<typeof useMojito> {
    const result = useMojito({
      query: EMojitoQueries.userActiveBids,
      variables: {
        organizationID: config.ORGANIZATION_ID,
      },
      onlyAuthenticated: true,
    });

    return {
      activeBids: result?.data?.me?.activeBids,
      ...result,
    };
  }

*/
