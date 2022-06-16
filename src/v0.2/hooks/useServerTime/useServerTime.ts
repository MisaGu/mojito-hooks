import { EMojitoKey } from '../../domain/enums/state.enum';
import { ServerTimeResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export type UseServerTimeData = ServerTimeResponse;

export type UseServerTimeReturn = ReturnType<typeof useServerTime>;

export type UseServerTimeProps = BaseQueryHookProps<ServerTimeResponse>;

export function useServerTime({ options }: UseServerTimeProps = {}) {
  return useMojitoFactory<'serverTime', UseServerTimeData>({
    as: 'serverTime',
    query: EMojitoKey.serverTime,
    options,
  });
}
