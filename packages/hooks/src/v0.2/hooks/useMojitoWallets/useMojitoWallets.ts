import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoProfileRequest } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(profileRequest?: IMojitoProfileRequest) {
  if (!profileRequest) return undefined;

  return profileRequest.me.user.wallets;
}

export type UseMojitoWalletsData = ReturnType<typeof transformFn>;

export type UseMojitoWalletsReturn = ReturnType<typeof useMojitoWallets>;

export type UseMojitoWalletsProps = BaseQueryHookProps<UseMojitoWalletsData>;

export function useMojitoWallets({ options }: UseMojitoWalletsProps = {}) {
  return useMojitoFactory({
    as: 'wallets',
    query: EMojitoQueries.userWallets,
    options,
    transformFn,
    onlyAuthenticated: true,
  });
}

// legacy function
/*

export function useMojitoWallets(): {
  wallets: IMojitoWallet[];
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.userWallets,
    onlyAuthenticated: true,
  });

  return {
    wallets: result?.data?.me?.wallets,
    ...result,
  };
}


*/
