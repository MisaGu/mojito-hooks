import { act, renderHook } from '@testing-library/react-hooks';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import {
  useContentfulAuctionBySlug,
  UseContentfulAuctionBySlugProps,
  UseContentfulAuctionBySlugReturn,
} from '../useContentfulAuctionBySlug';

describe('useContentfulAuctionBySlug()', () => {
  it('should be defined', () => {
    expect(useContentfulAuctionBySlug).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<
      [UseContentfulAuctionBySlugProps],
      UseContentfulAuctionBySlugReturn
    >(
      (args) => {
        return useContentfulAuctionBySlug(...args);
      },
      {
        initialProps: [{ slug: 'bid-test-3' }],
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
