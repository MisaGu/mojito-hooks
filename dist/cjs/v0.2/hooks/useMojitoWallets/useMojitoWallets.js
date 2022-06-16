'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useMojitoWallets = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.me.wallets;
}

function useMojitoWallets(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'wallets',
    query: state_enum_1.EMojitoKey.userWallets,
    options: options,
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}

exports.useMojitoWallets = useMojitoWallets; // legacy function

/*

export function useMojitoWallets(): {
  wallets: IMojitoWallet[];
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoKey.userWallets,
    onlyAuthenticated: true,
  });

  return {
    wallets: result?.data?.me?.wallets,
    ...result,
  };
}


*/
