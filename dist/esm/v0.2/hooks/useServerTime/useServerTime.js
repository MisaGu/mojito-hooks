import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
export function useServerTime(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return useMojitoFactory({
    as: 'serverTime',
    query: EMojitoKey.serverTime,
    options: options,
  });
}
