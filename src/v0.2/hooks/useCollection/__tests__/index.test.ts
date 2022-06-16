import { act, renderHook } from '@testing-library/react-hooks';
import { DEMO_SLUG } from '../../../components/demo/constants/demo.constants';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import { useCollection, UseCollectionProps, UseCollectionReturn } from '../useCollection';

describe('useCollection()', () => {
  it('should be defined', () => {
    expect(useCollection).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<[UseCollectionProps], UseCollectionReturn>(
      (args) => {
        return useCollection(...args);
      },
      {
        initialProps: [{ slug: DEMO_SLUG }],
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
      collection: {
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
