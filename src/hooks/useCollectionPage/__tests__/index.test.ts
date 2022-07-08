import { act, renderHook } from '@testing-library/react-hooks';
import { DEMO_SLUG } from '../../../components/demo/constants/demo.constants';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import { config } from '../../../domain/constants/general.constants';
import {
  useCollectionPage,
  UseCollectionPageProps,
  UseCollectionPageReturn,
} from '../useCollectionPage';

describe('useCollectionPage()', () => {
  it('should be defined', () => {
    expect(useCollectionPage).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<
      [UseCollectionPageProps],
      UseCollectionPageReturn
    >(
      (args) => {
        return useCollectionPage(...args);
      },
      {
        initialProps: [
          { slug: DEMO_SLUG, marketplaceID: config.MARKETPLACE_ID, page: 0, pageSize: 4 },
        ],
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
      collectionPage: {
        items: [
          {
            details: {
              endTimestamp: expect.any(Number),
            },
          },
        ],
      },
      queryResult: {
        dataUpdatedAt: expect.any(Number),
      },
    });
  });
});
