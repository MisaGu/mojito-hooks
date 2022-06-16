'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useActiveBids = void 0;

var general_constants_1 = require('../../domain/constants/general.constants');

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.me.activeBids;
}

function useActiveBids(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'activeBids',
    query: state_enum_1.EMojitoKey.userActiveBids,
    variables: {
      organizationID: general_constants_1.config.ORGANIZATION_ID,
    },
    options: options,
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}

exports.useActiveBids = useActiveBids;
exports['default'] = useActiveBids;
