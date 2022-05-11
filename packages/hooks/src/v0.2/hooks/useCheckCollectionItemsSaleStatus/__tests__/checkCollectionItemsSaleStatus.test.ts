import {
  AUCTION_COLLECTION_ITEMS,
  BUY_NOW_COLLECTION_ITEMS,
  MIXED_COLLECTION_ITEMS,
} from '../demo/demo.constants';
import { checkCollectionItemsSaleStatus } from '../useCheckCollectionItemsSaleStatus';

describe('checkCollectionItemsSaleStatus()', () => {
  it('returns two falses if nothing provided', () => {
    expect(checkCollectionItemsSaleStatus()).toMatchObject({
      hasActiveBuyNowItems: false,
      hasActiveAuctionItems: false,
    });
  });

  it('returns two falses if called with an empty array', () => {
    expect(checkCollectionItemsSaleStatus([])).toMatchObject({
      hasActiveBuyNowItems: false,
      hasActiveAuctionItems: false,
    });
  });

  it('returns hasActiveBuyNowItems: true if called with buy now items', () => {
    expect(checkCollectionItemsSaleStatus(BUY_NOW_COLLECTION_ITEMS)).toMatchObject({
      hasActiveBuyNowItems: true,
      hasActiveAuctionItems: false,
    });
  });

  it('returns hasActiveAuctionItems: true if called with auction items', () => {
    expect(checkCollectionItemsSaleStatus(AUCTION_COLLECTION_ITEMS)).toMatchObject({
      hasActiveBuyNowItems: false,
      hasActiveAuctionItems: true,
    });
  });

  it('returns hasActiveAuctionItems: true and hasActiveBuyNowItems: true if called with mixed type items', () => {
    expect(checkCollectionItemsSaleStatus(MIXED_COLLECTION_ITEMS)).toMatchObject({
      hasActiveBuyNowItems: true,
      hasActiveAuctionItems: true,
    });
  });
});
