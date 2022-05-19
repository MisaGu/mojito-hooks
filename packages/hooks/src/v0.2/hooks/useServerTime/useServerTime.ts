import { EMojitoQueries } from '../../domain/gql/queries';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export type UseServerTimeData = Date;

export type UseServerTimeReturn = ReturnType<typeof useServerTime>;

export type UseServerTimeProps = BaseQueryHookProps<UseServerTimeData>;

export function useServerTime({ options }: UseServerTimeProps = {}) {
  return useMojitoFactory({
    as: 'serverTime',
    query: EMojitoQueries.serverTime,
    options,
  });
}

// legacy function
/*

export function useServerTime(): {
  serverTime: Date;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.serverTime,
  });

  return {
    serverTime: result?.data?.serverTime,
    ...result,
  };
}


*/
