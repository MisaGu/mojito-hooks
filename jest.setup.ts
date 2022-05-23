import 'jest-extended';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jest-fetch-mock').enableMocks();

const JSDOM = require('jsdom').JSDOM;

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => (crypto as any).randomBytes(arr.length),
  },
});

(global.crypto as any).subtle = {}; // this gets around the 'auth0-spa-js must run on a secure origin' error

console.error = (msg) => {
  throw new Error(msg);
};
