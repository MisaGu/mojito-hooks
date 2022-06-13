import { EMojitoKey } from '../../domain/enums/state.enum';
import { ServerTimeResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: ServerTimeResponse) {
  if (!response) return undefined;

  return new Date(response.serverTime);
}

export type UseServerTimeData = ReturnType<typeof selectorFn>;

export type UseServerTimeReturn = ReturnType<typeof useServerTime>;

export type UseServerTimeProps = BaseQueryHookProps<UseServerTimeData>;

export function useServerTime({ options }: UseServerTimeProps = {}) {
  return useMojitoFactory({
    as: 'serverTime',
    query: EMojitoKey.serverTime,
    options,
  });
}
