import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.me.activeBids;
}

export function useActiveBids(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return useMojitoFactory({
    as: 'activeBids',
    query: EMojitoKey.userActiveBids,
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
    options: options,
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}
export default useActiveBids;
