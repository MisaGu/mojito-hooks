/* eslint-disable */

import { server } from './src/v0.2/mocks/server';
import { useAuth0 } from '@auth0/auth0-react';
import { mocked } from 'jest-mock';

// Mock authentication:
jest.mock('@auth0/auth0-react');

const mockedUseAuth0 = mocked(useAuth0, true);

// Establish API mocking before all tests:
beforeAll(() => {
  mockedUseAuth0.mockReturnValue({
    getIdTokenClaims: jest.fn(() => ({ __raw: 'mocked-token' })),
    isAuthenticated: true,
    isLoading: false,
    loginWithPopup: jest.fn(),
  } as any);

  server.listen();
});

// Reset any request handlers that we may add during the tests, so they don't affect other tests:
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished:
afterAll(() => server.close());
