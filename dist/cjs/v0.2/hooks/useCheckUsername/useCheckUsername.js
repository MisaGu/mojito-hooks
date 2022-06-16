'use strict';

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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useCheckUsername = void 0;

var general_constants_1 = require('../../domain/constants/general.constants');

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.orgUsernameAvailable;
}

function useCheckUsername(_a) {
  var username = _a.username,
    options = _a.options;

  var _b = (0, useMojitoFactory_1.useMojitoFactory)({
      as: 'usernameAvailable',
      query: state_enum_1.EMojitoKey.checkUsername,
      variables: {
        organizationID: general_constants_1.config.ORGANIZATION_ID,
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

exports.useCheckUsername = useCheckUsername;
exports['default'] = useCheckUsername;
