'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useOrganization = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  var _a;

  if (!response) return undefined;
  return (_a = response.me.userOrgs) === null || _a === void 0 ? void 0 : _a[0];
}

function useOrganization(_a) {
  var _b = _a === void 0 ? {} : _a,
    force = _b.force,
    options = _b.options;

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'organization',
    query: state_enum_1.EMojitoKey.profile,
    options: options,
    selectorFn: selectorFn,
    force: force,
    onlyAuthenticated: true,
  });
}

exports.useOrganization = useOrganization;
exports['default'] = useOrganization;
