/* eslint-disable */

import { server } from './src/mocks/server';

// Reset any request handlers that we may add during the tests, so they don't affect other tests:
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished:
afterAll(() => server.close());
