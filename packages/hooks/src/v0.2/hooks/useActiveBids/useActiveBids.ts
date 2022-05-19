import { EMojitoQueries } from '../../domain/gql/queries';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { IMojitoCollectionItemDetailsBid, IMojitoProfileRequest } from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { config } from '../../domain/constants/general.constants';

export type UseActiveBidsData = undefined | null | IMojitoCollectionItemDetailsBid[];

export type UseActiveBidsReturn = QueryResult<'activeBids', UseActiveBidsData>;

export type UseActiveBidsProps = BaseQueryHookProps<IMojitoProfileRequest>;

// TODO: Memo this function:

function transformFn(profileRequest?: undefined | null | IMojitoProfileRequest): UseActiveBidsData {
  if (!profileRequest) return undefined;

  return profileRequest.me.activeBids;
}

export function useActiveBids({ options }: UseActiveBidsProps = {}): UseActiveBidsReturn {
  return useMojitoFactory<'activeBids', IMojitoProfileRequest, UseActiveBidsData>({
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
