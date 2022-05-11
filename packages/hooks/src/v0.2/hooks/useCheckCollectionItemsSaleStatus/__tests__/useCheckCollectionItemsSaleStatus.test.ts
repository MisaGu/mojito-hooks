import { useCheckCollectionItemsSaleStatus } from '../useCheckCollectionItemsSaleStatus';
import * as UseCheckCollectionItemsSaleStatusModule from '../useCheckCollectionItemsSaleStatus';
import { BUY_NOW_COLLECTION_ITEMS, AUCTION_COLLECTION_ITEMS } from '../demo/demo.constants';

const checkCollectionItemsSaleStatusSpy = jest.spyOn(
  UseCheckCollectionItemsSaleStatusModule,
  'checkCollectionItemsSaleStatus',
);

describe('useCheckCollectionItemsSaleStatus()', () => {
  it("only re-computes if items don' change", () => {
    useCheckCollectionItemsSaleStatus();
    useCheckCollectionItemsSaleStatus(BUY_NOW_COLLECTION_ITEMS);
    useCheckCollectionItemsSaleStatus(BUY_NOW_COLLECTION_ITEMS);
    useCheckCollectionItemsSaleStatus(AUCTION_COLLECTION_ITEMS);
    useCheckCollectionItemsSaleStatus(AUCTION_COLLECTION_ITEMS);
    useCheckCollectionItemsSaleStatus();

    expect(checkCollectionItemsSaleStatusSpy).toHaveBeenCalledTimes(3);
  });
});
