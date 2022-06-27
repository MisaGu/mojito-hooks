import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { ServerTimeResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export type UseServerTimeData = ServerTimeResponse;

export type UseServerTimeReturn = ReturnType<typeof useServerTime>;

export type UseServerTimeProps = BaseQueryHookProps<UseServerTimeData>;

export function useServerTime({ options }: UseServerTimeProps = {}) {
  return useMojitoFactory({
    as: 'serverTime',
    queryKey: QueryKey.get(EMojitoKey.serverTime),
    options,
  });
}
