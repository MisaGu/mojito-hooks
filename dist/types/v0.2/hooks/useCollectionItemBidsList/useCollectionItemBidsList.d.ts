import { CollectionItemBidsListResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: CollectionItemBidsListResponse,
): import('../../domain/interfaces').MojitoMarketplaceAuctionBid[] | undefined;
export declare type UseCollectionItemBidsListData = ReturnType<typeof selectorFn>;
export declare type UseCollectionItemBidsListReturn = ReturnType<typeof useCollectionItemBidsList>;
export interface UseCollectionItemBidsListProps
  extends BaseQueryHookProps<UseCollectionItemBidsListData> {
  collectionItemID: string;
}
export declare function useCollectionItemBidsList({
  collectionItemID,
  options,
}: UseCollectionItemBidsListProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'bids',
  any,
  Error
>;
export default useCollectionItemBidsList;
