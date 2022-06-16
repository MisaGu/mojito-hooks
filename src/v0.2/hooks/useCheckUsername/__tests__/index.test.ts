import { act, renderHook } from '@testing-library/react-hooks';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import {
  useCheckUsername,
  UseCheckUsernameProps,
  UseCheckUsernameReturn,
} from '../useCheckUsername';

describe('useCheckUsername()', () => {
  it('should be defined', () => {
    expect(useCheckUsername).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<
      [UseCheckUsernameProps],
      UseCheckUsernameReturn
    >(
      (args) => {
        return useCheckUsername(...args);
      },
      {
        initialProps: [{ username: 'new-user' }],
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

    // Check username is available:
    expect(result.current.usernameAvailable).toBe(true);

    // Trigger another with a taken username...
    await act(async () => rerender([{ username: 'taken-user' }]));

    // ...and wait for response:
    await waitFor(() => result.current.queryResult.isSuccess);

    // Check username is not available:
    expect(result.current.usernameAvailable).toBe(false);
  });
});
