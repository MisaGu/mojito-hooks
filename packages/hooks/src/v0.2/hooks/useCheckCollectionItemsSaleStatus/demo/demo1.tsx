import React, { useState } from 'react';
import { useCheckCollectionItemsSaleStatus } from '../useCheckCollectionItemsSaleStatus';
import {
  AUCTION_COLLECTION_ITEMS,
  BUY_NOW_COLLECTION_ITEMS,
  MIXED_COLLECTION_ITEMS,
} from './demo.constants';

export default () => {
  const [state, setState] = useState(MIXED_COLLECTION_ITEMS);

  const itemsSaleStatus = useCheckCollectionItemsSaleStatus();

  return (
    <div>
      <pre>{JSON.stringify(itemsSaleStatus, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setState(BUY_NOW_COLLECTION_ITEMS)}>
          Call with Buy Now items
        </button>
        <button type="button" onClick={() => setState(AUCTION_COLLECTION_ITEMS)}>
          Call with Auction items
        </button>
        <button type="button" onClick={() => setState(MIXED_COLLECTION_ITEMS)}>
          Call with mixed items
        </button>
      </p>
    </div>
  );
};
