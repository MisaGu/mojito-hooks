'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useServerTime = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function useServerTime(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'serverTime',
    query: state_enum_1.EMojitoKey.serverTime,
    options: options,
  });
}

exports.useServerTime = useServerTime;
