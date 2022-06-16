import { CurrentUserResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: CurrentUserResponse,
): import('../../domain/interfaces').MojitoMarketplaceAuctionBid[] | undefined;
export declare type UseActiveBidsData = ReturnType<typeof selectorFn>;
export declare type UseActiveBidsReturn = ReturnType<typeof useActiveBids>;
export declare type UseActiveBidsProps = BaseQueryHookProps<UseActiveBidsData>;
export declare function useActiveBids({
  options,
}?: UseActiveBidsProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'activeBids',
  any,
  Error
>;
export default useActiveBids;
