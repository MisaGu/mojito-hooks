/* eslint-disable */

import { server } from './src/v0.2/mocks/server';

// Reset any request handlers that we may add during the tests, so they don't affect other tests:
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished:
afterAll(() => server.close());
