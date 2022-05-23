import { act, renderHook } from '@testing-library/react-hooks';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import { useActiveBids, UseActiveBidsProps, UseActiveBidsReturn } from '../useActiveBids';
import { useAuth0 } from '@auth0/auth0-react';
import { mocked } from 'ts-jest/utils';

jest.mock('@auth0/auth0-react');

const mockedUseAuth0 = mocked(useAuth0, true);

describe.only('useActiveBids()', () => {
  beforeEach(() => {
    mockedUseAuth0.mockReturnValue({
      getIdTokenClaims: jest.fn(() => ({ __raw: 'mocked-token' })),
      isAuthenticated: true,
      isLoading: false,
      loginWithPopup: jest.fn(),
    } as any);
  });

  it('should be defined', () => {
    expect(useActiveBids).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender } = renderHook<[UseActiveBidsProps?], UseActiveBidsReturn>(
      (args = []) => {
        return useActiveBids(...args);
      },
      {
        wrapper: TestWrapper,
      },
    );

    await act(async () => {
      rerender();
    });

    await waitFor(() => result.current.queryResult.isSuccess);

    // console.log(result.current);

    // expect(fetchMock.mock.calls.length).toEqual(1);
    // expect(fetchMock.mock.calls[0][0]).toEqual('https://google.com')

    // expect(result.current).toMatchSnapshot();
  });
});
