'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useInvoices = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.getMyInvoices;
}

function useInvoices(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'invoices',
    query: state_enum_1.EMojitoKey.invoices,
    options: options,
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}

exports.useInvoices = useInvoices;
exports['default'] = useInvoices;
