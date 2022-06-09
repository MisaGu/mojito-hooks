import { EMojitoKey } from '../../domain/enums/state.enum';
import { WalletsResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: WalletsResponse) {
  if (!response) return undefined;

  return response.me.wallets;
}

export type UseMojitoWalletsData = ReturnType<typeof selectorFn>;

export type UseMojitoWalletsReturn = ReturnType<typeof useMojitoWallets>;

export type UseMojitoWalletsProps = BaseQueryHookProps<UseMojitoWalletsData>;

export function useMojitoWallets({ options }: UseMojitoWalletsProps = {}) {
  return useMojitoFactory({
    as: 'wallets',
    query: EMojitoKey.userWallets,
    options,
    selectorFn,
    onlyAuthenticated: true,
  });
}

// legacy function
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
