import { ServerTimeResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
export declare type UseServerTimeData = ServerTimeResponse;
export declare type UseServerTimeReturn = ReturnType<typeof useServerTime>;
export declare type UseServerTimeProps = BaseQueryHookProps<ServerTimeResponse>;
export declare function useServerTime({
  options,
}?: UseServerTimeProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'serverTime',
  ServerTimeResponse,
  Error
>;
