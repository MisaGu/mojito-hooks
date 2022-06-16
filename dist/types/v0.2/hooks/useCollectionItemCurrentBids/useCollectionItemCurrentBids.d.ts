import { MojitoMarketplaceAuctionBid } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
export declare type UseCollectionItemCurrentBidsData = undefined | MojitoMarketplaceAuctionBid;
export declare type UseCollectionItemCurrentBidsReturn = ReturnType<
  typeof useCollectionItemCurrentBid
>;
export interface UseCollectionItemCurrentBidsProps
  extends BaseQueryHookPropsWithUrlAndSlug<UseCollectionItemCurrentBidsData> {
  collectionItemID: string;
}
export declare function useCollectionItemCurrentBid({
  collectionItemID,
  ...props
}: UseCollectionItemCurrentBidsProps): void;
export default useCollectionItemCurrentBid;
