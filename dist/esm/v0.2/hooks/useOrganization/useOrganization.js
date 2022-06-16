import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  var _a;

  if (!response) return undefined;
  return (_a = response.me.userOrgs) === null || _a === void 0 ? void 0 : _a[0];
}

export function useOrganization(_a) {
  var _b = _a === void 0 ? {} : _a,
    force = _b.force,
    options = _b.options;

  return useMojitoFactory({
    as: 'organization',
    query: EMojitoKey.profile,
    options: options,
    selectorFn: selectorFn,
    force: force,
    onlyAuthenticated: true,
  });
}
export default useOrganization;
