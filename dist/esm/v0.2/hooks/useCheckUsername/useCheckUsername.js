var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

    return __assign.apply(this, arguments);
  };

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.orgUsernameAvailable;
}

export function useCheckUsername(_a) {
  var username = _a.username,
    options = _a.options;

  var _b = useMojitoFactory({
      as: 'usernameAvailable',
      query: EMojitoKey.checkUsername,
      variables: {
        organizationID: config.ORGANIZATION_ID,
        username: username,
      },
      options: __assign(__assign({}, options), {
        enabled: false,
      }),
      selectorFn: selectorFn,
    }),
    checkUsername = _b.refetch,
    factory = __rest(_b, ['refetch']);

  return __assign(__assign({}, factory), {
    checkUsername: checkUsername,
  });
}
export default useCheckUsername;
