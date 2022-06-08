import { EMojitoKey } from '../../domain/enums/state.enum';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export type UseServerTimeData = Date;

export type UseServerTimeReturn = ReturnType<typeof useServerTime>;

export type UseServerTimeProps = BaseQueryHookProps<UseServerTimeData>;

export function useServerTime({ options }: UseServerTimeProps = {}) {
  return useMojitoFactory({
    as: 'serverTime',
    query: EMojitoKey.serverTime,
    options,
  });
}

// legacy function
/*

export function useServerTime(): {
  serverTime: Date;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoKey.serverTime,
  });

  return {
    serverTime: result?.data?.serverTime,
    ...result,
  };
}


*/
