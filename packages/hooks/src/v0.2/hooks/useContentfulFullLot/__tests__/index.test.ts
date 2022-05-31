import { act, renderHook } from '@testing-library/react-hooks';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import {
  useContentfulFullLot,
  UseContentfulFullLotProps,
  UseContentfulFullLotReturn,
} from '../useContentfulFullLot';

describe('useContentfulFullLot()', () => {
  it('should be defined', () => {
    expect(useContentfulFullLot).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<
      [UseContentfulFullLotProps],
      UseContentfulFullLotReturn
    >(
      (args) => {
        return useContentfulFullLot(...args);
      },
      {
        initialProps: [{ mojitoID: '5f6a59f0-63bb-4628-b0ff-fcad26559a09' }],
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