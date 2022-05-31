import { act, renderHook } from '@testing-library/react-hooks';
import {
  DEMO_COLLECTION_ITEM_ID,
  DEMO_SLUG,
} from '../../../components/demo/constants/demo.constants';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import {
  useCollectionItemCurrentBids,
  UseCollectionItemCurrentBidsProps,
  UseCollectionItemCurrentBidsReturn,
} from '../useCollectionItemCurrentBids';

describe('useCollectionItemCurrentBids()', () => {
  it('should be defined', () => {
    expect(useCollectionItemCurrentBids).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<
      [UseCollectionItemCurrentBidsProps],
      UseCollectionItemCurrentBidsReturn
    >(
      (args) => {
        return useCollectionItemCurrentBids(...args);
      },
      {
        initialProps: [{ collectionItemID: DEMO_COLLECTION_ITEM_ID, slug: DEMO_SLUG }],
        wrapper: TestWrapper as any,
      },
    );

    // Trigger request...
    await act(async () => rerender());

    // ...and wait for the main query to start fetching...:
    await waitFor(() => result.current.queryResult.isFetching);

    // ...and for its response:
    await waitFor(() => result.current.queryResult.isSuccess);

    // Check data matches snapshot:
    expect(result.current).toMatchSnapshot({
      queryResult: {
        dataUpdatedAt: expect.any(Number),
      },
    });
  });
});
