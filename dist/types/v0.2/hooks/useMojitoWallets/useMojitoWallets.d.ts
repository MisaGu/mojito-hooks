import { WalletsResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: WalletsResponse,
): import('../../domain/interfaces').MojitoWallet[] | undefined;
export declare type UseMojitoWalletsData = ReturnType<typeof selectorFn>;
export declare type UseMojitoWalletsReturn = ReturnType<typeof useMojitoWallets>;
export declare type UseMojitoWalletsProps = BaseQueryHookProps<UseMojitoWalletsData>;
export declare function useMojitoWallets({
  options,
}?: UseMojitoWalletsProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'wallets',
  any,
  Error
>;
export {};
