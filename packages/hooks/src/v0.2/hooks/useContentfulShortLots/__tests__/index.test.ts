import { act, renderHook } from '@testing-library/react-hooks';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import {
  useContentfulShortLots,
  UseContentfulShortLotsProps,
  UseContentfulShortLotsReturn,
} from '../useContentfulShortLots';

describe('useContentfulShortLots()', () => {
  it('should be defined', () => {
    expect(useContentfulShortLots).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<
      [UseContentfulShortLotsProps],
      UseContentfulShortLotsReturn
    >(
      (args) => {
        return useContentfulShortLots(...args);
      },
      {
        initialProps: [
          {
            mojitoID: [
              '5f6a59f0-63bb-4628-b0ff-fcad26559a09',
              '600f19c6-0bad-4442-bc69-1d2db645292c',
            ],
          },
        ],
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
