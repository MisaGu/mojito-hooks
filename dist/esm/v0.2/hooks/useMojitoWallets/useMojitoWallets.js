import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.me.wallets;
}

export function useMojitoWallets(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return useMojitoFactory({
    as: 'wallets',
    query: EMojitoKey.userWallets,
    options: options,
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
} // legacy function

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
