import { act, renderHook } from '@testing-library/react-hooks';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import { useActiveBids, UseActiveBidsProps, UseActiveBidsReturn } from '../useActiveBids';

describe.only('useActiveBids()', () => {
  it('should be defined', () => {
    expect(useActiveBids).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<[UseActiveBidsProps?], UseActiveBidsReturn>(
      (args = []) => {
        return useActiveBids(...args);
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
});
