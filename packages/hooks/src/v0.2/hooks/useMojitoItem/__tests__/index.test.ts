import { act, renderHook } from '@testing-library/react-hooks';
import { DEMO_SLUG } from '../../../components/demo/constants/demo.constants';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import { useMojitoItem, UseMojitoItemProps, UseMojitoItemReturn } from '../useMojitoItem';

describe('useMojitoItem()', () => {
  it('should be defined', () => {
    expect(useMojitoItem).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<[UseMojitoItemProps], UseMojitoItemReturn>(
      (args) => {
        return useMojitoItem(...args);
      },
      {
        initialProps: [{ pathname: `/${DEMO_SLUG}/item/test/` }],
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
