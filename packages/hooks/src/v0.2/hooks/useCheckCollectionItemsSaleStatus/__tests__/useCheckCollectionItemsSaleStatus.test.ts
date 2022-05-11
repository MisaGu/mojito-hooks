import { useCheckCollectionItemsSaleStatus } from '../useCheckCollectionItemsSaleStatus';
import { BUY_NOW_COLLECTION_ITEMS, AUCTION_COLLECTION_ITEMS } from '../demo/demo.constants';
import { renderHook } from '@testing-library/react-hooks';

describe('useCheckCollectionItemsSaleStatus()', () => {
  it('only re-computes if items change', () => {
    const { result, rerender } = renderHook(useCheckCollectionItemsSaleStatus);

    expect(result.current).toMatchObject({
      hasActiveBuyNowItems: false,
      hasActiveAuctionItems: false,
    });

    rerender();
    const result1 = result.current;

    rerender();
    const result2 = result.current;

    expect(result2).toBe(result1);

    rerender(BUY_NOW_COLLECTION_ITEMS);
    const result3 = result.current;

    expect(result3).not.toBe(result2);

    rerender(BUY_NOW_COLLECTION_ITEMS);
    const result4 = result.current;

    expect(result4).toBe(result3);
  });
});
