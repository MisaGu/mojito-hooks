import { useContentfulAuctionsSlugList } from '../useContentfulAuctionsSlugList';

describe.only('useContentfulAuctionsSlugList()', () => {
  it('should be defined', () => {
    expect(useContentfulAuctionsSlugList).toBeDefined();
  });

  /*
  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<[UseContentfulAuctionsSlugListProps], UseContentfulAuctionsSlugListReturn>(
      (args) => {
        return useContentfulAuctionsSlugList(...args);
      },
      {
        wrapper: TestWrapper as any,
      },
    );

    // Trigger request...
    await act(async () => rerender());

    // ...and wait for response:
    await waitFor(() => result.current.queryResult.isSuccess);

    // Check data matches snapshot:
    expect(result.current).toMatchSnapshot({
      queryResult: {
        dataUpdatedAt: expect.any(Number),
      },
    });
  });
  */
});
