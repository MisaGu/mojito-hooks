import { MojitoCollectionItemCurrentBidsResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(response?: MojitoCollectionItemCurrentBidsResponse):
  | {
      id: string;
      details: Pick<
        import('../../domain/interfaces/_utils.interface').Combine<
          Omit<
            import('../../domain/interfaces/mojito-schema.interface').MarketplaceAuctionLot,
            'marketplaceCollectionItem'
          >,
          {
            saleView: import('../../domain/interfaces').MojitoSaleStatus;
          } & {
            status: import('../../domain/enums').EMojitoCollectionItemAuctionLotStatus;
            currentBid: import('../../domain/interfaces').MojitoMarketplaceAuctionBid;
            myBid: import('../../domain/interfaces').MojitoMarketplaceAuctionBid;
            bids: import('../../domain/interfaces').MojitoMarketplaceAuctionBid[];
          }
        >,
        'id' | 'currentBid' | 'endDate' | 'startDate' | 'myBid' | 'startingBid'
      >;
    }[]
  | undefined;
export declare type UseCollectionItemsCurrentBidsData = ReturnType<typeof selectorFn>;
export declare type UseCollectionItemsCurrentBidsReturn = ReturnType<
  typeof useCollectionItemsCurrentBids
>;
export declare type UseCollectionItemsCurrentBidsProps =
  BaseQueryHookPropsWithUrlAndSlug<UseCollectionItemsCurrentBidsData>;
export declare function useCollectionItemsCurrentBids({
  options,
  ...props
}: UseCollectionItemsCurrentBidsProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'currentBids',
  any,
  Error
>;
export default useCollectionItemsCurrentBids;
